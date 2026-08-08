"use client";

import dynamic from "next/dynamic";
import { useMemo } from "react";
import { usePageTracking } from "@/lib/analytics/hooks";
import { Breadcrumb } from "@/components/navigation/Breadcrumb";
import { JeremyAuthorityLinksStrip } from "@/components/shared-sections/JeremyAuthorityLinksStrip";
import { useLocale, useTranslations } from "next-intl";
import { normalizeStakeholderTestimonials } from "@/lib/data/testimonials";
import { useProjectsSearch } from "./components/useProjectsSearch";

// Critical above-the-fold components - load with SSR
import { ProjectsHero } from "./components/ProjectsHero";
import { ProjectsFilterSection } from "./components/ProjectsFilterSection";
import { ProjectsGridSection } from "./components/ProjectsGridSection";

// Lazy load below-the-fold sections for better mobile performance
const ProjectsStatsSection = dynamic(
  () =>
    import("./components/ProjectsStatsSection").then((mod) => ({
      default: mod.ProjectsStatsSection,
    })),
  {
    ssr: false,
    loading: () => <SimpleSkeleton height="h-64" />,
  },
);

const TestimonialsSection = dynamic(
  () =>
    import("./components/TestimonialsSection").then((mod) => ({
      default: mod.TestimonialsSection,
    })),
  {
    ssr: false,
    loading: () => (
      <div className="h-96 animate-pulse bg-gray-100 dark:bg-gray-800" />
    ),
  },
);

// Standardized final CTA section
const NextStepsSection = dynamic(
  () =>
    import("@/components/shared-sections").then((mod) => ({
      default: mod.NextStepsSection,
    })),
  { ssr: true },
);

import { SimpleSkeleton } from "@/components/ui/SimpleSkeleton";

export default function ProjectsPageClient() {
  // Analytics tracking
  usePageTracking("Projects");
  const locale = useLocale();
  const isEs = locale.startsWith("es");
  const t = useTranslations("projectsPageShell");
  const tTestimonials = useTranslations("testimonialsData");

  const featuredClientTestimonials = useMemo(
    () =>
      normalizeStakeholderTestimonials(
        tTestimonials.raw("clientTestimonials") as Array<{
          id: string;
          name: string;
          location?: string;
          project?: string;
          company?: string;
          rating?: number;
          quote: string;
          featured?: boolean;
          date?: string;
          category?: string;
        }>,
      )
        .filter((testimonial) => testimonial.featured)
        .slice(0, 6),
    [tTestimonials],
  );

  // ALL HOOKS MUST BE CALLED BEFORE ANY CONDITIONAL RETURNS
  const {
    selectedCategory,
    setSelectedCategory,
    searchQuery,
    setSearchQuery,
    projects,
    hasActiveFilters,
    clearSearch,
  } = useProjectsSearch();

  return (
    <>
      {/* SEO Meta Tags */}
      {/* Structured Data is injected via layout.tsx to avoid duplication */}

      <div className="relative min-h-screen w-full overflow-x-hidden bg-white dark:bg-gray-900">
        <span className="sr-only">{t("languageActive")}</span>
        {/* Hero Section */}
        <ProjectsHero locale={isEs ? "es" : "en"} />

        {/* Breadcrumb Navigation */}
        <Breadcrumb
          items={[
            { label: t("breadcrumb.home"), href: "/" },
            { label: t("breadcrumb.current") },
          ]}
        />

        <div className="mx-auto max-w-7xl px-4 pb-4 pt-4 sm:px-6 lg:px-8">
          <JeremyAuthorityLinksStrip isEs={isEs} />
        </div>

        <section className="enterprise-route-intro">
          <div className="enterprise-shell enterprise-route-intro__layout">
            <div className="contents">
              <div className="max-w-3xl">
                <p className="text-xs font-bold uppercase tracking-[0.28em] text-brand-primary dark:text-brand-primary-light">
                  {isEs
                    ? "Prueba pública y alcance regional"
                    : "Public proof and regional reach"}
                </p>
                <h2 className="mt-3 text-2xl font-black tracking-tight text-gray-900 dark:text-white sm:text-3xl">
                  {isEs
                    ? "Cada proyecto muestra cómo entregamos con disciplina, seguridad y claridad"
                    : "Each project shows how we deliver with discipline, safety, and clarity"}
                </h2>
                <p className="mt-4 text-base leading-7 text-gray-700 dark:text-gray-300">
                  {isEs
                    ? "Explora entregas comerciales, industriales, municipales y de remodelación en Washington, Oregon e Idaho, con enlaces directos al alcance, la ubicación y la siguiente conversación de consulta."
                    : "Explore commercial, industrial, municipal, and renovation delivery across Washington, Oregon, and Idaho, with direct links to scope, location, and the next consultation conversation."}
                </p>
              </div>
              <div className="enterprise-actions lg:justify-end">
                <a
                  href="/services"
                  className="enterprise-button enterprise-button--green"
                >
                  {isEs ? "Ver servicios" : "View services"}
                </a>
                <a
                  href="/contact"
                  className="enterprise-button enterprise-button--green"
                >
                  {isEs ? "Iniciar conversación" : "Start a conversation"}
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Filter & Search Section - Primary discovery entry */}
        <ProjectsFilterSection
          locale={isEs ? "es" : "en"}
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          onClearSearch={clearSearch}
          resultsCount={projects.length}
        />

        {/* Projects Grid - Show the work first */}
        <ProjectsGridSection
          locale={isEs ? "es" : "en"}
          projects={projects}
          selectedCategory={selectedCategory}
          hasActiveFilters={hasActiveFilters}
          onResetFilters={clearSearch}
        />

        {/* Stats Section - Keep one concise proof block */}
        <ProjectsStatsSection locale={isEs ? "es" : "en"} />

        {/* Testimonials Section */}
        <TestimonialsSection
          testimonials={featuredClientTestimonials}
          subtitle={t("testimonials.subtitle")}
          title={t("testimonials.title")}
          description={t("testimonials.description")}
          clientPartnerLabel={t("testimonials.clientPartnerLabel")}
          starRatingAriaSuffix={t("testimonials.starRatingAriaSuffix")}
        />

        {/* Next Steps Section - Standardized Final CTA */}
        <NextStepsSection locale={isEs ? "es" : "en"} />
      </div>
    </>
  );
}
