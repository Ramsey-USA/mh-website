/**
 * Data Collector
 * Simple data collection interface for analytics
 */

import type { AnalyticsPropertyValue } from "./types";

export const dataCollector = {
  trackPageView(_page: string) {
    // Stub implementation
  },

  trackFormSubmission(
    _formId: string,
    _data: Record<string, AnalyticsPropertyValue>,
  ) {
    // Stub implementation
  },

  trackInteraction(
    _type: string,
    _element: string,
    _data: Record<string, unknown>,
  ) {
    // Stub implementation
  },
};
