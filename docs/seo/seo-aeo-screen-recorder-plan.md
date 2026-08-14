# Autocuts SEO and AEO migration plan

**Product direction:** local Mac screen recorder with cinematic auto-edits
**Prepared:** 2026-08-14
**Evidence window:** Google Search Console, 2026-05-16 through 2026-08-11
**Planning scope:** search migration and growth plan only. This document does not implement page changes.

## Executive decision

Autocuts should treat the new landing page as a **search-category migration**, not as an ordinary homepage rewrite.

Google currently understands the domain as a mixture of:

- the Autocuts brand;
- generic “auto cut” searches;
- an AI video editor for YouTubers;
- a talking-head cleanup and shorts tool.

The new product is different: a local Mac screen and camera recorder that adds automatic zooms, cursor motion, layouts, captions, and other cinematic edits. The fastest responsible route to relevant search visibility is therefore:

1. Remove contradictory old-product signals.
2. Preserve brand equity and only redirect old URLs when the replacement satisfies the same intent.
3. Establish one unambiguous category: **Mac screen recorder with automatic zoom**.
4. Publish a small set of high-intent feature, use-case, and comparison pages backed by first-hand product evidence.
5. Measure the arrival of new screen-recorder queries separately from legacy AI-editor queries.

“Cinematic auto-edits” is a strong product promise, but it is not yet a proven search category. Use it in positioning. Pair it with established category language such as “Mac screen recorder,” “automatic zoom,” “screen and camera recording,” and “product demo recorder.”

## Evidence from the old Autocuts search performance

Source: `/Users/ajmaljalal/Downloads/autocuts.ai-Performance-on-Search-2026-08-13.zip`

### Property baseline

| Metric | Result |
|---|---:|
| Clicks | 56 |
| Impressions | 2,492 |
| CTR | 2.25% |
| Impression-weighted average position | 31.62 |
| Exact `autocuts` query | 26 clicks / 166 impressions / 15.66% CTR / position 2.48 |
| Spaced `auto cuts` query | 5 clicks / 97 impressions / 5.15% CTR / position 10.37 |
| Homepage | 50 clicks / 1,180 page impressions / 4.24% CTR / position 21.93 |
| United States | 10 clicks / 1,233 impressions / 0.81% CTR / position 40.01 |
| Desktop | 30 clicks / 1,665 impressions / 1.80% CTR / position 33.39 |

The last 28 days produced 1,150 impressions and 24 clicks versus 373 impressions and 8 clicks in the first 28 days. Visibility grew, but CTR remained essentially flat at about 2.1%. The domain has started earning crawl and impression history, but most non-brand visibility is not commercially useful for the new product.

### Query diagnosis

| Query cluster | Clicks | Impressions | CTR | Meaning |
|---|---:|---:|---:|---|
| Exact `autocuts` | 26 | 166 | 15.66% | Brand demand exists and should be protected. |
| Exact `auto cuts` | 5 | 97 | 5.15% | Google partially associates the spaced term with the brand. |
| Other auto-cut variants | 4 | 514 | 0.78% | The brand name collides with generic automatic-cutting intent. |
| Old AI + YouTube editor terms | 0 | 757 | 0% | Considerable irrelevant exposure with no engagement. |
| Competitor comparison terms | 0 | 12 | 0% | Old comparisons have little demonstrated value. |
| New screen-recorder/auto-zoom terms | 0 | 0 | N/A | Google has not yet learned the new category from this export. |

Important old queries include:

- `ai video editor for youtube`: 146 impressions, position 46.05;
- `best ai video editor for youtube`: 123 impressions, position 39.70;
- `ai video editor for youtube videos`: 120 impressions, position 39.53;
- `best ai video editor for youtube content creators`: 114 impressions, position 43.71.

These impressions should not drive the future content strategy. They describe the discontinued positioning and produced no clicks.

### Page diagnosis

Two pages are responsible for most of the clearly obsolete non-brand exposure:

| Page | Clicks | Page impressions | CTR | Position |
|---|---:|---:|---:|---:|
| `/blog/best-ai-video-editor-for-youtubers/` | 0 | 791 | 0% | 41.43 |
| `/features/ai-video-editor-for-youtubers/` | 0 | 348 | 0% | 44.17 |

