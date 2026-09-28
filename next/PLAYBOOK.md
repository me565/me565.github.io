# The Moth House — room-building playbook

The working rules for every room in the landscape game, distilled from the owner's brief and his feedback on the classroom test (28 Sept 2026). Read this before touching `next/landscape/` or generating any art. `STORY.md` says *what* each room contains; this says *how* it is built and what "good" looks like. Every rule here came from a real problem, so none is optional.

## 1. Layout and screen

- Landscape only. The scene is 16:9; the inventory is a strip of ten slots under it, always visible. Held in portrait on a phone, ask the player to turn it; never squeeze the scene.
- Nothing scrolls, ever: not the page, not a close-up, not the inventory. Every close-up card is sized from the scene's height (the timetable card is 60 units wide so its 230:176 shape fits) and has `overflow:hidden`. Test at phone (844×390), tablet (1180×820) and large (2000×1200) sizes.
- Turn arrows sit halfway up the left and right edges. The room label is top-left, hint (moth) and menu top-right. Keep the middle of each side edge bare in the art.
- The message line is a translucent band at the bottom of the scene; it hides while a close-up is open.
- Close-ups bring the object forward over the room, which is blurred and dimmed, **including the cut-out layers** (blur `#hots`, not just the wall). Tapping anywhere outside the card, or on the dark margin, steps back; there is no × button; a small "Tap anywhere to step back" caption sits under the card.
- A build id (`BUILD`) appears in the menu's diagnostics line with sound state, music state, reduce-motion and screen size. Bump it with every change. Saves are keyed by build, so every build starts fresh; "Start again" is in the menu.

## 2. Art pipeline (Gemini through the key in the environment)

- Walls: `gemini-3-pro-image`, 16:9, 2K, the shared style text in `art/classroom/PROMPTS.md` plus a paragraph naming only the objects the wall needs. Sparse and purposeful: no clutter that is not a puzzle, a hint or a thing a child would poke.
- Consistency: generate one wall alone, then give the others a crop of it (objects cut off) as a style reference, with "copy only its style, not its objects".
- Never mention the arrows or the interface in a prompt (the model draws them). Say "shallow box with narrow side walls, ceiling strip and floor band, like the reference" or it flattens the wall. Never draw boxes, panels or placeholder shapes.
- Anything that will move, be picked up, or change state is **not drawn on the wall**. Describe its place as empty ("the purple locker has no door", "the end of the cabinet is empty") and generate the thing separately as a cut-out. This avoids the edit-and-drift cycle (editing a finished wall shifts everything slightly and every position must be re-measured).
- Cut-outs: 1:1 or 3:4, 1K, "alone on a pure flat white background, same style as the attached crop, no surface, no shadow, no frame, no text". Flood-fill the white away from the edges (so white inside the object survives), crop to content, quantise to 256 colours. Give the model a crop of the object from the wall when one exists.
- Inventory icons are made the same way (on white, keyed out), never small vector drawings.
- Text in generated art is unreliable: keep lettering to short labels (SUPPLIES, 5H, LOST PROPERTY). Anything the puzzle depends on (the timetable grid) is drawn by the game over the picture so it exactly matches its close-up.
- Save walls at 1920×1080 JPEG quality 88; keep the 2K PNG originals out of the repo.

## 3. Placement and measurement

- Positions are picture percentages. Measure them on the final wall with a 5% grid (1% for fiddly things like a box rim), never by eye from a thumbnail.
- A cut-out's box must keep the picture's own proportions: `h = w × (pictureH / pictureW) × 16/9`. A wrong box squashes the cut-out and makes it float (the bin lid, the mug).
- Things that stand on a surface sit exactly on it (the apple on the books, the mug on the desk, the pots on the sill) and get a soft contact shadow (`shadow`). Nothing floats.
- Small tap targets are placed above large ones (the engine sorts by area), so the mug on the desk stays tappable.
- Hotspots may be bigger than the object for fingers, but never so big they steal a neighbour's tap.

## 4. Animation ("physics")

