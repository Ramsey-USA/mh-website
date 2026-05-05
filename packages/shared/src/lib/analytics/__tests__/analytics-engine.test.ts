/**
 * Tests for AdvancedAnalyticsEngine
 *
 * Coverage targets: all 33 functions (constructor, initialize, track*, getDashboardData,
 * private helpers, _get* methods, setup* methods, sendToAnalyticsProviders, triggerCustomTrackers)
 */

import { AdvancedAnalyticsEngine } from "../analytics-engine";
import type { AnalyticsEvent, UserJourney } from "../types";

// ---- Module mocks ----
// Note: jest.mock factories are hoisted before variable declarations,
// so mock objects must be defined inline (not referencing outer const variables).

jest.mock("@/lib/utils/logger", () => ({
  logger: { log: jest.fn(), error: jest.fn(), warn: jest.fn() },
}));

jest.mock("@/lib/monitoring/sentry", () => ({
  captureException: jest.fn(),
}));

jest.mock("../data-collector", () => ({
  dataCollector: {
    trackPageView: jest.fn(),
    trackFormSubmission: jest.fn(),
    trackInteraction: jest.fn(),
  },
}));

jest.mock("../metrics-calculator", () => ({
  MetricsCalculator: jest.fn().mockImplementation(() => ({
    countUniqueUsers: jest.fn().mockReturnValue(5),
    countTotalConversions: jest.fn().mockReturnValue(3),
    calculateAverageSessionDuration: jest.fn().mockReturnValue(180),
    calculateBounceRate: jest.fn().mockReturnValue(0.4),
    calculateConversionRate: jest.fn().mockReturnValue(0.1),
    calculateVeteranUserPercentage: jest.fn().mockReturnValue(0.15),
    getTopPages: jest.fn().mockReturnValue([]),
    getTrafficSources: jest.fn().mockReturnValue([]),
    calculateCoreWebVitals: jest
      .fn()
      .mockReturnValue({ lcp: 2500, fid: 100, cls: 0.1, fcp: 1800, ttfb: 500 }),
    calculateEstimatorToContactRate: jest.fn().mockReturnValue(0.2),
    calculateRecommendationToInquiryRate: jest.fn().mockReturnValue(0.15),
    countVeteranUsers: jest.fn().mockReturnValue(2),
    getActiveSessions: jest.fn().mockReturnValue([]),
  })),
}));

const METADATA_RETURN = {
  device: {
    type: "desktop",
    os: "macOS",
    browser: "Chrome",
    screenResolution: "1920x1080",
    viewportSize: "1440x900",
  },
  location: { country: "US", region: "WA", city: "Pasco" },
  session: { id: "test-session" },
  traffic: { source: "direct" },
  performance: {},
};
jest.mock("../metadata", () => ({
  getEventMetadata: jest.fn().mockReturnValue({
    device: {
      type: "desktop",
      os: "macOS",
      browser: "Chrome",
      screenResolution: "1920x1080",
      viewportSize: "1440x900",
    },
    location: { country: "US", region: "WA", city: "Pasco" },
    session: { id: "test-session" },
    traffic: { source: "direct" },
    performance: {},
  }),
}));

// ---- Global browser API mocks ----

const mockObserve = jest.fn();
const mockDisconnect = jest.fn();
global.PerformanceObserver = jest.fn().mockImplementation(() => ({
  observe: mockObserve,
  disconnect: mockDisconnect,
})) as unknown as typeof PerformanceObserver;

// jsdom does not implement PromiseRejectionEvent
if (typeof global.PromiseRejectionEvent === "undefined") {
  global.PromiseRejectionEvent = class extends Event {
    promise: Promise<unknown>;
    reason: unknown;
    constructor(
      type: string,
      init: { promise: Promise<unknown>; reason: unknown },
    ) {
      super(type, { bubbles: true, cancelable: true });
      this.promise = init.promise;
      this.reason = init.reason;
    }
  } as unknown as typeof PromiseRejectionEvent;
}

