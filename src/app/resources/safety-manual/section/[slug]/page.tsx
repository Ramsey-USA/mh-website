import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { PageTrackingClient } from "@/components/analytics";
import { MaterialIcon } from "@/components/icons/MaterialIcon";
import { FadeInWhenVisible } from "@/components/animations/FramerMotionComponents";
import { Breadcrumb } from "@/components/navigation/Breadcrumb";
import { StructuredData } from "@/components/seo/SeoMeta";
import {
  DiagonalStripePattern,
  BrandColorBlobs,
} from "@/components/ui/backgrounds";
import { generateBreadcrumbSchema } from "@/lib/seo/breadcrumb-schema";
import { getDocumentById } from "@/lib/data/documents";
import { DownloadGate } from "@/components/pwa";

interface Props {
  params: Promise<{ slug: string }>;
}

function getSection(slug: string) {
  const doc = getDocumentById("safety-manual");
  return doc?.sections?.find((s) => s.slug === slug) ?? null;
}

export function generateStaticParams() {
  const doc = getDocumentById("safety-manual");
  return (doc?.sections ?? []).map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const section = getSection(slug);
  if (!section) return { title: "Section Not Found | MH Construction" };
  return {
    title: `MISH Section ${section.number}: ${section.title} | MH Construction`,
    description: section.summary,
    openGraph: {
      title: `MISH Section ${section.number}: ${section.title} | MH Construction`,
      description: section.summary,
      url: `https://www.mhc-gc.com/resources/safety-manual/section/${slug}`,
    },
  };
}

