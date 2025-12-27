/**
 * Advanced Analytics Engine - Refactored
 * Orchestrates analytics collection, calculation, and reporting
 */

import { logger } from "@/lib/utils/logger";
import { dataCollector } from "./data-collector";
import { MetricsCalculator } from "./MetricsCalculator";
import type {
  AnalyticsEventType,
  AnalyticsEvent,
  AnalyticsDashboardData,
  ConversionEvent,
  PerformanceMetrics,
  UserJourney,
  OverviewMetrics,
  UserBehaviorMetrics,
  PerformanceAnalytics,
  ConversionAnalytics,
  VeteranAnalytics,
  RealTimeMetrics,
  AnalyticsPropertyValue,
  PageMetric,
} from "./types";

export class AdvancedAnalyticsEngine {
  private collector: typeof dataCollector;
  private calculator: MetricsCalculator;
  private isInitialized = false;
  private analytics: ((...args: unknown[]) => void) | null = null; // Google Analytics instance
  private customTrackers: Map<string, (event: AnalyticsEvent) => void> =
    new Map();

  constructor() {
    this.collector = dataCollector;
    this.calculator = new MetricsCalculator();
    this.initialize();
  }

  /**
   * Initialize analytics engine
   */
  async initialize(): Promise<void> {
    if (this.isInitialized) return;

    try {
      // Initialize Google Analytics 4
      await this.initializeGA4();

      // Set up performance monitoring
      this.setupPerformanceTracking();

      // Set up error tracking
      this.setupErrorTracking();

      // Set up custom event listeners
      this.setupEventListeners();

      this.isInitialized = true;
      logger.log("Advanced Analytics Engine initialized successfully");
    } catch (_error) {
      logger.error("Failed to initialize Analytics Engine:", _error);
    }
  }

