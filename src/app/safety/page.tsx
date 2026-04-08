import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import { MaterialIcon } from "@/components/icons/MaterialIcon";
import { PageNavigation } from "@/components/navigation/PageNavigation";
import { navigationConfigs } from "@/components/navigation/navigationConfigs";
import { FadeInWhenVisible, StaggeredFadeIn } from "@/components/animations/FramerMotionComponents";
import {
  DiagonalStripePattern,
  BrandColorBlobs,
} from "@/components/ui/backgrounds";
import { SafetyComplianceBadge } from "@/components/resources/SafetyComplianceBadge";
import { StructuredData } from "@/components/seo/SeoMeta";
import { generateBreadcrumbSchema } from "@/lib/seo/breadcrumb-schema";
import { getDocumentById } from "@/lib/data/documents";
import { PageTrackingClient } from "@/components/analytics";

// Below-fold components: lazy-loaded for performance
const SafetySection = dynamic(() =>
  import("@/components/about").then((m) => ({ default: m.SafetySection })),
);

const breadcrumbSchema = generateBreadcrumbSchema([
  { name: "Home", url: "https://www.mhc-gc.com" },
  { name: "Safety Program", url: "https://www.mhc-gc.com/safety" },
]);

const CREDENTIAL_STATS = [
  { value: "0.64", label: "EMR Rating", sub: "40% below industry avg", icon: "trending_down" },
  { value: "44", label: "OSHA Sections", sub: "29 CFR 1926", icon: "menu_book" },
  { value: "AGC-WA", label: "Top EMR Awards", sub: "Multiple consecutive", icon: "workspace_premium" },
  { value: "100%", label: "Compliant", sub: "All regulatory standards", icon: "verified" },
  { value: "Rev 2", label: "Written Program", sub: "Updated 04/07/2026", icon: "shield" },
] as const;

const EVIDENCE_CARDS = [
  {
    icon: "record_voice_over",
    title: "Daily Toolbox Talks",
    body:
      "Pre-shift safety briefings recorded and logged on every active jobsite. Digital submission via the Field Safety Hub — timestamped, superintendent-attributed, and archived.",
  },
  {
    icon: "playlist_add_check",
    title: "Job Hazard Analysis",
    body:
      "Task-level hazard identification completed before work begins on critical activities. JHAs are site-specific, supervisor-signed, and stored for owner/bonding review.",
  },
  {
    icon: "search",
    title: "Scheduled Site Inspections",
    body:
      "Regular structured site walks with documented findings and corrective actions. Photo-supported, digitally submitted, and tracked to completion.",
  },
  {
    icon: "report_problem",
    title: "Incident Reporting",
    body:
      "Near-miss and incident forms submitted same-day. Root-cause analysis required before work resumes. OSHA 300-series records maintained current and available.",
  },
] as const;

