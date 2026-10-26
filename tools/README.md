# Tools

- `extract-lines.js` — pulls every story-led line out of `next/landscape/stages/*.js` into `lines.json`, keyed the way the engine plays them (`speak(key)`).
- `voice.py <voiceName>` — records each line with Google's speech model through `GEMINI_API_KEY` (`pip install lameenc` first) into `next/art/voice/<key>.mp3`, skipping lines whose text has not changed (`voice-done.json`). The moth's voice is `Vindemiatrix`.

A note may carry `voice:` with what the moth reads out instead of its words (the backwards note on the flight). The play scripts (`play.js` Mary's school day, `play-h.js` packing day, `play-f.js` the flight, `play-n.js` Nana and Jedi's, `play-t.js` Trent Park, `play-e.js` Elliot, `play-z.js` Zaina) play each stage through by script; keep one for every stage. `play-pack.js`, which played packing day version 1, went with that version (18 Oct 2026).

After changing any hint, note, card, intro or postcard text: `node tools/extract-lines.js && python3 tools/voice.py Vindemiatrix`.

The speech model allows 10 requests a minute and 100 a day on our key, so the script records one line every 8 seconds and a full re-record takes two days. `next/art/voice/index.json` lists the lines that exist; the engine only speaks a line that is in it.

## audit.js

The checklist's automatic lines (`next/CHECKLIST.md`), run over every stage: `node tools/audit.js [stage ...]` with the local server up (`python3 -m http.server 8765` in the repo root). It needs Playwright and the pre-installed Chromium: in a cloud session, `NODE_PATH=<scratchpad>/node_modules`. The report (`tools/audit-out/report.txt`, kept out of git) lists failures first, then `B10?` lines that only ask for a look; the screenshots beside it are for the visual lines of the checklist, crop each cut-out and look at it close up. It prints one line per finding (stage, checklist line, what) and writes a screenshot of every view to `tools/audit-out/` for the visual lines. Run it before every commit; fix what it reports.
- `play-t.js` plays Mary's Trent Park stage end to end (the lamp's word into the box, the Night Moth word, the key dug up, the watch set by the sundial, dusk, the gate and the house); `shots-t.js` checks its close-ups and end card at the three screen shapes.
- `gen.py` (a picture from a prompt and reference pictures, `ASPECT` and `IMG_SIZE` in the environment), `lyria.py` (a music track from a prompt), `voice.py` (the moth's lines from `lines.json`, needs `pip install lameenc`): the making scripts, kept here so a new session has them; `GEMINI_API_KEY` comes from the environment. Playbook 4w lists what a stage is made of.
- `play-h.js` plays packing day version 2 (the real flat) end to end: the diary's wrong word, the library book bounced, the fridge, the yard boxes, the sofa cushions and Peanut, Dad through the door, the chest's lock and drawer, the toothbrush, Zaina's oven, the five things into the case, the zip, the lobby, then the Night Moth word.
- `map.js` draws the game map into `tools/map.html`: one diagram per stage read from the stage files (rooms with their four walls in turning order, every door as an arrow from its wall to the room it opens into, the wall you arrive facing), plus a table of the doors and the stage's `moves` line. Re-run it after any change to rooms or doors.

## levelmap.py

Draws a level's game map as a floor plan: `python3 tools/levelmap.py levels/LEVEL-<key>-map.json` writes `levels/LEVEL-<key>-map.drawio` (rooms where they really stand, north up, door tabs on shared walls, labelled walks; playbook 4y). Open the result at app.diagrams.net.

## sides.py

Proposes a wall's box for the engine-painted side walls (playbook 4z): `python3 tools/sides.py next/art/school/h1.jpg`. Prints a `sides` entry and draws the quads on a copy of the picture to check by eye; pick the right lines when a wall has several.

## puzzlechart.py

Draws a level's puzzle chart (stage 3 of the level file) as the dependency chart in lanes the playbook asks for: `python3 tools/puzzlechart.py levels/LEVEL-<key>-chart.json` writes `levels/LEVEL-<key>-chart.drawio` (open at app.diagrams.net) and a `.png` beside it for a phone. The JSON (lanes of typed nodes, and the arrows) is the record; the chart of a level drawn by hand before this tool (`LEVEL-school-chart.drawio`) stays as it is.

## keywhite.py

Keys a cut-out or icon drawn on white (playbook 2): `python3 tools/keywhite.py in.png out.png [--holes N] [--holes-in x0,x1,y0,y1] [--max W]`. `--holes-in` limits the clearing of enclosed white (pale, inside the box) to a region: the pockets a stray hair walls off go, the eyes' whites stay (MOTH-125). An RGBA input is laid on white first, so a keyed cut-out can be cleaned again. The white is flood-filled from the edges (white inside the thing survives); `--holes N` clears enclosed white regions of at least N pixels (a key's hole); the rim is keyed soft so no pale fringe shows; cropped, scaled to at most W wide (1024) and quantised. Prints the size and h/w for the layer's box (h = w × h/w × 16/9). It also grows the background three pixels into the pale, unsaturated halo the model leaves round a figure (MOTH-125).

