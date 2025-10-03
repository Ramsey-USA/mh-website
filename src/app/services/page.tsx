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

// Core Services Data
const coreServices = [
  {
    iconName: 'engineering',
    title: 'Commercial Construction Management',
    subtitle: 'Streamline Your Project Success',
    description:
      'Planning a new commercial building demands intricate details and expert oversight. Put your project in the right hands with comprehensive Construction Management services throughout the Tri-Cities area. Our commitment to thorough communication and upfront planning prevents costly on-the-fly decisions later on.',
    features: [
      'Commercial Businesses (Retail, Offices)',
      'Medical Facilities',
      'Industrial Buildings',
      'Churches & Religious Facilities',
      'Wineries & Vineyards',
    ],
    benefits: [
      'Exceptional client experience from start to finish',
      'Streamlined process with upfront planning',
      'Expert oversight and intricate detail management',
    ],
    ctaText:
      'Call 509-308-6489 today to take the first step toward your new building construction.',
  },
  {
    iconName: 'architecture',
    title: 'Master Planning',
    subtitle: 'Pre-Construction Excellence',
    description:
      "We're passionate about transforming your vision into reality through detailed Master Planning. We strategize and coordinate every component of your building construction from concept through the finishing touches. Our team works closely with you to prevent last-minute changes and scope creep in later stages.",
    features: [
      'Building Location and Surrounding Infrastructure',
      'Local and State Building Codes (WA, OR, ID)',
      'Detailed Budget Constraints and Cost Control',
      'Project Timeline and Sequencing',
      'Owner Design Preferences',
    ],
    benefits: [
      'Zero gaps in scope coverage',
      'Comprehensive planning prevents changes',
      'Realistic timelines and expectations',
    ],
  },
  {
    iconName: 'inventory',
    title: 'Procurement & Vendor Management',
    subtitle: 'Reliable Material Sourcing',
    description:
      'Navigating the logistics of construction requires extensive planning and coordination. We specialize in sourcing quality materials tailored to your project goals. Our reliable Master Planning gives vendors the advanced notice necessary to streamline procurement and proactively manage long lead item delays.',
    features: [
      'Material Sourcing and Vetting',
      'Supplier Management and Communication',
      'Budget Negotiation and Pricing',
      'Purchase Orders and Documentation',
      'Contract Management',
      'Coordination of Deliveries',
    ],
    benefits: [
      'Meticulous attention to detail',
      'Timely delivery and installation',
      'Proactive delay management',
    ],
  },
  {
    iconName: 'fact_check',
    title: 'Constructability & Budget Control',
    subtitle: 'Proactive Feasibility Analysis',
    description:
      "Is your project possible? And if so, how can it be cost-effective? We're committed to improving project planning and execution by conducting early-stage analysis of construction feasibility and cost considerations. We offer these critical services to clients throughout Washington, Oregon, and Idaho.",
    features: [
      'Most efficient construction sequence and assembly',
      'Logistics for specialty items (equipment and infrastructure)',
      'Precise parts ordering, timing, and cost control',
    ],
    benefits: [
      'Collaboration with key subcontractors',
      'Eliminates guesswork early',
      'Cost-effective project execution',
    ],
  },
  {
    iconName: 'view_module',
    title: 'Modularization',
    subtitle: 'Advanced Subproject Management',
    description:
      'Project Modularization involves strategically dividing a project into smaller, more manageable subprojects. This process simplifies design, execution, and maintenance. We focus on Subproject Management to help clients complete large, complex projects more efficiently and consistently meet schedules.',
    features: [
      'Streamlined transitions between construction phases',
      'Improved resource allocation and communication efficiency',
      'Leverage expertise specifically at each stage',
    ],
    benefits: [
      'New era of project management',
      'Team of phase specialists vs. single PM',
      'Increased efficiency for complex builds',
    ],
  },
]

