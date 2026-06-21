import Link from "next/link";
import dynamic from "next/dynamic";
import { PageTrackingClient } from "@/components/analytics";
import { Button } from "@/components/ui";
import { MaterialIcon } from "@/components/icons/MaterialIcon";
import { Breadcrumb } from "@/components/navigation/Breadcrumb";
import { StructuredData } from "@/components/seo/SeoMeta";
import {
  generateBreadcrumbSchema,
  breadcrumbPatterns,
} from "@/lib/seo/breadcrumb-schema";
import { AccreditationsLogoRow } from "@/components/shared-sections";
import { COMPANY_INFO } from "@/lib/constants/company";
import { useTranslations } from "next-intl";
import type { Testimonial } from "@/lib/data/testimonials";
import {
  ServicesHero,
  CoreServicesSection,
  PartnershipTypesSection,
  coreServices,
  specialtyServices,
  serviceAreas,
} from "@/components/services";
const SpecialtyServicesSection = dynamic(() =>
  import("@/components/services").then((m) => ({
    default: m.SpecialtyServicesSection,
  })),
);
const GovernmentProjectsSection = dynamic(() =>
  import("@/components/services").then((m) => ({
    default: m.GovernmentProjectsSection,
  })),
);
const ServiceAreasSection = dynamic(() =>
  import("@/components/services").then((m) => ({
    default: m.ServiceAreasSection,
  })),
);
const WhyChooseUs = dynamic(() =>
  import("@/components/services").then((m) => ({ default: m.WhyChooseUs })),
);
const ConstructionProcessSection = dynamic(() =>
  import("@/components/services").then((m) => ({
    default: m.ConstructionProcessSection,
  })),
);
const ConstructionExpertiseSection = dynamic(() =>
  import("@/components/services").then((m) => ({
    default: m.ConstructionExpertiseSection,
  })),
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

export default function ServicesPage() {
  const tHome = useTranslations("home");
  const tCommon = useTranslations("common");
  const tTestimonialsData = useTranslations("testimonialsData");
  const t = tHome;

  const processSteps = tHome.raw("services.process.steps") as Array<{
    title: string;
    description: string;
    tags: string[];
  }>;

  const processCta = tHome.raw("services.process.cta") as {
    title: string;
    description: string;
    contactButton: string;
    projectsButton: string;
  };

  const clientTestimonials = (
    tTestimonialsData.raw("clientTestimonials") as Array<{
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
  return (
    <>
      <PageTrackingClient pageName="Services" />

      <StructuredData
        data={generateBreadcrumbSchema(breadcrumbPatterns.services)}
      />
      <div className="bg-linear-to-b from-white dark:from-gray-900 to-gray-50 dark:to-gray-800 min-h-screen">
        {/* Hero Section */}
        <ServicesHero />

        {/* Breadcrumb Navigation */}
        <Breadcrumb
          items={[
            { label: tCommon("back"), href: "/" },
            { label: tHome("services.hero.sectionTitle") },
          ]}
        />

        {/* Core Services Section - Primary discovery content */}
        <CoreServicesSection
          services={coreServices}
          title={tHome("services.core.sectionTitle")}
          subtitle={tHome("services.core.sectionSubtitle")}
          description={tHome("services.core.sectionDescription")}
        />

        {/* Specialty Services Section - Expanded discovery */}
        <SpecialtyServicesSection
          services={specialtyServices}
          title={tHome("services.specialty.sectionTitle")}
          subtitle={tHome("services.specialty.sectionSubtitle")}
          description={tHome("services.specialty.sectionDescription")}
        />

        {/* Government & Grant-Funded Projects Section */}
        <GovernmentProjectsSection
          title={tHome("services.government.sectionTitle")}
          subtitle={tHome("services.government.sectionSubtitle")}
          description={tHome("services.government.sectionDescription")}
        />

        {/* Service Areas Section - Clarify geographic fit early */}
        <ServiceAreasSection
          serviceAreas={serviceAreas}
          title={tHome("services.areas.sectionTitle")}
          subtitle={tHome("services.areas.sectionSubtitle")}
          description={tHome("services.areas.sectionDescription")}
        />

        {/* Construction Expertise Section - Trust after concrete offerings */}
        <ConstructionExpertiseSection
          title={tHome("services.expertise.sectionTitle")}
          subtitle={tHome("services.expertise.sectionSubtitle")}
          description={tHome("services.expertise.sectionDescription")}
          priorityHeading={tHome("services.expertise.priorityHeading")}
          priorityDescription={tHome("services.expertise.priorityDescription")}
        />

        {/* Why Choose Us Section - Value proposition after scope is clear */}
        <WhyChooseUs
          title={tHome("services.whyChooseUs.sectionTitle")}
          subtitle={tHome("services.whyChooseUs.sectionSubtitle")}
          description={tHome("services.whyChooseUs.sectionDescription")}
        />

        {/* Construction Process Overview Section - Trust through transparent delivery */}
        <ConstructionProcessSection
          title={tHome("services.process.sectionTitle")}
          subtitle={tHome("services.process.sectionSubtitle")}
          description={tHome("services.process.sectionDescription")}
          steps={processSteps}
          cta={processCta}
        />

        {/* Client Testimonials Section - Proof after capabilities and process */}
        <TestimonialsSection
          id="testimonials"
          subtitle={tHome("services.testimonials.sectionSubtitle")}
          title={tHome("services.testimonials.sectionTitle")}
          description={tHome("services.testimonials.sectionDescription")}
          testimonials={clientTestimonials}
        />

        {/* Portfolio Section - Proof through completed work */}
        <section className="relative bg-white dark:bg-gray-900 py-12 sm:py-16 lg:py-20 xl:py-24 overflow-hidden">
          <div className="relative z-10 mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
            <div className="mb-16 sm:mb-20 text-center">
              <div className="flex items-center justify-center mb-8 gap-4">
                <div className="h-1 w-16 bg-linear-to-r from-transparent to-gray-300 dark:to-gray-600 rounded-full"></div>
                <div className="relative">
                  <div className="absolute -inset-4 bg-linear-to-br from-brand-secondary/30 to-bronze-600/30 blur-2xl rounded-full"></div>
                  <div className="relative bg-linear-to-br from-brand-secondary via-bronze-700 to-bronze-800 p-5 rounded-2xl shadow-2xl border-2 border-white/50 dark:border-gray-600">
                    <MaterialIcon
                      icon="photo_library"
                      size="2xl"
                      className="text-white drop-shadow-lg"
                    />
                  </div>
                </div>
                <div className="h-1 w-16 bg-linear-to-l from-transparent to-gray-300 dark:to-gray-600 rounded-full"></div>
              </div>

              <h2 className="mb-6 sm:mb-8 font-black text-gray-900 dark:text-white text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-relaxed tracking-tighter overflow-visible">
                <span className="block mb-3 sm:mb-4 font-semibold text-gray-700 dark:text-gray-200 text-xl xs:text-2xl sm:text-3xl md:text-4xl lg:text-5xl tracking-tight overflow-visible py-1">
                  {t("services.portfolio.subtitle")}
                </span>
                <span className="block bg-linear-to-r from-brand-primary via-brand-secondary to-brand-primary bg-clip-text text-transparent font-black drop-shadow-sm overflow-visible py-2 pb-3 leading-normal">
                  {t("services.portfolio.title")}
                </span>
              </h2>

              <p className="mx-auto max-w-5xl font-light text-gray-700 dark:text-gray-300 text-base sm:text-lg md:text-xl lg:text-2xl leading-relaxed tracking-wide px-2">
                {t("services.portfolio.description")}
              </p>
            </div>

            <div className="text-center">
              <Link href="/projects">
                <Button
                  variant="primary"
                  size="lg"
                  className="shadow-xl hover:shadow-2xl transition-all duration-300"
                >
                  <MaterialIcon icon="visibility" className="mr-2" size="md" />
                  {t("services.portfolio.button")}
                </Button>
              </Link>
              <p className="mt-4 text-gray-600 dark:text-gray-300">
                <MaterialIcon icon="info" size="sm" className="inline mr-2" />
                {t("services.portfolio.note")}
              </p>
            </div>
          </div>
        </section>

        {/* Accreditations & Certifications - Final proof before action */}
        <section className="relative bg-gray-50 dark:bg-gray-800 py-12 sm:py-16 overflow-hidden">
          <div className="relative mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl text-center">
            <p className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-6">
              {t("services.accreditations.title")}
            </p>
            <AccreditationsLogoRow showChambers={false}>
              <div className="flex items-center gap-2 px-4 py-2 bg-brand-primary/10 dark:bg-brand-primary/20 rounded-full">
                <MaterialIcon
                  icon="verified_user"
                  size="md"
                  className="text-brand-primary"
                />
                <span className="text-base font-semibold text-brand-primary dark:text-brand-primary-light">
                  {t("services.accreditations.licensed")}
                </span>
              </div>
            </AccreditationsLogoRow>
          </div>
        </section>

        {/* Partnership Types Section - Client Partner vs Trade Partner */}
        <PartnershipTypesSection />

        {/* Next Steps Section - Standardized Final CTA */}
        <NextStepsSection
          title={t("services.finalNextSteps.sectionTitle")}
          subtitle={t("services.finalNextSteps.sectionSubtitle")}
          description={t("services.finalNextSteps.sectionDescription")}
        />
      </div>
    </>
  );
}
