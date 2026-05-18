/**
 * Analytics Module Index
 * Re-exports active Google Analytics-facing helpers.
 */

export { usePageTracking, useClickTracking } from "./hooks";
export {
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
