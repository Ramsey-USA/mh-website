/**
 * Server-side Sentry Error Tracking for Cloudflare Workers/Pages
 *
 * Uses toucan-js which is specifically designed for Cloudflare Workers runtime.
 * This handles API route errors that occur on the edge.
 *
 * Setup:
 * 1. Create a Sentry account at sentry.io
 * 2. Create a new JavaScript project
 * 3. Copy the DSN
 * 4. Add SENTRY_DSN to Cloudflare environment variables (not NEXT_PUBLIC_)
 *
 * @see https://github.com/robertcepa/toucan-js
 */

import { Toucan } from "toucan-js";
import type { NextRequest } from "next/server";

/**
 * Create a Sentry instance for the current request
 * Call this at the start of API route handlers
 */
export function createServerSentry(
  request: NextRequest,
  ctx?: { waitUntil: (promise: Promise<unknown>) => void },
): Toucan | null {
  const dsn = process.env["SENTRY_DSN"];

  if (!dsn) {
    return null;
  }

  const options: ConstructorParameters<typeof Toucan>[0] = {
    dsn,
    request: request as unknown as Request,
    environment: process.env.NODE_ENV || "production",
    release: process.env["NEXT_PUBLIC_APP_VERSION"] || "unknown",
    sampleRate: process.env.NODE_ENV === "production" ? 1.0 : 1.0,
  };

  // Only add context if provided (Cloudflare Workers execution context)
  if (ctx) {
    options.context = ctx;
  }

  const sentry = new Toucan(options);

  // Set request context
  sentry.setRequestBody(request.body ? "[Present]" : "[Empty]");

  return sentry;
}

/**
 * Capture a server-side exception
 * Use this in catch blocks of API routes
 */
export function captureServerException(
  error: Error | unknown,
  context?: {
    request?: NextRequest;
    route?: string;
    extra?: Record<string, unknown>;
  },
): void {
  const dsn = process.env["SENTRY_DSN"];

  if (!dsn) {
    // Log to console if Sentry not configured
    if (process.env.NODE_ENV === "development") {
      console.error("[Sentry Server] Would capture:", error);
    }
    return;
  }

  // Create a one-off Sentry instance for capturing
  const sentry = new Toucan({
    dsn,
    environment: process.env.NODE_ENV || "production",
    release: process.env["NEXT_PUBLIC_APP_VERSION"] || "unknown",
  });

  // Add route tag if provided
  if (context?.route) {
    sentry.setTag("route", context.route);
  }

  // Add extra context
  if (context?.extra) {
    sentry.setExtras(context.extra);
  }

  // Add request info if available
  if (context?.request) {
    sentry.setTag("method", context.request.method);
    sentry.setTag("url", context.request.nextUrl.pathname);

    // Add safe headers (excluding sensitive ones)
    const safeHeaders: Record<string, string> = {};
    const sensitiveHeaders = [
      "authorization",
      "cookie",
      "x-api-key",
      "x-auth-token",
    ];

    context.request.headers.forEach((value, key) => {
      if (!sensitiveHeaders.includes(key.toLowerCase())) {
        safeHeaders[key] = value;
      }
    });
    sentry.setExtra("headers", safeHeaders);
  }

  // Capture the exception
  if (error instanceof Error) {
    sentry.captureException(error);
  } else {
    sentry.captureMessage(String(error), "error");
  }
}

/**
 * Capture a server-side message
 */
export function captureServerMessage(
  message: string,
  level: "info" | "warning" | "error" = "info",
  extra?: Record<string, unknown>,
): void {
  const dsn = process.env["SENTRY_DSN"];

  if (!dsn) {
    return;
  }

  const sentry = new Toucan({
    dsn,
    environment: process.env.NODE_ENV || "production",
    release: process.env["NEXT_PUBLIC_APP_VERSION"] || "unknown",
  });

  if (extra) {
    sentry.setExtras(extra);
  }

  sentry.captureMessage(message, level);
}

/**
 * Higher-order function to wrap API route handlers with error tracking
 * Automatically captures exceptions and adds request context
 *
 * @example
 * export const POST = withServerSentry(async (request) => {
 *   // Your handler code
 * });
 */
export function withServerSentry<T>(
  handler: (request: NextRequest) => Promise<T>,
  routeName?: string,
): (request: NextRequest) => Promise<T> {
  return async (request: NextRequest): Promise<T> => {
    try {
      return await handler(request);
    } catch (error) {
      captureServerException(error, {
        request,
        route: routeName || request.nextUrl.pathname,
        extra: {
          method: request.method,
          url: request.url,
        },
      });

      // Re-throw so the normal error handling continues
      throw error;
    }
  };
}
