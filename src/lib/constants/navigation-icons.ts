/**
 * Navigation Icons - Centralized icon mapping for consistent page references
 *
 * Use these constants when linking to or representing pages throughout the codebase.
 * This ensures visual consistency across the footer, navigation, and all page references.
 *
 * For contextual/semantic icons within page content (e.g., "partnership concept" within text),
 * you may use different icons as appropriate. This mapping is specifically for PAGE NAVIGATION.
 *
 * @example
 * import { PAGE_ICONS } from '@/lib/constants/navigation-icons';
 * <MaterialIcon icon={PAGE_ICONS.services} />
 */

export const PAGE_ICONS = {
  // Primary Navigation
  home: "home",
  contact: "contact_phone",
  services: "build",
  projects: "photo_library",
  resources: "folder_open",
  safety: "verified_user",
  faq: "help",

  // Company Information
  about: "military_tech",
  team: "groups",
  allies: "handshake", // Partners page
  publicSector: "account_balance",
  veterans: "workspace_premium",
  careers: "work",
  testimonials: "star",

  // Legal/Utility
  privacy: "shield",
  terms: "gavel",
  accessibility: "accessibility",
  sitemap: "account_tree",
} as const;

/**
 * Semantic icons for use within page content (not for navigation links)
 * These represent concepts, not pages.
 *
 * ICON STANDARDS:
 *
 * PEOPLE:
 * - `handshake` = Allies/Partners (two hands shaking)
 * - `group` = Clients (two people)
 * - `groups` = Team/Staff (three people)
 *
 * INFORMATION:
 * - `military_tech` = About/Company (veteran-themed company identity)
 * - `info` = General informational content within pages
 *
 * WORK:
 * - `work` = Careers/Jobs (briefcase)
 * - `badge` = Credentials/Personnel policy (name badge)
 * - `business_center` = Business/Corporate
 */
export const SEMANTIC_ICONS = {
  // Trust & Quality
  verified: "verified",
  certified: "verified_user",
  quality: "verified",

  // People Icons (STANDARDIZED)
  partnership: "handshake", // Allies, partners, trade partners
  allies: "handshake", // Alias for partnership
  clients: "group", // Clients, client partners (two people)
  team: "groups", // Team, staff (three people)
  teamwork: "groups", // Alias for team
  forces: "groups", // Military-themed team reference

  // Military/Veteran
  veteran: "military_tech",
  award: "workspace_premium",
  medal: "workspace_premium",
  serviceFirst: "workspace_premium", // Veterans program

  // Work & Construction
  construction: "construction",
  building: "build",
  tools: "build",
  work: "work",
  careers: "work",
  personnel: "badge", // Personnel/HR
  credentials: "badge",

  // Ratings & Reviews
  rating: "star",
  review: "star",
  testimonial: "star",
  rate: "rate_review", // Footer review prompt

  // Communication
  phone: "call",
  email: "mail",
  location: "place",
  contact: "contact_phone",

  // Social Media Platforms
  facebook: "thumb_up",
  instagram: "photo_camera",
  twitter: "alternate_email",
  youtube: "smart_display",
  linkedin: "business_center",

  // UI Actions
  arrow: "arrow_forward",
  expand: "expand_more",
  collapse: "expand_less",
  close: "close",
  check: "check_circle",
  info: "info",
  warning: "warning",
  error: "error_outline",
  add: "add",
  edit: "edit",
  remove: "delete",

  // Navigation/Discovery
  explore: "explore",
  search: "search",
  map: "map",
  share: "share",

  // Notifications
  notification: "notifications_active",
  subscribe: "notifications_active",

  // Government/Public
  government: "account_balance",
  publicSector: "account_balance",
} as const;

/**
 * Core Values icon standard used site-wide.
 *
 * Branding standard:
 * - Honesty = shield
 * - Integrity = balance (scale)
 * - Professionalism = business_center (suitcase)
 * - Thoroughness = task_alt (checkmark)
 */
export const CORE_VALUE_ICONS = {
  honesty: "shield",
  integrity: "balance",
  professionalism: "business_center",
  thoroughness: "task_alt",
} as const;

/**
 * Social Media Icons - Consistent icons for external platforms
 */
export const SOCIAL_ICONS = {
  facebook: "thumb_up",
  instagram: "photo_camera",
  twitter: "alternate_email",
  youtube: "smart_display",
  linkedin: "business_center",
} as const;

/**
 * Section Header Icons - Icons for footer/page section headers
 */
export const SECTION_ICONS = {
  explore: "explore", // Discovery/Navigation sections
  ourForces: "groups", // Team/Company sections
  connect: "share", // Social/Connect sections
} as const;

export type PageIconKey = keyof typeof PAGE_ICONS;
export type SemanticIconKey = keyof typeof SEMANTIC_ICONS;
export type SocialIconKey = keyof typeof SOCIAL_ICONS;
export type SectionIconKey = keyof typeof SECTION_ICONS;
export type CoreValueIconKey = keyof typeof CORE_VALUE_ICONS;
