"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { MaterialIcon } from "@/components/icons/MaterialIcon";
import { TeamProfileForm } from "@/components/hub/TeamProfileForm";
import { adminFetch } from "@/lib/admin-auth/api";
import {
  markdownToTeamProfilePayload,
  teamProfileToMarkdown,
} from "@/lib/hub/profile-markdown";
import { SKILL_FIELDS } from "@/lib/hub/profile-mapping";
import {
  vintageTeamMembers,
  type VintageTeamMember,
} from "@/lib/data/vintage-team";

interface TeamQuestionnaireTabProps {
  readonly token: string;
}

interface TeamProfileResponse {
  success: boolean;
  data?: {
    profile: VintageTeamMember;
  };
  message?: string;
}

type QuestionnaireMode = "form" | "markdown";

interface QuestionnaireTarget {
  slug: string;
  fullName: string;
  roleTitle: string;
  department: string;
  employeeEmail: string;
}

const DEFAULT_TARGET: QuestionnaireTarget = {
  slug: "",
  fullName: "",
  roleTitle: "",
  department: "Mission Commanders",
  employeeEmail: "",
};

interface CompletionItem {
  readonly id: string;
  readonly label: string;
  readonly done: boolean;
}

function hasText(value: string | null | undefined): boolean {
  return Boolean(value?.trim());
}

function nonEmptyCount(values: readonly string[] | undefined): number {
  return (values ?? []).filter((v) => v.trim().length > 0).length;
}

function completionFromProfile(profile: VintageTeamMember): CompletionItem[] {
  const skillValues = Object.values(profile.skills ?? {});
  const skillsDone =
    skillValues.length > 0 &&
    skillValues.filter((v) => Number(v) > 0).length >= 8;

  const currentYear = profile.currentYearStats;
  const currentYearDone = Boolean(
    currentYear &&
    currentYear.projectsCompleted >= 0 &&
    currentYear.clientSatisfaction >= 0 &&
    hasText(currentYear.safetyRecord) &&
    currentYear.teamCollaborations >= 0,
  );

  const career = profile.careerStats;
  const careerDone = Boolean(
    career &&
    career.totalProjects >= 0 &&
    career.yearsExperience >= 0 &&
    career.specialtyAreas >= 0 &&
    career.mentorships >= 0,
  );

  return [
    {
      id: "identity",
      label: "Personal Identity (nickname, hometown, education, years)",
      done:
        hasText(profile.nickname) &&
        hasText(profile.hometown) &&
        hasText(profile.education) &&
        profile.yearsWithCompany > 0,
    },
    {
      id: "bio",
      label: "Professional Bio and Narrative",
      done: hasText(profile.bio) && (profile.bio?.trim().length ?? 0) >= 120,
    },
    {
      id: "highlights",
      label: "Career Highlights (at least 3)",
      done: nonEmptyCount(profile.careerHighlights) >= 3,
    },
    {
      id: "specialties",
      label: "Specialty Areas (at least 3)",
      done: nonEmptyCount(profile.specialties) >= 3,
    },
    {
      id: "credentials",
      label: "Credentials, Hobbies, and Special Interests",
      done:
        hasText(profile.certifications) &&
        hasText(profile.hobbies) &&
        hasText(profile.specialInterests),
    },
    {
      id: "skills",
      label: "Skills Matrix (0-100)",
      done: skillsDone,
    },
    {
      id: "current-year",
      label: "Current Year Performance",
      done: currentYearDone,
    },
    {
      id: "career-totals",
      label: "Career Totals",
      done: careerDone,
    },
  ];
}

