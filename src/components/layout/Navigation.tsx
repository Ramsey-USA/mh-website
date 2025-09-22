// Navigation component with responsive hamburger menu and authentication
'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Button } from '../ui'
import { useAuth } from '../../lib/auth/AuthContext'
import PushNotifications from '../pwa/PushNotifications'
import BackgroundSyncStatus from '../pwa/BackgroundSyncStatus'

export function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { user, userProfile, logout } = useAuth()
  const router = useRouter()

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen)

  const handleLogout = async () => {
    try {
      await logout()
      router.push('/')
    } catch (error) {
      console.error('Logout error:', error)
    }
  }

  const navigationLinks = [
    { href: '/', label: 'Home' },
    { href: '/about', label: 'About' },
    { href: '/services', label: 'Services' },
    { href: '/portfolio', label: 'Portfolio' },
    { href: '/projects', label: 'Projects' },
    { href: '/testimonials', label: 'Testimonials' },
    { href: '/blog', label: 'Blog' },
    { href: '/news', label: 'News' },
    { href: '/estimator', label: 'AI Estimator' },
    { href: '/booking', label: 'Book Consultation' },
    { href: '/contact', label: 'Contact' },
  ]

  // Only show dashboard link if user has team member or admin access
  const canAccessDashboard = userProfile && (userProfile.role === 'team_member' || userProfile.role === 'admin')

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-center">
              <div className="text-2xl font-tactic-bold text-brand-primary">
                MH Construction
              </div>
              <div className="ml-2 text-xs text-brand-secondary font-semibold">
                VETERAN OWNED
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              {navigationLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-gray-700 hover:text-brand-primary px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200"
                >
                  {link.label}
                </Link>
              ))}
              
              {/* Dashboard Link for Authorized Users */}
              {canAccessDashboard && (
                <Link
                  href="/dashboard"
                  className="text-gray-700 hover:text-brand-primary px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200"
                >
                  Dashboard
                </Link>
              )}
            </div>
          </div>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-4">
            {/* Background Sync Status */}
            <BackgroundSyncStatus />
            
            {/* Push Notifications */}
            <PushNotifications />
            
            {user ? (
              // Authenticated User Actions
              <div className="flex items-center space-x-4">
                {/* User Info */}
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-brand-primary text-white rounded-full flex items-center justify-center text-sm font-bold">
                    {userProfile?.displayName?.charAt(0) || user.email?.charAt(0) || 'U'}
                  </div>
                  <div className="text-sm">
                    <div className="font-medium text-gray-900">
                      {userProfile?.displayName || 'User'}
                    </div>
                    <div className="text-gray-500 capitalize">
                      {userProfile?.role?.replace('_', ' ') || 'Member'}
                    </div>
                  </div>
                </div>
                
                {/* Logout Button */}
                <Button variant="secondary" size="sm" onClick={handleLogout}>
                  Sign Out
                </Button>
              </div>
            ) : (
              // Guest Actions
              <div className="flex items-center space-x-4">
                <Link href="/auth/login">
                  <Button variant="secondary" size="sm">
                    Team Login
                  </Button>
                </Link>
                <Button variant="primary" size="sm">
                  Schedule Consultation
                </Button>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              type="button"
              className="bg-gray-200 inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-brand-primary hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-brand-primary"
              aria-controls="mobile-menu"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              {/* Hamburger icon */}
              <svg
                className={`${isMenuOpen ? 'hidden' : 'block'} h-6 w-6`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
              {/* Close icon */}
              <svg
                className={`${isMenuOpen ? 'block' : 'hidden'} h-6 w-6`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        <div className={`${isMenuOpen ? 'block' : 'hidden'} md:hidden`}>
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t border-gray-200">
            {navigationLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-gray-700 hover:text-brand-primary block px-3 py-2 rounded-md text-base font-medium transition-colors duration-200"
                onClick={() => setIsMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            
            {/* Dashboard Link for Mobile */}
            {canAccessDashboard && (
              <Link
                href="/dashboard"
                className="text-gray-700 hover:text-brand-primary block px-3 py-2 rounded-md text-base font-medium transition-colors duration-200"
                onClick={() => setIsMenuOpen(false)}
              >
                Dashboard
              </Link>
            )}
            
            {/* Mobile Actions */}
            <div className="pt-4 pb-2 space-y-2">
              {user ? (
                // Authenticated User Mobile Actions
                <div className="space-y-2">
                  <div className="px-3 py-2 border-t border-gray-200">
                    <div className="flex items-center space-x-2">
                      <div className="w-8 h-8 bg-brand-primary text-white rounded-full flex items-center justify-center text-sm font-bold">
                        {userProfile?.displayName?.charAt(0) || user.email?.charAt(0) || 'U'}
                      </div>
                      <div className="text-sm">
                        <div className="font-medium text-gray-900">
                          {userProfile?.displayName || 'User'}
                        </div>
                        <div className="text-gray-500 capitalize">
                          {userProfile?.role?.replace('_', ' ') || 'Member'}
                        </div>
                      </div>
                    </div>
                  </div>
                  <Button variant="secondary" size="sm" className="w-full" onClick={handleLogout}>
                    Sign Out
                  </Button>
                </div>
              ) : (
                // Guest Mobile Actions
                <div className="space-y-2">
                  <Link href="/auth/login" onClick={() => setIsMenuOpen(false)}>
                    <Button variant="secondary" size="sm" className="w-full">
                      Team Login
                    </Button>
                  </Link>
                  <Button variant="primary" size="sm" className="w-full">
                    Schedule Consultation
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}