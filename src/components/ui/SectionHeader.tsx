import { MaterialIcon } from "@/components/icons/MaterialIcon";
import { FadeInWhenVisible } from "@/components/animations/FramerMotionComponents";

export interface SectionHeaderProps {
  /**
   * Material icon name for the header
   */
  icon: string;
  /**
   * Subtitle text that appears above the main title (smaller, gradient text)
   */
  subtitle: string;
  /**
   * Main title text (large, bold, gradient)
   */
  title: string;
  /**
   * Optional description text below the title
   */
  description?: string;
  /**
   * Optional additional content to display below the description
   */
  children?: React.ReactNode;
  /**
   * Icon color variant - Use official color standards for consistency
   * @default "primary"
   * - primary: Green (trust, values, integrity)
   * - secondary: Tan/Orange (partnerships, relationships)
   * - bronze: Bronze/Gold (excellence, awards, premium)
   * - multi: Multi-color gradient (featured/hero sections)
   */
  iconVariant?: "primary" | "secondary" | "bronze" | "multi";
  /**
   * @deprecated Use iconVariant instead for standardized colors
   * Custom icon gradient colors (only use for special cases)
   */
  iconGradient?: string;
  /**
   * Center alignment (default true)
   */
  centered?: boolean;
  /**
   * Dark mode variant for light-text-on-dark-background sections (default false)
   */
  darkVariant?: boolean;
}

/**
 * Universal Section Header Component
 *
 * Authoritative, serious design matching veteran/honesty values.
 * Features bold typography, military-inspired precision, and professional presence.
 *
 * @example
 * ```tsx
 * <SectionHeader
 *   icon="shield"
 *   iconVariant="primary"
 *   subtitle="Veteran-Owned Values That"
 *   title="Build Lasting Trust"
 *   description="Four foundational values guide every honest conversation..."
 * />
 * ```
 */
export function SectionHeader({
  icon,
  subtitle,
  title,
  description,
  children,
  iconVariant = "primary",
  iconGradient,
  centered = true,
  darkVariant = false,
}: SectionHeaderProps) {
  // Icon color variant configurations (v1.1.0 - December 2025)
  const iconVariantStyles = {
    primary: {
      glowBg:
        "bg-gradient-to-br from-brand-primary/20 to-brand-primary-dark/20 dark:from-brand-primary/30 dark:to-brand-primary-light/30",
      iconBg:
        "bg-gradient-to-br from-brand-primary via-brand-primary-dark to-brand-primary-darker dark:from-brand-primary-light dark:via-brand-primary dark:to-brand-primary-dark",
    },
    secondary: {
      glowBg:
        "bg-gradient-to-br from-brand-secondary/20 to-bronze-600/20 dark:from-brand-secondary/30 dark:to-bronze-400/30",
      iconBg:
        "bg-gradient-to-br from-brand-secondary via-brand-secondary-dark to-bronze-700 dark:from-brand-secondary-light dark:via-brand-secondary dark:to-bronze-600",
    },
    bronze: {
      glowBg:
        "bg-gradient-to-br from-brand-accent/25 to-bronze-500/25 dark:from-brand-accent/35 dark:to-bronze-400/35",
      iconBg:
        "bg-gradient-to-br from-brand-accent via-bronze-700 to-bronze-800 dark:from-bronze-400 dark:via-brand-accent dark:to-bronze-600",
    },
    multi: {
      glowBg:
        "bg-gradient-to-br from-brand-primary/20 via-brand-secondary/20 to-bronze-600/20 dark:from-brand-primary/30 dark:via-brand-secondary/30 dark:to-bronze-400/30",
      iconBg:
        "bg-gradient-to-br from-brand-primary via-brand-secondary to-bronze-700 dark:from-brand-primary-light dark:via-brand-secondary dark:to-bronze-500",
    },
  };

  // Get selected variant styles (or use custom iconGradient if provided for backwards compatibility)
  const selectedVariant = iconVariantStyles[iconVariant];
  const glowClassName = selectedVariant.glowBg;
  const iconBgClassName = iconGradient || selectedVariant.iconBg;

  // Color classes based on darkVariant
  const lineColor = darkVariant
    ? "bg-gradient-to-r from-transparent to-white/50"
    : "bg-gradient-to-r from-transparent to-brand-primary";
  const lineColorReverse = darkVariant
    ? "bg-gradient-to-l from-transparent to-white/50"
    : "bg-gradient-to-l from-transparent to-brand-secondary";
  const iconBorder = darkVariant
    ? "border-white/50"
    : "border-white/50 dark:border-gray-700/50";
  const subtitleColor = darkVariant
    ? "text-white/90 border-white/30"
    : "text-brand-primary dark:text-brand-primary-light border-brand-primary/30";
  const titleColor = darkVariant
    ? "text-white"
    : "text-gray-900 dark:text-white";
  const descriptionColor = darkVariant
    ? "text-white/90"
    : "text-gray-700 dark:text-gray-300";

  return (
    <FadeInWhenVisible>
      <div
        className={`mb-16 sm:mb-20 lg:mb-24 ${centered ? "text-center" : ""}`}
      >
        {/* Decorative Icon with Military-Inspired Precision */}
        <div
          className={`flex items-center ${centered ? "justify-center" : ""} mb-8 gap-4`}
        >
          <div className={`h-0.5 w-12 sm:w-16 ${lineColor} rounded-full`}></div>
          <div className="relative">
            {/* Enhanced v1.1.0 glow effect with extended blur */}
            <div
              className={`absolute -inset-4 ${glowClassName} blur-2xl rounded-full`}
            ></div>
            {/* Icon container - sharp, bold, authoritative */}
            <div
              className={`relative ${iconBgClassName} p-4 sm:p-5 rounded-2xl shadow-2xl border-2 ${iconBorder}`}
            >
              <MaterialIcon
                icon={icon}
                size="2xl"
                className="text-white drop-shadow-lg"
              />
            </div>
          </div>
          <div
            className={`h-0.5 w-12 sm:w-16 ${lineColorReverse} rounded-full`}
          ></div>
        </div>

        {/* Sharp, Direct Typography - Military Precision */}
        <div className="space-y-4 sm:space-y-6">
          {/* Subtitle - Authoritative Lead-In */}
          <div>
            <p
              className={`inline-block font-bold uppercase tracking-wider ${subtitleColor} text-xs sm:text-sm md:text-base mb-2 border-b-2 pb-1`}
            >
              {subtitle}
            </p>
          </div>

          {/* Title - Commanding Presence */}
          <h2
            className={`font-black ${titleColor} text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-[1.3] tracking-tight py-2`}
          >
            <span
              className={`${darkVariant ? "text-brand-secondary" : "bg-gradient-to-r from-brand-primary via-bronze-600 to-brand-secondary bg-clip-text text-transparent"} drop-shadow-sm`}
              style={{ display: "inline", paddingBottom: "0.15em" }}
            >
              {title}
            </span>
          </h2>

          {/* Description - Clear, Direct Communication */}
          {description && (
            <p
              className={`${centered ? "mx-auto max-w-4xl" : "max-w-4xl"} font-medium ${descriptionColor} text-base sm:text-lg md:text-xl lg:text-2xl leading-relaxed`}
            >
              {description}
            </p>
          )}
        </div>

        {/* Optional Additional Content */}
        {children && <div className="mt-8 sm:mt-10">{children}</div>}
      </div>
    </FadeInWhenVisible>
  );
}
