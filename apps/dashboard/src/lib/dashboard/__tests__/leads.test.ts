import {
  buildLeadsQuery,
  computePipelineStats,
  formatCurrency,
  formatLeadDate,
  formatRelativeDate,
  getSourceLabel,
  isOverdue,
  LEADS_CSV_HEADERS,
  leadsCsvRows,
  overdueLeadsCount,
  searchLeads,
  totalPipelineValue,
  weightedPipelineValue,
  type Lead,
} from "../leads";

const NOW = new Date("2026-05-03T12:00:00Z");

function makeLead(overrides: Partial<Lead> = {}): Lead {
  return {
    id: "1",
    source: "contact_form",
    source_id: null,
    contact_name: "Jane Doe",
    email: "jane@example.com",
    phone: null,
    company: "Acme Corp",
    project_type: "Commercial",
    project_location: "Pasco, WA",
    project_description: null,
    status: "new",
    estimated_value: 100_000,
    probability: 50,
    priority: "medium",
    assigned_to: null,
    follow_up_date: null,
    last_contact_date: null,
    notes: [],
    lost_reason: null,
    created_at: "2026-04-01T00:00:00Z",
    updated_at: "2026-04-01T00:00:00Z",
    closed_at: null,
    metadata: {},
    ...overrides,
  };
}

describe("leads helpers", () => {
  describe("buildLeadsQuery", () => {
    it("returns bare endpoint when no filters", () => {
      expect(buildLeadsQuery()).toBe("/api/leads");
    });

    it("encodes all filters", () => {
      const url = buildLeadsQuery({
        status: "active",
        assigned_to: "matt",
        priority: "urgent",
      });
      expect(url).toBe(
        "/api/leads?status=active&assigned_to=matt&priority=urgent",
      );
    });

    it("omits empty values", () => {
      expect(buildLeadsQuery({ status: "new", assigned_to: "" })).toBe(
        "/api/leads?status=new",
      );
    });
  });

  describe("formatCurrency", () => {
    it("formats numbers as USD with no decimals", () => {
      expect(formatCurrency(123_456)).toBe("$123,456");
    });
    it("returns em dash for null", () => {
      expect(formatCurrency(null)).toBe("—");
    });
  });

  describe("formatLeadDate", () => {
    it("returns em dash for null", () => {
      expect(formatLeadDate(null)).toBe("—");
    });
    it("formats ISO date", () => {
      expect(formatLeadDate("2026-05-03T00:00:00Z")).toMatch(/2026/);
    });
  });

  describe("formatRelativeDate", () => {
    it("returns Today for same day", () => {
      expect(formatRelativeDate(NOW.toISOString(), NOW)).toBe("Today");
    });
    it("returns Yesterday for one day ago", () => {
      const d = new Date(NOW.getTime() - 24 * 60 * 60 * 1000);
      expect(formatRelativeDate(d.toISOString(), NOW)).toBe("Yesterday");
    });
    it("returns N days ago for under a week", () => {
      const d = new Date(NOW.getTime() - 3 * 24 * 60 * 60 * 1000);
      expect(formatRelativeDate(d.toISOString(), NOW)).toBe("3 days ago");
    });
    it("returns N weeks ago for under 30 days", () => {
      const d = new Date(NOW.getTime() - 14 * 24 * 60 * 60 * 1000);
      expect(formatRelativeDate(d.toISOString(), NOW)).toBe("2 weeks ago");
    });
  });

  describe("isOverdue", () => {
    it("returns false for null", () => {
      expect(isOverdue(null, NOW)).toBe(false);
    });
    it("returns true for past dates", () => {
      expect(isOverdue("2026-05-01T00:00:00Z", NOW)).toBe(true);
    });
    it("returns false for future dates", () => {
      expect(isOverdue("2026-06-01T00:00:00Z", NOW)).toBe(false);
    });
  });

  describe("getSourceLabel", () => {
    it("uses friendly label when known", () => {
      expect(getSourceLabel("contact_form")).toBe("Contact Form");
    });
    it("labels booth event leads for csv exports", () => {
      expect(getSourceLabel("event_booth")).toBe("Event Booth");
    });
    it("falls back to raw source when unknown", () => {
      expect(getSourceLabel("zapier")).toBe("zapier");
    });
  });

  describe("computePipelineStats", () => {
    it("buckets count and value per status", () => {
      const stats = computePipelineStats([
        makeLead({ status: "new", estimated_value: 100 }),
        makeLead({ id: "2", status: "new", estimated_value: 200 }),
        makeLead({ id: "3", status: "won", estimated_value: 1000 }),
      ]);
      expect(stats.new).toEqual({ count: 2, value: 300 });
      expect(stats.won).toEqual({ count: 1, value: 1000 });
      expect(stats.lost).toEqual({ count: 0, value: 0 });
    });
  });

  describe("pipeline totals exclude won/lost", () => {
    const sample = [
      makeLead({ status: "new", estimated_value: 100, probability: 50 }),
      makeLead({
        id: "2",
        status: "negotiating",
        estimated_value: 200,
        probability: 80,
      }),
      makeLead({ id: "3", status: "won", estimated_value: 9999 }),
      makeLead({ id: "4", status: "lost", estimated_value: 9999 }),
    ];
    it("totalPipelineValue", () => {
      expect(totalPipelineValue(sample)).toBe(300);
    });
    it("weightedPipelineValue", () => {
      expect(weightedPipelineValue(sample)).toBe(50 + 160);
    });
  });

  describe("overdueLeadsCount", () => {
    it("counts only open overdue leads", () => {
      const leads = [
        makeLead({ follow_up_date: "2026-04-01T00:00:00Z" }),
        makeLead({
          id: "2",
          status: "won",
          follow_up_date: "2026-04-01T00:00:00Z",
        }),
        makeLead({ id: "3", follow_up_date: "2026-06-01T00:00:00Z" }),
      ];
      expect(overdueLeadsCount(leads, NOW)).toBe(1);
    });
  });

  describe("searchLeads", () => {
    const leads = [
      makeLead({ contact_name: "Alice", company: "Acme" }),
      makeLead({ id: "2", contact_name: "Bob", company: "Globex" }),
    ];
    it("returns all when query is empty", () => {
      expect(searchLeads(leads, "").length).toBe(2);
    });
    it("matches by contact name", () => {
      expect(searchLeads(leads, "alice").map((l) => l.id)).toEqual(["1"]);
    });
    it("matches by company", () => {
      expect(searchLeads(leads, "globex").map((l) => l.id)).toEqual(["2"]);
    });
  });

  describe("leadsCsvRows", () => {
    it("emits one row per lead with header column count", () => {
      const rows = leadsCsvRows([makeLead()]);
      expect(rows).toHaveLength(1);
      expect(rows[0]).toHaveLength(LEADS_CSV_HEADERS.length);
    });
    it("includes project description in the csv row", () => {
      const rows = leadsCsvRows([
        makeLead({
          project_description: "Hilti guess: 247; BBQ vote: River City Q",
        }),
      ]);
      expect(rows[0][8]).toBe("Hilti guess: 247; BBQ vote: River City Q");
    });
    it("falls back to 0/empty for nullable fields", () => {
      const rows = leadsCsvRows([
        makeLead({
          estimated_value: null,
          assigned_to: null,
          follow_up_date: null,
          email: null,
          phone: null,
          company: null,
          project_type: null,
          project_location: null,
          last_contact_date: null,
        }),
      ]);
      const row = rows[0];
      expect(row).toContain(0);
      expect(row).toContain("");
    });
  });
});
