/**
 * @jest-environment node
 *
 * Newsletter API — unit tests
 *
 * Covers: required field validation, email format validation, length limits,
 * successful submission response shape.
 */

import { NextRequest } from "next/server";

// ── Mocks ─────────────────────────────────────────────────────────────────────

jest.mock("@/lib/email/email-service", () => ({
  sendEmail: jest.fn().mockResolvedValue({ success: true }),
}));

jest.mock("@/lib/email/templates", () => ({
  generateNewsletterAcknowledgment: jest
    .fn()
    .mockReturnValue({ html: "<p>Thanks</p>", text: "Thanks" }),
}));

jest.mock("@/lib/db/env", () => ({
  getD1Database: jest.fn().mockReturnValue(null), // no DB in tests
}));

jest.mock("@/lib/db/client", () => ({
  createDbClient: jest.fn(),
}));

jest.mock("@/lib/security/rate-limiter", () => ({
  rateLimit: () => (handler: unknown) => handler,
  rateLimitPresets: { contact: {} },
}));

// Lazy import after mocks
let POST: typeof import("@/app/api/newsletter/route").POST;
let DELETE: typeof import("@/app/api/newsletter/route").DELETE;

beforeAll(async () => {
  ({ POST, DELETE } = await import("@/app/api/newsletter/route"));
});

// ── Helpers ───────────────────────────────────────────────────────────────────

const makeRequest = (body: unknown) =>
  new NextRequest("http://localhost/api/newsletter", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

// ── Tests ─────────────────────────────────────────────────────────────────────

describe("POST /api/newsletter", () => {
  beforeEach(() => jest.clearAllMocks());

  it("returns 400 when email is missing", async () => {
    const res = await POST(makeRequest({ name: "Alice" }));
    expect(res.status).toBe(400);
  });

  it("returns 400 for invalid email format", async () => {
    const res = await POST(makeRequest({ email: "not-an-email" }));
    expect(res.status).toBe(400);
    const body = await res.json();
    expect(body.error ?? body.message).toMatch(/invalid email/i);
  });

  it("returns 400 when email exceeds 254 characters", async () => {
    // 249 'a' chars + '@b.com' = 255 total > 254 limit
    const longEmail = "a".repeat(249) + "@b.com";
    const res = await POST(makeRequest({ email: longEmail }));
    expect(res.status).toBe(400);
  });

  it("returns 400 when name exceeds 200 characters", async () => {
    const res = await POST(
      makeRequest({ email: "test@example.com", name: "n".repeat(201) }),
    );
    expect(res.status).toBe(400);
  });

  it("returns 200 for a valid email-only subscription", async () => {
    const res = await POST(makeRequest({ email: "subscriber@example.com" }));
    expect(res.status).toBe(200);
  });

  it("returns 200 for a valid email + name subscription", async () => {
    const res = await POST(
      makeRequest({ email: "alice@example.com", name: "Alice" }),
    );
    expect(res.status).toBe(200);
  });

  it("returns success:true in response body", async () => {
    const res = await POST(makeRequest({ email: "ok@example.com" }));
    const body = await res.json();
    expect(body.success ?? body.ok).toBe(true);
  });

  it("returns 200 even when notification email fails", async () => {
    const { sendEmail } = require("@/lib/email/email-service");
    sendEmail
      .mockResolvedValueOnce({ success: false, error: "SMTP error" }) // notification fails
      .mockResolvedValueOnce({ success: true }); // acknowledgment succeeds
    const res = await POST(makeRequest({ email: "fail@example.com" }));
    expect(res.status).toBe(200);
  });

  it("returns 200 even when acknowledgment email fails", async () => {
    const { sendEmail } = require("@/lib/email/email-service");
    sendEmail
      .mockResolvedValueOnce({ success: true }) // notification succeeds
      .mockResolvedValueOnce({ success: false, error: "SMTP error" }); // acknowledgment fails
    const res = await POST(makeRequest({ email: "fail2@example.com" }));
    expect(res.status).toBe(200);
  });

  it("returns 500 on JSON parse error", async () => {
    const badReq = new NextRequest("http://localhost/api/newsletter", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: "{ invalid json }",
    });
    const res = await POST(badReq);
    expect(res.status).toBe(500);
  });

  it("persists subscription to DB when D1 is available", async () => {
    const mockQuery = jest.fn().mockResolvedValue(undefined);
    const { getD1Database } = require("@/lib/db/env");
    const { createDbClient } = require("@/lib/db/client");
    (getD1Database as jest.Mock).mockReturnValue({});
    (createDbClient as jest.Mock).mockReturnValue({ query: mockQuery });

    const res = await POST(makeRequest({ email: "db@example.com" }));
    expect(res.status).toBe(200);
    expect(mockQuery).toHaveBeenCalledWith(
      expect.stringContaining("INSERT INTO newsletter_subscribers"),
      expect.arrayContaining(["db@example.com"]),
    );

    (getD1Database as jest.Mock).mockReturnValue(null);
  });

  it("continues gracefully when DB query throws", async () => {
    const mockQuery = jest.fn().mockRejectedValue(new Error("DB down"));
    const { getD1Database } = require("@/lib/db/env");
    const { createDbClient } = require("@/lib/db/client");
    (getD1Database as jest.Mock).mockReturnValue({});
    (createDbClient as jest.Mock).mockReturnValue({ query: mockQuery });

    const res = await POST(makeRequest({ email: "dbfail@example.com" }));
    // Still 200 — DB error is swallowed
    expect(res.status).toBe(200);

    (getD1Database as jest.Mock).mockReturnValue(null);
  });
});

