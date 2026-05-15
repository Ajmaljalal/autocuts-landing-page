# PostHog post-wizard report

The wizard has completed a deep integration of PostHog analytics into the AutoCuts landing page. Since this is a pure static HTML site (no build system), PostHog was added via the CDN snippet approach. A dedicated `posthog.js` file was created to house all event tracking listeners, keeping them separate from existing UI logic. The `script.js` file received a minimal addition to track story scene progression as users scroll through the workflow section.

## Files changed

| File | Change |
|---|---|
| `index.html` | Added PostHog CDN snippet + `posthog.init()` before `</head>`; added `<script src="posthog.js">` before `</body>` |
| `posthog.js` | New file — all PostHog event listener registrations |
| `script.js` | Added `story_scene_advanced` capture inside the scene-change block |
| `.env` | Created with `POSTHOG_PROJECT_TOKEN` and `POSTHOG_API_HOST` |

## Events instrumented

| Event | Description | File |
|---|---|---|
| `hero_cta_clicked` | User clicked the primary "Upload video" button in the hero section | `posthog.js` |
| `nav_cta_clicked` | User clicked the "Upload video" CTA in the sticky top navigation rail | `posthog.js` |
| `pricing_cta_clicked` | User clicked the "Upload video" CTA in the pricing/CTA section | `posthog.js` |
| `footer_studio_clicked` | User clicked the Studio link in the footer (closing statement or resources) | `posthog.js` |
| `hero_scroll_cta_clicked` | User clicked "See how it works" (secondary ghost button in hero) | `posthog.js` |
| `nav_section_clicked` | User clicked a footer nav link to jump to a section (Outputs, Workflow, Pricing, FAQ) | `posthog.js` |
| `social_link_clicked` | User clicked a social link (X, YouTube, LinkedIn) in the footer bar | `posthog.js` |
| `faq_item_opened` | User expanded a FAQ item to read the answer | `posthog.js` |
| `story_scene_advanced` | User scrolled to a new scene in the workflow story section | `script.js` |

## Next steps

We've built a dashboard and insights to keep an eye on user behavior:

- [Analytics basics dashboard](/dashboard/1586952)
- [CTA Clicks Over Time](/insights/9ueuntmw) — daily trend of all three CTA buttons
- [CTA Unique Users](/insights/U6Xu3dQD) — unique daily users clicking each CTA
- [Exploration to Conversion Funnel](/insights/Bf5fzaBJ) — users who explore "See how it works" vs. those who convert to a studio CTA
- [FAQ Question Popularity](/insights/TLB0zyMG) — which FAQ questions users open most (top objections)
- [Social Link Clicks by Platform](/insights/uSoIYDY4) — X vs. YouTube vs. LinkedIn click distribution

### Agent skill

We've left an agent skill folder in your project at `.claude/skills/integration-javascript_web/`. You can use this context for further agent development when using Claude Code. This will help ensure the model provides the most up-to-date approaches for integrating PostHog.
