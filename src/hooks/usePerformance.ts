import { logger } from "@/lib/utils/logger";
/**
 * Performance Monitoring Hooks
 * Phase 5: Custom hooks for performance tracking
 */

import { useState, useEffect, useCallback } from "react";

// Mock implementations until the actual performance modules are ready
const performanceMonitor = {
  clear: () => undefined,
};

const getPerformanceSummary = () => ({
  metrics: {
    avgLCP: 2100,
    avgFID: 80,
    avgCLS: 0.05,
    avgAIResponseTime: 250,
  },
  requests: 150,
  errors: {
    errorRate: 2.1,
  },
});

const aiCache = {
  getStats: () => ({
    hits: 45,
    misses: 12,
    size: 57,
    aiCacheSize: 57,
    formCacheSize: 12,
  }),
  clear: () => undefined,
};

export interface PerformanceMetric {
  name: string;
  value: number;
  timestamp: number;
  type: "rendering" | "network" | "memory" | "interaction";
}

export interface BundleAnalysis {
  totalSize: number;
  chunks: Array<{ name: string; size: number }>;
  recommendations: string[];
  timestamp: number;
}

export interface PerformanceReport {
  summary: Record<string, number | string>;
  recommendations: string[];
  cacheStats: {
    hits: number;
    misses: number;
    size: number;
  };
}

export function usePerformanceMetrics(updateInterval = 5000) {
  const [metrics, setMetrics] = useState<PerformanceMetric[]>([]);
  const [report, setReport] = useState<PerformanceReport | null>(null);

  const updateMetrics = useCallback(() => {
    const summary = getPerformanceSummary();
    const cacheStats = aiCache.getStats();

    // Convert summary to metrics format
    const newMetrics: PerformanceMetric[] = [];
    const timestamp = Date.now();

    if (summary.metrics) {
      if (summary.metrics.avgLCP) {
        newMetrics.push({
          name: "largest_contentful_paint",
          value: summary.metrics.avgLCP,
          timestamp,
          type: "rendering",
        });
      }

      if (summary.metrics.avgFID) {
        newMetrics.push({
          name: "first_input_delay",
          value: summary.metrics.avgFID,
          timestamp,
          type: "interaction",
        });
      }

      if (summary.metrics.avgCLS) {
        newMetrics.push({
          name: "cumulative_layout_shift",
          value: summary.metrics.avgCLS,
          timestamp,
          type: "rendering",
        });
      }

      if (summary.metrics.avgAIResponseTime) {
        newMetrics.push({
          name: "ai_response_time",
          value: summary.metrics.avgAIResponseTime,
          timestamp,
          type: "network",
        });
      }
    }

    // Add performance navigation metrics if available
    if (
      typeof window !== "undefined" &&
      window.performance &&
      window.performance.timing
    ) {
      const timing = window.performance.timing;
      const navigationStart = timing.navigationStart;

      if (timing.loadEventEnd > 0) {
        newMetrics.push({
          name: "first_contentful_paint",
          value: timing.loadEventEnd - navigationStart,
          timestamp,
          type: "rendering",
        });
      }
    }

    setMetrics((prev) => [...prev, ...newMetrics].slice(-100)); // Keep last 100 metrics

    // Generate recommendations
    const recommendations: string[] = [];

    if (summary.metrics?.avgLCP > 2500) {
      recommendations.push(
        "Optimize images and implement lazy loading to improve LCP",
      );
    }

    if (summary.metrics?.avgFID > 100) {
      recommendations.push("Reduce JavaScript execution time to improve FID");
    }

    if (summary.metrics?.avgCLS > 0.1) {
      recommendations.push(
        "Set explicit dimensions for images and ads to reduce CLS",
      );
    }

    if (
      cacheStats &&
      cacheStats.hits + cacheStats.misses > 0 &&
      cacheStats.hits / (cacheStats.hits + cacheStats.misses) < 0.7
    ) {
      recommendations.push(
        "Improve cache hit rate by optimizing cache keys and TTL",
      );
    }

    setReport({
      summary: {
        total_requests: summary.requests || 0,
        avg_response_time: summary.metrics?.avgAIResponseTime || 0,
        error_rate: summary.errors?.errorRate || 0,
        cache_hit_rate:
          cacheStats && cacheStats.hits + cacheStats.misses > 0
            ? `${(
                (cacheStats.hits / (cacheStats.hits + cacheStats.misses)) *
                100
              ).toFixed(1)}%`
            : "0%",
      },
      recommendations,
      cacheStats,
    });
  }, []);

  useEffect(() => {
    updateMetrics();
    const interval = setInterval(updateMetrics, updateInterval);
    return () => clearInterval(interval);
  }, [updateMetrics, updateInterval]);

  const clearMetrics = useCallback(() => {
    setMetrics([]);
    setReport(null);
    performanceMonitor.clear();
    aiCache.clear();
  }, []);

  return { metrics, report, clearMetrics };
}

