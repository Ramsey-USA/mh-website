/**
 * MH Construction Dashboard Middleware
 * Security middleware for the dashboard / operations-hub app.
 */

import { NextResponse, type NextRequest } from "next/server";
import { verifyRefreshToken } from "@/lib/auth/jwt";
import { securityMiddleware } from "./src/middleware/security";

const ADMIN_ONLY_PREFIXES = [
  "/dashboard",
  "/api/analytics",
  "/api/leads",
  "/api/drivers",
  "/api/safety/access-log",
];

function requiresAdmin(pathname: string): boolean {
  return ADMIN_ONLY_PREFIXES.some((prefix) => pathname.startsWith(prefix));
}

async function enforceAdminRole(
  request: NextRequest,
): Promise<Response | null> {
  const pathname = request.nextUrl.pathname;
  if (!requiresAdmin(pathname)) {
    return null;
  }

  const refreshToken = request.cookies.get("mh_refresh_token")?.value;
  if (!refreshToken) {
    if (pathname.startsWith("/api/")) {
      return NextResponse.json(
        { error: "Admin authentication required" },
        { status: 401 },
      );
    }
    return NextResponse.redirect(new URL("/", request.url));
  }

  const userId = await verifyRefreshToken(refreshToken);
  if (!userId || !userId.startsWith("admin-")) {
    if (pathname.startsWith("/api/")) {
      return NextResponse.json(
        { error: "Insufficient permissions" },
        { status: 403 },
      );
    }
    return NextResponse.redirect(new URL("/", request.url));
  }

  return null;
}

export async function middleware(request: NextRequest) {
  const authResponse = await enforceAdminRole(request);
  if (authResponse) {
    return authResponse;
  }

  return securityMiddleware(request);
}

export const config = {
  matcher: [
    String.raw`/((?!_next/static|_next/image|favicon.ico|.*\.(?:svg|png|jpg|jpeg|gif|webp)$).*)`,
  ],
};
