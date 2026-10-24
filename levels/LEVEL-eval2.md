# Level: eval2 — the second test room, "Back in Five Minutes" (the front office, new art)

*Outline, written on 24 Oct 2026 at the owner's word ("a new evaluation level for Moth House similar to the one that was already created but using completely new level material"). It is the second standalone test room after "Lock-up Duty" (`levels/LEVEL-evalroom.md`), built the same way through the same gates, on a room that does not exist anywhere in the game yet: Knightsbrook's front office, specified from scratch in `evals/images/rooms/office.json`. Nothing here is built, no picture is made and no credit is spent until the owner signs the gates: Gate A for the brief, Gate B for the design below, and his agreed cost before the walls are drawn (playbook 4ac). The stage key `eval2` and the hotspot prefix `e2_` are reserved; `next/landscape/stages/eval2.js` is written only after Gate B.*

Status: `brief` | `outline` | `greybox` | `assets listed` | `samples` | `batch` | `integrating` | `released`
Current status: outline (Gates A and B wait on the owner)
Build id of the latest play link: none
Latest play link: none

---

## 1. Brief

- Design and art: the test room's (owner, 24 Oct 2026): the room-specification method on Sunburst in the signed-off style (playbook 2, 4aa) and the test room's way of playing (4ac, 4ad; checklist 59 to 67); `levels/LEVEL-evalroom.md` is the reference. The puzzle map and logic are the owner's own, drawn fresh for this level, never carried over from an older stage.
- What it is: a standalone test room, not part of any child's story, like the first. It has three jobs:
  1. **The whole method on fresh material.** The first test room reused walls drawn during the image-model evaluation. This one starts from nothing: a new room specification written to playbook 4aa, drawn by Sunburst, cut, placed and played, so the owner sees what a real level's art will cost and look like from a blank page. A different Singapore room, with its own palette and its own light, in the same signed-off style.
  2. **The interactions the first room did not try:** restoring something that does not work (a lead to plug in), a working device with a performance that carries the code on two levels (the answering machine), a dial turned by a sweep (the telephone, the lesson of MOTH-93 built in from the start), a keypad of buttons rather than dials, pulling tape off a parcel, and signing a book in Mary's own hand. No key, no number dials, no torn note: nothing the first room already proved.
  3. **Feel and difficulty again**, at the same standard: one easy trail, one search trail, one hard lock whose code needs clues from all four walls and has two trap answers, about ten minutes for a careful player.
- Child and age: none. Mary is the one in the room because the engine plays a child and Mr Hollis sent her; no story beat depends on her, and nothing here goes into her story.
- The premise: it is 3:10 on the last day of term. Mrs Devi, the school secretary, has gone to the hall with the end-of-term certificates and left the office with its "Back in five minutes" sign up. Mr Hollis has sent Mary to collect the parcel that came for 5H. Mrs Devi's note on the counter says the parcel is in the post cupboard and gives the cupboard's code as a riddle: the rooms that rang her this afternoon, in the order they rang, as extensions. Her answering machine has the calls, once it works.
- The objective (one sentence): "Mr Hollis sent me for 5H's parcel; it's in the post cupboard, and the code is whoever rang Mrs Devi this afternoon."
- Difficulty (1–5): 4. One easy trail (the lead), one search-and-read trail (the extension card under the handset), then one hard lock that needs the note, the four messages, the card and the keypad, with two trap answers.
- Length: about 10 minutes for a player who reads carefully.
- The signature moment: the parcel. Mary pulls the tape off the box from 5H's own order and inside, in a nest of tissue, are the class's silkmoth cocoons for next term, and one has hatched: a pale moth climbs onto the box's edge and sits there, wings drying. When she signs the visitors' book to leave, it lands on the page.
- The opening gesture: picking up Mrs Devi's note from the counter (as the first room's envelope). The gestures the room is for come later: the plug, the dial, the tape, the signature.
- Carries forward and hands on: nothing. What it hands on is learning: the cost and look of a room made from a blank specification, and the verdict on the five new interactions.
- Legal and fiction check: fictional names only, no brands, no Merlion, nothing borrowed: Knightsbrook is the invented school; Mrs Devi, Mrs Pillai, Miss Tan, Mr Osman and Mrs Lim are invented; Mr Hollis is the invented teacher already in the game. No brand on the answering machine, the telephone or the copier (plain cream machines, nothing written on them). No real person. Passes.

