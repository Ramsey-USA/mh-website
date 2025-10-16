/**
 * Performance Manager
 * Phase 5: Centralized performance management and configuration
 */

export interface PerformanceConfig {
  thresholds: {
    firstContentfulPaint: number;
    largestContentfulPaint: number;
    firstInputDelay: number;
    cumulativeLayoutShift: number;
    timeToInteractive: number;
  };
  sampling: {
    rate: number;
    maxSamples: number;
  };
  monitoring: {
    enableWebVitals: boolean;
    enableResourceTiming: boolean;
    enableNavigationTiming: boolean;
    enableCustomMetrics: boolean;
  };
}

export class PerformanceManager {
  private config: PerformanceConfig;
  private observers: PerformanceObserver[] = [];
  private metrics: Map<string, number[]> = new Map();
  private isInitialized = false;

  constructor(config?: Partial<PerformanceConfig>) {
    this.config = {
      thresholds: {
        firstContentfulPaint: 1800,
        largestContentfulPaint: 2500,
        firstInputDelay: 100,
        cumulativeLayoutShift: 0.1,
        timeToInteractive: 3800,
        ...config?.thresholds,
      },
      sampling: {
        rate: 1.0,
        maxSamples: 100,
        ...config?.sampling,
      },
      monitoring: {
        enableWebVitals: true,
        enableResourceTiming: true,
        enableNavigationTiming: true,
        enableCustomMetrics: true,
        ...config?.monitoring,
      },
    };
  }

  public initialize(): void {
    if (this.isInitialized || typeof window === "undefined") return;

    this.isInitialized = true;

    if (this.config.monitoring.enableWebVitals) {
      this.setupWebVitalsMonitoring();
    }

    if (this.config.monitoring.enableResourceTiming) {
      this.setupResourceTimingMonitoring();
    }

    if (this.config.monitoring.enableNavigationTiming) {
      this.setupNavigationTimingMonitoring();
    }
  }

