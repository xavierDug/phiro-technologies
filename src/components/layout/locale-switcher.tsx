"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { useLocale } from "@/components/layout/locale-provider";
import { localePath, stripLocale, translatePath, type Locale } from "@/lib/seo";
import { cn } from "@/lib/utils";

/** Matches "/blog/some-slug" (locale-free) and captures the slug. */
const BLOG_POST_PATTERN = /^\/blog\/([^/]+)$/;

/**
 * Resolves the other-language URL for the current page.
 *
 * Most routes share one path across locales (`/about` <-> `/fr/about`), so
 * stripping and re-adding the `/fr` prefix is correct. Blog posts do NOT —
 * slugs are translated on purpose (`why-x` vs `pourquoi-y`), so a naive prefix
 * swap 404s the moment a post isn't a straight word-for-word slug. When the
 * post has no translation at all, this sends the reader to the target
 * language's blog index instead of a dead link.
 */
function resolveTarget(
  pathname: string,
  otherLocale: Locale,
  slugMap: { slug: string; locale: Locale; translations: Partial<Record<Locale, string>> }[]
): string {
  const path = stripLocale(pathname);
  const currentLocale: Locale = otherLocale === "en" ? "fr" : "en";

  // Pages with a translated URL (`/websites` <-> `/fr/sites-web`).
  const translated = translatePath(path, currentLocale, otherLocale);
  if (translated) return localePath(translated, otherLocale);

  const match = path.match(BLOG_POST_PATTERN);

  if (match) {
    const [, slug] = match;
    const post = slugMap.find((entry) => entry.slug === slug);
    const translatedSlug = post?.translations[otherLocale];
    return translatedSlug
      ? localePath(translatedSlug, otherLocale)
      : localePath("/blog", otherLocale);
  }

  return localePath(path, otherLocale);
}

export function LocaleSwitcher({ className }: { className?: string }) {
  const pathname = usePathname();
  const { locale, dict, blogSlugMap } = useLocale();

  const other = locale === "en" ? "fr" : "en";
  const href = resolveTarget(pathname, other, blogSlugMap);

  return (
    <Link
      href={href}
      hrefLang={other}
      title={dict.nav.switchLanguage}
      className={cn(
        "inline-flex h-9 items-center rounded-full px-2 font-mono text-xs uppercase tracking-[0.14em] text-muted transition-colors duration-300 hover:text-ink",
        className
      )}
    >
      {other}
      {/* Visible "FR" stays the start of the accessible name (WCAG 2.5.3). */}
      <span className="sr-only"> — {dict.nav.switchLanguage}</span>
    </Link>
  );
}
