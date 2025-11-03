"use client";

import React from "react";
import ReactMarkdown from "react-markdown";
import { ContentItem } from "@/lib/content/contentCache";
import { MaterialIcon } from "@/components/icons/MaterialIcon";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui";

interface TeamMember {
  name: string;
  title: string;
  experience: string;
  status: string;
  specialties: string[];
  description: string;
  category: string;
}

interface TeamRendererProps {
  content: ContentItem;
  className?: string;
}

export const TeamRenderer: React.FC<TeamRendererProps> = ({
  content,
  className = "",
}) => {
  // Parse team members from markdown content
  const parseTeamMembers = (markdownContent: string): TeamMember[] => {
    const members: TeamMember[] = [];
    const lines = markdownContent.split("\n");
    let currentMember: Partial<TeamMember> | null = null;
    let currentCategory = "";

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].trim();

      // Look for category headers
      if (line.startsWith("## ") && line.includes("Executive Leadership")) {
        currentCategory = "Executive Leadership";
      } else if (
        line.startsWith("## ") &&
        line.includes("Project Management")
      ) {
        currentCategory = "Project Management";
      } else if (line.startsWith("## ") && line.includes("Field Operations")) {
        currentCategory = "Field Operations";
      } else if (line.startsWith("## ") && line.includes("Client Relations")) {
        currentCategory = "Client Relations";
      }

      // Look for team member names (### format)
      else if (line.startsWith("### ") && line.includes(" - ")) {
        if (currentMember && currentMember.name) {
          members.push(currentMember as TeamMember);
        }

        const nameMatch = line.match(/### (.+?) - (.+)/);
        if (nameMatch) {
          currentMember = {
            name: nameMatch[1].trim(),
            title: nameMatch[2].trim(),
            experience: "",
            status: "",
            specialties: [],
            description: "",
            category: currentCategory,
          };
        }
      }

      // Look for experience
      else if (line.startsWith("- **Experience**:") && currentMember) {
        currentMember.experience = line.replace("- **Experience**: ", "");
      }

      // Look for status
      else if (line.startsWith("- **Status**:") && currentMember) {
        currentMember.status = line.replace("- **Status**: ", "");
      }

      // Look for specialties
      else if (line.startsWith("- **Core Specialties**:") && currentMember) {
        // Specialties might be on the next lines
        let j = i + 1;
        while (j < lines.length && lines[j].trim().startsWith("  - ")) {
          const specialty = lines[j].trim().replace("  - ", "");
          currentMember.specialties?.push(specialty);
          j++;
        }
        i = j - 1;
      }

      // Look for description (role/philosophy/impact)
      else if (
        (line.startsWith("- **Role**:") ||
          line.startsWith("- **Leadership Philosophy**:") ||
          line.startsWith("- **Impact**:")) &&
        currentMember
      ) {
        currentMember.description = line.replace(/- \*\*.+?\*\*: /, "");
      }
    }

    if (currentMember && currentMember.name) {
      members.push(currentMember as TeamMember);
    }

    return members;
  };

  const teamMembers = parseTeamMembers(content.content);

  // Group members by category
  const groupedMembers = teamMembers.reduce(
    (acc, member) => {
      if (!acc[member.category]) {
        acc[member.category] = [];
      }
      acc[member.category].push(member);
      return acc;
    },
    {} as Record<string, TeamMember[]>,
  );

  return (
    <div className={`team-content ${className}`}>
      {/* Header Section */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-primary mb-4">
          {content.title}
        </h1>
        <p className="text-xl text-neutral-600 dark:text-neutral-400 max-w-3xl mx-auto">
          Leadership & Core Team
        </p>
        <p className="text-lg text-secondary font-semibold mt-4">
          "We Work With You" - Our people-centered culture starts with
          leadership committed to serving both clients and communities.
        </p>
      </div>

      {/* Team Sections */}
      {Object.entries(groupedMembers).map(([category, members]) => (
        <div key={category} className="mb-12">
          <h2 className="text-3xl font-bold text-primary mb-8 text-center">
            <MaterialIcon
              icon={getCategoryIcon(category)}
              size="lg"
              className="inline mr-2 text-primary"
            />
            {category}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {members.map((member, index) => (
              <Card
                key={index}
                className="h-full hover:shadow-lg transition-shadow duration-300"
              >
                <CardHeader>
                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-primary/10 rounded-full">
                      <MaterialIcon
                        icon={getStatusIcon(member.status)}
                        size="md"
                        className="text-primary"
                      />
                    </div>
                    <div className="flex-1">
                      <CardTitle className="text-lg font-bold text-primary mb-1">
                        {member.name}
                      </CardTitle>
                      <p className="text-sm font-semibold text-secondary mb-2">
                        {member.title}
                      </p>
                      <p className="text-xs text-neutral-500 dark:text-neutral-400">
                        {member.experience}
                      </p>
                    </div>
                  </div>
                </CardHeader>

                <CardContent>
                  {member.status && (
                    <div className="mb-3">
                      <span
                        className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-semibold ${
                          member.status.includes("Veteran")
                            ? "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
                            : "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300"
                        }`}
                      >
                        <MaterialIcon
                          icon={
                            member.status.includes("Veteran")
                              ? "military_tech"
                              : "person"
                          }
                          size="sm"
                        />
                        {member.status}
                      </span>
                    </div>
                  )}

                  {member.description && (
                    <p className="text-sm text-neutral-700 dark:text-neutral-300 mb-3 leading-relaxed">
                      {member.description}
                    </p>
                  )}

                  {member.specialties.length > 0 && (
                    <div>
                      <h4 className="text-xs font-semibold text-primary mb-2 uppercase">
                        Core Specialties
                      </h4>
                      <div className="flex flex-wrap gap-1">
                        {member.specialties
                          .slice(0, 3)
                          .map((specialty, specIndex) => (
                            <span
                              key={specIndex}
                              className="px-2 py-1 bg-neutral-100 dark:bg-neutral-800 rounded text-xs text-neutral-600 dark:text-neutral-400"
                            >
                              {specialty}
                            </span>
                          ))}
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      ))}

      {/* Company Culture Section */}
      <div className="text-center bg-primary/5 rounded-lg p-8 mt-12">
        <h3 className="text-2xl font-bold text-primary mb-4">
          <MaterialIcon icon="handshake" size="md" className="inline mr-2" />
          Partnership Philosophy
        </h3>
        <p className="text-lg text-neutral-700 dark:text-neutral-300 mb-6 max-w-3xl mx-auto">
          MH Construction operates on a comprehensive 6-principle system that
          evolved from our original values to reflect our growth as a
          construction industry leader. Each value builds toward our ultimate
          goal:
          <strong className="text-primary"> Trust</strong> - the culmination of
          all other values working together.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="/about"
            className="inline-flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-lg hover:bg-primary-dark transition-colors"
          >
            <MaterialIcon icon="info" size="sm" />
            Learn Our Values
          </a>
          <a
            href="/contact"
            className="inline-flex items-center gap-2 bg-secondary text-white px-6 py-3 rounded-lg hover:bg-secondary-dark transition-colors"
          >
            <MaterialIcon icon="contact_mail" size="sm" />
            Meet the Team
          </a>
        </div>
      </div>
    </div>
  );
};

// Helper functions for icons
function getCategoryIcon(category: string): string {
  switch (category) {
    case "Executive Leadership":
      return "military_tech";
    case "Project Management":
      return "construction";
    case "Field Operations":
      return "engineering";
    case "Client Relations":
      return "handshake";
    default:
      return "groups";
  }
}

function getStatusIcon(status: string): string {
  if (status.includes("Veteran")) {
    return "military_tech";
  } else if (status.includes("Leadership")) {
    return "star";
  } else if (status.includes("Civilian")) {
    return "person";
  }
  return "badge";
}
