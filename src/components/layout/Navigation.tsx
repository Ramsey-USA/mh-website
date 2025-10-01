'use client'
import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { Button } from '../ui/Button'
import NewThemeToggle from '../ui/NewThemeToggle'

export function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 50
      setScrolled(isScrolled)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <>
      {/* Backdrop overlay when menu is open */}
      {isMenuOpen && (
        <div
          className="z-40 fixed inset-0 bg-black/20 backdrop-blur-sm transition-all duration-300"
          onClick={() => setIsMenuOpen(false)}
        />
      )}

      {/* Main Header - Transparent and absolute, does not scroll. Only hamburger menu scrolls. */}
      <header
        className="top-0 right-0 left-0 z-40 absolute bg-transparent transition-all duration-300"
        style={{ background: 'transparent', boxShadow: 'none' }}
      >
        {/* Theme Toggle at Far Left Edge - Hidden on mobile since it's in hamburger menu */}
        <div className="hidden sm:block top-6 left-4 sm:left-6 z-50 absolute">
          <NewThemeToggle />
        </div>

        <div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <div className="flex justify-between items-center py-2 h-20 sm:h-24">
            {/* Logo - Hidden on mobile since it's in hamburger menu */}
            <div className="hidden sm:block flex-shrink-0 py-2 sm:py-3">
              <Link
                href="/"
                className="group relative flex items-center hover:scale-105 transition-all duration-300"
              >
                <img
                  src="/images/logo/mh-logo.png"
                  alt="MH Construction"
                  className="z-10 relative drop-shadow-lg w-auto h-16 sm:h-20 filter"
                />
              </Link>
            </div>

            {/* Desktop Navigation Links */}
            <div className="hidden lg:flex items-center space-x-6 xl:space-x-8">
              <Link
                href="/about"
                className="group relative drop-shadow-sm font-medium text-white/90 hover:text-white dark:text-gray-100 text-sm xl:text-base transition-all duration-300"
              >
                <span className="z-10 relative">About Us</span>
                <div className="bottom-0 absolute inset-x-0 bg-brand-secondary h-0.5 scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300 transform"></div>
              </Link>
              <Link
                href="/services"
                className="group relative drop-shadow-sm font-medium text-white/90 hover:text-white dark:text-gray-100 text-sm xl:text-base transition-all duration-300"
              >
                <span className="z-10 relative">What We Do</span>
                <div className="bottom-0 absolute inset-x-0 bg-brand-secondary h-0.5 scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300 transform"></div>
              </Link>
              <Link
                href="/portfolio"
                className="group relative drop-shadow-sm font-medium text-white/90 hover:text-white dark:text-gray-100 text-sm xl:text-base transition-all duration-300"
              >
                <span className="z-10 relative">Portfolio</span>
                <div className="bottom-0 absolute inset-x-0 bg-brand-secondary h-0.5 scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300 transform"></div>
              </Link>
            </div>

            {/* Desktop Controls */}
            <div className="hidden sm:flex items-center space-x-2 lg:space-x-4">
              <Link href="/estimator">
                <Button
                  variant="outline"
                  size="sm"
                  className="hover:bg-white backdrop-blur-sm px-3 lg:px-4 border-white/50 text-white hover:text-brand-primary text-xs lg:text-sm"
                >
                  <span className="hidden lg:inline">Get Quote</span>
                  <span className="lg:hidden">Quote</span>
                </Button>
              </Link>

              <Link href="/contact">
                <Button
                  variant="primary"
                  size="sm"
                  className="bg-brand-primary/90 hover:bg-brand-primary backdrop-blur-sm px-3 lg:px-4 text-xs lg:text-sm"
                >
                  <span className="hidden lg:inline">Contact Us</span>
                  <span className="lg:hidden">Contact</span>
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Floating Hamburger Menu - Scrolls with user */}
      <div className="top-4 right-4 z-50 fixed">
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className={`relative bg-gradient-to-r from-[#386851] hover:from-[#2d5440] to-[#4a7c59] hover:to-[#3c6448] shadow-lg hover:shadow-xl p-3 rounded-xl focus:outline-none focus:ring-[#386851]/50 focus:ring-2 focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-gray-900 antialiased transform-gpu transition-all duration-300 ${
            scrolled ? 'scale-90' : 'scale-100'
          }`}
          aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={isMenuOpen}
        >
          <div className="flex flex-col justify-center space-y-1 w-6 h-6">
            <span
              className={`w-full h-0.5 bg-white transition-all duration-300 ease-in-out transform origin-center ${
                isMenuOpen ? 'rotate-45 translate-y-2' : ''
              }`}
            />
            <span
              className={`w-full h-0.5 bg-white transition-all duration-300 ${
                isMenuOpen ? 'opacity-0 scale-x-0' : 'opacity-100 scale-x-100'
              }`}
            />
            <span
              className={`w-full h-0.5 bg-white transition-all duration-300 ease-in-out transform origin-center ${
                isMenuOpen ? '-rotate-45 -translate-y-2' : ''
              }`}
            />
          </div>

          {/* Ripple effect on hover */}
          <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 rounded-xl scale-0 group-hover:scale-110 transition-all duration-300" />
        </button>
      </div>

      {/* Enhanced Mobile Menu with Animation */}
      <div
        className={`fixed top-0 left-0 right-0 z-40 overflow-hidden transition-all duration-500 ease-in-out ${
          isMenuOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="bg-gradient-to-br from-white dark:from-gray-900 via-gray-50 dark:via-gray-800 to-white dark:to-gray-900 shadow-inner backdrop-blur-lg border-gray-200 dark:border-gray-700 border-b">
          <div className="space-y-6 px-6 py-6 pt-20">
            {/* Logo and Theme Toggle Header */}
            <div className="flex justify-between items-center pb-4 border-gray-200 dark:border-gray-700 border-b">
              {/* MH Logo */}
              <Link
                href="/"
                className="group relative flex items-center hover:scale-105 transition-all duration-300"
                onClick={() => setIsMenuOpen(false)}
              >
                <img
                  src="/images/logo/mh-logo.png"
                  alt="MH Construction"
                  className="z-10 relative drop-shadow-lg w-auto h-12 filter"
                />
              </Link>

              {/* Theme Toggle */}
              <div className="flex-shrink-0">
                <NewThemeToggle />
              </div>
            </div>

            {/* Primary Action Buttons */}
            <div className="space-y-3">
              <Link href="/estimator" onClick={() => setIsMenuOpen(false)}>
                <Button
                  variant="outline"
                  size="md"
                  className="hover:bg-[#386851] shadow-md hover:shadow-lg hover:border-[#386851] w-full hover:text-white transition-all duration-300"
                >
                  <span className="flex justify-center items-center">
                    <svg
                      className="mr-2 w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                      />
                    </svg>
                    Get Quote
                  </span>
                </Button>
              </Link>
              <Link href="/contact" onClick={() => setIsMenuOpen(false)}>
                <Button
                  variant="primary"
                  size="md"
                  className="bg-gradient-to-r from-[#386851] hover:from-[#2d5440] to-[#4a7c59] hover:to-[#3c6448] shadow-lg hover:shadow-xl w-full hover:scale-[1.02] transition-all duration-300 transform"
                >
                  <span className="flex justify-center items-center">
                    <svg
                      className="mr-2 w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    </svg>
                    Contact Us
                  </span>
                </Button>
              </Link>
            </div>

            {/* Navigation Links */}
            <div className="space-y-1 pt-6 border-gray-200 dark:border-gray-700 border-t">
              {[
                // Core site pages
                {
                  href: '/',
                  label: 'Home',
                  icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6',
                },
                {
                  href: '/about',
                  label: 'About Us',
                  icon: 'M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z',
                },
                {
                  href: '/services',
                  label: 'What We Do',
                  icon: 'M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z',
                },
                {
                  href: '/portfolio',
                  label: 'Portfolio',
                  icon: 'M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10',
                },
                {
                  href: '/projects',
                  label: 'Projects',
                  icon: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5l2 2h5a2 2 0 012 2v14a2 2 0 01-2 2z',
                },
                {
                  href: '/showcase',
                  label: 'Showcase',
                  icon: 'M4 6h16M4 12h16M4 18h7',
                },
                {
                  href: '/testimonials',
                  label: 'Testimonials',
                  icon: 'M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V7c0-1.105.895-2 2-2h14a2 2 0 012 2v7a2 2 0 01-2 2h-3l-4 4z',
                },
                {
                  href: '/blog',
                  label: 'Blog',
                  icon: 'M11 5H6a2 2 0 00-2 2v11.5A1.5 1.5 0 005.5 20h11a1.5 1.5 0 001.5-1.5V14M16 3l5 5M16 3v5h5',
                },
                {
                  href: '/news',
                  label: 'News',
                  icon: 'M12 8v8m-4-4h8M5 3h14a2 2 0 012 2v13a2 2 0 01-2 2H9l-4 3v-3H5a2 2 0 01-2-2V5a2 2 0 012-2z',
                },
                {
                  href: '/booking',
                  label: 'Booking',
                  icon: 'M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2h-1V3h-3v2H9V3H6v2H5a2 2 0 00-2 2v12a2 2 0 002 2z',
                },
                {
                  href: '/wounded-warrior',
                  label: 'Wounded Warrior',
                  icon: 'M12 8c1.657 0 3-1.343 3-3S13.657 2 12 2 9 3.343 9 5s1.343 3 3 3zm0 2c-3.314 0-6 2.239-6 5v5h12v-5c0-2.761-2.686-5-6-5z',
                },
              ].map((item, index) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="group flex items-center hover:bg-gray-100 dark:hover:bg-gray-800 px-4 py-3 rounded-xl font-medium text-gray-900 hover:text-[#386851] dark:hover:text-[#4a7c59] dark:text-gray-100 transition-all duration-300"
                  onClick={() => setIsMenuOpen(false)}
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <svg
                    className="opacity-70 group-hover:opacity-100 mr-3 w-5 h-5 transition-opacity"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d={item.icon}
                    />
                  </svg>
                  {item.label}
                  <svg
                    className="opacity-0 group-hover:opacity-100 ml-auto w-4 h-4 transition-all group-hover:translate-x-1 duration-300 transform"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
