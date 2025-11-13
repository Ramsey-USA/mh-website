"use client";

import { useState } from "react";
import Image from "next/image";
import { MaterialIcon } from "../../icons/MaterialIcon";
import { type TeamMember } from "@/lib/data/team";

/**
 * @deprecated This component has been replaced by TeamProfileSection.
 * Please use TeamProfileSection from @/components/team/TeamProfileSection instead.
 * The modern profile system provides comprehensive information display with skills radar charts.
 * This file is kept for reference but should not be used in new development.
 *
 * @see TeamProfileSection
 * @see /src/components/team/TeamProfileSection.tsx
 */

interface BaseballCardProps {
  member: TeamMember;
}

export function BaseballCard({ member }: BaseballCardProps) {
  const [isFlipped, setIsFlipped] = useState(false);
  // Get role icon based on role
  function getRoleIcon(role: string): string {
    if (role.includes("Owner") || role.includes("General Manager")) {
      return "account_balance";
    }
    if (role.includes("Founder")) return "foundation";
    if (role.includes("Vice President")) return "business_center";
    if (role.includes("Project Manager")) return "assignment_ind";
    if (role.includes("Estimator")) return "calculate";
    if (role.includes("Superintendent")) return "construction";
    if (role.includes("Accountant")) return "account_balance_wallet";
    if (role.includes("HR")) return "people";
    if (role.includes("Marketing")) return "campaign";
    if (role.includes("Administrative")) return "admin_panel_settings";
    if (role.includes("Expert")) return "handyman";
    if (role.includes("Chief Morale Officer")) return "pets";
    return "person";
  }

  // Check if this is Trigger the mascot
  const isMascot = member.name === "Trigger";

  // Get veteran status badge
  function getVeteranStatusBadge(status?: string) {
    if (!status) return null;

    const badgeConfig = {
      "Army Veteran": { icon: "military_tech", color: "text-green-600" },
      "Navy Veteran": { icon: "anchor", color: "text-blue-600" },
      "Air Force Veteran": { icon: "flight", color: "text-sky-600" },
      "Marine Veteran": { icon: "shield", color: "text-red-600" },
      "Coast Guard Veteran": { icon: "waves", color: "text-cyan-600" },
      "Civilian Supporter": { icon: "handshake", color: "text-amber-600" },
      "Retired Leadership": {
        icon: "workspace_premium",
        color: "text-purple-600",
      },
    };

    const config = badgeConfig[status as keyof typeof badgeConfig];
    if (!config) return null;

    return (
      <div className="flex items-center bg-white/90 px-2 py-1 rounded-full text-xs">
        <MaterialIcon
          icon={config.icon}
          size="sm"
          className={`mr-1 ${config.color}`}
        />
        <span className="font-medium text-gray-800">{status}</span>
      </div>
    );
  }

  return (
    <div className="mx-auto w-full max-w-sm min-h-[220px] sm:min-h-[320px] md:min-h-[400px] lg:min-h-[500px]">
      <div
        className="relative w-full h-full perspective-1000 cursor-pointer"
        onClick={() => setIsFlipped(!isFlipped)}
        onKeyDown={(e) =>
          (e.key === "Enter" || e.key === " ") && setIsFlipped(!isFlipped)
        }
        role="button"
        tabIndex={0}
        aria-label={`View profile for ${member.name}`}
      >
        <div
          className={`absolute inset-0 w-full h-full transition-transform duration-700 preserve-3d ${
            isFlipped ? "rotate-y-180" : ""
          }`}
        >
          {/* FRONT OF CARD */}
          <div
            className={`absolute inset-0 w-full h-full backface-hidden ${
              isMascot
                ? "bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 border-amber-300"
                : "bg-gradient-to-br from-white via-gray-50 to-gray-100 border-gray-200"
            } shadow-lg hover:shadow-xl border-2 rounded-2xl overflow-hidden`}
          >
            {/* Card Header with Team Branding */}
            <div
              className={`${
                isMascot
                  ? "bg-gradient-to-r from-amber-500 to-orange-500"
                  : "bg-gradient-to-r from-[#386851] to-[#2D5443]"
              } px-6 py-4`}
            >
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <Image
                    src="/images/logo/mh-logo.png"
                    alt="MH Construction"
                    width={32}
                    height={32}
                    className="mr-2 w-8 h-8"
                  />
                  <span className="font-bold text-white text-sm uppercase tracking-wide">
                    MH CONSTRUCTION
                  </span>
                </div>
                {getVeteranStatusBadge(member.veteranStatus)}
              </div>
            </div>

            {/* Photo Section */}
            <div
              className={`flex justify-center items-center ${
                isMascot ? "bg-amber-100" : "bg-gray-100"
              } py-8`}
            >
              <div
                className={`relative ${
                  isMascot
                    ? "bg-gradient-to-br from-amber-300/20 to-orange-300/20"
                    : "bg-gradient-to-br from-[#386851]/20 to-[#BD9264]/20"
                } rounded-full w-32 h-32 overflow-hidden shadow-lg`}
              >
                {member.avatar ? (
                  <Image
                    src={member.avatar}
                    alt={member.name}
                    fill
                    className="object-cover"
                    sizes="128px"
                  />
                ) : (
                  <div className="flex justify-center items-center w-full h-full">
                    <MaterialIcon
                      icon={getRoleIcon(member.role)}
                      size="4xl"
                      className={isMascot ? "text-amber-600" : "text-[#386851]"}
                    />
                  </div>
                )}
              </div>
            </div>

            {/* Name and Role */}
            <div className="px-6 py-4 text-center">
              <h3
                className={`mb-2 font-black text-xl tracking-tight ${
                  isMascot ? "text-amber-900" : "text-gray-900"
                }`}
              >
                {member.name}
              </h3>
              <p
                className={`mb-3 font-bold text-sm uppercase tracking-wide ${
                  isMascot ? "text-orange-600" : "text-[#BD9264]"
                }`}
              >
                {member.role}
              </p>
              <p
                className={`text-xs font-medium ${
                  isMascot ? "text-amber-700" : "text-gray-600"
                }`}
              >
                <MaterialIcon
                  icon="schedule"
                  size="sm"
                  className="inline mr-1"
                />
                {typeof member.experienceYears === "number"
                  ? `${member.experienceYears}+`
                  : member.experienceYears}{" "}
                {isMascot ? "years of service" : "years experience"}
              </p>
            </div>

            {/* Click to flip indicator */}
            <div className="bottom-4 left-1/2 absolute -translate-x-1/2 transform">
              <div
                className={`flex items-center ${
                  isMascot ? "text-amber-600" : "text-[#386851]"
                } text-xs`}
              >
                <MaterialIcon icon="flip" size="sm" className="mr-1" />
                <span>Click to flip</span>
              </div>
            </div>
          </div>

          {/* BACK OF CARD */}
          <div
            className={`absolute inset-0 w-full h-full backface-hidden rotate-y-180 ${
              isMascot
                ? "bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 border-amber-300"
                : "bg-gradient-to-br from-white via-gray-50 to-gray-100 border-gray-200"
            } shadow-lg border-2 rounded-2xl overflow-hidden`}
          >
            {/* Back Header */}
            <div
              className={`${
                isMascot
                  ? "bg-gradient-to-r from-amber-500 to-orange-500"
                  : "bg-gradient-to-r from-[#386851] to-[#2D5443]"
              } px-6 py-4`}
            >
              <div className="text-center">
                <span className="font-bold text-white text-sm uppercase tracking-wide">
                  TEAM PROFILE
                </span>
              </div>
            </div>

            <div className="flex flex-col p-6 h-full">
              {/* Bio Section */}
              {member.bio && (
                <div className="mb-6">
                  <div className="mb-3 text-center">
                    <span
                      className={`font-bold text-xs tracking-wide uppercase ${
                        isMascot ? "text-amber-800" : "text-gray-700"
                      }`}
                    >
                      PROFILE
                    </span>
                  </div>
                  <p
                    className={`text-sm leading-relaxed text-center ${
                      isMascot ? "text-amber-800" : "text-gray-600"
                    }`}
                  >
                    {member.bio}
                  </p>
                </div>
              )}

              {/* Specialties */}
              <div className="flex-1">
                <div className="mb-3 text-center">
                  <span
                    className={`font-bold text-xs tracking-wide uppercase ${
                      isMascot ? "text-amber-800" : "text-gray-700"
                    }`}
                  >
                    {isMascot ? "SPECIAL SKILLS" : "SPECIALTIES"}
                  </span>
                </div>
                <div className="flex flex-wrap justify-center gap-2">
                  {member.specialties?.map((specialty, _index) => (
                    <span
                      key={_index}
                      className={`${
                        isMascot
                          ? "bg-amber-200 text-amber-800"
                          : "bg-[#386851]/10 text-[#386851]"
                      } px-3 py-1 rounded-md text-xs font-medium`}
                    >
                      {specialty}
                    </span>
                  ))}
                </div>
              </div>

              {/* Stats Section */}
              <div className="mt-6 pt-4 border-gray-200 border-t">
                <div className="gap-4 grid grid-cols-2 text-center">
                  <div>
                    <div
                      className={`text-2xl font-bold ${
                        isMascot ? "text-amber-600" : "text-[#386851]"
                      }`}
                    >
                      {typeof member.experienceYears === "number"
                        ? member.experienceYears
                        : "5"}
                      +
                    </div>
                    <div
                      className={`text-xs uppercase tracking-wide ${
                        isMascot ? "text-amber-700" : "text-gray-600"
                      }`}
                    >
                      Years Exp
                    </div>
                  </div>
                  <div>
                    <div
                      className={`text-2xl font-bold ${
                        isMascot ? "text-amber-600" : "text-[#386851]"
                      }`}
                    >
                      {member.specialties?.length || 0}
                    </div>
                    <div
                      className={`text-xs uppercase tracking-wide ${
                        isMascot ? "text-amber-700" : "text-gray-600"
                      }`}
                    >
                      Specialties
                    </div>
                  </div>
                </div>
              </div>

              {/* Click to flip back indicator */}
              <div className="mt-4 text-center">
                <div
                  className={`flex items-center justify-center ${
                    isMascot ? "text-amber-600" : "text-[#386851]"
                  } text-xs`}
                >
                  <MaterialIcon icon="flip" size="sm" className="mr-1" />
                  <span>Click to flip back</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
