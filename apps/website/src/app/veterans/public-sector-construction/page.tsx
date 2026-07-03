import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/navigation/Breadcrumbs";
import { MaterialIcon } from "@/components/icons/MaterialIcon";
import { TrackedBridgeButton, TrackedBridgeLink } from "@/components/analytics";
import { Card } from "@/components/ui";
import { COMPANY_INFO } from "@/lib/constants/company";
import {
  formatDualPageName,
  PAGE_TERMINOLOGY,
} from "@/lib/branding/page-names";
import { getServerLocale } from "@/lib/i18n/locale.server";
import { getTranslations } from "next-intl/server";

const SITE_URL = COMPANY_INFO.urls.getSiteUrl();

export const metadata: Metadata = {
  title: `${formatDualPageName(PAGE_TERMINOLOGY.publicSector.seoName, PAGE_TERMINOLOGY.publicSector.mhBrandName)} | Veteran-Led Public Sector Construction | MH Construction`,
  description:
    "Bridge veteran-focused values with public-sector project delivery. Learn how MH Construction aligns disciplined execution, transparency, and compliance for government work.",
  alternates: {
    canonical: `${SITE_URL}/veterans/public-sector-construction`,
  },
  robots: { index: true, follow: true },
};

export default async function VeteranPublicSectorConstructionPage() {
  const locale = await getServerLocale();
  const t = await getTranslations({ locale });

  const bridgeCards = [
    {
      icon: "account_balance",
      title: t("veteransBridge.cards.delivery.title"),
      text: t("veteransBridge.cards.delivery.text"),
      href: "/public-sector",
      cta: t("veteransBridge.cards.delivery.cta"),
    },
    {
      icon: "verified",
      title: t("veteransBridge.cards.compliance.title"),
      text: t("veteransBridge.cards.compliance.text"),
      href: "/public-sector/veteran-led-compliance",
      cta: t("veteransBridge.cards.compliance.cta"),
    },
    {
      icon: "travel_explore",
      title: t("veteransBridge.cards.triState.title"),
      text: t("veteransBridge.cards.triState.text"),
      href: "/public-sector/tri-state-government-construction",
      cta: t("veteransBridge.cards.triState.cta"),
    },
  ];

  return (
    <main className="bg-white dark:bg-gray-950 min-h-screen">
      <section className="border-b border-gray-200 bg-linear-to-br from-gray-950 via-brand-primary to-gray-950 px-4 py-14 text-white sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl">
          <Breadcrumbs
            items={[
              { label: t("veteransBridge.breadcrumb.home"), href: "/" },
              {
                label: t("veteransBridge.breadcrumb.veterans"),
                href: "/veterans",
              },
              {
                label: t("veteransBridge.breadcrumb.current"),
              },
            ]}
            className="mb-6 text-white/70"
          />
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.28em] text-brand-secondary">
            {t("veteransBridge.hero.kicker")}
          </p>
          <h1 className="text-3xl font-black tracking-tight sm:text-5xl">
            {t("veteransBridge.hero.title")}
          </h1>
          <p className="mt-5 max-w-3xl text-lg leading-8 text-white/85">
            {t("veteransBridge.hero.description")}
          </p>
        </div>
      </section>

      <section className="px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <div className="mx-auto grid max-w-5xl gap-6 md:grid-cols-3">
          {bridgeCards.map((item) => (
            <Card
              key={item.title}
              className="border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900"
            >
              <MaterialIcon
                icon={item.icon}
                size="lg"
                className="text-brand-primary"
              />
              <h2 className="mt-4 text-xl font-bold text-gray-900 dark:text-white">
                {item.title}
              </h2>
              <p className="mt-3 text-sm leading-6 text-gray-700 dark:text-gray-300">
                {item.text}
              </p>
              <TrackedBridgeLink
                href={item.href}
                trackId={`veteran-bridge-${item.href}`}
                className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-brand-primary hover:underline dark:text-brand-primary-light"
              >
                {item.cta}
                <MaterialIcon icon="arrow_forward" size="sm" />
              </TrackedBridgeLink>
            </Card>
          ))}
        </div>

        <Card className="mx-auto mt-10 max-w-5xl border border-brand-primary/20 bg-brand-primary/5 p-6 dark:border-brand-primary/30 dark:bg-brand-primary/10">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">
            {t("veteransBridge.cta.heading")}
          </h2>
          <p className="mt-3 text-sm leading-6 text-gray-700 dark:text-gray-300">
            {t("veteransBridge.cta.description")}
          </p>
          <div className="mt-5 flex flex-wrap gap-3">
            <TrackedBridgeButton
              href="/contact"
              trackId="veteran-bridge-contact"
            >
              {t("veteransBridge.cta.buttonContact")}
            </TrackedBridgeButton>
            <TrackedBridgeButton
              href="/services"
              trackId="veteran-bridge-municipal-service"
              variant="outline"
            >
              {t("veteransBridge.cta.buttonServiceLine")}
            </TrackedBridgeButton>
            <TrackedBridgeButton
              href="/locations/yakima"
              trackId="veteran-bridge-yakima"
              variant="outline"
            >
              {t("veteransBridge.cta.buttonYakima")}
            </TrackedBridgeButton>
            <TrackedBridgeButton
              href="/locations/pendleton"
              trackId="veteran-bridge-pendleton"
              variant="outline"
            >
              {t("veteransBridge.cta.buttonPendleton")}
            </TrackedBridgeButton>
          </div>
        </Card>
      </section>
    </main>
  );
}
