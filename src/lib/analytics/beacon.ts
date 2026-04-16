/**
 * Analytics Beacon
 *
 * Sends analytics events to the server via `/api/analytics/collect`.
 * Uses `navigator.sendBeacon` on page unload for reliability, and
 * `fetch(keepalive: true)` for in-page flushes.
 *
 * Events are batched in memory and flushed:
 *   - Every 10 seconds (debounced)
 *   - On page visibility change (hidden)
 *   - On page unload (beforeunload)
 */

const FLUSH_INTERVAL_MS = 10_000;
const MAX_QUEUE_SIZE = 25;

interface BeaconEvent {
  type: "pageview" | "click" | "conversion" | "session_end";
  page?: string | undefined;
  element?: string | undefined;
  conversionType?: "contact" | "consultation" | undefined;
  duration?: number | undefined;
  deviceType?: string | undefined;
  browser?: string | undefined;
  os?: string | undefined;
  country?: string | undefined;
  state?: string | undefined;
  city?: string | undefined;
}

const queue: BeaconEvent[] = [];
let flushTimer: ReturnType<typeof setTimeout> | null = null;
let listenersBound = false;

function isLighthouseRun(): boolean {
  if (typeof window === "undefined") return false;
  if (window.__LIGHTHOUSE__) return true;
  return /Chrome-Lighthouse/i.test(navigator.userAgent);
}

function scheduleFlush(): void {
  if (flushTimer) return;
  flushTimer = setTimeout(() => {
    flushTimer = null;
    flush();
  }, FLUSH_INTERVAL_MS);
}

function flush(): void {
  if (queue.length === 0) return;
  const batch = queue.splice(0, MAX_QUEUE_SIZE);
  const payload = JSON.stringify({ events: batch });
  const url = "/api/analytics/collect";

  // Prefer sendBeacon for unload reliability; fall back to fetch.
  if (typeof navigator !== "undefined" && navigator.sendBeacon) {
    const blob = new Blob([payload], { type: "application/json" });
    const sent = navigator.sendBeacon(url, blob);
    if (!sent) {
      // sendBeacon failed (queue full); try fetch
      fetchFallback(url, payload);
    }
  } else {
    fetchFallback(url, payload);
  }

  // If there are still events queued (> MAX_QUEUE_SIZE), schedule another flush
  if (queue.length > 0) {
    scheduleFlush();
  }
}

function fetchFallback(url: string, payload: string): void {
  try {
    fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: payload,
      keepalive: true,
    }).catch(() => {
      // Silently ignore — analytics should never break the user experience
    });
  } catch {
    // Ignore
  }
}

function bindListeners(): void {
  if (listenersBound || typeof window === "undefined") return;
  listenersBound = true;

  // Flush when page becomes hidden (tab switch, minimize, navigate away)
  document.addEventListener("visibilitychange", () => {
    if (document.visibilityState === "hidden") {
      flush();
    }
  });

  // Flush on unload as a final safety net
  window.addEventListener("beforeunload", () => {
    flush();
  });
}

// ── Public API ───────────────────────────────────────────────────────────────

export function beaconEvent(event: BeaconEvent): void {
  if (typeof window === "undefined" || isLighthouseRun()) return;

  bindListeners();
  queue.push(event);

  if (queue.length >= MAX_QUEUE_SIZE) {
    flush();
  } else {
    scheduleFlush();
  }
}

export function beaconPageview(page: string): void {
  beaconEvent({ type: "pageview", page });
}

export function beaconClick(
  element: string,
  meta?: Omit<BeaconEvent, "type" | "element">,
): void {
  beaconEvent({ type: "click", element, ...meta });
}

export function beaconConversion(
  conversionType: "contact" | "consultation",
): void {
  beaconEvent({ type: "conversion", conversionType });
}

export function beaconSessionEnd(duration: number): void {
  beaconEvent({ type: "session_end", duration });
}

/**
 * Force-flush any queued events immediately.
 * Called internally on visibilitychange/beforeunload.
 */
export function beaconFlush(): void {
  if (isLighthouseRun()) return;
  flush();
}
