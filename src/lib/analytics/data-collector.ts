/**
 * Analytics Data Collector
 * Handles real-time data collection and processing for analytics dashboard
 */

import {
  analyticsEngine,
  type AnalyticsEvent,
  type AnalyticsEventType,
} from "./analytics-engine";

export interface DataCollectionConfig {
  enableAutoTracking: boolean;
  trackScrollDepth: boolean;
  trackTimeOnPage: boolean;
  trackClickHeatmaps: boolean;
  trackFormInteractions: boolean;
  trackSearchQueries: boolean;
  batchSize: number;
  flushInterval: number;
}

export interface UserSession {
  sessionId: string;
  userId?: string;
  startTime: Date;
  lastActivity: Date;
  pageViews: string[];
  interactions: InteractionEvent[];
  scrollDepth: Record<string, number>;
  timeOnPage: Record<string, number>;
  isVeteran: boolean;
  deviceInfo: DeviceInfo;
}

export interface InteractionEvent {
  type: "click" | "scroll" | "form_focus" | "form_submit" | "search" | "hover";
  element: string;
  timestamp: Date;
  data: Record<string, any>;
}

export interface DeviceInfo {
  userAgent: string;
  screenWidth: number;
  screenHeight: number;
  viewportWidth: number;
  viewportHeight: number;
  devicePixelRatio: number;
  touchSupport: boolean;
  type: "desktop" | "tablet" | "mobile";
  os: string;
  browser: string;
  screenResolution: string;
  viewportSize: string;
}

export interface ScrollDepthEvent {
  page: string;
  depth: number;
  timestamp: Date;
  totalHeight: number;
  viewportHeight: number;
}

export interface TimeOnPageEvent {
  page: string;
  duration: number;
  timestamp: Date;
  visibility: "visible" | "hidden";
}

export interface HeatmapClick {
  x: number;
  y: number;
  page: string;
  element: string;
  timestamp: Date;
  sessionId: string;
}

/**
 * Analytics Data Collector Class
 */
export class AnalyticsDataCollector {
  private config: DataCollectionConfig;
  private currentSession: UserSession | null = null;
  private eventQueue: AnalyticsEvent[] = [];
  private scrollDepthThresholds = [25, 50, 75, 90, 100];
  private timeTrackers: Map<string, number> = new Map();
  private heatmapClicks: HeatmapClick[] = [];
  private flushTimer: NodeJS.Timeout | null = null;

  constructor(config: Partial<DataCollectionConfig> = {}) {
    this.config = {
      enableAutoTracking: true,
      trackScrollDepth: true,
      trackTimeOnPage: true,
      trackClickHeatmaps: true,
      trackFormInteractions: true,
      trackSearchQueries: true,
      batchSize: 50,
      flushInterval: 30000, // 30 seconds
      ...config,
    };

    this.initialize();
  }

  /**
   * Initialize data collection
   */
  private initialize(): void {
    if (typeof window === "undefined") return;

    this.createSession();

    if (this.config.enableAutoTracking) {
      this.setupAutoTracking();
    }

    this.startFlushTimer();
  }

  /**
   * Create new user session
   */
  private createSession(): void {
    const sessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

    this.currentSession = {
      sessionId,
      startTime: new Date(),
      lastActivity: new Date(),
      pageViews: [],
      interactions: [],
      scrollDepth: {},
      timeOnPage: {},
      isVeteran: this.detectVeteranUser(),
      deviceInfo: this.getDeviceInfo(),
    };

    this.trackEvent("user_interaction", {
      action: "session_start",
      sessionData: this.currentSession,
    });
  }

  /**
   * Setup automatic event tracking
   */
  private setupAutoTracking(): void {
    // Page view tracking
    this.trackPageView();

    // Navigation tracking
    window.addEventListener("beforeunload", () => {
      this.handlePageUnload();
    });

    // Visibility tracking
    document.addEventListener("visibilitychange", () => {
      this.handleVisibilityChange();
    });

    if (this.config.trackScrollDepth) {
      this.setupScrollDepthTracking();
    }

    if (this.config.trackClickHeatmaps) {
      this.setupClickHeatmapTracking();
    }

    if (this.config.trackFormInteractions) {
      this.setupFormTracking();
    }

    if (this.config.trackTimeOnPage) {
      this.setupTimeOnPageTracking();
    }
  }

