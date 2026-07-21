const DEFAULT_SITE_ORIGIN = "https://www.mhc-gc.com";

function normalizeOrigin(value: string): string {
  const parsed = new URL(value);
  return parsed.origin;
}

export function getCanonicalSiteOrigin(): string {
  const configured = process.env["NEXT_PUBLIC_SITE_URL"]?.trim();
  if (!configured) {
    return DEFAULT_SITE_ORIGIN;
  }

  try {
    return normalizeOrigin(configured);
  } catch {
    return DEFAULT_SITE_ORIGIN;
  }
}

export function isEventsHubIndexable(): boolean {
  return process.env["NEXT_PUBLIC_EVENTS_HUB_INDEXABLE"] === "1";
}

export function isHtmlSitemapEnabled(): boolean {
  return process.env["NEXT_PUBLIC_HTML_SITEMAP_ENABLED"] === "1";
}
