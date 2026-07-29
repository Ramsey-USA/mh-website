/**
 * Operations Hub dashboard card definitions.
 *
 * Centralizes the cards rendered on /hub so the page component stays
 * presentational and so future cards can be added/reordered without
 * touching JSX.
 */

import { COMPANY_INFO } from "@/lib/constants/company";

export interface HubCardDefinition {
  readonly title: string;
  readonly subtitle: string;
  readonly href: string;
  readonly icon: string;
  readonly badge: string;
}

function sitePath(path: string): string {
  const base = COMPANY_INFO.urls.site.replace(/\/+$/, "");
  return `${base}${path}`;
}

export const HUB_CARDS: readonly HubCardDefinition[] = [
  {
    title: "Safety Program (MISH / Safety Manual)",
    subtitle:
      "Public website: credentials, standards, and safety program overview",
    href: sitePath("/safety"),
    icon: "shield",
    badge: "Public Site",
  },
  {
    title: "Incident Reporting",
    subtitle: "Public website route for direct incident entry",
    href: sitePath("/safety/incident-report"),
    icon: "report",
    badge: "Public Site",
  },
  {
    title: "Employee Handbook",
    subtitle:
      "Public website handbook index, acknowledgments, and onboarding references",
    href: sitePath("/employee-handbook"),
    icon: "menu_book",
    badge: "Public Site",
  },
  {
    title: "Safety + Handbook Forms",
    subtitle:
      "Public website forms library for current Safety Program (MISH) and Employee Handbook workflows",
    href: sitePath("/resources"),
    icon: "description",
    badge: "Public + Role-Gated",
  },
  {
    title: "Manuals and SOPs",
    subtitle:
      "Public website resource index for manuals, SOPs, and reference guides",
    href: sitePath("/resources"),
    icon: "library_books",
    badge: "Public Site",
  },
  {
    title: "Operations Manual",
    subtitle: "Public website PDF: current operations manual table of contents",
    href: sitePath("/docs/operations/operations-manual-toc.pdf"),
    icon: "engineering",
    badge: "Public PDF",
  },
  {
    title: "Marketing Strategy Guide",
    subtitle: "Public website PDF: marketing strategy guide table of contents",
    href: sitePath("/docs/marketing/marketing-strategy-guide-toc.pdf"),
    icon: "campaign",
    badge: "Public PDF",
  },
  {
    title: "Sales and Estimating Guide",
    subtitle:
      "Public website PDF: sales and estimating guide table of contents",
    href: sitePath("/docs/sales/sales-estimating-guide-toc.pdf"),
    icon: "request_quote",
    badge: "Public PDF",
  },
  {
    title: "Training and Toolbox Talks",
    subtitle: "Public website resource area for training and toolbox materials",
    href: sitePath("/resources"),
    icon: "school",
    badge: "Public Site",
  },
] as const;

export const ADMIN_CARDS: readonly HubCardDefinition[] = [
  {
    title: "My Team Profile",
    subtitle:
      "Update your professional bio, skills, and career highlights shown on the public team page",
    href: "/hub/profile",
    icon: "edit_note",
    badge: "Admin Only",
  },
  {
    title: "Review Profiles",
    subtitle:
      "Approve or reject team profile submissions before they appear on the public team page",
    href: "/hub/profile/review",
    icon: "rate_review",
    badge: "Approver Only",
  },
] as const;
