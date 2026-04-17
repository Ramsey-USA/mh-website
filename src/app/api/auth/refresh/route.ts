/**
 * Token Refresh API
 *
 * Issues a new short-lived access token from a valid httpOnly refresh token
 * cookie set by /api/auth/admin-login.
 */

import { type NextRequest, NextResponse } from "next/server";
import {
  refreshAccessToken,
  verifyRefreshToken,
  type JWTUser,
} from "@/lib/auth/jwt";
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
  "admin-arnold": {
    uid: "admin-arnold",
    email: "arnold@mhc-gc.com",
    role: "admin",
    name: "Arnold",
  },
  "admin-brittney": {
    uid: "admin-brittney",
    email: "brittney@mhc-gc.com",
    role: "admin",
    name: "Brittney",
  },
};

function resolveFieldUser(userId: string): JWTUser | null {
  if (!userId.startsWith("field-")) {
    return null;
  }

  const raw = userId.slice("field-".length);
  const normalized = raw.replace(/-/g, " ").trim();
  const name = normalized
    ? normalized.replace(/\b\w/g, (char) => char.toUpperCase())
    : "Superintendent";

  return {
    uid: userId,
    role: "superintendent",
    name,
  };
}

function resolveRefreshCookie(request: NextRequest): {
  token: string | null;
  cookieName: "mh_refresh_token" | "mh_field_refresh_token" | null;
} {
  const adminToken = request.cookies.get("mh_refresh_token")?.value ?? null;
  if (adminToken) {
    return { token: adminToken, cookieName: "mh_refresh_token" };
  }

  const fieldToken =
    request.cookies.get("mh_field_refresh_token")?.value ?? null;
  if (fieldToken) {
    return { token: fieldToken, cookieName: "mh_field_refresh_token" };
  }

  return { token: null, cookieName: null };
}

async function handleRefresh(request: NextRequest): Promise<NextResponse> {
  const { token: refreshToken, cookieName } = resolveRefreshCookie(request);

  if (!refreshToken) {
    return NextResponse.json(
      { error: "No refresh token provided" },
      { status: 401 },
    );
  }

  const userId = await verifyRefreshToken(refreshToken);
  if (!userId) {
    const res = NextResponse.json(
      { error: "Refresh token invalid or expired" },
      { status: 401 },
    );
    if (cookieName) {
      res.cookies.delete(cookieName);
    }
    return res;
  }

  const resolvedUser = ADMIN_USERS[userId] ?? resolveFieldUser(userId);
  if (!resolvedUser) {
    const res = NextResponse.json(
      { error: "Refresh token invalid or expired" },
      { status: 401 },
    );
    if (cookieName) {
      res.cookies.delete(cookieName);
    }
    return res;
  }

  const newAccessToken = await refreshAccessToken(
    refreshToken,
    (userId: string) =>
      Promise.resolve(ADMIN_USERS[userId] ?? resolveFieldUser(userId)),
  );

  if (!newAccessToken) {
    // Refresh token expired or invalid — clear the stale cookie
    const res = NextResponse.json(
      { error: "Refresh token invalid or expired" },
      { status: 401 },
    );
    if (cookieName) {
      res.cookies.delete(cookieName);
    }
    return res;
  }

  logger.info("Access token refreshed successfully", { cookieName });

  return NextResponse.json({
    success: true,
    accessToken: newAccessToken,
    user: {
      uid: resolvedUser.uid,
      role: resolvedUser.role,
      name: resolvedUser.name,
      email: resolvedUser.email,
    },
    expiresIn: 900, // 15 minutes
  });
}

export const POST = rateLimit(rateLimitPresets.api)(handleRefresh);
