"use client";

import { type ReactNode } from "react";
import Link from "next/link";
import { MaterialIcon } from "@/components/icons/MaterialIcon";
import { Button } from "@/components/ui/base/button";
import { PageNavigation } from "@/components/navigation/PageNavigation";
import { type NavigationItem } from "@/components/navigation/navigationConfigs";

/**
 * HeroSection Component
 *
 * Reusable hero section with consistent MH brand styling
 * Supports customizable title, subtitle, background, and CTA.
 *
 * @component
 * @example
 * <HeroSection
 *   title="Public Sector"
 *   subtitle="Mission-Ready, Compliance-Driven"
 *   tagline="Veteran-Owned Partnership"
 *   backgroundGradient="from-gray-900 via-gray-700 to-gray-900"
 *   icon="account_balance"
 *   navigation={navigationConfigs.publicSector}
 *   cta={{ label: "Request Consultation", href: "/contact" }}
 * />
 *
 * @param {HeroSectionProps} props
 * @returns {React.ReactElement}
 */

export interface HeroSectionProps {
  /** Main title text */
  title: string;
  /** Secondary subtitle (appears smaller above title) */
  subtitle?: string;
  /** Tagline/accent text (appears in brand color) */
  tagline?: string;
  /** Bottom accent/footer text */
  footerText?: string;
  /** Background gradient class */
  backgroundGradient?: string;
  /** Icon name for Material Icon */
  icon?: string;
  /** Icon aria label for accessibility */
  iconLabel?: string;
  /** Navigation items to display */
  navigation?: NavigationItem[];
  /** CTA button configuration */
  cta?: {
    label: string;
    href: string;
    variant?: "primary" | "secondary" | "outline";
  };
  /** Secondary CTA button */
  secondaryCta?: {
    label: string;
    href: string;
    variant?: "primary" | "secondary" | "outline";
  };
  /** Custom children to render instead of default layout */
  children?: ReactNode;
  /** Positioning alignment (default: right) */
  align?: "left" | "center" | "right";
  /** Text color theme (default: white) */
  textColor?: "white" | "dark" | "brand";
  /** Additional CSS classes */
  className?: string;
}

export function HeroSection({
  title,
  subtitle,
  tagline,
  footerText,
  backgroundGradient = "from-gray-900 via-gray-700 to-gray-900",
  icon,
  iconLabel,
  navigation,
  cta,
  secondaryCta,
  children,
  align = "right",
  textColor = "white",
  className = "",
}: HeroSectionProps) {
  const textColorClass =
    textColor === "white"
      ? "text-white"
      : textColor === "brand"
        ? "text-brand-primary"
        : "text-gray-900";

  const alignmentClass = {
    left: "justify-start",
    center: "justify-center",
    right: "justify-end",
  }[align];

  return (
    <section
      className={`relative bg-gradient-to-br ${backgroundGradient} h-screen flex items-end ${alignmentClass} ${textColor === "white" ? "text-white" : ""} overflow-hidden ${className}`}
    >
      {/* Background Elements */}
      <div
        className={`absolute inset-0 bg-gradient-to-br ${backgroundGradient.replace("from-", "from-opacity-30 ").replace("to-", "to-opacity-20 ")} opacity-40`}
      ></div>

      {/* Content */}
      <div
        className={`relative z-30 mb-32 sm:mb-36 md:mb-40 lg:mb-44 ${align === "right" ? "mr-4 sm:mr-6 lg:mr-8 xl:mr-12 ml-auto" : align === "left" ? "ml-4 sm:ml-6 lg:ml-8 xl:ml-12 mr-auto" : "mx-auto"} max-w-2xl pointer-events-none pb-2`}
      >
        {children ? (
          children
        ) : (
          <>
            {/* Icon with decorative background */}
            {icon && (
              <div
                className={`flex ${align === "right" ? "justify-end" : align === "left" ? "justify-start" : "justify-center"} mb-4`}
              >
                <div className="relative p-4 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm rounded-2xl border-2 border-white/30 shadow-2xl">
                  <MaterialIcon
                    icon={icon}
                    size="4xl"
                    className={`text-${textColor === "white" ? "white" : "brand-primary"} drop-shadow-lg`}
                    ariaLabel={iconLabel || title}
                  />
                </div>
              </div>
            )}

            {/* Title Section */}
            <h1
              className={`${align === "right" ? "text-right" : align === "left" ? "text-left" : "text-center"} text-lg xs:text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-black ${textColorClass} drop-shadow-2xl leading-tight tracking-tight`}
            >
              {subtitle && (
                <span className="block text-brand-secondary text-sm xs:text-base sm:text-lg md:text-xl lg:text-2xl mb-1">
                  {subtitle}
                </span>
              )}
              {tagline && (
                <span className="block text-brand-secondary mb-1">
                  {tagline}
                </span>
              )}
              <span className="block">{title}</span>
              {footerText && (
                <span
                  className={`block ${textColor === "white" ? "text-white/90" : "text-gray-700"} mt-2`}
                >
                  {footerText}
                </span>
              )}
            </h1>

            {/* CTA Buttons */}
            {(cta || secondaryCta) && (
              <div
                className={`flex flex-col sm:flex-row gap-4 mt-8 ${align === "right" ? "justify-end" : align === "left" ? "justify-start" : "justify-center"} pointer-events-auto`}
              >
                {cta && (
                  <Link href={cta.href}>
                    <Button
                      variant={cta.variant || "primary"}
                      size="lg"
                      className="transition-all duration-300 min-w-[200px]"
                    >
                      {cta.label}
                    </Button>
                  </Link>
                )}
                {secondaryCta && (
                  <Link href={secondaryCta.href}>
                    <Button
                      variant={secondaryCta.variant || "outline"}
                      size="lg"
                      className="transition-all duration-300 min-w-[200px]"
                    >
                      {secondaryCta.label}
                    </Button>
                  </Link>
                )}
              </div>
            )}
          </>
        )}
      </div>

      {/* Page Navigation */}
      {navigation && (
        <PageNavigation
          items={navigation}
          className="absolute bottom-0 left-0 right-0"
        />
      )}
    </section>
  );
}

export default HeroSection;
