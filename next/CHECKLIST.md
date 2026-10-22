# The Moth House checklist

Every fault the owner has had to point out, turned into a check. It is used twice: **at the start of any update** (read it, decide which lines the work touches) and **on every amended or new thing before it is shown** (walk the lines, close up, at the owner's screen shape). `node tools/audit.js` runs the lines a script can run; the rest are looked at, one screenshot per view, before the play link goes out. A line that fails is fixed, not explained. Sources: the feedback log in `PLAYBOOK.md` (entries 1–42) and this chat's rounds of testing on 30 Sept 2026.

## A. Before starting

1. Read `STORY.md` for the stage and `PLAYBOOK.md` for the rules; read this list and mark the lines the work will touch.
2. Nothing borrowed: no name, character, picture or puzzle from any other game. The owner's videos and screenshots are for the idea only; ours is our own version (playbook 7, backlog 11–16).
3. Nothing shared between the three children's stories: no clue, item or hiding place appears in two of them (log 17).
4. The owner's photos are never kept in the repo; only drawn portraits and word descriptions (log 17).
5. Fiction and legal safety: the fictional school names, no brands, no Merlion, the fiction notice stays in the credits.
6. Child-safe: nothing unsafe to copy, no failing, no timers, a friendly line for a wrong try.
7. Every clue given by sound is also shown; every clue is in a picture, never only in words.
8. TO DECIDE items (the moth's name) are never filled in without asking.

8b. **The opening view carries no clue and no item.** The goal may be in sight; the first thing to read or pick up is at least one turn away (log 52, playbook 4t).

8c. **A level starts from the owner's materials and a design on paper.** Materials (plan, rooms, view, people) are listed back as they arrive with what is still missing; the brief's decisions are asked once with defaults; the design (rooms, card, trails with both inputs of every lock, who moves, Night Moth, difficulty) is approved before any picture is made (playbook 4x). Photographs never enter the repo.
8d. **A wall drawn from a photograph keeps the room and loses the people.** Two references, the game's box and the photograph; the prompt forbids people, faces, photographs of people and lettering; anything unsafe in the photograph (knives) is painted out (log 56).

## B. Every cut-out (a thing placed on a wall)

9. **Proportions.** The box keeps the picture's own proportions: h = w × pictureH / pictureW × 16/9. A squashed or stretched cut-out fails (audit checks this).
9b. **Made alone.** A cut-out or icon is generated on white with no picture reference (a style crop makes the model draw the object into that scene). A thing that must sit *in* something (a pocket, a box) is painted into a second rendering of its wall and lifted out, so it carries the wall's own shadow (playbook 4r, 4s).
9c. **A person is keyed, never differenced.** A figure painted into a wall is lifted by asking for the same picture as a cut-out sheet on flat magenta (the person only, same pose, size and place) and keying the magenta (`tools/keymag.py`), never by differencing against the wall: a difference mask leaves see-through patches wherever the figure's colour meets a like colour behind it (Nana's cardigan on the cream wall, Jedi's trousers on the chair, log 54). An enclosed magenta patch is a real gap (between a hand and a teapot, a ladder's rungs) and stays see-through. The `-check.jpg` of every cut-out is looked at close up: no hole, no fringe. A sheet that keeps the furniture is thrown away and asked for again, never keyed.
9d. **A painted-in thing is checked as the real thing.** A loft ladder drops nearly straight from its hatch with its feet under the opening and a hatch door hangs from its hinge; a thing that leans, floats or hangs on the wrong plane is redrawn. Two candidates are generated and the natural one picked (log 54).

10. **Standing on a surface.** A thing that still looks pasted on after placement and shadow is painted into a second rendering of its wall and lifted out, so it carries the wall's own light (playbook 4r, log 50). A thing on the floor stands below the skirting line, never on it (the trolley, log 40). A thing on a seat sits back from the front edge with the seat visible in front of it (the hamster, log 40). A thing on a shelf or table stands on the surface, not on its front edge. Every one of these has a contact shadow (`shadow`), so nothing floats (logs 6, 40).
11. **Inside something.** The box's front is cut from the wall with the rim's ink line as its top edge, column by column, never from a little below it (log 50). A thing in a box or cupboard sits behind the box's own front, which is cut from the wall and drawn over it; tops show above the rim, bottoms are hidden (logs 8, 9, 37).
12. **Hanging.** Anything hanging hangs from something drawn: a hook, a peg, a staple through a padlock's shackle. A lock glued to a door fails (log 37).
13. **Behind glass.** Clipped to the glass, toned down, the glass painted over it in every frame (logs 5, 7, 8).
14. **Light.** The room's light on a cut-out is blurred broad light only, never the lines behind it; a thing that looks see-through fails (the coat, the bin lid, the hat, logs 12, 13, 37).
15. **Physical sense.** A coat hung by its loop shows its back; a hood and buttons both facing out is impossible (log 7). A plant bends, its pot never does (log 5). Only the part that would really move moves.
16b. **A real place keeps its real layout and its real crowd.** Seats on a plane all face the front (backs when looking forward, faces when looking back, profiles sideways); a flight is three-quarters full, a classroom has children. Each view's prompt says which way things face; the wall is checked against the floor plan before it is accepted (log 52).

16c. **Outdoors, each view keeps its compass.** A landmark that belongs to one direction (the big house south of the obelisk) is named in that view's prompt and told to stay out of the others; a view that shows it where it cannot be is redrawn (Trent Park, log 55).

16. **Wall and close-up agree.** What is on the wall is on its close-up, in the same place, with the same marks (the timetable, the bottles, the paintings; log 6, playbook 4k).

## C. Everything the game draws onto a picture (words, marks, colours)

17. **It takes the thing's own shape.** Lettering on a spine follows the spine panel that carries the label, never the cover face beside it and never a rectangle laid near it (logs 36–39). Marks in a card take the card's measured corners and slant with it (log 41). Measure on a zoomed grid of the picture, not by eye at thumbnail size.
18. **It fits.** One line per title, one size for all titles on a shelf; a title too long for its spine is renamed, not shrunk (log 38). A note's text fits its paper (log 36). Columns leave room for the longest word (Geography, log 36).
19. **It is drawn with an explicit size.** An inline SVG carries width and height, so no browser gives it a default height (the stripes, log 36).
20. **No lettering inside generated pictures.** Posters are plain pictures, whiteboards blank, signs without words, balloons plain; anything that must be read is drawn by the game (playbook 4n; logs 12, 35). Exceptions are deliberate and listed (GOODBYE 2P!, the LIBRARY sign).
21. **One picture per panel.** A comic page or close-up is one frame, never split in two (log 35).

## D. Every movement

22. **Organic, never a shifted rectangle** (log 4). Drawn in slices or as whole parts; a tap always shows something, shorter and gentler under reduced motion (log 3).
23. **Parts are parts.** A thing that comes apart is drawn as its parts from the start, one cut-out each; never slice one picture (the blocks, log 42). Parts land apart, each on a face, never on a corner or on top of one another.
24. **Revealed things appear when uncovered**, not seconds later; a re-render keeps a movement going (the beater, log 37).
24b. **A thing that opens is drawn opening by the movement it really makes.** A hatch door swings down from its hinge, then the ladder slides out of the opening and lands (`unfold`); a padlock springs and falls (`drop`). A movement made for one thing is never borrowed for another kind of thing (the hatch had the padlock's fall, log 54).
25. **Liquids land where they should**: water from the spout into the basin, not above it (logs 12, 37).
26. **Living background** only where a real thing would move, slow and small, one or two per view, at rest under reduced motion, never the sole carrier of a clue (log 31).
27. **Openables open and close**, before and after their contents are taken, and stay as left (log 30). Doorways between rooms are exempt.
28. **Never leave a blank.** A movement that fails part-way leaves the thing at rest; a picture is never read outside its edges; a pixel read is wrapped, because some hosts forbid it (the globe, logs 36–37).
53. **Movement was planned.** Every thing that moves was on the level's motion sheet before its art was made; no wall was regenerated to cut a moving thing out of it (playbook 4ab).
54. **Every solve has a reward moment.** A lock that opens shows the lock reacting, the thing opening by its own movement and what was inside, with sound, in about three seconds, then a settled state that stays (playbook 4ab).
55. **Joints never gap.** A thing in hinged parts shows no seam, gap or doubled edge at its joints, checked in a screenshot at the furthest point of every movement (playbook 4ab).
56. **Poses match.** A pose swap jumps only in the part that changes: same size, place, line and colour in every pose (playbook 4ab).
58. **Only the part that can move moves.** A cut-out standing in or on something is pinned at its base (`pin`, measured from its own rim or soil line), so a pot, a stand or a base never sways with what grows or hangs from it; a soft thing slumps, a hard thing rocks, and nothing swivels; a thing behind glass stays solid, the bars in front of it, and sits on the floor of what holds it, feet on the bedding (owner's recording, 22 Oct 2026; MOTH-46 to 48). Checked by tapping each moving thing and watching its base.


## E. Every close-up and gesture

29. Tap outside to step back; nothing scrolls inside; the picture is crisper than the room behind (log 11).
29b. **A thing taken is gone from the picture.** A close-up that holds things to take draws them as parts over the picture without them (`.part`); taking one removes it, and opening the close-up again shows it gone (the suitcase's torch and present, log 54). The stage's play script checks it.
30. A thing worked by hand asks for the real movement, beside the room with the room left sharp; a plain look stays a tap (playbook 4j, log 27). A wrong move waits, never fails.
30b. **A place is seen before an item is used there.** A door opens on the room, the mirror is in view, the note goes on the mirror; an item is never used on the door or box that hides its target (log 52).

31. Every stage opens with one gesture and a comic; the switch between children never replays them (4j, 4n, 4l).
32. Tap targets are finger-sized, never under the turn arrows (the strips halfway up each side in the landscape engine), never covered by a bigger target unless the bigger one is listed first (audit checks size and the arrow strips). Hotspot ids are unique across every stage (audit checks).
32e. **After a thing changes, its whole new shape is the target.** Once the hatch is open, the door, the cord's end and every rung are one way up (`showWhen` on the new target, `hideWhen` on the old); a tap anywhere on the thing that changed does the next thing. A tap on the latch that does nothing tells the player there is a puzzle left (log 54).

32b. A long press anywhere on the room glows the tappables and never opens the browser's own menu (tester round 1, T1): the scene prevents `contextmenu` and its pictures have no touch callout.

32d. The moth's line lives in the caption band under the room and never over it; nothing tappable is ever covered by a message (log 50). At the owner's shape a two-line message reaches about 16% up the scene, so nothing small is placed in the bottom sixth of a wall (the fallen key, test room, 22 Oct 2026; the audit lists such targets for a look). A note leaves the strip when its job is done.

32c. Every piece of chrome is paper with the ink rule on the one dusk sky (playbook 4p): no dark translucent pills, no tracked capitals, one gold primary button per screen, disabled buttons as muted paper. A new element that is not paper with the rule is a stranger.

## F. Words and voice

33. Two typefaces at most (log 14). The child's reading level: Zaina reads nothing, hears everything.
34. Every story-led line has a voice key, and the line is recorded before the build is called finished; a changed line is re-recorded (audit lists unrecorded keys).
35. Lines in the child's words; the postcard in the child's voice; the moth never names itself. The moth's voice is its normal narrating voice, never a whisper, and every spoken line shows its words being read (the read-along, playbook 4q).

35b. One Night Moth challenge per stage, of a kind not used before (school: riddle; packing: paper moths; flight: crossword; Nana's: a secret alphabet) (log 52).

## G. Devices and delivery

36. **Check at the owner's screen shape**: 2000×700 (a phone-shaped tablet with the browser's bar), plus 740×360 and 2200×1300, and once with reduced motion on. A fix is not done until it is seen close up at that shape (log 38).
37. No page scroll at any size; the whole game fits; portrait asks to turn.
38. Every picture preloads; nothing pops in late. A test link that must start clean carries `?fresh`; a player's game is never wiped by a new build (log 9; reworded 17 Oct 2026 for backlog 18). A screen's own pictures and the lines spoken on the way into it are ready before the screen shows (the portraits, a comic's pages and captions, the stage card; log 49); a caption never appears before its picture.
39. Sound starts on a real tap and works after the first; music never "random noise" (logs 3, 4, 10).
40. Bump `BUILD` (and the stage script tags), run every stage's play script (it plays the stage to its ending and exercises every wrong-try line, in the room where it can happen), then commit, push, republish the artifact and give a link pinned to the commit. Never make the owner ask for it. The commit id in the link is pasted from `git rev-parse HEAD` after `git ls-remote` shows it on the remote, never typed (log 51).
41. When the owner reports a fault: reproduce it at his screen shape, confirm in words that the same thing is seen, fix the cause not the symptom, and add the rule here.
42. **No soft-lock.** Before Gate C, walk every state the player can reach and show there is always a way on: nothing consumed by a wrong use, no item or close-up that can be lost, no door that shuts behind you (review research, 17 Oct 2026; playbook 7b).
43. **Art side by side.** Before a level's final sign-off, its walls, cut-outs and close-ups are looked at next to the finished levels' at the same size: same line weight, same palette, same level of detail, no view that reads as from a different hand (playbook 7b; the sample pack at Gate E is the first pass).
44. **A real phone.** Each level is played once on a mid-range Android phone before release, as well as on the owner's tablet: tap targets, text size, dark corners, the notes (playbook 7b).
45. **Progress survives a release.** The save key never carries the build id; the save carries a version and `migrate` brings an old shape forward; a change to a save's shape comes with its migration step in the same build (playbook 7b; backlog 18, done in 2026-10-17d).
46. **Corners agree.** Whatever stands at the end of a wall shows, foreshortened, in the corner of the view beside it, and nothing shows in a corner that is not on the wall next door (owner, 17 Oct 2026; playbook backlog 19). Until backlog 19 is built this is a known fault on every room; after it, a wall whose side walls are still baked in fails this line.
47. **Clues travel.** Anything read in one place and needed in another (a page, a map, a banner, a board, a table) is copied into the child's notebook the first time it is seen and reopens from there anywhere; nothing is memorised or walked back to (owner, 18 Oct 2026; playbook 7).
48. **A room's mood stays in its room.** A state that darkens, lights or changes a room (a blind, a lamp) applies only while the player is in that room; leaving it restores the ordinary look (owner, 18 Oct 2026).
57. **Views in turning order, and the wide-screen layout.** A stage's `views` list is the order the right arrow turns through, read from the room file's compass (north, east, south, west), never the pictures' file order; the first turn of every new room is checked against its corners before a link goes out (owner's video, 21 Oct 2026). On a screen wider than about 16:9 the slots stand beside the scene and the spoken line floats over the foot of the picture (backlog 24): check both layouts at the shapes in 36, that no line hides a close-up or card, and that the slots stay square.

## H. People and things move

49. **Someone or something moves with the story.** Each stage lists in STORY.md who moves, after which beat, to where, and why it makes sense (Priya from the galley to the aisle with breakfast once the screen is awake); the hints follow them (log 52).

## I. Walls from a room specification (owner, 21 Oct 2026)

50. **One room, one specification.** Every wall of a room is prompted from the same room file: palette, band height, the one light source, every object with its position and size; the sketch has nothing written on it; the anchor wall goes first. A wall prompted on its own is not a wall of the room (playbook 4ab).
51. **Corners name their neighbour.** Each side wall's sentence names the exact object at the neighbour's near end and what is out of view, and ties sizes to the band, so the window is the same window from both walls and the cupboard is nearest the corner on both (owner's room marks: Seedream's window, Nano Banana 2's cupboard).
52. **The game draws what a puzzle reads.** Clock faces blank, grids empty, labels two or three short words at most; everything else is lettering the model will get wrong (fourteen wrong clocks in thirty-one).

