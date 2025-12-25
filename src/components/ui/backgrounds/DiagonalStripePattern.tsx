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

interface DiagonalStripePatternProps {
  /** Opacity in light mode (default: 0.03) */
  lightOpacity?: number;
  /** Opacity in dark mode (default: 0.05) */
  darkOpacity?: number;
  /** Stripe color (default: #386851 - brand primary) */
  color?: string;
  /** Additional CSS classes */
  className?: string;
}

export function DiagonalStripePattern({
  lightOpacity = 0.03,
  darkOpacity = 0.05,
  color = "#386851",
  className = "",
}: DiagonalStripePatternProps) {
  return (
    <div
      className={`absolute inset-0 ${className}`}
      style={{ opacity: lightOpacity }}
      aria-hidden="true"
    >
      <div
        className="absolute inset-0 dark:opacity-[var(--dark-opacity)]"
        style={
          {
            backgroundImage: `repeating-linear-gradient(
              45deg,
              ${color} 0px,
              ${color} 2px,
              transparent 2px,
              transparent 60px
            )`,
            "--dark-opacity": darkOpacity / lightOpacity,
          } as React.CSSProperties & { "--dark-opacity": number }
        }
      />
    </div>
  );
}
