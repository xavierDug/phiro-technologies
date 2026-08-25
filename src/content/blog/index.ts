/**
 * Post registry.
 *
 * Posts are registered explicitly rather than discovered from the filesystem:
 * a static import list is what lets the route prerender, the sitemap enumerate
 * and TypeScript verify every post at build time. Adding a post means adding
 * one import and one array entry.
 */

import type { Locale } from "@/lib/seo";
import type { Post } from "@/content/blog/types";

import { post as whyYourAgencyWebsiteDoesntRank } from "@/content/blog/posts/why-your-agency-website-doesnt-rank";
import { post as pourquoiVotreSiteAgenceNeSeClassePas } from "@/content/blog/posts/pourquoi-votre-site-agence-ne-se-classe-pas";

const registry: Post[] = [
  whyYourAgencyWebsiteDoesntRank,
  pourquoiVotreSiteAgenceNeSeClassePas,
];

/** Newest first. Every consumer wants this order, so sort once here. */
export const allPosts: Post[] = [...registry].sort(
  (a, b) => Date.parse(b.publishedAt) - Date.parse(a.publishedAt)
);

export function postsForLocale(locale: Locale): Post[] {
  return allPosts.filter((post) => post.locale === locale);
}

export function getPost(slug: string, locale: Locale): Post | undefined {
  return allPosts.find((post) => post.slug === slug && post.locale === locale);
}

/**
 * The lead article for the index hero. Falls back to the newest post so the
 * page never renders an empty hero just because nobody set the flag.
 */
export function featuredPost(locale: Locale): Post | undefined {
  const posts = postsForLocale(locale);
  return posts.find((post) => post.featured) ?? posts[0];
}

export function categories(locale: Locale): string[] {
  return [...new Set(postsForLocale(locale).map((post) => post.category))].sort();
}

/**
 * Explicit `related` slugs first, then same-category posts to fill the row.
 * Unknown slugs are dropped rather than throwing — a typo in content should not
 * break the build of an unrelated page.
 */
export function relatedPosts(post: Post, limit = 2): Post[] {
  const pool = postsForLocale(post.locale).filter((p) => p.slug !== post.slug);

  const explicit = (post.related ?? [])
    .map((slug) => pool.find((p) => p.slug === slug))
    .filter((p): p is Post => Boolean(p));

  const sameCategory = pool.filter(
    (p) => p.category === post.category && !explicit.includes(p)
  );

  return [...explicit, ...sameCategory].slice(0, limit);
}

/**
 * Every translation of a post, as locale -> site-relative path.
 * Feeds hreflang, so it lists only translations that actually exist.
 */
export function translationPaths(post: Post): Partial<Record<Locale, string>> {
  return Object.fromEntries(
    allPosts
      .filter((p) => p.translationKey === post.translationKey)
      .map((p) => [p.locale, `/blog/${p.slug}`])
  );
}

/** One post's slug plus where its translations (if any) live. */
export interface SlugTranslation {
  slug: string;
  locale: Locale;
  translations: Partial<Record<Locale, string>>;
}

/**
 * The whole registry, reduced to just slugs and locale paths.
 *
 * This exists so the language switcher (a client component in the navbar) can
 * resolve a translated slug WITHOUT importing full post bodies into its JS
 * bundle. A server component computes this once and hands the small result
 * down as a prop — the switcher never imports `@/content/blog` itself.
 */
export function blogSlugMap(): SlugTranslation[] {
  return allPosts.map((post) => ({
    slug: post.slug,
    locale: post.locale,
    translations: translationPaths(post),
  }));
}

export type { Post };
