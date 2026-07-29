import type { Metadata } from "next";
import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { Button } from "@/components/ui";
import { MaterialIcon } from "@/components/icons/MaterialIcon";
import { Breadcrumb } from "@/components/navigation/Breadcrumb";
import { StructuredData } from "@/components/seo/SeoMeta";
import { generateBreadcrumbSchema } from "@/lib/seo/breadcrumb-schema";
import { PageTrackingClient } from "@/components/analytics";
import { withGeoMetadata } from "@/lib/seo/geo-metadata";
import { COMPANY_INFO } from "@/lib/constants/company";
import { getHeroPageSlogan } from "@/lib/content/hero-page-slogans";
import { getSafetyProofContent } from "@/lib/data/safety-proof";
import {
  formatDualPageName,
  PAGE_TERMINOLOGY,
} from "@/lib/branding/page-names";
import { manuals } from "@/lib/data/documents";
import { getApprovedClaimOrFallback } from "@/lib/content/claims";
import { getServerLocale } from "@/lib/i18n/locale.server";

const SITE_URL = "https://www.mhc-gc.com";
const MISH_PROGRAM_LABEL = "MISH Safety & Health Program (Safety Manual)";
const SAFETY_SECTION_COUNT =
  manuals.find((doc) => doc.id === "safety-manual")?.totalSections ?? 59;

const veteranOwnedClaim = getApprovedClaimOrFallback({
  id: "veteran_owned_since_2025",
  context: "safety",
  fallback: "veteran-owned leadership",
});

const triStateLicenseClaim = getApprovedClaimOrFallback({
  id: "tri_state_licensed_wa_or_id",
  context: "metadata",
  fallback: "Tri-State licensed contractor",
});

