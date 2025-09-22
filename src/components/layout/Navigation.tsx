// Navigation component with responsive hamburger menu and authentication
'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Button, ThemeToggle } from '../ui'
import { useAuth } from '../../lib/auth/AuthContext'
import PushNotifications from '../pwa/PushNotifications'
import BackgroundSyncStatus from '../pwa/BackgroundSyncStatus'
import { MenuIcon, CloseIcon, ArrowRightIcon } from '../icons/SharpDuotoneIcons'

export function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const { user, userProfile, logout } = useAuth()
  const router = useRouter()

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen)

  // Handle scroll effect for header
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleLogout = async () => {
    try {
      await logout()
      router.push('/')
      setIsMenuOpen(false)
    } catch (error) {
      console.error('Logout error:', error)
    }
  }

  const navigationLinks = [
    { href: '/', label: 'Home', priority: 'high' },
    { href: '/about', label: 'About', priority: 'high' },
    { href: '/wounded-warrior', label: 'Wounded Warrior', priority: 'high' },
    { href: '/services', label: 'Services', priority: 'high' },
    { href: '/portfolio', label: 'Portfolio', priority: 'high' },
    { href: '/projects', label: 'Projects', priority: 'medium' },
    { href: '/testimonials', label: 'Testimonials', priority: 'medium' },
    { href: '/blog', label: 'Blog', priority: 'medium' },
    { href: '/news', label: 'News', priority: 'low' },
    { href: '/estimator', label: 'AI Estimator', priority: 'high', featured: true },
    { href: '/booking', label: 'Book Consultation', priority: 'high', featured: true },
    { href: '/contact', label: 'Contact', priority: 'high' },
  ]

  // Only show dashboard link if user has team member or admin access
  const canAccessDashboard = userProfile && (userProfile.role === 'team_member' || userProfile.role === 'admin')

  return (
    <>
      {/* Main Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white/95 dark:bg-gray-900/95 backdrop-blur-md shadow-lg border-b border-red-500/10' 
          : 'bg-white dark:bg-gray-900 shadow-md'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16 sm:h-20">
            {/* Logo Section - Responsive sizing */}
            <div className="flex-shrink-0">
              <Link href="/" className="flex items-center group">
                <div className="relative">
                  <img 
                    src="/images/logo/mh-logo.png" 
                    alt="MH Construction Logo" 
                    className="h-10 sm:h-12 lg:h-14 w-auto group-hover:scale-105 transition-transform duration-200"
                    loading="eager"
                  />
                  {/* Logo glow effect */}
                  <div className="absolute inset-0 h-10 sm:h-12 lg:h-14 w-auto bg-red-500/20 rounded-lg blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"></div>
                </div>
              </Link>
            </div>

            {/* Desktop Controls - Theme Toggle & CTA Buttons */}
            <div className="hidden xl:flex items-center space-x-4">
              {/* Theme Toggle */}
              <ThemeToggle />
              
              {/* CTA Buttons - Full size on XL screens */}
              <div className="flex items-center space-x-3 ml-4">
                <Link href="/estimator">
                  <Button variant="secondary" size="sm" withRing>
                    Free AI Estimate
                  </Button>
                </Link>
                <Link href="/booking">
                  <Button variant="gradient" size="sm" withRing>
                    Schedule Consultation
                  </Button>
                </Link>
              </div>
            </div>

            {/* Large Screen Controls - Theme Toggle & Compact CTA */}
            <div className="hidden lg:flex xl:hidden items-center space-x-3">
              {/* Theme Toggle */}
              <div className="scale-90">
                <ThemeToggle />
              </div>
              
              {/* Compact CTA Buttons */}
              <div className="flex items-center space-x-2">
                <Link href="/estimator">
                  <Button variant="secondary" size="sm" withRing className="text-sm px-3">
                    Estimate
                  </Button>
                </Link>
                <Link href="/booking">
                  <Button variant="gradient" size="sm" withRing className="text-sm px-3">
                    Book
                  </Button>
                </Link>
              </div>
            </div>

            {/* Mobile/Tablet Controls - Theme Toggle & Hamburger */}
            <div className="flex items-center space-x-2 sm:space-x-3 lg:hidden">
              {/* Mobile Theme Toggle - Smaller on mobile */}
              <div className="scale-75 sm:scale-90">
                <ThemeToggle />
              </div>
              
              {/* Enhanced Hamburger Menu Button */}
              <button
                onClick={toggleMenu}
                type="button"
                className={`relative inline-flex items-center justify-center p-2 sm:p-3 rounded-xl transition-all duration-300 transform ${
                  isMenuOpen 
                    ? 'bg-gradient-to-r from-red-500 to-red-600 text-white shadow-lg shadow-red-500/25 scale-105 rotate-180' 
                    : 'bg-red-50 dark:bg-red-950/30 text-red-600 dark:text-red-400 hover:bg-red-500 hover:text-white hover:scale-105 hover:shadow-lg hover:shadow-red-500/25'
                } border border-red-200 dark:border-red-800/50`}
                aria-controls="mobile-menu"
                aria-expanded={isMenuOpen}
              >
                <span className="sr-only">{isMenuOpen ? 'Close menu' : 'Open menu'}</span>
                {/* Enhanced Sharp Duotone Menu/Close Icon with smooth transition */}
                <div className="relative">
                  {isMenuOpen ? (
                    <CloseIcon 
                      size="md" 
                      primaryColor="currentColor" 
                      secondaryColor="rgba(255,255,255,0.6)"
                      className="transition-all duration-300 sm:w-6 sm:h-6"
                    />
                  ) : (
                    <MenuIcon 
                      size="md" 
                      primaryColor="currentColor" 
                      secondaryColor="rgba(239,68,68,0.5)"
                      className="transition-all duration-300 sm:w-6 sm:h-6"
                    />
                  )}
                  
                  {/* Animated ring effect */}
                  <div className={`absolute inset-0 rounded-lg transition-all duration-300 ${
                    isMenuOpen 
                      ? 'ring-2 ring-white/30 ring-offset-2 ring-offset-red-500' 
                      : 'ring-0 ring-red-500/0'
                  }`} />
                </div>
              </button>
            </div>
          </div>
        </div>

        {/* Enhanced Mobile/Tablet Slide-out Menu */}
        <div className={`lg:hidden fixed inset-y-0 right-0 w-full max-w-sm sm:max-w-md bg-white dark:bg-gray-900 shadow-2xl border-l border-red-500/20 dark:border-red-500/30 transform transition-all duration-300 ease-in-out z-50 ${
          isMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}>
          <div className="flex flex-col h-full">
            {/* Enhanced Menu Header with MH Branding */}
            <div className="bg-gradient-to-r from-red-500 to-red-600 dark:from-red-600 dark:to-red-700 p-4 sm:p-6 text-white relative overflow-hidden">
              {/* Background pattern */}
              <div className="absolute inset-0 opacity-10">
                <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white/5 to-white/10"></div>
              </div>
              
              <div className="flex justify-between items-center relative z-10">
                <div className="flex items-center space-x-2 sm:space-x-3">
                  <img 
                    src="/images/logo/mh-logo.png" 
                    alt="MH Construction Logo" 
                    className="h-10 sm:h-12 w-auto filter brightness-0 invert"
                    loading="eager"
                  />
                  <div className="hidden sm:block">
                    <div className="font-bold text-lg">MH Construction</div>
                    <div className="text-red-100 text-sm">Professional Services</div>
                  </div>
                </div>
                <button
                  onClick={() => setIsMenuOpen(false)}
                  className="p-2 rounded-lg hover:bg-white/20 transition-all duration-200 transform hover:scale-110"
                >
                  <CloseIcon 
                    size="md" 
                    primaryColor="currentColor" 
                    secondaryColor="rgba(255,255,255,0.6)"
                  />
                </button>
              </div>
            </div>

            {/* Menu Content with Enhanced Styling */}
            <div className="flex-1 overflow-y-auto bg-gradient-to-b from-gray-50 to-white dark:from-gray-800 dark:to-gray-900">
              {/* Navigation Links with Improved Design */}
              <div className="px-4 sm:px-6 py-4 sm:py-6 space-y-2 sm:space-y-3">
                <div className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3 sm:mb-4">
                  Navigation
                </div>
                {navigationLinks.map((link, index) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`block px-3 sm:px-4 py-3 sm:py-4 rounded-xl font-medium transition-all duration-300 transform hover:scale-[1.02] text-sm sm:text-base ${
                      link.featured 
                        ? 'bg-gradient-to-r from-red-500 to-red-600 text-white shadow-lg shadow-red-500/25 hover:shadow-xl hover:shadow-red-500/30' 
                        : 'text-gray-700 dark:text-gray-300 hover:bg-red-50 dark:hover:bg-red-950/30 hover:text-red-600 dark:hover:text-red-400 border border-transparent hover:border-red-200 dark:hover:border-red-800/50'
                    }`}
                    onClick={() => setIsMenuOpen(false)}
                    style={{ animationDelay: `${index * 50}ms` }}
                  >
                    <div className="flex items-center justify-between">
                      <span className="flex items-center">
                        {link.label}
                        {link.featured && (
                          <span className="ml-2 text-xs bg-white/20 px-2 py-1 rounded-full hidden sm:inline">
                            Popular
                          </span>
                        )}
                      </span>
                      {link.featured && (
                        <ArrowRightIcon 
                          size="sm" 
                          primaryColor="currentColor" 
                          secondaryColor="rgba(255,255,255,0.6)"
                        />
                      )}
                    </div>
                  </Link>
                ))}
                
                {/* Dashboard Link for Mobile */}
                {canAccessDashboard && (
                  <Link
                    href="/dashboard"
                    className="block px-3 sm:px-4 py-3 sm:py-4 rounded-xl font-medium text-gray-700 dark:text-gray-300 hover:bg-red-50 dark:hover:bg-red-950/30 hover:text-red-600 dark:hover:text-red-400 transition-all duration-300 border border-transparent hover:border-red-200 dark:hover:border-red-800/50 text-sm sm:text-base"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <div className="flex items-center justify-between">
                      <span>Team Dashboard</span>
                      <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    </div>
                  </Link>
                )}
              </div>

              {/* Enhanced Mobile User Actions */}
              <div className="px-6 py-6 border-t border-gray-200 dark:border-gray-700">
                <div className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-4">
                  Account
                </div>
                {user ? (
                  // Authenticated User Mobile Actions
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3 bg-gradient-to-r from-red-50 to-red-100 dark:from-red-950/30 dark:to-red-900/30 rounded-xl p-4 border border-red-200/50 dark:border-red-800/50">
                      <div className="w-12 h-12 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-full flex items-center justify-center text-sm font-bold shadow-lg">
                        {userProfile?.displayName?.charAt(0) || user.email?.charAt(0) || 'U'}
                      </div>
                      <div>
                        <div className="font-semibold text-gray-900 dark:text-white">
                          {userProfile?.displayName || 'User'}
                        </div>
                        <div className="text-red-600 dark:text-red-400 capitalize text-sm font-medium">
                          {userProfile?.role?.replace('_', ' ') || 'Member'}
                        </div>
                      </div>
                    </div>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      withRing
                      className="w-full hover:bg-red-50 dark:hover:bg-red-950/30 hover:border-red-300 dark:hover:border-red-700" 
                      onClick={handleLogout}
                    >
                      Sign Out
                    </Button>
                  </div>
                ) : (
                  // Guest Mobile Actions
                  <div className="space-y-3">
                    <Link href="/auth/login" onClick={() => setIsMenuOpen(false)}>
                      <Button variant="outline" size="sm" withRing className="w-full hover:bg-red-50 dark:hover:bg-red-950/30 hover:border-red-300 dark:hover:border-red-700">
                        Team Login
                      </Button>
                    </Link>
                  </div>
                )}
              </div>
            </div>

            {/* Enhanced PWA Status Footer */}
            <div className="px-6 py-4 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50">
              <div className="flex items-center justify-center space-x-4">
                <BackgroundSyncStatus />
                <PushNotifications />
              </div>
              <div className="text-center mt-2">
                <span className="text-xs text-gray-500 dark:text-gray-400">
                  MH Construction © 2025
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Mobile Menu Overlay */}
        {isMenuOpen && (
          <div 
            className="lg:hidden fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300"
            onClick={() => setIsMenuOpen(false)}
          />
        )}
      </nav>

      {/* Responsive spacer to prevent content from hiding behind fixed nav */}
      <div className="h-16 sm:h-20"></div>
    </>
  )
}