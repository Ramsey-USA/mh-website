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

  trackClick(`journey-${milestone}`, {
    milestone,
    category: "user-journey",
    page: window.location.pathname,
    ...properties,
  });
}

/**
 * Track landing and exit pages
 * Critical for understanding entry/exit points
 */
export function trackLandingPage(page: string, referrer: string) {
  if (typeof window === "undefined") return;

  trackClick("landing-page", {
    landingPage: page,
    referrer,
    category: "session-tracking",
  });
}