export const metadata: Metadata = withGeoMetadata({
  title: `${formatDualPageName(PAGE_TERMINOLOGY.safetyProgram.seoName, PAGE_TERMINOLOGY.safetyProgram.mhBrandName)} | 0.64 EMR | AGC-WA Award | MH Construction Tri-State`,
  description: `MH Construction Safety Program (${MISH_PROGRAM_LABEL}) — 0.64 EMR (40% better than industry average), OSHA VPP Star designation, AGC-WA Top EMR Award, Dean Gold Standards (Policy -> Procedure -> Task), and a ${SAFETY_SECTION_COUNT}-section written safety program aligned for WA, OR, and ID operations.`,
  keywords: [
    "MH Construction safety culture",
    "zero incident culture construction",
    "construction safety Tri-State WA OR ID",
    "veteran-owned contractor safety",
    "0.64 EMR construction contractor",
    "AGC-WA Top EMR Award",
    "OSHA VPP Star contractor Washington",
    "construction safety Pasco WA",
    "construction safety Kennewick Richland",
    "written safety program construction",
    "OSHA 30 hour certified contractor",
    "safety record construction contractor",
    "Experience Modification Rate EMR",
    "MISH safety and health program",
    "safety accountability construction team",
    "job hazard analysis construction",
    "toolbox talks safety program",
    "WISHA compliant contractor Washington",
    "construction safety Yakima Spokane WA",
    "veteran-owned construction safety program",
  ],
  alternates: {
    canonical: `${SITE_URL}/safety`,
  },
  openGraph: {
    title: `${formatDualPageName(PAGE_TERMINOLOGY.safetyProgram.seoName, PAGE_TERMINOLOGY.safetyProgram.mhBrandName)} | 0.64 EMR, AGC-WA Award | MH Construction`,
    description: `Safety is leadership in daily practice. 0.64 EMR (40% below industry avg), OSHA VPP Star designation, AGC-WA Top EMR Award, Dean Gold Standards (Policy -> Procedure -> Task), and a ${SAFETY_SECTION_COUNT}-section written ${MISH_PROGRAM_LABEL}.`,
    url: `${SITE_URL}/safety`,
    siteName: "MH Construction",
    type: "website",
    images: [
      {
        url: `${SITE_URL}/images/safety/safety-culture.webp`,
        width: 1200,
        height: 630,
        alt: "MH Construction — Safety Briefing on the Job Site",
      },
    ],
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    site: "@mhc_gc",
    creator: "@mhc_gc",
    title: `${formatDualPageName(PAGE_TERMINOLOGY.safetyProgram.seoName, PAGE_TERMINOLOGY.safetyProgram.mhBrandName)} | 0.64 EMR | MH Construction`,
    description:
      "0.64 EMR — 40% better than industry average. OSHA VPP Star designation. AGC-WA Top EMR Award.",
    images: [`${SITE_URL}/images/safety/safety-culture.webp`],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
});

const breadcrumbSchema = generateBreadcrumbSchema([
  { name: "Home", url: "https://www.mhc-gc.com" },
  {
    name: `Safety Program (${MISH_PROGRAM_LABEL})`,
    url: "https://www.mhc-gc.com/safety",
  },
]);

const safetySchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: `MH Construction Safety Program (${MISH_PROGRAM_LABEL})`,
  description: `Safety program with 0.64 EMR (40% better than industry average), OSHA VPP Star designation, AGC-WA Top EMR Award, Dean Gold Standards (Policy -> Procedure -> Task), and a ${SAFETY_SECTION_COUNT}-section written safety program aligned with OSHA, AGC, WISHA, Oregon OSHA, and Idaho requirements.`,
  provider: {
    "@type": "Organization",
    name: "MH Construction, Inc.",
    url: SITE_URL,
    address: {
      "@type": "PostalAddress",
      streetAddress: "3111 N Capitol Ave",
      addressLocality: "Pasco",
      addressRegion: "WA",
      postalCode: "99301",
      addressCountry: "US",
    },
    telephone: "+15093086489",
  },
  serviceType: "Construction Safety Management",
  areaServed: [
    "Tri-State (WA, OR, ID)",
    "Pasco WA",
    "Kennewick WA",
    "Richland WA",
    "Yakima WA",
    "Spokane WA",
    "Walla Walla WA",
  ],
  award: [
    "AGC-WA Top EMR Award — Multiple Consecutive Years",
    "0.64 Experience Modification Rate — 40% Below Industry Average",
    "OSHA VPP Star Designation",
  ],
  hasCredential: [
    {
      "@type": "EducationalOccupationalCredential",
      credentialCategory: "certification",
      name: "OSHA VPP Star Designation",
    },
    {
      "@type": "EducationalOccupationalCredential",
      credentialCategory: "certification",
      name: "OSHA 30-Hour Construction Certification",
    },
    {
      "@type": "EducationalOccupationalCredential",
      credentialCategory: "award",
      name: "AGC-WA Top EMR Award",
    },
  ],
};

const safetyFaqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What is MH Construction's EMR rating?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "MH Construction's Experience Modification Rate (EMR) is 0.64 — 40% better than the industry average of 1.0. This award-winning safety record has earned multiple consecutive AGC-WA Top EMR Awards and directly reflects our daily safety discipline.",
      },
    },
    {
      "@type": "Question",
      name: "Is MH Construction OSHA certified?",
      acceptedAnswer: {
        "@type": "Answer",
        text: `Yes. MH Construction holds OSHA VPP Star designation — the highest level of workplace safety achievement in OSHA's Voluntary Protection Program. Our team is OSHA 30-Hour Construction certified and we maintain a comprehensive ${SAFETY_SECTION_COUNT}-section written safety program aligned with federal and state requirements.`,
      },
    },
    {
      "@type": "Question",
      name: "What is MH Construction's written safety program?",
      acceptedAnswer: {
        "@type": "Answer",
        text: `MH Construction maintains a ${SAFETY_SECTION_COUNT}-section written safety program (Revision 3.0, effective July 1, 2026), delivered as the ${MISH_PROGRAM_LABEL}. The program is aligned with OSHA 29 CFR 1926, AGC CSEA, WISHA (Washington), Oregon OSHA, and Idaho requirements. It is available for review by bonding banks, insurers, architects, and project stakeholders at mhc-gc.com/safety.`,
      },
    },
    {
      "@type": "Question",
      name: "How does MH Construction maintain site safety daily?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "MH Construction's daily safety practices include toolbox talks before every shift aligned to OSHA hazard seasons, Safety Data Sheets (SDS/MSDS) availability in our Staff Portal - (Field Operations) plus physical field copies in trucks and Mobile Command Center's (office trailers), Job Hazard Analysis on every new scope, equipment inspections before every use, incident reporting for every event, weekly superintendent safety reviews, and peer recognition for safe behavior. Every team member holds stop-work authority.",
      },
    },
    {
      "@type": "Question",
      name: "Does MH Construction comply with Washington L&I requirements?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. MH Construction is fully compliant with OSHA, Washington L&I (WISHA), EPA, and all applicable federal and state regulatory requirements. We maintain comprehensive documentation, conduct regular audits, and verify compliance systematically on all job sites in Washington, Oregon, and Idaho.",
      },
    },
    {
      "@type": "Question",
      name: "What does veteran-owned mean for MH Construction's safety culture?",
      acceptedAnswer: {
        "@type": "Answer",
        text: `MH Construction is ${veteranOwnedClaim.toLowerCase()} under Army veteran Jeremy Thamert. Veteran leadership applies the military principle that consistent daily habits — not sporadic rules — are what keep people safe. This disciplined approach is embedded in every toolbox talk, JHA, and site inspection we conduct. ${triStateLicenseClaim}.`,
      },
    },
  ],
};

// ─── Page ─────────────────────────────────────────────────────────────────────

