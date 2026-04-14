"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import { MaterialIcon } from "@/components/icons/MaterialIcon";

// ─── Types ────────────────────────────────────────────────────────────────────

interface Lead {
  id: string;
  source: string;
  source_id: string | null;
  contact_name: string;
  email: string | null;
  phone: string | null;
  company: string | null;
  project_type: string | null;
  project_location: string | null;
  project_description: string | null;
  status: LeadStatus;
  estimated_value: number | null;
  probability: number;
  priority: LeadPriority;
  assigned_to: string | null;
  follow_up_date: string | null;
  last_contact_date: string | null;
  notes: LeadNote[];
  lost_reason: string | null;
  created_at: string;
  updated_at: string;
  closed_at: string | null;
  metadata: Record<string, unknown>;
}

interface LeadNote {
  timestamp: string;
  author: string;
  content: string;
}

type LeadStatus =
  | "new"
  | "contacted"
  | "estimate_sent"
  | "negotiating"
  | "won"
  | "lost";
type LeadPriority = "low" | "medium" | "high" | "urgent";

// ─── Constants ────────────────────────────────────────────────────────────────

const STATUS_LABELS: Record<LeadStatus, string> = {
  new: "New",
  contacted: "Contacted",
  estimate_sent: "Estimate Sent",
  negotiating: "Negotiating",
  won: "Won",
  lost: "Lost",
};

const STATUS_COLORS: Record<LeadStatus, string> = {
  new: "bg-blue-900/50 text-blue-300 border-blue-600",
  contacted: "bg-yellow-900/50 text-yellow-300 border-yellow-600",
  estimate_sent: "bg-purple-900/50 text-purple-300 border-purple-600",
  negotiating: "bg-orange-900/50 text-orange-300 border-orange-600",
  won: "bg-green-900/50 text-green-300 border-green-600",
  lost: "bg-red-900/50 text-red-400 border-red-700",
};

const PRIORITY_COLORS: Record<LeadPriority, string> = {
  low: "text-gray-400",
  medium: "text-yellow-400",
  high: "text-orange-400",
  urgent: "text-red-400",
};

const PRIORITY_ICONS: Record<LeadPriority, string> = {
  low: "trending_down",
  medium: "trending_flat",
  high: "trending_up",
  urgent: "priority_high",
};

const SOURCE_LABELS: Record<string, string> = {
  contact_form: "Contact Form",
  consultation: "Consultation",
  phone_call: "Phone Call",
  referral: "Referral",
  walk_in: "Walk-in",
};

const ASSIGNEES = [
  { value: "", label: "All" },
  { value: "unassigned", label: "Unassigned" },
  { value: "matt", label: "Matt" },
  { value: "jeremy", label: "Jeremy" },
];

// ─── Helper Functions ─────────────────────────────────────────────────────────

function formatCurrency(value: number | null): string {
  if (value === null) return "—";
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
}

function formatDate(date: string | null): string {
  if (!date) return "—";
  return new Date(date).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function formatRelativeDate(date: string): string {
  const now = new Date();
  const d = new Date(date);
  const diff = now.getTime() - d.getTime();
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));

  if (days === 0) return "Today";
  if (days === 1) return "Yesterday";
  if (days < 7) return `${days} days ago`;
  if (days < 30) return `${Math.floor(days / 7)} weeks ago`;
  return formatDate(date);
}

function isOverdue(follow_up_date: string | null): boolean {
  if (!follow_up_date) return false;
  return new Date(follow_up_date) < new Date();
}

// ─── Lead Detail Panel ────────────────────────────────────────────────────────

interface LeadDetailProps {
  lead: Lead;
  token: string;
  onUpdate: () => void;
  onClose: () => void;
}

