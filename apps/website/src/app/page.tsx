import { type Metadata } from "next";
import dynamic from "next/dynamic";
import { StructuredData } from "@/components/seo/SeoMeta";
import { PageTrackingClient } from "@/components/analytics";
import { withGeoMetadata } from "@/lib/seo/geo-metadata";
import { getHomepageSEO } from "@/lib/seo/page-seo-utils";
// Above-fold sections: static imports for instant LCP
import { HeroSection, CoreValuesSection } from "@/components/home";
import { PWAInstallCTA } from "@/components/pwa";
// Below-fold sections: lazy-loaded to keep initial JS bundle lean
import { type TimelineStep } from "@/components/ui/Timeline";
const ServicesShowcase = dynamic(() =>
  import("@/components/home").then((m) => ({ default: m.ServicesShowcase })),
);
const WhyPartnerSection = dynamic(() =>
  import("@/components/home").then((m) => ({ default: m.WhyPartnerSection })),
);
const CompanyStats = dynamic(() =>
  import("@/components/about/CompanyStats").then((m) => ({
    default: m.CompanyStats,
  })),
);
const Timeline = dynamic(() =>
  import("@/components/ui/Timeline").then((m) => ({ default: m.Timeline })),
);
const TestimonialsSection = dynamic(() =>
  import("@/components/shared-sections").then((m) => ({
    default: m.TestimonialsSection,
  })),
);
const NextStepsSection = dynamic(() =>
  import("@/components/shared-sections").then((m) => ({
    default: m.NextStepsSection,
  })),
);
const StrategicCTABanner = dynamic(() =>
  import("@/components/ui/cta").then((m) => ({
    default: m.StrategicCTABanner,
  })),
);

const SITE_URL = "https://www.mhc-gc.com";

export const metadata: Metadata = withGeoMetadata({
  title: {
    absolute:
      "Base HQ → Home | Building Projects for the Client, NOT the Dollar | MH Construction",
  },
  description:
    "Base HQ → Home: Your Tri-State Construction Command Center serving Washington, Oregon, and Idaho across the Pacific Northwest. Headquartered in the Tri-Cities (Pasco, Richland, Kennewick). Veteran-Owned Since January 2025. Expert commercial construction, master planning, preconstruction, tenant improvements, and light industrial operations. Service-earned values: Honesty, Integrity, Professionalism, Thoroughness. Montana expansion coming soon.",
  keywords: [
    "general contractor Tri-State",
    "Veteran-Owned contractor Pacific Northwest",
    "Richland general contractor",
    "Pasco general contractor",
    "Kennewick general contractor",
    "Benton County general contractor",
    "Franklin County general contractor",
    "commercial construction Tri-State",
    "construction management services",
    "master planning preconstruction",
    "tenant improvement contractor",
    "light industrial construction Pacific Northwest",
    "general contractor Yakima WA",
    "general contractor Spokane WA",
    "general contractor Walla Walla WA",
    "general contractor Omak WA",
    "general contractor Pendleton OR",
    "veteran construction values",
    "WA OR ID licensed contractor",
    "Eastern Washington contractor",
  ],
  alternates: {
    canonical: SITE_URL,
  },
  openGraph: {
    title:
      "Base HQ → Home | Building Projects for the Client, NOT the Dollar | MH Construction",
    description:
      "Your Tri-State Construction Command Center. Veteran-Owned Since January 2025. Tri-Cities headquarters in Pasco, Richland, and Kennewick with licensed operations across WA, OR, and ID.",
    url: SITE_URL,
    siteName: "MH Construction",
    type: "website",
    images: [
      {
        url: "/images/og-default.jpg",
        width: 1200,
        height: 630,
        alt: "MH Construction - Veteran-Owned Tri-State Licensed General Contractor",
      },
    ],
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    site: "@mhc_gc",
    creator: "@mhc_gc",
    title:
      "Base HQ → Home | Building Projects for the Client, NOT the Dollar | MH Construction",
    description:
      "Your Tri-State Construction Command Center. Veteran-Owned Since January 2025. Tri-Cities headquarters in Pasco, Richland, and Kennewick with licensed operations across WA, OR, and ID.",
    images: ["/images/og-default.jpg"],
  },
});

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
  // Analytics tracking remains client-only while page rendering stays server-first

  // Get enhanced SEO data for homepage
  const homepageSEO = getHomepageSEO();

  return (
    <>
      <PageTrackingClient pageName="Home" />

      {/* Enhanced SEO structured data for Veteran-Owned construction excellence */}
      <StructuredData data={homepageSEO.schemas} />

      {/* Home Page Hero Section */}
      <HeroSection />

      {/* PWA Install Banner - Only shows when installable */}
      <PWAInstallCTA variant="banner" />

      {/* Showcase of Services Section - Primary discovery path */}
      <ServicesShowcase />

      {/* Core Values Section - Trust foundation after service orientation */}
      <CoreValuesSection />

      {/* Why Partner With MH Construction Section - Partnership philosophy */}
      <WhyPartnerSection />

      {/* Company Statistics Section - Proof after discovery and trust */}
      <CompanyStats
        id="stats"
        subtitle="Disciplined, Proven Results"
        title="Proven Track Record"
        description="Measurable results from a Veteran-Owned team committed to disciplined execution, clear communication, and strong Client Partner relationships across the Pacific Northwest."
        variant="primary"
      />

      {/* Enhanced Client Partner Testimonials - Social proof after trust and stats */}
      <TestimonialsSection
        id="testimonials"
        subtitle="Trusted By Our Partners"
        title="What Our Client Partners Say"
        description="Read testimonials from valued Client Partners across the Pacific Northwest who have experienced our collaborative excellence firsthand."
      />

      {/* Our Process Timeline Section - Reinforce confidence before conversion */}
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

      {/* Strategic CTA after proof and process - Combo (App + Pitch Deck + Contact) */}
      <StrategicCTABanner variant="combo" className="my-0" />

      {/* Next Steps Section */}
      <NextStepsSection />
    </>
  );
}
