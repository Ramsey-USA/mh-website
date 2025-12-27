/**
 * Marketing Analytics
 *
 * Specialized tracking for marketing insights:
 * - User journey tracking (awareness → consideration → decision)
 * - Content engagement (time on page, scroll depth)
 * - CTA effectiveness
 * - Lead quality scoring
 * - Service/project interest tracking
 */

import { trackClick } from "./tracking";

/**
 * User Journey Stages
 * Helps identify where users are in the sales funnel
 */
export type JourneyStage =
  | "awareness" // Just discovered site (home, about)
  | "consideration" // Exploring options (services, projects, testimonials)
  | "decision" // Ready to act (contact, careers, urgent)
  | "engaged" // Deep engagement (multiple pages, long sessions)
  | "veteran"; // Veteran-specific interest

/**
 * Track user journey progression
 * Automatically determines stage based on page
 */
export function trackJourneyStage(page: string, stage: JourneyStage): void {
  // Store journey progression in localStorage
  if (typeof window === "undefined") return;

  const journey = getStoredJourney();
  journey.push({
    page,
    stage,
    timestamp: new Date().toISOString(),
  });

  // Keep last 50 journey steps
  const trimmed = journey.slice(-50);
  localStorage.setItem("mh_analytics_journey", JSON.stringify(trimmed));

  // Update journey stage summary
  const stages = getJourneyStages();
  stages[stage] = (stages[stage] || 0) + 1;
  localStorage.setItem("mh_analytics_journey_stages", JSON.stringify(stages));
}

/**
 * Track service interest
 * When user views or clicks on a specific service
 */
export function trackServiceInterest(
  serviceName: string,
  action: "view" | "click" | "learn-more",
  properties?: Record<string, unknown>,
): void {
  trackClick(`service-${action}`, {
    serviceName,
    action,
    category: "service-interest",
    ...properties,
  });

  // Store in service interest tracking
  if (typeof window === "undefined") return;

  const interests = getServiceInterests();
  if (!interests[serviceName]) {
    interests[serviceName] = { views: 0, clicks: 0, learnMore: 0 };
  }

  if (action === "view") interests[serviceName].views++;
  if (action === "click") interests[serviceName].clicks++;
  if (action === "learn-more") interests[serviceName].learnMore++;

  localStorage.setItem(
    "mh_analytics_service_interests",
    JSON.stringify(interests),
  );
}

/**
 * Track project interest
 * When user views or clicks on a project/case study
 */
export function trackProjectInterest(
  projectName: string,
  projectType: string,
  action: "view" | "click" | "detail",
  properties?: Record<string, unknown>,
): void {
  trackClick(`project-${action}`, {
    projectName,
    projectType,
    action,
    category: "project-interest",
    ...properties,
  });

  // Store in project interest tracking
  if (typeof window === "undefined") return;

  const interests = getProjectInterests();
  const key = `${projectType}:${projectName}`;

  if (!interests[key]) {
    interests[key] = {
      projectName,
      projectType,
      views: 0,
      clicks: 0,
      details: 0,
    };
  }

  if (action === "view") interests[key].views++;
  if (action === "click") interests[key].clicks++;
  if (action === "detail") interests[key].details++;

  localStorage.setItem(
    "mh_analytics_project_interests",
    JSON.stringify(interests),
  );
}

/**
 * Track CTA effectiveness
 * Measure which CTAs drive the most engagement
 */
export function trackCTAClick(
  ctaId: string,
  ctaText: string,
  location: string,
  destination: string,
): void {
  trackClick(`cta-${ctaId}`, {
    ctaText,
    location,
    destination,
    category: "cta-performance",
  });

  // Store CTA performance metrics
  if (typeof window === "undefined") return;

  const ctas = getCTAPerformance();
  if (!ctas[ctaId]) {
    ctas[ctaId] = {
      text: ctaText,
      location,
      destination,
      clicks: 0,
      lastClicked: null,
    };
  }

  ctas[ctaId].clicks++;
  ctas[ctaId].lastClicked = new Date().toISOString();

  localStorage.setItem("mh_analytics_cta_performance", JSON.stringify(ctas));
}

