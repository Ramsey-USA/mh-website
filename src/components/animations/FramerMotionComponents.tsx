"use client";

// Optimized imports - only import what we need to reduce bundle size
import { motion, useInView } from "framer-motion";
import { useRef, type ReactNode, useState, useEffect } from "react";
import { TIMING } from "@/lib/constants/timing";
import { getAnimationConfig } from "@/lib/performance/mobile-optimizations";

// Get performance-aware animation config
const animConfig =
  typeof window !== "undefined"
    ? getAnimationConfig()
    : {
        duration: 0.6,
        staggerDelay: 0.1,
        enableAnimations: true,
        threshold: 0.2,
      };

// Component for automatic fade-in when in view
interface FadeInWhenVisibleProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
}

export function FadeInWhenVisible({
  children,
  className = "",
  delay = 0,
  duration = animConfig.duration,
}: FadeInWhenVisibleProps) {
  const ref = useRef(null);
  // Use more generous margin for mobile compatibility
  const isInView = useInView(ref, {
    once: true,
    margin: "0px 0px -10% 0px",
    amount: animConfig.threshold,
  });

  // Always show content for elements that are initially visible
  const [shouldForceShow, setShouldForceShow] = useState(false);
  useEffect(() => {
    // Check if element is initially in viewport using RAF to batch layout reads
    const checkInitialVisibility = () => {
      if (ref.current) {
        requestAnimationFrame(() => {
          if (!ref.current) return;
          const rect = (ref.current as HTMLElement).getBoundingClientRect();
          if (rect.top < window.innerHeight && rect.bottom > 0) {
            setShouldForceShow(true);
          }
        });
      }
    };

    // Check after initial render using RAF
    requestAnimationFrame(() => {
      checkInitialVisibility();
      // Recheck after visibility timeout to catch slow-loading content
      setTimeout(checkInitialVisibility, TIMING.PERFORMANCE.VISIBILITY_CHECK);
    });
  }, []);

  // Skip animations if user prefers reduced motion or on slow connections
  if (!animConfig.enableAnimations || shouldForceShow) {
    return <div className={className}>{children}</div>;
  }

  const shouldShow = isInView;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={shouldShow ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{
        duration,
        delay,
        ease: [0.25, 0.25, 0, 1],
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// Staggered fade in for lists
interface StaggeredFadeInProps {
  children: ReactNode[];
  className?: string;
  staggerDelay?: number;
}

export function StaggeredFadeIn({
  children,
  className = "",
  staggerDelay = 0.1,
}: StaggeredFadeInProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-10px" });

  return (
    <motion.div
      ref={ref}
      variants={{
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: { staggerChildren: 0.1, delayChildren: 0.1 },
        },
      }}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      className={className}
    >
      {children.map((child, index) => (
        <motion.div
          key={index}
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: {
              opacity: 1,
              y: 0,
              transition: {
                delay: index * staggerDelay,
                duration: 0.6,
                ease: [0.25, 0.25, 0, 1],
              },
            },
          }}
        >
          {child}
        </motion.div>
      ))}
    </motion.div>
  );
}

// Hover scale animation wrapper
interface HoverScaleProps {
  children: ReactNode;
  scale?: number;
  className?: string;
}

export function HoverScale({
  children,
  scale = 1.05,
  className = "",
}: HoverScaleProps) {
  return (
    <motion.div
      whileHover={{ scale }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      className={`${className} hover-scale`}
      style={{
        WebkitFontSmoothing: "antialiased",
        MozOsxFontSmoothing: "grayscale",
        transform: "translateZ(0)",
        backfaceVisibility: "hidden",
        willChange: "transform",
      }}
    >
      {children}
    </motion.div>
  );
}
