import redirectRecords from "./redirects.json";

export type RouteRedirectRecord = {
  source: `/${string}`;
  destination: `/${string}`;
  permanent: boolean;
};

export const redirects = redirectRecords as RouteRedirectRecord[];

export function findRedirectConflicts(records: RouteRedirectRecord[]) {
  const duplicates = new Set<string>();
  const sources = new Set<string>();
  const loops = new Set<string>();

  for (const record of records) {
    if (sources.has(record.source)) {
      duplicates.add(record.source);
    }
    sources.add(record.source);

    if (record.source === record.destination) {
      loops.add(record.source);
    }
  }

  return {
    duplicates: [...duplicates],
    loops: [...loops],
  };
}
