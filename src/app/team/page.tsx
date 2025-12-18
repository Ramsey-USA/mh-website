import Link from "next/link";
import dynamic from "next/dynamic";
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
import { getEmployeeTestimonials } from "@/lib/data/testimonials";
import { gridPresets } from "@/lib/styles/layout-variants";
import { UnderConstruction } from "@/components/layout/UnderConstruction";
import Head from "next/head";
import { StructuredData } from "@/components/seo/seo-meta";
import { getTeamSEO } from "@/lib/seo/page-seo-utils";
import {
  generateBreadcrumbSchema,
  breadcrumbPatterns,
} from "@/lib/seo/breadcrumb-schema";

// Lazy load heavy below-the-fold component
const TestimonialGrid = dynamic(
  () =>
    import("@/components/testimonials").then((mod) => ({
      default: mod.TestimonialGrid,
    })),
  { ssr: true },
);

// Feature flag - set to false to show full page content
const SHOW_UNDER_CONSTRUCTION = false;

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
  // Get enhanced SEO data for Team page
  const teamSEO = getTeamSEO();

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
    <>
      {/* SEO Meta Tags */}
      <Head>
        <title>{teamSEO.title as string}</title>
        <meta name="description" content={teamSEO.description as string} />
        {teamSEO.keywords && (
          <meta
            name="keywords"
            content={
              Array.isArray(teamSEO.keywords)
                ? teamSEO.keywords.join(", ")
                : teamSEO.keywords
            }
          />
        )}
        <link rel="canonical" href={teamSEO.openGraph?.url as string} />

        {/* Open Graph */}
        <meta
          property="og:title"
          content={teamSEO.openGraph?.title as string}
        />
        <meta
          property="og:description"
          content={teamSEO.openGraph?.description as string}
        />
        <meta property="og:url" content={teamSEO.openGraph?.url as string} />
        <meta property="og:type" content="website" />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={teamSEO.twitter?.title as string} />
        <meta
          name="twitter:description"
          content={teamSEO.twitter?.description as string}
        />
      </Head>

      {/* Structured Data */}
      {teamSEO.schemas && teamSEO.schemas.length > 0 && (
        <StructuredData data={teamSEO.schemas} />
      )}

      {/* Breadcrumb Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            generateBreadcrumbSchema(breadcrumbPatterns.team),
          ),
        }}
      />

      <div className="bg-gray-50 dark:bg-gray-900 min-h-screen">
        {/* Hero Section - v4.0.2 Standards */}
        <section className="relative bg-gradient-to-br from-gray-900 via-brand-primary to-gray-900 h-screen flex items-end justify-end text-white overflow-hidden">
          {/* Background Elements */}
          <div className="absolute inset-0 bg-gradient-to-br from-brand-primary/30 via-gray-900/80 to-brand-secondary/20"></div>

          {/* Content - Bottom Right */}
          <div className="relative z-30 mb-32 sm:mb-36 md:mb-40 lg:mb-44 mr-4 sm:mr-6 lg:mr-8 xl:mr-12 ml-auto max-w-2xl pointer-events-none pb-2">
            {/* Team Six Unit Icon */}
            <div className="flex justify-end mb-4">
              <MaterialIcon
                icon="groups"
                size="5xl"
                theme="military"
                className="drop-shadow-2xl opacity-90 hover:opacity-100 transition-opacity"
                ariaLabel="Team Six - Elite construction team"
              />
            </div>
            <h1 className="text-right text-base xs:text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-bold text-white drop-shadow-2xl leading-relaxed">
              <span className="block text-brand-secondary">Team Six</span>
              <span className="block text-brand-primary">
                150+ Years Combined Expertise
              </span>
              <span className="block text-white/90">
                Building projects for the client,{" "}
                <span className="font-black italic text-bronze-300">NOT</span>{" "}
                the dollar
              </span>
            </h1>
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

        <section className="relative bg-white dark:bg-gray-900 py-12 sm:py-16 lg:py-20 xl:py-24 overflow-hidden">
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
                      icon="groups"
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
                  Meet Our
                </span>
                <span className="block bg-gradient-to-r from-brand-primary via-brand-secondary to-brand-primary bg-clip-text text-transparent font-black drop-shadow-sm overflow-visible py-2 pb-3 leading-normal">
                  Elite Team
                </span>
              </h2>

              {/* Description with colored keyword highlighting */}
              <p className="mx-auto max-w-5xl font-light text-gray-700 dark:text-gray-300 text-base sm:text-lg md:text-xl lg:text-2xl leading-relaxed tracking-wide px-2">
                Modern professional profiles featuring{" "}
                <span className="font-bold text-brand-primary dark:text-brand-primary-light">
                  comprehensive skill assessments and career achievements
                </span>
                .{" "}
                <span className="font-bold text-gray-900 dark:text-white">
                  Award-winning team
                </span>{" "}
                bringing 150+ years combined experience and military precision
                to Pacific Northwest construction.
              </p>
            </div>

            {/* Team Members by Department */}
            <div className="space-y-16 sm:space-y-24 md:space-y-32">
              {departmentOrder.map((department) => {
                const members = membersByDepartment[department];
                if (!members || members.length === 0) return null;

                // Map departments to icons and descriptions
                const departmentConfig: {
                  [key: string]: { icon: string; description: string };
                } = {
                  "Executive Leadership": {
                    icon: "workspace_premium",
                    description:
                      "Command leadership setting strategic direction and maintaining mission-focused excellence across all operations.",
                  },
                  "Project Management & Estimating": {
                    icon: "engineering",
                    description:
                      "Mission planning and execution—precision estimating, strategic scheduling, and tactical project coordination.",
                  },
                  "Site & Field Operations": {
                    icon: "construction",
                    description:
                      "Boots-on-ground operations delivering quality craftsmanship with disciplined execution and safety excellence.",
                  },
                  "Administration & Support": {
                    icon: "support_agent",
                    description:
                      "Base operations providing critical logistics, communications, and administrative support for mission success.",
                  },
                };

                const config = departmentConfig[department] || {
                  icon: "groups",
                  description: "",
                };

                return (
                  <div key={department} className="relative">
                    {/* Department header with icon */}
                    <div className="mb-12 sm:mb-14 md:mb-16 text-center">
                      <div className="flex items-center justify-center mb-6">
                        <div className="flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-brand-primary to-brand-primary-dark rounded-2xl shadow-xl">
                          <MaterialIcon
                            icon={config.icon}
                            size="xl"
                            className="text-white"
                          />
                        </div>
                      </div>
                      <h3 className="mb-4 font-black text-gray-900 dark:text-white text-3xl sm:text-4xl md:text-5xl tracking-tight">
                        {department}
                      </h3>
                      {config.description && (
                        <p className="mb-4 text-gray-600 dark:text-gray-400 text-base sm:text-lg lg:text-xl max-w-3xl mx-auto leading-relaxed">
                          {config.description}
                        </p>
                      )}
                      <div className="bg-gradient-to-r from-transparent via-brand-primary to-transparent mx-auto rounded-full w-24 sm:w-32 h-1"></div>
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
              {/* Section Header - Military Construction Standard */}
              <div className="mb-16 sm:mb-20 text-center">
                {/* Icon with decorative lines */}
                <div className="flex items-center justify-center mb-8 gap-4">
                  <div className="h-1 w-16 bg-gradient-to-r from-transparent to-gray-300 dark:to-gray-600 rounded-full"></div>
                  <div className="relative">
                    <div className="absolute -inset-4 bg-gradient-to-br from-brand-secondary/30 to-bronze-600/30 blur-2xl rounded-full"></div>
                    <div className="relative bg-gradient-to-br from-brand-secondary via-bronze-700 to-bronze-800 p-5 rounded-2xl shadow-2xl border-2 border-white/50 dark:border-gray-600">
                      <MaterialIcon
                        icon="diversity_3"
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
                    Our Partnership
                  </span>
                  <span className="block bg-gradient-to-r from-brand-primary via-brand-secondary to-brand-primary bg-clip-text text-transparent font-black drop-shadow-sm overflow-visible py-2 pb-3 leading-normal">
                    Company Culture
                  </span>
                </h2>

                {/* Description with colored keyword highlighting */}
                <p className="mx-auto max-w-5xl font-light text-gray-700 dark:text-gray-300 text-base sm:text-lg md:text-xl lg:text-2xl leading-relaxed tracking-wide px-2">
                  &ldquo;
                  <span className="font-bold text-brand-primary dark:text-brand-primary-light">
                    All for one, one for all
                  </span>
                  &rdquo; isn't just a motto—it's how we partner, grow, and
                  succeed together. Our{" "}
                  <span className="font-bold text-gray-900 dark:text-white">
                    people-centered culture
                  </span>{" "}
                  starts with leadership committed to serving both clients and
                  communities, maintaining the highest standards of safety (.64
                  EMR award-winning), quality craftsmanship, and transparent
                  communication that defines every partnership.
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
                    <h3 className="mb-4 font-bold text-gray-900 dark:text-white text-xl sm:text-2xl text-center">
                      Team Unity
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 text-center leading-relaxed">
                      From veterans to civilians, office to field—we&apos;re one
                      team with shared values forged through military discipline
                      and construction excellence. Every client success belongs
                      to all of us, every safety milestone reflects our
                      collective commitment, and every project showcases our
                      unified dedication to quality.
                    </p>
                  </div>
                </FadeInWhenVisible>

                {/* Mutual Support */}
                <FadeInWhenVisible>
                  <div className="bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl dark:hover:shadow-gray-700/50 p-8 rounded-xl transition-shadow duration-300">
                    <div className="flex justify-center items-center bg-gradient-to-r from-brand-secondary to-brand-secondary-dark mx-auto mb-6 rounded-full w-16 h-16">
                      <MaterialIcon
                        icon="volunteer_activism"
                        size="lg"
                        theme="tactical"
                        ariaLabel="Mutual support"
                        className="text-white"
                      />
                    </div>
                    <h3 className="mb-4 font-bold text-gray-900 dark:text-white text-xl sm:text-2xl text-center">
                      Mutual Support
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 text-center leading-relaxed">
                      We lift each other up through mentorship programs, share
                      150+ years of combined knowledge freely, and ensure no one
                      faces challenges alone. Your growth is our growth—from
                      apprentice to master craftsman, from entry-level to
                      leadership, we invest in continuous professional
                      development and cross-training excellence.
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
                    <h3 className="mb-4 font-bold text-gray-900 dark:text-white text-xl sm:text-2xl text-center">
                      Shared Success
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 text-center leading-relaxed">
                      When our clients win, we all win—from AGC-WA Top EMR
                      Awards to 3+ years without time-loss injuries. Celebrating
                      achievements together (70% referral business), learning
                      from setbacks as a unified team, and building lasting
                      relationships that extend well beyond project completion.
                      THE ROI IS THE RELATIONSHIP.
                    </p>
                  </div>
                </FadeInWhenVisible>
              </div>

              {/* Culture Highlights */}
              <div className="bg-white dark:bg-gray-800 shadow-lg p-6 sm:p-7 md:p-8 rounded-lg md:rounded-xl">
                <h3 className="mb-8 font-black text-gray-900 dark:text-white text-3xl sm:text-4xl md:text-5xl leading-tight tracking-tight text-center">
                  <span className="block mb-2 text-gray-700 dark:text-gray-300">
                    What Makes Our
                  </span>
                  <span className="block text-brand-primary">
                    Team Culture Special
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
                        <h4 className="mb-1 font-bold text-gray-900 dark:text-white text-lg">
                          Veteran-Owned Military Precision
                        </h4>
                        <p className="text-gray-600 dark:text-gray-300">
                          Veteran-owned under Army veteran leadership since
                          January 2025. Structured military processes and
                          unwavering attention to detail meet creative civilian
                          problem-solving—discipline, leadership, service, and
                          excellence integrated into every project phase with
                          mission-focused results.
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
                        <h4 className="mb-1 font-bold text-gray-900 dark:text-white text-lg">
                          Open Communication & Transparency
                        </h4>
                        <p className="text-gray-600 dark:text-gray-300">
                          Every voice matters, from apprentice to owner, field
                          crew to executive leadership. Regular project updates
                          with photo documentation, immediate notification of
                          changes, and open-book pricing ensure collaborative
                          problem-solving and zero surprises.
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
                        <h4 className="mb-1 font-bold text-gray-900 dark:text-white text-lg">
                          Award-Winning Safety First
                        </h4>
                        <p className="text-gray-600 dark:text-gray-300">
                          Presidential leadership focused on safety management
                          drives our .64 EMR award-winning record—40% better
                          than industry average. Multiple AGC-WA Top EMR Awards,
                          OSHA VPP Star designation, and 3+ consecutive years
                          without time-loss injuries.
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
                        <h4 className="mb-1 font-bold text-gray-900 dark:text-white text-lg">
                          Community Focused & Regional Roots
                        </h4>
                        <p className="text-gray-600 dark:text-gray-300">
                          Building stronger communities through quality
                          craftsmanship, lasting relationships, and local hiring
                          preferences. Team members are deeply rooted in the
                          Tri-Cities and surrounding regions, with personal
                          investment in community success.
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
                        <h4 className="mb-1 font-bold text-gray-900 dark:text-white text-lg">
                          Work-Life Balance
                        </h4>
                        <p className="text-gray-600 dark:text-gray-300">
                          Supporting families and personal well-being while
                          maintaining project excellence. Flexible scheduling
                          when possible, predictable work hours, and respect for
                          time away from work.
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
                        <h4 className="mb-1 font-bold text-gray-900 dark:text-white text-lg">
                          Long-Term Relationship Mindset
                        </h4>
                        <p className="text-gray-600 dark:text-gray-300">
                          Building lasting relationships that extend well beyond
                          project completion, with 70% referral business proving
                          the strength of our commitment to client success and
                          future growth together.
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

            {/* Career Growth Section */}
            <div
              id="career-growth"
              className="mt-12 sm:mt-16 md:mt-20 lg:mt-24"
            >
              {/* Section Header - Military Construction Standard */}
              <div className="mb-16 sm:mb-20 text-center">
                {/* Icon with decorative lines */}
                <div className="flex items-center justify-center mb-8 gap-4">
                  <div className="h-1 w-16 bg-gradient-to-r from-transparent to-gray-300 dark:to-gray-600 rounded-full"></div>
                  <div className="relative">
                    <div className="absolute -inset-4 bg-gradient-to-br from-brand-secondary/30 to-bronze-700/30 blur-2xl rounded-full"></div>
                    <div className="relative bg-gradient-to-br from-brand-secondary via-bronze-700 to-bronze-800 p-5 rounded-2xl shadow-2xl border-2 border-white/50 dark:border-gray-600">
                      <MaterialIcon
                        icon="school"
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
                    Professional Development &
                  </span>
                  <span className="block bg-gradient-to-r from-brand-primary via-brand-secondary to-brand-primary bg-clip-text text-transparent font-black drop-shadow-sm overflow-visible py-2 pb-3 leading-normal">
                    Career Growth
                  </span>
                </h2>

                {/* Description with colored keyword highlighting */}
                <p className="mx-auto max-w-5xl font-light text-gray-700 dark:text-gray-300 text-base sm:text-lg md:text-xl lg:text-2xl leading-relaxed tracking-wide px-2">
                  We invest in your growth from day one. With{" "}
                  <span className="font-bold text-brand-primary dark:text-brand-primary-light">
                    structured training programs, mentorship opportunities, and
                    clear advancement paths
                  </span>
                  , your{" "}
                  <span className="font-bold text-gray-900 dark:text-white">
                    career trajectory is limited only by your ambition and
                    dedication
                  </span>
                  .
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
                    <h3 className="mb-4 font-bold text-gray-900 dark:text-white text-xl sm:text-2xl text-center">
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
                        icon="sync_alt"
                        size="lg"
                        ariaLabel="Cross-training"
                        className="text-white"
                      />
                    </div>
                    <h3 className="mb-4 font-bold text-gray-900 dark:text-white text-xl sm:text-2xl text-center">
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
                        icon="supervisor_account"
                        size="lg"
                        ariaLabel="Mentorship"
                        className="text-white"
                      />
                    </div>
                    <h3 className="mb-4 font-bold text-gray-900 dark:text-white text-xl sm:text-2xl text-center">
                      Structured Mentorship
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 text-center leading-relaxed">
                      Paired with experienced professionals who share 150+ years
                      of combined knowledge freely. From apprentice to master
                      craftsman, from entry-level to leadership—your mentor
                      guides your journey every step of the way.
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
                    <h3 className="mb-4 font-bold text-gray-900 dark:text-white text-xl sm:text-2xl text-center">
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
                        icon="badge"
                        size="lg"
                        ariaLabel="Leadership development"
                        className="text-white"
                      />
                    </div>
                    <h3 className="mb-4 font-bold text-gray-900 dark:text-white text-xl sm:text-2xl text-center">
                      Leadership Development
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 text-center leading-relaxed">
                      Emerging leaders receive specialized training in project
                      management, team leadership, client relations, and
                      business development. We build tomorrow&apos;s
                      construction leaders today.
                    </p>
                  </div>
                </FadeInWhenVisible>

                {/* Industry Involvement */}
                <FadeInWhenVisible>
                  <div className="bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl dark:hover:shadow-gray-700/50 p-8 rounded-xl transition-shadow duration-300">
                    <div className="flex justify-center items-center bg-gradient-to-r from-secondary-600 to-secondary-700 mx-auto mb-6 rounded-full w-16 h-16">
                      <MaterialIcon
                        icon="connect_without_contact"
                        size="lg"
                        ariaLabel="Industry involvement"
                        className="text-white"
                      />
                    </div>
                    <h3 className="mb-4 font-bold text-gray-900 dark:text-white text-xl sm:text-2xl text-center">
                      Industry Involvement
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 text-center leading-relaxed">
                      Active participation in AGC, NAIOP, and other professional
                      organizations. Network with industry leaders, stay current
                      on regulations and best practices, and represent MH
                      Construction in the broader community.
                    </p>
                  </div>
                </FadeInWhenVisible>
              </div>

              {/* Growth Stats */}
              <div className="bg-white dark:bg-gray-800 shadow-lg p-8 rounded-xl">
                <h3 className="mb-8 font-black text-gray-900 dark:text-white text-3xl sm:text-4xl md:text-5xl leading-tight tracking-tight text-center">
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
              <div className="bg-white dark:bg-gray-800 shadow-xl mx-auto p-6 sm:p-7 md:p-8 border border-brand-secondary rounded-lg max-w-2xl">
                {/* Section Header - v4.0.2 Clean Standards */}
                <h3 className="mb-6 font-black text-gray-900 dark:text-white text-3xl sm:text-4xl md:text-5xl leading-tight tracking-tight">
                  <span className="block mb-2 text-gray-700 dark:text-gray-300">
                    Interested in Joining
                  </span>
                  <span className="block text-brand-primary">Team Six?</span>
                </h3>
                <p className="mb-6 font-light text-gray-600 dark:text-gray-300 text-base sm:text-lg leading-relaxed">
                  Explore career opportunities and learn more about what makes
                  MH Construction a great place to work—from award-winning
                  safety culture (.64 EMR) to veteran hiring initiatives,
                  continuous professional development to competitive benefits.
                  View our current openings and discover the benefits of joining
                  our veteran-owned team where your growth is our mission and
                  every team member's success matters.
                </p>
                <Link href="/careers">
                  <Button
                    variant="primary"
                    size="lg"
                    className="transition-all duration-300 w-full sm:w-auto sm:min-w-[280px]"
                  >
                    <MaterialIcon icon="work" size="lg" className="mr-3" />
                    <span className="font-medium">
                      View Career Opportunities
                    </span>
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
