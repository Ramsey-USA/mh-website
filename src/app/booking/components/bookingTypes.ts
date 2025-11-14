/**
 * Booking Types and Constants
 */

// Available time slots for consultations
export const timeSlots = [
  "7:00 AM",
  "8:00 AM",
  "9:00 AM",
  "10:00 AM",
  "11:00 AM",
  "1:00 PM",
  "2:00 PM",
  "3:00 PM",
  "4:00 PM",
];

// Available project types
export const projectTypes = [
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

// Booking form data interface
export interface BookingFormData {
  clientName: string;
  email: string;
  phone: string;
  projectType: string;
  projectDescription: string;
  location: string;
  budget: string;
  selectedDate: string;
  selectedTime: string;
  additionalNotes: string;
}

// Calendar day interface
export interface CalendarDay {
  date: string;
  displayDate: number;
  dayName: string;
  fullDate: string;
}
