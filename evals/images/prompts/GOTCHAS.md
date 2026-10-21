# Gotchas: every fault called out on the Classroom 5H wall, and what the prompt does about it

Compiled 21 Oct 2026 from the sweep (31 models) and round two (6 models), the owner's marks and Claude's sheet. Each line is a fault that happened at least once. The third column is the prompt's answer; "game" means the prompt cannot prevent it reliably and the game draws that part instead, which is already the playbook's rule for anything a puzzle reads.

| # | Fault seen | Who called it | Prompt's answer |
|---|---|---|---|
| 1 | Turn arrows or chevrons drawn on the side edges | both, 4 pictures | Never mention arrows. Say the side edges are bare wall. |
| 2 | The room drawn as a framed picture on a dark ground, or with a border round the frame | both, 3 pictures | "The picture fills the whole frame edge to edge: no border, no margin, no frame, no dark surround." |
| 3 | Composed as a square with empty margins | owner (MAI 2.5 Pro) | Same line as 2, plus "the wall runs the full width of the picture". |
| 4 | Flat wall when a box was asked; bookshelf cut off at the edge | Claude (Qwen twice) | Keep the box sentence and add "the whole bookshelf is inside the picture with bare wall to its left". |
| 5 | Clock at the wrong time, or with three hands | both, 14 pictures | Game. Ask for a blank face with no hands. |
| 6 | Timetable: days garbled, missing, duplicated, rows blank, icons random, every row identical, random colouring, uneven emphasis | both, most pictures | Game. Ask for the header bar, an empty grid of pale lines, and the six icons once in a row across the top; the game draws the days and the cells. |
| 7 | Rules poster grows invented rules | both, 9 pictures | "With no words on it, only a few blank lines." Confirmed in round two: 6 of 6 clean. |
| 8 | A name on the desk, FOR 5H on the envelope, titles on book spines (one a real book) | both | "No name plates, no labels, no writing on the envelope, the books have plain blank spines." |
| 9 | Hamster cage open, escapable, a tank, bottle sticking out, hamster too big | owner, 7 pictures | "A wire cage with a solid lid, fully closed, the bottle hanging inside; the hamster small, the size of a fist." Confirmed in round two: 6 of 6 closed. |
| 10 | Chair looks off; chairs facing the wrong way | owner, 6 pictures | "The chair pushed in under the desk with its back to the viewer; desk and chair drawn from the same child's-eye height." Round two: tucked in 6 of 6, better but not yet natural. |
| 11 | Desk too close to the back wall | owner, 2 pictures | "The desk stands a step out from the wall, with floor showing between its legs and the wall." |
| 12 | Objects too spread out; objects too small for the room | owner, 3 pictures | Replace "generous empty wall space" with "a little bare wall between the objects" and give sizes: "the desk reaches a child's waist, the cabinet is about desk height plus the cage, the timetable is about as wide as the desk". |
| 13 | Books on top of the bookcase instead of inside | owner (Seedream Lite) | "The books standing on the shelves inside the bookcase." |
| 14 | Window, plant, bins, storage boxes, stripes, a display rack: things not asked for | both, 8 pictures | "Nothing else: no window, no plant, no boxes, no bins, no pattern or stripes on the wall." |
| 15 | Missing objects: the desk, the hamster, the envelope | owner (FLUX), Claude (Qwen) | A numbered object list, one per line, so each is easy to check. |
| 16 | Too flat, childish, basic; or dark and hazy | owner, many | The rendered style sentence (shadow side, cast shadows, finishing) plus "bright and clear, not hazy or dark; drawn for a game, not a picture book for toddlers". |
| 17 | Lettering garbled (Tuee, Soday, Firday) | both (FLUX, Krea) | Only two words are asked for: RULES and 5H TIMETABLE. Everything else is game-drawn or blank. |
| 18 | Furniture crowded into the right half, the left half of the wall empty (round three: Seedream Pro, Nano Banana Pro) | Claude | Caused by "bare wall to its left" and "left to right". Say instead: "the bookshelf in the left third of the wall, the desk in the middle third, the cabinet in the right third, so the wall is evenly filled". Goes into v4. |

Round three (v3 prompt) result: four of six pictures showed no gotcha at all (Sunburst, Seedream Pro, Nano Banana Pro, Nano Banana 2), MAI 2.6 kept one sliver of window, Qwen 2.1 Pro ignored the room shape and object order for the third time. The prompt is no longer the reason a picture fails; what fails now is the model.

Not the prompt's to fix, and recorded so nobody tries: the model's native size (OpenAI 1536×864, Microsoft 1360×768); a model that ignores the box twice running (Qwen 2.1 Pro); a model that writes on every surface however it is told (MAI 2.6, so far).

## Prompt-ready block

The lines below are the tail of `wall-c4-v3.txt`. Keep them short and positive where possible; a long list of "do not" can make a model draw the very thing. They stay in every wall prompt until a round shows a line is no longer needed.

> Checks: the picture fills the whole frame edge to edge, no border, no margin, no frame, no dark surround. The side edges are bare wall. No arrows, boxes, panels or buttons anywhere. The only words in the picture are RULES and 5H TIMETABLE: no name plates, no labels, no writing on paper or books. The clock face is blank with no hands. The timetable grid is empty. The cage is closed with its lid on. Nothing is drawn that is not in the numbered list.
