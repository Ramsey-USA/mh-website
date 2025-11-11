/**
 * Projects Grid Section
 * Displays filtered and searched project cards
 */

import { MaterialIcon } from "@/components/icons/MaterialIcon";
import {
  FadeInWhenVisible,
  StaggeredFadeIn,
} from "@/components/animations/FramerMotionComponents";
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
}: ProjectsGridSectionProps) {
  const categoryLabel =
    selectedCategory === "all"
      ? "Partnership Success"
      : `${categories.find((c) => c.id === selectedCategory)?.label} Partnership`;

  return (
    <section
      id="portfolio"
      className="bg-white dark:bg-gray-900 py-20 lg:py-32 xl:py-40"
    >
      <div className="relative mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <FadeInWhenVisible>
          <div className="mb-16 lg:mb-24 text-center scroll-reveal">
            <div className="flex justify-center items-center mb-6">
              <MaterialIcon
                icon="photo_library"
                size="xl"
                className="text-brand-primary dark:text-brand-primary"
              />
            </div>
            <h2 className="mb-8 pb-2 font-black text-gray-900 dark:text-white text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl leading-tight tracking-tighter">
              <span className="block mb-4 font-semibold text-gray-700 dark:text-gray-300 text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl tracking-tight">
                {categoryLabel}
              </span>
              <span className="block text-brand-primary dark:text-brand-primary font-black">
                Stories
              </span>
            </h2>
            <p className="mx-auto max-w-4xl font-light text-gray-600 dark:text-gray-300 text-lg sm:text-xl md:text-2xl lg:text-3xl leading-relaxed tracking-wide px-2">
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
            <div className="py-20 text-center">
              <MaterialIcon
                icon="search_off"
                size="4xl"
                className="mb-4 text-gray-400"
              />
              <h3 className="mb-2 font-semibold text-gray-900 dark:text-white text-2xl">
                No partnerships found
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Try adjusting your search or filter criteria
              </p>
            </div>
          </FadeInWhenVisible>
        )}
      </div>
    </section>
  );
}
