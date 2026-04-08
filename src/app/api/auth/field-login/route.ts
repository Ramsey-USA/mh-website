/**
 * Field Login API Route
 * Shared-passcode authentication for Superintendents accessing the Safety Hub.
 *
 * The passcode is stored in the FIELD_STAFF_PASSWORD environment variable.
 * Comparison uses a constant-time HMAC check to prevent timing side-channels.
 */

import { type NextRequest, NextResponse } from "next/server";
import { generateTokenPair } from "@/lib/auth/jwt";
import { rateLimit, rateLimitPresets } from "@/lib/security/rate-limiter";
import { logger } from "@/lib/utils/logger";

export const dynamic = "force-dynamic";

function resolveFieldPassword(): string {
  const value = process.env['FIELD_STAFF_PASSWORD'];
  if (!value) {
    if (process.env.NODE_ENV === "production") {
      throw new Error("Required environment variable FIELD_STAFF_PASSWORD is not set");
    }
    return "dev-placeholder-field-password";
  }
  return value;
}

/**
 * Constant-time string comparison using HMAC-SHA256 (Edge Runtime compatible).
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
    const body = await request.json();
    const { passcode, name } = body ?? {};

    if (typeof passcode !== "string" || !passcode) {
      return NextResponse.json(
        { error: "Passcode is required" },
        { status: 400 },
      );
    }

    const storedPassword = resolveFieldPassword();
    const passcodeMatch = await timingSafeEqual(storedPassword, passcode);

    if (!passcodeMatch) {
      logger.warn("Failed field-login attempt");
      return NextResponse.json(
        { error: "Invalid passcode" },
        { status: 401 },
      );
    }

    const superintendentName =
      typeof name === "string" && name.trim() ? name.trim() : "Superintendent";
    const uid = `field-${Date.now()}`;

    const { accessToken, refreshToken } = await generateTokenPair({
      uid,
      role: "superintendent",
      name: superintendentName,
    });

    logger.info(`Successful field login: ${superintendentName}`);

    const response = NextResponse.json({
      success: true,
      accessToken,
      user: {
        uid,
        name: superintendentName,
        role: "superintendent",
      },
      expiresIn: 900, // 15 minutes
    });

    // Store refresh token in httpOnly cookie
    response.cookies.set("mh_field_refresh_token", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/api/auth",
      maxAge: 60 * 60 * 24, // 24 hours
    });

    return response;
  } catch (error) {
    logger.error("Field login error:", error);
    return NextResponse.json(
      { error: "Authentication failed" },
      { status: 500 },
    );
  }
}

// Apply STRICT rate limiting (3 attempts per 5 minutes)
export const POST = rateLimit(rateLimitPresets.strict)(handler);
