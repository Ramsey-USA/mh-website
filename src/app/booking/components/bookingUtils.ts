/**
 * Booking Utilities
 * Helper functions for the booking system
 */

import type { CalendarDay } from "./bookingTypes";

/**
 * Generate next 30 days for calendar (excluding weekends)
 */
export function generateCalendarDays(): CalendarDay[] {
  const days: CalendarDay[] = [];
  const today = new Date();

  for (let i = 1; i <= 30; i++) {
    const date = new Date(today);
    date.setDate(today.getDate() + i);

    // Skip weekends for business consultations
    const dayOfWeek = date.getDay();
    if (dayOfWeek === 0 || dayOfWeek === 6) {
      continue; // skip weekends
    }
    const iso = date.toISOString();
    const [isoDate] = iso.split("T");
    const datePart = isoDate || iso; // always a string
    days.push({
      date: datePart,
      displayDate: date.getDate(),
      dayName: date.toLocaleDateString("en-US", { weekday: "short" }),
      fullDate: date.toLocaleDateString("en-US", {
        weekday: "long",
        month: "long",
        day: "numeric",
      }),
    });
  }
  return days;
}

/**
 * Convert 12-hour time format to 24-hour format
 */
export function convertTo24Hour(time12h: string): string {
  if (!time12h || typeof time12h !== "string") {
    return "00:00:00";
  }
  const parts = time12h.trim().split(" ");
  if (parts.length < 1) return "00:00:00";
  const time = parts[0] ?? "00:00";
  const modifier = parts[1] || "AM";
  const timeSegments = time.split(":");
  const hoursStr = timeSegments[0] || "00";
  const minutes = timeSegments[1] || "00";
  let hours = hoursStr;

  if (hours === "12") {
    hours = "00";
  }
  if (modifier.toUpperCase() === "PM" && hours !== "00") {
    hours = (parseInt(hours, 10) + 12).toString().padStart(2, "0");
  }

  return `${hours}:${minutes}:00`;
}
