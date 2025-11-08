import { type NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { logger } from "@/lib/utils/logger";
import { createDbClient, type ContactSubmission } from "@/lib/db/client";
import { getD1Database } from "@/lib/db/env";

export const runtime = "edge";
export const dynamic = "force-dynamic";

/**
 * Contact API - Handles all form submissions and sends emails to office@mhc-gc.com
 * This endpoint serves as the central hub for all contact forms, job applications,
 * consultations, and other submissions that need to be emailed to the office.
 *
 * Email Service: Resend (https://resend.com)
 */

interface ContactRequest {
  name: string;
  email: string;
  phone?: string;
  subject?: string;
  message: string;
  type?: "contact" | "job-application" | "consultation" | "urgent" | "general";
  recipientEmail?: string; // Defaults to office@mhc-gc.com
  metadata?: Record<string, string | number | boolean | null>;
}

export async function POST(request: NextRequest) {
  try {
    const data: ContactRequest = await request.json();

    // Validate required fields
    if (!data.name || !data.email || !data.message) {
      return NextResponse.json(
        {
          error:
            "Missing required fields: name, email, and message are required",
        },
        { status: 400 },
      );
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
      return NextResponse.json(
        { error: "Invalid email address" },
        { status: 400 },
      );
    }

    // Create email notification
    const recipientEmail = data.recipientEmail || "office@mhc-gc.com";
    const emailSubject =
      data.subject || `New ${data.type || "Contact"} Form Submission`;

    const emailData = {
      to: recipientEmail,
      from: process.env.EMAIL_FROM || "noreply@mhc-gc.com",
      subject: emailSubject,
      html: generateEmailHTML(data),
      text: generateEmailText(data),
    };

    // Send email using Resend
    let emailSent = false;
    let emailError = null;

    if (process.env.RESEND_API_KEY) {
      try {
        const resend = new Resend(process.env.RESEND_API_KEY);

        const { data: emailResult, error } = await resend.emails.send({
          from: emailData.from,
          to: emailData.to,
          subject: emailData.subject,
          html: emailData.html,
          text: emailData.text,
        });

        if (error) {
          logger.error("Resend API error:", error);
          emailError = error;
        } else {
          emailSent = true;
          logger.info("Email sent successfully:", {
            id: emailResult?.id,
            to: emailData.to,
            subject: emailData.subject,
          });
        }
      } catch (error) {
        logger.error("Error sending email with Resend:", error);
        emailError = error;
      }
    } else {
      // No API key configured - log warning
      logger.warn("⚠️  RESEND_API_KEY not configured. Email not sent.");
      logger.info("📧 Email that would be sent:", {
        to: emailData.to,
        subject: emailData.subject,
        from: emailData.from,
        sentAt: new Date().toISOString(),
      });
    }

    // Store submission in D1 database
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

          const contactSubmission: Omit<
            ContactSubmission,
            "created_at" | "updated_at"
          > = {
            id: submissionId,
            first_name: firstName,
            last_name: lastName,
            email: data.email,
            phone: data.phone || undefined,
            project_type: (data.metadata?.projectType as string) || undefined,
            project_location: (data.metadata?.location as string) || undefined,
            budget: data.metadata?.budget?.toString() || undefined,
            timeline: (data.metadata?.timeline as string) || undefined,
            message: data.message,
            urgency: data.type === "urgent" ? "high" : "medium",
            preferred_contact: "either",
            status: emailSent ? "new" : "in_progress",
            metadata: JSON.stringify({
              subject: data.subject,
              emailSent,
              emailError: emailError ? String(emailError) : undefined,
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
            {
              id: submissionId,
            },
          );
        }
      } catch (dbError) {
        logger.error(
          "Failed to store contact submission in database:",
          dbError,
        );
        // Continue even if DB fails - email was already sent
      }
    }

    return NextResponse.json({
      success: true,
      message: emailSent
        ? "Message sent successfully"
        : "Message received (email service not configured)",
      data: {
        id: submissionId,
        recipientEmail,
        emailSent,
      },
    });
  } catch (error) {
    logger.error("Error processing contact form:", error);
    return NextResponse.json(
      { error: "Failed to process contact form submission" },
      { status: 500 },
    );
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
        <h1 style="color: #ffffff; margin: 0; font-size: 24px; font-weight: 700;">MH Construction LLC</h1>
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
          <strong>MH Construction LLC</strong><br>
          3111 N. Capital Ave., Pasco, WA 99301<br>
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
MH Construction LLC - New ${data.type || "Contact"} Form Submission

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

MH Construction LLC
3111 N. Capital Ave., Pasco, WA 99301
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
    // This endpoint should typically require authentication
    try {
      const DB = getD1Database();
      if (DB) {
        const db = createDbClient({ DB });
        const submissions = await db.query<ContactSubmission>(
          `SELECT * FROM contact_submissions ORDER BY created_at DESC LIMIT 100`,
        );

        return NextResponse.json({
          success: true,
          data: submissions,
          count: submissions.length,
        });
      }
    } catch (dbError) {
      logger.error("Error fetching from database:", dbError);
    }

    // Fallback for local development
    return NextResponse.json({
      success: true,
      data: [],
      count: 0,
      message: "D1 database not available in this environment",
    });
  } catch (error) {
    logger.error("Error fetching contact submissions:", error);
    return NextResponse.json(
      { error: "Failed to fetch contact submissions" },
      { status: 500 },
    );
  }
}
