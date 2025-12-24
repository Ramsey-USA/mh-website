/**
 * Authentication API - Token Refresh
 * POST /api/auth/refresh
 */

import { type NextRequest, type NextResponse } from "next/server";
import { refreshAccessToken, type JWTUser } from "@/lib/auth/jwt";
import { rateLimit, rateLimitPresets } from "@/lib/security/rateLimiter";
import { logger } from "@/lib/utils/logger";
import {
  badRequest,
  unauthorized,
  createSuccessResponse,
  internalServerError,
} from "@/lib/api/responses";

export const runtime = "edge";

interface RefreshRequest {
  refreshToken: string;
}

/**
 * Get user by ID from database
 * NOTE: Currently using demo credentials for development.
 * Production implementation will connect to Cloudflare D1.
 * Example: const user = await env.DB.prepare("SELECT * FROM users WHERE id = ?").bind(userId).first();
 */
function getUserById(userId: string): Promise<JWTUser | null> {
  // Demo credentials for development only
  if (userId === "demo-user-id") {
    return Promise.resolve({
      uid: userId,
      email: "demo@mhc-gc.com",
      role: "user",
      name: "Demo User",
    });
  }

  return Promise.resolve(null);
}

async function handleRefresh(request: NextRequest): Promise<NextResponse> {
  try {
    const body = await request.json();
    const { refreshToken } = body as RefreshRequest;

    if (!refreshToken) {
      return badRequest("Refresh token required");
    }

    // Refresh the access token
    const newAccessToken = await refreshAccessToken(refreshToken, getUserById);

    if (!newAccessToken) {
      logger.warn("Invalid refresh token attempt");
      return unauthorized("Invalid or expired refresh token");
    }

    logger.info("Token refreshed successfully");

    return createSuccessResponse(
      {
        accessToken: newAccessToken,
        expiresIn: 900, // 15 minutes
      },
      "Token refreshed successfully",
    );
  } catch (error) {
    logger.error("Token refresh error:", error);
    return internalServerError("Failed to refresh token");
  }
}

// Apply rate limiting
export const POST = rateLimit(rateLimitPresets.auth)(handleRefresh);
