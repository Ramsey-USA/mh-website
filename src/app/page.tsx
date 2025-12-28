"use client";

import dynamic from "next/dynamic";
import {
  generateOrganizationStructuredData,
  StructuredData,
} from "@/components/seo/seo-meta";

// Enhanced SEO for veteran-owned construction with traditional values
import { getHomepageSEO } from "@/lib/seo/page-seo-utils";

// Homepage sections - Critical above-the-fold content
import {
  HeroSection,
  CoreValuesSection,
  ServicesShowcase,
  WhyPartnerSection,
} from "@/components/home";

// UI Components
import { Timeline, type TimelineStep } from "@/components/ui/Timeline";

// Shared sections - Lazy load below-the-fold content
const TestimonialsSection = dynamic(
  () =>
    import("@/components/shared-sections").then((mod) => ({
      default: mod.TestimonialsSection,
    })),
  {
    ssr: false,
    loading: () => <div className="h-96 animate-pulse bg-gray-100" />,
  },
);
const NextStepsSection = dynamic(
  () =>
    import("@/components/shared-sections").then((mod) => ({
      default: mod.NextStepsSection,
    })),
  {
    ssr: false,
    loading: () => <div className="h-64 animate-pulse bg-gray-100" />,
  },
);
const CompanyStats = dynamic(
  () =>
    import("@/components/about/CompanyStats").then((mod) => ({
      default: mod.CompanyStats,
    })),
  {
    ssr: false,
    loading: () => <div className="h-96 animate-pulse bg-gray-100" />,
  },
);

// PWA Components
import { PWAInstallCTA } from "@/components/pwa";

// Strategic CTA Components
import { StrategicCTABanner } from "@/components/ui/cta";

import { usePageTracking } from "@/lib/analytics/hooks";
import { useImagePreloader } from "@/hooks/usePerformanceOptimization";
import { useScrollDepthTracking } from "@/hooks/useScrollDepthTracking";

// Process timeline steps
const processSteps: TimelineStep[] = [
  {
    num: 1,
    icon: "engineering",
    title: "Pre-Construction Planning",
    desc: "Comprehensive site assessment, detailed scope development, and strategic planning to identify challenges before they arise.",
    position: "left",
  },
  {
    num: 2,
    icon: "payments",
    title: "Budget Transparency",
    desc: "Clear, itemized pricing with complete cost breakdown. No hidden fees, no surprises—just honest numbers you can trust.",
    position: "right",
  },
  {
    num: 3,
    icon: "verified",
    title: "Quality Execution",
    desc: "Expert craftsmanship with systematic quality checkpoints at every phase. Precision execution backed by 150+ years combined experience.",
    position: "left",
  },
  {
    num: 4,
    icon: "forum",
    title: "Proactive Communication",
    desc: "Regular updates keep you informed throughout the project. Real-time notifications of any changes—you're never in the dark.",
    position: "right",
  },
  {
    num: 5,
    icon: "task_alt",
    title: "Seamless Close-Out",
    desc: "Comprehensive final walkthrough and complete documentation. Our commitment to your satisfaction extends beyond project completion.",
    position: "left",
  },
];

export default function Home() {
  // Analytics tracking
  usePageTracking("Home");

  // Get enhanced SEO data for homepage
  const homepageSEO = getHomepageSEO();

  // Preload critical images for better performance
  const criticalImages = [
    "/images/placeholder.webp",
    "/images/logo/mh-logo.png",
  ];

  // Preload critical images for performance
  useImagePreloader(criticalImages);

  // Track scroll depth for engagement analytics with custom hook
  useScrollDepthTracking("homepage");

  return (
    <>
      {/* Enhanced SEO structured data for veteran-owned construction excellence */}
      <StructuredData data={homepageSEO.schemas} />

      {/* Add structured data for SEO */}
      <StructuredData data={generateOrganizationStructuredData()} />

      {/* Home Page Hero Section */}
      <HeroSection />

      {/* PWA Install Banner - Only shows when installable */}
      <PWAInstallCTA variant="banner" />

      {/* Core Values Section - Establish trust and heritage first */}
      <CoreValuesSection />

      {/* Company Statistics Section - Early trust signals & credibility */}
      <CompanyStats
        id="stats"
        subtitle="Battle-Tested Excellence"
        title="Proven Track Record"
        description="Measurable results from a veteran-owned team committed to mission excellence across the Pacific Northwest—from deployment to development, we deliver."
        variant="primary"
      />

      {/* Showcase of Services Section - What we actually do */}
      <ServicesShowcase />

      {/* Why Partner With MH Construction Section - Partnership philosophy */}
      <WhyPartnerSection />

      {/* Enhanced Client Partner Testimonials - Social proof after value proposition */}
      <TestimonialsSection
        id="testimonials"
        subtitle="Trusted By Our Partners"
        title="What Our Client Partners Say"
        description="Read testimonials from valued Client Partners across the Pacific Northwest who have experienced our collaborative excellence firsthand."
      />

      {/* Strategic CTA after Social Proof - Combo (App + Pitch Deck + Contact) */}
      <StrategicCTABanner variant="combo" className="my-0" />

      {/* Our Process Timeline Section */}
      <Timeline
        id="our-process"
        icon="timeline"
        subtitle="Simple & Transparent"
        title="Our Process"
        description={
          <>
            Five clear steps from{" "}
            <span className="font-bold text-brand-primary dark:text-brand-primary-light">
              first contact to project completion
            </span>
            . No surprises, just{" "}
            <span className="font-bold text-gray-900 dark:text-white">
              honest communication and proven results
            </span>
            .
          </>
        }
        steps={processSteps}
      />

      {/* Next Steps Section */}
      <NextStepsSection />
    </>
  );
}
