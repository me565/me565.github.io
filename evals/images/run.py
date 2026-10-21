#!/usr/bin/env python3
"""Run an image-model evaluation manifest against OpenRouter.

    python3 evals/images/run.py evals/images/runs/wall-c4-models.json --out evals-out [--only id1,id2]

A manifest is JSON: {"name", "prompt_file" (or "prompt"), "defaults": {...}, "cases": [{...}]}.
A case has "id" and "model", and may set "resolution", "aspect_ratio", "seed", "n",
"references" (paths of pictures in the repo, sent as input references), "params" (extra
fields passed through to the request), "prompt_file"/"prompt" (to override the manifest's),
and "route": "images" (default) or "chat" (the chat-completions route, which Google models
also serve and which streams).

Writes <out>/<id>.<ext> for every picture and <out>/results.json with one record per case:
model, the request's settings, whether it worked, seconds taken, the cost OpenRouter billed,
the picture's size and file, and any error. The key is read from OPENROUTER_API_KEY and never
printed. Stdlib only, plus Pillow for the picture size when it is installed.
"""
import argparse, base64, concurrent.futures as cf, json, mimetypes, os, sys, time, urllib.request, urllib.error

API = "https://openrouter.ai/api/v1"

def log(*a):
    print(*a, file=sys.stderr, flush=True)

def headers():
    key = os.environ.get("OPENROUTER_API_KEY", "")
    h = {"Content-Type": "application/json", "HTTP-Referer": "https://me565.github.io", "X-Title": "The Moth House evals"}
    if key:
        h["Authorization"] = "Bearer " + key
    return h

def post(path, body, timeout=900):
    req = urllib.request.Request(API + path, data=json.dumps(body).encode(), headers=headers(), method="POST")
    with urllib.request.urlopen(req, timeout=timeout) as r:
        return r.status, r.read()

def data_uri(path):
    mt = mimetypes.guess_type(path)[0] or "image/png"
    with open(path, "rb") as f:
        return f"data:{mt};base64," + base64.b64encode(f.read()).decode()

def ext_of(raw, media_type=None):
    if raw[:4] == b"\x89PNG": return "png"
    if raw[:3] == b"\xff\xd8\xff": return "jpg"
    if raw[:4] == b"RIFF": return "webp"
    if media_type and "/" in media_type: return media_type.split("/")[1].replace("jpeg", "jpg")
    return "bin"

def size_of(path):
    try:
        from PIL import Image
        with Image.open(path) as im:
            return list(im.size)
    except Exception:
        return None

