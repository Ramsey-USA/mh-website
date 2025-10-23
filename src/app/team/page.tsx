"use client";

import React, { useState } from "react";
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
    {} as Record<string, VintageTeamMember[]>
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
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-gray-900 via-brand-primary to-gray-900 min-h-screen flex items-center justify-center text-white">
        {/* Background Elements */}
        <div className="absolute inset-0 bg-gradient-to-br from-brand-primary/30 via-gray-900/80 to-brand-secondary/20"></div>

        {/* Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="space-y-8">
            {/* Subtitle First - MH Branding Standard */}
            <p className="text-lg md:text-xl text-white/90 font-medium tracking-wide">
              Expert Construction Management Professionals
            </p>

            {/* Main Title with Proper Gradient */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black leading-tight tracking-tight">
              <span className="block bg-clip-text bg-gradient-to-r from-brand-secondary via-white to-brand-primary text-transparent drop-shadow-lg">
                Our Team
              </span>
            </h1>

            {/* Subtitle */}
            <p className="max-w-3xl mx-auto text-xl sm:text-2xl md:text-3xl text-white/90 leading-relaxed">
              Meet the partnership team behind MH Construction
            </p>

            {/* Description */}
            <p className="max-w-4xl mx-auto text-lg md:text-xl text-white/80 leading-relaxed">
              Discover your dedicated partners through authentic vintage-style
              trading cards. Click on any card to flip it and explore
              professional statistics, career highlights, and personal stories
              of the team working with you.
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
            <h2 className="mb-6 font-bold text-2xl sm:text-3xl md:text-4xl lg:text-5xl">
              <span className="text-gray-700 dark:text-gray-300">
                Professional
              </span>{" "}
              <span className="bg-clip-text bg-gradient-to-r from-brand-primary to-brand-secondary text-transparent">
                Team Cards
              </span>
            </h2>
            <p className="mx-auto max-w-3xl text-gray-600 dark:text-gray-300 text-lg leading-relaxed">
              Experience our team through vintage-style baseball cards featuring
              professional statistics, career achievements, and personal
              stories. Each card showcases the expertise and dedication that
              makes MH Construction a leader in Pacific Northwest construction.
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
                      <h3 className="bg-clip-text bg-gradient-to-r from-brand-primary via-brand-secondary to-brand-accent mb-6 font-black text-transparent text-2xl sm:text-3xl md:text-4xl lg:text-5xl uppercase tracking-wider">
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
                  <h2 className="mb-6 font-bold text-2xl sm:text-3xl md:text-4xl lg:text-5xl">
                    <span className="text-gray-700 dark:text-gray-300">
                      Partnership Life at
                    </span>{" "}
                    <span className="bg-clip-text bg-gradient-to-r from-brand-primary to-brand-secondary text-transparent">
                      MH Construction
                    </span>
                  </h2>
                  <p className="mx-auto max-w-3xl text-gray-700 dark:text-gray-300 text-xl leading-relaxed">
                    "All for one, one for all" isn't just a motto—it's how we
                    partner, grow, and succeed together with our partners.
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
                        partnership team with shared values. Every partner
                        success belongs to all of us.
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
                        We lift each other up, share knowledge freely, and
                        ensure no one faces challenges alone. Your growth is our
                        growth.
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
                        When our partners win, we all win. Celebrating
                        partnership achievements together and learning from
                        setbacks as a unified team.
                      </p>
                    </div>
                  </FadeInWhenVisible>
                </div>

                {/* Culture Highlights */}
                <div className="bg-white dark:bg-gray-800 shadow-lg p-8 rounded-xl">
                  <h3 className="mb-8 font-bold text-xl sm:text-2xl md:text-3xl lg:text-4xl text-center">
                    <span className="text-gray-700 dark:text-gray-300">
                      What Makes Our Partnership
                    </span>{" "}
                    <span className="bg-clip-text bg-gradient-to-r from-brand-primary to-brand-secondary text-transparent">
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
                            Military Precision, Civilian Innovation
                          </h4>
                          <p className="text-gray-600 dark:text-gray-300">
                            Combining disciplined excellence with creative
                            problem-solving
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
                            Continuous Learning
                          </h4>
                          <p className="text-gray-600 dark:text-gray-300">
                            We invest in each other's growth and development
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
                            Open Communication
                          </h4>
                          <p className="text-gray-600 dark:text-gray-300">
                            Every voice matters, from apprentice to owner
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
                            Community Focused
                          </h4>
                          <p className="text-gray-600 dark:text-gray-300">
                            Building stronger communities, one project at a time
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
                            Safety First
                          </h4>
                          <p className="text-gray-600 dark:text-gray-300">
                            Everyone goes home safe, every single day
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
                    job—you're joining a family that believes in your potential
                    and invests in your future."
                  </blockquote>
                  <cite className="font-semibold text-brand-secondary">
                    — Jeremy Thamert, Owner & General Manager
                  </cite>
                </div>
              </div>
            </FadeInWhenVisible>
          </div>

          {/* Call to Action - Careers Link */}
          <div className="mt-20 text-center">
            <FadeInWhenVisible>
              <div className="bg-white dark:bg-gray-800 shadow-xl mx-auto p-8 border border-brand-secondary rounded-lg max-w-2xl">
                <h3 className="mb-4 font-bold text-xl sm:text-2xl md:text-3xl lg:text-4xl">
                  <span className="text-gray-700 dark:text-gray-300">
                    Interested in Joining
                  </span>{" "}
                  <span className="bg-clip-text bg-gradient-to-r from-brand-primary to-brand-secondary text-transparent">
                    Our Partnership Team?
                  </span>
                </h3>
                <p className="mb-6 text-gray-600 dark:text-gray-300">
                  Explore partnership opportunities and learn more about what
                  makes MH Construction a great place to work. View our current
                  openings and discover the benefits of joining our
                  veteran-owned partnership company.
                </p>
                <Link href="/careers">
                  <Button variant="primary" size="lg">
                    View Partnership Opportunities
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
