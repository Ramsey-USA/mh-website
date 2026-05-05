/**
 * Card Style Variants
 * Centralized card styling utilities to eliminate duplicate className strings
 * Used across 50+ components throughout the application
 */

type CardVariant = "default" | "primary" | "secondary" | "accent" | "static";

const cardStyles = {
  base: "flex flex-col bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 h-full transition-all",
  hover: "hover:shadow-lg dark:hover:shadow-gray-600/50 hover:-translate-y-1",
  primary: "border-2 border-brand-primary dark:border-brand-primary/50",
  secondary: "border-2 border-brand-secondary dark:border-brand-secondary/50",
  accent: "border-2 border-brand-secondary dark:border-brand-secondary/50",
} as const;

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