function LeadDetailPanel({ lead, token, onUpdate, onClose }: LeadDetailProps) {
  const [updating, setUpdating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [newNote, setNewNote] = useState("");
  const [editValues, setEditValues] = useState({
    status: lead.status,
    priority: lead.priority,
    assigned_to: lead.assigned_to || "",
    estimated_value: lead.estimated_value?.toString() || "",
    probability: lead.probability.toString(),
    follow_up_date: lead.follow_up_date || "",
    lost_reason: lead.lost_reason || "",
  });

  const handleUpdate = async (updates: Record<string, unknown>) => {
    setUpdating(true);
    setError(null);
    try {
      const res = await fetch("/api/leads", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ id: lead.id, ...updates }),
      });
      if (!res.ok) {
        const json = await res.json();
        throw new Error(json.error || "Failed to update lead");
      }
      onUpdate();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Update failed");
    } finally {
      setUpdating(false);
    }
  };

  const handleAddNote = async () => {
    if (!newNote.trim()) return;
    await handleUpdate({ add_note: newNote.trim(), note_author: "Admin" });
    setNewNote("");
  };

  const handleFieldChange = (field: string, value: string | number | null) => {
    setEditValues((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = async () => {
    const updates: Record<string, unknown> = {
      status: editValues.status,
      priority: editValues.priority,
      assigned_to: editValues.assigned_to || null,
      probability: parseInt(editValues.probability, 10) || 50,
      follow_up_date: editValues.follow_up_date || null,
    };

    if (editValues.estimated_value) {
      updates.estimated_value = parseInt(editValues.estimated_value, 10);
    }

    if (editValues.status === "lost" && editValues.lost_reason) {
      updates.lost_reason = editValues.lost_reason;
    }

    await handleUpdate(updates);
  };

  const inputClass =
    "w-full px-3 py-2 bg-gray-700/60 border border-gray-600 rounded-lg text-sm text-white focus:outline-none focus:ring-2 focus:ring-brand-secondary/50 focus:border-brand-secondary";
  const selectClass = `${inputClass} appearance-none cursor-pointer`;
  const labelClass = "text-xs text-gray-400 font-semibold uppercase mb-1 block";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
      <div className="bg-gray-800 border border-gray-700 rounded-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-700 sticky top-0 bg-gray-800 z-10">
          <div>
            <h3 className="text-xl font-black text-white">
              {lead.contact_name}
            </h3>
            <p className="text-sm text-gray-400">
              {lead.company && `${lead.company} • `}
              {SOURCE_LABELS[lead.source] || lead.source}
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors p-2"
          >
            <MaterialIcon icon="close" size="md" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Contact Info */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <span className={labelClass}>Email</span>
              <p className="text-white">
                {lead.email ? (
                  <a
                    href={`mailto:${lead.email}`}
                    className="text-brand-secondary hover:underline"
                  >
                    {lead.email}
                  </a>
                ) : (
                  "—"
                )}
              </p>
            </div>
            <div>
              <span className={labelClass}>Phone</span>
              <p className="text-white">
                {lead.phone ? (
                  <a
                    href={`tel:${lead.phone}`}
                    className="text-brand-secondary hover:underline"
                  >
                    {lead.phone}
                  </a>
                ) : (
                  "—"
                )}
              </p>
            </div>
          </div>

          {/* Project Info */}
          <div>
            <span className={labelClass}>Project Details</span>
            <div className="bg-gray-700/40 rounded-lg p-4 space-y-2">
              <div className="flex gap-4 text-sm">
                <span className="text-gray-400">Type:</span>
                <span className="text-white">
                  {lead.project_type || "Not specified"}
                </span>
              </div>
              <div className="flex gap-4 text-sm">
                <span className="text-gray-400">Location:</span>
                <span className="text-white">
                  {lead.project_location || "Not specified"}
                </span>
              </div>
              {lead.project_description && (
                <div className="text-sm">
                  <span className="text-gray-400">Description:</span>
                  <p className="text-white mt-1">{lead.project_description}</p>
                </div>
              )}
            </div>
          </div>

          {/* CRM Fields */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>Status</label>
              <select
                value={editValues.status}
                onChange={(e) => handleFieldChange("status", e.target.value)}
                className={selectClass}
              >
                {Object.entries(STATUS_LABELS).map(([value, label]) => (
                  <option key={value} value={value}>
                    {label}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className={labelClass}>Priority</label>
              <select
                value={editValues.priority}
                onChange={(e) => handleFieldChange("priority", e.target.value)}
                className={selectClass}
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
                <option value="urgent">Urgent</option>
              </select>
            </div>
            <div>
              <label className={labelClass}>Assigned To</label>
              <select
                value={editValues.assigned_to}
                onChange={(e) =>
                  handleFieldChange("assigned_to", e.target.value)
                }
                className={selectClass}
              >
                <option value="">Unassigned</option>
                <option value="matt">Matt</option>
                <option value="jeremy">Jeremy</option>
              </select>
            </div>
            <div>
              <label className={labelClass}>Follow-up Date</label>
              <input
                type="date"
                value={editValues.follow_up_date}
                onChange={(e) =>
                  handleFieldChange("follow_up_date", e.target.value)
                }
                className={inputClass}
              />
            </div>
            <div>
              <label className={labelClass}>Estimated Value ($)</label>
              <input
                type="number"
                value={editValues.estimated_value}
                onChange={(e) =>
                  handleFieldChange("estimated_value", e.target.value)
                }
                placeholder="e.g. 500000"
                className={inputClass}
              />
            </div>
            <div>
              <label className={labelClass}>Win Probability (%)</label>
              <input
                type="number"
                min="0"
                max="100"
                value={editValues.probability}
                onChange={(e) =>
                  handleFieldChange("probability", e.target.value)
                }
                className={inputClass}
              />
            </div>
          </div>

          {/* Lost Reason (only show when status is lost) */}
          {editValues.status === "lost" && (
            <div>
              <label className={labelClass}>Lost Reason</label>
              <select
                value={editValues.lost_reason}
                onChange={(e) =>
                  handleFieldChange("lost_reason", e.target.value)
                }
                className={selectClass}
              >
                <option value="">Select reason...</option>
                <option value="price">Price too high</option>
                <option value="timing">Timing / Schedule</option>
                <option value="competitor">Went with competitor</option>
                <option value="scope_change">
                  Scope changed / Project cancelled
                </option>
                <option value="unresponsive">Client unresponsive</option>
                <option value="other">Other</option>
              </select>
            </div>
          )}

          {/* Notes */}
          <div>
            <span className={labelClass}>Notes ({lead.notes.length})</span>
            <div className="space-y-2 mb-3 max-h-40 overflow-y-auto">
              {lead.notes.length === 0 ? (
                <p className="text-sm text-gray-500 italic">No notes yet</p>
              ) : (
                [...lead.notes].reverse().map((note, i) => (
                  <div
                    key={i}
                    className="bg-gray-700/40 rounded-lg p-3 text-sm"
                  >
                    <div className="flex justify-between text-xs text-gray-400 mb-1">
                      <span className="font-semibold">{note.author}</span>
                      <span>{formatRelativeDate(note.timestamp)}</span>
                    </div>
                    <p className="text-white">{note.content}</p>
                  </div>
                ))
              )}
            </div>
            <div className="flex gap-2">
              <input
                type="text"
                value={newNote}
                onChange={(e) => setNewNote(e.target.value)}
                placeholder="Add a note..."
                className={inputClass}
                onKeyDown={(e) => e.key === "Enter" && handleAddNote()}
              />
              <button
                onClick={handleAddNote}
                disabled={!newNote.trim() || updating}
                className="px-4 py-2 bg-brand-secondary text-white font-bold rounded-lg hover:bg-brand-secondary-dark disabled:opacity-50 transition-colors"
              >
                <MaterialIcon icon="add" size="sm" />
              </button>
            </div>
          </div>

          {/* Error */}
          {error && (
            <p className="text-sm text-red-400 flex items-center gap-1">
              <MaterialIcon icon="error_outline" size="sm" />
              {error}
            </p>
          )}

          {/* Timestamps */}
          <div className="text-xs text-gray-500 pt-4 border-t border-gray-700 flex justify-between">
            <span>Created: {formatDate(lead.created_at)}</span>
            <span>Updated: {formatDate(lead.updated_at)}</span>
            {lead.closed_at && (
              <span>Closed: {formatDate(lead.closed_at)}</span>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-3 px-6 py-4 border-t border-gray-700 sticky bottom-0 bg-gray-800">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm font-semibold text-gray-400 hover:text-white border border-gray-600 hover:border-gray-400 rounded-lg transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            disabled={updating}
            className="px-6 py-2 text-sm font-black text-white bg-brand-primary hover:bg-brand-primary-dark disabled:opacity-60 rounded-lg transition-colors inline-flex items-center gap-2"
          >
            {updating ? (
              <>
                <MaterialIcon icon="hourglass_empty" size="sm" />
                Saving…
              </>
            ) : (
              <>
                <MaterialIcon icon="save" size="sm" />
                Save Changes
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Main Leads Tab ───────────────────────────────────────────────────────────

interface LeadsTabProps {
  token: string;
  userName?: string;
}

export function LeadsTab({ token, userName }: LeadsTabProps) {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);

  // Filters
  const [filterStatus, setFilterStatus] = useState<string>("active");
  const [filterAssignee, setFilterAssignee] = useState<string>("");
  const [filterPriority, setFilterPriority] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState("");

  const fetchLeads = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (filterStatus) params.set("status", filterStatus);
      if (filterAssignee) params.set("assigned_to", filterAssignee);
      if (filterPriority) params.set("priority", filterPriority);

      const res = await fetch(`/api/leads?${params.toString()}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (res.ok) {
        const json = await res.json();
        setLeads(json.data as Lead[]);
      }
    } finally {
      setLoading(false);
    }
  }, [token, filterStatus, filterAssignee, filterPriority]);

  useEffect(() => {
    void fetchLeads();
  }, [fetchLeads]);

  // ── Computed values ──────────────────────────────────────────────────────────

  const filteredLeads = useMemo(() => {
    if (!searchQuery) return leads;
    const q = searchQuery.toLowerCase();
    return leads.filter(
      (lead) =>
        lead.contact_name.toLowerCase().includes(q) ||
        lead.email?.toLowerCase().includes(q) ||
        lead.company?.toLowerCase().includes(q) ||
        lead.project_location?.toLowerCase().includes(q),
    );
  }, [leads, searchQuery]);

  const pipelineStats = useMemo(() => {
    const stats = {
      new: { count: 0, value: 0 },
      contacted: { count: 0, value: 0 },
      estimate_sent: { count: 0, value: 0 },
      negotiating: { count: 0, value: 0 },
      won: { count: 0, value: 0 },
      lost: { count: 0, value: 0 },
    };

    leads.forEach((lead) => {
      stats[lead.status].count++;
      if (lead.estimated_value) {
        stats[lead.status].value += lead.estimated_value;
      }
    });

    return stats;
  }, [leads]);

  const overdueCount = useMemo(
    () =>
      leads.filter(
        (l) =>
          l.status !== "won" &&
          l.status !== "lost" &&
          isOverdue(l.follow_up_date),
      ).length,
    [leads],
  );

  const totalPipelineValue = useMemo(
    () =>
      leads
        .filter((l) => l.status !== "won" && l.status !== "lost")
        .reduce((sum, l) => sum + (l.estimated_value || 0), 0),
    [leads],
  );

  const weightedPipelineValue = useMemo(
    () =>
      leads
        .filter((l) => l.status !== "won" && l.status !== "lost")
        .reduce(
          (sum, l) => sum + ((l.estimated_value || 0) * l.probability) / 100,
          0,
        ),
    [leads],
  );

  // ── UI ───────────────────────────────────────────────────────────────────────

  const selectClass =
    "px-3 py-2 bg-gray-700/60 border border-gray-600 rounded-lg text-sm text-white focus:outline-none focus:ring-2 focus:ring-brand-secondary/50 cursor-pointer";

  return (
    <div className="space-y-6">
      {/* Pipeline Summary Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-gray-800/80 border border-gray-700 rounded-xl p-4">
          <div className="flex items-center gap-2 text-xs text-gray-400 uppercase font-semibold mb-1">
            <MaterialIcon
              icon="attach_money"
              size="sm"
              className="text-green-400"
            />
            Pipeline Value
          </div>
          <p className="text-2xl font-black text-white">
            {formatCurrency(totalPipelineValue)}
          </p>
          <p className="text-xs text-gray-500">
            Weighted: {formatCurrency(weightedPipelineValue)}
          </p>
        </div>
        <div className="bg-gray-800/80 border border-gray-700 rounded-xl p-4">
          <div className="flex items-center gap-2 text-xs text-gray-400 uppercase font-semibold mb-1">
            <MaterialIcon
              icon="fiber_new"
              size="sm"
              className="text-blue-400"
            />
            New Leads
          </div>
          <p className="text-2xl font-black text-white">
            {pipelineStats.new.count}
          </p>
          <p className="text-xs text-gray-500">
            {formatCurrency(pipelineStats.new.value)}
          </p>
        </div>
        <div className="bg-gray-800/80 border border-gray-700 rounded-xl p-4">
          <div className="flex items-center gap-2 text-xs text-gray-400 uppercase font-semibold mb-1">
            <MaterialIcon
              icon="handshake"
              size="sm"
              className="text-purple-400"
            />
            In Negotiation
          </div>
          <p className="text-2xl font-black text-white">
            {pipelineStats.estimate_sent.count +
              pipelineStats.negotiating.count}
          </p>
          <p className="text-xs text-gray-500">
            {formatCurrency(
              pipelineStats.estimate_sent.value +
                pipelineStats.negotiating.value,
            )}
          </p>
        </div>
        <div className="bg-gray-800/80 border border-gray-700 rounded-xl p-4">
          <div className="flex items-center gap-2 text-xs text-gray-400 uppercase font-semibold mb-1">
            <MaterialIcon
              icon="warning"
              size="sm"
              className={overdueCount > 0 ? "text-red-400" : "text-gray-500"}
            />
            Overdue Follow-ups
          </div>
          <p
            className={`text-2xl font-black ${overdueCount > 0 ? "text-red-400" : "text-white"}`}
          >
            {overdueCount}
          </p>
          <p className="text-xs text-gray-500">Require attention</p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3 items-center">
        <div className="flex-1 min-w-[200px]">
          <input
            type="text"
            placeholder="Search leads..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-4 py-2 bg-gray-700/60 border border-gray-600 rounded-lg text-sm text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-secondary/50"
          />
        </div>
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className={selectClass}
        >
          <option value="active">Active Leads</option>
          <option value="">All Statuses</option>
          <option value="new">New</option>
          <option value="contacted">Contacted</option>
          <option value="estimate_sent">Estimate Sent</option>
          <option value="negotiating">Negotiating</option>
          <option value="won">Won</option>
          <option value="lost">Lost</option>
        </select>
        <select
          value={filterAssignee}
          onChange={(e) => setFilterAssignee(e.target.value)}
          className={selectClass}
        >
          {ASSIGNEES.map((a) => (
            <option key={a.value} value={a.value}>
              {a.label}
            </option>
          ))}
        </select>
        <select
          value={filterPriority}
          onChange={(e) => setFilterPriority(e.target.value)}
          className={selectClass}
        >
          <option value="">All Priorities</option>
          <option value="urgent">Urgent</option>
          <option value="high">High</option>
          <option value="medium">Medium</option>
          <option value="low">Low</option>
        </select>
        <button
          onClick={() => fetchLeads()}
          disabled={loading}
          className="px-4 py-2 bg-brand-secondary text-white font-bold rounded-lg hover:bg-brand-secondary-dark disabled:opacity-50 transition-colors inline-flex items-center gap-2"
        >
          <MaterialIcon
            icon="refresh"
            size="sm"
            className={loading ? "animate-spin" : ""}
          />
          Refresh
        </button>
      </div>

      {/* Leads Table */}
      <div className="bg-gray-800/80 border border-gray-700 rounded-xl overflow-hidden">
        {loading && leads.length === 0 ? (
          <div className="flex items-center justify-center py-12 text-gray-400">
            <MaterialIcon
              icon="hourglass_empty"
              size="lg"
              className="animate-spin mr-2"
            />
            Loading leads...
          </div>
        ) : filteredLeads.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 text-gray-400">
            <MaterialIcon icon="inbox" size="lg" className="mb-2" />
            <p>No leads found</p>
            <p className="text-sm text-gray-500 mt-1">
              {searchQuery
                ? "Try a different search"
                : "Leads will appear here when form submissions arrive"}
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-700 text-left text-xs text-gray-400 uppercase">
                  <th className="px-4 py-3 font-semibold">Lead</th>
                  <th className="px-4 py-3 font-semibold">Project</th>
                  <th className="px-4 py-3 font-semibold">Status</th>
                  <th className="px-4 py-3 font-semibold">Value</th>
                  <th className="px-4 py-3 font-semibold">Assigned</th>
                  <th className="px-4 py-3 font-semibold">Follow-up</th>
                  <th className="px-4 py-3 font-semibold">Source</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-700/50">
                {filteredLeads.map((lead) => (
                  <tr
                    key={lead.id}
                    onClick={() => setSelectedLead(lead)}
                    className="hover:bg-gray-700/30 cursor-pointer transition-colors"
                  >
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <MaterialIcon
                          icon={PRIORITY_ICONS[lead.priority]}
                          size="sm"
                          className={PRIORITY_COLORS[lead.priority]}
                        />
                        <div>
                          <p className="font-semibold text-white">
                            {lead.contact_name}
                          </p>
                          <p className="text-xs text-gray-400">
                            {lead.company || lead.email || "—"}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <p className="text-white">{lead.project_type || "—"}</p>
                      <p className="text-xs text-gray-400">
                        {lead.project_location || "—"}
                      </p>
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={`inline-block px-2 py-1 rounded text-xs font-semibold border ${STATUS_COLORS[lead.status]}`}
                      >
                        {STATUS_LABELS[lead.status]}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <p className="text-white font-medium">
                        {formatCurrency(lead.estimated_value)}
                      </p>
                      <p className="text-xs text-gray-400">
                        {lead.probability}% prob.
                      </p>
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={`capitalize ${lead.assigned_to ? "text-white" : "text-gray-500"}`}
                      >
                        {lead.assigned_to || "Unassigned"}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      {lead.follow_up_date ? (
                        <span
                          className={
                            isOverdue(lead.follow_up_date)
                              ? "text-red-400 font-semibold"
                              : "text-white"
                          }
                        >
                          {formatDate(lead.follow_up_date)}
                          {isOverdue(lead.follow_up_date) && (
                            <MaterialIcon
                              icon="warning"
                              size="sm"
                              className="ml-1 inline"
                            />
                          )}
                        </span>
                      ) : (
                        <span className="text-gray-500">—</span>
                      )}
                    </td>
                    <td className="px-4 py-3">
                      <span className="text-gray-400 text-xs">
                        {SOURCE_LABELS[lead.source] || lead.source}
                      </span>
                      <p className="text-xs text-gray-500">
                        {formatRelativeDate(lead.created_at)}
                      </p>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Lead Detail Modal */}
      {selectedLead && (
        <LeadDetailPanel
          lead={selectedLead}
          token={token}
          onUpdate={() => {
            fetchLeads();
            setSelectedLead(null);
          }}
          onClose={() => setSelectedLead(null)}
        />
      )}
    </div>
  );
}
