"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import { MaterialIcon } from "@/components/icons/MaterialIcon";

export interface ContentCardProps {
  /** Card variant for different use cases */
  variant?: "news" | "feature" | "service" | "default";
  /** Material Icon name */
  icon: string;
  /** Icon size for enhanced variant */
  iconSize?: "sm" | "md" | "lg" | "xl";
  /** Category label (e.g., "Company Milestone", "New Technology") */
  category: string;
  /** Category color variant */
  categoryColor?: "primary" | "secondary" | "bronze";
  /** Card title */
  title: string;
  /** Card description/content */
  description: string | ReactNode;
  /** Date or status text (e.g., "Nov 2025", "Coming Soon") */
  date?: string;
  /** Link URL */
  href?: string;
  /** Link text */
  linkText?: string;
  /** Accent gradient for top bar */
  accentGradient?: string;
  /** Border glow gradient for hover effect */
  glowGradient?: string;
  /** Show enhanced icon design (gradient box) */
  enhancedIcon?: boolean;
  /** Additional CSS classes */
  className?: string;
}

const categoryColorClasses = {
  primary: "text-brand-primary",
  secondary: "text-brand-secondary",
  bronze: "text-bronze-700 dark:text-bronze-600",
};

const defaultAccentGradients = {
  primary: "from-brand-primary via-brand-primary-dark to-brand-primary-darker",
  secondary: "from-brand-secondary via-bronze-700 to-brand-secondary",
  bronze: "from-bronze-700 via-bronze-800 to-bronze-700",
};

const defaultGlowGradients = {
  primary: "from-brand-primary/40 to-brand-primary-dark/40",
  secondary: "from-brand-secondary/40 to-bronze-700/40",
  bronze: "from-bronze-700/40 to-bronze-800/40",
};

/**
 * Reusable Content Card Component
 *
 * Provides consistent card design across all pages with:
 * - Gradient accent bar
 * - Animated border glow on hover
 * - Icon with category label
 * - Title, description, and optional link
 * - Hover effects and animations
 *
 * Used for:
 * - News/updates cards
 * - Feature highlights
 * - Service previews
 * - Project showcases
 * - Any content that needs card display
 *
 * @example
 * ```tsx
 * <ContentCard
 *   variant="news"
 *   icon="celebration"
 *   category="Company Milestone"
 *   categoryColor="primary"
 *   title="50+ Successful Projects"
 *   description="We're proud to announce..."
 *   date="Nov 2025"
 *   href="/projects"
 *   linkText="View Our Work"
 * />
 * ```
 */
export function ContentCard({
  variant = "default",
  icon,
  iconSize = "md",
  category,
  categoryColor = "primary",
  title,
  description,
  date,
  href,
  linkText = "Learn More",
  accentGradient,
  glowGradient,
  enhancedIcon = false,
  className = "",
}: ContentCardProps) {
  const categoryClass = categoryColorClasses[categoryColor];
  const accentClass =
    accentGradient ||
    `bg-gradient-to-r ${defaultAccentGradients[categoryColor]}`;
  const glowClass =
    glowGradient || `bg-gradient-to-br ${defaultGlowGradients[categoryColor]}`;

  const cardContent = (
    <div className={`group relative flex h-full ${className}`}>
      {/* Animated Border Glow */}
      <div
        className={`absolute -inset-2 ${glowClass} rounded-2xl opacity-20 group-hover:opacity-100 blur-xl transition-all duration-500 ${
          variant === "news" || variant === "feature"
            ? "group-hover:animate-pulse"
            : ""
        }`}
      ></div>

      <div
        className={`relative bg-white dark:bg-gray-800 rounded-xl border-2 border-gray-200 dark:border-gray-700 group-hover:border-transparent shadow-lg group-hover:shadow-2xl transition-all duration-300 overflow-hidden flex flex-col w-full ${
          variant === "feature" ? "group-hover:-translate-y-1" : ""
        }`}
      >
        {/* Top Accent Bar */}
        <div className={`h-2 ${accentClass}`}></div>

        <div className="pt-6 px-6 pb-6 flex flex-col flex-grow">
          {/* Header: Icon/Category + Date */}
          <div className="flex items-start justify-between mb-3">
            {enhancedIcon ? (
              /* Enhanced Icon Design with Gradient Background */
              <div className="flex items-center gap-2">
                <div className="relative inline-block">
                  <div
                    className={`absolute -inset-2 ${glowClass} opacity-30 blur-lg rounded-xl`}
                  ></div>
                  <div
                    className={`relative rounded-xl ${accentClass.replace("bg-gradient-to-r", "bg-gradient-to-br")} p-2 shadow-xl group-hover:scale-110 transition-all duration-300`}
                  >
                    <MaterialIcon
                      icon={icon}
                      className="text-white drop-shadow-lg"
                      size={iconSize}
                    />
                  </div>
                </div>
                <span
                  className={`font-semibold ${categoryClass} text-xs sm:text-sm`}
                >
                  {category}
                </span>
              </div>
            ) : (
              /* Simple Icon Design */
              <div className="flex items-center gap-2">
                <MaterialIcon
                  icon={icon}
                  className={categoryClass}
                  size={iconSize}
                />
                <span
                  className={`font-semibold ${categoryClass} text-xs sm:text-sm`}
                >
                  {category}
                </span>
              </div>
            )}

            {date && (
              <span className="text-gray-500 dark:text-gray-300 text-xs sm:text-sm flex-shrink-0">
                {date}
              </span>
            )}
          </div>

          {/* Title */}
          <h3 className="mb-3 font-bold text-gray-900 dark:text-gray-100 text-lg sm:text-xl md:text-2xl">
            {title}
          </h3>

          {/* Description */}
          <div className="mb-4 text-gray-600 dark:text-gray-300 flex-grow text-sm sm:text-base md:text-lg">
            {description}
          </div>

          {/* Link (if provided) */}
          {href && (
            <Link
              href={href}
              className="inline-flex items-center text-brand-primary hover:text-brand-secondary transition-colors mt-auto"
            >
              <span className="font-medium text-xs sm:text-sm">{linkText}</span>
              <MaterialIcon icon="arrow_forward" size="sm" className="ml-1" />
            </Link>
          )}
        </div>
      </div>
    </div>
  );

  return cardContent;
}
