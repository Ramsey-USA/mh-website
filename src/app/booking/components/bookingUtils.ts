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
    if (date.getDay() !== 0 && date.getDay() !== 6) {
      days.push({
        date: date.toISOString().split("T")[0],
        displayDate: date.getDate(),
        dayName: date.toLocaleDateString("en-US", { weekday: "short" }),
        fullDate: date.toLocaleDateString("en-US", {
          weekday: "long",
          month: "long",
          day: "numeric",
        }),
      });
    }
  }
  return days;
}

/**
 * Convert 12-hour time format to 24-hour format
 */
export function convertTo24Hour(time12h: string): string {
  const [time, modifier] = time12h.split(" ");
  const [hoursStr, minutes] = time.split(":");
  let hours = hoursStr;

  if (hours === "12") {
    hours = "00";
  }
  if (modifier === "PM") {
    hours = (parseInt(hours, 10) + 12).toString();
  }

  return `${hours}:${minutes || "00"}:00`;
}
