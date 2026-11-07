import type { Dictionary } from "@/content/dictionaries/types";
import { TRANSLATED_PATHS, localePath, stripLocale, type Locale } from "@/lib/seo";

/**
 * In-page anchors of the website-packages page, per locale. Here rather than in
 * the offer content so the navbar can use them without bundling that copy.
 */
export const OFFER_ANCHORS: Record<Locale, { packages: string; book: string }> = {
  en: { packages: "packages", book: "book" },
  fr: { packages: "forfaits", book: "reserver" },
};

/**
 * The header's call to action. Everywhere it starts a project; on the
 * website-packages page it books the 15-minute call on that same page.
 */
export function headerCta(pathname: string, dict: Dictionary, locale: Locale): NavLink {
  if (stripLocale(pathname) === TRANSLATED_PATHS["/websites"][locale]) {
    return { href: `#${OFFER_ANCHORS[locale].book}`, label: dict.common.bookCall };
  }
  return { href: localePath("/contact", locale), label: dict.common.startProject };
}

/**
 * Primary navigation, in its own module so client components (the navbar)
 * can import it without pulling the rest of the site's content into their
 * bundle.
 */

export interface NavLink {
  href: string;
  label: string;
}

/**
 * Navigation as structure, not strings: the path is fixed, the label comes from
 * the active dictionary. Adding a locale therefore cannot forget a nav item.
 * Home is the logo and Contact is the header's call to action, so neither is
 * repeated here.
 */
const NAV_ITEMS = [
  { key: "work", path: "/projects" },
  { key: "services", path: "/#services" },
  { key: "about", path: "/about" },
  { key: "blog", path: "/blog" },
] as const satisfies readonly { key: keyof Dictionary["nav"]; path: string }[];

export function buildNavLinks(dict: Dictionary, locale: Locale): NavLink[] {
  return NAV_ITEMS.map((item) => ({
    href: localePath(item.path, locale),
    label: dict.nav[item.key],
  }));
}