def run_case(case, prompt, out, made=None):
    cid = case["id"]
    route = case.get("route", "images")
    refs = []
    for p in case.get("references", []):
        if p.startswith("case:"):
            dep = (made or {}).get(p[5:])
            if not dep: return {"id": cid, "model": case["model"], "ok": False, "error": f"reference {p} did not produce a picture", "seconds": 0}
            refs.append(data_uri(os.path.join(out, dep)))
        else:
            refs.append(data_uri(p))
    rec = {"id": cid, "model": case["model"], "route": route,
           "settings": {k: case[k] for k in ("resolution", "aspect_ratio", "seed", "n") if k in case},
           "references": case.get("references", []), "params": case.get("params", {}),
           "note": case.get("note", "")}
    if route == "chat":
        body = {"model": case["model"], "stream": False, "modalities": ["image", "text"],
                "image_config": {"aspect_ratio": case.get("aspect_ratio", "16:9"), "image_size": case.get("resolution", "2K")},
                "messages": [{"role": "user", "content": ([{"type": "text", "text": prompt}] + [{"type": "image_url", "image_url": {"url": u}} for u in refs]) if refs else prompt}]}
        body.update(case.get("params", {}))
        path = "/chat/completions"
    else:
        body = {"model": case["model"], "prompt": prompt, "n": case.get("n", 1)}
        for k in ("resolution", "aspect_ratio", "seed"):
            if k in case: body[k] = case[k]
        if refs: body["input_references"] = [{"type": "image_url", "image_url": {"url": u}} for u in refs]
        body.update(case.get("params", {}))
        path = "/images/generations"
    t0 = time.time(); last = None
    for attempt in (1, 2):
        try:
            status, raw = post(path, body)
            d = json.loads(raw)
            rec["seconds"] = round(time.time() - t0, 1)
            if route == "chat":
                msg = d["choices"][0]["message"]
                imgs = [im["image_url"]["url"] for im in msg.get("images", [])]
                blobs = [(base64.b64decode(u.split(",", 1)[1]), None) for u in imgs]
            else:
                blobs = [(base64.b64decode(im["b64_json"]), im.get("media_type")) for im in d.get("data", []) if im.get("b64_json")]
            u = d.get("usage") or {}
            rec["cost_usd"] = u.get("cost"); rec["usage"] = u
            rec["provider"] = d.get("provider")
            rec["files"] = []
            for i, (b, mt) in enumerate(blobs):
                fn = f"{cid}.{ext_of(b, mt)}" if len(blobs) == 1 else f"{cid}-{i}.{ext_of(b, mt)}"
                with open(os.path.join(out, fn), "wb") as f: f.write(b)
                rec["files"].append({"file": fn, "bytes": len(b), "size": size_of(os.path.join(out, fn))})
            rec["ok"] = bool(blobs)
            if not blobs: rec["error"] = json.dumps(d)[:600]
            return rec
        except urllib.error.HTTPError as e:
            body_txt = e.read().decode(errors="replace")[:600]
            last = f"HTTP {e.code}: {body_txt}"
            if e.code < 500 and e.code != 429: break
        except Exception as e:
            last = f"{type(e).__name__}: {e}"
        time.sleep(5 * attempt)
    rec["ok"] = False; rec["error"] = last; rec["seconds"] = round(time.time() - t0, 1)
    return rec

def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("manifest"); ap.add_argument("--out", default="evals-out"); ap.add_argument("--only", default="")
    ap.add_argument("--workers", type=int, default=3)
    a = ap.parse_args()
    m = json.load(open(a.manifest))
    base = os.path.dirname(a.manifest)
    def prompt_for(c):
        if "prompt" in c: return c.get("prompt_prefix", "") + c["prompt"]
        pf = c.get("prompt_file") or m.get("prompt_file")
        if pf: return c.get("prompt_prefix", "") + open(pf if os.path.exists(pf) else os.path.join(base, pf)).read().strip()
        return c.get("prompt_prefix", "") + m["prompt"]
    only = {s.strip() for s in a.only.split(",") if s.strip()}
    cases = []
    for c in m["cases"]:
        if only and c["id"] not in only: continue
        cases.append({**m.get("defaults", {}), **c})
    os.makedirs(a.out, exist_ok=True)
    log(f"{m.get('name', a.manifest)}: {len(cases)} cases")
    results = []; made = {}
    def report(rec):
        results.append(rec)
        if rec.get("ok") and rec.get("files"): made[rec["id"]] = rec["files"][0]["file"]
        log(f"  {rec['id']:32s} {'ok ' if rec.get('ok') else 'FAIL'} {rec.get('seconds', '?')}s  ${rec.get('cost_usd') if rec.get('cost_usd') is not None else '?'}  {rec.get('error', '')[:120]}")
    pending = list(cases)
    while pending:
        ready = [c for c in pending if all(not r.startswith("case:") or r[5:] in made or r[5:] not in {p["id"] for p in pending} for r in c.get("references", []))]
        if not ready: ready = pending
        pending = [c for c in pending if c not in ready]
        with cf.ThreadPoolExecutor(a.workers) as ex:
            for rec in ex.map(lambda c: run_case(c, prompt_for(c), a.out, made), ready): report(rec)
    total = sum(r.get("cost_usd") or 0 for r in results)
    json.dump({"name": m.get("name"), "manifest": a.manifest, "ran_at": time.strftime("%Y-%m-%dT%H:%M:%SZ", time.gmtime()),
               "total_cost_usd": round(total, 4), "results": results}, open(os.path.join(a.out, "results.json"), "w"), indent=1)
    log(f"total billed: ${total:.3f}; {sum(1 for r in results if r.get('ok'))}/{len(results)} ok")

if __name__ == "__main__":
    main()
