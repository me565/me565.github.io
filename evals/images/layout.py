#!/usr/bin/env python3
"""Draw a greybox layout sketch (no words on it, only the list numbers, so no model can copy a label) for each wall of a room specification (evals/images/rooms/<room>.json):
plain labelled boxes where each thing stands, the shallow box, the mint band line, and on each side wall the
name of the neighbouring wall's near end. The sketch is given to the image model as a reference for positions.
    python3 evals/images/layout.py evals/images/rooms/classroom5h.json evals/images/rooms/classroom5h
"""
import json, os, sys
from PIL import Image, ImageDraw, ImageFont
room = json.load(open(sys.argv[1])); out = sys.argv[2]; os.makedirs(out, exist_ok=True)
W, H = 1376, 774; SIDE = int(W * .12); CEIL = int(H * .08); FLOOR = int(H * .80); BAND = .42
order = room["order"]; walls = room["walls"]
def font(s):
    for p in ("/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf", "/usr/share/fonts/truetype/liberation/LiberationSans-Bold.ttf"):
        if os.path.exists(p): return ImageFont.truetype(p, s)
    return ImageFont.load_default()
F, Fs = font(26), font(20)
def ends(key):
    i = order.index(key); left = order[(i - 1) % 4]; right = order[(i + 1) % 4]
    # facing this wall, the left side wall is the previous wall in turning order; its stretch next to this wall is that wall's RIGHT end
    lo = sorted(walls[left]["objects"], key=lambda o: o["l"] + o["w"])[-1]; ro = sorted(walls[right]["objects"], key=lambda o: o["l"])[0]
    return (left, lo), (right, ro)
for key in order:
    w = walls[key]; im = Image.new("RGB", (W, H), "white"); d = ImageDraw.Draw(im)
    # the box
    d.polygon([(0, 0), (SIDE, CEIL), (SIDE, FLOOR), (0, H)], outline="black", fill="#f0f0f0")
    d.polygon([(W, 0), (W - SIDE, CEIL), (W - SIDE, FLOOR), (W, H)], outline="black", fill="#f0f0f0")
    d.polygon([(0, 0), (W, 0), (W - SIDE, CEIL), (SIDE, CEIL)], outline="black", fill="#fafafa")
    d.polygon([(0, H), (SIDE, FLOOR), (W - SIDE, FLOOR), (W, H)], outline="black", fill="#e4e4e4")
    d.rectangle([SIDE, CEIL, W - SIDE, FLOOR], outline="black", width=3, fill="white")
    by = FLOOR - int((FLOOR - CEIL) * BAND); d.line([(SIDE, by), (W - SIDE, by)], fill="#9bb", width=3)
    for o in w["objects"]:
        x0 = SIDE + (W - 2 * SIDE) * o["l"] / 100; x1 = x0 + (W - 2 * SIDE) * o["w"] / 100
        y0 = CEIL + (FLOOR - CEIL) * o["t"] / 100; y1 = y0 + (FLOOR - CEIL) * o["h"] / 100
        if o["on"] == "floor": y1 = FLOOR + (H - FLOOR) * .25
        d.rectangle([x0, y0, x1, y1], outline="black", width=3, fill="#cfcfcf")
        d.text((x0 + 12, y0 + 8), str(w["objects"].index(o) + 1), fill="black", font=font(44))
    (ln, lo), (rn, ro) = ends(key)
    # a small grey block on each side wall where the neighbour's end shows, no words
    d.rectangle([8, int(H*.38), SIDE - 14, FLOOR - 20], outline="black", width=2, fill="#d8d8d8")
    d.rectangle([W - SIDE + 14, int(H*.38), W - 8, FLOOR - 20], outline="black", width=2, fill="#d8d8d8")
    im.save(os.path.join(out, f"layout-{key}.png"))
    print("layout-%s.png: left side = end of %s (%s), right side = end of %s (%s)" % (key, lo["label"], ln, ro["label"], rn))
