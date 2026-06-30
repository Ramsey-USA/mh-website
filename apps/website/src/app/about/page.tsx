import dynamic from "next/dynamic";
import Link from "next/link";
import { PageTrackingClient } from "@/components/analytics";
// Above-fold: static
import {
  AboutHero,
  PartnershipPhilosophy,
  AwardsSection,
} from "@/components/about";
import { useTranslations } from "next-intl";
import type { Testimonial } from "@/lib/data/testimonials";
import { Breadcrumb } from "@/components/navigation/Breadcrumb";
import {
  generateBreadcrumbSchema,
  breadcrumbPatterns,
} from "@/lib/seo/breadcrumb-schema";
import { AccreditationsLogoRow } from "@/components/shared-sections";
import { Button } from "@/components/ui";
import { MaterialIcon } from "@/components/icons/MaterialIcon";
// Below-fold: lazy-loaded to reduce initial JS
const CompanyStats = dynamic(() =>
  import("@/components/about").then((m) => ({ default: m.CompanyStats })),
);
const LeadershipTeam = dynamic(() =>
  import("@/components/about").then((m) => ({ default: m.LeadershipTeam })),
);
const SafetySection = dynamic(() =>
  import("@/components/about").then((m) => ({ default: m.SafetySection })),
);
const NextStepsSection = dynamic(() =>
  import("@/components/shared-sections").then((m) => ({
    default: m.NextStepsSection,
  })),
);

export default function AboutPage() {
  const commonT = useTranslations("common");
  const aboutTitle = commonT("about.hero.sectionTitle").toLowerCase();
  const isSpanish =
    aboutTitle.includes("sobre") || aboutTitle.includes("nosotros");
  const detailsLinkCopy = isSpanish
    ? {
        eyebrow: "DETALLES OPERATIVOS",
        title: "Experiencia en agricultura, bodegas, TI y municipal",
        description:
          "Vea como ejecutamos edificios post-frame, puertas y herrajes, y administracion de proyectos en Procore para comunidades agricolas y vinicolas, mejoras para inquilinos comerciales y obras municipales.",
        cta: "Ver capacidades detalladas",
      }
    : {
        eyebrow: "OPERATIONS DETAIL",
        title: "Depth in AG, winery, TI, and municipal delivery",
        description:
          "See how we execute pole buildings, door and hardware scopes, and Procore-led project management for AG and winery communities, commercial tenant improvements, and municipal builds.",
        cta: "View Detailed Capabilities",
      };
  return (
    <>
      <PageTrackingClient pageName="About" />

      {/* SEO Meta Tags */}
      {/* Structured Data is injected via layout.tsx to avoid duplication */}

      {/* Breadcrumb Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            generateBreadcrumbSchema(breadcrumbPatterns.about),
          ),
        }}
      />

      <div className="bg-linear-to-b from-white dark:from-gray-900 to-gray-50 dark:to-gray-800 min-h-screen">
        {/* Hero Section - Keyword-rich introduction */}
        <AboutHero
          title={commonT("about.hero.sectionTitle")}
          subtitle={commonT("about.hero.sectionSubtitle")}
          description={commonT("about.hero.sectionDescription")}
        />

        {/* Breadcrumb Navigation - Schema markup for SEO */}
        <Breadcrumb
          items={[
            { label: commonT("back"), href: "/" },
            { label: commonT("about.hero.sectionTitle") },
          ]}
        />

        {/* Partnership Philosophy Section - Story and positioning first */}
        <PartnershipPhilosophy />

        {/* Leadership Team Section - Faces and structure build trust early */}
        <LeadershipTeam
          title={commonT("about.leadershipTeam.sectionTitle")}
          subtitle={commonT("about.leadershipTeam.sectionSubtitle")}
          description={commonT("about.leadershipTeam.sectionDescription")}
        />

        {/* Company Stats - Proof after story and leadership */}
        <CompanyStats
          id="stats"
          subtitle={commonT("about.companyStats.sectionSubtitle")}
          title={commonT("about.companyStats.sectionTitle")}
          description={commonT("about.companyStats.sectionDescription")}
          variant="primary"
        />

        {/* Awards & Recognition Section - External proof signals */}
        <AwardsSection />

        {/* Accreditations & Certifications - Credential logos */}
        <section className="relative py-12 sm:py-14 bg-gray-50 dark:bg-gray-800/60">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
            <p className="text-sm font-semibold text-brand-primary dark:text-brand-primary-light tracking-widest uppercase mb-6">
              {commonT("about.accreditations.sectionTitle")}
            </p>
            <AccreditationsLogoRow />
          </div>
        </section>

        {/* Safety & Compliance Section - Verified operational proof */}
        <SafetySection
          title={commonT("about.safety.sectionTitle")}
          subtitle={commonT("about.safety.sectionSubtitle")}
          description={commonT("about.safety.sectionDescription")}
        />

        {/* About Details Link - Keep page concise while preserving full depth */}
        <section className="bg-white dark:bg-gray-900 py-10 sm:py-12">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
            <p className="font-semibold text-brand-secondary text-sm tracking-[0.18em] uppercase mb-3">
              {detailsLinkCopy.eyebrow}
            </p>
            <h2 className="font-black text-2xl sm:text-3xl text-gray-900 dark:text-white leading-tight mb-4">
              {detailsLinkCopy.title}
            </h2>
            <p className="text-gray-600 dark:text-gray-300 text-base sm:text-lg leading-relaxed mb-6">
              {detailsLinkCopy.description}
            </p>
            <Link href="/about/details">
              <Button variant="secondary" size="lg" className="group">
                <MaterialIcon
                  icon="history_edu"
                  size="md"
                  className="mr-2 group-hover:scale-110 transition-transform"
                />
                {detailsLinkCopy.cta}
              </Button>
            </Link>
          </div>
        </section>

        {/* Next Steps Section - Final conversion action */}
        <NextStepsSection
          title={commonT("about.nextSteps.sectionTitle")}
          subtitle={commonT("about.nextSteps.sectionSubtitle")}
          description={commonT("about.nextSteps.sectionDescription")}
        />
      </div>
    </>
  );
}
