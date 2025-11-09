"use client";

// Optimized imports - only import what we need to reduce bundle size
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useInView,
} from "framer-motion";
import { useRef, type ReactNode, useState, useEffect } from "react";

// Fade in animation variants
export const fadeInVariants = {
  hidden: {
    opacity: 0,
    y: 20,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.25, 0.25, 0, 1],
    },
  },
};

// Staggered container for animating children
export const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
};

// Scale in animation
export const scaleInVariants = {
  hidden: {
    scale: 0.8,
    opacity: 0,
  },
  visible: {
    scale: 1,
    opacity: 1,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
};

// Slide in from left
export const slideInLeft = {
  hidden: {
    x: -50,
    opacity: 0,
  },
  visible: {
    x: 0,
    opacity: 1,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
};

// Slide in from right
export const slideInRight = {
  hidden: {
    x: 50,
    opacity: 0,
  },
  visible: {
    x: 0,
    opacity: 1,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
};

// Float animation for continuous motion
export const floatAnimation = {
  y: [-10, 10, -10],
  transition: {
    duration: 4,
    repeat: Infinity,
    ease: "easeInOut",
  },
};

// Pulse animation for attention
export const pulseAnimation = {
  scale: [1, 1.05, 1],
  transition: {
    duration: 2,
    repeat: Infinity,
    ease: "easeInOut",
  },
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
  duration = 0.6,
}: FadeInWhenVisibleProps) {
  const ref = useRef(null);
  // Use more generous margin for mobile compatibility
  const isInView = useInView(ref, { once: true, margin: "0px 0px -10% 0px" });

  // Always show content for elements that are initially visible
  const [shouldForceShow, setShouldForceShow] = useState(false);
  useEffect(() => {
    // Check if element is initially in viewport
    const checkInitialVisibility = () => {
      if (ref.current) {
        const rect = (ref.current as HTMLElement).getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom > 0) {
          setShouldForceShow(true);
        }
      }
    };

    // Check immediately and after a short delay
    checkInitialVisibility();
    const timer = setTimeout(checkInitialVisibility, 100);

    return () => clearTimeout(timer);
  }, []);

  const shouldShow = isInView || shouldForceShow;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={shouldShow ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{
        duration: shouldForceShow ? 0.3 : duration,
        delay: shouldForceShow ? 0 : delay,
        ease: [0.25, 0.25, 0, 1],
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// Parallax scroll component
interface ParallaxScrollProps {
  children: ReactNode;
  offset?: number;
  className?: string;
}

export function ParallaxScroll({
  children,
  offset = 50,
  className = "",
}: ParallaxScrollProps) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, offset]);
  const smoothY = useSpring(y, { stiffness: 100, damping: 30 });

  return (
    <motion.div ref={ref} style={{ y: smoothY }} className={className}>
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
      variants={staggerContainer}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      className={className}
    >
      {children.map((child, _index) => (
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

// Page transition wrapper
export function PageTransition({ children }: { children: ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{
        duration: 0.3,
        ease: [0.25, 0.25, 0, 1],
      }}
    >
      {children}
    </motion.div>
  );
}

// Loading animation component
export function LoadingSpinner() {
  return (
    <motion.div
      className="border-2 border-t-transparent border-brand-primary rounded-full w-8 h-8"
      animate={{ rotate: 360 }}
      transition={{
        duration: 1,
        repeat: Infinity,
        ease: "linear",
      }}
    />
  );
}

// Button press animation wrapper
interface AnimatedButtonProps {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
}

export function AnimatedButton({
  children,
  className = "",
  onClick,
}: AnimatedButtonProps) {
  return (
    <motion.button
      whileHover={{ scale: 1.01 }}
      whileTap={{ scale: 0.99 }}
      transition={{
        type: "spring",
        stiffness: 500,
        damping: 25,
      }}
      className={className}
      onClick={onClick}
    >
      {children}
    </motion.button>
  );
}

// Counter animation for numbers
interface AnimatedCounterProps {
  from: number;
  to: number;
  duration?: number;
  className?: string;
}

export function AnimatedCounter({
  from,
  to,
  duration = 2,
  className = "",
}: AnimatedCounterProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <motion.span
      ref={ref}
      className={className}
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : { opacity: 0 }}
    >
      <motion.span
        initial={{ scale: from }}
        animate={isInView ? { scale: to } : { scale: from }}
        transition={{ duration, ease: "easeOut" }}
      >
        {isInView ? to : from}
      </motion.span>
    </motion.span>
  );
}
