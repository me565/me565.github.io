import base64, json, os, sys, urllib.request
model, out, prompt = sys.argv[1], sys.argv[2], sys.argv[3]
body={"contents":[{"role":"user","parts":[{"text":prompt}]}],"generationConfig":{"responseModalities":["AUDIO"]}}
req=urllib.request.Request(f"https://generativelanguage.googleapis.com/v1beta/models/{model}:generateContent",data=json.dumps(body).encode(),method="POST",headers={"Content-Type":"application/json","x-goog-api-key":os.environ["GEMINI_API_KEY"]})
try:
    with urllib.request.urlopen(req,timeout=600) as r: res=json.load(r)
except urllib.error.HTTPError as e: print("HTTP",e.code,e.read().decode()[:600]); sys.exit(1)
for c in res.get("candidates",[]):
    for p in c.get("content",{}).get("parts",[]):
        if "inlineData" in p:
            mt=p["inlineData"]["mimeType"]; data=base64.b64decode(p["inlineData"]["data"]); open(out,"wb").write(data); print("saved",out,mt,len(data)); sys.exit(0)
        elif "text" in p: print("text:",p["text"][:300])
print("no audio:",json.dumps(res)[:600])
