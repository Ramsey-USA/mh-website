/**
 * Performance Optimization System
 * Advanced performance monitoring, caching, and optimization utilities
 */

// Use browser's Performance API - no imports needed as it's globally available

export interface PerformanceMetric {
  name: string;
  value: number;
  timestamp: number;
  type: "timing" | "memory" | "network" | "rendering" | "interaction";
  metadata?: Record<string, any>;
}

export interface CacheEntry<T = any> {
  data: T;
  timestamp: number;
  ttl: number;
  version: string;
  metadata?: Record<string, any>;
}

export interface PerformanceConfig {
  enableMetrics: boolean;
  enableCaching: boolean;
  cacheSize: number;
  metricsBufferSize: number;
  reportingInterval: number;
  thresholds: {
    pageLoad: number;
    firstContentfulPaint: number;
    largestContentfulPaint: number;
    cumulativeLayoutShift: number;
    firstInputDelay: number;
  };
}

class PerformanceManager {
  private static instance: PerformanceManager;
  private metrics: PerformanceMetric[] = [];
  private cache = new Map<string, CacheEntry>();
  private config: PerformanceConfig;
  private observers: Map<string, PerformanceObserver> = new Map();
  private timers = new Map<string, number>();

  constructor(config: Partial<PerformanceConfig> = {}) {
    this.config = {
      enableMetrics: true,
      enableCaching: true,
      cacheSize: 1000,
      metricsBufferSize: 10000,
      reportingInterval: 30000,
      thresholds: {
        pageLoad: 3000,
        firstContentfulPaint: 1800,
        largestContentfulPaint: 2500,
        cumulativeLayoutShift: 0.1,
        firstInputDelay: 100,
      },
      ...config,
    };

    if (typeof window !== "undefined") {
      this.initializeWebVitals();
      this.initializePerformanceObservers();
    }
  }

  static getInstance(config?: Partial<PerformanceConfig>): PerformanceManager {
    if (!PerformanceManager.instance) {
      PerformanceManager.instance = new PerformanceManager(config);
    }
    return PerformanceManager.instance;
  }

  // Performance Timing
  startTiming(name: string): void {
    this.timers.set(name, performance.now());
  }

  endTiming(name: string, metadata?: Record<string, any>): number {
    const startTime = this.timers.get(name);
    if (!startTime) {
      console.warn(`No start time found for timer: ${name}`);
      return 0;
    }

    const duration = performance.now() - startTime;
    this.timers.delete(name);

    this.recordMetric({
      name,
      value: duration,
      timestamp: Date.now(),
      type: "timing",
      metadata,
    });

    return duration;
  }

  // Memory Monitoring
  recordMemoryUsage(context: string = "general"): void {
    if (typeof window !== "undefined" && "memory" in performance) {
      const memory = (performance as any).memory;
      this.recordMetric({
        name: `memory_${context}`,
        value: memory.usedJSHeapSize,
        timestamp: Date.now(),
        type: "memory",
        metadata: {
          totalJSHeapSize: memory.totalJSHeapSize,
          jsHeapSizeLimit: memory.jsHeapSizeLimit,
        },
      });
    }
  }

  // Advanced Caching
  setCache<T>(
    key: string,
    data: T,
    ttl: number = 300000,
    version: string = "1.0",
  ): void {
    if (!this.config.enableCaching) return;

    // Implement LRU eviction if cache is full
    if (this.cache.size >= this.config.cacheSize) {
      const oldestKey = this.cache.keys().next().value;
      if (oldestKey) {
        this.cache.delete(oldestKey);
      }
    }

    this.cache.set(key, {
      data,
      timestamp: Date.now(),
      ttl,
      version,
    });
  }

  getCache<T>(key: string, version: string = "1.0"): T | null {
    if (!this.config.enableCaching) return null;

    const entry = this.cache.get(key);
    if (!entry) return null;

    // Check if cache is expired or version mismatch
    if (Date.now() - entry.timestamp > entry.ttl || entry.version !== version) {
      this.cache.delete(key);
      return null;
    }

    // Record cache hit
    this.recordMetric({
      name: "cache_hit",
      value: 1,
      timestamp: Date.now(),
      type: "network",
      metadata: { key, version },
    });

    return entry.data as T;
  }

