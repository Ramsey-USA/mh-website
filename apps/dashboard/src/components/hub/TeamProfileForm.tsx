"use client";

/**
 * TeamProfileForm
 *
 * PWA questionnaire form that lets an authenticated admin update their
 * own team-page bio and profile fields. Loaded inside `/hub/profile`.
 *
 * Auth, fetching, and form-state mapping live in dedicated modules:
 *   - `@/hooks/useHubAdminAuth`     — refresh + role check + redirect
 *   - `@/lib/admin-auth/api`        — `hubFetch` bearer wrapper
 *   - `@/lib/hub/profile-mapping`   — pure form/payload conversion
 *
 * Keeping this component focused on rendering + user interaction.
 */

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { MaterialIcon } from "@/components/icons/MaterialIcon";
import {
  DashboardFormField,
  DashboardTextareaField,
} from "@/components/ui/forms/DashboardFormField";
import { HubFormSection } from "@/components/hub/HubFormSection";
import { SkillRatingInput } from "@/components/hub/SkillRatingInput";
import { useHubAdminAuth } from "@/hooks/useHubAdminAuth";
import { adminFetch as hubFetch } from "@/lib/admin-auth/api";
import {
  SKILL_FIELDS,
  formStateToPayload,
  memberToFormState,
  type ProfileFormState,
} from "@/lib/hub/profile-mapping";
import type { VintageTeamMember } from "@/lib/data/vintage-team";

// ─── Types ────────────────────────────────────────────────────────────────────

const HIGHLIGHT_SLOT_KEYS = [
  "highlight-1",
  "highlight-2",
  "highlight-3",
  "highlight-4",
  "highlight-5",
] as const;

const SPECIALTY_SLOT_KEYS = [
  "specialty-1",
  "specialty-2",
  "specialty-3",
  "specialty-4",
  "specialty-5",
  "specialty-6",
] as const;

type SubmissionStatus = "pending_approval" | "approved" | "rejected";
type SaveStatus = "idle" | "saving" | "saved" | "error";

interface ApiProfileResponse {
  success: boolean;
  data?: {
    profile: VintageTeamMember;
    hasOverride: boolean;
    lastUpdated: string | null;
    submissionStatus: SubmissionStatus | null;
    submittedAt: string | null;
    rejectionReason: string | null;
  };
  message?: string;
}

interface ProfileLoadState {
  profile: VintageTeamMember | null;
  form: ProfileFormState | null;
  submissionStatus: SubmissionStatus | null;
  submittedAt: string | null;
  rejectionReason: string | null;
  loadError: string | null;
  isLoading: boolean;
}

const INITIAL_LOAD_STATE: ProfileLoadState = {
  profile: null,
  form: null,
  submissionStatus: null,
  submittedAt: null,
  rejectionReason: null,
  loadError: null,
  isLoading: true,
};

// ─── Main Component ───────────────────────────────────────────────────────────

interface TeamProfileFormProps {
  readonly showBackToHubButton?: boolean;
  readonly onSaved?: () => void;
  readonly targetProfile?: {
    readonly slug: string;
    readonly fullName?: string;
    readonly roleTitle?: string;
    readonly department?: string;
    readonly employeeEmail?: string;
  };
  readonly onProfileLoaded?: (profile: VintageTeamMember) => void;
}

