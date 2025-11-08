/**
 * Security Middleware for Next.js
 * Integrates security manager with Next.js application
 */

import { NextRequest, NextResponse } from "next/server";
import { securityManager } from "@/lib/security/security-manager";
import { auditLogger, AuditEventType } from "@/lib/security/audit-logger";

// Configuration for different routes
const ROUTE_SECURITY_CONFIG = {
  // API routes require stricter security
  "/api/": {
    rateLimitMultiplier: 0.5, // More restrictive rate limiting
    requireCSRF: true,
    validateInput: true,
    logAll: true,
  },
  // Contact and forms
  "/contact": {
    rateLimitMultiplier: 0.3,
    requireCSRF: true,
    validateInput: true,
    logAll: true,
  },
  "/estimate": {
    rateLimitMultiplier: 0.3,
    requireCSRF: true,
    validateInput: true,
    logAll: true,
  },
  // Admin areas (if any)
  "/admin": {
    rateLimitMultiplier: 0.1,
    requireCSRF: true,
    validateInput: true,
    logAll: true,
    requireAuth: true,
  },
  // Public pages - lighter security
  "/": {
    rateLimitMultiplier: 1.0,
    requireCSRF: false,
    validateInput: false,
    logAll: false,
  },
};

// Security paths that bypass normal processing
const SECURITY_BYPASS_PATHS = [
  "/api/health",
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
 */
export function withSecurity<
  T extends (
    request: NextRequest,
    ...args: unknown[]
  ) => Promise<Response> | Response,
>(handler: T) {
  return async (request: NextRequest, ..._args: unknown[]) => {
    const pathname = new URL(request.url).pathname;
    const userAgent = request.headers.get("user-agent") || "Unknown";
    const ipAddress = getClientIP(request);

    try {
      // Enhanced security for API routes
      const securityResult = await securityManager.processRequest(request);

      if (!securityResult.allowed) {
        await auditLogger.logSecurityViolation(
          AuditEventType.ACCESS_DENIED,
          ipAddress,
          userAgent,
          {
            path: pathname,
            method: request.method,
            reason: "Security check failed",
          },
        );

        return securityResult.response!;
      }

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
          } catch (_error) {
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
      const response = await handler(request);

      // Convert Response to NextResponse if needed
      const nextResponse =
        response instanceof NextResponse
          ? response
          : NextResponse.json(response.body ? await response.json() : null, {
              status: response.status,
              statusText: response.statusText,
              headers: response.headers,
            });

      // Apply security to response
      const securedResponse = securityManager.applyResponseSecurity(
        nextResponse,
        securityResult,
        securityResult.csrfToken,
      );

      // Log API access
      await auditLogger.logDataAccess(
        pathname,
        request.method,
        undefined, // No user ID in this context
        "success",
        {
          statusCode: securedResponse.status,
          userAgent,
        },
      );

      return securedResponse;
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

/**
 * Security context for React components
 */
export function createSecurityContext(request: NextRequest) {
  const ipAddress = getClientIP(request);
  const userAgent = request.headers.get("user-agent") || "Unknown";

  return {
    ipAddress,
    userAgent,
    timestamp: new Date(),
    securityHeaders: {
      "X-Frame-Options": "DENY",
      "X-Content-Type-Options": "nosniff",
      "X-XSS-Protection": "1; mode=block",
      "Referrer-Policy": "strict-origin-when-cross-origin",
    },
  };
}

/**
 * File upload security
 */
export async function validateFileUpload(
  file: File,
  options?: {
    maxSize?: number;
    allowedTypes?: string[];
    scanForMalware?: boolean;
  },
): Promise<{
  isValid: boolean;
  errors: string[];
  sanitizedFile?: File;
}> {
  const errors: string[] = [];
  const config = securityManager.getConfig();

  // Size validation
  const maxSize = options?.maxSize || config.validation.maxFileSize;
  if (file.size > maxSize) {
    errors.push(
      `File size exceeds maximum allowed size of ${maxSize / (1024 * 1024)}MB`,
    );
  }

  // MIME type validation
  const allowedTypes =
    options?.allowedTypes || config.validation.allowedMimeTypes;
  if (!allowedTypes.includes(file.type)) {
    errors.push(`File type ${file.type} is not allowed`);
  }

  // File name validation
  const fileName = file.name;
  if (
    fileName.includes("..") ||
    fileName.includes("/") ||
    fileName.includes("\\")
  ) {
    errors.push("Invalid file name - path traversal detected");
  }

  // Check for executable extensions
  const dangerousExtensions = [
    ".exe",
    ".bat",
    ".cmd",
    ".com",
    ".pif",
    ".scr",
    ".vbs",
    ".js",
  ];
  const fileExtension = fileName.toLowerCase().split(".").pop();
  if (fileExtension && dangerousExtensions.includes(`.${fileExtension}`)) {
    errors.push("Executable files are not allowed");
  }

  // Basic malware scan (check for suspicious patterns)
  if (options?.scanForMalware) {
    const suspiciousPatterns = [
      /PK\x03\x04.*\.exe/, // ZIP containing exe
      /MZ/, // PE header
      /%PDF.*\/JavaScript/, // PDF with JavaScript
    ];

    try {
      const buffer = await file.arrayBuffer();
      const content = new Uint8Array(buffer);
      const header = Array.from(content.slice(0, 1024))
        .map((b) => String.fromCharCode(b))
        .join("");

      for (const pattern of suspiciousPatterns) {
        if (pattern.test(header)) {
          errors.push("File contains suspicious content");
          break;
        }
      }
    } catch (_error) {
      errors.push("Unable to scan file content");
    }
  }

  const isValid = errors.length === 0;

  // Log file upload attempt
  await auditLogger.logEvent(AuditEventType.FILE_UPLOAD_BLOCKED, {
    outcome: isValid ? "success" : "failure",
    details: {
      fileName: file.name,
      fileSize: file.size,
      mimeType: file.type,
      errors,
    },
    tags: ["file_upload", isValid ? "allowed" : "blocked"],
  });

  return {
    isValid,
    errors,
    sanitizedFile: isValid ? file : undefined,
  };
}

/**
 * Content Security Policy nonce generator (Edge Runtime compatible)
 */
export function generateCSPNonce(): string {
  const array = crypto.getRandomValues(new Uint8Array(16));
  // Convert to base64 without Buffer (Edge Runtime compatible)
  let binary = "";
  for (let i = 0; i < array.length; i++) {
    binary += String.fromCharCode(array[i]);
  }
  return btoa(binary);
}

/**
 * Security-aware cookie settings
 */
export function createSecureCookie(
  name: string,
  value: string,
  options?: {
    maxAge?: number;
    domain?: string;
    path?: string;
    httpOnly?: boolean;
    secure?: boolean;
    sameSite?: "strict" | "lax" | "none";
  },
): string {
  const defaults = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict" as const,
    path: "/",
    maxAge: 3600, // 1 hour
  };

  const cookieOptions = { ...defaults, ...options };

  let cookieString = `${name}=${value}`;

  if (cookieOptions.maxAge) {
    cookieString += `; Max-Age=${cookieOptions.maxAge}`;
  }

  if (cookieOptions.domain) {
    cookieString += `; Domain=${cookieOptions.domain}`;
  }

  if (cookieOptions.path) {
    cookieString += `; Path=${cookieOptions.path}`;
  }

  if (cookieOptions.httpOnly) {
    cookieString += "; HttpOnly";
  }

  if (cookieOptions.secure) {
    cookieString += "; Secure";
  }

  cookieString += `; SameSite=${cookieOptions.sameSite}`;

  return cookieString;
}

// Helper functions

function shouldBypassSecurity(pathname: string): boolean {
  return SECURITY_BYPASS_PATHS.some((path) => pathname.startsWith(path));
}

function getRouteConfig(pathname: string) {
  // Find the most specific route configuration
  for (const [route, config] of Object.entries(ROUTE_SECURITY_CONFIG)) {
    if (pathname.startsWith(route)) {
      return config;
    }
  }

  // Default configuration
  return ROUTE_SECURITY_CONFIG["/"];
}

function getClientIP(request: NextRequest): string {
  const forwarded = request.headers.get("x-forwarded-for");
  const realIP = request.headers.get("x-real-ip");

  if (forwarded) {
    return forwarded.split(",")[0].trim();
  }

  if (realIP) {
    return realIP;
  }

  return "unknown";
}

function applyBasicSecurityHeaders(response: NextResponse): NextResponse {
  response.headers.set("X-Frame-Options", "DENY");
  response.headers.set("X-Content-Type-Options", "nosniff");
  response.headers.set("X-XSS-Protection", "1; mode=block");
  response.headers.set("Referrer-Policy", "strict-origin-when-cross-origin");

  return response;
}

// Export the main middleware function as default
export default securityMiddleware;
