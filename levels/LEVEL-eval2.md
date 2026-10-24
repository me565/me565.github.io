# Level: eval2 — the second test level (no child; the owner's brief to come)

*Opened on 24 Oct 2026 at the owner's word ("begin a new evaluation level using the new framework"), from `levels/LEVEL-TEMPLATE.md`, the first level file made since his decision of the same day that every future level uses the test room's design and art style and that he draws every level's logic and puzzle map himself (playbook 4aa; `STORY.md`, Visual style). Everything below section 1's checklist is the template, untouched. Section 1 holds what the repo already settles and the decisions that are the owner's, each asked once with a default (checklist 8c). Nothing here is signed, nothing is built, and nothing spends credit until the gates say so. The stage key `eval2` and the hotspot prefix `e2_` are reserved for it; no stage file exists until Gate B.*

Status: `brief` | `outline` | `greybox` | `assets listed` | `samples` | `batch` | `integrating` | `released`
Current status: brief (waiting on the owner's answers to the decisions in section 1)
Build id of the latest play link: none
Latest play link: none

---

## 1. Brief

- Design and art: the test room's (owner, 24 Oct 2026): the room-specification method on Sunburst in the signed-off style (playbook 2, 4aa) and the test room's way of playing (4ac, 4ad; checklist 59 to 67); `levels/LEVEL-evalroom.md` is the reference. The puzzle map and logic are the owner's own, drawn fresh for this level, never carried over from an older stage.
- What it is (proposed; the owner's word needed): the second standalone evaluation level, after "Lock-up Duty". The first test room proved one room: the room-specification art, every interaction type, and the test room's way of playing (close-ups that take items, finding as a close-up, drawers that open and shut, one thing one thing, a key that is a tap). This one tests what one room could not, so that the first real level built the new way starts with those answers already in hand. Its jobs are listed under decision 2 below.
- Child and age: none, as for the test room (default). Mary's desk and Mr Hollis's name stay wherever the art shows them; no story beat depends on either.
- Where and when in the journey (see `STORY.md`): outside the journey. The same last afternoon of term at Knightsbrook, if the default rooms stand (decision 1).
- The objective, in the child's words (one sentence): the owner's, with his premise (decision 4).
- Difficulty (1–5, from `STORY.md`): 4 by default, the test room's standard ("hard but fair, Rusty Lake standard"); the owner's number if he wants another.
- Length: about fifteen minutes for a player who reads carefully (default; the test room was ten, with one room).
- The signature moment (one thing the player will remember): the owner's, from his map.
- The opening gesture: the owner's. The test room's was picking up the envelope; a second test level could try the other kind, a gesture on the room itself (a blind, a door), so both kinds have been played in the new style before a real level needs one.
- What this level carries forward from earlier ones, and what it hands on: nothing comes in. It hands on learning only: the verdicts on doors and arrival views in the new art, on clues that travel between rooms, on hint voice in the new style, and on whichever engine items the owner lets in (decision 3).
- Legal and fiction check: fictional names only, no brands, no Merlion, nothing borrowed: as the test room (Knightsbrook, Mr Hollis, Nutmeg all invented; no brands; the corridor's only words are LIBRARY and HALL). Walked again once the owner's map names its things.

### What the repo already holds for this level (materials listed back, checklist 8c)

Nothing has arrived from the owner yet. What is already in hand, at no cost:

- **Classroom 5H**, the test room: four walls, nine cut-outs and the five lifted by crop, seven close-ups and six icons in `next/art/eval/c5h/`; its stage logic in `next/landscape/stages/evalroom.js` (not reused here; the owner's map is drawn fresh, but the stage's wiring for close-up targets, drawers, the key tumble and the key turn is the pattern this level's stage follows).
- **The school corridor**, written as "evaluation room 2" on 21 Oct 2026: its room specification `evals/images/rooms/corridor.json` (h1 lockers north, h2 library doors east, h3 notice board and the hall doorway south, h4 the two classroom doorways west; cream over a pale mint band, light from the hall doorway). All four walls were drawn by Sunburst in run `rooms-2` that day for about 10¢ and scored clean ("Four walls, four corners, one corridor… the glimpses through the doorways all read as rooms beyond"; `evals/images/results/2026-10-21-rooms-2.scores.json`). The pictures are in that run's runner artifacts, which GitHub keeps for 30 days (until about 20 Nov 2026); the repo holds the prompts and the sketches, so a re-run costs about the same again if they are gone. The test room already shows a darkened `next/art/school/h1.jpg` behind its open door (MOTH-91); the new corridor's h4 is the wall that doorway should open onto.
- **Nana and Jedi's kitchen**, "evaluation room 3", in the same state: `evals/images/rooms/nana-kitchen.json`, four walls drawn in the same run, scored as "a different house, held together". The alternative setting in decision 1.
- The classroom track and the school ambient; the moth's two poses; the engine's hint tiers, notebook, clue cards and the long-press reveal.
- The design library `me565/core-skills/game-design/` (principles, the avoid list, 56 mechanics with examples from the games the owner has reviewed), which is what the owner's map is checked against at Gate B (below).

### Decisions for the owner, asked once, each with a default (checklist 8c)

1. **Rooms.** Default: two, Classroom 5H and the corridor, joined by the classroom door (c3 ↔ h4), with the library, hall and art-room doorways on the corridor's walls painted open but not walkable. This reuses every test-room picture, costs nothing if the corridor walls are fetched from the runner's artifacts, and is the smallest map that has a door, an arrival view, a hub and a linear opening (playbook 4a-ii, 4c, 4y). Alternative: Nana's kitchen alone or with one neighbour, if he would rather test a different house than a second school room. Three or more rooms is his call and costs about 10¢ a room.
2. **What the level tests** (its jobs, the way the test room had three). Default, in this order:
   - a. Doors and arrival between two rooms in the new art: walking through, arriving facing away from the door, the corridor's doorway glimpse agreeing with the classroom it opens onto, and the side-wall corners agreeing across the door (checklist 57; playbook 4z).
   - b. Trails that cross rooms: at least one lock whose clue is in the other room, carried as a clue card in the notebook (checklist 47) so the walk is one trip, not many (the library's AVOID-005, which the owner has marked as the thing to ease).
   - c. The hub shape: a short linear opening in one room, then two or three trails open at once across both (playbook 4c; MECH-117 chains, MECH-118 one thing serving two solutions, which he loves).
   - d. The moth's recorded voice in a test level (the test room's lines were text), so hint tiers are heard, not read, before a real level records its script at Gate D.
   - e. A Night Moth bonus, the optional hard layer, which no test has yet carried in the new style.
   - f. Whichever engine items the freeze lets in (decision 3), played in a room built for them: the three-step reward moment (backlog 20), Nutmeg's standing pose (backlog 22; the picture is not made yet), drawers' open and shut rest states (backlog 26), dragging the rubbish (backlog 27), the sweep turn (backlog 29), the one inventory column (MOTH-75).
3. **The engine freeze.** The rule is that the whole-game layer is frozen while a level is between Gate A and release, and school version 3 (`school3`) is at the greybox with Gate C waiting. The 24 Oct decision restarts every level, the existing ones included, from the owner's own brief and map, which reads as standing that greybox down. If it stands down, the engine is free between levels now, and backlog 20, 22, 26, 27 and 29 and MOTH-75 can be built and tested across every level before this level's Gate A is signed, then tried here (job f). If it stands, this level fakes them as the test room did. Default: the owner says which; the file assumes nothing.
4. **The premise and the puzzle map.** His, drawn fresh (24 Oct 2026): the premise in a sentence, the rooms' things, every trail as item → clue → lock → reward, and the ending. The test room's "Lock-up Duty" is the model for the shape of what to hand over, not for its answers. What this file adds is the set of checks his map is walked through at Gate B, listed below, so he can draw to them.
5. **Difficulty and length.** Defaults 4 and about fifteen minutes.
6. **Child.** Default none. If he would rather this be the first real level instead of a second test, it becomes one child's stage with a story brief, and the jobs above fold into that level's Gate A.

### The checks the owner's map is walked through at Gate B

From this repo: the walk-through test and the paper playtest in sections 2 and 3; no puzzle type more than twice; every answer with a visible in-game clue; every clue given by sound also shown; no soft-lock (checklist 42); the opening view carrying no clue and no item (8b); nothing shared with a child's story (3); the motion sheet before any art (3b, playbook 4ab); the test room's rules on close-ups, drawers, locks, tools and turns (checklist 59 to 67).

From the design library in `me565/core-skills/game-design/` (read the way its README asks build sessions to): the principles in the Moth House's scope, P-01 curiosity as the core feeling, P-02 every answer clued within the chapter, P-03 hints optional and vaguest first, P-04 story in pieces, P-05 the adult Rusty Lake audience; every entry of `avoid.md` that applies to the Moth House, AVOID-001 to AVOID-008 (no fright, no timers, no fail states, no answer clued outside the chapter; and the cautions on long round trips with a clue in the head, steps found only by trying things at random, sums that send the player out of the game, and clues that play out over time); and each trail cited by the mechanics it builds on (for example "built on MECH-112 + MECH-117"), preferring the ones he loves (MECH-114, MECH-118, MECH-137) and the ones seen in more than one reviewed game. Every reference to a reviewed game is to its idea only; nothing of its puzzles, names, art or text is lifted (checklist 2).

### Gate A — story
Checked: fits the arc and the age · nothing borrowed · fiction and legal rules · nothing shared with another child's story
Signed off:

---

## 2. Game map

- Floor plan: `levels/LEVEL-eval2-map.json`, drawn with `python3 tools/levelmap.py` into `levels/LEVEL-eval2-map.drawio` (the owner's style, playbook 4y: rooms where they really stand, north up, door tabs on shared walls, labelled walks, red for locked, green for the start):
- Rooms and their views (in turning order):
- Doors: which door leads to which room, and the view you arrive facing:
- Locked at the start, and what opens it:
- The linear opening (the one room that teaches the mechanic):
- The hub (where several trails open at once):

Walk-through test: every room reachable · little backtracking · once opened, stays open
Result:

## 3. Puzzle chart

- Chart (draw.io file or table): every trail as item → clue → lock → reward
- Trails that run in parallel:
- Puzzle types used (cap: two of any type):
- For every lock, the in-game clue that points to its answer and where the player sees it:
- Tiered hints per trail (nudge · what to try · the answer):
- The notebook's "Noticed" lines:
- Wrong-try lines (friendly, never a punishment):
- The Night Moth bonus (optional hard layer):
- Every clue given by sound is also shown: yes / n/a

Paper playtest: solved from the chart alone by
Result:

## 3b. Motion sheet

Every thing in the level that moves, decided before any art is made (playbook 4ab). A thing not listed here is painted into its wall and stays still.

| View | Thing | When (idle / tap / solve) | Movement (engine name, or "new: …") | Art it needs (cut-out / parts + pivots / poses / code-drawn / none) | Sound | Settled state after |
|---|---|---|---|---|---|---|
| | | | | | | |

Reward moments (one per lock that opens), step by step:

| Lock | Step 1 | Step 2 | Step 3 | Settled state |
|---|---|---|---|---|
| | | | | |

- Living things per view (cap: two):
- New movements this level asks for (go to the backlog, built between levels, not in this one):

Checked: every thing that moves is listed · every lock has a reward moment · no view has more than two living things · every part, pose and pivot named

### Gate B — level outline
Checked: map walk-through passed · paper playtest passed · motion sheet done · no puzzle type more than twice · every answer has a visible clue · difficulty matches the brief
Signed off:

---

## 4. First playable

- Stage key and plugin file: `eval2`, `next/landscape/stages/eval2.js` (hotspot ids `e2_…`); `tools/play-e2.js` plays it
- Play link (pinned to commit):
- What is real: puzzle logic, inventory, hints, saves, doors, the ending; every wall, cut-out and close-up that already exists; the reward moments from the motion sheet, played in the right order with whatever stands in, so the timing is judged before the voice and the batch exist (playbook 4ab, 4ac)
- What stands in: a labelled box or a crop lifted from a wall for each picture that does not exist yet (listed here, so Gate D knows what to make); the moth's lines as text
- Walls generated before this gate (only with the owner's agreed cost, playbook 4ac):

Tests: scripted playthrough passes · audit clean · no soft-lock (checklist 42) · owner played it on the tablet at 2000×700 · played once on a real Android phone (checklist 44) · reduced motion checked
Target-age tester (if available): who, what they got stuck on, what they said
Result:

### Gate C — it plays right
Signed off:

---

## 5. Asset and script list

Reuse first: list what the asset register already holds for this level (shared rooms, icons, portraits, tracks).

| # | Asset | Type (wall / cut-out / close-up / icon / comic / voice / track) | Moves? (no / single / parts / poses, from the motion sheet) | Reused from | Prompt or line | Est. credit |
|---|---|---|---|---|---|---|
| | | | | | | |

A wall's prompt names everything the motion sheet says moves as absent from it ("the shelf's end is empty"), per playbook 2 and 4aa.

- Script locked on: (every voice line above is final; a change after this date is a re-record)
- Total estimate:

### Gate D — list and budget
Signed off:

---

## 6a. Sample pack

| Sample | What it is | Why this one | Result |
|---|---|---|---|
| Wall | the hardest view: | | |
| Cut-out | | | |
| Close-up | | | |
| Voice ×2–3 | one hint, one story line, one wrong-try | | |
| Track | ~30 s | | |

Judged in the greybox, on the tablet, with the inventory strip and arrows in place.
Prompt changes made before sign-off:

### Gate E — samples
Signed off:

---

## 6b. Batch

- Made on:
- Originals copied to Drive folder: (link; if the session cannot carry the files, the note in the folder naming the runner's artifacts, and the owner copies them within 30 days)
- Checked against the checklist: proportions · no lettering · matches the samples · stands on its surface with a shadow
- Re-dos and why:

## 7. Integrate and polish

- Play link:
- Checklist walk at 2000×700, 740×360, 2200×1300, reduced motion (`tools/polish-e2.js` from `tools/polish-ev.js`; `REDUCE=1 node tools/play-e2.js`):
- Feedback rounds on the tablet (playbook 4ae): each recording's date, build, the cards logged, the build that answered them:
- Audit:
- Art looked at side by side with the finished levels' (checklist 43):
- Voice lines recorded (`tools/voice.py`), none missing:

### Final sign-off
Signed off:

## 8. Release

- Merged on:
- Playtester notes (who, what, fix now or later):

---

## Credit ledger

| Stage | Estimate | Actual | Re-dos (count) | Why |
|---|---|---|---|---|
| 6a samples | | | | |
| 6b batch | | | | |
| 7 polish | | | | |
| Total | | | | |

## Learning loop

Every fault found in this level, where it was found, and what happened to it.

| Found at | Fault | Fixed how | Rule for every level? | Written to (Playbook § / Checklist line / audit) |
|---|---|---|---|---|
| | | | | |

## Notes for this level only

- Opened 24 Oct 2026 in a Claude Code session started from `me565/core-skills` (the design library's repo). The session had read access to this repo only, so the file was committed on the local branch `claude/level-eval2` and a copy given to the owner; pushing the branch waits on his permission.
- The test room's open items that this level inherits as context, not as work: MOTH-81 (the timetable's header as periods: his call), MOTH-82 (the "Holding" line, watched for), MOTH-75 (one inventory column, engine), Nutmeg's second pose (engine, backlog 22).
