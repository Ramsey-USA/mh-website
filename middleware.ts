/**
 * Next.js Middleware
 * Enhanced middleware with Cloudflare optimization and security features
 */

import { type NextRequest } from "next/server";
import { securityMiddleware } from "./src/middleware/security";

export async function middleware(request: NextRequest) {
  // Apex → www redirect is handled by Cloudflare Redirect Rule "apex-to-www"
  // at the CDN edge (~10-20 ms faster than handling in Worker).
  // Rule: https://mhc-gc.com/* → https://www.mhc-gc.com/${1}

  // Apply security middleware
  const response = await securityMiddleware(request);

  // Add Cloudflare-specific optimizations
  if (response) {
    // Keep response tagging lightweight; cache policy ownership lives in
    // route handlers and next.config.js headers.
    const pathname = request.nextUrl.pathname;

    if (pathname.startsWith("/api/")) {
      response.headers.set("CF-Cache-Tag", "api");
      // Mutation requests must never be stored in any cache (browser or CDN)
      // to prevent contact submissions, auth tokens, and form payloads from
      // being replayed. GET routes define their own cache semantics.
      if (request.method !== "GET") {
        response.headers.set("Cache-Control", "no-store");
      }
    } else {
      response.headers.set("CF-Cache-Tag", "html");
    }
  }

  return response;
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
     *   - google*.html        Google Search Console verification files
     *
     * Static asset directories (cache headers already set in next.config.js)
     *   - fonts/              Self-hosted woff2 files
     *   - icons/              PWA icons
     *   - images/             Optimised WebP/AVIF images
     *
     * Cloudflare-native / internal endpoints
     *   - api/health          Service health check — skip auth & rate-limit overhead
     *   - api/security/status Security status probe — skip auth & rate-limit overhead
     *   - api/cf-*            Cloudflare-managed API endpoints
     *
     * Cloudflare Workers config files (not real HTTP paths)
     *   - _headers            Custom response headers file
     *   - _redirects          Redirect rules file
     */
    "/((?!api/health|api/security/status|api/cf-|_next|favicon\\.ico|sw\\.js|manifest\\.json|robots\\.txt|sitemap\\.xml|sitemap-index\\.xml|llms\\.txt|google[a-z0-9]+\\.html|_headers|_redirects|fonts|icons|images).*)",
  ],
};