- Every moving thing is its own cut-out with a transparent edge, over a wall it is absent from. **Never shift a rectangle of the background**: it reads as a shaking sticker. This was the single biggest complaint.
- Movement is organic and drawn in slices on a canvas: a plant bends more at the tip than the base (`bend`), a coat swings from its hook with the hem trailing (`swing`), paper lifts and settles (`lift`), things rock on their base (`wobble`), cupboard doors open a crack on their hinges (`peek`), a lid tips (`flip`), things in a box jump up and drop back (`pop`), a small animal breathes and twitches (`sniff`).
- Only the part that would really move moves: a plant bends, its pot never does (split the cut-out at the rim; draw the pot in front). A hamster does not leap about a cage; a subtle sniff is more believable.
- Physical sense must hold: a coat hung by its collar loop shows its back (hood outward, no buttons). A hood on the viewer's side with buttons on the viewer's side is impossible.
- Occlusion is done with real pieces, not clip lines: the front of the lost-property box is cut from the wall picture and drawn over the things inside it, so they are genuinely behind it. A straight clip line looked wrong.
- Things behind glass are clipped to the glass, drawn duller (`tone`), and the wall's glass is painted faintly over them **in every frame of the animation** (the glass must be painted after the drawing origin is reset).
- Light: a cut-out on a lit wall takes the wall's light and shade behind it, as brightness only, laid over it (`lit`), so a sunbeam falls across a coat.
- Most tappable things move; the ones that don't (a whiteboard, a radiator, a window) still make a sound and say a line. A door knob that cannot be cut out cleanly stays still rather than faking it.
- Under reduce-motion, tap feedback still plays, shorter and gentler; only ambient motion (the sparkle) stops.
- Tap animations must never be skipped silently on the owner's device: the tablet reports reduce-motion, and the early version showed nothing at all.

## 5. Sound and music

- Effects are made in the browser (Web Audio) and must be loud enough for a tablet speaker: taps 0.3, knocks 0.4, chimes 0.25. They start on the first real tap.
- Music is a recorded track (`TRACK`), currently made with Google's Lyria model through the same Gemini key (`art/music/README.md`). Random notes are not music; the built-in composed waltz is only a fallback if the file fails.
- A recorded track needs a *completed* tap (`touchend`/`click`), not finger-down, before the browser allows it. If refused, keep nothing and retry on the next tap. Report the state in the menu. This was why the owner heard effects but no music.
- Every sound clue must also be shown.

## 6. Delivery and testing

- Every reply that changes the game ends with a fresh play link pinned to the new commit: `https://rawcdn.githack.com/me565/me565.github.io/<commit>/next/landscape/index.html`. Never reuse a link or the branch form; the tablet caches.
- Before sending: run the headless checks (no page errors; no overflow on any card at three sizes; a simulated touch starts the music; each cut-out at rest and mid-movement looks right in a screenshot; the puzzle path can be played through by script).
- When the owner sends a video, pull frames at 15 fps around each tap and measure the audio track; it shows exactly what moved and whether any sound played.
- The owner's feedback log lives at the end of this file; add to it, never delete from it.

## Feedback log (owner, 28 Sept 2026)

1. Landscape; Dark-Dome-like cleanliness; inventory strip; close-ups over the room; expressive but gentle faces; side arrows.
2. Micro-animations on tap; inventory pictures to the walls' standard; music and sounds.
3. Animations and music "fails": nothing moved (reduce-motion), no sound (finger-down is not a tap).
4. Shaking-overlay animation "looks odd and not realistic"; music "sounds like random noise". → cut-out layers with organic motion; a composed tune, then Lyria.
5. Mug and cupboard stopped animating; plants loaded late; pots must not move; hamster in front of the cage. → more cut-outs, preload, split at the rim, glass overlay.
6. Coat's hood twisted; apple floating; bag and hamster odd; wall timetable differed from close-up. → redraw straight, shadows, sniff, real grid on the wall.
7. Coat hood and buttons both facing out is impossible; hamster bright behind glass. → back view; tone.
8. Box not 3D; hamster loses glass while moving. → open box redrawn; glass after transform reset.
9. Items looked in front of the box; a fresh link resumed old progress. → box front cut-out drawn over them; saves keyed by build.
10. Item sounds fine, no music. → retry on real taps.
11. Tap outside to close; no scrolling in close-ups; box crisper than the blurred room; no sunlight on the coat. → all fixed in build o.
