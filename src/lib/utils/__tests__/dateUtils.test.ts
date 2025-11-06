import { formatDate, formatDateLong, getRelativeTime } from "../dateUtils";

describe("dateUtils", () => {
  describe("formatDate", () => {
    it("should format date in MM/DD/YYYY format", () => {
      expect(formatDate("2025-11-05")).toBe("11/05/2025");
      expect(formatDate("2025-01-15")).toBe("01/15/2025");
    });

    it("should handle different dates", () => {
      expect(formatDate("2024-12-31")).toBe("12/31/2024");
      expect(formatDate("2025-03-20")).toBe("03/20/2025");
    });
  });

  describe("formatDateLong", () => {
    it("should format date in long format", () => {
      expect(formatDateLong("2025-11-05")).toBe("November 5, 2025");
      expect(formatDateLong("2025-01-15")).toBe("January 15, 2025");
    });

    it("should handle different months", () => {
      expect(formatDateLong("2025-06-15")).toBe("June 15, 2025");
      expect(formatDateLong("2024-12-25")).toBe("December 25, 2024");
    });
  });

  describe("getRelativeTime", () => {
    beforeEach(() => {
      // Mock current date to 2025-11-05
      jest.useFakeTimers();
      jest.setSystemTime(new Date("2025-11-05T12:00:00Z"));
    });

    afterEach(() => {
      jest.useRealTimers();
    });

    it('should return "Today" for same day', () => {
      expect(getRelativeTime("2025-11-05")).toBe("Today");
    });

    it("should return days ago for recent dates", () => {
      expect(getRelativeTime("2025-11-03")).toBe("2 days ago");
      expect(getRelativeTime("2025-11-04")).toBe("1 day ago");
    });

    it("should return weeks ago", () => {
      expect(getRelativeTime("2025-10-29")).toBe("1 week ago");
      expect(getRelativeTime("2025-10-15")).toBe("3 weeks ago");
    });

    it("should return months ago", () => {
      expect(getRelativeTime("2025-10-05")).toBe("1 month ago");
      expect(getRelativeTime("2025-09-05")).toBe("2 months ago");
    });

    it("should return years ago for old dates", () => {
      expect(getRelativeTime("2024-11-05")).toBe("1 year ago");
      expect(getRelativeTime("2023-11-05")).toBe("2 years ago");
    });
  });
});
