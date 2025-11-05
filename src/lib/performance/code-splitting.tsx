/**
 * Code Splitting and Dynamic Loading Utilities
 * Advanced code splitting with performance monitoring and optimization
 */

import React, { Suspense, lazy, ComponentType } from "react";
import { performanceManager } from "./performance-manager";
import { logger } from "@/lib/utils/logger";

// Types
export interface DynamicImportOptions {
  loading?: ComponentType;
  error?: ComponentType<{ error: Error; retry: () => void }>;
  timeout?: number;
  retries?: number;
  trackPerformance?: boolean;
  preload?: boolean;
}

export interface LazyComponentProps {
  fallback?: React.ReactNode;
  error?: React.ComponentType<{ error: Error; retry: () => void }>;
}

// Enhanced dynamic import with retry logic and performance tracking
export function createDynamicImport<T extends ComponentType<any>>(
  importFn: () => Promise<{ default: T }>,
  componentName: string,
  options: DynamicImportOptions = {},
) {
  const {
    loading: LoadingComponent,
    error: ErrorComponent,
    timeout = 10000,
    retries = 2,
    trackPerformance = true,
    preload = false,
  } = options;

  let importPromise: Promise<{ default: T }> | null = null;
  let retryCount = 0;

  const executeImport = async (): Promise<{ default: T }> => {
    if (importPromise) return importPromise;

    const startTime = trackPerformance ? performance.now() : 0;

    if (trackPerformance) {
      performanceManager.startTiming(`dynamic_import_${componentName}`);
    }

    importPromise = Promise.race([
      importFn(),
      new Promise<never>((_, reject) =>
        setTimeout(() => reject(new Error("Import timeout")), timeout),
      ),
    ]);

    try {
      const result = await importPromise;

      if (trackPerformance) {
        const duration = performance.now() - startTime;
        performanceManager.recordMetric({
          name: "dynamic_import_success",
          value: duration,
          timestamp: Date.now(),
          type: "network",
          metadata: {
            component: componentName,
            retryCount,
            size: JSON.stringify(result).length, // Approximate size
          },
        });
        performanceManager.endTiming(`dynamic_import_${componentName}`);
      }

      return result;
    } catch (error) {
      importPromise = null; // Reset for retry

      if (trackPerformance) {
        performanceManager.recordMetric({
          name: "dynamic_import_error",
          value: 1,
          timestamp: Date.now(),
          type: "network",
          metadata: {
            component: componentName,
            retryCount,
            error: error instanceof Error ? error.message : "Unknown error",
          },
        });
        performanceManager.endTiming(`dynamic_import_${componentName}`);
      }

      if (retryCount < retries) {
        retryCount++;
        logger.warn(
          `Import failed for ${componentName}, retrying... (${retryCount}/${retries})`,
        );
        await new Promise((resolve) => setTimeout(resolve, 1000 * retryCount)); // Exponential backoff
        return executeImport();
      }

      throw error;
    }
  };

  // Preload if requested
  if (preload && typeof window !== "undefined") {
    executeImport().catch(() => {
      // Silent fail for preload
    });
  }

  const LazyComponent = lazy(executeImport);

  const WrappedComponent = (props: React.ComponentProps<T>) => {
    return (
      <Suspense
        fallback={
          LoadingComponent ? (
            <LoadingComponent />
          ) : (
            <div className="flex items-center justify-center p-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            </div>
          )
        }
      >
        <ErrorBoundary
          fallback={ErrorComponent}
          onError={(error) => {
            if (trackPerformance) {
              performanceManager.recordMetric({
                name: "component_error",
                value: 1,
                timestamp: Date.now(),
                type: "rendering",
                metadata: {
                  component: componentName,
                  error: error.message,
                },
              });
            }
          }}
        >
          <LazyComponent {...props} />
        </ErrorBoundary>
      </Suspense>
    );
  };

  WrappedComponent.displayName = `Dynamic(${componentName})`;
  WrappedComponent.preload = executeImport;

  return WrappedComponent;
}

// Error Boundary Component
interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

interface ErrorBoundaryProps {
  children: React.ReactNode;
  fallback?: ComponentType<{ error: Error; retry: () => void }>;
  onError?: (error: Error) => void;
}

