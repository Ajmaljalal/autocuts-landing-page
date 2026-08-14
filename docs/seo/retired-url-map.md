# Retired URL status map

These URLs describe the previous product and have no honest replacement in the current Mac screen recorder. They must return HTTP `410 Gone` when the production host supports custom response codes. Until the hosting layer is identified and configured, the static-site fallback is the branded `404.html` page.

| Retired URL | Required status | Replacement |
|---|---:|---|
| `/features/turn-long-videos-into-shorts/` | 410 | None |
| `/features/ai-video-editor-for-youtubers/` | 410 | None |
| `/blog/best-ai-video-editor-for-youtubers/` | 410 | None |
| `/blog/how-to-turn-long-videos-into-shorts/` | 410 | None |
| `/blog/best-capcut-alternative-for-talking-videos/` | 410 | None |
| `/compare/autocuts-vs-capcut/` | 410 | None |
| `/compare/autocuts-vs-descript/` | 410 | None |
| `/compare/autocuts-vs-opusclip/` | 410 | None |

Do not redirect these URLs to the homepage. After deployment, verify each URL with an HTTP status check before submitting the new sitemap.
