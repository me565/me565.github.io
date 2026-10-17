#!/usr/bin/env python3
"""Propose a wall's box for the engine's side walls (playbook 4q): python3 tools/sides.py <wall.jpg> [more.jpg ...]
Finds the long ink lines (the back wall's edges) and the ceiling and floor diagonals where they meet the picture's edge, prints a
`sides` entry in picture percentages, and writes <wall>-quads.png next to the scratch folder with the quads drawn on, to check by eye.
The proposal is a start, not an answer: pick the right lines when a wall has several, and look at the drawing before trusting it."""
import sys, os
from PIL import Image, ImageDraw
import numpy as np

def lines(frac, lo, hi, thr=0.35):
    idx = [i for i in range(int(lo*len(frac)), int(hi*len(frac))) if frac[i] > thr]; out = []
    for i in idx:
        if out and i - out[-1][-1] <= 3: out[-1].append(i)
        else: out.append([i])
    return [(round(100*np.mean(c)/len(frac), 1), round(float(max(frac[c])), 2)) for c in out]

def propose(path):
    im = Image.open(path); g = np.asarray(im.convert('L')).astype(float); H, W = g.shape; dark = g < 90
    col = dark[int(H*.2):int(H*.8), :].mean(0); row = dark[:, int(W*.3):int(W*.7)].mean(1)
    L = lines(col, 0, .35); R = lines(col, .65, 1); T = lines(row, .03, .3); B = lines(row, .7, .97)
    print(path); print('  vertical left :', L); print('  vertical right:', R); print('  horizontal top:', T); print('  horizontal bottom:', B)
    if not (L and R and T and B): print('  (could not find a full box)'); return
    xL = max(L, key=lambda t: t[1])[0]; xR = max(R, key=lambda t: t[1])[0]; yT = T[-1][0]; yB = max(B, key=lambda t: t[1])[0]
    def outer(xpct, ypct, span=14):
        x = int(W*xpct/100); c = g[:, max(0, x-2):x+3].mean(1); y0 = int(H*ypct/100)
        rows = [y for y in range(max(0, y0-int(H*span/100)), min(H-1, y0+int(H*span/100))) if c[y] < 110]
        return round(100*min(rows, key=lambda y: abs(y-y0))/H, 1) if rows else ypct
    l = dict(x=xL, yT=yT, yB=yB, yT0=outer(0.6, yT), yB0=outer(0.6, yB)); r = dict(x=xR, yT=yT, yB=yB, yT0=outer(99.4, yT), yB0=outer(99.4, yB))
    print(f"  sides: {{back:[{xL}, {xR}, {yT}, {yB}], l:{{x:{l['x']}, yT:{l['yT']}, yB:{l['yB']}, yT0:{l['yT0']}, yB0:{l['yB0']}}}, r:{{x:{r['x']}, yT:{r['yT']}, yB:{r['yB']}, yT0:{r['yT0']}, yB0:{r['yB0']}}}}}")
    d = ImageDraw.Draw(im); P = lambda *p: [(W*x/100, H*y/100) for x, y in p]
    d.polygon(P((0, l['yT0']), (xL, yT), (xL, yB), (0, l['yB0'])), outline=(255, 0, 0), width=5)
    d.polygon(P((xR, yT), (100, r['yT0']), (100, r['yB0']), (xR, yB)), outline=(0, 0, 255), width=5)
    d.rectangle([W*xL/100, H*yT/100, W*xR/100, H*yB/100], outline=(0, 160, 0), width=3)
    out = os.path.splitext(os.path.basename(path))[0] + '-quads.png'; im.resize((960, 540)).save(out); print('  drawn:', out)

if __name__ == '__main__':
    if len(sys.argv) < 2: sys.exit(__doc__)
    for p in sys.argv[1:]: propose(p)
