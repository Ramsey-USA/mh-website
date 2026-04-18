/**
 * Hub Login API Route
 * Shared-passcode authentication for Worker and Traveler hub roles.
 */

import { type NextRequest, NextResponse } from "next/server";
import { generateTokenPair } from "@/lib/auth/jwt";
import { rateLimit, rateLimitPresets } from "@/lib/security/rate-limiter";
import { logger } from "@/lib/utils/logger";
import { logAccessEvent } from "@/lib/safety/log-access-event";
import {
  badRequest,
  unauthorized,
  methodNotAllowed,
  internalServerError,
} from "@/lib/api/responses";

export const dynamic = "force-dynamic";

type HubRole = "worker" | "traveler";

function resolveHubPassword(role: HubRole): string {
  const envKey = role === "worker" ? "WORKER_PASSWORD" : "TRAVELERS_PASSWORD";
  const value = process.env[envKey];

  if (!value) {
    if (process.env.NODE_ENV === "production") {
      throw new Error(`Required environment variable ${envKey} is not set`);
    }

    return role === "worker"
      ? "dev-placeholder-worker-password"
      : "dev-placeholder-travelers-password";
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

function isHubRole(value: unknown): value is HubRole {
  return value === "worker" || value === "traveler";
}

async function handler(request: NextRequest) {
  if (request.method !== "POST") {
    return methodNotAllowed();
  }

  try {
    const body = await request.json();
    const { passcode, role } = body ?? {};

    if (!isHubRole(role)) {
      return badRequest("Role must be worker or traveler");
    }

    if (typeof passcode !== "string" || !passcode) {
      return badRequest("Passcode is required");
    }

    const storedPassword = resolveHubPassword(role);
    const passcodeMatch = await timingSafeEqual(storedPassword, passcode);

    if (!passcodeMatch) {
      logger.warn("Failed hub-login attempt", { role });
      return unauthorized("Invalid passcode");
    }

    const uid =
      role === "worker" ? `worker-${Date.now()}` : `traveler-${Date.now()}`;
    const name = role === "worker" ? "Field Worker" : "Travelers Insurance";

    const { accessToken, refreshToken } = await generateTokenPair({
      uid,
      role,
      name,
    });

    logAccessEvent(request, {
      event_type: "login",
      role,
      user_name: name,
      resource_key: "login",
      resource_title: `${name} logged in`,
    }).catch((error) => {
      logger.warn("Failed to log hub login event", { error, role });
    });

    const cookieName =
      role === "worker"
        ? "mh_worker_refresh_token"
        : "mh_traveler_refresh_token";

    const response = NextResponse.json({
      success: true,
      accessToken,
      user: {
        uid,
        name,
        role,
      },
      expiresIn: 900,
    });

    response.cookies.set(cookieName, refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/api/auth",
      maxAge: 60 * 60 * 24,
    });

    return response;
  } catch (error) {
    logger.error("Hub login error:", error);
    return internalServerError("Authentication failed");
  }
}

// Apply STRICT rate limiting (3 attempts per 5 minutes)
export const POST = rateLimit(rateLimitPresets.strict)(handler);
