/**
 * Analytics Tracking Utilities
 *
 * Easy-to-use functions for tracking user interactions.
 * Import and use anywhere in your components.
 *
 * Automatically collects comprehensive metadata including:
 * - Device type, OS, browser, screen resolution
 * - Geographic location (timezone, language)
 * - Network connection info
 * - Traffic source and referrer
 * - Session information
 *
 * @example
 * ```tsx
 * import { trackClick, trackFormSubmit } from '@/lib/analytics/tracking';
 *
 * <button onClick={() => trackClick('cta-button', { location: 'hero' })}>
 *   Get Started
 * </button>
 * ```
 */

import { analyticsEngine } from "./index";
import { getEnhancedTrackingPropertiesSync, getDeviceInfo } from "./metadata";
import { getGeographicLocation } from "./geolocation";
import {
  beaconPageview,
  beaconClick,
  beaconConversion,
  beaconSessionEnd,
} from "./beacon";

function isLighthouseRun(): boolean {
  if (typeof window === "undefined") {
    return false;
  }

  const userAgent = typeof navigator !== "undefined" ? navigator.userAgent : "";
  return Boolean(window.__LIGHTHOUSE__) || /Chrome-Lighthouse/i.test(userAgent);
}

/**
 * Track button/link clicks
 * Use this on any clickable element you want to track
 * Now includes geographic location data
 *
 * @example
 * <button onClick={() => trackClick('contact-cta', { section: 'footer' })}>
 *   Contact Us
 * </button>
 */
export function trackClick(
  elementId: string,
  properties?: Record<string, unknown>,
): void {
  if (isLighthouseRun()) {
    return;
  }

  const enhancedProps = getEnhancedTrackingPropertiesSync();

  // Track click immediately with synchronous data
  analyticsEngine.track("user_interaction", {
    element: elementId,
    action: "click",
    ...enhancedProps,
    ...properties, // User properties override defaults
  });

  // Store click data in localStorage for local cache + beacon to server
  if (typeof window !== "undefined") {
    const clicks = getStoredClicks();
    const deviceInfo = getDeviceInfo();

    // Get geographic location asynchronously and update stored data
    getGeographicLocation()
      .then((location) => {
        const clickData = {
          element: elementId,
          timestamp: new Date().toISOString(),
          page: window.location.pathname,
          deviceType: deviceInfo.type,
          browser: deviceInfo.browser,
          os: deviceInfo.os,
          country: location.country,
          state: location.state,
          city: location.city,
        };
        clicks.push({ ...clickData, ...properties });
        localStorage.setItem(
          "mh_analytics_clicks",
          JSON.stringify(clicks.slice(-1000)),
        );
        // Beacon to server for cross-visitor aggregation
        beaconClick(elementId, clickData);
      })
      .catch(() => {
        const clickData = {
          element: elementId,
          timestamp: new Date().toISOString(),
          page: window.location.pathname,
          deviceType: deviceInfo.type,
          browser: deviceInfo.browser,
          os: deviceInfo.os,
        };
        clicks.push({ ...clickData, ...properties });
        localStorage.setItem(
          "mh_analytics_clicks",
          JSON.stringify(clicks.slice(-1000)),
        );
        beaconClick(elementId, clickData);
      });
  }
}

/**
 * Track form submissions
 * Call this when a form is successfully submitted
 *
 * @example
 * const handleSubmit = async (data) => {
 *   await submitForm(data);
 *   trackFormSubmit('contact-form', { source: 'hero-section' });
 * };
 */
export function trackFormSubmit(
  formId: string,
  properties?: Record<string, unknown>,
): void {
  if (isLighthouseRun()) {
    return;
  }

  const enhancedProps = getEnhancedTrackingPropertiesSync();

  analyticsEngine.track("form_submission", {
    formId,
    ...enhancedProps,
    ...properties,
  });

  // Store conversion data locally + beacon to server
  if (typeof window !== "undefined") {
    const conversions = getStoredConversions();
    conversions.total++;
    const conversionType: "contact" | "consultation" = formId.includes(
      "consult",
    )
      ? "consultation"
      : "contact";
    if (conversionType === "contact") {
      conversions.contacts++;
    } else {
      conversions.consultations++;
    }
    localStorage.setItem(
      "mh_analytics_conversions",
      JSON.stringify(conversions),
    );
    beaconConversion(conversionType);
  }
}

