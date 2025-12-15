/**
 * Leadership Team Section for About Page
 * Displays leadership team members with interactive cards
 */

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui";
import { MaterialIcon } from "@/components/icons/MaterialIcon";
import { StaggeredFadeIn } from "@/components/animations/FramerMotionComponents";
import { gridPresets } from "@/lib/styles/layout-variants";
import { SectionHeader } from "@/components/ui/SectionHeader";

// Leadership Team Data - Enhanced with comprehensive details
export const leadershipTeam = [
  {
    name: "Jeremy Thamert",
    role: "Owner & President",
    experience:
      "Veteran-owned operational leadership with mission-focused strategic execution since January 2025",
    status: "Veteran-Owned Leadership",
    specialties: [
      "Zero-Incident Mission Culture & Organizational Standards",
      "Tactical Marketing Strategy & Brand Deployment",
      "Workforce Development & Mission-Ready Team Building",
      "Human Resources & People-First Operational Leadership",
      "Strategic Operations & Business Mission Growth",
    ],
    philosophy:
      "Operational excellence through military-grade discipline applied to people, safety, and partnership missions",
    icon: "military_tech",
  },
  {
    name: "Arnold Garcia",
    role: "Vice President",
    experience:
      "15+ years with MH Construction leading client mission partnerships",
    status: "Senior Leadership",
    specialties: [
      "Client Relationships & Strategic Partnership Deployment",
      "Tactical Operations & Mission-Driven Business Growth",
      "Service Excellence & Mission-Critical Quality Assurance",
      "Project Oversight & Tactical Risk Management",
      "Commercial & Industrial Construction Operation Leadership",
    ],
    philosophy:
      "Primary client liaison for major commercial and industrial construction missions—building partnerships that last beyond mission completion",
    icon: "hub",
  },
  {
    name: "Mike Holstein",
    role: "Founder (Retired)",
    experience:
      "Company founder in 2010, construction mission leadership since 1995",
    status: "Retired Leadership",
    specialties: [
      "Mission Foundation & Core Values Establishment",
      "Battle-Tested Quality Standards Development",
      "Client Trust & Service-Earned Reputation Building",
      "Mentorship & Strategic Succession Planning",
      "Partnership Philosophy: 'We Work With You'—Mission Together",
    ],
    philosophy:
      'Established the "We Work With You, Not FOR You" mission partnership philosophy and trust-built operational excellence that defines MH Construction today',
    icon: "history",
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
        <SectionHeader
          icon="groups"
          iconVariant="secondary"
          subtitle="Meet Our"
          title="Team"
          description="Our service-earned leadership team, with military-grade structure, alongside a team of battle-tested professionals, brings operational discipline, unwavering mission focus, and owner-first values to every construction operation"
        />

        <StaggeredFadeIn
          className={gridPresets.cards3("lg", "mx-auto max-w-7xl")}
        >
          {leadershipTeam.map((member, _index) => (
            <div
              key={_index}
              className="group h-[450px] sm:h-[480px] md:h-[500px] lg:h-[520px]"
              style={{ perspective: "1000px" }}
            >
              <div className="relative w-full h-full transition-transform duration-700 preserve-3d group-hover:rotate-y-180">
                {/* Front of card */}
                <div className="absolute inset-0 backface-hidden">
                  <Card className="bg-white dark:bg-gray-800 shadow-lg hover:shadow-2xl dark:hover:shadow-brand-primary/20 border border-gray-200 dark:border-gray-700 w-full h-full flex flex-col overflow-hidden transition-all duration-300">
                    <CardHeader className="pb-6 text-center flex-shrink-0 px-4 sm:px-6">
                      <div className="flex justify-center items-center bg-brand-primary mx-auto mb-4 p-4 rounded-full w-20 h-20">
                        <MaterialIcon
                          icon={member.icon}
                          size="xl"
                          className="text-white"
                        />
                      </div>
                      <CardTitle className="mb-2 text-gray-900 dark:text-white text-lg sm:text-xl md:text-2xl">
                        {member.name}
                      </CardTitle>
                      <p className="font-semibold text-brand-primary text-base sm:text-lg md:text-xl">
                        {member.role}
                      </p>
                      <div className="flex justify-center items-center mt-2">
                        <MaterialIcon
                          icon="schedule"
                          size="sm"
                          className="mr-2 text-brand-secondary"
                        />
                        <span className="text-gray-600 dark:text-gray-300 text-xs sm:text-sm md:text-base">
                          {member.experience}
                        </span>
                      </div>
                      <div className="mt-3">
                        <span className="pl-3 border-brand-secondary border-l-4 font-medium text-brand-secondary text-xs sm:text-sm md:text-base">
                          {member.status}
                        </span>
                      </div>
                    </CardHeader>
                    <CardContent className="pt-0 flex-grow px-4 sm:px-6">
                      <div className="pt-4 border-gray-100 dark:border-gray-600 border-t">
                        <p className="text-gray-700 dark:text-gray-300 text-xs sm:text-sm md:text-base italic leading-relaxed break-words">
                          "{member.philosophy}"
                        </p>
                      </div>
                      <div className="flex-shrink-0 mt-4 sm:mt-5 pt-3 sm:pt-4 border-t border-gray-300 dark:border-gray-600">
                        <div className="flex items-center justify-center gap-2 text-brand-primary dark:text-brand-primary-light">
                          <MaterialIcon
                            icon="autorenew"
                            size="md"
                            className="animate-spin-slow group-hover:animate-spin"
                          />
                          <span className="font-semibold text-xs sm:text-sm uppercase tracking-wider">
                            <span className="hidden sm:inline">
                              Hover to learn more
                            </span>
                            <span className="sm:hidden">Tap to learn more</span>
                          </span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Back of card */}
                <div
                  className="absolute inset-0 backface-hidden rotate-y-180"
                  style={{ transform: "rotateY(180deg)" }}
                >
                  <Card className="bg-gradient-to-br from-brand-secondary to-brand-primary dark:from-brand-primary-dark dark:to-gray-900 shadow-2xl dark:shadow-brand-primary/30 border border-brand-secondary dark:border-brand-secondary/50 w-full h-full flex flex-col overflow-hidden transition-all duration-300">
                    <CardHeader className="pb-4 text-center flex-shrink-0 px-4 sm:px-6">
                      <div className="flex justify-center items-center bg-white/20 mx-auto mb-4 p-4 rounded-full w-20 h-20">
                        <MaterialIcon
                          icon={member.icon}
                          size="xl"
                          className="text-white"
                        />
                      </div>
                      <CardTitle className="mb-2 text-white text-lg sm:text-xl md:text-2xl">
                        {member.name}
                      </CardTitle>
                      <div className="flex items-center justify-center mb-4">
                        <MaterialIcon
                          icon="star"
                          size="md"
                          className="mr-2 text-brand-secondary"
                        />
                        <p className="font-bold text-white text-base sm:text-lg md:text-xl">
                          Core Specialties
                        </p>
                      </div>
                    </CardHeader>
                    <CardContent className="pt-0 flex-grow px-4 sm:px-6">
                      <ul className="space-y-3">
                        {member.specialties.map((specialty, sIndex) => (
                          <li key={sIndex} className="flex items-start">
                            <MaterialIcon
                              icon="check_circle"
                              size="sm"
                              className="flex-shrink-0 mt-0.5 mr-2 text-brand-primary"
                            />
                            <span className="text-white leading-relaxed text-xs sm:text-sm md:text-base break-words">
                              {specialty}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          ))}
        </StaggeredFadeIn>
      </div>
    </section>
  );
}
