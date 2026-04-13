/**
 * Form validation utility tests
 * Tests email and phone validation using centralized utilities
 */

import {
  isValidEmail,
  isValidPhone,
  cleanPhone,
  isRequired,
  EMAIL_REGEX,
  PHONE_REGEX,
} from "@/lib/utils/validation";

describe("Form Validation", () => {
  describe("Email Validation", () => {
    it("should accept valid email addresses", () => {
      const validEmails = [
        "user@example.com",
        "john.doe@company.co.uk",
        "info+tag@mhc-gc.com",
        "admin@subdomain.example.org",
      ];

      validEmails.forEach((email) => {
        expect(isValidEmail(email)).toBe(true);
      });
    });

    it("should reject invalid email addresses", () => {
      const invalidEmails = [
        "notanemail",
        "@example.com",
        "user@",
        "user @example.com",
        "user@.com",
        "",
      ];

      invalidEmails.forEach((email) => {
        expect(isValidEmail(email)).toBe(false);
      });
    });

    it("EMAIL_REGEX should match centralized pattern", () => {
      // Ensure the regex is the expected pattern
      expect(EMAIL_REGEX.test("user@example.com")).toBe(true);
      expect(EMAIL_REGEX.test("invalid")).toBe(false);
    });
  });

  describe("Phone Validation", () => {
    it("should accept valid phone numbers", () => {
      const validPhones = [
        "5093086489",
        "+15093086489",
        "509-308-6489",
        "(509) 308-6489",
        "+1 509 308 6489",
      ];

      validPhones.forEach((phone) => {
        expect(isValidPhone(phone)).toBe(true);
      });
    });

    it("should reject invalid phone numbers", () => {
      const invalidPhones = [
        "0000000000", // starts with 0
        "abc-def-ghij",
        "12345678901234567", // too long
        "",
      ];

      invalidPhones.forEach((phone) => {
        expect(isValidPhone(phone)).toBe(false);
      });
    });

    it("cleanPhone should remove formatting characters", () => {
      expect(cleanPhone("(509) 308-6489")).toBe("5093086489");
      expect(cleanPhone("509-308-6489")).toBe("5093086489");
      expect(cleanPhone("+1 509 308 6489")).toBe("+15093086489");
    });

    it("PHONE_REGEX should match centralized pattern", () => {
      expect(PHONE_REGEX.test("5093086489")).toBe(true);
      expect(PHONE_REGEX.test("0123456789")).toBe(false); // starts with 0
    });
  });

  describe("Required Fields Validation", () => {
    it("should validate required contact form fields", () => {
      const requiredFields = {
        firstName: "John",
        lastName: "Doe",
        email: "john@example.com",
        message: "Test message",
      };

      // All fields present - using centralized isRequired
      expect(isRequired(requiredFields.firstName)).toBe(true);
      expect(isRequired(requiredFields.lastName)).toBe(true);
      expect(isRequired(requiredFields.email)).toBe(true);
      expect(isRequired(requiredFields.message)).toBe(true);
    });

    it("should fail when required fields are empty", () => {
      const invalidData = {
        firstName: "",
        lastName: "  ",
        email: "",
        message: "",
      };

      expect(isRequired(invalidData.firstName)).toBe(false);
      expect(isRequired(invalidData.lastName)).toBe(false);
      expect(isRequired(invalidData.email)).toBe(false);
      expect(isRequired(invalidData.message)).toBe(false);
    });

    it("should validate project-specific required fields", () => {
      const projectData = {
        projectType: "Kitchen Remodeling",
        projectLocation: "Seattle, WA",
      };

      expect(isRequired(projectData.projectType)).toBe(true);
      expect(isRequired(projectData.projectLocation)).toBe(true);
    });
  });
});
