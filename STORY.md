# The Moth House — story plan

Version 2, agreed with the owner on 28 Sept 2026. This is the plan every room is built from. Items marked **TO DECIDE** are still open; don't invent answers for them, ask the owner.

Visual storyboard (private to the owner): https://claude.ai/artifact/GSA3zJy7cGeYvket4dReeA

## The story in one line

Players choose whose story to play: Mary's, Elliot's or Zaina's. All three follow the same summer: the last day of school in Singapore, packing, a 14-hour flight to London, then Nana and Jedi's house in Enfield, Trent Park and the hidden Moth House, whose lights have gone out. Each child meets different places and puzzles made for their age and character. When all three stories are finished they come together for one shared finale, where the children find out that Nana found the Moth House first, when she was a girl.

## Audience and tone

- For children, as a first taste of modern point-and-click games, while still satisfying grown-ups who have finished every escape game going.
- Cosy mystery: curious, warm, a little magical. Never frightening.
- **Singapore is the ordinary world:** home with Mum and Dad, school, the rainy season. Bright, tidy and familiar.
- **Enfield and Trent Park are where magic happens:** long summer evenings, woods, lakes, mist. The Moth House appears only at dusk.

## Fiction and legal safety

The owner's rule: stay as close as possible to real life without anything that could get him sued.

- **Fictional schools, close in spirit to the real ones.** Mary and Elliot go to **Knightsbrook International School**. Zaina goes to **Little Waves Kindergarten**. Never use the real schools' names, logos, uniforms, crests, staff names or addresses.
- **No real brands or trademarks** in art, text or item names: no airline names or liveries, no toy brands, no shop names. In particular, **never show the Merlion**: it is a protected symbol in Singapore and using it without permission can be an offence. Generic Singapore things are fine (kaya, durian, orchids, hawker food, HDB-style flats, rain).
- **Real places used fictionally.** Trent Park, Enfield, Camlet Moat, the Obelisk and Trent Park House are real public places and can appear. Show them in general terms, don't imply any organisation endorses the game, and check facts before stating any history. The Moth House is invented.
- **No real people** other than the family characters the owner chose. Teachers, flight attendants and other characters are invented, with invented names.
- **A fiction notice** in the game's credits or about screen: "This is a work of fiction. Its characters, schools and events are imaginary. Real places appear in a fictional way, and no organisation is connected with or endorses this game."
- For a paid or large-scale commercial launch, the owner may want a lawyer to take a quick look. These rules reduce risk but aren't legal advice.

## Choosing a story

The game opens with the OG Entertainment start-up, then a title screen with Continue or New game (owner, 30 Sept 2026). New game shows the three children; tapping one starts that child's story. Each story can be played on its own and in any order. Progress is saved per child (postcards home act as saves). The finale opens only when all three stories are finished.

| | Mary | Elliot | Zaina |
|---|---|---|---|
| Age | 10 | 7 | 4 |
| School | Knightsbrook International School | Knightsbrook International School | Little Waves Kindergarten |
| Plays like | A proper puzzle game: reading, codes, maps, working things out. The hardest story; grown-ups will enjoy it. | Hands-on puzzles you can see working: building, fixing, gears, levers, plugs, counting, patterns. | Tap, find and match: colours, shapes, counting to five, hidden things, animals. The gentlest story. |
| Reading | Full sentences, notes, riddles, mirror writing. | Short simple words; pictures carry every clue. | None needed; every clue is a picture; lines can be read aloud. |
| Hints from the moth | A nudge in words. | A picture of what to try. | The moth flies to the right spot. |
| Difficulty | 3 to 5 dots, plus Night Moth challenges | 2 to 3 dots | 1 to 2 dots |

## How rooms work

The owner's rule for every room in the game:

- **Each room is a box.** The player faces one wall at a time and turns with left and right arrows at the edges of the scene. Things the player needs can be on any wall of the room.
- **Rooms can be square or rectangular.** A square room has 4 views. In a rectangular room each long wall has two views, so a long room has 6: turning right steps along a long wall, then round the corner.
- **Walls don't have to be equally busy.** Some hold puzzles; some are quiet, with just a picture, a line of description, or a hidden paper moth.
- **Doors link rooms, one door per wall at most.** Tapping a door walks through it, and the player arrives facing into the new room (away from the door they came through, as in real life). Outdoor places work the same way, with a gate or path as the "door".
- **Close-ups** zoom into one object, such as reading a postcard or working a lock, with a button to step back.
- A small label on the scene always says which room the player is in.

## Visual style

### Brief, version 3 (owner, 28 Sept 2026, being written up point by point)

