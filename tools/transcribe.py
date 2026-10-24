#!/usr/bin/env python3
"""Transcribe the owner's recorded commentary (playbook 4ae).

    python3 tools/transcribe.py <recording.mp4> <out-dir>

Writes <out-dir>/audio.mp3 (mono, 16 kHz), <out-dir>/transcript.txt (his words with a time per line, and a last line on
whether the game's music and tap sounds are audible) and <out-dir>/sheets/s_NN.jpg (contact sheets, a frame every two
seconds, twelve to a sheet, to pin each remark to what was on screen). Needs ffmpeg, and the OpenRouter credentials the
session's proxy injects (about 3 to 4 cents for a seven-minute recording on google/gemini-4-argon)."""
import base64, json, os, subprocess, sys, urllib.request
src, out = sys.argv[1], sys.argv[2]
os.makedirs(os.path.join(out, 'sheets'), exist_ok=True)
subprocess.run(['ffmpeg', '-v', 'error', '-y', '-i', src, '-vn', '-ac', '1', '-ar', '16000', '-b:a', '48k', os.path.join(out, 'audio.mp3')], check=True)
subprocess.run(['ffmpeg', '-v', 'error', '-y', '-i', src, '-vf', 'fps=0.5,scale=480:-1,tile=4x3', os.path.join(out, 'sheets', 's_%02d.jpg')], check=True)
b64 = base64.b64encode(open(os.path.join(out, 'audio.mp3'), 'rb').read()).decode()
content = [{"type": "text", "text": "This is a screen recording's sound track: a game's owner playing a children's point-and-click room on a tablet and speaking his feedback aloud. Transcribe everything he says, verbatim, as a list of lines each starting with the time in m:ss from the start of the audio. Keep his exact words, hesitations trimmed lightly. After the transcript add one line saying whether the game's own music and tap sounds are audible."},
           {"type": "input_audio", "input_audio": {"data": b64, "format": "mp3"}}]
body = {"model": "google/gemini-4-argon", "stream": True, "messages": [{"role": "user", "content": content}]}
req = urllib.request.Request("https://openrouter.ai/api/v1/chat/completions", data=json.dumps(body).encode(), headers={"Content-Type": "application/json"})
text, usage = [], None
with urllib.request.urlopen(req, timeout=600) as r:  # streamed, so the proxy's thirty-second silence limit never bites
    for line in r:
        line = line.decode().strip()
        if not line.startswith("data:"): continue
        d = line[5:].strip()
        if d == "[DONE]": break
        try: j = json.loads(d)
        except Exception: continue
        if j.get('usage'): usage = j['usage']
        for c in j.get('choices', []):
            t = c.get('delta', {}).get('content')
            if t: text.append(t)
open(os.path.join(out, 'transcript.txt'), 'w').write(''.join(text))
print(''.join(text)); print('cost $%.4f' % ((usage or {}).get('cost') or 0))
