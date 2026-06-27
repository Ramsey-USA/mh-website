export const CDN_TEAM_OPTIONS = [
  { id: "alpha", label: "Smokin' Fools BBQ" },
  { id: "bravo", label: "Pork Daddy's" },
  { id: "charlie", label: "Hallmark's BBQ" },
  { id: "delta", label: "Army National Guard" },
  { id: "echo", label: "Classic Grill - Tim Fought" },
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
