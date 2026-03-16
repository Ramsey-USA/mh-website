/**
 * Admin Login API Route
 * Restricted authentication endpoint for Matt and Jeremy
 *
 * Passwords must be supplied as ADMIN_MATT_PASSWORD / ADMIN_JEREMY_PASSWORD
 * environment variables.  Comparisons use a constant-time HMAC check (Web
 * Crypto API) so timing side-channels cannot leak whether a user exists.
 */

import { type NextRequest, NextResponse } from "next/server";
import { generateTokenPair } from "@/lib/auth/jwt";
import { rateLimit, rateLimitPresets } from "@/lib/security/rate-limiter";
import { logger } from "@/lib/utils/logger";

// Resolve credentials at request-time so the build succeeds without the env
// vars present (same pattern as JWT's getSecretKey).  Missing vars throw in
// production at the moment a login is attempted, not at build time.
function resolveAdminPassword(envKey: string): string {
  const value = process.env[envKey];
  if (!value) {
    if (process.env.NODE_ENV === "production") {
      throw new Error(`Required environment variable ${envKey} is not set`);
    }
    // Local dev only — never reachable in production builds.
    return `dev-placeholder-${envKey}`;
  }
  return value;
}

const ADMIN_EMAILS: Record<string, string> = {
  "matt@mhc-gc.com": "Matt",
  "jeremy@mhc-gc.com": "Jeremy",
};

const ADMIN_ENV_KEYS: Record<string, string> = {
  "matt@mhc-gc.com": "ADMIN_MATT_PASSWORD",
  "jeremy@mhc-gc.com": "ADMIN_JEREMY_PASSWORD",
};

/**
 * Constant-time string comparison using HMAC-SHA256 (Edge Runtime compatible).
 * Both strings are signed with the same random key so the comparison is safe
 * against timing attacks even when the lengths differ.
 */
async function timingSafeEqual(a: string, b: string): Promise<boolean> {
  const enc = new TextEncoder();
  const key = await crypto.subtle.generateKey(
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );
  const [sigA, sigB] = await Promise.all([
    crypto.subtle.sign("HMAC", key, enc.encode(a)),
    crypto.subtle.sign("HMAC", key, enc.encode(b)),
  ]);
  // Compare the two fixed-length (32-byte) HMAC outputs byte-by-byte.
  const viewA = new Uint8Array(sigA);
  const viewB = new Uint8Array(sigB);
  let diff = 0;
  for (let i = 0; i < viewA.length; i++) {
    diff |= (viewA[i] ?? 0) ^ (viewB[i] ?? 0);
  }
  return diff === 0;
}

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

    // Find admin user — always run the password check even when the user is not
    // found so that the response time does not leak whether the email exists.
    const normalizedEmail = email.toLowerCase();
    const adminName = ADMIN_EMAILS[normalizedEmail];
    const envKey = ADMIN_ENV_KEYS[normalizedEmail];

    // Resolve password at request-time so a missing env var surfaces now.
    const storedPassword = envKey
      ? resolveAdminPassword(envKey)
      : "not-a-real-password";
    const passwordMatch = await timingSafeEqual(storedPassword, password);

    if (!adminName || !passwordMatch) {
      logger.warn(`Failed admin login attempt for: ${email}`);
      return NextResponse.json(
        { error: "Invalid credentials" },
        { status: 401 },
      );
    }

    // Generate JWT token
    const { accessToken } = await generateTokenPair({
      uid: `admin-${adminName.toLowerCase()}`,
      email: normalizedEmail,
      role: "admin",
      name: adminName,
    });

    logger.info(`Successful admin login: ${normalizedEmail}`);

    return NextResponse.json({
      success: true,
      accessToken,
      user: {
        uid: `admin-${adminName.toLowerCase()}`,
        email: normalizedEmail,
        name: adminName,
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
