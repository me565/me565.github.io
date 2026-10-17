# Level: <key> — <child>, <stage name>

Copy this file to `levels/LEVEL-<key>.md` when a level starts. Fill the stages in order. A gate is open only when its `Signed off:` line holds the owner's words and a date. Anything that spends credit (stages 6a and 6b) stays blocked until gates A to D are signed, and the batch until E.

Status: `brief` | `outline` | `greybox` | `assets listed` | `samples` | `batch` | `integrating` | `released`
Current status: brief
Build id of the latest play link:
Latest play link:

---

## 1. Brief

- Child and age:
- Where and when in the journey (see `STORY.md`):
- The objective, in the child's words (one sentence):
- Difficulty (1–5, from `STORY.md`):
- The signature moment (one thing the player will remember):
- The opening gesture:
- What this level carries forward from earlier ones, and what it hands on:
- Legal and fiction check: fictional names only, no brands, no Merlion, nothing borrowed:

### Gate A — story
Checked: fits the arc and the age · nothing borrowed · fiction and legal rules · nothing shared with another child's story
Signed off:

---

## 2. Game map

- Floor plan: `levels/LEVEL-<key>-map.json`, drawn with `python3 tools/levelmap.py` into `levels/LEVEL-<key>-map.drawio` (the owner's style, playbook 4p: rooms where they really stand, north up, door tabs on shared walls, labelled walks, red for locked, green for the start):
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

### Gate B — level outline
Checked: map walk-through passed · paper playtest passed · no puzzle type more than twice · every answer has a visible clue · difficulty matches the brief
Signed off:

---

## 4. Greybox

- Stage key and plugin file:
- Play link (pinned to commit):
- What is placeholder: every wall, cut-out and close-up as labelled boxes; the moth's lines as text
- What is real: puzzle logic, inventory, hints, saves, doors, the ending

Tests: scripted playthrough passes · audit clean · no soft-lock (checklist 42) · owner played it on the tablet at 2000×700 · played once on a real Android phone (checklist 44) · reduced motion checked
Target-age tester (if available): who, what they got stuck on, what they said
Result:

### Gate C — it plays right
Signed off:

---

## 5. Asset and script list

Reuse first: list what the asset register already holds for this level (shared rooms, icons, portraits, tracks).

| # | Asset | Type (wall / cut-out / close-up / icon / comic / voice / track) | Reused from | Prompt or line | Est. credit |
|---|---|---|---|---|---|
| | | | | | |

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
- Originals copied to Drive folder: (link)
- Checked against the checklist: proportions · no lettering · matches the samples · stands on its surface with a shadow
- Re-dos and why:

## 7. Integrate and polish

- Play link:
- Checklist walk at 2000×700, 740×360, 2200×1300, reduced motion:
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
