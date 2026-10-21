#!/usr/bin/env python3
"""Build a side-by-side page from a results folder: python3 evals/images/page.py evals-out out.html [--width 1600]
Makes page-sized JPEG copies next to the page (and a 1920-wide upscale of anything narrower, labelled, since that is
what the game would show). Stdlib plus Pillow."""
import json, os, sys, html
from PIL import Image
src = sys.argv[1]; out = sys.argv[2]; width = int(sys.argv[sys.argv.index("--width") + 1]) if "--width" in sys.argv else 1600
R = json.load(open(os.path.join(src, "results.json")))
outdir = os.path.dirname(os.path.abspath(out)); os.makedirs(outdir, exist_ok=True)
rows = []
for r in R["results"]:
    f = (r.get("files") or [{}])[0].get("file")
    shown = ""
    if f and os.path.exists(os.path.join(src, f)):
        im = Image.open(os.path.join(src, f)).convert("RGB"); W, H = im.size
        w = min(width, W); h = round(H * w / W)
        name = f"{r['id']}.jpg"; im.resize((w, h), Image.LANCZOS).save(os.path.join(outdir, name), quality=86); shown = name
        if W < 1920:
            up = f"{r['id']}-up1920.jpg"; im.resize((1920, round(H * 1920 / W)), Image.LANCZOS).save(os.path.join(outdir, up), quality=86)
            r["upscaled"] = up
        r["shown"] = shown; r["px"] = [W, H]
    rows.append(r)
def esc(s): return html.escape(str(s))
cards = []
for r in rows:
    meta = [f"<b>{esc(r['model'])}</b>", esc(json.dumps(r.get("settings", {}))), f"<b>${r['cost_usd']:.3f}</b> billed" if r.get("cost_usd") is not None else "cost unknown", f"<b>{r.get('seconds','?')} s</b>", f"{r['px'][0]} × {r['px'][1]} px" if r.get("px") else ""]
    if r.get("references"): meta.append("refs: " + esc(", ".join(r["references"])))
    if r.get("note"): meta.append(esc(r["note"]))
    body = f'<img src="{r["shown"]}" alt="{esc(r["id"])}" loading="lazy">' if r.get("shown") else f'<p class="err">Failed: {esc(r.get("error",""))}</p>'
    if r.get("upscaled"): body += f'<details><summary>Scaled up to 1920 wide, as the game would show it</summary><img src="{r["upscaled"]}" alt="" loading="lazy"></details>'
    cards.append(f'<figure><h2>{esc(r["id"])}</h2>{body}<div class="meta">{" · ".join(m for m in meta if m)}</div></figure>')
page = f"""<title>{esc(R.get('name') or 'Image evals')}</title>
<meta name="claude:viewport-fit-sides" content="cover">
<style>
:root{{--bg:#f6f1e7;--ink:#2b2a26;--muted:#6b665b;--rule:#d9d0bf;--bad:#a3402e}}
@media (prefers-color-scheme: dark){{:root:not([data-theme="light"]){{--bg:#1c1b18;--ink:#ece6d8;--muted:#aaa394;--rule:#3d392f;--bad:#e2846f;color-scheme:dark}}}}
:root[data-theme="dark"]{{--bg:#1c1b18;--ink:#ece6d8;--muted:#aaa394;--rule:#3d392f;--bad:#e2846f;color-scheme:dark}}
body{{background:var(--bg);color:var(--ink);font:17px/1.5 "Source Sans 3","Segoe UI",system-ui,sans-serif;padding-left:max(16px,env(safe-area-inset-left,0px));padding-right:max(16px,env(safe-area-inset-right,0px));padding-block:24px 48px}}
main{{max-width:1100px;margin:0 auto;display:grid;gap:34px}} h1{{font:600 30px/1.1 Georgia,serif;margin:0}} h2{{font:500 21px/1.2 Georgia,serif;margin:0}}
figure{{margin:0;display:grid;gap:10px}} img{{width:100%;max-width:100%;height:auto;display:block;border:1px solid var(--rule)}}
.meta{{color:var(--muted);font-size:15px;font-variant-numeric:tabular-nums}} .meta b{{color:var(--ink)}} .err{{color:var(--bad);margin:0}} details{{color:var(--muted)}} summary{{cursor:pointer}}
</style>
<main><header><h1>{esc(R.get('name') or 'Image evals')}</h1><p>Ran {esc(R.get('ran_at',''))}. Total billed: <b>${R.get('total_cost_usd',0):.2f}</b>. Judge each picture against evals/images/CRITERIA.md on the tablet.</p></header>{''.join(cards)}</main>
"""
open(out, "w").write(page); print("wrote", out, "with", len(rows), "cases")
