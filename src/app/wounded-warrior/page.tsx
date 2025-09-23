'use client'

import React from 'react'
import Link from 'next/link'
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '../../components/ui'
import {
  generateSEOMetadata,
  generateOrganizationStructuredData,
  StructuredData,
} from '../../components/seo/seo-meta'
import {
  ShieldIcon,
  StarIcon,
  HammerIcon,
  CheckIcon,
  UserIcon,
  PhoneIcon,
  EmailIcon,
  CalendarIcon,
} from '../../components/icons/SharpDuotoneIcons'
import {
  FadeInWhenVisible,
  StaggeredFadeIn,
  HoverScale,
} from '../../components/animations/FramerMotionComponents'

export default function WoundedWarriorPage() {
  const services = [
    {
      icon: ShieldIcon,
      title: 'Accessibility Modifications',
      description:
        'Free home modifications for wheelchair access, grab bars, ramps, and mobility improvements.',
      features: [
        'Wheelchair accessible bathrooms',
        'Entry ramps and door widening',
        'Grab bars and safety installations',
        'Kitchen accessibility modifications',
        'Stair lifts and elevators',
      ],
      eligibility: 'Combat-injured veterans',
      cost: 'Free up to $25,000',
    },
    {
      icon: HammerIcon,
      title: 'Emergency Repairs',
      description:
        'Priority emergency repair services for wounded veterans and their families.',
      features: [
        'Plumbing and electrical emergencies',
        'Roof and structural repairs',
        'HVAC system repairs',
        'Security system installations',
        'Urgent safety modifications',
      ],
      eligibility: 'Wounded veterans with urgent needs',
      cost: 'Heavily discounted rates',
    },
    {
      icon: UserIcon,
      title: 'Veteran Family Support',
      description:
        'Comprehensive construction support for families of wounded warriors.',
      features: [
        'Caregiver space modifications',
        'Multi-generational home updates',
        'Therapy room installations',
        'Medical equipment accommodations',
        'Family gathering space improvements',
      ],
      eligibility: 'Families of wounded veterans',
      cost: '50% discount on services',
    },
    {
      icon: CalendarIcon,
      title: 'Priority Scheduling',
      description:
        'Fast-track scheduling and expedited project completion for all veteran services.',
      features: [
        '24-48 hour response time',
        'Dedicated veteran project manager',
        'Streamlined permit processing',
        'Coordinated care team support',
        'Flexible scheduling around treatments',
      ],
      eligibility: 'All program participants',
      cost: 'Included in all services',
    },
  ]

  const eligibilityRequirements = [
    {
      title: 'Combat-Related Injury',
      description: 'Service-connected disability rating of 30% or higher',
      icon: ShieldIcon,
    },
    {
      title: 'Honorable Discharge',
      description: 'Honorable or general discharge from any branch of service',
      icon: StarIcon,
    },
    {
      title: 'Service Area',
      description:
        'Located within our Pacific Northwest service area (WA, OR, ID)',
      icon: CheckIcon,
    },
    {
      title: 'Need Assessment',
      description:
        'Documented need for accessibility modifications or emergency repairs',
      icon: UserIcon,
    },
  ]

  const testimonials = [
    {
      name: 'SGT Michael Rodriguez, USMC',
      service: 'Iraq War Veteran',
      quote:
        'MH Construction transformed my home into a place where I can live independently again. The bathroom renovation with roll-in shower changed my life.',
      project: 'Wheelchair Accessibility Renovation',
      rating: 5,
    },
    {
      name: 'CPL Sarah Johnson, USA',
      service: 'Afghanistan Veteran',
      quote:
        'When our heating system failed in winter, MH Construction was there within hours. They understand the urgency wounded veterans face.',
      project: 'Emergency HVAC Repair',
      rating: 5,
    },
    {
      name: 'LCPL David Chen, USMC',
      service: 'Combat Engineer',
      quote:
        'The team at MH Construction treated me with the respect and dignity every veteran deserves. Professional, caring, and skilled.',
      project: 'Kitchen Accessibility Modifications',
      rating: 5,
    },
  ]

  const stats = [
    {
      number: '150+',
      label: 'Veterans Served',
      description: 'Wounded warriors helped since program launch',
    },
    {
      number: '$2.1M',
      label: 'Services Donated',
      description: 'Total value of free and discounted services',
    },
    {
      number: '48hrs',
      label: 'Average Response',
      description: 'Response time for emergency services',
    },
    {
      number: '100%',
      label: 'Satisfaction Rate',
      description: 'Veteran family satisfaction with our services',
    },
  ]

  return (
    <>
      {/* SEO Structured Data */}
      <StructuredData data={generateOrganizationStructuredData()} />

      {/* Hero Section */}
      <section className="relative bg-white dark:bg-gray-900 h-screen hero-section">
        {/* Background Elements */}
        <div className="absolute inset-0 bg-gradient-to-br from-red-50/30 dark:from-red-900/10 to-transparent"></div>
        <div className="top-20 right-20 absolute bg-veteran-red/5 blur-3xl rounded-full w-32 h-32"></div>
        <div className="bottom-20 left-20 absolute bg-blue-500/5 blur-3xl rounded-full w-40 h-40"></div>

        <div className="z-10 relative flex justify-center items-center mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-8 max-w-7xl h-full">
          <FadeInWhenVisible className="w-full text-center">
            {/* Hero Badge */}
            <div className="inline-flex items-center bg-veteran-red/10 dark:bg-veteran-red/20 shadow-lg backdrop-blur-sm mb-8 px-6 py-3 border border-veteran-red/20 dark:border-veteran-red/30 rounded-full">
              <ShieldIcon
                size="sm"
                primaryColor="currentColor"
                className="text-veteran-red dark:text-red-400"
              />
              <span className="ml-3 font-bold text-veteran-red dark:text-red-400 text-xs uppercase tracking-wider">
                Supporting Those Who Served
              </span>
            </div>

            {/* Hero Title */}
            <h1 className="mb-6 pb-2 font-black text-gray-900 dark:text-white text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl leading-relaxed tracking-tighter hero-title">
              <span className="block mb-3 font-semibold text-gray-700 dark:text-gray-300 text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl tracking-tight">
                Wounded Warrior
              </span>
              <span className="block bg-clip-text bg-gradient-to-r from-veteran-red via-red-600 to-veteran-red drop-shadow-sm font-black text-transparent">
                Support Program
              </span>
            </h1>

            {/* Hero Description */}
            <p className="mx-auto mb-8 max-w-4xl font-light text-gray-600 dark:text-gray-300 text-xl sm:text-2xl md:text-3xl lg:text-4xl leading-relaxed tracking-wide">
              <span className="font-medium text-gray-800 dark:text-gray-200">
                Free accessibility modifications
              </span>{' '}
              and{' '}
              <span className="bg-clip-text bg-gradient-to-r from-veteran-red to-red-600 font-semibold text-transparent">
                priority emergency services
              </span>{' '}
              for wounded veterans and their families.
            </p>

            {/* CTA Buttons */}
            <div className="flex sm:flex-row flex-col justify-center items-center gap-8 mb-8">
              <Button
                variant="primary"
                size="xl"
                className="bg-veteran-red hover:bg-red-700 shadow-xl border-veteran-red"
              >
                <PhoneIcon
                  size="sm"
                  primaryColor="currentColor"
                  className="mr-3"
                />
                <span className="z-10 relative tracking-wide">
                  Call Veteran Hotline
                </span>
              </Button>
              <Link href="/booking">
                <HoverScale>
                  <Button variant="outline" size="xl" className="shadow-xl">
                    <CalendarIcon
                      size="sm"
                      primaryColor="currentColor"
                      className="mr-3"
                    />
                    <span className="z-10 relative tracking-wide">
                      Schedule Assessment
                    </span>
                  </Button>
                </HoverScale>
              </Link>
            </div>

            {/* Trust Indicators */}
            <StaggeredFadeIn className="flex flex-wrap justify-center items-center gap-10 font-medium text-gray-700 dark:text-gray-300 text-base">
              {[
                'Free Accessibility Modifications',
                'Emergency Priority Response',
                'Veteran-Owned & Operated',
                'Combat Veteran Staff',
              ].map((indicator, index) => (
                <div
                  key={index}
                  className="flex items-center bg-white/10 dark:bg-gray-800/30 backdrop-blur-sm px-4 py-2 border border-gray-200/20 dark:border-gray-700/30 rounded-full"
                >
                  <CheckIcon
                    size="sm"
                    primaryColor="currentColor"
                    className="mr-3 text-green-600 dark:text-green-400"
                  />
                  <span className="tracking-wide">{indicator}</span>
                </div>
              ))}
            </StaggeredFadeIn>
          </FadeInWhenVisible>
        </div>
      </section>

      {/* Program Services Section */}
      <section className="relative bg-white dark:bg-gray-900 py-20 lg:py-32 xl:py-40 services-section">
        <div className="absolute inset-0 bg-gradient-to-b from-gray-50/50 dark:from-gray-800/30 to-transparent"></div>
        <div className="top-20 right-20 absolute bg-veteran-red/5 blur-3xl rounded-full w-32 h-32"></div>

        <div className="relative mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <FadeInWhenVisible className="mb-24 lg:mb-32 text-center">
            <div className="inline-flex items-center bg-veteran-red/10 dark:bg-veteran-red/20 shadow-lg mb-10 px-8 py-4 border border-veteran-red/20 rounded-full">
              <HammerIcon size="md" primaryColor="var(--veteran-red)" />
              <span className="ml-4 font-black text-veteran-red text-sm uppercase tracking-wider">
                Veteran Support Services
              </span>
            </div>

            <h2 className="mb-10 font-black text-gray-900 dark:text-gray-100 text-5xl sm:text-6xl md:text-7xl lg:text-8xl leading-tight tracking-tighter">
              <span className="block mb-4 font-semibold text-gray-700 dark:text-gray-300 text-3xl sm:text-4xl md:text-5xl lg:text-6xl tracking-tight">
                Comprehensive Support for
              </span>
              <span className="block bg-clip-text bg-gradient-to-r from-veteran-red via-red-600 to-veteran-red drop-shadow-sm font-black text-transparent">
                Wounded Warriors
              </span>
            </h2>
          </FadeInWhenVisible>

          <StaggeredFadeIn className="gap-8 grid grid-cols-1 lg:grid-cols-2">
            {services.map((service, index) => (
              <HoverScale key={index}>
                <Card className="group hover:shadow-2xl border-gray-200/30 hover:border-veteran-red/30 h-full transition-all duration-500">
                  <CardHeader className="pb-4">
                    <div className="flex items-center mb-4">
                      <div className="bg-gradient-to-br from-veteran-red to-red-600 shadow-lg p-4 rounded-xl group-hover:scale-110 transition-transform duration-300">
                        <service.icon
                          size="lg"
                          primaryColor="white"
                          className="text-white"
                        />
                      </div>
                      <div className="ml-4">
                        <CardTitle className="font-bold text-gray-900 dark:text-gray-100 group-hover:text-veteran-red text-2xl transition-colors">
                          {service.title}
                        </CardTitle>
                        <div className="flex gap-4 mt-2">
                          <span className="bg-green-100 dark:bg-green-900/30 px-3 py-1 rounded-full font-medium text-green-800 dark:text-green-300 text-sm">
                            {service.cost}
                          </span>
                          <span className="bg-blue-100 dark:bg-blue-900/30 px-3 py-1 rounded-full font-medium text-blue-800 dark:text-blue-300 text-sm">
                            {service.eligibility}
                          </span>
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="mb-6 font-light text-gray-600 dark:text-gray-300 text-lg leading-relaxed">
                      {service.description}
                    </p>
                    <div className="space-y-3">
                      <h4 className="font-semibold text-gray-900 dark:text-gray-100 text-lg">
                        Included Services:
                      </h4>
                      <ul className="space-y-2">
                        {service.features.map((feature, idx) => (
                          <li
                            key={idx}
                            className="flex items-center text-gray-700 dark:text-gray-300"
                          >
                            <CheckIcon
                              size="sm"
                              primaryColor="currentColor"
                              className="flex-shrink-0 mr-3 text-green-600 dark:text-green-400"
                            />
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              </HoverScale>
            ))}
          </StaggeredFadeIn>
        </div>
      </section>

      {/* Eligibility Section */}
      <section className="relative bg-gradient-to-b from-gray-50 dark:from-gray-800 to-white dark:to-gray-900 py-20 lg:py-32 xl:py-40 eligibility-section">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_75%,rgba(220,38,38,0.05)_0%,transparent_50%)] opacity-60"></div>
        <div className="right-20 bottom-20 absolute bg-veteran-red/5 blur-3xl rounded-full w-40 h-40"></div>

        <div className="relative mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <FadeInWhenVisible className="mb-16 text-center">
            <div className="inline-flex items-center bg-blue-500/10 dark:bg-blue-500/20 shadow-lg mb-10 px-8 py-4 border border-blue-500/20 rounded-full">
              <CheckIcon size="md" primaryColor="var(--blue-500)" />
              <span className="ml-4 font-black text-blue-500 text-sm uppercase tracking-wider">
                Program Eligibility
              </span>
            </div>

            <h2 className="mb-6 font-black text-gray-900 dark:text-gray-100 text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-tight tracking-tighter">
              <span className="bg-clip-text bg-gradient-to-r from-blue-500 to-veteran-red drop-shadow-sm font-black text-transparent">
                Who Qualifies
              </span>
            </h2>
            <p className="mx-auto max-w-3xl font-light text-gray-600 dark:text-gray-300 text-xl leading-relaxed">
              Our program is designed to serve wounded warriors and their
              families who need accessibility modifications or emergency
              construction services.
            </p>
          </FadeInWhenVisible>

          <StaggeredFadeIn className="gap-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
            {eligibilityRequirements.map((requirement, index) => (
              <HoverScale key={index}>
                <Card className="hover:shadow-xl border-gray-200/30 hover:border-blue-500/30 h-full text-center transition-all duration-500">
                  <CardContent className="p-8">
                    <div className="flex justify-center mb-6">
                      <div className="bg-gradient-to-br from-blue-500 to-blue-600 shadow-lg p-6 rounded-2xl">
                        <requirement.icon
                          size="xl"
                          primaryColor="white"
                          className="text-white"
                        />
                      </div>
                    </div>
                    <h3 className="mb-4 font-bold text-gray-900 dark:text-gray-100 text-xl">
                      {requirement.title}
                    </h3>
                    <p className="font-light text-gray-600 dark:text-gray-300 text-base leading-relaxed">
                      {requirement.description}
                    </p>
                  </CardContent>
                </Card>
              </HoverScale>
            ))}
          </StaggeredFadeIn>

          <FadeInWhenVisible className="mt-16 text-center">
            <div className="bg-gradient-to-r from-blue-50 dark:from-blue-900/20 to-red-50 dark:to-red-900/20 p-8 border border-blue-200/30 dark:border-blue-700/30 rounded-2xl">
              <h3 className="mb-4 font-bold text-gray-900 dark:text-gray-100 text-2xl">
                Not sure if you qualify?
              </h3>
              <p className="mb-6 text-gray-700 dark:text-gray-300 text-lg">
                Contact our veteran support team for a free eligibility
                assessment. We're here to help.
              </p>
              <div className="flex sm:flex-row flex-col justify-center gap-4">
                <Button
                  variant="primary"
                  size="lg"
                  className="bg-veteran-red hover:bg-red-700 border-veteran-red"
                >
                  <PhoneIcon
                    size="sm"
                    primaryColor="currentColor"
                    className="mr-2"
                  />
                  Call (509) 308-6489
                </Button>
                <Button variant="outline" size="lg">
                  <EmailIcon
                    size="sm"
                    primaryColor="currentColor"
                    className="mr-2"
                  />
                  Email Veteran Team
                </Button>
              </div>
            </div>
          </FadeInWhenVisible>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="relative bg-gradient-to-r from-veteran-red to-red-600 py-20 lg:py-32 stats-section">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.1)_0%,transparent_50%)]"></div>

        <div className="relative mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <FadeInWhenVisible className="mb-16 text-center">
            <h2 className="mb-6 font-black text-white text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-tight tracking-tighter">
              Program Impact
            </h2>
            <p className="mx-auto max-w-3xl font-light text-red-100 text-xl leading-relaxed">
              Making a real difference in the lives of wounded warriors and
              their families
            </p>
          </FadeInWhenVisible>

          <StaggeredFadeIn className="gap-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat, index) => (
              <HoverScale key={index}>
                <div className="bg-white/10 backdrop-blur-sm p-8 border border-white/20 rounded-2xl text-center">
                  <div className="mb-4 font-black text-white text-5xl lg:text-6xl">
                    {stat.number}
                  </div>
                  <h3 className="mb-2 font-bold text-red-100 text-xl">
                    {stat.label}
                  </h3>
                  <p className="font-light text-red-200 text-base">
                    {stat.description}
                  </p>
                </div>
              </HoverScale>
            ))}
          </StaggeredFadeIn>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="relative bg-white dark:bg-gray-900 py-20 lg:py-32 xl:py-40 testimonials-section">
        <div className="absolute inset-0 bg-gradient-to-b from-gray-50/50 dark:from-gray-800/30 to-transparent"></div>

        <div className="relative mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <FadeInWhenVisible className="mb-24 lg:mb-32 text-center">
            <div className="inline-flex items-center bg-yellow-500/10 dark:bg-yellow-500/20 shadow-lg mb-10 px-8 py-4 border border-yellow-500/20 rounded-full">
              <StarIcon size="md" primaryColor="var(--yellow-500)" />
              <span className="ml-4 font-black text-yellow-600 dark:text-yellow-400 text-sm uppercase tracking-wider">
                Veteran Stories
              </span>
            </div>

            <h2 className="mb-10 font-black text-gray-900 dark:text-gray-100 text-5xl sm:text-6xl md:text-7xl lg:text-8xl leading-tight tracking-tighter">
              <span className="block mb-4 font-semibold text-gray-700 dark:text-gray-300 text-3xl sm:text-4xl md:text-5xl lg:text-6xl tracking-tight">
                Stories from
              </span>
              <span className="block bg-clip-text bg-gradient-to-r from-yellow-600 via-veteran-red to-yellow-600 drop-shadow-sm font-black text-transparent">
                Those We've Served
              </span>
            </h2>
          </FadeInWhenVisible>

          <StaggeredFadeIn className="gap-8 grid grid-cols-1 lg:grid-cols-3">
            {testimonials.map((testimonial, index) => (
              <HoverScale key={index}>
                <Card className="hover:shadow-xl border-gray-200/30 hover:border-yellow-500/30 h-full transition-all duration-500">
                  <CardContent className="p-8">
                    <div className="flex items-center mb-6">
                      <div className="flex space-x-1">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <StarIcon
                            key={i}
                            size="sm"
                            primaryColor="var(--yellow-500)"
                            className="text-yellow-500"
                          />
                        ))}
                      </div>
                      <span className="bg-veteran-red/10 ml-3 px-3 py-1 rounded-full font-medium text-veteran-red text-sm">
                        {testimonial.project}
                      </span>
                    </div>
                    <blockquote className="mb-6 font-light text-gray-700 dark:text-gray-300 text-lg italic leading-relaxed">
                      "{testimonial.quote}"
                    </blockquote>
                    <div>
                      <div className="font-bold text-gray-900 dark:text-gray-100 text-lg">
                        {testimonial.name}
                      </div>
                      <div className="font-medium text-gray-600 dark:text-gray-400">
                        {testimonial.service}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </HoverScale>
            ))}
          </StaggeredFadeIn>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="relative bg-gradient-to-r from-blue-500 to-veteran-red py-20 lg:py-32 cta-section">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.1)_0%,transparent_50%)]"></div>

        <div className="relative mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <FadeInWhenVisible className="text-center">
            <h2 className="mb-8 font-black text-white text-5xl sm:text-6xl md:text-7xl lg:text-8xl leading-tight tracking-tighter">
              <span className="block mb-4 font-semibold text-blue-100 text-3xl sm:text-4xl md:text-5xl lg:text-6xl tracking-tight">
                Ready to Get
              </span>
              <span className="block drop-shadow-lg">
                The Help You Deserve?
              </span>
            </h2>

            <p className="mx-auto mb-12 max-w-4xl font-light text-blue-100 text-xl md:text-2xl lg:text-3xl leading-relaxed tracking-wide">
              Contact our veteran support team today. We're standing by to help
              you and your family with the construction services you need.
            </p>

            <div className="flex sm:flex-row flex-col justify-center items-center gap-8">
              <HoverScale>
                <Button
                  variant="secondary"
                  size="xl"
                  className="bg-white hover:bg-gray-100 shadow-xl text-veteran-red"
                >
                  <PhoneIcon
                    size="sm"
                    primaryColor="currentColor"
                    className="mr-3"
                  />
                  <span className="z-10 relative tracking-wide">
                    Call Veteran Hotline
                  </span>
                </Button>
              </HoverScale>
              <Link href="/booking">
                <HoverScale>
                  <Button
                    variant="outline"
                    size="xl"
                    className="hover:bg-white/10 shadow-xl border-white text-white"
                  >
                    <CalendarIcon
                      size="sm"
                      primaryColor="currentColor"
                      className="mr-3"
                    />
                    <span className="z-10 relative tracking-wide">
                      Schedule Assessment
                    </span>
                  </Button>
                </HoverScale>
              </Link>
            </div>

            <div className="mt-16 text-center">
              <p className="mb-4 font-semibold text-white text-lg">
                Emergency Services Available 24/7
              </p>
              <p className="font-light text-blue-100 text-base">
                Call (509) 308-6489 and press 1 for veteran emergency services
              </p>
            </div>
          </FadeInWhenVisible>
        </div>
      </section>
    </>
  )
}
