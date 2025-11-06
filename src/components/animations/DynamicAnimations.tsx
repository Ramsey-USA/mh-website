"use client";

import dynamic from "next/dynamic";
import { type ReactNode } from "react";

// Loading fallback component
const AnimationFallback = ({ children }: { children: ReactNode }) => (
  <div className="opacity-0 animate-[fadeIn_0.3s_ease-out_forwards]">
    {children}
  </div>
);

// Dynamically load animation components to reduce initial bundle
export const FadeInWhenVisible = dynamic(
  () =>
    import("./FramerMotionComponents").then((mod) => ({
      default: mod.FadeInWhenVisible,
    })),
  {
    loading: () => null,
    ssr: false,
  },
);

export const StaggeredFadeIn = dynamic(
  () =>
    import("./FramerMotionComponents").then((mod) => ({
      default: mod.StaggeredFadeIn,
    })),
  {
    loading: () => null,
    ssr: false,
  },
);

export const HoverScale = dynamic(
  () =>
    import("./FramerMotionComponents").then((mod) => ({
      default: mod.HoverScale,
    })),
  {
    loading: () => null,
    ssr: false,
  },
);

export const PageTransition = dynamic(
  () =>
    import("./FramerMotionComponents").then((mod) => ({
      default: mod.PageTransition,
    })),
  {
    loading: () => null,
    ssr: false,
  },
);

export const LoadingSpinner = dynamic(
  () =>
    import("./FramerMotionComponents").then((mod) => ({
      default: mod.LoadingSpinner,
    })),
  {
    loading: () => (
      <div className="border-2 border-t-transparent border-blue-600 rounded-full w-8 h-8 animate-spin" />
    ),
    ssr: false,
  },
);

export const AnimatedButton = dynamic(
  () =>
    import("./FramerMotionComponents").then((mod) => ({
      default: mod.AnimatedButton,
    })),
  {
    loading: () => null,
    ssr: false,
  },
);

export const AnimatedCounter = dynamic(
  () =>
    import("./FramerMotionComponents").then((mod) => ({
      default: mod.AnimatedCounter,
    })),
  {
    loading: () => null,
    ssr: false,
  },
);

export const ParallaxScroll = dynamic(
  () =>
    import("./FramerMotionComponents").then((mod) => ({
      default: mod.ParallaxScroll,
    })),
  {
    loading: () => null,
    ssr: false,
  },
);

// Export animation variants for direct use
export {
  fadeInVariants,
  staggerContainer,
  scaleInVariants,
  slideInLeft,
  slideInRight,
  floatAnimation,
  pulseAnimation,
} from "./FramerMotionComponents";
