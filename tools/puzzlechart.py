#!/usr/bin/env python3
"""Draws a level's puzzle chart (stage 3 of the level file) as the dependency chart in lanes the playbook asks for
(4y): one lane per trail, item → clue → lock → reward, with the arrows between lanes.
    python3 tools/puzzlechart.py levels/LEVEL-<key>-chart.json
writes levels/LEVEL-<key>-chart.drawio (open at app.diagrams.net) and, beside it, LEVEL-<key>-chart.png for a phone.
The JSON: {"title", "note", "lanes": [{"key", "name", "nodes": [{"id", "kind", "text", "col"?}]}], "edges": [[from, to, label?]]}.
Kinds and their colours, as the school chart used them: item / gesture = yellow, clue / reference / reading = blue,
lock / mechanism / room change = red, reward = green, person = orange. A node's `col` is its column (0..); a lane's nodes
run left to right in list order when `col` is not given. The JSON is the record; the drawn files are for looking at."""
import json, os, sys, html, textwrap
KIND = {"item":("#fff2cc","#d6b656"), "gesture":("#fff2cc","#d6b656"), "clue":("#dae8fc","#6c8ebf"), "reference":("#dae8fc","#6c8ebf"),
        "reading":("#dae8fc","#6c8ebf"), "lock":("#f8cecc","#b85450"), "mechanism":("#f8cecc","#b85450"), "room change":("#f8cecc","#b85450"),
        "reward":("#d5e8d4","#82b366"), "person":("#ffe6cc","#d79b00")}
