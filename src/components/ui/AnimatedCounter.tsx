"use client";

import { useEffect, useRef, useState } from "react";
import { TIMING } from "@/lib/constants/timing";

interface AnimatedCounterProps {
  /**
   * The final value to count to
   */
  value: number;
  /**
   * Duration of the animation in milliseconds
   * @default 2000
   */
  duration?: number;
  /**
   * Decimal places to show (for values like .64 EMR)
   * @default 0
   */
  decimals?: number;
  /**
   * Prefix to show before the number (e.g., "$")
   */
  prefix?: string;
  /**
   * Suffix to show after the number (e.g., "+", "%")
   */
  suffix?: string;
  /**
   * Custom className for styling
   */
  className?: string;
  /**
   * Whether to animate on mount or wait for scroll into view
   * @default false (waits for scroll)
   */
  animateOnMount?: boolean;
}

/**
 * AnimatedCounter Component
 *
 * Animates a number from 0 to its target value with smooth easing.
 * Triggers animation when scrolled into view (or on mount if specified).
 *
 * @example
 * <AnimatedCounter value={20} suffix="+" /> // "20+"
 * <AnimatedCounter value={0.6} decimals={1} /> // "0.6"
 * <AnimatedCounter value={150} suffix="+" /> // "150+"
 */
export function AnimatedCounter({
  value,
  duration = TIMING.ANIMATION.COUNTER,
  decimals = 0,
  prefix = "",
  suffix = "",
  className = "",
  animateOnMount = false,
}: AnimatedCounterProps) {
  const [count, setCount] = useState(0);
  // Use ref instead of state to avoid an extra re-render when animation completes
  const hasAnimated = useRef(false);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (hasAnimated.current) return;

    // Respect user's motion preference
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const animateValue = () => {
      if (prefersReducedMotion) {
        setCount(value);
        hasAnimated.current = true;
        return;
      }

      const startTime = performance.now();

      const animate = (currentTime: number) => {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        // easeOutCubic for smooth deceleration
        const easeProgress = 1 - Math.pow(1 - progress, 3);
        setCount(value * easeProgress);

        if (progress < 1) {
          requestAnimationFrame(animate);
        }
      };

      requestAnimationFrame(animate);
      hasAnimated.current = true;
    };

    if (animateOnMount) {
      animateValue();
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            animateValue();
          }
        });
      },
      { threshold: 0.2 },
    );

    const currentRef = ref.current;
    if (currentRef) observer.observe(currentRef);

    return () => {
      if (currentRef) observer.unobserve(currentRef);
    };
  }, [animateOnMount, value, duration]);

  const displayValue = count.toFixed(decimals);

  return (
    <span ref={ref} className={className}>
      {prefix}
      {displayValue}
      {suffix}
    </span>
  );
}