  // Bundle Analysis
  async analyzeBundleSize(): Promise<{
    totalSize: number;
    chunks: Array<{ name: string; size: number }>;
    recommendations: string[];
  }> {
    const chunks: Array<{ name: string; size: number }> = [];
    let totalSize = 0;
    const recommendations: string[] = [];

    // In a real implementation, this would analyze webpack bundle stats
    // For now, we'll simulate with performance entries
    if (typeof window !== "undefined") {
      const navigationEntries = performance.getEntriesByType("navigation");
      const resourceEntries = performance.getEntriesByType("resource");

      resourceEntries.forEach((entry) => {
        if (entry.name.includes(".js") || entry.name.includes(".css")) {
          const size = (entry as any).transferSize || 0;
          chunks.push({
            name: entry.name.split("/").pop() || "unknown",
            size,
          });
          totalSize += size;
        }
      });

      // Generate recommendations
      if (totalSize > 1024 * 1024) {
        // > 1MB
        recommendations.push("Consider code splitting for large bundles");
      }

      const largeChunks = chunks.filter((chunk) => chunk.size > 500 * 1024);
      if (largeChunks.length > 0) {
        recommendations.push(
          "Large chunks detected - implement dynamic imports",
        );
      }
    }

    return { totalSize, chunks, recommendations };
  }

  // Image Optimization Analysis
  analyzeImagePerformance(): {
    unoptimizedImages: Array<{
      src: string;
      size: number;
      recommendations: string[];
    }>;
    totalImageSize: number;
    recommendations: string[];
  } {
    const unoptimizedImages: Array<{
      src: string;
      size: number;
      recommendations: string[];
    }> = [];
    let totalImageSize = 0;
    const globalRecommendations: string[] = [];

    if (typeof window !== "undefined") {
      const images = document.querySelectorAll("img");

      images.forEach((img) => {
        const recommendations: string[] = [];

        // Check for missing alt text
        if (!img.alt) {
          recommendations.push("Add alt text for accessibility");
        }

        // Check for missing loading attribute
        if (!img.loading) {
          recommendations.push('Add loading="lazy" for off-screen images');
        }

        // Check for missing width/height
        if (!img.width || !img.height) {
          recommendations.push(
            "Add explicit width/height to prevent layout shift",
          );
        }

        // Estimate size (in a real app, this would use the actual file size)
        const estimatedSize = img.naturalWidth * img.naturalHeight * 3; // RGB estimate
        totalImageSize += estimatedSize;

        if (recommendations.length > 0) {
          unoptimizedImages.push({
            src: img.src,
            size: estimatedSize,
            recommendations,
          });
        }
      });

      // Global recommendations
      if (totalImageSize > 5 * 1024 * 1024) {
        // > 5MB
        globalRecommendations.push(
          "Consider using Next.js Image component for automatic optimization",
        );
      }

      if (unoptimizedImages.length > 0) {
        globalRecommendations.push("Implement responsive images with srcset");
      }
    }

    return {
      unoptimizedImages,
      totalImageSize,
      recommendations: globalRecommendations,
    };
  }

  // Web Vitals Monitoring
  private initializeWebVitals(): void {
    if (typeof window === "undefined") return;

    // Monitor Core Web Vitals using the current web-vitals API
    import("web-vitals")
      .then(({ onCLS, onFCP, onLCP, onTTFB, onINP }) => {
        onCLS((metric: any) => {
          this.recordMetric({
            name: "cumulative_layout_shift",
            value: metric.value,
            timestamp: Date.now(),
            type: "rendering",
            metadata: { id: metric.id },
          });
        });

        // Use onINP (Interaction to Next Paint) instead of FID
        onINP((metric: any) => {
          this.recordMetric({
            name: "interaction_to_next_paint",
            value: metric.value,
            timestamp: Date.now(),
            type: "interaction",
            metadata: { id: metric.id },
          });
        });

        onFCP((metric: any) => {
          this.recordMetric({
            name: "first_contentful_paint",
            value: metric.value,
            timestamp: Date.now(),
            type: "rendering",
            metadata: { id: metric.id },
          });
        });

        onLCP((metric: any) => {
          this.recordMetric({
            name: "largest_contentful_paint",
            value: metric.value,
            timestamp: Date.now(),
            type: "rendering",
            metadata: { id: metric.id },
          });
        });

        onTTFB((metric: any) => {
          this.recordMetric({
            name: "time_to_first_byte",
            value: metric.value,
            timestamp: Date.now(),
            type: "network",
            metadata: { id: metric.id },
          });
        });
      })
      .catch(() => {
        console.warn("Web Vitals library not available");
      });
  }

