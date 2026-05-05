/**
 * @jest-environment node
 */

import { locations, getLocationBySlug } from "../locations";
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
});
