// Wounded Warrior Program page
import React from 'react'
import { Metadata } from 'next'
import { Button } from '../../components/ui'
import Link from 'next/link'
import { 
  StarIcon, 
  CheckIcon, 
  ShieldIcon, 
  BoltIcon, 
  UserIcon, 
  CalendarIcon 
} from '../../components/icons/SharpDuotoneIcons'

export const metadata: Metadata = {
  title: 'Wounded Warrior Program - Supporting Our Heroes | MH Construction',
  description: 'MH Construction proudly supports wounded warriors through our veteran assistance program. Special discounts, priority services, and support for our military heroes.',
  keywords: [
    'wounded warrior program',
    'veteran assistance',
    'military construction support',
    'veteran discounts',
    'MH Construction veteran program',
    'wounded warrior construction',
    'military family support',
    'veteran owned construction'
  ],
  authors: [{ name: 'MH Construction Team' }],
  creator: 'MH Construction',
  publisher: 'MH Construction',
  robots: 'index, follow',
  openGraph: {
    title: 'Wounded Warrior Program | MH Construction',
    description: 'Supporting our wounded warriors with priority construction services and veteran assistance programs.',
    type: 'website',
    images: '/images/og-wounded-warrior.jpg',
  },
}

export default function WoundedWarriorPage() {
  const programBenefits = [
    {
      title: 'Priority Scheduling',
      description: 'Wounded warriors receive priority scheduling for all construction and renovation projects.',
      icon: StarIcon
    },
    {
      title: 'Special Veteran Discounts',
      description: 'Significant discounts on all services as our way of saying thank you for your service.',
      icon: CheckIcon
    },
    {
      title: 'Accessibility Modifications',
      description: 'Specialized construction services for accessibility modifications and adaptive home solutions.',
      icon: ShieldIcon
    },
    {
      title: 'Emergency Priority Response',
      description: 'Emergency construction needs receive immediate priority response and assistance.',
      icon: BoltIcon
    },
    {
      title: 'Free Consultations',
      description: 'Complimentary project consultations and estimates for all wounded warrior families.',
      icon: UserIcon
    },
    {
      title: 'Flexible Payment Options',
      description: 'Understanding military pay schedules with flexible payment plans and options.',
      icon: CalendarIcon
    }
  ]

  const supportServices = [
    'Home Accessibility Modifications',
    'Bathroom Safety Upgrades',
    'Ramp Installation & Mobility Solutions',
    'Kitchen Adaptations',
    'Grab Bar & Safety Rail Installation',
    'Doorway Widening & Accessibility',
    'Flooring Modifications',
    'Adaptive Technology Integration'
  ]

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-brand-primary via-brand-accent to-brand-secondary relative overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center text-white">
            <div className="flex justify-center mb-6">
              <div className="text-6xl">🇺🇸</div>
            </div>
            <h1 className="text-4xl md:text-6xl font-tactic-bold mb-6">
              Wounded Warrior Program
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto opacity-90">
              Supporting Our Heroes Who Sacrificed for Our Freedom
            </p>
            <p className="text-lg mb-12 max-w-4xl mx-auto">
              As a veteran-owned company, MH Construction is proud to support our wounded warriors 
              with specialized construction services, priority support, and meaningful assistance 
              when you need it most.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/booking">
                <Button variant="secondary" size="lg" className="bg-white text-brand-primary hover:bg-gray-100 font-semibold px-8">
                  Request Priority Consultation
                </Button>
              </Link>
              <Link href="/contact">
                <Button variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-brand-primary font-semibold px-8">
                  Learn More About Benefits
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Program Benefits */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-tactic-bold text-gray-900 mb-6">
              Our Commitment to Wounded Warriors
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We understand the unique challenges faced by our wounded warriors and their families. 
              Our comprehensive program provides specialized support and services.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {programBenefits.map((benefit, index) => {
              const IconComponent = benefit.icon
              return (
                <div key={index} className="bg-white border border-gray-200 rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
                  <div className="mb-4">
                    <IconComponent 
                      size="2xl" 
                      primaryColor="#3B82F6" 
                      secondaryColor="rgba(59,130,246,0.4)" 
                    />
                  </div>
                  <h3 className="text-xl font-tactic-bold text-gray-900 mb-3">
                    {benefit.title}
                  </h3>
                  <p className="text-gray-600">
                    {benefit.description}
                  </p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Support Services */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <div>
              <h2 className="text-3xl md:text-4xl font-tactic-bold text-gray-900 mb-6">
                Specialized Accessibility Services
              </h2>
              <p className="text-lg text-gray-600 mb-8">
                Our team specializes in creating safe, accessible, and comfortable living spaces 
                for wounded warriors and their families. Every modification is designed with 
                dignity, functionality, and independence in mind.
              </p>
              <ul className="space-y-3">
                {supportServices.map((service, index) => (
                  <li key={index} className="flex items-center">
                    <CheckIcon 
                      size="sm" 
                      className="mr-3 flex-shrink-0" 
                      primaryColor="#3B82F6" 
                      secondaryColor="rgba(59,130,246,0.4)"
                    />
                    <span className="text-gray-700">{service}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-white rounded-xl p-8 shadow-lg">
              <h3 className="text-2xl font-tactic-bold text-gray-900 mb-6">
                How to Get Started
              </h3>
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="flex-shrink-0 w-8 h-8 bg-brand-primary text-white rounded-full flex items-center justify-center font-bold text-sm">
                    1
                  </div>
                  <div className="ml-4">
                    <h4 className="font-semibold text-gray-900">Contact Our Team</h4>
                    <p className="text-gray-600">Reach out via phone, email, or our priority contact form.</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="flex-shrink-0 w-8 h-8 bg-brand-primary text-white rounded-full flex items-center justify-center font-bold text-sm">
                    2
                  </div>
                  <div className="ml-4">
                    <h4 className="font-semibold text-gray-900">Priority Assessment</h4>
                    <p className="text-gray-600">We'll schedule a priority consultation at your convenience.</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="flex-shrink-0 w-8 h-8 bg-brand-primary text-white rounded-full flex items-center justify-center font-bold text-sm">
                    3
                  </div>
                  <div className="ml-4">
                    <h4 className="font-semibold text-gray-900">Custom Solution</h4>
                    <p className="text-gray-600">We'll create a personalized plan with veteran benefits applied.</p>
                  </div>
                </div>
              </div>
              <div className="mt-8">
                <Link href="/booking">
                  <Button variant="primary" size="lg" className="w-full bg-gradient-to-r from-brand-primary to-brand-accent">
                    Start Your Priority Consultation
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonial Section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <blockquote className="text-2xl md:text-3xl font-medium text-gray-900 mb-8">
            "MH Construction didn't just renovate our home - they gave us back our independence. 
            The team understood our needs and created solutions we never thought possible."
          </blockquote>
          <cite className="text-lg text-gray-600">
            - Staff Sergeant Michael Rodriguez, U.S. Army (Ret.)
          </cite>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-20 bg-gradient-to-r from-brand-primary to-brand-accent">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
          <h2 className="text-3xl md:text-4xl font-tactic-bold mb-6">
            Ready to Get Started?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Contact us today for your priority consultation. We're here to serve those who served.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/booking">
              <Button variant="secondary" size="lg" className="bg-white text-brand-primary hover:bg-gray-100 font-semibold px-8">
                Schedule Priority Consultation
              </Button>
            </Link>
            <Link href="/contact">
              <Button variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-brand-primary font-semibold px-8">
                Contact Our Veteran Team
              </Button>
            </Link>
          </div>
          <div className="mt-8 text-lg opacity-80">
            <p>Emergency Response Available 24/7 for Wounded Warriors</p>
            <p className="font-semibold">(509) 308-6489</p>
          </div>
        </div>
      </section>
    </div>
  )
}