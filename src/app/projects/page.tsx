/**
 * Projects Page - Refactored
 * Portfolio showcase with search, filtering, and comprehensive project details
 */

"use client";

import { Breadcrumb } from "@/components/navigation/Breadcrumb";
import { PortfolioService } from "@/lib/services/portfolioService";
import { useProjectsSearch } from "./components/useProjectsSearch";
import { ProjectsHero } from "./components/ProjectsHero";
import { ProjectsStatsSection } from "./components/ProjectsStatsSection";
import { VeteranBenefitsBanner } from "./components/VeteranBenefitsBanner";
import { ProjectsFilterSection } from "./components/ProjectsFilterSection";
import { ProjectsGridSection } from "./components/ProjectsGridSection";
import { CapabilitiesSection } from "./components/CapabilitiesSection";
import { WhyChooseSection } from "./components/WhyChooseSection";
import { TestimonialsSection } from "./components/TestimonialsSection";
import { PartnershipProcessSection } from "./components/PartnershipProcessSection";
import { ProjectsCTASection } from "./components/ProjectsCTASection";
import { UnderConstruction } from "@/components/layout/UnderConstruction";
import { StructuredData } from "@/components/seo/seo-meta";
import { getProjectsSEO } from "@/lib/seo/page-seo-utils";
import {
  generateBreadcrumbSchema,
  breadcrumbPatterns,
} from "@/lib/seo/breadcrumb-schema";

// Feature flag - set to false to show full page content
const SHOW_UNDER_CONSTRUCTION = false;

export default function ProjectsPage() {
  // Get enhanced SEO data for Projects page
  const projectsSEO = getProjectsSEO();

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

  // Show under construction notice while preserving all content below
  if (SHOW_UNDER_CONSTRUCTION) {
    return (
      <UnderConstruction
        pageName="Projects"
        description="We're curating our project showcase to highlight completed work with verified details, authentic photos, and accurate client testimonials."
        estimatedCompletion="December 2025"
      />
    );
  }

  // Original page content preserved below - will be shown when flag is set to false
  return (
    <>
      {/* SEO Meta Tags */}

      {/* Structured Data */}
      {projectsSEO.schemas && projectsSEO.schemas.length > 0 && (
        <StructuredData data={projectsSEO.schemas} />
      )}

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

        {/* CTA Section */}
        <ProjectsCTASection />
      </div>
    </>
  );
}
