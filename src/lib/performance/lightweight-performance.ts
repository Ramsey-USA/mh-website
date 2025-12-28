/**
 * Lightweight Performance Manager
 * Simplified version with essential features only for production use
 *
 * NOTE: Renamed to avoid conflicts with full PerformanceManager in performance-manager.ts
 * Use this lightweight version for basic performance tracking in production
 */

import { useState, useEffect, useCallback } from "react";

interface CoreMetric {
  name: string;
  value: number;
  timestamp: number;
}

// Note: Removed unused SimpleCache interface to keep the module minimal and lint-clean

class LightweightPerformanceManager {
  private metrics: CoreMetric[] = [];
  private cache: Map<string, { value: unknown; expires: number }> = new Map();
  private observers: PerformanceObserver[] = [];

  constructor() {
    this.initializeWebVitals();
  }

  // Essential metrics only
  recordMetric(name: string, value: number): void {
    this.metrics.push({
      name,
      value,
      timestamp: Date.now(),
    });

    // Keep only last 100 metrics
    if (this.metrics.length > 100) {
      this.metrics = this.metrics.slice(-100);
    }
  }

  // Simplified caching
  getCache<T>(key: string): T | null {
    const cached = this.cache.get(key);
    if (!cached || Date.now() > cached.expires) {
      this.cache.delete(key);
      return null;
    }
    return cached.value as T | null;
  }

  setCache<T>(key: string, value: T, ttlMs = 300000): void {
    this.cache.set(key, {
      value,
      expires: Date.now() + ttlMs,
    });
  }

  // Web Vitals monitoring (essential only)
  private initializeWebVitals(): void {
    if (typeof window === "undefined") return;

    // LCP
    const lcpObserver = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      const lastEntry = entries[entries.length - 1];
      if (lastEntry) {
        this.recordMetric("LCP", lastEntry.startTime);
      }
    });

    try {
      lcpObserver.observe({ entryTypes: ["largest-contentful-paint"] });
      this.observers.push(lcpObserver);
    } catch (_e) {
      // Silently fail if not supported
    }

    // FID
    const fidObserver = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      entries.forEach((entry) => {
        this.recordMetric("FID", entry.startTime);
      });
    });

    try {
      fidObserver.observe({ entryTypes: ["first-input"] });
      this.observers.push(fidObserver);
    } catch (_e) {
      // Silently fail if not supported
    }
  }

  // Get recent metrics summary
  getMetricsSummary(): Record<string, number> {
    const recent = this.metrics.filter((m) => Date.now() - m.timestamp < 60000);

    const summary: Record<string, number> = {};
    recent.forEach((metric) => {
      summary[metric.name] = metric.value;
    });

    return summary;
  }

  // Cleanup
  cleanup(): void {
    this.observers.forEach((observer) => observer.disconnect());
    this.cache.clear();
    this.metrics = [];
  }
}

// Singleton instance - renamed to avoid conflict with PerformanceManager
export const lightweightPerformanceManager =
  new LightweightPerformanceManager();

// Essential hooks only
export function usePerformanceTiming(componentName: string) {
  const startTime = performance.now();

  const trackInteraction = (action: string) => {
    const duration = performance.now() - startTime;
    lightweightPerformanceManager.recordMetric(
      `${componentName}_${action}`,
      duration,
    );
  };

  return { trackInteraction };
}

export function useOptimizedQuery<T>(
  key: string,
  queryFn: () => Promise<T>,
  ttl = 300000,
) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(false);

  // Memoize the queryFn to avoid unnecessary re-runs
  const memoizedQueryFn = useCallback(queryFn, [queryFn]);

  useEffect(() => {
    const cached = lightweightPerformanceManager.getCache<T>(key);
    if (cached) {
      setData(cached);
      return;
    }

    setLoading(true);
    memoizedQueryFn()
      .then((result) => {
        setData(result);
        lightweightPerformanceManager.setCache(key, result, ttl);
      })
      .finally(() => setLoading(false));
  }, [key, ttl, memoizedQueryFn]);

  return { data, loading };
}
