"""Paste a state drawn as an edit of a wall as a soft-edged rectangle, and refuse a box that cuts the thing (MOTH-147, second report):
    patch.py base.jpg edit.png out.png x0 x1 y0 y1 [--feather 6]
The box is in picture percentages. The thing is found as the edit's largest changed region against the base (strong changes only, so the
model's slight redrawing elsewhere is ignored); if it reaches into the box's soft edge, the rectangle would fade part of it out, as the
case's left side was when its box was trimmed to a guessed edge. The tool then says which side and exits 2: measure on tools/grid.py
and widen the box there. Prints the box for the stage (left, top, width) and the thing's own box, for placing neighbours clear of it."""
import sys
from collections import deque
import numpy as np
from PIL import Image, ImageFilter

args = sys.argv[1:]
f = int(args[args.index('--feather') + 1]) if '--feather' in args else 6
pos = [a for i, a in enumerate(args) if not a.startswith('--') and (i == 0 or not args[i-1].startswith('--'))]
base_p, edit_p, out_p = pos[:3]; x0, x1, y0, y1 = map(float, pos[3:7])
b = Image.open(base_p).convert('RGB'); e = Image.open(edit_p).convert('RGB').resize(b.size); W, H = b.size
d = np.abs(np.array(e).astype(int) - np.array(b).astype(int)).max(2) > 60
d = np.array(Image.fromarray((d*255).astype('uint8')).filter(ImageFilter.MinFilter(3)).filter(ImageFilter.MaxFilter(9))) > 0
sm = d[::4, ::4]; h, w = sm.shape; seen = np.zeros_like(sm); best = []
for yy in range(h):
    for xx in range(w):
        if sm[yy, xx] and not seen[yy, xx]:
            q = deque([(yy, xx)]); seen[yy, xx] = True; pts = []
            while q:
                cy, cx = q.popleft(); pts.append((cy, cx))
                for ny, nx in ((cy-1, cx), (cy+1, cx), (cy, cx-1), (cy, cx+1)):
                    if 0 <= ny < h and 0 <= nx < w and sm[ny, nx] and not seen[ny, nx]: seen[ny, nx] = True; q.append((ny, nx))
            if len(pts) > len(best): best = pts
ys = [p[0]*4 for p in best]; xs = [p[1]*4 for p in best]; tb = (min(xs), min(ys), max(xs) + 4, max(ys) + 4)
X0, Y0, X1, Y1 = int(W*x0/100), int(H*y0/100), int(W*x1/100), int(H*y1/100)
cut = [s for s, hit in (('left', tb[0] < X0 + 2*f), ('top', tb[1] < Y0 + 2*f), ('right', tb[2] > X1 - 2*f), ('bottom', tb[3] > Y1 - 2*f)) if hit]
print('thing', [round(tb[0]/W*100, 2), round(tb[1]/H*100, 2), round(tb[2]/W*100, 2), round(tb[3]/H*100, 2)])
if cut: sys.exit('CUT: the thing reaches the box\'s soft edge at its ' + ', '.join(cut) + ': widen the box there')
im = e.crop((X0, Y0, X1, Y1)).convert('RGBA'); cw, ch = im.size; m = Image.new('L', (cw, ch), 0); m.paste(255, (f, f, cw - f, ch - f)); im.putalpha(m.filter(ImageFilter.GaussianBlur(f/2)))
im.quantize(256, method=Image.Quantize.FASTOCTREE).convert('RGBA').save(out_p)
print(out_p, 'box', [round(X0/W*100, 2), round(Y0/H*100, 2), round(cw/W*100, 2)])
