// Footer component with company information and links
import React from 'react'
import Link from 'next/link'

export function Footer() {
  const currentYear = new Date().getFullYear()

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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
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
                <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                </svg>
                {companyInfo.phone}
              </p>
              
              <p className="flex items-start">
                <svg className="w-4 h-4 mr-2 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                </svg>
                {companyInfo.address}
              </p>
              
              <p className="flex items-center">
                <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                </svg>
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