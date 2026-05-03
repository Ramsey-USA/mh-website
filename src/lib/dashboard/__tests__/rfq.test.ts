import {
  ALL_SECTIONS,
  buildRfqConfig,
  DEFAULT_EXHIBITS,
  isRfqInfoComplete,
  rfqConfigFilename,
  rfqConfigSlug,
  requiredSectionIds,
  slugifyRfqName,
  STEPS,
  type EvaluationCriterion,
  type ExhibitConfig,
} from "../rfq";

describe("rfq helpers", () => {
  describe("ALL_SECTIONS / requiredSectionIds", () => {
    it("includes the two required sections", () => {
      const required = requiredSectionIds();
      expect(required).toEqual(
        expect.arrayContaining(["company-overview", "consultation"]),
      );
      expect(required).toHaveLength(
        ALL_SECTIONS.filter((s) => s.required).length,
      );
    });
  });

  describe("STEPS", () => {
    it("declares the wizard order", () => {
      expect(STEPS.map((s) => s.id)).toEqual([
        "rfq-info",
        "eval-criteria",
        "sections",
        "exhibits",
        "review",
      ]);
    });
  });

  describe("slugifyRfqName", () => {
    it("lowercases, hyphenates and trims", () => {
      expect(slugifyRfqName("  Water Treatment // Phase 2!! ")).toBe(
        "water-treatment-phase-2",
      );
    });
  });

  describe("rfqConfigSlug", () => {
    it("prefers project name", () => {
      const cfg = buildRfqConfig({
        projectName: "Big Project",
        issuingOrg: "City",
        rfqNumber: "RFQ-1",
        dueDate: "",
        submissionDate: "",
        recipientName: "",
        recipientTitle: "",
        recipientEmail: "",
        hasEvalCriteria: false,
        evalCriteria: [],
        selectedSections: [],
        exhibits: [],
        exhibitNotes: "",
      });
      expect(rfqConfigSlug(cfg)).toBe("big-project");
      expect(rfqConfigFilename(cfg)).toBe("rfq-params-big-project.json");
    });
    it("falls back to RFQ number then 'rfq'", () => {
      const cfg = buildRfqConfig({
        projectName: "",
        issuingOrg: "",
        rfqNumber: "RFQ 2026-007",
        dueDate: "",
        submissionDate: "",
        recipientName: "",
        recipientTitle: "",
        recipientEmail: "",
        hasEvalCriteria: false,
        evalCriteria: [],
        selectedSections: [],
        exhibits: [],
        exhibitNotes: "",
      });
      expect(rfqConfigSlug(cfg)).toBe("rfq-2026-007");
      const empty = { ...cfg, rfqNumber: "" };
      expect(rfqConfigSlug(empty)).toBe("rfq");
    });
  });

  describe("isRfqInfoComplete", () => {
    it("requires all three trimmed fields", () => {
      expect(
        isRfqInfoComplete({
          projectName: "x",
          issuingOrg: "y",
          rfqNumber: "z",
        }),
      ).toBe(true);
      expect(
        isRfqInfoComplete({
          projectName: "  ",
          issuingOrg: "y",
          rfqNumber: "z",
        }),
      ).toBe(false);
      expect(
        isRfqInfoComplete({ projectName: "x", issuingOrg: "", rfqNumber: "z" }),
      ).toBe(false);
    });
  });

  describe("buildRfqConfig", () => {
    const baseCriteria: EvaluationCriterion[] = [
      { title: "Experience", weight: "40%" },
      { title: "  ", weight: "10%" },
    ];
    const baseExhibits: ExhibitConfig[] = [
      { ...DEFAULT_EXHIBITS[0]!, enabled: true },
      { ...DEFAULT_EXHIBITS[1]!, enabled: false },
    ];

    it("filters blank criteria when hasEvalCriteria is true", () => {
      const cfg = buildRfqConfig({
        projectName: "p",
        issuingOrg: "o",
        rfqNumber: "n",
        dueDate: "",
        submissionDate: "",
        recipientName: "",
        recipientTitle: "",
        recipientEmail: "",
        hasEvalCriteria: true,
        evalCriteria: baseCriteria,
        selectedSections: ["company-overview"],
        exhibits: baseExhibits,
        exhibitNotes: "notes",
      });
      expect(cfg.evaluationCriteria).toEqual([
        { title: "Experience", weight: "40%" },
      ]);
    });

    it("emits empty criteria when hasEvalCriteria is false", () => {
      const cfg = buildRfqConfig({
        projectName: "p",
        issuingOrg: "o",
        rfqNumber: "n",
        dueDate: "",
        submissionDate: "",
        recipientName: "",
        recipientTitle: "",
        recipientEmail: "",
        hasEvalCriteria: false,
        evalCriteria: baseCriteria,
        selectedSections: [],
        exhibits: baseExhibits,
        exhibitNotes: "",
      });
      expect(cfg.evaluationCriteria).toEqual([]);
    });

    it("includes only enabled exhibits and strips the enabled flag", () => {
      const cfg = buildRfqConfig({
        projectName: "p",
        issuingOrg: "o",
        rfqNumber: "n",
        dueDate: "",
        submissionDate: "",
        recipientName: "",
        recipientTitle: "",
        recipientEmail: "",
        hasEvalCriteria: false,
        evalCriteria: [],
        selectedSections: [],
        exhibits: baseExhibits,
        exhibitNotes: "",
      });
      expect(cfg.exhibits).toHaveLength(1);
      expect(cfg.exhibits[0]).not.toHaveProperty("enabled");
      expect(cfg.exhibits[0]?.id).toBe("A");
    });

    it("copies sections array (not the same reference)", () => {
      const sections = ["a", "b"];
      const cfg = buildRfqConfig({
        projectName: "p",
        issuingOrg: "o",
        rfqNumber: "n",
        dueDate: "",
        submissionDate: "",
        recipientName: "",
        recipientTitle: "",
        recipientEmail: "",
        hasEvalCriteria: false,
        evalCriteria: [],
        selectedSections: sections,
        exhibits: [],
        exhibitNotes: "",
      });
      expect(cfg.sections).toEqual(["a", "b"]);
      expect(cfg.sections).not.toBe(sections);
    });
  });
});
