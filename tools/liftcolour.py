"""Lift a thing an edit added, where the edit also redrew what lies under it (playbook 4ag): liftcolour.py base edit out.png red|paper|cream|navy x0 x1 y0 y1
A pixel is kept only if it changed (more than 28) and has the thing's colour family, so redrawn clothes under a packed hat are left
behind; then the largest piece, its holes filled. The window is in fractions. Look at the result on a keycheck.py sheet."""
import sys, numpy as np
from collections import deque
from PIL import Image, ImageFilter
base, edit, out, kind = sys.argv[1:5]; x0, x1, y0, y1 = map(float, sys.argv[5:9])
b = np.array(Image.open(base).convert('RGB')).astype(int); e = Image.open(edit).convert('RGB'); a = np.array(e).astype(int); H, W = b.shape[:2]
r, g, bl = a[..., 0], a[..., 1], a[..., 2]; mx = a.max(2); mn = a.min(2)
d = np.abs(a - b).max(2) > 28
col = {'red': (r > g + 45) & (r > bl + 35),
       'paper': (mn > 150) | ((r > g + 50) & (r > 120)) | ((bl > r) & (mn > 120)),
       'cream': (mn > 135) & (mx - mn < 70),
       'navy': (bl > r + 8) & (mx < 120)}[kind]
m = d & col; m[:, :int(W*x0)] = False; m[:, int(W*x1):] = False; m[:int(H*y0)] = False; m[int(H*y1):] = False
m = np.array(Image.fromarray((m*255).astype('uint8')).filter(ImageFilter.MaxFilter(3)).filter(ImageFilter.MinFilter(3))) > 0
sm = m[::2, ::2]; h, w = sm.shape; seen = np.zeros_like(sm); best = []
for y in range(h):
    for x in range(w):
        if sm[y, x] and not seen[y, x]:
            q = deque([(y, x)]); seen[y, x] = True; pts = []
            while q:
                cy, cx = q.popleft(); pts.append((cy, cx))
                for ny, nx in ((cy-1, cx), (cy+1, cx), (cy, cx-1), (cy, cx+1)):
                    if 0 <= ny < h and 0 <= nx < w and sm[ny, nx] and not seen[ny, nx]: seen[ny, nx] = True; q.append((ny, nx))
            if len(pts) > len(best): best = pts
k = np.zeros((h, w), bool)
for y, x in best: k[y, x] = True
k = np.array(Image.fromarray((k*255).astype('uint8')).resize((W, H), Image.NEAREST).filter(ImageFilter.MaxFilter(5)).filter(ImageFilter.MinFilter(3))) > 0
outside = np.zeros_like(k); q = deque()
for x in range(W):
    for y in (0, H-1):
        if not k[y, x]: outside[y, x] = True; q.append((y, x))
for y in range(H):
    for x in (0, W-1):
        if not k[y, x] and not outside[y, x]: outside[y, x] = True; q.append((y, x))
while q:
    cy, cx = q.popleft()
    for ny, nx in ((cy-1, cx), (cy+1, cx), (cy, cx-1), (cy, cx+1)):
        if 0 <= ny < H and 0 <= nx < W and not k[ny, nx] and not outside[ny, nx]: outside[ny, nx] = True; q.append((ny, nx))
mk = Image.fromarray(((~outside)*255).astype('uint8')).filter(ImageFilter.GaussianBlur(1.0)); bb = mk.getbbox()
c = e.convert('RGBA'); c.putalpha(mk); c = c.crop(bb); c.save(out)
print(out.split('/')[-1], [round(bb[0]/W*100, 2), round(bb[1]/H*100, 2), round((bb[2]-bb[0])/W*100, 2)])
