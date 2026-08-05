/**
 * Contract for an OCH Planner lead.
 *
 * This module is the single source of truth for which tiers may enter the
 * automated funnel. It holds types and plain constants only — no transport, no
 * business logic, no server-only imports — so the form component and the route
 * handler can share it without either reaching into the other.
 *
 * Note what is absent: the Custom tier. Custom requires human scoping by
 * definition, so it is structurally incapable of being submitted here. Its CTA
 * uses a separate contact path entirely (see `_content/offer.ts`).
 */

export const FIXED_TIER_IDS = ["essential", "complete"] as const;

export type FixedTierId = (typeof FIXED_TIER_IDS)[number];

export function isFixedTierId(value: unknown): value is FixedTierId {
    return typeof value === "string" && (FIXED_TIER_IDS as readonly string[]).includes(value);
}

/** Where the visitor came from, carried through from the cold-email link. */
export interface LeadSourceDto {
    utmSource?: string;
    utmMedium?: string;
    utmCampaign?: string;
}

/** A validated lead. Anything of this type has already passed validation. */
export interface LeadRequestDto {
    businessName: string;
    contactName: string;
    email: string;
    phone: string;
    tier: FixedTierId;
    note?: string;
    source?: LeadSourceDto;
}
