# Autocuts homepage keyword ranking

**Prepared:** 2026-08-14

**Decision:** optimize the homepage for one commercial category cluster, then support it with narrower feature and use-case phrases.

## Method

This ranking combines:

1. the last three months of Google Search Console data supplied in `autocuts.ai-Performance-on-Search-2026-08-13.zip`;
2. a live search-result review on 2026-08-14;
3. commercial intent;
4. product fit with features already shown on the landing page;
5. the authority and intent of pages currently appearing for each query.

The supplied Search Console export contains no impressions for the new screen-recorder terms yet, so it cannot provide exact demand for the new category. The priorities below are qualitative recommendations, not invented monthly search-volume estimates or claims that Autocuts already ranks for these terms.

Google Search Console is the source of the old domain's actual Google average-position data. Google explains that an observed position can change with location, search history, and other variables, so a single manual result page is not a stable universal ranking ([Google Search Console position guidance](https://support.google.com/webmasters/answer/7042828?hl=en)). Google Keyword Planner is the appropriate next source for location-specific average monthly searches, advertiser competition, and bid ranges ([Google Keyword Planner metrics](https://support.google.com/google-ads/answer/3022575?hl=en)). Those metrics were not available in the supplied export and are not fabricated here.

### Result-set observations used for ordering

The live web search was run on 2026-08-14. The search interface did not expose a fixed Google locale, device, or depersonalized rank, so the table records the competing pages observed rather than assigning misleading universal position numbers.

| Query reviewed | Leading commercial pages observed | What it indicates |
|---|---|---|
| `mac screen recorder with automatic zoom` / `auto zoom screen recorder for mac` | [CursorClip](https://cursorclip.com/features/), [Glideo](https://glideo.app/), ScreenBuddy, Rekort | A distinct commercial category with strong Autocuts feature fit. |
| `screen recorder for mac` | Apple Support plus established general-purpose recorders | Broader intent and much stronger authority competition. Use as supporting language, not the sole target. |
| `screen recorder for product demos` | [ScreenRecording Pro](https://screenrecording.pro/), [Arcade](https://www.arcade.software/lp/screen-recorder), FocusTake, GiliSoft | Commercial use-case intent, but browser recorders and interactive-demo tools broaden the result set. |
| `screen and camera recorder mac` | General recorder tools and recording guides | Strong product fit, but more generic and crowded than the automatic-zoom cluster. |
| `mac screen recorder with system audio` | [Creavit Studio](https://creavit.studio/mac-screen-recorder-with-audio), Mac recording guides, general Mac recorders | Concrete pain-point intent that deserves visible support confirmation and a focused guide. |
| `screen recorder with teleprompter mac` | ScreenCharm and a small set of teleprompter recorders | Narrower apparent result set and strong feature-level purchase intent. |
| `screen studio alternative mac screen recorder` | Multiple dedicated comparison pages and Reddit discussions | High commercial intent but crowded; requires a first-hand comparison before publication. |

## Ranked keyword opportunities

| Rank | Keyword cluster | Priority | Homepage role | Decision |
|---:|---|---|---|---|
| 1 | `mac screen recorder with automatic zoom` / `auto zoom screen recorder for mac` / `screen recorder with auto zoom` | Very high | Title, description, hero definition, feature copy | Primary cluster. Strong buyer intent, exact product fit, and a narrower result set than the broad Mac-recorder category. Use one owner page rather than duplicating variants. |
| 2 | `screen recorder for product demos` / `product demo recorder for mac` | Very high | Hero and how-it-works heading | High-value use-case intent. The dedicated product-demo page remains the main owner. |
| 3 | `screen and camera recorder for mac` | High | Hero label and capture feature | Strong feature fit and clear pre-purchase intent. The dedicated feature page remains the main owner. |
| 4 | `mac screen recorder with system audio` | High | Capture feature heading and description | A concrete Mac pain point. Use the homepage to confirm support and a focused page or guide to answer setup questions. |
| 5 | `screen recorder with a built-in teleprompter` | Medium-high | Teleprompter feature heading | Smaller but commercially specific result set. The dedicated teleprompter page should own the full answer. |
| 6 | `local screen recorder for mac` | Medium-high | Privacy section heading and proof | Valuable differentiator for private demos and unreleased products. Lower apparent demand than auto zoom. |
| 7 | `mac screen recorder no subscription` | Medium-high | Pricing heading and proof | Strong pricing intent. Keep the claim aligned with the planned one-time offer and early-access status. |
| 8 | `screen recorder for mac` | Supporting | Supporting category language | Likely broader demand, but the result set includes Apple and major recorder brands. Too competitive and vague to be the sole homepage target. |
| 9 | `screen studio alternative` | Hold | None yet | Strong comparison intent but crowded. Publish only after a current, first-hand product and pricing comparison. |

## Why the primary keyword wins

The broad query `screen recorder for mac` is attractive but difficult: Apple Support and established cross-platform products occupy that result set. The narrower `mac screen recorder with automatic zoom` cluster matches the reason someone would choose Autocuts rather than the built-in macOS recorder.

The current result set confirms that this is a real commercial category. Examples include [CursorClip's auto-zoom feature page](https://cursorclip.com/features/), [Glideo's Mac demo recorder](https://glideo.app/), and [Screen UI's Mac recorder and editor](https://screenui.app/). Product-demo intent also returns focused commercial pages such as [ScreenRecording Pro](https://screenrecording.pro/) and [Arcade's demo recorder](https://www.arcade.software/lp/screen-recorder). System-audio intent returns focused Mac solutions such as [Creavit Studio](https://creavit.studio/mac-screen-recorder-with-audio).

This competition is evidence of an established commercial result set, not proof of search volume. It also means Autocuts needs product proof, useful supporting pages, internal links, and better engagement. Repeating the phrase alone will not create rankings.

## Homepage implementation

| Page element | Target wording or purpose |
|---|---|
| Title | `Mac Screen Recorder With Automatic Zoom | Autocuts` |
| Meta description | Primary category plus screen, camera, microphone, system audio, local editing, cursor motion, and captions |
| H1 | Keep the differentiated promise: `Record your screen and camera with cinematic auto-edits.` |
| Hero definition | Exact primary category plus product demos, tutorials, and software walkthroughs |
| How-it-works H2 | `A screen recorder for product demos, tutorials, and walkthroughs` |
| Capture H3 | `Record your Mac screen with system audio` |
| Teleprompter H3 | `A screen recorder with a built-in teleprompter` |
| Privacy H2 | `A local screen recorder made for Mac` |
| Pricing H2 | `Pay once for your Mac screen recorder. No subscription.` |

No `meta keywords` tag should be added. Google does not use it for ranking. The valuable placements are the title, description, visible headings, useful body copy, image/video context, structured data, and descriptive internal links.

## Measurement

Use 2026-08-14 as the migration annotation date. Review Search Console after 14, 28, and 56 days for:

- impressions and average position for `screen recorder`, `mac`, `automatic zoom`, `product demo`, `camera`, `system audio`, `teleprompter`, `local`, and `no subscription` query groups;
- homepage CTR and average position;
- which dedicated feature or use-case page Google chooses for each cluster;
- lingering impressions for the retired AI-video-editor cluster;
- branded clicks for `autocuts`, which must not decline materially during the category migration.

Do not rewrite the title every few days. Give Google enough time to recrawl and evaluate the page, then use query-level evidence for the next change.
