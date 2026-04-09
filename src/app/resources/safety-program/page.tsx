import type { Metadata } from "next";
import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import { PageTrackingClient } from "@/components/analytics";
import { MaterialIcon } from "@/components/icons/MaterialIcon";
import {
  FadeInWhenVisible,
  StaggeredFadeIn,
} from "@/components/animations/FramerMotionComponents";
import { Breadcrumb } from "@/components/navigation/Breadcrumb";
import { StructuredData } from "@/components/seo/SeoMeta";
import {
  DiagonalStripePattern,
  BrandColorBlobs,
} from "@/components/ui/backgrounds";
import { generateBreadcrumbSchema } from "@/lib/seo/breadcrumb-schema";
import { SafetyComplianceBadge } from "@/components/resources/SafetyComplianceBadge";
import { getDocumentById } from "@/lib/data/documents";
import { withGeoMetadata } from "@/lib/seo/geo-metadata";

// Below-fold: lazy-loaded for performance
const NextStepsSection = dynamic(() =>
  import("@/components/shared-sections").then((m) => ({
    default: m.NextStepsSection,
  })),
);

const SITE_URL = "https://www.mhc-gc.com";

export const metadata: Metadata = withGeoMetadata({
  title:
    "Safety Program Overview | 44-Section OSHA-Compliant Program | MH Construction",
  description:
    "MH Construction's 44-section Safety Program aligned with OSHA 29 CFR 1926, AGC CSEA criteria, and WA/OR/ID state requirements. 0.64 EMR rating, AGC-WA Top EMR Award winner. Ideal for bonding agency review, surety underwriting, and bid pre-qualification.",
  keywords: [
    "construction safety program",
    "OSHA 29 CFR 1926 compliance",
    "AGC CSEA safety evaluation",
    "bonding agency safety documentation",
    "surety safety requirements",
    "EMR rating 0.64",
    "experience modification rate",
    "construction accident prevention program",
    "WISHA compliance",
    "Washington construction safety",
    "Oregon construction safety",
    "Idaho construction safety",
    "safety manual construction",
    "jobsite safety documentation",
    "contractor safety credentials",
    "veteran-owned contractor safety",
    "Tri-Cities construction safety",
    "safety program Tri-Cities WA",
  ],
  alternates: {
    canonical: `${SITE_URL}/resources/safety-program`,
  },
  openGraph: {
    title:
      "Safety Program Overview | 44-Section OSHA-Compliant | MH Construction",
    description:
      "44-section safety program with OSHA, AGC CSEA, and state-regulation alignment. 0.64 EMR rating. Full documentation for bonding agencies, sureties, and owner pre-qualification.",
    url: `${SITE_URL}/resources/safety-program`,
    siteName: "MH Construction",
    type: "website",
    images: [
      {
        url: `${SITE_URL}/images/safety/compliance.webp`,
        width: 1200,
        height: 630,
        alt: "MH Construction Safety Program - OSHA Compliant Documentation",
      },
    ],
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    site: "@mhc_gc",
    creator: "@mhc_gc",
    title: "Safety Program Overview | MH Construction",
    description:
      "44-section OSHA-compliant safety program. 0.64 EMR rating. Ideal for bonding and bid pre-qualification.",
    images: [`${SITE_URL}/images/safety/compliance.webp`],
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
  { name: "Resources", url: "https://www.mhc-gc.com/resources" },
  {
    name: "Safety Program",
    url: "https://www.mhc-gc.com/resources/safety-program",
  },
]);

// Safety Program Service Schema for rich results
const safetyProgramSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  "@id": `${SITE_URL}/resources/safety-program#service`,
  name: "MH Construction Safety Program",
  description:
    "44-section written safety program aligned with OSHA 29 CFR 1926, AGC CSEA criteria, and WA/OR/ID state requirements. Available for bonding agency review and bid pre-qualification.",
  provider: {
    "@type": "Organization",
    "@id": `${SITE_URL}/#organization`,
    name: "MH Construction",
    url: SITE_URL,
  },
  serviceType: "Construction Safety Program Documentation",
  areaServed: [
    { "@type": "State", name: "Washington" },
    { "@type": "State", name: "Oregon" },
    { "@type": "State", name: "Idaho" },
  ],
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Safety Program Documentation",
    itemListElement: [
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Complete Safety Manual",
          description: "44-section OSHA-compliant written safety program",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "EMR Documentation",
          description: "Experience Modification Rate history and certification",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "OSHA 300 Logs",
          description:
            "Required injury and illness recordkeeping documentation",
        },
      },
    ],
  },
};

