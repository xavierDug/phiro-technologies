import {
    classifyContact,
    isCallWindowId,
    isLeadRef,
    isOfferLeadLocale,
    isOfferPackageId,
    type OfferLeadDto,
} from "./offer-lead.dto";

/**
 * Validation for booking requests from the website-packages page.
 *
 * Pure functions over unknown input: no request objects, no email, no I/O.
 * Error strings are keys, not sentences — the form owns the wording in each
 * language, so the server never has to know which one the visitor reads.
 */

export type OfferLeadErrorKey = "name" | "business" | "contact" | "package" | "message" | "form";

export type OfferLeadValidationResult =
    | { ok: true; dto: OfferLeadDto }
    | { ok: false; errors: Partial<Record<OfferLeadErrorKey, string>> };

const MAX_FIELD_LENGTH = 200;
const MAX_MESSAGE_LENGTH = 1500;

function asTrimmedString(value: unknown): string {
    return typeof value === "string" ? value.trim() : "";
}

/** Honeypot: a field hidden from humans, so anything that fills it is automated. */
export function isHoneypotTripped(raw: unknown): boolean {
    if (typeof raw !== "object" || raw === null) return false;
    return asTrimmedString((raw as Record<string, unknown>).website).length > 0;
}

export function parseOfferLead(raw: unknown): OfferLeadValidationResult {
    if (typeof raw !== "object" || raw === null) {
        return { ok: false, errors: { form: "invalid" } };
    }

    const input = raw as Record<string, unknown>;
    const errors: Partial<Record<OfferLeadErrorKey, string>> = {};

    const name = asTrimmedString(input.name);
    const business = asTrimmedString(input.business);
    const contact = asTrimmedString(input.contact);
    const message = asTrimmedString(input.message);
    const rawPackage = asTrimmedString(input.package);
    const rawWindow = asTrimmedString(input.callWindow);
    const rawRef = asTrimmedString(input.ref).toLowerCase();
    const rawLocale = asTrimmedString(input.locale);

    if (!name) errors.name = "required";
    if (!business) errors.business = "required";

    const contactKind = contact ? classifyContact(contact) : null;
    if (!contact) errors.contact = "required";
    else if (!contactKind) errors.contact = "invalid";

    const pkg = isOfferPackageId(rawPackage) ? rawPackage : null;
    if (!pkg) errors.package = "required";

    if (message.length > MAX_MESSAGE_LENGTH) errors.message = "too-long";

    // The null arms are redundant at runtime but narrow the types.
    if (Object.keys(errors).length > 0 || !pkg || !contactKind) {
        return { ok: false, errors };
    }

    return {
        ok: true,
        dto: {
            name: name.slice(0, MAX_FIELD_LENGTH),
            business: business.slice(0, MAX_FIELD_LENGTH),
            contact: contact.slice(0, MAX_FIELD_LENGTH),
            contactKind,
            package: pkg,
            // Optional fields fall back instead of failing: they are conveniences.
            callWindow: isCallWindowId(rawWindow) ? rawWindow : "any",
            message: message || undefined,
            ref: isLeadRef(rawRef) ? rawRef : undefined,
            locale: isOfferLeadLocale(rawLocale) ? rawLocale : "en",
        },
    };
}
