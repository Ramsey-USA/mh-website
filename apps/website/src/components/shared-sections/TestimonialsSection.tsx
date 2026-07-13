/**
 * Shared Testimonials Section Component
 * Displays mission-partner testimonials in a consistent format across pages
 * Used on: Homepage, About, Services, Projects pages
 */

import { TestimonialsCarousel } from "@/components/testimonials";
import type { Testimonial } from "@/lib/data/testimonials";
import { BrandedContentSection } from "@/components/templates/BrandedContentSection";

interface TestimonialsSectionProps {
  title?: string;
  subtitle?: string;
  description?: string;
  className?: string;
  autoPlay?: boolean;
  autoPlayInterval?: number;
  id?: string;
  animated?: boolean;
  headerSize?: "display" | "section";
  testimonials: Testimonial[];
}

export function TestimonialsSection({
  title = "What Our Mission Partners Say",
  subtitle = "What Our",
  description = "Hear from valued partners who've experienced our core values in action.",
  className = "",
  autoPlay = true,
  autoPlayInterval = 5000,
  id,
  animated = false,
  headerSize = "display",
  testimonials,
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
      animated={animated}
      className={className}
      headerSize={headerSize}
    >
      <TestimonialsCarousel
        testimonials={testimonials}
        autoPlay={autoPlay}
        autoPlayInterval={autoPlayInterval}
      />
    </BrandedContentSection>
  );
}
