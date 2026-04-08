import type { Metadata } from "next";
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

export const metadata: Metadata = {
  title: "Safety Program Overview | MH Construction",
  description:
    "MH Construction's OSHA 29 CFR 1926-compliant Industrial Safety and Health (MISH) Program — 44 sections, AGC CSEA aligned, and PMBOK-structured. Ideal for bonding agency review and bid qualification.",
  openGraph: {
    title: "Safety Program Overview | MH Construction",
    description:
      "44-section OSHA-compliant safety program with AGC CSEA alignment, PMBOK integration, and full documentation — for bonding agencies, SURETYs, and owner pre-qualification.",
    url: "https://www.mhc-gc.com/resources/safety-program",
  },
};

const breadcrumbSchema = generateBreadcrumbSchema([
  { name: "Home", url: "https://www.mhc-gc.com" },
  { name: "Resources", url: "https://www.mhc-gc.com/resources" },
  {
    name: "Safety Program",
    url: "https://www.mhc-gc.com/resources/safety-program",
  },
]);

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

      <div className="relative min-h-screen bg-gradient-to-b from-white via-gray-50 to-white dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        <DiagonalStripePattern />
        <BrandColorBlobs />

        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20">
          <Breadcrumb
            items={[
              { label: "Home", href: "/" },
              { label: "Resources", href: "/resources" },
              { label: "Safety Program", href: "/resources/safety-program" },
            ]}
          />

          {/* Hero */}
          <FadeInWhenVisible>
            <div className="mb-12">
              <Link
                href="/resources"
                className="inline-flex items-center gap-1.5 text-sm text-brand-primary dark:text-brand-secondary hover:underline mb-5"
              >
                <MaterialIcon icon="arrow_back" size="sm" />
                Back to Resources
              </Link>

              <div className="inline-flex items-center gap-2 bg-brand-primary/10 dark:bg-brand-primary/20 border border-brand-primary/20 rounded-full px-4 py-1.5 mb-5">
                <MaterialIcon
                  icon="shield_lock"
                  size="sm"
                  className="text-brand-primary"
                />
                <span className="text-brand-primary dark:text-brand-secondary text-sm font-semibold tracking-wide uppercase">
                  For Bonding &amp; Insurance Agencies
                </span>
              </div>

              <h1 className="text-4xl sm:text-5xl font-black text-gray-900 dark:text-white leading-tight mb-4">
                Safety Program{" "}
                <span className="bg-gradient-to-r from-brand-primary to-brand-primary-light bg-clip-text text-transparent">
                  Overview
                </span>
              </h1>
              <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl leading-relaxed mb-6">
                MH Construction&apos;s comprehensive Industrial Safety and
                Health (MISH) Program — formally the Accident Prevention Program
                (APP) — is fully documented, actively enforced, and updated
                annually. All 44 sections align with OSHA 29 CFR 1926
                construction standards, AGC CSEA criteria, and PMBOK project
                management knowledge areas.
              </p>

              {/* Compliance badge strip */}
              <div className="flex flex-wrap gap-2">
                <SafetyComplianceBadge variant="osha" />
                <SafetyComplianceBadge variant="agc" />
                <SafetyComplianceBadge variant="wisha" />
                <SafetyComplianceBadge variant="pmbok" />
                <SafetyComplianceBadge variant="dot" />
                <SafetyComplianceBadge variant="veteran" />
              </div>
            </div>
          </FadeInWhenVisible>

          {/* Stats row */}
          <FadeInWhenVisible>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-12">
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
                  className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-4 flex flex-col items-center text-center"
                >
                  <MaterialIcon
                    icon={icon}
                    size="md"
                    className="text-brand-primary mb-1"
                  />
                  <span className="text-2xl font-black text-gray-900 dark:text-white">
                    {value}
                  </span>
                  <span className="text-xs text-gray-500 dark:text-gray-400 font-medium">
                    {label}
                  </span>
                </div>
              ))}
            </div>
          </FadeInWhenVisible>

          {/* Primary download CTA */}
          <FadeInWhenVisible>
            <div className="bg-gradient-to-r from-brand-primary-dark to-brand-primary rounded-2xl p-6 mb-12 flex items-center justify-between gap-4 flex-wrap shadow-lg">
              <div className="text-white">
                <h2 className="text-xl font-bold mb-1">
                  Download the Full Safety Program
                </h2>
                <p className="text-brand-secondary-light text-sm opacity-90">
                  Table of Contents PDF · All 44 section titles &amp; page
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

          {/* Credential cards */}
          <FadeInWhenVisible>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-5 flex items-center gap-2">
              <MaterialIcon
                icon="verified_user"
                size="md"
                className="text-brand-primary"
              />
              Compliance Credentials
            </h2>
          </FadeInWhenVisible>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-12">
            <StaggeredFadeIn>
              {CREDENTIAL_CARDS.map(
                ({ icon, label, sub, colorClass, bgClass }) => (
                  <div
                    key={label}
                    className={`flex items-center gap-4 rounded-xl border border-gray-200 dark:border-gray-700 p-5 ${bgClass}`}
                  >
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-white dark:bg-gray-900 shadow-sm flex-shrink-0">
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

          {/* PMBOK mapping table */}
          <FadeInWhenVisible>
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2 flex items-center gap-2">
                <MaterialIcon
                  icon="schema"
                  size="md"
                  className="text-purple-600 dark:text-purple-400"
                />
                PMBOK Knowledge Area Alignment
              </h2>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-5">
                MH Construction&apos;s safety program maps directly to PMBOK
                Guide knowledge areas, demonstrating integrated project
                management maturity.
              </p>

              <div className="overflow-x-auto rounded-xl border border-gray-200 dark:border-gray-700">
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
            </div>
          </FadeInWhenVisible>

          {/* Field Staff Hub callout */}
          <FadeInWhenVisible>
            <Link
              href="/safety"
              className="group flex items-start sm:items-center gap-5 bg-gradient-to-r from-brand-primary/8 to-brand-primary/4 dark:from-brand-primary/20 dark:to-brand-primary/10 border border-brand-primary/25 dark:border-brand-primary/40 rounded-2xl p-5 sm:p-6 mb-6 hover:border-brand-primary hover:shadow-lg transition-all duration-300"
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
            <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl p-6 flex items-start gap-5 flex-wrap">
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
                  experience modification rate (EMR) history, OSHA 300 logs, or
                  custom safety program attestations.
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
      </div>
    </>
  );
}
