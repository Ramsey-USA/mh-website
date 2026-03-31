import {
  EMAIL_REGEX,
  PHONE_REGEX,
  isValidEmail,
  isValidPhone,
  cleanPhone,
  isRequired,
  hasMinLength,
  hasMaxLength,
} from "@/lib/utils/validation";

describe("validation utilities", () => {
  describe("EMAIL_REGEX", () => {
    it("is a RegExp", () => {
      expect(EMAIL_REGEX).toBeInstanceOf(RegExp);
    });

    it("matches valid emails", () => {
      expect(EMAIL_REGEX.test("user@example.com")).toBe(true);
      expect(EMAIL_REGEX.test("office@mhc-gc.com")).toBe(true);
      expect(EMAIL_REGEX.test("a@b.co")).toBe(true);
    });

    it("does not match invalid emails", () => {
      expect(EMAIL_REGEX.test("notanemail")).toBe(false);
      expect(EMAIL_REGEX.test("@domain.com")).toBe(false);
      expect(EMAIL_REGEX.test("user@")).toBe(false);
      expect(EMAIL_REGEX.test("user @domain.com")).toBe(false);
    });
  });

  describe("PHONE_REGEX", () => {
    it("is a RegExp", () => {
      expect(PHONE_REGEX).toBeInstanceOf(RegExp);
    });

    it("matches valid phone numbers", () => {
      expect(PHONE_REGEX.test("5093086489")).toBe(true);
      expect(PHONE_REGEX.test("+15093086489")).toBe(true);
      expect(PHONE_REGEX.test("123")).toBe(true);
    });

    it("does not match invalid phone numbers", () => {
      expect(PHONE_REGEX.test("0123456789")).toBe(false);
      expect(PHONE_REGEX.test("")).toBe(false);
      expect(PHONE_REGEX.test("abc")).toBe(false);
    });
  });

  describe("isValidEmail", () => {
    it("returns true for valid email addresses", () => {
      expect(isValidEmail("user@example.com")).toBe(true);
      expect(isValidEmail("office@mhc-gc.com")).toBe(true);
      expect(isValidEmail("test.user+tag@sub.domain.org")).toBe(true);
    });

    it("returns false for invalid email addresses", () => {
      expect(isValidEmail("")).toBe(false);
      expect(isValidEmail("notanemail")).toBe(false);
      expect(isValidEmail("@domain.com")).toBe(false);
      expect(isValidEmail("user@")).toBe(false);
      expect(isValidEmail("user @domain.com")).toBe(false);
      expect(isValidEmail("user@domain")).toBe(false);
    });
  });

  describe("isValidPhone", () => {
    it("returns true for valid phone numbers", () => {
      expect(isValidPhone("5093086489")).toBe(true);
      expect(isValidPhone("+15093086489")).toBe(true);
      expect(isValidPhone("(509) 308-6489")).toBe(true);
      expect(isValidPhone("509-308-6489")).toBe(true);
    });

    it("returns false for invalid phone numbers", () => {
      expect(isValidPhone("")).toBe(false);
      expect(isValidPhone("abc-def-ghij")).toBe(false);
      expect(isValidPhone("(000) 000-0000")).toBe(false);
    });

    it("cleans formatting before validating", () => {
      // spaces, parens, hyphens are stripped before regex test
      expect(isValidPhone("(509) 308-6489")).toBe(true);
    });
  });

  describe("cleanPhone", () => {
    it("removes spaces from phone numbers", () => {
      expect(cleanPhone("509 308 6489")).toBe("5093086489");
    });

    it("removes parentheses from phone numbers", () => {
      expect(cleanPhone("(509)3086489")).toBe("5093086489");
    });

    it("removes hyphens from phone numbers", () => {
      expect(cleanPhone("509-308-6489")).toBe("5093086489");
    });

    it("removes all formatting at once", () => {
      expect(cleanPhone("(509) 308-6489")).toBe("5093086489");
    });

    it("preserves plus sign for international format", () => {
      expect(cleanPhone("+1 (509) 308-6489")).toBe("+15093086489");
    });

    it("returns digits-only string unchanged", () => {
      expect(cleanPhone("5093086489")).toBe("5093086489");
    });
  });

  describe("isRequired", () => {
    it("returns true for non-empty strings", () => {
      expect(isRequired("hello")).toBe(true);
      expect(isRequired("a")).toBe(true);
      expect(isRequired("  text  ")).toBe(true);
    });

    it("returns false for empty string", () => {
      expect(isRequired("")).toBe(false);
    });

    it("returns false for whitespace-only strings", () => {
      expect(isRequired("   ")).toBe(false);
      expect(isRequired("\t\n")).toBe(false);
    });
  });

  describe("hasMinLength", () => {
    it("returns true when trimmed length meets minimum", () => {
      expect(hasMinLength("hello", 5)).toBe(true);
      expect(hasMinLength("hello", 3)).toBe(true);
      expect(hasMinLength("hello", 1)).toBe(true);
    });

    it("returns false when trimmed length is below minimum", () => {
      expect(hasMinLength("hi", 5)).toBe(false);
      expect(hasMinLength("", 1)).toBe(false);
    });

    it("trims whitespace before checking", () => {
      expect(hasMinLength("  hi  ", 5)).toBe(false);
      expect(hasMinLength("  hello  ", 5)).toBe(true);
    });

    it("returns true for zero minimum length", () => {
      expect(hasMinLength("", 0)).toBe(true);
    });
  });

  describe("hasMaxLength", () => {
    it("returns true when trimmed length is within maximum", () => {
      expect(hasMaxLength("hello", 10)).toBe(true);
      expect(hasMaxLength("hello", 5)).toBe(true);
    });

    it("returns false when trimmed length exceeds maximum", () => {
      expect(hasMaxLength("hello world", 5)).toBe(false);
      expect(hasMaxLength("abc", 2)).toBe(false);
    });

    it("trims whitespace before checking", () => {
      expect(hasMaxLength("  hi  ", 2)).toBe(true);
      expect(hasMaxLength("  hello world  ", 5)).toBe(false);
    });

    it("returns true for empty string with any positive maximum", () => {
      expect(hasMaxLength("", 0)).toBe(true);
      expect(hasMaxLength("", 100)).toBe(true);
    });
  });
});
