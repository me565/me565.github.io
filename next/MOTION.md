# Micro-animation: the plan (owner, 21 Oct 2026)

How The Moth House gets the small, constant movement that Rusty Lake and Dark Dome games have (Servant of the Lake, Hidden Memories), and how every future game does the same. Written from a chat with the owner on 21 Oct 2026, after a read of this repo at commit `a0b4091`.

**For Claude Code: how to apply this file.** Read it all first. Then:

1. Add section **4aa** below to `next/PLAYBOOK.md`, after 4z.
2. Add the **motion sheet** (section 3b below) to `levels/LEVEL-TEMPLATE.md`, between "3. Puzzle chart" and "Gate B", and add "motion sheet done" to Gate B's `Checked:` line.
3. Add the **"Moves?" column** to the Gate D asset table in `levels/LEVEL-TEMPLATE.md`.
4. Add checklist lines **50 to 53** to `next/CHECKLIST.md`, under "D. Every movement".
5. Add backlog items **20 to 23** to section 8 of `next/PLAYBOOK.md`. They change the engine, which is frozen while a level is between Gate A and release, so they are **built between levels**, never inside one. School v3 (`school3`) is mid-gates: it takes the motion sheet only from its next gate onward, and gets no new movements until it is released.
6. Add this file to the file list in `CLAUDE.md`.
7. Tell the owner, in plain words, what changed, and ask before building any backlog item.

Nothing here spends API credit by itself. The gate rules in `CLAUDE.md` still hold.

