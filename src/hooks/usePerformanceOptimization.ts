// Performance optimization utilities
"use client";

import { useEffect, useRef, useState, useCallback } from "react";

// Intersection Observer hook with performance optimization
export function useIntersectionObserver(
  threshold = 0.1,
  rootMargin = "50px",
  triggerOnce = true,
) {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const [element, setElement] = useState<Element | null>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    if (!element) return;

    // Clean up existing observer
    if (observerRef.current) {
      observerRef.current.disconnect();
    }

    observerRef.current = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (!entry) return;
        if (entry.isIntersecting) {
          setIsIntersecting(true);
          if (triggerOnce) {
            observerRef.current?.disconnect();
          }
        } else if (!triggerOnce) {
          setIsIntersecting(false);
        }
      },
      {
        threshold,
        rootMargin,
      },
    );

    observerRef.current.observe(element);

    return () => {
      observerRef.current?.disconnect();
    };
  }, [element, threshold, rootMargin, triggerOnce]);

  return [setElement, isIntersecting] as const;
}

// Image preloader
export function useImagePreloader(sources: string[]) {
  const [loadedImages, setLoadedImages] = useState<Set<string>>(new Set());
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    const imagePromises = sources.map((src) => {
      return new Promise<string>((resolve, reject) => {
        const img = new Image();
        img.onload = () => resolve(src);
        img.onerror = () => reject(src);
        img.src = src;
      });
    });

    Promise.allSettled(imagePromises).then((results) => {
      if (!mounted) return;

      const loaded = new Set<string>();
      results.forEach((result, _index) => {
        if (result.status === "fulfilled") {
          const s = sources[index];
          if (s) loaded.add(s);
        }
      });

      setLoadedImages(loaded);
      setIsLoading(false);
    });

    return () => {
      mounted = false;
    };
  }, [sources]);

  return { loadedImages, isLoading };
}

// Debounced scroll handler
export function useDebounceScroll(callback: () => void, delay = 100) {
  const timeoutRef = useRef<NodeJS.Timeout | undefined>(undefined);

  const debouncedCallback = useCallback(() => {
    clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(callback, delay);
  }, [callback, delay]);

  useEffect(() => {
    window.addEventListener("scroll", debouncedCallback, { passive: true });
    return () => {
      window.removeEventListener("scroll", debouncedCallback);
      clearTimeout(timeoutRef.current);
    };
  }, [debouncedCallback]);
}

// Throttled resize handler
export function useThrottleResize(callback: () => void, delay = 250) {
  const lastRan = useRef(Date.now());

  const throttledCallback = useCallback(() => {
    if (Date.now() - lastRan.current >= delay) {
      callback();
      lastRan.current = Date.now();
    }
  }, [callback, delay]);

  useEffect(() => {
    window.addEventListener("resize", throttledCallback, { passive: true });
    return () => {
      window.removeEventListener("resize", throttledCallback);
    };
  }, [throttledCallback]);
}

// Prefetch handler for route optimization
export function usePrefetch() {
  const prefetchRoute = useCallback((href: string) => {
    const link = document.createElement("link");
    link.rel = "prefetch";
    link.href = href;
    document.head.appendChild(link);
  }, []);

  const prefetchImage = useCallback((src: string) => {
    const link = document.createElement("link");
    link.rel = "prefetch";
    link.as = "image";
    link.href = src;
    document.head.appendChild(link);
  }, []);

  return { prefetchRoute, prefetchImage };
}

// Memory usage monitoring
export function useMemoryMonitoring() {
  const [memoryInfo, setMemoryInfo] = useState<{
    used: number;
    total: number;
    percentage: number;
  } | null>(null);

  useEffect(() => {
    const updateMemoryInfo = () => {
      if ("memory" in performance) {
        const perfMemory = (
          performance as unknown as {
            memory?: { usedJSHeapSize: number; totalJSHeapSize: number };
          }
        ).memory;
        if (
          perfMemory &&
          typeof perfMemory.usedJSHeapSize === "number" &&
          typeof perfMemory.totalJSHeapSize === "number"
        ) {
          const used = perfMemory.usedJSHeapSize / (1024 * 1024); // MB
          const total = perfMemory.totalJSHeapSize / (1024 * 1024); // MB

          setMemoryInfo({
            used: Math.round(used),
            total: Math.round(total),
            percentage: Math.round((used / total) * 100),
          });
          return;
        }
      }
    };

    // Update immediately
    updateMemoryInfo();

    // Update every 5 seconds
    const interval = setInterval(updateMemoryInfo, 5000);

    return () => clearInterval(interval);
  }, []);

  return memoryInfo;
}

