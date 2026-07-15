/**
 * Next.js Middleware
 * Enhanced middleware with Cloudflare optimization and security features
 */

import {
  NextResponse,
  type NextFetchEvent,
  type NextRequest,
} from "next/server";
import {
  getPreferredLocaleFromAcceptLanguage,
  isSupportedLocale,
  LOCALE_COOKIE_NAME,
  PATH_LOCALE_HEADER_NAME,
  SUPPORTED_LOCALES,
} from "./src/lib/i18n/locale";
import { securityMiddleware } from "./src/middleware/security";

export const runtime = "edge";

export async function middleware(request: NextRequest, event: NextFetchEvent) {
  // Apex → www redirect is handled by Cloudflare Redirect Rule "apex-to-www"
  // at the CDN edge (~10-20 ms faster than handling in Worker).
  // Rule: https://mhc-gc.com/* → https://www.mhc-gc.com/${1}

  const { localeFromPath, normalizedPath, isLocalePrefixed } =
    resolveLocalizedPath(request.nextUrl.pathname);

  // Apply security middleware
  const securityResponse = await securityMiddleware(
    request,
    normalizedPath,
    (promise) => event.waitUntil(promise),
  );

  if (securityResponse.status >= 300 && securityResponse.status < 600) {
    return securityResponse;
  }

  let response = securityResponse;

  if (isLocalePrefixed && !normalizedPath.startsWith("/api/")) {
    const rewriteUrl = request.nextUrl.clone();
    rewriteUrl.pathname = normalizedPath;
    const requestHeaders = new Headers(request.headers);
    if (localeFromPath) {
      requestHeaders.set(PATH_LOCALE_HEADER_NAME, localeFromPath);
      const rawCookie = request.headers.get("cookie") ?? "";
      const cookieWithoutLocale = rawCookie
        .split(";")
        .map((part) => part.trim())
        .filter(
          (part) =>
            part.length > 0 && !part.startsWith(`${LOCALE_COOKIE_NAME}=`),
        );
      cookieWithoutLocale.push(`${LOCALE_COOKIE_NAME}=${localeFromPath}`);
      requestHeaders.set("cookie", cookieWithoutLocale.join("; "));
    }

    response = NextResponse.rewrite(rewriteUrl, {
      request: {
        headers: requestHeaders,
      },
    });

    for (const [name, value] of securityResponse.headers.entries()) {
      if (name.toLowerCase().startsWith("x-middleware-")) {
        continue;
      }
      if (name.toLowerCase() === "set-cookie") {
        continue;
      }
      response.headers.set(name, value);
    }

    for (const cookie of securityResponse.cookies.getAll()) {
      response.cookies.set(cookie);
    }
  }

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

      if (localeFromPath) {
        response.cookies.set({
          name: LOCALE_COOKIE_NAME,
          value: localeFromPath,
          path: "/",
          maxAge: 60 * 60 * 24 * 365,
          sameSite: "lax",
        });
        return response;
      }

      const localeCookie = request.cookies.get(LOCALE_COOKIE_NAME)?.value;
      if (!localeCookie || !isSupportedLocale(localeCookie)) {
        const preferredLocale = getPreferredLocaleFromAcceptLanguage(
          request.headers.get("accept-language"),
        );

        response.cookies.set({
          name: LOCALE_COOKIE_NAME,
          value: preferredLocale,
          path: "/",
          maxAge: 60 * 60 * 24 * 365,
          sameSite: "lax",
        });
      }
    }
  }

  return response;
}

function resolveLocalizedPath(pathname: string): {
  localeFromPath: (typeof SUPPORTED_LOCALES)[number] | null;
  normalizedPath: string;
  isLocalePrefixed: boolean;
} {
  for (const locale of SUPPORTED_LOCALES) {
    const prefix = `/${locale}`;
    if (pathname === prefix) {
      return {
        localeFromPath: locale,
        normalizedPath: "/",
        isLocalePrefixed: true,
      };
    }

    if (pathname.startsWith(`${prefix}/`)) {
      return {
        localeFromPath: locale,
        normalizedPath: pathname.slice(prefix.length),
        isLocalePrefixed: true,
      };
    }
  }

  return {
    localeFromPath: null,
    normalizedPath: pathname || "/",
    isLocalePrefixed: false,
  };
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
     *   - <indexnow-key>.txt  IndexNow ownership proof file
     *
     * Static asset directories (cache headers already set in next.config.js)
     *   - fonts/              Self-hosted woff2 files
     *   - icons/              PWA icons
     *   - images/             Optimised WebP/AVIF images
     *   - videos/             Optimized media assets (range requests)
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
    "/((?!api/health|api/security/status|api/cf-|_next|favicon\\.ico|sw\\.js|manifest\\.json|robots\\.txt|sitemap\\.xml|sitemap-index\\.xml|llms\\.txt|google[a-z0-9]+\\.html|[A-Za-z0-9]{8,128}\\.txt|_headers|_redirects|fonts|icons|images|videos).*)",
  ],
};
