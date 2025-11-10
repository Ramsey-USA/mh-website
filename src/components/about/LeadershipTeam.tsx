/**
 * Leadership Team Section for About Page
 * Displays leadership team members with flip cards
 */

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui";
import { MaterialIcon } from "@/components/icons/MaterialIcon";
import {
  FadeInWhenVisible,
  StaggeredFadeIn,
} from "@/components/animations/FramerMotionComponents";
import { gridPresets } from "@/lib/styles/layout-variants";

// Leadership Team Data - Enhanced with comprehensive details
export const leadershipTeam = [
  {
    name: "Jeremy Thamert",
    role: "President",
    experience:
      "Presidential leadership with strategic operational focus since January 2025",
    status: "Veteran-Owned Leadership",
    specialties: [
      "Safety Management & Organizational Standards",
      "Marketing Strategy & Brand Development",
      "Workforce Development & Team Building",
      "Human Resources & People-First Leadership",
      "Strategic Operations & Business Growth",
    ],
    philosophy:
      "Operational excellence through strategic focus on people, safety, and partnership relationships",
    icon: "account_balance",
  },
  {
    name: "Arnold Garcia",
    role: "Vice President",
    experience: "15+ years with MH Construction leading client partnerships",
    status: "Senior Leadership",
    specialties: [
      "Client Relationships & Partnership Development",
      "Strategic Operations & Business Growth",
      "Service Excellence & Quality Assurance",
      "Project Oversight & Risk Management",
      "Commercial & Industrial Project Leadership",
    ],
    philosophy:
      "Primary client liaison for major commercial and industrial projects—building partnerships that last beyond completion",
    icon: "business",
  },
  {
    name: "Mike Holstein",
    role: "Founder (Retired)",
    experience: "Company founder in 2010, construction leadership since 1995",
    status: "Retired Leadership",
    specialties: [
      "Company Foundations & Core Values Establishment",
      "Quality Standards Development",
      "Client Trust & Reputation Building",
      "Mentorship & Succession Planning",
      "Partnership Philosophy: 'We Work With You'",
    ],
    philosophy:
      'Established the "We Work With You, Not FOR You" partnership philosophy and THE ROI IS THE RELATIONSHIP mindset that defines MH Construction today',
    icon: "foundation",
  },
];

export function LeadershipTeam() {
  return (
    <section id="team" className="bg-gray-50 dark:bg-gray-800 py-16 lg:py-24">
      <div className="mx-auto px-4 container">
        <FadeInWhenVisible>
          <div className="mb-16 text-center">
            <MaterialIcon
              icon="people"
              className="mb-6 text-brand-primary text-6xl"
            />
            <h2 className="mb-6 font-black text-gray-900 dark:text-gray-100 text-5xl sm:text-6xl md:text-7xl lg:text-8xl leading-tight tracking-tighter">
              <span className="block mb-3 font-semibold text-gray-700 dark:text-gray-300 text-3xl sm:text-4xl md:text-5xl lg:text-6xl tracking-tight">
                Meet Our
              </span>
              <span className="block text-brand-primary dark:text-brand-primary font-black">
                Team
              </span>
            </h2>
            <p className="mx-auto max-w-3xl font-light text-gray-600 dark:text-gray-300 text-xl md:text-2xl lg:text-3xl leading-relaxed tracking-wide">
              Our leadership, crafted through military structure, alongside a
              team of skilled professionals, brings unwavering dedication and
              owner-first focus to every project
            </p>
          </div>
        </FadeInWhenVisible>

        <StaggeredFadeIn
          className={gridPresets.cards3("lg", "mx-auto max-w-7xl")}
        >
          {leadershipTeam.map((member, _index) => (
            <div
              key={_index}
              className="group perspective min-h-[600px] cursor-pointer"
              style={{ perspective: "1000px" }}
            >
              <div className="relative w-full h-full transition-transform duration-700 preserve-3d group-hover:rotate-y-180">
                {/* Front of card */}
                <div className="absolute inset-0 backface-hidden">
                  <Card className="bg-white dark:bg-gray-800 hover:shadow-xl dark:hover:shadow-gray-600/50 border border-gray-200 dark:border-gray-700 w-full h-full flex flex-col overflow-hidden">
                    <CardHeader className="pb-6 text-center flex-shrink-0 px-4 sm:px-6">
                      <div className="flex justify-center items-center bg-brand-primary mx-auto mb-4 p-4 rounded-full w-20 h-20">
                        <MaterialIcon
                          icon={member.icon}
                          className="text-white text-3xl"
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
                          className="mr-2 text-brand-accent text-xs sm:text-sm"
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
                        <p className="text-gray-700 dark:text-gray-300 text-xs sm:text-sm md:text-base italic leading-relaxed mb-6 break-words">
                          "{member.philosophy}"
                        </p>
                      </div>
                      <div className="flex items-center justify-center mt-4 text-brand-primary">
                        <MaterialIcon
                          icon="autorenew"
                          className="mr-2 text-xl sm:text-2xl animate-pulse"
                        />
                        <span className="font-medium text-xs sm:text-sm">
                          Hover to see specialties
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Back of card */}
                <div
                  className="absolute inset-0 backface-hidden rotate-y-180"
                  style={{ transform: "rotateY(180deg)" }}
                >
                  <Card className="bg-gradient-to-br from-brand-secondary to-brand-primary dark:from-brand-primary-dark dark:to-gray-900 border border-brand-secondary dark:border-brand-secondary/50 w-full h-full flex flex-col overflow-hidden">
                    <CardHeader className="pb-4 text-center flex-shrink-0 px-4 sm:px-6">
                      <div className="flex justify-center items-center bg-white/20 mx-auto mb-4 p-4 rounded-full w-20 h-20">
                        <MaterialIcon
                          icon={member.icon}
                          className="text-white text-3xl"
                        />
                      </div>
                      <CardTitle className="mb-2 text-white text-lg sm:text-xl md:text-2xl">
                        {member.name}
                      </CardTitle>
                      <div className="flex items-center justify-center mb-4">
                        <MaterialIcon
                          icon="star"
                          className="mr-2 text-brand-accent text-lg sm:text-xl"
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
                              className="flex-shrink-0 mt-0.5 mr-2 text-brand-accent text-base sm:text-lg"
                            />
                            <span className="text-white leading-relaxed text-xs sm:text-sm md:text-base break-words">
                              {specialty}
                            </span>
                          </li>
                        ))}
                      </ul>
                      <div className="flex items-center justify-center mt-6 text-white/80">
                        <MaterialIcon
                          icon="autorenew"
                          className="mr-2 text-lg sm:text-xl"
                        />
                        <span className="font-medium text-xs">
                          Hover to return
                        </span>
                      </div>
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
