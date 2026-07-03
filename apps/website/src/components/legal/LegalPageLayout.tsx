import Link from "next/link";
import { type ReactNode } from "react";
import { PageTrackingClient } from "@/components/analytics";
import { MaterialIcon } from "@/components/icons/MaterialIcon";
import { StructuredData } from "@/components/seo/SeoMeta";
import { PageHero } from "@/components/ui/layout/PageHero";

interface LegalPageLayoutProps {
  pageName: string;
  title: string;
  lastUpdated: string;
  structuredData: Record<string, unknown>;
  eyebrow?: string;
  description?: string;
  backToHomeLabel?: string;
  lastUpdatedLabel?: string;
  children: ReactNode;
}

export function LegalPageLayout({
  pageName,
  title,
  lastUpdated,
  structuredData,
  eyebrow = "Policy Brief",
  description = "Clear policies and transparent standards for every Client Partner.",
  backToHomeLabel = "Back to Home",
  lastUpdatedLabel = "Last Updated",
  children,
}: LegalPageLayoutProps) {
  return (
    <main className="relative min-h-screen overflow-hidden bg-linear-to-b from-white via-gray-50 to-white dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <PageTrackingClient pageName={pageName} />
      <StructuredData data={structuredData} />

      <PageHero
        eyebrow={eyebrow}
        title={title}
        highlight={`${lastUpdatedLabel} ${lastUpdated}`}
        description={description}
      />

      <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
        <div className="mb-8 sm:mb-12">
          <Link
            href="/"
            className="mb-6 inline-flex items-center space-x-2 text-brand-primary transition-colors hover:text-brand-primary-dark"
          >
            <MaterialIcon icon="arrow_back" size="sm" />
            <span>{backToHomeLabel}</span>
          </Link>

          <h2 className="mb-4 text-3xl font-black text-gray-900 dark:text-white sm:text-4xl lg:text-5xl">
            {title}
          </h2>

          <p className="text-gray-600 dark:text-gray-300">
            {lastUpdatedLabel}: {lastUpdated}
          </p>
        </div>

        <div className="prose prose-lg max-w-none dark:prose-invert">
          {children}
        </div>
      </div>
    </main>
  );
}
