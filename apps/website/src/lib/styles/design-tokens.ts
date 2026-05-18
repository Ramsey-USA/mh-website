/**
 * Design Tokens
 * Centralized constants for corner radii, hover effects, and motion tokens
 *
 * These tokens ensure visual consistency and maintainability across all components.
 * All values align with MH branding standards for cohesive, accessible design.
 *
 * @see https://tailwindcss.com/docs for Tailwind CSS utility reference
 */

/**
 * Corner Radius Tokens
 * Standardized border radius values for consistent visual hierarchy
 */
export const cornerRadius = {
  /** Primary card radius - use for main content cards, section containers (rounded-3xl) */
  card: "rounded-3xl",

  /** Secondary radius - use for icons, feature boxes, sub-sections (rounded-2xl) */
  icon: "rounded-2xl",

  /** Tertiary radius - use for buttons, smaller elements, badges (rounded-xl) */
  element: "rounded-xl",

  /** Small radius - use for input fields, small containers (rounded-lg) */
  small: "rounded-lg",

  /** Circular elements - use for avatars, icon buttons (rounded-full) */
  full: "rounded-full",
} as const;

/**
 * Hover Motion Tokens
 * Standardized hover effects for interactive elements
 */
export const hoverMotion = {
  /** Icon hover - scale + rotation for playful interaction (scale-110 rotate-12) */
  iconPlayful:
    "transition-all duration-300 group-hover:scale-110 group-hover:rotate-12",

  /** Icon hover - scale only for subtle interaction (scale-110) */
  iconSubtle: "transition-all duration-300 group-hover:scale-110",

  /** Card hover - gentle lift effect (scale-[1.02]) */
  cardLift: "transition-all duration-300 hover:scale-[1.02]",

  /** Card hover - moderate scale (scale-105) */
  cardScale: "transition-all duration-300 hover:scale-105",

  /** Button hover - scale up (scale-105) */
  button: "transition-all duration-300 hover:scale-105",

  /** Image hover - gentle zoom (scale-105) */
  imageZoom: "transition-transform duration-500 group-hover:scale-105",

  /** Translate hover - move up (translate-y-1) */
  translateUp: "transition-all duration-300 group-hover:-translate-y-1",

  /** Translate hover - move up slightly (translate-y-2) */
  translateUpLarge: "transition-all duration-300 hover:-translate-y-2",
} as const;

/**
 * Transition Duration Tokens
 * Standardized timing for animations
 */
export const transitionDuration = {
  /** Fast - quick feedback (200ms) */
  fast: "duration-200",

  /** Normal - default interactions (300ms) */
  normal: "duration-300",

  /** Slow - gradual transitions (500ms) */
  slow: "duration-500",
} as const;

/**
 * Combined Tokens
 * Pre-composed combinations for common use cases
 */
export const designTokens = {
  /** Standard card with hover effect */
  cardInteractive: `${cornerRadius.card} ${hoverMotion.cardLift}`,

  /** Icon container with playful hover */
  iconPlayful: `${cornerRadius.icon} ${hoverMotion.iconPlayful}`,

  /** Icon container with subtle hover */
  iconSubtle: `${cornerRadius.icon} ${hoverMotion.iconSubtle}`,

  /** Button with standard interaction */
  button: `${cornerRadius.element} ${hoverMotion.button}`,

  /** Small interactive element */
  elementInteractive: `${cornerRadius.element} ${hoverMotion.cardScale}`,
} as const;

/**
 * Utility function to combine design tokens with custom classes
 *
 * @param tokens - One or more token values from cornerRadius, hoverMotion, or designTokens
 * @param customClasses - Additional custom classes to append
 * @returns Combined className string
 *
 * @example
 * ```tsx
 * // Use with single token
 * <div className={combineTokens(cornerRadius.card, "p-6 bg-white")}>
 *
 * // Use with multiple tokens
 * <div className={combineTokens(cornerRadius.card, hoverMotion.cardLift, "p-6 bg-white")}>
 *
 * // Use with pre-composed token
 * <div className={combineTokens(designTokens.cardInteractive, "p-6 bg-white")}>
 * ```
 */
export function combineTokens(...tokens: string[]): string {
  return tokens.filter(Boolean).join(" ");
}
