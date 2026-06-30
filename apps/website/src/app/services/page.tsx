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
const ConstructionProcessSection = dynamic(() =>
  import("@/components/services").then((m) => ({
    default: m.ConstructionProcessSection,
  })),
);
const TestimonialsSection = dynamic(() =>
  import("@/components/shared-sections").then((m) => ({
    default: m.TestimonialsSection,
  })),
);

export default function ServicesPage() {
  const tHome = useTranslations("home");
  const tCommon = useTranslations("common");
  const tTestimonialsData = useTranslations("testimonialsData");
  const t = tHome;
  const isSpanish = tCommon("back").toLowerCase().includes("volver");

  const processSteps = tHome.raw("services.process.steps") as Array<{
    title: string;
    description: string;
    tags: string[];
  }>;
  const processPreviewSteps = processSteps.slice(0, 2);

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

        {/* Market Router + Ownership Summary */}
        <section className="relative bg-white dark:bg-gray-900 py-8 sm:py-10 lg:py-12 overflow-hidden">
          <div className="relative z-10 mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
            <div className="rounded-2xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 p-6 sm:p-8 shadow-sm">
              <h2 className="text-2xl sm:text-3xl font-black text-gray-900 dark:text-white leading-tight text-center">
                {isSpanish
                  ? "Elija su mercado y vea el modelo operativo"
                  : "Choose your market and view the operating model"}
              </h2>
              <p className="mt-3 text-center text-sm sm:text-base text-gray-700 dark:text-gray-300 leading-relaxed">
                {isSpanish
                  ? "Menos desplazamiento, mas claridad: responsables por etapa, ruta de escalamiento y controles de aprobacion para AG, bodegas, TI comercial y obra municipal."
                  : "Less scrolling, faster clarity: stage ownership, escalation path, and approval controls for AG, winery, commercial TI, and municipal projects."}
              </p>

              <div className="mt-6 flex flex-wrap justify-center gap-3">
                <a
                  href="#ag-community"
                  className="inline-flex items-center rounded-full border border-brand-primary/30 bg-white dark:bg-gray-900 px-4 py-2 text-sm font-semibold text-brand-primary dark:text-brand-primary-light hover:bg-brand-primary/5"
                >
                  {isSpanish ? "Comunidad AG" : "AG Communities"}
                </a>
                <a
                  href="#wineries"
                  className="inline-flex items-center rounded-full border border-brand-primary/30 bg-white dark:bg-gray-900 px-4 py-2 text-sm font-semibold text-brand-primary dark:text-brand-primary-light hover:bg-brand-primary/5"
                >
                  {isSpanish ? "Bodegas" : "Wineries"}
                </a>
                <a
                  href="#municipal"
                  className="inline-flex items-center rounded-full border border-brand-primary/30 bg-white dark:bg-gray-900 px-4 py-2 text-sm font-semibold text-brand-primary dark:text-brand-primary-light hover:bg-brand-primary/5"
                >
                  {isSpanish ? "Municipal" : "Municipal"}
                </a>
                <a
                  href="#tenant-improvements"
                  className="inline-flex items-center rounded-full border border-brand-primary/30 bg-white dark:bg-gray-900 px-4 py-2 text-sm font-semibold text-brand-primary dark:text-brand-primary-light hover:bg-brand-primary/5"
                >
                  {isSpanish ? "TI Comercial" : "Commercial TI"}
                </a>
              </div>

              <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 p-4">
                  <h3 className="font-extrabold text-gray-900 dark:text-white text-lg">
                    {isSpanish ? "Comunidad AG" : "AG Communities"}
                  </h3>
                  <ul className="mt-3 space-y-2 text-sm text-gray-700 dark:text-gray-300">
                    <li>
                      •{" "}
                      {isSpanish
                        ? "Estimacion lidera preconstruccion"
                        : "Estimating leads preconstruction"}
                    </li>
                    <li>
                      •{" "}
                      {isSpanish
                        ? "Superintendencia controla ejecucion"
                        : "Superintendent controls field execution"}
                    </li>
                    <li>
                      •{" "}
                      {isSpanish
                        ? "PM mantiene visibilidad en Procore"
                        : "PM maintains Procore visibility"}
                    </li>
                  </ul>
                </div>

                <div className="rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 p-4">
                  <h3 className="font-extrabold text-gray-900 dark:text-white text-lg">
                    {isSpanish ? "Bodegas" : "Wineries"}
                  </h3>
                  <ul className="mt-3 space-y-2 text-sm text-gray-700 dark:text-gray-300">
                    <li>
                      •{" "}
                      {isSpanish
                        ? "Coordinacion de trades y procurement"
                        : "Trade and procurement coordination"}
                    </li>
                    <li>
                      •{" "}
                      {isSpanish
                        ? "Controles de calidad y seguridad por etapa"
                        : "Stage-based quality and safety controls"}
                    </li>
                    <li>
                      •{" "}
                      {isSpanish
                        ? "Handoff con paquete de cierre verificado"
                        : "Handoff with verified closeout package"}
                    </li>
                  </ul>
                </div>

                <div className="rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 p-4">
                  <h3 className="font-extrabold text-gray-900 dark:text-white text-lg">
                    {isSpanish ? "Municipal" : "Municipal"}
                  </h3>
                  <ul className="mt-3 space-y-2 text-sm text-gray-700 dark:text-gray-300">
                    <li>
                      •{" "}
                      {isSpanish
                        ? "Escalamiento: Superintendente a PM a COO a Owner"
                        : "Escalation: Superintendent to PM to COO to Owner"}
                    </li>
                    <li>
                      •{" "}
                      {isSpanish
                        ? "Mayor a $5,000 requiere COO; mayor a $25,000 requiere CFO"
                        : "Over $5,000 requires COO; over $25,000 adds CFO"}
                    </li>
                    <li>
                      •{" "}
                      {isSpanish
                        ? "Aprobaciones segun requisitos de agencia"
                        : "Approvals flex by agency requirements"}
                    </li>
                  </ul>
                </div>

                <div className="rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 p-4">
                  <h3 className="font-extrabold text-gray-900 dark:text-white text-lg">
                    {isSpanish ? "TI Comercial" : "Commercial TI"}
                  </h3>
                  <ul className="mt-3 space-y-2 text-sm text-gray-700 dark:text-gray-300">
                    <li>
                      •{" "}
                      {isSpanish
                        ? "Instalacion de puertas y herrajes"
                        : "Door and hardware installation"}
                    </li>
                    <li>
                      •{" "}
                      {isSpanish
                        ? "Renovacion con operaciones activas"
                        : "Occupied-space tenant improvements"}
                    </li>
                    <li>
                      •{" "}
                      {isSpanish
                        ? "Control de RFIs y submittals en Procore"
                        : "Procore tracking for RFIs and submittals"}
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Core Services Section - Primary discovery content */}
        <div id="ag-community">
          <CoreServicesSection
            services={coreServices.slice(0, 3)}
            title={tHome("services.core.sectionTitle")}
            subtitle={tHome("services.core.sectionSubtitle")}
            description={tHome("services.core.sectionDescription")}
          />
        </div>

        {/* Specialty Services Section - Expanded discovery */}
        <div id="wineries">
          <SpecialtyServicesSection
            services={specialtyServices.slice(0, 3)}
            title={tHome("services.specialty.sectionTitle")}
            subtitle={tHome("services.specialty.sectionSubtitle")}
            description={tHome("services.specialty.sectionDescription")}
          />
        </div>

        <div id="tenant-improvements" />

        {/* Government & Grant-Funded Projects Section */}
        <div id="municipal">
          <GovernmentProjectsSection
            title={tHome("services.government.sectionTitle")}
            subtitle={tHome("services.government.sectionSubtitle")}
            description={tHome("services.government.sectionDescription")}
          />
        </div>

        {/* Construction Process Overview Section - 3-step preview with CTA to deeper detail */}
        <ConstructionProcessSection
          title={tHome("services.process.sectionTitle")}
          subtitle={tHome("services.process.sectionSubtitle")}
          description={tHome("services.process.sectionDescription")}
          steps={processPreviewSteps}
          cta={processCta}
          showTags={false}
          compactCta={true}
        />

        {/* Service Areas Section - Clarify geographic fit before proof and conversion */}
        <ServiceAreasSection
          serviceAreas={serviceAreas}
          title={tHome("services.areas.sectionTitle")}
          subtitle={tHome("services.areas.sectionSubtitle")}
          description={tHome("services.areas.sectionDescription")}
          maxLocationsPerArea={4}
          showAllLocationsCta={true}
        />

        {/* Client Testimonials Section - Proof after capabilities and process */}
        <TestimonialsSection
          id="testimonials"
          subtitle={tHome("services.testimonials.sectionSubtitle")}
          title={tHome("services.testimonials.sectionTitle")}
          description={tHome("services.testimonials.sectionDescription")}
          testimonials={clientTestimonials.slice(0, 1)}
        />

        {/* Portfolio Section - Compact redirect to dedicated project pages */}
        <section className="relative bg-white dark:bg-gray-900 py-12 sm:py-16 lg:py-20 overflow-hidden">
          <div className="relative z-10 mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
            <div className="rounded-2xl border-2 border-brand-secondary/30 bg-linear-to-br from-white via-white to-brand-secondary/5 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800 p-8 sm:p-10 text-center shadow-xl">
              <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-xl bg-linear-to-br from-brand-secondary via-bronze-700 to-bronze-800 shadow-lg">
                <MaterialIcon
                  icon="photo_library"
                  size="xl"
                  className="text-white"
                />
              </div>

              <h2 className="mb-3 font-black text-gray-900 dark:text-white text-2xl sm:text-3xl leading-tight">
                {t("services.portfolio.title")}
              </h2>
              <p className="mx-auto mb-6 max-w-3xl text-gray-700 dark:text-gray-300 text-base sm:text-lg leading-relaxed">
                {t("services.portfolio.description")}
              </p>

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
              <p className="mt-4 text-sm text-gray-600 dark:text-gray-300">
                <MaterialIcon icon="info" size="sm" className="inline mr-2" />
                {t("services.portfolio.note")}
              </p>
            </div>
          </div>
        </section>

        {/* Final CTA - Compact services-specific conversion block */}
        <section className="relative bg-gray-50 dark:bg-gray-900 py-10 sm:py-12 lg:py-14 overflow-hidden">
          <div className="relative z-10 mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
            <div className="rounded-2xl border border-brand-primary/25 bg-white dark:bg-gray-800 p-6 sm:p-8 text-center shadow-lg">
              <h2 className="text-2xl sm:text-3xl font-black text-gray-900 dark:text-white leading-tight">
                {t("services.finalNextSteps.sectionTitle")}
              </h2>
              <p className="mt-3 text-base sm:text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                {t("services.finalNextSteps.sectionDescription")}
              </p>
              <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-center">
                <Link href="/contact">
                  <Button
                    variant="primary"
                    size="lg"
                    className="w-full sm:w-auto"
                  >
                    <MaterialIcon icon="mail" size="md" className="mr-2" />
                    {processCta.contactButton}
                  </Button>
                </Link>
                <Link href="/projects">
                  <Button
                    variant="outline"
                    size="lg"
                    className="w-full sm:w-auto"
                  >
                    <MaterialIcon
                      icon="photo_library"
                      size="md"
                      className="mr-2"
                    />
                    {processCta.projectsButton}
                  </Button>
                </Link>
                <Link href="/allies">
                  <Button
                    variant="secondary"
                    size="lg"
                    className="w-full sm:w-auto"
                  >
                    <MaterialIcon
                      icon="construction"
                      size="md"
                      className="mr-2"
                    />
                    {isSpanish
                      ? "Explorar red de socios comerciales"
                      : "Explore Trade Partner Network"}
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
