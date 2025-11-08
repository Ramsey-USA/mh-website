/**
 * JWT Authentication Utilities
 *
 * Provides JWT token generation, verification, and refresh functionality
 * Compatible with Cloudflare Workers Edge Runtime
 */

import { SignJWT, jwtVerify, type JWTPayload } from "jose";

// JWT configuration
const JWT_SECRET =
  process.env["JWT_SECRET"] || "your-secret-key-change-in-production";
const JWT_ISSUER =
  process.env["NEXT_PUBLIC_BASE_URL"] || "https://www.mhc-gc.com";
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
 * Get JWT secret as Uint8Array for jose library
 */
function getSecretKey(): Uint8Array {
  return new TextEncoder().encode(JWT_SECRET);
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
  token: string
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
  getUserById: (userId: string) => Promise<JWTUser | null>
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
  authHeader: string | null
): string | null {
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return null;
  }

  return authHeader.substring(7); // Remove "Bearer " prefix
}

/**
 * Decode token without verification (for debugging only)
 */
export function decodeTokenUnsafe(token: string): JWTPayload | null {
  try {
    const parts = token.split(".");
    if (parts.length !== 3) {
      return null;
    }

    const payload = parts[1];
    if (!payload) {
      return null;
    }
    const decoded = atob(payload);
    return JSON.parse(decoded);
  } catch (_error) {
    return null;
  }
}

/**
 * Check if token is expired (without verification)
 */
export function isTokenExpired(token: string): boolean {
  const payload = decodeTokenUnsafe(token);

  if (!payload || !payload.exp) {
    return true;
  }

  const now = Math.floor(Date.now() / 1000);
  return payload.exp < now;
}

/**
 * Get token expiration time
 */
export function getTokenExpiration(token: string): Date | null {
  const payload = decodeTokenUnsafe(token);

  if (!payload || !payload.exp) {
    return null;
  }

  return new Date(payload.exp * 1000);
}
