/**
 * Projects Grid Section
 * Displays filtered and searched project cards
 */

import { MaterialIcon } from "@/components/icons/MaterialIcon";
import {
  FadeInWhenVisible,
  StaggeredFadeIn,
} from "@/components/animations/FramerMotionComponents";
import { Card } from "@/components/ui";
import { ProjectCard } from "./ProjectCard";
import { categories } from "./projectsData";
import type { ProjectPortfolio } from "@/lib/types";

interface ProjectsGridSectionProps {
  projects: ProjectPortfolio[];
  selectedCategory: string;
}

export function ProjectsGridSection({
  projects,
  selectedCategory,
}: Readonly<ProjectsGridSectionProps>) {
  const categoryLabel =
    selectedCategory === "all"
      ? "Partnership Success"
      : `${categories.find((c) => c.id === selectedCategory)?.label} Partnership`;

  return (
    <section
      id="portfolio"
      className="bg-white dark:bg-gray-900 py-10 sm:py-14 lg:py-18 xl:py-20"
    >
      <div className="relative mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <FadeInWhenVisible>
          <div className="mb-12 lg:mb-16 text-center scroll-reveal">
            <div className="flex justify-center items-center mb-6">
              <MaterialIcon
                icon="photo_library"
                size="xl"
                className="text-brand-primary dark:text-brand-primary"
              />
            </div>
            <h2 className="mb-5 sm:mb-6 font-black text-gray-900 dark:text-gray-100 text-3xl xs:text-4xl sm:text-5xl md:text-5xl lg:text-6xl leading-tight tracking-tighter overflow-visible">
              <span className="block mb-2 sm:mb-3 font-semibold text-gray-700 dark:text-gray-200 text-xl xs:text-2xl sm:text-3xl md:text-3xl lg:text-4xl tracking-tight overflow-visible py-1">
                {categoryLabel}
              </span>
              <span className="block bg-linear-to-r from-brand-primary via-brand-secondary to-brand-primary bg-clip-text text-transparent font-black drop-shadow-sm overflow-visible py-1 pb-2 leading-tight">
                Stories
              </span>
            </h2>
            <p className="mx-auto max-w-3xl font-light text-gray-600 dark:text-gray-300 text-base sm:text-lg md:text-xl lg:text-xl leading-relaxed tracking-wide px-2">
              {projects.length}{" "}
              {projects.length === 1 ? "collaboration" : "collaborations"}{" "}
              showcasing our commitment to working WITH partners
            </p>
          </div>
        </FadeInWhenVisible>

        {projects.length > 0 ? (
          <StaggeredFadeIn className="gap-8 grid md:grid-cols-2 lg:grid-cols-3 mx-auto max-w-7xl">
            {projects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </StaggeredFadeIn>
        ) : (
          <FadeInWhenVisible>
            <Card className="relative bg-white dark:bg-gray-800 shadow-2xl rounded-3xl p-8 sm:p-12 lg:p-16 flex flex-col justify-center items-center min-h-125">
              <MaterialIcon
                icon="construction"
                size="4xl"
                className="text-brand-primary mb-6"
              />
              <h3 className="mb-4 font-black text-gray-900 dark:text-white text-3xl sm:text-4xl md:text-5xl text-center">
                Coming Soon
              </h3>
              <p className="max-w-2xl font-light text-gray-600 dark:text-gray-300 text-lg sm:text-xl md:text-2xl text-center leading-relaxed mb-4">
                Our project portfolio is under development. We're committed to
                showcasing only real, completed partnerships with our valued
                Client Partners.
              </p>
              <p className="max-w-xl font-light text-gray-500 dark:text-gray-300 text-base sm:text-lg text-center">
                Please check back soon or contact us to learn more about our
                current and past projects.
              </p>
            </Card>
          </FadeInWhenVisible>
        )}
      </div>
    </section>
  );
}
