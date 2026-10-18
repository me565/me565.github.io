#!/usr/bin/env python3
"""Generate one wall of a Moth House room with Gemini.
usage: gen.py <model> <out.png> <prompt-file> [reference.png ...]
"""
import base64, json, os, sys, urllib.request

model, out, prompt_file, *refs = sys.argv[1:]
key = os.environ["GEMINI_API_KEY"]
prompt = open(prompt_file).read()
parts = []
for r in refs:
    parts.append({"inlineData": {"mimeType": "image/png", "data": base64.b64encode(open(r, "rb").read()).decode()}})
parts.append({"text": prompt})
body = {
    "contents": [{"role": "user", "parts": parts}],
    "generationConfig": {
        "responseModalities": ["TEXT", "IMAGE"],
        "imageConfig": {"aspectRatio": os.environ.get("ASPECT", "3:4"), "imageSize": os.environ.get("IMG_SIZE", "1K")},
    },
}
req = urllib.request.Request(
    f"https://generativelanguage.googleapis.com/v1beta/models/{model}:generateContent",
    data=json.dumps(body).encode(), method="POST",
    headers={"Content-Type": "application/json", "x-goog-api-key": key})
try:
    with urllib.request.urlopen(req, timeout=300) as r:
        res = json.load(r)
except urllib.error.HTTPError as e:
    print("HTTP", e.code, e.read().decode()[:800]); sys.exit(1)
saved = False
for c in res.get("candidates", []):
    for p in c.get("content", {}).get("parts", []):
        if "inlineData" in p and not saved:
            open(out, "wb").write(base64.b64decode(p["inlineData"]["data"])); saved = True
        elif "text" in p:
            print("text:", p["text"][:300])
if not saved:
    print("no image:", json.dumps(res)[:800]); sys.exit(2)
print("saved", out)
