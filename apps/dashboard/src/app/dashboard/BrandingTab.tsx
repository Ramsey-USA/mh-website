"use client";

import { useCallback, useMemo, useRef, useState } from "react";
import { MaterialIcon } from "@/components/icons/MaterialIcon";

interface BrandingTabProps {
  readonly token: string;
}

type FileStatus = "pending" | "processing" | "success" | "error";

interface BrandingResult {
  readonly id: string;
  readonly fileName: string;
  readonly status: FileStatus;
  readonly message: string;
}

type BrandingViewTab = "upload" | "standards" | "results";

const ACCEPT_ATTR =
  ".pdf,.docx,application/pdf,application/vnd.openxmlformats-officedocument.wordprocessingml.document";

function resultStyle(status: FileStatus): string {
  if (status === "success") {
    return "border-green-500/50 bg-green-900/20 text-green-100";
  }
  if (status === "error") {
    return "border-red-500/50 bg-red-900/20 text-red-100";
  }
  if (status === "processing") {
    return "border-brand-secondary/50 bg-brand-primary/20 text-brand-secondary";
  }
  return "border-gray-600 bg-gray-800/50 text-gray-200";
}

function parseFilenameFromDisposition(
  contentDisposition: string | null,
  fallback: string,
): string {
  if (!contentDisposition) {
    return fallback;
  }

  const quoted = /filename="([^"]+)"/iu.exec(contentDisposition)?.[1];
  if (quoted) {
    return quoted;
  }

  const plain = /filename=([^;]+)/iu.exec(contentDisposition)?.[1];
  if (plain) {
    return plain.trim();
  }

  return fallback;
}

function isSupportedFile(file: File): boolean {
  const name = file.name.toLowerCase();
  return name.endsWith(".pdf") || name.endsWith(".docx");
}

