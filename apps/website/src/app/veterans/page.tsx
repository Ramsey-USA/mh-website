import { PageTrackingClient, TrackedBridgeLink } from "@/components/analytics";
import Link from "next/link";
import Image from "next/image";
import { MaterialIcon } from "@/components/icons/MaterialIcon";
import { Card } from "@/components/ui";
import { gridPresets } from "@/lib/styles/layout-variants";
import { Breadcrumb } from "@/components/navigation/Breadcrumb";
import { AccreditationsLogoRow } from "@/components/shared-sections";
import { JeremyAuthorityLinksStrip } from "@/components/shared-sections/JeremyAuthorityLinksStrip";
import { StructuredData } from "@/components/seo/SeoMeta";
import {
  generateBreadcrumbSchema,
  breadcrumbPatterns,
} from "@/lib/seo/breadcrumb-schema";
import { COMPANY_INFO } from "@/lib/constants/company";
import { getHeroPageSlogan } from "@/lib/content/hero-page-slogans";
import { getServerLocale } from "@/lib/i18n/locale.server";
import { getTranslations } from "next-intl/server";
import { DiagonalStripePattern } from "@/components/ui/backgrounds";

const breadcrumbSchema = generateBreadcrumbSchema(breadcrumbPatterns.veterans);

/**
 * Veterans Initiative Page
 * Showcasing MH Construction's Veteran-Owned status and community support programs
 */
