"use client";

import { useState, useEffect } from "react";

/**
 * Tailwind CSS breakpoints defined in tailwind.config.ts
 */
export const breakpoints = {
  "mobile-sm": 374, // Very small phones
  xs: 475, // Small phones
  sm: 640, // Large phones / small tablets
  md: 768, // Tablets
  lg: 1024, // Small laptops
  xl: 1280, // Large laptops
  "2xl": 1536, // Desktops
  "3xl": 1600, // Large desktops
} as const;

export type Breakpoint = keyof typeof breakpoints;

/**
 * Returns true when the viewport width is at or below the given breakpoint.
 * Uses matchMedia so the listener fires only at the threshold, not on every
 * pixel of resize.
 */
export function useBreakpoint(breakpoint: Breakpoint): boolean {
  const [isBelow, setIsBelow] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia(`(max-width: ${breakpoints[breakpoint]}px)`);
    setIsBelow(mq.matches);
    const handler = (e: MediaQueryListEvent) => setIsBelow(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, [breakpoint]);

  return isBelow;
}

export const useIsMobile = () => useBreakpoint("xs");
