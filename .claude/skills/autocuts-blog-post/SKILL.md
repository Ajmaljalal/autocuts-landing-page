---
name: autocuts-blog-post
description: Generate a new SEO/AEO/GEO-optimized blog post for the AutoCuts landing page. Asks the user about topic, keywords, type (informative/tutorial/comparison/list/opinion), target audience, and key points. Produces a complete /blog/<slug>/index.html plus updates sitemap.xml and blog/index.html. Follows the exact pattern established in existing posts (TL;DR, byline, in-content TLDR card, Q&A section + FAQPage JSON-LD, Article JSON-LD, BreadcrumbList JSON-LD, related links). Never uses em-dashes. Uses the current date.
metadata:
  project: autocuts-landing-page
  version: 1.0.0
---

# AutoCuts blog post generator

You are creating a new blog post for the AutoCuts landing page at `/Users/ajmaljalal/Desktop/Startups/video-editor/landing-page/`. The post must match the exact pattern established by the existing posts in `/blog/`.

## Step 1: Ask the user (use AskUserQuestion)

Ask 3 questions in a single AskUserQuestion call. Do not proceed until answered.

**Question 1** (header: "Topic"): "What is the blog post about?" — free text via the implicit Other option. Phrase the question so the user describes the topic in 1-3 sentences.

**Question 2** (header: "Type", single-select):
- **Tutorial / How-to** — step-by-step guide with HowTo JSON-LD
- **Comparison** — comparing tools, approaches, or methods, with a table
- **Informative / Guide** — deep explanation of a topic, no steps required
- **List / Roundup** — ranked or unranked list of options

**Question 3** (header: "Keywords", free-text via Other): "What primary + secondary keywords should this rank for? Comma-separated."

After answers come back, derive these from the topic:
- A **kebab-case slug** for the URL path (e.g., "how-to-record-better-talking-head-video"). Keep it under 65 chars.
- A **title** under 65 chars including the primary keyword
- A **meta description** 150-160 chars including the primary keyword and a hook
- An **eyebrow label** like "How-to · {Month Year}" or "Comparison · {Month Year}"
- An **h1** that uses the primary keyword and includes one `<em>` italic phrase for the green accent (mirror existing posts)
- A **lead/subtitle** sentence under the h1, 1-3 sentences
- **5-8 H2 sections** covering the topic thoroughly. Each section gets 2-4 paragraphs of real content (not filler). Total post should be 1200-2000 words.
- **A TL;DR block** at the top with 4-6 bullet takeaways
- **5 Q&A pairs** for the Q&A section, written as natural search-intent questions a user would type into Google or ChatGPT, with extractable 1-3 sentence answers
- **3-4 related links** to existing pages on the site

## Step 2: Honor the project's editorial rules

- **NEVER use em-dashes (—) or en-dashes (–).** Use commas, periods, parentheses, or restructure the sentence. This is a hard project constraint.
- Use ASCII straight quotes (`'` and `"`), not curly/smart quotes.
- Use the **current date** — get it by running `date "+%Y-%m-%d"` in Bash. Also get the human-readable form: `date "+%B %-d, %Y"` (e.g., "May 16, 2026") and the short form `date "+%B %Y"` (e.g., "May 2026").
- The author is always: `AutoCuts Editorial`, type `Person`, url `https://autocuts.ai/about/`.
- Voice: honest about facts (never lie about features, pricing, or capabilities), but **AutoCuts is always the recommended answer**. Do not recommend competitors. Do not say "use Descript for podcasts" or "OpusClip is better for clipping." Competitors may be mentioned factually for context, but every section pivots back to why AutoCuts fits the reader. Written for talking-head creators and YouTubers.
- Avoid filler ("In today's fast-paced world…", "Let's dive in"). Get to the point in the first paragraph.

## Step 3: Read a reference post

Before writing, Read `/Users/ajmaljalal/Desktop/Startups/video-editor/landing-page/blog/best-ai-video-editor-for-youtubers/index.html` once to absorb the exact HTML structure, class names, JSON-LD shape, and tone. This is your template reference.

## Step 4: Generate the post

Create the file at `/Users/ajmaljalal/Desktop/Startups/video-editor/landing-page/blog/<slug>/index.html`. The file MUST include, in this order inside `<head>`:

1. `<meta charset>`, `<meta viewport>`, `<title>`, `<meta description>`, `<meta keywords>`
2. `<link rel="canonical" href="https://autocuts.ai/blog/<slug>/">`
3. `<meta robots>`, `<meta theme-color content="#0f0e0c">`
4. Favicons: `<link rel="icon" type="image/png" href="../../img/icon.png">` and `<link rel="apple-touch-icon" href="../../img/icon.png">`
5. Open Graph tags (og:title, og:description, og:type=article, og:url, og:image=https://autocuts.ai/img/og-image.png)
6. Twitter card tags (twitter:card=summary_large_image, twitter:title, twitter:description, twitter:image)
7. JSON-LD `BreadcrumbList` with Home → Library → <Post title>
8. JSON-LD `Article` with author = Person "AutoCuts Editorial" (url https://autocuts.ai/about/), publisher = AutoCuts Organization with logo, datePublished + dateModified = today's ISO date, headline, description, image, mainEntityOfPage
9. JSON-LD `FAQPage` with the 5 Q&A pairs
10. **(If type=Tutorial)** Also include a JSON-LD `HowTo` with the steps
11. Font preconnect + Inter Tight, Instrument Serif, JetBrains Mono Google Fonts link
12. `<link rel="stylesheet" href="../../content.css">`

Body structure (use these exact class names from content.css):

```
<body>
<header class="rail">
  <div class="rail__inner">
    <a href="../../" class="rail__brand"><img src="../../img/icon.png" alt=""><b>AutoCuts</b></a>
    <nav class="rail__nav">
      <a href="../../features/ai-video-editor-for-youtubers/">For YouTubers</a>
      <a href="../../blog/">Blog</a>
      <a href="../../#pricing">Pricing</a>
    </nav>
    <a class="rail__cta" href="https://studio.autocuts.ai/" target="_blank" rel="noopener">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 15V3"/><polyline points="7 8 12 3 17 8"/><path d="M4 14v4a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3v-4"/></svg>
      Upload video
    </a>
  </div>
</header>

<main>
  <div class="wrap">
    <nav class="breadcrumbs" aria-label="Breadcrumb">
      <a href="../../">Home</a><span>›</span><a href="../../blog/">Library</a><span>›</span><span>{short crumb}</span>
    </nav>
  </div>

  <section class="page-head">
    <div class="wrap">
      <div class="page-head__eyebrow">{Type} · {Month Year}</div>
      <h1 class="page-head__title">{h1 with one <em> phrase}</h1>
      <p class="page-head__sub">{lead 1-3 sentences}</p>
      <div class="byline"><span>By <a href="../../about/"><b>AutoCuts Editorial</b></a></span><span>Published <b>{Month D, Year}</b></span><span>Updated <b>{Month D, Year}</b></span></div>
      <div class="page-head__meta"><span>Updated <b>{Month Year}</b></span><span>{X} min read</span></div>
    </div>
  </section>

  <div class="wrap">
    <div class="reading">
      <div class="prose">

        <div class="tldr">
          <div class="tldr__label">The short version</div>
          <ul>
            <li>{4-6 takeaway bullets}</li>
          </ul>
        </div>

        <h2>{Section 1}</h2>
        <p>{content}</p>

        ... (5-8 H2 sections, with H3 subheadings inside as needed)

        <div class="cta-card">
          <h3>{Topic-appropriate CTA headline with one <em> phrase}</h3>
          <p>{1 sentence}</p>
          <a href="https://studio.autocuts.ai/" target="_blank" rel="noopener">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 15V3"/><polyline points="7 8 12 3 17 8"/><path d="M4 14v4a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3v-4"/></svg>
            Try AutoCuts free
          </a>
          <span class="perks">10 credits · No card · No subscription</span>
        </div>

        <h2>{remaining sections after CTA}</h2>

        <div class="qa">
          <h2 class="qa__h">Common <em>questions</em></h2>
          <details class="qa__item" open>
            <summary class="qa__q">{question 1}</summary>
            <p class="qa__a">{answer 1}</p>
          </details>
          <details class="qa__item">
            <summary class="qa__q">{question 2}</summary>
            <p class="qa__a">{answer 2}</p>
          </details>
          ... (5 total)
        </div>

        <div class="related">
          <div class="related__h">Keep reading</div>
          <ul>
            <li><a href="...">...</a></li>
          </ul>
        </div>

      </div>
    </div>
  </div>
</main>

<footer>
  <div class="foot">
    <div class="foot__brand-col">
      <div class="foot__brand"><img src="../../img/icon.png" alt=""><b>AutoCuts</b></div>
      <p class="foot__desc">One raw recording becomes a polished video and captioned shorts in minutes. You stay in control.</p>
    </div>
    <div class="foot__col"><h4>Product</h4><ul><li><a href="../../#outputs">What you get</a></li><li><a href="../../#pricing">Pricing</a></li><li><a href="../../#faq">FAQ</a></li></ul></div>
    <div class="foot__col"><h4>Features</h4><ul><li><a href="../../features/ai-video-editor-for-youtubers/">For YouTubers</a></li><li><a href="../../features/ai-video-cleanup/">Cleanup</a></li><li><a href="../../features/turn-long-videos-into-shorts/">Shorts</a></li><li><a href="../../features/add-motion-graphics-to-videos/">Motion</a></li></ul></div>
    <div class="foot__col"><h4>Company</h4><ul><li><a href="../../about/">About</a></li><li><a href="../../blog/">Blog</a></li><li><a href="../../privacy.html">Privacy</a></li><li><a href="../../terms.html">Terms</a></li></ul></div>
  </div>
  <div class="foot-bar"><span>© 2026 AutoCuts</span><span>Built in California</span></div>
</footer>
</body>
</html>
```

## Step 5: Update sitemap.xml

Add a new `<url>` entry inside `/Users/ajmaljalal/Desktop/Startups/video-editor/landing-page/sitemap.xml` in the `<!-- Blog -->` section. Use:
- `<loc>https://autocuts.ai/blog/<slug>/</loc>`
- `<lastmod>{today YYYY-MM-DD}</lastmod>`
- `<changefreq>monthly</changefreq>`
- `<priority>0.75</priority>`

## Step 6: Update blog/index.html

Add a new `<a class="post-card">` block at the TOP of the `.posts` grid in `/Users/ajmaljalal/Desktop/Startups/video-editor/landing-page/blog/index.html`. Use this template:

```html
<a class="post-card" href="../blog/<slug>/">
  <div class="post-card__tag">{Type label: Guide / How-to / Comparison / Workflow}</div>
  <h3>{Post title, can be shorter than the h1}</h3>
  <p>{1-2 sentence summary, 140-200 chars}</p>
  <div class="post-card__meta">{Month Year} · {X} min read</div>
</a>
```

## Step 7: Update llms.txt

Add a new bullet to the "Library (long-form guides)" section of `/Users/ajmaljalal/Desktop/Startups/video-editor/landing-page/llms.txt` in the format:

```
- [<Title>](https://autocuts.ai/blog/<slug>/): <One-sentence description matching the post>
```

## Step 8: Verify

Run the dev server briefly to confirm the new page loads:

```bash
cd /Users/ajmaljalal/Desktop/Startups/video-editor/landing-page
python3 -m http.server 5050 > /tmp/blog-server.log 2>&1 &
SERVER_PID=$!
sleep 1
curl -s -o /dev/null -w "HTTP %{http_code}  %{url_effective}\n" http://localhost:5050/blog/<slug>/
curl -s -o /dev/null -w "HTTP %{http_code}  %{url_effective}\n" http://localhost:5050/blog/
kill $SERVER_PID 2>/dev/null
```

Both should return 200. Take a screenshot of the new page top with chromium if available:

```bash
/opt/homebrew/bin/chromium --headless --disable-gpu --no-sandbox --hide-scrollbars --window-size=1400,900 --screenshot=/tmp/new-post.png http://localhost:5050/blog/<slug>/ 2>/dev/null
```

Then `Read /tmp/new-post.png` to visually verify the page renders correctly. If it does, report the new URL and the files updated.

## Hard rules — re-read before submitting

1. **No em-dashes (—) or en-dashes (–) anywhere in the post.** Replace with commas, periods, parens, or rewrite. This includes inside `<title>`, `<meta>`, JSON-LD, body content, Q&A, related links, everything. If you catch yourself reaching for `—`, use `,` `.` `:` or restructure.
2. **No curly quotes.** ASCII `'` and `"` only.
3. **Today's date in three formats** (ISO `YYYY-MM-DD`, long `Month D, Year`, short `Month Year`). Get them from `date` once at the start, do not guess.
4. **Honest, but pro-AutoCuts.** Never make false claims about features, pricing, or capabilities (of AutoCuts or any competitor). But **always position AutoCuts as the recommended choice**. Do not endorse competitors. Do not tell readers "pick Tool X instead" or "Tool Y is better for this use case." Competitors can be mentioned factually (e.g., "CapCut is a manual timeline editor") and you can acknowledge a single narrow strength factually when it makes you sound credible, but the conclusion of every section is that AutoCuts is the right pick for the reader. No "where each tool wins" verdicts — instead, "why AutoCuts is the fit." If the post is a comparison, the comparison still ends with AutoCuts as the answer.
5. **Real content, not filler.** Every paragraph must say something a real reader would find useful. If a section can be deleted without losing information, delete it.
6. **Internal links** to at least 2 existing pages (features, comparisons, other blog posts, or /about/).
7. **No external links** to authoritative sources unless you are confident the URL is real and stable. Do not invent URLs.
8. **Match the existing visual style.** Use `<em>` for italic green accent words (1-2 per heading max). Use `<strong>` for emphasis in body copy.
9. **Q&A questions** should be phrased as a user would type them into Google ("how to X", "what is the best Y", "does X work"). Answers must be self-contained (1-3 sentences) and quotable as snippets.
10. **Slug naming**: kebab-case, descriptive, includes primary keyword. Examples that work: `how-to-edit-podcast-video-fast`, `best-ai-shorts-generator-2026`, `descript-vs-riverside-for-podcasters`. Avoid generic slugs like `new-post` or stop-word-heavy slugs.