export function BrandingTab({ token }: BrandingTabProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [results, setResults] = useState<BrandingResult[]>([]);
  const [processingCount, setProcessingCount] = useState(0);
  const [activeTab, setActiveTab] = useState<BrandingViewTab>("upload");
  const inputRef = useRef<HTMLInputElement | null>(null);

  const isProcessing = processingCount > 0;

  const addResult = useCallback((entry: BrandingResult) => {
    setResults((prev) => [entry, ...prev]);
  }, []);

  const updateResult = useCallback(
    (id: string, patch: Partial<BrandingResult>) => {
      setResults((prev) =>
        prev.map((entry) => (entry.id === id ? { ...entry, ...patch } : entry)),
      );
    },
    [],
  );

  const processFile = useCallback(
    async (file: File) => {
      const id = crypto.randomUUID();

      if (!isSupportedFile(file)) {
        addResult({
          id,
          fileName: file.name,
          status: "error",
          message: "Skipped unsupported type. Use .pdf or .docx.",
        });
        return;
      }

      addResult({
        id,
        fileName: file.name,
        status: "processing",
        message: "Branding in progress...",
      });

      setProcessingCount((value) => value + 1);
      try {
        const formData = new FormData();
        formData.append("file", file);

        const response = await fetch("/api/documents/brand", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        });

        if (!response.ok) {
          const maybeJson = (await response.json().catch(() => null)) as {
            error?: string;
          } | null;
          throw new Error(maybeJson?.error ?? "Branding failed");
        }

        const blob = await response.blob();
        const outputName = parseFilenameFromDisposition(
          response.headers.get("Content-Disposition"),
          file.name,
        );

        const blobUrl = URL.createObjectURL(blob);
        const anchor = document.createElement("a");
        anchor.href = blobUrl;
        anchor.download = outputName;
        anchor.click();
        URL.revokeObjectURL(blobUrl);

        updateResult(id, {
          status: "success",
          message: `Branded file downloaded as ${outputName}`,
        });
      } catch (_error) {
        updateResult(id, {
          status: "error",
          message:
            _error instanceof Error
              ? _error.message
              : "Unable to brand this file",
        });
      } finally {
        setProcessingCount((value) => Math.max(0, value - 1));
      }
    },
    [addResult, token, updateResult],
  );

  const processFiles = useCallback(
    async (fileList: FileList | File[]) => {
      const files = Array.from(fileList);
      for (const file of files) {
        await processFile(file);
      }
    },
    [processFile],
  );

  const onDrop = useCallback(
    async (event: React.DragEvent<HTMLElement>) => {
      event.preventDefault();
      setIsDragging(false);
      const dropped = event.dataTransfer.files;
      if (dropped.length > 0) {
        await processFiles(dropped);
      }
    },
    [processFiles],
  );

  const onFileInput = useCallback(
    async (event: React.ChangeEvent<HTMLInputElement>) => {
      const selected = event.target.files;
      if (selected && selected.length > 0) {
        await processFiles(selected);
      }
      event.target.value = "";
    },
    [processFiles],
  );

  const statusSummary = useMemo(() => {
    const success = results.filter(
      (entry) => entry.status === "success",
    ).length;
    const failed = results.filter((entry) => entry.status === "error").length;
    const processing = results.filter(
      (entry) => entry.status === "processing",
    ).length;
    return { success, failed, processing, total: results.length };
  }, [results]);

  let tabContent: React.ReactNode;
  if (activeTab === "upload") {
    tabContent = (
      <>
        <button
          type="button"
          onDragOver={(event) => {
            event.preventDefault();
            setIsDragging(true);
          }}
          onDragLeave={() => setIsDragging(false)}
          onDrop={(event) => {
            void onDrop(event);
          }}
          onClick={() => inputRef.current?.click()}
          className={`rounded-xl border-2 border-dashed p-10 text-center transition-colors cursor-pointer ${
            isDragging
              ? "border-brand-secondary bg-brand-primary/20"
              : "border-gray-600 hover:border-brand-secondary/80 hover:bg-brand-primary/10"
          }`}
        >
          <div className="mx-auto max-w-xl space-y-3">
            <MaterialIcon
              icon="upload_file"
              size="xl"
              className="text-brand-secondary"
            />
            <p className="text-white font-bold uppercase tracking-wide text-sm">
              Drag and drop files here, or use the selector
            </p>
            <p className="text-xs text-gray-400">
              Accepted formats: PDF and DOCX. Maximum file size: 20 MB.
            </p>
            <span className="inline-flex items-center gap-2 rounded-lg bg-brand-primary px-4 py-2 text-xs font-bold uppercase tracking-wide text-white hover:bg-brand-primary/80 transition-colors">
              <MaterialIcon icon="upload" size="sm" />
              Select Files
            </span>
            {isProcessing ? (
              <p className="text-xs text-brand-secondary font-semibold">
                Processing files... Downloads start automatically when complete.
              </p>
            ) : null}
          </div>
        </button>

        <div className="flex flex-wrap items-center gap-3 text-xs">
          <span className="px-3 py-1 rounded-full border border-amber-600/50 bg-amber-900/20 text-amber-200 font-semibold">
            Processing: {statusSummary.processing}
          </span>
          <span className="px-3 py-1 rounded-full border border-green-600/50 bg-green-900/20 text-green-200 font-semibold">
            Success: {statusSummary.success}
          </span>
          <span className="px-3 py-1 rounded-full border border-red-600/50 bg-red-900/20 text-red-200 font-semibold">
            Failed: {statusSummary.failed}
          </span>
          <span className="px-3 py-1 rounded-full border border-gray-600 bg-gray-700/40 text-gray-200 font-semibold">
            Total: {statusSummary.total}
          </span>
        </div>
      </>
    );
  } else if (activeTab === "standards") {
    tabContent = (
      <div className="rounded-xl border border-gray-700 bg-gray-800/40 p-5 space-y-4">
        <h3 className="text-sm font-black uppercase tracking-wide text-brand-secondary">
          Applied MH Branding Standards
        </h3>
        <div className="grid gap-3 sm:grid-cols-2">
          <div className="rounded-lg border border-gray-700 bg-gray-900/50 p-4">
            <p className="text-xs font-bold uppercase text-white">
              PDF Enhancements
            </p>
            <p className="text-xs text-gray-300 mt-2">
              Header band, footer metadata, trust line, and legal-name watermark
              are added to each page.
            </p>
          </div>
          <div className="rounded-lg border border-gray-700 bg-gray-900/50 p-4">
            <p className="text-xs font-bold uppercase text-white">
              DOCX Enhancements
            </p>
            <p className="text-xs text-gray-300 mt-2">
              Brand compliance banner is inserted and MH placeholders are
              normalized across Word XML parts.
            </p>
          </div>
          <div className="rounded-lg border border-gray-700 bg-gray-900/50 p-4 sm:col-span-2">
            <p className="text-xs font-bold uppercase text-white">
              Trust Preservation
            </p>
            <p className="text-xs text-gray-300 mt-2">
              Outputs include MH veteran-owned and BBB accreditation trust
              context to align with brand guardrails.
            </p>
          </div>
        </div>
      </div>
    );
  } else if (results.length === 0) {
    tabContent = (
      <section className="space-y-3">
        <div className="rounded-xl border border-gray-700 bg-gray-800/40 p-5 text-sm text-gray-400">
          No files processed yet.
        </div>
      </section>
    );
  } else {
    tabContent = (
      <section className="space-y-3">
        {results.map((entry) => (
          <article
            key={entry.id}
            className={`rounded-xl border px-4 py-3 ${resultStyle(entry.status)}`}
          >
            <div className="flex items-center justify-between gap-4">
              <p className="font-semibold text-sm truncate">{entry.fileName}</p>
              <span className="text-xs uppercase font-black tracking-wide">
                {entry.status}
              </span>
            </div>
            <p className="text-xs mt-1">{entry.message}</p>
          </article>
        ))}
      </section>
    );
  }

  return (
    <div className="space-y-6">
      <section className="bg-gray-800/60 rounded-xl border-2 border-brand-primary p-6">
        <div className="flex items-start gap-4">
          <div className="bg-brand-primary/25 border border-brand-secondary/40 rounded-lg p-3">
            <MaterialIcon
              icon="auto_fix_high"
              size="lg"
              className="text-brand-secondary"
            />
          </div>
          <div>
            <h2 className="text-2xl font-black text-white uppercase tracking-wide">
              Branding Studio
            </h2>
            <p className="text-sm text-gray-300 mt-1 max-w-3xl">
              Upload Word or PDF files to apply MH branding standards. The
              service adds MH brand identity, trust lines, and footer metadata
              while preserving the source document format.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-gray-800/50 rounded-xl border border-gray-700 p-6 space-y-4">
        <div className="flex flex-wrap gap-2 rounded-xl border border-gray-700 bg-gray-900/40 p-2">
          <button
            type="button"
            onClick={() => setActiveTab("upload")}
            className={`inline-flex items-center gap-2 rounded-lg px-4 py-2 text-xs font-black uppercase tracking-wide transition-colors ${
              activeTab === "upload"
                ? "bg-brand-primary text-white"
                : "text-gray-300 hover:bg-gray-700/60"
            }`}
          >
            <MaterialIcon icon="upload_file" size="sm" />
            Upload
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("standards")}
            className={`inline-flex items-center gap-2 rounded-lg px-4 py-2 text-xs font-black uppercase tracking-wide transition-colors ${
              activeTab === "standards"
                ? "bg-brand-primary text-white"
                : "text-gray-300 hover:bg-gray-700/60"
            }`}
          >
            <MaterialIcon icon="verified" size="sm" />
            Standards
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("results")}
            className={`inline-flex items-center gap-2 rounded-lg px-4 py-2 text-xs font-black uppercase tracking-wide transition-colors ${
              activeTab === "results"
                ? "bg-brand-primary text-white"
                : "text-gray-300 hover:bg-gray-700/60"
            }`}
          >
            <MaterialIcon icon="summarize" size="sm" />
            Results
            <span className="rounded-full bg-black/25 px-2 py-0.5 text-[10px]">
              {statusSummary.total}
            </span>
          </button>
        </div>

        <input
          ref={inputRef}
          type="file"
          className="hidden"
          accept={ACCEPT_ATTR}
          multiple
          onChange={(event) => {
            void onFileInput(event);
          }}
        />

        {tabContent}
      </section>
    </div>
  );
}
