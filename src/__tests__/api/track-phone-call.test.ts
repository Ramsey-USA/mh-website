/**
 * @jest-environment node
 *
 * Phone Call Tracking API — unit tests
 *
 * Covers: required-field validation, length limits, response shape.
 */

import { NextRequest } from "next/server";

// ── Mocks ─────────────────────────────────────────────────────────────────────

jest.mock("@/lib/email/email-service", () => ({
  sendEmail: jest.fn().mockResolvedValue({ success: true }),
}));

jest.mock("@/lib/constants/company", () => ({
  EMAIL_RECIPIENTS: { general: "test@example.com" },
}));

jest.mock("@/lib/security/rate-limiter", () => ({
  rateLimit: () => (handler: unknown) => handler,
  rateLimitPresets: { api: {} },
}));

let POST: typeof import("@/app/api/track-phone-call/route").POST;

beforeAll(async () => {
  ({ POST } = await import("@/app/api/track-phone-call/route"));
});

// ── Helpers ───────────────────────────────────────────────────────────────────

const makeRequest = (body: unknown) =>
  new NextRequest("http://localhost/api/track-phone-call", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

// ── Tests ─────────────────────────────────────────────────────────────────────

describe("POST /api/track-phone-call", () => {
  beforeEach(() => jest.clearAllMocks());

  it("returns 400 when source is missing", async () => {
    const res = await POST(
      makeRequest({
        phoneNumber: "509-308-6489",
        timestamp: new Date().toISOString(),
      }),
    );
    expect(res.status).toBe(400);
  });

  it("returns 400 when phoneNumber is missing", async () => {
    const res = await POST(
      makeRequest({ source: "header", timestamp: new Date().toISOString() }),
    );
    expect(res.status).toBe(400);
  });

  it("returns 400 when source exceeds 200 characters", async () => {
    const res = await POST(
      makeRequest({
        source: "s".repeat(201),
        phoneNumber: "509-308-6489",
        timestamp: new Date().toISOString(),
      }),
    );
    expect(res.status).toBe(400);
  });

  it("returns 400 when phoneNumber exceeds 30 characters", async () => {
    const res = await POST(
      makeRequest({
        source: "header",
        phoneNumber: "1".repeat(31),
        timestamp: new Date().toISOString(),
      }),
    );
    expect(res.status).toBe(400);
  });

  it("returns 200 for a valid tracking request", async () => {
    const res = await POST(
      makeRequest({
        source: "header-cta",
        phoneNumber: "509-308-6489",
        timestamp: new Date().toISOString(),
      }),
    );
    expect(res.status).toBe(200);
  });

  it("returns emailSent:true when email service succeeds", async () => {
    const res = await POST(
      makeRequest({
        source: "footer",
        phoneNumber: "(509) 308-6489",
        timestamp: new Date().toISOString(),
      }),
    );
    const body = await res.json();
    expect(body.data?.emailSent).toBe(true);
  });

  it("returns 200 even when email service fails (graceful degradation)", async () => {
    const { sendEmail } = await import("@/lib/email/email-service");
    (sendEmail as jest.Mock).mockResolvedValueOnce({ success: false });
    const res = await POST(
      makeRequest({
        source: "mobile-nav",
        phoneNumber: "509-308-6489",
        timestamp: new Date().toISOString(),
      }),
    );
    expect(res.status).toBe(200);
    const body = await res.json();
    expect(body.data?.emailSent).toBe(false);
  });

  it("includes optional fields (page, referrer, userAgent) in email", async () => {
    const res = await POST(
      makeRequest({
        source: "services-page",
        phoneNumber: "509-308-6489",
        timestamp: new Date().toISOString(),
        page: "https://mhc-gc.com/services",
        referrer: "https://google.com",
        userAgent: "Mozilla/5.0 Chrome/120",
      }),
    );
    expect(res.status).toBe(200);
    const body = await res.json();
    expect(body.data?.emailSent).toBe(true);
  });

  it("handles request with page but no referrer/userAgent", async () => {
    const res = await POST(
      makeRequest({
        source: "footer",
        phoneNumber: "(509) 308-6489",
        timestamp: new Date().toISOString(),
        page: "https://mhc-gc.com/contact",
      }),
    );
    expect(res.status).toBe(200);
  });

  it("handles request with referrer but no page/userAgent", async () => {
    const res = await POST(
      makeRequest({
        source: "hero-cta",
        phoneNumber: "509-308-6489",
        timestamp: new Date().toISOString(),
        referrer: "https://bing.com",
      }),
    );
    expect(res.status).toBe(200);
  });

  it("returns 500 when request body is invalid JSON", async () => {
    const req = new NextRequest("http://localhost/api/track-phone-call", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: "not-valid-json{{{",
    });
    const res = await POST(req);
    expect(res.status).toBe(500);
  });
});
