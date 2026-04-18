import type { Metadata } from "next";
import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import { MaterialIcon } from "@/components/icons/MaterialIcon";
import { PageNavigation } from "@/components/navigation/PageNavigation";
import { navigationConfigs } from "@/components/navigation/navigationConfigs";
import { Breadcrumb } from "@/components/navigation/Breadcrumb";
import {
  FadeInWhenVisible,
  StaggeredFadeIn,
} from "@/components/animations/FramerMotionComponents";
import {
  DiagonalStripePattern,
  BrandColorBlobs,
} from "@/components/ui/backgrounds";
import { SafetyComplianceBadge } from "@/components/resources/SafetyComplianceBadge";
import { StructuredData } from "@/components/seo/SeoMeta";
import { generateBreadcrumbSchema } from "@/lib/seo/breadcrumb-schema";
import { getDocumentById } from "@/lib/data/documents";
import { PageTrackingClient } from "@/components/analytics";
import { withGeoMetadata } from "@/lib/seo/geo-metadata";

// Below-fold components: lazy-loaded for performance
const SafetySection = dynamic(() =>
  import("@/components/about").then((m) => ({ default: m.SafetySection })),
);
const NextStepsSection = dynamic(() =>
  import("@/components/shared-sections").then((m) => ({
    default: m.NextStepsSection,
  })),
);

const SITE_URL = "https://www.mhc-gc.com";

export const metadata: Metadata = withGeoMetadata({
  title: "MISH Safety Program | Zero-Incident Culture | MH Construction",
  description:
    "MH Construction's written safety program (MISH): 0.64 EMR rating (40% below industry average), aligned with OSHA 29 CFR 1926, AGC CSEA prequalification expectations, and applicable WA/OR/ID requirements. AGC-WA Top EMR Award winner. Daily toolbox talks, JHA, and incident reporting.",
  keywords: [
    "MISH industrial safety health program",
    "MH Construction safety program",
    "zero incident safety culture",
    "OSHA 29 CFR 1926 compliance",
    "construction EMR rating",
    "experience modification rate 0.64",
    "AGC accident prevention program",
    "AGC safety award winner",
    "daily toolbox talks",
    "job hazard analysis JHA",
    "site safety inspection",
    "incident reporting construction",
    "construction accident prevention",
    "safety documentation construction",
    "field safety hub",
    "superintendent safety forms",
    "construction safety Tri-Cities WA",
    "Veteran-Owned contractor safety",
    "Washington contractor safety program",
    "WISHA compliant contractor",
    "AGC CSEA safety evaluation",
    "bonding safety requirements",
  ],
  alternates: {
    canonical: `${SITE_URL}/safety`,
  },
  openGraph: {
    title: "Safety Program | Zero-Incident Culture | MH Construction",
    description:
      "Award-winning safety: 0.64 EMR rating, written program aligned with OSHA 29 CFR 1926 and AGC CSEA expectations. Daily toolbox talks, JHA, inspections. Veteran-Owned contractor.",
    url: `${SITE_URL}/safety`,
    siteName: "MH Construction",
    type: "website",
    images: [
      {
        url: `${SITE_URL}/images/safety/safety-culture.webp`,
        width: 1200,
        height: 630,
        alt: "MH Construction Safety Briefing - Zero-Incident Culture",
      },
    ],
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    site: "@mhc_gc",
    creator: "@mhc_gc",
    title: "MISH Safety Program | MH Construction",
    description:
      "0.64 EMR rating. Written safety program aligned with OSHA + WA/OR/ID requirements and AGC CSEA expectations. AGC-WA Top EMR Award winner.",
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
  { name: "Safety Program", url: "https://www.mhc-gc.com/safety" },
]);

// ImageObject schemas for each credential / compliance badge
const credentialImageSchemas = [
  {
    "@context": "https://schema.org",
    "@type": "ImageObject",
    "@id": `${SITE_URL}/safety#badge-bonding`,
    url: `${SITE_URL}/images/compliance/bonding.webp`,
    name: "MH Construction — Surety Bonding Verification",
    description:
      "Licensed, bonded, and insured general contractor serving WA, OR, and ID. Travelers Insurance bonding partner.",
    width: 800,
    height: 600,
    representativeOfPage: false,
  },
  {
    "@context": "https://schema.org",
    "@type": "ImageObject",
    "@id": `${SITE_URL}/safety#badge-prevailing-wage`,
    url: `${SITE_URL}/images/compliance/prevailing-wage.webp`,
    name: "MH Construction — Prevailing Wage Compliance",
    description:
      "Washington State prevailing wage compliance for public works projects. L&I certified payroll reporting.",
    width: 800,
    height: 600,
    representativeOfPage: false,
  },
  {
    "@context": "https://schema.org",
    "@type": "ImageObject",
    "@id": `${SITE_URL}/safety#badge-safety`,
    url: `${SITE_URL}/images/compliance/safety.webp`,
    name: "MH Construction — Safety Compliance",
    description:
      "OSHA 29 CFR 1926 compliant safety program. 0.64 EMR rating — 40% below industry average. AGC-WA Top EMR Award winner.",
    width: 800,
    height: 600,
    representativeOfPage: false,
  },
  {
    "@context": "https://schema.org",
    "@type": "ImageObject",
    "@id": `${SITE_URL}/safety#badge-veteran`,
    url: `${SITE_URL}/images/compliance/veteran-owned.webp`,
    name: "MH Construction — Veteran-Owned Business",
    description:
      "Veteran-Owned business certified since January 2025. Army veteran Jeremy Thamert, owner and president.",
    width: 800,
    height: 600,
    representativeOfPage: false,
  },
  {
    "@context": "https://schema.org",
    "@type": "ImageObject",
    "@id": `${SITE_URL}/safety#badge-bbb`,
    url: `${SITE_URL}/images/credentials/bbb-accredited-seal.webp`,
    name: "MH Construction — BBB Accredited A+ Rating",
    description:
      "Better Business Bureau Accredited Business with A+ rating. Licensed general contractor in WA, OR, and ID.",
    width: 400,
    height: 400,
    representativeOfPage: false,
  },
] as const;

// Safety Program Schema for rich results
const safetySchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  "@id": `${SITE_URL}/safety#service`,
  name: "MISH — MH Construction Industrial Safety & Health Program",
  description:
    "MH Construction's written Safety Program (MISH) with 0.64 EMR performance, aligned with OSHA 29 CFR 1926, AGC CSEA expectations, and applicable WA/OR/ID requirements. AGC-WA Top EMR Award winner.",
  provider: {
    "@type": "Organization",
    "@id": `${SITE_URL}/#organization`,
    name: "MH Construction",
    url: SITE_URL,
  },
  serviceType: "Construction Safety Management",
  areaServed: [
    {
      "@type": "City",
      name: "Richland",
      containedInPlace: { "@type": "State", name: "Washington" },
    },
    {
      "@type": "City",
      name: "Kennewick",
      containedInPlace: { "@type": "State", name: "Washington" },
    },
    {
      "@type": "City",
      name: "Pasco",
      containedInPlace: { "@type": "State", name: "Washington" },
    },
    { "@type": "State", name: "Washington" },
    { "@type": "State", name: "Oregon" },
    { "@type": "State", name: "Idaho" },
  ],
  award: ["AGC-WA Top EMR Award", "0.64 Experience Modification Rate"],
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Safety Program Services",
    itemListElement: [
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Daily Toolbox Talks",
          description: "Pre-shift safety briefings recorded and logged",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Job Hazard Analysis",
          description: "Task-level hazard identification before critical work",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Site Safety Inspections",
          description: "Regular structured site walks with documented findings",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Incident Reporting",
          description: "Same-day near-miss and incident documentation",
        },
      },
    ],
  },
};

