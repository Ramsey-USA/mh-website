/**
 * Authentication API - Login
 * POST /api/auth/login
 */

import { type NextRequest, type NextResponse } from "next/server";
import { generateTokenPair, type JWTUser } from "@/lib/auth/jwt";
import { sanitizeEmail } from "@/lib/security/sanitization";
import { rateLimit, rateLimitPresets } from "@/lib/security/rateLimiter";
import { logger } from "@/lib/utils/logger";
import {
  badRequest,
  unauthorized,
  createSuccessResponse,
  internalServerError,
} from "@/lib/api/responses";

export const runtime = "edge";

interface LoginRequest {
  email: string;
  password: string;
}

/**
 * Verify user credentials
 *
 * ⚠️ NOT IMPLEMENTED: This endpoint requires database integration
 *
 * Production implementation:
 * 1. Query Cloudflare D1 for user:
 *    const user = await env.DB.prepare("SELECT * FROM users WHERE email = ?").bind(email).first();
 * 2. Verify password with bcrypt:
 *    const isValid = await bcrypt.compare(password, user.password_hash);
 * 3. Return user data if valid
 *
 * Use /api/auth/admin-login for admin authentication (Matt & Jeremy)
 */
async function verifyCredentials(
  _email: string,
  _password: string,
): Promise<JWTUser | null> {
  // No user authentication system implemented yet
  // This endpoint is reserved for future client portal features
  return null;
}

async function handleLogin(request: NextRequest): Promise<NextResponse> {
  try {
    const body = await request.json();
    const { email, password } = body as LoginRequest;

    // Validate input
    const sanitizedEmail = sanitizeEmail(email);
    if (!sanitizedEmail) {
      return badRequest("Invalid email address");
    }

    if (!password || password.length < 6) {
      return badRequest("Invalid password");
    }

    // Verify credentials
    const user = await verifyCredentials(sanitizedEmail, password);

    if (!user) {
      logger.warn("Login attempt - no user authentication system", {
        email: sanitizedEmail,
      });
      return unauthorized(
        "User authentication not implemented. Use /api/auth/admin-login for admin access.",
      );
    }

    // Generate tokens
    const tokens = await generateTokenPair(user);

    logger.info("Successful login", {
      userId: user.uid,
      email: user.email,
    });

    // Return tokens and user info
    return createSuccessResponse(
      {
        user: {
          uid: user.uid,
          email: user.email,
          role: user.role,
          name: user.name,
        },
        ...tokens,
      },
      "Login successful",
    );
  } catch (error) {
    logger.error("Login error:", error);
    return internalServerError("Failed to process login");
  }
}

// Apply rate limiting (5 attempts per minute)
export const POST = rateLimit(rateLimitPresets.auth)(handleLogin);