const PMBOK_MAP = [
  {
    area: "Integration Management",
    sections: "01, 03, 05",
    osha: "29 CFR 1926.20",
    description: "Program policy, injury-free commitment, pre-job planning",
  },
  {
    area: "Risk Management",
    sections: "05, 06, 08, 11, 26",
    osha: "29 CFR 1926.502, .652",
    description:
      "JHA process, emergency response, incident reporting, fall/excavation standards",
  },
  {
    area: "Resource Management",
    sections: "04, 10, 23, 41",
    osha: "29 CFR 1926.21, .95, .55",
    description:
      "Safety orientation, PPE, industrial hygiene, short-service employees",
  },
  {
    area: "Quality Management",
    sections: "09, 19",
    osha: "29 CFR 1926.20",
    description:
      "Toolbox talks, safety meetings, equipment inspection programs",
  },
  {
    area: "Procurement Management",
    sections: "39",
    osha: "29 CFR 1926.20",
    description:
      "Subcontractor pre-qualification and safety oversight requirements",
  },
  {
    area: "Stakeholder Management",
    sections: "07, 08, 09",
    osha: "29 CFR 1903.2, 1904",
    description:
      "Safety bulletin boards, incident documentation, required meeting recordkeeping",
  },
];

const CREDENTIAL_CARDS = [
  {
    icon: "workspace_premium",
    label: "Veteran Owned",
    sub: "SDVOSB · Proudly served",
    colorClass: "text-gray-700 dark:text-gray-300",
    bgClass: "bg-gray-50 dark:bg-gray-800",
  },
  {
    icon: "gpp_good",
    label: "OSHA 29 CFR 1926",
    sub: "Construction industry standards",
    colorClass: "text-red-700 dark:text-red-400",
    bgClass: "bg-red-50 dark:bg-red-900/20",
  },
  {
    icon: "verified",
    label: "AGC CSEA Aligned",
    sub: "Contractor Safety Evaluation",
    colorClass: "text-brand-primary dark:text-brand-secondary",
    bgClass: "bg-brand-primary/8 dark:bg-brand-primary/20",
  },
  {
    icon: "shield",
    label: "WISHA Compliant",
    sub: "WA State construction safety",
    colorClass: "text-blue-700 dark:text-blue-400",
    bgClass: "bg-blue-50 dark:bg-blue-900/20",
  },
  {
    icon: "local_shipping",
    label: "DOT 49 CFR 382",
    sub: "CDL drug & alcohol program",
    colorClass: "text-amber-700 dark:text-amber-400",
    bgClass: "bg-amber-50 dark:bg-amber-900/20",
  },
  {
    icon: "schema",
    label: "PMBOK Structured",
    sub: "6 knowledge area alignment",
    colorClass: "text-purple-700 dark:text-purple-400",
    bgClass: "bg-purple-50 dark:bg-purple-900/20",
  },
];

