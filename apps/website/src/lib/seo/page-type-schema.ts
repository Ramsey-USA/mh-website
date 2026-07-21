import type { EventRecord } from "@/lib/data/events";
import type { NewsInsightsCard } from "@/lib/data/news-insights";
import type { ServiceRecord } from "@/lib/data/service-routes";

const ORGANIZATION_ID = "#organization";

function withSiteOrigin(siteUrl: string): string {
  return siteUrl.replace(/\/$/, "");
}

function toAbsoluteUrl(siteUrl: string, pathOrUrl: string): string {
  if (/^https?:\/\//i.test(pathOrUrl)) {
    return pathOrUrl;
  }

  const normalized = pathOrUrl.startsWith("/") ? pathOrUrl : `/${pathOrUrl}`;
  return `${withSiteOrigin(siteUrl)}${normalized}`;
}

function toEventStartDate(schedule: string): string | undefined {
  const monthYear =
    /^(January|February|March|April|May|June|July|August|September|October|November|December)\s+(\d{4})$/i.exec(
      schedule.trim(),
    );

  if (!monthYear) {
    return undefined;
  }

  const monthMap: Record<string, string> = {
    january: "01",
    february: "02",
    march: "03",
    april: "04",
    may: "05",
    june: "06",
    july: "07",
    august: "08",
    september: "09",
    october: "10",
    november: "11",
    december: "12",
  };

  const monthName = monthYear[1]?.toLowerCase();
  if (!monthName) {
    return undefined;
  }

  const month = monthMap[monthName];
  if (!month) {
    return undefined;
  }

  return `${monthYear[2]}-${month}-01`;
}

export function generateEventDetailSchema(event: EventRecord, siteUrl: string) {
  const siteOrigin = withSiteOrigin(siteUrl);
  const canonicalUrl = `${siteOrigin}/events/${event.slug}`;

  return {
    "@context": "https://schema.org",
    "@type": "Event",
    "@id": `${canonicalUrl}#event`,
    name: event.title,
    description: event.summary,
    url: canonicalUrl,
    eventStatus:
      event.status.toLowerCase().includes("archived") ||
      event.status.toLowerCase().includes("completed")
        ? "https://schema.org/EventCompleted"
        : "https://schema.org/EventScheduled",
    startDate: toEventStartDate(event.schedule),
    location: {
      "@type": "Place",
      name: event.location,
    },
    image: [toAbsoluteUrl(siteOrigin, event.primaryImage)],
    organizer: {
      "@id": `${siteOrigin}/${ORGANIZATION_ID}`,
    },
    mainEntityOfPage: {
      "@id": canonicalUrl,
    },
  };
}

export function generateServiceDetailSchema(
  service: ServiceRecord,
  siteUrl: string,
) {
  const siteOrigin = withSiteOrigin(siteUrl);
  const canonicalUrl = `${siteOrigin}/services/${service.slug}`;

  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${canonicalUrl}#service`,
    name: service.title,
    description: service.summary,
    serviceType: service.category,
    areaServed: ["Washington", "Oregon", "Idaho"],
    url: canonicalUrl,
    provider: {
      "@id": `${siteOrigin}/${ORGANIZATION_ID}`,
    },
    mainEntityOfPage: {
      "@id": canonicalUrl,
    },
  };
}

export function generateNewsInsightsSchemas(
  cards: readonly NewsInsightsCard[],
  siteUrl: string,
) {
  const siteOrigin = withSiteOrigin(siteUrl);
  const canonicalUrl = `${siteOrigin}/news`;

  const articles = cards.map((card, index) => {
    const cardUrl = toAbsoluteUrl(siteOrigin, card.href);
    const articleUrl = `${canonicalUrl}#insight-${index + 1}`;

    return {
      "@context": "https://schema.org",
      "@type": "NewsArticle",
      "@id": articleUrl,
      headline: card.title,
      description: card.description,
      datePublished: card.date,
      url: cardUrl,
      about: card.category,
      author: {
        "@id": `${siteOrigin}/${ORGANIZATION_ID}`,
      },
      publisher: {
        "@id": `${siteOrigin}/${ORGANIZATION_ID}`,
      },
      mainEntityOfPage: {
        "@id": canonicalUrl,
      },
    };
  });

  const collection = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "@id": `${canonicalUrl}#collection`,
    name: "News and Insights",
    url: canonicalUrl,
    mainEntity: {
      "@type": "ItemList",
      itemListElement: articles.map((article, index) => ({
        "@type": "ListItem",
        position: index + 1,
        item: {
          "@id": article["@id"],
        },
      })),
    },
    isPartOf: {
      "@id": `${siteOrigin}/#website`,
    },
    about: {
      "@id": `${siteOrigin}/${ORGANIZATION_ID}`,
    },
  };

  return [collection, ...articles];
}
