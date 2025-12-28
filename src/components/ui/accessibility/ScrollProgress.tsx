"use client";

import { useEffect, useState, useRef } from "react";

/**
 * Scroll Progress Indicator
 * Shows reading progress at top of page
 * Optimized to prevent forced reflows
 */
export function ScrollProgress() {
  const [progress, setProgress] = useState(0);
  const rafId = useRef<number | null>(null);
  const scrollHeightCache = useRef<number>(0);

  useEffect(() => {
    // Cache scroll height and recalculate on resize
    const cacheScrollHeight = () => {
      scrollHeightCache.current =
        document.documentElement.scrollHeight - window.innerHeight;
    };

    const updateProgress = () => {
      // Cancel previous RAF to throttle updates
      if (rafId.current) {
        cancelAnimationFrame(rafId.current);
      }

      // Use RAF to batch layout reads and avoid forced reflows
      rafId.current = requestAnimationFrame(() => {
        const scrolled =
          scrollHeightCache.current > 0
            ? (window.scrollY / scrollHeightCache.current) * 100
            : 0;
        setProgress(Math.min(scrolled, 100));
      });
    };

    // Cache scroll height initially and on resize
    cacheScrollHeight();
    window.addEventListener("resize", cacheScrollHeight, { passive: true });

    // Use passive listener for better scroll performance
    window.addEventListener("scroll", updateProgress, { passive: true });
    updateProgress(); // Initial call

    return () => {
      if (rafId.current) {
        cancelAnimationFrame(rafId.current);
      }
      window.removeEventListener("scroll", updateProgress);
      window.removeEventListener("resize", cacheScrollHeight);
    };
  }, []);

  return (
    <div
      className="scroll-progress"
      style={{ width: `${progress}%` }}
      role="progressbar"
      aria-valuenow={Math.round(progress)}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label="Page scroll progress"
    />
  );
}
