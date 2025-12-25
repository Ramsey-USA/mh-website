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
  Tooltip,
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
  const [showPersonal, setShowPersonal] = useState(false);

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

  // Determine achievement badges based on actual accomplishments
  const getAchievementBadges = () => {
    const badges = [];

    // Veteran Badges - Special Recognition (Bronze per brand guidelines)
    if (member.veteranStatus?.toLowerCase().includes("navy")) {
      badges.push({
        icon: "military_tech",
        label: "Navy Veteran",
        color: "bg-bronze-badge dark:bg-bronze-badge",
        textColor: "text-white",
        special: true,
        description: member.awards || "Honorable Service",
      });
    }
    if (member.veteranStatus?.toLowerCase().includes("army")) {
      badges.push({
        icon: "military_tech",
        label: "Army Veteran",
        color: "bg-bronze-badge dark:bg-bronze-badge",
        textColor: "text-white",
        special: true,
        description: "15 Years Aviation Service",
      });
    }

    // Education Badges - College Graduates
    if (member.education) {
      const edu = member.education.toLowerCase();
      if (
        edu.includes("bas") ||
        edu.includes("bachelor") ||
        edu.includes("b.s") ||
        edu.includes("b.a")
      ) {
        badges.push({
          icon: "school",
          label: "Bachelor's Degree",
          color: "bg-brand-primary dark:bg-brand-primary-light",
          textColor: "text-white",
          description: member.education,
        });
      } else if (
        edu.includes("master") ||
        edu.includes("m.s") ||
        edu.includes("m.a") ||
        edu.includes("mba")
      ) {
        badges.push({
          icon: "school",
          label: "Master's Degree",
          color: "bg-bronze-badge dark:bg-bronze-badge",
          textColor: "text-white",
          description: member.education,
        });
      } else if (
        edu.includes("management") ||
        edu.includes("engineering") ||
        edu.includes("technology") ||
        edu.includes("administration") ||
        edu.includes("operations") ||
        edu.includes("aas")
      ) {
        badges.push({
          icon: "school",
          label: "College Graduate",
          color: "bg-brand-secondary dark:bg-brand-secondary-light",
          textColor: "text-white",
          description: member.education,
        });
      }
    }

    // Founder/Legacy (Secondary Brand Color)
    if (member.role.toLowerCase().includes("founder")) {
      badges.push({
        icon: "foundation",
        label: "Company Founder",
        color: "bg-brand-secondary dark:bg-brand-secondary-light",
        textColor: "text-white",
      });
    }

    // Perfect Safety Record (Success Green)
    if (member.currentYearStats.safetyRecord === "PERFECT") {
      badges.push({
        icon: "verified_user",
        label: "Perfect Safety",
        color: "bg-green-600 dark:bg-green-500",
        textColor: "text-white",
      });
    }

    // Senior Experience (20+ years) - Primary Brand Color
    if (member.careerStats.yearsExperience >= 20) {
      badges.push({
        icon: "workspace_premium",
        label: `${member.careerStats.yearsExperience}+ Years`,
        color: "bg-brand-primary dark:bg-brand-primary-light",
        textColor: "text-white",
      });
    }

    // High Performance (500+ projects) - Brand Secondary
    if (member.careerStats.totalProjects >= 500) {
      badges.push({
        icon: "star",
        label: "Elite Performer",
        color: "bg-brand-secondary dark:bg-brand-secondary-light",
        textColor: "text-white",
      });
    }

    // Client Satisfaction Excellence (99%) - Primary Brand
    if (member.currentYearStats.clientSatisfaction >= 99) {
      badges.push({
        icon: "sentiment_very_satisfied",
        label: "Client Champion",
        color: "bg-brand-primary dark:bg-brand-primary-light",
        textColor: "text-white",
      });
    }

    // Six Sigma / Advanced Certifications - Neutral Gray
    if (member.certifications?.includes("Six Sigma")) {
      badges.push({
        icon: "analytics",
        label: "Six Sigma",
        color: "bg-gray-700 dark:bg-gray-600",
        textColor: "text-white",
      });
    }

    // SKILL-BASED ACHIEVEMENT BADGES (88+ threshold for excellence)

    // Leadership Excellence (88+ leadership score) - Primary Brand
    if (member.skills.leadership >= 88) {
      badges.push({
        icon: "military_tech",
        label: "Leadership Excellence",
        color: "bg-brand-primary dark:bg-brand-primary-light",
        textColor: "text-white",
      });
    }

    // Technical Mastery (88+ technical score) - Neutral Gray
    if (member.skills.technical >= 88) {
      badges.push({
        icon: "engineering",
        label: "Technical Master",
        color: "bg-gray-700 dark:bg-gray-600",
        textColor: "text-white",
      });
    }

    // Communication Expert (88+ communication score) - Brand Secondary
    if (member.skills.communication >= 88) {
      badges.push({
        icon: "forum",
        label: "Communication Expert",
        color: "bg-brand-secondary dark:bg-brand-secondary-light",
        textColor: "text-white",
      });
    }

    // Safety Excellence (88+ safety score) - Error Red for Importance
    if (member.skills.safety >= 88) {
      badges.push({
        icon: "shield",
        label: "Safety Champion",
        color: "bg-red-600 dark:bg-red-500",
        textColor: "text-white",
      });
    }

    // Problem-Solving Pro (88+ problem solving score) - Success Green
    if (member.skills.problemSolving >= 88) {
      badges.push({
        icon: "psychology",
        label: "Problem-Solving Pro",
        color: "bg-green-600 dark:bg-green-500",
        textColor: "text-white",
      });
    }

    // Team Building Excellence (88+ teamwork score) - Primary Brand
    if (member.skills.teamwork >= 88) {
      badges.push({
        icon: "groups",
        label: "Team Builder",
        color: "bg-brand-primary dark:bg-brand-primary-light",
        textColor: "text-white",
      });
    }

    // Precision Specialist (88+ organization/thoroughness) - Neutral Gray
    if (member.skills.organization >= 88) {
      badges.push({
        icon: "precision_manufacturing",
        label: "Precision Expert",
        color: "bg-gray-700 dark:bg-gray-600",
        textColor: "text-white",
      });
    }

    // Innovation Leader (88+ innovation score) - Warning Orange
    if (member.skills.innovation >= 88) {
      badges.push({
        icon: "lightbulb",
        label: "Innovation Leader",
        color: "bg-orange-600 dark:bg-orange-500",
        textColor: "text-white",
      });
    }

    // FUTURE BADGE OPPORTUNITIES (commented for reference):
    // - OSHA 30 Certified (member.certifications?.includes("OSHA 30"))
    // - LEED Certified Professional (sustainability credentials)
    // - First Aid/CPR Certified (member.certifications?.includes("CPR"))
    // - CDL License Holder (member.certifications?.includes("CDL"))
    // - Mentor Achievement (10+ mentorships)
    // - Decade of Service (10+ years at company)
    // - Award Winner (specific industry awards)
    // - Forklift Certified (equipment operations)
    // - Bilingual Professional (Spanish/English interpreter)
    // - Community Leader (volunteer/community work)
    // - Project Excellence (consistent on-time delivery)
    // - Budget Master (under-budget project completion)
    // - Client Retention Specialist (repeat client rate)
    // - Cross-Functional Expert (multiple specialty areas)

    return badges;
  };

  const achievementBadges = getAchievementBadges();

  // Skill level indicator based on score
  const getSkillLevel = (
    score: number,
  ): { level: string; color: string; icon: string } => {
    if (score >= 95) {
      return {
        level: "Master",
        color: "text-bronze-badge dark:text-bronze-badge-light",
        icon: "workspace_premium",
      };
    }
    if (score >= 85) {
      return {
        level: "Expert",
        color: "text-brand-primary dark:text-brand-primary-light",
        icon: "verified",
      };
    }
    if (score >= 75) {
      return {
        level: "Proficient",
        color: "text-green-700 dark:text-green-600",
        icon: "check_circle",
      };
    }
    if (score >= 65) {
      return {
        level: "Competent",
        color: "text-brand-secondary dark:text-brand-secondary-light",
        icon: "task_alt",
      };
    }
    return {
      level: "Developing",
      color: "text-gray-600 dark:text-gray-400",
      icon: "trending_up",
    };
  };

  // Calculate top 3 skills for highlighting
  const getTopSkills = () => {
    const skillsArray = [
      {
        name: "Partnership Leadership",
        value: member.skills.leadership,
        key: "leadership",
      },
      {
        name: "Technical Excellence",
        value: member.skills.technical,
        key: "technical",
      },
      {
        name: "Transparent Communication",
        value: member.skills.communication,
        key: "communication",
      },
      { name: "Safety Excellence", value: member.skills.safety, key: "safety" },
      {
        name: "Strategic Thinking",
        value: member.skills.problemSolving,
        key: "problemSolving",
      },
      {
        name: "Partnership Unity",
        value: member.skills.teamwork,
        key: "teamwork",
      },
      {
        name: "Thoroughness",
        value: member.skills.organization,
        key: "organization",
      },
      {
        name: "Client-Focused Excellence",
        value: member.skills.innovation,
        key: "innovation",
      },
    ];
    return skillsArray.sort((a, b) => b.value - a.value).slice(0, 3);
  };

  const topSkills = getTopSkills();

  // Prepare radar chart data
  const radarData = [
    {
      skill: "Partnership\nLeadership",
      value: member.skills.leadership,
      fullMark: 100,
    },
    {
      skill: "Technical\nExcellence",
      value: member.skills.technical,
      fullMark: 100,
    },
    {
      skill: "Transparent\nCommunication",
      value: member.skills.communication,
      fullMark: 100,
    },
    { skill: "Safety\nExcellence", value: member.skills.safety, fullMark: 100 },
    {
      skill: "Strategic\nThinking",
      value: member.skills.problemSolving,
      fullMark: 100,
    },
    {
      skill: "Partnership\nUnity",
      value: member.skills.teamwork,
      fullMark: 100,
    },
    { skill: "Thoroughness", value: member.skills.organization, fullMark: 100 },
    {
      skill: "Client-Focused\nExcellence",
      value: member.skills.innovation,
      fullMark: 100,
    },
    {
      skill: "Organizational\nExpertise",
      value: member.skills.organization,
      fullMark: 100,
    },
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
                  loading="lazy"
                  priority={false}
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

          {/* Achievement Badges */}
          {achievementBadges.filter((b) => !b.special).length > 0 && (
            <div>
              <h4 className="text-base sm:text-lg font-bold text-brand-primary dark:text-brand-secondary mb-3 flex items-center gap-2 tracking-tight">
                <MaterialIcon
                  icon="emoji_events"
                  size="sm"
                  className="text-brand-primary dark:text-brand-secondary"
                />
                Achievements & Recognition
              </h4>
              <div className="flex flex-wrap gap-2">
                {achievementBadges
                  .filter((b) => !b.special)
                  .map((badge, idx) => (
                    <div
                      key={idx}
                      className={`${badge.color} ${badge.textColor} px-3 py-1.5 rounded-lg font-semibold text-sm flex items-center gap-2 shadow-md hover:shadow-lg transition-all duration-200`}
                      title={badge.description || badge.label}
                    >
                      <MaterialIcon
                        icon={badge.icon}
                        size="md"
                        className={badge.textColor}
                      />
                      <span className="whitespace-nowrap">{badge.label}</span>
                    </div>
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

            {/* Veteran Badge - Center of Radar */}
            {achievementBadges.some((b) => b.special) && (
              <div className="flex flex-col items-center justify-center mb-3">
                {achievementBadges
                  .filter((b) => b.special)
                  .map((badge, idx) => (
                    <div key={idx} className="flex flex-col items-center gap-2">
                      <div
                        className={`${badge.color} ${badge.textColor} px-4 py-2 rounded-lg font-bold text-sm flex items-center gap-2 shadow-xl ring-4 ring-bronze-badge/30 dark:ring-bronze-badge-light/30`}
                        title={badge.description || badge.label}
                      >
                        <MaterialIcon
                          icon={badge.icon}
                          size="lg"
                          className={badge.textColor}
                        />
                        <span>{badge.label}</span>
                        <MaterialIcon
                          icon="stars"
                          size="lg"
                          className="text-yellow-300 dark:text-yellow-200"
                        />
                      </div>
                      <p className="text-xs text-gray-600 dark:text-gray-400 italic flex items-center gap-1">
                        <MaterialIcon
                          icon="flag"
                          size="sm"
                          className="text-red-600 dark:text-red-500"
                        />
                        Thank you for your service to our country
                      </p>
                    </div>
                  ))}
              </div>
            )}

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
                <Tooltip
                  content={({ payload }) => {
                    if (payload && payload.length > 0) {
                      const data = payload[0].payload;
                      const skillLevel = getSkillLevel(data.value);
                      return (
                        <div className="bg-white dark:bg-gray-800 p-3 rounded-lg shadow-lg border-2 border-brand-primary/20 dark:border-brand-primary/30">
                          <p className="font-bold text-gray-900 dark:text-white text-sm mb-1">
                            {data.skill.replace("\n", " ")}
                          </p>
                          <p className="text-lg font-bold text-brand-primary dark:text-brand-secondary">
                            {data.value}/100
                          </p>
                          <div className="flex items-center gap-1 mt-1">
                            <MaterialIcon
                              icon={skillLevel.icon}
                              size="sm"
                              className={skillLevel.color}
                            />
                            <span
                              className={`text-xs font-semibold ${skillLevel.color}`}
                            >
                              {skillLevel.level}
                            </span>
                          </div>
                        </div>
                      );
                    }
                    return null;
                  }}
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

            {/* Top 3 Skills Display */}
            <div className="mt-4 flex flex-wrap gap-2 justify-center">
              {topSkills.map((skill, idx) => {
                const skillLevel = getSkillLevel(skill.value);
                const medalIcon =
                  idx === 0
                    ? "workspace_premium"
                    : idx === 1
                      ? "verified"
                      : "stars";
                const medalColor =
                  idx === 0
                    ? "text-bronze-badge"
                    : idx === 1
                      ? "text-gray-400"
                      : "text-brand-secondary";
                return (
                  <div
                    key={skill.key}
                    className="flex items-center gap-2 bg-white dark:bg-gray-800 px-3 py-1.5 rounded-full border-2 border-brand-primary/20 dark:border-brand-primary/30 shadow-sm"
                  >
                    <MaterialIcon
                      icon={medalIcon}
                      size="sm"
                      className={medalColor}
                    />
                    <MaterialIcon
                      icon={skillLevel.icon}
                      size="sm"
                      className={skillLevel.color}
                    />
                    <span className="text-xs font-semibold text-gray-900 dark:text-white">
                      {skill.name}
                    </span>
                    <span className={`text-xs font-bold ${skillLevel.color}`}>
                      {skill.value}
                    </span>
                  </div>
                );
              })}
            </div>
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

          {/* Personal Insights - Expandable */}
          {(member.funFact || member.hobbies || member.specialInterests) && (
            <div className="bg-gradient-to-br from-brand-secondary/5 to-brand-primary/5 dark:from-brand-secondary/10 dark:to-brand-primary/10 p-3 sm:p-4 rounded-lg border-2 border-brand-secondary/10 dark:border-brand-secondary/20">
              <button
                onClick={() => setShowPersonal(!showPersonal)}
                className="w-full flex items-center justify-between text-xs sm:text-sm font-bold text-brand-secondary dark:text-brand-secondary-light tracking-tight hover:text-brand-secondary-dark dark:hover:text-brand-secondary transition-colors"
              >
                <div className="flex items-center gap-1">
                  <MaterialIcon
                    icon="favorite"
                    size="sm"
                    className="text-brand-secondary dark:text-brand-secondary-light"
                  />
                  Personal Insights
                </div>
                <MaterialIcon
                  icon={showPersonal ? "expand_less" : "expand_more"}
                  size="sm"
                  className="text-brand-secondary dark:text-brand-secondary-light"
                />
              </button>

              {showPersonal && (
                <div className="mt-3 space-y-2 sm:space-y-3 text-xs sm:text-sm animate-in fade-in duration-300">
                  {member.funFact && (
                    <div className="flex items-start gap-2">
                      <MaterialIcon
                        icon="lightbulb"
                        size="sm"
                        className="text-bronze-badge dark:text-bronze-badge-light flex-shrink-0 mt-0.5"
                      />
                      <div>
                        <span className="text-gray-600 dark:text-gray-400 font-medium">
                          Fun Fact:{" "}
                        </span>
                        <span className="text-gray-900 dark:text-white">
                          {member.funFact}
                        </span>
                      </div>
                    </div>
                  )}
                  {member.hobbies && (
                    <div className="flex items-start gap-2">
                      <MaterialIcon
                        icon="sports_esports"
                        size="sm"
                        className="text-brand-primary dark:text-brand-primary-light flex-shrink-0 mt-0.5"
                      />
                      <div>
                        <span className="text-gray-600 dark:text-gray-400 font-medium">
                          Hobbies:{" "}
                        </span>
                        <span className="text-gray-900 dark:text-white">
                          {member.hobbies}
                        </span>
                      </div>
                    </div>
                  )}
                  {member.specialInterests && (
                    <div className="flex items-start gap-2">
                      <MaterialIcon
                        icon="interests"
                        size="sm"
                        className="text-brand-secondary dark:text-brand-secondary-light flex-shrink-0 mt-0.5"
                      />
                      <div>
                        <span className="text-gray-600 dark:text-gray-400 font-medium">
                          Special Interests:{" "}
                        </span>
                        <span className="text-gray-900 dark:text-white">
                          {member.specialInterests}
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}

          {/* Contact Button */}
          <div className="flex justify-center">
            <a
              href="mailto:office@mhc-gc.com?subject=Connect%20with%20Team%20Member"
              className="inline-flex items-center gap-2 bg-brand-primary hover:bg-brand-primary-dark dark:bg-brand-primary-light dark:hover:bg-brand-primary text-white px-6 py-3 rounded-lg font-bold text-sm shadow-md hover:shadow-lg transition-all duration-300"
            >
              <MaterialIcon icon="mail" size="sm" className="text-white" />
              Contact Team Member
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
