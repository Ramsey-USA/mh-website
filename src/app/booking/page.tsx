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
import { BookingFlow } from '../../components/booking/BookingFlow'
import {
  CalendarIcon,
  CheckIcon,
  UserIcon,
  PhoneIcon,
  EmailIcon,
} from '../../components/icons/SharpDuotoneIcons'
import {
  FadeInWhenVisible,
  StaggeredFadeIn,
  HoverScale,
} from '../../components/animations/FramerMotionComponents'

export default function BookingPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative bg-white dark:bg-gray-900 h-screen hero-section">
        <div className="absolute inset-0 bg-gradient-to-br from-brand-primary/10 dark:from-brand-primary/5 to-transparent"></div>
        <div className="top-20 right-20 absolute bg-brand-primary/5 blur-3xl rounded-full w-32 h-32"></div>
        <div className="bottom-20 left-20 absolute bg-blue-500/5 blur-3xl rounded-full w-40 h-40"></div>

        <div className="z-10 relative flex justify-center items-center mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-8 max-w-7xl h-full">
          <FadeInWhenVisible className="w-full text-center">
            <div className="inline-flex items-center bg-brand-primary/10 dark:bg-brand-primary/20 shadow-lg backdrop-blur-sm mb-8 px-6 py-3 border border-brand-primary/20 dark:border-brand-primary/30 rounded-full">
              <CalendarIcon
                size="sm"
                primaryColor="currentColor"
                className="text-brand-primary dark:text-brand-primary-light"
              />
              <span className="ml-3 font-bold text-brand-primary dark:text-brand-primary-light text-xs uppercase tracking-wider">
                Professional Consultations
              </span>
            </div>

            <h1 className="mb-6 pb-2 font-black text-gray-900 dark:text-white text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl leading-relaxed tracking-tighter hero-title">
              <span className="block mb-3 font-semibold text-gray-700 dark:text-gray-300 text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl tracking-tight">
                Schedule Your
              </span>
              <span className="block bg-clip-text bg-gradient-to-r from-brand-primary via-blue-500 to-brand-primary drop-shadow-sm font-black text-transparent">
                Expert Consultation
              </span>
            </h1>

            <p className="mx-auto mb-8 max-w-4xl font-light text-gray-600 dark:text-gray-300 text-xl sm:text-2xl md:text-3xl lg:text-4xl leading-relaxed tracking-wide">
              Meet with our{' '}
              <span className="font-medium text-gray-800 dark:text-gray-200">
                veteran construction team
              </span>
              {' '}to discuss your project. From{' '}
              <span className="bg-clip-text bg-gradient-to-r from-brand-primary to-blue-500 font-semibold text-transparent">
                free initial consultations to detailed design sessions
              </span>
              .
            </p>

            <div className="flex sm:flex-row flex-col justify-center items-center gap-8 mb-8">
              <Button 
                variant="primary" 
                size="xl" 
                className="shadow-xl"
              >
                <CalendarIcon
                  size="sm"
                  primaryColor="currentColor"
                  className="mr-3"
                />
                <span className="z-10 relative tracking-wide">
                  Book Free Consultation
                </span>
              </Button>
              <Link href="/contact">
                <HoverScale>
                  <Button variant="outline" size="xl" className="shadow-xl">
                    <UserIcon
                      size="sm"
                      primaryColor="currentColor"
                      className="mr-3"
                    />
                    <span className="z-10 relative tracking-wide">
                      Meet Our Team
                    </span>
                  </Button>
                </HoverScale>
              </Link>
            </div>

            <StaggeredFadeIn className="flex flex-wrap justify-center items-center gap-10 font-medium text-gray-700 dark:text-gray-300 text-base">
              {[
                'Free Initial Consultations',
                'Same-Day Confirmation',
                'Veteran-Led Team',
                'Flexible Scheduling',
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

      {/* Booking Calendar Section */}
      <section className="relative bg-gradient-to-b from-gray-50 dark:from-gray-800 to-white dark:to-gray-900 py-20 lg:py-32 xl:py-40 booking-calendar-section">
        <div className="bottom-20 left-20 absolute bg-brand-primary/5 blur-3xl rounded-full w-40 h-40"></div>

        <div className="relative mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <FadeInWhenVisible className="mb-16 text-center">
            <div className="inline-flex items-center bg-brand-primary/10 dark:bg-brand-primary/20 shadow-lg mb-10 px-8 py-4 border border-brand-primary/20 rounded-full">
              <CalendarIcon size="md" primaryColor="var(--brand-primary)" />
              <span className="ml-4 font-black text-brand-primary text-sm uppercase tracking-wider">
                Schedule Now
              </span>
            </div>

            <h2 className="mb-6 font-black text-gray-900 dark:text-gray-100 text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-tight tracking-tighter">
              <span className="bg-clip-text bg-gradient-to-r from-brand-primary to-blue-500 drop-shadow-sm font-black text-transparent">
                Choose Your Time
              </span>
            </h2>
            <p className="mx-auto max-w-3xl font-light text-gray-600 dark:text-gray-300 text-xl leading-relaxed">
              Select a date and time that works for you. Our calendar shows real-time availability and automatically adjusts for your timezone.
            </p>
          </FadeInWhenVisible>

          <FadeInWhenVisible>
            <div className="bg-white dark:bg-gray-800 shadow-xl p-8 border border-gray-200/30 dark:border-gray-700/30 rounded-2xl">
              <BookingFlow />
            </div>
          </FadeInWhenVisible>
        </div>
      </section>

      {/* Emergency Consultation */}
      <section className="relative bg-red-600 py-20 lg:py-32 emergency-section">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.1)_0%,transparent_50%)]"></div>

        <div className="relative mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl text-center">
          <FadeInWhenVisible>
            <h2 className="mb-6 font-black text-white text-3xl sm:text-4xl md:text-5xl lg:text-6xl leading-tight tracking-tighter">
              Need Emergency Consultation?
            </h2>
            <p className="mb-8 font-light text-red-100 text-xl md:text-2xl leading-relaxed">
              Structural damage, permit issues, or construction emergencies? Our veteran team provides 24/7 emergency consultation services.
            </p>
            <div className="flex sm:flex-row flex-col justify-center gap-4">
              <HoverScale>
                <Button
                  variant="secondary"
                  size="lg"
                  className="bg-white hover:bg-gray-100 shadow-xl text-red-600"
                  onClick={() => window.open('tel:(509) 308-6489', '_self')}
                >
                  <PhoneIcon
                    size="sm"
                    primaryColor="currentColor"
                    className="mr-3"
                  />
                  Call Emergency Line: (509) 308-6489
                </Button>
              </HoverScale>
              <Link href="/contact">
                <HoverScale>
                  <Button
                    variant="outline"
                    size="lg"
                    className="hover:bg-white/10 shadow-xl border-white text-white"
                  >
                    <EmailIcon
                      size="sm"
                      primaryColor="currentColor"
                      className="mr-3"
                    />
                    Request Emergency Consultation
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
