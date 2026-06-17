export const CDN_TEAM_OPTIONS = [
  { id: "alpha", label: "Team Alpha" },
  { id: "bravo", label: "Team Bravo" },
  { id: "charlie", label: "Team Charlie" },
  { id: "delta", label: "Team Delta" },
  { id: "echo", label: "Team Echo" },
  { id: "foxtrot", label: "Team Foxtrot" },
  { id: "golf", label: "Team Golf" },
] as const;

export type CdnTeamId = (typeof CDN_TEAM_OPTIONS)[number]["id"];

export const CDN_VALID_TEAM_IDS = new Set<string>(
  CDN_TEAM_OPTIONS.map((team) => team.id),
);

export const CDN_TEAM_LABELS: Record<string, string> = Object.fromEntries(
  CDN_TEAM_OPTIONS.map((team) => [team.id, team.label]),
);
