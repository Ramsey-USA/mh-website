export const runtime = "edge";

/**
 * Logout API
 *
 * Clears the httpOnly refresh token cookie, effectively ending the session.
 * Clients should also discard the in-memory access token on their side.
 */

import { type NextRequest, NextResponse } from "next/server";
import { logger } from "@/lib/utils/logger";

export const dynamic = "force-dynamic";

export function POST(request: NextRequest): NextResponse {
  // Identify the caller (best-effort, for audit logging only)
  const ip =
    request.headers.get("CF-Connecting-IP") ??
    request.headers.get("x-forwarded-for") ??
    "unknown";

  logger.info("Admin logout", { ip });

  const response = NextResponse.json({ success: true });

  // Clear the refresh token cookie by setting maxAge to 0
  response.cookies.set("mh_refresh_token", "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/api/auth",
    maxAge: 0,
  });

  return response;
}
