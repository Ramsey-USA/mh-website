import type { CSSProperties } from "react";

interface DiagonalStripePatternProps {
  /** Opacity in light mode (default: 0.03) */
  lightOpacity?: number;
  /** Opacity in dark mode (default: 0.05) */
  darkOpacity?: number;
  /** Stripe color (default: var(--color-brand-primary) - brand primary) */
  color?: string;
  /** Additional CSS classes */
  className?: string;
}

/**
 * DiagonalStripePattern Component
 *
 * Reusable diagonal stripe background pattern used throughout the site
 * for consistent brand visual identity.
 *
 * @example
 * ```tsx
 * <section className="relative">
 *   <DiagonalStripePattern />
 *   <div className="relative z-10">Content here</div>
 * </section>
 * ```
 */
export function DiagonalStripePattern({
  lightOpacity = 0.03,
  darkOpacity = 0.05,
  color = "var(--color-brand-primary)",
  className = "",
}: DiagonalStripePatternProps) {
  return (
    <div
      className={`absolute inset-0 opacity-[var(--stripe-light-op)] dark:opacity-[var(--stripe-dark-op)] ${className}`}
      style={
        {
          "--stripe-light-op": lightOpacity,
          "--stripe-dark-op": darkOpacity,
          backgroundImage: `repeating-linear-gradient(
          45deg,
          ${color} 0px,
          ${color} 2px,
          transparent 2px,
          transparent 60px
        )`,
        } as CSSProperties
      }
      aria-hidden="true"
    />
  );
}