export function TeamProfileForm({
  showBackToHubButton = true,
  onSaved,
  targetProfile,
  onProfileLoaded,
}: TeamProfileFormProps) {
  const router = useRouter();
  const auth = useHubAdminAuth();
  const [load, setLoad] = useState<ProfileLoadState>(INITIAL_LOAD_STATE);
  const [saveStatus, setSaveStatus] = useState<SaveStatus>("idle");
  const [saveMessage, setSaveMessage] = useState("");

  // Load profile after we have a token
  useEffect(() => {
    if (auth.status !== "authenticated") return;
    let cancelled = false;

    async function loadProfile(token: string) {
      try {
        const params = new URLSearchParams();
        if (targetProfile?.slug) params.set("slug", targetProfile.slug);
        if (targetProfile?.fullName) {
          params.set("fullName", targetProfile.fullName);
        }
        if (targetProfile?.roleTitle) {
          params.set("roleTitle", targetProfile.roleTitle);
        }
        if (targetProfile?.department) {
          params.set("department", targetProfile.department);
        }
        if (targetProfile?.employeeEmail) {
          params.set("employeeEmail", targetProfile.employeeEmail);
        }
        const query = params.toString();
        const path = query ? `/api/team-profile?${query}` : "/api/team-profile";
        const res = await hubFetch(token, path);
        if (cancelled) return;

        if (res.status === 404) {
          setLoad({
            ...INITIAL_LOAD_STATE,
            isLoading: false,
            loadError:
              "Your account does not have a team profile. Contact an administrator.",
          });
          return;
        }

        if (!res.ok) {
          setLoad({
            ...INITIAL_LOAD_STATE,
            isLoading: false,
            loadError: "Failed to load profile. Please try again.",
          });
          return;
        }

        const data = (await res.json()) as ApiProfileResponse;
        if (cancelled) return;

        if (data.success && data.data) {
          onProfileLoaded?.(data.data.profile);
          setLoad({
            profile: data.data.profile,
            form: memberToFormState(data.data.profile),
            submissionStatus: data.data.submissionStatus ?? null,
            submittedAt: data.data.submittedAt ?? null,
            rejectionReason: data.data.rejectionReason ?? null,
            loadError: null,
            isLoading: false,
          });
        } else {
          setLoad({
            ...INITIAL_LOAD_STATE,
            isLoading: false,
            loadError: "Unexpected response from server.",
          });
        }
      } catch {
        if (cancelled) return;
        setLoad({
          ...INITIAL_LOAD_STATE,
          isLoading: false,
          loadError: "Network error. Please check your connection.",
        });
      }
    }

    void loadProfile(auth.token);
    return () => {
      cancelled = true;
    };
  }, [auth, onProfileLoaded, targetProfile]);

  // ─── Form mutators ─────────────────────────────────────────────────────────

  const updateForm = useCallback(
    (mutator: (prev: ProfileFormState) => ProfileFormState) => {
      setLoad((prev) =>
        prev.form ? { ...prev, form: mutator(prev.form) } : prev,
      );
      setSaveStatus((s) => (s === "idle" ? s : "idle"));
    },
    [],
  );

  const setField = useCallback(
    <K extends keyof ProfileFormState>(key: K, value: ProfileFormState[K]) => {
      updateForm((prev) => ({ ...prev, [key]: value }));
    },
    [updateForm],
  );

  const setArrayItem = useCallback(
    (
      field: "careerHighlights" | "specialties",
      index: number,
      value: string,
    ) => {
      updateForm((prev) => {
        const arr = [...prev[field]];
        arr[index] = value;
        return { ...prev, [field]: arr };
      });
    },
    [updateForm],
  );

  const setSkill = useCallback(
    (key: keyof ProfileFormState["skills"], value: string) => {
      updateForm((prev) => ({
        ...prev,
        skills: { ...prev.skills, [key]: value },
      }));
    },
    [updateForm],
  );

  const setCYS = useCallback(
    (key: keyof ProfileFormState["currentYearStats"], value: string) => {
      updateForm((prev) => ({
        ...prev,
        currentYearStats: { ...prev.currentYearStats, [key]: value },
      }));
    },
    [updateForm],
  );

  const setCS = useCallback(
    (key: keyof ProfileFormState["careerStats"], value: string) => {
      updateForm((prev) => ({
        ...prev,
        careerStats: { ...prev.careerStats, [key]: value },
      }));
    },
    [updateForm],
  );

  // ─── Save ──────────────────────────────────────────────────────────────────

  const handleSave = useCallback(async () => {
    if (!load.form || auth.status !== "authenticated") return;

    setSaveStatus("saving");
    setSaveMessage("");

    try {
      const res = await hubFetch(auth.token, "/api/team-profile", {
        method: "PUT",
        body: JSON.stringify({
          ...formStateToPayload(load.form),
          ...(targetProfile?.slug ? { slug: targetProfile.slug } : {}),
          ...(targetProfile?.fullName
            ? { fullName: targetProfile.fullName }
            : {}),
          ...(targetProfile?.roleTitle
            ? { roleTitle: targetProfile.roleTitle }
            : {}),
          ...(targetProfile?.department
            ? { department: targetProfile.department }
            : {}),
          ...(targetProfile?.employeeEmail
            ? { employeeEmail: targetProfile.employeeEmail }
            : {}),
        }),
      });

      const data = (await res.json()) as {
        success: boolean;
        message?: string;
        data?: { status?: SubmissionStatus };
      };

      if (res.ok && data.success) {
        setSaveStatus("saved");
        setSaveMessage(data.message ?? "Profile submitted successfully.");
        onSaved?.();
        if (data.data?.status) {
          setLoad((prev) => ({
            ...prev,
            submissionStatus: data.data?.status ?? prev.submissionStatus,
            submittedAt: new Date().toISOString(),
            rejectionReason:
              data.data?.status === "rejected" ? prev.rejectionReason : null,
          }));
        }
      } else {
        setSaveStatus("error");
        setSaveMessage(data.message ?? "Failed to save profile.");
      }
    } catch {
      setSaveStatus("error");
      setSaveMessage("Network error. Please try again.");
    }
  }, [auth, load.form, onSaved, targetProfile]);

  // ─── Loading / error states ────────────────────────────────────────────────

  if (auth.status !== "authenticated" || load.isLoading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="animate-spin h-8 w-8 border-4 border-brand-secondary border-t-transparent rounded-full" />
      </div>
    );
  }

  if (load.loadError || !load.form || !load.profile) {
    return (
      <div className="rounded-xl border border-red-700 bg-red-900/30 p-6 text-red-300">
        <MaterialIcon icon="error" size="md" className="mb-2" />
        <p>{load.loadError ?? "Profile could not be loaded."}</p>
      </div>
    );
  }

  // Snapshot for render — narrows union types for use inside JSX.
  const { form, profile, submissionStatus, submittedAt, rejectionReason } =
    load;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="rounded-xl border border-brand-primary/35 bg-brand-primary-darker/60 p-5">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-primary/20 text-brand-secondary">
            <MaterialIcon icon="badge" size="lg" />
          </div>
          <div>
            <h2 className="text-lg font-black text-white">{profile.name}</h2>
            <p className="text-sm text-brand-secondary-light/80">
              {profile.role}
            </p>
          </div>
          {auth.userName && (
            <span className="ml-auto rounded-full border border-brand-secondary/30 bg-brand-secondary/10 px-3 py-1 text-xs font-semibold text-brand-secondary">
              Logged in as {auth.userName}
            </span>
          )}
        </div>
      </div>

      {submissionStatus && saveStatus === "idle" && (
        <SubmissionStatusBanner
          status={submissionStatus}
          submittedAt={submittedAt}
          rejectionReason={rejectionReason}
        />
      )}

      {saveStatus !== "idle" && (
        <SaveStatusBanner status={saveStatus} message={saveMessage} />
      )}

      {/* Section: Personal Info */}
      <HubFormSection icon="person" label="Personal Information">
        <div className="grid gap-4 sm:grid-cols-2">
          <DashboardFormField
            label="Nickname / Role Tag"
            placeholder="e.g., Communications and Safety Lead"
            value={form.nickname}
            onChange={(e) => setField("nickname", e.target.value)}
            maxLength={80}
          />
          <DashboardFormField
            label="Years with Company"
            type="number"
            min={0}
            max={60}
            placeholder="e.g., 3"
            value={form.yearsWithCompany}
            onChange={(e) => setField("yearsWithCompany", e.target.value)}
          />
          <DashboardFormField
            label="Hometown"
            placeholder="e.g., Richland, WA"
            value={form.hometown}
            onChange={(e) => setField("hometown", e.target.value)}
            maxLength={100}
          />
          <DashboardFormField
            label="Education"
            placeholder="e.g., BAS Operations Management"
            value={form.education}
            onChange={(e) => setField("education", e.target.value)}
            maxLength={200}
          />
        </div>
      </HubFormSection>

      {/* Section: Bio & Narrative */}
      <HubFormSection icon="article" label="Bio & Narrative">
        <DashboardTextareaField
          label="Professional Bio"
          isRequired
          rows={5}
          placeholder="Write a 2–4 sentence professional bio that will appear on the team page…"
          value={form.bio}
          onChange={(e) => setField("bio", e.target.value)}
          maxLength={1200}
        />
        <p className="text-xs text-brand-secondary-light/70">
          {form.bio.length}/1200 characters
        </p>
        <DashboardFormField
          label="Fun Fact"
          placeholder="An interesting personal detail…"
          value={form.funFact}
          onChange={(e) => setField("funFact", e.target.value)}
          maxLength={200}
        />
      </HubFormSection>

      {/* Section: Career Highlights */}
      <HubFormSection
        icon="star"
        label="Career Highlights"
        description="Enter up to 5 career highlights — one per line."
      >
        {form.careerHighlights.map((highlight, i) => (
          <DashboardFormField
            key={HIGHLIGHT_SLOT_KEYS[i]}
            label={`Highlight ${i + 1}`}
            placeholder={`Career highlight ${i + 1}…`}
            value={highlight}
            onChange={(e) =>
              setArrayItem("careerHighlights", i, e.target.value)
            }
            maxLength={200}
          />
        ))}
      </HubFormSection>

      {/* Section: Specialties */}
      <HubFormSection
        icon="construction"
        label="Specialty Areas"
        description="Enter up to 6 specialty areas shown on your profile card."
      >
        <div className="grid gap-3 sm:grid-cols-2">
          {form.specialties.map((spec, i) => (
            <DashboardFormField
              key={SPECIALTY_SLOT_KEYS[i]}
              label={`Specialty ${i + 1}`}
              placeholder={`Specialty area ${i + 1}…`}
              value={spec}
              onChange={(e) => setArrayItem("specialties", i, e.target.value)}
              maxLength={80}
            />
          ))}
        </div>
      </HubFormSection>

      {/* Section: Credentials */}
      <HubFormSection icon="verified" label="Credentials & Interests">
        <DashboardFormField
          label="Certifications & Licenses"
          placeholder="e.g., OSHA 30, CPR, Google Ads, Procore Certified"
          value={form.certifications}
          onChange={(e) => setField("certifications", e.target.value)}
          maxLength={300}
        />
        <DashboardFormField
          label="Hobbies"
          placeholder="e.g., Camping, Hunting, Fishing"
          value={form.hobbies}
          onChange={(e) => setField("hobbies", e.target.value)}
          maxLength={200}
        />
        <DashboardFormField
          label="Special Interests"
          placeholder="e.g., Project Support and Digital Asset Management"
          value={form.specialInterests}
          onChange={(e) => setField("specialInterests", e.target.value)}
          maxLength={200}
        />
      </HubFormSection>

      {/* Section: Skills */}
      <HubFormSection
        icon="insights"
        label="Skill Ratings (0–100)"
        description="Rate each skill from 0 to 100. These populate your profile radar chart."
      >
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {SKILL_FIELDS.map(({ key, label }) => (
            <SkillRatingInput
              key={key}
              label={label}
              value={form.skills[key]}
              onChange={(v) => setSkill(key, v)}
            />
          ))}
        </div>
      </HubFormSection>

      {/* Section: Current Year Stats */}
      <HubFormSection icon="trending_up" label="Current Year Performance">
        <div className="grid gap-4 sm:grid-cols-2">
          <DashboardFormField
            label="Projects Completed"
            type="number"
            min={0}
            value={form.currentYearStats.projectsCompleted}
            onChange={(e) => setCYS("projectsCompleted", e.target.value)}
          />
          <DashboardFormField
            label="Client Satisfaction (%)"
            type="number"
            min={0}
            max={100}
            value={form.currentYearStats.clientSatisfaction}
            onChange={(e) => setCYS("clientSatisfaction", e.target.value)}
          />
          <DashboardFormField
            label="Safety Record"
            placeholder="e.g., EXCELLENT"
            value={form.currentYearStats.safetyRecord}
            onChange={(e) => setCYS("safetyRecord", e.target.value)}
            maxLength={50}
          />
          <DashboardFormField
            label="Team Collaborations"
            type="number"
            min={0}
            value={form.currentYearStats.teamCollaborations}
            onChange={(e) => setCYS("teamCollaborations", e.target.value)}
          />
        </div>
      </HubFormSection>

      {/* Section: Career Totals */}
      <HubFormSection icon="military_tech" label="Career Totals">
        <div className="grid gap-4 sm:grid-cols-2">
          <DashboardFormField
            label="Total Projects"
            type="number"
            min={0}
            value={form.careerStats.totalProjects}
            onChange={(e) => setCS("totalProjects", e.target.value)}
          />
          <DashboardFormField
            label="Years Experience"
            type="number"
            min={0}
            value={form.careerStats.yearsExperience}
            onChange={(e) => setCS("yearsExperience", e.target.value)}
          />
          <DashboardFormField
            label="Specialty Areas"
            type="number"
            min={0}
            value={form.careerStats.specialtyAreas}
            onChange={(e) => setCS("specialtyAreas", e.target.value)}
          />
          <DashboardFormField
            label="Mentorships"
            type="number"
            min={0}
            value={form.careerStats.mentorships}
            onChange={(e) => setCS("mentorships", e.target.value)}
          />
        </div>
      </HubFormSection>

      {/* Save button */}
      <div className="flex items-center justify-between gap-4 pb-8">
        {showBackToHubButton ? (
          <button
            type="button"
            onClick={() => router.push("/hub")}
            className="rounded-lg border border-brand-primary/45 px-4 py-2 text-sm font-semibold text-brand-secondary-light/80 transition hover:border-brand-secondary/60 hover:text-white"
          >
            ← Back to Hub
          </button>
        ) : (
          <span />
        )}
        <button
          type="button"
          disabled={saveStatus === "saving"}
          onClick={() => void handleSave()}
          className="flex items-center gap-2 rounded-xl bg-brand-primary px-6 py-3 text-sm font-black text-white shadow-lg transition hover:bg-brand-primary-dark disabled:opacity-60"
        >
          {saveStatus === "saving" ? (
            <>
              <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
              Saving…
            </>
          ) : (
            <>
              <MaterialIcon icon="send" size="sm" />
              {submissionStatus === "rejected"
                ? "Resubmit Profile"
                : "Submit for Review"}
            </>
          )}
        </button>
      </div>
    </div>
  );
}

