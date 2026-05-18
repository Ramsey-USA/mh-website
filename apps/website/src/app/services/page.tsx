import Link from "next/link";
import dynamic from "next/dynamic";
import { PageTrackingClient } from "@/components/analytics";
import { Button, IconContainer } from "@/components/ui";
import { MaterialIcon } from "@/components/icons/MaterialIcon";
import {
  DiagonalStripePattern,
  BrandColorBlobs,
} from "@/components/ui/backgrounds";
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

        {/* Client Testimonials Section - Proof after capabilities and trust */}
        <TestimonialsSection
          id="testimonials"
          subtitle={tHome("services.testimonials.sectionSubtitle")}
          title={tHome("services.testimonials.sectionTitle")}
          description={tHome("services.testimonials.sectionDescription")}
          testimonials={clientTestimonials}
        />

        {/* Construction Process Overview Section */}
        <ConstructionProcessSection
          title={tHome("services.process.sectionTitle")}
          subtitle={tHome("services.process.sectionSubtitle")}
          description={tHome("services.process.sectionDescription")}
          steps={processSteps}
          cta={processCta}
        />

        {/* Partnership Types Section - Client Partner vs Trade Partner */}
        <section className="relative bg-white dark:bg-gray-900 py-12 sm:py-16 lg:py-20 xl:py-24 overflow-hidden">
          <DiagonalStripePattern />
          <BrandColorBlobs />

          <div className="relative mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
            {/* Section Header - Partnership Excellence */}
            <div className="mb-16 sm:mb-20 text-center">
              {/* Icon with decorative lines */}
              <div className="flex items-center justify-center mb-8 gap-4">
                <div className="h-1 w-16 bg-linear-to-r from-transparent to-gray-300 dark:to-gray-600 rounded-full"></div>
                <div className="relative">
                  <div className="absolute -inset-4 bg-linear-to-br from-brand-secondary/30 to-bronze-700/30 blur-2xl rounded-full"></div>
                  <div className="relative bg-linear-to-br from-brand-secondary via-bronze-700 to-bronze-800 p-5 rounded-2xl shadow-2xl border-2 border-white/50 dark:border-gray-600">
                    <MaterialIcon
                      icon="diversity_3"
                      size="2xl"
                      className="text-white drop-shadow-lg"
                    />
                  </div>
                </div>
                <div className="h-1 w-16 bg-linear-to-l from-transparent to-gray-300 dark:to-gray-600 rounded-full"></div>
              </div>

              {/* Two-line gradient heading */}
              <h2 className="mb-6 sm:mb-8 font-black text-gray-900 dark:text-white text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-relaxed tracking-tighter overflow-visible">
                <span className="block mb-3 sm:mb-4 font-semibold text-gray-700 dark:text-gray-200 text-xl xs:text-2xl sm:text-3xl md:text-4xl lg:text-5xl tracking-tight overflow-visible py-1">
                  {t("services.partnership.sectionSubtitle")}
                </span>
                <span className="block bg-linear-to-r from-brand-primary via-brand-secondary to-brand-primary bg-clip-text text-transparent font-black drop-shadow-sm overflow-visible py-2 pb-3 leading-normal">
                  {t("services.partnership.sectionTitle")}
                </span>
              </h2>

              {/* Description with colored keyword highlighting */}
              <p className="mx-auto max-w-5xl font-light text-gray-700 dark:text-gray-300 text-base sm:text-lg md:text-xl lg:text-2xl leading-relaxed tracking-wide px-2">
                {t("services.partnership.sectionDescription")}
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-8 lg:gap-10 max-w-6xl mx-auto">
              {/* Client Partner Relationships */}
              <div className="group relative flex h-full">
                {/* Animated Border Glow */}
                <div className="absolute -inset-2 bg-linear-to-br from-brand-primary/40 to-brand-primary-dark/40 rounded-2xl opacity-20 group-hover:opacity-100 blur-xl transition-all duration-500 group-hover:animate-pulse"></div>

                <div className="relative bg-white dark:bg-gray-800 rounded-xl border-2 border-gray-200 dark:border-gray-700 group-hover:border-transparent shadow-lg group-hover:shadow-2xl transition-all duration-300 overflow-hidden flex flex-col w-full">
                  {/* Top Accent Bar */}
                  <div className="h-2 bg-linear-to-r from-brand-primary via-brand-primary-dark to-brand-primary-darker"></div>

                  <div className="relative p-8 lg:p-10 flex flex-col flex-1">
                    <div className="flex items-center gap-4 mb-6">
                      <div className="relative shrink-0">
                        {/* Blur glow layer behind icon */}
                        <div className="absolute -inset-2 bg-linear-to-br from-brand-primary/40 to-brand-primary-dark/40 opacity-30 blur-lg rounded-2xl"></div>
                        <div className="relative w-16 h-16 lg:w-18 lg:h-18 bg-linear-to-br from-brand-primary to-brand-primary-dark rounded-2xl flex items-center justify-center shadow-xl group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
                          <MaterialIcon
                            icon="handshake"
                            size="xl"
                            className="text-white drop-shadow-lg"
                          />
                        </div>
                      </div>
                      <div>
                        <h3 className="font-black text-gray-900 dark:text-white text-2xl sm:text-3xl leading-tight">
                          {t("services.partnership.clientCard.title")}
                        </h3>
                        <p className="text-brand-primary dark:text-brand-primary-light font-semibold text-lg">
                          {t("services.partnership.clientCard.subtitle")}
                        </p>
                      </div>
                    </div>

                    <p className="text-gray-700 dark:text-gray-300 text-lg leading-relaxed mb-6">
                      {t("services.partnership.clientCard.description")}
                    </p>

                    <div className="mb-6 grow">
                      <h4 className="font-bold text-gray-900 dark:text-white text-xl mb-4">
                        {t("services.partnership.clientCard.listTitle")}
                      </h4>
                      <ul className="space-y-3">
                        <li className="flex items-start gap-3 hover:translate-x-1 transition-transform duration-200">
                          <div className="w-6 h-6 bg-brand-primary/10 dark:bg-brand-primary/20 rounded-lg flex items-center justify-center mt-1 shrink-0">
                            <MaterialIcon
                              icon="check_circle"
                              size="sm"
                              className="text-brand-primary"
                            />
                          </div>
                          <span className="text-gray-700 dark:text-gray-300">
                            {t("services.partnership.clientCard.items.0")}
                          </span>
                        </li>
                        <li className="flex items-start gap-3 hover:translate-x-1 transition-transform duration-200">
                          <div className="w-6 h-6 bg-brand-primary/10 dark:bg-brand-primary/20 rounded-lg flex items-center justify-center mt-1 shrink-0">
                            <MaterialIcon
                              icon="check_circle"
                              size="sm"
                              className="text-brand-primary"
                            />
                          </div>
                          <span className="text-gray-700 dark:text-gray-300">
                            {t("services.partnership.clientCard.items.1")}
                          </span>
                        </li>
                        <li className="flex items-start gap-3 hover:translate-x-1 transition-transform duration-200">
                          <div className="w-6 h-6 bg-brand-primary/10 dark:bg-brand-primary/20 rounded-lg flex items-center justify-center mt-1 shrink-0">
                            <MaterialIcon
                              icon="check_circle"
                              size="sm"
                              className="text-brand-primary"
                            />
                          </div>
                          <span className="text-gray-700 dark:text-gray-300">
                            {t("services.partnership.clientCard.items.2")}
                          </span>
                        </li>
                        <li className="flex items-start gap-3 hover:translate-x-1 transition-transform duration-200">
                          <div className="w-6 h-6 bg-brand-primary/10 dark:bg-brand-primary/20 rounded-lg flex items-center justify-center mt-1 shrink-0">
                            <MaterialIcon
                              icon="check_circle"
                              size="sm"
                              className="text-brand-primary"
                            />
                          </div>
                          <span className="text-gray-700 dark:text-gray-300">
                            {t("services.partnership.clientCard.items.3")}
                          </span>
                        </li>
                        <li className="flex items-start gap-3 hover:translate-x-1 transition-transform duration-200">
                          <div className="w-6 h-6 bg-brand-primary/10 dark:bg-brand-primary/20 rounded-lg flex items-center justify-center mt-1 shrink-0">
                            <MaterialIcon
                              icon="check_circle"
                              size="sm"
                              className="text-brand-primary"
                            />
                          </div>
                          <span className="text-gray-700 dark:text-gray-300">
                            {t("services.partnership.clientCard.items.4")}
                          </span>
                        </li>
                      </ul>
                    </div>

                    <div className="space-y-3 mt-auto">
                      <Link href="/projects" className="block">
                        <Button
                          variant="secondary"
                          size="lg"
                          className="w-full hover:scale-105 transition-transform duration-300 group"
                        >
                          <MaterialIcon
                            icon="photo_library"
                            size="md"
                            className="mr-2 group-hover:scale-110 transition-transform duration-300"
                          />
                          {t(
                            "services.partnership.clientCard.buttons.viewWork",
                          )}
                        </Button>
                      </Link>
                      <Link href="/contact" className="block">
                        <Button
                          variant="outline"
                          size="lg"
                          className="w-full hover:scale-105 transition-transform duration-300 group"
                        >
                          <MaterialIcon
                            icon="phone"
                            size="md"
                            className="mr-2 group-hover:scale-110 transition-transform duration-300"
                          />
                          {t(
                            "services.partnership.clientCard.buttons.scheduleConsultation",
                          )}
                        </Button>
                      </Link>
                      <p className="text-center text-gray-600 dark:text-gray-300 text-sm">
                        <MaterialIcon
                          icon="phone"
                          size="sm"
                          className="inline mr-1"
                        />
                        {t("services.partnership.callLabel")}{" "}
                        {COMPANY_INFO.phone.display}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Trade Partnerships */}
              <div className="group relative flex h-full">
                {/* Animated Border Glow */}
                <div className="absolute -inset-2 bg-linear-to-br from-brand-secondary/40 to-bronze-700/40 rounded-2xl opacity-20 group-hover:opacity-100 blur-xl transition-all duration-500 group-hover:animate-pulse"></div>

                <div className="relative bg-white dark:bg-gray-800 rounded-xl border-2 border-gray-200 dark:border-gray-700 group-hover:border-transparent shadow-lg group-hover:shadow-2xl transition-all duration-300 overflow-hidden flex flex-col w-full">
                  {/* Top Accent Bar */}
                  <div className="h-2 bg-linear-to-r from-brand-secondary via-bronze-700 to-bronze-800"></div>

                  <div className="relative p-8 lg:p-10 flex flex-col flex-1">
                    <div className="flex items-center gap-4 mb-6">
                      <div className="relative shrink-0">
                        {/* Blur glow layer behind icon */}
                        <div className="absolute -inset-2 bg-linear-to-br from-brand-secondary/40 to-bronze-700/40 opacity-30 blur-lg rounded-2xl"></div>
                        <div className="relative w-16 h-16 lg:w-18 lg:h-18 bg-linear-to-br from-brand-secondary to-bronze-700 rounded-2xl flex items-center justify-center shadow-xl group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
                          <MaterialIcon
                            icon="construction"
                            size="xl"
                            className="text-white drop-shadow-lg"
                          />
                        </div>
                      </div>
                      <div>
                        <h3 className="font-black text-gray-900 dark:text-white text-2xl sm:text-3xl leading-tight">
                          {t("services.partnership.tradeCard.title")}
                        </h3>
                        <p className="text-brand-secondary dark:text-brand-secondary-light font-semibold text-lg">
                          {t("services.partnership.tradeCard.subtitle")}
                        </p>
                      </div>
                    </div>

                    <p className="text-gray-700 dark:text-gray-300 text-lg leading-relaxed mb-6">
                      {t("services.partnership.tradeCard.description")}
                    </p>

                    <div className="mb-6 grow">
                      <h4 className="font-bold text-gray-900 dark:text-white text-xl mb-4">
                        {t("services.partnership.tradeCard.listTitle")}
                      </h4>
                      <ul className="space-y-3">
                        <li className="flex items-start gap-3 hover:translate-x-1 transition-transform duration-200">
                          <div className="w-6 h-6 bg-brand-secondary/10 dark:bg-brand-secondary/20 rounded-lg flex items-center justify-center mt-1 shrink-0">
                            <MaterialIcon
                              icon="check_circle"
                              size="sm"
                              className="text-brand-secondary"
                            />
                          </div>
                          <span className="text-gray-700 dark:text-gray-300">
                            {t("services.partnership.tradeCard.items.0")}
                          </span>
                        </li>
                        <li className="flex items-start gap-3 hover:translate-x-1 transition-transform duration-200">
                          <div className="w-6 h-6 bg-brand-secondary/10 dark:bg-brand-secondary/20 rounded-lg flex items-center justify-center mt-1 shrink-0">
                            <MaterialIcon
                              icon="check_circle"
                              size="sm"
                              className="text-brand-secondary"
                            />
                          </div>
                          <span className="text-gray-700 dark:text-gray-300">
                            {t("services.partnership.tradeCard.items.1")}
                          </span>
                        </li>
                        <li className="flex items-start gap-3 hover:translate-x-1 transition-transform duration-200">
                          <div className="w-6 h-6 bg-brand-secondary/10 dark:bg-brand-secondary/20 rounded-lg flex items-center justify-center mt-1 shrink-0">
                            <MaterialIcon
                              icon="check_circle"
                              size="sm"
                              className="text-brand-secondary"
                            />
                          </div>
                          <span className="text-gray-700 dark:text-gray-300">
                            {t("services.partnership.tradeCard.items.2")}
                          </span>
                        </li>
                        <li className="flex items-start gap-3 hover:translate-x-1 transition-transform duration-200">
                          <div className="w-6 h-6 bg-brand-secondary/10 dark:bg-brand-secondary/20 rounded-lg flex items-center justify-center mt-1 shrink-0">
                            <MaterialIcon
                              icon="check_circle"
                              size="sm"
                              className="text-brand-secondary"
                            />
                          </div>
                          <span className="text-gray-700 dark:text-gray-300">
                            {t("services.partnership.tradeCard.items.3")}
                          </span>
                        </li>
                        <li className="flex items-start gap-3 hover:translate-x-1 transition-transform duration-200">
                          <div className="w-6 h-6 bg-brand-secondary/10 dark:bg-brand-secondary/20 rounded-lg flex items-center justify-center mt-1 shrink-0">
                            <MaterialIcon
                              icon="check_circle"
                              size="sm"
                              className="text-brand-secondary"
                            />
                          </div>
                          <span className="text-gray-700 dark:text-gray-300">
                            {t("services.partnership.tradeCard.items.4")}
                          </span>
                        </li>
                      </ul>
                    </div>

                    <div className="space-y-3 mt-auto">
                      <Link href="/allies" className="block">
                        <Button
                          variant="secondary"
                          size="lg"
                          className="w-full hover:scale-105 transition-transform duration-300 group"
                        >
                          <MaterialIcon
                            icon="construction"
                            size="md"
                            className="mr-2 group-hover:scale-110 transition-transform duration-300"
                          />
                          {t(
                            "services.partnership.tradeCard.buttons.joinNetwork",
                          )}
                        </Button>
                      </Link>
                      <Link href="/allies#vendor-application" className="block">
                        <Button
                          variant="outline"
                          size="lg"
                          className="w-full hover:scale-105 transition-transform duration-300 group"
                        >
                          <MaterialIcon
                            icon="description"
                            size="md"
                            className="mr-2 group-hover:scale-110 transition-transform duration-300"
                          />
                          {t(
                            "services.partnership.tradeCard.buttons.downloadPackage",
                          )}
                        </Button>
                      </Link>
                      <p className="text-center text-gray-600 dark:text-gray-300 text-sm">
                        <MaterialIcon
                          icon="phone"
                          size="sm"
                          className="inline mr-1"
                        />
                        {t("services.partnership.callLabel")}{" "}
                        {COMPANY_INFO.phone.display}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Note */}
            <div className="mt-16 lg:mt-20 text-center max-w-3xl mx-auto">
              <div className="relative bg-linear-to-r from-gray-50 via-white to-gray-50 dark:from-gray-800 dark:via-gray-850 dark:to-gray-800 p-6 lg:p-8 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-lg">
                <p className="text-gray-700 dark:text-gray-300 text-lg leading-relaxed">
                  <MaterialIcon
                    icon="info"
                    size="md"
                    className="inline mr-2 text-brand-primary align-text-bottom"
                  />
                  <span className="font-medium">
                    {t("services.partnership.bottomNote.title")}
                  </span>{" "}
                  {t("services.partnership.bottomNote.description")}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Next Steps Section */}
        <section
          id="next-steps"
          className="relative bg-linear-to-br from-brand-primary via-brand-primary-dark to-brand-secondary py-12 sm:py-16 lg:py-20 xl:py-24"
        >
          <div className="absolute inset-0 bg-[url('/images/textures/construction-pattern.svg')] opacity-5"></div>
          <div className="relative mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
            <div className="mb-16 sm:mb-20 text-center">
              {/* Icon with decorative lines */}
              <div className="flex items-center justify-center mb-8 gap-4">
                <div className="h-1 w-16 bg-linear-to-r from-transparent to-white/30 rounded-full"></div>
                <div className="relative">
                  <div className="absolute -inset-4 bg-white/20 blur-2xl rounded-full"></div>
                  <div className="relative bg-linear-to-br from-white/90 via-white to-white/90 p-5 rounded-2xl shadow-2xl border-2 border-white/50">
                    <MaterialIcon
                      icon="rocket_launch"
                      size="2xl"
                      className="text-brand-primary drop-shadow-lg"
                    />
                  </div>
                </div>
                <div className="h-1 w-16 bg-linear-to-l from-transparent to-white/30 rounded-full"></div>
              </div>

              {/* Two-line gradient heading */}
              <h2 className="mb-6 sm:mb-8 font-black text-white text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-relaxed tracking-tighter overflow-visible">
                <span className="block mb-3 sm:mb-4 font-semibold text-white/80 text-xl xs:text-2xl sm:text-3xl md:text-4xl lg:text-5xl tracking-tight overflow-visible py-1">
                  {t("services.deepNextSteps.subtitle")}
                </span>
                <span className="block text-white font-black drop-shadow-lg overflow-visible py-2 pb-3 leading-normal">
                  {t("services.deepNextSteps.title")}
                </span>
              </h2>

              {/* Description with colored keyword highlighting */}
              <p className="mx-auto max-w-5xl font-light text-white/90 text-base sm:text-lg md:text-xl lg:text-2xl leading-relaxed tracking-wide px-2">
                {t("services.deepNextSteps.description")}
              </p>
            </div>

            <div className="gap-8 grid grid-cols-1 md:grid-cols-3">
              {/* Option 1: Request Estimate */}
              <div className="relative bg-linear-to-br from-white via-gray-50 to-white dark:from-gray-800 dark:via-gray-850 dark:to-gray-800 shadow-2xl hover:shadow-[0_20px_60px_-15px_rgba(56,104,81,0.3)] p-8 rounded-2xl transition-all duration-300 transform hover:-translate-y-2 border-4 border-brand-primary hover:border-brand-primary-dark group overflow-hidden">
                {/* Decorative background blur */}
                <div className="absolute -top-10 -right-10 w-32 h-32 bg-brand-primary/10 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-500"></div>

                <div className="bg-brand-primary -top-4 left-1/2 absolute px-4 py-1 rounded-full -translate-x-1/2 shadow-lg">
                  <span className="font-bold text-sm text-white uppercase tracking-wide">
                    {t("services.deepNextSteps.cards.estimate.badge")}
                  </span>
                </div>
                <IconContainer
                  size="lg"
                  gradient="primary"
                  className="mx-auto mb-6"
                >
                  <MaterialIcon
                    icon="calculate"
                    size="xl"
                    className="text-white group-hover:rotate-12 transition-transform duration-300"
                  />
                </IconContainer>
                <h3 className="relative mb-4 font-bold text-2xl text-center text-gray-900 dark:text-white">
                  {t("services.deepNextSteps.cards.estimate.title")}
                </h3>
                <p className="relative mb-6 text-center text-gray-600 text-lg dark:text-gray-300 leading-relaxed">
                  {t("services.deepNextSteps.cards.estimate.description")}
                </p>
                <Link href="/contact">
                  <Button
                    variant="primary"
                    size="lg"
                    className="relative w-full group/btn hover:scale-105 transition-transform duration-200"
                  >
                    <MaterialIcon
                      icon="phone"
                      size="md"
                      className="mr-2 group-hover/btn:rotate-12 transition-transform duration-300"
                    />
                    {t("services.deepNextSteps.cards.estimate.button")}
                  </Button>
                </Link>
              </div>

              {/* Option 2: View Our Work */}
              <div className="relative bg-linear-to-br from-white via-gray-50 to-white dark:from-gray-800 dark:via-gray-850 dark:to-gray-800 shadow-2xl hover:shadow-[0_20px_60px_-15px_rgba(189,146,100,0.3)] p-8 rounded-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-200 dark:border-gray-700 hover:border-brand-secondary group overflow-hidden">
                {/* Decorative background blur */}
                <div className="absolute -top-10 -left-10 w-32 h-32 bg-brand-secondary/10 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-500"></div>

                <IconContainer
                  size="lg"
                  gradient="secondary"
                  className="mx-auto mb-6"
                >
                  <MaterialIcon
                    icon="photo_library"
                    size="xl"
                    className="text-white group-hover:rotate-12 transition-transform duration-300"
                  />
                </IconContainer>
                <h3 className="relative mb-4 font-bold text-2xl text-center text-gray-900 dark:text-white">
                  {t("services.deepNextSteps.cards.projects.title")}
                </h3>
                <p className="relative mb-6 text-center text-gray-600 text-lg dark:text-gray-300 leading-relaxed">
                  {t("services.deepNextSteps.cards.projects.description")}
                </p>
                <Link href="/projects">
                  <Button
                    variant="secondary"
                    size="lg"
                    className="relative w-full group/btn hover:scale-105 transition-transform duration-200"
                  >
                    <MaterialIcon
                      icon="photo_library"
                      size="md"
                      className="mr-2 group-hover/btn:rotate-12 transition-transform duration-300"
                    />
                    {t("services.deepNextSteps.cards.projects.button")}
                  </Button>
                </Link>
              </div>

              {/* Option 3: Contact Us */}
              <div className="relative bg-linear-to-br from-white via-gray-50 to-white dark:from-gray-800 dark:via-gray-850 dark:to-gray-800 shadow-2xl hover:shadow-[0_20px_60px_-15px_rgba(56,104,81,0.3)] p-8 rounded-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-200 dark:border-gray-700 hover:border-brand-primary group overflow-hidden">
                {/* Decorative background blur */}
                <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-brand-primary/10 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-500"></div>

                <IconContainer
                  size="lg"
                  gradient="primary"
                  className="mx-auto mb-6"
                >
                  <MaterialIcon
                    icon="forum"
                    size="xl"
                    className="text-white group-hover:rotate-12 transition-transform duration-300"
                  />
                </IconContainer>
                <h3 className="relative mb-4 font-bold text-2xl text-center text-gray-900 dark:text-white">
                  {t("services.deepNextSteps.cards.contact.title")}
                </h3>
                <p className="relative mb-6 text-center text-gray-600 text-lg dark:text-gray-300 leading-relaxed">
                  {t("services.deepNextSteps.cards.contact.description")}
                </p>
                <Link href="/contact">
                  <Button
                    variant="primary"
                    size="lg"
                    className="relative w-full group/btn hover:scale-105 transition-all duration-200"
                  >
                    <MaterialIcon
                      icon="mail"
                      size="md"
                      className="mr-2 group-hover/btn:rotate-12 transition-transform duration-300"
                    />
                    {t("services.deepNextSteps.cards.contact.button")}
                  </Button>
                </Link>
              </div>
            </div>

            {/* Trust Stats */}
            <div className="gap-8 grid grid-cols-2 md:grid-cols-4 mt-16 text-center text-white">
              <div className="group">
                <p className="mb-2 font-black text-4xl lg:text-5xl group-hover:scale-110 transition-transform duration-300 inline-block">
                  150+
                </p>
                <p className="text-white/90 text-lg">
                  {t("services.deepNextSteps.stats.experience")}
                </p>
              </div>
              <div className="group">
                <p className="mb-2 font-black text-4xl lg:text-5xl group-hover:scale-110 transition-transform duration-300 inline-block">
                  .64 EMR
                </p>
                <p className="text-white/90 text-lg">
                  {t("services.deepNextSteps.stats.safety")}
                </p>
              </div>
              <div className="group">
                <p className="mb-2 font-black text-4xl lg:text-5xl group-hover:scale-110 transition-transform duration-300 inline-block">
                  3-5 Days
                </p>
                <p className="text-white/90 text-lg">
                  {t("services.deepNextSteps.stats.turnaround")}
                </p>
              </div>
              <div className="group">
                <p className="mb-2 font-black text-4xl lg:text-5xl group-hover:scale-110 transition-transform duration-300 inline-block">
                  70%
                </p>
                <p className="text-white/90 text-lg">
                  {t("services.deepNextSteps.stats.referral")}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Contact CTA - Ask Questions */}
        <section className="relative bg-linear-to-r from-brand-primary to-brand-primary-dark py-12 sm:py-16 lg:py-20 xl:py-24 overflow-hidden">
          <div className="relative mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl text-center">
            <h2 className="mb-6 font-black text-white text-3xl sm:text-4xl md:text-5xl lg:text-6xl leading-tight tracking-tighter drop-shadow-lg">
              {t("services.contactCta.heading")}
            </h2>
            <p className="mx-auto max-w-3xl font-light text-white/90 text-lg sm:text-xl md:text-2xl leading-relaxed mb-8">
              {t("services.contactCta.description")}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="secondary" size="lg" asChild>
                <Link href="/contact">
                  <MaterialIcon icon="phone" className="mr-2" />
                  {t("services.contactCta.primaryButton")}
                </Link>
              </Button>
              <Button
                variant="outline"
                size="lg"
                asChild
                className="bg-white/10 hover:bg-white/20 text-white border-white/30"
              >
                <a href={`tel:${COMPANY_INFO.phone.tel}`}>
                  <MaterialIcon icon="call" className="mr-2" />
                  {t("services.partnership.callLabel")}{" "}
                  {COMPANY_INFO.phone.display}
                </a>
              </Button>
            </div>
          </div>
        </section>

        {/* Portfolio Section - Simplified */}
        <section className="relative bg-white dark:bg-gray-900 py-12 sm:py-16 lg:py-20 xl:py-24 overflow-hidden">
          <div className="relative z-10 mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
            {/* Section Header - Portfolio Overview */}
            <div className="mb-16 sm:mb-20 text-center">
              {/* Icon with decorative lines */}
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

              {/* Two-line gradient heading */}
              <h2 className="mb-6 sm:mb-8 font-black text-gray-900 dark:text-white text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-relaxed tracking-tighter overflow-visible">
                <span className="block mb-3 sm:mb-4 font-semibold text-gray-700 dark:text-gray-200 text-xl xs:text-2xl sm:text-3xl md:text-4xl lg:text-5xl tracking-tight overflow-visible py-1">
                  {t("services.portfolio.subtitle")}
                </span>
                <span className="block bg-linear-to-r from-brand-primary via-brand-secondary to-brand-primary bg-clip-text text-transparent font-black drop-shadow-sm overflow-visible py-2 pb-3 leading-normal">
                  {t("services.portfolio.title")}
                </span>
              </h2>

              {/* Description with colored keyword highlighting */}
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

        {/* Accreditations & Certifications */}
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
