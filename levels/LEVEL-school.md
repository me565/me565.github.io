# Level: school — Mary, last day of school

A retrofit, started 17 Oct 2026. This level was built and released before the gates existed (live since 30 Sept 2026, pull request #3). Nothing in it is being remade: this file walks the finished level back through the gates on paper, so the workflow gets its first run on something real and the level gets the checks it never had. Every stage below is filled from what exists (`STORY.md`, `next/landscape/stages/school.js`, `next/PLAYBOOK.md`, the art folders). Sign-off lines are the owner's; none has been written.

Status: `brief` | `outline` | `greybox` | `assets listed` | `samples` | `batch` | `integrating` | `released`
Current status: brief (retrofit: the level is live; gates A to D are being walked on paper; no credit is being spent)
Build id of the latest play link: 2026-09-30x (the live build; nothing playable changed in this retrofit)
Latest play link: https://me565.github.io/next/landscape/?stage=school

---

## 1. Brief

- Child and age: Mary, 10. Notices patterns, reads everything. Plays like a proper puzzle game: reading, codes, maps, working things out.
- Where and when in the journey (see `STORY.md`): stage 1 of 6, the last day of term at Knightsbrook International School, Singapore. Twenty to three; the last bell is at three. Everyone else is at the goodbye party in the hall. Stage 2 (packing day) follows on the same save.
- The objective, in the child's words (one sentence): "Mr Hollis has left me a treasure hunt: three riddles, three library books, three slips, and my locker code at the end, before the last bell."
- Difficulty (1–5, from `STORY.md`): 3.
- The signature moment (one thing the player will remember): striking the four coloured chime bars on the empty hall stage in the order on the page, and hearing a click from the little drawer in the front of the stage.
- The opening gesture: **not built.** The playbook (4j, backlog 11) chooses the classroom blind for this stage: the last comic panel come to life, a pull on the blind cord lets the light in before the first line. Today the stage opens from the comic straight onto the title card. This is a known gap against checklist line 31, carried in the learning loop below.
- What this level carries forward from earlier ones, and what it hands on: nothing comes in (it is the first stage). It hands on: Nana's postcard from the locker ("Not long now!", with the little moth that seems to glow), Mary's report ("a brilliant detective"), the moth itself (seen watching from the classroom window in the comic), and the Night Moth star if the bonus was solved. The last-bell card leads into packing day on the same save.
- Legal and fiction check: fictional names only, no brands, no Merlion, nothing borrowed: **passes.** The school is Knightsbrook International School; Mr Hollis, Mrs Ng, Aisha, Ben, Priya (the painter, not the flight attendant), Biscuit the cat and the Kingfishers house are invented. No brand, logo or airline appears; the mug reads TEACHER OF THE YEAR (nearly). No Merlion. No name, character or puzzle is taken from another game: the three-trail shape follows how Rusty Lake and Dark Dome structure puzzles, which is a method, not content. The fiction notice is on the title screen's About.

### Gate A — story
Checked: fits the arc and the age · nothing borrowed · fiction and legal rules · nothing shared with another child's story
Walked 17 Oct 2026 (retrofit):
- Fits the arc and the age: yes. Reading-led riddles, a timetable read with a picture key, three parallel trails, a bonus for grown-ups. Singapore as the ordinary world, bright and tidy; the moth watching from the window is the only magic.
- Nothing borrowed: yes (see the legal check above).
- Fiction and legal rules: yes.
- Nothing shared with another child's story: **one thing to rule on.** Mary's classroom has a lost-property box on the door wall (c3) that only gives a line ("A shoe, a hat, and a lunchbox that has been here since March"); Elliot's classroom also has a lost-property box, and his holds a clue (the jumper). Mary's box is neither a clue, an item nor a hiding place, so it is within the rule as written (no clue, item or hiding place in two stories), but it is the same prop in two children's rooms. Owner to say whether a shared prop with no puzzle role is fine, or whether Mary's box should become something else.
- Also for the owner: the STEM WEEK poster's line is "Rockets, robots, and one small explosion nobody talks about." It is a joke, not something a child could copy, and the room rules forbid only things that can be copied (matches, fire, knives, climbing, water). Flagged so the call is his, not mine.
Signed off:

---

## 2. Game map

- Floor plan: `levels/LEVEL-school-map.json`, drawn by `tools/levelmap.py` into `levels/LEVEL-school-map.drawio` (open at app.diagrams.net). North up: the corridor in the middle with the lockers on its north wall, the library east, the hall south, the classroom and art room sharing its west wall. Door tabs on the shared walls, labelled walks naming the arrival view, red for locked, green for the start.
- Rooms and their views (in turning order):
  - **Classroom 5H**: c1 whiteboard wall (the picture key to the timetable; supplies cupboard; Mr Hollis's desk, mug, apple) · c2 window wall (bean plants, the window; quiet) · c3 door wall (open door to the corridor; coat pegs; lost-property box; bin) · c4 timetable wall (Mary's desk with the envelope; the timetable; class rules; clock at twenty to three; Nutmeg's cage; filing cabinet; bookshelf; Mary's bag). **Start: c4, facing her desk.**
  - **Corridor**: h1 the lockers (Mary's purple locker, three number dials; certificates; bench) · h2 the open library doors (water fountain; trophy cabinet) · h3 notice board with the bonus card, and the open doorway to the hall · h4 the open doorways to 5H and the art room (bunting).
  - **Library** (square): ln Science and Music shelves (globe, headphones, rocks) · le window seat and storytime chair (cushions, knitted hamster, rug) · ls the entrance and Mrs Ng's desk (QUIET PLEASE sign, BACK SOON card, desk bell) · lw Art shelf, returns trolley and Stories shelf (notice about the trolley).
  - **Art room**: an drying rack with four paintings, Mary's moth among them · ae the paint cupboard with its colour-dial padlock and the shelf of six paint pots · as the open doorway back and the bench of clay animals · aw the sink, tap, brush jar and three aprons.
  - **Hall**: hn the stage with the four chime bars, the little drawer and the HAPPY HOLIDAYS banner · he the STEM week cabinet with the star padlock, house points, STEM WEEK poster · hs the open doors back to the corridor and a bench · hw the indoor playground: soft mat, stack of soft blocks, little slide.
- Doors: which door leads to which room, and the view you arrive facing:
  - c3 classroom door → corridor, arrive facing h2 (the library doors)
  - h4 doorway to 5H → classroom, arrive facing c1 (the whiteboard)
  - h2 library doors → library, arrive facing ln (Science and Music)
  - ls library doorway → corridor, arrive facing h4 (the two doorways)
  - h3 hall doorway → hall, arrive facing hn (the stage)
  - hs hall doors → corridor, arrive facing h1 (the lockers)
  - h4 art-room doorway → art room, arrive facing an (the drying rack)
  - as art-room doorway → corridor, arrive facing h2
  - Every doorway is drawn open and can be walked through from the start.
- Locked at the start, and what opens it:
  - STEM cabinet (he): the star padlock; opened by the star key from Mr Hollis's splattered apron, which is only in the pocket once The Night Sky's note has been read.
  - Stage drawer (hn): opened by striking the chime bars green, red, blue, yellow with the beater; the beater lies under the soft blocks (hw) and can be found any time; the bars say "nothing to strike them with" until it is on the stand.
  - Paint cupboard (ae): the colour-dial padlock; opened by setting purple, green, orange (the stripes under Mary's moth) and tapping Open.
  - Mary's locker (h1): three number dials; opened by 4 3 6 (Science Thursday, Music Tuesday, Art Wednesday on the timetable), checked only on Open.
  - Also gated in order, not locked: the envelope must be taken before anything else answers ("Not yet. Mr Hollis left something on your desk first.").
- The linear opening (the one room that teaches the mechanic): Classroom 5H. One thing to pick up (the envelope), one note to read, one wall with the timetable and one with its key, one open door. The first-time tips (tap and arrows, the strip, holding, the notebook) land here.
- The hub (where several trails open at once): the corridor. From h1 to h4 the player sees the goal (the purple locker), the bonus card, and the open doorways to all four other rooms. The envelope's three riddles open the three trails together.

Walk-through test: every room reachable · little backtracking · once opened, stays open
Result (walked on the map, 17 Oct 2026): **passes.** Every room is one doorway from the corridor; no room is reached only through another. The shortest solution crosses doorways twelve times (classroom → corridor → library → corridor → art room → corridor → hall → corridor → library is not needed again; the three slips are collected on one loop library → art room → hall, with one return to the classroom for the timetable and the whiteboard key, then the locker). The backtracking that remains is deliberate: nothing is solved in the room where its clue is found (playbook 4c). Opened padlocks fall off and are gone; the drawer and the locker stay open; a taken slip is never shown again. Arrival views face away from the door you came through in every case.

## 3. Puzzle chart

- Chart (draw.io file or table): `levels/LEVEL-school-chart.drawio`: five lanes (trails A, B, C, the convergence, the Night Moth bonus), every node an item, clue, lock or reward, with the cross-lane arrows from the envelope and into the locker.
- Trails that run in parallel: A (Science), B (Music) and C (Art) all open from the envelope and can be done in any order; the player usually carries two or three half-finished things at once.
  - **A, Science:** riddle 1 → *The Night Sky* on the Science shelf (ln) → note A ("the key to the stars is in my art apron, the one with all the paint on it; then look for the star") → the star key in the splattered apron's pocket (aw) → the star padlock on the STEM cabinet (he) → slip 1, SCIENCE on THURSDAY.
  - **B, Music:** riddle 2 → the gap on the Music shelf and the sticky note "Returned today. See the trolley" (ln) → *Playing the Piano* on the trolley (lw) → the page of music, four coloured notes → the beater under the soft blocks (hw) → the chime bars (hn) struck green, red, blue, yellow → the stage drawer → slip 2, MUSIC on TUESDAY.
  - **C, Art:** riddle 3 → *The Painting Book* on the Art shelf (lw) → note C ("your slip is locked in the paint cupboard; my moth knows the colours: look under it on the drying rack") → the three stripes under Mary's moth (an): purple, green, orange → the colour dials on the paint cupboard (ae) → slip 3, ART on WEDNESDAY.
  - **Convergence:** three slips + the timetable (c4) read with the whiteboard's picture key (c1) → 4, 3, 6 → the locker (h1) → the report and Nana's postcard → the last bell → the postcard home.
- Puzzle types used (cap: two of any type): number dials (locker) and colour dials (paint cupboard): 2 · key-and-matching-symbol (star key, star padlock): 1 · sequence (chime bars in the order on the page): 1 · observation-to-code (stripes to dials): 1, counted with the colour dials above as one lock · reading a table with a key (timetable + whiteboard): 1 · ordered picking (the four stories spelling NANA, bonus): 1, a second sequence puzzle, so sequence = 2. **No type exceeds two.**
- For every lock, the in-game clue that points to its answer and where the player sees it:
  - STEM padlock: note A says "look for the star"; the padlock has a gold star; the key has a star. Seen in the library (note) and the hall (lock).
  - Chime bars: the page of music shows four coloured notes left to right; the bars are the same four colours; the page says "Play me in the hall!". Seen on the trolley (lw) and the stage (hn).
  - Paint cupboard: note C says the moth knows the colours and where to look; the stripes are drawn by the game under the painting (an) and in its close-up; the dials turn through the six pots on the shelf above the cupboard (ae). The notebook's Noticed line records the stripes once seen.
  - Locker: the envelope explains the rule (lesson + day → period number, in riddle order); each slip repeats which number it is; the timetable is on the wall and in close-up; the whiteboard key says which picture is which lesson. The three slips stay in the strip to reread.
  - Night Moth: the bonus card gives the riddle; the Stories shelf has six titles whose first letters include N, A, N, A; "someone in London" is Nana, named in the comic ("the plane to Nana's") and on the title card ("to Nana and Jedi's").
- Tiered hints per trail (nudge · what to try · the answer): built, in `HINTS` in the stage: 15 hint rows of three tiers each, following whichever trail the player has got furthest along (the envelope; A ×4; B ×5; C ×3; the timetable and locker; the open locker). All 45 lines are recorded (`school.hint.<row>.<tier>`). The notebook (moth button or Nutmeg) lists the riddles as a to-do list with how far each has got.
- The notebook's "Noticed" lines: the tune on the page (green, red, blue, yellow) once the page has been opened; the stripes under the moth (purple, green, orange) once the painting has been looked at; the bonus riddle once the card has been read; "Bonus riddle solved: NANA ★" after.
- Wrong-try lines (friendly, never a punishment): "Not yet. Mr Hollis left something on your desk first." · "Four chime bars… There is nothing to strike them with." · "A tiny drawer in the front of the stage. It won't budge." · "The star key finds no keyhole. This padlock has colour dials instead." · "Bonk. The padlock doesn't care." · "It doesn't budge. Not those colours." · "That isn't the tune. Start again from the first note." · "It doesn't budge. Not those numbers." · bonus: "'XXXX' isn't a name. Start the spelling again." · a book with nothing in it: "No slip inside." · a trail's book already emptied: "Nothing more in this one. You have what it was hiding."
- The Night Moth bonus (optional hard layer): the card on the corridor notice board (h3): "Someone in London loves postcards and moths. Spell her name with the first letters of four stories." On the Stories shelf (lw), picking *Nobody's Garden*, *A Quiet Moon*, *Nine Lanterns*, *Along the River* in that order spells NANA. It gates nothing; solving it adds the ★ to the postcard's P.S.
- Every clue given by sound is also shown: yes. The chime bars are four colours on the stage and in the close-up, and the struck bar flashes; the tune is a drawn page; the drawer's click is also the drawer sliding out and the moth's line.

Paper playtest: solved from the chart alone by: Claude, 17 Oct 2026, from `LEVEL-school-chart.drawio` with the stage file closed; then by script against the real game (`tools/play.js`, every step in order, three wrong tries included, ending shown, no page errors, no overflow at 844 and 2000 wide).
Result: **passes with two notes.** (1) Every lock's answer is reachable from clues the game shows; nothing needs outside knowledge. (2) The bonus's answer leans on the player knowing who "someone in London" is; the comic and the title card both name Nana before the corridor is reached, so it holds, but a player who skipped the comic and tapped through the card gets it only from "to Nana and Jedi's" in the card text and from Nana's postcard, which arrives after the bonus can be solved. Acceptable for an optional grown-up layer; noted. (3) The play script did not exercise the star-key-on-the-colour-padlock wrong try (its "NO HOTSPOT ae_lock" line is a deliberate check that the art room's lock is not tappable from the hall); the step was added on 17 Oct 2026 and the line comes back as written: "The star key finds no keyhole. This padlock has colour dials instead."

### Gate B — level outline
Checked: map walk-through passed · paper playtest passed · no puzzle type more than twice · every answer has a visible clue · difficulty matches the brief
Walked 17 Oct 2026 (retrofit): all five pass as recorded above. Difficulty: three trails of two inputs each, a table read with a key, and an optional spelling bonus sits at 3 of 5 for a ten-year-old who reads well; Elliot's day (2) has fewer steps and picture clues, Mary's flight (4) will add codes and a map.
Signed off:

---

## 4. Greybox

- Stage key and plugin file: `school`, `next/landscape/stages/school.js` (registered by `next/landscape/index.html`).
- Play link (pinned to commit): the level never had a greybox; it was built straight into art. The live build is https://me565.github.io/next/landscape/?stage=school (build 2026-09-30x).
- What is placeholder: nothing. Every wall, cut-out and close-up is real; every story-led line is recorded.
- What is real: everything: puzzle logic, inventory, hints, saves, doors, the ending, the postcard.

Tests: scripted playthrough passes · audit clean · owner played it on the tablet at 2000×700 · reduced motion checked
- Scripted playthrough (`tools/play.js`, 17 Oct 2026): **passes**, start to ending, no page errors, no page overflow at 844 or 2000 wide.
- Audit (`node tools/audit.js school`, 17 Oct 2026): **one failure.** E29: the envelope's note card overflows inside at the owner's shape (2000×700) and at phone size (844×390); reproduced by hand at 1180×820 too (scroll height exceeds the card by 15, 9 and 18 px). The text is all visible; it is the card's bottom padding that is clipped, so the card can be scrolled by a few pixels, which checklist line 29 forbids. The audit first blamed the bag beside the desk, because the note opens half a second after its tap; the audit now waits long enough and names the envelope. Twenty "for a look" lines (cut-outs without a `shadow`): looked at in the screenshots; all hang, lie flat, sit inside something or draw their own shadow (the three blocks), so none is a fault.
- Owner on the tablet: not recorded for this level before the gates; to be done now, from the link above, as this gate's test.
- Reduced motion: the audit's run under reduced motion was error-free; the owner's check not recorded.
- No soft-lock (checklist 42, added 17 Oct 2026): walked on the chart. Nothing is consumed by a wrong use (the star key on the colour padlock stays in the strip; the beater only leaves the strip onto the bars); every close-up steps back; every doorway stays open; the stack of blocks, once toppled, leaves the beater in reach. No dead end found.
- Real phone (checklist 44): not yet; the owner's tablet is the only device so far.
- Art side by side (checklist 43): this level is the reference the others are compared with; its own 20 walls were made over three days and the classroom four are from a different session than the rest, so the comparison worth making is classroom against corridor, library, art room and hall.
Target-age tester (if available): who, what they got stuck on, what they said: none yet.
Result: plays right by script and audit except the note-card padding (learning loop, row 1). Waits on the owner's tablet play.

### Gate C — it plays right
Signed off:

---

## 5. Asset and script list

Reuse first: there was no asset register when this level was made; everything below was made for it, and it is now the register's first page. Shared with later levels: the moth's two portraits and voice, Mary's portrait (the postcard stamp), the title track, the How to play pictures. The classroom walls (`landscape-c1`–`c4`) are this level's only; the corridor, library, art room and hall are available to any later stage set in the school.

| # | Asset | Type (wall / cut-out / close-up / icon / comic / voice / track) | Reused from | Prompt or line | Est. credit |
|---|---|---|---|---|---|
| 1 | Classroom walls c1–c4 (`next/art/classroom/landscape-*.jpg`) | wall ×4 | made 28 Sept 2026 | `next/art/classroom/PROMPTS.md`, "Landscape set" (L1–L4) | already made |
| 2 | Corridor walls h1–h4 (`next/art/school/`) | wall ×4 | made 28 Sept 2026 | PROMPTS.md, "Corridor and library" | already made |
| 3 | Library walls ln, le, ls, lw | wall ×4 | made 28–29 Sept 2026 | PROMPTS.md, "Corridor and library" | already made |
| 4 | Art room walls an, ae, as, aw | wall ×4 | made 29 Sept 2026 | PROMPTS.md, "Art room and hall" | already made |
| 5 | Hall walls hn, he, hs, hw | wall ×4 | made 29 Sept 2026 | PROMPTS.md, "Art room and hall" | already made |
| 6 | Classroom cut-outs: cupboard doors, mug, apple, four bean plants (top and pot each), coat, lost-property box and its front, bin lid, envelope, hamster, backpack (`layer-*.png`, 22 files) | cut-out | made 28 Sept 2026 | PROMPTS.md, "Cut-outs and cleaned walls" | already made |
| 7 | School cut-outs: report, locker door (cut from the wall), bonus card, bunting, stage drawer, star padlock, beater, three soft blocks, colour-dial padlock, star key, globe, headphones, sticky note, cushions, knitted hamster, desk bell, trolley (19 files) | cut-out | made 28–29 Sept 2026 | PROMPTS.md, corridor/library and art/hall sections | already made |
| 8 | Shelf close-ups: shelf-sci, shelf-mus, shelf-art, shelf-trolley, shelf-sto | close-up ×5 | made 28–29 Sept 2026 | PROMPTS.md, "Corridor and library" | already made |
| 9 | Close-ups: closeup-bells, closeup-stem, closeup-mothpainting, closeup-paint | close-up ×4 | made 29 Sept 2026 | PROMPTS.md, "Art room and hall" | already made |
| 10 | Inventory icons: envelope, note, music page, star key, beater, three slips (8 files) | icon | made 28–29 Sept 2026 | PROMPTS.md (icons on white, keyed out) | already made |
| 11 | Comic pages school-1 to school-4 | comic ×4 | made 30 Sept 2026 | PROMPTS.md, "The comic intro"; lines in `comic` in the stage | already made |
| 12 | Postcard picture `postcards/school.jpg` | close-up (3:2) | made 30 Sept 2026 | playbook 4f | already made |
| 13 | Voice: 65 lines (`school.*`: card, intro, meanwhile, 8 comic lines, 45 hint lines, 8 notes, postcard) | voice ×65 | recorded 30 Sept 2026, voice Vindemiatrix | the lines in `school.js`, extracted by `tools/extract-lines.js` | already made |
| 14 | Track `music/classroom.mp3` | track | made 28 Sept 2026, Lyria | `next/art/music/README.md` | already made |
| 15 | Opening gesture: the classroom blind (cut-out of the blind, or cut from the c2 wall) | cut-out ×1 | not made | backlog 11: "the classroom blind"; may be cut from the existing window wall at no credit | 0 if cut from c2; else one cut-out |
| 16 | Shared: moth portraits, Mary's portrait, title track, How to play pictures | portrait / track | made 30 Sept 2026 for the whole game | PROMPTS.md "Portraits", "The moth" | already made |

- Script locked on: 30 Sept 2026 in effect (the 65 lines were recorded that day). Any change to a line in `school.js` from now on is a re-record and is noted in the ledger.
- Total estimate: 0 credit for the retrofit. The only unmade thing (row 15) can be cut from an existing wall. If the note-card fault is fixed by shortening the envelope text instead of in the engine, that is one re-recorded voice line.

### Gate D — list and budget
Signed off:

---

## 6a. Sample pack

Not applicable to the retrofit: every asset exists and was judged in the game on the tablet by the owner on 28–30 Sept 2026 (feedback log in `PLAYBOOK.md`, entries 1–42). If row 15 (the blind) needs a generated cut-out, it is its own one-item sample.

| Sample | What it is | Why this one | Result |
|---|---|---|---|
| Wall | the hardest view: c4 (the timetable wall, where the game draws the grid over the picture) | n/a, made | judged live, 28 Sept 2026 |
| Cut-out | n/a | | |
| Close-up | n/a | | |
| Voice ×2–3 | n/a | | |
| Track | n/a | | |

Judged in the greybox, on the tablet, with the inventory strip and arrows in place.
Prompt changes made before sign-off: n/a.

### Gate E — samples
Signed off:

---

## 6b. Batch

- Made on: 28–30 Sept 2026, before the gates.
- Originals copied to Drive folder: **none exist.** The 2K PNG originals were kept out of the repo (playbook 2) and the cloud sessions that made them are gone, so the 1920×1080 JPEGs and 1K cut-outs in the repo are the only copies. A Drive search on 17 Oct 2026 found no Moth House folder. From this level on, originals go to Drive before a session ends; for this level there is nothing to copy.
- Checked against the checklist: proportions · no lettering · matches the samples · stands on its surface with a shadow: proportions and shadows pass the audit; lettering exceptions in generated art are the listed ones (5H TIMETABLE, RULES, the LIBRARY sign, STEM WEEK, HAPPY HOLIDAYS).
- Re-dos and why: not recorded at the time. Known from the feedback log: the coat (hood and buttons both facing out), the bin lid and hat (see-through), the trolley (on the skirting), the blocks (sliced from one picture, redrawn as three parts), the locker door (cut from the wall after a generated one drifted).

## 7. Integrate and polish

- Play link: https://me565.github.io/next/landscape/?stage=school (live build 2026-09-30x).
- Checklist walk at 2000×700, 740×360, 2200×1300, reduced motion: 17 Oct 2026 by script at 844×390, 1180×820 and 2000×700: one fault (the envelope note's padding, above). Owner's walk at his shapes: to do.
- Audit: one failure, E29 on the envelope note (above). The audit itself was corrected to wait for a late-opening note.
- Voice lines recorded (`tools/voice.py`), none missing: all 65 `school.*` keys are in `next/art/voice/index.json`.

### Final sign-off
Signed off:

## 8. Release

- Merged on: 30 Sept 2026 (pull request #3, then the root swap in #4), before the gates.
- Playtester notes (who, what, fix now or later): none recorded yet.

---

## Credit ledger

Credit was not recorded when this level was made (28–30 Sept 2026). The scale of what was spent, for the next level's estimate: 20 walls, 41 cut-outs, 9 close-ups, 8 icons, 4 comic pages, 1 postcard picture, 65 voice lines, 1 track, plus the re-dos listed in 6b.

| Stage | Estimate | Actual | Re-dos (count) | Why |
|---|---|---|---|---|
| 6a samples | n/a | not recorded | | made before the gates |
| 6b batch | n/a | not recorded | at least 5 known | coat, bin lid, hat, trolley, blocks (feedback log) |
| 7 polish | 0 | 0 so far | 0 | the retrofit spends nothing |
| Total | 0 (retrofit) | 0 so far | | |

## Learning loop

Every fault found in this level, where it was found, and what happened to it.

| Found at | Fault | Fixed how | Rule for every level? | Written to (Playbook § / Checklist line / audit) |
|---|---|---|---|---|
| 4 Greybox (audit, 17 Oct 2026) | The envelope note's card clips its bottom padding by 9–18 px at every tested size, so the card can scroll a little (checklist 29, audit E29). | Not yet. The cause is the note card's fixed height against the game's longest note; the fix belongs in the engine (shrink the type a step or let the card grow within the stage), which is the frozen whole-game layer. Shortening the text would mean re-recording a voice line. | Yes: every note in every stage must fit its card. | Playbook §8 backlog item 17 (17 Oct 2026); checklist 29 already covers it; audit E29 already catches it. |
| 4 Greybox (audit, 17 Oct 2026) | The audit pinned the overflow on the wrong hotspot (the bag), because the envelope's note opens 500 ms after the tap and the audit waited 350 ms. | Audit waits 800 ms after each tap before measuring. | Yes. | `tools/audit.js` (17 Oct 2026). |
| 3 Puzzle chart (paper playtest) | `tools/play.js` never exercised the star-key-on-the-colour-padlock wrong try, so one of the level's friendly lines had no test. | The step was added to the play script (in the art room, holding the key); the line comes back as written. | Yes: a stage's play script exercises every wrong-try line, in the room where it can happen. | Checklist G40 (17 Oct 2026). |
| 1 Brief | No opening gesture (the classroom blind, backlog 11); checklist 31 requires one per stage. | Not yet; needs the blind as a cut-out (possibly cut from c2 at no credit) and a few lines in the stage. Waits on Gate D for this level. | Already a rule (checklist 31). | Recorded here; backlog 11 already lists it. |
| 6b Batch | No originals kept; no Drive folder. | Nothing to recover. From now on, originals to Drive before the session ends (CLAUDE.md gates, 6b). | Already a rule. | Recorded here. |

## Notes for this level only

- 17 Oct 2026: the owner sent photos of the real school; `next/art/REFERENCE.md` holds what they show in words and five changes they could suggest (dark exposed ceiling, beech-and-black desks with red chairs, a marker-written whiteboard, a projector screen in the hall, Mandarin on the timetable). Any of them is a new pass through Gates D and E for this level, with an estimate, before a single wall is remade.

- Puzzle values, for anyone checking the chart against the game: tune green, red, blue, yellow (`TUNE_ORDER`); paint code purple, green, orange (`PAINT_CODE` = pots 5, 3, 4 of red, yellow, blue, green, orange, purple); locker 4, 3, 6 (`CODE`); timetable Mon En Ma Sc Ar PE Mu · Tue Ma En Mu Ge Sc Li · Wed Sc Ma En PE Mu Ar · Thu En Ar Ma Sc Li PE · Fri Ma Mu Ar En PE Sc.
- Two owner rulings asked for under Gate A: the lost-property box that appears in both Mary's and Elliot's classrooms (Mary's has no puzzle role), and the STEM WEEK "one small explosion" joke.
- The bonus's "someone in London" depends on Nana having been named by the comic or the title card; fine for an optional layer, noted under the paper playtest.
