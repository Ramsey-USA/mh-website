import { TIMING } from "@/lib/constants/timing";

describe("TIMING", () => {
  describe("ANIMATION", () => {
    it("COUNTER is 2000", () => {
      expect(TIMING.ANIMATION.COUNTER).toBe(2000);
    });

    it("COUNTER is a positive number", () => {
      expect(TIMING.ANIMATION.COUNTER).toBeGreaterThan(0);
    });
  });

  describe("PERFORMANCE", () => {
    it("VISIBILITY_CHECK is 100", () => {
      expect(TIMING.PERFORMANCE.VISIBILITY_CHECK).toBe(100);
    });

    it("VISIBILITY_CHECK is a positive number", () => {
      expect(TIMING.PERFORMANCE.VISIBILITY_CHECK).toBeGreaterThan(0);
    });
  });
});
