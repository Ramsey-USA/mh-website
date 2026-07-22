import type { Metadata } from "next";

import { PageTrackingClient } from "@/components/analytics";
import { Breadcrumb } from "@/components/navigation/Breadcrumb";
import { Button, ContentCard } from "@/components/ui";
import { StructuredData } from "@/components/seo/SeoMeta";
import { formatDualPageName } from "@/lib/branding/page-names";
import { COMPANY_INFO } from "@/lib/constants/company";
import { getServerLocale } from "@/lib/i18n/locale.server";
import { generateBreadcrumbSchema } from "@/lib/seo/breadcrumb-schema";
import { getNewsInsightsContent } from "@/lib/data/news-insights";
import { createOgImageUrl } from "@/lib/seo/og-image";
import { generateNewsInsightsSchemas } from "@/lib/seo/page-type-schema";

const SITE_URL = COMPANY_INFO.urls.getSiteUrl();
const NEWS_OG_IMAGE_URL = createOgImageUrl("news", "news-insights");
const NEWS_META_DESCRIPTION =
  "Repository-managed updates and mission-lane insights from MH Construction on Procore coordination, safety planning, trade delivery, AG and winery sequencing, and veteran-led accountability.";
const NEWS_OG_DESCRIPTION =
  "Operational news from MH Construction covering field coordination, safety execution, trade sequencing, and accountable delivery across active mission lanes.";
const NEWS_TWITTER_DESCRIPTION =
  "Mission-lane insights from MH Construction with practical updates on Procore controls, site safety, trade alignment, and veteran-led leadership.";

export const metadata: Metadata = {
  title: `${formatDualPageName("News and Insights", "Noticias e ideas")} | MH Construction`,
  description: NEWS_META_DESCRIPTION,
  alternates: {
    canonical: `${SITE_URL}/news`,
  },
  openGraph: {
    title: `${formatDualPageName("News and Insights", "Noticias e ideas")} | MH Construction`,
    description: NEWS_OG_DESCRIPTION,
    url: `${SITE_URL}/news`,
    type: "website",
    images: [
      {
        url: NEWS_OG_IMAGE_URL,
        width: 1200,
        height: 630,
        alt: "MH Construction news and insights",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${formatDualPageName("News and Insights", "Noticias e ideas")} | MH Construction`,
    description: NEWS_TWITTER_DESCRIPTION,
    images: [NEWS_OG_IMAGE_URL],
  },
  robots: { index: true, follow: true },
};

export default async function NewsPage() {
  const locale = (await getServerLocale()) === "es" ? "es" : "en";
  const content = getNewsInsightsContent(locale);
  const newsSchemas = generateNewsInsightsSchemas(content.cards, SITE_URL);

  return (
    <>
      <PageTrackingClient pageName="News and Insights" />
      <StructuredData
        data={generateBreadcrumbSchema([
          { name: "Home", url: "/" },
          { name: content.breadcrumbCurrent, url: "/news" },
        ])}
      />
      <StructuredData data={newsSchemas} />

      <main className="bg-linear-to-b from-white via-gray-50 to-white dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        <section className="mx-auto max-w-7xl px-4 pt-10 sm:px-6 lg:px-8">
          <div className="mb-6">
            <Breadcrumb
              items={[
                { label: locale === "es" ? "Inicio" : "Home", href: "/" },
                { label: content.breadcrumbCurrent },
              ]}
            />
          </div>
        </section>

        <section
          id="news-insights"
          className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8"
        >
          <div className="mx-auto mb-12 max-w-5xl text-center">
            <p className="font-subheading mb-4 text-sm font-semibold uppercase tracking-[0.3em] text-brand-secondary">
              {content.subtitle}
            </p>
            <h1 className="font-black text-4xl sm:text-5xl lg:text-6xl text-gray-900 dark:text-white tracking-tight">
              {content.title}
            </h1>
            <p className="font-body mx-auto mt-6 max-w-4xl text-base sm:text-lg lg:text-xl leading-relaxed text-gray-700 dark:text-gray-300">
              {content.description}
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {content.cards.map((card) => (
              <ContentCard
                key={card.title}
                variant="feature"
                icon={card.icon}
                category={card.category}
                categoryColor={card.categoryColor}
                title={card.title}
                description={card.description}
                date={card.date}
                href={card.href}
                linkText={card.linkText}
                {...(card.enhancedIcon ? { enhancedIcon: true } : {})}
                {...(card.accentGradient
                  ? { accentGradient: card.accentGradient }
                  : {})}
                {...(card.glowGradient
                  ? { glowGradient: card.glowGradient }
                  : {})}
              />
            ))}
          </div>

          <div className="mt-10 flex flex-wrap justify-center gap-3">
            <Button asChild variant="primary" size="lg">
              <a href="/about/details#news">
                {locale === "es"
                  ? "Ver capacidades de mision detalladas"
                  : "View detailed mission capabilities"}
              </a>
            </Button>
            <Button asChild variant="outline" size="lg">
              <a href="/contact">
                {locale === "es"
                  ? "Conversar una actualizacion del proyecto"
                  : "Discuss a project update"}
              </a>
            </Button>
          </div>
        </section>
      </main>
    </>
  );
}
