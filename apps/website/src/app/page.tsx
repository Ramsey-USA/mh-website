import { type Metadata } from "next";
import { cookies, headers } from "next/headers";
import { StructuredData } from "@/components/seo/SeoMeta";
import { PageTrackingClient } from "@/components/analytics";
import { HomePageSentrySupport } from "@/components/monitoring/HomePageSentrySupport";
import dynamic from "next/dynamic";
import { getTranslations } from "next-intl/server";
import type { Testimonial } from "@/lib/data/testimonials";
import { withGeoMetadata } from "@/lib/seo/geo-metadata";
import { getHomepageSEO } from "@/lib/seo/page-seo-utils";
import { normalizeLocale } from "@/lib/i18n/locale";
import enHome from "@/../messages/home/en.json";
import esHome from "@/../messages/home/es.json";

import {
  HeroSection,
  CoreValuesSection,
  WhyPartnerSection,
} from "@/components/home";
import { ServicesShowcaseDeferred } from "@/components/home/ServicesShowcaseDeferred";
import { TestimonialsSectionDeferred } from "@/components/home/TestimonialsSectionDeferred";
import { TimelineDeferred } from "@/components/home/TimelineDeferred";

const CompanyStats = dynamic(
  () =>
    import("@/components/about").then((mod) => ({
      default: mod.CompanyStats,
    })),
  { ssr: true },
);
const NextStepsSection = dynamic(
  () =>
    import("@/components/shared-sections").then((mod) => ({
      default: mod.NextStepsSection,
    })),
  { ssr: true },
);

const SITE_URL = "https://www.mhc-gc.com";
const HOME_COPY_BY_LOCALE = {
  en: enHome,
  es: esHome,
} as const;

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

export default async function Home() {
  // Analytics tracking remains client-only while page rendering stays server-first

  // Get enhanced SEO data for homepage
  const homepageSEO = getHomepageSEO();
  const cookieStore = await cookies();
  const locale = normalizeLocale(cookieStore.get("locale")?.value);
  const tTestimonials = await getTranslations({
    locale,
    namespace: "testimonialsData",
  });
  const homeCopy = HOME_COPY_BY_LOCALE[locale] ?? enHome;
  const clientTestimonials = (
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
      image?: string;
      category?: string;
    }>
  ).map(
    (testimonial) =>
      ({
        ...testimonial,
        type: "client",
      }) as Testimonial,
  );
  const processSteps = homeCopy.process.steps.map((step, index) => ({
    num: index + 1,
    icon:
      ["engineering", "payments", "verified", "forum", "task_alt"][index] ??
      "timeline",
    title: step.title,
    desc: step.desc,
    position: index % 2 === 0 ? ("left" as const) : ("right" as const),
  }));
  const isProduction = process.env.NODE_ENV === "production";
  const requestHeaders = await headers();
  const isLighthouseAudit = /Chrome-Lighthouse/i.test(
    requestHeaders.get("user-agent") ?? "",
  );
  const enableHomeTelemetry = isProduction && !isLighthouseAudit;

  return (
    <>
      {enableHomeTelemetry ? <PageTrackingClient pageName="Home" /> : null}
      {enableHomeTelemetry ? <HomePageSentrySupport /> : null}

      {/* Enhanced SEO structured data for Veteran-Owned construction excellence */}
      {isProduction ? <StructuredData data={homepageSEO.schemas} /> : null}

      {/* Home Page Hero Section */}
      <HeroSection locale={locale} copy={homeCopy.hero} />

      {/* Showcase of Services Section - Primary discovery path */}
      <ServicesShowcaseDeferred
        className="py-10 sm:py-12 lg:py-14 xl:py-16"
        maxVisibleCards={2}
      />

      {/* Why Partner With MH Construction Section - Partnership philosophy */}
      <WhyPartnerSection
        sectionVariant="white"
        className="py-8 sm:py-10 lg:py-12"
        condensed
        condensedVisibleCount={2}
        locale={locale}
      />

      {/* Core Values Section - Trust foundation after differentiator */}
      <CoreValuesSection
        sectionVariant="gray"
        className="py-8 sm:py-10 lg:py-12"
        animated={false}
        condensed
        locale={locale}
      />

      {/* Company Statistics Section - Proof after discovery and trust */}
      <CompanyStats
        id="stats"
        subtitle={homeCopy.companyStats.subtitle}
        title={homeCopy.companyStats.title}
        description={homeCopy.companyStats.description}
        variant="primary"
        className="bg-gray-50 dark:bg-gray-800 py-8 sm:py-10 lg:py-12"
        animated={false}
      />

      {/* Enhanced Client Partner Testimonials - Social proof after trust and stats */}
      <TestimonialsSectionDeferred
        id="testimonials"
        subtitle={homeCopy.testimonials.subtitle}
        title={homeCopy.testimonials.title}
        description={homeCopy.testimonials.description}
        testimonials={clientTestimonials}
        className="py-8 sm:py-10 lg:py-12"
        animated={false}
      />

      {/* Our Process Timeline Section - Reinforce confidence before conversion */}
      <TimelineDeferred
        id="our-process"
        icon="timeline"
        subtitle={homeCopy.process.subtitle}
        title={homeCopy.process.title}
        description={
          <>
            {homeCopy.process.descriptionPart1}{" "}
            <span className="font-bold text-brand-primary dark:text-brand-primary-light">
              {homeCopy.process.descriptionPart2}
            </span>
            {homeCopy.process.descriptionPart3}{" "}
            <span className="font-bold text-gray-900 dark:text-white">
              {homeCopy.process.descriptionPart4}
            </span>
            {homeCopy.process.descriptionPart5}
          </>
        }
        steps={processSteps}
        compact
        initiallyVisibleSteps={3}
        expandStepsLabel={
          locale === "es" ? "Ver los 5 pasos" : "View all 5 steps"
        }
        collapseStepsLabel={
          locale === "es" ? "Mostrar menos pasos" : "Show fewer steps"
        }
        className="bg-gray-50 dark:bg-gray-800 py-8 sm:py-10 lg:py-12"
      />

      {/* Next Steps Section */}
      <NextStepsSection locale={locale} />
    </>
  );
}
