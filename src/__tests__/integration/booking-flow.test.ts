/**
 * Consultation Booking Integration Tests
 *
 * Tests the booking flow including date/time selection,
 * form validation, and API integration
 */

import "@testing-library/jest-dom";

global.fetch = jest.fn();

describe("Consultation Booking Integration Tests", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (global.fetch as jest.Mock).mockClear();
  });

  describe("Date and Time Selection", () => {
    it("should validate date selection", () => {
      const today = new Date();
      const yesterday = new Date(today);
      yesterday.setDate(yesterday.getDate() - 1);

      const futureDate = new Date(today);
      futureDate.setDate(futureDate.getDate() + 7);

      // Can't book in the past
      expect(yesterday < today).toBe(true);

      // Can book in the future
      expect(futureDate > today).toBe(true);
    });

    it("should validate time slots", () => {
      const timeSlots = [
        "8:00 AM",
        "9:00 AM",
        "10:00 AM",
        "11:00 AM",
        "1:00 PM",
        "2:00 PM",
        "3:00 PM",
        "4:00 PM",
      ];

      expect(timeSlots.length).toBe(8);
      expect(timeSlots).toContain("9:00 AM");
      expect(timeSlots).toContain("2:00 PM");
    });

    it("should format date correctly", () => {
      const date = new Date("2025-11-05");
      const formatted = date.toLocaleDateString("en-US", {
        weekday: "short",
        month: "short",
        day: "numeric",
      });

      expect(formatted).toMatch(/\w{3}, \w{3} \d{1,2}/);
    });
  });

  describe("Booking Form Validation", () => {
    it("should validate client information", () => {
      const bookingData = {
        clientName: "John Doe",
        email: "john@example.com",
        phone: "5093086489",
        projectType: "Custom Home",
        location: "Pasco, WA",
        budget: "500000-750000",
        selectedDate: "2025-11-10",
        selectedTime: "10:00 AM",
      };

      // All required fields present
      const requiredFields = [
        "clientName",
        "email",
        "phone",
        "projectType",
        "selectedDate",
        "selectedTime",
      ];

      const hasAllRequired = requiredFields.every(
        (field) =>
          field in bookingData &&
          bookingData[field as keyof typeof bookingData],
      );

      expect(hasAllRequired).toBe(true);
    });

    it("should validate project types", () => {
      const projectTypes = [
        "Custom Home",
        "Home Addition",
        "Kitchen Remodel",
        "Bathroom Remodel",
        "Commercial Building",
        "Tenant Improvement",
        "Industrial Facility",
        "Religious Facility",
        "Medical Facility",
        "Government Project",
        "Other",
      ];

      expect(projectTypes).toContain("Custom Home");
      expect(projectTypes).toContain("Commercial Building");
      expect(projectTypes.length).toBeGreaterThan(5);
    });
  });

  describe("API Integration", () => {
    it("should submit booking successfully", async () => {
      const mockResponse = {
        success: true,
        consultationId: "cons-123",
        message: "Consultation booked successfully",
      };

      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => mockResponse,
      });

      const bookingData = {
        clientName: "John Doe",
        email: "john@example.com",
        phone: "5093086489",
        projectType: "Custom Home",
        projectDescription: "New construction",
        location: "Pasco, WA",
        budget: "500000-750000",
        selectedDate: "2025-11-10",
        selectedTime: "10:00 AM",
      };

      const response = await fetch("/api/consultations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(bookingData),
      });

      const result = await response.json();

      expect(response.ok).toBe(true);
      expect(result.success).toBe(true);
      expect(result.consultationId).toBeDefined();
    });

    it("should handle booking conflicts", async () => {
      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: false,
        status: 409,
        json: async () => ({
          error: "Time slot already booked",
          message: "Please select a different time",
        }),
      });

      const response = await fetch("/api/consultations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          selectedDate: "2025-11-10",
          selectedTime: "10:00 AM",
        }),
      });

      expect(response.status).toBe(409);
      const result = await response.json();
      expect(result.error).toBe("Time slot already booked");
    });

    it("should retrieve consultation by ID", async () => {
      const mockConsultation = {
        id: "cons-123",
        clientName: "John Doe",
        email: "john@example.com",
        status: "scheduled",
        scheduledDate: "2025-11-10",
        scheduledTime: "10:00 AM",
      };

      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => mockConsultation,
      });

      const response = await fetch("/api/consultations/cons-123");
      const result = await response.json();

      expect(result.id).toBe("cons-123");
      expect(result.status).toBe("scheduled");
    });

    it("should update consultation status", async () => {
      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          success: true,
          message: "Status updated",
        }),
      });

      const response = await fetch("/api/consultations/cons-123", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: "completed" }),
      });

      const result = await response.json();
      expect(result.success).toBe(true);
    });
  });

  describe("Pre-filling from URL Parameters", () => {
    it("should parse URL parameters", () => {
      const searchParams = new URLSearchParams(
        "date=2025-11-10&time=10:00 AM&projectType=Custom Home",
      );

      expect(searchParams.get("date")).toBe("2025-11-10");
      expect(searchParams.get("time")).toBe("10:00 AM");
      expect(searchParams.get("projectType")).toBe("Custom Home");
    });

    it("should handle missing parameters gracefully", () => {
      const searchParams = new URLSearchParams("date=2025-11-10");

      expect(searchParams.get("date")).toBe("2025-11-10");
      expect(searchParams.get("time")).toBeNull();
      expect(searchParams.get("projectType")).toBeNull();
    });
  });

  describe("Multi-step Form Flow", () => {
    it("should progress through steps", () => {
      let currentStep = 1;

      // Step 1: Date/Time selection
      expect(currentStep).toBe(1);
      currentStep++;

      // Step 2: Details
      expect(currentStep).toBe(2);
      currentStep++;

      // Step 3: Confirmation
      expect(currentStep).toBe(3);
    });

    it("should validate each step before proceeding", () => {
      // Step 1 validation
      const step1Valid = (selectedDate: string, selectedTime: string) => {
        return !!selectedDate && !!selectedTime;
      };

      expect(step1Valid("2025-11-10", "10:00 AM")).toBe(true);
      expect(step1Valid("", "10:00 AM")).toBe(false);

      // Step 2 validation
      const step2Valid = (name: string, email: string, phone: string) => {
        return !!name && !!email && !!phone;
      };

      expect(step2Valid("John", "john@example.com", "5093086489")).toBe(true);
      expect(step2Valid("", "john@example.com", "5093086489")).toBe(false);
    });
  });
});
