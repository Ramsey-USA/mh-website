import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Combines class names with proper handling of Tailwind CSS conflicts
 * This utility ensures that when multiple Tailwind classes of the same type are provided,
 * the last one takes precedence (e.g., 'bg-red-500 bg-blue-500' -> 'bg-blue-500')
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Brand-specific utility classes that can be used alongside Tailwind
 * These provide consistency across the application
 */
export const brandClasses = {
  // Button variants
  button: {
    primary: "btn-primary btn-base mh-button-glow button-lift",
    secondary: "btn-secondary btn-base button-lift",
    ghost: "btn-base text-brand-primary hover:bg-brand-light",
    outline:
      "btn-base border border-brand-primary text-brand-primary hover:bg-brand-primary hover:text-white",
  },

  // Card variants
  card: {
    base: "card-base",
    hover: "card-base card-hover",
    interactive: "card-base card-hover cursor-pointer",
    elevated: "card-base shadow-brand-lg",
  },

  // Input variants
  input: {
    base: "input-base",
    error: "input-base border-red-500 focus:border-red-500 focus:ring-red-500",
    success:
      "input-base border-green-500 focus:border-green-500 focus:ring-green-500",
  },

  // Text variants with brand colors
  text: {
    primary: "text-brand-primary",
    secondary: "text-brand-secondary",
    accent: "text-brand-accent",
    muted: "text-gray-600",
    success: "text-green-600",
    warning: "text-yellow-600",
    error: "text-red-600",
  },

  // Background variants
  background: {
    primary: "bg-brand-primary",
    secondary: "bg-brand-secondary",
    accent: "bg-brand-accent",
    light: "bg-brand-light",
    dark: "bg-brand-dark",
  },

  // Animation classes
  animation: {
    fadeIn: "animate-fade-in",
    slideUp: "animate-slide-up",
    scaleIn: "animate-scale-in",
    gpu: "animate-gpu",
    glow: "animate-pulse-glow",
  },

  // Layout utilities
  layout: {
    container: "container mx-auto px-4 sm:px-6 lg:px-8",
    section: "py-12 lg:py-20",
    grid: "grid gap-6 md:gap-8",
    flex: "flex items-center justify-center",
    centerContent: "flex items-center justify-center min-h-screen",
  },

  // Focus and accessibility
  focus: {
    brand: "focus-brand",
    ring: "focus:ring-2 focus:ring-brand-primary focus:ring-offset-2",
  },

  // 3D and perspective effects
  effect3d: {
    perspective: "perspective-1000",
    preserve3d: "preserve-3d",
    backfaceHidden: "backface-hidden",
    flipY: "rotate-y-180",
  },
} as const;

/**
 * Responsive utility function for consistent breakpoint handling
 */
export const responsive = {
  mobile: (classes: string) =>
    classes
      .split(" ")
      .map((cls) => `sm:${cls}`)
      .join(" "),
  tablet: (classes: string) =>
    classes
      .split(" ")
      .map((cls) => `md:${cls}`)
      .join(" "),
  desktop: (classes: string) =>
    classes
      .split(" ")
      .map((cls) => `lg:${cls}`)
      .join(" "),
  wide: (classes: string) =>
    classes
      .split(" ")
      .map((cls) => `xl:${cls}`)
      .join(" "),
};

/**
 * Dynamic className generator for consistent styling patterns
 */
export const createBrandVariant = (
  baseClasses: string,
  variant: "primary" | "secondary" | "accent" = "primary",
) => {
  const variantClasses = {
    primary:
      "text-brand-primary border-brand-primary hover:bg-brand-primary hover:text-white",
    secondary:
      "text-brand-secondary border-brand-secondary hover:bg-brand-secondary hover:text-white",
    accent:
      "text-brand-accent border-brand-accent hover:bg-brand-accent hover:text-white",
  };

  return cn(baseClasses, variantClasses[variant]);
};

/**
 * Theme-aware class generator
 */
export const createThemeClasses = (
  lightClasses: string,
  darkClasses: string,
) => {
  return cn(
    lightClasses,
    darkClasses
      .split(" ")
      .map((cls) => `dark:${cls}`)
      .join(" "),
  );
};

/**
 * Performance-optimized class combinations for common patterns
 */
export const performanceClasses = {
  card3d: cn(
    brandClasses.card.base,
    brandClasses.effect3d.perspective,
    brandClasses.effect3d.preserve3d,
    brandClasses.animation.gpu,
  ),

  interactiveButton: cn(
    brandClasses.button.primary,
    brandClasses.focus.brand,
    brandClasses.animation.gpu,
  ),

  smoothTransition: "transition-all duration-300 ease-out",

  optimizedImage: "will-change-auto transform-gpu",
};

/**
 * Validation helper to ensure class combinations are valid
 */
export const validateClasses = (classes: string): boolean => {
  // Basic validation - check for common issues
  const classArray = classes.split(" ").filter(Boolean);
  const conflictingPrefixes = ["bg-", "text-", "border-", "p-", "m-"];

  for (const prefix of conflictingPrefixes) {
    const prefixClasses = classArray.filter((cls) => cls.startsWith(prefix));
    if (prefixClasses.length > 1) {
      console.warn(
        `Potential class conflict detected: ${prefixClasses.join(", ")}`,
      );
    }
  }

  return true;
};

export default cn;
