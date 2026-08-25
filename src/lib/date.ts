import type { Locale } from "@/lib/seo";

const FORMATTERS: Record<Locale, Intl.DateTimeFormat> = {
  en: new Intl.DateTimeFormat("en-CA", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  }),
  fr: new Intl.DateTimeFormat("fr-CA", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  }),
};

/**
 * Locale-aware long date. `Intl` ships with the runtime, so bilingual date
 * formatting needs no i18n library.
 *
 * Pinned to UTC on purpose: post dates are plain `YYYY-MM-DD`, which parses as
 * UTC midnight. Formatting that in a negative-offset zone like America/Montreal
 * renders the previous day, so a post dated the 25th would publish as the 24th.
 */
export function formatPostDate(iso: string, locale: Locale = "en"): string {
  return FORMATTERS[locale].format(new Date(iso));
}

/** Machine-readable value for <time dateTime> and JSON-LD. */
export function isoDate(iso: string): string {
  return new Date(iso).toISOString();
}
