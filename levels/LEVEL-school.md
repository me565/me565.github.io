# Level: school — Mary, last day of school ("The Last Bell", version 3)

Version 2 of this level is live as the lite release (built 28–30 Sept 2026, walked back through the gates on paper on 17 Oct 2026; its brief, map and chart are in this file's history before commit `v3`). On 17 Oct 2026 the owner asked for puzzles to the standard of Rusty Lake and Dark Dome, young-adult difficulty, no sparkles by default and a longer level, and said "go" to version 3 below. Version 3 is built through the gates as stage `school3` beside the live stage and replaces `school` when its final sign-off is given. Sign-off lines are the owner's; none has been written.

Status: `brief` | `outline` | `greybox` | `assets listed` | `samples` | `batch` | `integrating` | `released`
Current status: version 3 removed (owner, 26 Oct 2026: "Remove this version of the last bell. We should only have the rebuilt version."; MOTH-155, build 2026-10-26b). Its greybox never passed Gate C and was not rebuilt after the style decision of 24 Oct 2026; the stage `school3`, its play script and its grey tabs are gone from the files, and this file below is kept as the record of what was tried. Mary's school is the live version 2 (`stages/school.js`) until the owner gives the level's fresh brief, which starts a new pass through the gates from Gate A in the test room's style.
Build id of the latest play link: none (version 3 removed)
Latest play link: none for version 3; version 2 stays live at https://me565.github.io/next/landscape/?stage=school

---

## 1. Brief

- Child and age: Mary, 10. Notices patterns, reads everything. Her story plays like a proper puzzle game: reading, codes, maps, working things out, for grown-ups too.
- Where and when in the journey (see `STORY.md`): stage 1 of 6, the last afternoon of term at Knightsbrook International School, Singapore, twenty to three; the last bell is at three. Everyone else is at the goodbye party. Packing day follows on the same save.
- The objective, in the child's words (one sentence): "Nobody can go home until the last bell rings, the bell has gone missing, and Mr Hollis has turned finding it into one last hunt for me."
- Difficulty (1–5, from `STORY.md`): 4.
- The signature moment (one thing the player will remember): pulling the blind down and watching glow-in-the-dark stars come out on the classroom wall; then, at the very end, swinging the school's handbell herself to ring the year out.
- The opening gesture: the blind cord. Mary starts facing the window with the blind down and the room dim; she pulls the blind up and the afternoon light sweeps in, with the moth on the glass. The same blind is pulled down again later for the stars (the one thing used twice, in two states).
- What this level carries forward from earlier ones, and what it hands on: nothing comes in. It hands on Nana's postcard ("Not long now!", with the glowing moth), the report, the moth at the window, the Night Moth star if solved, and the sense that light and dark show different things (the Moth House appears only at dusk).
- Legal and fiction check: fictional names only, no brands, no Merlion, nothing borrowed: passes as for version 2 (Knightsbrook, Mr Hollis, Mrs Ng, Ben, Aisha, Priya, Biscuit, Kingfishers all invented; no brand, no Merlion; the fiction notice on the title screen). The design principles are borrowed from a genre, not any puzzle, name or picture from a game.

### Gate A — story
Checked: fits the arc and the age · nothing borrowed · fiction and legal rules · nothing shared with another child's story
Walked 17 Oct 2026 for version 3:
- Fits the arc and the age: yes. Reading, a mirror line, a map, a rule applied, a dial set by observation; nothing a ten-year-old who reads well cannot do, enough to make a grown-up think. The premise (nobody leaves until the bell) is a cosy pressure with no timer and no failing. Light and dark as a theme points straight at the Moth House.
- Nothing borrowed: yes. The standard is the genre's; every puzzle is ours and built from this school's own things.
- Fiction and legal rules: yes.
- Nothing shared with another child's story: the lost-property box still appears in both Mary's and Elliot's classrooms (no puzzle role in Mary's); Nutmeg's wheel, the blind, the mixing dials, the map and the bell appear in no other child's story. Owner to rule on the box, as before.
- Child-safe: feeding a pet twice gives a friendly line and he sleeps it off; the bell is swung, not climbed for; the blind is a cord pull. Nothing to copy that could hurt.
Signed off:

---

## 2. Game map

- Floor plan: `levels/LEVEL-school-map.json`, drawn by `tools/levelmap.py` into `levels/LEVEL-school-map.drawio` (open at app.diagrams.net). Unchanged rooms and doorways from version 2; the locks change (below).
- Rooms and their views (in turning order): as version 2 (Classroom 5H c1–c4; Corridor h1–h4; Library ln, le, ls, lw; Art room an, ae, as, aw; Hall hn, he, hs, hw), with these additions: c2 the blind and its cord over the window; c4 the food tin by Nutmeg's cage; c1 the whiteboard carries the day's plan and the mirror line, and shows glow stars when the blind is down; le a world map on the library wall; ln the library cabinet is locked (four arrows); hn the banner's four coloured letters; an Ben's note under his rainbow. **Start: c2, facing the window, blind down.**
- Doors: as version 2 (every doorway open from the start).
- Locked at the start, and what opens it:
  - STEM cabinet (he): a star dial showing the Kite; pick the tail star. Known from the glow stars on c1 with the blind down (which star is brightest) and *The Night Sky* (the brightest star is at the tail). Inside: the Science badge, 3.
  - Paint cupboard (ae): three dials of primary pairs; set red+blue, yellow+blue, red+yellow (purple, green, orange) and tap Open. Known from the stripes under Mary's moth (an) and Ben's note / *The Painting Book*. Inside: the Art badge, 5.
  - Library cabinet (ln): four arrows; set N, W, W, N. Known from the world map's route (le). Inside: the Geography badge, 2.
  - Stage drawer (hn): the beater (hw, under the blocks) struck green, red, blue, yellow. Known from the banner's coloured letters (hn) and *Playing the Piano* (which bar is which note). Inside: the handbell.
  - Nutmeg's counter (c4): not a lock but a mechanism: the food tin, once. Rule 3 on the class rules poster. Reads 7.
  - Mary's locker (h1): four dials, 5 7 2 3. Known from the four numbers and the order (mirror line on the whiteboard → Thursday on the timetable, read with the picture key).
  - The ending: the handbell swung in the corridor after the locker has opened.
- The linear opening (the one room that teaches the mechanic): Classroom 5H: the blind (a drag), the envelope (a pick-up and a note), Nutmeg and the tin (a use), the board (a close-up with reading). Four mechanics taught before the corridor.
- The hub (where several trails open at once): the corridor, as before: the locker in view, the bonus card, every doorway.

Walk-through test: every room reachable · little backtracking · once opened, stays open
Result (walked on the map, 17 Oct 2026): passes. Rooms and doorways are unchanged from version 2, so reachability holds. Backtracking is slightly higher by design: the blind must be pulled down in the classroom before the STEM dial in the hall can be set, and the locker's order sends the player back to the classroom's two walls once. Every lock stays open; the blind can be raised and lowered freely once the opening has played; the counter keeps its reading.

## 3. Puzzle chart

