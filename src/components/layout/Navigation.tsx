'use client'
import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { Button } from '../ui/Button'
import { ThemeToggle } from '../ui/ThemeToggle'
import { MaterialIcon } from '../icons/MaterialIcon'

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
              <div className="flex items-center space-x-1 text-white/40 text-xs">
                <MaterialIcon
                  icon="schedule"
                  size="sm"
                  className="text-white/30"
                />
                <span>Coming Soon:</span>
              </div>
              <div className="group relative drop-shadow-sm font-medium text-white/60 hover:text-white/80 text-sm xl:text-base transition-all duration-300 cursor-not-allowed">
                <div className="flex items-center space-x-2">
                  <MaterialIcon
                    icon="info"
                    size="sm"
                    className="text-white/40 group-hover:text-white/60 transition-colors"
                  />
                  <span className="z-10 relative">About</span>
                </div>
              </div>
              <div className="group relative drop-shadow-sm font-medium text-white/60 hover:text-white/80 text-sm xl:text-base transition-all duration-300 cursor-not-allowed">
                <div className="flex items-center space-x-2">
                  <MaterialIcon
                    icon="build"
                    size="sm"
                    className="text-white/40 group-hover:text-white/60 transition-colors"
                  />
                  <span className="z-10 relative">Services</span>
                </div>
              </div>
              <div className="group relative drop-shadow-sm font-medium text-white/60 hover:text-white/80 text-sm xl:text-base transition-all duration-300 cursor-not-allowed">
                <div className="flex items-center space-x-2">
                  <MaterialIcon
                    icon="photo_library"
                    size="sm"
                    className="text-white/40 group-hover:text-white/60 transition-colors"
                  />
                  <span className="z-10 relative">Portfolio</span>
                </div>
              </div>
            </div>

            {/* Desktop Controls */}
            <div className="hidden sm:flex items-center space-x-2 lg:space-x-4">
              <div className="flex items-center space-x-2 bg-white/10 hover:bg-white/15 backdrop-blur-sm px-3 lg:px-4 py-2 border border-white/30 rounded-lg text-white/60 text-xs lg:text-sm transition-all duration-300 cursor-not-allowed">
                <MaterialIcon
                  icon="request_quote"
                  size="sm"
                  className="text-white/50"
                />
                <span className="hidden lg:inline">Get Quote (Soon)</span>
                <span className="lg:hidden">Quote</span>
              </div>

              <div className="flex items-center space-x-2 bg-brand-primary/40 hover:bg-brand-primary/50 backdrop-blur-sm px-3 lg:px-4 py-2 border border-brand-primary/30 rounded-lg text-white/70 text-xs lg:text-sm transition-all duration-300 cursor-not-allowed">
                <MaterialIcon
                  icon="contact_mail"
                  size="sm"
                  className="text-white/60"
                />
                <span className="hidden lg:inline">Contact (Soon)</span>
                <span className="lg:hidden">Contact</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Floating Theme Toggle - Scrolls with user (matches hamburger menu behavior) */}
      <div className="hidden sm:block top-4 left-4 sm:left-6 z-50 fixed">
        <ThemeToggle compact size="sm" />
      </div>

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
        <div className="relative bg-gradient-to-br from-white dark:from-gray-900 via-gray-50 dark:via-gray-800 to-white dark:to-gray-900 shadow-inner backdrop-blur-lg border-gray-200 dark:border-gray-700 border-b">
          {/* Logo Background Watermark */}
          <div className="absolute inset-0 flex justify-center items-center pointer-events-none">
            <img
              src="/images/logo/mh-logo.png"
              alt=""
              className="opacity-5 dark:opacity-10 grayscale w-[90vw] h-[90vh] object-contain filter"
            />
          </div>

          {/* Menu Content */}
          <div className="z-10 relative space-y-6 px-6 py-6 pt-20">
            {/* Primary Action Buttons */}
            <div className="space-y-3">
              <div className="group bg-gray-50 hover:bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 shadow-md px-4 py-3 border border-gray-200 dark:border-gray-600 hover:border-brand-primary/30 rounded-xl w-full text-gray-500 hover:text-brand-primary dark:text-gray-400 text-sm text-center transition-all duration-300 cursor-not-allowed">
                <div className="flex justify-center items-center space-x-2">
                  <MaterialIcon
                    icon="request_quote"
                    size="sm"
                    className="group-hover:text-brand-primary transition-colors"
                  />
                  <span>Coming Soon: Get Quote</span>
                  <MaterialIcon
                    icon="schedule"
                    size="sm"
                    className="text-gray-400 group-hover:text-brand-primary/70 transition-colors"
                  />
                </div>
              </div>
              <div className="group bg-gray-50 hover:bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 shadow-md px-4 py-3 border border-gray-200 dark:border-gray-600 hover:border-brand-primary/30 rounded-xl w-full text-gray-500 hover:text-brand-primary dark:text-gray-400 text-sm text-center transition-all duration-300 cursor-not-allowed">
                <div className="flex justify-center items-center space-x-2">
                  <MaterialIcon
                    icon="contact_mail"
                    size="sm"
                    className="group-hover:text-brand-primary transition-colors"
                  />
                  <span>Coming Soon: Contact Us</span>
                  <MaterialIcon
                    icon="schedule"
                    size="sm"
                    className="text-gray-400 group-hover:text-brand-primary/70 transition-colors"
                  />
                </div>
              </div>
            </div>

            {/* Navigation Links */}
            <div className="space-y-1 pt-6 border-gray-200 dark:border-gray-700 border-t">
              {[
                // Only active pages
                {
                  href: '/',
                  label: 'Home',
                  icon: 'home',
                  active: true,
                  description: 'Return to homepage',
                },
                // Coming soon pages
                {
                  href: '#',
                  label: 'About Us',
                  icon: 'business',
                  active: false,
                  description: 'Learn about our company',
                },
                {
                  href: '#',
                  label: 'Services',
                  icon: 'construction',
                  active: false,
                  description: 'Our construction services',
                },
                {
                  href: '#',
                  label: 'Portfolio',
                  icon: 'photo_library',
                  active: false,
                  description: 'View our completed projects',
                },
                {
                  href: '#',
                  label: 'Contact',
                  icon: 'contact_phone',
                  active: false,
                  description: 'Get in touch with us',
                },
              ].map((item, index) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`group flex items-center px-4 py-3 rounded-xl font-medium transition-all duration-300 ${
                    item.active
                      ? 'hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-900 hover:text-[#386851] dark:hover:text-[#4a7c59] dark:text-gray-100 hover:shadow-sm'
                      : 'bg-gray-50 dark:bg-gray-800 text-gray-400 dark:text-gray-500 cursor-not-allowed hover:bg-gray-100 dark:hover:bg-gray-700'
                  }`}
                  onClick={() => item.active && setIsMenuOpen(false)}
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <MaterialIcon
                    icon={item.icon}
                    size="sm"
                    className={`mr-3 transition-all duration-300 ${
                      item.active
                        ? 'opacity-70 group-hover:opacity-100 group-hover:text-[#386851] dark:group-hover:text-[#4a7c59]'
                        : 'opacity-50'
                    }`}
                  />
                  <div className="flex-1">
                    <div className="font-medium text-sm">{item.label}</div>
                    {!item.active && (
                      <div className="flex items-center space-x-1 text-gray-400 text-xs">
                        <MaterialIcon
                          icon="schedule"
                          size="sm"
                          className="text-xs"
                        />
                        <span>Coming Soon</span>
                      </div>
                    )}
                    {item.active && (
                      <div className="text-gray-500 dark:text-gray-400 text-xs">
                        {item.description}
                      </div>
                    )}
                  </div>
                  {item.active && (
                    <MaterialIcon
                      icon="arrow_forward"
                      size="sm"
                      className="opacity-0 group-hover:opacity-100 ml-2 text-[#386851] dark:text-[#4a7c59] transition-all group-hover:translate-x-1 duration-300 transform"
                    />
                  )}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
