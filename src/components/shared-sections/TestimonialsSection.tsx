/**
 * Shared Testimonials Section Component
 * Displays client partner testimonials in a consistent format across pages
 * Used on: Homepage, About, Services, Projects pages
 */

"use client";

import { TestimonialsCarousel } from "@/components/testimonials";
import { getClientTestimonials } from "@/lib/data/testimonials";
import { SectionHeader } from "@/components/ui/SectionHeader";

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
  description = "Hear from valued partners who've experienced our service-earned values in action—military-grade honesty, integrity, professionalism, and thoroughness building trust on every construction mission.",
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
        <SectionHeader
          icon="forum"
          subtitle={subtitle}
          title={title}
          description={description}
          iconGradient="from-brand-secondary via-brand-secondary-dark to-bronze-700 dark:from-brand-secondary-dark dark:via-brand-secondary dark:to-bronze-800"
        />

        <TestimonialsCarousel
          testimonials={getClientTestimonials()}
          autoPlay={autoPlay}
          autoPlayInterval={autoPlayInterval}
        />
      </div>
    </section>
  );
}