export default function SafetyProgramPage() {
  const doc = getDocumentById("safety-manual")!;
  const sections = doc.sections ?? [];
  const requiredCount = sections.filter(
    (s) => s.priority === "required",
  ).length;

  return (
    <>
      <PageTrackingClient pageName="resources-safety-program" />
      <StructuredData data={breadcrumbSchema} />
      <StructuredData data={safetyProgramSchema} />

      <div className="bg-white dark:bg-gray-900 min-h-screen">
        {/* ── Hero Section ───────────────────────────────────────────────── */}
        <section
          className="relative h-[70vh] min-h-[500px] flex items-end justify-start text-white overflow-hidden"
          aria-labelledby="safety-program-hero-heading"
        >
          {/* Background photo */}
          <Image
            src="/images/safety/compliance.webp"
            alt="MH Construction safety compliance documentation and certifications"
            fill
            priority
            className="object-cover object-center"
            sizes="100vw"
          />
          {/* Dark overlay for readability */}
          <div
            className="absolute inset-0 bg-gradient-to-br from-brand-primary/40 via-gray-900/60 to-gray-900/80"
            aria-hidden="true"
          />

          {/* Hero content */}
          <div className="relative z-30 mb-24 sm:mb-28 ml-4 sm:ml-6 lg:ml-12 max-w-3xl pointer-events-none pb-2">
            <div className="flex justify-start mb-4">
              <div className="relative p-4 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm rounded-2xl border-2 border-white/30 shadow-2xl">
                <MaterialIcon
                  icon="shield_lock"
                  size="4xl"
                  className="text-white drop-shadow-lg"
                  ariaLabel="Safety Program Overview"
                />
              </div>
            </div>
            <h1
              id="safety-program-hero-heading"
              className="text-left text-base xs:text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-bold text-white drop-shadow-2xl leading-relaxed"
            >
              <span className="block text-brand-secondary-text text-sm xs:text-base sm:text-lg md:text-xl lg:text-2xl mb-1">
                For Bonding & Insurance Agencies
              </span>
              <span className="block text-brand-secondary">
                Safety Program Overview
              </span>
              <span className="block text-white/90">
                44 Sections.{" "}
                <span className="font-black italic text-brand-secondary">
                  Fully Documented.
                </span>
              </span>
            </h1>
          </div>
        </section>

        {/* Breadcrumb */}
        <Breadcrumb
          items={[
            { label: "Home", href: "/" },
            { label: "Resources", href: "/resources" },
            { label: "Safety Program" },
          ]}
        />

        {/* ── Introduction Section ────────────────────────────────────── */}
        <section
          id="introduction"
          className="relative bg-white dark:bg-gray-900 py-12 sm:py-16 lg:py-20 xl:py-24 overflow-hidden"
          aria-labelledby="intro-heading"
        >
          <DiagonalStripePattern />
          <BrandColorBlobs />

          <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <FadeInWhenVisible>
              <div className="mb-12">
                <Link
                  href="/resources"
                  className="inline-flex items-center gap-1.5 text-sm text-brand-primary dark:text-brand-secondary hover:underline mb-5"
                >
                  <MaterialIcon icon="arrow_back" size="sm" />
                  Back to Resources
                </Link>

                {/* Section header with icon */}
                <div className="mb-8 text-center">
                  <div className="flex items-center justify-center mb-8 gap-4">
                    <div className="h-1 w-16 bg-gradient-to-r from-transparent to-gray-300 dark:to-gray-600 rounded-full"></div>
                    <div className="relative">
                      <div className="absolute -inset-4 bg-gradient-to-br from-brand-primary/30 to-brand-primary-dark/30 blur-2xl rounded-full"></div>
                      <div className="relative bg-gradient-to-br from-brand-primary via-brand-primary-dark to-brand-primary-darker p-5 rounded-2xl shadow-2xl border-2 border-white/50 dark:border-gray-600">
                        <MaterialIcon
                          icon="verified_user"
                          size="2xl"
                          className="text-white drop-shadow-lg"
                        />
                      </div>
                    </div>
                    <div className="h-1 w-16 bg-gradient-to-l from-transparent to-gray-300 dark:to-gray-600 rounded-full"></div>
                  </div>

                  {/* Two-line gradient heading */}
                  <h2
                    id="intro-heading"
                    className="mb-6 sm:mb-8 font-black text-gray-900 dark:text-gray-100 text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-relaxed tracking-tighter overflow-visible"
                  >
                    <span className="block mb-3 sm:mb-4 font-semibold text-gray-700 dark:text-gray-200 text-xl xs:text-2xl sm:text-3xl md:text-4xl lg:text-5xl tracking-tight overflow-visible py-1">
                      MH Construction
                    </span>
                    <span className="block bg-gradient-to-r from-brand-primary via-brand-secondary to-brand-primary bg-clip-text text-transparent font-black drop-shadow-sm overflow-visible py-2 pb-3 leading-normal">
                      Safety Program
                    </span>
                  </h2>

                  <p className="mx-auto max-w-3xl font-light text-gray-600 dark:text-gray-300 text-lg md:text-xl leading-relaxed mb-8">
                    MH Construction&apos;s Safety Program is fully documented,
                    actively enforced, and updated annually. All 44 sections
                    align with OSHA 29 CFR 1926 construction standards, AGC CSEA
                    criteria, and applicable Washington, Oregon, and Idaho state
                    requirements.
                  </p>

                  {/* Compliance badge strip */}
                  <div className="flex flex-wrap justify-center gap-2">
                    <SafetyComplianceBadge variant="osha" />
                    <SafetyComplianceBadge variant="agc" />
                    <SafetyComplianceBadge variant="wisha" />
                    <SafetyComplianceBadge variant="pmbok" />
                    <SafetyComplianceBadge variant="dot" />
                    <SafetyComplianceBadge variant="veteran" />
                  </div>
                </div>
              </div>
            </FadeInWhenVisible>
          </div>
        </section>

        {/* ── Stats Section ────────────────────────────────────────────── */}
        <section
          id="stats"
          className="relative bg-brand-primary py-12 sm:py-16 overflow-hidden"
          aria-labelledby="stats-heading"
        >
          <div className="absolute inset-0 opacity-10">
            <DiagonalStripePattern />
          </div>

          <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <FadeInWhenVisible>
              <h2 id="stats-heading" className="sr-only">
                Safety Program Statistics
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {[
                  { value: "0.64", label: "EMR Rating", icon: "trending_down" },
                  { value: "44", label: "OSHA Sections", icon: "layers" },
                  {
                    value: `${requiredCount}`,
                    label: "OSHA-Required",
                    icon: "gpp_good",
                  },
                  { value: "16+", label: "Years Safe", icon: "shield" },
                ].map(({ value, label, icon }) => (
                  <div
                    key={label}
                    className="group flex flex-col items-center text-center bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 rounded-3xl p-5 sm:p-6 transition-all duration-300 hover:shadow-2xl hover:-translate-y-1"
                  >
                    <MaterialIcon
                      icon={icon}
                      size="lg"
                      className="text-brand-secondary mb-2 group-hover:scale-110 transition-transform duration-300"
                    />
                    <span className="text-2xl sm:text-3xl font-black text-white leading-none">
                      {value}
                    </span>
                    <span className="text-sm font-bold text-brand-secondary mt-1">
                      {label}
                    </span>
                  </div>
                ))}
              </div>
            </FadeInWhenVisible>
          </div>
        </section>

        {/* ── Download CTA Section ───────────────────────────────────────── */}
        <section
          id="downloads"
          className="relative bg-white dark:bg-gray-900 py-12 sm:py-16 lg:py-20 xl:py-24 overflow-hidden"
          aria-labelledby="downloads-heading"
        >
          <DiagonalStripePattern />
          <BrandColorBlobs />

          <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <FadeInWhenVisible>
              <div className="bg-gradient-to-r from-brand-primary-dark to-brand-primary rounded-2xl p-6 sm:p-8 flex items-center justify-between gap-6 flex-wrap shadow-xl">
                <div className="text-white">
                  <h2
                    id="downloads-heading"
                    className="text-xl sm:text-2xl font-bold mb-1"
                  >
                    Download the Full Safety Program
                  </h2>
                  <p className="text-brand-secondary-light text-sm opacity-90">
                    Table of Contents PDF with all 44 section titles & page
                    references
                  </p>
                </div>
                <div className="flex gap-3 flex-wrap">
                  <a
                    href="/docs/safety-manual-complete.pdf"
                    download
                    className="inline-flex items-center gap-2 bg-white hover:bg-gray-100 text-brand-primary font-bold px-5 py-2.5 rounded-xl transition-colors duration-200 text-sm"
                  >
                    <MaterialIcon icon="menu_book" size="sm" />
                    Complete Manual (PDF)
                  </a>
                  <a
                    href="/docs/sections/00-table-of-contents.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-brand-secondary hover:bg-brand-secondary-light text-white font-bold px-5 py-2.5 rounded-xl transition-colors duration-200 text-sm"
                  >
                    <MaterialIcon icon="download" size="sm" />
                    Table of Contents (PDF)
                  </a>
                  <Link
                    href="/safety"
                    className="inline-flex items-center gap-2 bg-white/15 hover:bg-white/25 text-white font-semibold px-5 py-2.5 rounded-xl transition-colors duration-200 text-sm border border-white/30"
                  >
                    <MaterialIcon icon="format_list_numbered" size="sm" />
                    Superintendent Hub
                  </Link>
                </div>
              </div>
            </FadeInWhenVisible>
          </div>
        </section>

        {/* ── Credentials Section ──────────────────────────────────────── */}
        <section
          id="credentials"
          className="relative bg-white dark:bg-gray-900 py-12 sm:py-16 lg:py-20 xl:py-24 overflow-hidden"
          aria-labelledby="credentials-heading"
        >
          <DiagonalStripePattern />
          <BrandColorBlobs />

          <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Section header with icon */}
            <FadeInWhenVisible>
              <div className="mb-16 sm:mb-20 text-center">
                <div className="flex items-center justify-center mb-8 gap-4">
                  <div className="h-1 w-16 bg-gradient-to-r from-transparent to-gray-300 dark:to-gray-600 rounded-full"></div>
                  <div className="relative">
                    <div className="absolute -inset-4 bg-gradient-to-br from-brand-primary/30 to-brand-primary-dark/30 blur-2xl rounded-full"></div>
                    <div className="relative bg-gradient-to-br from-brand-primary via-brand-primary-dark to-brand-primary-darker p-5 rounded-2xl shadow-2xl border-2 border-white/50 dark:border-gray-600">
                      <MaterialIcon
                        icon="workspace_premium"
                        size="2xl"
                        className="text-white drop-shadow-lg"
                      />
                    </div>
                  </div>
                  <div className="h-1 w-16 bg-gradient-to-l from-transparent to-gray-300 dark:to-gray-600 rounded-full"></div>
                </div>

                <h2
                  id="credentials-heading"
                  className="mb-6 sm:mb-8 font-black text-gray-900 dark:text-gray-100 text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-relaxed tracking-tighter overflow-visible"
                >
                  <span className="block mb-3 sm:mb-4 font-semibold text-gray-700 dark:text-gray-200 text-xl xs:text-2xl sm:text-3xl md:text-4xl lg:text-5xl tracking-tight overflow-visible py-1">
                    Industry-Verified
                  </span>
                  <span className="block bg-gradient-to-r from-brand-primary via-brand-secondary to-brand-primary bg-clip-text text-transparent font-black drop-shadow-sm overflow-visible py-2 pb-3 leading-normal">
                    Compliance Credentials
                  </span>
                </h2>
              </div>
            </FadeInWhenVisible>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <StaggeredFadeIn>
                {CREDENTIAL_CARDS.map(
                  ({ icon, label, sub, colorClass, bgClass }) => (
                    <div
                      key={label}
                      className={`group relative flex items-center gap-4 rounded-xl border border-gray-200 dark:border-gray-700 p-5 ${bgClass} hover:shadow-lg hover:-translate-y-1 transition-all duration-300`}
                    >
                      <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-white dark:bg-gray-900 shadow-sm flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                        <MaterialIcon
                          icon={icon}
                          size="md"
                          className={colorClass}
                        />
                      </div>
                      <div>
                        <p className={`font-bold text-sm ${colorClass}`}>
                          {label}
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                          {sub}
                        </p>
                      </div>
                    </div>
                  ),
                )}
              </StaggeredFadeIn>
            </div>
          </div>
        </section>

        {/* ── PMBOK Section ────────────────────────────────────────────── */}
        <section
          id="pmbok"
          className="relative bg-white dark:bg-gray-900 py-12 sm:py-16 lg:py-20 xl:py-24 overflow-hidden"
          aria-labelledby="pmbok-heading"
        >
          <DiagonalStripePattern />
          <BrandColorBlobs />

          <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <FadeInWhenVisible>
              {/* Section header with icon */}
              <div className="mb-16 sm:mb-20 text-center">
                <div className="flex items-center justify-center mb-8 gap-4">
                  <div className="h-1 w-16 bg-gradient-to-r from-transparent to-gray-300 dark:to-gray-600 rounded-full"></div>
                  <div className="relative">
                    <div className="absolute -inset-4 bg-gradient-to-br from-purple-600/30 to-purple-800/30 blur-2xl rounded-full"></div>
                    <div className="relative bg-gradient-to-br from-purple-600 via-purple-700 to-purple-800 p-5 rounded-2xl shadow-2xl border-2 border-white/50 dark:border-gray-600">
                      <MaterialIcon
                        icon="schema"
                        size="2xl"
                        className="text-white drop-shadow-lg"
                      />
                    </div>
                  </div>
                  <div className="h-1 w-16 bg-gradient-to-l from-transparent to-gray-300 dark:to-gray-600 rounded-full"></div>
                </div>

                <h2
                  id="pmbok-heading"
                  className="mb-6 sm:mb-8 font-black text-gray-900 dark:text-gray-100 text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-relaxed tracking-tighter overflow-visible"
                >
                  <span className="block mb-3 sm:mb-4 font-semibold text-gray-700 dark:text-gray-200 text-xl xs:text-2xl sm:text-3xl md:text-4xl lg:text-5xl tracking-tight overflow-visible py-1">
                    Project Management Maturity
                  </span>
                  <span className="block bg-gradient-to-r from-purple-600 via-brand-secondary to-purple-600 bg-clip-text text-transparent font-black drop-shadow-sm overflow-visible py-2 pb-3 leading-normal">
                    PMBOK Knowledge Area Alignment
                  </span>
                </h2>

                <p className="mx-auto max-w-3xl font-light text-gray-600 dark:text-gray-300 text-lg md:text-xl leading-relaxed">
                  MH Construction&apos;s safety program maps directly to PMBOK
                  Guide knowledge areas, demonstrating integrated project
                  management maturity.
                </p>
              </div>

              <div className="overflow-x-auto rounded-xl border border-gray-200 dark:border-gray-700 shadow-lg">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-brand-primary text-white">
                      <th className="text-left px-4 py-3 font-semibold rounded-tl-xl">
                        PMBOK Area
                      </th>
                      <th className="text-left px-4 py-3 font-semibold">
                        Sections
                      </th>
                      <th className="text-left px-4 py-3 font-semibold hidden md:table-cell">
                        OSHA Reference
                      </th>
                      <th className="text-left px-4 py-3 font-semibold rounded-tr-xl hidden lg:table-cell">
                        Coverage
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {PMBOK_MAP.map((row, i) => (
                      <tr
                        key={row.area}
                        className={`border-t border-gray-100 dark:border-gray-700 ${
                          i % 2 === 0
                            ? "bg-white dark:bg-gray-800"
                            : "bg-gray-50 dark:bg-gray-800/50"
                        }`}
                      >
                        <td className="px-4 py-3 font-semibold text-gray-900 dark:text-white whitespace-nowrap">
                          {row.area}
                        </td>
                        <td className="px-4 py-3 text-brand-primary dark:text-brand-secondary font-mono font-medium">
                          {row.sections}
                        </td>
                        <td className="px-4 py-3 text-gray-500 dark:text-gray-400 font-mono text-xs hidden md:table-cell whitespace-nowrap">
                          {row.osha}
                        </td>
                        <td className="px-4 py-3 text-gray-600 dark:text-gray-300 hidden lg:table-cell">
                          {row.description}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </FadeInWhenVisible>
          </div>
        </section>

        {/* ── Field Staff & Contact Section ────────────────────────────── */}
        <section
          id="field-staff"
          className="relative bg-white dark:bg-gray-900 py-12 sm:py-16 lg:py-20 xl:py-24 overflow-hidden"
          aria-labelledby="field-staff-heading"
        >
          <DiagonalStripePattern />
          <BrandColorBlobs />

          <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
            <h2 id="field-staff-heading" className="sr-only">
              Field Staff Resources and Contact
            </h2>

            {/* Field Staff Hub callout */}
            <FadeInWhenVisible>
              <Link
                href="/safety"
                className="group flex items-start sm:items-center gap-5 bg-gradient-to-r from-brand-primary/8 to-brand-primary/4 dark:from-brand-primary/20 dark:to-brand-primary/10 border border-brand-primary/25 dark:border-brand-primary/40 rounded-2xl p-5 sm:p-6 hover:border-brand-primary hover:shadow-lg transition-all duration-300"
              >
                <div className="flex-shrink-0 w-12 h-12 bg-brand-primary rounded-xl flex items-center justify-center shadow-md group-hover:scale-110 transition-transform duration-200">
                  <MaterialIcon
                    icon="construction"
                    size="md"
                    className="text-white"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-semibold text-brand-primary dark:text-brand-secondary uppercase tracking-wider mb-1">
                    Field Staff
                  </p>
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1">
                    Superintendent Safety Hub
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Download safety manual sections, fill out Toolbox Talks, JHA
                    forms, Site Inspections, and Incident Reports.
                  </p>
                </div>
                <MaterialIcon
                  icon="arrow_forward"
                  size="md"
                  className="text-brand-primary flex-shrink-0 group-hover:translate-x-1 transition-transform duration-200"
                />
              </Link>
            </FadeInWhenVisible>

            {/* Contact CTA */}
            <FadeInWhenVisible>
              <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl p-6 flex items-start gap-5 flex-wrap shadow-lg">
                <div className="w-12 h-12 bg-brand-primary/10 dark:bg-brand-primary/20 rounded-xl flex items-center justify-center flex-shrink-0">
                  <MaterialIcon
                    icon="mail"
                    size="md"
                    className="text-brand-primary"
                  />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1">
                    Need additional documentation?
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                    Bonding agencies, surety underwriters, and owner
                    pre-qualification programs can contact us directly for
                    experience modification rate (EMR) history, OSHA 300 logs,
                    or custom safety program attestations.
                  </p>
                  <a
                    href="tel:+15093086489"
                    className="inline-flex items-center gap-2 bg-brand-primary hover:bg-brand-primary-dark text-white font-bold px-5 py-2.5 rounded-xl transition-colors duration-200 text-sm"
                  >
                    <MaterialIcon icon="phone" size="sm" />
                    Call Jeremy — (509) 308-6489
                  </a>
                </div>
              </div>
            </FadeInWhenVisible>
          </div>
        </section>

        {/* ── Next Steps Section ─────────────────────────────────────────── */}
        <NextStepsSection />
      </div>
    </>
  );
}
