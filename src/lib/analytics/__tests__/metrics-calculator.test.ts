import { MetricsCalculator } from "../metrics-calculator";
import type { AnalyticsEvent, EventMetadata, UserJourney } from "../types";

const baseMetadata: EventMetadata = {
  page: "/",
  referrer: "",
  userAgent: "jest",
  device: {
    type: "desktop",
    os: "Linux",
    browser: "Chrome",
    screenResolution: "1920x1080",
    viewportSize: "1440x900",
  },
  location: {
    timezone: "America/Los_Angeles",
    language: "en-US",
  },
};

function createEvent(overrides: Partial<AnalyticsEvent>): AnalyticsEvent {
  return {
    id: overrides.id || `event-${Math.random().toString(36).slice(2)}`,
    type: overrides.type || "page_view",
    timestamp: overrides.timestamp || new Date("2026-03-27T10:00:00.000Z"),
    sessionId: overrides.sessionId || "session-1",
    ...(overrides.userId != null && { userId: overrides.userId }),
    properties: overrides.properties || {},
    metadata: {
      ...baseMetadata,
      ...overrides.metadata,
    },
  };
}

function createSession(overrides: Partial<UserJourney>): UserJourney {
  return {
    sessionId: overrides.sessionId || "session-1",
    ...(overrides.userId != null && { userId: overrides.userId }),
    startTime: overrides.startTime || new Date("2026-03-27T10:00:00.000Z"),
    ...(overrides.endTime != null && { endTime: overrides.endTime }),
    events: overrides.events || [],
    pages: overrides.pages || [],
    conversions: overrides.conversions || [],
    totalDuration: overrides.totalDuration || 0,
    bounceRate: overrides.bounceRate || false,
  };
}

