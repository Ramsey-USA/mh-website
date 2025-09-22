// Navigation component with responsive hamburger menu and authentication
'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Button } from '../ui'
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
          ? 'bg-white/95 backdrop-blur-md shadow-lg border-b border-brand-primary/10' 
          : 'bg-white shadow-md'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Logo Section - Clean and Minimal */}
            <div className="flex-shrink-0">
              <Link href="/" className="flex items-center group">
                <div className="relative">
                  <img 
                    src="/images/logo/mh-logo.png" 
                    alt="MH Construction Logo" 
                    className="h-14 w-auto group-hover:scale-105 transition-transform duration-200"
                    loading="eager"
                  />
                  {/* Logo glow effect */}
                  <div className="absolute inset-0 h-14 w-auto bg-brand-primary/20 rounded-lg blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"></div>
                </div>
              </Link>
            </div>

            {/* CTA Buttons - Desktop Only */}
            <div className="hidden lg:flex items-center space-x-6">
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

            {/* Hamburger Menu Button - Always Visible */}
            <div className="flex items-center">
              <button
                onClick={toggleMenu}
                type="button"
                className={`relative inline-flex items-center justify-center p-3 rounded-xl transition-all duration-200 ${
                  isMenuOpen 
                    ? 'bg-brand-primary text-white shadow-lg' 
                    : 'bg-brand-light/30 text-brand-primary hover:bg-brand-primary hover:text-white'
                }`}
                aria-controls="mobile-menu"
                aria-expanded={isMenuOpen}
              >
                <span className="sr-only">Open main menu</span>
                {/* Sharp Duotone Menu/Close Icon */}
                {isMenuOpen ? (
                  <CloseIcon 
                    size="lg" 
                    primaryColor="currentColor" 
                    secondaryColor="rgba(255,255,255,0.6)"
                  />
                ) : (
                  <MenuIcon 
                    size="lg" 
                    primaryColor="currentColor" 
                    secondaryColor="rgba(59,130,246,0.4)"
                  />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile/Tablet Slide-out Menu */}
        <div className={`lg:hidden fixed inset-y-0 right-0 w-80 max-w-full bg-white shadow-2xl border-l border-brand-primary/20 transform transition-transform duration-300 ease-in-out ${
          isMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}>
          <div className="flex flex-col h-full">
            {/* Menu Header */}
            <div className="bg-gradient-to-r from-brand-primary to-brand-accent p-6 text-white">
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <img 
                    src="/images/logo/mh-logo.png" 
                    alt="MH Construction Logo" 
                    className="h-12 w-auto filter brightness-0 invert"
                    loading="eager"
                  />
                </div>
                <button
                  onClick={() => setIsMenuOpen(false)}
                  className="p-2 rounded-lg hover:bg-white/20 transition-colors"
                >
                  <CloseIcon 
                    size="lg" 
                    primaryColor="currentColor" 
                    secondaryColor="rgba(255,255,255,0.6)"
                  />
                </button>
              </div>
            </div>

            {/* Menu Content */}
            <div className="flex-1 overflow-y-auto">
              {/* Navigation Links */}
              <div className="px-6 py-4 space-y-2">
                {navigationLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`block px-4 py-3 rounded-lg font-medium transition-all duration-200 ${
                      link.featured 
                        ? 'bg-gradient-to-r from-brand-primary to-brand-accent text-white shadow-lg hover:shadow-xl' 
                        : 'text-gray-700 hover:bg-brand-light/50 hover:text-brand-primary'
                    }`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <div className="flex items-center justify-between">
                      <span>{link.label}</span>
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
                    className="block px-4 py-3 rounded-lg font-medium text-gray-700 hover:bg-brand-light/50 hover:text-brand-primary transition-all duration-200"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Dashboard
                  </Link>
                )}
              </div>

              {/* Mobile User Actions */}
              <div className="px-6 py-4 border-t border-gray-200">
                {user ? (
                  // Authenticated User Mobile Actions
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3 bg-brand-light/30 rounded-lg p-3">
                      <div className="w-12 h-12 bg-gradient-to-r from-brand-primary to-brand-accent text-white rounded-full flex items-center justify-center text-sm font-bold">
                        {userProfile?.displayName?.charAt(0) || user.email?.charAt(0) || 'U'}
                      </div>
                      <div>
                        <div className="font-semibold text-gray-900">
                          {userProfile?.displayName || 'User'}
                        </div>
                        <div className="text-brand-secondary capitalize text-sm">
                          {userProfile?.role?.replace('_', ' ') || 'Member'}
                        </div>
                      </div>
                    </div>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      withRing
                      className="w-full" 
                      onClick={handleLogout}
                    >
                      Sign Out
                    </Button>
                  </div>
                ) : (
                  // Guest Mobile Actions
                  <div className="space-y-3">
                    <Link href="/auth/login" onClick={() => setIsMenuOpen(false)}>
                      <Button variant="outline" size="sm" withRing className="w-full">
                        Team Login
                      </Button>
                    </Link>
                  </div>
                )}
              </div>
            </div>

            {/* PWA Status Footer */}
            <div className="px-6 py-4 border-t border-gray-200 bg-gray-50">
              <div className="flex items-center justify-center space-x-4">
                <BackgroundSyncStatus />
                <PushNotifications />
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Menu Overlay */}
        {isMenuOpen && (
          <div 
            className="lg:hidden fixed inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setIsMenuOpen(false)}
          />
        )}
      </nav>

      {/* Spacer to prevent content from hiding behind fixed nav */}
      <div className="h-20"></div>
    </>
  )
}