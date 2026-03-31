import { LIMITS } from "@/lib/constants/limits";

describe("LIMITS", () => {
  describe("FILE", () => {
    it("MAX_RESUME_SIZE equals 10MB", () => {
      expect(LIMITS.FILE.MAX_RESUME_SIZE).toBe(10 * 1024 * 1024);
    });

    it("MAX_RESUME_SIZE is 10485760 bytes", () => {
      expect(LIMITS.FILE.MAX_RESUME_SIZE).toBe(10485760);
    });
  });

  describe("ANALYTICS", () => {
    it("MAX_EVENTS_IN_MEMORY is a positive number", () => {
      expect(LIMITS.ANALYTICS.MAX_EVENTS_IN_MEMORY).toBeGreaterThan(0);
    });

    it("MAX_EVENTS_IN_MEMORY is 10000", () => {
      expect(LIMITS.ANALYTICS.MAX_EVENTS_IN_MEMORY).toBe(10000);
    });
  });
});
