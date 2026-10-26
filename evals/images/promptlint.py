"""Lint a manifest's prompts before any credit is spent (the owner's fifth review of eval2, MOTH-117 and MOTH-135):
    python3 evals/images/promptlint.py evals/images/runs/<manifest>.json
run.py runs it first and stops on a finding. Two faults it catches, both made in prompts before:
- a viewpoint the player never has: "seen from directly above" drew the tape as a flat disc that was then squashed to fake a desk,
  and the hat, the bath and the tub as if looked down on. A thing is drawn as the child sees it where it shows (from the front and a
  little above, its thickness clear), unless she really looks down into it (an open case, a drawer, a box on a low shelf).
- a vague set: "a few children's clothes" in the room and again in the close-up gave seven garments in one and four different ones in
  the other. Anything seen in more than one picture is named thing by thing, in order, the same words in every prompt.
- an open door with no hinge side: Lock Up Day's comic drew 5H's door hanging from its right jamb, where the level's door hinges on the
  left (MOTH-157; the same fault as MOTH-106 and MOTH-112 on eval2's walls). A prompt that shows a door open says which side it hinges
  on, the side the level's own door uses, and which way it swings.
A case that means it says so with "lint_ok": "<why>" (for example a close-up looking down into a drawer)."""
import json, re, sys

RULES = [
    (r"\b(from|seen from) directly above\b|\btop[- ]down\b|\bbird'?s[- ]eye\b|\bseen from above\b",
     'viewpoint: draw it as the child sees it where it shows (front and a little above, thickness clear), or say why with "lint_ok"'),
    (r"\b(a few|some|several|various|assorted)\s+(of\s+)?(children'?s\s+|kids'?\s+|girl'?s\s+)?(clothes|toys|things|books|items|objects|garments)\b",
     'vague set: name each thing in order, with the same words in every prompt that shows it'),
]

def lint(manifest):
    found = []
    for c in manifest.get("cases", []):
        if c.get("lint_ok"): continue
        text = (manifest.get("prompt_prefix", "") + " " + c.get("prompt", "")).lower()
        for pat, why in RULES:
            m = re.search(pat, text)
            if m: found.append((c.get("id"), m.group(0), why))
        m = re.search(r"\bdoors?\b[^.;]{0,80}\b(open|ajar|swings?)\b|\b(open|ajar)\b[^.;]{0,40}\bdoors?\b", text)
        if m and "hinge" not in text:
            found.append((c.get("id"), m.group(0), 'open door: say which side it hinges on (the side the level\'s own door uses) and which way it swings'))
    return found

if __name__ == "__main__":
    bad = lint(json.load(open(sys.argv[1])))
    for cid, hit, why in bad: print(f"{cid}: \"{hit}\": {why}")
    print("promptlint:", "clean" if not bad else f"{len(bad)} finding(s)")
    sys.exit(1 if bad else 0)
