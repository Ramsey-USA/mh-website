'use client'

import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Button, Card, CardContent } from '../../components/ui'
import {
  generateSEOMetadata,
  generateOrganizationStructuredData,
  StructuredData,
} from '../../components/seo/seo-meta'
import {
  WPZoomShieldIcon as ShieldIcon,
  WPZoomStarIcon as StarIcon,
  WPZoomHammerIcon as HammerIcon,
  WPZoomCheckIcon as CheckIcon,
  WPZoomUserIcon as UserIcon,
  WPZoomBoltIcon as BoltIcon,
} from '../../components/icons/WPZoomIcons'
import {
  FadeInWhenVisible,
  StaggeredFadeIn,
  HoverScale,
} from '../../components/animations/FramerMotionComponents'

import { teamMembers } from '../../lib/data/team'

export default function AboutPage() {
  // teamMembers now sourced from centralized data file (src/lib/data/team.ts)
  // Each item should eventually include: name, role/title, veteran/military status, experience,
  // specialties, description/bio, avatar or image.

  const companyValues = [
    {
      icon: ShieldIcon,
      title: 'Military Precision',
      description:
        'Every project executed with the same attention to detail and excellence we learned in the military.',
      color: 'from-blue-500 to-blue-600',
    },
    {
      icon: CheckIcon,
      title: 'Unwavering Integrity',
      description:
        'Honest communication, transparent pricing, and doing what we say we will do.',
      color: 'from-green-500 to-green-600',
    },
    {
      icon: HammerIcon,
      title: 'Quality Craftsmanship',
      description:
        'Built to last with pride in every detail, just like the values instilled in military service.',
      color: 'from-brand-primary to-brand-primary-light',
    },
    {
      icon: UserIcon,
      title: 'Service Above Self',
      description:
        'We serve our community and clients with the same dedication we served our country.',
      color: 'from-purple-500 to-purple-600',
    },
    {
      icon: BoltIcon,
      title: 'Innovation & Technology',
      description:
        'Embracing cutting-edge technology to deliver superior results and experiences.',
      color: 'from-yellow-500 to-yellow-600',
    },
    {
      icon: StarIcon,
      title: 'Excellence in Everything',
      description:
        'No mission too small, no challenge too great. We bring our A-game to every project.',
      color: 'from-red-500 to-red-600',
    },
  ]

  const milestones = [
    {
      year: '2018',
      title: 'Company Founded',
      description:
        'Michael Harrison starts MH Construction with a mission to bring military excellence to civilian construction.',
    },
    {
      year: '2019',
      title: 'First Major Project',
      description:
        'Completed our first major commercial renovation, establishing our reputation for quality.',
    },
    {
      year: '2021',
      title: 'Team Expansion',
      description:
        'Grew to a team of 12 veterans and military spouses, maintaining our commitment to veteran employment.',
    },
    {
      year: '2023',
      title: 'AI Innovation',
      description:
        'Launched our AI-powered estimation system, revolutionizing how we serve clients.',
    },
    {
      year: '2024',
      title: 'Wounded Warrior Partnership',
      description:
        'Partnered with Wounded Warrior Project to provide specialized construction services.',
    },
    {
      year: '2025',
      title: 'Pacific Northwest Leader',
      description:
        'Recognized as a leading veteran-owned construction company serving the entire Pacific Northwest.',
    },
  ]

  return (
    <>
      {/* SEO Structured Data */}
      <StructuredData data={generateOrganizationStructuredData()} />

      {/* Hero Section */}
      <section className="relative bg-white dark:bg-gray-900 h-screen hero-section">
        {/* Background Elements */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50/30 dark:from-blue-900/10 to-transparent"></div>
        <div className="top-20 right-20 absolute bg-brand-primary/5 blur-3xl rounded-full w-32 h-32"></div>
        <div className="bottom-20 left-20 absolute bg-veteran-blue/5 blur-3xl rounded-full w-40 h-40"></div>

        <div className="z-10 relative flex justify-center items-center mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-8 max-w-7xl h-full">
          <FadeInWhenVisible className="w-full text-center">
            {/* Hero Badge */}
            <div className="inline-flex items-center bg-veteran-blue/10 dark:bg-veteran-blue/20 shadow-lg backdrop-blur-sm mb-8 px-6 py-3 border border-veteran-blue/20 dark:border-veteran-blue/30 rounded-full">
              <ShieldIcon
                size="sm"
                color="currentColor"
                className="text-veteran-blue dark:text-veteran-blue-light"
              />
              <span className="ml-3 font-bold text-veteran-blue dark:text-veteran-blue-light text-xs uppercase tracking-wider">
                Our Story & Mission
              </span>
            </div>

            {/* Hero Title */}
            <h1 className="mb-6 pb-2 font-black text-gray-900 dark:text-white text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl leading-relaxed tracking-tighter hero-title">
              <span className="block mb-3 font-semibold text-gray-700 dark:text-gray-300 text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl tracking-tight">
                Built by Veterans
              </span>
              <span className="block bg-clip-text bg-gradient-to-r from-veteran-blue via-brand-primary to-veteran-blue drop-shadow-sm font-black text-transparent">
                For Our Community
              </span>
            </h1>

            {/* Hero Description */}
            <p className="mx-auto mb-8 max-w-4xl font-light text-gray-600 dark:text-gray-300 text-xl sm:text-2xl md:text-3xl lg:text-4xl leading-relaxed tracking-wide">
              From military service to{' '}
              <span className="font-medium text-gray-800 dark:text-gray-200">
                construction excellence
              </span>
              . Discover the story behind{' '}
              <span className="bg-clip-text bg-gradient-to-r from-brand-secondary to-brand-primary font-semibold text-transparent">
                Pacific Northwest's premier veteran-owned construction company
              </span>
              .
            </p>

            {/* CTA Buttons */}
            <div className="flex sm:flex-row flex-col justify-center items-center gap-8 mb-8">
              <Link href="/contact">
                <HoverScale>
                  <Button variant="primary" size="xl" className="shadow-xl">
                    <UserIcon size="sm" color="currentColor" className="mr-3" />
                    <span className="z-10 relative tracking-wide">
                      Meet Our Team
                    </span>
                  </Button>
                </HoverScale>
              </Link>
              <Link href="/portfolio">
                <HoverScale>
                  <Button variant="outline" size="xl" className="shadow-xl">
                    <HammerIcon
                      size="sm"
                      color="currentColor"
                      className="mr-3"
                    />
                    <span className="z-10 relative tracking-wide">
                      View Our Work
                    </span>
                  </Button>
                </HoverScale>
              </Link>
            </div>

            {/* Trust Indicators */}
            <StaggeredFadeIn className="flex flex-wrap justify-center items-center gap-10 font-medium text-gray-700 dark:text-gray-300 text-base">
              {[
                'Veteran-Owned & Operated',
                '500+ Projects Completed',
                'Licensed & Insured',
                'Wounded Warrior Partner',
              ].map((indicator, index) => (
                <div
                  key={index}
                  className="flex items-center bg-white/10 dark:bg-gray-800/30 backdrop-blur-sm px-4 py-2 border border-gray-200/20 dark:border-gray-700/30 rounded-full"
                >
                  <CheckIcon
                    size="sm"
                    color="currentColor"
                    className="mr-3 text-green-600 dark:text-green-400"
                  />
                  <span className="tracking-wide">{indicator}</span>
                </div>
              ))}
            </StaggeredFadeIn>
          </FadeInWhenVisible>
        </div>
      </section>

      {/* Company Story Section */}
      <section className="relative bg-white dark:bg-gray-900 py-20 lg:py-32 xl:py-40 story-section">
        <div className="absolute inset-0 bg-gradient-to-b from-gray-50/50 dark:from-gray-800/30 to-transparent"></div>
        <div className="top-20 right-20 absolute bg-brand-secondary/5 blur-3xl rounded-full w-32 h-32"></div>

        <div className="relative mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <FadeInWhenVisible className="mb-24 lg:mb-32 text-center">
            <div className="inline-flex items-center bg-brand-primary/10 dark:bg-brand-primary/20 shadow-lg mb-10 px-8 py-4 border border-brand-primary/20 rounded-full">
              <StarIcon size="md" color="var(--brand-primary)" />
              <span className="ml-4 font-black text-brand-primary text-sm uppercase tracking-wider">
                Our Foundation
              </span>
            </div>

            <h2 className="mb-10 font-black text-gray-900 dark:text-gray-100 text-5xl sm:text-6xl md:text-7xl lg:text-8xl leading-tight tracking-tighter">
              <span className="block mb-4 font-semibold text-gray-700 dark:text-gray-300 text-3xl sm:text-4xl md:text-5xl lg:text-6xl tracking-tight">
                From Service to
              </span>
              <span className="block bg-clip-text bg-gradient-to-r from-brand-primary via-brand-secondary to-brand-primary drop-shadow-sm font-black text-transparent">
                Construction Excellence
              </span>
            </h2>
          </FadeInWhenVisible>

          <div className="items-center gap-16 grid grid-cols-1 lg:grid-cols-2">
            {/* Story Content */}
            <FadeInWhenVisible>
              <div className="space-y-8">
                <div className="bg-gradient-to-br from-veteran-blue/5 to-brand-primary/5 p-8 border border-veteran-blue/10 rounded-2xl">
                  <h3 className="mb-6 font-bold text-veteran-blue text-2xl">
                    🎖️ Founded on Military Values
                  </h3>
                  <p className="mb-6 text-gray-700 dark:text-gray-300 text-lg leading-relaxed">
                    MH Construction was born from a simple belief: the same
                    dedication, precision, and integrity that made us successful
                    in military service could revolutionize the construction
                    industry.
                  </p>
                  <p className="text-gray-700 dark:text-gray-300 text-lg leading-relaxed">
                    Founded in 2018 by Army veteran Michael Harrison, we've
                    grown from a one-person operation to a team of skilled
                    veterans and military spouses, all united by our commitment
                    to excellence and service.
                  </p>
                </div>

                <div className="bg-gradient-to-br from-brand-primary/5 to-brand-secondary/5 p-8 border border-brand-primary/10 rounded-2xl">
                  <h3 className="mb-6 font-bold text-brand-primary text-2xl">
                    🚀 Innovation Meets Tradition
                  </h3>
                  <p className="mb-6 text-gray-700 dark:text-gray-300 text-lg leading-relaxed">
                    We blend time-tested construction techniques with
                    cutting-edge technology, including our proprietary
                    AI-powered estimation system that provides unprecedented
                    accuracy and speed.
                  </p>
                  <p className="text-gray-700 dark:text-gray-300 text-lg leading-relaxed">
                    This unique combination allows us to deliver superior
                    results while maintaining the transparency and reliability
                    our clients deserve.
                  </p>
                </div>
              </div>
            </FadeInWhenVisible>

            {/* Stats Grid */}
            <FadeInWhenVisible>
              <div className="gap-8 grid grid-cols-2">
                {[
                  {
                    number: '500+',
                    label: 'Projects Completed',
                    icon: HammerIcon,
                  },
                  {
                    number: '98%',
                    label: 'Client Satisfaction',
                    icon: StarIcon,
                  },
                  { number: '12', label: 'Team Members', icon: UserIcon },
                  { number: '7', label: 'Years in Business', icon: CheckIcon },
                ].map((stat, index) => (
                  <HoverScale key={index}>
                    <Card className="hover:shadow-xl border-brand-primary/10 hover:border-brand-primary/30 text-center transition-all duration-300">
                      <CardContent className="p-8">
                        <div className="flex justify-center mb-4">
                          <div className="bg-gradient-to-br from-brand-primary/10 to-brand-secondary/10 p-4 rounded-2xl">
                            <stat.icon
                              size="lg"
                              color="var(--brand-primary)"
                              className="text-brand-primary"
                            />
                          </div>
                        </div>
                        <div className="mb-3 font-black text-brand-primary text-4xl">
                          {stat.number}
                        </div>
                        <div className="font-semibold text-gray-700 dark:text-gray-300 text-lg">
                          {stat.label}
                        </div>
                      </CardContent>
                    </Card>
                  </HoverScale>
                ))}
              </div>
            </FadeInWhenVisible>
          </div>
        </div>
      </section>

      {/* Company Values Section */}
      <section className="relative bg-gradient-to-b from-gray-50 dark:from-gray-800 to-white dark:to-gray-900 py-20 lg:py-32 xl:py-40 values-section">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_75%,rgba(56,104,81,0.05)_0%,transparent_50%)] opacity-60"></div>
        <div className="right-20 bottom-20 absolute bg-brand-primary/5 blur-3xl rounded-full w-40 h-40"></div>

        <div className="relative mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <FadeInWhenVisible className="mb-24 lg:mb-32 text-center">
            <div className="inline-flex items-center bg-veteran-blue/10 dark:bg-veteran-blue/20 shadow-lg mb-10 px-8 py-4 border border-veteran-blue/20 rounded-full">
              <ShieldIcon size="md" color="var(--veteran-blue)" />
              <span className="ml-4 font-black text-veteran-blue text-sm uppercase tracking-wider">
                Core Values
              </span>
            </div>

            <h2 className="mb-10 font-black text-gray-900 dark:text-gray-100 text-5xl sm:text-6xl md:text-7xl lg:text-8xl leading-tight tracking-tighter">
              <span className="block mb-4 font-semibold text-gray-700 dark:text-gray-300 text-3xl sm:text-4xl md:text-5xl lg:text-6xl tracking-tight">
                Military Values
              </span>
              <span className="block bg-clip-text bg-gradient-to-r from-veteran-blue via-brand-primary to-veteran-blue drop-shadow-sm font-black text-transparent">
                Construction Excellence
              </span>
            </h2>

            <p className="mx-auto max-w-4xl font-light text-gray-600 dark:text-gray-300 text-xl md:text-2xl lg:text-3xl leading-relaxed tracking-wide">
              The same values that guided us in military service guide us in
              construction - delivering excellence with integrity, precision,
              and unwavering commitment to our mission.
            </p>
          </FadeInWhenVisible>

          <StaggeredFadeIn className="gap-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {companyValues.map((value, index) => (
              <HoverScale key={index}>
                <Card className="group hover:shadow-2xl border-gray-200/30 hover:border-brand-primary/30 h-full transition-all duration-500">
                  <CardContent className="p-8 text-center">
                    <div className="flex justify-center mb-6">
                      <div
                        className={`p-6 bg-gradient-to-br ${value.color} rounded-2xl shadow-lg group-hover:scale-110 transition-transform duration-300`}
                      >
                        <value.icon
                          size="xl"
                          color="white"
                          className="text-white"
                        />
                      </div>
                    </div>
                    <h3 className="mb-4 font-bold text-gray-900 dark:text-gray-100 group-hover:text-brand-primary text-2xl transition-colors">
                      {value.title}
                    </h3>
                    <p className="font-light text-gray-600 dark:text-gray-300 text-lg leading-relaxed">
                      {value.description}
                    </p>
                  </CardContent>
                </Card>
              </HoverScale>
            ))}
          </StaggeredFadeIn>
        </div>
      </section>

      {/* Team Section */}
      <section className="relative bg-white dark:bg-gray-900 py-20 lg:py-32 xl:py-40 team-section">
        <div className="absolute inset-0 bg-gradient-to-t from-gray-50/50 dark:from-gray-800/30 to-transparent"></div>
        <div className="top-20 left-20 absolute bg-brand-secondary/5 blur-3xl rounded-full w-32 h-32"></div>

        <div className="relative mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <FadeInWhenVisible className="mb-24 lg:mb-32 text-center">
            <div className="inline-flex items-center bg-brand-primary/10 dark:bg-brand-primary/20 shadow-lg mb-10 px-8 py-4 border border-brand-primary/20 rounded-full">
              <UserIcon size="md" color="var(--brand-primary)" />
              <span className="ml-4 font-black text-brand-primary text-sm uppercase tracking-wider">
                Leadership Team
              </span>
            </div>

            <h2 className="mb-10 font-black text-gray-900 dark:text-gray-100 text-5xl sm:text-6xl md:text-7xl lg:text-8xl leading-tight tracking-tighter">
              <span className="block mb-4 font-semibold text-gray-700 dark:text-gray-300 text-3xl sm:text-4xl md:text-5xl lg:text-6xl tracking-tight">
                Meet the Veterans
              </span>
              <span className="block bg-clip-text bg-gradient-to-r from-brand-primary via-brand-secondary to-brand-primary drop-shadow-sm font-black text-transparent">
                Behind MH Construction
              </span>
            </h2>
          </FadeInWhenVisible>

          {/* Grouped by Department */}
          {Array.from(
            teamMembers.reduce((acc: Map<string, typeof teamMembers>, m) => {
              const dept = (m as any).department || 'Team'
              if (!acc.has(dept)) acc.set(dept, [])
              acc.get(dept)!.push(m)
              return acc
            }, new Map())
          ).map(([department, members]) => (
            <div key={department} className="mb-24 last:mb-0">
              <FadeInWhenVisible className="mb-12 text-center">
                <h3 className="mb-4 font-black text-gray-900 dark:text-gray-100 text-3xl sm:text-4xl tracking-tight">
                  {department}
                </h3>
                <div className="bg-gradient-to-r from-brand-primary/10 via-brand-secondary/10 to-brand-primary/10 mx-auto rounded-full w-40 h-1" />
              </FadeInWhenVisible>
              <StaggeredFadeIn className="gap-12 grid grid-cols-1 md:grid-cols-2">
                {members.map((member: any, index: number) => (
                  <HoverScale key={index}>
                    <Card className="group hover:shadow-2xl border-gray-200/30 hover:border-brand-primary/30 h-full transition-all duration-500">
                      <CardContent className="p-8">
                        <div className="flex items-start space-x-6">
                          <div className="flex-shrink-0">
                            <div className="flex justify-center items-center bg-gradient-to-br from-brand-primary/10 to-brand-secondary/10 rounded-2xl w-20 h-20 text-4xl transition-transform duration-300">
                              {(member as any).avatar || '👤'}
                            </div>
                          </div>
                          <div className="flex-1">
                            <h3 className="mb-2 font-bold text-gray-900 dark:text-gray-100 group-hover:text-brand-primary text-2xl transition-colors">
                              {member.name}
                            </h3>
                            <div className="space-y-1 mb-3">
                              <p className="font-semibold text-brand-primary text-lg">
                                {(member as any).title ||
                                  (member as any).role ||
                                  'TBD Role'}
                              </p>
                              <p className="font-medium text-veteran-blue text-base">
                                {(member as any).military ||
                                  (member as any).veteranStatus ||
                                  'TBD Status'}
                              </p>
                              <p className="text-gray-600 dark:text-gray-400 text-sm">
                                {(member as any).experience ||
                                  (member as any).experienceYears ||
                                  'TBD Experience'}
                              </p>
                            </div>
                            <p className="mb-4 text-gray-700 dark:text-gray-300 text-base leading-relaxed">
                              {(member as any).description ||
                                (member as any).bio ||
                                'Bio coming soon.'}
                            </p>
                            <div className="flex flex-wrap gap-2">
                              {((member as any).specialties || []).map(
                                (specialty: string, specIndex: number) => (
                                  <span
                                    key={specIndex}
                                    className="bg-brand-primary/10 px-3 py-1 rounded-full font-medium text-brand-primary text-sm"
                                  >
                                    {specialty}
                                  </span>
                                )
                              )}
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </HoverScale>
                ))}
              </StaggeredFadeIn>
            </div>
          ))}
        </div>
      </section>

      {/* Company Timeline */}
      <section className="relative bg-gradient-to-b from-gray-50 dark:from-gray-800 to-white dark:to-gray-900 py-20 lg:py-32 xl:py-40 timeline-section">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_25%,rgba(56,104,81,0.05)_0%,transparent_50%)] opacity-60"></div>

        <div className="relative mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <FadeInWhenVisible className="mb-24 lg:mb-32 text-center">
            <div className="inline-flex items-center bg-brand-secondary/10 dark:bg-brand-secondary/20 shadow-lg mb-10 px-8 py-4 border border-brand-secondary/20 rounded-full">
              <StarIcon size="md" color="var(--brand-secondary)" />
              <span className="ml-4 font-black text-brand-secondary text-sm uppercase tracking-wider">
                Our Journey
              </span>
            </div>

            <h2 className="mb-10 font-black text-gray-900 dark:text-gray-100 text-5xl sm:text-6xl md:text-7xl lg:text-8xl leading-tight tracking-tighter">
              <span className="block mb-4 font-semibold text-gray-700 dark:text-gray-300 text-3xl sm:text-4xl md:text-5xl lg:text-6xl tracking-tight">
                7 Years of
              </span>
              <span className="block bg-clip-text bg-gradient-to-r from-brand-secondary via-brand-primary to-brand-secondary drop-shadow-sm font-black text-transparent">
                Growth & Excellence
              </span>
            </h2>
          </FadeInWhenVisible>

          <div className="relative">
            {/* Timeline Line */}
            <div className="left-1/2 absolute inset-y-0 bg-gradient-to-b from-brand-primary via-brand-secondary to-brand-primary w-1 -translate-x-1/2 transform"></div>

            <StaggeredFadeIn className="space-y-16">
              {milestones.map((milestone, index) => (
                <div
                  key={index}
                  className={`flex items-center ${
                    index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'
                  }`}
                >
                  {/* Timeline Dot */}
                  <div className="left-1/2 z-10 absolute bg-white shadow-xl border-4 border-brand-primary rounded-full w-6 h-6 -translate-x-1/2 transform"></div>

                  {/* Content */}
                  <div
                    className={`w-5/12 ${
                      index % 2 === 0 ? 'pr-8 text-right' : 'pl-8 text-left'
                    }`}
                  >
                    <HoverScale>
                      <Card className="group hover:shadow-xl border-brand-primary/20 hover:border-brand-primary/50 transition-all duration-500">
                        <CardContent className="p-8">
                          <div
                            className={`mb-4 ${
                              index % 2 === 0 ? 'text-right' : 'text-left'
                            }`}
                          >
                            <span className="inline-block bg-gradient-to-r from-brand-primary to-brand-secondary shadow-lg px-4 py-2 rounded-full font-bold text-white text-xl">
                              {milestone.year}
                            </span>
                          </div>
                          <h3 className="mb-4 font-bold text-gray-900 dark:text-gray-100 group-hover:text-brand-primary text-2xl transition-colors">
                            {milestone.title}
                          </h3>
                          <p className="font-light text-gray-600 dark:text-gray-300 text-lg leading-relaxed">
                            {milestone.description}
                          </p>
                        </CardContent>
                      </Card>
                    </HoverScale>
                  </div>
                </div>
              ))}
            </StaggeredFadeIn>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="relative bg-gradient-to-r from-brand-primary to-brand-secondary py-20 lg:py-32 cta-section">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.1)_0%,transparent_50%)]"></div>

        <div className="relative mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <FadeInWhenVisible className="text-center">
            <h2 className="mb-8 font-black text-white text-5xl sm:text-6xl md:text-7xl lg:text-8xl leading-tight tracking-tighter">
              <span className="block mb-4 font-semibold text-gray-100 text-3xl sm:text-4xl md:text-5xl lg:text-6xl tracking-tight">
                Ready to Work
              </span>
              <span className="block drop-shadow-lg">
                With Veterans Who Deliver?
              </span>
            </h2>

            <p className="mx-auto mb-12 max-w-4xl font-light text-gray-100 text-xl md:text-2xl lg:text-3xl leading-relaxed tracking-wide">
              Experience the difference that military precision, integrity, and
              dedication makes in your next construction project.
            </p>

            <div className="flex sm:flex-row flex-col justify-center items-center gap-8">
              <Link href="/booking">
                <HoverScale>
                  <Button
                    variant="secondary"
                    size="xl"
                    className="bg-white hover:bg-gray-100 shadow-xl text-brand-primary"
                  >
                    <UserIcon size="sm" color="currentColor" className="mr-3" />
                    <span className="z-10 relative tracking-wide">
                      Schedule Consultation
                    </span>
                  </Button>
                </HoverScale>
              </Link>
              <Link href="/portfolio">
                <HoverScale>
                  <Button
                    variant="outline"
                    size="xl"
                    className="hover:bg-white/10 shadow-xl border-white text-white"
                  >
                    <HammerIcon
                      size="sm"
                      color="currentColor"
                      className="mr-3"
                    />
                    <span className="z-10 relative tracking-wide">
                      View Our Projects
                    </span>
                  </Button>
                </HoverScale>
              </Link>
            </div>
          </FadeInWhenVisible>
        </div>
      </section>
    </>
  )
}
