/**
 * Mobile Performance Monitor
 * Tracks and reports mobile-specific performance metrics
 */

"use client";

import { useEffect } from "react";
import { logger } from "@/lib/utils/logger";
import {
  isMobileDevice,
  isSlowConnection,
} from "@/lib/performance/mobile-optimizations";

// Type definitions for performance API
interface PerformanceEventTiming extends PerformanceEntry {
  processingStart: number;
  startTime: number;
}

interface LayoutShift extends PerformanceEntry {
  value: number;
  hadRecentInput: boolean;
}

export function MobilePerformanceMonitor() {
  useEffect(() => {
    if (typeof window === "undefined") return;

    const mobile = isMobileDevice();
    const slowConnection = isSlowConnection();

    // Report device capabilities
    logger.info("[Performance] Device Info:", {
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
            logger.info("[Mobile LCP]", lastEntry.startTime, "ms");
          }
        });
        lcpObserver.observe({
          type: "largest-contentful-paint",
          buffered: true,
        });

        // Monitor First Input Delay (FID)
        const fidObserver = new PerformanceObserver((list) => {
          list.getEntries().forEach((entry: PerformanceEntry) => {
            const fidEntry = entry as PerformanceEventTiming;
            logger.info(
              "[Mobile FID]",
              fidEntry.processingStart - fidEntry.startTime,
              "ms",
            );
          });
        });
        fidObserver.observe({ type: "first-input", buffered: true });

        // Monitor Cumulative Layout Shift (CLS)
        let clsScore = 0;
        const clsObserver = new PerformanceObserver((list) => {
          list.getEntries().forEach((entry: PerformanceEntry) => {
            const clsEntry = entry as LayoutShift;
            if (!clsEntry.hadRecentInput) {
              clsScore += clsEntry.value;
            }
          });
          logger.info("[Mobile CLS]", clsScore);
        });
        clsObserver.observe({ type: "layout-shift", buffered: true });

        return () => {
          lcpObserver.disconnect();
          fidObserver.disconnect();
          clsObserver.disconnect();
        };
      } catch (error) {
        logger.warn("[Performance] Observer setup failed:", error);
      }
    }

    return undefined;
  }, []);

  return null;
}
