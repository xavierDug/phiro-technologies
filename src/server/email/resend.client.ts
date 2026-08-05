/**
 * Thin transport wrapper over the Resend REST API.
 *
 * Server-side only — it reads RESEND_API_KEY. Everything under src/server is
 * reached exclusively from route handlers; the `server-only` package would
 * enforce that at build time but is not installed, and adding a dependency to
 * guard a two-module directory is not worth it yet.
 *
 * Uses fetch rather than the `resend` SDK on purpose: this site sends exactly
 * one kind of transactional email, and the SDK's whole value here would be the
 * twelve lines below. If sending ever grows (attachments, batches, audiences),
 * swapping this file for the SDK is a contained change — nothing outside it
 * knows how the mail leaves the building.
 */

const RESEND_ENDPOINT = "https://api.resend.com/emails";

export interface SendEmailCommand {
    from: string;
    to: string;
    subject: string;
    html: string;
    text: string;
    replyTo?: string;
}

export type SendEmailResult =
    | { ok: true; id: string }
    | { ok: false; reason: "not-configured" | "rejected"; detail: string };

export async function sendEmail(command: SendEmailCommand): Promise<SendEmailResult> {
    const apiKey = process.env.RESEND_API_KEY;

    if (!apiKey) {
        return {
            ok: false,
            reason: "not-configured",
            detail: "RESEND_API_KEY is not set.",
        };
    }

    let response: Response;
    try {
        response = await fetch(RESEND_ENDPOINT, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${apiKey}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                from: command.from,
                to: [command.to],
                subject: command.subject,
                html: command.html,
                text: command.text,
                ...(command.replyTo ? { reply_to: command.replyTo } : {}),
            }),
        });
    } catch (error) {
        return {
            ok: false,
            reason: "rejected",
            detail: error instanceof Error ? error.message : "Network error contacting Resend.",
        };
    }

    if (!response.ok) {
        const detail = await response.text().catch(() => "");
        return {
            ok: false,
            reason: "rejected",
            detail: `Resend responded ${response.status}: ${detail.slice(0, 500)}`,
        };
    }

    const payload = (await response.json().catch(() => null)) as { id?: string } | null;

    return { ok: true, id: payload?.id ?? "unknown" };
}
