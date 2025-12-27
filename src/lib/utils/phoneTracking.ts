/**
 * Phone Call Tracking Utility
 * Tracks phone number clicks and sends notifications to matt@mhc-gc.com
 */

import { logger } from "./logger";
import { COMPANY_INFO } from "@/lib/constants/company";

interface PhoneTrackingData {
  source: string; // Where the click originated (e.g., "header", "footer", "urgent-page")
  phoneNumber: string;
  timestamp: string;
  userAgent?: string | undefined;
  referrer?: string | undefined;
  page?: string | undefined;
}

/**
 * Track phone call click and send notification
 */
export async function trackPhoneCall(
  source: string,
  additionalData?: Record<string, unknown>,
): Promise<void> {
  try {
    const trackingData: PhoneTrackingData = {
      source,
      phoneNumber: COMPANY_INFO.phone.display,
      timestamp: new Date().toISOString(),
      userAgent:
        typeof navigator !== "undefined" ? navigator.userAgent : undefined,
      referrer: typeof document !== "undefined" ? document.referrer : undefined,
      page: typeof window !== "undefined" ? window.location.href : undefined,
    };

    // Send tracking data to API endpoint
    const response = await fetch("/api/track-phone-call", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...trackingData,
        ...additionalData,
      }),
    });

    if (!response.ok) {
      logger.warn("Failed to track phone call:", await response.text());
    }
  } catch (error) {
    logger.error("Error tracking phone call:", error);
    // Don't throw - we don't want to block the actual phone call
  }
}

/**
 * Create a tracked phone link handler
 * Usage: <a href="tel:+15093086489" onClick={(e) => handlePhoneClick(e, 'header')}>
 */
export function handlePhoneClick(
  _event: React.MouseEvent<HTMLAnchorElement>,
  source: string,
): void {
  // Track the call asynchronously
  trackPhoneCall(source).catch((error) => {
    logger.error("Failed to track phone call:", error);
  });

  // Let the default action (tel: link) proceed
}

/**
 * Create a tracked phone link with automatic tracking
 * Usage: const phoneLink = createTrackedPhoneLink('header');
 */
export function createTrackedPhoneLink(source: string) {
  return (_event: React.MouseEvent<HTMLAnchorElement>) => {
    trackPhoneCall(source).catch((error) => {
      logger.error("Failed to track phone call:", error);
    });
  };
}
