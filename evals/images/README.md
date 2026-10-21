# Image-model evaluations

Tests of image models and their settings before one is chosen for a level's art. Nothing here is part of the game.

**Why a GitHub Action.** The Claude cloud environment's proxy drops any reply that stays silent for thirty seconds, and most image models (Seedream, FLUX, Qwen, Recraft Pro) answer in one piece after longer than that. A GitHub runner has no such limit. So the generations run there, on a runner, and the pictures come back as a workflow artifact that Claude downloads to build a comparison page.

**The key.** The runner reads the repository secret `OPENROUTER_API_KEY` (GitHub: Settings → Secrets and variables → Actions → New repository secret). The key never appears in the repo, in logs (GitHub masks it) or in chat. Give it a weekly credit limit on OpenRouter.

**To run one.** Actions → image-evals → Run workflow → branch, then the manifest path, for example `evals/images/runs/wall-c4-models.json`. Optionally a comma-separated list of case ids to run only those. Claude can start it with the GitHub tools and fetch the artifact when it finishes.

**Files.**
- `run.py`: the runner. One manifest in, pictures and `results.json` out, with what each call billed and how long it took.
- `runs/*.json`: the manifests. Each has a name, a prompt file, defaults, and one case per picture (model, resolution, aspect, seed, references, extra params). `est_usd` is the list price; the real charge lands in results.
- `prompts/*.txt`: the prompt wordings under test. `wall-c4.txt` is the exact prompt the live Classroom 5H back wall was made from.
- `CRITERIA.md`: how every picture is judged, and the scored sheet from each run.
- `page.py`: builds the side-by-side comparison page from a results folder (Claude publishes it as an artifact for the tablet).

**Costs.** A manifest's estimate is the sum of its cases' `est_usd`; the three first manifests are about a dollar each. Every run's real total is in its `results.json` and goes in the level file's ledger when the run is for a level.

**The rule that still applies.** These are whole-game-layer tests, not a level's assets: they do not need a level's gates, but each run is agreed with the owner before it starts, with its estimate, and nothing from a run goes into the game without passing the criteria and the owner's eye on the tablet.
