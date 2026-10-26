"""Look for white left behind on keyed cut-outs and icons (MOTH-116, MOTH-125, MOTH-136): keycheck.py sheet.jpg a.png [b.png ...]
Draws every picture over a dark wall and a mid wall side by side on one contact sheet, the way a fringe shows in the room, and lists two
numbers to look at first:
- pale rim: the share of the pixels within three of transparency that are pale and unsaturated. A thing with no white of its own
  (a girl, a stool, a hat) should be near 0; Zaina's hair was 2.1% (stray hairs wall off white pockets: keywhite.py --holes 3
  --holes-in), re-keyed 0.1%. A white thing (paper, a sheet, the board) is pale at its edge by nature.
- white regions: enclosed opaque near-white patches bigger than 0.6% of the thing, with their place: the background seen through a gap
  the flood fill could not reach (the stool's middle: keywhite.py --holes N), unless the thing is meant to be white there.
The sheet is looked at, on dark, before any cut-out is placed (checklist 88)."""
import sys
from collections import deque
from PIL import Image, ImageDraw, ImageFilter

def check(path):
    im = Image.open(path).convert('RGBA'); W, H = im.size; px = im.load()
    a = im.getchannel('A'); near = a.point(lambda v: 255 if v < 40 else 0).filter(ImageFilter.MaxFilter(7)); npx = near.load()
    rim = pale = 0
    for y in range(H):
        for x in range(W):
            r, g, b, al = px[x, y]
            if al > 200 and npx[x, y]:
                rim += 1
                if min(r, g, b) > 200 and max(r, g, b) - min(r, g, b) < 30: pale += 1
    white = lambda q: q[3] > 200 and min(q[:3]) > 228 and max(q[:3]) - min(q[:3]) < 22
    seen = bytearray(W*H); holes = []; opaque = sum(1 for v in a.tobytes() if v > 200)
    for y in range(H):
        for x in range(W):
            i = y*W + x
            if seen[i] or not white(px[x, y]): continue
            q = deque([(x, y)]); seen[i] = 1; n = 0; sx = sy = 0
            while q:
                cx, cy = q.popleft(); n += 1; sx += cx; sy += cy
                for nx, ny in ((cx-1, cy), (cx+1, cy), (cx, cy-1), (cx, cy+1)):
                    j = ny*W + nx
                    if 0 <= nx < W and 0 <= ny < H and not seen[j] and white(px[nx, ny]): seen[j] = 1; q.append((nx, ny))
            if n > 0.006*opaque: holes.append((n, round(sx/n/W*100), round(sy/n/H*100)))
    return im, (pale/rim if rim else 0), holes

if __name__ == '__main__':
    out, paths = sys.argv[1], sys.argv[2:]; tiles = []
    for p in paths:
        im, ratio, holes = check(p)
        print(f"{p}: pale rim {ratio*100:.1f}%" + ''.join(f"; white region {n} px at {x}%,{y}%" for n, x, y in holes[:4]))
        t = im.copy(); t.thumbnail((300, 300)); cell = Image.new('RGB', (620, 330), (250, 248, 240)); d = ImageDraw.Draw(cell)
        for k, col in enumerate([(52, 38, 30), (176, 150, 120)]):
            bg = Image.new('RGBA', (300, 300), col + (255,)); bg.alpha_composite(t, ((300 - t.width)//2, (300 - t.height)//2)); cell.paste(bg.convert('RGB'), (5 + 310*k, 5))
        d.text((8, 310), f"{p.split('/')[-1]}  rim {ratio*100:.1f}%  holes {len(holes)}", fill=(0, 0, 0)); tiles.append(cell)
    cols = 3; rows = (len(tiles) + cols - 1)//cols; sheet = Image.new('RGB', (620*cols, 330*rows), (255, 255, 255))
    for i, c in enumerate(tiles): sheet.paste(c, ((i % cols)*620, (i//cols)*330))
    sheet.save(out, quality=88); print('sheet:', out)