// jsdom's performance object does not expose getEntriesByType; add a default stub
if (typeof performance.getEntriesByType !== "function") {
  Object.defineProperty(global.performance, "getEntriesByType", {
    value: jest.fn().mockReturnValue([]),
    writable: true,
    configurable: true,
  });
}

// ---- Test helpers ----

function makeEvent(overrides: Partial<AnalyticsEvent> = {}): AnalyticsEvent {
  return {
    id: "e1",
    type: "page_view",
    timestamp: new Date("2026-01-01T10:00:00Z"),
    sessionId: "s1",
    properties: { page: "/home" },
    metadata: METADATA_RETURN as unknown as ReturnType<
      typeof import("../metadata").getEventMetadata
    >,
    ...overrides,
  };
}

function makeSession(overrides: Partial<UserJourney> = {}): UserJourney {
  return {
    sessionId: "s1",
    startTime: new Date("2026-01-01T10:00:00Z"),
    events: [makeEvent()],
    pages: ["/home"],
    conversions: [],
    totalDuration: 120,
    bounceRate: false,
    ...overrides,
  };
}

/** Flush microtasks and macrotasks so the constructor's async initialize() completes */
async function flushInit(): Promise<void> {
  await new Promise<void>((resolve) => setTimeout(resolve, 0));
}

// ---- Test suite ----

