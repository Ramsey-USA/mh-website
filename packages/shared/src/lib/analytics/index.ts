/**
 * Analytics Module Index
 * Re-exports active Google Analytics-facing helpers.
 */

export { usePageTracking, useClickTracking } from "./hooks";
export {
  trackAnalyticsEvent,
  trackCustomAnalyticsEvent,
  trackWebVital,
  trackFileDownload,
  trackPodcastMilestone,
  normalizeAnalyticsRouteTemplate,
  trackClick,
  trackFormSubmit,
  trackScrollDepth,
  trackPageView,
  trackPageDuration,
  initializeSession,
} from "./tracking";
export {
  trackServiceInterest,
  trackProjectInterest,
  trackJourneyMilestone,
  trackLandingPage,
} from "./marketing-tracking";
export { GoogleAnalytics, analytics } from "./components/GoogleAnalytics";
export { useAnalytics } from "./components/EnhancedAnalytics";
export { PageTrackingClient } from "./components/PageTrackingClient";
export {
  TrackedPhoneLink,
  TrackedEmailLink,
  TrackedLocationLink,
} from "./components/TrackedContactLinks";