export default async function VeteransPage() {
  const locale = await getServerLocale();
  const t = await getTranslations({ locale });
  const foundationCards = [
    {
      key: "leadership",
      icon: "military_tech",
      iconBgGradient: "from-brand-primary to-brand-primary-dark",
      accentColor: "brand-primary",
      stat: "2",
    },
    {
      key: "safety",
      icon: "health_and_safety",
      iconBgGradient: "from-bronze-600 to-bronze-700",
      accentColor: "bronze-500",
      stat: ".64",
    },
    {
      key: "experience",
      icon: "workspace_premium",
      iconBgGradient: "from-brand-secondary to-bronze-700",
      accentColor: "brand-secondary",
      stat: "150+",
    },
    {
      key: "transparency",
      icon: "fact_check",
      iconBgGradient: "from-brand-primary to-brand-primary-dark",
      accentColor: "brand-primary",
      stat: "100%",
    },
    {
      key: "missions",
      icon: "verified",
      iconBgGradient: "from-bronze-600 to-bronze-800",
      accentColor: "bronze-500",
      stat: "650+",
    },
    {
      key: "referrals",
      icon: "handshake",
      iconBgGradient: "from-brand-secondary to-brand-secondary-dark",
      accentColor: "brand-secondary",
      stat: "70%",
    },
  ];

  const combatCards = [
    { key: "allBranches", icon: "shield", theme: "military" as const },
    { key: "tailoredService", icon: "balance", theme: "veteran" as const },
  ];

  const timelineSteps = [
    { key: "initialConsultation", num: 1, icon: "phone", position: "left" },
    {
      key: "serviceVerification",
      num: 2,
      icon: "verified_user",
      position: "right",
    },
    { key: "projectAssessment", num: 3, icon: "assessment", position: "left" },
    {
      key: "discountDetermination",
      num: 4,
      icon: "balance",
      position: "right",
    },
    {
      key: "transparentProposal",
      num: 5,
      icon: "description",
      position: "left",
    },
  ];

  const supportStats = [
    { key: "hiringPriority", icon: "badge" },
    { key: "veteranLeaders", icon: "military_tech" },
    { key: "apprenticeship", icon: "school" },
    { key: "network", icon: "handshake" },
  ];

  const partnershipCriteria = [
    {
      key: "nonProfit",
      icon: "verified",
      iconBg: "bg-brand-primary",
      position: "left",
    },
    {
      key: "mission",
      icon: "military_tech",
      iconBg: "bg-brand-secondary",
      position: "right",
    },
    {
      key: "regional",
      icon: "location_on",
      iconBg: "bg-primary-700",
      position: "left",
    },
    {
      key: "collaborative",
      icon: "handshake",
      iconBg: "bg-bronze-700",
      position: "right",
    },
  ];

  return (
    <div className="relative min-h-screen">
      <PageTrackingClient pageName="Veterans" />
      <StructuredData data={breadcrumbSchema} />

      {/* Hero Section - No parallax (will be video later) */}
      <div className="relative z-10">
        <section
          className="hero-section relative flex items-end justify-end text-white overflow-hidden"
          style={{ height: "calc(100vh - var(--mh-nav-offset, 6.5rem))" }}
        >
          {/* Background - Ready for photo or video */}
          <div className="absolute inset-0 bg-linear-to-br from-gray-900 via-brand-primary to-gray-900">
            <div className="absolute inset-0 bg-linear-to-br from-brand-primary/30 via-gray-900/60 to-gray-900/80"></div>
          </div>

          {/* Header Text - Bottom Right */}
          <div className="hero-safe-top hero-safe-bottom relative z-30 mx-3 sm:ml-auto sm:mr-5 lg:mr-7 xl:mr-10 mb-4 pointer-events-none transition-opacity duration-300 sm:w-[min(88vw,44rem)] sm:max-w-176">
            <div className="rounded-2xl border border-white/15 bg-gray-900/60 px-4 py-3 shadow-2xl backdrop-blur-md sm:px-6 sm:py-4 lg:px-8 lg:py-5">
              <h1 className="text-right text-lg xs:text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-black text-white leading-tight tracking-tight">
                <span className="block text-brand-secondary text-sm xs:text-base sm:text-lg md:text-xl lg:text-2xl mb-1">
                  {t("veteransPage.hero.kicker")} → Veterans
                </span>
                <span className="block text-brand-secondary text-xl sm:text-2xl md:text-3xl lg:text-4xl mb-4">
                  {t("veteransPage.hero.titleLine1")}
                </span>
                <span className="block text-brand-secondary">
                  {t("veteransPage.hero.titleLine2")}
                </span>
                <span className="block text-white/95">
                  {t("veteransPage.hero.titleLine3")}
                </span>
                <span className="block text-brand-primary">
                  {t("veteransPage.hero.titleLine4")}
                </span>
                <span className="block text-white/90">
                  {COMPANY_INFO.slogan.primary}
                </span>
                <span className="block text-brand-secondary/90 text-sm xs:text-base sm:text-lg md:text-xl mt-2">
                  {getHeroPageSlogan("veterans").slogan}
                </span>
              </h1>
            </div>
          </div>
        </section>
      </div>

      {/* All sections below Hero - WITH parallax background */}
      <div className="relative min-h-screen">
        <DiagonalStripePattern
          lightOpacity={0.18}
          darkOpacity={0.22}
          lightLogoSrc="/images/logo/mh-veteran-bg.webp"
          darkLogoSrc="/images/logo/mh-veteran-bg.webp"
        />

        {/* Content with parallax background */}
        <div className="relative z-10">
          {/* Breadcrumb Navigation */}
          <Breadcrumb
            items={[
              { label: t("veteransPage.breadcrumb.home"), href: "/" },
              {
                label: t("veteransPage.breadcrumb.current"),
              },
            ]}
          />

          <div className="container mx-auto px-4 pb-4 pt-4 sm:px-6 lg:px-8">
            <JeremyAuthorityLinksStrip isEs={locale === "es"} />
          </div>

          {/* Veteran Foundation - Our Leadership & Values */}
          <section
            id="veteran-leadership"
            className="relative py-12 sm:py-16 lg:py-20 xl:py-24"
          >
            <div className="relative z-10 mx-auto px-4 container">
              {/* Section Header */}
              <div className="mb-16 sm:mb-20 text-center">
                {/* Icon with decorative lines */}
                <div className="flex items-center justify-center mb-8 gap-4">
                  <div className="h-1 w-16 bg-linear-to-r from-transparent to-gray-300 dark:to-gray-600 rounded-full"></div>
                  <div className="relative">
                    <div className="absolute -inset-4 bg-linear-to-br from-brand-primary/30 to-brand-primary-dark/30 blur-2xl rounded-full"></div>
                    <div className="relative bg-linear-to-br from-brand-primary via-brand-primary-dark to-brand-primary-darker p-5 rounded-2xl shadow-2xl border-2 border-white/50 dark:border-gray-600">
                      <MaterialIcon
                        icon="verified"
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
                    {t("veteransPage.foundation.subtitle")}
                  </span>
                  <span className="block bg-linear-to-r from-brand-primary via-brand-secondary to-brand-primary bg-clip-text text-transparent font-black drop-shadow-sm overflow-visible py-2 pb-3 leading-normal">
                    {t("veteransPage.foundation.title")}
                  </span>
                </h2>

                {/* Description with colored keyword highlighting */}
                <p className="font-body mx-auto max-w-5xl font-light text-gray-700 dark:text-gray-300 text-base sm:text-lg md:text-xl lg:text-2xl leading-relaxed tracking-wide px-2">
                  {t("veteransPage.foundation.description.prefix")}{" "}
                  <span className="font-bold text-brand-primary dark:text-brand-primary-light">
                    {t("veteransPage.foundation.description.highlight1")}
                  </span>
                  {t("veteransPage.foundation.description.middle")}{" "}
                  <span className="font-bold text-gray-900 dark:text-white">
                    {t("veteransPage.foundation.description.highlight2")}
                  </span>{" "}
                  {t("veteransPage.foundation.description.suffix")}
                </p>
              </div>

              {/* Veteran Foundation Values Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-16">
                {foundationCards.map((value) => (
                  <div
                    key={value.key}
                    className="group relative flex h-full min-h-105 scroll-reveal"
                  >
                    {/* Colored Border Glow */}
                    <div
                      className={`absolute -inset-2 bg-linear-to-br ${value.iconBgGradient} rounded-2xl opacity-20 group-hover:opacity-100 blur-xl transition-all duration-500`}
                    ></div>

                    <Card className="relative flex w-full flex-col overflow-hidden border-2 border-gray-200 bg-white shadow-lg transition-all duration-300 group-hover:border-transparent group-hover:shadow-2xl dark:border-gray-700 dark:bg-gray-800">
                      {/* Top Accent Bar */}
                      <div
                        className={`h-2 bg-linear-to-r ${value.iconBgGradient}`}
                      ></div>

                      <div className="p-6 sm:p-8 flex flex-col flex-1">
                        {/* Icon and Stat Section */}
                        <div className="flex items-start justify-between mb-5">
                          <div className="relative">
                            <div
                              className={`absolute -inset-2 bg-linear-to-br ${value.iconBgGradient} opacity-30 blur-lg rounded-2xl`}
                            ></div>
                            <div
                              className={`relative inline-flex items-center justify-center w-16 h-16 bg-linear-to-br ${value.iconBgGradient} rounded-2xl shadow-2xl border-2 border-white/50 dark:border-gray-700/50 transition-all duration-300`}
                            >
                              <MaterialIcon
                                icon={value.icon}
                                size="xl"
                                className="text-white drop-shadow-lg"
                                theme="veteran"
                              />
                            </div>
                          </div>
                          <div className="text-right">
                            <div
                              className={`text-3xl sm:text-4xl font-black transition-colors duration-300 ${
                                value.accentColor === "bronze-500"
                                  ? "text-bronze-700 dark:text-bronze-400"
                                  : value.accentColor === "brand-secondary"
                                    ? "text-brand-secondary-dark dark:text-brand-secondary-light"
                                    : "text-brand-primary-dark dark:text-brand-primary-light"
                              }`}
                            >
                              {value.stat}
                            </div>
                            <div className="text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">
                              {t(
                                `veteransPage.foundation.values.${value.key}.statLabel`,
                              )}
                            </div>
                          </div>
                        </div>

                        {/* Title and Subtitle */}
                        <h3 className="mb-2 font-black text-gray-900 dark:text-white text-xl sm:text-2xl leading-tight">
                          {t(
                            `veteransPage.foundation.values.${value.key}.title`,
                          )}
                        </h3>
                        <p
                          className={`mb-4 text-sm sm:text-base font-semibold ${
                            value.accentColor === "bronze-500"
                              ? "text-bronze-700 dark:text-bronze-300"
                              : value.accentColor === "brand-secondary"
                                ? "text-brand-secondary-dark dark:text-brand-secondary"
                                : "text-brand-primary-dark dark:text-brand-primary"
                          }`}
                        >
                          {t(
                            `veteransPage.foundation.values.${value.key}.subtitle`,
                          )}
                        </p>

                        {/* Description */}
                        <p className="font-body mb-6 text-gray-700 dark:text-gray-200 text-sm sm:text-base leading-relaxed flex-1">
                          {t(
                            `veteransPage.foundation.values.${value.key}.description`,
                          )}
                        </p>

                        {/* Key Highlights */}
                        <div className="space-y-2 pt-4 border-t border-gray-200 dark:border-gray-700 mt-auto">
                          {(
                            t.raw(
                              `veteransPage.foundation.values.${value.key}.highlights`,
                            ) as string[]
                          ).map((highlight) => (
                            <div
                              key={`${value.key}-${highlight}`}
                              className="flex items-start gap-3"
                            >
                              <div
                                className={`mt-0.5 shrink-0 w-5 h-5 rounded-full bg-linear-to-br ${value.iconBgGradient} flex items-center justify-center transition-colors duration-300`}
                              >
                                <MaterialIcon
                                  icon="check"
                                  className="text-white text-xs"
                                />
                              </div>
                              <span className="text-sm text-gray-700 dark:text-gray-200 leading-snug">
                                {highlight}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </Card>
                  </div>
                ))}
              </div>

              {/* Veteran Team Members - Side by Side */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-16">
                {/* Jeremy - Army Veteran */}
                <div
                  className="scroll-reveal"
                  style={{ "--delay": "0.1s" } as React.CSSProperties}
                >
                  <div className="group relative flex h-full">
                    <div className="absolute -inset-2 bg-linear-to-br from-brand-primary/40 to-brand-primary-dark/40 rounded-2xl opacity-20 group-hover:opacity-100 blur-xl transition-all duration-500"></div>

                    <Card className="relative flex w-full flex-col overflow-hidden border-2 border-gray-200 bg-white shadow-lg transition-all duration-300 group-hover:border-transparent group-hover:shadow-2xl dark:border-gray-700 dark:bg-gray-800">
                      <div className="h-2 bg-linear-to-r from-brand-primary via-brand-primary-dark to-brand-primary-darker"></div>
                      <div className="absolute left-0 top-0 bottom-0 w-1 bg-linear-to-b from-brand-primary via-brand-primary-dark to-brand-primary-darker"></div>

                      <div className="p-8 sm:p-10 text-center">
                        <div className="relative inline-block mb-6 mx-auto">
                          <div className="absolute -inset-4 bg-linear-to-br from-brand-primary/40 to-brand-primary-dark/40 opacity-30 blur-2xl rounded-full"></div>
                          <div className="relative">
                            <MaterialIcon
                              icon="military_tech"
                              size="5xl"
                              theme="veteran"
                              ariaLabel={t(
                                "veteransPage.leadership.jeremy.aria",
                              )}
                              className="text-brand-primary drop-shadow-lg transition-all duration-300"
                            />
                          </div>
                        </div>
                        <h3 className="text-gray-900 dark:text-white text-2xl sm:text-3xl font-bold mb-2">
                          {t("veteransPage.leadership.jeremy.name")}
                        </h3>
                        <p className="text-brand-primary font-semibold text-lg mb-6">
                          {t("veteransPage.leadership.jeremy.role")}
                        </p>
                        <p className="font-body text-gray-700 dark:text-gray-300 text-base sm:text-lg leading-relaxed">
                          {t("veteransPage.leadership.jeremy.bio")}
                        </p>
                      </div>
                    </Card>
                  </div>
                </div>

                {/* Matt - Navy Veteran */}
                <div
                  className="scroll-reveal"
                  style={{ "--delay": "0.2s" } as React.CSSProperties}
                >
                  <div className="group relative flex h-full">
                    <div className="absolute -inset-2 bg-linear-to-br from-brand-secondary/40 via-bronze-600/40 to-bronze-700/40 rounded-2xl opacity-20 group-hover:opacity-100 blur-xl transition-all duration-500"></div>

                    <Card className="relative flex w-full flex-col overflow-hidden border-2 border-gray-200 bg-white shadow-lg transition-all duration-300 group-hover:border-transparent group-hover:shadow-2xl dark:border-gray-700 dark:bg-gray-800">
                      <div className="h-2 bg-linear-to-r from-brand-secondary via-bronze-700 to-bronze-800"></div>
                      <div className="absolute left-0 top-0 bottom-0 w-1 bg-linear-to-b from-brand-secondary via-bronze-700 to-bronze-800"></div>

                      <div className="p-8 sm:p-10 text-center">
                        <div className="relative inline-block mb-6 mx-auto">
                          <div className="absolute -inset-4 bg-linear-to-br from-brand-secondary/40 via-bronze-600/40 to-bronze-700/40 opacity-30 blur-2xl rounded-full"></div>
                          <div className="relative">
                            <MaterialIcon
                              icon="anchor"
                              size="5xl"
                              theme="veteran"
                              ariaLabel={t("veteransPage.leadership.matt.aria")}
                              className="text-brand-secondary drop-shadow-lg transition-all duration-300"
                            />
                          </div>
                        </div>
                        <h3 className="text-gray-900 dark:text-white text-2xl sm:text-3xl font-bold mb-2">
                          {t("veteransPage.leadership.matt.name")}
                        </h3>
                        <p className="text-brand-secondary-text font-semibold text-lg mb-6 dark:text-brand-secondary-light">
                          {t("veteransPage.leadership.matt.role")}
                        </p>
                        <p className="font-body text-gray-700 dark:text-gray-300 text-base sm:text-lg leading-relaxed">
                          {t("veteransPage.leadership.matt.bio")}
                        </p>
                      </div>
                    </Card>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Combat Veteran Discount Section */}
          <section
            id="combat-veteran-discount"
            className="relative py-12 sm:py-16 lg:py-20 xl:py-24"
          >
            <div className="relative z-10 mx-auto px-4 container">
              {/* Section Header - Military Construction Standard */}
              <div className="mb-16 sm:mb-20 text-center">
                {/* Icon with decorative lines */}
                <div className="flex items-center justify-center mb-8 gap-4">
                  <div className="h-1 w-16 bg-linear-to-r from-transparent to-gray-300 dark:to-gray-600 rounded-full"></div>
                  <div className="relative">
                    <div className="absolute -inset-4 bg-linear-to-br from-brand-secondary/30 to-bronze-700/30 blur-2xl rounded-full"></div>
                    <div className="relative bg-linear-to-br from-brand-secondary via-bronze-700 to-bronze-800 p-5 rounded-2xl shadow-2xl border-2 border-white/50 dark:border-gray-600">
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
                    {t("veteransPage.combat.subtitle")}
                  </span>
                  <span className="block bg-linear-to-r from-brand-primary via-brand-secondary to-brand-primary bg-clip-text text-transparent font-black drop-shadow-sm overflow-visible py-2 pb-3 leading-normal">
                    {t("veteransPage.combat.title")}
                  </span>
                </h2>

                {/* Description with colored keyword highlighting */}
                <p className="font-body mx-auto max-w-5xl font-light text-gray-700 dark:text-gray-300 text-base sm:text-lg md:text-xl lg:text-2xl leading-relaxed tracking-wide px-2">
                  <span className="font-bold text-brand-primary dark:text-brand-primary-light">
                    {t("veteransPage.combat.description.highlight1")}
                  </span>
                  {t("veteransPage.combat.description.middle")}{" "}
                  <span className="font-bold text-gray-900 dark:text-white">
                    {t("veteransPage.combat.description.highlight2")}
                  </span>
                  {t("veteransPage.combat.description.suffix")}
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto mb-16">
                {combatCards.map((card, cardIndex) => (
                  <div key={card.key} className="group relative flex h-full">
                    <div className="absolute -inset-2 bg-linear-to-br from-brand-primary/40 to-brand-secondary/40 rounded-2xl opacity-20 group-hover:opacity-100 blur-xl transition-all duration-500"></div>
                    <Card className="relative flex w-full flex-col overflow-hidden border-2 border-gray-200 bg-white shadow-lg transition-all duration-300 group-hover:border-transparent group-hover:shadow-2xl dark:border-gray-700 dark:bg-gray-800">
                      <div
                        className={`h-2 ${
                          cardIndex === 0
                            ? "bg-linear-to-r from-brand-primary via-brand-secondary to-brand-primary"
                            : "bg-linear-to-r from-brand-secondary via-bronze-700 to-bronze-800"
                        }`}
                      ></div>
                      <div className="p-6 sm:p-8 text-center flex flex-col flex-1">
                        <div className="relative inline-block mb-4 mx-auto">
                          <div
                            className={`absolute -inset-2 opacity-30 blur-lg rounded-full ${
                              cardIndex === 0
                                ? "bg-linear-to-br from-brand-primary/40 to-brand-secondary/40"
                                : "bg-linear-to-br from-brand-secondary/40 via-bronze-600/40 to-bronze-700/40"
                            }`}
                          ></div>
                          <div className="relative">
                            <MaterialIcon
                              icon={card.icon}
                              size="4xl"
                              theme={card.theme}
                              ariaLabel={t(
                                `veteransPage.combat.cards.${card.key}.aria`,
                              )}
                              className={`drop-shadow-lg transition-all duration-300 ${
                                cardIndex === 0
                                  ? "text-brand-primary"
                                  : "text-brand-secondary"
                              }`}
                            />
                          </div>
                        </div>
                        <h3 className="text-gray-900 dark:text-white text-xl sm:text-2xl font-bold mb-4">
                          {t(`veteransPage.combat.cards.${card.key}.title`)}
                        </h3>
                        <p className="font-body text-gray-700 dark:text-gray-300 text-base sm:text-lg leading-relaxed grow">
                          {t(
                            `veteransPage.combat.cards.${card.key}.description`,
                          )}
                        </p>
                      </div>
                    </Card>
                  </div>
                ))}
              </div>

              {/* Screening Process Timeline Section */}
              <div className="relative max-w-6xl mx-auto mt-16">
                {/* Vertical Connecting Line - Desktop */}
                <div className="hidden lg:block absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-linear-to-b from-brand-primary/30 via-brand-secondary to-brand-primary/30"></div>

                {/* Timeline Header */}
                <div className="mb-12 text-center">
                  <h3 className="text-gray-900 dark:text-white text-2xl sm:text-3xl font-bold mb-4">
                    {t("veteransPage.combat.timeline.title")}
                  </h3>
                  <p className="font-body text-gray-700 dark:text-gray-300 text-base sm:text-lg max-w-3xl mx-auto">
                    {t("veteransPage.combat.timeline.description")}
                  </p>
                </div>

                {/* Timeline Steps */}
                <div className="space-y-12 lg:space-y-20">
                  {timelineSteps.map((step, index) => (
                    <div
                      key={step.num}
                      className="relative group scroll-reveal"
                    >
                      {/* Desktop Layout */}
                      <div className="hidden lg:flex items-center gap-8">
                        {step.position === "left" ? (
                          <>
                            {/* Content Left */}
                            <div className="flex-1 text-right">
                              <div className="inline-block bg-white dark:bg-gray-800 rounded-2xl border-2 border-gray-200 dark:border-gray-700 p-8 shadow-lg hover:shadow-2xl transition-all duration-300 group-hover:border-brand-primary dark:group-hover:border-brand-primary-light">
                                <div className="flex items-center justify-end gap-4 mb-4">
                                  <div>
                                    <h4 className="font-black text-gray-900 dark:text-white text-xl mb-1">
                                      {t(
                                        `veteransPage.combat.timeline.steps.${step.key}.title`,
                                      )}
                                    </h4>
                                  </div>
                                  <div className="shrink-0 w-14 h-14 bg-linear-to-br from-brand-primary to-brand-primary-dark rounded-xl flex items-center justify-center shadow-lg transition-colors duration-300">
                                    <MaterialIcon
                                      icon={step.icon}
                                      size="lg"
                                      className="text-white"
                                    />
                                  </div>
                                </div>
                                <p className="font-body text-gray-600 dark:text-gray-300 text-base leading-relaxed">
                                  {t(
                                    `veteransPage.combat.timeline.steps.${step.key}.description`,
                                    { phone: COMPANY_INFO.phone.display },
                                  )}
                                </p>
                              </div>
                            </div>

                            {/* Center Circle */}
                            <div className="shrink-0 relative z-10">
                              <div className="w-16 h-16 bg-linear-to-br from-brand-primary to-brand-primary-dark rounded-full flex items-center justify-center text-white font-black text-xl shadow-2xl border-4 border-white dark:border-gray-900 transition-colors duration-300">
                                {step.num}
                              </div>
                            </div>

                            {/* Empty Right */}
                            <div className="flex-1"></div>
                          </>
                        ) : (
                          <>
                            {/* Empty Left */}
                            <div className="flex-1"></div>

                            {/* Center Circle */}
                            <div className="shrink-0 relative z-10">
                              <div className="w-16 h-16 bg-linear-to-br from-brand-secondary to-bronze-700 rounded-full flex items-center justify-center text-white font-black text-xl shadow-2xl border-4 border-white dark:border-gray-900 transition-colors duration-300">
                                {step.num}
                              </div>
                            </div>

                            {/* Content Right */}
                            <div className="flex-1 text-left">
                              <div className="inline-block bg-white dark:bg-gray-800 rounded-2xl border-2 border-gray-200 dark:border-gray-700 p-8 shadow-lg hover:shadow-2xl transition-all duration-300 group-hover:border-brand-secondary dark:group-hover:border-brand-secondary-light">
                                <div className="flex items-center gap-4 mb-4">
                                  <div className="shrink-0 w-14 h-14 bg-linear-to-br from-brand-secondary to-bronze-700 rounded-xl flex items-center justify-center shadow-lg transition-colors duration-300">
                                    <MaterialIcon
                                      icon={step.icon}
                                      size="lg"
                                      className="text-white"
                                    />
                                  </div>
                                  <div>
                                    <h4 className="font-black text-gray-900 dark:text-white text-xl mb-1">
                                      {t(
                                        `veteransPage.combat.timeline.steps.${step.key}.title`,
                                      )}
                                    </h4>
                                  </div>
                                </div>
                                <p className="font-body text-gray-600 dark:text-gray-300 text-base leading-relaxed">
                                  {t(
                                    `veteransPage.combat.timeline.steps.${step.key}.description`,
                                    { phone: COMPANY_INFO.phone.display },
                                  )}
                                </p>
                              </div>
                            </div>
                          </>
                        )}
                      </div>

                      {/* Mobile Layout */}
                      <div className="lg:hidden flex gap-4">
                        {/* Left Side - Number and Line */}
                        <div className="flex flex-col items-center shrink-0">
                          <div
                            className={`w-14 h-14 ${
                              step.num % 2 === 0
                                ? "bg-linear-to-br from-brand-secondary to-bronze-700"
                                : "bg-linear-to-br from-brand-primary to-brand-primary-dark"
                            } rounded-full flex items-center justify-center text-white font-black text-lg shadow-xl border-4 border-white dark:border-gray-900 relative z-10`}
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
                                className={`shrink-0 w-12 h-12 ${
                                  step.num % 2 === 0
                                    ? "bg-linear-to-br from-brand-secondary to-bronze-700"
                                    : "bg-linear-to-br from-brand-primary to-brand-primary-dark"
                                } rounded-xl flex items-center justify-center shadow-lg`}
                              >
                                <MaterialIcon
                                  icon={step.icon}
                                  size="md"
                                  className="text-white"
                                />
                              </div>
                              <h4 className="font-black text-gray-900 dark:text-white text-lg">
                                {t(
                                  `veteransPage.combat.timeline.steps.${step.key}.title`,
                                )}
                              </h4>
                            </div>
                            <p className="font-body text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
                              {t(
                                `veteransPage.combat.timeline.steps.${step.key}.description`,
                                { phone: COMPANY_INFO.phone.display },
                              )}
                            </p>
                          </Card>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Commitment Card */}
                <div
                  className="mt-16 max-w-3xl mx-auto scroll-reveal"
                  style={{ "--delay": "0.5s" } as React.CSSProperties}
                >
                  <Card className="border-2 border-brand-primary/30 bg-brand-primary/10 p-8 dark:bg-brand-primary/20">
                    <div className="flex items-start gap-4">
                      <MaterialIcon
                        icon="verified_user"
                        size="2xl"
                        className="text-brand-primary shrink-0"
                      />
                      <div>
                        <h4 className="font-bold text-gray-900 dark:text-white text-lg mb-2">
                          {t("veteransPage.combat.commitment.title")}
                        </h4>
                        <p className="text-gray-700 dark:text-gray-300">
                          {t("veteransPage.combat.commitment.description")}
                        </p>
                      </div>
                    </div>
                  </Card>
                </div>
              </div>

              {/* CTA */}
              <div className="mt-12 text-center">
                <Link
                  href="/contact"
                  prefetch={false}
                  className="inline-flex items-center gap-2 px-10 py-5 bg-brand-primary hover:bg-brand-primary/90 text-white transition-all duration-300 rounded-lg font-bold text-lg sm:text-xl shadow-lg hover:shadow-xl"
                >
                  <MaterialIcon
                    icon="phone"
                    size="lg"
                    theme="military"
                    ariaLabel={t("veteransPage.combat.cta.aria")}
                  />
                  <span>
                    {t("veteransPage.combat.cta.button", {
                      phone: COMPANY_INFO.phone.display,
                    })}
                  </span>
                </Link>
                <p className="font-body mt-4 text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                  {t("veteransPage.combat.cta.note")}
                </p>
              </div>
            </div>
          </section>

          {/* Year-Round Veteran Support - Impact by the Numbers */}
          <section
            id="year-round-support"
            className="relative py-12 sm:py-16 lg:py-20 xl:py-24"
          >
            <div className="relative z-10 mx-auto px-4 container">
              {/* Section Header - Military Construction Standard */}
              <div className="mb-16 sm:mb-20 text-center relative z-10">
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
                    {t("veteransPage.support.subtitle")}
                  </span>
                  <span className="block bg-linear-to-r from-brand-primary via-brand-secondary to-brand-primary bg-clip-text text-transparent font-black drop-shadow-sm overflow-visible py-2 pb-3 leading-normal">
                    {t("veteransPage.support.title")}
                  </span>
                </h2>

                {/* Description with colored keyword highlighting */}
                <p className="font-body mx-auto max-w-5xl font-light text-gray-700 dark:text-gray-300 text-base sm:text-lg md:text-xl lg:text-2xl leading-relaxed tracking-wide px-2">
                  {t("veteransPage.support.description.prefix")}{" "}
                  <span className="font-bold text-brand-primary dark:text-brand-primary-light">
                    {t("veteransPage.support.description.highlight1")}
                  </span>
                  {t("veteransPage.support.description.middle")}{" "}
                  <span className="font-bold text-gray-900 dark:text-white">
                    {t("veteransPage.support.description.highlight2")}
                  </span>
                  {t("veteransPage.support.description.suffix")}
                </p>
              </div>

              {/* Stats Grid */}
              <div className="gap-6 sm:gap-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 mx-auto max-w-6xl mb-16 relative z-10">
                {supportStats.map((stat) => (
                  <Card
                    key={stat.key}
                    className="group h-full flex flex-col border-2 border-gray-200 bg-white p-6 text-center shadow-lg transition-all duration-300 hover:shadow-2xl dark:border-gray-700 dark:bg-gray-800 dark:hover:shadow-brand-primary/20 sm:p-8"
                  >
                    <div className="relative inline-block mb-4 mx-auto">
                      <div className="absolute -inset-2 bg-linear-to-br from-brand-primary/30 to-brand-secondary/30 opacity-20 blur-lg rounded-full group-hover:opacity-40 transition-opacity"></div>
                      <div className="relative">
                        <MaterialIcon
                          icon={stat.icon}
                          className="text-brand-primary transition-colors"
                          size="2xl"
                          theme="veteran"
                        />
                      </div>
                    </div>
                    <div className="mb-3 font-black text-4xl sm:text-5xl text-brand-primary dark:text-brand-primary-light drop-shadow-sm">
                      {t(`veteransPage.support.stats.${stat.key}.value`)}
                    </div>
                    <div className="text-gray-900 dark:text-white font-bold text-base sm:text-lg mb-3">
                      {t(`veteransPage.support.stats.${stat.key}.label`)}
                    </div>
                    <div className="font-body text-gray-600 dark:text-gray-300 text-sm leading-relaxed mt-auto">
                      {t(`veteransPage.support.stats.${stat.key}.description`)}
                    </div>
                  </Card>
                ))}
              </div>

              {/* Program Cards */}
              <div className={`${gridPresets.cards3("md")} relative z-10`}>
                <div className="group relative flex h-full scroll-reveal">
                  {/* Animated Border Glow */}
                  <div className="absolute -inset-2 bg-linear-to-br from-brand-primary/40 to-brand-primary-dark/40 rounded-2xl opacity-20 group-hover:opacity-100 blur-xl transition-all duration-500"></div>

                  <Card className="relative flex w-full flex-col overflow-hidden border-2 border-gray-200 bg-white shadow-lg transition-all duration-300 group-hover:shadow-2xl dark:border-gray-700 dark:bg-gray-800 group-hover:border-transparent">
                    {/* Top Accent Bar */}
                    <div className="h-2 bg-linear-to-r from-brand-primary via-brand-primary-dark to-brand-primary-darker"></div>

                    <div className="p-6 sm:p-8 flex flex-col flex-1">
                      <div className="relative inline-block mb-4 mx-auto">
                        <div className="absolute -inset-2 bg-linear-to-br from-brand-primary/40 to-brand-primary-dark/40 opacity-30 blur-lg rounded-full"></div>
                        <div className="relative">
                          <MaterialIcon
                            icon="badge"
                            size="4xl"
                            theme="military"
                            ariaLabel={t(
                              "veteransPage.support.programs.hiring.aria",
                            )}
                            className="text-brand-primary drop-shadow-lg transition-all duration-300"
                          />
                        </div>
                      </div>
                      <h3 className="text-gray-900 dark:text-white text-xl sm:text-2xl font-bold mb-4 text-center">
                        {t("veteransPage.support.programs.hiring.title")}
                      </h3>
                      <p className="font-body text-gray-700 dark:text-gray-300 text-base sm:text-lg mb-4 text-center leading-relaxed grow">
                        {t("veteransPage.support.programs.hiring.description")}
                      </p>
                      <div className="text-center">
                        <Link
                          href="/careers"
                          prefetch={false}
                          className="inline-flex items-center text-brand-primary hover:text-brand-secondary transition-colors font-semibold"
                        >
                          <span>
                            {t("veteransPage.support.programs.hiring.link")}
                          </span>
                          <MaterialIcon
                            icon="arrow_forward"
                            size="sm"
                            className="ml-1"
                          />
                        </Link>
                      </div>
                    </div>
                  </Card>
                </div>

                <div className="group relative flex h-full scroll-reveal">
                  {/* Animated Border Glow */}
                  <div className="absolute -inset-2 bg-linear-to-br from-brand-secondary/40 via-bronze-600/40 to-bronze-700/40 rounded-2xl opacity-20 group-hover:opacity-100 blur-xl transition-all duration-500"></div>

                  <Card className="relative flex w-full flex-col overflow-hidden border-2 border-gray-200 bg-white shadow-lg transition-all duration-300 group-hover:shadow-2xl dark:border-gray-700 dark:bg-gray-800 group-hover:border-transparent">
                    {/* Top Accent Bar */}
                    <div className="h-2 bg-linear-to-r from-brand-secondary via-bronze-700 to-bronze-800"></div>

                    <div className="p-6 sm:p-8 flex flex-col flex-1">
                      <div className="relative inline-block mb-4 mx-auto">
                        <div className="absolute -inset-2 bg-linear-to-br from-brand-secondary/40 via-bronze-600/40 to-bronze-700/40 opacity-30 blur-lg rounded-full"></div>
                        <div className="relative">
                          <MaterialIcon
                            icon="handshake"
                            size="4xl"
                            theme="veteran"
                            ariaLabel={t(
                              "veteransPage.support.programs.allies.aria",
                            )}
                            className="text-brand-secondary drop-shadow-lg transition-all duration-300"
                          />
                        </div>
                      </div>
                      <h3 className="text-gray-900 dark:text-white text-xl sm:text-2xl font-bold mb-4 text-center">
                        {t("veteransPage.support.programs.allies.title")}
                      </h3>
                      <p className="font-body text-gray-700 dark:text-gray-300 text-base sm:text-lg mb-4 text-center leading-relaxed grow">
                        {t("veteransPage.support.programs.allies.description")}
                      </p>
                      <div className="text-center">
                        <Link
                          href="/allies"
                          prefetch={false}
                          className="inline-flex items-center text-brand-secondary hover:text-brand-primary transition-colors font-semibold"
                        >
                          <span>
                            {t("veteransPage.support.programs.allies.link")}
                          </span>
                          <MaterialIcon
                            icon="arrow_forward"
                            size="sm"
                            className="ml-1"
                          />
                        </Link>
                      </div>
                    </div>
                  </Card>
                </div>

                <div className="group relative flex h-full scroll-reveal">
                  {/* Animated Border Glow */}
                  <div className="absolute -inset-2 bg-linear-to-br from-brand-secondary/40 via-bronze-600/40 to-bronze-700/40 rounded-2xl opacity-20 group-hover:opacity-100 blur-xl transition-all duration-500"></div>

                  <Card className="relative flex w-full flex-col overflow-hidden border-2 border-gray-200 bg-white shadow-lg transition-all duration-300 group-hover:shadow-2xl dark:border-gray-700 dark:bg-gray-800 group-hover:border-transparent">
                    {/* Top Accent Bar */}
                    <div className="h-2 bg-linear-to-r from-brand-secondary via-bronze-700 to-bronze-800"></div>

                    <div className="p-6 sm:p-8 flex flex-col flex-1">
                      <div className="relative inline-block mb-4 mx-auto">
                        <div className="absolute -inset-2 bg-linear-to-br from-brand-secondary/40 via-bronze-600/40 to-bronze-700/40 opacity-30 blur-lg rounded-full"></div>
                        <div className="relative">
                          <MaterialIcon
                            icon="military_tech"
                            size="4xl"
                            theme="veteran"
                            ariaLabel={t(
                              "veteransPage.support.programs.training.aria",
                            )}
                            className="text-brand-secondary drop-shadow-lg transition-all duration-300"
                          />
                        </div>
                      </div>
                      <h3 className="text-gray-900 dark:text-white text-xl sm:text-2xl font-bold mb-4 text-center">
                        {t("veteransPage.support.programs.training.title")}
                      </h3>
                      <p className="font-body text-gray-700 dark:text-gray-300 text-base sm:text-lg mb-4 text-center leading-relaxed grow">
                        {t(
                          "veteransPage.support.programs.training.description",
                        )}
                      </p>
                      <div className="text-center">
                        <Link
                          href="/about"
                          prefetch={false}
                          className="inline-flex items-center text-brand-secondary hover:text-brand-primary transition-colors font-semibold"
                        >
                          <span>
                            {t("veteransPage.support.programs.training.link")}
                          </span>
                          <MaterialIcon
                            icon="arrow_forward"
                            size="sm"
                            className="ml-1"
                          />
                        </Link>
                      </div>
                    </div>
                  </Card>
                </div>
              </div>
            </div>
          </section>

          {/* Strategic Veteran Partnerships Section */}
          <section
            id="veteran-partnerships"
            className="relative py-12 sm:py-16 lg:py-20 xl:py-24"
          >
            <div className="absolute inset-0 opacity-10 pointer-events-none">
              <Image
                src="/images/logo/mh-veteran-bg.webp"
                alt=""
                fill
                sizes="100vw"
                quality={55}
                loading="lazy"
                className="object-cover object-center"
                aria-hidden="true"
              />
            </div>
            <div className="relative z-10 mx-auto px-4 container">
              {/* Section Header */}
              <div className="mb-16 sm:mb-20 text-center">
                {/* Icon with decorative lines */}
                <div className="flex items-center justify-center mb-8 gap-4">
                  <div className="h-1 w-16 bg-linear-to-r from-transparent to-gray-300 dark:to-gray-600 rounded-full"></div>
                  <div className="relative">
                    <div className="absolute -inset-4 bg-linear-to-br from-brand-secondary/30 to-bronze-600/30 blur-2xl rounded-full"></div>
                    <div className="relative bg-linear-to-br from-brand-secondary via-bronze-700 to-bronze-800 p-5 rounded-2xl shadow-2xl border-2 border-white/50 dark:border-gray-600">
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
                    {t("veteransPage.partnerships.subtitle")}
                  </span>
                  <span className="block bg-linear-to-r from-brand-primary via-brand-secondary to-brand-primary bg-clip-text text-transparent font-black drop-shadow-sm overflow-visible py-2 pb-3 leading-normal">
                    {t("veteransPage.partnerships.title")}
                  </span>
                </h2>

                {/* Description */}
                <p className="font-body mx-auto max-w-5xl font-light text-gray-700 dark:text-gray-300 text-base sm:text-lg md:text-xl lg:text-2xl leading-relaxed tracking-wide px-2">
                  {t("veteransPage.partnerships.description.prefix")}{" "}
                  <span className="font-bold text-brand-primary dark:text-brand-primary-light">
                    {t("veteransPage.partnerships.description.highlight1")}
                  </span>{" "}
                  {t("veteransPage.partnerships.description.middle")}{" "}
                  <span className="font-bold text-gray-900 dark:text-white">
                    {t("veteransPage.partnerships.description.highlight2")}
                  </span>
                  {t("veteransPage.partnerships.description.suffix")}
                </p>
              </div>

              {/* Partnership Criteria Cards - Alternating Layout */}
              <div className="space-y-12 lg:space-y-16">
                {partnershipCriteria.map((item) => {
                  const isLeft = item.position === "left";
                  return (
                    <div key={item.key} className="scroll-reveal group">
                      <Card className="flex flex-col overflow-hidden border border-gray-200 bg-white transition-all duration-300 hover:shadow-2xl dark:border-gray-700 dark:bg-gray-800 dark:hover:shadow-brand-primary/20 lg:grid lg:grid-cols-2">
                        {/* Image Side */}
                        <div
                          role="img"
                          aria-label={t(
                            `veteransPage.partnerships.criteria.${item.key}.aria`,
                          )}
                          className={`relative h-64 sm:h-80 lg:h-full lg:min-h-125 overflow-hidden bg-linear-to-br from-brand-primary via-gray-900 to-brand-secondary ${
                            isLeft ? "lg:order-1" : "lg:order-2"
                          }`}
                        >
                          {/* Overlay gradient for better icon visibility */}
                          <div className="absolute inset-0 bg-linear-to-t from-black/60 via-black/20 to-transparent lg:bg-linear-to-r lg:from-black/60 lg:via-black/20 lg:to-transparent"></div>

                          {/* Icon Badge on Image */}
                          <div className="absolute bottom-4 left-4 lg:bottom-6 lg:left-6">
                            <div className="relative inline-block">
                              <div className="absolute inset-0 bg-linear-to-br from-brand-primary/30 to-brand-secondary/30 blur-xl rounded-2xl"></div>
                              <div
                                className={`relative w-14 h-14 sm:w-16 sm:h-16 lg:w-20 lg:h-20 ${item.iconBg} rounded-2xl flex items-center justify-center shadow-xl`}
                              >
                                <MaterialIcon
                                  icon={item.icon}
                                  size="xl"
                                  className="text-white"
                                  interactive
                                />
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Content Side */}
                        <div
                          className={`p-8 sm:p-10 lg:p-12 flex flex-col justify-center ${
                            isLeft ? "lg:order-2" : "lg:order-1"
                          }`}
                        >
                          <div className="space-y-4 lg:space-y-5">
                            <div>
                              <h3 className="font-black text-gray-900 dark:text-gray-100 text-2xl sm:text-3xl lg:text-3xl leading-tight tracking-tight mb-2">
                                {t(
                                  `veteransPage.partnerships.criteria.${item.key}.title`,
                                )}
                              </h3>
                              <p className="font-semibold text-brand-primary dark:text-brand-primary-light text-base sm:text-lg lg:text-xl">
                                {t(
                                  `veteransPage.partnerships.criteria.${item.key}.tagline`,
                                )}
                              </p>
                            </div>

                            <p className="font-body font-normal text-gray-700 dark:text-gray-300 text-sm sm:text-base lg:text-base leading-relaxed">
                              {t(
                                `veteransPage.partnerships.criteria.${item.key}.description`,
                              )}
                            </p>

                            <div className="flex items-center gap-3 pt-4 border-t border-gray-200 dark:border-gray-700">
                              <div className="flex items-center justify-center w-12 h-12 bg-brand-primary/10 dark:bg-brand-primary/20 rounded-xl shrink-0">
                                <MaterialIcon
                                  icon="analytics"
                                  size="md"
                                  className="text-brand-primary dark:text-brand-primary-light"
                                />
                              </div>
                              <div className="flex-1">
                                <p className="font-bold text-gray-900 dark:text-white text-base">
                                  {t(
                                    `veteransPage.partnerships.criteria.${item.key}.stats`,
                                  )}
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </Card>
                    </div>
                  );
                })}
              </div>

              {/* Partnership CTA */}
              <div className="mt-16 text-center scroll-reveal">
                <Card className="mx-auto max-w-3xl border-2 border-brand-primary/30 bg-brand-primary/10 p-8 dark:bg-brand-primary/20">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                    <MaterialIcon
                      icon="contact_mail"
                      size="2xl"
                      className="text-brand-primary shrink-0"
                    />
                    <div className="flex-1 text-left">
                      <h4 className="font-bold text-gray-900 dark:text-white text-lg mb-2">
                        {t("veteransPage.partnerships.cta.title")}
                      </h4>
                      <p className="font-body text-gray-700 dark:text-gray-300 mb-4">
                        {t("veteransPage.partnerships.cta.description")}
                      </p>
                      <Link
                        href="/contact"
                        prefetch={false}
                        className="inline-flex items-center gap-2 px-6 py-3 bg-brand-primary hover:bg-brand-primary/90 text-white transition-all duration-300 rounded-lg font-bold shadow-lg hover:shadow-xl"
                      >
                        <MaterialIcon icon="send" size="sm" />
                        <span>{t("veteransPage.partnerships.cta.button")}</span>
                      </Link>
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          </section>

          {/* Accreditations & Certifications */}
          <section className="relative py-12 sm:py-16">
            <div className="relative z-10 mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl text-center">
              <p className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-6">
                {t("veteransPage.accreditations.kicker")}
              </p>
              <AccreditationsLogoRow />
            </div>
          </section>

          <section className="relative py-12 sm:py-16">
            <div className="relative z-10 mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
              <div className="text-center mb-8">
                <h3 className="text-2xl sm:text-3xl font-black text-gray-900 dark:text-white tracking-tight">
                  {t("veteransPage.bridgePaths.title")}
                </h3>
                <p className="font-body mt-3 text-sm sm:text-base text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                  {t("veteransPage.bridgePaths.description")}
                </p>
              </div>

              <div className="grid gap-4 md:grid-cols-3">
                {[
                  {
                    key: "publicSector",
                    href: "/veterans/public-sector-construction",
                    icon: "account_balance",
                  },
                  {
                    key: "compliance",
                    href: "/public-sector/veteran-led-compliance",
                    icon: "verified",
                  },
                  {
                    key: "triState",
                    href: "/public-sector/tri-state-government-construction",
                    icon: "travel_explore",
                  },
                ].map((pathway) => (
                  <TrackedBridgeLink
                    key={pathway.href}
                    href={pathway.href}
                    trackId={`veterans-bridge-${pathway.href}`}
                    className="rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-5 shadow-sm hover:shadow-md hover:border-brand-primary transition-all"
                  >
                    <MaterialIcon
                      icon={pathway.icon}
                      size="md"
                      className="text-brand-primary"
                    />
                    <h4 className="mt-3 font-bold text-gray-900 dark:text-white text-lg">
                      {t(`veteransPage.bridgePaths.items.${pathway.key}.title`)}
                    </h4>
                    <p className="font-body mt-2 text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                      {t(
                        `veteransPage.bridgePaths.items.${pathway.key}.description`,
                      )}
                    </p>
                    <span className="mt-3 inline-flex items-center gap-2 text-sm font-semibold text-brand-primary dark:text-brand-primary-light">
                      {t("veteransPage.bridgePaths.openPathway")}
                      <MaterialIcon icon="arrow_forward" size="sm" />
                    </span>
                  </TrackedBridgeLink>
                ))}
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
