/**
 * Pure mapping between {@link VintageTeamMember} and the Hub profile
 * editor's local form state.
 *
 * Extracted from `TeamProfileForm` so the conversion logic is reusable
 * and unit-testable without rendering React.
 */

import type { VintageTeamMember } from "@/lib/data/vintage-team";

// ─── Skill field metadata ────────────────────────────────────────────────────

export interface SkillField {
  readonly key: keyof VintageTeamMember["skills"];
  readonly label: string;
}

export const SKILL_FIELDS: readonly SkillField[] = [
  { key: "leadership", label: "Leadership" },
  { key: "technical", label: "Technical" },
  { key: "communication", label: "Communication" },
  { key: "safety", label: "Safety" },
  { key: "problemSolving", label: "Problem Solving" },
  { key: "teamwork", label: "Teamwork" },
  { key: "organization", label: "Organization" },
  { key: "innovation", label: "Innovation" },
  { key: "passion", label: "Passion" },
  { key: "continuingEducation", label: "Continuing Education" },
] as const;

// ─── Form state shape ────────────────────────────────────────────────────────

export interface ProfileFormState {
  bio: string;
  funFact: string;
  certifications: string;
  hobbies: string;
  specialInterests: string;
  hometown: string;
  education: string;
  nickname: string;
  yearsWithCompany: string;
  /** Up to 5 items, padded with empty strings for stable input rows. */
  careerHighlights: string[];
  /** Up to 6 items, padded with empty strings. */
  specialties: string[];
  skills: Record<keyof VintageTeamMember["skills"], string>;
  currentYearStats: {
    projectsCompleted: string;
    clientSatisfaction: string;
    safetyRecord: string;
    teamCollaborations: string;
  };
  careerStats: {
    totalProjects: string;
    yearsExperience: string;
    specialtyAreas: string;
    mentorships: string;
  };
}

const HIGHLIGHT_SLOTS = 5;
const SPECIALTY_SLOTS = 6;

function padArray(values: readonly string[], slots: number): string[] {
  const padded = [...values];
  while (padded.length < slots) padded.push("");
  return padded.slice(0, slots);
}

function clampSkill(value: number): number {
  return Math.min(100, Math.max(0, value));
}

// ─── Member → form ───────────────────────────────────────────────────────────

export function memberToFormState(member: VintageTeamMember): ProfileFormState {
  const skillEntries = SKILL_FIELDS.map(
    ({ key }) => [key, String(member.skills[key])] as const,
  );

  return {
    bio: member.bio ?? "",
    funFact: member.funFact ?? "",
    certifications: member.certifications ?? "",
    hobbies: member.hobbies ?? "",
    specialInterests: member.specialInterests ?? "",
    hometown: member.hometown ?? "",
    education: member.education ?? "",
    nickname: member.nickname ?? "",
    yearsWithCompany: String(member.yearsWithCompany ?? ""),
    careerHighlights: padArray(member.careerHighlights, HIGHLIGHT_SLOTS),
    specialties: padArray(member.specialties, SPECIALTY_SLOTS),
    skills: Object.fromEntries(skillEntries) as ProfileFormState["skills"],
    currentYearStats: {
      projectsCompleted: String(member.currentYearStats.projectsCompleted),
      clientSatisfaction: String(member.currentYearStats.clientSatisfaction),
      safetyRecord: member.currentYearStats.safetyRecord,
      teamCollaborations: String(member.currentYearStats.teamCollaborations),
    },
    careerStats: {
      totalProjects: String(member.careerStats.totalProjects),
      yearsExperience: String(member.careerStats.yearsExperience),
      specialtyAreas: String(member.careerStats.specialtyAreas),
      mentorships: String(member.careerStats.mentorships),
    },
  };
}

// ─── Form → API payload ──────────────────────────────────────────────────────

function trimOrUndefined(value: string): string | undefined {
  const trimmed = value.trim();
  return trimmed.length > 0 ? trimmed : undefined;
}

function parseIntOrUndefined(value: string): number | undefined {
  const n = Number.parseInt(value, 10);
  return Number.isNaN(n) ? undefined : n;
}

function setIfDefined<T>(
  target: Record<string, unknown>,
  key: string,
  value: T | undefined,
): void {
  if (value !== undefined) target[key] = value;
}

export function formStateToPayload(
  form: ProfileFormState,
): Record<string, unknown> {
  const payload: Record<string, unknown> = {
    bio: trimOrUndefined(form.bio),
    funFact: trimOrUndefined(form.funFact),
    certifications: trimOrUndefined(form.certifications),
    hobbies: trimOrUndefined(form.hobbies),
    specialInterests: trimOrUndefined(form.specialInterests),
    hometown: trimOrUndefined(form.hometown),
    education: trimOrUndefined(form.education),
    nickname: trimOrUndefined(form.nickname),
  };

  setIfDefined(
    payload,
    "yearsWithCompany",
    parseIntOrUndefined(form.yearsWithCompany),
  );

  const highlights = form.careerHighlights.filter((h) => h.trim());
  if (highlights.length > 0) payload["careerHighlights"] = highlights;

  const specialties = form.specialties.filter((s) => s.trim());
  if (specialties.length > 0) payload["specialties"] = specialties;

  const skills: Record<string, number> = {};
  for (const { key } of SKILL_FIELDS) {
    const n = parseIntOrUndefined(form.skills[key]);
    if (n !== undefined) skills[key] = clampSkill(n);
  }
  if (Object.keys(skills).length > 0) payload["skills"] = skills;

  const cys: Record<string, unknown> = {};
  setIfDefined(
    cys,
    "projectsCompleted",
    parseIntOrUndefined(form.currentYearStats.projectsCompleted),
  );
  setIfDefined(
    cys,
    "clientSatisfaction",
    parseIntOrUndefined(form.currentYearStats.clientSatisfaction),
  );
  setIfDefined(
    cys,
    "teamCollaborations",
    parseIntOrUndefined(form.currentYearStats.teamCollaborations),
  );
  setIfDefined(
    cys,
    "safetyRecord",
    trimOrUndefined(form.currentYearStats.safetyRecord),
  );
  if (Object.keys(cys).length > 0) payload["currentYearStats"] = cys;

  const cs: Record<string, number> = {};
  const careerKeys: ReadonlyArray<keyof ProfileFormState["careerStats"]> = [
    "totalProjects",
    "yearsExperience",
    "specialtyAreas",
    "mentorships",
  ];
  for (const key of careerKeys) {
    const n = parseIntOrUndefined(form.careerStats[key]);
    if (n !== undefined) cs[key] = n;
  }
  if (Object.keys(cs).length > 0) payload["careerStats"] = cs;

  return payload;
}
