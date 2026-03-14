/**
 * Projects Page - Refactored
 * Portfolio showcase with search, filtering, and comprehensive project details
 */

"use client";

import dynamic from "next/dynamic";
import { usePageTracking } from "@/lib/analytics/hooks";
import { Breadcrumb } from "@/components/navigation/Breadcrumb";
import { PortfolioService } from "@/lib/services/portfolio-service";
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

const WhyChooseSection = dynamic(
  () =>
    import("./components/WhyChooseSection").then((mod) => ({
      default: mod.WhyChooseSection,
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

const PartnershipProcessSection = dynamic(
  () =>
    import("./components/PartnershipProcessSection").then((mod) => ({
      default: mod.PartnershipProcessSection,
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

import { StrategicCTABanner } from "@/components/ui/cta";
import { SimpleSkeleton } from "@/components/ui/SimpleSkeleton";
import {
  generateBreadcrumbSchema,
  breadcrumbPatterns,
} from "@/lib/seo/breadcrumb-schema";

export default function ProjectsPage() {
  // Analytics tracking
  usePageTracking("Projects");

  // ALL HOOKS MUST BE CALLED BEFORE ANY CONDITIONAL RETURNS
  const {
    selectedCategory,
    setSelectedCategory,
    searchQuery,
    setSearchQuery,
    projects,
    clearSearch,
  } = useProjectsSearch();

  // Get all projects for testimonials section
  const allProjects = PortfolioService.getAllProjects();

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

      <div className="relative bg-white dark:bg-gray-900 w-full min-h-screen overflow-x-hidden">
        {/* Hero Section */}
        <ProjectsHero />

        {/* Breadcrumb Navigation */}
        <Breadcrumb
          items={[{ label: "Home", href: "/" }, { label: "Victories" }]}
        />

        {/* Stats Section */}
        <ProjectsStatsSection />

        {/* Veteran-Owned Benefits Banner */}
        <VeteranBenefitsBanner />

        {/* Filter & Search Section */}
        <ProjectsFilterSection
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          onClearSearch={clearSearch}
        />

        {/* Projects Grid */}
        <ProjectsGridSection
          projects={projects}
          selectedCategory={selectedCategory}
        />

        {/* Capabilities Section */}
        <CapabilitiesSection />

        {/* Why Choose MH Section */}
        <WhyChooseSection />

        {/* Testimonials Section */}
        <TestimonialsSection projects={allProjects} />

        {/* Partnership Process Section */}
        <PartnershipProcessSection />

        {/* Strategic CTA Banner - Conversion Optimization */}
        <StrategicCTABanner variant="combo" className="my-0" />

        {/* Next Steps Section - Standardized Final CTA */}
        <NextStepsSection />
      </div>
    </>
  );
}
