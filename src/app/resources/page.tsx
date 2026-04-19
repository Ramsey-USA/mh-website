import type { Metadata } from "next";
import Link from "next/link";
import { PageTrackingClient } from "@/components/analytics";
import { MaterialIcon } from "@/components/icons/MaterialIcon";
import {
  FadeInWhenVisible,
  StaggeredFadeIn,
} from "@/components/animations/FramerMotionComponents";
import { Breadcrumb } from "@/components/navigation/Breadcrumb";
import { NextStepsSection } from "@/components/shared-sections";
import { StructuredData } from "@/components/seo/SeoMeta";
import {
  DiagonalStripePattern,
  BrandColorBlobs,
} from "@/components/ui/backgrounds";
import { generateBreadcrumbSchema } from "@/lib/seo/breadcrumb-schema";
import { SafetyComplianceBadge } from "@/components/resources/SafetyComplianceBadge";
import { manuals, forms } from "@/lib/data/documents";
import { DownloadGate } from "@/components/pwa";

export const metadata: Metadata = {
  title: "Field Resources | MH Construction",
  description:
    "Download MH Construction's Safety Manual, toolbox talk forms, JHA templates, equipment checklists, and all field documentation. Founded 2010, Veteran-Owned Since January 2025. Consistent branding on and off the job site.",
  openGraph: {
    title: "Field Resources | MH Construction",
    description:
      "Safety manuals, toolbox talks, and field forms from a Veteran-Owned Since January 2025 Tri-State licensed construction team with Tri-Cities headquarters — branded and ready to print.",
    url: "https://www.mhc-gc.com/resources",
  },
};

const breadcrumbSchema = generateBreadcrumbSchema([
  { name: "Home", url: "https://www.mhc-gc.com" },
  { name: "Resources", url: "https://www.mhc-gc.com/resources" },
]);

