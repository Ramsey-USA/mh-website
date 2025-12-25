"use client";

import { useEffect, useRef } from "react";

/**
 * Custom hook for scroll-triggered animations
 * Adds 'animate-in' class when element enters viewport
 * Respects prefers-reduced-motion user preference
 */
export function useScrollAnimation<T extends HTMLElement = HTMLDivElement>() {
  const ref = useRef<T>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    // Check if user prefers reduced motion
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (prefersReducedMotion) {
      // Skip animation, show element immediately
      element.classList.add("animate-in");
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry && entry.isIntersecting) {
          entry.target.classList.add("animate-in");
          // Optionally unobserve after animation triggers once
          observer.unobserve(entry.target);
        }
      },
      {
        threshold: 0.1,
        rootMargin: "0px 0px -100px 0px", // Trigger slightly before element is fully visible
      },
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, []);

  return ref;
}

/**
 * Staggered scroll animation hook
 * Used for lists or multiple elements that should animate in sequence
 */
export function useStaggeredScrollAnimation<
  T extends HTMLElement = HTMLDivElement,
>(delay = 0) {
  const ref = useRef<T>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (prefersReducedMotion) {
      element.classList.add("animate-in");
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry && entry.isIntersecting) {
          setTimeout(() => {
            entry.target.classList.add("animate-in");
          }, delay);
          observer.unobserve(entry.target);
        }
      },
      {
        threshold: 0.1,
        rootMargin: "0px 0px -100px 0px",
      },
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [delay]);

  return ref;
}
