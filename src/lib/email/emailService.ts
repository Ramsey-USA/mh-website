/**
 * Centralized Email Service
 * Handles all email sending operations using Resend API
 * Prevents circular dependencies and provides consistent email handling
 */

import { Resend } from "resend";
import { logger } from "@/lib/utils/logger";

export interface EmailAttachment {
  content: string; // base64 encoded
  filename: string;
  contentType?: string;
}

export interface SendEmailOptions {
  to: string | string[];
  subject: string;
  html?: string;
  text?: string;
  from?: string;
  attachments?: EmailAttachment[];
  replyTo?: string;
}

export interface EmailResult {
  success: boolean;
  messageId?: string;
  error?: string;
}

/**
 * Email Service class for handling all email operations
 */
export class EmailService {
  private resend: Resend | null = null;
  private fromEmail: string;
  private isConfigured: boolean;

  constructor() {
    const apiKey = process.env["RESEND_API_KEY"];
    this.fromEmail = process.env["EMAIL_FROM"] || "noreply@mhc-gc.com";
    this.isConfigured = Boolean(apiKey);

    if (apiKey) {
      this.resend = new Resend(apiKey);
    } else {
      logger.warn(
        "⚠️  RESEND_API_KEY not configured. Emails will be logged only.",
      );
    }
  }

  /**
   * Send an email
   * @param options Email sending options
   * @returns Email result with success status
   */
  async sendEmail(options: SendEmailOptions): Promise<EmailResult> {
    const { to, subject, html, text, from, attachments, replyTo } = options;

    // Validate required fields
    if (!to || !subject) {
      logger.error("Email validation failed: missing required fields");
      return {
        success: false,
        error: "Missing required fields: to and subject are required",
      };
    }

    if (!html && !text) {
      logger.error("Email validation failed: missing content");
      return {
        success: false,
        error: "Either html or text content is required",
      };
    }

    // If Resend is not configured, log and return
    if (!this.resend || !this.isConfigured) {
      logger.warn("📧 Email that would be sent:");
      logger.info(
        `To: ${Array.isArray(to) ? to.join(", ") : to}, Subject: ${subject}, Attachments: ${attachments && attachments.length > 0 ? attachments.length : 0}`,
      );
      return {
        success: false,
        error: "Email service not configured",
      };
    }

    try {
      // Normalize recipients to array
      const recipients = Array.isArray(to) ? to : [to];

      // Prepare email payload
      const emailPayload: {
        from: string;
        to: string[];
        subject: string;
        html?: string;
        text?: string;
        replyTo?: string;
        attachments?: Array<{
          content: string;
          filename: string;
        }>;
      } = {
        from: from || this.fromEmail,
        to: recipients,
        subject,
      };

      // Add optional properties only if defined
      if (html) emailPayload.html = html;
      if (text) emailPayload.text = text;
      if (replyTo) emailPayload.replyTo = replyTo;

      // Add attachments if provided
      if (attachments && attachments.length > 0) {
        emailPayload.attachments = attachments.map((att) => ({
          content: att.content,
          filename: att.filename,
        }));
      }

      // Send email
      const { data: emailResult, error } = await this.resend.emails.send(
        emailPayload as Parameters<typeof this.resend.emails.send>[0],
      );

      if (error) {
        logger.error("Resend API error:", error);
        return {
          success: false,
          error: String(error),
        };
      }

      logger.info("Email sent successfully:", {
        messageId: emailResult?.id,
        to: recipients.join(", "),
        subject,
        attachments: attachments?.length || 0,
      });

      return {
        success: true,
        messageId: emailResult?.id,
      };
    } catch (error) {
      logger.error("Error sending email:", error);
      return {
        success: false,
        error: error instanceof Error ? error.message : String(error),
      };
    }
  }

  /**
   * Send email to office team (office@, matt@, and optionally arnold@ for job applications)
   * @param subject Email subject
   * @param content Email content (html and text)
   * @param includeArnold Whether to include arnold@mhc-gc.com (for job applications)
   * @param attachments Optional attachments
   */
  sendToOffice(
    subject: string,
    content: { html: string; text: string },
    includeArnold = false,
    attachments?: EmailAttachment[],
  ): Promise<EmailResult> {
    const recipients = ["office@mhc-gc.com", "matt@mhc-gc.com"];
    if (includeArnold) {
      recipients.push("arnold@mhc-gc.com");
    }

    return this.sendEmail({
      to: recipients,
      subject,
      html: content.html,
      text: content.text,
      ...(attachments && attachments.length > 0 && { attachments }),
    });
  }

  /**
   * Send acknowledgment email to a user
   * @param recipientEmail User's email address
   * @param subject Email subject
   * @param content Email content (html and text)
   */
  sendAcknowledgment(
    recipientEmail: string,
    subject: string,
    content: { html: string; text: string },
  ): Promise<EmailResult> {
    return this.sendEmail({
      to: recipientEmail,
      subject,
      html: content.html,
      text: content.text,
    });
  }

  /**
   * Check if email service is configured and ready
   */
  isReady(): boolean {
    return this.isConfigured && this.resend !== null;
  }
}

// Export singleton instance
export const emailService = new EmailService();

// Export convenience functions
export function sendEmail(options: SendEmailOptions): Promise<EmailResult> {
  return emailService.sendEmail(options);
}

export function sendToOffice(
  subject: string,
  content: { html: string; text: string },
  includeArnold = false,
  attachments?: EmailAttachment[],
): Promise<EmailResult> {
  return emailService.sendToOffice(
    subject,
    content,
    includeArnold,
    attachments,
  );
}

export function sendAcknowledgment(
  recipientEmail: string,
  subject: string,
  content: { html: string; text: string },
): Promise<EmailResult> {
  return emailService.sendAcknowledgment(recipientEmail, subject, content);
}
