/**
 * Analytics Tracking Utilities
 *
 * Internal analytics collection has been retired.
 * These helpers now only forward events to Google Analytics (`window.gtag`) when available.
 */

type GtagParamValue = string | number | boolean | undefined;
type GtagParams = Record<string, GtagParamValue>;

type AnalyticsEventName = keyof AnalyticsEventMap;

type AnalyticsEventMap = {
  click: {
    element: string;
    page_path: string;
    event_category?: string;
    event_label?: string;
    value?: number;
    page?: string;
    section?: string;
    category?: string;
    action?: string;
    serviceName?: string;
    projectTitle?: string;
    projectType?: string;
    milestone?: string;
    landingPage?: string;
    referrer?: string;
    contactType?: "phone" | "email" | "address";
    location?: string;
    featured?: boolean;
  };
  form_submission: {
    form_id: string;
    form_type?: string;
    form_location?: string;
    route_template?: string;
  };
  conversion: {
    conversion_type: string;
    send_to?: string;
    event_category?: string;
    event_label?: string;
    value?: number;
    currency?: string;
  };
  page_view: {
    page_path: string;
    pageName?: string;
    page_title?: string;
    page_location?: string;
    referrer?: string;
    timestamp?: string;
    route_template?: string;
  };
  page_duration: {
    duration: number;
    page_path: string;
    route_template?: string;
  };
  scroll_depth: {
    depth: number;
    page_path: string;
    route_template?: string;
  };
  site_search: {
    event_category?: string;
    search_location: string;
    results_count: number;
    search_type?: string;
    query_length?: number;
  };
  search_filter_used: {
    event_category?: string;
    filter_type: string;
    filter_value: string;
    has_search_query?: boolean;
  };
  search_cleared: {
    event_category?: string;
    had_filters: boolean;
    cleared_query_length?: number;
  };
  file_download: {
    file_type: string;
    file_label: string;
    route_template: string;
    source?: string;
  };
  podcast_milestone: {
    milestone: string;
    episode_slug?: string;
    route_template: string;
  };
  web_vital: {
    metric_name: string;
    metric_id: string;
    value: number;
    metric_rating: "good" | "needs-improvement" | "poor";
    metric_delta: number;
    route_template: string;
    non_interaction: boolean;
  };
  exception: {
    description: string;
    fatal?: boolean;
  };
};

const SENSITIVE_PARAM_PATTERNS = [
  /email/i,
  /phone/i,
  /search[_-]?term/i,
  /query/i,
  /message/i,
  /^name$/i,
] as const;

const DEDUP_EVENT_NAMES: ReadonlySet<AnalyticsEventName> = new Set([
  "page_view",
  "form_submission",
  "file_download",
  "podcast_milestone",
]);

const DEDUP_WINDOW_MS = 1500;
const dedupCache = new Map<string, number>();

const EVENT_PARAM_ALLOWLIST: {
  [K in AnalyticsEventName]: ReadonlySet<keyof AnalyticsEventMap[K] & string>;
} = {
  click: new Set([
    "element",
    "page_path",
    "event_category",
    "event_label",
    "value",
    "page",
    "section",
    "category",
    "action",
    "serviceName",
    "projectTitle",
    "projectType",
    "milestone",
    "landingPage",
    "referrer",
    "contactType",
    "location",
    "featured",
  ]),
  form_submission: new Set([
    "form_id",
    "form_type",
    "form_location",
    "route_template",
  ]),
  conversion: new Set([
    "conversion_type",
    "send_to",
    "event_category",
    "event_label",
    "value",
    "currency",
  ]),
  page_view: new Set([
    "page_path",
    "pageName",
    "page_title",
    "page_location",
    "referrer",
    "timestamp",
    "route_template",
  ]),
  page_duration: new Set(["duration", "page_path", "route_template"]),
  scroll_depth: new Set(["depth", "page_path", "route_template"]),
  site_search: new Set([
    "event_category",
    "search_location",
    "results_count",
    "search_type",
    "query_length",
  ]),
  search_filter_used: new Set([
    "event_category",
    "filter_type",
    "filter_value",
    "has_search_query",
  ]),
  search_cleared: new Set([
    "event_category",
    "had_filters",
    "cleared_query_length",
  ]),
  file_download: new Set([
    "file_type",
    "file_label",
    "route_template",
    "source",
  ]),
  podcast_milestone: new Set(["milestone", "episode_slug", "route_template"]),
  web_vital: new Set([
    "metric_name",
    "metric_id",
    "value",
    "metric_rating",
    "metric_delta",
    "route_template",
    "non_interaction",
  ]),
  exception: new Set(["description", "fatal"]),
};