### Gate A — story
Checked: fits the arc and the age · nothing borrowed · fiction and legal rules · nothing shared with another child's story
Walked 24 Oct 2026: not a story level, so only the last three apply. Nothing borrowed: the puzzle is built from this office's own things; the shapes it uses (a performance that carries the code, a clue in an ordinary thing, the solution as the reveal) are from the design library's mechanics, as ideas only. Fiction and legal: passes. Shared things: the office appears in no child's story; the staff names other than Mr Hollis are new; the silkmoths, the answering machine, the telephone, the post cupboard and the visitors' book appear in no other stage. The moth that hatches is "a moth", not the game's moth.
Signed off:

---

## 2. Game map

- Floor plan: one room, so no `-map.json` is needed. The front office of Knightsbrook International School, specified in `evals/images/rooms/office.json`.
- Rooms and their views (turning order, from the room file's compass, checklist 57): **o1 the counter wall (north)** → **o2 the head's-door wall (east)** → **o3 the entrance wall (south)** → **o4 the cupboard wall (west)**.
  - o1: the reception counter with its hinged flap, and on it the note, the visitors' book with its pen on a string, the brass bell and the "Back in five minutes" stand; the counter's drawer; behind the counter Mrs Devi's chair with her cardigan over it and the wall of pigeonholes.
  - o2: the head's door (closed, frosted glass, no walking through), the clock above it, a low filing cabinet with the answering machine on top and a socket in the panelling beside it, and the staff board: six photographs with a name and a room under each.
  - o3: the open doorway to the corridor in the middle (the arrival; the stage ends in the room, so it is never walked through), a window beside it onto the covered walkway with rain streaming down it, the wall telephone (an old cream one with a dial, kept because the head likes it) with a card under its handset, a bench, the water cooler, and a small gecko high on the wall.
  - o4: the photocopier with its lid, the tall post cupboard (sage green, a keypad on its door), a potted palm, and a shelf of lost umbrellas.
- Doors: none to walk through. The corridor doorway is where Mary came in; the head's door is painted shut.
- Locked at the start, and what opens it:
  - **The answering machine (o2):** does not work; its lead is missing. The lead is in the counter's drawer (o1). Plugged in at both ends, it plays.
  - **The post cupboard (o4):** a keypad of ten buttons; four presses then the green button. **4 2 3 5**. Inside: the parcel.
  - **The parcel:** sealed with brown tape; a drag pulls it off.
  - **The visitors' book (o1):** the ending; a drag of the pen along the line signs it, but only once the parcel is in hand (the note asks her to sign before she goes).
- The linear opening: the note (pick up, read). It teaches the pick-up and the note card, and sets the goal.
- The hub: the whole room. Both trails are open as soon as the note is read.

Walk-through test: every room reachable · little backtracking · once opened, stays open
Result (walked on paper, 24 Oct 2026): passes. One room; the hard lock needs all four walls, which is the point; the drawer and the cupboard stay open once opened, and the machine stays plugged in.

## 3. Puzzle chart

### The trails

| Trail | Item or search | Clue | Lock | Reward |
|---|---|---|---|---|
| Opening | The note on the counter (o1) | — | — | The note (below), the goal |
| A. The lead | Tap the counter drawer (o1): it slides open, then looks down into itself: pens, a stapler, a coil of cream flex with a plug on one end. Take the lead | — | Use the lead on the answering machine (o2): the stage plugs it into the machine and into the socket beside it; the display lights | The machine works: press play |
| A. The calls | Press play (o2): four messages, one after another, each shown as its words on the display with a light that steps along four marks; replay at will, and the four marks stay lit with the time of each call once heard | The messages (below) | — | Who rang, from where, in what order; into Noticed as a clue card |
| B. The card | Lift the handset of the wall telephone (o3): the close-up shows the card that was under it, the school's extension list (below); the handset goes back when the close-up closes | The extension list | — | The list, into Noticed as a clue card |
| B. The dial (optional) | On the phone, turn the dial by a sweep to ring a room; dial the hall (2) and Mrs Devi answers with a hint; any other room gets its own line (below) | The extension list, used the first time | — | A hint in Mrs Devi's voice; the sweep, tried before the lock needs nothing of it |
| The code | — | Note + messages + extension list + staff board (the decoy) | The post cupboard keypad (o4) | The cupboard swings open on the parcel |
| The parcel | Take the parcel from the cupboard's close-up; open it from the strip: drag the tape off | — | — | The cocoons and the hatched moth |
| The way out | Sign the visitors' book (o1): drag the pen along the line | The note's "sign the book before you go" | Only with the parcel in hand | The ending |

- Trails that run in parallel: A and B, in either order. The code needs both.

### The words and numbers (all drawn by the game, none by the image model)

- **Mrs Devi's note** (on the counter): *"Mary — the parcel for 5H is in the post cupboard. I've gone to the hall with the certificates. The cupboard's code is the rooms that rang me this afternoon, in the order they rang, as their extensions. Everyone is on the list under the phone. Sign the book before you go! Back in five minutes. — Mrs D."*
- **The extension list** (the card under the handset): *Office 1 · Hall 2 · Library 3 · Art room 4 · Kitchen 5 · Class 5H 6 · Mrs Lim (Head) 7 · Music room 8.* Eight rooms, one digit each, so the keypad takes four single presses.
- **The staff board** (o2): six photographs, each with a name and a usual room: *Mrs Devi, office · Mr Hollis, 5H · Mrs Pillai, library · Miss Tan, art room · Mr Osman, music room · Mrs Lim, head.* This is the decoy: it says where people belong, not where they rang from.
- **The four messages**, in the order the machine plays them (each shown as words on the display as it plays; the time of the call appears under its mark once heard):
  1. 2:20 — *"Mrs Devi, it's Miss Tan. Could you send up more glitter? I'm in the art room, buried in it."* → art room → **4**
  2. 2:35 — *"Hollis here. I've gone down to the hall early to set out the chairs. If Mary comes, the parcel is with you."* → hall → **2** (the trap: Mr Hollis's room on the board is 5H, 6)
  3. 2:50 — *"Mr Osman. We're in the library with the choir, the music room is being painted. Could you ring the piano tuner for Monday?"* → library → **3** (the trap: the music room, 8)
  4. 3:05 — *"Mrs Pillai, from the kitchen, with the end-of-term cake. Is it twenty slices or twenty-two?"* → kitchen → **5** (not the library, 3, where she belongs)
- **Answer:** art room, hall, library, kitchen → **4 2 3 5**.
- **The traps:** reading each caller's room off the staff board gives **4 6 8 3**. Reading the list top to bottom for the four rooms named gives **2 3 4 5**. Both are the obvious guesses, and both are wrong.
- **The phone's lines** (dialling a room, optional): 2, the hall: *"Knightsbrook hall, Mrs Devi speaking… Mary! Is it the code? Everyone who rang me is on the machine, dear, and listen to where they say they are."* (the in-world hint, MECH-120's "names the problem"). 7, the head: *"You have reached Mrs Lim's office. Please leave a message after the tone."* Any other: *"It rings and rings. Everyone's at the party."* 1, the office: the phone on the counter rings back at Mary (a joke, and the bell on the counter jumps).

### Puzzle types (cap: two of any type)

Restore a device (the lead) ×1 · a performance that carries the code (the messages) ×1 · lift-to-find (the handset) ×1 · a sweep dial ×1 (optional) · multi-clue lookup onto a keypad ×1 · drag gesture ×2 (the tape, the signature) · look-down search (the drawer) ×1. Plain searching (the drawer) and the optional dial are counted once each to be safe. **Seven types, none more than twice.**

### Every lock and its visible clue

- The machine: its lead is plainly missing (the flex socket on its back is empty in the close-up, and the socket on the wall beside it is empty); the drawer is the only thing in the room that opens before the code.
- The keypad: the note names the cupboard and gives the rule; the machine gives the order and the rooms; the card gives the digits; the staff board is there to be wrong.
- The visitors' book: the note's last line, and the pen on its string.

### Tiered hints (nudge · what to try · the answer; tier 2 pulses the hotspot)

| Step | Nudge | What to try | The answer |
|---|---|---|---|
| Note | "Something's waiting on the counter." | Pulse the note. | "Pick up the note and read it." |
| Lead | "The machine has no lead. Where do offices keep bits and pieces?" | Pulse the counter drawer. | "Open the counter drawer and take the lead." |
| Plug | "A lead wants a machine and a socket." | Pulse the answering machine. | "Use the lead on the answering machine." |
| Play | "The machine is on. Mrs Devi said her callers are on it." | Pulse the machine. | "Press play and read each message." |
| Card | "The note says everyone's on the list under the phone." | Pulse the telephone. | "Lift the handset: the extension list is under it." |
| Where from | "Where people belong and where they rang from aren't always the same." | Pulse the staff board. | "Read where each caller says they are, not their room on the board." |
| The code | "Four rooms, in the order they rang, as their numbers." | Pulse the post cupboard. | "Art room, hall, library, kitchen: 4 2 3 5." |
| Tape | "The parcel is taped shut." | Pulse the parcel in the strip. | "Open the parcel and pull the tape off." |
| Book | "Mrs Devi asked you to sign before you go." | Pulse the visitors' book. | "Sign your name along the line." |

### The notebook's "Noticed" lines and clue cards

Clue cards (copied into the notebook on first reading, reopened from a chip, checklist 47): the note · the extension list · the four messages with their times. Noticed lines: "The machine has no lead", once the machine is tapped · "Mr Hollis rang from the hall, not 5H", once his message has played · "Mrs Devi says: sign the book", once the note is read.

### Wrong-try lines (friendly, never a punishment)

- 4 6 8 3: "That's where everyone *belongs*. Where did they say they were?"
- 2 3 4 5: "Those are the rooms, but not in the order they rang."
- Any other four: "The keypad blinks red, then clears."
- The lead on anything but the machine: "That's the machine's lead. It wants the machine."
- The parcel on anything: "It's for 5H. Open it from the strip."
- The book before the parcel: "Mary could sign now. But she came for the parcel, and it's still in the cupboard."
- The dial on a room with nobody in it: "It rings and rings. Everyone's at the party."
- The keypad before the machine plays: the keypad opens; nothing is lost by trying.

- The Night Moth bonus: none. This room, like the first, tests the main puzzle, not the bonus layer (the owner may add one at Gate B).
- Every clue given by sound is also shown: yes. The messages are shown as words on the display as they play, and the times stay on the marks; the phone's lines are shown as text.

Paper playtest: solved from the chart alone by Claude, 24 Oct 2026, with nothing built.
Result: passes. The code has exactly one reading that fits the note, the four messages and the card. Care points: the display must show each message's words large enough to read on the tablet (one message at a time, with its number and time, and a replay button); the extension card's rooms must use the same words the messages use ("art room", "hall", "library", "kitchen"); the staff board's rooms must read plainly, so the trap is a fair one.

## 3b. Motion sheet

| View | Thing | When | Movement | Art it needs | Sound | Settled state after |
|---|---|---|---|---|---|---|
| o1 | Mrs Devi's note | first tap | `lift` (exists) | cut-out (left off the wall) | paper | gone from the counter |
| o1 | Counter drawer | first tap (reward), then every tap | `slideOpen` (exists) for the first; then the stage's own open and shut, in the room and close up (as the test room's `toggleDrawer`), until backlog 26 | drawer-front lifted from the wall (4r); the cavity painted solid by the game | open, close | out or shut as left; the lead inside while it is out, until taken |
| o1 | The bell | tap, and when the office is dialled | `pop` (exists) | cut-out | a bright ding | still |
| o1 | The "Back in five minutes" stand | tap | `wobble` (exists; a hard thing rocks) | cut-out | knock | still |
| o1 | The visitors' book | ending | the pen drawn along the line by `openDrag` (exists); the game draws the signature as the drag advances | close-up of the open book (new picture); the pen as a cut-out | pen | signed; the moth on the page |
| o2 | Answering machine light | idle once plugged in | code-drawn blink | none | — | steady once all four have played |
| o2 | Answering machine | play | the four marks light in turn, code-drawn | close-up of the machine (new picture) | a soft click, then a beep per message | the marks lit with times |
| o2 | The lead | the plug | the lead appears in the machine and the socket, drawn by the stage | cut-out of the coiled lead (also the icon) | a click | plugged |
| o2 | Clock | idle | `clock` (exists) | code-drawn face | — | — |
| o3 | Rain on the window | idle | `draw:'rain'` (exists) | none | rain ambient | — |
| o3 | The gecko | tap | `hop` (exists), then it slips behind the noticeboard edge (`drop` fades it) and is back a moment later | cut-out | a tiny tick | back where it was |
| o3 | Telephone handset | tap | `lift` (exists), then the card close-up | handset lifted from the wall (4r) | a clatter | on its hook |
| o3 | Telephone dial | in the close-up | turned by the angle swept round the dial's pivot, as the test room turns its key (stage-drawn; backlog 29 for the engine) | close-up of the phone with a blank dial; the game draws the finger holes and numbers | a ratchet, a ring tone | at rest |
| o3 | Water cooler | idle | code-drawn bubble now and then | none | a blup | — |
| o4 | Post cupboard door | solve | `openDoor` (exists: the leaf swings to its hinge) | door lifted from the wall (4r); the shelves behind it painted by the game until Gate D's picture | a click, a creak | open, the parcel inside until taken |
| o4 | Keypad | in the close-up | buttons press (code-drawn), red blink on a wrong code, green on the right | close-up of the cupboard's keypad (new picture, buttons blank) | a beep per press | — |
| o4 | Potted palm | tap | `bend` with `pin` (exists) | cut-out | leaf | still |
| o4 | Copier lid | tap | `flip` (exists; it lifts and drops) | lid lifted from the wall (4r) | a thunk | shut; nothing under it ("Mrs Devi's copies, face down. Not for Mary.") |
| strip | The parcel | open from the strip | the tape pulled by `openDrag` along the box's seam; the lid lifts | close-up of the taped parcel; the lid as a cut-out; the open box with the cocoons and the moth (new pictures) | tape, then a tiny flutter | open; the moth on the edge |

