/**
 * Advanced Analytics Engine - Refactored
 * Orchestrates analytics collection, calculation, and reporting
 */

import { logger } from "@/lib/utils/logger";
import { DataCollector } from "./DataCollector";
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
} from "./types";

export class AdvancedAnalyticsEngine {
  private collector: DataCollector;
  private calculator: MetricsCalculator;
  private isInitialized = false;
  private analytics: ((...args: unknown[]) => void) | null = null; // Google Analytics instance
  private customTrackers: Map<string, (event: AnalyticsEvent) => void> =
    new Map();

  constructor() {
    this.collector = new DataCollector();
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
   */
  track(
    type: AnalyticsEventType,
    properties: Record<string, unknown> = {},
  ): void {
    const event = this.collector.createEvent(type, properties);

    // Store event
    this.collector.storeEvent(event);

    // Send to analytics providers
    this.sendToAnalyticsProviders(event);

    // Trigger custom trackers
    this.triggerCustomTrackers(event);
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
   */
  async getDashboardData(): Promise<AnalyticsDashboardData> {
    const events = this.collector.getEvents();
    const sessions = this.collector.getAllSessions();

    const [
      overview,
      userBehavior,
      performance,
      conversions,
      veteranInsights,
      realTime,
    ] = await Promise.all([
      this.getOverviewMetrics(events, sessions),
      this.getUserBehaviorMetrics(events, sessions),
      this.getPerformanceAnalytics(events),
      this.getConversionAnalytics(events, sessions),
      this.getVeteranAnalytics(events, sessions),
      this.getRealTimeMetrics(events, sessions),
    ]);

    return {
      overview,
      userBehavior,
      performance,
      conversions,
      veteranInsights,
      realTime,
    };
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
   * Get user journey
   */
  getUserJourney(sessionId: string): UserJourney | undefined {
    return this.collector.getUserJourney(sessionId);
  }

  /**
   * Get events with filters
   */
  getEvents(
    filters?: Parameters<DataCollector["getEvents"]>[0],
  ): AnalyticsEvent[] {
    return this.collector.getEvents(filters);
  }

  /**
   * Export data
   */
  exportData(format: "json" | "csv" = "json"): string {
    return this.collector.exportData(format);
  }

  // Private methods for dashboard data generation

  private getOverviewMetrics(
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

  private getUserBehaviorMetrics(
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

  private getPerformanceAnalytics(
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

  private getConversionAnalytics(
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

  private getVeteranAnalytics(
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

  private getRealTimeMetrics(
    events: AnalyticsEvent[],
    sessions: UserJourney[],
  ): RealTimeMetrics {
    const activeSessions = this.calculator.getActiveSessions(sessions, 30);
    const recentEvents = events.slice(-100);

    return {
      activeUsers: activeSessions.length,
      currentSessions: activeSessions.map((s) => ({
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
