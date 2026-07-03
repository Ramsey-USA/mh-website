export const revalidate = 3600; // 1 h ISR — allows DB profile updates to surface within an hour

import { PageTrackingClient } from "@/components/analytics";
import Image from "next/image";
import Link from "next/link";
import dynamic from "next/dynamic";
import { Button, Card, IconContainer, GlowEffect } from "@/components/ui";
import {
  DiagonalStripePattern,
  BrandColorBlobs,
} from "@/components/ui/backgrounds";
import { MaterialIcon } from "@/components/icons/MaterialIcon";

// TeamProfileSection contains ~1 000 lines of client-side JS and dynamically
// imports recharts. Making it dynamic with ssr:true keeps server-rendered HTML
// but splits its JS so it loads after the critical above-fold content.
const TeamProfileSection = dynamic(
  () =>
    import("@/components/team/TeamProfileSection").then((mod) => ({
      default: mod.TeamProfileSection,
    })),
  { ssr: true },
);
import {
  vintageTeamMembers,
  applyProfileOverride,
  type VintageTeamMember,
  type TeamProfileOverride,
} from "@/lib/data/vintage-team";
import { PageNavigation } from "@/components/navigation/PageNavigation";
import { Breadcrumb } from "@/components/navigation/Breadcrumb";
import { navigationConfigs } from "@/components/navigation/navigationConfigs";
import type { Testimonial } from "@/lib/data/testimonials";
import { StructuredData } from "@/components/seo/SeoMeta";
import {
  generateBreadcrumbSchema,
  breadcrumbPatterns,
} from "@/lib/seo/breadcrumb-schema";
import { COMPANY_INFO } from "@/lib/constants/company";
import { getD1DatabaseAsync } from "@/lib/db/env";
import { createDbClient } from "@/lib/db/client";
import { logger } from "@/lib/utils/logger";
import { getTranslations } from "next-intl/server";
import { getAllIndividualBrandingStamps } from "@/lib/content/individual-branding-stamps";

// Lazy load below-the-fold heavy components for better mobile performance
const TestimonialGrid = dynamic(() =>
  import("@/components/testimonials").then((mod) => ({
    default: mod.TestimonialGrid,
  })),
);
const NextStepsSection = dynamic(
  () =>
    import("@/components/shared-sections").then((mod) => ({
      default: mod.NextStepsSection,
    })),
  { ssr: true },
);

// Group team members by department
function groupByDepartment(members: VintageTeamMember[]) {
  return members.reduce(
    (acc, member) => {
      const dept = member.department;
      acc[dept] ??= [];
      acc[dept].push(member);
      return acc;
    },
    {} as Record<string, VintageTeamMember[]>,
  );
}

// DB row shape returned from team_profiles
interface TeamProfileRow {
  slug: string;
  full_name: string | null;
  role_title: string | null;
  department: string | null;
  position_title: string | null;
  employee_email: string | null;
  active: number | null;
  bio: string | null;
  fun_fact: string | null;
  certifications: string | null;
  hobbies: string | null;
  special_interests: string | null;
  career_highlights: string | null;
  specialties: string | null;
  skills: string | null;
  current_year_stats: string | null;
  career_stats: string | null;
  years_with_company: number | null;
  hometown: string | null;
  education: string | null;
  nickname: string | null;
  status: "pending_approval" | "approved" | "rejected" | null;
}

function createDynamicMemberFromRow(
  row: TeamProfileRow,
  cardNumber: number,
): VintageTeamMember {
  const role = row.role_title ?? row.position_title ?? "Team Member";
  const email = row.employee_email?.trim();
  return {
    slug: row.slug,
    name: row.full_name ?? row.slug.replaceAll("-", " "),
    role,
    position: row.position_title ?? role,
    department: row.department ?? "Mission Commanders",
    cardNumber,
    yearsWithCompany: row.years_with_company ?? 0,
    skills: {
      leadership: 0,
      technical: 0,
      communication: 0,
      safety: 0,
      problemSolving: 0,
      teamwork: 0,
      organization: 0,
      innovation: 0,
      passion: 0,
      continuingEducation: 0,
    },
    currentYearStats: {
      projectsCompleted: 0,
      clientSatisfaction: 0,
      safetyRecord: "",
      teamCollaborations: 0,
    },
    careerStats: {
      totalProjects: 0,
      yearsExperience: 0,
      specialtyAreas: 0,
      mentorships: 0,
    },
    bio: "",
    careerHighlights: [],
    specialties: [],
    active: row.active !== 0,
    ...(email ? { email } : {}),
    funFact: "",
    certifications: "",
    hobbies: "",
    specialInterests: "",
    hometown: "",
    education: "",
    nickname: "",
  };
}

function safeParseJson<T>(value: string | null): T | undefined {
  if (!value) return undefined;
  try {
    return JSON.parse(value) as T;
  } catch {
    return undefined;
  }
}

function rowToOverride(row: TeamProfileRow): TeamProfileOverride {
  const override: TeamProfileOverride = { slug: row.slug };

  if (row.bio != null) override.bio = row.bio;
  if (row.fun_fact != null) override.funFact = row.fun_fact;
  if (row.certifications != null) override.certifications = row.certifications;
  if (row.hobbies != null) override.hobbies = row.hobbies;
  if (row.special_interests != null) {
    override.specialInterests = row.special_interests;
  }
  if (row.career_highlights != null) {
    const parsed = safeParseJson<string[]>(row.career_highlights);
    if (parsed !== undefined) override.careerHighlights = parsed;
  }
  if (row.specialties != null) {
    const parsed = safeParseJson<string[]>(row.specialties);
    if (parsed !== undefined) override.specialties = parsed;
  }
  if (row.skills != null) {
    const parsed = safeParseJson<VintageTeamMember["skills"]>(row.skills);
    if (parsed !== undefined) override.skills = parsed;
  }
  if (row.current_year_stats != null) {
    const parsed = safeParseJson<VintageTeamMember["currentYearStats"]>(
      row.current_year_stats,
    );
    if (parsed !== undefined) override.currentYearStats = parsed;
  }
  if (row.career_stats != null) {
    const parsed = safeParseJson<VintageTeamMember["careerStats"]>(
      row.career_stats,
    );
    if (parsed !== undefined) override.careerStats = parsed;
  }
  if (row.years_with_company != null) {
    override.yearsWithCompany = row.years_with_company;
  }
  if (row.hometown != null) override.hometown = row.hometown;
  if (row.education != null) override.education = row.education;
  if (row.nickname != null) override.nickname = row.nickname;

  return override;
}

/**
 * Fetch all team profile overrides from D1.
 * Returns an empty map if the DB is unavailable (static data is used as fallback).
 */
async function fetchProfileOverrides(): Promise<{
  overrides: Map<string, TeamProfileOverride>;
  dynamicMembers: VintageTeamMember[];
}> {
  const overrides = new Map<string, TeamProfileOverride>();
  const dynamicMembers: VintageTeamMember[] = [];
  const staticSlugs = new Set(vintageTeamMembers.map((m) => m.slug));

  // During production build there is no live CF request context; skip D1 lookup
  // and fall back to static team data to keep prerender deterministic.
  if (process.env["NEXT_PHASE"] === "phase-production-build") {
    return { overrides, dynamicMembers };
  }

  const DB = await getD1DatabaseAsync();
  if (!DB) return { overrides, dynamicMembers };

  try {
    const db = createDbClient({ DB });

    const tableExistsRows = await db.query<{ name: string }>(
      "SELECT name FROM sqlite_master WHERE type = 'table' AND name = 'team_profiles'",
    );
    if (!tableExistsRows[0]?.name) {
      return { overrides, dynamicMembers };
    }

    const rows = await Promise.race([
      db.query<TeamProfileRow>(
        "SELECT * FROM team_profiles WHERE status = 'approved'",
      ),
      new Promise<TeamProfileRow[]>((resolve) => {
        globalThis.setTimeout(() => resolve([]), 300);
      }),
    ]);
    for (const row of rows) {
      if (row.active === 0) continue;
      const override = rowToOverride(row);
      if (staticSlugs.has(row.slug)) {
        overrides.set(row.slug, override);
        continue;
      }
      const dynamicBase = createDynamicMemberFromRow(
        row,
        900 + dynamicMembers.length,
      );
      dynamicMembers.push(applyProfileOverride(dynamicBase, override));
    }
  } catch (_err) {
    logger.warn("team/page: failed to fetch profile overrides from D1", {
      _err,
    });
  }

  return { overrides, dynamicMembers };
}

