/**
 * @jest-environment node
 */

import { NextRequest, NextResponse } from "next/server";

const mockProcessRequest = jest.fn();
const mockApplyResponseSecurity = jest.fn();
const mockValidateInput = jest.fn();
const mockLogSecurityViolation = jest.fn();
const mockLogEvent = jest.fn();
const mockLogDataAccess = jest.fn();
const mockVerifyToken = jest.fn();
const mockExtractTokenFromHeader = jest.fn();

jest.mock("@/lib/security/security-manager", () => ({
  securityManager: {
    processRequest: mockProcessRequest,
    applyResponseSecurity: mockApplyResponseSecurity,
    validateInput: mockValidateInput,
  },
}));

jest.mock("@/lib/security/audit-logger", () => ({
  auditLogger: {
    logSecurityViolation: mockLogSecurityViolation,
    logEvent: mockLogEvent,
    logDataAccess: mockLogDataAccess,
  },
  AuditEventType: {
    ACCESS_DENIED: "ACCESS_DENIED",
    RATE_LIMIT_EXCEEDED: "RATE_LIMIT_EXCEEDED",
    ACCESS_GRANTED: "ACCESS_GRANTED",
    ERROR_OCCURRED: "ERROR_OCCURRED",
    XSS_ATTEMPT: "XSS_ATTEMPT",
  },
}));

jest.mock("@/lib/auth/jwt", () => ({
  verifyToken: mockVerifyToken,
  extractTokenFromHeader: mockExtractTokenFromHeader,
}));

let securityMiddleware: typeof import("../security").securityMiddleware;
let withSecurity: typeof import("../security").withSecurity;

beforeAll(async () => {
  ({ securityMiddleware, withSecurity } = await import("../security"));
});

beforeEach(() => {
  jest.clearAllMocks();
  mockApplyResponseSecurity.mockImplementation((response) => response);
  mockProcessRequest.mockResolvedValue({
    allowed: true,
    csrfToken: "csrf-token",
  });
  mockValidateInput.mockReturnValue({
    isValid: true,
    errors: [],
    sanitizedData: { safe: true },
  });
  mockExtractTokenFromHeader.mockImplementation(
    (header: string | null) => header?.replace("Bearer ", "") ?? null,
  );
});

function makeRequest(
  path: string,
  options?: {
    method?: string;
    headers?: Record<string, string>;
    body?: unknown;
  },
) {
  return new NextRequest(`http://localhost${path}`, {
    method: options?.method ?? "GET",
    ...(options?.headers && { headers: options.headers }),
    ...(options?.body !== undefined && { body: JSON.stringify(options.body) }),
  });
}

describe("securityMiddleware", () => {
  it("bypasses configured security-exempt paths", async () => {
    const response = await securityMiddleware(
      makeRequest("/api/security/status"),
    );

    expect(response.status).toBe(200);
    expect(mockProcessRequest).not.toHaveBeenCalled();
  });

  it("redirects HTML admin requests when admin authentication is missing", async () => {
    mockVerifyToken.mockResolvedValue(null);

    const response = await securityMiddleware(
      makeRequest("/admin", {
        headers: { accept: "text/html", authorization: "Bearer invalid" },
      }),
    );

    expect(response.status).toBe(307);
    expect(response.headers.get("location")).toBe("http://localhost/");
    expect(mockLogSecurityViolation).toHaveBeenCalled();
  });

  it("returns 401 JSON for non-HTML admin requests when admin auth is missing", async () => {
    mockVerifyToken.mockResolvedValue(null);

    const response = await securityMiddleware(
      makeRequest("/admin", {
        headers: { accept: "application/json" },
      }),
    );

    expect(response.status).toBe(401);
    expect(await response.json()).toEqual({
      error: "Admin authentication required",
    });
  });

  it("returns the security response when request processing denies access", async () => {
    mockProcessRequest.mockResolvedValue({
      allowed: false,
      response: NextResponse.json({ error: "blocked" }, { status: 429 }),
    });

    const response = await securityMiddleware(makeRequest("/api/contact"));

    expect(response.status).toBe(429);
    expect(mockLogSecurityViolation).toHaveBeenCalled();
  });

  it("applies response security and logs successful requests for logged routes", async () => {
    const response = await securityMiddleware(makeRequest("/api/contact"));

    expect(response.status).toBe(200);
    expect(mockApplyResponseSecurity).toHaveBeenCalled();
    expect(mockLogEvent).toHaveBeenCalledWith(
      "ACCESS_GRANTED",
      expect.objectContaining({
        source: "middleware",
        outcome: "success",
      }),
    );
  });

  it("falls back to basic security headers when middleware throws", async () => {
    mockProcessRequest.mockRejectedValue(new Error("boom"));

    const response = await securityMiddleware(makeRequest("/contact"));

    expect(response.headers.get("X-Frame-Options")).toBe("DENY");
    expect(response.headers.get("X-Content-Type-Options")).toBe("nosniff");
    expect(mockLogEvent).toHaveBeenCalledWith(
      "ERROR_OCCURRED",
      expect.objectContaining({ outcome: "failure" }),
    );
  });

  it("extracts cf-connecting-ip in securityMiddleware for IP logging", async () => {
    const response = await securityMiddleware(
      makeRequest("/contact", {
        headers: { "cf-connecting-ip": "5.6.7.8" },
      }),
    );

    expect(response.status).toBe(200);
    // logEvent is called for /contact (logAll=true route)
    expect(mockLogEvent).toHaveBeenCalledWith(
      "ACCESS_GRANTED",
      expect.objectContaining({ source: "middleware" }),
    );
  });

  it("falls back to x-forwarded-for in development for securityMiddleware", async () => {
    const original = process.env.NODE_ENV;
    Object.defineProperty(process.env, "NODE_ENV", {
      value: "development",
      writable: true,
      configurable: true,
    });

    const response = await securityMiddleware(
      makeRequest("/contact", {
        headers: { "x-forwarded-for": "192.168.1.1" },
      }),
    );

    expect(response.status).toBe(200);

    Object.defineProperty(process.env, "NODE_ENV", {
      value: original,
      writable: true,
      configurable: true,
    });
  });
});

