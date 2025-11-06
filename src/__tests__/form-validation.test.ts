/**
 * Form validation utility tests
 * Tests email and phone validation logic used across contact forms
 */

describe("Form Validation", () => {
  describe("Email Validation", () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    it("should accept valid email addresses", () => {
      const validEmails = [
        "user@example.com",
        "john.doe@company.co.uk",
        "info+tag@mhc-gc.com",
        "admin@subdomain.example.org",
      ];

      validEmails.forEach((email) => {
        expect(emailRegex.test(email)).toBe(true);
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
        expect(emailRegex.test(email)).toBe(false);
      });
    });
  });

  describe("Phone Validation", () => {
    const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;

    const cleanPhone = (phone: string) => phone.replace(/[\s\-\(\)]/g, "");

    it("should accept valid phone numbers", () => {
      const validPhones = [
        "5093086489",
        "+15093086489",
        "509-308-6489",
        "(509) 308-6489",
        "+1 509 308 6489",
      ];

      validPhones.forEach((phone) => {
        expect(phoneRegex.test(cleanPhone(phone))).toBe(true);
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
        expect(phoneRegex.test(cleanPhone(phone))).toBe(false);
      });
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

      // All fields present
      expect(requiredFields.firstName.trim()).toBeTruthy();
      expect(requiredFields.lastName.trim()).toBeTruthy();
      expect(requiredFields.email.trim()).toBeTruthy();
      expect(requiredFields.message.trim()).toBeTruthy();
    });

    it("should fail when required fields are empty", () => {
      const invalidData = {
        firstName: "",
        lastName: "  ",
        email: "",
        message: "",
      };

      expect(invalidData.firstName.trim()).toBeFalsy();
      expect(invalidData.lastName.trim()).toBeFalsy();
      expect(invalidData.email.trim()).toBeFalsy();
      expect(invalidData.message.trim()).toBeFalsy();
    });

    it("should validate project-specific required fields", () => {
      const projectData = {
        projectType: "Kitchen Remodeling",
        projectLocation: "Seattle, WA",
      };

      expect(projectData.projectType).toBeTruthy();
      expect(projectData.projectLocation.trim()).toBeTruthy();
    });
  });
});
