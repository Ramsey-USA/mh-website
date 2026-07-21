import { buildSiteNavigationModel, type NavRouteKey } from "../navigation-data";

const labels: Record<NavRouteKey, string> = {
  services: "Services",
  projects: "Projects",
  publicSector: "Public Sector",
  about: "About MH",
  contact: "Contact",
  events: "Events",
  resources: "Resources",
  careers: "Careers",
  safety: "Safety",
  tradePartners: "Trade Partners",
  veterans: "Veterans",
  team: "Team",
  podcast: "Podcast",
};

describe("buildSiteNavigationModel", () => {
  it("keeps buyer-first primary order and route keys", () => {
    const model = buildSiteNavigationModel({ routeLabels: labels });

    expect(model.primary.map((item) => item.key)).toEqual([
      "services",
      "projects",
      "publicSector",
      "about",
      "contact",
    ]);
  });

  it("never publishes planned destinations such as podcast", () => {
    const model = buildSiteNavigationModel({ routeLabels: labels });
    const allKeys = [...model.primary, ...model.secondary].map(
      (item) => item.key,
    );

    expect(allKeys).not.toContain("podcast");
  });

  it("does not include unknown or non-owned href destinations", () => {
    const model = buildSiteNavigationModel({ routeLabels: labels });
    const allHrefs = [...model.primary, ...model.secondary].map(
      (item) => item.href,
    );

    allHrefs.forEach((href) => {
      expect(href.startsWith("/")).toBe(true);
    });
  });
});
