"use client";

import { useEffect } from "react";
import { logger } from "@/lib/utils/logger";

export function WebVitalsReporter() {
  useEffect(() => {
    // Only load web vitals in production
    if (process.env.NODE_ENV === "production") {
      import("web-vitals").then(({ onCLS, onINP, onFCP, onLCP, onTTFB }) => {
        onCLS((metric) => logger.info("Web Vital - CLS", metric));
        onINP((metric) => logger.info("Web Vital - INP", metric));
        onFCP((metric) => logger.info("Web Vital - FCP", metric));
        onLCP((metric) => logger.info("Web Vital - LCP", metric));
        onTTFB((metric) => logger.info("Web Vital - TTFB", metric));
      });
    }
  }, []);

  return null;
}
