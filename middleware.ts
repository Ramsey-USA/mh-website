/**
 * Next.js Middleware
 * Enhanced middleware with Cloudflare optimization and security features
 */

import { type NextRequest, NextResponse } from "next/server";
import { securityMiddleware } from "./src/middleware/security";

export async function middleware(request: NextRequest) {
  // Apex → www canonical redirect (mhc-gc.com → www.mhc-gc.com).
  // Future upgrade: replace with a Cloudflare Redirect Rule (dashboard →
  // Rules → Redirect Rules → "apex-to-www") to resolve at the CDN edge
  // before the Worker starts, saving ~10-20 ms of Worker CPU per redirect.
  const url = new URL(request.url);
  if (url.hostname === "mhc-gc.com") {
    url.hostname = "www.mhc-gc.com";
    return NextResponse.redirect(url.toString(), { status: 301 });
  }

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
     * Cloudflare Workers config files (not real HTTP paths)
     *   - _headers            Custom response headers file
     *   - _redirects          Redirect rules file
     */
    "/((?!api/health|api/cf-|_next|favicon\\.ico|sw\\.js|manifest\\.json|robots\\.txt|sitemap\\.xml|sitemap-index\\.xml|llms\\.txt|_headers|_redirects|fonts|icons|images).*)",
  ],
};