function toSlug(value: string): string {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

const DEPARTMENT_OPTIONS = [
  "The Upper Brass",
  "Mission Commanders",
  "Field Officers",
  "Special Operations",
  "Logistics Command",
] as const;

export function TeamQuestionnaireTab({ token }: TeamQuestionnaireTabProps) {
  const [profile, setProfile] = useState<VintageTeamMember | null>(null);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [loadingProfile, setLoadingProfile] = useState(true);
  const [mode, setMode] = useState<QuestionnaireMode>("form");
  const [markdownDraft, setMarkdownDraft] = useState("");
  const [markdownMessage, setMarkdownMessage] = useState<string | null>(null);
  const [applyingMarkdown, setApplyingMarkdown] = useState(false);
  const [target, setTarget] = useState<QuestionnaireTarget>(DEFAULT_TARGET);
  const [employeeQuery, setEmployeeQuery] = useState("");
  const [isEmployeeMenuOpen, setIsEmployeeMenuOpen] = useState(false);
  const [highlightedEmployeeIndex, setHighlightedEmployeeIndex] = useState(-1);
  const importInputRef = useRef<HTMLInputElement | null>(null);

  const knownEmployees = useMemo(
    () =>
      [...vintageTeamMembers]
        .filter((member) => member.active)
        .sort((a, b) => a.name.localeCompare(b.name)),
    [],
  );

  const filteredEmployees = useMemo(() => {
    const query = employeeQuery.trim().toLowerCase();
    if (!query) return [];
    return knownEmployees
      .filter((member) => {
        return (
          member.name.toLowerCase().includes(query) ||
          member.slug.toLowerCase().includes(query) ||
          member.role.toLowerCase().includes(query) ||
          member.department.toLowerCase().includes(query)
        );
      })
      .slice(0, 8);
  }, [employeeQuery, knownEmployees]);

  const employeeListboxId = "employee-target-suggestions";

  const loadProfile = useCallback(
    async (targetOverride: QuestionnaireTarget) => {
      setLoadingProfile(true);
      setLoadError(null);

      try {
        const activeTarget = targetOverride;
        const params = new URLSearchParams();
        if (activeTarget.slug.trim()) {
          params.set("slug", activeTarget.slug.trim());
          if (activeTarget.fullName.trim()) {
            params.set("fullName", activeTarget.fullName.trim());
          }
          if (activeTarget.roleTitle.trim()) {
            params.set("roleTitle", activeTarget.roleTitle.trim());
          }
          if (activeTarget.department.trim()) {
            params.set("department", activeTarget.department.trim());
          }
          if (activeTarget.employeeEmail.trim()) {
            params.set("employeeEmail", activeTarget.employeeEmail.trim());
          }
        }
        const query = params.toString();
        const path = query ? `/api/team-profile?${query}` : "/api/team-profile";
        const res = await adminFetch(token, path);
        const json = (await res.json()) as TeamProfileResponse;

        if (!res.ok || !json.success || !json.data?.profile) {
          throw new Error(json.message ?? "Failed to load team profile");
        }

        setProfile(json.data.profile);
        setMarkdownDraft((prev) =>
          prev.trim().length > 0
            ? prev
            : teamProfileToMarkdown(json.data!.profile),
        );
      } catch (_err) {
        setLoadError(
          _err instanceof Error ? _err.message : "Failed to load profile data",
        );
      } finally {
        setLoadingProfile(false);
      }
    },
    [token],
  );

  useEffect(() => {
    void loadProfile(DEFAULT_TARGET);
  }, [loadProfile]);

  const targetProfile = useMemo(() => {
    const slug = target.slug.trim();
    if (!slug) return undefined;
    const fullName = target.fullName.trim();
    const roleTitle = target.roleTitle.trim();
    const department = target.department.trim();
    const employeeEmail = target.employeeEmail.trim();

    return {
      slug,
      ...(fullName ? { fullName } : {}),
      ...(roleTitle ? { roleTitle } : {}),
      ...(department ? { department } : {}),
      ...(employeeEmail ? { employeeEmail } : {}),
    };
  }, [target]);

  const generatedMarkdown = useMemo(() => {
    if (!profile) return "";
    return teamProfileToMarkdown(profile);
  }, [profile]);

  const completionItems = useMemo(
    () => (profile ? completionFromProfile(profile) : []),
    [profile],
  );

  const radarSkillItems = useMemo(() => {
    if (!profile) return [];
    return SKILL_FIELDS.map(({ key, label }) => {
      const value = Number(profile.skills[key] ?? 0);
      return {
        key,
        label,
        value,
        done: value > 0,
      };
    });
  }, [profile]);

  const radarDoneCount = radarSkillItems.filter((s) => s.done).length;
  const radarCoverage =
    radarSkillItems.length > 0
      ? Math.round((radarDoneCount / radarSkillItems.length) * 100)
      : 0;

  const completedCount = completionItems.filter((item) => item.done).length;
  const completionPercent =
    completionItems.length > 0
      ? Math.round((completedCount / completionItems.length) * 100)
      : 0;

  const handleGenerateMarkdown = () => {
    setMarkdownDraft(generatedMarkdown);
    setMarkdownMessage("Markdown draft generated from current profile.");
  };

  const handleDownloadMarkdown = () => {
    if (!markdownDraft.trim()) return;
    const blob = new Blob([markdownDraft], {
      type: "text/markdown;charset=utf-8",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    const slug = profile?.slug ?? "team-profile";
    a.href = url;
    a.download = `${slug}-questionnaire-draft.md`;
    a.click();
    URL.revokeObjectURL(url);
    setMarkdownMessage("Markdown draft downloaded.");
  };

  const handleImportMarkdownFile = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;
    try {
      const text = await file.text();
      setMarkdownDraft(text);
      setMarkdownMessage(`Imported markdown from ${file.name}.`);
      setMode("markdown");
    } catch {
      setMarkdownMessage("Unable to read markdown file.");
    } finally {
      event.target.value = "";
    }
  };

  const handleCopyMarkdown = async () => {
    if (!markdownDraft) return;
    try {
      await navigator.clipboard.writeText(markdownDraft);
      setMarkdownMessage("Markdown copied to clipboard.");
    } catch {
      setMarkdownMessage("Clipboard unavailable. Copy from the text area.");
    }
  };

  const handleApplyMarkdown = async () => {
    setMarkdownMessage(null);
    setApplyingMarkdown(true);

    try {
      const payload = markdownToTeamProfilePayload(markdownDraft);
      if (targetProfile?.slug) {
        payload["slug"] = targetProfile.slug;
        if (targetProfile.fullName) {
          payload["fullName"] = targetProfile.fullName;
        }
        if (targetProfile.roleTitle) {
          payload["roleTitle"] = targetProfile.roleTitle;
        }
        if (targetProfile.department) {
          payload["department"] = targetProfile.department;
        }
        if (targetProfile.employeeEmail) {
          payload["employeeEmail"] = targetProfile.employeeEmail;
        }
      }
      const res = await adminFetch(token, "/api/team-profile", {
        method: "PUT",
        body: JSON.stringify(payload),
      });
      const json = (await res.json()) as { success: boolean; message?: string };

      if (!res.ok || !json.success) {
        throw new Error(json.message ?? "Failed to apply markdown draft");
      }

      setMarkdownMessage(
        json.message ?? "Markdown draft applied and submitted for review.",
      );
      await loadProfile(target);
    } catch (_err) {
      setMarkdownMessage(
        _err instanceof Error ? _err.message : "Failed to apply markdown",
      );
    } finally {
      setApplyingMarkdown(false);
    }
  };

  const selectExistingEmployee = (member: VintageTeamMember) => {
    const selectedTarget: QuestionnaireTarget = {
      slug: member.slug,
      fullName: member.name,
      roleTitle: member.role,
      department: member.department,
      employeeEmail: member.email ?? "",
    };
    setTarget(selectedTarget);
    setEmployeeQuery(`${member.name} (${member.slug})`);
    setIsEmployeeMenuOpen(false);
    setHighlightedEmployeeIndex(-1);
    setLoadError(null);
    void loadProfile(selectedTarget);
  };

  const createTargetFromQuery = () => {
    const nameOrSlug = employeeQuery.trim();
    if (!nameOrSlug) return;
    const nextTarget: QuestionnaireTarget = {
      slug: toSlug(nameOrSlug),
      fullName: nameOrSlug,
      roleTitle: target.roleTitle,
      department: target.department,
      employeeEmail: target.employeeEmail,
    };
    if (!nextTarget.slug) return;
    setTarget(nextTarget);
    setIsEmployeeMenuOpen(false);
    setHighlightedEmployeeIndex(-1);
    setLoadError(null);
  };

  const onEmployeeQueryKeyDown = (
    event: React.KeyboardEvent<HTMLInputElement>,
  ) => {
    if (event.key === "Escape") {
      setIsEmployeeMenuOpen(false);
      setHighlightedEmployeeIndex(-1);
      return;
    }

    if (event.key === "ArrowDown") {
      event.preventDefault();
      if (!isEmployeeMenuOpen) {
        setIsEmployeeMenuOpen(true);
      }
      if (filteredEmployees.length > 0) {
        setHighlightedEmployeeIndex((prev) =>
          prev < filteredEmployees.length - 1 ? prev + 1 : 0,
        );
      }
      return;
    }

    if (event.key === "ArrowUp") {
      event.preventDefault();
      if (!isEmployeeMenuOpen) {
        setIsEmployeeMenuOpen(true);
      }
      if (filteredEmployees.length > 0) {
        setHighlightedEmployeeIndex((prev) =>
          prev > 0 ? prev - 1 : filteredEmployees.length - 1,
        );
      }
      return;
    }

    if (event.key === "Enter") {
      if (isEmployeeMenuOpen && highlightedEmployeeIndex >= 0) {
        event.preventDefault();
        const selected = filteredEmployees[highlightedEmployeeIndex];
        if (selected) {
          selectExistingEmployee(selected);
          return;
        }
      }

      if (employeeQuery.trim().length > 0 && filteredEmployees.length === 0) {
        event.preventDefault();
        createTargetFromQuery();
      }
    }

    if (event.key === "Tab") {
      setIsEmployeeMenuOpen(false);
      setHighlightedEmployeeIndex(-1);
    }
  };

  return (
    <div className="space-y-6">
      <section className="bg-brand-primary-darker/50 rounded-xl border border-brand-primary/35 p-6 space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h3 className="text-sm font-black uppercase tracking-wide text-brand-secondary">
            Employee Target
          </h3>
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => {
                setTarget({
                  ...DEFAULT_TARGET,
                });
                setEmployeeQuery("");
                setIsEmployeeMenuOpen(false);
                setHighlightedEmployeeIndex(-1);
                void loadProfile(DEFAULT_TARGET);
              }}
              className="inline-flex items-center gap-2 rounded-lg border border-brand-primary/45 px-3 py-2 text-xs font-black uppercase tracking-wide text-brand-secondary-light hover:border-brand-secondary hover:text-white"
            >
              <MaterialIcon icon="person" size="sm" />
              Use My Profile
            </button>
            <button
              type="button"
              onClick={() => {
                if (!target.slug.trim()) {
                  setLoadError(
                    "Provide a target slug to load an employee questionnaire.",
                  );
                  return;
                }
                void loadProfile(target);
              }}
              disabled={loadingProfile}
              className="inline-flex items-center gap-2 rounded-lg bg-brand-primary px-4 py-2 text-xs font-black uppercase tracking-wide text-white hover:bg-brand-primary-dark"
            >
              <MaterialIcon icon="manage_accounts" size="sm" />
              Load Target Employee
            </button>
          </div>
        </div>

        <p className="text-xs text-brand-secondary-light/80">
          Select any employee to complete the questionnaire under this admin
          session. For new hires, enter their identity fields and a unique slug
          before saving.
        </p>

        <div className="space-y-2">
          <label className="space-y-1 block">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-brand-secondary-light/80">
              Existing Employee Autocomplete
            </span>
            <input
              value={employeeQuery}
              onChange={(e) => {
                setEmployeeQuery(e.target.value);
                setIsEmployeeMenuOpen(true);
                setHighlightedEmployeeIndex(-1);
              }}
              onFocus={() => {
                if (employeeQuery.trim().length > 0) {
                  setIsEmployeeMenuOpen(true);
                }
              }}
              onBlur={() => {
                // Delay close so click/tap on options can register.
                globalThis.setTimeout(() => {
                  setIsEmployeeMenuOpen(false);
                  setHighlightedEmployeeIndex(-1);
                }, 120);
              }}
              onKeyDown={onEmployeeQueryKeyDown}
              placeholder="Start typing name, role, slug, or department..."
              role="combobox"
              aria-expanded={isEmployeeMenuOpen}
              aria-controls={employeeListboxId}
              aria-autocomplete="list"
              aria-activedescendant={
                highlightedEmployeeIndex >= 0
                  ? `${employeeListboxId}-${highlightedEmployeeIndex}`
                  : undefined
              }
              className="w-full rounded-lg border border-brand-primary/45 bg-brand-primary-darker/60 px-3 py-2 text-sm text-brand-secondary-light focus:outline-none focus:ring-2 focus:ring-brand-secondary/50"
            />
          </label>
          <p className="text-[11px] text-brand-secondary-light/75">
            Keyboard: up/down to browse, enter to select, esc to close.
          </p>
          {isEmployeeMenuOpen && filteredEmployees.length > 0 && (
            <div
              id={employeeListboxId}
              role="listbox"
              className="max-h-48 overflow-y-auto rounded-lg border border-brand-primary/35 bg-brand-primary-darker/65"
            >
              {filteredEmployees.map((member, index) => (
                <button
                  key={member.slug}
                  id={`${employeeListboxId}-${index}`}
                  type="button"
                  onClick={() => selectExistingEmployee(member)}
                  onMouseEnter={() => setHighlightedEmployeeIndex(index)}
                  role="option"
                  aria-selected={highlightedEmployeeIndex === index}
                  className={`flex w-full items-center justify-between gap-3 border-b border-brand-primary/25 px-3 py-2 text-left last:border-b-0 ${
                    highlightedEmployeeIndex === index
                      ? "bg-brand-primary/35"
                      : "hover:bg-brand-primary/25"
                  }`}
                >
                  <span className="text-sm font-semibold text-white">
                    {member.name}
                  </span>
                  <span className="text-xs text-brand-secondary-light/80">
                    {member.role} • {member.slug}
                  </span>
                </button>
              ))}
            </div>
          )}
          {isEmployeeMenuOpen &&
            employeeQuery.trim().length > 0 &&
            filteredEmployees.length === 0 && (
              <div className="rounded-lg border border-brand-primary/30 bg-brand-primary-darker/60 p-3">
                <p className="text-xs text-brand-secondary-light/80">
                  No existing employee match found.
                </p>
                <button
                  type="button"
                  onClick={createTargetFromQuery}
                  className="mt-2 inline-flex items-center gap-2 rounded-lg border border-brand-secondary/35 px-3 py-2 text-xs font-black uppercase tracking-wide text-brand-secondary-light hover:border-brand-secondary hover:text-white"
                >
                  <MaterialIcon icon="person_add" size="sm" />
                  Use as New Employee Target
                </button>
              </div>
            )}
          {target.slug.trim().length > 0 && (
            <div className="inline-flex items-center gap-2 rounded-lg border border-brand-primary/35 bg-brand-primary-darker/65 px-3 py-2">
              <MaterialIcon
                icon="verified_user"
                size="sm"
                className="text-brand-secondary"
              />
              <span className="text-xs text-brand-secondary-light/85">
                Active target: {target.fullName || target.slug} ({target.slug})
              </span>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          <label className="space-y-1">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-brand-secondary-light/80">
              Full Name
            </span>
            <input
              value={target.fullName}
              onChange={(e) => {
                const fullName = e.target.value;
                setTarget((prev) => ({
                  ...prev,
                  fullName,
                  slug:
                    prev.slug.trim().length > 0 ? prev.slug : toSlug(fullName),
                }));
              }}
              placeholder="e.g., Alex Ramirez"
              className="w-full rounded-lg border border-brand-primary/45 bg-brand-primary-darker/60 px-3 py-2 text-sm text-brand-secondary-light focus:outline-none focus:ring-2 focus:ring-brand-secondary/50"
            />
          </label>
          <label className="space-y-1">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-brand-secondary-light/80">
              Slug
            </span>
            <input
              value={target.slug}
              onChange={(e) =>
                setTarget((prev) => ({ ...prev, slug: toSlug(e.target.value) }))
              }
              placeholder="e.g., alex-ramirez"
              className="w-full rounded-lg border border-brand-primary/45 bg-brand-primary-darker/60 px-3 py-2 text-sm text-brand-secondary-light focus:outline-none focus:ring-2 focus:ring-brand-secondary/50"
            />
          </label>
          <label className="space-y-1">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-brand-secondary-light/80">
              Role Title
            </span>
            <input
              value={target.roleTitle}
              onChange={(e) =>
                setTarget((prev) => ({ ...prev, roleTitle: e.target.value }))
              }
              placeholder="e.g., Project Engineer"
              className="w-full rounded-lg border border-brand-primary/45 bg-brand-primary-darker/60 px-3 py-2 text-sm text-brand-secondary-light focus:outline-none focus:ring-2 focus:ring-brand-secondary/50"
            />
          </label>
          <label className="space-y-1">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-brand-secondary-light/80">
              Department
            </span>
            <select
              value={target.department}
              onChange={(e) =>
                setTarget((prev) => ({ ...prev, department: e.target.value }))
              }
              className="w-full rounded-lg border border-brand-primary/45 bg-brand-primary-darker/60 px-3 py-2 text-sm text-brand-secondary-light focus:outline-none focus:ring-2 focus:ring-brand-secondary/50"
            >
              {DEPARTMENT_OPTIONS.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </label>
          <label className="space-y-1 md:col-span-2 lg:col-span-2">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-brand-secondary-light/80">
              Employee Email (optional)
            </span>
            <input
              value={target.employeeEmail}
              onChange={(e) =>
                setTarget((prev) => ({
                  ...prev,
                  employeeEmail: e.target.value,
                }))
              }
              placeholder="e.g., alex@mhc-gc.com"
              className="w-full rounded-lg border border-brand-primary/45 bg-brand-primary-darker/60 px-3 py-2 text-sm text-brand-secondary-light focus:outline-none focus:ring-2 focus:ring-brand-secondary/50"
            />
          </label>
        </div>
      </section>

      <section className="bg-brand-primary-darker/55 rounded-xl border-2 border-brand-primary p-6">
        <div className="flex items-start gap-4">
          <div className="bg-brand-primary/25 border border-brand-secondary/40 rounded-lg p-3">
            <MaterialIcon
              icon="quiz"
              size="lg"
              className="text-brand-secondary"
            />
          </div>
          <div>
            <h2 className="text-2xl font-black text-white uppercase tracking-wide">
              Team Questionnaire
            </h2>
            <p className="text-sm text-brand-secondary-light/80 mt-1 max-w-4xl">
              Complete your full employee questionnaire here. This updates the
              same team-profile override data consumed by the website Team
              portal and supports markdown draft workflows.
            </p>
          </div>
        </div>

        <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-3">
          <div className="rounded-lg border border-brand-primary/35 bg-brand-primary-darker/60 px-3 py-2">
            <p className="text-[11px] uppercase tracking-wider text-brand-secondary-light/80 font-semibold">
              Estimated Time
            </p>
            <p className="text-sm text-white font-bold mt-1">10-15 minutes</p>
          </div>
          <div className="rounded-lg border border-brand-primary/35 bg-brand-primary-darker/60 px-3 py-2">
            <p className="text-[11px] uppercase tracking-wider text-brand-secondary-light/80 font-semibold">
              Coverage
            </p>
            <p className="text-sm text-white font-bold mt-1">
              {completedCount}/{completionItems.length} sections complete
            </p>
          </div>
          <div className="rounded-lg border border-brand-primary/35 bg-brand-primary-darker/60 px-3 py-2">
            <p className="text-[11px] uppercase tracking-wider text-brand-secondary-light/80 font-semibold">
              Publish Path
            </p>
            <p className="text-sm text-white font-bold mt-1">
              Team portal + review workflow
            </p>
          </div>
        </div>
      </section>

      <section className="bg-brand-primary-darker/50 rounded-xl border border-brand-primary/35 p-3">
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => setMode("form")}
            className={`inline-flex items-center gap-2 rounded-lg px-4 py-2 text-xs font-black uppercase tracking-wide transition-colors ${
              mode === "form"
                ? "bg-brand-primary text-white"
                : "text-brand-secondary-light/85 hover:bg-brand-primary-dark/55"
            }`}
          >
            <MaterialIcon icon="assignment" size="sm" />
            Guided Form
          </button>
          <button
            type="button"
            onClick={() => setMode("markdown")}
            className={`inline-flex items-center gap-2 rounded-lg px-4 py-2 text-xs font-black uppercase tracking-wide transition-colors ${
              mode === "markdown"
                ? "bg-brand-primary text-white"
                : "text-brand-secondary-light/85 hover:bg-brand-primary-dark/55"
            }`}
          >
            <MaterialIcon icon="code" size="sm" />
            Markdown Sync
          </button>
        </div>
      </section>

      {mode === "form" && (
        <>
          <section className="bg-brand-primary-darker/50 rounded-xl border border-brand-primary/35 p-6 space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <h3 className="text-sm font-black uppercase tracking-wide text-brand-secondary">
                Radar Chart Skills
              </h3>
              <span className="text-xs font-semibold text-brand-secondary-light/85">
                {radarDoneCount}/{radarSkillItems.length} skill scores set
              </span>
            </div>

            <p className="text-xs text-brand-secondary-light/80">
              The website Team page radar chart is generated from these ten
              skill scores. Complete all values in the questionnaire below for a
              full chart.
            </p>

            <div className="h-2 rounded-full bg-brand-primary-darker/65 overflow-hidden">
              <div
                className="h-full bg-brand-secondary transition-all"
                style={{ width: `${radarCoverage}%` }}
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
              {radarSkillItems.map((skill) => (
                <div
                  key={skill.key}
                  className="inline-flex items-center justify-between gap-2 rounded-lg border border-brand-primary/35 bg-brand-primary-darker/60 px-3 py-2"
                >
                  <span className="text-xs text-brand-secondary-light/85">
                    {skill.label}
                  </span>
                  <span
                    className={`text-xs font-bold ${
                      skill.done
                        ? "text-green-400"
                        : "text-brand-secondary-light/60"
                    }`}
                  >
                    {skill.value}
                  </span>
                </div>
              ))}
            </div>
          </section>

          <section className="bg-brand-primary-darker/50 rounded-xl border border-brand-primary/35 p-6 space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <h3 className="text-sm font-black uppercase tracking-wide text-brand-secondary">
                Completion Checklist
              </h3>
              <span className="text-xs font-semibold text-brand-secondary-light/85">
                {completionPercent}% complete
              </span>
            </div>

            <div className="h-2 rounded-full bg-brand-primary-darker/65 overflow-hidden">
              <div
                className="h-full bg-brand-secondary transition-all"
                style={{ width: `${completionPercent}%` }}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {completionItems.map((item) => (
                <div
                  key={item.id}
                  className="inline-flex items-center gap-2 rounded-lg border border-brand-primary/35 bg-brand-primary-darker/60 px-3 py-2"
                >
                  <MaterialIcon
                    icon={item.done ? "check_circle" : "radio_button_unchecked"}
                    size="sm"
                    className={
                      item.done
                        ? "text-green-400"
                        : "text-brand-secondary-light/60"
                    }
                  />
                  <span className="text-xs text-brand-secondary-light/85">
                    {item.label}
                  </span>
                </div>
              ))}
            </div>
          </section>

          <section className="bg-brand-primary-darker/50 rounded-xl border border-brand-primary/35 p-6">
            {loadingProfile ? (
              <div className="h-40 rounded-lg border border-brand-primary/35 bg-brand-primary-darker/60 animate-pulse" />
            ) : (
              <TeamProfileForm
                showBackToHubButton={false}
                {...(targetProfile ? { targetProfile } : {})}
                onSaved={() => {
                  void loadProfile(target);
                }}
                onProfileLoaded={(loadedProfile) => {
                  setProfile(loadedProfile);
                }}
              />
            )}
          </section>
        </>
      )}

      {mode === "markdown" && (
        <section className="bg-brand-primary-darker/50 rounded-xl border border-brand-primary/35 p-6 space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h3 className="text-sm font-black uppercase tracking-wide text-brand-secondary">
              Markdown Bridge
            </h3>
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={handleGenerateMarkdown}
                disabled={loadingProfile || !profile}
                className="inline-flex items-center gap-2 rounded-lg border border-brand-primary/45 px-3 py-2 text-xs font-black uppercase tracking-wide text-brand-secondary-light hover:border-brand-secondary hover:text-white disabled:opacity-50"
              >
                <MaterialIcon icon="description" size="sm" />
                Generate Draft
              </button>
              <button
                type="button"
                onClick={handleDownloadMarkdown}
                disabled={!markdownDraft}
                className="inline-flex items-center gap-2 rounded-lg border border-brand-primary/45 px-3 py-2 text-xs font-black uppercase tracking-wide text-brand-secondary-light hover:border-brand-secondary hover:text-white disabled:opacity-50"
              >
                <MaterialIcon icon="download" size="sm" />
                Download
              </button>
              <button
                type="button"
                onClick={() => importInputRef.current?.click()}
                className="inline-flex items-center gap-2 rounded-lg border border-brand-primary/45 px-3 py-2 text-xs font-black uppercase tracking-wide text-brand-secondary-light hover:border-brand-secondary hover:text-white"
              >
                <MaterialIcon icon="upload_file" size="sm" />
                Import
              </button>
              <button
                type="button"
                onClick={() => void handleCopyMarkdown()}
                disabled={!markdownDraft}
                className="inline-flex items-center gap-2 rounded-lg border border-brand-primary/45 px-3 py-2 text-xs font-black uppercase tracking-wide text-brand-secondary-light hover:border-brand-secondary hover:text-white disabled:opacity-50"
              >
                <MaterialIcon icon="content_copy" size="sm" />
                Copy
              </button>
              <button
                type="button"
                onClick={() => void handleApplyMarkdown()}
                disabled={!markdownDraft || applyingMarkdown}
                className="inline-flex items-center gap-2 rounded-lg bg-brand-primary px-4 py-2 text-xs font-black uppercase tracking-wide text-white hover:bg-brand-primary-dark disabled:opacity-50"
              >
                <MaterialIcon
                  icon={applyingMarkdown ? "hourglass_empty" : "publish"}
                  size="sm"
                  className={applyingMarkdown ? "animate-pulse" : ""}
                />
                Apply Markdown
              </button>
            </div>
          </div>

          <input
            ref={importInputRef}
            type="file"
            accept=".md,.markdown,.txt"
            className="hidden"
            onChange={(e) => {
              void handleImportMarkdownFile(e);
            }}
          />

          <p className="text-xs text-brand-secondary-light/80">
            Use a <strong>json team-profile-payload</strong> code block to
            import profile changes from markdown.
          </p>

          <textarea
            value={markdownDraft}
            onChange={(e) => setMarkdownDraft(e.target.value)}
            rows={16}
            placeholder="Generate a markdown draft, edit it, then apply it here..."
            className="w-full rounded-lg border border-brand-primary/45 bg-brand-primary-darker/60 px-3 py-2 text-xs font-mono text-brand-secondary-light focus:outline-none focus:ring-2 focus:ring-brand-secondary/50"
          />

          {markdownMessage && (
            <p className="text-xs text-brand-secondary-light">
              {markdownMessage}
            </p>
          )}
          {loadError && <p className="text-xs text-red-300">{loadError}</p>}
        </section>
      )}
    </div>
  );
}
