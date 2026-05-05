/** @jest-environment node */
/**
 * Tests for src/lib/analytics/kv-store.ts
 * Mocks the Cloudflare KV binding so all paths (including the "no KV" early-return)
 * are exercised.
 */

// ── Mock KV namespace ─────────────────────────────────────────────────────────

const mockKVGet = jest.fn<Promise<string | null>, [string]>();
const mockKVPut = jest.fn<Promise<void>, [string, string, unknown?]>();

const mockKV = {
  get: mockKVGet,
  put: mockKVPut,
};

let kvEnabled = true;

jest.mock("@/lib/db/env", () => ({
  getKVNamespace: jest.fn(() => (kvEnabled ? mockKV : null)),
}));

jest.mock("@/lib/utils/logger", () => ({
  logger: {
    error: jest.fn(),
    warn: jest.fn(),
    info: jest.fn(),
    log: jest.fn(),
  },
}));

import {
  recordPageview,
  recordConversion,
  recordClick,
  recordSession,
  getDashboardSnapshot,
} from "../kv-store";

// ── Helpers ───────────────────────────────────────────────────────────────────

function clearMocks() {
  mockKVGet.mockReset();
  mockKVPut.mockReset();
  mockKVPut.mockResolvedValue(undefined);
  kvEnabled = true;
}

// ── recordPageview ────────────────────────────────────────────────────────────

describe("recordPageview()", () => {
  beforeEach(clearMocks);

  it("creates new totals and daily records when KV is empty", async () => {
    mockKVGet.mockResolvedValue(null);

    await recordPageview("/about");

    // Should have called put twice — totals + daily
    expect(mockKVPut).toHaveBeenCalledTimes(2);

    const totalsPutCall = mockKVPut.mock.calls.find(
      (c) => c[0] === "analytics:pageviews:total",
    )!;
    const totals = JSON.parse(totalsPutCall[1]);
    expect(totals.total).toBe(1);
    expect(totals.pages["/about"]).toBe(1);

    // Daily key should have a TTL
    const dailyPutCall = mockKVPut.mock.calls.find((c) =>
      (c[0] as string).startsWith("analytics:pageviews:daily:"),
    )!;
    expect(dailyPutCall[2]).toEqual({ expirationTtl: expect.any(Number) });
  });

  it("increments existing totals", async () => {
    const existing = JSON.stringify({
      pages: { "/about": 5 },
      total: 10,
      lastUpdated: "2026-01-01T00:00:00.000Z",
    });
    mockKVGet.mockResolvedValue(existing);

    await recordPageview("/about");

    const totalsPutCall = mockKVPut.mock.calls.find(
      (c) => c[0] === "analytics:pageviews:total",
    )!;
    const totals = JSON.parse(totalsPutCall[1]);
    expect(totals.pages["/about"]).toBe(6);
    expect(totals.total).toBe(11);
  });

  it("does nothing when KV is not available", async () => {
    kvEnabled = false;
    await recordPageview("/about");
    expect(mockKVPut).not.toHaveBeenCalled();
    kvEnabled = true;
  });
});

// ── recordConversion ──────────────────────────────────────────────────────────

describe("recordConversion()", () => {
  beforeEach(clearMocks);

  it("increments contact conversions", async () => {
    mockKVGet.mockResolvedValue(null);

    await recordConversion("contact");

    const putCall = mockKVPut.mock.calls[0]!;
    const data = JSON.parse(putCall[1]);
    expect(data.contacts).toBe(1);
    expect(data.consultations).toBe(0);
    expect(data.total).toBe(1);
  });

  it("increments consultation conversions", async () => {
    mockKVGet.mockResolvedValue(null);

    await recordConversion("consultation");

    const data = JSON.parse(mockKVPut.mock.calls[0]![1]);
    expect(data.consultations).toBe(1);
    expect(data.contacts).toBe(0);
  });

  it("does nothing when KV is not available", async () => {
    kvEnabled = false;
    await recordConversion("contact");
    expect(mockKVPut).not.toHaveBeenCalled();
    kvEnabled = true;
  });
});

// ── recordClick ───────────────────────────────────────────────────────────────