Reward moments:

| Lock | Step 1 | Step 2 | Step 3 | Settled state |
|---|---|---|---|---|
| Counter drawer | the handle rattles | the drawer slides out with a soft clunk | the lead glints in it | drawer open, lead inside |
| Answering machine | the plug clicks home | the display lights and the marks blink once | the first message's words appear | on, waiting for play |
| Post cupboard | the keypad's buttons flash green in turn | the door swings open with a creak | the parcel sits on the middle shelf, lit | door open, parcel inside |
| The parcel | the tape peels back | the lid lifts | the moth climbs onto the edge and opens its wings once | open, the moth sitting still |
| The book | the pen moves along the line | the name appears | the moth lands on the page; end card | signed |

- Living things per view (cap: two): o1 none; o2 the machine's light and the clock; o3 the rain and the cooler's bubble (the gecko only moves when tapped); o4 none.
- New movements this level asks for: none that the engine lacks. The sweep is stage-drawn as the test room does it (backlog 29 would move it into the engine); the signature and the tape use `openDrag`. The three-step reward moments stay backlog 20: in the first playable each is one movement on one group, as in the first room.

Checked: every thing that moves is listed · every lock has a reward moment · no view has more than two living things · every part, pose and pivot named

### Gate B — level outline
Checked: map walk-through passed · paper playtest passed · motion sheet done · no puzzle type more than twice · every answer has a visible clue · difficulty matches the brief
Walked 24 Oct 2026 on paper: all six pass as recorded above.
Signed off:

