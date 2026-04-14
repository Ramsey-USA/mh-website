/**
 * Security Middleware for Next.js
 * Integrates security manager with Next.js application
 */

import { NextRequest, NextResponse } from "next/server";
import { securityManager } from "@/lib/security/security-manager";
import { auditLogger, AuditEventType } from "@/lib/security/audit-logger";
import { verifyToken, extractTokenFromHeader } from "@/lib/auth/jwt";

// Configuration for different routes.
// requireAdmin: true  — request must carry a valid JWT with role "admin"
// logAll: true        — every request to the path is written to the audit log
const ROUTE_SECURITY_CONFIG: Record<
  string,
  { logAll: boolean; requireAdmin?: boolean }
> = {
  // Admin areas require a valid admin JWT
  "/admin": {
    logAll: true,
    requireAdmin: true,
  },
  // API routes get full logging
  "/api/": {
    logAll: true,
  },
  // Contact and forms
  "/contact": {
    logAll: true,
  },
  // Public pages - lighter security
  "/": {
    logAll: false,
  },
};

// Security paths that bypass normal processing
const SECURITY_BYPASS_PATHS = [
  "/api/security/status",
  "/favicon.ico",
  "/_next/",
  "/images/",
  "/icons/",
  "/sw.js",
  "/manifest.json",
];

/**
 * Main security middleware function
 */
export async function securityMiddleware(
  request: NextRequest,
): Promise<NextResponse> {
  const pathname = request.nextUrl.pathname;
  const userAgent = request.headers.get("user-agent") || "Unknown";
  const ipAddress = getClientIP(request);

  // Skip security processing for certain paths
  if (shouldBypassSecurity(pathname)) {
    return NextResponse.next();
  }

  try {
    // Get route-specific configuration
    const routeConfig = getRouteConfig(pathname);

    // Enforce admin authentication for protected routes
    if (routeConfig.requireAdmin) {
      const authHeader = request.headers.get("authorization");
      const token = extractTokenFromHeader(authHeader);
      const user = token ? await verifyToken(token) : null;

      if (!user || user.role !== "admin") {
        await auditLogger.logSecurityViolation(
          AuditEventType.ACCESS_DENIED,
          ipAddress,
          userAgent,
          {
            path: pathname,
            method: request.method,
            reason: "Admin authentication required",
          },
        );
        // Redirect browser requests to home; reject API-style requests
        if (request.headers.get("accept")?.includes("text/html")) {
          return NextResponse.redirect(new URL("/", request.url));
        }
        return NextResponse.json(
          { error: "Admin authentication required" },
          { status: 401 },
        );
      }
    }

    // Process security checks
    const securityResult = await securityManager.processRequest(request);

    if (!securityResult.allowed) {
      // Log security violation
      await auditLogger.logSecurityViolation(
        AuditEventType.RATE_LIMIT_EXCEEDED,
        ipAddress,
        userAgent,
        {
          path: pathname,
          method: request.method,
          reason: "Rate limit exceeded",
        },
      );

      return securityResult.response!;
    }

    // Create response (continue to next middleware/page)
    const response = NextResponse.next();

    // Apply security headers and configurations
    const securedResponse = securityManager.applyResponseSecurity(
      response,
      securityResult,
      securityResult.csrfToken,
    );

    // Log successful request if configured
    if (routeConfig.logAll) {
      await auditLogger.logEvent(AuditEventType.ACCESS_GRANTED, {
        source: "middleware",
        ipAddress,
        userAgent,
        outcome: "success",
        details: {
          path: pathname,
          method: request.method,
          userAgent,
        },
        tags: ["access", "middleware"],
      });
    }

    return securedResponse;
  } catch (error) {
    // Log error and continue with minimal security
    await auditLogger.logEvent(AuditEventType.ERROR_OCCURRED, {
      source: "middleware",
      ipAddress,
      userAgent,
      outcome: "failure",
      details: {
        path: pathname,
        method: request.method,
        error: error instanceof Error ? error.message : "Unknown error",
      },
      tags: ["error", "middleware"],
    });

    // Apply basic security headers even on error
    const response = NextResponse.next();
    return applyBasicSecurityHeaders(response);
  }
}

/**
 * API route security wrapper
 *
 * Provides per-request input validation (XSS sanitisation) and audit logging.
 * Rate limiting and security headers are applied by the global middleware
 * (securityMiddleware) so we deliberately do NOT call processRequest here
 * second time — that would double-charge every API request for both the rate
 * limiter and CSRF checks that the middleware already ran.
 */
