/**
 * Tests for analytics/data-collector.ts
 *
 * Covers all 6 methods: trackPageView, trackFormSubmission,
 * trackInteraction, getConversions, getAllData, clearAll
 */

jest.mock("@/lib/utils/logger", () => ({
  logger: { log: jest.fn(), error: jest.fn(), warn: jest.fn() },
}));

import { dataCollector } from "../data-collector";

beforeEach(() => {
  localStorage.clear();
  jest.clearAllMocks();
});

// ---- trackPageView ----

describe("trackPageView()", () => {
  it("initialises page view data on first call", () => {
    dataCollector.trackPageView("/home");
    const stored = JSON.parse(
      localStorage.getItem("mh_analytics_pageviews") ?? "{}",
    );
    expect(stored.pages["/home"]).toBe(1);
    expect(stored.total).toBe(1);
  });

  it("increments count on repeated calls for the same page", () => {
    dataCollector.trackPageView("/home");
    dataCollector.trackPageView("/home");
    dataCollector.trackPageView("/about");
    const stored = JSON.parse(
      localStorage.getItem("mh_analytics_pageviews") ?? "{}",
    );
    expect(stored.pages["/home"]).toBe(2);
    expect(stored.pages["/about"]).toBe(1);
    expect(stored.total).toBe(3);
  });

  it("persists lastView timestamp", () => {
    dataCollector.trackPageView("/services");
    const stored = JSON.parse(
      localStorage.getItem("mh_analytics_pageviews") ?? "{}",
    );
    expect(stored.lastView).toBeTruthy();
  });

  it("handles corrupted localStorage gracefully", () => {
    const { logger } = jest.requireMock("@/lib/utils/logger");
    localStorage.setItem("mh_analytics_pageviews", "not-json");
    expect(() => dataCollector.trackPageView("/broken")).not.toThrow();
    expect(logger.error).toHaveBeenCalled();
  });
});

// ---- trackFormSubmission ----

describe("trackFormSubmission()", () => {
  it("stores form submission in localStorage", () => {
    dataCollector.trackFormSubmission("contact", {
      name: "John",
      email: "john@example.com",
    });
    const stored = JSON.parse(
      localStorage.getItem("mh_analytics_forms") ?? "[]",
    );
    expect(stored).toHaveLength(1);
    expect(stored[0].formId).toBe("contact");
    expect(stored[0].name).toBe("John");
    expect(stored[0].timestamp).toBeTruthy();
  });

  it("appends multiple submissions", () => {
    dataCollector.trackFormSubmission("contact", { name: "Alice" });
    dataCollector.trackFormSubmission("newsletter", {
      email: "bob@example.com",
    });
    const stored = JSON.parse(
      localStorage.getItem("mh_analytics_forms") ?? "[]",
    );
    expect(stored).toHaveLength(2);
    expect(stored[1].formId).toBe("newsletter");
  });

  it("trims to last 500 submissions", () => {
    const existing = Array.from({ length: 500 }, (_, i) => ({
      formId: `form-${i}`,
      timestamp: new Date().toISOString(),
    }));
    localStorage.setItem("mh_analytics_forms", JSON.stringify(existing));
    dataCollector.trackFormSubmission("overflow-form", {});
    const stored = JSON.parse(
      localStorage.getItem("mh_analytics_forms") ?? "[]",
    );
    expect(stored).toHaveLength(500);
    expect(stored[499].formId).toBe("overflow-form");
  });

  it("handles corrupted localStorage gracefully", () => {
    const { logger } = jest.requireMock("@/lib/utils/logger");
    localStorage.setItem("mh_analytics_forms", "not-json{");
    expect(() => dataCollector.trackFormSubmission("test", {})).not.toThrow();
    expect(logger.error).toHaveBeenCalled();
  });
});

// ---- trackInteraction ----

