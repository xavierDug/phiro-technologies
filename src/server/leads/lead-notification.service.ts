import { sendEmail, type SendEmailResult } from "@/server/email/resend.client";
import type { FixedTierId, LeadRequestDto } from "./lead.dto";

/**
 * Turns a validated lead into a notification email.
 *
 * This is the only module that knows a lead results in an email. The route
 * handler knows HTTP, the validator knows shape, this knows what happens next.
 */

/** Fallbacks keep local dev working before the env vars are dropped in. */
const DEFAULT_FROM = "OCH Planner <onboarding@resend.dev>";
const DEFAULT_TO = "xavierdugal2004@hotmail.com";

const TIER_LABELS: Record<FixedTierId, string> = {
    essential: "Essential — $600",
    complete: "Complete — $1,100",
};

/** Neutralises HTML-significant characters in visitor-supplied strings. */
function escapeHtml(value: string): string {
    return value
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#39;");
}

function describeSource(dto: LeadRequestDto): string {
    if (!dto.source) return "Direct (no UTM)";
    const { utmSource, utmMedium, utmCampaign } = dto.source;
    return [
        utmSource && `source=${utmSource}`,
        utmMedium && `medium=${utmMedium}`,
        utmCampaign && `campaign=${utmCampaign}`,
    ]
        .filter(Boolean)
        .join(" · ");
}

function buildRows(dto: LeadRequestDto): Array<[string, string]> {
    const rows: Array<[string, string]> = [
        ["Business", dto.businessName],
        ["Contact", dto.contactName],
        ["Email", dto.email],
        ["Phone", dto.phone],
        ["Package", TIER_LABELS[dto.tier]],
    ];

    if (dto.note) rows.push(["Note", dto.note]);
    rows.push(["Came from", describeSource(dto)]);

    return rows;
}

function buildTextBody(dto: LeadRequestDto): string {
    return buildRows(dto)
        .map(([label, value]) => `${label}: ${value}`)
        .join("\n");
}

function buildHtmlBody(dto: LeadRequestDto): string {
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
      <p style="font-size:13px;color:#6b7280;margin:0 0 4px;">OCH Planner — landing page</p>
      <h1 style="font-size:20px;color:#111827;margin:0 0 20px;">New lead: ${escapeHtml(dto.businessName)}</h1>
      <table style="border-collapse:collapse;width:100%;">${rows}</table>
      <p style="margin:24px 0 0;font-size:13px;color:#6b7280;">
        Reply straight to this email to reach ${escapeHtml(dto.contactName)}.
      </p>
    </div>`;
}

/**
 * Notifies the team of a new lead. Returns the transport result rather than
 * throwing so the caller can decide what the visitor sees.
 */
export async function sendLeadNotification(dto: LeadRequestDto): Promise<SendEmailResult> {
    return sendEmail({
        from: process.env.LEAD_NOTIFICATION_FROM ?? DEFAULT_FROM,
        to: process.env.LEAD_NOTIFICATION_TO ?? DEFAULT_TO,
        subject: `OCH Planner lead — ${dto.businessName} (${TIER_LABELS[dto.tier]})`,
        // Lets Xavier hit reply and land in the shop owner's inbox.
        replyTo: dto.email,
        text: buildTextBody(dto),
        html: buildHtmlBody(dto),
    });
}
