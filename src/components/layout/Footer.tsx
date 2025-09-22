'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { 
  PhoneIcon, 
  EmailIcon, 
  LocationIcon, 
  HammerIcon, 
  HomeIcon, 
  ToolsIcon, 
  CogIcon,
  FacebookIcon,
  InstagramIcon,
  LinkedInIcon,
  TwitterIcon
} from '@/components/icons/SharpDuotoneIcons'
import { Button } from '@/components/ui/Button'
import { Modal } from '@/components/ui/Modal'

export default function Footer() {
  const [isTeamModalOpen, setIsTeamModalOpen] = useState(false)

  return (
    <footer className="bg-gray-900 dark:bg-gray-950 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info Column */}
          <div className="space-y-6">
            <div>
              <Image
                src="/images/logo/mh-logo.png"
                alt="MH Construction LLC"
                width={315}
                height={158}
                className="h-32 w-auto mb-4"
              />
              <p className="text-gray-300 dark:text-gray-400 text-sm">
                MH Construction LLC - Professional construction services with military precision and veteran integrity.
              </p>
            </div>
            
            <div className="space-y-3">
              <div className="flex items-center text-sm text-gray-300 dark:text-gray-400">
                <PhoneIcon size="sm" className="mr-3 text-red-400 dark:text-red-500" />
                <a href="tel:+15093086489" className="hover:text-white dark:hover:text-red-300 transition-colors">
                  (509) 308-6489
                </a>
              </div>
              <div className="flex items-center text-sm text-gray-300 dark:text-gray-400">
                <EmailIcon size="sm" className="mr-3 text-red-400 dark:text-red-500" />
                <a href="mailto:info@mhconstructionllc.com" className="hover:text-white dark:hover:text-red-300 transition-colors">
                  info@mhconstructionllc.com
                </a>
              </div>
              <div className="flex items-start text-sm text-gray-300 dark:text-gray-400">
                <LocationIcon size="sm" className="mr-3 text-red-400 dark:text-red-500 mt-0.5 flex-shrink-0" />
                <span>3111 N. Capital Ave.<br />Pasco, WA 99301</span>
              </div>
            </div>
          </div>

          {/* Quick Links Column 1 */}
          <div>
            <h3 className="text-lg font-semibold mb-6 text-white dark:text-gray-100">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/" className="text-gray-300 dark:text-gray-400 hover:text-red-400 dark:hover:text-red-300 transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-gray-300 dark:text-gray-400 hover:text-red-400 dark:hover:text-red-300 transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/services" className="text-gray-300 dark:text-gray-400 hover:text-red-400 dark:hover:text-red-300 transition-colors">
                  Services
                </Link>
              </li>
              <li>
                <Link href="/projects" className="text-gray-300 dark:text-gray-400 hover:text-red-400 dark:hover:text-red-300 transition-colors">
                  Projects
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-300 dark:text-gray-400 hover:text-red-400 dark:hover:text-red-300 transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/quote" className="text-gray-300 dark:text-gray-400 hover:text-red-400 dark:hover:text-red-300 transition-colors">
                  Get Quote
                </Link>
              </li>
            </ul>
          </div>

          {/* Quick Links Column 2 */}
          <div>
            <h3 className="text-lg font-semibold mb-6 text-white dark:text-gray-100">Resources</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/wounded-warrior" className="text-gray-300 dark:text-gray-400 hover:text-red-400 dark:hover:text-red-300 transition-colors">
                  Wounded Warrior Project
                </Link>
              </li>
              <li>
                <Link href="/careers" className="text-gray-300 dark:text-gray-400 hover:text-red-400 dark:hover:text-red-300 transition-colors">
                  Careers
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-gray-300 dark:text-gray-400 hover:text-red-400 dark:hover:text-red-300 transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/testimonials" className="text-gray-300 dark:text-gray-400 hover:text-red-400 dark:hover:text-red-300 transition-colors">
                  Testimonials
                </Link>
              </li>
              <li>
                <Link href="/gallery" className="text-gray-300 dark:text-gray-400 hover:text-red-400 dark:hover:text-red-300 transition-colors">
                  Gallery
                </Link>
              </li>
              <li>
                <button
                  onClick={() => setIsTeamModalOpen(true)}
                  className="text-gray-300 dark:text-gray-400 hover:text-red-400 dark:hover:text-red-300 transition-colors"
                >
                  Team Access
                </button>
              </li>
            </ul>
          </div>

          {/* Newsletter & Social Column */}
          <div>
            <h3 className="text-lg font-semibold mb-6 text-white dark:text-gray-100">Stay Connected</h3>
            
            {/* Social Media */}
            <div className="mb-6">
              <p className="text-gray-300 dark:text-gray-400 text-sm mb-4">Follow us on social media</p>
              <div className="flex space-x-6">
                <a
                  href="https://facebook.com/mhconstructionllc"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group p-2 rounded-lg bg-gray-800 dark:bg-gray-900 hover:bg-red-500 transition-all duration-300 transform hover:scale-110 hover:shadow-lg hover:shadow-red-500/25"
                >
                  <FacebookIcon size="lg" className="text-gray-400 group-hover:text-white transition-colors duration-300" />
                </a>
                <a
                  href="https://instagram.com/mhconstructionllc"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group p-2 rounded-lg bg-gray-800 dark:bg-gray-900 hover:bg-red-500 transition-all duration-300 transform hover:scale-110 hover:shadow-lg hover:shadow-red-500/25"
                >
                  <InstagramIcon size="lg" className="text-gray-400 group-hover:text-white transition-colors duration-300" />
                </a>
                <a
                  href="https://linkedin.com/company/mhconstructionllc"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group p-2 rounded-lg bg-gray-800 dark:bg-gray-900 hover:bg-red-500 transition-all duration-300 transform hover:scale-110 hover:shadow-lg hover:shadow-red-500/25"
                >
                  <LinkedInIcon size="lg" className="text-gray-400 group-hover:text-white transition-colors duration-300" />
                </a>
                <a
                  href="https://twitter.com/mhconstructionllc"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group p-2 rounded-lg bg-gray-800 dark:bg-gray-900 hover:bg-red-500 transition-all duration-300 transform hover:scale-110 hover:shadow-lg hover:shadow-red-500/25"
                >
                  <TwitterIcon size="lg" className="text-gray-400 group-hover:text-white transition-colors duration-300" />
                </a>
              </div>
            </div>

            {/* Newsletter */}
            <div>
              <p className="text-gray-300 dark:text-gray-400 text-sm mb-4">
                Subscribe to our newsletter for updates and construction tips.
              </p>
              <div className="flex flex-col space-y-2">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="px-3 py-2 bg-gray-800 dark:bg-gray-900 border border-gray-700 dark:border-gray-600 rounded-md text-white dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-red-500 dark:focus:ring-red-400 focus:border-transparent transition-colors"
                />
                <Button variant="primary" size="sm" className="w-full hover:bg-red-600 dark:hover:bg-red-500 transition-colors">
                  Subscribe
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-gray-800 dark:border-gray-700">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-gray-400 dark:text-gray-500 text-sm mb-4 md:mb-0">
              © {new Date().getFullYear()} MH Construction LLC. All rights reserved.
            </div>
            <div className="flex space-x-6 text-sm">
              <Link href="/privacy" className="text-gray-400 dark:text-gray-500 hover:text-red-400 dark:hover:text-red-300 transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms" className="text-gray-400 dark:text-gray-500 hover:text-red-400 dark:hover:text-red-300 transition-colors">
                Terms of Service
              </Link>
              <Link href="/dashboard" className="text-gray-400 dark:text-gray-500 hover:text-red-400 dark:hover:text-red-300 transition-colors">
                Team Dashboard
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Team Access Modal */}
      <Modal 
        isOpen={isTeamModalOpen} 
        onClose={() => setIsTeamModalOpen(false)}
        size="md"
        title="Team Access"
      >
        <div className="p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Team Access</h2>
          <p className="text-gray-600 mb-6">
            Access the team portal to view project updates, schedules, and internal resources.
          </p>
          <div className="space-y-4">
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">
                Username
              </label>
              <input
                type="text"
                id="username"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                placeholder="Enter your username"
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <input
                type="password"
                id="password"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                placeholder="Enter your password"
              />
            </div>
            <div className="flex justify-end space-x-3 pt-4">
              <Button variant="secondary" onClick={() => setIsTeamModalOpen(false)}>
                Cancel
              </Button>
              <Button variant="primary">
                Sign In
              </Button>
            </div>
          </div>
        </div>
      </Modal>
    </footer>
  )
}
