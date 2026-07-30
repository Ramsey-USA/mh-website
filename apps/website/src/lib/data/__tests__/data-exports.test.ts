/**
 * Data export module smoke tests.
 *
 * Testimonials and careers runtime content now lives in localized message
 * catalogs, so this suite validates remaining static data modules only.
 */

import { aboutTimelineSteps } from "../about-timeline";
import { teamProfileMembers } from "../team-profiles";
import { COMPANY_INFO } from "@/lib/constants/company";

describe("about-timeline data", () => {
  it("exports a non-empty array of timeline steps", () => {
    expect(Array.isArray(aboutTimelineSteps)).toBe(true);
    expect(aboutTimelineSteps.length).toBeGreaterThan(0);
  });

  it("each step has required fields", () => {
    aboutTimelineSteps.forEach((step) => {
      expect(typeof step.num).toBe("number");
      expect(typeof step.icon).toBe("string");
      expect(typeof step.title).toBe("string");
      expect(typeof step.desc).toBe("string");
      expect(["left", "right"]).toContain(step.position);
    });
  });
});

describe("team-profiles data", () => {
  it("exports a non-empty teamProfileMembers array", () => {
    expect(Array.isArray(teamProfileMembers)).toBe(true);
    expect(teamProfileMembers.length).toBeGreaterThan(0);
  });

  it("each team member has name, role, and cardNumber", () => {
    teamProfileMembers.forEach((member) => {
      expect(typeof member.name).toBe("string");
      expect(typeof member.role).toBe("string");
      expect(typeof member.cardNumber).toBe("number");
    });
  });

  it("routes all public team contact emails through the office inbox", () => {
    teamProfileMembers.forEach((member) => {
      expect(member.email).toBe(COMPANY_INFO.email.main);
    });
  });
});
