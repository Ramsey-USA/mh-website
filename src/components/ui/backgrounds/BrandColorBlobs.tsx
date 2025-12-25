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
  return (
    <>
      {showPrimary && (
        <div
          className={`absolute top-20 right-[15%] w-96 h-96 bg-gradient-to-br from-brand-primary/10 to-transparent dark:from-brand-primary/20 blur-3xl rounded-full ${className}`}
          aria-hidden="true"
        />
      )}
      {showSecondary && (
        <div
          className={`absolute bottom-20 left-[15%] w-96 h-96 bg-gradient-to-tr from-brand-secondary/10 to-transparent dark:from-brand-secondary/20 blur-3xl rounded-full ${className}`}
          aria-hidden="true"
        />
      )}
    </>
  );
}
