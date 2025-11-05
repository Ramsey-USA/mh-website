/**
 * Performance Monitoring Hooks
 * React hooks for component-level performance monitoring
 */

import { useEffect, useRef, useCallback, useState, useMemo } from "react";
import type React from "react";
import { logger } from "@/lib/utils/logger";
import {
  performanceManager,
  queryOptimizer,
  type PerformanceMetric,
} from "./performance-manager";

// Hook for timing component lifecycle events
export function usePerformanceTiming(componentName: string) {
  const mountTimeRef = useRef<number | undefined>(undefined);

  useEffect(() => {
    // Track component mount time
    mountTimeRef.current = performance.now();
    performanceManager.startTiming(`${componentName}_mount`);

    return () => {
      // Track component unmount and total lifecycle
      if (mountTimeRef.current) {
        const lifecycleTime = performance.now() - mountTimeRef.current;
        performanceManager.recordMetric({
          name: `${componentName}_lifecycle`,
          value: lifecycleTime,
          timestamp: Date.now(),
          type: "timing",
          metadata: { component: componentName },
        });
      }
      performanceManager.endTiming(`${componentName}_mount`);
    };
  }, [componentName]);

  const trackInteraction = useCallback(
    (interactionName: string) => {
      performanceManager.startTiming(`${componentName}_${interactionName}`);

      return () => {
        performanceManager.endTiming(`${componentName}_${interactionName}`);
      };
    },
    [componentName]
  );

  return { trackInteraction };
}

// Hook for monitoring render performance
export function useRenderTiming(
  componentName: string,
  dependencies?: React.DependencyList
) {
  const renderCountRef = useRef(0);
  const lastRenderTimeRef = useRef<number | undefined>(undefined);

  useEffect(() => {
    const renderStart = performance.now();

    // Schedule measurement after render
    const timeoutId = setTimeout(() => {
      const renderTime = performance.now() - renderStart;
      renderCountRef.current++;
      lastRenderTimeRef.current = renderTime;

      performanceManager.recordMetric({
        name: `${componentName}_render`,
        value: renderTime,
        timestamp: Date.now(),
        type: "rendering",
        metadata: {
          component: componentName,
          renderCount: renderCountRef.current,
        },
      });
    }, 0);

    return () => clearTimeout(timeoutId);
  }, [componentName, dependencies]);

  return {
    renderCount: renderCountRef.current,
    lastRenderTime: lastRenderTimeRef.current,
  };
}

// Hook for optimized data fetching with caching
export function useOptimizedQuery<T>(
  key: string,
  queryFn: () => Promise<T>,
  options: {
    ttl?: number;
    enabled?: boolean;
    dependencies?: React.DependencyList;
  } = {}
) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const { ttl = 300000, enabled = true, dependencies = [] } = options;

  const executeQuery = useCallback(async () => {
    if (!enabled) return;

    setLoading(true);
    setError(null);

    try {
      const result = await queryOptimizer.cacheQuery(key, queryFn, ttl);
      setData(result);
    } catch (err) {
      setError(err instanceof Error ? err : new Error("Query failed"));
    } finally {
      setLoading(false);
    }
  }, [key, queryFn, ttl, enabled]);

  useEffect(() => {
    executeQuery();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [executeQuery, ...(dependencies || [])]);

  const refetch = useCallback(() => {
    queryOptimizer.clearCache();
    return executeQuery();
  }, [executeQuery]);

  return { data, loading, error, refetch };
}

// Hook for monitoring memory usage
export function useMemoryMonitoring(
  componentName: string,
  interval: number = 10000
) {
  const [memoryInfo, setMemoryInfo] = useState<{
    usedJSHeapSize?: number;
    totalJSHeapSize?: number;
    jsHeapSizeLimit?: number;
  }>({});

  useEffect(() => {
    const recordMemory = () => {
      performanceManager.recordMemoryUsage(componentName);

      if (typeof window !== "undefined" && "memory" in performance) {
        const memory = (performance as any).memory;
        setMemoryInfo({
          usedJSHeapSize: memory.usedJSHeapSize,
          totalJSHeapSize: memory.totalJSHeapSize,
          jsHeapSizeLimit: memory.jsHeapSizeLimit,
        });
      }
    };

    recordMemory();
    const intervalId = setInterval(recordMemory, interval);

    return () => clearInterval(intervalId);
  }, [componentName, interval]);

  return memoryInfo;
}

