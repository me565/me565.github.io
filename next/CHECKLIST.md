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

## B. Every cut-out (a thing placed on a wall)

9. **Proportions.** The box keeps the picture's own proportions: h = w × pictureH / pictureW × 16/9. A squashed or stretched cut-out fails (audit checks this).
10. **Standing on a surface.** A thing on the floor stands below the skirting line, never on it (the trolley, log 40). A thing on a seat sits back from the front edge with the seat visible in front of it (the hamster, log 40). A thing on a shelf or table stands on the surface, not on its front edge. Every one of these has a contact shadow (`shadow`), so nothing floats (logs 6, 40).
11. **Inside something.** A thing in a box or cupboard sits behind the box's own front, which is cut from the wall and drawn over it; tops show above the rim, bottoms are hidden (logs 8, 9, 37).
12. **Hanging.** Anything hanging hangs from something drawn: a hook, a peg, a staple through a padlock's shackle. A lock glued to a door fails (log 37).
13. **Behind glass.** Clipped to the glass, toned down, the glass painted over it in every frame (logs 5, 7, 8).
14. **Light.** The room's light on a cut-out is blurred broad light only, never the lines behind it; a thing that looks see-through fails (the coat, the bin lid, the hat, logs 12, 13, 37).
15. **Physical sense.** A coat hung by its loop shows its back; a hood and buttons both facing out is impossible (log 7). A plant bends, its pot never does (log 5). Only the part that would really move moves.
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
25. **Liquids land where they should**: water from the spout into the basin, not above it (logs 12, 37).
26. **Living background** only where a real thing would move, slow and small, one or two per view, at rest under reduced motion, never the sole carrier of a clue (log 31).
27. **Openables open and close**, before and after their contents are taken, and stay as left (log 30). Doorways between rooms are exempt.
28. **Never leave a blank.** A movement that fails part-way leaves the thing at rest; a picture is never read outside its edges; a pixel read is wrapped, because some hosts forbid it (the globe, logs 36–37).

## E. Every close-up and gesture

29. Tap outside to step back; nothing scrolls inside; the picture is crisper than the room behind (log 11).
30. A thing worked by hand asks for the real movement, beside the room with the room left sharp; a plain look stays a tap (playbook 4j, log 27). A wrong move waits, never fails.
31. Every stage opens with one gesture and a comic; the switch between children never replays them (4j, 4n, 4l).
32. Tap targets are finger-sized, never under the turn arrows (the strips halfway up each side in the landscape engine), never covered by a bigger target unless the bigger one is listed first (audit checks size and the arrow strips). Hotspot ids are unique across every stage (audit checks).

## F. Words and voice

33. Two typefaces at most (log 14). The child's reading level: Zaina reads nothing, hears everything.
34. Every story-led line has a voice key, and the line is recorded before the build is called finished; a changed line is re-recorded (audit lists unrecorded keys).
35. Lines in the child's words; the postcard in the child's voice; the moth never names itself.

## G. Devices and delivery

36. **Check at the owner's screen shape**: 2000×700 (a phone-shaped tablet with the browser's bar), plus 740×360 and 2200×1300, and once with reduced motion on. A fix is not done until it is seen close up at that shape (log 38).
37. No page scroll at any size; the whole game fits; portrait asks to turn.
38. Every picture preloads; nothing pops in late; a fresh link never resumes another build's progress (log 9).
39. Sound starts on a real tap and works after the first; music never "random noise" (logs 3, 4, 10).
40. Bump `BUILD` (and the stage script tags), run every stage's play script, then commit, push, republish the artifact and give a link pinned to the commit. Never make the owner ask for it.
41. When the owner reports a fault: reproduce it at his screen shape, confirm in words that the same thing is seen, fix the cause not the symptom, and add the rule here.
