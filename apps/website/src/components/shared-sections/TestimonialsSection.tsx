/**
 * Shared Testimonials Section Component
 * Displays project stakeholder testimonials in a consistent format across pages
 * Used on: Homepage, About, Services, Projects pages
 */

import { TestimonialsCarousel } from "@/components/testimonials";
import type { Testimonial } from "@/lib/data/testimonials";
import { BrandedContentSection } from "@/components/templates/BrandedContentSection";
import type { SupportedLocale } from "@/lib/i18n/locale";

interface TestimonialsSectionProps {
  title?: string;
  subtitle?: string;
  description?: string;
  className?: string;
  locale?: SupportedLocale;
  autoPlay?: boolean;
  autoPlayInterval?: number;
  id?: string;
  animated?: boolean;
  headerSize?: "display" | "section";
  testimonials: Testimonial[];
}

export function TestimonialsSection({
  title = "What Our Project Stakeholders Say",
  subtitle = "What Our",
  description = "Hear from valued partners who've experienced our core values in action.",
  className = "",
  locale = "en",
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
        locale={locale}
        autoPlay={autoPlay}
        autoPlayInterval={autoPlayInterval}
      />
    </BrandedContentSection>
  );
}
