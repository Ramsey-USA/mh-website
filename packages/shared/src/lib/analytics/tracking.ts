/**
 * Analytics Tracking Utilities
 *
 * Internal analytics collection has been retired.
 * These helpers now only forward events to Google Analytics (`window.gtag`) when available.
 */

type GtagParamValue = string | number | boolean | undefined;
type GtagParams = Record<string, GtagParamValue>;

type WindowWithGtag = Window & {
  gtag?: (command: "event", eventName: string, params?: GtagParams) => void;
};

function isLighthouseRun(): boolean {
  if (typeof window === "undefined") {
    return false;
  }

  const userAgent = typeof navigator !== "undefined" ? navigator.userAgent : "";
  return Boolean(window.__LIGHTHOUSE__) || /Chrome-Lighthouse/i.test(userAgent);
}

function dispatchGoogleEvent(eventName: string, params: GtagParams = {}): void {
  if (typeof window === "undefined" || isLighthouseRun()) {
    return;
  }

  const gtag = (window as WindowWithGtag).gtag;
  if (!gtag) {
    return;
  }

  gtag("event", eventName, params);
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
  dispatchGoogleEvent("click", {
    element: elementId,
    page_path: typeof window !== "undefined" ? window.location.pathname : "",
    ...(properties as GtagParams | undefined),
  });
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
  dispatchGoogleEvent("form_submission", {
    form_id: formId,
    ...(properties as GtagParams | undefined),
  });

  const conversionType = formId.includes("consult")
    ? "consultation"
    : "contact";

  dispatchGoogleEvent("conversion", {
    conversion_type: conversionType,
  });
}

/**
 * Track scroll depth
 * Automatically called by usePageTracking hook
 */
export function trackScrollDepth(depth: number): void {
  dispatchGoogleEvent("scroll_depth", {
    depth,
    page_path: typeof window !== "undefined" ? window.location.pathname : "",
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
  dispatchGoogleEvent("page_view", {
    page_path: page,
    ...(properties as GtagParams | undefined),
  });
}

/**
 * Track time spent on page
 * Automatically called by usePageTracking hook
 */
export function trackPageDuration(page: string, duration: number): void {
  dispatchGoogleEvent("page_duration", {
    duration,
    page_path: page,
  });
}

/**
 * Initialize a new session
 * Called automatically by usePageTracking
 */
export function initializeSession(): void {
  // Internal session analytics is intentionally disabled.
}
