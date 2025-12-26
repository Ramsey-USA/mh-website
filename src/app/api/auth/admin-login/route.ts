/**
 * Admin Login API Route
 * Restricted authentication endpoint for Matt and Jeremy
 *
 * 🔴 SECURITY WARNING:
 * - Passwords are stored in plain text (env vars)
 * - Password comparison is not using bcrypt
 * - For production, implement proper password hashing
 */

import { type NextRequest, NextResponse } from "next/server";
import { generateTokenPair } from "@/lib/auth/jwt";
import { rateLimit, rateLimitPresets } from "@/lib/security/rateLimiter";
import { logger } from "@/lib/utils/logger";

export const runtime = "edge";

// Admin credentials (in production, these should be in environment variables)
const ADMIN_USERS = [
  {
    email: "matt@mhc-gc.com",
    name: "Matt",
    // In production, this should be hashed
    passwordHash: process.env["ADMIN_MATT_PASSWORD"] || "admin123",
  },
  {
    email: "jeremy@mhc-gc.com",
    name: "Jeremy",
    // In production, this should be hashed
    passwordHash: process.env["ADMIN_JEREMY_PASSWORD"] || "admin123",
  },
];

async function handler(request: NextRequest) {
  if (request.method !== "POST") {
    return NextResponse.json({ error: "Method not allowed" }, { status: 405 });
  }

  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password are required" },
        { status: 400 },
      );
    }

    // Find admin user
    const adminUser = ADMIN_USERS.find(
      (user) => user.email.toLowerCase() === email.toLowerCase(),
    );

    // Verify password (in production, use proper bcrypt comparison)
    if (!adminUser || adminUser.passwordHash !== password) {
      logger.warn(`Failed admin login attempt for: ${email}`);
      return NextResponse.json(
        { error: "Invalid credentials" },
        { status: 401 },
      );
    }

    // Generate JWT token
    const { accessToken } = await generateTokenPair({
      uid: `admin-${adminUser.name.toLowerCase()}`,
      email: adminUser.email,
      role: "admin",
      name: adminUser.name,
    });

    logger.info(`Successful admin login: ${adminUser.email}`);

    return NextResponse.json({
      success: true,
      accessToken,
      user: {
        uid: `admin-${adminUser.name.toLowerCase()}`,
        email: adminUser.email,
        name: adminUser.name,
        role: "admin",
      },
      expiresIn: 3600, // 1 hour
    });
  } catch (error) {
    logger.error("Admin login error:", error);
    return NextResponse.json(
      { error: "Authentication failed" },
      { status: 500 },
    );
  }
}

// Apply STRICT rate limiting for admin login (3 attempts per 5 minutes)
export const POST = rateLimit(rateLimitPresets.strict)(handler);
