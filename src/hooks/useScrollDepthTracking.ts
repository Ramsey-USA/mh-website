"use client";

import { useEffect, useRef } from "react";
import { useAnalytics } from "@/components/analytics/enhanced-analytics";

/**
 * Custom hook for tracking scroll depth on pages using Intersection Observer
 * Tracks 25%, 50%, 75%, and 100% scroll milestones with better performance
 * Uses sessionStorage to ensure each milestone is only tracked once per session
 *
 * Performance improvement: Uses Intersection Observer instead of scroll events
 * for better performance and no throttling needed
 *
 * @param pageName - Name of the page for analytics tracking
 * @param thresholds - Array of scroll depth percentages to track (default: [25, 50, 75, 100])
 *
 * @example
 * ```tsx
 * function MyPage() {
 *   useScrollDepthTracking('homepage');
 *   return <div>Content...</div>;
 * }
 * ```
 */
export function useScrollDepthTracking(
  pageName: string,
  thresholds: number[] = [25, 50, 75, 100],
) {
  const { trackEvent } = useAnalytics();
  const observersRef = useRef<IntersectionObserver[]>([]);
  const markersRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    // Clean up any existing markers and observers
    markersRef.current.forEach((marker) => marker.remove());
    observersRef.current.forEach((observer) => observer.disconnect());
    markersRef.current = [];
    observersRef.current = [];

    // Create invisible marker divs at each threshold position
    thresholds.forEach((threshold) => {
      const storageKey = `scroll_${threshold}_${pageName}`;

      // Skip if already tracked in this session
      if (sessionStorage.getItem(storageKey)) return;

      const marker = document.createElement("div");
      marker.style.position = "absolute";
      marker.style.top = `${threshold}%`;
      marker.style.height = "1px";
      marker.style.width = "100%";
      marker.style.pointerEvents = "none";
      marker.style.visibility = "hidden";
      marker.setAttribute("data-scroll-marker", threshold.toString());

      document.body.appendChild(marker);
      markersRef.current.push(marker);

      // Create Intersection Observer for this marker
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              sessionStorage.setItem(storageKey, "true");
              trackEvent("scroll_depth", {
                percent: threshold,
                page: pageName,
              });
              // Disconnect after tracking to prevent duplicate events
              observer.disconnect();
            }
          });
        },
        {
          threshold: 0,
          rootMargin: "0px",
        },
      );

      observer.observe(marker);
      observersRef.current.push(observer);
    });

    // Cleanup function
    return () => {
      markersRef.current.forEach((marker) => marker.remove());
      observersRef.current.forEach((observer) => observer.disconnect());
      markersRef.current = [];
      observersRef.current = [];
    };
  }, [pageName, thresholds, trackEvent]);
}