export function useBundleAnalysis() {
  const [analysis, setAnalysis] = useState<BundleAnalysis | null>(null);
  const [loading, setLoading] = useState(false);

  const analyzeBundles = useCallback(async () => {
    setLoading(true);

    try {
      // Simulate bundle analysis (in a real app, this would analyze webpack stats)
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const mockAnalysis: BundleAnalysis = {
        totalSize: 512 * 1024, // 512KB
        chunks: [
          { name: "main", size: 256 * 1024 },
          { name: "vendor", size: 128 * 1024 },
          { name: "commons", size: 64 * 1024 },
          { name: "runtime", size: 32 * 1024 },
          { name: "polyfills", size: 32 * 1024 },
        ],
        recommendations: [
          "Consider code splitting for large vendor libraries",
          "Implement dynamic imports for non-critical components",
          "Use tree shaking to eliminate dead code",
          "Compress assets with gzip or brotli",
        ],
        timestamp: Date.now(),
      };

      setAnalysis(mockAnalysis);
    } catch (error) {
      logger.error("Bundle analysis failed:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  const reanalyze = useCallback(() => {
    analyzeBundles();
  }, [analyzeBundles]);

  useEffect(() => {
    analyzeBundles();
  }, [analyzeBundles]);

  return { analysis, loading, reanalyze };
}

export function useWebVitals() {
  const [vitals, setVitals] = useState({
    fcp: 0,
    lcp: 0,
    fid: 0,
    cls: 0,
    ttfb: 0,
  });

  useEffect(() => {
    if (typeof window === "undefined") return;

    // Use Web Vitals library if available, otherwise use Performance API
    const updateVitals = () => {
      if (window.performance && window.performance.timing) {
        const timing = window.performance.timing;
        const navigationStart = timing.navigationStart;

        setVitals((prev) => ({
          ...prev,
          fcp: timing.loadEventEnd - navigationStart,
          ttfb: timing.responseStart - navigationStart,
        }));
      }
    };

    updateVitals();

    // Listen for performance entries
    if (window.PerformanceObserver) {
      const observer = new PerformanceObserver((list) => {
        const entries = list.getEntries();

        entries.forEach((entry) => {
          if (
            entry.entryType === "paint" &&
            entry.name === "first-contentful-paint"
          ) {
            setVitals((prev) => ({ ...prev, fcp: entry.startTime }));
          }

          if (entry.entryType === "largest-contentful-paint") {
            setVitals((prev) => ({ ...prev, lcp: entry.startTime }));
          }

          if (entry.entryType === "first-input") {
            // Narrow entry safely and compute fid if possible
            const firstInputEntry = entry as unknown as {
              processingStart?: number;
              startTime?: number;
            };
            if (
              typeof firstInputEntry.processingStart === "number" &&
              typeof firstInputEntry.startTime === "number"
            ) {
              const fidValue =
                firstInputEntry.processingStart - firstInputEntry.startTime;
              setVitals((prev) => ({ ...prev, fid: fidValue }));
            }
          }

          if (entry.entryType === "layout-shift") {
            // LayoutShift entries expose hadRecentInput and value in some browsers
            const layoutShiftEntry = entry as unknown as {
              hadRecentInput?: boolean;
              value?: number;
            };
            if (
              !layoutShiftEntry.hadRecentInput &&
              typeof layoutShiftEntry.value === "number"
            ) {
              const delta = layoutShiftEntry.value;
              setVitals((prev) => ({ ...prev, cls: prev.cls + delta }));
            }
          }
        });
      });

      try {
        observer.observe({
          entryTypes: [
            "paint",
            "largest-contentful-paint",
            "first-input",
            "layout-shift",
          ],
        });
      } catch (_e) {
        // Fallback for browsers that don't support all entry types
        try {
          observer.observe({ entryTypes: ["paint"] });
        } catch (_e) {
          logger.warn("Performance Observer not supported");
        }
      }
      return () => observer.disconnect();
    }
    return undefined;
  }, []);

  return vitals;
}
