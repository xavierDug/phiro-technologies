import type { Metadata } from "next";

import {
  DEFAULT_LOCALE,
  Locale,
  OG_LOCALE,
  SITE_NAME,
  absoluteUrl,
  languageAlternates,
  languageAlternatesFor,
} from "@/lib/seo";

interface BuildMetadataOptions {
  /** Page title without the brand suffix — the template in the root layout adds it. */
  title: string;
  /**
   * Hand-written, 140–160 characters, leading with the benefit.
   *
   * Never derive this from body copy. Google discards a description it judges
   * unhelpful and synthesises a snippet from the page instead, which is exactly
   * how you end up with a search result that reads like scraped fragments.
   */
  description: string;
  /** Site-relative and locale-free, e.g. "/blog". The locale prefix is applied here. */
  path: string;
  locale?: Locale;
  /**
   * Locales this page actually exists in. Defaults to all of them, which is
   * right for the static routes; per-post pages must narrow it so hreflang
   * never advertises a translation that has not been written.
   */
  availableLocales?: readonly Locale[];
  /**
   * Per-locale paths, for pages whose URL differs by language (translated blog
   * slugs). Overrides  when present.
   */
  alternatePaths?: Partial<Record<Locale, string>>;
  /** Site-relative image path. Falls back to the site-wide card. */
  image?: string;
  imageAlt?: string;
  type?: "website" | "article";
  publishedTime?: string;
  modifiedTime?: string;
  authors?: string[];
  tags?: string[];
  noIndex?: boolean;
}

/**
 * Single builder for every indexable page's metadata.
 *
 * Canonical, hreflang alternates, OpenGraph and Twitter cards are all derived
 * from one call so a page cannot ship with, say, a canonical but no alternates.
 */
/**
 * Site-wide social card, used by any page that does not supply its own.
 * A page with no image at all gets a bare text link on every social surface,
 * which reliably halves click-through.
 */
const DEFAULT_OG_IMAGE = "/SeoThumbnail.png";

export function buildMetadata({
  title,
  description,
  path,
  locale = DEFAULT_LOCALE,
  availableLocales,
  alternatePaths,
  image = DEFAULT_OG_IMAGE,
  imageAlt,
  type = "website",
  publishedTime,
  modifiedTime,
  authors,
  tags,
  noIndex = false,
}: BuildMetadataOptions): Metadata {
  const url = absoluteUrl(path, locale);

  return {
    title,
    description,
    alternates: {
      canonical: url,
      languages: alternatePaths
        ? languageAlternatesFor(alternatePaths)
        : languageAlternates(path, availableLocales),
    },
    openGraph: {
      type,
      siteName: SITE_NAME,
      title,
      description,
      url,
      locale: OG_LOCALE[locale],
      // No explicit width/height: covers vary in size, and a declared dimension
      // that disagrees with the file is worse than letting crawlers measure it.
      images: [{ url: image, alt: imageAlt ?? title }],
      ...(type === "article"
        ? { publishedTime, modifiedTime, authors, tags }
        : {}),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },
    ...(noIndex ? { robots: { index: false, follow: false } } : {}),
  };
}
