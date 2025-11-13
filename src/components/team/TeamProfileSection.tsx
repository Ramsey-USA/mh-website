"use client";

import Image from "next/image";
import { MaterialIcon } from "../icons/MaterialIcon";
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
} from "recharts";
import { type VintageTeamMember } from "@/lib/data/vintage-team";
import { useEffect, useState } from "react";

interface TeamProfileSectionProps {
  member: VintageTeamMember;
  index: number;
}

export function TeamProfileSection({ member, index }: TeamProfileSectionProps) {
  // Track dark mode for chart colors
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    // Check initial dark mode state
    const checkDarkMode = () => {
      setIsDark(document.documentElement.classList.contains("dark"));
    };

    checkDarkMode();

    // Watch for dark mode changes
    const observer = new MutationObserver(checkDarkMode);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => observer.disconnect();
  }, []);
  // Prepare radar chart data
  const radarData = [
    { skill: "Leadership", value: member.skills.leadership, fullMark: 100 },
    { skill: "Technical", value: member.skills.technical, fullMark: 100 },
    {
      skill: "Communication",
      value: member.skills.communication,
      fullMark: 100,
    },
    { skill: "Safety", value: member.skills.safety, fullMark: 100 },
    {
      skill: "Problem\nSolving",
      value: member.skills.problemSolving,
      fullMark: 100,
    },
    { skill: "Teamwork", value: member.skills.teamwork, fullMark: 100 },
  ];

  // Alternate layout direction
  const isReversed = index % 2 === 1;

  // Get role icon
  const getRoleIcon = (role: string) => {
    if (role.toLowerCase().includes("project")) return "engineering";
    if (role.toLowerCase().includes("estimat")) return "calculate";
    if (role.toLowerCase().includes("superintend")) return "construction";
    if (role.toLowerCase().includes("foreman")) return "build";
    if (role.toLowerCase().includes("safety")) return "security";
    if (
      role.toLowerCase().includes("ceo") ||
      role.toLowerCase().includes("president") ||
      role.toLowerCase().includes("owner")
    ) {
      return "business";
    }
    if (role.toLowerCase().includes("admin")) return "admin_panel_settings";
    if (role.toLowerCase().includes("vice")) return "badge";
    return "person";
  };

  return (
    <div
      id={member.slug}
      className="bg-white dark:bg-gray-800 shadow-xl rounded-xl md:rounded-2xl overflow-hidden border-2 border-brand-primary/20 dark:border-brand-primary/30 hover:border-brand-primary/40 dark:hover:border-brand-primary/50 transition-all duration-300 scroll-mt-24"
    >
      {" "}
      <div
        className={`grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-7 md:gap-8 p-4 sm:p-6 md:p-8 ${
          isReversed ? "lg:flex-row-reverse" : ""
        }`}
      >
        {/* Left Column: Photo, Bio, Highlights */}
        <div
          className={`space-y-4 sm:space-y-5 md:space-y-6 ${isReversed ? "lg:order-2" : "lg:order-1"}`}
        >
          {/* Header with Photo */}
          <div className="flex items-start gap-4 sm:gap-5 md:gap-6">
            {/* Photo */}
            <div className="relative w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 flex-shrink-0">
              {member.avatar ? (
                <Image
                  src={member.avatar}
                  alt={member.name}
                  fill
                  className="rounded-lg md:rounded-xl object-cover border-2 sm:border-3 md:border-4 border-brand-primary dark:border-brand-secondary shadow-lg"
                  sizes="(max-width: 640px) 96px, (max-width: 768px) 112px, 128px"
                />
              ) : (
                <div className="w-full h-full rounded-xl bg-gradient-to-br from-brand-primary to-brand-primary-dark flex items-center justify-center shadow-lg">
                  <MaterialIcon
                    icon={getRoleIcon(member.role)}
                    size="4xl"
                    className="text-white"
                  />
                </div>
              )}
              {/* Veteran Badge - Using Bronze per branding guidelines */}
              {member.veteranStatus &&
                member.veteranStatus.toLowerCase().includes("veteran") && (
                  <div className="absolute -top-2 -right-2 bg-bronze-badge text-white px-2 py-1 rounded-full text-xs font-bold shadow-lg border-2 border-white dark:border-gray-800">
                    VET
                  </div>
                )}
            </div>

            {/* Name and Title */}
            <div className="flex-1 min-w-0">
              <h3 className="text-2xl sm:text-2xl md:text-3xl font-black text-gray-900 dark:text-white leading-tight tracking-tight">
                {member.name}
              </h3>
              {member.nickname && (
                <p className="text-base sm:text-lg text-brand-secondary dark:text-brand-secondary-light italic mb-1 font-medium">
                  &ldquo;{member.nickname}&rdquo;
                </p>
              )}
              <p className="text-lg sm:text-xl text-brand-primary dark:text-brand-secondary font-bold tracking-tight">
                {member.role}
              </p>
              <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mt-1 font-medium">
                {member.department}
              </p>

              {/* Quick Stats */}
              <div className="flex flex-wrap gap-2 sm:gap-3 md:gap-4 mt-2 sm:mt-3">
                <div className="flex items-center gap-2 text-sm">
                  <MaterialIcon
                    icon="work_history"
                    size="sm"
                    className="text-brand-primary dark:text-brand-secondary"
                  />
                  <span className="text-gray-700 dark:text-gray-300 font-medium">
                    {member.careerStats.yearsExperience} years
                  </span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <MaterialIcon
                    icon="task_alt"
                    size="sm"
                    className="text-brand-primary dark:text-brand-secondary"
                  />
                  <span className="text-gray-700 dark:text-gray-300 font-medium">
                    {member.careerStats.totalProjects}+ projects
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Bio */}
          <div>
            <h4 className="text-base sm:text-lg font-bold text-brand-primary dark:text-brand-secondary mb-2 flex items-center gap-2 tracking-tight">
              <MaterialIcon
                icon="info"
                size="sm"
                className="text-brand-primary dark:text-brand-secondary"
              />
              About
            </h4>
            <p className="text-sm sm:text-base text-gray-700 dark:text-gray-300 leading-relaxed font-normal">
              {member.bio}
            </p>
          </div>

          {/* Career Highlights */}
          {member.careerHighlights && member.careerHighlights.length > 0 && (
            <div>
              <h4 className="text-base sm:text-lg font-bold text-brand-primary dark:text-brand-secondary mb-3 flex items-center gap-2 tracking-tight">
                <MaterialIcon
                  icon="stars"
                  size="sm"
                  className="text-brand-primary dark:text-brand-secondary"
                />
                Career Highlights
              </h4>
              <ul className="space-y-2">
                {member.careerHighlights.map((highlight, idx) => (
                  <li
                    key={idx}
                    className="flex items-start gap-3 text-gray-700 dark:text-gray-300"
                  >
                    <MaterialIcon
                      icon="check_circle"
                      size="sm"
                      className="text-brand-secondary dark:text-brand-secondary-light flex-shrink-0 mt-0.5"
                    />
                    <span className="leading-relaxed font-normal">
                      {highlight}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Specialties */}
          {member.specialties && member.specialties.length > 0 && (
            <div>
              <h4 className="text-base sm:text-lg font-bold text-brand-primary dark:text-brand-secondary mb-3 flex items-center gap-2 tracking-tight">
                <MaterialIcon
                  icon="psychology"
                  size="sm"
                  className="text-brand-primary dark:text-brand-secondary"
                />
                Specialties
              </h4>
              <div className="flex flex-wrap gap-2">
                {member.specialties.map((specialty, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1.5 bg-brand-primary/10 dark:bg-brand-primary/20 text-brand-primary dark:text-brand-secondary text-sm rounded-full font-semibold border border-brand-primary/20 dark:border-brand-primary/30"
                  >
                    {specialty}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right Column: Radar Chart, Stats, Details */}
        <div
          className={`space-y-4 sm:space-y-5 md:space-y-6 ${isReversed ? "lg:order-1" : "lg:order-2"}`}
        >
          {/* Radar Chart */}
          <div className="bg-gradient-to-br from-brand-primary/5 to-brand-secondary/5 dark:from-brand-primary/10 dark:to-brand-secondary/10 p-4 sm:p-5 md:p-6 rounded-lg md:rounded-xl border-2 border-brand-primary/10 dark:border-brand-primary/20">
            <h4 className="text-base sm:text-lg font-bold text-brand-primary dark:text-brand-secondary mb-3 sm:mb-4 text-center tracking-tight">
              Professional Skills Profile
            </h4>
            <ResponsiveContainer
              width="100%"
              height={250}
              className="sm:!h-[280px] md:!h-[300px]"
            >
              <RadarChart data={radarData}>
                <PolarGrid
                  stroke={isDark ? "#BD9264" : "#386851"}
                  strokeOpacity={0.3}
                />
                <PolarAngleAxis
                  dataKey="skill"
                  tick={{
                    fill: isDark ? "#BD9264" : "#386851",
                    fontSize: 12,
                    fontWeight: 600,
                  }}
                />
                <PolarRadiusAxis
                  angle={90}
                  domain={[0, 100]}
                  tick={{ fill: isDark ? "#9ca3af" : "#6b7280", fontSize: 10 }}
                />
                <Radar
                  name={member.name}
                  dataKey="value"
                  stroke={isDark ? "#BD9264" : "#386851"}
                  fill={isDark ? "#BD9264" : "#386851"}
                  fillOpacity={0.6}
                  strokeWidth={2}
                />
              </RadarChart>
            </ResponsiveContainer>
          </div>

          {/* Performance Stats */}
          <div className="grid grid-cols-1 xs:grid-cols-2 gap-3 sm:gap-4">
            {/* 2025 Performance */}
            <div className="bg-brand-primary/5 dark:bg-brand-primary/10 p-3 sm:p-4 rounded-lg border-2 border-brand-primary/10 dark:border-brand-primary/20">
              <h5 className="text-xs sm:text-sm font-bold text-brand-primary dark:text-brand-secondary mb-2 sm:mb-3 flex items-center gap-1 tracking-tight">
                <MaterialIcon
                  icon="trending_up"
                  size="sm"
                  className="text-brand-primary dark:text-brand-secondary"
                />
                2025 Stats
              </h5>
              <div className="space-y-1.5 sm:space-y-2 text-xs sm:text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400 font-medium">
                    Projects
                  </span>
                  <span className="font-bold text-gray-900 dark:text-white">
                    {member.currentYearStats.projectsCompleted}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400 font-medium">
                    Satisfaction
                  </span>
                  <span className="font-bold text-gray-900 dark:text-white">
                    {member.currentYearStats.clientSatisfaction}%
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400 font-medium">
                    Safety
                  </span>
                  <span className="font-bold text-green-600 dark:text-green-400">
                    {member.currentYearStats.safetyRecord}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400 font-medium">
                    Collabs
                  </span>
                  <span className="font-bold text-gray-900 dark:text-white">
                    {member.currentYearStats.teamCollaborations}
                  </span>
                </div>
              </div>
            </div>

            {/* Career Totals */}
            <div className="bg-brand-secondary/5 dark:bg-brand-secondary/10 p-3 sm:p-4 rounded-lg border-2 border-brand-secondary/10 dark:border-brand-secondary/20">
              <h5 className="text-xs sm:text-sm font-bold text-brand-secondary dark:text-brand-secondary-light mb-2 sm:mb-3 flex items-center gap-1 tracking-tight">
                <MaterialIcon
                  icon="workspace_premium"
                  size="sm"
                  className="text-brand-secondary dark:text-brand-secondary-light"
                />
                Career
              </h5>
              <div className="space-y-1.5 sm:space-y-2 text-xs sm:text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400 font-medium">
                    Total Projects
                  </span>
                  <span className="font-bold text-gray-900 dark:text-white">
                    {member.careerStats.totalProjects}+
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400 font-medium">
                    Experience
                  </span>
                  <span className="font-bold text-gray-900 dark:text-white">
                    {member.careerStats.yearsExperience} yrs
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400 font-medium">
                    Specialties
                  </span>
                  <span className="font-bold text-gray-900 dark:text-white">
                    {member.careerStats.specialtyAreas}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400 font-medium">
                    Mentorships
                  </span>
                  <span className="font-bold text-gray-900 dark:text-white">
                    {member.careerStats.mentorships}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Additional Details */}
          <div className="bg-gray-50 dark:bg-gray-900 p-3 sm:p-4 rounded-lg border-2 border-gray-200 dark:border-gray-700 space-y-2 sm:space-y-3">
            <h5 className="text-xs sm:text-sm font-bold text-brand-primary dark:text-brand-secondary flex items-center gap-1 tracking-tight">
              <MaterialIcon
                icon="person"
                size="sm"
                className="text-brand-primary dark:text-brand-secondary"
              />
              Personal Details
            </h5>
            <div className="space-y-1.5 sm:space-y-2 text-xs sm:text-sm">
              {member.hometown && (
                <div className="flex items-start gap-2">
                  <MaterialIcon
                    icon="home"
                    size="sm"
                    className="text-gray-500 dark:text-gray-400 flex-shrink-0 mt-0.5"
                  />
                  <div>
                    <span className="text-gray-600 dark:text-gray-400 font-medium">
                      Hometown:{" "}
                    </span>
                    <span className="text-gray-900 dark:text-white font-semibold">
                      {member.hometown}
                    </span>
                  </div>
                </div>
              )}
              {member.education && (
                <div className="flex items-start gap-2">
                  <MaterialIcon
                    icon="school"
                    size="sm"
                    className="text-gray-500 dark:text-gray-400 flex-shrink-0 mt-0.5"
                  />
                  <div>
                    <span className="text-gray-600 dark:text-gray-400 font-medium">
                      Education:{" "}
                    </span>
                    <span className="text-gray-900 dark:text-white font-semibold">
                      {member.education}
                    </span>
                  </div>
                </div>
              )}
              {member.certifications && (
                <div className="flex items-start gap-2">
                  <MaterialIcon
                    icon="verified"
                    size="sm"
                    className="text-gray-500 dark:text-gray-400 flex-shrink-0 mt-0.5"
                  />
                  <div>
                    <span className="text-gray-600 dark:text-gray-400 font-medium">
                      Certifications:{" "}
                    </span>
                    <span className="text-gray-900 dark:text-white font-semibold">
                      {member.certifications}
                    </span>
                  </div>
                </div>
              )}
              {member.awards && (
                <div className="flex items-start gap-2">
                  <MaterialIcon
                    icon="emoji_events"
                    size="sm"
                    className="text-bronze-badge flex-shrink-0 mt-0.5"
                  />
                  <div>
                    <span className="text-gray-600 dark:text-gray-400 font-medium">
                      Awards:{" "}
                    </span>
                    <span className="text-gray-900 dark:text-white font-semibold">
                      {member.awards}
                    </span>
                  </div>
                </div>
              )}
              <div className="flex items-start gap-2">
                <MaterialIcon
                  icon="business_center"
                  size="sm"
                  className="text-gray-500 dark:text-gray-400 flex-shrink-0 mt-0.5"
                />
                <div>
                  <span className="text-gray-600 dark:text-gray-400 font-medium">
                    Years at MH:{" "}
                  </span>
                  <span className="text-gray-900 dark:text-white font-semibold">
                    {member.yearsWithCompany}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