  private setupWebVitalsMonitoring(): void {
    if (!window.PerformanceObserver) return;

    // Monitor LCP
    try {
      const lcpObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        const lastEntry = entries[entries.length - 1];
        this.recordMetric("largest_contentful_paint", lastEntry.startTime);
      });
      lcpObserver.observe({ entryTypes: ["largest-contentful-paint"] });
      this.observers.push(lcpObserver);
    } catch (e) {
      console.warn("LCP monitoring not supported");
    }

    // Monitor FID
    try {
      const fidObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        entries.forEach((entry: any) => {
          const fid = entry.processingStart - entry.startTime;
          this.recordMetric("first_input_delay", fid);
        });
      });
      fidObserver.observe({ entryTypes: ["first-input"] });
      this.observers.push(fidObserver);
    } catch (e) {
      console.warn("FID monitoring not supported");
    }

    // Monitor CLS
    try {
      let clsValue = 0;
      const clsObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        entries.forEach((entry: any) => {
          if (!entry.hadRecentInput) {
            clsValue += entry.value;
            this.recordMetric("cumulative_layout_shift", clsValue);
          }
        });
      });
      clsObserver.observe({ entryTypes: ["layout-shift"] });
      this.observers.push(clsObserver);
    } catch (e) {
      console.warn("CLS monitoring not supported");
    }

    // Monitor FCP
    try {
      const fcpObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        entries.forEach((entry) => {
          if (entry.name === "first-contentful-paint") {
            this.recordMetric("first_contentful_paint", entry.startTime);
          }
        });
      });
      fcpObserver.observe({ entryTypes: ["paint"] });
      this.observers.push(fcpObserver);
    } catch (e) {
      console.warn("FCP monitoring not supported");
    }
  }

  private setupResourceTimingMonitoring(): void {
    if (!window.PerformanceObserver) return;

    try {
      const resourceObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        entries.forEach((entry: any) => {
          if (entry.entryType === "resource") {
            this.recordMetric(
              `resource_${entry.initiatorType}`,
              entry.duration,
            );
          }
        });
      });
      resourceObserver.observe({ entryTypes: ["resource"] });
      this.observers.push(resourceObserver);
    } catch (e) {
      console.warn("Resource timing monitoring not supported");
    }
  }

  private setupNavigationTimingMonitoring(): void {
    if (typeof window === "undefined" || !window.performance) return;

    // Use Navigation Timing API
    window.addEventListener("load", () => {
      setTimeout(() => {
        const timing = window.performance.timing;
        const navigationStart = timing.navigationStart;

        this.recordMetric(
          "dns_lookup",
          timing.domainLookupEnd - timing.domainLookupStart,
        );
        this.recordMetric(
          "tcp_connect",
          timing.connectEnd - timing.connectStart,
        );
        this.recordMetric(
          "request_response",
          timing.responseEnd - timing.requestStart,
        );
        this.recordMetric("dom_parse", timing.domComplete - timing.domLoading);
        this.recordMetric(
          "load_complete",
          timing.loadEventEnd - navigationStart,
        );
      }, 0);
    });
  }

  public recordMetric(name: string, value: number): void {
    if (!this.shouldSample()) return;

    if (!this.metrics.has(name)) {
      this.metrics.set(name, []);
    }

    const values = this.metrics.get(name)!;
    values.push(value);

    // Keep only the most recent samples
    if (values.length > this.config.sampling.maxSamples) {
      values.shift();
    }
  }

  public getMetric(name: string): number[] {
    return this.metrics.get(name) || [];
  }

  public getAverageMetric(name: string): number {
    const values = this.getMetric(name);
    if (values.length === 0) return 0;
    return values.reduce((sum, value) => sum + value, 0) / values.length;
  }

  public getLatestMetric(name: string): number {
    const values = this.getMetric(name);
    return values.length > 0 ? values[values.length - 1] : 0;
  }

  public getAllMetrics(): Record<string, number[]> {
    const result: Record<string, number[]> = {};
    this.metrics.forEach((values, name) => {
      result[name] = [...values];
    });
    return result;
  }

  public getPerformanceScore(): number {
    const weights = {
      first_contentful_paint: 0.2,
      largest_contentful_paint: 0.3,
      first_input_delay: 0.2,
      cumulative_layout_shift: 0.2,
      load_complete: 0.1,
    };

    let totalScore = 0;
    let totalWeight = 0;

    Object.entries(weights).forEach(([metric, weight]) => {
      const value = this.getAverageMetric(metric);
      if (value > 0) {
        const threshold = this.getThreshold(
          metric as keyof PerformanceConfig["thresholds"],
        );
        const score = Math.max(
          0,
          Math.min(100, (1 - value / (threshold * 2)) * 100),
        );
        totalScore += score * weight;
        totalWeight += weight;
      }
    });

    return totalWeight > 0 ? Math.round(totalScore / totalWeight) : 0;
  }

  public getRecommendations(): string[] {
    const recommendations: string[] = [];

    const lcp = this.getAverageMetric("largest_contentful_paint");
    if (lcp > this.config.thresholds.largestContentfulPaint) {
      recommendations.push(
        "Optimize images and implement lazy loading to improve LCP",
      );
    }

    const fid = this.getAverageMetric("first_input_delay");
    if (fid > this.config.thresholds.firstInputDelay) {
      recommendations.push("Reduce JavaScript execution time to improve FID");
    }

    const cls = this.getAverageMetric("cumulative_layout_shift");
    if (cls > this.config.thresholds.cumulativeLayoutShift) {
      recommendations.push(
        "Set explicit dimensions for images and ads to reduce CLS",
      );
    }

    const fcp = this.getAverageMetric("first_contentful_paint");
    if (fcp > this.config.thresholds.firstContentfulPaint) {
      recommendations.push("Optimize critical rendering path to improve FCP");
    }

    return recommendations;
  }

  private getThreshold(metric: keyof PerformanceConfig["thresholds"]): number {
    return this.config.thresholds[metric];
  }

  private shouldSample(): boolean {
    return Math.random() < this.config.sampling.rate;
  }

  public clear(): void {
    this.metrics.clear();
  }

  public destroy(): void {
    this.observers.forEach((observer) => observer.disconnect());
    this.observers = [];
    this.metrics.clear();
    this.isInitialized = false;
  }

  public getConfig(): PerformanceConfig {
    return { ...this.config };
  }
}

// Global instance
export const performanceManager = new PerformanceManager();

// Auto-initialize when available
if (typeof window !== "undefined") {
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", () => {
      performanceManager.initialize();
    });
  } else {
    performanceManager.initialize();
  }
}
