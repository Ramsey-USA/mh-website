"use client";

import { useEffect, useRef } from "react";

/**
 * Scroll Progress Indicator
 * Shows reading progress at top of page.
 * Uses direct DOM mutation via ref — no React re-renders on scroll.
 */
export function ScrollProgress() {
  const barRef = useRef<HTMLDivElement>(null);
  const rafId = useRef<number | null>(null);
  const scrollHeightCache = useRef<number>(0);
  const lastProgress = useRef<number>(-1);

  useEffect(() => {
    const bar = barRef.current;
    if (!bar) return;

    const cacheScrollHeight = () => {
      scrollHeightCache.current =
        document.documentElement.scrollHeight - window.innerHeight;
    };

    const updateProgress = () => {
      if (rafId.current) cancelAnimationFrame(rafId.current);

      rafId.current = requestAnimationFrame(() => {
        const scrolled =
          scrollHeightCache.current > 0
            ? (window.scrollY / scrollHeightCache.current) * 100
            : 0;
        const progress = Math.min(Math.round(scrolled), 100);

        // Skip DOM writes when value hasn't changed
        if (progress === lastProgress.current) return;
        lastProgress.current = progress;

        bar.style.transform = `scaleX(${progress / 100})`;
        bar.setAttribute("aria-valuenow", String(progress));
      });
    };

    cacheScrollHeight();
    window.addEventListener("resize", cacheScrollHeight, { passive: true });
    window.addEventListener("scroll", updateProgress, { passive: true });
    updateProgress();

    return () => {
      if (rafId.current) cancelAnimationFrame(rafId.current);
      window.removeEventListener("scroll", updateProgress);
      window.removeEventListener("resize", cacheScrollHeight);
    };
  }, []);

  return (
    <div
      ref={barRef}
      className="scroll-progress"
      role="progressbar"
      aria-valuenow={0}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label="Page scroll progress"
    />
  );
}