  private initializePerformanceObservers(): void {
    if (typeof window === "undefined" || !window.PerformanceObserver) return;

    // Long Task Observer
    try {
      const longTaskObserver = new PerformanceObserver((list) => {
        list.getEntries().forEach((entry) => {
          this.recordMetric({
            name: "long_task",
            value: entry.duration,
            timestamp: Date.now(),
            type: "rendering",
            metadata: { startTime: entry.startTime },
          });
        });
      });
      longTaskObserver.observe({ entryTypes: ["longtask"] });
      this.observers.set("longtask", longTaskObserver);
    } catch (e) {
      console.warn("Long Task Observer not supported");
    }

    // Layout Shift Observer
    try {
      const layoutShiftObserver = new PerformanceObserver((list) => {
        list.getEntries().forEach((entry) => {
          if ((entry as any).hadRecentInput) return; // Ignore shifts after user input

          this.recordMetric({
            name: "layout_shift",
            value: (entry as any).value,
            timestamp: Date.now(),
            type: "rendering",
            metadata: { startTime: entry.startTime },
          });
        });
      });
      layoutShiftObserver.observe({ entryTypes: ["layout-shift"] });
      this.observers.set("layout-shift", layoutShiftObserver);
    } catch (e) {
      console.warn("Layout Shift Observer not supported");
    }
  }

  // Metrics Recording and Retrieval
  recordMetric(metric: PerformanceMetric): void {
    if (!this.config.enableMetrics) return;

    this.metrics.push(metric);

    // Keep buffer size manageable
    if (this.metrics.length > this.config.metricsBufferSize) {
      this.metrics = this.metrics.slice(-this.config.metricsBufferSize / 2);
    }

    // Check thresholds and alert if necessary
    this.checkThresholds(metric);
  }

  private checkThresholds(metric: PerformanceMetric): void {
    const thresholds = this.config.thresholds;
    let exceeded = false;
    let threshold = 0;

    switch (metric.name) {
      case "first_contentful_paint":
        threshold = thresholds.firstContentfulPaint;
        exceeded = metric.value > threshold;
        break;
      case "largest_contentful_paint":
        threshold = thresholds.largestContentfulPaint;
        exceeded = metric.value > threshold;
        break;
      case "cumulative_layout_shift":
        threshold = thresholds.cumulativeLayoutShift;
        exceeded = metric.value > threshold;
        break;
      case "first_input_delay":
        threshold = thresholds.firstInputDelay;
        exceeded = metric.value > threshold;
        break;
    }

    if (exceeded) {
      console.warn(
        `Performance threshold exceeded: ${metric.name} (${metric.value}) > ${threshold}`,
      );
    }
  }

  // Analytics and Reporting
  getMetrics(
    type?: PerformanceMetric["type"],
    limit?: number,
  ): PerformanceMetric[] {
    let filtered = this.metrics;

    if (type) {
      filtered = filtered.filter((m) => m.type === type);
    }

    if (limit) {
      filtered = filtered.slice(-limit);
    }

    return filtered;
  }

