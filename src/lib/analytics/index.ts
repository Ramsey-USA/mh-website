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

// Re-export metadata utilities
export {
  getDeviceInfo,
  getLocationInfo,
  getConnectionInfo,
  getSessionInfo,
  getTrafficSource,
  getEventMetadata,
  getEnhancedTrackingProperties,
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