describe("AdvancedAnalyticsEngine", () => {
  let engine: AdvancedAnalyticsEngine;
  // Typed accessors for mocked modules
  let mockDataCollector: {
    trackPageView: jest.Mock;
    trackFormSubmission: jest.Mock;
    trackInteraction: jest.Mock;
  };
  let mockCalculator: Record<string, jest.Mock>;

  beforeEach(() => {
    jest.clearAllMocks();
    localStorage.clear();
    sessionStorage.clear();
    mockDataCollector = jest.requireMock("../data-collector")
      .dataCollector as typeof mockDataCollector;
    // Each new engine gets a fresh MetricsCalculator instance, so grab it after construction
    engine = new AdvancedAnalyticsEngine();
    const { MetricsCalculator } = jest.requireMock("../metrics-calculator") as {
      MetricsCalculator: jest.Mock;
    };
    mockCalculator = MetricsCalculator.mock.results[
      MetricsCalculator.mock.results.length - 1
    ]?.value as Record<string, jest.Mock>;
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    if (!mockCalculator) throw new Error("MetricsCalculator mock not found");
  });

  // ---------- Initialization ----------

  describe("initialize()", () => {
    it("completes initialization and sets up GA4, performance, error, and event listeners", async () => {
      await flushInit();
      // PerformanceObserver observe was called for LCP and FID
      expect(mockObserve).toHaveBeenCalled();
    });

    it("short-circuits when already initialized", async () => {
      await flushInit();
      mockObserve.mockClear();
      // Second call should be a no-op
      await engine.initialize();
      expect(mockObserve).not.toHaveBeenCalled();
    });

    it("picks up window.gtag during GA4 init", async () => {
      const gtagMock = jest.fn();
      (window as unknown as Record<string, unknown>)["gtag"] = gtagMock;
      const _eng = new AdvancedAnalyticsEngine();
      await flushInit();
      _eng.track("page_view", { page: "/test" });
      expect(gtagMock).toHaveBeenCalled();
      delete (window as unknown as Record<string, unknown>)["gtag"];
    });

    it("catches errors from PerformanceObserver during setup", async () => {
      const { logger } = jest.requireMock("@/lib/utils/logger");
      (
        global.PerformanceObserver as jest.MockedClass<
          typeof PerformanceObserver
        >
      ).mockImplementationOnce(() => {
        throw new Error("Observer unavailable");
      });
      new AdvancedAnalyticsEngine();
      await flushInit();
      // Error should be caught and logged inside setupPerformanceTracking
      expect(logger.error).toHaveBeenCalledWith(
        "Performance tracking setup failed:",
        expect.any(Error),
      );
    });
  });

  // ---------- track() ----------

  describe("track()", () => {
    it("calls dataCollector.trackPageView for page_view events", () => {
      engine.track("page_view", { page: "/about" });
      expect(mockDataCollector.trackPageView).toHaveBeenCalledWith("/about");
    });

    it("calls dataCollector.trackFormSubmission for form_submission events", () => {
      engine.track("form_submission", { formId: "contact", name: "Test" });
      expect(mockDataCollector.trackFormSubmission).toHaveBeenCalledWith(
        "contact",
        expect.objectContaining({ formId: "contact" }),
      );
    });

    it("calls dataCollector.trackInteraction for user_interaction events", () => {
      engine.track("user_interaction", {
        action: "click",
        element: "hero-cta",
      });
      expect(mockDataCollector.trackInteraction).toHaveBeenCalledWith(
        "click",
        "hero-cta",
        expect.objectContaining({ action: "click" }),
      );
    });

    it("stores event in localStorage", () => {
      engine.track("page_view", { page: "/test" });
      const stored = JSON.parse(
        localStorage.getItem("mh_analytics_events") ?? "[]",
      );
      expect(stored).toHaveLength(1);
      expect(stored[0].type).toBe("page_view");
    });

    it("trims localStorage events to the last 500", () => {
      // Pre-populate 500 events
      const existing = Array.from({ length: 500 }, (_, i) => ({
        id: `e${i}`,
        type: "page_view",
        timestamp: new Date().toISOString(),
        sessionId: "s1",
        properties: {},
        metadata: {},
      }));
      localStorage.setItem("mh_analytics_events", JSON.stringify(existing));
      engine.track("conversion_event", { conversionType: "contact_form" });
      const stored = JSON.parse(
        localStorage.getItem("mh_analytics_events") ?? "[]",
      );
      expect(stored).toHaveLength(500);
      expect(stored[499].type).toBe("conversion_event");
    });

    it("fires registered custom trackers", () => {
      const tracker = jest.fn();
      engine.registerCustomTracker("test-tracker", tracker);
      engine.track("page_view", { page: "/" });
      expect(tracker).toHaveBeenCalledWith(
        expect.objectContaining({ type: "page_view" }),
      );
    });

    it("catches errors thrown by custom trackers without crashing", () => {
      const { logger } = jest.requireMock("@/lib/utils/logger");
      engine.registerCustomTracker("bad-tracker", () => {
        throw new Error("tracker crash");
      });
      expect(() => engine.track("page_view", { page: "/" })).not.toThrow();
      expect(logger.error).toHaveBeenCalled();
    });

    it("handles broken localStorage gracefully", () => {
      const { logger } = jest.requireMock("@/lib/utils/logger");
      jest.spyOn(Storage.prototype, "getItem").mockImplementationOnce(() => {
        throw new Error("storage error");
      });
      expect(() => engine.track("page_view", { page: "/" })).not.toThrow();
      expect(logger.error).toHaveBeenCalled();
    });

    it("reuses existing sessionStorage session ID", () => {
      sessionStorage.setItem("mh_analytics_current_session", "existing-sid");
      engine.track("page_view", { page: "/" });
      const stored = JSON.parse(
        localStorage.getItem("mh_analytics_events") ?? "[]",
      );
      expect(stored[0].sessionId).toBe("existing-sid");
    });

    it("creates a new session ID when none exists", () => {
      sessionStorage.clear();
      engine.track("page_view", { page: "/" });
      const sid = sessionStorage.getItem("mh_analytics_current_session");
      expect(sid).toMatch(/^session-\d+-[a-z0-9]+$/);
    });

    it("sends events to Google Analytics when gtag is present", () => {
      const gtagMock = jest.fn();
      (engine as unknown as Record<string, unknown>)["analytics"] = gtagMock;
      engine.track("page_view", { page: "/" });
      expect(gtagMock).toHaveBeenCalledWith(
        "event",
        "page_view",
        expect.any(Object),
      );
    });

    it("handles gtag throwing errors gracefully", () => {
      const { logger } = jest.requireMock("@/lib/utils/logger");
      (engine as unknown as Record<string, unknown>)["analytics"] = () => {
        throw new Error("gtag error");
      };
      expect(() => engine.track("page_view", {})).not.toThrow();
      expect(logger.error).toHaveBeenCalledWith(
        "Failed to send to Google Analytics:",
        expect.any(Error),
      );
    });
  });

  // ---------- Public tracking helpers ----------

  describe("trackPageView()", () => {
    it("delegates to track() with page_view type", () => {
      const spy = jest.spyOn(engine, "track");
      engine.trackPageView("/services", { ref: "nav" });
      expect(spy).toHaveBeenCalledWith(
        "page_view",
        expect.objectContaining({ page: "/services", ref: "nav" }),
      );
    });

    it("works with no extra properties", () => {
      const spy = jest.spyOn(engine, "track");
      engine.trackPageView("/contact");
      expect(spy).toHaveBeenCalledWith(
        "page_view",
        expect.objectContaining({ page: "/contact" }),
      );
    });
  });

  describe("trackInteraction()", () => {
    it("delegates to track() with user_interaction type", () => {
      const spy = jest.spyOn(engine, "track");
      engine.trackInteraction("hero-btn", "click", { label: "CTA" });
      expect(spy).toHaveBeenCalledWith(
        "user_interaction",
        expect.objectContaining({ element: "hero-btn", action: "click" }),
      );
    });
  });

  describe("trackConversion()", () => {
    it("delegates to track() with conversion_event type", () => {
      const spy = jest.spyOn(engine, "track");
      engine.trackConversion("contact_form", 250, { page: "/contact" });
      expect(spy).toHaveBeenCalledWith(
        "conversion_event",
        expect.objectContaining({ conversionType: "contact_form", value: 250 }),
      );
    });
  });

  describe("trackPerformance()", () => {
    it("delegates to track() with performance_metric type", () => {
      const spy = jest.spyOn(engine, "track");
      engine.trackPerformance({ largestContentfulPaint: 2500 });
      expect(spy).toHaveBeenCalledWith(
        "performance_metric",
        expect.objectContaining({ largestContentfulPaint: 2500 }),
      );
    });
  });

  describe("trackError()", () => {
    it("delegates to track() with error_event type", () => {
      const spy = jest.spyOn(engine, "track");
      const err = new Error("test error");
      engine.trackError(err, { page: "/about" });
      expect(spy).toHaveBeenCalledWith(
        "error_event",
        expect.objectContaining({
          error: "test error",
          context: { page: "/about" },
        }),
      );
    });
  });

  // ---------- getDashboardData() ----------

  describe("getDashboardData()", () => {
    it("returns full dashboard structure with empty localStorage", () => {
      const data = engine.getDashboardData();
      expect(data).toHaveProperty("overview");
      expect(data).toHaveProperty("userBehavior");
      expect(data).toHaveProperty("performance");
      expect(data).toHaveProperty("conversions");
      expect(data).toHaveProperty("veteranInsights");
      expect(data).toHaveProperty("realTime");
    });

    it("uses stored page view data for overview", () => {
      localStorage.setItem(
        "mh_analytics_pageviews",
        JSON.stringify({
          total: 100,
          unique: 40,
          sessions: 60,
          pages: { "/home": 50, "/about": 30, "/contact": 20 },
          veteran: 15,
        }),
      );
      const data = engine.getDashboardData();
      expect(data.overview.pageViews).toBe(100);
      expect(data.overview.totalUsers).toBe(40);
      expect(data.overview.totalSessions).toBe(60);
      // topPages built from stored pages
      expect(data.overview.topPages).toHaveLength(3);
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      expect(data.overview.topPages[0]!.page).toBe("/home");
    });

    it("calculates non-zero conversion rate when conversions exist", () => {
      localStorage.setItem(
        "mh_analytics_pageviews",
        JSON.stringify({
          total: 100,
          unique: 40,
          sessions: 60,
          pages: {},
          veteran: 10,
        }),
      );
      localStorage.setItem(
        "mh_analytics_conversions",
        JSON.stringify({ total: 5, consultations: 2, contacts: 3 }),
      );
      const data = engine.getDashboardData();
      expect(data.overview.conversionRate).toBeCloseTo(0.05);
      expect(data.conversions.estimatorToContact).toBe(3);
      expect(data.conversions.recommendationToInquiry).toBe(2);
    });

    it("calculates average session duration from stored sessions", () => {
      localStorage.setItem(
        "mh_analytics_sessions",
        JSON.stringify([
          { duration: 120, pageViews: 3 },
          { duration: 60, pageViews: 1 },
          { duration: 180, pageViews: 5 },
        ]),
      );
      const data = engine.getDashboardData();
      expect(data.overview.averageSessionDuration).toBe(120); // (120+60+180)/3
    });

    it("calculates bounce rate from stored sessions", () => {
      localStorage.setItem(
        "mh_analytics_sessions",
        JSON.stringify([
          { pageViews: 1, duration: 10 }, // bounce
          { pageViews: 3, duration: 120 },
          { pageViews: 1, duration: 5 }, // bounce
        ]),
      );
      const data = engine.getDashboardData();
      expect(data.overview.bounceRate).toBeCloseTo(2 / 3);
    });

    it("returns zero avg session duration for empty sessions array", () => {
      localStorage.setItem("mh_analytics_sessions", JSON.stringify([]));
      const data = engine.getDashboardData();
      expect(data.overview.averageSessionDuration).toBe(0);
    });

    it("uses performance API when available", () => {
      const getEntriesByTypeMock = jest
        .fn()
        .mockImplementation((type: string) => {
          if (type === "navigation") {
            return [
              {
                loadEventEnd: 1200,
                fetchStart: 100,
                domInteractive: 900,
              } as unknown as PerformanceEntry,
            ];
          }
          if (type === "paint") {
            return [
              {
                name: "first-contentful-paint",
                startTime: 800,
              } as unknown as PerformanceEntry,
            ];
          }
          return [];
        });
      Object.defineProperty(global.performance, "getEntriesByType", {
        value: getEntriesByTypeMock,
        writable: true,
        configurable: true,
      });
      const data = engine.getDashboardData();
      expect(data.performance.coreWebVitals.lcp).toBe(1100); // loadEventEnd - fetchStart
      expect(data.performance.coreWebVitals.fcp).toBe(800);
      // Restore to no-op stub
      Object.defineProperty(global.performance, "getEntriesByType", {
        value: jest.fn().mockReturnValue([]),
        writable: true,
        configurable: true,
      });
    });

    it("handles broken localStorage in getStoredPageViews gracefully", () => {
      localStorage.setItem("mh_analytics_pageviews", "not-json");
      expect(() => engine.getDashboardData()).not.toThrow();
    });

    it("handles broken localStorage in getStoredConversions gracefully", () => {
      localStorage.setItem("mh_analytics_conversions", "not-json");
      expect(() => engine.getDashboardData()).not.toThrow();
    });

    it("handles broken performance API gracefully", () => {
      Object.defineProperty(global.performance, "getEntriesByType", {
        value: jest.fn().mockImplementation(() => {
          throw new Error("perf api error");
        }),
        writable: true,
        configurable: true,
      });
      expect(() => engine.getDashboardData()).not.toThrow();
      // Restore stub
      Object.defineProperty(global.performance, "getEntriesByType", {
        value: jest.fn().mockReturnValue([]),
        writable: true,
        configurable: true,
      });
    });

    it("returns empty structure when getDashboardData itself throws", () => {
      // Force an error by making getStoredPageViews throw via localStorage misbehaving at top level
      jest.spyOn(Storage.prototype, "getItem").mockImplementation(() => {
        throw new Error("storage failure");
      });
      const data = engine.getDashboardData();
      // Should return the fallback empty structure
      expect(data).toHaveProperty("overview");
      jest.restoreAllMocks();
    });
  });

  // ---------- Stubs ----------

  describe("getUserJourney()", () => {
    it("returns undefined (not yet implemented)", () => {
      expect(engine.getUserJourney("some-session")).toBeUndefined();
    });
  });

  describe("getEvents()", () => {
    it("returns empty array (not yet implemented)", () => {
      expect(engine.getEvents({ type: "page_view" })).toEqual([]);
    });
  });

  describe("exportData()", () => {
    it("returns JSON string of empty array", () => {
      expect(engine.exportData("json")).toBe("[]");
    });

    it("accepts csv format without throwing", () => {
      expect(() => engine.exportData("csv")).not.toThrow();
    });
  });

  // ---------- registerCustomTracker ----------

  describe("registerCustomTracker()", () => {
    it("registers tracker and calls it on subsequent track events", () => {
      const tracker = jest.fn();
      engine.registerCustomTracker("my-tracker", tracker);
      engine.track("page_view", { page: "/test" });
      expect(tracker).toHaveBeenCalledTimes(1);
    });

    it("overwrites a tracker registered with the same name", () => {
      const first = jest.fn();
      const second = jest.fn();
      engine.registerCustomTracker("dup", first);
      engine.registerCustomTracker("dup", second);
      engine.track("page_view", {});
      expect(first).not.toHaveBeenCalled();
      expect(second).toHaveBeenCalledTimes(1);
    });
  });

  // ---------- Window event listeners ----------

  describe("window error listener (setupErrorTracking)", () => {
    it("tracks errors fired on the window", async () => {
      const spy = jest.spyOn(AdvancedAnalyticsEngine.prototype, "trackError");
      new AdvancedAnalyticsEngine();
      await flushInit();
      window.dispatchEvent(
        new ErrorEvent("error", {
          message: "script error",
          filename: "app.js",
          lineno: 42,
          colno: 7,
        }),
      );
      expect(spy).toHaveBeenCalledWith(
        expect.objectContaining({ message: "script error" }),
        expect.objectContaining({ filename: "app.js" }),
      );
      spy.mockRestore();
    });

    it("tracks unhandled promise rejections", async () => {
      const spy = jest.spyOn(AdvancedAnalyticsEngine.prototype, "trackError");
      new AdvancedAnalyticsEngine();
      await flushInit();
      window.dispatchEvent(
        new PromiseRejectionEvent("unhandledrejection", {
          promise: Promise.resolve(),
          reason: { message: "promise blown up" },
        }),
      );
      expect(spy).toHaveBeenCalledWith(
        expect.objectContaining({ message: "promise blown up" }),
        expect.any(Object),
      );
      spy.mockRestore();
    });

    it("handles rejection reason without message property", async () => {
      const spy = jest.spyOn(AdvancedAnalyticsEngine.prototype, "trackError");
      new AdvancedAnalyticsEngine();
      await flushInit();
      window.dispatchEvent(
        new PromiseRejectionEvent("unhandledrejection", {
          promise: Promise.resolve(),
          reason: "string-reason",
        }),
      );
      expect(spy).toHaveBeenCalledWith(
        expect.objectContaining({ message: "Unhandled Promise Rejection" }),
        expect.any(Object),
      );
      spy.mockRestore();
    });
  });

  describe("document visibilitychange listener (setupEventListeners)", () => {
    it("tracks page hidden event", async () => {
      const spy = jest.spyOn(AdvancedAnalyticsEngine.prototype, "track");
      new AdvancedAnalyticsEngine();
      await flushInit();
      Object.defineProperty(document, "hidden", {
        value: true,
        writable: true,
        configurable: true,
      });
      document.dispatchEvent(new Event("visibilitychange"));
      expect(spy).toHaveBeenCalledWith(
        "user_interaction",
        expect.objectContaining({ action: "page_hidden" }),
      );
      spy.mockRestore();
    });

    it("tracks page visible event", async () => {
      const spy = jest.spyOn(AdvancedAnalyticsEngine.prototype, "track");
      new AdvancedAnalyticsEngine();
      await flushInit();
      Object.defineProperty(document, "hidden", {
        value: false,
        writable: true,
        configurable: true,
      });
      document.dispatchEvent(new Event("visibilitychange"));
      expect(spy).toHaveBeenCalledWith(
        "user_interaction",
        expect.objectContaining({ action: "page_visible" }),
      );
      spy.mockRestore();
    });
  });

  // ---------- Private _get* methods (via any cast, @ts-expect-error in source) ----------

  describe("_getOverviewMetrics()", () => {
    it("returns overview metrics using calculator", () => {
      const events = [makeEvent(), makeEvent({ type: "page_view" })];
      const sessions = [makeSession()];
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const overview = (engine as any)._getOverviewMetrics(events, sessions);
      expect(overview.totalUsers).toBe(5); // from mockCalculator.countUniqueUsers
      expect(overview.totalSessions).toBe(1);
      expect(overview.pageViews).toBe(2); // both events are page_view
      expect(
        mockCalculator["calculateAverageSessionDuration"],
      ).toHaveBeenCalled();
      expect(mockCalculator["calculateBounceRate"]).toHaveBeenCalled();
    });
  });

  describe("_getUserBehaviorMetrics()", () => {
    it("returns behavior metrics with device breakdowns", () => {
      const desktopEvent = makeEvent(); // device.type = desktop from mock
      const events = [
        desktopEvent,
        makeEvent({ type: "estimator_usage" }),
        makeEvent({ type: "recommendation_view" }),
        makeEvent({ type: "recommendation_click" }),
      ];
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const behavior = (engine as any)._getUserBehaviorMetrics(events, []);
      expect(behavior.deviceBreakdown.desktop).toBe(4); // all events have device.type = desktop
      expect(behavior.estimatorUsage.totalUsage).toBe(1);
      expect(behavior.recommendationEngagement.impressions).toBe(1);
      expect(behavior.recommendationEngagement.clicks).toBe(1);
    });
  });

  describe("_getPerformanceAnalytics()", () => {
    it("returns performance analytics using calculator", () => {
      const events = [makeEvent({ type: "error_event" })];
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const perf = (engine as any)._getPerformanceAnalytics(events);
      expect(mockCalculator["calculateCoreWebVitals"]).toHaveBeenCalledWith(
        events,
      );
      expect(perf.errorRates.totalErrors).toBe(1);
      expect(perf.resourceMetrics.requestCount).toBe(1);
    });
  });

  describe("_getConversionAnalytics()", () => {
    it("returns conversion analytics using calculator", () => {
      const events = [makeEvent()];
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const conv = (engine as any)._getConversionAnalytics(events, []);
      expect(
        mockCalculator["calculateEstimatorToContactRate"],
      ).toHaveBeenCalledWith(events);
      expect(
        mockCalculator["calculateRecommendationToInquiryRate"],
      ).toHaveBeenCalledWith(events);
      expect(conv.estimatorToContact).toBe(0.2);
      expect(conv.recommendationToInquiry).toBe(0.15);
    });
  });

  describe("_getVeteranAnalytics()", () => {
    it("returns veteran analytics using calculator", () => {
      const contactEvent = makeEvent({ type: "contact_specialist" });
      const events = [contactEvent];
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const vet = (engine as any)._getVeteranAnalytics(events, []);
      expect(mockCalculator["countVeteranUsers"]).toHaveBeenCalledWith(events);
      expect(vet.veteranUsers).toBe(2);
      expect(vet.specialistEngagement.contacts).toBe(1);
    });
  });

  describe("_getRealTimeMetrics()", () => {
    it("returns real-time metrics with active sessions", () => {
      const session = makeSession({
        sessionId: "active-1",
        pages: ["/home", "/services"],
        events: [makeEvent(), makeEvent()],
        conversions: [],
      });
      mockCalculator["getActiveSessions"]!.mockReturnValueOnce([session]);
      const events = [makeEvent(), makeEvent(), makeEvent()];
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const rt = (engine as any)._getRealTimeMetrics(events, [session]);
      expect(rt.activeUsers).toBe(1);
      expect(rt.currentSessions[0].sessionId).toBe("active-1");
      expect(rt.currentSessions[0].currentPage).toBe("/services");
      expect(rt.recentEvents).toHaveLength(3); // slice(-100) of 3 events
      expect(rt.systemHealth.status).toBe("healthy");
    });

    it("handles sessions with no conversions in flatMap", () => {
      const session = makeSession({ conversions: [] });
      mockCalculator["getActiveSessions"]!.mockReturnValueOnce([session]);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const rt = (engine as any)._getRealTimeMetrics([], [session]);
      expect(rt.liveConversions).toHaveLength(0);
    });
  });
});
