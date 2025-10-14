/**
 * Next.js Middleware
 * Main middleware file that orchestrates security, analytics, and other concerns
 */

import { NextRequest, NextResponse } from "next/server";
import { securityMiddleware } from "./src/middleware/security";

export async function middleware(request: NextRequest) {
  // Apply security middleware
  const response = await securityMiddleware(request);

  // Add any additional middleware processing here
  // (analytics, A/B testing, etc.)

  return response;
}

// Configure which paths the middleware should run on
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api/health (health checks)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - sw.js (service worker)
     * - manifest.json (PWA manifest)
     * - robots.txt (robots file)
     * - sitemap.xml (sitemap file)
     * - public files (icons, images, etc.)
     */
    "/((?!api/health|_next|favicon.ico|sw.js|manifest.json|robots.txt|sitemap.xml|icons|images|public).*)",
  ],
};