// ── DELETE /api/newsletter (unsubscribe) ────────────────────────────────────

const makeDeleteRequest = (token?: string) => {
  const url = token
    ? `http://localhost/api/newsletter?token=${token}`
    : "http://localhost/api/newsletter";
  return new NextRequest(url, { method: "DELETE" });
};

describe("DELETE /api/newsletter", () => {
  beforeEach(() => jest.clearAllMocks());

  it("returns 400 when token is missing", async () => {
    const res = await DELETE(makeDeleteRequest());
    expect(res.status).toBe(400);
    const body = await res.json();
    expect(body.error ?? body.message).toMatch(/token/i);
  });

  it("returns 400 when token has invalid format", async () => {
    const res = await DELETE(makeDeleteRequest("not-a-valid-hex-token"));
    expect(res.status).toBe(400);
  });

  it("returns 500 when DB is unavailable", async () => {
    // getD1Database already mocked to return null above
    const validToken = "a".repeat(32); // 32 hex chars
    const res = await DELETE(makeDeleteRequest(validToken));
    expect(res.status).toBe(500);
  });

  it("returns success with message when token is found in DB", async () => {
    const mockQuery = jest
      .fn()
      .mockResolvedValue([{ email: "user@example.com" }]);
    const { getD1Database } = require("@/lib/db/env");
    const { createDbClient } = require("@/lib/db/client");
    (getD1Database as jest.Mock).mockReturnValue({});
    (createDbClient as jest.Mock).mockReturnValue({ query: mockQuery });

    const validToken = "a".repeat(32);
    const res = await DELETE(makeDeleteRequest(validToken));
    expect(res.status).toBe(200);
    const body = await res.json();
    expect(body.data.unsubscribed).toBe(true);
    expect(body.data.message).toContain("successfully unsubscribed");

    (getD1Database as jest.Mock).mockReturnValue(null);
  });

  it("returns success without message when token is not found", async () => {
    const mockQuery = jest.fn().mockResolvedValue([]);
    const { getD1Database } = require("@/lib/db/env");
    const { createDbClient } = require("@/lib/db/client");
    (getD1Database as jest.Mock).mockReturnValue({});
    (createDbClient as jest.Mock).mockReturnValue({ query: mockQuery });

    const validToken = "b".repeat(32);
    const res = await DELETE(makeDeleteRequest(validToken));
    expect(res.status).toBe(200);
    const body = await res.json();
    expect(body.data.unsubscribed).toBe(true);
    expect(body.data.message).toBeUndefined();

    (getD1Database as jest.Mock).mockReturnValue(null);
  });

  it("returns 500 when DB query throws during unsubscribe", async () => {
    const mockQuery = jest.fn().mockRejectedValue(new Error("DB error"));
    const { getD1Database } = require("@/lib/db/env");
    const { createDbClient } = require("@/lib/db/client");
    (getD1Database as jest.Mock).mockReturnValue({});
    (createDbClient as jest.Mock).mockReturnValue({ query: mockQuery });

    const validToken = "c".repeat(32);
    const res = await DELETE(makeDeleteRequest(validToken));
    expect(res.status).toBe(500);

    (getD1Database as jest.Mock).mockReturnValue(null);
  });
});