  /**
   * Track page view event
   */
  trackPageView(page?: string): void {
    const currentPage = page || window.location.pathname;

    if (this.currentSession) {
      this.currentSession.pageViews.push(currentPage);
      this.currentSession.lastActivity = new Date();
    }

    this.trackEvent("page_view", {
      page: currentPage,
      referrer: document.referrer,
      timestamp: new Date().toISOString(),
    });

    // Start time tracking for this page
    if (this.config.trackTimeOnPage) {
      this.timeTrackers.set(currentPage, Date.now());
    }
  }

  /**
   * Track user interaction
   */
  trackInteraction(
    type: InteractionEvent["type"],
    element: string,
    data: Record<string, any> = {},
  ): void {
    if (!this.currentSession) return;

    const interaction: InteractionEvent = {
      type,
      element,
      timestamp: new Date(),
      data,
    };

    this.currentSession.interactions.push(interaction);
    this.currentSession.lastActivity = new Date();

    this.trackEvent("user_interaction", {
      interactionType: type,
      element,
      ...data,
    });
  }

  /**
   * Track form submission
   */
  trackFormSubmission(formName: string, formData: Record<string, any>): void {
    this.trackEvent("form_submission", {
      form: formName,
      ...formData,
      timestamp: new Date().toISOString(),
    });

    this.trackInteraction("form_submit", formName, formData);
  }

  /**
   * Track estimator usage
   */
  trackEstimatorUsage(
    projectType: string,
    estimatedValue: number,
    completed: boolean,
  ): void {
    this.trackEvent("estimator_usage", {
      projectType,
      estimatedValue,
      completed,
      timestamp: new Date().toISOString(),
    });
  }

  /**
   * Track recommendation interaction
   */
  trackRecommendationInteraction(
    recommendationId: string,
    action: "view" | "click" | "dismiss",
  ): void {
    this.trackEvent(
      action === "view" ? "recommendation_view" : "recommendation_click",
      {
        recommendationId,
        action,
        timestamp: new Date().toISOString(),
      },
    );
  }

  /**
   * Track veteran-specific interactions
   */
  trackVeteranInteraction(
    benefitType: string,
    action: "view" | "calculate" | "contact_specialist",
  ): void {
    this.trackEvent("veteran_benefit_view", {
      benefitType,
      action,
      timestamp: new Date().toISOString(),
    });
  }

  /**
   * Get current session data
   */
  getCurrentSession(): UserSession | null {
    return this.currentSession;
  }

  /**
   * Get collected heatmap data
   */
  getHeatmapData(page?: string): HeatmapClick[] {
    if (page) {
      return this.heatmapClicks.filter((click) => click.page === page);
    }
    return this.heatmapClicks;
  }

  /**
   * Export session data
   */
  exportSessionData(): any {
    return {
      session: this.currentSession,
      events: this.eventQueue,
      heatmapData: this.heatmapClicks,
    };
  }

  /**
   * Flush collected data
   */
  flush(): void {
    if (this.eventQueue.length > 0) {
      // Send events to analytics engine
      this.eventQueue.forEach((event) => {
        analyticsEngine.track(event.type, event.properties);
      });

      this.eventQueue = [];
    }

    // Send heatmap data if available
    if (this.heatmapClicks.length > 0) {
      this.trackEvent("user_interaction", {
        action: "heatmap_batch",
        clicks: this.heatmapClicks,
        timestamp: new Date().toISOString(),
      });

      this.heatmapClicks = [];
    }
  }

  // Private Methods

