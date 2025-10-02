'use client'

import React from 'react'
import Link from 'next/link'
import {
  Button,
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from '../../components/ui'
import { MaterialIcon } from '../../components/icons/MaterialIcon'
import {
  FadeInWhenVisible,
  StaggeredFadeIn,
  HoverScale,
} from '../../components/animations/FramerMotionComponents'
import { teamMembers, type TeamMember } from '../../lib/data/team'

// Group team members by department
const departmentGroups = {
  'Executive Leadership': {
    icon: 'workspace_premium',
    description:
      "Strategic vision and leadership guiding MH Construction's mission and values",
  },
  'Project Management & Estimating': {
    icon: 'assignment',
    description:
      'Expert coordination, planning, and cost analysis for successful project execution',
  },
  'Site & Field Operations': {
    icon: 'engineering',
    description:
      'Hands-on leadership ensuring quality, safety, and efficiency on every job site',
  },
  'Administration & Support': {
    icon: 'support_agent',
    description:
      'Essential support services keeping operations running smoothly',
  },
}

// Team stats
const teamStats = [
  { icon: 'groups', value: '150+', label: 'Years Combined Experience' },
  { icon: 'military_tech', value: 'Veteran', label: 'Owned & Operated' },
  { icon: 'star', value: '98%', label: 'Client Satisfaction' },
  { icon: 'workspace_premium', value: '14+', label: 'Team Members' },
]

// Military values
const militaryValues = [
  {
    icon: 'shield',
    title: 'Discipline',
    description: 'Structured processes and attention to detail',
  },
  {
    icon: 'people',
    title: 'Leadership',
    description: 'Clear command structure with accountability',
  },
  {
    icon: 'favorite',
    title: 'Service',
    description: 'Commitment to serving clients and community',
  },
  {
    icon: 'stars',
    title: 'Excellence',
    description: 'Striving for the highest standards in all work',
  },
  {
    icon: 'verified',
    title: 'Integrity',
    description: 'Honest, transparent business practices',
  },
]

// Get role icon based on role
function getRoleIcon(role: string): string {
  if (role.includes('Owner') || role.includes('General Manager'))
    return 'account_balance'
  if (role.includes('Founder')) return 'foundation'
  if (role.includes('Vice President')) return 'business_center'
  if (role.includes('Project Manager')) return 'assignment_ind'
  if (role.includes('Estimator')) return 'calculate'
  if (role.includes('Superintendent')) return 'construction'
  if (role.includes('Accountant')) return 'account_balance_wallet'
  if (role.includes('HR')) return 'people'
  if (role.includes('Marketing')) return 'campaign'
  if (role.includes('Administrative')) return 'admin_panel_settings'
  if (role.includes('Expert')) return 'handyman'
  return 'person'
}

// Get veteran status badge
function getVeteranStatusBadge(status?: string) {
  if (!status) return null

  if (status === 'Veteran') {
    return (
      <span className="inline-flex items-center bg-green-100 px-3 py-1 rounded-full font-semibold text-[#2d5240] text-xs">
        <MaterialIcon icon="military_tech" size="sm" className="mr-1" />
        Veteran
      </span>
    )
  }

  if (status === 'Civilian Supporter') {
    return (
      <span className="inline-flex items-center bg-green-100 px-3 py-1 rounded-full font-semibold text-green-800 text-xs">
        <MaterialIcon icon="favorite" size="sm" className="mr-1" />
        Civilian Supporter
      </span>
    )
  }

  return null
}

export default function TeamPage() {
  // Group team members by department
  const groupedTeam = teamMembers.reduce((acc, member) => {
    if (!acc[member.department]) {
      acc[member.department] = []
    }
    acc[member.department].push(member)
    return acc
  }, {} as Record<string, TeamMember[]>)

  return (
    <div className="bg-gradient-to-b from-white to-gray-50 min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-[#2d5240] via-[#386851] to-[#4a7a63] py-20 text-white">
        <div className="mx-auto px-4 container">
          <FadeInWhenVisible>
            <div className="mx-auto max-w-4xl text-center">
              <MaterialIcon
                icon="groups"
                size="4xl"
                className="mb-6 text-green-200"
              />
              <h1 className="mb-6 font-bold text-5xl md:text-6xl">Our Team</h1>
              <p className="mb-8 text-green-100 text-xl md:text-2xl">
                "We Work With You" - Leadership Committed to Serving Clients and
                Communities
              </p>
              <p className="text-green-50 text-lg">
                Our people-centered culture starts with leadership committed to
                excellence, integrity, and partnership
              </p>
            </div>
          </FadeInWhenVisible>
        </div>
      </section>

      {/* Team Stats */}
      <section className="bg-white py-16">
        <div className="mx-auto px-4 container">
          <FadeInWhenVisible>
            <div className="gap-8 grid grid-cols-2 md:grid-cols-4 mx-auto max-w-5xl">
              {teamStats.map((stat, index) => (
                <HoverScale key={index}>
                  <div className="text-center">
                    <MaterialIcon
                      icon={stat.icon}
                      size="3xl"
                      className="mb-4 text-[#386851]"
                    />
                    <div className="mb-2 font-bold text-gray-900 text-4xl">
                      {stat.value}
                    </div>
                    <div className="text-gray-600">{stat.label}</div>
                  </div>
                </HoverScale>
              ))}
            </div>
          </FadeInWhenVisible>
        </div>
      </section>

      {/* Partnership Philosophy */}
      <section className="bg-gray-50 py-16">
        <div className="mx-auto px-4 container">
          <FadeInWhenVisible>
            <div className="mx-auto max-w-4xl">
              <div className="mb-12 text-center">
                <MaterialIcon
                  icon="handshake"
                  size="3xl"
                  className="mb-4 text-[#386851]"
                />
                <h2 className="mb-4 font-bold text-gray-900 text-4xl">
                  "We Work With You" Philosophy
                </h2>
                <p className="text-gray-600 text-xl">
                  Every team member embodies our core partnership approach
                </p>
              </div>

              <div className="gap-6 grid md:grid-cols-2">
                <Card className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <MaterialIcon
                      icon="chat"
                      size="xl"
                      className="mb-4 text-[#386851]"
                    />
                    <h3 className="mb-3 font-bold text-gray-900 text-xl">
                      Transparent Communication
                    </h3>
                    <p className="text-gray-700">
                      Open, honest dialogue with clients and team members at
                      every stage
                    </p>
                  </CardContent>
                </Card>

                <Card className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <MaterialIcon
                      icon="psychology"
                      size="xl"
                      className="mb-4 text-[#386851]"
                    />
                    <h3 className="mb-3 font-bold text-gray-900 text-xl">
                      Collaborative Problem-Solving
                    </h3>
                    <p className="text-gray-700">
                      Working together to find the best solutions for every
                      challenge
                    </p>
                  </CardContent>
                </Card>

                <Card className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <MaterialIcon
                      icon="school"
                      size="xl"
                      className="mb-4 text-[#386851]"
                    />
                    <h3 className="mb-3 font-bold text-gray-900 text-xl">
                      Continuous Learning
                    </h3>
                    <p className="text-gray-700">
                      Staying current with industry best practices and
                      innovations
                    </p>
                  </CardContent>
                </Card>

                <Card className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <MaterialIcon
                      icon="location_city"
                      size="xl"
                      className="mb-4 text-[#386851]"
                    />
                    <h3 className="mb-3 font-bold text-gray-900 text-xl">
                      Community Focus
                    </h3>
                    <p className="text-gray-700">
                      Understanding that every project serves the broader
                      community
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </FadeInWhenVisible>
        </div>
      </section>

      {/* Team Members by Department */}
      {Object.entries(departmentGroups).map(([department, info]) => {
        const members = groupedTeam[department] || []
        if (members.length === 0) return null

        return (
          <section key={department} className="bg-white py-16">
            <div className="mx-auto px-4 container">
              <FadeInWhenVisible>
                <div className="mx-auto max-w-7xl">
                  <div className="mb-12 text-center">
                    <MaterialIcon
                      icon={info.icon}
                      size="3xl"
                      className="mb-4 text-[#386851]"
                    />
                    <h2 className="mb-4 font-bold text-gray-900 text-4xl">
                      {department}
                    </h2>
                    <p className="mx-auto max-w-3xl text-gray-600 text-xl">
                      {info.description}
                    </p>
                  </div>

                  <StaggeredFadeIn className="gap-6 grid md:grid-cols-2 lg:grid-cols-3">
                    {members.map((member, index) => (
                      <Card
                        key={index}
                        className="hover:shadow-xl transition-all hover:-translate-y-1"
                      >
                        <CardHeader>
                          <div className="flex justify-between items-start mb-4">
                            <div className="flex justify-center items-center bg-green-100 rounded-full w-16 h-16">
                              <MaterialIcon
                                icon={getRoleIcon(member.role)}
                                size="xl"
                                className="text-[#386851]"
                              />
                            </div>
                            {getVeteranStatusBadge(member.veteranStatus)}
                          </div>
                          <CardTitle className="mb-1 text-xl">
                            {member.name}
                          </CardTitle>
                          <p className="mb-2 font-semibold text-blue-600 text-sm">
                            {member.role}
                          </p>
                          <p className="text-gray-600 text-sm">
                            <MaterialIcon
                              icon="schedule"
                              size="sm"
                              className="inline mr-1"
                            />
                            {typeof member.experienceYears === 'number'
                              ? `${member.experienceYears}+`
                              : member.experienceYears}{' '}
                            years experience
                          </p>
                        </CardHeader>
                        <CardContent>
                          {member.bio && (
                            <p className="mb-4 text-gray-700 text-sm">
                              {member.bio}
                            </p>
                          )}

                          {member.specialties &&
                            member.specialties.length > 0 && (
                              <div className="pt-4 border-t">
                                <p className="mb-2 font-semibold text-gray-900 text-sm">
                                  Specialties:
                                </p>
                                <div className="flex flex-wrap gap-2">
                                  {member.specialties.map(
                                    (specialty, sIndex) => (
                                      <span
                                        key={sIndex}
                                        className="inline-flex items-center bg-gray-100 px-2 py-1 rounded-md text-gray-700 text-xs"
                                      >
                                        <MaterialIcon
                                          icon="star"
                                          size="sm"
                                          className="mr-1 text-gray-500"
                                        />
                                        {specialty}
                                      </span>
                                    )
                                  )}
                                </div>
                              </div>
                            )}
                        </CardContent>
                      </Card>
                    ))}
                  </StaggeredFadeIn>
                </div>
              </FadeInWhenVisible>
            </div>
          </section>
        )
      })}

      {/* Military Values Section */}
      <section className="bg-gradient-to-r from-[#386851] to-[#2d5240] py-16 text-white">
        <div className="mx-auto px-4 container">
          <FadeInWhenVisible>
            <div className="mx-auto max-w-6xl">
              <div className="mb-12 text-center">
                <MaterialIcon
                  icon="military_tech"
                  size="3xl"
                  className="mb-4 text-green-200"
                />
                <h2 className="mb-4 font-bold text-4xl">
                  Military Values Integration
                </h2>
                <p className="text-green-100 text-xl">
                  Bringing military precision and discipline to civilian
                  construction
                </p>
              </div>

              <div className="gap-6 grid md:grid-cols-3 lg:grid-cols-5">
                {militaryValues.map((value, index) => (
                  <Card
                    key={index}
                    className="bg-white/10 hover:bg-white/20 backdrop-blur-sm border-white/20 transition-all"
                  >
                    <CardContent className="p-6 text-center">
                      <MaterialIcon
                        icon={value.icon}
                        size="2xl"
                        className="mb-3 text-green-200"
                      />
                      <h3 className="mb-2 font-bold text-white text-lg">
                        {value.title}
                      </h3>
                      <p className="text-green-100 text-sm">
                        {value.description}
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </FadeInWhenVisible>
        </div>
      </section>

      {/* Team Culture Section */}
      <section className="bg-gray-50 py-16">
        <div className="mx-auto px-4 container">
          <FadeInWhenVisible>
            <div className="mx-auto max-w-5xl">
              <div className="mb-12 text-center">
                <MaterialIcon
                  icon="diversity_3"
                  size="3xl"
                  className="mb-4 text-[#386851]"
                />
                <h2 className="mb-4 font-bold text-gray-900 text-4xl">
                  Team Culture & Values
                </h2>
                <p className="text-gray-600 text-xl">
                  Building a strong foundation through professional development
                  and safety
                </p>
              </div>

              <div className="gap-8 grid md:grid-cols-3">
                <Card className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <MaterialIcon
                      icon="trending_up"
                      size="2xl"
                      className="mb-3 text-[#386851]"
                    />
                    <CardTitle>Professional Development</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3 text-gray-700">
                      <li className="flex items-start">
                        <MaterialIcon
                          icon="check"
                          className="mt-1 mr-2 text-green-500"
                          size="sm"
                        />
                        <span>Ongoing training programs</span>
                      </li>
                      <li className="flex items-start">
                        <MaterialIcon
                          icon="check"
                          className="mt-1 mr-2 text-green-500"
                          size="sm"
                        />
                        <span>Cross-training opportunities</span>
                      </li>
                      <li className="flex items-start">
                        <MaterialIcon
                          icon="check"
                          className="mt-1 mr-2 text-green-500"
                          size="sm"
                        />
                        <span>Leadership development</span>
                      </li>
                      <li className="flex items-start">
                        <MaterialIcon
                          icon="check"
                          className="mt-1 mr-2 text-green-500"
                          size="sm"
                        />
                        <span>Industry involvement</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>

                <Card className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <MaterialIcon
                      icon="health_and_safety"
                      size="2xl"
                      className="mb-3 text-[#386851]"
                    />
                    <CardTitle>Safety Culture</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3 text-gray-700">
                      <li className="flex items-start">
                        <MaterialIcon
                          icon="check"
                          className="mt-1 mr-2 text-green-500"
                          size="sm"
                        />
                        <span>Safety-first mindset</span>
                      </li>
                      <li className="flex items-start">
                        <MaterialIcon
                          icon="check"
                          className="mt-1 mr-2 text-green-500"
                          size="sm"
                        />
                        <span>Regular safety training</span>
                      </li>
                      <li className="flex items-start">
                        <MaterialIcon
                          icon="check"
                          className="mt-1 mr-2 text-green-500"
                          size="sm"
                        />
                        <span>Quality equipment standards</span>
                      </li>
                      <li className="flex items-start">
                        <MaterialIcon
                          icon="check"
                          className="mt-1 mr-2 text-green-500"
                          size="sm"
                        />
                        <span>Proactive hazard prevention</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>

                <Card className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <MaterialIcon
                      icon="emoji_events"
                      size="2xl"
                      className="mb-3 text-[#386851]"
                    />
                    <CardTitle>Team Performance</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3 text-gray-700">
                      <li className="flex items-start">
                        <MaterialIcon
                          icon="check"
                          className="mt-1 mr-2 text-green-500"
                          size="sm"
                        />
                        <span>98% client satisfaction</span>
                      </li>
                      <li className="flex items-start">
                        <MaterialIcon
                          icon="check"
                          className="mt-1 mr-2 text-green-500"
                          size="sm"
                        />
                        <span>High employee retention</span>
                      </li>
                      <li className="flex items-start">
                        <MaterialIcon
                          icon="check"
                          className="mt-1 mr-2 text-green-500"
                          size="sm"
                        />
                        <span>Current certifications</span>
                      </li>
                      <li className="flex items-start">
                        <MaterialIcon
                          icon="check"
                          className="mt-1 mr-2 text-green-500"
                          size="sm"
                        />
                        <span>Community involvement</span>
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
      <section className="bg-white py-16">
        <div className="mx-auto px-4 container">
          <FadeInWhenVisible>
            <div className="mx-auto max-w-3xl text-center">
              <MaterialIcon
                icon="construction"
                size="4xl"
                className="mb-6 text-[#386851]"
              />
              <h2 className="mb-6 font-bold text-gray-900 text-4xl">
                Work With Our Team
              </h2>
              <p className="mb-8 text-gray-700 text-xl">
                Partner with experienced professionals who are committed to your
                success and our community's future
              </p>
              <div className="flex sm:flex-row flex-col justify-center gap-4">
                <Link href="/contact">
                  <Button
                    size="lg"
                    className="bg-blue-600 hover:bg-blue-700 text-white"
                  >
                    <MaterialIcon icon="phone" className="mr-2" size="md" />
                    Contact Our Team
                  </Button>
                </Link>
                <Link href="/services">
                  <Button
                    size="lg"
                    variant="outline"
                    className="hover:bg-green-50 border-[#386851] text-blue-600"
                  >
                    <MaterialIcon icon="build" className="mr-2" size="md" />
                    View Our Services
                  </Button>
                </Link>
              </div>
              <p className="mt-6 text-gray-600">
                <MaterialIcon icon="phone" className="inline mr-2" size="md" />
                (509) 308-6489 | 3111 N. Capital Ave., Pasco, WA 99301
              </p>
            </div>
          </FadeInWhenVisible>
        </div>
      </section>
    </div>
  )
}
