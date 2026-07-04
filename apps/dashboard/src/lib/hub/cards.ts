/**
 * Operations Hub dashboard card definitions.
 *
 * Centralizes the cards rendered on /hub so the page component stays
 * presentational and so future cards can be added/reordered without
 * touching JSX.
 */

export interface HubCardDefinition {
  readonly title: string;
  readonly subtitle: string;
  readonly href: string;
  readonly icon: string;
  readonly badge: string;
}

export const HUB_CARDS: readonly HubCardDefinition[] = [
  {
    title: "Safety Program (MISH / Safety Manual)",
    subtitle: "Credentials, standards, and safety program overview",
    href: "/safety",
    icon: "shield",
    badge: "Program",
  },
  {
    title: "Incident Reporting",
    subtitle: "Submit incident reports directly from the field",
    href: "/safety/incident-report",
    icon: "report",
    badge: "Direct Entry",
  },
  {
    title: "Employee Handbook",
    subtitle:
      "Current handbook policies, acknowledgments, and onboarding references",
    href: "/employee-handbook",
    icon: "menu_book",
    badge: "Current",
  },
  {
    title: "Safety + Handbook Forms",
    subtitle:
      "Current Safety Program (MISH) and Employee Handbook forms for field and office workflows",
    href: "/resources",
    icon: "description",
    badge: "Role-Gated Downloads",
  },
  {
    title: "Manuals and SOPs",
    subtitle: "Safety Manual, reference guides, and operations documentation",
    href: "/resources",
    icon: "library_books",
    badge: "Reference",
  },
  {
    title: "Training and Toolbox Talks",
    subtitle: "Training records and toolbox workflow materials",
    href: "/resources",
    icon: "school",
    badge: "Field Ready",
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
