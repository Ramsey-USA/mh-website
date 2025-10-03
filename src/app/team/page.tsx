'use client'

import React from 'react'
import Link from 'next/link'
import {
  Button,
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  PageHero,
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
      <span className="inline-flex items-center bg-brand-primary/10 dark:bg-brand-primary/20 px-3 py-1 rounded-full font-semibold text-brand-primary dark:text-brand-accent text-xs">
        <MaterialIcon icon="military_tech" size="sm" className="mr-1" />
        Veteran
      </span>
    )
  }

  if (status === 'Civilian Supporter') {
    return (
      <span className="inline-flex items-center bg-brand-accent/10 dark:bg-brand-accent/20 px-3 py-1 rounded-full font-semibold text-brand-accent dark:text-brand-secondary text-xs">
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
    <div className="bg-gradient-to-b from-white dark:from-gray-900 to-gray-50 dark:to-gray-800 min-h-screen">
      <PageHero
        title="Our Team"
        subtitle='"We Work With You" - Leadership Committed to Serving Clients and Communities'
        description="Our people-centered culture starts with leadership committed to excellence, integrity, and partnership in every project"
        icon="groups"
        badge={{
          text: 'Veteran-Owned & Operated',
          icon: 'military_tech',
        }}
      />

      {/* Team Stats */}
      <section className="bg-white dark:bg-gray-900 py-16">
        <div className="mx-auto px-4 container">
          <FadeInWhenVisible>
            <div className="gap-8 grid grid-cols-2 md:grid-cols-4 mx-auto max-w-5xl">
              {teamStats.map((stat, index) => (
                <HoverScale key={index}>
                  <div className="text-center">
                    <MaterialIcon
                      icon={stat.icon}
                      size="3xl"
                      className="mb-4 text-brand-primary"
                    />
                    <div className="mb-2 font-bold text-gray-900 dark:text-white text-4xl">
                      {stat.value}
                    </div>
                    <div className="text-gray-600 dark:text-gray-400">
                      {stat.label}
                    </div>
                  </div>
                </HoverScale>
              ))}
            </div>
          </FadeInWhenVisible>
        </div>
      </section>

      {/* Partnership Philosophy */}
      <section className="bg-gray-50 dark:bg-gray-800 py-16">
        <div className="mx-auto px-4 container">
          <FadeInWhenVisible>
            <div className="mx-auto max-w-4xl">
              <div className="mb-12 text-center">
                <MaterialIcon
                  icon="handshake"
                  size="3xl"
                  className="mb-4 text-brand-primary"
                />
                <h2 className="mb-4 font-bold text-gray-900 dark:text-white text-4xl">
                  "We Work With You" Philosophy
                </h2>
                <p className="text-gray-600 dark:text-gray-300 text-xl">
                  Every team member embodies our core partnership approach
                </p>
              </div>

              <div className="gap-6 grid md:grid-cols-2">
                <Card className="dark:bg-gray-700 hover:shadow-lg dark:border-gray-600 transition-shadow">
                  <CardContent className="p-6">
                    <MaterialIcon
                      icon="chat"
                      size="xl"
                      className="mb-4 text-brand-primary"
                    />
                    <h3 className="mb-3 font-bold text-gray-900 dark:text-white text-xl">
                      Transparent Communication
                    </h3>
                    <p className="text-gray-700 dark:text-gray-300">
                      Open, honest dialogue with clients and team members at
                      every stage
                    </p>
                  </CardContent>
                </Card>

                <Card className="dark:bg-gray-700 hover:shadow-lg dark:border-gray-600 transition-shadow">
                  <CardContent className="p-6">
                    <MaterialIcon
                      icon="psychology"
                      size="xl"
                      className="mb-4 text-brand-primary"
                    />
                    <h3 className="mb-3 font-bold text-gray-900 dark:text-white text-xl">
                      Collaborative Problem-Solving
                    </h3>
                    <p className="text-gray-700 dark:text-gray-300">
                      Working together to find the best solutions for every
                      challenge
                    </p>
                  </CardContent>
                </Card>

                <Card className="dark:bg-gray-700 hover:shadow-lg dark:border-gray-600 transition-shadow">
                  <CardContent className="p-6">
                    <MaterialIcon
                      icon="school"
                      size="xl"
                      className="mb-4 text-brand-primary"
                    />
                    <h3 className="mb-3 font-bold text-gray-900 dark:text-white text-xl">
                      Continuous Learning
                    </h3>
                    <p className="text-gray-700 dark:text-gray-300">
                      Staying current with industry best practices and
                      innovations
                    </p>
                  </CardContent>
                </Card>

                <Card className="dark:bg-gray-700 hover:shadow-lg dark:border-gray-600 transition-shadow">
                  <CardContent className="p-6">
                    <MaterialIcon
                      icon="location_city"
                      size="xl"
                      className="mb-4 text-brand-primary"
                    />
                    <h3 className="mb-3 font-bold text-gray-900 dark:text-white text-xl">
                      Community Focus
                    </h3>
                    <p className="text-gray-700 dark:text-gray-300">
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
          <section key={department} className="bg-white dark:bg-gray-900 py-16">
            <div className="mx-auto px-4 container">
              <FadeInWhenVisible>
                <div className="mx-auto max-w-7xl">
                  <div className="mb-12 text-center">
                    <MaterialIcon
                      icon={info.icon}
                      size="3xl"
                      className="mb-4 text-brand-primary"
                    />
                    <h2 className="mb-4 font-bold text-gray-900 dark:text-white text-4xl">
                      {department}
                    </h2>
                    <p className="mx-auto max-w-3xl text-gray-600 dark:text-gray-300 text-xl">
                      {info.description}
                    </p>
                  </div>

                  <StaggeredFadeIn className="gap-6 grid md:grid-cols-2 lg:grid-cols-3">
                    {members.map((member, index) => (
                      <Card
                        key={index}
                        className="dark:bg-gray-800 hover:shadow-xl dark:border-gray-700 transition-all hover:-translate-y-1"
                      >
                        <CardHeader>
                          <div className="flex justify-between items-start mb-4">
                            <div className="flex justify-center items-center bg-brand-primary/10 dark:bg-brand-primary/20 rounded-full w-16 h-16">
                              <MaterialIcon
                                icon={getRoleIcon(member.role)}
                                size="xl"
                                className="text-brand-primary"
                              />
                            </div>
                            {getVeteranStatusBadge(member.veteranStatus)}
                          </div>
                          <CardTitle className="mb-1 dark:text-white text-xl">
                            {member.name}
                          </CardTitle>
                          <p className="mb-2 font-semibold text-brand-secondary text-sm">
                            {member.role}
                          </p>
                          <p className="text-gray-600 dark:text-gray-400 text-sm">
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
                            <p className="mb-4 text-gray-700 dark:text-gray-300 text-sm">
                              {member.bio}
                            </p>
                          )}

                          {member.specialties &&
                            member.specialties.length > 0 && (
                              <div className="pt-4 dark:border-gray-700 border-t">
                                <p className="mb-2 font-semibold text-gray-900 dark:text-white text-sm">
                                  Specialties:
                                </p>
                                <div className="flex flex-wrap gap-2">
                                  {member.specialties.map(
                                    (specialty, sIndex) => (
                                      <span
                                        key={sIndex}
                                        className="inline-flex items-center bg-brand-accent/10 dark:bg-brand-accent/20 px-2 py-1 rounded-md text-brand-primary dark:text-brand-accent text-xs"
                                      >
                                        <MaterialIcon
                                          icon="star"
                                          size="sm"
                                          className="mr-1 text-brand-accent"
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
      <section className="bg-gradient-to-r from-brand-primary to-brand-primary-dark py-16 text-white">
        <div className="mx-auto px-4 container">
          <FadeInWhenVisible>
            <div className="mx-auto max-w-6xl">
              <div className="mb-12 text-center">
                <MaterialIcon
                  icon="military_tech"
                  size="3xl"
                  className="mb-4 text-brand-secondary"
                />
                <h2 className="mb-4 font-bold text-4xl">
                  Military Values Integration
                </h2>
                <p className="text-brand-accent text-xl">
                  Bringing military precision and discipline to civilian
                  construction excellence
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
                        className="mb-3 text-brand-secondary"
                      />
                      <h3 className="mb-2 font-bold text-white text-lg">
                        {value.title}
                      </h3>
                      <p className="text-brand-accent text-sm">
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
      <section className="bg-gray-50 dark:bg-gray-800 py-16">
        <div className="mx-auto px-4 container">
          <FadeInWhenVisible>
            <div className="mx-auto max-w-5xl">
              <div className="mb-12 text-center">
                <MaterialIcon
                  icon="diversity_3"
                  size="3xl"
                  className="mb-4 text-brand-primary"
                />
                <h2 className="mb-4 font-bold text-gray-900 dark:text-white text-4xl">
                  Team Culture & Values
                </h2>
                <p className="text-gray-600 dark:text-gray-300 text-xl">
                  Building a strong foundation through professional development
                  and safety excellence
                </p>
              </div>

              <div className="gap-8 grid md:grid-cols-3">
                <Card className="dark:bg-gray-700 hover:shadow-lg dark:border-gray-600 transition-shadow">
                  <CardHeader>
                    <MaterialIcon
                      icon="trending_up"
                      size="2xl"
                      className="mb-3 text-brand-primary"
                    />
                    <CardTitle className="dark:text-white">
                      Professional Development
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3 text-gray-700 dark:text-gray-300">
                      <li className="flex items-start">
                        <MaterialIcon
                          icon="check"
                          className="mt-1 mr-2 text-brand-accent"
                          size="sm"
                        />
                        <span>Ongoing training programs</span>
                      </li>
                      <li className="flex items-start">
                        <MaterialIcon
                          icon="check"
                          className="mt-1 mr-2 text-brand-accent"
                          size="sm"
                        />
                        <span>Cross-training opportunities</span>
                      </li>
                      <li className="flex items-start">
                        <MaterialIcon
                          icon="check"
                          className="mt-1 mr-2 text-brand-accent"
                          size="sm"
                        />
                        <span>Leadership development</span>
                      </li>
                      <li className="flex items-start">
                        <MaterialIcon
                          icon="check"
                          className="mt-1 mr-2 text-brand-accent"
                          size="sm"
                        />
                        <span>Industry involvement</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>

                <Card className="dark:bg-gray-700 hover:shadow-lg dark:border-gray-600 transition-shadow">
                  <CardHeader>
                    <MaterialIcon
                      icon="health_and_safety"
                      size="2xl"
                      className="mb-3 text-brand-primary"
                    />
                    <CardTitle className="dark:text-white">
                      Safety Culture
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3 text-gray-700 dark:text-gray-300">
                      <li className="flex items-start">
                        <MaterialIcon
                          icon="check"
                          className="mt-1 mr-2 text-brand-accent"
                          size="sm"
                        />
                        <span>Safety-first mindset</span>
                      </li>
                      <li className="flex items-start">
                        <MaterialIcon
                          icon="check"
                          className="mt-1 mr-2 text-brand-accent"
                          size="sm"
                        />
                        <span>Regular safety training</span>
                      </li>
                      <li className="flex items-start">
                        <MaterialIcon
                          icon="check"
                          className="mt-1 mr-2 text-brand-accent"
                          size="sm"
                        />
                        <span>Quality equipment standards</span>
                      </li>
                      <li className="flex items-start">
                        <MaterialIcon
                          icon="check"
                          className="mt-1 mr-2 text-brand-accent"
                          size="sm"
                        />
                        <span>Proactive hazard prevention</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>

                <Card className="dark:bg-gray-700 hover:shadow-lg dark:border-gray-600 transition-shadow">
                  <CardHeader>
                    <MaterialIcon
                      icon="emoji_events"
                      size="2xl"
                      className="mb-3 text-brand-primary"
                    />
                    <CardTitle className="dark:text-white">
                      Team Performance
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3 text-gray-700 dark:text-gray-300">
                      <li className="flex items-start">
                        <MaterialIcon
                          icon="check"
                          className="mt-1 mr-2 text-brand-accent"
                          size="sm"
                        />
                        <span>98% client satisfaction</span>
                      </li>
                      <li className="flex items-start">
                        <MaterialIcon
                          icon="check"
                          className="mt-1 mr-2 text-brand-accent"
                          size="sm"
                        />
                        <span>High employee retention</span>
                      </li>
                      <li className="flex items-start">
                        <MaterialIcon
                          icon="check"
                          className="mt-1 mr-2 text-brand-accent"
                          size="sm"
                        />
                        <span>Current certifications</span>
                      </li>
                      <li className="flex items-start">
                        <MaterialIcon
                          icon="check"
                          className="mt-1 mr-2 text-brand-accent"
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
      <section className="bg-white dark:bg-gray-900 py-16">
        <div className="mx-auto px-4 container">
          <FadeInWhenVisible>
            <div className="mx-auto max-w-3xl text-center">
              <MaterialIcon
                icon="construction"
                size="4xl"
                className="mb-6 text-brand-primary"
              />
              <h2 className="mb-6 font-bold text-gray-900 dark:text-white text-4xl">
                Work With Our Team
              </h2>
              <p className="mb-8 text-gray-700 dark:text-gray-300 text-xl">
                Partner with experienced professionals who are committed to your
                success and our community's future
              </p>
              <div className="flex sm:flex-row flex-col justify-center gap-4">
                <Link href="/contact">
                  <Button
                    size="lg"
                    className="bg-brand-primary hover:bg-brand-primary-dark text-white dark:text-white"
                  >
                    <MaterialIcon icon="phone" className="mr-2" size="md" />
                    Contact Our Team
                  </Button>
                </Link>
                <Link href="/services">
                  <Button
                    size="lg"
                    variant="outline"
                    className="hover:bg-brand-primary/5 dark:hover:bg-brand-primary/10 border-brand-primary dark:border-brand-accent text-brand-primary dark:text-brand-accent"
                  >
                    <MaterialIcon icon="build" className="mr-2" size="md" />
                    View Our Services
                  </Button>
                </Link>
              </div>
              <p className="mt-6 text-gray-600 dark:text-gray-400">
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
