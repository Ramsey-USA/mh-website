import type { CSSProperties } from "react";

interface DiagonalStripePatternProps {
  /** Opacity in light mode (default: 0.03) */
  lightOpacity?: number;
  /** Opacity in dark mode (default: 0.05) */
  darkOpacity?: number;
  /** Optional tint color blended over the logo watermark */
  color?: string;
  /** Optional fixed watermark width in pixels (height auto preserves aspect ratio). */
  logoSize?: number;
  /** Optional light-mode logo source override. */
  lightLogoSrc?: string;
  /** Optional dark-mode logo source override. */
  darkLogoSrc?: string;
  /** @deprecated Use logoSize. Kept for backward compatibility. */
  tileSize?: number;
  /** Additional CSS classes */
  className?: string;
}

/**
 * DiagonalStripePattern Component
 *
 * Backward-compatible background component that now renders a single MH logo
 * watermark treatment used on non-hero sections.
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
  color,
  logoSize,
  lightLogoSrc = "/images/logo/mh-logo-light-bg.webp",
  darkLogoSrc = "/images/logo/mh-logo-dark-bg.webp",
  tileSize,
  className = "",
}: DiagonalStripePatternProps) {
  const resolvedLogoSize = tileSize ?? logoSize;
  const backgroundSize =
    typeof resolvedLogoSize === "number"
      ? `${resolvedLogoSize}px auto`
      : "contain"; // Keep natural logo ratio while using maximum available space.

  return (
    <>
      <div
        className={`absolute inset-0 dark:hidden ${className}`}
        style={
          {
            opacity: lightOpacity,
            backgroundImage: `url('${lightLogoSrc}')`,
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
            backgroundSize,
            backgroundColor: color,
            backgroundBlendMode: color ? "multiply" : undefined,
          } as CSSProperties
        }
        aria-hidden="true"
      />
      <div
        className={`absolute inset-0 hidden dark:block ${className}`}
        style={
          {
            opacity: darkOpacity,
            backgroundImage: `url('${darkLogoSrc}')`,
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
            backgroundSize,
            backgroundColor: color,
            backgroundBlendMode: color ? "multiply" : undefined,
          } as CSSProperties
        }
        aria-hidden="true"
      />
    </>
  );
}
