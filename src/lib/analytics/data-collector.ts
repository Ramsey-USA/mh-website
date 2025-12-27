/**
 * Data Collector
 * Handles persistent storage of analytics data in localStorage
 *
 * Storage keys:
 * - mh_analytics_pageviews: Page view data
 * - mh_analytics_events: All tracked events
 * - mh_analytics_sessions: Session data
 * - mh_analytics_interactions: User interactions
 */

import type { AnalyticsPropertyValue } from "./types";
import { logger } from "@/lib/utils/logger";

export const dataCollector = {
  /**
   * Track page view and store in localStorage
   */
  trackPageView(page: string) {
    if (typeof window === "undefined") return;

    try {
      const stored = localStorage.getItem("mh_analytics_pageviews");
      const data = stored ? JSON.parse(stored) : { pages: {}, total: 0 };

      // Increment page-specific count
      data.pages[page] = (data.pages[page] || 0) + 1;
      data.total = (data.total || 0) + 1;
      data.lastView = new Date().toISOString();

      localStorage.setItem("mh_analytics_pageviews", JSON.stringify(data));
    } catch (error) {
      logger.error("Error tracking page view:", error);
    }
  },

  /**
   * Track form submission and store in localStorage
   */
  trackFormSubmission(
    formId: string,
    data: Record<string, AnalyticsPropertyValue>,
  ) {
    if (typeof window === "undefined") return;

    try {
      const stored = localStorage.getItem("mh_analytics_forms");
      const formData = stored ? JSON.parse(stored) : [];

      formData.push({
        formId,
        timestamp: new Date().toISOString(),
        page: window.location.pathname,
        ...data,
      });

      // Keep last 500 form submissions
      const trimmed = formData.slice(-500);
      localStorage.setItem("mh_analytics_forms", JSON.stringify(trimmed));

      // Update conversion counts
      const conversions = this.getConversions();
      conversions["total"] = (conversions["total"] || 0) + 1;
      if (formId.includes("contact")) {
        conversions["contacts"] = (conversions["contacts"] || 0) + 1;
      } else if (formId.includes("consult")) {
        conversions["consultations"] = (conversions["consultations"] || 0) + 1;
      }
      localStorage.setItem(
        "mh_analytics_conversions",
        JSON.stringify(conversions),
      );
    } catch (error) {
      logger.error("Error tracking form submission:", error);
    }
  },

  /**
   * Track user interaction and store in localStorage
   */
  trackInteraction(
    type: string,
    element: string,
    data: Record<string, unknown>,
  ) {
    if (typeof window === "undefined") return;

    try {
      const stored = localStorage.getItem("mh_analytics_interactions");
      const interactions = stored ? JSON.parse(stored) : [];

      interactions.push({
        type,
        element,
        timestamp: new Date().toISOString(),
        page: window.location.pathname,
        ...data,
      });

      // Keep last 1000 interactions
      const trimmed = interactions.slice(-1000);
      localStorage.setItem(
        "mh_analytics_interactions",
        JSON.stringify(trimmed),
      );
    } catch (error) {
      logger.error("Error tracking interaction:", error);
    }
  },

  /**
   * Get stored conversions
   */
  getConversions(): Record<string, number> {
    if (typeof window === "undefined") return {};

    try {
      const stored = localStorage.getItem("mh_analytics_conversions");
      return stored
        ? JSON.parse(stored)
        : { total: 0, contacts: 0, consultations: 0 };
    } catch {
      return { total: 0, contacts: 0, consultations: 0 };
    }
  },

  /**
   * Get all stored analytics data
   */
  getAllData() {
    if (typeof window === "undefined") return null;

    try {
      return {
        pageviews: JSON.parse(
          localStorage.getItem("mh_analytics_pageviews") || "{}",
        ),
        events: JSON.parse(localStorage.getItem("mh_analytics_events") || "[]"),
        sessions: JSON.parse(
          localStorage.getItem("mh_analytics_sessions") || "[]",
        ),
        interactions: JSON.parse(
          localStorage.getItem("mh_analytics_interactions") || "[]",
        ),
        forms: JSON.parse(localStorage.getItem("mh_analytics_forms") || "[]"),
        conversions: this.getConversions(),
        clicks: JSON.parse(localStorage.getItem("mh_analytics_clicks") || "[]"),
      };
    } catch (error) {
      logger.error("Error getting analytics data:", error);
      return null;
    }
  },

  /**
   * Clear all analytics data (useful for testing)
   */
  clearAll() {
    if (typeof window === "undefined") return;

    const keys = [
      "mh_analytics_pageviews",
      "mh_analytics_events",
      "mh_analytics_sessions",
      "mh_analytics_interactions",
      "mh_analytics_forms",
      "mh_analytics_conversions",
      "mh_analytics_clicks",
    ];

    keys.forEach((key) => localStorage.removeItem(key));
    logger.log("Analytics data cleared");
  },
};
