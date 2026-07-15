import { LegalContactCard } from "@/components/legal/LegalContactCard";
import { LegalPageLayout } from "@/components/legal/LegalPageLayout";
import { getServerLocale } from "@/lib/i18n/locale.server";
import { getTranslations } from "next-intl/server";
import {
  generateBreadcrumbSchema,
  breadcrumbPatterns,
} from "@/lib/seo/breadcrumb-schema";

export default async function AccessibilityPage() {
  const locale = await getServerLocale();
  const t = await getTranslations({ locale });
  const measuresItems = t.raw(
    "accessibilityPage.sections.measures.items",
  ) as string[];
  const assessmentItems = t.raw(
    "accessibilityPage.sections.assessment.items",
  ) as string[];
  const improvementItems = t.raw(
    "accessibilityPage.sections.improvement.items",
  ) as string[];

  return (
    <LegalPageLayout
      // HeroSection is provided by LegalPageLayout.
      pageName={t("accessibilityPage.pageName")}
      title={t("accessibilityPage.title")}
      lastUpdated="March 15, 2026"
      structuredData={generateBreadcrumbSchema(
        breadcrumbPatterns.accessibility,
      )}
    >
      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
          {t("accessibilityPage.sections.commitment.heading")}
        </h2>
        <p className="text-gray-700 dark:text-gray-300 mb-4">
          {t("accessibilityPage.sections.commitment.body")}
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
          {t("accessibilityPage.sections.measures.heading")}
        </h2>
        <p className="text-gray-700 dark:text-gray-300 mb-4">
          {t("accessibilityPage.sections.measures.intro")}
        </p>
        <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300 space-y-2">
          {measuresItems.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
          {t("accessibilityPage.sections.conformance.heading")}
        </h2>
        <p className="text-gray-700 dark:text-gray-300 mb-4">
          {t("accessibilityPage.sections.conformance.body1")}
        </p>
        <p className="text-gray-700 dark:text-gray-300 mb-4">
          {t("accessibilityPage.sections.conformance.body2")}
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
          {t("accessibilityPage.sections.feedback.heading")}
        </h2>
        <p className="text-gray-700 dark:text-gray-300 mb-4">
          {t("accessibilityPage.sections.feedback.intro")}
        </p>
        <LegalContactCard />
        <p className="text-gray-700 dark:text-gray-300 mt-4">
          {t("accessibilityPage.sections.feedback.responseEta")}
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
          {t("accessibilityPage.sections.technical.heading")}
        </h2>
        <p className="text-gray-700 dark:text-gray-300 mb-4">
          {t("accessibilityPage.sections.technical.intro")}
        </p>
        <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300 space-y-2">
          <li>HTML</li>
          <li>WAI-ARIA</li>
          <li>CSS</li>
          <li>JavaScript</li>
        </ul>
        <p className="text-gray-700 dark:text-gray-300 mt-4">
          {t("accessibilityPage.sections.technical.outro")}
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
          {t("accessibilityPage.sections.limitations.heading")}
        </h2>
        <p className="text-gray-700 dark:text-gray-300 mb-4">
          {t("accessibilityPage.sections.limitations.body1")}
        </p>
        <p className="text-gray-700 dark:text-gray-300 mb-4">
          {t("accessibilityPage.sections.limitations.body2")}
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
          {t("accessibilityPage.sections.assessment.heading")}
        </h2>
        <p className="text-gray-700 dark:text-gray-300 mb-4">
          {t("accessibilityPage.sections.assessment.intro")}
        </p>
        <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300 space-y-2">
          {assessmentItems.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
          {t("accessibilityPage.sections.improvement.heading")}
        </h2>
        <p className="text-gray-700 dark:text-gray-300 mb-4">
          {t("accessibilityPage.sections.improvement.intro")}
        </p>
        <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300 space-y-2">
          {improvementItems.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </section>
    </LegalPageLayout>
  );
}
