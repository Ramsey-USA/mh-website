/**
 * @jest-environment node
 */

import {
  locations,
  getLocationBySlug,
  getLocationEvidenceProfile,
  getLocationProjectDeepLinks,
  getLocationServiceDeepLinks,
  hasPublishedLocationEvidence,
  isLocationOffice,
} from "../locations";
import { COMPANY_INFO } from "@/lib/constants/company";

describe("locations data", () => {
  it("exposes known locations via slug lookup", () => {
    const pasco = getLocationBySlug("pasco");
    const richland = getLocationBySlug("richland");

    expect(pasco?.city).toBe("Pasco");
    expect(richland?.county).toBe("Benton County");
    expect(getLocationBySlug("missing-city")).toBeUndefined();
  });

  it("shares common contact information from company constants across all locations", () => {
    for (const location of Object.values(locations)) {
      expect(location.telephone).toBe(COMPANY_INFO.phone.display);
      expect(location.email).toBe(COMPANY_INFO.email.main);
      expect(location.address.street).toBe(COMPANY_INFO.address.street);
      expect(location.address.city).toBe(COMPANY_INFO.address.city);
      expect(location.address.state).toBe(COMPANY_INFO.address.state);
      expect(location.address.zip).toBe(COMPANY_INFO.address.zip);
    }
  });

  it("contains structured SEO data for each location", () => {
    for (const [slug, location] of Object.entries(locations)) {
      expect(location.slug).toBe(slug);
      expect(location.seo.title).toContain(location.city);
      expect(location.seo.metaDescription).toContain(location.city);
      expect(location.seo.keywords.length).toBeGreaterThan(0);
      expect(location.localExpertise.description.length).toBeGreaterThan(0);
      expect(location.coordinates.latitude).toBeGreaterThan(0);
      expect(location.coordinates.longitude).toBeLessThan(0);
    }
  });

  it("contains project and zip metadata for key service areas", () => {
    const pasco = getLocationBySlug("pasco");
    const kennewick = getLocationBySlug("kennewick");

    expect(pasco?.serviceZipCodes).toEqual(
      expect.arrayContaining(["99301", "99302"]),
    );
    expect(
      pasco?.recentProjects?.some((p) => p.name === "Volm Corporate Warehouse"),
    ).toBe(true);
    expect(
      kennewick?.recentProjects?.some((p) => p.category === "Healthcare"),
    ).toBe(true);
  });

  it("defines a presence policy for every location and only marks Pasco as a public office", () => {
    for (const slug of Object.keys(locations)) {
      const profile = getLocationEvidenceProfile(slug);
      expect(
        profile.presenceType === "office" ||
          profile.presenceType === "service-area",
      ).toBe(true);
      expect(
        profile.publicAddressPolicy === "public-office-address" ||
          profile.publicAddressPolicy === "service-area-only",
      ).toBe(true);
    }

    expect(isLocationOffice("pasco")).toBe(true);

    const nonOfficeSlugs = Object.keys(locations).filter(
      (slug) => slug !== "pasco",
    );
    nonOfficeSlugs.forEach((slug) => {
      expect(isLocationOffice(slug)).toBe(false);
      expect(getLocationEvidenceProfile(slug).publicAddressPolicy).toBe(
        "service-area-only",
      );
    });
  });

  it("uses canonical service and project detail paths for location proof links", () => {
    const pascoServiceLinks = getLocationServiceDeepLinks("pasco");
    expect(pascoServiceLinks.length).toBeGreaterThan(0);
    pascoServiceLinks.forEach((link) => {
      expect(link.href.startsWith("/services/")).toBe(true);
      expect(link.href.includes("?")).toBe(false);
    });

    const pascoProjectLinks = getLocationProjectDeepLinks("pasco");
    expect(pascoProjectLinks.length).toBeGreaterThan(0);
    pascoProjectLinks.forEach((link) => {
      expect(link.href.startsWith("/projects/")).toBe(true);
      expect(link.href.includes("?")).toBe(false);
    });
  });

  it("keeps related evidence references valid for all location profiles", () => {
    for (const slug of Object.keys(locations)) {
      expect(hasPublishedLocationEvidence(slug)).toBe(true);
    }
  });
});
