import { type NextRequest } from "next/server";
import { logger } from "@/lib/utils/logger";
import { captureServerException } from "@/lib/monitoring/sentry-server";
import { createDbClient, type ContactSubmission } from "@/lib/db/client";
import { getD1Database } from "@/lib/db/env";
import { sendEmail, type EmailAttachment } from "@/lib/email/email-service";
import { sendToN8nAsync } from "@/lib/notifications/n8n-webhook";
import { alertMatt } from "@/lib/notifications/twilio-sms";
import { rateLimit, rateLimitPresets } from "@/lib/security/rate-limiter";
import { requireRole } from "@/lib/auth/middleware";
import { withSecurity } from "@/middleware/security";
import { COMPANY_INFO, EMAIL_RECIPIENTS } from "@/lib/constants/company";
import {
  badRequest,
  createSuccessResponse,
  createPaginatedResponse,
  internalServerError,
} from "@/lib/api/responses";
import { escapeHtml } from "@/lib/utils/escape-html";
import { isValidEmail } from "@/lib/utils/validation";

export const dynamic = "force-dynamic";

/**
 * Contact API - Handles all form submissions and sends emails
 * Uses centralized email service to avoid circular dependencies
 *
 * Email Service: Resend (https://resend.com)
 */

// Emails that callers are permitted to designate as the recipient.
// Any value outside this set is silently replaced with the default.
const ALLOWED_RECIPIENT_EMAILS = new Set([
  COMPANY_INFO.email.main,
  "matt@mhc-gc.com",
  "arnold@mhc-gc.com",
  "brittney@mhc-gc.com",
]);

interface ContactRequest {
  name: string;
  email: string;
  phone?: string;
  subject?: string;
  message: string;
  type?:
    | "contact"
    | "job-application"
    | "consultation"
    | "general"
    | "acknowledgment";
  recipientEmail?: string;
  metadata?: Record<string, string | number | boolean | null>;
  attachments?: EmailAttachment[];
}

async function handlePOST(request: NextRequest) {
  try {
    const data: ContactRequest = await request.json();

    // Validate required fields
    if (!data.name || !data.email || !data.message) {
      return badRequest(
        "Missing required fields: name, email, and message are required",
      );
    }

    // Input length limits
    if (data.name.length > 200) return badRequest("Name is too long");
    if (data.email.length > 254) return badRequest("Email is too long");
    if (data.message.length > 5000) return badRequest("Message is too long");
    if (data.phone && data.phone.length > 30) {
      return badRequest("Phone number is too long");
    }

    // Email validation - using centralized utility
    if (!isValidEmail(data.email)) {
      return badRequest("Invalid email address");
    }

    // Metadata size limits — prevent log/storage inflation
    if (data.metadata) {
      if (Object.keys(data.metadata).length > 15) {
        return badRequest("Too many metadata fields");
      }
      for (const val of Object.values(data.metadata)) {
        if (typeof val === "string" && val.length > 500) {
          return badRequest("Metadata value is too long");
        }
      }
    }

    // Prepare email recipients — only accept known internal addresses to
    // prevent open email relay.
    const recipientEmail =
      data.recipientEmail && ALLOWED_RECIPIENT_EMAILS.has(data.recipientEmail)
        ? data.recipientEmail
        : COMPANY_INFO.email.main;
    const emailSubject =
      data.subject || `New ${data.type || "Contact"} Form Submission`;

    // Determine recipients based on type
    const isAcknowledgment =
      data.type === "acknowledgment" || data.metadata?.["isAcknowledgment"];

    const isJobApplication = data.type === "job-application";

    let emailRecipients: string[];
    if (isAcknowledgment) {
      emailRecipients = [recipientEmail];
    } else if (isJobApplication) {
      // Employee applications must notify office, matt, arnold, and brittney.
      emailRecipients = [
        ...new Set([recipientEmail, ...EMAIL_RECIPIENTS.careers]),
      ];
    } else {
      // All non-acknowledgment submissions go to office, Matt, and Arnold
      emailRecipients = [
        ...new Set([recipientEmail, ...EMAIL_RECIPIENTS.contact]),
      ];
    }

    // Generate email content from structured data only — no caller-supplied HTML.
    const emailHtml = generateEmailHTML(data);
    const emailText = generateEmailText(data);

    // Send email using centralized service
    const emailResult = await sendEmail({
      to: emailRecipients,
      subject: emailSubject,
      html: emailHtml,
      text: emailText,
      ...(data.attachments && { attachments: data.attachments }),
    });

    const emailSent = emailResult.success;

    if (!emailSent) {
      logger.error("Failed to send email:", emailResult.error);
    }

    // Store submission in D1 database (best-effort pattern)
    const submissionId = crypto.randomUUID();

    // For general contact forms, store in contact_submissions table
    // (job-application and consultation types are stored in their own tables)
    if (data.type === "contact" || data.type === "general" || !data.type) {
      try {
        const DB = getD1Database();
        if (DB) {
          const db = createDbClient({ DB });

          // Parse name into first and last name (simple split)
          const nameParts = data.name.trim().split(/\s+/);
          const firstName = nameParts[0] || data.name;
          const lastName = nameParts.slice(1).join(" ") || "";

          // Extract metadata with proper type handling
          const metadata = data.metadata as Record<string, unknown> | undefined;
          const projectType = metadata?.["projectType"];
          const location = metadata?.["location"];
          const budget = metadata?.["budget"];
          const timeline = metadata?.["timeline"];

          const contactSubmission: Omit<
            ContactSubmission,
            "created_at" | "updated_at"
          > = {
            id: submissionId,
            first_name: firstName,
            last_name: lastName,
            email: data.email,
            phone: data.phone || "",
            project_type:
              (typeof projectType === "string" ? projectType : undefined) || "",
            project_location:
              (typeof location === "string" ? location : undefined) || "",
            budget: budget?.toString() || "",
            timeline:
              (typeof timeline === "string" ? timeline : undefined) || "",
            message: data.message,
            urgency: "medium",
            preferred_contact: "either",
            status: emailSent ? "new" : "in_progress",
            metadata: JSON.stringify({
              subject: data.subject,
              emailSent,
              emailError: emailSent ? undefined : emailResult.error,
              submittedAt: new Date().toISOString(),
            }),
          };

          await db.insert("contact_submissions", contactSubmission);
          logger.info("Contact submission stored in database", {
            id: submissionId,
          });
        } else {
          logger.info(
            "D1 database not available, contact submission not persisted",
            { id: submissionId },
          );
        }
      } catch (error) {
        logger.error("Failed to store contact submission in database:", error);
        // Continue even if DB fails (best-effort pattern)
      }
    }

    // Send to n8n for backup notification (fire-and-forget)
    sendToN8nAsync({
      type: (data.type as "contact" | "consultation") || "contact",
      data: {
        id: submissionId,
        name: data.name,
        email: data.email,
        phone: data.phone,
        subject: data.subject,
        message: data.message,
        ...data.metadata,
      },
    });

    // SMS alert for consultation requests only
    if (data.type === "consultation") {
      alertMatt(
        `New Consultation from ${data.name}: ${data.subject || data.message.slice(0, 50)}`,
      );
    }

    return createSuccessResponse(
      {
        id: submissionId,
        recipientEmail,
        emailSent,
      },
      emailSent
        ? "Message sent successfully"
        : "Message received (email service not configured)",
    );
  } catch (error) {
    logger.error("Error processing contact form:", error);
    captureServerException(error, { request, route: "/api/contact" });
    return internalServerError("Failed to process contact form submission");
  }
}

