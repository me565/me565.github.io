# Tools

- `extract-lines.js` — pulls every story-led line out of `next/landscape/stages/*.js` into `lines.json`, keyed the way the engine plays them (`speak(key)`).
- `voice.py <voiceName>` — records each line with Google's speech model through `GEMINI_API_KEY` (`pip install lameenc` first) into `next/art/voice/<key>.mp3`, skipping lines whose text has not changed (`voice-done.json`). The moth's voice is `Vindemiatrix`.

After changing any hint, note, card, intro or postcard text: `node tools/extract-lines.js && python3 tools/voice.py Vindemiatrix`.

The speech model allows 10 requests a minute and 100 a day on our key, so the script records one line every 8 seconds and a full re-record takes two days. `next/art/voice/index.json` lists the lines that exist; the engine only speaks a line that is in it.
