"use client";

import Link from "next/link";
import Image from "next/image";
import { MaterialIcon } from "@/components/icons/MaterialIcon";

interface TeamMemberTagProps {
  /** Team member's name */
  name: string;
  /** Team member's role/position */
  role: string;
  /** Team member's slug for linking to profile */
  slug: string;
  /** Optional avatar image URL */
  avatar?: string;
  /** Variant: compact (horizontal) or default (vertical) */
  variant?: "compact" | "default";
  /** Show department badge */
  showDepartment?: boolean;
  /** Department name */
  department?: string;
  /** Additional CSS classes */
  className?: string;
}

/**
 * Team Member Tag Component
 *
 * Displays team member mini-cards on project case studies with links to Team page.
 * Creates trust and storytelling by highlighting who worked on each project.
 *
 * Features:
 * - Links to Team page with member anchor
 * - Hunter Green branding
 * - Avatar with fallback initials
 * - Compact and default variants
 * - Hover effects with scale transform
 * - Department badge option
 * - Accessible with ARIA labels
 *
 * @example
 * ```tsx
 * <TeamMemberTag
 *   name="Mike Hardy"
 *   role="Project Manager"
 *   slug="mike-hardy"
 *   avatar="/images/team/mike-hardy.jpg"
 *   variant="compact"
 * />
 * ```
 */
export function TeamMemberTag({
  name,
  role,
  slug,
  avatar,
  variant = "default",
  showDepartment = false,
  department,
  className = "",
}: TeamMemberTagProps) {
  // Generate initials from name
  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  // Compact variant (horizontal layout)
  if (variant === "compact") {
    return (
      <Link
        href={`/team#${slug}`}
        className={`
          group flex items-center gap-3 p-3 rounded-xl
          bg-white dark:bg-gray-800 
          border-2 border-gray-200 dark:border-gray-700
          hover:border-brand-primary dark:hover:border-brand-primary
          hover:shadow-lg hover:scale-105
          transition-all duration-300
          ${className}
        `}
        aria-label={`View ${name}'s profile on team page`}
      >
        {/* Avatar */}
        <div className="relative w-12 h-12 flex-shrink-0">
          {avatar ? (
            <Image
              src={avatar}
              alt={name}
              width={48}
              height={48}
              className="w-full h-full rounded-full object-cover border-2 border-brand-primary/20 group-hover:border-brand-primary transition-colors duration-300"
            />
          ) : (
            <div className="w-full h-full rounded-full bg-brand-primary/10 dark:bg-brand-primary/20 flex items-center justify-center border-2 border-brand-primary/20 group-hover:border-brand-primary transition-colors duration-300">
              <span className="text-brand-primary dark:text-brand-primary-light font-bold text-sm">
                {initials}
              </span>
            </div>
          )}
        </div>

        {/* Info */}
        <div className="flex-1 min-w-0">
          <p className="font-semibold text-gray-900 dark:text-white text-sm group-hover:text-brand-primary transition-colors duration-300 truncate">
            {name}
          </p>
          <p className="text-xs text-gray-600 dark:text-gray-400 truncate">
            {role}
          </p>
          {showDepartment && department && (
            <span className="inline-block mt-1 px-2 py-0.5 rounded-full bg-brand-primary/10 text-brand-primary text-xs font-medium">
              {department}
            </span>
          )}
        </div>

        {/* Arrow Icon */}
        <MaterialIcon
          icon="arrow_forward"
          size="sm"
          className="text-brand-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        />
      </Link>
    );
  }

  // Default variant (vertical layout)
  return (
    <Link
      href={`/team#${slug}`}
      className={`
        group block p-4 rounded-2xl text-center
        bg-white dark:bg-gray-800 
        border-2 border-gray-200 dark:border-gray-700
        hover:border-brand-primary dark:hover:border-brand-primary
        hover:shadow-xl hover:scale-105
        transition-all duration-300
        ${className}
      `}
      aria-label={`View ${name}'s profile on team page`}
    >
      {/* Avatar */}
      <div className="relative w-16 h-16 mx-auto mb-3">
        {avatar ? (
          <Image
            src={avatar}
            alt={name}
            width={64}
            height={64}
            className="w-full h-full rounded-full object-cover border-2 border-brand-primary/20 group-hover:border-brand-primary transition-colors duration-300"
          />
        ) : (
          <div className="w-full h-full rounded-full bg-brand-primary/10 dark:bg-brand-primary/20 flex items-center justify-center border-2 border-brand-primary/20 group-hover:border-brand-primary transition-colors duration-300">
            <span className="text-brand-primary dark:text-brand-primary-light font-bold text-lg">
              {initials}
            </span>
          </div>
        )}

        {/* View Profile Icon */}
        <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-brand-primary flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <MaterialIcon icon="arrow_forward" size="sm" className="text-white" />
        </div>
      </div>

      {/* Info */}
      <div>
        <p className="font-semibold text-gray-900 dark:text-white text-sm mb-1 group-hover:text-brand-primary transition-colors duration-300">
          {name}
        </p>
        <p className="text-xs text-gray-600 dark:text-gray-400">{role}</p>
        {showDepartment && department && (
          <span className="inline-block mt-2 px-2 py-1 rounded-full bg-brand-primary/10 text-brand-primary text-xs font-medium">
            {department}
          </span>
        )}
      </div>
    </Link>
  );
}

