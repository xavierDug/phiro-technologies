import type { Post } from "@/content/blog/types";

export const post: Post = {
  slug: "why-your-agency-website-doesnt-rank",
  locale: "en",
  translationKey: "agency-site-seo-teardown",
  title: "Why your agency website doesn't rank",
  excerpt:
    "Five technical SEO faults that quietly stop agency sites ranking: canonical host mismatch, discarded meta descriptions, missing entity markup. Found on our own site first.",
  category: "Technical SEO",
  tags: [
    "technical SEO",
    "Next.js",
    "structured data",
    "Core Web Vitals",
    "canonical URLs",
  ],
  publishedAt: "2026-08-25",
  author: {
    name: "Xavier Dugal",
    role: "Founder, Phiro Technologies",
  },
  cover: {
    src: "/SeoThumbnail.png",
    alt: "A search results listing showing a synthesised snippet instead of a written meta description",
  },
  featured: true,
  body: [
    {
      type: "paragraph",
      text: "Most agency websites are beautiful and invisible. The design is considered, the copy is tight, the animations are smooth — and the site ranks for nothing except its own domain name typed directly into the address bar. The usual diagnosis is that the team needs to blog more. Usually that is wrong. The site is not under-published; it is technically misconfigured in ways nobody notices, because the page looks perfect to a human.",
    },
    {
      type: "paragraph",
      text: "I know this because I audited our own site before writing this. Four of the five below were real faults on it — not hypothetical ones, but reproducible, currently-costing-us-traffic ones. The fifth we had already got right, and it is the one I see broken most often everywhere else. Here they are, what each actually does, and how to fix it.",
    },
    {
      type: "callout",
      tone: "note",
      title: "Who this is for",
      text: "Anyone running a small studio or agency site on Next.js, Astro, or a modern static stack. The code specifics are Next.js 15 App Router, but four of the five faults are framework-agnostic.",
    },
    {
      type: "heading",
      level: 2,
      id: "canonical-host",
      text: "Your canonical host is lying to Google",
    },
    {
      type: "paragraph",
      text: "This is the one that surprised me, and it is the most common serious fault I see. Your site is reachable at two hostnames — the bare apex and the `www` subdomain — and one redirects to the other. Fine. But somewhere in your code there is a hardcoded base URL, and it is very likely pointing at whichever one you typed from memory rather than the one that actually serves the page.",
    },
    {
      type: "paragraph",
      text: "Ours was set to the apex. The apex 307-redirects to `www`. So every canonical tag, every OpenGraph URL, and every absolute image URL we generated pointed Google at a hostname that immediately bounces it somewhere else.",
    },
    {
      type: "code",
      lang: "bash",
      caption:
        "Check yours in one command. The Location header is the host you should be declaring.",
      code: "curl -sSI https://example.com | grep -iE '^(HTTP|location)'\n\n# HTTP/1.1 307 Temporary Redirect\n# Location: https://www.example.com/",
    },
    {
      type: "paragraph",
      text: "Two things go wrong. First, a **307 is a temporary redirect** — it explicitly tells crawlers that the move is not permanent and the original URL should stay indexed. That is the opposite of consolidation; you want a 301 or a 308. Second, a canonical tag pointing at a redirecting URL is a self-contradicting signal: the page says the real version of itself lives at one address, and that address says it actually lives somewhere else. Google resolves it eventually, but you have spent authority on the round trip and split your signals across two hostnames in the meantime.",
    },
    {
      type: "code",
      lang: "ts",
      caption: "The fix: one constant, used everywhere, set to the host that returns 200.",
      code: '// src/lib/seo.ts\nexport const SITE_URL = "https://www.example.com";\n\n// src/app/layout.tsx\nexport const metadata: Metadata = {\n  metadataBase: new URL(SITE_URL),\n  alternates: { canonical: "/" },\n};',
    },
    {
      type: "paragraph",
      text: "Then fix the redirect itself at the platform level. On Vercel, the domain settings issue a temporary redirect by default; switch it to permanent. On Cloudflare or nginx, make sure the rule emits a 301 rather than a 302.",
    },
    {
      type: "heading",
      level: 2,
      id: "meta-descriptions",
      text: "Google is ignoring the descriptions you wrote",
    },
    {
      type: "paragraph",
      text: "Here is something most people do not know: **the meta description is not a directive.** It is a suggestion. Google uses it when it judges the description to be a genuinely useful summary of the page for the query at hand. When it does not, it discards yours and synthesises a snippet by pulling sentence fragments out of your page copy.",
    },
    {
      type: "paragraph",
      text: "That synthesised snippet is what makes search results look broken — disconnected clauses, a nav label, half a heading, a fragment of a testimonial. If your listings read like scraped text, this is why. It is not a rendering bug. It is Google telling you your description was not good enough to use.",
    },
    {
      type: "paragraph",
      text: "The descriptions that reliably get discarded share a small set of traits:",
    },
    {
      type: "list",
      items: [
        "**Missing or too short.** Nothing to work with, so Google builds its own.",
        "**Generic boilerplate.** The same sentence on every page says nothing page-specific, so it looks for something better in the body.",
        "**Keyword-stuffed.** Reads as spam and gets dropped.",
        "**Duplicated across routes.** Signals the pages are near-identical, which is a separate and worse problem.",
      ],
    },
    {
      type: "paragraph",
      text: "The fix is unglamorous: write a distinct description for every indexable route, by hand, at 140 to 160 characters, leading with the concrete benefit rather than the brand name. Treat it as ad copy that happens to live in your head tag. And critically — never derive it programmatically from the first paragraph of the page. That is exactly the input that produces a description Google will throw away.",
    },
    {
      type: "callout",
      tone: "warn",
      title: "The trap in most CMS setups",
      text: "Auto-generated descriptions — the familiar 'first 155 characters of body content' setting — feel like a solved problem, and are the single most reliable way to guarantee every one of your snippets gets rewritten.",
    },
    {
      type: "heading",
      level: 2,
      id: "entity-disambiguation",
      text: "Your brand name is not as unique as you think",
    },
    {
      type: "paragraph",
      text: "Search our name and you get a children's robotics kit, an automotive electronics firm, a data consultancy, and a Danish 3D visualisation studio. We sat below all of them. This is not a ranking problem in the ordinary sense — nobody out-competed us on content. Google simply did not have enough information to know we were a distinct entity that exists.",
    },
    {
      type: "paragraph",
      text: "Structured data is how you fix that, and almost no agency site has it. A single `Organization` node in JSON-LD stating your legal name, locality, phone number, founding date, and — most importantly — a `sameAs` array linking to profiles that link back to you, is the difference between being an unidentified string and being a resolvable entity in Google's knowledge graph.",
    },
    {
      type: "code",
      lang: "json",
      caption: "The minimum viable entity declaration. sameAs is doing most of the work.",
      code: '{\n  "@context": "https://schema.org",\n  "@type": ["Organization", "ProfessionalService"],\n  "@id": "https://www.example.com/#organization",\n  "name": "Example Studio",\n  "foundingDate": "2023",\n  "telephone": "+15145550100",\n  "address": {\n    "@type": "PostalAddress",\n    "addressLocality": "Montréal",\n    "addressRegion": "QC",\n    "addressCountry": "CA"\n  },\n  "sameAs": ["https://www.linkedin.com/company/example-studio"]\n}',
    },
    {
      type: "paragraph",
      text: "One rule about `sameAs`: only list profiles that actually exist and link back to your domain. An unreachable URL in that array is worse than an empty array, because it is an unverifiable claim inside a block whose entire purpose is verification.",
    },
    {
      type: "paragraph",
      text: "The other half of this is off-site and cannot be coded. You need a Google Business Profile whose name, address and phone number are **byte-identical** to what your site declares. Google matches the two by string comparison, and as far as that matching is concerned, 'Suite 4' and 'Ste. 4' are two different businesses.",
    },
    {
      type: "heading",
      level: 2,
      id: "sitemap",
      text: "No sitemap means you are asking Google to guess",
    },
    {
      type: "paragraph",
      text: "A sitemap will not make a bad page rank. What it does is remove ambiguity about which URLs exist, which are canonical, and when each last changed. On a five-page site Google will find everything eventually by following links. The value shows up the moment you add a blog: new posts get discovered in hours instead of whenever the crawler next wanders past.",
    },
    {
      type: "paragraph",
      text: "In Next.js this is a single file, and generating it from your content modules means it can never drift out of sync with the pages that actually exist.",
    },
    {
      type: "code",
      lang: "ts",
      caption: "src/app/sitemap.ts — derived from content, so publishing a post updates the sitemap.",
      code: 'import type { MetadataRoute } from "next";\nimport { allPosts } from "@/content/blog";\n\nexport default function sitemap(): MetadataRoute.Sitemap {\n  return [\n    { url: `${SITE_URL}/`, priority: 1, changeFrequency: "monthly" },\n    ...allPosts.map((post) => ({\n      url: `${SITE_URL}/blog/${post.slug}`,\n      lastModified: post.updatedAt ?? post.publishedAt,\n      priority: 0.7,\n    })),\n  ];\n}',
    },
    {
      type: "paragraph",
      text: "Pair it with a `robots.txt` that declares the sitemap location, and disallow any paid-campaign landing pages. Those pages usually duplicate your service copy, and letting them into the index means competing against yourself for your own keywords.",
    },
    {
      type: "heading",
      level: 2,
      id: "core-web-vitals",
      text: "Your images are quietly costing you rankings",
    },
    {
      type: "paragraph",
      text: "Core Web Vitals are a confirmed ranking signal, and on a design-led agency site the metric that fails is almost always **Largest Contentful Paint** — because the largest contentful element is a full-bleed hero image somebody exported at 3000 pixels wide and dropped in with a plain `img` tag.",
    },
    {
      type: "paragraph",
      text: "Every raw tag ships the full-resolution original, in whatever format it happened to be saved as, with no width or height attributes — which also causes layout shift as the image loads and shoves the content below it down the page.",
    },
    {
      type: "paragraph",
      text: "This is the one our audit came back clean on: every content image already goes through the framework's image component. The only raw tags left are inside vendored device-frame components — the laptop and phone mockups that wrap our screenshots — where the tag is chrome around an image rather than the image itself. That distinction is worth making, because it is the test to apply to your own audit: a raw tag is a problem when it is carrying content, not when it is drawing a bezel.",
    },
    {
      type: "table",
      caption: "What a framework image component does that a raw tag does not.",
      head: ["Raw img tag", "Framework image component"],
      rows: [
        ["Ships the original file", "Serves AVIF or WebP by browser support"],
        ["One size for every viewport", "Generates a responsive srcset"],
        ["Loads everything eagerly", "Lazy-loads below the fold by default"],
        ["No intrinsic dimensions", "Reserves space, so no layout shift"],
      ],
    },
    {
      type: "paragraph",
      text: "The migration is mechanical, and it is the highest ratio of ranking benefit to effort on this entire list. Mark the hero image as high priority so it is not lazy-loaded, and leave everything else on the defaults.",
    },
    {
      type: "heading",
      level: 2,
      id: "order",
      text: "Do them in this order",
    },
    {
      type: "paragraph",
      text: "If you only have an afternoon, the sequence matters more than the completeness. The first two fixes change how your existing pages are interpreted and presented, which means they compound with everything you publish afterwards. The rest are additive.",
    },
    {
      type: "list",
      ordered: true,
      items: [
        "**Fix the canonical host.** One constant, ten minutes, stops the signal splitting immediately.",
        "**Rewrite every meta description by hand.** An hour of writing that changes how every listing reads.",
        "**Add Organization JSON-LD with sameAs.** The only fix that addresses brand-name ambiguity.",
        "**Ship a sitemap and a robots.txt.** Twenty minutes, and it matters more the more you publish.",
        "**Migrate images to a real image component.** Mechanical, and the Core Web Vitals gain is measurable within a week.",
      ],
    },
    {
      type: "paragraph",
      text: "None of this is clever. That is rather the point. The reason these faults persist on otherwise excellent sites is that they are invisible to everyone who looks at the page, including the people who built it. The design review passes. The client is happy. And the site quietly fails to be findable by anyone who does not already know its name.",
    },
    { type: "divider" },
    {
      type: "paragraph",
      text: "We rebuilt this site's entire SEO layer around the five fixes above. If you want the same audit run against yours, [tell us what you're working on](/contact) — we reply within one business day.",
    },
  ],
  faq: [
    {
      question: "How long until technical SEO fixes affect rankings?",
      answer:
        "Canonical and redirect fixes typically show up within one to three weeks, once Google recrawls and consolidates the duplicate hosts. Meta description rewrites can appear within days. Structured data and entity disambiguation are the slowest — expect four to eight weeks before a brand query meaningfully shifts, because it depends on Google re-evaluating your entity against the competing ones.",
    },
    {
      question: "Does a small agency site really need a sitemap?",
      answer:
        "For five static pages, Google will find everything by following internal links, so a sitemap adds little. It becomes genuinely valuable the moment you add a blog or any section that grows over time, because it turns new-post discovery from days into hours and gives Google a lastModified date it can trust.",
    },
    {
      question: "Why does Google rewrite my meta description?",
      answer:
        "Because the meta description is a suggestion, not a directive. Google replaces it with a snippet built from your page copy whenever it judges your description to be a poor match for the search query — most often when the description is missing, too short, duplicated across pages, generic boilerplate, or auto-generated from body content. Writing a distinct, specific description per page is the only reliable fix.",
    },
    {
      question: "Is a 307 redirect bad for SEO?",
      answer:
        "It is weaker than it should be for a permanent move. A 307 tells crawlers the redirect is temporary and the original URL should stay indexed, which is the opposite of what you want when consolidating an apex domain onto www. Use a 301 or a 308 so ranking signals consolidate onto a single canonical hostname.",
    },
  ],
};