Other old pages occasionally earned clicks, but their current promises are no longer consistent with the new application. Keeping them unchanged would tell Google and AI answer engines that Autocuts is two incompatible products.

## Current-site findings

The new homepage is directionally strong. It already includes:

- “Mac Screen Recorder” in the title;
- a clear cinematic auto-edits promise;
- automatic click zoom, smooth cursor, camera layouts, teleprompter, local files, on-device captions, and 4K export;
- visible pricing and platform requirements;
- `SoftwareApplication` structured data;
- useful demonstration videos.

The migration is incomplete in several critical places:

1. The sitemap still lists 17 URLs from the old AI-editor product and uses May 2026 dates.
2. The sitemap homepage image title still calls Autocuts an AI video editor for talking videos.
3. The About page, four feature pages, five blog pages, and three comparison pages still sell the old product.
4. `llms.txt` still describes uploads, shorts generation, 10 credits, and pay-as-you-go pricing.
5. Privacy and Terms still describe uploaded user media, cloud processing, AI APIs, and credit usage.
6. The homepage links only to its own sections, legal pages, and social profiles. It does not link to indexable feature or use-case pages.
7. Checkout and download buttons are placeholders, so neither people nor browser agents can complete the core action.
8. The old `studio.autocuts.ai` URL still received 28 impressions and needs an explicit product decision.
9. The deployable web tree contains demo-production source files and HTML compositions under `videos/autocuts-desktop-demos/`. Only finished public assets should be shipped or crawlable.

The legal mismatch is a trust and accuracy problem, not merely an SEO detail. It must be corrected before aggressively asking search engines to recrawl the new product.

## What to learn from ScreenCharm

ScreenCharm uses a broad but coherent search architecture:

- a category-led homepage centered on “Mac screen recorder”;
- feature pages for auto zoom and teleprompter;
- commercial pages for no-subscription intent;
- use-case pages for developers, founders, tutorials, product demos, SaaS teams, and courses;
- comparison and alternative pages for known competitors;
- direct FAQ answers, product specifications, examples, and social proof;
- a large internal-link network connecting all of those pages.

Autocuts should copy the **architecture principle**, not ScreenCharm's copy or page count. Publishing dozens of thin variations immediately would create low-value content and increase migration risk. Google recommends unique, people-first, non-commodity content rather than scaled pages created only to capture query variations.

Autocuts has its own defensible evidence:

- recordings and transcription stay local;
- clicks, cursor movement, keys, and voice become editable motion data;
- automatic zooms remain editable;
- the cursor is reconstructed and smoothed;
- overlays stay out of the recording;
- the teleprompter advances with speech;
- exports are frame-accurate up to 4K at 60 fps;
- the app is a $49 one-time purchase.

Those facts should be the center of the SEO and AEO strategy.

## Positioning and keyword map

Search volume and difficulty have not been validated in the supplied Search Console export because the new category generated zero reported queries. Before producing the second content wave, validate these clusters with Keyword Planner or another reputable keyword dataset. Do not invent volume numbers.

### Tier 1: category and purchase intent

| Target intent | Primary phrase | Recommended owner page |
|---|---|---|
| Core category | `mac screen recorder` | `/` |
| Core variant | `screen recorder for mac` | `/` |
| Differentiating feature | `mac screen recorder with auto zoom` | `/features/mac-screen-recorder-with-auto-zoom/` |
| Camera workflow | `screen recorder with webcam and system audio mac` | `/features/screen-and-camera-recorder-for-mac/` |
| Pricing intent | `mac screen recorder no subscription` | `/mac-screen-recorder-no-subscription/` |
| Product-demo intent | `product demo recorder for mac` | `/use-cases/product-demo-recorder/` |

### Tier 2: feature and audience intent

