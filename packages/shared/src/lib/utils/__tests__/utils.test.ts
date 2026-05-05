/**
 * Tests for lib/utils/escape-html.ts and lib/utils/validation.ts
 */

import { escapeHtml, sanitizeUrl } from "../escape-html";
import {
  isValidEmail,
  isValidPhone,
  cleanPhone,
  isRequired,
  hasMinLength,
  hasMaxLength,
} from "../validation";

// ---- escapeHtml ----

describe("escapeHtml()", () => {
  it("escapes ampersands", () => {
    expect(escapeHtml("Ham & Eggs")).toBe("Ham &amp; Eggs");
  });

  it("escapes < and > angle brackets", () => {
    expect(escapeHtml("<script>alert(1)</script>")).toBe(
      "&lt;script&gt;alert(1)&lt;/script&gt;",
    );
  });

  it("escapes double-quotes", () => {
    expect(escapeHtml('say "hello"')).toBe("say &quot;hello&quot;");
  });

  it("escapes single-quotes", () => {
    expect(escapeHtml("it's fine")).toBe("it&#39;s fine");
  });

  it("converts non-string input to string first", () => {
    expect(escapeHtml(42)).toBe("42");
    expect(escapeHtml(null)).toBe("");
    expect(escapeHtml(undefined)).toBe("");
    expect(escapeHtml(true)).toBe("true");
  });

  it("returns clean string unchanged", () => {
    expect(escapeHtml("Hello World")).toBe("Hello World");
  });
});

// ---- sanitizeUrl ----

describe("sanitizeUrl()", () => {
  it("allows https URLs", () => {
    expect(sanitizeUrl("https://example.com/path")).toBe(
      "https://example.com/path",
    );
  });

  it("allows http URLs", () => {
    expect(sanitizeUrl("http://example.com")).toBe("http://example.com");
  });

  it("rejects javascript: scheme", () => {
    expect(sanitizeUrl("javascript:alert(1)")).toBe("");
  });

  it("rejects data: scheme", () => {
    expect(sanitizeUrl("data:text/html,<h1>x</h1>")).toBe("");
  });

  it("rejects vbscript: scheme", () => {
    expect(sanitizeUrl("vbscript:msgbox(1)")).toBe("");
  });

  it("allows relative URLs (no scheme)", () => {
    expect(sanitizeUrl("/about")).toBe("/about");
    expect(sanitizeUrl("../page")).toBe("../page");
  });

  it("returns empty string for empty input", () => {
    expect(sanitizeUrl("")).toBe("");
    expect(sanitizeUrl(null)).toBe("");
    expect(sanitizeUrl(undefined)).toBe("");
  });

  it("trims whitespace before checking", () => {
    expect(sanitizeUrl("  https://example.com  ")).toBe("https://example.com");
  });

  it("rejects scheme-like strings parsed ok by new URL (non-http/s protocol)", () => {
    // "custom:noSlashes" parses successfully — protocol is "custom:", not https/http → ""
    expect(sanitizeUrl("custom:noSlashes")).toBe("");
  });

  it("rejects malformed scheme strings that throw URL parsing AND match scheme regex", () => {
    // "http: //x.com" (space after colon) throws new URL() AND matches the scheme
    // regex /^[a-z][a-z0-9+.-]*:/i → covers the return "" inside catch
    expect(sanitizeUrl("http: //x.com")).toBe("");
  });

  it("allows relative-path strings that fail URL parsing", () => {
    // "/path with spaces" throws new URL() and does NOT match the scheme regex → returns s
    expect(sanitizeUrl("/path with spaces")).toBe("/path with spaces");
  });
});

// ---- validation functions ----

describe("isValidEmail()", () => {
  it("returns true for valid email addresses", () => {
    expect(isValidEmail("user@example.com")).toBe(true);
    expect(isValidEmail("admin+tag@mh-construction.com")).toBe(true);
    expect(isValidEmail("name.last@domain.co.uk")).toBe(true);
  });

  it("returns false for invalid email addresses", () => {
    expect(isValidEmail("not-an-email")).toBe(false);
    expect(isValidEmail("@domain.com")).toBe(false);
    expect(isValidEmail("user@")).toBe(false);
    expect(isValidEmail("")).toBe(false);
  });
});

describe("isValidPhone()", () => {
  it("returns true for valid phone numbers", () => {
    expect(isValidPhone("5093086489")).toBe(true);
    expect(isValidPhone("+15093086489")).toBe(true);
    expect(isValidPhone("(509) 308-6489")).toBe(true);
  });

  it("returns false for invalid phone numbers", () => {
    expect(isValidPhone("abc")).toBe(false);
    expect(isValidPhone("+abc123")).toBe(false);
  });
});

describe("cleanPhone()", () => {
  it("removes spaces, dashes, and parentheses", () => {
    expect(cleanPhone("(509) 308-6489")).toBe("5093086489");
    expect(cleanPhone("+1 509-308-6489")).toBe("+15093086489");
  });

  it("leaves digits and + sign intact", () => {
    expect(cleanPhone("+15093086489")).toBe("+15093086489");
    expect(cleanPhone("5093086489")).toBe("5093086489");
  });
});

describe("isRequired()", () => {
  it("returns true for non-empty string", () => {
    expect(isRequired("hello")).toBe(true);
    expect(isRequired("  hello  ")).toBe(true);
  });

  it("returns false for empty or whitespace-only string", () => {
    expect(isRequired("")).toBe(false);
    expect(isRequired("   ")).toBe(false);
  });
});

describe("hasMinLength()", () => {
  it("returns true when string meets or exceeds minimum", () => {
    expect(hasMinLength("hello", 5)).toBe(true);
    expect(hasMinLength("hello world", 5)).toBe(true);
  });

  it("returns false when string is shorter than minimum", () => {
    expect(hasMinLength("hi", 5)).toBe(false);
  });

  it("trims whitespace before checking", () => {
    expect(hasMinLength("  hi  ", 5)).toBe(false); // "hi" is 2 chars
  });
});

describe("hasMaxLength()", () => {
  it("returns true when string is within the limit", () => {
    expect(hasMaxLength("hello", 10)).toBe(true);
    expect(hasMaxLength("hello", 5)).toBe(true);
  });

  it("returns false when string exceeds the limit", () => {
    expect(hasMaxLength("hello world", 5)).toBe(false);
  });
});
