import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { buildDualSeoTitle } from "@/lib/branding/page-names";
import { getServerLocale } from "@/lib/i18n/locale.server";
import { Button } from "@/components/ui";
import { MaterialIcon } from "@/components/icons/MaterialIcon";

export const metadata: Metadata = {
  title: buildDualSeoTitle("home", "404 Page Not Found"),
  robots: { index: false, follow: false },
};

export default async function NotFound() {
  const locale = await getServerLocale();
  const t = await getTranslations({ locale, namespace: "notFoundPage" });

  return (
    <main
      className="flex items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900 p-4"
      aria-labelledby="not-found-title"
    >
      <section className="max-w-2xl w-full bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 md:p-10 text-center border border-gray-200/80 dark:border-gray-700">
        <div className="mb-6 flex justify-center">
          <Image
            src="/images/logo/mh-logo-light-bg.webp"
            alt="MH Construction"
            width={180}
            height={103}
            priority
            className="dark:hidden"
          />
          <Image
            src="/images/logo/mh-logo-dark-bg.webp"
            alt="MH Construction"
            width={180}
            height={103}
            priority
            className="hidden dark:block"
          />
        </div>

        <h1 className="text-6xl font-black text-brand-primary dark:text-brand-primary-light mb-4">
          404
        </h1>

        <h2
          id="not-found-title"
          className="font-heading text-2xl font-bold text-gray-900 dark:text-white mb-4"
        >
          {t("title")}
        </h2>

        <p className="font-body text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
          {t("description")}
        </p>

        <p className="font-body text-sm text-gray-500 dark:text-gray-400 mb-8">
          {t("helpText")}
        </p>

        <nav
          aria-label={t("navigationLabel")}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Button variant="primary" size="lg" asChild>
            <Link href="/services">
              <MaterialIcon icon="build" size="md" className="mr-2" />
              {t("servicesCta")}
            </Link>
          </Button>

          <Button variant="outline" size="lg" asChild>
            <Link href="/projects">
              <MaterialIcon icon="apartment" size="md" className="mr-2" />
              {t("projectsCta")}
            </Link>
          </Button>

          <Button variant="outline" size="lg" asChild>
            <Link href="/contact">
              <MaterialIcon icon="mail" size="md" className="mr-2" />
              {t("contactCta")}
            </Link>
          </Button>
        </nav>

        <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-700">
          <Button variant="text" size="md" asChild>
            <Link href="/">
              <MaterialIcon icon="home" size="sm" className="mr-1" />
              {t("homeCta")}
            </Link>
          </Button>

          <p className="text-sm text-gray-600 dark:text-gray-300 mb-4 font-medium">
            {t("quickLinksTitle")}
          </p>
          <div className="flex flex-wrap gap-2 justify-center text-sm">
            <Link
              href="/about"
              className="text-brand-primary dark:text-brand-primary-light hover:underline"
            >
              {t("quickLinks.about")}
            </Link>
            <span className="text-gray-300 dark:text-gray-600">•</span>
            <Link
              href="/projects"
              className="text-brand-primary dark:text-brand-primary-light hover:underline"
            >
              {t("quickLinks.projects")}
            </Link>
            <span className="text-gray-300 dark:text-gray-600">•</span>
            <Link
              href="/team"
              className="text-brand-primary dark:text-brand-primary-light hover:underline"
            >
              {t("quickLinks.team")}
            </Link>
            <span className="text-gray-300 dark:text-gray-600">•</span>
            <Link
              href="/contact"
              className="text-brand-primary dark:text-brand-primary-light hover:underline"
            >
              {t("quickLinks.contact")}
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
