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
import { getEnhancedTrackingProperties, getDeviceInfo } from "./metadata";

/**
 * Track button/link clicks
 * Use this on any clickable element you want to track
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
  const enhancedProps = getEnhancedTrackingProperties();

  analyticsEngine.track("user_interaction", {
    element: elementId,
    action: "click",
    ...enhancedProps,
    ...properties, // User properties override defaults
  });

  // Store click data in localStorage for dashboard
  if (typeof window !== "undefined") {
    const clicks = getStoredClicks();
    const deviceInfo = getDeviceInfo();
    clicks.push({
      element: elementId,
      timestamp: new Date().toISOString(),
      page: window.location.pathname,
      deviceType: deviceInfo.type,
      browser: deviceInfo.browser,
      os: deviceInfo.os,
      ...properties,
    });
    localStorage.setItem(
      "mh_analytics_clicks",
      JSON.stringify(clicks.slice(-1000)),
    ); // Keep last 1000
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
  const enhancedProps = getEnhancedTrackingProperties();

  analyticsEngine.track("form_submission", {
    formId,
    ...enhancedProps,
    ...properties,
  });

  // Store conversion data
  if (typeof window !== "undefined") {
    const conversions = getStoredConversions();
    conversions.total++;
    if (formId.includes("contact")) {
      conversions.contacts++;
    } else if (formId.includes("consult")) {
      conversions.consultations++;
    }
    localStorage.setItem(
      "mh_analytics_conversions",
      JSON.stringify(conversions),
    );
  }
}

/**
 * Track form field interactions
 * Use this to see which fields users interact with
 *
 * @example
 * <input onFocus={() => trackFormField('email-field', 'focus')} />
 */
export function trackFormField(
  fieldId: string,
  action: "focus" | "blur" | "change",
  properties?: Record<string, unknown>,
): void {
  analyticsEngine.track("user_interaction", {
    element: fieldId,
    action,
    type: "form_field",
    timestamp: new Date().toISOString(),
    page: typeof window !== "undefined" ? window.location.pathname : "",
    ...properties,
  });
}

/**
 * Track scroll depth
 * Automatically called by usePageTracking hook
 */
export function trackScrollDepth(depth: number): void {
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
  analyticsEngine.trackPageView(page, properties);

  // Store page view data
  if (typeof window !== "undefined") {
    const pageViews = getStoredPageViews();
    pageViews.total++;
    pageViews.pages[page] = (pageViews.pages[page] || 0) + 1;

    // Track veteran page views
    if (page.includes("veteran")) {
      pageViews.veteran++;
    }

    localStorage.setItem("mh_analytics_pageviews", JSON.stringify(pageViews));
  }
}

/**
 * Track time spent on page
 * Automatically called by usePageTracking hook
 */
export function trackPageDuration(page: string, duration: number): void {
  analyticsEngine.track("user_interaction", {
    element: "page",
    action: "duration",
    duration,
    page,
    timestamp: new Date().toISOString(),
  });

  // Update session data
  if (typeof window !== "undefined") {
    const sessions = getStoredSessions();
    const currentSession = sessions[sessions.length - 1];
    if (currentSession) {
      currentSession.duration += duration;
      currentSession.pageViews++;
      localStorage.setItem("mh_analytics_sessions", JSON.stringify(sessions));
    }
  }
}

/**
 * Track CTA (Call-to-Action) button clicks
 * Specialized tracking for conversion-focused buttons
 *
 * @example
 * <button onClick={() => trackCTA('get-quote', { variant: 'primary' })}>
 *   Get a Quote
 * </button>
 */
export function trackCTA(
  ctaId: string,
  properties?: Record<string, unknown>,
): void {
  trackClick(`cta-${ctaId}`, { ...properties, type: "cta" });
}

/**
 * Track navigation events
 * Use when users navigate between sections
 *
 * @example
 * trackNavigation('services-menu', { destination: '/services' });
 */
export function trackNavigation(
  navigationId: string,
  properties?: Record<string, unknown>,
): void {
  analyticsEngine.track("user_interaction", {
    element: navigationId,
    action: "navigate",
    timestamp: new Date().toISOString(),
    ...properties,
  });
}

/**
 * Track video interactions
 * Use for tracking video plays, pauses, completion
 *
 * @example
 * <video onPlay={() => trackVideo('intro-video', 'play')} />
 */
export function trackVideo(
  videoId: string,
  action: "play" | "pause" | "complete",
  properties?: Record<string, unknown>,
): void {
  analyticsEngine.track("user_interaction", {
    element: videoId,
    action: `video_${action}`,
    type: "video",
    timestamp: new Date().toISOString(),
    ...properties,
  });
}

/**
 * Track downloads
 * Use when users download files
 *
 * @example
 * <a onClick={() => trackDownload('brochure.pdf')}>Download Brochure</a>
 */
export function trackDownload(
  fileName: string,
  properties?: Record<string, unknown>,
): void {
  analyticsEngine.track("user_interaction", {
    element: fileName,
    action: "download",
    type: "download",
    timestamp: new Date().toISOString(),
    ...properties,
  });
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
  if (typeof window === "undefined") return;

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
