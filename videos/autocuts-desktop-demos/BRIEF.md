---
workflow: general-video
flow: automation
storyboard: yes
message: "Autocuts records your Mac screen and hands back a cinematic, edited video, with no timeline to scrub"
destination: landing-page-embed
aspect: 1920x1080
language: en
audience: "Mac developers, course creators, and founders who record their screen"
length: "hero 25s; six feature loops at 8s each"
angle: product-demo
---

## Intent

Seven silent, autoplaying demo videos for the Autocuts desktop landing page at
`~/Desktop/Startups/autocuts-landing-page`. Autocuts is a local-first Electron screen,
camera, and microphone recorder with a motion studio, built for macOS.

The reference is screencharm.com: every feature is proved by a short loop of the real
product being used, filmed as if it were a screen recording of the app itself — a big
smooth cursor, click-driven auto-zoom pushes, rounded frames, a soft gradient behind the
window. The app UI is rebuilt in HTML, not screenshotted, so every control can animate.

## Assets

- The Autocuts source at `~/Desktop/Startups/Autocuts` — the UI truth. Dark shell `#13161b`,
  text `#eef2f3`, accent `#5b9dff` / `#4c8dff`, record red `#db4238`. Real strings: the
  recorder pill asks "What are we capturing?" over cells Screen · Window · Area · Camera ·
  Mic · System Audio · Script · Settings. Studio rail: General, Cursor, Zoom, Captions, Keys,
  Looks, Records, Settings. Panels: "Smart Focus", "Cursor motion", "Canvas", "Captions",
  "Teleprompter", "Selected zoom".

## Customizations

- Seven compositions in one project so they share one rebuilt-UI stylesheet:
  `hero` (25s) — capture bar → record → studio auto-zoom → export.
  `smart-focus` (8s) — a click becomes a zoom on the focus track.
  `cursor` (8s) — smoothing, size, and colour rebuild the pointer.
  `canvas` (8s) — aspect chips, background, padding, corners, shadow.
  `captions` (8s) — on-device transcription into karaoke captions.
  `teleprompter` (8s) — the script grows from the top and waits for speech.
  `timeline` (8s) — split, re-time, and re-speed clips.
- Every loop must cut cleanly back to its first frame; these autoplay on loop.

## Notes

- Silent. No voice-over, no music: they play muted in a browser.
- Claim only what the app really does. It is local-first and offline; transcription runs on
  device; export is frame-accurate through WebCodecs to MP4 or WebM.
- No stock photography and no invented metrics.
