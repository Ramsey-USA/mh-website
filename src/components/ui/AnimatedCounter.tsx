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
  const [hasAnimated, setHasAnimated] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    // Skip if already animated
    if (hasAnimated) return;

    const animateValue = () => {
      const startTime = performance.now();
      const startValue = 0;
      const endValue = value;

      const animate = (currentTime: number) => {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);

        // Easing function: easeOutCubic for smooth deceleration
        const easeProgress = 1 - Math.pow(1 - progress, 3);

        const currentValue =
          startValue + (endValue - startValue) * easeProgress;
        setCount(currentValue);

        if (progress < 1) {
          requestAnimationFrame(animate);
        }
      };

      requestAnimationFrame(animate);
    };

    // Animate on mount if specified
    if (animateOnMount) {
      animateValue();
      setHasAnimated(true);
      return;
    }

    // Otherwise wait for scroll into view
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated) {
            animateValue();
            setHasAnimated(true);
          }
        });
      },
      {
        threshold: 0.2, // Trigger when 20% visible
      },
    );

    const currentRef = ref.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [hasAnimated, animateOnMount, value, duration]);

  const displayValue = count.toFixed(decimals);

  return (
    <span ref={ref} className={className}>
      {prefix}
      {displayValue}
      {suffix}
    </span>
  );
}
