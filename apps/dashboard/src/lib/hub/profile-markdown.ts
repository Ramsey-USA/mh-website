import type { VintageTeamMember } from "@/lib/data/vintage-team";

const CODE_BLOCK_TAG = "team-profile-payload";
const CODE_FENCE = "```";

function normalizeLineEndings(input: string): string {
  return input.replaceAll("\r\n", "\n");
}

function toPayload(member: VintageTeamMember): Record<string, unknown> {
  return {
    bio: member.bio,
    funFact: member.funFact ?? "",
    certifications: member.certifications ?? "",
    hobbies: member.hobbies ?? "",
    specialInterests: member.specialInterests ?? "",
    hometown: member.hometown ?? "",
    education: member.education ?? "",
    nickname: member.nickname ?? "",
    yearsWithCompany: member.yearsWithCompany,
    careerHighlights: member.careerHighlights,
    specialties: member.specialties,
    skills: member.skills,
    currentYearStats: member.currentYearStats,
    careerStats: member.careerStats,
  };
}

export function teamProfileToMarkdown(member: VintageTeamMember): string {
  const payload = JSON.stringify(toPayload(member), null, 2);
  return [
    "# Team Profile Questionnaire Draft",
    "",
    `Employee: ${member.name}`,
    `Role: ${member.role}`,
    `Slug: ${member.slug}`,
    "",
    "Edit the JSON payload below and re-apply it in the Dashboard Team Questionnaire tab.",
    "This updates the same profile override data used by the website Team portal.",
    "",
    `\`\`\`json ${CODE_BLOCK_TAG}`,
    payload,
    "```",
    "",
  ].join("\n");
}

function extractPayloadBlock(markdown: string): string | null {
  const normalized = normalizeLineEndings(markdown);
  const tagged = new RegExp(
    `${CODE_FENCE}json\\s+${CODE_BLOCK_TAG}\\n([\\s\\S]*?)\\n${CODE_FENCE}`,
    "i",
  );
  const taggedMatch = tagged.exec(normalized);
  if (taggedMatch?.[1]) return taggedMatch[1];

  const generic = /```json\n([\s\S]*?)\n```/i;
  const genericMatch = generic.exec(normalized);
  return genericMatch?.[1] ?? null;
}

export function markdownToTeamProfilePayload(
  markdown: string,
): Record<string, unknown> {
  const block = extractPayloadBlock(markdown);
  if (!block) {
    throw new Error(
      "No JSON payload block found. Include a ```json team-profile-payload``` block.",
    );
  }

  let parsed: unknown;
  try {
    parsed = JSON.parse(block);
  } catch {
    throw new Error("Invalid JSON in markdown payload block.");
  }

  if (typeof parsed !== "object" || parsed === null || Array.isArray(parsed)) {
    throw new Error("JSON payload must be an object.");
  }

  return parsed as Record<string, unknown>;
}
