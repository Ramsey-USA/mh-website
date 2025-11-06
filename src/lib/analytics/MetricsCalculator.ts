/**
 * Metrics Calculator
 * Handles all analytics calculations and aggregations
 */

import type {
  AnalyticsEvent,
  UserJourney,
  PageMetric,
  TrafficSource,
  CoreWebVitals,
  PerformanceMetrics,
} from "./types";

export class MetricsCalculator {
  /**
   * Calculate average session duration
   */
  calculateAverageSessionDuration(sessions: UserJourney[]): number {
    if (sessions.length === 0) return 0;

    const total = sessions.reduce((sum, s) => sum + s.totalDuration, 0);
    return Math.round(total / sessions.length);
  }

  /**
   * Calculate bounce rate
   */
  calculateBounceRate(sessions: UserJourney[]): number {
    if (sessions.length === 0) return 0;

    const bounced = sessions.filter((s) => s.bounceRate).length;
    return Number(((bounced / sessions.length) * 100).toFixed(2));
  }

  /**
   * Calculate conversion rate
   */
  calculateConversionRate(
    sessions: UserJourney[],
    totalConversions: number,
  ): number {
    if (sessions.length === 0) return 0;

    return Number(((totalConversions / sessions.length) * 100).toFixed(2));
  }

  /**
   * Calculate veteran user percentage
   */
  calculateVeteranUserPercentage(
    events: AnalyticsEvent[],
    totalUsers: number,
  ): number {
    if (totalUsers === 0) return 0;

    const veteranEvents = events.filter(
      (e) =>
        e.properties.isVeteran ||
        e.type === "veteran_benefit_view" ||
        e.properties.userType === "veteran",
    );

    const uniqueVeteranUsers = new Set(
      veteranEvents.map((e) => e.userId).filter(Boolean),
    ).size;

    return Number(((uniqueVeteranUsers / totalUsers) * 100).toFixed(2));
  }

  /**
   * Get top pages by views
   */
  getTopPages(events: AnalyticsEvent[], limit: number = 10): PageMetric[] {
    const pageViews = events.filter((e) => e.type === "page_view");
    const pageStats = new Map<
      string,
      {
        views: number;
        uniqueUsers: Set<string>;
        totalTime: number;
        bounces: number;
      }
    >();

    pageViews.forEach((event) => {
      const page = event.properties.page || event.metadata.page;
      if (!page) return;

      const stats = pageStats.get(page) || {
        views: 0,
        uniqueUsers: new Set(),
        totalTime: 0,
        bounces: 0,
      };

      stats.views++;
      if (event.userId) stats.uniqueUsers.add(event.userId);
      if (event.properties.timeOnPage) {
        stats.totalTime += event.properties.timeOnPage;
      }
      if (event.properties.bounced) {
        stats.bounces++;
      }

      pageStats.set(page, stats);
    });

    return Array.from(pageStats.entries())
      .map(([page, stats]) => ({
        page,
        views: stats.views,
        uniqueViews: stats.uniqueUsers.size,
        averageTime:
          stats.views > 0 ? Math.round(stats.totalTime / stats.views) : 0,
        bounceRate:
          stats.views > 0
            ? Number(((stats.bounces / stats.views) * 100).toFixed(2))
            : 0,
      }))
      .sort((a, b) => b.views - a.views)
      .slice(0, limit);
  }

  /**
   * Get traffic sources
   */
  getTrafficSources(
    events: AnalyticsEvent[],
    sessions: UserJourney[],
  ): TrafficSource[] {
    const sources = new Map<
      string,
      {
        sessions: Set<string>;
        users: Set<string>;
        conversions: number;
      }
    >();

    events.forEach((event) => {
      const source =
        event.properties.source || event.metadata.referrer || "direct";

      const stats = sources.get(source) || {
        sessions: new Set(),
        users: new Set(),
        conversions: 0,
      };

      stats.sessions.add(event.sessionId);
      if (event.userId) stats.users.add(event.userId);
      if (event.type === "conversion_event") {
        stats.conversions++;
      }

      sources.set(source, stats);
    });

    return Array.from(sources.entries())
      .map(([source, stats]) => ({
        source,
        sessions: stats.sessions.size,
        users: stats.users.size,
        conversionRate:
          stats.sessions.size > 0
            ? Number(
                ((stats.conversions / stats.sessions.size) * 100).toFixed(2),
              )
            : 0,
      }))
      .sort((a, b) => b.sessions - a.sessions);
  }

