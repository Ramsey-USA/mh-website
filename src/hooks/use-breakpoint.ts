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
 * Custom hook to detect current screen size breakpoint
 * @param breakpoint - The breakpoint to check against
 * @returns boolean indicating if screen is below the breakpoint
 */
export function useBreakpoint(breakpoint: Breakpoint): boolean {
  const [isBelow, setIsBelow] = useState(false);

  useEffect(() => {
    const checkBreakpoint = () => {
      setIsBelow(window.innerWidth <= breakpoints[breakpoint]);
    };

    // Initial check
    checkBreakpoint();

    // Add event listener
    window.addEventListener("resize", checkBreakpoint);

    // Cleanup
    return () => window.removeEventListener("resize", checkBreakpoint);
  }, [breakpoint]);

  return isBelow;
}

/**
 * Convenience hooks for common breakpoints
 */
export const useIsMobileSm = () => useBreakpoint("mobile-sm");
export const useIsMobile = () => useBreakpoint("xs");
export const useIsTablet = () => useBreakpoint("md");
export const useIsDesktop = () => !useBreakpoint("lg");

/**
 * Hook to get current screen size category
 * @returns string indicating current screen size category
 */
export function useScreenSize():
  | "mobile-sm"
  | "mobile"
  | "tablet"
  | "desktop"
  | "large" {
  const [screenSize, setScreenSize] = useState<
    "mobile-sm" | "mobile" | "tablet" | "desktop" | "large"
  >("desktop");

  useEffect(() => {
    const checkScreenSize = () => {
      const width = window.innerWidth;

      if (width <= breakpoints["mobile-sm"]) {
        setScreenSize("mobile-sm");
      } else if (width <= breakpoints.xs) {
        setScreenSize("mobile");
      } else if (width <= breakpoints.md) {
        setScreenSize("tablet");
      } else if (width <= breakpoints.xl) {
        setScreenSize("desktop");
      } else {
        setScreenSize("large");
      }
    };

    // Initial check
    checkScreenSize();

    // Add event listener
    window.addEventListener("resize", checkScreenSize);

    // Cleanup
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  return screenSize;
}
