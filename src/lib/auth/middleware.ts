/**
 * Authentication Middleware
 *
 * Provides route protection and authentication utilities for API routes
 */

import { type NextRequest, type NextResponse } from "next/server";
import { verifyToken, extractTokenFromHeader, type JWTUser } from "./jwt";
import { logger } from "@/lib/utils/logger";
import { unauthorized, forbidden } from "@/lib/api/responses";

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
      return unauthorized(
        "Authentication required",
        "Missing or invalid authorization header",
      );
    }

    const user = await verifyToken(token);

    if (!user) {
      return unauthorized("Invalid token", "Token is invalid or expired");
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
  return requireAuth((request, user, context) => {
    if (!user.role || !allowedRoles.includes(user.role)) {
      logger.warn("Insufficient permissions", {
        userId: user.uid,
        userRole: user.role,
        requiredRoles: allowedRoles,
      });

      return Promise.resolve(
        forbidden(
          "Insufficient permissions",
          `Required role: ${allowedRoles.join(" or ")}`,
        ),
      );
    }

    return handler(request, user, context);
  });
}
