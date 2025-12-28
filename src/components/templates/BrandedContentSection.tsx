/**
 * BrandedContentSection Component
 * Full-width section with MH branding (diagonal stripes, color blobs, gradient headers)
 * Provides consistent branded appearance across all major content sections
 * Eliminates 68 lines of repetitive boilerplate per section (82% code reduction)
 */

import { type ReactNode } from "react";
import { MaterialIcon } from "@/components/icons/MaterialIcon";
import { FadeInWhenVisible } from "@/components/animations/FramerMotionComponents";

export interface BrandedContentSectionProps {
  /** Unique ID for section anchor links */
  id: string;

  /** Section header configuration */
  header?: {
    /** Material icon name */
    icon: string;
    /** Icon color variant (use custom for unique pages) */
    iconVariant?: "primary" | "secondary" | "bronze" | "custom";
    /** Custom icon gradient (only used when iconVariant="custom") - e.g. "from-orange-600 via-orange-700 to-orange-600" */
    customIconGradient?: string;
    /** Custom icon blur gradient (only used when iconVariant="custom") - e.g. "from-orange-500/30 to-orange-600/30" */
    customIconBlur?: string;
    /** Custom title gradient (only used when iconVariant="custom") - e.g. "from-orange-600 via-orange-700 to-orange-600" */
    customTitleGradient?: string;
    /** Subtitle (first line, solid color) */
    subtitle: string;
    /** Main title (second line, gradient) */
    title: string;
    /** Description paragraph below title (can include JSX for styled text) */
    description?: ReactNode;
  };

  /** Section content */
  children: ReactNode;

  /** Background variant */
  variant?: "white" | "gray";

  /** Whether to wrap in FadeInWhenVisible animation */
  animated?: boolean;

  /** Additional classes for section element */
  className?: string;

  /** Additional classes for content container */
  containerClassName?: string;
}

/**
 * BrandedContentSection - Full-width section with MH Construction branding
 *
 * Non-coder explanation: "This is the fancy section with the gold/green gradient title
 * and the subtle background patterns (diagonal stripes + color blobs)"
 *
 * Technical features:
 * - DiagonalStripePattern background (#386851 at 45deg)
 * - Large brand color blobs (w-96 h-96 with blur-3xl)
 * - Optional two-line gradient header with Material icon
 * - Responsive padding and spacing
 * - Dark mode support
 * - Automatic FadeInWhenVisible animation
 *
 * @example
 * ```tsx
 * // Standard brand colors (primary, secondary, bronze)
 * <BrandedContentSection
 *   id="our-values"
 *   header={{
 *     icon: "shield",
 *     iconVariant: "primary",
 *     subtitle: "Built on Trust",
 *     title: "Our Core Values",
 *     description: "The principles that guide everything we do."
 *   }}
 * >
 *   <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
 *     // Your content cards
 *   </div>
 * </BrandedContentSection>
 *
 * // Custom colors for unique pages (urgent, veterans, etc.)
 * <BrandedContentSection
 *   id="urgent-response"
 *   header={{
 *     icon: "bolt",
 *     iconVariant: "custom",
 *     customIconGradient: "from-orange-600 via-orange-700 to-orange-800",
 *     customIconBlur: "from-orange-500/30 to-orange-600/30",
 *     customTitleGradient: "from-orange-600 via-orange-700 to-orange-600",
 *     subtitle: "Rapid Response",
 *     title: "Emergency Support",
 *     description: "Available when you need us most."
 *   }}
 * >
 *   // Your urgent content
 * </BrandedContentSection>
 * ```
 */