| Target intent | Primary phrase | Recommended owner page |
|---|---|---|
| Scripted recording | `mac screen recorder with teleprompter` | `/features/screen-recorder-with-teleprompter/` |
| Local/privacy | `local screen recorder for mac` | `/features/local-screen-recorder-for-mac/` |
| Developer demos | `screen recorder for developers` | `/use-cases/screen-recorder-for-developers/` |
| Courses/tutorials | `screen recorder for online courses` | `/use-cases/screen-recorder-for-online-courses/` |
| Professional polish | `how to make screen recordings look professional` | `/blog/how-to-make-screen-recordings-look-professional/` |
| Capture setup | `how to record screen and camera on mac` | `/blog/how-to-record-screen-and-camera-on-mac/` |
| Audio setup | `how to record system audio on mac` | `/blog/how-to-record-system-audio-on-mac/` |

### Tier 3: competitor intent

Create these only after the corresponding first-hand comparison is tested and documented:

| Target intent | Recommended page |
|---|---|
| `screen studio alternative for mac` | `/compare/autocuts-vs-screen-studio/` |
| `loom alternative for product demos` | `/compare/autocuts-vs-loom/` |
| `quicktime alternative with system audio` | `/compare/autocuts-vs-quicktime/` |
| `obs alternative for screen recording mac` | `/compare/autocuts-vs-obs/` |

Do not publish a competitor page from public marketing copy alone. Test the current products, date the comparison, show the test environment, cite public pricing/features, and state clearly where the competitor wins.

## Homepage plan

The homepage should own the broad category and brand. Supporting pages should own narrower intents.

### Recommended search presentation

**Title:** `Autocuts: Mac Screen Recorder With Automatic Zoom`

**Meta description:** `Record your Mac screen, camera, mic, and system audio. Autocuts adds click-based zooms, smooth cursor motion, captions, and 4K export. $49 once.`

**H1:** Keep the approved product promise: `Record your screen and camera with cinematic auto-edits.`

Immediately below the H1, add one literal category sentence:

> Autocuts is a local Mac screen recorder that captures your screen and camera, then adds automatic zooms, smooth cursor motion, layouts, backgrounds, and captions.

This lets the headline sell the outcome while the supporting sentence establishes the product category for humans and search systems.

### Homepage content changes

1. Make the real download and checkout URLs available before requesting reindexing.
2. Add visible links to the Features, Use Cases, Compare, About, and Guides hubs.
3. Link every major homepage feature card to its dedicated page once that page exists.
4. Add a short “What is Autocuts?” answer near the top using the literal category definition.
5. Add a “How it works” sequence: record, automatic edits, review, export.
6. Add first-party before/after examples with concise captions describing what changed.
7. Add truthful product proof: supported Macs tested, export samples, privacy behavior, and update date.
8. Regenerate the Open Graph image and image descriptions for the screen-recorder product.
9. Ensure pricing, device count, refund terms, system requirements, legal pages, and schema all agree.
10. Add analytics events for download click, checkout click, completed purchase, and mobile “send link” action if offered.

## Legacy URL migration plan

Use this rule:

- **Rewrite in place** when the URL and user intent still fit the new product.
- **301 redirect** only when a new page genuinely satisfies substantially the same intent.
- **410 Gone** when the product no longer satisfies the intent and there is no honest replacement.
- Never redirect every obsolete page to the homepage. That creates a poor user experience and may be treated as a soft 404.