---

## Review against the repo and the design library (Claude Code, 24 Oct 2026)

What checks out: every engine movement named exists (`lift`, `slideOpen`, `pop`, `wobble`, `hop`, `drop`, `bend` with `pin`, `flip`, `openDoor`, `clock`, `draw:'rain'`, `openDrag`); the sweep turn is what the test room's key does; the keypad is a close-up the stage draws, like the test room's dials card; clue cards and Noticed lines are the engine's (`clues()`, `copyClue`); the hints are in the engine's three-tip shape; no soft-lock (nothing is consumed by a wrong use; the drawer, the lead once plugged, the machine's marks and the card stay); one room; seven puzzle types, none more than twice.

Against the design library (`me565/core-skills/game-design/`): P-01 (curiosity: the note asks a question the room answers), P-02 (every answer is clued in this room), P-03 (hints optional, vaguest first), P-05 (an adult Rusty Lake fan is the tester). AVOID-001 to 004 pass (no fright, no timer, no fail, nothing clued outside the room). AVOID-005 (long round trips with a clue in the head): eased by the clue cards, so the messages and the list are read again at the keypad. AVOID-006 (a step found only at random): the lead's two homes are both visibly empty, and the note names the cupboard, the machine and the list. AVOID-007: no sums. AVOID-008 (a clue that plays out over time): the messages play one at a time on a tap, their words stay on the display, the marks keep the times, and they replay at will. Built on MECH-114 (the performance carries the code on two levels: which rooms and their order; the owner's love), MECH-111 (the extension card under the handset), MECH-130 (two working devices), MECH-126 (restore the machine), MECH-137 (the tape, the handset, the dial and the signature mimic the real actions; love), MECH-120 (Mrs Devi's "listen to where they say they are"), MECH-132 (the parcel's reveal is the reward), MECH-135 (sign it in your own hand). The ideas only; nothing of any reviewed game's puzzles, names, art or text.

