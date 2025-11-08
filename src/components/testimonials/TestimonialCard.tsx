"use client";

import { MaterialIcon } from "@/components/icons/MaterialIcon";
import type { Testimonial } from "@/lib/data/testimonials";

interface TestimonialCardProps {
  testimonial: Testimonial;
  variant?: "client" | "employee" | "veteran" | "default";
  showImage?: boolean;
  showRating?: boolean;
  showRole?: boolean;
  className?: string;
}

export function TestimonialCard({
  testimonial,
  variant = "default",
  showImage = true,
  showRating = true,
  showRole = true,
  className = "",
}: TestimonialCardProps) {
  // Determine colors based on variant
  const variantStyles = {
    client: {
      borderColor: "border-brand-primary dark:border-brand-primary/50",
      iconBg: "from-brand-primary to-brand-secondary",
      quoteColor: "text-brand-secondary",
    },
    employee: {
      borderColor: "border-brand-secondary dark:border-brand-secondary/50",
      iconBg: "from-brand-secondary to-brand-accent",
      quoteColor: "text-brand-accent",
    },
    veteran: {
      borderColor: "border-brand-accent dark:border-brand-accent/50",
      iconBg: "from-brand-accent to-brand-primary",
      quoteColor: "text-brand-primary",
    },
    default: {
      borderColor: "border-gray-200 dark:border-gray-700",
      iconBg: "from-brand-primary to-brand-secondary",
      quoteColor: "text-brand-secondary",
    },
  };

  const activeVariant = variant === "default" ? testimonial.type : variant;
  const styles = variantStyles[activeVariant] || variantStyles.default;

  return (
    <div
      className={`group relative bg-white dark:bg-gray-800 shadow-lg hover:shadow-2xl p-4 sm:p-6 lg:p-8 rounded-2xl sm:rounded-3xl h-full transition-all duration-500 min-h-[280px] sm:min-h-[320px] ${styles.borderColor} border ${className}`}
    >
      {/* Quote Icon */}
      <div
        className={`absolute top-4 right-4 sm:top-6 sm:right-6 flex justify-center items-center bg-${activeVariant === "client" ? "brand-secondary" : "brand-primary"}/10 p-2 rounded-full w-10 h-10 sm:w-12 sm:h-12 group-hover:scale-110 transition-transform duration-300`}
      >
        <svg
          className={`w-full h-full ${styles.quoteColor}`}
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M4.583 17.321C3.553 16.227 3 15 3 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 01-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179zm10 0C13.553 16.227 13 15 13 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 01-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179z" />
        </svg>
      </div>

      {/* Header with Avatar/Initials */}
      <div className="flex items-start space-x-3 sm:space-x-4 mb-4 sm:mb-6">
        {showImage && (
          <div
            className={`flex-shrink-0 flex justify-center items-center bg-gradient-to-br ${styles.iconBg} shadow-lg p-2 sm:p-3 rounded-xl sm:rounded-2xl w-12 h-12 sm:w-16 sm:h-16 group-hover:scale-110 transition-transform duration-300`}
          >
            <span className="font-bold text-white text-lg sm:text-2xl">
              {testimonial.name.charAt(0)}
            </span>
          </div>
        )}
        <div className="flex-1 min-w-0">
          <p className="mb-1 sm:mb-2 font-black text-gray-900 dark:text-gray-100 text-lg sm:text-xl md:text-2xl tracking-tight">
            {testimonial.name}
          </p>

          {/* Client Info */}
          {testimonial.type === "client" && (
            <>
              {testimonial.location && (
                <p className="mb-2 sm:mb-3 font-medium text-gray-600 dark:text-gray-400 text-xs sm:text-sm md:text-base tracking-wide">
                  {testimonial.location}
                  {testimonial.project && (
                    <>
                      {" • "}
                      <span className="font-bold text-brand-primary">
                        {testimonial.project}
                      </span>
                    </>
                  )}
                </p>
              )}
              {testimonial.company && (
                <p className="mb-2 text-gray-600 dark:text-gray-400 text-xs sm:text-sm">
                  {testimonial.company}
                </p>
              )}
            </>
          )}

          {/* Employee Info */}
          {(testimonial.type === "employee" ||
            testimonial.type === "veteran") &&
            showRole && (
              <>
                {testimonial.role && (
                  <p className="mb-1 font-semibold text-brand-primary text-sm sm:text-base">
                    {testimonial.role}
                  </p>
                )}
                {testimonial.title && (
                  <p className="text-gray-600 dark:text-gray-400 text-xs sm:text-sm">
                    {testimonial.title}
                  </p>
                )}
              </>
            )}

          {/* Star Rating */}
          {showRating && testimonial.rating && (
            <div className="flex space-x-1 mt-2">
              {Array.from({ length: testimonial.rating }).map((_, i) => (
                <MaterialIcon
                  key={i}
                  icon="star"
                  size="sm"
                  className="text-yellow-400"
                />
              ))}
            </div>
          )}

          {/* Veteran Badge */}
          {testimonial.veteranStatus && (
            <div className="flex items-center gap-1 bg-brand-accent/10 dark:bg-brand-accent/20 mt-2 px-2 py-1 rounded w-fit">
              <MaterialIcon
                icon="military_tech"
                size="sm"
                className="text-brand-accent"
              />
              <span className="font-semibold text-brand-accent text-xs">
                Veteran
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Quote */}
      <blockquote className="font-light text-gray-700 dark:text-gray-300 text-sm sm:text-base md:text-lg lg:text-xl italic leading-relaxed tracking-wide">
        "{testimonial.quote}"
      </blockquote>
    </div>
  );
}
