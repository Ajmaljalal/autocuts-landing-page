<p align="center">
  <img src="img/logo/autocuts-icon-256.png" width="96" alt="Autocuts icon">
</p>

<h1 align="center">Autocuts landing page</h1>

<p align="center">
  The marketing site for <a href="https://autocuts.ai">autocuts.ai</a>, a Mac screen recorder with automatic zoom.<br>
  Plain HTML, CSS, and vanilla JS. No framework, no build step.
</p>

---

## The product

Autocuts is a local-first macOS screen recorder. It records a display, an app window, or a selected area with optional camera, microphone, and system audio. It then turns clicks into zooms, smooths cursor motion, and adds on-device captions. Recordings never leave the Mac. One license, one-time payment, lifetime updates.

The site sells that story with real product demo videos on a dark, single-accent design.

## Demo videos

Eight loops autoplay across the site. All are 1080x1080 at 60 fps and show the real app UI.

| | | | |
|:---:|:---:|:---:|:---:|
| ![Hero](img/demos/hero.webp) | ![Record anything](img/demos/record-anything.webp) | ![Smart zoom](img/demos/smart-zoom.webp) | ![Smooth cursor](img/demos/smooth-cursor.webp) |
| `hero.mp4` | `record-anything.mp4` | `smart-zoom.mp4` | `smooth-cursor.mp4` |
| ![Backgrounds](img/demos/backgrounds.webp) | ![Camera layouts](img/demos/camera-layouts.webp) | ![Teleprompter](img/demos/teleprompter.webp) | ![Video editor](img/demos/video-editor.webp) |
| `backgrounds.mp4` | `camera-layouts.mp4` | `teleprompter.mp4` | `video-editor.mp4` |

- Deployed MP4s live in `media/demos/`, poster images in `img/demos/`.
- The HyperFrames build project that renders them lives in `videos/autocuts-desktop-demos/`. It stays local (git-ignored) and is excluded from crawling and deployment.
- Rule: demo UI must match the shipped app exactly. Never invent app UI in a video.

## Pages

38 indexable pages, all listed in `sitemap.xml`:

| Section | Pages |
| --- | --- |
| Home | `/` with hero, features, audiences, how it works, editor, Mac-native, pricing, FAQ |
| Features | `/features/` hub plus auto zoom, screen and camera, teleprompter, local-first recording, transcript cleanup |
| Guides | `/guide/` hub plus 11 how-to pages (install, system requirements, recording, shortcuts, system audio, camera layouts, teleprompter, automatic zoom, cursor effects, transcript cleanup, export and captions) |
| Use cases | `/use-cases/` hub plus product demos, developers, tutorials, YouTube, online courses |
| Compare | `/compare/` hub plus Screen Studio, ScreenCharm, Loom, Cap, QuickTime |
| Blog | `/blog/` hub plus 2 posts |
| Other | `/about/`, `/mac-screen-recorder-no-subscription/`, `privacy.html`, `terms.html` |

Not indexed: `/download/` (noindex) and two redirect stubs under `/features/` that forward retired URLs. `_redirects` mirrors those redirects for hosts that support the file. Retired URLs are tracked in `docs/seo/retired-url-map.md`.

## Download flow

`/download/` fetches the latest release from `github.com/Ajmaljalal/autocuts-downloads` on the client and reveals the button when it finds an `arm64.dmg` asset. Until the first public release exists, the page shows no button. Every download CTA on the site routes to `/download/`.

## Structure

```
index.html                  Home page
site.css                    Design system + home page styles
seo-page.css                Interior page styles
site.js                     Lazy video loading, play-on-visible, scroll reveals
features/ guide/            Content sections (one folder per page)
use-cases/ compare/ blog/
download/ about/
media/demos/                Deployed demo MP4s
img/demos/                  Video poster images (webp)
img/logo/                   Icon masters (SVG + PNG 16 to 1024)
scripts/validate-seo.mjs    SEO/AEO validator (npm test)
docs/seo/                   SEO strategy notes (not deployed)
videos/                     Demo video build project (local only)
sitemap.xml  robots.txt  llms.txt  404.html  CNAME  _redirects
```

## Design system

Defined as custom properties at the top of `site.css`:

- Background `#0e1114`, panel `#13161b`, ink `#eef2f3`, muted `#9fabb6`
- One accent: `#5b9dff` (the logo blue). No gradients, no glows.
- System font stack, 1120px content frame, 24px radius
- Breakpoints at 900px and 640px

The logo is four accent-blue viewfinder brackets around a red record dot (`img/logo/autocuts-icon.svg`). Regenerate rasters from the SVG master; never redraw them.

## Working on the site

Serve locally (any static server works):

```bash
python3 -m http.server 8912
# open http://localhost:8912/
```

Validate after every content change:

```bash
npm test    # runs scripts/validate-seo.mjs
```

The validator checks all 38 indexable pages: titles, descriptions, canonicals, JSON-LD, heading keywords, sitemap parity. It must pass before a commit.

### Copy rules

- Only claim features the app ships. Autocuts has no motion blur, no GIF export, no iPhone or iPad capture, no hosted share links, no background music, and no device frames. Never claim these.
- No em dashes in page copy.
- No outbound links to competitor sites on compare pages.
- Keep prices and claims in copy, FAQ, and JSON-LD in sync.

## SEO and AI answers

- `sitemap.xml` lists every indexable page with lastmod dates.
- `robots.txt` explicitly allows major search and AI crawlers and blocks `/docs/`, `/scripts/`, and the video build project.
- `llms.txt` gives AI assistants a structured summary of the product and pages.
- Every page carries JSON-LD (SoftwareApplication, FAQPage, Article, or BreadcrumbList as fits).
- Strategy notes and keyword tracking live in `docs/seo/`.

## Deployment

GitHub Pages serves the repo at the custom domain `autocuts.ai` (see `CNAME`). A push to `main` deploys. `_config.yml` only excludes non-site folders from the Pages build.