export default function ResourcesPage() {
  return (
    <>
      <PageTrackingClient pageName="resources" />
      <StructuredData data={breadcrumbSchema} />

      <div className="relative min-h-screen bg-gradient-to-b from-white via-gray-50 to-white dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        <DiagonalStripePattern />
        <BrandColorBlobs />

        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20">
          <Breadcrumb
            items={[
              { label: "Home", href: "/" },
              { label: "Resources", href: "/resources" },
            ]}
          />

          {/* Hero */}
          <FadeInWhenVisible>
            <div className="text-center mb-14">
              <div className="inline-flex items-center gap-2 bg-brand-primary/10 dark:bg-brand-primary/20 border border-brand-primary/20 rounded-full px-4 py-1.5 mb-5">
                <MaterialIcon
                  icon="folder_open"
                  size="sm"
                  className="text-brand-primary"
                />
                <span className="text-brand-primary dark:text-brand-secondary text-sm font-semibold tracking-wide uppercase">
                  Field Intel
                </span>
              </div>
              <h1 className="text-lg xs:text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-black text-gray-900 dark:text-white mb-4 leading-tight tracking-tight">
                Field{" "}
                <span className="bg-gradient-to-r from-brand-primary to-brand-primary-light bg-clip-text text-transparent">
                  Resources
                </span>
              </h1>
              <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto leading-relaxed">
                Every manual, form, and field document used by MH Construction —
                branded, versioned, and ready to print or download.
              </p>
            </div>
          </FadeInWhenVisible>

          {/* Bonding & Insurance Agency CTA */}
          <Link
            href="/safety"
            className="group flex items-start sm:items-center gap-5 bg-gradient-to-r from-brand-primary/8 to-brand-primary/4 dark:from-brand-primary/20 dark:to-brand-primary/10 border border-brand-primary/25 dark:border-brand-primary/40 rounded-2xl p-5 sm:p-6 mb-10 hover:border-brand-primary hover:shadow-lg transition-all duration-300"
          >
            <div className="flex-shrink-0 w-12 h-12 bg-brand-primary rounded-xl flex items-center justify-center shadow-md group-hover:scale-110 transition-transform duration-200">
              <MaterialIcon
                icon="shield_lock"
                size="md"
                className="text-white"
              />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap mb-1">
                <h2 className="text-base font-bold text-brand-primary dark:text-brand-secondary">
                  For Bonding &amp; Insurance Agencies
                </h2>
                <span className="text-xs font-semibold bg-brand-primary text-white rounded-full px-2.5 py-0.5">
                  New
                </span>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                View our OSHA 29 CFR 1926-compliant, AGC CSEA–aligned,
                PMBOK-structured safety program overview — with compliance
                credentials, section mapping, and direct PDF access for owner
                pre-qualification and surety review.
              </p>
              <div className="flex flex-wrap gap-2 mt-3">
                <SafetyComplianceBadge variant="osha" />
                <SafetyComplianceBadge variant="agc" />
                <SafetyComplianceBadge variant="pmbok" />
                <SafetyComplianceBadge variant="veteran" />
                <SafetyComplianceBadge variant="bbb" />
              </div>
            </div>
            <MaterialIcon
              icon="arrow_forward"
              size="md"
              className="text-brand-primary flex-shrink-0 group-hover:translate-x-1 transition-transform duration-200 hidden sm:block"
            />
          </Link>

          {/* Manuals */}
          <div className="mb-12">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-8 bg-brand-primary rounded-lg flex items-center justify-center">
                <MaterialIcon
                  icon="menu_book"
                  size="sm"
                  className="text-white"
                />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                Safety &amp; Program Manuals
              </h2>
            </div>

            <div className="grid gap-5">
              <StaggeredFadeIn>
                {manuals.map((doc) => (
                  <Link
                    key={doc.id}
                    href={
                      doc.id === "safety-manual"
                        ? "/safety"
                        : `/resources/${doc.id}`
                    }
                    className="group flex items-start gap-5 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-5 sm:p-6 hover:border-brand-primary dark:hover:border-brand-secondary hover:shadow-lg transition-all duration-300"
                  >
                    {doc.id === "safety-manual" && (
                      <span className="sr-only">Safety Manual</span>
                    )}
                    <div className="flex-shrink-0 w-12 h-12 bg-brand-primary/10 dark:bg-brand-primary/20 rounded-xl flex items-center justify-center group-hover:bg-brand-primary group-hover:text-white transition-all duration-300">
                      <MaterialIcon
                        icon={doc.icon}
                        size="md"
                        className="text-brand-primary group-hover:text-white transition-colors duration-300"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-3 flex-wrap">
                        <div>
                          <h3 className="text-lg font-bold text-gray-900 dark:text-white group-hover:text-brand-primary dark:group-hover:text-brand-secondary transition-colors">
                            {doc.title}
                          </h3>
                          {doc.subtitle && (
                            <p className="text-sm text-brand-secondary dark:text-brand-secondary-light font-medium mt-0.5">
                              {doc.subtitle}
                            </p>
                          )}
                        </div>
                        <div className="flex items-center gap-2 flex-shrink-0">
                          {doc.totalSections && (
                            <span className="text-xs bg-brand-primary/10 text-brand-primary dark:text-brand-primary-light font-semibold px-2.5 py-1 rounded-full">
                              {doc.totalSections} sections
                            </span>
                          )}
                          {doc.totalPages && (
                            <span className="text-xs bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 font-medium px-2.5 py-1 rounded-full">
                              ~{doc.totalPages} pages
                            </span>
                          )}
                          <span className="text-xs bg-amber-50 dark:bg-amber-900/20 text-amber-700 dark:text-amber-400 font-medium px-2.5 py-1 rounded-full">
                            Rev. {doc.revisionYear}
                          </span>
                        </div>
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mt-2 leading-relaxed line-clamp-2">
                        {doc.description}
                      </p>
                      <div className="flex items-center gap-1.5 mt-3 text-brand-primary dark:text-brand-secondary text-sm font-semibold">
                        <span>View all sections</span>
                        <MaterialIcon
                          icon="arrow_forward"
                          size="sm"
                          className="group-hover:translate-x-1 transition-transform duration-200"
                        />
                      </div>
                    </div>
                  </Link>
                ))}
              </StaggeredFadeIn>
            </div>
          </div>

          {/* Forms */}
          <div className="mb-16">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-8 bg-brand-bronze rounded-lg flex items-center justify-center">
                <MaterialIcon
                  icon="description"
                  size="sm"
                  className="text-white"
                />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                Field Forms
              </h2>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <StaggeredFadeIn>
                {forms.map((doc) => (
                  <div
                    key={doc.id}
                    className="flex flex-col bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-5 hover:border-brand-bronze dark:hover:border-brand-secondary hover:shadow-md transition-all duration-300"
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 bg-brand-bronze/10 dark:bg-brand-bronze/20 rounded-lg flex items-center justify-center flex-shrink-0">
                        <MaterialIcon
                          icon={doc.icon}
                          size="sm"
                          className="text-brand-bronze dark:text-brand-secondary"
                        />
                      </div>
                      <div>
                        <h3 className="text-base font-bold text-gray-900 dark:text-white leading-tight">
                          {doc.title}
                        </h3>
                        {doc.subtitle && (
                          <p className="text-xs text-brand-secondary-text dark:text-brand-secondary font-medium">
                            {doc.subtitle}
                          </p>
                        )}
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed flex-1 mb-4">
                      {doc.description}
                    </p>
                    <div className="flex items-center justify-between pt-3 border-t border-gray-100 dark:border-gray-700">
                      <div className="flex gap-1.5 flex-wrap">
                        {doc.tags.slice(0, 2).map((tag) => (
                          <span
                            key={tag}
                            className="text-xs bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400 px-2 py-0.5 rounded-full"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                      {doc.pdfPath ? (
                        <DownloadGate>
                          <a
                            href={doc.pdfPath}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand-primary dark:text-brand-secondary hover:text-brand-primary-dark dark:hover:text-brand-secondary-light transition-colors"
                          >
                            <MaterialIcon icon="download" size="sm" />
                            Download PDF
                          </a>
                        </DownloadGate>
                      ) : (
                        <span className="text-xs text-gray-400 dark:text-gray-500">
                          Coming soon
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </StaggeredFadeIn>
            </div>
          </div>

          <NextStepsSection />
        </div>
      </div>
    </>
  );
}
