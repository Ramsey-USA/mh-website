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
      // Mutation requests must never be stored in any cache (browser or CDN)
      // to prevent contact submissions, auth tokens, and form payloads from
      // being replayed. Read-only GETs are scoped to private revalidation only.
      if (request.method !== "GET") {
        response.headers.set("Cache-Control", "no-store");
      } else {
        // Private: CDN must not share this response between users.
        // must-revalidate: stale copies are never served without re-checking.
        response.headers.set(
          "Cache-Control",
          "private, max-age=0, must-revalidate",
        );
      }
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

    // NOTE: Link: rel=preload headers for critical assets (Material Icons font
    // and hero background image) are handled by <link rel="preload"> tags in
    // src/app/layout.tsx, which is the correct scope for document-level preloads.
    // Middleware-level Link headers were removed: they referenced non-existent
    // paths (/images/logo.webp, /styles/critical.css) causing wasted fetch
    // requests on every page load. The asset-integrity.test.ts guard enforces
    // that any future middleware preloads point to real files in /public.

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
     * Match all request paths EXCEPT:
     *
     * Static framework assets
     *   - _next/              Next.js static chunks and image optimiser
     *
     * Browser / PWA entry points (served verbatim, no extra middleware needed)
     *   - favicon.ico
     *   - sw.js               Service worker (requires exact same-origin headers)
     *   - manifest.json       PWA manifest
     *
     * SEO / crawler discovery files (static, must not be modified in-flight)
     *   - robots.txt
     *   - sitemap.xml
     *   - sitemap-index.xml   Root sitemap index (public/sitemap-index.xml)
     *   - llms.txt            LLM discovery file (public/llms.txt)
     *
     * Static asset directories (cache headers already set in next.config.js)
     *   - fonts/              Self-hosted woff2 files
     *   - icons/              PWA icons
     *   - images/             Optimised WebP/AVIF images
     *
     * Cloudflare-native / internal health endpoints
     *   - api/health          Uptime-probe — skip auth & rate-limit overhead
     *   - api/cf-*            Cloudflare-managed API endpoints
     *
     * Cloudflare Pages config files (not real HTTP paths)
     *   - _headers            Custom response headers file
     *   - _redirects          Redirect rules file
     */
    "/((?!api/health|api/cf-|_next|favicon\\.ico|sw\\.js|manifest\\.json|robots\\.txt|sitemap\\.xml|sitemap-index\\.xml|llms\\.txt|_headers|_redirects|fonts|icons|images).*)",
  ],
};
