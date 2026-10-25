#!/usr/bin/env python3
"""Build one prompt per wall from a room specification, all sharing the same room block.
    python3 evals/images/room_prompts.py evals/images/rooms/classroom5h.json evals/images/prompts/room-c5h
Each wall's prompt = the frame and style paragraphs, the room block (palette, band, light, the four walls in one line
each), this wall's numbered objects with where they stand in thirds, what each side wall shows, this wall's light,
and the checks line. The layout sketch and the finished neighbours are attached as references by the manifest."""
import json, os, sys
room = json.load(open(sys.argv[1])); out = sys.argv[2]; os.makedirs(out, exist_ok=True)
order = room["order"]; walls = room["walls"]
STYLE = """Background art for a children's point-and-click adventure game, landscape 16:9, seen straight on. The picture fills the whole frame edge to edge: no border, no margin, no frame, no dark surround. One wall of a room drawn as %s. The camera is a child's eye height, and everything in the room is drawn from that same height. No people, no characters.

Style: a polished, finished illustration drawn for a game, not a picture book for toddlers. Clean dark-ink outlines on everything, a shadow side on every object and soft cast shadows from one light source, so things sit solidly on their surfaces; smooth colour with gentle shading, a faint paper-grain texture and a gentle vignette at the edges. Bright and clear, not hazy or dark. %s Not photorealistic, not 3D render, no glossy shading, no watercolour bleed.""" % (room["box"], room.get("setting", "Cosy, warm and tidy: a Singapore international school classroom in the afternoon."))
def third(o):
    c = o["l"] + o["w"] / 2
    return "in the left third of the wall" if c < 34 else "in the middle of the wall" if c < 67 else "in the right third of the wall"
def ends(key):
    i = order.index(key); left = order[(i - 1) % 4]; right = order[(i + 1) % 4]
    lo = sorted(walls[left]["objects"], key=lambda o: o["l"] + o["w"])[-1]; ro = sorted(walls[right]["objects"], key=lambda o: o["l"])[0]
    return (walls[left]["name"], lo), (walls[right]["name"], ro)
roomblock = "The room: " + room["palette"] + ". " + room["light"][0].upper() + room["light"][1:] + ". Its four walls, in turning order: " + "; ".join(f"{walls[k]['name']}: " + ", ".join(o["label"] for o in walls[k]["objects"]) for k in order) + "."
for key in order:
    w = walls[key]; (ln, lo), (rn, ro) = ends(key)
    def itemtext(o):
        # a thing the motion sheet says moves is not painted on the wall: its place is described as empty (playbook 2, 4ab)
        return o["absent"] if o.get("moves") and o.get("absent") else o["text"]
    items = "\n".join(f"{i+1}. {third(o).capitalize()}, {'on the wall' if o['on']=='wall' else 'against the wall, standing on the floor'}: {itemtext(o)}{(' ' + o['size']) if o.get('size') else ''}." for i, o in enumerate(w["objects"]))
    def endname(o): return o['label'].split(':')[0].split('+')[0].strip()
    sides = f"The narrow left side wall shows, foreshortened, only the near end of {ln}: the end of the {endname(lo)}{(', ' + lo['size']) if lo.get('size') else ''}; the rest of that wall is out of view, and nothing else stands on this side wall. The narrow right side wall shows, foreshortened, only the near end of {rn}: the end of the {endname(ro)}{(', ' + ro['size']) if ro.get('size') else ''}; the rest of that wall is out of view, and nothing else stands on this side wall."
    alltext = " ".join(o["text"] for o in w["objects"])
    words = [t for t in room.get("words", ["RULES", "5H TIMETABLE", "SUPPLIES", "LOST PROPERTY"]) if t in alltext] + (["5H"] if "reading 5H at" in alltext else [])
    wordline = ("The only words in the picture are " + " and ".join(words) + "; no other words, letters, labels or writing anywhere.") if words else "There are no words or letters anywhere in the picture."
    prompt = f"""{STYLE}

{roomblock}

This wall is {w['name']}. Only the objects in the numbered list below, each exactly where the list says and where the attached layout sketch's grey boxes put it (the boxes are in the same left-to-right order as the list), at real size, against the back wall; nothing on the side walls but what the side-wall sentence names. Plain walls: no pattern, no stripes, no extra posters, shelves, plants, boxes, bins or decoration beyond the list.
{items}

{sides}

Light on this wall: {w['light']}.{(chr(10)+chr(10)+'Floor on this wall: '+w['floor']+'.') if w.get('floor') else ''}

Checks: the picture fills the whole frame edge to edge, no border, no margin, no frame, no dark surround. No arrows, boxes, panels or buttons anywhere. {wordline} Every object stands against the back wall in the position listed; the side walls show only the two named ends. Nothing is drawn that is not in the numbered list: no extra chair, blind, rug, plant, poster, box or bin.
"""
    open(os.path.join(out, f"{key}.txt"), "w").write(prompt); print(key, len(prompt.split()), "words")
# the cut-outs: one prompt per moving thing, on white, in the room's style (playbook 2: alone, no surface, no shadow, no frame, no text)
cuts = [(k, o) for k in order for o in walls[k]["objects"] if o.get("moves")]
if cuts:
    lines = ["Cut-outs for the things the motion sheet says move. Each is generated alone, on a pure flat white background, same style as the finished wall it belongs to (attach that wall as the reference), no surface, no shadow, no frame, no text; 1:1 or 3:4, 1K; then flood-fill the white away from the edges (playbook 2). The wall itself was prompted with the thing absent.", ""]
    for k, o in cuts:
        ratio = (o["w"]*0.76*16/9)/(o["h"]*0.72)  # the box's real width over its height (the back wall is 76% of the picture's width and 72% of its height)
        shape = f"about {ratio:.1f} times as wide as tall" if ratio >= 1.2 else (f"about {1/ratio:.1f} times as tall as wide" if ratio <= 0.83 else "about as tall as wide")
        lines.append(f"[{k}] {o['label']} ({o['moves']}): {o.get('cut') or o['text']}{(' ' + o['size']) if o.get('size') else ''}. Drawn alone, centred, on a pure flat white background, in exactly the style of the attached wall, at the size and in the proportions it has on that wall: {shape}, seen straight on from the same height as the wall.")
    open(os.path.join(out, "cutouts.txt"), "w").write("\n".join(lines) + "\n"); print("cutouts:", len(cuts))
