/**
 * @jest-environment node
 *
 * Hub Login API - unit tests
 *
 * Covers: role validation, passcode validation, worker/traveler success paths,
 * role-based refresh cookie behavior, and method guard.
 */

import { NextRequest } from "next/server";

jest.mock("@/lib/auth/jwt", () => ({
  generateTokenPair: jest.fn().mockResolvedValue({
    accessToken: "mock-hub-access-token",
    refreshToken: "mock-hub-refresh-token",
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

let POST: (req: NextRequest) => Promise<Response>;

beforeAll(async () => {
  ({ POST } = await import("@/app/api/auth/hub-login/route"));
});

const makeRequest = (body: unknown, method = "POST") =>
  new NextRequest("http://localhost/api/auth/hub-login", {
    method,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

describe("POST /api/auth/hub-login", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    delete process.env["WORKER_PASSWORD"];
    delete process.env["TRAVELERS_PASSWORD"];
  });

  it("returns 400 when role is missing", async () => {
    const res = await POST(makeRequest({ passcode: "abc123" }));
    expect(res.status).toBe(400);
    const body = await res.json();
    expect(body.error).toMatch(/role/i);
  });

  it("returns 400 when role is invalid", async () => {
    const res = await POST(
      makeRequest({ role: "superintendent", passcode: "abc123" }),
    );
    expect(res.status).toBe(400);
  });

  it("returns 400 when passcode is missing", async () => {
    const res = await POST(makeRequest({ role: "worker" }));
    expect(res.status).toBe(400);
    const body = await res.json();
    expect(body.error).toMatch(/passcode/i);
  });

  it("returns 401 when worker passcode is incorrect", async () => {
    process.env["WORKER_PASSWORD"] = "correct-worker-pass";
    const res = await POST(
      makeRequest({ role: "worker", passcode: "wrong-worker-pass" }),
    );
    expect(res.status).toBe(401);
  });

  it("returns 200 for worker when passcode matches", async () => {
    process.env["WORKER_PASSWORD"] = "correct-worker-pass";

    const res = await POST(
      makeRequest({ role: "worker", passcode: "correct-worker-pass" }),
    );
    expect(res.status).toBe(200);

    const body = await res.json();
    expect(body.success).toBe(true);
    expect(body.accessToken).toBe("mock-hub-access-token");
    expect(body.user.role).toBe("worker");
    expect(body.user.name).toBe("Field Worker");
    expect(mockLogAccessEvent).toHaveBeenCalledTimes(1);

    const setCookie = res.headers.get("set-cookie") ?? "";
    expect(setCookie).toMatch(/mh_worker_refresh_token/);
  });

  it("returns 200 for traveler when passcode matches", async () => {
    process.env["TRAVELERS_PASSWORD"] = "correct-traveler-pass";

    const res = await POST(
      makeRequest({ role: "traveler", passcode: "correct-traveler-pass" }),
    );
    expect(res.status).toBe(200);

    const body = await res.json();
    expect(body.success).toBe(true);
    expect(body.accessToken).toBe("mock-hub-access-token");
    expect(body.user.role).toBe("traveler");
    expect(body.user.name).toBe("Travelers Insurance");
    expect(mockLogAccessEvent).toHaveBeenCalledTimes(1);

    const setCookie = res.headers.get("set-cookie") ?? "";
    expect(setCookie).toMatch(/mh_traveler_refresh_token/);
  });

  it("uses worker dev placeholder when WORKER_PASSWORD is unset in test", async () => {
    const res = await POST(
      makeRequest({
        role: "worker",
        passcode: "dev-placeholder-worker-password",
      }),
    );
    expect(res.status).toBe(200);
  });

  it("uses traveler dev placeholder when TRAVELERS_PASSWORD is unset in test", async () => {
    const res = await POST(
      makeRequest({
        role: "traveler",
        passcode: "dev-placeholder-travelers-password",
      }),
    );
    expect(res.status).toBe(200);
  });

  it("returns 405 on non-POST method", async () => {
    const req = new NextRequest("http://localhost/api/auth/hub-login", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });
    const res = await POST(req);
    expect(res.status).toBe(405);
  });
});