1. **Landscape.** The game is played in landscape, so every scene picture is drawn for a wide screen (16:9), with the inventory in a strip of slots along the bottom edge, outside the picture.
2. **Clean and purposeful.** Rooms are sparse and tidy: almost everything on screen is part of a puzzle or a hint. No decorative clutter for its own sake. (This replaces the earlier "lived in" rule below.)
3. **Inventory always visible** as a row of empty slots under the scene, so the player always knows what they are carrying.
4. **Close-ups bring the object towards the player** while the room stays visible behind it, softened, so the sense of place is never lost.
5. **Characters have expressive faces** (surprise, worry, delight) drawn in the same flat-ink style. For children: warm, never gory, no blood, nothing frightening.
6. **Small arrows at the left and right edges** of the scene, halfway up, show where to tap to turn. The middle of each side edge stays clear for them.
7. **Micro-animations.** Not everything, but the things a child would poke move when tapped: a plant bends, a coat swings, a hamster hops. (Owner's feedback on the classroom test, 28 Sept 2026.) **Rule:** anything that moves is its own cut-out with a transparent edge, drawn over a wall it has been removed from, and it moves organically (a plant bends more at the tip, a coat's hem lags, a hamster squashes and stretches). Never shift a rectangle of the background: it looks like a shaking sticker.
8. **Inventory pictures** are drawn to the same standard as the walls, never small vector icons.
9. **Sound and music** while playing: soft tap and paper sounds, and a gentle background track, starting after the first tap as browsers require, with an on/off switch. Every sound clue is also shown. Music must be a real tune with a melody, chords and bass, never random notes. Music is generated with Google's Lyria model through the Gemini API (same key as the pictures); the composed music-box waltz in the engine is the fallback. Other options in the owner's ecosystem: the YouTube Audio Library (free, human-composed, check each track's licence) and MusicFX in Google Labs.
10. Inspiration is the feel of modern point-and-click escape games in general. Never copy their characters, rooms, names or imagery; the prompts for generated art describe qualities, never other games.

Pictures can be generated (see `next/art/`, prompts in `PROMPTS.md`) or drawn in code; the same rules apply to both. The rules below from the earlier version still hold except where the brief above changes them.

### Earlier rules (agreed 28 Sept 2026, morning)

Drawn in code as SVG, to a polished flat-illustration standard. Rules for every wall:
- **A box in one-point perspective:** ceiling, side walls, back wall and a floor band, drawn by the engine; the horizon sits low so the floor is a band, not a field.
- **Ink outlines** on everything (heavier at the front), a shadow side on every object, cast shadows, one light source per wall, paper grain and a vignette over the whole picture.
- ~~Lived in~~ Replaced by brief point 2: sparse and purposeful. A pet or plant may stay where it is part of a puzzle or hint (Nutmeg, the bean plants).
- **Everything tappable breathes** with a soft golden glow, the key item sparkles, and no tap target is smaller than a fingertip. Doors and hidden paper moths don't glow.
- **The turn arrows sit at the left and right edges, halfway up** (brief point 6). Keep those edges clear.
- **Side-wall items** are angled gently and zoom when tapped.
- **Clues are pictures where possible:** the timetable uses a coloured icon per subject, with a key in the close-up.
- **Palette:** Singapore bright and tidy (cream and mint walls, pale wood, teal and purple accents, warm afternoon sun); Enfield and Trent Park in long golden evenings (deeper greens and browns); the Moth House in dusk blues with lantern glow.
- **Type:** two faces only. Caprasimo for titles, room labels and menus; Atkinson Hyperlegible for everything the game says, including notes (italic for a handwritten note).
- **Clocks and details must match the story:** the classroom clock reads twenty to three, before the last bell at three.

## Characters

- **Mary (10).** Notices patterns, reads everything.
- **Elliot (7).** Wants to know how things work.
- **Zaina (4).** Sees the small things; animals trust her. Never without **Peanut**, her small soft toy elephant (generic design; no brand shown).
- **Nana.** Grandmother in Enfield. Always just "Nana". Warm, knows more than she says. Found the Moth House as a girl; the faded portrait in the Moth House is her.
- **Jedi.** Grandfather in Enfield. Cheeky but lazy: always "just resting his eyes", bargains with biscuits, and takes the credit for everything the children do. Secretly on their side.
- **Mum and Dad.** At home in Singapore. Each child sends them a postcard at the end of each stage.
- **The moth.** A gentle guide whose wings glow like a night light: soft golden-cream wings with dusky-rose eye-spots, a plump brown body, feathery antennae and big kind eyes (portraits `next/art/portraits/moth.png` and `moth-speak.png`, 30 Sept 2026). It is there from the first day, watching from the classroom window, and follows each child all the way to the Moth House; only there do they learn why. It is the one voice of the game (owner, 30 Sept 2026): it whispers the hints, reads notes and letters over the child's shoulder, narrates the stage cards and reads the postcards home, in one soft, warm, slightly whispery voice recorded once per line. Nutmeg, Captain and Peanut can still be tapped for help, but it is the moth who speaks. **TO DECIDE:** its name (no recorded line says it, so it can be chosen at any time).
- **Miss Okafor** is Elliot's (invented) teacher in class 2P; **Captain**, the class goldfish, is his hint-giver (tapping the tank gives the hints). **Miss Lin** runs Little Waves and gives Zaina her moth sticker. **Priya** is the flight attendant all three children meet on the plane. All invented.
- **Nutmeg.** Class 5H's hamster. Tapping his cage opens Mary's notebook, like the moth button. Rule 3 of the class rules: feed Nutmeg once a day, never twice.
- **The Moth House.** Appears at dusk to people who are looking. Each moth-light brought home wakes a room.

## The journey

Every story passes through six stages in the same order. The finale and epilogue are shared.

1. Last day of school (Singapore)
2. Packing day (Singapore)
3. The 14-hour flight to London
4. Nana and Jedi's (Enfield)
5. Into Trent Park
6. The Moth House (Trent Park woods)
7. Finale: all the lights (together, after all three stories)
8. Epilogue: home again (Singapore)

## Launch plan

Decided on 28 Sept 2026 (the owner left it to Claude):

- **Part 1: Leaving Singapore** is the first release: stages 1 to 3 for all three children, so nine small rooms. Each story ends with a small magical moment on the plane, and all three end with a short shared teaser: as the plane comes down over London at dusk, a glow flickers in the woods below.
- **Part 2: The Moth House** follows as an update: stages 4 to 6, the finale and the epilogue.
- Build order: the choose-a-child screen and shared systems (hints, saves, postcards), then Mary's stages 1 to 3 (her packing draft already exists), then Elliot's, then Zaina's. Owner testing after each room.
- **Built (28 Sept 2026):** all nine Part 1 stages are playable in `next/`. Mary's flight, Elliot's three stages and Zaina's three stages live in `next/stages/`. Elliot's packing day reuses the family flat's living room and kitchen (the batteries are in the kitchen drawer); all three flights share the same cabin, each child seeing their own things in it. Zaina's hints are different: the moth turns her to the right wall and makes the thing pulse, with one short line, because she can't read yet.

## Mary's story (age 10)

### Stage 1: Last day of school — Knightsbrook International School — difficulty 3

Version 2 (29 Sept 2026), designed after reading how Rusty Lake and Dark Dome structure their puzzles: the goal is visible early, three threads run in parallel, each ends in a lock that needs two different kinds of input, clues cross rooms, and every thread yields one piece for the final lock. The school flavour is borrowed safely from a real Singapore school on one floor of an office tower: an indoor hall used for assembly, a small library with a story chair, lockers and lost property in the corridor, an art room with a drying rack, house points, monsoon rain outside.

**Five rooms**, all square, doorways drawn open:
- **Classroom 5H** (whiteboard wall with the key to the timetable pictures; window wall with the bean plants; door wall to the corridor with coat pegs and lost property; timetable wall with Mary's desk, Nutmeg and the clock at twenty to three). She starts facing her desk.
- **Corridor** (the lockers; the open library doors with the fountain and trophy cabinet; the notice board with the bonus card and the open doorway to the hall; the open doorway to 5H and the open doorway to the art room).
- **Library** (Science and Music shelves with the globe and rocks; window seat and storytime chair; open doors back and Mrs Ng's desk; Art shelf, returns trolley and Stories shelf).
- **Art room** (drying rack with four paintings, one of them Mary's moth; the paint cupboard with its three colour dials and the shelf of paint pots; open doorway back and a shelf of clay creatures; the sink with the brush jar and three aprons, one splattered with paint).
- **Hall** (the stage with four coloured chime bars under a HAPPY HOLIDAYS banner; the STEM week cabinet with a star on its lock; the open doorway back and a bench; the indoor playground with a stack of soft blocks and a little slide).

**The goal, seen early:** Mary's purple locker in the corridor, three dials. The envelope on her desk holds all three riddles at once, so all three threads open together.

- **Thread A, Science.** Riddle 1 ("At night I'm full of lights, but I'm not a city") → *The Night Sky* on the Science shelf holds a note: "The key to the stars is in my art apron, the one with the paint on it. Mr H" → the splattered apron in the art room → a small key with a star on it → the star-locked STEM cabinet in the hall → slip "SCIENCE on THURSDAY". (item + pairing symbol; library → art room → hall)
- **Thread B, Music.** Riddle 2 ("eighty-eight keys, but I can't open a single door") → the Music shelf has a gap and a sticky note "Returned today. See the trolley" → *Playing the Piano* on the trolley holds a page of music with four coloured notes → the four chime bars on the hall stage, struck in that order → the stage drawer opens → slip "MUSIC on TUESDAY". But the beater is missing: it is under the soft blocks in the hall's indoor playground; tapping the blocks topples them. (item + sequence; library → hall)
- **Thread C, Art.** Riddle 3 ("full of colour, but I'm not a rainbow; brushes are my best friends") → *The Painting Book* on the Art shelf holds a note: "Your slip is locked in the paint cupboard. My moth knows the colours. Mr H" → the drying rack: Mary's painting is the moth, with three colour stripes under it → the paint cupboard's three colour dials, checked only when you tap Open → slip "ART on WEDNESDAY". (observation + code; library → art room)
- Built values: the tune is green, red, blue, yellow (page 12 of *Playing the Piano*, drawn by the game); the moth's stripes and the cupboard's dials are purple, green, orange (the dials turn through the six pots on the shelf: red, yellow, blue, green, orange, purple). The star key waits in the splattered apron's pocket only once the Night Sky note has been read; the beater lies under the soft blocks and can be found any time.
- **Convergence.** Three slips → the timetable on the classroom wall, read with the picture key Mr Hollis drew on the whiteboard → 4, 3, 6 → the locker → report and Nana's postcard. The last bell.
- Timetable: Mon En Ma Sc Ar PE Mu · Tue Ma En Mu Ge Sc Li · Wed Sc Ma En PE Mu Ar · Thu En Ar Ma Sc Li PE · Fri Ma Mu Ar En PE Sc.
- **Night Moth:** the bonus card on the corridor notice board: "Someone in London loves postcards and moths. Spell her name with the first letters of four stories." On the Stories shelf, *Nobody's Garden*, *A Quiet Moon*, *Nine Lanterns* and *Along the River* spell NANA.
- Mr Hollis is Mary's (invented) teacher; Mrs Ng the (invented) librarian. Everyone else is at the goodbye party. The moth gives the hints everywhere (tapping Nutmeg opens the notebook too).

### Stage 2: Packing day — the family flat — for players of 12 to 15

Version 2 (16 Oct 2026): the first level built from the owner's own materials (the flat's floor plan, photographs of every room and the view, and of Mum, Dad, Nana and Jedi; none of it kept in the repo), and the model for every level after: materials first, the design on paper approved, then the pictures. Built to the playbook (4c, 4t, 4u, 4v) and aimed above Mary's age, at 12 to 15, so the three stages after it are not easier than the one before.

The afternoon before the evening flight. A Singapore rainstorm on the glass, clearing to a gold evening as the packing gets done. Mum is cooking an early dinner, Dad is in the shower behind the en suite door, Elliot is building on the living-room rug, Zaina is cooking a torch in her toy kitchen. Nana's postcard arrived this morning and is pinned in Mary's room.

**Mum's words, on the card:** "Your case, packed and zipped before the taxi. My list is on the fridge. The three things that are not on the list are the ones that matter, and your father has hidden all three."

**Nine places**, laid out as the flat is (the dining end is the hub; the corridor leads to the bedrooms): **Mary's room** (the loft bed with the desk under it, bare; the window with the music stand and the sill of frames; the grey sofa with the open suitcase on the rug; the wardrobes, the pinboard and the door down the hall; the level opens facing the loft bed), **Elliot and Zaina's room** (the sticker-covered bunks with the photo wall and pinboard above; the cube wall with the clock; the window and the patchwork chair; the toy kitchen, the doll's house and the felt animals by the door), **the corridor** (the dining end, Mary's door, the children's door and the children's bathroom standing open, the parents' door), **Mum and Dad's room** (the bed and winged headboard; the window with the tower, the palms and the hill; the chest of drawers and the driftwood lamp; the desk; the en suite door shut with the shower running behind it, through which Dad talks), **the living room** (the L-shaped sofa with its cushions and the games drawer; the balcony doors, plants and view; the fairy lights and the shelf unit; the navy armchair and the round rug), **the dining end** (the pine table and tall chair under the white lamp; the world-map wall with the red banners; the bookcase and piano; the kitchen door and the double door to the lobby), **the kitchen** (hob and oven, the fridge of papers, the clock, the door to the yard), **the yard** (the drying rack, a shelf of cardboard boxes each with a child's drawing on it) and **the lift lobby**, the final scene.

- **Trail A, the passports.** Dad, through the bathroom door: "Passports are in my drawer. The code's what it always is: when we take off." The chest of drawers has a four-digit lock. The booking on the fridge reads boarding 21:05, departure 22:45, arrival 05:50, taxi 18:30, with Mum's note stuck across it: "flight moved an hour EARLIER". The drawer opens on 2145.
- **Trail B, the torch.** Nana's postcard asks for her old red torch, "it was mine before it was yours". It is in the toy oven, and Zaina will not give up her cake until she has Peanut, who is lost. Elliot: "She had him on the sofa." The sofa close-up lifts each cushion; Peanut is under the fourth, the games drawer beneath a false trail. Peanut to Zaina, torch to Mary; Zaina carries Peanut to the sofa and falls asleep.
- **Trail C, the present.** Dad: "Nana's present is in the yard, in a box, wrapped in the moth paper. I put it in the one Elliot drew on." Four boxes carry four drawings (a flower, a rocket, a cat, a moth); Elliot's rocket is on the fridge and on the children's pinboard, signed as he signs everything, with a small cog. The rocket box holds the kaya jar; the others hold Christmas lights, a broken fan and a spider.
- **The list** for pacing: the jumper, dry on the yard rack; the toothbrush with the star from the bathroom cup; and the library book that must not go in (Mum's list underlines it; packed, it comes out again with a line).
- **Convergence.** Passports, torch, present, jumper and toothbrush in, the case zips (the drag along the zip, kept from version 1). Mum calls that the taxi is downstairs. The lobby: Dad out at last in his rust shirt with the big cases, Mum with Zaina asleep on her shoulder, Elliot with his backpack, the lift opening. Postcard home, written in the taxi with Mum and Dad beside her, "because Nana says write everything down".
- **Who moves (4t):** Zaina, toy kitchen to the sofa asleep once she has Peanut; Mum, the kitchen, then the children's room folding, then the lobby; Dad, a voice behind the door until the case is zipped, then the lobby. The light: rain until two of the three hidden things are packed, then clearing, gold by the lobby.
- **Night Moth: Nana's postcards.** Five old postcards on Mary's board, pictures and dates, names faded. The dining-room map carries Dad's pins, each labelled with its place and a tiny copy of the postcard's picture. Match cards to pins, read the places in date order (Athens 2018, Tromsø 2019, Trent Park 2021, Istanbul 2023, Cornwall 2025), take the first letters: ATTIC. Mary's diary has a five-letter padlock Nana set; inside, Nana's note: "The moth is real. Ask me in the attic." A new kind after the riddle, the paper moths, the crossword, the secret alphabet and the tap code, pointing straight at Nana's house.
- **Harder than Trent Park:** nine places; every lock has decoys beside the answer on the same sheet; the people say things once; the first two hint steps say where to look, never what to do; nothing glows until it has been seen.
- **Looks (from photos, 16 Oct 2026, not kept):** Mum as decided, in a bright blue dress with yellow stitching; **Dad**: short dark hair going grey at the temples swept back, thick dark brows, warm brown eyes, a short salt-and-pepper beard, olive skin, a big open smile, a rust linen shirt; **Nana**: shoulder-length straight white hair with a side parting, thin metal-rimmed glasses, olive skin, dark brows, a wide warm smile, a small pendant and a gold bangle, plain dark tops with white trousers or jeans; **Jedi**: short dark hair thin on top, thin metal-rimmed glasses, clean-shaven, a warm half-smile, olive skin, a blue and white gingham shirt, sometimes a navy jacket, a gold ring. The invented Nana and Jedi of stages 4 and 5 are redrawn to these.

Version 1 (28–29 Sept 2026, kept for the record): three rooms, Mum's list, the torch in Elliot's fort behind a sun-star-moon password, the passports in Dad's stuck desk drawer, the kaya wrapped in moth paper and taped, six paper moths as the Night Moth.

### Stage 3: The flight — her seat, the flight map, the magazine — difficulty 4

Version 2 (13 Oct 2026), built in the landscape engine to the same shape as the school and the flat: the goal seen first, three trails open at once, each needing two inputs, clues crossing rooms, nothing shared with the other children's stories. Hour thirteen of fourteen, somewhere over Europe, the cabin dark; Elliot and Zaina asleep across the aisle, Mary the only one awake in row 34.

**Two rooms**: **row 34** (the seat-back in front with its dark screen, latched tray and pocket; the window at dawn; across the aisle, Elliot and Zaina asleep under their blankets, Zaina hugging Peanut; back down the aisle to the galley curtain) and **the galley** (Priya at the counter with the breakfast trays and two wall clocks labelled SINGAPORE and LONDON; the toilet door; the bulkhead with the big screen; the curtain back).

**The seat pocket** holds the goal and the three threads at once: a folded note poking out, written entirely backwards; the flight card ("Landing: 13:40 Singapore time"); and Cloud Nine, the in-flight magazine.

- **Trail A, wake the sleepy screen (a card, and two clocks in another room).** The seat-back screen is asleep and asks for the local time at landing; it shows 13:40 and wants London. The flight card gives the landing time in Singapore time; the galley clocks show 12:40 and 05:40 side by side, seven hours apart. Set 06:40 and tap Wake: the map appears on the seat-back screen and on the big screen in the galley. Priya gives the seven-hours tip, but only once the screen has been tried and refused (the person-gives-a-clue rule). A wrong time blinks and waits.
- **Trail B, read the backwards note (an item and a dark shiny surface).** Held up to the dark seat-back screen (before it wakes), or, through the toilet door, to the mirror over the basin (the toilet is a room of its own, so the mirror is seen before the note goes on it), the writing turns the right way round: "Look at the map. Find the moth. It knows the way. – N." The moth reads the backwards note as Mary sees it, never the words.
- **Trail C, the magnifying glass (a page, then a person in the other room).** The magazine's Junior Explorer page: free magnifying glass, ask the crew. Priya hands one over.
- **Convergence.** The map, awake, shows London as a dot with a smudge beside it. The magnifying glass on either screen opens London big as a page, with four felt-tip doodles someone has drawn on it: a boat on the river, a star to the west, a bird to the east, and a moth beside Enfield. The note says which: tap the moth and it glows, "Cabin crew, seats for landing", and the postcard home: Wheels down.
- **Who moves (playbook 4t):** Priya. Behind the galley counter with the breakfast trays until the screen is woken; from then on (an hour to landing) she is in the aisle behind Mary's row with the breakfast trolley and the counter is empty; she gives the magnifying glass and the time tip wherever she is, and the hints follow her. The stage opens on the window wall, a turn away from the pocket.
- Priya is the second person to give a clue, a cut-out lifted from a rendering of the galley wall (invented, no airline). The cabin is three-quarters full of sleeping strangers; every seat faces the front; across the aisle Elliot and Zaina are seen in profile. The magnifying glass is a lens on other things too, for fun (clouds, Zaina's nose, the clocks).
- **Night Moth:** the magazine crossword, four clues with a choice of words; the gold first letters spell KAYA, the word on Nana's postcard. The notebook notes it; the postcard's P.S. says it.
- Who is N, and who is flying with the children, is not said (open decision 3).

### Stage 4: Nana and Jedi's — Nana's attic and the hallway photos — difficulty 3

Version 2 (14 Oct 2026), built in the landscape engine to the playbook (4c, 4t): the goal named on the card, three trails open at once, each lock needing two inputs from two rooms, nothing shared with the other children's stories, the opening view bare of clues, a real house's layout, one person who moves. Enfield, the first evening, long gold light; Nana and Jedi collected the children at the airport (Mum and Dad are at home in Singapore). Elliot and Zaina are asleep on the sofa.

**Five rooms** of a semi: the **hall** (front door and coat hooks; the stairs with five framed photographs climbing the wall, each with a brass plate; the hall narrowing to the kitchen door with the living room off it; the hall table, telephone, Nana's handbag, the mirror and the cupboard under the stairs), the **living room** (Jedi asleep in his armchair with a pole with a brass hook leaning by the telly; the mantelpiece, clock and wedding photo under a painting of the park; the sofa, bookcase and wireless; the doorway back), the **kitchen** (Nana at the counter with the tea; the dresser with the red biscuit tin on its top shelf, the table, a calendar; the back door open to the garden; the fridge and larder), the **landing** (the attic hatch in the ceiling with its cord out of reach; the spare room door open on Mary's suitcase; the bathroom and airing cupboard; the stairs down) and the **attic**, pitch dark until the torch is on (the shelf with Nana's green tin; the trunk and the doll's house; the round window on the park at dusk, with a tiny light in the trees; the ladder down).

**Nana's words, on the card:** "There is something of mine in the attic, from when I was nine. If you can get up there."

- **Trail A, the way up (a person who bargains, in two rooms).** The hatch cord is out of reach. Jedi has the pole, and wants a biscuit for it; the biscuit tin is on the dresser's top shelf and Nana says not before tea, unless Mary has brought her something. The present (the kaya from packing day) is in Mary's suitcase in the spare room: Nana, delighted, hands down two biscuits. One to Jedi, who gives up the pole without opening his eyes and takes the credit; the pole hooks the cord and the ladder comes down.
- **Trail B, the code (words scratched on the tin, and the photos in the hall).** The tin's lid is scratched AGE 9. KEEP OUT. THIS MEANS YOU, TOM. The plates on the stair photographs read Baby Nana 1958, Nana and Tom, Wedding day 1984, Mum at school 1991, Elliot walks 2020. Nine years after 1958: the dials go to 1967.
- **Trail C, light (the torch Nana asked for, carried from packing day).** The attic is pitch dark; nothing can be read. The torch is in the suitcase, as Nana's postcard asked. One click and the beam swings round the attic.
- **Convergence.** In the lit attic the tin opens on marbles, a badge, a pressed flower, a conker and a folded map: Nana's Trent Park in pencil and crayon (the lake, the obelisk, Camlet Moat, the big house) with a little house in the trees, a moth drawn over it and a dotted line to it, which is on no real map. Show Nana: "My map." She looks at the little house, and at Mary. "Well. Go on, then." Postcard home.
- **Who moves (4t):** Jedi, from his armchair (pole beside him) to the kitchen table with his biscuit once he has it, the armchair empty and the pole gone; the hatch from shut to open with the ladder down. Nana stays at the counter: she is the end.
- **Night Moth:** Nana's secret alphabet. Inside the tin's lid she pencilled a key (every letter with a shape beside it, a pigpen cipher); on the back of the map four shapes spell DUSK, the hour the Moth House appears. A new kind of challenge after the riddle, the paper moths and the crossword.
- **Looks (invented, until the owner sends photos):** Nana has short silver-grey hair, round glasses, a lilac cardigan and beads; Jedi is bald on top with white hair at the sides, a big white moustache, a checked shirt with red braces and tartan slippers. Nana's brother Tom is a name on a plate only.

### Stage 5: Trent Park — the big house, the obelisk and Camlet Moat — difficulty 4

Version 2 (14 Oct 2026), built in the landscape engine to the playbook (4c, 4t, 4u): three trails open at once, each needing two things from two places, the opening view bare of clues, a real park kept to its real layout, one person who moves, a new kind of Night Moth challenge. The next evening, long gold light turning to dusk; Nana, Jedi, Elliot and Zaina at the café on the lawn. Mary has Nana's map from the tin in her strip from the start.

**Five places:** the **lawn** by the café (Nana, Elliot and Zaina at a table, Zaina's spade on the grass; Jedi asleep on a bench with his stopped watch; a finger-post with four blank fingers, a short cut to each place; the big house up its slope), the **terrace** of the big house (the museum door standing open; a stone urn and, set in the wall, a brass speaking-pipe mouthpiece with a little brass lamp that flashes; the steps down; the long avenue to the obelisk), the **listening room** in the basement, now a museum (the listener's desk with the tape recorder and headphones and the pipe's other end; the cabinet of hidden microphones and the framed code card; the listeners' box with its one big button; the stairs up and the museum's notice), the **obelisk** at the far end of the avenue (its long shadow across a ring of stones with the hours painted on them; the old tree at the wood's edge where the shadow points, with a hollow in its roots; the avenue back; the path into the wood) and **Camlet Moat** (the moat and its island with a plank bridge, both hands on the rail, nobody near the water; the ribbon trees with their carvings; the path back; an old brick wall with a little arched iron gate, locked).

**Nana's words, on the card:** "The little house is past the obelisk, in the trees by the moat. It only shows itself at dusk, to someone who is looking. Back by dark."

- **Trail A, the listeners' word (the terrace and the basement).** The lamp by the speaking pipe flashes a pattern over and over, with a knock from the pipe at each flash: 1, 5; 1, 1; 4, 2. The museum's framed card is the listeners' tap code, a 5×5 grid, a tap for the row and a tap for the column, C and K sharing a square. The listeners' box opens on the word the lamp sends, tapped back on its button: E, A, R. Inside, among the museum's replicas, a folded paper the plate says was found inside the speaking pipe: a note in a nine-year-old's hand, signed N.: through the little gate in the old wall, at dusk, to someone who is looking; the key buried where the obelisk's shadow points; "If you're reading this, bring them home."
- **Trail B, the buried key (the map, the café and the obelisk).** Nana's map has a red cross by the obelisk where its shadow points and, in her nine-year-old writing, "dig here, where the shadow points, when the moths come out". Zaina's spade is on the grass by her chair. The shadow lies across the grass to the old tree at the wood's edge; a dig in the hollow among its roots finds the rusty key. Digging anywhere else finds worms.
- **Trail C, the time (Jedi's watch and the sundial).** Nobody knows the time and Jedi's watch has stopped; he hands it over without opening his eyes. The obelisk is a sundial: Nana laid a ring of stones round it when she was nine, one every hour, and the museum painted the hours on them; the shadow is the hand, between VII and VIII. Set the watch to about twenty to eight and the park changes: the light goes blue and gold, the first moths come out in the wood, and Jedi gets up to supervise.
- **Convergence.** The key opens the little gate in the old wall past the moat. At dusk, through the open gate, between the trees where there was nothing, a little crooked house shows itself with every window lit and moths going in and out of its door. Nana: "Go on, then." Postcard home. (Before dusk the gate opens on trees and nothing.)
- **Who moves (4t):** Jedi, from the bench on the lawn to the avenue by the obelisk once the watch is set; the light, from evening gold to dusk over the whole park; the gate, from locked to open; the house, from nothing to there.
- **Night Moth:** the oldest tape in the museum, "1967, which nobody can explain", knocks a longer word through the headphones while the pipe's lamp flashes in time: 3, 3; 1, 1; 3, 3; 1, 1. Tapped into the box it spells NANA, and the box's lamp flashes back. A new kind after the riddle, the paper moths, the crossword and the secret alphabet: counting flashes against a grid.
- **Real history, told gently (checked 14 Oct 2026, see below):** the museum's notice says that from 1942 to 1945 the most important prisoners of the war were kept in the house and treated like guests, not knowing it was listening; that people in the basement with headphones on wrote down everything they said, through tiny microphones hidden in the lamps, the plant pots, even the garden benches; that most of the listeners had themselves escaped from Germany and Austria; that what they heard helped to end the war sooner; and that the house is a museum now. The tap code on the card is the real prisoners' tap code (a 5×5 grid, C and K sharing a square). The obelisk, Camlet Moat and the avenue are real; the ring of stones, the speaking pipe, the lamp, the box, the carvings and the gate in the wall are the game's own. Nothing in the game names a real person.
- **Facts checked (web, 14 Oct 2026):** Trent Park House held senior German officers (about 59 generals) from 1942, with their conversations secretly recorded by MI19's "secret listeners", most of them German-speaking Jewish refugees, through hidden microphones in the walls, lamps, plant pots and garden benches; the recordings gave early evidence of the V-weapons programme at Peenemünde (ITV News, 20 July 2026; Smithsonian; Museums Journal, July 2026). The house opened as the Trent Park House of Secrets museum on 21 July 2026 (Enfield Dispatch; Museums Association). The obelisk was first put up at Wrest Park in the 1730s and brought to Trent Park by Sir Philip Sassoon in 1934, re-erected at the end of a newly cut vista; it is Grade II listed (The Folly Flâneuse; Parks & Gardens UK). Camlet Moat is a scheduled medieval moated site, with a licence to crenellate recorded in 1347, the house demolished about a century later; the Camelot and Geoffrey de Mandeville stories are folklore (Historic England list entry 1005551; Heritage Daily; Londonist). Numbers of listeners and generals vary between sources, so the game gives none.

### Stage 6: The Moth House — the Lamp Room — difficulty 5
- The current live room, made cosy: wind the lamp (no matches), free the moth from the jar, read the ring of shadows.
- The drawer's ring lock and the looking-glass clock stay at full difficulty.
- The faded portrait gets its smile painted back (a paint pot replaces the porcelain face). She gives Mary a moth-light.

## Elliot's story (age 7)

### Stage 1: Last day of school — his classroom and the playground — difficulty 2

Version 2 (30 Sept 2026), built to the playbook: the goal seen early, two trails open at once, pictures carry every clue, a hands-on puzzle you can see working. **Built** in `next/landscape/stages/eschool.js` (build 2026-09-30j).

**Two square rooms**, the open doorway between them:
- **Classroom 2P** (start, facing the whiteboard): the whiteboard with GOODBYE 2P! and balloons, and Miss Okafor's desk with the goodbye card on it (the goal: "after the marble run works, and not without your jumper"); the window wall with Captain's tank (tap him to open the notebook) and the big marble run along the wall with three gaps and an empty tray under it, the bell at the bottom; the doorway to the playground with the coat pegs (each peg has a child's name card with a little drawing: Elliot's has a rocket) and the party table; the bookcase and the class robot (a hidden cog on the top shelf).
- **Playground**: the fence with the football goal and the bench with the lost-property box; the sandpit with a bright curved piece sticking out of the sand and the climbing frame; the open doorway back to 2P and the outdoor tap with the flower tubs (a hidden cog); the chalk wall, where the class has drawn the finished marble run: straight piece at the top, curve in the middle, zigzag at the bottom (the picture clue for the run).

- **Trail A, the marble run.** Three pieces are missing. The straight piece is in the tray under the run; the curved piece is in the sandpit; the zigzag piece is at the bottom of the lost-property box under the jumpers. Each piece goes into one gap (tap a piece in the strip, then the gap; a wrong gap says it doesn't fit and shows why). The chalk drawing outside shows where each goes. When all three are in, Roll: the marble runs the whole way and rings the bell. The party can start.
- **Trail B, the jumper.** Nobody goes home without their jumper. The lost-property box in the playground holds four jumpers; Elliot's is the one with the rocket badge, the same rocket as on his peg's name card. Taking the right one uncovers the zigzag piece.
- **Convergence.** With the bell rung and the jumper on, Miss Okafor's card can be taken: the whole class has signed it, and someone has drawn a little moth inside. Postcard home.
- **Hidden:** three brass cogs about the two rooms (top of the bookcase, in the flower tub, behind the goal net), counted in the notebook; optional.
- Hints: the moth speaks a short line and the notebook shows the trails; Captain's tank opens the notebook.

### Stage 2: Packing day — his bedroom — difficulty 2
- His building kit must fit in its box: turn and slot the pieces until the lid closes.
- His torch has no batteries: find the spares in the kitchen drawer and match the + and − ends.
- Pack the torch for Nana.

### Stage 3: The flight — his seat and the aisle — difficulty 2
- His headphones won't work: match the plug shape to the right socket.
- His toy car rolls down the aisle during the bumpy bit: follow where it went.
- Help a flight attendant straighten the snack trolley's wobbly wheel.

### Stage 4: Nana and Jedi's — Jedi's shed — difficulty 2
- Jedi is "just resting his eyes" in his deckchair. He'll lend his toolbox, but only after Elliot fetches him a biscuit and the TV remote.
- Fix Jedi's old bike lamp for the walk at dusk. Jedi takes the credit, with a wink.

### Stage 5: Trent Park — Camlet Moat — difficulty 3
- Jedi tells the legend of the knight's treasure, as a fun story, not a scary one.
- Build a little lever bridge to the island. Stay on the stones, never in the water.
- Mend the old well's winding handle to raise the "treasure": a lantern.

### Stage 6: The Moth House — the Clockwork Room — difficulty 3
- The house's lights run on clockwork: put the gears back so each turns the next.
- Oil the stiff handle and wind it. The room lights and Elliot gets a moth-light.

## Zaina's story (age 4)

### Stage 1: Last day of school — Little Waves Kindergarten's goodbye party — difficulty 1

Version 2 (30 Sept 2026), **built** in `next/landscape/stages/zschool.js` (build 2026-09-30j). **One square room**, no doors, nothing to read: Zaina's mark is a yellow star, shown on her cubby beside her portrait, and every task is "find the one with the yellow star" or "copy the pictures".

- **The cubby wall** (start): the row of cubbies with the children's marks (Zaina's: a yellow star, with her portrait) and the shelf of water bottles above. Her bottle is the one with the yellow star (a close-up of four bottles).
- **The painting wall:** the drying line with four paintings pegged up, each with its child's mark in the corner; hers has the yellow star (close-up).
- **The music corner:** a drum, a shaker, a bell and a xylophone, and above them the goodbye-song poster: four pictures in a row, drum, shaker, bell, xylophone. Tap the instruments in that order (close-up; a wrong one just makes its sound and the moth says "not that one yet").
- **The party wall:** the table with the cake, Peanut on the cushion (tap him and the moth flies to the next thing), and Miss Lin (drawn from behind at the table). When the bottle, the painting and the song are done, Miss Lin turns round with a shiny moth sticker. Postcard home.
- Hints are pointed, not read: the moth flies to the right wall and the right thing and says one short line. Every line in this stage is spoken.

### Stage 2: Packing day — her bedroom — difficulty 1
- Mum's picture checklist shows a sun hat, a swimsuit and Peanut. Match each thing to its outline in the case.
- Peanut is hiding: the moth sticker glows warmer as she gets closer.
- Count five pairs of socks into the case.

### Stage 3: The flight — her window seat — difficulty 1
- Cloud spotting: tap the cloud shaped like each picture (a bunny, a boat, an elephant like Peanut).
- Peanut drops under the seats: follow the moth's glow to find him.
- Sleepy time: switch the reading lights off one by one until the cabin is cosy and dark.

### Stage 4: Nana and Jedi's — Nana's garden — difficulty 1
- Meet the robin and find the right snack for it by tapping what robins eat.
- Jedi has fallen asleep in the hammock: tickle his toes to wake him.
- Water Nana's flowers in the order of the colours on her watering can.

### Stage 5: Trent Park — the lake and the meadow — difficulty 2
- Feed the ducks oats; Zaina knows oats are better for ducks than bread.
- Count five ducklings hiding in the reeds.
- Follow the moth across the meadow, stepping only on flowers the colour of its wings.

### Stage 6: The Moth House — the Moth Nursery — difficulty 2
- Sleepy baby moths in cosy cocoons: match each cocoon to the lantern of the same colour.
- Sing them awake by tapping the notes in the order the moth shows (shown as pictures and light as well as sound).
- The baby moths light up and Zaina gets a moth-light.

## Together

### Finale: all the lights (unlocks after all three stories)
The three children bring their moth-lights home and the whole house wakes. The faded portrait shows its face at last: it's Nana, as a girl. She is standing in the doorway holding the porch lantern: "I wondered when you'd find it." Behind her, Jedi pretends to be asleep on the garden bench, and opens one eye to wink. Each child's story carries a different part of Nana's secret, so playing all three reveals the whole mystery.

### Epilogue: home again
Back to school in Singapore. A big Atlas moth (a real Southeast Asian species) lands on the balcony railing, and its wings carry the Moth House pattern. Next summer… (hook for the series).

## Rules for every room

- **Built for the child's age:** see the table in "Choosing a story". Zaina's rooms never need reading, and counting goes no higher than 5.
- **No failing and no timers.** A wrong try gets a friendly line; nothing is lost.
- **Nothing unsafe to copy:** no matches, fire, knives or dangerous climbing. Lamps are wound up or switched on. Children stay on paths and stepping stones and never go into water.
- **The moth always has a hint,** in three steps: where to look, what to try, then the answer.
- **Accessibility:** any clue given by sound is also shown visually.
- **Postcards home** end each stage: they recap, save the game and link the two worlds.
- **Night Moth challenges** are optional and hard, for grown-ups, mostly in Mary's story.
- **Fiction and legal safety:** follow the section above.
- **Original work only:** no names, characters or imagery from other games.

## Open decisions

1. The moth's name, or let each player name it.
2. ~~What the children look like.~~ Decided 30 Sept 2026: all three portraits are drawn (see Characters). **Mary (decided 30 Sept 2026, from three photos the owner sent, not kept in the repo; her portrait is `next/art/portraits/mary.png`):** long dark wavy hair usually tied back in a low ponytail with loose strands, big dark-brown eyes, light warm skin, an expressive face that goes from a clever half-smile to a huge grin; she wears a rust-orange t-shirt with a cream collar and a small pine-tree-and-moon print. **Elliot (decided 30 Sept 2026, from three photos the owner sent, not kept; portrait `next/art/portraits/elliot.png`):** straight dark hair with a soft fringe, round cheeks, dark-brown eyes, light warm skin, a face that swings from wide-eyed astonishment to a squeezed-shut grin; he wears a plain cream t-shirt with a small teal cog on the chest. **Zaina (decided 30 Sept 2026, from three photos the owner sent, not kept; portrait `next/art/portraits/zaina.png`):** wispy dark hair with a soft fringe and two little bunches tied high, big dark-brown eyes, round cheeks, light warm skin, a shy closed-mouth smile that opens into delight; she wears a navy dress with tiny white cats and rainbows, with Peanut the grey elephant under her arm. **Mum (decided 29 Sept 2026, from a photo the owner sent, not kept in the repo):** East Asian, dark hair tied back low, a warm wide smile, a few freckles; from 16 Oct 2026 she wears a bright blue dress with yellow stitching. **Dad, Nana and Jedi** are decided from photos on 16 Oct 2026: see stage 2 of Mary's story.
3b. Ideas from tester round 1 (30 Sept 2026) for later chapters: something hidden under the cushions; a toy screwdriver as a tool; "Dad's story" as a chapter of its own. And the moth must be tied to the family in each child's first intro (Nana's postcards carry a moth; the paper moth in the pencil case), which waits on its name (1).
3. Who flies with the children. The flight stages don't say yet: Mum could fly with them, or Nana and Jedi could collect them at the airport. Stage 4 (arriving in Enfield) needs this decided.
