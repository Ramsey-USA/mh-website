/**
 * Metrics Calculator
 * Handles analytics calculations
 */

import type {
  AnalyticsEvent,
  UserJourney,
  PageMetric,
  TrafficSource,
  CoreWebVitals,
} from "./types";

type PageAggregate = {
  views: number;
  uniqueVisitors: Set<string>;
  sessionIds: Set<string>;
  bounceSessions: Set<string>;
  totalTime: number;
};

function getSessionDuration(session: UserJourney): number {
  if (session.totalDuration > 0) {
    return session.totalDuration;
  }

  if (session.endTime instanceof Date) {
    return Math.max(session.endTime.getTime() - session.startTime.getTime(), 0);
  }

  return 0;
}

function getVisitorId(event: AnalyticsEvent): string {
  return event.userId || event.sessionId;
}

function getEventPage(event: AnalyticsEvent): string {
  const pageFromProps = event.properties["page"];
  if (typeof pageFromProps === "string" && pageFromProps.trim()) {
    return pageFromProps;
  }

  return event.metadata.page || "/";
}

function extractTrafficSource(event: AnalyticsEvent): string {
  const explicitSource = event.properties["source"];
  if (typeof explicitSource === "string" && explicitSource.trim()) {
    return explicitSource.trim().toLowerCase();
  }

  const utmSource = event.properties["utm_source"];
  if (typeof utmSource === "string" && utmSource.trim()) {
    return utmSource.trim().toLowerCase();
  }

  const referrer = event.metadata.referrer?.trim();
  if (!referrer) {
    return "direct";
  }

  try {
    const hostname = new URL(referrer).hostname.toLowerCase();

    if (hostname.includes("google")) return "google";
    if (hostname.includes("bing")) return "bing";
    if (hostname.includes("facebook")) return "facebook";
    if (hostname.includes("linkedin")) return "linkedin";
    if (hostname.includes("twitter") || hostname.includes("t.co")) {
      return "twitter";
    }

    return hostname;
  } catch {
    return "direct";
  }
}

function isTruthyVeteranValue(value: unknown): boolean {
  if (typeof value === "boolean") {
    return value;
  }

  if (typeof value === "string") {
    const normalized = value.trim().toLowerCase();
    return [
      "true",
      "yes",
      "veteran",
      "army",
      "navy",
      "air force",
      "marines",
      "coast guard",
      "space force",
    ].includes(normalized);
  }

  return false;
}

function isVeteranEvent(event: AnalyticsEvent): boolean {
  if (event.type === "veteran_benefit_view") {
    return true;
  }

  const keys = [
    "veteran",
    "isVeteran",
    "veteranStatus",
    "militaryBranch",
    "serviceBranch",
    "veteranOwned",
  ] as const;

  return keys.some((key) => isTruthyVeteranValue(event.properties[key]));
}

function average(values: number[]): number {
  if (values.length === 0) return 0;
  return values.reduce((sum, value) => sum + value, 0) / values.length;
}

export class MetricsCalculator {
  calculateAverageSessionDuration(sessions: UserJourney[]): number {
    if (sessions.length === 0) return 0;

    const total = sessions.reduce(
      (sum, session) => sum + getSessionDuration(session),
      0,
    );

    return Math.round(total / sessions.length);
  }

  calculateBounceRate(sessions: UserJourney[]): number {
    if (sessions.length === 0) return 0;

    const bounces = sessions.filter(
      (session) =>
        session.bounceRate ||
        session.pages.length <= 1 ||
        session.events.length <= 1,
    ).length;

    return bounces / sessions.length;
  }

  calculateConversionRate(
    sessions: UserJourney[],
    totalConversions: number,
  ): number {
    if (sessions.length === 0) return 0;
    return totalConversions / sessions.length;
  }

  calculateVeteranUserPercentage(
    events: AnalyticsEvent[],
    totalUsers: number,
  ): number {
    if (totalUsers <= 0) return 0;
    return this.countVeteranUsers(events) / totalUsers;
  }

  getTopPages(events: AnalyticsEvent[], limit = 10): PageMetric[] {
    const pageEvents = events
      .filter((event) => event.type === "page_view")
      .sort((a, b) => a.timestamp.getTime() - b.timestamp.getTime());

    const aggregates = new Map<string, PageAggregate>();
    const eventsBySession = new Map<string, AnalyticsEvent[]>();

    for (const event of events) {
      const sessionEvents = eventsBySession.get(event.sessionId) || [];
      sessionEvents.push(event);
      eventsBySession.set(event.sessionId, sessionEvents);
    }

    for (const sessionEvents of eventsBySession.values()) {
      sessionEvents.sort(
        (a, b) => a.timestamp.getTime() - b.timestamp.getTime(),
      );
    }

    for (const event of pageEvents) {
      const page = getEventPage(event);
      const aggregate = aggregates.get(page) || {
        views: 0,
        uniqueVisitors: new Set<string>(),
        sessionIds: new Set<string>(),
        bounceSessions: new Set<string>(),
        totalTime: 0,
      };

      aggregate.views += 1;
      aggregate.uniqueVisitors.add(getVisitorId(event));
      aggregate.sessionIds.add(event.sessionId);

      const sessionPageViews =
        eventsBySession
          .get(event.sessionId)
          ?.filter((sessionEvent) => sessionEvent.type === "page_view") || [];

      if (sessionPageViews.length <= 1) {
        aggregate.bounceSessions.add(event.sessionId);
      }

      const sessionEvents = eventsBySession.get(event.sessionId) || [];
      const currentIndex = sessionEvents.findIndex(
        (sessionEvent) => sessionEvent.id === event.id,
      );
      const nextEvent =
        currentIndex >= 0 ? sessionEvents[currentIndex + 1] : undefined;
      if (nextEvent) {
        aggregate.totalTime += Math.max(
          nextEvent.timestamp.getTime() - event.timestamp.getTime(),
          0,
        );
      }

      aggregates.set(page, aggregate);
    }

    return Array.from(aggregates.entries())
      .map(([page, aggregate]) => ({
        page,
        views: aggregate.views,
        uniqueViews: aggregate.uniqueVisitors.size,
        averageTime:
          aggregate.views > 0
            ? Math.round(aggregate.totalTime / aggregate.views)
            : 0,
        bounceRate:
          aggregate.sessionIds.size > 0
            ? aggregate.bounceSessions.size / aggregate.sessionIds.size
            : 0,
      }))
      .sort((a, b) => b.views - a.views || b.uniqueViews - a.uniqueViews)
      .slice(0, limit);
  }

