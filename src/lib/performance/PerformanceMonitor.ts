/**
 * Performance Monitoring System
 * Phase 5: Comprehensive performance tracking and Web Vitals monitoring
 */

export interface PerformanceMetrics {
  // Core Web Vitals
  lcp?: number; // Largest Contentful Paint
  fid?: number; // First Input Delay
  cls?: number; // Cumulative Layout Shift
  fcp?: number; // First Contentful Paint
  ttfb?: number; // Time to First Byte

  // Custom metrics
  aiResponseTime?: number;
  formCompletionRate?: number;
  errorRate?: number;
  bundleSize?: number;
  pageLoadTime?: number;

  // User engagement
  timeOnPage?: number;
  bounceRate?: number;
  conversionRate?: number;

  // System metrics
  memoryUsage?: number;
  navigationTiming?: PerformanceNavigationTiming;

  timestamp: number;
  page: string;
  userAgent: string;
}

export interface ErrorReport {
  message: string;
  stack?: string;
  url: string;
  line?: number;
  column?: number;
  timestamp: number;
  userAgent: string;
  userId?: string;
}

class PerformanceMonitor {
  private metrics: PerformanceMetrics[] = [];
  private errors: ErrorReport[] = [];
  private observers: PerformanceObserver[] = [];
  private isInitialized = false;

  constructor() {
    if (typeof window !== "undefined") {
      this.initialize();
    }
  }

  /**
   * Initialize performance monitoring
   */
  private initialize(): void {
    if (this.isInitialized) return;

    try {
      // Set up Web Vitals monitoring
      this.observeWebVitals();

      // Set up navigation timing
      this.observeNavigationTiming();

      // Set up error handling
      this.setupErrorTracking();

      // Set up periodic monitoring
      this.startPeriodicMonitoring();

      this.isInitialized = true;
      console.log("🔍 Performance monitoring initialized");
    } catch (error) {
      console.warn("Failed to initialize performance monitoring:", error);
    }
  }

  /**
   * Observe Core Web Vitals
   */
  private observeWebVitals(): void {
    // LCP - Largest Contentful Paint
    if ("PerformanceObserver" in window) {
      try {
        const lcpObserver = new PerformanceObserver((list) => {
          const entries = list.getEntries();
          const lastEntry = entries[entries.length - 1] as PerformanceEntry & {
            renderTime?: number;
            loadTime?: number;
          };

          this.recordMetric({
            lcp:
              lastEntry.renderTime || lastEntry.loadTime || lastEntry.startTime,
            page: window.location.pathname,
            timestamp: Date.now(),
            userAgent: navigator.userAgent,
          });
        });

        lcpObserver.observe({ entryTypes: ["largest-contentful-paint"] });
        this.observers.push(lcpObserver);
      } catch (error) {
        console.warn("LCP observer failed:", error);
      }

      // FID - First Input Delay
      try {
        const fidObserver = new PerformanceObserver((list) => {
          list.getEntries().forEach((entry: any) => {
            this.recordMetric({
              fid: entry.processingStart - entry.startTime,
              page: window.location.pathname,
              timestamp: Date.now(),
              userAgent: navigator.userAgent,
            });
          });
        });

        fidObserver.observe({ entryTypes: ["first-input"] });
        this.observers.push(fidObserver);
      } catch (error) {
        console.warn("FID observer failed:", error);
      }

      // CLS - Cumulative Layout Shift
      try {
        let clsValue = 0;
        const clsObserver = new PerformanceObserver((list) => {
          list.getEntries().forEach((entry: any) => {
            if (!entry.hadRecentInput) {
              clsValue += entry.value;
            }
          });

          this.recordMetric({
            cls: clsValue,
            page: window.location.pathname,
            timestamp: Date.now(),
            userAgent: navigator.userAgent,
          });
        });

        clsObserver.observe({ entryTypes: ["layout-shift"] });
        this.observers.push(clsObserver);
      } catch (error) {
        console.warn("CLS observer failed:", error);
      }
    }
  }

  /**
   * Observe navigation timing
   */
  private observeNavigationTiming(): void {
    if ("performance" in window && "timing" in performance) {
      const timing = performance.timing;
      const navigation = performance.getEntriesByType(
        "navigation",
      )[0] as PerformanceNavigationTiming;

      this.recordMetric({
        fcp: timing.responseStart - timing.fetchStart,
        ttfb: timing.responseStart - timing.requestStart,
        pageLoadTime: timing.loadEventEnd - timing.navigationStart,
        navigationTiming: navigation,
        page: window.location.pathname,
        timestamp: Date.now(),
        userAgent: navigator.userAgent,
      });
    }
  }

  /**
   * Set up error tracking
   */
  private setupErrorTracking(): void {
    // Global error handler
    window.addEventListener("error", (event) => {
      this.recordError({
        message: event.message,
        stack: event.error?.stack,
        url: event.filename || window.location.href,
        line: event.lineno,
        column: event.colno,
        timestamp: Date.now(),
        userAgent: navigator.userAgent,
      });
    });

    // Unhandled promise rejection
    window.addEventListener("unhandledrejection", (event) => {
      this.recordError({
        message: `Unhandled Promise Rejection: ${event.reason}`,
        stack: event.reason?.stack,
        url: window.location.href,
        timestamp: Date.now(),
        userAgent: navigator.userAgent,
      });
    });
  }