describe("withSecurity", () => {
  it("returns 400 when JSON parsing fails", async () => {
    const wrapped = withSecurity(async () => NextResponse.json({ ok: true }));

    const request = new NextRequest("http://localhost/api/contact", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: "{not-json",
    });

    const response = await wrapped(request);

    expect(response.status).toBe(400);
    expect(await response.json()).toEqual({ error: "Invalid JSON data" });
  });

  it("returns 400 when JSON body fails validation", async () => {
    mockValidateInput.mockReturnValue({
      isValid: false,
      errors: ["bad payload"],
      sanitizedData: null,
    });

    const wrapped = withSecurity(async () => NextResponse.json({ ok: true }));
    const response = await wrapped(
      makeRequest("/api/contact", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: { input: "<script>" },
      }),
    );

    expect(response.status).toBe(400);
    expect(await response.json()).toEqual({
      error: "Invalid input data",
      details: ["bad payload"],
    });
  });

  it("passes sanitized JSON to the wrapped handler and logs data access", async () => {
    const wrapped = withSecurity(async (request) => {
      const body = await request.json();
      return NextResponse.json({ received: body });
    });

    const response = await wrapped(
      makeRequest("/api/contact", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: { unsafe: "<script>", safe: true },
      }),
    );

    expect(response.status).toBe(200);
    expect(await response.json()).toEqual({ received: { safe: true } });
    expect(mockLogDataAccess).toHaveBeenCalledWith(
      "/api/contact",
      "POST",
      undefined,
      "success",
      expect.objectContaining({ statusCode: 200 }),
    );
  });

  it("calls the handler regardless of processRequest result (gating is now middleware-only)", async () => {
    // withSecurity no longer calls processRequest; security gating is the
    // responsibility of the global middleware.  The handler is always reached.
    mockProcessRequest.mockResolvedValue({
      allowed: false,
      response: NextResponse.json({ error: "denied" }, { status: 403 }),
    });

    const handler = jest.fn(async () => NextResponse.json({ ok: true }));
    const wrapped = withSecurity(handler);
    const response = await wrapped(makeRequest("/api/contact"));

    expect(response.status).toBe(200);
    expect(handler).toHaveBeenCalled();
    expect(mockProcessRequest).not.toHaveBeenCalled();
  });

  it("returns 500 when the wrapped handler throws", async () => {
    const wrapped = withSecurity(async () => {
      throw new Error("handler failed");
    });

    const response = await wrapped(makeRequest("/api/contact"));

    expect(response.status).toBe(500);
    expect(await response.json()).toEqual({ error: "Internal server error" });
    expect(mockLogEvent).toHaveBeenCalledWith(
      "ERROR_OCCURRED",
      expect.objectContaining({ source: "api" }),
    );
  });

  it("uses cf-connecting-ip header for IP extraction when present", async () => {
    const wrapped = withSecurity(async () => NextResponse.json({ ok: true }));

    const response = await wrapped(
      makeRequest("/api/contact", {
        headers: { "cf-connecting-ip": "1.2.3.4" },
      }),
    );

    expect(response.status).toBe(200);
    expect(mockLogDataAccess).toHaveBeenCalled();
  });

  it("uses x-forwarded-for as fallback IP in development mode", async () => {
    const original = process.env.NODE_ENV;
    Object.defineProperty(process.env, "NODE_ENV", {
      value: "development",
      writable: true,
      configurable: true,
    });

    const wrapped = withSecurity(async () => NextResponse.json({ ok: true }));

    const response = await wrapped(
      makeRequest("/api/contact", {
        headers: { "x-forwarded-for": "10.0.0.1, 172.16.0.1" },
      }),
    );

    expect(response.status).toBe(200);

    Object.defineProperty(process.env, "NODE_ENV", {
      value: original,
      writable: true,
      configurable: true,
    });
  });

  it("converts a plain Response (non-NextResponse) returned by the handler", async () => {
    // Exercises: response instanceof NextResponse ? response : NextResponse.json(...)
    const wrapped = withSecurity(
      async () =>
        new Response(JSON.stringify({ plain: true }), {
          status: 201,
          headers: { "content-type": "application/json" },
        }),
    );

    const response = await wrapped(makeRequest("/api/contact"));
    expect(response.status).toBe(201);
  });
});