// Hook for lazy loading images with performance tracking
export function useLazyImage(
  src: string,
  options: {
    rootMargin?: string;
    threshold?: number;
    onLoad?: () => void;
    onError?: () => void;
  } = {}
) {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);
  const [inView, setInView] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);
  const startTimeRef = useRef<number | undefined>(undefined);

  const { rootMargin = "50px", threshold = 0.1, onLoad, onError } = options;

  useEffect(() => {
    const imgElement = imgRef.current;
    if (!imgElement) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          startTimeRef.current = performance.now();
          observer.disconnect();
        }
      },
      { rootMargin, threshold }
    );

    observer.observe(imgElement);
    return () => observer.disconnect();
  }, [rootMargin, threshold]);

  useEffect(() => {
    if (!inView) return;

    const imgElement = imgRef.current;
    if (!imgElement) return;

    const handleLoad = () => {
      if (startTimeRef.current) {
        const loadTime = performance.now() - startTimeRef.current;
        performanceManager.recordMetric({
          name: "image_load_time",
          value: loadTime,
          timestamp: Date.now(),
          type: "network",
          metadata: { src, lazy: true },
        });
      }
      setLoaded(true);
      onLoad?.();
    };

    const handleError = () => {
      setError(true);
      onError?.();
    };

    imgElement.addEventListener("load", handleLoad);
    imgElement.addEventListener("error", handleError);

    imgElement.src = src;

    return () => {
      imgElement.removeEventListener("load", handleLoad);
      imgElement.removeEventListener("error", handleError);
    };
  }, [inView, src, onLoad, onError]);

  return { imgRef, loaded, error, inView };
}

// Hook for performance metrics dashboard
export function usePerformanceMetrics(refreshInterval: number = 5000) {
  const [metrics, setMetrics] = useState<PerformanceMetric[]>([]);
  const [report, setReport] = useState<ReturnType<
    typeof performanceManager.getPerformanceReport
  > | null>(null);

  useEffect(() => {
    const updateMetrics = () => {
      const allMetrics = performanceManager.getMetrics();
      const currentReport = performanceManager.getPerformanceReport();

      setMetrics(allMetrics);
      setReport(currentReport);
    };

    updateMetrics();
    const intervalId = setInterval(updateMetrics, refreshInterval);

    return () => clearInterval(intervalId);
  }, [refreshInterval]);

  const clearMetrics = useCallback(() => {
    performanceManager.destroy();
    setMetrics([]);
    setReport(null);
  }, []);

  return { metrics, report, clearMetrics };
}

// Hook for code splitting and dynamic imports
export function useDynamicImport<T>(
  importFn: () => Promise<{ default: T }>,
  componentName: string
) {
  const [component, setComponent] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const startTime = performance.now();
    performanceManager.startTiming(`dynamic_import_${componentName}`);

    importFn()
      .then((module) => {
        const loadTime = performance.now() - startTime;
        performanceManager.recordMetric({
          name: "dynamic_import",
          value: loadTime,
          timestamp: Date.now(),
          type: "network",
          metadata: { component: componentName },
        });

        setComponent(module.default);
        performanceManager.endTiming(`dynamic_import_${componentName}`);
      })
      .catch((err) => {
        setError(
          err instanceof Error ? err : new Error("Dynamic import failed")
        );
        performanceManager.endTiming(`dynamic_import_${componentName}`);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [importFn, componentName]);

  return { component, loading, error };
}

// Hook for bundle size analysis
export function useBundleAnalysis() {
  const [analysis, setAnalysis] = useState<{
    totalSize: number;
    chunks: Array<{ name: string; size: number }>;
    recommendations: string[];
  } | null>(null);
  const [loading, setLoading] = useState(false);

  const analyze = useCallback(async () => {
    setLoading(true);
    try {
      const result = await performanceManager.analyzeBundleSize();
      setAnalysis(result);
    } catch (error) {
      logger.error("Bundle analysis failed:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    analyze();
  }, [analyze]);

  return { analysis, loading, reanalyze: analyze };
}
