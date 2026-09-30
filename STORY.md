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

### Stage 2: Packing day — the family flat — difficulty 3

Version 2 (29 Sept 2026), built to the same shape as the school: the goal seen first, three trails open at once, each ending in a lock that needs two different inputs, clues crossing rooms, nothing shared with the other children's stories. A rainy Singapore afternoon; the taxi to the airport is at four.

**Three square rooms**, doorways drawn open:
- **Mary's bedroom** (start, facing the bed): the bed with the open suitcase (the goal, with empty spaces in it); the door to the living room with Mum's list stuck on it; her desk by the rainy window, with her pencil case; the wardrobe.
- **Living room**: the window and Dad's desk (three keys on hooks with luggage tags, the roll of moth-pattern paper, the drawer); the sofa, TV and the shelf (a durian snow globe, an orchid, books); the front door, the hall drawer and the dining table with Elliot's blanket fort under it; the family photos and the two doorways, to the kitchen and to Mary's room.
- **Kitchen**: Mum at the counter, seen from behind, making kaya toast; the fridge with Nana's postcard, Elliot's crayon drawing and the calendar ("FLIGHT, 14 hrs"); the doorway back; the sink, the rainy window and the cupboard of jars.

**Mum's list** on the bedroom door: torch, passports, Nana's present. (And, from the wardrobe, her jumper: rule 4 at school was that nobody goes home without it. One tap, not a trail.)

- **Trail A, the torch (a note says where; a drawing gives the code).** Nana's postcard on the fridge: "Bring the little torch, you'll need it!" The hall drawer where it lives is empty except for a crayon note: "Borrowed for my base. Password on the fridge. E." Elliot's drawing on the fridge shows his base with three symbols on its door: sun, star, moon. The blanket fort under the dining table has a crayon sign, SECRET BASE, and four crayon symbols on its flap; press sun, star, moon and tap Knock, and the flap opens on Elliot's things and the torch.
- **Trail B, the passports (a key, then a tip from Mum).** Three keys on the hooks, with tags: BIKE, POST, DESK. The desk key turns in Dad's drawer, but the drawer sticks. Mum in the kitchen, once you have tried it: "That drawer! Lift it up a little while you pull." Back at the drawer, lift-and-pull works, and the passports are inside.
- **Trail C, Nana's present (find the right thing, then two more things to wrap it).** The postcard's P.S.: "I've run out of kaya." The living-room shelf has a durian snow globe (Dad's) and an orchid (it would not survive fourteen hours), with friendly lines. The kitchen cupboard by the sink has jars: jam, peanut butter, kaya, honey. Take the kaya, wrap it in the moth paper from Dad's desk, and it springs open until it is taped with the tape from Mary's pencil case. (Items are combined in the strip: tap one, then tap the other.)
- **Convergence.** Torch, passports and present go into the suitcase on the bed, each seen inside it; the third one zips it. Mum: "Taxi's here!" The stage ends with a postcard card.
- Mum's tip is the first time a person gives a clue; she is drawn from behind and breathes and shifts when tapped. Before the drawer has been tried she only says she is nearly done.
- **Night Moth:** six paper moths hidden across the rooms (top of the wardrobe, the bedroom window frame, under the sofa, behind a family photo, top of the fridge, top of the kitchen cupboard). The notebook counts them. They are left out of the long-press reveal, so this layer stays hard.
- No clue in this stage is shared with Elliot's or Zaina's stories (owner, 29 Sept 2026).

### Stage 3: The flight — her seat, the flight map, the magazine — difficulty 4
- Work out what time it will be in London when they land. Singapore is 7 hours ahead of London in the British summer.
- A note in the seat pocket is in mirror writing; the dark seat-back screen works as a mirror.
- The note points to the flight map, where a tiny moth marks Enfield.
- **Night Moth:** the magazine crossword spells a word Nana used on her postcard.

### Stage 4: Nana and Jedi's — Nana's attic and the hallway photos — difficulty 3
- The dates on the family photos give the code to Nana's childhood tin.
- Inside: Nana's hand-drawn map of Trent Park, with a house that isn't on any real map. Nana just smiles: "Well, go on then."

### Stage 5: Trent Park — Trent Park House — difficulty 4
- Real history told gently: people once listened carefully here to learn secrets. **Check the facts before writing any in-game text.**
- Old listening pipes carry a code between rooms, also shown as flashes so no one misses it.
- Decoding it leads to a note from the girl in the portrait: "If you're reading this, bring them home."
- **Night Moth:** read the Obelisk's shadow as a clock from its angle alone.

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
2. ~~What the children look like.~~ Decided 30 Sept 2026: all three portraits are drawn (see Characters). **Mary (decided 30 Sept 2026, from three photos the owner sent, not kept in the repo; her portrait is `next/art/portraits/mary.png`):** long dark wavy hair usually tied back in a low ponytail with loose strands, big dark-brown eyes, light warm skin, an expressive face that goes from a clever half-smile to a huge grin; she wears a rust-orange t-shirt with a cream collar and a small pine-tree-and-moon print. **Elliot (decided 30 Sept 2026, from three photos the owner sent, not kept; portrait `next/art/portraits/elliot.png`):** straight dark hair with a soft fringe, round cheeks, dark-brown eyes, light warm skin, a face that swings from wide-eyed astonishment to a squeezed-shut grin; he wears a plain cream t-shirt with a small teal cog on the chest. **Zaina (decided 30 Sept 2026, from three photos the owner sent, not kept; portrait `next/art/portraits/zaina.png`):** wispy dark hair with a soft fringe and two little bunches tied high, big dark-brown eyes, round cheeks, light warm skin, a shy closed-mouth smile that opens into delight; she wears a navy dress with tiny white cats and rainbows, with Peanut the grey elephant under her arm. **Mum (decided 29 Sept 2026, from a photo the owner sent, not kept in the repo):** East Asian, dark hair tied back low, a warm wide smile, a few freckles; in the game she wears a soft green-grey top.
3b. Ideas from tester round 1 (30 Sept 2026) for later chapters: something hidden under the cushions; a toy screwdriver as a tool; "Dad's story" as a chapter of its own. And the moth must be tied to the family in each child's first intro (Nana's postcards carry a moth; the paper moth in the pencil case), which waits on its name (1).
3. Who flies with the children. The flight stages don't say yet: Mum could fly with them, or Nana and Jedi could collect them at the airport. Stage 4 (arriving in Enfield) needs this decided.
