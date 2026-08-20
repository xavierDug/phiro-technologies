import { sendEmail, type SendEmailResult } from "@/server/email/resend.client";
import {
    BUDGET_LABELS,
    PROJECT_TYPE_LABELS,
    TIMELINE_LABELS,
    type ContactRequestDto,
} from "./contact.dto";

/**
 * Turns a validated enquiry into a notification email.
 *
 * This is the only module that knows a contact enquiry results in an email. The
 * route handler knows HTTP, the validator knows shape, this knows what happens
 * next. Transport itself belongs to `email/resend.client.ts`, which is shared
 * with the och-planner lead pipeline rather than duplicated.
 */

/** Fallbacks keep local dev working before the env vars are dropped in. */
const DEFAULT_FROM = "Phiro Technologies <onboarding@resend.dev>";
const DEFAULT_TO = "xavierdugal2004@hotmail.com";

/** Neutralises HTML-significant characters in visitor-supplied strings. */
function escapeHtml(value: string): string {
    return value
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#39;");
}

function buildRows(dto: ContactRequestDto): Array<[string, string]> {
    const rows: Array<[string, string]> = [["Name", dto.name]];

    if (dto.company) rows.push(["Company", dto.company]);

    rows.push(
        ["Email", dto.email],
        ["Project type", PROJECT_TYPE_LABELS[dto.projectType]],
        ["Budget", BUDGET_LABELS[dto.budget]],
        ["Timeline", TIMELINE_LABELS[dto.timeline]],
        ["Message", dto.message]
    );

    return rows;
}

function buildTextBody(dto: ContactRequestDto): string {
    return buildRows(dto)
        .map(([label, value]) => `${label}: ${value}`)
        .join("\n");
}

function buildHtmlBody(dto: ContactRequestDto): string {
    const rows = buildRows(dto)
        .map(
            ([label, value]) => `
        <tr>
          <td style="padding:8px 16px 8px 0;color:#6b7280;font-size:13px;vertical-align:top;white-space:nowrap;">${escapeHtml(label)}</td>
          <td style="padding:8px 0;color:#111827;font-size:14px;">${escapeHtml(value).replace(/\n/g, "<br />")}</td>
        </tr>`
        )
        .join("");

    return `
    <div style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;max-width:560px;">
      <p style="font-size:13px;color:#6b7280;margin:0 0 4px;">phirotechnologies.com — contact form</p>
      <h1 style="font-size:20px;color:#111827;margin:0 0 20px;">New enquiry: ${escapeHtml(dto.name)}</h1>
      <table style="border-collapse:collapse;width:100%;">${rows}</table>
      <p style="margin:24px 0 0;font-size:13px;color:#6b7280;">
        Reply straight to this email to reach ${escapeHtml(dto.name)}.
      </p>
    </div>`;
}

/**
 * Notifies the team of a new enquiry. Returns the transport result rather than
 * throwing so the caller can decide what the visitor sees.
 */
export async function sendContactNotification(
    dto: ContactRequestDto
): Promise<SendEmailResult> {
    return sendEmail({
        from: process.env.CONTACT_NOTIFICATION_FROM ?? DEFAULT_FROM,
        to: process.env.CONTACT_NOTIFICATION_TO ?? DEFAULT_TO,
        subject: `Phiro enquiry — ${dto.name} (${PROJECT_TYPE_LABELS[dto.projectType]})`,
        // Lets Xavier hit reply and land in the sender's inbox.
        replyTo: dto.email,
        text: buildTextBody(dto),
        html: buildHtmlBody(dto),
    });
}