describe("trackInteraction()", () => {
  it("stores interaction in localStorage", () => {
    dataCollector.trackInteraction("click", "hero-cta", { label: "Get Quote" });
    const stored = JSON.parse(
      localStorage.getItem("mh_analytics_interactions") ?? "[]",
    );
    expect(stored).toHaveLength(1);
    expect(stored[0].type).toBe("click");
    expect(stored[0].element).toBe("hero-cta");
    expect(stored[0].label).toBe("Get Quote");
  });

  it("appends multiple interactions", () => {
    dataCollector.trackInteraction("click", "btn-a", {});
    dataCollector.trackInteraction("scroll", "section-b", { depth: 50 });
    const stored = JSON.parse(
      localStorage.getItem("mh_analytics_interactions") ?? "[]",
    );
    expect(stored).toHaveLength(2);
  });

  it("trims to last 1000 interactions", () => {
    const existing = Array.from({ length: 1000 }, (_, i) => ({
      type: "click",
      element: `btn-${i}`,
      timestamp: new Date().toISOString(),
      page: "/",
    }));
    localStorage.setItem("mh_analytics_interactions", JSON.stringify(existing));
    dataCollector.trackInteraction("click", "overflow-btn", {});
    const stored = JSON.parse(
      localStorage.getItem("mh_analytics_interactions") ?? "[]",
    );
    expect(stored).toHaveLength(1000);
    expect(stored[999].element).toBe("overflow-btn");
  });

  it("handles corrupted localStorage gracefully", () => {
    const { logger } = jest.requireMock("@/lib/utils/logger");
    localStorage.setItem("mh_analytics_interactions", "broken{");
    expect(() =>
      dataCollector.trackInteraction("click", "btn", {}),
    ).not.toThrow();
    expect(logger.error).toHaveBeenCalled();
  });
});

// ---- getConversions ----

describe("getConversions()", () => {
  it("returns default zeros when localStorage is empty", () => {
    const conv = dataCollector.getConversions();
    expect(conv["total"]).toBe(0);
    expect(conv["contacts"]).toBe(0);
    expect(conv["consultations"]).toBe(0);
  });

  it("returns stored conversion counts", () => {
    localStorage.setItem(
      "mh_analytics_conversions",
      JSON.stringify({ total: 5, contacts: 3, consultations: 2 }),
    );
    const conv = dataCollector.getConversions();
    expect(conv["total"]).toBe(5);
    expect(conv["contacts"]).toBe(3);
  });

  it("handles corrupted localStorage gracefully", () => {
    localStorage.setItem("mh_analytics_conversions", "not-json");
    const conv = dataCollector.getConversions();
    expect(conv["total"]).toBe(0);
  });
});

// ---- getAllData ----

describe("getAllData()", () => {
  it("returns null-safe data object with all keys", () => {
    const data = dataCollector.getAllData();
    expect(data).not.toBeNull();
    const d = data as NonNullable<typeof data>;
    expect(d).toHaveProperty("pageviews");
    expect(d).toHaveProperty("events");
    expect(d).toHaveProperty("sessions");
    expect(d).toHaveProperty("interactions");
    expect(d).toHaveProperty("forms");
    expect(d).toHaveProperty("conversions");
    expect(d).toHaveProperty("clicks");
  });

  it("returns stored data from localStorage", () => {
    localStorage.setItem(
      "mh_analytics_pageviews",
      JSON.stringify({ total: 10 }),
    );
    const data = dataCollector.getAllData() as Record<string, unknown>;
    expect((data["pageviews"] as { total: number })["total"]).toBe(10);
  });

  it("handles corrupted localStorage gracefully and returns null", () => {
    const { logger } = jest.requireMock("@/lib/utils/logger");
    localStorage.setItem("mh_analytics_events", "bad-json");
    const data = dataCollector.getAllData();
    expect(data).toBeNull();
    expect(logger.error).toHaveBeenCalled();
  });
});

// ---- clearAll ----

describe("clearAll()", () => {
  it("removes all analytics keys from localStorage", () => {
    localStorage.setItem("mh_analytics_pageviews", "{}");
    localStorage.setItem("mh_analytics_events", "[]");
    localStorage.setItem("mh_analytics_sessions", "[]");
    localStorage.setItem("mh_analytics_interactions", "[]");
    localStorage.setItem("mh_analytics_forms", "[]");
    localStorage.setItem("mh_analytics_conversions", "{}");
    localStorage.setItem("mh_analytics_clicks", "[]");

    dataCollector.clearAll();

    expect(localStorage.getItem("mh_analytics_pageviews")).toBeNull();
    expect(localStorage.getItem("mh_analytics_events")).toBeNull();
    expect(localStorage.getItem("mh_analytics_sessions")).toBeNull();
    expect(localStorage.getItem("mh_analytics_interactions")).toBeNull();
    expect(localStorage.getItem("mh_analytics_forms")).toBeNull();
    expect(localStorage.getItem("mh_analytics_conversions")).toBeNull();
    expect(localStorage.getItem("mh_analytics_clicks")).toBeNull();
  });

  it("logs a cleared confirmation message", () => {
    const { logger } = jest.requireMock("@/lib/utils/logger");
    dataCollector.clearAll();
    expect(logger.log).toHaveBeenCalledWith("Analytics data cleared");
  });
});
