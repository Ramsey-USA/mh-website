/**
 * Testimonial Email Blast Template
 * Sent to newsletter subscribers when a featured testimonial is published.
 * CAN-SPAM / CASL compliant — includes unsubscribe link.
 */

import { COMPANY_INFO } from "@/lib/constants/company";

export interface TestimonialBlastData {
  /** Subscriber's first name (or "Valued Customer" fallback) */
  subscriberName?: string;
  /** Subscriber's unsubscribe token */
  unsubscribeToken: string;
  /** Testimonial quote (verbatim) */
  quote: string;
  /** Display name — e.g. "First L." */
  clientName: string;
  /** City, State — e.g. "Richland, WA" */
  location: string;
  /** Project type — e.g. "Custom Home Remodel" */
  project: string;
  /** Star rating 1-5 */
  rating: number;
  /** Absolute URL to project photo or social card — 600 px wide */
  imageUrl?: string;
  /** Alt text for the project / social card image */
  imageAlt?: string;
  /** Canonical URL to the testimonials page (CTA) */
  pageUrl: string;
}

const SITE_URL = "https://www.mhc-gc.com";

function renderStars(rating: number): string {
  const filled = Math.min(5, Math.max(0, Math.round(rating)));
  const empty = 5 - filled;
  return "★".repeat(filled) + "☆".repeat(empty);
}

/**
 * Generates the testimonial email blast HTML, subject, and plain-text body.
 */
export function generateTestimonialBlast(data: TestimonialBlastData): {
  subject: string;
  html: string;
  text: string;
} {
  const greeting = data.subscriberName
    ? `Hi ${data.subscriberName},`
    : "Hi there,";

  const stars = renderStars(data.rating);

  const unsubscribeUrl = `${SITE_URL}/api/newsletter/unsubscribe?token=${encodeURIComponent(data.unsubscribeToken)}`;

  const imageBlock = data.imageUrl
    ? `
    <!-- Project / Social Card Image -->
    <tr>
      <td style="padding: 0 30px 30px 30px; text-align: center;">
        <img
          src="${data.imageUrl}"
          alt="${data.imageAlt ?? `${data.clientName} project by MH Construction in ${data.location}`}"
          width="540"
          style="max-width: 100%; border-radius: 8px; display: block; margin: 0 auto;"
        />
      </td>
    </tr>`
    : "";

  const html = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>See What Our Clients Are Saying | MH Construction</title>
</head>
<body style="font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; line-height: 1.6; color: #212121; margin: 0; padding: 0; background-color: #f5f5f5;">
  <table width="100%" cellpadding="0" cellspacing="0" style="max-width: 600px; margin: 20px auto; background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">

    <!-- Header -->
    <tr>
      <td style="background: linear-gradient(135deg, #386851 0%, #1E392C 100%); padding: 30px; text-align: center;">
        <img
          src="${SITE_URL}/images/logo/mh-construction-logo.webp"
          alt="MH Construction, Inc. logo"
          width="160"
          style="display: block; margin: 0 auto 12px auto;"
        />
        <h1 style="color: #ffffff; margin: 0; font-size: 22px; font-weight: 700;">MH Construction, Inc.</h1>
        <p style="color: #d4af37; margin: 8px 0 0 0; font-size: 13px; font-weight: 600; letter-spacing: 0.05em; text-transform: uppercase;">Veteran-Owned · Relationship-First</p>
      </td>
    </tr>

    <!-- Intro -->
    <tr>
      <td style="padding: 40px 30px 20px 30px;">
        <p style="margin: 0 0 16px 0; font-size: 16px; line-height: 1.6;">${greeting}</p>
        <p style="margin: 0 0 24px 0; font-size: 16px; line-height: 1.6;">
          We wanted to share a recent message from one of our clients — stories like this are exactly
          why we do what we do.
        </p>
      </td>
    </tr>

    <!-- Pull Quote -->
    <tr>
      <td style="padding: 0 30px 30px 30px;">
        <table width="100%" cellpadding="0" cellspacing="0">
          <tr>
            <td style="background-color: #f0f7f4; border-left: 4px solid #386851; border-radius: 0 8px 8px 0; padding: 24px 28px;">
              <p style="margin: 0 0 16px 0; font-size: 18px; line-height: 1.7; color: #1E392C; font-style: italic;">
                &ldquo;${data.quote}&rdquo;
              </p>
              <p style="margin: 0; font-size: 28px; line-height: 1; color: #d4af37;">${stars}</p>
              <p style="margin: 12px 0 0 0; font-size: 14px; color: #555555; font-weight: 600;">
                — ${data.clientName}, ${data.location}<br />
                <span style="font-weight: 400; color: #777777;">${data.project}</span>
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>

    ${imageBlock}

    <!-- CTA -->
    <tr>
      <td style="padding: 0 30px 40px 30px; text-align: center;">
        <p style="margin: 0 0 20px 0; font-size: 15px; line-height: 1.6; color: #555555;">
          Want to see more stories like this? Visit our testimonials page.
        </p>
        <a
          href="${data.pageUrl}"
          style="display: inline-block; background-color: #386851; color: #ffffff; text-decoration: none; font-weight: 700; font-size: 15px; padding: 14px 32px; border-radius: 6px; letter-spacing: 0.03em;"
        >
          Read More Testimonials →
        </a>
      </td>
    </tr>

    <!-- Footer -->
    <tr>
      <td style="background-color: #f5f5f5; padding: 24px 30px; text-align: center; border-top: 1px solid #e5e5e5;">
        <p style="margin: 0 0 10px 0; font-size: 13px; color: #666666;">
          <strong>MH Construction, Inc.</strong><br />
          ${COMPANY_INFO.address.full}<br />
          Phone: <a href="tel:${COMPANY_INFO.phone.tel}" style="color: #386851; text-decoration: none;">${COMPANY_INFO.phone.display}</a> |
          Email: <a href="mailto:${COMPANY_INFO.email.main}" style="color: #386851; text-decoration: none;">${COMPANY_INFO.email.main}</a>
        </p>
        <p style="margin: 0; font-size: 11px; color: #999999;">
          Licensed in WA, OR, ID — Veteran-Owned &amp; Operated<br />
          You're receiving this because you subscribed to updates from MH Construction.<br />
          <a href="${unsubscribeUrl}" style="color: #999999;">Unsubscribe</a>
        </p>
      </td>
    </tr>

  </table>
</body>
</html>
  `.trim();

  const text = `
${greeting}

We wanted to share a recent message from one of our clients:

"${data.quote}"

${stars}
— ${data.clientName}, ${data.location}
   ${data.project}

Read more testimonials: ${data.pageUrl}

---
MH Construction, Inc.
${COMPANY_INFO.address.full}
Phone: ${COMPANY_INFO.phone.display}
Email: ${COMPANY_INFO.email.main}
Licensed in WA, OR, ID — Veteran-Owned & Operated

You're receiving this because you subscribed to updates from MH Construction.
Unsubscribe: ${unsubscribeUrl}
  `.trim();

  return {
    subject: "See What Our Clients Are Saying 🏗️",
    html,
    text,
  };
}
