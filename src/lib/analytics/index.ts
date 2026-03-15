/**
 * Analytics Module Index
 * Exports the singleton analytics engine instance and all tracking utilities
 */

import { AdvancedAnalyticsEngine } from "./analytics-engine";

// Export singleton instance
export const analyticsEngine = new AdvancedAnalyticsEngine();

// Export types
export * from "./types";

// Export data collector for direct access if needed
export { dataCollector } from "./data-collector";

// Re-export hooks
export { usePageTracking, useClickTracking } from "./hooks";
