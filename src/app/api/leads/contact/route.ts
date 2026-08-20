import { NextResponse } from "next/server";

import { sendContactNotification } from "@/server/contact/contact-notification.service";
import {
    isHoneypotTripped,
    parseContactRequest,
} from "@/server/contact/contact-validation";

/**
 * Transport for contact form submissions.
 *
 * Parses the request, hands off to validation, hands the resulting DTO to the
 * notification service. No email composition, no business rules. Mirrors
 * `api/leads/och-planner/route.ts` deliberately — one shape for every route.
 */

export async function POST(request: Request) {
    let payload: unknown;
    try {
        payload = await request.json();
    } catch {
        return NextResponse.json(
            { ok: false, errors: { form: "Invalid submission." } },
            { status: 400 }
        );
    }

    // Answer bots exactly as we answer humans, minus the email. A distinct
    // response would just tell them which field to stop filling in.
    if (isHoneypotTripped(payload)) {
        return NextResponse.json({ ok: true }, { status: 200 });
    }

    const validation = parseContactRequest(payload);
    if (!validation.ok) {
        return NextResponse.json(
            { ok: false, errors: validation.errors },
            { status: 400 }
        );
    }

    const result = await sendContactNotification(validation.dto);
    if (!result.ok) {
        // The enquiry is lost if we swallow this — surface it in the logs loudly.
        console.error("[contact] notification failed:", result.reason, result.detail);
        return NextResponse.json(
            {
                ok: false,
                errors: {
                    form: "Something broke on our end. Email us directly instead.",
                },
            },
            { status: 502 }
        );
    }

    return NextResponse.json({ ok: true }, { status: 200 });
}
