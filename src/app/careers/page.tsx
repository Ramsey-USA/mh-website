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
    title: "Equipment Operator (Civil)",
    department: "Field Operations",
    location: "Tri-Cities Area",
    type: "Full-time",
    experience: "3+ years",
    description:
      "Operate heavy equipment for civil construction projects including excavators, loaders, dozers, and graders. Safety-focused operation in compliance with all regulations.",
    requirements: [
      "3+ years of equipment operation experience",
      "Valid commercial driver's license (CDL) preferred",
      "Experience with excavators, loaders, dozers, and graders",
      "Strong understanding of civil construction practices",
      "OSHA safety certification",
      "Ability to read grade stakes and construction plans",
    ],
    benefits: [
      "Competitive hourly rate based on experience",
      "Equipment maintenance training provided",
      "Health, dental, and vision insurance",
      "Safety incentive programs",
      "Veteran preference for military equipment operators",
    ],
  },
  {
    title: "Lead Carpenter",
    department: "Construction",
    location: "Tri-Cities Area",
    type: "Full-time",
    experience: "5+ years",
    description:
      "Lead carpentry teams on commercial and residential projects, ensuring quality craftsmanship and project timelines. Mentor junior carpenters and coordinate with project management.",
    requirements: [
      "5+ years of professional carpentry experience",
      "Proven leadership and team management skills",
      "Expertise in framing, finish work, and trim carpentry",
      "Ability to read blueprints and technical drawings",
      "Own professional carpentry tools",
      "Valid driver's license and reliable transportation",
    ],
    benefits: [
      "Competitive salary with performance bonuses",
      "Tool allowance and replacement program",
      "Company vehicle for site travel",
      "Health insurance package",
      "Leadership development opportunities",
    ],
  },
  {
    title: "Shop Manager (Small Engines)",
    department: "Equipment Management",
    location: "Pasco, WA",
    type: "Full-time",
    experience: "4+ years",
    description:
      "Manage equipment shop operations, maintain small engines and power tools, coordinate maintenance schedules, and ensure all equipment is field-ready. Oversee inventory and ordering.",
    requirements: [
      "4+ years of small engine repair experience",
      "Knowledge of 2-stroke and 4-stroke engines",
      "Experience with power tools, generators, and compressors",
      "Strong organizational and inventory management skills",
      "Ability to diagnose and repair equipment efficiently",
      "Parts ordering and vendor relationship management",
    ],
    benefits: [
      "Competitive salary based on experience",
      "Climate-controlled shop facility",
      "Tool and equipment budget",
      "Health and dental insurance",
      "Professional certifications supported",
    ],
  },
  {
    title: "Drywaller/Taper",
    department: "Construction",
    location: "Tri-Cities Area",
    type: "Full-time",
    experience: "2+ years",
    description:
      "Install, finish, and texture drywall for commercial and residential projects. Ensure smooth, professional finishes that meet quality standards and project specifications.",
    requirements: [
      "2+ years of drywall installation and finishing experience",
      "Expertise in taping, mudding, and texturing",
      "Knowledge of various finish levels and techniques",
      "Ability to work efficiently on scaffolding and lifts",
      "Own basic drywall tools",
      "Attention to detail and quality craftsmanship",
    ],
    benefits: [
      "Competitive hourly rate with overtime opportunities",
      "Tool replacement program",
      "Health insurance after probation period",
      "Material handling equipment provided",
      "Steady work year-round",
    ],
  },
  {
    title: "Project Manager",
    department: "Construction Management",
    location: "Pasco, WA",
    type: "Full-time",
    experience: "3-5 years",
    description:
      "Lead construction projects from inception to completion, managing timelines, budgets, and partner relationships. Work WITH project owners to deliver exceptional results.",
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
      "Oversee daily construction activities, ensure safety compliance, and coordinate with subcontractors. Lead field teams with integrity and excellence.",
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
      "Prepare accurate cost estimates for commercial and residential projects using industry software. Partner with clients to understand project scope and deliver competitive bids.",
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
      "Support daily operations with scheduling, documentation, and partner communication. Be the welcoming face of our veteran-owned company.",
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
      <section className="relative bg-gradient-to-br from-gray-900 via-brand-primary to-gray-900 h-screen flex items-center justify-center text-white overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 bg-gradient-to-br from-brand-primary/30 via-gray-900/80 to-brand-secondary/20"></div>

        {/* Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-16 sm:pt-24 md:pt-32 lg:pt-40 pb-12 sm:pb-16 md:pb-20 lg:pb-28">
          <FadeInWhenVisible className="space-y-2 sm:space-y-3 md:space-y-4 lg:space-y-6">
            {/* Main Title */}
            <h1 className="text-lg xs:text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-black">
              <span className="block text-brand-secondary font-black drop-shadow-lg">
                Build Your Career with MH Construction
              </span>
            </h1>

            {/* Description */}
            <p className="max-w-4xl mx-auto font-light text-white/90 text-sm xs:text-base sm:text-lg md:text-xl lg:text-2xl leading-relaxed tracking-wide px-2">
              Partnership Culture • Professional Growth • Veteran-Friendly
            </p>

            {/* Additional Info */}
            <p className="max-w-4xl mx-auto text-xs xs:text-sm sm:text-base md:text-lg text-white/80 leading-relaxed px-2">
              Join a veteran-owned company that values integrity, excellence,
              and community. We're looking for dedicated professionals who share
              our commitment to quality craftsmanship.
            </p>

            {/* Trust Indicators */}
            <div className="flex flex-wrap justify-center items-center gap-4 sm:gap-6 md:gap-10 font-medium text-brand-secondary text-sm sm:text-base">
              <div className="flex items-center">
                <MaterialIcon icon="groups" size="md" className="mr-2" />
                <span>Team Unity</span>
              </div>
              <div className="flex items-center">
                <MaterialIcon icon="school" size="md" className="mr-2" />
                <span>Career Development</span>
              </div>
              <div className="flex items-center">
                <MaterialIcon
                  icon="health_and_safety"
                  size="md"
                  className="mr-2"
                />
                <span>Safety First</span>
              </div>
            </div>
          </FadeInWhenVisible>
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
            <div className="mb-16 lg:mb-24 text-center scroll-reveal">
              {/* NO SECTION BADGES - Clean section header */}
              <h2 className="mb-8 pb-2 font-black text-gray-900 dark:text-white text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl leading-tight tracking-tighter">
                <span className="block mb-4 font-semibold text-gray-700 dark:text-gray-300 text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl tracking-tight">
                  Why Join
                </span>
                <span className="block text-brand-primary dark:text-brand-primary font-black">
                  MH Construction
                </span>
              </h2>
              <p className="mx-auto max-w-4xl font-light text-gray-600 dark:text-gray-300 text-lg sm:text-xl md:text-2xl lg:text-3xl leading-relaxed tracking-wide px-2">
                We're more than just a construction company—we're a family that
                invests in your success and future.
              </p>
            </div>
          </FadeInWhenVisible>

          <StaggeredFadeIn className="gap-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4">
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
            <div className="mb-16 lg:mb-24 text-center scroll-reveal">
              {/* NO SECTION BADGES - Clean section header */}
              <h2 className="mb-8 pb-2 font-black text-gray-900 dark:text-white text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl leading-tight tracking-tighter">
                <span className="block mb-4 font-semibold text-gray-700 dark:text-gray-300 text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl tracking-tight">
                  Employee Benefits
                </span>
                <span className="block text-brand-primary dark:text-brand-primary font-black">
                  & Perks
                </span>
              </h2>
              <p className="mx-auto max-w-4xl font-light text-gray-600 dark:text-gray-300 text-lg sm:text-xl md:text-2xl lg:text-3xl leading-relaxed tracking-wide px-2">
                We believe in taking care of our team members with comprehensive
                benefits and a supportive work environment.
              </p>
            </div>
          </FadeInWhenVisible>

          <StaggeredFadeIn className="gap-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mb-12">
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
            <div className="mb-16 lg:mb-24 text-center scroll-reveal">
              {/* NO SECTION BADGES - Clean section header */}
              <h2 className="mb-8 pb-2 font-black text-gray-900 dark:text-white text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl leading-tight tracking-tighter">
                <span className="block mb-4 font-semibold text-gray-700 dark:text-gray-300 text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl tracking-tight">
                  Current Career
                </span>
                <span className="block text-brand-primary dark:text-brand-primary font-black">
                  Opportunities
                </span>
              </h2>
              <p className="mx-auto max-w-4xl font-light text-gray-600 dark:text-gray-300 text-lg sm:text-xl md:text-2xl lg:text-3xl leading-relaxed tracking-wide px-2">
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
                        variant="primary"
                        size="lg"
                        className="transition-all duration-300 min-w-[180px]"
                      >
                        <MaterialIcon icon="send" size="lg" className="mr-3" />
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
              {/* NO SECTION BADGES - Icon only */}
              <div className="mb-8">
                <MaterialIcon
                  icon="groups"
                  size="4xl"
                  className="text-brand-primary"
                />
              </div>

              {/* Standard header - NO SECTION BADGES */}
              <h2 className="mb-8 pb-2 font-black text-gray-900 dark:text-white text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl leading-tight tracking-tighter">
                <span className="block mb-4 font-semibold text-gray-700 dark:text-gray-300 text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl tracking-tight">
                  Don't See the
                </span>
                <span className="block text-brand-primary dark:text-brand-primary font-black">
                  Perfect Role?
                </span>
              </h2>

              <p className="mx-auto mb-10 max-w-4xl font-light text-gray-600 dark:text-gray-300 text-lg sm:text-xl md:text-2xl lg:text-3xl leading-relaxed tracking-wide px-2">
                We're always looking for talented individuals to join our team.
                Send us your resume and let us know how you'd like to contribute
                to our mission.
              </p>

              {/* CTA Buttons - Brand Standards */}
              <div className="flex sm:flex-row flex-col justify-center gap-6">
                <Button
                  onClick={() => handleApplyNow("General Application")}
                  variant="primary"
                  size="lg"
                  className="transition-all duration-300 min-w-[260px]"
                >
                  <MaterialIcon icon="upload" size="lg" className="mr-3" />
                  <span className="font-medium">Submit Application</span>
                </Button>
                <Link href="/contact">
                  <Button
                    variant="outline"
                    size="lg"
                    className="transition-all duration-300 min-w-[260px]"
                  >
                    <MaterialIcon
                      icon="contact_mail"
                      size="lg"
                      className="mr-3"
                    />
                    <span className="font-medium">Contact HR</span>
                  </Button>
                </Link>
              </div>
              <p className="mt-8 text-gray-500 dark:text-gray-400 text-lg">
                <MaterialIcon icon="phone" className="inline mr-2" size="sm" />
                HR Hotline: (509) 308-6489 |{" "}
                <a
                  href="mailto:office@mhc-gc.com"
                  className="font-semibold text-brand-primary hover:text-brand-secondary underline"
                >
                  office@mhc-gc.com
                </a>
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
