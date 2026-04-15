/**
 * Twilio SMS Integration
 *
 * Sends SMS notifications for urgent form submissions and alerts.
 * Uses Twilio REST API directly (no SDK needed for Cloudflare Workers).
 *
 * Required env vars:
 * - TWILIO_ACCOUNT_SID
 * - TWILIO_AUTH_TOKEN
 * - TWILIO_FROM_NUMBER
 */

import { logger } from "@/lib/utils/logger";

export interface SmsResult {
  success: boolean;
  messageId?: string;
  error?: string;
}

export interface SmsOptions {
  to: string;
  message: string;
}

// Phone numbers to notify for urgent submissions
export const ALERT_RECIPIENTS = {
  matt: "+15094912494",
  // Add more recipients as needed
} as const;

/**
 * Send an SMS via Twilio REST API
 */
export async function sendSms(options: SmsOptions): Promise<SmsResult> {
  const accountSid = process.env["TWILIO_ACCOUNT_SID"];
  const authToken = process.env["TWILIO_AUTH_TOKEN"];
  const fromNumber = process.env["TWILIO_FROM_NUMBER"];

  if (!accountSid || !authToken || !fromNumber) {
    logger.warn("Twilio credentials not configured, skipping SMS");
    return {
      success: false,
      error: "Twilio not configured",
    };
  }

  // Validate phone number format
  const cleanTo = options.to.replace(/[^\d+]/g, "");
  if (!cleanTo.match(/^\+1\d{10}$/)) {
    return {
      success: false,
      error: "Invalid phone number format (must be +1XXXXXXXXXX)",
    };
  }

  // Truncate message to SMS limit
  const message = options.message.slice(0, 1600);

  try {
    const url = `https://api.twilio.com/2010-04-01/Accounts/${accountSid}/Messages.json`;

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: `Basic ${btoa(`${accountSid}:${authToken}`)}`,
      },
      body: new URLSearchParams({
        To: cleanTo,
        From: fromNumber,
        Body: message,
      }),
    });

    const data = await response.json();

    if (response.ok && data.sid) {
      logger.info("SMS sent successfully", {
        messageId: data.sid,
        to: cleanTo,
      });
      return {
        success: true,
        messageId: data.sid,
      };
    } else {
      logger.error("Twilio API error", {
        status: response.status,
        error: data,
      });
      return {
        success: false,
        error: data.message || "Failed to send SMS",
      };
    }
  } catch (error) {
    logger.error("SMS send error", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
}

/**
 * Send SMS notification asynchronously (fire-and-forget)
 * Use for non-blocking notifications
 */
export function sendSmsAsync(options: SmsOptions): void {
  sendSms(options).catch((error) => {
    logger.error("Async SMS send failed", error);
  });
}

/**
 * Notify all alert recipients about an urgent submission
 */
export async function notifyUrgentSubmission(
  type: "contact" | "consultation" | "lead",
  summary: string,
): Promise<void> {
  const message = `🚨 MHC Alert: New ${type}\n\n${summary}\n\nCheck dashboard for details.`;

  // Send to all recipients
  for (const [name, phone] of Object.entries(ALERT_RECIPIENTS)) {
    const result = await sendSms({ to: phone, message });
    if (!result.success) {
      logger.warn(`Failed to notify ${name}`, { error: result.error });
    }
  }
}

/**
 * Send a simple alert SMS to Matt
 */
export function alertMatt(message: string): void {
  sendSmsAsync({
    to: ALERT_RECIPIENTS.matt,
    message: `MHC: ${message}`,
  });
}
