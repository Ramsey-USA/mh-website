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
  trackFormSubmit as trackFormSubmitFn,
  trackFormField as trackFormFieldFn,
  trackCTA as trackCTAFn,
} from "./tracking";
import { analyticsEngine } from "./index";
import { trackJourneyMilestone, trackLandingPage } from "./marketing-tracking";

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
    if (!hasInitializedRef.current) {
      initializeSession();
      hasInitializedRef.current = true;
    }
  }, []);

  // Track page view on mount
  useEffect(() => {
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
      trackClickFn(elementId, {
        ...properties,
        page: pathname,
      });
    },
    [pathname],
  );
}

/**
 * Hook for tracking form interactions
 * Returns helper functions for form tracking
 *
 * @example
 * ```tsx
 * function ContactForm() {
 *   const { trackSubmit, trackField } = useFormTracking('contact-form');
 *
 *   return (
 *     <form onSubmit={(e) => {
 *       e.preventDefault();
 *       // ... submit logic
 *       trackSubmit({ source: 'footer' });
 *     }}>
 *       <input
 *         onFocus={() => trackField('email', 'focus')}
 *         onBlur={() => trackField('email', 'blur')}
 *       />
 *     </form>
 *   );
 * }
 * ```
 */
export function useFormTracking(formId: string) {
  const pathname = usePathname();

  const trackSubmit = useCallback(
    (properties?: Record<string, unknown>) => {
      trackFormSubmitFn(formId, {
        ...properties,
        page: pathname,
      });
    },
    [formId, pathname],
  );

  const trackField = useCallback(
    (
      fieldId: string,
      action: "focus" | "blur" | "change",
      properties?: Record<string, unknown>,
    ) => {
      trackFormFieldFn(`${formId}-${fieldId}`, action, {
        ...properties,
        formId,
        page: pathname,
      });
    },
    [formId, pathname],
  );

  const trackAbandonment = useCallback(() => {
    analyticsEngine.track("form_abandonment", {
      formId,
      page: pathname,
      timestamp: new Date().toISOString(),
    });
  }, [formId, pathname]);

  return {
    trackSubmit,
    trackField,
    trackAbandonment,
  };
}

/**
 * Hook for tracking CTA clicks
 * Specialized for conversion tracking
 *
 * @example
 * ```tsx
 * function HeroSection() {
 *   const trackCTA = useCTATracking();
 *
 *   return (
 *     <button onClick={() => trackCTA('hero-get-started', { variant: 'primary' })}>
 *       Get Started
 *     </button>
 *   );
 * }
 * ```
 */
export function useCTATracking() {
  const pathname = usePathname();

  return useCallback(
    (ctaId: string, properties?: Record<string, unknown>) => {
      trackCTAFn(ctaId, {
        ...properties,
        page: pathname,
      });
    },
    [pathname],
  );
}

/**
 * Hook for tracking element visibility
 * Tracks when an element becomes visible in viewport
 *
 * @example
 * ```tsx
 * function TestimonialCard() {
 *   const ref = useElementTracking('testimonial-viewed');
 *
 *   return <div ref={ref}>Testimonial content</div>;
 * }
 * ```
 */
export function useElementTracking(elementId: string) {
  const elementRef = useRef<HTMLElement>(null);
  const hasTrackedRef = useRef(false);
  const pathname = usePathname();

  useEffect(() => {
    const element = elementRef.current;
    if (!element || hasTrackedRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasTrackedRef.current) {
            hasTrackedRef.current = true;
            analyticsEngine.track("element_viewed", {
              element: elementId,
              page: pathname,
              timestamp: new Date().toISOString(),
            });
          }
        });
      },
      { threshold: 0.5 }, // Element is 50% visible
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [elementId, pathname]);

  return elementRef;
}
