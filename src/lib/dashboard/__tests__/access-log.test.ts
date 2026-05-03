import {
  ACCESS_LOG_CSV_HEADERS,
  accessLogCsvRows,
  buildAccessLogQuery,
  formatAccessTimestamp,
  formatEventLabel,
  summarizeUserAgent,
  type AccessLogEntry,
} from "../access-log";

describe("buildAccessLogQuery", () => {
  it("includes a default limit of 250", () => {
    expect(buildAccessLogQuery({})).toBe("limit=250");
  });

  it("encodes filters and converts dates to ISO", () => {
    const qs = buildAccessLogQuery({
      role: "admin",
      eventType: "login",
      fromDate: "2026-01-01",
      toDate: "2026-01-31",
      limit: 100,
    });
    const params = new URLSearchParams(qs);
    expect(params.get("role")).toBe("admin");
    expect(params.get("event_type")).toBe("login");
    expect(params.get("limit")).toBe("100");
    expect(params.get("from_date")).toMatch(/^2026-01-01T/);
    expect(params.get("to_date")).toMatch(/^2026-01-31T23:59:59/);
  });
});

describe("formatEventLabel", () => {
  it("uses the friendly label for known events", () => {
    expect(formatEventLabel("login")).toBe("Login");
    expect(formatEventLabel("compliance_warning")).toBe("Compliance Warning");
  });
  it("title-cases unknown snake_case strings", () => {
    expect(formatEventLabel("custom_event_name")).toBe("Custom Event Name");
  });
});

describe("summarizeUserAgent", () => {
  it("returns 'Unknown' for null/empty input", () => {
    expect(summarizeUserAgent(null)).toBe("Unknown");
  });
  it("identifies Edge on Windows", () => {
    expect(
      summarizeUserAgent(
        "Mozilla/5.0 (Windows NT 10.0) AppleWebKit/537.36 Edg/124.0",
      ),
    ).toBe("Edge / Windows");
  });
  it("identifies Safari on iOS", () => {
    expect(
      summarizeUserAgent(
        "Mozilla/5.0 (iPhone; CPU iPhone OS 17_0) AppleWebKit/605 Safari/604",
      ),
    ).toBe("Safari / iOS");
  });
  it("identifies Chrome on macOS", () => {
    expect(
      summarizeUserAgent(
        "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15) Chrome/124.0",
      ),
    ).toBe("Chrome / macOS");
  });
});

describe("formatAccessTimestamp", () => {
  it("formats an ISO string into a localized timestamp", () => {
    const out = formatAccessTimestamp("2026-05-03T15:30:00Z");
    expect(typeof out).toBe("string");
    expect(out.length).toBeGreaterThan(0);
  });
});

describe("accessLogCsvRows", () => {
  it("has matching column count vs ACCESS_LOG_CSV_HEADERS", () => {
    const entry: AccessLogEntry = {
      id: "1",
      event_type: "login",
      role: "admin",
      user_name: "Matt",
      resource_key: "manual:safety",
      resource_title: "Safety Manual",
      job_id: null,
      ip_address: "1.2.3.4",
      user_agent: "Chrome/124.0 (Windows NT 10.0)",
      accessed_at: "2026-05-03T15:30:00Z",
    };
    const rows = accessLogCsvRows([entry]);
    expect(rows[0]).toHaveLength(ACCESS_LOG_CSV_HEADERS.length);
    expect(rows[0]?.[3]).toBe("Login");
    expect(rows[0]?.[4]).toBe("Safety Manual");
  });

  it("falls back to resource_key when title is missing", () => {
    const entry: AccessLogEntry = {
      id: "2",
      event_type: "download",
      role: "worker",
      user_name: "X",
      resource_key: "doc:abc",
      resource_title: null,
      job_id: null,
      ip_address: null,
      user_agent: null,
      accessed_at: "2026-05-03T15:30:00Z",
    };
    const rows = accessLogCsvRows([entry]);
    expect(rows[0]?.[4]).toBe("doc:abc");
    expect(rows[0]?.[5]).toBe("");
    expect(rows[0]?.[6]).toBe("Unknown");
  });
});
