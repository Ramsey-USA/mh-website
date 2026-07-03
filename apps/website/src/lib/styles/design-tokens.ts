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
  /** Icon hover - color/opacity emphasis only */
  iconPlayful: "transition-colors duration-300",

  /** Icon hover - subtle color transition only */
  iconSubtle: "transition-colors duration-300",

  /** Card hover - shadow emphasis only */
  cardLift: "transition-shadow duration-300",

  /** Card hover - moderate shadow emphasis */
  cardScale: "transition-shadow duration-300",

  /** Button hover - shadow/color only */
  button: "transition-colors duration-300",

  /** Image hover - color/opacity-only transition */
  imageZoom: "transition-opacity duration-500",

  /** Utility motion token retained for API compatibility (no transform) */
  translateUp: "transition-colors duration-300",

  /** Utility motion token retained for API compatibility (no transform) */
  translateUpLarge: "transition-colors duration-300",
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
