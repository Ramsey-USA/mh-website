/**
 * JWT Authentication Utilities
 *
 * Provides JWT token generation, verification, and refresh functionality
 * Compatible with Cloudflare Workers Edge Runtime
 */

import { SignJWT, jwtVerify, type JWTPayload } from "jose";
import { COMPANY_INFO } from "@/lib/constants/company";

// JWT configuration — JWT_SECRET must be set in production via environment variable
// NOTE: validation is deferred to request-time (inside getSecretKey) so the build
// succeeds without this runtime secret being present in the CI/build environment.
const JWT_ISSUER =
  process.env["NEXT_PUBLIC_SITE_URL"] || COMPANY_INFO.urls.getSiteUrl();
const JWT_AUDIENCE = "mh-construction-api";

// Token expiration times
const ACCESS_TOKEN_EXPIRY = "15m"; // 15 minutes
const REFRESH_TOKEN_EXPIRY = "7d"; // 7 days

export interface JWTUser extends JWTPayload {
  uid: string;
  email?: string;
  role?: string;
  name?: string;
}

export interface TokenPair {
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
}

/**
 * Get JWT secret as Uint8Array for jose library.
 * Validation is deferred here so the build succeeds without the secret present;
 * it will throw at request-time in production if the variable is missing.
 */
function getSecretKey(): Uint8Array {
  const secret = process.env["JWT_SECRET"];
  if (!secret) {
    if (
      process.env.NODE_ENV === "development" ||
      process.env.NODE_ENV === "test"
    ) {
      return new TextEncoder().encode("dev-only-secret-not-for-production");
    }
    throw new Error(
      "JWT_SECRET environment variable is required outside development",
    );
  }
  if (secret.length < 32) {
    throw new Error(
      "JWT_SECRET must be at least 32 characters for HMAC-SHA256 security",
    );
  }
  return new TextEncoder().encode(secret);
}

/**
 * Generate access token (short-lived)
 */
export async function generateAccessToken(user: JWTUser): Promise<string> {
  const secret = getSecretKey();

  const token = await new SignJWT({
    uid: user.uid,
    email: user.email,
    role: user.role || "user",
    name: user.name,
  })
    .setProtectedHeader({ alg: "HS256", typ: "JWT" })
    .setIssuedAt()
    .setIssuer(JWT_ISSUER)
    .setAudience(JWT_AUDIENCE)
    .setExpirationTime(ACCESS_TOKEN_EXPIRY)
    .sign(secret);

  return token;
}

/**
 * Generate refresh token (long-lived)
 */
export async function generateRefreshToken(userId: string): Promise<string> {
  const secret = getSecretKey();

  const token = await new SignJWT({
    uid: userId,
    type: "refresh",
  })
    .setProtectedHeader({ alg: "HS256", typ: "JWT" })
    .setIssuedAt()
    .setIssuer(JWT_ISSUER)
    .setAudience(JWT_AUDIENCE)
    .setExpirationTime(REFRESH_TOKEN_EXPIRY)
    .sign(secret);

  return token;
}

/**
 * Generate both access and refresh tokens
 */
export async function generateTokenPair(user: JWTUser): Promise<TokenPair> {
  const [accessToken, refreshToken] = await Promise.all([
    generateAccessToken(user),
    generateRefreshToken(user.uid),
  ]);

  return {
    accessToken,
    refreshToken,
    expiresIn: 900, // 15 minutes in seconds
  };
}

/**
 * Verify and decode JWT token
 */
export async function verifyToken(token: string): Promise<JWTUser | null> {
  try {
    const secret = getSecretKey();

    const { payload } = await jwtVerify(token, secret, {
      issuer: JWT_ISSUER,
      audience: JWT_AUDIENCE,
    });

    return payload as JWTUser;
  } catch (_error) {
    // Token is invalid or expired
    return null;
  }
}

/**
 * Verify refresh token and return user ID
 */
export async function verifyRefreshToken(
  token: string,
): Promise<string | null> {
  try {
    const secret = getSecretKey();

    const { payload } = await jwtVerify(token, secret, {
      issuer: JWT_ISSUER,
      audience: JWT_AUDIENCE,
    });

    if (payload["type"] === "refresh" && payload["uid"]) {
      return payload["uid"] as string;
    }

    return null;
  } catch (_error) {
    return null;
  }
}

/**
 * Refresh access token using refresh token
 */
export async function refreshAccessToken(
  refreshToken: string,
  getUserById: (userId: string) => Promise<JWTUser | null>,
): Promise<string | null> {
  const userId = await verifyRefreshToken(refreshToken);

  if (!userId) {
    return null;
  }

  // Get user data from database
  const user = await getUserById(userId);

  if (!user) {
    return null;
  }

  // Generate new access token
  return generateAccessToken(user);
}

/**
 * Extract token from Authorization header
 */
export function extractTokenFromHeader(
  authHeader: string | null,
): string | null {
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return null;
  }

  return authHeader.substring(7); // Remove "Bearer " prefix
}
