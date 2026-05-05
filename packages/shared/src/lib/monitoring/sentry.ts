/**
 * Client-side Sentry Error Tracking for Browser
 *
 * Uses @sentry/browser for client-side error tracking.
 * This tracks JavaScript errors that occur in the user's browser.
 *
 * The SDK is dynamically imported inside initSentry() so it is code-split
 * out of the initial JS bundle — shaving ~60 KB from the first-load payload.
 *
 * Setup:
 * 1. Create a Sentry account at sentry.io
 * 2. Create a new Browser JavaScript project
 * 3. Copy the DSN
 * 4. Add NEXT_PUBLIC_SENTRY_DSN to Cloudflare environment variables
 *
 * @see https://docs.sentry.io/platforms/javascript/
 */

import type { SeverityLevel } from "@sentry/browser";

// eslint-disable-next-line @typescript-eslint/consistent-type-imports
type SentryModule = typeof import("@sentry/browser");

let isInitialized = false;
let _sentry: SentryModule | null = null;

const FALLBACK_SENTRY_DSN =
  "https://4bcf174e0a1db00489a4d0cde0b290de@o4511220420050944.ingest.us.sentry.io/4511220427980800";

/**
 * Initialize Sentry for client-side error tracking
 * Call this once in your app initialization
 */
export async function initSentry(): Promise<void> {
  if (isInitialized) {
    return;
  }

  _sentry = await import("@sentry/browser");

  const dsn = process.env["NEXT_PUBLIC_SENTRY_DSN"] || FALLBACK_SENTRY_DSN;

  _sentry.init({
    dsn,
    environment: process.env.NODE_ENV || "production",
    release: process.env["NEXT_PUBLIC_APP_VERSION"] || "unknown",

    // Send default PII data (e.g., automatic IP address collection)
    sendDefaultPii: true,

    // Adjust sample rate based on environment
    tracesSampleRate: process.env.NODE_ENV === "production" ? 0.1 : 1,

    // Capture unhandled promise rejections
    integrations: [
      _sentry.browserTracingIntegration(),
      _sentry.replayIntegration({
        maskAllText: true,
        blockAllMedia: true,
      }),
    ],

    // Session replay sample rate
    replaysSessionSampleRate: 0.1,
    replaysOnErrorSampleRate: 1,

    // Don't send errors in development unless explicitly enabled
    enabled:
      process.env.NODE_ENV === "production" ||
      Boolean(process.env["NEXT_PUBLIC_SENTRY_DEBUG"]),

    // Filter out noisy errors
    beforeSend(event) {
      // Ignore ResizeObserver errors (common and usually harmless)
      if (event.exception?.values?.[0]?.value?.includes("ResizeObserver")) {
        return null;
      }
      return event;
    },
  });

  isInitialized = true;
}

/**
 * Capture an exception and send to Sentry
 * No-op if the SDK has not been initialized yet.
 */
export function captureException(
  error: unknown,
  context?: Record<string, unknown>,
): void {
  if (!_sentry) return;
  const sentry = _sentry;
  if (context) {
    sentry.withScope((scope) => {
      scope.setExtras(context as Record<string, unknown>);
      sentry.captureException(error);
    });
  } else {
    sentry.captureException(error);
  }
}

/**
 * Capture a message and send to Sentry
 * No-op if the SDK has not been initialized yet.
 */
export function captureMessage(
  message: string,
  level: SeverityLevel = "info",
  context?: Record<string, unknown>,
): void {
  if (!_sentry) return;
  const sentry = _sentry;
  if (context) {
    sentry.withScope((scope) => {
      scope.setExtras(context as Record<string, unknown>);
      sentry.captureMessage(message, level);
    });
  } else {
    sentry.captureMessage(message, level);
  }
}

/**
 * Set user context for error tracking
 * No-op if the SDK has not been initialized yet.
 */
export function setUser(
  user: { id?: string; email?: string; username?: string } | null,
): void {
  _sentry?.setUser(user);
}

/**
 * Add a breadcrumb for debugging
 * No-op if the SDK has not been initialized yet.
 */
export function addBreadcrumb(breadcrumb: {
  category?: string;
  message: string;
  level?: SeverityLevel;
  data?: Record<string, unknown>;
}): void {
  if (!_sentry) return;
  _sentry.addBreadcrumb({
    ...(breadcrumb.category && { category: breadcrumb.category }),
    message: breadcrumb.message,
    level: breadcrumb.level || "info",
    ...(breadcrumb.data && { data: breadcrumb.data }),
  });
}
