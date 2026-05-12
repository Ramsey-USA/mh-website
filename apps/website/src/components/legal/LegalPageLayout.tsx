import Link from "next/link";
import { type ReactNode } from "react";
import { PageTrackingClient } from "@/components/analytics";
import { MaterialIcon } from "@/components/icons/MaterialIcon";
import { StructuredData } from "@/components/seo/SeoMeta";

interface LegalPageLayoutProps {
  pageName: string;
  title: string;
  lastUpdated: string;
  structuredData: Record<string, unknown>;
  children: ReactNode;
}

export function LegalPageLayout({
  pageName,
  title,
  lastUpdated,
  structuredData,
  children,
}: LegalPageLayoutProps) {
  return (
    <main className="min-h-screen bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-black">
      <PageTrackingClient pageName={pageName} />
      <StructuredData data={structuredData} />

      <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
        <div className="mb-8 sm:mb-12">
          <Link
            href="/"
            className="mb-6 inline-flex items-center space-x-2 text-brand-primary transition-colors hover:text-brand-primary-dark"
          >
            <MaterialIcon icon="arrow_back" size="sm" />
            <span>Back to Home</span>
          </Link>

          <h1 className="mb-4 text-3xl font-black text-gray-900 dark:text-white sm:text-4xl lg:text-5xl">
            {title}
          </h1>

          <p className="text-gray-600 dark:text-gray-300">
            Last Updated: {lastUpdated}
          </p>
        </div>

        <div className="prose prose-lg max-w-none dark:prose-invert">
          {children}
        </div>
      </div>
    </main>
  );
}
