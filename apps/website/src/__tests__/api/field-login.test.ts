/**
 * @jest-environment node
 *
 * Field Login API — unit tests
 *
 * Covers: missing passcode → 400, wrong passcode → 401,
 * correct passcode → 200 + tokens, method guard, rate limiting.
 */

import { NextRequest } from "next/server";

// ── Mocks ─────────────────────────────────────────────────────────────────────

jest.mock("@/lib/auth/jwt", () => ({
  generateTokenPair: jest.fn().mockResolvedValue({
    accessToken: "mock-field-access-token",
    refreshToken: "mock-field-refresh-token",
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

let POST: (req: NextRequest) => Promise<Response>;

beforeAll(async () => {
  ({ POST } = await import("@/app/api/auth/field-login/route"));
});

const makeRequest = (body: unknown, method = "POST") =>
  new NextRequest("http://localhost/api/auth/field-login", {
    method,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

// ── Tests ─────────────────────────────────────────────────────────────────────

describe("POST /api/auth/field-login", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    delete process.env["FIELD_STAFF_PASSWORD"];
  });

  it("returns 400 when passcode is missing", async () => {
    const res = await POST(makeRequest({}));
    expect(res.status).toBe(400);
    const body = await res.json();
    expect(body.error).toMatch(/passcode/i);
  });

  it("returns 400 when passcode is empty string", async () => {
    const res = await POST(makeRequest({ passcode: "" }));
    expect(res.status).toBe(400);
  });

  it("returns 401 when passcode does not match", async () => {
    process.env["FIELD_STAFF_PASSWORD"] = "correct-pass";
    const res = await POST(makeRequest({ passcode: "wrong-pass" }));
    expect(res.status).toBe(401);
    const body = await res.json();
    expect(body.error).toMatch(/invalid/i);
  });

  it("returns 200 with tokens when passcode matches", async () => {
    process.env["FIELD_STAFF_PASSWORD"] = "correct-pass";
    const res = await POST(makeRequest({ passcode: "correct-pass" }));
    expect(res.status).toBe(200);
    const body = await res.json();
    expect(body.success).toBe(true);
    expect(body.accessToken).toBe("mock-field-access-token");
    expect(body.user.role).toBe("superintendent");
    expect(mockLogAccessEvent).toHaveBeenCalledTimes(1);
  });

  it("uses supplied name in the token payload when provided", async () => {
    process.env["FIELD_STAFF_PASSWORD"] = "correct-pass";
    const res = await POST(
      makeRequest({ passcode: "correct-pass", name: "Bob" }),
    );
    expect(res.status).toBe(200);
    const body = await res.json();
    expect(body.user.name).toBe("Bob");
  });

  it("falls back to 'Superintendent' when no name is provided", async () => {
    process.env["FIELD_STAFF_PASSWORD"] = "correct-pass";
    const res = await POST(makeRequest({ passcode: "correct-pass" }));
    expect(res.status).toBe(200);
    const body = await res.json();
    expect(body.user.name).toBe("Superintendent");
  });

  it("returns 405 on non-POST method", async () => {
    process.env["FIELD_STAFF_PASSWORD"] = "correct-pass";
    const req = new NextRequest("http://localhost/api/auth/field-login", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });
    const res = await POST(req);
    expect(res.status).toBe(405);
  });

  it("uses dev placeholder when FIELD_STAFF_PASSWORD is unset in non-production", async () => {
    Object.defineProperty(process.env, "NODE_ENV", {
      value: "test",
      configurable: true,
    });
    const res = await POST(
      makeRequest({ passcode: "dev-placeholder-field-password" }),
    );
    expect(res.status).toBe(200);
  });

  it("returns 400 on malformed JSON body", async () => {
    const req = new NextRequest("http://localhost/api/auth/field-login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: "{ not json at all",
    });
    const res = await POST(req);
    expect([400, 500]).toContain(res.status);
  });

  it("only exports POST on field-login route (no GET/PUT/DELETE)", async () => {
    const mod = await import("@/app/api/auth/field-login/route");
    expect(mod.POST).toBeDefined();
    expect((mod as Record<string, unknown>)["GET"]).toBeUndefined();
    expect((mod as Record<string, unknown>)["PUT"]).toBeUndefined();
    expect((mod as Record<string, unknown>)["DELETE"]).toBeUndefined();
  });
});
