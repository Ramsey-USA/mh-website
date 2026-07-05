/**
 * Testimonials Section
 * Displays Client Partner testimonials from completed projects
 */

import { MaterialIcon } from "@/components/icons/MaterialIcon";
import type { ProjectPortfolio } from "@/lib/types";
import type { Testimonial } from "@/lib/data/testimonials";
import { Card } from "@/components/ui";
import {
  DiagonalStripePattern,
  BrandColorBlobs,
} from "@/components/ui/backgrounds";

interface TestimonialsSectionProps {
  projects?: ProjectPortfolio[];
  testimonials?: Testimonial[];
  title?: string;
  subtitle?: string;
  description?: string;
  clientPartnerLabel?: string;
  starRatingAriaSuffix?: string;
}

export function TestimonialsSection({
  projects,
  testimonials,
  title = "Project Testimonials",
  subtitle = "Client Partner Feedback",
  description = "Direct feedback from Client Partners on communication, craftsmanship, and follow-through.",
  clientPartnerLabel = "Client Partner",
  starRatingAriaSuffix = "star rating",
}: Readonly<TestimonialsSectionProps>) {
  const testimonialsProjects = projects
    ? projects.filter((p) => p.clientTestimonial).slice(0, 4)
    : [];

  const clientTestimonials = projects ? [] : (testimonials ?? []);

  if (testimonialsProjects.length === 0 && clientTestimonials.length === 0) {
    return null;
  }

  return (
    <section
      id="testimonials"
      className="relative bg-white dark:bg-gray-900 py-10 sm:py-14 lg:py-18 xl:py-20 overflow-hidden"
    >
      <DiagonalStripePattern />
      <BrandColorBlobs />

      <div className="relative z-10 mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <div className="mx-auto max-w-4xl">
          {/* Section Header - Military Construction Standard */}
          <div className="mb-12 sm:mb-14 text-center">
            {/* Icon with decorative lines */}
            <div className="flex items-center justify-center mb-6 gap-3 sm:gap-4">
              <div className="h-1 w-16 bg-linear-to-r from-transparent to-gray-300 dark:to-gray-600 rounded-full"></div>
              <div className="relative">
                <div className="absolute -inset-4 bg-linear-to-br from-brand-secondary/30 to-bronze-600/30 blur-2xl rounded-full"></div>
                <div className="relative bg-linear-to-br from-brand-secondary via-bronze-700 to-bronze-800 p-5 rounded-2xl shadow-2xl border-2 border-white/50 dark:border-gray-600">
                  <MaterialIcon
                    icon="forum"
                    size="2xl"
                    className="text-white drop-shadow-lg"
                  />
                </div>
              </div>
              <div className="h-1 w-16 bg-linear-to-l from-transparent to-gray-300 dark:to-gray-600 rounded-full"></div>
            </div>

            {/* Two-line gradient heading */}
            <h2 className="mb-5 sm:mb-6 font-black text-gray-900 dark:text-white text-3xl xs:text-4xl sm:text-5xl md:text-5xl lg:text-6xl leading-tight tracking-tighter overflow-visible">
              <span className="block mb-2 sm:mb-3 font-semibold text-gray-700 dark:text-gray-200 text-xl xs:text-2xl sm:text-3xl md:text-3xl lg:text-4xl tracking-tight overflow-visible py-1">
                {subtitle}
              </span>
              <span className="block bg-linear-to-r from-brand-primary via-brand-secondary to-brand-primary bg-clip-text text-transparent font-black drop-shadow-sm overflow-visible py-1 pb-2 leading-tight">
                {title}
              </span>
            </h2>

            {/* Description with colored keyword highlighting */}
            <p className="font-body mx-auto max-w-4xl font-light text-gray-700 dark:text-gray-300 text-base sm:text-lg md:text-xl lg:text-xl leading-relaxed tracking-wide px-2">
              {description}
            </p>
          </div>

          <div className="gap-6 lg:gap-8 grid md:grid-cols-2">
            {projects
              ? testimonialsProjects.map((item) => {
                  const itemKey = item.id;

                  return (
                    <div key={itemKey} className="group relative flex h-full">
                      {/* Animated Border Glow */}
                      <div className="absolute -inset-2 bg-linear-to-br from-brand-secondary/40 to-bronze-700/40 rounded-2xl opacity-20 group-hover:opacity-100 blur-xl transition-all duration-500"></div>

                      <Card className="relative flex w-full flex-col overflow-hidden border-2 border-gray-200 bg-white shadow-lg transition-all duration-300 group-hover:border-transparent group-hover:shadow-2xl dark:border-gray-700 dark:bg-gray-800">
                        {/* Top Accent Bar */}
                        <div className="h-2 bg-linear-to-r from-brand-secondary via-bronze-700 to-bronze-800"></div>

                        <div className="p-6 flex flex-col flex-1">
                          {/* Rating Stars */}
                          <div
                            className="flex shrink-0 items-center mb-4"
                            role="img"
                            aria-label={`${item.clientTestimonial!.rating} ${starRatingAriaSuffix}`}
                          >
                            {Array.from({
                              length: item.clientTestimonial!.rating,
                            }).map((_, i) => (
                              <MaterialIcon
                                key={`${itemKey}-star-${i}`}
                                icon="star"
                                size="md"
                                className="text-brand-secondary"
                                ariaLabel=""
                              />
                            ))}
                          </div>

                          {/* Testimonial Quote */}
                          <blockquote className="grow mb-4 text-gray-700 dark:text-gray-300 italic font-light leading-relaxed text-base">
                            "{item.clientTestimonial!.quote}"
                          </blockquote>

                          {/* Client Information */}
                          <div className="shrink-0 pt-4 border-t border-gray-200 dark:border-gray-600">
                            <p className="font-semibold text-gray-900 dark:text-white mb-1">
                              {item.clientTestimonial!.clientName}
                            </p>
                            <p className="text-gray-600 dark:text-gray-300 text-sm font-medium">
                              {item.title}
                            </p>
                          </div>
                        </div>
                      </Card>
                    </div>
                  );
                })
              : clientTestimonials.map((item) => {
                  const itemKey = `client-${item.id}`;

                  return (
                    <div key={itemKey} className="group relative flex h-full">
                      {/* Animated Border Glow */}
                      <div className="absolute -inset-2 bg-linear-to-br from-brand-secondary/40 to-bronze-700/40 rounded-2xl opacity-20 group-hover:opacity-100 blur-xl transition-all duration-500"></div>

                      <Card className="relative flex w-full flex-col overflow-hidden border-2 border-gray-200 bg-white shadow-lg transition-all duration-300 group-hover:border-transparent group-hover:shadow-2xl dark:border-gray-700 dark:bg-gray-800">
                        {/* Top Accent Bar */}
                        <div className="h-2 bg-linear-to-r from-brand-secondary via-bronze-700 to-bronze-800"></div>

                        <div className="p-6 flex flex-col flex-1">
                          {/* Rating Stars */}
                          <div
                            className="flex shrink-0 items-center mb-4"
                            role="img"
                            aria-label={`${item.rating || 5} ${starRatingAriaSuffix}`}
                          >
                            {Array.from({ length: item.rating || 5 }).map(
                              (_, i) => (
                                <MaterialIcon
                                  key={`${itemKey}-star-${i}`}
                                  icon="star"
                                  size="md"
                                  className="text-brand-secondary"
                                  ariaLabel=""
                                />
                              ),
                            )}
                          </div>

                          {/* Testimonial Quote */}
                          <blockquote className="grow mb-4 text-gray-700 dark:text-gray-300 italic font-light leading-relaxed text-base">
                            "{item.quote}"
                          </blockquote>

                          {/* Client Information */}
                          <div className="shrink-0 pt-4 border-t border-gray-200 dark:border-gray-600">
                            <p className="font-semibold text-gray-900 dark:text-white mb-1">
                              {item.name}
                            </p>
                            <p className="text-gray-600 dark:text-gray-300 text-sm font-medium">
                              {item.company ||
                                item.project ||
                                clientPartnerLabel}
                            </p>
                          </div>
                        </div>
                      </Card>
                    </div>
                  );
                })}
          </div>
        </div>
      </div>
    </section>
  );
}
