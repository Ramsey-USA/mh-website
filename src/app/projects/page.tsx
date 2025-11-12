/**
 * Projects Page - Refactored
 * Portfolio showcase with search, filtering, and comprehensive project details
 */

"use client";

import { PageNavigation } from "@/components/navigation/PageNavigation";
import { Breadcrumb } from "@/components/navigation/Breadcrumb";
import { navigationConfigs } from "@/components/navigation/navigationConfigs";
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

export default function ProjectsPage() {
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
    <div className="relative bg-white dark:bg-gray-900 w-full min-h-screen overflow-x-hidden">
      {/* Hero Section */}
      <ProjectsHero />

      {/* Page Navigation */}
      <PageNavigation items={navigationConfigs.projects} />

      {/* Breadcrumb Navigation */}
      <Breadcrumb
        items={[{ label: "Home", href: "/" }, { label: "Projects" }]}
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
  );
}
