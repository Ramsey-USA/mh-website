/**
 * Section Component
 * Reusable section wrapper with consistent spacing and background variants
 * Eliminates repeated section patterns across 10+ pages
 */

import { FadeInWhenVisible } from "@/components/animations/FramerMotionComponents";

export type SectionVariant = "default" | "gray" | "gradient";
export type SectionPadding = "default" | "large" | "small" | "none";

interface SectionProps {
  children: React.ReactNode;
  variant?: SectionVariant;
  padding?: SectionPadding;
  animated?: boolean;
  className?: string;
  id?: string;
  containerClassName?: string;
}

/**
 * Section component with consistent styling and optional animation
 *
 * @param variant - Background color variant (default: white, gray: gray-50, gradient: white->gray)
 * @param padding - Vertical padding size (default: py-20 lg:py-32 xl:py-40, large: xl:py-40, small: py-12, none: py-0)
 * @param animated - Whether to wrap content in FadeInWhenVisible animation
 * @param className - Additional classes for section element
 * @param containerClassName - Additional classes for inner container
 * @param id - Section ID for anchor links
 *
 * @example
 * ```tsx
 * <Section variant="gray" padding="large" id="features">
 *   {/* Use custom header pattern shown in branding documentation *\/}
 *   {/* section content *\/}
 * </Section>
 * ```
 */
export function Section({
  children,
  variant = "default",
  padding = "default",
  animated = true,
  className = "",
  containerClassName = "",
  id,
}: SectionProps) {
  // Background variant classes
  const bgClasses = {
    default: "bg-white dark:bg-gray-900",
    gray: "bg-gray-50 dark:bg-gray-800",
    gradient:
      "bg-gradient-to-b from-white dark:from-gray-900 to-gray-50 dark:to-gray-800",
  }[variant];

  // Padding variant classes
  const paddingClasses = {
    default: "py-20 lg:py-32 xl:py-40",
    large: "py-20 lg:py-32 xl:py-40",
    small: "py-12",
    none: "py-0",
  }[padding];

  const sectionContent = (
    <div
      className={`relative z-10 mx-auto px-4 container ${containerClassName}`}
    >
      {children}
    </div>
  );

  return (
    <section
      id={id}
      className={`relative ${bgClasses} ${paddingClasses} ${className} overflow-hidden`}
    >
      {/* Diagonal Stripe Background Pattern - MH Branding Standard */}
      <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05]">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `repeating-linear-gradient(
              45deg,
              #386851 0px,
              #386851 2px,
              transparent 2px,
              transparent 60px
            )`,
          }}
        ></div>
      </div>

      {/* Large Brand Color Blobs - MH Branding Standard */}
      <div className="absolute top-20 right-[15%] w-96 h-96 bg-gradient-to-br from-brand-primary/10 to-transparent dark:from-brand-primary/20 blur-3xl rounded-full"></div>
      <div className="absolute bottom-20 left-[15%] w-96 h-96 bg-gradient-to-tr from-brand-secondary/10 to-transparent dark:from-brand-secondary/20 blur-3xl rounded-full"></div>

      {animated ? (
        <FadeInWhenVisible>{sectionContent}</FadeInWhenVisible>
      ) : (
        sectionContent
      )}
    </section>
  );
}
