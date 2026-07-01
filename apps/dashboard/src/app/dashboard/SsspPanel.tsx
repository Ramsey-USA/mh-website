"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { MaterialIcon } from "@/components/icons/MaterialIcon";
import { adminFetch } from "@/lib/admin-auth/api";
import {
  formatSafetyDate,
  formatSsspStatus,
  SSSP_STATUS_COLORS,
  type SsspRecord,
  type SsspSourceFile,
  type SsspStatus,
} from "@/lib/dashboard/safety";

// ─── Types ────────────────────────────────────────────────────────────────────

interface SsspPanelProps {
  readonly token: string;
  readonly jobId: string;
  readonly jobNumber: string;
  readonly onLoaded?: (jobId: string, record: SsspRecord | null) => void;
}

interface SsspData {
  readonly sssp: SsspRecord | null;
  readonly sourceFiles: ReadonlyArray<SsspSourceFile>;
}

// ─── Upload progress ──────────────────────────────────────────────────────────

interface UploadItem {
  readonly name: string;
  readonly state: "uploading" | "done" | "error";
  readonly error?: string;
}

// ─── SsspPanel ────────────────────────────────────────────────────────────────

export function SsspPanel({
  token,
  jobId,
  jobNumber,
  onLoaded,
}: SsspPanelProps) {
  const [data, setData] = useState<SsspData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [uploads, setUploads] = useState<UploadItem[]>([]);
  const [generating, setGenerating] = useState(false);
  const [genError, setGenError] = useState<string | null>(null);
  const [notes, setNotes] = useState("");
  const [savingNotes, setSavingNotes] = useState(false);
  const [patchError, setPatchError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const pollRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const loadData = useCallback(async () => {
    try {
      const res = await adminFetch(
        token,
        `/api/safety/sssp/${encodeURIComponent(jobId)}`,
      );
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const json = (await res.json()) as { data: SsspData };
      setData(json.data);
      setError(null);
      if (json.data.sssp) {
        setNotes(json.data.sssp.notes ?? "");
      }
      onLoaded?.(jobId, json.data.sssp ?? null);
      return json.data;
    } catch (_err) {
      setError(_err instanceof Error ? _err.message : "Failed to load SSSP");
      return null;
    } finally {
      setLoading(false);
    }
  }, [token, jobId, onLoaded]);

  // Poll when status is 'generating'
  useEffect(() => {
    void loadData();
  }, [loadData]);

  useEffect(() => {
    if (data?.sssp?.status === "generating") {
      pollRef.current = setTimeout(() => {
        void loadData();
      }, 5000);
    }
    return () => {
      if (pollRef.current) {
        clearTimeout(pollRef.current);
      }
    };
  }, [data?.sssp?.status, loadData]);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files ?? []);
    if (files.length === 0) return;

    for (const file of files) {
      setUploads((prev) => [...prev, { name: file.name, state: "uploading" }]);

      try {
        const formData = new FormData();
        formData.append("file", file);

        const res = await fetch(
          `/api/safety/sssp/${encodeURIComponent(jobId)}/upload`,
          {
            method: "POST",
            headers: { Authorization: `Bearer ${token}` },
            body: formData,
          },
        );

        if (!res.ok) {
          const json = (await res.json()) as { error?: string };
          throw new Error(json.error ?? `Upload failed (${res.status})`);
        }

        setUploads((prev) =>
          prev.map((u) => (u.name === file.name ? { ...u, state: "done" } : u)),
        );
      } catch (_err) {
        setUploads((prev) =>
          prev.map((u) =>
            u.name === file.name
              ? {
                  ...u,
                  state: "error",
                  error: _err instanceof Error ? _err.message : "Upload failed",
                }
              : u,
          ),
        );
      }
    }

    // Reset input and reload
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
    await loadData();
  };

  const handleGenerate = async () => {
    setGenerating(true);
    setGenError(null);
    try {
      const res = await adminFetch(
        token,
        `/api/safety/sssp/${encodeURIComponent(jobId)}/generate`,
        { method: "POST" },
      );
      if (!res.ok) {
        const json = (await res.json()) as { error?: string };
        throw new Error(json.error ?? "Generation failed");
      }
      await loadData();
    } catch (_err) {
      setGenError(_err instanceof Error ? _err.message : "Generation failed");
    } finally {
      setGenerating(false);
    }
  };

  const handlePatchStatus = async (status: SsspStatus) => {
    setPatchError(null);
    try {
      const res = await adminFetch(
        token,
        `/api/safety/sssp/${encodeURIComponent(jobId)}`,
        { method: "PATCH", body: JSON.stringify({ status }) },
      );
      if (!res.ok) {
        const json = (await res.json()) as { error?: string };
        throw new Error(json.error ?? "Update failed");
      }
      await loadData();
    } catch (_err) {
      setPatchError(_err instanceof Error ? _err.message : "Update failed");
    }
  };

  const handleSaveNotes = async () => {
    setSavingNotes(true);
    setPatchError(null);
    try {
      const res = await adminFetch(
        token,
        `/api/safety/sssp/${encodeURIComponent(jobId)}`,
        { method: "PATCH", body: JSON.stringify({ notes }) },
      );
      if (!res.ok) {
        const json = (await res.json()) as { error?: string };
        throw new Error(json.error ?? "Failed to save notes");
      }
    } catch (_err) {
      setPatchError(
        _err instanceof Error ? _err.message : "Failed to save notes",
      );
    } finally {
      setSavingNotes(false);
    }
  };

  const sssp = data?.sssp ?? null;
  const sourceFiles = data?.sourceFiles ?? [];
  const isGenerating = sssp?.status === "generating" || generating;

  return (
    <div
      data-sssp-panel="true"
      className="p-5 bg-brand-primary-darker/65 border-t-2 border-brand-primary/50"
    >
      <div className="flex items-center gap-2 mb-4">
        <MaterialIcon
          icon="description"
          size="md"
          className="text-brand-secondary"
        />
        <h3 className="text-sm font-black text-white uppercase tracking-wider">
          SSSP — {jobNumber}
        </h3>
        {sssp && (
          <span
            className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-bold border uppercase ml-2 ${SSSP_STATUS_COLORS[sssp.status]}`}
          >
            {formatSsspStatus(sssp.status)}
          </span>
        )}
      </div>

      {loading && (
        <div className="text-center py-6 text-brand-secondary-light/70">
          <MaterialIcon
            icon="hourglass_empty"
            size="xl"
            className="animate-pulse mx-auto mb-2"
          />
          <p className="text-sm">Loading…</p>
        </div>
      )}

      {!loading && error && (
        <p className="text-xs text-red-400 flex items-center gap-1 mb-3">
          <MaterialIcon icon="error_outline" size="sm" />
          {error}
        </p>
      )}

      {!loading && !error && (
        <div className="space-y-5">
          {/* Source files */}
          <div>
            <p className="text-xs font-black text-brand-secondary-light/85 uppercase tracking-wider mb-2">
              Project Plan Files
            </p>

            {sourceFiles.length > 0 && (
              <ul className="space-y-1 mb-3">
                {sourceFiles.map((f) => (
                  <li
                    key={f.id}
                    className="flex items-center gap-2 text-xs text-brand-secondary-light/85"
                  >
                    <MaterialIcon
                      icon="attach_file"
                      size="sm"
                      className="text-brand-secondary-light/65 shrink-0"
                    />
                    <span className="truncate">{f.original_filename}</span>
                    <span className="text-brand-secondary-light/65 shrink-0">
                      {formatSafetyDate(f.uploaded_at)}
                    </span>
                  </li>
                ))}
              </ul>
            )}

            {/* In-progress uploads */}
            {uploads.length > 0 && (
              <ul className="space-y-1 mb-3">
                {uploads.map((u, i) => (
                  <li key={i} className="flex items-center gap-2 text-xs">
                    {u.state === "uploading" && (
                      <>
                        <MaterialIcon
                          icon="hourglass_empty"
                          size="sm"
                          className="text-brand-secondary animate-pulse shrink-0"
                        />
                        <span className="text-brand-secondary-light/75 truncate">
                          {u.name}
                        </span>
                        <span className="text-brand-secondary shrink-0">
                          Uploading…
                        </span>
                      </>
                    )}
                    {u.state === "done" && (
                      <>
                        <MaterialIcon
                          icon="check_circle"
                          size="sm"
                          className="text-green-400 shrink-0"
                        />
                        <span className="text-brand-secondary-light/75 truncate">
                          {u.name}
                        </span>
                      </>
                    )}
                    {u.state === "error" && (
                      <>
                        <MaterialIcon
                          icon="error_outline"
                          size="sm"
                          className="text-red-400 shrink-0"
                        />
                        <span className="text-red-400 truncate">
                          {u.name}: {u.error}
                        </span>
                      </>
                    )}
                  </li>
                ))}
              </ul>
            )}

            <div data-print-hide="true">
              <label className="inline-flex items-center gap-2 cursor-pointer px-3 py-1.5 bg-brand-primary-dark/65 hover:bg-brand-primary-dark text-brand-secondary-light hover:text-white rounded-lg text-xs font-semibold transition-colors">
                <MaterialIcon icon="upload_file" size="sm" />
                Upload Plan File
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".pdf,image/*"
                  multiple
                  className="hidden"
                  onChange={(e) => void handleFileChange(e)}
                />
              </label>
              <span className="text-xs text-brand-secondary-light/65 ml-2">
                PDF or image, up to 25 MB each
              </span>
            </div>
          </div>

          {/* Generate / status */}
          <div data-print-hide="true">
            {genError && (
              <p className="text-xs text-red-400 flex items-center gap-1 mb-2">
                <MaterialIcon icon="error_outline" size="sm" />
                {genError}
              </p>
            )}

            {isGenerating ? (
              <div className="flex items-center gap-2 text-brand-secondary-light text-sm">
                <MaterialIcon
                  icon="hourglass_empty"
                  size="sm"
                  className="animate-pulse"
                />
                AI is generating the SSSP… this may take a minute.
              </div>
            ) : (
              <>
                <button
                  type="button"
                  onClick={() => void handleGenerate()}
                  disabled={sourceFiles.length === 0 || isGenerating}
                  title={
                    sourceFiles.length === 0
                      ? "Upload at least one project plan file before generating"
                      : undefined
                  }
                  className="inline-flex items-center gap-2 px-4 py-2 bg-brand-primary hover:bg-brand-primary-dark disabled:opacity-50 text-white text-sm font-black rounded-lg transition-colors"
                >
                  <MaterialIcon icon="auto_awesome" size="sm" />
                  {sssp && sssp.status !== "draft"
                    ? "Regenerate SSSP"
                    : "Generate SSSP"}
                </button>
                {sourceFiles.length === 0 && (
                  <p className="mt-1.5 text-xs text-brand-secondary-light/65">
                    Upload at least one project plan file to enable generation.
                  </p>
                )}
              </>
            )}
          </div>

          {/* Approval actions */}
          {sssp && (sssp.status === "ready" || sssp.status === "approved") && (
            <div>
              {patchError && (
                <p className="text-xs text-red-400 flex items-center gap-1 mb-2">
                  <MaterialIcon icon="error_outline" size="sm" />
                  {patchError}
                </p>
              )}

              <div
                data-print-hide="true"
                className="flex flex-wrap items-center gap-2 mb-3"
              >
                <a
                  href={`/api/safety/sssp/${encodeURIComponent(jobId)}/download`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-3 py-1.5 border border-brand-primary/45 hover:border-brand-secondary text-brand-secondary-light hover:text-white rounded-lg text-xs font-semibold transition-colors"
                >
                  <MaterialIcon icon="download" size="sm" />
                  Download SSSP
                </a>

                {sssp.status === "ready" && (
                  <button
                    type="button"
                    onClick={() => void handlePatchStatus("approved")}
                    className="inline-flex items-center gap-2 px-3 py-1.5 bg-green-700 hover:bg-green-600 text-white rounded-lg text-xs font-black transition-colors"
                  >
                    <MaterialIcon icon="verified" size="sm" />
                    Approve
                  </button>
                )}

                {sssp.status === "approved" && (
                  <span className="inline-flex items-center gap-1 text-xs text-green-400">
                    <MaterialIcon icon="verified" size="sm" />
                    Approved
                    {sssp.approved_by && ` by ${sssp.approved_by}`}
                    {sssp.approved_at &&
                      ` on ${formatSafetyDate(sssp.approved_at)}`}
                  </span>
                )}
              </div>

              {/* Print-visible download note */}
              <div
                data-print-only="true"
                className="text-xs text-brand-secondary-light/70 hidden"
              >
                SSSP generated{" "}
                {sssp.generated_at
                  ? formatSafetyDate(sssp.generated_at)
                  : "N/A"}
                {sssp.approved_by && ` — Approved by ${sssp.approved_by}`}
              </div>

              {/* Notes */}
              <div>
                <p className="text-xs font-black text-brand-secondary-light/85 uppercase tracking-wider mb-1">
                  Admin Notes
                </p>
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  rows={3}
                  placeholder="Internal notes about this SSSP…"
                  className="w-full px-3 py-2 bg-brand-primary-darker/60 border border-brand-primary/45 rounded-lg text-sm text-brand-secondary-light placeholder-brand-secondary-light/55 focus:outline-none focus:ring-2 focus:ring-brand-secondary/50 resize-none"
                />
                <div data-print-hide="true" className="mt-1.5 flex gap-2">
                  <button
                    type="button"
                    onClick={() => void handleSaveNotes()}
                    disabled={savingNotes}
                    className="px-3 py-1.5 bg-brand-primary-dark/65 hover:bg-brand-primary-dark disabled:opacity-50 text-brand-secondary-light rounded-lg text-xs font-semibold transition-colors"
                  >
                    {savingNotes ? "Saving…" : "Save Notes"}
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
