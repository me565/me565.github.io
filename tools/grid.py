"""Draw a percentage grid over a picture (or a crop of it) to measure where things are: grid.py picture.jpg out.jpg [x0 x1 y0 y1]
Lines every 1% (labelled every 5%) in the picture's own percentages, the units the stage uses for layers, overlays and hotspots.
Anything the game lays over a picture (a symbol in a window, a cap that presses, a cut-out's box) is measured on this grid and the
measured number written beside it in the stage, never placed by eye (Elliot's lock, MOTH-139: 0.6 left and 2 high)."""
import sys
from PIL import Image, ImageDraw
src, out = sys.argv[1:3]
x0, x1, y0, y1 = (map(float, sys.argv[3:7]) if len(sys.argv) >= 7 else (0, 100, 0, 100))
im = Image.open(src).convert('RGB'); W, H = im.size
c = im.crop((int(W*x0/100), int(H*y0/100), int(W*x1/100), int(H*y1/100)))
k = 1400 / c.width; c = c.resize((1400, round(c.height*k))); d = ImageDraw.Draw(c)
step = 1 if x1 - x0 <= 40 else 5
for p in range(int(x0), int(x1) + 1):
    if p % step: continue
    x = (p - x0)/100*W*k; d.line([(x, 0), (x, c.height)], fill=(0, 200, 0) if p % 5 == 0 else (255, 0, 255), width=1)
    if p % 5 == 0: d.text((x + 2, 2), str(p), fill=(0, 0, 0))
for p in range(int(y0), int(y1) + 1):
    if p % step: continue
    y = (p - y0)/100*H*k; d.line([(0, y), (c.width, y)], fill=(0, 200, 0) if p % 5 == 0 else (255, 0, 255), width=1)
    if p % 5 == 0: d.text((2, y + 2), str(p), fill=(0, 0, 0))
c.save(out, quality=90); print(out, c.size)