| Existing URL | Decision | Destination or action | Reason |
|---|---|---|---|
| `/` | Keep | Rewrite metadata and supporting category copy | Main brand and category URL. |
| `/about/` | Rewrite in place | Local Mac recorder, company, privacy model, audiences, product history | Strong existing position and correct long-term URL. |
| `/features/ai-video-cleanup/` | Conditional 301 | `/features/transcript-video-cleanup/` | Only if the shipped product truly removes filler and cuts by transcript as described. |
| `/features/add-motion-graphics-to-videos/` | Conditional 301 | `/features/cinematic-auto-edits/` | Only if the replacement directly explains automatic motion applied to screen recordings. |
| `/blog/add-motion-graphics-without-editing-skills/` | Conditional 301 | `/blog/how-to-make-screen-recordings-look-professional/` | Adjacent intent if the new article answers the original need. |
| `/blog/clean-up-youtube-videos-faster/` | Conditional 301 | A tested transcript-cleanup guide | Keep only if the app can fulfill the claims. |
| `/features/turn-long-videos-into-shorts/` | 410 | Human-readable retired-product page | The new homepage does not promise automatic multi-short extraction. |
| `/features/ai-video-editor-for-youtubers/` | 410 | Human-readable retired-product page | The product category no longer matches. |
| `/blog/best-ai-video-editor-for-youtubers/` | 410 | Human-readable retired-product page | It earned 791 impressions and zero clicks; intent is obsolete. |
| `/blog/how-to-turn-long-videos-into-shorts/` | 410 | Human-readable retired-product page | No honest new-product equivalent. |
| `/blog/best-capcut-alternative-for-talking-videos/` | 410 | Human-readable retired-product page | New Autocuts is not a direct CapCut talking-video alternative. |
| Old CapCut, Descript, and OpusClip comparisons | 410 | Remove from hubs and sitemap | Comparisons no longer match the product. |
| `studio.autocuts.ai` | Decision gate | Redirect only if the new public product replaces the old entry point; otherwise retire with 410/noindex | The export shows 28 impressions. Confirm operational ownership first. |
| `privacy.html` and `terms.html` | Rewrite in place | Accurate local desktop-app legal terms | Current cloud-upload language contradicts the product. |

Keep the redirect/410 map in version control. Test every old URL before launch, after launch, and again after Google recrawls it.

## Recommended information architecture

### Launch structure

```text
/
/about/
/features/
/features/mac-screen-recorder-with-auto-zoom/
/features/screen-and-camera-recorder-for-mac/
/features/screen-recorder-with-teleprompter/
/mac-screen-recorder-no-subscription/
/use-cases/
/use-cases/product-demo-recorder/
/use-cases/screen-recorder-for-developers/
/compare/
/compare/autocuts-vs-screen-studio/
/blog/
/blog/how-to-record-screen-and-camera-on-mac/
/blog/how-to-make-screen-recordings-look-professional/
/privacy.html
/terms.html
```

Add later only when the first wave is indexed, useful, and internally linked:

- local/privacy feature page;
- online-course use case;
- QuickTime, Loom, and OBS comparisons;
- system-audio guide;
- Mac screen-recorder comparison built from first-hand tests;
- changelog and detailed system-requirements pages.

Do not start with ScreenCharm's full network of alternatives and free tools. Autocuts first needs a coherent entity, a clean migration, and evidence-rich cornerstone pages.

## AEO content standard

Google's current guidance treats AEO/GEO as normal search optimization grounded in its indexed content. There is no special Google AI markup. Every important page should therefore be built to help a person answer a real question and to give answer engines facts they can safely quote.

### Required page anatomy

1. **Direct answer:** 40 to 70 words near the top that answers the page's main question.
2. **Who it is for:** one explicit audience and workflow, not “everyone.”
3. **First-hand proof:** original screenshot, demo video, export sample, or measured test.
4. **How it works:** three to five concrete steps using shipped product behavior.
5. **Capabilities and constraints:** supported hardware, OS, formats, resolution, frame rate, privacy, and known limits.
6. **Comparison:** a factual table where relevant, with test date and source links.
7. **Questions:** visible answers to genuine pre-purchase or setup questions.
8. **Entity block:** consistent name, category, price, platform, download URL, support URL, and update date.
9. **Clear action:** real download, purchase, or next-step URL.
10. **Ownership:** author or company attribution and a visible updated date on guides/comparisons.

### Priority answer questions

Autocuts should be able to answer these accurately on crawlable HTML pages:

- What is Autocuts?
- What is the best Mac screen recorder with automatic zoom?
- Which Mac screen recorder records the screen and webcam together?
- Can a Mac screen recorder capture system audio and microphone audio?
- Which Mac screen recorder has a teleprompter?
- Is there a one-time-purchase Mac screen recorder?
- Does Autocuts upload recordings to the cloud?
- How does automatic zoom work in Autocuts?
- Can automatic zooms be edited after recording?
- What is a good Screen Studio alternative for a one-time price?
- Which recorder is best for product demos and software walkthroughs?
- What formats and resolutions does Autocuts export?

### Unique content program

Prioritize material that competitors cannot produce without using Autocuts:

- before/after recordings showing each automatic edit;
- an explainer showing how click data becomes editable zoom segments;
- an Apple Silicon test matrix using machines actually tested;
- 4K/60 export examples with the exact source, duration, export time, and output size;
- a privacy walkthrough showing where files are stored and what never leaves the Mac;
- a teleprompter demonstration showing that the overlay stays out of the capture;
- honest competitor comparisons based on current versions and the same recording task;
- a changelog with shipped improvements and dates;
- customer examples only with permission and verifiable attribution.

Avoid generic “10 best tools” articles unless Autocuts has actually tested every included tool. Avoid claims such as “best,” “only,” or “fastest” without a defined, reproducible basis.

## Structured data and entity plan

### Homepage

1. Keep `SoftwareApplication`, but ensure all values match visible content.
2. Add `Organization` with canonical name, logo, URL, support/contact, and truthful `sameAs` profiles.
3. Add `WebSite` with `name: Autocuts`, the canonical URL, and a consistent alternate name only if one is actually used.
4. Add a stable `@id` for the organization and software application so inner pages can reference the same entities.
5. Add `downloadUrl` only when the real download exists.
6. Add `softwareVersion`, release notes, requirements, or file size only when the site has a maintained source of truth.
7. Do not invent ratings. Google's software-app rich-result requirements include a genuine rating or review in addition to the offer. Add rating markup only when the same verified reviews are visible on the page.

### Inner pages

- `BreadcrumbList` for feature, use-case, guide, and comparison pages;
- `Article` or `BlogPosting` for editorial guides with author and dates;
- `VideoObject` for indexable product demonstrations with a real thumbnail, upload date, duration, and accessible video URL;
- the same software and organization entity IDs where relevant.

Keep visible FAQ content because it helps users and answer extraction. Do not expect a Google FAQ rich result: Google removed that feature in May 2026. `FAQPage` markup is therefore not a priority for Google Search.

## Technical SEO migration checklist

### P0: before requesting reindexing

- [ ] Replace all old AI-editor positioning in public HTML, metadata, schema, `llms.txt`, legal pages, and image descriptions.
- [ ] Decide every old URL: rewrite, 301, or 410.
- [ ] Implement permanent redirects at the hosting/CDN layer where possible.
- [ ] Remove retired URLs from navigation, internal links, and the sitemap.
- [ ] Update sitemap `lastmod` only when a page actually changes.
- [ ] Update the homepage sitemap image title and image URL.
- [ ] Add the new launch pages to the sitemap only after they return `200` and self-canonicalize.
- [ ] Add real download and checkout destinations.
- [ ] Ensure price, refund, device count, platform, and privacy claims agree everywhere.
- [ ] Rewrite About, Privacy, and Terms for the actual local app.
- [ ] Audit `studio.autocuts.ai` and all `www`, HTTP, HTTPS, and trailing-slash variants.
- [ ] Prevent demo source projects, snapshots, briefs, package files, and composition HTML from being deployed or indexed. Serve only required public videos and posters.
- [ ] Confirm every indexable URL has one title, one H1, a meta description, canonical, Open Graph data, and a useful status code.
- [ ] Confirm no important content requires interaction before it appears in rendered HTML.

### P1: launch quality

- [ ] Add crawlable hub pages for Features, Use Cases, Compare, and Guides.
- [ ] Add contextual links from homepage cards to their owner pages.
- [ ] Add breadcrumbs and related-page links on every inner page.
- [ ] Validate structured data with the Rich Results Test and Schema Markup Validator.
- [ ] Add VideoObject markup to the main product demo, then to other substantial demos.
- [ ] Keep video bytes and poster images crawlable.
- [ ] Use descriptive image alt text where an image conveys information; keep decorative images empty.
- [ ] Run Lighthouse/PageSpeed on mobile and desktop after deployment.
- [ ] Preserve lazy loading for below-the-fold media and avoid loading every MP4 at page start.
- [ ] Check Core Web Vitals after real traffic arrives.
- [ ] Generate a new social preview that visibly shows the screen-recorder product.

### P2: maintenance