describe("MetricsCalculator", () => {
  const calculator = new MetricsCalculator();

  it("calculates average session duration using total duration or end times", () => {
    const sessions = [
      createSession({ totalDuration: 120_000 }),
      createSession({
        sessionId: "session-2",
        startTime: new Date("2026-03-27T10:00:00.000Z"),
        endTime: new Date("2026-03-27T10:03:00.000Z"),
      }),
    ];

    expect(calculator.calculateAverageSessionDuration(sessions)).toBe(150_000);
    expect(calculator.calculateAverageSessionDuration([])).toBe(0);
  });

  it("calculates bounce and conversion rates from session data", () => {
    const sessions = [
      createSession({
        sessionId: "session-1",
        pages: ["/home"],
        events: [createEvent({ sessionId: "session-1" })],
        bounceRate: true,
        conversions: [],
      }),
      createSession({
        sessionId: "session-2",
        pages: ["/home", "/contact"],
        events: [
          createEvent({ sessionId: "session-2" }),
          createEvent({
            id: "e2",
            sessionId: "session-2",
            type: "project_inquiry",
          }),
        ],
        conversions: [
          {
            type: "project_inquiry",
            value: 1,
            timestamp: new Date("2026-03-27T10:02:00.000Z"),
            properties: {},
          },
        ],
      }),
    ];

    expect(calculator.calculateBounceRate(sessions)).toBe(0.5);
    expect(calculator.countTotalConversions(sessions)).toBe(1);
    expect(calculator.calculateConversionRate(sessions, 1)).toBe(0.5);
    expect(calculator.calculateConversionRate([], 3)).toBe(0);
  });

  it("counts unique users with session fallback and veteran user percentage", () => {
    const events = [
      createEvent({ sessionId: "session-1", userId: "user-1" }),
      createEvent({
        sessionId: "session-2",
        userId: "user-2",
        type: "veteran_benefit_view",
      }),
      createEvent({
        sessionId: "session-3",
        properties: { veteran: true },
      }),
    ];

    expect(calculator.countUniqueUsers(events)).toBe(3);
    expect(calculator.countVeteranUsers(events)).toBe(2);
    expect(calculator.calculateVeteranUserPercentage(events, 4)).toBe(0.5);
    expect(calculator.calculateVeteranUserPercentage(events, 0)).toBe(0);
  });

  it("aggregates top pages with unique views, time on page, and bounce rate", () => {
    const events = [
      createEvent({
        id: "home-1",
        sessionId: "session-1",
        userId: "user-1",
        timestamp: new Date("2026-03-27T10:00:00.000Z"),
        properties: { page: "/home" },
        metadata: { page: "/home" } as EventMetadata,
      }),
      createEvent({
        id: "home-interaction",
        type: "user_interaction",
        sessionId: "session-1",
        userId: "user-1",
        timestamp: new Date("2026-03-27T10:00:30.000Z"),
        properties: { element: "cta" },
        metadata: { page: "/home" } as EventMetadata,
      }),
      createEvent({
        id: "services-1",
        sessionId: "session-1",
        userId: "user-1",
        timestamp: new Date("2026-03-27T10:01:00.000Z"),
        properties: { page: "/services" },
        metadata: { page: "/services" } as EventMetadata,
      }),
      createEvent({
        id: "home-2",
        sessionId: "session-2",
        userId: "user-2",
        timestamp: new Date("2026-03-27T10:02:00.000Z"),
        properties: { page: "/home" },
        metadata: { page: "/home" } as EventMetadata,
      }),
    ];

    const topPages = calculator.getTopPages(events);

    expect(topPages[0]).toMatchObject({
      page: "/home",
      views: 2,
      uniqueViews: 2,
      averageTime: 15_000,
      bounceRate: 0.5,
    });
    expect(topPages[1]).toMatchObject({
      page: "/services",
      views: 1,
      uniqueViews: 1,
      averageTime: 0,
      bounceRate: 0,
    });
    expect(calculator.getTopPages(events, 1)).toHaveLength(1);
  });

  it("groups traffic sources and calculates per-source conversion rates", () => {
    const events = [
      createEvent({
        sessionId: "session-1",
        userId: "user-1",
        metadata: {
          referrer: "https://www.google.com/search?q=mh",
        } as EventMetadata,
      }),
      createEvent({
        sessionId: "session-2",
        userId: "user-2",
        metadata: { referrer: "" } as EventMetadata,
      }),
      createEvent({
        sessionId: "session-3",
        userId: "user-3",
        properties: { utm_source: "newsletter" },
      }),
    ];

    const sessions = [
      createSession({
        sessionId: "session-1",
        userId: "user-1",
        conversions: [
          {
            type: "contact_form",
            value: 1,
            timestamp: new Date(),
            properties: {},
          },
        ],
      }),
      createSession({ sessionId: "session-2", userId: "user-2" }),
      createSession({
        sessionId: "session-3",
        userId: "user-3",
        conversions: [
          {
            type: "estimate_request",
            value: 1,
            timestamp: new Date(),
            properties: {},
          },
        ],
      }),
    ];

    expect(calculator.getTrafficSources(events, sessions)).toEqual([
      { source: "google", sessions: 1, users: 1, conversionRate: 1 },
      { source: "direct", sessions: 1, users: 1, conversionRate: 0 },
      { source: "newsletter", sessions: 1, users: 1, conversionRate: 1 },
    ]);
  });

  it("averages tracked core web vitals from performance events", () => {
    const events = [
      createEvent({
        type: "performance_metric",
        properties: {
          largestContentfulPaint: 2200,
          firstInputDelay: 50,
          cumulativeLayoutShift: 0.1,
          firstContentfulPaint: 1200,
          timeToFirstByte: 300,
        },
      }),
      createEvent({
        id: "perf-2",
        type: "performance_metric",
        properties: {
          lcp: 1800,
          fid: 30,
          cls: 0.2,
          fcp: 1000,
          loadTime: 500,
        },
      }),
    ];

    expect(calculator.calculateCoreWebVitals(events)).toEqual({
      lcp: 2000,
      fid: 40,
      cls: 0.15000000000000002,
      fcp: 1100,
      ttfb: 400,
    });
    expect(calculator.calculateCoreWebVitals([])).toEqual({
      lcp: 0,
      fid: 0,
      cls: 0,
      fcp: 0,
      ttfb: 0,
    });
  });

  it("calculates estimator-to-contact and recommendation-to-inquiry rates", () => {
    const events = [
      createEvent({ type: "estimator_usage" }),
      createEvent({
        id: "e2",
        type: "estimator_usage",
        sessionId: "session-2",
      }),
      createEvent({ id: "e3", type: "contact_specialist" }),
      createEvent({ id: "e4", type: "recommendation_view" }),
      createEvent({ id: "e5", type: "recommendation_click" }),
      createEvent({ id: "e6", type: "project_inquiry" }),
    ];

    expect(calculator.calculateEstimatorToContactRate(events)).toBe(0.5);
    expect(calculator.calculateRecommendationToInquiryRate(events)).toBe(1);
    expect(calculator.calculateEstimatorToContactRate([])).toBe(0);
    expect(calculator.calculateRecommendationToInquiryRate([])).toBe(0);
  });

  it("returns only active sessions within the requested time window", () => {
    const now = new Date();
    const recent = new Date(now.getTime() - 5 * 60 * 1000);
    const stale = new Date(now.getTime() - 45 * 60 * 1000);

    const sessions = [
      createSession({ sessionId: "recent", startTime: recent }),
      createSession({ sessionId: "stale", startTime: stale }),
      createSession({
        sessionId: "recent-ended",
        startTime: stale,
        endTime: new Date(now.getTime() - 2 * 60 * 1000),
      }),
    ];

    expect(
      calculator
        .getActiveSessions(sessions)
        .map((session) => session.sessionId),
    ).toEqual(["recent", "recent-ended"]);
  });
});
