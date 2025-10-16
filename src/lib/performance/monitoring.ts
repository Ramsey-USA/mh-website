// Performance monitoring system for MH Construction website
// Tracks Core Web Vitals, performance metrics, and provides actionable insights

"use client";

import { useEffect, useState } from "react";
import { onCLS, onINP, onFCP, onLCP, onTTFB, type Metric } from "web-vitals";

interface MemoryInfo {
  usedJSHeapSize: number;
  totalJSHeapSize: number;
  jsHeapSizeLimit: number;
}

interface PerformanceMetrics {
  // Core Web Vitals
  cls?: number; // Cumulative Layout Shift
  inp?: number; // Interaction to Next Paint (replaced FID)
  fcp?: number; // First Contentful Paint
  lcp?: number; // Largest Contentful Paint
  ttfb?: number; // Time to First Byte

  // Additional metrics
  navigationTiming?: PerformanceTiming;
  memoryUsage?: MemoryInfo;
  connectionType?: string;
  timestamp: number;
}

interface PerformanceReport {
  metrics: PerformanceMetrics;
  score: number;
  recommendations: string[];
  status: "excellent" | "good" | "needs-improvement" | "poor";
}

/**
 * Performance monitoring hook that tracks Core Web Vitals
 */
export function usePerformanceMonitoring() {
  const [metrics, setMetrics] = useState<PerformanceMetrics>({
    timestamp: Date.now(),
  });
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    // Track Core Web Vitals
    const handleMetric = (metric: Metric) => {
      setMetrics((prev) => ({
        ...prev,
        [metric.name]: metric.value,
        timestamp: Date.now(),
      }));
    };

    // Initialize Core Web Vitals tracking
    onCLS(handleMetric);
    onINP(handleMetric); // INP replaced FID in web-vitals v4+
    onFCP(handleMetric);
    onLCP(handleMetric);
    onTTFB(handleMetric);

    // Track additional performance metrics
    if (typeof window !== "undefined") {
      // Navigation timing
      if (window.performance && window.performance.timing) {
        setMetrics((prev) => ({
          ...prev,
          navigationTiming: window.performance.timing,
        }));
      }

      // Memory usage (if available)
      if ("memory" in performance) {
        setMetrics((prev) => ({
          ...prev,
          memoryUsage: (performance as any).memory,
        }));
      }

      // Connection type (if available)
      if ("connection" in navigator) {
        const connection = (navigator as any).connection;
        setMetrics((prev) => ({
          ...prev,
          connectionType: connection?.effectiveType || "unknown",
        }));
      }

      setIsReady(true);
    }
  }, []);

  return { metrics, isReady };
}

/**
 * Generate performance report with scoring and recommendations
 */
export function generatePerformanceReport(
  metrics: PerformanceMetrics,
): PerformanceReport {
  const recommendations: string[] = [];
  let score = 100;

  // Evaluate Core Web Vitals
  const vitalsScores = {
    cls: evaluateCLS(metrics.cls),
    inp: evaluateINP(metrics.inp),
    lcp: evaluateLCP(metrics.lcp),
    fcp: evaluateFCP(metrics.fcp),
    ttfb: evaluateTTFB(metrics.ttfb),
  };

  // Calculate overall score
  score =
    Object.values(vitalsScores).reduce(
      (sum, vitalScore) => sum + vitalScore.score,
      0,
    ) / 5;

  // Generate recommendations
  Object.entries(vitalsScores).forEach(([vital, result]) => {
    if (result.recommendations.length > 0) {
      recommendations.push(...result.recommendations);
    }
  });

  // Determine status
  let status: PerformanceReport["status"] = "excellent";
  if (score < 90) status = "good";
  if (score < 75) status = "needs-improvement";
  if (score < 50) status = "poor";

  return {
    metrics,
    score: Math.round(score),
    recommendations: Array.from(new Set(recommendations)), // Remove duplicates
    status,
  };
}

/**
 * Evaluate Cumulative Layout Shift (CLS)
 */
