#!/usr/bin/env python3
"""The compass check for a room specification, run before its sketches and prompts (checklist 68 and 69):
    python3 evals/images/roomcheck.py evals/images/rooms/<room>.json
Facing a wall, the wall before it in turning order is on the LEFT and the wall after it on the RIGHT. A thing that
stands along one wall is listed on that wall only: the two walls it touches show its end on their side walls, which
room_prompts.py writes from the neighbour's end object, and the wall opposite never shows it. This prints, per wall,
its neighbours and what each side wall will show, and flags (1) a big thing named on more than one wall's back wall,
(2) an "end of" object on a back wall, and (3) a thing with a distinct end (a ladder, a headboard) whose end is not
named. Written after the owner's review of the eval2 walls, 25 Oct 2026 (MOTH-94 to MOTH-101)."""
import json, re, sys
room = json.load(open(sys.argv[1])); order = room["order"]; walls = room["walls"]
BIG = ("bunk", "bed", "sofa", "loft", "counter", "desk", "wardrobe", "table", "cupboard", "dresser", "cabinet", "shelf unit", "cube unit", "piano", "kitchen")
ENDED = ("ladder", "headboard", "pillow")
def ends(key):
    i = order.index(key); left = order[(i - 1) % 4]; right = order[(i + 1) % 4]
    lo = sorted(walls[left]["objects"], key=lambda o: o["l"] + o["w"])[-1]; ro = sorted(walls[right]["objects"], key=lambda o: o["l"])[0]
    return left, lo, right, ro
problems = 0
seen = {}
if "skirting" not in room.get("palette", "").lower():
    print("!! the palette does not name the skirting board; every wall and every doorway glimpse must carry it (checklist 70)"); problems += 1
for key in order:
    w = walls[key]; left, lo, right, ro = ends(key)
    print(f"{key}: {w['name']}\n   LEFT side wall shows the end of {left}'s last thing: {lo['label']}\n   RIGHT side wall shows the end of {right}'s first thing: {ro['label']}")
    for o in w["objects"]:
        words = (o["label"] + " " + o["text"]).lower()
        if re.search(r"\b(the )?(foot |head )?end of (the |a )?(bunk|bed|sofa|loft|counter|desk)", o["label"].lower()):
            print(f"   !! {o['id']}: an END of a big thing is listed on this back wall ({o['label']}); it belongs to the side wall, which the script writes"); problems += 1
        for b in BIG:
            if re.search(r"\b" + b + r"\b", o["label"].lower()):
                seen.setdefault(b, []).append((key, o["id"]))
        if re.search(r"\bdoor\b", o["label"].lower()) and not re.search(r"glass|window", o["label"].lower()):
            lab = o["label"].lower() + " " + o.get("size", "").lower()
            if not re.search(r"\b(open|closed|shut)\b", lab) or not re.search(r"\b(wood|wooden|white|dark|honey|brown|cream|grey|blue|green)\b", lab):
                print(f"   !! {o['id']}: a door's label or size line must say whether it stands open or shut and what colour it is, because the side-wall sentence carries only those (checklist 70)"); problems += 1
        if re.search(r"through the door|through it|through the doorway|glimpse", words) and not re.search(r"glass|window", o["label"].lower()) and "skirting" not in words:
            print(f"   !! {o['id']}: a doorway glimpse must name the next room's floor and skirting in that room's own words (checklist 70)"); problems += 1
        if re.search(r"\bcurtain", o["label"].lower()) and not re.search(r"window|glass", o["label"].lower()):
            print(f"   !! {o['id']}: a curtain is part of its window, never a loose object (checklist 71)"); problems += 1
        for e in ENDED:
            if re.search(r"\b" + e + r"\b", words) and not re.search(r"(left|right|window|door|north|south|east|west) end|at this end|at the (left|right)", words):
                print(f"   ?  {o['id']}: names a {e} but not which end it is at"); problems += 1
plan = room.get("plan", {})
if not re.search(r"no piers|flat plain walls", room.get("box", "")):
    print("!! the box line does not say the walls are flat with plain corners; the model invents piers and returns otherwise (checklist 74)"); problems += 1
door_objs = [(k, o) for k in order for o in walls[k]["objects"] if re.search(r"\bdoor\b", o["label"].lower()) and not re.search(r"glass|window|leaf|double|second", o["label"].lower())]
plan_doors = {d.get("id"): d for d in plan.get("doors", [])}
for k, o in door_objs:
    pd = plan_doors.get(o["id"])
    if not pd:
        print(f"!! {k}/{o['id']}: a door with no entry in the plan (hinge jamb, swing, open angle, where its leaf lies) (checklist 72)"); problems += 1; continue
    for f in ("hinge", "swing", "open"):
        if not pd.get(f): print(f"!! {k}/{o['id']}: the plan's door has no '{f}' (checklist 72)"); problems += 1
    if pd.get("leaf_on"):
        if not any("leaf" in x["label"].lower() for x in walls[pd["leaf_on"]]["objects"]):
            print(f"!! {k}/{o['id']}: the plan says its open leaf lies on {pd['leaf_on']}, but that wall lists no leaf (checklist 72)"); problems += 1
        else:
            print(f"   door {o['id']}: hinge {pd['hinge'][:60]}…; leaf on {pd['leaf_on']}")
floor = plan.get("floor", "")
if re.search(r"stripe|check|plank|tile pattern|pattern", (room.get("palette", "") + floor).lower()) and "no pattern" not in floor.lower():
    rows = [(k, walls[k].get("floor", "")) for k in order]
    if not all(f for _, f in rows):
        print("!! a patterned floor with no per-wall floor line saying how it reads from that wall (checklist 73)"); problems += 1
    else:
        reads = ["vertical" in f for _, f in rows]
        if not (reads[0] == reads[2] and reads[1] == reads[3] and reads[0] != reads[1]):
            print(f"!! the floor pattern must read the same on opposite walls and differently on neighbours: {rows} (checklist 73)"); problems += 1
        else:
            print("   floor pattern: " + ", ".join(f"{k} {'vertical' if v else 'horizontal'}" for (k, _), v in zip(rows, reads)))
print("   order along each wall, left to right facing it:")
for key in order:
    print(f"     {key}: " + " · ".join(o["label"] for o in sorted(walls[key]["objects"], key=lambda o: o["l"])))
for b, places in seen.items():
    if len({k for k, _ in places}) > 1:
        print(f"?  '{b}' appears in objects on more than one wall: {places}. If it is one thing, it stands along one wall and the others show only its end; two different things are fine.")
print("compass check:", "clean" if not problems else f"{problems} point(s) to look at")
