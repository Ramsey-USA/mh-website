import { type NextRequest } from "next/server";
import { logger } from "@/lib/utils/logger";
import { createDbClient, type ContactSubmission } from "@/lib/db/client";
import { getD1Database } from "@/lib/db/env";
import { sendEmail, type EmailAttachment } from "@/lib/email/emailService";
import { rateLimit, rateLimitPresets } from "@/lib/security/rateLimiter";
import {
  badRequest,
  createSuccessResponse,
  createPaginatedResponse,
  internalServerError,
} from "@/lib/api/responses";

export const runtime = "edge";
export const dynamic = "force-dynamic";

/**
 * Contact API - Handles all form submissions and sends emails
 * Uses centralized email service to avoid circular dependencies
 *
 * Email Service: Resend (https://resend.com)
 */

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
    | "urgent"
    | "general"
    | "acknowledgment";
  recipientEmail?: string;
  metadata?: Record<string, string | number | boolean | null>;
  attachments?: EmailAttachment[];
  customHtml?: string; // For custom email templates (e.g., acknowledgments)
}

export async function handlePOST(request: NextRequest) {
  try {
    const data: ContactRequest = await request.json();

    // Validate required fields
    if (!data.name || !data.email || !data.message) {
      return badRequest(
        "Missing required fields: name, email, and message are required",
      );
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
      return badRequest("Invalid email address");
    }

    // Prepare email recipients
    const recipientEmail = data.recipientEmail || "office@mhc-gc.com";
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
      emailRecipients = [
        recipientEmail,
        "matt@mhc-gc.com",
        "arnold@mhc-gc.com",
      ];
    } else {
      emailRecipients = [recipientEmail, "matt@mhc-gc.com"];
    }

    // Generate email content
    const emailHtml = data.customHtml || generateEmailHTML(data);
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
    if (
      data.type === "contact" ||
      data.type === "general" ||
      data.type === "urgent" ||
      !data.type
    ) {
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
            urgency: data.type === "urgent" ? "high" : "medium",
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
            `<tr><td style="padding: 8px; border-bottom: 1px solid #e5e5e5;"><strong>${formatFieldName(key)}:</strong></td><td style="padding: 8px; border-bottom: 1px solid #e5e5e5;">${value}</td></tr>`,
        )
        .join("")
    : "";

  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${data.subject || "New Form Submission"}</title>
</head>
<body style="font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; line-height: 1.6; color: #212121; margin: 0; padding: 0; background-color: #f5f5f5;">
  <table width="100%" cellpadding="0" cellspacing="0" style="max-width: 600px; margin: 20px auto; background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
    <!-- Header -->
    <tr>
      <td style="background: linear-gradient(135deg, #386851 0%, #2d5340 100%); padding: 30px; text-align: center;">
        <h1 style="color: #ffffff; margin: 0; font-size: 24px; font-weight: 700;">MH Construction, Inc.</h1>
        <p style="color: #d4af37; margin: 10px 0 0 0; font-size: 14px; font-weight: 600;">Veteran-Owned Excellence</p>
      </td>
    </tr>
    
    <!-- Content -->
    <tr>
      <td style="padding: 30px;">
        <h2 style="color: #386851; margin: 0 0 20px 0; font-size: 20px;">New ${data.type || "Contact"} Form Submission</h2>
        
        <table width="100%" cellpadding="0" cellspacing="0" style="border-collapse: collapse; margin-bottom: 20px;">
          <tr>
            <td style="padding: 8px; border-bottom: 1px solid #e5e5e5;"><strong>Name:</strong></td>
            <td style="padding: 8px; border-bottom: 1px solid #e5e5e5;">${data.name}</td>
          </tr>
          <tr>
            <td style="padding: 8px; border-bottom: 1px solid #e5e5e5;"><strong>Email:</strong></td>
            <td style="padding: 8px; border-bottom: 1px solid #e5e5e5;"><a href="mailto:${data.email}" style="color: #386851; text-decoration: none;">${data.email}</a></td>
          </tr>
          ${
            data.phone
              ? `
          <tr>
            <td style="padding: 8px; border-bottom: 1px solid #e5e5e5;"><strong>Phone:</strong></td>
            <td style="padding: 8px; border-bottom: 1px solid #e5e5e5;"><a href="tel:${data.phone}" style="color: #386851; text-decoration: none;">${data.phone}</a></td>
          </tr>
          `
              : ""
          }
          ${metadata}
        </table>
        
        <div style="background-color: #f9f9f9; border-left: 4px solid #386851; padding: 15px; margin: 20px 0;">
          <h3 style="margin: 0 0 10px 0; color: #386851; font-size: 16px;">Message:</h3>
          <p style="margin: 0; white-space: pre-wrap;">${data.message}</p>
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
          3111 N. Capitol Ave., Pasco, WA 99301<br>
          Phone: <a href="tel:+15093086489" style="color: #386851; text-decoration: none;">(509) 308-6489</a><br>
          Email: <a href="mailto:office@mhc-gc.com" style="color: #386851; text-decoration: none;">office@mhc-gc.com</a>
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

Veteran-Owned Excellence

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
3111 N. Capitol Ave., Pasco, WA 99301
Phone: (509) 308-6489
Email: office@mhc-gc.com

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
 * GET endpoint to retrieve contact submissions
 * Should require authentication in production
 */
export async function GET() {
  try {
    // Retrieve contact submissions from D1 database (when deployed to Cloudflare)
    // Note: This endpoint should typically require authentication
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
    return internalServerError("Failed to fetch contact submissions");
  }
}

// Apply rate limiting to POST endpoint (10 requests per minute)
export const POST = rateLimit(rateLimitPresets.api)(handlePOST);