function evaluateCLS(cls?: number) {
  if (cls === undefined)
    return { score: 0, recommendations: ["CLS metric not available"] };

  if (cls <= 0.1) {
    return { score: 100, recommendations: [] };
  } else if (cls <= 0.25) {
    return {
      score: 75,
      recommendations: [
        "CLS could be improved - minimize layout shifts by setting dimensions for images and ads",
        "Use CSS aspect-ratio or explicit width/height for images",
      ],
    };
  } else {
    return {
      score: 25,
      recommendations: [
        "CLS needs significant improvement - avoid inserting content above existing content",
        "Preload fonts to prevent text layout shifts",
        "Reserve space for images and embedded content",
      ],
    };
  }
}

/**
 * Evaluate Interaction to Next Paint (INP)
 */
function evaluateINP(inp?: number) {
  if (inp === undefined)
    return { score: 0, recommendations: ["INP metric not available"] };

  if (inp <= 200) {
    return { score: 100, recommendations: [] };
  } else if (inp <= 500) {
    return {
      score: 70,
      recommendations: [
        "INP could be improved - optimize JavaScript execution time",
        "Consider code splitting to reduce main thread blocking",
        "Use web workers for heavy computations",
      ],
    };
  } else {
    return {
      score: 30,
      recommendations: [
        "INP needs significant improvement - reduce main thread blocking time",
        "Optimize event handlers and reduce JavaScript complexity",
        "Consider lazy loading non-critical JavaScript",
        "Use requestIdleCallback for non-urgent tasks",
      ],
    };
  }
}
/**
 * Evaluate Largest Contentful Paint (LCP)
 */
function evaluateLCP(lcp?: number) {
  if (lcp === undefined)
    return { score: 0, recommendations: ["LCP metric not available"] };

  if (lcp <= 2500) {
    return { score: 100, recommendations: [] };
  } else if (lcp <= 4000) {
    return {
      score: 75,
      recommendations: [
        "LCP could be improved - optimize largest image or text block",
        "Use priority loading for above-the-fold images",
        "Optimize server response time",
      ],
    };
  } else {
    return {
      score: 25,
      recommendations: [
        "LCP needs significant improvement - optimize critical resource loading",
        "Compress and optimize images",
        "Implement lazy loading for below-the-fold content",
        "Use a CDN for faster asset delivery",
      ],
    };
  }
}

/**
 * Evaluate First Contentful Paint (FCP)
 */
function evaluateFCP(fcp?: number) {
  if (fcp === undefined)
    return { score: 0, recommendations: ["FCP metric not available"] };

  if (fcp <= 1800) {
    return { score: 100, recommendations: [] };
  } else if (fcp <= 3000) {
    return {
      score: 75,
      recommendations: [
        "FCP could be improved - optimize critical rendering path",
        "Inline critical CSS and defer non-critical CSS",
      ],
    };
  } else {
    return {
      score: 25,
      recommendations: [
        "FCP needs significant improvement - optimize initial page load",
        "Reduce server response time",
        "Minimize render-blocking resources",
      ],
    };
  }
}

/**
 * Evaluate Time to First Byte (TTFB)
 */
function evaluateTTFB(ttfb?: number) {
  if (ttfb === undefined)
    return { score: 0, recommendations: ["TTFB metric not available"] };

  if (ttfb <= 800) {
    return { score: 100, recommendations: [] };
  } else if (ttfb <= 1800) {
    return {
      score: 75,
      recommendations: [
        "TTFB could be improved - optimize server response time",
        "Use a CDN for better geographic distribution",
      ],
    };
  } else {
    return {
      score: 25,
      recommendations: [
        "TTFB needs significant improvement - optimize server performance",
        "Implement server-side caching",
        "Upgrade hosting infrastructure if needed",
      ],
    };
  }
}

/**
 * Format performance metrics for display
 */
export function formatMetrics(metrics: PerformanceMetrics) {
  return {
    cls: metrics.cls ? (metrics.cls * 1000).toFixed(1) : "N/A",
    inp: metrics.inp ? `${metrics.inp.toFixed(0)}ms` : "N/A",
    lcp: metrics.lcp ? `${(metrics.lcp / 1000).toFixed(2)}s` : "N/A",
    fcp: metrics.fcp ? `${(metrics.fcp / 1000).toFixed(2)}s` : "N/A",
    ttfb: metrics.ttfb ? `${metrics.ttfb.toFixed(0)}ms` : "N/A",
  };
}

const performanceMonitoring = {
  usePerformanceMonitoring,
  generatePerformanceReport,
  formatMetrics,
};

export default performanceMonitoring;
