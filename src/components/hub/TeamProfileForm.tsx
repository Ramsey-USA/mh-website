"use client";

/**
 * TeamProfileForm
 *
 * PWA questionnaire form that lets an authenticated admin update their
 * own team-page bio and profile fields.  Loaded inside /hub/profile.
 */

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { MaterialIcon } from "@/components/icons/MaterialIcon";
import {
  DashboardFormField,
  DashboardTextareaField,
  DASHBOARD_LABEL_CLASS,
  DASHBOARD_INPUT_CLASS,
  DASHBOARD_SECTION_HEADER_CLASS,
} from "@/components/ui/forms/DashboardFormField";
import type { VintageTeamMember } from "@/lib/data/vintage-team";

// ─── Types ────────────────────────────────────────────────────────────────────

interface ApiProfileResponse {
  success: boolean;
  data?: {
    profile: VintageTeamMember;
    hasOverride: boolean;
    lastUpdated: string | null;
    submissionStatus: "pending_approval" | "approved" | "rejected" | null;
    submittedAt: string | null;
    rejectionReason: string | null;
  };
  message?: string;
}

interface SkillField {
  key: keyof VintageTeamMember["skills"];
  label: string;
}

const SKILL_FIELDS: SkillField[] = [
  { key: "leadership", label: "Leadership" },
  { key: "technical", label: "Technical" },
  { key: "communication", label: "Communication" },
  { key: "safety", label: "Safety" },
  { key: "problemSolving", label: "Problem Solving" },
  { key: "teamwork", label: "Teamwork" },
  { key: "organization", label: "Organization" },
  { key: "innovation", label: "Innovation" },
  { key: "passion", label: "Passion" },
  { key: "continuingEducation", label: "Continuing Education" },
];

// ─── Form state type ──────────────────────────────────────────────────────────

interface FormState {
  bio: string;
  funFact: string;
  certifications: string;
  hobbies: string;
  specialInterests: string;
  hometown: string;
  education: string;
  nickname: string;
  yearsWithCompany: string;
  careerHighlights: string[]; // up to 5 items
  specialties: string[]; // up to 6 items
  skills: Record<keyof VintageTeamMember["skills"], string>;
  currentYearStats: {
    projectsCompleted: string;
    clientSatisfaction: string;
    safetyRecord: string;
    teamCollaborations: string;
  };
  careerStats: {
    totalProjects: string;
    yearsExperience: string;
    specialtyAreas: string;
    mentorships: string;
  };
}

function memberToFormState(member: VintageTeamMember): FormState {
  return {
    bio: member.bio ?? "",
    funFact: member.funFact ?? "",
    certifications: member.certifications ?? "",
    hobbies: member.hobbies ?? "",
    specialInterests: member.specialInterests ?? "",
    hometown: member.hometown ?? "",
    education: member.education ?? "",
    nickname: member.nickname ?? "",
    yearsWithCompany: String(member.yearsWithCompany ?? ""),
    careerHighlights: [
      ...member.careerHighlights,
      "", "", "", "", "",
    ].slice(0, 5),
    specialties: [
      ...member.specialties,
      "", "", "", "", "", "",
    ].slice(0, 6),
    skills: {
      leadership: String(member.skills.leadership),
      technical: String(member.skills.technical),
      communication: String(member.skills.communication),
      safety: String(member.skills.safety),
      problemSolving: String(member.skills.problemSolving),
      teamwork: String(member.skills.teamwork),
      organization: String(member.skills.organization),
      innovation: String(member.skills.innovation),
      passion: String(member.skills.passion),
      continuingEducation: String(member.skills.continuingEducation),
    },
    currentYearStats: {
      projectsCompleted: String(member.currentYearStats.projectsCompleted),
      clientSatisfaction: String(member.currentYearStats.clientSatisfaction),
      safetyRecord: member.currentYearStats.safetyRecord,
      teamCollaborations: String(member.currentYearStats.teamCollaborations),
    },
    careerStats: {
      totalProjects: String(member.careerStats.totalProjects),
      yearsExperience: String(member.careerStats.yearsExperience),
      specialtyAreas: String(member.careerStats.specialtyAreas),
      mentorships: String(member.careerStats.mentorships),
    },
  };
}