/**
 * Generate HTML email content
 */
function generateEmailHTML(data: ContactRequest): string {
  const metadata = data.metadata
    ? Object.entries(data.metadata)
        .map(
          ([key, value]) =>
            `<tr><td style="padding: 8px; border-bottom: 1px solid #e5e5e5;"><strong>${escapeHtml(formatFieldName(key))}:</strong></td><td style="padding: 8px; border-bottom: 1px solid #e5e5e5;">${escapeHtml(value)}</td></tr>`,
        )
        .join("")
    : "";

  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${escapeHtml(data.subject || "New Form Submission")}</title>
</head>
<body style="font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; line-height: 1.6; color: #212121; margin: 0; padding: 0; background-color: #f5f5f5;">
  <table width="100%" cellpadding="0" cellspacing="0" style="max-width: 600px; margin: 20px auto; background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
    <!-- Header -->
    <tr>
      <td style="background: linear-gradient(135deg, #386851 0%, #1E392C 100%); padding: 30px; text-align: center;">
        <h1 style="color: #ffffff; margin: 0; font-size: 24px; font-weight: 700;">MH Construction, Inc.</h1>
        <p style="color: #d4af37; margin: 10px 0 0 0; font-size: 14px; font-weight: 600;">Veteran-Owned. Relationship-first.</p>
      </td>
    </tr>
    
    <!-- Content -->
    <tr>
      <td style="padding: 30px;">
        <h2 style="color: #386851; margin: 0 0 20px 0; font-size: 20px;">New ${escapeHtml(data.type || "Contact")} Form Submission</h2>
        
        <table width="100%" cellpadding="0" cellspacing="0" style="border-collapse: collapse; margin-bottom: 20px;">
          <tr>
            <td style="padding: 8px; border-bottom: 1px solid #e5e5e5;"><strong>Name:</strong></td>
            <td style="padding: 8px; border-bottom: 1px solid #e5e5e5;">${escapeHtml(data.name)}</td>
          </tr>
          <tr>
            <td style="padding: 8px; border-bottom: 1px solid #e5e5e5;"><strong>Email:</strong></td>
            <td style="padding: 8px; border-bottom: 1px solid #e5e5e5;"><a href="mailto:${escapeHtml(data.email)}" style="color: #386851; text-decoration: none;">${escapeHtml(data.email)}</a></td>
          </tr>
          ${
            data.phone
              ? `
          <tr>
            <td style="padding: 8px; border-bottom: 1px solid #e5e5e5;"><strong>Phone:</strong></td>
            <td style="padding: 8px; border-bottom: 1px solid #e5e5e5;"><a href="tel:${escapeHtml(data.phone)}" style="color: #386851; text-decoration: none;">${escapeHtml(data.phone)}</a></td>
          </tr>
          `
              : ""
          }
          ${metadata}
        </table>
        
        <div style="background-color: #f9f9f9; border-left: 4px solid #386851; padding: 15px; margin: 20px 0;">
          <h3 style="margin: 0 0 10px 0; color: #386851; font-size: 16px;">Message:</h3>
          <p style="margin: 0; white-space: pre-wrap;">${escapeHtml(data.message)}</p>
        </div>
        
        <p style="color: #666; font-size: 12px; margin: 20px 0 0 0;">
          <strong>Submission Time:</strong> ${new Date().toLocaleString("en-US", { timeZone: "America/Los_Angeles" })} PST
        </p>
      </td>
    </tr>
    
    <!-- Footer -->
    <tr>
      <td style="background-color: #f5f5f5; padding: 20px; text-align: center; border-top: 1px solid #e5e5e5;">
        <p style="margin: 0 0 10px 0; font-size: 14px; color: #666;">
          <strong>MH Construction, Inc.</strong><br>
          ${COMPANY_INFO.address.full}<br>
          Phone: <a href="tel:${COMPANY_INFO.phone.tel}" style="color: #386851; text-decoration: none;">${COMPANY_INFO.phone.display}</a><br>
          Email: <a href="mailto:${COMPANY_INFO.email.main}" style="color: #386851; text-decoration: none;">${COMPANY_INFO.email.main}</a>
        </p>
        <p style="margin: 0; font-size: 12px; color: #999;">
          Licensed in WA, OR, ID | Veteran-Owned & Operated
        </p>
      </td>
    </tr>
  </table>
</body>
</html>
  `.trim();
}

/**
 * Generate plain text email content
 */
function generateEmailText(data: ContactRequest): string {
  const metadata = data.metadata
    ? Object.entries(data.metadata)
        .map(([key, value]) => `${formatFieldName(key)}: ${value}`)
        .join("\n")
    : "";

  return `
MH Construction, Inc. - New ${data.type || "Contact"} Form Submission

Veteran-Owned. Relationship-first.

---

Name: ${data.name}
Email: ${data.email}
${data.phone ? `Phone: ${data.phone}\n` : ""}
${metadata ? `\n${metadata}\n` : ""}

Message:
${data.message}

---

Submission Time: ${new Date().toLocaleString("en-US", { timeZone: "America/Los_Angeles" })} PST

---

MH Construction, Inc.
${COMPANY_INFO.address.full}
Phone: ${COMPANY_INFO.phone.display}
Email: ${COMPANY_INFO.email.main}

Licensed in WA, OR, ID | Veteran-Owned & Operated
  `.trim();
}

/**
 * Format field names for display (camelCase to Title Case)
 */
function formatFieldName(fieldName: string): string {
  return fieldName
    .replace(/([A-Z])/g, " $1")
    .replace(/^./, (str) => str.toUpperCase())
    .trim();
}

/**
 * GET endpoint to retrieve contact submissions — admin only
 */
async function handleGET() {
  try {
    // Retrieve contact submissions from D1 database (when deployed to Cloudflare)
    const DB = getD1Database();

    if (DB) {
      try {
        const db = createDbClient({ DB });
        const submissions = await db.query<ContactSubmission>(
          `SELECT * FROM contact_submissions ORDER BY created_at DESC LIMIT 100`,
        );

        return createPaginatedResponse(submissions, submissions.length);
      } catch (error) {
        logger.error("Error fetching from database:", error);
        // Fall through to fallback response (best-effort pattern)
      }
    }

    // Fallback for local development or if DB query fails
    return createPaginatedResponse(
      [],
      0,
      "D1 database not available in this environment",
    );
  } catch (error) {
    logger.error("Error fetching contact submissions:", error);
    captureServerException(error, { route: "/api/contact GET" });
    return internalServerError("Failed to fetch contact submissions");
  }
}

// Require admin role to list submissions; apply rate limiting to POST
export const GET = requireRole(["admin"], withSecurity(handleGET));
export const POST = rateLimit(rateLimitPresets.api)(withSecurity(handlePOST));
