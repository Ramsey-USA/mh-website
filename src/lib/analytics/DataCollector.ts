/**
 * Data Collector
 * Handles event collection, metadata gathering, and session management
 */

import type {
  AnalyticsEvent,
  AnalyticsEventType,
  EventMetadata,
  DeviceInfo,
  LocationInfo,
  UserJourney,
  ConversionEvent,
} from "./types";

export class DataCollector {
  private events: AnalyticsEvent[] = [];
  private sessions: Map<string, UserJourney> = new Map();

  /**
   * Create new analytics event
   */
  createEvent(
    type: AnalyticsEventType,
    properties: Record<string, any> = {},
  ): AnalyticsEvent {
    return {
      id: this.generateEventId(),
      type,
      timestamp: new Date(),
      sessionId: this.getSessionId(),
      userId: this.getUserId(),
      properties,
      metadata: this.collectMetadata(),
    };
  }

  /**
   * Store event
   */
  storeEvent(event: AnalyticsEvent): void {
    this.events.push(event);
    this.updateUserJourney(event);
    this.storeEventLocally(event);
  }

  /**
   * Get stored events
   */
  getEvents(filters?: {
    type?: AnalyticsEventType;
    startDate?: Date;
    endDate?: Date;
    sessionId?: string;
    userId?: string;
  }): AnalyticsEvent[] {
    let filtered = this.events;

    if (filters) {
      if (filters.type) {
        filtered = filtered.filter((e) => e.type === filters.type);
      }
      if (filters.startDate) {
        filtered = filtered.filter((e) => e.timestamp >= filters.startDate!);
      }
      if (filters.endDate) {
        filtered = filtered.filter((e) => e.timestamp <= filters.endDate!);
      }
      if (filters.sessionId) {
        filtered = filtered.filter((e) => e.sessionId === filters.sessionId);
      }
      if (filters.userId) {
        filtered = filtered.filter((e) => e.userId === filters.userId);
      }
    }

    return filtered;
  }

  /**
   * Get user journey by session ID
   */
  getUserJourney(sessionId: string): UserJourney | undefined {
    return this.sessions.get(sessionId);
  }

  /**
   * Get all sessions
   */
  getAllSessions(): UserJourney[] {
    return Array.from(this.sessions.values());
  }

  /**
   * Clear old events (for memory management)
   */
  clearOldEvents(daysToKeep: number = 30): void {
    const cutoffDate = new Date();
    cutoffDate.setDate(cutoffDate.getDate() - daysToKeep);

    this.events = this.events.filter((e) => e.timestamp >= cutoffDate);

    // Clear old sessions
    this.sessions.forEach((journey, sessionId) => {
      if (journey.startTime < cutoffDate) {
        this.sessions.delete(sessionId);
      }
    });
  }

  /**
   * Export data
   */
  exportData(format: "json" | "csv" = "json"): string {
    if (format === "json") {
      return JSON.stringify(
        {
          events: this.events,
          sessions: Array.from(this.sessions.values()),
        },
        null,
        2,
      );
    }

    // CSV format
    const headers = [
      "id",
      "type",
      "timestamp",
      "sessionId",
      "userId",
      "page",
      "device",
    ];
    const rows = this.events.map((e) => [
      e.id,
      e.type,
      e.timestamp.toISOString(),
      e.sessionId,
      e.userId || "",
      e.metadata.page,
      e.metadata.device.type,
    ]);

    return [headers.join(","), ...rows.map((r) => r.join(","))].join("\n");
  }

  // Private helper methods

  private generateEventId(): string {
    return `event_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  private getSessionId(): string {
    if (typeof window === "undefined") return "server_session";

    let sessionId = sessionStorage.getItem("analytics_session_id");
    if (!sessionId) {
      sessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      sessionStorage.setItem("analytics_session_id", sessionId);
    }
    return sessionId;
  }

  private getUserId(): string | undefined {
    if (typeof window === "undefined") return undefined;
    return localStorage.getItem("analytics_user_id") || undefined;
  }

  private collectMetadata(): EventMetadata {
    return {
      page: typeof window !== "undefined" ? window.location.pathname : "",
      referrer: typeof document !== "undefined" ? document.referrer : "",
      userAgent: typeof navigator !== "undefined" ? navigator.userAgent : "",
      device: this.getDeviceInfo(),
      location: this.getLocationInfo(),
    };
  }

  private getDeviceInfo(): DeviceInfo {
    if (typeof window === "undefined") {
      return {
        type: "desktop",
        os: "unknown",
        browser: "unknown",
        screenResolution: "unknown",
        viewportSize: "unknown",
      };
    }

    const userAgent = navigator.userAgent;
    const isMobile =
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        userAgent,
      );
    const isTablet =
      /iPad|Android/i.test(userAgent) && window.innerWidth >= 768;

    return {
      type: isMobile ? "mobile" : isTablet ? "tablet" : "desktop",
      os: this.getOS(userAgent),
      browser: this.getBrowser(userAgent),
      screenResolution: `${screen.width}x${screen.height}`,
      viewportSize: `${window.innerWidth}x${window.innerHeight}`,
    };
  }

  private getLocationInfo(): LocationInfo {
    return {
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      language: typeof navigator !== "undefined" ? navigator.language : "en-US",
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

  private updateUserJourney(event: AnalyticsEvent): void {
    const sessionId = event.sessionId;
    let journey = this.sessions.get(sessionId);

    if (!journey) {
      journey = {
        sessionId,
        userId: event.userId,
        startTime: event.timestamp,
        events: [],
        pages: [],
        conversions: [],
        totalDuration: 0,
        bounceRate: false,
      };
      this.sessions.set(sessionId, journey);
    }

    // Add event to journey
    journey.events.push(event);

    // Track page visits
    if (event.type === "page_view" && event.properties.page) {
      if (!journey.pages.includes(event.properties.page)) {
        journey.pages.push(event.properties.page);
      }
    }

    // Update duration
    journey.endTime = event.timestamp;
    journey.totalDuration =
      (journey.endTime.getTime() - journey.startTime.getTime()) / 1000;

    // Update bounce rate (single page visit < 30 seconds)
    journey.bounceRate =
      journey.pages.length === 1 && journey.totalDuration < 30;
  }

  private storeEventLocally(event: AnalyticsEvent): void {
    if (typeof window === "undefined") return;

    try {
      const stored = localStorage.getItem("analytics_events") || "[]";
      const events = JSON.parse(stored);
      events.push({
        ...event,
        timestamp: event.timestamp.toISOString(),
      });

      // Keep only last 100 events in local storage
      const trimmed = events.slice(-100);
      localStorage.setItem("analytics_events", JSON.stringify(trimmed));
    } catch (error) {
      console.error("Failed to store event locally:", error);
    }
  }
}
