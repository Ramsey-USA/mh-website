/**
 * @jest-environment node
 *
 * Tests for lib/auth/middleware.ts
 *
 * Mocks jwt.ts so we can control verifyToken behaviour without real JWTs.
 */

import { NextRequest, NextResponse } from "next/server";
import { requireAuth, requireRole } from "../middleware";

// ── Mocks ─────────────────────────────────────────────────────────────────────

const mockVerifyToken = jest.fn();
const mockExtractTokenFromHeader = jest.fn();

jest.mock("../jwt", () => ({
  verifyToken: (...args: unknown[]) => mockVerifyToken(...args),
  extractTokenFromHeader: (...args: unknown[]) =>
    mockExtractTokenFromHeader(...args),
}));

// Silence logger output during tests
jest.mock("@/lib/utils/logger", () => ({
  logger: { info: jest.fn(), warn: jest.fn(), error: jest.fn() },
}));

function makeReq(authHeader?: string) {
  return new NextRequest("http://localhost/api/test", {
    method: "GET",
    headers: authHeader ? { authorization: authHeader } : {},
  });
}

const okHandler = jest.fn(async () => NextResponse.json({ ok: true }));

// ── requireAuth ───────────────────────────────────────────────────────────────

describe("requireAuth()", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockExtractTokenFromHeader.mockReturnValue(null);
    mockVerifyToken.mockResolvedValue(null);
  });

  it("returns 401 when no authorization header present", async () => {
    const handler = requireAuth(okHandler);
    const res = await handler(makeReq());
    expect(res.status).toBe(401);
    expect(okHandler).not.toHaveBeenCalled();
  });

  it("returns 401 when extractTokenFromHeader returns null", async () => {
    mockExtractTokenFromHeader.mockReturnValue(null);
    const handler = requireAuth(okHandler);
    const res = await handler(makeReq("Bearer bad"));
    expect(res.status).toBe(401);
  });

  it("returns 401 when verifyToken returns null (invalid token)", async () => {
    mockExtractTokenFromHeader.mockReturnValue("some-token");
    mockVerifyToken.mockResolvedValue(null);
    const handler = requireAuth(okHandler);
    const res = await handler(makeReq("Bearer some-token"));
    expect(res.status).toBe(401);
    expect(okHandler).not.toHaveBeenCalled();
  });

  it("calls the inner handler with the validated user on success", async () => {
    const user = { uid: "u1", email: "a@b.com", role: "admin" };
    mockExtractTokenFromHeader.mockReturnValue("valid-token");
    mockVerifyToken.mockResolvedValue(user);

    const handler = requireAuth(okHandler);
    const res = await handler(makeReq("Bearer valid-token"));

    expect(res.status).toBe(200);
    expect(okHandler).toHaveBeenCalledWith(
      expect.any(NextRequest),
      user,
      undefined,
    );
  });
});

// ── requireRole ───────────────────────────────────────────────────────────────

describe("requireRole()", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("returns 401 when the user is not authenticated", async () => {
    mockExtractTokenFromHeader.mockReturnValue(null);
    const handler = requireRole(["admin"], okHandler);
    const res = await handler(makeReq());
    expect(res.status).toBe(401);
  });

  it("returns 403 when the user lacks the required role", async () => {
    const user = { uid: "u2", email: "u@b.com", role: "user" };
    mockExtractTokenFromHeader.mockReturnValue("token");
    mockVerifyToken.mockResolvedValue(user);

    const handler = requireRole(["admin"], okHandler);
    const res = await handler(makeReq("Bearer token"));
    expect(res.status).toBe(403);
    expect(okHandler).not.toHaveBeenCalled();
  });

  it("calls handler when user has the required role", async () => {
    const user = { uid: "u3", email: "a@c.com", role: "admin" };
    mockExtractTokenFromHeader.mockReturnValue("token");
    mockVerifyToken.mockResolvedValue(user);

    const handler = requireRole(["admin", "superadmin"], okHandler);
    const res = await handler(makeReq("Bearer token"));
    expect(res.status).toBe(200);
    expect(okHandler).toHaveBeenCalledWith(
      expect.any(NextRequest),
      user,
      undefined,
    );
  });

  it("returns 403 when user.role is undefined", async () => {
    const user = { uid: "u4" };
    mockExtractTokenFromHeader.mockReturnValue("token");
    mockVerifyToken.mockResolvedValue(user);

    const handler = requireRole(["admin"], okHandler);
    const res = await handler(makeReq("Bearer token"));
    expect(res.status).toBe(403);
  });
});
