/**
 * SectionContainer Component
 * Reusable responsive section wrapper with consistent spacing
 * Replaces repeated "container mx-auto px-4 sm:px-6 lg:px-8" pattern
 */

import { type ReactNode } from "react";
import { cn } from "@/lib/utils";

interface SectionContainerProps {
  children: ReactNode;
  className?: string;
  /**
   * Size variant for different container max-widths
   * - full: Full width with padding (default)
   * - xl: Max width 1280px
   * - lg: Max width 1024px
   * - md: Max width 768px
   * - sm: Max width 640px
   */
  size?: "full" | "xl" | "lg" | "md" | "sm";
  /**
   * Padding variant
   * - default: px-4 sm:px-6 lg:px-8 (responsive)
   * - compact: px-4 (consistent)
   * - none: No padding
   */
  padding?: "default" | "compact" | "none";
}

const sizeClasses = {
  full: "container mx-auto",
  xl: "max-w-7xl mx-auto",
  lg: "max-w-5xl mx-auto",
  md: "max-w-3xl mx-auto",
  sm: "max-w-2xl mx-auto",
};

const paddingClasses = {
  default: "px-4 sm:px-6 lg:px-8",
  compact: "px-4",
  none: "",
};

/**
 * SectionContainer component for consistent page layouts
 *
 * @example
 * // Default responsive container
 * <SectionContainer>Content</SectionContainer>
 *
 * @example
 * // Compact container with max-width
 * <SectionContainer size="md" padding="compact">Content</SectionContainer>
 *
 * @example
 * // Custom styling
 * <SectionContainer className="py-12 bg-gray-50">Content</SectionContainer>
 */
export function SectionContainer({
  children,
  className,
  size = "full",
  padding = "default",
}: SectionContainerProps) {
  return (
    <div className={cn(sizeClasses[size], paddingClasses[padding], className)}>
      {children}
    </div>
  );
}