function formStateToPayload(form: FormState): Record<string, unknown> {
  const payload: Record<string, unknown> = {
    bio: form.bio.trim() || undefined,
    funFact: form.funFact.trim() || undefined,
    certifications: form.certifications.trim() || undefined,
    hobbies: form.hobbies.trim() || undefined,
    specialInterests: form.specialInterests.trim() || undefined,
    hometown: form.hometown.trim() || undefined,
    education: form.education.trim() || undefined,
    nickname: form.nickname.trim() || undefined,
  };

  const years = parseInt(form.yearsWithCompany, 10);
  if (!isNaN(years)) payload["yearsWithCompany"] = years;

  const highlights = form.careerHighlights.filter((h) => h.trim());
  if (highlights.length > 0) payload["careerHighlights"] = highlights;

  const specialties = form.specialties.filter((s) => s.trim());
  if (specialties.length > 0) payload["specialties"] = specialties;

  const skills: Record<string, number> = {};
  let hasSkills = false;
  for (const { key } of SKILL_FIELDS) {
    const n = parseInt(form.skills[key], 10);
    if (!isNaN(n)) {
      skills[key] = Math.min(100, Math.max(0, n));
      hasSkills = true;
    }
  }
  if (hasSkills) payload["skills"] = skills;

  const cys: Record<string, unknown> = {};
  const p = parseInt(form.currentYearStats.projectsCompleted, 10);
  const cs = parseInt(form.currentYearStats.clientSatisfaction, 10);
  const tc = parseInt(form.currentYearStats.teamCollaborations, 10);
  if (!isNaN(p)) cys["projectsCompleted"] = p;
  if (!isNaN(cs)) cys["clientSatisfaction"] = cs;
  if (!isNaN(tc)) cys["teamCollaborations"] = tc;
  if (form.currentYearStats.safetyRecord.trim()) {cys["safetyRecord"] = form.currentYearStats.safetyRecord.trim();}
  if (Object.keys(cys).length > 0) payload["currentYearStats"] = cys;

  const cs2: Record<string, number> = {};
  const tp = parseInt(form.careerStats.totalProjects, 10);
  const ye = parseInt(form.careerStats.yearsExperience, 10);
  const sa = parseInt(form.careerStats.specialtyAreas, 10);
  const me = parseInt(form.careerStats.mentorships, 10);
  if (!isNaN(tp)) cs2["totalProjects"] = tp;
  if (!isNaN(ye)) cs2["yearsExperience"] = ye;
  if (!isNaN(sa)) cs2["specialtyAreas"] = sa;
  if (!isNaN(me)) cs2["mentorships"] = me;
  if (Object.keys(cs2).length > 0) payload["careerStats"] = cs2;

  return payload;
}

// ─── Section heading ──────────────────────────────────────────────────────────

