import { readFileSync, readdirSync, statSync } from "node:fs";
import { dirname, extname, join, posix, relative, resolve, sep } from "node:path";

const root = resolve(import.meta.dirname, "..");
const siteOrigin = "https://autocuts.ai";
const ignoredDirectories = new Set([".git", "node_modules", ".thumbnails", "marketing", "videos"]);
const ignoredPrefixes = ["docs/", "videos/autocuts-desktop-demos/"];
const errors = [];

function webPath(file) {
  return relative(root, file).split(sep).join("/");
}

function walk(directory) {
  return readdirSync(directory).flatMap((name) => {
    if (ignoredDirectories.has(name)) return [];
    const file = join(directory, name);
    const path = webPath(file);
    if (ignoredPrefixes.some((prefix) => path.startsWith(prefix))) return [];
    return statSync(file).isDirectory() ? walk(file) : [file];
  });
}

function add(file, message) {
  errors.push(`${file}: ${message}`);
}

function match(content, pattern) {
  return content.match(pattern)?.[1]?.trim();
}

function routeToFile(route) {
  const cleanRoute = decodeURIComponent(route.split(/[?#]/)[0]);
  const relativeRoute = cleanRoute.replace(/^\/+/, "");
  if (!relativeRoute) return join(root, "index.html");
  if (cleanRoute.endsWith("/")) return join(root, relativeRoute, "index.html");
  const direct = join(root, relativeRoute);
  if (extname(relativeRoute)) return direct;
  return join(root, relativeRoute, "index.html");
}

function resolveHref(file, href) {
  if (/^(?:mailto:|tel:|javascript:|data:|#)/i.test(href)) return null;
  if (/^https?:\/\//i.test(href)) {
    const url = new URL(href);
    return url.origin === siteOrigin ? routeToFile(url.pathname) : null;
  }
  const withoutQuery = href.split(/[?#]/)[0];
  if (!withoutQuery) return null;
  if (withoutQuery.startsWith("/")) return routeToFile(withoutQuery);
  const base = webPath(dirname(file));
  const route = posix.normalize(posix.join("/", base === "." ? "" : base, withoutQuery));
  return routeToFile(route);
}

const files = walk(root);
const htmlFiles = files.filter((file) => file.endsWith(".html"));
const indexablePages = [];
const canonicals = new Map();
const titles = new Map();
const descriptions = new Map();

for (const file of htmlFiles) {
  const path = webPath(file);
  const content = readFileSync(file, "utf8");
  const isNoindex = /<meta\s+name=["']robots["'][^>]*content=["'][^"']*noindex/i.test(content);
  const isRedirect = /http-equiv=["']refresh["']/i.test(content);
  if (isNoindex || isRedirect) continue;

  indexablePages.push(file);
  const title = match(content, /<title>([\s\S]*?)<\/title>/i);
  const description = match(content, /<meta\s+name=["']description["']\s+content=["']([^"']+)["']/i)
    ?? match(content, /<meta\s+content=["']([^"']+)["']\s+name=["']description["']/i);
  const canonical = match(content, /<link\s+rel=["']canonical["']\s+href=["']([^"']+)["']/i)
    ?? match(content, /<link\s+href=["']([^"']+)["']\s+rel=["']canonical["']/i);
  const h1Count = (content.match(/<h1\b/gi) ?? []).length;

  if (!title) add(path, "missing <title>");
  if (!description) add(path, "missing meta description");
  if (!canonical) add(path, "missing canonical URL");
  if (!/<meta\s+name=["']robots["'][^>]*content=["'][^"']*index[^"']*follow/i.test(content)) {
    add(path, "missing index, follow robots directive");
  }
  if (!/<meta\s+property=["']og:title["']/i.test(content)) add(path, "missing Open Graph title");
  if (!/<meta\s+property=["']og:description["']/i.test(content)) add(path, "missing Open Graph description");
  if (h1Count !== 1) add(path, `expected one H1, found ${h1Count}`);
  if (canonical && !canonical.startsWith(`${siteOrigin}/`)) add(path, `canonical is outside ${siteOrigin}`);
  const isGuideHub = path === "blog/index.html";
  const isBlogArticle = /"@type"\s*:\s*"BlogPosting"/i.test(content);
  if ((isGuideHub || isBlogArticle) && !/<video\b[^>]*(?:data-src|src)=["'][^"']+["']/i.test(content)) {
    add(path, "indexable guide pages must include a product video");
  }

  for (const [value, map, label] of [
    [canonical, canonicals, "canonical"],
    [title, titles, "title"],
    [description, descriptions, "meta description"],
  ]) {
    if (!value) continue;
    if (map.has(value)) add(path, `duplicate ${label} also used by ${map.get(value)}`);
    else map.set(value, path);
  }

  const jsonLdBlocks = [...content.matchAll(/<script\s+type=["']application\/ld\+json["']>([\s\S]*?)<\/script>/gi)];
  for (const block of jsonLdBlocks) {
    try {
      const structuredData = JSON.parse(block[1]);
      const nodes = Array.isArray(structuredData)
        ? structuredData
        : Array.isArray(structuredData?.["@graph"])
          ? structuredData["@graph"]
          : [structuredData];
      const visibleText = content
        .replace(/<script\b[\s\S]*?<\/script>/gi, " ")
        .replace(/<style\b[\s\S]*?<\/style>/gi, " ")
        .replace(/<[^>]+>/g, " ")
        .replace(/\s+/g, " ")
        .trim();
      for (const node of nodes) {
        if (node?.["@type"] !== "FAQPage") continue;
        for (const question of node.mainEntity ?? []) {
          if (question?.name && !visibleText.includes(question.name)) {
            add(path, `FAQ schema question is not visible on the page: ${question.name}`);
          }
        }
      }
    } catch (error) {
      add(path, `invalid JSON-LD: ${error.message}`);
    }
  }

  for (const referenceMatch of content.matchAll(/(?:href|src|poster|data-src)=["']([^"']+)["']/gi)) {
    const reference = referenceMatch[1];
    const target = resolveHref(file, reference);
    if (target && !files.includes(target)) add(path, `broken local reference: ${reference}`);
  }

  if (/href=["']#["']/i.test(content)) add(path, "contains a placeholder href");
  if (/TODO:\s*replace with the real/i.test(content)) add(path, "contains an unfinished CTA");
}

const scanTargets = [
  ...indexablePages,
  ...["llms.txt", "sitemap.xml", "robots.txt"].map((name) => join(root, name)),
];
const stalePatterns = [
  [/RecForg/gi, "old RecForg product name"],
  [/AI video editor/gi, "old AI video editor positioning"],
  [/talking[- ]head/gi, "old talking-head positioning"],
  [/10 free credits|10 credits/gi, "old credit offer"],
  [/pay[- ]as[- ]you[- ]go/gi, "old pricing model"],
  [/studio\.autocuts\.ai/gi, "retired studio URL"],
  [/upload one raw recording/gi, "old upload workflow"],
];

for (const file of scanTargets) {
  const content = readFileSync(file, "utf8");
  for (const [pattern, label] of stalePatterns) {
    pattern.lastIndex = 0;
    if (pattern.test(content)) add(webPath(file), `contains ${label}`);
  }
}

const homepage = readFileSync(join(root, "index.html"), "utf8");
const homepageTitle = match(homepage, /<title>([\s\S]*?)<\/title>/i) ?? "";
const homepageDescription = match(homepage, /<meta\s+name=["']description["']\s+content=["']([^"']+)["']/i) ?? "";
const homepageBody = match(homepage, /<body\b[^>]*>([\s\S]*?)<\/body>/i) ?? "";
const stripMarkup = (value) => value
  .replace(/<script\b[\s\S]*?<\/script>/gi, " ")
  .replace(/<style\b[\s\S]*?<\/style>/gi, " ")
  .replace(/<[^>]+>/g, " ")
  .replace(/\s+/g, " ")
  .trim();
const homepageBodyText = stripMarkup(homepageBody);
const homepageHeroSub = stripMarkup(match(homepageBody, /<p\s+class=["']hero__sub["']>([\s\S]*?)<\/p>/i) ?? "");
const homepageHeadingText = [...homepageBody.matchAll(/<h[1-3]\b[^>]*>([\s\S]*?)<\/h[1-3]>/gi)]
  .map((heading) => stripMarkup(heading[1]))
  .join(" ");
const homepageKeywordRequirements = [
  [homepageTitle, /Mac Screen Recorder and Video Editor With Auto Zoom/i, "primary keyword in the title"],
  [homepageDescription, /Mac screen recorder and video editor/i, "primary keyword in the meta description"],
  [homepageBodyText, /Mac screen recorder with automatic zoom/i, "primary keyword in visible copy"],
  [homepageHeadingText, /screen recorder for product demos/i, "product-demo keyword in a heading"],
  [homepageHeroSub, /\bscreen\b/i, "screen capture topic in the hero description"],
  [homepageHeroSub, /\bcamera\b/i, "camera capture topic in the hero description"],
  [homepageHeroSub, /\bmicrophone\b/i, "microphone capture topic in the hero description"],
  [homepageHeroSub, /\bsystem audio\b/i, "system-audio capture topic in the hero description"],
  [homepageHeadingText, /Record your Mac screen with system audio/i, "system-audio topic in a heading"],
  [homepageHeadingText, /screen recorder with a built-in teleprompter/i, "teleprompter keyword in a heading"],
  [homepageHeadingText, /local screen recorder/i, "local-recorder keyword in a heading"],
  [homepageHeadingText, /(?:Pay once.*Mac screen recorder|One-time purchase.*Use it for life)/i, "pay-once topic in a heading"],
];

for (const [source, pattern, label] of homepageKeywordRequirements) {
  if (!pattern.test(source)) add("index.html", `missing ${label}`);
}
if (/<meta\s+name=["']keywords["']/i.test(homepage)) {
  add("index.html", "must not use the obsolete meta keywords tag");
}

const sitemap = readFileSync(join(root, "sitemap.xml"), "utf8");
const sitemapUrls = [...sitemap.matchAll(/<loc>(https:\/\/autocuts\.ai[^<]+)<\/loc>/g)].map((match) => match[1]);
const sitemapSet = new Set(sitemapUrls);
if (sitemapSet.size !== sitemapUrls.length) add("sitemap.xml", "contains duplicate URLs");

for (const [canonical, path] of canonicals) {
  if (!sitemapSet.has(canonical)) add(path, "canonical URL is missing from sitemap.xml");
}
for (const url of sitemapUrls) {
  if (!canonicals.has(url)) add("sitemap.xml", `URL is not an indexable canonical page: ${url}`);
}

const robots = readFileSync(join(root, "robots.txt"), "utf8");
if (!robots.includes("Sitemap: https://autocuts.ai/sitemap.xml")) add("robots.txt", "missing sitemap declaration");
if (!robots.includes("Disallow: /videos/autocuts-desktop-demos/")) add("robots.txt", "must block production source files");

const redirects = readFileSync(join(root, "_redirects"), "utf8");
for (const source of [
  "/features/ai-video-cleanup/",
  "/blog/clean-up-youtube-videos-faster/",
]) {
  if (!redirects.split("\n").some((line) => line.startsWith(`${source} `) && line.endsWith(" 301"))) {
    add("_redirects", `missing permanent redirect for ${source}`);
  }
}

for (const [page, requiredText] of [
  ["features/screen-recorder-and-video-editor-for-mac/index.html", /screen recorder and video editor for Mac/i],
  ["features/add-motion-graphics-to-videos/index.html", /lower thirds?.*stats?.*callouts?.*quotes?.*lists?.*highlights?/is],
  ["blog/add-motion-graphics-without-editing-skills/index.html", /How to add motion graphics to screen recordings/i],
  ["compare/autocuts-vs-focusee/index.html", /Autocuts vs FocuSee/i],
  ["compare/autocuts-vs-camtasia/index.html", /Autocuts vs Camtasia/i],
  ["compare/autocuts-vs-screenflow/index.html", /Autocuts vs ScreenFlow/i],
  ["compare/autocuts-vs-shotbase/index.html", /Autocuts vs Shotbase/i],
]) {
  const content = readFileSync(join(root, page), "utf8");
  if (!requiredText.test(stripMarkup(content))) add(page, "missing its mapped search-intent copy");
}

const retiredMap = readFileSync(join(root, "docs/seo/retired-url-map.md"), "utf8");
for (const retiredUrl of [
  "/features/turn-long-videos-into-shorts/",
  "/features/ai-video-editor-for-youtubers/",
  "/blog/best-ai-video-editor-for-youtubers/",
  "/blog/how-to-turn-long-videos-into-shorts/",
  "/blog/best-capcut-alternative-for-talking-videos/",
  "/compare/autocuts-vs-capcut/",
  "/compare/autocuts-vs-descript/",
  "/compare/autocuts-vs-opusclip/",
]) {
  if (!retiredMap.includes(`| \`${retiredUrl}\` | 410 |`)) add("docs/seo/retired-url-map.md", `missing 410 entry for ${retiredUrl}`);
}

if (errors.length) {
  console.error(`SEO/AEO validation failed with ${errors.length} issue${errors.length === 1 ? "" : "s"}:`);
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log(`SEO/AEO validation passed for ${indexablePages.length} indexable pages and ${sitemapUrls.length} sitemap URLs.`);