export default async function SafetyPage() {
  const locale = await getServerLocale();
  const t = await getTranslations({ locale });
  const sp = (key: string, values?: Record<string, string>) =>
    t(
      `safetyPage.${key}` as Parameters<typeof t>[0],
      values as Parameters<typeof t>[1],
    );

  const safetyProofContent = getSafetyProofContent(MISH_PROGRAM_LABEL, {
    credentials: {
      items: {
        oshaVpp: {
          title: sp("credentials.items.oshaVpp.title"),
          body: sp("credentials.items.oshaVpp.body"),
          tag: sp("credentials.items.oshaVpp.tag"),
        },
        agcWa: {
          title: sp("credentials.items.agcWa.title"),
          body: sp("credentials.items.agcWa.body"),
          tag: sp("credentials.items.agcWa.tag"),
        },
        osha30: {
          title: sp("credentials.items.osha30.title"),
          body: sp("credentials.items.osha30.body"),
          tag: sp("credentials.items.osha30.tag"),
        },
        deanGold: {
          title: sp("credentials.items.deanGold.title"),
          body: sp("credentials.items.deanGold.body"),
          tag: sp("credentials.items.deanGold.tag"),
        },
        program: {
          title: sp("credentials.items.program.title"),
          body: sp("credentials.items.program.body"),
          tag: sp("credentials.items.program.tag"),
        },
      },
    },
    badges: {
      items: {
        oshaVpp: {
          title: sp("badges.items.oshaVpp.title"),
          subtitle: sp("badges.items.oshaVpp.subtitle"),
        },
        agcWa: {
          title: sp("badges.items.agcWa.title"),
          subtitle: sp("badges.items.agcWa.subtitle"),
        },
        osha30: {
          title: sp("badges.items.osha30.title"),
          subtitle: sp("badges.items.osha30.subtitle"),
        },
        wisha: {
          title: sp("badges.items.wisha.title"),
          subtitle: sp("badges.items.wisha.subtitle"),
        },
        emr: {
          title: sp("badges.items.emr.title"),
          subtitle: sp("badges.items.emr.subtitle"),
        },
        csea: {
          title: sp("badges.items.csea.title"),
          subtitle: sp("badges.items.csea.subtitle"),
        },
        deanGold: {
          title: sp("badges.items.deanGold.title"),
          subtitle: sp("badges.items.deanGold.subtitle"),
        },
      },
    },
    program: {
      commitments: {
        safeHome: {
          title: sp("program.commitments.safeHome.title"),
          body: sp("program.commitments.safeHome.body"),
        },
        accountability: {
          title: sp("program.commitments.accountability.title"),
          body: sp("program.commitments.accountability.body"),
        },
        discipline: {
          title: sp("program.commitments.discipline.title"),
          body: sp("program.commitments.discipline.body"),
        },
        speakUp: {
          title: sp("program.commitments.speakUp.title"),
          body: sp("program.commitments.speakUp.body"),
        },
      },
    },
    performance: {
      stats: {
        emr: {
          label: sp("performance.stats.emr.label"),
          sub: sp("performance.stats.emr.sub"),
        },
        agcWa: {
          label: sp("performance.stats.agcWa.label"),
          sub: sp("performance.stats.agcWa.sub"),
        },
        years: {
          label: sp("performance.stats.years.label"),
          sub: sp("performance.stats.years.sub"),
        },
        sections: { label: sp("performance.stats.sections.label") },
      },
    },
    evidence: {
      habits: {
        toolbox: sp("evidence.habits.toolbox"),
        jha: sp("evidence.habits.jha"),
        incident: sp("evidence.habits.incident"),
        equipment: sp("evidence.habits.equipment"),
        review: sp("evidence.habits.review"),
        peer: sp("evidence.habits.peer"),
      },
    },
    compliance: {
      items: {
        osha: {
          title: sp("compliance.items.osha.title"),
          body: sp("compliance.items.osha.body"),
        },
        wisha: {
          title: sp("compliance.items.wisha.title"),
          body: sp("compliance.items.wisha.body"),
        },
        epa: {
          title: sp("compliance.items.epa.title"),
          body: sp("compliance.items.epa.body"),
        },
        payroll: {
          title: sp("compliance.items.payroll.title"),
          body: sp("compliance.items.payroll.body"),
        },
      },
    },
  });
  return (
    <>
      <PageTrackingClient pageName="Safety Program" />
      <StructuredData
        data={[breadcrumbSchema, safetySchema, safetyFaqSchema]}
      />

      {/* ── Hero ── */}
      <section
        className="hero-section relative flex items-end justify-end text-white overflow-hidden"
        style={{ height: "calc(100vh - var(--mh-nav-offset, 6.5rem))" }}
      >
        {/* Background image */}
        <div className="absolute inset-0 bg-linear-to-br from-gray-900 via-brand-primary to-gray-900">
          <Image
            src="/images/safety/safety-culture.webp"
            alt="MH Construction safety briefing on the job site"
            fill
            className="object-cover opacity-30"
            priority
          />
          <div className="absolute inset-0 bg-linear-to-br from-brand-primary/30 via-gray-900/60 to-gray-900/80" />
        </div>

        {/* Header Text — Bottom Right */}
        <div className="hero-safe-top hero-safe-bottom relative z-30 mx-3 sm:ml-auto sm:mr-5 lg:mr-7 xl:mr-10 mb-4 pointer-events-none transition-opacity duration-300 sm:w-[min(88vw,44rem)] sm:max-w-176">
          <div className="rounded-2xl border border-white/15 bg-gray-900/60 px-4 py-3 shadow-2xl backdrop-blur-md sm:px-6 sm:py-4 lg:px-8 lg:py-5">
            <h1 className="text-right text-lg xs:text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-black text-white leading-tight tracking-tight">
              {/* Page Identity */}
              <span className="block text-brand-secondary text-sm xs:text-base sm:text-lg md:text-xl lg:text-2xl mb-1">
                {sp("hero.pageIdentity")}
              </span>
              {/* Page Mantra */}
              <span className="block text-brand-secondary text-xl sm:text-2xl md:text-3xl lg:text-4xl mb-4">
                {sp("hero.mantra")}
              </span>
              {/* Program label */}
              <span className="block text-brand-primary">
                {MISH_PROGRAM_LABEL}
              </span>
              <span className="block text-white/90">{sp("hero.tagline")}</span>
              <span className="block text-white/90 text-sm xs:text-base sm:text-lg md:text-xl mt-2">
                {COMPANY_INFO.slogan.primary}
              </span>
              {locale === "es" && (
                <span className="block text-brand-secondary/90 text-xs xs:text-sm sm:text-base mt-1">
                  {sp("hero.sloganEsCompanion")}
                </span>
              )}
              <span className="block text-brand-secondary/90 text-sm xs:text-base sm:text-lg md:text-xl mt-2">
                {getHeroPageSlogan("safety").slogan}
              </span>
            </h1>
          </div>
        </div>
      </section>

      {/* Breadcrumb */}
      <div className="bg-slate-900 border-b border-slate-700">
        <div className="max-w-6xl mx-auto px-4 py-3">
          <Breadcrumb
            items={[
              { label: "Home", href: "/" },
              {
                label: formatDualPageName(
                  PAGE_TERMINOLOGY.safetyProgram.seoName,
                  PAGE_TERMINOLOGY.safetyProgram.mhBrandName,
                ),
              },
            ]}
          />
        </div>
      </div>

      {/* ── Credentials ── */}
      <section id="credentials" className="bg-white dark:bg-gray-900 py-20">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-14">
            <h2 className="mb-4 sm:mb-6 font-black text-gray-900 dark:text-gray-100 text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-relaxed tracking-tighter overflow-visible">
              <span className="block mb-2 sm:mb-3 font-semibold text-gray-700 dark:text-gray-200 text-xl xs:text-2xl sm:text-3xl md:text-4xl lg:text-5xl tracking-tight overflow-visible py-1">
                {sp("credentials.subtitle")}
              </span>
              <span className="block bg-linear-to-r from-brand-primary via-brand-secondary to-brand-primary bg-clip-text text-transparent font-black drop-shadow-sm overflow-visible py-1 leading-normal">
                {sp("credentials.title")}
              </span>
            </h2>
            <p className="font-body text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              {sp("credentials.description", { mishLabel: MISH_PROGRAM_LABEL })}
            </p>
          </div>

          <div className="grid sm:grid-cols-2 gap-8">
            {safetyProofContent.credentials.map((item) => (
              <div
                key={item.title}
                className="flex gap-5 p-6 rounded-2xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700"
              >
                <div className="shrink-0 w-12 h-12 rounded-xl bg-brand-primary/10 flex items-center justify-center">
                  <MaterialIcon
                    icon={item.icon}
                    size="md"
                    className="text-brand-primary"
                  />
                </div>
                <div>
                  <span className="font-heading inline-block text-xs font-bold uppercase tracking-widest text-brand-secondary-text dark:text-brand-secondary-light mb-1">
                    {item.tag}
                  </span>
                  <h3 className="font-black text-gray-900 dark:text-white mb-2">
                    {item.title}
                  </h3>
                  <p className="font-body text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                    {item.body}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Credential Badges ── */}
      <section id="credential-badges" className="bg-slate-900 py-20">
        <div className="max-w-5xl mx-auto px-4">
          <div className="text-center mb-14">
            <h2 className="mb-4 sm:mb-6 font-black text-white text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-relaxed tracking-tighter overflow-visible">
              <span className="block mb-2 sm:mb-3 font-semibold text-white/70 text-xl xs:text-2xl sm:text-3xl md:text-4xl lg:text-5xl tracking-tight overflow-visible py-1">
                {sp("badges.subtitle")}
              </span>
              <span className="block bg-linear-to-r from-brand-secondary via-white to-brand-secondary bg-clip-text text-transparent font-black drop-shadow-sm overflow-visible py-1 leading-normal">
                {sp("badges.title")}
              </span>
            </h2>
            <p className="font-body text-lg text-white/70 max-w-xl mx-auto">
              {sp("badges.description")}
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-6">
            {safetyProofContent.badges.map((badge) => (
              <div
                key={badge.title}
                className="flex flex-col items-center gap-3 p-6 rounded-2xl bg-white/5 border border-white/10 text-center"
              >
                <div
                  className={`w-14 h-14 ${badge.color} rounded-2xl flex items-center justify-center`}
                >
                  <MaterialIcon
                    icon={badge.icon}
                    size="xl"
                    className="text-white"
                  />
                </div>
                <div>
                  <p className="font-black text-white text-sm">{badge.title}</p>
                  <p className="text-xs text-white/60 mt-0.5">
                    {badge.subtitle}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── MISH Program ── */}
      <section id="program" className="bg-white dark:bg-gray-900 py-20">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="font-heading inline-block text-xs font-bold uppercase tracking-widest text-brand-secondary-text dark:text-brand-secondary-light mb-4">
                {sp("program.revLabel")}
              </span>
              <h2 className="mb-4 sm:mb-6 font-black text-gray-900 dark:text-gray-100 text-3xl xs:text-4xl sm:text-5xl md:text-6xl leading-tight tracking-tighter overflow-visible">
                <span className="block mb-2 font-semibold text-gray-700 dark:text-gray-200 text-xl xs:text-2xl sm:text-3xl md:text-4xl tracking-tight py-1">
                  {sp("program.subtitle")}
                </span>
                <span className="block bg-linear-to-r from-brand-primary via-brand-secondary to-brand-primary bg-clip-text text-transparent font-black drop-shadow-sm py-1 leading-normal">
                  {sp("program.title")}
                </span>
              </h2>
              <p className="font-body text-gray-600 dark:text-gray-400 text-lg leading-relaxed mb-6">
                {sp("program.para1")}
              </p>
              <p className="font-body text-gray-600 dark:text-gray-400 leading-relaxed mb-8">
                {sp("program.para2")}
              </p>

              <div className="grid grid-cols-2 gap-4">
                {safetyProofContent.commitments.map((item) => (
                  <div
                    key={item.title}
                    className="flex gap-3 p-4 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700"
                  >
                    <div className="shrink-0 w-9 h-9 rounded-lg bg-brand-primary/10 flex items-center justify-center">
                      <MaterialIcon
                        icon={item.icon}
                        size="sm"
                        className="text-brand-primary"
                      />
                    </div>
                    <div>
                      <p className="font-bold text-gray-900 dark:text-white text-sm">
                        {item.title}
                      </p>
                      <p className="font-body text-xs text-gray-500 dark:text-gray-400 mt-0.5 leading-relaxed">
                        {item.body}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative rounded-3xl overflow-hidden aspect-square lg:aspect-auto lg:h-96 bg-slate-100 dark:bg-slate-800">
              <Image
                src="/images/safety/safety-culture.webp"
                alt="MH Construction safety program in action — job site briefing"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-linear-to-t from-brand-primary/60 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                <p className="font-black text-xl">
                  {sp("program.imageCaption1")}
                </p>
                <p className="text-white/80 text-sm">
                  {sp("program.imageCaption2")}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Safety Record ── */}
      <section id="performance" className="bg-brand-primary text-white py-20">
        <div className="max-w-5xl mx-auto px-4 text-center">
          <MaterialIcon
            icon="military_tech"
            size="xl"
            className="mx-auto mb-6 text-brand-accent"
          />
          <h2 className="mb-4 sm:mb-6 font-black text-white text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-relaxed tracking-tighter overflow-visible">
            <span className="block mb-2 sm:mb-3 font-semibold text-white/80 text-xl xs:text-2xl sm:text-3xl md:text-4xl lg:text-5xl tracking-tight overflow-visible py-1">
              {sp("performance.subtitle")}
            </span>
            <span className="block bg-linear-to-r from-brand-secondary via-white to-brand-secondary bg-clip-text text-transparent font-black drop-shadow-sm overflow-visible py-1 leading-normal">
              {sp("performance.title")}
            </span>
          </h2>
          <p className="font-body text-white/80 text-lg max-w-2xl mx-auto mb-14 leading-relaxed">
            {sp("performance.description")}
          </p>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {safetyProofContent.stats.map((stat) => (
              <div
                key={stat.label}
                className="bg-white/10 rounded-2xl p-6 border border-white/20"
              >
                <MaterialIcon
                  icon={stat.icon}
                  size="lg"
                  className="mx-auto mb-3 text-brand-accent"
                />
                <div className="text-3xl sm:text-4xl font-black text-white mb-1">
                  {stat.value}
                </div>
                <div className="text-sm font-bold text-brand-accent mb-1">
                  {stat.label}
                </div>
                <div className="text-xs text-white/60 leading-snug">
                  {stat.sub}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Active Use (Evidence) ── */}
      <section id="evidence" className="bg-slate-50 dark:bg-gray-950 py-20">
        <div className="max-w-5xl mx-auto px-4">
          <div className="text-center mb-14">
            <h2 className="mb-4 sm:mb-6 font-black text-gray-900 dark:text-gray-100 text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-relaxed tracking-tighter overflow-visible">
              <span className="block mb-2 sm:mb-3 font-semibold text-gray-700 dark:text-gray-200 text-xl xs:text-2xl sm:text-3xl md:text-4xl lg:text-5xl tracking-tight overflow-visible py-1">
                {sp("evidence.subtitle")}
              </span>
              <span className="block bg-linear-to-r from-brand-primary via-brand-secondary to-brand-primary bg-clip-text text-transparent font-black drop-shadow-sm overflow-visible py-1 leading-normal">
                {sp("evidence.title")}
              </span>
            </h2>
            <p className="font-body text-lg text-gray-600 dark:text-gray-400 max-w-xl mx-auto">
              {sp("evidence.description")}
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {safetyProofContent.habits.map((h) => (
              <div
                key={h.label}
                className="flex items-center gap-3 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl px-5 py-4"
              >
                <MaterialIcon
                  icon={h.icon}
                  size="sm"
                  className="text-brand-primary shrink-0"
                />
                <span className="text-sm font-semibold text-gray-800 dark:text-gray-200">
                  {h.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Compliance ── */}
      <section id="compliance" className="bg-white dark:bg-gray-900 py-20">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-14">
            <h2 className="mb-4 sm:mb-6 font-black text-gray-900 dark:text-gray-100 text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-relaxed tracking-tighter overflow-visible">
              <span className="block mb-2 sm:mb-3 font-semibold text-gray-700 dark:text-gray-200 text-xl xs:text-2xl sm:text-3xl md:text-4xl lg:text-5xl tracking-tight overflow-visible py-1">
                {sp("compliance.subtitle")}
              </span>
              <span className="block bg-linear-to-r from-brand-primary via-brand-secondary to-brand-primary bg-clip-text text-transparent font-black drop-shadow-sm overflow-visible py-1 leading-normal">
                {sp("compliance.title")}
              </span>
            </h2>
            <p className="font-body text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              {sp("compliance.description")}
            </p>
          </div>

          <div className="grid sm:grid-cols-2 gap-8 mb-14">
            {safetyProofContent.compliance.map((item) => (
              <div
                key={item.title}
                className="flex gap-5 p-6 rounded-2xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700"
              >
                <div className="shrink-0 w-12 h-12 rounded-xl bg-brand-primary/10 flex items-center justify-center">
                  <MaterialIcon
                    icon={item.icon}
                    size="md"
                    className="text-brand-primary"
                  />
                </div>
                <div>
                  <h3 className="font-black text-gray-900 dark:text-white mb-2">
                    {item.title}
                  </h3>
                  <p className="font-body text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                    {item.body}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Accountability callout */}
          <div className="rounded-2xl bg-brand-primary/5 dark:bg-brand-primary/10 border border-brand-primary/20 p-8 text-center">
            <MaterialIcon
              icon="military_tech"
              size="xl"
              className="mx-auto mb-4 text-brand-primary"
            />
            <h3 className="font-black text-gray-900 dark:text-white text-xl mb-3">
              {sp("compliance.accountability.title")}
            </h3>
            <p className="font-body text-gray-600 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed">
              {sp("compliance.accountability.body")}
            </p>
          </div>
        </div>
      </section>

      {/* ── Snapshots ── */}
      <section id="snapshots" className="bg-slate-900 py-20">
        <div className="max-w-4xl mx-auto px-4">
          <div className="rounded-3xl bg-white/5 border border-white/10 text-white p-10 md:p-14 text-center relative overflow-hidden">
            <div
              className="absolute inset-0 bg-linear-to-br from-brand-primary/20 via-transparent to-brand-accent/10 pointer-events-none"
              aria-hidden="true"
            />

            <div className="relative z-10">
              <div className="w-16 h-16 bg-brand-primary/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <MaterialIcon
                  icon="smartphone"
                  size="xl"
                  className="text-brand-accent"
                />
              </div>

              <h2 className="mb-4 sm:mb-6 font-black text-white text-3xl xs:text-4xl sm:text-5xl md:text-6xl leading-relaxed tracking-tighter overflow-visible">
                <span className="block mb-2 sm:mb-3 font-semibold text-white/80 text-xl xs:text-2xl sm:text-3xl md:text-4xl tracking-tight overflow-visible py-1">
                  {sp("snapshots.subtitle")}
                </span>
                <span className="block bg-linear-to-r from-brand-secondary via-white to-brand-secondary bg-clip-text text-transparent font-black drop-shadow-sm overflow-visible py-1 leading-normal">
                  {sp("snapshots.title")}
                </span>
              </h2>

              <p className="font-body text-slate-300 text-lg max-w-xl mx-auto mb-4 leading-relaxed">
                {sp("snapshots.para1")}
              </p>
              <p className="text-slate-400 text-sm max-w-md mx-auto mb-8">
                {sp("snapshots.contactNote")}{" "}
                <a
                  href="mailto:office@mhc-gc.com"
                  className="text-brand-secondary hover:underline"
                >
                  office@mhc-gc.com
                </a>{" "}
                {sp("snapshots.contactOr")}{" "}
                <a
                  href="tel:+15093086489"
                  className="text-brand-secondary hover:underline"
                >
                  (509) 308-6489
                </a>
                .
              </p>

              <p className="text-sm text-slate-400">
                {sp("snapshots.footNote")}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Contact CTA ── */}
      <section className="bg-white dark:bg-gray-900 py-20">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <MaterialIcon
            icon="handshake"
            size="xl"
            className="mx-auto mb-6 text-brand-primary"
          />
          <h2 className="font-black text-gray-900 dark:text-white text-3xl sm:text-4xl mb-4 tracking-tight">
            {sp("cta.title")}
          </h2>
          <p className="font-body text-gray-600 dark:text-gray-400 text-lg max-w-xl mx-auto mb-8 leading-relaxed">
            {sp("cta.description", { mishLabel: MISH_PROGRAM_LABEL })}
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button asChild size="lg" variant="primary">
              <a href="tel:+15093086489">
                <MaterialIcon icon="phone" size="md" className="text-white" />
                (509) 308-6489
              </a>
            </Button>
            <Button asChild size="lg" variant="outline">
              <a href="/contact">
                <MaterialIcon icon="mail" size="md" />
                {sp("cta.sendMessage")}
              </a>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
