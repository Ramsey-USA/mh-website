"use client";

import React, { useState } from "react";
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
import { PageNavigation } from "@/components/navigation/PageNavigation";
import { navigationConfigs } from "@/components/navigation/navigationConfigs";

// Trade Partner Categories
const partnerCategories = [
  {
    category: "Electrical Contractors",
    icon: "electrical_services",
    description:
      "Licensed electrical professionals providing safe, code-compliant installations",
    partners: [
      {
        name: "Pacific Northwest Electric",
        specialty: "Commercial & Industrial Electrical",
        yearsWorking: "8+ years",
        location: "Tri-Cities, WA",
        description:
          "Specializing in high-voltage commercial installations and industrial electrical systems.",
      },
      {
        name: "Columbia Basin Electrical",
        specialty: "Residential & Light Commercial",
        yearsWorking: "5+ years",
        location: "Pasco, WA",
        description:
          "Expert residential electrical work and light commercial electrical installations.",
      },
    ],
  },
  {
    category: "Plumbing Contractors",
    icon: "plumbing",
    description:
      "Expert plumbing professionals for all water, sewer, and gas line needs",
    partners: [
      {
        name: "Tri-Cities Plumbing Solutions",
        specialty: "Commercial Plumbing Systems",
        yearsWorking: "6+ years",
        location: "Richland, WA",
        description:
          "Commercial plumbing specialists with expertise in large-scale water and sewer systems.",
      },
      {
        name: "Desert Plumbing & Heating",
        specialty: "HVAC & Plumbing Integration",
        yearsWorking: "4+ years",
        location: "Kennewick, WA",
        description:
          "Combined plumbing and HVAC services for comprehensive building system solutions.",
      },
    ],
  },
  {
    category: "HVAC Specialists",
    icon: "hvac",
    description:
      "Climate control experts ensuring comfortable, efficient building environments",
    partners: [
      {
        name: "Columbia River HVAC",
        specialty: "Commercial Climate Systems",
        yearsWorking: "7+ years",
        location: "Tri-Cities, WA",
        description:
          "Large-scale commercial HVAC installations and energy-efficient climate solutions.",
      },
      {
        name: "Valley Air Systems",
        specialty: "Industrial HVAC Solutions",
        yearsWorking: "5+ years",
        location: "Pasco, WA",
        description:
          "Industrial-grade heating, ventilation, and air conditioning for specialized facilities.",
      },
    ],
  },
  {
    category: "Concrete & Masonry",
    icon: "foundation",
    description:
      "Foundation and structural concrete experts building solid foundations",
    partners: [
      {
        name: "Northwest Concrete Works",
        specialty: "Foundation & Structural Concrete",
        yearsWorking: "10+ years",
        location: "Tri-Cities, WA",
        description:
          "Premier concrete contractors specializing in foundations, slabs, and structural elements.",
      },
      {
        name: "Columbia Masonry",
        specialty: "Decorative & Structural Masonry",
        yearsWorking: "6+ years",
        location: "Richland, WA",
        description:
          "Expert masonry work including brick, block, and stone for both aesthetic and structural applications.",
      },
    ],
  },
  {
    category: "Roofing Specialists",
    icon: "roofing",
    description:
      "Professional roofing contractors protecting every project from the elements",
    partners: [
      {
        name: "Pacific Roofing Solutions",
        specialty: "Commercial & Industrial Roofing",
        yearsWorking: "9+ years",
        location: "Tri-Cities, WA",
        description:
          "Commercial roofing specialists with expertise in flat, metal, and specialty roofing systems.",
      },
      {
        name: "Desert Shield Roofing",
        specialty: "Weather-Resistant Systems",
        yearsWorking: "4+ years",
        location: "Pasco, WA",
        description:
          "Specialized in durable roofing solutions designed for the Pacific Northwest climate.",
      },
    ],
  },
  {
    category: "Material Suppliers",
    icon: "local_shipping",
    description:
      "Reliable suppliers providing quality materials for every construction need",
    partners: [
      {
        name: "Columbia Building Supply",
        specialty: "Lumber & Building Materials",
        yearsWorking: "12+ years",
        location: "Tri-Cities, WA",
        description:
          "Full-service building supply with lumber, hardware, and construction materials.",
      },
      {
        name: "Northwest Steel & Supply",
        specialty: "Structural Steel & Metal",
        yearsWorking: "8+ years",
        location: "Richland, WA",
        description:
          "Industrial steel supplier providing structural steel, metal fabrication, and welding materials.",
      },
    ],
  },
];

