/**
 * Sentry Error Tracking Configuration
 *
 * Client-side error tracking using @sentry/browser.
 * Compatible with Cloudflare Workers runtime.
 *
 * Setup:
 * 1. Create account at sentry.io
 * 2. Create a new Browser JavaScript project
 * 3. Copy the DSN
 * 4. Add NEXT_PUBLIC_SENTRY_DSN to Cloudflare environment variables
 *
 * @see https://docs.sentry.io/platforms/javascript/
 */

import * as Sentry from "@sentry/browser";

let isInitialized = false;

/**
 * Initialize Sentry error tracking
 * Call this once in your app's entry point (layout.tsx or _app.tsx)
 */
export function initSentry(): void {
  // Only initialize once and only in browser
  if (isInitialized || typeof window === "undefined") {
    return;
  }

  const dsn = process.env["NEXT_PUBLIC_SENTRY_DSN"];

  if (!dsn) {
    // Silently skip if DSN not configured
    if (process.env.NODE_ENV === "development") {
      console.log("[Sentry] DSN not configured, skipping initialization");
    }
    return;
  }

  Sentry.init({
    dsn,

    // Environment and release tracking
    environment: process.env.NODE_ENV || "development",
    release: process.env["NEXT_PUBLIC_APP_VERSION"] || "unknown",

    // Performance monitoring (optional - adjust sample rate as needed)
    tracesSampleRate: process.env.NODE_ENV === "production" ? 0.1 : 1.0,

    // Only send errors in production, or if explicitly enabled
    enabled:
      process.env.NODE_ENV === "production" ||
      process.env["NEXT_PUBLIC_SENTRY_DEBUG"] === "true",

    // Filter out noisy errors
    ignoreErrors: [
      // Network errors that aren't actionable
      "Network request failed",
      "Failed to fetch",
      "NetworkError",
      "Load failed",
      // Browser extensions
      "ResizeObserver loop",
      // User-initiated navigation
      "AbortError",
      // Chrome extensions
      /chrome-extension/,
      /moz-extension/,
    ],

    // Don't send PII by default
    beforeSend(event) {
      // Optionally scrub sensitive data
      if (event.request?.cookies) {
        event.request.cookies = {} as Record<string, string>;
      }
      return event;
    },

    // Integrations
    integrations: [
      Sentry.browserTracingIntegration(),
      Sentry.replayIntegration({
        // Session replay settings (optional - captures user sessions on error)
        maskAllText: true,
        blockAllMedia: true,
      }),
    ],

    // Session replay sample rates
    replaysSessionSampleRate: 0, // Don't record normal sessions
    replaysOnErrorSampleRate: 1.0, // Record 100% of sessions with errors
  });

  isInitialized = true;

  if (process.env.NODE_ENV === "development") {
    console.log("[Sentry] Initialized successfully");
  }
}

/**
 * Capture an exception and send to Sentry
 */
export function captureException(
  error: Error | unknown,
  context?: Record<string, unknown>,
): void {
  if (!isInitialized) {
    return;
  }

  Sentry.captureException(error, context ? { extra: context } : undefined);
}

/**
 * Capture a message (non-error event)
 */
export function captureMessage(
  message: string,
  level: "info" | "warning" | "error" = "info",
  context?: Record<string, unknown>,
): void {
  if (!isInitialized) {
    return;
  }

  Sentry.captureMessage(message, context ? { level, extra: context } : level);
}

/**
 * Set user context for error tracking
 * Call this after user authentication
 */
export function setUser(
  user: { id: string; email?: string; name?: string } | null,
): void {
  if (!isInitialized) {
    return;
  }

  Sentry.setUser(user);
}

/**
 * Add breadcrumb for debugging
 * Breadcrumbs are a trail of events that happened before an error
 */
export function addBreadcrumb(
  category: string,
  message: string,
  data?: Record<string, unknown>,
): void {
  if (!isInitialized) {
    return;
  }

  Sentry.addBreadcrumb({
    category,
    message,
    ...(data && { data }),
    level: "info",
  });
}

// Re-export Sentry for advanced usage
export { Sentry };
