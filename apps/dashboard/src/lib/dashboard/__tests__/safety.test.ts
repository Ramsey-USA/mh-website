import {
  buildSubmissionsQuery,
  computePipelineCounts,
  formatFormType,
  formatSafetyDate,
  formatSsspStatus,
  outstandingJobs,
  recentToolboxJobIds,
  SAFETY_DOWNLOADS_CSV_HEADERS,
  SAFETY_SUBMISSIONS_CSV_HEADERS,
  safetyDownloadsCsvRows,
  safetySubmissionsCsvRows,
  SSSP_CSV_HEADERS,
  ssspCsvRows,
  submissionsByFormType,
  type DownloadLogEntry,
  type Job,
  type SsspRecord,
  type Submission,
} from "../safety";

const NOW = new Date("2026-05-03T12:00:00Z");

function makeJob(overrides: Partial<Job> = {}): Job {
  return {
    id: "j1",
    job_number: "2026-001",
    job_name: "Test Job",
    location: null,
    pm_name: null,
    super_name: null,
    status: "active",
    created_at: "2026-01-01T00:00:00Z",
    ...overrides,
  };
}

function makeSubmission(overrides: Partial<Submission> = {}): Submission {
  return {
    id: "s1",
    job_id: "j1",
    job_number: "2026-001",
    job_name: "Test Job",
    form_type: "toolbox-talk",
    submitted_by: "Matt",
    status: "submitted",
    print_count: 0,
    created_at: "2026-05-01T00:00:00Z",
    ...overrides,
  };
}

function makeDownload(
  overrides: Partial<DownloadLogEntry> = {},
): DownloadLogEntry {
  return {
    id: "d1",
    section_key: "ppe",
    section_title: "PPE",
    download_type: "pdf",
    downloaded_by: "Matt",
    job_id: null,
    downloaded_at: "2026-05-01T00:00:00Z",
    ...overrides,
  };
}

describe("safety helpers", () => {
  describe("buildSubmissionsQuery", () => {
    it("returns bare endpoint when no filters", () => {
      expect(buildSubmissionsQuery()).toBe("/api/safety/forms");
    });
    it("encodes all filters", () => {
      expect(
        buildSubmissionsQuery({
          job_id: "j1",
          form_type: "jha",
          status: "submitted",
        }),
      ).toBe("/api/safety/forms?job_id=j1&form_type=jha&status=submitted");
    });
  });

  describe("formatFormType", () => {
    it("uses friendly label", () => {
      expect(formatFormType("toolbox-talk")).toBe("Toolbox Talk");
    });
    it("falls back to raw value", () => {
      expect(formatFormType("custom-form")).toBe("custom-form");
    });
  });

  describe("formatSafetyDate", () => {
    it("returns formatted date", () => {
      expect(formatSafetyDate("2026-05-03T00:00:00Z")).toMatch(/2026|26/);
    });
  });

  describe("computePipelineCounts", () => {
    it("counts each status bucket", () => {
      const counts = computePipelineCounts([
        makeSubmission({ status: "submitted" }),
        makeSubmission({ id: "s2", status: "submitted" }),
        makeSubmission({ id: "s3", status: "reviewed" }),
        makeSubmission({ id: "s4", status: "archived" }),
      ]);
      expect(counts).toEqual({ submitted: 2, reviewed: 1, archived: 1 });
    });
  });

  describe("recentToolboxJobIds", () => {
    it("includes only toolbox-talks within 7 days", () => {
      const fresh = makeSubmission({
        job_id: "a",
        created_at: "2026-05-02T00:00:00Z",
      });
      const stale = makeSubmission({
        id: "s2",
        job_id: "b",
        created_at: "2026-04-01T00:00:00Z",
      });
      const wrongType = makeSubmission({
        id: "s3",
        job_id: "c",
        form_type: "jha",
        created_at: "2026-05-02T00:00:00Z",
      });
      const ids = recentToolboxJobIds([fresh, stale, wrongType], NOW);
      expect([...ids]).toEqual(["a"]);
    });
  });

  describe("outstandingJobs", () => {
    it("returns active jobs without recent toolbox-talks", () => {
      const jobs = [
        makeJob({ id: "a", status: "active" }),
        makeJob({ id: "b", status: "active" }),
        makeJob({ id: "c", status: "closed" }),
      ];
      const submissions = [
        makeSubmission({
          job_id: "a",
          created_at: "2026-05-02T00:00:00Z",
        }),
      ];
      expect(outstandingJobs(jobs, submissions, NOW).map((j) => j.id)).toEqual([
        "b",
      ]);
    });
  });

  describe("submissionsByFormType", () => {
    it("emits one entry per known form type", () => {
      const data = submissionsByFormType([
        makeSubmission({ form_type: "toolbox-talk" }),
        makeSubmission({ id: "s2", form_type: "jha" }),
        makeSubmission({ id: "s3", form_type: "jha" }),
      ]);
      const counts = Object.fromEntries(data.map((d) => [d.name, d.count]));
      expect(counts["Toolbox Talk"]).toBe(1);
      expect(counts["JHA"]).toBe(2);
      expect(counts["Site Inspection"]).toBe(0);
    });
  });

  describe("CSV rows", () => {
    it("submission rows match header column count", () => {
      const rows = safetySubmissionsCsvRows([makeSubmission()]);
      expect(rows[0]).toHaveLength(SAFETY_SUBMISSIONS_CSV_HEADERS.length);
    });
    it("download rows match header column count and fall back for null job", () => {
      const rows = safetyDownloadsCsvRows([makeDownload()]);
      expect(rows[0]).toHaveLength(SAFETY_DOWNLOADS_CSV_HEADERS.length);
      expect(rows[0]).toContain("");
    });
  });

  describe("SSSP helpers", () => {
    function makeSssp(overrides: Partial<SsspRecord> = {}): SsspRecord {
      return {
        id: "sssp1",
        job_id: "j1",
        status: "draft",
        content: null,
        r2_key: null,
        generated_at: null,
        approved_by: null,
        approved_at: null,
        notes: null,
        created_at: "2026-05-01T00:00:00Z",
        updated_at: "2026-05-01T00:00:00Z",
        ...overrides,
      };
    }

    it("formatSsspStatus returns friendly labels", () => {
      expect(formatSsspStatus("draft")).toBe("Draft");
      expect(formatSsspStatus("generating")).toBe("Generating…");
      expect(formatSsspStatus("ready")).toBe("Ready for Review");
      expect(formatSsspStatus("approved")).toBe("Approved");
    });

    it("ssspCsvRows column count matches header", () => {
      const rows = ssspCsvRows([
        makeSssp({ status: "approved", approved_by: "Admin" }),
      ]);
      expect(rows[0]).toHaveLength(SSSP_CSV_HEADERS.length);
    });

    it("ssspCsvRows fills empty strings for null fields", () => {
      const rows = ssspCsvRows([makeSssp()]);
      expect(rows[0]).toContain("");
      // generated_at column (index 2) is null → should be empty string
      const row = rows[0];
      if (row) {
        expect(row[2]).toBe(""); // generated_at null
      }
    });
  });
});
