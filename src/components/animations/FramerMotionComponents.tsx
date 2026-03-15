"use client";

import {
  useRef,
  type ReactNode,
  useState,
  useEffect,
  type CSSProperties,
} from "react";
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

function useInView(
  threshold = 0.1,
): [React.RefObject<HTMLDivElement | null>, boolean] {
  const ref = useRef<HTMLDivElement | null>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { rootMargin: "0px 0px -10% 0px", threshold },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);
  return [ref, inView];
}

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
  const [ref, inView] = useInView(animConfig.threshold);
  const [forceShow, setForceShow] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const check = () => {
      requestAnimationFrame(() => {
        if (!ref.current) return;
        const rect = ref.current.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom > 0)
          setForceShow(true);
      });
    };
    requestAnimationFrame(() => {
      check();
      setTimeout(check, TIMING.PERFORMANCE.VISIBILITY_CHECK);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!animConfig.enableAnimations || forceShow) {
    return <div className={className}>{children}</div>;
  }

  const style: CSSProperties = {
    opacity: inView ? 1 : 0,
    transform: inView ? "translateY(0)" : "translateY(20px)",
    transition: `opacity ${duration}s cubic-bezier(0.25,0.25,0,1) ${delay}s, transform ${duration}s cubic-bezier(0.25,0.25,0,1) ${delay}s`,
  };

  return (
    <div ref={ref} style={style} className={className}>
      {children}
    </div>
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
  const [ref, inView] = useInView(0.1);

  return (
    <div ref={ref} className={className}>
      {children.map((child, index) => {
        const delay = index * staggerDelay;
        const style: CSSProperties = {
          opacity: inView ? 1 : 0,
          transform: inView ? "translateY(0)" : "translateY(20px)",
          transition: `opacity 0.6s cubic-bezier(0.25,0.25,0,1) ${delay}s, transform 0.6s cubic-bezier(0.25,0.25,0,1) ${delay}s`,
        };
        return (
          <div key={index} style={style}>
            {child}
          </div>
        );
      })}
    </div>
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
  const [hovered, setHovered] = useState(false);
  const [pressed, setPressed] = useState(false);
  const currentScale = pressed ? 0.95 : hovered ? scale : 1;
  const style: CSSProperties = {
    transform: `translateZ(0) scale(${currentScale})`,
    transition: "transform 0.2s cubic-bezier(0.34,1.56,0.64,1)",
    backfaceVisibility: "hidden",
    willChange: "transform",
    WebkitFontSmoothing: "antialiased",
  };
  return (
    <div
      className={`${className} hover-scale`}
      style={style}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => {
        setHovered(false);
        setPressed(false);
      }}
      onMouseDown={() => setPressed(true)}
      onMouseUp={() => setPressed(false)}
    >
      {children}
    </div>
  );
}
