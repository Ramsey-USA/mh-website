/**
 * Enhanced Metadata Collection
 *
 * Collects comprehensive device, browser, and session information
 * for analytics tracking. This ensures we capture ALL prudent data
 * for understanding user behavior and technical context.
 */

import type { DeviceInfo, LocationInfo, EventMetadata } from "./types";

/**
 * Get comprehensive device information
 * Includes device type, OS, browser, screen resolution, viewport
 */
export function getDeviceInfo(): DeviceInfo {
  if (typeof window === "undefined") {
    return {
      type: "desktop",
      os: "unknown",
      browser: "unknown",
      screenResolution: "unknown",
      viewportSize: "unknown",
    };
  }

  const userAgent = navigator.userAgent;

  // Detect device type
  const isMobile =
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      userAgent,
    );
  const isTablet = /iPad|Android(?!.*Mobile)/i.test(userAgent);
  const deviceType = isTablet ? "tablet" : isMobile ? "mobile" : "desktop";

  // Detect OS
  let os = "Unknown";
  if (userAgent.includes("Win")) {
    os = "Windows";
  } else if (userAgent.includes("Mac")) {
    os = "macOS";
  } else if (userAgent.includes("Linux")) {
    os = "Linux";
  } else if (userAgent.includes("Android")) {
    os = "Android";
  } else if (
    userAgent.includes("iOS") ||
    userAgent.includes("iPhone") ||
    userAgent.includes("iPad")
  ) {
    os = "iOS";
  }

  // Detect browser
  let browser = "Unknown";
  if (userAgent.includes("Firefox")) {
    browser = "Firefox";
  } else if (userAgent.includes("Chrome") && !userAgent.includes("Edg")) {
    browser = "Chrome";
  } else if (userAgent.includes("Safari") && !userAgent.includes("Chrome")) {
    browser = "Safari";
  } else if (userAgent.includes("Edg")) {
    browser = "Edge";
  } else if (userAgent.includes("Opera") || userAgent.includes("OPR")) {
    browser = "Opera";
  }

  // Get screen resolution and viewport
  const screenResolution = `${window.screen.width}x${window.screen.height}`;
  const viewportSize = `${window.innerWidth}x${window.innerHeight}`;

  return {
    type: deviceType,
    os,
    browser,
    screenResolution,
    viewportSize,
  };
}

/**
 * Get comprehensive location/regional information
 * Includes timezone, language, and browser-provided location hints
 */
export function getLocationInfo(): LocationInfo {
  if (typeof window === "undefined") {
    return {
      timezone: "UTC",
      language: "en-US",
    };
  }

  // Get timezone
  const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone || "UTC";

  // Get language preferences
  const language = navigator.language || "en-US";

  // Optionally get country/region from timezone (basic inference)
  let country: string | undefined;
  let region: string | undefined;

  if (timezone.includes("/")) {
    const parts = timezone.split("/");
    region = parts[0]; // e.g., "America" from "America/Los_Angeles"
    if (timezone.includes("US") || region === "America") {
      country = "US";
    }
  }

  return {
    timezone,
    language,
    ...(country && { country }),
    ...(region && { region }),
  };
}

/**
 * Get connection information (network speed, type)
 */
export function getConnectionInfo(): Record<string, unknown> {
  if (typeof window === "undefined" || !("connection" in navigator)) {
    return {};
  }

  // Network Information API not in standard TypeScript definitions
  // Using any is necessary for vendor-prefixed experimental APIs
  /* eslint-disable @typescript-eslint/no-explicit-any */
  const connection =
    (navigator as any).connection ||
    (navigator as any).mozConnection ||
    (navigator as any).webkitConnection;
  /* eslint-enable @typescript-eslint/no-explicit-any */

  if (!connection) return {};

  return {
    effectiveType: connection.effectiveType, // '4g', '3g', etc.
    downlink: connection.downlink, // Mbps
    rtt: connection.rtt, // Round-trip time in ms
    saveData: connection.saveData, // Data saver mode enabled
  };
}

/**
 * Get session information
 */
export function getSessionInfo(): Record<string, unknown> {
  if (typeof window === "undefined") {
    return {};
  }

  // Check if new session
  const lastVisit = localStorage.getItem("mh_analytics_last_visit");
  const now = Date.now();
  const isNewSession = !lastVisit || now - parseInt(lastVisit) > 30 * 60 * 1000; // 30 min timeout

  // Get session count
  const sessionCount = parseInt(
    localStorage.getItem("mh_analytics_session_count") || "0",
  );

  if (isNewSession) {
    localStorage.setItem(
      "mh_analytics_session_count",
      String(sessionCount + 1),
    );
  }

  localStorage.setItem("mh_analytics_last_visit", String(now));

  return {
    isNewSession,
    sessionCount: isNewSession ? sessionCount + 1 : sessionCount,
    isReturningVisitor: sessionCount > 0,
  };
}

/**
 * Get traffic source information
 */
export function getTrafficSource(): Record<string, unknown> {
  if (typeof window === "undefined") {
    return {};
  }

  const referrer = document.referrer;
  const urlParams = new URLSearchParams(window.location.search);

  let source = "direct";
  let medium = "none";
  const campaign = urlParams.get("utm_campaign") || undefined;

  if (referrer) {
    const referrerUrl = new URL(referrer);
    const referrerHost = referrerUrl.hostname;

    // Determine source type
    if (referrerHost.includes("google")) {
      source = "google";
      medium = "organic";
    } else if (referrerHost.includes("bing")) {
      source = "bing";
      medium = "organic";
    } else if (referrerHost.includes("facebook")) {
      source = "facebook";
      medium = "social";
    } else if (
      referrerHost.includes("twitter") ||
      referrerHost.includes("t.co")
    ) {
      source = "twitter";
      medium = "social";
    } else if (referrerHost.includes("linkedin")) {
      source = "linkedin";
      medium = "social";
    } else if (referrerHost !== window.location.hostname) {
      source = referrerHost;
      medium = "referral";
    }
  }

  // Check for UTM parameters
  const utmSource = urlParams.get("utm_source");
  const utmMedium = urlParams.get("utm_medium");

  if (utmSource) source = utmSource;
  if (utmMedium) medium = utmMedium;

  return {
    source,
    medium,
    campaign,
    referrer: referrer || "(direct)",
  };
}

/**
 * Get complete event metadata
 * Combines all metadata collection functions
 */
export function getEventMetadata(): EventMetadata {
  const device = getDeviceInfo();
  const location = getLocationInfo();

  return {
    page: typeof window !== "undefined" ? window.location.pathname : "/",
    referrer: typeof document !== "undefined" ? document.referrer : "",
    userAgent: typeof navigator !== "undefined" ? navigator.userAgent : "",
    device,
    location,
  };
}

/**
 * Get enhanced tracking properties
 * Returns all available context for an analytics event
 */
export function getEnhancedTrackingProperties(): Record<string, unknown> {
  return {
    ...getSessionInfo(),
    ...getTrafficSource(),
    connection: getConnectionInfo(),
    timestamp: new Date().toISOString(),
    url: typeof window !== "undefined" ? window.location.href : "",
    path: typeof window !== "undefined" ? window.location.pathname : "",
    search: typeof window !== "undefined" ? window.location.search : "",
    hash: typeof window !== "undefined" ? window.location.hash : "",
  };
}
