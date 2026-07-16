/**
 * BrandColorBlobs Component
 *
 * Reusable brand color gradient blobs used as decorative background elements.
 * Provides consistent visual branding across sections with configurable positioning.
 *
 * @example
 * ```tsx
 * <section className="relative">
 *   <BrandColorBlobs />
 *   <div className="relative z-10">Content here</div>
 * </section>
 * ```
 */

interface BrandColorBlobsProps {
  /** Show top-right primary blob (default: true) */
  showPrimary?: boolean;
  /** Show bottom-left secondary blob (default: true) */
  showSecondary?: boolean;
  /** Additional CSS classes */
  className?: string;
}

export function BrandColorBlobs({
  showPrimary = true,
  showSecondary = true,
  className = "",
}: BrandColorBlobsProps) {
  void showPrimary;
  void showSecondary;
  void className;

  // Deprecated: non-hero backgrounds now use the MH logo paraplex treatment only.
  return null;
}
