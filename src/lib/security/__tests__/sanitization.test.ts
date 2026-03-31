/**
 * Tests for src/lib/security/sanitization.ts
 */

jest.mock("@/lib/utils/logger", () => ({
  logger: {
    warn: jest.fn(),
    error: jest.fn(),
    info: jest.fn(),
    log: jest.fn(),
    debug: jest.fn(),
  },
}));

import {
  sanitizeHTML,
  sanitizeSQL,
  sanitizeInput,
  sanitizeEmail,
  sanitizePhone,
  sanitizeURL,
  sanitizeFilename,
  escapeHTML,
  sanitizeJSON,
  sanitizeFormData,
} from "@/lib/security/sanitization";

// ---------------------------------------------------------------------------
// sanitizeHTML
// ---------------------------------------------------------------------------
describe("sanitizeHTML", () => {
  it("removes <script> tags and their content", () => {
    expect(sanitizeHTML('<script>alert("xss")</script>hello')).toBe("hello");
  });

  it("removes <iframe> tags", () => {
    expect(sanitizeHTML('<iframe src="evil.com"></iframe>safe')).toBe("safe");
  });

  it("removes event handlers (onclick=)", () => {
    expect(sanitizeHTML('<div onclick="evil()">text</div>')).not.toContain(
      "onclick",
    );
  });

  it("removes onerror= event handler", () => {
    expect(sanitizeHTML('<img onerror="evil()" src="x">')).not.toContain(
      "onerror",
    );
  });

  it("removes javascript: protocol", () => {
    expect(
      sanitizeHTML('<a href="javascript:alert(1)">link</a>'),
    ).not.toContain("javascript:");
  });

  it("removes data:text/html", () => {
    expect(
      sanitizeHTML("data:text/html,<script>alert(1)</script>"),
    ).not.toContain("data:text/html");
  });

  it("passes through safe HTML content unchanged", () => {
    expect(sanitizeHTML("Hello, World!")).toBe("Hello, World!");
  });

  it("returns empty string for empty input", () => {
    expect(sanitizeHTML("")).toBe("");
  });

  it("returns empty string for falsy input", () => {
    expect(sanitizeHTML(null as unknown as string)).toBe("");
    expect(sanitizeHTML(undefined as unknown as string)).toBe("");
  });

  it("trims whitespace", () => {
    expect(sanitizeHTML("  hello  ")).toBe("hello");
  });
});

// ---------------------------------------------------------------------------
// sanitizeSQL
// ---------------------------------------------------------------------------
describe("sanitizeSQL", () => {
  it("escapes single quotes by doubling them", () => {
    expect(sanitizeSQL("O'Brien")).toBe("O''Brien");
  });

  it("removes SQL comment markers (--)", () => {
    expect(sanitizeSQL("value -- comment")).not.toContain("--");
  });

  it("removes SQL comment markers (/*)", () => {
    expect(sanitizeSQL("value /* comment")).not.toContain("/*");
  });

  it("removes SQL comment markers (*/)", () => {
    expect(sanitizeSQL("value */ rest")).not.toContain("*/");
  });

  it("removes semicolons", () => {
    expect(sanitizeSQL("DROP TABLE users;")).not.toContain(";");
  });

  it("returns empty string for empty input", () => {
    expect(sanitizeSQL("")).toBe("");
  });

  it("returns empty string for falsy input", () => {
    expect(sanitizeSQL(null as unknown as string)).toBe("");
  });

  it("trims whitespace", () => {
    expect(sanitizeSQL("  value  ")).toBe("value");
  });
});

// ---------------------------------------------------------------------------
// sanitizeInput
// ---------------------------------------------------------------------------
describe("sanitizeInput", () => {
  it("removes control characters (0x00-0x08)", () => {
    const withControl = "hello\x00\x01\x07world";
    const result = sanitizeInput(withControl);
    expect(result).not.toMatch(/[\x00-\x08]/);
    expect(result).toBe("helloworld");
  });

  it("removes control character 0x0B (vertical tab)", () => {
    const result = sanitizeInput("hello\x0Bworld");
    expect(result).not.toMatch(/\x0B/);
    expect(result).toBe("helloworld");
  });

  it("removes control character 0x0C (form feed)", () => {
    const result = sanitizeInput("hello\x0Cworld");
    expect(result).not.toMatch(/\x0C/);
    expect(result).toBe("helloworld");
  });

  it("removes control characters 0x0E-0x1F", () => {
    const withControl = "hello\x0Eworld";
    const result = sanitizeInput(withControl);
    expect(result).not.toMatch(/[\x0E-\x1F]/);
    expect(result).toBe("helloworld");
  });

  it("removes control character 0x7F (delete)", () => {
    const result = sanitizeInput("hello\x7Fworld");
    expect(result).not.toMatch(/\x7F/);
    expect(result).toBe("helloworld");
  });

  it("normalizes multiple spaces to a single space", () => {
    expect(sanitizeInput("hello   world")).toBe("hello world");
  });

  it("trims leading and trailing whitespace", () => {
    expect(sanitizeInput("  hello  ")).toBe("hello");
  });

  it("returns empty string for empty input", () => {
    expect(sanitizeInput("")).toBe("");
  });

  it("returns empty string for falsy input", () => {
    expect(sanitizeInput(null as unknown as string)).toBe("");
  });
});

