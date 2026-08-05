import { NextResponse } from "next/server";

import { sendLeadNotification } from "@/server/leads/lead-notification.service";
import { isHoneypotTripped, parseLeadRequest } from "@/server/leads/lead-validation";

/**
 * Transport for OCH Planner lead submissions.
 *
 * Parses the request, hands off to validation, hands the resulting DTO to the
 * notification service. No email composition, no business rules.
 */

export async function POST(request: Request) {
    let payload: unknown;
    try {
        payload = await request.json();
    } catch {
        return NextResponse.json({ ok: false, errors: { form: "Invalid submission." } }, { status: 400 });
    }

    // Answer bots exactly as we answer humans, minus the email. A distinct
    // response would just tell them which field to stop filling in.
    if (isHoneypotTripped(payload)) {
        return NextResponse.json({ ok: true }, { status: 200 });
    }

    const validation = parseLeadRequest(payload);
    if (!validation.ok) {
        return NextResponse.json({ ok: false, errors: validation.errors }, { status: 400 });
    }

    const result = await sendLeadNotification(validation.dto);
    if (!result.ok) {
        // The lead is lost if we swallow this — surface it in the logs loudly.
        console.error("[och-planner] lead notification failed:", result.reason, result.detail);
        return NextResponse.json(
            { ok: false, errors: { form: "Something broke on our end. Call or email us instead." } },
            { status: 502 }
        );
    }

    return NextResponse.json({ ok: true }, { status: 200 });
}
