/**
 * Authentication API - Login
 * POST /api/auth/login
 */

import { type NextRequest, NextResponse } from "next/server";
import { generateTokenPair, type JWTUser } from "@/lib/auth/jwt";
import { sanitizeEmail } from "@/lib/security/sanitization";
import { rateLimit, rateLimitPresets } from "@/lib/security/rateLimiter";
import { logger } from "@/lib/utils/logger";

export const runtime = "edge";

interface LoginRequest {
  email: string;
  password: string;
}

/**
 * Verify user credentials
 * TODO: Connect to your user database (D1, KV, or external service)
 */
function verifyCredentials(email: string, password: string): JWTUser | null {
  // IMPORTANT: Replace this with actual database lookup and password verification
  // This is a placeholder for demonstration

  // Example: Query Cloudflare D1 database
  // const db = env.DB;
  // const user = await db.prepare(
  //   "SELECT * FROM users WHERE email = ? LIMIT 1"
  // ).bind(email).first();

  // if (!user) return null;

  // Verify password hash (use bcrypt or similar)
  // const isValidPassword = await bcrypt.compare(password, user.password_hash);
  // if (!isValidPassword) return null;

  // For development only - remove in production
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
      return NextResponse.json(
        { error: "Invalid email address" },
        { status: 400 },
      );
    }

    if (!password || password.length < 6) {
      return NextResponse.json({ error: "Invalid password" }, { status: 400 });
    }

    // Verify credentials
    const user = verifyCredentials(sanitizedEmail, password);

    if (!user) {
      logger.warn("Failed login attempt", { email: sanitizedEmail });

      return NextResponse.json(
        { error: "Invalid credentials" },
        { status: 401 },
      );
    }

    // Generate tokens
    const tokens = await generateTokenPair(user);

    logger.info("Successful login", {
      userId: user.uid,
      email: user.email,
    });

    // Return tokens and user info
    return NextResponse.json({
      success: true,
      user: {
        uid: user.uid,
        email: user.email,
        role: user.role,
        name: user.name,
      },
      ...tokens,
    });
  } catch (error) {
    logger.error("Login error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}

// Apply rate limiting (5 attempts per minute)
export const POST = rateLimit(rateLimitPresets.auth)(handleLogin);
