# Music

`classroom.mp3` — background music for the classroom, generated on 28 Sept 2026 with Google's Lyria (`lyria-3.5`) through the same Gemini API key the pictures use, then faded in and out and re-encoded at 112 kbps. Prompt: "Gentle, cosy background music for a children's point-and-click mystery game set in a sunny classroom on the last day of school: a slow music-box waltz with a simple memorable melody, soft celesta and plucked strings, light and warm, no drums, no vocals, seamless loop, about 30 seconds." The model returned 2 minutes 42 seconds; the game loops it.

The engine plays whatever `TRACK` in `next/landscape/index.html` points to, and falls back to its built-in composed tune if the file fails to load. Before a paid launch, check the Gemini API terms for music output.

`flat.mp3` — packing day, 29 Sept 2026, same model and key. Prompt: "Gentle, cosy background music for a children's point-and-click mystery game set in a family flat on a rainy afternoon: a slow, warm lullaby-like waltz on soft piano and plucked strings with a simple memorable melody, a hint of rain-like gentle arpeggios, light and homely, no drums, no vocals, seamless loop, about 30 seconds." Saved as returned (no fade: no encoder in this session).

`title.mp3` — the title screen, 30 Sept 2026, same model and key. Prompt: "Gentle, mysterious title-screen music for a children's point-and-click mystery game about a magical moth and a house that appears at dusk: a slow, dreamy music-box melody over soft warm strings and a hint of celesta, wondering and kind with a little sparkle, no drums, no vocals, seamless loop, about 40 seconds."