// Partnership values
const partnershipValues = [
  {
    icon: "handshake",
    title: "Mutual Respect",
    description:
      "We treat our trade partners as valued team members, fostering relationships built on trust and professional respect.",
    color: "from-brand-primary to-brand-primary-dark",
  },
  {
    icon: "schedule",
    title: "Reliable Scheduling",
    description:
      "Clear communication and dependable scheduling ensure our partners can plan effectively and deliver quality work.",
    color: "from-brand-secondary to-brand-secondary-dark",
  },
  {
    icon: "payments",
    title: "Fair & Prompt Payment",
    description:
      "We believe in fair compensation and prompt payment schedules that support our partners' business success.",
    color: "from-brand-accent to-brand-accent-dark",
  },
  {
    icon: "support",
    title: "Collaborative Support",
    description:
      "Working together to solve challenges and achieve exceptional results for every project.",
    color: "from-brand-primary-light to-brand-primary",
  },
];

// Partnership benefits
const partnershipBenefits = [
  {
    icon: "trending_up",
    title: "Steady Work Opportunities",
    description:
      "Consistent project pipeline providing reliable business opportunities for established partners.",
  },
  {
    icon: "groups",
    title: "Professional Network",
    description:
      "Access to our network of trusted professionals and potential collaboration opportunities.",
  },
  {
    icon: "verified",
    title: "Quality Standards",
    description:
      "Clear expectations and quality standards that help partners deliver their best work.",
  },
  {
    icon: "school",
    title: "Knowledge Sharing",
    description:
      "Collaborative learning environment where we share best practices and industry insights.",
  },
  {
    icon: "security",
    title: "Insurance Support",
    description:
      "Guidance on insurance requirements and support in meeting project-specific coverage needs.",
  },
  {
    icon: "workspace_premium",
    title: "Professional Growth",
    description:
      "Opportunities to work on diverse, challenging projects that enhance skills and capabilities.",
  },
];

