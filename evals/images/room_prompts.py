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

Style: a polished, finished illustration drawn for a game, not a picture book for toddlers. Clean dark-ink outlines on everything, a shadow side on every object and soft cast shadows from one light source, so things sit solidly on their surfaces; smooth colour with gentle shading, a faint paper-grain texture and a gentle vignette at the edges. Bright and clear, not hazy or dark. Cosy, warm and tidy: a Singapore international school classroom in the afternoon. Not photorealistic, not 3D render, no glossy shading, no watercolour bleed.""" % room["box"]
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
    items = "\n".join(f"{i+1}. {third(o).capitalize()}, {'on the wall' if o['on']=='wall' else 'against the wall, standing on the floor'}: {o['text']}." for i, o in enumerate(w["objects"]))
    sides = f"The narrow left side wall shows, foreshortened, the near end of {ln}: the end of the {lo['label'].split(':')[0].split('+')[0].strip()}, and nothing else. The narrow right side wall shows, foreshortened, the near end of {rn}: the end of the {ro['label'].split(':')[0].split('+')[0].strip()}, and nothing else."
    alltext = " ".join(o["text"] for o in w["objects"])
    words = [t for t in ("RULES", "5H TIMETABLE", "SUPPLIES", "LOST PROPERTY") if t in alltext] + (["5H"] if "reading 5H at" in alltext else [])
    wordline = ("The only words in the picture are " + " and ".join(words) + "; no other words, letters, labels or writing anywhere.") if words else "There are no words or letters anywhere in the picture."
    prompt = f"""{STYLE}

{roomblock}

This wall is {w['name']}. Only the objects in the numbered list below, each exactly where the list says and where the numbered grey box of the attached layout sketch puts it, at real size, against the back wall; nothing on the side walls but what the side-wall sentence names. Plain walls: no pattern, no stripes, no extra posters, shelves, plants, boxes, bins or decoration beyond the list.
{items}

{sides}

Light on this wall: {w['light']}.

Checks: the picture fills the whole frame edge to edge, no border, no margin, no frame, no dark surround. No arrows, boxes, panels or buttons anywhere. {wordline} Every object stands against the back wall in the position listed; the side walls show only the two named ends. Nothing is drawn that is not in the numbered list.
"""
    open(os.path.join(out, f"{key}.txt"), "w").write(prompt); print(key, len(prompt.split()), "words")
