/**
 * Pure helpers, types, and constants for the Leads dashboard tab.
 * Extracted so they can be unit-tested without React.
 */

export type LeadStatus =
  | "new"
  | "contacted"
  | "estimate_sent"
  | "negotiating"
  | "won"
  | "lost";

export type LeadPriority = "low" | "medium" | "high" | "urgent";

export interface LeadNote {
  readonly timestamp: string;
  readonly author: string;
  readonly content: string;
}

export interface Lead {
  readonly id: string;
  readonly source: string;
  readonly source_id: string | null;
  readonly contact_name: string;
  readonly email: string | null;
  readonly phone: string | null;
  readonly company: string | null;
  readonly project_type: string | null;
  readonly project_location: string | null;
  readonly project_description: string | null;
  readonly status: LeadStatus;
  readonly estimated_value: number | null;
  readonly probability: number;
  readonly priority: LeadPriority;
  readonly assigned_to: string | null;
  readonly follow_up_date: string | null;
  readonly last_contact_date: string | null;
  readonly notes: ReadonlyArray<LeadNote>;
  readonly lost_reason: string | null;
  readonly created_at: string;
  readonly updated_at: string;
  readonly closed_at: string | null;
  readonly metadata: Readonly<Record<string, unknown>>;
}

export interface LeadsResponse {
  readonly data: ReadonlyArray<Lead>;
}

export const STATUS_LABELS: Readonly<Record<LeadStatus, string>> = {
  new: "New",
  contacted: "Contacted",
  estimate_sent: "Estimate Sent",
  negotiating: "Negotiating",
  won: "Won",
  lost: "Lost",
};

export const STATUS_COLORS: Readonly<Record<LeadStatus, string>> = {
  new: "bg-blue-900/50 text-blue-300 border-blue-600",
  contacted: "bg-yellow-900/50 text-yellow-300 border-yellow-600",
  estimate_sent: "bg-purple-900/50 text-purple-300 border-purple-600",
  negotiating: "bg-orange-900/50 text-orange-300 border-orange-600",
  won: "bg-green-900/50 text-green-300 border-green-600",
  lost: "bg-red-900/50 text-red-400 border-red-700",
};

export const PRIORITY_COLORS: Readonly<Record<LeadPriority, string>> = {
  low: "text-gray-400",
  medium: "text-yellow-400",
  high: "text-orange-400",
  urgent: "text-red-400",
};

export const PRIORITY_ICONS: Readonly<Record<LeadPriority, string>> = {
  low: "trending_down",
  medium: "trending_flat",
  high: "trending_up",
  urgent: "priority_high",
};

export const SOURCE_LABELS: Readonly<Record<string, string>> = {
  contact_form: "Contact Form",
  consultation: "Consultation",
  phone_call: "Phone Call",
  referral: "Referral",
  walk_in: "Walk-in",
  event_booth: "Event Booth",
};

export interface AssigneeOption {
  readonly value: string;
  readonly label: string;
}

export const ASSIGNEES: ReadonlyArray<AssigneeOption> = [
  { value: "", label: "All" },
  { value: "unassigned", label: "Unassigned" },
  { value: "matt", label: "Matt" },
  { value: "jeremy", label: "Jeremy" },
];

const USD_FORMATTER = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  minimumFractionDigits: 0,
  maximumFractionDigits: 0,
});

const DATE_FORMATTER = new Intl.DateTimeFormat("en-US", {
  month: "short",
  day: "numeric",
  year: "numeric",
});

export function formatCurrency(value: number | null): string {
  if (value === null) return "—";
  return USD_FORMATTER.format(value);
}

export function formatLeadDate(date: string | null): string {
  if (!date) return "—";
  return DATE_FORMATTER.format(new Date(date));
}

export function formatRelativeDate(
  date: string,
  now: Date = new Date(),
): string {
  const d = new Date(date);
  const diff = now.getTime() - d.getTime();
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));

  if (days === 0) return "Today";
  if (days === 1) return "Yesterday";
  if (days < 7) return `${days} days ago`;
  if (days < 30) return `${Math.floor(days / 7)} weeks ago`;
  return formatLeadDate(date);
}

