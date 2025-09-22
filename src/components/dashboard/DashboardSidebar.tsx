'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { Button } from '../ui'

export function DashboardSidebar() {
  const [activeSection, setActiveSection] = useState('dashboard')

  const menuItems = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      icon: '🏠',
      href: '/dashboard',
      badge: null
    },
    {
      id: 'consultations',
      label: 'Consultations',
      icon: '📅',
      href: '/dashboard/consultations',
      badge: '3'
    },
    {
      id: 'projects',
      label: 'Projects',
      icon: '🏗️',
      href: '/dashboard/projects',
      badge: '8'
    },
    {
      id: 'estimates',
      label: 'Estimates',
      icon: '💰',
      href: '/dashboard/estimates',
      badge: '12'
    },
    {
      id: 'clients',
      label: 'Clients',
      icon: '👥',
      href: '/dashboard/clients',
      badge: null
    },
    {
      id: 'calendar',
      label: 'Calendar',
      icon: '📆',
      href: '/dashboard/calendar',
      badge: null
    },
    {
      id: 'team',
      label: 'Team Management',
      icon: '👨‍💼',
      href: '/dashboard/team',
      badge: null
    },
    {
      id: 'reports',
      label: 'Reports',
      icon: '📊',
      href: '/dashboard/reports',
      badge: null
    },
    {
      id: 'settings',
      label: 'Settings',
      icon: '⚙️',
      href: '/dashboard/settings',
      badge: null
    }
  ]

  const veteranFeatures = [
    {
      id: 'wounded-warrior',
      label: 'Wounded Warrior',
      icon: '🎖️',
      href: '/dashboard/wounded-warrior',
      description: 'Initiative Management'
    },
    {
      id: 'military-clients',
      label: 'Military Clients',
      icon: '🪖',
      href: '/dashboard/military-clients',
      description: 'Special Programs'
    }
  ]

  return (
    <div className="fixed left-0 top-0 h-full w-64 bg-white shadow-lg border-r z-40">
      {/* Logo */}
      <div className="p-6 border-b">
        <Link href="/dashboard" className="flex items-center">
          <img 
            src="/images/logo/mh-logo.png" 
            alt="MH Construction Logo" 
            className="h-8 w-auto mr-3"
            loading="eager"
          />
          <div className="flex flex-col">
            <div className="text-lg font-tactic-bold text-brand-primary">
              MH Construction
            </div>
            <div className="text-xs text-brand-secondary font-semibold">
              DASHBOARD
            </div>
          </div>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4">
        <div className="space-y-2">
          {menuItems.map((item) => (
            <Link
              key={item.id}
              href={item.href}
              onClick={() => setActiveSection(item.id)}
              className={`
                flex items-center justify-between px-3 py-2 rounded-lg text-sm transition-colors
                ${activeSection === item.id 
                  ? 'bg-brand-primary text-white' 
                  : 'text-gray-700 hover:bg-gray-100'
                }
              `}
            >
              <div className="flex items-center">
                <span className="text-lg mr-3">{item.icon}</span>
                <span className="font-medium">{item.label}</span>
              </div>
              {item.badge && (
                <span className={`
                  px-2 py-1 text-xs rounded-full font-semibold
                  ${activeSection === item.id 
                    ? 'bg-white text-brand-primary' 
                    : 'bg-red-500 text-white'
                  }
                `}>
                  {item.badge}
                </span>
              )}
            </Link>
          ))}
        </div>

        {/* Veteran Features Section */}
        <div className="mt-8 pt-6 border-t">
          <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
            Veteran Services
          </h3>
          <div className="space-y-2">
            {veteranFeatures.map((item) => (
              <Link
                key={item.id}
                href={item.href}
                className="flex items-start px-3 py-2 rounded-lg text-sm text-gray-700 hover:bg-blue-50 transition-colors"
              >
                <span className="text-lg mr-3">{item.icon}</span>
                <div>
                  <div className="font-medium">{item.label}</div>
                  <div className="text-xs text-gray-500">{item.description}</div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Support Section */}
        <div className="mt-8 pt-6 border-t">
          <div className="bg-gray-50 p-4 rounded-lg">
            <h4 className="font-semibold text-sm text-gray-800 mb-2">Need Help?</h4>
            <p className="text-xs text-gray-600 mb-3">
              Access our knowledge base or contact support
            </p>
            <Button variant="secondary" size="sm" className="w-full">
              Get Support
            </Button>
          </div>
        </div>
      </nav>

      {/* User Profile */}
      <div className="p-4 border-t">
        <div className="flex items-center">
          <div className="w-10 h-10 bg-brand-primary rounded-full flex items-center justify-center text-white font-bold">
            MH
          </div>
          <div className="ml-3 flex-1">
            <div className="text-sm font-semibold text-gray-800">Mark Harris</div>
            <div className="text-xs text-gray-500">Founder & Lead</div>
          </div>
          <Button variant="secondary" size="sm">
            ⋯
          </Button>
        </div>
      </div>
    </div>
  )
}