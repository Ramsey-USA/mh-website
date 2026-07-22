"use client";

import { useEffect, useState, type CSSProperties } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { usePageTracking } from "@/lib/analytics/hooks";
import { useTranslations } from "next-intl";
import Link from "next/link";
import dynamic from "next/dynamic";
import { Button, AlternatingShowcase, Card } from "@/components/ui";

const JobApplicationModal = dynamic(
  () =>
    import("@/components/ui/modals/JobApplicationModal").then((m) => ({
      default: m.JobApplicationModal,
    })),
  { ssr: false },
);
import { MaterialIcon } from "@/components/icons/MaterialIcon";
import { PWAOnly } from "@/components/pwa";
import { PageNavigation } from "@/components/navigation/PageNavigation";
import { Breadcrumb } from "@/components/navigation/Breadcrumb";
import { navigationConfigs } from "@/components/navigation/navigationConfigs";
import {
  DiagonalStripePattern,
  BrandColorBlobs,
} from "@/components/ui/backgrounds";
import { normalizeEmployeeTestimonials } from "@/lib/data/testimonials";
import { COMPANY_INFO } from "@/lib/constants/company";
import { AccreditationsLogoRow } from "@/components/shared-sections";
import { SimpleSkeleton } from "@/components/ui/SimpleSkeleton";

// Lazy load heavy below-the-fold components for mobile performance
const TestimonialGrid = dynamic(
  () =>
    import("@/components/testimonials").then((mod) => ({
      default: mod.TestimonialGrid,
    })),
  {
    // Render on the server to avoid large layout shifts when this section mounts.
    ssr: true,
    loading: () => <SimpleSkeleton />,
  },
);

const getCultureIconBg = (color: string) => {
  if (color.includes("primary")) {
    return "bg-brand-primary";
  }

  if (color.includes("secondary")) {
    return "bg-brand-secondary";
  }

  return "bg-bronze-700";
};

