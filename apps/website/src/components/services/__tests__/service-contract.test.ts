/**
 * @jest-environment node
 */

import {
  getPublishedServiceDetailRouteSlugs,
  getPublishedServiceRoutes,
  getPublishedServiceRouteSlugs,
  serviceRoutes,
} from "@/lib/data/service-routes";
import {
  coreServices,
  specialtyServices,
} from "@/components/services/servicesData";

const EXISTING_INTERNAL_ROUTES = new Set([
  "/contact",
  "/projects",
  "/services",
  "/allies",
  "/public-sector",
]);

describe("services canonical contract", () => {
  it("keeps all service slugs unique", () => {
    const allSlugs = serviceRoutes.map((service) => service.slug);
    const unique = new Set(allSlugs);
    expect(unique.size).toBe(allSlugs.length);
  });

  it("keeps published service slugs unique", () => {
    const publishedSlugs = getPublishedServiceRouteSlugs();
    const unique = new Set(publishedSlugs);
    expect(unique.size).toBe(publishedSlugs.length);
  });

  it("ensures rendered service models include required fields", () => {
    for (const service of [...coreServices, ...specialtyServices]) {
      expect(service.slug.trim().length).toBeGreaterThan(0);
      expect(service.title.trim().length).toBeGreaterThan(0);
      expect(service.subtitle.trim().length).toBeGreaterThan(0);
      expect(service.description.trim().length).toBeGreaterThan(0);
      expect((service.features ?? []).length).toBeGreaterThan(0);
    }
  });

  it("ensures published records include required contract fields", () => {
    for (const service of getPublishedServiceRoutes()) {
      expect(service.slug.trim().length).toBeGreaterThan(0);
      expect(service.title.trim().length).toBeGreaterThan(0);
      expect(service.summary.trim().length).toBeGreaterThan(0);
      expect(service.supportedProjectTypes.length).toBeGreaterThan(0);
      expect(service.processStatements.length).toBeGreaterThan(0);
      expect(service.proofReferences.length).toBeGreaterThan(0);
      expect(service.ctaLabel.trim().length).toBeGreaterThan(0);
      expect(service.ctaHref.trim().length).toBeGreaterThan(0);
      expect(service.publishStatus).toBe("published");
    }
  });

  it("limits CTA hrefs to existing routes or planned service detail routes", () => {
    for (const service of getPublishedServiceRoutes()) {
      const isExisting = EXISTING_INTERNAL_ROUTES.has(service.ctaHref);
      const isPlannedDetail = service.ctaHref.startsWith("/services/");
      expect(isExisting || isPlannedDetail).toBe(true);
    }
  });

  it("keeps draft records out of hub section adapters", () => {
    const draftSlugs = new Set(
      serviceRoutes
        .filter((service) => service.publishStatus === "draft")
        .map((service) => service.slug),
    );

    const renderedHubSlugs = new Set([
      ...coreServices.map((service) => service.slug),
      ...specialtyServices.map((service) => service.slug),
    ]);

    for (const slug of draftSlugs) {
      expect(renderedHubSlugs.has(slug)).toBe(false);
    }
  });

  it("maps hub detail links only to published detail-ready slugs", () => {
    const detailSlugs = new Set(getPublishedServiceDetailRouteSlugs());
    const detailLinks = [
      ...coreServices.map((service) => service.detailHref),
      ...specialtyServices.map((service) => service.detailHref),
    ].filter((href): href is string => Boolean(href));

    for (const href of detailLinks) {
      const slug = href.replace(/^\/services\//, "");
      expect(detailSlugs.has(slug)).toBe(true);
    }
  });

  it("keeps rendered internal hrefs aligned with existing routes", () => {
    const renderedLinks = [
      ...coreServices.flatMap((service) => [
        service.ctaLink,
        service.detailHref,
      ]),
      ...specialtyServices.map((service) => service.detailHref),
    ].filter((href): href is string => Boolean(href));

    for (const href of renderedLinks) {
      const isKnownRoute =
        EXISTING_INTERNAL_ROUTES.has(href) ||
        href.startsWith("/services/") ||
        href.startsWith("/projects/");

      expect(isKnownRoute).toBe(true);
    }
  });
});
