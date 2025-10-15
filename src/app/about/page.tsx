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
    title: "Partnership-First Ethics",
    subtitle: "Small-town values with big-city capabilities",
    description:
      "Your vision comes first. We adapt our expertise to serve your goals and build lasting partnerships, not just structures.",
    practices: [
      "Initial consultations focused on understanding your unique partnership needs",
      "Flexible scheduling that works with your timeline and priorities",
      "Multiple communication channels (phone, email, text, in-person)",
      "Solutions scaled to your budget without compromising partnership quality",
    ],
  },
  {
    iconName: "settings",
    title: "Partnership & Control",
    subtitle: '"You control it, we manage it"',
    description:
      "Shared decision making where you maintain control while we provide expert guidance and handle all logistics through true partnership.",
    practices: [
      "Decision points clearly identified and explained before work proceeds",
      "Daily briefings on progress and upcoming partnership decisions needed",
      "Professional appearance and conduct on your property",
      "Coordination of all subcontractors and material deliveries",
    ],
  },
  {
    iconName: "shield",
    title: "Partnership Trust",
    subtitle: "The culmination of all other values",
    description:
      "Trust isn't just another value—it's the result when all other values are consistently demonstrated. It's our ultimate partnership goal.",
    practices: [
      "Consistency: Delivering the same high standards on every partnership project",
      "Reliability: Being where we say we'll be, when we say we'll be there",
      "Competence: Demonstrating expertise through quality partnership results",
      "Character: Doing the right thing, especially when it's difficult",
    ],
  },
];

// Company Stats
const companyStats = [
  { iconName: "calendar_today", value: "30+", label: "Years in Business" },
  { iconName: "groups", value: "150+", label: "Years Combined Experience" },
  { iconName: "star", value: "98%", label: "Client Satisfaction" },
  { iconName: "diversity_3", value: "70%", label: "Referral Rate" },
];

