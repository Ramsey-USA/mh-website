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
  description = "Hear from valued partners who've experienced our core values in action.",
  className = "",
  autoPlay = true,
  autoPlayInterval = 5000,
  id,
}: TestimonialsSectionProps) {
  return (
    <section
      id={id}
      className={`relative bg-white dark:bg-gray-900 py-12 sm:py-16 lg:py-20 xl:py-24 overflow-hidden ${className}`}
    >
      {/* Unique Diagonal Stripe Background Pattern */}
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

      {/* Large Brand Color Blobs */}
      <div className="absolute top-20 right-[15%] w-96 h-96 bg-gradient-to-br from-brand-primary/10 to-transparent dark:from-brand-primary/20 blur-3xl rounded-full"></div>
      <div className="absolute bottom-20 left-[15%] w-96 h-96 bg-gradient-to-tr from-brand-secondary/10 to-transparent dark:from-brand-secondary/20 blur-3xl rounded-full"></div>

      <div className="relative z-10 mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
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
