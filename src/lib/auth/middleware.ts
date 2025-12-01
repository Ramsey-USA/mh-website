/**
 * Authentication Middleware
 *
 * Provides route protection and authentication utilities for API routes
 */

import { type NextRequest, NextResponse } from "next/server";
import { verifyToken, extractTokenFromHeader, type JWTUser } from "./jwt";
import { logger } from "@/lib/utils/logger";

export interface AuthenticatedRequest extends NextRequest {
  user?: JWTUser;
}

/**
 * Require authentication middleware
 * Returns 401 if user is not authenticated
 */
export function requireAuth(
  handler: (
    request: NextRequest,
    user: JWTUser,
    context?: unknown,
  ) => Promise<NextResponse>,
) {
  return async function authHandler(
    request: NextRequest,
    context?: unknown,
  ): Promise<NextResponse> {
    const authHeader = request.headers.get("authorization");
    const token = extractTokenFromHeader(authHeader);

    if (!token) {
      return NextResponse.json(
        {
          error: "Authentication required",
          message: "Missing or invalid authorization header",
        },
        { status: 401 },
      );
    }

    const user = await verifyToken(token);

    if (!user) {
      return NextResponse.json(
        {
          error: "Invalid token",
          message: "Token is invalid or expired",
        },
        { status: 401 },
      );
    }

    // Log authenticated access
    logger.info("Authenticated request", {
      userId: user.uid,
      email: user.email,
      path: request.nextUrl.pathname,
    });

    // Call handler with authenticated user
    return handler(request, user, context);
  };
}

/**
 * Require specific role middleware
 */
export function requireRole(
  allowedRoles: string[],
  handler: (
    request: NextRequest,
    user: JWTUser,
    context?: unknown,
  ) => Promise<NextResponse>,
) {
  // eslint-disable-next-line require-await
  return requireAuth(async (request, user, context) => {
    if (!user.role || !allowedRoles.includes(user.role)) {
      logger.warn("Insufficient permissions", {
        userId: user.uid,
        userRole: user.role,
        requiredRoles: allowedRoles,
      });

      return NextResponse.json(
        {
          error: "Insufficient permissions",
          message: `Required role: ${allowedRoles.join(" or ")}`,
        },
        { status: 403 },
      );
    }

    return handler(request, user, context);
  });
}

/**
 * Optional authentication middleware
 * Attaches user if token is valid, but doesn't fail if not present
 */
export function optionalAuth(
  handler: (
    request: NextRequest,
    user: JWTUser | null,
    context?: unknown,
  ) => Promise<NextResponse>,
) {
  return async function optionalAuthHandler(
    request: NextRequest,
    context?: unknown,
  ): Promise<NextResponse> {
    const authHeader = request.headers.get("authorization");
    const token = extractTokenFromHeader(authHeader);

    let user: JWTUser | null = null;

    if (token) {
      user = await verifyToken(token);
    }

    return handler(request, user, context);
  };
}

/**
 * Get authenticated user from request
 * Throws error if not authenticated
 */
export async function getAuthenticatedUser(
  request: NextRequest,
): Promise<JWTUser> {
  const authHeader = request.headers.get("authorization");
  const token = extractTokenFromHeader(authHeader);

  if (!token) {
    throw new Error("No authentication token provided");
  }

  const user = await verifyToken(token);

  if (!user) {
    throw new Error("Invalid or expired token");
  }

  return user;
}

/**
 * Check if user has permission
 */
export function hasPermission(user: JWTUser, requiredRole: string): boolean {
  if (!user.role) {
    return false;
  }

  // Define role hierarchy
  const roleHierarchy: Record<string, number> = {
    user: 1,
    editor: 2,
    admin: 3,
    superadmin: 4,
  };

  const userLevel = roleHierarchy[user.role] || 0;
  const requiredLevel = roleHierarchy[requiredRole] || 0;

  return userLevel >= requiredLevel;
}

/**
 * Validate API key for service-to-service authentication
 */
export function requireApiKey(
  handler: (request: NextRequest, context?: unknown) => Promise<NextResponse>,
) {
  // eslint-disable-next-line require-await
  return async function apiKeyHandler(
    request: NextRequest,
    context?: unknown,
  ): Promise<NextResponse> {
    const apiKey = request.headers.get("x-api-key");
    const validApiKey = process.env["API_SECRET_KEY"];

    if (!apiKey || !validApiKey || apiKey !== validApiKey) {
      logger.warn("Invalid API key attempt", {
        path: request.nextUrl.pathname,
        ip: request.headers.get("x-forwarded-for") || "unknown",
      });

      return NextResponse.json(
        {
          error: "Invalid API key",
          message: "Valid API key required for this endpoint",
        },
        { status: 401 },
      );
    }

    return handler(request, context);
  };
}

/**
 * Combine multiple middleware functions
 */
export function compose(
  ...middlewares: Array<
    (
      handler: (
        request: NextRequest,
        context?: unknown,
      ) => Promise<NextResponse>,
    ) => (request: NextRequest, context?: unknown) => Promise<NextResponse>
  >
) {
  return (
    handler: (request: NextRequest, context?: unknown) => Promise<NextResponse>,
  ) => {
    return middlewares.reduceRight(
      (wrappedHandler, middleware) => middleware(wrappedHandler),
      handler,
    );
  };
}