// Leadership Team Data
const leadershipTeam = [
  {
    name: "Jeremy Thamert",
    role: "Owner & General Manager",
    experience: "2 years in current role",
    status: "Civilian Supporter",
    specialties: [
      "Strategic Vision & Business Development",
      "Technology Integration & Innovation",
      "AI Adoption & Digital Transformation",
      "Operational Leadership & Team Management",
    ],
    philosophy: "Bridging military precision with civilian innovation",
    icon: "person",
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
    experience: "30+ years construction industry leadership",
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
      <section className="relative bg-gradient-to-br from-gray-900 via-[#386851] to-gray-900 min-h-screen flex items-center justify-center text-white">
        {/* Background Elements */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#386851]/30 via-gray-900/80 to-[#BD9264]/20"></div>

        {/* Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="space-y-8">
            {/* Main Title */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black leading-tight tracking-tight">
              <span className="block bg-clip-text bg-gradient-to-r from-white via-blue-100 to-white text-transparent drop-shadow-lg">
                About MH Construction
              </span>
            </h1>

            {/* Subtitle */}
            <p className="max-w-3xl mx-auto text-xl sm:text-2xl md:text-3xl text-white/90 leading-relaxed">
              "We Work With You Every Step of the Way"
            </p>

            {/* Description */}
            <p className="max-w-4xl mx-auto text-lg md:text-xl text-white/80 leading-relaxed">
              Operating on a simple but powerful principle: every client is a
              partner, every project serves the community. Where military
              precision meets construction excellence through genuine
              partnership.
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
                <h2 className="mb-6 font-black text-gray-900 dark:text-gray-100 text-2xl sm:text-3xl md:text-4xl lg:text-5xl leading-tight tracking-tighter">
                  <span className="block mb-3 font-semibold text-gray-700 dark:text-gray-300 text-xl sm:text-2xl md:text-3xl lg:text-4xl tracking-tight">
                    Our Partnership
                  </span>
                  <span className="block bg-clip-text bg-gradient-to-r from-brand-primary to-brand-secondary drop-shadow-sm text-transparent">
                    Philosophy
                  </span>
                </h2>
                <p className="mx-auto max-w-5xl font-light text-gray-600 dark:text-gray-300 text-lg md:text-xl lg:text-2xl leading-relaxed tracking-wide">
                  At MH Construction, we don't just build structures - we build
                  relationships.
                </p>
              </div>

              <div className="gap-8 grid md:grid-cols-2 mb-12">
                <Card className="bg-white dark:bg-gray-800 hover:shadow-lg dark:hover:shadow-gray-600/50 border border-gray-200 dark:border-gray-700 transition-shadow">
                  <CardHeader>
                    <MaterialIcon
                      icon="favorite"
                      className="mb-3 text-bronze-400 text-4xl"
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
                    <p className="mb-4 text-gray-700 dark:text-gray-300">
                      <strong className="text-gray-900 dark:text-white">
                        MH Construction exists to strengthen Pacific Northwest
                        communities.
                      </strong>{" "}
                      Every project contributes to a stronger, more connected
                      region.
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
                  contractor - you're gaining a partner who genuinely cares
                  about your success and our community's future. We believe in
                  building for the owner, not the dollar."
                </p>
                <div className="flex items-center">
                  <MaterialIcon
                    icon="person"
                    className="mr-3 text-brand-primary text-2xl"
                  />
                  <div>
                    <p className="font-semibold text-gray-900 dark:text-white">
                      Jeremy Thamert
                    </p>
                    <p className="text-gray-600 dark:text-gray-300 text-sm">
                      Owner & General Manager
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </FadeInWhenVisible>
        </div>
      </section>

      {/* Company Stats */}
      <section className="bg-gradient-to-r from-brand-primary dark:from-forest-700 to-forest-600 dark:to-forest-800 py-16 text-white">
        <div className="mx-auto px-4 container">
          <FadeInWhenVisible>
            <div className="mb-16 text-center">
              <MaterialIcon
                icon="analytics"
                className="mb-6 text-brand-secondary text-6xl"
              />
              <h2 className="mb-6 font-black text-white text-2xl sm:text-3xl md:text-4xl lg:text-5xl leading-tight tracking-tighter">
                <span className="block mb-3 font-semibold text-white/80 text-xl sm:text-2xl md:text-3xl lg:text-4xl tracking-tight">
                  Our Track
                </span>
                <span className="block bg-clip-text bg-gradient-to-r from-white to-brand-secondary drop-shadow-sm text-transparent">
                  Record
                </span>
              </h2>
              <p className="mx-auto max-w-5xl font-light text-forest-100 text-lg md:text-xl lg:text-2xl leading-relaxed tracking-wide">
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
                    <div className="text-forest-100">{stat.label}</div>
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
              <h2 className="mb-6 font-black text-gray-900 dark:text-gray-100 text-2xl sm:text-3xl md:text-4xl lg:text-5xl leading-tight tracking-tighter">
                <span className="block mb-3 font-semibold text-gray-700 dark:text-gray-300 text-xl sm:text-2xl md:text-3xl lg:text-4xl tracking-tight">
                  Our 6 Core
                </span>
                <span className="block bg-clip-text bg-gradient-to-r from-brand-primary to-brand-secondary drop-shadow-sm text-transparent">
                  Values
                </span>
              </h2>
              <div className="mx-auto max-w-4xl">
                <p className="mb-4 font-light text-gray-600 dark:text-gray-300 text-lg md:text-xl lg:text-2xl leading-relaxed tracking-wide">
                  Trust-Centered Philosophy: "Trust as our ultimate goal and
                  measurable company foundation"
                </p>
                <div className="bg-brand-light dark:bg-gray-800 p-6 border-brand-primary border-l-4 rounded-xl">
                  <p className="font-medium text-brand-accent dark:text-brand-primary text-lg">
                    "Trust isn't just another value—it's the result when all
                    other values are consistently demonstrated. It's our
                    ultimate goal."
                  </p>
                </div>
              </div>
            </div>
          </FadeInWhenVisible>

          <StaggeredFadeIn className="gap-6 grid md:grid-cols-2 lg:grid-cols-3 mx-auto max-w-7xl">
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
      <section
        id="team"
        className="bg-gradient-to-b from-gray-50 dark:from-gray-800 to-white dark:to-gray-900 py-16 lg:py-24"
      >
        <div className="mx-auto px-4 container">
          <FadeInWhenVisible>
            <div className="mb-16 text-center">
              <MaterialIcon
                icon="groups"
                className="mb-6 text-brand-primary text-6xl"
              />
              <h2 className="mb-6 font-black text-gray-900 dark:text-gray-100 text-2xl sm:text-3xl md:text-4xl lg:text-5xl leading-tight tracking-tighter">
                <span className="block mb-3 font-semibold text-gray-700 dark:text-gray-300 text-xl sm:text-2xl md:text-3xl lg:text-4xl tracking-tight">
                  Meet Our
                </span>
                <span className="block bg-clip-text bg-gradient-to-r from-brand-primary to-brand-secondary drop-shadow-sm text-transparent">
                  Team
                </span>
              </h2>
              <p className="mx-auto max-w-3xl font-light text-gray-600 dark:text-gray-300 text-lg md:text-xl lg:text-2xl leading-relaxed tracking-wide">
                Your partnership starts with leaders committed to serving both
                clients and communities through collaborative excellence
              </p>
            </div>
          </FadeInWhenVisible>

          <StaggeredFadeIn className="gap-8 grid md:grid-cols-2 lg:grid-cols-3 mx-auto max-w-7xl">
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
                  <div className="pt-4 border-gray-100 border-t">
                    <p className="text-gray-700 text-sm italic leading-relaxed">
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
              <h2 className="mb-16 font-black text-gray-900 dark:text-gray-100 text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-center leading-tight tracking-tighter">
                <span className="block mb-3 font-semibold text-gray-700 dark:text-gray-300 text-xl sm:text-2xl md:text-3xl lg:text-4xl tracking-tight">
                  Why Our Values
                </span>
                <span className="block bg-clip-text bg-gradient-to-r from-brand-primary to-brand-secondary drop-shadow-sm text-transparent">
                  Matter
                </span>
              </h2>

              <div className="gap-8 grid md:grid-cols-3">
                <Card className="bg-white dark:bg-gray-800 hover:shadow-xl dark:hover:shadow-gray-600/50 border border-gray-200 dark:border-gray-700 border-l-4 border-l-brand-primary transition-all hover:-translate-y-2 duration-300">
                  <CardHeader className="text-center">
                    <MaterialIcon
                      icon="people"
                      className="mb-4 text-brand-primary text-5xl"
                    />
                    <CardTitle className="text-gray-900 dark:text-white text-2xl">
                      For Our Clients
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

      {/* CTA Section */}
      <section className="relative bg-gradient-to-r from-brand-accent dark:from-forest-800 via-brand-primary dark:via-forest-700 to-forest-600 dark:to-forest-600 py-16 lg:py-24 overflow-hidden text-white">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="z-10 relative mx-auto px-4 container">
          <FadeInWhenVisible>
            <div className="mx-auto max-w-4xl text-center">
              <div className="inline-flex items-center mb-6 px-2 py-1 border-yellow-300 border-l-4">
                <MaterialIcon
                  icon="military_tech"
                  className="mr-2 text-yellow-300"
                />
                <span className="font-semibold text-sm">
                  Veteran-Owned Excellence
                </span>
              </div>

              <MaterialIcon
                icon="handshake"
                className="mb-6 text-brand-secondary text-6xl"
              />
              <h2 className="mb-6 font-black text-white text-2xl sm:text-3xl md:text-4xl lg:text-5xl leading-tight tracking-tighter">
                <span className="block mb-3 font-semibold text-white/80 text-xl sm:text-2xl md:text-3xl lg:text-4xl tracking-tight">
                  Ready to Start Our
                </span>
                <span className="block bg-clip-text bg-gradient-to-r from-white to-brand-secondary drop-shadow-sm text-transparent">
                  Partnership?
                </span>
              </h2>

              <div className="bg-white/10 backdrop-blur-sm mb-8 p-6 border border-white/20 rounded-xl">
                <p className="mb-2 font-medium text-brand-secondary text-lg">
                  "Building for the Owner, NOT the Dollar"
                </p>
                <p className="text-forest-100 text-lg">
                  Partner with a team that has made Trust our ultimate goal.
                  Let's discuss your vision and build something remarkable
                  together.
                </p>
              </div>

              <div className="flex sm:flex-row flex-col justify-center gap-4 mb-8">
                <Link href="/booking">
                  <Button
                    variant="primary"
                    size="lg"
                    className="shadow-xl hover:shadow-2xl transition-all duration-300"
                  >
                    <MaterialIcon icon="event" className="mr-2" />
                    Schedule Free Consultation
                  </Button>
                </Link>
                <Link href="/services">
                  <Button
                    size="lg"
                    variant="outline"
                    className="hover:bg-white/10 dark:hover:bg-gray-800/50 shadow-xl hover:shadow-2xl border-white dark:border-gray-300 text-white dark:text-gray-200 transition-all duration-300"
                  >
                    <MaterialIcon icon="build" className="mr-2" />
                    Explore Partnership Approach
                  </Button>
                </Link>
              </div>

              <div className="flex sm:flex-row flex-col justify-center items-center gap-6 text-forest-100">
                <div className="flex items-center">
                  <MaterialIcon
                    icon="phone"
                    className="mr-2 text-brand-secondary"
                  />
                  <span className="font-medium">(509) 308-6489</span>
                </div>
                <div className="flex items-center">
                  <MaterialIcon
                    icon="location_on"
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
