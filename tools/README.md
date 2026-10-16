# Tools

- `extract-lines.js` — pulls every story-led line out of `next/landscape/stages/*.js` into `lines.json`, keyed the way the engine plays them (`speak(key)`).
- `voice.py <voiceName>` — records each line with Google's speech model through `GEMINI_API_KEY` (`pip install lameenc` first) into `next/art/voice/<key>.mp3`, skipping lines whose text has not changed (`voice-done.json`). The moth's voice is `Vindemiatrix`.

A note may carry `voice:` with what the moth reads out instead of its words (the backwards note on the flight). The play scripts (`play.js`, `play-pack.js`, `play-f.js`, `play-e.js`, `play-z.js`) play each stage through by script; keep one for every stage.

After changing any hint, note, card, intro or postcard text: `node tools/extract-lines.js && python3 tools/voice.py Vindemiatrix`.

The speech model allows 10 requests a minute and 100 a day on our key, so the script records one line every 8 seconds and a full re-record takes two days. `next/art/voice/index.json` lists the lines that exist; the engine only speaks a line that is in it.

## audit.js

The checklist's automatic lines (`next/CHECKLIST.md`), run over every stage: `node tools/audit.js [stage ...]` with the local server up (`python3 -m http.server 8765` in the repo root). It needs Playwright and the pre-installed Chromium: in a cloud session, `NODE_PATH=<scratchpad>/node_modules`. The report (`tools/audit-out/report.txt`, kept out of git) lists failures first, then `B10?` lines that only ask for a look; the screenshots beside it are for the visual lines of the checklist, crop each cut-out and look at it close up. It prints one line per finding (stage, checklist line, what) and writes a screenshot of every view to `tools/audit-out/` for the visual lines. Run it before every commit; fix what it reports.
- `play-t.js` plays Mary's Trent Park stage end to end (the lamp's word into the box, the Night Moth word, the key dug up, the watch set by the sundial, dusk, the gate and the house); `shots-t.js` checks its close-ups and end card at the three screen shapes.
- `gen.py` (a picture from a prompt and reference pictures, `ASPECT` and `IMG_SIZE` in the environment), `lyria.py` (a music track from a prompt), `voice.py` (the moth's lines from `lines.json`, needs `pip install lameenc`): the making scripts, kept here so a new session has them; `GEMINI_API_KEY` comes from the environment. Playbook 4w lists what a stage is made of.
- `play-h.js` plays packing day version 2 (the real flat) end to end: the diary's wrong word, the library book bounced, the fridge, the yard boxes, the sofa cushions and Peanut, Dad through the door, the chest's lock and drawer, the toothbrush, Zaina's oven, the five things into the case, the zip, the lobby, then the Night Moth word.
- `map.js` draws the game map into `tools/map.html`: one diagram per stage read from the stage files (rooms with their four walls in turning order, every door as an arrow from its wall to the room it opens into, the wall you arrive facing), plus a table of the doors and the stage's `moves` line. Re-run it after any change to rooms or doors.
