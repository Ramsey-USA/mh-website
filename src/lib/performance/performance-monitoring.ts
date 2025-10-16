/**
 * Performance Monitoring System
 * Tracks Web Vitals, AI response times, and user experience metrics
 */

// Web Vitals interfaces
export interface WebVitalsMetric {
  name: "CLS" | "FID" | "FCP" | "LCP" | "TTFB";
  value: number;
  rating: "good" | "needs-improvement" | "poor";
  delta: number;
  id: string;
  timestamp: number;
}

export interface AIPerformanceMetric {
  operation: "estimator" | "chatbot" | "form-assistant" | "lead-qualification";
  startTime: number;
  endTime: number;
  duration: number;
  success: boolean;
  cacheHit: boolean;
  error?: string;
  inputSize?: number;
  outputSize?: number;
}

export interface UserExperienceMetric {
  event:
    | "form-start"
    | "form-complete"
    | "form-abandon"
    | "chat-open"
    | "chat-close"
    | "page-view";
  timestamp: number;
  duration?: number;
  page: string;
  formId?: string;
  completionRate?: number;
  metadata?: Record<string, any>;
}

export interface PerformanceReport {
  webVitals: WebVitalsMetric[];
  aiMetrics: AIPerformanceMetric[];
  userExperience: UserExperienceMetric[];
  bundleInfo: {
    totalSize: number;
    loadTime: number;
    resourceCount: number;
  };
  errors: ErrorMetric[];
  timestamp: number;
}

export interface ErrorMetric {
  type: "javascript" | "network" | "ai" | "form-validation";
  message: string;
  stack?: string;
  timestamp: number;
  page: string;
  userAgent: string;
  severity: "low" | "medium" | "high" | "critical";
}

/**
 * Performance Monitor Class
 */
export class PerformanceMonitor {
  private webVitalsBuffer: WebVitalsMetric[] = [];
  private aiMetricsBuffer: AIPerformanceMetric[] = [];
  private userExperienceBuffer: UserExperienceMetric[] = [];
  private errorBuffer: ErrorMetric[] = [];
  private isInitialized = false;

  constructor() {
    this.initialize();
  }

  /**
   * Initialize performance monitoring
   */
  private initialize(): void {
    if (typeof window === "undefined" || this.isInitialized) {
      return;
    }

    this.initializeWebVitals();
    this.initializeErrorTracking();
    this.initializeNavigationTracking();
    this.isInitialized = true;
  }

  /**
   * Initialize Web Vitals tracking
   */
  private initializeWebVitals(): void {
    // Import and use web-vitals library if available
    if (typeof window !== "undefined" && "PerformanceObserver" in window) {
      this.observeLCP();
      this.observeFID();
      this.observeCLS();
      this.observeFCP();
      this.observeTTFB();
    }
  }

  /**
   * Observe Largest Contentful Paint
   */
  private observeLCP(): void {
    try {
      const observer = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        const lastEntry = entries[entries.length - 1] as any;

        if (lastEntry) {
          this.recordWebVital({
            name: "LCP",
            value: lastEntry.startTime,
            rating: this.rateLCP(lastEntry.startTime),
            delta: lastEntry.startTime,
            id: this.generateId(),
            timestamp: Date.now(),
          });
        }
      });

