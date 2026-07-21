import Link from "next/link";
import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { buildCanonicalRouteManifest } from "@/lib/seo/route-manifest";
import {
  formatDualPageName,
  PAGE_TERMINOLOGY,
} from "@/lib/branding/page-names";
import { getServerLocale } from "@/lib/i18n/locale.server";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("sitemapPage.metadata");

  return {
    title: `${formatDualPageName(PAGE_TERMINOLOGY.sitemap.seoName, PAGE_TERMINOLOGY.sitemap.mhBrandName)} | MH Construction`,
    description: t("description"),
    robots: {
      index: false,
      follow: true,
    },
  };
}

type SectionKey =
  | "core"
  | "services"
  | "projects"
  | "locations"
  | "resources"
  | "trust"
  | "legal"
  | "events";

export default async function SitemapPage() {
  const t = await getTranslations("sitemapPage");
  const locale = await getServerLocale();
  const primaryLocale = locale === "es" ? "es" : "en";
  const secondaryLocale = primaryLocale === "es" ? "en" : "es";

  const manifest = buildCanonicalRouteManifest();
  const grouped = manifest.reduce<Record<SectionKey, typeof manifest>>(
    (acc, route) => {
      acc[route.section].push(route);
      return acc;
    },
    {
      core: [],
      services: [],
      projects: [],
      locations: [],
      resources: [],
      trust: [],
      legal: [],
      events: [],
    },
  );

  const sectionOrder: SectionKey[] = [
    "core",
    "services",
    "projects",
    "locations",
    "resources",
    "trust",
    "events",
    "legal",
  ];

  return (
    <main className="mx-auto w-full max-w-6xl px-6 py-12 md:px-8">
      <header className="mb-8 space-y-3">
        <h1 className="text-4xl font-semibold tracking-tight">{t("title")}</h1>
        <p className="max-w-3xl text-base text-muted-foreground">
          {t("description")}
        </p>
      </header>

      <div className="space-y-8">
        {sectionOrder.map((section) => {
          const routes = grouped[section];
          if (!routes.length) {
            return null;
          }
          return (
            <section key={section} className="space-y-3">
              <h2 className="text-2xl font-medium tracking-tight">
                {t(`sections.${section}`)}
              </h2>

              <ul className="grid gap-2 md:grid-cols-2">
                {routes.map((route) => (
                  <li key={route.path} className="rounded border px-3 py-2">
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0">
                        <p className="font-medium">
                          {route.label[primaryLocale]}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {route.label[secondaryLocale]}
                        </p>
                      </div>
                      <div className="flex shrink-0 items-center gap-2 text-sm">
                        <Link
                          className="underline underline-offset-2"
                          href={route.path}
                        >
                          {t("viewLink")}
                        </Link>
                        <span className="text-muted-foreground">
                          {route.locales.es
                            ? t("localeBadge.bilingual")
                            : t("localeBadge.englishOnly")}
                        </span>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </section>
          );
        })}
      </div>
    </main>
  );
}
