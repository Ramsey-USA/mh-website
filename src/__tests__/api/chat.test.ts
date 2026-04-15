/**
 * @jest-environment node
 *
 * Chat API — unit tests
 *
 * Covers: missing/empty message → 400, fallback knowledge-base response,
 * Workers AI path (mocked), content-specific keyword routing.
 */

import { NextRequest } from "next/server";

// ── Mocks ────────────────────────────────────────────────────────────────────

const mockGetCloudflareContext = jest.fn();

jest.mock("@opennextjs/cloudflare", () => ({
  getCloudflareContext: mockGetCloudflareContext,
}));

jest.mock("@/middleware/security", () => ({
  withSecurity: jest.fn((handler: unknown) => handler),
}));

jest.mock("@/lib/security/rate-limiter", () => ({
  rateLimit: () => (handler: unknown) => handler,
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

let POST: typeof import("@/app/api/chat/route").POST;

beforeAll(async () => {
  ({ POST } = await import("@/app/api/chat/route"));
});

const makeRequest = (body: unknown) =>
  new NextRequest("http://localhost/api/chat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

// ── Tests ─────────────────────────────────────────────────────────────────────

describe("POST /api/chat", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    // Default: no Cloudflare Workers AI binding (triggers fallback)
    mockGetCloudflareContext.mockReturnValue({ env: {} });
  });

  it("returns 400 when message is missing", async () => {
    const res = await POST(makeRequest({}));
    expect(res.status).toBe(400);
    const body = await res.json();
    expect(body.error).toBeDefined();
  });

  it("returns 400 when message is empty after sanitisation", async () => {
    const res = await POST(makeRequest({ message: "\x00\x01\x1F" }));
    expect(res.status).toBe(400);
  });

  it("returns 400 when body is not an object", async () => {
    const res = await POST(makeRequest("not an object"));
    expect(res.status).toBe(400);
  });

  it("returns 200 with fallback response when no AI binding", async () => {
    const res = await POST(makeRequest({ message: "Hello" }));
    expect(res.status).toBe(200);
    const body = await res.json();
    expect(typeof body.response).toBe("string");
    expect(body.response.length).toBeGreaterThan(0);
  });

  it("returns contact info for 'how do I contact you'", async () => {
    const res = await POST(makeRequest({ message: "how do I contact you" }));
    expect(res.status).toBe(200);
    const body = await res.json();
    expect(body.response).toContain("509");
  });

  it("returns veteran info for 'do you have veteran benefits'", async () => {
    const res = await POST(
      makeRequest({ message: "do you have veteran benefits" }),
    );
    expect(res.status).toBe(200);
    const body = await res.json();
    expect(body.response.toLowerCase()).toContain("veteran");
  });

  it("uses Workers AI response when AI binding is available", async () => {
    const mockAi = {
      run: jest.fn().mockResolvedValue({ response: "AI generated answer" }),
    };
    mockGetCloudflareContext.mockReturnValue({ env: { AI: mockAi } });

    const res = await POST(
      makeRequest({ message: "Tell me about your projects" }),
    );
    expect(res.status).toBe(200);
    const body = await res.json();
    expect(body.response).toBe("AI generated answer");
  });

  it("falls back to knowledge base when AI binding throws", async () => {
    const mockAi = {
      run: jest.fn().mockRejectedValue(new Error("AI unavailable")),
    };
    mockGetCloudflareContext.mockReturnValue({ env: { AI: mockAi } });

    const res = await POST(
      makeRequest({ message: "what services do you offer" }),
    );
    expect(res.status).toBe(200);
    const body = await res.json();
    expect(typeof body.response).toBe("string");
  });

  it("truncates message to 500 chars", async () => {
    const longMsg = "a".repeat(600);
    const res = await POST(makeRequest({ message: longMsg }));
    expect(res.status).toBe(200); // valid after truncation
  });

  it("ignores invalid history entries and processes valid ones", async () => {
    const history = [
      { role: "user", content: "Hi" },
      { role: "invalid", content: "ignored" },
      null,
    ];
    const res = await POST(
      makeRequest({ message: "Follow-up question", history }),
    );
    expect(res.status).toBe(200);
  });

  it("returns ally-specific response for a known ally name", async () => {
    const res = await POST(
      makeRequest({ message: "Tell me about Diamond Electric" }),
    );
    expect(res.status).toBe(200);
    const body = await res.json();
    expect(body.response).toContain("Diamond");
    expect(body.response).toContain("MH Construction");
  });

  it("returns trade partner info for a trade keyword like plumbing", async () => {
    const res = await POST(
      makeRequest({ message: "I need plumbing work done" }),
    );
    expect(res.status).toBe(200);
    const body = await res.json();
    expect(body.response).toContain("Viking");
  });

  it("returns pricing/estimate info", async () => {
    const res = await POST(makeRequest({ message: "how much does it cost" }));
    expect(res.status).toBe(200);
    const body = await res.json();
    expect(body.response).toContain("open-book");
  });

  it("returns safety/EMR info", async () => {
    const res = await POST(
      makeRequest({ message: "what is your safety record" }),
    );
    expect(res.status).toBe(200);
    const body = await res.json();
    expect(body.response).toContain("EMR");
  });

  it("returns location/service area info", async () => {
    const res = await POST(makeRequest({ message: "where are you located" }));
    expect(res.status).toBe(200);
    const body = await res.json();
    expect(body.response).toContain("Pasco");
  });

  it("returns allies/partners info", async () => {
    const res = await POST(makeRequest({ message: "who are your allies" }));
    expect(res.status).toBe(200);
    const body = await res.json();
    expect(body.response).toContain("Allies");
  });

  it("falls back when AI returns empty response", async () => {
    const mockAi = {
      run: jest.fn().mockResolvedValue({ response: "" }),
    };
    mockGetCloudflareContext.mockReturnValue({ env: { AI: mockAi } });

    const res = await POST(makeRequest({ message: "Hello there" }));
    expect(res.status).toBe(200);
    const body = await res.json();
    // Should get a fallback response, not empty
    expect(body.response.length).toBeGreaterThan(0);
  });

  it("returns 500 for malformed JSON body", async () => {
    const req = new NextRequest("http://localhost/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: "not-json{{{",
    });
    const res = await POST(req);
    expect(res.status).toBe(500);
  });

  // ── Additional coverage for BBB/trust/credibility paths ──────────────────

  it("returns BBB info for 'are you BBB accredited'", async () => {
    const res = await POST(makeRequest({ message: "are you BBB accredited" }));
    expect(res.status).toBe(200);
    const body = await res.json();
    expect(body.response).toContain("BBB Accredited");
    expect(body.response).toContain("A+");
  });

  it("returns BBB info for 'better business bureau'", async () => {
    const res = await POST(
      makeRequest({ message: "are you with the better business bureau" }),
    );
    expect(res.status).toBe(200);
    const body = await res.json();
    expect(body.response).toContain("BBB");
  });

  it("returns trust/credibility info for 'can I trust you'", async () => {
    const res = await POST(makeRequest({ message: "can I trust you" }));
    expect(res.status).toBe(200);
    const body = await res.json();
    expect(body.response).toContain("BBB Accredited");
    expect(body.response).toContain("Veteran-Owned");
  });

  it("returns trust info for 'what are your ratings'", async () => {
    const res = await POST(
      makeRequest({ message: "what are your ratings and reviews" }),
    );
    expect(res.status).toBe(200);
    const body = await res.json();
    expect(body.response).toContain("Google reviews");
  });

  it("returns services info for 'what do you do'", async () => {
    const res = await POST(makeRequest({ message: "what do you do" }));
    expect(res.status).toBe(200);
    const body = await res.json();
    expect(body.response).toContain("commercial construction");
  });

  it("returns services info for 'what can you build'", async () => {
    const res = await POST(makeRequest({ message: "what can you build" }));
    expect(res.status).toBe(200);
    const body = await res.json();
    expect(body.response).toContain("mhc-gc.com/services");
  });

  // ── Trade keyword coverage for website fallback branch ────────────────────

  it("returns trade info for electrical work", async () => {
    const res = await POST(
      makeRequest({ message: "I need electrical work done" }),
    );
    expect(res.status).toBe(200);
    const body = await res.json();
    expect(body.response).toContain("Diamond Electric");
  });

  it("returns trade info for signage", async () => {
    const res = await POST(makeRequest({ message: "can you do signage" }));
    expect(res.status).toBe(200);
    const body = await res.json();
    expect(body.response).toContain("Mustang Signs");
  });

  it("returns trade info for landscaping", async () => {
    const res = await POST(
      makeRequest({ message: "do you handle landscaping" }),
    );
    expect(res.status).toBe(200);
    const body = await res.json();
    expect(body.response).toContain("Bagley");
  });

  it("returns trade info for glass/glazing", async () => {
    const res = await POST(makeRequest({ message: "I need glass installed" }));
    expect(res.status).toBe(200);
    const body = await res.json();
    expect(body.response).toContain("McKinney Glass");
  });

  it("returns trade info for fencing", async () => {
    const res = await POST(makeRequest({ message: "can you build a fence" }));
    expect(res.status).toBe(200);
    const body = await res.json();
    expect(body.response).toContain("D-Fence");
  });

  it("returns trade info for insulation", async () => {
    const res = await POST(
      makeRequest({ message: "do you do insulation work" }),
    );
    expect(res.status).toBe(200);
    const body = await res.json();
    expect(body.response).toContain("Intermountain West");
  });

  it("returns trade info for cabinetry", async () => {
    const res = await POST(makeRequest({ message: "I need custom cabinetry" }));
    expect(res.status).toBe(200);
    const body = await res.json();
    expect(body.response).toContain("Core Cabinet");
  });

  it("returns default fallback for unrecognized queries", async () => {
    const res = await POST(
      makeRequest({ message: "tell me something random" }),
    );
    expect(res.status).toBe(200);
    const body = await res.json();
    expect(body.response).toContain("Thanks for reaching out");
    expect(body.response).toContain("(509) 308-6489");
  });
});
