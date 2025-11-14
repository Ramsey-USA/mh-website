"use client";

import Link from "next/link";
import { Button } from "@/components/ui";
import { MaterialIcon } from "@/components/icons/MaterialIcon";
import { TestimonialCard } from "./TestimonialCard";
import {
  FadeInWhenVisible,
  StaggeredFadeIn,
} from "@/components/animations/FramerMotionComponents";
import type { Testimonial } from "@/lib/data/testimonials";

interface TestimonialGridProps {
  testimonials: Testimonial[];
  title?: string;
  subtitle?: string;
  variant?: "client" | "employee" | "veteran" | "default";
  maxItems?: number;
  showViewMoreButton?: boolean;
  viewMoreHref?: string;
  showImage?: boolean;
  showRating?: boolean;
  showRole?: boolean;
  columns?: 1 | 2 | 3 | 4;
  className?: string;
}

export function TestimonialGrid({
  testimonials,
  title = "What People Say",
  subtitle,
  variant = "default",
  maxItems,
  showViewMoreButton = false,
  viewMoreHref = "/about#testimonials",
  showImage = true,
  showRating = true,
  showRole = true,
  columns = 3,
  className = "",
}: TestimonialGridProps) {
  const displayTestimonials = maxItems
    ? testimonials.slice(0, maxItems)
    : testimonials;

  const gridCols = {
    1: "grid-cols-1",
    2: "grid-cols-1 md:grid-cols-2",
    3: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
    4: "grid-cols-1 md:grid-cols-2 lg:grid-cols-4",
  };

  // Show "Coming Soon" message if no testimonials
  const hasNoTestimonials = displayTestimonials.length === 0;

  return (
    <section
      className={`relative bg-gradient-to-b from-gray-50 dark:from-gray-800 to-white dark:to-gray-900 py-8 sm:py-12 lg:py-16 ${className}`}
    >
      {/* Decorative background elements */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_25%,rgba(189,146,100,0.05)_0%,transparent_50%)] opacity-60"></div>
      <div className="top-20 left-20 absolute bg-brand-primary/5 blur-3xl rounded-full w-40 h-40"></div>
      <div className="right-20 bottom-20 absolute bg-brand-secondary/5 blur-3xl rounded-full w-32 h-32"></div>

      <div className="relative mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        {/* Header */}
        {(title || subtitle) && (
          <FadeInWhenVisible className="mb-12 sm:mb-16 lg:mb-20 text-center">
            {title && (
              <h2 className="mb-6 font-black text-gray-900 dark:text-gray-100 text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-tight tracking-tighter">
                <span className="block mb-4 font-semibold text-gray-700 dark:text-gray-300 text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl tracking-tight">
                  {title.split(" ").slice(0, -1).join(" ")}
                </span>
                <span className="block text-brand-primary dark:text-brand-primary font-black">
                  {title.split(" ").slice(-1)}
                </span>
              </h2>
            )}
            {subtitle && (
              <p className="mx-auto max-w-5xl font-light text-gray-600 dark:text-gray-300 text-base sm:text-lg md:text-xl lg:text-2xl leading-relaxed tracking-wide px-4 break-words">
                {subtitle}
              </p>
            )}
          </FadeInWhenVisible>
        )}

        {/* Testimonials Grid or Coming Soon Message */}
        {hasNoTestimonials ? (
          <FadeInWhenVisible>
            <div className="relative bg-white dark:bg-gray-800 shadow-2xl rounded-3xl p-8 sm:p-12 lg:p-16 flex flex-col justify-center items-center min-h-[400px]">
              <MaterialIcon
                icon="construction"
                size="4xl"
                className="text-brand-primary mb-6"
              />
              <h3 className="mb-4 font-black text-gray-900 dark:text-white text-3xl sm:text-4xl md:text-5xl text-center">
                Coming Soon
              </h3>
              <p className="max-w-2xl font-light text-gray-600 dark:text-gray-300 text-lg sm:text-xl md:text-2xl text-center leading-relaxed">
                Testimonials will be available soon. We're committed to sharing
                only authentic feedback from our valued partners and team
                members.
              </p>
            </div>
          </FadeInWhenVisible>
        ) : (
          <StaggeredFadeIn
            className={`gap-4 sm:gap-6 grid ${gridCols[columns]} mb-8 sm:mb-12`}
          >
            {displayTestimonials.map((testimonial) => (
              <TestimonialCard
                key={testimonial.id}
                testimonial={testimonial}
                variant={variant}
                showImage={showImage}
                showRating={showRating}
                showRole={showRole}
              />
            ))}
          </StaggeredFadeIn>
        )}

        {/* View More Button */}
        {showViewMoreButton && !hasNoTestimonials && (
          <FadeInWhenVisible className="text-center">
            <Link href={viewMoreHref}>
              <Button
                variant="secondary"
                size="lg"
                className="group transition-all duration-300 w-full sm:w-auto min-h-[48px] touch-manipulation"
              >
                <MaterialIcon
                  icon="rate_review"
                  size="lg"
                  className="mr-2 sm:mr-3 flex-shrink-0"
                />
                <span className="font-medium text-sm sm:text-base">
                  View All Reviews
                </span>
                <MaterialIcon
                  icon="arrow_forward"
                  size="sm"
                  className="ml-2 group-hover:translate-x-1 transition-transform duration-300"
                />
              </Button>
            </Link>
          </FadeInWhenVisible>
        )}
      </div>
    </section>
  );
}
