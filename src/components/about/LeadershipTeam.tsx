/**
 * Leadership Team Teaser Section for About Page
 * Explains Chain of Command concept and drives users to full Teams page
 */

import Link from "next/link";
import { Card, CardContent, Button } from "@/components/ui";
import { MaterialIcon } from "@/components/icons/MaterialIcon";

// Team specialties that make up our "Chain of Command" approach
const teamSpecialties = [
  {
    icon: "military_tech",
    title: "Mission Leadership",
    description:
      "Veteran-owned operational discipline meets proven construction excellence",
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
      "Individual specialists united under shared mission: building projects for the client, not the dollar",
  },
];

export function LeadershipTeam() {
  return (
    <section
      id="team"
      className="relative bg-white dark:bg-gray-900 py-12 sm:py-16 lg:py-20 xl:py-24 overflow-hidden"
    >
      {/* Diagonal Stripe Background Pattern */}
      <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05]">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `repeating-linear-gradient(
              45deg,
              #386851 0px,
              #386851 2px,
              transparent 2px,
              transparent 60px
            )`,
          }}
        ></div>
      </div>

      {/* Large Brand Color Blobs */}
      <div className="absolute top-20 right-[15%] w-96 h-96 bg-gradient-to-br from-brand-primary/10 to-transparent dark:from-brand-primary/20 blur-3xl rounded-full"></div>
      <div className="absolute bottom-20 left-[15%] w-96 h-96 bg-gradient-to-tr from-brand-secondary/10 to-transparent dark:from-brand-secondary/20 blur-3xl rounded-full"></div>

      <div className="relative z-10 mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        {/* Section Header - Military Construction Standard */}
        <div className="mb-16 sm:mb-20 text-center">
          {/* Icon with decorative lines */}
          <div className="flex items-center justify-center mb-8 gap-4">
            <div className="h-1 w-16 bg-gradient-to-r from-transparent to-gray-300 dark:to-gray-600 rounded-full"></div>
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-br from-brand-primary/30 to-brand-primary-dark/30 blur-2xl rounded-full"></div>
              <div className="relative bg-gradient-to-br from-brand-primary via-brand-primary-dark to-brand-primary-darker p-5 rounded-2xl shadow-2xl border-2 border-white/50 dark:border-gray-600">
                <MaterialIcon
                  icon="military_tech"
                  size="2xl"
                  className="text-white drop-shadow-lg"
                />
              </div>
            </div>
            <div className="h-1 w-16 bg-gradient-to-l from-transparent to-gray-300 dark:to-gray-600 rounded-full"></div>
          </div>

          {/* Two-line gradient heading */}
          <h2 className="mb-6 sm:mb-8 font-black text-gray-900 dark:text-white text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-relaxed tracking-tighter overflow-visible">
            <span className="block mb-3 sm:mb-4 font-semibold text-gray-700 dark:text-gray-200 text-xl xs:text-2xl sm:text-3xl md:text-4xl lg:text-5xl tracking-tight overflow-visible py-1">
              Chain of Command Excellence
            </span>
            <span className="block bg-gradient-to-r from-brand-primary via-brand-secondary to-brand-primary bg-clip-text text-transparent font-black drop-shadow-sm overflow-visible py-2 pb-3 leading-normal">
              Elite Specialists, Unified Mission
            </span>
          </h2>

          {/* Description with colored keyword highlighting */}
          <p className="mx-auto max-w-5xl font-light text-gray-700 dark:text-gray-300 text-base sm:text-lg md:text-xl lg:text-2xl leading-relaxed tracking-wide px-2">
            Like a military chain of command brings together elite individual
            specialists for mission-critical operations, MH Construction's{" "}
            <span className="font-bold text-brand-primary dark:text-brand-primary-light">
              Chain of Command
            </span>{" "}
            unites specialized expertise across leadership, safety, quality, and
            client partnership—each member essential to mission success.
          </p>
        </div>

        {/* Chain of Command Concept Card */}
        <div className="max-w-4xl mx-auto mb-12 lg:mb-16">
          <Card className="bg-gradient-to-br from-brand-primary to-brand-primary-dark dark:from-brand-primary-dark dark:to-gray-900 shadow-2xl border-2 border-brand-primary-light dark:border-brand-primary">
            <CardContent className="p-8 lg:p-12 text-center">
              <div className="flex justify-center mb-6">
                <div className="relative">
                  <div className="absolute -inset-4 bg-brand-secondary/30 blur-2xl rounded-full"></div>
                  <div className="relative w-24 h-24 bg-gradient-to-br from-brand-secondary via-brand-secondary-dark to-bronze-700 rounded-2xl flex items-center justify-center shadow-2xl border-2 border-white/50 dark:border-gray-700/50">
                    <MaterialIcon
                      icon="workspace_premium"
                      size="2xl"
                      className="text-white"
                    />
                  </div>
                </div>
              </div>
              <h3 className="text-2xl lg:text-3xl font-black text-white mb-4">
                Why "Chain of Command"?
              </h3>
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
        </div>

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
                  <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
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
            <p className="text-gray-600 dark:text-gray-400 text-lg mb-8 max-w-2xl mx-auto">
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
    </section>
  );
}