// ---------------------------------------------------------------------------
// sanitizeEmail
// ---------------------------------------------------------------------------
describe("sanitizeEmail", () => {
  it("returns lowercased, trimmed valid email", () => {
    expect(sanitizeEmail("  User@Example.COM  ")).toBe("user@example.com");
  });

  it("returns null for invalid email format (no @)", () => {
    expect(sanitizeEmail("notanemail")).toBeNull();
  });

  it("returns null for invalid email format (no domain)", () => {
    expect(sanitizeEmail("user@")).toBeNull();
  });

  it("returns null for empty input", () => {
    expect(sanitizeEmail("")).toBeNull();
  });

  it("handles mixed case input", () => {
    expect(sanitizeEmail("HELLO@WORLD.COM")).toBe("hello@world.com");
  });

  it("returns null for falsy input", () => {
    expect(sanitizeEmail(null as unknown as string)).toBeNull();
  });
});

// ---------------------------------------------------------------------------
// sanitizePhone
// ---------------------------------------------------------------------------
describe("sanitizePhone", () => {
  it("accepts a 10-digit US number", () => {
    expect(sanitizePhone("5095551234")).toBe("5095551234");
  });

  it("accepts international format starting with +", () => {
    expect(sanitizePhone("+15095551234")).toBe("+15095551234");
  });

  it("strips non-numeric characters (dashes, spaces, parens)", () => {
    expect(sanitizePhone("(509) 555-1234")).toBe("5095551234");
  });

  it("returns null for too-short numbers", () => {
    expect(sanitizePhone("12345")).toBeNull();
  });

  it("returns null for empty input", () => {
    expect(sanitizePhone("")).toBeNull();
  });

  it("returns null for falsy input", () => {
    expect(sanitizePhone(null as unknown as string)).toBeNull();
  });

  it("strips dots from phone number", () => {
    expect(sanitizePhone("509.555.1234")).toBe("5095551234");
  });
});

// ---------------------------------------------------------------------------
// sanitizeURL
// ---------------------------------------------------------------------------
describe("sanitizeURL", () => {
  it("allows http:// URLs", () => {
    expect(sanitizeURL("http://example.com")).toBe("http://example.com");
  });

  it("allows https:// URLs", () => {
    expect(sanitizeURL("https://example.com")).toBe("https://example.com");
  });

  it("allows mailto: URLs", () => {
    expect(sanitizeURL("mailto:user@example.com")).toBe(
      "mailto:user@example.com",
    );
  });

  it("returns null for javascript: protocol", () => {
    // javascript:// (with ://) is not in the allowed protocol list → null
    expect(sanitizeURL("javascript://evil.com")).toBeNull();
  });

  it("returns null for data: protocol", () => {
    // data:// (with ://) is not in the allowed protocol list → null
    expect(sanitizeURL("data://evil.com")).toBeNull();
  });

  it("adds https:// prefix when no protocol given", () => {
    expect(sanitizeURL("example.com")).toBe("https://example.com");
  });

  it("returns null for empty input", () => {
    expect(sanitizeURL("")).toBeNull();
  });

  it("returns null for falsy input", () => {
    expect(sanitizeURL(null as unknown as string)).toBeNull();
  });
});

