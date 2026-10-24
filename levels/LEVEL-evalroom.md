# Level: evalroom — the test room, "Lock-up Duty" (Classroom 5H, evaluation art)

*Outline only, written in claude.ai on 22 Oct 2026 from a discussion with the owner, recorded here the same day from `EVALROOM-HANDOVER.md` with the owner's two changes made in chat after the review (the lock-up duty premise and the falling key) and the review's findings listed under "Review against the repo". Nothing here is built yet. Do not build, generate art or change the engine until the owner signs Gate B, and then follow the gates as for any level. The stage stays `?stage=evalroom` (`next/landscape/stages/evalroom.js`); its current "one room, no puzzle" content is replaced by this design once it reaches the greybox.*

Status: `brief` | `outline` | `greybox` | `assets listed` | `samples` | `batch` | `integrating` | `released`
Current status: Gate C signed 24 Oct 2026 (live as build 2026-10-23r, release #16); next stage the asset and script list for Gate D
Build id of the latest play link: 2026-10-22f (the first playable, with everything from the owner's three plays built in: MOTH-49 to 68)
Latest play link: `?stage=evalroom`

---

## 1. Brief

- What it is: a standalone test room, not part of any child's story (owner, 22 Oct 2026). It has three jobs at once (owner: "all of the above"):
  1. **Feel and difficulty:** a short escape to judge whether a puzzle is hard but fair at Rusty Lake standard.
  2. **Every interaction type:** pick up and read, tap to search, use an item, combine two items, number dials, a drag gesture.
  3. **New mechanics:** reward moments (backlog 20) and pose swaps (backlog 22), tried here before any level relies on them.
- Child and age: none. Mary's desk and Mr Hollis's name stay because the art shows them; no story beat depends on either.
- The premise (owner, 22 Oct 2026, "lock-up duty"): it is the last day of term and Mr Hollis has gone to the hall. As a treat he has left Mary to lock up 5H, with a note: the classroom key is in his desk drawer, and its code is his last puzzle. The door is not locked; Mary could walk out at any time, but she has been asked to lock up. The ending is Mary turning the key in the door from outside. (The handover's first premise, "I've locked you in", was dropped: a door locked from the inside with its key in the same room made no sense, and a teacher locking a child in sat badly with the child-safe rule.)
- The objective (one sentence): "Mr Hollis has asked me to lock up, and the classroom key is in his desk behind a code."
- Difficulty (1–5): 4. One easy trail, one search-and-combine trail, then one hard lock that needs four clues from four walls, with a trap answer.
- Length: about 10 minutes for a player who reads carefully.
- The signature moment: the drawer code clicking open once the player realises the beans are read in lesson order, not by height.
- The opening gesture: picking up the envelope on Mary's desk (as the evaluation room already does).
- Carries forward and hands on: nothing. What it hands on is learning: the reward-moment and pose-swap engine work, and the verdict on difficulty.
- Legal and fiction check: as school v3 (Knightsbrook, Mr Hollis, Nutmeg all invented; no brands). Passes.

### Gate A — story
Checked: fits the arc and the age · nothing borrowed · fiction and legal rules · nothing shared with another child's story
Walked 22 Oct 2026: not a story level, so only the last three apply. Nothing borrowed: the puzzles are built from this room's own things. Fiction and legal: passes. Shared things: the room reuses school v3's classroom layout and names, which is expected for a test room and is never released as a level.
Signed off: "Happy to sign off Gate A" (owner, 22 Oct 2026, in chat).

---

## 2. Game map

- Floor plan: one room, so no `-map.json` is needed. Classroom 5H, the evaluation walls in `next/art/eval/c5h/`.
- Rooms and their views (turning order, from the room file's compass, checklist 57): c4 timetable wall (north) → c1 whiteboard wall (east) → c3 door wall (south) → c2 window wall (west).
- Doors: the classroom door (c3) is the exit. It is not locked; locking it from outside with the classroom key ends the stage.
- Locked at the start, and what opens it:
  - **Filing cabinet, top drawer (c4):** the small key that falls from the raincoat pocket. Inside: the ruler.
  - **Mr Hollis's desk drawer (c1):** four number dials, **4 9 6 2**. Inside: the classroom key.
  - **Classroom door (c3):** the classroom key, then a drag to turn it (locking up).
- The linear opening: the envelope (pick up, read the note). It teaches the pick-up and the note card, and sets the goal.
- The hub: the whole room. Both trails are open as soon as the note is read.

Walk-through test: every room reachable · little backtracking · once opened, stays open
Result (walked on paper, 22 Oct 2026): passes. One room, so everything is reachable. The hard lock needs the player to visit all four walls, which is the point. Every drawer stays open once opened.

## 3. Puzzle chart

### The trails

| Trail | Item or search | Clue | Lock | Reward |
|---|---|---|---|---|
| Opening | Envelope on Mary's desk (c4) | — | — | The note (below), the goal |
| A. The ruler | Tap the raincoat (c3): it swings and a small key falls out of the pocket onto the floor under the pegs; tap the key on the floor to pick it up (owner, 22 Oct 2026: "the key falls on the floor before I pick it up") | — | Filing cabinet top drawer (c4): use the small key | The ruler |
| A. The heights | Use the ruler on the bean pots (c2) | The pot close-up | — | Four heights, into Noticed |
| B. The order | Bin (c3): lid flips, then the bin seen from the top; push the rubbish aside piece by piece, half a torn note is under the last two (owner, 22 Oct 2026). Lost property box (c3): tap, the red shoe and blue hat pop up, then the box close up; tap the hat to look inside it, the other half is tucked in its band (owner, 22 Oct 2026) | — | Combine the two halves | The watering note (below) |
| The code | — | Envelope note + watering note + whiteboard date + timetable Thursday row + pot labels + heights | Mr Hollis's desk drawer (c1), four dials | The classroom key |
| The way out | Classroom key | — | Classroom door (c3): use the key, then drag to turn it | The ending |

- Trails that run in parallel: A and B, in either order. The code needs both.

### The words and numbers (all drawn by the game, none by the image model)

- **Envelope note** (Mr Hollis): *"Last day! I've gone to the hall. Will you lock up 5H for me, Mary? The classroom key is in my desk drawer. Its code is the beans' heights, read in the order I asked you to water them. — Mr H."*
- **Watering note** (torn, combined): *"Beans: water one pot per lesson, in today's lesson order. — H."*
- **Whiteboard (c1):** the date in the top corner, *"Thursday 22 October"*. Nothing else written, so the date stands out without being circled.
- **Timetable (c4):** the game paints the grid over the poster (the poster's own grid has four rows for five days: MOTH-56). Rows are Monday to Friday; each row shows four lessons from the six in the header and two blank cells, and every one of the six lessons happens on some day (MOTH-57): Mon pencil, brush, music, flask · Tue music, flask, atlas, pencil · Wed atlas, pencil, ball, music · **Thu flask, music, pencil, atlas** · Fri pencil, music, brush, flask. Only Tuesday's four all have pots, so Tuesday (9 4 2 6) is the one "right heights, wrong day" answer; the other days contain a lesson with no pot. (See the review below: the wall's grid has the six subjects as column headers, so the day-by-day grid belongs in a game-drawn close-up, and all five rows are to be listed before Gate C.)
- **Pot labels (c2):** the game draws one icon on each blank label. Left to right: **atlas, flask, pencil, music.**
- **Heights (ruler close-up, c2):** left to right **2, 4, 6, 9 cm**, matching the art (bare shoot, small, middling, tall).
- **Answer:** Thursday's order flask, music, pencil, atlas → pots 2, 4, 3, 1 → **4 9 6 2**.
- **The trap:** reading the pots tallest first gives 9 6 4 2. Reading them left to right gives 2 4 6 9. Both are the obvious guesses, and both are wrong.

### Puzzle types (cap: two of any type)

Key in a lock ×2 (cabinet, door) · combine two halves ×1 · measuring ×1 · multi-clue lookup onto number dials ×1 · drag gesture ×1 · search by moving things aside ×1 (the bin, added 22 Oct 2026). Plain searching (coat, box, hat) is not counted as a puzzle. **Six types, none more than twice.**

### Every lock and its visible clue

- Cabinet drawer: the keyhole is shown in the cabinet close-up; the key is small and silver, and the cabinet's lock is the only small lock in the room.
- Desk drawer: five sources on four walls, as listed above. The envelope note names the drawer, so the player knows where the code goes.
- Door: the envelope note says the key is in the drawer, and asks Mary to lock up.

### Tiered hints (nudge · what to try · the answer; tier 2 pulses the hotspot)

| Step | Nudge | What to try | The answer |
|---|---|---|---|
| Envelope | "Something's waiting on your desk." | Pulse the envelope. | "Pick up the envelope and read it." |
| Small key | "Coats keep all sorts in their pockets." | Pulse the raincoat. | "Tap the raincoat: a key falls out of its pocket. Pick it up off the floor." |
| Ruler | "That little key fits something small and locked." | Pulse the filing cabinet. | "Use the small key on the filing cabinet's top drawer." |
| Heights | "Mr H wants heights. What could you measure with?" | Pulse the bean pots. | "Use the ruler on the bean pots: 2, 4, 6 and 9 cm." |
| Note halves | "Somebody threw something away. Twice." | Pulse the bin, then the lost property box. | "Half a note is in the bin, the other half under the blue hat." |
| Combine | "Two halves make a whole." | Pulse both halves in the strip. | "Hold one half and tap the other." |
| Which day | "The note says today. What day is it?" | Pulse the whiteboard. | "The whiteboard says Thursday." |
| The order | "What happens on a Thursday in 5H?" | Pulse the timetable. | "Thursday: flask, music, pencil, atlas." |
| The code | "Each pot has a lesson on its label." | Pulse the bean pots. | "Flask 4, music 9, pencil 6, atlas 2: 4 9 6 2." |
| The door | "You have the key. Mr H asked you to lock up." | Pulse the door. | "Use the key on the door, then turn it." |

### The notebook's "Noticed" lines

The four heights, once measured · the watering note, once combined · "Today is Thursday", once the whiteboard is tapped · Thursday's four lessons, once the timetable is tapped.

### Wrong-try lines (friendly, never a punishment)

- 9 6 4 2: "Tallest first? The beans don't mind how tall they are. Read the notes again."
- 2 4 6 9: "That's just left to right along the sill."
- Another day's order: "The right heights, but not today's order."
- Any other code: "It doesn't budge."
- Small key on anything but the cabinet: "Too small for that."
- Classroom key on anything but the door: "That's the classroom key. It locks the door."
- Door before the key: "Mary could just go. But Mr H asked her to lock up, and the key is in his desk."
- Drawer before the code is known: the dials open; nothing is lost by trying.

- The Night Moth bonus: none. This room tests the main puzzle, not the bonus layer.
- Every clue given by sound is also shown: n/a (no sound clues).

Paper playtest: solved from the chart alone by Claude, 22 Oct 2026, with the stage file closed.
Result: passes. The code has exactly one reading that fits all four clues. Care points: the pot labels must be readable in the close-up, not on the wall (they are tiny there), and the timetable's Thursday row must be the fourth row with the day names shown, so no one counts rows wrongly.

## 3b. Motion sheet

| View | Thing | When | Movement | Art it needs | Sound | Settled state after |
|---|---|---|---|---|---|---|
| c3 | Raincoat | tap | `swing` (exists) | existing cut-out | leaf | hangs still; pocket empty once the key has fallen |
| c3 | Small key | the first coat tap | new: falls from the pocket and lands on the floor under the pegs (`drop` exists but fades the thing away; the key must land and stay); in the greybox it can simply appear on the floor after the swing | **new:** key cut-out (the same picture as the icon) | a small clink | lies on the floor until picked up, then gone |
| c3 | Bin lid | tap | `flip` (exists) | existing cut-out | knock | lid back on; then the bin close up from the top |
| bin close-up | Five bits of rubbish | tap (drag: backlog 27) | new: shoved aside with a short slide; stand-in by code | **new:** the empty bin from above (close-up) and five rubbish cut-outs | paper | where they were pushed; the half note shows under the last two |
| hat close-up | The corner in the band | tap | none | **new:** the inside of the hat (close-up) | paper | gone once taken |
| c3 | Lost property: shoe and hat | tap | `pop` (exists in school v3) | shoe and hat cut-out, plus the box's front, both lifted from the wall (playbook 4r; they are painted into c3 already) | paper | sit back in the box |
| c4 | Filing cabinet top drawer | solve, then every tap | `slideOpen` (exists) for the unlocking; then open and shut on each tap, in the room and close up, by the stage's overlay until backlog 26 | drawer-front cut-out lifted from the wall; the dark gap behind it is drawn by the game | open, close | out or shut as the player left it; the ruler inside while it is out |
| c4 | Nutmeg | idle, tap, ending | `breathe`, `sniff` (exist); **new:** pose swap, sitting ↔ standing on his back legs | **new:** a second hamster pose | squeak | sitting |
| c2 | Bean pots | tap | `bend` with `pin` (exists) | existing cut-outs | leaf | still |
| c1 | Mr Hollis's drawer | solve, then every tap | the dials open it; then open and shut on each tap, in the room and close up (stage overlay until backlog 26) | drawer-front cut-out lifted from the wall | open, close | out or shut as the player left it; the key inside while it is out |
| c3 | Door | ending | `openDoor` (exists: the locker door folds to its hinge and darkens), with the spill of corridor light drawn in code; the three-step reward moment is backlog 20 | door cut-out lifted from the wall (no wall re-do: checklist 53) | door | open, corridor light |
| c2, c4, c1 | Light | idle | `beam`, `motes`, `clock` (exist) | code-drawn | — | — |

Reward moments:

| Lock | Step 1 | Step 2 | Step 3 | Settled state |
|---|---|---|---|---|
| Cabinet drawer | key turns (icon leaves the strip) | drawer slides out with a soft clunk | Nutmeg stands up, sniffs, sits | drawer open, ruler inside |
| Desk drawer | the four dials flash in turn | drawer slides out | the key glints once | drawer open, key inside |
| Door | the key turns (the drag) | the door swings open, light spills across the floor | Nutmeg stands up and stays up; end card | door open |

- Living things per view (cap: two): c4 Nutmeg and the clock's second hand; c2 the beam and motes; c1 the beam; c3 none until the ending. (See the review: c4 as built also carries a beam; whether code-drawn light counts is for the owner.)
- New movements this level asks for: reward moments (backlog 20), pose swaps (backlog 22) and the key's fall-and-land. **All are engine changes.** The rule is that engine changes are built between levels, never inside one. This is a test room rather than a level, but no level should be mid-gates when they land. As of 22 Oct 2026, `school3` is at the greybox (Gate C waiting), so the engine is frozen. Either the greybox of this room is built first with the reward moments faked as plain steps (and the key appearing on the floor after the swing), or the owner lifts the freeze for these items. **Decided: greybox first** (owner, 22 Oct 2026). The engine stays frozen; the greybox fakes the reward moments as plain steps and the key appears on the floor after the swing; backlog 20, 22 and the key's fall-and-land are built between levels.

Checked: every thing that moves is listed · every lock has a reward moment · no view has more than two living things · every part, pose and pivot named

### Gate B — level outline
Checked: map walk-through passed · paper playtest passed · motion sheet done · no puzzle type more than twice · every answer has a visible clue · difficulty matches the brief
Walked 22 Oct 2026: all six pass as recorded above.
Signed off: "Sign off gate B for evalroom, greybox first" (owner, 22 Oct 2026, in chat).

---

## Review against the repo (Claude Code, 22 Oct 2026)

The handover asked for the design to be checked against the repo as it stands and for every conflict to be listed, not quietly changed. The owner has already decided two of them in chat (the premise and the falling key, written in above). The rest wait on him.

What checks out: every engine movement named exists (`swing`, `flip`, `pop`, `bend` with `pin`, `sniff`, `breathe`, `beam`, `motes`, `clock`, hold-one-tap-the-other combining, number dials as in Dad's drawer, `openDrag`); the turning order matches the stage file; all four walls and the named cut-outs are in `next/art/eval/c5h/`; the pot labels, the whiteboard and the clock face are blank in the art; the code works out and 22 October 2026 is a Thursday; five puzzle types, none more than twice; the hints are in the engine's three-tip shape; no soft-lock in the chain.

Conflicts and suggested fixes:

1. **The timetable art.** The wall's timetable has the six subject icons as column headers over a blank five-by-six grid, with no column for day names. Lesson icons placed under subject-headed columns would contradict the headers. Suggested: the wall's header is the key to the six lessons, and the day-by-day grid is a game-drawn close-up, as school version 2 does with its wall overlay. All five day rows are listed before Gate C, so that "the right heights, but not today's order" can be checked against every other day's code and none collides with the two trap answers.
2. **The door ending asked for a wall re-do** (the handover's asset 9), which checklist 53 forbids, and which would move the coat and lid cut-outs measured on today's wall. Suggested and written into the motion sheet above: lift the door from the wall and use the engine's `openDoor`, with the corridor light drawn in code.
3. **Two "new" movements already exist:** `slideOpen` (the stage drawer) and `openDoor` (the locker). Only the queued three-step reward moment (backlog 20), the pose swap (backlog 22) and the key's fall-and-land are missing. Written into the motion sheet above.
4. **The shoe, hat, both drawer fronts and the door are painted into the walls already**, so they are lifted out by the playbook's 4r method, not generated. The asset list below marks them as lifted.
5. **The cabinet keyhole has no home.** The clue says it shows in the cabinet close-up, but the wall's drawers have handles and label slots only and no close-up was listed. Suggested: a code-drawn keyhole on a cabinet close-up made from a crop of the wall. Added to the asset list as costing nothing.
6. **Hint tier two pulses one hotspot** (`target`), never two and never the strip. "Note halves" (bin, then box) and "Combine" (both halves in the strip) need splitting into one row per target, or a single target; the moth's existing combine tip covers the strip. To settle at the greybox.
7. **Living things in c4.** As built, c4 carries the clock, a beam and Nutmeg breathing. The sheet counts two. Whether code-drawn light counts against the cap is for the owner.
8. **Clues travel (checklist 47).** The timetable row and the day are listed as "Noticed" lines; the current rule is a clue card copied into the notebook and reopened from a chip (`clues()`, `copyClue`). The timetable row, with its icons, should be a clue card.

---

## 4. First playable (built 22 Oct 2026, the first use of playbook 4ac)

- Stage key and plugin file: `evalroom`, `next/landscape/stages/evalroom.js` (the "walk round and tap" content replaced); `tools/play-ev.js` plays it.
- Play link (pinned to commit): given in chat with each build; `?stage=evalroom` on the landscape address.
- What is real: the four walls and nine cut-outs; the puzzle logic, inventory, hints (three tiers, tier two pulses the thing), saves, the ending; the drawer fronts, the door leaf, the box front and the shoe-and-hat lifted from the walls by crop (`layer-tdrawer/cabdrawer/door/boxfront/lost.png`); the timetable, the whiteboard date, the pot labels, the keyhole, the open drawer, the torn corner and the open doorway drawn by the game.
- What stands in (for Gate D): the small key (a grey drawn key, `next/art/greybox/tab-key.png`, also the drag's tab), the ruler, the two note halves and the classroom key as labelled strip icons; the pot close-up, the bin from the top with its rubbish, and the inside of the hat as code drawings; the cabinet, the box and the desk drawer as zooms of their walls. The moth's lines as text.
- Faked until the engine is unfrozen (owner's decision, greybox first): the reward moments are single movements (drawer slides, Nutmeg sniffs; the door folds to its hinge and the doorway is painted behind it); the small key appears on the floor after the coat swings rather than falling; Nutmeg never stands.
- Walls generated before this gate: none.

Tests: scripted playthrough passes (`tools/play-ev.js`: every trail, the two trap codes, a wrong day, nonsense, every wrong-use line, the notebook and clue chips at 844×390 and 2000×700, no page scroll, no errors) · audit clean (0 failures; 8 "for a look", all hanging, flat or inside) · no soft-lock (checklist 42: walked on paper, nothing is consumed by a wrong use, both drawers and the note stay) · owner played it on the tablet at 2000×700: twice, 22 Oct 2026 (the first play gave MOTH-49 to 51, the second MOTH-52 to 54; his recording of build 2026-10-22d, 4 min 6 s, solved without hints, gave MOTH-55; playbook log 65) · played once on a real Android phone (checklist 44): not yet · reduced motion checked (the audit's owner-shape run)
Target-age tester (if available): none (a test room)
Result: passed. The owner played the live build on the tablet: "it's fine, just needs improvements to the images".

### Gate C — it plays right
Signed off: "Yeah it's fine, just needs improvements to the images" and "sign off gate C" (owner, 24 Oct 2026, in chat, after playing the live build 2026-10-23r on the tablet).

---

## 5. Asset and script list (draft, for Gate D)

Reuse first: the four walls and the nine existing cut-outs in `next/art/eval/c5h/`; the envelope icon from `next/art/classroom/`. Lifted by crop on 22 Oct 2026 (no credit): assets 5 to 8 below.

| # | Asset | Type | Moves? | Reused from | Est. credit (Sunburst ~4¢, Nano Banana 2 ~10¢) |
|---|---|---|---|---|---|
| 1 | Small silver key | icon + cut-out (the same picture, on the floor) | single (falls) | — | 1 |
| 2 | Ruler | icon + close-up use | no | — | 1 |
| 3 | Torn note, left half and right half | icon ×2 | no | — | 2 |
| 4 | Classroom key | icon | no | — | 1 |
| 5 | Lost property shoe and hat, and the box front | cut-out | single (`pop`) | lifted from c3 (4r) | 0 |
| 6 | Filing cabinet drawer front | cut-out | single | lifted from c4 (4r) | 0 |
| 7 | Teacher's desk drawer front | cut-out | single | lifted from c1 (4r) | 0 |
| 8 | Classroom door | cut-out | single | lifted from c3 (4r) | 0 |
| 9 | Cabinet close-up with a code-drawn keyhole | close-up | no | a crop of c4 | 0 |
| 10 | Nutmeg standing pose | cut-out | poses | — | 1 |
| 11 | Bean pot close-up (labels and ruler drawn by the game over it) | close-up | no | — | 1 |
| 12 | The bin from above, empty (owner, 22 Oct 2026; MOTH-52) | close-up | no | — | 1 |
| 13 | Five bits of rubbish (crumpled page, juice carton, crust, paper ball, apple core) | cut-out ×5 | single (shoved) | — | 5 |
| 14 | The inside of the hat (owner, 22 Oct 2026; MOTH-53) | close-up | no | — | 1 |
| 15 | Mr Hollis's drawer, looked down into, the key among paper clips and a whistle (MOTH-65) | close-up | no | — | 1 |
| 16 | The joined note, two torn halves taped (MOTH-64) | close-up | no | — | 1 |
| 17 | The supplies cupboard's doors, re-cut to the cupboard's full width (MOTH-67) | cut-out | single (`peek`) | lifted from c1 | 0 |

- About 14 pictures after the owner's second round (the bin, its rubbish and the hat): roughly 60¢ on Sunburst, about $1.40 on the fallback. Every word, number and icon on the labels, timetable, whiteboard and notes is drawn by the game, so none of it costs credit. (The handover estimated 12 pictures before the lifted cut-outs were counted as reuse.)
- No wall re-do: the drawers' dark gaps and the open doorway are drawn by the engine behind the lifted cut-outs.
- Script locked on:
- Total estimate: about 30¢ on Sunburst.

### Gate D — list and budget
Signed off:

---

## 6a. Sample pack

| Sample | What it is | Why this one | Result |
|---|---|---|---|
| Wall | none new | | |
| Cut-out | | | |
| Close-up | | | |
| Voice ×2–3 | one hint, one story line, one wrong-try | | |
| Track | none new (the classroom track) | | |

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

- Not released as a level: a test room. "Release" here means merged to `main` for the owner's own play.
- Merged on:
- Playtester notes (who, what, fix now or later):

---

## Credit ledger

| Stage | Estimate | Actual | Re-dos (count) | Why |
|---|---|---|---|---|
| 6a samples | | | | |
| 6b batch | ~30¢ | | | |
| 7 polish | | | | |
| Total | ~30¢ | | | |

## Learning loop

Every fault found in this level, where it was found, and what happened to it.

| Found at | Fault | Fixed how | Rule for every level? | Written to (Playbook § / Checklist line / audit) |
|---|---|---|---|---|
| Outline review, 22 Oct 2026 | The first premise locked a child in a classroom from the inside, with the key in the same room | Lock-up duty: the door is open, the key locks it from outside | A level's premise is checked for sense and for the child-safe rule before Gate B | this file, for now |
| Outline review, 22 Oct 2026 | A moving thing was planned as a wall re-do when it was already painted into the wall | Lifted from the wall (4r) | Already a rule: checklist 53 | — |
| First playable, 22 Oct 2026 | The fallen key landed at 86% down the wall, under the caption band while the moth spoke two lines, so it could not be tapped | Moved up to 79%, by the door | Yes: nothing small in the bottom sixth of a wall | Checklist 32d (reworded); audit E32? look line |
| First playable, 22 Oct 2026 | "9 cm" ran off the right edge of the pot close-up | The number sits above its ruler, centred | No, this card's | — |
| First playable, 22 Oct 2026 | The torn corner under the hat had a tap target but nothing to see | A drawn corner of paper while it is there | Already a rule: checklist 7 (every clue in a picture) | — |
| First playable, 22 Oct 2026 | The door folded open onto the same door painted in the wall | The doorway and the light on the floor drawn by the game while the door is open | Only this room's (a lifted door needs the opening behind it) | this file |
| Owner's recording with voice, 22 Oct 2026 (MOTH-56) | The timetable's icons straddled the poster's grid: four rows drawn for five days | The game paints the grid itself over the poster's cell area | Yes: when the art's grid cannot hold the puzzle, the game draws the grid | Checklist 52 (already); playbook 4ad |
| Same recording (MOTH-57) | Two header lessons never on the week | Every lesson on some day; Tuesday the one potted decoy | This room's chart | this file |
| Same recording (MOTH-58) | A movement before a zoom, and a bag that moves for nothing | No movement on a tap that zooms; the bag plain | Yes | Checklist 60 |
| Same recording (MOTH-59) | Keyhole in the close-up, none on the wall | Drawn on the wall too | Already a rule: checklist 52 | — |
| Same recording (MOTH-60) | The keyhole drawing swallowed the tap meant for the target under it | Decorations never take pointer events; the play script taps the drawing | Yes | Checklist 59 |
| Same recording (MOTH-61) | The whole desk opened the dials; an open drawer did not zoom to itself | The drawer alone opens the dials; shut → slides open, open → zooms, shut again in the close-up | Yes | Checklist 61 |
| Same recording (MOTH-62) | The bin close-up redrew and flashed when the note appeared | The note is inserted in place | Only this stage's wiring | this file |
| Same recording (MOTH-63) | The key appeared on the floor instead of falling | A stage overlay tumbles it from the pocket with two bounces | Engine: the fall-and-land movement stays on the list | this file |
| Same recording (MOTH-64) | The joined note was a plain card | Two torn halves and tape drawn in the card; the finished picture at Gate D | This room's | this file |
| Same recording (MOTH-65) | The key hard to see in the drawer | Tighter zoom and a bigger key now; the look-down-into-it picture at Gate D | Already a rule: checklist 60 | — |
| Same recording (MOTH-66) | The door folded flat; the key turn left a trail line | The leaf swings on its hinge in perspective; the trail invisible | Engine: the door swing goes with backlog 26 | this file |
| Same recording (MOTH-68) | The same line on the card and in the caption | One line per screen in this room | Yes, whole game when revisited | Checklist 62 |
| Same recording (MOTH-67) | The cupboard's doors narrower than the cupboard; its line promised glue sticks over bare shelves | The line now matches; the doors re-cut at Gate D | This room's art | the asset list |
| Owner's tablet play, 22 Oct 2026 (MOTH-51) | The small key opened the cabinet from the room but not inside the cabinet close-up | A target over the drawer in the close-up routes a held item through the same USES table (`cuTarget`, `wireCu`) | Yes: what takes an item in the room takes it in its close-up | Playbook 4ad; checklist 59; backlog 25 for the engine |
| Owner's tablet play, 22 Oct 2026 (MOTH-50) | Measuring with the ruler took "a lot of clicking around": the ruler did nothing inside the pot close-up | The pot close-up takes the ruler, and its line says to hold the ruler first | Same rule as above | Checklist 59 |
| Owner's tablet play, 22 Oct 2026 (MOTH-49) | The half note came out of the bin from the room view, and the corner under the hat was a small wall target | The bin, the box and the desk drawer open close up, made from the wall, and the thing is taken there | Yes: finding is a close-up | Playbook 4ad; checklist 60 |
| Owner's second look, 22 Oct 2026 (MOTH-52, MOTH-53) | A zoom of the wall shows the outside of the bin and the box, not where the note is; "it needs new visuals" | The bin looked into from the top with the rubbish to push aside; the hat opened from the box with the corner in its band; code-drawn stand-ins, pictures at Gate D | Yes: the close-up looks inside, from where a child would look, and is its own picture | Playbook 4ad; checklist 60 reworded; backlog 27 |
| Owner's second look, 22 Oct 2026 (MOTH-54) | Both drawers stayed open for ever once unlocked | Open and shut on each tap, in the room and close up, by a stage overlay; the ruler and the key inside only while out | Yes: what opens, shuts | Playbook 4ad; checklist 61; backlog 26 |
| Play script, 22 Oct 2026 | The close-up's tap target lay over the ruler inside the open drawer, so the ruler could not be taken | The target goes under the drawer, and the drawer's own parts let taps through to the things inside | Only this stage's wiring until backlog 25 | this file |
| Owner's video, 22 Oct 2026 (MOTH-55) | The small key lay on the floor again after it had opened the cabinet, and was picked up a second time during the ending | A taken flag for both keys; the floor and the drawer test the flag, never the strip | Yes: taken things stay taken | Checklist 41b; the play script checks the floor after the key is used |

## Notes for this level only

- Owner's decisions, 22 Oct 2026: a standalone test room (not v3's classroom, not Mary's story); it tests feel and difficulty, every interaction type and new mechanics together; the first draft chain was approved with "make it harder", which added the whiteboard, timetable and pot labels to the drawer code and the trap answer. After the review in Claude Code the same day: "Lock-up duty" as the premise, "yes to trail A", the small key to fall to the floor before it is picked up, "happy with everything else".
- Held back for later: Thursday's row could carry six lessons with only four on the pots, so the player must also filter. Try it only after the owner has played this version.