// Specialty Services & Markets
const specialtyServices = [
  {
    iconName: 'business',
    title: 'Markets',
    subtitle: 'Diverse Business Solutions',
    description:
      'We complete projects for a wide range of businesses throughout the Tri-Cities (Kennewick, Richland, Pasco) and the wider region. With over 150 years of construction experience, trust us to bring your unique vision to life—from specialty religious facilities to complex industrial centers.',
    markets: [
      'Religious Facilities (Churches, Centers)',
      'Commercial Buildings (Retail, Offices)',
      'Government Buildings and Grant Projects',
      'Educational Buildings (Schools, Training Centers)',
      'Medical Centers and Clinics',
      'Wineries and Vineyards',
    ],
  },
  {
    iconName: 'store',
    title: 'Tenant Improvements',
    subtitle: 'Commercial Space Transformation',
    description:
      "If you've recently purchased a commercial building in the Tri-Cities, we can help you transform it. We have decades of experience providing Tenant Improvement (TI) Services and are licensed to complete commercial renovation projects throughout Washington, Oregon, and Idaho.",
    capabilities: [
      'Recent purchase building conversion',
      'Quick and efficient execution',
      'Vision brought to life',
      'Fast turnaround times',
    ],
    ctaText: 'Call us right away to schedule tenant improvement services.',
  },
  {
    iconName: 'apartment',
    title: 'Commercial New Build-Outs',
    subtitle: 'Build Your Business Right',
    description:
      'Looking for a committed, quality construction partner? We offer comprehensive Commercial Construction Services to business owners throughout Kennewick, WA and the entire Tri-Cities area. Whether you need a small office or a large dealership, we construct a space where your business can thrive.',
    buildTypes: [
      'Retail Construction',
      'Medical Office Construction',
      'Winery Construction',
      'Car Dealership Construction',
      'Boutique & Specialty Spaces',
    ],
    note: 'Using top-grade materials and partnering with the best architects.',
  },
  {
    iconName: 'factory',
    title: 'Light Industrial',
    subtitle: 'Functional & Safe Industrial Facilities',
    description:
      'When choosing a contractor for light industrial facilities, experience is the most important factor. We have been providing Light Industrial Construction Services for over 13 years to business owners in the Tri-Cities and surrounding states. Count on us to create a safe and functional building.',
    features: [
      'Fire Protection Systems',
      'Commercial Doors and Windows',
      'Locker Rooms and Offices',
      'Structural Metal Studs and Sheetrock',
      'Safety Hand Railings',
    ],
    note: 'From warehouses to processing plants—all built to your precise specifications.',
  },
  {
    iconName: 'church',
    title: 'Religious Facilities',
    subtitle: 'Specialized Construction for Sacred Spaces',
    description:
      'We provide dedicated commercial construction services for Churches, Community Centers, and Religious Facilities across Washington, Oregon, and Idaho. We understand that these spaces require thoughtful design, careful budgeting, and a deep respect for the community they serve.',
    capabilities: [
      'Thoughtful design',
      'Careful budgeting',
      'Community respect',
      'Renovation or new construction',
    ],
    note: 'Trust our experienced team to manage every detail of your project.',
  },
]

// Service Areas
const serviceAreas = [
  {
    iconName: 'location_city',
    title: 'Tri-Cities Primary',
    areas: [
      'Pasco, WA',
      'Kennewick, WA',
      'Richland, WA',
      'Benton County',
      'Franklin County',
    ],
  },
  {
    iconName: 'map',
    title: 'Extended Coverage',
    areas: [
      'Washington State',
      'Oregon (Licensed)',
      'Idaho (Licensed)',
      'Pacific Northwest Region',
    ],
  },
]

// Why Choose Us
const whyChooseUs = [
  {
    iconName: 'workspace_premium',
    title: '150+ Years Combined Experience',
    description:
      'Deep expertise across all construction disciplines, refined through decades of successful projects.',
  },
  {
    iconName: 'military_tech',
    title: 'Veteran-Owned Excellence',
    description:
      'Military precision and discipline applied to construction, ensuring attention to detail and reliable execution.',
  },
  {
    iconName: 'handshake',
    title: 'Community Partnership',
    description:
      "We're community partners invested in Pacific Northwest success, not just contractors.",
  },
  {
    iconName: 'verified',
    title: 'Licensed & Insured',
    description:
      'Fully licensed across WA, OR, and ID with comprehensive insurance coverage for your protection.',
  },
  {
    iconName: 'high_quality',
    title: 'Quality Assurance',
    description:
      'Meticulous quality control at every project phase, ensuring work meets our high standards.',
  },
  {
    iconName: 'support_agent',
    title: '24/7 Emergency Support',
    description:
      'Round-the-clock emergency support for urgent construction needs and project issues.',
  },
]

