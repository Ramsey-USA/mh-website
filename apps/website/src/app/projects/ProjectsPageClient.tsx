"use client";

import dynamic from "next/dynamic";
import { usePageTracking } from "@/lib/analytics/hooks";
import { Breadcrumb } from "@/components/navigation/Breadcrumb";
import { useTranslations } from "next-intl";
import type { Testimonial } from "@/lib/data/testimonials";
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

const VeteranBenefitsBanner = dynamic(
  () =>
    import("./components/VeteranBenefitsBanner").then((mod) => ({
      default: mod.VeteranBenefitsBanner,
    })),
  {
    ssr: false,
    loading: () => <SimpleSkeleton height="h-48" />,
  },
);

const CapabilitiesSection = dynamic(
  () =>
    import("./components/CapabilitiesSection").then((mod) => ({
      default: mod.CapabilitiesSection,
    })),
  {
    ssr: false,
    loading: () => <SimpleSkeleton />,
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
import {
  generateBreadcrumbSchema,
  breadcrumbPatterns,
} from "@/lib/seo/breadcrumb-schema";

export default function ProjectsPageClient() {
  // Analytics tracking
  usePageTracking("Projects");
  const t = useTranslations("projectsPageShell");
  const tTestimonials = useTranslations("testimonialsData");

  const featuredClientTestimonials = (
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
    }>
  )
    .map(
      (testimonial) =>
        ({
          ...testimonial,
          type: "client",
        }) as Testimonial,
    )
    .filter((testimonial) => testimonial.featured)
    .slice(0, 6);

  // ALL HOOKS MUST BE CALLED BEFORE ANY CONDITIONAL RETURNS
  const {
    selectedCategory,
    setSelectedCategory,
    searchQuery,
    setSearchQuery,
    projects,
    clearSearch,
  } = useProjectsSearch();

  return (
    <>
      {/* SEO Meta Tags */}
      {/* Structured Data is injected via layout.tsx to avoid duplication */}

      {/* Breadcrumb Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            generateBreadcrumbSchema(breadcrumbPatterns.projects),
          ),
        }}
      />

      <div className="relative min-h-screen w-full overflow-x-hidden bg-linear-to-b from-white via-gray-50 to-white dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        <span className="sr-only">{t("languageActive")}</span>
        {/* Hero Section */}
        <ProjectsHero />

        {/* Breadcrumb Navigation */}
        <Breadcrumb
          items={[
            { label: t("breadcrumb.home"), href: "/" },
            { label: t("breadcrumb.current") },
          ]}
        />

        {/* Filter & Search Section - Primary discovery entry */}
        <ProjectsFilterSection
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          onClearSearch={clearSearch}
        />

        {/* Projects Grid - Show the work first */}
        <ProjectsGridSection
          projects={projects}
          selectedCategory={selectedCategory}
        />

        {/* Capabilities Section - Explain what the portfolio proves */}
        <CapabilitiesSection />

        {/* Veteran-Owned Benefits Banner */}
        <VeteranBenefitsBanner />

        {/* Stats Section - Proof after portfolio visibility */}
        <ProjectsStatsSection />

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
        <NextStepsSection />
      </div>
    </>
  );
}
