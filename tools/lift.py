"""Lift what was painted into a wall by comparing it with the wall without it: lift.py base.png painted.png name x0 x1 y0 y1 out.png [--tight]
Prints the cut-out's box in picture percentages. Keeps the largest connected shape inside the window.
--tight keeps the gaps inside the thing (between a stool's legs, inside a handle): no big closing of the mask, so the wall behind never
rides along into the strip (MOTH-116). Use it for anything with holes; the default fills them, which suits solid things.
If the thing touches the window's edge (anywhere but the picture's own edge), the window cut it: the tool says which side and exits 2,
so the window is widened rather than a bobble or a brim shipped cut off (MOTH-137, MOTH-144)."""
import sys
from PIL import Image, ImageChops, ImageFilter
from collections import deque
tight = '--tight' in sys.argv; argv = [a for a in sys.argv if a != '--tight']
base, painted, name, x0, x1, y0, y1, out = argv[1:9]; x0, x1, y0, y1 = map(float, (x0, x1, y0, y1))
a = Image.open(painted).convert('RGB'); b = Image.open(base).convert('RGB'); W, H = a.size
diff = ImageChops.difference(a, b); r, g, bl = diff.split(); d = ImageChops.lighter(ImageChops.lighter(r, g), bl).point(lambda v: 255 if v > 28 else 0)
m = Image.new('L', (W, H), 0); m.paste(d.crop((int(W*x0), int(H*y0), int(W*x1), int(H*y1))), (int(W*x0), int(H*y0)))
m = m.filter(ImageFilter.MaxFilter(3)).filter(ImageFilter.MinFilter(3)) if tight else m.filter(ImageFilter.MaxFilter(7)).filter(ImageFilter.MinFilter(13)).filter(ImageFilter.MaxFilter(13))
sm = m.resize((W//4, H//4)); px = sm.load(); w, h = sm.size; seen = bytearray(w*h); best = None
for y in range(h):
    for x in range(w):
        if px[x, y] and not seen[y*w+x]:
            q = deque([(x, y)]); seen[y*w+x] = 1; pts = []
            while q:
                cx, cy = q.popleft(); pts.append((cx, cy))
                for nx, ny in ((cx-1, cy), (cx+1, cy), (cx, cy-1), (cx, cy+1)):
                    if 0 <= nx < w and 0 <= ny < h and px[nx, ny] and not seen[ny*w+nx]: seen[ny*w+nx] = 1; q.append((nx, ny))
            if best is None or len(pts) > len(best): best = pts
keep = Image.new('L', (w, h), 0); kp = keep.load()
for x, y in best: kp[x, y] = 255
m = ImageChops.multiply(m, keep.resize((W, H), Image.NEAREST).filter(ImageFilter.MaxFilter(9 if not tight else 13)))
bb = m.getbbox(); cut = a.convert('RGBA'); cut.putalpha(m.filter(ImageFilter.GaussianBlur(1.0))); cut = cut.crop(bb)
cut = cut.quantize(256, method=Image.Quantize.FASTOCTREE).convert('RGBA'); cut.save(out)
pos = (round(bb[0]/W*100, 2), round(bb[1]/H*100, 2), round((bb[2]-bb[0])/W*100, 2), round((bb[3]-bb[1])/H*100, 2))
print(name, pos, cut.size)
wx0, wy0, wx1, wy1 = int(W*x0), int(H*y0), int(W*x1), int(H*y1)
cutoff = [side for side, hit in (('left', bb[0] <= wx0 + 1 and wx0 > 0), ('top', bb[1] <= wy0 + 1 and wy0 > 0), ('right', bb[2] >= wx1 - 1 and wx1 < W), ('bottom', bb[3] >= wy1 - 1 and wy1 < H)) if hit]
if cutoff: print('CUT: the thing touches the window at its ' + ', '.join(cutoff) + ': widen the window there (or check it is hidden behind something on purpose)'); sys.exit(2)
chk = b.copy(); chk.paste(cut, (bb[0], bb[1]), cut)
cx0, cy0, cx1, cy1 = int(W*max(0, x0-.05)), int(H*max(0, y0-.05)), int(W*min(1, x1+.05)), int(H*min(1, y1+.05))
chk.crop((cx0, cy0, cx1, cy1)).save(out.replace('.png', '-check.jpg'), quality=85)
