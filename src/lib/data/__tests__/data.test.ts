import {
  companyBenefits,
  veteranBenefits,
  cultureValues,
} from "@/lib/data/careers";
import { clientTestimonials } from "@/lib/data/testimonials";
import { aboutTimelineSteps } from "@/lib/data/about-timeline";
import { vintageTeamMembers } from "@/lib/data/vintage-team";
import { locations } from "@/lib/data/locations";

describe("Static Data: careers.ts", () => {
  it("companyBenefits is a non-empty array", () => {
    expect(Array.isArray(companyBenefits)).toBe(true);
    expect(companyBenefits.length).toBeGreaterThan(0);
  });

  it("each benefit has icon, title, description", () => {
    for (const b of companyBenefits) {
      expect(typeof b.icon).toBe("string");
      expect(typeof b.title).toBe("string");
      expect(typeof b.description).toBe("string");
    }
  });

  it("veteranBenefits is a non-empty array with required fields", () => {
    expect(veteranBenefits.length).toBeGreaterThan(0);
    for (const b of veteranBenefits) {
      expect(b).toHaveProperty("icon");
      expect(b).toHaveProperty("title");
      expect(b).toHaveProperty("description");
    }
  });

  it("cultureValues is a non-empty array with required fields", () => {
    expect(cultureValues.length).toBeGreaterThan(0);
    for (const v of cultureValues) {
      expect(v).toHaveProperty("icon");
      expect(v).toHaveProperty("title");
      expect(v).toHaveProperty("description");
      expect(v).toHaveProperty("color");
    }
  });
});

describe("Static Data: testimonials.ts", () => {
  it("clientTestimonials is a non-empty array", () => {
    expect(Array.isArray(clientTestimonials)).toBe(true);
    expect(clientTestimonials.length).toBeGreaterThan(0);
  });

  it("each testimonial has required fields", () => {
    for (const t of clientTestimonials) {
      expect(typeof t.id).toBe("string");
      expect(typeof t.name).toBe("string");
      expect(typeof t.quote).toBe("string");
      expect(t.type).toBeDefined();
    }
  });

  it("featured testimonials have rating", () => {
    const featured = clientTestimonials.filter((t) => t.featured);
    expect(featured.length).toBeGreaterThan(0);
    for (const t of featured) {
      expect(typeof t.rating).toBe("number");
      expect(t.rating).toBeGreaterThanOrEqual(1);
      expect(t.rating).toBeLessThanOrEqual(5);
    }
  });
});

describe("Static Data: about-timeline.ts", () => {
  it("aboutTimelineSteps is a non-empty array", () => {
    expect(Array.isArray(aboutTimelineSteps)).toBe(true);
    expect(aboutTimelineSteps.length).toBeGreaterThan(0);
  });

  it("each step has num, title, desc, and position", () => {
    for (const step of aboutTimelineSteps) {
      expect(typeof step.num).toBe("number");
      expect(typeof step.title).toBe("string");
      expect(typeof step.desc).toBe("string");
      expect(["left", "right"]).toContain(step.position);
    }
  });

  it("steps are numbered sequentially starting at 1", () => {
    expect(aboutTimelineSteps[0]!.num).toBe(1);
  });
});

describe("Static Data: vintage-team.ts", () => {
  it("vintageTeamMembers is a non-empty array", () => {
    expect(Array.isArray(vintageTeamMembers)).toBe(true);
    expect(vintageTeamMembers.length).toBeGreaterThan(0);
  });

  it("each member has name and role", () => {
    for (const member of vintageTeamMembers) {
      expect(typeof member.name).toBe("string");
      expect(typeof member.role).toBe("string");
    }
  });

  it("first member is Jeremy Thamert", () => {
    expect(vintageTeamMembers[0]!.name).toBe("Jeremy Thamert");
  });
});

describe("Static Data: locations.ts", () => {
  const locationList = Object.values(locations);

  it("locations is a non-empty object", () => {
    expect(locationList.length).toBeGreaterThan(0);
  });

  it("each location has required fields", () => {
    for (const loc of locationList) {
      expect(typeof loc.slug).toBe("string");
      expect(typeof loc.city).toBe("string");
      expect(typeof loc.state).toBe("string");
      expect(loc.seo).toBeDefined();
      expect(typeof loc.seo.title).toBe("string");
      expect(typeof loc.seo.metaDescription).toBe("string");
    }
  });

  it("richland location exists", () => {
    expect(locations["richland"]).toBeDefined();
    expect(locations["richland"]!.city).toBe("Richland");
    expect(locations["richland"]!.state).toBe("WA");
  });

  it("each location has coordinates", () => {
    for (const loc of locationList) {
      expect(typeof loc.coordinates.latitude).toBe("number");
      expect(typeof loc.coordinates.longitude).toBe("number");
    }
  });
});
