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


## The model sweep, scored (21 Oct 2026, 33 models, Classroom 5H back wall, no reference, run on the GitHub runner)

Total billed $1.91. Results and scores in `results/2026-10-21-wall-c4-models.*.json`; the page is the artifact "Classroom Wall Model Sweep". Soft score is out of 14. Passes first.

| Picture | Hard rules | Soft | Billed | s | Size | Notes |
|---|---|---|---|---|---|---|
| gpt-image-2.5-sunburst | all pass | 13 | $0.017 | 21.8 | 1536×864 | Clock right, days and icons right, rules poster without words, no arrows, clean box. Best of the sweep on the rules, at $0.017. Native size 1536×864 only. |
| gpt-5.4-image-2 | all pass | 13 | $0.018 | 20.9 | 1536×864 | Clock right (about 2:43), days and icons right, rules poster without words, no arrows. Same picture family as Sunburst. 1536×864 only. |
| riverflow-v2.5-pro | all pass | 13 | $0.264 | 91.6 | 2560×1440 | Clock right, days and icons right, rules without words, box right, warm paper texture. Dearest and slowest of the passes: $0.26, 92 s. |
| grok-imagine-image-2.0 | all pass | 11 | $0.080 | 94.5 | 2816×1584 | Clock right, icons right, rules poster blank, no arrows. No day labels (not asked for). Softer palette, pale. 94 s. |
| qwen-image-3-pro | H3 borderline (grid half-filled) | 11 | $0.075 | 81.8 | 2048×1152 | Clock right, rules blank, box clean and sparse. Grid has one row of icons and the days split oddly. 82 s. |
| seedream-5-0-lite | H3 borderline (books on top of the shelf, grid random) | 8 | $0.035 | 61.2 | 2560×1440 | Clock right, rules blank, no arrows. Pale and under-drawn; the shelf is empty with the books on top. |
| gpt-image-2 | H2 fail: five invented rules lines | 13 | $0.035 | 27.9 | 1536×864 | Clock right, days and icons right, no arrows. One edit from usable. |
| seedream-5-0-pro | H2 fail: rules poster has four invented lines, a name plate reading Liam on the desk | 13 | $0.045 | 69.8 | 2048×1152 | The best drawing of the day otherwise: clock right, every day name right, six icons in every row, clean box, warm paper texture. Two lettering edits from usable. |
| gemini-3.1-flash-image | H4 fail: clock reads about 2:17 | 13 | $0.101 | 17.6 | 2752×1536 | Nano Banana 2. Days and icons right, rules poster without words, no arrows, cleanest flat style of all and the closest to the live walls. One edit (the clock) from usable, and the game could draw the clock. 18 s. |
| gpt-image-2.5-flare | H2 fail: four numbered rules lines | 12 | $0.017 | 16.4 | 1536×864 | Clock right, days right, icons shuffled per row. One edit from usable. |
| qwen-image-3 | H3 fail: grid is three columns with six icons scattered | 11 | $0.030 | 79.5 | 2048×1152 | Clock right, rules blank, very sparse and clean. 80 s. |
| gemini-3-pro-image | H5 fail (framed box on a dark ground), H2 fail (garbled rules text), H4 fail (clock about 2:20) | 11 | $0.135 | 36.6 | 2752×1536 | Nano Banana Pro, the benchmark model. Bookshelf became a display rack. Three edits from usable; the frame is the one that repeats. |
| seedream-5-0-flash | H1 fail (turn arrows drawn), H2 fail (rows numbered 1, 3, 4, 5) | 9 | $0.018 | 19.7 | 2048×1152 | Clock right. Arrows again, as in the first run. |
| qwen-image-2.1-turbo | H6 fail (no box), H3 (extra plant), H4 (clock about 2:30) | 9 | $0.018 | 25.4 | 2048×1152 | Clean ink style; wrong room shape. |
| gemini-3.1-flash-lite-image | H4 fail (12:00), H3 (no day labels, grid half empty) | 9 | $0.034 | 3.5 | 1376×768 | Nano Banana 2 Lite, 1K only. Fast (3.5 s) and cheap; rough. |
| qwen-image-2.1-pro | H6 fail (flat wall, no box), H3 (bins on the shelf, no envelope) | 9 | $0.046 | 33.3 | 2048×1152 | Clock right, days right. Painterly, not flat. |
| flux-3-image | H2 fail (day labels garbled: Tuee, Tuey), H4 fail (12:02) | 9 | $0.100 | 47.8 | 2736×1536 | Objects present, flat style fair. Lettering is its weakness. |
| mai-image-2.6-flash | H3 fail (window, plant), H2 (rules text, titles on the books) | 8 | $0.020 | 10.3 | 1360×768 | Clock about 2:05. |
| seedream-4.5 | H4 fail (2:00), H2 fail (Day, Day, Day labels) | 8 | $0.040 | 15.8 | 2560×1440 | Watercolour feel; superseded by 5.0. |
| mai-image-2.6 | H3 fail (window and plant added), H2 (rules text, FOR 5H note) | 8 | $0.041 | 24.7 | 1360×768 | Clock about 2:10. Adds what was not asked. |
| flux-3-image-klein | H2 fail (garbled words everywhere), H4 fail (2:00) | 7 | $0.014 | 14.2 | 2736×1536 | Cheapest FLUX; lettering nonsense. |
| krea-2-medium-turbo | H4 fail (12:00), H3 (grid half empty) | 7 | $0.015 | 8.7 | 1376×768 | 1K only, 9 s. |
| krea-2-medium | H4 fail (2:00), H2 (tiny garbled grid labels) | 7 | $0.030 | 10.6 | 1376×768 | 1K only. |
| krea-2-large | H1 fail (arrows), H4 fail (6:00) | 7 | $0.060 | 27.1 | 1376×768 | Soft children's-book look; 1K only. |
| mai-image-2.5-pro | H4 fail (12:00), H3 (extra plant, grid random) | 7 | $0.113 | 34.5 | 1360×768 | Pleasant palette; ignores the grid. |
| mai-image-2.5 | H4 fail (12:00), H3 (grid 3×4 random) | 6 | $0.050 | 28.9 | 1360×768 | Washed out. |
| riverflow-v2.5-fast | H4 fail (12:00), H2 (garbled rules text), H6 (no box) | 6 | $0.073 | 111.3 | 2048×1152 | Cut off at the edges. |
| flux.2-max | H3 fail: no furniture at all | 6 | $0.100 | 40.1 | 1824×1024 | Posters and clock on an empty wall. |
| recraft-v4.1 | H4 fail (12:00), H2 (grid random) | 5 | $0.035 | 7.3 | 1344×768 | Pencil-hatched sketch, not the game's style. |
| flux.2-pro | H3 fail (rows of desks, none of the listed furniture), H2 (Soday, Firday), H4 | 5 | $0.045 | 19.7 | 1824×1024 | Drew a different classroom. |
| recraft-v4.1-pro | H1 fail (arrows), H2, H4 (9:00) | 4 | $0.210 | 9.4 | 2688×1536 | From the first run: handsome, wrong style, dearest. |
| gemini-nano-banana-2.1 | did not run: the provider returned a quota error (429) | 0 |  | 16.2 |  | Retry later; Google-side limit, not ours. |
| gpt-image-1-mini | did not run: this model takes no aspect ratio or count field | 0 |  | 0.1 |  | Older model; drop from the manifest. |

