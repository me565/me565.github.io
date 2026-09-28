# The Moth House

A point-and-click adventure for children: a warm, cosy mystery that works as a first taste of modern point-and-click games, while still satisfying grown-up puzzle fans. Players choose one of three storylines, Mary's (10), Elliot's (7) or Zaina's (4). Each follows the same summer, from the last day of school in Singapore, through packing and the flight, to Nana and Jedi's in Enfield, Trent Park and the hidden Moth House, with rooms and puzzles made for that child's age. The three stories meet in a shared finale. All characters, art and story are original — never borrow names, characters or imagery from any other game.

**The story plan lives in `STORY.md`, and the building rules in `next/PLAYBOOK.md`.** Read both before designing or building any room; the playbook holds every rule and every piece of the owner's feedback, and is the standard each room must meet. Build new rooms from it, update it when the owner changes the story, and never fill in its "TO DECIDE" items without asking him.

The owner is a non-technical but AI-savvy builder working from a Chromebook. Explain what you are about to do in plain language, and keep him in the loop before anything goes live.

## How it is hosted and shipped

- Hosted on GitHub Pages at https://me565.github.io (this repo, `me565.github.io`, branch `main`, root folder).
- Shipped to Android as a Trusted Web Activity built with PWABuilder. The Android app simply loads this website, so **anything merged to `main` is live to every player within minutes**.
- Android package ID: `io.github.me565.mothhouse` — permanent, never change it.

## Working rules

