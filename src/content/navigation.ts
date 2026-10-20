import type { Dictionary } from "@/content/dictionaries/types";
import { localePath, type Locale } from "@/lib/seo";

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
