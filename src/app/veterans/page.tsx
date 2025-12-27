import Link from "next/link";
import type { Metadata } from "next";
import Image from "next/image";
import { MaterialIcon } from "@/components/icons/MaterialIcon";
import { AmericanFlag } from "@/components/icons/AmericanFlag";
import {
  FadeInWhenVisible,
  StaggeredFadeIn,
} from "@/components/animations/FramerMotionComponents";
import { gridPresets } from "@/lib/styles/layout-variants";
import { Breadcrumb } from "@/components/navigation/Breadcrumb";
import { PageNavigation } from "@/components/navigation/PageNavigation";
import { navigationConfigs } from "@/components/navigation/navigationConfigs";
import { NextStepsSection } from "@/components/shared-sections";
import { UnderConstruction } from "@/components/layout/UnderConstruction";
import { StructuredData } from "@/components/seo/seo-meta";
import {
  generateBreadcrumbSchema,
  breadcrumbPatterns,
} from "@/lib/seo/breadcrumb-schema";

// Feature flag - set to false to show full page content
const SHOW_UNDER_CONSTRUCTION = false;

/**
 * Veterans Initiative Page Metadata
 * SEO optimized for veteran-owned construction services and veteran support programs
 * Updated: December 2025 - Comprehensive veteran foundation, partnerships, and year-round programs
 */
export const metadata: Metadata = {
  title:
    "Veteran-Owned Construction | Combat Veteran Discount | Year-Round Support | MH Construction",
  description:
    "Veteran-owned since January 2025. Army & Navy veteran leadership with 150+ years combined experience. Combat Veteran Discount through respectful screening, 100% veteran hiring priority, active apprenticeship programs, strategic partnerships with selective veteran organizations. Honesty, integrity, professionalism, thoroughness guide every project.",
  keywords: [
    "veteran-owned construction",
    "veteran-owned contractor Tri-Cities",
    "combat veteran discount",
    "military construction services",
    "veteran hiring priority",
    "Army Navy veteran owned",
    "all-branch veterans",
    "veteran support programs",
    "Tri-Cities veteran contractor",
    "military precision construction",
    "service-earned values",
    "veteran partnerships",
    "veteran discount screening",
    "veteran apprenticeship programs",
    "veteran-owned subcontractors",
    "Pacific Northwest veteran contractor",
    "Group 1 Veteran Foundation",
    "Jeremy Ramsey Army veteran",
    "Matt Hunzeker Navy veteran",
  ],
  openGraph: {
    title:
      "Veteran-Owned Construction | Combat Veteran Discount | Year-Round Programs",
    description:
      "Army & Navy veteran leadership since January 2025. Combat Veteran Discount, 100% hiring priority, active apprenticeships, strategic partnerships. Service-earned values: Honesty, Integrity, Professionalism, Thoroughness.",
    type: "website",
    images: [
      {
        url: "/images/logo/mh-veteran-bg.webp",
        width: 1200,
        height: 630,
        alt: "MH Construction - Veteran-Owned Excellence Since January 2025",
      },
    ],
  },
  alternates: {
    canonical: "https://www.mhc-gc.com/veterans",
  },
};

/**
 * Veterans Initiative Page
 * Showcasing MH Construction's veteran-owned status and community support programs
 */