  getPerformanceReport(): {
    summary: Record<string, number>;
    metrics: PerformanceMetric[];
    recommendations: string[];
    cacheStats: { hits: number; misses: number; size: number };
  } {
    const summary: Record<string, number> = {};
    const recommendations: string[] = [];

    // Calculate averages for key metrics
    const metricTypes = [
      "timing",
      "memory",
      "network",
      "rendering",
      "interaction",
    ];
    metricTypes.forEach((type) => {
      const typeMetrics = this.metrics.filter((m) => m.type === type);
      if (typeMetrics.length > 0) {
        summary[`avg_${type}`] =
          typeMetrics.reduce((sum, m) => sum + m.value, 0) / typeMetrics.length;
      }
    });

    // Generate recommendations based on metrics
    if (summary.avg_rendering > 100) {
      recommendations.push("Consider optimizing rendering performance");
    }
    if (summary.avg_memory > 50 * 1024 * 1024) {
      // > 50MB
      recommendations.push(
        "High memory usage detected - check for memory leaks",
      );
    }

    // Cache statistics
    const cacheHits = this.metrics.filter((m) => m.name === "cache_hit").length;
    const cacheMisses = this.metrics.filter(
      (m) => m.name === "cache_miss",
    ).length;

    return {
      summary,
      metrics: this.metrics,
      recommendations,
      cacheStats: {
        hits: cacheHits,
        misses: cacheMisses,
        size: this.cache.size,
      },
    };
  }

  // Cleanup
  destroy(): void {
    this.observers.forEach((observer) => observer.disconnect());
    this.observers.clear();
    this.metrics = [];
    this.cache.clear();
    this.timers.clear();
  }
}

// Database Query Optimization
export class QueryOptimizer {
  private queryCache = new Map<
    string,
    { result: any; timestamp: number; ttl: number }
  >();
  private queryStats = new Map<
    string,
    { count: number; totalTime: number; avgTime: number }
  >();

  cacheQuery<T>(
    key: string,
    queryFn: () => Promise<T>,
    ttl: number = 300000,
  ): Promise<T> {
    const cached = this.queryCache.get(key);

    if (cached && Date.now() - cached.timestamp < cached.ttl) {
      return Promise.resolve(cached.result);
    }

    const startTime = performance.now();

    return queryFn().then((result) => {
      const duration = performance.now() - startTime;

      // Update statistics
      const stats = this.queryStats.get(key) || {
        count: 0,
        totalTime: 0,
        avgTime: 0,
      };
      stats.count++;
      stats.totalTime += duration;
      stats.avgTime = stats.totalTime / stats.count;
      this.queryStats.set(key, stats);

      // Cache result
      this.queryCache.set(key, { result, timestamp: Date.now(), ttl });

      return result;
    });
  }

  getQueryStats(): Array<{ query: string; count: number; avgTime: number }> {
    return Array.from(this.queryStats.entries()).map(([query, stats]) => ({
      query,
      count: stats.count,
      avgTime: stats.avgTime,
    }));
  }

  clearCache(): void {
    this.queryCache.clear();
  }
}

// Image Optimization Utilities
export class ImageOptimizer {
  static generateSrcSet(
    baseUrl: string,
    widths: number[] = [320, 640, 768, 1024, 1280, 1536],
  ): string {
    return widths.map((width) => `${baseUrl}?w=${width} ${width}w`).join(", ");
  }

  static generateSizes(
    breakpoints: Array<{ minWidth?: number; maxWidth?: number; vw: number }> = [
      { maxWidth: 768, vw: 100 },
      { minWidth: 769, vw: 50 },
    ],
  ): string {
    return breakpoints
      .map(({ minWidth, maxWidth, vw }) => {
        if (minWidth && maxWidth) {
          return `(min-width: ${minWidth}px) and (max-width: ${maxWidth}px) ${vw}vw`;
        } else if (minWidth) {
          return `(min-width: ${minWidth}px) ${vw}vw`;
        } else if (maxWidth) {
          return `(max-width: ${maxWidth}px) ${vw}vw`;
        }
        return `${vw}vw`;
      })
      .join(", ");
  }

  static preloadCriticalImages(imageSrcs: string[]): void {
    if (typeof window === "undefined") return;

    imageSrcs.forEach((src) => {
      const link = document.createElement("link");
      link.rel = "preload";
      link.as = "image";
      link.href = src;
      document.head.appendChild(link);
    });
  }
}

// Export singleton instance
export const performanceManager = PerformanceManager.getInstance();
export const queryOptimizer = new QueryOptimizer();
