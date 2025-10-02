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
      color: 'from-veteran-blue to-veteran-blue-light',
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
      color: 'from-veteran-red to-veteran-red-light',
    },
    {
      icon: BoltIcon,
      title: 'Innovation Excellence',
      description:
        'Cutting-edge technology like our AI estimation system delivers unmatched accuracy and efficiency.',
      color: 'from-brand-primary to-brand-secondary',
    },
    {
      icon: StarIcon,
      title: 'Veteran Values Legacy',
      description:
        'Service above self, mission first mentality applied to every partnership and project we undertake.',
      color: 'from-veteran-blue to-brand-primary',
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
      <section className="relative bg-white dark:bg-black min-h-screen hero-section">
        <div className="z-10 relative flex justify-center items-center mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-16 max-w-7xl min-h-screen">
          <FadeInWhenVisible className="w-full text-center">
            {/* Enhanced Hero Title */}
            <div className="mb-12">
              <div className="inline-flex items-center bg-white dark:bg-gray-900 shadow-lg mb-8 px-8 py-4 border border-brand-primary/20 rounded-full">
                <ShieldIcon
                  size="sm"
                  color="var(--brand-primary)"
                  className="mr-3"
                />
                <span className="font-black text-brand-primary text-sm uppercase tracking-[0.2em] letter-spacing-wide">
                  Veteran-Owned Excellence
                </span>
              </div>

              <h1 className="mb-8 font-black text-brand-primary dark:text-brand-primary-light text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl leading-[0.9] tracking-[-0.02em] hero-title">
                <span className="block mb-6 font-light text-brand-secondary dark:text-brand-secondary-light text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl leading-[1.1] tracking-[-0.01em]">
                  Building for the Owner
                </span>
                <span className="block bg-clip-text bg-gradient-to-r from-brand-primary via-brand-secondary to-brand-primary drop-shadow-sm font-black text-transparent leading-[0.85] tracking-[-0.025em]">
                  NOT the Dollar
                </span>
              </h1>
            </div>

            {/* Enhanced Hero Description */}
            <p className="mx-auto mb-8 max-w-5xl font-light text-brand-primary dark:text-brand-primary-light text-xl md:text-2xl lg:text-3xl leading-[1.4] tracking-[-0.01em]">
              <span className="font-semibold text-brand-secondary dark:text-brand-secondary-light">
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
              <div className="bg-white dark:bg-gray-900 shadow-inner backdrop-blur-sm p-8 border border-brand-primary/10 rounded-2xl">
                <div className="flex md:flex-row flex-col justify-center items-center gap-8 font-semibold text-brand-primary dark:text-brand-primary-light text-lg tracking-[-0.005em]">
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
                    <UserIcon
                      size="sm"
                      color="var(--brand-primary)"
                      className="mr-3"
                    />
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
                    <BoltIcon
                      size="sm"
                      color="var(--brand-secondary)"
                      className="mr-3"
                    />
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
                <div className="bg-white dark:bg-gray-900 shadow-lg p-6 border border-veteran-blue/20 rounded-xl">
                  <p className="font-medium text-brand-primary dark:text-brand-primary-light text-lg text-center">
                    <span className="text-brand-primary">🎖️</span>{' '}
                    <strong>Partnership Guarantee:</strong> We work WITH you
                    every step of the way{' '}
                    <span className="text-brand-secondary">🤝</span>
                  </p>
                </div>

                <div className="flex flex-wrap justify-center items-center gap-8 font-medium text-brand-primary dark:text-brand-primary-light text-sm">
                  <div className="flex items-center gap-2">
                    <div className="bg-brand-primary rounded-full w-2 h-2"></div>
                    <span>Licensed & Insured</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="bg-veteran-blue rounded-full w-2 h-2"></div>
                    <span>Wounded Warrior Partner</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="bg-brand-secondary rounded-full w-2 h-2"></div>
                    <span>Pacific Northwest Focused</span>
                  </div>
                </div>
              </StaggeredFadeIn>
            </div>
          </FadeInWhenVisible>
        </div>
      </section>

      {/* Company Story Section */}
      <section className="relative bg-white dark:bg-black py-20 lg:py-32 xl:py-40 story-section">
        <div className="relative mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <FadeInWhenVisible className="mb-24 lg:mb-32 text-center">
            <h2 className="mb-10 font-black text-brand-primary dark:text-brand-primary-light text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl leading-[0.9] tracking-[-0.02em]">
              <span className="block mb-6 font-light text-brand-secondary dark:text-brand-secondary-light text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl leading-[1.1] tracking-[-0.01em]">
                Where Military Values Meet
              </span>
              <span className="block bg-clip-text bg-gradient-to-r from-brand-primary to-brand-secondary drop-shadow-sm font-black text-transparent leading-[0.85] tracking-[-0.025em]">
                Genuine Partnership
              </span>
            </h2>
          </FadeInWhenVisible>

          <div className="items-center gap-20 grid grid-cols-1 lg:grid-cols-2">
            {/* Story Content */}
            <FadeInWhenVisible>
              <div className="space-y-10">
                <div className="group bg-white dark:bg-gray-900 shadow-lg hover:shadow-xl p-10 border border-veteran-blue/10 hover:border-veteran-blue/20 rounded-3xl transition-all duration-500 cursor-pointer">
                  <div className="flex items-start gap-4 mb-8">
                    <div className="flex-shrink-0 bg-veteran-blue/10 group-hover:bg-veteran-blue/20 p-3 rounded-2xl transition-colors duration-300">
                      <ShieldIcon size="lg" color="var(--veteran-blue)" />
                    </div>
                    <h3 className="font-black text-veteran-blue group-hover:text-veteran-blue/80 text-xl md:text-2xl leading-[1.2] tracking-[-0.01em] transition-colors duration-300">
                      Partnership-Driven Construction
                    </h3>
                  </div>
                  <p className="mb-8 font-light text-brand-secondary dark:text-brand-secondary-light text-lg md:text-xl leading-[1.6] tracking-[-0.005em]">
                    <strong className="font-semibold text-brand-primary dark:text-brand-primary-light">
                      "Building for the Owner, NOT the Dollar"
                    </strong>{' '}
                    isn't just our tagline - it's our foundation. We work WITH
                    you as genuine partners, where your success becomes our
                    mission and every project strengthens our Pacific Northwest
                    communities.
                  </p>
                  <p className="font-light text-brand-secondary dark:text-brand-secondary-light text-lg md:text-xl leading-[1.6] tracking-[-0.005em]">
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

                <div className="group bg-white dark:bg-gray-900 shadow-lg hover:shadow-xl p-10 border border-brand-primary/10 hover:border-brand-primary/20 rounded-3xl transition-all duration-500 cursor-pointer">
                  <div className="flex items-start gap-4 mb-8">
                    <div className="flex-shrink-0 bg-brand-primary/10 group-hover:bg-brand-primary/20 p-3 rounded-2xl transition-colors duration-300">
                      <HammerIcon size="lg" color="var(--brand-primary)" />
                    </div>
                    <h3 className="font-black text-brand-primary group-hover:text-brand-primary/80 text-xl md:text-2xl leading-[1.2] tracking-[-0.01em] transition-colors duration-300">
                      Innovation Meets Partnership
                    </h3>
                  </div>
                  <p className="mb-8 font-light text-brand-secondary dark:text-brand-secondary-light text-lg md:text-xl leading-[1.6] tracking-[-0.005em]">
                    When you choose MH Construction, you're not hiring a
                    contractor - you're gaining a partner who genuinely cares
                    about your vision and our community's future. We
                    collaborate, not just deliver.
                  </p>
                  <p className="font-light text-brand-secondary dark:text-brand-secondary-light text-lg md:text-xl leading-[1.6] tracking-[-0.005em]">
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
                <div className="gap-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
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
                      color: 'from-brand-secondary to-brand-secondary-light',
                    },
                    {
                      number: '12+',
                      label: 'Veteran Team Members',
                      description: 'Military expertise working with you',
                      icon: UserIcon,
                      color: 'from-veteran-blue to-veteran-blue-light',
                    },
                    {
                      number: '7',
                      label: 'Years Building Trust',
                      description: 'Pacific Northwest partnerships',
                      icon: CheckIcon,
                      color: 'from-veteran-red to-veteran-red-light',
                    },
                  ].map((stat, index) => (
                    <HoverScale key={index}>
                      <Card className="group hover:shadow-2xl border-brand-primary/20 hover:border-brand-primary/40 overflow-hidden text-center transition-all duration-500">
                        <CardContent className="relative p-8">
                          {/* Background Gradient */}
                          <div
                            className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-10 group-hover:opacity-20 transition-opacity duration-500`}
                          ></div>

                          <div className="z-10 relative">
                            <div className="flex justify-center mb-6">
                              <div
                                className={`bg-gradient-to-br ${stat.color} bg-opacity-20 group-hover:bg-opacity-30 shadow-lg p-4 rounded-2xl transition-all duration-300 group-hover:scale-110`}
                              >
                                <stat.icon
                                  size="lg"
                                  color="var(--brand-primary)"
                                  className="text-brand-primary dark:text-brand-primary-light"
                                />
                              </div>
                            </div>
                            <h3 className="mb-2 font-black text-brand-primary dark:text-brand-primary-light text-4xl md:text-5xl tracking-tight group-hover:scale-105 transition-transform duration-300">
                              {stat.number}
                            </h3>
                            <p className="mb-3 font-semibold text-brand-secondary dark:text-brand-secondary-light text-lg">
                              {stat.label}
                            </p>
                            <p className="font-light text-brand-primary dark:text-brand-primary-light text-sm leading-relaxed">
                              {stat.description}
                            </p>
                          </div>
                        </CardContent>
                      </Card>
                    </HoverScale>
                  ))}
                </div>

                {/* Partnership Promise */}
                <div className="bg-white dark:bg-gray-900 shadow-inner p-8 border border-brand-primary/10 rounded-2xl">
                  <div className="text-center">
                    <div className="flex justify-center items-center gap-3 mb-4">
                      <ShieldIcon size="md" color="var(--brand-primary)" />
                      <h4 className="font-black text-brand-primary text-xl">
                        Partnership Commitment
                      </h4>
                      <ShieldIcon size="md" color="var(--brand-primary)" />
                    </div>
                    <p className="font-medium text-brand-secondary dark:text-brand-secondary-light text-lg leading-relaxed">
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
      <section className="relative bg-white dark:bg-black py-24 lg:py-36 xl:py-44 values-section">
        <div className="relative mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <FadeInWhenVisible className="mb-28 lg:mb-36 text-center">
            <h2 className="mb-12 font-black text-brand-primary dark:text-brand-primary-light text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl leading-[0.9] tracking-[-0.02em]">
              <span className="block mb-6 font-light text-brand-secondary dark:text-brand-secondary-light text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl leading-[1.1] tracking-[-0.01em]">
                Partnership Principles
              </span>
              <span className="block bg-clip-text bg-gradient-to-r from-veteran-blue via-brand-primary to-veteran-blue drop-shadow-sm font-black text-transparent leading-[0.85] tracking-[-0.025em]">
                That Drive Everything
              </span>
            </h2>

            <p className="mx-auto max-w-5xl font-light text-brand-secondary dark:text-brand-secondary-light text-xl md:text-2xl lg:text-3xl leading-[1.4] tracking-[-0.01em]">
              These core values shape every partnership, guide every decision,
              and ensure that working WITH MH Construction means joining a team
              that genuinely cares about your success and our community's
              future.
            </p>
          </FadeInWhenVisible>

          {/* Enhanced Values Grid */}
          <StaggeredFadeIn className="gap-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {companyValues.map((value, index) => (
              <HoverScale key={index}>
                <Card className="group hover:shadow-2xl border-brand-primary/30 hover:border-brand-primary/50 h-full overflow-hidden transition-all duration-500">
                  <CardContent className="relative p-6 text-center">
                    {/* Background Pattern */}
                    <div
                      className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${value.color} opacity-10 group-hover:opacity-20 rounded-bl-full transition-opacity duration-500`}
                    ></div>

                    <div className="z-10 relative">
                      <div className="flex justify-center mb-6">
                        <div
                          className={`p-4 bg-gradient-to-br ${value.color} rounded-2xl shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-all duration-300`}
                        >
                          <value.icon
                            size="lg"
                            color="white"
                            className="text-white"
                          />
                        </div>
                      </div>
                      <h3 className="mb-4 font-black text-brand-primary dark:text-brand-primary-light group-hover:text-brand-secondary text-lg leading-[1.2] tracking-[-0.01em] transition-colors">
                        {value.title}
                      </h3>
                      <p className="mb-4 font-light text-brand-secondary dark:text-brand-secondary-light text-sm leading-[1.6] tracking-[-0.005em]">
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
            <div className="bg-white dark:bg-gray-900 shadow-inner p-12 border border-brand-primary/10 rounded-3xl">
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
                <p className="mx-auto mb-8 max-w-4xl font-light text-brand-secondary dark:text-brand-secondary-light text-xl leading-relaxed">
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
      <section className="relative bg-white dark:bg-black py-24 lg:py-32 xl:py-40 testimonials-section">
        <div className="relative mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <FadeInWhenVisible className="mb-24 lg:mb-32 text-center">
            <h2 className="mb-12 font-black text-brand-primary dark:text-brand-primary-light text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl leading-[0.9] tracking-[-0.02em]">
              <span className="block mb-6 font-light text-brand-secondary dark:text-brand-secondary-light text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl leading-[1.1] tracking-[-0.01em]">
                Partnership Success Stories
              </span>
              <span className="block bg-clip-text bg-gradient-to-r from-brand-primary via-brand-secondary to-brand-primary drop-shadow-sm font-black text-transparent leading-[0.85] tracking-[-0.025em]">
                From Our Community
              </span>
            </h2>

            <p className="mx-auto max-w-5xl font-light text-brand-secondary dark:text-brand-secondary-light text-xl md:text-2xl lg:text-3xl leading-[1.4] tracking-[-0.01em]">
              Real stories from real partnerships across the Pacific Northwest -
              discover why our clients become our strongest advocates.
            </p>
          </FadeInWhenVisible>

          <StaggeredFadeIn className="gap-6 grid grid-cols-1 md:grid-cols-2">
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
                <Card className="group hover:shadow-2xl border-brand-primary/30 hover:border-brand-primary/50 h-full transition-all duration-500">
                  <CardContent className="p-6">
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
                      <blockquote className="font-light text-brand-secondary dark:text-brand-secondary-light text-base italic leading-[1.6] tracking-[-0.005em]">
                        "{testimonial.quote}"
                      </blockquote>
                    </div>

                    <div className="pt-6 border-t border-brand-primary/20 dark:border-brand-primary/30">
                      <div className="flex items-start gap-4">
                        <div className="flex-shrink-0 bg-gradient-to-br from-brand-primary/10 to-brand-secondary/10 p-3 rounded-full">
                          <UserIcon size="md" color="var(--brand-primary)" />
                        </div>
                        <div>
                          <h4 className="font-black text-brand-primary dark:text-brand-primary-light group-hover:text-brand-secondary text-base leading-[1.3] tracking-[-0.005em] transition-colors">
                            {testimonial.author}
                          </h4>
                          <p className="font-semibold text-brand-secondary text-sm leading-[1.4] tracking-[-0.005em]">
                            {testimonial.project}
                          </p>
                          <p className="font-light text-brand-primary dark:text-brand-primary-light text-sm leading-[1.4] tracking-[-0.005em]">
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
            <div className="bg-white dark:bg-gray-900 shadow-inner p-8 border border-brand-primary/10 rounded-2xl">
              <div className="flex md:flex-row flex-col justify-center items-center gap-12 text-center">
                <div className="flex items-center gap-3">
                  <div className="bg-brand-primary/20 p-3 rounded-full">
                    <CheckIcon size="md" color="var(--brand-primary)" />
                  </div>
                  <div>
                    <div className="font-black text-brand-primary dark:text-brand-primary-light text-2xl">
                      98%
                    </div>
                    <div className="font-medium text-brand-secondary dark:text-brand-secondary-light text-sm">
                      Partnership Satisfaction
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="bg-brand-secondary/20 p-3 rounded-full">
                    <StarIcon size="md" color="var(--brand-secondary)" />
                  </div>
                  <div>
                    <div className="font-black text-brand-primary dark:text-brand-primary-light text-2xl">
                      4.9★
                    </div>
                    <div className="font-medium text-brand-secondary dark:text-brand-secondary-light text-sm">
                      Average Partnership Rating
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="bg-veteran-blue/20 p-3 rounded-full">
                    <HammerIcon size="md" color="var(--veteran-blue)" />
                  </div>
                  <div>
                    <div className="font-black text-brand-primary dark:text-brand-primary-light text-2xl">
                      85%
                    </div>
                    <div className="font-medium text-brand-secondary dark:text-brand-secondary-light text-sm">
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
      <section className="relative bg-white dark:bg-black py-24 lg:py-36 xl:py-44 team-section">
        <div className="relative mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <FadeInWhenVisible className="mb-28 lg:mb-36 text-center">
            <h2 className="mb-12 font-black text-brand-primary dark:text-brand-primary-light text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl leading-[0.9] tracking-[-0.02em]">
              <span className="block mb-6 font-light text-brand-secondary dark:text-brand-secondary-light text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl leading-[1.1] tracking-[-0.01em]">
                Your Partnership Team
              </span>
              <span className="block bg-clip-text bg-gradient-to-r from-brand-primary via-brand-secondary to-brand-primary drop-shadow-sm font-black text-transparent leading-[0.85] tracking-[-0.025em]">
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
                <h3 className="mb-4 font-black text-brand-primary dark:text-brand-primary-light text-2xl sm:text-3xl xl:text-4xl leading-[1.2] tracking-[-0.01em]">
                  {department}
                </h3>
                <div className="bg-gradient-to-r from-brand-primary/10 via-brand-secondary/10 to-brand-primary/10 mx-auto rounded-full w-40 h-1" />
              </FadeInWhenVisible>
              <StaggeredFadeIn className="gap-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                {members.map((member: any, index: number) => (
                  <HoverScale key={index}>
                    <div className="group relative w-full h-80 perspective-1000 transition-all duration-500">
                      {/* Card Container with 3D Transform */}
                      <div className="relative w-full h-full transform-style-preserve-3d group-hover:rotate-y-180 transition-transform duration-700">
                        {/* Front of Card */}
                        <Card className="absolute inset-0 border-brand-primary/30 hover:border-brand-primary/50 w-full h-full transition-all duration-500 backface-hidden">
                          <CardContent className="flex flex-col p-6 h-full">
                            <div className="flex-1 text-center">
                              {/* Avatar */}
                              <div className="flex justify-center mb-4">
                                <div className="flex justify-center items-center bg-gradient-to-br from-brand-primary/10 to-brand-secondary/10 rounded-2xl w-16 h-16 text-2xl group-hover:scale-110 transition-transform duration-300">
                                  {(member as any).avatar || '👤'}
                                </div>
                              </div>

                              {/* Name & Role */}
                              <h3 className="mb-1 font-black text-brand-primary dark:text-brand-primary-light text-base leading-[1.3] tracking-[-0.005em] transition-colors">
                                {member.name}
                              </h3>
                              <p className="mb-1 font-semibold text-brand-secondary text-xs leading-[1.4] tracking-[-0.005em]">
                                {(member as any).title ||
                                  (member as any).role ||
                                  'TBD Role'}
                              </p>
                              <p className="mb-3 font-medium text-veteran-blue text-xs leading-[1.4] tracking-[-0.005em]">
                                {(member as any).military ||
                                  (member as any).veteranStatus ||
                                  'TBD Status'}
                              </p>

                              {/* Experience */}
                              <p className="mb-4 text-brand-secondary dark:text-brand-secondary-light text-xs leading-[1.4] tracking-[-0.005em]">
                                {(member as any).experience ||
                                  (member as any).experienceYears ||
                                  'TBD Experience'}
                              </p>

                              {/* Top 5 Characteristics */}
                              <div className="flex-1 space-y-1">
                                <h4 className="mb-2 font-bold text-brand-primary text-xs leading-[1.3] tracking-[-0.005em]">
                                  Top 5 Characteristics:
                                </h4>
                                <div className="flex flex-wrap justify-center gap-1">
                                  {(
                                    (member as any).specialties || [
                                      'Leadership',
                                      'Reliability',
                                      'Innovation',
                                      'Teamwork',
                                      'Excellence',
                                    ]
                                  )
                                    .slice(0, 5)
                                    .map(
                                      (
                                        specialty: string,
                                        specIndex: number
                                      ) => (
                                        <span
                                          key={specIndex}
                                          className="bg-brand-primary/10 px-2 py-1 rounded-full font-medium text-brand-primary text-xs leading-[1.2] tracking-[-0.005em]"
                                        >
                                          {specialty}
                                        </span>
                                      )
                                    )}
                                </div>
                              </div>

                              {/* Hover Indicator */}
                              <div className="mt-4 text-center">
                                <p className="text-brand-secondary/60 text-xs italic leading-[1.3] tracking-[-0.005em]">
                                  Hover for bio
                                </p>
                              </div>
                            </div>
                          </CardContent>
                        </Card>

                        {/* Back of Card */}
                        <Card className="absolute inset-0 border-brand-secondary/30 hover:border-brand-secondary/50 w-full h-full rotate-y-180 transition-all duration-500 backface-hidden">
                          <CardContent className="flex flex-col p-6 h-full">
                            <div className="flex-1 text-center">
                              {/* Header */}
                              <div className="mb-4">
                                <h3 className="mb-1 font-black text-brand-secondary dark:text-brand-secondary-light text-base leading-[1.3] tracking-[-0.005em]">
                                  {member.name}
                                </h3>
                                <p className="font-semibold text-brand-primary text-sm leading-[1.4] tracking-[-0.005em]">
                                  Biography
                                </p>
                              </div>

                              {/* Bio Content */}
                              <div className="flex flex-1 justify-center items-center">
                                <p className="font-light text-brand-primary dark:text-brand-primary-light text-sm text-center leading-[1.6] tracking-[-0.005em]">
                                  {(member as any).description ||
                                    (member as any).bio ||
                                    'Bio coming soon. This team member is an integral part of our partnership-focused approach to construction excellence.'}
                                </p>
                              </div>

                              {/* Back Indicator */}
                              <div className="mt-4 text-center">
                                <p className="text-brand-primary/60 text-xs italic leading-[1.3] tracking-[-0.005em]">
                                  Hover away to return
                                </p>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </div>
                    </div>
                  </HoverScale>
                ))}
              </StaggeredFadeIn>
            </div>
          ))}
        </div>
      </section>

      {/* Company Timeline */}
      <section className="relative bg-white dark:bg-black py-24 lg:py-32 xl:py-40 timeline-section">
        <div className="relative mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <FadeInWhenVisible className="mb-24 lg:mb-32 text-center">
            <h2 className="mb-10 font-black text-brand-primary dark:text-brand-primary-light text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl leading-[0.9] tracking-[-0.02em]">
              <span className="block mb-6 font-light text-brand-secondary dark:text-brand-secondary-light text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl leading-[1.1] tracking-[-0.01em]">
                7 Years of
              </span>
              <span className="block bg-clip-text bg-gradient-to-r from-brand-secondary via-brand-primary to-brand-secondary drop-shadow-sm font-black text-transparent leading-[0.85] tracking-[-0.025em]">
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
                  <div className="left-1/2 z-10 absolute bg-brand-primary-light shadow-xl border-4 border-brand-primary rounded-full w-6 h-6 -translate-x-1/2 transform"></div>

                  {/* Content */}
                  <div
                    className={`w-5/12 ${
                      index % 2 === 0 ? 'pr-8 text-right' : 'pl-8 text-left'
                    }`}
                  >
                    <HoverScale>
                      <Card className="group hover:shadow-xl border-brand-primary/30 hover:border-brand-primary/60 transition-all duration-500">
                        <CardContent className="p-6">
                          <div
                            className={`mb-6 ${
                              index % 2 === 0 ? 'text-right' : 'text-left'
                            }`}
                          >
                            <span className="inline-block bg-gradient-to-r from-brand-primary to-brand-secondary shadow-lg px-4 py-2 rounded-full font-black text-white text-lg leading-[1.2] tracking-[-0.01em]">
                              {milestone.year}
                            </span>
                          </div>
                          <h3 className="mb-6 font-black text-brand-primary dark:text-brand-primary-light group-hover:text-brand-secondary text-xl leading-[1.3] tracking-[-0.01em] transition-colors">
                            {milestone.title}
                          </h3>
                          <p className="font-light text-brand-secondary dark:text-brand-secondary-light text-base leading-[1.6] tracking-[-0.005em]">
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
