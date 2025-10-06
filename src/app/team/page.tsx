'use client'

import React from 'react'
import Link from 'next/link'
import { PageHero } from '../../components/ui'
import { VintageBaseballCard } from '../../components/ui/VintageBaseballCard'
import {
  FadeInWhenVisible,
  StaggeredFadeIn,
} from '../../components/animations/FramerMotionComponents'
import {
  vintageTeamMembers,
  type VintageTeamMember,
} from '../../lib/data/vintage-team'
import '../../styles/vintage-baseball-card.css'

// Group team members by department
function groupByDepartment(members: VintageTeamMember[]) {
  return members.reduce((acc, member) => {
    const dept = member.department
    if (!acc[dept]) {
      acc[dept] = []
    }
    acc[dept].push(member)
    return acc
  }, {} as Record<string, VintageTeamMember[]>)
}

export default function TeamPage() {
  const membersByDepartment = groupByDepartment(vintageTeamMembers)

  // Define department order matching the actual data
  const departmentOrder = [
    'Executive Leadership',
    'Project Management & Estimating',
    'Site & Field Operations',
    'Administration & Support',
  ]

  return (
    <div className="bg-gray-50 min-h-screen">
      <PageHero
        title="Our Team"
        subtitle="Meet the professionals behind MH Construction"
        description="Discover our team through authentic vintage-style trading cards. Click on any card to flip it and explore professional statistics, career highlights, and personal stories."
      />

      <div className="bg-gray-50 py-16">
        <div className="mx-auto px-4 max-w-7xl">
          <div className="mb-16 text-center">
            <h2 className="mb-6 font-bold text-gray-900 text-4xl">
              Professional Team Cards
            </h2>
            <p className="mx-auto max-w-3xl text-gray-600 text-lg leading-relaxed">
              Experience our team through vintage-style baseball cards featuring
              professional statistics, career achievements, and personal
              stories. Each card showcases the expertise and dedication that
              makes MH Construction a leader in Pacific Northwest construction.
            </p>
          </div>

          {/* Team Members by Department */}
          <div className="space-y-24">
            {departmentOrder.map(department => {
              const members = membersByDepartment[department]
              if (!members || members.length === 0) return null

              return (
                <FadeInWhenVisible key={department}>
                  <div className="relative">
                    {/* Vintage-styled department header */}
                    <div className="mb-16 text-center">
                      <div className="inline-block bg-gradient-to-r from-amber-800 to-amber-600 shadow-lg mb-6 px-12 py-4 rounded-lg">
                        <h3 className="font-black text-white text-2xl uppercase tracking-wider">
                          {department}
                        </h3>
                      </div>
                      <div className="bg-gradient-to-r from-transparent via-amber-400 to-transparent mx-auto rounded-full w-48 h-1"></div>
                    </div>

                    {/* Vintage cards grid */}
                    <div className="justify-items-center gap-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                      {members.map(member => (
                        <div
                          key={member.cardNumber}
                          className="hover:scale-[1.02] transition-transform duration-300 transform"
                        >
                          <VintageBaseballCard member={member} />
                        </div>
                      ))}
                    </div>
                  </div>
                </FadeInWhenVisible>
              )
            })}
          </div>

          {/* Call to Action */}
          <div className="mt-20 text-center">
            <FadeInWhenVisible>
              <div className="bg-white shadow-xl mx-auto p-8 border border-amber-200 rounded-lg max-w-2xl">
                <h3 className="mb-4 font-bold text-gray-900 text-2xl">
                  Ready to Work with Our Championship Team?
                </h3>
                <p className="mb-6 text-gray-600">
                  Our experienced professionals are ready to bring your
                  construction project to life. Contact us today to get started
                  with a team that delivers results.
                </p>
                <Link
                  href="/contact"
                  className="inline-flex items-center bg-gradient-to-r from-amber-600 hover:from-amber-700 to-amber-700 hover:to-amber-800 shadow-lg px-8 py-3 rounded-lg font-semibold text-white transition-all duration-200"
                >
                  Contact Our Team
                </Link>
              </div>
            </FadeInWhenVisible>
          </div>
        </div>
      </div>
    </div>
  )
}