const departmentConfig: Record<string, { icon: string; id: string }> = {
  "The Upper Brass": {
    icon: "workspace_premium",
    id: "upper-brass",
  },
  "Mission Commanders": {
    icon: "engineering",
    id: "mission-commanders",
  },
  "Special Operations": {
    icon: "military_tech",
    id: "special-operations",
  },
  "Logistics Command": {
    icon: "support_agent",
    id: "logistics-command",
  },
  "Field Officers": {
    icon: "construction",
    id: "field-officers",
  },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What makes MH Construction's leadership team unique?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "MH Construction's leadership structure combines executive, project, safety, and field perspectives into one accountable delivery chain. The team balances disciplined controls with practical project decision-making.",
      },
    },
    {
      "@type": "Question",
      name: "Who leads MH Construction?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "MH Construction is led by Owner & President Jeremy Thamert, Vice President Arnold Garcia, and Founder Mike Holstein.",
      },
    },
    {
      "@type": "Question",
      name: "What is MH Construction's leadership structure?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Our leadership structure includes executive leadership, project management, marketing and safety, administration, and field superintendents.",
      },
    },
    {
      "@type": "Question",
      name: "Is MH Construction Veteran-Owned?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes, MH Construction became Veteran-Owned in January 2025 when Army veteran Jeremy Thamert purchased the company. Our team applies structured planning, direct communication, and accountable project follow-through.",
      },
    },
    {
      "@type": "Question",
      name: "Does MH Construction hire veterans?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes, MH Construction actively recruits veterans across all branches. We value military experience and offer veteran hiring initiatives, mentorship programs, and career development opportunities. Visit our careers page to learn more.",
      },
    },
  ],
};

