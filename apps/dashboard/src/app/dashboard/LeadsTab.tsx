"use client";

import { useState, useEffect, useMemo, useDeferredValue } from "react";
import { MaterialIcon } from "@/components/icons/MaterialIcon";
import { ExportCsvButton } from "@/components/dashboard/ExportCsvButton";
import { useAdminTabData } from "@/hooks/useAdminTabData";
import {
  ASSIGNEES,
  buildLeadsQuery,
  computePipelineStats,
  formatCurrency,
  formatLeadDate,
  formatRelativeDate,
  getSourceLabel,
  isOverdue,
  LEADS_CSV_HEADERS,
  leadsCsvRows,
  overdueLeadsCount,
  PRIORITY_COLORS,
  PRIORITY_ICONS,
  searchLeads,
  STATUS_COLORS,
  STATUS_LABELS,
  totalPipelineValue,
  weightedPipelineValue,
  type Lead,
  type LeadsResponse,
} from "@/lib/dashboard/leads";

// ─── Lead Detail Panel ────────────────────────────────────────────────────────

interface LeadDetailProps {
  readonly lead: Lead;
  readonly token: string;
  readonly onUpdate: () => void;
  readonly onClose: () => void;
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
      probability: Number.parseInt(editValues.probability, 10) || 50,
      follow_up_date: editValues.follow_up_date || null,
    };

    if (editValues.estimated_value) {
      updates["estimated_value"] = Number.parseInt(
        editValues.estimated_value,
        10,
      );
    }

    if (editValues.status === "lost" && editValues.lost_reason) {
      updates["lost_reason"] = editValues.lost_reason;
    }

    await handleUpdate(updates);
  };

  const inputClass =
    "w-full px-3 py-2 bg-gray-700/60 border border-gray-600 rounded-lg text-sm text-white focus:outline-none focus:ring-2 focus:ring-brand-secondary/50 focus:border-brand-secondary";
  const selectClass = `${inputClass} appearance-none cursor-pointer`;
  const labelClass = "text-xs text-gray-400 font-semibold uppercase mb-1 block";

  return (
    <div
      data-print-hide="true"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm"
    >
      <div className="bg-gray-800 border border-gray-700 rounded-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-700 sticky top-0 bg-gray-800 z-10">
          <div>
            <h3 className="text-xl font-black text-white">
              {lead.contact_name}
            </h3>
            <p className="text-sm text-gray-400">
              {lead.company && `${lead.company} • `}
              {getSourceLabel(lead.source)}
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors p-2"
            aria-label="Close lead detail"
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
              <label className={labelClass} htmlFor="lead-status">
                Status
              </label>
              <select
                id="lead-status"
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
              <label className={labelClass} htmlFor="lead-priority">
                Priority
              </label>
              <select
                id="lead-priority"
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
              <label className={labelClass} htmlFor="lead-assigned">
                Assigned To
              </label>
              <select
                id="lead-assigned"
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
              <label className={labelClass} htmlFor="lead-followup">
                Follow-up Date
              </label>
              <input
                id="lead-followup"
                type="date"
                value={editValues.follow_up_date}
                onChange={(e) =>
                  handleFieldChange("follow_up_date", e.target.value)
                }
                className={inputClass}
              />
            </div>
            <div>
              <label className={labelClass} htmlFor="lead-value">
                Estimated Value ($)
              </label>
              <input
                id="lead-value"
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
              <label className={labelClass} htmlFor="lead-prob">
                Win Probability (%)
              </label>
              <input
                id="lead-prob"
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

          {editValues.status === "lost" && (
            <div>
              <label className={labelClass} htmlFor="lead-lost-reason">
                Lost Reason
              </label>
              <select
                id="lead-lost-reason"
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
                [...lead.notes].reverse().map((note) => (
                  <div
                    key={`${note.timestamp}-${note.author}`}
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
                type="button"
                onClick={handleAddNote}
                disabled={!newNote.trim() || updating}
                className="px-4 py-2 bg-brand-secondary text-white font-bold rounded-lg hover:bg-brand-secondary-dark disabled:opacity-50 transition-colors"
                aria-label="Add note"
              >
                <MaterialIcon icon="add" size="sm" />
              </button>
            </div>
          </div>

          {error && (
            <p className="text-sm text-red-400 flex items-center gap-1">
              <MaterialIcon icon="error_outline" size="sm" />
              {error}
            </p>
          )}

          <div className="text-xs text-gray-500 pt-4 border-t border-gray-700 flex justify-between">
            <span>Created: {formatLeadDate(lead.created_at)}</span>
            <span>Updated: {formatLeadDate(lead.updated_at)}</span>
            {lead.closed_at && (
              <span>Closed: {formatLeadDate(lead.closed_at)}</span>
            )}
          </div>
        </div>

        <div className="flex justify-end gap-3 px-6 py-4 border-t border-gray-700 sticky bottom-0 bg-gray-800">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-sm font-semibold text-gray-400 hover:text-white border border-gray-600 hover:border-gray-400 rounded-lg transition-colors"
          >
            Cancel
          </button>
          <button
            type="button"
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
  readonly token: string;
}

const SKELETON_KEYS = [
  "lead-skel-1",
  "lead-skel-2",
  "lead-skel-3",
  "lead-skel-4",
  "lead-skel-5",
];

export function LeadsTab({ token }: LeadsTabProps) {
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);

  // Filters
  const [filterStatus, setFilterStatus] = useState<string>("active");
  const [filterAssignee, setFilterAssignee] = useState<string>("");
  const [filterPriority, setFilterPriority] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState("");
  const deferredSearchQuery = useDeferredValue(searchQuery);

  const url = useMemo(
    () =>
      buildLeadsQuery({
        status: filterStatus,
        assigned_to: filterAssignee,
        priority: filterPriority,
      }),
    [filterStatus, filterAssignee, filterPriority],
  );

  const { data, status, isFetching, refetch } = useAdminTabData<LeadsResponse>(
    token,
    url,
  );

  const leads: ReadonlyArray<Lead> = useMemo(() => data?.data ?? [], [data]);
  const isLoading = status === "loading";

  // Refresh selected lead reference if list reloads
  useEffect(() => {
    if (!selectedLead) return;
    const fresh = leads.find((l) => l.id === selectedLead.id);
    if (fresh && fresh !== selectedLead) setSelectedLead(fresh);
  }, [leads, selectedLead]);

  const filteredLeads = useMemo(
    () => searchLeads(leads, deferredSearchQuery),
    [deferredSearchQuery, leads],
  );

  const pipelineStats = useMemo(() => computePipelineStats(leads), [leads]);
  const overdueCount = useMemo(() => overdueLeadsCount(leads), [leads]);
  const pipelineValue = useMemo(() => totalPipelineValue(leads), [leads]);
  const weightedValue = useMemo(() => weightedPipelineValue(leads), [leads]);
  const csvRows = useMemo(() => leadsCsvRows(filteredLeads), [filteredLeads]);

  const selectClass =
    "px-3 py-2 bg-gray-700/60 border border-gray-600 rounded-lg text-sm text-white focus:outline-none focus:ring-2 focus:ring-brand-secondary/50 cursor-pointer";

  return (
    <div className="space-y-6">
      {/* Pipeline Summary Cards */}
      <section
        data-print-section="true"
        className="grid grid-cols-2 sm:grid-cols-4 gap-4"
      >
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
            {formatCurrency(pipelineValue)}
          </p>
          <p className="text-xs text-gray-500">
            Weighted: {formatCurrency(weightedValue)}
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
      </section>

      {/* Filters + Actions */}
      <div data-print-hide="true" className="flex flex-wrap gap-3 items-center">
        <div className="flex-1 min-w-[200px]">
          <input
            type="search"
            placeholder="Search leads..."
            aria-label="Search leads"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-4 py-2 bg-gray-700/60 border border-gray-600 rounded-lg text-sm text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-secondary/50"
          />
        </div>
        <select
          aria-label="Filter by status"
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
          aria-label="Filter by assignee"
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
          aria-label="Filter by priority"
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
        <ExportCsvButton
          filename={`mh-leads-${new Date().toISOString().slice(0, 10)}.csv`}
          headers={LEADS_CSV_HEADERS}
          rows={csvRows}
        />
        <button
          type="button"
          onClick={() => void refetch()}
          disabled={isFetching}
          className="px-4 py-2 bg-brand-secondary text-white font-bold rounded-lg hover:bg-brand-secondary-dark disabled:opacity-50 transition-colors inline-flex items-center gap-2"
        >
          <MaterialIcon
            icon="refresh"
            size="sm"
            className={isFetching ? "animate-spin" : ""}
          />
          Refresh
        </button>
      </div>

      {/* Leads Table */}
      <section
        data-print-section="true"
        className="bg-gray-800/80 border border-gray-700 rounded-xl overflow-hidden"
      >
        {isLoading && leads.length === 0 ? (
          <div className="p-4 space-y-2">
            {SKELETON_KEYS.map((k) => (
              <div
                key={k}
                className="h-12 bg-gray-700/40 rounded animate-pulse"
              />
            ))}
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
                  <th scope="col" className="px-4 py-3 font-semibold">
                    Lead
                  </th>
                  <th scope="col" className="px-4 py-3 font-semibold">
                    Project
                  </th>
                  <th scope="col" className="px-4 py-3 font-semibold">
                    Status
                  </th>
                  <th scope="col" className="px-4 py-3 font-semibold">
                    Value
                  </th>
                  <th scope="col" className="px-4 py-3 font-semibold">
                    Assigned
                  </th>
                  <th scope="col" className="px-4 py-3 font-semibold">
                    Follow-up
                  </th>
                  <th scope="col" className="px-4 py-3 font-semibold">
                    Source
                  </th>
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
                          {formatLeadDate(lead.follow_up_date)}
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
                        {getSourceLabel(lead.source)}
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
      </section>

      {/* Lead Detail Modal */}
      {selectedLead && (
        <LeadDetailPanel
          lead={selectedLead}
          token={token}
          onUpdate={() => {
            void refetch();
            setSelectedLead(null);
          }}
          onClose={() => setSelectedLead(null)}
        />
      )}
    </div>
  );
}
