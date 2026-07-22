export const JEREMY_SEO_ROUTE_KEYS = {
  home: "home",
  about: "about",
  services: "services",
  servicesDetailTemplate: "services/[slug]",
  team: "team",
  publicSector: "public-sector",
  veterans: "veterans",
  allies: "allies",
  testimonials: "testimonials",
  careers: "careers",
  projects: "projects",
  contact: "contact",
  faq: "faq",
} as const;

export function buildServiceDetailJeremySeoRouteKey(slug: string): string {
  return `services/${slug}`;
}
