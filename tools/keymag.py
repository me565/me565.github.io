"""Key a magenta cut-out sheet: keymag.py sheet.png name out.png [base.png]
Everything near #FF00FF becomes see-through; the largest shape is kept, the magenta fringe pulled out of the
edge pixels. Prints the cut-out's box in picture percentages and, with a base wall, writes <out>-check.jpg of it in place."""
import sys
from PIL import Image, ImageDraw, ImageFilter, ImageChops
from collections import deque
args = [a for a in sys.argv[1:] if not a.startswith('--')]; sheet, name, out = args[:3]; base = args[3] if len(args) > 3 else None
im = Image.open(sheet).convert('RGB'); W, H = im.size; px = im.load()
m = Image.new('L', (W, H), 0); mp = m.load()
for y in range(H):
    for x in range(W):
        r, g, b = px[x, y]
        if not (r > 150 and b > 150 and g < 110 and abs(r - b) < 90): mp[x, y] = 255
m = m.filter(ImageFilter.MinFilter(3)).filter(ImageFilter.MaxFilter(3))
sm = m.resize((W//4, H//4)); sp = sm.load(); w, h = sm.size; seen = bytearray(w*h); best = None
for y in range(h):
    for x in range(w):
        if sp[x, y] and not seen[y*w+x]:
            q = deque([(x, y)]); seen[y*w+x] = 1; pts = []
            while q:
                cx, cy = q.popleft(); pts.append((cx, cy))
                for nx, ny in ((cx-1, cy), (cx+1, cy), (cx, cy-1), (cx, cy+1)):
                    if 0 <= nx < w and 0 <= ny < h and sp[nx, ny] and not seen[ny*w+nx]: seen[ny*w+nx] = 1; q.append((nx, ny))
            if best is None or len(pts) > len(best): best = pts
keep = Image.new('L', (w, h), 0); kp = keep.load()
for x, y in best: kp[x, y] = 255
m = ImageChops.multiply(m, keep.resize((W, H), Image.NEAREST).filter(ImageFilter.MaxFilter(9)))
# an enclosed magenta patch is a real gap the model drew on purpose (between a hand and a teapot, a ladder's rungs): keep it see-through
# pull the magenta fringe out of the edge: the colours of the sure inside grow outward over the edge band
import numpy as np
inner = m.filter(ImageFilter.MinFilter(7)); rgb = np.asarray(im).astype(np.float32); a = (np.asarray(inner) > 128).astype(np.float32)
pre = rgb*a[..., None]; aa = a.copy()
for _ in range(12):
    k = lambda x: (np.roll(x, 1, 0) + np.roll(x, -1, 0) + np.roll(x, 1, 1) + np.roll(x, -1, 1) + x)/5
    pre2, aa2 = k(pre), k(aa); grow = (aa < 0.5) & (aa2 > 0); pre[grow] = pre2[grow]/np.maximum(aa2[grow], 1e-6)[..., None]; aa[grow] = 1
ext = Image.fromarray(np.clip(pre, 0, 255).astype(np.uint8)); im = Image.composite(im, ext, inner)
bb = m.getbbox(); cut = im.convert('RGBA'); cut.putalpha(m.filter(ImageFilter.MinFilter(3)).filter(ImageFilter.GaussianBlur(0.9))); cut = cut.crop(bb)
cut = cut.quantize(256, method=Image.Quantize.FASTOCTREE).convert('RGBA'); cut.save(out)
pos = (round(bb[0]/W*100, 2), round(bb[1]/H*100, 2), round((bb[2]-bb[0])/W*100, 2), round((bb[3]-bb[1])/H*100, 2))
print(name, pos, cut.size)
if base:
    b = Image.open(base).convert('RGB').resize((W, H)); b.paste(cut, (bb[0], bb[1]), cut)
    b.crop((max(0, bb[0]-W//10), max(0, bb[1]-H//10), min(W, bb[2]+W//10), min(H, bb[3]+H//10))).save(out.replace('.png', '-check.jpg'), quality=88)