/**
 * Track scroll depth
 * Automatically called by usePageTracking hook
 */
export function trackScrollDepth(depth: number): void {
  if (isLighthouseRun()) {
    return;
  }

  analyticsEngine.track("user_interaction", {
    element: "page",
    action: "scroll",
    depth,
    timestamp: new Date().toISOString(),
    page: typeof window !== "undefined" ? window.location.pathname : "",
  });
}

/**
 * Track page view
 * Automatically called by usePageTracking hook
 */
export function trackPageView(
  page: string,
  properties?: Record<string, unknown>,
): void {
  if (isLighthouseRun()) {
    return;
  }

  analyticsEngine.trackPageView(page, properties);

  // Store page view data locally + beacon to server
  if (typeof window !== "undefined") {
    const pageViews = getStoredPageViews();
    pageViews.total++;
    pageViews.pages[page] = (pageViews.pages[page] || 0) + 1;

    if (page.includes("veteran")) {
      pageViews.veteran++;
    }

    localStorage.setItem("mh_analytics_pageviews", JSON.stringify(pageViews));
    beaconPageview(page);
  }
}

/**
 * Track time spent on page
 * Automatically called by usePageTracking hook
 */
export function trackPageDuration(page: string, duration: number): void {
  if (isLighthouseRun()) {
    return;
  }

  analyticsEngine.track("user_interaction", {
    element: "page",
    action: "duration",
    duration,
    page,
    timestamp: new Date().toISOString(),
  });

  // Update session data locally + beacon session duration to server
  if (typeof window !== "undefined") {
    const sessions = getStoredSessions();
    const currentSession = sessions[sessions.length - 1];
    if (currentSession) {
      currentSession.duration += duration;
      currentSession.pageViews++;
      localStorage.setItem("mh_analytics_sessions", JSON.stringify(sessions));
    }
    beaconSessionEnd(duration);
  }
}

// Helper functions to get stored data
function getStoredClicks(): Array<{
  element: string;
  timestamp: string;
  page: string;
  deviceType?: string;
  browser?: string;
  os?: string;
  [key: string]: unknown;
}> {
  try {
    const stored = localStorage.getItem("mh_analytics_clicks");
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
}

function getStoredPageViews() {
  try {
    const stored = localStorage.getItem("mh_analytics_pageviews");
    return stored
      ? JSON.parse(stored)
      : { total: 0, unique: 0, sessions: 0, pages: {}, veteran: 0 };
  } catch {
    return { total: 0, unique: 0, sessions: 0, pages: {}, veteran: 0 };
  }
}

function getStoredConversions() {
  try {
    const stored = localStorage.getItem("mh_analytics_conversions");
    return stored
      ? JSON.parse(stored)
      : { total: 0, consultations: 0, contacts: 0 };
  } catch {
    return { total: 0, consultations: 0, contacts: 0 };
  }
}

function getStoredSessions(): Array<{
  id: string;
  startTime: string;
  duration: number;
  pageViews: number;
}> {
  try {
    const stored = localStorage.getItem("mh_analytics_sessions");
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
}

/**
 * Initialize a new session
 * Called automatically by usePageTracking
 */
export function initializeSession(): void {
  if (typeof window === "undefined" || isLighthouseRun()) return;

  const sessions = getStoredSessions();
  const sessionId = `session-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

  sessions.push({
    id: sessionId,
    startTime: new Date().toISOString(),
    duration: 0,
    pageViews: 0,
  });

  localStorage.setItem(
    "mh_analytics_sessions",
    JSON.stringify(sessions.slice(-100)),
  ); // Keep last 100 sessions

  // Update page views with session count
  const pageViews = getStoredPageViews();
  pageViews.sessions = sessions.length;
  pageViews.unique = Math.floor(sessions.length * 0.7); // Estimate unique visitors
  localStorage.setItem("mh_analytics_pageviews", JSON.stringify(pageViews));
}
