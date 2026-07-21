import { isOwnedNavigationHref } from "@/lib/navigation/route-ownership";

export type PrimaryNavRouteKey =
  "services" | "projects" | "publicSector" | "about" | "contact";

export type SecondaryNavRouteKey =
  | "events"
  | "resources"
  | "careers"
  | "safety"
  | "tradePartners"
  | "veterans"
  | "team"
  | "podcast";

export type NavRouteKey = PrimaryNavRouteKey | SecondaryNavRouteKey;

export type NavItem = {
  key: NavRouteKey;
  href: string;
  label: string;
  priority: "primary" | "secondary";
};

type NavDefinition = {
  key: NavRouteKey;
  href: string;
  labelKey: NavRouteKey;
  priority: "primary" | "secondary";
  planned?: boolean;
};

const NAV_DEFINITIONS: ReadonlyArray<NavDefinition> = [
  {
    key: "services",
    href: "/services",
    labelKey: "services",
    priority: "primary",
  },
  {
    key: "projects",
    href: "/projects",
    labelKey: "projects",
    priority: "primary",
  },
  {
    key: "publicSector",
    href: "/public-sector",
    labelKey: "publicSector",
    priority: "primary",
  },
  { key: "about", href: "/about", labelKey: "about", priority: "primary" },
  {
    key: "contact",
    href: "/contact",
    labelKey: "contact",
    priority: "primary",
  },
  { key: "events", href: "/events", labelKey: "events", priority: "secondary" },
  {
    key: "resources",
    href: "/resources",
    labelKey: "resources",
    priority: "secondary",
  },
  {
    key: "careers",
    href: "/careers",
    labelKey: "careers",
    priority: "secondary",
  },
  { key: "safety", href: "/safety", labelKey: "safety", priority: "secondary" },
  {
    key: "tradePartners",
    href: "/allies",
    labelKey: "tradePartners",
    priority: "secondary",
  },
  {
    key: "veterans",
    href: "/veterans",
    labelKey: "veterans",
    priority: "secondary",
  },
  { key: "team", href: "/team", labelKey: "team", priority: "secondary" },
  {
    key: "podcast",
    href: "/podcast",
    labelKey: "podcast",
    priority: "secondary",
    planned: true,
  },
];

export type BuildNavLabels = {
  routeLabels: Record<NavRouteKey, string>;
};

export type SiteNavigationModel = {
  primary: NavItem[];
  secondary: NavItem[];
};

function shouldIncludeRoute(definition: NavDefinition): boolean {
  if (definition.planned) {
    return false;
  }

  return isOwnedNavigationHref(definition.href);
}

export function buildSiteNavigationModel(
  labels: BuildNavLabels,
): SiteNavigationModel {
  const visibleItems = NAV_DEFINITIONS.filter(shouldIncludeRoute).map(
    (definition) => ({
      key: definition.key,
      href: definition.href,
      label: labels.routeLabels[definition.labelKey],
      priority: definition.priority,
    }),
  );

  return {
    primary: visibleItems.filter((item) => item.priority === "primary"),
    secondary: visibleItems.filter((item) => item.priority === "secondary"),
  };
}
