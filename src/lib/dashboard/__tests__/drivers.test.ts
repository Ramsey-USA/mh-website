import {
  countActiveDrivers,
  daysUntil,
  DRIVERS_CSV_HEADERS,
  driversCsvRows,
  filterDrivers,
  formatDriverDate,
  hasActionableAlerts,
  isCdlDriver,
  type AuthorizedDriver,
} from "../drivers";

const NOW = new Date("2026-05-03T12:00:00Z");

function makeDriver(
  overrides: Partial<AuthorizedDriver> = {},
): AuthorizedDriver {
  return {
    id: "1",
    employee_name: "Alex Driver",
    license_number: "WDL-123",
    license_state: "WA",
    license_expiration_date: "2027-01-01",
    mvr_status: "clear",
    authorization_status: "authorized",
    consent_on_file: 1,
    created_at: "2026-01-01T00:00:00Z",
    updated_at: "2026-01-01T00:00:00Z",
    ...overrides,
  };
}

describe("drivers helpers", () => {
  describe("daysUntil", () => {
    it("returns positive count for future dates", () => {
      expect(daysUntil("2026-05-13", NOW)).toBeGreaterThanOrEqual(9);
      expect(daysUntil("2026-05-13", NOW)).toBeLessThanOrEqual(11);
    });
    it("returns non-positive for past dates", () => {
      expect(daysUntil("2026-04-01", NOW)).toBeLessThanOrEqual(0);
    });
  });

  describe("formatDriverDate", () => {
    it("returns em dash when undefined", () => {
      expect(formatDriverDate(undefined)).toBe("—");
    });
    it("formats ISO date string", () => {
      expect(formatDriverDate("2026-05-03")).toMatch(/2026/);
    });
  });

  describe("isCdlDriver", () => {
    it("true when class begins with CDL", () => {
      expect(isCdlDriver(makeDriver({ license_class: "CDL-A" }))).toBe(true);
    });
    it("false otherwise", () => {
      expect(isCdlDriver(makeDriver())).toBe(false);
      expect(isCdlDriver(makeDriver({ license_class: "Standard" }))).toBe(
        false,
      );
    });
  });

  describe("filterDrivers", () => {
    const drivers = [
      makeDriver({ id: "a", authorization_status: "authorized" }),
      makeDriver({ id: "b", authorization_status: "pending" }),
      makeDriver({ id: "c", authorization_status: "suspended" }),
      makeDriver({ id: "d", authorization_status: "revoked" }),
      makeDriver({
        id: "e",
        license_class: "CDL-B",
        authorization_status: "authorized",
      }),
      makeDriver({
        id: "f",
        authorization_status: "authorized",
        license_expiration_date: "2026-06-01",
      }),
    ];
    it("all excludes revoked", () => {
      expect(filterDrivers(drivers, "all", NOW).map((d) => d.id)).toEqual([
        "a",
        "b",
        "c",
        "e",
        "f",
      ]);
    });
    it("authorized filter", () => {
      expect(
        filterDrivers(drivers, "authorized", NOW).map((d) => d.id),
      ).toEqual(["a", "e", "f"]);
    });
    it("pending includes suspended", () => {
      expect(filterDrivers(drivers, "pending", NOW).map((d) => d.id)).toEqual([
        "b",
        "c",
      ]);
    });
    it("expiring excludes revoked", () => {
      const ids = filterDrivers(drivers, "expiring", NOW).map((d) => d.id);
      expect(ids).toContain("f");
      expect(ids).not.toContain("d");
    });
    it("cdl filter", () => {
      expect(filterDrivers(drivers, "cdl", NOW).map((d) => d.id)).toEqual([
        "e",
      ]);
    });
  });

  describe("countActiveDrivers", () => {
    it("excludes revoked", () => {
      expect(
        countActiveDrivers([
          makeDriver(),
          makeDriver({ id: "2", authorization_status: "revoked" }),
        ]),
      ).toBe(1);
    });
  });

  describe("hasActionableAlerts", () => {
    it("false when null", () => {
      expect(hasActionableAlerts(null)).toBe(false);
    });
    it("false when all zero", () => {
      expect(
        hasActionableAlerts({
          expiring_count: 0,
          overdue_mvr_count: 0,
          pending_count: 0,
          missing_consent_count: 0,
        }),
      ).toBe(false);
    });
    it("true when any of expiring/overdue/missing-consent > 0", () => {
      expect(
        hasActionableAlerts({
          expiring_count: 1,
          overdue_mvr_count: 0,
          pending_count: 0,
          missing_consent_count: 0,
        }),
      ).toBe(true);
    });
    it("ignores pending-only signal", () => {
      expect(
        hasActionableAlerts({
          expiring_count: 0,
          overdue_mvr_count: 0,
          pending_count: 5,
          missing_consent_count: 0,
        }),
      ).toBe(false);
    });
  });

  describe("driversCsvRows", () => {
    it("emits one row per driver matching header column count", () => {
      const rows = driversCsvRows([makeDriver()], NOW);
      expect(rows).toHaveLength(1);
      expect(rows[0]).toHaveLength(DRIVERS_CSV_HEADERS.length);
    });
    it("encodes consent_on_file as yes/no", () => {
      const [yes] = driversCsvRows([makeDriver({ consent_on_file: 1 })], NOW);
      const [no] = driversCsvRows([makeDriver({ consent_on_file: 0 })], NOW);
      expect(yes).toContain("yes");
      expect(no).toContain("no");
    });
  });
});
