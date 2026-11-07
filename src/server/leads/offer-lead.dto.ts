/**
 * Contract for a booking request from the website-packages page
 * (`/websites`, `/fr/sites-web`).
 *
 * Types and plain constants only — no transport, no business logic — so the
 * client booking form and the route handler can both import it. Same shape as
 * `lead.dto.ts` and `contact.dto.ts`.
 */

export const OFFER_PACKAGE_IDS = ["essential", "standard", "custom", "unsure"] as const;
export type OfferPackageId = (typeof OFFER_PACKAGE_IDS)[number];

export const CALL_WINDOW_IDS = ["morning", "afternoon", "any"] as const;
export type CallWindowId = (typeof CALL_WINDOW_IDS)[number];

export const OFFER_LEAD_LOCALES = ["en", "fr"] as const;
export type OfferLeadLocale = (typeof OFFER_LEAD_LOCALES)[number];

/**
 * Shape of the `?ref=` tag carried by outreach links. Lowercase slug, short, so
 * it can never smuggle markup or a long payload into the notification email.
 */
export const LEAD_REF_PATTERN = /^[a-z0-9-]{1,40}$/;

export function isOfferPackageId(value: unknown): value is OfferPackageId {
    return typeof value === "string" && (OFFER_PACKAGE_IDS as readonly string[]).includes(value);
}

export function isCallWindowId(value: unknown): value is CallWindowId {
    return typeof value === "string" && (CALL_WINDOW_IDS as readonly string[]).includes(value);
}

export function isOfferLeadLocale(value: unknown): value is OfferLeadLocale {
    return typeof value === "string" && (OFFER_LEAD_LOCALES as readonly string[]).includes(value);
}

export function isLeadRef(value: unknown): value is string {
    return typeof value === "string" && LEAD_REF_PATTERN.test(value);
}

/** Permissive on purpose, like the other validators: a false rejection loses the lead. */
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/** The usual ways people type a phone number: spaces, dashes, dots, +1, brackets. */
const PHONE_CHARS = /^[+\d\s().-]+$/;

/**
 * Whether a "phone or email" value is an email, a phone number, or neither.
 * Lives with the contract so the form and the validator classify identically.
 */
export function classifyContact(value: string): "email" | "phone" | null {
    if (EMAIL_PATTERN.test(value)) return "email";
    const digits = value.replace(/\D/g, "");
    if (PHONE_CHARS.test(value) && digits.length >= 10 && digits.length <= 15) return "phone";
    return null;
}

/** A validated booking request. Anything of this type has already passed validation. */
export interface OfferLeadDto {
    name: string;
    business: string;
    /** Phone number or email, as typed. `contactKind` says which. */
    contact: string;
    contactKind: "email" | "phone";
    package: OfferPackageId;
    callWindow: CallWindowId;
    message?: string;
    /** Outreach tag from `?ref=`, when the visitor arrived through one. */
    ref?: string;
    locale: OfferLeadLocale;
}

/** English labels for the notification email; the form has its own per locale. */
export const OFFER_PACKAGE_LABELS: Record<OfferPackageId, string> = {
    essential: "Essential ($790)",
    standard: "Standard ($1,490)",
    custom: "Custom (quote)",
    unsure: "Not sure yet",
};

export const CALL_WINDOW_LABELS: Record<CallWindowId, string> = {
    morning: "Morning",
    afternoon: "Afternoon",
    any: "Any time",
};
