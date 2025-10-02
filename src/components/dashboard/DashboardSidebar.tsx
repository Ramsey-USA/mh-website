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
      badge: null,
    },
    {
      id: 'consultations',
      label: 'Consultations',
      icon: '📅',
      href: '/dashboard/consultations',
      badge: '3',
    },
    {
      id: 'projects',
      label: 'Projects',
      icon: '🏗️',
      href: '/dashboard/projects',
      badge: '8',
    },
    {
      id: 'estimates',
      label: 'Estimates',
      icon: '💰',
      href: '/dashboard/estimates',
      badge: '12',
    },
    {
      id: 'clients',
      label: 'Clients',
      icon: '👥',
      href: '/dashboard/clients',
      badge: null,
    },
    {
      id: 'calendar',
      label: 'Calendar',
      icon: '📆',
      href: '/dashboard/calendar',
      badge: null,
    },
    {
      id: 'team',
      label: 'Team Management',
      icon: '👨‍💼',
      href: '/dashboard/team',
      badge: null,
    },
    {
      id: 'reports',
      label: 'Reports',
      icon: '📊',
      href: '/dashboard/reports',
      badge: null,
    },
    {
      id: 'settings',
      label: 'Settings',
      icon: '⚙️',
      href: '/dashboard/settings',
      badge: null,
    },
  ]

  const veteranFeatures = [
    {
      id: 'wounded-warrior',
      label: 'Wounded Warrior',
      icon: '🎖️',
      href: '/dashboard/wounded-warrior',
      description: 'Initiative Management',
    },
    {
      id: 'military-clients',
      label: 'Military Clients',
      icon: '🪖',
      href: '/dashboard/military-clients',
      description: 'Special Programs',
    },
  ]

  return (
    <div className="top-0 left-0 z-40 fixed bg-white shadow-lg border-r w-64 h-full">
      {/* Logo */}
      <div className="p-6 border-b">
        <Link href="/dashboard" className="flex items-center">
          <img
            src="/images/logo/mh-logo.png"
            alt="MH Construction Logo"
            className="mr-3 w-auto h-8"
            loading="eager"
          />
          <div className="flex flex-col">
            <div className="font-tactic-bold text-brand-primary text-lg">
              MH Construction
            </div>
            <div className="font-semibold text-brand-secondary text-xs">
              DASHBOARD
            </div>
          </div>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4">
        <div className="space-y-2">
          {menuItems.map(item => (
            <Link
              key={item.id}
              href={item.href}
              onClick={() => setActiveSection(item.id)}
              className={`
                flex items-center justify-between px-3 py-2 rounded-lg text-sm transition-colors
                ${
                  activeSection === item.id
                    ? 'bg-brand-primary text-white'
                    : 'text-gray-700 hover:bg-gray-100'
                }
              `}
            >
              <div className="flex items-center">
                <span className="mr-3 text-lg">{item.icon}</span>
                <span className="font-medium">{item.label}</span>
              </div>
              {item.badge && (
                <span
                  className={`
                  px-2 py-1 text-xs rounded-full font-semibold
                  ${
                    activeSection === item.id
                      ? 'bg-white text-brand-primary'
                      : 'bg-red-500 text-white'
                  }
                `}
                >
                  {item.badge}
                </span>
              )}
            </Link>
          ))}
        </div>

        {/* Veteran Features Section */}
        <div className="mt-8 pt-6 border-t">
          <h3 className="mb-3 font-semibold text-gray-500 text-xs uppercase tracking-wider">
            Veteran Services
          </h3>
          <div className="space-y-2">
            {veteranFeatures.map(item => (
              <Link
                key={item.id}
                href={item.href}
                className="flex items-start hover:bg-blue-50 px-3 py-2 rounded-lg text-gray-700 text-sm transition-colors"
              >
                <span className="mr-3 text-lg">{item.icon}</span>
                <div>
                  <div className="font-medium">{item.label}</div>
                  <div className="text-gray-500 text-xs">
                    {item.description}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Support Section */}
        <div className="mt-8 pt-6 border-t">
          <div className="bg-gray-50 p-4 rounded-lg">
            <h4 className="mb-2 font-semibold text-gray-800 text-sm">
              Need Help?
            </h4>
            <p className="mb-3 text-gray-600 text-xs">
              Access our knowledge base or contact support
            </p>
            <Button variant="outline" size="sm" className="w-full">
              Get Support
            </Button>
          </div>
        </div>
      </nav>

      {/* User Profile */}
      <div className="p-4 border-t">
        <div className="flex items-center">
          <div className="flex justify-center items-center bg-brand-primary rounded-full w-10 h-10 font-bold text-white">
            MH
          </div>
          <div className="flex-1 ml-3">
            <div className="font-semibold text-gray-800 text-sm">
              Mark Harris
            </div>
            <div className="text-gray-500 text-xs">Founder & Lead</div>
          </div>
          <Button variant="outline" size="sm">
            ⋯
          </Button>
        </div>
      </div>
    </div>
  )
}
