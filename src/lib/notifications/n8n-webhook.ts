/**
 * n8n Webhook Integration
 *
 * Sends form submission notifications to n8n for processing
 * n8n then routes and sends emails via Resend SMTP
 */

import { logger } from "@/lib/utils/logger";

export type FormType =
  | "contact"
  | "consultation"
  | "newsletter"
  | "job-application"
  | "safety-form"
  | "testimonial-publish";

export interface N8nWebhookPayload {
  type: FormType;
  data: Record<string, unknown>;
  submittedAt?: string;
}

export interface N8nWebhookResult {
  success: boolean;
  error?: string;
}

/**
 * Send form submission to n8n webhook for email notification
 *
 * @param payload - Form type and data to send
 * @returns Result indicating success or failure
 */
export async function sendToN8n(
  payload: N8nWebhookPayload,
): Promise<N8nWebhookResult> {
  const webhookUrl = process.env["N8N_WEBHOOK_URL"];

  if (!webhookUrl) {
    logger.warn("N8N_WEBHOOK_URL not configured, skipping n8n notification");
    return {
      success: false,
      error: "n8n webhook not configured",
    };
  }

  try {
    const response = await fetch(webhookUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        type: payload.type,
        data: {
          ...payload.data,
          submittedAt: payload.submittedAt || new Date().toISOString(),
        },
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      logger.error("n8n webhook failed", {
        status: response.status,
        error: errorText,
        type: payload.type,
      });
      return {
        success: false,
        error: `n8n webhook failed: ${response.status}`,
      };
    }

    logger.info("n8n webhook sent successfully", {
      type: payload.type,
    });

    return { success: true };
  } catch (error) {
    logger.error("n8n webhook error", {
      error,
      type: payload.type,
    });
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
}

/**
 * Send to n8n with retry logic (fire-and-forget with best effort)
 * Does not throw - logs errors and continues
 */
export function sendToN8nAsync(payload: N8nWebhookPayload): void {
  // Fire and forget - don't await in the main flow
  sendToN8n(payload).catch((error) => {
    logger.error("n8n async notification failed", {
      error,
      type: payload.type,
    });
  });
}
