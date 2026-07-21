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

export async function middleware(request: NextRequest, event?: NextFetchEvent) {
  const { localeFromPath, normalizedPath, isLocalePrefixed } =
    resolveLocalizedPath(request.nextUrl.pathname);

  if (localeFromPath === "en") {
    const redirectUrl = request.nextUrl.clone();
    redirectUrl.pathname = normalizedPath;
    return NextResponse.redirect(redirectUrl, 308);
  }

  // Apply security middleware
  const securityResponse = await securityMiddleware(
    request,
    normalizedPath,
    event ? (promise) => event.waitUntil(promise) : undefined,
  );

  if (securityResponse.status >= 300 && securityResponse.status < 600) {
    return securityResponse;
  }

  let response = securityResponse;

  if (
    isLocalePrefixed &&
    localeFromPath === "es" &&
    !normalizedPath.startsWith("/api/")
  ) {
    const rewriteUrl = request.nextUrl.clone();
    rewriteUrl.pathname = normalizedPath;
    const requestHeaders = new Headers(request.headers);
    requestHeaders.set(PATH_LOCALE_HEADER_NAME, localeFromPath);
    const rawCookie = request.headers.get("cookie") ?? "";
    const cookieWithoutLocale = rawCookie
      .split(";")
      .map((part) => part.trim())
      .filter(
        (part) => part.length > 0 && !part.startsWith(`${LOCALE_COOKIE_NAME}=`),
      );
    cookieWithoutLocale.push(`${LOCALE_COOKIE_NAME}=${localeFromPath}`);
    requestHeaders.set("cookie", cookieWithoutLocale.join("; "));

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
    const pathname = request.nextUrl.pathname;

    if (pathname.startsWith("/api/")) {
      response.headers.set("CF-Cache-Tag", "api");
      if (request.method !== "GET") {
        response.headers.set("Cache-Control", "no-store");
      }
    } else {
      response.headers.set("CF-Cache-Tag", "html");

      if (localeFromPath === "es") {
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

export const config = {
  matcher: [
    "/((?!api/health|api/security/status|api/cf-|_next|favicon\\.ico|sw\\.js|manifest\\.json|robots\\.txt|sitemap\\.xml|sitemap-index\\.xml|llms\\.txt|google[a-z0-9]+\\.html|[A-Za-z0-9]{8,128}\\.txt|_headers|_redirects|fonts|icons|images|videos|.*\\..*).*)",
  ],
};
