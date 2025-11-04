"use client";

import React from "react";
import Link from "next/link";
import {
  Button,
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui";
import { MaterialIcon } from "@/components/icons/MaterialIcon";
import {
  FadeInWhenVisible,
  StaggeredFadeIn,
  HoverScale,
} from "@/components/animations/FramerMotionComponents";
import { OptimizedImage } from "@/components/ui/media/OptimizedImage";
import { PageNavigation } from "@/components/navigation/PageNavigation";
import { navigationConfigs } from "@/components/navigation/navigationConfigs";

// Core Values Data
const coreValues = [
  {
    iconName: "visibility",
    title: "Honesty & Transparency",
    subtitle: "Full-disclosure approach in all communications",
    description:
      "No hidden costs, surprise changes, or unclear timelines. We provide transparent pricing with detailed breakdowns of every cost component.",
    practices: [
      "Pre-construction meetings with complete cost breakdowns",
      "Regular project updates with photo documentation",
      "Open-book approach to material costs and labor",
      "Immediate notification of any project changes or delays",
    ],
  },
  {
    iconName: "verified_user",
    title: "Integrity",
    subtitle: "Unwavering commitment to what's right",
    description:
      "Ethical business practices, quality workmanship, and promise keeping. We never cut corners, even when no one is watching.",
    practices: [
      "Recommending solutions that benefit you, not just our profit margin",
      "Using specified materials and methods, never substituting without approval",
      "Standing behind our work with comprehensive warranties",
      "Treating your property with the same care we'd want for our own",
    ],
  },
  {
    iconName: "precision_manufacturing",
    title: "Precision & Experience",
    subtitle: "150+ years combined team expertise",
    description:
      "Deep technical knowledge across all construction disciplines with a military-precision approach to every project aspect.",
    practices: [
      "Detailed project planning with multiple contingency scenarios",
      "Precise measurements, calculations, and material estimates",
      "Quality control checkpoints at every project phase",
      "Expert problem-solving when unexpected challenges arise",
    ],
  },
  {
    iconName: "handshake",
    title: "Client-First Ethics",
    subtitle: "Small-town values with big-city capabilities",
    description:
      "Your vision comes first. We adapt our expertise to serve your goals and build lasting relationships, not just structures.",
    practices: [
      "Initial consultations focused on understanding your unique needs",
      "Flexible scheduling that works with your timeline and priorities",
      "Multiple communication channels (phone, email, text, in-person)",
      "Solutions scaled to your budget without compromising quality",
    ],
  },
  {
    iconName: "settings",
    title: "Professionalism & Control",
    subtitle: '"You control it, we manage it"',
    description:
      "Shared decision making where you maintain control while we provide expert guidance and handle all logistics.",
    practices: [
      "Decision points clearly identified and explained before work proceeds",
      "Daily briefings on progress and upcoming decisions needed",
      "Professional appearance and conduct on your property",
      "Coordination of all subcontractors and material deliveries",
    ],
  },
  {
    iconName: "shield",
    title: "Trust (The Culmination)",
    subtitle: "The ultimate goal of all other values",
    description:
      "Trust isn't just another value—it's the result when all other values are consistently demonstrated. It's our ultimate goal and measurable foundation.",
    practices: [
      "Consistency: Delivering the same high standards on every project",
      "Reliability: Being where we say we'll be, when we say we'll be there",
      "Competence: Demonstrating expertise through quality results",
      "Character: Doing the right thing, especially when it's difficult",
    ],
  },
];

// Company Stats
const companyStats = [
  { iconName: "calendar_today", value: "2010", label: "Company Founded" },
  { iconName: "groups", value: "150+", label: "Years Combined Experience" },
  { iconName: "star", value: "98%", label: "Client Satisfaction" },
  { iconName: "diversity_3", value: "70%", label: "Referral Rate" },
];

// Leadership Team Data
const leadershipTeam = [
  {
    name: "Jeremy Thamert",
    role: "Owner & General Manager",
    experience: "U.S. Army Veteran | 2 years leading MH Construction",
    status: "U.S. Army Veteran",
    specialties: [
      "Strategic Vision & Business Development",
      "Technology Integration & Innovation",
      "AI Adoption & Digital Transformation",
      "Operational Leadership & Team Management",
    ],
    philosophy:
      "Bringing veteran leadership and military precision to construction excellence",
    icon: "military_tech",
  },
  {
    name: "Arnold Garcia",
    role: "Vice President",
    experience: "15 years with MH Construction",
    status: "Civilian Leadership",
    specialties: [
      "Client Relationships & Partnership Development",
      "Strategic Operations & Business Growth",
      "Service Excellence & Quality Assurance",
      "Project Oversight & Risk Management",
    ],
    philosophy:
      "Primary client liaison for major commercial and industrial projects",
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
    ],
    philosophy:
      'Established the "We Work With You" partnership philosophy that defines MH Construction today',
    icon: "foundation",
  },
];