export default function CareersPageClient({
  heroSlogan = COMPANY_INFO.slogan.secondary,
}: Readonly<{ heroSlogan?: string }>) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const t = useTranslations("careersPage");

  // Analytics tracking
  usePageTracking("Careers");

  // ALL HOOKS MUST BE CALLED BEFORE ANY CONDITIONAL RETURNS
  const [showApplicationModal, setShowApplicationModal] = useState(false);
  const [applicationEntryPoint, setApplicationEntryPoint] =
    useState<string>("");

  const handleApplyNow = (entryPoint?: string) => {
    setApplicationEntryPoint(entryPoint ?? "");
    setShowApplicationModal(true);
  };

  useEffect(() => {
    if (searchParams.get("apply") !== "true") {
      return;
    }

    setApplicationEntryPoint(
      searchParams.get("entryPoint") ?? "Footer Application",
    );
    setShowApplicationModal(true);
  }, [searchParams]);

  const handleCloseApplicationModal = () => {
    setShowApplicationModal(false);

    if (
      searchParams.get("apply") === "true" ||
      searchParams.get("entryPoint")
    ) {
      const nextParams = new URLSearchParams(searchParams.toString());
      nextParams.delete("apply");
      nextParams.delete("entryPoint");

      const nextUrl = nextParams.toString()
        ? `/careers?${nextParams.toString()}`
        : "/careers";

      router.replace(nextUrl, { scroll: false });
    }
  };

  const companyBenefits = t.raw("data.companyBenefits") as Array<{
    icon: string;
    title: string;
    description: string;
  }>;

  const veteranBenefits = t.raw("data.veteranBenefits") as Array<{
    icon: string;
    title: string;
    description: string;
  }>;

  const cultureValues = t.raw("data.cultureValues") as Array<{
    icon: string;
    title: string;
    description: string;
    color: string;
  }>;

  const employeeTestimonials = normalizeEmployeeTestimonials(
    t.raw("data.employeeTestimonials") as Array<{
      id: string;
      name: string;
      title: string;
      role: string;
      quote: string;
      rating: number;
      featured?: boolean;
      date?: string;
      veteranStatus?: boolean;
    }>,
  );

  return (
    <>
      {/* SEO Meta Tags */}

      <div className="relative min-h-screen overflow-hidden bg-linear-to-b from-white via-gray-50 to-white dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        {/* Page-level background — rendered once for all sections */}
        <DiagonalStripePattern />
        <BrandColorBlobs />
        {/* Hero Section */}
        <section
          className="hero-section relative flex items-end justify-end text-white overflow-hidden"
          style={{ height: "calc(100vh - var(--mh-nav-offset, 6.5rem))" }}
        >
          {/* Background - Ready for photo or video */}
          <div className="absolute inset-0 bg-linear-to-br from-gray-900 via-brand-primary to-gray-900">
            {/* Overlay for text readability */}
            <div className="absolute inset-0 bg-linear-to-br from-brand-primary/30 via-gray-900/60 to-gray-900/80"></div>
          </div>

          {/* Header Text - Bottom Right */}
          <div className="hero-safe-top hero-safe-bottom relative z-30 mx-3 sm:ml-auto sm:mr-5 lg:mr-7 xl:mr-10 mb-4 pointer-events-none transition-opacity duration-300 sm:w-[min(88vw,44rem)] sm:max-w-176">
            <div className="rounded-2xl border border-white/15 bg-gray-900/60 px-4 py-3 shadow-2xl backdrop-blur-md sm:px-6 sm:py-4 lg:px-8 lg:py-5">
              <h1 className="text-right text-lg xs:text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-black text-white leading-tight tracking-tight">
                <span className="block text-brand-secondary text-sm xs:text-base sm:text-lg md:text-xl lg:text-2xl mb-1">
                  {t("hero.kicker")} -&gt; Careers
                </span>
                <span className="block text-brand-secondary">
                  {t("hero.titleLine1")}
                </span>
                <span className="block text-brand-primary">
                  {t("hero.titleLine2")}
                </span>
                <span className="block text-white/90">
                  {COMPANY_INFO.slogan.primary}
                </span>
                <span className="block text-brand-secondary text-sm xs:text-base sm:text-lg md:text-xl mt-2">
                  {heroSlogan}
                </span>
              </h1>
            </div>
          </div>

          {/* Page-Specific Navigation Bar */}
          <PageNavigation
            items={navigationConfigs.careers}
            showRemainingPagesOverlay
            className="absolute bottom-0 left-0 right-0"
          />
        </section>

        {/* Breadcrumb Navigation */}
        <Breadcrumb
          items={[
            { label: t("breadcrumb.home"), href: "/" },
            { label: t("breadcrumb.current") },
          ]}
        />

        {/* Why Work With Us */}
        <section className="relative bg-white dark:bg-gray-900 py-12 sm:py-16 lg:py-20 xl:py-24 overflow-hidden">
          <div className="relative z-10 mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
            {/* Section Header - Military Construction Standard */}
            <div className="mb-16 sm:mb-20 text-center">
              {/* Icon with decorative lines */}
              <div className="flex items-center justify-center mb-8 gap-4">
                <div className="h-1 w-16 bg-linear-to-r from-transparent to-gray-300 dark:to-gray-600 rounded-full"></div>
                <div className="relative">
                  <div className="absolute -inset-4 bg-linear-to-br from-brand-secondary/30 to-bronze-700/30 blur-2xl rounded-full"></div>
                  <div className="relative bg-linear-to-br from-brand-secondary via-bronze-700 to-bronze-800 p-5 rounded-2xl shadow-2xl border-2 border-white/50 dark:border-gray-600">
                    <MaterialIcon
                      icon="star"
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
                  {t("whyChoose.headingPrefix")}
                </span>
                <span className="block bg-linear-to-r from-brand-primary via-brand-secondary to-brand-primary bg-clip-text text-transparent font-black drop-shadow-sm overflow-visible py-2 pb-3 leading-normal">
                  {t("whyChoose.headingTitle")}
                </span>
              </h2>

              {/* Description with colored keyword highlighting */}
              <p className="font-body mx-auto max-w-5xl font-light text-gray-700 dark:text-gray-300 text-base sm:text-lg md:text-xl lg:text-2xl leading-relaxed tracking-wide px-2">
                {t("whyChoose.description.prefix")}{" "}
                <span className="font-bold text-brand-primary dark:text-brand-primary-light">
                  {t("whyChoose.description.highlight1")}
                </span>{" "}
                {t("whyChoose.description.middle")}{" "}
                <span className="font-bold text-gray-900 dark:text-white">
                  {t("whyChoose.description.highlight2")}
                </span>{" "}
                {t("whyChoose.description.suffix")}
              </p>

              {/* Core Philosophy Callout */}
              <div className="inline-block mt-8">
                <div className="relative group">
                  <div className="absolute -inset-1 bg-linear-to-r from-brand-primary via-brand-secondary to-bronze-600 rounded-2xl blur-sm opacity-75 group-hover:opacity-100 transition duration-500"></div>
                  <Card className="relative border-brand-primary/20 bg-white px-8 py-6 shadow-xl dark:border-brand-primary/30 dark:bg-gray-800">
                    <p className="font-body text-center text-lg font-bold leading-relaxed text-gray-900 dark:text-white sm:text-xl md:text-2xl">
                      {t("whyChoose.callout.quote")}
                    </p>
                    <p className="mt-2 text-center text-sm font-semibold text-brand-secondary-text dark:text-brand-secondary-light sm:text-base">
                      {t("whyChoose.callout.subtitle")}
                    </p>
                  </Card>
                </div>
              </div>
            </div>

            {/* Impressive Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 mb-12">
              <Card className="group border-brand-primary/20 bg-linear-to-br from-brand-primary/5 to-brand-primary/10 p-6 text-center transition-all duration-300 hover:border-brand-primary dark:from-brand-primary/10 dark:to-brand-primary/20">
                <div className="text-4xl sm:text-5xl font-black text-brand-primary dark:text-brand-primary-light mb-2 transition-colors duration-300">
                  150+
                </div>
                <div className="font-subheading text-xs sm:text-sm font-semibold text-gray-700 dark:text-gray-300 font-heading uppercase tracking-wider">
                  {t("whyChoose.stats.experience")}
                </div>
              </Card>
              <Card className="group border-brand-secondary/20 bg-linear-to-br from-brand-secondary/5 to-bronze-700/10 p-6 text-center transition-all duration-300 hover:border-brand-secondary dark:from-brand-secondary/10 dark:to-bronze-700/20">
                <div className="text-4xl sm:text-5xl font-black text-brand-secondary dark:text-brand-secondary-light mb-2 transition-colors duration-300">
                  .64
                </div>
                <div className="font-subheading text-xs sm:text-sm font-semibold text-gray-700 dark:text-gray-300 font-heading uppercase tracking-wider">
                  {t("whyChoose.stats.safety")}
                </div>
              </Card>
              <Card className="group border-bronze-700/20 bg-linear-to-br from-bronze-700/5 to-bronze-800/10 p-6 text-center transition-all duration-300 hover:border-bronze-700 dark:from-bronze-700/10 dark:to-bronze-800/20">
                <div className="text-4xl sm:text-5xl font-black text-bronze-700 dark:text-bronze-400 mb-2 transition-colors duration-300">
                  100%
                </div>
                <div className="font-subheading text-xs sm:text-sm font-semibold text-gray-700 dark:text-gray-300 font-heading uppercase tracking-wider">
                  {t("whyChoose.stats.mentorship")}
                </div>
              </Card>
              <Card className="group border-brand-primary/20 bg-linear-to-br from-brand-primary/5 to-brand-secondary/10 p-6 text-center transition-all duration-300 hover:border-brand-primary dark:from-brand-primary/10 dark:to-brand-secondary/20">
                <div className="text-4xl sm:text-5xl font-black bg-linear-to-r from-brand-primary to-brand-secondary bg-clip-text text-transparent mb-2 transition-colors duration-300">
                  70%
                </div>
                <div className="font-subheading text-xs sm:text-sm font-semibold text-gray-700 dark:text-gray-300 font-heading uppercase tracking-wider">
                  {t("whyChoose.stats.referral")}
                </div>
              </Card>
            </div>

            {/* Culture Values Showcase - Alternating Image/Text Layout */}
            <AlternatingShowcase
              items={cultureValues.map((value, index) => ({
                id: `culture-${index + 1}`,
                title: value.title,
                icon: value.icon,
                tagline: t("whyChoose.coreValueTagline", {
                  index: index + 1,
                }),
                description: value.description,
                image: `/images/culture/culture-${index + 1}.jpg`,
                iconBg: getCultureIconBg(value.color),
              }))}
              title={t("whyChoose.showcase.title")}
              subtitle={t("whyChoose.showcase.subtitle")}
              icon="star"
              description={undefined}
              sectionId="why-work-here"
              iconVariant="secondary"
            />
          </div>
        </section>

        {/* Benefits & Perks */}
        <section className="relative bg-gray-50 dark:bg-gray-800 py-12 sm:py-16 lg:py-20 xl:py-24 overflow-hidden">
          <div className="relative z-10 mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
            {/* Section Header - Military Construction Standard */}
            <div className="mb-16 sm:mb-20 text-center">
              {/* Icon with decorative lines */}
              <div className="flex items-center justify-center mb-8 gap-4">
                <div className="h-1 w-16 bg-linear-to-r from-transparent to-gray-300 dark:to-gray-600 rounded-full"></div>
                <div className="relative">
                  <div className="absolute -inset-4 bg-linear-to-br from-brand-secondary/30 to-bronze-600/30 blur-2xl rounded-full"></div>
                  <div className="relative bg-linear-to-br from-brand-secondary via-bronze-700 to-bronze-800 p-5 rounded-2xl shadow-2xl border-2 border-white/50 dark:border-gray-600">
                    <MaterialIcon
                      icon="volunteer_activism"
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
                  {t("benefits.headingPrefix")}
                </span>
                <span className="block bg-linear-to-r from-brand-primary via-brand-secondary to-brand-primary bg-clip-text text-transparent font-black drop-shadow-sm overflow-visible py-2 pb-3 leading-normal">
                  {t("benefits.headingTitle")}
                </span>
              </h2>

              {/* Description with colored keyword highlighting */}
              <p className="font-body mx-auto max-w-5xl font-light text-gray-700 dark:text-gray-300 text-base sm:text-lg md:text-xl lg:text-2xl leading-relaxed tracking-wide px-2">
                <span className="font-bold text-brand-primary dark:text-brand-primary-light">
                  {t("benefits.description.highlight1")}
                </span>{" "}
                {t("benefits.description.middle")}{" "}
                <span className="font-bold text-gray-900 dark:text-white">
                  {t("benefits.description.highlight2")}
                </span>
                <span> {t("benefits.description.suffix")}</span>
              </p>
            </div>

            {/* Modern Grid Cards with Unique Hover Effects */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {companyBenefits.map((benefit) => (
                <Card
                  key={benefit.title}
                  className="group relative flex h-full min-h-80 overflow-hidden border-gray-200 dark:border-gray-700 transition-all duration-300 hover:border-transparent hover:shadow-2xl"
                >
                  <div className="absolute -inset-2 rounded-2xl bg-linear-to-br from-brand-secondary/40 to-bronze-600/40 opacity-20 blur-xl transition-all duration-500 group-hover:opacity-100"></div>

                  <div className="relative flex w-full flex-col overflow-hidden bg-white dark:bg-gray-800">
                    <div className="h-2 bg-linear-to-r from-brand-secondary via-bronze-700 to-bronze-800"></div>

                    <div className="flex flex-1 flex-col p-6 sm:p-8">
                      <div className="mb-5">
                        <div className="relative inline-block">
                          <div className="absolute -inset-2 rounded-2xl bg-linear-to-br from-brand-secondary/40 to-bronze-700/40 opacity-30 blur-lg"></div>
                          <div className="relative inline-flex h-16 w-16 items-center justify-center rounded-2xl border-2 border-white/50 bg-linear-to-br from-brand-secondary via-bronze-700 to-bronze-800 shadow-2xl transition-all duration-300 dark:border-gray-700/50">
                            <MaterialIcon
                              icon={benefit.icon}
                              size="xl"
                              className="text-white drop-shadow-lg"
                            />
                          </div>
                        </div>
                      </div>

                      <h3 className="mb-3 text-xl font-black leading-tight text-gray-900 dark:text-white sm:text-2xl">
                        {benefit.title}
                      </h3>

                      <p className="font-body grow text-sm leading-relaxed text-gray-600 dark:text-gray-300 sm:text-base">
                        {benefit.description}
                      </p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Employee Testimonials - Optimal SEO position (25-30% page depth) */}
        <section
          id="testimonials"
          className="relative bg-gray-50 dark:bg-gray-800 py-12 sm:py-16 lg:py-20 xl:py-24 overflow-hidden"
        >
          <div className="relative z-10 mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
            {/* Section Header - Military Construction Standard */}
            <div className="mb-16 sm:mb-20 text-center">
              {/* Icon with decorative lines */}
              <div className="flex items-center justify-center mb-8 gap-4">
                <div className="h-1 w-16 bg-linear-to-r from-transparent to-gray-300 dark:to-gray-600 rounded-full"></div>
                <div className="relative">
                  <div className="absolute -inset-4 bg-linear-to-br from-brand-primary/30 to-brand-primary-dark/30 blur-2xl rounded-full"></div>
                  <div className="relative bg-linear-to-br from-brand-primary via-brand-primary-dark to-brand-primary-darker p-5 rounded-2xl shadow-2xl border-2 border-white/50 dark:border-gray-600">
                    <MaterialIcon
                      icon="groups"
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
                  {t("testimonials.headingPrefix")}
                </span>
                <span className="block bg-linear-to-r from-brand-primary via-brand-secondary to-brand-primary bg-clip-text text-transparent font-black drop-shadow-sm overflow-visible py-2 pb-3 leading-normal">
                  {t("testimonials.headingTitle")}
                </span>
              </h2>

              {/* Description with colored keyword highlighting */}
              <p className="font-body mx-auto max-w-5xl font-light text-gray-700 dark:text-gray-300 text-base sm:text-lg md:text-xl lg:text-2xl leading-relaxed tracking-wide px-2">
                {t("testimonials.description.prefix")}{" "}
                <span className="font-bold text-brand-primary dark:text-brand-primary-light">
                  {t("testimonials.description.highlight1")}
                </span>{" "}
                {t("testimonials.description.middle")}{" "}
                <span className="font-bold text-gray-900 dark:text-white">
                  {t("testimonials.description.highlight2")}
                </span>{" "}
                {t("testimonials.description.suffix")}
              </p>
            </div>

            <TestimonialGrid testimonials={employeeTestimonials} />
          </div>
        </section>

        {/* Veteran Benefits Section */}
        <section className="relative bg-white dark:bg-gray-900 py-12 sm:py-16 lg:py-20 xl:py-24 overflow-hidden">
          <div className="relative z-10 mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
            <div>
              {/* Section Header - Military Construction Standard */}
              <div className="mb-16 sm:mb-20 text-center">
                {/* Icon with decorative lines */}
                <div className="flex items-center justify-center mb-8 gap-4">
                  <div className="h-1 w-16 bg-linear-to-r from-transparent to-gray-300 dark:to-gray-600 rounded-full"></div>
                  <div className="relative">
                    <div className="absolute -inset-4 bg-linear-to-br from-brand-primary/30 to-brand-primary-dark/30 blur-2xl rounded-full"></div>
                    <div className="relative bg-linear-to-br from-brand-primary via-brand-primary-dark to-brand-primary-darker p-5 rounded-2xl shadow-2xl border-2 border-white/50 dark:border-gray-600">
                      <MaterialIcon
                        icon="military_tech"
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
                    {t("veterans.headingPrefix")}
                  </span>
                  <span className="block bg-linear-to-r from-brand-primary via-brand-secondary to-brand-primary bg-clip-text text-transparent font-black drop-shadow-sm overflow-visible py-2 pb-3 leading-normal">
                    {t("veterans.headingTitle")}
                  </span>
                </h2>

                {/* Description with colored keyword highlighting */}
                <p className="font-body mx-auto max-w-5xl font-light text-gray-700 dark:text-gray-300 text-base sm:text-lg md:text-xl lg:text-2xl leading-relaxed tracking-wide px-2">
                  <span className="font-bold text-brand-primary dark:text-brand-primary-light">
                    {t("veterans.description.highlight1")}
                  </span>
                  . {t("veterans.description.middle")}{" "}
                  <span className="font-bold text-gray-900 dark:text-white">
                    {t("veterans.description.highlight2")}
                  </span>{" "}
                  {t("veterans.description.suffix")}
                </p>

                {/* Veteran Pride Callout */}
                <div className="inline-block mt-8">
                  <div className="relative group">
                    <div className="absolute -inset-1 bg-linear-to-r from-brand-primary via-brand-primary-dark to-brand-primary-darker rounded-2xl blur-sm opacity-75 group-hover:opacity-100 transition duration-500"></div>
                    <Card className="relative border-2 border-brand-primary/30 bg-white px-8 py-6 shadow-xl dark:border-brand-primary/40 dark:bg-gray-800">
                      <p className="font-body font-black text-gray-900 dark:text-white text-lg sm:text-xl md:text-2xl text-center leading-relaxed flex items-center justify-center gap-3">
                        <MaterialIcon
                          icon="military_tech"
                          size="lg"
                          className="text-brand-primary"
                        />
                        {t("veterans.callout")}
                        <MaterialIcon
                          icon="military_tech"
                          size="lg"
                          className="text-brand-primary"
                        />
                      </p>
                    </Card>
                  </div>
                </div>
              </div>

              {/* Veteran Stats Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 mb-12 max-w-4xl mx-auto">
                <Card className="group border-2 border-brand-primary/30 bg-linear-to-br from-brand-primary/10 to-brand-primary/20 p-6 text-center transition-all duration-300 hover:border-brand-primary dark:from-brand-primary/20 dark:to-brand-primary/30">
                  <MaterialIcon
                    icon="stars"
                    size="2xl"
                    className="text-brand-primary mx-auto mb-3 transition-colors duration-300"
                  />
                  <div className="text-3xl sm:text-4xl font-black text-brand-primary dark:text-brand-primary-light mb-2">
                    {t("veterans.stats.priority.value")}
                  </div>
                  <div className="font-subheading text-xs sm:text-sm font-semibold text-gray-700 dark:text-gray-300 font-heading uppercase tracking-wider">
                    {t("veterans.stats.priority.label")}
                  </div>
                  <p className="text-xs text-gray-600 dark:text-gray-300 mt-2">
                    {t("veterans.stats.priority.note")}
                  </p>
                </Card>
                <Card className="group border-2 border-brand-secondary/30 bg-linear-to-br from-brand-secondary/10 to-bronze-700/20 p-6 text-center transition-all duration-300 hover:border-brand-secondary dark:from-brand-secondary/20 dark:to-bronze-700/30">
                  <MaterialIcon
                    icon="shield"
                    size="2xl"
                    className="text-brand-secondary mx-auto mb-3 transition-colors duration-300"
                  />
                  <div className="text-3xl sm:text-4xl font-black text-brand-secondary dark:text-brand-secondary-light mb-2">
                    100%
                  </div>
                  <div className="font-subheading text-xs sm:text-sm font-semibold text-gray-700 dark:text-gray-300 font-heading uppercase tracking-wider">
                    {t("veterans.stats.militaryFriendly.label")}
                  </div>
                  <p className="text-xs text-gray-600 dark:text-gray-300 mt-2">
                    {t("veterans.stats.militaryFriendly.note")}
                  </p>
                </Card>
                <Card className="group border-2 border-bronze-700/30 bg-linear-to-br from-bronze-700/10 to-bronze-800/20 p-6 text-center transition-all duration-300 hover:border-bronze-700 dark:from-bronze-700/20 dark:to-bronze-800/30">
                  <MaterialIcon
                    icon="flag"
                    size="2xl"
                    className="text-bronze-700 dark:text-bronze-400 mx-auto mb-3 transition-colors duration-300"
                  />
                  <div className="text-3xl sm:text-4xl font-black text-bronze-700 dark:text-bronze-400 mb-2">
                    {t("veterans.stats.branches.value")}
                  </div>
                  <div className="font-subheading text-xs sm:text-sm font-semibold text-gray-700 dark:text-gray-300 font-heading uppercase tracking-wider">
                    {t("veterans.stats.branches.label")}
                  </div>
                  <p className="text-xs text-gray-600 dark:text-gray-300 mt-2">
                    {t("veterans.stats.branches.note")}
                  </p>
                </Card>
              </div>

              {/* Modern Grid Cards with Unique Hover Effects */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-12">
                {veteranBenefits.map((benefit) => (
                  <div
                    key={benefit.title}
                    className="group relative flex h-full min-h-70 scroll-reveal"
                  >
                    {/* Colored Border Glow - Visible on hover */}
                    <div className="absolute -inset-2 bg-linear-to-br from-brand-primary/40 to-brand-primary-dark/40 rounded-2xl opacity-20 group-hover:opacity-100 blur-xl transition-all duration-500"></div>

                    <Card className="relative flex w-full flex-col overflow-hidden border-2 border-gray-200 bg-white shadow-lg transition-all duration-300 group-hover:border-transparent group-hover:shadow-2xl dark:border-gray-700 dark:bg-gray-800">
                      {/* Top Accent Bar */}
                      <div className="h-2 bg-linear-to-r from-brand-primary via-brand-primary-dark to-brand-primary-darker"></div>

                      <div className="p-6 sm:p-8 flex flex-col flex-1">
                        {/* Icon Section */}
                        <div className="mb-4">
                          {/* Enhanced Icon with Header Style */}
                          <div className="relative inline-block">
                            {/* Blur glow layer behind icon */}
                            <div className="absolute -inset-2 bg-linear-to-br from-brand-primary/40 to-brand-primary-dark/40 opacity-30 blur-lg rounded-2xl"></div>
                            <div className="relative inline-flex items-center justify-center w-14 h-14 bg-linear-to-br from-brand-primary via-brand-primary-dark to-brand-primary-darker rounded-2xl shadow-2xl border-2 border-white/50 dark:border-gray-700/50 transition-all duration-300">
                              <MaterialIcon
                                icon={benefit.icon}
                                size="lg"
                                className="text-white drop-shadow-lg"
                              />
                            </div>
                          </div>
                        </div>

                        {/* Title */}
                        <h3 className="mb-3 font-black text-gray-900 dark:text-white text-lg sm:text-xl leading-tight">
                          {benefit.title}
                        </h3>

                        {/* Description */}
                        <p className="font-body grow text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
                          {benefit.description}
                        </p>
                      </div>
                    </Card>
                  </div>
                ))}
              </div>

              {/* Enhanced CTA Section */}
              <div className="scroll-reveal">
                <div className="relative">
                  {/* Background gradient box */}
                  <div className="absolute inset-0 bg-linear-to-br from-brand-primary/5 to-brand-primary-dark/10 dark:from-brand-primary/10 dark:to-brand-primary-dark/20 rounded-2xl"></div>

                  <div className="relative p-8 sm:p-10 text-center border-2 border-brand-primary/20 dark:border-brand-primary/30 rounded-2xl">
                    <MaterialIcon
                      icon="military_tech"
                      size="3xl"
                      className="text-brand-primary mx-auto mb-6"
                    />
                    <h3 className="mb-4 font-black text-gray-900 dark:text-white text-2xl sm:text-3xl">
                      {t("veterans.cta.title")}
                    </h3>
                    <p className="mb-8 font-medium text-gray-700 dark:text-gray-300 text-base sm:text-lg max-w-3xl mx-auto">
                      {t("veterans.cta.descriptionLine1")}
                      <br />
                      <span className="text-brand-primary dark:text-brand-primary-light font-bold">
                        {t("veterans.cta.descriptionLine2")}
                      </span>
                    </p>
                    <div className="flex sm:flex-row flex-col justify-center gap-4 sm:gap-6">
                      <Button
                        onClick={() => handleApplyNow("Veteran Application")}
                        variant="primary"
                        size="lg"
                        className="transition-all duration-300 min-w-65 shadow-xl hover:shadow-2xl"
                      >
                        <MaterialIcon
                          icon="military_tech"
                          size="lg"
                          theme="veteran"
                          ariaLabel={t("veterans.cta.applyAria")}
                          className="mr-3"
                        />
                        <span className="font-medium">
                          {t("veterans.cta.applyButton")}
                        </span>
                      </Button>
                      <Button
                        variant="outline"
                        size="lg"
                        className="transition-all duration-300 min-w-65"
                        asChild
                      >
                        <Link href="/veterans" prefetch={false}>
                          <MaterialIcon
                            icon="info"
                            size="lg"
                            theme="military"
                            ariaLabel={t("veterans.cta.initiativeAria")}
                            className="mr-3"
                          />
                          <span className="font-medium">
                            {t("veterans.cta.initiativeButton")}
                          </span>
                        </Link>
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Open Positions */}
        <section
          id="positions"
          className="relative bg-gray-50 dark:bg-gray-800 py-12 sm:py-16 lg:py-20 xl:py-24 overflow-hidden"
        >
          <div className="relative z-10 mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
            {/* Section Header - Military Construction Standard */}
            <div className="mb-16 sm:mb-20 text-center">
              {/* Icon with decorative lines */}
              <div className="flex items-center justify-center mb-8 gap-4">
                <div className="h-1 w-16 bg-linear-to-r from-transparent to-gray-300 dark:to-gray-600 rounded-full"></div>
                <div className="relative">
                  <div className="absolute -inset-4 bg-linear-to-br from-brand-primary/20 to-brand-secondary/20 blur-2xl rounded-full"></div>
                  <div className="relative bg-linear-to-br from-brand-primary via-brand-secondary to-bronze-700 p-5 rounded-2xl shadow-2xl border-2 border-white/50 dark:border-gray-600">
                    <MaterialIcon
                      icon="work"
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
                  {t("positions.headingPrefix")}
                </span>
                <span className="block bg-linear-to-r from-brand-primary via-brand-secondary to-brand-primary bg-clip-text text-transparent font-black drop-shadow-sm overflow-visible py-2 pb-3 leading-normal">
                  {t("positions.headingTitle")}
                </span>
              </h2>

              {/* Description with colored keyword highlighting */}
              <p className="font-body mx-auto max-w-5xl font-light text-gray-700 dark:text-gray-300 text-base sm:text-lg md:text-xl lg:text-2xl leading-relaxed tracking-wide px-2">
                {t("positions.description.prefix")}{" "}
                <span className="font-bold text-brand-primary dark:text-brand-primary-light">
                  {t("positions.description.highlight1")}
                </span>{" "}
                {t("positions.description.middle")}{" "}
                <span className="font-bold text-gray-900 dark:text-white">
                  {t("positions.description.highlight2")}
                </span>{" "}
                {t("positions.description.suffix")}
              </p>
            </div>

            {/* General Inquiry CTA Card */}
            <div className="scroll-reveal">
              <div className="relative">
                {/* Colored Border Glow */}
                <div className="absolute -inset-2 bg-linear-to-br from-brand-secondary/40 to-bronze-700/40 rounded-2xl opacity-20 group-hover:opacity-100 blur-xl transition-all duration-500"></div>

                <Card className="relative overflow-hidden border-gray-200 bg-white shadow-lg transition-all duration-300 dark:border-gray-700 dark:bg-gray-800">
                  {/* Top Accent Bar */}
                  <div className="h-2 bg-linear-to-r from-brand-secondary via-bronze-700 to-bronze-800"></div>

                  <div className="p-8 sm:p-12 text-center">
                    {/* Icon */}
                    <div className="relative inline-block mb-8">
                      <div className="absolute -inset-4 bg-linear-to-br from-brand-secondary/30 to-bronze-700/30 blur-2xl rounded-full"></div>
                      <div className="relative bg-linear-to-br from-brand-secondary via-bronze-700 to-bronze-800 p-6 rounded-2xl shadow-2xl border-2 border-white/50 dark:border-gray-600">
                        <MaterialIcon
                          icon="mail"
                          size="3xl"
                          className="text-white drop-shadow-lg"
                        />
                      </div>
                    </div>

                    {/* Heading */}
                    <h3 className="mb-4 font-black text-gray-900 dark:text-white text-2xl sm:text-3xl md:text-4xl leading-tight">
                      {t("readyToJoin.heading")}
                    </h3>

                    {/* Description */}
                    <p className="font-body mb-8 font-medium text-gray-700 dark:text-gray-300 text-base sm:text-lg max-w-3xl mx-auto leading-relaxed">
                      {t("readyToJoin.description")}
                    </p>

                    {/* CTA Buttons */}
                    <div className="flex sm:flex-row flex-col justify-center gap-4 sm:gap-6">
                      <Button
                        onClick={() => handleApplyNow("General Inquiry")}
                        variant="primary"
                        size="lg"
                        className="transition-all duration-300 min-w-65 shadow-xl hover:shadow-2xl"
                      >
                        <MaterialIcon icon="send" size="lg" className="mr-3" />
                        <span className="font-medium">
                          {t("readyToJoin.startApplication")}
                        </span>
                      </Button>
                      <Button
                        variant="outline"
                        size="lg"
                        className="transition-all duration-300 min-w-65"
                        asChild
                      >
                        <a href={`tel:${COMPANY_INFO.phone.tel}`}>
                          <MaterialIcon
                            icon="phone"
                            size="lg"
                            className="mr-3"
                          />
                          <span className="font-medium">
                            {t("readyToJoin.callButton", {
                              phone: COMPANY_INFO.phone.display,
                            })}
                          </span>
                        </a>
                      </Button>
                    </div>

                    {/* Supporting Text */}
                    <p className="mt-8 text-sm text-gray-600 dark:text-gray-400 font-medium">
                      <span className="text-brand-primary dark:text-brand-primary-light font-bold">
                        {t("readyToJoin.veteransPriority")}
                      </span>
                      . {t("readyToJoin.enoughToBegin")}
                    </p>
                  </div>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Application Process Guide Section */}
        <section
          id="application-process"
          className="relative bg-white dark:bg-gray-900 py-12 sm:py-16 lg:py-20 xl:py-24 overflow-hidden"
        >
          <div className="relative z-10 mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
            <div>
              {/* Section Header - Military Construction Standard */}
              <div className="mb-16 sm:mb-20 text-center">
                {/* Icon with decorative lines */}
                <div className="flex items-center justify-center mb-8 gap-4">
                  <div className="h-1 w-16 bg-linear-to-r from-transparent to-gray-300 dark:to-gray-600 rounded-full"></div>
                  <div className="relative">
                    <div className="absolute -inset-4 bg-linear-to-br from-brand-primary/30 to-brand-primary-dark/30 blur-2xl rounded-full"></div>
                    <div className="relative bg-linear-to-br from-brand-primary via-brand-primary-dark to-brand-primary-darker p-5 rounded-2xl shadow-2xl border-2 border-white/50 dark:border-gray-600">
                      <MaterialIcon
                        icon="how_to_reg"
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
                    {t("journey.prefix")}
                  </span>
                  <span className="block bg-linear-to-r from-brand-primary via-brand-secondary to-brand-primary bg-clip-text text-transparent font-black drop-shadow-sm overflow-visible py-2 pb-3 leading-normal">
                    {t("journey.highlight")}
                  </span>
                </h2>

                {/* Description with colored keyword highlighting */}
                <p className="font-body mx-auto max-w-5xl font-light text-gray-700 dark:text-gray-300 text-base sm:text-lg md:text-xl lg:text-2xl leading-relaxed tracking-wide px-2">
                  <span className="font-bold text-brand-primary dark:text-brand-primary-light">
                    {t("journey.lead")}
                  </span>
                  <span> {t("journey.description")} </span>
                  <span className="font-bold text-gray-900 dark:text-white">
                    {t("journey.goal")}
                  </span>
                </p>
              </div>

              {/* Timeline - Vertical Alternating Layout */}
              <div className="relative max-w-6xl mx-auto">
                {/* Vertical Connecting Line */}
                <div className="hidden lg:block absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-linear-to-b from-brand-primary/30 via-brand-secondary to-brand-primary/30"></div>

                {/* Timeline Steps - Desktop Alternating */}
                <div className="space-y-12 lg:space-y-20">
                  {[
                    {
                      key: "submit",
                      num: 1,
                      icon: "description",
                      position: "left",
                    },
                    {
                      key: "review",
                      num: 2,
                      icon: "fact_check",
                      position: "right",
                    },
                    {
                      key: "conversation",
                      num: 3,
                      icon: "forum",
                      position: "left",
                    },
                    {
                      key: "interview",
                      num: 4,
                      icon: "verified_user",
                      position: "right",
                    },
                    {
                      key: "offer",
                      num: 5,
                      icon: "celebration",
                      position: "left",
                    },
                  ].map((step, index) => (
                    <div
                      key={step.num}
                      className="relative group scroll-reveal"
                      style={{ "--delay": `${index * 0.1}s` } as CSSProperties}
                    >
                      {/* Desktop Layout */}
                      <div className="hidden lg:flex items-center gap-8">
                        {step.position === "left" ? (
                          <>
                            {/* Content Left */}
                            <div className="flex-1 text-right">
                              <Card className="inline-block border-2 border-gray-200 bg-white p-8 shadow-lg transition-all duration-300 hover:shadow-2xl dark:border-gray-700 dark:bg-gray-800 group-hover:border-brand-primary dark:group-hover:border-brand-primary-light">
                                <div className="flex items-center justify-end gap-4 mb-4">
                                  <div>
                                    <h3 className="font-black text-gray-900 dark:text-white text-2xl mb-1">
                                      {t(
                                        `journey.timeline.steps.${step.key}.title`,
                                      )}
                                    </h3>
                                  </div>
                                  <div className="shrink-0 w-16 h-16 bg-linear-to-br from-brand-primary to-brand-primary-dark rounded-xl flex items-center justify-center shadow-lg transition-colors duration-300">
                                    <MaterialIcon
                                      icon={step.icon}
                                      size="xl"
                                      className="text-white"
                                    />
                                  </div>
                                </div>
                                <p className="font-body text-gray-600 dark:text-gray-300 text-base leading-relaxed">
                                  {t(
                                    `journey.timeline.steps.${step.key}.description`,
                                  )}
                                </p>
                              </Card>
                            </div>

                            {/* Center Circle */}
                            <div className="shrink-0 relative z-10">
                              <div className="w-20 h-20 bg-linear-to-br from-brand-primary to-brand-primary-dark rounded-full flex items-center justify-center text-white font-black text-2xl shadow-2xl border-4 border-white dark:border-gray-900 transition-colors duration-300">
                                {step.num}
                              </div>
                            </div>

                            {/* Empty Right */}
                            <div className="flex-1"></div>
                          </>
                        ) : (
                          <>
                            <div className="flex-1"></div>

                            {/* Center Circle */}
                            <div className="shrink-0 relative z-10">
                              <div className="w-20 h-20 bg-linear-to-br from-brand-secondary to-brand-secondary-dark rounded-full flex items-center justify-center text-white font-black text-2xl shadow-2xl border-4 border-white dark:border-gray-900 transition-colors duration-300">
                                {step.num}
                              </div>
                            </div>

                            {/* Content Right */}
                            <div className="flex-1 text-left">
                              <Card className="inline-block border-2 border-gray-200 bg-white p-8 shadow-lg transition-all duration-300 hover:shadow-2xl dark:border-gray-700 dark:bg-gray-800 group-hover:border-brand-secondary dark:group-hover:border-brand-secondary-light">
                                <div className="flex items-center gap-4 mb-4">
                                  <div className="shrink-0 w-16 h-16 bg-linear-to-br from-brand-secondary to-brand-secondary-dark rounded-xl flex items-center justify-center shadow-lg transition-colors duration-300">
                                    <MaterialIcon
                                      icon={step.icon}
                                      size="xl"
                                      className="text-white"
                                    />
                                  </div>
                                  <div>
                                    <h3 className="font-black text-gray-900 dark:text-white text-2xl mb-1">
                                      {t(
                                        `journey.timeline.steps.${step.key}.title`,
                                      )}
                                    </h3>
                                  </div>
                                </div>
                                <p className="font-body text-gray-600 dark:text-gray-300 text-base leading-relaxed">
                                  {t(
                                    `journey.timeline.steps.${step.key}.description`,
                                  )}
                                </p>
                              </Card>
                            </div>
                          </>
                        )}
                      </div>

                      {/* Mobile Layout */}
                      <div className="lg:hidden flex gap-4">
                        {/* Left Side - Number and Line */}
                        <div className="flex flex-col items-center shrink-0">
                          <div
                            className={`w-16 h-16 ${
                              step.num === 5
                                ? "bg-linear-to-br from-brand-secondary to-brand-secondary-dark"
                                : "bg-linear-to-br from-brand-primary to-brand-primary-dark"
                            } rounded-full flex items-center justify-center text-white font-black text-2xl shadow-xl border-4 border-white dark:border-gray-900 relative z-10`}
                          >
                            {step.num}
                          </div>
                          {index < 4 && (
                            <div className="w-1 flex-1 bg-linear-to-b from-brand-primary to-brand-secondary mt-2 min-h-15"></div>
                          )}
                        </div>

                        {/* Right Side - Card */}
                        <div className="flex-1 pb-8">
                          <Card className="border-2 border-gray-200 bg-white p-6 shadow-lg transition-all duration-300 hover:border-brand-primary hover:shadow-xl dark:border-gray-700 dark:bg-gray-800 dark:hover:border-brand-primary-light">
                            <div className="flex items-center gap-3 mb-4">
                              <div
                                className={`shrink-0 w-14 h-14 ${
                                  step.num === 5
                                    ? "bg-linear-to-br from-brand-secondary to-brand-secondary-dark"
                                    : "bg-linear-to-br from-brand-primary to-brand-primary-dark"
                                } rounded-xl flex items-center justify-center shadow-lg`}
                              >
                                <MaterialIcon
                                  icon={step.icon}
                                  size="lg"
                                  className="text-white"
                                />
                              </div>
                              <h3 className="font-black text-gray-900 dark:text-white text-xl">
                                {t(`journey.timeline.steps.${step.key}.title`)}
                              </h3>
                            </div>
                            <p className="font-body text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
                              {t(
                                `journey.timeline.steps.${step.key}.description`,
                              )}
                            </p>
                          </Card>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Timeline Details */}
              <div className="scroll-reveal">
                <div className="mt-16">
                  <h3 className="mb-8 font-black text-center text-gray-900 dark:text-white text-2xl sm:text-3xl">
                    {t("journey.details.title")}
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
                    {/* Fast-Track Card */}
                    <div className="group relative">
                      <div className="absolute -inset-1 bg-linear-to-br from-brand-primary/40 to-brand-primary-dark/40 rounded-2xl opacity-20 group-hover:opacity-100 blur-xl transition-all duration-500"></div>
                      <Card className="relative overflow-hidden border-2 border-gray-200 bg-white shadow-lg transition-all duration-300 group-hover:border-transparent group-hover:shadow-2xl dark:border-gray-700 dark:bg-gray-800">
                        <div className="h-2 bg-linear-to-r from-brand-primary via-brand-primary-dark to-brand-primary-darker"></div>
                        <div className="p-6 text-center">
                          <div className="relative inline-block mb-4">
                            <div className="absolute -inset-2 bg-linear-to-br from-brand-primary/40 to-brand-primary-dark/40 opacity-30 blur-lg rounded-2xl"></div>
                            <div className="relative flex justify-center items-center w-16 h-16 bg-linear-to-br from-brand-primary to-brand-primary-dark rounded-2xl shadow-xl mx-auto transition-colors duration-300">
                              <MaterialIcon
                                icon="flash_on"
                                size="xl"
                                className="text-white drop-shadow-lg"
                              />
                            </div>
                          </div>
                          <h4 className="mb-3 font-black text-gray-900 dark:text-white text-xl">
                            {t("journey.details.fastTrack.title")}
                          </h4>
                          <p className="font-body text-gray-600 dark:text-gray-300 text-sm sm:text-base leading-relaxed">
                            {t("journey.details.fastTrack.prefix")}{" "}
                            <span className="font-bold text-brand-primary">
                              {t("journey.details.fastTrack.highlight")}
                            </span>
                          </p>
                        </div>
                      </Card>
                    </div>

                    {/* Standard Process Card */}
                    <div className="group relative">
                      <div className="absolute -inset-1 bg-linear-to-br from-brand-secondary/40 to-bronze-700/40 rounded-2xl opacity-20 group-hover:opacity-100 blur-xl transition-all duration-500"></div>
                      <Card className="relative overflow-hidden border-2 border-gray-200 bg-white shadow-lg transition-all duration-300 group-hover:border-transparent group-hover:shadow-2xl dark:border-gray-700 dark:bg-gray-800">
                        <div className="h-2 bg-linear-to-r from-brand-secondary via-bronze-700 to-bronze-800"></div>
                        <div className="p-6 text-center">
                          <div className="relative inline-block mb-4">
                            <div className="absolute -inset-2 bg-linear-to-br from-brand-secondary/40 to-bronze-700/40 opacity-30 blur-lg rounded-2xl"></div>
                            <div className="relative flex justify-center items-center w-16 h-16 bg-linear-to-br from-brand-secondary to-bronze-700 rounded-2xl shadow-xl mx-auto transition-colors duration-300">
                              <MaterialIcon
                                icon="verified"
                                size="xl"
                                className="text-white drop-shadow-lg"
                              />
                            </div>
                          </div>
                          <h4 className="mb-3 font-black text-gray-900 dark:text-white text-xl">
                            {t("journey.details.typical.title")}
                          </h4>
                          <p className="font-body text-gray-600 dark:text-gray-300 text-sm sm:text-base leading-relaxed">
                            {t("journey.details.typical.prefix")}{" "}
                            <span className="font-bold text-brand-secondary-text dark:text-brand-secondary-light">
                              {t("journey.details.typical.highlight")}
                            </span>{" "}
                            {t("journey.details.typical.suffix")}
                          </p>
                        </div>
                      </Card>
                    </div>

                    {/* Always Transparent Card */}
                    <div className="group relative">
                      <div className="absolute -inset-1 bg-linear-to-br from-bronze-700/40 to-bronze-800/40 rounded-2xl opacity-20 group-hover:opacity-100 blur-xl transition-all duration-500"></div>
                      <Card className="relative overflow-hidden border-2 border-gray-200 bg-white shadow-lg transition-all duration-300 group-hover:border-transparent group-hover:shadow-2xl dark:border-gray-700 dark:bg-gray-800">
                        <div className="h-2 bg-linear-to-r from-bronze-700 via-bronze-800 to-gray-700"></div>
                        <div className="p-6 text-center">
                          <div className="relative inline-block mb-4">
                            <div className="absolute -inset-2 bg-linear-to-br from-bronze-700/40 to-bronze-800/40 opacity-30 blur-lg rounded-2xl"></div>
                            <div className="relative flex justify-center items-center w-16 h-16 bg-linear-to-br from-bronze-700 to-bronze-800 rounded-2xl shadow-xl mx-auto transition-colors duration-300">
                              <MaterialIcon
                                icon="support_agent"
                                size="xl"
                                className="text-white drop-shadow-lg"
                              />
                            </div>
                          </div>
                          <h4 className="mb-3 font-black text-gray-900 dark:text-white text-xl">
                            {t("journey.details.transparent.title")}
                          </h4>
                          <p className="font-body text-gray-600 dark:text-gray-300 text-sm sm:text-base leading-relaxed">
                            {t("journey.details.transparent.prefix")}{" "}
                            <span className="font-bold text-bronze-700 dark:text-bronze-400">
                              {t("journey.details.transparent.highlight")}
                            </span>
                          </p>
                        </div>
                      </Card>
                    </div>
                  </div>
                </div>
              </div>

              {/* CTA Section */}
              <div className="mt-12 text-center">
                <p className="mb-6 font-medium text-gray-700 text-xl dark:text-gray-300">
                  {t("journey.cta.title")}
                </p>
                <p className="mb-6 font-semibold text-brand-secondary-text text-lg dark:text-brand-secondary-light">
                  {t("journey.cta.subtitle")}
                </p>
                <div className="flex flex-wrap justify-center gap-4">
                  <Button
                    onClick={() => handleApplyNow("General Inquiry")}
                    variant="primary"
                    size="lg"
                  >
                    <MaterialIcon
                      icon="send"
                      size="md"
                      theme="military"
                      ariaLabel={t("journey.cta.sendAria")}
                      className="mr-2"
                    />
                    {t("journey.cta.startApplication")}
                  </Button>
                  <Button
                    onClick={() => {
                      globalThis.location.href = `mailto:${COMPANY_INFO.email.main}`;
                    }}
                    variant="secondary"
                    size="lg"
                  >
                    <MaterialIcon
                      icon="mark_email_read"
                      size="md"
                      theme="military"
                      ariaLabel={t("journey.cta.emailAria")}
                      className="mr-2"
                    />
                    {t("journey.cta.emailResume")}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* General Application Section */}
        <section
          id="general-application"
          className="relative bg-white dark:bg-gray-900 py-12 sm:py-16 lg:py-20 xl:py-24 overflow-hidden"
        >
          <div className="relative z-10 mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
            <div className="text-center">
              {/* Section Header - Military Construction Standard */}
              <div className="mb-16 sm:mb-20 text-center">
                {/* Icon with decorative lines */}
                <div className="flex items-center justify-center mb-8 gap-4">
                  <div className="h-1 w-16 bg-linear-to-r from-transparent to-gray-300 dark:to-gray-600 rounded-full"></div>
                  <div className="relative">
                    <div className="absolute -inset-4 bg-linear-to-br from-brand-secondary/30 to-bronze-600/30 blur-2xl rounded-full"></div>
                    <div className="relative bg-linear-to-br from-brand-secondary via-bronze-700 to-bronze-800 p-5 rounded-2xl shadow-2xl border-2 border-white/50 dark:border-gray-600">
                      <MaterialIcon
                        icon="person_search"
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
                    {t("noRole.prefix")}
                  </span>
                  <span className="block bg-linear-to-r from-brand-primary via-brand-secondary to-brand-primary bg-clip-text text-transparent font-black drop-shadow-sm overflow-visible py-2 pb-3 leading-normal">
                    {t("noRole.highlight")}
                  </span>
                </h2>

                {/* Description with colored keyword highlighting */}
                <p className="font-body mx-auto max-w-5xl font-light text-gray-700 dark:text-gray-300 text-base sm:text-lg md:text-xl lg:text-2xl leading-relaxed tracking-wide px-2">
                  {t("noRole.intro")}{" "}
                  <span className="font-bold text-brand-primary dark:text-brand-primary-light">
                    {t("noRole.values")}
                  </span>
                  , {t("noRole.middle")}{" "}
                  <span className="font-bold text-gray-900 dark:text-white">
                    {t("noRole.standards")}
                  </span>
                  . {t("noRole.outro")}
                </p>
              </div>

              {/* CTA Buttons - Brand Standards */}
              <div className="flex sm:flex-row flex-col justify-center gap-6">
                <Button
                  onClick={() => handleApplyNow("General Application")}
                  variant="primary"
                  size="lg"
                  className="transition-all duration-300 min-w-65"
                >
                  <MaterialIcon
                    icon="description"
                    size="lg"
                    theme="military"
                    ariaLabel={t("noRole.submitAria")}
                    className="mr-3"
                  />
                  <span className="font-medium">
                    {t("noRole.submitApplication")}
                  </span>
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="transition-all duration-300 min-w-65"
                  asChild
                >
                  <a
                    href={`mailto:${COMPANY_INFO.email.main}?subject=Career%20Inquiry`}
                  >
                    <MaterialIcon
                      icon="campaign"
                      size="lg"
                      theme="military"
                      ariaLabel={t("noRole.contactAria")}
                      className="mr-3"
                    />
                    <span className="font-medium">{t("noRole.contactHr")}</span>
                  </a>
                </Button>
              </div>
              <p className="mt-8 text-gray-500 dark:text-gray-300 text-lg">
                <MaterialIcon
                  icon="call"
                  size="sm"
                  theme="military"
                  ariaLabel={t("noRole.phoneAria")}
                  className="inline mr-2"
                />
                {t("noRole.hrHotline")} {COMPANY_INFO.phone.display} |{" "}
                <a
                  href={`mailto:${COMPANY_INFO.email.main}`}
                  className="font-semibold text-brand-primary hover:text-brand-secondary underline"
                >
                  {COMPANY_INFO.email.main}
                </a>
              </p>
            </div>
          </div>
        </section>

        {/* Contact CTA - Career Questions */}
        <section className="relative bg-linear-to-r from-brand-primary to-brand-primary-dark py-12 sm:py-16 lg:py-20 xl:py-24 overflow-hidden">
          <div className="relative mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl text-center">
            <h2 className="mb-6 font-black text-white text-3xl sm:text-4xl md:text-5xl lg:text-6xl leading-tight tracking-tighter drop-shadow-lg">
              {t("contactCta.questions")}
            </h2>
            <p className="font-body mx-auto max-w-3xl font-light text-white/90 text-lg sm:text-xl md:text-2xl leading-relaxed mb-8">
              {t("contactCta.support")}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="secondary" size="lg" asChild>
                <Link href="/contact" prefetch={false}>
                  <MaterialIcon icon="email" className="mr-2" />
                  {t("noRole.contactHr")}
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
                  {t("contactCta.call", { phone: COMPANY_INFO.phone.display })}
                </a>
              </Button>
            </div>
          </div>
        </section>

        {/* Accreditations & About Our Company */}
        <section className="relative py-12 sm:py-16 bg-white dark:bg-gray-900">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
            <div className="scroll-reveal">
              <p className="font-subheading text-sm font-semibold text-brand-primary dark:text-brand-primary-light tracking-widest font-heading uppercase mb-4">
                {t("accreditations.kicker")}
              </p>
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-2">
                {t("accreditations.title")}
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-8">
                {t("accreditations.description")}
              </p>
              <AccreditationsLogoRow showChambers={false}>
                {/* Safety Award Badge */}
                <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-800">
                  <MaterialIcon
                    icon="workspace_premium"
                    size="lg"
                    className="text-brand-secondary dark:text-brand-secondary-light"
                    ariaLabel={t("accreditations.badgeAria")}
                  />
                  <span className="font-semibold text-gray-900 dark:text-white text-sm">
                    {t("accreditations.badgeText")}
                  </span>
                </div>
              </AccreditationsLogoRow>
            </div>
          </div>
        </section>

        {/* PWA-only: job-alert opt-in — shown only in the installed app */}
        <PWAOnly>
          <section className="bg-linear-to-r from-brand-navy to-brand-blue py-10 px-6">
            <div className="mx-auto max-w-3xl text-center text-white">
              <MaterialIcon
                icon="notifications_active"
                className="mb-3 text-4xl text-yellow-300"
              />
              <h2 className="mb-2 text-2xl font-bold">
                {t("pwaAlerts.title")}
              </h2>
              <p className="mb-6 text-white/80">{t("pwaAlerts.description")}</p>
              <button
                type="button"
                onClick={() => {
                  if (
                    "Notification" in globalThis &&
                    Notification.permission !== "granted"
                  ) {
                    void Notification.requestPermission();
                  }
                }}
                className="inline-flex items-center gap-2 rounded-full bg-yellow-400 px-8 py-3 font-semibold text-brand-navy shadow-lg transition hover:bg-yellow-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-yellow-200"
              >
                <MaterialIcon icon="notifications" className="text-xl" />
                {t("pwaAlerts.button")}
              </button>
            </div>
          </section>
        </PWAOnly>

        {/* Job Application Modal */}
        <JobApplicationModal
          isOpen={showApplicationModal}
          onClose={handleCloseApplicationModal}
          entryPoint={applicationEntryPoint}
        />
      </div>
    </>
  );
}
