# Image-model evaluation criteria

How a generated wall is judged, whatever model or setting made it. Every line here is a rule the owner has already set (in `next/PLAYBOOK.md`, `next/CHECKLIST.md` or the lessons in `next/art/classroom/PROMPTS.md`), turned into a check that one picture either passes or fails. Judge on the tablet at the owner's screen shape (checklist 36), close up, never as a thumbnail.

## How to score

Walk the hard rules first. **One hard failure and the picture is unusable as it stands**; count how many edits it would take to rescue it, because an edit costs as much as a wall. Then score the soft lines 0, 1 or 2. A model's score for a run is: hard failures per picture (lower is better), soft points (higher is better), then cost and time. Fill the sheet at the bottom for every picture.

## Hard rules (pass or fail)

| # | Check | Where the rule comes from |
|---|---|---|
| H1 | **No arrows, chevrons, buttons, boxes, panels or placeholder shapes anywhere**, and the middle of both side edges is bare wall. | Playbook section 1; prompts file lesson ("don't mention the turn arrows at all: the model draws them"). |
| H2 | **Lettering only where the prompt asks, spelled exactly as asked** (RULES, 5H TIMETABLE, MON to FRI). No other words, letters or word-shaped scribbles anywhere, and nothing repeated (two WEDs is a fail). | Playbook 1 ("text in generated art is unreliable"), comic lessons (GOODBYE on the balloons). |
| H3 | **Every listed object is present, once, in the place described**, and nothing that was not listed (no extra posters, plants, clutter, people, characters). An object asked to be empty or bare is empty or bare. | Playbook 1 ("sparse and purposeful"); prompts lesson "ask for the places of moving things to be empty". |
| H4 | **A state the puzzle reads is right**: the clock shows the time asked, a dial shows the setting asked, a count is the count asked. | The Classroom 5H clock has shown twenty to four instead of twenty to three since September. |
| H5 | **One picture filling the whole 16:9 frame**: not a picture of a picture, not a framed box on a dark ground, not two panels, no border or gutter. | Prompts lessons: "drew the room as a small picture in a dark frame", "split one page into two frames". |
| H6 | **The room shape asked for**: today a shallow box with narrow side walls, a thin ceiling strip and a low floor band from edge to edge (or, once backlog 19 lands, a flat wall with no box). Not a flat wall when a box was asked, not a deep corridor, not a view from above. | Prompts lesson "or it flattens the wall"; playbook backlog 19. |
| H7 | **Child-safe and legally safe**: nothing a child should not copy (matches, knives, fire, climbing, water), no real brand, logo, airline, flag or school name, no face that could be a real person, nothing frightening. | CLAUDE.md working rules; STORY.md "Fiction and legal safety". |

## Soft lines (0 = no, 1 = partly, 2 = yes)

| # | Check |
|---|---|
| S1 | **Style match**: flat colour fills with thin, even dark-ink outlines, very little shading, faint paper texture, soft vignette. Not painterly, not 3D, not watercolour, not photographic, not pencil hatching. Would it sit beside the 52 walls already in the game without looking like a different artist? |
| S2 | **Palette**: cream and pale mint walls, pale wood, teal and purple accents, warm afternoon light, as the prompt says. |
| S3 | **Things sit on surfaces**: nothing floats, every standing thing touches what it stands on, with a believable contact shadow (playbook 1, checklist B10). |
| S4 | **Cut-out friendliness**: moving things (hamster, backpack, envelope) are cleanly separable with wall behind them, not overlapped by other objects. |
| S5 | **Lettering quality** where lettering was asked: upright, even, legible at the tablet's size. |
| S6 | **Fine detail holds up** at the owner's screen shape: icons in the grid are recognisable, outlines are crisp, no mush or smear. (This is the line the resolution test is about.) |
| S7 | **Restraint**: generous empty wall between the objects, no decoration the prompt did not ask for, even when it would not count as a hard H3 fail (a pattern on a rug, a second cushion). |

## Also recorded, not scored

- **Cost** as OpenRouter billed it (`cost_usd` in results.json), not the list price.
- **Seconds** from request to picture.
- **Edits needed** to rescue a hard failure (0 means usable as is).
- **Pixel size** returned, and whether the model took the resolution asked.

## Sheet

One row per picture. Copy into the run's notes (`evals/images/runs/<run>.notes.md`) or the level file.

| Picture | H1 | H2 | H3 | H4 | H5 | H6 | H7 | S1 | S2 | S3 | S4 | S5 | S6 | S7 | Edits | $ | s | Verdict |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| | | | | | | | | | | | | | | | | | | |

## The first run, scored (21 Oct 2026, Classroom 5H back wall, no reference)

| Picture | H1 | H2 | H3 | H4 | H5 | H6 | H7 | S1 | S2 | S3 | S4 | S5 | S6 | S7 | Edits | $ | s | Verdict |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Benchmark, Nano Banana Pro, Sept | pass | pass | pass | **fail** (clock 2:40 asked, ~3:40 drawn) | pass | pass | pass | 2 | 2 | 2 | 2 | 2 | 2 | 2 | 1 | 0.13 | | live, with the wrong clock |
| Nano Banana Pro, fresh | pass | pass | pass | pass | **fail** (framed box on dark ground) | pass | pass | 2 | 2 | 2 | 2 | 2 | 2 | 2 | 1 (crop) | 0.14 | 28 | best drawing; needs the crop |
| Recraft V4.1 Pro | **fail** (arrows) | **fail** (no days, jumble) | **fail** (rules poster empty) | **fail** (9:00) | pass | fail (no mint band, no vignette) | pass | 0 | 1 | 1 | 1 | 1 | 1 | 2 | 4+ | 0.21 | 9 | not this style |
| Seedream 5.0 Flash, 1K | **fail** (arrows) | **fail** (WED twice, poster pictures) | pass | pass | pass | pass | pass | 1 | 2 | 2 | 2 | 1 | 1 | 1 | 2 | 0.018 | 20 | promising at the price; try Pro at 2K |
