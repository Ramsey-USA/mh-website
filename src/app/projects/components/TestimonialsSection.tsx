/**
 * Testimonials Section
 * Displays client testimonials from completed projects
 */

import { Card, CardContent } from "@/components/ui";
import { MaterialIcon } from "@/components/icons/MaterialIcon";
import { FadeInWhenVisible } from "@/components/animations/FramerMotionComponents";
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
    <section className="bg-white dark:bg-gray-900 py-20 lg:py-32 xl:py-40">
      <div className="mx-auto px-4 container">
        <FadeInWhenVisible>
          <div className="mx-auto max-w-4xl">
            <div className="mb-16 lg:mb-24 text-center scroll-reveal">
              <h2 className="mb-8 pb-2 font-black text-gray-900 dark:text-white text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl leading-tight tracking-tighter">
                <span className="block mb-4 font-semibold text-gray-700 dark:text-gray-300 text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl tracking-tight">
                  Partnership
                </span>
                <span className="block text-brand-primary dark:text-brand-primary font-black">
                  Testimonials
                </span>
              </h2>

              <p className="mx-auto max-w-4xl font-light text-gray-600 dark:text-gray-300 text-lg sm:text-xl md:text-2xl lg:text-3xl leading-relaxed tracking-wide px-2">
                Hear how we work WITH our partners, not just for them
              </p>
            </div>

            <div className="gap-8 grid md:grid-cols-2">
              {testimonialsProjects.map((project, index) => (
                <Card
                  key={index}
                  className="flex flex-col bg-white dark:bg-gray-800 hover:shadow-lg dark:hover:shadow-gray-600/50 border border-gray-200 dark:border-gray-700 h-full transition-shadow"
                >
                  <CardContent className="flex flex-col p-6 h-full">
                    <div className="flex flex-shrink-0 items-center mb-4">
                      {[...Array(project.clientTestimonial!.rating)].map(
                        (_, i) => (
                          <MaterialIcon
                            key={i}
                            icon="star"
                            size="md"
                            className="text-brand-secondary"
                          />
                        ),
                      )}
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
        </FadeInWhenVisible>
      </div>
    </section>
  );
}
