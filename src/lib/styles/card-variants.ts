/**
 * Card Style Variants
 * Centralized card styling utilities to eliminate duplicate className strings
 * Used across 50+ components throughout the application
 */

/**
 * Base card styles that apply to all variants
 */
export const cardStyles = {
  base: "flex flex-col bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 h-full transition-all",
  hover: "hover:shadow-lg dark:hover:shadow-gray-600/50 hover:-translate-y-1",
  primary: "border-2 border-brand-primary dark:border-brand-primary/50",
  secondary: "border-2 border-brand-secondary dark:border-brand-secondary/50",
  accent: "border-2 border-brand-accent dark:border-brand-accent/50",
} as const;

/**
 * Card variant types
 */
export type CardVariant =
  | "default"
  | "primary"
  | "secondary"
  | "accent"
  | "static";

/**
 * Get complete className string for a card variant
 *
 * @param variant - The card style variant to use
 * @param extraClasses - Additional classes to append
 * @returns Complete className string
 *
 * @example
 * ```tsx
 * <Card className={getCardClassName('default')}>...</Card>
 * <Card className={getCardClassName('primary', 'p-6')}>...</Card>
 * ```
 */
export const getCardClassName = (
  variant: CardVariant = "default",
  extraClasses = "",
): string => {
  const classes: string[] = [cardStyles.base];

  // Add hover effects for non-static variants
  if (variant !== "static") {
    classes.push(cardStyles.hover);
  }

  // Add variant-specific border styles
  switch (variant) {
    case "primary":
      classes.push(cardStyles.primary);
      break;
    case "secondary":
      classes.push(cardStyles.secondary);
      break;
    case "accent":
      classes.push(cardStyles.accent);
      break;
    // 'default' and 'static' use base styles only
  }

  // Append any extra classes
  if (extraClasses) {
    classes.push(extraClasses);
  }

  return classes.join(" ");
};

/**
 * Predefined card class combinations for common use cases
 */
export const cardClasses = {
  /** Standard card with hover effects */
  default: getCardClassName("default"),

  /** Card with primary brand border */
  primary: getCardClassName("primary"),

  /** Card with secondary brand border */
  secondary: getCardClassName("secondary"),

  /** Card with accent brand border */
  accent: getCardClassName("accent"),

  /** Card without hover effects (for static content) */
  static: getCardClassName("static"),

  /** Card with padding (most common use case) */
  withPadding: getCardClassName("default", "p-6"),

  /** Primary card with padding */
  primaryWithPadding: getCardClassName("primary", "p-6"),
} as const;
