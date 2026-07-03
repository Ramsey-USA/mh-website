const WEBSITE_NAV_ROUTE_EXACT = new Set([
  "/",
  "/accessibility",
  "/jeremy-thamert",
  "/sitemap.xml",
]);

const WEBSITE_NAV_ROUTE_PREFIXES = [
  "/about",
  "/allies",
  "/careers",
  "/contact",
  "/events",
  "/faq",
  "/locations",
  "/privacy",
  "/projects",
  "/public-sector",
  "/resources",
  "/safety",
  "/services",
  "/team",
  "/terms",
  "/testimonials",
  "/veterans",
] as const;

const DASHBOARD_NAV_ROUTE_PREFIXES = ["/dashboard", "/hub"] as const;

export type NavRouteOwner = "website" | "dashboard" | "unknown";

function normalizeHrefPath(href: string): string {
  if (!href) {
    return "";
  }

  if (/^[a-zA-Z][a-zA-Z\d+\-.]*:/.test(href)) {
    return "";
  }

  const [pathWithNoHash = ""] = href.split("#", 1);
  const [pathWithNoQuery = ""] = pathWithNoHash.split("?", 1);

  if (!pathWithNoQuery.startsWith("/")) {
    return "";
  }

  return pathWithNoQuery.length > 1
    ? pathWithNoQuery.replace(/\/+$/, "")
    : pathWithNoQuery;
}

function matchesPrefix(path: string, prefix: string): boolean {
  return path === prefix || path.startsWith(`${prefix}/`);
}

export function getNavRouteOwner(href: string): NavRouteOwner {
  const path = normalizeHrefPath(href);
  if (!path) {
    return "unknown";
  }

  if (WEBSITE_NAV_ROUTE_EXACT.has(path)) {
    return "website";
  }

  if (
    WEBSITE_NAV_ROUTE_PREFIXES.some((prefix) => matchesPrefix(path, prefix))
  ) {
    return "website";
  }

  if (
    DASHBOARD_NAV_ROUTE_PREFIXES.some((prefix) => matchesPrefix(path, prefix))
  ) {
    return "dashboard";
  }

  return "unknown";
}

export function isOwnedNavigationHref(href: string): boolean {
  return getNavRouteOwner(href) !== "unknown";
}
