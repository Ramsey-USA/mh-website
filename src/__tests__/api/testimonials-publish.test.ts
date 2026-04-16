/**
 * @jest-environment node
 *
 * Testimonials Publish API — unit tests
 *
 * Covers:
 *   POST /api/testimonials/publish — trigger social media publish + optional email blast
 */

import { NextRequest } from "next/server";
import { authedHeaders } from "../helpers/api-test-utils";

// ── Mocks ─────────────────────────────────────────────────────────────────────

jest.mock("@/lib/auth/middleware", () => ({
  requireRole: jest.fn(
    (_roles: string[], handler: (req: NextRequest) => unknown) =>
      async (req: NextRequest) => {
        const auth = req.headers.get("Authorization");
        if (!auth) {
          const { NextResponse } =
            require("next/server") as typeof import("next/server");
          return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }
        return handler(req);
      },
  ),
}));

jest.mock("@/middleware/security", () => ({
  withSecurity: (handler: unknown) => handler,
}));

jest.mock("@/lib/notifications/n8n-webhook", () => ({
  sendToN8n: jest.fn().mockResolvedValue({ success: true }),
}));

jest.mock("@/lib/data/testimonials", () => ({
  getAllTestimonials: jest.fn().mockReturnValue([
    {
      id: "test-1",
      name: "John Client",
      quote: "Great work!",
      location: "Kennewick, WA",
      project: "Residential Remodel",
      company: null,
      rating: 5,
      type: "residential",
      category: "remodel",
      image: "/images/john.jpg",
      socialCard: null,
      projectPhoto: null,
    },
  ]),
}));

jest.mock("@/lib/api/responses", () => ({
  badRequest: jest.fn((msg: string) => {
    const { NextResponse } =
      require("next/server") as typeof import("next/server");
    return NextResponse.json({ error: msg }, { status: 400 });
  }),
  internalServerError: jest.fn((msg: string) => {
    const { NextResponse } =
      require("next/server") as typeof import("next/server");
    return NextResponse.json({ error: msg }, { status: 500 });
  }),
}));

jest.mock("@/lib/utils/logger", () => ({
  logger: {
    info: jest.fn(),
    warn: jest.fn(),
    error: jest.fn(),
    debug: jest.fn(),
  },
}));

jest.mock("@/lib/constants/company", () => ({
  COMPANY_INFO: { urls: { site: "https://www.mhc-gc.com" } },
}));

// ── Setup ─────────────────────────────────────────────────────────────────────

let POST: (req: NextRequest) => Promise<Response>;

beforeAll(async () => {
  ({ POST } = await import("@/app/api/testimonials/publish/route"));
});

const authedHeaders = { Authorization: "Bearer valid-token" };

const makeRequest = (body: unknown) =>
  new NextRequest("http://localhost/api/testimonials/publish", {
    method: "POST",
    headers: { "Content-Type": "application/json", ...authedHeaders },
    body: JSON.stringify(body),
  });

// ── Tests ─────────────────────────────────────────────────────────────────────

describe("POST /api/testimonials/publish", () => {
  beforeEach(() => jest.clearAllMocks());

  it("returns 401 when not authenticated", async () => {
    const req = new NextRequest("http://localhost/api/testimonials/publish", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        testimonialId: "test-1",
        platforms: ["facebook"],
      }),
    });
    const res = await POST(req);
    expect(res.status).toBe(401);
  });

  it("returns 400 when testimonialId is missing", async () => {
    const res = await POST(makeRequest({ platforms: ["facebook"] }));
    expect(res.status).toBe(400);
  });

  it("returns 400 when platforms array is empty", async () => {
    const res = await POST(
      makeRequest({ testimonialId: "test-1", platforms: [] }),
    );
    expect(res.status).toBe(400);
  });

  it("returns 400 when platforms is not an array", async () => {
    const res = await POST(
      makeRequest({ testimonialId: "test-1", platforms: "facebook" }),
    );
    expect(res.status).toBe(400);
  });

  it("returns 400 for unknown platform", async () => {
    const res = await POST(
      makeRequest({ testimonialId: "test-1", platforms: ["tiktok"] }),
    );
    expect(res.status).toBe(400);
  });

  it("returns 400 when testimonial ID is not found", async () => {
    const res = await POST(
      makeRequest({ testimonialId: "nonexistent", platforms: ["facebook"] }),
    );
    expect(res.status).toBe(400);
  });

  it("returns 200 on successful publish trigger", async () => {
    const res = await POST(
      makeRequest({
        testimonialId: "test-1",
        platforms: ["facebook", "linkedin"],
      }),
    );
    expect(res.status).toBe(200);
    const body = await res.json();
    expect(body.ok).toBe(true);
    expect(body.testimonialId).toBe("test-1");
    expect(body.platforms).toEqual(["facebook", "linkedin"]);
    expect(body.emailBlast).toBe(false);
  });

  it("includes emailBlast flag when provided", async () => {
    const { sendToN8n } = jest.requireMock(
      "@/lib/notifications/n8n-webhook",
    ) as { sendToN8n: jest.Mock };
    const res = await POST(
      makeRequest({
        testimonialId: "test-1",
        platforms: ["instagram"],
        emailBlast: true,
      }),
    );
    expect(res.status).toBe(200);
    expect(sendToN8n).toHaveBeenCalledWith(
      expect.objectContaining({
        data: expect.objectContaining({ emailBlast: true }),
      }),
    );
  });

  it("returns 202 with warning when n8n webhook fails", async () => {
    const { sendToN8n } = jest.requireMock(
      "@/lib/notifications/n8n-webhook",
    ) as { sendToN8n: jest.Mock };
    sendToN8n.mockResolvedValueOnce({ success: false, error: "timeout" });
    const res = await POST(
      makeRequest({ testimonialId: "test-1", platforms: ["twitter"] }),
    );
    expect(res.status).toBe(202);
    const body = await res.json();
    expect(body.ok).toBe(true);
    expect(body.warning).toMatch(/n8n/i);
    expect(body.testimonialId).toBe("test-1");
    expect(body.platforms).toEqual(["twitter"]);
  });

  it("returns 400 on malformed JSON body", async () => {
    const res = await POST(
      new NextRequest("http://localhost/api/testimonials/publish", {
        method: "POST",
        headers: { "Content-Type": "application/json", ...authedHeaders },
        body: "not valid {{ json",
      }),
    );
    expect([400, 500]).toContain(res.status);
  });

  it("only exports POST on publish route (no GET/PUT/DELETE)", async () => {
    const mod = await import("@/app/api/testimonials/publish/route");
    expect(mod.POST).toBeDefined();
    expect((mod as Record<string, unknown>).GET).toBeUndefined();
    expect((mod as Record<string, unknown>).PUT).toBeUndefined();
    expect((mod as Record<string, unknown>).DELETE).toBeUndefined();
  });
});