export default async function TeamPage() {
  const t = await getTranslations();
  const brandingStamps = getAllIndividualBrandingStamps();
  // Fetch profile overrides from D1; gracefully falls back to static JSON if unavailable
  const { overrides, dynamicMembers } = await fetchProfileOverrides();

  // Merge overrides with static team members
  const mergedStaticMembers = vintageTeamMembers.map((member) =>
    applyProfileOverride(member, overrides.get(member.slug) ?? null),
  );
  const mergedMembers = [...mergedStaticMembers, ...dynamicMembers];

  const membersByDepartment = groupByDepartment(mergedMembers);
  const employeeTestimonials = (
    t.raw("careersPage.data.employeeTestimonials") as Array<{
      id: string;
      name: string;
      title: string;
      role: string;
      quote: string;
      rating: number;
      featured?: boolean;
      date?: string;
      veteranStatus?: boolean;
    }>
  ).map(
    (testimonial) =>
      ({
        ...testimonial,
        type: "employee",
      }) as Testimonial,
  );
  const founderTributeMember = mergedMembers.find(
    (member) => member.slug === "mike-holstein",
  );

  // Define department order matching the leadership structure
  const departmentOrder = [
    "The Upper Brass",
    "Mission Commanders",
    "Field Officers",
    "Special Operations",
    "Logistics Command",
  ];

  const departmentCopy: Record<
    string,
    { subtitle: string; title: string; description: string }
  > = {
    "The Upper Brass": {
      subtitle: t("team.departments.upperBrass.subtitle"),
      title: t("team.departments.upperBrass.title"),
      description: t("team.departments.upperBrass.description"),
    },
    "Mission Commanders": {
      subtitle: t("team.departments.missionCommanders.subtitle"),
      title: t("team.departments.missionCommanders.title"),
      description: t("team.departments.missionCommanders.description"),
    },
    "Field Officers": {
      subtitle: t("team.departments.fieldOfficers.subtitle"),
      title: t("team.departments.fieldOfficers.title"),
      description: t("team.departments.fieldOfficers.description"),
    },
    "Special Operations": {
      subtitle: t("team.departments.specialOperations.subtitle"),
      title: t("team.departments.specialOperations.title"),
      description: t("team.departments.specialOperations.description"),
    },
    "Logistics Command": {
      subtitle: t("team.departments.logisticsCommand.subtitle"),
      title: t("team.departments.logisticsCommand.title"),
      description: t("team.departments.logisticsCommand.description"),
    },
  };

  return (
    <>
      <PageTrackingClient pageName="Team" />
      <StructuredData
        data={generateBreadcrumbSchema(breadcrumbPatterns.team)}
      />
      <StructuredData data={faqSchema} />

      <div className="bg-gray-50 dark:bg-gray-900 min-h-screen">
        {/* Hero Section */}
        <section
          className="hero-section relative flex items-end justify-end text-white overflow-hidden"
          style={{ height: "calc(100vh - var(--mh-nav-offset, 6.5rem))" }}
        >
          {/* Background - Ready for photo or video */}
          <div className="absolute inset-0 bg-linear-to-br from-gray-900 via-brand-primary to-gray-900">
            <Image
              src="/images/team/mh-construction-team-group-2025.webp"
              alt={t("team.hero.imageAlt")}
              fill
              className="object-cover opacity-35"
              sizes="100vw"
              quality={70}
              priority
            />
            {/* Overlay for text readability */}
            <div className="absolute inset-0 bg-linear-to-br from-brand-primary/30 via-gray-900/60 to-gray-900/80"></div>
          </div>

          {/* Header Text - Bottom Right */}
          <div className="hero-safe-top hero-safe-bottom relative z-30 mx-3 sm:ml-auto sm:mr-5 lg:mr-7 xl:mr-10 mb-4 pointer-events-none transition-opacity duration-300 sm:w-[min(88vw,44rem)] sm:max-w-176">
            <div className="rounded-2xl border border-white/15 bg-gray-900/60 px-4 py-3 shadow-2xl backdrop-blur-md sm:px-6 sm:py-4 lg:px-8 lg:py-5">
              <h1 className="text-right text-lg xs:text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-black text-white leading-tight tracking-tight">
                <span className="block text-brand-secondary text-sm xs:text-base sm:text-lg md:text-xl lg:text-2xl mb-1">
                  {t("team.hero.kicker")}
                </span>
                <span className="block text-brand-secondary">
                  {t("team.hero.titleLine1")}
                </span>
                <span className="block text-brand-primary">
                  {t("team.hero.titleLine2")}
                </span>
                <span className="block text-white/90">
                  {COMPANY_INFO.slogan.primary}
                </span>
                <span className="block text-brand-secondary/90 text-sm xs:text-base sm:text-lg md:text-xl mt-2">
                  {COMPANY_INFO.slogan.secondary}
                </span>
              </h1>
            </div>
          </div>

          {/* Page-Specific Navigation Bar */}
          <PageNavigation
            items={navigationConfigs.team}
            showRemainingPagesOverlay
            className="absolute bottom-0 left-0 right-0"
          />
        </section>

        {/* Breadcrumb Navigation */}
        <Breadcrumb
          items={[
            { label: t("common.back"), href: "/" },
            { label: t("team.hero.breadcrumb") },
          ]}
        />

        <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
          <div className="rounded-2xl border border-brand-secondary/25 bg-linear-to-r from-white via-brand-secondary/5 to-white dark:from-gray-900 dark:via-brand-secondary/15 dark:to-gray-900 p-5 sm:p-6 shadow-sm">
            <p className="text-xs sm:text-sm font-semibold tracking-[0.18em] text-brand-primary uppercase mb-2">
              Leadership Spotlight
            </p>
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-sm sm:text-base text-gray-700 dark:text-gray-200 leading-relaxed">
                Learn more about Jeremy Thamert, Owner &amp; President, and the
                relationship-first leadership model guiding MH Construction.
              </p>
              <Button
                asChild
                variant="secondary"
                size="sm"
                className="shrink-0"
              >
                <Link href="/jeremy-thamert">
                  <MaterialIcon icon="person" size="sm" className="mr-2" />
                  View Jeremy Thamert Profile
                </Link>
              </Button>
            </div>
          </div>
        </section>

        <section className="relative bg-white dark:bg-gray-900 py-12 sm:py-16 lg:py-20 xl:py-24 overflow-hidden">
          <DiagonalStripePattern />
          <BrandColorBlobs />

          <div className="relative z-10 mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
            {/* Section Header - Military Construction Standard */}
            <div className="mb-16 sm:mb-20 text-center">
              {/* Icon with decorative lines */}
              <div className="flex items-center justify-center mb-8 gap-4">
                <div className="h-1 w-16 bg-linear-to-r from-transparent to-gray-300 dark:to-gray-600 rounded-full"></div>
                <div className="relative">
                  <div className="absolute -inset-4 bg-linear-to-br from-brand-primary/30 to-brand-primary-dark/30 blur-2xl rounded-full"></div>
                  <div className="relative bg-linear-to-br from-brand-primary via-brand-primary-dark to-brand-primary-darker p-5 rounded-2xl shadow-2xl border-2 border-white/50 dark:border-gray-600">
                    <MaterialIcon
                      icon="groups"
                      size="2xl"
                      className="text-white drop-shadow-lg"
                    />
                  </div>
                </div>
                <div className="h-1 w-16 bg-linear-to-l from-transparent to-gray-300 dark:to-gray-600 rounded-full"></div>
              </div>

              {/* Two-line gradient heading */}
              <h2 className="mb-6 sm:mb-8 font-black text-gray-900 dark:text-white text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-relaxed tracking-tighter overflow-visible">
                <span className="block mb-3 sm:mb-4 font-semibold text-gray-700 dark:text-gray-200 text-xl xs:text-2xl sm:text-3xl md:text-4xl lg:text-5xl tracking-tight overflow-visible py-1">
                  {t("team.overview.subtitle")}
                </span>
                <span className="block bg-linear-to-r from-brand-primary via-brand-secondary to-brand-primary bg-clip-text text-transparent font-black drop-shadow-sm overflow-visible py-2 pb-3 leading-normal">
                  {t("team.overview.title")}
                </span>
              </h2>

              {/* Description with colored keyword highlighting */}
              <p className="mx-auto max-w-5xl font-light text-gray-700 dark:text-gray-300 text-base sm:text-lg md:text-xl lg:text-2xl leading-relaxed tracking-wide px-2">
                {t("team.overview.description")}
              </p>
            </div>

            {/* Team Members by Department - First Two Departments */}
            <div className="space-y-16 sm:space-y-24 md:space-y-32">
              {departmentOrder.slice(0, 2).map((department) => {
                const members = (membersByDepartment[department] ?? []).filter(
                  (member) => member.slug !== "mike-holstein",
                );
                const config = departmentConfig[department] ?? {
                  icon: "groups",
                  id: "team",
                };
                const heading = departmentCopy[department] ?? {
                  subtitle: department,
                  title: department,
                  description: "",
                };
                const hasMembers = members.length > 0;

                return (
                  <div
                    key={department}
                    id={config.id}
                    className="relative scroll-mt-20"
                  >
                    {/* Department header - Military Construction Standard */}
                    <div className="mb-12 sm:mb-14 md:mb-16 text-center">
                      {/* Icon with decorative lines */}
                      <div className="flex items-center justify-center mb-8 gap-4">
                        <div className="h-1 w-16 bg-linear-to-r from-transparent to-gray-300 dark:to-gray-600 rounded-full"></div>
                        <div className="relative">
                          <div className="absolute -inset-4 bg-linear-to-br from-brand-primary/30 to-brand-primary-dark/30 blur-2xl rounded-full"></div>
                          <div className="relative bg-linear-to-br from-brand-primary via-brand-primary-dark to-brand-primary-darker p-5 rounded-2xl shadow-2xl border-2 border-white/50 dark:border-gray-600">
                            <MaterialIcon
                              icon={config.icon}
                              size="2xl"
                              className="text-white drop-shadow-lg"
                            />
                          </div>
                        </div>
                        <div className="h-1 w-16 bg-linear-to-l from-transparent to-gray-300 dark:to-gray-600 rounded-full"></div>
                      </div>

                      <h3 className="mb-6 sm:mb-8 font-black text-gray-900 dark:text-gray-100 text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-relaxed tracking-tighter overflow-visible">
                        <span className="block mb-3 sm:mb-4 font-semibold text-gray-700 dark:text-gray-200 text-xl xs:text-2xl sm:text-3xl md:text-4xl lg:text-5xl tracking-tight overflow-visible py-1">
                          {heading.subtitle}
                        </span>
                        <span className="block bg-linear-to-r from-brand-primary via-brand-secondary to-brand-primary bg-clip-text text-transparent font-black drop-shadow-sm overflow-visible py-2 pb-3 leading-normal">
                          {heading.title}
                        </span>
                      </h3>

                      {/* Description with better styling */}
                      {heading.description && (
                        <p className="mx-auto max-w-5xl font-light text-gray-700 dark:text-gray-300 text-base sm:text-lg md:text-xl lg:text-2xl leading-relaxed tracking-wide px-2">
                          {heading.description}
                        </p>
                      )}
                    </div>

                    {/* Team member profiles */}
                    <div className="space-y-8 sm:space-y-10 md:space-y-12">
                      {hasMembers ? (
                        members.map((member, index) => (
                          <div key={member.slug} className="scroll-reveal">
                            <TeamProfileSection
                              member={member}
                              index={index}
                              brandingStamp={
                                brandingStamps[member.slug] ?? null
                              }
                            />
                          </div>
                        ))
                      ) : (
                        <div className="scroll-reveal rounded-xl border-2 border-brand-primary/20 dark:border-brand-primary/30 bg-white/80 dark:bg-gray-800/80 p-6 sm:p-8 text-center shadow-sm">
                          <p className="text-base sm:text-lg font-semibold text-gray-900 dark:text-gray-100">
                            {t("team.departments.emptyState.title")}
                          </p>
                          <p className="mt-2 text-sm sm:text-base text-gray-600 dark:text-gray-300">
                            {t("team.departments.emptyState.description")}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Employee Testimonials Section - Positioned at 25-30% for SEO */}
        <section
          id="employee-testimonials"
          className="relative bg-white dark:bg-gray-900 py-12 sm:py-16 lg:py-20 xl:py-24 overflow-hidden"
        >
          <div className="relative z-10 mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
            {/* Section Header - Military Construction Standard */}
            <div className="mb-16 sm:mb-20 text-center">
              {/* Icon with decorative lines */}
              <div className="flex items-center justify-center mb-8 gap-4">
                <div className="h-1 w-16 bg-linear-to-r from-transparent to-gray-300 dark:to-gray-600 rounded-full"></div>
                <div className="relative">
                  <div className="absolute -inset-4 bg-linear-to-br from-brand-secondary/30 to-bronze-600/30 blur-2xl rounded-full"></div>
                  <div className="relative bg-linear-to-br from-brand-secondary via-bronze-700 to-bronze-800 p-5 rounded-2xl shadow-2xl border-2 border-white/50 dark:border-gray-600">
                    <MaterialIcon
                      icon="forum"
                      size="2xl"
                      className="text-white drop-shadow-lg"
                    />
                  </div>
                </div>
                <div className="h-1 w-16 bg-linear-to-l from-transparent to-gray-300 dark:to-gray-600 rounded-full"></div>
              </div>

              {/* Two-line gradient heading */}
              <h2 className="mb-6 sm:mb-8 font-black text-gray-900 dark:text-white text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-relaxed tracking-tighter overflow-visible">
                <span className="block mb-3 sm:mb-4 font-semibold text-gray-700 dark:text-gray-200 text-xl xs:text-2xl sm:text-3xl md:text-4xl lg:text-5xl tracking-tight overflow-visible py-1">
                  {t("team.employeeTestimonials.subtitle")}
                </span>
                <span className="block bg-linear-to-r from-brand-primary via-brand-secondary to-brand-primary bg-clip-text text-transparent font-black drop-shadow-sm overflow-visible py-2 pb-3 leading-normal">
                  {t("team.employeeTestimonials.title")}
                </span>
              </h2>

              {/* Description with colored keywords */}
              <p className="mx-auto max-w-5xl font-light text-gray-700 dark:text-gray-300 text-base sm:text-lg md:text-xl lg:text-2xl leading-relaxed tracking-wide px-2">
                {t("team.employeeTestimonials.description")}
              </p>
            </div>

            <TestimonialGrid
              testimonials={employeeTestimonials}
              variant="employee"
              columns={3}
              className="py-0"
            />
          </div>
        </section>

        {/* Remaining Departments - Field Officers and Logistics Command */}
        <section className="relative bg-gray-50 dark:bg-gray-900 py-12 sm:py-16 lg:py-20 xl:py-24 overflow-hidden">
          <div className="relative z-10 mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
            {/* Remaining Team Members by Department */}
            <div className="space-y-16 sm:space-y-24 md:space-y-32">
              {departmentOrder.slice(2).map((department) => {
                const members = (membersByDepartment[department] ?? []).filter(
                  (member) => member.slug !== "mike-holstein",
                );
                const config = departmentConfig[department] ?? {
                  icon: "groups",
                  id: "team",
                };
                const heading = departmentCopy[department] ?? {
                  subtitle: department,
                  title: department,
                  description: "",
                };
                const hasMembers = members.length > 0;

                return (
                  <div
                    key={department}
                    id={config.id}
                    className="relative scroll-mt-20"
                  >
                    {/* Department header - Military Construction Standard */}
                    <div className="mb-12 sm:mb-14 md:mb-16 text-center">
                      {/* Icon with decorative lines */}
                      <div className="flex items-center justify-center mb-8 gap-4">
                        <div className="h-1 w-16 bg-linear-to-r from-transparent to-gray-300 dark:to-gray-600 rounded-full"></div>
                        <div className="relative">
                          <div className="absolute -inset-4 bg-linear-to-br from-brand-primary/30 to-brand-primary-dark/30 blur-2xl rounded-full"></div>
                          <div className="relative bg-linear-to-br from-brand-primary via-brand-primary-dark to-brand-primary-darker p-5 rounded-2xl shadow-2xl border-2 border-white/50 dark:border-gray-600">
                            <MaterialIcon
                              icon={config.icon}
                              size="2xl"
                              className="text-white drop-shadow-lg"
                            />
                          </div>
                        </div>
                        <div className="h-1 w-16 bg-linear-to-l from-transparent to-gray-300 dark:to-gray-600 rounded-full"></div>
                      </div>

                      <h3 className="mb-6 sm:mb-8 font-black text-gray-900 dark:text-gray-100 text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-relaxed tracking-tighter overflow-visible">
                        <span className="block mb-3 sm:mb-4 font-semibold text-gray-700 dark:text-gray-200 text-xl xs:text-2xl sm:text-3xl md:text-4xl lg:text-5xl tracking-tight overflow-visible py-1">
                          {heading.subtitle}
                        </span>
                        <span className="block bg-linear-to-r from-brand-primary via-brand-secondary to-brand-primary bg-clip-text text-transparent font-black drop-shadow-sm overflow-visible py-2 pb-3 leading-normal">
                          {heading.title}
                        </span>
                      </h3>

                      {/* Description with better styling */}
                      {heading.description && (
                        <p className="mx-auto max-w-5xl font-light text-gray-700 dark:text-gray-300 text-base sm:text-lg md:text-xl lg:text-2xl leading-relaxed tracking-wide px-2">
                          {heading.description}
                        </p>
                      )}
                    </div>

                    {/* Team member profiles */}
                    <div className="space-y-8 sm:space-y-10 md:space-y-12">
                      {hasMembers ? (
                        members.map((member, index) => (
                          <div key={member.slug} className="scroll-reveal">
                            <TeamProfileSection
                              member={member}
                              index={index}
                              brandingStamp={
                                brandingStamps[member.slug] ?? null
                              }
                            />
                          </div>
                        ))
                      ) : (
                        <div className="scroll-reveal rounded-xl border-2 border-brand-primary/20 dark:border-brand-primary/30 bg-white/80 dark:bg-gray-800/80 p-6 sm:p-8 text-center shadow-sm">
                          <p className="text-base sm:text-lg font-semibold text-gray-900 dark:text-gray-100">
                            {t("team.departments.emptyState.title")}
                          </p>
                          <p className="mt-2 text-sm sm:text-base text-gray-600 dark:text-gray-300">
                            {t("team.departments.emptyState.description")}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Company Culture Section */}
            <div
              id="company-culture"
              className="mt-12 sm:mt-16 md:mt-20 lg:mt-24"
            >
              {/* Section Header - Military Construction Standard */}
              <div className="mb-16 sm:mb-20 text-center">
                {/* Icon with decorative lines */}
                <div className="flex items-center justify-center mb-8 gap-4">
                  <div className="h-1 w-16 bg-linear-to-r from-transparent to-gray-300 dark:to-gray-600 rounded-full"></div>
                  <div className="relative">
                    <div className="absolute -inset-4 bg-linear-to-br from-brand-secondary/30 to-bronze-600/30 blur-2xl rounded-full"></div>
                    <div className="relative bg-linear-to-br from-brand-secondary via-bronze-700 to-bronze-800 p-5 rounded-2xl shadow-2xl border-2 border-white/50 dark:border-gray-600">
                      <MaterialIcon
                        icon="diversity_3"
                        size="2xl"
                        className="text-white drop-shadow-lg"
                      />
                    </div>
                  </div>
                  <div className="h-1 w-16 bg-linear-to-l from-transparent to-gray-300 dark:to-gray-600 rounded-full"></div>
                </div>

                {/* Two-line gradient heading */}
                <h2 className="mb-6 sm:mb-8 font-black text-gray-900 dark:text-white text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-relaxed tracking-tighter overflow-visible">
                  <span className="block mb-3 sm:mb-4 font-semibold text-gray-700 dark:text-gray-200 text-xl xs:text-2xl sm:text-3xl md:text-4xl lg:text-5xl tracking-tight overflow-visible py-1">
                    {t("team.culture.subtitle")}
                  </span>
                  <span className="block bg-linear-to-r from-brand-primary via-brand-secondary to-brand-primary bg-clip-text text-transparent font-black drop-shadow-sm overflow-visible py-2 pb-3 leading-normal">
                    {t("team.culture.title")}
                  </span>
                </h2>

                {/* Description with colored keyword highlighting */}
                <p className="mx-auto max-w-5xl font-light text-gray-700 dark:text-gray-300 text-base sm:text-lg md:text-xl lg:text-2xl leading-relaxed tracking-wide px-2">
                  {t("team.culture.description")}
                </p>
              </div>

              <div className="gap-6 sm:gap-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mb-12">
                {/* Team Unity */}
                <div className="scroll-reveal">
                  <div className="group relative flex h-full">
                    {/* Animated Border Glow */}
                    <div className="absolute -inset-2 bg-linear-to-br from-brand-primary/40 to-brand-primary-dark/40 rounded-2xl opacity-20 group-hover:opacity-100 blur-xl transition-all duration-500"></div>

                    <Card className="relative flex w-full flex-col overflow-hidden border-2 border-gray-200 bg-white shadow-lg transition-all duration-300 group-hover:border-transparent group-hover:shadow-2xl dark:border-gray-700 dark:bg-gray-800">
                      {/* Top Accent Bar */}
                      <div className="h-2 bg-linear-to-r from-brand-primary via-brand-primary-dark to-brand-primary-darker"></div>

                      <div className="p-8 flex flex-col flex-1">
                        <div className="relative inline-block mx-auto mb-6">
                          <GlowEffect
                            gradient="primary-dark"
                            opacity={30}
                            animate={false}
                          />
                          <IconContainer size="md" gradient="primary">
                            <MaterialIcon
                              icon="groups"
                              size="lg"
                              className="text-white drop-shadow-lg"
                            />
                          </IconContainer>
                        </div>
                        <h3 className="mb-4 font-bold text-gray-900 dark:text-white text-xl sm:text-2xl text-center">
                          {t("team.culture.cards.teamUnity.title")}
                        </h3>
                        <p className="text-gray-600 dark:text-gray-300 text-center leading-relaxed grow">
                          {t("team.culture.cards.teamUnity.description")}
                        </p>
                      </div>
                    </Card>
                  </div>
                </div>

                {/* Mutual Support */}
                <div className="scroll-reveal">
                  <div className="group relative flex h-full">
                    {/* Animated Border Glow */}
                    <GlowEffect gradient="bronze" />

                    <Card className="relative flex w-full flex-col overflow-hidden border-2 border-gray-200 bg-white shadow-lg transition-all duration-300 group-hover:border-transparent group-hover:shadow-2xl dark:border-gray-700 dark:bg-gray-800">
                      {/* Top Accent Bar */}
                      <div className="h-2 bg-linear-to-r from-brand-secondary via-bronze-700 to-bronze-800"></div>

                      <div className="p-8 flex flex-col flex-1">
                        <div className="relative inline-block mx-auto mb-6">
                          <GlowEffect
                            gradient="bronze"
                            opacity={30}
                            animate={false}
                          />
                          <IconContainer size="md" gradient="secondary">
                            <MaterialIcon
                              icon="volunteer_activism"
                              size="lg"
                              theme="tactical"
                              ariaLabel={t(
                                "team.culture.cards.mutualSupport.iconAria",
                              )}
                              className="text-white drop-shadow-lg"
                            />
                          </IconContainer>
                        </div>
                        <h3 className="mb-4 font-bold text-gray-900 dark:text-white text-xl sm:text-2xl text-center">
                          {t("team.culture.cards.mutualSupport.title")}
                        </h3>
                        <p className="text-gray-600 dark:text-gray-300 text-center leading-relaxed grow">
                          {t("team.culture.cards.mutualSupport.description")}
                        </p>
                      </div>
                    </Card>
                  </div>
                </div>

                {/* Shared Success */}
                <div className="scroll-reveal">
                  <div className="group relative flex h-full">
                    {/* Animated Border Glow */}
                    <GlowEffect gradient="primary-dark" />

                    <Card className="relative flex w-full flex-col overflow-hidden border-2 border-gray-200 bg-white shadow-lg transition-all duration-300 group-hover:border-transparent group-hover:shadow-2xl dark:border-gray-700 dark:bg-gray-800">
                      {/* Top Accent Bar */}
                      <div className="h-2 bg-linear-to-r from-brand-primary via-brand-primary-dark to-brand-primary-darker"></div>

                      <div className="p-8 flex flex-col flex-1">
                        <div className="relative inline-block mx-auto mb-6">
                          <GlowEffect
                            gradient="primary-dark"
                            opacity={30}
                            animate={false}
                          />
                          <IconContainer size="md" gradient="primary">
                            <MaterialIcon
                              icon="military_tech"
                              size="lg"
                              className="text-white drop-shadow-lg"
                            />
                          </IconContainer>
                        </div>
                        <h3 className="mb-4 font-bold text-gray-900 dark:text-white text-xl sm:text-2xl text-center">
                          {t("team.culture.cards.sharedSuccess.title")}
                        </h3>
                        <p className="text-gray-600 dark:text-gray-300 text-center leading-relaxed grow">
                          {t("team.culture.cards.sharedSuccess.description")}
                        </p>
                      </div>
                    </Card>
                  </div>
                </div>
              </div>

              {/* Culture Highlights - Enhanced */}
              <div className="relative bg-linear-to-br from-white via-gray-50 to-white dark:from-gray-800 dark:via-gray-800/95 dark:to-gray-800 shadow-2xl p-8 sm:p-10 md:p-12 rounded-2xl border-2 border-brand-secondary/10 dark:border-brand-secondary/20 overflow-hidden">
                {/* Decorative background elements */}
                <div className="absolute top-0 right-0 w-96 h-96 bg-linear-to-br from-brand-secondary/5 to-transparent rounded-full blur-3xl"></div>
                <div className="absolute bottom-0 left-0 w-96 h-96 bg-linear-to-tr from-brand-primary/5 to-transparent rounded-full blur-3xl"></div>

                <div className="relative z-10">
                  {/* Enhanced heading */}
                  <div className="flex flex-col items-center mb-10">
                    <div className="mb-6 p-4 bg-linear-to-br from-brand-secondary to-bronze-700 rounded-2xl shadow-lg">
                      <MaterialIcon
                        icon="diversity_3"
                        size="xl"
                        className="text-white"
                        ariaLabel={t("team.culture.highlights.iconAria")}
                      />
                    </div>
                    <h3 className="font-black text-gray-900 dark:text-white text-3xl sm:text-4xl md:text-5xl leading-tight tracking-tight text-center">
                      <span className="block mb-2 text-gray-700 dark:text-gray-300 text-xl sm:text-2xl md:text-3xl font-semibold">
                        {t("team.culture.highlights.headingSubtitle")}
                      </span>
                      <span className="block bg-linear-to-r from-brand-secondary via-brand-primary to-brand-secondary bg-clip-text text-transparent">
                        {t("team.culture.highlights.headingTitle")}
                      </span>
                    </h3>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
                    <div className="space-y-6">
                      <div className="group flex items-start space-x-4 p-4 rounded-lg hover:bg-white/50 dark:hover:bg-gray-700/30 transition-colors duration-300">
                        <div className="flex shrink-0 justify-center items-center bg-linear-to-br from-brand-primary to-brand-primary-dark rounded-full w-10 h-10 shadow-md transition-colors duration-300">
                          <MaterialIcon
                            icon="military_tech"
                            size="sm"
                            className="text-white"
                          />
                        </div>
                        <div>
                          <h4 className="mb-2 font-bold text-gray-900 dark:text-white text-lg group-hover:text-brand-primary dark:group-hover:text-brand-primary-light transition-colors duration-300">
                            {t(
                              "team.culture.highlights.items.veteranDiscipline.title",
                            )}
                          </h4>
                          <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                            {t(
                              "team.culture.highlights.items.veteranDiscipline.description",
                            )}
                          </p>
                        </div>
                      </div>
                      <div className="group flex items-start space-x-4 p-4 rounded-lg hover:bg-white/50 dark:hover:bg-gray-700/30 transition-colors duration-300">
                        <div className="flex shrink-0 justify-center items-center bg-linear-to-br from-brand-primary to-brand-primary-dark rounded-full w-10 h-10 shadow-md transition-colors duration-300">
                          <MaterialIcon
                            icon="forum"
                            size="sm"
                            className="text-white"
                          />
                        </div>
                        <div>
                          <h4 className="mb-2 font-bold text-gray-900 dark:text-white text-lg group-hover:text-brand-primary dark:group-hover:text-brand-primary-light transition-colors duration-300">
                            {t(
                              "team.culture.highlights.items.communication.title",
                            )}
                          </h4>
                          <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                            {t(
                              "team.culture.highlights.items.communication.description",
                            )}
                          </p>
                        </div>
                      </div>
                      <div className="group flex items-start space-x-4 p-4 rounded-lg hover:bg-white/50 dark:hover:bg-gray-700/30 transition-colors duration-300">
                        <div className="flex shrink-0 justify-center items-center bg-linear-to-br from-brand-primary to-brand-primary-dark rounded-full w-10 h-10 shadow-md transition-colors duration-300">
                          <MaterialIcon
                            icon="verified_user"
                            size="sm"
                            className="text-white"
                          />
                        </div>
                        <div>
                          <h4 className="mb-2 font-bold text-gray-900 dark:text-white text-lg group-hover:text-brand-primary dark:group-hover:text-brand-primary-light transition-colors duration-300">
                            {t("team.culture.highlights.items.safety.title")}
                          </h4>
                          <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                            {t(
                              "team.culture.highlights.items.safety.description",
                            )}
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="space-y-6">
                      <div className="group flex items-start space-x-4 p-4 rounded-lg hover:bg-white/50 dark:hover:bg-gray-700/30 transition-colors duration-300">
                        <div className="flex shrink-0 justify-center items-center bg-linear-to-br from-brand-secondary to-bronze-700 rounded-full w-10 h-10 shadow-md transition-colors duration-300">
                          <MaterialIcon
                            icon="location_city"
                            size="sm"
                            className="text-white"
                          />
                        </div>
                        <div>
                          <h4 className="mb-2 font-bold text-gray-900 dark:text-white text-lg group-hover:text-brand-secondary dark:group-hover:text-brand-secondary-light transition-colors duration-300">
                            {t("team.culture.highlights.items.community.title")}
                          </h4>
                          <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                            {t(
                              "team.culture.highlights.items.community.description",
                            )}
                          </p>
                        </div>
                      </div>
                      <div className="group flex items-start space-x-4 p-4 rounded-lg hover:bg-white/50 dark:hover:bg-gray-700/30 transition-colors duration-300">
                        <div className="flex shrink-0 justify-center items-center bg-linear-to-br from-brand-secondary to-bronze-700 rounded-full w-10 h-10 shadow-md transition-colors duration-300">
                          <MaterialIcon
                            icon="balance"
                            size="sm"
                            className="text-white"
                          />
                        </div>
                        <div>
                          <h4 className="mb-2 font-bold text-gray-900 dark:text-white text-lg group-hover:text-brand-secondary dark:group-hover:text-brand-secondary-light transition-colors duration-300">
                            {t("team.culture.highlights.items.balance.title")}
                          </h4>
                          <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                            {t(
                              "team.culture.highlights.items.balance.description",
                            )}
                          </p>
                        </div>
                      </div>
                      <div className="group flex items-start space-x-4 p-4 rounded-lg hover:bg-white/50 dark:hover:bg-gray-700/30 transition-colors duration-300">
                        <div className="flex shrink-0 justify-center items-center bg-linear-to-br from-brand-secondary to-bronze-700 rounded-full w-10 h-10 shadow-md transition-colors duration-300">
                          <MaterialIcon
                            icon="handshake"
                            size="sm"
                            className="text-white"
                          />
                        </div>
                        <div>
                          <h4 className="mb-2 font-bold text-gray-900 dark:text-white text-lg group-hover:text-brand-secondary dark:group-hover:text-brand-secondary-light transition-colors duration-300">
                            {t(
                              "team.culture.highlights.items.relationships.title",
                            )}
                          </h4>
                          <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                            {t(
                              "team.culture.highlights.items.relationships.description",
                            )}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Quote Section */}
              <div className="mt-8 sm:mt-10 md:mt-12 text-center px-2">
                <blockquote className="mb-4 font-medium text-brand-primary text-lg sm:text-xl md:text-2xl italic">
                  {t("team.culture.quote.text")}
                </blockquote>
                <cite className="font-semibold text-brand-secondary">
                  {t("team.culture.quote.author")}
                </cite>
              </div>
            </div>

            {/* Career Growth Section */}
            <div
              id="career-growth"
              className="mt-12 sm:mt-16 md:mt-20 lg:mt-24"
            >
              {/* Section Header - Military Construction Standard */}
              <div className="mb-16 sm:mb-20 text-center">
                {/* Icon with decorative lines */}
                <div className="flex items-center justify-center mb-8 gap-4">
                  <div className="h-1 w-16 bg-linear-to-r from-transparent to-gray-300 dark:to-gray-600 rounded-full"></div>
                  <div className="relative">
                    <div className="absolute -inset-4 bg-linear-to-br from-brand-secondary/30 to-bronze-700/30 blur-2xl rounded-full"></div>
                    <div className="relative bg-linear-to-br from-brand-secondary via-bronze-700 to-bronze-800 p-5 rounded-2xl shadow-2xl border-2 border-white/50 dark:border-gray-600">
                      <MaterialIcon
                        icon="school"
                        size="2xl"
                        className="text-white drop-shadow-lg"
                      />
                    </div>
                  </div>
                  <div className="h-1 w-16 bg-linear-to-l from-transparent to-gray-300 dark:to-gray-600 rounded-full"></div>
                </div>

                {/* Two-line gradient heading */}
                <h2 className="mb-6 sm:mb-8 font-black text-gray-900 dark:text-white text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-relaxed tracking-tighter overflow-visible">
                  <span className="block mb-3 sm:mb-4 font-semibold text-gray-700 dark:text-gray-200 text-xl xs:text-2xl sm:text-3xl md:text-4xl lg:text-5xl tracking-tight overflow-visible py-1">
                    {t("team.careerGrowth.subtitle")}
                  </span>
                  <span className="block bg-linear-to-r from-brand-primary via-brand-secondary to-brand-primary bg-clip-text text-transparent font-black drop-shadow-sm overflow-visible py-2 pb-3 leading-normal">
                    {t("team.careerGrowth.title")}
                  </span>
                </h2>

                {/* Description with colored keyword highlighting */}
                <p className="mx-auto max-w-5xl font-light text-gray-700 dark:text-gray-300 text-base sm:text-lg md:text-xl lg:text-2xl leading-relaxed tracking-wide px-2">
                  {t("team.careerGrowth.description")}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mb-12">
                {/* Continuous Training */}
                <div className="scroll-reveal">
                  <div className="group relative flex h-full">
                    {/* Animated Border Glow */}
                    <GlowEffect gradient="primary-dark" />

                    <Card className="relative flex w-full flex-col overflow-hidden border-2 border-gray-200 bg-white shadow-lg transition-all duration-300 group-hover:border-transparent group-hover:shadow-2xl dark:border-gray-700 dark:bg-gray-800">
                      {/* Top Accent Bar */}
                      <div className="h-2 bg-linear-to-r from-brand-primary via-brand-primary-dark to-brand-primary-darker"></div>

                      <div className="p-8 flex flex-col flex-1">
                        <div className="relative inline-block mx-auto mb-6">
                          <GlowEffect
                            gradient="primary-dark"
                            opacity={30}
                            animate={false}
                          />
                          <IconContainer size="md" gradient="primary">
                            <MaterialIcon
                              icon="school"
                              size="lg"
                              className="text-white drop-shadow-lg"
                            />
                          </IconContainer>
                        </div>
                        <h3 className="mb-4 font-bold text-gray-900 dark:text-white text-xl sm:text-2xl text-center">
                          {t(
                            "team.careerGrowth.cards.continuousTraining.title",
                          )}
                        </h3>
                        <p className="text-gray-600 dark:text-gray-300 text-center leading-relaxed grow">
                          {t(
                            "team.careerGrowth.cards.continuousTraining.description",
                          )}
                        </p>
                      </div>
                    </Card>
                  </div>
                </div>

                {/* Cross-Training */}
                <div className="scroll-reveal">
                  <div className="group relative flex h-full">
                    {/* Animated Border Glow */}
                    <GlowEffect gradient="primary-dark" />

                    <Card className="relative flex w-full flex-col overflow-hidden border-2 border-gray-200 bg-white shadow-lg transition-all duration-300 group-hover:border-transparent group-hover:shadow-2xl dark:border-gray-700 dark:bg-gray-800">
                      {/* Top Accent Bar */}
                      <div className="h-2 bg-linear-to-r from-brand-primary via-brand-primary-dark to-brand-primary-darker"></div>

                      <div className="p-8 flex flex-col flex-1">
                        <div className="relative inline-block mx-auto mb-6">
                          <GlowEffect
                            gradient="primary-dark"
                            opacity={30}
                            animate={false}
                          />
                          <IconContainer size="md" gradient="primary">
                            <MaterialIcon
                              icon="sync_alt"
                              size="lg"
                              ariaLabel={t(
                                "team.careerGrowth.cards.crossTraining.iconAria",
                              )}
                              className="text-white drop-shadow-lg"
                            />
                          </IconContainer>
                        </div>
                        <h3 className="mb-4 font-bold text-gray-900 dark:text-white text-xl sm:text-2xl text-center">
                          {t("team.careerGrowth.cards.crossTraining.title")}
                        </h3>
                        <p className="text-gray-600 dark:text-gray-300 text-center leading-relaxed grow">
                          {t(
                            "team.careerGrowth.cards.crossTraining.description",
                          )}
                        </p>
                      </div>
                    </Card>
                  </div>
                </div>

                {/* Mentorship */}
                <div className="scroll-reveal">
                  <div className="group relative flex h-full">
                    {/* Animated Border Glow */}
                    <GlowEffect gradient="bronze" />

                    <Card className="relative flex w-full flex-col overflow-hidden border-2 border-gray-200 bg-white shadow-lg transition-all duration-300 group-hover:border-transparent group-hover:shadow-2xl dark:border-gray-700 dark:bg-gray-800">
                      {/* Top Accent Bar */}
                      <div className="h-2 bg-linear-to-r from-brand-secondary via-bronze-700 to-bronze-800"></div>

                      <div className="p-8 flex flex-col flex-1">
                        <div className="relative inline-block mx-auto mb-6">
                          <GlowEffect
                            gradient="bronze"
                            opacity={30}
                            animate={false}
                          />
                          <IconContainer size="md" gradient="bronze">
                            <MaterialIcon
                              icon="supervisor_account"
                              size="lg"
                              ariaLabel={t(
                                "team.careerGrowth.cards.mentorship.iconAria",
                              )}
                              className="text-white drop-shadow-lg"
                            />
                          </IconContainer>
                        </div>
                        <h3 className="mb-4 font-bold text-gray-900 dark:text-white text-xl sm:text-2xl text-center">
                          {t("team.careerGrowth.cards.mentorship.title")}
                        </h3>
                        <p className="text-gray-600 dark:text-gray-300 text-center leading-relaxed grow">
                          {t("team.careerGrowth.cards.mentorship.description")}
                        </p>
                      </div>
                    </Card>
                  </div>
                </div>

                {/* Career Paths */}
                <div className="scroll-reveal">
                  <div className="group relative flex h-full">
                    {/* Animated Border Glow */}
                    <GlowEffect gradient="primary-dark" />

                    <Card className="relative flex w-full flex-col overflow-hidden border-2 border-gray-200 bg-white shadow-lg transition-all duration-300 group-hover:border-transparent group-hover:shadow-2xl dark:border-gray-700 dark:bg-gray-800">
                      {/* Top Accent Bar */}
                      <div className="h-2 bg-linear-to-r from-brand-primary via-brand-primary-dark to-brand-primary-darker"></div>

                      <div className="p-8 flex flex-col flex-1">
                        <div className="relative inline-block mx-auto mb-6">
                          <GlowEffect
                            gradient="primary-dark"
                            opacity={30}
                            animate={false}
                          />
                          <IconContainer size="md" gradient="primary">
                            <MaterialIcon
                              icon="trending_up"
                              size="lg"
                              className="text-white drop-shadow-lg"
                            />
                          </IconContainer>
                        </div>
                        <h3 className="mb-4 font-bold text-gray-900 dark:text-white text-xl sm:text-2xl text-center">
                          {t("team.careerGrowth.cards.careerPaths.title")}
                        </h3>
                        <p className="text-gray-600 dark:text-gray-300 text-center leading-relaxed grow">
                          {t("team.careerGrowth.cards.careerPaths.description")}
                        </p>
                      </div>
                    </Card>
                  </div>
                </div>

                {/* Leadership Development */}
                <div className="scroll-reveal">
                  <div className="group relative flex h-full">
                    {/* Animated Border Glow */}
                    <GlowEffect gradient="primary-dark" />

                    <Card className="relative flex w-full flex-col overflow-hidden border-2 border-gray-200 bg-white shadow-lg transition-all duration-300 group-hover:border-transparent group-hover:shadow-2xl dark:border-gray-700 dark:bg-gray-800">
                      {/* Top Accent Bar */}
                      <div className="h-2 bg-linear-to-r from-brand-primary via-brand-primary-dark to-brand-primary-darker"></div>

                      <div className="p-8 flex flex-col flex-1">
                        <div className="relative inline-block mx-auto mb-6">
                          <GlowEffect
                            gradient="primary-dark"
                            opacity={30}
                            animate={false}
                          />
                          <IconContainer size="md" gradient="primary">
                            <MaterialIcon
                              icon="badge"
                              size="lg"
                              ariaLabel={t(
                                "team.careerGrowth.cards.leadershipDevelopment.iconAria",
                              )}
                              className="text-white drop-shadow-lg"
                            />
                          </IconContainer>
                        </div>
                        <h3 className="mb-4 font-bold text-gray-900 dark:text-white text-xl sm:text-2xl text-center">
                          {t(
                            "team.careerGrowth.cards.leadershipDevelopment.title",
                          )}
                        </h3>
                        <p className="text-gray-600 dark:text-gray-300 text-center leading-relaxed grow">
                          {t(
                            "team.careerGrowth.cards.leadershipDevelopment.description",
                          )}
                        </p>
                      </div>
                    </Card>
                  </div>
                </div>

                {/* Industry Involvement */}
                <div className="scroll-reveal">
                  <div className="group relative flex h-full">
                    {/* Animated Border Glow */}
                    <GlowEffect gradient="bronze" />

                    <Card className="relative flex w-full flex-col overflow-hidden border-2 border-gray-200 bg-white shadow-lg transition-all duration-300 group-hover:border-transparent group-hover:shadow-2xl dark:border-gray-700 dark:bg-gray-800">
                      {/* Top Accent Bar */}
                      <div className="h-2 bg-linear-to-r from-brand-secondary via-bronze-700 to-bronze-800"></div>

                      <div className="p-8 flex flex-col flex-1">
                        <div className="relative inline-block mx-auto mb-6">
                          <GlowEffect
                            gradient="bronze"
                            opacity={30}
                            animate={false}
                          />
                          <IconContainer size="md" gradient="bronze">
                            <MaterialIcon
                              icon="connect_without_contact"
                              size="lg"
                              ariaLabel={t(
                                "team.careerGrowth.cards.industryInvolvement.iconAria",
                              )}
                              className="text-white drop-shadow-lg"
                            />
                          </IconContainer>
                        </div>
                        <h3 className="mb-4 font-bold text-gray-900 dark:text-white text-xl sm:text-2xl text-center">
                          {t(
                            "team.careerGrowth.cards.industryInvolvement.title",
                          )}
                        </h3>
                        <p className="text-gray-600 dark:text-gray-300 text-center leading-relaxed grow">
                          {t(
                            "team.careerGrowth.cards.industryInvolvement.description",
                          )}
                        </p>
                      </div>
                    </Card>
                  </div>
                </div>
              </div>

              {/* Investment in Your Success - Enhanced Stats */}
              <div className="relative bg-linear-to-br from-white via-gray-50 to-white dark:from-gray-800 dark:via-gray-800/95 dark:to-gray-800 shadow-2xl p-8 sm:p-10 md:p-12 rounded-2xl border-2 border-brand-primary/10 dark:border-brand-primary/20 overflow-hidden">
                {/* Decorative background elements */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-linear-to-br from-brand-primary/5 to-transparent rounded-full blur-3xl"></div>
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-linear-to-tr from-brand-secondary/5 to-transparent rounded-full blur-3xl"></div>

                <div className="relative z-10">
                  {/* Icon and heading */}
                  <div className="flex flex-col items-center mb-10">
                    <div className="mb-6 p-4 bg-linear-to-br from-brand-primary to-brand-primary-dark rounded-2xl shadow-lg">
                      <MaterialIcon
                        icon="trending_up"
                        size="xl"
                        className="text-white"
                        ariaLabel={t("team.careerGrowth.investment.iconAria")}
                      />
                    </div>
                    <h3 className="font-black text-gray-900 dark:text-white text-3xl sm:text-4xl md:text-5xl leading-tight tracking-tight text-center">
                      <span className="block mb-2 text-gray-700 dark:text-gray-300 text-xl sm:text-2xl md:text-3xl font-semibold">
                        {t("team.careerGrowth.investment.headingSubtitle")}
                      </span>
                      <span className="block bg-linear-to-r from-brand-primary via-brand-secondary to-brand-primary bg-clip-text text-transparent">
                        {t("team.careerGrowth.investment.headingTitle")}
                      </span>
                    </h3>
                  </div>

                  {/* Stats Grid */}
                  <div className="gap-6 sm:gap-8 grid grid-cols-2 lg:grid-cols-4">
                    {/* Stat 1 */}
                    <div className="group text-center p-6 bg-white dark:bg-gray-800/50 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700">
                      <div className="mb-3 flex justify-center">
                        <div className="p-3 bg-linear-to-br from-brand-primary/10 to-brand-primary/5 rounded-lg group-hover:from-brand-primary/20 group-hover:to-brand-primary/10 transition-colors duration-300">
                          <MaterialIcon
                            icon="military_tech"
                            size="lg"
                            className="text-brand-primary"
                          />
                        </div>
                      </div>
                      <p className="font-black text-3xl sm:text-4xl md:text-5xl bg-linear-to-br from-brand-primary to-brand-primary-dark bg-clip-text text-transparent mb-2 transition-colors duration-300">
                        150+
                      </p>
                      <p className="text-gray-600 dark:text-gray-300 text-sm sm:text-base font-medium">
                        {t(
                          "team.careerGrowth.investment.stats.experience.line1",
                        )}
                        <br />
                        {t(
                          "team.careerGrowth.investment.stats.experience.line2",
                        )}
                      </p>
                    </div>

                    {/* Stat 2 */}
                    <div className="group text-center p-6 bg-white dark:bg-gray-800/50 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700">
                      <div className="mb-3 flex justify-center">
                        <div className="p-3 bg-linear-to-br from-brand-secondary/10 to-brand-secondary/5 rounded-lg group-hover:from-brand-secondary/20 group-hover:to-brand-secondary/10 transition-colors duration-300">
                          <MaterialIcon
                            icon="paid"
                            size="lg"
                            className="text-brand-secondary"
                          />
                        </div>
                      </div>
                      <p className="font-black text-3xl sm:text-4xl md:text-5xl bg-linear-to-br from-brand-secondary to-bronze-700 bg-clip-text text-transparent mb-2 transition-colors duration-300">
                        100%
                      </p>
                      <p className="text-gray-600 dark:text-gray-300 text-sm sm:text-base font-medium">
                        {t(
                          "team.careerGrowth.investment.stats.trainingFunding.line1",
                        )}
                        <br />
                        {t(
                          "team.careerGrowth.investment.stats.trainingFunding.line2",
                        )}
                      </p>
                    </div>

                    {/* Stat 3 - AGC Awards */}
                    <div className="group text-center p-6 bg-white dark:bg-gray-800/50 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700">
                      <div className="mb-3 flex justify-center">
                        <div className="p-3 bg-linear-to-br from-brand-primary/10 to-brand-primary/5 rounded-lg group-hover:from-brand-primary/20 group-hover:to-brand-primary/10 transition-colors duration-300">
                          <MaterialIcon
                            icon="emoji_events"
                            size="lg"
                            className="text-brand-primary"
                          />
                        </div>
                      </div>
                      <p className="font-black text-2xl sm:text-3xl md:text-4xl bg-linear-to-br from-brand-primary to-brand-primary-dark bg-clip-text text-transparent mb-2 transition-colors duration-300">
                        AGC-WA
                      </p>
                      <p className="text-gray-600 dark:text-gray-300 text-sm sm:text-base font-medium">
                        {t("team.careerGrowth.investment.stats.awards.line1")}
                        <br />
                        {t("team.careerGrowth.investment.stats.awards.line2")}
                      </p>
                    </div>

                    {/* Stat 4 - Years in Business */}
                    <div className="group text-center p-6 bg-white dark:bg-gray-800/50 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700">
                      <div className="mb-3 flex justify-center">
                        <div className="p-3 bg-linear-to-br from-brand-secondary/10 to-brand-secondary/5 rounded-lg group-hover:from-brand-secondary/20 group-hover:to-brand-secondary/10 transition-colors duration-300">
                          <MaterialIcon
                            icon="business"
                            size="lg"
                            className="text-brand-secondary"
                          />
                        </div>
                      </div>
                      <p className="font-black text-3xl sm:text-4xl md:text-5xl bg-linear-to-br from-brand-secondary to-bronze-700 bg-clip-text text-transparent mb-2 transition-colors duration-300">
                        15+
                      </p>
                      <p className="text-gray-600 dark:text-gray-300 text-sm sm:text-base font-medium">
                        {t(
                          "team.careerGrowth.investment.stats.yearsBusiness.line1",
                        )}
                        <br />
                        {t(
                          "team.careerGrowth.investment.stats.yearsBusiness.line2",
                        )}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Call to Action - Careers Link */}
            <div className="mt-12 sm:mt-16 md:mt-20 text-center">
              <div className="bg-white dark:bg-gray-800 shadow-xl mx-auto p-6 sm:p-7 md:p-8 border border-brand-secondary rounded-lg max-w-2xl">
                {/* Section Header - v4.0.2 Clean Standards */}
                <h3 className="mb-6 font-black text-gray-900 dark:text-white text-3xl sm:text-4xl md:text-5xl leading-tight tracking-tight">
                  <span className="block mb-2 text-gray-700 dark:text-gray-300">
                    {t("team.careersCta.subtitle")}
                  </span>
                  <span className="block text-brand-primary">
                    {t("team.careersCta.title")}
                  </span>
                </h3>
                <p className="mb-6 font-light text-gray-600 dark:text-gray-300 text-base sm:text-lg leading-relaxed">
                  {t("team.careersCta.description")}
                </p>
                <Button
                  variant="primary"
                  size="lg"
                  className="transition-all duration-300 w-full sm:w-auto sm:min-w-70"
                  asChild
                >
                  <Link href="/careers" prefetch={false}>
                    <MaterialIcon icon="work" size="lg" className="mr-3" />
                    <span className="font-medium">
                      {t("team.careersCta.button")}
                    </span>
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {founderTributeMember && (
          <section
            id="founder-tribute"
            className="relative bg-white dark:bg-gray-900 py-12 sm:py-16 lg:py-20 xl:py-24 overflow-hidden"
          >
            <DiagonalStripePattern />
            <BrandColorBlobs />

            <div className="relative z-10 mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
              <div className="mb-12 sm:mb-14 md:mb-16 text-center">
                <div className="flex items-center justify-center mb-8 gap-4">
                  <div className="h-1 w-16 bg-linear-to-r from-transparent to-gray-300 dark:to-gray-600 rounded-full"></div>
                  <div className="relative">
                    <div className="absolute -inset-4 bg-linear-to-br from-brand-secondary/30 to-bronze-700/30 blur-2xl rounded-full"></div>
                    <div className="relative bg-linear-to-br from-brand-secondary via-bronze-700 to-bronze-800 p-5 rounded-2xl shadow-2xl border-2 border-white/50 dark:border-gray-600">
                      <MaterialIcon
                        icon="foundation"
                        size="2xl"
                        className="text-white drop-shadow-lg"
                      />
                    </div>
                  </div>
                  <div className="h-1 w-16 bg-linear-to-l from-transparent to-gray-300 dark:to-gray-600 rounded-full"></div>
                </div>

                <h3 className="mb-6 sm:mb-8 font-black text-gray-900 dark:text-gray-100 text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-relaxed tracking-tighter overflow-visible">
                  <span className="block mb-3 sm:mb-4 font-semibold text-gray-700 dark:text-gray-200 text-xl xs:text-2xl sm:text-3xl md:text-4xl lg:text-5xl tracking-tight overflow-visible py-1">
                    {t("team.founderTribute.subtitle")}
                  </span>
                  <span className="block bg-linear-to-r from-brand-primary via-brand-secondary to-brand-primary bg-clip-text text-transparent font-black drop-shadow-sm overflow-visible py-2 pb-3 leading-normal">
                    {t("team.founderTribute.title")}
                  </span>
                </h3>

                <p className="mx-auto max-w-5xl font-light text-gray-700 dark:text-gray-300 text-base sm:text-lg md:text-xl lg:text-2xl leading-relaxed tracking-wide px-2">
                  {t("team.founderTribute.description")}
                </p>
              </div>

              <div className="bg-linear-to-br from-bronze-50/90 via-white to-brand-secondary/10 dark:from-bronze-900/20 dark:via-gray-900 dark:to-brand-secondary/15 rounded-2xl border-2 border-bronze-200 dark:border-bronze-700 shadow-xl p-6 sm:p-8 md:p-10">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8 md:gap-10 items-start">
                  <div className="lg:col-span-1">
                    <div className="relative w-full max-w-sm mx-auto aspect-4/5 rounded-xl overflow-hidden border-2 border-brand-secondary/30 dark:border-brand-secondary/40 shadow-lg bg-gray-100 dark:bg-gray-800">
                      <Image
                        src={
                          founderTributeMember.avatar ??
                          "/images/team/placeholder-team.webp"
                        }
                        alt={founderTributeMember.name}
                        fill
                        className="object-cover"
                        sizes="(max-width: 1024px) 320px, 360px"
                      />
                    </div>
                    <div className="mt-4 text-center">
                      <h4 className="text-2xl sm:text-3xl font-black text-gray-900 dark:text-white tracking-tight">
                        {founderTributeMember.name}
                      </h4>
                      <p className="text-brand-secondary-dark dark:text-brand-secondary-light font-semibold text-lg sm:text-xl">
                        {t("team.founderTribute.founderLabel")}
                      </p>
                    </div>
                  </div>

                  <div className="lg:col-span-2 space-y-6">
                    <div className="bg-white/80 dark:bg-gray-800/70 rounded-xl border border-brand-primary/20 dark:border-brand-primary/30 p-5 sm:p-6">
                      <h5 className="text-base sm:text-lg font-bold text-brand-primary dark:text-brand-secondary mb-3 flex items-center gap-2 tracking-tight">
                        <MaterialIcon
                          icon="military_tech"
                          size="sm"
                          className="text-brand-primary dark:text-brand-secondary"
                        />
                        {t("team.founderTribute.tributeStatementTitle")}
                      </h5>
                      <p className="text-sm sm:text-base text-gray-700 dark:text-gray-300 leading-relaxed">
                        {t("team.founderTribute.tributeStatementBody")}
                      </p>
                    </div>

                    <div className="bg-white/80 dark:bg-gray-800/70 rounded-xl border border-brand-secondary/25 dark:border-brand-secondary/35 p-5 sm:p-6">
                      <h5 className="text-base sm:text-lg font-bold text-brand-primary dark:text-brand-secondary mb-3 flex items-center gap-2 tracking-tight">
                        <MaterialIcon
                          icon="stars"
                          size="sm"
                          className="text-brand-primary dark:text-brand-secondary"
                        />
                        {t("team.founderTribute.milestonesTitle")}
                      </h5>
                      <ul className="space-y-2">
                        {founderTributeMember.careerHighlights.map(
                          (highlight) => (
                            <li
                              key={`founder-tribute-${highlight}`}
                              className="flex items-start gap-3 text-gray-700 dark:text-gray-300"
                            >
                              <MaterialIcon
                                icon="check_circle"
                                size="sm"
                                className="text-brand-secondary dark:text-brand-secondary-light shrink-0 mt-0.5"
                              />
                              <span className="leading-relaxed font-normal">
                                {highlight}
                              </span>
                            </li>
                          ),
                        )}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Next Steps Section - Standardized Final CTA */}
        <NextStepsSection
          title={t("team.nextSteps.sectionTitle")}
          subtitle={t("team.nextSteps.sectionSubtitle")}
          description={t("team.nextSteps.sectionDescription")}
        />
      </div>
    </>
  );
}