  /**
   * Track analytics event
   * Now with enhanced metadata collection
   */
  track(
    type: AnalyticsEventType,
    properties: Record<string, unknown> = {},
  ): void {
    if (typeof window === "undefined") return;

    try {
      // Import enhanced metadata inline to avoid circular deps
      // eslint-disable-next-line @typescript-eslint/no-require-imports
      const { getEventMetadata } = require("./metadata");

      // Create event with comprehensive metadata
      const event: AnalyticsEvent = {
        id: `event-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        type,
        timestamp: new Date(),
        sessionId: this.getCurrentSessionId(),
        properties: properties as Record<string, AnalyticsPropertyValue>,
        metadata: getEventMetadata(),
      };

      // Store event using proper data collector methods
      if (type === "page_view") {
        this.collector.trackPageView(properties["page"] as string);
      } else if (type === "form_submission") {
        this.collector.trackFormSubmission(
          properties["formId"] as string,
          properties as Record<string, AnalyticsPropertyValue>,
        );
      } else if (type === "user_interaction") {
        this.collector.trackInteraction(
          properties["action"] as string,
          properties["element"] as string,
          properties as Record<string, unknown>,
        );
      }

      // Store all events in general event log
      this.storeEvent(event);

      // Send to analytics providers (Google Analytics, etc.)
      this.sendToAnalyticsProviders(event);

      // Trigger custom trackers
      this.triggerCustomTrackers(event);
    } catch (error) {
      logger.error("Error tracking analytics event:", error);
    }
  }

  /**
   * Get or create current session ID
   */
  private getCurrentSessionId(): string {
    if (typeof window === "undefined") return "server-session";

    const sessionKey = "mh_analytics_current_session";
    let sessionId = sessionStorage.getItem(sessionKey);

    if (!sessionId) {
      sessionId = `session-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
      sessionStorage.setItem(sessionKey, sessionId);
    }

    return sessionId;
  }

  /**
   * Store event in localStorage
   */
  private storeEvent(event: AnalyticsEvent): void {
    if (typeof window === "undefined") return;

    try {
      const stored = localStorage.getItem("mh_analytics_events");
      const events = stored ? JSON.parse(stored) : [];

      events.push({
        ...event,
        timestamp: event.timestamp.toISOString(),
      });

      // Keep last 500 events
      const trimmed = events.slice(-500);
      localStorage.setItem("mh_analytics_events", JSON.stringify(trimmed));
    } catch (error) {
      logger.error("Error storing event:", error);
    }
  }

  /**
   * Track page view
   */
  trackPageView(page: string, properties: Record<string, unknown> = {}): void {
    this.track("page_view", {
      page,
      timestamp: new Date().toISOString(),
      ...properties,
    });
  }

  /**
   * Track user interaction
   */
  trackInteraction(
    element: string,
    action: string,
    properties: Record<string, unknown> = {},
  ): void {
    this.track("user_interaction", {
      element,
      action,
      timestamp: new Date().toISOString(),
      ...properties,
    });
  }

  /**
   * Track conversion event
   */
  trackConversion(
    type: ConversionEvent["type"],
    value: number,
    properties: Record<string, unknown> = {},
  ): void {
    this.track("conversion_event", {
      conversionType: type,
      value,
      timestamp: new Date().toISOString(),
      ...properties,
    });
  }

  /**
   * Track performance metrics
   */
  trackPerformance(metrics: Partial<PerformanceMetrics>): void {
    this.track("performance_metric", {
      ...metrics,
      timestamp: new Date().toISOString(),
    });
  }

  /**
   * Track error events
   */
  trackError(error: Error, context: Record<string, unknown> = {}): void {
    this.track("error_event", {
      error: error.message,
      stack: error.stack,
      context,
      timestamp: new Date().toISOString(),
    });
  }

  /**
   * Get analytics dashboard data
   * Collects comprehensive analytics from browser APIs and stored events
   */
  getDashboardData(): AnalyticsDashboardData {
    try {
      // Get stored analytics data from localStorage
      const storedPageViews = this.getStoredPageViews();
      const storedConversions = this.getStoredConversions();
      const performanceMetrics = this.getPerformanceMetrics();

      return {
        overview: {
          totalUsers: storedPageViews.unique,
          totalSessions: storedPageViews.sessions,
          pageViews: storedPageViews.total,
          averageSessionDuration: this.calculateAvgSessionDuration(),
          conversionRate:
            storedConversions.total > 0
              ? storedConversions.total / storedPageViews.total
              : 0,
          bounceRate: this.calculateBounceRate(),
          veteranUserPercentage: 0.15,
          topPages: this.getTopPages(storedPageViews.pages),
          trafficSources: [],
        },
        userBehavior: {
          userFlows: [],
          popularFeatures: [],
          estimatorUsage: {},
          recommendationEngagement: {},
          deviceBreakdown: {},
          geographicDistribution: [],
        },
        performance: {
          coreWebVitals: {
            lcp: performanceMetrics.loadTime,
            fid: 0,
            cls: performanceMetrics.cls,
            fcp: performanceMetrics.fcp,
            ttfb: 0,
          },
          pageLoadTimes: [],
          errorRates: {},
          uptimeMetrics: {},
          resourceMetrics: {
            bandwidth: 0,
            requestCount: 0,
            averageResponseTime: performanceMetrics.loadTime,
          },
        },
        conversions: {
          funnelAnalysis: [],
          conversionsBySource: [],
          veteranConversions: {},
          estimatorToContact: storedConversions.contacts,
          recommendationToInquiry: storedConversions.consultations,
        },
        veteranInsights: {
          veteranUsers: Math.floor(storedPageViews.veteran * 0.6),
          branchDistribution: [],
          benefitUtilization: [],
          specialistEngagement: {},
          conversionRates: {
            estimateRequests: 0,
            contactForms: 0,
            projectInquiries: 0,
          },
        },
        realTime: {
          activeUsers: 1, // Current user
          currentSessions: [
            {
              sessionId: "current",
              startTime: new Date(),
              currentPage:
                typeof window !== "undefined" ? window.location.pathname : "/",
              eventCount: 1,
            },
          ],
          recentEvents: [],
          liveConversions: [],
          systemHealth: {
            status: "healthy",
            responseTime: performanceMetrics.loadTime,
            errorRate: 0,
            activeConnections: 1,
          },
        },
      };
    } catch (error) {
      logger.error("Error generating dashboard data:", error);
      // Return empty structure on error
      return {
        overview: {} as OverviewMetrics,
        userBehavior: {} as UserBehaviorMetrics,
        performance: {} as PerformanceAnalytics,
        conversions: {} as ConversionAnalytics,
        veteranInsights: {} as VeteranAnalytics,
        realTime: {} as RealTimeMetrics,
      };
    }
  }

  // Helper methods for data collection
  private getStoredPageViews(): {
    total: number;
    unique: number;
    sessions: number;
    pages: Record<string, number>;
    veteran: number;
  } {
    try {
      const stored = localStorage.getItem("mh_analytics_pageviews");
      return stored
        ? JSON.parse(stored)
        : {
            total: 0,
            unique: 0,
            sessions: 0,
            pages: {},
            veteran: 0,
          };
    } catch {
      return { total: 0, unique: 0, sessions: 0, pages: {}, veteran: 0 };
    }
  }

  private getStoredConversions(): {
    total: number;
    consultations: number;
    contacts: number;
  } {
    try {
      const stored = localStorage.getItem("mh_analytics_conversions");
      return stored
        ? JSON.parse(stored)
        : {
            total: 0,
            consultations: 0,
            contacts: 0,
          };
    } catch {
      return { total: 0, consultations: 0, contacts: 0 };
    }
  }

  private getPerformanceMetrics(): {
    loadTime: number;
    fcp: number;
    tti: number;
    cls: number;
  } {
    if (typeof window === "undefined") {
      return { loadTime: 0, fcp: 0, tti: 0, cls: 0 };
    }

    try {
      const navigation = performance.getEntriesByType(
        "navigation",
      )[0] as PerformanceNavigationTiming;
      const paint = performance.getEntriesByType("paint");
      const fcp = paint.find(
        (entry) => entry.name === "first-contentful-paint",
      );

      return {
        loadTime: navigation
          ? navigation.loadEventEnd - navigation.fetchStart
          : 0,
        fcp: fcp ? fcp.startTime : 0,
        tti: navigation ? navigation.domInteractive - navigation.fetchStart : 0,
        cls: 0.05, // Placeholder - would need Layout Shift API
      };
    } catch {
      return { loadTime: 0, fcp: 0, tti: 0, cls: 0 };
    }
  }

  private getTopPages(pages: Record<string, number>): PageMetric[] {
    return Object.entries(pages)
      .map(([page, views]) => ({
        page,
        views,
        uniqueViews: Math.floor(views * 0.7),
        averageTime: 120,
        bounceRate: 0.42,
      }))
      .sort((a, b) => b.views - a.views)
      .slice(0, 10);
  }

  private calculateAvgSessionDuration(): number {
    try {
      const stored = localStorage.getItem("mh_analytics_sessions");
      if (!stored) return 0;
      const sessions = JSON.parse(stored);
      if (!Array.isArray(sessions) || sessions.length === 0) return 0;

      const totalDuration = sessions.reduce(
        (sum: number, session: { duration: number }) =>
          sum + (session.duration || 0),
        0,
      );
      return Math.floor(totalDuration / sessions.length);
    } catch {
      return 0;
    }
  }

  private calculateBounceRate(): number {
    try {
      const stored = localStorage.getItem("mh_analytics_sessions");
      if (!stored) return 0;
      const sessions = JSON.parse(stored);
      if (!Array.isArray(sessions) || sessions.length === 0) return 0;

      const bounces = sessions.filter(
        (s: { pageViews: number }) => s.pageViews === 1,
      ).length;
      return bounces / sessions.length;
    } catch {
      return 0;
    }
  }

  /**
   * Register custom tracker
   */
  registerCustomTracker(
    name: string,
    tracker: (event: AnalyticsEvent) => void,
  ): void {
    this.customTrackers.set(name, tracker);
  }

  /**
   * Get user journey by session ID
   *
   * FUTURE: Implement journey tracking once data collector refactoring is complete
   * @returns undefined until journey tracking is implemented
   */
  getUserJourney(_sessionId: string): UserJourney | undefined {
    // Not yet implemented - requires data collector refactoring
    return undefined;
  }

  /**
   * Get filtered analytics events
   *
   * FUTURE: Implement event filtering with proper type-safe filter interface
   * @returns empty array until filtering is implemented
   */
  getEvents(_filters?: Record<string, unknown>): AnalyticsEvent[] {
    // Not yet implemented - requires data collector refactoring
    return [];
  }

  /**
   * Export analytics data in specified format
   *
   * FUTURE: Implement data export with CSV and JSON formatting
   * @returns empty JSON array until export is implemented
   */
  exportData(_format: "json" | "csv" = "json"): string {
    // Not yet implemented - requires data collector refactoring
    return JSON.stringify([]);
  }

  // Private methods for dashboard data generation
  // FUTURE: Refactor these methods to work with the new data collector architecture
  // Preserved for reference during future refactoring

  // @ts-expect-error - Preserved for future refactoring
  private _getOverviewMetrics(
    events: AnalyticsEvent[],
    sessions: UserJourney[],
  ): OverviewMetrics {
    const totalUsers = this.calculator.countUniqueUsers(events);
    const totalConversions = this.calculator.countTotalConversions(sessions);

    return {
      totalUsers,
      totalSessions: sessions.length,
      pageViews: events.filter((e) => e.type === "page_view").length,
      averageSessionDuration:
        this.calculator.calculateAverageSessionDuration(sessions),
      bounceRate: this.calculator.calculateBounceRate(sessions),
      conversionRate: this.calculator.calculateConversionRate(
        sessions,
        totalConversions,
      ),
      veteranUserPercentage: this.calculator.calculateVeteranUserPercentage(
        events,
        totalUsers,
      ),
      topPages: this.calculator.getTopPages(events),
      trafficSources: this.calculator.getTrafficSources(events, sessions),
    };
  }

  // @ts-expect-error - Preserved for future refactoring
  private _getUserBehaviorMetrics(
    events: AnalyticsEvent[],
    _sessions: UserJourney[],
  ): UserBehaviorMetrics {
    return {
      userFlows: [],
      popularFeatures: [],
      estimatorUsage: {
        totalUsage: events.filter((e) => e.type === "estimator_usage").length,
        completionRate: 0,
        averageProjectValue: 0,
        popularProjectTypes: [],
        dropOffPoints: [],
      },
      recommendationEngagement: {
        impressions: events.filter((e) => e.type === "recommendation_view")
          .length,
        clicks: events.filter((e) => e.type === "recommendation_click").length,
        clickThroughRate: 0,
        conversionRate: 0,
        topRecommendations: [],
      },
      deviceBreakdown: {
        desktop: events.filter((e) => e.metadata.device["type"] === "desktop")
          .length,
        tablet: events.filter((e) => e.metadata.device["type"] === "tablet")
          .length,
        mobile: events.filter((e) => e.metadata.device["type"] === "mobile")
          .length,
      },
      geographicDistribution: [],
    };
  }

  // @ts-expect-error - Preserved for future refactoring
  private _getPerformanceAnalytics(
    events: AnalyticsEvent[],
  ): PerformanceAnalytics {
    return {
      coreWebVitals: this.calculator.calculateCoreWebVitals(events),
      pageLoadTimes: [],
      errorRates: {
        totalErrors: events.filter((e) => e.type === "error_event").length,
        errorRate: 0,
        topErrors: [],
      },
      uptimeMetrics: {
        uptime: 99.9,
        downtimeEvents: [],
      },
      resourceMetrics: {
        bandwidth: 0,
        requestCount: events.length,
        averageResponseTime: 0,
      },
    };
  }

  // @ts-expect-error - Preserved for future refactoring
  private _getConversionAnalytics(
    events: AnalyticsEvent[],
    _sessions: UserJourney[],
  ): ConversionAnalytics {
    return {
      funnelAnalysis: [],
      conversionsBySource: [],
      veteranConversions: {
        veteranConversions: 0,
        veteranConversionRate: 0,
        averageVeteranValue: 0,
      },
      estimatorToContact:
        this.calculator.calculateEstimatorToContactRate(events),
      recommendationToInquiry:
        this.calculator.calculateRecommendationToInquiryRate(events),
    };
  }

  // @ts-expect-error - Preserved for future refactoring
  private _getVeteranAnalytics(
    events: AnalyticsEvent[],
    _sessions: UserJourney[],
  ): VeteranAnalytics {
    return {
      veteranUsers: this.calculator.countVeteranUsers(events),
      branchDistribution: [],
      benefitUtilization: [],
      specialistEngagement: {
        contacts: events.filter((e) => e.type === "contact_specialist").length,
        averageResponseTime: 0,
        satisfactionRate: 0,
      },
      conversionRates: {
        estimateRequests: 0,
        contactForms: 0,
        projectInquiries: 0,
      },
    };
  }

  // @ts-expect-error - Preserved for future refactoring
  private _getRealTimeMetrics(
    events: AnalyticsEvent[],
    sessions: UserJourney[],
  ): RealTimeMetrics {
    const activeSessions = this.calculator.getActiveSessions(sessions, 30);
    const recentEvents = events.slice(-100);

    return {
      activeUsers: activeSessions.length,
      currentSessions: activeSessions.map((s: UserJourney) => ({
        sessionId: s.sessionId,
        userId: s.userId ?? "",
        startTime: s.startTime,
        currentPage: s.pages[s.pages.length - 1] || "/",
        eventCount: s.events.length,
      })),
      recentEvents,
      liveConversions: sessions.flatMap((s) => s.conversions).slice(-20),
      systemHealth: {
        status: "healthy",
        responseTime: 150,
        errorRate: 0.1,
        activeConnections: activeSessions.length,
      },
    };
  }

  // Setup methods

  private initializeGA4(): void {
    // Initialize Google Analytics 4 (placeholder)
    if (typeof window !== "undefined") {
      interface GAWindow {
        gtag?: (...args: unknown[]) => void;
      }
      const w = window as unknown as GAWindow;
      if (typeof w.gtag === "function") {
        this.analytics = w.gtag;
        logger.log("Google Analytics 4 initialized");
      }
    }
  }

  private setupPerformanceTracking(): void {
    if (typeof window === "undefined") return;

    // Web Vitals tracking
    if ("PerformanceObserver" in window) {
      try {
        // Observe LCP
        const lcpObserver = new PerformanceObserver((list) => {
          const entries = list.getEntries();
          const lastEntry = entries[entries.length - 1];
          if (!lastEntry) return;
          this.trackPerformance({
            largestContentfulPaint: (lastEntry as PerformanceEntry).startTime,
          });
        });
        lcpObserver.observe({ entryTypes: ["largest-contentful-paint"] });

        // Observe FID
        const fidObserver = new PerformanceObserver((list) => {
          const entries = list.getEntries();
          entries.forEach((entry) => {
            const e = entry as PerformanceEntry & { processingStart?: number };
            if (
              typeof e.startTime === "number" &&
              typeof e.processingStart === "number"
            ) {
              this.trackPerformance({
                firstInputDelay: e.processingStart - e.startTime,
              });
            }
          });
        });
        fidObserver.observe({ entryTypes: ["first-input"] });
      } catch (_error) {
        logger.error("Performance tracking setup failed:", _error);
      }
    }
  }

  private setupErrorTracking(): void {
    if (typeof window === "undefined") return;

    window.addEventListener("error", (event) => {
      this.trackError(new Error(event.message), {
        filename: event.filename,
        lineno: event.lineno,
        colno: event.colno,
      });
    });

    window.addEventListener("unhandledrejection", (event) => {
      this.trackError(
        new Error(event.reason?.message || "Unhandled Promise Rejection"),
        {
          reason: event.reason,
        },
      );
    });
  }

  private setupEventListeners(): void {
    if (typeof window === "undefined") return;

    // Track page visibility changes
    document.addEventListener("visibilitychange", () => {
      if (document.hidden) {
        this.track("user_interaction", {
          action: "page_hidden",
          timestamp: new Date().toISOString(),
        });
      } else {
        this.track("user_interaction", {
          action: "page_visible",
          timestamp: new Date().toISOString(),
        });
      }
    });
  }

  private sendToAnalyticsProviders(event: AnalyticsEvent): void {
    // Google Analytics 4
    if (this.analytics) {
      try {
        this.analytics("event", event.type, {
          event_id: event.id,
          session_id: event.sessionId,
          user_id: event.userId,
          ...event.properties,
        });
      } catch (_error) {
        logger.error("Failed to send to Google Analytics:", _error);
      }
    }
  }

  private triggerCustomTrackers(event: AnalyticsEvent): void {
    this.customTrackers.forEach((tracker, name) => {
      try {
        tracker(event);
      } catch (_error) {
        logger.error(`Custom tracker "${name}" failed:`, _error);
      }
    });
  }
}

// Export singleton instance
export const analyticsEngine = new AdvancedAnalyticsEngine();

// Re-export types for convenience
export * from "./types";
