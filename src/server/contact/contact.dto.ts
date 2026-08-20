/**
 * Contract for a Phiro contact enquiry.
 *
 * Types and plain constants only — no transport, no business logic, no
 * server-only imports — so the contact form component and the route handler can
 * both import it without either reaching into the other. Same shape as
 * `leads/lead.dto.ts`, which is the reference for this pattern.
 */

export const PROJECT_TYPE_IDS = [
    "saas",
    "web-app",
    "website",
    "design",
    "other",
] as const;

export type ProjectTypeId = (typeof PROJECT_TYPE_IDS)[number];

export const BUDGET_IDS = [
    "under-5k",
    "5k-15k",
    "15k-40k",
    "40k-plus",
    "unsure",
] as const;

export type BudgetId = (typeof BUDGET_IDS)[number];

export const TIMELINE_IDS = ["asap", "1-3-months", "3-6-months", "exploring"] as const;

export type TimelineId = (typeof TIMELINE_IDS)[number];

export function isProjectTypeId(value: unknown): value is ProjectTypeId {
    return (
        typeof value === "string" && (PROJECT_TYPE_IDS as readonly string[]).includes(value)
    );
}

export function isBudgetId(value: unknown): value is BudgetId {
    return typeof value === "string" && (BUDGET_IDS as readonly string[]).includes(value);
}

export function isTimelineId(value: unknown): value is TimelineId {
    return typeof value === "string" && (TIMELINE_IDS as readonly string[]).includes(value);
}

/** A validated enquiry. Anything of this type has already passed validation. */
export interface ContactRequestDto {
    name: string;
    email: string;
    company?: string;
    projectType: ProjectTypeId;
    budget: BudgetId;
    timeline: TimelineId;
    message: string;
}

/** Labels live with the contract so the form and the email cannot disagree. */
export const PROJECT_TYPE_LABELS: Record<ProjectTypeId, string> = {
    saas: "SaaS product",
    "web-app": "Web application",
    website: "Marketing site",
    design: "Design only",
    other: "Something else",
};

export const BUDGET_LABELS: Record<BudgetId, string> = {
    "under-5k": "Under $5k",
    "5k-15k": "$5k – $15k",
    "15k-40k": "$15k – $40k",
    "40k-plus": "$40k+",
    unsure: "Not sure yet",
};

export const TIMELINE_LABELS: Record<TimelineId, string> = {
    asap: "As soon as possible",
    "1-3-months": "1 – 3 months",
    "3-6-months": "3 – 6 months",
    exploring: "Just exploring",
};