  /**
   * Start periodic monitoring
   */
  private startPeriodicMonitoring(): void {
    // Monitor memory usage every 30 seconds
    setInterval(() => {
      if ("memory" in performance) {
        this.recordMetric({
          memoryUsage: (performance as any).memory.usedJSHeapSize,
          page: window.location.pathname,
          timestamp: Date.now(),
          userAgent: navigator.userAgent,
        });
      }
    }, 30000);
  }

  /**
   * Record a performance metric
   */
  recordMetric(metric: Partial<PerformanceMetrics>): void {
    const fullMetric: PerformanceMetrics = {
      timestamp: Date.now(),
      page: window.location.pathname,
      userAgent: navigator.userAgent,
      ...metric,
    };

    this.metrics.push(fullMetric);

    // Keep only last 100 metrics to prevent memory issues
    if (this.metrics.length > 100) {
      this.metrics = this.metrics.slice(-100);
    }

    // Log to console in development
    if (process.env.NODE_ENV === "development") {
      console.log("📊 Performance metric:", fullMetric);
    }
  }

  /**
   * Record an error
   */
  recordError(error: ErrorReport): void {
    this.errors.push(error);

    // Keep only last 50 errors
    if (this.errors.length > 50) {
      this.errors = this.errors.slice(-50);
    }

    console.error("🚨 Error recorded:", error);
  }

  /**
   * Track AI response time
   */
  trackAIResponseTime(responseTime: number, type: string): void {
    this.recordMetric({
      aiResponseTime: responseTime,
      page: `${window.location.pathname}?ai=${type}`,
      timestamp: Date.now(),
      userAgent: navigator.userAgent,
    });
  }

  /**
   * Track form completion
   */
  trackFormCompletion(
    formId: string,
    completed: boolean,
    timeSpent: number,
  ): void {
    this.recordMetric({
      formCompletionRate: completed ? 1 : 0,
      timeOnPage: timeSpent,
      page: `${window.location.pathname}?form=${formId}`,
      timestamp: Date.now(),
      userAgent: navigator.userAgent,
    });
  }

  /**
   * Get performance summary
   */
  getSummary() {
    const recentMetrics = this.metrics.slice(-10);
    const recentErrors = this.errors.slice(-5);

    return {
      metrics: {
        count: this.metrics.length,
        avgLCP: this.average(
          recentMetrics
            .map((m) => m.lcp)
            .filter((v): v is number => typeof v === "number"),
        ),
        avgFID: this.average(
          recentMetrics
            .map((m) => m.fid)
            .filter((v): v is number => typeof v === "number"),
        ),
        avgCLS: this.average(
          recentMetrics
            .map((m) => m.cls)
            .filter((v): v is number => typeof v === "number"),
        ),
        avgAIResponseTime: this.average(
          recentMetrics
            .map((m) => m.aiResponseTime)
            .filter((v): v is number => typeof v === "number"),
        ),
        avgPageLoadTime: this.average(
          recentMetrics
            .map((m) => m.pageLoadTime)
            .filter((v): v is number => typeof v === "number"),
        ),
      },
      errors: {
        count: this.errors.length,
        recent: recentErrors,
        errorRate: (this.errors.length / this.metrics.length) * 100 || 0,
      },
      latest: recentMetrics[recentMetrics.length - 1],
    };
  }

  /**
   * Get all metrics for export
   */
  getAllMetrics(): PerformanceMetrics[] {
    return [...this.metrics];
  }

  /**
   * Get all errors for export
   */
  getAllErrors(): ErrorReport[] {
    return [...this.errors];
  }

  /**
   * Clear all data
   */
  clear(): void {
    this.metrics = [];
    this.errors = [];
  }

  /**
   * Cleanup observers
   */
  cleanup(): void {
    this.observers.forEach((observer) => {
      try {
        observer.disconnect();
      } catch (error) {
        console.warn("Failed to disconnect observer:", error);
      }
    });
    this.observers = [];
    this.isInitialized = false;
  }

  /**
   * Calculate average of array values
   */
  private average(values: number[]): number {
    if (values.length === 0) return 0;
    return values.reduce((a, b) => a + b, 0) / values.length;
  }
}

// Singleton instance
export const performanceMonitor = new PerformanceMonitor();

// Utility functions
export const trackAIResponse = (responseTime: number, type: string) => {
  performanceMonitor.trackAIResponseTime(responseTime, type);
};

export const trackFormCompletion = (
  formId: string,
  completed: boolean,
  timeSpent: number,
) => {
  performanceMonitor.trackFormCompletion(formId, completed, timeSpent);
};

export const getPerformanceSummary = () => {
  return performanceMonitor.getSummary();
};

export const recordCustomMetric = (metric: Partial<PerformanceMetrics>) => {
  performanceMonitor.recordMetric(metric);
};
