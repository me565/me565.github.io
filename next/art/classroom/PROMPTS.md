# Classroom 5H, generated art

Made with Gemini (`gemini-3-pro-image`, 2K) through the API key in the environment (`GEMINI_API_KEY`). Each wall is one `generateContent` call with `responseModalities: ["TEXT","IMAGE"]` and `imageConfig: {aspectRatio, imageSize}`. The first wall is generated alone; the others get a crop of it (with its objects mostly cut off) as a style reference, so the walls feel like one room without copying each other's furniture. Never name other games in a prompt; describe qualities.

## Cut-outs and cleaned walls (evening, 28 Sept 2026)

Moving things are separate pictures: `layer-plant1..4.png`, `layer-coat.png`, `layer-lost.png`, `layer-envelope.png`, `layer-hamster.png`, `layer-backpack.png`, `layer-apple.png`. Each was made by giving Gemini a crop of the object from the wall with "Redraw exactly the … from the attached crop, alone, on a pure flat white background, same style, nothing else", then flood-filling the white away from the edges (so white inside the object stays). The walls were then edited with the same model ("Edit the attached picture: remove …; keep absolutely everything else exactly as it is"), and the `landscape-*.jpg` files now carry those cleaned versions. The edited wall shifts a little, so cut-out positions were measured again on the new wall with a 5% grid. Inventory icons (`item-*.png`) are made the same way.

## Landscape set (owner's brief, 28 Sept 2026 afternoon): `landscape-*.jpg`, 16:9, saved at 1920×1080

### Shared style text

> Background art for a children's point-and-click adventure game, landscape 16:9, seen straight on. One wall of a room drawn as a shallow box in one-point perspective: a wide back wall, narrow side walls, a thin strip of ceiling and a low floor band. The camera is a child's eye height. No people, no characters.
> 
> Style: clean, calm flat illustration with thin, even dark-ink outlines, flat colour fills, very little shading, a faint hand-drawn hatch or paper texture, and a soft dark vignette at the edges. Sparse and purposeful: draw only the objects listed, with generous empty wall space between them, and no extra clutter, no posters, no decoration that is not listed. Cosy, warm and tidy: a Singapore international school classroom in the afternoon. Palette: cream and pale mint walls, pale wood, teal and purple accents, warm afternoon sunlight. Not photorealistic, not 3D render, no glossy shading, no watercolour bleed.
> 
> The floor band is plain wood-coloured floor from edge to edge. Keep the middle of the left edge and the middle of the right edge of the picture clear (bare wall), because the game draws small turn arrows there. Never draw boxes, panels, buttons, frames, arrows or placeholder shapes. Keep any lettering to a bare minimum and keep it simple and legible; no other text anywhere.

### L4

> The floor band is plain wood-coloured floor from edge to edge. Keep the middle of the left edge and the middle of the right edge of the picture clear (bare wall), because the game draws small turn arrows there. Never draw boxes, panels, buttons, frames, arrows or placeholder shapes. Keep any lettering to a bare minimum and keep it simple and legible; no other text anywhere.
> 
> This wall (the back wall of Classroom 5H, where the player starts). On the wall, left to right: a small poster headed RULES; a large timetable poster with a teal header bar reading 5H TIMETABLE and a grid of five rows for the school days and six columns of small coloured subject icons (pencil, atlas, flask, paintbrush, football, music note); a round white wall clock reading twenty to three (short hand between 2 and 3, long hand on the 8). Against the wall, left to right: a low wooden bookshelf with a few colourful books; a child's school desk with a pale wooden top and grey legs, a teal plastic chair behind it, on the desk a purple pencil case and a plain white envelope, and a purple school backpack on the floor beside it; a blue two-drawer filing cabinet with a hamster cage on top, a golden hamster inside with a wheel and a water bottle. Light comes from behind the viewer.

### L1

