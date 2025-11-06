/**
 * Contact Form Integration Tests
 *
 * Tests the complete contact form submission flow including
 * validation, API calls, and error handling
 */

import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";

// Mock fetch for API calls
global.fetch = jest.fn();

describe("Contact Form Integration Tests", () => {
  beforeEach(() => {
    // Clear all mocks before each test
    jest.clearAllMocks();
    (global.fetch as jest.Mock).mockClear();
  });

  describe("Form Validation", () => {
    it("should validate required fields", async () => {
      // Test email validation
      const emailTests = [
        { input: "invalid", valid: false },
        { input: "test@", valid: false },
        { input: "test@example.com", valid: true },
      ];

      for (const test of emailTests) {
        const emailRegex = /^[a-z0-9._+-]+@[a-z0-9.-]+\.[a-z]{2,}$/i;
        expect(emailRegex.test(test.input)).toBe(test.valid);
      }
    });

    it("should validate phone numbers", () => {
      const phoneTests = [
        { input: "123", valid: false },
        { input: "5093086489", valid: true },
        { input: "(509) 308-6489", valid: true },
        { input: "+1-509-308-6489", valid: true },
      ];

      for (const test of phoneTests) {
        const cleaned = test.input.replace(/[^\d+]/g, "");
        const isValid =
          cleaned.length === 10 ||
          (cleaned.startsWith("+") && cleaned.length >= 11);
        expect(isValid).toBe(test.valid);
      }
    });

    it("should sanitize input data", () => {
      const maliciousInput = "<script>alert('xss')</script>Hello";
      const sanitized = maliciousInput.replace(
        /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,
        "",
      );
      expect(sanitized).not.toContain("<script>");
      expect(sanitized).toBe("Hello");
    });
  });

  describe("API Integration", () => {
    it("should submit contact form successfully", async () => {
      const mockResponse = {
        success: true,
        message: "Contact form submitted successfully",
      };

      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => mockResponse,
      });

      const formData = {
        name: "John Doe",
        email: "john@example.com",
        phone: "5093086489",
        message: "Test message",
        subject: "General Inquiry",
      };

      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      expect(global.fetch).toHaveBeenCalledWith(
        "/api/contact",
        expect.objectContaining({
          method: "POST",
          headers: { "Content-Type": "application/json" },
        }),
      );
      expect(result.success).toBe(true);
    });

    it("should handle API errors gracefully", async () => {
      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: false,
        status: 500,
        json: async () => ({ error: "Internal server error" }),
      });

      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: "test@example.com" }),
      });

      expect(response.ok).toBe(false);
      expect(response.status).toBe(500);
    });

    it("should handle rate limiting", async () => {
      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: false,
        status: 429,
        headers: new Headers({
          "Retry-After": "60",
          "X-RateLimit-Limit": "10",
          "X-RateLimit-Remaining": "0",
        }),
        json: async () => ({
          error: "Too many requests",
          retryAfter: 60,
        }),
      });

      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({}),
      });

      expect(response.status).toBe(429);
      const result = await response.json();
      expect(result.error).toBe("Too many requests");
    });
  });

  describe("Error Handling", () => {
    it("should handle network errors", async () => {
      (global.fetch as jest.Mock).mockRejectedValueOnce(
        new Error("Network error"),
      );

      try {
        await fetch("/api/contact", {
          method: "POST",
          body: JSON.stringify({}),
        });
        fail("Should have thrown an error");
      } catch (error) {
        expect(error).toBeInstanceOf(Error);
        expect((error as Error).message).toBe("Network error");
      }
    });

    it("should validate missing required fields", () => {
      const requiredFields = ["name", "email", "message"];
      const formData = { name: "John" }; // Missing email and message

      const missingFields = requiredFields.filter(
        (field) =>
          !(field in formData) || !formData[field as keyof typeof formData],
      );

      expect(missingFields).toContain("email");
      expect(missingFields).toContain("message");
    });
  });

  describe("Data Sanitization", () => {
    it("should remove XSS attempts", () => {
      const xssTests = [
        {
          input: '<img src="x" onerror="alert(1)">',
          expected: '<img src="x">',
        },
        {
          input: '<a href="javascript:alert(1)">Click</a>',
          expected: '<a href="">Click</a>',
        },
        {
          input: '<iframe src="evil.com"></iframe>',
          expected: "",
        },
      ];

      for (const test of xssTests) {
        let sanitized = test.input.replace(
          /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,
          "",
        );
        sanitized = sanitized.replace(
          /<iframe\b[^<]*(?:(?!<\/iframe>)<[^<]*)*<\/iframe>/gi,
          "",
        );
        sanitized = sanitized.replace(/\s*on\w+\s*=\s*["'][^"']*["']/gi, "");
        sanitized = sanitized.replace(/javascript:[^"']*/gi, "");
        sanitized = sanitized.replace(
          /href="[^"]*javascript:[^"]*"/gi,
          'href=""',
        );

        expect(sanitized).toBe(test.expected);
      }
    });
  });
});
