/**
 * Timing Constants
 * Centralized timing values for consistency across the application
 */

export const TIMING = {
  // Animation Durations
  ANIMATION: {
    COUNTER: 2000, // AnimatedCounter default duration
    FADE_QUICK: 200,
    FADE_STANDARD: 300,
    SLIDE_STANDARD: 300,
  },

  // Auto-play & Carousel
  CAROUSEL: {
    TESTIMONIALS_INTERVAL: 5000, // Testimonial slide duration
    SERVICES_INTERVAL: 10000, // Services carousel interval
    AUTO_RESUME_DELAY: 3000, // Resume auto-play after manual interaction
  },

  // Debounce & Throttle
  PERFORMANCE: {
    DEBOUNCE_SCROLL: 100,
    THROTTLE_RESIZE: 250,
    FOCUS_DELAY: 100, // Input focus delay
    VISIBILITY_CHECK: 100, // Initial visibility check
  },

  // Retry & Backoff
  RETRY: {
    BASE_DELAY: 1000, // Base retry delay (exponential backoff)
    LAZY_LOAD_DELAY: 1000, // Lazy component retry delay
  },

  // Cache & Cleanup
  CACHE: {
    CLEANUP_INTERVAL: 300000, // 5 minutes
    AI_RESPONSE_CLEANUP: 60000, // 1 minute
  },

  // Memory Monitoring
  MONITORING: {
    MEMORY_UPDATE_INTERVAL: 5000,
    PERFORMANCE_CHECK_INTERVAL: 1000,
  },

  // Interactions
  INTERACTION: {
    MIN_SWIPE_DISTANCE: 50, // Minimum pixels for swipe gesture
  },
} as const;
