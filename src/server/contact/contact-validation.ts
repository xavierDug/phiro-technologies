import {
    isBudgetId,
    isProjectTypeId,
    isTimelineId,
    type BudgetId,
    type ContactRequestDto,
    type ProjectTypeId,
    type TimelineId,
} from "./contact.dto";

/**
 * Validation for inbound contact enquiries.
 *
 * Pure functions over unknown input: no request objects, no email, no I/O.
 * The route handler owns HTTP; this owns "is this an enquiry we can act on".
 */

export type ContactValidationResult =
    | { ok: true; dto: ContactRequestDto }
    | { ok: false; errors: Record<string, string> };

const MAX_MESSAGE_LENGTH = 2000;
const MIN_MESSAGE_LENGTH = 10;
const MAX_FIELD_LENGTH = 200;

/**
 * Deliberately permissive, for the same reason as the leads validator: a
 * stricter pattern rejects real addresses, and a false rejection costs us the
 * enquiry AND insults the sender.
 */
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function asTrimmedString(value: unknown): string {
    return typeof value === "string" ? value.trim() : "";
}

/**
 * True when the submission tripped the honeypot — a field hidden from humans,
 * so anything filling it is automated. Callers should respond with a normal
 * success so the bot has nothing to learn from, and simply not send the email.
 *
 * Note the field is `website`, not `company`: `company` is a real field on this
 * form, unlike on the och-planner one.
 */
export function isHoneypotTripped(raw: unknown): boolean {
    if (typeof raw !== "object" || raw === null) return false;
    return asTrimmedString((raw as Record<string, unknown>).website).length > 0;
}

export function parseContactRequest(raw: unknown): ContactValidationResult {
    if (typeof raw !== "object" || raw === null) {
        return { ok: false, errors: { form: "Invalid submission." } };
    }

    const input = raw as Record<string, unknown>;
    const errors: Record<string, string> = {};

    const name = asTrimmedString(input.name);
    const email = asTrimmedString(input.email);
    const company = asTrimmedString(input.company);
    const message = asTrimmedString(input.message);

    const rawProjectType = asTrimmedString(input.projectType);
    const projectType: ProjectTypeId | null = isProjectTypeId(rawProjectType)
        ? rawProjectType
        : null;

    const rawBudget = asTrimmedString(input.budget);
    const budget: BudgetId | null = isBudgetId(rawBudget) ? rawBudget : null;

    const rawTimeline = asTrimmedString(input.timeline);
    const timeline: TimelineId | null = isTimelineId(rawTimeline) ? rawTimeline : null;

    if (!name) errors.name = "Tell us who we're speaking with.";

    if (!email) {
        errors.email = "We need an email to reply to.";
    } else if (!EMAIL_PATTERN.test(email)) {
        errors.email = "That email doesn't look right.";
    }

    if (projectType === null) errors.projectType = "Pick the closest match.";
    if (budget === null) errors.budget = "A rough range is fine.";
    if (timeline === null) errors.timeline = "Roughly when are you hoping to start?";

    if (!message) {
        errors.message = "Tell us a little about the project.";
    } else if (message.length < MIN_MESSAGE_LENGTH) {
        errors.message = "A sentence or two would help.";
    } else if (message.length > MAX_MESSAGE_LENGTH) {
        errors.message = `Please keep it under ${MAX_MESSAGE_LENGTH} characters.`;
    }

    // The null arms are redundant at runtime but narrow the types.
    if (
        Object.keys(errors).length > 0 ||
        projectType === null ||
        budget === null ||
        timeline === null
    ) {
        return { ok: false, errors };
    }

    return {
        ok: true,
        dto: {
            name: name.slice(0, MAX_FIELD_LENGTH),
            email: email.slice(0, MAX_FIELD_LENGTH),
            company: company.slice(0, MAX_FIELD_LENGTH) || undefined,
            projectType,
            budget,
            timeline,
            message: message.slice(0, MAX_MESSAGE_LENGTH),
        },
    };
}
