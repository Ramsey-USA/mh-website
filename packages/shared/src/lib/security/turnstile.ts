import { logger } from "@/lib/utils/logger";

const TURNSTILE_VERIFY_URL =
  "https://challenges.cloudflare.com/turnstile/v0/siteverify";

export interface TurnstileVerificationResult {
  success: boolean;
  skipped?: boolean;
  errorCodes?: string[];
}

/**
 * Verify a Cloudflare Turnstile token.
 *
 * In non-production environments, verification is skipped when the secret is
 * not configured so local development and tests remain usable.
 */
export async function verifyTurnstileToken(
  token: string,
  remoteIp?: string,
): Promise<TurnstileVerificationResult> {
  const secret = process.env["TURNSTILE_SECRET_KEY"];

  if (!secret) {
    if (process.env.NODE_ENV === "production") {
      logger.error("TURNSTILE_SECRET_KEY is required in production");
      return { success: false, errorCodes: ["missing-input-secret"] };
    }

    logger.warn(
      "TURNSTILE_SECRET_KEY not configured; skipping Turnstile verification outside production",
    );
    return { success: true, skipped: true };
  }

  try {
    const formData = new URLSearchParams({
      secret,
      response: token,
    });

    if (remoteIp) {
      formData.set("remoteip", remoteIp);
    }

    const response = await fetch(TURNSTILE_VERIFY_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: formData.toString(),
    });

    if (!response.ok) {
      logger.error("Turnstile verification HTTP failure", {
        status: response.status,
      });
      return { success: false, errorCodes: ["verification-request-failed"] };
    }

    const payload = (await response.json()) as {
      success?: boolean;
      "error-codes"?: string[];
    };

    return {
      success: Boolean(payload.success),
      errorCodes: payload["error-codes"] ?? [],
    };
  } catch (error) {
    logger.error("Turnstile verification error", error);
    return { success: false, errorCodes: ["verification-exception"] };
  }
}
