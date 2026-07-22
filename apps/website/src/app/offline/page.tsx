import Image from "next/image";
import Link from "next/link";
import { PageTrackingClient } from "@/components/analytics";
import { PageHero } from "@/components/ui/layout/PageHero";
import { getServerLocale } from "@/lib/i18n/locale.server";
import { getTranslations } from "next-intl/server";
import { RetryConnectionButton } from "./RetryConnectionButton";
import { cornerRadius } from "@/lib/styles/design-tokens";

export default async function OfflinePage() {
  const locale = await getServerLocale();
  const t = await getTranslations({ locale });
  const features = t.raw("offlinePage.features") as string[];

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-900 via-brand-primary to-gray-900">
      <PageTrackingClient pageName="Offline" />
      <PageHero
        eyebrow={t("offlinePage.eyebrow")}
        title={t("offlinePage.title")}
        highlight={t("offlinePage.highlight")}
        description={t("offlinePage.description")}
      />

      <div className="mx-auto max-w-lg w-full text-center px-4 pb-16 -mt-8 relative z-20">
        <div className="mb-8 flex justify-center">
          <Image
            src="/images/logo/mh-logo-dark-bg.webp"
            alt="MH Construction"
            width={180}
            height={72}
            priority
          />
        </div>

        <div
          className={`w-20 h-20 bg-brand-secondary/10 border border-brand-secondary/30 ${cornerRadius.full} flex items-center justify-center mx-auto mb-6`}
        >
          <svg
            className="w-10 h-10 text-brand-secondary"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M18.364 5.636a9 9 0 010 12.728m0 0l-2.829-2.829m2.829 2.829L21 21M15.536 8.464a5 5 0 010 7.072m0 0l-2.829-2.829m-4.243 2.829a4.978 4.978 0 01-1.414-2.83m-1.414 5.658a9 9 0 01-2.167-9.238m7.824 2.167a1 1 0 111.414 1.414m-1.414-1.414L3 3m8.293 8.293l1.414 1.414"
            />
          </svg>
        </div>

        <p className="text-white/80 text-sm mb-4">
          {t("offlinePage.cachedNotice")}
        </p>

        <p className="font-body text-white/70 mb-8 leading-relaxed">
          {t("offlinePage.offlineBody")}
        </p>

        <div
          className={`bg-brand-primary-dark/60 border border-brand-secondary/20 ${cornerRadius.icon} p-6 mb-8 text-left space-y-3`}
        >
          <p className="font-subheading text-xs font-bold uppercase tracking-widest text-brand-secondary mb-4">
            {t("offlinePage.availableOffline")}
          </p>
          {features.map((item) => (
            <div key={item} className="flex items-start gap-3">
              <span className="text-green-400 mt-0.5 shrink-0">✓</span>
              <span className="text-white/80 text-sm">{item}</span>
            </div>
          ))}
        </div>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <RetryConnectionButton />

          <Link
            href="/"
            className={`px-6 py-3 bg-brand-primary-dark hover:bg-brand-primary text-white font-bold ${cornerRadius.element} transition-colors flex items-center justify-center gap-2`}
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
              />
            </svg>
            {t("offlinePage.goHome")}
          </Link>
        </div>

        <p className="mt-8 text-xs text-white/30">{t("offlinePage.footer")}</p>
      </div>
    </div>
  );
}