- [ ] Add a changelog and update it when features ship.
- [ ] Recheck competitor facts and prices at least quarterly.
- [ ] Revalidate redirects and 410s monthly during the migration.
- [ ] Monitor indexed pages, duplicate canonicals, crawl errors, and video indexing.
- [ ] Remove or consolidate pages that receive no relevant impressions and add no user value after a reasonable evaluation window.

## Internal-link strategy

Every page should have one clear role and link naturally to the next decision:

```text
Homepage
  -> Feature proof
  -> Use-case fit
  -> Comparison
  -> Pricing/download

Guide
  -> Relevant feature page
  -> Product demo
  -> Download

Comparison
  -> Method and evidence
  -> Relevant feature page
  -> Pricing/download
```

Use descriptive anchors such as “Mac screen recorder with automatic zoom,” not repeated generic anchors such as “learn more.” Avoid sitewide links to every page. Hubs and contextual links should establish the hierarchy.

## Authority and off-site discovery

After the migration is technically clean:

1. Relaunch the new category on Product Hunt and update existing directory profiles instead of creating duplicate product identities.
2. Correct old descriptions on AlternativeTo, SaaSHub, social profiles, YouTube, LinkedIn, and any previous launch pages.
3. Publish product demonstrations on YouTube with titles that match the page intent and link to the relevant landing page.
4. Offer reviewers a reproducible test checklist and a real build, not prewritten praise.
5. Pitch inclusion in Mac screen-recorder and product-demo roundups only after the download is public.
6. Earn links with useful original evidence: export benchmarks, privacy architecture, click-to-zoom explanation, and tested comparisons.
7. Ask customers for reviews after genuine use. Never manufacture reviews or undisclosed endorsements.
8. Keep brand naming consistent as **Autocuts** or **Autocuts for Mac**. Retire “AutoCuts AI” from current product descriptions.

The brand's current exact-query position is an asset. Consistent entity information across the site, product listings, profiles, and videos will help Google separate Autocuts the product from generic “auto cut” intent.

## AEO distribution and monitoring

For Google, normal SEO remains the foundation of AI visibility. Google says `llms.txt` does not help or hurt Google rankings, structured data is not required for generative AI results, and useful first-hand content matters more than AEO tricks.

Still maintain an accurate `llms.txt` for any non-Google systems that choose to use it. It must never contradict the HTML site.

Create a monthly answer-engine test set and record:

- whether Autocuts is mentioned;
- whether Autocuts is cited with a clickable source;
- which page is cited;
- whether the answer describes the product correctly;
- which competitors are included;
- whether the stated price, platform, privacy, and features are accurate.

Use at least these prompts:

1. Best Mac screen recorder with automatic zoom.
2. Mac screen recorder that records the screen and camera together.
3. Best screen recorder for a SaaS product demo.
4. One-time-purchase alternative to Screen Studio.
5. Local Mac screen recorder that does not upload recordings.
6. Screen recorder for Mac with a teleprompter.
7. How to make a Mac screen recording look professionally edited.
8. Autocuts vs Screen Studio.

Run the same prompt set in Google AI Mode, ChatGPT search, Perplexity, and Bing Copilot where available. Treat the results as directional observations, not stable rankings.

## Measurement plan

### Search Console query groups

Track these groups separately:

1. **Brand:** `autocuts`, `auto cuts`, close brand misspellings.
2. **New category:** Mac screen recorder, screen recorder for Mac, screen recording software for Mac.
3. **Feature:** automatic zoom, auto zoom, webcam/camera, system audio, teleprompter, smooth cursor, local recorder.
4. **Use case:** product demo, developer demo, tutorial, course, SaaS walkthrough.
5. **Competitor:** Screen Studio, Loom, QuickTime, OBS, ScreenFlow.
6. **Legacy:** AI video editor, talking head, long video to shorts, CapCut, Descript, OpusClip.

Report clicks, impressions, CTR, and position by query group, page, country, and device. Use rolling 28-day comparisons, not day-to-day noise.

### Conversion events

Organic traffic is not the business outcome. Measure:

- download CTA click;
- successful download start;
- checkout CTA click;
- completed purchase;
- mobile send-link submission, if implemented;
- source landing page and query cluster where available.