export function withSecurity<
  TArgs extends unknown[],
  TReturn extends Promise<Response> | Response,
>(handler: (request: NextRequest, ...args: TArgs) => TReturn) {
  return async (request: NextRequest, ...args: TArgs) => {
    const pathname = new URL(request.url).pathname;
    const userAgent = request.headers.get("user-agent") || "Unknown";
    const ipAddress = getClientIP(request);

    try {
      // Validate input for POST/PUT/PATCH requests
      if (["POST", "PUT", "PATCH"].includes(request.method)) {
        const contentType = request.headers.get("content-type") || "";

        if (contentType.includes("application/json")) {
          try {
            const body = await request.json();
            const validation = securityManager.validateInput(body);

            if (!validation.isValid) {
              await auditLogger.logSecurityViolation(
                AuditEventType.XSS_ATTEMPT,
                ipAddress,
                userAgent,
                {
                  path: pathname,
                  method: request.method,
                  validationErrors: validation.errors,
                },
              );

              return NextResponse.json(
                { error: "Invalid input data", details: validation.errors },
                { status: 400 },
              );
            }

            // Replace request body with sanitized data
            request = new NextRequest(request.url, {
              method: request.method,
              headers: request.headers,
              body: JSON.stringify(validation.sanitizedData),
            });
          } catch {
            await auditLogger.logSecurityViolation(
              AuditEventType.XSS_ATTEMPT,
              ipAddress,
              userAgent,
              {
                path: pathname,
                method: request.method,
                error: "Invalid JSON",
              },
            );

            return NextResponse.json(
              { error: "Invalid JSON data" },
              { status: 400 },
            );
          }
        }
      }

      // Call the actual API handler
      const response = await handler(request, ...args);

      // Convert Response to NextResponse if needed
      const nextResponse =
        response instanceof NextResponse
          ? response
          : NextResponse.json(response.body ? await response.json() : null, {
              status: response.status,
              statusText: response.statusText,
              headers: response.headers,
            });

      // Log API access
      await auditLogger.logDataAccess(
        pathname,
        request.method,
        undefined, // No user ID in this context
        "success",
        {
          statusCode: nextResponse.status,
          userAgent,
        },
      );

      return nextResponse;
    } catch (error) {
      await auditLogger.logEvent(AuditEventType.ERROR_OCCURRED, {
        source: "api",
        ipAddress,
        userAgent,
        outcome: "failure",
        details: {
          path: pathname,
          method: request.method,
          error: error instanceof Error ? error.message : "Unknown error",
        },
        tags: ["error", "api"],
      });

      return NextResponse.json(
        { error: "Internal server error" },
        { status: 500 },
      );
    }
  };
}

// Helper functions

function shouldBypassSecurity(pathname: string): boolean {
  return SECURITY_BYPASS_PATHS.some((path) => pathname.startsWith(path));
}

function getRouteConfig(pathname: string) {
  // Sort by specificity (longest prefix first) to prevent "/" from
  // matching before more specific routes like "/admin".
  const sorted = Object.entries(ROUTE_SECURITY_CONFIG).sort(
    ([a], [b]) => b.length - a.length,
  );
  for (const [route, config] of sorted) {
    if (pathname.startsWith(route)) {
      return config;
    }
  }

  // Default configuration
  /* istanbul ignore next -- "/" in ROUTE_SECURITY_CONFIG always matches */
  return { logAll: false };
}

function getClientIP(request: NextRequest): string {
  // cf-connecting-ip is set exclusively by Cloudflare and cannot be spoofed.
  const cfIP = request.headers.get("cf-connecting-ip");
  if (cfIP) return cfIP;

  // x-forwarded-for is client-controllable when not behind Cloudflare.
  // Only trust it in development (local proxy / dev server).
  if (process.env.NODE_ENV === "development") {
    const forwarded = request.headers.get("x-forwarded-for");
    if (forwarded) return forwarded.split(",")[0]?.trim() ?? "unknown";
  }

  return "unknown";
}

function applyBasicSecurityHeaders(response: NextResponse): NextResponse {
  response.headers.set("X-Frame-Options", "DENY");
  response.headers.set("X-Content-Type-Options", "nosniff");
  // "0" disables the legacy XSS auditor; modern browsers use CSP instead.
  // "1; mode=block" can introduce filter-bypass vulnerabilities in older browsers.
  response.headers.set("X-XSS-Protection", "0");
  response.headers.set("Referrer-Policy", "strict-origin-when-cross-origin");

  return response;
}

// Export the main middleware function as default
export default securityMiddleware;
