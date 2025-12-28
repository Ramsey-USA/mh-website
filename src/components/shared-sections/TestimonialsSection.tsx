/**
 * Shared Testimonials Section Component
 * Displays client partner testimonials in a consistent format across pages
 * Used on: Homepage, About, Services, Projects pages
 */

"use client";

import { TestimonialsCarousel } from "@/components/testimonials";
import { getClientTestimonials } from "@/lib/data/testimonials";
import { BrandedContentSection } from "@/components/templates/BrandedContentSection";

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
    <BrandedContentSection
      id={id || "testimonials"}
      header={{
        icon: "forum",
        iconVariant: "secondary",
        subtitle,
        title,
        description,
      }}
      className={className}
    >
      <TestimonialsCarousel
        testimonials={getClientTestimonials()}
        autoPlay={autoPlay}
        autoPlayInterval={autoPlayInterval}
      />
    </BrandedContentSection>
  );
}
