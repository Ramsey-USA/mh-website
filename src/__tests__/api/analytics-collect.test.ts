/**
 * @jest-environment node
 *
 * Analytics Collect API — unit tests
 *
 * Covers: payload validation, event processing, HTTP method enforcement,
 * and the waitUntil / fallback pattern for KV writes.
 */

import { NextRequest } from "next/server";

// ── Mocks ────────────────────────────────────────────────────────────────────

jest.mock("@opennextjs/cloudflare", () => ({
  getCloudflareContext: jest.fn(() => {
    throw new Error("not in CF context"); // triggers the local-dev fallback
  }),
}));

jest.mock("@/lib/analytics/kv-store", () => ({
  recordPageview: jest.fn().mockResolvedValue(undefined),
  recordConversion: jest.fn().mockResolvedValue(undefined),
  recordClick: jest.fn().mockResolvedValue(undefined),
  recordSession: jest.fn().mockResolvedValue(undefined),
}));

jest.mock("@/lib/security/rate-limiter", () => ({
  rateLimit: () => (handler: unknown) => handler,
}));

import { POST } from "@/app/api/analytics/collect/route";
import {
  recordPageview,
  recordConversion,
  recordClick,
  recordSession,
} from "@/lib/analytics/kv-store";

// ── Helpers ───────────────────────────────────────────────────────────────────

const makeRequest = (body: unknown, method = "POST") =>
  new NextRequest("http://localhost/api/analytics/collect", {
    method,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

// ── Tests ─────────────────────────────────────────────────────────────────────

describe("POST /api/analytics/collect", () => {
  beforeEach(() => jest.clearAllMocks());

  // ── Payload validation ───────────────────────────────────────────────────

  it("returns 400 for non-JSON body", async () => {
    const req = new NextRequest("http://localhost/api/analytics/collect", {
      method: "POST",
      headers: { "Content-Type": "text/plain" },
      body: "not json",
    });
    const res = await POST(req);
    expect(res.status).toBe(400);
  });

  it("returns 400 when events array is missing", async () => {
    const res = await POST(makeRequest({ foo: "bar" }));
    expect(res.status).toBe(400);
  });

  it("returns 400 when events array is empty after filtering invalid types", async () => {
    const res = await POST(makeRequest({ events: [{ type: "unknown" }] }));
    expect(res.status).toBe(400);
  });

  it("silently drops events over the 25-item batch limit and processes the first 25", async () => {
    const events = Array.from({ length: 30 }, (_, i) => ({
      type: "pageview",
      page: `/page-${i}`,
    }));
    const res = await POST(makeRequest({ events }));
    expect(res.status).toBe(200);
    expect(recordPageview).toHaveBeenCalledTimes(25);
  });

  // ── Event routing ────────────────────────────────────────────────────────

  it("calls recordPageview for pageview events with a page value", async () => {
    const res = await POST(
      makeRequest({ events: [{ type: "pageview", page: "/about" }] }),
    );
    expect(res.status).toBe(200);
    expect(recordPageview).toHaveBeenCalledWith("/about");
  });

  it("does NOT call recordPageview when page is empty", async () => {
    const res = await POST(makeRequest({ events: [{ type: "pageview" }] }));
    // type is valid so validatePayload passes, but no page → no promise queued
    // route still returns 200 (beacon endpoint never fails for missing fields)
    expect(res.status).toBe(200);
    expect(recordPageview).not.toHaveBeenCalled();
  });

  it("calls recordConversion for valid conversionType values", async () => {
    const res = await POST(
      makeRequest({
        events: [{ type: "conversion", conversionType: "contact" }],
      }),
    );
    expect(res.status).toBe(200);
    expect(recordConversion).toHaveBeenCalledWith("contact");
  });

  it("ignores invalid conversionType values", async () => {
    const res = await POST(
      makeRequest({
        events: [{ type: "conversion", conversionType: "spam" }],
      }),
    );
    // type is valid but conversionType is stripped → no KV write, still 200
    expect(res.status).toBe(200);
    expect(recordConversion).not.toHaveBeenCalled();
  });

  it("calls recordClick for click events with an element value", async () => {
    const res = await POST(
      makeRequest({
        events: [{ type: "click", element: "header-cta", page: "/" }],
      }),
    );
    expect(res.status).toBe(200);
    expect(recordClick).toHaveBeenCalledTimes(1);
    const arg = (recordClick as jest.Mock).mock.calls[0][0];
    expect(arg.element).toBe("header-cta");
  });

  it("calls recordSession for session_end events with positive duration", async () => {
    const res = await POST(
      makeRequest({ events: [{ type: "session_end", duration: 120 }] }),
    );
    expect(res.status).toBe(200);
    expect(recordSession).toHaveBeenCalledWith(120);
  });

  it("does NOT call recordSession when duration is 0", async () => {
    const res = await POST(
      makeRequest({ events: [{ type: "session_end", duration: 0 }] }),
    );
    // duration 0 is filtered out; route still returns 200
    expect(res.status).toBe(200);
    expect(recordSession).not.toHaveBeenCalled();
  });

  // ── String sanitization ──────────────────────────────────────────────────

  it("strips control characters from string fields", async () => {
    const res = await POST(
      makeRequest({
        events: [{ type: "pageview", page: "/ok\x00evil\x1F" }],
      }),
    );
    expect(res.status).toBe(200);
    expect(recordPageview).toHaveBeenCalledWith("/okevil");
  });

  it("truncates strings exceeding 256 characters", async () => {
    const longPage = "/" + "a".repeat(300);
    const res = await POST(
      makeRequest({ events: [{ type: "pageview", page: longPage }] }),
    );
    expect(res.status).toBe(200);
    const calledWith = (recordPageview as jest.Mock).mock.calls[0][0] as string;
    expect(calledWith.length).toBe(256);
  });

  // ── Duration clamping ────────────────────────────────────────────────────

  it("clamps session duration to [0, 86400]", async () => {
    const res = await POST(
      makeRequest({ events: [{ type: "session_end", duration: 999999 }] }),
    );
    expect(res.status).toBe(200);
    expect(recordSession).toHaveBeenCalledWith(86400);
  });

  // ── Response shape ───────────────────────────────────────────────────────

  it("returns { ok: true } on success", async () => {
    const res = await POST(
      makeRequest({ events: [{ type: "pageview", page: "/" }] }),
    );
    const body = await res.json();
    expect(body).toEqual({ ok: true });
  });

  // ── Cloudflare waitUntil path ────────────────────────────────────────────

  it("uses waitUntil when Cloudflare context is available", async () => {
    const waitUntilMock = jest.fn();
    const { getCloudflareContext } = await import("@opennextjs/cloudflare");
    (getCloudflareContext as jest.Mock).mockImplementationOnce(() => ({
      ctx: { waitUntil: waitUntilMock },
    }));

    const res = await POST(
      makeRequest({ events: [{ type: "pageview", page: "/cf" }] }),
    );
    expect(res.status).toBe(200);
    expect(waitUntilMock).toHaveBeenCalledTimes(1);
  });

  it("returns 200 even when KV writes fail in local-dev fallback", async () => {
    (recordPageview as jest.Mock).mockRejectedValueOnce(
      new Error("KV unavailable"),
    );
    const res = await POST(
      makeRequest({ events: [{ type: "pageview", page: "/" }] }),
    );
    expect(res.status).toBe(200);
  });
});
