/**
 * Next.js Middleware
 * Enhanced middleware with Cloudflare optimization and security features
 */

import { type NextRequest } from "next/server";
import { securityMiddleware } from "./src/middleware/security";

export async function middleware(request: NextRequest) {
  // Get Cloudflare headers for enhanced processing
  const cfConnectingIP = request.headers.get("cf-connecting-ip");
  const cfCountry = request.headers.get("cf-ipcountry");

  // Apply security middleware
  const response = await securityMiddleware(request);

  // Add Cloudflare-specific optimizations
  if (response) {
    // Add cache tags for better Cloudflare cache management
    const url = new URL(request.url);

    if (url.pathname.startsWith("/api/")) {
      response.headers.set("CF-Cache-Tag", "api");
      // Enable stale-while-revalidate for API routes
      response.headers.set(
        "Cache-Control",
        "public, max-age=300, stale-while-revalidate=600",
      );
    } else if (
      url.pathname.match(/\.(js|css|png|jpg|jpeg|gif|webp|svg|ico|woff|woff2)$/)
    ) {
      response.headers.set("CF-Cache-Tag", "static");
      response.headers.set(
        "Cache-Control",
        "public, max-age=31536000, immutable",
      );
    } else {
      response.headers.set("CF-Cache-Tag", "html");
    }

    // Add performance hints for Cloudflare
    response.headers.set("Accept-CH", "Viewport-Width, Width, Device-Memory");

    // Add security headers optimized for Cloudflare
    response.headers.set("X-Real-IP", cfConnectingIP || "unknown");
    response.headers.set("X-Forwarded-Country", cfCountry || "unknown");

    // Enable early hints for better performance
    if (url.pathname === "/") {
      response.headers.set(
        "Link",
        "</images/logo.webp>; rel=preload; as=image, </styles/critical.css>; rel=preload; as=style",
      );
    }

    // Add CSP nonce for better security
    const nonce = generateNonce();
    response.headers.set("X-CSP-Nonce", nonce);
  }

  return response;
}

// Generate a random nonce for CSP (Edge Runtime compatible)
function generateNonce(): string {
  const array = crypto.getRandomValues(new Uint8Array(16));
  // Convert to base64 without Buffer (Edge Runtime compatible)
  let binary = "";
  for (let i = 0; i < array.length; i++) {
    const byte = array[i];
    if (byte !== undefined) {
      binary += String.fromCharCode(byte);
    }
  }
  return btoa(binary);
}

// Configure which paths the middleware should run on
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api/health (health checks)
     * - api/cf-* (Cloudflare specific endpoints)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - sw.js (service worker)
     * - manifest.json (PWA manifest)
     * - robots.txt (robots file)
     * - sitemap.xml (sitemap file)
     * - public files (icons, images, etc.)
     */
    "/((?!api/health|api/cf-|_next|favicon.ico|sw.js|manifest.json|robots.txt|sitemap.xml|icons|images|public).*)",
  ],
};
