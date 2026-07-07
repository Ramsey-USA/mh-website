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
let initPromise: Promise<void> | null = null;

function parseRate(rawValue: string | undefined, fallback: number): number {
  if (!rawValue) {
    return fallback;
  }

  const parsed = Number(rawValue);
  if (!Number.isFinite(parsed)) {
    return fallback;
  }

  return Math.min(1, Math.max(0, parsed));
}

function parseBoolean(
  rawValue: string | undefined,
  fallback: boolean,
): boolean {
  if (!rawValue) {
    return fallback;
  }

  return ["1", "true", "yes", "on"].includes(rawValue.toLowerCase());
}

function resolveReleaseVersion(): string {
  const explicitVersion = process.env["NEXT_PUBLIC_APP_VERSION"];
  if (explicitVersion) {
    return explicitVersion;
  }

  const commitSha = process.env["VERCEL_GIT_COMMIT_SHA"];
  if (commitSha) {
    return commitSha.slice(0, 12);
  }

  return "unknown";
}

/**
 * Initialize Sentry for client-side error tracking
 * Call this once in your app initialization
 */
export async function initSentry(): Promise<void> {
  const configuredDsn = process.env["NEXT_PUBLIC_SENTRY_DSN"];
  if (!configuredDsn) {
    return;
  }

  const isProduction = process.env.NODE_ENV === "production";
  const tracesSampleRate = parseRate(
    process.env["NEXT_PUBLIC_SENTRY_TRACES_SAMPLE_RATE"],
    isProduction ? 0.1 : 1,
  );
  const replaySessionSampleRate = parseRate(
    process.env["NEXT_PUBLIC_SENTRY_REPLAY_SESSION_SAMPLE_RATE"],
    isProduction ? 0.02 : 0,
  );
  const replayOnErrorSampleRate = parseRate(
    process.env["NEXT_PUBLIC_SENTRY_REPLAY_ON_ERROR_SAMPLE_RATE"],
    isProduction ? 1 : 1,
  );
  const sendDefaultPii = parseBoolean(
    process.env["NEXT_PUBLIC_SENTRY_SEND_DEFAULT_PII"],
    false,
  );

  if (isInitialized) {
    return;
  }

  if (initPromise) {
    return initPromise;
  }

  initPromise = (async () => {
    try {
      _sentry = await import("@sentry/browser");

      const runtimeFlags = globalThis as typeof globalThis & {
        __MHC_SENTRY_CLIENT_INITIALIZED__?: boolean;
        __MHC_SENTRY_REPLAY_INITIALIZED__?: boolean;
      };

      if (runtimeFlags.__MHC_SENTRY_CLIENT_INITIALIZED__) {
        isInitialized = true;
        return;
      }

      if (_sentry.getClient()) {
        isInitialized = true;
        runtimeFlags.__MHC_SENTRY_CLIENT_INITIALIZED__ = true;
        return;
      }

      let tracingIntegration: ReturnType<
        SentryModule["browserTracingIntegration"]
      > | null = null;

      try {
        tracingIntegration = _sentry.browserTracingIntegration();
      } catch {
        // Keep app behavior stable if tracing integration cannot be initialized.
      }

      const integrations = [tracingIntegration].filter(
        (integration): integration is NonNullable<typeof integration> =>
          integration !== null,
      );

      _sentry.init({
        dsn: configuredDsn,
        environment: process.env.NODE_ENV || "production",
        release: resolveReleaseVersion(),

        // Send default PII data (e.g., automatic IP address collection)
        sendDefaultPii,

        // Adjust sample rate based on environment
        tracesSampleRate,

        // Capture unhandled promise rejections
        integrations,

        // Keep low baseline replay volume while preserving error diagnostics.
        replaysSessionSampleRate: replaySessionSampleRate,
        replaysOnErrorSampleRate: replayOnErrorSampleRate,

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
      runtimeFlags.__MHC_SENTRY_CLIENT_INITIALIZED__ = true;
    } catch {
      _sentry = null;
    } finally {
      initPromise = null;
    }
  })();

  return initPromise;
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
