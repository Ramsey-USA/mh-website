/**
 * Grid Layout Utilities
 *
 * Provides reusable grid layout patterns with responsive breakpoints and gap sizes.
 * Eliminates duplicate grid className patterns across the codebase.
 *
 * @example
 * ```tsx
 * // 3-column responsive grid with medium gap
 * <div className={getGridClassName({ base: 1, sm: 2, lg: 3 }, "md")}>
 *
 * // 4-column grid with custom gap
 * <div className={getGridClassName({ base: 1, md: 2, lg: 3, xl: 4 }, "lg")}>
 *
 * // 2-column grid with small gap
 * <div className={getGridClassName({ base: 1, lg: 2 }, "sm")}>
 * ```
 */

// Grid configuration types
export type GridColumns = 1 | 2 | 3 | 4 | 5 | 6;
export type GridGap = "sm" | "md" | "lg" | "xl";

export interface GridConfig {
  base?: GridColumns;
  sm?: GridColumns;
  md?: GridColumns;
  lg?: GridColumns;
  xl?: GridColumns;
}

// Gap size mappings
const gapSizes: Record<GridGap, string> = {
  sm: "gap-4",
  md: "gap-6",
  lg: "gap-8",
  xl: "gap-12",
};

// Responsive gap overrides (for lg:gap-8 patterns)
const responsiveGapSizes: Record<GridGap, string> = {
  sm: "sm:gap-4",
  md: "lg:gap-8",
  lg: "lg:gap-10",
  xl: "lg:gap-12",
};

// Column class mappings
const columnClasses: Record<GridColumns, string> = {
  1: "grid-cols-1",
  2: "grid-cols-2",
  3: "grid-cols-3",
  4: "grid-cols-4",
  5: "grid-cols-5",
  6: "grid-cols-6",
};

/**
 * Generates a grid className string with responsive column counts and gap sizing
 *
 * @param columns - Responsive column configuration (base, sm, md, lg, xl breakpoints)
 * @param gap - Gap size: "sm" (gap-4), "md" (gap-6), "lg" (gap-8), "xl" (gap-12)
 * @param useResponsiveGap - Whether to use lg:gap-* override (default: false)
 * @param extraClasses - Additional custom classes to append
 * @returns Complete grid className string
 */
export function getGridClassName(
  columns: GridConfig,
  gap: GridGap = "md",
  useResponsiveGap = false,
  extraClasses = "",
): string {
  const classes: string[] = ["grid"];

  // Add base columns (defaults to 1 if not specified)
  const baseColumns = columns.base ?? 1;
  classes.push(columnClasses[baseColumns]);

  // Add responsive column classes
  if (columns.sm) {
    classes.push(`sm:${columnClasses[columns.sm]}`);
  }
  if (columns.md) {
    classes.push(`md:${columnClasses[columns.md]}`);
  }
  if (columns.lg) {
    classes.push(`lg:${columnClasses[columns.lg]}`);
  }
  if (columns.xl) {
    classes.push(`xl:${columnClasses[columns.xl]}`);
  }

  // Add gap classes
  classes.push(gapSizes[gap]);
  if (useResponsiveGap) {
    classes.push(responsiveGapSizes[gap]);
  }

  // Add extra classes if provided
  if (extraClasses) {
    classes.push(extraClasses);
  }

  return classes.join(" ");
}

/**
 * Common grid presets for frequently used patterns
 */
export const gridPresets = {
  /**
   * 1 → 2 → 3 columns (most common pattern)
   * Usage: cards, features, services
   */
  cards3: (gap: GridGap = "md", extraClasses = "") =>
    getGridClassName({ base: 1, sm: 2, lg: 3 }, gap, true, extraClasses),

  /**
   * 1 → 2 → 3 → 4 columns (extended pattern)
   * Usage: small icons, badges, compact cards
   */
  cards4: (gap: GridGap = "md", extraClasses = "") =>
    getGridClassName(
      { base: 1, sm: 2, lg: 3, xl: 4 },
      gap,
      false,
      extraClasses,
    ),

  /**
   * 1 → 2 columns (simple two-column layout)
   * Usage: comparison, side-by-side content
   */
  twoColumn: (gap: GridGap = "lg", extraClasses = "") =>
    getGridClassName({ base: 1, lg: 2 }, gap, false, extraClasses),

  /**
   * 1 → 2 → 4 columns (skip 3 columns)
   * Usage: trade partners, compact layouts
   */
  compactCards: (gap: GridGap = "lg", extraClasses = "") =>
    getGridClassName({ base: 1, md: 2, lg: 4 }, gap, false, extraClasses),

  /**
   * 1 → 2 → 3 columns with md breakpoint
   * Usage: alternative responsive pattern
   */
  cards3Alt: (gap: GridGap = "lg", extraClasses = "") =>
    getGridClassName({ base: 1, md: 2, lg: 3 }, gap, false, extraClasses),
};
