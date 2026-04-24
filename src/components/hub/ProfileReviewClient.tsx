"use client";

/**
 * ProfileReviewClient
 *
 * Matt's approval queue for team profile submissions.
 * Lists pending submissions and allows approve / reject actions.
 * Only accessible to the admin with email matt@mhc-gc.com — the API
 * enforces this; the client also redirects if the user isn't an admin.
 */

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { MaterialIcon } from "@/components/icons/MaterialIcon";
import { DASHBOARD_SECTION_HEADER_CLASS } from "@/components/ui/forms/DashboardFormField";

// ─── Types ────────────────────────────────────────────────────────────────────

interface PendingSubmission {
  slug: string;
  name: string;
  role: string;
  submittedAt: string | null;
  bio: string | null;
  funFact: string | null;
  certifications: string | null;
  hobbies: string | null;
  specialInterests: string | null;
  hometown: string | null;
  education: string | null;
  nickname: string | null;
  yearsWithCompany: number | null;
  careerHighlights: string[] | undefined;
  specialties: string[] | undefined;
  skills: Record<string, number> | undefined;
}

type ReviewAction = "approve" | "reject";

interface ReviewState {
  action: ReviewAction | null;
  rejectionReason: string;
  status: "idle" | "submitting" | "done" | "error";
  message: string;
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function formatDate(iso: string | null) {
  if (!iso) return "Unknown";
  return new Date(iso).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function FieldRow({
  label,
  value,
}: {
  label: string;
  value: string | number | null | undefined;
}) {
  if (value == null || value === "") return null;
  return (
    <div>
      <dt className="text-xs font-semibold uppercase text-gray-500">{label}</dt>
      <dd className="mt-0.5 text-sm text-gray-200">{String(value)}</dd>
    </div>
  );
}

// ─── Single submission card ───────────────────────────────────────────────────

function SubmissionCard({
  submission,
  token,
  onReviewed,
}: {
  submission: PendingSubmission;
  token: string;
  onReviewed: (slug: string) => void;
}) {
  const [review, setReview] = useState<ReviewState>({
    action: null,
    rejectionReason: "",
    status: "idle",
    message: "",
  });
  const [expanded, setExpanded] = useState(false);

  const handleDecision = useCallback(
    async (action: ReviewAction) => {
      if (action === "reject" && !review.rejectionReason.trim()) {
        setReview((r) => ({
          ...r,
          status: "error",
          message: "Please provide a reason for rejection.",
        }));
        return;
      }

      setReview((r) => ({ ...r, action, status: "submitting", message: "" }));

      try {
        const res = await fetch("/api/team-profile/review", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            slug: submission.slug,
            action,
            rejectionReason: review.rejectionReason || undefined,
          }),
        });

        const data = (await res.json()) as {
          success: boolean;
          message?: string;
        };

        if (res.ok && data.success) {
          setReview((r) => ({
            ...r,
            status: "done",
            message: data.message ?? "Decision recorded.",
          }));
          // Remove card from the list after a short delay
          setTimeout(() => onReviewed(submission.slug), 1800);
        } else {
          setReview((r) => ({
            ...r,
            status: "error",
            message: data.message ?? "Failed to process decision.",
          }));
        }
      } catch {
        setReview((r) => ({
          ...r,
          status: "error",
          message: "Network error. Please try again.",
        }));
      }
    },
    [review.rejectionReason, token, submission.slug, onReviewed],
  );

  const isSubmitting = review.status === "submitting";
  const isDone = review.status === "done";

  return (
    <div
      className={`rounded-xl border bg-gray-800/60 p-5 space-y-4 transition-opacity ${
        isDone ? "opacity-50" : ""
      } ${
        review.action === "approve"
          ? "border-green-600"
          : review.action === "reject"
            ? "border-red-600"
            : "border-gray-700"
      }`}
    >
      {/* Card header */}
      <div className="flex items-center justify-between gap-3">
        <div>
          <h3 className="text-base font-black text-white">{submission.name}</h3>
          <p className="text-sm text-gray-400">{submission.role}</p>
        </div>
        <div className="text-right">
          <span className="rounded-full border border-yellow-600 bg-yellow-900/30 px-3 py-1 text-xs font-semibold text-yellow-300">
            Pending Approval
          </span>
          <p className="mt-1 text-xs text-gray-500">
            Submitted {formatDate(submission.submittedAt)}
          </p>
        </div>
      </div>

      {/* Expandable content preview */}
      <button
        type="button"
        onClick={() => setExpanded((v) => !v)}
        className="flex w-full items-center justify-between text-xs font-semibold uppercase text-gray-500 hover:text-gray-300 transition"
      >
        <span>Preview Changes</span>
        <MaterialIcon
          icon={expanded ? "expand_less" : "expand_more"}
          size="sm"
        />
      </button>

      {expanded && (
        <dl className="grid gap-3 sm:grid-cols-2 rounded-lg border border-gray-700 bg-gray-900/40 p-4">
          <FieldRow label="Bio" value={submission.bio} />
          <FieldRow label="Fun Fact" value={submission.funFact} />
          <FieldRow label="Nickname" value={submission.nickname} />
          <FieldRow
            label="Years with Company"
            value={submission.yearsWithCompany}
          />
          <FieldRow label="Hometown" value={submission.hometown} />
          <FieldRow label="Education" value={submission.education} />
          <FieldRow label="Certifications" value={submission.certifications} />
          <FieldRow label="Hobbies" value={submission.hobbies} />
          <FieldRow
            label="Special Interests"
            value={submission.specialInterests}
          />
          {submission.careerHighlights &&
            submission.careerHighlights.length > 0 && (
              <div className="sm:col-span-2">
                <dt className="text-xs font-semibold uppercase text-gray-500">
                  Career Highlights
                </dt>
                <dd className="mt-0.5">
                  <ul className="list-disc pl-4 space-y-0.5">
                    {submission.careerHighlights.map((h, i) => (
                      <li key={i} className="text-sm text-gray-200">
                        {h}
                      </li>
                    ))}
                  </ul>
                </dd>
              </div>
            )}
          {submission.specialties && submission.specialties.length > 0 && (
            <div>
              <dt className="text-xs font-semibold uppercase text-gray-500">
                Specialties
              </dt>
              <dd className="mt-0.5 flex flex-wrap gap-1">
                {submission.specialties.map((s, i) => (
                  <span
                    key={i}
                    className="rounded-full border border-gray-600 bg-gray-700 px-2 py-0.5 text-xs text-gray-200"
                  >
                    {s}
                  </span>
                ))}
              </dd>
            </div>
          )}
          {submission.skills && (
            <div className="sm:col-span-2">
              <dt className="text-xs font-semibold uppercase text-gray-500 mb-1">
                Skills
              </dt>
              <dd className="grid grid-cols-2 gap-1">
                {Object.entries(submission.skills).map(([k, v]) => (
                  <div key={k} className="flex items-center gap-2">
                    <div
                      className="h-1.5 rounded-full bg-brand-secondary"
                      style={{ width: `${v}%`, maxWidth: "80px" }}
                    />
                    <span className="text-xs text-gray-400 capitalize">
                      {k}: <strong className="text-white">{v}</strong>
                    </span>
                  </div>
                ))}
              </dd>
            </div>
          )}
        </dl>
      )}

      {/* Status messages */}
      {review.message && (
        <div
          className={`rounded-lg border px-3 py-2 text-sm font-medium ${
            review.status === "done"
              ? review.action === "approve"
                ? "border-green-600 bg-green-900/30 text-green-300"
                : "border-gray-600 bg-gray-700/30 text-gray-300"
              : "border-red-600 bg-red-900/30 text-red-300"
          }`}
        >
          {review.message}
        </div>
      )}

      {/* Rejection reason input */}
      {!isDone && (
        <div>
          <label className="text-xs font-semibold uppercase text-gray-500 mb-1 block">
            Rejection Reason (required if rejecting)
          </label>
          <textarea
            rows={2}
            placeholder="Explain why this submission needs changes…"
            value={review.rejectionReason}
            onChange={(e) =>
              setReview((r) => ({ ...r, rejectionReason: e.target.value }))
            }
            maxLength={500}
            className="w-full px-3 py-2 bg-gray-700/60 border border-gray-600 rounded-lg text-sm text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-secondary/50 focus:border-brand-secondary resize-none"
          />
        </div>
      )}

      {/* Action buttons */}
      {!isDone && (
        <div className="flex items-center gap-3 pt-1">
          <button
            type="button"
            disabled={isSubmitting}
            onClick={() => void handleDecision("approve")}
            className="flex items-center gap-2 rounded-xl bg-green-700 px-5 py-2.5 text-sm font-black text-white shadow transition hover:bg-green-600 disabled:opacity-60"
          >
            {isSubmitting && review.action === "approve" ? (
              <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
            ) : (
              <MaterialIcon icon="check_circle" size="sm" />
            )}
            Approve
          </button>
          <button
            type="button"
            disabled={isSubmitting}
            onClick={() => void handleDecision("reject")}
            className="flex items-center gap-2 rounded-xl border border-red-600 px-5 py-2.5 text-sm font-black text-red-400 transition hover:bg-red-900/30 disabled:opacity-60"
          >
            {isSubmitting && review.action === "reject" ? (
              <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
            ) : (
              <MaterialIcon icon="cancel" size="sm" />
            )}
            Reject
          </button>
        </div>
      )}
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export function ProfileReviewClient() {
  const router = useRouter();
  const [token, setToken] = useState<string | null>(null);
  const [submissions, setSubmissions] = useState<PendingSubmission[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);

  useEffect(() => {
    async function bootstrap() {
      try {
        const refreshRes = await fetch("/api/auth/refresh", {
          method: "POST",
          credentials: "include",
        });

        if (!refreshRes.ok) {
          router.push("/");
          return;
        }

        const refreshData = (await refreshRes.json()) as {
          accessToken?: string;
          user?: { role?: string };
        };

        if (!refreshData.accessToken || refreshData.user?.role !== "admin") {
          router.push("/");
          return;
        }

        setToken(refreshData.accessToken);

        const reviewRes = await fetch("/api/team-profile/review", {
          headers: { Authorization: `Bearer ${refreshData.accessToken}` },
        });

        if (reviewRes.status === 403) {
          setLoadError(
            "Access denied. Only the designated approver can access this page.",
          );
          setIsLoading(false);
          return;
        }

        if (!reviewRes.ok) {
          setLoadError("Failed to load submissions. Please try again.");
          setIsLoading(false);
          return;
        }

        const data = (await reviewRes.json()) as {
          success: boolean;
          data?: { submissions: PendingSubmission[] };
        };

        if (data.success && data.data) {
          setSubmissions(data.data.submissions);
        }
      } catch {
        setLoadError("Network error. Please check your connection.");
      } finally {
        setIsLoading(false);
      }
    }

    void bootstrap();
  }, [router]);

  const handleReviewed = useCallback((slug: string) => {
    setSubmissions((prev) => prev.filter((s) => s.slug !== slug));
  }, []);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="animate-spin h-8 w-8 border-4 border-brand-secondary border-t-transparent rounded-full" />
      </div>
    );
  }

  if (loadError) {
    return (
      <div className="rounded-xl border border-red-700 bg-red-900/30 p-6 text-red-300">
        <MaterialIcon icon="error" size="md" className="mb-2" />
        <p>{loadError}</p>
        <button
          type="button"
          onClick={() => router.push("/hub")}
          className="mt-4 rounded-lg border border-red-600 px-4 py-2 text-sm font-semibold text-red-300 transition hover:border-red-400"
        >
          ← Back to Hub
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Summary bar */}
      <div className="flex items-center justify-between">
        <div>
          <span className={DASHBOARD_SECTION_HEADER_CLASS}>
            Pending Submissions
          </span>
          <span className="ml-3 rounded-full bg-yellow-900/50 border border-yellow-600 px-2.5 py-0.5 text-xs font-bold text-yellow-300">
            {submissions.length}
          </span>
        </div>
        <button
          type="button"
          onClick={() => router.push("/hub")}
          className="rounded-lg border border-gray-600 px-4 py-2 text-sm font-semibold text-gray-300 transition hover:border-gray-400 hover:text-white"
        >
          ← Back to Hub
        </button>
      </div>

      {/* Empty state */}
      {submissions.length === 0 && (
        <div className="rounded-xl border border-gray-700 bg-gray-800/30 p-12 text-center text-gray-500">
          <MaterialIcon icon="check_circle" size="lg" className="mb-3 text-green-500" />
          <p className="text-base font-semibold text-gray-300">
            All caught up!
          </p>
          <p className="text-sm mt-1">No pending profile submissions.</p>
        </div>
      )}

      {/* Submission cards */}
      {token &&
        submissions.map((s) => (
          <SubmissionCard
            key={s.slug}
            submission={s}
            token={token}
            onReviewed={handleReviewed}
          />
        ))}
    </div>
  );
}