  getTrafficSources(
    events: AnalyticsEvent[],
    sessions: UserJourney[],
  ): TrafficSource[] {
    const firstEventBySession = new Map<string, AnalyticsEvent>();

    for (const event of events) {
      const existing = firstEventBySession.get(event.sessionId);
      if (!existing || existing.timestamp > event.timestamp) {
        firstEventBySession.set(event.sessionId, event);
      }
    }

    const aggregates = new Map<
      string,
      { sessions: number; users: Set<string>; convertingSessions: number }
    >();

    for (const session of sessions) {
      const firstEvent = firstEventBySession.get(session.sessionId);
      const source = firstEvent ? extractTrafficSource(firstEvent) : "direct";
      const aggregate = aggregates.get(source) || {
        sessions: 0,
        users: new Set<string>(),
        convertingSessions: 0,
      };

      aggregate.sessions += 1;
      aggregate.users.add(session.userId || session.sessionId);
      if (session.conversions.length > 0) {
        aggregate.convertingSessions += 1;
      }

      aggregates.set(source, aggregate);
    }

    return Array.from(aggregates.entries())
      .map(([source, aggregate]) => ({
        source,
        sessions: aggregate.sessions,
        users: aggregate.users.size,
        conversionRate:
          aggregate.sessions > 0
            ? aggregate.convertingSessions / aggregate.sessions
            : 0,
      }))
      .sort((a, b) => b.sessions - a.sessions || b.users - a.users);
  }

  calculateCoreWebVitals(events: AnalyticsEvent[]): CoreWebVitals {
    const performanceEvents = events.filter(
      (event) => event.type === "performance_metric",
    );

    const getMetricAverage = (keys: string[]): number => {
      const values = performanceEvents
        .flatMap((event) =>
          keys
            .map((key) => event.properties[key])
            .filter((value): value is number => typeof value === "number"),
        )
        .filter((value) => Number.isFinite(value));

      return average(values);
    };

    return {
      lcp: getMetricAverage(["largestContentfulPaint", "lcp"]),
      fid: getMetricAverage(["firstInputDelay", "fid"]),
      cls: getMetricAverage(["cumulativeLayoutShift", "cls"]),
      fcp: getMetricAverage(["firstContentfulPaint", "fcp"]),
      ttfb: getMetricAverage(["timeToFirstByte", "ttfb", "loadTime"]),
    };
  }

  countUniqueUsers(events: AnalyticsEvent[]): number {
    return new Set(events.map(getVisitorId)).size;
  }

  countTotalConversions(sessions: UserJourney[]): number {
    return sessions.reduce(
      (sum, session) => sum + session.conversions.length,
      0,
    );
  }

  calculateEstimatorToContactRate(events: AnalyticsEvent[]): number {
    const estimatorUses = events.filter(
      (event) => event.type === "estimator_usage",
    ).length;
    if (estimatorUses === 0) return 0;

    const contacts = events.filter(
      (event) => event.type === "contact_specialist",
    ).length;

    return contacts / estimatorUses;
  }

  calculateRecommendationToInquiryRate(events: AnalyticsEvent[]): number {
    const clicks = events.filter(
      (event) => event.type === "recommendation_click",
    ).length;
    const impressions = events.filter(
      (event) => event.type === "recommendation_view",
    ).length;
    const denominator = clicks || impressions;
    if (denominator === 0) return 0;

    const inquiries = events.filter(
      (event) => event.type === "project_inquiry",
    ).length;

    return inquiries / denominator;
  }

  countVeteranUsers(events: AnalyticsEvent[]): number {
    return new Set(
      events
        .filter(isVeteranEvent)
        .map((event) => event.userId || event.sessionId),
    ).size;
  }

  getActiveSessions(
    sessions: UserJourney[],
    minutesThreshold = 30,
  ): UserJourney[] {
    const cutoff = new Date();
    cutoff.setMinutes(cutoff.getMinutes() - minutesThreshold);
    return sessions.filter((s) => {
      const lastEventTime = s.endTime || s.startTime;
      return lastEventTime >= cutoff;
    });
  }
}