interface TeamMemberTagsProps {
  /** Array of team member data */
  members: Array<{
    name: string;
    role: string;
    slug: string;
    avatar?: string;
    department?: string;
  }>;
  /** Title for the section */
  title?: string;
  /** Variant for tags */
  variant?: "compact" | "default";
  /** Show department badges */
  showDepartments?: boolean;
  /** Maximum number of members to show initially */
  maxVisible?: number;
  /** Additional CSS classes */
  className?: string;
}

/**
 * Team Member Tags Container
 *
 * Groups multiple team member tags with optional "Show More" functionality.
 * Perfect for "On This Project" sections in case studies.
 *
 * @example
 * ```tsx
 * <TeamMemberTags
 *   title="On This Project"
 *   members={[
 *     { name: "Mike Hardy", role: "Project Manager", slug: "mike-hardy" },
 *     { name: "Aaron Ramsey", role: "CEO", slug: "aaron-ramsey" }
 *   ]}
 *   variant="compact"
 *   maxVisible={4}
 * />
 * ```
 */
export function TeamMemberTags({
  members,
  title = "On This Project",
  variant = "compact",
  showDepartments = false,
  maxVisible,
  className = "",
}: TeamMemberTagsProps) {
  const displayMembers = maxVisible ? members.slice(0, maxVisible) : members;
  const hiddenCount = maxVisible ? members.length - maxVisible : 0;

  return (
    <div className={`space-y-4 ${className}`}>
      {/* Section Header */}
      <div className="flex items-center gap-3">
        <MaterialIcon icon="groups" size="lg" className="text-brand-primary" />
        <h3 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">
          {title}
        </h3>
      </div>

      {/* Team Member Tags Grid */}
      <div
        className={`
        grid gap-3
        ${
          variant === "compact"
            ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
            : "grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5"
        }
      `}
      >
        {displayMembers.map((member) => (
          <TeamMemberTag
            key={member.slug}
            name={member.name}
            role={member.role}
            slug={member.slug}
            {...(member.avatar ? { avatar: member.avatar } : {})}
            variant={variant}
            showDepartment={showDepartments}
            {...(member.department ? { department: member.department } : {})}
          />
        ))}

        {/* Show More Card */}
        {hiddenCount > 0 && (
          <Link
            href="/team"
            className={`
              group flex items-center justify-center gap-2
              ${variant === "compact" ? "p-3" : "p-4"}
              rounded-${variant === "compact" ? "xl" : "2xl"}
              bg-brand-primary/5 dark:bg-brand-primary/10
              border-2 border-brand-primary/20 dark:border-brand-primary/30
              hover:bg-brand-primary/10 hover:border-brand-primary
              hover:scale-105
              transition-all duration-300
            `}
            aria-label="View all team members"
          >
            <MaterialIcon
              icon="add_circle"
              size="lg"
              className="text-brand-primary"
            />
            <div className="text-center">
              <p className="font-semibold text-brand-primary text-sm">
                +{hiddenCount} More
              </p>
              <p className="text-xs text-gray-600 dark:text-gray-400">
                View Team
              </p>
            </div>
          </Link>
        )}
      </div>

      {/* View Full Team Link */}
      <div className="pt-2">
        <Link
          href="/team"
          className="inline-flex items-center gap-2 text-brand-primary hover:text-brand-primary-dark transition-colors duration-300 group"
        >
          <MaterialIcon
            icon="arrow_forward"
            size="sm"
            className="group-hover:translate-x-1 transition-transform duration-300"
          />
          <span className="text-sm font-medium">Meet the Full Team</span>
        </Link>
      </div>
    </div>
  );
}
