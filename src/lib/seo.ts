/**
 * Central SEO contract for the marketing site.
 *
 * Everything that needs to know the site's absolute origin reads it from here.
 * That matters more than it looks: `phirotechnologies.com` 307-redirects to the
 * `www` host, so any canonical or OG URL built on the bare apex points Google at
 * a redirect and splits ranking signals across two hostnames. SITE_URL is the
 * host that actually serves 200s.
 */

export const SITE_URL = "https://www.phirotechnologies.com";

export const SITE_NAME = "Phiro Technologies";

/**
 * The brand line. Kept here rather than inlined so the title template, the OG
 * card renderer and the Organization schema can never drift apart.
 */
export const SITE_TAGLINE = "Purpose, Engineered";

export const LOCALES = ["en", "fr"] as const;
export type Locale = (typeof LOCALES)[number];
export const DEFAULT_LOCALE: Locale = "en";

/** BCP-47 tags for `hreflang` and `og:locale`. Regional, because we target Québec. */
export const HREFLANG: Record<Locale, string> = {
  en: "en-CA",
  fr: "fr-CA",
};

export const OG_LOCALE: Record<Locale, string> = {
  en: "en_CA",
  fr: "fr_CA",
};

/**
 * Name / Address / Phone. Search engines match a site to its Google Business
 * Profile by comparing these strings against the profile, so they must be
 * byte-identical everywhere they appear — footer, contact page, JSON-LD.
 * Change them in one place only: here.
 */
export const BUSINESS = {
  legalName: "Phiro Technologies",
  email: "hello@phirotechnologies.com",
  /** Display form, matching the Google Business Profile. */
  telephone: "+1 514-519-0053",
  /** E.164, required by schema.org and `tel:` links. */
  telephoneE164: "+15145190053",
  addressLocality: "Montréal",
  addressRegion: "QC",
  addressCountry: "CA",
  /** No published street address — the profile is service-area, not storefront. */
  foundingYear: "2023",
  latitude: 45.5019,
  longitude: -73.5674,
} as const;

/**
 * Profiles that verifiably belong to this brand.
 *
 * `sameAs` is the strongest on-page signal available for disambiguating a
 * contested name, and "Phiro" is contested by at least four unrelated entities
 * (robotics, automotive electronics, a data consultancy, a 3D studio). Only add
 * a URL here once the profile exists and links back — an unreachable `sameAs`
 * is worse than none.
 */
export const SOCIAL_PROFILES = [
  "https://www.linkedin.com/company/phiro-technologies",
  "https://maps.app.goo.gl/c5Cs3xVECTjPX7u3A",
] as const;

/** Absolute URL for a site-relative path, with `/fr` prefixing for French. */
export function localePath(path: string, locale: Locale = DEFAULT_LOCALE): string {
  const clean = path === "/" ? "" : path.replace(/\/$/, "");
  // English is served from the root: the existing URLs already hold index
  // equity, and re-homing them under /en would 301 it all away.
  return locale === DEFAULT_LOCALE ? clean || "/" : `/fr${clean}`;
}

export function absoluteUrl(path: string, locale: Locale = DEFAULT_LOCALE): string {
  return `${SITE_URL}${localePath(path, locale)}`;
}

/**
 * Locale variants of one logical page, keyed for `alternates.languages`.
 *
 * `available` must list only the locales in which the page actually exists.
 * Blog posts are the reason this is a parameter: an English-only article that
 * advertises a French alternate is pointing Google at a 404, which is a worse
 * signal than having no alternate at all.
 *
 * `x-default` points at the default locale when it is available, and otherwise
 * at the page's own locale — it must always resolve to a real URL.
 */
export function languageAlternates(
  path: string,
  available: readonly Locale[] = LOCALES
): Record<string, string> {
  return languageAlternatesFor(
    Object.fromEntries(available.map((locale) => [locale, path]))
  );
}

/**
 * Alternates when each locale has its OWN path — a translated blog slug, for
 * instance. Only the locales present in the map are advertised.
 */
export function languageAlternatesFor(
  paths: Partial<Record<Locale, string>>
): Record<string, string> {
  const entries = LOCALES.filter((locale) => paths[locale] !== undefined);
  const fallback = entries.includes(DEFAULT_LOCALE) ? DEFAULT_LOCALE : entries[0];

  return {
    ...Object.fromEntries(
      entries.map((locale) => [HREFLANG[locale], absoluteUrl(paths[locale]!, locale)])
    ),
    ...(fallback
      ? { "x-default": absoluteUrl(paths[fallback]!, fallback) }
      : {}),
  };
}

/**
 * Inverse of `localePath`: removes the `/fr` prefix so a path can be compared
 * or re-prefixed for the other locale. Used by nav active-state matching and
 * the language switcher.
 */
export function stripLocale(path: string): string {
  if (path === "/fr") return "/";
  return path.startsWith("/fr/") ? path.slice(3) : path;
}

/** The locale a pathname belongs to. */
export function localeFromPath(path: string): Locale {
  return path === "/fr" || path.startsWith("/fr/") ? "fr" : DEFAULT_LOCALE;
}