class ErrorBoundary extends React.Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    logger.error("Component error caught by boundary:", error, errorInfo);
    this.props.onError?.(error);
  }

  retry = () => {
    this.setState({ hasError: false, error: null });
  };

  render() {
    if (this.state.hasError && this.state.error) {
      if (this.props.fallback) {
        const FallbackComponent = this.props.fallback;
        return (
          <FallbackComponent error={this.state.error} retry={this.retry} />
        );
      }

      return (
        <div className="p-4 border border-red-200 rounded-lg bg-red-50">
          <h3 className="text-red-800 font-semibold mb-2">
            Something went wrong
          </h3>
          <p className="text-red-600 text-sm mb-3">
            {this.state.error.message}
          </p>
          <button
            onClick={this.retry}
            className="px-3 py-1 bg-red-600 text-white rounded text-sm hover:bg-red-700"
          >
            Try Again
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

// Route-based code splitting utilities
export const createRouteComponent = (
  importFn: () => Promise<{ default: ComponentType<any> }>,
  routeName: string,
) => {
  return createDynamicImport(importFn, `Route_${routeName}`, {
    trackPerformance: true,
    retries: 3,
    preload: false,
  });
};

// Feature-based code splitting
export const createFeatureComponent = (
  importFn: () => Promise<{ default: ComponentType<any> }>,
  featureName: string,
  critical = false,
) => {
  return createDynamicImport(importFn, `Feature_${featureName}`, {
    trackPerformance: true,
    retries: critical ? 3 : 1,
    preload: critical,
    timeout: critical ? 15000 : 10000,
  });
};

// Bundle splitting analyzer
export class BundleSplittingAnalyzer {
  private static instance: BundleSplittingAnalyzer;
  private loadedChunks = new Set<string>();
  private chunkLoadTimes = new Map<string, number>();

  static getInstance(): BundleSplittingAnalyzer {
    if (!BundleSplittingAnalyzer.instance) {
      BundleSplittingAnalyzer.instance = new BundleSplittingAnalyzer();
    }
    return BundleSplittingAnalyzer.instance;
  }

  recordChunkLoad(chunkName: string, loadTime: number): void {
    this.loadedChunks.add(chunkName);
    this.chunkLoadTimes.set(chunkName, loadTime);

    performanceManager.recordMetric({
      name: "chunk_load",
      value: loadTime,
      timestamp: Date.now(),
      type: "network",
      metadata: { chunk: chunkName },
    });
  }

  getLoadedChunks(): string[] {
    return Array.from(this.loadedChunks);
  }

  getChunkLoadTime(chunkName: string): number | undefined {
    return this.chunkLoadTimes.get(chunkName);
  }

  getAverageLoadTime(): number {
    const loadTimes = Array.from(this.chunkLoadTimes.values());
    return loadTimes.length > 0
      ? loadTimes.reduce((sum, time) => sum + time, 0) / loadTimes.length
      : 0;
  }

  generateReport(): {
    totalChunks: number;
    loadedChunks: number;
    averageLoadTime: number;
    slowestChunk: { name: string; time: number } | null;
    recommendations: string[];
  } {
    const loadTimes = Array.from(this.chunkLoadTimes.entries());
    const slowestChunk = loadTimes.reduce(
      (slowest, [name, time]) =>
        !slowest || time > slowest.time ? { name, time } : slowest,
      null as { name: string; time: number } | null,
    );

    const recommendations: string[] = [];

    if (this.getAverageLoadTime() > 2000) {
      recommendations.push(
        "Consider further code splitting to reduce chunk sizes",
      );
    }

    if (slowestChunk && slowestChunk.time > 5000) {
      recommendations.push(
        `Optimize ${slowestChunk.name} - it's taking too long to load`,
      );
    }

    if (this.loadedChunks.size > 20) {
      recommendations.push("Consider bundling some smaller chunks together");
    }

    return {
      totalChunks: this.loadedChunks.size,
      loadedChunks: this.loadedChunks.size,
      averageLoadTime: this.getAverageLoadTime(),
      slowestChunk,
      recommendations,
    };
  }
}

// Preloading utilities
export const preloadRoute = (routeImport: () => Promise<any>): void => {
  if (typeof window !== "undefined") {
    // Preload on idle or user interaction
    if ("requestIdleCallback" in window) {
      window.requestIdleCallback(() => {
        routeImport().catch(() => {
          // Silent fail for preload
        });
      });
    } else {
      setTimeout(() => {
        routeImport().catch(() => {
          // Silent fail for preload
        });
      }, 100);
    }
  }
};

export const preloadOnHover = (
  element: HTMLElement,
  importFn: () => Promise<any>,
): (() => void) => {
  let preloaded = false;

  const preload = () => {
    if (!preloaded) {
      preloaded = true;
      importFn().catch(() => {
        // Silent fail for preload
      });
    }
  };

  element.addEventListener("mouseenter", preload, { once: true });
  element.addEventListener("touchstart", preload, { once: true });
  element.addEventListener("focus", preload, { once: true });

  // Return cleanup function
  return () => {
    element.removeEventListener("mouseenter", preload);
    element.removeEventListener("touchstart", preload);
    element.removeEventListener("focus", preload);
  };
};

// Critical resource preloader
export const preloadCriticalResources = (
  resources: Array<{
    href: string;
    as: "script" | "style" | "font" | "image";
    type?: string;
    crossorigin?: "anonymous" | "use-credentials";
  }>,
): void => {
  if (typeof window === "undefined") return;

  resources.forEach(({ href, as, type, crossorigin }) => {
    const link = document.createElement("link");
    link.rel = "preload";
    link.href = href;
    link.as = as;

    if (type) link.type = type;
    if (crossorigin) link.crossOrigin = crossorigin;

    document.head.appendChild(link);
  });
};

// Export the analyzer instance
export const bundleAnalyzer = BundleSplittingAnalyzer.getInstance();
