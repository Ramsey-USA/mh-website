import { buildSystemPrompt, ALLIES } from "../knowledge-base";

describe("Chatbot Knowledge Base", () => {
  describe("ALLIES", () => {
    it("contains all 10 trade partners", () => {
      expect(ALLIES).toHaveLength(10);
    });

    it("every ally has required fields", () => {
      for (const ally of ALLIES) {
        expect(ally.name).toBeTruthy();
        expect(ally.role).toBeTruthy();
        expect(ally.description).toBeTruthy();
        expect(ally.highlights.length).toBeGreaterThan(0);
      }
    });

    it("includes known trade partners by name", () => {
      const names = ALLIES.map((a) => a.name);
      expect(names).toContain("Diamond Electric LLC");
      expect(names).toContain("Mustang Signs");
      expect(names).toContain("Viking Plumbing & Mechanical");
      expect(names).toContain("Core Cabinet Production");
    });
  });

  describe("buildSystemPrompt", () => {
    it("returns a non-empty string", () => {
      const prompt = buildSystemPrompt();
      expect(typeof prompt).toBe("string");
      expect(prompt.length).toBeGreaterThan(500);
    });

    it("includes brand-required messaging", () => {
      const prompt = buildSystemPrompt();
      expect(prompt).toContain("(509) 308-6489");
      expect(prompt).toContain("office@mhc-gc.com");
      expect(prompt).toContain("Veteran-Owned");
      expect(prompt).toContain("THE ROI IS THE RELATIONSHIP");
      expect(prompt).toContain(
        "Building projects for the Client, NOT the Dollar",
      );
    });

    it("includes all ally names", () => {
      const prompt = buildSystemPrompt();
      for (const ally of ALLIES) {
        expect(prompt).toContain(ally.name);
      }
    });

    it("forbids fabrication and cost estimates", () => {
      const prompt = buildSystemPrompt();
      expect(prompt).toContain("NEVER fabricate");
      expect(prompt).toContain("NEVER provide cost estimates");
    });

    it("uses approved terminology", () => {
      const prompt = buildSystemPrompt();
      expect(prompt).toContain("Client Partners");
      expect(prompt).toContain("Trade Partners");
      expect(prompt).toContain("work WITH you");
    });
  });
});
