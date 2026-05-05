/**
 * @jest-environment node
 *
 * Functions [functionName] API — unit tests
 *
 * Covers: invalid function name format → 400, unknown function → 404,
 * sendNotification without auth → 401, with auth → 200,
 * getUserData without auth → 401, with auth → 200.
 */

import { NextRequest } from "next/server";

// ── Mocks ────────────────────────────────────────────────────────────────────

const mockVerifyToken = jest.fn();
const mockSendNotification = jest.fn();

jest.mock("@/lib/auth/jwt", () => ({
  verifyToken: mockVerifyToken,
  extractTokenFromHeader: jest.fn((header: string | null) => {
    if (!header) return null;
    return header.replace("Bearer ", "");
  }),
}));

jest.mock("@/lib/notifications/notification-service", () => ({
  sendNotification: mockSendNotification,
}));

jest.mock("@/lib/security/rate-limiter", () => ({
  rateLimit: () => (handler: unknown) => handler,
  rateLimitPresets: { api: {} },
}));

jest.mock("@/lib/utils/logger", () => ({
  logger: {
    info: jest.fn(),
    warn: jest.fn(),
    error: jest.fn(),
    debug: jest.fn(),
  },
}));

// ── Setup ─────────────────────────────────────────────────────────────────────

let POST: typeof import("@/app/api/functions/[functionName]/route").POST;

beforeAll(async () => {
  ({ POST } = await import("@/app/api/functions/[functionName]/route"));
});

const makeContext = (functionName: string) => ({
  params: Promise.resolve({ functionName }),
});

const makeRequest = (body: unknown, withAuth = false) =>
  new NextRequest("http://localhost/api/functions/test", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...(withAuth ? { Authorization: "Bearer valid-token" } : {}),
    },
    body: JSON.stringify(body),
  });

const mockUser = {
  uid: "admin-matt",
  email: "matt@mhc-gc.com",
  role: "admin",
  name: "Matt",
};

const mockSuperUser = {
  uid: "field-1",
  email: "field@mhc-gc.com",
  role: "superintendent",
  name: "Field Lead",
};

// ── Tests ─────────────────────────────────────────────────────────────────────

describe("POST /api/functions/[functionName]", () => {
  beforeEach(() => jest.clearAllMocks());

  it("returns 400 for invalid function name format", async () => {
    const res = await POST(makeRequest({}), makeContext("../../etc/passwd"));
    expect(res.status).toBe(400);
    const body = await res.json();
    expect(body.error).toMatch(/invalid function name/i);
  });

  it("returns 400 for function name with spaces", async () => {
    const res = await POST(makeRequest({}), makeContext("send notification"));
    expect(res.status).toBe(400);
  });

  it("returns 404 for unknown function name", async () => {
    const res = await POST(makeRequest({}), makeContext("unknownFunction"));
    expect(res.status).toBe(404);
    const body = await res.json();
    expect(body.error).toMatch(/function not found/i);
  });

  it("returns 401 for sendNotification without auth token", async () => {
    const res = await POST(
      makeRequest({ recipient: "test@example.com", message: "Hello" }),
      makeContext("sendNotification"),
    );
    expect(res.status).toBe(401);
  });

  it("returns 400 for sendNotification with invalid payload", async () => {
    mockVerifyToken.mockResolvedValue(mockUser);

    const res = await POST(
      makeRequest({ recipient: "", message: "Hello" }, true),
      makeContext("sendNotification"),
    );
    expect(res.status).toBe(400);
    const body = await res.json();
    expect(body.error).toMatch(/recipient is required/i);
  });

  it("returns 200 for sendNotification with valid auth", async () => {
    mockVerifyToken.mockResolvedValue(mockUser);
    mockSendNotification.mockResolvedValue({
      success: true,
      messageId: "msg-123",
    });

    const res = await POST(
      makeRequest(
        { recipient: "test@example.com", message: "Hello", type: "email" },
        true,
      ),
      makeContext("sendNotification"),
    );
    expect(res.status).toBe(200);
    const body = await res.json();
    expect(body.success).toBe(true);
    expect(body.data.recipient).toBe("test@example.com");
  });

  it("returns 403 for sendNotification when role is not admin", async () => {
    mockVerifyToken.mockResolvedValue(mockSuperUser);

    const res = await POST(
      makeRequest({ recipient: "test@example.com", message: "Hello" }, true),
      makeContext("sendNotification"),
    );
    expect(res.status).toBe(403);
    const body = await res.json();
    expect(body.error).toMatch(/insufficient permissions/i);
  });

  it("returns 500 when sendNotification service fails", async () => {
    mockVerifyToken.mockResolvedValue(mockUser);
    mockSendNotification.mockResolvedValue({
      success: false,
      error: "SMTP error",
    });

    const res = await POST(
      makeRequest({ recipient: "test@example.com", message: "Hi" }, true),
      makeContext("sendNotification"),
    );
    expect(res.status).toBe(500);
  });

  it("returns 401 for getUserData without auth token", async () => {
    const res = await POST(
      makeRequest({ userId: "u1" }),
      makeContext("getUserData"),
    );
    expect(res.status).toBe(401);
  });

  it("returns 200 for getUserData with valid auth", async () => {
    mockVerifyToken.mockResolvedValue(mockUser);

    const res = await POST(
      makeRequest({ userId: "u1" }, true),
      makeContext("getUserData"),
    );
    expect(res.status).toBe(200);
    const body = await res.json();
    expect(body.data.uid).toBe("admin-matt");
    expect(body.data.email).toBe("matt@mhc-gc.com");
  });

  it("returns 200 for getUserData with superintendent role", async () => {
    mockVerifyToken.mockResolvedValue(mockSuperUser);

    const res = await POST(
      makeRequest({ userId: "u1" }, true),
      makeContext("getUserData"),
    );
    expect(res.status).toBe(200);
    const body = await res.json();
    expect(body.data.role).toBe("superintendent");
  });

  it("returns filtered fields when getUserData includes a fields array", async () => {
    mockVerifyToken.mockResolvedValue(mockUser);

    const res = await POST(
      makeRequest({ fields: ["email", "role"] }, true),
      makeContext("getUserData"),
    );
    expect(res.status).toBe(200);
    const body = await res.json();
    expect(body.data).toEqual({ email: "matt@mhc-gc.com", role: "admin" });
    expect(body.data.uid).toBeUndefined();
  });

  it("returns 400 for getUserData when fields include unsupported values", async () => {
    mockVerifyToken.mockResolvedValue(mockUser);

    const res = await POST(
      makeRequest({ fields: ["email", "passwordHash"] }, true),
      makeContext("getUserData"),
    );
    expect(res.status).toBe(400);
    const body = await res.json();
    expect(body.error).toMatch(/unsupported fields requested/i);
  });

  it("returns 400 when request body is malformed JSON", async () => {
    const req = new NextRequest(
      "http://localhost/api/functions/sendNotification",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: "not-json{{{",
      },
    );
    const res = await POST(req, makeContext("sendNotification"));
    expect(res.status).toBe(400);
  });
});
