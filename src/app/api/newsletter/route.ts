import { type NextRequest } from "next/server";
import { logger } from "@/lib/utils/logger";
import { sendEmail } from "@/lib/email/emailService";
import { rateLimit, rateLimitPresets } from "@/lib/security/rateLimiter";
import {
  badRequest,
  createSuccessResponse,
  internalServerError,
} from "@/lib/api/responses";
import { generateNewsletterAcknowledgment } from "@/lib/email/templates";

export const runtime = "edge";
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

export async function handlePOST(request: NextRequest) {
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
      <td style="background: linear-gradient(135deg, #386851 0%, #2d5340 100%); padding: 30px; text-align: center;">
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
            <td style="padding: 10px; border-bottom: 1px solid #e0e0e0;">${data.email}</td>
          </tr>
          ${
            data.name
              ? `
          <tr>
            <td style="padding: 10px; border-bottom: 1px solid #e0e0e0; font-weight: 600; color: #666;">Name:</td>
            <td style="padding: 10px; border-bottom: 1px solid #e0e0e0;">${data.name}</td>
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
