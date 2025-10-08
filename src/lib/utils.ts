import { type ClassValue, clsx } from "clsx";
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
 * Brand-specific utility classes for consistent styling
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

  // Animation classes
  animation: {
    fadeIn: "animate-fade-in",
    slideUp: "animate-slide-up",
    scaleIn: "animate-scale-in",
    gpu: "animate-gpu",
    glow: "animate-pulse-glow",
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
 * Performance-optimized class combinations for common patterns
 */
export const performanceClasses = {
  card3d: cn(
    brandClasses.card.base,
    brandClasses.effect3d.perspective,
    brandClasses.effect3d.preserve3d,
    brandClasses.animation.gpu
  ),

  interactiveButton: cn(
    brandClasses.button.primary,
    brandClasses.focus.brand,
    brandClasses.animation.gpu
  ),

  smoothTransition: "transition-all duration-300 ease-out",
  optimizedImage: "will-change-auto transform-gpu",
};
