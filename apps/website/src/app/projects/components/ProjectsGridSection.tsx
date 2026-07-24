/**
 * Projects Grid Section
 * Displays filtered and searched project cards
 */

import { MaterialIcon } from "@/components/icons/MaterialIcon";
import {
  FadeInWhenVisible,
  StaggeredFadeIn,
} from "@/components/animations/FramerMotionComponents";
import { Button, Card } from "@/components/ui";
import Link from "next/link";
import { ProjectCard } from "./ProjectCard";
import { categories } from "./projectsData";
import { getUniversalCtaSet } from "@/lib/content/universal-ctas";
import type { SupportedLocale } from "@/lib/i18n/locale";
import type { ProjectPortfolio } from "@/lib/types";

interface ProjectsGridSectionProps {
  locale?: SupportedLocale;
  projects: ProjectPortfolio[];
  selectedCategory: string;
  hasActiveFilters: boolean;
  onResetFilters: () => void;
}

export function ProjectsGridSection({
  locale = "en",
  projects,
  selectedCategory,
  hasActiveFilters,
  onResetFilters,
}: Readonly<ProjectsGridSectionProps>) {
  const isEs = locale === "es";
  const universalCtas = getUniversalCtaSet(locale);
  const labels = isEs
    ? {
        categoryDefault: "Exito de alianzas",
        categorySuffix: "alianza",
        stories: "Historias",
        oneCollab: "colaboracion",
        manyCollab: "colaboraciones",
        collabSuffix: "que muestran nuestro compromiso de trabajar CON socios",
        noMatches: "No se encontraron coincidencias",
        comingSoon: "Proximamente",
        noMatchesBody:
          "No encontramos proyectos que coincidan con su busqueda y filtros actuales.",
        comingSoonBody:
          "Nuestro portafolio de proyectos esta en desarrollo. Publicamos solo alianzas reales y completadas con socios del proyecto.",
        noMatchesHint:
          "Intente limpiar filtros o usar terminos mas amplios para descubrir mas alianzas.",
        comingSoonHint:
          "Vuelva pronto o contactenos para conocer mas sobre proyectos actuales y anteriores.",
        resetFilters: "Restablecer filtros",
      }
    : {
        categoryDefault: "Partnership Success",
        categorySuffix: "Partnership",
        stories: "Stories",
        oneCollab: "collaboration",
        manyCollab: "collaborations",
        collabSuffix: "showcasing our commitment to working WITH partners",
        noMatches: "No matches found",
        comingSoon: "Coming Soon",
        noMatchesBody:
          "We could not find projects matching your current search and category filters.",
        comingSoonBody:
          "Our project portfolio is under development. We're committed to showcasing only real, completed partnerships with our valued project stakeholders.",
        noMatchesHint:
          "Try clearing filters or using broader terms to discover more partnerships.",
        comingSoonHint:
          "Please check back soon or contact us to learn more about our current and past projects.",
        resetFilters: "Reset filters",
      };
  const categoryLabels: Record<string, string> = isEs
    ? {
        all: "Todos los proyectos",
        commercial: "Comercial",
        industrial: "Industrial",
        renovation: "Renovaciones",
        custom: "Construcciones personalizadas",
      }
    : {
        all: "All Projects",
        commercial: "Commercial",
        industrial: "Industrial",
        renovation: "Renovations",
        custom: "Custom Builds",
      };
  const categoryLabel =
    selectedCategory === "all"
      ? labels.categoryDefault
      : `${categoryLabels[selectedCategory] ?? categories.find((c) => c.id === selectedCategory)?.label} ${labels.categorySuffix}`;

  return (
    <section
      id="portfolio"
      aria-labelledby="projects-results-heading"
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
            <h2
              id="projects-results-heading"
              className="mb-5 sm:mb-6 font-black text-gray-900 dark:text-gray-100 text-3xl xs:text-4xl sm:text-5xl md:text-5xl lg:text-6xl leading-tight tracking-tighter overflow-visible"
            >
              <span className="block mb-2 sm:mb-3 font-semibold text-gray-700 dark:text-gray-200 text-xl xs:text-2xl sm:text-3xl md:text-3xl lg:text-4xl tracking-tight overflow-visible py-1">
                {categoryLabel}
              </span>
              <span className="block bg-linear-to-r from-brand-primary via-brand-secondary to-brand-primary bg-clip-text text-transparent font-black drop-shadow-sm overflow-visible py-1 pb-2 leading-tight">
                {labels.stories}
              </span>
            </h2>
            <p
              className="font-body mx-auto max-w-3xl font-light text-gray-600 dark:text-gray-300 text-base sm:text-lg md:text-xl lg:text-xl leading-relaxed tracking-wide px-2"
              aria-live="polite"
            >
              {projects.length}{" "}
              {projects.length === 1 ? labels.oneCollab : labels.manyCollab}{" "}
              {labels.collabSuffix}
            </p>
          </div>
        </FadeInWhenVisible>

        {projects.length > 0 ? (
          <StaggeredFadeIn className="gap-8 grid md:grid-cols-2 lg:grid-cols-3 mx-auto max-w-7xl">
            {projects.map((project) => (
              <ProjectCard key={project.id} project={project} locale={locale} />
            ))}
          </StaggeredFadeIn>
        ) : (
          <FadeInWhenVisible>
            <Card className="relative bg-white dark:bg-gray-800 shadow-2xl rounded-3xl p-8 sm:p-12 lg:p-16 flex flex-col justify-center items-center min-h-125">
              <MaterialIcon
                icon={hasActiveFilters ? "search_off" : "construction"}
                size="4xl"
                className="text-brand-primary mb-6"
              />
              <h3 className="mb-4 font-black text-gray-900 dark:text-white text-3xl sm:text-4xl md:text-5xl text-center">
                {hasActiveFilters ? labels.noMatches : labels.comingSoon}
              </h3>
              <p className="font-body max-w-2xl font-light text-gray-600 dark:text-gray-300 text-lg sm:text-xl md:text-2xl text-center leading-relaxed mb-4">
                {hasActiveFilters
                  ? labels.noMatchesBody
                  : labels.comingSoonBody}
              </p>
              <p className="max-w-xl font-light text-gray-500 dark:text-gray-300 text-base sm:text-lg text-center">
                {hasActiveFilters
                  ? labels.noMatchesHint
                  : labels.comingSoonHint}
              </p>
              {hasActiveFilters ? (
                <Button
                  type="button"
                  onClick={onResetFilters}
                  className="mt-6 bg-brand-primary text-white hover:bg-brand-primary-dark"
                >
                  {labels.resetFilters}
                </Button>
              ) : (
                <Button asChild className="mt-6">
                  <Link href={universalCtas.primary.href}>
                    {universalCtas.primary.label}
                  </Link>
                </Button>
              )}
            </Card>
          </FadeInWhenVisible>
        )}
      </div>
    </section>
  );
}
