import { postsForLocale } from "@/content/blog";
import { SITE_NAME, SITE_URL, absoluteUrl } from "@/lib/seo";

/**
 * RSS 2.0 feed at /blog/rss.xml.
 *
 * Hand-built rather than pulled from a feed library: the whole document is
 * forty lines of string concatenation, and adding a dependency to avoid writing
 * them would be a poor trade.
 *
 * A feed still matters for discovery — aggregators, readers and several
 * crawlers consume it, and it gives anyone following the blog a way to do so
 * that does not depend on an algorithm surfacing the post.
 */

/** XML has five reserved characters. Escaping is not optional in a feed. */
function escapeXml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

export const dynamic = "force-static";

export function GET(): Response {
  // English only: the channel declares <language>en-ca</language>, and a feed
  // whose items disagree with that is malformed. A French feed would be its own
  // route with its own channel language.
  const posts = postsForLocale("en");
  const updated = posts[0]
    ? new Date(posts[0].updatedAt ?? posts[0].publishedAt)
    : new Date();

  const items = posts
    .map((post) => {
      const url = absoluteUrl(`/blog/${post.slug}`, post.locale);
      return `    <item>
      <title>${escapeXml(post.title)}</title>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      <description>${escapeXml(post.excerpt)}</description>
      <category>${escapeXml(post.category)}</category>
      <dc:creator>${escapeXml(post.author.name)}</dc:creator>
      <pubDate>${new Date(post.publishedAt).toUTCString()}</pubDate>
    </item>`;
    })
    .join("\n");

  const feed = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:dc="http://purl.org/dc/elements/1.1/">
  <channel>
    <title>${escapeXml(SITE_NAME)} — Journal</title>
    <link>${SITE_URL}/blog</link>
    <description>Field notes on software architecture, web performance and technical SEO from ${escapeXml(SITE_NAME)}.</description>
    <language>en-ca</language>
    <lastBuildDate>${updated.toUTCString()}</lastBuildDate>
    <atom:link href="${SITE_URL}/blog/rss.xml" rel="self" type="application/rss+xml" />
${items}
  </channel>
</rss>`;

  return new Response(feed, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=86400",
    },
  });
}
