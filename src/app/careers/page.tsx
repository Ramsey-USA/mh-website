"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Button,
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  JobApplicationModal,
} from "@/components/ui";
import { MaterialIcon } from "@/components/icons/MaterialIcon";
import {
  FadeInWhenVisible,
  StaggeredFadeIn,
  HoverScale,
} from "@/components/animations/FramerMotionComponents";
import { PageNavigation } from "@/components/navigation/PageNavigation";
import { navigationConfigs } from "@/components/navigation/navigationConfigs";

// Available positions
const openPositions = [
  {
    title: "Project Manager",
    department: "Construction Management",
    location: "Pasco, WA",
    type: "Full-time",
    experience: "3-5 years",
    description:
      "Lead construction projects from inception to completion, managing timelines, budgets, and partner relationships.",
    requirements: [
      "Bachelor's degree in Construction Management or related field",
      "3+ years of project management experience",
      "Strong communication and leadership skills",
      "Knowledge of construction codes and regulations",
      "PMP certification preferred",
    ],
    benefits: [
      "Competitive salary with performance bonuses",
      "Health, dental, and vision insurance",
      "Retirement plan with company matching",
      "Professional development opportunities",
    ],
  },
  {
    title: "Site Supervisor",
    department: "Field Operations",
    location: "Tri-Cities Area",
    type: "Full-time",
    experience: "5+ years",
    description:
      "Oversee daily construction activities, ensure safety compliance, and coordinate with subcontractors.",
    requirements: [
      "5+ years of construction supervision experience",
      "OSHA 30 certification required",
      "Strong problem-solving abilities",
      "Experience with commercial construction",
      "Valid driver's license and reliable transportation",
    ],
    benefits: [
      "Competitive hourly rate with overtime opportunities",
      "Company vehicle and equipment provided",
      "Health insurance package",
      "Safety incentive programs",
    ],
  },
  {
    title: "Estimator",
    department: "Pre-Construction",
    location: "Pasco, WA (Remote flexibility)",
    type: "Full-time",
    experience: "2-4 years",
    description:
      "Prepare accurate cost estimates for commercial and residential projects using industry software.",
    requirements: [
      "Experience with estimating software (ProEst, PlanSwift, etc.)",
      "2+ years of construction estimating experience",
      "Strong analytical and mathematical skills",
      "Attention to detail and accuracy",
      "Understanding of construction methods and materials",
    ],
    benefits: [
      "Competitive salary based on experience",
      "Remote work flexibility",
      "Professional software and training provided",
      "Career advancement opportunities",
    ],
  },
  {
    title: "Administrative Assistant",
    department: "Office Administration",
    location: "Pasco, WA",
    type: "Full-time",
    experience: "Entry Level Welcome",
    description:
      "Support daily operations with scheduling, documentation, and partner communication.",
    requirements: [
      "High school diploma or equivalent",
      "Excellent communication skills",
      "Proficiency in Microsoft Office Suite",
      "Strong organizational abilities",
      "Customer service orientation",
    ],
    benefits: [
      "Competitive starting salary",
      "Comprehensive training program",
      "Health and dental insurance",
      "Growth opportunities within the company",
    ],
  },
];

// Company benefits
const companyBenefits = [
  {
    icon: "health_and_safety",
    title: "Comprehensive Health Coverage",
    description:
      "Medical, dental, and vision insurance with competitive premiums and low deductibles.",
  },
  {
    icon: "savings",
    title: "Retirement Planning",
    description:
      "401(k) plan with generous company matching to help secure your financial future.",
  },
  {
    icon: "school",
    title: "Professional Development",
    description:
      "Continuing education, certifications, and training opportunities to advance your career.",
  },
  {
    icon: "work_history",
    title: "Work-Life Balance",
    description:
      "Flexible scheduling and time off policies that respect your personal life.",
  },
  {
    icon: "local_hospital",
    title: "Safety First Culture",
    description:
      "Industry-leading safety training and equipment to ensure everyone goes home safe.",
  },
  {
    icon: "military_tech",
    title: "Veteran-Friendly Workplace",
    description:
      "Special recognition and support for military veterans transitioning to civilian careers.",
  },
];

