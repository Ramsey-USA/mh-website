/**
 * Logout API
 *
 * Clears the httpOnly refresh token cookie, effectively ending the session.
 * Clients should also discard the in-memory access token on their side.
 */

import { type NextRequest, NextResponse } from "next/server";
import { logger } from "@/lib/utils/logger";
import { verifyRefreshToken } from "@/lib/auth/jwt";
import { rateLimit, rateLimitPresets } from "@/lib/security/rate-limiter";

export const dynamic = "force-dynamic";

const REFRESH_COOKIE_NAMES = [
  "mh_refresh_token",
  "mh_field_refresh_token",
  "mh_worker_refresh_token",
  "mh_traveler_refresh_token",
] as const;

function resolveRefreshToken(request: NextRequest): string | null {
  for (const cookieName of REFRESH_COOKIE_NAMES) {
    const token = request.cookies.get(cookieName)?.value;
    if (token) {
      return token;
    }
  }

  return null;
}

function clearRefreshCookies(response: NextResponse) {
  for (const cookieName of REFRESH_COOKIE_NAMES) {
    response.cookies.set(cookieName, "", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/api/auth",
      maxAge: 0,
    });
  }
}

async function handlePOST(request: NextRequest): Promise<NextResponse> {
  // Identify the caller (best-effort, for audit logging only)
  const ip =
    request.headers.get("CF-Connecting-IP") ??
    request.headers.get("x-forwarded-for") ??
    "unknown";

  const refreshToken = resolveRefreshToken(request);

  if (!refreshToken) {
    logger.warn("Logout requested without refresh token", { ip });
    return NextResponse.json(
      { error: "Authentication required" },
      { status: 401 },
    );
  }

  const refreshUserId = await verifyRefreshToken(refreshToken);
  if (!refreshUserId) {
    logger.warn("Logout requested with invalid refresh token", { ip });
    const invalidResponse = NextResponse.json(
      { error: "Authentication required" },
      { status: 401 },
    );
    clearRefreshCookies(invalidResponse);
    return invalidResponse;
  }

  logger.info("User logout", { ip, userId: refreshUserId });

  const response = NextResponse.json({ success: true });

  // Clear all refresh token cookies by setting maxAge to 0
  clearRefreshCookies(response);

  return response;
}

export const POST = rateLimit(rateLimitPresets.auth)(handlePOST);
