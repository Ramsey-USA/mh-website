export const CDN_TEAM_OPTIONS = [
  { id: "alpha", label: "Smokin' Fools BBQ" },
  { id: "bravo", label: "Pork Daddy's" },
  { id: "charlie", label: "Hallmark's BBQ" },
  { id: "delta", label: "Army National Guard" },
  { id: "echo", label: "Classic Grill - Tim Fought" },
  { id: "foxtrot", label: "Bad Bish BBQ" },
  { id: "golf", label: "Team Golf" },
] as const;

export type CdnTeamId = (typeof CDN_TEAM_OPTIONS)[number]["id"];

export const CDN_VALID_TEAM_IDS = new Set<string>(
  CDN_TEAM_OPTIONS.map((team) => team.id),
);

export const CDN_TEAM_LABELS: Record<string, string> = Object.fromEntries(
  CDN_TEAM_OPTIONS.map((team) => [team.id, team.label]),
);

function normalizeVoteToken(value: string): string {
  return value
    .toLowerCase()
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, " ")
    .trim()
    .replace(/\s+/g, " ");
}

const CDN_NORMALIZED_LABEL_TO_ID = new Map<string, string>(
  CDN_TEAM_OPTIONS.map((team) => [normalizeVoteToken(team.label), team.id]),
);

/**
 * Normalizes persisted vote values from current and legacy payloads to a
 * canonical team id used by the API and results UI.
 */
export function normalizeCdnVoteId(value: string): string {
  const trimmed = value.trim();
  if (!trimmed) return "";

  if (trimmed in CDN_TEAM_LABELS) {
    return trimmed;
  }

  const fromLabel = CDN_NORMALIZED_LABEL_TO_ID.get(normalizeVoteToken(trimmed));
  return fromLabel ?? "";
}
