/**
 * Shared Testimonials Section Component
 * Displays client partner testimonials in a consistent format across pages
 * Used on: Homepage, About, Services, Projects pages
 */

"use client";

import { MaterialIcon } from "@/components/icons/MaterialIcon";
import { TestimonialsCarousel } from "@/components/testimonials";
import { getClientTestimonials } from "@/lib/data/testimonials";

interface TestimonialsSectionProps {
  title?: string;
  subtitle?: string;
  description?: string;
  className?: string;
  autoPlay?: boolean;
  autoPlayInterval?: number;
  id?: string;
}

export function TestimonialsSection({
  title = "What Our Client Partners Say",
  subtitle = "What Our",
  description = "Read testimonials from valued partners across the Pacific Northwest who have experienced our collaborative excellence firsthand.",
  className = "",
  autoPlay = true,
  autoPlayInterval = 5000,
  id,
}: TestimonialsSectionProps) {
  return (
    <section
      id={id}
      className={`relative bg-gradient-to-b from-white via-gray-50 to-white dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 py-12 sm:py-16 lg:py-24 xl:py-32 testimonials-section overflow-hidden ${className}`}
    >
      {/* Enhanced Background Effects */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(189,146,100,0.08)_0%,transparent_50%)] dark:bg-[radial-gradient(circle_at_top_left,rgba(189,146,100,0.15)_0%,transparent_50%)]"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,rgba(56,104,81,0.06)_0%,transparent_50%)] dark:bg-[radial-gradient(circle_at_bottom_right,rgba(56,104,81,0.12)_0%,transparent_50%)]"></div>
      <div className="top-20 left-10 absolute bg-brand-secondary/10 dark:bg-brand-secondary/20 blur-3xl rounded-full w-32 h-32 animate-pulse"></div>
      <div
        className="right-10 bottom-20 absolute bg-brand-primary/10 dark:bg-brand-primary/20 blur-3xl rounded-full w-40 h-40 animate-pulse"
        style={{ animationDelay: "1s" }}
      ></div>
      <div
        className="top-1/2 right-1/4 absolute bg-brand-secondary/5 dark:bg-brand-secondary/10 blur-3xl rounded-full w-24 h-24 animate-pulse"
        style={{ animationDelay: "0.5s" }}
      ></div>

      <div className="relative mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <div className="mb-12 sm:mb-16 lg:mb-20 text-center scroll-reveal">
          <div className="flex justify-center items-center mb-6 sm:mb-8">
            <div className="relative">
              <div className="absolute inset-0 bg-brand-secondary/20 dark:bg-brand-secondary/30 blur-xl rounded-full"></div>
              <div className="relative bg-gradient-to-br from-brand-secondary to-brand-secondary-dark p-4 rounded-2xl shadow-lg">
                <MaterialIcon icon="forum" size="2xl" className="text-white" />
              </div>
            </div>
          </div>
          <h2 className="mb-6 sm:mb-8 font-black text-gray-900 dark:text-gray-100 text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-tight tracking-tighter">
            <span className="block mb-3 sm:mb-4 font-semibold text-gray-700 dark:text-gray-300 text-xl xs:text-2xl sm:text-3xl md:text-4xl lg:text-5xl tracking-tight">
              {subtitle}
            </span>
            <span className="block text-brand-primary dark:text-brand-primary-light font-black drop-shadow-sm">
              {title}
            </span>
          </h2>
          <p className="mx-auto max-w-5xl font-light text-gray-600 dark:text-gray-300 text-base sm:text-lg md:text-xl lg:text-2xl leading-relaxed tracking-wide px-4 break-words">
            {description}
          </p>
        </div>

        <TestimonialsCarousel
          testimonials={getClientTestimonials()}
          autoPlay={autoPlay}
          autoPlayInterval={autoPlayInterval}
        />
      </div>
    </section>
  );
}