describe("recordClick()", () => {
  beforeEach(clearMocks);

  it("appends a click event to the recent-clicks list", async () => {
    mockKVGet.mockResolvedValue(null);

    await recordClick({
      element: "phone-cta",
      timestamp: "2026-01-01T00:00:00.000Z",
      page: "/",
    });

    const data = JSON.parse(mockKVPut.mock.calls[0]![1]);
    expect(data).toHaveLength(1);
    expect(data[0].element).toBe("phone-cta");
  });

  it("trims list to the last 500 entries", async () => {
    const existing = Array.from({ length: 500 }, (_, i) => ({
      element: `el${i}`,
      timestamp: "t",
      page: "/",
    }));
    mockKVGet.mockResolvedValue(JSON.stringify(existing));

    await recordClick({ element: "new", timestamp: "t", page: "/" });

    const data = JSON.parse(mockKVPut.mock.calls[0]![1]) as unknown[];
    expect(data).toHaveLength(500);
    expect((data[data.length - 1] as { element: string }).element).toBe("new");
  });

  it("does nothing when KV is not available", async () => {
    kvEnabled = false;
    await recordClick({ element: "x", timestamp: "t", page: "/" });
    expect(mockKVPut).not.toHaveBeenCalled();
    kvEnabled = true;
  });
});

// ── recordSession ─────────────────────────────────────────────────────────────

describe("recordSession()", () => {
  beforeEach(clearMocks);

  it("creates session totals and daily records", async () => {
    mockKVGet.mockResolvedValue(null);

    await recordSession(120);

    const totalsPutCall = mockKVPut.mock.calls.find(
      (c) => c[0] === "analytics:sessions:total",
    )!;
    const totals = JSON.parse(totalsPutCall[1]);
    expect(totals.count).toBe(1);
    expect(totals.totalDuration).toBe(120);
  });

  it("does nothing when KV is not available", async () => {
    kvEnabled = false;
    await recordSession(60);
    expect(mockKVPut).not.toHaveBeenCalled();
    kvEnabled = true;
  });
});

// ── getDashboardSnapshot ──────────────────────────────────────────────────────

describe("getDashboardSnapshot()", () => {
  beforeEach(clearMocks);

  it("returns null when KV is not available", async () => {
    kvEnabled = false;
    const result = await getDashboardSnapshot();
    expect(result).toBeNull();
    kvEnabled = true;
  });

  it("returns snapshot with defaults for missing keys", async () => {
    mockKVGet.mockResolvedValue(null);

    const snapshot = await getDashboardSnapshot();

    expect(snapshot).not.toBeNull();
    expect(snapshot!.pageviews.total).toBe(0);
    expect(snapshot!.conversions.contacts).toBe(0);
    expect(snapshot!.clicks).toEqual([]);
    expect(snapshot!.sessions.count).toBe(0);
    expect(snapshot!.dailyPageviews).toBeNull();
    expect(snapshot!.dailySessions).toBeNull();
  });

  it("returns snapshot populated from KV data", async () => {
    const pvData = JSON.stringify({
      pages: { "/": 10 },
      total: 10,
      lastUpdated: "",
    });
    const cvData = JSON.stringify({
      contacts: 3,
      consultations: 1,
      total: 4,
      lastUpdated: "",
    });
    const clData = JSON.stringify([
      { element: "cta", timestamp: "t", page: "/" },
    ]);
    const ssData = JSON.stringify({
      count: 5,
      totalDuration: 600,
      lastUpdated: "",
    });

    // getDashboardSnapshot calls kvGet 6 times via Promise.all
    mockKVGet
      .mockResolvedValueOnce(pvData) // analytics:pageviews:total
      .mockResolvedValueOnce(cvData) // analytics:conversions
      .mockResolvedValueOnce(clData) // analytics:clicks:recent
      .mockResolvedValueOnce(ssData) // analytics:sessions:total
      .mockResolvedValueOnce(pvData) // analytics:pageviews:daily:*
      .mockResolvedValueOnce(ssData); // analytics:sessions:daily:*

    const snapshot = await getDashboardSnapshot();

    expect(snapshot!.pageviews.total).toBe(10);
    expect(snapshot!.conversions.total).toBe(4);
    expect(snapshot!.clicks).toHaveLength(1);
    expect(snapshot!.sessions.count).toBe(5);
    expect(snapshot!.dailyPageviews!.total).toBe(10);
    expect(snapshot!.dailySessions!.count).toBe(5);
  });
});

// ── kvGet / kvPut error paths ─────────────────────────────────────────────────

describe("kvGet error path", () => {
  beforeEach(clearMocks);

  it("returns null and logs error when JSON.parse fails", async () => {
    mockKVGet.mockResolvedValue("{ invalid json");

    // recordPageview calls kvGet under the hood
    await recordPageview("/broken");

    const { logger } = await import("@/lib/utils/logger");
    expect(logger.error).toHaveBeenCalled();
  });
});

describe("kvPut error path", () => {
  beforeEach(clearMocks);

  it("logs error when kv.put throws", async () => {
    mockKVGet.mockResolvedValue(null);
    mockKVPut.mockRejectedValue(new Error("KV write failed"));

    // Should not throw — just logs
    await expect(recordPageview("/error-path")).resolves.not.toThrow();

    const { logger } = await import("@/lib/utils/logger");
    expect(logger.error).toHaveBeenCalled();
  });
});
