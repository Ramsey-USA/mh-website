"use client";

import { useEffect } from "react";
import { logger } from "@/lib/utils/logger";
import {
  normalizeAnalyticsRouteTemplate,
  trackWebVital,
} from "@/lib/analytics/tracking";
import type { Metric } from "web-vitals";

const REPORTED_METRIC_IDS = new Set<string>();

/**
 * Performance thresholds for Core Web Vitals
 * Based on Google's recommendations:
 * - Good: Green (within threshold)
 * - Needs Improvement: Yellow (between threshold and poor)
 * - Poor: Red (above poor threshold)
 */
const PERFORMANCE_THRESHOLDS = {
  // Largest Contentful Paint (LCP) - measures loading performance
  LCP: { good: 2500, poor: 4000 }, // in milliseconds

  // First Input Delay / Interaction to Next Paint (INP) - measures interactivity
  INP: { good: 200, poor: 500 }, // in milliseconds

  // Cumulative Layout Shift (CLS) - measures visual stability
  CLS: { good: 0.1, poor: 0.25 }, // unitless score

  // First Contentful Paint (FCP) - measures perceived loading speed
  FCP: { good: 1800, poor: 3000 }, // in milliseconds

  // Time to First Byte (TTFB) - measures server responsiveness
  TTFB: { good: 800, poor: 1800 }, // in milliseconds
};

/**
 * Determine if a metric value is within acceptable performance thresholds
 */
function getPerformanceRating(
  metricName: string,
  value: number,
): "good" | "needs-improvement" | "poor" {
  const threshold =
    PERFORMANCE_THRESHOLDS[metricName as keyof typeof PERFORMANCE_THRESHOLDS];
  if (!threshold) return "good";

  if (value <= threshold.good) return "good";
  if (value <= threshold.poor) return "needs-improvement";
  return "poor";
}

/**
 * Send performance metric to analytics
 */
function sendToAnalytics(metric: Metric, routeTemplateOverride?: string) {
  if (REPORTED_METRIC_IDS.has(metric.id)) {
    return;
  }

  REPORTED_METRIC_IDS.add(metric.id);

  const rating = getPerformanceRating(metric.name, metric.value);
  const routeTemplate =
    routeTemplateOverride ??
    (typeof window !== "undefined"
      ? normalizeAnalyticsRouteTemplate(window.location.pathname)
      : "/");

  trackWebVital({
    metric_name: metric.name,
    metric_id: metric.id,
    value: Math.round(
      metric.name === "CLS" ? metric.value * 1000 : metric.value,
    ),
    metric_rating: rating,
    metric_delta: Math.round(metric.delta),
    route_template: routeTemplate,
    non_interaction: true,
  });

  // Log performance warnings for poor metrics
  if (rating === "poor") {
    logger.warn(`Performance Warning - ${metric.name} is poor`, {
      value: metric.value,
      threshold:
        PERFORMANCE_THRESHOLDS[
          metric.name as keyof typeof PERFORMANCE_THRESHOLDS
        ]?.poor,
      rating,
      id: metric.id,
      routeTemplate,
    });
  } else {
    logger.info(`Web Vital - ${metric.name}`, {
      value: metric.value,
      rating,
      id: metric.id,
      routeTemplate,
    });
  }
}

interface WebVitalsReporterProps {
  pathnameOverride?: string;
}

export function WebVitalsReporter({
  pathnameOverride,
}: WebVitalsReporterProps = {}) {
  useEffect(() => {
    if (
      typeof navigator !== "undefined" &&
      /Chrome-Lighthouse/i.test(navigator.userAgent)
    ) {
      return;
    }

    // Load web vitals in both development and production for monitoring
    const sendMetric = (metric: Metric) => {
      const routeTemplate = pathnameOverride
        ? normalizeAnalyticsRouteTemplate(pathnameOverride)
        : undefined;
      sendToAnalytics(metric, routeTemplate);
    };

    import("web-vitals").then(({ onCLS, onINP, onFCP, onLCP, onTTFB }) => {
      // Cumulative Layout Shift - visual stability
      onCLS(sendMetric);

      // Interaction to Next Paint - interactivity
      onINP(sendMetric);

      // First Contentful Paint - perceived load speed
      onFCP(sendMetric);

      // Largest Contentful Paint - loading performance
      onLCP(sendMetric);

      // Time to First Byte - server response time
      onTTFB(sendMetric);
    });
  }, [pathnameOverride]);

  return null;
}
