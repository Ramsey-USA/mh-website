/**
 * @jest-environment node
 *
 * Admin Login API — unit tests
 *
 * Covers: missing fields → 400, invalid email → 401, wrong password → 401,
 * valid credentials → 200 + tokens, env var used when set.
 */

import { NextRequest } from "next/server";

// ── Mocks ────────────────────────────────────────────────────────────────────

jest.mock("@/lib/auth/jwt", () => ({
  generateTokenPair: jest.fn().mockResolvedValue({
    accessToken: "mock-access-token",
    refreshToken: "mock-refresh-token",
  }),
}));

jest.mock("@/lib/security/rate-limiter", () => ({
  rateLimit: () => (handler: unknown) => handler,
  rateLimitPresets: { strict: {} },
}));

jest.mock("@/lib/utils/logger", () => ({
  logger: {
    info: jest.fn(),
    warn: jest.fn(),
    error: jest.fn(),
    debug: jest.fn(),
  },
}));

const mockLogAccessEvent = jest.fn().mockResolvedValue(undefined);
jest.mock("@/lib/safety/log-access-event", () => ({
  logAccessEvent: (...args: unknown[]) => mockLogAccessEvent(...args),
}));

// ── Setup ─────────────────────────────────────────────────────────────────────

let POST: typeof import("@/app/api/auth/admin-login/route").POST;

beforeAll(async () => {
  ({ POST } = await import("@/app/api/auth/admin-login/route"));
});

const makeRequest = (body: unknown) =>
  new NextRequest("http://localhost/api/auth/admin-login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

// ── Tests ─────────────────────────────────────────────────────────────────────

describe("POST /api/auth/admin-login", () => {
  beforeEach(() => jest.clearAllMocks());

  it("returns 400 when email is missing", async () => {
    const res = await POST(makeRequest({ password: "secret" }));
    expect(res.status).toBe(400);
    const body = await res.json();
    expect(body.error).toMatch(/required/i);
  });

  it("returns 400 when password is missing", async () => {
    const res = await POST(makeRequest({ email: "matt@mhc-gc.com" }));
    expect(res.status).toBe(400);
    const body = await res.json();
    expect(body.error).toMatch(/required/i);
  });

  it("returns 401 when email is not an admin email", async () => {
    const res = await POST(
      makeRequest({ email: "unknown@example.com", password: "any" }),
    );
    expect(res.status).toBe(401);
    const body = await res.json();
    expect(body.error).toMatch(/invalid credentials/i);
  });

  it("returns 401 when password is wrong", async () => {
    process.env["ADMIN_MATT_PASSWORD"] = "correct-password";
    const res = await POST(
      makeRequest({ email: "matt@mhc-gc.com", password: "wrong-password" }),
    );
    expect(res.status).toBe(401);
    delete process.env["ADMIN_MATT_PASSWORD"];
  });

  it("returns 200 with tokens on valid credentials (env var path)", async () => {
    process.env["ADMIN_MATT_PASSWORD"] = "correct-password";

    const res = await POST(
      makeRequest({ email: "matt@mhc-gc.com", password: "correct-password" }),
    );
    expect(res.status).toBe(200);

    const body = await res.json();
    expect(body.success).toBe(true);
    expect(body.accessToken).toBe("mock-access-token");
    expect(body.user.email).toBe("matt@mhc-gc.com");
    expect(body.user.role).toBe("admin");
    expect(body.expiresIn).toBe(900);
    expect(mockLogAccessEvent).toHaveBeenCalledTimes(1);

    delete process.env["ADMIN_MATT_PASSWORD"];
  });

  it("normalises email to lowercase before comparison", async () => {
    process.env["ADMIN_MATT_PASSWORD"] = "correct-password";

    const res = await POST(
      makeRequest({ email: "MATT@MHC-GC.COM", password: "correct-password" }),
    );
    expect(res.status).toBe(200);

    delete process.env["ADMIN_MATT_PASSWORD"];
  });

  it("returns 200 for jeremy with correct credentials", async () => {
    process.env["ADMIN_JEREMY_PASSWORD"] = "jeremy-secret";

    const res = await POST(
      makeRequest({ email: "jeremy@mhc-gc.com", password: "jeremy-secret" }),
    );
    expect(res.status).toBe(200);
    const body = await res.json();
    expect(body.user.name).toBe("Jeremy");

    delete process.env["ADMIN_JEREMY_PASSWORD"];
  });
});
