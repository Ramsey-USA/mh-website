/**
 * Notification Service
 *
 * Handles email, push, and SMS notifications
 */

import { logger } from "@/lib/utils/logger";

export interface NotificationOptions {
  recipient: string;
  subject?: string;
  message: string;
  type: "email" | "push" | "sms";
  metadata?: Record<string, unknown>;
  priority?: "low" | "normal" | "high";
}

export interface NotificationResult {
  success: boolean;
  messageId?: string;
  error?: string;
}

/**
 * Send email notification using Resend or other email service
 */
async function sendEmail(
  options: NotificationOptions,
): Promise<NotificationResult> {
  const {
    recipient,
    subject = "Notification from MH Construction",
    message,
  } = options;

  try {
    // Check if Resend API key is configured
    const resendApiKey = process.env["RESEND_API_KEY"];

    if (!resendApiKey) {
      logger.warn("Resend API key not configured, skipping email");
      return {
        success: false,
        error: "Email service not configured",
      };
    }

    // Send email via Resend API
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        ["Content-Type"]: "application/json",
        ["Authorization"]: `Bearer ${resendApiKey}`,
      },
      body: JSON.stringify({
        from: "MH Construction <noreply@mhc-gc.com>",
        to: recipient,
        subject: subject,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #386851;">MH Construction</h2>
            <div style="margin: 20px 0;">
              ${message}
            </div>
            <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;" />
            <p style="color: #666; font-size: 12px;">
              This email was sent by MH Construction. If you did not request this, please ignore it.
            </p>
          </div>
        `,
      }),
    });

    if (!response.ok) {
      const error = await response.text();
      logger.error("Email send failed", {
        ["error"]: error,
        ["recipient"]: recipient,
      });
      return {
        success: false,
        error: `Failed to send email: ${error}`,
      };
    }

    const result = await response.json();
    logger.info("Email sent successfully", {
      ["recipient"]: recipient,
      ["messageId"]: result.id,
    });

    return {
      success: true,
      messageId: result.id,
    };
  } catch (_error) {
    logger.error("Email send _error", {
      ["_error"]: _error,
      ["recipient"]: recipient,
    });
    return {
      success: false,
      error: _error instanceof Error ? _error.message : "Unknown error",
    };
  }
}

/**
 * Send push notification
 * NOTE: Push notifications require a provider such as OneSignal or FCM.
 * Set ONESIGNAL_APP_ID + ONESIGNAL_API_KEY environment variables and
 * replace this function body with the provider SDK call.
 */
function sendPush(options: NotificationOptions): NotificationResult {
  const { recipient } = options;
  logger.warn("Push notifications are not configured", { recipient });
  return {
    success: false,
    error: "Push notifications are not configured",
  };
}

/**
 * Twilio client cache for edge runtime compatibility.
 * Credentials are read lazily to support Cloudflare Workers cold starts.
 */
let twilioConfig: {
  accountSid: string;
  authToken: string;
  fromNumber: string;
} | null = null;

function getTwilioConfig(): typeof twilioConfig {
  if (!twilioConfig) {
    const accountSid = process.env["TWILIO_ACCOUNT_SID"];
    const authToken = process.env["TWILIO_AUTH_TOKEN"];
    const fromNumber = process.env["TWILIO_FROM_NUMBER"];

    if (accountSid && authToken && fromNumber) {
      twilioConfig = { accountSid, authToken, fromNumber };
    }
  }
  return twilioConfig;
}

/**
 * Send SMS notification via Twilio.
 * Set TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN, and TWILIO_FROM_NUMBER
 * environment variables to enable SMS delivery.
 *
 * Uses fetch API for Cloudflare Workers edge runtime compatibility.
 */
async function sendSMS(
  options: NotificationOptions,
): Promise<NotificationResult> {
  const { recipient, message } = options;

  const config = getTwilioConfig();
  if (!config) {
    logger.warn("Twilio credentials not configured, skipping SMS", {
      recipient,
    });
    return {
      success: false,
      error: "SMS service not configured",
    };
  }

  const { accountSid, authToken, fromNumber } = config;

  try {
    const url = `https://api.twilio.com/2010-04-01/Accounts/${accountSid}/Messages.json`;
    const credentials = btoa(`${accountSid}:${authToken}`);

    const body = new URLSearchParams({
      To: recipient,
      From: fromNumber,
      Body: message,
    });

    const response = await fetch(url, {
      method: "POST",
      headers: {
        Authorization: `Basic ${credentials}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: body.toString(),
    });

    if (!response.ok) {
      const error = await response.text();
      logger.error("SMS send failed", { error, recipient });
      return { success: false, error: `Failed to send SMS: ${error}` };
    }

    const result = (await response.json()) as { sid: string };
    logger.info("SMS sent successfully", { recipient, sid: result.sid });
    return { success: true, messageId: result.sid };
  } catch (err) {
    logger.error("SMS send error", { err, recipient });
    return {
      success: false,
      error: err instanceof Error ? err.message : "Unknown error",
    };
  }
}

/**
 * Send notification (routes to appropriate service)
 */
export function sendNotification(
  options: NotificationOptions,
): Promise<NotificationResult> {
  logger.info("Sending notification", {
    ["type"]: options.type,
    ["recipient"]: options.recipient,
    ["priority"]: options.priority || "normal",
  });

  switch (options.type) {
    case "email":
      return sendEmail(options);
    case "push":
      return Promise.resolve(sendPush(options));
    case "sms":
      return sendSMS(options);
    default:
      return Promise.resolve({
        success: false,
        error: `Unknown notification type: ${options.type}`,
      });
  }
}

/**
 * Send multiple notifications in parallel
 */
export async function sendBulkNotifications(
  notifications: NotificationOptions[],
): Promise<NotificationResult[]> {
  logger.info("Sending bulk notifications", { count: notifications.length });

  const results = await Promise.all(
    notifications.map((notification) => sendNotification(notification)),
  );

  const successCount = results.filter((r) => r.success).length;
  logger.info("Bulk notifications completed", {
    ["total"]: results.length,
    ["successful"]: successCount,
    ["failed"]: results.length - successCount,
  });

  return results;
}

/**
 * Send notification with retry logic
 */
export async function sendNotificationWithRetry(
  options: NotificationOptions,
  maxRetries = 3,
): Promise<NotificationResult> {
  let lastError: string | undefined;

  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    const result = await sendNotification(options);

    if (result.success) {
      return result;
    }

    lastError = result.error;
    logger.warn(`Notification attempt ${attempt} failed`, {
      ["recipient"]: options.recipient,
      ["error"]: lastError,
    });

    // Wait before retry (exponential backoff)
    if (attempt < maxRetries) {
      await new Promise((resolve) =>
        setTimeout(resolve, Math.pow(2, attempt) * 1000),
      );
    }
  }

  return {
    success: false,
    error: `Failed after ${maxRetries} attempts: ${lastError}`,
  };
}