// Company culture values
const cultureValues = [
  {
    icon: "handshake",
    title: "Integrity & Trust",
    description:
      "We build relationships based on honesty, transparency, and mutual respect.",
    color: "from-brand-primary to-brand-primary-dark",
  },
  {
    icon: "emoji_people",
    title: "Team Unity",
    description:
      "From veterans to civilians, office to field—we're one team with shared values.",
    color: "from-brand-secondary to-brand-secondary-dark",
  },
  {
    icon: "trending_up",
    title: "Excellence & Growth",
    description:
      "We pursue continuous improvement in everything we do, personally and professionally.",
    color: "from-brand-accent to-brand-accent-dark",
  },
  {
    icon: "favorite",
    title: "Community Impact",
    description:
      "Building stronger communities, one project and one relationship at a time.",
    color: "from-brand-primary-light to-brand-primary",
  },
];

export default function CareersPage() {
  const [showApplicationModal, setShowApplicationModal] = useState(false);
  const [selectedPosition, setSelectedPosition] = useState<string>("");

  const handleApplyNow = (positionTitle: string) => {
    setSelectedPosition(positionTitle);
    setShowApplicationModal(true);
  };

  return (
    <div className="bg-white dark:bg-gray-900 min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-gray-900 via-brand-primary to-gray-900 min-h-[100dvh] sm:min-h-screen flex items-center justify-center text-white">
        {/* Background Elements */}
        <div className="absolute inset-0 bg-gradient-to-br from-brand-primary/30 via-gray-900/80 to-brand-secondary/20"></div>

        {/* Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="space-y-8">
            {/* Subtitle First - MH Branding Standard */}
            <p className="text-lg md:text-xl text-white/90 font-medium tracking-wide">
              Partnership-Focused Career Opportunities
            </p>

            {/* Main Title with Proper Gradient */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black leading-tight tracking-tight">
              <span className="block bg-clip-text bg-gradient-to-r from-brand-secondary via-white to-brand-primary text-transparent drop-shadow-lg">
                Join Our Team
              </span>
            </h1>

            {/* Subtitle */}
            <p className="max-w-3xl mx-auto text-xl sm:text-2xl md:text-3xl text-white/90 leading-relaxed">
              Build Your Career with MH Construction
            </p>

            {/* Primary Tagline */}
            <div className="max-w-4xl mx-auto">
              <div className="inline-block bg-black/30 backdrop-blur-sm px-6 py-3 rounded-lg border border-white/20">
                <p className="text-lg md:text-xl font-semibold bg-clip-text bg-gradient-to-r from-white via-gray-100 to-white text-transparent">
                  Building for the Owner, NOT the Dollar
                </p>
              </div>
            </div>

            {/* Description */}
            <p className="max-w-4xl mx-auto text-lg md:text-xl text-white/80 leading-relaxed">
              Join a veteran-owned company that values integrity, excellence,
              and community. We're looking for dedicated professionals to help
              us build the future of the Pacific Northwest.
            </p>
          </div>
        </div>

        {/* Page-Specific Navigation Bar */}
        <PageNavigation
          items={navigationConfigs.careers}
          className="absolute bottom-0 left-0 right-0"
        />
      </section>

      <div className="mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32 xl:py-40 max-w-7xl">
        {/* Why Work With Us */}
        <section className="mb-20 lg:mb-32">
          <FadeInWhenVisible>
            <div className="mb-12 lg:mb-16 text-center">
              <h2 className="mb-4 font-bold text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl">
                <span className="text-gray-700 dark:text-gray-300">
                  Why Choose
                </span>{" "}
                <span className="bg-clip-text bg-gradient-to-r from-brand-primary to-brand-secondary text-transparent">
                  MH Construction?
                </span>
              </h2>
              <p className="mx-auto max-w-3xl text-gray-600 dark:text-gray-300 text-xl">
                We're more than just a construction company—we're a family that
                invests in your success and future.
              </p>
            </div>
          </FadeInWhenVisible>

          <StaggeredFadeIn className="gap-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
            {cultureValues.map((value, index) => (
              <Card
                key={index}
                className="flex flex-col bg-white dark:bg-gray-800 hover:shadow-lg dark:hover:shadow-gray-600/50 border border-gray-200 dark:border-gray-700 h-full transition-all hover:-translate-y-1"
              >
                <CardContent className="flex flex-col p-6 h-full text-center">
                  <div
                    className={`flex justify-center items-center bg-gradient-to-r ${value.color} mx-auto mb-4 rounded-full w-16 h-16`}
                  >
                    <MaterialIcon
                      icon={value.icon}
                      size="lg"
                      className="text-white"
                    />
                  </div>
                  <h3 className="mb-3 font-bold text-gray-900 dark:text-white text-lg">
                    {value.title}
                  </h3>
                  <p className="flex-grow text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
                    {value.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </StaggeredFadeIn>
        </section>

        {/* Benefits & Perks */}
        <section className="mb-20 lg:mb-32">
          <FadeInWhenVisible>
            <div className="mb-12 lg:mb-16 text-center">
              <h2 className="mb-4 font-bold text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl">
                <span className="text-gray-700 dark:text-gray-300">
                  Benefits &
                </span>{" "}
                <span className="bg-clip-text bg-gradient-to-r from-brand-primary to-brand-secondary text-transparent">
                  Perks
                </span>
              </h2>
              <p className="mx-auto max-w-3xl text-gray-600 dark:text-gray-300 text-xl">
                We believe in taking care of our team members with comprehensive
                benefits and a supportive work environment.
              </p>
            </div>
          </FadeInWhenVisible>

          <StaggeredFadeIn className="gap-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {companyBenefits.map((benefit, index) => (
              <Card
                key={index}
                className="flex flex-col bg-white dark:bg-gray-800 hover:shadow-lg dark:hover:shadow-gray-600/50 border border-gray-200 dark:border-gray-700 h-full transition-all"
              >
                <CardContent className="flex flex-col p-6 h-full">
                  <div className="flex items-center mb-4">
                    <div className="flex justify-center items-center bg-brand-primary mr-4 rounded-full w-12 h-12">
                      <MaterialIcon
                        icon={benefit.icon}
                        size="lg"
                        className="text-white"
                      />
                    </div>
                    <h3 className="font-bold text-gray-900 dark:text-white text-lg">
                      {benefit.title}
                    </h3>
                  </div>
                  <p className="flex-grow text-gray-600 dark:text-gray-300 leading-relaxed">
                    {benefit.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </StaggeredFadeIn>
        </section>

        {/* Open Positions */}
        <section id="positions" className="mb-20 lg:mb-32">
          <FadeInWhenVisible>
            <div className="mb-12 lg:mb-16 text-center">
              <h2 className="mb-4 font-bold text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl">
                <span className="text-gray-700 dark:text-gray-300">
                  Current
                </span>{" "}
                <span className="bg-clip-text bg-gradient-to-r from-brand-primary to-brand-secondary text-transparent">
                  Openings
                </span>
              </h2>
              <p className="mx-auto max-w-3xl text-gray-600 dark:text-gray-300 text-xl">
                Explore our current job opportunities and find the perfect role
                to advance your career with us.
              </p>
            </div>
          </FadeInWhenVisible>

          <StaggeredFadeIn className="space-y-6">
            {openPositions.map((position, index) => (
              <Card
                key={index}
                className="bg-white dark:bg-gray-800 hover:shadow-lg dark:hover:shadow-gray-600/50 border border-gray-200 dark:border-gray-700 transition-all"
              >
                <CardContent className="p-8">
                  <div className="flex sm:flex-row flex-col justify-between items-start mb-6">
                    <div className="flex-grow">
                      <h3 className="mb-2 font-bold text-gray-900 dark:text-white text-2xl">
                        {position.title}
                      </h3>
                      <div className="flex flex-wrap gap-4 mb-4">
                        <span className="flex items-center text-gray-600 dark:text-gray-300">
                          <MaterialIcon
                            icon="business"
                            className="mr-1"
                            size="sm"
                          />
                          {position.department}
                        </span>
                        <span className="flex items-center text-gray-600 dark:text-gray-300">
                          <MaterialIcon
                            icon="location_on"
                            className="mr-1"
                            size="sm"
                          />
                          {position.location}
                        </span>
                        <span className="flex items-center text-gray-600 dark:text-gray-300">
                          <MaterialIcon
                            icon="schedule"
                            className="mr-1"
                            size="sm"
                          />
                          {position.type}
                        </span>
                        <span className="flex items-center text-gray-600 dark:text-gray-300">
                          <MaterialIcon
                            icon="work"
                            className="mr-1"
                            size="sm"
                          />
                          {position.experience}
                        </span>
                      </div>
                      <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                        {position.description}
                      </p>
                    </div>
                    <div className="mt-4 sm:mt-0 sm:ml-6">
                      <Button
                        onClick={() => handleApplyNow(position.title)}
                        className="bg-brand-primary hover:bg-brand-primary-dark dark:bg-brand-primary dark:hover:bg-brand-primary-dark text-white"
                      >
                        <MaterialIcon icon="send" className="mr-2" size="sm" />
                        Apply Now
                      </Button>
                    </div>
                  </div>

                  <div className="gap-8 grid grid-cols-1 lg:grid-cols-2">
                    <div>
                      <h4 className="mb-3 font-semibold text-gray-900 dark:text-white">
                        Requirements
                      </h4>
                      <ul className="space-y-2">
                        {position.requirements.map((req, reqIndex) => (
                          <li
                            key={reqIndex}
                            className="flex items-start text-gray-600 dark:text-gray-300 text-sm"
                          >
                            <MaterialIcon
                              icon="check_circle"
                              className="flex-shrink-0 mt-0.5 mr-2 text-brand-primary"
                              size="sm"
                            />
                            {req}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4 className="mb-3 font-semibold text-gray-900 dark:text-white">
                        What We Offer
                      </h4>
                      <ul className="space-y-2">
                        {position.benefits.map((benefit, benefitIndex) => (
                          <li
                            key={benefitIndex}
                            className="flex items-start text-gray-600 dark:text-gray-300 text-sm"
                          >
                            <MaterialIcon
                              icon="star"
                              className="flex-shrink-0 mt-0.5 mr-2 text-brand-secondary"
                              size="sm"
                            />
                            {benefit}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </StaggeredFadeIn>
        </section>

        {/* Call to Action */}
        <section className="bg-gradient-to-br from-brand-primary/5 dark:from-brand-primary/10 via-brand-primary/10 dark:via-brand-primary/20 to-brand-secondary/5 dark:to-brand-secondary/10 p-12 lg:p-16 xl:p-20 rounded-2xl">
          <FadeInWhenVisible>
            <div className="text-center">
              <MaterialIcon
                icon="groups"
                size="4xl"
                className="mb-6 text-brand-primary"
              />
              <h2 className="mb-6 font-bold text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl">
                <span className="text-gray-700 dark:text-gray-300">
                  Don't See the
                </span>{" "}
                <span className="bg-clip-text bg-gradient-to-r from-brand-primary to-brand-secondary text-transparent">
                  Perfect Role?
                </span>
              </h2>
              <p className="mx-auto mb-8 max-w-3xl text-gray-600 dark:text-gray-300 text-xl">
                We're always looking for talented individuals to join our team.
                Send us your resume and let us know how you'd like to contribute
                to our mission.
              </p>
              <div className="flex sm:flex-row flex-col justify-center gap-4">
                <Button
                  onClick={() => handleApplyNow("General Application")}
                  size="lg"
                  className="bg-brand-primary hover:bg-brand-primary-dark dark:bg-brand-primary dark:hover:bg-brand-primary-dark shadow-xl text-white"
                >
                  <MaterialIcon icon="upload" className="mr-2" />
                  Submit General Application
                </Button>
                <Link href="/contact">
                  <Button
                    size="lg"
                    className="bg-brand-secondary hover:bg-brand-secondary-dark dark:bg-brand-secondary dark:hover:bg-brand-secondary-dark shadow-xl text-black dark:text-black"
                  >
                    <MaterialIcon icon="contact_mail" className="mr-2" />
                    Contact HR
                  </Button>
                </Link>
              </div>
              <p className="mt-6 text-gray-500 dark:text-gray-400">
                <MaterialIcon icon="phone" className="inline mr-2" size="sm" />
                HR Hotline: (509) 308-6489 | office@mhc-gc.com
              </p>
            </div>
          </FadeInWhenVisible>
        </section>
      </div>

      {/* Job Application Modal */}
      <JobApplicationModal
        isOpen={showApplicationModal}
        onClose={() => setShowApplicationModal(false)}
      />
    </div>
  );
}
