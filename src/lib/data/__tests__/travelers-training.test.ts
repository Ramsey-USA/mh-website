/**
 * Tests for lib/data/travelers-training.ts and
 * lib/email/templates/testimonial-blast.ts
 */

// ── travelers-training ────────────────────────────────────────────────────────

import {
  travelersVideos,
  type TravelersVideo,
} from "@/lib/data/travelers-training";

describe("travelersVideos data", () => {
  it("exports a non-empty array", () => {
    expect(Array.isArray(travelersVideos)).toBe(true);
    expect(travelersVideos.length).toBeGreaterThan(0);
  });

  it("each entry has required fields", () => {
    travelersVideos.forEach((v: TravelersVideo) => {
      expect(typeof v.id).toBe("string");
      expect(typeof v.title).toBe("string");
      expect(typeof v.description).toBe("string");
      expect(typeof v.url).toBe("string");
      expect(["safety", "compliance", "new-employee", "equipment"]).toContain(
        v.category,
      );
    });
  });
});
