import { sendEmail, type SendEmailResult } from "@/server/email/resend.client";
import {
    CALL_WINDOW_LABELS,
    OFFER_PACKAGE_LABELS,
    type OfferLeadDto,
} from "./offer-lead.dto";

/**
 * Business rule: "a booking request from the packages page becomes an email
 * to the studio". The route knows HTTP, the validator knows shape, this knows
 * what happens next; transport is the shared Resend client.
 */

/** Same fallbacks as the contact service, so local dev works before env vars exist. */
const DEFAULT_FROM = "Phiro Technologies <onboarding@resend.dev>";
const DEFAULT_TO = "xavierdugal2004@hotmail.com";

function escapeHtml(value: string): string {
    return value
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#39;");
}

function buildRows(dto: OfferLeadDto): Array<[string, string]> {
    const rows: Array<[string, string]> = [
        ["Name", dto.name],
        ["Business", dto.business],
        [dto.contactKind === "email" ? "Email" : "Phone", dto.contact],
        ["Package", OFFER_PACKAGE_LABELS[dto.package]],
        ["Best time", CALL_WINDOW_LABELS[dto.callWindow]],
        ["Language", dto.locale === "fr" ? "French" : "English"],
    ];
    if (dto.ref) rows.push(["Ref", dto.ref]);
    if (dto.message) rows.push(["Message", dto.message]);
    return rows;
}

function buildHtmlBody(dto: OfferLeadDto): string {
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
      <p style="font-size:13px;color:#6b7280;margin:0 0 4px;">phirotechnologies.com — website packages</p>
      <h1 style="font-size:20px;color:#111827;margin:0 0 20px;">Call request: ${escapeHtml(dto.business)}</h1>
      <table style="border-collapse:collapse;width:100%;">${rows}</table>
      <p style="margin:24px 0 0;font-size:13px;color:#6b7280;">Promise on the page: a call back within one business day.</p>
    </div>`;
}

export async function sendOfferLeadNotification(dto: OfferLeadDto): Promise<SendEmailResult> {
    return sendEmail({
        from: process.env.CONTACT_NOTIFICATION_FROM ?? DEFAULT_FROM,
        to: process.env.CONTACT_NOTIFICATION_TO ?? DEFAULT_TO,
        subject: `Call request — ${dto.business} (${OFFER_PACKAGE_LABELS[dto.package]})${dto.ref ? ` · ref ${dto.ref}` : ""}`,
        ...(dto.contactKind === "email" ? { replyTo: dto.contact } : {}),
        text: buildRows(dto)
            .map(([label, value]) => `${label}: ${value}`)
            .join("\n"),
        html: buildHtmlBody(dto),
    });
}
