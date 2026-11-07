import { NextResponse } from "next/server";

import { sendOfferLeadNotification } from "@/server/leads/offer-lead-notification.service";
import { isHoneypotTripped, parseOfferLead } from "@/server/leads/offer-lead-validation";

/**
 * Transport for booking requests from the website-packages page.
 *
 * Parse, validate, hand the DTO to the notification service, map the result to
 * HTTP. Same shape as `api/leads/contact` and `api/leads/och-planner`.
 */
export async function POST(request: Request) {
    let payload: unknown;
    try {
        payload = await request.json();
    } catch {
        return NextResponse.json({ ok: false, errors: { form: "invalid" } }, { status: 400 });
    }

    // Bots get the same answer as people, minus the email.
    if (isHoneypotTripped(payload)) {
        return NextResponse.json({ ok: true }, { status: 200 });
    }

    const validation = parseOfferLead(payload);
    if (!validation.ok) {
        return NextResponse.json({ ok: false, errors: validation.errors }, { status: 400 });
    }

    const result = await sendOfferLeadNotification(validation.dto);
    if (!result.ok) {
        console.error("[offer-lead] notification failed:", result.reason, result.detail);
        return NextResponse.json({ ok: false, errors: { form: "server" } }, { status: 502 });
    }

    return NextResponse.json({ ok: true }, { status: 200 });
}
