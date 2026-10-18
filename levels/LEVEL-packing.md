# Level: packing — Mary, packing day (version 2, the family flat)

**The model level** (owner, 18 Oct 2026). This is the finished level every other is measured against for look, feel and depth: the art reference set for checklist 43, and the standard the school is rebuilt to. It was built on 16 Oct 2026, before the gates existed, so this file is a retrofit: each stage below is walked on paper against what was built, findings go to the learning loop, and no gate carries a sign-off the owner has not given. Nothing here spends credit; the art exists.

Status: `brief` | `outline` | `greybox` | `assets listed` | `samples` | `batch` | `integrating` | `released`
Current status: released (in the lite game since build 2026-10-18b, 18 Oct 2026); this file written 18 Oct 2026
Build id of the latest play link: 2026-10-18c
Latest play link: given in chat with the commit (`?stage=packing&fresh`)

---

## 1. Brief

- Child and age: Mary, 10. Built above her age, for players of 12 to 15, so the three stages after it are not easier than the one before (`STORY.md`, stage 2).
- Where and when in the journey (see `STORY.md`): Singapore, the afternoon before the evening flight. After the last day of school (which hands on Nana's postcard and the moth at the window); before the flight.
- The objective, in the child's words (one sentence): "My case, packed and zipped before the taxi, and the three things Dad hid are the ones that matter."
- Difficulty (1–5, from `STORY.md`): 4 ("for players of 12 to 15": nine places, every lock with decoys on the same sheet, people who say things once, hints that say where to look and never what to do until the third tier).
- The signature moment (one thing the player will remember): the rain stopping the instant the second hidden thing goes into the case, and the whole flat going gold; then the zip, pulled by hand, and the family in the lift lobby.
- The opening gesture: none of its own. The level opens on the stage card (Mum's words), then facing the loft bed (m4) with the case out of sight; the first turn finds the window and the diary, the second the sofa and the empty case. The engine's `begin` hook is not used here (it came later, 17 Oct 2026).
- What this level carries forward from earlier ones, and what it hands on: in from school: nothing playable (Nana's postcard is a new one, pinned this morning). Out: the torch (Nana asks for it; the attic in stage 4 is dark without it), the passports and the present in the case, the jumper for England, and the Night Moth's line "The moth is real. Ask me in the attic", which points at stage 4. Zaina asleep with Peanut and Elliot with his backpack are seen again in the lobby and on the flight.
- Legal and fiction check: fictional names only, no brands, no Merlion, nothing borrowed: passes. No school named. No airline, no brand on the booking (a printed sheet with times only), no logo on the fridge, kettle, oven or washing machine. The kaya is a food, not a brand. The postcards show Athens, Tromsø, Trent Park, Istanbul and Cornwall as generic views (columns, a fjord, an obelisk, domes, a lighthouse). The family's looks come from the owner's photographs, which are not in the repo (`STORY.md` stage 2 "Looks"); the walls come from his photographs of the flat the same way (playbook 4x). Nothing unsafe to copy: the knife block in the kitchen photograph was painted out; the fire blanket is "for grown-ups"; the hob is Mum's; the oven that holds the torch is a toy. The spider in the moth box "would rather you shut the lid": a friendly line, not a scare.

### Gate A — story
Checked: fits the arc and the age · nothing borrowed · fiction and legal rules · nothing shared with another child's story
Walked 18 Oct 2026 (retrofit):
- Fits the arc and the age: yes. The premise (Mum's one instruction, Dad behind a door) is the family's own, and the three hidden things are each reached by a different kind of thinking: reading a document with a correction, bargaining with a small sister, picking a box by a signature.
- Nothing borrowed: yes. Every puzzle is built from this flat's own things.
- Fiction and legal rules: yes, as above.
- Nothing shared with another child's story: **one overlap to rule on.** Elliot's little cog, his signature on the rocket, is the same mark as the three hidden cogs in his own first stage (`eschool`). Here it is a clue to pick a box; there it is the thing collected. It is the same character detail used twice rather than the same puzzle, and it ties the stories together; but the rule says no clue shared, so the owner decides whether this is a feature or a breach. (Elliot's packing day, when it is built, must not reuse the rocket or the box.)
- Child-safe: yes (see the legal check).
Signed off:

---

## 2. Game map

- Floor plan: `levels/LEVEL-packing-map.json`, drawn by `tools/levelmap.py` into `levels/LEVEL-packing-map.drawio` (open at app.diagrams.net). Nine places: eight rooms and the lift lobby as the last scene. The dining end is the hub; the corridor leads to the three bedrooms; the kitchen leads to the yard.
- Rooms and their views (in turning order, as the stage lists them; the first view is not always the north wall, see the note under the map's legend):
  - Mary's room `mary`: m1 window, sill, diary · m2 sofa, library book, suitcase · m3 wardrobes, pinboard, door · m4 loft bed, desk, bookcase (the opening view).
  - Elliot and Zaina's room `kids`: k1 window and tree, patchwork chair, Rope · k2 bunks, pictures, Elliot's pinboard (Mum folding, later) · k3 door, felt animals, Zaina and the toy kitchen · k4 cube wall, doll's house, teal clock.
  - The corridor `hall`: c1 through to the dining end, intercom · c2 Mary's door · c3 the children's door and the bathroom · c4 Mum and Dad's door, laundry basket.
  - Mum and Dad's room `parents`: p1 window and view, driftwood lamp, Dad's chest · p2 Dad's desk, wardrobe · p3 door out, the en suite (shut, shower running) · p4 bed, the old bear, Dad's shelf.
  - Living room `living`: l1 balcony doors, plants, armchair · l2 sofa, fairy lights, shelf (Zaina asleep, later) · l3 through to the dining end, Elliot building · l4 plant, shelf unit, Mum's desk, Dad's backpack.
  - The dining end `dining`: d1 world map, banners, kitchen door · d2 front door, intercom, hall table · d3 windows, table, bookcase, piano · d4 into the living room, the corridor.
  - Kitchen `kitchen`: n1 cupboards, hob, Mum, oven · n2 fridge, kettle, window · n3 door back to the dining end, clock, fruit · n4 sink window, through to the yard.
  - The yard `yard`: y1 drying rack (the jumper), window, mop · y2 four boxes, washing machine · y3 the little washroom, a locked door · y4 fire blanket, back into the kitchen.
- Doors (door → room and the view you arrive facing): Mary's door → corridor c2 · corridor → Mary's room m3 · corridor → children's room k2 · children's door → corridor c1 · corridor → Mum and Dad's p1 · their door → corridor c2 · corridor → dining end d3 · dining end → corridor c1 · dining end → living room l1 · living room → dining end d4 · dining end → kitchen n1 · kitchen → dining end d2 · kitchen → yard y1 · yard → kitchen n4 · the front door → the lobby scene (only once the case is zipped).
- Locked at the start, and what opens it: Dad's chest (p1), four digits, 2 1 4 5, from the booking (22:45) corrected by Mum's note (an hour earlier); the drawer behind it is lifted and pulled. The toy oven's torch (k3), given up for Peanut, who is under the fourth sofa cushion (l2). The right yard box (y2), the one with Elliot's rocket and cog. The front door (d2), by the zipped case. The diary (m1), five letters, A T T I C, the Night Moth. Every doorway is open from the start.
- The linear opening (the one room that teaches the mechanic): Mary's room: a close-up with a lock (the diary), a pick-up (the library book), a use that bounces (the book in the case), a close-up with things to read (the pinboard), then the door. Then the corridor, which shows four doors and teaches turning.
- The hub (where several trails open at once): the dining end, with the kitchen (Mum, the list, the booking, the rocket), the living room (Elliot, the sofa) and the corridor (Dad, the bathroom, Zaina) off it. Mum's words on the card send the player to the fridge first; from the list, the three trails are open at once.

Walk-through test: every room reachable · little backtracking · once opened, stays open
Result (walked on the map, 18 Oct 2026): every room is reachable from the start without any lock; nothing shuts. Backtracking is by design and moderate: each hidden thing is learned of in one place and found in another (Dad's room → the fridge → Dad's room; the postcard → the children's room → the living room → the children's room; Dad's room → the yard → the fridge or the children's pinboard → the yard), and everything returns to Mary's room to be packed. The longest walk is the children's room to the living room and back (four doors), on the torch trail. **Finding (to decide):** four arrivals face the door just used rather than away from it (playbook 4a-ii, `DOORS` in `CLAUDE.md`): into the corridor from the dining end (c1 is the opening you came through), from Mary's room (c2 is her door) and from Mum and Dad's room (c2, the wrong door altogether), and into Mary's room from the corridor (m3 is the door wall). Facing away would be c3 (the children's door and the bathroom, a good first sight), c4, c2 and m1. A four-value change in `DOORS`; held for the owner, since the level is released and he has played it as it is.

## 3. Puzzle chart

- Chart: `levels/LEVEL-packing-chart.drawio`, seven lanes (Mum's brief; A the passports; B Nana's torch; C Nana's present; the list; convergence; the Night Moth), person → clue → lock → reward, with dotted arrows where one trail feeds another (the booking and Mum's note into the chest; Elliot's cog into the boxes; Zaina asked before Elliot answers; the three hidden things into the light change).
- Trails that run in parallel: A, B and C all open from Mum's list and can be done in any order; the jumper and the toothbrush can be picked up at any time. Dad's two lines come in order (passports first, present second) but neither waits on anything else.
- Puzzle types used (cap: two of any type): a number lock from a document with a correction on the same sheet (the chest) · a trade with a person who wants something (Zaina) · a witness who points, then a search with a false trail (Elliot, the cushions, the games drawer) · pick one of four by a signature seen elsewhere (the boxes) · a list to complete with one decoy that bounces (the case, the library book) · two hands-on gestures (lift-and-pull drawer, the zip drag) · order-by-date and first letters (the diary, Night Moth). No type twice. **Observation:** talking to a person is the step four times (Dad twice, Zaina, Elliot, and Mum for the brief); it is the level's character (playbook 4t, people who move), not one puzzle type, but worth saying so the next level does not lean on it the same way.
- For every lock, the in-game clue that points to its answer and where the player sees it:
  - The chest: Dad's line ("when we take off", p3) + the booking on the fridge (departure 22:45, n2) + Mum's note across it ("moved an hour EARLIER", same close-up). Decoys on the same sheet: taxi 18:30, boarding 21:05, arrival 05:50; 2245 gets its own wrong-try line pointing at the note.
  - The torch: Nana's postcard (m3) names the torch and guesses Zaina cooked it; the oven (k3) shows it; Zaina says what she wants; Elliot (l3) says where; the sofa (l2) has four cushions, Peanut under the fourth, the games drawer as a false trail with a line that rules it out.
  - The boxes: Dad's second line ("the one Elliot drew on", p3); the rocket with the cog on the fridge (n2) and on Elliot's pinboard (k2), each with a line that names the cog as his signature; the four boxes carry four drawings.
  - The zip: the suitcase's own line lists what is still to go in; the list on the fridge names the jumper, the toothbrush and NOT the library book.
  - The diary (Night Moth): the diary's feedback ("five postcards, five years, five first letters" once the cards have been seen); the pinboard's years; the map's place names; the Noticed lines carry both sets.
- Tiered hints per trail (nudge · what to try · the answer): in `HINTS` in the stage, three tiers for every step of every trail (twenty steps), the first two saying where to look, never what to do (`STORY.md` stage 2, "harder than Trent Park"). From build 2026-10-18c each hint names its `target` hotspot, which the second tier pulses when the notebook closes; there are no sparkles (owner, 17 Oct 2026; see the learning loop).
- The notebook's "Noticed" lines: eleven (`noticed()`): Mum's brief; Dad on the drawer and the code; the booking and Mum's note; Nana's torch; the torch in the oven and Zaina's price; Elliot on the sofa; Dad on the box; Elliot's cog; the postcards' pictures and years; Dad's pins; the diary's word once found.
- Wrong-try lines (friendly, never a punishment): the chest at 2245 ("That is what the printout says. What did Mum stick across it?") and at anything else; the wrong boxes (lights in a knot, a fan that does not go round, a spider who would rather you shut the lid); the library book in the case (Mum, without turning round); Peanut in the oven; the torch, present, passports or list held up to the en suite door, each answered by Dad; the list or the book to Mum; Peanut to Elliot; the torch to Zaina; the diary's padlock that "does not move".
- The Night Moth bonus (optional hard layer): the diary (above). Reward: Nana's note, "The moth is real. Ask me in the attic", a star on the postcard home and in the notebook.
- Every clue given by sound is also shown: n/a. No clue is given by sound; the shower is drawn as steam over the en suite door.

Paper playtest: solved from the chart alone by Claude, 18 Oct 2026 (a retrofit, so a check rather than a discovery): every answer has a visible clue; the three decoy times on the booking and the three wrong boxes each have a line; the Night Moth is solvable from the pinboard and the map alone.
Result: passes on paper. Two things for the owner: the shared cog (Gate A) and the arrival views (Gate B).

### Gate B — level outline
Checked: map walk-through passed · paper playtest passed · no puzzle type more than twice · every answer has a visible clue · difficulty matches the brief
Signed off:

---

## 4. Greybox

This level never had a greybox: it was built straight into finished art on 16 Oct 2026, from the owner's materials and a design approved on paper (playbook 4x). The tests the gate asks for were run on the finished build instead, and are recorded here so the gate's questions are answered.

- Stage key and plugin file: `packing`, `next/landscape/stages/packing.js`.
- Play link (pinned to commit): given in chat with each build (`?stage=packing&fresh`).
- What is placeholder: nothing.
- What is real: everything.

Tests: scripted playthrough passes · audit clean · no soft-lock (checklist 42) · owner played it on the tablet at 2000×700 · played once on a real Android phone (checklist 44) · reduced motion checked
- Scripted playthrough: `tools/play-h.js` plays it end to end with the wrong tries (the diary's wrong word, the library book bounced, the wrong box, the chest at 2245 and at the printout's time, Peanut found, the trade, the drawer lifted and pulled, the five things in, the zip, the lobby, the postcard, then the Night Moth). Passes on 2026-10-18b and 2026-10-18c.
- Audit: no failures on 2026-10-18b and 2026-10-18c (three B10? lines to look at: cut-outs without a shadow that are meant to be flat or inside something).
- No soft-lock (walked 18 Oct 2026 over every state): nothing is consumed by a wrong use (every wrong use answers with a line and keeps the item); no item can be lost (the only things that leave the strip go into the case, or Peanut to Zaina, which hands back the torch at once); Peanut appears under the fourth cushion until taken and the sofa can be reopened any number of times; the drawer gives the passports whenever it is opened until they are taken; the boxes give the present whenever the rocket box is opened; Dad's lines come in order and the present trail does not depend on hearing his second line (the boxes open regardless); no door shuts; the front door opens as soon as the case is zipped; the Night Moth is independent of everything. **One persistence nit found and fixed in 2026-10-18c:** the library book's bounce out of the case (1.5 s) was saved mid-bounce, so a reload in that second and a half lost the book for good. Cosmetic only (the book is a decoy), but a thing that disappears is a fault; the mid-bounce state is no longer saved.
- Owner played it on the tablet: yes, 16 and 17 Oct 2026 (the version 2 build and the persona run); he chose it over version 1 on 18 Oct ("Let's use the photograph built v2").
- Real Android phone: not recorded. Owed before the lite game is called finished (checklist 44).
- Reduced motion: the rain, the gold veil, the pulses and the drag all follow the engine's reduced-motion rule; not re-checked on this level specifically.
Target-age tester (if available): the Claude-in-Chrome persona run (owner, 18 Oct 2026, stopped after about twenty minutes) was on a build of this stage from its own branch; its notes are to be filed here once the persona kit is set up (see notes).
Result: plays right by every test that was run; the phone test is owed.

### Gate C — it plays right
Signed off:

---

## 5. Asset and script list

Reuse first: from `next/art/flat/` (packing day v1): the suitcase close-up and zip tab (`closeup-suitcase.jpg`, `layer-zip.png`), Dad's drawer (`closeup-drawer-open.jpg`, `layer-drawerfront.png`), the item pictures that double as icons (`layer-passports/torch/present/jumper/list.png`). From `next/art/zaina/`: Peanut (`layer-peanut.png`). From the whole-game layer: the moth's portraits, the title theme, the notebook. Prompts and method: `next/art/classroom/PROMPTS.md` ("Packing day, version 2") and playbook 4x.

| # | Asset | Type | Reused from | Prompt or line | Est. credit |
|---|---|---|---|---|---|
| 1 | m1–m4, k1–k4, c1–c4, p1–p4, l1–l4, d1–d4, n1–n4, y1–y4 (32 walls, `next/art/home/`) | wall | new | each from two references (the game's box, the owner's photograph of that room) and the shared paragraph; no people, no lettering (PROMPTS.md) | 32 generations, 32 right first time (4x) |
| 2 | `layer-mum-hob.png`, `layer-mum-fold.png` | cut-out | new | character sheet on magenta from Mum's photograph and the cut-out style reference; keyed with `tools/keymag.py` | 2 |
| 3 | `layer-zaina-cook.png`, `layer-zaina-sleep.png` | cut-out | new (Zaina's look from her portrait) | as above | 2 |
| 4 | `layer-elliot-bricks.png` | cut-out | new (Elliot's look from his portrait) | as above | 1 |
| 5 | `closeup-board.jpg` (the pinboard, blank), `pc-athens/tromso/trent/istanbul/cornwall.jpg` (the five postcards) | close-up | new | the board bare; five generic views, no lettering (the years are drawn by the game) | 6 |
| 6 | `closeup-fridge.jpg`, `rocket.jpg` | close-up | new | the fridge door with blank papers (the words are the game's); a wax-crayon rocket with a cog in the corner | 2 |
| 7 | `closeup-oven.jpg` | close-up | new | the toy oven open, empty (the torch is laid over it) | 1 |
| 8 | `closeup-sofa.jpg`, `closeup-sofa-bare.jpg` | close-up | new | the sofa; then "remove the cushions" (the cushions are parts cut from the first; checklist E29b) | 2 |
| 9 | `closeup-bath.jpg` | close-up | new | the bathroom, the cup (the toothbrush is laid over it) | 1 |
| 10 | `closeup-boxes.jpg` | close-up | new | four boxes with four drawings | 1 |
| 11 | `closeup-worldmap.jpg` | close-up | new | a world map, no lettering (pins and names are the game's) | 1 |
| 12 | `scene-lobby.jpg` | scene | new | the family in the lift lobby, gold light, from the four photographs | 1 (+ re-dos not recorded) |
| 13 | `item-toothbrush.png`, `item-book.png`, `item-diary.png` | icon | new | on white, keyed | 3 |
| 14 | `closeup-suitcase.jpg`, `layer-zip.png`, `closeup-drawer-open.jpg`, `layer-drawerfront.png`, `layer-passports/torch/present/jumper/list.png` | close-up, cut-out, icon | `next/art/flat/` (v1) | none | 0 |
| 15 | `layer-peanut.png` | cut-out | `next/art/zaina/` | none | 0 |
| 16 | `next/art/comic/packing-1/2/3.jpg` | comic | new (v2 pages) | the three pages: rain and the postcard; the empty case; Dad in the shower since lunch | 3 |
| 17 | `next/art/postcards/packing.jpg` | postcard | new | the picture on the postcard home | 1 |
| 18 | `next/art/music/flat.mp3` | track | packing v1 | the flat's rainy-afternoon theme (Lyria) | 0 |
| 19 | voice: 74 lines (`packing.*` in `next/art/voice/index.json`): 60 hint tiers, 6 comic captions, the card, the intro, the meanwhile line, the four notes (list, booking, postcard, diary), the postcard home | voice | new | the text in the stage; recorded with `tools/voice.py` | 74 lines |
| 20 | the jumper on the rack, lifted from y1 ("remove the jumper" edit); the knife block painted out of the kitchen | edits | | | 2 |

- Script locked on: 16 Oct 2026 in effect (the lines were recorded that day). Any line changed from now on is a re-record and is noted here. None since.
- Total estimate: n/a (retrofit). Actual, by count: about 58 image generations and edits, 74 speech lines, 0 music.

### Gate D — list and budget
Signed off:

---

## 6a. Sample pack

Not done as a stage: the level was made in one pass from approved paper (playbook 4x). For the record, the pictures that would have been its samples, and how they came out:

| Sample | What it is | Why this one | Result |
|---|---|---|---|
| Wall | n1, the kitchen with the hob (a person stands against it; cupboards, tiles and counter must read as one room with n2–n4) | the most furniture and the one that Mum's cut-out must sit in | right first time; Mum stands on the floor with her shadow |
| Cut-out | `layer-mum-hob.png` | the first person drawn from a photograph for the game | approved; her look written into STORY.md |
| Close-up | `closeup-fridge.jpg` | four readable papers at once, the level's densest sheet | approved; words drawn by the game, not the picture |
| Voice ×2–3 | hint `packing.hint.4.1` (the booking), the card, the chest's wrong-try | | recorded with the batch |
| Track | `flat.mp3` | reused from v1 | kept |

Judged in the greybox, on the tablet, with the inventory strip and arrows in place: judged in the finished level instead, on the tablet, 16–17 Oct 2026.
Prompt changes made before sign-off: the knife block (painted out); the people (added "no people, no faces, no photographs of people" to every wall prompt after the first batch, so the family in the photographs never reached a wall).

### Gate E — samples
Signed off:

---

## 6b. Batch

- Made on: 16 Oct 2026.
- Originals copied to Drive folder: **not done.** The 1K walls in the repo are the only copies; there are no 2K originals for this level (walls were made at 1K). The owner's photographs stay with him. Nothing to copy now; the rule applies from the next level.
- Checked against the checklist: proportions (cut-out boxes keep the pictures' proportions; audit B9 clean) · no lettering (all words drawn by the game) · matches the samples (one hand, one palette across the 32 walls, see the room specifications) · stands on its surface with a shadow (Mum, Zaina, Elliot and the diary carry shadows; the book, the jumper on its hanger and the rain layers are flat or hanging and do not, audit B10? lines).
- Re-dos and why: the knife block (safety); the first walls with people in them (fiction and faces); counts not recorded at the time.

## 7. Integrate and polish

- Play link: in chat with each build.
- Checklist walk at 2000×700, 740×360, 2200×1300, reduced motion: 16 Oct 2026 by the session that built it (its notes are in playbook 4x and feedback log 52); not re-walked for this file.
- Audit: clean on 2026-10-18b and 2026-10-18c.
- Art looked at side by side with the finished levels' (checklist 43): this level is the reference set. Looked at room by room on 18 Oct 2026 (all four walls of each room tiled together): one hand and one palette throughout; the corners mostly agree because each wall was drawn from the photograph of the same room (the window on m4's right is m1's window; l3 shows the dining table that d3 shows; d4 shows the sofa that l2 shows; n4 and y4 show each other's rooms through the door). Two places where a corner shows something its neighbour does not: n1's right edge (a glazed wooden door where n2 begins with the fridge) and c4 (glass either side of a corridor that has none in c1–c3). Known fault class (checklist 46, backlog 19); recorded, not fixed.
- Voice lines recorded (`tools/voice.py`), none missing: 74 present in `index.json`; the play script reports no missing files.

### Final sign-off
Signed off:

## 8. Release

- Merged on: 16 Oct 2026 to its own branch; 18 Oct 2026 to `main` (pull request #10, build 2026-10-18b), chosen by the owner over version 1.
- Playtester notes (who, what, fix now or later): the owner, 16–18 Oct 2026, on the tablet: chosen as the model level. The Claude-in-Chrome persona (18 Oct 2026, about twenty minutes, stopped early): its report was written against build 2026-10-16c of this stage; its items are to be filed here when the persona kit is set up.

---

## Room specifications

Written 18 Oct 2026 from the finished walls (not from the photographs, which are not kept), so that any wall of this flat that is ever redrawn agrees with the others, and so that other levels can be judged against them (checklist 43). The whole flat: white walls with a faint warm cast, ink outlines, flat colour with soft shading, grey-green storm light from every window until the clear, then a gold veil drawn by the engine. Nobody is drawn into a wall; people are cut-outs. No lettering anywhere.

| Room | Floor | Walls, skirting, ceiling | Exterior glass (storm light from) | Fixed things by wall | People |
|---|---|---|---|---|---|
| Mary's room | pale beech planks; a blue-and-white striped rug under the sofa and the case; a sheepskin under the desk | warm white; teal-grey skirting line; plain pale ceiling | m1 (the window with cream curtain), m4 (window at right) | m1 window, sill of frames, music stand, pedal bin · m2 grey sofa, pink throw, blue tin, the purple case open on the rug · m3 white wardrobes with stickers, the door (open, corridor beyond), pinboard, little whiteboard · m4 dark-wood loft bed, cube bookcase, black desk, white swivel chair, paper rainbow | none |
| Elliot and Zaina's room | pale beech planks; a grey rug | white; teal skirting; plain ceiling | k1 (glass doors and the big tree), k2 (window at right) | k1 bunk end with ladder, patchwork armchair, Rope the snake · k2 sticker bunks, frames, cork pinboard, clip lamp · k3 door, string of felt animals, hanging pockets, wooden clock, toy kitchen, brick box · k4 cube wall in yellow, green and teal, doll's house, teal clock | Zaina at the toy kitchen (k3), later Mum folding (k2) |
| The corridor | large pale stone tiles | white; pale wood skirting; plain ceiling with a pendant on c1 | c1 (the dining end's glass beyond), c4 (glass either side, see corners) | c1 the opening to the dining end, intercom · c2 Mary's door, a picture · c3 the children's door and the bathroom door, both open, two pictures · c4 Mum and Dad's double door, laundry basket | none |
| Mum and Dad's room | pale beech planks | white; teal skirting; plain ceiling | p1 (full-width glass, cream curtains), p2 and p3 (glass at right), p4 (glass at right) | p1 the view (tower, palms, hill), driftwood lamp, dark chest of drawers · p2 desk with screen, black chair, wardrobe door, basket · p3 door out (open), a picture, the en suite door shut with steam, basket · p4 winged headboard bed, floral quilt, the old bear, shelf, bedside table | none (Dad is a voice) |
| Living room | large cream stone tiles; a round pink patterned rug | white; pale skirting; plain ceiling with a fan on l3 | l1 (balcony doors, plants, brown curtain), l2 (glass at right), l3 (glass at left), l4 (glass at left) | l1 balcony plants, navy armchair, knitted pouffe · l2 sage L-sofa with cushions, fairy lights, three pictures, shelf unit · l3 sofa arm, brick spill, green box, the dining table beyond · l4 big plant, shelf unit, white desk, fan heater, Dad's backpack | Elliot on the rug (l3), later Zaina asleep (l2) |
| The dining end | large pale stone tiles | white; pale skirting; plain ceiling with the round lamp | d1 (glass at left), d3 (full-width glass) | d1 world map, red banners and paper chain, pine table end with the tall chair, kitchen door · d2 dark double front door, intercom, hall table with bowl and plant · d3 long pine table laid, bookcase, piano, two pictures · d4 the sofa's back and the living room, the corridor opening, tall plant | none |
| Kitchen | grey square tiles | white cupboards, cream splashback tiles, pale wood counter; plain ceiling | n2 (glass door at right), n3 (glass at centre), n4 (window over the sink) | n1 upper and lower cupboards, hob and hood, oven with striped gloves · n2 fridge covered in papers, kettle, utensil pot · n3 door back (open), clock, fruit bowl · n4 window, sink, the yard door open with the rack beyond | Mum at the hob (n1) |
| The yard | grey square tiles | white square wall tiles to the ceiling; a bare bulb | y1 (louvred window), y2 (window), y3 (small window) | y1 drying rack with washing and the jumper, mop and bucket · y2 shelf with four boxes, washing machine, broom, glazed door to the kitchen · y3 basin, mirror, towels, a door · y4 fire blanket, the kitchen door open | none |

Light: grey-green daylight from the glass on every wall until the clear, warm lamps where drawn (driftwood lamp, fairy lights, the round lamp, the kitchen's under-cupboard strip). After the clear, the engine lays the gold veil over every view; no wall is redrawn for it.

## Credit ledger

| Stage | Estimate | Actual | Re-dos (count) | Why |
|---|---|---|---|---|
| 6a samples | n/a | included below | | |
| 6b batch | n/a | about 58 image generations and edits; 74 speech lines; 0 music | not recorded (at least 2: knife block; first walls with people) | safety; fiction and faces |
| 7 polish | n/a | 0 | | |
| Total | | about 58 images, 74 lines | ≥ 2 | the ledger rule came after this level; counts from the files and PROMPTS.md |

## Learning loop

| Found at | Fault | Fixed how | Rule for every level? | Written to (Playbook § / Checklist line / audit) |
|---|---|---|---|---|
| Retrofit, 18 Oct 2026 (the kitchen screenshots) | The level sparkled its key thing (`sparkle()` in the stage): a gold star by Mum and over the fridge at the start. The owner's rule of 17 Oct 2026 (version 3 design) is that nothing glows by default and the glow belongs to the hint tiers. | `sparkle` removed; each of the twenty hints given a `target`, which the second hint tier pulses (build 2026-10-18c). | Yes, already a rule; this is the first finished level brought under it. | Playbook 4d/§7 (hint targets, 17 Oct); CLAUDE.md engine notes; this file. |
| Retrofit, 18 Oct 2026 (soft-lock walk) | The library book's bounce out of the case was saved mid-bounce; a reload in that 1.5 s lost the book (a decoy, so not a soft-lock, but a thing that vanishes). | The mid-bounce state is no longer saved; a reload finds the book on the sofa (2026-10-18c). | Yes: a timed, cosmetic state is never saved; only the state at rest is. | Playbook §7 (new line); checklist 42's soft-lock walk now reads "and nothing timed is saved mid-way". |
| Retrofit, 18 Oct 2026 (map walk-through) | Four arrivals face the door just used (into the corridor from the dining end, from Mary's room, from Mum and Dad's room; into Mary's room). | Not fixed; held for the owner (a four-value change in `DOORS`). | The rule exists (4a-ii). The learning is that the audit does not check it: a machine can (the arrival view must not hold the door back). | Audit backlog: check `DOORS` arrival views against the door hotspots. |
| Retrofit, 18 Oct 2026 (Gate A) | Elliot's cog is a clue here and the collected thing in his own stage. | For the owner to rule on. | If a breach: "a character's signature may appear in several stories, but is the answer to a puzzle in only one". | Pending. |
| Retrofit, 18 Oct 2026 (Gate B) | The first view of a room is not always its north wall, so the floor plan had to place walls by the doors rather than by view order. | Recorded in the map's legend. | Yes: a level built from the gates lists each room's views north first, so plan and stage agree (4y). | Playbook 4y (already says so); this file. |
| Retrofit, 18 Oct 2026 (6b) | No originals copied to Drive, no credit recorded. | Nothing to recover; counts taken from the files. | Already rules (CLAUDE.md gates 6b, ledger). | This file. |

## Notes for this level only

- Puzzle values, for anyone checking the chart against the game: chest `CODE` 2 1 4 5; diary `WORD` ATTIC from `CARDS` in date order (Athens 2018, Tromsø 2019, Trent Park 2021, Istanbul 2023, Cornwall 2025); `PACK` passports, torch, present, jumper, toothbrush; `HIDDEN` the first three, two of which clear the sky; Peanut under cushion index 3; the rocket is box index 1.
- The stage's `moves` line is the record of who moves when (Zaina, Mum, Dad, the light); `STORY.md` stage 2 carries the same.
- The persona kit, when built, files its reports here under 8 (Release), one per run, with the build id they were played on.
- The owner's rulings asked for in this file: the shared cog (Gate A); the four arrival views (Gate B); the phone test (Gate C, owed).