export default function VeteransPage() {
  // Show under construction notice while preserving all content below
  if (SHOW_UNDER_CONSTRUCTION) {
    return (
      <UnderConstruction
        pageName="Veterans Services"
        description="We're honoring our commitment to veterans by perfecting every detail about our specialized services and benefits for those who served."
        estimatedCompletion="December 2025"
      />
    );
  }

  // Original page content preserved below - will be shown when flag is set to false
  return (
    <div className="relative min-h-screen">
      <StructuredData
        data={generateBreadcrumbSchema(breadcrumbPatterns.veterans)}
      />

      {/* Hero Section - No parallax (will be video later) */}
      <div className="relative z-10">
        <section className="relative h-screen flex items-end justify-end text-white overflow-hidden">
          {/* Background - Ready for photo or video */}
          <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-brand-primary to-gray-900">
            {/* Add background image or video here in future */}
            {/* Overlay for text readability */}
            <div className="absolute inset-0 bg-gradient-to-br from-brand-primary/30 via-gray-900/60 to-gray-900/80"></div>
          </div>

          {/* Header Text - Bottom Right */}
          <div className="relative z-30 mb-32 sm:mb-36 md:mb-40 lg:mb-44 mr-4 sm:mr-6 lg:mr-8 xl:mr-12 ml-auto max-w-2xl pointer-events-none pb-2">
            {/* Mission Icon */}
            <div className="flex justify-end mb-4">
              <div className="relative p-4 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm rounded-2xl border-2 border-white/30 shadow-2xl">
                <AmericanFlag size="4xl" animated={true} />
              </div>
            </div>
            <h1 className="text-right text-base xs:text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-bold text-white drop-shadow-2xl leading-relaxed">
              {/* DUAL NAMING - Military → Civilian (Required) */}
              <span className="block text-brand-secondary/80 text-sm sm:text-base md:text-lg lg:text-xl font-normal mb-2">
                Service First → Veterans
              </span>
              {/* PAGE-SPECIFIC MANTRA */}
              <span className="block text-brand-secondary text-xl sm:text-2xl md:text-3xl lg:text-4xl mb-4">
                Supporting Those Who Served - One Community, One Mission
              </span>
              {/* TAGLINE */}
              <span className="block text-brand-secondary">
                Honoring Those Who Served
              </span>
              <span className="block text-white/95">
                All Branches, All Values
              </span>
              <span className="block text-brand-primary">
                Combat Veteran Discount at the Ready
              </span>
              <span className="block text-white/90">
                Building Projects for the Client,{" "}
                <span className="font-black italic text-bronze-300">NOT</span>{" "}
                the Dollar
              </span>
            </h1>
          </div>

          {/* Page-Specific Navigation Bar */}
          <PageNavigation
            items={navigationConfigs.veterans}
            className="absolute bottom-0 left-0 right-0"
          />
        </section>
      </div>

      {/* All sections below Hero - WITH parallax background */}
      <div className="relative min-h-screen">
        {/* Parallax Background - Fixed for all sections except Hero */}
        <div
          className="fixed inset-0 bg-cover bg-center bg-no-repeat opacity-30 dark:opacity-25 pointer-events-none"
          style={{
            backgroundImage: "url('/images/logo/mh-veteran-bg.webp')",
            backgroundAttachment: "fixed",
          }}
        ></div>

        {/* Content with parallax background */}
        <div className="relative z-10">
          {/* Breadcrumb Navigation */}
          <Breadcrumb
            items={[
              { label: "Home", href: "/" },
              { label: "Service First → Veterans" },
            ]}
          />

          {/* Veteran Foundation - Our Leadership & Values */}
          <section
            id="veteran-leadership"
            className="relative py-20 lg:py-32 xl:py-40"
          >
            <div className="relative z-10 mx-auto px-4 container">
              {/* Section Header */}
              <div className="mb-16 sm:mb-20 text-center">
                {/* Icon with decorative lines */}
                <div className="flex items-center justify-center mb-8 gap-4">
                  <div className="h-1 w-16 bg-gradient-to-r from-transparent to-gray-300 dark:to-gray-600 rounded-full"></div>
                  <div className="relative">
                    <div className="absolute -inset-4 bg-gradient-to-br from-brand-primary/30 to-brand-primary-dark/30 blur-2xl rounded-full"></div>
                    <div className="relative bg-gradient-to-br from-brand-primary via-brand-primary-dark to-brand-primary-darker p-5 rounded-2xl shadow-2xl border-2 border-white/50 dark:border-gray-600">
                      <MaterialIcon
                        icon="verified"
                        size="2xl"
                        className="text-white drop-shadow-lg"
                      />
                    </div>
                  </div>
                  <div className="h-1 w-16 bg-gradient-to-l from-transparent to-gray-300 dark:to-gray-600 rounded-full"></div>
                </div>

                {/* Two-line gradient heading */}
                <h2 className="mb-6 sm:mb-8 font-black text-gray-900 dark:text-white text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-relaxed tracking-tighter overflow-visible">
                  <span className="block mb-3 sm:mb-4 font-semibold text-gray-700 dark:text-gray-200 text-xl xs:text-2xl sm:text-3xl md:text-4xl lg:text-5xl tracking-tight overflow-visible py-1">
                    Our Foundation
                  </span>
                  <span className="block bg-gradient-to-r from-brand-primary via-brand-secondary to-brand-primary bg-clip-text text-transparent font-black drop-shadow-sm overflow-visible py-2 pb-3 leading-normal">
                    Veteran-Owned Values & Proven Performance
                  </span>
                </h2>

                {/* Description with colored keyword highlighting */}
                <p className="mx-auto max-w-5xl font-light text-gray-700 dark:text-gray-300 text-base sm:text-lg md:text-xl lg:text-2xl leading-relaxed tracking-wide px-2">
                  Where{" "}
                  <span className="font-bold text-brand-primary dark:text-brand-primary-light">
                    military discipline meets construction excellence
                  </span>
                  —service-earned values of honesty, integrity, and
                  mission-focused commitment guide{" "}
                  <span className="font-bold text-gray-900 dark:text-white">
                    every project and partnership
                  </span>{" "}
                  we build.
                </p>
              </div>

              {/* Veteran Foundation Values Grid */}
              <StaggeredFadeIn className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-16">
                {[
                  {
                    icon: "military_tech",
                    title: "Veteran-Owned Leadership",
                    subtitle: "Service-Earned Excellence",
                    description:
                      "Army veteran owner Jeremy Thamert brings 15+ years military aviation experience and operational discipline. Navy veteran Matt Ramsey applies military precision to digital operations. Combined veteran leadership ensures every project receives mission-focused execution.",
                    iconBgGradient: "from-brand-primary to-brand-primary-dark",
                    accentColor: "brand-primary",
                    highlights: [
                      "Army + Navy veteran team",
                      "Military operational discipline",
                      "Mission-focused execution",
                    ],
                    stat: "2",
                    statLabel: "Veteran Leaders",
                  },
                  {
                    icon: "health_and_safety",
                    title: ".64 EMR - Combat-Ready Safety",
                    subtitle: "Every Team Member Returns Home",
                    description:
                      "Military-grade safety protocols with .64 EMR—40% better than industry average. 3+ years without time-loss injury. OSHA VPP Star designation. No one left behind isn't just military—it's construction standard.",
                    iconBgGradient: "from-bronze-600 to-bronze-700",
                    accentColor: "bronze-500",
                    highlights: [
                      ".64 EMR (40% better)",
                      "3+ years zero time-loss",
                      "OSHA VPP Star certified",
                    ],
                    stat: ".64",
                    statLabel: "EMR Safety Rating",
                  },
                  {
                    icon: "workspace_premium",
                    title: "150+ Years Combined Experience",
                    subtitle: "Veteran + Civilian Excellence",
                    description:
                      "Veterans and civilians working together with 150+ years combined construction expertise. Military discipline merged with generational craftsmanship—proven methods refined through service and experience.",
                    iconBgGradient: "from-brand-secondary to-bronze-700",
                    accentColor: "brand-secondary",
                    highlights: [
                      "150+ years expertise",
                      "Veteran-civilian collaboration",
                      "Proven construction methods",
                    ],
                    stat: "150+",
                    statLabel: "Years Experience",
                  },
                  {
                    icon: "fact_check",
                    title: "100% Transparency",
                    subtitle: "Zero Surprises, Complete Trust",
                    description:
                      "Open-book pricing with military-grade transparency. Complete visibility on every cost, timeline, and decision. Your word is your bond—so is ours. Honest assessments, real-time updates, zero hidden costs.",
                    iconBgGradient: "from-brand-primary to-brand-primary-dark",
                    accentColor: "brand-primary",
                    highlights: [
                      "Open-book pricing",
                      "Real-time updates",
                      "Honest communication",
                    ],
                    stat: "100%",
                    statLabel: "Transparency",
                  },
                  {
                    icon: "verified",
                    title: "650+ Successful Missions",
                    subtitle: "Proven Operational Excellence",
                    description:
                      "650+ successfully completed projects since 2010. Veteran leadership brings mission planning, execution under pressure, and consistent results. Whether routine or urgent—we deliver no matter the challenges.",
                    iconBgGradient: "from-bronze-600 to-bronze-800",
                    accentColor: "bronze-500",
                    highlights: [
                      "650+ completed projects",
                      "Mission-focused planning",
                      "Consistent execution",
                    ],
                    stat: "650+",
                    statLabel: "Projects Completed",
                  },
                  {
                    icon: "handshake",
                    title: "70% Referral & Repeat Business",
                    subtitle: "Relationships That Outlast Projects",
                    description:
                      "70% of business from referrals and repeat partners—trust earned through action. Our commitment doesn't end when the project completes. Long-term partnerships built on service-earned values and proven integrity.",
                    iconBgGradient:
                      "from-brand-secondary to-brand-secondary-dark",
                    accentColor: "brand-secondary",
                    highlights: [
                      "70% referral business",
                      "Long-term partnerships",
                      "Earned trust & loyalty",
                    ],
                    stat: "70%",
                    statLabel: "Referral Rate",
                  },
                ].map((value) => (
                  <div
                    key={value.title}
                    className="group relative flex h-full min-h-[420px]"
                  >
                    {/* Colored Border Glow */}
                    <div
                      className={`absolute -inset-2 bg-gradient-to-br ${value.iconBgGradient} rounded-2xl opacity-20 group-hover:opacity-100 blur-xl transition-all duration-500 group-hover:animate-pulse`}
                    ></div>

                    <div className="relative bg-white dark:bg-gray-800 rounded-xl border-2 border-gray-200 dark:border-gray-700 group-hover:border-transparent shadow-lg group-hover:shadow-2xl transition-all duration-300 overflow-hidden flex flex-col w-full">
                      {/* Top Accent Bar */}
                      <div
                        className={`h-2 bg-gradient-to-r ${value.iconBgGradient}`}
                      ></div>

                      <div className="p-6 sm:p-8 flex flex-col flex-1">
                        {/* Icon and Stat Section */}
                        <div className="flex items-start justify-between mb-5">
                          <div className="relative">
                            <div
                              className={`absolute -inset-2 bg-gradient-to-br ${value.iconBgGradient} opacity-30 blur-lg rounded-2xl`}
                            ></div>
                            <div
                              className={`relative inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br ${value.iconBgGradient} rounded-2xl shadow-2xl border-2 border-white/50 dark:border-gray-700/50 group-hover:scale-110 transition-all duration-300`}
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
                              className={`text-3xl sm:text-4xl font-black group-hover:scale-105 transition-transform duration-300 ${
                                value.accentColor === "bronze-500"
                                  ? "text-bronze-700 dark:text-bronze-400"
                                  : value.accentColor === "brand-secondary"
                                    ? "text-brand-secondary-dark dark:text-brand-secondary-light"
                                    : "text-brand-primary-dark dark:text-brand-primary-light"
                              }`}
                            >
                              {value.stat}
                            </div>
                            <div className="text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider">
                              {value.statLabel}
                            </div>
                          </div>
                        </div>

                        {/* Title and Subtitle */}
                        <h3 className="mb-2 font-black text-gray-900 dark:text-white text-xl sm:text-2xl leading-tight">
                          {value.title}
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
                          {value.subtitle}
                        </p>

                        {/* Description */}
                        <p className="mb-6 text-gray-700 dark:text-gray-200 text-sm sm:text-base leading-relaxed flex-1">
                          {value.description}
                        </p>

                        {/* Key Highlights */}
                        <div className="space-y-2 pt-4 border-t border-gray-200 dark:border-gray-700 mt-auto">
                          {value.highlights.map((highlight, idx) => (
                            <div key={idx} className="flex items-start gap-3">
                              <div
                                className={`mt-0.5 flex-shrink-0 w-5 h-5 rounded-full bg-gradient-to-br ${value.iconBgGradient} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}
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
                    </div>
                  </div>
                ))}
              </StaggeredFadeIn>

              {/* Veteran Team Members - Side by Side */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-16">
                {/* Jeremy - Army Veteran */}
                <FadeInWhenVisible delay={0.1}>
                  <div className="group relative flex h-full">
                    <div className="absolute -inset-2 bg-gradient-to-br from-brand-primary/40 to-brand-primary-dark/40 rounded-2xl opacity-20 group-hover:opacity-100 blur-xl transition-all duration-500 group-hover:animate-pulse"></div>

                    <div className="relative bg-white dark:bg-gray-800 rounded-xl border-2 border-gray-200 dark:border-gray-700 group-hover:border-transparent shadow-lg group-hover:shadow-2xl transition-all duration-300 overflow-hidden flex flex-col w-full">
                      <div className="h-2 bg-gradient-to-r from-brand-primary via-brand-primary-dark to-brand-primary-darker"></div>
                      <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-brand-primary via-brand-primary-dark to-brand-primary-darker"></div>

                      <div className="p-8 sm:p-10 text-center">
                        <div className="relative inline-block mb-6 mx-auto">
                          <div className="absolute -inset-4 bg-gradient-to-br from-brand-primary/40 to-brand-primary-dark/40 opacity-30 blur-2xl rounded-full"></div>
                          <div className="relative">
                            <MaterialIcon
                              icon="military_tech"
                              size="5xl"
                              theme="veteran"
                              ariaLabel="Army Veteran Leadership"
                              className="text-brand-primary drop-shadow-lg group-hover:scale-110 transition-all duration-300"
                            />
                          </div>
                        </div>
                        <h3 className="text-gray-900 dark:text-white text-2xl sm:text-3xl font-bold mb-2">
                          Jeremy Thamert
                        </h3>
                        <p className="text-brand-primary font-semibold text-lg mb-6">
                          Owner & President | Army Veteran
                        </p>
                        <p className="text-gray-700 dark:text-gray-300 text-base sm:text-lg leading-relaxed">
                          15+ years Army aviation experience brings operational
                          discipline and mission-focused leadership. Your word
                          is your bond—service-earned integrity guides every
                          partnership we build.
                        </p>
                      </div>
                    </div>
                  </div>
                </FadeInWhenVisible>

                {/* Matt - Navy Veteran */}
                <FadeInWhenVisible delay={0.2}>
                  <div className="group relative flex h-full">
                    <div className="absolute -inset-2 bg-gradient-to-br from-brand-secondary/40 via-bronze-600/40 to-bronze-700/40 rounded-2xl opacity-20 group-hover:opacity-100 blur-xl transition-all duration-500 group-hover:animate-pulse"></div>

                    <div className="relative bg-white dark:bg-gray-800 rounded-xl border-2 border-gray-200 dark:border-gray-700 group-hover:border-transparent shadow-lg group-hover:shadow-2xl transition-all duration-300 overflow-hidden flex flex-col w-full">
                      <div className="h-2 bg-gradient-to-r from-brand-secondary via-bronze-700 to-bronze-800"></div>
                      <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-brand-secondary via-bronze-700 to-bronze-800"></div>

                      <div className="p-8 sm:p-10 text-center">
                        <div className="relative inline-block mb-6 mx-auto">
                          <div className="absolute -inset-4 bg-gradient-to-br from-brand-secondary/40 via-bronze-600/40 to-bronze-700/40 opacity-30 blur-2xl rounded-full"></div>
                          <div className="relative">
                            <MaterialIcon
                              icon="anchor"
                              size="5xl"
                              theme="veteran"
                              ariaLabel="Navy Veteran"
                              className="text-brand-secondary drop-shadow-lg group-hover:scale-110 transition-all duration-300"
                            />
                          </div>
                        </div>
                        <h3 className="text-gray-900 dark:text-white text-2xl sm:text-3xl font-bold mb-2">
                          Matt Ramsey
                        </h3>
                        <p className="text-brand-secondary font-semibold text-lg mb-6">
                          Digital Marketing Manager | Navy Veteran
                        </p>
                        <p className="text-gray-700 dark:text-gray-300 text-base sm:text-lg leading-relaxed">
                          Navy veteran bringing military discipline to digital
                          excellence. Trust earned through consistent action and
                          genuine commitment—principles guiding our veteran
                          outreach initiatives.
                        </p>
                      </div>
                    </div>
                  </div>
                </FadeInWhenVisible>
              </div>
            </div>
          </section>

          {/* Combat Veteran Discount Section */}
          <section
            id="combat-veteran-discount"
            className="relative py-20 lg:py-32 xl:py-40"
          >
            <div className="relative z-10 mx-auto px-4 container">
              <FadeInWhenVisible>
                {/* Section Header - Military Construction Standard */}
                <div className="mb-16 sm:mb-20 text-center">
                  {/* Icon with decorative lines */}
                  <div className="flex items-center justify-center mb-8 gap-4">
                    <div className="h-1 w-16 bg-gradient-to-r from-transparent to-gray-300 dark:to-gray-600 rounded-full"></div>
                    <div className="relative">
                      <div className="absolute -inset-4 bg-gradient-to-br from-brand-secondary/30 to-bronze-700/30 blur-2xl rounded-full"></div>
                      <div className="relative bg-gradient-to-br from-brand-secondary via-bronze-700 to-bronze-800 p-5 rounded-2xl shadow-2xl border-2 border-white/50 dark:border-gray-600">
                        <MaterialIcon
                          icon="military_tech"
                          size="2xl"
                          className="text-white drop-shadow-lg"
                        />
                      </div>
                    </div>
                    <div className="h-1 w-16 bg-gradient-to-l from-transparent to-gray-300 dark:to-gray-600 rounded-full"></div>
                  </div>

                  {/* Two-line gradient heading */}
                  <h2 className="mb-6 sm:mb-8 font-black text-gray-900 dark:text-white text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-relaxed tracking-tighter overflow-visible">
                    <span className="block mb-3 sm:mb-4 font-semibold text-gray-700 dark:text-gray-200 text-xl xs:text-2xl sm:text-3xl md:text-4xl lg:text-5xl tracking-tight overflow-visible py-1">
                      Service Recognizes Service
                    </span>
                    <span className="block bg-gradient-to-r from-brand-primary via-brand-secondary to-brand-primary bg-clip-text text-transparent font-black drop-shadow-sm overflow-visible py-2 pb-3 leading-normal">
                      Combat Veteran Discount at the Ready
                    </span>
                  </h2>

                  {/* Description with colored keyword highlighting */}
                  <p className="mx-auto max-w-5xl font-light text-gray-700 dark:text-gray-300 text-base sm:text-lg md:text-xl lg:text-2xl leading-relaxed tracking-wide px-2">
                    <span className="font-bold text-brand-primary dark:text-brand-primary-light">
                      All branches, all ranks, all eras
                    </span>
                    —Army, Navy, Air Force, Marines, Coast Guard, and Space
                    Force. If you served in combat, we honor that service with{" "}
                    <span className="font-bold text-gray-900 dark:text-white">
                      preferential pricing on all construction services
                    </span>
                    . Each discount is determined through our screening process
                    based on your project scope, service record, and specific
                    needs. No fine print. No gimmicks. Your service matters.
                  </p>
                </div>

                <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto mb-16">
                  {/* All Branches */}
                  <div className="group relative flex h-full">
                    <div className="absolute -inset-2 bg-gradient-to-br from-brand-primary/40 to-brand-secondary/40 rounded-2xl opacity-20 group-hover:opacity-100 blur-xl transition-all duration-500 group-hover:animate-pulse"></div>
                    <div className="relative bg-white dark:bg-gray-800 rounded-xl border-2 border-gray-200 dark:border-gray-700 group-hover:border-transparent shadow-lg group-hover:shadow-2xl transition-all duration-300 overflow-hidden flex flex-col w-full">
                      <div className="h-2 bg-gradient-to-r from-brand-primary via-brand-secondary to-brand-primary"></div>
                      <div className="p-6 sm:p-8 text-center flex flex-col flex-1">
                        <div className="relative inline-block mb-4 mx-auto">
                          <div className="absolute -inset-2 bg-gradient-to-br from-brand-primary/40 to-brand-secondary/40 opacity-30 blur-lg rounded-full"></div>
                          <div className="relative">
                            <MaterialIcon
                              icon="shield"
                              size="4xl"
                              theme="military"
                              ariaLabel="All Military Branches"
                              className="text-brand-primary drop-shadow-lg group-hover:scale-110 transition-all duration-300"
                            />
                          </div>
                        </div>
                        <h3 className="text-gray-900 dark:text-white text-xl sm:text-2xl font-bold mb-4">
                          All Branches Welcome
                        </h3>
                        <p className="text-gray-700 dark:text-gray-300 text-base sm:text-lg leading-relaxed flex-grow">
                          Army, Navy, Air Force, Marines, Coast Guard, Space
                          Force—we honor every branch that defended our nation
                          in combat zones. All combat veterans qualify for
                          consideration.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Case-by-Case Evaluation */}
                  <div className="group relative flex h-full">
                    <div className="absolute -inset-2 bg-gradient-to-br from-brand-secondary/40 via-bronze-600/40 to-bronze-700/40 rounded-2xl opacity-20 group-hover:opacity-100 blur-xl transition-all duration-500 group-hover:animate-pulse"></div>
                    <div className="relative bg-white dark:bg-gray-800 rounded-xl border-2 border-gray-200 dark:border-gray-700 group-hover:border-transparent shadow-lg group-hover:shadow-2xl transition-all duration-300 overflow-hidden flex flex-col w-full">
                      <div className="h-2 bg-gradient-to-r from-brand-secondary via-bronze-700 to-bronze-800"></div>
                      <div className="p-6 sm:p-8 text-center flex flex-col flex-1">
                        <div className="relative inline-block mb-4 mx-auto">
                          <div className="absolute -inset-2 bg-gradient-to-br from-brand-secondary/40 via-bronze-600/40 to-bronze-700/40 opacity-30 blur-lg rounded-full"></div>
                          <div className="relative">
                            <MaterialIcon
                              icon="balance"
                              size="4xl"
                              theme="veteran"
                              ariaLabel="Case-by-Case Evaluation"
                              className="text-brand-secondary drop-shadow-lg group-hover:scale-110 transition-all duration-300"
                            />
                          </div>
                        </div>
                        <h3 className="text-gray-900 dark:text-white text-xl sm:text-2xl font-bold mb-4">
                          Tailored to Your Service
                        </h3>
                        <p className="text-gray-700 dark:text-gray-300 text-base sm:text-lg leading-relaxed flex-grow">
                          Every veteran's situation is unique. Discount amounts
                          are determined case-by-case through our screening
                          process, considering project scope, service record,
                          and individual circumstances.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Screening Process Timeline Section */}
                <div className="relative max-w-6xl mx-auto mt-16">
                  {/* Vertical Connecting Line - Desktop */}
                  <div className="hidden lg:block absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-brand-primary/30 via-brand-secondary to-brand-primary/30"></div>

                  {/* Timeline Header */}
                  <div className="mb-12 text-center">
                    <h3 className="text-gray-900 dark:text-white text-2xl sm:text-3xl font-bold mb-4">
                      Combat Veteran Discount Screening Process
                    </h3>
                    <p className="text-gray-700 dark:text-gray-300 text-base sm:text-lg max-w-3xl mx-auto">
                      Our straightforward screening process ensures fair and
                      respectful evaluation of every combat veteran application.
                    </p>
                  </div>

                  {/* Timeline Steps */}
                  <div className="space-y-12 lg:space-y-20">
                    {[
                      {
                        num: 1,
                        icon: "phone",
                        title: "Initial Consultation",
                        desc: "Contact us at (509) 308-6489 or through our contact page. Mention your military service during the initial discussion. We'll schedule a face-to-face or virtual consultation to discuss your project scope and requirements.",
                        position: "left",
                      },
                      {
                        num: 2,
                        icon: "verified_user",
                        title: "Service Verification",
                        desc: "Provide proof of combat service (DD-214, VA card, or military ID showing combat deployment). We handle all documentation with military-grade confidentiality and respect. Your privacy is our priority.",
                        position: "right",
                      },
                      {
                        num: 3,
                        icon: "assessment",
                        title: "Project Assessment",
                        desc: "We evaluate your project scope, timeline, and specific construction needs. Factors include project size, complexity, materials required, labor intensity, and your budget constraints.",
                        position: "left",
                      },
                      {
                        num: 4,
                        icon: "balance",
                        title: "Discount Determination",
                        desc: "Based on your service record and project details, we determine an appropriate discount. Considerations include combat service duration, decorations received, current financial situation, and project urgency. Every case is unique.",
                        position: "right",
                      },
                      {
                        num: 5,
                        icon: "description",
                        title: "Transparent Proposal",
                        desc: "Receive a detailed, transparent proposal showing standard pricing, your veteran discount applied, and final project cost. No hidden fees. No surprises. No expiration on your discount—it applies to every project you do with us.",
                        position: "left",
                      },
                    ].map((step, index) => (
                      <FadeInWhenVisible
                        key={step.num}
                        className="relative group"
                        delay={index * 0.1}
                      >
                        {/* Desktop Layout */}
                        <div className="hidden lg:flex items-center gap-8">
                          {step.position === "left" ? (
                            <>
                              {/* Content Left */}
                              <div className="flex-1 text-right">
                                <div className="inline-block bg-white dark:bg-gray-800 rounded-2xl border-2 border-gray-200 dark:border-gray-700 p-8 shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-[1.02] group-hover:border-brand-primary dark:group-hover:border-brand-primary-light">
                                  <div className="flex items-center justify-end gap-4 mb-4">
                                    <div>
                                      <h4 className="font-black text-gray-900 dark:text-white text-xl mb-1">
                                        {step.title}
                                      </h4>
                                    </div>
                                    <div className="flex-shrink-0 w-14 h-14 bg-gradient-to-br from-brand-primary to-brand-primary-dark rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:rotate-6 transition-transform duration-300">
                                      <MaterialIcon
                                        icon={step.icon}
                                        size="lg"
                                        className="text-white"
                                      />
                                    </div>
                                  </div>
                                  <p className="text-gray-600 dark:text-gray-400 text-base leading-relaxed">
                                    {step.desc}
                                  </p>
                                </div>
                              </div>

                              {/* Center Circle */}
                              <div className="flex-shrink-0 relative z-10">
                                <div className="w-16 h-16 bg-gradient-to-br from-brand-primary to-brand-primary-dark rounded-full flex items-center justify-center text-white font-black text-xl shadow-2xl border-4 border-white dark:border-gray-900 group-hover:scale-110 transition-transform duration-300">
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
                              <div className="flex-shrink-0 relative z-10">
                                <div className="w-16 h-16 bg-gradient-to-br from-brand-secondary to-bronze-700 rounded-full flex items-center justify-center text-white font-black text-xl shadow-2xl border-4 border-white dark:border-gray-900 group-hover:scale-110 transition-transform duration-300">
                                  {step.num}
                                </div>
                              </div>

                              {/* Content Right */}
                              <div className="flex-1 text-left">
                                <div className="inline-block bg-white dark:bg-gray-800 rounded-2xl border-2 border-gray-200 dark:border-gray-700 p-8 shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-[1.02] group-hover:border-brand-secondary dark:group-hover:border-brand-secondary-light">
                                  <div className="flex items-center gap-4 mb-4">
                                    <div className="flex-shrink-0 w-14 h-14 bg-gradient-to-br from-brand-secondary to-bronze-700 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:-rotate-6 transition-transform duration-300">
                                      <MaterialIcon
                                        icon={step.icon}
                                        size="lg"
                                        className="text-white"
                                      />
                                    </div>
                                    <div>
                                      <h4 className="font-black text-gray-900 dark:text-white text-xl mb-1">
                                        {step.title}
                                      </h4>
                                    </div>
                                  </div>
                                  <p className="text-gray-600 dark:text-gray-400 text-base leading-relaxed">
                                    {step.desc}
                                  </p>
                                </div>
                              </div>
                            </>
                          )}
                        </div>

                        {/* Mobile Layout */}
                        <div className="lg:hidden flex gap-4">
                          {/* Left Side - Number and Line */}
                          <div className="flex flex-col items-center flex-shrink-0">
                            <div
                              className={`w-14 h-14 ${
                                step.num % 2 === 0
                                  ? "bg-gradient-to-br from-brand-secondary to-bronze-700"
                                  : "bg-gradient-to-br from-brand-primary to-brand-primary-dark"
                              } rounded-full flex items-center justify-center text-white font-black text-lg shadow-xl border-4 border-white dark:border-gray-900 relative z-10`}
                            >
                              {step.num}
                            </div>
                            {index < 4 && (
                              <div className="w-1 flex-1 bg-gradient-to-b from-brand-primary to-brand-secondary mt-2 min-h-[60px]"></div>
                            )}
                          </div>

                          {/* Right Side - Card */}
                          <div className="flex-1 pb-8">
                            <div className="bg-white dark:bg-gray-800 rounded-2xl border-2 border-gray-200 dark:border-gray-700 p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:border-brand-primary dark:hover:border-brand-primary-light">
                              <div className="flex items-center gap-3 mb-4">
                                <div
                                  className={`flex-shrink-0 w-12 h-12 ${
                                    step.num % 2 === 0
                                      ? "bg-gradient-to-br from-brand-secondary to-bronze-700"
                                      : "bg-gradient-to-br from-brand-primary to-brand-primary-dark"
                                  } rounded-xl flex items-center justify-center shadow-lg`}
                                >
                                  <MaterialIcon
                                    icon={step.icon}
                                    size="md"
                                    className="text-white"
                                  />
                                </div>
                                <h4 className="font-black text-gray-900 dark:text-white text-lg">
                                  {step.title}
                                </h4>
                              </div>
                              <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                                {step.desc}
                              </p>
                            </div>
                          </div>
                        </div>
                      </FadeInWhenVisible>
                    ))}
                  </div>

                  {/* Commitment Card */}
                  <FadeInWhenVisible
                    className="mt-16 max-w-3xl mx-auto"
                    delay={0.5}
                  >
                    <div className="bg-brand-primary/10 dark:bg-brand-primary/20 rounded-2xl p-8 border-2 border-brand-primary/30">
                      <div className="flex items-start gap-4">
                        <MaterialIcon
                          icon="verified_user"
                          size="2xl"
                          className="text-brand-primary flex-shrink-0"
                        />
                        <div>
                          <h4 className="font-bold text-gray-900 dark:text-white text-lg mb-2">
                            Our Commitment
                          </h4>
                          <p className="text-gray-700 dark:text-gray-300">
                            This isn't a marketing gimmick or one-time
                            promotion. As a veteran-owned company, honoring
                            combat service is part of our DNA. Your word is your
                            bond—so is ours. Every combat veteran receives fair
                            consideration, respectful treatment, and meaningful
                            pricing that reflects the sacrifice made for our
                            nation.
                          </p>
                        </div>
                      </div>
                    </div>
                  </FadeInWhenVisible>
                </div>

                {/* CTA */}
                <div className="mt-12 text-center">
                  <Link
                    href="/contact"
                    className="inline-flex items-center gap-2 px-10 py-5 bg-brand-primary hover:bg-brand-primary/90 text-white transition-all duration-300 rounded-lg font-bold text-lg sm:text-xl shadow-lg hover:shadow-xl"
                  >
                    <MaterialIcon
                      icon="phone"
                      size="lg"
                      theme="military"
                      ariaLabel="Contact Now"
                    />
                    <span>Call (509) 308-6489 - Mention Your Service</span>
                  </Link>
                  <p className="mt-4 text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                    Direct line to veteran-owned leadership. No automated
                    systems, no gatekeepers—just honest conversation with
                    someone who understands.
                  </p>
                </div>
              </FadeInWhenVisible>
            </div>
          </section>

          {/* Year-Round Veteran Support - Impact by the Numbers */}
          <section
            id="year-round-support"
            className="relative py-20 lg:py-32 xl:py-40"
          >
            <div className="relative z-10 mx-auto px-4 container">
              {/* Section Header - Military Construction Standard */}
              <div className="mb-16 sm:mb-20 text-center relative z-10">
                {/* Icon with decorative lines */}
                <div className="flex items-center justify-center mb-8 gap-4">
                  <div className="h-1 w-16 bg-gradient-to-r from-transparent to-gray-300 dark:to-gray-600 rounded-full"></div>
                  <div className="relative">
                    <div className="absolute -inset-4 bg-gradient-to-br from-brand-secondary/30 to-bronze-600/30 blur-2xl rounded-full"></div>
                    <div className="relative bg-gradient-to-br from-brand-secondary via-bronze-700 to-bronze-800 p-5 rounded-2xl shadow-2xl border-2 border-white/50 dark:border-gray-600">
                      <MaterialIcon
                        icon="volunteer_activism"
                        size="2xl"
                        className="text-white drop-shadow-lg"
                      />
                    </div>
                  </div>
                  <div className="h-1 w-16 bg-gradient-to-l from-transparent to-gray-300 dark:to-gray-600 rounded-full"></div>
                </div>

                {/* Two-line gradient heading */}
                <h2 className="mb-6 sm:mb-8 font-black text-gray-900 dark:text-white text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-relaxed tracking-tighter overflow-visible">
                  <span className="block mb-3 sm:mb-4 font-semibold text-gray-700 dark:text-gray-200 text-xl xs:text-2xl sm:text-3xl md:text-4xl lg:text-5xl tracking-tight overflow-visible py-1">
                    Mission Commitment
                  </span>
                  <span className="block bg-gradient-to-r from-brand-primary via-brand-secondary to-brand-primary bg-clip-text text-transparent font-black drop-shadow-sm overflow-visible py-2 pb-3 leading-normal">
                    Year-Round Veteran Support Programs
                  </span>
                </h2>

                {/* Description with colored keyword highlighting */}
                <p className="mx-auto max-w-5xl font-light text-gray-700 dark:text-gray-300 text-base sm:text-lg md:text-xl lg:text-2xl leading-relaxed tracking-wide px-2">
                  As a{" "}
                  <span className="font-bold text-brand-primary dark:text-brand-primary-light">
                    veteran-owned company since January 2025
                  </span>
                  , we're deploying long-term operational programs to support
                  veterans.{" "}
                  <span className="font-bold text-gray-900 dark:text-white">
                    Service over self
                  </span>
                  —building relationships that outlast projects.
                </p>
              </div>

              {/* Stats Grid */}
              <div className="gap-6 sm:gap-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 mx-auto max-w-6xl mb-16 relative z-10">
                {[
                  {
                    icon: "badge",
                    value: "100%",
                    label: "Veteran Hiring Priority",
                    description:
                      "All qualified veterans receive priority consideration",
                  },
                  {
                    icon: "military_tech",
                    value: "2",
                    label: "Veteran Leaders",
                    description: "Army & Navy veterans in leadership positions",
                  },
                  {
                    icon: "school",
                    value: "Active",
                    label: "Apprenticeship Programs",
                    description:
                      "Training programs for transitioning service members",
                  },
                  {
                    icon: "handshake",
                    value: "Growing",
                    label: "Veteran Network",
                    description:
                      "Partnerships with veteran-owned subcontractors",
                  },
                ].map((stat, index) => (
                  <FadeInWhenVisible key={index} delay={index * 0.1}>
                    <div className="h-full flex flex-col text-center p-6 sm:p-8 bg-white dark:bg-gray-800 rounded-3xl border-2 border-gray-200 dark:border-gray-700 hover:shadow-2xl dark:hover:shadow-brand-primary/20 transition-all duration-300 group shadow-lg hover:-translate-y-2">
                      <div className="relative inline-block mb-4 mx-auto">
                        <div className="absolute -inset-2 bg-gradient-to-br from-brand-primary/30 to-brand-secondary/30 opacity-20 blur-lg rounded-full group-hover:opacity-40 transition-opacity"></div>
                        <div className="relative">
                          <MaterialIcon
                            icon={stat.icon}
                            className="text-brand-primary group-hover:scale-110 transition-transform"
                            size="2xl"
                            theme="veteran"
                          />
                        </div>
                      </div>
                      <div className="mb-3 font-black text-4xl sm:text-5xl text-brand-primary dark:text-brand-primary-light drop-shadow-sm">
                        {stat.value}
                      </div>
                      <div className="text-gray-900 dark:text-white font-bold text-base sm:text-lg mb-3">
                        {stat.label}
                      </div>
                      <div className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed mt-auto">
                        {stat.description}
                      </div>
                    </div>
                  </FadeInWhenVisible>
                ))}
              </div>

              {/* Program Cards */}
              <StaggeredFadeIn
                className={`${gridPresets.cards3("md")} relative z-10`}
              >
                <div className="group relative flex h-full">
                  {/* Animated Border Glow */}
                  <div className="absolute -inset-2 bg-gradient-to-br from-brand-primary/40 to-brand-primary-dark/40 rounded-2xl opacity-20 group-hover:opacity-100 blur-xl transition-all duration-500 group-hover:animate-pulse"></div>

                  <div className="relative bg-white dark:bg-gray-800 rounded-xl border-2 border-gray-200 dark:border-gray-700 group-hover:border-transparent shadow-lg group-hover:shadow-2xl transition-all duration-300 group-hover:-translate-y-1 overflow-hidden flex flex-col w-full">
                    {/* Top Accent Bar */}
                    <div className="h-2 bg-gradient-to-r from-brand-primary via-brand-primary-dark to-brand-primary-darker"></div>

                    <div className="p-6 sm:p-8 flex flex-col flex-1">
                      <div className="relative inline-block mb-4 mx-auto">
                        <div className="absolute -inset-2 bg-gradient-to-br from-brand-primary/40 to-brand-primary-dark/40 opacity-30 blur-lg rounded-full"></div>
                        <div className="relative">
                          <MaterialIcon
                            icon="badge"
                            size="4xl"
                            theme="military"
                            ariaLabel="Veteran Hiring Priority"
                            className="text-brand-primary drop-shadow-lg group-hover:scale-110 transition-all duration-300"
                          />
                        </div>
                      </div>
                      <h3 className="text-gray-900 dark:text-white text-xl sm:text-2xl font-bold mb-4 text-center">
                        Veteran Hiring Priority
                      </h3>
                      <p className="text-gray-700 dark:text-gray-300 text-base sm:text-lg mb-4 text-center leading-relaxed flex-grow">
                        Qualified veterans from all branches receive priority
                        consideration for all positions. We're deploying
                        tactical apprenticeship programs for transitioning
                        service members as we build our veteran support
                        operational network. Your military experience translates
                        to construction excellence.
                      </p>
                      <div className="text-center">
                        <Link
                          href="/careers"
                          className="inline-flex items-center text-brand-primary hover:text-brand-secondary transition-colors font-semibold"
                        >
                          <span>View Career Opportunities</span>
                          <MaterialIcon
                            icon="arrow_forward"
                            size="sm"
                            className="ml-1"
                          />
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="group relative flex h-full">
                  {/* Animated Border Glow */}
                  <div className="absolute -inset-2 bg-gradient-to-br from-brand-secondary/40 via-bronze-600/40 to-bronze-700/40 rounded-2xl opacity-20 group-hover:opacity-100 blur-xl transition-all duration-500 group-hover:animate-pulse"></div>

                  <div className="relative bg-white dark:bg-gray-800 rounded-xl border-2 border-gray-200 dark:border-gray-700 group-hover:border-transparent shadow-lg group-hover:shadow-2xl transition-all duration-300 group-hover:-translate-y-1 overflow-hidden flex flex-col w-full">
                    {/* Top Accent Bar */}
                    <div className="h-2 bg-gradient-to-r from-brand-secondary via-bronze-700 to-bronze-800"></div>

                    <div className="p-6 sm:p-8 flex flex-col flex-1">
                      <div className="relative inline-block mb-4 mx-auto">
                        <div className="absolute -inset-2 bg-gradient-to-br from-brand-secondary/40 via-bronze-600/40 to-bronze-700/40 opacity-30 blur-lg rounded-full"></div>
                        <div className="relative">
                          <MaterialIcon
                            icon="handshake"
                            size="4xl"
                            theme="veteran"
                            ariaLabel="Veteran Allies Network"
                            className="text-brand-secondary drop-shadow-lg group-hover:scale-110 transition-all duration-300"
                          />
                        </div>
                      </div>
                      <h3 className="text-gray-900 dark:text-white text-xl sm:text-2xl font-bold mb-4 text-center">
                        Veteran Allies
                      </h3>
                      <p className="text-gray-700 dark:text-gray-300 text-base sm:text-lg mb-4 text-center leading-relaxed flex-grow">
                        Recruiting veteran-owned subcontractors for our growing
                        network. As we establish company longevity, we're
                        building partnerships with preferential opportunities
                        for veteran-owned businesses.
                      </p>
                      <div className="text-center">
                        <Link
                          href="/allies"
                          className="inline-flex items-center text-brand-secondary hover:text-brand-primary transition-colors font-semibold"
                        >
                          <span>Become an Ally</span>
                          <MaterialIcon
                            icon="arrow_forward"
                            size="sm"
                            className="ml-1"
                          />
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="group relative flex h-full">
                  {/* Animated Border Glow */}
                  <div className="absolute -inset-2 bg-gradient-to-br from-brand-secondary/40 via-bronze-600/40 to-bronze-700/40 rounded-2xl opacity-20 group-hover:opacity-100 blur-xl transition-all duration-500 group-hover:animate-pulse"></div>

                  <div className="relative bg-white dark:bg-gray-800 rounded-xl border-2 border-gray-200 dark:border-gray-700 group-hover:border-transparent shadow-lg group-hover:shadow-2xl transition-all duration-300 group-hover:-translate-y-1 overflow-hidden flex flex-col w-full">
                    {/* Top Accent Bar */}
                    <div className="h-2 bg-gradient-to-r from-brand-secondary via-bronze-700 to-bronze-800"></div>

                    <div className="p-6 sm:p-8 flex flex-col flex-1">
                      <div className="relative inline-block mb-4 mx-auto">
                        <div className="absolute -inset-2 bg-gradient-to-br from-brand-secondary/40 via-bronze-600/40 to-bronze-700/40 opacity-30 blur-lg rounded-full"></div>
                        <div className="relative">
                          <MaterialIcon
                            icon="military_tech"
                            size="4xl"
                            theme="veteran"
                            ariaLabel="Training & Education Programs"
                            className="text-brand-secondary drop-shadow-lg group-hover:scale-110 transition-all duration-300"
                          />
                        </div>
                      </div>
                      <h3 className="text-gray-900 dark:text-white text-xl sm:text-2xl font-bold mb-4 text-center">
                        Training & Education
                      </h3>
                      <p className="text-gray-700 dark:text-gray-300 text-base sm:text-lg mb-4 text-center leading-relaxed flex-grow">
                        Developing programs for veterans pursuing construction
                        trades, including internship opportunities and GI Bill
                        apprenticeship participation as we grow our veteran
                        support network.
                      </p>
                      <div className="text-center">
                        <Link
                          href="/about"
                          className="inline-flex items-center text-brand-secondary hover:text-brand-primary transition-colors font-semibold"
                        >
                          <span>Learn About Our Values</span>
                          <MaterialIcon
                            icon="arrow_forward"
                            size="sm"
                            className="ml-1"
                          />
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </StaggeredFadeIn>
            </div>
          </section>

          {/* Strategic Veteran Partnerships Section */}
          <section
            id="veteran-partnerships"
            className="relative py-20 lg:py-32 xl:py-40"
          >
            <div className="relative z-10 mx-auto px-4 container">
              {/* Section Header */}
              <div className="mb-16 sm:mb-20 text-center">
                {/* Icon with decorative lines */}
                <div className="flex items-center justify-center mb-8 gap-4">
                  <div className="h-1 w-16 bg-gradient-to-r from-transparent to-gray-300 dark:to-gray-600 rounded-full"></div>
                  <div className="relative">
                    <div className="absolute -inset-4 bg-gradient-to-br from-brand-secondary/30 to-bronze-600/30 blur-2xl rounded-full"></div>
                    <div className="relative bg-gradient-to-br from-brand-secondary via-bronze-700 to-bronze-800 p-5 rounded-2xl shadow-2xl border-2 border-white/50 dark:border-gray-600">
                      <MaterialIcon
                        icon="groups"
                        size="2xl"
                        className="text-white drop-shadow-lg"
                      />
                    </div>
                  </div>
                  <div className="h-1 w-16 bg-gradient-to-l from-transparent to-gray-300 dark:to-gray-600 rounded-full"></div>
                </div>

                {/* Two-line gradient heading */}
                <h2 className="mb-6 sm:mb-8 font-black text-gray-900 dark:text-white text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-relaxed tracking-tighter overflow-visible">
                  <span className="block mb-3 sm:mb-4 font-semibold text-gray-700 dark:text-gray-200 text-xl xs:text-2xl sm:text-3xl md:text-4xl lg:text-5xl tracking-tight overflow-visible py-1">
                    Building Relationships
                  </span>
                  <span className="block bg-gradient-to-r from-brand-primary via-brand-secondary to-brand-primary bg-clip-text text-transparent font-black drop-shadow-sm overflow-visible py-2 pb-3 leading-normal">
                    Strategic Veteran Organization Partnerships
                  </span>
                </h2>

                {/* Description */}
                <p className="mx-auto max-w-5xl font-light text-gray-700 dark:text-gray-300 text-base sm:text-lg md:text-xl lg:text-2xl leading-relaxed tracking-wide px-2">
                  We partner with{" "}
                  <span className="font-bold text-brand-primary dark:text-brand-primary-light">
                    selective veteran organizations
                  </span>{" "}
                  that share our commitment to{" "}
                  <span className="font-bold text-gray-900 dark:text-white">
                    honesty, integrity, and measurable impact
                  </span>
                  . Quality partnerships over transactional relationships.
                </p>
              </div>

              {/* Partnership Criteria Cards - Alternating Layout */}
              <div className="space-y-12 lg:space-y-16">
                {[
                  {
                    title: "Verified Non-Profit Status",
                    tagline: "Transparent Operations",
                    description:
                      "Verified 501(c)(3) status with transparent financials and public accountability. Open books, clear mission statements, and documented impact metrics. Organizations that operate with the same honesty and integrity we expect from ourselves.",
                    icon: "verified",
                    iconBg: "bg-brand-primary",
                    stats: "501(c)(3) Required",
                    position: "left",
                  },
                  {
                    title: "Veteran-Focused Mission",
                    tagline: "Service Members First",
                    description:
                      "Primary mission dedicated to serving veterans, active duty, or military families. Not organizations that treat veterans as an afterthought or marketing angle. Programs specifically designed by veterans, for veterans, with proven understanding of military culture.",
                    icon: "military_tech",
                    iconBg: "bg-brand-secondary",
                    stats: "Mission-Driven Focus",
                    position: "right",
                  },
                  {
                    title: "Regional Presence & Impact",
                    tagline: "Local Boots on Ground",
                    description:
                      "Strong presence in Pacific Northwest with active programs in Washington, Oregon, or Idaho. Local organizations that understand regional veteran populations and Tri-Cities community needs. Measurable local impact over distant national headquarters.",
                    icon: "location_on",
                    iconBg: "bg-primary-700",
                    stats: "PNW-Focused Programs",
                    position: "left",
                  },
                  {
                    title: "Collaborative Approach",
                    tagline: "Partnership Over Transactional",
                    description:
                      "Organizations seeking genuine partnerships, not just donation checks. Collaborative planning, mutual support, and shared commitment to veteran welfare. Open communication, aligned values, and willingness to work together on long-term initiatives.",
                    icon: "handshake",
                    iconBg: "bg-bronze-700",
                    stats: "Long-Term Relationships",
                    position: "right",
                  },
                ].map((item, index) => {
                  const isLeft = item.position === "left";
                  return (
                    <FadeInWhenVisible
                      key={item.title}
                      className="scroll-reveal group"
                      delay={index * 0.1}
                    >
                      <div className="flex flex-col lg:grid lg:grid-cols-2 bg-white dark:bg-gray-800 rounded-3xl shadow-lg hover:shadow-2xl dark:hover:shadow-brand-primary/20 overflow-hidden border border-gray-200 dark:border-gray-700 transition-all duration-300">
                        {/* Image Side */}
                        <div
                          className={`relative h-64 sm:h-80 lg:h-full lg:min-h-[500px] overflow-hidden ${
                            isLeft ? "lg:order-1" : "lg:order-2"
                          }`}
                        >
                          <Image
                            src="/images/logo/mh-veteran-bg.webp"
                            alt={`${item.title} - ${item.tagline}`}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-500"
                            sizes="(max-width: 1024px) 100vw, 50vw"
                          />
                          {/* Overlay gradient for better icon visibility */}
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent lg:bg-gradient-to-r lg:from-black/60 lg:via-black/20 lg:to-transparent"></div>

                          {/* Icon Badge on Image */}
                          <div className="absolute bottom-4 left-4 lg:bottom-6 lg:left-6">
                            <div className="relative inline-block">
                              <div className="absolute inset-0 bg-gradient-to-br from-brand-primary/30 to-brand-secondary/30 blur-xl rounded-2xl"></div>
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
                                {item.title}
                              </h3>
                              <p className="font-semibold text-brand-primary dark:text-brand-primary-light text-base sm:text-lg lg:text-xl">
                                {item.tagline}
                              </p>
                            </div>

                            <p className="font-normal text-gray-700 dark:text-gray-300 text-sm sm:text-base lg:text-base leading-relaxed">
                              {item.description}
                            </p>

                            <div className="flex items-center gap-3 pt-4 border-t border-gray-200 dark:border-gray-700">
                              <div className="flex items-center justify-center w-12 h-12 bg-brand-primary/10 dark:bg-brand-primary/20 rounded-xl flex-shrink-0">
                                <MaterialIcon
                                  icon="analytics"
                                  size="md"
                                  className="text-brand-primary dark:text-brand-primary-light"
                                />
                              </div>
                              <div className="flex-1">
                                <p className="font-bold text-gray-900 dark:text-white text-base">
                                  {item.stats}
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </FadeInWhenVisible>
                  );
                })}
              </div>

              {/* Partnership CTA */}
              <FadeInWhenVisible className="mt-16 text-center" delay={0.4}>
                <div className="max-w-3xl mx-auto bg-brand-primary/10 dark:bg-brand-primary/20 rounded-2xl p-8 border-2 border-brand-primary/30">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                    <MaterialIcon
                      icon="contact_mail"
                      size="2xl"
                      className="text-brand-primary flex-shrink-0"
                    />
                    <div className="flex-1 text-left">
                      <h4 className="font-bold text-gray-900 dark:text-white text-lg mb-2">
                        Organization Partnership Inquiries
                      </h4>
                      <p className="text-gray-700 dark:text-gray-300 mb-4">
                        If your veteran organization meets these criteria and
                        seeks genuine partnership opportunities, contact us. We
                        review all partnership proposals carefully and respond
                        to qualified organizations within 2 business days.
                      </p>
                      <Link
                        href="/contact"
                        className="inline-flex items-center gap-2 px-6 py-3 bg-brand-primary hover:bg-brand-primary/90 text-white transition-all duration-300 rounded-lg font-bold shadow-lg hover:shadow-xl"
                      >
                        <MaterialIcon icon="send" size="sm" />
                        <span>Submit Partnership Inquiry</span>
                      </Link>
                    </div>
                  </div>
                </div>
              </FadeInWhenVisible>
            </div>
          </section>

          {/* Next Steps Section - Veteran-Specific Messaging */}
          <NextStepsSection
            title="Let's Build Together"
            subtitle="Partner with veteran-owned excellence where honesty, integrity, professionalism, and thoroughness guide every decision. Your word is your bond—so is ours."
            noBackground={true}
          />
        </div>
      </div>
    </div>
  );
}
