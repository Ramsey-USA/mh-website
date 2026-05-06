/**
 * MH Construction Dashboard Middleware
 * Security middleware for the dashboard / operations-hub app.
 */

import { type NextRequest } from "next/server";
import { securityMiddleware } from "./src/middleware/security";

export function middleware(request: NextRequest) {
  return securityMiddleware(request);
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