LANE_H, LANE_START, COL_W, NODE_W, NODE_H, LEFT = 150, 130, 250, 220, 110, 0
def main(path):
    spec = json.load(open(path)); base = path[:-5] if path.endswith(".json") else path
    lanes = spec["lanes"]; width = LANE_START + COL_W * (1 + max(n.get("col", i) for l in lanes for i, n in enumerate(l["nodes"])))
    pos = {}
    cells = ['<mxCell id="0"/><mxCell id="1" parent="0"/>']
    def esc(s): return html.escape(s, quote=True)
    cells.append(f'<mxCell id="title" value="{esc("<b>" + spec["title"] + "</b><br>" + spec.get("note", ""))}" style="text;html=1;align=left;verticalAlign=top;whiteSpace=wrap;" vertex="1" parent="1"><mxGeometry x="0" y="-80" width="{width}" height="70" as="geometry"/></mxCell>')
    for li, lane in enumerate(lanes):
        y = li * LANE_H
        cells.append(f'<mxCell id="lane_{lane["key"]}" value="{esc(lane["name"])}" style="swimlane;horizontal=0;startSize={LANE_START};fillColor={lane.get("fill", "#f9f9f9")};html=1;" vertex="1" parent="1"><mxGeometry x="0" y="{y}" width="{width}" height="{LANE_H}" as="geometry"/></mxCell>')
        for i, n in enumerate(lane["nodes"]):
            col = n.get("col", i); x = LANE_START + 15 + col * COL_W; ny = y + 20
            fill, stroke = KIND[n["kind"]]
            pos[n["id"]] = (x, ny, lane["key"])
            label = f'<b>{n["kind"].upper()}</b> {n["text"]}'
            cells.append(f'<mxCell id="{n["id"]}" value="{esc(label)}" style="rounded=1;whiteSpace=wrap;html=1;fillColor={fill};strokeColor={stroke};align=left;spacingLeft=6;fontSize=11;" vertex="1" parent="lane_{lane["key"]}"><mxGeometry x="{x}" y="20" width="{NODE_W}" height="{NODE_H}" as="geometry"/></mxCell>')
    for k, e in enumerate(spec["edges"]):
        a, b = e[0], e[1]; label = e[2] if len(e) > 2 else ""
        cross = pos[a][2] != pos[b][2]
        style = "edgeStyle=orthogonalEdgeStyle;rounded=1;html=1;endArrow=block;" + ("strokeColor=#b85450;dashed=1;" if cross else "")
        cells.append(f'<mxCell id="e{k}" value="{esc(label)}" style="{style}" edge="1" parent="1" source="{a}" target="{b}"><mxGeometry relative="1" as="geometry"/></mxCell>')
    xml = f'<mxfile host="app.diagrams.net"><diagram name="Puzzle chart" id="chart"><mxGraphModel grid="1" gridSize="10" page="1" pageWidth="{width + 100}" pageHeight="{LANE_H * len(lanes) + 200}"><root>\n' + "\n".join(cells) + "\n</root></mxGraphModel></diagram></mxfile>\n"
    open(base + ".drawio", "w").write(xml); print("wrote", base + ".drawio:", len(lanes), "lanes,", len(pos), "nodes,", len(spec["edges"]), "arrows")
    # the picture
    try:
        from PIL import Image, ImageDraw, ImageFont
    except ImportError:
        print("no PIL: no png"); return
    S = 1.5; PAD = 30; TOP = 110
    W = int(width * S) + 2 * PAD; H = int(LANE_H * len(lanes) * S) + TOP + PAD
    im = Image.new("RGB", (W, H), "white"); d = ImageDraw.Draw(im)
    def font(s, bold=False):
        for p in ("/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf" if bold else "/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf",):
            if os.path.exists(p): return ImageFont.truetype(p, s)
        return ImageFont.load_default()
    F, FB, FT, FL = font(15), font(15, True), font(26, True), font(17, True)
    d.text((PAD, 10), spec["title"], font=FT, fill="black")
    for i, ln in enumerate(textwrap.wrap(spec.get("note", ""), 150)[:2]): d.text((PAD, 48 + i * 20), ln, font=F, fill="#444")
    X = lambda v: int(v * S) + PAD; Y = lambda v: int(v * S) + TOP
    centre = {}
    for li, lane in enumerate(lanes):
        y0, y1 = Y(li * LANE_H), Y((li + 1) * LANE_H)
        d.rectangle([X(0), y0, X(width), y1], fill=lane.get("fill", "#f9f9f9"), outline="#999", width=2)
        d.rectangle([X(0), y0, X(LANE_START), y1], fill="#eeeeee", outline="#999", width=2)
        for i, ln in enumerate(textwrap.wrap(lane["name"], 20)): d.text((X(8), y0 + 12 + i * 22), ln, font=FL, fill="black")
        for i, n in enumerate(lane["nodes"]):
            x, ny, _ = pos[n["id"]]; bx0, by0, bx1, by1 = X(x), Y(ny), X(x + NODE_W), Y(ny + NODE_H)
            fill, stroke = KIND[n["kind"]]
            d.rounded_rectangle([bx0, by0, bx1, by1], radius=10, fill=fill, outline=stroke, width=3)
            centre[n["id"]] = ((bx0 + bx1) // 2, (by0 + by1) // 2, bx0, bx1, by0, by1)
            d.text((bx0 + 10, by0 + 8), n["kind"].upper(), font=FB, fill="black")
            for j, ln in enumerate(textwrap.wrap(n["text"], 34)[:6]): d.text((bx0 + 10, by0 + 30 + j * 19), ln, font=F, fill="black")
    def arrow(p, q, col):
        d.line([p, q], fill=col, width=3)
        import math
        ang = math.atan2(q[1] - p[1], q[0] - p[0]); L = 12
        d.polygon([q, (q[0] - L * math.cos(ang - .4), q[1] - L * math.sin(ang - .4)), (q[0] - L * math.cos(ang + .4), q[1] - L * math.sin(ang + .4))], fill=col)
    for e in spec["edges"]:
        a, b = centre[e[0]], centre[e[1]]; cross = pos[e[0]][2] != pos[e[1]][2]; col = "#b85450" if cross else "#333333"
        if not cross and b[2] > a[3]: arrow((a[3], a[1]), (b[2], b[1]), col)
        elif b[4] > a[5]: arrow((a[0], a[5]), (b[0], b[4]), col)
        elif b[5] < a[4]: arrow((a[0], a[4]), (b[0], b[5]), col)
        else: arrow((a[3], a[1]), (b[2], b[1]), col)
        if len(e) > 2 and e[2]:
            mx, my = (a[0] + b[0]) // 2, (a[1] + b[1]) // 2
            d.text((mx, my), e[2], font=F, fill=col, anchor="mm")
    im.save(base + ".png"); print("wrote", base + ".png", im.size)
if __name__ == "__main__": main(sys.argv[1])