// Performance metrics collector
export function usePerformanceMetrics() {
  const [metrics, setMetrics] = useState<{
    fcp?: number; // First Contentful Paint
    lcp?: number; // Largest Contentful Paint
    fid?: number; // First Input Delay
    cls?: number; // Cumulative Layout Shift
  }>({});

  useEffect(() => {
    // Collect FCP and LCP
    const observer = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        if (entry.name === "first-contentful-paint") {
          setMetrics((prev) => ({ ...prev, fcp: entry.startTime }));
        }
        if (entry.entryType === "largest-contentful-paint") {
          setMetrics((prev) => ({ ...prev, lcp: entry.startTime }));
        }
      }
    });

    observer.observe({ entryTypes: ["paint", "largest-contentful-paint"] });

    // Collect CLS
    const clsObserver = new PerformanceObserver((list) => {
      let clsValue = 0;
      for (const entry of list.getEntries()) {
        const e = entry as unknown as {
          hadRecentInput?: boolean;
          value?: number;
        };
        if (!e.hadRecentInput && typeof e.value === "number") {
          clsValue += e.value;
        }
      }
      setMetrics((prev) => ({ ...prev, cls: clsValue }));
    });

    clsObserver.observe({ entryTypes: ["layout-shift"] });

    // Collect FID
    const fidObserver = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        const e = entry as unknown as {
          processingStart?: number;
          startTime: number;
        };
        if (
          typeof e.processingStart === "number" &&
          typeof e.startTime === "number"
        ) {
          const fidVal = e.processingStart - e.startTime;
          setMetrics((prev) => ({ ...prev, fid: fidVal }));
        }
      }
    });

    fidObserver.observe({ entryTypes: ["first-input"] });

    return () => {
      observer.disconnect();
      clsObserver.disconnect();
      fidObserver.disconnect();
    };
  }, []);

  return metrics;
}

// Critical resource preloader
export function useCriticalResourcePreloader() {
  useEffect(() => {
    // Preload critical fonts
    const fontPreloads = [
      "/fonts/inter-variable.woff2",
      // Add other critical fonts
    ];

    fontPreloads.forEach((href) => {
      const link = document.createElement("link");
      link.rel = "preload";
      link.as = "font";
      link.type = "font/woff2";
      link.crossOrigin = "anonymous";
      link.href = href;
      document.head.appendChild(link);
    });

    // Preload critical images
    const imagePreloads = [
      "/images/logo/mh-logo.png",
      "/images/hero-bg.jpg",
      // Add other critical images
    ];

    imagePreloads.forEach((href) => {
      const link = document.createElement("link");
      link.rel = "preload";
      link.as = "image";
      link.href = href;
      document.head.appendChild(link);
    });

    // Preload critical routes
    const routePreloads = [
      "/about",
      "/services",
      "/contact",
      // Add other critical routes
    ];

    routePreloads.forEach((href) => {
      const link = document.createElement("link");
      link.rel = "prefetch";
      link.href = href;
      document.head.appendChild(link);
    });
  }, []);
}

// Bundle size monitoring
export function useBundleAnalysis() {
  const [bundleInfo, setBundleInfo] = useState<{
    totalSize: number;
    chunkCount: number;
    largestChunk: string;
  } | null>(null);

  useEffect(() => {
    // This would typically be used in development
    if (process.env.NODE_ENV === "development") {
      const scripts = Array.from(document.querySelectorAll("script[src]"));
      const totalSize = scripts.reduce((acc, script) => {
        const src = (script as HTMLScriptElement).src;
        // This is a simplified approach - in practice, you'd use webpack-bundle-analyzer
        return acc + src.length;
      }, 0);

      setBundleInfo({
        totalSize,
        chunkCount: scripts.length,
        largestChunk: scripts[0]?.getAttribute("src") || "unknown",
      });
    }
  }, []);

  return bundleInfo;
}
