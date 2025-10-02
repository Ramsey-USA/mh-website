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
import { OptimizedImage } from '../../components/ui/OptimizedImage'

// Core Values Data
const coreValues = [
  {
    iconName: 'visibility',
    title: 'Honesty & Transparency',
    subtitle: 'Full-disclosure approach in all communications',
    description:
      'No hidden costs, surprise changes, or unclear timelines. We provide transparent pricing with detailed breakdowns of every cost component.',
    practices: [
      'Pre-construction meetings with complete cost breakdowns',
      'Regular project updates with photo documentation',
      'Open-book approach to material costs and labor',
      'Immediate notification of any project changes or delays',
    ],
  },
  {
    iconName: 'verified_user',
    title: 'Integrity',
    subtitle: "Unwavering commitment to what's right",
    description:
      'Ethical business practices, quality workmanship, and promise keeping. We never cut corners, even when no one is watching.',
    practices: [
      'Recommending solutions that benefit you, not just our profit margin',
      'Using specified materials and methods, never substituting without approval',
      'Standing behind our work with comprehensive warranties',
      "Treating your property with the same care we'd want for our own",
    ],
  },
  {
    iconName: 'precision_manufacturing',
    title: 'Precision & Experience',
    subtitle: '150+ years combined team expertise',
    description:
      'Deep technical knowledge across all construction disciplines with a military-precision approach to every project aspect.',
    practices: [
      'Detailed project planning with multiple contingency scenarios',
      'Precise measurements, calculations, and material estimates',
      'Quality control checkpoints at every project phase',
      'Expert problem-solving when unexpected challenges arise',
    ],
  },
  {
    iconName: 'handshake',
    title: 'Client-First Ethics',
    subtitle: 'Small-town values with big-city capabilities',
    description:
      'Your vision comes first. We adapt our expertise to serve your goals and build lasting relationships, not just structures.',
    practices: [
      'Initial consultations focused on understanding your unique needs',
      'Flexible scheduling that works with your timeline',
      'Multiple communication channels (phone, email, text, in-person)',
      'Solutions scaled to your budget without compromising quality',
    ],
  },
  {
    iconName: 'settings',
    title: 'Professionalism & Control',
    subtitle: '"You control it, we manage it"',
    description:
      'Shared decision making where you maintain control while we provide expert guidance and handle all logistics.',
    practices: [
      'Decision points clearly identified and explained before work proceeds',
      'Daily briefings on progress and upcoming decisions needed',
      'Professional appearance and conduct on your property',
      'Coordination of all subcontractors and material deliveries',
    ],
  },
  {
    iconName: 'shield',
    title: 'Trust',
    subtitle: 'The culmination of all other values',
    description:
      "Trust isn't just another value—it's the result when all other values are consistently demonstrated. It's our ultimate goal.",
    practices: [
      'Consistency: Delivering the same high standards on every project',
      "Reliability: Being where we say we'll be, when we say we'll be there",
      'Competence: Demonstrating expertise through quality results',
      "Character: Doing the right thing, especially when it's difficult",
    ],
  },
]

// Company Stats
const companyStats = [
  { iconName: 'calendar_today', value: '30+', label: 'Years in Business' },
  { iconName: 'groups', value: '150+', label: 'Years Combined Experience' },
  { iconName: 'star', value: '98%', label: 'Client Satisfaction' },
  { iconName: 'diversity_3', value: '70%', label: 'Referral Rate' },
]

