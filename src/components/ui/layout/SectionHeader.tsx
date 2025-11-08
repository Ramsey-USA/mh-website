/**
 * SectionHeader Component
 * Reusable section header with consistent typography and spacing
 * Supports title, subtitle, and description with flexible alignment
 */

import { MaterialIcon } from "@/components/icons/MaterialIcon";

export type SectionAlignment = "left" | "center" | "right";

interface SectionHeaderProps {
  title: string | React.ReactNode;
  subtitle?: string | React.ReactNode;
  description?: string | React.ReactNode;
  alignment?: SectionAlignment;
  icon?: string;
  iconClassName?: string;
  className?: string;
  maxWidth?: "sm" | "md" | "lg" | "xl" | "2xl" | "4xl" | "full";
}

/**
 * SectionHeader component for consistent section titles across the site
 *
 * @param title - Main heading (can be string or React element for custom styling)
 * @param subtitle - Optional subtitle shown above title
 * @param description - Optional description shown below title
 * @param alignment - Text alignment (default: center)
 * @param icon - Optional Material icon name shown above title
 * @param iconClassName - Additional classes for icon
 * @param maxWidth - Max width constraint (default: 4xl)
 * @param className - Additional wrapper classes
 *
 * @example
 * ```tsx
 * <SectionHeader
 *   icon="construction"
 *   subtitle="Our Services"
 *   title="What We Build"
 *   description="Professional construction services across Washington State"
 * />
 *
 * // With custom title styling
 * <SectionHeader
 *   title={
 *     <>
 *       <span className="block mb-4">Our Partnership</span>
 *       <span className="text-brand-primary">Process</span>
 *     </>
 *   }
 *   description="From consultation to completion"
 * />
 * ```
 */
export function SectionHeader({
  title,
  subtitle,
  description,
  alignment = "center",
  icon,
  iconClassName = "",
  className = "",
  maxWidth = "4xl",
}: SectionHeaderProps) {
  const alignClass = {
    left: "text-left",
    center: "text-center",
    right: "text-right",
  }[alignment];

  const maxWidthClass = {
    sm: "max-w-sm",
    md: "max-w-md",
    lg: "max-w-lg",
    xl: "max-w-xl",
    "2xl": "max-w-2xl",
    "4xl": "max-w-4xl",
    full: "max-w-full",
  }[maxWidth];

  return (
    <div
      className={`mx-auto mb-16 lg:mb-24 ${maxWidthClass} ${alignClass} ${className}`}
    >
      {/* Optional Icon */}
      {icon && (
        <div
          className={`flex ${alignment === "center" ? "justify-center" : alignment === "right" ? "justify-end" : "justify-start"} mb-6`}
        >
          <div
            className={`flex justify-center items-center bg-brand-primary rounded-full w-16 h-16 ${iconClassName}`}
          >
            <MaterialIcon icon={icon} size="lg" className="text-white" />
          </div>
        </div>
      )}

      {/* Subtitle */}
      {subtitle && (
        <div className="mb-4">
          {typeof subtitle === "string" ? (
            <p className="font-semibold text-gray-700 dark:text-gray-300 text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl tracking-tight">
              {subtitle}
            </p>
          ) : (
            subtitle
          )}
        </div>
      )}

      {/* Main Title */}
      <div className="mb-8 pb-2">
        {typeof title === "string" ? (
          <h2 className="font-black text-gray-900 dark:text-white text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl leading-tight tracking-tighter">
            {title}
          </h2>
        ) : (
          <h2 className="font-black text-gray-900 dark:text-white text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl leading-tight tracking-tighter">
            {title}
          </h2>
        )}
      </div>

      {/* Description */}
      {description && (
        <div>
          {typeof description === "string" ? (
            <p className="mx-auto max-w-4xl font-light text-gray-600 dark:text-gray-300 text-lg sm:text-xl md:text-2xl lg:text-3xl leading-relaxed tracking-wide px-2">
              {description}
            </p>
          ) : (
            description
          )}
        </div>
      )}
    </div>
  );
}
