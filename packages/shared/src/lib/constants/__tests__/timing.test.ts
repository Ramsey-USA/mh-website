/**
 * Tests for lib/constants/timing.ts
 */

import { TIMING } from "../timing";

describe("TIMING constants", () => {
  it("exports TIMING.ANIMATION.COUNTER as 2000", () => {
    expect(TIMING.ANIMATION.COUNTER).toBe(2000);
  });

  it("exports TIMING.PERFORMANCE.VISIBILITY_CHECK as 100", () => {
    expect(TIMING.PERFORMANCE.VISIBILITY_CHECK).toBe(100);
  });
});
