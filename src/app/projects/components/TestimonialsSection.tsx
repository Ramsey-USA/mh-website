/**
 * Testimonials Section
 * Displays Client Partner testimonials from completed projects
 */

import { Card, CardContent } from "@/components/ui";
import { MaterialIcon } from "@/components/icons/MaterialIcon";
import { Section } from "@/components/ui/layout";
import { getCardClassName } from "@/lib/styles/card-variants";
import type { ProjectPortfolio } from "@/lib/types";

interface TestimonialsSectionProps {
  projects: ProjectPortfolio[];
}

export function TestimonialsSection({ projects }: TestimonialsSectionProps) {
  const testimonialsProjects = projects
    .filter((p) => p.clientTestimonial)
    .slice(0, 4);

  if (testimonialsProjects.length === 0) {
    return null;
  }

  return (
    <Section variant="default" padding="large">
      <div className="mx-auto max-w-4xl">
        {/* Section Header - Military Construction Standard */}
        <div className="mb-16 sm:mb-20 text-center">
          {/* Icon with decorative lines */}
          <div className="flex items-center justify-center mb-8 gap-4">
            <div className="h-1 w-16 bg-gradient-to-r from-transparent to-gray-300 dark:to-gray-600 rounded-full"></div>
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-br from-brand-secondary/30 to-bronze-600/30 blur-2xl rounded-full"></div>
              <div className="relative bg-gradient-to-br from-brand-secondary via-bronze-700 to-bronze-800 p-5 rounded-2xl shadow-2xl border-2 border-white/50 dark:border-gray-600">
                <MaterialIcon
                  icon="forum"
                  size="2xl"
                  className="text-white drop-shadow-lg"
                />
              </div>
            </div>
            <div className="h-1 w-16 bg-gradient-to-l from-transparent to-gray-300 dark:to-gray-600 rounded-full"></div>
          </div>

          {/* Two-line gradient heading */}
          <h2 className="mb-6 sm:mb-8 font-black text-gray-900 dark:text-white text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-relaxed tracking-tighter overflow-visible">
            <span className="block mb-3 sm:mb-4 font-semibold text-gray-700 dark:text-gray-200 text-xl xs:text-2xl sm:text-3xl md:text-4xl lg:text-5xl tracking-tight overflow-visible py-1">
              Partnership
            </span>
            <span className="block bg-gradient-to-r from-brand-primary via-brand-secondary to-brand-primary bg-clip-text text-transparent font-black drop-shadow-sm overflow-visible py-2 pb-3 leading-normal">
              Testimonials
            </span>
          </h2>

          {/* Description with colored keyword highlighting */}
          <p className="mx-auto max-w-5xl font-light text-gray-700 dark:text-gray-300 text-base sm:text-lg md:text-xl lg:text-2xl leading-relaxed tracking-wide px-2">
            Hear how we{" "}
            <span className="font-bold text-brand-primary dark:text-brand-primary-light">
              work WITH our Client Partners
            </span>
            , not just{" "}
            <span className="font-bold text-gray-900 dark:text-white">
              for them
            </span>
            .
          </p>
        </div>

        <div className="gap-8 grid md:grid-cols-2">
          {testimonialsProjects.map((project, _index) => (
            <Card key={_index} className={getCardClassName("static", "h-full")}>
              <CardContent className="flex flex-col p-6 h-full">
                <div className="flex flex-shrink-0 items-center mb-4">
                  {[...Array(project.clientTestimonial!.rating)].map((_, i) => (
                    <MaterialIcon
                      key={i}
                      icon="star"
                      size="md"
                      className="text-brand-secondary"
                    />
                  ))}
                </div>
                <p className="flex-grow mb-4 text-gray-700 dark:text-gray-300 italic leading-relaxed">
                  "{project.clientTestimonial!.quote}"
                </p>
                <div className="flex-shrink-0 pt-4 border-gray-200 dark:border-gray-600 border-t">
                  <p className="font-semibold text-gray-900 dark:text-white">
                    {project.clientTestimonial!.clientName}
                  </p>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">
                    {project.title}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </Section>
  );
}
