/**
 * Limits and Constraints Constants
 * Centralized size limits, pagination, and constraint values
 */

export const LIMITS = {
  // File Upload
  FILE: {
    MAX_RESUME_SIZE: 10 * 1024 * 1024, // 10MB
    MAX_IMAGE_SIZE: 5 * 1024 * 1024, // 5MB
  },

  // Pagination
  PAGINATION: {
    DEFAULT_LIMIT: 100,
    MAX_ITEMS_PER_PAGE: 100,
  },

  // Cache
  CACHE: {
    MAX_MEMORY_SIZE: 50 * 1024 * 1024, // 50MB
    MAX_ITEMS: 10000,
  },

  // Analytics & Logging
  ANALYTICS: {
    MAX_EVENTS_IN_MEMORY: 10000,
    SESSION_TIMEOUT_MINUTES: 30,
  },

  // Security
  SECURITY: {
    HSTS_MAX_AGE: 31536000, // 1 year in seconds
  },
} as const;