export function BrandedContentSection({
  id,
  header,
  children,
  variant = "white",
  animated = true,
  className = "",
  containerClassName = "",
}: BrandedContentSectionProps) {
  // Background color based on variant
  const bgClasses =
    variant === "gray"
      ? "bg-gray-50 dark:bg-gray-800"
      : "bg-white dark:bg-gray-900";

  // Icon gradient classes based on variant
  const getIconGradient = (
    iconVariant: "primary" | "secondary" | "bronze" | "custom" = "primary",
    customGradient?: string,
  ) => {
    if (iconVariant === "custom" && customGradient) {
      return customGradient;
    }
    switch (iconVariant) {
      case "bronze":
        return "from-brand-secondary via-bronze-700 to-bronze-800";
      case "secondary":
        return "from-brand-secondary via-brand-secondary-dark to-bronze-700";
      case "primary":
      default:
        return "from-brand-primary via-brand-primary-dark to-brand-primary-darker";
    }
  };

  const getIconBlurGradient = (
    iconVariant: "primary" | "secondary" | "bronze" | "custom" = "primary",
    customBlur?: string,
  ) => {
    if (iconVariant === "custom" && customBlur) {
      return customBlur;
    }
    switch (iconVariant) {
      case "bronze":
        return "from-brand-secondary/30 to-bronze-700/30";
      case "secondary":
        return "from-brand-secondary/30 to-brand-secondary-dark/30";
      case "primary":
      default:
        return "from-brand-primary/30 to-brand-primary-dark/30";
    }
  };

  const getTitleGradient = (
    iconVariant: "primary" | "secondary" | "bronze" | "custom" = "primary",
    customTitleGradient?: string,
  ) => {
    if (iconVariant === "custom" && customTitleGradient) {
      return customTitleGradient;
    }
    // Default: always use brand colors for title gradient
    return "from-brand-primary via-brand-secondary to-brand-primary";
  };

  const content = (
    <>
      {header && (
        <div className="mb-16 sm:mb-20 text-center">
          {/* Icon with decorative lines */}
          <div className="flex items-center justify-center mb-8 gap-4">
            <div className="h-1 w-16 bg-gradient-to-r from-transparent to-gray-300 dark:to-gray-600 rounded-full"></div>
            <div className="relative">
              <div
                className={`absolute -inset-4 bg-gradient-to-br ${getIconBlurGradient(header.iconVariant, header.customIconBlur)} blur-2xl rounded-full`}
              ></div>
              <div
                className={`relative bg-gradient-to-br ${getIconGradient(header.iconVariant, header.customIconGradient)} p-5 rounded-2xl shadow-2xl border-2 border-white/50 dark:border-gray-600`}
              >
                <MaterialIcon
                  icon={header.icon}
                  size="2xl"
                  className="text-white drop-shadow-lg"
                />
              </div>
            </div>
            <div className="h-1 w-16 bg-gradient-to-l from-transparent to-gray-300 dark:to-gray-600 rounded-full"></div>
          </div>

          {/* Two-line gradient heading - CRITICAL: overflow-visible */}
          <h2 className="mb-6 sm:mb-8 font-black text-gray-900 dark:text-gray-100 text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-relaxed tracking-tighter overflow-visible">
            <span className="block mb-3 sm:mb-4 font-semibold text-gray-700 dark:text-gray-200 text-xl xs:text-2xl sm:text-3xl md:text-4xl lg:text-5xl tracking-tight overflow-visible py-1">
              {header.subtitle}
            </span>
            <span
              className={`block bg-gradient-to-r ${getTitleGradient(header.iconVariant, header.customTitleGradient)} bg-clip-text text-transparent font-black drop-shadow-sm overflow-visible py-2 pb-3 leading-normal`}
            >
              {header.title}
            </span>
          </h2>

          {/* Description */}
          {header.description && (
            <p className="mx-auto max-w-5xl font-light text-gray-700 dark:text-gray-300 text-base sm:text-lg md:text-xl lg:text-2xl leading-relaxed tracking-wide px-2">
              {header.description}
            </p>
          )}
        </div>
      )}

      {/* Section Content */}
      {children}
    </>
  );

  return (
    <section
      id={id}
      className={`relative ${bgClasses} py-12 sm:py-16 lg:py-20 xl:py-24 overflow-hidden ${className}`}
    >
      {/* Diagonal Stripe Background Pattern - REQUIRED */}
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

      {/* Large Brand Color Blobs - REQUIRED */}
      <div className="absolute top-20 right-[15%] w-96 h-96 bg-gradient-to-br from-brand-primary/10 to-transparent dark:from-brand-primary/20 blur-3xl rounded-full"></div>
      <div className="absolute bottom-20 left-[15%] w-96 h-96 bg-gradient-to-tr from-brand-secondary/10 to-transparent dark:from-brand-secondary/20 blur-3xl rounded-full"></div>

      {/* Content Container */}
      <div
        className={`relative z-10 mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl ${containerClassName}`}
      >
        {animated ? <FadeInWhenVisible>{content}</FadeInWhenVisible> : content}
      </div>
    </section>
  );
}
