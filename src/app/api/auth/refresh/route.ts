/**
 * Authentication API - Token Refresh
 * POST /api/auth/refresh
 */

import { type NextRequest, NextResponse } from "next/server";
import { refreshAccessToken, type JWTUser } from "@/lib/auth/jwt";
import { rateLimit, rateLimitPresets } from "@/lib/security/rateLimiter";
import { logger } from "@/lib/utils/logger";

export const runtime = "edge";

interface RefreshRequest {
  refreshToken: string;
}

/**
 * Get user by ID from database
 * TODO: Connect to your user database
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
      return NextResponse.json(
        { error: "Refresh token required" },
        { status: 400 },
      );
    }

    // Refresh the access token
    const newAccessToken = await refreshAccessToken(refreshToken, getUserById);

    if (!newAccessToken) {
      logger.warn("Invalid refresh token attempt");

      return NextResponse.json(
        { error: "Invalid or expired refresh token" },
        { status: 401 },
      );
    }

    logger.info("Token refreshed successfully");

    return NextResponse.json({
      success: true,
      accessToken: newAccessToken,
      expiresIn: 900, // 15 minutes
    });
  } catch (_error) {
    logger.error("Token refresh _error:", _error);
    return NextResponse.json(
      { _error: "Internal server _error" },
      { status: 500 },
    );
  }
}

// Apply rate limiting
export const POST = rateLimit(rateLimitPresets.auth)(handleRefresh);
