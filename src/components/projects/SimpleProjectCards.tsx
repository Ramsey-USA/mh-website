"use client";

import Link from "next/link";
import { MaterialIcon } from "@/components/icons/MaterialIcon";
import { Card, CardContent } from "@/components/ui";
import {
  FadeInWhenVisible,
  StaggeredFadeIn,
} from "@/components/animations/FramerMotionComponents";
import { gridPresets } from "@/lib/styles/layout-variants";

/**
 * Simplified Project Type Cards
 * Alternative to SmartRecommendations if analytics show low engagement
 * ~50 lines vs 550 lines, static content, faster load
 */

interface ProjectType {
  icon: string;
  title: string;
  description: string;
  priceRange: string;
  timeline: string;
  href: string;
  featured?: boolean;
}

const projectTypes: ProjectType[] = [
  {
    icon: "business",
    title: "Commercial Projects",
    description:
      "Office buildings, retail spaces, medical facilities, and more",
    priceRange: "$50K - $5M+",
    timeline: "3-18 months",
    href: "/services#commercial",
    featured: true,
  },
  {
    icon: "home",
    title: "Residential Construction",
    description: "Custom homes, additions, renovations, and remodels",
    priceRange: "$20K - $500K+",
    timeline: "1-12 months",
    href: "/services#residential",
  },
  {
    icon: "construction",
    title: "Tenant Improvements",
    description: "Commercial space build-outs and interior renovations",
    priceRange: "$15K - $200K",
    timeline: "1-6 months",
    href: "/services#tenant-improvement",
  },
  {
    icon: "home_repair_service",
    title: "Emergency Services",
    description: "24/7 urgent construction and repair support",
    priceRange: "Varies",
    timeline: "Immediate",
    href: "/services#emergency",
  },
  {
    icon: "apartment",
    title: "Healthcare Facilities",
    description: "ICRA Level 4, medical office, hospital expansions",
    priceRange: "$100K - $10M+",
    timeline: "6-24 months",
    href: "/services#healthcare",
    featured: true,
  },
  {
    icon: "store",
    title: "Retail & Hospitality",
    description: "Restaurants, stores, hotels, and entertainment venues",
    priceRange: "$30K - $2M+",
    timeline: "2-12 months",
    href: "/services#retail",
  },
];

interface SimpleProjectCardsProps {
  maxCards?: number;
  showFeaturedOnly?: boolean;
  variant?: "default" | "compact";
  className?: string;
}

export function SimpleProjectCards({
  maxCards = 6,
  showFeaturedOnly = false,
  variant: _variant = "default",
  className = "",
}: SimpleProjectCardsProps) {
  const displayCards = showFeaturedOnly
    ? projectTypes.filter((p) => p.featured).slice(0, maxCards)
    : projectTypes.slice(0, maxCards);

  return (
    <div className={className}>
      {/* Header */}
      <FadeInWhenVisible className="mb-8 text-center">
        <h2 className="mb-4 font-bold text-3xl text-gray-900 dark:text-white">
          What Can We Build Together?
        </h2>
        <p className="mx-auto max-w-3xl text-gray-600 text-lg dark:text-gray-300">
          Explore our construction services and get started with a free
          consultation
        </p>
      </FadeInWhenVisible>

      {/* Cards Grid */}
      <StaggeredFadeIn className={gridPresets.cards3Alt("md")}>
        {displayCards.map((project, cardIndex) => (
          <Link key={cardIndex} href={project.href}>
            <Card
              className={`h-full transition-all duration-300 hover:shadow-xl hover:-translate-y-1 cursor-pointer group ${
                project.featured
                  ? "border-2 border-brand-primary dark:border-brand-primary/50"
                  : "border border-gray-200 dark:border-gray-700"
              }`}
            >
              <CardContent className="p-6">
                {/* Icon */}
                <div
                  className={`flex justify-center items-center mb-4 rounded-full w-16 h-16 group-hover:scale-110 transition-transform duration-300 ${
                    project.featured
                      ? "bg-brand-primary/10 dark:bg-brand-primary/20"
                      : "bg-gray-100 dark:bg-gray-800"
                  }`}
                >
                  <MaterialIcon
                    icon={project.icon}
                    size="xl"
                    className={
                      project.featured
                        ? "text-brand-primary"
                        : "text-gray-700 dark:text-gray-300"
                    }
                  />
                </div>

                {/* Title */}
                <h3 className="mb-3 font-bold text-gray-900 text-xl dark:text-white">
                  {project.title}
                  {project.featured && (
                    <span className="ml-2 bg-brand-primary/10 px-2 py-1 rounded text-brand-primary text-xs">
                      Popular
                    </span>
                  )}
                </h3>

                {/* Description */}
                <p className="mb-4 text-gray-600 text-sm dark:text-gray-400">
                  {project.description}
                </p>

                {/* Details */}
                <div className="space-y-2 mb-4 text-sm">
                  <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                    <MaterialIcon icon="attach_money" size="sm" />
                    <span className="font-medium">{project.priceRange}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                    <MaterialIcon icon="schedule" size="sm" />
                    <span>{project.timeline}</span>
                  </div>
                </div>

                {/* CTA */}
                <div className="flex items-center gap-2 font-semibold text-brand-primary text-sm group-hover:gap-3 transition-all duration-300">
                  <span>Learn More</span>
                  <MaterialIcon
                    icon="arrow_forward"
                    size="sm"
                    className="group-hover:translate-x-1 transition-transform duration-300"
                  />
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </StaggeredFadeIn>

      {/* Bottom CTA */}
      <FadeInWhenVisible className="flex flex-col sm:flex-row justify-center items-center gap-4 mt-8 text-center">
        <Link href="/projects">
          <button className="flex items-center gap-2 bg-secondary-700 hover:bg-secondary-800 px-6 py-3 rounded-lg font-semibold text-white transition-colors duration-200 min-w-[200px]">
            <MaterialIcon icon="photo_library" size="sm" />
            <span>View All Projects</span>
          </button>
        </Link>
        <Link href="/contact">
          <button className="flex items-center gap-2 bg-brand-primary hover:bg-brand-primary/90 px-6 py-3 rounded-lg font-semibold text-white transition-colors duration-200 min-w-[200px]">
            <MaterialIcon icon="phone" size="sm" />
            <span>Schedule Consultation</span>
          </button>
        </Link>
      </FadeInWhenVisible>
    </div>
  );
}
