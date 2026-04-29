/**
 * Tests for lib/constants/navigation-icons.ts
 */

import {
  PAGE_ICONS,
  SEMANTIC_ICONS,
  SOCIAL_ICONS,
  SECTION_ICONS,
} from "../navigation-icons";

// ── navigation-icons ──────────────────────────────────────────────────────────

describe("PAGE_ICONS", () => {
  it("exports an object with string values", () => {
    expect(typeof PAGE_ICONS).toBe("object");
    Object.values(PAGE_ICONS).forEach((v) => expect(typeof v).toBe("string"));
  });

  it("contains standard nav entries", () => {
    expect(PAGE_ICONS.home).toBeDefined();
    expect(PAGE_ICONS.contact).toBeDefined();
    expect(PAGE_ICONS.services).toBeDefined();
    expect(PAGE_ICONS.safety).toBeDefined();
  });
});

describe("SEMANTIC_ICONS", () => {
  it("exports an object with string values", () => {
    expect(typeof SEMANTIC_ICONS).toBe("object");
    Object.values(SEMANTIC_ICONS).forEach((v) =>
      expect(typeof v).toBe("string"),
    );
  });

  it("contains standardised people icons", () => {
    expect(SEMANTIC_ICONS.partnership).toBe("handshake");
    expect(SEMANTIC_ICONS.clients).toBe("group");
    expect(SEMANTIC_ICONS.team).toBe("groups");
  });
});

describe("SOCIAL_ICONS", () => {
  it("exports icons for common social platforms", () => {
    expect(typeof SOCIAL_ICONS.facebook).toBe("string");
    expect(typeof SOCIAL_ICONS.instagram).toBe("string");
    expect(typeof SOCIAL_ICONS.linkedin).toBe("string");
  });
});

describe("SECTION_ICONS", () => {
  it("exports icons for footer section headers", () => {
    expect(typeof SECTION_ICONS.explore).toBe("string");
    expect(typeof SECTION_ICONS.ourForces).toBe("string");
    expect(typeof SECTION_ICONS.connect).toBe("string");
  });
});
