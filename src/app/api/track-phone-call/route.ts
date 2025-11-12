import { type NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { logger } from "@/lib/utils/logger";

export const runtime = "edge";
export const dynamic = "force-dynamic";

/**
 * Phone Call Tracking API
 * Tracks when users click phone numbers and sends email notifications
 * to matt@mhc-gc.com (and optionally office@mhc-gc.com)
 */

interface PhoneCallTrackingRequest {
  source: string; // Where the click originated
  phoneNumber: string;
  timestamp: string;
  userAgent?: string;
  referrer?: string;
  page?: string;
  [key: string]: unknown;
}

export async function POST(request: NextRequest) {
  try {
    const data: PhoneCallTrackingRequest = await request.json();

    // Validate required fields
    if (!data.source || !data.phoneNumber) {
      return NextResponse.json(
        { error: "Missing required fields: source and phoneNumber" },
        { status: 400 },
      );
    }

    // Send email notification to matt@mhc-gc.com (and office@mhc-gc.com)
    let emailSent = false;

    if (process.env["RESEND_API_KEY"]) {
      try {
        const resend = new Resend(process.env["RESEND_API_KEY"]);

        const emailSubject = `Phone Call Activity: ${data.source}`;
        const emailHtml = generatePhoneTrackingEmailHTML(data);
        const emailText = generatePhoneTrackingEmailText(data);

        const { error } = await resend.emails.send({
          from: process.env["EMAIL_FROM"] || "noreply@mhc-gc.com",
          to: ["matt@mhc-gc.com", "office@mhc-gc.com"], // Send to both
          subject: emailSubject,
          html: emailHtml,
          text: emailText,
        });

        if (error) {
          logger.error("Resend API error (phone tracking):", error);
        } else {
          emailSent = true;
          logger.info("Phone call tracking email sent successfully:", {
            source: data.source,
            phoneNumber: data.phoneNumber,
          });
        }
      } catch (_error) {
        logger.error("Error sending phone tracking email:", _error);
      }
    } else {
      logger.warn(
        "⚠️  RESEND_API_KEY not configured. Phone tracking email not sent.",
      );
      logger.info("📞 Phone call that would be tracked:", {
        source: data.source,
        phoneNumber: data.phoneNumber,
        timestamp: data.timestamp,
      });
    }

    return NextResponse.json({
      success: true,
      message: emailSent
        ? "Phone call tracked successfully"
        : "Phone call logged (email not configured)",
      data: {
        source: data.source,
        emailSent,
      },
    });
  } catch (_error) {
    logger.error("Error processing phone call tracking:", _error);
    return NextResponse.json(
      { error: "Failed to track phone call" },
      { status: 500 },
    );
  }
}

/**
 * Generate HTML email for phone call tracking
 */
function generatePhoneTrackingEmailHTML(
  data: PhoneCallTrackingRequest,
): string {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Phone Call Activity</title>
</head>
<body style="font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; line-height: 1.6; color: #212121; margin: 0; padding: 0; background-color: #f5f5f5;">
  <table width="100%" cellpadding="0" cellspacing="0" style="max-width: 600px; margin: 20px auto; background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
    <!-- Header -->
    <tr>
      <td style="background: linear-gradient(135deg, #386851 0%, #2d5340 100%); padding: 30px; text-align: center;">
        <h1 style="color: #ffffff; margin: 0; font-size: 24px; font-weight: 700;">📞 Phone Call Activity</h1>
        <p style="color: #d4af37; margin: 10px 0 0 0; font-size: 14px; font-weight: 600;">MH Construction LLC</p>
      </td>
    </tr>
    
    <!-- Content -->
    <tr>
      <td style="padding: 30px;">
        <div style="background-color: #f0f7f4; border-left: 4px solid #386851; padding: 15px; margin-bottom: 20px;">
          <p style="margin: 0; font-size: 16px; color: #386851; font-weight: 600;">
            A visitor clicked the phone number on your website!
          </p>
        </div>
        
        <table width="100%" cellpadding="0" cellspacing="0" style="border-collapse: collapse; margin-bottom: 20px;">
          <tr>
            <td style="padding: 8px; border-bottom: 1px solid #e5e5e5;"><strong>Phone Number:</strong></td>
            <td style="padding: 8px; border-bottom: 1px solid #e5e5e5;"><a href="tel:${data.phoneNumber}" style="color: #386851; text-decoration: none; font-weight: 600;">${data.phoneNumber}</a></td>
          </tr>
          <tr>
            <td style="padding: 8px; border-bottom: 1px solid #e5e5e5;"><strong>Click Source:</strong></td>
            <td style="padding: 8px; border-bottom: 1px solid #e5e5e5;">${data.source}</td>
          </tr>
          <tr>
            <td style="padding: 8px; border-bottom: 1px solid #e5e5e5;"><strong>Time:</strong></td>
            <td style="padding: 8px; border-bottom: 1px solid #e5e5e5;">${new Date(data.timestamp).toLocaleString("en-US", { timeZone: "America/Los_Angeles" })} PST</td>
          </tr>
          ${
            data.page
              ? `
          <tr>
            <td style="padding: 8px; border-bottom: 1px solid #e5e5e5;"><strong>Page:</strong></td>
            <td style="padding: 8px; border-bottom: 1px solid #e5e5e5;"><a href="${data.page}" style="color: #386851; text-decoration: none;">${data.page}</a></td>
          </tr>
          `
              : ""
          }
          ${
            data.referrer
              ? `
          <tr>
            <td style="padding: 8px; border-bottom: 1px solid #e5e5e5;"><strong>Referrer:</strong></td>
            <td style="padding: 8px; border-bottom: 1px solid #e5e5e5;">${data.referrer}</td>
          </tr>
          `
              : ""
          }
          ${
            data.userAgent
              ? `
          <tr>
            <td style="padding: 8px; border-bottom: 1px solid #e5e5e5;"><strong>Device:</strong></td>
            <td style="padding: 8px; border-bottom: 1px solid #e5e5e5; font-size: 12px; color: #666;">${data.userAgent}</td>
          </tr>
          `
              : ""
          }
        </table>
        
        <div style="background-color: #fff9e6; border-left: 4px solid #d4af37; padding: 15px; margin: 20px 0;">
          <p style="margin: 0; font-size: 14px; color: #856404;">
            <strong>Action Required:</strong> This is a hot lead! The visitor is actively trying to contact you. 
            Be prepared for an incoming call to <strong>${data.phoneNumber}</strong>.
          </p>
        </div>
      </td>
    </tr>
    
    <!-- Footer -->
    <tr>
      <td style="background-color: #f5f5f5; padding: 20px; text-align: center; border-top: 1px solid #e5e5e5;">
        <p style="margin: 0 0 10px 0; font-size: 14px; color: #666;">
          <strong>MH Construction LLC</strong><br>
          Automated Phone Call Tracking System
        </p>
        <p style="margin: 0; font-size: 12px; color: #999;">
          This notification helps you track visitor engagement and respond promptly to inquiries.
        </p>
      </td>
    </tr>
  </table>
</body>
</html>
  `.trim();
}

/**
 * Generate plain text email for phone call tracking
 */
function generatePhoneTrackingEmailText(
  data: PhoneCallTrackingRequest,
): string {
  return `
MH Construction LLC - Phone Call Activity

📞 A visitor clicked the phone number on your website!

Phone Number: ${data.phoneNumber}
Click Source: ${data.source}
Time: ${new Date(data.timestamp).toLocaleString("en-US", { timeZone: "America/Los_Angeles" })} PST
${data.page ? `Page: ${data.page}\n` : ""}${data.referrer ? `Referrer: ${data.referrer}\n` : ""}${data.userAgent ? `Device: ${data.userAgent}\n` : ""}

⚠️ ACTION REQUIRED: This is a hot lead! The visitor is actively trying to contact you.
Be prepared for an incoming call to ${data.phoneNumber}.

---

MH Construction LLC
Automated Phone Call Tracking System
  `.trim();
}
