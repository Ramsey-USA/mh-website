/**
 * Marketing Analytics Enhancement
 *
 * Comprehensive tracking for understanding:
 * - What content attracts users
 * - Which services generate interest
 * - What project types are most popular
 * - User journey patterns
 * - Conversion paths
 */

import { trackClick } from "./tracking";

/**
 * Track service card interactions
 * Helps understand which services attract most interest
 */
export function trackServiceInterest(
  serviceName: string,
  action: "view" | "click" | "modal_open",
  properties?: Record<string, unknown>,
) {
  trackClick(`service-${action}`, {
    serviceName,
    category: "service-interest",
    action,
    ...properties,
  });
}

/**
 * Track project card interactions
 * Helps understand which project types generate interest
 */
export function trackProjectInterest(
  projectTitle: string,
  projectType: string,
  action: "view" | "click" | "image_view",
  properties?: Record<string, unknown>,
) {
  trackClick(`project-${action}`, {
    projectTitle,
    projectType,
    category: "project-interest",
    action,
    ...properties,
  });
}

/**
 * Track navigation menu clicks
 * Understand user navigation patterns
 */
export function trackNavigation(
  linkName: string,
  destination: string,
  location: "header" | "footer" | "mobile-menu" | "breadcrumb",
  properties?: Record<string, unknown>,
) {
  trackClick(`nav-${location}`, {
    linkName,
    destination,
    navigationType: location,
    category: "navigation",
    ...properties,
  });
}

/**
 * Track CTA button clicks
 * Measure effectiveness of call-to-action buttons
 */
export function trackCTAClick(
  ctaText: string,
  ctaType: "primary" | "secondary" | "emergency" | "veteran",
  destination: string,
  location: string,
  properties?: Record<string, unknown>,
) {
  trackClick(`cta-button`, {
    ctaText,
    ctaType,
    destination,
    location,
    category: "cta-conversion",
    ...properties,
  });
}

/**
 * Track social media link clicks
 * Understand which platforms users prefer
 */
export function trackSocialClick(
  platform: "facebook" | "linkedin" | "instagram" | "twitter" | "youtube",
  location: string,
  properties?: Record<string, unknown>,
) {
  trackClick(`social-${platform}`, {
    platform,
    location,
    category: "social-media",
    ...properties,
  });
}

/**
 * Track veteran-specific interactions
 * Critical for veteran marketing effectiveness
 */
export function trackVeteranInterest(
  action:
    | "page_view"
    | "discount_click"
    | "hiring_interest"
    | "foundation_click",
  properties?: Record<string, unknown>,
) {
  trackClick(`veteran-${action}`, {
    category: "veteran-engagement",
    action,
    ...properties,
  });
}

/**
 * Track content engagement depth
 * Measure how deeply users engage with content
 */
export function trackContentEngagement(
  contentType: "testimonial" | "team_member" | "case_study" | "faq" | "video",
  contentId: string,
  action: "view" | "read" | "expand" | "play",
  properties?: Record<string, unknown>,
) {
  trackClick(`content-${contentType}`, {
    contentType,
    contentId,
    action,
    category: "content-engagement",
    ...properties,
  });
}

/**
 * Track user journey milestones
 * Understand paths to conversion
 */
export function trackJourneyMilestone(
  milestone:
    | "entered_site"
    | "viewed_services"
    | "viewed_projects"
    | "viewed_contact"
    | "started_form"
    | "completed_form",
  properties?: Record<string, unknown>,
) {
  if (typeof window === "undefined") return;

  // Store journey in localStorage for funnel analysis
  const journey = JSON.parse(localStorage.getItem("mh_user_journey") || "[]");
  journey.push({
    milestone,
    timestamp: new Date().toISOString(),
    page: window.location.pathname,
    ...properties,
  });

  // Keep last 50 milestones
  localStorage.setItem("mh_user_journey", JSON.stringify(journey.slice(-50)));

  trackClick(`journey-${milestone}`, {
    milestone,
    category: "user-journey",
    journeyStep: journey.length,
    ...properties,
  });
}

/**
 * Track landing and exit pages
 * Critical for understanding entry/exit points
 */
