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
  allies: "group", // Partners page
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
 */
export const SEMANTIC_ICONS = {
  // Trust & Quality
  verified: "verified",
  certified: "verified_user",
  quality: "verified",

  // Collaboration
  partnership: "handshake",
  teamwork: "groups",

  // Military/Veteran
  veteran: "military_tech",
  award: "workspace_premium",
  medal: "workspace_premium",

  // Work & Construction
  construction: "construction",
  building: "build",
  tools: "build",

  // Ratings
  rating: "star",
  review: "star",

  // Communication
  phone: "call",
  email: "mail",
  location: "place",
} as const;

export type PageIconKey = keyof typeof PAGE_ICONS;
export type SemanticIconKey = keyof typeof SEMANTIC_ICONS;
