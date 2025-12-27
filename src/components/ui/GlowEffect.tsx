/**
 * GlowEffect Component
 *
 * Reusable gradient glow effect for cards and containers.
 * Creates animated blur effects that appear on hover.
 *
 * Replaces repeated pattern:
 * ```tsx
 * <div className="absolute -inset-2 bg-gradient-to-br from-brand-primary/40 to-brand-secondary/40 rounded-2xl opacity-20 group-hover:opacity-100 blur-xl transition-all duration-500 group-hover:animate-pulse"></div>
 * ```
 *
 * @example
 * ```tsx
 * <div className="relative group">
 *   <GlowEffect gradient="primary-secondary" />
 *   <div className="relative">Card content</div>
 * </div>
 * ```
 */

import { cn } from "@/lib/utils";

export interface GlowEffectProps {
  /** Gradient color scheme */
  gradient?:
    | "primary"
    | "secondary"
    | "primary-secondary"
    | "primary-dark"
    | "bronze";
  /** Size of the glow (inset values) */
  size?: "sm" | "md" | "lg";
  /** Border radius */
  rounded?: "sm" | "md" | "lg" | "xl" | "2xl" | "full";
  /** Whether to animate on hover */
  animate?: boolean;
  /** Initial opacity (0-100) */
  opacity?: number;
  /** Hover opacity (0-100) */
  hoverOpacity?: number;
  /** Additional classes */
  className?: string;
}

const gradientVariants = {
  primary: "bg-gradient-to-br from-brand-primary/40 to-brand-primary-dark/40",
  secondary:
    "bg-gradient-to-br from-brand-secondary/40 to-brand-secondary-dark/40",
  "primary-secondary":
    "bg-gradient-to-br from-brand-primary/40 to-brand-secondary/40",
  "primary-dark":
    "bg-gradient-to-br from-brand-primary/40 to-brand-primary-dark/40",
  bronze: "bg-gradient-to-br from-brand-secondary/40 to-bronze-700/40",
};

const sizeVariants = {
  sm: "-inset-1",
  md: "-inset-2",
  lg: "-inset-4",
};

const roundedVariants = {
  sm: "rounded-sm",
  md: "rounded-md",
  lg: "rounded-lg",
  xl: "rounded-xl",
  "2xl": "rounded-2xl",
  full: "rounded-full",
};

export function GlowEffect({
  gradient = "primary-secondary",
  size = "md",
  rounded = "2xl",
  animate = true,
  opacity = 20,
  className = "",
}: Omit<GlowEffectProps, "hoverOpacity">) {
  return (
    <div
      className={cn(
        "absolute blur-xl transition-all duration-500",
        gradientVariants[gradient],
        sizeVariants[size],
        roundedVariants[rounded],
        animate && "group-hover:opacity-100 group-hover:animate-pulse",
        className,
      )}
      style={{
        opacity: opacity / 100,
      }}
    />
  );
}
