"""Key a cut-out or icon drawn on white (playbook 2): keywhite.py in.png out.png [--holes N] [--max W]
The white is flood-filled away from the picture's edges, so white inside the thing survives; with --holes N, any enclosed
near-white region of at least N pixels is cleared too (a handle's loop, a key's hole: MOTH-70). The rim is keyed soft
(MOTH-85): every opaque pixel within two of transparency takes its alpha from its whiteness and has the white pulled out of
its colour, so no pale fringe shows on a dark surface. Then cropped to the content, scaled to at most --max pixels wide
(default 1024) and quantised to 256 colours. Prints the size and the ratio (h/w) for the layer's box."""
import sys
from collections import deque
from PIL import Image, ImageFilter
args = [a for a in sys.argv[1:]]
holes = int(args[args.index('--holes') + 1]) if '--holes' in args else 0
maxw = int(args[args.index('--max') + 1]) if '--max' in args else 1024
src, out = [a for i, a in enumerate(args) if not a.startswith('--') and (i == 0 or not args[i-1].startswith('--'))][:2]
im = Image.open(src).convert('RGB'); W, H = im.size; px = im.load()
white = lambda p: p[0] > 232 and p[1] > 232 and p[2] > 232
bg = bytearray(W*H); q = deque()
for x in range(W):
    for y in (0, H - 1):
        if white(px[x, y]) and not bg[y*W+x]: bg[y*W+x] = 1; q.append((x, y))
for y in range(H):
    for x in (0, W - 1):
        if white(px[x, y]) and not bg[y*W+x]: bg[y*W+x] = 1; q.append((x, y))
while q:
    x, y = q.popleft()
    for nx, ny in ((x-1, y), (x+1, y), (x, y-1), (x, y+1)):
        if 0 <= nx < W and 0 <= ny < H and not bg[ny*W+nx] and white(px[nx, ny]): bg[ny*W+nx] = 1; q.append((nx, ny))
if holes:
    seen = bytearray(W*H)
    for y in range(H):
        for x in range(W):
            i = y*W+x
            if bg[i] or seen[i] or not white(px[x, y]): continue
            reg = [(x, y)]; seen[i] = 1; k = 0
            while k < len(reg):
                cx, cy = reg[k]; k += 1
                for nx, ny in ((cx-1, cy), (cx+1, cy), (cx, cy-1), (cx, cy+1)):
                    j = ny*W+nx
                    if 0 <= nx < W and 0 <= ny < H and not seen[j] and not bg[j] and white(px[nx, ny]): seen[j] = 1; reg.append((nx, ny))
            if len(reg) >= holes:
                for cx, cy in reg: bg[cy*W+cx] = 1
a = Image.new('L', (W, H), 255); ap = a.load()
for y in range(H):
    for x in range(W):
        if bg[y*W+x]: ap[x, y] = 0
near = a.filter(ImageFilter.MinFilter(5)); npx = near.load()  # 0 within two pixels of transparency
outim = Image.new('RGBA', (W, H)); op = outim.load()
for y in range(H):
    for x in range(W):
        r, g, b = px[x, y]
        if not ap[x, y]: op[x, y] = (0, 0, 0, 0); continue
        if npx[x, y]: op[x, y] = (r, g, b, 255); continue
        wness = min(r, g, b)/255; al = max(0.0, min(1.0, (1 - wness)/0.35))  # how far from white the rim pixel is
        if al <= 0.02: op[x, y] = (0, 0, 0, 0); continue
        f = lambda c: max(0, min(255, round((c - 255*(1 - al))/al)))  # pull the white out of its colour
        op[x, y] = (f(r), f(g), f(b), round(al*255))
bb = outim.getbbox(); outim = outim.crop(bb)
if outim.width > maxw: outim = outim.resize((maxw, round(outim.height*maxw/outim.width)), Image.LANCZOS)
outim = outim.quantize(256, method=Image.Quantize.FASTOCTREE).convert('RGBA'); outim.save(out)
print(out, outim.size, 'h/w', round(outim.height/outim.width, 4))
