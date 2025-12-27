/**
 * Analytics Module Index
 * Exports the singleton analytics engine instance and all tracking utilities
 */

import { AdvancedAnalyticsEngine } from "./analytics-engine";

// Export singleton instance
export const analyticsEngine = new AdvancedAnalyticsEngine();

// Export types
export * from "./types";
export { AdvancedAnalyticsEngine } from "./analytics-engine";

// Export data collector for direct access if needed
export { dataCollector } from "./data-collector";

// Re-export metadata utilities
export {
  getDeviceInfo,
  getLocationInfo,
  getConnectionInfo,
  getSessionInfo,
  getTrafficSource,
  getEventMetadata,
  getEnhancedTrackingProperties,
  getUserPreferences,
  getOrientationInfo,
  getSecurityInfo,
  getMemoryInfo,
  getPagePerformance,
} from "./metadata";

// Re-export tracking utilities for convenience
export {
  trackClick,
  trackFormSubmit,
  trackFormField,
  trackScrollDepth,
  trackPageView,
  trackPageDuration,
  trackCTA,
  trackNavigation,
  trackVideo,
  trackDownload,
} from "./tracking";

// Re-export hooks
export {
  usePageTracking,
  useClickTracking,
  useFormTracking,
  useCTATracking,
  useElementTracking,
} from "./hooks";

// Re-export data export utilities
export {
  exportAsJSON,
  exportPageViewsAsCSV,
  exportClicksAsCSV,
  exportFormsAsCSV,
  exportInteractionsAsCSV,
  downloadAnalyticsData,
  getAnalyticsSummary,
} from "./export";
