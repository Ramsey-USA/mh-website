"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

const WebVitalsReporter = dynamic(
  () =>
    import("@/components/performance/WebVitalsReporter").then((mod) => ({
      default: mod.WebVitalsReporter,
    })),
  { ssr: false },
);

const MobilePerformanceMonitor = dynamic(
  () =>
    import("@/components/performance/MobilePerformanceMonitor").then((mod) => ({
      default: mod.MobilePerformanceMonitor,
    })),
  { ssr: false },
);

const PWAManager = dynamic(
  () => import("@/components/pwa").then((mod) => ({ default: mod.PWAManager })),
  { ssr: false },
);

const OfflineIndicator = dynamic(
  () =>
    import("@/components/pwa/OfflineIndicator").then((mod) => ({
      default: mod.OfflineIndicator,
    })),
  { ssr: false },
);

const ENABLE_RUNTIME_ENHANCEMENTS =
  process.env.NODE_ENV === "production" ||
  process.env["NEXT_PUBLIC_ENABLE_RUNTIME_MONITORING"] === "true";

export function DeferredPerformanceEnhancements() {
  const [shouldRender, setShouldRender] = useState(false);

  useEffect(() => {
    if (!ENABLE_RUNTIME_ENHANCEMENTS) {
      return;
    }

    let cancelled = false;
    let timeoutId: ReturnType<typeof globalThis.setTimeout> | undefined;
    let idleId: number | undefined;
    const requestIdleCallback =
      typeof globalThis.requestIdleCallback === "function"
        ? globalThis.requestIdleCallback.bind(globalThis)
        : undefined;
    const cancelIdleCallback =
      typeof globalThis.cancelIdleCallback === "function"
        ? globalThis.cancelIdleCallback.bind(globalThis)
        : undefined;

    const enable = () => {
      if (!cancelled) {
        setShouldRender(true);
      }
    };

    const scheduleEnable = () => {
      if (requestIdleCallback) {
        idleId = requestIdleCallback(enable, { timeout: 1500 });
        return;
      }

      timeoutId = globalThis.setTimeout(enable, 1500);
    };

    if (globalThis.document?.readyState === "complete") {
      scheduleEnable();
    } else {
      globalThis.addEventListener?.("load", scheduleEnable, { once: true });
    }

    return () => {
      cancelled = true;
      globalThis.removeEventListener?.("load", scheduleEnable);

      if (idleId !== undefined && cancelIdleCallback) {
        cancelIdleCallback(idleId);
      }

      if (timeoutId !== undefined) {
        globalThis.clearTimeout(timeoutId);
      }
    };
  }, []);

  if (!ENABLE_RUNTIME_ENHANCEMENTS || !shouldRender) {
    return null;
  }

  return (
    <>
      <WebVitalsReporter />
      <MobilePerformanceMonitor />
      <PWAManager />
      <OfflineIndicator />
    </>
  );
}
