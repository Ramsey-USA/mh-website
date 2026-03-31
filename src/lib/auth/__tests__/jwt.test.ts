/**
 * @jest-environment node
 *
 * Tests for src/lib/auth/jwt.ts
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
} from "@/lib/auth/jwt";

beforeAll(() => {
  process.env["JWT_SECRET"] = "test-secret-for-jest";
});

const testUser: JWTUser = {
  uid: "user-123",
  email: "test@example.com",
  role: "user",
  name: "Test User",
};

// ---------------------------------------------------------------------------
// generateAccessToken
// ---------------------------------------------------------------------------
describe("generateAccessToken", () => {
  it("returns a non-empty string", async () => {
    const token = await generateAccessToken(testUser);
    expect(typeof token).toBe("string");
    expect(token.length).toBeGreaterThan(0);
  });

  it("returns a JWT-formatted string (three dot-separated parts)", async () => {
    const token = await generateAccessToken(testUser);
    expect(token.split(".")).toHaveLength(3);
  });
});

// ---------------------------------------------------------------------------
// generateRefreshToken
// ---------------------------------------------------------------------------
describe("generateRefreshToken", () => {
  it("returns a non-empty string", async () => {
    const token = await generateRefreshToken("user-123");
    expect(typeof token).toBe("string");
    expect(token.length).toBeGreaterThan(0);
  });

  it("returns a JWT-formatted string", async () => {
    const token = await generateRefreshToken("user-123");
    expect(token.split(".")).toHaveLength(3);
  });
});

// ---------------------------------------------------------------------------
// generateTokenPair
// ---------------------------------------------------------------------------
describe("generateTokenPair", () => {
  it("returns an object with accessToken, refreshToken, and expiresIn", async () => {
    const pair = await generateTokenPair(testUser);
    expect(typeof pair.accessToken).toBe("string");
    expect(typeof pair.refreshToken).toBe("string");
    expect(pair.expiresIn).toBe(900);
  });

  it("accessToken and refreshToken are different strings", async () => {
    const pair = await generateTokenPair(testUser);
    expect(pair.accessToken).not.toBe(pair.refreshToken);
  });
});

// ---------------------------------------------------------------------------
// verifyToken
// ---------------------------------------------------------------------------
describe("verifyToken", () => {
  it("with valid access token returns user payload with uid", async () => {
    const token = await generateAccessToken(testUser);
    const payload = await verifyToken(token);
    expect(payload).not.toBeNull();
    expect(payload!.uid).toBe("user-123");
  });

  it("with valid access token returns payload with email", async () => {
    const token = await generateAccessToken(testUser);
    const payload = await verifyToken(token);
    expect(payload!.email).toBe("test@example.com");
  });

  it("with valid access token returns payload with role", async () => {
    const token = await generateAccessToken(testUser);
    const payload = await verifyToken(token);
    expect(payload!.role).toBe("user");
  });

  it("with invalid token returns null", async () => {
    const result = await verifyToken("this.is.not.a.valid.jwt");
    expect(result).toBeNull();
  });

  it("with empty string returns null", async () => {
    const result = await verifyToken("");
    expect(result).toBeNull();
  });

  it("with tampered token returns null", async () => {
    const token = await generateAccessToken(testUser);
    const tampered = token.slice(0, -5) + "XXXXX";
    const result = await verifyToken(tampered);
    expect(result).toBeNull();
  });
});

// ---------------------------------------------------------------------------
// verifyRefreshToken
// ---------------------------------------------------------------------------
describe("verifyRefreshToken", () => {
  it("with valid refresh token returns the userId string", async () => {
    const token = await generateRefreshToken("user-456");
    const userId = await verifyRefreshToken(token);
    expect(userId).toBe("user-456");
  });

  it("with access token (type !== 'refresh') returns null", async () => {
    const accessToken = await generateAccessToken(testUser);
    const result = await verifyRefreshToken(accessToken);
    expect(result).toBeNull();
  });

  it("with invalid token returns null", async () => {
    const result = await verifyRefreshToken("invalid.token.here");
    expect(result).toBeNull();
  });

  it("with empty string returns null", async () => {
    const result = await verifyRefreshToken("");
    expect(result).toBeNull();
  });
});

// ---------------------------------------------------------------------------
// refreshAccessToken
// ---------------------------------------------------------------------------
describe("refreshAccessToken", () => {
  it("with valid refresh token calls getUserById and returns new access token", async () => {
    const refreshToken = await generateRefreshToken("user-789");
    const getUserById = jest.fn(
      async (_id: string): Promise<JWTUser | null> => ({
        uid: "user-789",
        email: "refreshed@example.com",
        role: "user",
      }),
    );

    const newToken = await refreshAccessToken(refreshToken, getUserById);
    expect(getUserById).toHaveBeenCalledWith("user-789");
    expect(typeof newToken).toBe("string");
    expect(newToken!.length).toBeGreaterThan(0);
  });

  it("returns a verifiable access token", async () => {
    const refreshToken = await generateRefreshToken("user-789");
    const getUserById = jest.fn(
      async (_id: string): Promise<JWTUser | null> => ({
        uid: "user-789",
        email: "refreshed@example.com",
        role: "admin",
      }),
    );

    const newToken = await refreshAccessToken(refreshToken, getUserById);
    const payload = await verifyToken(newToken!);
    expect(payload).not.toBeNull();
    expect(payload!.uid).toBe("user-789");
  });

  it("when getUserById returns null returns null", async () => {
    const refreshToken = await generateRefreshToken("user-999");
    const getUserById = jest.fn(async (): Promise<JWTUser | null> => null);

    const result = await refreshAccessToken(refreshToken, getUserById);
    expect(result).toBeNull();
  });

  it("with invalid refresh token returns null", async () => {
    const getUserById = jest.fn(async (): Promise<JWTUser | null> => testUser);
    const result = await refreshAccessToken("not-a-valid-token", getUserById);
    expect(result).toBeNull();
    expect(getUserById).not.toHaveBeenCalled();
  });

  it("with access token instead of refresh token returns null", async () => {
    const accessToken = await generateAccessToken(testUser);
    const getUserById = jest.fn(async (): Promise<JWTUser | null> => testUser);
    const result = await refreshAccessToken(accessToken, getUserById);
    expect(result).toBeNull();
  });
});

// ---------------------------------------------------------------------------
// extractTokenFromHeader
// ---------------------------------------------------------------------------
describe("extractTokenFromHeader", () => {
  it("with 'Bearer mytoken' returns 'mytoken'", () => {
    expect(extractTokenFromHeader("Bearer mytoken")).toBe("mytoken");
  });

  it("with a real JWT Bearer value extracts the token", async () => {
    const token = await generateAccessToken(testUser);
    const extracted = extractTokenFromHeader(`Bearer ${token}`);
    expect(extracted).toBe(token);
  });

  it("with null returns null", () => {
    expect(extractTokenFromHeader(null)).toBeNull();
  });

  it("with 'Basic mytoken' returns null (not Bearer)", () => {
    expect(extractTokenFromHeader("Basic mytoken")).toBeNull();
  });

  it("with empty string returns null", () => {
    expect(extractTokenFromHeader("")).toBeNull();
  });

  it("with just 'Bearer' (no token) returns empty string", () => {
    // "Bearer " prefix is stripped — what's left is ""
    const result = extractTokenFromHeader("Bearer ");
    expect(result).toBe("");
  });

  it("with random non-bearer string returns null", () => {
    expect(extractTokenFromHeader("Token abc123")).toBeNull();
  });
});