- Chart: `levels/LEVEL-school-chart.drawio`, seven lanes (Maths, Science, Art, Geography, Music, the order and the locker, the ending), item → clue → lock → reward, with the cross-lane arrows from the envelope and into the locker.
- Trails that run in parallel: Maths, Science, Art, Geography and Music all open from the envelope and can be done in any order. Science alone needs a return to the classroom (the blind). The order (board + timetable) can be read at any time and only matters at the locker.
- Puzzle types used (cap: two of any type): cause-and-effect with a posted rule (Nutmeg) · room-state change + pattern dial (blind, stars, star dial) · colour mixing as pairs (paint dials) · route to arrows (map, cabinet) · sound-colour sequence (banner, bars) · mirror writing + table lookup (board, timetable) · number dials (locker). **Seven types, none twice.**
- For every lock, the in-game clue that points to its answer and where the player sees it:
  - Star dial: the brighter star among the seven on the wall (c1, blind down) + "its brightest star is at the tail" (*The Night Sky*, ln). The dial shows the same Kite.
  - Paint dials: the three stripes (an) + Ben's note (an) or the colour wheel (*The Painting Book*, lw). The six pots on the shelf (ae) show which colours exist.
  - Arrow lock: the dotted route on the map (le), four legs, with a compass rose on the map.
  - Chime bars: the four coloured letters on the banner (hn) in reading order + the bars' colours; *Playing the Piano* (lw) names the bars.
  - Nutmeg: rule 3 on the rules poster (c4): once a day, never twice; the counter is on the wheel.
  - Locker: the mirror line on the board (c1) + the timetable (c4) + the picture key (c1) + the four numbers (badges in the strip, the counter in the notebook's Noticed).
  - The bell: Mr Hollis's last line in the locker, "Now ring it."
- Tiered hints per trail (nudge · what to try · the answer), to be written in the stage; the second tier names the hotspot to pulse. One row per step, as version 2 had (about eighteen rows).
- The notebook's "Noticed" lines: the counter's reading; the brighter star's place; the stripes; the route's four legs; the banner's four colours in order; the mirror line (shown backwards until tier 3); the bonus riddle.
- Wrong-try lines (friendly, never a punishment): second feed ("Rule 3! He's far too full. He'll sleep it off.") · star dial wrong ("Not that star. Which one shone brightest?") · wrong pairs ("That mixes to the wrong colour.") · wrong arrows ("The plane would end up in the sea.") · wrong tune ("That isn't the tune. Start again from the first note.") · wrong code ("It doesn't budge. Not those numbers.") · bell before the locker ("Not yet. Mr Hollis said the bell comes last.") · blind during the opening is never wrong: a wrong direction simply waits.
- The Night Moth bonus (optional hard layer): unchanged: the card on the notice board, NANA on the Stories shelf, a star on the postcard's P.S.
- Every clue given by sound is also shown: yes. The bars are coloured and flash; the tune is four coloured letters; the bell's ring is also the clock striking three on the wall.

Paper playtest: solved from the chart alone by: Claude, 17 Oct 2026, from the chart with the stage file closed. The greybox play script will be the second pass.
Result: passes. Every lock has two inputs from two places. One care point: the mirror line should be short and the board close-up large enough to read it backwards; the notebook's Noticed line keeps it available. One open design question: whether the Maths station should also yield a badge item, for consistency with the other three, or stay as a reading recorded in the notebook (drafted as the latter; the owner may prefer the former).

### Gate B — level outline
Checked: map walk-through passed · paper playtest passed · no puzzle type more than twice · every answer has a visible clue · difficulty matches the brief
Walked 17 Oct 2026 for version 3: all five pass as recorded above. Difficulty 4: six locks, seven puzzle types, two transformations (mirror, pairs), one room change.
Signed off:

---

## 4. Greybox

- Stage key and plugin file: version 3 is built as `school3`, `next/landscape/stages/school3.js`, beside the live `school` (version 2); `?stage=school3` opens it. It takes `school`'s place when its final sign-off is given.
- Version 2's greybox record (it never had one; walked on paper 17 Oct 2026) is kept below for the ledger; version 3's greybox: existing walls and cut-outs, labelled boxes for the blind, the food tin, the counter, the world map, the arrow lock, the star dial, the badges and the handbell; all drawn-over things (glow stars, banner letters, mirror line, Ben's note, the Thursday timetable) drawn by the game as they will be in the finished level.
- Play link (pinned to commit): version 3's greybox is build 2026-10-17e, `?stage=school3` (version 2 never had a greybox; it was built straight into art).
- Version 3 greybox, what is placeholder: grey labelled boxes for the blind and its cord, the food tin, the lap counter, the world map on the library wall, the badges inside the three cabinets, the handbell (its strip icon too), the two pull tabs of the gestures; the star dial, the pair dials and the arrow lock as plain cards. What is real: every wall and cut-out of version 2; the puzzle logic of all six locks and the counter; the glow stars, the banner's coloured letters, the whiteboard's plan with its mirror line, Ben's note and the Thursday timetable, all drawn by the game as they will be; hints in three tiers with the second tier pulsing the thing; the notebook in two columns; saves; the two gestures (the blind up, the bell swung) on the engine's drag; the ending and the postcard.
- Version 3 tests (17 Oct 2026): `tools/play-s3.js` plays it start to ending with every wrong try (second feed, wrong star, wrong pairs, wrong arrows, wrong tune, wrong code, the bell too early, the bell in the wrong room), checks the notebook at 844×390 and 2000×700 after the library, after the hall and at the end, and the page at both widths: no overflow, no page errors. The audit on `school3`: no failures (a stage that `supersedes` another may share its hotspot ids). Version 2 and packing day still pass their scripts on the same engine.
- Found and fixed on the way (learning loop): the opening gesture did not play because the comic sets `comicSeen` before the card, so "fresh start" was already false; the engine now runs a stage's `begin` once on its own flag. The letter overflowed its card with five riddles in large type; the riddles are now one paragraph. The notebook overflowed with seven lines and nine notices; a stage with five or more trails lists them in two columns and Noticed keeps the newest four still in use.
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
- Audit: clean as of build 2026-10-17a (the envelope note's padding fixed in the engine, backlog 17). The audit itself was corrected to wait for a late-opening note.
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
| 4 Greybox (audit, 17 Oct 2026) | The envelope note's card clips its bottom padding by 9–18 px at every tested size, so the card can scroll a little (checklist 29, audit E29). | Fixed in build 2026-10-17a: the note card's type, line height and gap eased a step in the engine (no text changed, no re-record). Measured again at 844×390, 1180×820 and 2000×700: the card fits with room to spare; audit clean. | Yes: every note in every stage must fit its card. | Playbook §8 backlog item 17 (17 Oct 2026); checklist 29 already covers it; audit E29 already catches it. |
| 4 Greybox (audit, 17 Oct 2026) | The audit pinned the overflow on the wrong hotspot (the bag), because the envelope's note opens 500 ms after the tap and the audit waited 350 ms. | Audit waits 800 ms after each tap before measuring. | Yes. | `tools/audit.js` (17 Oct 2026). |
| 3 Puzzle chart (paper playtest) | `tools/play.js` never exercised the star-key-on-the-colour-padlock wrong try, so one of the level's friendly lines had no test. | The step was added to the play script (in the art room, holding the key); the line comes back as written. | Yes: a stage's play script exercises every wrong-try line, in the room where it can happen. | Checklist G40 (17 Oct 2026). |
| 1 Brief | No opening gesture (the classroom blind, backlog 11); checklist 31 requires one per stage. | Not yet; needs the blind as a cut-out (possibly cut from c2 at no credit) and a few lines in the stage. Waits on Gate D for this level. | Already a rule (checklist 31). | Recorded here; backlog 11 already lists it. |
| 4 Greybox / 7 Polish (owner, 17 Oct 2026, build 2026-10-17b) | Corners do not agree between walls, and the engine-painted prototype looked odd: the baked side panels are flat, and the room's walls disagree on band height, ceiling, floor line and colour. | Prototype switched off. Permanent fix: walls regenerated flat under one room specification, the engine drawing the box (playbook 4z, backlog 19); a Gate D item for this level. | Yes: every room has one written specification before its first prompt, and corners agree (checklist 46). | Playbook 4z and 2; checklist 46; this file's notes. |
| 4 Greybox (owner, tablet, 18 Oct 2026) | Clues read in the library (a book page) or elsewhere had to be remembered or walked back to; other games let you carry them. | The first reading of a page, the map, the banner, the whiteboard or the timetable copies it into Mary's notebook; a chip there reopens the card anywhere (`copyClue`, `STAGE.clues()`, the engine's notebook). | Yes. | Checklist 47; playbook 7; the engine's notebook. |
| 4 Greybox (owner, tablet, 18 Oct 2026) | With the blind down the whole level went dark, not just the classroom. | The dark applies only while the player is in the classroom (`onRender` checks the room). | Yes: a room's mood stays in its room. | Checklist 48. |
| 6b Batch | No originals kept; no Drive folder. | Nothing to recover. From now on, originals to Drive before the session ends (CLAUDE.md gates, 6b). | Already a rule. | Recorded here. |

## Notes for this level only

- 21 Oct 2026: the micro-animation plan (`next/MOTION.md`, playbook 4ab) came in while version 3 was between Gate B and Gate C. The engine is frozen for it, so it gets no new movements (backlog 20 to 23) until it is released; the motion sheet is filled at its next gate, not retrofitted to Gate B.

- 17 Oct 2026, builds 2026-10-17b/c: the classroom was the prototype for engine-painted side walls (playbook 4z). The owner judged it odd and the prototype is switched off; the measured boxes are kept here for when the walls are redone: c1 back [5.8, 94.2, 14.1, 88.1], sides inner yT 14.1/yB 88.1, outer yT0 19.1/yB0 92.8 (left) and 19.1/92.6 (right); c2 back [7.6, 92.3, 8.6, 88.9], outer 0.5/95.2 and 0.6/95.1; c3 back [7.6, 92.4, 9.7, 91.9], outer 1.7/94.8 and 1.5/94.7; c4 back [19.5, 80.4, 9.4, 83.9], side panels flat, outer 8.0/84.5 both sides.
- **Room specification needed before any wall of this level is regenerated** (checklist 43 finding, 17 Oct 2026): the four classroom walls disagree on the mint band's height (mid-wall on c4, low on c1), the ceiling height, the floor line and the cream. The same check is owed for the corridor, library, art room and hall. A regeneration is a Gate D item with an estimate (four walls for the classroom; up to twenty for the stage).

- 17 Oct 2026, build 2026-10-17a (the lite release: Elliot's and Zaina's cards greyed out as Coming soon): the build id changed, so this build starts every player's game again (checklist 45; backlog 18 is the fix). Said here before merging, as the checklist asks.

- 17 Oct 2026: the owner sent photos of the real school; `next/art/REFERENCE.md` holds what they show in words and five changes they could suggest (dark exposed ceiling, beech-and-black desks with red chairs, a marker-written whiteboard, a projector screen in the hall, Mandarin on the timetable). Any of them is a new pass through Gates D and E for this level, with an estimate, before a single wall is remade.

- 18 Oct 2026, build 2026-10-18b: the other line of work (branch `claude/kind-allen-9qbf6k`: the flight, Nana and Jedi's, Trent Park, packing day version 2 from the owner's photographs, the comic-page interface and the read-along) was merged into this one. The version 2 school stage had three small art fixes on that line (playbook 4r: the lost-property box front re-cut from the rim's ink line, the things inside lowered, the fallen blocks landing on the mat); the audit caught the greybox's copy of the box front still at the old size (checklist B9), and the three fixes are now ported into `school3.js` too. Rule noted: when a greybox copies a shared wall's cut-outs from another stage, it inherits that stage's fixes at every merge, and the audit over both stages is what catches a miss.
- Puzzle values, for anyone checking the chart against the game: tune green, red, blue, yellow (`TUNE_ORDER`); paint code purple, green, orange (`PAINT_CODE` = pots 5, 3, 4 of red, yellow, blue, green, orange, purple); locker 4, 3, 6 (`CODE`); timetable Mon En Ma Sc Ar PE Mu · Tue Ma En Mu Ge Sc Li · Wed Sc Ma En PE Mu Ar · Thu En Ar Ma Sc Li PE · Fri Ma Mu Ar En PE Sc.
- Two owner rulings asked for under Gate A: the lost-property box that appears in both Mary's and Elliot's classrooms (Mary's has no puzzle role), and the STEM WEEK "one small explosion" joke.
- The bonus's "someone in London" depends on Nana having been named by the comic or the title card; fine for an optional layer, noted under the paper playtest.
