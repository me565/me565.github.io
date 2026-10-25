"""Draw what a doorway shows from the room it leads to, instead of asking the model for it (MOTH-124, MOTH-142):
    glimpse.py wall.jpg next.jpg out.jpg --scale S --at X,Y --opening x0,y0,x1,y1 [--dim 0.93]
The image model draws a glimpse at whatever angle it likes; twice it drew the cube wall turned to face left and the corridor's double doors
far away down a long hall, and the owner saw both. The glimpse is the next room's own wall, so it is pasted from that wall's picture:
- a wall parallel to the one you face is seen face-on (its lines stay level), only smaller with distance: S = the next wall's depth
  scale, from the plan: (its distance from the camera) against (the distance of a wall whose scale you know), times the two
  pictures' pixels per metre (measure a door: about 2.1 m tall, a double door about 1.6 m wide);
- it sits on the same horizon (eye height), so its floor line is nearer the horizon the farther it is: Y follows from that;
- which part shows comes from the plan too: the lateral offset of the opening's edges, at the next wall's depth (X).
The opening (in pixels of wall.jpg) is the inside of the frame, measured on a grid of the picture; nothing outside it changes.
Above the next wall's picture the ceiling continues in its own colour; below it the floor's last rows are carried down to the threshold.
The working for each doorway is written beside the call in the level file (eval2: c4's right doorway, k3's doorway)."""
import sys
import numpy as np
from PIL import Image, ImageFilter

args = sys.argv[1:]
def opt(name, default=None):
    return args[args.index(name) + 1] if name in args else default
wall_p, next_p, out_p = [a for i, a in enumerate(args) if not a.startswith('--') and (i == 0 or not args[i-1].startswith('--'))][:3]
s = float(opt('--scale')); x, y = (int(round(float(v))) for v in opt('--at').split(',')); x0, y0, x1, y1 = (int(v) for v in opt('--opening').split(','))
dim = float(opt('--dim', '0.93'))
wall = Image.open(wall_p).convert('RGB'); W, H = wall.size; nxt = Image.open(next_p).convert('RGB')
ns = nxt.resize((round(nxt.width*s), round(nxt.height*s)), Image.LANCZOS)
comp = Image.new('RGB', (W, H)); top = np.array(ns)[2:8].reshape(-1, 3).mean(0)
comp.paste(tuple(int(v) for v in top), (0, 0, W, y + 3))  # the ceiling above the next wall's picture
comp.paste(ns, (x, y))
bottom = y + ns.height
if bottom < y1:  # the floor nearer than the next picture shows, carried down to the threshold
    strip = ns.crop((0, ns.height - 24, ns.width, ns.height)).resize((ns.width, y1 - bottom + 24)); comp.paste(strip, (x, bottom - 24))
comp = Image.fromarray((np.array(comp).astype(float)*dim).clip(0, 255).astype('uint8'))  # the next room, a touch dimmer through the door
m = Image.new('L', (W, H), 0); m.paste(255, (x0, y0, x1, y1)); m = m.filter(ImageFilter.GaussianBlur(1.2))
Image.composite(comp, wall, m).save(out_p, quality=93); print(out_p, 'next wall at', (x, y), 'scale', s, 'opening', (x0, y0, x1, y1))
