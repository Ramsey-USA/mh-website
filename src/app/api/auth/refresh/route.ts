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
  const normalized = raw.split("-").join(" ").trim();
  const name = normalized
    ? normalized
        .split(" ")
        .filter(Boolean)
        .map((segment) => segment[0]?.toUpperCase() + segment.slice(1))
        .join(" ")
    : "Superintendent";

  return {
    uid: userId,
    role: "superintendent",
    name,
  };
}

function resolveHubUser(userId: string): JWTUser | null {
  if (userId.startsWith("worker-")) {
    return {
      uid: userId,
      role: "worker",
      name: "Field Worker",
    };
  }

  if (userId.startsWith("traveler-")) {
    return {
      uid: userId,
      role: "traveler",
      name: "Travelers Insurance",
    };
  }

  return null;
}

function resolveUserById(userId: string): JWTUser | null {
  return (
    ADMIN_USERS[userId] ?? resolveFieldUser(userId) ?? resolveHubUser(userId)
  );
}

function resolveRefreshCookie(request: NextRequest): {
  token: string | null;
  cookieName:
    | "mh_refresh_token"
    | "mh_field_refresh_token"
    | "mh_worker_refresh_token"
    | "mh_traveler_refresh_token"
    | null;
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

  const workerToken =
    request.cookies.get("mh_worker_refresh_token")?.value ?? null;
  if (workerToken) {
    return { token: workerToken, cookieName: "mh_worker_refresh_token" };
  }

  const travelerToken =
    request.cookies.get("mh_traveler_refresh_token")?.value ?? null;
  if (travelerToken) {
    return { token: travelerToken, cookieName: "mh_traveler_refresh_token" };
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

  const resolvedUser = resolveUserById(userId);
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
    (userId: string) => Promise.resolve(resolveUserById(userId)),
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
