# The testing kit

Layer: engine. Built 1 Nov 2026, the first job in the studio plan (`docs/studio-plan.md` in `me565/core-skills`): the AI replays every level by script, so that a change to one level, or to the engine, can never quietly break another.

**The rule: every level has a play script, and a level is not built until its script passes.** Gate C ("it plays right") is not signed until `node tools/kit/run.js <stage>` says PASS for that stage.

## The three pieces

| File | Layer | What it does |
| --- | --- | --- |
| `tools/kit/kit.js` | engine | The one verdict every play script ends with. A stage passes only if its end card was drawn, the stage counts as done, the script's own checks found nothing, and the page threw no error. Prints `KIT PASS <stage>` or `KIT FAIL <stage>: <why>`. |
| `tools/kit/run.js` | engine | Plays every stage (or the ones named) and prints one line each. Fails if any stage in `next/landscape/stages/` has no play script. |
| `tools/kit/save-check.js` | engine | The save rule: a save from the previous release must load and play. |
| `tools/play-*.js` | game | One play script per stage. Each starts with `/* Layer: game. Play script for stage <key> ... */`, which is how the runner finds it. |

## Commands

With Playwright reachable (in a cloud session, `NODE_PATH=$(npm root -g)`). Both start the local server on 8765 if it is not already up.

```
node tools/kit/run.js                 # every stage
node tools/kit/run.js eval2 park      # just these
node tools/kit/save-check.js          # saves from the last release, loaded into this build
node tools/kit/save-check.js capture  # keep this build's saves (run on main right after a release)
```

Logs and screenshots go to `tools/kit/out/` (not in git).

## A new level

1. Copy the closest play script to `tools/play-<x>.js` and change its label line to the new stage key.
2. Make it play the level the way the walkthrough does, and end with `await kit.finish(p, b, {errors, failed});`, with `await kit.watch(p);` before its `p.goto`.
3. `node tools/kit/run.js <stage>` until it says PASS. Only then is Gate C asked for.

## Saves

`tools/kit/saves/<build>/` holds two saves per stage, the middle of the level and the end, taken by `capture` while the scripts play. The check picks the newest folder older than the current `BUILD`, opens the game with no address tricks, presses Continue on the title screen, and checks the game comes back in the same stage, room and inventory, then turns and taps without an error. If a change to the save's shape breaks it, the release stops until `migrate()` in the engine converts the old save.

What it does not do yet: replay the rest of a level from a loaded save to its ending. The mid-level save proves the game resumes and responds; finishing from there is a later step.

The first saves, `2026-10-30r`, were taken from the build live on 1 Nov 2026. After each release, run `capture` on main so the next release has something to check against.

## Before a release

`node tools/kit/run.js` and `node tools/kit/save-check.js` both pass, alongside `node tools/audit.js`. A failure stops the release.
