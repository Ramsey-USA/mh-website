/**
 * @jest-environment node
 *
 * Tests for lib/auth/jwt.ts
 *
 * NODE_ENV=test triggers the dev-secret fallback in getSecretKey(), so no
 * JWT_SECRET env var is required.
 */

import {
  generateAccessToken,
  generateRefreshToken,
  generateTokenPair,
  verifyToken,
  verifyRefreshToken,
  refreshAccessToken,
  extractTokenFromHeader,
  type JWTUser,
} from "../jwt";

// ── extractTokenFromHeader (sync) ─────────────────────────────────────────────

describe("extractTokenFromHeader()", () => {
  it("returns null for a null header", () => {
    expect(extractTokenFromHeader(null)).toBeNull();
  });

  it("returns null when header does not start with 'Bearer '", () => {
    expect(extractTokenFromHeader("Basic abc123")).toBeNull();
    expect(extractTokenFromHeader("token-without-prefix")).toBeNull();
  });

  it("returns the token value after the 'Bearer ' prefix", () => {
    expect(extractTokenFromHeader("Bearer my-jwt-token")).toBe("my-jwt-token");
  });
});

// ── generateAccessToken / verifyToken ────────────────────────────────────────

describe("generateAccessToken() + verifyToken()", () => {
  const user: JWTUser = {
    uid: "user-1",
    email: "test@example.com",
    role: "user",
  };

  it("generates a non-empty JWT string", async () => {
    const token = await generateAccessToken(user);
    expect(typeof token).toBe("string");
    expect(token.split(".")).toHaveLength(3); // header.payload.signature
  });

  it("verifies a valid token and returns the payload", async () => {
    const token = await generateAccessToken(user);
    const payload = await verifyToken(token);
    expect(payload).not.toBeNull();
    expect(payload?.uid).toBe("user-1");
    expect(payload?.email).toBe("test@example.com");
  });

  it("returns null for a tampered / invalid token", async () => {
    const result = await verifyToken("not.a.valid.jwt");
    expect(result).toBeNull();
  });

  it("defaults role to 'user' when not provided", async () => {
    const token = await generateAccessToken({ uid: "u2" });
    const payload = await verifyToken(token);
    expect(payload?.["role"]).toBe("user");
  });
});

// ── generateRefreshToken / verifyRefreshToken ─────────────────────────────────

describe("generateRefreshToken() + verifyRefreshToken()", () => {
  it("generates a valid refresh token and returns the userId on verification", async () => {
    const token = await generateRefreshToken("user-42");
    const userId = await verifyRefreshToken(token);
    expect(userId).toBe("user-42");
  });

  it("returns null for an invalid refresh token", async () => {
    const result = await verifyRefreshToken("bad.token");
    expect(result).toBeNull();
  });

  it("returns null when verifying an access token as a refresh token", async () => {
    const accessToken = await generateAccessToken({ uid: "u3" });
    const result = await verifyRefreshToken(accessToken);
    expect(result).toBeNull();
  });
});

// ── generateTokenPair ─────────────────────────────────────────────────────────

describe("generateTokenPair()", () => {
  it("returns both accessToken and refreshToken with expiresIn=900", async () => {
    const pair = await generateTokenPair({ uid: "user-99", email: "a@b.com" });
    expect(pair.accessToken).toBeTruthy();
    expect(pair.refreshToken).toBeTruthy();
    expect(pair.expiresIn).toBe(900);
  });
});

// ── refreshAccessToken ────────────────────────────────────────────────────────

describe("refreshAccessToken()", () => {
  it("returns null for an invalid refresh token", async () => {
    const result = await refreshAccessToken("bad-token", async () => null);
    expect(result).toBeNull();
  });

  it("returns null when getUserById returns null", async () => {
    const refreshToken = await generateRefreshToken("user-5");
    const result = await refreshAccessToken(refreshToken, async () => null);
    expect(result).toBeNull();
  });

  it("returns a new access token when getUserById returns a user", async () => {
    const user: JWTUser = { uid: "user-5", email: "user5@example.com" };
    const refreshToken = await generateRefreshToken("user-5");
    const result = await refreshAccessToken(refreshToken, async () => user);
    expect(typeof result).toBe("string");
    expect(result?.split(".")).toHaveLength(3);
  });
});
