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
import { getEmployeeTestimonials } from "@/lib/data/testimonials";
import { TestimonialGrid } from "@/components/testimonials";
import { UnderConstruction } from "@/components/layout/UnderConstruction";
import Head from "next/head";
import { StructuredData } from "@/components/seo/seo-meta";
import { getTeamSEO } from "@/lib/seo/page-seo-utils";
import {
  generateBreadcrumbSchema,
  breadcrumbPatterns,
} from "@/lib/seo/breadcrumb-schema";

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

  // Define department order matching the Chain of Command structure
  const departmentOrder = [
    "The Upper Brass",
    "Mission Commanders",
    "Field Officers",
    "Special Operations",
    "Logistics Command",
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

      {/* FAQ Schema for Team Page */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: [
              {
                "@type": "Question",
                name: "What makes MH Construction's leadership team unique?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "MH Construction's Chain of Command brings together 150+ years combined military-grade expertise from all service branches (Army, Navy, Air Force, Marines, Coast Guard, Space Force). Our veteran-owned leadership combines military discipline with proven construction excellence.",
                },
              },
              {
                "@type": "Question",
                name: "Who leads MH Construction?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "MH Construction is led by Owner & President Jeremy Thamert (35+ years construction experience, 15 years Army aviation), Vice President Arnold Garcia (40+ years construction experience), and Founder Mike Holstein who established the company in 2010.",
                },
              },
              {
                "@type": "Question",
                name: "What is MH Construction's Chain of Command structure?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Our Chain of Command includes: The Upper Brass (executive leadership), Mission Commanders (project management and estimating), Special Operations (marketing and safety), Logistics Command (administration and support), and Field Officers (superintendents).",
                },
              },
              {
                "@type": "Question",
                name: "Is MH Construction veteran-owned?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Yes, MH Construction has been veteran-owned since January 2025 under Army veteran Jeremy Thamert's leadership. Our team honors all service branches with military precision and service-earned values.",
                },
              },
              {
                "@type": "Question",
                name: "Does MH Construction hire veterans?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Yes, MH Construction actively recruits veterans across all branches. We value military experience and offer veteran hiring initiatives, mentorship programs, and career development opportunities. Visit our careers page to learn more.",
                },
              },
            ],
          }),
        }}
      />

      <div className="bg-gray-50 dark:bg-gray-900 min-h-screen">
        {/* Hero Section */}
        <section className="relative h-screen flex items-end justify-end text-white overflow-hidden">
          {/* Background - Ready for photo or video */}
          <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-brand-primary to-gray-900">
            {/* Overlay for text readability */}
            <div className="absolute inset-0 bg-gradient-to-br from-brand-primary/30 via-gray-900/60 to-gray-900/80"></div>
          </div>

          {/* Header Text - Bottom Right */}
          <div className="relative z-30 mb-32 sm:mb-36 md:mb-40 lg:mb-44 mr-4 sm:mr-6 lg:mr-8 xl:mr-12 ml-auto max-w-2xl pointer-events-none pb-2">
            {/* Mission Icon */}
            <div className="flex justify-end mb-4">
              <div className="relative">
                <div className="absolute -inset-4 bg-gradient-to-br from-brand-primary/30 to-brand-primary-dark/30 blur-2xl rounded-full"></div>
                <div className="relative w-24 h-24 bg-gradient-to-br from-brand-primary via-brand-primary-dark to-brand-primary-darker rounded-2xl flex items-center justify-center shadow-2xl border-2 border-white/50 dark:border-gray-700/50">
                  <MaterialIcon
                    icon="groups"
                    size="2xl"
                    className="text-white drop-shadow-lg"
                    ariaLabel="Chain of Command - Elite construction team"
                  />
                </div>
              </div>
            </div>
            <h1 className="text-right text-base xs:text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-bold text-white drop-shadow-2xl leading-relaxed">
              <span className="block text-brand-secondary text-sm xs:text-base sm:text-lg md:text-xl lg:text-2xl mb-1">
                Chain of Command → Our Team
              </span>
              <span className="block text-brand-secondary">
                All-Branch Veteran Leadership You Can Trust
              </span>
              <span className="block text-brand-primary">
                150+ Years Combined Military-Grade Expertise
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
          items={[{ label: "Home", href: "/" }, { label: "Chain of Command" }]}
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
                Meet our{" "}
                <span className="font-bold text-brand-primary dark:text-brand-primary-light">
                  All-Branch veteran leadership team
                </span>{" "}
                honoring Army, Navy, Air Force, Marines, Coast Guard, and Space
                Force service.{" "}
                <span className="font-bold text-gray-900 dark:text-white">
                  Award-winning professionals
                </span>{" "}
                you can trust, bringing 150+ years combined military-grade
                expertise and precision to every{" "}
                <Link
                  href="/projects"
                  className="text-brand-primary hover:text-brand-primary-dark underline"
                >
                  Pacific Northwest construction mission
                </Link>
                . From{" "}
                <Link
                  href="/services"
                  className="text-brand-primary hover:text-brand-primary-dark underline"
                >
                  commercial and industrial construction
                </Link>{" "}
                to{" "}
                <Link
                  href="/public-sector"
                  className="text-brand-primary hover:text-brand-primary-dark underline"
                >
                  government projects
                </Link>
                , our Chain of Command delivers{" "}
                <Link
                  href="/about"
                  className="text-brand-primary hover:text-brand-primary-dark underline"
                >
                  service-earned values
                </Link>{" "}
                on every project.
              </p>
            </div>

            {/* Team Members by Department - First Two Departments */}
            <div className="space-y-16 sm:space-y-24 md:space-y-32">
              {departmentOrder.slice(0, 2).map((department) => {
                const members = membersByDepartment[department];
                if (!members || members.length === 0) return null;

                // Map departments to icons and descriptions
                const departmentConfig: {
                  [key: string]: {
                    icon: string;
                    description: string;
                    id: string;
                  };
                } = {
                  "The Upper Brass": {
                    icon: "workspace_premium",
                    description:
                      "Command leadership setting strategic direction and maintaining mission-focused excellence across all operations.",
                    id: "upper-brass",
                  },
                  "Mission Commanders": {
                    icon: "engineering",
                    description:
                      "Mission planning and execution—precision estimating, strategic scheduling, and tactical project coordination.",
                    id: "mission-commanders",
                  },
                };

                const config = departmentConfig[department] || {
                  icon: "groups",
                  description: "",
                  id: "team",
                };

                return (
                  <div
                    key={department}
                    id={config.id}
                    className="relative scroll-mt-20"
                  >
                    {/* Department header - Military Construction Standard */}
                    <div className="mb-12 sm:mb-14 md:mb-16 text-center">
                      {/* Icon with decorative lines */}
                      <div className="flex items-center justify-center mb-8 gap-4">
                        <div className="h-1 w-16 bg-gradient-to-r from-transparent to-gray-300 dark:to-gray-600 rounded-full"></div>
                        <div className="relative">
                          <div className="absolute -inset-4 bg-gradient-to-br from-brand-primary/30 to-brand-primary-dark/30 blur-2xl rounded-full"></div>
                          <div className="relative bg-gradient-to-br from-brand-primary via-brand-primary-dark to-brand-primary-darker p-5 rounded-2xl shadow-2xl border-2 border-white/50 dark:border-gray-600">
                            <MaterialIcon
                              icon={config.icon}
                              size="2xl"
                              className="text-white drop-shadow-lg"
                            />
                          </div>
                        </div>
                        <div className="h-1 w-16 bg-gradient-to-l from-transparent to-gray-300 dark:to-gray-600 rounded-full"></div>
                      </div>

                      {/* Single-line gradient heading for departments */}
                      <h3 className="mb-6 sm:mb-8 font-black text-gray-900 dark:text-white text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-tight tracking-tighter">
                        <span className="bg-gradient-to-r from-brand-primary via-brand-secondary to-brand-primary bg-clip-text text-transparent drop-shadow-sm">
                          {department}
                        </span>
                      </h3>

                      {/* Description with better styling */}
                      {config.description && (
                        <p className="mx-auto max-w-5xl font-light text-gray-700 dark:text-gray-300 text-base sm:text-lg md:text-xl lg:text-2xl leading-relaxed tracking-wide px-2">
                          {config.description}
                        </p>
                      )}
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
          </div>
        </section>

        {/* Employee Testimonials Section - Positioned at 25-30% for SEO */}
        <section
          id="employee-testimonials"
          className="relative bg-white dark:bg-gray-900 py-12 sm:py-16 lg:py-20 xl:py-24 overflow-hidden"
        >
          {/* Unique Diagonal Stripe Background Pattern */}
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
                  <div className="absolute -inset-4 bg-gradient-to-br from-brand-secondary/30 to-bronze-600/30 blur-2xl rounded-full"></div>
                  <div className="relative bg-gradient-to-br from-brand-secondary via-bronze-700 to-bronze-800 p-5 rounded-2xl shadow-2xl border-2 border-white/50 dark:border-gray-600">
                    <MaterialIcon
                      icon="forum"
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
                  What Our Team Members
                </span>
                <span className="block bg-gradient-to-r from-brand-primary via-brand-secondary to-brand-primary bg-clip-text text-transparent font-black drop-shadow-sm overflow-visible py-2 pb-3 leading-normal">
                  Say About Us
                </span>
              </h2>

              {/* Description with colored keywords */}
              <p className="mx-auto max-w-5xl font-light text-gray-700 dark:text-gray-300 text-base sm:text-lg md:text-xl lg:text-2xl leading-relaxed tracking-wide px-2">
                Hear directly from the professionals who bring our partnership
                philosophy to life every day—veteran and civilian voices united
                in{" "}
                <span className="font-bold text-brand-primary dark:text-brand-primary-light">
                  mission excellence
                </span>{" "}
                and{" "}
                <span className="font-bold text-gray-900 dark:text-white">
                  service-earned values
                </span>
                .
              </p>
            </div>

            <TestimonialGrid
              testimonials={getEmployeeTestimonials()}
              variant="employee"
              columns={3}
              className="!py-0"
            />
          </div>
        </section>

        {/* Remaining Departments - Field Officers and Logistics Command */}
        <section className="relative bg-gray-50 dark:bg-gray-900 py-12 sm:py-16 lg:py-20 xl:py-24 overflow-hidden">
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
            {/* Remaining Team Members by Department */}
            <div className="space-y-16 sm:space-y-24 md:space-y-32">
              {departmentOrder.slice(2).map((department) => {
                const members = membersByDepartment[department];
                if (!members || members.length === 0) return null;

                // Map departments to icons and descriptions
                const departmentConfig: {
                  [key: string]: {
                    icon: string;
                    description: string;
                    id: string;
                  };
                } = {
                  "Special Operations": {
                    icon: "military_tech",
                    description:
                      "Specialized operations in marketing, safety, and strategic initiatives driving competitive advantage.",
                    id: "special-operations",
                  },
                  "Logistics Command": {
                    icon: "support_agent",
                    description:
                      "Base operations providing critical logistics, communications, and administrative support for mission success.",
                    id: "logistics-command",
                  },
                  "Field Officers": {
                    icon: "construction",
                    description:
                      "Frontline operations delivering quality craftsmanship with disciplined execution and safety excellence.",
                    id: "field-officers",
                  },
                };

                const config = departmentConfig[department] || {
                  icon: "groups",
                  description: "",
                  id: "team",
                };

                return (
                  <div
                    key={department}
                    id={config.id}
                    className="relative scroll-mt-20"
                  >
                    {/* Department header - Military Construction Standard */}
                    <div className="mb-12 sm:mb-14 md:mb-16 text-center">
                      {/* Icon with decorative lines */}
                      <div className="flex items-center justify-center mb-8 gap-4">
                        <div className="h-1 w-16 bg-gradient-to-r from-transparent to-gray-300 dark:to-gray-600 rounded-full"></div>
                        <div className="relative">
                          <div className="absolute -inset-4 bg-gradient-to-br from-brand-primary/30 to-brand-primary-dark/30 blur-2xl rounded-full"></div>
                          <div className="relative bg-gradient-to-br from-brand-primary via-brand-primary-dark to-brand-primary-darker p-5 rounded-2xl shadow-2xl border-2 border-white/50 dark:border-gray-600">
                            <MaterialIcon
                              icon={config.icon}
                              size="2xl"
                              className="text-white drop-shadow-lg"
                            />
                          </div>
                        </div>
                        <div className="h-1 w-16 bg-gradient-to-l from-transparent to-gray-300 dark:to-gray-600 rounded-full"></div>
                      </div>

                      {/* Single-line gradient heading for departments */}
                      <h3 className="mb-6 sm:mb-8 font-black text-gray-900 dark:text-white text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-tight tracking-tighter">
                        <span className="bg-gradient-to-r from-brand-primary via-brand-secondary to-brand-primary bg-clip-text text-transparent drop-shadow-sm">
                          {department}
                        </span>
                      </h3>

                      {/* Description with better styling */}
                      {config.description && (
                        <p className="mx-auto max-w-5xl font-light text-gray-700 dark:text-gray-300 text-base sm:text-lg md:text-xl lg:text-2xl leading-relaxed tracking-wide px-2">
                          {config.description}
                        </p>
                      )}
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

              <div className="gap-6 sm:gap-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mb-12">
                {/* Team Unity */}
                <FadeInWhenVisible>
                  <div className="group relative bg-white dark:bg-gray-800 shadow-lg hover:shadow-2xl dark:hover:shadow-gray-700/50 p-8 rounded-xl transition-all duration-300 hover:-translate-y-1 border-2 border-transparent hover:border-brand-primary/20 dark:hover:border-brand-primary/30 flex flex-col h-full">
                    {/* Gradient overlay on hover */}
                    <div className="absolute inset-0 bg-gradient-to-br from-brand-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl"></div>

                    <div className="relative z-10 flex flex-col flex-grow">
                      <div className="flex justify-center items-center bg-gradient-to-r from-brand-primary to-brand-primary-dark group-hover:scale-110 mx-auto mb-6 rounded-full w-16 h-16 shadow-md group-hover:shadow-lg transition-all duration-300">
                        <MaterialIcon
                          icon="groups"
                          size="lg"
                          className="text-white"
                        />
                      </div>
                      <h3 className="mb-4 font-bold text-gray-900 dark:text-white text-xl sm:text-2xl text-center group-hover:text-brand-primary dark:group-hover:text-brand-primary-light transition-colors duration-300">
                        Team Unity
                      </h3>
                      <p className="text-gray-600 dark:text-gray-300 text-center leading-relaxed flex-grow">
                        From veterans to civilians, office to field—we&apos;re
                        one team with shared values forged through military
                        discipline and construction excellence. Every client
                        success belongs to all of us, every safety milestone
                        reflects our collective commitment, and every project
                        showcases our unified dedication to quality.
                      </p>
                    </div>
                  </div>
                </FadeInWhenVisible>

                {/* Mutual Support */}
                <FadeInWhenVisible>
                  <div className="group relative bg-white dark:bg-gray-800 shadow-lg hover:shadow-2xl dark:hover:shadow-gray-700/50 p-8 rounded-xl transition-all duration-300 hover:-translate-y-1 border-2 border-transparent hover:border-brand-secondary/20 dark:hover:border-brand-secondary/30 flex flex-col h-full">
                    {/* Gradient overlay on hover */}
                    <div className="absolute inset-0 bg-gradient-to-br from-brand-secondary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl"></div>

                    <div className="relative z-10 flex flex-col flex-grow">
                      <div className="flex justify-center items-center bg-gradient-to-r from-brand-secondary to-brand-secondary-dark group-hover:scale-110 mx-auto mb-6 rounded-full w-16 h-16 shadow-md group-hover:shadow-lg transition-all duration-300">
                        <MaterialIcon
                          icon="volunteer_activism"
                          size="lg"
                          theme="tactical"
                          ariaLabel="Mutual support"
                          className="text-white"
                        />
                      </div>
                      <h3 className="mb-4 font-bold text-gray-900 dark:text-white text-xl sm:text-2xl text-center group-hover:text-brand-secondary dark:group-hover:text-brand-secondary-light transition-colors duration-300">
                        Mutual Support
                      </h3>
                      <p className="text-gray-600 dark:text-gray-300 text-center leading-relaxed flex-grow">
                        We lift each other up through mentorship programs, share
                        150+ years of combined knowledge freely, and ensure no
                        one faces challenges alone. Your growth is our
                        growth—from apprentice to master craftsman, from
                        entry-level to leadership, we invest in continuous
                        professional development and cross-training excellence.
                      </p>
                    </div>
                  </div>
                </FadeInWhenVisible>

                {/* Shared Success */}
                <FadeInWhenVisible>
                  <div className="group relative bg-white dark:bg-gray-800 shadow-lg hover:shadow-2xl dark:hover:shadow-gray-700/50 p-8 rounded-xl transition-all duration-300 hover:-translate-y-1 border-2 border-transparent hover:border-brand-primary/20 dark:hover:border-brand-primary/30 flex flex-col h-full">
                    {/* Gradient overlay on hover */}
                    <div className="absolute inset-0 bg-gradient-to-br from-brand-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl"></div>

                    <div className="relative z-10 flex flex-col flex-grow">
                      <div className="flex justify-center items-center bg-gradient-to-r from-brand-primary-dark to-brand-primary-dark group-hover:scale-110 mx-auto mb-6 rounded-full w-16 h-16 shadow-md group-hover:shadow-lg transition-all duration-300">
                        <MaterialIcon
                          icon="military_tech"
                          size="lg"
                          className="text-white"
                        />
                      </div>
                      <h3 className="mb-4 font-bold text-gray-900 dark:text-white text-xl sm:text-2xl text-center group-hover:text-brand-primary dark:group-hover:text-brand-primary-light transition-colors duration-300">
                        Shared Success
                      </h3>
                      <p className="text-gray-600 dark:text-gray-300 text-center leading-relaxed flex-grow">
                        When our clients win, we all win—from AGC-WA Top EMR
                        Awards to 3+ years without time-loss injuries.
                        Celebrating achievements together (70% referral
                        business), learning from setbacks as a unified team, and
                        building lasting relationships that extend well beyond
                        project completion. THE ROI IS THE RELATIONSHIP.
                      </p>
                    </div>
                  </div>
                </FadeInWhenVisible>
              </div>

              {/* Culture Highlights - Enhanced */}
              <div className="relative bg-gradient-to-br from-white via-gray-50 to-white dark:from-gray-800 dark:via-gray-800/95 dark:to-gray-800 shadow-2xl p-8 sm:p-10 md:p-12 rounded-2xl border-2 border-brand-secondary/10 dark:border-brand-secondary/20 overflow-hidden">
                {/* Decorative background elements */}
                <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-brand-secondary/5 to-transparent rounded-full blur-3xl"></div>
                <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-brand-primary/5 to-transparent rounded-full blur-3xl"></div>

                <div className="relative z-10">
                  {/* Enhanced heading */}
                  <div className="flex flex-col items-center mb-10">
                    <div className="mb-6 p-4 bg-gradient-to-br from-brand-secondary to-bronze-700 rounded-2xl shadow-lg">
                      <MaterialIcon
                        icon="diversity_3"
                        size="xl"
                        className="text-white"
                        ariaLabel="Culture diversity"
                      />
                    </div>
                    <h3 className="font-black text-gray-900 dark:text-white text-3xl sm:text-4xl md:text-5xl leading-tight tracking-tight text-center">
                      <span className="block mb-2 text-gray-700 dark:text-gray-300 text-xl sm:text-2xl md:text-3xl font-semibold">
                        What Makes Our
                      </span>
                      <span className="block bg-gradient-to-r from-brand-secondary via-brand-primary to-brand-secondary bg-clip-text text-transparent">
                        Team Culture Special
                      </span>
                    </h3>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
                    <div className="space-y-6">
                      <div className="group flex items-start space-x-4 p-4 rounded-lg hover:bg-white/50 dark:hover:bg-gray-700/30 transition-colors duration-300">
                        <div className="flex flex-shrink-0 justify-center items-center bg-gradient-to-br from-brand-primary to-brand-primary-dark group-hover:scale-110 rounded-full w-10 h-10 shadow-md transition-transform duration-300">
                          <MaterialIcon
                            icon="military_tech"
                            size="sm"
                            className="text-white"
                          />
                        </div>
                        <div>
                          <h4 className="mb-2 font-bold text-gray-900 dark:text-white text-lg group-hover:text-brand-primary dark:group-hover:text-brand-primary-light transition-colors duration-300">
                            Veteran-Owned Military Precision
                          </h4>
                          <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                            Veteran-owned under Army veteran leadership since
                            January 2025. Structured military processes and
                            unwavering attention to detail meet creative
                            civilian problem-solving—discipline, leadership,
                            service, and excellence integrated into every
                            project phase with mission-focused results.
                          </p>
                        </div>
                      </div>
                      <div className="group flex items-start space-x-4 p-4 rounded-lg hover:bg-white/50 dark:hover:bg-gray-700/30 transition-colors duration-300">
                        <div className="flex flex-shrink-0 justify-center items-center bg-gradient-to-br from-brand-primary to-brand-primary-dark group-hover:scale-110 rounded-full w-10 h-10 shadow-md transition-transform duration-300">
                          <MaterialIcon
                            icon="forum"
                            size="sm"
                            className="text-white"
                          />
                        </div>
                        <div>
                          <h4 className="mb-2 font-bold text-gray-900 dark:text-white text-lg group-hover:text-brand-primary dark:group-hover:text-brand-primary-light transition-colors duration-300">
                            Open Communication & Transparency
                          </h4>
                          <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                            Every voice matters, from apprentice to owner, field
                            crew to executive leadership. Regular project
                            updates with photo documentation, immediate
                            notification of changes, and open-book pricing
                            ensure collaborative problem-solving and zero
                            surprises.
                          </p>
                        </div>
                      </div>
                      <div className="group flex items-start space-x-4 p-4 rounded-lg hover:bg-white/50 dark:hover:bg-gray-700/30 transition-colors duration-300">
                        <div className="flex flex-shrink-0 justify-center items-center bg-gradient-to-br from-brand-primary to-brand-primary-dark group-hover:scale-110 rounded-full w-10 h-10 shadow-md transition-transform duration-300">
                          <MaterialIcon
                            icon="verified_user"
                            size="sm"
                            className="text-white"
                          />
                        </div>
                        <div>
                          <h4 className="mb-2 font-bold text-gray-900 dark:text-white text-lg group-hover:text-brand-primary dark:group-hover:text-brand-primary-light transition-colors duration-300">
                            Award-Winning Safety First
                          </h4>
                          <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
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
                      <div className="group flex items-start space-x-4 p-4 rounded-lg hover:bg-white/50 dark:hover:bg-gray-700/30 transition-colors duration-300">
                        <div className="flex flex-shrink-0 justify-center items-center bg-gradient-to-br from-brand-secondary to-bronze-700 group-hover:scale-110 rounded-full w-10 h-10 shadow-md transition-transform duration-300">
                          <MaterialIcon
                            icon="location_city"
                            size="sm"
                            className="text-white"
                          />
                        </div>
                        <div>
                          <h4 className="mb-2 font-bold text-gray-900 dark:text-white text-lg group-hover:text-brand-secondary dark:group-hover:text-brand-secondary-light transition-colors duration-300">
                            Community Focused & Regional Roots
                          </h4>
                          <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                            Building stronger communities through quality
                            craftsmanship, lasting relationships, and local
                            hiring preferences. Team members are deeply rooted
                            in the Tri-Cities and surrounding regions, with
                            personal investment in community success.
                          </p>
                        </div>
                      </div>
                      <div className="group flex items-start space-x-4 p-4 rounded-lg hover:bg-white/50 dark:hover:bg-gray-700/30 transition-colors duration-300">
                        <div className="flex flex-shrink-0 justify-center items-center bg-gradient-to-br from-brand-secondary to-bronze-700 group-hover:scale-110 rounded-full w-10 h-10 shadow-md transition-transform duration-300">
                          <MaterialIcon
                            icon="balance"
                            size="sm"
                            className="text-white"
                          />
                        </div>
                        <div>
                          <h4 className="mb-2 font-bold text-gray-900 dark:text-white text-lg group-hover:text-brand-secondary dark:group-hover:text-brand-secondary-light transition-colors duration-300">
                            Work-Life Balance
                          </h4>
                          <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                            Supporting families and personal well-being while
                            maintaining project excellence. Flexible scheduling
                            when possible, predictable work hours, and respect
                            for time away from work.
                          </p>
                        </div>
                      </div>
                      <div className="group flex items-start space-x-4 p-4 rounded-lg hover:bg-white/50 dark:hover:bg-gray-700/30 transition-colors duration-300">
                        <div className="flex flex-shrink-0 justify-center items-center bg-gradient-to-br from-brand-secondary to-bronze-700 group-hover:scale-110 rounded-full w-10 h-10 shadow-md transition-transform duration-300">
                          <MaterialIcon
                            icon="handshake"
                            size="sm"
                            className="text-white"
                          />
                        </div>
                        <div>
                          <h4 className="mb-2 font-bold text-gray-900 dark:text-white text-lg group-hover:text-brand-secondary dark:group-hover:text-brand-secondary-light transition-colors duration-300">
                            Long-Term Relationship Mindset
                          </h4>
                          <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                            Building lasting relationships that extend well
                            beyond project completion, with 70% referral
                            business proving the strength of our commitment to
                            client success and future growth together.
                          </p>
                        </div>
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

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mb-12">
                {/* Continuous Training */}
                <FadeInWhenVisible>
                  <div className="group relative bg-white dark:bg-gray-800 shadow-lg hover:shadow-2xl dark:hover:shadow-gray-700/50 p-8 rounded-xl transition-all duration-300 hover:-translate-y-1 border-2 border-transparent hover:border-brand-primary/20 dark:hover:border-brand-primary/30 flex flex-col h-full">
                    {/* Gradient overlay on hover */}
                    <div className="absolute inset-0 bg-gradient-to-br from-brand-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl"></div>

                    <div className="relative z-10 flex flex-col flex-grow">
                      <div className="flex justify-center items-center bg-gradient-to-r from-accent-600 to-accent-700 group-hover:from-brand-primary group-hover:to-brand-primary-dark mx-auto mb-6 rounded-full w-16 h-16 shadow-md group-hover:shadow-lg transition-all duration-300 group-hover:scale-110">
                        <MaterialIcon
                          icon="school"
                          size="lg"
                          className="text-white"
                        />
                      </div>
                      <h3 className="mb-4 font-bold text-gray-900 dark:text-white text-xl sm:text-2xl text-center group-hover:text-brand-primary dark:group-hover:text-brand-primary-light transition-colors duration-300">
                        Continuous Training
                      </h3>
                      <p className="text-gray-600 dark:text-gray-300 text-center leading-relaxed flex-grow">
                        Regular training on new techniques, evolving safety
                        standards (OSHA 30, VPP Star), and emerging technology
                        integration. Stay at the forefront of construction
                        excellence with ongoing certification maintenance and
                        skills development.
                      </p>
                    </div>
                  </div>
                </FadeInWhenVisible>

                {/* Cross-Training */}
                <FadeInWhenVisible>
                  <div className="group relative bg-white dark:bg-gray-800 shadow-lg hover:shadow-2xl dark:hover:shadow-gray-700/50 p-8 rounded-xl transition-all duration-300 hover:-translate-y-1 border-2 border-transparent hover:border-brand-primary/20 dark:hover:border-brand-primary/30 flex flex-col h-full">
                    {/* Gradient overlay on hover */}
                    <div className="absolute inset-0 bg-gradient-to-br from-brand-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl"></div>

                    <div className="relative z-10 flex flex-col flex-grow">
                      <div className="flex justify-center items-center bg-gradient-to-r from-primary-600 to-primary-700 group-hover:from-brand-primary group-hover:to-brand-primary-dark mx-auto mb-6 rounded-full w-16 h-16 shadow-md group-hover:shadow-lg transition-all duration-300 group-hover:scale-110">
                        <MaterialIcon
                          icon="sync_alt"
                          size="lg"
                          ariaLabel="Cross-training"
                          className="text-white"
                        />
                      </div>
                      <h3 className="mb-4 font-bold text-gray-900 dark:text-white text-xl sm:text-2xl text-center group-hover:text-brand-primary dark:group-hover:text-brand-primary-light transition-colors duration-300">
                        Cross-Training Programs
                      </h3>
                      <p className="text-gray-600 dark:text-gray-300 text-center leading-relaxed flex-grow">
                        Expand your skillset across multiple specialties and
                        construction disciplines. Learn from experienced
                        professionals in different trades, increasing your
                        versatility and value within the organization.
                      </p>
                    </div>
                  </div>
                </FadeInWhenVisible>

                {/* Mentorship */}
                <FadeInWhenVisible>
                  <div className="group relative bg-white dark:bg-gray-800 shadow-lg hover:shadow-2xl dark:hover:shadow-gray-700/50 p-8 rounded-xl transition-all duration-300 hover:-translate-y-1 border-2 border-transparent hover:border-brand-primary/20 dark:hover:border-brand-primary/30 flex flex-col h-full">
                    {/* Gradient overlay on hover */}
                    <div className="absolute inset-0 bg-gradient-to-br from-brand-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl"></div>

                    <div className="relative z-10 flex flex-col flex-grow">
                      <div className="flex justify-center items-center bg-gradient-to-r from-secondary-600 to-secondary-700 group-hover:from-brand-secondary group-hover:to-brand-secondary-dark mx-auto mb-6 rounded-full w-16 h-16 shadow-md group-hover:shadow-lg transition-all duration-300 group-hover:scale-110">
                        <MaterialIcon
                          icon="supervisor_account"
                          size="lg"
                          ariaLabel="Mentorship"
                          className="text-white"
                        />
                      </div>
                      <h3 className="mb-4 font-bold text-gray-900 dark:text-white text-xl sm:text-2xl text-center group-hover:text-brand-primary dark:group-hover:text-brand-primary-light transition-colors duration-300">
                        Structured Mentorship
                      </h3>
                      <p className="text-gray-600 dark:text-gray-300 text-center leading-relaxed flex-grow">
                        Paired with experienced professionals who share 150+
                        years of combined knowledge freely. From apprentice to
                        master craftsman, from entry-level to leadership—your
                        mentor guides your journey every step of the way.
                      </p>
                    </div>
                  </div>
                </FadeInWhenVisible>

                {/* Career Paths */}
                <FadeInWhenVisible>
                  <div className="group relative bg-white dark:bg-gray-800 shadow-lg hover:shadow-2xl dark:hover:shadow-gray-700/50 p-8 rounded-xl transition-all duration-300 hover:-translate-y-1 border-2 border-transparent hover:border-brand-primary/20 dark:hover:border-brand-primary/30 flex flex-col h-full">
                    {/* Gradient overlay on hover */}
                    <div className="absolute inset-0 bg-gradient-to-br from-brand-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl"></div>

                    <div className="relative z-10 flex flex-col flex-grow">
                      <div className="flex justify-center items-center bg-gradient-to-r from-accent-600 to-accent-700 group-hover:from-brand-primary group-hover:to-brand-primary-dark mx-auto mb-6 rounded-full w-16 h-16 shadow-md group-hover:shadow-lg transition-all duration-300 group-hover:scale-110">
                        <MaterialIcon
                          icon="trending_up"
                          size="lg"
                          className="text-white"
                        />
                      </div>
                      <h3 className="mb-4 font-bold text-gray-900 dark:text-white text-xl sm:text-2xl text-center group-hover:text-brand-primary dark:group-hover:text-brand-primary-light transition-colors duration-300">
                        Clear Advancement Paths
                      </h3>
                      <p className="text-gray-600 dark:text-gray-300 text-center leading-relaxed flex-grow">
                        Transparent career progression from apprentice →
                        journeyman → foreman → superintendent → project manager.
                        Your advancement is based on merit, skills, and
                        demonstrated leadership—not politics or tenure.
                      </p>
                    </div>
                  </div>
                </FadeInWhenVisible>

                {/* Leadership Development */}
                <FadeInWhenVisible>
                  <div className="group relative bg-white dark:bg-gray-800 shadow-lg hover:shadow-2xl dark:hover:shadow-gray-700/50 p-8 rounded-xl transition-all duration-300 hover:-translate-y-1 border-2 border-transparent hover:border-brand-primary/20 dark:hover:border-brand-primary/30 flex flex-col h-full">
                    {/* Gradient overlay on hover */}
                    <div className="absolute inset-0 bg-gradient-to-br from-brand-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl"></div>

                    <div className="relative z-10 flex flex-col flex-grow">
                      <div className="flex justify-center items-center bg-gradient-to-r from-primary-600 to-primary-700 group-hover:from-brand-primary group-hover:to-brand-primary-dark mx-auto mb-6 rounded-full w-16 h-16 shadow-md group-hover:shadow-lg transition-all duration-300 group-hover:scale-110">
                        <MaterialIcon
                          icon="badge"
                          size="lg"
                          ariaLabel="Leadership development"
                          className="text-white"
                        />
                      </div>
                      <h3 className="mb-4 font-bold text-gray-900 dark:text-white text-xl sm:text-2xl text-center group-hover:text-brand-primary dark:group-hover:text-brand-primary-light transition-colors duration-300">
                        Leadership Development
                      </h3>
                      <p className="text-gray-600 dark:text-gray-300 text-center leading-relaxed flex-grow">
                        Emerging leaders receive specialized training in project
                        management, team leadership, client relations, and
                        business development. We build tomorrow&apos;s
                        construction leaders today.
                      </p>
                    </div>
                  </div>
                </FadeInWhenVisible>

                {/* Industry Involvement */}
                <FadeInWhenVisible>
                  <div className="group relative bg-white dark:bg-gray-800 shadow-lg hover:shadow-2xl dark:hover:shadow-gray-700/50 p-8 rounded-xl transition-all duration-300 hover:-translate-y-1 border-2 border-transparent hover:border-brand-primary/20 dark:hover:border-brand-primary/30 flex flex-col h-full">
                    {/* Gradient overlay on hover */}
                    <div className="absolute inset-0 bg-gradient-to-br from-brand-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl"></div>

                    <div className="relative z-10 flex flex-col flex-grow">
                      <div className="flex justify-center items-center bg-gradient-to-r from-secondary-600 to-secondary-700 group-hover:from-brand-secondary group-hover:to-brand-secondary-dark mx-auto mb-6 rounded-full w-16 h-16 shadow-md group-hover:shadow-lg transition-all duration-300 group-hover:scale-110">
                        <MaterialIcon
                          icon="connect_without_contact"
                          size="lg"
                          ariaLabel="Industry involvement"
                          className="text-white"
                        />
                      </div>
                      <h3 className="mb-4 font-bold text-gray-900 dark:text-white text-xl sm:text-2xl text-center group-hover:text-brand-primary dark:group-hover:text-brand-primary-light transition-colors duration-300">
                        Industry Involvement
                      </h3>
                      <p className="text-gray-600 dark:text-gray-300 text-center leading-relaxed flex-grow">
                        Active participation in AGC, NAIOP, and other
                        professional organizations. Network with industry
                        leaders, stay current on regulations and best practices,
                        and represent MH Construction in the broader community.
                      </p>
                    </div>
                  </div>
                </FadeInWhenVisible>
              </div>

              {/* Investment in Your Success - Enhanced Stats */}
              <div className="relative bg-gradient-to-br from-white via-gray-50 to-white dark:from-gray-800 dark:via-gray-800/95 dark:to-gray-800 shadow-2xl p-8 sm:p-10 md:p-12 rounded-2xl border-2 border-brand-primary/10 dark:border-brand-primary/20 overflow-hidden">
                {/* Decorative background elements */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-brand-primary/5 to-transparent rounded-full blur-3xl"></div>
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-gradient-to-tr from-brand-secondary/5 to-transparent rounded-full blur-3xl"></div>

                <div className="relative z-10">
                  {/* Icon and heading */}
                  <div className="flex flex-col items-center mb-10">
                    <div className="mb-6 p-4 bg-gradient-to-br from-brand-primary to-brand-primary-dark rounded-2xl shadow-lg">
                      <MaterialIcon
                        icon="trending_up"
                        size="xl"
                        className="text-white"
                        ariaLabel="Investment growth"
                      />
                    </div>
                    <h3 className="font-black text-gray-900 dark:text-white text-3xl sm:text-4xl md:text-5xl leading-tight tracking-tight text-center">
                      <span className="block mb-2 text-gray-700 dark:text-gray-300 text-xl sm:text-2xl md:text-3xl font-semibold">
                        Our Commitment
                      </span>
                      <span className="block bg-gradient-to-r from-brand-primary via-brand-secondary to-brand-primary bg-clip-text text-transparent">
                        Investment in Your Success
                      </span>
                    </h3>
                  </div>

                  {/* Stats Grid */}
                  <div className="gap-6 sm:gap-8 grid grid-cols-2 lg:grid-cols-4">
                    {/* Stat 1 */}
                    <div className="group text-center p-6 bg-white dark:bg-gray-800/50 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-gray-100 dark:border-gray-700">
                      <div className="mb-3 flex justify-center">
                        <div className="p-3 bg-gradient-to-br from-brand-primary/10 to-brand-primary/5 rounded-lg group-hover:from-brand-primary/20 group-hover:to-brand-primary/10 transition-colors duration-300">
                          <MaterialIcon
                            icon="military_tech"
                            size="lg"
                            className="text-brand-primary"
                          />
                        </div>
                      </div>
                      <p className="font-black text-3xl sm:text-4xl md:text-5xl bg-gradient-to-br from-brand-primary to-brand-primary-dark bg-clip-text text-transparent mb-2 group-hover:scale-110 transition-transform duration-300">
                        150+
                      </p>
                      <p className="text-gray-600 dark:text-gray-400 text-sm sm:text-base font-medium">
                        Years Combined
                        <br />
                        Experience
                      </p>
                    </div>

                    {/* Stat 2 */}
                    <div className="group text-center p-6 bg-white dark:bg-gray-800/50 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-gray-100 dark:border-gray-700">
                      <div className="mb-3 flex justify-center">
                        <div className="p-3 bg-gradient-to-br from-brand-secondary/10 to-brand-secondary/5 rounded-lg group-hover:from-brand-secondary/20 group-hover:to-brand-secondary/10 transition-colors duration-300">
                          <MaterialIcon
                            icon="paid"
                            size="lg"
                            className="text-brand-secondary"
                          />
                        </div>
                      </div>
                      <p className="font-black text-3xl sm:text-4xl md:text-5xl bg-gradient-to-br from-brand-secondary to-bronze-700 bg-clip-text text-transparent mb-2 group-hover:scale-110 transition-transform duration-300">
                        100%
                      </p>
                      <p className="text-gray-600 dark:text-gray-400 text-sm sm:text-base font-medium">
                        Training
                        <br />
                        Funding
                      </p>
                    </div>

                    {/* Stat 3 - AGC Awards */}
                    <div className="group text-center p-6 bg-white dark:bg-gray-800/50 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-gray-100 dark:border-gray-700">
                      <div className="mb-3 flex justify-center">
                        <div className="p-3 bg-gradient-to-br from-brand-primary/10 to-brand-primary/5 rounded-lg group-hover:from-brand-primary/20 group-hover:to-brand-primary/10 transition-colors duration-300">
                          <MaterialIcon
                            icon="emoji_events"
                            size="lg"
                            className="text-brand-primary"
                          />
                        </div>
                      </div>
                      <p className="font-black text-2xl sm:text-3xl md:text-4xl bg-gradient-to-br from-brand-primary to-brand-primary-dark bg-clip-text text-transparent mb-2 group-hover:scale-110 transition-transform duration-300">
                        AGC-WA
                      </p>
                      <p className="text-gray-600 dark:text-gray-400 text-sm sm:text-base font-medium">
                        Top EMR Awards
                        <br />
                        (Multiple Years)
                      </p>
                    </div>

                    {/* Stat 4 - Years in Business */}
                    <div className="group text-center p-6 bg-white dark:bg-gray-800/50 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-gray-100 dark:border-gray-700">
                      <div className="mb-3 flex justify-center">
                        <div className="p-3 bg-gradient-to-br from-brand-secondary/10 to-brand-secondary/5 rounded-lg group-hover:from-brand-secondary/20 group-hover:to-brand-secondary/10 transition-colors duration-300">
                          <MaterialIcon
                            icon="business"
                            size="lg"
                            className="text-brand-secondary"
                          />
                        </div>
                      </div>
                      <p className="font-black text-3xl sm:text-4xl md:text-5xl bg-gradient-to-br from-brand-secondary to-bronze-700 bg-clip-text text-transparent mb-2 group-hover:scale-110 transition-transform duration-300">
                        15+
                      </p>
                      <p className="text-gray-600 dark:text-gray-400 text-sm sm:text-base font-medium">
                        Years in Business
                        <br />
                        Since 2010
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Call to Action - Careers Link */}
            <div className="mt-12 sm:mt-16 md:mt-20 text-center">
              <div className="bg-white dark:bg-gray-800 shadow-xl mx-auto p-6 sm:p-7 md:p-8 border border-brand-secondary rounded-lg max-w-2xl">
                {/* Section Header - v4.0.2 Clean Standards */}
                <h3 className="mb-6 font-black text-gray-900 dark:text-white text-3xl sm:text-4xl md:text-5xl leading-tight tracking-tight">
                  <span className="block mb-2 text-gray-700 dark:text-gray-300">
                    Interested in Joining
                  </span>
                  <span className="block text-brand-primary">
                    Chain of Command?
                  </span>
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
