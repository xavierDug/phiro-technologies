/**
 * Website-packages offer (`/websites`, `/fr/sites-web`): types, the price
 * table and the locale accessor. Copy lives in `offer.en.ts` / `offer.fr.ts`.
 *
 * Prices are numbers, stored once here and formatted per locale at render
 * time, so the two languages can never quote different amounts. Prose that
 * mentions a price uses a `{token}` (e.g. "{hourly}") filled by `fillPrices`.
 */

import type { Locale } from "@/lib/seo";
import type { CallWindowId, OfferPackageId } from "@/server/leads/offer-lead.dto";
import { offerEn } from "@/content/offer.en";
import { offerFr } from "@/content/offer.fr";

/** CAD, before taxes. */
export const OFFER_PRICES = {
  essential: 790,
  standard: 1490,
  hosting: 39,
  care: 89,
  extraPage: 150,
  hourly: 90,
} as const;

export type PriceKey = keyof typeof OFFER_PRICES;

/** Bilingual version: a percentage of the package price. */
export const BILINGUAL_RATE = 50;

/** Deposit to start, as a percentage; the balance is due at launch. */
export const DEPOSIT_RATE = 50;

const FORMATTERS: Record<Locale, Intl.NumberFormat> = {
  en: new Intl.NumberFormat("en-CA", { style: "currency", currency: "CAD", maximumFractionDigits: 0 }),
  fr: new Intl.NumberFormat("fr-CA", { style: "currency", currency: "CAD", maximumFractionDigits: 0 }),
};

/** "$790" in English, "790 $" in French (with non-breaking spaces). */
export function formatPrice(amount: number, locale: Locale): string {
  return FORMATTERS[locale].format(amount);
}

/** "50%" / "50 %". */
export function formatPercent(value: number, locale: Locale): string {
  return locale === "fr" ? `${value} %` : `${value}%`;
}

/** Replaces `{essential}`, `{hourly}`, `{deposit}`… in copy with formatted values. */
export function fillPrices(text: string, locale: Locale): string {
  return text.replace(/\{(\w+)\}/g, (token, key: string) => {
    if (key === "deposit") return formatPercent(DEPOSIT_RATE, locale);
    if (key === "bilingual") return formatPercent(BILINGUAL_RATE, locale);
    return key in OFFER_PRICES ? formatPrice(OFFER_PRICES[key as PriceKey], locale) : token;
  });
}

/* ---------------------------------------------------------------------------
   Copy shape
--------------------------------------------------------------------------- */

/** Plain words + one serif-italic accent word + punctuation (see `Headline`). */
export interface OfferHeading {
  eyebrow: string;
  title: string;
  accent: string;
}

export interface OfferPackage {
  id: Exclude<OfferPackageId, "unsure">;
  name: string;
  blurb: string;
  /** Null for the quoted package. */
  priceKey: Extract<PriceKey, "essential" | "standard"> | null;
  /** Shown under the price. */
  priceNote: string;
  delivery: string;
  features: string[];
  /** Included items get a check; Custom lists examples, so they get a plus. */
  featureStyle: "check" | "plus";
  cta: string;
  recommended?: boolean;
}

export interface OfferPlan {
  name: string;
  badge: string;
  priceKey: Extract<PriceKey, "hosting" | "care">;
  body: string;
}

export interface OfferContent {
  meta: { title: string; description: string };
  hero: {
    eyebrow: string;
    title: string;
    accent: string;
    lead: string;
    book: string;
    see: string;
    /** At-a-glance strip; `{essential}`/`{deposit}` tokens allowed. Bold parts in **double stars**. */
    glance: string[];
    glanceLabel: string;
    clientLabel: string;
    desktopAlt: string;
    phoneAlt: string;
  };
  packages: OfferHeading & {
    description: string;
    recommended: string;
    quoted: string;
    items: OfferPackage[];
  };
  plans: OfferHeading & {
    description: string;
    perMonth: string;
    items: OfferPlan[];
  };
  extras: {
    label: string;
    items: { label: string; value: string; note?: string }[];
  };
  process: OfferHeading & {
    description: string;
    steps: { title: string; body: string }[];
  };
  work: {
    title: string;
    seeAll: string;
  };
  faq: OfferHeading & {
    writePrompt: string;
    items: { question: string; answer: string }[];
  };
  booking: OfferHeading & {
    lead: string;
    phone: string;
    email: string;
    studio: string;
    packageLegend: string;
    packageLabels: Record<OfferPackageId, string>;
    name: string;
    business: string;
    contact: string;
    contactPlaceholder: string;
    contactHint: string;
    windowLegend: string;
    windowLabels: Record<CallWindowId, string>;
    message: string;
    messagePlaceholder: string;
    optional: string;
    submit: string;
    sending: string;
    footnote: string;
    successTitle: string;
    /** `{name}` is replaced with the visitor's first name. */
    successBody: string;
    errors: {
      name: string;
      business: string;
      contactRequired: string;
      contactInvalid: string;
      package: string;
      messageLong: string;
      server: string;
      network: string;
    };
  };
}

export function getOffer(locale: Locale): OfferContent {
  return locale === "fr" ? offerFr : offerEn;
}
