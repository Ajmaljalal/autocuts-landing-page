# Design truth — Autocuts desktop demos

The brand here is **the product itself**. Every frame is a rebuilt Autocuts window filmed as if
it were a screen recording, in the manner of screencharm.com. Colour, type, radius, and copy are
taken from the running app (`~/Desktop/Startups/Autocuts`), not invented.

## Palette

| Role | Value | Where it comes from |
|---|---|---|
| App shell | `#13161b` + radial `rgba(47, 88, 175, 0.16)` bottom-right | `.app-shell` |
| Panel | `rgba(25, 28, 35, 0.82)` | `.profile-card`, `.export-panel` |
| Rail / inspector | `rgba(23, 26, 33, 0.60)` | `.editor-rail` |
| Timeline dock | `rgba(17, 20, 24, 0.97)` | `.studio-timeline` |
| Recorder pill | `rgba(19, 22, 27, 0.97)` | `.recorder-bar` |
| Hairline | `rgba(255, 255, 255, 0.12)` | shared border |
| Ink | `#eef2f3` | `:root` |
| Ink muted | `rgba(238, 242, 243, 0.55)` | `p`, `.control-label` |
| Accent | `#5b9dff`; solid `#4c8dff`; hover `#a7c6ff` | rail active, sliders, focus |
| Record | `#db4238` | `.record-button` |
| Warn | `#f0938b` | `.round.off` |

Desktop wallpaper behind the window: a deep plum-to-ember field built from **radial** stops only
(`#2b1d3a` base, ember `#c2643a` at 22% 18%, violet `#4a3aa8` at 82% 76%). Never a full-screen
linear gradient — it bands under H.264.

## Type

`"SF Pro Display", ui-sans-serif, -apple-system, "Segoe UI", sans-serif` — the app's own stack.
The app's real sizes are web-scale (10–15px), so the window is **rendered at app scale and then
scaled up by the camera**: the frame is filmed at 1.35× base with auto-zoom pushes to 1.9×, which
is what makes 11px labels legible on video. Never retype the UI at video sizes; that stops looking
like the product.

## Staging language (from screencharm.com)

1. **Window.** Rounded 14px, 1px `rgba(255,255,255,.09)` edge, macOS traffic lights, drop shadow
   `0 40px 120px rgba(0,0,0,.55)`.
2. **Cursor.** The app's own arrow, 40px, white body with a `#26262b` outline and a soft shadow.
   It eases between targets on `power2.inOut` over 0.5–0.8s and never teleports.
3. **Click.** A 2px accent ring expands from 0 to 64px and fades over 0.45s; the cursor dips to
   0.88 scale for 90ms.
4. **Auto-zoom.** The whole window scales to 1.6–1.9× with `transform-origin` set to the click
   point, `power3.inOut`, 0.75s in, hold, 0.6s out. This *is* the product's Smart Focus, so the
   camera move and the on-screen feature are the same gesture.
5. **Silence.** No voice-over, no music, no caption overlays. The landing page supplies the words.

## Deliberate departures from house style

- No oversized ghost type, no accent stripes, no marketing decoratives. The subject is a UI;
  house-style furniture would break the illusion that this is a screen recording.
- Small type (10–15px) is intentional and is read through the camera scale, not the font size.
- Every loop returns to its first frame so it can autoplay seamlessly.