  /**
   * Calculate Core Web Vitals
   */
  calculateCoreWebVitals(events: AnalyticsEvent[]): CoreWebVitals {
    const perfEvents = events.filter((e) => e.type === "performance_metric");

    if (perfEvents.length === 0) {
      return {
        lcp: 0,
        fid: 0,
        cls: 0,
        fcp: 0,
        ttfb: 0,
      };
    }

    const metrics = perfEvents.map(
      (e) => e.properties as Partial<PerformanceMetrics>,
    );

    const avg = (values: number[]) => {
      const filtered = values.filter((v) => v > 0);
      return filtered.length > 0
        ? filtered.reduce((sum, v) => sum + v, 0) / filtered.length
        : 0;
    };

    return {
      lcp: Number(
        avg(metrics.map((m) => m.largestContentfulPaint || 0)).toFixed(2),
      ),
      fid: Number(avg(metrics.map((m) => m.firstInputDelay || 0)).toFixed(2)),
      cls: Number(
        avg(metrics.map((m) => m.cumulativeLayoutShift || 0)).toFixed(3),
      ),
      fcp: Number(
        avg(metrics.map((m) => m.firstContentfulPaint || 0)).toFixed(2),
      ),
      ttfb: Number(avg(metrics.map((m) => m.loadTime || 0)).toFixed(2)),
    };
  }

  /**
   * Count unique users
   */
  countUniqueUsers(events: AnalyticsEvent[]): number {
    const userIds = new Set(events.map((e) => e.userId).filter(Boolean));
    return userIds.size;
  }

  /**
   * Count total conversions
   */
  countTotalConversions(sessions: UserJourney[]): number {
    return sessions.reduce((sum, s) => sum + s.conversions.length, 0);
  }

  /**
   * Calculate estimator to contact conversion rate
   */
  calculateEstimatorToContactRate(events: AnalyticsEvent[]): number {
    const estimatorEvents = events.filter((e) => e.type === "estimator_usage");
    const contactEvents = events.filter((e) => e.type === "contact_specialist");

    if (estimatorEvents.length === 0) return 0;

    // Find users who used estimator and then contacted
    const estimatorUsers = new Set(
      estimatorEvents.map((e) => e.userId).filter(Boolean),
    );
    const contactedAfterEstimator = contactEvents.filter(
      (e) => e.userId && estimatorUsers.has(e.userId),
    );

    return Number(
      ((contactedAfterEstimator.length / estimatorEvents.length) * 100).toFixed(
        2,
      ),
    );
  }

  /**
   * Calculate recommendation to inquiry conversion rate
   */
  calculateRecommendationToInquiryRate(events: AnalyticsEvent[]): number {
    const recommendationViews = events.filter(
      (e) => e.type === "recommendation_view",
    );
    const inquiries = events.filter((e) => e.type === "project_inquiry");

    if (recommendationViews.length === 0) return 0;

    const viewUsers = new Set(
      recommendationViews.map((e) => e.userId).filter(Boolean),
    );
    const inquiriesAfterView = inquiries.filter(
      (e) => e.userId && viewUsers.has(e.userId),
    );

    return Number(
      ((inquiriesAfterView.length / recommendationViews.length) * 100).toFixed(
        2,
      ),
    );
  }

  /**
   * Count veteran users
   */
  countVeteranUsers(events: AnalyticsEvent[]): number {
    const veteranEvents = events.filter(
      (e) =>
        e.properties.isVeteran ||
        e.type === "veteran_benefit_view" ||
        e.properties.userType === "veteran",
    );

    return new Set(veteranEvents.map((e) => e.userId).filter(Boolean)).size;
  }

  /**
   * Get active sessions
   */
  getActiveSessions(
    sessions: UserJourney[],
    minutesThreshold: number = 30,
  ): UserJourney[] {
    const cutoff = new Date();
    cutoff.setMinutes(cutoff.getMinutes() - minutesThreshold);

    return sessions.filter((s) => {
      const lastEventTime = s.endTime || s.startTime;
      return lastEventTime >= cutoff;
    });
  }

  /**
   * Calculate percentile
   */
  calculatePercentile(values: number[], percentile: number): number {
    if (values.length === 0) return 0;

    const sorted = [...values].sort((a, b) => a - b);
    const index = Math.ceil((percentile / 100) * sorted.length) - 1;
    return sorted[Math.max(0, index)];
  }
}
