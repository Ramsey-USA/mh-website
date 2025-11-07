"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui";
import { MaterialIcon } from "@/components/icons/MaterialIcon";
import { VintageBaseballCard } from "@/components/ui/specialty/VintageBaseballCard";
import {
  FadeInWhenVisible,
  StaggeredFadeIn,
} from "@/components/animations/FramerMotionComponents";
import {
  vintageTeamMembers,
  type VintageTeamMember,
} from "@/lib/data/vintage-team";
import { PageNavigation } from "@/components/navigation/PageNavigation";
import { navigationConfigs } from "@/components/navigation/navigationConfigs";
import "../../styles/vintage-baseball-card.css";

// Group team members by department
function groupByDepartment(members: VintageTeamMember[]) {
  return members.reduce(
    (acc, member) => {
      const dept = member.department;
      if (!acc[dept]) {
        acc[dept] = [];
      }
      acc[dept].push(member);
      return acc;
    },
    {} as Record<string, VintageTeamMember[]>,
  );
}

export default function TeamPage() {
  const membersByDepartment = groupByDepartment(vintageTeamMembers);

  // Define department order matching the actual data
  const departmentOrder = [
    "Executive Leadership",
    "Project Management & Estimating",
    "Site & Field Operations",
    "Administration & Support",
  ];

  return (
    <div className="bg-gray-50 dark:bg-gray-900 min-h-screen">
      {/* Hero Section - v4.0.2 Standards */}
      <section className="relative bg-gradient-to-br from-gray-900 via-brand-primary to-gray-900 h-screen flex items-center justify-center text-white overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 bg-gradient-to-br from-brand-primary/30 via-gray-900/80 to-brand-secondary/20"></div>

        {/* Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-16 sm:pt-24 md:pt-32 lg:pt-40 pb-12 sm:pb-16 md:pb-20 lg:pb-28">
          <div className="space-y-2 sm:space-y-3 md:space-y-4 lg:space-y-6">
            {/* Main Title */}
            <h1 className="text-lg xs:text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-black leading-tight tracking-tight">
              <span className="block text-brand-secondary font-black drop-shadow-lg">
                Meet Your Partnership Team
              </span>
            </h1>

            {/* Subtitle */}
            <p className="max-w-3xl mx-auto text-xs xs:text-sm sm:text-base md:text-lg lg:text-xl text-white/90 leading-snug px-2">
              "THE ROI IS THE RELATIONSHIP"
            </p>

            {/* Leadership Statement */}
            <p className="max-w-4xl mx-auto text-xs sm:text-sm md:text-base lg:text-lg text-white/80 leading-relaxed px-4 font-medium">
              Veteran-owned under Army veteran leadership, our team of skilled
              professionals with over 150 years combined experience brings
              military precision, unwavering dedication, and owner-first focus
              to every project. From award-winning safety (.6 EMR) to
              exceptional craftsmanship, we deliver results with discipline and
              excellence throughout the Pacific Northwest.
            </p>

            {/* Description */}
            <p className="max-w-4xl mx-auto text-xs sm:text-sm md:text-base lg:text-lg text-white/70 leading-relaxed px-4">
              Discover your dedicated partners through authentic vintage-style
              trading cards. Click any card to flip and explore professional
              statistics, career highlights, certifications, and personal
              stories. Every team member embodies our "We Work With You"
              philosophy—transparent communication, collaborative
              problem-solving, and commitment to safety excellence from
              pre-construction planning through seamless close-out.
            </p>
          </div>
        </div>

        {/* Page-Specific Navigation Bar */}
        <PageNavigation
          items={navigationConfigs.team}
          className="absolute bottom-0 left-0 right-0"
        />
      </section>

      <div className="bg-gray-50 dark:bg-gray-900 py-16">
        <div className="mx-auto px-4 max-w-7xl">
          <div className="mb-16 text-center">
            {/* Section Header - v4.0.2 Clean Standards */}
            <h2 className="mb-8 pb-2 font-black text-gray-900 dark:text-white text-3xl sm:text-4xl md:text-5xl lg:text-6xl leading-tight tracking-tighter">
              <span className="block mb-4 font-semibold text-gray-700 dark:text-gray-300 text-2xl sm:text-3xl md:text-4xl lg:text-5xl tracking-tight">
                Professional
              </span>
              <span className="block text-brand-primary dark:text-brand-primary font-black">
                Team Cards
              </span>
            </h2>
            <p className="mx-auto max-w-3xl font-light text-gray-600 dark:text-gray-300 text-lg sm:text-xl md:text-2xl leading-relaxed px-2">
              Experience our award-winning team through vintage-style baseball
              cards featuring professional statistics, career achievements, and
              personal stories. Each card showcases the expertise, dedication,
              and safety excellence that makes MH Construction a leader in
              Pacific Northwest construction—from AGC-WA award recipients to
              veteran leadership bringing military precision to every project.
            </p>
          </div>

          {/* Team Members by Department */}
          <div className="space-y-24">
            {departmentOrder.map((department) => {
              const members = membersByDepartment[department];
              if (!members || members.length === 0) return null;

              return (
                <FadeInWhenVisible key={department}>
                  <div className="relative">
                    {/* MH-styled department header */}
                    <div className="mb-16 text-center">
                      <h3 className="mb-6 font-black text-brand-primary text-2xl sm:text-3xl md:text-4xl lg:text-5xl uppercase tracking-wider">
                        {department}
                      </h3>
                      <div className="bg-gradient-to-r from-transparent via-brand-secondary to-transparent mx-auto rounded-full w-48 h-1"></div>
                    </div>

                    {/* Vintage cards grid */}
                    <div className="justify-items-center gap-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                      {members.map((member, index) => (
                        <div
                          key={`${department}-${member.cardNumber || index}`}
                          className="transition-none"
                        >
                          <VintageBaseballCard member={member} />
                        </div>
                      ))}
                    </div>
                  </div>
                </FadeInWhenVisible>
              );
            })}
          </div>

          {/* Life at MH Section */}
          <div className="mt-24">
            <FadeInWhenVisible>
              <div className="bg-gradient-to-br from-brand-primary/5 to-brand-secondary/5 p-12 rounded-2xl">
                <div className="mb-12 text-center">
                  {/* Section Header - v4.0.2 Clean Standards */}
                  <h2 className="mb-8 pb-2 font-black text-gray-900 dark:text-white text-3xl sm:text-4xl md:text-5xl lg:text-6xl leading-tight tracking-tighter">
                    <span className="block mb-4 font-semibold text-gray-700 dark:text-gray-300 text-2xl sm:text-3xl md:text-4xl lg:text-5xl tracking-tight">
                      Partnership Life at
                    </span>
                    <span className="block text-brand-primary dark:text-brand-primary font-black">
                      MH Construction
                    </span>
                  </h2>
                  <p className="mx-auto max-w-3xl font-light text-gray-700 dark:text-gray-300 text-lg sm:text-xl md:text-2xl leading-relaxed px-2">
                    "All for one, one for all" isn't just a motto—it's how we
                    partner, grow, and succeed together. Our people-centered
                    culture starts with leadership committed to serving both
                    clients and communities, maintaining the highest standards
                    of safety (.6 EMR award-winning), quality craftsmanship, and
                    transparent communication that defines every partnership.
                  </p>
                </div>

                <div className="gap-8 grid grid-cols-1 lg:grid-cols-3 mb-12">
                  {/* Team Unity */}
                  <FadeInWhenVisible>
                    <div className="bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl dark:hover:shadow-gray-700/50 p-8 rounded-xl transition-shadow duration-300">
                      <div className="flex justify-center items-center bg-gradient-to-r from-brand-primary to-brand-primary-dark mx-auto mb-6 rounded-full w-16 h-16">
                        <MaterialIcon
                          icon="groups"
                          size="lg"
                          className="text-white"
                        />
                      </div>
                      <h3 className="mb-4 font-bold text-gray-900 dark:text-white text-xl text-center">
                        Partnership Unity
                      </h3>
                      <p className="text-gray-600 dark:text-gray-300 text-center leading-relaxed">
                        From veterans to civilians, office to field—we're one
                        partnership team with shared values forged through
                        military discipline and construction excellence. Every
                        partner success belongs to all of us, every safety
                        milestone reflects our collective commitment, and every
                        project showcases our unified dedication to quality.
                      </p>
                    </div>
                  </FadeInWhenVisible>

                  {/* Mutual Support */}
                  <FadeInWhenVisible>
                    <div className="bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl dark:hover:shadow-gray-700/50 p-8 rounded-xl transition-shadow duration-300">
                      <div className="flex justify-center items-center bg-gradient-to-r from-brand-secondary to-brand-secondary-dark mx-auto mb-6 rounded-full w-16 h-16">
                        <MaterialIcon
                          icon="favorite"
                          size="lg"
                          className="text-white"
                        />
                      </div>
                      <h3 className="mb-4 font-bold text-gray-900 dark:text-white text-xl text-center">
                        Mutual Support
                      </h3>
                      <p className="text-gray-600 dark:text-gray-300 text-center leading-relaxed">
                        We lift each other up through mentorship programs, share
                        150+ years of combined knowledge freely, and ensure no
                        one faces challenges alone. Your growth is our
                        growth—from apprentice to master craftsman, from
                        entry-level to leadership, we invest in continuous
                        professional development and cross-training excellence.
                      </p>
                    </div>
                  </FadeInWhenVisible>

                  {/* Shared Success */}
                  <FadeInWhenVisible>
                    <div className="bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl dark:hover:shadow-gray-700/50 p-8 rounded-xl transition-shadow duration-300">
                      <div className="flex justify-center items-center bg-gradient-to-r from-brand-primary-dark to-brand-primary-dark mx-auto mb-6 rounded-full w-16 h-16">
                        <MaterialIcon
                          icon="military_tech"
                          size="lg"
                          className="text-white"
                        />
                      </div>
                      <h3 className="mb-4 font-bold text-gray-900 dark:text-white text-xl text-center">
                        Partnership Success
                      </h3>
                      <p className="text-gray-600 dark:text-gray-300 text-center leading-relaxed">
                        When our partners win, we all win—from AGC-WA Top EMR
                        Awards to 3+ years without time-loss injuries.
                        Celebrating partnership achievements together (70%
                        referral business), learning from setbacks as a unified
                        team, and building lasting relationships that extend
                        well beyond project completion. THE ROI IS THE
                        RELATIONSHIP.
                      </p>
                    </div>
                  </FadeInWhenVisible>
                </div>

                {/* Culture Highlights */}
                <div className="bg-white dark:bg-gray-800 shadow-lg p-8 rounded-xl">
                  <h3 className="mb-8 font-black text-gray-900 dark:text-white text-2xl sm:text-3xl md:text-4xl leading-tight tracking-tight text-center">
                    <span className="block mb-2 text-gray-700 dark:text-gray-300">
                      What Makes Our Partnership
                    </span>
                    <span className="block text-brand-primary">
                      Culture Special
                    </span>
                  </h3>
                  <div className="gap-8 grid grid-cols-1 md:grid-cols-2">
                    <div className="space-y-6">
                      <div className="flex items-start space-x-4">
                        <div className="flex flex-shrink-0 justify-center items-center bg-brand-primary rounded-full w-8 h-8">
                          <MaterialIcon
                            icon="check"
                            size="sm"
                            className="text-white"
                          />
                        </div>
                        <div>
                          <h4 className="mb-1 font-semibold text-gray-900 dark:text-white">
                            Veteran-Owned Military Precision Meets Civilian
                            Innovation
                          </h4>
                          <p className="text-gray-600 dark:text-gray-300">
                            Veteran-owned under Army veteran leadership since
                            January 2025. Structured military processes and
                            unwavering attention to detail meet creative
                            civilian problem-solving—discipline, leadership,
                            service, and excellence integrated into every
                            project phase with mission-focused results and
                            reliability under pressure.
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start space-x-4">
                        <div className="flex flex-shrink-0 justify-center items-center bg-brand-primary rounded-full w-8 h-8">
                          <MaterialIcon
                            icon="check"
                            size="sm"
                            className="text-white"
                          />
                        </div>
                        <div>
                          <h4 className="mb-1 font-semibold text-gray-900 dark:text-white">
                            Continuous Learning & Professional Development
                          </h4>
                          <p className="text-gray-600 dark:text-gray-300">
                            Regular training on new techniques, evolving safety
                            standards (OSHA 30, VPP Star), and emerging
                            technology integration. Cross-training across
                            multiple specialties, structured mentorship programs
                            pairing experienced professionals with emerging
                            leaders, active industry involvement, and ongoing
                            certification maintenance ensure our team stays at
                            the forefront of construction excellence.
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start space-x-4">
                        <div className="flex flex-shrink-0 justify-center items-center bg-brand-primary rounded-full w-8 h-8">
                          <MaterialIcon
                            icon="check"
                            size="sm"
                            className="text-white"
                          />
                        </div>
                        <div>
                          <h4 className="mb-1 font-semibold text-gray-900 dark:text-white">
                            Work-Life Balance
                          </h4>
                          <p className="text-gray-600 dark:text-gray-300">
                            Supporting families and personal well-being
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="space-y-6">
                      <div className="flex items-start space-x-4">
                        <div className="flex flex-shrink-0 justify-center items-center bg-brand-secondary rounded-full w-8 h-8">
                          <MaterialIcon
                            icon="check"
                            size="sm"
                            className="text-white"
                          />
                        </div>
                        <div>
                          <h4 className="mb-1 font-semibold text-gray-900 dark:text-white">
                            Open Communication & Transparent Collaboration
                          </h4>
                          <p className="text-gray-600 dark:text-gray-300">
                            Transparent, honest dialogue with clients and team
                            members drives our partnership approach—every voice
                            matters, from apprentice to owner, field crew to
                            executive leadership. Regular project updates with
                            photo documentation, immediate notification of
                            changes, and open-book pricing ensure collaborative
                            problem-solving and zero surprises. You control it,
                            we manage it.
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start space-x-4">
                        <div className="flex flex-shrink-0 justify-center items-center bg-brand-secondary rounded-full w-8 h-8">
                          <MaterialIcon
                            icon="check"
                            size="sm"
                            className="text-white"
                          />
                        </div>
                        <div>
                          <h4 className="mb-1 font-semibold text-gray-900 dark:text-white">
                            Community Focused & Regional Roots
                          </h4>
                          <p className="text-gray-600 dark:text-gray-300">
                            Understanding that every project serves the broader
                            Pacific Northwest community—building stronger
                            communities through quality craftsmanship, lasting
                            relationships, and local hiring preferences. Team
                            members are deeply rooted in the Tri-Cities (Pasco,
                            Kennewick, Richland) and surrounding regions, with
                            personal investment in community success and
                            long-term regional development.
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start space-x-4">
                        <div className="flex flex-shrink-0 justify-center items-center bg-brand-secondary rounded-full w-8 h-8">
                          <MaterialIcon
                            icon="check"
                            size="sm"
                            className="text-white"
                          />
                        </div>
                        <div>
                          <h4 className="mb-1 font-semibold text-gray-900 dark:text-white">
                            Award-Winning Safety First Culture
                          </h4>
                          <p className="text-gray-600 dark:text-gray-300">
                            Presidential leadership focused on safety management
                            drives our .6 EMR award-winning record—40% better
                            than industry average. Multiple AGC-WA Top EMR
                            Awards (2019-2021, 2025 Most Improved), OSHA VPP
                            Star designation, and 3+ consecutive years without
                            time-loss injuries prove that everyone goes home
                            safe, every single day. No project timeline or
                            budget overrides safety—proactive hazard
                            identification, regular training, and high-quality
                            equipment standards ensure zero-incident culture.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Quote Section */}
                <div className="mt-12 text-center">
                  <blockquote className="mb-4 font-medium text-brand-primary text-2xl italic">
                    "When you join MH Construction, you're not just getting a
                    job—you're joining a veteran-owned team that values
                    integrity, transparency, and building relationships that
                    last beyond project completion. Our leadership focuses on
                    Safety, Marketing, Workforce Development, and Human
                    Resources—a strategic blend of operational oversight and
                    people-first management. With award-winning safety (.6 EMR),
                    150+ years combined experience, and military precision
                    guiding every decision, we create an environment where
                    excellence thrives and partnerships flourish."
                  </blockquote>
                  <cite className="font-semibold text-brand-secondary">
                    — Jeremy Thamert, President
                  </cite>
                </div>
              </div>
            </FadeInWhenVisible>
          </div>

          {/* Call to Action - Careers Link */}
          <div className="mt-20 text-center">
            <FadeInWhenVisible>
              <div className="bg-white dark:bg-gray-800 shadow-xl mx-auto p-8 border border-brand-secondary rounded-lg max-w-2xl">
                {/* Section Header - v4.0.2 Clean Standards */}
                <h3 className="mb-6 font-black text-gray-900 dark:text-white text-2xl sm:text-3xl md:text-4xl leading-tight tracking-tight">
                  <span className="block mb-2 text-gray-700 dark:text-gray-300">
                    Interested in Joining
                  </span>
                  <span className="block text-brand-primary">
                    Our Partnership Team?
                  </span>
                </h3>
                <p className="mb-6 font-light text-gray-600 dark:text-gray-300 text-base sm:text-lg leading-relaxed">
                  Explore partnership opportunities and learn more about what
                  makes MH Construction a great place to work— from
                  award-winning safety culture (.6 EMR) to veteran hiring
                  initiatives, continuous professional development to
                  competitive benefits. View our current openings and discover
                  the benefits of joining our veteran-owned partnership company
                  where THE ROI IS THE RELATIONSHIP applies to employees and
                  clients alike.
                </p>
                <Link href="/careers">
                  <Button
                    variant="primary"
                    size="lg"
                    className="transition-all duration-300 min-w-[280px]"
                  >
                    <MaterialIcon icon="work" size="lg" className="mr-3" />
                    <span className="font-medium">
                      View Partnership Opportunities
                    </span>
                  </Button>
                </Link>
              </div>
            </FadeInWhenVisible>
          </div>
        </div>
      </div>
    </div>
  );
}