export default async function SectionPage({ params }: Readonly<Props>) {
  const { slug } = await params;
  const section = getSection(slug);
  if (!section) notFound();

  const doc = getDocumentById("safety-manual")!;
  const allSections = doc.sections ?? [];
  const currentIndex = allSections.findIndex((s) => s.slug === slug);
  const prev = currentIndex > 0 ? allSections[currentIndex - 1] : null;
  const next =
    currentIndex < allSections.length - 1
      ? allSections[currentIndex + 1]
      : null;

  const pdfFileName = `${section.number}-${slug}.pdf`;
  const pdfPath = `/docs/safety/sections/${pdfFileName}`;

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: "https://www.mhc-gc.com" },
    { name: "Resources", url: "https://www.mhc-gc.com/resources" },
    {
      name: "Safety Program",
      url: "https://www.mhc-gc.com/resources/safety-program",
    },
    {
      name: `Section ${section.number}`,
      url: `https://www.mhc-gc.com/resources/safety-manual/section/${slug}`,
    },
  ]);

  return (
    <>
      <PageTrackingClient
        pageName={`resources-safety-manual-section-${section.number}`}
      />
      <StructuredData data={breadcrumbSchema} />

      <div className="relative min-h-screen bg-gradient-to-b from-white via-gray-50 to-white dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        <DiagonalStripePattern />
        <BrandColorBlobs />

        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20">
          <Breadcrumb
            items={[
              { label: "Home", href: "/" },
              { label: "Resources", href: "/resources" },
              { label: "Safety Program", href: "/resources/safety-program" },
              {
                label: `Section ${section.number}`,
                href: `/resources/safety-manual/section/${slug}`,
              },
            ]}
          />

          <FadeInWhenVisible>
            {/* Back link */}
            <Link
              href="/resources/safety-program#manual-downloads"
              className="inline-flex items-center gap-1.5 text-sm text-brand-primary dark:text-brand-secondary hover:underline mb-8"
            >
              <MaterialIcon icon="arrow_back" size="sm" />
              Back to Safety Program Resources
            </Link>

            {/* Section header */}
            <div className="flex items-start gap-5 flex-wrap mb-8">
              <div className="w-16 h-16 bg-brand-primary rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg">
                <span className="text-white font-black text-xl">
                  {section.number}
                </span>
              </div>
              <div className="flex-1">
                <p className="text-sm font-semibold text-brand-secondary dark:text-brand-secondary-light uppercase tracking-wider mb-1">
                  MISH · Section {section.number}
                </p>
                <h1 className="text-3xl sm:text-4xl font-black text-gray-900 dark:text-white leading-tight mb-3">
                  {section.title}
                </h1>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed max-w-2xl">
                  {section.summary}
                </p>
                {section.pages && (
                  <div className="flex items-center gap-1.5 mt-3">
                    <MaterialIcon
                      icon="menu_book"
                      size="sm"
                      className="text-gray-400"
                    />
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      {section.pages} pages
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* Download card */}
            <div className="bg-gradient-to-r from-brand-primary-dark to-brand-primary rounded-2xl p-6 mb-10 shadow-lg">
              <div className="flex items-center justify-between gap-4 flex-wrap">
                <div className="text-white">
                  <h2 className="text-lg font-bold mb-1 flex items-center gap-2">
                    <MaterialIcon icon="print" size="sm" />
                    Print This Section
                  </h2>
                  <p className="text-brand-secondary-light text-sm opacity-90">
                    Branded PDF · Ready for 3-ring binder · Scan QR to return
                    here
                  </p>
                </div>
                <DownloadGate>
                  <a
                    href={pdfPath}
                    download={pdfFileName}
                    className="inline-flex items-center gap-2 bg-brand-secondary hover:bg-brand-secondary-light text-white font-bold px-5 py-3 rounded-xl transition-colors duration-200 text-sm shadow"
                  >
                    <MaterialIcon icon="download" size="sm" />
                    Download Section PDF
                  </a>
                </DownloadGate>
              </div>
            </div>

            {/* How to use the QR code callout */}
            <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-xl p-5 mb-10 flex items-start gap-4">
              <MaterialIcon
                icon="qr_code_scanner"
                size="lg"
                className="text-amber-600 dark:text-amber-400 flex-shrink-0 mt-0.5"
              />
              <div>
                <p className="text-sm font-bold text-amber-800 dark:text-amber-300 mb-1">
                  QR Code on Every Printed Page
                </p>
                <p className="text-sm text-amber-700 dark:text-amber-400 leading-relaxed">
                  The printed version of this section includes a QR code on the
                  first and last page. Scanning it brings you directly here — so
                  field workers can download a fresh copy, check for updates, or
                  share this section with their crew.
                </p>
              </div>
            </div>

            {/* Section navigation */}
            <div className="flex items-center justify-between gap-4 pt-8 border-t border-gray-200 dark:border-gray-700">
              {prev ? (
                <Link
                  href={`/resources/safety-manual/section/${prev.slug}`}
                  className="flex items-center gap-2 text-sm text-brand-primary dark:text-brand-secondary hover:underline font-semibold"
                >
                  <MaterialIcon icon="arrow_back" size="sm" />
                  <span>
                    <span className="block text-xs text-gray-400 font-normal">
                      Previous
                    </span>
                    Section {prev.number}: {prev.title}
                  </span>
                </Link>
              ) : (
                <div />
              )}

              <Link
                href="/resources/safety-program#manual-downloads"
                className="text-xs text-gray-400 hover:text-brand-primary dark:hover:text-brand-secondary transition-colors"
              >
                Safety Program Resources
              </Link>

              {next ? (
                <Link
                  href={`/resources/safety-manual/section/${next.slug}`}
                  className="flex items-center gap-2 text-sm text-brand-primary dark:text-brand-secondary hover:underline font-semibold text-right"
                >
                  <span>
                    <span className="block text-xs text-gray-400 font-normal">
                      Next
                    </span>
                    Section {next.number}: {next.title}
                  </span>
                  <MaterialIcon icon="arrow_forward" size="sm" />
                </Link>
              ) : (
                <div />
              )}
            </div>
          </FadeInWhenVisible>
        </div>
      </div>
    </>
  );
}