export default function AboutPage() {
  return (
    <div className="bg-gradient-to-b from-white to-gray-50 min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-[#2d5240] via-[#386851] to-[#4a7a63] py-20 text-white">
        <div className="mx-auto px-4 container">
          <FadeInWhenVisible>
            <div className="mx-auto max-w-4xl text-center">
              <h1 className="mb-6 font-bold text-5xl md:text-6xl">
                About MH Construction
              </h1>
              <p className="mb-8 text-green-100 text-xl md:text-2xl">
                "We Work With You" - Building Relationships, Strengthening
                Communities
              </p>
              <p className="mx-auto max-w-3xl text-green-50 text-lg">
                Veteran-owned company operating on a simple but powerful
                principle:
                <strong className="text-white">
                  {' '}
                  every client is a partner, every project serves the community
                </strong>
              </p>
            </div>
          </FadeInWhenVisible>
        </div>
      </section>

      {/* Partnership Philosophy Section */}
      <section className="bg-white py-16">
        <div className="mx-auto px-4 container">
          <FadeInWhenVisible>
            <div className="mx-auto max-w-4xl">
              <div className="mb-12 text-center">
                <MaterialIcon
                  icon="handshake"
                  className="mb-4 text-[#386851] text-6xl"
                />
                <h2 className="mb-4 font-bold text-gray-900 text-4xl">
                  Our Partnership Philosophy
                </h2>
                <p className="text-gray-600 text-xl">
                  At MH Construction, we don't just build structures - we build
                  relationships.
                </p>
              </div>

              <div className="gap-8 grid md:grid-cols-2 mb-12">
                <Card className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <MaterialIcon
                      icon="favorite"
                      className="mb-3 text-red-500 text-4xl"
                    />
                    <CardTitle>Client Partnership Approach</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      <li className="flex items-start">
                        <MaterialIcon
                          icon="check_circle"
                          className="flex-shrink-0 mt-1 mr-2 text-green-500"
                        />
                        <span>
                          <strong>Transparent Communication:</strong> Open
                          dialogue from day one
                        </span>
                      </li>
                      <li className="flex items-start">
                        <MaterialIcon
                          icon="check_circle"
                          className="flex-shrink-0 mt-1 mr-2 text-green-500"
                        />
                        <span>
                          <strong>Collaborative Planning:</strong> Your vision +
                          our expertise
                        </span>
                      </li>
                      <li className="flex items-start">
                        <MaterialIcon
                          icon="check_circle"
                          className="flex-shrink-0 mt-1 mr-2 text-green-500"
                        />
                        <span>
                          <strong>Honest Pricing:</strong> No surprises, no
                          hidden costs
                        </span>
                      </li>
                      <li className="flex items-start">
                        <MaterialIcon
                          icon="check_circle"
                          className="flex-shrink-0 mt-1 mr-2 text-green-500"
                        />
                        <span>
                          <strong>Shared Success:</strong> Your satisfaction is
                          our success
                        </span>
                      </li>
                      <li className="flex items-start">
                        <MaterialIcon
                          icon="check_circle"
                          className="flex-shrink-0 mt-1 mr-2 text-green-500"
                        />
                        <span>
                          <strong>Long-term Relationship:</strong> Partners
                          beyond project completion
                        </span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>

                <Card className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <MaterialIcon
                      icon="public"
                      className="mb-3 text-[#7c9885] text-4xl"
                    />
                    <CardTitle>Community-Centered Culture</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="mb-4 text-gray-700">
                      <strong>
                        MH Construction exists to strengthen Pacific Northwest
                        communities.
                      </strong>{' '}
                      Every project contributes to a stronger, more connected
                      region.
                    </p>
                    <ul className="space-y-3">
                      <li className="flex items-start">
                        <MaterialIcon
                          icon="location_city"
                          className="flex-shrink-0 mt-1 mr-2 text-blue-500"
                        />
                        <span>
                          <strong>Local Investment:</strong> Hiring locally,
                          supporting regional suppliers
                        </span>
                      </li>
                      <li className="flex items-start">
                        <MaterialIcon
                          icon="military_tech"
                          className="flex-shrink-0 mt-1 mr-2 text-blue-500"
                        />
                        <span>
                          <strong>Veteran Support:</strong> Creating
                          opportunities for military families
                        </span>
                      </li>
                      <li className="flex items-start">
                        <MaterialIcon
                          icon="eco"
                          className="flex-shrink-0 mt-1 mr-2 text-blue-500"
                        />
                        <span>
                          <strong>Environmental Stewardship:</strong>{' '}
                          Sustainable practices for future communities
                        </span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </div>

              <div className="bg-green-50 p-8 border-[#386851] border-l-4 rounded-lg">
                <MaterialIcon
                  icon="format_quote"
                  className="mb-4 text-[#386851] text-4xl"
                />
                <p className="mb-4 text-gray-800 text-lg italic">
                  "When you choose MH Construction, you're not hiring a
                  contractor - you're gaining a partner who genuinely cares
                  about your success and our community's future."
                </p>
                <p className="font-semibold text-gray-700">
                  - Jeremy Thamert, Owner & General Manager
                </p>
              </div>
            </div>
          </FadeInWhenVisible>
        </div>
      </section>

      {/* Company Stats */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 py-16 text-white">
        <div className="mx-auto px-4 container">
          <FadeInWhenVisible>
            <h2 className="mb-12 font-bold text-4xl text-center">
              Our Track Record
            </h2>
            <div className="gap-8 grid grid-cols-2 md:grid-cols-4 mx-auto max-w-5xl">
              {companyStats.map((stat, index) => (
                <HoverScale key={index}>
                  <div className="text-center">
                    <MaterialIcon
                      icon={stat.iconName}
                      className="mb-4 text-blue-200 text-5xl"
                    />
                    <div className="mb-2 font-bold text-4xl">{stat.value}</div>
                    <div className="text-blue-100">{stat.label}</div>
                  </div>
                </HoverScale>
              ))}
            </div>
          </FadeInWhenVisible>
        </div>
      </section>

      {/* Core Values Section */}
      <section className="bg-white py-16">
        <div className="mx-auto px-4 container">
          <FadeInWhenVisible>
            <div className="mb-12 text-center">
              <h2 className="mb-4 font-bold text-gray-900 text-4xl">
                Our 6 Core Values
              </h2>
              <p className="mx-auto max-w-3xl text-gray-600 text-xl">
                Trust-Centered Philosophy: "Trust as our ultimate goal and
                measurable company foundation"
              </p>
            </div>
          </FadeInWhenVisible>

          <StaggeredFadeIn className="gap-8 grid md:grid-cols-2 lg:grid-cols-3 mx-auto max-w-7xl">
            {coreValues.map((value, index) => (
              <Card
                key={index}
                className="hover:shadow-xl transition-all hover:-translate-y-1"
              >
                <CardHeader>
                  <MaterialIcon
                    icon={value.iconName}
                    className="mb-4 text-[#386851] text-5xl"
                  />
                  <CardTitle className="mb-2 text-2xl">{value.title}</CardTitle>
                  <p className="font-semibold text-gray-600 text-sm">
                    {value.subtitle}
                  </p>
                </CardHeader>
                <CardContent>
                  <p className="mb-4 text-gray-700">{value.description}</p>
                  <div className="pt-4 border-t">
                    <p className="mb-2 font-semibold text-gray-900 text-sm">
                      In Practice:
                    </p>
                    <ul className="space-y-2">
                      {value.practices.map((practice, pIndex) => (
                        <li key={pIndex} className="flex items-start text-sm">
                          <MaterialIcon
                            icon="arrow_right"
                            className="flex-shrink-0 mt-0.5 mr-2 text-blue-500 text-lg"
                          />
                          <span className="text-gray-600">{practice}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              </Card>
            ))}
          </StaggeredFadeIn>
        </div>
      </section>

      {/* Why Values Matter Section */}
      <section className="bg-gray-50 py-16">
        <div className="mx-auto px-4 container">
          <FadeInWhenVisible>
            <div className="mx-auto max-w-5xl">
              <h2 className="mb-12 font-bold text-gray-900 text-4xl text-center">
                Why Our Values Matter
              </h2>

              <div className="gap-8 grid md:grid-cols-3">
                <Card className="bg-white hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <MaterialIcon
                      icon="people"
                      className="mb-4 text-[#386851] text-5xl"
                    />
                    <CardTitle>For Our Clients</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3 text-gray-700">
                      <li className="flex items-start">
                        <MaterialIcon
                          icon="check"
                          className="mt-1 mr-2 text-green-500"
                        />
                        <span>Predictable, consistent experience</span>
                      </li>
                      <li className="flex items-start">
                        <MaterialIcon
                          icon="check"
                          className="mt-1 mr-2 text-green-500"
                        />
                        <span>Peace of mind and confidence</span>
                      </li>
                      <li className="flex items-start">
                        <MaterialIcon
                          icon="check"
                          className="mt-1 mr-2 text-green-500"
                        />
                        <span>Long-term partnership</span>
                      </li>
                      <li className="flex items-start">
                        <MaterialIcon
                          icon="check"
                          className="mt-1 mr-2 text-green-500"
                        />
                        <span>Community impact</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>

                <Card className="bg-white hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <MaterialIcon
                      icon="location_city"
                      className="mb-4 text-[#7c9885] text-5xl"
                    />
                    <CardTitle>For Our Community</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3 text-gray-700">
                      <li className="flex items-start">
                        <MaterialIcon
                          icon="check"
                          className="mt-1 mr-2 text-green-500"
                        />
                        <span>Economic development</span>
                      </li>
                      <li className="flex items-start">
                        <MaterialIcon
                          icon="check"
                          className="mt-1 mr-2 text-green-500"
                        />
                        <span>Quality standards</span>
                      </li>
                      <li className="flex items-start">
                        <MaterialIcon
                          icon="check"
                          className="mt-1 mr-2 text-green-500"
                        />
                        <span>Veteran support</span>
                      </li>
                      <li className="flex items-start">
                        <MaterialIcon
                          icon="check"
                          className="mt-1 mr-2 text-green-500"
                        />
                        <span>Sustainable growth</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>

                <Card className="bg-white hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <MaterialIcon
                      icon="engineering"
                      className="mb-4 text-orange-600 text-5xl"
                    />
                    <CardTitle>For Our Team</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3 text-gray-700">
                      <li className="flex items-start">
                        <MaterialIcon
                          icon="check"
                          className="mt-1 mr-2 text-green-500"
                        />
                        <span>Professional pride</span>
                      </li>
                      <li className="flex items-start">
                        <MaterialIcon
                          icon="check"
                          className="mt-1 mr-2 text-green-500"
                        />
                        <span>Clear standards</span>
                      </li>
                      <li className="flex items-start">
                        <MaterialIcon
                          icon="check"
                          className="mt-1 mr-2 text-green-500"
                        />
                        <span>Personal growth</span>
                      </li>
                      <li className="flex items-start">
                        <MaterialIcon
                          icon="check"
                          className="mt-1 mr-2 text-green-500"
                        />
                        <span>Community connection</span>
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
      <section className="bg-gradient-to-r from-blue-700 to-blue-900 py-16 text-white">
        <div className="mx-auto px-4 container">
          <FadeInWhenVisible>
            <div className="mx-auto max-w-3xl text-center">
              <MaterialIcon
                icon="construction"
                className="mb-6 text-blue-200 text-6xl"
              />
              <h2 className="mb-6 font-bold text-4xl">
                Ready to Start Your Project?
              </h2>
              <p className="mb-8 text-blue-100 text-xl">
                Partner with a team that has made Trust our ultimate goal. Let's
                discuss your vision and build something remarkable together.
              </p>
              <div className="flex sm:flex-row flex-col justify-center gap-4">
                <Link href="/contact">
                  <Button
                    size="lg"
                    className="bg-white hover:bg-blue-50 text-blue-900"
                  >
                    <MaterialIcon icon="phone" className="mr-2" />
                    Contact Us Today
                  </Button>
                </Link>
                <Link href="/services">
                  <Button
                    size="lg"
                    variant="outline"
                    className="hover:bg-blue-800 border-white text-white"
                  >
                    <MaterialIcon icon="build" className="mr-2" />
                    View Our Services
                  </Button>
                </Link>
              </div>
              <p className="mt-6 text-blue-200">
                <MaterialIcon icon="phone" className="inline mr-2" />
                (509) 308-6489 | 3111 N. Capital Ave., Pasco, WA 99301
              </p>
            </div>
          </FadeInWhenVisible>
        </div>
      </section>
    </div>
  )
}