function SectionHeading({ icon, label }: { icon: string; label: string }) {
  return (
    <div className="flex items-center gap-2 border-b border-gray-700 pb-2 mb-4">
      <MaterialIcon icon={icon} size="sm" className="text-brand-secondary" />
      <span className={DASHBOARD_SECTION_HEADER_CLASS}>{label}</span>
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export function TeamProfileForm() {
  const router = useRouter();
  const [token, setToken] = useState<string | null>(null);
  const [userName, setUserName] = useState("");
  const [profile, setProfile] = useState<VintageTeamMember | null>(null);
  const [form, setForm] = useState<FormState | null>(null);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [saveStatus, setSaveStatus] = useState<
    "idle" | "saving" | "saved" | "error"
  >("idle");
  const [saveMessage, setSaveMessage] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  // Submission approval state
  const [submissionStatus, setSubmissionStatus] = useState<
    "pending_approval" | "approved" | "rejected" | null
  >(null);
  const [submittedAt, setSubmittedAt] = useState<string | null>(null);
  const [rejectionReason, setRejectionReason] = useState<string | null>(null);

  // Bootstrap auth + load profile
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

        const refreshData = await refreshRes.json() as {
          accessToken?: string;
          user?: { name?: string; role?: string };
        };

        if (!refreshData.accessToken || refreshData.user?.role !== "admin") {
          router.push("/");
          return;
        }

        setToken(refreshData.accessToken);
        setUserName(refreshData.user?.name ?? "");

        // Load the profile
        const profileRes = await fetch("/api/team-profile", {
          headers: { Authorization: `Bearer ${refreshData.accessToken}` },
        });

        if (profileRes.status === 404) {
          setLoadError(
            "Your account does not have a team profile. Contact an administrator.",
          );
          setIsLoading(false);
          return;
        }

        if (!profileRes.ok) {
          setLoadError("Failed to load profile. Please try again.");
          setIsLoading(false);
          return;
        }

        const profileData = await profileRes.json() as ApiProfileResponse;
        if (profileData.success && profileData.data) {
          setProfile(profileData.data.profile);
          setForm(memberToFormState(profileData.data.profile));
          setSubmissionStatus(profileData.data.submissionStatus ?? null);
          setSubmittedAt(profileData.data.submittedAt ?? null);
          setRejectionReason(profileData.data.rejectionReason ?? null);
        } else {
          setLoadError("Unexpected response from server.");
        }
      } catch {
        setLoadError("Network error. Please check your connection.");
      } finally {
        setIsLoading(false);
      }
    }

    void bootstrap();
  }, [router]);

  const handleSave = useCallback(async () => {
    if (!form || !token) return;

    setSaveStatus("saving");
    setSaveMessage("");

    try {
      const payload = formStateToPayload(form);
      const res = await fetch("/api/team-profile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json() as {
        success: boolean;
        message?: string;
        data?: { status?: "pending_approval" | "approved" | "rejected" };
      };

      if (res.ok && data.success) {
        setSaveStatus("saved");
        setSaveMessage(
          data.message ?? "Profile submitted successfully.",
        );
        // Reflect new submission status from the server response
        if (data.data?.status) {
          setSubmissionStatus(data.data.status);
          setSubmittedAt(new Date().toISOString());
          if (data.data.status !== "rejected") setRejectionReason(null);
        }
      } else {
        setSaveStatus("error");
        setSaveMessage(data.message ?? "Failed to save profile.");
      }
    } catch {
      setSaveStatus("error");
      setSaveMessage("Network error. Please try again.");
    }
  }, [form, token]);

  // ─── Loading / error states ────────────────────────────────────────────────

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="animate-spin h-8 w-8 border-4 border-brand-secondary border-t-transparent rounded-full" />
      </div>
    );
  }

  if (loadError || !form || !profile) {
    return (
      <div className="rounded-xl border border-red-700 bg-red-900/30 p-6 text-red-300">
        <MaterialIcon icon="error" size="md" className="mb-2" />
        <p>{loadError ?? "Profile could not be loaded."}</p>
      </div>
    );
  }

  // ─── Helpers ──────────────────────────────────────────────────────────────

  function setField<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((prev) => (prev ? { ...prev, [key]: value } : prev));
    if (saveStatus !== "idle") setSaveStatus("idle");
  }

  function setArrayItem(
    field: "careerHighlights" | "specialties",
    index: number,
    value: string,
  ) {
    setForm((prev) => {
      if (!prev) return prev;
      const arr = [...prev[field]];
      arr[index] = value;
      return { ...prev, [field]: arr };
    });
    if (saveStatus !== "idle") setSaveStatus("idle");
  }

  function setSkill(key: keyof VintageTeamMember["skills"], value: string) {
    setForm((prev) =>
      prev ? { ...prev, skills: { ...prev.skills, [key]: value } } : prev,
    );
    if (saveStatus !== "idle") setSaveStatus("idle");
  }

  function setCYS(
    key: keyof FormState["currentYearStats"],
    value: string,
  ) {
    setForm((prev) =>
      prev
        ? { ...prev, currentYearStats: { ...prev.currentYearStats, [key]: value } }
        : prev,
    );
    if (saveStatus !== "idle") setSaveStatus("idle");
  }

  function setCS(key: keyof FormState["careerStats"], value: string) {
    setForm((prev) =>
      prev
        ? { ...prev, careerStats: { ...prev.careerStats, [key]: value } }
        : prev,
    );
    if (saveStatus !== "idle") setSaveStatus("idle");
  }

  // ─── Render ────────────────────────────────────────────────────────────────

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="rounded-xl border border-gray-700 bg-gray-800/60 p-5">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-primary/20 text-brand-secondary">
            <MaterialIcon icon="badge" size="lg" />
          </div>
          <div>
            <h2 className="text-lg font-black text-white">
              {profile.name}
            </h2>
            <p className="text-sm text-gray-400">{profile.role}</p>
          </div>
          {userName && (
            <span className="ml-auto rounded-full border border-brand-secondary/30 bg-brand-secondary/10 px-3 py-1 text-xs font-semibold text-brand-secondary">
              Logged in as {userName}
            </span>
          )}
        </div>
      </div>

      {/* Submission approval status banner */}
      {submissionStatus && saveStatus === "idle" && (
        <div
          className={`rounded-lg border px-4 py-3 text-sm ${
            submissionStatus === "approved"
              ? "border-green-600 bg-green-900/30 text-green-300"
              : submissionStatus === "rejected"
                ? "border-red-600 bg-red-900/30 text-red-300"
                : "border-yellow-600 bg-yellow-900/30 text-yellow-300"
          }`}
        >
          <div className="flex items-start gap-2">
            <MaterialIcon
              icon={
                submissionStatus === "approved"
                  ? "check_circle"
                  : submissionStatus === "rejected"
                    ? "cancel"
                    : "hourglass_empty"
              }
              size="sm"
              className="mt-0.5 shrink-0"
            />
            <div>
              {submissionStatus === "approved" && (
                <p className="font-semibold">Profile approved and live!</p>
              )}
              {submissionStatus === "pending_approval" && (
                <>
                  <p className="font-semibold">Awaiting approval</p>
                  <p className="text-xs opacity-80 mt-0.5">
                    Your profile has been submitted and is pending review by
                    Matt. It will appear on the team page once approved.
                    {submittedAt && (
                      <> Submitted {new Date(submittedAt).toLocaleDateString()}.</>
                    )}
                  </p>
                </>
              )}
              {submissionStatus === "rejected" && (
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
      )}

      {/* Save status banner */}
      {saveStatus !== "idle" && (
        <div
          className={`rounded-lg border px-4 py-3 text-sm font-medium ${
            saveStatus === "saved"
              ? "border-green-600 bg-green-900/30 text-green-300"
              : saveStatus === "error"
                ? "border-red-600 bg-red-900/30 text-red-300"
                : "border-brand-secondary/40 bg-brand-secondary/10 text-brand-secondary"
          }`}
        >
          <div className="flex items-center gap-2">
            {saveStatus === "saving" && (
              <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
            )}
            {saveStatus === "saved" && <MaterialIcon icon="check_circle" size="sm" />}
            {saveStatus === "error" && <MaterialIcon icon="error" size="sm" />}
            {saveMessage || (saveStatus === "saving" ? "Saving…" : "")}
          </div>
        </div>
      )}

      {/* Section: Personal Info */}
      <div className="rounded-xl border border-gray-700 bg-gray-800/60 p-5 space-y-4">
        <SectionHeading icon="person" label="Personal Information" />
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
      </div>

      {/* Section: Bio & Narrative */}
      <div className="rounded-xl border border-gray-700 bg-gray-800/60 p-5 space-y-4">
        <SectionHeading icon="article" label="Bio & Narrative" />
        <DashboardTextareaField
          label="Professional Bio"
          isRequired
          rows={5}
          placeholder="Write a 2–4 sentence professional bio that will appear on the team page…"
          value={form.bio}
          onChange={(e) => setField("bio", e.target.value)}
          maxLength={1200}
        />
        <p className="text-xs text-gray-500">
          {form.bio.length}/1200 characters
        </p>
        <DashboardFormField
          label="Fun Fact"
          placeholder="An interesting personal detail…"
          value={form.funFact}
          onChange={(e) => setField("funFact", e.target.value)}
          maxLength={200}
        />
      </div>

      {/* Section: Career Highlights */}
      <div className="rounded-xl border border-gray-700 bg-gray-800/60 p-5 space-y-3">
        <SectionHeading icon="star" label="Career Highlights" />
        <p className="text-xs text-gray-500">
          Enter up to 5 career highlights — one per line.
        </p>
        {form.careerHighlights.map((highlight, i) => (
          <DashboardFormField
            key={i}
            label={`Highlight ${i + 1}`}
            placeholder={`Career highlight ${i + 1}…`}
            value={highlight}
            onChange={(e) => setArrayItem("careerHighlights", i, e.target.value)}
            maxLength={200}
          />
        ))}
      </div>

      {/* Section: Specialties */}
      <div className="rounded-xl border border-gray-700 bg-gray-800/60 p-5 space-y-3">
        <SectionHeading icon="construction" label="Specialty Areas" />
        <p className="text-xs text-gray-500">
          Enter up to 6 specialty areas shown on your profile card.
        </p>
        <div className="grid gap-3 sm:grid-cols-2">
          {form.specialties.map((spec, i) => (
            <DashboardFormField
              key={i}
              label={`Specialty ${i + 1}`}
              placeholder={`Specialty area ${i + 1}…`}
              value={spec}
              onChange={(e) => setArrayItem("specialties", i, e.target.value)}
              maxLength={80}
            />
          ))}
        </div>
      </div>

      {/* Section: Credentials */}
      <div className="rounded-xl border border-gray-700 bg-gray-800/60 p-5 space-y-4">
        <SectionHeading icon="verified" label="Credentials & Interests" />
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
      </div>

      {/* Section: Skills */}
      <div className="rounded-xl border border-gray-700 bg-gray-800/60 p-5 space-y-4">
        <SectionHeading icon="insights" label="Skill Ratings (0–100)" />
        <p className="text-xs text-gray-500">
          Rate each skill from 0 to 100. These populate your profile radar chart.
        </p>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {SKILL_FIELDS.map(({ key, label }) => (
            <div key={key}>
              <label className={DASHBOARD_LABEL_CLASS}>
                {label}
                <span className="ml-1 font-bold text-brand-secondary">
                  {form.skills[key]}
                </span>
              </label>
              <input
                type="range"
                min={0}
                max={100}
                value={form.skills[key]}
                onChange={(e) => setSkill(key, e.target.value)}
                className="w-full accent-brand-secondary"
                aria-label={`${label} skill rating`}
              />
              <input
                type="number"
                min={0}
                max={100}
                value={form.skills[key]}
                onChange={(e) => setSkill(key, e.target.value)}
                className={`mt-1 ${DASHBOARD_INPUT_CLASS} w-20`}
                aria-label={`${label} skill number input`}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Section: Current Year Stats */}
      <div className="rounded-xl border border-gray-700 bg-gray-800/60 p-5 space-y-4">
        <SectionHeading icon="trending_up" label="Current Year Performance" />
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
      </div>

      {/* Section: Career Totals */}
      <div className="rounded-xl border border-gray-700 bg-gray-800/60 p-5 space-y-4">
        <SectionHeading icon="military_tech" label="Career Totals" />
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
      </div>

      {/* Save button */}
      <div className="flex items-center justify-between gap-4 pb-8">
        <button
          type="button"
          onClick={() => router.push("/hub")}
          className="rounded-lg border border-gray-600 px-4 py-2 text-sm font-semibold text-gray-300 transition hover:border-gray-400 hover:text-white"
        >
          ← Back to Hub
        </button>
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
              {submissionStatus === "rejected" ? "Resubmit Profile" : "Submit for Review"}
            </>
          )}
        </button>
      </div>
    </div>
  );
}