      observer.observe({ entryTypes: ["largest-contentful-paint"] });
    } catch (error) {
      console.warn("LCP observation failed:", error);
    }
  }

  /**
   * Observe First Input Delay
   */
  private observeFID(): void {
    try {
      const observer = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        entries.forEach((entry: any) => {
          this.recordWebVital({
            name: "FID",
            value: entry.processingStart - entry.startTime,
            rating: this.rateFID(entry.processingStart - entry.startTime),
            delta: entry.processingStart - entry.startTime,
            id: this.generateId(),
            timestamp: Date.now(),
          });
        });
      });

      observer.observe({ entryTypes: ["first-input"] });
    } catch (error) {
      console.warn("FID observation failed:", error);
    }
  }

  /**
   * Observe Cumulative Layout Shift
   */
  private observeCLS(): void {
    try {
      let clsValue = 0;
      const observer = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        entries.forEach((entry: any) => {
          if (!entry.hadRecentInput) {
            clsValue += entry.value;
          }
        });

        this.recordWebVital({
          name: "CLS",
          value: clsValue,
          rating: this.rateCLS(clsValue),
          delta: clsValue,
          id: this.generateId(),
          timestamp: Date.now(),
        });
      });

      observer.observe({ entryTypes: ["layout-shift"] });
    } catch (error) {
      console.warn("CLS observation failed:", error);
    }
  }

  /**
   * Observe First Contentful Paint
   */
  private observeFCP(): void {
    try {
      const observer = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        entries.forEach((entry: any) => {
          this.recordWebVital({
            name: "FCP",
            value: entry.startTime,
            rating: this.rateFCP(entry.startTime),
            delta: entry.startTime,
            id: this.generateId(),
            timestamp: Date.now(),
          });
        });
      });

      observer.observe({ entryTypes: ["paint"] });
    } catch (error) {
      console.warn("FCP observation failed:", error);
    }
  }

  /**
   * Observe Time to First Byte
   */
  private observeTTFB(): void {
    try {
      const observer = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        entries.forEach((entry: any) => {
          if (entry.entryType === "navigation") {
            const ttfb = entry.responseStart - entry.requestStart;
            this.recordWebVital({
              name: "TTFB",
              value: ttfb,
              rating: this.rateTTFB(ttfb),
              delta: ttfb,
              id: this.generateId(),
              timestamp: Date.now(),
            });
          }
        });
      });

      observer.observe({ entryTypes: ["navigation"] });
    } catch (error) {
      console.warn("TTFB observation failed:", error);
    }
  }

  /**
   * Initialize error tracking
   */
  private initializeErrorTracking(): void {
    if (typeof window === "undefined") return;

    // JavaScript errors
    window.addEventListener("error", (event) => {
      this.recordError({
        type: "javascript",
        message: event.message,
        stack: event.error?.stack,
        timestamp: Date.now(),
        page: window.location.pathname,
        userAgent: navigator.userAgent,
        severity: "high",
      });
    });

    // Unhandled promise rejections
    window.addEventListener("unhandledrejection", (event) => {
      this.recordError({
        type: "javascript",
        message: event.reason?.toString() || "Unhandled promise rejection",
        timestamp: Date.now(),
        page: window.location.pathname,
        userAgent: navigator.userAgent,
        severity: "medium",
      });
    });
  }

  /**
   * Initialize navigation tracking
   */
  private initializeNavigationTracking(): void {
    if (typeof window === "undefined") return;

    // Track page views
    this.recordUserExperience({
      event: "page-view",
      timestamp: Date.now(),
      page: window.location.pathname,
    });

    // Track page unload for duration calculation
    window.addEventListener("beforeunload", () => {
      this.flushMetrics();
    });
  }

  /**
   * Record Web Vital metric
   */
  public recordWebVital(metric: WebVitalsMetric): void {
    this.webVitalsBuffer.push(metric);
    this.checkBufferSize();
  }

  /**
   * Record AI performance metric
   */
  public recordAIMetric(metric: AIPerformanceMetric): void {
    this.aiMetricsBuffer.push(metric);
    this.checkBufferSize();
  }

  /**
   * Record user experience metric
   */
  public recordUserExperience(metric: UserExperienceMetric): void {
    this.userExperienceBuffer.push(metric);
    this.checkBufferSize();
  }

  /**
   * Record error metric
   */
  public recordError(metric: ErrorMetric): void {
    this.errorBuffer.push(metric);
    this.checkBufferSize();
  }

  /**
   * Create AI performance tracker
   */
  public createAITracker(operation: AIPerformanceMetric["operation"]) {
    const startTime = performance.now();

    return {
      finish: (
        success: boolean,
        cacheHit: boolean = false,
        error?: string,
        inputSize?: number,
        outputSize?: number,
      ) => {
        const endTime = performance.now();
        this.recordAIMetric({
          operation,
          startTime,
          endTime,
          duration: endTime - startTime,
          success,
          cacheHit,
          error,
          inputSize,
          outputSize,
        });
      },
    };
  }

  /**
   * Get performance report
   */
  public getReport(): PerformanceReport {
    return {
      webVitals: [...this.webVitalsBuffer],
      aiMetrics: [...this.aiMetricsBuffer],
      userExperience: [...this.userExperienceBuffer],
      bundleInfo: this.getBundleInfo(),
      errors: [...this.errorBuffer],
      timestamp: Date.now(),
    };
  }

  /**
   * Flush metrics to storage or analytics
   */
  public flushMetrics(): void {
    const report = this.getReport();

    try {
      // Save to localStorage for debugging
      localStorage.setItem("performance_report", JSON.stringify(report));

      // In production, send to analytics service
      this.sendToAnalytics(report);

      // Clear buffers
      this.clearBuffers();
    } catch (error) {
      console.warn("Failed to flush performance metrics:", error);
    }
  }

  /**
   * Clear all metric buffers
   */
  private clearBuffers(): void {
    this.webVitalsBuffer = [];
    this.aiMetricsBuffer = [];
    this.userExperienceBuffer = [];
    this.errorBuffer = [];
  }

  /**
   * Check buffer size and flush if needed
   */
  private checkBufferSize(): void {
    const totalMetrics =
      this.webVitalsBuffer.length +
      this.aiMetricsBuffer.length +
      this.userExperienceBuffer.length +
      this.errorBuffer.length;

    if (totalMetrics >= 50) {
      this.flushMetrics();
    }
  }

  /**
   * Send metrics to analytics service
   */
  private sendToAnalytics(report: PerformanceReport): void {
    // In production, implement actual analytics integration
    console.log("Performance Report:", report);
  }

  /**
   * Get bundle information
   */
  private getBundleInfo() {
    if (typeof window === "undefined" || !("performance" in window)) {
      return { totalSize: 0, loadTime: 0, resourceCount: 0 };
    }

    const navigation = performance.getEntriesByType(
      "navigation",
    )[0] as PerformanceNavigationTiming;
    const resources = performance.getEntriesByType("resource");

    return {
      totalSize: resources.reduce(
        (sum, resource: any) => sum + (resource.transferSize || 0),
        0,
      ),
      loadTime: navigation.loadEventEnd - navigation.loadEventStart,
      resourceCount: resources.length,
    };
  }

  /**
   * Web Vitals rating functions
   */
  private rateLCP(value: number): "good" | "needs-improvement" | "poor" {
    if (value <= 2500) return "good";
    if (value <= 4000) return "needs-improvement";
    return "poor";
  }

  private rateFID(value: number): "good" | "needs-improvement" | "poor" {
    if (value <= 100) return "good";
    if (value <= 300) return "needs-improvement";
    return "poor";
  }

  private rateCLS(value: number): "good" | "needs-improvement" | "poor" {
    if (value <= 0.1) return "good";
    if (value <= 0.25) return "needs-improvement";
    return "poor";
  }

  private rateFCP(value: number): "good" | "needs-improvement" | "poor" {
    if (value <= 1800) return "good";
    if (value <= 3000) return "needs-improvement";
    return "poor";
  }

  private rateTTFB(value: number): "good" | "needs-improvement" | "poor" {
    if (value <= 800) return "good";
    if (value <= 1800) return "needs-improvement";
    return "poor";
  }

  /**
   * Generate unique ID
   */
  private generateId(): string {
    return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  }
}

// Global performance monitor instance
export const performanceMonitor = new PerformanceMonitor();

// React hooks for performance monitoring
export const usePerformanceMonitor = () => {
  const trackAI = (operation: AIPerformanceMetric["operation"]) => {
    return performanceMonitor.createAITracker(operation);
  };

  const trackUserExperience = (metric: UserExperienceMetric) => {
    performanceMonitor.recordUserExperience(metric);
  };

  const trackError = (
    error: Omit<ErrorMetric, "timestamp" | "page" | "userAgent">,
  ) => {
    performanceMonitor.recordError({
      ...error,
      timestamp: Date.now(),
      page: typeof window !== "undefined" ? window.location.pathname : "",
      userAgent: typeof navigator !== "undefined" ? navigator.userAgent : "",
    });
  };

  const getReport = () => {
    return performanceMonitor.getReport();
  };

  return {
    trackAI,
    trackUserExperience,
    trackError,
    getReport,
  };
};
