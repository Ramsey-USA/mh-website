import { Suspense } from "react";
import CareersPageClient from "./CareersPageClient";
import { getHeroPageSlogan } from "@/lib/content/hero-page-slogans";
import {
  generateBreadcrumbSchema,
  breadcrumbPatterns,
} from "@/lib/seo/breadcrumb-schema";

function CareersPageFallback() {
  return (
    <div className="relative min-h-screen bg-linear-to-b from-white via-gray-50 to-white dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="relative h-[55vh] min-h-105 bg-linear-to-br from-gray-900 via-brand-primary to-gray-900" />
      <div className="mx-auto px-4 sm:px-6 lg:px-8 py-10 max-w-7xl">
        <div className="space-y-4 animate-pulse">
          <div className="bg-gray-200 dark:bg-gray-700 rounded h-8 w-72" />
          <div className="bg-gray-200 dark:bg-gray-700 rounded h-8 w-96 max-w-full" />
          <div className="bg-gray-200 dark:bg-gray-700 rounded h-5 w-full max-w-3xl" />
        </div>
      </div>
    </div>
  );
}

export default function CareersPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            generateBreadcrumbSchema(breadcrumbPatterns.careers),
          ),
        }}
      />
      <Suspense fallback={<CareersPageFallback />}>
        <CareersPageClient heroSlogan={getHeroPageSlogan("careers").slogan} />
      </Suspense>
    </>
  );
}
