import {
    isFixedTierId,
    type FixedTierId,
    type LeadRequestDto,
    type LeadSourceDto,
} from "./lead.dto";

/**
 * Validation for inbound lead submissions.
 *
 * Pure functions over unknown input: no request objects, no email, no I/O.
 * The route handler owns HTTP; this owns "is this a lead we can act on".
 */

export type LeadValidationResult =
    | { ok: true; dto: LeadRequestDto }
    | { ok: false; errors: Record<string, string> };

/** Long enough to be a real note, short enough that nobody can post a novel. */
const MAX_NOTE_LENGTH = 1000;
const MAX_FIELD_LENGTH = 200;

/**
 * Deliberately permissive. A stricter pattern rejects real addresses, and the
 * cost of a typo'd email is one lost lead — the same cost as a false rejection,
 * except the false rejection also insults a paying customer.
 */
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/** Needs enough digits to be dialled. Formatting is the caller's business. */
const MIN_PHONE_DIGITS = 10;

function asTrimmedString(value: unknown): string {
    return typeof value === "string" ? value.trim() : "";
}

function countDigits(value: string): number {
    return (value.match(/\d/g) ?? []).length;
}

function parseSource(raw: Record<string, unknown>): LeadSourceDto | undefined {
    const source: LeadSourceDto = {
        utmSource: asTrimmedString(raw.utmSource).slice(0, MAX_FIELD_LENGTH) || undefined,
        utmMedium: asTrimmedString(raw.utmMedium).slice(0, MAX_FIELD_LENGTH) || undefined,
        utmCampaign: asTrimmedString(raw.utmCampaign).slice(0, MAX_FIELD_LENGTH) || undefined,
    };

    const hasAnySource = Object.values(source).some(Boolean);
    return hasAnySource ? source : undefined;
}

/**
 * True when the submission tripped the honeypot — a field hidden from humans,
 * so anything filling it is automated. Callers should respond with a normal
 * success so the bot has nothing to learn from, and simply not send the email.
 */
export function isHoneypotTripped(raw: unknown): boolean {
    if (typeof raw !== "object" || raw === null) return false;
    return asTrimmedString((raw as Record<string, unknown>).company).length > 0;
}

export function parseLeadRequest(raw: unknown): LeadValidationResult {
    if (typeof raw !== "object" || raw === null) {
        return { ok: false, errors: { form: "Invalid submission." } };
    }

    const input = raw as Record<string, unknown>;
    const errors: Record<string, string> = {};

    const businessName = asTrimmedString(input.businessName);
    const contactName = asTrimmedString(input.contactName);
    const email = asTrimmedString(input.email);
    const phone = asTrimmedString(input.phone);
    const note = asTrimmedString(input.note);

    const rawTier = asTrimmedString(input.tier);
    const tier: FixedTierId | null = isFixedTierId(rawTier) ? rawTier : null;

    if (!businessName) errors.businessName = "Tell us your shop's name.";
    if (!contactName) errors.contactName = "Tell us who we're speaking with.";

    if (!email) {
        errors.email = "We need an email to reply to.";
    } else if (!EMAIL_PATTERN.test(email)) {
        errors.email = "That email doesn't look right.";
    }

    if (!phone) {
        errors.phone = "We need a phone number.";
    } else if (countDigits(phone) < MIN_PHONE_DIGITS) {
        errors.phone = "That phone number looks incomplete.";
    }

    if (tier === null) {
        errors.tier = "Pick a package.";
    }

    if (note.length > MAX_NOTE_LENGTH) {
        errors.note = `Please keep it under ${MAX_NOTE_LENGTH} characters.`;
    }

    // The `tier === null` arm is redundant at runtime but narrows the type.
    if (Object.keys(errors).length > 0 || tier === null) {
        return { ok: false, errors };
    }

    return {
        ok: true,
        dto: {
            businessName: businessName.slice(0, MAX_FIELD_LENGTH),
            contactName: contactName.slice(0, MAX_FIELD_LENGTH),
            email: email.slice(0, MAX_FIELD_LENGTH),
            phone: phone.slice(0, MAX_FIELD_LENGTH),
            tier,
            note: note || undefined,
            source: parseSource(input),
        },
    };
}
