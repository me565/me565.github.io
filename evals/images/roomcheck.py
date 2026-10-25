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
        for e in ENDED:
            if re.search(r"\b" + e + r"\b", words) and not re.search(r"(left|right|window|door|north|south|east|west) end|at this end|at the (left|right)", words):
                print(f"   ?  {o['id']}: names a {e} but not which end it is at"); problems += 1
for b, places in seen.items():
    if len({k for k, _ in places}) > 1:
        print(f"?  '{b}' appears in objects on more than one wall: {places}. If it is one thing, it stands along one wall and the others show only its end; two different things are fine.")
print("compass check:", "clean" if not problems else f"{problems} point(s) to look at")
