"""Record every story-led line in the moth's voice: lines.json -> next/art/voice/<key>.mp3 (48 kbps mono).
usage: voice.py <voiceName> [only-keys...]   Skips lines whose mp3 already matches the text in voice-done.json."""
import base64, json, os, sys, urllib.request, time, hashlib
from concurrent.futures import ThreadPoolExecutor
import lameenc
voice = sys.argv[1]; only = set(sys.argv[2:])
OUT = '/home/user/me565.github.io/next/art/voice/'
key = os.environ["GEMINI_API_KEY"]
lines = json.load(open('lines.json'))
done = json.load(open('voice-done.json')) if os.path.exists('voice-done.json') else {}
STYLE = ("Speak as a small, gentle, magical moth who guides a child through a cosy mystery: soft, warm and unhurried, "
         "a little whispery but perfectly clear, kind and slightly playful, like a night light that can talk. British English. "
         "Say only the words after the colon, nothing else")
def kind(k):
    if '.hint.' in k: return "Whisper this hint to Mary"
    if '.note.' in k: return "Read this note aloud to Mary, as if reading it over her shoulder"
    if k.endswith('.card') or k.endswith('.intro') or '.comic.' in k: return "Narrate this softly, like the start of a bedtime story"
    if k.endswith('.postcard'): return "Read Mary's postcard home aloud, warmly and a little proudly"
    return "Say this warmly"
def tts(k, text):
    sig = hashlib.md5((voice + '|' + text).encode()).hexdigest()
    if done.get(k) == sig and os.path.exists(OUT + k + '.mp3'): return k, 'kept'
    prompt = f"{STYLE}. {kind(k)}: {text}"
    body = {"contents":[{"parts":[{"text":prompt}]}],"generationConfig":{"responseModalities":["AUDIO"],"speechConfig":{"voiceConfig":{"prebuiltVoiceConfig":{"voiceName":voice}}}}}
    for attempt in range(4):
        req = urllib.request.Request("https://generativelanguage.googleapis.com/v1beta/models/" + os.environ.get("TTS_MODEL", "gemini-2.5-flash-preview-tts") + ":generateContent", data=json.dumps(body).encode(), method="POST", headers={"Content-Type":"application/json","x-goog-api-key":key})
        try:
            with urllib.request.urlopen(req, timeout=180) as r: res = json.load(r)
            pcm = None
            for p in res["candidates"][0]["content"]["parts"]:
                if "inlineData" in p: pcm = base64.b64decode(p["inlineData"]["data"])
            if not pcm: raise RuntimeError('no audio')
            enc = lameenc.Encoder(); enc.set_bit_rate(48); enc.set_in_sample_rate(24000); enc.set_channels(1); enc.set_quality(2)
            open(OUT + k + '.mp3', 'wb').write(enc.encode(pcm) + enc.flush())
            time.sleep(8); return k, f"{len(pcm)/48000:.1f}s"
        except Exception as e:
            err = e; time.sleep(30)
    return k, 'FAILED ' + str(err)[:80]
todo = [(k, t) for k, t in lines.items() if not only or k in only]
with ThreadPoolExecutor(1) as ex:
    for k, r in ex.map(lambda kt: tts(*kt), todo):
        if r != 'kept': print(k, r, flush=True)
        if not r.startswith('FAILED'): done[k] = hashlib.md5((voice + '|' + lines[k]).encode()).hexdigest()
json.dump(done, open('voice-done.json', 'w'), indent=1)
print('done', sum(1 for k in lines if os.path.exists(OUT + k + '.mp3')), 'of', len(lines))