/**
 * Calculate lead quality score
 * Based on user behavior patterns
 */
export function calculateLeadScore(): number {
  if (typeof window === "undefined") return 0;

  let score = 0;

  // Journey progression (max 30 points)
  const stages = getJourneyStages();
  if (stages.awareness) score += 5;
  if (stages.consideration) score += 10;
  if (stages.decision) score += 15;
  if (stages.engaged) score += 10;
  if (stages.veteran) score += 5;

  // Page engagement (max 20 points)
  const pageviews = JSON.parse(
    localStorage.getItem("mh_analytics_pageviews") || "{}",
  );
  const totalViews = pageviews.total || 0;
  if (totalViews >= 3) score += 10;
  if (totalViews >= 5) score += 10;

  // Service interest (max 20 points)
  const services = getServiceInterests();
  const serviceCount = Object.keys(services).length;
  if (serviceCount >= 1) score += 10;
  if (serviceCount >= 3) score += 10;

  // Project interest (max 15 points)
  const projects = getProjectInterests();
  const projectCount = Object.keys(projects).length;
  if (projectCount >= 1) score += 8;
  if (projectCount >= 3) score += 7;

  // CTA engagement (max 15 points)
  const ctas = getCTAPerformance();
  const ctaCount = Object.keys(ctas).length;
  if (ctaCount >= 1) score += 8;
  if (ctaCount >= 3) score += 7;

  return Math.min(score, 100);
}

/**
 * Get lead quality category
 */
export function getLeadQuality(): "cold" | "warm" | "hot" | "qualified" {
  const score = calculateLeadScore();

  if (score >= 75) return "qualified";
  if (score >= 50) return "hot";
  if (score >= 25) return "warm";
  return "cold";
}

// Helper functions to get stored data
function getStoredJourney(): Array<{
  page: string;
  stage: JourneyStage;
  timestamp: string;
}> {
  if (typeof window === "undefined") return [];
  const stored = localStorage.getItem("mh_analytics_journey");
  return stored ? JSON.parse(stored) : [];
}

function getJourneyStages(): Partial<Record<JourneyStage, number>> {
  if (typeof window === "undefined") return {};
  const stored = localStorage.getItem("mh_analytics_journey_stages");
  return stored ? JSON.parse(stored) : {};
}

function getServiceInterests(): Record<
  string,
  { views: number; clicks: number; learnMore: number }
> {
  if (typeof window === "undefined") return {};
  const stored = localStorage.getItem("mh_analytics_service_interests");
  return stored ? JSON.parse(stored) : {};
}

function getProjectInterests(): Record<
  string,
  {
    projectName: string;
    projectType: string;
    views: number;
    clicks: number;
    details: number;
  }
> {
  if (typeof window === "undefined") return {};
  const stored = localStorage.getItem("mh_analytics_project_interests");
  return stored ? JSON.parse(stored) : {};
}

function getCTAPerformance(): Record<
  string,
  {
    text: string;
    location: string;
    destination: string;
    clicks: number;
    lastClicked: string | null;
  }
> {
  if (typeof window === "undefined") return {};
  const stored = localStorage.getItem("mh_analytics_cta_performance");
  return stored ? JSON.parse(stored) : {};
}

/**
 * Get all marketing analytics data
 */
export function getMarketingAnalytics() {
  return {
    journey: getStoredJourney(),
    journeyStages: getJourneyStages(),
    serviceInterests: getServiceInterests(),
    projectInterests: getProjectInterests(),
    ctaPerformance: getCTAPerformance(),
    leadScore: calculateLeadScore(),
    leadQuality: getLeadQuality(),
  };
}
