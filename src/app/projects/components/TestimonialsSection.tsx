/**
 * Testimonials Section
 * Displays Client Partner testimonials from completed projects
 */

import { Card, CardContent } from "@/components/ui";
import { MaterialIcon } from "@/components/icons/MaterialIcon";
import { Section } from "@/components/ui/layout";
import { SectionHeader } from "@/components/ui/SectionHeader";
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
        <SectionHeader
          icon="forum"
          iconVariant="secondary"
          subtitle="Partnership"
          title="Testimonials"
          description="Hear how we work WITH our Client Partners, not just for them"
        />

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
