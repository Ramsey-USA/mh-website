/**
 * Mobile Performance Monitor
 * Tracks and reports mobile-specific performance metrics
 */

"use client";

import { useEffect } from "react";
import {
  isMobileDevice,
  isSlowConnection,
} from "@/lib/performance/mobile-optimizations";

export function MobilePerformanceMonitor() {
  useEffect(() => {
    if (typeof window === "undefined") return;

    const mobile = isMobileDevice();
    const slowConnection = isSlowConnection();

    // Report device capabilities
    console.info("[Performance] Device Info:", {
      mobile,
      slowConnection,
      screenWidth: window.innerWidth,
      devicePixelRatio: window.devicePixelRatio,
    });

    // Monitor Core Web Vitals on mobile
    if (mobile && "PerformanceObserver" in window) {
      try {
        // Monitor Largest Contentful Paint (LCP)
        const lcpObserver = new PerformanceObserver((list) => {
          const entries = list.getEntries();
          const lastEntry = entries[entries.length - 1];
          if (lastEntry) {
            console.info("[Mobile LCP]", lastEntry.startTime, "ms");
          }
        });
        lcpObserver.observe({
          type: "largest-contentful-paint",
          buffered: true,
        });

        // Monitor First Input Delay (FID)
        const fidObserver = new PerformanceObserver((list) => {
          list.getEntries().forEach((entry: any) => {
            console.info(
              "[Mobile FID]",
              entry.processingStart - entry.startTime,
              "ms",
            );
          });
        });
        fidObserver.observe({ type: "first-input", buffered: true });

        // Monitor Cumulative Layout Shift (CLS)
        let clsScore = 0;
        const clsObserver = new PerformanceObserver((list) => {
          list.getEntries().forEach((entry: any) => {
            if (!entry.hadRecentInput) {
              clsScore += entry.value;
            }
          });
          console.info("[Mobile CLS]", clsScore);
        });
        clsObserver.observe({ type: "layout-shift", buffered: true });

        return () => {
          lcpObserver.disconnect();
          fidObserver.disconnect();
          clsObserver.disconnect();
        };
      } catch (error) {
        console.warn("[Performance] Observer setup failed:", error);
      }
    }

    return undefined;
  }, []);

  return null;
}
