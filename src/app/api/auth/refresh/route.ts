export const runtime = "edge";

/**
 * Token Refresh API
 *
 * Issues a new short-lived access token from a valid httpOnly refresh token
 * cookie set by /api/auth/admin-login.
 */

import { type NextRequest, NextResponse } from "next/server";
import { refreshAccessToken, type JWTUser } from "@/lib/auth/jwt";
import { rateLimit, rateLimitPresets } from "@/lib/security/rate-limiter";
import { logger } from "@/lib/utils/logger";

export const dynamic = "force-dynamic";

// Static admin user map — avoids a DB round-trip since admins are pre-configured.
const ADMIN_USERS: Record<string, JWTUser> = {
  "admin-matt": {
    uid: "admin-matt",
    email: "matt@mhc-gc.com",
    role: "admin",
    name: "Matt",
  },
  "admin-jeremy": {
    uid: "admin-jeremy",
    email: "jeremy@mhc-gc.com",
    role: "admin",
    name: "Jeremy",
  },
};

async function handleRefresh(request: NextRequest): Promise<NextResponse> {
  const refreshToken = request.cookies.get("mh_refresh_token")?.value;

  if (!refreshToken) {
    return NextResponse.json(
      { error: "No refresh token provided" },
      { status: 401 },
    );
  }

  const newAccessToken = await refreshAccessToken(
    refreshToken,
    (userId: string) => Promise.resolve(ADMIN_USERS[userId] ?? null),
  );

  if (!newAccessToken) {
    // Refresh token expired or invalid — clear the stale cookie
    const res = NextResponse.json(
      { error: "Refresh token invalid or expired" },
      { status: 401 },
    );
    res.cookies.delete("mh_refresh_token");
    return res;
  }

  logger.info("Access token refreshed successfully");

  return NextResponse.json({
    success: true,
    accessToken: newAccessToken,
    expiresIn: 900, // 15 minutes
  });
}

export const POST = rateLimit(rateLimitPresets.api)(handleRefresh);
