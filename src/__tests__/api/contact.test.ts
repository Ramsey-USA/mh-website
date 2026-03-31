/**
 * @jest-environment node
 *
 * Contact API — unit tests
 *
 * Covers: missing required fields → 400, length limits, email format,
 * successful submission → 200, admin GET auth guard.
 */

import { NextRequest } from "next/server";

// ── Mocks ────────────────────────────────────────────────────────────────────

const mockSendEmail = jest.fn();

jest.mock("@/lib/email/email-service", () => ({
  sendEmail: mockSendEmail,
}));

jest.mock("@/lib/db/env", () => ({
  getD1Database: jest.fn().mockReturnValue(null), // DB unavailable — best-effort
}));

jest.mock("@/lib/db/client", () => ({
  createDbClient: jest.fn(),
}));

jest.mock("@/lib/auth/middleware", () => ({
  requireRole: jest.fn(
    (_roles: string[], handler: (req: NextRequest) => unknown) =>
      async (req: NextRequest) => {
        const { NextResponse } =
          require("next/server") as typeof import("next/server");
        if (!req.headers.get("Authorization")) {
          return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }
        return handler(req);
      },
  ),
}));

jest.mock("@/middleware/security", () => ({
  withSecurity: jest.fn((handler: unknown) => handler),
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

let POST: typeof import("@/app/api/contact/route").POST;
let GET: typeof import("@/app/api/contact/route").GET;

beforeAll(async () => {
  ({ POST, GET } = await import("@/app/api/contact/route"));
});

const makePostRequest = (body: unknown) =>
  new NextRequest("http://localhost/api/contact", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

const validBody = {
  name: "Jane Doe",
  email: "jane@example.com",
  message: "I would like to discuss a project.",
};

// ── Tests ─────────────────────────────────────────────────────────────────────

describe("POST /api/contact", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockSendEmail.mockResolvedValue({ success: true });
  });

  it("returns 400 when name is missing", async () => {
    const res = await POST(
      makePostRequest({ email: "jane@example.com", message: "Hi" }),
    );
    expect(res.status).toBe(400);
  });

  it("returns 400 when email is missing", async () => {
    const res = await POST(makePostRequest({ name: "Jane", message: "Hi" }));
    expect(res.status).toBe(400);
  });

  it("returns 400 when message is missing", async () => {
    const res = await POST(
      makePostRequest({ name: "Jane", email: "jane@example.com" }),
    );
    expect(res.status).toBe(400);
  });

  it("returns 400 when email format is invalid", async () => {
    const res = await POST(
      makePostRequest({ ...validBody, email: "not-an-email" }),
    );
    expect(res.status).toBe(400);
    const body = await res.json();
    expect(body.error).toContain("Invalid email");
  });

  it("returns 400 when name exceeds 200 chars", async () => {
    const res = await POST(
      makePostRequest({ ...validBody, name: "N".repeat(201) }),
    );
    expect(res.status).toBe(400);
  });

  it("returns 400 when message exceeds 5000 chars", async () => {
    const res = await POST(
      makePostRequest({ ...validBody, message: "m".repeat(5001) }),
    );
    expect(res.status).toBe(400);
  });

  it("returns 400 when phone exceeds 30 chars", async () => {
    const res = await POST(
      makePostRequest({ ...validBody, phone: "5".repeat(31) }),
    );
    expect(res.status).toBe(400);
  });

  it("returns 200 with emailSent:true on valid submission", async () => {
    const res = await POST(makePostRequest(validBody));
    expect(res.status).toBe(200);

    const body = await res.json();
    expect(body.success).toBe(true);
    expect(body.data?.emailSent).toBe(true);
    expect(mockSendEmail).toHaveBeenCalledTimes(1);
  });

  it("returns 200 with emailSent:false when email service fails", async () => {
    mockSendEmail.mockResolvedValue({ success: false, error: "SMTP error" });

    const res = await POST(makePostRequest(validBody));
    expect(res.status).toBe(200);

    const body = await res.json();
    expect(body.data?.emailSent).toBe(false);
  });

  it("rejects non-allowlisted recipientEmail silently (uses default)", async () => {
    const res = await POST(
      makePostRequest({
        ...validBody,
        recipientEmail: "attacker@evil.com",
      }),
    );
    // Still succeeds — bad recipientEmail is ignored, default is used
    expect(res.status).toBe(200);
    const [[firstArg]] = (mockSendEmail as jest.Mock).mock.calls;
    expect(firstArg.to).not.toContain("attacker@evil.com");
  });

  it("covers phone and metadata branches in email generation", async () => {
    // phone triggers <tr> phone block in generateEmailHTML
    // metadata triggers formatFieldName and the metadata table rows
    const res = await POST(
      makePostRequest({
        ...validBody,
        phone: "509-308-6489",
        metadata: { projectType: "Commercial", timeline: "6 months" },
      }),
    );
    expect(res.status).toBe(200);
    // Verify sendEmail was called with html/text containing the phone
    const [[emailArgs]] = (mockSendEmail as jest.Mock).mock.calls;
    expect(emailArgs.html).toContain("509-308-6489");
    expect(emailArgs.text).toContain("Project Type");
  });

  it("uses allowlisted recipientEmail when provided (double-recipient path)", async () => {
    const res = await POST(
      makePostRequest({
        ...validBody,
        recipientEmail: "matt@mhc-gc.com",
      }),
    );
    expect(res.status).toBe(200);
    const [[emailArgs]] = (mockSendEmail as jest.Mock).mock.calls;
    expect(Array.isArray(emailArgs.to)).toBe(true);
    expect(emailArgs.to).toContain("matt@mhc-gc.com");
  });

  it("routes to single recipient for acknowledgment type", async () => {
    const res = await POST(
      makePostRequest({ ...validBody, type: "acknowledgment" }),
    );
    expect(res.status).toBe(200);
    const [[emailArgs]] = (mockSendEmail as jest.Mock).mock.calls;
    // Acknowledgment only sends to the single recipientEmail
    expect(emailArgs.to).toHaveLength(1);
  });

  it("routes to three recipients for job-application type", async () => {
    const res = await POST(
      makePostRequest({ ...validBody, type: "job-application" }),
    );
    expect(res.status).toBe(200);
    const [[emailArgs]] = (mockSendEmail as jest.Mock).mock.calls;
    expect(emailArgs.to).toHaveLength(3);
    expect(emailArgs.to).toContain("matt@mhc-gc.com");
    expect(emailArgs.to).toContain("arnold@mhc-gc.com");
  });

  it("stores submission in DB when D1 is available", async () => {
    const mockInsert = jest.fn().mockResolvedValue(undefined);
    const { getD1Database } = require("@/lib/db/env");
    const { createDbClient } = require("@/lib/db/client");
    (getD1Database as jest.Mock).mockReturnValue({});
    (createDbClient as jest.Mock).mockReturnValue({ insert: mockInsert });

    const res = await POST(makePostRequest(validBody));
    expect(res.status).toBe(200);
    expect(mockInsert).toHaveBeenCalledWith(
      "contact_submissions",
      expect.objectContaining({
        first_name: "Jane",
        last_name: "Doe",
        email: "jane@example.com",
      }),
    );

    (getD1Database as jest.Mock).mockReturnValue(null);
  });

  it("continues gracefully when DB insert throws", async () => {
    const mockInsert = jest.fn().mockRejectedValue(new Error("DB down"));
    const { getD1Database } = require("@/lib/db/env");
    const { createDbClient } = require("@/lib/db/client");
    (getD1Database as jest.Mock).mockReturnValue({});
    (createDbClient as jest.Mock).mockReturnValue({ insert: mockInsert });

    const res = await POST(makePostRequest(validBody));
    // Still returns 200 — best-effort pattern
    expect(res.status).toBe(200);
    const { logger } = require("@/lib/utils/logger");
    expect(logger.error).toHaveBeenCalledWith(
      "Failed to store contact submission in database:",
      expect.any(Error),
    );

    (getD1Database as jest.Mock).mockReturnValue(null);
  });

  it("returns 500 for malformed JSON body", async () => {
    const req = new NextRequest("http://localhost/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: "not-json{{{",
    });
    const res = await POST(req);
    expect(res.status).toBe(500);
  });
});

describe("GET /api/contact", () => {
  it("returns 401 without Authorization header", async () => {
    const res = await GET(
      new NextRequest("http://localhost/api/contact", { method: "GET" }),
    );
    expect(res.status).toBe(401);
  });

  it("returns 200 with valid Authorization header (no-DB fallback path)", async () => {
    const res = await GET(
      new NextRequest("http://localhost/api/contact", {
        method: "GET",
        headers: { Authorization: "Bearer valid-token" },
      }),
    );
    expect(res.status).toBe(200);
    const body = await res.json();
    expect(body.success).toBe(true);
  });

  it("returns submissions from DB when D1 is available", async () => {
    const mockQuery = jest
      .fn()
      .mockResolvedValue([
        { id: "1", first_name: "Jane", email: "jane@example.com" },
      ]);
    const { getD1Database } = require("@/lib/db/env");
    const { createDbClient } = require("@/lib/db/client");
    (getD1Database as jest.Mock).mockReturnValue({});
    (createDbClient as jest.Mock).mockReturnValue({ query: mockQuery });

    const res = await GET(
      new NextRequest("http://localhost/api/contact", {
        method: "GET",
        headers: { Authorization: "Bearer valid-token" },
      }),
    );
    expect(res.status).toBe(200);
    const body = await res.json();
    expect(body.data).toHaveLength(1);

    (getD1Database as jest.Mock).mockReturnValue(null);
  });

  it("falls back to empty array when DB query throws", async () => {
    const mockQuery = jest.fn().mockRejectedValue(new Error("DB error"));
    const { getD1Database } = require("@/lib/db/env");
    const { createDbClient } = require("@/lib/db/client");
    (getD1Database as jest.Mock).mockReturnValue({});
    (createDbClient as jest.Mock).mockReturnValue({ query: mockQuery });

    const res = await GET(
      new NextRequest("http://localhost/api/contact", {
        method: "GET",
        headers: { Authorization: "Bearer valid-token" },
      }),
    );
    expect(res.status).toBe(200);
    const body = await res.json();
    // Falls through to fallback
    expect(body.data).toHaveLength(0);

    (getD1Database as jest.Mock).mockReturnValue(null);
  });
});