export default function ServicesPage() {
  return (
    <div className="bg-gradient-to-b from-white to-gray-50 min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-brand-primary-dark via-brand-primary to-brand-primary-light py-20 text-white">
        <div className="mx-auto px-4 container">
          <FadeInWhenVisible>
            <div className="mx-auto max-w-4xl text-center">
              <MaterialIcon
                icon="construction"
                size="4xl"
                className="mb-6 text-brand-secondary"
              />
              <h1 className="mb-6 font-bold text-5xl md:text-6xl">
                Our Services
              </h1>
              <p className="mb-8 text-brand-accent text-xl md:text-2xl">
                Expert Construction Management in the Pacific Northwest
              </p>
              <p className="text-white/90 text-lg">
                <strong>Tri-Cities Headquarters:</strong> Pasco, WA |{' '}
                <strong>Service Area:</strong> Washington, Oregon, Idaho
              </p>
            </div>
          </FadeInWhenVisible>
        </div>
      </section>

      {/* Construction Expertise Section */}
      <section className="bg-white dark:bg-gray-900 py-16">
        <div className="mx-auto px-4 container">
          <FadeInWhenVisible>
            <div className="mx-auto mb-12 max-w-4xl text-center">
              <MaterialIcon
                icon="engineering"
                size="3xl"
                className="mb-4 text-brand-primary"
              />
              <h2 className="mb-4 font-bold text-gray-900 dark:text-white text-4xl">
                Commercial Construction Management
              </h2>
              <p className="mb-4 text-gray-700 dark:text-gray-300 text-xl">
                Planning a new commercial building demands intricate details and
                expert oversight. Put your project in the right hands by hiring
                MH Construction for comprehensive Construction Management (CM)
                services throughout the Tri-Cities (Pasco, WA) area.
              </p>
              <div className="bg-brand-primary/5 dark:bg-gray-800 p-6 border-brand-primary border-l-4 rounded-lg">
                <p className="text-gray-800 dark:text-gray-200 text-lg">
                  <strong>Our Priority:</strong> Delivering an exceptional
                  client experience from start to finish. Our commitment to
                  thorough communication and upfront planning is critical to
                  streamlining the process, preventing costly on-the-fly
                  decisions later on.
                </p>
              </div>

              {/* CTA Button */}
              <div className="mt-8">
                <Link href="/contact">
                  <Button size="lg" className="gap-2">
                    <MaterialIcon icon="phone" size="sm" />
                    Call 509-308-6489 Today
                  </Button>
                </Link>
              </div>
            </div>
          </FadeInWhenVisible>
        </div>
      </section>

      {/* Core Services Section */}
      <section className="bg-gray-50 dark:bg-gray-800 py-16">
        <div className="mx-auto px-4 container">
          <FadeInWhenVisible>
            <div className="mb-12 text-center">
              <h2 className="mb-4 font-bold text-gray-900 dark:text-white text-4xl">
                Core Services
              </h2>
              <p className="mx-auto max-w-3xl text-gray-600 dark:text-gray-300 text-xl">
                Comprehensive construction management services designed to bring
                your vision to life
              </p>
            </div>
          </FadeInWhenVisible>

          <StaggeredFadeIn className="gap-8 grid md:grid-cols-2 mx-auto max-w-7xl">
            {coreServices.map((service, index) => (
              <Card
                key={index}
                className="bg-white dark:bg-gray-900 hover:shadow-xl dark:hover:shadow-gray-600/50 border border-gray-200 dark:border-gray-700 transition-all hover:-translate-y-1"
              >
                <CardHeader>
                  <MaterialIcon
                    icon={service.iconName}
                    size="3xl"
                    className="mb-4 text-brand-primary"
                  />
                  <CardTitle className="mb-2 text-gray-900 dark:text-white text-2xl">
                    {service.title}
                  </CardTitle>
                  <p className="font-semibold text-gray-600 dark:text-gray-400 text-sm">
                    {service.subtitle}
                  </p>
                </CardHeader>
                <CardContent>
                  <p className="mb-4 text-gray-700 dark:text-gray-300">
                    {service.description}
                  </p>

                  <div className="mb-4">
                    <p className="mb-2 font-semibold text-gray-900 dark:text-white text-sm">
                      What's Included:
                    </p>
                    <ul className="space-y-2">
                      {service.features.map((feature, fIndex) => (
                        <li key={fIndex} className="flex items-start text-sm">
                          <MaterialIcon
                            icon="check_circle"
                            className="flex-shrink-0 mt-0.5 mr-2 text-brand-accent"
                            size="sm"
                          />
                          <span className="text-gray-600 dark:text-gray-300">
                            {feature}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="pt-4 border-gray-200 dark:border-gray-600 border-t">
                    <p className="mb-2 font-semibold text-gray-900 dark:text-white text-sm">
                      Benefits:
                    </p>
                    <ul className="space-y-2">
                      {service.benefits.map((benefit, bIndex) => (
                        <li key={bIndex} className="flex items-start text-sm">
                          <MaterialIcon
                            icon="stars"
                            className="flex-shrink-0 mt-0.5 mr-2 text-brand-secondary"
                            size="sm"
                          />
                          <span className="text-gray-600 dark:text-gray-300">
                            {benefit}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* CTA Text */}
                  {service.ctaText && (
                    <div className="bg-brand-primary/5 dark:bg-gray-700 mt-4 p-3 border-brand-primary border-l-2 rounded">
                      <p className="font-medium text-gray-800 dark:text-gray-200 text-xs">
                        {service.ctaText}
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </StaggeredFadeIn>
        </div>
      </section>

      {/* Specialty Services Section */}
      <section className="bg-white dark:bg-gray-900 py-16">
        <div className="mx-auto px-4 container">
          <FadeInWhenVisible>
            <div className="mb-12 text-center">
              <h2 className="mb-4 font-bold text-gray-900 dark:text-white text-4xl">
                Specialty Services
              </h2>
              <p className="mx-auto max-w-3xl text-gray-600 dark:text-gray-300 text-xl">
                Diverse commercial construction expertise across the Tri-Cities
                and Pacific Northwest
              </p>
            </div>
          </FadeInWhenVisible>

          <StaggeredFadeIn className="gap-6 grid md:grid-cols-2 lg:grid-cols-3 mx-auto max-w-7xl">
            {specialtyServices.map((service, index) => (
              <Card
                key={index}
                className="bg-white dark:bg-gray-800 hover:shadow-lg dark:hover:shadow-gray-600/50 border border-gray-200 dark:border-gray-700 transition-all hover:-translate-y-1"
              >
                <CardHeader>
                  <MaterialIcon
                    icon={service.iconName}
                    size="2xl"
                    className="mb-3 text-brand-primary"
                  />
                  <CardTitle className="text-gray-900 dark:text-white text-xl">
                    {service.title}
                  </CardTitle>
                  <p className="mt-1 font-semibold text-gray-600 dark:text-gray-400 text-sm">
                    {service.subtitle}
                  </p>
                </CardHeader>
                <CardContent>
                  <p className="mb-4 text-gray-700 dark:text-gray-300 text-sm">
                    {service.description}
                  </p>

                  {/* Markets List */}
                  {service.markets && (
                    <ul className="space-y-2">
                      {service.markets.map((market, mIndex) => (
                        <li key={mIndex} className="flex items-start text-sm">
                          <MaterialIcon
                            icon="check_circle"
                            className="flex-shrink-0 mt-0.5 mr-2 text-brand-accent"
                            size="sm"
                          />
                          <span className="text-gray-600 dark:text-gray-300">
                            {market}
                          </span>
                        </li>
                      ))}
                    </ul>
                  )}

                  {/* Build Types List */}
                  {service.buildTypes && (
                    <>
                      <div className="mb-2 font-semibold text-gray-900 text-sm">
                        What We Build:
                      </div>
                      <ul className="space-y-2 mb-3">
                        {service.buildTypes.map((type, tIndex) => (
                          <li key={tIndex} className="flex items-start text-sm">
                            <MaterialIcon
                              icon="arrow_right"
                              className="flex-shrink-0 mt-0.5 mr-2 text-brand-accent"
                              size="sm"
                            />
                            <span className="text-gray-600">{type}</span>
                          </li>
                        ))}
                      </ul>
                    </>
                  )}

                  {/* Features/Capabilities List */}
                  {service.features && (
                    <>
                      <div className="mb-2 font-semibold text-gray-900 text-sm">
                        High-Quality Materials:
                      </div>
                      <ul className="space-y-2 mb-3">
                        {service.features.map((feature, fIndex) => (
                          <li key={fIndex} className="flex items-start text-sm">
                            <MaterialIcon
                              icon="verified"
                              className="flex-shrink-0 mt-0.5 mr-2 text-brand-secondary"
                              size="sm"
                            />
                            <span className="text-gray-600">{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </>
                  )}

                  {service.capabilities && !service.markets && (
                    <ul className="space-y-2 mb-3">
                      {service.capabilities.map((cap, cIndex) => (
                        <li key={cIndex} className="flex items-start text-sm">
                          <MaterialIcon
                            icon="arrow_right"
                            className="flex-shrink-0 mt-0.5 mr-2 text-brand-accent"
                            size="sm"
                          />
                          <span className="text-gray-600">{cap}</span>
                        </li>
                      ))}
                    </ul>
                  )}

                  {/* Note */}
                  {service.note && (
                    <p className="mt-3 pt-3 border-t text-gray-600 text-xs italic">
                      {service.note}
                    </p>
                  )}

                  {/* CTA */}
                  {service.ctaText && (
                    <div className="bg-brand-primary/5 dark:bg-gray-700 mt-4 p-3 border-brand-primary border-l-2 rounded">
                      <p className="font-medium text-gray-800 dark:text-gray-200 text-xs">
                        {service.ctaText}
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </StaggeredFadeIn>
        </div>
      </section>

      {/* Service Areas Section */}
      <section className="bg-gradient-to-r from-brand-primary to-brand-primary-dark py-16 text-white">
        <div className="mx-auto px-4 container">
          <FadeInWhenVisible>
            <div className="mb-12 text-center">
              <MaterialIcon
                icon="public"
                size="3xl"
                className="mb-4 text-brand-secondary"
              />
              <h2 className="mb-4 font-bold text-4xl">Service Areas</h2>
              <p className="text-brand-accent text-xl">
                Serving the Pacific Northwest with Excellence
              </p>
            </div>

            <div className="gap-8 grid md:grid-cols-2 mx-auto max-w-4xl">
              {serviceAreas.map((area, index) => (
                <Card
                  key={index}
                  className="bg-white/10 hover:bg-white/20 backdrop-blur-sm border-white/20 transition-all"
                >
                  <CardHeader>
                    <MaterialIcon
                      icon={area.iconName}
                      size="2xl"
                      className="mb-3 text-brand-secondary"
                    />
                    <CardTitle className="text-white text-2xl">
                      {area.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {area.areas.map((location, lIndex) => (
                        <li
                          key={lIndex}
                          className="flex items-center text-white/90"
                        >
                          <MaterialIcon
                            icon="location_on"
                            className="mr-2 text-brand-secondary"
                            size="sm"
                          />
                          <span>{location}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>
          </FadeInWhenVisible>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="bg-gray-50 py-16">
        <div className="mx-auto px-4 container">
          <FadeInWhenVisible>
            <div className="mb-12 text-center">
              <h2 className="mb-4 font-bold text-gray-900 text-4xl">
                Why Choose MH Construction
              </h2>
              <p className="mx-auto max-w-3xl text-gray-600 text-xl">
                Your trusted partner for commercial construction in the Pacific
                Northwest
              </p>
            </div>
          </FadeInWhenVisible>

          <StaggeredFadeIn className="gap-6 grid md:grid-cols-2 lg:grid-cols-3 mx-auto max-w-7xl">
            {whyChooseUs.map((reason, index) => (
              <Card
                key={index}
                className="hover:shadow-lg transition-all hover:-translate-y-1"
              >
                <CardHeader>
                  <MaterialIcon
                    icon={reason.iconName}
                    size="2xl"
                    className="mb-3 text-brand-primary"
                  />
                  <CardTitle className="text-lg">{reason.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 text-sm">{reason.description}</p>
                </CardContent>
              </Card>
            ))}
          </StaggeredFadeIn>
        </div>
      </section>

      {/* Service Request Process Section */}
      <section className="bg-white dark:bg-gray-900 py-16">
        <div className="mx-auto px-4 container">
          <FadeInWhenVisible>
            <div className="mx-auto max-w-4xl">
              <div className="mb-12 text-center">
                <MaterialIcon
                  icon="trending_up"
                  size="3xl"
                  className="mb-4 text-brand-primary"
                />
                <h2 className="mb-4 font-bold text-gray-900 dark:text-white text-4xl">
                  Our Service Request Process
                </h2>
                <p className="text-gray-600 dark:text-gray-300 text-xl">
                  From initial consultation to project completion, we guide you
                  every step of the way
                </p>
              </div>

              <div className="space-y-6">
                {[
                  {
                    step: 1,
                    title: 'Initial Consultation',
                    description: 'Understanding your vision and requirements',
                    icon: 'chat',
                  },
                  {
                    step: 2,
                    title: 'Site Assessment',
                    description: 'Evaluating location and project feasibility',
                    icon: 'explore',
                  },
                  {
                    step: 3,
                    title: 'Master Planning',
                    description: 'Detailed planning and timeline development',
                    icon: 'event',
                  },
                  {
                    step: 4,
                    title: 'Proposal',
                    description:
                      'Comprehensive project proposal with transparent pricing',
                    icon: 'description',
                  },
                  {
                    step: 5,
                    title: 'Partnership',
                    description:
                      'Collaborative execution with regular communication',
                    icon: 'handshake',
                  },
                ].map((process, index) => (
                  <Card
                    key={index}
                    className="bg-white dark:bg-gray-800 hover:shadow-lg dark:hover:shadow-gray-600/50 border border-gray-200 dark:border-gray-700 transition-shadow"
                  >
                    <CardContent className="p-6">
                      <div className="flex items-start">
                        <div className="flex-shrink-0 mr-4">
                          <div className="flex justify-center items-center bg-brand-primary rounded-full w-12 h-12 font-bold text-white text-xl">
                            {process.step}
                          </div>
                        </div>
                        <div className="flex-grow">
                          <div className="flex justify-between items-start">
                            <div>
                              <h3 className="mb-2 font-bold text-gray-900 dark:text-white text-xl">
                                {process.title}
                              </h3>
                              <p className="text-gray-700 dark:text-gray-300">
                                {process.description}
                              </p>
                            </div>
                            <MaterialIcon
                              icon={process.icon}
                              size="xl"
                              className="ml-4 text-brand-primary"
                            />
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </FadeInWhenVisible>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-brand-primary to-brand-primary-dark py-16 text-white">
        <div className="mx-auto px-4 container">
          <FadeInWhenVisible>
            <div className="mx-auto max-w-3xl text-center">
              <MaterialIcon
                icon="phone_in_talk"
                size="4xl"
                className="mb-6 text-brand-secondary"
              />
              <h2 className="mb-6 font-bold text-4xl">
                Ready to Start Your Project?
              </h2>
              <p className="mb-8 text-brand-accent text-xl">
                Call us today for a free consultation and let's discuss how we
                can bring your vision to life.
              </p>
              <div className="flex sm:flex-row flex-col justify-center gap-4 mb-8">
                <Link href="/contact">
                  <Button
                    size="lg"
                    className="bg-white hover:bg-brand-secondary/10 text-brand-primary"
                  >
                    <MaterialIcon icon="email" className="mr-2" size="md" />
                    Contact Us Today
                  </Button>
                </Link>
                <Link href="/projects">
                  <Button
                    size="lg"
                    variant="outline"
                    className="hover:bg-brand-primary-dark border-white text-white"
                  >
                    <MaterialIcon
                      icon="photo_library"
                      className="mr-2"
                      size="md"
                    />
                    View Our Projects
                  </Button>
                </Link>
              </div>
              <div className="space-y-2 text-brand-secondary">
                <p className="text-xl">
                  <MaterialIcon
                    icon="phone"
                    className="inline mr-2"
                    size="md"
                  />
                  (509) 308-6489
                </p>
                <p>
                  <MaterialIcon
                    icon="location_on"
                    className="inline mr-2"
                    size="md"
                  />
                  3111 N. Capital Ave., Pasco, WA 99301
                </p>
                <p>
                  <MaterialIcon
                    icon="email"
                    className="inline mr-2"
                    size="md"
                  />
                  info@mhconstruction.com
                </p>
              </div>
            </div>
          </FadeInWhenVisible>
        </div>
      </section>
    </div>
  )
}
