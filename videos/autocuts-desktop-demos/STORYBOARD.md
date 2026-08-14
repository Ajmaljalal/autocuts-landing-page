---
format: 1920x1080
duration: 73s total — hero 25s + six 8s loops
message: "Autocuts records your Mac screen and hands back a cinematic, edited video, with no timeline to scrub"
arc: Ask → Record → Studio does the work → Shape it → Export
audience: Mac developers, course creators, and founders who record their screen
mode: collaborative
---

# Deliverable 1 — hero.mp4 (25s, index.html)

## Frame 1 — What are we capturing?

- scene: The recorder pill fills the frame on a lit desktop; the cursor walks the cells and picks Screen
- duration: 5s
- transition_in: cut
- status: built
- src: compositions/hero-01-capture.html

Cold open on the one question the app asks, and nothing else — no app window, the pill alone
filling most of the frame the way screencharm opens. It reads "What are we capturing?" over the
real cells: Screen · Window · Area · Camera · Mic · System Audio · Script · Settings. The mic
cell's level bar breathes. The cursor drifts in, hovers Camera, slides to Screen, clicks.

## Frame 2 — Recording

- scene: The screen being recorded, full bleed, with the countdown then a recording chip and the camera bubble
- duration: 5s
- transition_in: cut
- status: built
- src: compositions/hero-02-record.html

No app chrome here either. The countdown ring collapses over the screen itself, then recording
starts: the editor fills the frame, a chip in the corner reads a red dot and 00:09, and the camera
bubble sits bottom-right. The viewer sees what they would see while recording, not a dashboard.

## Frame 3 — Studio does the work

- scene: The raw take lands on the studio stage already framed, and Smart Focus punches in on a click
- duration: 7s
- transition_in: crossfade
- status: built
- src: compositions/hero-03-studio.html

The payoff beat. The same recording reappears inside the composed canvas — padding, rounded
corners, shadow, wallpaper — and the focus track under it fills with zoom markers on its own.
The playhead runs; as it crosses a marker the camera pushes in exactly as the export will. The
rebuilt cursor glides where the raw one jittered. Nothing was dragged; the edit already exists.

## Frame 4 — Shape it

- scene: The inspector opens; zoom strength is dragged, then the canvas flips 16:9 to 9:16 and reflows
- duration: 4s
- transition_in: cut
- status: built
- src: compositions/hero-04-shape.html

Control, after automation. The rail moves General → Zoom; "Smart Focus · 8 zooms from clicks and
drags" appears; the cursor drags Zoom strength and the stage answers live. Then a hop to Canvas
and a click on the 9:16 aspect chip — the whole composition reflows into a vertical frame in one
spring. One recording, two shapes.

## Frame 5 — Export

- scene: The export sheet fills to 100% and the file lands in ~/Videos/Autocuts
- duration: 4s
- transition_in: cut
- status: built
- src: compositions/hero-05-export.html

MP4 · 1080p · 30fps · burned-in captions checked. The progress bar sweeps, the toast says the
render is frame accurate, and the Recordings list gains a new row with its thumbnail. Close on
the finished frame, still, for the last half second so the loop point is clean.

# Deliverable 2 — smart-focus.mp4 (8s, smart-focus.html)

## Frame 6 — Smart Focus

- scene: A click inside the recording becomes a zoom marker on the focus track, and the camera obeys it
- duration: 8s
- transition_in: cut
- status: built
- src: loops/smart-focus.html

**Result only — no app chrome.** The exported frame: a settings screen composed on the wallpaper
with the camera bubble. The cursor moves to a toggle, clicks, and the camera pushes in on that
exact point, holds, and eases back out — twice. What the viewer watches is the output file.

# Deliverable 3 — cursor.mp4 (8s, cursor.html)

## Frame 7 — Cursor motion

- scene: Smoothing, size and colour rebuild the pointer while it moves
- duration: 8s
- transition_in: cut
- status: built
- src: loops/cursor.html

**Result only — no app chrome.** Filmed close on a code editor, the way screencharm films its
cursor loop. A faint ghost of the raw, jittery captured path stays on screen while the rebuilt
pointer glides the same route smoothly. It grows, repaints blue, then trails. The proof is the
pointer itself, not a panel.

# Deliverable 4 — canvas.mp4 (8s, canvas.html)

## Frame 8 — Canvas

- scene: Aspect chips, background, padding, corners and shadow reshape the frame live
- duration: 8s
- transition_in: cut
- status: built
- src: loops/canvas.html

**App on screen** — this feature *is* the panel, so the window is shown, filling the frame like
screencharm's background loop. Left: the Canvas panel. Right: the live preview of a release-notes
page. The aspect chips step 16:9 → 1:1 → 9:16, a wallpaper swatch changes, padding and corners
are dragged, and the preview answers every move. Returns to 16:9 to close the loop.

# Deliverable 5 — captions.mp4 (8s, captions.html)

## Frame 9 — Captions

- scene: On-device transcription fills the transcript, then captions highlight word by word
- duration: 8s
- transition_in: cut
- status: built
- src: loops/captions.html

**Result only — no app chrome.** A slide composed on the wallpaper with the camera bubble, and
the burned-in caption underneath. Words light one at a time in sync, exactly as the export writes
them. No panel, no progress bar: the caption is the feature.

# Deliverable 6 — teleprompter.mp4 (8s, teleprompter.html)

## Frame 10 — Teleprompter

- scene: The script grows from the top of the screen and only advances while the mic hears speech
- duration: 8s
- transition_in: cut
- status: built
- src: loops/teleprompter.html

**Result only — no app chrome.** The band unrolls from the top edge of the screen being recorded,
over a clean dashboard. Lines scroll while the mic meter moves; when the meter falls to silence the
scroll stops dead, then resumes when it rises. That pause is the whole point of the loop.

# Deliverable 7 — timeline.mp4 (8s, timeline.html)

## Frame 11 — Clip timeline

- scene: Cut, delete and re-speed on the clip timeline
- duration: 8s
- transition_in: cut
- status: built
- src: loops/timeline.html

**App on screen** — editing is a panel feature. The window fills the frame, weighted to the
timeline dock. The cut tool arms, the cursor splits a clip, the dead middle is deleted and the
right block slides left to close the gap, then the speed control is dragged to 2× and that block
compresses. The preview above updates with every cut.
