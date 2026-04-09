/**
 * Email Template Builder
 *
 * Provides reusable components for building consistent MH Construction branded emails.
 * Extracts the common header, footer, and body wrappers used across all email templates.
 */

import { COMPANY_INFO } from "@/lib/constants/company";
import { escapeHtml } from "@/lib/utils/escape-html";

// ─── Brand Constants ──────────────────────────────────────────────────────────

/** MH Construction brand colors */
export const EMAIL_COLORS = {
  /** Primary green */
  primary: "#386851",
  /** Dark green */
  primaryDark: "#1E392C",
  /** Gold accent */
  gold: "#d4af37",
  /** Light gold */
  goldLight: "#BD9264",
  /** Background gray */
  bgLight: "#f5f5f5",
  /** Content background */
  bgContent: "#ffffff",
  /** Highlight background */
  bgHighlight: "#f0f7f4",
  /** Warning/veteran background */
  bgVeteran: "#fff9f0",
  /** Text primary */
  text: "#212121",
  /** Text muted */
  textMuted: "#666",
  /** Text light */
  textLight: "#999",
  /** Border */
  border: "#e5e5e5",
} as const;

/** CSS styles used frequently in email templates */
export const EMAIL_STYLES = {
  /** Body font stack */
  fontStack:
    "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
  /** Standard gradient background for header */
  headerGradient: `linear-gradient(135deg, ${EMAIL_COLORS.primary} 0%, ${EMAIL_COLORS.primaryDark} 100%)`,
  /** Info box with left border */
  infoBox: `background-color: ${EMAIL_COLORS.bgHighlight}; border-left: 4px solid ${EMAIL_COLORS.primary}; padding: 15px; margin: 20px 0;`,
  /** Veteran highlight box */
  veteranBox: `background-color: ${EMAIL_COLORS.bgVeteran}; border: 1px solid ${EMAIL_COLORS.gold}; padding: 15px; margin: 20px 0; border-radius: 6px;`,
} as const;

// ─── Template Components ──────────────────────────────────────────────────────

export interface EmailHeaderOptions {
  /** Main heading text (defaults to company name) */
  heading?: string;
  /** Tagline shown below heading */
  tagline?: string;
}

/**
 * Generate the branded email header with gradient background
 */
export function emailHeader(options: EmailHeaderOptions = {}): string {
  const {
    heading = "MH Construction, Inc.",
    tagline = "Veteran-owned. Relationship-first.",
  } = options;

  return `
    <tr>
      <td style="background: ${EMAIL_STYLES.headerGradient}; padding: 30px; text-align: center;">
        <h1 style="color: #ffffff; margin: 0; font-size: 24px; font-weight: 700;">${escapeHtml(heading)}</h1>
        ${tagline ? `<p style="color: ${EMAIL_COLORS.gold}; margin: 10px 0 0 0; font-size: 14px; font-weight: 600;">${escapeHtml(tagline)}</p>` : ""}
      </td>
    </tr>
  `.trim();
}

/**
 * Generate the branded email footer with contact info
 */
export function emailFooter(): string {
  return `
    <tr>
      <td style="background-color: ${EMAIL_COLORS.bgLight}; padding: 20px; text-align: center; border-top: 1px solid ${EMAIL_COLORS.border};">
        <p style="margin: 0 0 10px 0; font-size: 14px; color: ${EMAIL_COLORS.textMuted};">
          <strong>MH Construction, Inc.</strong><br>
          ${COMPANY_INFO.address.full}<br>
          Phone: <a href="tel:${COMPANY_INFO.phone.tel}" style="color: ${EMAIL_COLORS.primary}; text-decoration: none;">${COMPANY_INFO.phone.display}</a><br>
          Email: <a href="mailto:${COMPANY_INFO.email.main}" style="color: ${EMAIL_COLORS.primary}; text-decoration: none;">${COMPANY_INFO.email.main}</a>
        </p>
        <p style="margin: 0; font-size: 12px; color: ${EMAIL_COLORS.textLight};">
          Licensed in WA, OR, ID | Veteran-Owned & Operated
        </p>
      </td>
    </tr>
  `.trim();
}

