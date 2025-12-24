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
 * NOTE: Currently using demo credentials for development.
 * Production implementation will connect to Cloudflare D1 with bcrypt password hashing.
 *
 * Example implementation:
 * - Query Cloudflare D1: const user = await env.DB.prepare("SELECT * FROM users WHERE email = ?").bind(email).first();
 * - Verify password: await bcrypt.compare(password, user.password_hash)
 */
function verifyCredentials(email: string, password: string): JWTUser | null {
  // Demo credentials for development only
  if (email === "demo@mhc-gc.com" && password === "demo123") {
    return {
      uid: "demo-user-id",
      email: email,
      role: "user",
      name: "Demo User",
    };
  }

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
    const user = verifyCredentials(sanitizedEmail, password);

    if (!user) {
      logger.warn("Failed login attempt", { email: sanitizedEmail });
      return unauthorized("Invalid credentials");
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