> The floor band is plain wood-coloured floor from edge to edge. Keep the middle of the left edge and the middle of the right edge of the picture clear (bare wall), because the game draws small turn arrows there. Never draw boxes, panels, buttons, frames, arrows or placeholder shapes. Keep any lettering to a bare minimum and keep it simple and legible; no other text anywhere.
> 
> This wall (the front of Classroom 5H, the teacher's end). Left: a tall teal double-door supplies cupboard with a small white label reading SUPPLIES. Middle: a wide whiteboard, almost empty, with a marker tray holding a red and a blue marker. Right: the teacher's desk, pale wood with two drawers, with a red mug, a small stack of books and an apple on it. Sunlight comes from the right.

### L2

> The floor band is plain wood-coloured floor from edge to edge. Keep the middle of the left edge and the middle of the right edge of the picture clear (bare wall), because the game draws small turn arrows there. Never draw boxes, panels, buttons, frames, arrows or placeholder shapes. Keep any lettering to a bare minimum and keep it simple and legible; no other text anywhere.
> 
> This wall (the window wall of Classroom 5H). A wide window with white frames filling the middle of the wall, showing a bright blue afternoon sky with a sun, one small cloud, a tiny distant aeroplane and round green tropical treetops. On the white window sill, four terracotta pots with bean plants at different heights (one just a shoot, one tall and leafy), each with a small white name label. A cream radiator with vertical ribs under the window. Nothing else. Light comes through the window.

### L3

> The floor band is plain wood-coloured floor from edge to edge. Keep the middle of the left edge and the middle of the right edge of the picture clear (bare wall), because the game draws small turn arrows there. Never draw boxes, panels, buttons, frames, arrows or placeholder shapes. Keep any lettering to a bare minimum and keep it simple and legible; no other text anywhere.
> 
> This wall (the door wall of Classroom 5H). Middle: a teal classroom door, closed, with a square window in its upper half, a small white sign reading 5H and a round brass handle. Right of the door: a wooden rail of coat pegs with one pale blue raincoat hanging from it, and below it a cardboard box on the floor labelled LOST PROPERTY with a red shoe and a blue hat poking out. Left of the door: a green recycling bin. Sunlight comes from the left.

Lessons: don't mention the turn arrows at all (the model draws them); tell it to keep the side walls, ceiling strip and vignette "exactly like the reference" or it flattens the wall.

## Portrait set (earlier the same day, before the brief): `c1-*.jpg` to `c4-*.jpg`, 3:4, kept for comparison

### Shared style text

> Background art for a children's point-and-click adventure game, portrait 3:4. One wall of a room seen straight on as a box in one-point perspective: the ceiling, both side walls and a floor band are visible, the horizon sits low so the floor is a band, not a field. The camera is a child's eye height. No people, no characters.
> 
> Style: polished flat illustration with clean dark-ink outlines on everything (heavier at the front), a shadow side on every object, soft cast shadows, one light source, a faint paper-grain texture and a gentle vignette. Cosy, warm, tidy and bright: a Singapore international school classroom in the afternoon. Palette: cream and pale mint walls, pale wood, teal and purple accents, warm afternoon sunlight. Lived in: ordinary clutter, children's things, plants. Not photorealistic, not 3D render, no glossy shading, no watercolour bleed.
> 
> The floor band at the bottom is plain warm wood-coloured floor from edge to edge. Nothing stands in the bottom left or bottom right corners. Do not draw any white boxes, rounded rectangles, panels, buttons, frames or placeholder shapes anywhere; the bottom corners are bare floor only. Keep any lettering to a bare minimum and keep it simple and legible; no other text anywhere.

### c1

> Style: polished flat illustration with clean dark-ink outlines on everything (heavier at the front), a shadow side on every object, soft cast shadows, one light source, a faint paper-grain texture and a gentle vignette. Cosy, warm, tidy and bright: a Singapore international school classroom in the afternoon. Palette: cream and pale mint walls, pale wood, teal and purple accents, warm afternoon sunlight. Lived in: ordinary clutter, children's things, plants. Not photorealistic, not 3D render, no glossy shading, no watercolour bleed.
> 
> The bottom left and bottom right corners of the picture must stay empty (plain floor), because the game draws turn arrows there. Leave a clear margin along the very top for a room label. Keep any lettering to a bare minimum and keep it simple and legible; no other text anywhere.
> 
> This wall (the front of Classroom 5H, the teacher's end): a tall teal double-door supplies cupboard on the left with a small white label reading SUPPLIES. A large whiteboard in the middle with a strip of coloured squares pinned above it, a marker tray with red and blue markers below; the board is almost empty, just a small doodled sun in the corner. The teacher's desk on the right, pale wood with two drawers, a red mug, a small stack of books and an apple on it. A small round rug in orange, yellow and teal on the floor to the left of the middle, and a grey metal waste bin. Sunlight comes from the right.

### c2

> Style: polished flat illustration with clean dark-ink outlines on everything (heavier at the front), a shadow side on every object, soft cast shadows, one light source, a faint paper-grain texture and a gentle vignette. Cosy, warm, tidy and bright: a Singapore international school classroom in the afternoon. Palette: cream and pale mint walls, pale wood, teal and purple accents, warm afternoon sunlight. Lived in: ordinary clutter, children's things, plants. Not photorealistic, not 3D render, no glossy shading, no watercolour bleed.
> 
> The bottom left and bottom right corners of the picture must stay empty (plain floor), because the game draws turn arrows there. Leave a clear margin along the very top for a room label. Keep any lettering to a bare minimum and keep it simple and legible; no other text anywhere.
> 
> This wall (the window wall of Classroom 5H): a wide window with white frames filling the middle of the wall, showing a bright blue afternoon sky with a sun, one small cloud, a tiny distant aeroplane and round green tropical treetops. On the white window sill, four terracotta pots with bean plants at different heights (one just a shoot, one tall and leafy), each pot with a small white name label. A cream radiator with vertical ribs under the window. Two floor cushions on the floor, one red on the left and one purple on the right, well away from the corners. Light comes through the window.

### c3

> Style: polished flat illustration with clean dark-ink outlines on everything (heavier at the front), a shadow side on every object, soft cast shadows, one light source, a faint paper-grain texture and a gentle vignette. Cosy, warm, tidy and bright: a Singapore international school classroom in the afternoon. Palette: cream and pale mint walls, pale wood, teal and purple accents, warm afternoon sunlight. Lived in: ordinary clutter, children's things, plants. Not photorealistic, not 3D render, no glossy shading, no watercolour bleed.
> 
> The bottom left and bottom right corners of the picture must stay empty (plain floor), because the game draws turn arrows there. Leave a clear margin along the very top for a room label. Keep any lettering to a bare minimum and keep it simple and legible; no other text anywhere.
> 
> This wall (the door wall of Classroom 5H): a teal classroom door in the middle with a square window in its upper half, a small white sign reading 5H, and a round brass handle; the door is closed. To the right, a wooden rail of coat pegs with one pale blue raincoat hanging from it. Below the pegs, a cardboard box on the floor labelled LOST PROPERTY with a red shoe and a blue hat poking out. To the left of the door, a green recycling bin and a blue bin against the wall. Sunlight comes from the left.

### c4

> Style: polished flat illustration with clean dark-ink outlines on everything (heavier at the front), a shadow side on every object, soft cast shadows, one light source, a faint paper-grain texture and a gentle vignette. Cosy, warm, tidy and bright: a Singapore international school classroom in the afternoon. Palette: cream and pale mint walls, pale wood, teal and purple accents, warm afternoon sunlight. Lived in: ordinary clutter, children's things, plants. Not photorealistic, not 3D render, no glossy shading, no watercolour bleed.
> 
> The bottom left and bottom right corners of the picture must stay empty (plain floor), because the game draws turn arrows there. Leave a clear margin along the very top for a room label. Keep any lettering to a bare minimum and keep it simple and legible; no other text anywhere.
> 
> This wall (the back wall of Classroom 5H, where the player starts): along the top of the wall a string of four children's paintings pegged up in a row (a house, a flower, a cat, a rocket). A round white wall clock at top right reading twenty to three (short hand between 2 and 3, long hand on the 8). Below the paintings, a large timetable poster with a teal header bar and a grid: five rows for the school days and six columns of small coloured subject icons (pencil, atlas, flask, paintbrush, football, music note). Low on the left, a small wooden bookshelf full of colourful books. A blue two-drawer filing cabinet on the right with a hamster cage on top, a golden hamster inside with a wheel and a water bottle. A leafy potted plant on the floor at the front right. In the foreground, a child's school desk with a pale wooden top and grey metal legs, on it a purple pencil case, a teal pot of coloured pencils and a plain white envelope. A purple school backpack sits on the floor at the front left, just next to the desk, not in the corner. A teal plastic chair behind the desk. Left side wall: a small poster headed RULES, angled with the perspective. Right side wall: a small world map poster, angled with the perspective. Light comes from behind the viewer.


## Corridor and library (evening, 28 Sept 2026): `../school/h1`–`h4`, `l1`–`l6`

Same shared landscape style text with the setting swapped ("a corridor in a Singapore international primary school…", "the library of … with warm wooden bookcases"), one paragraph of objects per wall, and the classroom crop `L-ref` as style reference. Two lessons: (1) ask for the places of moving things to be **empty** ("the purple locker has no door at all", "the left end of the cabinet top is empty") and generate those things as cut-outs, rather than editing them out afterwards; (2) always add "The room must be drawn exactly like the reference: a shallow box with the narrow side walls, the thin ceiling strip and the floor band all visible … the bookcase stands against the back wall with wall visible on both sides of it" or the model draws a flat wall with the bookcase cut off at the edge (it did, for three walls). Cut-outs: lockerdoor (unused: the door is cut from the wall instead), report, water, bonuscard, bunting, globe, headphones, cushions, trolley, knithamster, bell, one folded slip (recoloured for the other two: the model writes random words on paper, so ask for one and recolour).

## Art room and hall (29 Sept 2026)

Made the same way as the corridor and library walls, from the shared landscape style text plus one paragraph per wall, with a crop of a finished wall as the style reference. The padlocks were then removed from the STEM cabinet (`he`) and the paint cupboard (`ae`) with an edit prompt ("remove the padlock, leaving only the hasp plate; keep everything else exactly as it is"), because they change state, and generated separately as cut-outs on white: `layer-starlock.png` (brass, gold star), `layer-diallock.png` (grey, three blank white dials that the game colours in), `layer-drawer.png` (the drawer front in the stage), `layer-blocks.png` (a stack of three soft blocks), `layer-mallet.png`, `layer-starkey.png`. Close-ups: `closeup-bells.jpg` (the four bars straight on), `closeup-mothpainting.jpg` (the moth with a blank strip under it that the game paints the three stripes on), `closeup-stem.jpg` and `closeup-paint.jpg` (the open cabinet and cupboard with a folded slip on the lower shelf). Icons `item-music.png` and `item-note.png`. The white inside a padlock's shackle survives the flood-fill key and has to be cleared by hand.

## The flat, packing day (29 Sept 2026)

Twelve walls from a home version of the landscape style text ("a family's flat in a Singapore apartment block on a rainy afternoon, soft grey daylight; warm white and pale sand walls, light wood floor, teal and mustard accents, a little dusty pink"), with one finished school wall as the style reference. A crop as reference made the model draw the room as a small picture in a dark frame twice (the bedroom door wall); a whole wall as the reference fixed it. Doorways you walk through are prompted OPEN with a glimpse of the next room. Everything that moves or changes is left off the wall and generated on white: the empty left hook for the desk key, the bare desk top for the paper roll, the empty shelf ends for the snow globe and orchid, the bare fridge door for the postcard and drawing, the empty right half of the wardrobe rail for the jumper, nobody at the kitchen counter for Mum. Mum is drawn from behind (dark hair tied back low, a soft green-grey top), per the owner's photo, which is not kept. Close-ups: the key hooks with blank tags, Dad's drawer, the blanket fort with a blank sign and four blank squares, inside the fort, the jar cupboard with blank labels; the game draws every word and symbol on them so they match the code exactly.

## Portraits (30 Sept 2026)

`next/art/portraits/mary.png` (and `mary-grin.png`, the alternative): a head-and-shoulders portrait for the choose-a-child card, generated with the landscape style crop plus the owner's photos as references (the photos are not kept), then keyed on white. The prompt describes the look in words (long dark wavy hair in a low ponytail, big dark-brown eyes, a rust-orange t-shirt with a cream collar and a pine-tree-and-moon print) and the expression (a curious, slightly mischievous half-smile; the alternative a delighted grin). Elliot's and Zaina's cards show their initial until their photos arrive.

`next/art/portraits/elliot.png` (and `elliot-grin.png`): made the same way on 30 Sept 2026 from the owner's photos (not kept): straight dark hair with a fringe, round cheeks, dark-brown eyes, a plain cream t-shirt with a small teal cog; astonished, eyebrows up, mouth in a small "oh" (the alternative: eyes squeezed shut in a grin). Zaina's card shows her initial until her photos arrive.
