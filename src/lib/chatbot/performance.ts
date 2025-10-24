/**
 * Chatbot Performance Optimization Utilities
 * Provides caching, memoization, and performance monitoring for the chatbot
 */

import React, {
  useMemo,
  useCallback,
  useRef,
  useEffect,
  useState,
} from "react";

// Message cache for storing responses
class MessageCache {
  private cache = new Map<string, string>();
  private readonly maxCacheSize = 100;
  private accessOrder: string[] = [];

  set(key: string, value: string): void {
    // Remove if already exists to update access order
    if (this.cache.has(key)) {
      this.accessOrder = this.accessOrder.filter((k) => k !== key);
    }

    // Add to cache and access order
    this.cache.set(key, value);
    this.accessOrder.push(key);

    // Enforce cache size limit (LRU eviction)
    if (this.cache.size > this.maxCacheSize) {
      const oldestKey = this.accessOrder.shift();
      if (oldestKey) {
        this.cache.delete(oldestKey);
      }
    }
  }

  get(key: string): string | undefined {
    const value = this.cache.get(key);
    if (value) {
      // Update access order
      this.accessOrder = this.accessOrder.filter((k) => k !== key);
      this.accessOrder.push(key);
    }
    return value;
  }

  has(key: string): boolean {
    return this.cache.has(key);
  }

  clear(): void {
    this.cache.clear();
    this.accessOrder = [];
  }

  size(): number {
    return this.cache.size;
  }
}

// Singleton cache instance
export const messageCache = new MessageCache();

// Performance monitoring hook
export function usePerformanceMonitor(componentName: string) {
  const renderCount = useRef(0);
  const lastRenderTime = useRef(Date.now());
  const performanceData = useRef({
    averageRenderTime: 0,
    maxRenderTime: 0,
    totalRenders: 0,
  });

  useEffect(() => {
    renderCount.current += 1;
    const currentTime = Date.now();
    const renderTime = currentTime - lastRenderTime.current;

    // Update performance metrics
    performanceData.current.totalRenders = renderCount.current;
    performanceData.current.maxRenderTime = Math.max(
      performanceData.current.maxRenderTime,
      renderTime
    );
    performanceData.current.averageRenderTime =
      (performanceData.current.averageRenderTime * (renderCount.current - 1) +
        renderTime) /
      renderCount.current;

    lastRenderTime.current = currentTime;

    // Log performance warnings for slow renders
    if (renderTime > 100) {
      console.warn(`Slow render detected in ${componentName}: ${renderTime}ms`);
    }
  });

  return {
    renderCount: renderCount.current,
    performanceData: performanceData.current,
  };
}

// Optimized debounce hook with cleanup
export function useOptimizedDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // Clear existing timeout
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    // Set new timeout
    timeoutRef.current = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    // Cleanup function
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [value, delay]);

  return debouncedValue;
}

// Memoized message formatter
export const useMessageFormatter = () => {
  return useMemo(
    () => ({
      formatBotMessage: (content: string) => {
        // Cache formatted messages
        const cacheKey = `format:${content}`;
        const cached = messageCache.get(cacheKey);

        if (cached) {
          return JSON.parse(cached);
        }

        // Format the message
        const formatted = content
          .split("\n")
          .map((line, index) => {
            if (line.startsWith("**") && line.endsWith("**")) {
              return {
                type: "header",
                content: line.replace(/\*\*/g, ""),
                key: `header-${index}`,
              };
            }
            if (line.startsWith("•")) {
              return {
                type: "list-item",
                content: line.substring(1).trim(),
                key: `list-${index}`,
              };
            }
            if (line.startsWith("###")) {
              return {
                type: "subheader",
                content: line.substring(3).trim(),
                key: `sub-${index}`,
              };
            }
            return {
              type: "text",
              content: line,
              key: `text-${index}`,
            };
          })
          .filter((item) => item.content.trim() !== "");

        // Cache the result
        messageCache.set(cacheKey, JSON.stringify(formatted));
        return formatted;
      },

      extractKeywords: (message: string) => {
        const cacheKey = `keywords:${message}`;
        const cached = messageCache.get(cacheKey);

        if (cached) {
          return JSON.parse(cached);
        }

        const keywords = message
          .toLowerCase()
          .replace(/[^\w\s]/g, "")
          .split(/\s+/)
          .filter((word) => word.length > 2)
          .slice(0, 10); // Limit keywords

        messageCache.set(cacheKey, JSON.stringify(keywords));
        return keywords;
      },
    }),
    []
  );
};
