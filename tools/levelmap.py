#!/usr/bin/env python3
"""Draw a level's game map as a floor plan (draw.io file) from a short JSON description.

    python3 tools/levelmap.py levels/LEVEL-<key>-map.json

writes levels/LEVEL-<key>-map.drawio next to it. The style is the one the owner chose on 17 Oct 2026
(see next/PLAYBOOK.md 4y): rooms are thick-walled boxes placed where they really are, north up; each
wall carries its view key and what is on it; white tabs on a shared wall are doorways, with a labelled
walk each way that names the view you arrive facing; red = locked at the start, green = the start.

The JSON:
{
  "title": "Mary, last day of school — floor plan",
  "rooms": [
    {"key": "classroom", "name": "Classroom 5H", "x": 120, "y": 140, "w": 360, "h": 300, "fill": "#dae8fc",
     "walls": {"N": {"view": "c2", "text": "window wall · bean plants"},
               "E": {"view": "c3", "text": "door wall · coat pegs"},
               "S": {"view": "c4", "text": "timetable wall · desk + envelope", "mark": "start"},
               "W": {"view": "c1", "text": "whiteboard wall · picture key"}}}
  ],
  "doors": [
    {"from": "classroom", "side": "E", "to": "corridor", "at": 0.33, "out": "walk east → h2", "back": "walk west → c1", "label": "door"}
  ],
  "legend": ["<b>Locked at the start</b>", "..."]
}
`at` is where along the wall the door sits, 0 to 1 from the top (or left). A wall's `mark` is "lock" (red),
"goal" (red) or "start" (green). The walk from `to` back to `from` is drawn when `back` is given.
"""
import json, sys, os
from xml.sax.saxutils import escape

def E(s): return escape(str(s), {'"': '&quot;'})

ROOM = 'rounded=0;whiteSpace=wrap;html=1;strokeColor=#111111;strokeWidth=10;fontStyle=1;fontSize=14;verticalAlign=middle;fillColor='
DOOR = 'rounded=1;whiteSpace=wrap;html=1;fillColor=#ffffff;strokeColor=#333333;strokeWidth=1;fontSize=9;'
LBL = 'text;html=1;fontSize=9;align=center;verticalAlign=middle;whiteSpace=wrap;'
COLOUR = {None: 'fontColor=#222222;', 'lock': 'fontColor=#b22222;fontStyle=1;', 'goal': 'fontColor=#b22222;fontStyle=1;', 'start': 'fontColor=#1f7a3a;fontStyle=1;'}
WALK = 'endArrow=classic;html=1;strokeColor=#4a6fa5;strokeWidth=1.5;fontSize=10;fontColor=#1b2a41;'
OPPOSITE = {'N': 'S', 'S': 'N', 'E': 'W', 'W': 'E'}
TAB = 60      # a door tab's width across the wall
TABLEN = 90   # its length along the wall
INSET = 30    # a wall label sits this far inside the wall
CLEAR = 20    # and this far clear of a door tab