- Never commit directly to `main`. Work on a branch, share a preview or test steps, and merge only after the owner has tested and said yes.
- **Always give the owner a fresh play link.** Every reply that builds or changes something playable ends with a githack link pinned to the new commit, in the form `https://rawcdn.githack.com/me565/me565.github.io/<full commit id>/next/landscape/index.html`. A new commit means a new address, so his tablet can never show a cached copy; never reuse a link or give the branch-name form. Bump `BUILD` in the page with each change so the menu's diagnostics line shows which version he is on. Once merged, the address is https://me565.github.io/next/landscape/. Never make him ask for it.
- Never commit the Android signing keystore, its passwords or `signing-key-info.txt`. This repo is public.
- Never delete or rename `manifest.webmanifest`, `sw.js`, the icons, or anything in `.well-known/` — the Android app depends on them.
- Keep `manifest.webmanifest` `id`, `start_url` and `scope` as `./`.
- **The game is played in landscape** (owner's brief, 28 Sept 2026, see "Visual style" in `STORY.md`): scenes are 16:9 with the inventory slots in a strip along the bottom. The current `next/` engine is still portrait (viewBox 360×480) and needs converting; the live game is portrait too. Tap targets large enough for fingers, no hover-only interactions.
- The whole game must always fit the screen, with no vertical or horizontal scrolling, on any phone, tablet or desktop window. If a phone is held in portrait, ask the player to turn it rather than squeezing the scene.
- Respect `prefers-reduced-motion`.
- Child-appropriate: cosy mystery, never frightening. Nothing unsafe to copy (no matches, fire, knives, dangerous climbing, going into water). No failing and no timers; wrong tries get a friendly line.
- Any clue given by sound must also be shown visually.
- Before putting real Trent Park or Enfield history into the game, check the facts and tell the owner what you checked.
- Legal safety: follow "Fiction and legal safety" in `STORY.md`. Use the fictional school names (Knightsbrook International School, Little Waves Kindergarten), never the real ones. No real brands, logos or airline names, and never the Merlion, which is a protected symbol in Singapore. Keep the fiction notice in the game's credits.

## Files

- `index.html` — the whole game (HTML, CSS, JS inline). Scene is one inline SVG, viewBox 0 0 360 480.
- `manifest.webmanifest` — app name, colours, icons.
- `sw.js` — network-first service worker: players get the latest version when online; the last version still works offline. Keep this behaviour.
- `icon-192.png`, `icon-512.png` — moth icon (also used as maskable).
- `next/index.html` — the children's version being built, not yet what players get. It opens on the choose-a-child screen (with the fiction notice under "About this game"). All nine Part 1 stages are playable: Mary, Elliot and Zaina each have last day of school, packing day and the flight. The engine is in this file, with Mary's school and packing stages; the rest live in `next/stages/`. Each stage is one object (for example `STAGE_SCHOOL`, or the `stage` passed to `registerStage`) with its `rooms` (each room's views in turning order), `doors` (door → room and view you arrive at), `start`, `items`, `uses`, `fresh` state, `draw`, `act`, `hints`, `hinter`, optional `hintStyle:'point'` (for Zaina: the moth turns to the target, pulses it and says one short line) and `ending`; the engine handles turning, doors, the inventory, hints and endings. `STORYLINES` lists each child's three stages; saves are per child in localStorage (`mothhouse.next.v1`). Each view is a `<g class="view" id="v-…">` in the one SVG; hotspot `data-id`s must be unique across all stages (school ones start with `s_`, Elliot's `e_`, Zaina's `z_`, the flight's `fl_`). A hotspot with `data-stage="…"` only shows in that stage, which is how the shared flat and cabin carry different children's things. Close-ups are overlays inside `.stage`. Keep hotspots away from the bottom corners, where the turn arrows sit. It doesn't register the service worker. When the owner approves it, it replaces the live game.
- `next/stages/mary-flight.js`, `elliot.js`, `zaina.js` — stage plugins: `registerStage(key, {css, views, closeups, boxes, stage, setup})`. The engine injects `views` into the SVG, `closeups` before `#endUI`, merges `boxes` into `BOXES`, then runs `setup()` after the bookcases are drawn (use it to add hotspots to shared views).
- `next/landscape/index.html` — the landscape engine, first test room: Mary's classroom drawn as the generated pictures in `next/art/classroom/`. A 16:9 scene, small turn arrows halfway up each side, the inventory as ten slots under the scene, close-ups brought forward over the blurred room, a "turn your phone" screen in portrait. Tap targets are picture percentages in `HOTS`; `sound` names the tap effect and `anim` + `layer` name a movement and the cut-out group it moves. Moving things are cut-outs in `LAYERS` (per view: `layer-*.png`, placed in picture percentages, drawn on a canvas each; the wall pictures have them removed). The animator (`drawLayer`) bends, swings, lifts, hops, wobbles or pops a cut-out in slices for a moment. Sounds are made in the browser with Web Audio and start after the first tap; music plays the `TRACK` mp3 (Lyria), with the composed music-box waltz (`TUNE`) as fallback; both switch off from the menu. A layer's `shadow` draws a soft contact shadow under it (anything standing on a surface gets one, so nothing floats); `glass` clips it inside a box and draws the wall's glass faintly over it (Nutmeg in his cage). The timetable on the wall is drawn by `wallTimetable()` from the real grid, so wall and close-up always agree. Every picture is preloaded before the room opens. Cut-out boxes must keep the picture's own proportions (h = w × pictureH/pictureW × 16/9) or the cut-out is squashed. Inventory icons are pictures in `next/art/classroom/item-*.png` (generated on white, background keyed out). Rooms are in `ROOMS` (views in turning order; a long room lists its `long` pairs, two views of one wall that pan instead of turn), walls in `WALLS`, doors in `DOORS` (door hotspot → room and the view you arrive facing, away from the door). All three rooms of Mary's school stage are built: classroom, corridor (lockers, library doors, notice board, classroom doors) and library (a square room: `ln` Science+Music, `le` window and storytime chair, `ls` entrance and desk, `lw` Art, trolley and Stories), with the shelf, trolley, locker and note close-ups, the bonus riddle, and the last-bell ending. `play.js` in the session scratchpad played the whole puzzle by script; keep a script like it for every stage. Saves are keyed by build (`mothhouse.landscape.<BUILD>`).
- `next/art/music/classroom.mp3` — background music made with Google's Lyria through the Gemini key (see the README there). The engine's `TRACK` points at it; the built-in composed tune is the fallback.
- `next/art/school/` — the corridor and library walls (`h1`–`h4`, `ln`/`le`/`ls`/`lw`; doorways you can walk through are drawn open), their cut-outs (`layer-*.png`), the five shelf close-up pictures (`shelf-*.jpg`, with book boxes in `SHELVES[].slots`) and the three slip icons. Mary's locker door is cut from the wall's own lockers and recoloured purple. Prompts in `next/art/classroom/PROMPTS.md`.
- `next/art/classroom/` — the four walls of Mary's classroom as generated pictures (Gemini image model, `gemini-3-pro-image`, 28 Sept 2026): the `landscape-` files follow the owner's brief (16:9, clean and sparse); the earlier portrait ones are kept for comparison. Prompts in `PROMPTS.md`. The key is in the environment as `GEMINI_API_KEY`; the script that made them is described there. Not wired into the game.
- `STORY.md` — the story plan: characters, places, every scene with its puzzle map, rules for every chapter, open decisions.
- `.well-known/assetlinks.json`, `.nojekyll` — Android app verification (see Launch status).

## What is live now (before the rebuild)

The live game is still the original single room, written for adults. It will be replaced by the children's version in `STORY.md`; this section describes the current code until then. Chapter 2 in `STORY.md` lists what changes when this room is rebuilt (matches become a winding handle, the porcelain face becomes a paint pot, Ada becomes the girl in the portrait); the ring lock and the looking-glass clock stay.

Setting: a Victorian parlour. Opening line: you wake with a note pinned to your sleeve — "return what this house has lost".

Puzzle chain:
1. Rug → lift corner → matchbox.
2. Matchbox on oil lamp → room lights up.
3. Bell jar (only once lit) → moth flies to the lamp and circles it anticlockwise ("always backwards, like a clock unwinding"); four shadows appear on the wall in a ring.
4. Wall ring: hand above, eye right, key below, moon left. Drawer lock (4 dials cycling moon/eye/key/feather/hand, checked only when you tap "Pull the drawer") is engraved "Begin with what the moth wears. Then follow it." → start at the eye (the moth's wings have eyes), go anticlockwise like the moth → eye, hand, moon, key → clock hands.
5. Clock hands on clock → it is a looking-glass clock: numerals mirrored (XII reads IIX, IX reads XI, VI reads IV), scratched words backwards, hands turn anticlockwise, hands start at 10:10, long hand moves 5 minutes per tap. Set it to 2:45 (painting plaque: "Ada, who went out at a quarter to three") *as seen in a mirror* — it looks like 9:15 on a normal clock — then tap "Let it run" → hatch opens → porcelain face. Setting a normal-looking 2:45 fails.
6. Face on faceless portrait → Ada opens her mouth → moth key.
7. Moth key on door → ending: the moth goes out into the dark, Ada is home, the portrait has a face again — "It is yours."

Interaction model: tap an object to look; tap an inventory item to select it, then tap where it goes. Wrong item gives "The X does not belong there." Messages appear in the `#msg` line under the scene. Close-ups (drawer lock, clock) are overlays inside `.stage`, with their own feedback line; neither checks the answer until the player commits (Pull the drawer / Let it run), so answers cannot be found by watching for a click.

## Visual style

The children's version follows "Visual style" in `STORY.md` (agreed with the owner on 28 Sept 2026): rooms as perspective boxes drawn by the engine, ink outlines, shading, paper grain, lived-in rooms, breathing glows on tappables, arrows in the bottom corners. In `next/index.html`, a new-style view is `<g class="view" data-box="classroom" data-light="left">` and the engine adds the box; add new rooms to `BOXES`. Every wall built so far (the school and the flat) is in the new style. Bookcases come from `BOOKCASES` and `bookcase()`. The game opens with a skippable animated intro (`#intro`, plays once per device, replay from the home screen) and the home cards carry the children's portraits (`#p-mary`, `#p-elliot`, `#p-zaina`, placeholder colouring until the owner describes the children). The live room (the old game) uses the style below.

- Muted, uncanny, flat illustration. Olive moth-pattern wallpaper (#4b5037), dark wood (#4a352a, #3a2f28), brass (#a8844a), dusty rose rug (#5e3434), bone (#d9ccb0), candle glow (#f2c16b).
- Typeface: IM Fell English (Google Fonts) with Georgia fallback. Sentence case, short, dry, unsettling copy.
- Darkness overlay before the lamp is lit; warm radial glow after.

## Launch status (as of 27 Sept 2026)

1. Google Play developer account (personal) — opened, awaiting verification.
2. Website live at https://me565.github.io — done.
3. PWABuilder Android package — in progress.
4. `.well-known/assetlinks.json` and the empty `.nojekyll` file are in place, with the PWABuilder signing key's SHA-256 fingerprint. Still to do: once the app is on Google Play, add Play's app-signing SHA-256 fingerprint (Play Console → Test and release → App integrity → App signing) as a second entry in `sha256_cert_fingerprints`.
5. Closed test: 12+ testers opted in for 14 continuous days (aim for 14–15 in case some drop out), then apply for production access.
6. Store listing: icon, feature graphic, screenshots, descriptions, privacy policy page, content rating, data safety form.

## What's next for the game

Priorities:
- Part 1, "Leaving Singapore" (see Launch plan in `STORY.md`): built, on the `claude/prologue` branch, awaiting the owner's test and approval before it replaces the live game.
- Agree the new visual style with the owner.
- Part 2, "The Moth House": stages 4 to 6, the finale and the epilogue.
- Still open: the moth's name.
- Keep puzzles layered for grown-ups: branching paths, clues carried between chapters, and one optional hard Night Moth challenge per chapter. The owner has finished every Rusty Lake and Dark Dome game and wants a real challenge there.
- Keep the one-file simplicity only while it stays manageable. With several rooms, splitting into separate files is fine.
- Optional atmosphere: sound (wingbeats, birdsong, rain), only after a tap so browsers allow it.
- Longer term: a series, with more summers at the Moth House.
