"use client";

import { useLayoutEffect, useMemo, useRef } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { WaVobBadge } from "@/components/ui/WaVobBadge";
import { DesktopNavigation } from "./DesktopNavigation";
import { MobileNavigation } from "./MobileNavigation";
import { buildSiteNavigationModel, type NavRouteKey } from "./navigation-data";
import { UtilityBar } from "./UtilityBar";

const CTA_HREF = "/contact?intent=project-discussion";

export function SiteHeader() {
  const t = useTranslations("siteHeader");
  const headerRef = useRef<HTMLElement>(null);

  const routeLabels = useMemo(
    () =>
      ({
        services: t("nav.services"),
        projects: t("nav.projects"),
        publicSector: t("nav.publicSector"),
        about: t("nav.about"),
        contact: t("nav.contact"),
        events: t("nav.events"),
        resources: t("nav.resources"),
        careers: t("nav.careers"),
        safety: t("nav.safety"),
        tradePartners: t("nav.tradePartners"),
        veterans: t("nav.veterans"),
        team: t("nav.team"),
        podcast: t("nav.podcast"),
      }) satisfies Record<NavRouteKey, string>,
    [t],
  );

  const navModel = useMemo(
    () => buildSiteNavigationModel({ routeLabels }),
    [routeLabels],
  );

  useLayoutEffect(() => {
    const root = document.documentElement;

    const updateOffset = () => {
      if (!headerRef.current) {
        return;
      }

      const rect = headerRef.current.getBoundingClientRect();
      root.style.setProperty("--mh-nav-offset", `${Math.ceil(rect.bottom)}px`);
    };

    updateOffset();

    const ResizeObserverImpl = globalThis.ResizeObserver;
    if (!ResizeObserverImpl || !headerRef.current) {
      return;
    }

    const observer = new ResizeObserverImpl(updateOffset);
    observer.observe(headerRef.current);

    return () => {
      observer.disconnect();
      root.style.removeProperty("--mh-nav-offset");
    };
  }, []);

  return (
    <header
      ref={headerRef}
      className="fixed inset-x-0 top-0 z-70 border-b border-brand-primary/20 bg-white/95 backdrop-blur-md dark:border-gray-700 dark:bg-gray-950/95"
    >
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-3 px-3 py-3 sm:px-5">
        <UtilityBar
          labels={{
            utilityLabel: t("utilityBar.utilityLabel"),
            callLabel: t("utilityBar.callLabel"),
            locationLabel: t("utilityBar.locationLabel"),
            contactLinkLabel: t("utilityBar.contactLinkLabel"),
            currentLanguageLabel: t("locale.currentLanguageLabel"),
            switcherLabel: t("locale.switcherLabel"),
            english: t("locale.english"),
            spanish: t("locale.spanish"),
          }}
        />

        <div className="flex items-center justify-between gap-3">
          <Link
            href="/"
            aria-label={t("homeAriaLabel")}
            className="inline-flex items-center rounded-md border border-brand-primary/20 bg-white px-3 py-2 transition-colors hover:bg-gray-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-secondary/90 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:border-gray-700 dark:bg-gray-900 dark:hover:bg-gray-800 dark:focus-visible:ring-offset-gray-950"
          >
            <div className="relative h-10 w-28 sm:h-12 sm:w-32">
              <Image
                src="/images/logo/mh-logo.webp"
                alt="MH Construction"
                fill
                priority
                className="object-contain"
                sizes="(max-width: 640px) 112px, 128px"
              />
            </div>
          </Link>

          <div className="hidden items-center gap-2 lg:flex">
            <p className="font-heading text-xs uppercase tracking-[0.14em] text-gray-700 dark:text-gray-200">
              {t("brandStatement")}
            </p>
            <WaVobBadge size="sm" className="shrink-0" />
          </div>

          <MobileNavigation
            primaryItems={navModel.primary}
            secondaryItems={navModel.secondary}
            ctaHref={CTA_HREF}
            labels={{
              navLabel: t("navLabel"),
              mobileMenuLabel: t("mobileMenuLabel"),
              openMenuLabel: t("openMenuLabel"),
              closeMenuLabel: t("closeMenuLabel"),
              ctaLabel: t("ctaLabel"),
            }}
          />
        </div>

        <DesktopNavigation
          items={navModel.primary}
          secondaryItems={navModel.secondary}
          ctaHref={CTA_HREF}
          labels={{
            navLabel: t("navLabel"),
            moreLabel: t("moreLabel"),
            ctaLabel: t("ctaLabel"),
          }}
        />
      </div>
    </header>
  );
}