export function trackLandingPage(page: string, referrer: string) {
  if (typeof window === "undefined") return;

  const session = JSON.parse(
    localStorage.getItem("mh_analytics_sessions") || "{}",
  );
  if (!session.landingPage) {
    session.landingPage = page;
    session.referrer = referrer;
    session.entryTime = new Date().toISOString();
    localStorage.setItem("mh_analytics_sessions", JSON.stringify(session));

    trackClick("landing-page", {
      landingPage: page,
      referrer,
      category: "session-tracking",
    });
  }
}

/**
 * Track exit intent (when user is about to leave)
 */
export function trackExitIntent(page: string) {
  trackClick("exit-intent", {
    exitPage: page,
    category: "session-tracking",
  });
}

/**
 * Track download/resource clicks
 * For PDFs, images, documents
 */
export function trackResourceDownload(
  resourceType: "pdf" | "image" | "qr_code" | "document",
  resourceName: string,
  properties?: Record<string, unknown>,
) {
  trackClick(`download-${resourceType}`, {
    resourceType,
    resourceName,
    category: "resource-downloads",
    ...properties,
  });
}

/**
 * Track search/filter usage (if applicable)
 */
export function trackSearch(
  searchType: "projects" | "services" | "locations",
  searchTerm: string,
  resultsCount: number,
  properties?: Record<string, unknown>,
) {
  trackClick("search", {
    searchType,
    searchTerm,
    resultsCount,
    category: "search-behavior",
    ...properties,
  });
}

/**
 * Track mobile-specific interactions
 */
export function trackMobileInteraction(
  action: "menu_open" | "swipe" | "pinch_zoom" | "tap_to_call" | "tap_to_map",
  properties?: Record<string, unknown>,
) {
  trackClick(`mobile-${action}`, {
    action,
    category: "mobile-behavior",
    ...properties,
  });
}

/**
 * Track competitive intelligence signals
 */
export function trackCompetitiveSignal(
  signal:
    | "price_comparison"
    | "review_check"
    | "veteran_verification"
    | "license_check",
  properties?: Record<string, unknown>,
) {
  trackClick(`competitive-${signal}`, {
    signal,
    category: "competitive-intelligence",
    ...properties,
  });
}

/**
 * Get current user journey for analysis
 */
export function getUserJourney(): Array<{
  milestone: string;
  timestamp: string;
  page: string;
}> {
  if (typeof window === "undefined") return [];
  return JSON.parse(localStorage.getItem("mh_user_journey") || "[]");
}

/**
 * Calculate time to conversion
 */
export function getTimeToConversion(): number | null {
  if (typeof window === "undefined") return null;

  const session = JSON.parse(
    localStorage.getItem("mh_analytics_sessions") || "{}",
  );
  const journey = getUserJourney();

  const conversionMilestone = journey.find(
    (m) => m.milestone === "completed_form",
  );

  if (!conversionMilestone || !session.entryTime) return null;

  const entryTime = new Date(session.entryTime).getTime();
  const conversionTime = new Date(conversionMilestone.timestamp).getTime();

  return Math.round((conversionTime - entryTime) / 1000); // seconds
}

/**
 * Get conversion funnel data
 */
export function getConversionFunnel(): {
  entered: number;
  viewedServices: number;
  viewedProjects: number;
  viewedContact: number;
  startedForm: number;
  completedForm: number;
  conversionRate: number;
} {
  if (typeof window === "undefined") {
    return {
      entered: 0,
      viewedServices: 0,
      viewedProjects: 0,
      viewedContact: 0,
      startedForm: 0,
      completedForm: 0,
      conversionRate: 0,
    };
  }

  const journey = getUserJourney();

  const funnel = {
    entered: journey.filter((m) => m.milestone === "entered_site").length,
    viewedServices: journey.filter((m) => m.milestone === "viewed_services")
      .length,
    viewedProjects: journey.filter((m) => m.milestone === "viewed_projects")
      .length,
    viewedContact: journey.filter((m) => m.milestone === "viewed_contact")
      .length,
    startedForm: journey.filter((m) => m.milestone === "started_form").length,
    completedForm: journey.filter((m) => m.milestone === "completed_form")
      .length,
    conversionRate: 0,
  };

  if (funnel.entered > 0) {
    funnel.conversionRate = (funnel.completedForm / funnel.entered) * 100;
  }

  return funnel;
}