// ---------------------------------------------------------------------------
// sanitizeFilename
// ---------------------------------------------------------------------------
describe("sanitizeFilename", () => {
  it("removes path traversal attempts (..)", () => {
    expect(sanitizeFilename("../../etc/passwd")).not.toContain("..");
  });

  it("removes forward slashes", () => {
    expect(sanitizeFilename("path/to/file.txt")).not.toContain("/");
  });

  it("removes backslashes", () => {
    expect(sanitizeFilename("path\\to\\file.txt")).not.toContain("\\");
  });

  it('removes dangerous characters (<, >, :, ", |, ?, *)', () => {
    const dangerous = 'file<>:"|?*.txt';
    const result = sanitizeFilename(dangerous)!;
    expect(result).not.toMatch(/[<>:"|?*]/);
  });

  it("truncates to 255 characters max", () => {
    const longName = "a".repeat(300) + ".txt";
    const result = sanitizeFilename(longName)!;
    expect(result.length).toBeLessThanOrEqual(255);
  });

  it("returns null for empty input", () => {
    expect(sanitizeFilename("")).toBeNull();
  });

  it("returns null for falsy input", () => {
    expect(sanitizeFilename(null as unknown as string)).toBeNull();
  });

  it("returns null if empty after sanitization", () => {
    // Only dangerous chars — becomes empty after sanitization
    expect(sanitizeFilename('<>:"|?*')).toBeNull();
  });

  it("preserves normal filenames", () => {
    expect(sanitizeFilename("my-photo.jpg")).toBe("my-photo.jpg");
  });
});

// ---------------------------------------------------------------------------
// escapeHTML
// ---------------------------------------------------------------------------
describe("escapeHTML", () => {
  it("escapes & to &amp;", () => {
    expect(escapeHTML("a & b")).toBe("a &amp; b");
  });

  it("escapes < to &lt;", () => {
    expect(escapeHTML("<div>")).toBe("&lt;div&gt;");
  });

  it("escapes > to &gt;", () => {
    expect(escapeHTML(">")).toBe("&gt;");
  });

  it('escapes " to &quot;', () => {
    expect(escapeHTML('"hello"')).toBe("&quot;hello&quot;");
  });

  it("escapes ' to &#39;", () => {
    expect(escapeHTML("it's")).toBe("it&#39;s");
  });

  it("escapes / to &#x2F;", () => {
    expect(escapeHTML("a/b")).toBe("a&#x2F;b");
  });

  it("returns empty string for falsy input", () => {
    expect(escapeHTML("")).toBe("");
    expect(escapeHTML(null as unknown as string)).toBe("");
  });

  it("escapes multiple special chars in one string", () => {
    expect(escapeHTML('<script>alert("xss")</script>')).toBe(
      "&lt;script&gt;alert(&quot;xss&quot;)&lt;&#x2F;script&gt;",
    );
  });
});

// ---------------------------------------------------------------------------
// sanitizeJSON
// ---------------------------------------------------------------------------
describe("sanitizeJSON", () => {
  it("parses a valid JSON string primitive", () => {
    expect(sanitizeJSON('"hello"')).toBe("hello");
  });

  it("parses a valid JSON number primitive", () => {
    expect(sanitizeJSON("42")).toBe(42);
  });

  it("parses a valid JSON boolean primitive", () => {
    expect(sanitizeJSON("true")).toBe(true);
  });

  it("parses a valid plain object", () => {
    expect(sanitizeJSON('{"key":"value"}')).toEqual({ key: "value" });
  });

  it("parses a valid JSON array", () => {
    expect(sanitizeJSON("[1,2,3]")).toEqual([1, 2, 3]);
  });

  it("returns null for invalid JSON", () => {
    expect(sanitizeJSON("{not valid json}")).toBeNull();
  });

  it("returns null for empty input", () => {
    expect(sanitizeJSON("")).toBeNull();
  });

  it("returns null for falsy input", () => {
    expect(sanitizeJSON(null as unknown as string)).toBeNull();
  });

  it("returns null if object contains own __proto__ key (prototype pollution)", () => {
    // JSON.parse can create objects with __proto__ as an own property
    expect(sanitizeJSON('{"__proto__":{"isAdmin":true}}')).toBeNull();
  });

  it("returns null if object contains own constructor key (prototype pollution)", () => {
    expect(sanitizeJSON('{"constructor":{"name":"evil"}}')).toBeNull();
  });

  it("returns null if object contains own prototype key (prototype pollution)", () => {
    expect(sanitizeJSON('{"prototype":{}}')).toBeNull();
  });
});

// ---------------------------------------------------------------------------
// sanitizeFormData
// ---------------------------------------------------------------------------
describe("sanitizeFormData", () => {
  it("sanitizes email fields with sanitizeEmail", () => {
    const result = sanitizeFormData({ userEmail: "  HELLO@EXAMPLE.COM  " });
    expect(result["userEmail"]).toBe("hello@example.com");
  });

  it("returns null for invalid email in email fields", () => {
    const result = sanitizeFormData({ contactEmail: "notvalid" });
    expect(result["contactEmail"]).toBeNull();
  });

  it("sanitizes phone fields with sanitizePhone", () => {
    const result = sanitizeFormData({ phoneNumber: "(509) 555-1234" });
    expect(result["phoneNumber"]).toBe("5095551234");
  });

  it("sanitizes url fields with sanitizeURL", () => {
    const result = sanitizeFormData({ websiteUrl: "example.com" });
    expect(result["websiteUrl"]).toBe("https://example.com");
  });

  it("sanitizes website fields with sanitizeURL", () => {
    const result = sanitizeFormData({ website: "https://example.com" });
    expect(result["website"]).toBe("https://example.com");
  });

  it("returns null for invalid url in url fields", () => {
    // javascript:// (with ://) is not in the allowed protocol list → null
    const result = sanitizeFormData({ url: "javascript://evil()" });
    expect(result["url"]).toBeNull();
  });

  it("sanitizes file fields with sanitizeFilename", () => {
    const result = sanitizeFormData({ filename: "../../evil.txt" });
    expect(result["filename"]).not.toContain("..");
  });

  it("sanitizes other string fields with sanitizeInput", () => {
    const result = sanitizeFormData({ message: "  hello   world  " });
    expect(result["message"]).toBe("hello world");
  });

  it("converts non-string values to string and sanitizes", () => {
    const result = sanitizeFormData({ count: 42 });
    expect(result["count"]).toBe("42");
  });

  it("handles multiple fields at once", () => {
    const result = sanitizeFormData({
      userEmail: "test@example.com",
      message: "  hi  ",
    });
    expect(result["userEmail"]).toBe("test@example.com");
    expect(result["message"]).toBe("hi");
  });
});
