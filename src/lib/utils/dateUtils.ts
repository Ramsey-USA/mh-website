// Date utility functions for consistent server/client rendering
// Prevents hydration mismatches by using fixed formatting

/**
 * Formats a date string consistently across server and client
 * Prevents hydration mismatches by avoiding locale-dependent formatting
 * @param dateString - Date in YYYY-MM-DD format
 * @returns Formatted date string (MM/DD/YYYY)
 */
export function formatDate(dateString: string): string {
  // Parse the date components directly to avoid timezone issues
  const parts = dateString.split("-").map(Number);
  const year = parts[0];
  const month = parts[1];
  const day = parts[2];

  if (!year || !month || !day) {
    return dateString; // Return original if parsing fails
  }

  // Create date with explicit components (month is 0-indexed)
  const date = new Date(year, month - 1, day);

  // Format manually to ensure consistency
  const mm = String(date.getMonth() + 1).padStart(2, "0");
  const dd = String(date.getDate()).padStart(2, "0");
  const yyyy = date.getFullYear();

  return `${mm}/${dd}/${yyyy}`;
}

/**
 * Formats a date string for display in a more readable format
 * @param dateString - Date in YYYY-MM-DD format
 * @returns Formatted date string (Month DD, YYYY)
 */
export function formatDateLong(dateString: string): string {
  const parts = dateString.split("-").map(Number);
  const year = parts[0];
  const month = parts[1];
  const day = parts[2];

  if (!year || !month || !day) {
    return dateString; // Return original if parsing fails
  }

  const date = new Date(year, month - 1, day);

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const monthName = months[date.getMonth()];
  return monthName
    ? `${monthName} ${date.getDate()}, ${date.getFullYear()}`
    : dateString;
}

/**
 * Gets relative time string (e.g., "2 months ago")
 * @param dateString - Date in YYYY-MM-DD format
 * @returns Relative time string
 */
export function getRelativeTime(dateString: string): string {
  const parts = dateString.split("-").map(Number);
  const year = parts[0];
  const month = parts[1];
  const day = parts[2];

  if (!year || !month || !day) {
    return dateString; // Return original if parsing fails
  }

  const date = new Date(year, month - 1, day);
  const now = new Date();
  const diffTime = now.getTime() - date.getTime();
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays < 1) return "Today";
  if (diffDays < 7) return `${diffDays} day${diffDays > 1 ? "s" : ""} ago`;
  if (diffDays < 30) {
    return `${Math.floor(diffDays / 7)} week${Math.floor(diffDays / 7) > 1 ? "s" : ""} ago`;
  }
  if (diffDays < 365) {
    return `${Math.floor(diffDays / 30)} month${Math.floor(diffDays / 30) > 1 ? "s" : ""} ago`;
  }

  const years = Math.floor(diffDays / 365);
  return `${years} year${years > 1 ? "s" : ""} ago`;
}
