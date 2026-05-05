/**
 * @jest-environment node
 *
 * Tests for lib/constants/drivers.ts — type guards and constants.
 */

import {
  VALID_AUTHORIZATION_STATUSES,
  VALID_MVR_STATUSES,
  VALID_LICENSE_CLASSES,
  isValidAuthorizationStatus,
  isValidMvrStatus,
  isValidLicenseClass,
} from "../drivers";

// ─── Constants ────────────────────────────────────────────────────────────────

describe("VALID_AUTHORIZATION_STATUSES", () => {
  it("contains authorized, suspended, revoked, pending", () => {
    expect(VALID_AUTHORIZATION_STATUSES).toContain("authorized");
    expect(VALID_AUTHORIZATION_STATUSES).toContain("suspended");
    expect(VALID_AUTHORIZATION_STATUSES).toContain("revoked");
    expect(VALID_AUTHORIZATION_STATUSES).toContain("pending");
  });
});

describe("VALID_MVR_STATUSES", () => {
  it("contains clear, flagged, suspended, revoked, pending", () => {
    expect(VALID_MVR_STATUSES).toContain("clear");
    expect(VALID_MVR_STATUSES).toContain("flagged");
    expect(VALID_MVR_STATUSES).toContain("suspended");
    expect(VALID_MVR_STATUSES).toContain("revoked");
    expect(VALID_MVR_STATUSES).toContain("pending");
  });
});

describe("VALID_LICENSE_CLASSES", () => {
  it("contains standard, CDL-A, CDL-B, CDL-C", () => {
    expect(VALID_LICENSE_CLASSES).toContain("standard");
    expect(VALID_LICENSE_CLASSES).toContain("CDL-A");
    expect(VALID_LICENSE_CLASSES).toContain("CDL-B");
    expect(VALID_LICENSE_CLASSES).toContain("CDL-C");
  });
});

// ─── isValidAuthorizationStatus ───────────────────────────────────────────────

describe("isValidAuthorizationStatus()", () => {
  it.each(["authorized", "suspended", "revoked", "pending"] as const)(
    "returns true for valid status %s",
    (status) => {
      expect(isValidAuthorizationStatus(status)).toBe(true);
    },
  );

  it("returns false for an unknown string", () => {
    expect(isValidAuthorizationStatus("unknown")).toBe(false);
  });

  it("returns false for non-string values", () => {
    expect(isValidAuthorizationStatus(null)).toBe(false);
    expect(isValidAuthorizationStatus(undefined)).toBe(false);
    expect(isValidAuthorizationStatus(123)).toBe(false);
    expect(isValidAuthorizationStatus({})).toBe(false);
  });
});

// ─── isValidMvrStatus ─────────────────────────────────────────────────────────

describe("isValidMvrStatus()", () => {
  it.each(["clear", "flagged", "suspended", "revoked", "pending"] as const)(
    "returns true for valid status %s",
    (status) => {
      expect(isValidMvrStatus(status)).toBe(true);
    },
  );

  it("returns false for an unknown string", () => {
    expect(isValidMvrStatus("clean")).toBe(false);
  });

  it("returns false for non-string values", () => {
    expect(isValidMvrStatus(null)).toBe(false);
    expect(isValidMvrStatus(undefined)).toBe(false);
    expect(isValidMvrStatus(0)).toBe(false);
  });
});

// ─── isValidLicenseClass ──────────────────────────────────────────────────────

describe("isValidLicenseClass()", () => {
  it.each(["standard", "CDL-A", "CDL-B", "CDL-C"] as const)(
    "returns true for valid class %s",
    (cls) => {
      expect(isValidLicenseClass(cls)).toBe(true);
    },
  );

  it("returns false for an unknown string", () => {
    expect(isValidLicenseClass("CDL-D")).toBe(false);
  });

  it("returns false for non-string values", () => {
    expect(isValidLicenseClass(null)).toBe(false);
    expect(isValidLicenseClass(undefined)).toBe(false);
    expect(isValidLicenseClass(true)).toBe(false);
  });
});
