// Footer component with company information and links
'use client'

import React from 'react'
import Link from 'next/link'
import { Button } from '../ui'
import { useAuth } from '../../lib/auth/AuthContext'
import PushNotifications from '../pwa/PushNotifications'
import BackgroundSyncStatus from '../pwa/BackgroundSyncStatus'
import { PhoneIcon, LocationIcon, EmailIcon, UserIcon, BellIcon, SyncIcon, LogoutIcon } from '../icons/SharpDuotoneIcons'

export function Footer() {
  const currentYear = new Date().getFullYear()
  const { user, userProfile, logout } = useAuth()
  
  const handleLogout = async () => {
    try {
      await logout()
    } catch (error) {
      console.error('Logout error:', error)
    }
  }

  // Only show dashboard link if user has team member or admin access
  const canAccessDashboard = userProfile && (userProfile.role === 'team_member' || userProfile.role === 'admin')

  const companyInfo = {
    name: "MH Construction",
    phone: "(509) 308-6489",
    address: "3111 N. Capital Ave., Pasco, WA 99301",
    email: "info@mhconstruction.com",
    businessHours: {
      consultations: "Monday-Friday 8:00 AM - 3:00 PM (Pacific Time)",
      general: "Monday-Friday 7:00 AM - 6:00 PM, Saturday 8:00 AM - 4:00 PM",
      emergency: "Available 24/7"
    }
  }

  const serviceLinks = [
    { href: '/services/residential', label: 'Residential Construction' },
    { href: '/services/commercial', label: 'Commercial Construction' },
    { href: '/services/renovation', label: 'Renovation & Remodeling' },
    { href: '/services/custom', label: 'Custom Builds' },
  ]

  const quickLinks = [
    { href: '/about', label: 'About Us' },
    { href: '/portfolio', label: 'Portfolio' },
    { href: '/ai-estimator', label: 'AI Estimator' },
    { href: '/team-dashboard', label: 'Team Portal' },
  ]

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Company Information */}
          <div className="space-y-4">
            <div>
              <h3 className="text-xl font-tactic-bold text-brand-secondary">
                {companyInfo.name}
              </h3>
              <p className="text-sm text-yellow-400 font-semibold">VETERAN OWNED</p>
            </div>
            
            <div className="space-y-2 text-sm">
              <p className="flex items-center">
                <PhoneIcon 
                  size="sm" 
                  className="mr-2" 
                  primaryColor="currentColor" 
                  secondaryColor="rgba(255,255,255,0.6)"
                />
                {companyInfo.phone}
              </p>
              
              <p className="flex items-start">
                <LocationIcon 
                  size="sm" 
                  className="mr-2 mt-0.5 flex-shrink-0" 
                  primaryColor="currentColor" 
                  secondaryColor="rgba(255,255,255,0.6)"
                />
                {companyInfo.address}
              </p>
              
              <p className="flex items-center">
                <EmailIcon 
                  size="sm" 
                  className="mr-2" 
                  primaryColor="currentColor" 
                  secondaryColor="rgba(255,255,255,0.6)"
                />
                {companyInfo.email}
              </p>
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-lg font-semibold text-brand-secondary mb-4">Our Services</h4>
            <ul className="space-y-2">
              {serviceLinks.map((link) => (
                <li key={link.href}>
                  <Link 
                    href={link.href}
                    className="text-sm text-gray-300 hover:text-white transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold text-brand-secondary mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link 
                    href={link.href}
                    className="text-sm text-gray-300 hover:text-white transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Business Hours */}
          <div>
            <h4 className="text-lg font-semibold text-brand-secondary mb-4">Business Hours</h4>
            <div className="space-y-3 text-sm">
              <div>
                <p className="font-medium text-white">Consultations</p>
                <p className="text-gray-300">{companyInfo.businessHours.consultations}</p>
              </div>
              
              <div>
                <p className="font-medium text-white">General Business</p>
                <p className="text-gray-300">{companyInfo.businessHours.general}</p>
              </div>
              
              <div>
                <p className="font-medium text-yellow-400">Emergency Services</p>
                <p className="text-gray-300">{companyInfo.businessHours.emergency}</p>
              </div>
            </div>
          </div>

          {/* Team Access & Notifications */}
          <div>
            <h4 className="text-lg font-semibold text-brand-secondary mb-4">Team Access</h4>
            <div className="space-y-4">
              {/* PWA Status */}
              <div className="flex items-center space-x-3">
                <BackgroundSyncStatus />
                <PushNotifications />
              </div>

              {user ? (
                // Authenticated User Section
                <div className="space-y-3">
                  <div className="bg-brand-light/10 rounded-lg p-3">
                    <div className="flex items-center space-x-2">
                      <div className="w-8 h-8 bg-gradient-to-r from-brand-primary to-brand-accent text-white rounded-full flex items-center justify-center text-xs font-bold">
                        {userProfile?.displayName?.charAt(0) || user.email?.charAt(0) || 'U'}
                      </div>
                      <div className="text-sm">
                        <div className="font-medium text-white">
                          {userProfile?.displayName || 'User'}
                        </div>
                        <div className="text-brand-secondary capitalize text-xs">
                          {userProfile?.role?.replace('_', ' ') || 'Member'}
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {canAccessDashboard && (
                    <Link href="/dashboard">
                      <Button variant="secondary" size="sm" withRing className="w-full">
                        Dashboard
                      </Button>
                    </Link>
                  )}
                  
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
                // Guest Team Access
                <div className="space-y-3">
                  <Link href="/auth/login">
                    <Button variant="outline" size="sm" withRing className="w-full">
                      Team Login
                    </Button>
                  </Link>
                  <div className="text-xs text-gray-400 text-center">
                    Access project dashboards, notifications, and team tools
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-700 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-sm text-gray-400 mb-4 md:mb-0">
              <p>&copy; {currentYear} MH Construction. All rights reserved.</p>
              <p className="mt-1">Building Tomorrow with Today&apos;s Technology - Veteran Owned Excellence</p>
            </div>
            
            <div className="flex space-x-6">
              <Link href="/privacy" className="text-sm text-gray-400 hover:text-white transition-colors duration-200">
                Privacy Policy
              </Link>
              <Link href="/terms" className="text-sm text-gray-400 hover:text-white transition-colors duration-200">
                Terms of Service
              </Link>
            </div>
          </div>

          {/* Military Values Banner */}
          <div className="mt-6 p-4 bg-gradient-to-r from-gray-800 to-gray-700 rounded-lg">
            <div className="text-center">
              <p className="text-sm font-medium text-yellow-400 mb-2">Our Military Values</p>
              <div className="flex flex-wrap justify-center gap-4 text-xs text-gray-300">
                <span>ETHICS</span>
                <span>•</span>
                <span>EXPERIENCE</span>
                <span>•</span>
                <span>INTEGRITY</span>
                <span>•</span>
                <span>HONESTY</span>
                <span>•</span>
                <span>TRUST</span>
                <span>•</span>
                <span>PROFESSIONALISM</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}