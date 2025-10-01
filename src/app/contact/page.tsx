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
import { ContactForm } from '../../components/contact/ContactForm'
import {
  InteractiveMap,
  ServiceAreaOverview,
} from '../../components/map/InteractiveMap'
import { LeadCapture } from '../../components/lead/LeadCapture'
import {
  generateSEOMetadata,
  generateOrganizationStructuredData,
  StructuredData,
} from '../../components/seo/seo-meta'
import {
  WPZoomPhoneIcon as PhoneIcon,
  WPZoomEmailIcon as EmailIcon,
  WPZoomLocationIcon as LocationIcon,
  WPZoomCalendarIcon as CalendarIcon,
  WPZoomCheckIcon as CheckIcon,
  WPZoomUserIcon as UserIcon,
  WPZoomCloseIcon as CloseIcon,
} from '../../components/icons/WPZoomIcons'
import {
  FadeInWhenVisible,
  StaggeredFadeIn,
  HoverScale,
} from '../../components/animations/FramerMotionComponents'

export default function ContactPage() {
  const contactInfo = {
    phone: '(509) 308-6489',
    email: 'info@mhconstruction.com',
    address: {
      street: '3111 N. Capital Ave.',
      city: 'Pasco',
      state: 'WA',
      zip: '99301',
    },
    businessHours: {
      consultations: 'Monday-Friday 8:00 AM - 3:00 PM (Pacific Time)',
      general: 'Monday-Friday 7:00 AM - 6:00 PM, Saturday 8:00 AM - 4:00 PM',
      emergency: 'Available 24/7',
    },
  }

  const contactMethods = [
    {
      icon: PhoneIcon,
      title: 'Phone',
      primary: contactInfo.phone,
      secondary: 'Direct line to our team',
      action: 'Call Now',
      href: `tel:${contactInfo.phone}`,
      variant: 'primary' as const,
    },
    {
      icon: EmailIcon,
      title: 'Email',
      primary: contactInfo.email,
      secondary: 'We respond within 2 hours',
      action: 'Send Email',
      href: `mailto:${contactInfo.email}`,
      variant: 'secondary' as const,
    },
    {
      icon: LocationIcon,
      title: 'Visit Us',
      primary: `${contactInfo.address.street}, ${contactInfo.address.city}`,
      secondary: `${contactInfo.address.state} ${contactInfo.address.zip}`,
      action: 'Get Directions',
      href: 'https://maps.google.com/?q=3111+N.+Capital+Ave.,+Pasco,+WA+99301',
      variant: 'outline' as const,
    },
    {
      icon: CalendarIcon,
      title: 'Schedule',
      primary: 'Free Consultation',
      secondary: 'Book your project assessment',
      action: 'Book Now',
      href: '/booking',
      variant: 'primary' as const,
    },
  ]

  const serviceAreas = [
    'Seattle Metro Area',
    'Portland Metro Area',
    'Spokane Valley',
    'Tacoma-Bellevue',
    'Tri-Cities Region',
    'Eastern Washington',
    'Eastern Oregon',
    'Northern Idaho',
  ]

  const responseGuarantees = [
    {
      icon: PhoneIcon,
      title: 'Phone Calls',
      time: '< 2 hours',
      description: 'Direct response during business hours',
    },
    {
      icon: EmailIcon,
      title: 'Email Inquiries',
      time: '< 4 hours',
      description: 'Detailed written response with next steps',
    },
    {
      icon: CalendarIcon,
      title: 'Emergency Services',
      time: '< 1 hour',
      description: '24/7 emergency response for urgent issues',
    },
    {
      icon: UserIcon,
      title: 'Consultations',
      time: '< 24 hours',
      description: 'Schedule your free project consultation',
    },
  ]

  return (
    <>
      {/* SEO Structured Data */}
      <StructuredData data={generateOrganizationStructuredData()} />

      {/* Hero Section */}
      <section className="relative bg-white dark:bg-gray-900 h-screen hero-section">
        {/* Background Elements */}
        <div className="absolute inset-0 bg-gradient-to-br from-brand-primary/10 dark:from-brand-primary/5 to-transparent"></div>
        <div className="top-20 right-20 absolute bg-brand-primary/5 blur-3xl rounded-full w-32 h-32"></div>
        <div className="bottom-20 left-20 absolute bg-blue-500/5 blur-3xl rounded-full w-40 h-40"></div>

        <div className="z-10 relative flex justify-center items-center mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-8 max-w-7xl h-full">
          <FadeInWhenVisible className="w-full text-center">
            {/* Hero Badge */}
            <div className="inline-flex items-center bg-brand-primary/10 dark:bg-brand-primary/20 shadow-lg backdrop-blur-sm mb-8 px-6 py-3 border border-brand-primary/20 dark:border-brand-primary/30 rounded-full">
              <PhoneIcon
                size="sm"
                color="currentColor"
                className="text-brand-primary dark:text-brand-primary-light"
              />
              <span className="ml-3 font-bold text-brand-primary dark:text-brand-primary-light text-xs uppercase tracking-wider">
                Get In Touch Today
              </span>
            </div>

            {/* Hero Title */}
            <h1 className="mb-6 pb-2 font-black text-gray-900 dark:text-white text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl leading-relaxed tracking-tighter hero-title">
              <span className="block mb-3 font-semibold text-gray-700 dark:text-gray-300 text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl tracking-tight">
                Ready to Start
              </span>
              <span className="block bg-clip-text bg-gradient-to-r from-brand-primary via-blue-500 to-brand-primary drop-shadow-sm font-black text-transparent">
                Your Project?
              </span>
            </h1>

            {/* Hero Description */}
            <p className="mx-auto mb-8 max-w-4xl font-light text-gray-600 dark:text-gray-300 text-xl sm:text-2xl md:text-3xl lg:text-4xl leading-relaxed tracking-wide">
              Our{' '}
              <span className="font-medium text-gray-800 dark:text-gray-200">
                veteran construction team
              </span>{' '}
              is standing by to provide{' '}
              <span className="bg-clip-text bg-gradient-to-r from-brand-primary to-blue-500 font-semibold text-transparent">
                expert consultation and military-precision service
              </span>
              .
            </p>

            {/* CTA Buttons */}
            <div className="flex sm:flex-row flex-col justify-center items-center gap-8 mb-8">
              <Button
                variant="primary"
                size="xl"
                className="shadow-xl"
                onClick={() => window.open(`tel:${contactInfo.phone}`, '_self')}
              >
                <PhoneIcon size="sm" color="currentColor" className="mr-3" />
                <span className="z-10 relative tracking-wide">
                  Call (509) 308-6489
                </span>
              </Button>
              <Link href="/booking">
                <HoverScale>
                  <Button variant="outline" size="xl" className="shadow-xl">
                    <CalendarIcon
                      size="sm"
                      color="currentColor"
                      className="mr-3"
                    />
                    <span className="z-10 relative tracking-wide">
                      Schedule Consultation
                    </span>
                  </Button>
                </HoverScale>
              </Link>
            </div>

            {/* Trust Indicators */}
            <StaggeredFadeIn className="flex flex-wrap justify-center items-center gap-10 font-medium text-gray-700 dark:text-gray-300 text-base">
              {[
                'Free Consultations',
                '< 2 Hour Response Time',
                'Veteran-Owned & Operated',
                '24/7 Emergency Service',
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

      {/* Contact Methods Section */}
      <section className="relative bg-white dark:bg-gray-900 py-20 lg:py-32 xl:py-40 contact-methods-section">
        <div className="absolute inset-0 bg-gradient-to-b from-gray-50/50 dark:from-gray-800/30 to-transparent"></div>
        <div className="top-20 right-20 absolute bg-brand-primary/5 blur-3xl rounded-full w-32 h-32"></div>

        <div className="relative mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <FadeInWhenVisible className="mb-24 lg:mb-32 text-center">
            <div className="inline-flex items-center bg-blue-500/10 dark:bg-blue-500/20 shadow-lg mb-10 px-8 py-4 border border-blue-500/20 rounded-full">
              <UserIcon size="md" color="var(--blue-500)" />
              <span className="ml-4 font-black text-blue-500 text-sm uppercase tracking-wider">
                Multiple Ways to Connect
              </span>
            </div>

            <h2 className="mb-10 font-black text-gray-900 dark:text-gray-100 text-5xl sm:text-6xl md:text-7xl lg:text-8xl leading-tight tracking-tighter">
              <span className="block mb-4 font-semibold text-gray-700 dark:text-gray-300 text-3xl sm:text-4xl md:text-5xl lg:text-6xl tracking-tight">
                Choose How to
              </span>
              <span className="block bg-clip-text bg-gradient-to-r from-blue-500 via-brand-primary to-blue-500 drop-shadow-sm font-black text-transparent">
                Get In Touch
              </span>
            </h2>

            <p className="mx-auto max-w-3xl font-light text-gray-600 dark:text-gray-300 text-xl leading-relaxed">
              Multiple contact methods to fit your schedule and communication
              preferences. Every inquiry gets our personal attention.
            </p>
          </FadeInWhenVisible>

          <StaggeredFadeIn className="gap-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
            {contactMethods.map((method, index) => (
              <HoverScale key={index}>
                <Card className="hover:shadow-xl border-gray-200/30 hover:border-brand-primary/30 h-full text-center transition-all duration-500">
                  <CardHeader className="pb-4">
                    <div className="flex justify-center mb-4">
                      <div className="bg-gradient-to-br from-brand-primary to-blue-500 shadow-lg p-4 rounded-xl">
                        <method.icon
                          size="lg"
                          color="white"
                          className="text-white"
                        />
                      </div>
                    </div>
                    <CardTitle className="font-bold text-gray-900 dark:text-gray-100 text-xl">
                      {method.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="mb-2 font-semibold text-brand-primary dark:text-brand-primary-light text-lg">
                      {method.primary}
                    </p>
                    <p className="mb-6 text-gray-600 dark:text-gray-400 text-sm">
                      {method.secondary}
                    </p>
                    <Button
                      variant={method.variant}
                      size="md"
                      className="w-full"
                      onClick={() =>
                        window.open(
                          method.href,
                          method.href.startsWith('tel:') ||
                            method.href.startsWith('mailto:')
                            ? '_self'
                            : '_blank'
                        )
                      }
                    >
                      {method.action}
                    </Button>
                  </CardContent>
                </Card>
              </HoverScale>
            ))}
          </StaggeredFadeIn>
        </div>
      </section>

      {/* Contact Form & Info */}
      <section className="bg-gray-50 dark:bg-gray-800 py-16">
        <div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <div className="gap-12 grid grid-cols-1 lg:grid-cols-2">
            {/* Contact Form */}
            <div>
              <ContactForm formType="general" title="Send Us a Message" />
            </div>

            {/* Contact Information */}
            <div className="space-y-8">
              {/* Business Hours */}
              <Card>
                <CardHeader>
                  <CardTitle>Business Hours</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold text-brand-primary">
                        Consultations
                      </h4>
                      <p className="text-gray-600">
                        {contactInfo.businessHours.consultations}
                      </p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-brand-primary">
                        General Business
                      </h4>
                      <p className="text-gray-600">
                        {contactInfo.businessHours.general}
                      </p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-yellow-600">
                        Emergency Services
                      </h4>
                      <p className="text-gray-600">
                        {contactInfo.businessHours.emergency}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Location */}
              <Card>
                <CardHeader>
                  <CardTitle>Our Location</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-start">
                      <svg
                        className="flex-shrink-0 mt-0.5 mr-3 w-5 h-5 text-brand-primary"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <div>
                        <p className="font-semibold">
                          {contactInfo.address.street}
                        </p>
                        <p className="text-gray-600">
                          {contactInfo.address.city},{' '}
                          {contactInfo.address.state} {contactInfo.address.zip}
                        </p>
                      </div>
                    </div>

                    <Button variant="secondary" size="sm" className="w-full">
                      Get Directions
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Quick Response */}
              <Card className="bg-brand-primary text-white">
                <CardHeader>
                  <CardTitle className="text-white">
                    Quick Response Guarantee
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center">
                      <svg
                        className="flex-shrink-0 mr-3 w-5 h-5"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span>2-hour response during business hours</span>
                    </div>
                    <div className="flex items-center">
                      <svg
                        className="flex-shrink-0 mr-3 w-5 h-5"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span>24/7 emergency response available</span>
                    </div>
                    <div className="flex items-center">
                      <svg
                        className="flex-shrink-0 mr-3 w-5 h-5"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span>Free consultation within 48 hours</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Service Areas */}
              <Card>
                <CardHeader>
                  <CardTitle>Service Areas</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="mb-3 text-gray-600">
                    We proudly serve the Pacific Northwest region:
                  </p>
                  <div className="gap-2 grid grid-cols-2 text-sm">
                    {[
                      'Pasco, WA',
                      'Kennewick, WA',
                      'Richland, WA',
                      'Walla Walla, WA',
                      'Yakima, WA',
                      'Spokane, WA',
                    ].map((area, index) => (
                      <div key={index} className="flex items-center">
                        <span className="mr-2 text-brand-secondary">•</span>
                        <span>{area}</span>
                      </div>
                    ))}
                  </div>
                  <p className="mt-3 text-gray-500 text-xs">
                    Additional areas may be available for larger projects
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Map & Service Areas */}
      <section className="bg-white py-16">
        <div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <div className="mb-12 text-center">
            <h2 className="mb-4 font-tactic-bold text-gray-900 text-3xl">
              Our Location & Service Areas
            </h2>
            <p className="mx-auto max-w-3xl text-gray-600 text-xl">
              Based in Pasco, WA, we proudly serve the entire Pacific Northwest
              region. Find us on the map and explore our comprehensive service
              areas.
            </p>
          </div>

          <div className="mb-16">
            <InteractiveMap
              showServiceAreas={true}
              showProjects={true}
              height="500px"
              className="mb-8"
            />
          </div>

          <div>
            <h3 className="mb-8 font-semibold text-2xl text-center">
              Detailed Service Area Information
            </h3>
            <ServiceAreaOverview />
          </div>
        </div>
      </section>

      {/* Lead Capture Section */}
      <section className="bg-gradient-to-br from-brand-primary to-brand-secondary py-16">
        <div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
          <div className="items-center gap-12 grid grid-cols-1 lg:grid-cols-2">
            <div className="text-white">
              <h2 className="mb-6 font-tactic-bold text-3xl">
                Ready to Start Your Dream Project?
              </h2>
              <div className="space-y-4 text-lg">
                <div className="flex items-center">
                  <span className="mr-3 text-2xl">🏗️</span>
                  <span>20+ years of construction excellence</span>
                </div>
                <div className="flex items-center">
                  <span className="mr-3 text-2xl">🇺🇸</span>
                  <span>Veteran-owned and operated</span>
                </div>
                <div className="flex items-center">
                  <span className="mr-3 text-2xl">🛡️</span>
                  <span>Licensed, bonded & fully insured</span>
                </div>
                <div className="flex items-center">
                  <span className="mr-3 text-2xl">⚡</span>
                  <span>24-hour response guarantee</span>
                </div>
              </div>
            </div>
            <div>
              <LeadCapture
                source="contact_page_cta"
                title="Get Your Free Consultation"
                subtitle="No obligation • Free estimates • Expert guidance"
                className="bg-white"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Emergency Contact */}
      <section className="bg-red-600 py-16 text-white">
        <div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl text-center">
          <h2 className="mb-6 font-tactic-bold text-3xl">
            Emergency Construction Services
          </h2>
          <p className="mb-8 text-xl">
            Storm damage, structural emergencies, or urgent repairs? Our veteran
            team responds 24/7 to keep you safe.
          </p>
          <div className="flex sm:flex-row flex-col justify-center gap-4">
            <Button
              variant="secondary"
              size="lg"
              className="bg-white hover:bg-gray-100 text-red-600"
            >
              Call Emergency Line: {contactInfo.phone}
            </Button>
            <Button
              variant="primary"
              size="lg"
              className="bg-red-700 hover:bg-red-800"
            >
              Emergency Contact Form
            </Button>
          </div>
        </div>
      </section>
    </>
  )
}