export default function SafetyPage() {
  const doc = getDocumentById("safety-manual");
  const revisionNumber = doc?.revisionNumber ?? "2";
  const revisionDate = doc?.revisionDate ?? "04/07/2026";

  return (
    <>
      <PageTrackingClient pageName="Safety" />
      <StructuredData data={breadcrumbSchema} />

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
            className="absolute inset-0 bg-gradient-to-br from-brand-primary/60 via-gray-900/60 to-gray-900/80"
            aria-hidden="true"
          />

          {/* Bottom-right hero text */}
          <div className="relative z-30 mb-32 sm:mb-36 md:mb-40 lg:mb-44 mr-4 sm:mr-6 lg:mr-8 xl:mr-12 ml-auto max-w-2xl pointer-events-none pb-2">
            <div className="flex justify-end mb-4">
              <div className="relative p-4 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm rounded-2xl border-2 border-white/30 shadow-2xl">
                <MaterialIcon
                  icon="shield"
                  size="4xl"
                  className="text-white drop-shadow-lg"
                  ariaLabel="Safety Program — Zero-incident culture"
                />
              </div>
            </div>
            <h1
              id="safety-hero-heading"
              className="text-right text-base xs:text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-bold text-white drop-shadow-2xl leading-relaxed"
            >
              <span className="block text-brand-secondary-text text-sm xs:text-base sm:text-lg md:text-xl lg:text-2xl mb-1">
                Force Protection → Safety Program
              </span>
              <span className="block text-brand-secondary">
                Documented. Proven. Award-Winning.
              </span>
              <span className="block text-brand-primary">
                0.64 EMR · 44-Section OSHA Written Program
              </span>
              <span className="block text-white/90">
                Building safely for the client,{" "}
                <span className="font-black italic text-brand-secondary">every day</span>
              </span>
            </h1>
          </div>

          {/* Page-Specific Navigation */}
          <PageNavigation
            items={navigationConfigs.safety}
            className="absolute bottom-0 left-0 right-0"
          />
        </section>

        {/* ── Credentials — stats strip ───────────────────────────────────── */}
        <section
          id="credentials"
          className="relative bg-brand-primary py-12 sm:py-16 overflow-hidden"
          aria-labelledby="credentials-heading"
        >
          <div className="absolute inset-0 opacity-10">
            <DiagonalStripePattern />
          </div>

          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <FadeInWhenVisible>
              <h2
                id="credentials-heading"
                className="sr-only"
              >
                Safety Credentials and Performance Metrics
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
                {CREDENTIAL_STATS.map(({ value, label, sub, icon }) => (
                  <div
                    key={label}
                    className="flex flex-col items-center text-center bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-5"
                  >
                    <MaterialIcon icon={icon} size="lg" className="text-brand-secondary mb-2" />
                    <span className="text-2xl sm:text-3xl font-black text-white leading-none">
                      {value}
                    </span>
                    <span className="text-sm font-bold text-brand-secondary mt-1">{label}</span>
                    <span className="text-xs text-white/60 mt-0.5">{sub}</span>
                  </div>
                ))}
              </div>
            </FadeInWhenVisible>
          </div>
        </section>

        {/* ── Written Program — program section ──────────────────────────── */}
        <section
          id="program"
          className="relative bg-white dark:bg-gray-900 py-16 sm:py-20 lg:py-24 overflow-hidden"
          aria-labelledby="program-heading"
        >
          <DiagonalStripePattern />
          <BrandColorBlobs />

          <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <FadeInWhenVisible>
              <div className="lg:grid lg:grid-cols-2 lg:gap-16 items-center">
                {/* Text */}
                <div>
                  <div className="inline-flex items-center gap-2 bg-brand-primary/10 dark:bg-brand-primary/20 border border-brand-primary/20 rounded-full px-4 py-1.5 mb-5">
                    <MaterialIcon icon="menu_book" size="sm" className="text-brand-primary" />
                    <span className="text-brand-primary dark:text-brand-secondary text-sm font-semibold uppercase tracking-wide">
                      Written Safety Program
                    </span>
                  </div>

                  <h2
                    id="program-heading"
                    className="font-black text-gray-900 dark:text-white text-3xl sm:text-4xl md:text-5xl leading-tight mb-6 overflow-visible"
                  >
                    <span className="block mb-2 text-gray-700 dark:text-gray-300 text-xl sm:text-2xl font-semibold overflow-visible py-1">
                      AISH Program
                    </span>
                    <span className="block bg-gradient-to-r from-brand-primary via-brand-secondary to-brand-primary bg-clip-text text-transparent overflow-visible py-1 pb-2">
                      44 Sections. Fully Documented.
                    </span>
                  </h2>

                  <p className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed mb-6">
                    The MH Construction{" "}
                    <strong className="text-gray-900 dark:text-white">
                      Accident, Injury, Safety, and Health (AISH) Program
                    </strong>{" "}
                    is a fully authored, actively enforced, 44-section written safety manual
                    aligned with OSHA 29&nbsp;CFR&nbsp;1926 construction standards and
                    AGC-WA Contractor Safety Evaluation criteria.
                  </p>

                  <div className="flex flex-wrap gap-3 mb-8 text-sm">
                    {[
                      { icon: "calendar_today", label: `Revision ${revisionNumber} — ${revisionDate}` },
                      { icon: "gpp_good", label: "OSHA 29 CFR 1926 Aligned" },
                      { icon: "verified", label: "AGC CSEA Compliant" },
                      { icon: "schema", label: "PMBOK Structured" },
                    ].map(({ icon, label }) => (
                      <span
                        key={label}
                        className="inline-flex items-center gap-1.5 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700 rounded-full px-3 py-1 font-medium"
                      >
                        <MaterialIcon icon={icon} size="sm" className="text-brand-primary" />
                        {label}
                      </span>
                    ))}
                  </div>

                  <div className="flex flex-wrap gap-3">
                    <Link
                      href="/resources/safety-program"
                      className="inline-flex items-center gap-2 bg-brand-primary hover:bg-brand-primary-dark text-white font-bold px-6 py-3 rounded-xl transition-colors shadow-md"
                    >
                      <MaterialIcon icon="open_in_new" size="sm" />
                      View Full Program Overview
                    </Link>
                    <Link
                      href="/contact"
                      className="inline-flex items-center gap-2 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-200 font-bold px-6 py-3 rounded-xl border border-gray-200 dark:border-gray-700 transition-colors"
                    >
                      <MaterialIcon icon="send" size="sm" />
                      Request Documentation
                    </Link>
                  </div>
                </div>

                {/* Stats / highlight card */}
                <div className="mt-12 lg:mt-0">
                  <div className="bg-gradient-to-br from-brand-primary to-brand-primary-dark rounded-3xl p-8 text-white shadow-2xl">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center">
                        <MaterialIcon icon="shield_lock" size="md" className="text-white" />
                      </div>
                      <div>
                        <p className="text-sm text-brand-secondary font-semibold uppercase tracking-wider">
                          Program At a Glance
                        </p>
                      </div>
                    </div>
                    <dl className="space-y-4">
                      {[
                        { term: "Total Sections", def: "44 (including all OSHA-required)" },
                        { term: "Current Revision", def: `Rev ${revisionNumber} — ${revisionDate}` },
                        { term: "Standards Alignment", def: "OSHA 29 CFR 1926, AGC CSEA, WISHA" },
                        { term: "Annual Review Cycle", def: "Full revision + field validation" },
                        { term: "Distribution", def: "All superintendents — Field Safety Hub" },
                      ].map(({ term, def }) => (
                        <div key={term} className="flex justify-between gap-4 border-b border-white/10 pb-3 last:border-0 last:pb-0">
                          <dt className="text-sm text-white/70">{term}</dt>
                          <dd className="text-sm font-semibold text-right">{def}</dd>
                        </div>
                      ))}
                    </dl>
                  </div>
                </div>
              </div>
            </FadeInWhenVisible>
          </div>
        </section>

        {/* ── Performance — AlternatingShowcase ──────────────────────────── */}
        <div id="performance">
          <SafetySection />
        </div>

        {/* ── Evidence — Active program use cards ────────────────────────── */}
        <section
          id="evidence"
          className="relative bg-gray-50 dark:bg-gray-800 py-16 sm:py-20 lg:py-24 overflow-hidden"
          aria-labelledby="evidence-heading"
        >
          <DiagonalStripePattern />

          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <FadeInWhenVisible>
              <div className="text-center mb-12">
                <div className="inline-flex items-center gap-2 bg-brand-primary/10 dark:bg-brand-primary/20 border border-brand-primary/20 rounded-full px-4 py-1.5 mb-4">
                  <MaterialIcon icon="fact_check" size="sm" className="text-brand-primary" />
                  <span className="text-brand-primary dark:text-brand-secondary text-sm font-semibold uppercase tracking-wide">
                    Active Daily Use
                  </span>
                </div>
                <h2
                  id="evidence-heading"
                  className="font-black text-gray-900 dark:text-white text-3xl sm:text-4xl md:text-5xl leading-tight mb-4 overflow-visible"
                >
                  <span className="block mb-2 text-gray-700 dark:text-gray-300 text-xl sm:text-2xl font-semibold overflow-visible py-1">
                    Not a Shelf Document
                  </span>
                  <span className="block bg-gradient-to-r from-brand-primary via-brand-secondary to-brand-primary bg-clip-text text-transparent overflow-visible py-1 pb-2">
                    A Living Safety System
                  </span>
                </h2>
                <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto text-lg">
                  Every section of the safety manual is actively referenced and enforced on our
                  jobsites — daily. Field submissions are digital, timestamped, and reviewable.
                </p>
              </div>
            </FadeInWhenVisible>

            <StaggeredFadeIn className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {EVIDENCE_CARDS.map(({ icon, title, body }) => (
                <div
                  key={title}
                  className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="w-10 h-10 bg-brand-primary/10 dark:bg-brand-primary/20 rounded-xl flex items-center justify-center mb-4">
                    <MaterialIcon icon={icon} size="md" className="text-brand-primary" />
                  </div>
                  <h3 className="font-bold text-gray-900 dark:text-white mb-2">{title}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">{body}</p>
                </div>
              ))}
            </StaggeredFadeIn>
          </div>
        </section>

        {/* ── Compliance — badge grid ─────────────────────────────────────── */}
        <section
          id="compliance"
          className="relative bg-white dark:bg-gray-900 py-16 sm:py-20 lg:py-24 overflow-hidden"
          aria-labelledby="compliance-heading"
        >
          <BrandColorBlobs />

          <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <FadeInWhenVisible>
              <div className="text-center mb-10">
                <h2
                  id="compliance-heading"
                  className="font-black text-gray-900 dark:text-white text-3xl sm:text-4xl md:text-5xl leading-tight mb-4 overflow-visible"
                >
                  <span className="block mb-2 text-gray-700 dark:text-gray-300 text-xl sm:text-2xl font-semibold overflow-visible py-1">
                    Standards We Meet
                  </span>
                  <span className="block bg-gradient-to-r from-brand-primary via-brand-secondary to-brand-primary bg-clip-text text-transparent overflow-visible py-1 pb-2">
                    Every Requirement. Every Project.
                  </span>
                </h2>
                <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                  Full compliance with every standard relevant to public-sector, commercial, and
                  federal construction — with documentation available for bonding agency review.
                </p>
              </div>
              <div className="flex flex-wrap justify-center gap-3">
                <SafetyComplianceBadge variant="osha" />
                <SafetyComplianceBadge variant="agc" />
                <SafetyComplianceBadge variant="wisha" />
                <SafetyComplianceBadge variant="dot" />
                <SafetyComplianceBadge variant="pmbok" />
                <SafetyComplianceBadge variant="veteran" />
              </div>
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
              <p className="text-brand-secondary text-sm font-semibold uppercase tracking-wider mb-1">
                Field Superintendents
              </p>
              <h2 className="text-2xl sm:text-3xl font-black text-white mb-2">
                Access the Field Safety Hub
              </h2>
              <p className="text-white/80 max-w-md">
                Download manual sections, submit Toolbox Talks, JHAs, and Site Inspections —
                all in one place. Your submission history, tracked and printable.
              </p>
            </div>
            <Link
              href="/safety/hub"
              className="shrink-0 inline-flex items-center gap-2 bg-white text-brand-primary hover:bg-brand-secondary hover:text-white font-black px-8 py-4 rounded-2xl shadow-lg transition-all text-lg"
            >
              <MaterialIcon icon="lock_open" size="md" />
              Staff Sign In
            </Link>
          </div>
        </section>
      </div>
    </>
  );
}