export default function AboutPage() {
  return (
    <div className="bg-gradient-to-b from-white dark:from-gray-900 to-gray-50 dark:to-gray-800 min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-gray-900 via-brand-primary to-gray-900 h-screen flex items-center justify-center text-white overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 bg-gradient-to-br from-brand-primary/30 via-gray-900/80 to-brand-secondary/20"></div>

        {/* Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-16 sm:pt-24 md:pt-32 lg:pt-40 pb-12 sm:pb-16 md:pb-20 lg:pb-28">
          <div className="space-y-2 sm:space-y-3 md:space-y-4 lg:space-y-6">
            {/* Veteran-Owned Badge */}
            <div className="inline-flex items-center bg-brand-primary/10 dark:bg-brand-primary/20 shadow-lg backdrop-blur-sm px-4 py-2 sm:px-6 sm:py-3 border border-brand-primary/20 dark:border-brand-primary/30 rounded-full">
              <MaterialIcon
                icon="military_tech"
                className="mr-2 sm:mr-3 text-brand-secondary text-base sm:text-lg"
              />
              <span className="font-bold text-brand-primary-light dark:text-brand-primary-light text-xs sm:text-sm uppercase tracking-wider">
                Veteran-Owned Excellence
              </span>
            </div>

            {/* Main Title with Responsive Typography */}
            <h1 className="font-black text-white text-lg xs:text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl leading-tight tracking-tight">
              <span className="block mb-1 sm:mb-2 font-semibold text-white/80 text-base xs:text-lg sm:text-xl md:text-2xl lg:text-3xl tracking-tight">
                Your Partnership in
              </span>
              <span className="block bg-clip-text bg-gradient-to-r from-brand-secondary via-white to-brand-primary drop-shadow-sm text-transparent">
                Construction Excellence
              </span>
            </h1>

            {/* Primary Tagline */}
            <p className="max-w-3xl mx-auto text-sm xs:text-base sm:text-lg md:text-xl lg:text-2xl text-brand-secondary font-bold leading-snug">
              "Building for the Owner, NOT the Dollar"
            </p>

            {/* Description with Partnership Language */}
            <p className="max-w-4xl mx-auto font-light text-white/90 text-xs xs:text-sm sm:text-base md:text-lg lg:text-xl leading-relaxed tracking-wide">
              Where military precision meets construction excellence. We work
              WITH you every step—combining veteran values, advanced technology,
              and genuine partnership to build your vision.
            </p>
          </div>
        </div>

        {/* Page-Specific Navigation Bar */}
        <PageNavigation
          items={navigationConfigs.about}
          className="absolute bottom-0 left-0 right-0"
        />
      </section>

      {/* Partnership Philosophy Section */}
      <section
        id="partnership-philosophy"
        className="bg-white dark:bg-gray-900 py-16 lg:py-24"
      >
        <div className="mx-auto px-4 container">
          <FadeInWhenVisible>
            <div className="mx-auto max-w-4xl">
              <div className="mb-12 text-center">
                <MaterialIcon
                  icon="handshake"
                  className="mb-4 text-brand-primary text-6xl"
                />
                <h2 className="mb-6 font-black text-gray-900 dark:text-gray-100 text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl leading-tight tracking-tighter">
                  <span className="block mb-3 font-semibold text-gray-700 dark:text-gray-300 text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl tracking-tight">
                    Our Partnership
                  </span>
                  <span className="block bg-clip-text bg-gradient-to-r from-brand-primary to-brand-secondary drop-shadow-sm text-transparent">
                    Philosophy
                  </span>
                </h2>
                <p className="mx-auto max-w-5xl font-light text-gray-600 dark:text-gray-300 text-xl md:text-2xl lg:text-3xl leading-relaxed tracking-wide">
                  At MH Construction, we don't just build structures - we build
                  relationships. We work WITH you, not FOR you.
                </p>
              </div>

              <div className="gap-8 grid sm:grid-cols-1 md:grid-cols-2 mb-12">
                <Card className="bg-white dark:bg-gray-800 hover:shadow-lg dark:hover:shadow-gray-600/50 border border-gray-200 dark:border-gray-700 transition-shadow">
                  <CardHeader>
                    <MaterialIcon
                      icon="favorite"
                      className="mb-3 text-brand-secondary text-4xl"
                    />
                    <CardTitle className="text-gray-900 dark:text-white">
                      Client Partnership Approach
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      <li className="flex items-start">
                        <MaterialIcon
                          icon="check_circle"
                          className="flex-shrink-0 mt-1 mr-2 text-brand-accent"
                        />
                        <span className="text-gray-700 dark:text-gray-300">
                          <strong className="text-gray-900 dark:text-white">
                            Transparent Communication:
                          </strong>{" "}
                          Open dialogue from day one
                        </span>
                      </li>
                      <li className="flex items-start">
                        <MaterialIcon
                          icon="check_circle"
                          className="flex-shrink-0 mt-1 mr-2 text-brand-accent"
                        />
                        <span className="text-gray-700 dark:text-gray-300">
                          <strong className="text-gray-900 dark:text-white">
                            Collaborative Planning:
                          </strong>{" "}
                          Your vision + our expertise
                        </span>
                      </li>
                      <li className="flex items-start">
                        <MaterialIcon
                          icon="check_circle"
                          className="flex-shrink-0 mt-1 mr-2 text-brand-accent"
                        />
                        <span className="text-gray-700 dark:text-gray-300">
                          <strong className="text-gray-900 dark:text-white">
                            Honest Pricing:
                          </strong>{" "}
                          No surprises, no hidden costs
                        </span>
                      </li>
                      <li className="flex items-start">
                        <MaterialIcon
                          icon="check_circle"
                          className="flex-shrink-0 mt-1 mr-2 text-brand-accent"
                        />
                        <span className="text-gray-700 dark:text-gray-300">
                          <strong className="text-gray-900 dark:text-white">
                            Shared Success:
                          </strong>{" "}
                          Your satisfaction is our success
                        </span>
                      </li>
                      <li className="flex items-start">
                        <MaterialIcon
                          icon="check_circle"
                          className="flex-shrink-0 mt-1 mr-2 text-brand-accent"
                        />
                        <span className="text-gray-700 dark:text-gray-300">
                          <strong className="text-gray-900 dark:text-white">
                            Long-term Relationship:
                          </strong>{" "}
                          Partners beyond project completion
                        </span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>

                <Card className="bg-white dark:bg-gray-800 hover:shadow-lg dark:hover:shadow-gray-600/50 border border-gray-200 dark:border-gray-700 transition-shadow">
                  <CardHeader>
                    <MaterialIcon
                      icon="public"
                      className="mb-3 text-brand-secondary text-4xl"
                    />
                    <CardTitle className="text-gray-900 dark:text-white">
                      Community-Centered Culture
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-700 dark:text-gray-300">
                      <strong className="text-gray-900 dark:text-white">
                        MH Construction exists to strengthen Pacific Northwest
                        communities.
                      </strong>{" "}
                      Every project contributes to a stronger, more connected
                      region. We work WITH communities to build lasting value.
                    </p>
                    <ul className="space-y-3">
                      <li className="flex items-start">
                        <MaterialIcon
                          icon="location_city"
                          className="flex-shrink-0 mt-1 mr-2 text-brand-primary"
                        />
                        <span className="text-gray-700 dark:text-gray-300">
                          <strong className="text-gray-900 dark:text-white">
                            Local Investment:
                          </strong>{" "}
                          Hiring locally, supporting regional suppliers
                        </span>
                      </li>
                      <li className="flex items-start">
                        <MaterialIcon
                          icon="military_tech"
                          className="flex-shrink-0 mt-1 mr-2 text-brand-primary"
                        />
                        <span className="text-gray-700 dark:text-gray-300">
                          <strong className="text-gray-900 dark:text-white">
                            Veteran Support:
                          </strong>{" "}
                          Creating opportunities for military families
                        </span>
                      </li>
                      <li className="flex items-start">
                        <MaterialIcon
                          icon="eco"
                          className="flex-shrink-0 mt-1 mr-2 text-brand-primary"
                        />
                        <span className="text-gray-700 dark:text-gray-300">
                          <strong className="text-gray-900 dark:text-white">
                            Environmental Stewardship:
                          </strong>{" "}
                          Sustainable practices for future communities
                        </span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </div>

              <div className="bg-brand-light dark:bg-gray-800 p-8 border-brand-primary border-l-4 rounded-lg">
                <MaterialIcon
                  icon="format_quote"
                  className="mb-4 text-brand-primary text-4xl"
                />
                <p className="mb-4 text-gray-800 dark:text-gray-200 text-lg italic leading-relaxed">
                  "When you choose MH Construction, you're not hiring a
                  contractor - you're gaining a partner who works WITH you at
                  every step. We bring veteran values of discipline, integrity,
                  and excellence to every project—building for the owner, not
                  the dollar."
                </p>
                <div className="flex items-center">
                  <MaterialIcon
                    icon="military_tech"
                    className="mr-3 text-brand-primary text-2xl"
                  />
                  <div>
                    <p className="font-semibold text-gray-900 dark:text-white">
                      Jeremy Thamert
                    </p>
                    <p className="text-gray-600 dark:text-gray-300 text-sm">
                      Owner & General Manager | U.S. Army Veteran
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </FadeInWhenVisible>
        </div>
      </section>

      {/* Company Stats */}
      <section className="bg-gradient-to-r from-brand-primary dark:from-brand-primary-dark to-brand-primary-dark dark:to-gray-800 py-16 text-white">
        <div className="mx-auto px-4 container">
          <FadeInWhenVisible>
            <div className="mb-16 text-center">
              <MaterialIcon
                icon="analytics"
                className="mb-6 text-brand-secondary text-6xl"
              />
              <h2 className="mb-6 font-black text-white text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl leading-tight tracking-tighter">
                <span className="block mb-3 font-semibold text-white/80 text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl tracking-tight">
                  Our Track
                </span>
                <span className="block bg-clip-text bg-gradient-to-r from-white via-brand-secondary to-white drop-shadow-sm text-transparent">
                  Record
                </span>
              </h2>
              <p className="mx-auto max-w-5xl font-light text-white/90 text-xl md:text-2xl lg:text-3xl leading-relaxed tracking-wide">
                Proven results from a veteran-owned team committed to excellence
              </p>
            </div>
            <div className="gap-8 grid grid-cols-2 md:grid-cols-4 mx-auto max-w-5xl">
              {companyStats.map((stat, index) => (
                <HoverScale key={index}>
                  <div className="text-center">
                    <MaterialIcon
                      icon={stat.iconName}
                      className="mb-4 text-brand-secondary text-5xl"
                    />
                    <div className="mb-2 font-bold text-4xl">{stat.value}</div>
                    <div className="text-white/90">{stat.label}</div>
                  </div>
                </HoverScale>
              ))}
            </div>
          </FadeInWhenVisible>
        </div>
      </section>

      {/* Core Values Section */}
      <section id="values" className="bg-white dark:bg-gray-900 py-16 lg:py-24">
        <div className="mx-auto px-4 container">
          <FadeInWhenVisible>
            <div className="mb-16 text-center">
              <MaterialIcon
                icon="shield"
                className="mb-6 text-brand-primary text-6xl"
              />
              <h2 className="mb-6 font-black text-gray-900 dark:text-gray-100 text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl leading-tight tracking-tighter">
                <span className="block mb-3 font-semibold text-gray-700 dark:text-gray-300 text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl tracking-tight">
                  Our 6 Core
                </span>
                <span className="block bg-clip-text bg-gradient-to-r from-brand-primary to-brand-secondary drop-shadow-sm text-transparent">
                  Values
                </span>
              </h2>
              <div className="mx-auto max-w-4xl">
                <p className="mb-4 font-light text-gray-600 dark:text-gray-300 text-xl md:text-2xl lg:text-3xl leading-relaxed tracking-wide">
                  Trust-Centered Philosophy: "Trust as our ultimate goal and
                  measurable company foundation"
                </p>
                <div className="bg-brand-light dark:bg-gray-800 p-6 border-brand-primary border-l-4 rounded-xl">
                  <p className="font-medium text-brand-primary dark:text-brand-primary-light text-lg md:text-xl">
                    "Trust isn't just another value—it's the result when all
                    other values are consistently demonstrated. It's our
                    ultimate goal."
                  </p>
                </div>
              </div>
            </div>
          </FadeInWhenVisible>

          <StaggeredFadeIn className="gap-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 mx-auto max-w-7xl">
            {coreValues.map((value, index) => (
              <Card
                key={index}
                className="bg-white dark:bg-gray-800 hover:shadow-xl dark:hover:shadow-gray-600/50 border border-gray-200 dark:border-gray-700 border-l-4 border-l-brand-primary h-full transition-all hover:-translate-y-2 duration-300"
              >
                <CardHeader className="pb-4">
                  <div className="flex items-center mb-4">
                    <MaterialIcon
                      icon={value.iconName}
                      className="mr-3 text-brand-primary text-4xl"
                    />
                    <span className="font-bold text-brand-primary text-lg">
                      {index + 1}
                    </span>
                  </div>
                  <CardTitle className="mb-2 text-gray-900 dark:text-white text-xl">
                    {value.title}
                  </CardTitle>
                  <p className="font-semibold text-brand-secondary text-sm">
                    {value.subtitle}
                  </p>
                </CardHeader>
                <CardContent className="pt-0">
                  <p className="mb-6 text-gray-700 dark:text-gray-300 leading-relaxed">
                    {value.description}
                  </p>
                  <div className="pt-4 border-gray-100 dark:border-gray-600 border-t">
                    <div className="flex items-center mb-3">
                      <MaterialIcon
                        icon="checklist"
                        className="mr-2 text-brand-primary"
                      />
                      <p className="font-semibold text-gray-900 dark:text-white text-sm">
                        In Practice:
                      </p>
                    </div>
                    <ul className="space-y-2">
                      {value.practices.map((practice, pIndex) => (
                        <li key={pIndex} className="flex items-start text-sm">
                          <MaterialIcon
                            icon="check_circle"
                            className="flex-shrink-0 mt-0.5 mr-2 text-brand-accent text-lg"
                          />
                          <span className="text-gray-600 dark:text-gray-300 leading-relaxed">
                            {practice}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              </Card>
            ))}
          </StaggeredFadeIn>
        </div>
      </section>

      {/* Leadership Team Section */}
      <section id="team" className="bg-gray-50 dark:bg-gray-800 py-16 lg:py-24">
        <div className="mx-auto px-4 container">
          <FadeInWhenVisible>
            <div className="mb-16 text-center">
              <MaterialIcon
                icon="groups"
                className="mb-6 text-brand-primary text-6xl"
              />
              <h2 className="mb-6 font-black text-gray-900 dark:text-gray-100 text-5xl sm:text-6xl md:text-7xl lg:text-8xl leading-tight tracking-tighter">
                <span className="block mb-3 font-semibold text-gray-700 dark:text-gray-300 text-3xl sm:text-4xl md:text-5xl lg:text-6xl tracking-tight">
                  Meet Our
                </span>
                <span className="block bg-clip-text bg-gradient-to-r from-brand-primary to-brand-secondary drop-shadow-sm text-transparent">
                  Team
                </span>
              </h2>
              <p className="mx-auto max-w-3xl font-light text-gray-600 dark:text-gray-300 text-xl md:text-2xl lg:text-3xl leading-relaxed tracking-wide">
                Your partnership starts with leaders committed to serving both
                clients and communities through collaborative excellence
              </p>
            </div>
          </FadeInWhenVisible>

          <StaggeredFadeIn className="gap-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 mx-auto max-w-7xl">
            {leadershipTeam.map((member, index) => (
              <Card
                key={index}
                className="bg-white dark:bg-gray-800 hover:shadow-xl dark:hover:shadow-gray-600/50 border border-gray-200 dark:border-gray-700 h-full transition-all hover:-translate-y-2 duration-300"
              >
                <CardHeader className="pb-6 text-center">
                  <div className="flex justify-center items-center bg-brand-primary mx-auto mb-4 p-4 rounded-full w-20 h-20">
                    <MaterialIcon
                      icon={member.icon}
                      className="text-white text-3xl"
                    />
                  </div>
                  <CardTitle className="mb-2 text-gray-900 dark:text-white text-xl">
                    {member.name}
                  </CardTitle>
                  <p className="font-semibold text-brand-primary text-lg">
                    {member.role}
                  </p>
                  <div className="flex justify-center items-center mt-2">
                    <MaterialIcon
                      icon="schedule"
                      className="mr-2 text-brand-accent text-sm"
                    />
                    <span className="text-gray-600 dark:text-gray-300 text-sm">
                      {member.experience}
                    </span>
                  </div>
                  <div className="mt-3">
                    <span className="pl-3 border-brand-secondary border-l-4 font-medium text-brand-secondary text-sm">
                      {member.status}
                    </span>
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="mb-6">
                    <h4 className="flex items-center mb-3 font-semibold text-gray-900 dark:text-white text-sm">
                      <MaterialIcon
                        icon="star"
                        className="mr-2 text-brand-primary"
                      />
                      Core Specialties
                    </h4>
                    <ul className="space-y-2">
                      {member.specialties.map((specialty, sIndex) => (
                        <li key={sIndex} className="flex items-start text-sm">
                          <MaterialIcon
                            icon="check_circle"
                            className="flex-shrink-0 mt-0.5 mr-2 text-brand-accent"
                          />
                          <span className="text-gray-600 dark:text-gray-300 leading-relaxed">
                            {specialty}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="pt-4 border-gray-100 dark:border-gray-600 border-t">
                    <p className="text-gray-700 dark:text-gray-300 text-sm italic leading-relaxed">
                      "{member.philosophy}"
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </StaggeredFadeIn>
        </div>
      </section>

      {/* Why Values Matter Section */}
      <section className="bg-white dark:bg-gray-900 py-16 lg:py-24">
        <div className="mx-auto px-4 container">
          <FadeInWhenVisible>
            <div className="mx-auto max-w-6xl">
              <h2 className="mb-16 font-black text-gray-900 dark:text-gray-100 text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-center leading-tight tracking-tighter">
                <span className="block mb-3 font-semibold text-gray-700 dark:text-gray-300 text-3xl sm:text-4xl md:text-5xl lg:text-6xl tracking-tight">
                  Why Our Values
                </span>
                <span className="block bg-clip-text bg-gradient-to-r from-brand-primary to-brand-secondary drop-shadow-sm text-transparent">
                  Matter
                </span>
              </h2>

              <div className="gap-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                <Card className="bg-white dark:bg-gray-800 hover:shadow-xl dark:hover:shadow-gray-600/50 border border-gray-200 dark:border-gray-700 border-l-4 border-l-brand-primary transition-all hover:-translate-y-2 duration-300">
                  <CardHeader className="text-center">
                    <MaterialIcon
                      icon="people"
                      className="mb-4 text-brand-primary text-5xl"
                    />
                    <CardTitle className="text-gray-900 dark:text-white text-2xl">
                      For Our Partners
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3 text-gray-700 dark:text-gray-300">
                      <li className="flex items-start">
                        <MaterialIcon
                          icon="check_circle"
                          className="flex-shrink-0 mt-1 mr-3 text-brand-accent"
                        />
                        <span className="leading-relaxed">
                          Predictable, consistent experience
                        </span>
                      </li>
                      <li className="flex items-start">
                        <MaterialIcon
                          icon="check_circle"
                          className="flex-shrink-0 mt-1 mr-3 text-brand-accent"
                        />
                        <span className="leading-relaxed">
                          Peace of mind and confidence
                        </span>
                      </li>
                      <li className="flex items-start">
                        <MaterialIcon
                          icon="check_circle"
                          className="flex-shrink-0 mt-1 mr-3 text-brand-accent"
                        />
                        <span className="leading-relaxed">
                          Long-term partnership
                        </span>
                      </li>
                      <li className="flex items-start">
                        <MaterialIcon
                          icon="check_circle"
                          className="flex-shrink-0 mt-1 mr-3 text-brand-accent"
                        />
                        <span className="leading-relaxed">
                          Community impact
                        </span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>

                <Card className="bg-white dark:bg-gray-800 hover:shadow-xl dark:hover:shadow-gray-600/50 border border-gray-200 dark:border-gray-700 border-l-4 border-l-brand-secondary transition-all hover:-translate-y-2 duration-300">
                  <CardHeader className="text-center">
                    <MaterialIcon
                      icon="location_city"
                      className="mb-4 text-brand-secondary text-5xl"
                    />
                    <CardTitle className="text-gray-900 dark:text-white text-2xl">
                      For Our Community
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3 text-gray-700 dark:text-gray-300">
                      <li className="flex items-start">
                        <MaterialIcon
                          icon="check_circle"
                          className="flex-shrink-0 mt-1 mr-3 text-brand-accent"
                        />
                        <span className="leading-relaxed">
                          Economic development
                        </span>
                      </li>
                      <li className="flex items-start">
                        <MaterialIcon
                          icon="check_circle"
                          className="flex-shrink-0 mt-1 mr-3 text-brand-accent"
                        />
                        <span className="leading-relaxed">
                          Quality standards
                        </span>
                      </li>
                      <li className="flex items-start">
                        <MaterialIcon
                          icon="check_circle"
                          className="flex-shrink-0 mt-1 mr-3 text-brand-accent"
                        />
                        <span className="leading-relaxed">Veteran support</span>
                      </li>
                      <li className="flex items-start">
                        <MaterialIcon
                          icon="check_circle"
                          className="flex-shrink-0 mt-1 mr-3 text-brand-accent"
                        />
                        <span className="leading-relaxed">
                          Sustainable growth
                        </span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>

                <Card className="bg-white dark:bg-gray-800 hover:shadow-xl dark:hover:shadow-gray-600/50 border border-gray-200 dark:border-gray-700 border-l-4 border-l-brand-accent transition-all hover:-translate-y-2 duration-300">
                  <CardHeader className="text-center">
                    <MaterialIcon
                      icon="engineering"
                      className="mb-4 text-brand-accent text-5xl"
                    />
                    <CardTitle className="text-gray-900 dark:text-white text-2xl">
                      For Our Team
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3 text-gray-700 dark:text-gray-300">
                      <li className="flex items-start">
                        <MaterialIcon
                          icon="check_circle"
                          className="flex-shrink-0 mt-1 mr-3 text-brand-accent"
                        />
                        <span className="leading-relaxed">
                          Professional pride
                        </span>
                      </li>
                      <li className="flex items-start">
                        <MaterialIcon
                          icon="check_circle"
                          className="flex-shrink-0 mt-1 mr-3 text-brand-accent"
                        />
                        <span className="leading-relaxed">Clear standards</span>
                      </li>
                      <li className="flex items-start">
                        <MaterialIcon
                          icon="check_circle"
                          className="flex-shrink-0 mt-1 mr-3 text-brand-accent"
                        />
                        <span className="leading-relaxed">Personal growth</span>
                      </li>
                      <li className="flex items-start">
                        <MaterialIcon
                          icon="check_circle"
                          className="flex-shrink-0 mt-1 mr-3 text-brand-accent"
                        />
                        <span className="leading-relaxed">
                          Community connection
                        </span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </div>
          </FadeInWhenVisible>
        </div>
      </section>

      {/* Client Reviews Section */}
      <section
        id="testimonials"
        className="bg-gray-50 dark:bg-gray-800 py-16 lg:py-24"
      >
        <div className="mx-auto px-4 container">
          <FadeInWhenVisible>
            <div className="mx-auto max-w-4xl text-center mb-12">
              <div className="flex justify-center items-center mb-6">
                <div className="bg-brand-primary/10 p-4 rounded-2xl">
                  <MaterialIcon
                    icon="star"
                    size="xl"
                    className="text-brand-primary"
                  />
                </div>
              </div>
              <h2 className="mb-6 font-black text-gray-900 dark:text-white text-3xl md:text-4xl lg:text-5xl leading-tight tracking-tight">
                Partnership Reviews
              </h2>
              <p className="text-gray-600 dark:text-gray-300 text-lg md:text-xl leading-relaxed">
                Hear directly from our partners about their experience working
                with MH Construction on their most important projects.
              </p>
            </div>
          </FadeInWhenVisible>

          <div className="gap-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 mb-12">
            <StaggeredFadeIn>
              <Card className="bg-white dark:bg-gray-900 hover:shadow-lg transition-all duration-300">
                <CardHeader>
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="flex space-x-1">
                      {[...Array(5)].map((_, i) => (
                        <MaterialIcon
                          key={i}
                          icon="star"
                          size="sm"
                          className="text-brand-secondary"
                        />
                      ))}
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 dark:text-gray-300 mb-4 italic">
                    "MH Construction delivered exactly what they promised, on
                    time and within budget. Their attention to detail and
                    communication throughout the project was exceptional."
                  </p>
                  <div className="flex items-center space-x-3">
                    <div className="bg-brand-primary/20 w-10 h-10 rounded-full flex items-center justify-center">
                      <MaterialIcon
                        icon="business"
                        size="sm"
                        className="text-brand-primary"
                      />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white text-sm">
                        Regional Medical Center
                      </p>
                      <p className="text-gray-500 dark:text-gray-400 text-xs">
                        Healthcare Facility Project
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white dark:bg-gray-900 hover:shadow-lg transition-all duration-300">
                <CardHeader>
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="flex space-x-1">
                      {[...Array(5)].map((_, i) => (
                        <MaterialIcon
                          key={i}
                          icon="star"
                          size="sm"
                          className="text-brand-secondary"
                        />
                      ))}
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 dark:text-gray-300 mb-4 italic">
                    "Working with MH Construction felt like having a true
                    partner. They went above and beyond to ensure our vision
                    became reality while staying mindful of our budget."
                  </p>
                  <div className="flex items-center space-x-3">
                    <div className="bg-brand-primary/20 w-10 h-10 rounded-full flex items-center justify-center">
                      <MaterialIcon
                        icon="store"
                        size="sm"
                        className="text-brand-primary"
                      />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white text-sm">
                        Tri-Cities Retail Group
                      </p>
                      <p className="text-gray-500 dark:text-gray-400 text-xs">
                        Commercial Retail Complex
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white dark:bg-gray-900 hover:shadow-lg transition-all duration-300">
                <CardHeader>
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="flex space-x-1">
                      {[...Array(5)].map((_, i) => (
                        <MaterialIcon
                          key={i}
                          icon="star"
                          size="sm"
                          className="text-brand-secondary"
                        />
                      ))}
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 dark:text-gray-300 mb-4 italic">
                    "The military precision and attention to detail showed in
                    every aspect of the project. Professional, reliable, and
                    committed to excellence."
                  </p>
                  <div className="flex items-center space-x-3">
                    <div className="bg-brand-primary/20 w-10 h-10 rounded-full flex items-center justify-center">
                      <MaterialIcon
                        icon="account_balance"
                        size="sm"
                        className="text-brand-primary"
                      />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white text-sm">
                        Municipal Services
                      </p>
                      <p className="text-gray-500 dark:text-gray-400 text-xs">
                        Government Facility Renovation
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </StaggeredFadeIn>
          </div>
        </div>
      </section>

      {/* Safety & Compliance Section */}
      <section id="safety" className="bg-white dark:bg-gray-900 py-16 lg:py-24">
        <div className="mx-auto px-4 container">
          <FadeInWhenVisible>
            <div className="mx-auto max-w-4xl text-center mb-12">
              <div className="flex justify-center items-center mb-6">
                <div className="bg-brand-primary/10 p-4 rounded-2xl">
                  <MaterialIcon
                    icon="verified_user"
                    size="xl"
                    className="text-brand-primary"
                  />
                </div>
              </div>
              <h2 className="mb-6 font-black text-gray-900 dark:text-white text-3xl md:text-4xl lg:text-5xl leading-tight tracking-tight">
                Safety & Compliance
              </h2>
              <p className="text-gray-600 dark:text-gray-300 text-lg md:text-xl leading-relaxed">
                Safety is never compromised at MH Construction. Our
                comprehensive safety programs and regulatory compliance ensure
                every project meets the highest standards.
              </p>
            </div>
          </FadeInWhenVisible>

          <div className="gap-8 grid grid-cols-1 sm:grid-cols-2 mb-12">
            <StaggeredFadeIn>
              <Card className="bg-white dark:bg-gray-800 hover:shadow-lg dark:hover:shadow-gray-600/50 border border-brand-primary dark:border-brand-primary/50 transition-all duration-300">
                <CardHeader>
                  <div className="flex items-center space-x-3 mb-4">
                    <MaterialIcon
                      icon="security"
                      size="lg"
                      className="text-brand-primary"
                    />
                    <CardTitle className="text-gray-900 dark:text-white text-xl">
                      Safety First Culture
                    </CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start">
                      <MaterialIcon
                        icon="check_circle"
                        className="flex-shrink-0 mt-0.5 mr-2 text-brand-accent"
                      />
                      <span className="text-gray-600 dark:text-gray-300">
                        Daily safety meetings and protocols
                      </span>
                    </li>
                    <li className="flex items-start">
                      <MaterialIcon
                        icon="check_circle"
                        className="flex-shrink-0 mt-0.5 mr-2 text-brand-accent"
                      />
                      <span className="text-gray-600 dark:text-gray-300">
                        OSHA-compliant safety training for all team members
                      </span>
                    </li>
                    <li className="flex items-start">
                      <MaterialIcon
                        icon="check_circle"
                        className="flex-shrink-0 mt-0.5 mr-2 text-brand-accent"
                      />
                      <span className="text-gray-600 dark:text-gray-300">
                        Comprehensive safety equipment and monitoring
                      </span>
                    </li>
                    <li className="flex items-start">
                      <MaterialIcon
                        icon="check_circle"
                        className="flex-shrink-0 mt-0.5 mr-2 text-brand-accent"
                      />
                      <span className="text-gray-600 dark:text-gray-300">
                        Zero-tolerance policy for safety violations
                      </span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="bg-white dark:bg-gray-800 hover:shadow-lg dark:hover:shadow-gray-600/50 border border-brand-secondary dark:border-brand-secondary/50 transition-all duration-300">
                <CardHeader>
                  <div className="flex items-center space-x-3 mb-4">
                    <MaterialIcon
                      icon="gavel"
                      size="lg"
                      className="text-brand-secondary"
                    />
                    <CardTitle className="text-gray-900 dark:text-white text-xl">
                      Regulatory Compliance
                    </CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start">
                      <MaterialIcon
                        icon="check_circle"
                        className="flex-shrink-0 mt-0.5 mr-2 text-brand-accent"
                      />
                      <span className="text-gray-600 dark:text-gray-300">
                        Licensed and insured in Washington, Oregon, and Idaho
                      </span>
                    </li>
                    <li className="flex items-start">
                      <MaterialIcon
                        icon="check_circle"
                        className="flex-shrink-0 mt-0.5 mr-2 text-brand-accent"
                      />
                      <span className="text-gray-600 dark:text-gray-300">
                        Current with all local and federal building codes
                      </span>
                    </li>
                    <li className="flex items-start">
                      <MaterialIcon
                        icon="check_circle"
                        className="flex-shrink-0 mt-0.5 mr-2 text-brand-accent"
                      />
                      <span className="text-gray-600 dark:text-gray-300">
                        Environmental compliance and sustainability practices
                      </span>
                    </li>
                    <li className="flex items-start">
                      <MaterialIcon
                        icon="check_circle"
                        className="flex-shrink-0 mt-0.5 mr-2 text-brand-accent"
                      />
                      <span className="text-gray-600 dark:text-gray-300">
                        Regular audits and certification maintenance
                      </span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </StaggeredFadeIn>
          </div>
        </div>
      </section>

      {/* Awards & Recognition Section */}
      <section
        id="awards"
        className="bg-gray-50 dark:bg-gray-800 py-16 lg:py-24"
      >
        <div className="mx-auto px-4 container">
          <FadeInWhenVisible>
            <div className="mx-auto max-w-4xl text-center mb-12">
              <div className="flex justify-center items-center mb-6">
                <div className="bg-brand-primary/10 p-4 rounded-2xl">
                  <MaterialIcon
                    icon="emoji_events"
                    size="xl"
                    className="text-brand-primary"
                  />
                </div>
              </div>
              <h2 className="mb-6 font-black text-gray-900 dark:text-white text-3xl md:text-4xl lg:text-5xl leading-tight tracking-tight">
                Awards & Recognition
              </h2>
              <p className="text-gray-600 dark:text-gray-300 text-lg md:text-xl leading-relaxed">
                Our commitment to excellence has been recognized by industry
                leaders and the communities we serve throughout the Pacific
                Northwest.
              </p>
            </div>
          </FadeInWhenVisible>

          <div className="gap-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 mb-12">
            <StaggeredFadeIn>
              <Card className="bg-white dark:bg-gray-800 hover:shadow-lg dark:hover:shadow-gray-600/50 border border-brand-secondary dark:border-brand-secondary/50 transition-all duration-300">
                <CardHeader>
                  <div className="flex items-center space-x-3 mb-4">
                    <MaterialIcon
                      icon="workspace_premium"
                      size="lg"
                      className="text-brand-secondary"
                    />
                    <CardTitle className="text-gray-900 dark:text-white text-lg">
                      Excellence in Construction
                    </CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 dark:text-gray-300 mb-2 text-sm">
                    Associated General Contractors (AGC) - Washington Chapter
                  </p>
                  <p className="text-gray-500 dark:text-gray-400 text-xs">
                    Outstanding Commercial Project Award for innovation and
                    quality craftsmanship
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-white dark:bg-gray-800 hover:shadow-lg dark:hover:shadow-gray-600/50 border border-brand-primary dark:border-brand-primary/50 transition-all duration-300">
                <CardHeader>
                  <div className="flex items-center space-x-3 mb-4">
                    <MaterialIcon
                      icon="military_tech"
                      size="lg"
                      className="text-brand-primary"
                    />
                    <CardTitle className="text-gray-900 dark:text-white text-lg">
                      Veteran Business Enterprise
                    </CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 dark:text-gray-300 mb-2 text-sm">
                    Certified Veteran-Owned Small Business (VOSB)
                  </p>
                  <p className="text-gray-500 dark:text-gray-400 text-xs">
                    Veteran-owned since January 2025 under Army veteran
                    leadership. Department of Veterans Affairs certification
                    recognizing veteran entrepreneurship excellence.
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-white dark:bg-gray-800 hover:shadow-lg dark:hover:shadow-gray-600/50 border border-brand-accent dark:border-brand-accent/50 transition-all duration-300">
                <CardHeader>
                  <div className="flex items-center space-x-3 mb-4">
                    <MaterialIcon
                      icon="eco"
                      size="lg"
                      className="text-brand-accent"
                    />
                    <CardTitle className="text-gray-900 dark:text-white text-lg">
                      Sustainable Building Leader
                    </CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 dark:text-gray-300 mb-2 text-sm">
                    Washington State Green Building Council
                  </p>
                  <p className="text-gray-500 dark:text-gray-400 text-xs">
                    Recognition for commitment to sustainable construction
                    practices and LEED compliance
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-white dark:bg-gray-800 hover:shadow-lg dark:hover:shadow-gray-600/50 border border-brand-primary dark:border-brand-primary/50 transition-all duration-300">
                <CardHeader>
                  <div className="flex items-center space-x-3 mb-4">
                    <MaterialIcon
                      icon="verified_user"
                      size="lg"
                      className="text-brand-primary"
                    />
                    <CardTitle className="text-gray-900 dark:text-white text-lg">
                      Safety Excellence
                    </CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 dark:text-gray-300 mb-2 text-sm">
                    OSHA Voluntary Protection Program (VPP)
                  </p>
                  <p className="text-gray-500 dark:text-gray-400 text-xs">
                    Star designation for exemplary workplace safety and health
                    programs
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-white dark:bg-gray-800 hover:shadow-lg dark:hover:shadow-gray-600/50 border border-brand-accent dark:border-brand-accent/50 transition-all duration-300">
                <CardHeader>
                  <div className="flex items-center space-x-3 mb-4">
                    <MaterialIcon
                      icon="groups"
                      size="lg"
                      className="text-brand-accent"
                    />
                    <CardTitle className="text-gray-900 dark:text-white text-lg">
                      Community Partner
                    </CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 dark:text-gray-300 mb-2 text-sm">
                    Tri-Cities Chamber of Commerce
                  </p>
                  <p className="text-gray-500 dark:text-gray-400 text-xs">
                    Business Excellence Award for community involvement and
                    economic development support
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-white dark:bg-gray-800 hover:shadow-lg dark:hover:shadow-gray-600/50 border border-brand-secondary dark:border-brand-secondary/50 transition-all duration-300">
                <CardHeader>
                  <div className="flex items-center space-x-3 mb-4">
                    <MaterialIcon
                      icon="trending_up"
                      size="lg"
                      className="text-brand-secondary"
                    />
                    <CardTitle className="text-gray-900 dark:text-white text-lg">
                      Industry Innovation
                    </CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 dark:text-gray-300 mb-2 text-sm">
                    Construction Technology Advancement
                  </p>
                  <p className="text-gray-500 dark:text-gray-400 text-xs">
                    Recognition for innovative use of technology in project
                    management and execution
                  </p>
                </CardContent>
              </Card>
            </StaggeredFadeIn>
          </div>
        </div>
      </section>

      {/* Company News & Blog Section */}
      <section
        id="blog"
        className="relative bg-gray-50 dark:bg-gray-800 py-16 sm:py-20 lg:py-24"
      >
        <div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <FadeInWhenVisible className="mb-12 text-center">
            <h2 className="mb-6 font-black text-gray-900 dark:text-gray-100 text-4xl sm:text-5xl md:text-6xl leading-tight tracking-tighter">
              <span className="block mb-3 font-semibold text-gray-700 dark:text-gray-300 text-2xl sm:text-3xl md:text-4xl tracking-tight">
                Construction Insights &
              </span>
              <span className="block bg-clip-text bg-gradient-to-r from-brand-primary to-brand-accent text-transparent">
                Company Blog
              </span>
            </h2>
            <p className="mx-auto max-w-3xl text-gray-600 dark:text-gray-300 text-lg sm:text-xl">
              Expert construction advice, industry insights, and stories from
              our veteran-owned team
            </p>
          </FadeInWhenVisible>

          <div className="gap-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
            <FadeInWhenVisible>
              <HoverScale>
                <Card className="h-full">
                  <CardHeader>
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <MaterialIcon
                          icon="tips_and_updates"
                          size="sm"
                          className="text-brand-primary"
                        />
                        <span className="font-medium text-brand-primary text-xs uppercase tracking-wide">
                          Construction Tips
                        </span>
                      </div>
                      <span className="text-gray-500 dark:text-gray-400 text-sm">
                        Oct 2025
                      </span>
                    </div>
                    <CardTitle className="text-xl">
                      Pre-Construction Planning Essentials
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="mb-4 text-gray-600 dark:text-gray-300">
                      Learn the critical steps to plan your construction project
                      for success, from budgeting to timeline management.
                    </p>
                    <div className="flex items-center text-brand-primary hover:text-brand-accent transition-colors cursor-pointer">
                      <span className="font-medium text-sm">Read More</span>
                      <MaterialIcon
                        icon="arrow_forward"
                        size="sm"
                        className="ml-1"
                      />
                    </div>
                  </CardContent>
                </Card>
              </HoverScale>
            </FadeInWhenVisible>

            <FadeInWhenVisible>
              <HoverScale>
                <Card className="h-full">
                  <CardHeader>
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <MaterialIcon
                          icon="military_tech"
                          size="sm"
                          className="text-brand-secondary"
                        />
                        <span className="font-medium text-brand-secondary text-xs uppercase tracking-wide">
                          Veteran Spotlight
                        </span>
                      </div>
                      <span className="text-gray-500 dark:text-gray-400 text-sm">
                        Sep 2025
                      </span>
                    </div>
                    <CardTitle className="text-xl">
                      Military Values in Construction
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="mb-4 text-gray-600 dark:text-gray-300">
                      How military precision and integrity translate to superior
                      construction project management and execution.
                    </p>
                    <div className="flex items-center text-brand-primary hover:text-brand-accent transition-colors cursor-pointer">
                      <span className="font-medium text-sm">Read More</span>
                      <MaterialIcon
                        icon="arrow_forward"
                        size="sm"
                        className="ml-1"
                      />
                    </div>
                  </CardContent>
                </Card>
              </HoverScale>
            </FadeInWhenVisible>

            <FadeInWhenVisible>
              <HoverScale>
                <Card className="h-full">
                  <CardHeader>
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <MaterialIcon
                          icon="eco"
                          size="sm"
                          className="text-brand-accent"
                        />
                        <span className="font-medium text-brand-accent text-xs uppercase tracking-wide">
                          Sustainability
                        </span>
                      </div>
                      <span className="text-gray-500 dark:text-gray-400 text-sm">
                        Aug 2025
                      </span>
                    </div>
                    <CardTitle className="text-xl">
                      Sustainable Building Practices
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="mb-4 text-gray-600 dark:text-gray-300">
                      Exploring eco-friendly construction methods that reduce
                      environmental impact while maintaining quality.
                    </p>
                    <div className="flex items-center text-brand-primary hover:text-brand-accent transition-colors cursor-pointer">
                      <span className="font-medium text-sm">Read More</span>
                      <MaterialIcon
                        icon="arrow_forward"
                        size="sm"
                        className="ml-1"
                      />
                    </div>
                  </CardContent>
                </Card>
              </HoverScale>
            </FadeInWhenVisible>
          </div>

          <FadeInWhenVisible className="mt-12 text-center">
            <p className="mb-4 text-gray-600 dark:text-gray-300">
              <MaterialIcon icon="info" size="sm" className="inline mr-2" />
              Full blog with integrated High-Level CRM coming soon
            </p>
          </FadeInWhenVisible>
        </div>
      </section>

      {/* Latest News & Updates Section */}
      <section
        id="news"
        className="relative bg-white dark:bg-gray-900 py-16 sm:py-20 lg:py-24"
      >
        <div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <FadeInWhenVisible className="mb-12 text-center">
            <h2 className="mb-6 font-black text-gray-900 dark:text-gray-100 text-4xl sm:text-5xl md:text-6xl tracking-tight">
              <span className="block mb-2 font-semibold text-gray-700 dark:text-gray-300 text-2xl sm:text-3xl md:text-4xl">
                Latest News &
              </span>
              <span className="block bg-clip-text bg-gradient-to-r from-brand-secondary to-brand-primary text-transparent">
                Company Announcements
              </span>
            </h2>
            <p className="mx-auto max-w-3xl text-gray-600 dark:text-gray-300 text-lg sm:text-xl">
              Stay updated with our latest projects, partnerships, and company
              milestones
            </p>
          </FadeInWhenVisible>

          <div className="gap-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2">
            <FadeInWhenVisible>
              <Card className="border-l-4 border-l-brand-primary">
                <CardContent className="pt-6">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <MaterialIcon
                        icon="celebration"
                        className="text-brand-primary"
                        size="md"
                      />
                      <span className="font-semibold text-brand-primary">
                        Company Milestone
                      </span>
                    </div>
                    <span className="text-gray-500 dark:text-gray-400 text-sm">
                      Nov 2025
                    </span>
                  </div>
                  <h3 className="mb-3 font-bold text-gray-900 dark:text-gray-100 text-xl">
                    50+ Successful Partnerships in Pacific Northwest
                  </h3>
                  <p className="mb-4 text-gray-600 dark:text-gray-300">
                    We're proud to announce reaching a major milestone: over 50
                    completed construction partnerships across Washington and
                    Oregon. Thank you to all our clients and trade partners who
                    made this possible.
                  </p>
                  <Link
                    href="/projects"
                    className="inline-flex items-center text-brand-primary hover:text-brand-accent transition-colors"
                  >
                    <span className="font-medium">View Our Work</span>
                    <MaterialIcon
                      icon="arrow_forward"
                      size="sm"
                      className="ml-1"
                    />
                  </Link>
                </CardContent>
              </Card>
            </FadeInWhenVisible>

            <FadeInWhenVisible>
              <Card className="border-l-4 border-l-brand-secondary">
                <CardContent className="pt-6">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <MaterialIcon
                        icon="rocket_launch"
                        className="text-brand-secondary"
                        size="md"
                      />
                      <span className="font-semibold text-brand-secondary">
                        New Technology
                      </span>
                    </div>
                    <span className="text-gray-500 dark:text-gray-400 text-sm">
                      Coming Soon
                    </span>
                  </div>
                  <h3 className="mb-3 font-bold text-gray-900 dark:text-gray-100 text-xl">
                    Integrated CRM & Project Management Platform
                  </h3>
                  <p className="mb-4 text-gray-600 dark:text-gray-300">
                    We're implementing High-Level CRM to provide seamless
                    communication, real-time project updates, and enhanced
                    client experience throughout your construction journey.
                  </p>
                  <Link
                    href="/contact"
                    className="inline-flex items-center text-brand-secondary hover:text-brand-primary transition-colors"
                  >
                    <span className="font-medium">Learn More</span>
                    <MaterialIcon
                      icon="arrow_forward"
                      size="sm"
                      className="ml-1"
                    />
                  </Link>
                </CardContent>
              </Card>
            </FadeInWhenVisible>

            <FadeInWhenVisible>
              <Card className="border-l-4 border-l-brand-accent">
                <CardContent className="pt-6">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <MaterialIcon
                        icon="handshake"
                        className="text-brand-accent"
                        size="md"
                      />
                      <span className="font-semibold text-brand-accent">
                        Partnership
                      </span>
                    </div>
                    <span className="text-gray-500 dark:text-gray-400 text-sm">
                      Oct 2025
                    </span>
                  </div>
                  <h3 className="mb-3 font-bold text-gray-900 dark:text-gray-100 text-xl">
                    Expanding Trade Partner Network
                  </h3>
                  <p className="mb-4 text-gray-600 dark:text-gray-300">
                    We're actively growing our network of skilled trade partners
                    to better serve our clients across the Pacific Northwest.
                    Join our veteran-owned partnership program.
                  </p>
                  <Link
                    href="/trade-partners"
                    className="inline-flex items-center text-brand-accent hover:text-brand-primary transition-colors"
                  >
                    <span className="font-medium">Become a Partner</span>
                    <MaterialIcon
                      icon="arrow_forward"
                      size="sm"
                      className="ml-1"
                    />
                  </Link>
                </CardContent>
              </Card>
            </FadeInWhenVisible>

            <FadeInWhenVisible>
              <Card className="border-l-4 border-l-brand-secondary">
                <CardContent className="pt-6">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <MaterialIcon
                        icon="workspace_premium"
                        className="text-brand-secondary"
                        size="md"
                      />
                      <span className="font-semibold text-brand-secondary">
                        Recognition
                      </span>
                    </div>
                    <span className="text-gray-500 dark:text-gray-400 text-sm">
                      Sep 2025
                    </span>
                  </div>
                  <h3 className="mb-3 font-bold text-gray-900 dark:text-gray-100 text-xl">
                    Award-Winning Safety Record
                  </h3>
                  <p className="mb-4 text-gray-600 dark:text-gray-300">
                    Our commitment to safety excellence has been recognized by
                    industry organizations. Zero accidents, 100% compliance -
                    that's the veteran-owned difference.
                  </p>
                  <Link
                    href="/about#safety"
                    className="inline-flex items-center text-brand-secondary hover:text-brand-primary transition-colors"
                  >
                    <span className="font-medium">Safety Standards</span>
                    <MaterialIcon
                      icon="arrow_forward"
                      size="sm"
                      className="ml-1"
                    />
                  </Link>
                </CardContent>
              </Card>
            </FadeInWhenVisible>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative bg-gradient-to-r from-brand-accent dark:from-brand-primary-dark via-brand-primary dark:via-brand-primary to-brand-primary-dark dark:to-gray-800 py-16 lg:py-24 overflow-hidden text-white">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="z-10 relative mx-auto px-4 container">
          <FadeInWhenVisible>
            <div className="mx-auto max-w-4xl text-center">
              <div className="inline-flex items-center bg-brand-primary/10 dark:bg-brand-primary/20 shadow-lg backdrop-blur-sm mb-6 px-6 py-3 border border-brand-primary/20 dark:border-brand-primary/30 rounded-full">
                <MaterialIcon
                  icon="military_tech"
                  className="mr-3 text-brand-secondary"
                />
                <span className="font-bold text-white text-sm uppercase tracking-wider">
                  Veteran-Owned Excellence
                </span>
              </div>

              <MaterialIcon
                icon="handshake"
                className="mb-6 text-brand-secondary text-6xl"
              />
              <h2 className="mb-6 font-black text-white text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl leading-tight tracking-tighter">
                <span className="block mb-3 font-semibold text-white/80 text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl tracking-tight">
                  Ready to Start Our
                </span>
                <span className="block bg-clip-text bg-gradient-to-r from-white via-brand-secondary to-white drop-shadow-sm text-transparent">
                  Partnership?
                </span>
              </h2>

              <div className="bg-white/10 backdrop-blur-sm mb-8 p-6 border border-white/20 rounded-xl">
                <p className="mb-2 font-bold text-brand-secondary text-xl md:text-2xl">
                  "Building for the Owner, NOT the Dollar"
                </p>
                <p className="font-light text-white/90 text-lg md:text-xl">
                  Partner with a team that works WITH you, not FOR you. Let's
                  discuss your vision and build something remarkable together.
                </p>
              </div>

              <div className="flex sm:flex-row flex-col justify-center gap-4 mb-8">
                <Link href="/booking">
                  <Button
                    variant="primary"
                    size="lg"
                    className="shadow-xl hover:shadow-2xl transition-all duration-300"
                  >
                    <MaterialIcon icon="event" size="lg" className="mr-3" />
                    Schedule Free Consultation
                  </Button>
                </Link>
                <Link href="/services">
                  <Button
                    size="lg"
                    variant="outline"
                    className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-brand-primary shadow-xl hover:shadow-2xl transition-all duration-300"
                  >
                    <MaterialIcon icon="build" size="lg" className="mr-3" />
                    Explore Our Solutions
                  </Button>
                </Link>
              </div>

              <div className="flex sm:flex-row flex-col justify-center items-center gap-6 text-white/90 text-base md:text-lg">
                <div className="flex items-center">
                  <MaterialIcon
                    icon="phone"
                    size="md"
                    className="mr-2 text-brand-secondary"
                  />
                  <span className="font-medium">(509) 308-6489</span>
                </div>
                <div className="flex items-center">
                  <MaterialIcon
                    icon="location_on"
                    size="md"
                    className="mr-2 text-brand-secondary"
                  />
                  <span>3111 N. Capital Ave., Pasco, WA 99301</span>
                </div>
              </div>
            </div>
          </FadeInWhenVisible>
        </div>
      </section>
    </div>
  );
}
