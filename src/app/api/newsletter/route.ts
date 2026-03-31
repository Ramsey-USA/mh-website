import { type NextRequest, type NextResponse } from "next/server";
import { logger } from "@/lib/utils/logger";
import { sendEmail } from "@/lib/email/email-service";
import { rateLimit, rateLimitPresets } from "@/lib/security/rate-limiter";
import {
  badRequest,
  createSuccessResponse,
  internalServerError,
} from "@/lib/api/responses";
import { generateNewsletterAcknowledgment } from "@/lib/email/templates";
import { createDbClient } from "@/lib/db/client";
import { getD1Database } from "@/lib/db/env";
import { escapeHtml } from "@/lib/utils/escape-html";

export const dynamic = "force-dynamic";

/**
 * Newsletter Signup API
 * Sends newsletter signups to matt@mhc-gc.com
 * Sends confirmation email to subscriber with MH logo
 */

interface NewsletterRequest {
  email: string;
  name?: string;
}

async function handlePOST(request: NextRequest) {
  try {
    const data: NewsletterRequest = await request.json();

    // Validate required fields
    if (!data.email) {
      return badRequest("Email address is required");
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
      return badRequest("Invalid email address");
    }

    // Input length limits
    if (data.email.length > 254) return badRequest("Email is too long");
    if (data.name && data.name.length > 200) {
      return badRequest("Name is too long");
    }

    // Persist subscription to D1 (upsert — idempotent if already subscribed)
    const unsubscribeToken = crypto.randomUUID().replace(/-/g, "");
    try {
      const db = getD1Database();
      if (db) {
        const client = createDbClient({ DB: db });
        await client.query(
          `INSERT INTO newsletter_subscribers (email, name, unsubscribe_token, subscribed)
           VALUES (?, ?, ?, 1)
           ON CONFLICT(email) DO UPDATE SET
             name = COALESCE(excluded.name, name),
             subscribed = 1,
             updated_at = datetime('now')`,
          [data.email, data.name ?? null, unsubscribeToken],
        );
      }
    } catch (dbErr) {
      // DB unavailable (e.g. local dev) — log and continue so email still sends
      logger.warn(
        "Newsletter: DB insert failed, continuing without persist",
        dbErr,
      );
    }

    // Notification email to Matt
    const notificationHtml = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>New Newsletter Signup</title>
</head>
<body style="font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; line-height: 1.6; color: #212121; margin: 0; padding: 0; background-color: #f5f5f5;">
  <table width="100%" cellpadding="0" cellspacing="0" style="max-width: 600px; margin: 20px auto; background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
    <tr>
      <td style="background: linear-gradient(135deg, #386851 0%, #1E392C 100%); padding: 30px; text-align: center;">
        <h1 style="color: #ffffff; margin: 0; font-size: 24px; font-weight: 700;">New Newsletter Signup</h1>
        <p style="color: #d4af37; margin: 10px 0 0 0; font-size: 14px; font-weight: 600;">MH Construction Newsletter</p>
      </td>
    </tr>
    <tr>
      <td style="padding: 30px;">
        <h2 style="color: #386851; margin: 0 0 20px 0; font-size: 18px;">📧 New Subscriber</h2>
        <table style="width: 100%; border-collapse: collapse;">
          <tr>
            <td style="padding: 10px; border-bottom: 1px solid #e0e0e0; font-weight: 600; color: #666;">Email:</td>
            <td style="padding: 10px; border-bottom: 1px solid #e0e0e0;">${escapeHtml(data.email)}</td>
          </tr>
          ${
            data.name
              ? `
          <tr>
            <td style="padding: 10px; border-bottom: 1px solid #e0e0e0; font-weight: 600; color: #666;">Name:</td>
            <td style="padding: 10px; border-bottom: 1px solid #e0e0e0;">${escapeHtml(data.name)}</td>
          </tr>
          `
              : ""
          }
          <tr>
            <td style="padding: 10px; font-weight: 600; color: #666;">Signup Date:</td>
            <td style="padding: 10px;">${new Date().toLocaleString("en-US", {
              timeZone: "America/Los_Angeles",
              dateStyle: "full",
              timeStyle: "short",
            })}</td>
          </tr>
        </table>
      </td>
    </tr>
    <tr>
      <td style="background-color: #f5f5f5; padding: 20px; text-align: center; font-size: 12px; color: #666;">
        <p style="margin: 0;">This is an automated notification from the MH Construction website.</p>
      </td>
    </tr>
  </table>
</body>
</html>
    `;

    // Send notification to Matt
    const notificationResult = await sendEmail({
      to: "matt@mhc-gc.com",
      subject: "New Newsletter Signup",
      html: notificationHtml,
      text: `New newsletter signup:\n\nEmail: ${data.email}${data.name ? `\nName: ${data.name}` : ""}\n\nSignup Date: ${new Date().toLocaleString()}`,
    });

    if (!notificationResult.success) {
      logger.error(
        "Failed to send notification email:",
        notificationResult.error,
      );
    }

    // Send acknowledgment email to subscriber with logo
    const acknowledgment = generateNewsletterAcknowledgment({
      email: data.email,
      ...(data.name && { name: data.name }),
    });

    const acknowledgmentResult = await sendEmail({
      to: data.email,
      subject: acknowledgment.subject,
      html: acknowledgment.html,
      text: acknowledgment.text,
      replyTo: "matt@mhc-gc.com",
    });

    if (!acknowledgmentResult.success) {
      logger.error(
        "Failed to send acknowledgment email:",
        acknowledgmentResult.error,
      );
    }

    logger.info("Newsletter signup processed successfully:", {
      email: data.email,
      name: data.name,
      notificationSent: notificationResult.success,
      acknowledgmentSent: acknowledgmentResult.success,
    });

    return createSuccessResponse({
      message: "Thank you for subscribing to our newsletter!",
      subscribed: true,
    });
  } catch (error) {
    logger.error("Newsletter signup error:", error);
    return internalServerError(
      "Failed to process newsletter signup. Please try again later.",
    );
  }
}

export const POST = rateLimit(rateLimitPresets.public)(handlePOST);

/**
 * DELETE /api/newsletter?token=<unsubscribe_token>
 *
 * One-click unsubscribe endpoint. Links sent in confirmation emails should
 * point here. No authentication required — the opaque token is the credential.
 * Complies with CAN-SPAM and GDPR right-to-erasure (soft-delete via flag).
 */
async function handleDELETE(request: NextRequest): Promise<NextResponse> {
  const { searchParams } = new URL(request.url);
  const token = searchParams.get("token");

  if (!token || !/^[a-f0-9]{32}$/.test(token)) {
    return badRequest("Invalid or missing unsubscribe token");
  }

  try {
    const db = getD1Database();
    if (!db) {
      return internalServerError("Service temporarily unavailable");
    }

    const client = createDbClient({ DB: db });
    const result = await client.query<{ email: string }>(
      `UPDATE newsletter_subscribers
       SET subscribed = 0, updated_at = datetime('now')
       WHERE unsubscribe_token = ? AND subscribed = 1
       RETURNING email`,
      [token],
    );

    if (!result || result.length === 0) {
      // Token not found or already unsubscribed — return 200 to avoid leaking info
      return createSuccessResponse({ unsubscribed: true });
    }

    const email = result[0]?.email;
    logger.info("Newsletter unsubscribe processed", { email });

    return createSuccessResponse({
      unsubscribed: true,
      message: "You have been successfully unsubscribed.",
    });
  } catch (error) {
    logger.error("Newsletter unsubscribe error:", error);
    return internalServerError("Failed to process unsubscribe request.");
  }
}

export const DELETE = rateLimit(rateLimitPresets.public)(handleDELETE);
