/**
 * Shared Testimonials Section Component
 * Displays client testimonials in a consistent format across pages
 * Used on: Homepage, About, Services, Projects pages
 */

"use client";

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
  title = "What Our Clients Say",
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
      className={`relative bg-gradient-to-b from-gray-50 dark:from-gray-800 to-white dark:to-gray-900 py-8 sm:py-12 lg:py-16 testimonials-section ${className}`}
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_25%,rgba(189,146,100,0.05)_0%,transparent_50%)] opacity-60"></div>
      <div className="top-20 left-20 absolute bg-brand-primary/5 blur-3xl rounded-full w-40 h-40"></div>
      <div className="right-20 bottom-20 absolute bg-brand-secondary/5 blur-3xl rounded-full w-32 h-32"></div>

      <div className="relative mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <div className="mb-12 sm:mb-16 lg:mb-20 text-center scroll-reveal">
          <h2 className="mb-6 font-black text-gray-900 dark:text-gray-100 text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-tight tracking-tighter">
            <span className="block mb-4 font-semibold text-gray-700 dark:text-gray-300 text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl tracking-tight">
              {subtitle}
            </span>
            <span className="block text-brand-primary dark:text-brand-primary font-black">
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
