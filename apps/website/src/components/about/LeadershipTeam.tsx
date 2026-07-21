/**
 * Leadership Team Teaser Section for About Page
 * Explains leadership structure and drives users to full Teams page
 */

import Link from "next/link";
import { Card, CardContent, Button } from "@/components/ui";
import { MaterialIcon } from "@/components/icons/MaterialIcon";
import { BrandedContentSection } from "@/components/templates";

// Team specialties that make up our leadership approach
const teamSpecialties = [
  {
    icon: "military_tech",
    title: "Leadership Accountability",
    description:
      "Veteran-owned leadership reinforces accountable planning, direct communication, and dependable follow-through.",
  },
  {
    icon: "engineering",
    title: "Technical Precision",
    description:
      "Practical field and preconstruction coordination across commercial, industrial, and public-sector work.",
  },
  {
    icon: "shield",
    title: "Safety Discipline",
    description:
      "Documented safety planning and jobsite controls are integrated into every delivery phase.",
  },
  {
    icon: "handshake",
    title: "Stakeholder Partnership",
    description:
      "Relationship-first communication keeps owners, operators, and trade partners aligned.",
  },
  {
    icon: "verified",
    title: "Quality Assurance",
    description:
      "Proven standards supporting first-time-right execution on every project",
  },
  {
    icon: "groups",
    title: "Team Cohesion",
    description:
      "Individual specialists aligned around scope clarity, execution discipline, and measurable project outcomes",
  },
];

export function LeadershipTeam({
  title = "",
  subtitle = "",
  description = "",
}: {
  title?: string;
  subtitle?: string;
  description?: string;
}) {
  return (
    <BrandedContentSection
      id="team"
      header={{
        icon: "military_tech",
        iconVariant: "primary",
        subtitle,
        title,
        description,
      }}
    >
      <div className="mx-auto max-w-4xl">
        {/* Introductory overview card */}
        <Card className="mb-12 bg-linear-to-br from-brand-primary via-brand-primary-dark to-brand-primary-darker border-none text-white relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('/images/patterns/diagonal-stripes.svg')] opacity-10"></div>
          <CardContent className="relative py-8 px-6 sm:px-8 lg:px-10">
            <div className="flex items-center justify-center gap-4 mb-6">
              <div className="h-1 w-12 bg-white/50 rounded-full"></div>
              <MaterialIcon icon="stars" size="xl" className="text-white" />
              <div className="h-1 w-12 bg-white/50 rounded-full"></div>
            </div>
            <p className="font-body text-white/90 text-lg lg:text-xl leading-relaxed mb-6">
              Strong construction delivery depends on each specialist bringing{" "}
              <span className="font-bold text-brand-secondary">
                specialized mastery
              </span>{" "}
              to a shared execution plan. MH Construction applies that model by
              coordinating ownership, preconstruction, field leadership, and
              trade execution around one goal:{" "}
              <span className="font-bold text-white">
                predictable quality, safe delivery, and long-term trust.
              </span>
            </p>
            <div className="font-heading flex items-center justify-center gap-2 text-brand-secondary font-bold text-sm uppercase tracking-wider">
              <MaterialIcon icon="stars" size="md" />
              <span>Individual Excellence. Collective Results.</span>
              <MaterialIcon icon="stars" size="md" />
            </div>
          </CardContent>
        </Card>

        {/* Team Specialties Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mb-12 lg:mb-16">
          {teamSpecialties.map((specialty) => (
            <div key={specialty.title} className="group relative flex h-full">
              {/* Animated Border Glow */}
              <div className="absolute -inset-2 bg-linear-to-br from-brand-primary/40 to-brand-primary-dark/40 rounded-2xl opacity-20 group-hover:opacity-100 blur-xl transition-all duration-500"></div>

              <Card className="relative flex w-full flex-col overflow-hidden border-2 border-gray-200 bg-white shadow-lg transition-all duration-300 group-hover:border-transparent group-hover:shadow-2xl dark:border-gray-700 dark:bg-gray-800">
                {/* Top Accent Bar */}
                <div className="h-2 bg-linear-to-r from-brand-primary via-brand-primary-dark to-brand-primary-darker"></div>

                <div className="p-6 flex flex-col flex-1">
                  <div className="flex items-start gap-4 mb-4">
                    <div className="relative shrink-0">
                      <div className="absolute -inset-2 bg-linear-to-br from-brand-primary/40 to-brand-primary-dark/40 opacity-30 blur-lg rounded-xl"></div>
                      <div className="relative rounded-xl bg-linear-to-br from-brand-primary via-brand-primary-dark to-brand-primary-darker p-3 shadow-xl transition-all duration-300">
                        <MaterialIcon
                          icon={specialty.icon}
                          size="lg"
                          className="text-white drop-shadow-lg"
                        />
                      </div>
                    </div>
                    <div>
                      <h3 className="font-black text-gray-900 dark:text-white text-lg mb-2">
                        {specialty.title}
                      </h3>
                    </div>
                  </div>
                  <p className="font-body text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
                    {specialty.description}
                  </p>
                </div>
              </Card>
            </div>
          ))}
        </div>

        {/* CTA to Team Page */}
        <div className="text-center">
          <div className="inline-block bg-linear-to-r from-brand-primary/10 via-brand-secondary/10 to-bronze-600/10 dark:from-brand-primary/20 dark:via-brand-secondary/20 dark:to-bronze-600/20 rounded-2xl p-8 lg:p-12 border-2 border-brand-primary/30 dark:border-brand-primary/50">
            <h3 className="text-2xl lg:text-3xl font-black text-gray-900 dark:text-white mb-4">
              Meet Your Leadership Team
            </h3>
            <p className="text-gray-600 dark:text-gray-300 text-lg mb-8 max-w-2xl mx-auto">
              Review approved team profiles and leadership responsibilities that
              support MH Construction's construction and operational standards.
            </p>
            <Button
              variant="primary"
              size="lg"
              className="group shadow-2xl hover:shadow-brand-primary/50 dark:hover:shadow-brand-primary/30"
              asChild
            >
              <Link href="/team">
                <MaterialIcon icon="arrow_forward" size="md" className="mr-2" />
                View Approved Team Profiles
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </BrandedContentSection>
  );
}
