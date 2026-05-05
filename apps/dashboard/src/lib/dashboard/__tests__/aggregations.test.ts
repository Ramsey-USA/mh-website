import {
  aggregateCtas,
  aggregateLocations,
  aggregateStateCounts,
  calculateTargetMarketCoverage,
  TARGET_MARKET_STATES,
  topStates,
  veteranPageViewTotal,
} from "../aggregations";
import type { DashboardClick } from "../types";

const clicks: ReadonlyArray<DashboardClick> = [
  { element: "phone-header", state: "WA", city: "Pasco" },
  { element: "phone-header", state: "WA", city: "Pasco" },
  { element: "email-footer", state: "WA", city: "Kennewick" },
  { element: "address-card", state: "OR", city: "Portland" },
  { element: "phone-cta", state: "ID" },
  { element: "phone-cta", state: "CA" },
  {},
];

describe("aggregateLocations", () => {
  it("counts city,state pairs and falls back to state-only entries", () => {
    const result = aggregateLocations(clicks);
    expect(result[0]).toEqual({
      key: "Pasco, WA",
      count: 2,
      city: "Pasco",
      state: "WA",
    });
    const idEntry = result.find((r) => r.key === "ID");
    expect(idEntry?.count).toBe(1);
  });

  it("respects the limit parameter", () => {
    expect(aggregateLocations(clicks, 2)).toHaveLength(2);
  });

  it("returns an empty array when there are no geo-tagged clicks", () => {
    expect(aggregateLocations([{ element: "x" }])).toEqual([]);
  });
});

describe("aggregateStateCounts + topStates", () => {
  it("totals state hits", () => {
    const counts = aggregateStateCounts(clicks);
    expect(counts.get("WA")).toBe(3);
    expect(counts.get("OR")).toBe(1);
    expect(counts.get("ID")).toBe(1);
    expect(counts.get("CA")).toBe(1);
  });
  it("returns sorted top states", () => {
    const top = topStates(aggregateStateCounts(clicks), 2);
    expect(top[0]?.[0]).toBe("WA");
    expect(top).toHaveLength(2);
  });
});

describe("calculateTargetMarketCoverage", () => {
  it("computes percentage of target-market clicks", () => {
    const { targetCount, total, percentage } =
      calculateTargetMarketCoverage(clicks);
    // WA(3) + OR(1) + ID(1) = 5 of 7 total clicks
    expect(targetCount).toBe(5);
    expect(total).toBe(7);
    expect(percentage).toBeCloseTo((5 / 7) * 100, 4);
  });
  it("returns 0% when no clicks", () => {
    expect(calculateTargetMarketCoverage([])).toEqual({
      targetCount: 0,
      total: 0,
      percentage: 0,
    });
  });
});

describe("aggregateCtas", () => {
  it("counts and sorts CTA element ids", () => {
    const result = aggregateCtas(clicks);
    expect(result[0]).toEqual({ id: "phone-header", count: 2 });
    expect(result.find((r) => r.id === "phone-cta")?.count).toBe(2);
    // ignores entries without an element id
    expect(result.some((r) => r.id === undefined)).toBe(false);
  });
});

describe("veteranPageViewTotal", () => {
  it("sums views for pages whose key includes 'veteran'", () => {
    expect(
      veteranPageViewTotal({
        "/veterans": 10,
        "/team-veteran": 5,
        "/about": 3,
      }),
    ).toBe(15);
  });
  it("returns 0 for undefined or empty input", () => {
    expect(veteranPageViewTotal(undefined)).toBe(0);
    expect(veteranPageViewTotal({})).toBe(0);
  });
});

describe("TARGET_MARKET_STATES", () => {
  it("includes both abbreviations and full names for WA/OR/ID", () => {
    for (const s of ["WA", "OR", "ID", "Washington", "Oregon", "Idaho"]) {
      expect(TARGET_MARKET_STATES.has(s)).toBe(true);
    }
    expect(TARGET_MARKET_STATES.has("CA")).toBe(false);
  });
});