Do not ship the SEO launch with placeholder CTAs. Search traffic that cannot download or purchase produces misleading performance data.

### Operating targets, not forecasts

| Window | Target |
|---|---|
| First 7 days | All P0 URLs return intended status codes; sitemap contains no obsolete product pages; legal and product facts agree; tracking works. |
| First 30 days | Homepage and first-wave pages are crawled and indexed; new screen-recorder queries begin appearing; legacy URLs trend down; no redirect chains or soft-404 pattern. |
| First 60 days | New-category impressions grow on a rolling 28-day basis; at least two feature/use-case pages earn relevant non-brand impressions; US and desktop CTR improve from their weak baselines. |
| First 90 days | Several priority long-tail terms reach the top 20; the majority of non-brand impressions come from the new product category; organic download and purchase conversion can be measured by landing page. |

Do not promise a ranking date. Google explicitly notes that crawling, indexing, and serving are not guaranteed.

## 90-day execution sequence

### Days 0 to 7: make the site truthful

1. Freeze publication of new legacy-content pages.
2. Rewrite About, Privacy, Terms, `llms.txt`, social metadata, and sitemap.
3. Create and implement the rewrite/301/410 map.
4. Decide the fate of `studio.autocuts.ai`.
5. Install real download and checkout URLs.
6. Update homepage entity/schema and visible category definition.
7. Remove demo-production sources from the deployable web root.
8. Validate status codes, canonicals, schema, and tracking.
9. Deploy, submit the sitemap, and request indexing for the homepage and essential pages.

### Days 8 to 30: establish the category

Publish in this order:

1. Mac screen recorder with automatic zoom.
2. Screen and camera recorder for Mac.
3. Mac screen recorder with no subscription.
4. Product demo recorder for Mac.
5. Rewritten About page and Features/Use Cases hubs.

Each page must include an original product demonstration and direct factual answers.

### Days 31 to 60: establish differentiation

1. Publish the teleprompter page.
2. Publish the developers use-case page.
3. Publish the local/private recording page.
4. Publish “How to record screen and camera on Mac.”
5. Publish the first-hand Screen Studio comparison.
6. Launch updated directory and social profiles.
7. Begin monthly answer-engine prompt monitoring.

### Days 61 to 90: build authority

1. Publish the professional-screen-recording guide with before/after evidence.
2. Publish one additional tested comparison based on Search Console demand.
3. Publish an Apple Silicon or export benchmark using real test data.
4. Add customer examples and verified reviews when available.
5. Review query cannibalization and consolidate overlapping pages.
6. Reprioritize the next content wave using new Search Console queries, not the old export.

## Prioritized backlog

