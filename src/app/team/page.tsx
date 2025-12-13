"use client";

import Link from "next/link";
import { Button } from "@/components/ui";
import { MaterialIcon } from "@/components/icons/MaterialIcon";
import { TeamProfileSection } from "@/components/team/TeamProfileSection";
import { FadeInWhenVisible } from "@/components/animations/FramerMotionComponents";
import {
  vintageTeamMembers,
  type VintageTeamMember,
} from "@/lib/data/vintage-team";
import { PageNavigation } from "@/components/navigation/PageNavigation";
import { Breadcrumb } from "@/components/navigation/Breadcrumb";
import { navigationConfigs } from "@/components/navigation/navigationConfigs";
import { TestimonialGrid } from "@/components/testimonials";
import { getEmployeeTestimonials } from "@/lib/data/testimonials";
import { gridPresets } from "@/lib/styles/layout-variants";
import { UnderConstruction } from "@/components/layout/UnderConstruction";

// Feature flag - set to false to show full page content
const SHOW_UNDER_CONSTRUCTION = true;

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
  // Show under construction notice while preserving all content below
  if (SHOW_UNDER_CONSTRUCTION) {
    return (
      <UnderConstruction
        pageName="Our Team"
        description="We're finalizing team member profiles and information to showcase the dedicated professionals who make MH Construction exceptional."
        estimatedCompletion="December 2025"
      />
    );
  }

  // Original page content preserved below - will be shown when flag is set to false
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
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-28 sm:pt-32 md:pt-36 lg:pt-40 pb-20 sm:pb-24 md:pb-28 lg:pb-32">
          <div className="space-y-2 sm:space-y-3 md:space-y-4">
            {/* Main Title */}
            <h1 className="text-lg xs:text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-black leading-tight tracking-tight">
              <span className="block text-brand-secondary font-black drop-shadow-lg">
                Team Six
              </span>
            </h1>

            {/* Subtitle */}
            <p className="max-w-3xl mx-auto text-xs xs:text-sm sm:text-base md:text-lg lg:text-xl text-white/90 leading-snug px-2 font-medium">
              Building Tomorrow's Success Today
            </p>

            {/* Leadership Statement */}
            <p className="max-w-4xl mx-auto text-xs sm:text-sm md:text-base lg:text-lg text-white/80 leading-relaxed px-4 font-medium">
              Leading the industry into tomorrow. 150+ years combined experience
              meets proven craftsmanship—where veteran values drive continuous
              growth. Award-winning .64 EMR safety, transparent communication,
              and a team invested in your success across the Pacific Northwest.
            </p>

            {/* Description */}
            <p className="max-w-4xl mx-auto text-xs sm:text-sm md:text-base lg:text-lg text-white/70 leading-relaxed px-4">
              Meet the professionals shaping the future of construction
              partnership. From Vision to Victory—every project, every
              partnership.
            </p>
          </div>
        </div>

        {/* Page-Specific Navigation Bar */}
        <PageNavigation
          items={navigationConfigs.team}
          className="absolute bottom-0 left-0 right-0"
        />
      </section>

      {/* Breadcrumb Navigation */}
      <Breadcrumb
        items={[{ label: "Home", href: "/" }, { label: "Team Six" }]}
      />

      <div className="bg-gray-50 dark:bg-gray-900 py-8 sm:py-12 md:py-16">
        <div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <div className="mb-8 sm:mb-12 md:mb-16 text-center">
            {/* Section Header - v4.0.2 Clean Standards */}
            <h2 className="mb-8 pb-2 font-black text-gray-900 dark:text-white text-3xl sm:text-4xl md:text-5xl lg:text-6xl leading-tight tracking-tighter">
              <span className="block mb-4 font-semibold text-gray-700 dark:text-gray-300 text-2xl sm:text-3xl md:text-4xl lg:text-5xl tracking-tight">
                Meet Our
              </span>
              <span className="block text-brand-primary dark:text-brand-primary font-black">
                Professional Team
              </span>
            </h2>
            <p className="mx-auto max-w-3xl font-light text-gray-600 dark:text-gray-300 text-lg sm:text-xl md:text-2xl leading-relaxed px-2">
              Modern professional profiles featuring comprehensive skill
              assessments, career achievements, and personal stories.
              Award-winning team bringing military precision to Pacific
              Northwest construction.
            </p>
          </div>

          {/* Team Members by Department */}
          <div className="space-y-16 sm:space-y-24 md:space-y-32">
            {departmentOrder.map((department) => {
              const members = membersByDepartment[department];
              if (!members || members.length === 0) return null;

              return (
                <div key={department} className="relative">
                  {/* Department header */}
                  <div className="mb-8 sm:mb-10 md:mb-12 text-center">
                    <h3 className="mb-4 sm:mb-5 md:mb-6 font-black text-brand-primary dark:text-brand-secondary text-xl xs:text-2xl sm:text-3xl md:text-4xl lg:text-5xl uppercase tracking-wide sm:tracking-wider px-2">
                      {department}
                    </h3>
                    <div className="bg-gradient-to-r from-transparent via-brand-secondary to-transparent mx-auto rounded-full w-32 sm:w-40 md:w-48 h-1"></div>
                  </div>

                  {/* Team member profiles */}
                  <div className="space-y-8 sm:space-y-10 md:space-y-12">
                    {members.map((member, index) => (
                      <FadeInWhenVisible key={member.slug}>
                        <TeamProfileSection member={member} index={index} />
                      </FadeInWhenVisible>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Company Culture Section */}
          <div
            id="company-culture"
            className="mt-12 sm:mt-16 md:mt-20 lg:mt-24"
          >
            <FadeInWhenVisible>
              <div className="bg-gradient-to-br from-brand-primary/5 to-brand-secondary/5 dark:from-brand-primary/10 dark:to-brand-secondary/10 p-6 sm:p-8 md:p-10 lg:p-12 rounded-xl md:rounded-2xl">
                <div className="mb-12 text-center">
                  {/* Section Header - v4.0.2 Clean Standards */}
                  <h2 className="mb-8 pb-2 font-black text-gray-900 dark:text-white text-3xl sm:text-4xl md:text-5xl lg:text-6xl leading-tight tracking-tighter">
                    <span className="block mb-4 font-semibold text-gray-700 dark:text-gray-300 text-2xl sm:text-3xl md:text-4xl lg:text-5xl tracking-tight">
                      Our Partnership
                    </span>
                    <span className="block text-brand-primary dark:text-brand-primary font-black">
                      Company Culture
                    </span>
                  </h2>
                  <p className="mx-auto max-w-3xl font-light text-gray-700 dark:text-gray-300 text-lg sm:text-xl md:text-2xl leading-relaxed px-2">
                    &ldquo;All for one, one for all&rdquo; isn&apos;t just a
                    motto—it&apos;s how we partner, grow, and succeed together.
                    Our people-centered culture starts with leadership committed
                    to serving both Client Partners and communities, maintaining
                    the highest standards of safety (.64 EMR award-winning),
                    quality craftsmanship, and transparent communication that
                    defines every partnership.
                  </p>
                </div>

                <div className="gap-4 sm:gap-6 md:gap-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mb-8 sm:mb-10 md:mb-12">
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
                        From veterans to civilians, office to field—we&apos;re
                        one partnership team with shared values forged through
                        military discipline and construction excellence. Every
                        client partner success belongs to all of us, every
                        safety milestone reflects our collective commitment, and
                        every project showcases our unified dedication to
                        quality.
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
                        When our client partners win, we all win—from AGC-WA Top
                        EMR Awards to 3+ years without time-loss injuries.
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
                <div className="bg-white dark:bg-gray-800 shadow-lg p-6 sm:p-7 md:p-8 rounded-lg md:rounded-xl">
                  <h3 className="mb-8 font-black text-gray-900 dark:text-white text-2xl sm:text-3xl md:text-4xl leading-tight tracking-tight text-center">
                    <span className="block mb-2 text-gray-700 dark:text-gray-300">
                      What Makes Our Partnership
                    </span>
                    <span className="block text-brand-primary">
                      Culture Special
                    </span>
                  </h3>
                  <div className={gridPresets.twoColumn("lg")}>
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
                            Veteran-Owned Military Precision
                          </h4>
                          <p className="text-gray-600 dark:text-gray-300">
                            Veteran-owned under Army veteran leadership since
                            January 2025. Structured military processes and
                            unwavering attention to detail meet creative
                            civilian problem-solving—discipline, leadership,
                            service, and excellence integrated into every
                            project phase with mission-focused results.
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
                            Open Communication & Transparency
                          </h4>
                          <p className="text-gray-600 dark:text-gray-300">
                            Every voice matters, from apprentice to owner, field
                            crew to executive leadership. Regular project
                            updates with photo documentation, immediate
                            notification of changes, and open-book pricing
                            ensure collaborative problem-solving and zero
                            surprises.
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
                            Award-Winning Safety First
                          </h4>
                          <p className="text-gray-600 dark:text-gray-300">
                            Presidential leadership focused on safety management
                            drives our .64 EMR award-winning record—40% better
                            than industry average. Multiple AGC-WA Top EMR
                            Awards, OSHA VPP Star designation, and 3+
                            consecutive years without time-loss injuries.
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
                            Community Focused & Regional Roots
                          </h4>
                          <p className="text-gray-600 dark:text-gray-300">
                            Building stronger communities through quality
                            craftsmanship, lasting relationships, and local
                            hiring preferences. Team members are deeply rooted
                            in the Tri-Cities and surrounding regions, with
                            personal investment in community success.
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
                            Work-Life Balance
                          </h4>
                          <p className="text-gray-600 dark:text-gray-300">
                            Supporting families and personal well-being while
                            maintaining project excellence. Flexible scheduling
                            when possible, predictable work hours, and respect
                            for time away from work.
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
                            Long-Term Partnership Mindset
                          </h4>
                          <p className="text-gray-600 dark:text-gray-300">
                            Building lasting partnerships that extend well
                            beyond project completion, with 70% referral
                            business proving the strength of our commitment to
                            client partner success and future growth together.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Quote Section */}
                <div className="mt-8 sm:mt-10 md:mt-12 text-center px-2">
                  <blockquote className="mb-4 font-medium text-brand-primary text-lg sm:text-xl md:text-2xl italic">
                    &ldquo;When you join MH Construction, you&apos;re not just
                    getting a job—you&apos;re joining a veteran-owned team that
                    values integrity, transparency, and building relationships
                    that last beyond project completion.&rdquo;
                  </blockquote>
                  <cite className="font-semibold text-brand-secondary">
                    — Jeremy Thamert, Owner & President
                  </cite>
                </div>
              </div>
            </FadeInWhenVisible>
          </div>

          {/* Career Growth Section */}
          <div id="career-growth" className="mt-12 sm:mt-16 md:mt-20 lg:mt-24">
            <FadeInWhenVisible>
              <div className="bg-gradient-to-br from-accent-500/5 to-primary-500/5 dark:from-accent-500/10 dark:to-primary-500/10 p-6 sm:p-8 md:p-10 lg:p-12 rounded-xl md:rounded-2xl">
                <div className="mb-12 text-center">
                  <h2 className="mb-8 pb-2 font-black text-gray-900 dark:text-white text-3xl sm:text-4xl md:text-5xl lg:text-6xl leading-tight tracking-tighter">
                    <span className="block mb-4 font-semibold text-gray-700 dark:text-gray-300 text-2xl sm:text-3xl md:text-4xl lg:text-5xl tracking-tight">
                      Professional Development &
                    </span>
                    <span className="block text-brand-primary dark:text-brand-primary font-black">
                      Career Growth
                    </span>
                  </h2>
                  <p className="mx-auto max-w-3xl font-light text-gray-700 dark:text-gray-300 text-lg sm:text-xl md:text-2xl leading-relaxed px-2">
                    We invest in your growth from day one. With structured
                    training programs, mentorship opportunities, and clear
                    advancement paths, your career trajectory is limited only by
                    your ambition and dedication.
                  </p>
                </div>

                <div className={gridPresets.cards3Alt("lg", "mb-12")}>
                  {/* Continuous Training */}
                  <FadeInWhenVisible>
                    <div className="bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl dark:hover:shadow-gray-700/50 p-8 rounded-xl transition-shadow duration-300">
                      <div className="flex justify-center items-center bg-gradient-to-r from-accent-600 to-accent-700 mx-auto mb-6 rounded-full w-16 h-16">
                        <MaterialIcon
                          icon="school"
                          size="lg"
                          className="text-white"
                        />
                      </div>
                      <h3 className="mb-4 font-bold text-gray-900 dark:text-white text-xl text-center">
                        Continuous Training
                      </h3>
                      <p className="text-gray-600 dark:text-gray-300 text-center leading-relaxed">
                        Regular training on new techniques, evolving safety
                        standards (OSHA 30, VPP Star), and emerging technology
                        integration. Stay at the forefront of construction
                        excellence with ongoing certification maintenance and
                        skills development.
                      </p>
                    </div>
                  </FadeInWhenVisible>

                  {/* Cross-Training */}
                  <FadeInWhenVisible>
                    <div className="bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl dark:hover:shadow-gray-700/50 p-8 rounded-xl transition-shadow duration-300">
                      <div className="flex justify-center items-center bg-gradient-to-r from-primary-600 to-primary-700 mx-auto mb-6 rounded-full w-16 h-16">
                        <MaterialIcon
                          icon="swap_horiz"
                          size="lg"
                          className="text-white"
                        />
                      </div>
                      <h3 className="mb-4 font-bold text-gray-900 dark:text-white text-xl text-center">
                        Cross-Training Programs
                      </h3>
                      <p className="text-gray-600 dark:text-gray-300 text-center leading-relaxed">
                        Expand your skillset across multiple specialties and
                        construction disciplines. Learn from experienced
                        professionals in different trades, increasing your
                        versatility and value within the organization.
                      </p>
                    </div>
                  </FadeInWhenVisible>

                  {/* Mentorship */}
                  <FadeInWhenVisible>
                    <div className="bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl dark:hover:shadow-gray-700/50 p-8 rounded-xl transition-shadow duration-300">
                      <div className="flex justify-center items-center bg-gradient-to-r from-secondary-600 to-secondary-700 mx-auto mb-6 rounded-full w-16 h-16">
                        <MaterialIcon
                          icon="people"
                          size="lg"
                          className="text-white"
                        />
                      </div>
                      <h3 className="mb-4 font-bold text-gray-900 dark:text-white text-xl text-center">
                        Structured Mentorship
                      </h3>
                      <p className="text-gray-600 dark:text-gray-300 text-center leading-relaxed">
                        Paired with experienced professionals who share 150+
                        years of combined knowledge freely. From apprentice to
                        master craftsman, from entry-level to leadership—your
                        mentor guides your journey every step of the way.
                      </p>
                    </div>
                  </FadeInWhenVisible>

                  {/* Career Paths */}
                  <FadeInWhenVisible>
                    <div className="bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl dark:hover:shadow-gray-700/50 p-8 rounded-xl transition-shadow duration-300">
                      <div className="flex justify-center items-center bg-gradient-to-r from-accent-600 to-accent-700 mx-auto mb-6 rounded-full w-16 h-16">
                        <MaterialIcon
                          icon="trending_up"
                          size="lg"
                          className="text-white"
                        />
                      </div>
                      <h3 className="mb-4 font-bold text-gray-900 dark:text-white text-xl text-center">
                        Clear Advancement Paths
                      </h3>
                      <p className="text-gray-600 dark:text-gray-300 text-center leading-relaxed">
                        Transparent career progression from apprentice →
                        journeyman → foreman → superintendent → project manager.
                        Your advancement is based on merit, skills, and
                        demonstrated leadership—not politics or tenure.
                      </p>
                    </div>
                  </FadeInWhenVisible>

                  {/* Leadership Development */}
                  <FadeInWhenVisible>
                    <div className="bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl dark:hover:shadow-gray-700/50 p-8 rounded-xl transition-shadow duration-300">
                      <div className="flex justify-center items-center bg-gradient-to-r from-primary-600 to-primary-700 mx-auto mb-6 rounded-full w-16 h-16">
                        <MaterialIcon
                          icon="stars"
                          size="lg"
                          className="text-white"
                        />
                      </div>
                      <h3 className="mb-4 font-bold text-gray-900 dark:text-white text-xl text-center">
                        Leadership Development
                      </h3>
                      <p className="text-gray-600 dark:text-gray-300 text-center leading-relaxed">
                        Emerging leaders receive specialized training in project
                        management, team leadership, client partner relations,
                        and business development. We build tomorrow&apos;s
                        construction leaders today.
                      </p>
                    </div>
                  </FadeInWhenVisible>

                  {/* Industry Involvement */}
                  <FadeInWhenVisible>
                    <div className="bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl dark:hover:shadow-gray-700/50 p-8 rounded-xl transition-shadow duration-300">
                      <div className="flex justify-center items-center bg-gradient-to-r from-secondary-600 to-secondary-700 mx-auto mb-6 rounded-full w-16 h-16">
                        <MaterialIcon
                          icon="hub"
                          size="lg"
                          className="text-white"
                        />
                      </div>
                      <h3 className="mb-4 font-bold text-gray-900 dark:text-white text-xl text-center">
                        Industry Involvement
                      </h3>
                      <p className="text-gray-600 dark:text-gray-300 text-center leading-relaxed">
                        Active participation in AGC, NAIOP, and other
                        professional organizations. Network with industry
                        leaders, stay current on regulations and best practices,
                        and represent MH Construction in the broader community.
                      </p>
                    </div>
                  </FadeInWhenVisible>
                </div>

                {/* Growth Stats */}
                <div className="bg-white dark:bg-gray-800 shadow-lg p-8 rounded-xl">
                  <h3 className="mb-8 font-black text-gray-900 dark:text-white text-2xl sm:text-3xl md:text-4xl leading-tight tracking-tight text-center">
                    <span className="block text-brand-primary">
                      Investment in Your Success
                    </span>
                  </h3>
                  <div className="gap-4 sm:gap-6 grid grid-cols-2 md:grid-cols-4">
                    <div className="text-center">
                      <p className="font-black text-2xl sm:text-3xl md:text-4xl text-primary-600 dark:text-brand-secondary">
                        150+
                      </p>
                      <p className="mt-2 text-gray-600 text-xs sm:text-sm dark:text-gray-400">
                        Years Combined Experience
                      </p>
                    </div>
                    <div className="text-center">
                      <p className="font-black text-2xl sm:text-3xl md:text-4xl text-primary-600 dark:text-brand-secondary">
                        100%
                      </p>
                      <p className="mt-2 text-gray-600 text-xs sm:text-sm dark:text-gray-400">
                        Training Funding
                      </p>
                    </div>
                    <div className="text-center">
                      <p className="font-black text-2xl sm:text-3xl md:text-4xl text-primary-600 dark:text-brand-secondary">
                        OSHA 30
                      </p>
                      <p className="mt-2 text-gray-600 text-xs sm:text-sm dark:text-gray-400">
                        Safety Certification
                      </p>
                    </div>
                    <div className="text-center">
                      <p className="font-black text-2xl sm:text-3xl md:text-4xl text-primary-600 dark:text-brand-secondary">
                        20+
                      </p>
                      <p className="mt-2 text-gray-600 text-xs sm:text-sm dark:text-gray-400">
                        Years in Business
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </FadeInWhenVisible>
          </div>

          {/* Employee Testimonials Section */}
          <div
            id="employee-testimonials"
            className="mt-12 sm:mt-16 md:mt-20 lg:mt-24"
          >
            <TestimonialGrid
              testimonials={getEmployeeTestimonials()}
              title="What Our Team Members Say"
              subtitle="Hear directly from the professionals who bring our partnership philosophy to life every day"
              variant="employee"
              columns={3}
              className="!py-0"
            />
          </div>

          {/* Call to Action - Careers Link */}
          <div className="mt-12 sm:mt-16 md:mt-20 text-center">
            <FadeInWhenVisible>
              <div className="bg-white dark:bg-gray-800 shadow-xl mx-auto p-6 sm:p-7 md:p-8 border border-brand-secondary rounded-lg max-w-2xl">
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
                  award-winning safety culture (.64 EMR) to veteran hiring
                  initiatives, continuous professional development to
                  competitive benefits. View our current openings and discover
                  the benefits of joining our veteran-owned partnership company
                  where your growth is our mission and every team member's
                  success matters.
                </p>
                <Link href="/careers">
                  <Button
                    variant="primary"
                    size="lg"
                    className="transition-all duration-300 w-full sm:w-auto sm:min-w-[280px]"
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