Conflicts and open points for the owner:

1. **Checklist 8b (the opening view carries no clue and no item).** Mary arrives through the corridor door (o3) facing the counter (o1), where the note lies. The first test room started on its envelope too. Either the note moves to o2 (pinned to the head's door, "Mary →"), which keeps 8b, or the test room's precedent stands. Suggested: pin it to the head's door; the counter keeps the sign, the bell and the book.
2. **The cost before Gate C.** The room's four walls do not exist. Playbook 4ac lets them be drawn before Gate C only with the owner's agreed cost and his acceptance that a puzzle change can send them back. Estimate: four walls on Sunburst at about 2.5¢ each from run `rooms-2` (10¢), the four layout sketches free, a second pass on any wall that fails its checks (about 2.5¢ each). The cut-outs, close-ups and icons (about 18 pictures, about 1¢ each) wait for Gate D as usual; the first playable uses crops and code drawings for them.
3. **The signature.** `openDrag` moves one tab along one path; a signature is a wiggle. Suggested for the first playable: the pen drags left to right along the line and the game draws "Mary" in its own hand behind the pen as it goes, so the gesture is honest and the result is a picture. A freehand signature (MECH-135 as the library records it) would be an engine change, backlog.
4. **The moth.** A hatched moth as a cut-out on the box's edge, wings opening once, is a pose swap (backlog 22) or two pictures; in the first playable it is one picture and the wings do not move.
5. **The staff board's photographs.** Six faces drawn by the model are six chances for a bad face at wall size. Suggested: the board is painted on the wall with six blank frames, and the game draws six simple portrait silhouettes with the names and rooms (checklist 52), or the board's close-up is its own picture at Gate D.
6. **Names.** Mr Hollis is reused from Mary's story as the teacher who sent her; the rest are new. If the owner would rather the office belonged to another school entirely, only the sign and the note change.

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
| walls before Gate C | ~10¢ (four walls on Sunburst) | | | only with the owner's agreed cost (playbook 4ac) |
| 6a samples | | | | |
| 6b batch | ~18¢ (about eighteen cut-outs, close-ups and icons at about 1¢) | | | |
| 7 polish | | | | |
| Total | ~30¢ | | | |

## Learning loop

Every fault found in this level, where it was found, and what happened to it.

| Found at | Fault | Fixed how | Rule for every level? | Written to (Playbook § / Checklist line / audit) |
|---|---|---|---|---|
| Outline, 24 Oct 2026 | The first draft reused the test room's classroom and the corridor; the owner wanted completely new material | A new room, specified from scratch | A second test of a method is run on fresh material, not the material the method was tuned on | this file, for now |

## Notes for this level only

- Opened 24 Oct 2026 in a Claude Code session started from `me565/core-skills` (the design library's repo), with read access to this repo only: the file and the room specification are committed on the local branch `claude/level-eval2`; pushing waits on the owner's permission.
- The room specification `evals/images/rooms/office.json` follows `classroom5h.json` and `nana-kitchen.json`: palette, band, one light, every object with position and size, and the moving things named so the prompts leave them off the walls (the note, the bell, the sign, the lead, the gecko, the palm; the drawer front, the handset, the cupboard door and the copier lid are painted in and lifted by crop). Run it as the kitchen was: `evals/images/run.py` on the GitHub runner from a manifest in `evals/images/runs/`, after the owner agrees the cost.
