"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { useLocale } from "@/components/layout/locale-provider";
import { localePath, stripLocale, type Locale } from "@/lib/seo";
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
  const match = path.match(BLOG_POST_PATTERN);

  if (match) {
    const [, slug] = match;
    const post = slugMap.find((entry) => entry.slug === slug);
    const translated = post?.translations[otherLocale];
    return translated
      ? localePath(translated, otherLocale)
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
      aria-label={dict.nav.switchLanguage}
      title={dict.nav.switchLanguage}
      className={cn(
        "rounded-full border border-line px-3 py-1.5 font-mono text-[0.6875rem] uppercase tracking-[0.14em] text-dim transition-colors duration-300 hover:border-gold/40 hover:text-gold",
        className
      )}
    >
      {other}
    </Link>
  );
}