const EVIDENCE_CARDS = [
  {
    icon: "record_voice_over",
    title: "Daily Toolbox Talks",
    body: "Pre-shift safety briefings recorded and logged on every active jobsite. Digital submission via the Field Safety Hub — timestamped, superintendent-attributed, and archived.",
  },
  {
    icon: "playlist_add_check",
    title: "Job Hazard Analysis",
    body: "Task-level hazard identification completed before work begins on critical activities. JHAs are site-specific, supervisor-signed, and stored for owner/bonding review.",
  },
  {
    icon: "search",
    title: "Scheduled Site Inspections",
    body: "Regular structured site walks with documented findings and corrective actions. Photo-supported, digitally submitted, and tracked to completion.",
  },
  {
    icon: "report_problem",
    title: "Incident Reporting",
    body: "Near-miss and incident forms submitted same-day. Root-cause analysis required before work resumes. OSHA 300-series records maintained current and available.",
  },
] as const;

export default function SafetyPage() {
  const doc = getDocumentById("safety-manual");
  const revisionNumber = doc?.revisionNumber ?? "3";
  const revisionDate = doc?.revisionDate ?? "04/07/2026";
  const manualHref =
    doc?.pdfPath ?? "/resources/safety-program#manual-downloads";
  const programSectionCount = doc?.sections?.length ?? doc?.totalSections ?? 50;
  const firstSectionNumber = doc?.sections?.[0]?.number ?? "00";
  const lastSectionNumber =
    doc?.sections?.at(-1)?.number ??
    String(Math.max(programSectionCount - 1, 0)).padStart(2, "0");
  const programSectionRange = `${firstSectionNumber}-${lastSectionNumber}`;

  const credentialStats = [
    {
      value: "0.64",
      label: "EMR Rating",
      sub: "40% below industry avg",
      icon: "trending_down",
    },
    {
      value: String(programSectionCount),
      label: "Written Sections",
      sub: `MISH ${programSectionRange}`,
      icon: "menu_book",
    },
    {
      value: "AGC-WA",
      label: "Top EMR Awards",
      sub: "Multiple consecutive",
      icon: "workspace_premium",
    },
    {
      value: "100%",
      label: "Compliant",
      sub: "OSHA + state requirements",
      icon: "verified",
    },
    {
      value: `Rev ${revisionNumber}`,
      label: "Written Program",
      sub: `Updated ${revisionDate}`,
      icon: "shield",
    },
  ] as const;

  return (
    <>
      <PageTrackingClient pageName="Safety" />
      <StructuredData data={breadcrumbSchema} />
      <StructuredData data={safetySchema} />
      {credentialImageSchemas.map((schema) => (
        <StructuredData key={schema["@id"]} data={schema} />
      ))}

      <div className="bg-white dark:bg-gray-900 min-h-screen">
        {/* ── Hero ───────────────────────────────────────────────────────────── */}
        <section
          className="relative h-screen flex items-end justify-end text-white overflow-hidden"
          aria-labelledby="safety-hero-heading"
        >
          {/* Background photo */}
          <Image
            src="/images/safety/safety-culture.webp"
            alt="MH Construction safety briefing on an active jobsite"
            fill
            priority
            className="object-cover object-center"
            sizes="100vw"
          />
          {/* Dark overlay for readability */}
          <div
            className="absolute inset-0 bg-gradient-to-br from-brand-primary/30 via-gray-900/60 to-gray-900/80"
            aria-hidden="true"
          />

          {/* Bottom-right hero text */}
          <div className="relative z-30 mb-32 sm:mb-36 md:mb-40 lg:mb-44 mr-4 sm:mr-6 lg:mr-8 xl:mr-12 ml-auto max-w-2xl pointer-events-none pb-2">
            <h1
              id="safety-hero-heading"
              className="text-right text-base xs:text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-black text-white drop-shadow-2xl leading-tight tracking-tight"
            >
              {/* Dual Naming Format - Required per branding standards */}
              <span className="block text-brand-secondary/80 text-sm sm:text-base md:text-lg lg:text-xl font-normal mb-2">
                Safety HQ → Safety Program
              </span>
              {/* Page-specific mantra */}
              <span className="block text-brand-secondary text-xl sm:text-2xl md:text-3xl lg:text-4xl mb-4 font-black">
                Award-Winning Safety: 0.64 EMR, Zero Compromises
              </span>
              {/* Tagline with separators */}
              <span className="block text-brand-secondary">
                Zero-Incident Operations
              </span>
              <span className="block text-white/60">|</span>
              <span className="block text-white/95">
                Mission-Critical Safety Culture
              </span>
              <span className="block text-white/60">|</span>
              <span className="block text-brand-primary-light">
                {`0.64 EMR · ${programSectionCount}-Section Written Program`}
              </span>
              <span className="block text-white/60">|</span>
              <span className="block text-white/90">
                Building safely for the Client Partner,{" "}
                <span className="font-black italic text-brand-secondary">
                  every day
                </span>
              </span>
            </h1>
          </div>

          {/* Page-Specific Navigation */}
          <PageNavigation
            items={navigationConfigs.safety}
            className="absolute bottom-0 left-0 right-0"
          />
        </section>

        {/* Breadcrumb */}
        <Breadcrumb
          items={[{ label: "Home", href: "/" }, { label: "Safety Program" }]}
        />

        {/* ── Credentials — stats strip ───────────────────────────────────── */}
        <section
          id="credentials"
          className="relative bg-brand-primary py-12 sm:py-16 lg:py-20 xl:py-24 overflow-hidden"
          aria-labelledby="credentials-heading"
        >
          <div className="absolute inset-0 opacity-10">
            <DiagonalStripePattern />
          </div>

          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <FadeInWhenVisible>
              <h2 id="credentials-heading" className="sr-only">
                Safety Credentials and Performance Metrics
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
                {credentialStats.map(({ value, label, sub, icon }) => (
                  <div
                    key={label}
                    className="group flex flex-col items-center text-center bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 rounded-3xl p-5 sm:p-6 lg:p-8 transition-all duration-300 hover:shadow-2xl hover:-translate-y-1"
                  >
                    <MaterialIcon
                      icon={icon}
                      size="lg"
                      className="text-brand-secondary mb-2 group-hover:scale-110 transition-transform duration-300"
                    />
                    <span className="text-2xl sm:text-3xl font-black text-white leading-none">
                      {value}
                    </span>
                    <span className="text-sm font-bold text-white/90 mt-1">
                      {label}
                    </span>
                    <span className="text-xs text-white/60 mt-0.5">{sub}</span>
                  </div>
                ))}
              </div>
            </FadeInWhenVisible>
          </div>
        </section>

        {/* ── Credential Badges + MISH QR ─────────────────────────────────── */}
        <section
          id="credential-badges"
          className="relative bg-white dark:bg-gray-900 py-12 sm:py-16 lg:py-20 xl:py-24 overflow-hidden"
          aria-labelledby="credential-badges-heading"
        >
          <DiagonalStripePattern />
          <BrandColorBlobs />

          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <FadeInWhenVisible>
              <div className="text-center mb-10">
                <div className="inline-flex items-center gap-2 bg-brand-primary/10 dark:bg-brand-primary/20 border border-brand-primary/20 rounded-full px-4 py-1.5 mb-4">
                  <MaterialIcon
                    icon="workspace_premium"
                    size="sm"
                    className="text-brand-primary"
                  />
                  <span className="text-brand-primary dark:text-brand-secondary text-sm font-semibold uppercase tracking-wide">
                    Verified Credentials
                  </span>
                </div>
                <h2
                  id="credential-badges-heading"
                  className="font-black text-gray-900 dark:text-gray-100 text-3xl sm:text-4xl md:text-5xl leading-tight tracking-tight mb-4"
                >
                  <span className="block bg-gradient-to-r from-brand-primary via-brand-secondary to-brand-primary bg-clip-text text-transparent">
                    Licensed · Bonded · Insured · Veteran-Owned
                  </span>
                </h2>
                <p className="text-gray-600 dark:text-gray-300 text-lg max-w-2xl mx-auto">
                  Every credential below is verifiable. Click any badge to
                  confirm status directly with the issuing authority.
                </p>
              </div>

              {/* Compliance badge grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6 mb-12">
                {(
                  [
                    {
                      src: "/images/compliance/bonding.webp",
                      alt: "MH Construction surety bonding verification — licensed, bonded, and insured in WA, OR, ID",
                      label: "Surety Bonding",
                      href: "https://secure.lni.wa.gov/verify/",
                      verify: "Verify via L&I",
                    },
                    {
                      src: "/images/compliance/prevailing-wage.webp",
                      alt: "Washington State prevailing wage compliance — L&I certified payroll reporting",
                      label: "Prevailing Wage",
                      href: "https://secure.lni.wa.gov/verify/",
                      verify: "Verify via L&I",
                    },
                    {
                      src: "/images/compliance/safety.webp",
                      alt: "MH Construction OSHA safety compliance — 0.64 EMR, AGC-WA Top EMR Award",
                      label: "Safety Compliance",
                      href: "/safety#credentials",
                      verify: "View Program",
                    },
                    {
                      src: "/images/compliance/veteran-owned.webp",
                      alt: "Veteran-Owned business — Army veteran Jeremy Thamert, owner and president since January 2025",
                      label: "Veteran-Owned",
                      href: "/veterans",
                      verify: "Learn More",
                    },
                    {
                      src: "/images/credentials/bbb-accredited-seal.webp",
                      alt: "BBB Accredited Business A+ rating — Better Business Bureau accredited general contractor",
                      label: "BBB A+ Rated",
                      href: "https://www.bbb.org/us/wa/pasco/profile/general-contractor/mh-construction-inc-1296-1000145834",
                      verify: "Verify via BBB",
                    },
                  ] as const
                ).map(({ src, alt, label, href, verify }) => (
                  <a
                    key={label}
                    href={href}
                    target={href.startsWith("http") ? "_blank" : undefined}
                    rel={
                      href.startsWith("http")
                        ? "noopener noreferrer"
                        : undefined
                    }
                    className="group flex flex-col items-center gap-3 bg-gray-50 dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 hover:border-brand-primary dark:hover:border-brand-secondary rounded-2xl p-5 transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
                  >
                    <Image
                      src={src}
                      alt={alt}
                      width={120}
                      height={120}
                      className="object-contain max-h-24 group-hover:scale-105 transition-transform duration-300"
                      sizes="120px"
                    />
                    <span className="text-sm font-bold text-gray-800 dark:text-gray-200 text-center">
                      {label}
                    </span>
                    <span className="text-xs text-brand-primary dark:text-brand-secondary font-semibold">
                      {verify} →
                    </span>
                  </a>
                ))}
              </div>

              {/* Chamber logos */}
              <div className="border-t border-gray-200 dark:border-gray-700 pt-10">
                <p className="text-center text-sm font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-6">
                  Chamber Memberships
                </p>
                <div className="flex flex-wrap justify-center gap-8 items-center">
                  {(
                    [
                      {
                        src: "/images/credentials/Pasco-Chamber-logo-color-transparent.webp",
                        alt: "Pasco Chamber of Commerce member — MH Construction",
                        href: "https://www.pascochamber.org",
                        width: 140,
                        height: 60,
                      },
                      {
                        src: "/images/credentials/Richland-Chamber-logo-full-color.webp",
                        alt: "Richland Chamber of Commerce member — MH Construction",
                        href: "https://www.richlandchamber.com",
                        width: 140,
                        height: 60,
                      },
                      {
                        src: "/images/credentials/Kennewick-TriCity-Regional-Chamber-logo-horizontal.webp",
                        alt: "Tri-City Regional Chamber of Commerce member — MH Construction",
                        href: "https://www.tricityregionalchamber.com",
                        width: 180,
                        height: 60,
                      },
                    ] as const
                  ).map(({ src, alt, href, width, height }) => (
                    <a
                      key={src}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="opacity-70 hover:opacity-100 transition-opacity duration-300"
                    >
                      <Image
                        src={src}
                        alt={alt}
                        width={width}
                        height={height}
                        className="object-contain"
                        sizes={`${width}px`}
                      />
                    </a>
                  ))}
                </div>
              </div>

              {/* MISH QR Code callout */}
              <div className="mt-12 flex flex-col sm:flex-row items-center gap-8 bg-brand-primary/5 dark:bg-brand-primary/10 border border-brand-primary/20 rounded-3xl p-8">
                <div className="shrink-0">
                  <Image
                    src="/images/qr-codes/qr-safety-dashboard-color.webp"
                    alt="QR code to MH Construction MISH Safety Dashboard — scan to access the Field Safety Hub"
                    width={160}
                    height={160}
                    className="rounded-xl shadow-md"
                    sizes="160px"
                  />
                </div>
                <div>
                  <div className="inline-flex items-center gap-2 bg-brand-primary/10 border border-brand-primary/20 rounded-full px-3 py-1 mb-3">
                    <MaterialIcon
                      icon="qr_code_2"
                      size="sm"
                      className="text-brand-primary"
                    />
                    <span className="text-brand-primary text-xs font-semibold uppercase tracking-wide">
                      MISH Field Access
                    </span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-black text-gray-900 dark:text-gray-100 mb-2">
                    Instant Safety Dashboard Access
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 text-base leading-relaxed mb-4">
                    Scan this QR code to reach the MH Construction Field Safety
                    Hub — submit Toolbox Talks, JHAs, and Site Inspections
                    directly from the jobsite. All submissions are timestamped,
                    superintendent-attributed, and stored for bonding and owner
                    review.
                  </p>
                  <a
                    href="/hub"
                    className="inline-flex items-center gap-2 bg-brand-primary hover:bg-brand-primary-dark text-white font-bold px-5 py-2.5 rounded-xl transition-colors text-sm shadow"
                  >
                    <MaterialIcon icon="open_in_new" size="sm" />
                    Open Safety Hub
                  </a>
                </div>
              </div>
            </FadeInWhenVisible>
          </div>
        </section>

        {/* ── Written Program — program section ──────────────────────────── */}
        <section
          id="program"
          className="relative bg-white dark:bg-gray-900 py-12 sm:py-16 lg:py-20 xl:py-24 overflow-hidden"
          aria-labelledby="program-heading"
        >
          <DiagonalStripePattern />
          <BrandColorBlobs />

          <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="lg:grid lg:grid-cols-2 lg:gap-16 items-center">
              {/* Text */}
              <div>
                <div className="inline-flex items-center gap-2 bg-brand-primary/10 dark:bg-brand-primary/20 border border-brand-primary/20 rounded-full px-4 py-1.5 mb-5">
                  <MaterialIcon
                    icon="menu_book"
                    size="sm"
                    className="text-brand-primary"
                  />
                  <span className="text-brand-primary dark:text-brand-secondary text-sm font-semibold uppercase tracking-wide">
                    Written Safety Program
                  </span>
                </div>

                <h2
                  id="program-heading"
                  className="font-black text-gray-900 dark:text-gray-100 text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-relaxed tracking-tighter mb-6 overflow-visible"
                >
                  <span className="block mb-3 sm:mb-4 text-gray-700 dark:text-gray-200 text-xl xs:text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold tracking-tight overflow-visible py-1">
                    MISH — MH Construction
                  </span>
                  <span className="block bg-gradient-to-r from-brand-primary via-brand-secondary to-brand-primary bg-clip-text text-transparent font-black drop-shadow-sm overflow-visible py-2 pb-3 leading-normal">
                    Industrial Safety &amp; Health Program
                  </span>
                </h2>

                <p className="text-gray-700 dark:text-gray-300 text-lg leading-relaxed mb-6">
                  The{" "}
                  <strong className="text-gray-900 dark:text-white">
                    MH Construction Safety Program (MISH)
                  </strong>{" "}
                  is a fully authored, actively enforced,{" "}
                  {`${programSectionCount}-section`} written safety program
                  aligned with{" "}
                  <strong className="text-gray-900 dark:text-white">
                    OSHA 29 CFR 1926 and AGC CSEA expectations
                  </strong>{" "}
                  while supporting applicable WISHA/L&amp;I (WA), OAR (OR), and
                  IDAPA (ID) requirements. Legacy AGC APP references are
                  preserved in source material for continuity.
                </p>

                <div className="flex flex-wrap gap-3 mb-8 text-sm">
                  {[
                    {
                      icon: "calendar_today",
                      label: `Revision ${revisionNumber} — ${revisionDate}`,
                    },
                    { icon: "gpp_good", label: "OSHA 29 CFR 1926 Aligned" },
                    { icon: "verified", label: "AGC CSEA Aligned" },
                    {
                      icon: "map",
                      label: "WISHA (WA) · OAR (OR) · IDAPA (ID)",
                    },
                  ].map(({ icon, label }) => (
                    <span
                      key={label}
                      className="inline-flex items-center gap-1.5 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700 rounded-full px-3 py-1 font-medium"
                    >
                      <MaterialIcon
                        icon={icon}
                        size="sm"
                        className="text-brand-primary"
                      />
                      {label}
                    </span>
                  ))}
                </div>

                <div className="flex flex-wrap gap-3">
                  <a
                    href={manualHref}
                    download
                    className="inline-flex items-center gap-2 bg-brand-primary hover:bg-brand-primary-dark text-white font-bold px-6 py-3 rounded-xl transition-colors shadow-md"
                  >
                    <MaterialIcon icon="download" size="sm" />
                    Download Complete Manual
                  </a>
                  <Link
                    href="/resources/safety-program#field-forms"
                    className="inline-flex items-center gap-2 bg-brand-primary hover:bg-brand-primary-dark text-white font-bold px-6 py-3 rounded-xl transition-colors shadow-md"
                  >
                    <MaterialIcon icon="assignment" size="sm" />
                    Access Forms & Sections
                  </Link>
                  <Link
                    href="/resources/safety-program"
                    className="inline-flex items-center gap-2 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-200 font-bold px-6 py-3 rounded-xl border border-gray-200 dark:border-gray-700 transition-colors"
                  >
                    <MaterialIcon icon="open_in_new" size="sm" />
                    View Public Safety Resource Center
                  </Link>
                </div>
              </div>

              {/* Stats / highlight card */}
              <div className="mt-12 lg:mt-0">
                <div className="bg-gradient-to-br from-brand-primary to-brand-primary-dark rounded-3xl p-8 text-white shadow-2xl">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center">
                      <MaterialIcon
                        icon="shield_lock"
                        size="md"
                        className="text-white"
                      />
                    </div>
                    <div>
                      <p className="text-sm text-white/90 font-semibold uppercase tracking-wider">
                        Program At a Glance
                      </p>
                    </div>
                  </div>
                  <dl className="space-y-4">
                    {[
                      {
                        term: "Total Sections",
                        def: `${programSectionCount} (${programSectionRange})`,
                      },
                      {
                        term: "Current Revision",
                        def: `Rev ${revisionNumber} — ${revisionDate}`,
                      },
                      {
                        term: "Framework",
                        def: "OSHA 29 CFR 1926 + AGC CSEA alignment",
                      },
                      {
                        term: "Standards",
                        def: "OSHA 29 CFR 1926, WISHA, OAR, IDAPA",
                      },
                      {
                        term: "Distribution",
                        def: "All superintendents — MISH Field Hub",
                      },
                    ].map(({ term, def }) => (
                      <div
                        key={term}
                        className="flex justify-between gap-4 border-b border-white/10 pb-3 last:border-0 last:pb-0"
                      >
                        <dt className="text-sm text-white/70">{term}</dt>
                        <dd className="text-sm font-semibold text-right">
                          {def}
                        </dd>
                      </div>
                    ))}
                  </dl>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── Performance — AlternatingShowcase ──────────────────────────── */}
        <div id="performance">
          <SafetySection />
        </div>

        {/* ── Evidence — Active program use cards ────────────────────────── */}
        <section
          id="evidence"
          className="relative bg-white dark:bg-gray-900 py-12 sm:py-16 lg:py-20 xl:py-24 overflow-hidden"
          aria-labelledby="evidence-heading"
        >
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-16 sm:mb-20 text-center">
              {/* Icon with decorative lines */}
              <div className="flex items-center justify-center mb-8 gap-4">
                <div className="h-1 w-16 bg-gradient-to-r from-transparent to-gray-300 dark:to-gray-600 rounded-full"></div>
                <div className="relative">
                  <div className="absolute -inset-4 bg-gradient-to-br from-brand-primary/30 to-brand-primary-dark/30 blur-2xl rounded-full"></div>
                  <div className="relative bg-gradient-to-br from-brand-primary via-brand-primary-dark to-brand-primary-darker p-5 rounded-2xl shadow-2xl border-2 border-white/50 dark:border-gray-600">
                    <MaterialIcon
                      icon="fact_check"
                      size="2xl"
                      className="text-white drop-shadow-lg"
                    />
                  </div>
                </div>
                <div className="h-1 w-16 bg-gradient-to-l from-transparent to-gray-300 dark:to-gray-600 rounded-full"></div>
              </div>

              {/* Two-line gradient heading */}
              <h2
                id="evidence-heading"
                className="mb-6 sm:mb-8 font-black text-gray-900 dark:text-gray-100 text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-relaxed tracking-tighter overflow-visible"
              >
                <span className="block mb-3 sm:mb-4 font-semibold text-gray-700 dark:text-gray-200 text-xl xs:text-2xl sm:text-3xl md:text-4xl lg:text-5xl tracking-tight overflow-visible py-1">
                  Not a Shelf Document
                </span>
                <span className="block bg-gradient-to-r from-brand-primary via-brand-secondary to-brand-primary bg-clip-text text-transparent font-black drop-shadow-sm overflow-visible py-2 pb-3 leading-normal">
                  A Living Safety System
                </span>
              </h2>

              {/* Description */}
              <p className="mx-auto max-w-5xl font-light text-gray-700 dark:text-gray-300 text-base sm:text-lg md:text-xl lg:text-2xl leading-relaxed tracking-wide px-2">
                Every section of the safety manual is actively referenced and
                enforced on our jobsites — daily. Field submissions are digital,
                timestamped, and reviewable.
              </p>
            </div>

            <StaggeredFadeIn className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {EVIDENCE_CARDS.map(({ icon, title, body }) => (
                <div key={title} className="group relative flex h-full">
                  {/* Animated Border Glow */}
                  <div className="absolute -inset-2 bg-gradient-to-br from-brand-primary/40 to-brand-secondary/40 rounded-2xl opacity-20 group-hover:opacity-100 blur-xl transition-all duration-500 group-hover:animate-pulse"></div>

                  <div className="relative bg-white dark:bg-gray-900 rounded-xl border-2 border-gray-200 dark:border-gray-700 group-hover:border-transparent shadow-lg group-hover:shadow-2xl transition-all duration-300 group-hover:-translate-y-1 overflow-hidden flex flex-col w-full">
                    {/* Top Accent Bar */}
                    <div className="h-2 bg-gradient-to-r from-brand-primary via-brand-secondary to-bronze-700"></div>

                    <div className="p-6 flex flex-col flex-1">
                      <div className="relative inline-block mb-4">
                        <div className="absolute -inset-2 bg-gradient-to-br from-brand-primary/40 to-brand-secondary/40 opacity-30 blur-lg rounded-xl"></div>
                        <div className="relative rounded-xl bg-gradient-to-br from-brand-primary via-brand-secondary to-bronze-700 p-3 shadow-xl group-hover:scale-110 transition-all duration-300">
                          <MaterialIcon
                            icon={icon}
                            size="xl"
                            className="text-white drop-shadow-lg"
                            ariaLabel={title}
                          />
                        </div>
                      </div>
                      <h3 className="font-bold text-gray-900 dark:text-white text-lg sm:text-xl mb-2">
                        {title}
                      </h3>
                      <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 leading-relaxed">
                        {body}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </StaggeredFadeIn>
          </div>
        </section>

        {/* ── Compliance — badge grid ─────────────────────────────────────── */}
        <section
          id="compliance"
          className="relative bg-white dark:bg-gray-900 py-12 sm:py-16 lg:py-20 xl:py-24 overflow-hidden"
          aria-labelledby="compliance-heading"
        >
          <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
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
              <h2
                id="compliance-heading"
                className="mb-6 sm:mb-8 font-black text-gray-900 dark:text-gray-100 text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-relaxed tracking-tighter overflow-visible"
              >
                <span className="block mb-3 sm:mb-4 font-semibold text-gray-700 dark:text-gray-200 text-xl xs:text-2xl sm:text-3xl md:text-4xl lg:text-5xl tracking-tight overflow-visible py-1">
                  Standards We Meet
                </span>
                <span className="block bg-gradient-to-r from-brand-primary via-brand-secondary to-brand-primary bg-clip-text text-transparent font-black drop-shadow-sm overflow-visible py-2 pb-3 leading-normal">
                  Every Requirement. Every Project.
                </span>
              </h2>

              {/* Description */}
              <p className="mx-auto max-w-5xl font-light text-gray-700 dark:text-gray-300 text-base sm:text-lg md:text-xl lg:text-2xl leading-relaxed tracking-wide px-2">
                Full compliance with every standard relevant to public-sector,
                commercial, and federal construction — with documentation
                available for bonding agency review.
              </p>
            </div>
            <div className="flex flex-wrap justify-center gap-3 mb-12">
              <SafetyComplianceBadge variant="osha" />
              <SafetyComplianceBadge variant="agc" />
              <SafetyComplianceBadge variant="wisha" />
              <SafetyComplianceBadge variant="dot" />
              <SafetyComplianceBadge variant="pmbok" />
              <SafetyComplianceBadge variant="veteran" />
              <SafetyComplianceBadge variant="bbb" />
              <SafetyComplianceBadge variant="travelers" />
            </div>

            {/* Supporting compliance detail cards */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  icon: "gpp_good",
                  title: "OSHA 29 CFR 1926",
                  body: "Full written program aligned to all applicable construction standards. Annual review cycle with field validation.",
                },
                {
                  icon: "verified",
                  title: "AGC CSEA Criteria",
                  body: "Meets every evaluation threshold for the AGC Contractor Safety Evaluation. Multiple consecutive Top EMR Awards.",
                },
                {
                  icon: "shield",
                  title: "WISHA / L&I Compliance",
                  body: "Washington Industrial Safety and Health Act alignment. All sections current with state-specific requirements.",
                },
                {
                  icon: "local_shipping",
                  title: "DOT 49 CFR 382",
                  body: "Drug and alcohol testing program exceeds federal motor carrier requirements. Random testing pool maintained.",
                },
                {
                  icon: "schema",
                  title: "PMBOK Structured",
                  body: "Safety program management follows Project Management Body of Knowledge methodology — scope, schedule, risk controls.",
                },
                {
                  icon: "military_tech",
                  title: "Veteran-Owned Accountability",
                  body: "Military-grade discipline applied to every safety protocol. Chain-of-command accountability from field to executive.",
                },
                {
                  icon: "umbrella",
                  title: "Travelers Auto & Bonding",
                  body: "Comprehensive auto and bonding coverage through Travelers Insurance. Performance bonds, bid bonds, and payment bonds available for projects of all sizes.",
                },
                {
                  icon: "verified",
                  title: "BBB Accredited A+",
                  body: "Better Business Bureau A+ rating with accreditation since April 2026. Commitment to transparent business practices and Client Partner satisfaction.",
                },
              ].map(({ icon, title, body }) => (
                <div
                  key={title}
                  className="group flex items-start gap-4 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-5 hover:shadow-lg hover:border-brand-primary/30 transition-all duration-300"
                >
                  <div className="shrink-0 rounded-lg bg-gradient-to-br from-brand-primary to-brand-primary-dark p-2.5 shadow-md group-hover:scale-110 transition-transform duration-300">
                    <MaterialIcon
                      icon={icon}
                      size="md"
                      className="text-white"
                    />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 dark:text-white text-base mb-1">
                      {title}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                      {body}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Safety Snapshots Gallery ─────────────────────────────────── */}
        <section
          id="snapshots"
          className="relative bg-gray-50 dark:bg-gray-800 py-12 sm:py-16 lg:py-20 xl:py-24 overflow-hidden"
          aria-labelledby="snapshots-heading"
        >
          <div className="absolute inset-0 opacity-5">
            <DiagonalStripePattern />
          </div>

          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <FadeInWhenVisible>
              <div className="text-center mb-10">
                <div className="inline-flex items-center gap-2 bg-brand-primary/10 dark:bg-brand-primary/20 border border-brand-primary/20 rounded-full px-4 py-1.5 mb-4">
                  <MaterialIcon
                    icon="photo_camera"
                    size="sm"
                    className="text-brand-primary"
                  />
                  <span className="text-brand-primary dark:text-brand-secondary text-sm font-semibold uppercase tracking-wide">
                    Safety in Action
                  </span>
                </div>
                <h2
                  id="snapshots-heading"
                  className="font-black text-gray-900 dark:text-gray-100 text-3xl sm:text-4xl md:text-5xl leading-tight tracking-tight mb-4"
                >
                  <span className="block bg-gradient-to-r from-brand-primary via-brand-secondary to-brand-primary bg-clip-text text-transparent">
                    Safety Snapshots
                  </span>
                </h2>
                <p className="text-gray-600 dark:text-gray-300 text-lg max-w-2xl mx-auto">
                  Real jobsite moments captured by our superintendents — 100%
                  PPE compliance verified before every image is published. Every
                  snapshot has written Superintendent verification on file.
                </p>
              </div>

              {/* Snapshot grid — populated once photos are available */}
              <div
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
                aria-label="Safety snapshot photo gallery"
              >
                {/* Placeholder state — replace individual items as photos arrive */}
                {[1, 2, 3].map((n) => (
                  <div
                    key={n}
                    className="aspect-video rounded-2xl bg-gray-200 dark:bg-gray-700 border-2 border-dashed border-gray-300 dark:border-gray-600 flex flex-col items-center justify-center gap-3 text-center p-6"
                    aria-hidden="true"
                  >
                    <MaterialIcon
                      icon="photo_camera"
                      size="2xl"
                      className="text-gray-400 dark:text-gray-500"
                    />
                    <span className="text-sm text-gray-400 dark:text-gray-500 font-medium">
                      Safety Snapshot #{n}
                    </span>
                    <span className="text-xs text-gray-400 dark:text-gray-500">
                      Photo coming soon
                    </span>
                  </div>
                ))}
              </div>

              {/* Caption */}
              <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-6">
                All Safety Snapshots require written Superintendent verification
                — 100% PPE compliance confirmed at time of capture. Stored per
                safety documentation protocol.
              </p>
            </FadeInWhenVisible>
          </div>
        </section>

        {/* ── Staff Access CTA ────────────────────────────────────────────── */}
        <section
          className="relative bg-brand-primary py-12 sm:py-14 overflow-hidden"
          aria-label="Field staff access to Safety Hub"
        >
          <div className="absolute inset-0 opacity-10">
            <DiagonalStripePattern />
          </div>
          <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left">
            <div>
              <p className="text-white/90 text-sm font-semibold uppercase tracking-wider mb-1">
                Field Superintendents
              </p>
              <h2 className="text-2xl sm:text-3xl font-black text-white mb-2">
                Access the Field Safety Hub
              </h2>
              <p className="text-white/80 max-w-md">
                Download manual sections, submit Toolbox Talks, JHAs, and Site
                Inspections — all in one place. Your submission history, tracked
                and printable.
              </p>
            </div>
            <Link
              href="/hub"
              className="shrink-0 inline-flex items-center gap-2 bg-white text-brand-primary hover:bg-brand-secondary-text hover:text-white font-black px-8 py-4 rounded-2xl shadow-lg transition-all text-lg"
            >
              <MaterialIcon icon="lock_open" size="md" />
              Staff Sign In
            </Link>
          </div>
        </section>

        {/* Next Steps Section */}
        <NextStepsSection />
      </div>
    </>
  );
}
