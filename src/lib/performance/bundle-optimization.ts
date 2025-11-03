/**
 * Bundle Optimization Utilities
 * Provides dynamic imports and code splitting for better performance
 */

import { lazy } from "react";

// Dynamic import wrapper with error handling
export const dynamicImport = <T = any>(
  importFn: () => Promise<T>,
  fallback?: T
): Promise<T> => {
  return importFn().catch((error) => {
    console.error("Dynamic import failed:", error);
    if (fallback) {
      return fallback;
    }
    throw error;
  });
};

// Lazy load heavy components with loading states
export const createLazyComponent = <T extends React.ComponentType<any>>(
  importFn: () => Promise<{ default: T }>,
  displayName?: string
) => {
  const LazyComponent = lazy(importFn);
  if (displayName) {
    (LazyComponent as any).displayName = displayName;
  }
  return LazyComponent;
};

// AI Module dynamic imports
// Import AI modules dynamically to reduce bundle size
const loadMilitaryConstructionAI = () =>
  import("../ai").then((mod) => mod.militaryConstructionAI);

export const loadFormAssistantModule = () =>
  dynamicImport(() => import("../../components/forms/SmartFormAssistant"));

// Heavy UI components lazy loading - these require default exports
export const LazySmartFormAssistant = createLazyComponent(
  () => import("../../components/forms/SmartFormAssistant"),
  "LazySmartFormAssistant"
);

// Critical resource hints
export const preloadCriticalComponents = () => {
  // Preload AI modules for faster interaction
  if (typeof window !== "undefined") {
    // Use requestIdleCallback for non-critical preloading
    const preload = (callback: () => void) => {
      if ("requestIdleCallback" in window) {
        window.requestIdleCallback(callback);
      } else {
        setTimeout(callback, 100);
      }
    };

    preload(() => {
      loadMilitaryConstructionAI();
      loadFormAssistantModule();
    });
  }
};

// Bundle size monitoring
export const getBundleInfo = () => {
  if (typeof window !== "undefined" && "performance" in window) {
    const navigation = performance.getEntriesByType(
      "navigation"
    )[0] as PerformanceNavigationTiming;
    return {
      totalSize: navigation.transferSize || 0,
      loadTime: navigation.loadEventEnd - navigation.loadEventStart,
      domContentLoaded:
        navigation.domContentLoadedEventEnd -
        navigation.domContentLoadedEventStart,
      firstPaint:
        performance.getEntriesByName("first-paint")[0]?.startTime || 0,
      firstContentfulPaint:
        performance.getEntriesByName("first-contentful-paint")[0]?.startTime ||
        0,
    };
  }
  return null;
};

// Resource hint injection
export const injectResourceHints = () => {
  if (typeof document !== "undefined") {
    const head = document.head;

    // Preload critical assets
    const preloadLink = (href: string, as: string, type?: string) => {
      const link = document.createElement("link");
      link.rel = "preload";
      link.href = href;
      link.as = as;
      if (type) link.type = type;
      head.appendChild(link);
    };

    // Preload critical fonts and images
    preloadLink("/images/logo/mh-logo.png", "image");

    // DNS prefetch for external domains
    const dnsPrefetch = (href: string) => {
      const link = document.createElement("link");
      link.rel = "dns-prefetch";
      link.href = href;
      head.appendChild(link);
    };

    // Add any external domains used
    // dnsPrefetch('https://fonts.googleapis.com')
  }
};