What the sweep says:

- **Seven models passed every hard rule or came within one borderline call**: GPT Image 2.5 Sunburst, GPT-5.4 Image 2, Riverflow 2.5 Pro, Grok Imagine 2.0, Qwen Image 3 Pro, Seedream 5.0 Lite. Seedream 5.0 Pro, GPT Image 2, GPT Image 2.5 Flare and Nano Banana 2 each failed on one thing a single edit fixes.
- **The clock is the great divider.** Thirteen of thirty-one drew twelve o'clock or two o'clock when asked for twenty to three. The playbook's rule stands: anything the puzzle reads is drawn by the game, not the model (H4 can then be dropped from the prompt and the wall asked for a blank clock face).
- **Invented lettering is the second.** Rules posters grew words in nine pictures. Asking for "a poster headed RULES with blank lines" is not enough for most models; "with no words on it" or a poster that is a cut-out drawn by the game is safer.
- **The turn-arrows sentence drew arrows in four pictures** (Recraft, Krea Large, Seedream Flash twice). The prompts-file lesson is confirmed across makers; the config run tests the wording without it.
- **Style:** the OpenAI family, Riverflow Pro and Seedream Pro share a warm textured-paper flat look that is close to the live walls; Nano Banana 2 is the flattest and cleanest; Recraft, Krea, FLUX and Qwen 2.1 are different artists.
- **Price and size:** the OpenAI models cost two to four cents but draw only 1536×864, below the shipped 1920×1080; Seedream Pro at 2048×1152 and Nano Banana 2 at 2752×1536 are both under eight cents. Riverflow Pro is the dearest pass at twenty-six cents.
