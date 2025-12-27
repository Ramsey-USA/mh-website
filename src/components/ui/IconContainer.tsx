/**
 * IconContainer Component
 *
 * Reusable gradient icon container used throughout the site for consistent
 * icon presentation with gradient backgrounds and animations.
 *
 * Replaces repeated pattern:
 * ```tsx
 * <div className="relative flex justify-center items-center bg-gradient-to-br from-brand-primary to-brand-primary-dark rounded-full w-16 h-16 shadow-xl group-hover:scale-110 transition-all duration-300">
 *   <MaterialIcon icon="..." className="text-white" />
 * </div>
 * ```
 *
 * @example
 * ```tsx
 * <IconContainer size="lg" gradient="primary">
 *   <MaterialIcon icon="shield" className="text-white" />
 * </IconContainer>
 * ```
 */

import { cn } from "@/lib/utils";

export interface IconContainerProps {
  /** Icon element to render inside container */
  children: React.ReactNode;
  /** Size variant */
  size?: "sm" | "md" | "lg" | "xl" | "2xl";
  /** Gradient color scheme */
  gradient?: "primary" | "secondary" | "bronze" | "mixed" | "forest";
  /** Shape variant */
  shape?: "circle" | "square" | "rounded";
  /** Whether to animate on hover */
  animate?: boolean;
  /** Additional classes */
  className?: string;
}

const sizeVariants = {
  sm: "w-12 h-12",
  md: "w-16 h-16",
  lg: "w-20 h-20",
  xl: "w-24 h-24",
  "2xl": "w-32 h-32",
};

const gradientVariants = {
  primary: "bg-gradient-to-br from-brand-primary to-brand-primary-dark",
  secondary: "bg-gradient-to-br from-brand-secondary to-brand-secondary-dark",
  bronze: "bg-gradient-to-br from-brand-secondary to-bronze-700",
  mixed:
    "bg-gradient-to-br from-brand-primary via-brand-primary-dark to-brand-secondary",
  forest: "bg-gradient-to-br from-brand-secondary via-forest-600 to-forest-700",
};

const shapeVariants = {
  circle: "rounded-full",
  square: "rounded-none",
  rounded: "rounded-2xl",
};

export function IconContainer({
  children,
  size = "md",
  gradient = "primary",
  shape = "circle",
  animate = true,
  className = "",
}: IconContainerProps) {
  return (
    <div
      className={cn(
        "relative flex justify-center items-center shadow-xl",
        sizeVariants[size],
        gradientVariants[gradient],
        shapeVariants[shape],
        animate && "group-hover:scale-110 transition-all duration-300",
        className,
      )}
    >
      {children}
    </div>
  );
}