*Applied on 21 Oct 2026: steps 1 to 6 are done (playbook 4aa and backlog 20 to 23, the template's motion sheet and "Moves?" column, checklist 50 to 53, this file listed in `CLAUDE.md`). This file stays as the record of why.*

---

## Part 1. The recipe, for any game

Those games are not fully animated. Each room is a still painting, and the life comes from four things:

1. **Small loops that never stop.** A light breathing, a fish drifting, a curtain stirring. One or two per view.
2. **Short movements on a tap.** A drawer slides, a head turns, a lid lifts, in under a second.
3. **A reward moment when a puzzle is solved.** Two or three seconds where several things move in order: the lock springs, the door swings, something inside is revealed, the light changes. Then the room settles into its new state, and stays that way.
4. **Stiff, hinged characters.** People are built from separate parts (head, jaw, arm) that rotate on joints like a paper puppet, not drawn frame by frame. The stiffness is part of the look.

To make that, a game needs four components, and image generation is only the first:

| Component | What it is | Costs credit? |
|---|---|---|
| Still artwork | Walls, objects, people, from the image model | Yes |
| Layered parts | Anything that moves is its own picture with a clear edge, over a wall it is absent from; people are split at their joints | Yes, a little: extra cut-outs |
| Motion layer | Code that moves, bends, swaps or fades the parts, and code-drawn effects (light, dust, rain) | No |
| Triggers and state | Game logic: what starts each movement, what sound plays with it, and the new state saved after it | No |

The decision that matters most is made **before any art exists**: which things move, and therefore which things must be generated separately. Deciding later means regenerating finished walls to cut things out of them, which costs credit and drifts the picture.

AI video models are not used for room movement. Their clips are heavy for a phone, do not loop cleanly, cannot respond to a tap, and drift from the art style. At most, one or two story moments a game, and only if the owner agrees the cost.

---

## Part 2. The Moth House

### What already exists (do not rebuild)

- Every moving thing is a cut-out in `LAYERS`, over a wall it is absent from (playbook 2 and 4).
- `drawLayer` has about twenty tap movements, drawn organically in slices: `bend`, `swing`, `lift`, `hop`, `peek`, `turn`, `flip`, `sniff`, `squirt`, `roll`, `ding`, `plump`, `spin`, `unfold`, `wipe`, `rattle`, `drop`, `topple`, `pour`, `wobble`, `pop`.
- Idle loops: `swim`, `breathe`, `sway`, plus code-drawn `rain` and `steam`, run by `idleTick`, resting under close-ups, the menu and reduced motion.
- Shadows (`shadow`), light falling on cut-outs (`lit`), things behind glass (`glass`, `tone`), the park's dusk and flashing lamp, the dark attic.
- The rules in playbook 4 and checklist section D: organic movement, parts are parts, openables open and close, one or two living things per view.

That covers loops (recipe 1) and single tap movements (recipe 2) well.

### What is missing

1. **Animation is planned too late.** The gates place it at stage 7, "Integrate and polish", after the batch of art is made. Nothing at Gate B or D says which things move, so a thing can be painted into a wall that later needs to move. Fixed by the motion sheet and the "Moves?" column below, with no engine change.
2. **No reward moments.** `animate(h)` plays one movement on one layer group per tap, up to 3.2 seconds. There is no way to chain several movements across different layers in order when a lock opens. Backlog 20.
3. **No hinged people.** People are lifted as one cut-out sheet (`tools/keymag.py`), so they can only move as a whole. A head that turns, a jaw that moves or an arm that points needs parts on joints. Backlog 21.
4. **No pose swaps.** A thing cannot flip between two or three drawings (wings open and closed, an eye open and shut). The moth's portrait does this (`moth.png`, `moth-speak.png`) but layers cannot. Backlog 22.
5. **Few light effects.** Light is the cheapest life in a room and the engine has only the park's lamp and dusk. Backlog 23.

---

## 4aa. Micro-animation, planned from the outline (owner, 21 Oct 2026) — for `next/PLAYBOOK.md`

The game should feel alive the way the Rusty Lake and Dark Dome games do: still rooms, a little constant life, a short movement on every tap, and a reward moment on every solve. Section 4 says how things move; this says when that is decided and what the art must be made as.

- **Movement is decided at Gate B, on the level's motion sheet**, before any art. Every thing that will move, in any way, is listed with when it moves (idle, tap or solve), the movement, and the art it needs. A thing not on the sheet is painted into its wall and never moves. A wall regenerated to cut something out of it is a re-do and goes in the ledger with its reason.
- **Every solve has a reward moment**: two or three seconds where the lock reacts, the thing opens by its own movement, and what was inside shows, with sound. Then the room settles into its new state and stays that way (checklist 27, 32e). Moments are listed on the motion sheet, step by step. Until backlog 20 is built, a moment is one movement on one group.
- **Living things per view stay one or two** (checklist 26). The sheet makes that easy to see: count the idle rows per view.
- **What the art is made as, by movement type:**
  - *Single movement* (bend, swing, lift…): one cut-out, the way section 2 already says.
  - *Hinged parts* (a person's head, jaw or arm; a lid; a jack-in-the-box): generate the whole figure first as a cut-out sheet (4u). Then generate each moving part alone on magenta, using the whole figure as the reference ("only the head and the top of the neck, same size and place, everything else flat magenta"), and the body without that part ("the neck ends in the collar"). Each part keeps a small overlap at its joint so no gap shows when it turns. Note each joint's pivot point in picture percentages on the sheet.
  - *Pose swap* (wings open and closed, an eye blinking): generate pose A, then make pose B as an edit of pose A ("the same picture, only the wings folded"), so nothing else shifts. Two or three poses at most, all the same size.
  - *Code-drawn* (light, glow, dust in a sunbeam, rain, steam): no art at all.
- **Code before credit.** If a movement can be made by code from art that already exists, that is the choice. New art is only made for a movement when code cannot fake it believably.
- **Child-safe life.** Living things are cosy: a hamster breathing, a lamp's glow, bunting stirring, the moth fluttering. No flames, nothing that lunges, nothing that startles (CLAUDE.md working rules). The grown-up layer gets its uncanny touches from strangeness, never fright: a clock running backwards, a painting that is different when you turn back to it.
- **Reduced motion.** Idle loops rest; taps and moments still play, shorter and gentler (section 4).

---

## 3b. Motion sheet — for `levels/LEVEL-TEMPLATE.md`, before Gate B

Paste this block between "3. Puzzle chart" and "Gate B":

```markdown
## 3b. Motion sheet

Every thing in the level that moves, decided before any art is made (playbook 4aa). A thing not listed here is painted into its wall and stays still.

| View | Thing | When (idle / tap / solve) | Movement (engine name, or "new: …") | Art it needs (cut-out / parts + pivots / poses / code-drawn / none) | Sound | Settled state after |
|---|---|---|---|---|---|---|
| | | | | | | |

Reward moments (one per lock that opens), step by step:

| Lock | Step 1 | Step 2 | Step 3 | Settled state |
|---|---|---|---|---|
| | | | | |

- Living things per view (cap: two):
- New movements this level asks for (go to the backlog, built between levels, not in this one):

Checked: every thing that moves is listed · every lock has a reward moment · no view has more than two living things · every part, pose and pivot named
```

And Gate B's line becomes:

```markdown
Checked: map walk-through passed · paper playtest passed · motion sheet done · no puzzle type more than twice · every answer has a visible clue · difficulty matches the brief
```

In the Gate C greybox, moments are played with the grey boxes moving in the right order, so the owner judges the timing before the art exists.

## Gate D column — for `levels/LEVEL-TEMPLATE.md`

The asset table gains a "Moves?" column, filled from the motion sheet:

```markdown
| # | Asset | Type (wall / cut-out / close-up / icon / comic / voice / track) | Moves? (no / single / parts / poses) | Reused from | Prompt or line | Est. credit |
|---|---|---|---|---|---|---|
| | | | | | | |
```

A wall's prompt names everything the sheet says moves as absent from it ("the shelf's end is empty"), per section 2.

---

## Checklist lines — for `next/CHECKLIST.md`, section D

50. **Movement was planned.** Every thing that moves was on the level's motion sheet before its art was made; no wall was regenerated to cut a moving thing out of it (playbook 4aa).
51. **Every solve has a reward moment.** A lock that opens shows the lock reacting, the thing opening by its own movement and what was inside, with sound, in about three seconds, then a settled state that stays (playbook 4aa).
52. **Joints never gap.** A thing in hinged parts shows no seam, gap or doubled edge at its joints, checked in a screenshot at the furthest point of every movement (playbook 4aa).
53. **Poses match.** A pose swap jumps only in the part that changes: same size, place, line and colour in every pose (playbook 4aa).

---

## Backlog items 20 to 23 — for `next/PLAYBOOK.md` section 8

Engine changes, built between levels and then tested across every level. Sizes on the section's WSJF scale (1 under an hour, 3 half a day, 5 a day, 8 several days).

20. **Reward moments** (owner, 21 Oct 2026). A `moment` on a use or solve: a list of steps, each a layer group, a movement, a delay and an optional sound, played in order, then the state change. Moments queue so two never overlap, and a tap during one finishes it early rather than being lost. Reduced motion plays each step short. The stage's play script checks the settled state. Size 3.
21. **Hinged parts** (owner, 21 Oct 2026). A layer with `parts`: each its own picture, with a pivot and a parent, so a head turns on the body and a jaw opens on the head. New movements `nod`, `look` (towards a point), `talk` (the jaw, for a line spoken) and `point` (an arm). An idle `blink` for a part with a closed-eye pose (needs 22). First use: the next person the story moves (checklist 49). Size 5.
22. **Pose swaps** (owner, 21 Oct 2026). A layer with `poses: ['a.png', 'b.png']`, swapped on a tap or on an idle rhythm (`flutter`, `blink`), preloaded with the rest of the view. First use: the moth's wings when it rests on a wall. Size 2.
23. **Light that lives** (owner, 21 Oct 2026). Code-drawn layers: `draw: 'glow'` (a lamp or fairy lights breathing softly), `draw: 'motes'` (dust drifting in a sunbeam) and `draw: 'beam'` (a slow shift of window light). No flames anywhere (child-safe rule). Costs no credit and can be added to finished rooms, one per view where it fits. Size 2.

Suggested order: 23, then 22, then 20, then 21. The cheapest first, and each one makes the next level look more alive without new art.
