import {
  ALL_SITE_PAGES_EN,
  ALL_SITE_PAGES_ES,
  TOP_PAGES_EN,
  TOP_PAGES_ES,
} from "../PageNavigation";
import { globalMenuItemsByLocale } from "@/components/layout/globalMenuItems";
import {
  getNavRouteOwner,
  isOwnedNavigationHref,
} from "@/lib/navigation/route-ownership";

const NAVIGATION_COMPONENT_INTERNAL_LINKS = [
  "/services?utm_source=nav&utm_medium=menu&utm_campaign=primary-paths&utm_content=start-here-services",
  "/projects?utm_source=nav&utm_medium=menu&utm_campaign=primary-paths&utm_content=start-here-projects",
  "/contact?utm_source=nav&utm_medium=menu&utm_campaign=primary-paths&utm_content=start-here-contact",
  "/services?utm_source=nav&utm_medium=menu&utm_campaign=services-funnel&utm_content=preconstruction-planning-focus",
  "/services?utm_source=nav&utm_medium=menu&utm_campaign=services-funnel&utm_content=path-build-expand",
  "/services?utm_source=nav&utm_medium=menu&utm_campaign=services-funnel&utm_content=path-modernize-spaces",
  "/services?utm_source=nav&utm_medium=menu&utm_campaign=services-funnel&utm_content=path-plan-control",
  "/privacy",
  "/terms",
  "/accessibility",
];

describe("Navigation route ownership contract", () => {
  it("keeps global menu links within website or dashboard owned routes", () => {
    const menuHrefs = [
      ...globalMenuItemsByLocale.en.map((item) => item.href),
      ...globalMenuItemsByLocale.es.map((item) => item.href),
    ];

    menuHrefs.forEach((href) => {
      expect(isOwnedNavigationHref(href)).toBe(true);
    });
  });

  it("keeps page navigation links within website or dashboard owned routes", () => {
    const pageNavHrefs = [
      ...TOP_PAGES_EN.map((item) => item.href),
      ...TOP_PAGES_ES.map((item) => item.href),
      ...ALL_SITE_PAGES_EN.map((item) => item.href),
      ...ALL_SITE_PAGES_ES.map((item) => item.href),
      ...NAVIGATION_COMPONENT_INTERNAL_LINKS,
    ];

    pageNavHrefs.forEach((href) => {
      expect(isOwnedNavigationHref(href)).toBe(true);
    });
  });

  it("flags unknown internal paths as contract violations", () => {
    expect(getNavRouteOwner("/does-not-exist")).toBe("unknown");
    expect(isOwnedNavigationHref("/does-not-exist")).toBe(false);
  });
});
