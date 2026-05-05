/**
 * @jest-environment node
 *
 * Pure unit tests for the Hub profile-mapping helpers. These functions
 * have no React or DOM dependencies, so node is enough.
 */

import {
  SKILL_FIELDS,
  formStateToPayload,
  memberToFormState,
  type ProfileFormState,
} from "../profile-mapping";
import type { VintageTeamMember } from "@/lib/data/vintage-team";

function makeMember(
  overrides: Partial<VintageTeamMember> = {},
): VintageTeamMember {
  return {
    name: "Test Person",
    role: "Tester",
    department: "QA",
    cardNumber: 1,
    position: "Tester",
    yearsWithCompany: 4,
    skills: {
      leadership: 50,
      technical: 60,
      communication: 70,
      safety: 80,
      problemSolving: 65,
      teamwork: 75,
      organization: 55,
      innovation: 45,
      passion: 90,
      continuingEducation: 35,
    },
    currentYearStats: {
      projectsCompleted: 12,
      clientSatisfaction: 95,
      safetyRecord: "EXCELLENT",
      teamCollaborations: 8,
    },
    careerStats: {
      totalProjects: 120,
      yearsExperience: 10,
      specialtyAreas: 4,
      mentorships: 5,
    },
    bio: "Test bio.",
    careerHighlights: ["First", "Second"],
    specialties: ["Alpha", "Beta", "Gamma"],
    active: true,
    slug: "test-person",
    ...overrides,
  };
}

describe("memberToFormState", () => {
  it("maps every field including skills to string form values", () => {
    const member = makeMember();
    const form = memberToFormState(member);

    expect(form.bio).toBe("Test bio.");
    expect(form.yearsWithCompany).toBe("4");
    expect(form.skills.leadership).toBe("50");
    expect(form.skills.continuingEducation).toBe("35");
    expect(form.currentYearStats.projectsCompleted).toBe("12");
    expect(form.careerStats.totalProjects).toBe("120");
  });

  it("pads career highlights to 5 slots and specialties to 6", () => {
    const form = memberToFormState(makeMember());
    expect(form.careerHighlights).toHaveLength(5);
    expect(form.careerHighlights.slice(0, 2)).toEqual(["First", "Second"]);
    expect(form.careerHighlights.slice(2)).toEqual(["", "", ""]);

    expect(form.specialties).toHaveLength(6);
    expect(form.specialties.slice(0, 3)).toEqual(["Alpha", "Beta", "Gamma"]);
    expect(form.specialties.slice(3)).toEqual(["", "", ""]);
  });

  it("truncates oversized arrays to the slot count", () => {
    const member = makeMember({
      careerHighlights: ["a", "b", "c", "d", "e", "f", "g"],
      specialties: ["1", "2", "3", "4", "5", "6", "7", "8"],
    });
    const form = memberToFormState(member);
    expect(form.careerHighlights).toHaveLength(5);
    expect(form.specialties).toHaveLength(6);
    expect(form.specialties[5]).toBe("6");
  });

  it("substitutes empty strings for missing optional fields", () => {
    const member = makeMember();
    delete (member as { funFact?: unknown }).funFact;
    delete (member as { hometown?: unknown }).hometown;
    delete (member as { certifications?: unknown }).certifications;
    const form = memberToFormState(member);
    expect(form.funFact).toBe("");
    expect(form.hometown).toBe("");
    expect(form.certifications).toBe("");
  });

  it("includes every defined skill key", () => {
    const form = memberToFormState(makeMember());
    for (const { key } of SKILL_FIELDS) {
      expect(form.skills[key]).toMatch(/^\d+$/);
    }
  });
});

describe("formStateToPayload", () => {
  function baseForm(): ProfileFormState {
    return memberToFormState(makeMember());
  }

  it("trims string fields and drops empties", () => {
    const form = baseForm();
    form.bio = "  Updated bio  ";
    form.funFact = "   ";
    form.hometown = "";

    const payload = formStateToPayload(form);
    expect(payload["bio"]).toBe("Updated bio");
    expect(payload["funFact"]).toBeUndefined();
    expect(payload["hometown"]).toBeUndefined();
  });

  it("clamps skill values to the 0-100 range", () => {
    const form = baseForm();
    form.skills.leadership = "150";
    form.skills.technical = "-20";
    form.skills.safety = "75";

    const payload = formStateToPayload(form) as {
      skills: Record<string, number>;
    };
    expect(payload.skills["leadership"]).toBe(100);
    expect(payload.skills["technical"]).toBe(0);
    expect(payload.skills["safety"]).toBe(75);
  });

  it("filters out empty career highlights and specialties", () => {
    const form = baseForm();
    form.careerHighlights = ["Lead architect", "", "  ", "Built thing"];
    form.specialties = ["A", " ", "B", "", "C", ""];

    const payload = formStateToPayload(form);
    expect(payload["careerHighlights"]).toEqual([
      "Lead architect",
      "Built thing",
    ]);
    expect(payload["specialties"]).toEqual(["A", "B", "C"]);
  });

  it("omits arrays entirely when fully empty", () => {
    const form = baseForm();
    form.careerHighlights = ["", "", "", "", ""];
    form.specialties = ["", "", "", "", "", ""];

    const payload = formStateToPayload(form);
    expect(payload["careerHighlights"]).toBeUndefined();
    expect(payload["specialties"]).toBeUndefined();
  });

  it("parses numeric stats and drops NaN values", () => {
    const form = baseForm();
    form.yearsWithCompany = "7";
    form.currentYearStats.projectsCompleted = "11";
    form.currentYearStats.clientSatisfaction = "abc";
    form.careerStats.totalProjects = "200";

    const payload = formStateToPayload(form) as {
      yearsWithCompany: number;
      currentYearStats: Record<string, unknown>;
      careerStats: Record<string, number>;
    };

    expect(payload.yearsWithCompany).toBe(7);
    expect(payload.currentYearStats["projectsCompleted"]).toBe(11);
    expect(payload.currentYearStats["clientSatisfaction"]).toBeUndefined();
    expect(payload.careerStats["totalProjects"]).toBe(200);
  });

  it("survives a member -> form -> payload roundtrip without losing data", () => {
    const member = makeMember();
    const form = memberToFormState(member);
    const payload = formStateToPayload(form) as {
      bio: string;
      yearsWithCompany: number;
      skills: Record<string, number>;
      careerHighlights: string[];
      specialties: string[];
    };

    expect(payload.bio).toBe(member.bio);
    expect(payload.yearsWithCompany).toBe(member.yearsWithCompany);
    expect(payload.skills["leadership"]).toBe(member.skills.leadership);
    expect(payload.careerHighlights).toEqual(member.careerHighlights);
    expect(payload.specialties).toEqual(member.specialties);
  });
});