export default function TradePartnersPage() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  return (
    <div className="bg-white dark:bg-gray-900 min-h-screen">
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
                Our Trade Partners
              </span>
            </h1>

            {/* Subtitle */}
            <p className="max-w-3xl mx-auto text-xl sm:text-2xl md:text-3xl text-white/90 leading-relaxed">
              Building Excellence Together
            </p>

            {/* Description */}
            <p className="max-w-4xl mx-auto text-lg md:text-xl text-white/80 leading-relaxed">
              MH Construction succeeds because of our exceptional trade
              partners. We're grateful for the skilled subcontractors and
              reliable vendors who help us deliver outstanding results on every
              project.
            </p>
          </div>
        </div>

        {/* Page-Specific Navigation Bar */}
        <PageNavigation
          items={navigationConfigs.tradePartners}
          className="absolute bottom-0 left-0 right-0"
        />
      </section>

      <div className="mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32 xl:py-40 max-w-7xl">
        {/* Partnership Philosophy */}
        <section className="mb-20 lg:mb-32">
          <FadeInWhenVisible>
            <div className="mb-12 lg:mb-16 text-center">
              <h2 className="mb-4 font-bold text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl">
                <span className="text-gray-700 dark:text-gray-300">
                  Partnership
                </span>{" "}
                <span className="bg-clip-text bg-gradient-to-r from-brand-primary to-brand-secondary text-transparent">
                  Philosophy
                </span>
              </h2>
              <p className="mx-auto max-w-4xl text-gray-600 dark:text-gray-300 text-xl">
                "Great construction isn't built by one company—it's built by a
                team of dedicated professionals who share our commitment to
                excellence."
              </p>
              <cite className="block mt-4 font-semibold text-brand-secondary text-lg">
                — Jeremy Thamert, Owner & General Manager
              </cite>
            </div>
          </FadeInWhenVisible>

          <StaggeredFadeIn className="gap-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
            {partnershipValues.map((value, index) => (
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

        {/* Trade Partner Categories */}
        <section className="mb-20 lg:mb-32">
          <FadeInWhenVisible>
            <div className="mb-12 lg:mb-16 text-center">
              <h2 className="mb-4 font-bold text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl">
                <span className="text-gray-700 dark:text-gray-300">
                  Our Trade Partner
                </span>{" "}
                <span className="bg-clip-text bg-gradient-to-r from-brand-primary to-brand-secondary text-transparent">
                  Network
                </span>
              </h2>
              <p className="mx-auto max-w-3xl text-gray-600 dark:text-gray-300 text-xl">
                Meet the skilled professionals who help us bring every project
                to life with expertise, reliability, and shared commitment to
                quality.
              </p>
            </div>
          </FadeInWhenVisible>

          <div className="space-y-8">
            {partnerCategories.map((category, categoryIndex) => (
              <FadeInWhenVisible key={categoryIndex}>
                <Card className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
                  <CardHeader className="pb-4">
                    <div className="flex items-center">
                      <div className="flex justify-center items-center bg-brand-primary mr-4 rounded-full w-12 h-12">
                        <MaterialIcon
                          icon={category.icon}
                          size="lg"
                          className="text-white"
                        />
                      </div>
                      <div>
                        <CardTitle className="text-gray-900 dark:text-white text-2xl">
                          {category.category}
                        </CardTitle>
                        <p className="text-gray-600 dark:text-gray-300">
                          {category.description}
                        </p>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="gap-6 grid grid-cols-1 lg:grid-cols-2">
                      {category.partners.map((partner, partnerIndex) => (
                        <div
                          key={partnerIndex}
                          className="bg-gray-50 hover:bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 p-6 rounded-lg transition-colors"
                        >
                          <div className="flex justify-between items-start mb-3">
                            <h4 className="font-bold text-gray-900 dark:text-white text-lg">
                              {partner.name}
                            </h4>
                            <span className="bg-brand-secondary/20 dark:bg-brand-secondary/30 px-2 py-1 rounded font-medium text-brand-secondary dark:text-brand-secondary-light text-xs">
                              {partner.yearsWorking}
                            </span>
                          </div>
                          <div className="space-y-2 mb-3">
                            <div className="flex items-center text-gray-600 dark:text-gray-300 text-sm">
                              <MaterialIcon
                                icon="business"
                                className="mr-2"
                                size="sm"
                              />
                              {partner.specialty}
                            </div>
                            <div className="flex items-center text-gray-600 dark:text-gray-300 text-sm">
                              <MaterialIcon
                                icon="location_on"
                                className="mr-2"
                                size="sm"
                              />
                              {partner.location}
                            </div>
                          </div>
                          <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
                            {partner.description}
                          </p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </FadeInWhenVisible>
            ))}
          </div>
        </section>

        {/* Partnership Benefits */}
        <section className="mb-20 lg:mb-32">
          <FadeInWhenVisible>
            <div className="mb-12 lg:mb-16 text-center">
              <h2 className="mb-4 font-bold text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl">
                <span className="text-gray-700 dark:text-gray-300">
                  Partnership
                </span>{" "}
                <span className="bg-clip-text bg-gradient-to-r from-brand-primary to-brand-secondary text-transparent">
                  Benefits
                </span>
              </h2>
              <p className="mx-auto max-w-3xl text-gray-600 dark:text-gray-300 text-xl">
                We believe in creating mutually beneficial relationships that
                help our trade partners grow and succeed alongside us.
              </p>
            </div>
          </FadeInWhenVisible>

          <StaggeredFadeIn className="gap-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {partnershipBenefits.map((benefit, index) => (
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

        {/* Call to Action - Join Our Network */}
        <section className="bg-gradient-to-br from-brand-primary/5 dark:from-brand-primary/10 via-brand-primary/10 dark:via-brand-primary/20 to-brand-secondary/5 dark:to-brand-secondary/10 p-12 lg:p-16 xl:p-20 rounded-2xl">
          <FadeInWhenVisible>
            <div className="text-center">
              <MaterialIcon
                icon="diversity_3"
                size="4xl"
                className="mb-6 text-brand-primary"
              />
              <h2 className="mb-6 font-bold text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl">
                <span className="text-gray-700 dark:text-gray-300">
                  Interested in Partnering
                </span>{" "}
                <span className="bg-clip-text bg-gradient-to-r from-brand-primary to-brand-secondary text-transparent">
                  With Us?
                </span>
              </h2>
              <p className="mx-auto mb-8 max-w-3xl text-gray-600 dark:text-gray-300 text-xl">
                We're always looking for reliable, skilled trade partners who
                share our commitment to quality and professionalism. Join our
                network and grow your business with consistent, quality
                projects.
              </p>
              <div className="flex sm:flex-row flex-col justify-center gap-4">
                <Link href="/contact">
                  <Button
                    size="lg"
                    className="bg-brand-primary hover:bg-brand-primary-dark dark:bg-brand-primary dark:hover:bg-brand-primary-dark shadow-xl text-white"
                  >
                    <MaterialIcon icon="contact_mail" className="mr-2" />
                    Contact Our Team
                  </Button>
                </Link>
                <Link href="/projects">
                  <Button
                    size="lg"
                    className="bg-brand-secondary hover:bg-brand-secondary-dark dark:bg-brand-secondary dark:hover:bg-brand-secondary-dark shadow-xl text-black dark:text-black"
                  >
                    <MaterialIcon icon="photo_library" className="mr-2" />
                    View Our Projects
                  </Button>
                </Link>
              </div>
              <p className="mt-6 text-gray-500 dark:text-gray-400">
                <MaterialIcon icon="phone" className="inline mr-2" size="sm" />
                Partnership Inquiries: (509) 308-6489 | office@mhc-gc.com
              </p>
            </div>
          </FadeInWhenVisible>
        </section>
      </div>
    </div>
  );
}
