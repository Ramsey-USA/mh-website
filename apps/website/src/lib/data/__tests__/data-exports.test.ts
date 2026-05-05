/**
 * Data export module smoke tests
 * Verifies that each data module loads and exports non-empty arrays/values.
 * Importing the modules drives V8 module-initialization coverage.
 */

import { aboutTimelineSteps } from "../about-timeline";
import { companyBenefits, veteranBenefits, cultureValues } from "../careers";
import {
  clientTestimonials,
  employeeTestimonials,
  getClientTestimonials,
  getEmployeeTestimonials,
  getAllTestimonials,
  getVeteranTestimonials,
} from "../testimonials";
import { vintageTeamMembers } from "../vintage-team";

// ── about-timeline ────────────────────────────────────────────────────────────

describe("about-timeline data", () => {
  it("exports a non-empty array of timeline steps", () => {
    expect(Array.isArray(aboutTimelineSteps)).toBe(true);
    expect(aboutTimelineSteps.length).toBeGreaterThan(0);
  });

  it("each step has required fields: num, icon, title, desc, position", () => {
    aboutTimelineSteps.forEach((step) => {
      expect(typeof step.num).toBe("number");
      expect(typeof step.icon).toBe("string");
      expect(typeof step.title).toBe("string");
      expect(typeof step.desc).toBe("string");
      expect(["left", "right"]).toContain(step.position);
    });
  });
});

// ── careers ───────────────────────────────────────────────────────────────────

describe("careers data", () => {
  it("exports non-empty companyBenefits array", () => {
    expect(Array.isArray(companyBenefits)).toBe(true);
    expect(companyBenefits.length).toBeGreaterThan(0);
  });

  it("exports non-empty veteranBenefits array", () => {
    expect(Array.isArray(veteranBenefits)).toBe(true);
    expect(veteranBenefits.length).toBeGreaterThan(0);
  });

  it("exports non-empty cultureValues array", () => {
    expect(Array.isArray(cultureValues)).toBe(true);
    expect(cultureValues.length).toBeGreaterThan(0);
  });

  it("each benefit has icon, title, description fields", () => {
    companyBenefits.forEach((b) => {
      expect(typeof b.icon).toBe("string");
      expect(typeof b.title).toBe("string");
      expect(typeof b.description).toBe("string");
    });
  });
});

// ── testimonials ──────────────────────────────────────────────────────────────

describe("testimonials data", () => {
  it("exports non-empty clientTestimonials array", () => {
    expect(Array.isArray(clientTestimonials)).toBe(true);
    expect(clientTestimonials.length).toBeGreaterThan(0);
  });

  it("exports employeeTestimonials array", () => {
    expect(Array.isArray(employeeTestimonials)).toBe(true);
  });

  it("getVeteranTestimonials() returns an array", () => {
    expect(Array.isArray(getVeteranTestimonials())).toBe(true);
  });

  it("getClientTestimonials() returns all when featured is undefined", () => {
    expect(getClientTestimonials()).toEqual(clientTestimonials);
  });

  it("getClientTestimonials(true) returns only featured testimonials", () => {
    const featured = getClientTestimonials(true);
    featured.forEach((t) => expect(t.featured).toBe(true));
  });

  it("getEmployeeTestimonials() returns all employee testimonials", () => {
    expect(getEmployeeTestimonials()).toEqual(employeeTestimonials);
  });

  it("getEmployeeTestimonials(true) returns only featured", () => {
    const featured = getEmployeeTestimonials(true);
    featured.forEach((t) => expect(t.featured).toBe(true));
  });

  it("getAllTestimonials() merges client and employee arrays", () => {
    const all = getAllTestimonials();
    expect(all.length).toBe(
      clientTestimonials.length + employeeTestimonials.length,
    );
  });

  it("getAllTestimonials(true) returns only featured entries", () => {
    const featured = getAllTestimonials(true);
    featured.forEach((t) => expect(t.featured).toBe(true));
  });

  it("each client testimonial has required fields", () => {
    clientTestimonials.forEach((t) => {
      expect(typeof t.id).toBe("string");
      expect(typeof t.name).toBe("string");
      expect(typeof t.quote).toBe("string");
      expect(["client", "employee", "veteran"]).toContain(t.type);
    });
  });
});

// ── vintage-team ──────────────────────────────────────────────────────────────

describe("vintage-team data", () => {
  it("exports a non-empty vintageTeamMembers array", () => {
    expect(Array.isArray(vintageTeamMembers)).toBe(true);
    expect(vintageTeamMembers.length).toBeGreaterThan(0);
  });

  it("each team member has name, role, and cardNumber", () => {
    vintageTeamMembers.forEach((member) => {
      expect(typeof member.name).toBe("string");
      expect(typeof member.role).toBe("string");
      expect(typeof member.cardNumber).toBe("number");
    });
  });
});
