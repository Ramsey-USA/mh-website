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

// ─── Additional branch coverage ───────────────────────────────────────────────

describe("MetricsCalculator — additional branches", () => {
  const calculator = new MetricsCalculator();

  // ── getSessionDuration via endTime ────────────────────────────────────────

  it("uses endTime Date when totalDuration is 0 for average session calculation", () => {
    const sessions = [
      createSession({
        sessionId: "s1",
        startTime: new Date("2026-04-21T10:00:00.000Z"),
        endTime: new Date("2026-04-21T10:02:00.000Z"), // 120s
        totalDuration: 0,
      }),
    ];
    expect(calculator.calculateAverageSessionDuration(sessions)).toBe(120_000);
  });

  it("returns 0 for session with no totalDuration and no endTime", () => {
    const sessions = [createSession({ sessionId: "s1", totalDuration: 0 })];
    expect(calculator.calculateAverageSessionDuration(sessions)).toBe(0);
  });

  // ── extractTrafficSource — explicit source property ────────────────────────

  it("getTrafficSources uses explicit 'source' property when present", () => {
    const events = [
      createEvent({
        sessionId: "s1",
        properties: { source: "Newsletter" },
      }),
    ];
    const sessions = [createSession({ sessionId: "s1", conversions: [] })];
    const result = calculator.getTrafficSources(events, sessions);
    expect(result[0]!.source).toBe("newsletter");
  });

  it("getTrafficSources uses utm_source property when present", () => {
    const events = [
      createEvent({
        sessionId: "s1",
        properties: { utm_source: "Google_Ads" },
      }),
    ];
    const sessions = [createSession({ sessionId: "s1", conversions: [] })];
    const result = calculator.getTrafficSources(events, sessions);
    expect(result[0]!.source).toBe("google_ads");
  });

  // ── extractTrafficSource — referrer-based ──────────────────────────────────

  it("identifies bing from referrer hostname", () => {
    const events = [
      createEvent({
        sessionId: "s1",
        metadata: { ...baseMetadata, referrer: "https://www.bing.com/search" },
      }),
    ];
    const sessions = [createSession({ sessionId: "s1", conversions: [] })];
    expect(calculator.getTrafficSources(events, sessions)[0]!.source).toBe(
      "bing",
    );
  });

  it("identifies twitter from twitter.com referrer", () => {
    const events = [
      createEvent({
        sessionId: "s1",
        metadata: { ...baseMetadata, referrer: "https://twitter.com/share" },
      }),
    ];
    const sessions = [createSession({ sessionId: "s1", conversions: [] })];
    expect(calculator.getTrafficSources(events, sessions)[0]!.source).toBe(
      "twitter",
    );
  });

  it("identifies twitter from t.co referrer", () => {
    const events = [
      createEvent({
        sessionId: "s1",
        metadata: { ...baseMetadata, referrer: "https://t.co/abc123" },
      }),
    ];
    const sessions = [createSession({ sessionId: "s1", conversions: [] })];
    expect(calculator.getTrafficSources(events, sessions)[0]!.source).toBe(
      "twitter",
    );
  });

  it("returns the hostname for unknown referrers", () => {
    const events = [
      createEvent({
        sessionId: "s1",
        metadata: {
          ...baseMetadata,
          referrer: "https://custom-partner.com/page",
        },
      }),
    ];
    const sessions = [createSession({ sessionId: "s1", conversions: [] })];
    expect(calculator.getTrafficSources(events, sessions)[0]!.source).toBe(
      "custom-partner.com",
    );
  });

  it("returns 'direct' for a malformed referrer URL", () => {
    const events = [
      createEvent({
        sessionId: "s1",
        metadata: { ...baseMetadata, referrer: "not a url ://" },
      }),
    ];
    const sessions = [createSession({ sessionId: "s1", conversions: [] })];
    expect(calculator.getTrafficSources(events, sessions)[0]!.source).toBe(
      "direct",
    );
  });

  // ── isTruthyVeteranValue string branches ───────────────────────────────────

  it.each([
    "true",
    "yes",
    "veteran",
    "army",
    "navy",
    "air force",
    "marines",
    "coast guard",
    "space force",
  ])("countVeteranUsers counts events with veteran string '%s'", (value) => {
    const events = [
      createEvent({
        sessionId: "s1",
        userId: "u1",
        properties: { veteran: value },
      }),
    ];
    expect(calculator.countVeteranUsers(events)).toBe(1);
  });

  it("countVeteranUsers does not count events with non-veteran strings", () => {
    const events = [
      createEvent({ sessionId: "s1", properties: { veteran: "no" } }),
    ];
    expect(calculator.countVeteranUsers(events)).toBe(0);
  });

  it("countVeteranUsers does not count events with numeric veteran property", () => {
    const events = [
      createEvent({ sessionId: "s1", properties: { veteran: 1 } }),
    ];
    expect(calculator.countVeteranUsers(events)).toBe(0);
  });

  // ── calculateVeteranUserPercentage ────────────────────────────────────────

  it("calculateVeteranUserPercentage returns 0 for totalUsers <= 0", () => {
    const events = [
      createEvent({ sessionId: "s1", properties: { veteran: "army" } }),
    ];
    expect(calculator.calculateVeteranUserPercentage(events, 0)).toBe(0);
    expect(calculator.calculateVeteranUserPercentage(events, -1)).toBe(0);
  });

  // ── getTopPages — averageTime and bounceRate in output ────────────────────

  it("getTopPages computes averageTime and bounceRate from multi-page sessions", () => {
    const t0 = new Date("2026-04-21T10:00:00.000Z");
    const t1 = new Date("2026-04-21T10:01:00.000Z"); // +60s
    const t2 = new Date("2026-04-21T10:02:00.000Z"); // +60s

    const events = [
      createEvent({
        id: "ev1",
        type: "page_view",
        sessionId: "s1",
        timestamp: t0,
        properties: { page: "/home" },
      }),
      createEvent({
        id: "ev2",
        type: "page_view",
        sessionId: "s1",
        timestamp: t1,
        properties: { page: "/about" },
      }),
      createEvent({
        id: "ev3",
        type: "page_view",
        sessionId: "s1",
        timestamp: t2,
        properties: { page: "/contact" },
      }),
    ];

    const pages = calculator.getTopPages(events, 10);
    const home = pages.find((p) => p.page === "/home");
    const about = pages.find((p) => p.page === "/about");
    expect(home).toBeDefined();
    expect(about).toBeDefined();
    // 3-page session → bounce rate = 0
    expect(home!.bounceRate).toBe(0);
    expect(about!.bounceRate).toBe(0);
    // averageTime: ev1 → ev2 = 60_000 ms
    expect(home!.averageTime).toBe(60_000);
  });

  it("getTopPages returns bounceRate=1 for single-page sessions", () => {
    const events = [
      createEvent({
        id: "ev1",
        type: "page_view",
        sessionId: "s1",
        properties: { page: "/landing" },
      }),
    ];
    const pages = calculator.getTopPages(events, 10);
    expect(pages[0]!.bounceRate).toBe(1);
    expect(pages[0]!.averageTime).toBe(0); // no next event
  });

  it("getTopPages handles event page from metadata when properties.page is absent", () => {
    const events = [
      createEvent({
        id: "ev1",
        type: "page_view",
        sessionId: "s1",
        metadata: { ...baseMetadata, page: "/meta-page" },
        properties: {},
      }),
    ];
    const pages = calculator.getTopPages(events, 10);
    expect(pages[0]!.page).toBe("/meta-page");
  });

  // ── getTrafficSources — session without matching event ────────────────────

  it("getTrafficSources defaults to 'direct' for sessions with no matching event", () => {
    // No events for this session → firstEvent will be undefined
    const sessions = [
      createSession({ sessionId: "no-event-session", conversions: [] }),
    ];
    const result = calculator.getTrafficSources([], sessions);
    expect(result[0]!.source).toBe("direct");
  });

  // ── countTotalConversions ─────────────────────────────────────────────────

  it("countTotalConversions sums conversions across all sessions", () => {
    const sessions = [
      createSession({
        sessionId: "s1",
        conversions: [
          {
            type: "contact_form",
            value: 1,
            timestamp: new Date(),
            properties: {},
          },
          {
            type: "specialist_contact" as const,
            value: 1,
            timestamp: new Date(),
            properties: {},
          },
        ],
      }),
      createSession({
        sessionId: "s2",
        conversions: [
          {
            type: "contact_form",
            value: 1,
            timestamp: new Date(),
            properties: {},
          },
        ],
      }),
    ];
    expect(calculator.countTotalConversions(sessions)).toBe(3);
    expect(calculator.countTotalConversions([])).toBe(0);
  });
});