type WindowWithGtag = Window & {
  gtag?: (command: "event", eventName: string, params?: GtagParams) => void;
  __LIGHTHOUSE__?: boolean;
};

function isLighthouseRun(): boolean {
  if (typeof window === "undefined") {
    return false;
  }

  const userAgent = typeof navigator !== "undefined" ? navigator.userAgent : "";
  return (
    Boolean((window as WindowWithGtag).__LIGHTHOUSE__) ||
    /Chrome-Lighthouse/i.test(userAgent)
  );
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

export function normalizeAnalyticsRouteTemplate(pathname: string): string {
  const stripped = pathname.split("?")[0]?.split("#")[0] ?? "/";

  if (/^\/projects\/[^/]+$/.test(stripped)) {
    return "/projects/[slug]";
  }

  if (/^\/events\/[^/]+$/.test(stripped)) {
    return "/events/[slug]";
  }

  if (/^\/locations\/[^/]+$/.test(stripped)) {
    return "/locations/[city]";
  }

  if (/^\/faq\/[^/]+$/.test(stripped)) {
    return "/faq/[category]";
  }

  if (/^\/resources\/safety-manual\/[^/]+$/.test(stripped)) {
    return "/resources/safety-manual/[cluster]";
  }

  return stripped || "/";
}

function sanitizeStringValue(value: string): string {
  return value.slice(0, 120);
}

function shouldRedactKey(key: string): boolean {
  return SENSITIVE_PARAM_PATTERNS.some((pattern) => pattern.test(key));
}

function sanitizeLooseParams(params: Record<string, unknown>): GtagParams {
  const next: GtagParams = {};

  Object.entries(params).forEach(([key, value]) => {
    if (shouldRedactKey(key)) {
      return;
    }

    if (typeof value === "string") {
      next[key] = sanitizeStringValue(value);
      return;
    }

    if (
      typeof value === "number" ||
      typeof value === "boolean" ||
      typeof value === "undefined"
    ) {
      next[key] = value;
    }
  });

  return next;
}

function sanitizeEventParams(
  eventName: AnalyticsEventName,
  params: Record<string, unknown>,
): GtagParams {
  const allowedKeys = EVENT_PARAM_ALLOWLIST[eventName];
  const next: GtagParams = {};

  Object.entries(params).forEach(([key, value]) => {
    const typedKey = key as keyof AnalyticsEventMap[typeof eventName] & string;

    if (!allowedKeys.has(typedKey)) {
      return;
    }

    if (shouldRedactKey(typedKey)) {
      return;
    }

    if (typeof value === "string") {
      next[typedKey] = sanitizeStringValue(value);
      return;
    }

    if (
      typeof value === "number" ||
      typeof value === "boolean" ||
      typeof value === "undefined"
    ) {
      next[typedKey] = value;
    }
  });

  return next;
}

function shouldDeduplicateEvent(
  eventName: AnalyticsEventName,
  params: GtagParams,
): boolean {
  if (!DEDUP_EVENT_NAMES.has(eventName)) {
    return false;
  }

  const now = Date.now();
  for (const [key, timestamp] of dedupCache.entries()) {
    if (now - timestamp > DEDUP_WINDOW_MS) {
      dedupCache.delete(key);
    }
  }

  const dedupKey = `${eventName}:${JSON.stringify(params)}`;
  const lastSeenAt = dedupCache.get(dedupKey);
  if (lastSeenAt && now - lastSeenAt < DEDUP_WINDOW_MS) {
    return true;
  }

  dedupCache.set(dedupKey, now);
  return false;
}

function getStringParam(
  params: Record<string, unknown>,
  key: string,
): string | null {
  const value = params[key];
  return typeof value === "string" ? value : null;
}

function getNumberParam(
  params: Record<string, unknown>,
  key: string,
): number | null {
  const value = params[key];
  return typeof value === "number" ? value : null;
}

function getBooleanParam(
  params: Record<string, unknown>,
  key: string,
): boolean | null {
  const value = params[key];
  return typeof value === "boolean" ? value : null;
}

function isValidEvent(
  eventName: AnalyticsEventName,
  params: Record<string, unknown>,
): boolean {
  switch (eventName) {
    case "click":
      return (getStringParam(params, "element") ?? "").length > 0;
    case "form_submission":
      return (getStringParam(params, "form_id") ?? "").length > 0;
    case "conversion":
      return (getStringParam(params, "conversion_type") ?? "").length > 0;
    case "page_view":
      return (getStringParam(params, "page_path") ?? "").length > 0;
    case "page_duration":
      return (getNumberParam(params, "duration") ?? -1) >= 0;
    case "scroll_depth":
      return (getNumberParam(params, "depth") ?? -1) >= 0;
    case "site_search":
      return (
        (getStringParam(params, "search_location") ?? "").length > 0 &&
        Number.isFinite(getNumberParam(params, "results_count"))
      );
    case "search_filter_used":
      return (
        (getStringParam(params, "filter_type") ?? "").length > 0 &&
        (getStringParam(params, "filter_value") ?? "").length > 0
      );
    case "search_cleared":
      return getBooleanParam(params, "had_filters") !== null;
    case "file_download":
      return (
        (getStringParam(params, "file_type") ?? "").length > 0 &&
        (getStringParam(params, "file_label") ?? "").length > 0 &&
        (getStringParam(params, "route_template") ?? "").length > 0
      );
    case "podcast_milestone":
      return (
        (getStringParam(params, "milestone") ?? "").length > 0 &&
        (getStringParam(params, "route_template") ?? "").length > 0
      );
    case "web_vital":
      return (
        (getStringParam(params, "metric_name") ?? "").length > 0 &&
        (getStringParam(params, "metric_id") ?? "").length > 0 &&
        Number.isFinite(getNumberParam(params, "value"))
      );
    case "exception":
      return (getStringParam(params, "description") ?? "").length > 0;
    default:
      return false;
  }
}

export function trackAnalyticsEvent<K extends AnalyticsEventName>(
  eventName: K,
  params: AnalyticsEventMap[K],
): void {
  const rawParams = params as Record<string, unknown>;

  if (!isValidEvent(eventName, rawParams)) {
    return;
  }

  const sanitizedParams = sanitizeEventParams(eventName, rawParams);
  if (shouldDeduplicateEvent(eventName, sanitizedParams)) {
    return;
  }

  dispatchGoogleEvent(eventName, sanitizedParams as GtagParams);
}

export function trackCustomAnalyticsEvent(
  eventName: string,
  params: Record<string, unknown> = {},
): void {
  if (!eventName.trim()) {
    return;
  }

  dispatchGoogleEvent(eventName, sanitizeLooseParams(params));
}

export function trackWebVital(params: AnalyticsEventMap["web_vital"]): void {
  trackAnalyticsEvent("web_vital", params);
}

export function trackFileDownload(
  params: AnalyticsEventMap["file_download"],
): void {
  trackAnalyticsEvent("file_download", params);
}

export function trackPodcastMilestone(
  params: AnalyticsEventMap["podcast_milestone"],
): void {
  trackAnalyticsEvent("podcast_milestone", params);
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
  trackAnalyticsEvent("click", {
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
  trackAnalyticsEvent("form_submission", {
    form_id: formId,
    ...(properties as GtagParams | undefined),
  });

  const conversionType = formId.includes("consult")
    ? "consultation"
    : "contact";

  trackAnalyticsEvent("conversion", {
    conversion_type: conversionType,
  });
}

/**
 * Track scroll depth
 * Automatically called by usePageTracking hook
 */
export function trackScrollDepth(depth: number): void {
  trackAnalyticsEvent("scroll_depth", {
    depth,
    page_path: typeof window !== "undefined" ? window.location.pathname : "",
    route_template:
      typeof window !== "undefined"
        ? normalizeAnalyticsRouteTemplate(window.location.pathname)
        : "/",
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
  trackAnalyticsEvent("page_view", {
    page_path: page,
    route_template: normalizeAnalyticsRouteTemplate(page),
    ...(properties as GtagParams | undefined),
  });
}

/**
 * Track time spent on page
 * Automatically called by usePageTracking hook
 */
export function trackPageDuration(page: string, duration: number): void {
  trackAnalyticsEvent("page_duration", {
    duration,
    page_path: page,
    route_template: normalizeAnalyticsRouteTemplate(page),
  });
}

/**
 * Initialize a new session
 * Called automatically by usePageTracking
 */
export function initializeSession(): void {
  // Internal session analytics is intentionally disabled.
}
