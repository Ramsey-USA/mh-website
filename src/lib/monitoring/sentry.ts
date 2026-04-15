/**
 * Client-side Sentry Error Tracking for Browser
 *
 * Uses @sentry/browser for client-side error tracking.
 * This tracks JavaScript errors that occur in the user's browser.
 *
 * Setup:
 * 1. Create a Sentry account at sentry.io
 * 2. Create a new Browser JavaScript project
 * 3. Copy the DSN
 * 4. Add NEXT_PUBLIC_SENTRY_DSN to Cloudflare environment variables
 *
 * @see https://docs.sentry.io/platforms/javascript/
 */

import * as Sentry from "@sentry/browser";

let isInitialized = false;

/**
 * Initialize Sentry for client-side error tracking
 * Call this once in your app initialization
 */
export function initSentry(): void {
  if (isInitialized) {
    return;
  }

  const dsn = process.env["NEXT_PUBLIC_SENTRY_DSN"];

  if (!dsn) {
    if (process.env.NODE_ENV === "development") {
      console.info("[Sentry] No DSN configured - error tracking disabled");
    }
    return;
  }

  Sentry.init({
    dsn,
    environment: process.env.NODE_ENV || "production",
    release: process.env["NEXT_PUBLIC_APP_VERSION"] || "unknown",

    // Send default PII data (e.g., automatic IP address collection)
    sendDefaultPii: true,

    // Adjust sample rate based on environment
    tracesSampleRate: process.env.NODE_ENV === "production" ? 0.1 : 1.0,

    // Capture unhandled promise rejections
    integrations: [
      Sentry.browserTracingIntegration(),
      Sentry.replayIntegration({
        maskAllText: true,
        blockAllMedia: true,
      }),
    ],

    // Session replay sample rate
    replaysSessionSampleRate: 0.1,
    replaysOnErrorSampleRate: 1.0,

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
 */
export function captureException(
  error: Error | unknown,
  context?: Record<string, unknown>,
): void {
  if (context) {
    Sentry.withScope((scope) => {
      scope.setExtras(context);
      Sentry.captureException(error);
    });
  } else {
    Sentry.captureException(error);
  }
}

/**
 * Capture a message and send to Sentry
 */
export function captureMessage(
  message: string,
  level: Sentry.SeverityLevel = "info",
  context?: Record<string, unknown>,
): void {
  if (context) {
    Sentry.withScope((scope) => {
      scope.setExtras(context);
      Sentry.captureMessage(message, level);
    });
  } else {
    Sentry.captureMessage(message, level);
  }
}

/**
 * Set user context for error tracking
 */
export function setUser(
  user: { id?: string; email?: string; username?: string } | null,
): void {
  Sentry.setUser(user);
}

/**
 * Add a breadcrumb for debugging
 */
export function addBreadcrumb(breadcrumb: {
  category?: string;
  message: string;
  level?: Sentry.SeverityLevel;
  data?: Record<string, unknown>;
}): void {
  Sentry.addBreadcrumb({
    ...(breadcrumb.category && { category: breadcrumb.category }),
    message: breadcrumb.message,
    level: breadcrumb.level || "info",
    ...(breadcrumb.data && { data: breadcrumb.data }),
  });
}

// Re-export Sentry for advanced usage
export { Sentry };