export function isOverdue(
  follow_up_date: string | null,
  now: Date = new Date(),
): boolean {
  if (!follow_up_date) return false;
  return new Date(follow_up_date) < now;
}

export function getSourceLabel(source: string): string {
  return SOURCE_LABELS[source] ?? source;
}

export interface PipelineBucket {
  count: number;
  value: number;
}

export type PipelineStats = Readonly<Record<LeadStatus, PipelineBucket>>;

export function computePipelineStats(
  leads: ReadonlyArray<Lead>,
): PipelineStats {
  const stats: Record<LeadStatus, PipelineBucket> = {
    new: { count: 0, value: 0 },
    contacted: { count: 0, value: 0 },
    estimate_sent: { count: 0, value: 0 },
    negotiating: { count: 0, value: 0 },
    won: { count: 0, value: 0 },
    lost: { count: 0, value: 0 },
  };
  for (const lead of leads) {
    const bucket = stats[lead.status];
    bucket.count += 1;
    if (lead.estimated_value) bucket.value += lead.estimated_value;
  }
  return stats;
}

function isOpenLead(lead: Lead): boolean {
  return lead.status !== "won" && lead.status !== "lost";
}

export function totalPipelineValue(leads: ReadonlyArray<Lead>): number {
  return leads
    .filter(isOpenLead)
    .reduce((sum, l) => sum + (l.estimated_value ?? 0), 0);
}

export function weightedPipelineValue(leads: ReadonlyArray<Lead>): number {
  return leads
    .filter(isOpenLead)
    .reduce(
      (sum, l) => sum + ((l.estimated_value ?? 0) * l.probability) / 100,
      0,
    );
}

export function overdueLeadsCount(
  leads: ReadonlyArray<Lead>,
  now: Date = new Date(),
): number {
  return leads.filter((l) => isOpenLead(l) && isOverdue(l.follow_up_date, now))
    .length;
}

export function searchLeads(
  leads: ReadonlyArray<Lead>,
  query: string,
): ReadonlyArray<Lead> {
  if (!query) return leads;
  const q = query.toLowerCase();
  return leads.filter(
    (lead) =>
      lead.contact_name.toLowerCase().includes(q) ||
      lead.email?.toLowerCase().includes(q) ||
      lead.company?.toLowerCase().includes(q) ||
      lead.project_location?.toLowerCase().includes(q),
  );
}

export interface LeadsQueryOptions {
  readonly status?: string;
  readonly assigned_to?: string;
  readonly priority?: string;
}

export function buildLeadsQuery(options: LeadsQueryOptions = {}): string {
  const params = new URLSearchParams();
  if (options.status) params.set("status", options.status);
  if (options.assigned_to) params.set("assigned_to", options.assigned_to);
  if (options.priority) params.set("priority", options.priority);
  const qs = params.toString();
  return qs ? `/api/leads?${qs}` : "/api/leads";
}

export const LEADS_CSV_HEADERS = [
  "Created",
  "Contact",
  "Company",
  "Email",
  "Phone",
  "Source",
  "Project Type",
  "Project Location",
  "Project Description",
  "Status",
  "Priority",
  "Estimated Value",
  "Probability %",
  "Assigned To",
  "Follow-up Date",
  "Last Contact",
  "Notes Count",
] as const;

export function leadsCsvRows(
  leads: ReadonlyArray<Lead>,
): ReadonlyArray<ReadonlyArray<string | number>> {
  return leads.map((l) => [
    l.created_at,
    l.contact_name,
    l.company ?? "",
    l.email ?? "",
    l.phone ?? "",
    getSourceLabel(l.source),
    l.project_type ?? "",
    l.project_location ?? "",
    l.project_description ?? "",
    STATUS_LABELS[l.status],
    l.priority,
    l.estimated_value ?? 0,
    l.probability,
    l.assigned_to ?? "",
    l.follow_up_date ?? "",
    l.last_contact_date ?? "",
    l.notes.length,
  ]);
}
