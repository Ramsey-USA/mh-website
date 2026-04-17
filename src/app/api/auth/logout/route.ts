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

async function handlePOST(request: NextRequest): Promise<NextResponse> {
  // Identify the caller (best-effort, for audit logging only)
  const ip =
    request.headers.get("CF-Connecting-IP") ??
    request.headers.get("x-forwarded-for") ??
    "unknown";

  const adminRefreshToken = request.cookies.get("mh_refresh_token")?.value;
  const fieldRefreshToken = request.cookies.get(
    "mh_field_refresh_token",
  )?.value;
  const refreshToken = adminRefreshToken ?? fieldRefreshToken;

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
    invalidResponse.cookies.set("mh_refresh_token", "", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/api/auth",
      maxAge: 0,
    });
    invalidResponse.cookies.set("mh_field_refresh_token", "", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/api/auth",
      maxAge: 0,
    });
    return invalidResponse;
  }

  logger.info("Admin logout", { ip, userId: refreshUserId });

  const response = NextResponse.json({ success: true });

  // Clear the refresh token cookie by setting maxAge to 0
  response.cookies.set("mh_refresh_token", "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/api/auth",
    maxAge: 0,
  });
  response.cookies.set("mh_field_refresh_token", "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/api/auth",
    maxAge: 0,
  });

  return response;
}

export const POST = rateLimit(rateLimitPresets.auth)(handlePOST);
