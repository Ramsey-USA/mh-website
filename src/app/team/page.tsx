'use client'

import React from 'react'
import Link from 'next/link'
import { PageHero } from '../../components/ui'
import { BaseballCard } from '../../components/ui/BaseballCard'
import {
  FadeInWhenVisible,
  StaggeredFadeIn,
} from '../../components/animations/FramerMotionComponents'
import { teamMembers, type TeamMember } from '../../lib/data/team'

// Add Trigger the mascot to leadership team
const triggerMascot: TeamMember = {
  name: 'Trigger',
  role: 'Chief Morale Officer',
  department: 'Executive Leadership',
  experienceYears: 'Good Boy',
  specialties: ['Tail Wagging', 'Treat Evaluation', 'Security Patrol', 'Team Spirit'],
  bio: 'Trigger is our beloved company mascot who keeps everyone in high spirits and ensures the highest standards of workplace happiness. Always ready with a friendly wag and expert treat quality control.',
  slug: 'trigger-mascot',
  active: true,
  avatar: '/images/team/trigger.jpg'
}

// Combine team members with mascot, placing Trigger with leadership
const allTeamMembers = [...teamMembers]
const leadershipMembers = allTeamMembers.filter(member => member.department === 'Executive Leadership')
const otherMembers = allTeamMembers.filter(member => member.department !== 'Executive Leadership')

// Add Trigger to leadership team
const teamWithMascot = [...leadershipMembers, triggerMascot, ...otherMembers]

// Group team members by department
function groupByDepartment(members: TeamMember[]) {
  return members.reduce((acc, member) => {
    const dept = member.department
    if (!acc[dept]) {
      acc[dept] = []
    }
    acc[dept].push(member)
    return acc
  }, {} as Record<string, TeamMember[]>)
}

export default function TeamPage() {
  const membersByDepartment = groupByDepartment(teamWithMascot)
  
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
        subtitle="Meet the experienced professionals dedicated to excellence in construction"
        description="Click on any team member card to flip it and learn more about their background, experience, and specialties."
      />

      <div className="bg-gray-50 py-16">
        <div className="mx-auto px-4 max-w-7xl">
          <div className="mb-12 text-center">
            <h2 className="mb-4 font-bold text-gray-900 text-4xl">
              Our Professional Team
            </h2>
            <p className="mx-auto max-w-3xl text-gray-600 text-lg">
              Click on any team member card to flip it and learn more about
              their background, experience, and specialties. Our diverse team
              brings decades of construction expertise to every project.
            </p>
          </div>

          {/* Team Members by Department */}
          <div className="space-y-24">
            {departmentOrder.map((department) => {
              const members = membersByDepartment[department]
              if (!members || members.length === 0) return null

              return (
                <FadeInWhenVisible key={department}>
                  <div className="relative">
                    {/* Department Header */}
                    <div className="mb-16 text-center">
                      <div className="inline-block bg-brand-primary mb-6 px-8 py-3 rounded-full">
                        <h3 className="font-black text-white text-2xl uppercase tracking-wide">
                          {department}
                        </h3>
                      </div>
                      <div className="bg-brand-accent mx-auto rounded-full w-32 h-1"></div>
                    </div>
                    
                    {/* Team Members Grid */}
                    <div className="justify-items-center gap-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                      {members.map((member, index) => (
                        <div key={member.name + index} className="w-full max-w-md hover:scale-[1.02] transition-transform duration-300 transform">
                          <BaseballCard member={member} />
                        </div>
                      ))}
                    </div>
                  </div>
                </FadeInWhenVisible>
              )
            })}
          </div>

          {/* Call to Action */}
          <div className="mt-16 text-center">
            <FadeInWhenVisible>
              <div className="bg-white shadow-lg mx-auto p-8 rounded-lg max-w-2xl">
                <h3 className="mb-4 font-bold text-gray-900 text-2xl">
                  Ready to Work with Our Team?
                </h3>
                <p className="mb-6 text-gray-600">
                  Our experienced professionals are ready to bring your
                  construction project to life. Contact us today to get started.
                </p>
                <Link
                  href="/contact"
                  className="inline-flex items-center bg-brand-primary hover:bg-brand-primary-dark px-6 py-3 rounded-lg font-semibold text-white transition-colors duration-200"
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
