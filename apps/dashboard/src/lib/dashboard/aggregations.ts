/**
 * Pure aggregation helpers for analytics dashboard click data.
 *
 * Extracted from `src/app/dashboard/page.tsx` so the calculations can be
 * memoized at the page level and unit-tested without React.
 */

import type { DashboardClick } from "./types";

export interface LocationAggregate {
  readonly key: string;
  readonly count: number;
  readonly state?: string;
  readonly city?: string;
}

export interface CtaAggregate {
  readonly id: string;
  readonly count: number;
}

export const TARGET_MARKET_STATES: ReadonlySet<string> = new Set([
  "Washington",
  "WA",
  "Oregon",
  "OR",
  "Idaho",
  "ID",
]);

export function aggregateLocations(
  clicks: ReadonlyArray<DashboardClick>,
  limit = 10,
): ReadonlyArray<LocationAggregate> {
  const counts = new Map<
    string,
    { count: number; state?: string; city?: string }
  >();

  for (const click of clicks) {
    if (click.city && click.state) {
      const key = `${click.city}, ${click.state}`;
      const entry = counts.get(key) ?? {
        count: 0,
        city: click.city,
        state: click.state,
      };
      entry.count++;
      counts.set(key, entry);
    } else if (click.state) {
      const entry = counts.get(click.state) ?? {
        count: 0,
        state: click.state,
      };
      entry.count++;
      counts.set(click.state, entry);
    }
  }

  return [...counts.entries()]
    .sort(([, a], [, b]) => b.count - a.count)
    .slice(0, limit)
    .map(([key, value]) => ({ key, ...value }));
}

export function aggregateStateCounts(
  clicks: ReadonlyArray<DashboardClick>,
): ReadonlyMap<string, number> {
  const counts = new Map<string, number>();
  for (const click of clicks) {
    if (!click.state) continue;
    counts.set(click.state, (counts.get(click.state) ?? 0) + 1);
  }
  return counts;
}

export function topStates(
  stateCounts: ReadonlyMap<string, number>,
  limit = 5,
): ReadonlyArray<readonly [string, number]> {
  return [...stateCounts.entries()]
    .sort(([, a], [, b]) => b - a)
    .slice(0, limit);
}

export function calculateTargetMarketCoverage(
  clicks: ReadonlyArray<DashboardClick>,
): { targetCount: number; total: number; percentage: number } {
  let targetCount = 0;
  let total = 0;
  for (const click of clicks) {
    total++;
    if (click.state && TARGET_MARKET_STATES.has(click.state)) {
      targetCount++;
    }
  }
  const percentage = total > 0 ? (targetCount / total) * 100 : 0;
  return { targetCount, total, percentage };
}

export function aggregateCtas(
  clicks: ReadonlyArray<DashboardClick>,
  limit = 12,
): ReadonlyArray<CtaAggregate> {
  const counts = new Map<string, number>();
  for (const click of clicks) {
    if (!click.element) continue;
    counts.set(click.element, (counts.get(click.element) ?? 0) + 1);
  }
  return [...counts.entries()]
    .sort(([, a], [, b]) => b - a)
    .slice(0, limit)
    .map(([id, count]) => ({ id, count }));
}

export function veteranPageViewTotal(
  pages: Record<string, number> | undefined,
): number {
  if (!pages) return 0;
  let total = 0;
  for (const [page, views] of Object.entries(pages)) {
    if (page.includes("veteran")) total += views;
  }
  return total;
}
