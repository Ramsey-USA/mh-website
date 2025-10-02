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
      title: 'Partnership First',
      description:
        'We work WITH you, not just for you. Your success is our mission, and collaboration drives every decision.',
      color: 'from-brand-primary to-brand-primary-light',
    },
    {
      icon: CheckIcon,
      title: 'Military Precision',
      description:
        'Every project executed with the attention to detail and excellence that only military experience provides.',
      color: 'from-veteran-blue to-blue-600',
    },
    {
      icon: HammerIcon,
      title: 'Community Investment',
      description:
        'Building stronger Pacific Northwest communities through local partnerships and lasting relationships.',
      color: 'from-brand-secondary to-brand-secondary-light',
    },
    {
      icon: UserIcon,
      title: 'Transparent Leadership',
      description:
        'Honest communication, upfront pricing, and doing exactly what we promise - every time.',
      color: 'from-veteran-red to-red-600',
    },
    {
      icon: BoltIcon,
      title: 'Innovation Excellence',
      description:
        'Cutting-edge technology like our AI estimation system delivers unmatched accuracy and efficiency.',
      color: 'from-yellow-500 to-yellow-600',
    },
    {
      icon: StarIcon,
      title: 'Veteran Values Legacy',
      description:
        'Service above self, mission first mentality applied to every partnership and project we undertake.',
      color: 'from-purple-500 to-purple-600',
    },
  ]

  const milestones = [
    {
      year: '2018',
      title: 'Partnership Foundation',
      description:
        'Jeremy Thamert establishes MH Construction with a mission to create genuine partnerships, not just complete projects.',
    },
    {
      year: '2019',
      title: 'Community Trust Building',
      description:
        'First major Pacific Northwest projects establish our reputation for collaborative excellence and transparent communication.',
    },
    {
      year: '2021',
      title: 'Veteran Team Growth',
      description:
        'Expanded to 12+ team members, all veterans and military families committed to our partnership-first philosophy.',
    },
    {
      year: '2023',
      title: 'AI Innovation Launch',
      description:
        'Introduced revolutionary AI-powered estimation system, providing unprecedented transparency and accuracy for our partners.',
    },
    {
      year: '2024',
      title: 'Wounded Warrior Alliance',
      description:
        'Formalized partnership with Wounded Warrior Project, demonstrating our commitment to serving those who served.',
    },
    {
      year: '2025',
      title: 'Regional Partnership Leader',
      description:
        "Recognized as the Pacific Northwest's premier veteran-owned construction partner, building tomorrow with today's technology.",
    },
  ]

  return (
    <>
      {/* SEO Structured Data */}
      <StructuredData data={generateOrganizationStructuredData()} />

      {/* Hero Section */}
      <section className="relative bg-white dark:bg-gray-900 min-h-screen hero-section">
        {/* Enhanced Background Elements */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50/30 dark:from-blue-900/10 via-transparent to-brand-primary/5"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,rgba(56,104,81,0.08)_0%,transparent_40%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(189,146,100,0.06)_0%,transparent_40%)]"></div>

        {/* Floating Elements */}
        <div className="top-20 right-20 absolute bg-brand-primary/5 blur-3xl rounded-full w-40 h-40 animate-pulse"></div>
        <div className="bottom-32 left-20 absolute bg-veteran-blue/5 blur-3xl rounded-full w-32 h-32 animate-pulse delay-1000"></div>
        <div className="top-1/3 left-1/4 absolute bg-brand-secondary/3 blur-2xl rounded-full w-24 h-24 animate-pulse delay-2000"></div>

        <div className="z-10 relative flex justify-center items-center mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-16 max-w-7xl min-h-screen">
          <FadeInWhenVisible className="w-full text-center">
            {/* Enhanced Hero Title */}
            <div className="mb-12">
              <div className="inline-flex items-center bg-gradient-to-r from-brand-primary/10 via-brand-secondary/10 to-brand-primary/10 shadow-lg mb-8 px-8 py-4 border border-brand-primary/20 rounded-full">
                <ShieldIcon
                  size="sm"
                  color="var(--brand-primary)"
                  className="mr-3"
                />
                <span className="font-black text-brand-primary text-sm uppercase tracking-wider">
                  Veteran-Owned Excellence
                </span>
              </div>

              <h1 className="mb-8 font-black text-gray-900 dark:text-white text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl leading-tight tracking-tighter hero-title">
                <span className="block mb-4 font-light text-gray-700 dark:text-gray-300 text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl tracking-tight">
                  Building for the Owner
                </span>
                <span className="block bg-clip-text bg-gradient-to-r from-brand-primary via-brand-secondary to-brand-primary drop-shadow-sm font-black text-transparent">
                  NOT the Dollar
                </span>
              </h1>
            </div>

            {/* Enhanced Hero Description */}
            <p className="mx-auto mb-8 max-w-5xl font-light text-gray-600 dark:text-gray-300 text-xl md:text-2xl lg:text-3xl leading-relaxed tracking-wide">
              <span className="font-medium text-gray-800 dark:text-gray-200">
                Your Partner in Building Tomorrow
              </span>{' '}
              - Where veteran values meet genuine partnership and your success
              becomes our mission. We work{' '}
              <span className="bg-clip-text bg-gradient-to-r from-brand-primary to-brand-secondary font-semibold text-transparent">
                WITH you to serve our Pacific Northwest communities
              </span>
              .
            </p>

            {/* Value Proposition Highlight */}
            <div className="mx-auto mb-12 max-w-4xl">
              <div className="bg-gradient-to-r from-brand-primary/5 via-brand-secondary/5 to-brand-primary/5 shadow-inner backdrop-blur-sm p-8 border border-brand-primary/10 rounded-2xl">
                <div className="flex md:flex-row flex-col justify-center items-center gap-8 font-medium text-gray-700 dark:text-gray-300 text-lg">
                  <div className="flex items-center gap-3">
                    <CheckIcon size="sm" color="var(--brand-primary)" />
                    <span>500+ Projects Completed</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckIcon size="sm" color="var(--brand-primary)" />
                    <span>100% Veteran-Owned</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckIcon size="sm" color="var(--brand-primary)" />
                    <span>AI-Powered Estimation</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Enhanced CTA Buttons */}
            <div className="flex sm:flex-row flex-col justify-center items-center gap-8 mb-16">
              <Link href="/booking">
                <HoverScale>
                  <Button
                    variant="primary"
                    size="xl"
                    className="shadow-2xl hover:shadow-brand-primary/25 transition-all duration-300"
                  >
                    <UserIcon size="sm" color="currentColor" className="mr-3" />
                    <span className="z-10 relative font-semibold tracking-wide">
                      Schedule Free Consultation
                    </span>
                  </Button>
                </HoverScale>
              </Link>
              <Link href="/estimator">
                <HoverScale>
                  <Button
                    variant="outline"
                    size="xl"
                    className="shadow-2xl hover:shadow-brand-secondary/25 border-2 transition-all duration-300"
                  >
                    <BoltIcon size="sm" color="currentColor" className="mr-3" />
                    <span className="z-10 relative font-semibold tracking-wide">
                      Get AI Estimate
                    </span>
                  </Button>
                </HoverScale>
              </Link>
            </div>

            {/* Enhanced Partnership Promise */}
            <div className="mx-auto max-w-3xl">
              <StaggeredFadeIn className="space-y-6">
                <div className="bg-gradient-to-r from-veteran-blue/10 via-brand-primary/10 to-veteran-red/10 shadow-lg p-6 border border-veteran-blue/20 rounded-xl">
                  <p className="font-medium text-gray-800 dark:text-gray-200 text-lg text-center">
                    <span className="text-veteran-blue">🎖️</span>{' '}
                    <strong>Partnership Guarantee:</strong> We work WITH you
                    every step of the way{' '}
                    <span className="text-veteran-red">🤝</span>
                  </p>
                </div>

                <div className="flex flex-wrap justify-center items-center gap-8 font-medium text-gray-600 dark:text-gray-400 text-sm">
                  <div className="flex items-center gap-2">
                    <div className="bg-green-500 rounded-full w-2 h-2"></div>
                    <span>Licensed & Insured</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="bg-blue-500 rounded-full w-2 h-2"></div>
                    <span>Wounded Warrior Partner</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="bg-purple-500 rounded-full w-2 h-2"></div>
                    <span>Pacific Northwest Focused</span>
                  </div>
                </div>
              </StaggeredFadeIn>
            </div>
          </FadeInWhenVisible>
        </div>
      </section>

      {/* Company Story Section */}
      <section className="relative bg-white dark:bg-gray-900 py-20 lg:py-32 xl:py-40 story-section">
        <div className="absolute inset-0 bg-gradient-to-b from-gray-50/50 dark:from-gray-800/30 to-transparent"></div>
        <div className="top-20 right-20 absolute bg-brand-secondary/5 blur-3xl rounded-full w-32 h-32"></div>

        <div className="relative mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <FadeInWhenVisible className="mb-24 lg:mb-32 text-center">
            <h2 className="mb-10 font-black text-gray-900 dark:text-gray-100 text-5xl sm:text-6xl md:text-7xl lg:text-8xl leading-tight tracking-tighter">
              <span className="block mb-4 font-light text-gray-700 dark:text-gray-300 text-3xl sm:text-4xl md:text-5xl lg:text-6xl tracking-tight">
                Where Military Values Meet
              </span>
              <span className="block bg-clip-text bg-gradient-to-r from-brand-primary to-brand-secondary drop-shadow-sm font-black text-transparent">
                Genuine Partnership
              </span>
            </h2>
          </FadeInWhenVisible>

          <div className="items-center gap-20 grid grid-cols-1 lg:grid-cols-2">
            {/* Story Content */}
            <FadeInWhenVisible>
              <div className="space-y-10">
                <div className="group bg-gradient-to-br from-veteran-blue/5 hover:from-veteran-blue/10 to-brand-primary/5 hover:to-brand-primary/10 shadow-lg hover:shadow-xl p-10 border border-veteran-blue/10 hover:border-veteran-blue/20 rounded-3xl transition-all duration-500 cursor-pointer">
                  <div className="flex items-start gap-4 mb-8">
                    <div className="flex-shrink-0 bg-veteran-blue/10 group-hover:bg-veteran-blue/20 p-3 rounded-2xl transition-colors duration-300">
                      <ShieldIcon size="lg" color="var(--veteran-blue)" />
                    </div>
                    <h3 className="font-black text-veteran-blue group-hover:text-veteran-blue/80 text-2xl md:text-3xl transition-colors duration-300">
                      Partnership-Driven Construction
                    </h3>
                  </div>
                  <p className="mb-8 font-light text-gray-700 dark:text-gray-300 text-lg md:text-xl leading-relaxed tracking-wide">
                    <strong className="font-medium text-gray-800 dark:text-gray-200">
                      "Building for the Owner, NOT the Dollar"
                    </strong>{' '}
                    isn't just our tagline - it's our foundation. We work WITH
                    you as genuine partners, where your success becomes our
                    mission and every project strengthens our Pacific Northwest
                    communities.
                  </p>
                  <p className="font-light text-gray-700 dark:text-gray-300 text-lg md:text-xl leading-relaxed tracking-wide">
                    Founded by veterans who understand the value of integrity
                    and service, we've created a construction company that
                    operates on military precision with a community-first heart.
                  </p>

                  {/* Partnership Promise Badge */}
                  <div className="inline-flex items-center bg-veteran-blue/10 mt-8 px-6 py-3 border border-veteran-blue/20 rounded-full">
                    <CheckIcon
                      size="sm"
                      color="var(--veteran-blue)"
                      className="mr-3"
                    />
                    <span className="font-semibold text-veteran-blue text-sm tracking-wide">
                      Partnership Guarantee
                    </span>
                  </div>
                </div>

                <div className="group bg-gradient-to-br from-brand-primary/5 hover:from-brand-primary/10 to-brand-secondary/5 hover:to-brand-secondary/10 shadow-lg hover:shadow-xl p-10 border border-brand-primary/10 hover:border-brand-primary/20 rounded-3xl transition-all duration-500 cursor-pointer">
                  <div className="flex items-start gap-4 mb-8">
                    <div className="flex-shrink-0 bg-brand-primary/10 group-hover:bg-brand-primary/20 p-3 rounded-2xl transition-colors duration-300">
                      <HammerIcon size="lg" color="var(--brand-primary)" />
                    </div>
                    <h3 className="font-black text-brand-primary group-hover:text-brand-primary/80 text-2xl md:text-3xl transition-colors duration-300">
                      Innovation Meets Partnership
                    </h3>
                  </div>
                  <p className="mb-8 font-light text-gray-700 dark:text-gray-300 text-lg md:text-xl leading-relaxed tracking-wide">
                    When you choose MH Construction, you're not hiring a
                    contractor - you're gaining a partner who genuinely cares
                    about your vision and our community's future. We
                    collaborate, not just deliver.
                  </p>
                  <p className="font-light text-gray-700 dark:text-gray-300 text-lg md:text-xl leading-relaxed tracking-wide">
                    From transparent communication to innovative solutions like
                    our AI-powered estimation system, every aspect of our
                    partnership is designed to ensure your success and
                    satisfaction.
                  </p>

                  {/* Innovation Badge */}
                  <div className="inline-flex items-center bg-brand-primary/10 mt-8 px-6 py-3 border border-brand-primary/20 rounded-full">
                    <BoltIcon
                      size="sm"
                      color="var(--brand-primary)"
                      className="mr-3"
                    />
                    <span className="font-semibold text-brand-primary text-sm tracking-wide">
                      AI-Powered Solutions
                    </span>
                  </div>
                </div>
              </div>
            </FadeInWhenVisible>

            {/* Enhanced Stats Grid */}
            <FadeInWhenVisible>
              <div className="space-y-8">
                {/* Main Stats Grid */}
                <div className="gap-8 grid grid-cols-2">
                  {[
                    {
                      number: '500+',
                      label: 'Partnership Projects',
                      description: 'Successful collaborations completed',
                      icon: HammerIcon,
                      color: 'from-brand-primary to-brand-primary-light',
                    },
                    {
                      number: '98%',
                      label: 'Partner Satisfaction',
                      description: 'Long-term relationship success',
                      icon: StarIcon,
                      color: 'from-yellow-500 to-yellow-600',
                    },
                    {
                      number: '12+',
                      label: 'Veteran Team Members',
                      description: 'Military expertise working with you',
                      icon: UserIcon,
                      color: 'from-veteran-blue to-blue-600',
                    },
                    {
                      number: '7',
                      label: 'Years Building Trust',
                      description: 'Pacific Northwest partnerships',
                      icon: CheckIcon,
                      color: 'from-green-500 to-green-600',
                    },
                  ].map((stat, index) => (
                    <HoverScale key={index}>
                      <Card className="group hover:shadow-2xl border-brand-primary/10 hover:border-brand-primary/30 overflow-hidden text-center transition-all duration-500">
                        <CardContent className="relative p-8">
                          {/* Background Gradient */}
                          <div
                            className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-5 group-hover:opacity-10 transition-opacity duration-500`}
                          ></div>

                          <div className="z-10 relative">
                            <div className="flex justify-center mb-6">
                              <div
                                className={`bg-gradient-to-br ${stat.color} bg-opacity-10 group-hover:bg-opacity-20 shadow-lg p-4 rounded-2xl transition-all duration-300 group-hover:scale-110`}
                              >
                                <stat.icon
                                  size="lg"
                                  color="currentColor"
                                  className="text-gray-700 dark:text-gray-300"
                                />
                              </div>
                            </div>
                            <h3 className="mb-2 font-black text-gray-900 dark:text-gray-100 text-4xl md:text-5xl tracking-tight group-hover:scale-105 transition-transform duration-300">
                              {stat.number}
                            </h3>
                            <p className="mb-3 font-semibold text-gray-700 dark:text-gray-300 text-lg">
                              {stat.label}
                            </p>
                            <p className="font-light text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                              {stat.description}
                            </p>
                          </div>
                        </CardContent>
                      </Card>
                    </HoverScale>
                  ))}
                </div>

                {/* Partnership Promise */}
                <div className="bg-gradient-to-r from-brand-primary/5 via-brand-secondary/5 to-brand-primary/5 shadow-inner p-8 border border-brand-primary/10 rounded-2xl">
                  <div className="text-center">
                    <div className="flex justify-center items-center gap-3 mb-4">
                      <ShieldIcon size="md" color="var(--brand-primary)" />
                      <h4 className="font-black text-brand-primary text-xl">
                        Partnership Commitment
                      </h4>
                      <ShieldIcon size="md" color="var(--brand-primary)" />
                    </div>
                    <p className="font-medium text-gray-700 dark:text-gray-300 text-lg leading-relaxed">
                      <span className="text-veteran-blue">
                        Every statistic represents real partnerships
                      </span>{' '}
                      built on trust, transparency, and shared success. Your
                      project becomes part of our legacy.
                    </p>
                  </div>
                </div>
              </div>
            </FadeInWhenVisible>
          </div>
        </div>
      </section>

      {/* Company Values Section */}
      <section className="relative bg-gradient-to-b from-gray-50 dark:from-gray-800 to-white dark:to-gray-900 py-24 lg:py-36 xl:py-44 values-section">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_75%,rgba(56,104,81,0.05)_0%,transparent_50%)] opacity-60"></div>
        <div className="right-20 bottom-20 absolute bg-brand-primary/5 blur-3xl rounded-full w-40 h-40"></div>

        <div className="relative mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <FadeInWhenVisible className="mb-28 lg:mb-36 text-center">
            <h2 className="mb-12 font-black text-gray-900 dark:text-gray-100 text-5xl sm:text-6xl md:text-7xl lg:text-8xl leading-tight tracking-tighter">
              <span className="block mb-6 font-light text-gray-700 dark:text-gray-300 text-3xl sm:text-4xl md:text-5xl lg:text-6xl tracking-tight">
                Partnership Principles
              </span>
              <span className="block bg-clip-text bg-gradient-to-r from-veteran-blue via-brand-primary to-veteran-blue drop-shadow-sm font-black text-transparent">
                That Drive Everything
              </span>
            </h2>

            <p className="mx-auto max-w-5xl font-light text-gray-600 dark:text-gray-300 text-xl md:text-2xl lg:text-3xl leading-relaxed tracking-wide">
              These core values shape every partnership, guide every decision,
              and ensure that working WITH MH Construction means joining a team
              that genuinely cares about your success and our community's
              future.
            </p>
          </FadeInWhenVisible>

          {/* Enhanced Values Grid */}
          <StaggeredFadeIn className="gap-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {companyValues.map((value, index) => (
              <HoverScale key={index}>
                <Card className="group hover:shadow-2xl border-gray-200/30 hover:border-brand-primary/30 h-full overflow-hidden transition-all duration-500">
                  <CardContent className="relative p-10 text-center">
                    {/* Background Pattern */}
                    <div
                      className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${value.color} opacity-5 group-hover:opacity-10 rounded-bl-full transition-opacity duration-500`}
                    ></div>

                    <div className="z-10 relative">
                      <div className="flex justify-center mb-8">
                        <div
                          className={`p-6 bg-gradient-to-br ${value.color} rounded-2xl shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-all duration-300`}
                        >
                          <value.icon
                            size="xl"
                            color="white"
                            className="text-white"
                          />
                        </div>
                      </div>
                      <h3 className="mb-6 font-black text-gray-900 dark:text-gray-100 group-hover:text-brand-primary text-2xl md:text-3xl transition-colors">
                        {value.title}
                      </h3>
                      <p className="mb-6 font-light text-gray-600 dark:text-gray-300 text-lg leading-relaxed tracking-wide">
                        {value.description}
                      </p>

                      {/* Value Badge */}
                      <div
                        className={`inline-flex items-center bg-gradient-to-r ${value.color} bg-opacity-10 px-4 py-2 border border-current border-opacity-20 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
                      >
                        <CheckIcon
                          size="sm"
                          color="currentColor"
                          className="mr-2"
                        />
                        <span className="font-semibold text-sm tracking-wide">
                          Core Value
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </HoverScale>
            ))}
          </StaggeredFadeIn>

          {/* Partnership Promise Section */}
          <FadeInWhenVisible className="mt-16">
            <div className="bg-gradient-to-r from-brand-primary/5 via-brand-secondary/5 to-brand-primary/5 shadow-inner p-12 border border-brand-primary/10 rounded-3xl">
              <div className="text-center">
                <div className="flex justify-center items-center gap-4 mb-8">
                  <div className="bg-brand-primary/10 p-3 rounded-full">
                    <ShieldIcon size="lg" color="var(--brand-primary)" />
                  </div>
                  <h3 className="font-black text-brand-primary text-3xl">
                    Partnership Promise
                  </h3>
                  <div className="bg-brand-primary/10 p-3 rounded-full">
                    <ShieldIcon size="lg" color="var(--brand-primary)" />
                  </div>
                </div>
                <p className="mx-auto mb-8 max-w-4xl font-light text-gray-700 dark:text-gray-300 text-xl leading-relaxed">
                  These values aren't just words on a website - they're the
                  foundation of every partnership we build. When you work WITH
                  MH Construction, you experience these principles in action
                  every single day.
                </p>

                <div className="flex md:flex-row flex-col justify-center items-center gap-8">
                  <div className="flex items-center gap-3">
                    <div className="bg-veteran-blue/20 p-2 rounded-full">
                      <CheckIcon size="sm" color="var(--veteran-blue)" />
                    </div>
                    <span className="font-semibold text-veteran-blue">
                      Veteran-Led Excellence
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="bg-brand-primary/20 p-2 rounded-full">
                      <CheckIcon size="sm" color="var(--brand-primary)" />
                    </div>
                    <span className="font-semibold text-brand-primary">
                      Community-Focused Partnerships
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="bg-brand-secondary/20 p-2 rounded-full">
                      <CheckIcon size="sm" color="var(--brand-secondary)" />
                    </div>
                    <span className="font-semibold text-brand-secondary">
                      Innovation-Driven Solutions
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </FadeInWhenVisible>
        </div>
      </section>

      {/* Partnership Testimonials Section */}
      <section className="relative bg-gradient-to-b from-white dark:from-gray-900 to-gray-50 dark:to-gray-800 py-24 lg:py-32 xl:py-40 testimonials-section">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(56,104,81,0.03)_0%,transparent_50%)]"></div>

        <div className="relative mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <FadeInWhenVisible className="mb-24 lg:mb-32 text-center">
            <h2 className="mb-12 font-black text-gray-900 dark:text-gray-100 text-5xl sm:text-6xl md:text-7xl lg:text-8xl leading-tight tracking-tighter">
              <span className="block mb-6 font-light text-gray-700 dark:text-gray-300 text-3xl sm:text-4xl md:text-5xl lg:text-6xl tracking-tight">
                Partnership Success Stories
              </span>
              <span className="block bg-clip-text bg-gradient-to-r from-brand-primary via-brand-secondary to-brand-primary drop-shadow-sm font-black text-transparent">
                From Our Community
              </span>
            </h2>

            <p className="mx-auto max-w-5xl font-light text-gray-600 dark:text-gray-300 text-xl md:text-2xl lg:text-3xl leading-relaxed tracking-wide">
              Real stories from real partnerships across the Pacific Northwest -
              discover why our clients become our strongest advocates.
            </p>
          </FadeInWhenVisible>

          <StaggeredFadeIn className="gap-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {[
              {
                quote:
                  "MH Construction didn't just build our dream home - they became partners in our vision. Their military precision and genuine care made all the difference.",
                author: 'Sarah & Michael Thompson',
                project: 'Custom Family Home',
                location: 'Bellevue, WA',
                rating: 5,
              },
              {
                quote:
                  'Working WITH Jeremy and his team felt like having family involved in our project. True partnership from day one to move-in day.',
                author: 'David Chen',
                project: 'Commercial Renovation',
                location: 'Portland, OR',
                rating: 5,
              },
              {
                quote:
                  "Their AI estimation system was incredibly accurate, but it's their partnership approach that sets them apart. We felt heard every step of the way.",
                author: 'Lisa Rodriguez',
                project: 'Kitchen Remodel',
                location: 'Seattle, WA',
                rating: 5,
              },
            ].map((testimonial, index) => (
              <HoverScale key={index}>
                <Card className="group hover:shadow-2xl border-gray-200/30 hover:border-brand-primary/30 h-full transition-all duration-500">
                  <CardContent className="p-8">
                    <div className="mb-6">
                      <div className="flex items-center gap-1 mb-4">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <StarIcon
                            key={i}
                            size="sm"
                            color="var(--brand-secondary)"
                            className="text-brand-secondary"
                          />
                        ))}
                      </div>
                      <blockquote className="font-light text-gray-700 dark:text-gray-300 text-lg italic leading-relaxed">
                        "{testimonial.quote}"
                      </blockquote>
                    </div>

                    <div className="pt-6 border-gray-200 dark:border-gray-600 border-t">
                      <div className="flex items-start gap-4">
                        <div className="flex-shrink-0 bg-gradient-to-br from-brand-primary/10 to-brand-secondary/10 p-3 rounded-full">
                          <UserIcon size="md" color="var(--brand-primary)" />
                        </div>
                        <div>
                          <h4 className="font-black text-gray-900 dark:text-gray-100 group-hover:text-brand-primary text-lg transition-colors">
                            {testimonial.author}
                          </h4>
                          <p className="font-medium text-brand-primary text-sm">
                            {testimonial.project}
                          </p>
                          <p className="font-light text-gray-600 dark:text-gray-400 text-sm">
                            {testimonial.location}
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </HoverScale>
            ))}
          </StaggeredFadeIn>

          {/* Partnership Trust Indicators */}
          <FadeInWhenVisible className="mt-16">
            <div className="bg-gradient-to-r from-brand-primary/5 via-brand-secondary/5 to-brand-primary/5 shadow-inner p-8 border border-brand-primary/10 rounded-2xl">
              <div className="flex md:flex-row flex-col justify-center items-center gap-12 text-center">
                <div className="flex items-center gap-3">
                  <div className="bg-green-500/20 p-3 rounded-full">
                    <CheckIcon size="md" color="rgb(34, 197, 94)" />
                  </div>
                  <div>
                    <div className="font-black text-gray-900 dark:text-gray-100 text-2xl">
                      98%
                    </div>
                    <div className="font-medium text-gray-600 dark:text-gray-400 text-sm">
                      Partnership Satisfaction
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="bg-blue-500/20 p-3 rounded-full">
                    <StarIcon size="md" color="rgb(59, 130, 246)" />
                  </div>
                  <div>
                    <div className="font-black text-gray-900 dark:text-gray-100 text-2xl">
                      4.9★
                    </div>
                    <div className="font-medium text-gray-600 dark:text-gray-400 text-sm">
                      Average Partnership Rating
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="bg-purple-500/20 p-3 rounded-full">
                    <HammerIcon size="md" color="rgb(147, 51, 234)" />
                  </div>
                  <div>
                    <div className="font-black text-gray-900 dark:text-gray-100 text-2xl">
                      85%
                    </div>
                    <div className="font-medium text-gray-600 dark:text-gray-400 text-sm">
                      Referral Rate
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </FadeInWhenVisible>
        </div>
      </section>

      {/* Team Section */}
      <section className="relative bg-white dark:bg-gray-900 py-24 lg:py-36 xl:py-44 team-section">
        <div className="absolute inset-0 bg-gradient-to-t from-gray-50/50 dark:from-gray-800/30 to-transparent"></div>
        <div className="top-20 left-20 absolute bg-brand-secondary/5 blur-3xl rounded-full w-32 h-32"></div>

        <div className="relative mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <FadeInWhenVisible className="mb-28 lg:mb-36 text-center">
            <h2 className="mb-12 font-black text-gray-900 dark:text-gray-100 text-5xl sm:text-6xl md:text-7xl lg:text-8xl leading-tight tracking-tighter">
              <span className="block mb-6 font-light text-gray-700 dark:text-gray-300 text-3xl sm:text-4xl md:text-5xl lg:text-6xl tracking-tight">
                Your Partnership Team
              </span>
              <span className="block bg-clip-text bg-gradient-to-r from-brand-primary via-brand-secondary to-brand-primary drop-shadow-sm font-black text-transparent">
                Veterans Who Build With You
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
              <StaggeredFadeIn className="gap-12 lg:gap-16 grid grid-cols-1 md:grid-cols-2">
                {members.map((member: any, index: number) => (
                  <HoverScale key={index}>
                    <Card className="group hover:shadow-2xl border-gray-200/30 hover:border-brand-primary/30 h-full transition-all duration-500">
                      <CardContent className="p-10">
                        <div className="flex items-start space-x-6">
                          <div className="flex-shrink-0">
                            <div className="flex justify-center items-center bg-gradient-to-br from-brand-primary/10 to-brand-secondary/10 rounded-2xl w-20 h-20 text-4xl transition-transform duration-300">
                              {(member as any).avatar || '👤'}
                            </div>
                          </div>
                          <div className="flex-1">
                            <h3 className="mb-2 font-black text-gray-900 dark:text-gray-100 group-hover:text-brand-primary text-2xl transition-colors">
                              {member.name}
                            </h3>
                            <div className="space-y-1 mb-4">
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
                            <p className="mb-6 font-light text-gray-700 dark:text-gray-300 text-base leading-relaxed">
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
      <section className="relative bg-gradient-to-b from-gray-50 dark:from-gray-800 to-white dark:to-gray-900 py-24 lg:py-32 xl:py-40 timeline-section">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_25%,rgba(56,104,81,0.05)_0%,transparent_50%)] opacity-60"></div>

        <div className="relative mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <FadeInWhenVisible className="mb-24 lg:mb-32 text-center">
            <h2 className="mb-10 font-black text-gray-900 dark:text-gray-100 text-5xl sm:text-6xl md:text-7xl lg:text-8xl leading-tight tracking-tighter">
              <span className="block mb-4 font-light text-gray-700 dark:text-gray-300 text-3xl sm:text-4xl md:text-5xl lg:text-6xl tracking-tight">
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
                        <CardContent className="p-10">
                          <div
                            className={`mb-6 ${
                              index % 2 === 0 ? 'text-right' : 'text-left'
                            }`}
                          >
                            <span className="inline-block bg-gradient-to-r from-brand-primary to-brand-secondary shadow-lg px-4 py-2 rounded-full font-black text-white text-xl">
                              {milestone.year}
                            </span>
                          </div>
                          <h3 className="mb-6 font-black text-gray-900 dark:text-gray-100 group-hover:text-brand-primary text-2xl transition-colors">
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

      {/* Enhanced Call to Action Section */}
      <section className="relative bg-gradient-to-r from-brand-primary via-brand-secondary to-brand-primary py-24 lg:py-32 overflow-hidden cta-section">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.1)_0%,transparent_50%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,rgba(255,255,255,0.05)_0%,transparent_40%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(255,255,255,0.05)_0%,transparent_40%)]"></div>

        {/* Floating Elements */}
        <div className="top-20 right-20 absolute bg-white/5 blur-3xl rounded-full w-32 h-32 animate-pulse"></div>
        <div className="bottom-20 left-20 absolute bg-white/5 blur-3xl rounded-full w-40 h-40 animate-pulse delay-1000"></div>

        <div className="relative mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <FadeInWhenVisible className="text-center">
            {/* Enhanced CTA Badge */}
            <div className="inline-flex items-center bg-white/10 shadow-lg backdrop-blur-sm mb-8 px-8 py-4 border border-white/20 rounded-full">
              <ShieldIcon size="sm" color="white" className="mr-3" />
              <span className="font-black text-white text-sm uppercase tracking-wider">
                Ready to Start Your Partnership?
              </span>
            </div>

            <h2 className="mb-8 font-black text-white text-5xl sm:text-6xl md:text-7xl lg:text-8xl leading-tight tracking-tighter">
              <span className="block mb-4 font-light text-gray-100 text-3xl sm:text-4xl md:text-5xl lg:text-6xl tracking-tight">
                Experience the
              </span>
              <span className="block drop-shadow-lg">
                MH Partnership Difference
              </span>
            </h2>

            <p className="mx-auto mb-12 max-w-4xl font-light text-gray-100 text-xl md:text-2xl lg:text-3xl leading-relaxed tracking-wide">
              Join hundreds of satisfied partners across the Pacific Northwest.
              Let's work together to bring your vision to life with{' '}
              <strong>military precision</strong>,{' '}
              <strong>genuine partnership</strong>, and{' '}
              <strong>community-focused excellence</strong>.
            </p>

            {/* Enhanced Partnership Promise */}
            <div className="mx-auto mb-16 max-w-5xl">
              <div className="bg-white/10 shadow-lg backdrop-blur-sm p-8 border border-white/20 rounded-2xl">
                <div className="flex md:flex-row flex-col justify-center items-center gap-8 font-medium text-white text-lg">
                  <div className="flex items-center gap-3">
                    <div className="bg-white/20 p-2 rounded-full">
                      <CheckIcon size="sm" color="white" />
                    </div>
                    <span>Free Consultation & Estimate</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="bg-white/20 p-2 rounded-full">
                      <CheckIcon size="sm" color="white" />
                    </div>
                    <span>Military Precision Guarantee</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="bg-white/20 p-2 rounded-full">
                      <CheckIcon size="sm" color="white" />
                    </div>
                    <span>Partnership-First Approach</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Enhanced CTA Buttons */}
            <div className="flex sm:flex-row flex-col justify-center items-center gap-8">
              <Link href="/booking">
                <HoverScale>
                  <Button
                    variant="outline"
                    size="xl"
                    className="bg-white hover:bg-gray-100 shadow-2xl border-2 border-white text-brand-primary hover:scale-105 transition-all duration-300"
                  >
                    <UserIcon size="sm" color="currentColor" className="mr-3" />
                    <span className="z-10 relative font-semibold tracking-wide">
                      Start Your Partnership
                    </span>
                  </Button>
                </HoverScale>
              </Link>
              <Link href="/estimator">
                <HoverScale>
                  <Button
                    variant="outline"
                    size="xl"
                    className="hover:bg-white/10 shadow-2xl border-2 border-white text-white hover:scale-105 transition-all duration-300"
                  >
                    <BoltIcon size="sm" color="currentColor" className="mr-3" />
                    <span className="z-10 relative font-semibold tracking-wide">
                      Get AI Estimate
                    </span>
                  </Button>
                </HoverScale>
              </Link>
            </div>

            {/* Contact Information */}
            <div className="mt-16 text-center">
              <p className="font-light text-gray-200 text-lg">
                Have questions? Call us at{' '}
                <a
                  href="tel:+15551234567"
                  className="font-semibold text-white hover:text-gray-200 underline transition-colors"
                >
                  (555) 123-4567
                </a>{' '}
                or email{' '}
                <a
                  href="mailto:jeremy@mhconstruction.com"
                  className="font-semibold text-white hover:text-gray-200 underline transition-colors"
                >
                  jeremy@mhconstruction.com
                </a>
              </p>
            </div>
          </FadeInWhenVisible>
        </div>
      </section>
    </>
  )
}
