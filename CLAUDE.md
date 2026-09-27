# The Moth House

An eerie, surreal point-and-click escape-room game in the spirit of Rusty Lake and Dark Dome. All characters, art and story are original — never borrow names, characters or imagery from Rusty Lake, Dark Dome or any other game.

The owner is a non-technical but AI-savvy builder working from a Chromebook. Explain what you are about to do in plain language, and keep him in the loop before anything goes live.

## How it is hosted and shipped

- Hosted on GitHub Pages at https://me565.github.io (this repo, `me565.github.io`, branch `main`, root folder).
- Shipped to Android as a Trusted Web Activity built with PWABuilder. The Android app simply loads this website, so **anything merged to `main` is live to every player within minutes**.
- Android package ID: `io.github.me565.mothhouse` — permanent, never change it.

## Working rules

- Never commit directly to `main`. Work on a branch, share a preview or test steps, and merge only after the owner has tested and said yes.
- Never commit the Android signing keystore, its passwords or `signing-key-info.txt`. This repo is public.
- Never delete or rename `manifest.webmanifest`, `sw.js`, the icons, or anything in `.well-known/` — the Android app depends on them.
- Keep `manifest.webmanifest` `id`, `start_url` and `scope` as `./`.
- The game must stay playable on a phone in portrait: tap targets large enough for fingers, no hover-only interactions.
- Respect `prefers-reduced-motion`.

## Files

- `index.html` — the whole game (HTML, CSS, JS inline). Scene is one inline SVG, viewBox 0 0 360 480.
- `manifest.webmanifest` — app name, colours, icons.
- `sw.js` — network-first service worker: players get the latest version when online; the last version still works offline. Keep this behaviour.
- `icon-192.png`, `icon-512.png` — moth icon (also used as maskable).

## Current game (version 1: one room)

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

- Muted, uncanny, flat illustration. Olive moth-pattern wallpaper (#4b5037), dark wood (#4a352a, #3a2f28), brass (#a8844a), dusty rose rug (#5e3434), bone (#d9ccb0), candle glow (#f2c16b).
- Typeface: IM Fell English (Google Fonts) with Georgia fallback. Sentence case, short, dry, unsettling copy.
- Darkness overlay before the lamp is lit; warm radial glow after.

## Launch status (as of 27 Sept 2026)

1. Google Play developer account (personal) — opened, awaiting verification.
2. Website live at https://me565.github.io — done.
3. PWABuilder Android package — in progress.
4. Upload `assetlinks.json` to `.well-known/assetlinks.json` (needs an empty `.nojekyll` file at the repo root so GitHub Pages serves the folder), later add Google Play's app-signing SHA-256 fingerprint to it.
5. Closed test: 12+ testers opted in for 14 continuous days (aim for 14–15 in case some drop out), then apply for production access.
6. Store listing: icon, feature graphic, screenshots, descriptions, privacy policy page, content rating, data safety form.

## What's next for the game

The owner has finished every Rusty Lake and Dark Dome game, so version 1's puzzles are too easy for him. Priorities:
- Harder, more layered puzzles (multi-step, cross-room clues, observation and deduction).
- More rooms (target 3–5 before public launch), keeping the one-file simplicity only as long as it stays manageable.
- Optional atmosphere: sound (ticking, wingbeats), only after a tap so browsers allow it.
- Save progress between sessions (localStorage is fine here).
- Longer term: a short series with a recurring house or character.
