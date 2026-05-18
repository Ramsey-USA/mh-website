import type { Metadata } from "next";
import Link from "next/link";
import { MaterialIcon } from "@/components/icons/MaterialIcon";
import { PageTrackingClient } from "@/components/analytics";
import { PageHero } from "@/components/ui/layout/PageHero";
import { getServerLocale } from "@/lib/i18n/locale.server";
import { getTranslations } from "next-intl/server";

export const metadata: Metadata = {
  title: "Employee Handbook | MH Construction",
  description:
    "Employee handbook placeholder page prepared for upcoming Word upload and PDF publishing workflow.",
  robots: {
    index: false,
    follow: false,
  },
};

export default async function EmployeeHandbookPage() {
  const locale = await getServerLocale();
  const t = await getTranslations({ locale });

  return (
    <>
      <PageTrackingClient pageName="employee-handbook-placeholder" />

      <PageHero
        eyebrow={t("employeeHandbook.hero.eyebrow")}
        title={t("employeeHandbook.hero.title")}
        highlight={t("employeeHandbook.hero.highlight")}
        description={t("employeeHandbook.hero.description")}
        icon="menu_book"
      />

      <section className="bg-linear-to-br from-brand-primary-darker via-brand-primary-dark to-brand-primary px-4 py-14 sm:px-6">
        <div className="mx-auto max-w-4xl text-white">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-4 py-1 text-xs font-bold uppercase tracking-wider text-brand-secondary">
            <MaterialIcon
              icon="menu_book"
              size="sm"
              className="text-brand-secondary"
            />
            {t("employeeHandbook.badge")}
          </div>

          <h1 className="mt-4 text-2xl font-black tracking-tight sm:text-3xl">
            {t("employeeHandbook.placeholder.title")}
          </h1>
          <p className="mt-4 text-base text-slate-100 sm:text-lg">
            {t("employeeHandbook.placeholder.description")}
          </p>
        </div>
      </section>

      <section className="bg-white px-4 py-10 dark:bg-gray-950 sm:px-6 sm:py-12">
        <div className="mx-auto grid max-w-4xl gap-5 md:grid-cols-2">
          <article className="rounded-2xl border border-slate-200 bg-slate-50 p-6 dark:border-slate-700 dark:bg-slate-900">
            <h2 className="text-lg font-black text-slate-900 dark:text-white">
              {t("employeeHandbook.status.title")}
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
              {t("employeeHandbook.status.description")}
            </p>
          </article>

          <article className="rounded-2xl border border-brand-primary/20 bg-brand-primary/5 p-6 dark:border-brand-primary/40 dark:bg-brand-primary/10">
            <h2 className="text-lg font-black text-slate-900 dark:text-white">
              {t("employeeHandbook.nextStep.title")}
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-slate-700 dark:text-slate-200">
              {t("employeeHandbook.nextStep.description")}
            </p>
          </article>
        </div>

        <div className="mx-auto mt-8 flex max-w-4xl flex-wrap gap-3">
          <Link
            href="/hub"
            className="inline-flex items-center gap-2 rounded-xl bg-brand-primary px-5 py-3 text-sm font-bold text-white transition-colors hover:bg-brand-primary-dark"
          >
            <MaterialIcon icon="dashboard" size="sm" className="text-white" />
            {t("employeeHandbook.cta.backToHub")}
          </Link>
          <Link
            href="/resources"
            className="inline-flex items-center gap-2 rounded-xl border border-brand-primary px-5 py-3 text-sm font-bold text-brand-primary transition-colors hover:bg-brand-primary hover:text-white"
          >
            <MaterialIcon icon="folder_open" size="sm" />
            {t("employeeHandbook.cta.viewResources")}
          </Link>
        </div>
      </section>
    </>
  );
}
