/**
 * CSRF Protection Utilities
 *
 * Provides Cross-Site Request Forgery protection using token-based verification.
 * Implements double-submit cookie pattern.
 */

import { type NextRequest, NextResponse } from "next/server";
import { randomBytes } from "crypto";

const CSRF_TOKEN_LENGTH = 32;
const CSRF_COOKIE_NAME = "csrf-token";
const CSRF_HEADER_NAME = "x-csrf-token";
const TOKEN_EXPIRY_MS = 3600000; // 1 hour

interface CSRFTokenData {
  token: string;
  expiresAt: number;
}

// In-memory token storage (use KV/D1 in production with Cloudflare)
const tokenStore = new Map<string, CSRFTokenData>();

/**
 * Generate a secure CSRF token
 */
export function generateCSRFToken(): string {
  return randomBytes(CSRF_TOKEN_LENGTH).toString("hex");
}

/**
 * Create CSRF token and set cookie
 */
export function setCSRFToken(response: NextResponse): string {
  const token = generateCSRFToken();
  const expiresAt = Date.now() + TOKEN_EXPIRY_MS;

  // Store token with expiry
  tokenStore.set(token, { token, expiresAt });

  // Set cookie with secure options
  response.cookies.set(CSRF_COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: TOKEN_EXPIRY_MS / 1000,
    path: "/",
  });

  return token;
}

/**
 * Verify CSRF token from request
 */
export function verifyCSRFToken(request: NextRequest): boolean {
  // Get token from header
  const headerToken = request.headers.get(CSRF_HEADER_NAME);

  // Get token from cookie
  const cookieToken = request.cookies.get(CSRF_COOKIE_NAME)?.value;

  // Both must exist and match
  if (!headerToken || !cookieToken || headerToken !== cookieToken) {
    return false;
  }

  // Verify token exists in store and is not expired
  const tokenData = tokenStore.get(cookieToken);
  if (!tokenData || tokenData.expiresAt < Date.now()) {
    // Clean up expired token
    if (tokenData) {
      tokenStore.delete(cookieToken);
    }
    return false;
  }

  return true;
}

/**
 * Clean up expired tokens from store
 */
export function cleanupExpiredTokens(): void {
  const now = Date.now();
  const tokensToDelete: string[] = [];

  tokenStore.forEach((tokenData, token) => {
    if (tokenData.expiresAt < now) {
      tokensToDelete.push(token);
    }
  });

  tokensToDelete.forEach((token) => tokenStore.delete(token));
}

/**
 * Middleware to require CSRF token for state-changing requests
 */
export function requireCSRF(
  handler: (request: NextRequest, context?: unknown) => Promise<NextResponse>,
) {
  return async function csrfProtectedHandler(
    request: NextRequest,
    context?: unknown,
  ): Promise<NextResponse> {
    const method = request.method;

    // Only check CSRF for state-changing methods
    if (["POST", "PUT", "PATCH", "DELETE"].includes(method)) {
      if (!verifyCSRFToken(request)) {
        return NextResponse.json(
          {
            error: "CSRF token validation failed",
            message:
              "Invalid or missing CSRF token. Please refresh the page and try again.",
          },
          { status: 403 },
        );
      }
    }

    // Clean up expired tokens periodically (1% chance)
    if (Math.random() < 0.01) {
      cleanupExpiredTokens();
    }

    const response = await handler(request, context);

    // Set new CSRF token for GET requests if one doesn't exist
    if (method === "GET" && !request.cookies.get(CSRF_COOKIE_NAME)) {
      setCSRFToken(response);
    }

    return response;
  };
}

/**
 * Get CSRF token from request (for forms to include in their requests)
 */
export function getCSRFToken(request: NextRequest): string | null {
  return request.cookies.get(CSRF_COOKIE_NAME)?.value || null;
}

/**
 * Create a response with CSRF protection headers
 */
export function createProtectedResponse(
  data: unknown,
  options?: ResponseInit,
): NextResponse {
  const response = NextResponse.json(data, options);

  // Add security headers
  response.headers.set("X-Content-Type-Options", "nosniff");
  response.headers.set("X-Frame-Options", "DENY");
  response.headers.set("X-XSS-Protection", "1; mode=block");
  response.headers.set("Referrer-Policy", "strict-origin-when-cross-origin");

  return response;
}

/**
 * Validate request origin to prevent CSRF
 */
export function validateOrigin(request: NextRequest): boolean {
  const origin = request.headers.get("origin");
  const referer = request.headers.get("referer");

  // Allow requests with no origin/referer (like API clients)
  if (!origin && !referer) {
    return true;
  }

  // Get allowed origins from environment
  const allowedOrigins = process.env["ALLOWED_ORIGINS"]?.split(",") || [
    process.env["NEXT_PUBLIC_SITE_URL"] || "https://www.mhc-gc.com",
  ];

  // Check if origin matches allowed origins
  if (origin) {
    return allowedOrigins.some(
      (allowed) => origin === allowed || origin.startsWith(allowed),
    );
  }

  // Check if referer matches allowed origins
  if (referer) {
    return allowedOrigins.some((allowed) => referer.startsWith(allowed));
  }

  return false;
}