| ID | Priority | Work item | Completion evidence |
|---|---|---|---|
| SEO-01 | P0 | Rewrite sitemap for the new product | Only live, canonical, relevant URLs; accurate lastmod and image data. |
| SEO-02 | P0 | Produce URL rewrite/301/410 map | Every current and GSC-reported legacy URL has one tested decision. |
| SEO-03 | P0 | Rewrite About | Product, audience, company, and privacy model match the desktop app. |
| SEO-04 | P0 | Rewrite Privacy and Terms | No obsolete upload/cloud/credit claims unless they remain true. |
| SEO-05 | P0 | Rewrite `llms.txt` | Matches the public HTML, platform, price, and product behavior. |
| SEO-06 | P0 | Add real download and checkout destinations | CTAs complete the intended action and analytics fire. |
| SEO-07 | P0 | Resolve `studio.autocuts.ai` | Verified redirect, retirement, or maintained product role. |
| SEO-08 | P0 | Align homepage metadata and visible category statement | Title, description, H1 support, OG, and schema describe one product. |
| SEO-09 | P0 | Stop deploying demo source artifacts | Only public renders/posters are web-accessible. |
| SEO-10 | P0 | Validate technical migration | Status, canonical, sitemap, robots, schema, mobile, and tracking checks pass. |
| SEO-11 | P1 | Create Features and Use Cases hubs | Hubs are indexable and linked from the homepage/footer. |
| SEO-12 | P1 | Auto-zoom feature page | Original demo, direct answers, internal links, and CTA. |
| SEO-13 | P1 | Screen + camera feature page | Original demo and accurate system-audio/camera workflow. |
| SEO-14 | P1 | No-subscription page | Price comparison is dated, sourced, and maintained. |
| SEO-15 | P1 | Product-demo use case | Concrete founder/developer workflow with example output. |
| SEO-16 | P1 | Teleprompter feature page | Voice-paced behavior and capture exclusion demonstrated. |
| SEO-17 | P1 | Screen Studio comparison | First-hand test, honest winner by use case, dated sources. |
| SEO-18 | P1 | Add Organization/WebSite entity graph | Stable IDs and consistent brand facts validate. |
| SEO-19 | P1 | Add VideoObject to primary demo | Video indexing fields validate and assets are crawlable. |
| SEO-20 | P1 | Build organic conversion dashboard | Query cluster, landing page, download, checkout, and purchase visible. |
| SEO-21 | P2 | Developers use-case page | Developer-specific demo and tasks, not generic copy. |
| SEO-22 | P2 | Local/private recorder page | Accurate architecture and file-location evidence. |
| SEO-23 | P2 | Screen + camera setup guide | Reproducible steps and product screenshots. |
| SEO-24 | P2 | Professional recording guide | Before/after examples and measurable workflow. |
| SEO-25 | P2 | Changelog and system requirements | Maintained facts with release dates. |
| SEO-26 | P2 | Update product directories and social entities | One consistent category description and canonical URL. |
| SEO-27 | P2 | Monthly answer-engine audit | Prompt set, citations, factual accuracy, and competitors recorded. |
| SEO-28 | P2 | Quarterly content consolidation | Cannibalization, obsolete facts, and zero-value pages resolved. |

## Definition of done for every new page

A page is not complete until:

- it owns one primary intent and does not duplicate another page;
- its title, H1, introduction, canonical, and Open Graph data agree;
- the main answer is present in static/rendered HTML;
- claims are supported by shipped behavior or cited first-hand testing;
- limitations are stated honestly;
- images and video have useful text alternatives and crawlable assets;
- structured data matches visible content and validates;
- it links to its parent hub, one or two relevant sibling pages, and a real conversion action;
- it appears in the sitemap with an accurate last-modified date;
- it returns `200`, is mobile usable, and meets the agreed performance budget;
- download/checkout analytics are tested;
- Search Console inspection is requested after deployment.

## Guardrails

Do not:

- keep obsolete pages only because they have impressions;
- redirect unrelated old pages to the homepage;
- create dozens of near-duplicate keyword pages;
- use meta-keyword stuffing;
- treat `llms.txt` as a Google ranking lever;
- manufacture ratings, testimonials, comparison results, or “best” claims;
- copy ScreenCharm's wording;
- publish competitor prices or features without a checked date and source;
- claim cloud privacy, local-only behavior, platform support, or export performance beyond what the shipped app does;
- request mass reindexing while legal, sitemap, or download destinations remain contradictory.

## Sources

### First-party

- Google Search Console export: `/Users/ajmaljalal/Downloads/autocuts.ai-Performance-on-Search-2026-08-13.zip`
- Current homepage: `index.html`
- Current sitemap: `sitemap.xml`
- Current crawler policy: `robots.txt`
- Current AI summary: `llms.txt`
- Current legacy pages under `about/`, `features/`, `blog/`, and `compare/`

### ScreenCharm architecture reviewed

- https://screencharm.com/
- https://screencharm.com/use-cases
- https://screencharm.com/compare
- https://screencharm.com/mac-screen-recorder-no-subscription

### Google guidance

- Generative AI search optimization: https://developers.google.com/search/docs/fundamentals/ai-optimization-guide
- Redirects and status strategy: https://developers.google.com/search/docs/crawling-indexing/301-redirects
- Software application structured data: https://developers.google.com/search/docs/appearance/structured-data/software-app
- Video structured data: https://developers.google.com/search/docs/appearance/structured-data/video
- Site names and entity consistency: https://developers.google.com/search/docs/appearance/site-names
- FAQ rich-result removal announced June 2026: https://developers.google.com/search/updates#removing-faq-rich-result
