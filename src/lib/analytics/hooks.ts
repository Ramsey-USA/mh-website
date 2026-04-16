/**
 * Analytics Tracking Hooks
 *
 * React hooks for automatic page and interaction tracking.
 *
 * EASY SETUP FOR NEW PAGES:
 * Just add this one line at the top of your page component:
 *
 * @example
 * ```tsx
 * export default function MyNewPage() {
 *   usePageTracking('My New Page'); // That's it! Auto-tracks everything
 *
 *   return <div>Your page content</div>;
 * }
 * ```
 */

"use client";

import { useEffect, useRef, useCallback } from "react";
import { usePathname } from "next/navigation";
import {
  trackPageView,
  trackPageDuration,
  trackScrollDepth,
  initializeSession,
  trackClick as trackClickFn,
} from "./tracking";
import { trackJourneyMilestone, trackLandingPage } from "./marketing-tracking";

function isLighthouseRun(): boolean {
  if (typeof window === "undefined") {
    return false;
  }

  const userAgent = typeof navigator !== "undefined" ? navigator.userAgent : "";
  return Boolean(window.__LIGHTHOUSE__) || /Chrome-Lighthouse/i.test(userAgent);
}

/**
 * Main hook for page-level tracking
 * Add this to ANY page component for automatic tracking
 *
 * Automatically tracks:
 * - Page views
 * - Time spent on page
 * - Scroll depth
 * - Exit page
 *
 * @example
 * ```tsx
 * export default function ServicesPage() {
 *   usePageTracking('Services'); // Just add this!
 *
 *   return <div>Services content</div>;
 * }
 * ```
 */
export function usePageTracking(pageName?: string) {
  const pathname = usePathname();
  const startTimeRef = useRef<number>(Date.now());
  const maxScrollRef = useRef<number>(0);
  const hasInitializedRef = useRef<boolean>(false);

  // Initialize session on first load
  useEffect(() => {
    if (isLighthouseRun()) {
      return;
    }

    if (!hasInitializedRef.current) {
      initializeSession();
      hasInitializedRef.current = true;
    }
  }, []);

  // Track page view on mount
  useEffect(() => {
    if (isLighthouseRun()) {
      return;
    }

    const page = pathname || "/";
    trackPageView(page, {
      pageName: pageName || page,
      referrer: typeof document !== "undefined" ? document.referrer : "",
      timestamp: new Date().toISOString(),
    });

    // Track landing page on first visit
    if (typeof document !== "undefined") {
      trackLandingPage(page, document.referrer);
    }

    // Track journey milestones based on page
    if (page === "/" && !hasInitializedRef.current) {
      trackJourneyMilestone("entered_site");
    } else if (page === "/services") {
      trackJourneyMilestone("viewed_services");
    } else if (page === "/projects") {
      trackJourneyMilestone("viewed_projects");
    } else if (page === "/contact") {
      trackJourneyMilestone("viewed_contact");
    }

    startTimeRef.current = Date.now();
  }, [pathname, pageName]);

  // Track scroll depth
  useEffect(() => {
    if (isLighthouseRun()) {
      return;
    }

    const handleScroll = () => {
      if (typeof window === "undefined") return;

      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const scrollTop = window.scrollY;
      const scrollPercent = Math.round(
        ((scrollTop + windowHeight) / documentHeight) * 100,
      );

      if (scrollPercent > maxScrollRef.current) {
        maxScrollRef.current = scrollPercent;

        // Track at 25%, 50%, 75%, and 100% milestones
        if (
          scrollPercent === 25 ||
          scrollPercent === 50 ||
          scrollPercent === 75 ||
          scrollPercent === 100
        ) {
          trackScrollDepth(scrollPercent);
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Track time spent on page when leaving
  useEffect(() => {
    if (isLighthouseRun()) {
      return;
    }

    const handleBeforeUnload = () => {
      const duration = Math.floor((Date.now() - startTimeRef.current) / 1000);
      const page = pathname || "/";
      trackPageDuration(page, duration);
    };

    // Also track on visibility change (tab switching)
    const handleVisibilityChange = () => {
      if (document.hidden) {
        const duration = Math.floor((Date.now() - startTimeRef.current) / 1000);
        const page = pathname || "/";
        trackPageDuration(page, duration);
      } else {
        startTimeRef.current = Date.now(); // Reset timer when returning
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      // Track duration when component unmounts (navigation to another page)
      const duration = Math.floor((Date.now() - startTimeRef.current) / 1000);
      const page = pathname || "/";
      trackPageDuration(page, duration);

      window.removeEventListener("beforeunload", handleBeforeUnload);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [pathname]);
}

/**
 * Hook for tracking click events
 * Returns a function you can call on any click
 *
 * @example
 * ```tsx
 * function MyComponent() {
 *   const trackClick = useClickTracking();
 *
 *   return (
 *     <button onClick={() => trackClick('my-button', { section: 'hero' })}>
 *       Click me
 *     </button>
 *   );
 * }
 * ```
 */
export function useClickTracking() {
  const pathname = usePathname();

  return useCallback(
    (elementId: string, properties?: Record<string, unknown>) => {
      if (isLighthouseRun()) {
        return;
      }

      trackClickFn(elementId, {
        ...properties,
        page: pathname,
      });
    },
    [pathname],
  );
}