  private trackEvent(
    type: AnalyticsEventType,
    properties: Record<string, any>,
  ): void {
    const event: AnalyticsEvent = {
      id: `event_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      type,
      timestamp: new Date(),
      sessionId: this.currentSession?.sessionId || "unknown",
      userId: this.currentSession?.userId,
      properties,
      metadata: {
        page: window.location.pathname,
        referrer: document.referrer,
        userAgent: navigator.userAgent,
        device: this.getDeviceInfo(),
        location: {
          timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
          language: navigator.language,
        },
      },
    };

    this.eventQueue.push(event);

    // Auto-flush if queue is full
    if (this.eventQueue.length >= this.config.batchSize) {
      this.flush();
    }
  }

  private detectVeteranUser(): boolean {
    // Check for veteran indicators in localStorage or session
    const veteranStatus = localStorage.getItem("user_veteran_status");
    const veteranInteractions = localStorage.getItem("veteran_interactions");

    return veteranStatus === "true" || !!veteranInteractions;
  }

  private getDeviceInfo(): DeviceInfo {
    const userAgent = navigator.userAgent;
    const isMobile =
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        userAgent,
      );
    const isTablet =
      /iPad|Android/i.test(userAgent) && window.innerWidth >= 768;

    return {
      userAgent: navigator.userAgent,
      screenWidth: screen.width,
      screenHeight: screen.height,
      viewportWidth: window.innerWidth,
      viewportHeight: window.innerHeight,
      devicePixelRatio: window.devicePixelRatio || 1,
      touchSupport: "ontouchstart" in window,
      type: isMobile ? "mobile" : isTablet ? "tablet" : "desktop",
      os: this.getOS(userAgent),
      browser: this.getBrowser(userAgent),
      screenResolution: `${screen.width}x${screen.height}`,
      viewportSize: `${window.innerWidth}x${window.innerHeight}`,
    };
  }

  private getOS(userAgent: string): string {
    if (userAgent.includes("Windows")) return "Windows";
    if (userAgent.includes("Mac")) return "macOS";
    if (userAgent.includes("Linux")) return "Linux";
    if (userAgent.includes("Android")) return "Android";
    if (userAgent.includes("iOS")) return "iOS";
    return "Unknown";
  }

  private getBrowser(userAgent: string): string {
    if (userAgent.includes("Chrome")) return "Chrome";
    if (userAgent.includes("Firefox")) return "Firefox";
    if (userAgent.includes("Safari")) return "Safari";
    if (userAgent.includes("Edge")) return "Edge";
    return "Unknown";
  }

  private setupScrollDepthTracking(): void {
    let ticking = false;
    const trackedDepths = new Set<number>();

    const trackScrollDepth = () => {
      const scrollTop =
        window.pageYOffset || document.documentElement.scrollTop;
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = Math.round((scrollTop / docHeight) * 100);

      this.scrollDepthThresholds.forEach((threshold) => {
        if (scrollPercent >= threshold && !trackedDepths.has(threshold)) {
          trackedDepths.add(threshold);

          this.trackEvent("user_interaction", {
            action: "scroll_depth",
            depth: threshold,
            page: window.location.pathname,
            timestamp: new Date().toISOString(),
          });

          if (this.currentSession) {
            this.currentSession.scrollDepth[window.location.pathname] =
              Math.max(
                this.currentSession.scrollDepth[window.location.pathname] || 0,
                threshold,
              );
          }
        }
      });

      ticking = false;
    };

    window.addEventListener("scroll", () => {
      if (!ticking) {
        requestAnimationFrame(trackScrollDepth);
        ticking = true;
      }
    });
  }

  private setupClickHeatmapTracking(): void {
    document.addEventListener("click", (event) => {
      const target = event.target as HTMLElement;
      const rect = target.getBoundingClientRect();

      const heatmapClick: HeatmapClick = {
        x: event.clientX,
        y: event.clientY,
        page: window.location.pathname,
        element:
          target.tagName +
          (target.className ? `.${target.className.split(" ")[0]}` : ""),
        timestamp: new Date(),
        sessionId: this.currentSession?.sessionId || "unknown",
      };

      this.heatmapClicks.push(heatmapClick);

      this.trackInteraction("click", heatmapClick.element, {
        coordinates: { x: heatmapClick.x, y: heatmapClick.y },
        elementText: target.textContent?.substring(0, 100),
      });
    });
  }

  private setupFormTracking(): void {
    // Track form field focus
    document.addEventListener("focusin", (event) => {
      const target = event.target as HTMLInputElement;
      if (target.matches("input, textarea, select")) {
        this.trackInteraction(
          "form_focus",
          target.name || target.id || "unknown",
          {
            type: target.getAttribute("type") || "text",
            value: target.tagName,
          },
        );
      }
    });

    // Track form submissions
    document.addEventListener("submit", (event) => {
      const form = event.target as HTMLFormElement;
      const formData = new FormData(form);
      const data: Record<string, any> = {};

      formData.forEach((value, key) => {
        data[key] =
          typeof value === "string" ? value.substring(0, 100) : "[file]";
      });

      this.trackFormSubmission(form.name || form.id || "unknown", data);
    });
  }

  private setupTimeOnPageTracking(): void {
    let startTime = Date.now();
    let isVisible = !document.hidden;

    const trackTime = () => {
      if (isVisible) {
        const duration = Date.now() - startTime;
        const page = window.location.pathname;

        this.trackEvent("user_interaction", {
          action: "time_on_page",
          page,
          duration,
          timestamp: new Date().toISOString(),
        });

        if (this.currentSession) {
          this.currentSession.timeOnPage[page] =
            (this.currentSession.timeOnPage[page] || 0) + duration;
        }
      }
      startTime = Date.now();
    };

    document.addEventListener("visibilitychange", () => {
      trackTime();
      isVisible = !document.hidden;
    });

    window.addEventListener("beforeunload", trackTime);
  }

  private handlePageUnload(): void {
    // Track page exit
    this.trackEvent("user_interaction", {
      action: "page_unload",
      page: window.location.pathname,
      sessionDuration: this.currentSession
        ? Date.now() - this.currentSession.startTime.getTime()
        : 0,
      timestamp: new Date().toISOString(),
    });

    // Flush remaining data
    this.flush();
  }

  private handleVisibilityChange(): void {
    if (document.hidden) {
      this.trackEvent("user_interaction", {
        action: "page_hidden",
        page: window.location.pathname,
        timestamp: new Date().toISOString(),
      });
    } else {
      this.trackEvent("user_interaction", {
        action: "page_visible",
        page: window.location.pathname,
        timestamp: new Date().toISOString(),
      });
    }
  }

  private startFlushTimer(): void {
    this.flushTimer = setInterval(() => {
      this.flush();
    }, this.config.flushInterval);
  }
}

// Global data collector instance
export const dataCollector = new AnalyticsDataCollector();

// React hook for easy integration
export const useAnalyticsTracking = () => {
  const trackPageView = (page?: string) => {
    dataCollector.trackPageView(page);
  };

  const trackInteraction = (
    type: InteractionEvent["type"],
    element: string,
    data?: Record<string, any>,
  ) => {
    dataCollector.trackInteraction(type, element, data);
  };

  const trackFormSubmission = (
    formName: string,
    formData: Record<string, any>,
  ) => {
    dataCollector.trackFormSubmission(formName, formData);
  };

  const trackEstimatorUsage = (
    projectType: string,
    estimatedValue: number,
    completed: boolean,
  ) => {
    dataCollector.trackEstimatorUsage(projectType, estimatedValue, completed);
  };

  const trackRecommendationInteraction = (
    recommendationId: string,
    action: "view" | "click" | "dismiss",
  ) => {
    dataCollector.trackRecommendationInteraction(recommendationId, action);
  };

  const trackVeteranInteraction = (
    benefitType: string,
    action: "view" | "calculate" | "contact_specialist",
  ) => {
    dataCollector.trackVeteranInteraction(benefitType, action);
  };

  const getCurrentSession = () => {
    return dataCollector.getCurrentSession();
  };

  const getHeatmapData = (page?: string) => {
    return dataCollector.getHeatmapData(page);
  };

  return {
    trackPageView,
    trackInteraction,
    trackFormSubmission,
    trackEstimatorUsage,
    trackRecommendationInteraction,
    trackVeteranInteraction,
    getCurrentSession,
    getHeatmapData,
  };
};

// Auto-initialize if in browser
if (typeof window !== "undefined") {
  // Initialize the data collector
  void dataCollector;
}