## lift.py

Lifts what an edit added to a picture, by difference with the picture before it: `python3 tools/lift.py base.png edited.png name x0 x1 y0 y1 out.png [--tight]`, the window in fractions. Prints the box in picture percentages and writes a `-check.jpg` of it in place. `--tight` keeps the gaps inside the thing (no big closing of the mask) and is the one to use for states: each thing that goes into or out of a container is lifted from an edit of the empty container, so any mix of them shows in the one picture (playbook 4af). Never use a lifted thing as an icon: it brings its floor and shadow along (MOTH-116); icons are drawn on white. It exits 2 with "CUT" when the thing touches its window (other than at the picture's edge): widen the window (the bobble: MOTH-137). Lift each thing from its own edit, never from one where another overlaps it (the hat under the passport: MOTH-144); where the edit redrew what lies under the thing, cut it by its colours or paste a soft rectangle of the state instead (playbook 4ag).

## keycheck.py

`python3 tools/keycheck.py sheet.jpg a.png b.png ...` draws every cut-out over a dark and a mid wall on one contact sheet, with its pale-rim share and its enclosed white regions, to look at before placing (checklist 92).

## grid.py

`python3 tools/grid.py picture.jpg out.jpg [x0 x1 y0 y1]` draws the picture's own percentages (every 1% on a crop under 40% wide) for measuring anything laid over it (checklist 93).

## glimpse.py

`python3 tools/glimpse.py wall.jpg next.jpg out.jpg --scale S --at X,Y --opening x0,y0,x1,y1 [--dim 0.93]` pastes the next room's wall into a doorway: face-on, scaled for its distance, on the same horizon (checklist 91; the working in the docstring and the level file).

## evals/images/promptlint.py

Run by `run.py` before any call: stops on a viewpoint the player never has or a vague set seen twice (checklist 88). `python3 evals/images/promptlint.py <manifest>` to check one by hand.

## patch.py

`python3 tools/patch.py base.jpg edit.png out.png x0 x1 y0 y1 [--feather 6]` pastes a state drawn as an edit of a wall as a soft-edged rectangle (box in picture percentages). It finds the thing as the edit's largest strong change against the base and exits with CUT when the box's soft edge would fade part of it out; it prints the box for the stage and the thing's own box, for placing neighbours clear of it (checklist 96).

## liftcolour.py

`python3 tools/liftcolour.py base edit out.png red|paper|cream|navy x0 x1 y0 y1` lifts a thing an edit added where the edit also redrew what lies under it: a pixel is kept only if it changed and has the thing's colour family; then the largest piece, holes filled. Look at the result on a keycheck sheet. For a thing the same colour as what it lies on (a navy passport on a navy case), cut it by its outline measured on a grid instead.

## polish-e2.js

The polish walk for eval2: every view in four states at the owner's three shapes, every close-up at 2000×700, with overflow and off-screen checks; a copy is made for each level (checklist 36, 43, 97).
