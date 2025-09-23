'use client'
import React, { useState } from 'react'
import Link from 'next/link'
import { Button } from '../ui/Button'
import NewThemeToggle from '../ui/NewThemeToggle'

export function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <>
      {/* Backdrop overlay when menu is open */}
      {isMenuOpen && (
        <div
          className="z-40 fixed inset-0 bg-black/20 backdrop-blur-sm transition-all duration-300"
          onClick={() => setIsMenuOpen(false)}
        />
      )}

      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isMenuOpen
            ? 'bg-white/98 dark:bg-gray-900/98 backdrop-blur-lg shadow-2xl'
            : 'bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm shadow-sm'
        } border-b border-gray-200 dark:border-gray-700`}
      >
        <div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <div className="flex justify-between items-center py-2 h-24">
            {/* LOGO */}
            <div className="flex-shrink-0 py-3">
              <Link
                href="/"
                className="group relative flex items-center overflow-hidden hover:scale-105 transition-all duration-300"
              >
                <img
                  src="/images/logo/mh-logo.png"
                  alt="MH Construction"
                  className="z-10 relative drop-shadow-lg w-auto h-20 filter"
                />
                {/* Brand-colored shine effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-brand-primary/30 to-transparent transition-transform -translate-x-full group-hover:translate-x-full duration-700" />
              </Link>
            </div>

            {/* Desktop Navigation Links */}
            <div className="hidden md:flex items-center space-x-8">
              <Link
                href="/about"
                className="font-medium text-gray-900 hover:text-[#386851] dark:text-gray-100 transition-colors"
              >
                About
              </Link>
              <Link
                href="/services"
                className="font-medium text-gray-900 hover:text-[#386851] dark:text-gray-100 transition-colors"
              >
                Services
              </Link>
              <Link
                href="/portfolio"
                className="font-medium text-gray-900 hover:text-[#386851] dark:text-gray-100 transition-colors"
              >
                Portfolio
              </Link>
            </div>

            {/* Desktop Controls */}
            <div className="flex items-center space-x-4">
              <NewThemeToggle />

              <Link href="/estimator">
                <Button variant="outline" size="md">
                  Get Quote
                </Button>
              </Link>

              <Link href="/contact">
                <Button variant="primary" size="md">
                  Contact Us
                </Button>
              </Link>
            </div>

            {/* Animated Hamburger Menu Button */}
            <div className="block">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="relative bg-gradient-to-r from-[#386851] hover:from-[#2d5440] to-[#4a7c59] hover:to-[#3c6448] shadow-lg hover:shadow-xl p-3 rounded-xl focus:outline-none focus:ring-[#386851]/50 focus:ring-2 focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-gray-900 hover:scale-105 transition-all duration-300 transform"
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
                      isMenuOpen
                        ? 'opacity-0 scale-x-0'
                        : 'opacity-100 scale-x-100'
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
          </div>

          {/* Enhanced Mobile Menu with Animation */}
          <div
            className={`overflow-hidden transition-all duration-500 ease-in-out ${
              isMenuOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'
            }`}
          >
            <div className="bg-gradient-to-br from-white dark:from-gray-900 via-gray-50 dark:via-gray-800 to-white dark:to-gray-900 shadow-inner border-gray-200 dark:border-gray-700 border-t">
              <div className="space-y-6 px-6 py-6">
                {/* Primary Action Buttons */}
                <div className="space-y-3">
                  <Link href="/estimator" onClick={() => setIsMenuOpen(false)}>
                    <Button
                      variant="outline"
                      size="md"
                      className="hover:bg-[#386851] shadow-md hover:shadow-lg hover:border-[#386851] w-full hover:text-white hover:scale-[1.02] transition-all duration-300 transform"
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
                    {
                      href: '/',
                      label: 'Home',
                      icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6',
                    },
                    {
                      href: '/about',
                      label: 'About',
                      icon: 'M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z',
                    },
                    {
                      href: '/services',
                      label: 'Services',
                      icon: 'M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z',
                    },
                    {
                      href: '/portfolio',
                      label: 'Portfolio',
                      icon: 'M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10',
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
        </div>
      </nav>
    </>
  )
}
