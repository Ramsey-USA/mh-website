import type { Metadata } from "next";
import Link from "next/link";
import { PageTrackingClient } from "@/components/analytics";
import { Button, Card } from "@/components/ui";
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
import { COMPANY_INFO } from "@/lib/constants/company";

export const metadata: Metadata = {
  title: "Field Resources | MH Construction",
  description:
    "Download MH Construction safety manuals, toolbox talk forms, JHA templates, and field documentation for crews, partners, and prequalification workflows.",
  alternates: {
    canonical: "https://www.mhc-gc.com/resources",
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "Field Resources | MH Construction",
    description:
      "Safety manuals, toolbox talks, and field forms from MH Construction, organized for fast field use and agency review.",
    url: "https://www.mhc-gc.com/resources",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Field Resources | MH Construction",
    description:
      "Safety manuals, toolbox talks, and field forms from MH Construction for field crews and project stakeholders.",
  },
};

const breadcrumbSchema = generateBreadcrumbSchema([
  { name: "Home", url: "https://www.mhc-gc.com" },
  { name: "Resources", url: "https://www.mhc-gc.com/resources" },
]);

export default function ResourcesPage() {
  const safetyManual = manuals.find((doc) => doc.id === "safety-manual");

  return (
    <>
      <PageTrackingClient pageName="resources" />
      <StructuredData data={breadcrumbSchema} />

      <div className="relative min-h-screen bg-linear-to-b from-white via-gray-50 to-white dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
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
            <div className="hero-section text-center mb-14">
              <div className="inline-flex items-center gap-2 bg-brand-primary/10 dark:bg-brand-primary/20 border border-brand-primary/20 rounded-full px-4 py-1.5 mb-5">
                <MaterialIcon
                  icon="folder_open"
                  size="sm"
                  className="text-brand-primary"
                />
                <span className="text-brand-primary dark:text-brand-secondary text-sm font-semibold tracking-wide uppercase">
                  Resources
                </span>
              </div>
              <h1 className="text-lg xs:text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-black text-gray-900 dark:text-white mb-4 leading-tight tracking-tight">
                Project{" "}
                <span className="bg-linear-to-r from-brand-primary to-brand-primary-light bg-clip-text text-transparent">
                  Resources
                </span>
              </h1>
              <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto leading-relaxed">
                Manuals, forms, and field documents for MH Construction, branded
                and ready to print or download.
              </p>
              <p className="mt-3 text-sm font-semibold text-gray-900 dark:text-white">
                {COMPANY_INFO.slogan.primary}
              </p>
              <p className="mt-4 text-sm font-semibold text-brand-primary dark:text-brand-secondary">
                {COMPANY_INFO.slogan.quaternary}
              </p>
            </div>
          </FadeInWhenVisible>

          {/* Bonding & Insurance Agency CTA */}
          <Card className="group mb-10 overflow-hidden border-brand-primary/25 bg-linear-to-r from-brand-primary/8 to-brand-primary/4 dark:from-brand-primary/20 dark:to-brand-primary/10 transition-all duration-300 hover:border-brand-primary hover:shadow-lg">
            <Link
              href="/safety"
              className="flex items-start gap-5 p-5 sm:items-center sm:p-6"
            >
              <div className="shrink-0 w-12 h-12 bg-brand-primary rounded-xl flex items-center justify-center shadow-md group-hover:scale-110 transition-transform duration-200">
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
                  View the OSHA 29 CFR 1926-compliant safety overview with
                  compliance credentials, section mapping, and direct PDF access
                  for pre-qualification and surety review.
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
                className="text-brand-primary shrink-0 group-hover:translate-x-1 transition-transform duration-200 hidden sm:block"
              />
            </Link>
          </Card>

          <Card className="group mb-10 overflow-hidden border-brand-secondary/25 bg-linear-to-r from-brand-secondary/8 to-brand-secondary/4 dark:from-brand-secondary/20 dark:to-brand-secondary/10 transition-all duration-300 hover:border-brand-secondary hover:shadow-lg">
            <Link
              href="/qr-codes"
              className="flex items-start gap-5 p-5 sm:items-center sm:p-6"
            >
              <div className="shrink-0 w-12 h-12 bg-brand-secondary rounded-xl flex items-center justify-center shadow-md group-hover:scale-110 transition-transform duration-200">
                <MaterialIcon
                  icon="qr_code_2"
                  size="md"
                  className="text-white"
                />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap mb-1">
                  <h2 className="text-base font-bold text-brand-secondary dark:text-brand-secondary-light">
                    QR Code Library
                  </h2>
                  <span className="text-xs font-semibold bg-brand-secondary text-white rounded-full px-2.5 py-0.5">
                    Browse
                  </span>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                  Open every individual QR code at full size and download the
                  PNG directly from one central gallery.
                </p>
              </div>
              <MaterialIcon
                icon="arrow_forward"
                size="md"
                className="text-brand-secondary shrink-0 group-hover:translate-x-1 transition-transform duration-200 hidden sm:block"
              />
            </Link>
          </Card>

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

            {safetyManual?.contentsPdfPath && (
              <Card className="mb-5 border-brand-primary/20 bg-brand-primary/5">
                <div className="flex flex-wrap items-center gap-3 px-4 py-3">
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-200">
                    Quick Access:
                  </span>
                  <DownloadGate>
                    <Button asChild variant="primary" size="sm">
                      <a
                        href={safetyManual.contentsPdfPath}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <MaterialIcon
                          icon="toc"
                          size="sm"
                          className="text-white"
                        />
                        Table of Contents PDF
                      </a>
                    </Button>
                  </DownloadGate>
                  {safetyManual.referencePdfPath && (
                    <DownloadGate>
                      <Button asChild variant="secondary" size="sm">
                        <a
                          href={safetyManual.referencePdfPath}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <MaterialIcon
                            icon="fact_check"
                            size="sm"
                            className="text-white"
                          />
                          Reference Guide PDF
                        </a>
                      </Button>
                    </DownloadGate>
                  )}
                  <Link
                    href="/safety"
                    className="inline-flex items-center gap-1.5 rounded-lg border border-brand-primary px-3 py-1.5 text-sm font-semibold text-brand-primary transition-colors hover:bg-brand-primary/10"
                  >
                    <MaterialIcon
                      icon="visibility"
                      size="sm"
                      className="text-brand-primary"
                    />
                    Browse Interactive Index
                  </Link>
                  <Button asChild variant="outline" size="sm">
                    <Link href="/resources">
                      <MaterialIcon icon="arrow_back" size="sm" />
                      Back to Resources
                    </Link>
                  </Button>
                </div>
              </Card>
            )}
            {manuals.map((doc) => (
              <Card
                key={doc.id}
                className="overflow-hidden border-gray-200 bg-white transition-all duration-300 hover:border-brand-primary hover:shadow-lg dark:border-gray-700 dark:bg-gray-800 dark:hover:border-brand-secondary"
              >
                <Link
                  href={
                    doc.id === "safety-manual"
                      ? "/safety"
                      : doc.id === "employee-handbook"
                        ? "/employee-handbook"
                        : (doc.pdfPath ?? `/resources/${doc.id}`)
                  }
                  className="group flex h-full items-start gap-5 p-5 sm:p-6"
                  target={
                    doc.id === "safety-manual" || doc.id === "employee-handbook"
                      ? undefined
                      : "_blank"
                  }
                  rel={
                    doc.id === "safety-manual" || doc.id === "employee-handbook"
                      ? undefined
                      : "noopener noreferrer"
                  }
                >
                  {doc.id === "safety-manual" && (
                    <span className="sr-only">Safety Manual</span>
                  )}
                  <div className="shrink-0 flex h-12 w-12 items-center justify-center rounded-xl bg-brand-primary/10 transition-all duration-300 group-hover:bg-brand-primary dark:bg-brand-primary/20">
                    <MaterialIcon
                      icon={doc.icon}
                      size="md"
                      className="text-brand-primary transition-colors duration-300 group-hover:text-white"
                    />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-start justify-between gap-3">
                      <div>
                        <h3 className="text-lg font-bold text-gray-900 transition-colors group-hover:text-brand-primary dark:text-white dark:group-hover:text-brand-secondary">
                          {doc.title}
                        </h3>
                        {doc.subtitle && (
                          <p className="mt-0.5 text-sm font-medium text-brand-secondary dark:text-brand-secondary-light">
                            {doc.subtitle}
                          </p>
                        )}
                      </div>
                      <div className="flex shrink-0 items-center gap-2">
                        {doc.totalSections && (
                          <span className="rounded-full bg-brand-primary/10 px-2.5 py-1 text-xs font-semibold text-brand-primary dark:text-brand-primary-light">
                            {doc.totalSections} sections
                          </span>
                        )}
                        {doc.totalPages && (
                          <span className="rounded-full bg-gray-100 px-2.5 py-1 text-xs font-medium text-gray-600 dark:bg-gray-700 dark:text-gray-300">
                            ~{doc.totalPages} pages
                          </span>
                        )}
                        <span className="rounded-full bg-amber-50 px-2.5 py-1 text-xs font-medium text-amber-700 dark:bg-amber-900/20 dark:text-amber-400">
                          Rev. {doc.revisionYear}
                        </span>
                      </div>
                    </div>
                    <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-gray-600 dark:text-gray-400">
                      {doc.description}
                    </p>
                    <div className="mt-3 flex items-center gap-1.5 text-sm font-semibold text-brand-primary dark:text-brand-secondary">
                      <span>
                        {doc.id === "safety-manual"
                          ? "View all sections"
                          : doc.id === "employee-handbook"
                            ? "View handbook index"
                            : "Open manual PDF"}
                      </span>
                      <MaterialIcon
                        icon="arrow_forward"
                        size="sm"
                        className="transition-transform duration-200 group-hover:translate-x-1"
                      />
                    </div>
                  </div>
                </Link>
              </Card>
            ))}
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
                  <Card
                    key={doc.id}
                    className="flex flex-col border-gray-200 bg-white p-5 transition-all duration-300 hover:border-brand-bronze hover:shadow-md dark:border-gray-700 dark:bg-gray-800 dark:hover:border-brand-secondary"
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 bg-brand-bronze/10 dark:bg-brand-bronze/20 rounded-lg flex items-center justify-center shrink-0">
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
                  </Card>
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