/**
 * Generate the plain text footer
 */
export function textFooter(): string {
  return `
---

MH Construction, Inc.
${COMPANY_INFO.address.full}
Phone: ${COMPANY_INFO.phone.display}
Email: ${COMPANY_INFO.email.main}

Licensed in WA, OR, ID | Veteran-Owned & Operated
  `.trim();
}

// ─── Email Wrapper ────────────────────────────────────────────────────────────

export interface BuildEmailOptions {
  /** Email subject/title */
  subject: string;
  /** Header options */
  header?: EmailHeaderOptions;
  /** Main content HTML (goes between header and footer) */
  content: string;
  /** Whether to include the standard footer (default: true) */
  includeFooter?: boolean;
  /** Custom padding for content area (default: "40px 30px") */
  contentPadding?: string;
}

/**
 * Build a complete branded HTML email
 *
 * @example
 * ```ts
 * const html = buildEmail({
 *   subject: "Welcome!",
 *   header: { tagline: "Building relationships, not just projects" },
 *   content: `
 *     <h2 style="color: #386851;">Hello!</h2>
 *     <p>Thanks for reaching out.</p>
 *   `,
 * });
 * ```
 */
export function buildEmail(options: BuildEmailOptions): string {
  const {
    subject,
    header,
    content,
    includeFooter = true,
    contentPadding = "40px 30px",
  } = options;

  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${escapeHtml(subject)}</title>
</head>
<body style="font-family: ${EMAIL_STYLES.fontStack}; line-height: 1.6; color: ${EMAIL_COLORS.text}; margin: 0; padding: 0; background-color: ${EMAIL_COLORS.bgLight};">
  <table width="100%" cellpadding="0" cellspacing="0" style="max-width: 600px; margin: 20px auto; background-color: ${EMAIL_COLORS.bgContent}; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
    ${emailHeader(header)}
    <tr>
      <td style="padding: ${contentPadding};">
        ${content}
      </td>
    </tr>
    ${includeFooter ? emailFooter() : ""}
  </table>
</body>
</html>
  `.trim();
}

// ─── Content Helpers ──────────────────────────────────────────────────────────

/**
 * Create an info/highlight box with left border accent
 */
export function infoBox(content: string): string {
  return `
    <div style="${EMAIL_STYLES.infoBox}">
      ${content}
    </div>
  `.trim();
}

/**
 * Create a veteran highlight box
 */
export function veteranBox(content: string): string {
  return `
    <div style="${EMAIL_STYLES.veteranBox}">
      ${content}
    </div>
  `.trim();
}

/**
 * Create a data table row for form submission emails
 */
export function tableRow(label: string, value: string): string {
  return `
    <tr>
      <td style="padding: 8px; border-bottom: 1px solid ${EMAIL_COLORS.border};"><strong>${escapeHtml(label)}:</strong></td>
      <td style="padding: 8px; border-bottom: 1px solid ${EMAIL_COLORS.border};">${escapeHtml(value)}</td>
    </tr>
  `.trim();
}

/**
 * Wrap table rows in a styled table
 */
export function dataTable(rows: string[]): string {
  return `
    <table width="100%" cellpadding="0" cellspacing="0" style="border-collapse: collapse; margin-bottom: 20px;">
      ${rows.join("\n")}
    </table>
  `.trim();
}

/**
 * Create a styled link
 */
export function link(href: string, text: string): string {
  return `<a href="${escapeHtml(href)}" style="color: ${EMAIL_COLORS.primary}; text-decoration: none;">${escapeHtml(text)}</a>`;
}

/**
 * Create a phone link
 */
export function phoneLink(phone: string): string {
  return `<a href="tel:${escapeHtml(phone)}" style="color: ${EMAIL_COLORS.primary}; text-decoration: none; font-weight: 600;">${escapeHtml(phone)}</a>`;
}

/**
 * Create an email link
 */
export function emailLink(email: string): string {
  return `<a href="mailto:${escapeHtml(email)}" style="color: ${EMAIL_COLORS.primary}; text-decoration: none;">${escapeHtml(email)}</a>`;
}