// ─── Status banners (private) ────────────────────────────────────────────────

interface SubmissionStatusBannerProps {
  readonly status: SubmissionStatus;
  readonly submittedAt: string | null;
  readonly rejectionReason: string | null;
}

const SUBMISSION_STATUS_STYLES: Record<SubmissionStatus, string> = {
  approved: "border-green-600 bg-green-900/30 text-green-300",
  rejected: "border-red-600 bg-red-900/30 text-red-300",
  pending_approval: "border-yellow-600 bg-yellow-900/30 text-yellow-300",
};

const SUBMISSION_STATUS_ICONS: Record<SubmissionStatus, string> = {
  approved: "check_circle",
  rejected: "cancel",
  pending_approval: "hourglass_empty",
};

function SubmissionStatusBanner({
  status,
  submittedAt,
  rejectionReason,
}: SubmissionStatusBannerProps) {
  const styles = SUBMISSION_STATUS_STYLES[status];
  const icon = SUBMISSION_STATUS_ICONS[status];

  return (
    <div className={`rounded-lg border px-4 py-3 text-sm ${styles}`}>
      <div className="flex items-start gap-2">
        <MaterialIcon icon={icon} size="sm" className="mt-0.5 shrink-0" />
        <div>
          {status === "approved" && (
            <p className="font-semibold">Profile approved and live!</p>
          )}
          {status === "pending_approval" && (
            <>
              <p className="font-semibold">Awaiting approval</p>
              <p className="text-xs opacity-80 mt-0.5">
                Your profile has been submitted and is pending review by Matt.
                It will appear on the team page once approved.
                {submittedAt && (
                  <> Submitted {new Date(submittedAt).toLocaleDateString()}.</>
                )}
              </p>
            </>
          )}
          {status === "rejected" && (
            <>
              <p className="font-semibold">Submission not approved</p>
              {rejectionReason && (
                <p className="text-xs opacity-80 mt-0.5">
                  Reason: {rejectionReason}
                </p>
              )}
              <p className="text-xs opacity-80 mt-1">
                Please update your profile and resubmit.
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

interface SaveStatusBannerProps {
  readonly status: SaveStatus;
  readonly message: string;
}

const SAVE_STATUS_STYLES: Record<SaveStatus, string> = {
  idle: "border-brand-secondary/40 bg-brand-secondary/10 text-brand-secondary",
  saving:
    "border-brand-secondary/40 bg-brand-secondary/10 text-brand-secondary",
  saved: "border-green-600 bg-green-900/30 text-green-300",
  error: "border-red-600 bg-red-900/30 text-red-300",
};

function SaveStatusBanner({ status, message }: SaveStatusBannerProps) {
  const styles = SAVE_STATUS_STYLES[status];

  return (
    <div
      className={`rounded-lg border px-4 py-3 text-sm font-medium ${styles}`}
    >
      <div className="flex items-center gap-2">
        {status === "saving" && (
          <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
        )}
        {status === "saved" && <MaterialIcon icon="check_circle" size="sm" />}
        {status === "error" && <MaterialIcon icon="error" size="sm" />}
        {message || (status === "saving" ? "Saving…" : "")}
      </div>
    </div>
  );
}