def main(path):
    spec = json.load(open(path))
    cells, ids = [], set()
    def cell(i, value, style, x, y, w, h):
        assert i not in ids, f'duplicate id {i}'; ids.add(i)
        cells.append(f'<mxCell id="{i}" value="{E(value)}" style="{style}" vertex="1" parent="1"><mxGeometry x="{x:g}" y="{y:g}" width="{w:g}" height="{h:g}" as="geometry"/></mxCell>')
    def edge(i, s, t, value):
        cells.append(f'<mxCell id="{i}" value="{E(value)}" style="{WALK}" edge="1" source="{s}" target="{t}" parent="1"><mxGeometry relative="1" as="geometry"/></mxCell>')

    rooms = {r['key']: r for r in spec['rooms']}
    right = max(r['x'] + r['w'] for r in spec['rooms']); left = min(r['x'] for r in spec['rooms'])
    cell('title', f"<b><font style=\"font-size:18px\">{spec['title']}</font></b><br>North is up. A room's four views in turning order run north → east → south → west. White tabs are open doorways; the arrow says the walk and the view you arrive facing (away from the door). Red = locked at the start, green = where the child starts.", 'text;html=1;align=left;verticalAlign=top;whiteSpace=wrap;', left, 10, right - left, 70)
    cell('compass', 'N<br>▲', 'text;html=1;fontSize=14;fontStyle=1;align=center;', right - 60, 90, 60, 40)

    # which walls carry doors, so their labels keep clear of the tabs
    doors_on = {}
    for d in spec['doors']:
        doors_on.setdefault((d['from'], d['side']), []).append(d['at'])
        doors_on.setdefault((d['to'], OPPOSITE[d['side']]), []).append(d['at'])

    for r in spec['rooms']:
        x, y, w, h = r['x'], r['y'], r['w'], r['h']
        cell(r['key'], '<br><br><br>' + r['name'] if h >= w * 0.6 else r['name'], ROOM + r.get('fill', '#f5f5f5') + ';', x, y, w, h)
        for side, wall in r.get('walls', {}).items():
            text = f"{wall['view']} · {wall['text']}" + (' · START' if wall.get('mark') == 'start' else ' · GOAL' if wall.get('mark') == 'goal' else '')
            style = LBL + COLOUR[wall.get('mark')]
            has_door = (r['key'], side) in doors_on
            if side in ('N', 'S'):
                ly = y + 10 if side == 'N' else y + h - 40
                if has_door: ly = y + INSET + CLEAR if side == 'N' else y + h - INSET - CLEAR - 30
                cell(f"{r['key']}_{side}", text, style, x + 30, ly, w - 60, 30)
            else:
                # a vertical label: a wide box rotated about its centre
                cx = x + INSET if side == 'W' else x + w - INSET
                if has_door: cx = x + INSET + CLEAR if side == 'W' else x + w - INSET - CLEAR
                length = h - 40
                rot = 'rotation=90;' if side == 'W' else 'rotation=-90;'
                cell(f"{r['key']}_{side}", text, style + rot, cx - length / 2, y + h / 2 - 15, length, 30)

    for n, d in enumerate(spec['doors']):
        a, b, side = rooms[d['from']], rooms[d['to']], d['side']
        label = d.get('label', 'door')
        if side in ('E', 'W'):
            ya = a['y'] + d['at'] * a['h'] - TABLEN / 2
            xa = a['x'] + a['w'] - TAB / 2 if side == 'E' else a['x'] - TAB / 2
            xb = b['x'] - TAB / 2 if side == 'E' else b['x'] + b['w'] - TAB / 2
            cell(f'door{n}a', label, DOOR, xa, ya, TAB, TABLEN); cell(f'door{n}b', label, DOOR, xb, ya, TAB, TABLEN)
        else:
            xa = a['x'] + d['at'] * a['w'] - TABLEN / 2
            ya = a['y'] + a['h'] - TAB / 2 if side == 'S' else a['y'] - TAB / 2
            yb = b['y'] - TAB / 2 if side == 'S' else b['y'] + b['h'] - TAB / 2
            cell(f'door{n}a', label, DOOR, xa, ya, TABLEN, TAB); cell(f'door{n}b', label, DOOR, xa, yb, TABLEN, TAB)
        edge(f'walk{n}a', f'door{n}a', f'door{n}b', d['out'])
        if d.get('back'): edge(f'walk{n}b', f'door{n}b', f'door{n}a', d['back'])

    if spec.get('legend'):
        lg = spec['legend_box'] if 'legend_box' in spec else {'x': right - 360, 'y': 520, 'w': 360, 'h': 150}
        cell('legend', '<br>'.join(spec['legend']), 'text;html=1;align=left;verticalAlign=top;whiteSpace=wrap;fontSize=10;fillColor=#ffffff;strokeColor=#999999;', lg['x'], lg['y'], lg['w'], lg['h'])

    model = '<mxGraphModel adaptiveColors="auto" grid="1" gridSize="10" page="1" pageWidth="1400" pageHeight="1300"><root><mxCell id="0"/><mxCell id="1" parent="0"/>\n' + '\n'.join(cells) + '\n</root></mxGraphModel>'
    out = path[:-5] + '.drawio' if path.endswith('.json') else path + '.drawio'
    open(out, 'w').write('<mxfile host="app.diagrams.net"><diagram name="Floor plan" id="map">' + model + '</diagram></mxfile>')
    import xml.dom.minidom; xml.dom.minidom.parse(out)
    print(f'wrote {out}: {len(spec["rooms"])} rooms, {len(spec["doors"])} doorways')

if __name__ == '__main__':
    if len(sys.argv) != 2: sys.exit(__doc__)
    main(sys.argv[1])
