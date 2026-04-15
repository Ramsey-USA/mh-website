/**
 * Leadership Team Teaser Section for About Page
 * Explains Chain of Command concept and drives users to full Teams page
 */

import Link from "next/link";
import { Card, CardContent, Button } from "@/components/ui";
import { MaterialIcon } from "@/components/icons/MaterialIcon";
import { BrandedContentSection } from "@/components/templates";

// Team specialties that make up our "Chain of Command" approach
const teamSpecialties = [
  {
    icon: "military_tech",
    title: "Mission Leadership",
    description:
      "Veteran-Owned operational discipline meets proven construction excellence",
  },
  {
    icon: "engineering",
    title: "Technical Precision",
    description:
      "Specialized expertise in commercial, industrial, and public sector projects",
  },
  {
    icon: "shield",
    title: "Safety Excellence",
    description:
      "OSHA VPP Star certified with consecutive Top EMR awards—zero-incident culture",
  },
  {
    icon: "handshake",
    title: "Client Partnership",
    description:
      "70% referral rate through service-earned trust and transparent communication",
  },
  {
    icon: "verified",
    title: "Quality Assurance",
    description:
      "Battle-tested standards ensuring first-time-right execution on every mission",
  },
  {
    icon: "groups",
    title: "Team Cohesion",
    description:
      "Individual specialists united under shared mission: Building projects for the Client, NOT the Dollar",
  },
];

export function LeadershipTeam() {
  return (
    <BrandedContentSection
      id="team"
      header={{
        icon: "military_tech",
        iconVariant: "primary",
        subtitle: "Chain of Command Excellence",
        title: "Leadership Team",
      }}
    >
      <div className="mx-auto max-w-4xl">
        {/* Introductory overview card */}
        <Card className="mb-12 bg-gradient-to-br from-brand-primary via-brand-primary-dark to-brand-primary-darker border-none text-white relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('/images/patterns/diagonal-stripes.svg')] opacity-10"></div>
          <CardContent className="relative py-8 px-6 sm:px-8 lg:px-10">
            <div className="flex items-center justify-center gap-4 mb-6">
              <div className="h-1 w-12 bg-white/50 rounded-full"></div>
              <MaterialIcon icon="stars" size="xl" className="text-white" />
              <div className="h-1 w-12 bg-white/50 rounded-full"></div>
            </div>
            <p className="text-white/90 text-lg lg:text-xl leading-relaxed mb-6">
              Military chain of command succeeds because each operator brings{" "}
              <span className="font-bold text-brand-secondary">
                specialized mastery
              </span>{" "}
              to a{" "}
              <span className="font-bold text-brand-secondary">
                unified mission
              </span>
              . MH Construction operates the same way—every team member from
              ownership to field personnel contributes unique expertise toward
              one goal:{" "}
              <span className="font-bold text-white">
                delivering exceptional results for our clients
              </span>
              .
            </p>
            <div className="flex items-center justify-center gap-2 text-brand-secondary font-bold text-sm uppercase tracking-wider">
              <MaterialIcon icon="stars" size="md" />
              <span>Individual Excellence. Collective Mission.</span>
              <MaterialIcon icon="stars" size="md" />
            </div>
          </CardContent>
        </Card>

        {/* Team Specialties Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mb-12 lg:mb-16">
          {teamSpecialties.map((specialty) => (
            <div key={specialty.title} className="group relative flex h-full">
              {/* Animated Border Glow */}
              <div className="absolute -inset-2 bg-gradient-to-br from-brand-primary/40 to-brand-primary-dark/40 rounded-2xl opacity-20 group-hover:opacity-100 blur-xl transition-all duration-500 group-hover:animate-pulse"></div>

              <div className="relative bg-white dark:bg-gray-800 rounded-xl border-2 border-gray-200 dark:border-gray-700 group-hover:border-transparent shadow-lg group-hover:shadow-2xl transition-all duration-300 overflow-hidden flex flex-col w-full">
                {/* Top Accent Bar */}
                <div className="h-2 bg-gradient-to-r from-brand-primary via-brand-primary-dark to-brand-primary-darker"></div>

                <div className="p-6 flex flex-col flex-1">
                  <div className="flex items-start gap-4 mb-4">
                    <div className="relative flex-shrink-0">
                      <div className="absolute -inset-2 bg-gradient-to-br from-brand-primary/40 to-brand-primary-dark/40 opacity-30 blur-lg rounded-xl"></div>
                      <div className="relative rounded-xl bg-gradient-to-br from-brand-primary via-brand-primary-dark to-brand-primary-darker p-3 shadow-xl group-hover:scale-110 transition-all duration-300">
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
                  <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
                    {specialty.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA to Team Page */}
        <div className="text-center">
          <div className="inline-block bg-gradient-to-r from-brand-primary/10 via-brand-secondary/10 to-bronze-600/10 dark:from-brand-primary/20 dark:via-brand-secondary/20 dark:to-bronze-600/20 rounded-2xl p-8 lg:p-12 border-2 border-brand-primary/30 dark:border-brand-primary/50">
            <h3 className="text-2xl lg:text-3xl font-black text-gray-900 dark:text-white mb-4">
              Meet Your Chain of Command
            </h3>
            <p className="text-gray-600 dark:text-gray-300 text-lg mb-8 max-w-2xl mx-auto">
              Discover the leaders, specialists, and field professionals who
              bring individual mastery to every MH Construction mission—each
              dedicated to your project's success.
            </p>
            <Link href="/team">
              <Button
                variant="primary"
                size="lg"
                className="group shadow-2xl hover:shadow-brand-primary/50 dark:hover:shadow-brand-primary/30"
              >
                <MaterialIcon
                  icon="arrow_forward"
                  size="md"
                  className="mr-2 group-hover:translate-x-1 transition-transform"
                />
                View Full Team Roster
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </BrandedContentSection>
  );
}
