'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import {
  WPZoomPhoneIcon as PhoneIcon,
  WPZoomEmailIcon as EmailIcon,
  WPZoomLocationIcon as LocationIcon,
  WPZoomFacebookIcon as FacebookIcon,
  WPZoomInstagramIcon as InstagramIcon,
  WPZoomLinkedInIcon as LinkedInIcon,
  WPZoomTwitterIcon as XIcon,
  WPZoomYouTubeIcon as YouTubeIcon,
} from '@/components/icons/WPZoomIcons'
import { Button } from '@/components/ui/Button'
import { Modal } from '@/components/ui/Modal'

export default function Footer() {
  const [isTeamModalOpen, setIsTeamModalOpen] = useState(false)

  return (
    <footer className="bg-gradient-to-br from-gray-800 dark:from-black via-gray-900 dark:via-gray-900 to-black dark:to-black pt-10 pb-4 border-t border-brand-primary/20 text-gray-300">
      <div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        {/* Main Footer Content */}
        <div className="gap-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 pb-6">
          {/* Column 1: Company Info with Sharp-Edged Logo */}
          <div className="space-y-4 lg:col-span-1">
            <div className="lg:text-left text-center">
              <Image
                src="/images/logo/mh-logo.png"
                alt="MH Construction LLC - Veteran-Owned Excellence"
                width={200}
                height={100}
                className="drop-shadow-lg hover:drop-shadow-xl transition-all duration-300 cursor-pointer filter"
                priority
              />
            </div>

            <div className="space-y-3">
              <h3 className="bg-clip-text bg-gradient-to-r from-brand-primary to-brand-secondary mb-3 font-bold text-transparent text-white text-lg">
                Contact Information
              </h3>
              <div className="space-y-2 text-gray-300 text-sm">
                <p className="flex items-center">
                  <PhoneIcon
                    size="sm"
                    color="var(--brand-primary)"
                    className="mr-2 text-brand-primary"
                  />
                  <a
                    href="tel:+15093086489"
                    className="hover:bg-brand-primary/10 px-2 py-1 rounded-md hover:text-brand-primary transition-all duration-300"
                  >
                    (509) 308-6489
                  </a>
                </p>
                <p className="flex items-start">
                  <LocationIcon
                    size="sm"
                    color="var(--brand-primary)"
                    className="mt-0.5 mr-2 text-brand-primary"
                  />
                  <span className="text-xs leading-tight">
                    3111 N. Capital Ave., Pasco, WA 99301
                  </span>
                </p>
                <p className="flex items-center">
                  <EmailIcon
                    size="sm"
                    color="var(--brand-primary)"
                    className="mr-2 text-brand-primary"
                  />
                  <a
                    href="mailto:info@mhconstruction.com"
                    className="hover:bg-brand-primary/10 px-2 py-1 rounded-md hover:text-brand-primary text-xs transition-all duration-300"
                  >
                    info@mhconstruction.com
                  </a>
                </p>
              </div>
            </div>
          </div>

          {/* Column 2: Navigation Links */}
          <div className="space-y-3">
            <h3 className="bg-clip-text bg-gradient-to-r from-brand-primary to-brand-secondary font-bold text-transparent text-white text-lg">
              Navigation
            </h3>
            <nav className="gap-1 grid grid-cols-1">
              <Link
                href="/"
                className="inline-block hover:bg-gradient-to-r hover:from-brand-primary/10 hover:to-brand-secondary/10 px-3 py-1.5 rounded hover:ring-1 hover:ring-brand-primary/30 text-gray-300 hover:text-brand-primary text-sm transition-all duration-300"
              >
                Home
              </Link>
              <Link
                href="/about"
                className="inline-block hover:bg-gradient-to-r hover:from-brand-primary/10 hover:to-brand-secondary/10 px-3 py-1.5 rounded hover:ring-1 hover:ring-brand-primary/30 text-gray-300 hover:text-brand-primary text-sm transition-all duration-300"
              >
                About
              </Link>
              <Link
                href="/services"
                className="inline-block hover:bg-gradient-to-r hover:from-brand-primary/10 hover:to-brand-secondary/10 px-3 py-1.5 rounded hover:ring-1 hover:ring-brand-primary/30 text-gray-300 hover:text-brand-primary text-sm transition-all duration-300"
              >
                Services
              </Link>
              <Link
                href="/portfolio"
                className="inline-block hover:bg-gradient-to-r hover:from-brand-primary/10 hover:to-brand-secondary/10 px-3 py-1.5 rounded hover:ring-1 hover:ring-brand-primary/30 text-gray-300 hover:text-brand-primary text-sm transition-all duration-300"
              >
                Portfolio
              </Link>
              <Link
                href="/estimator"
                className="inline-block bg-gradient-to-r from-brand-primary hover:from-brand-primary-dark to-brand-secondary hover:to-brand-secondary-dark hover:shadow-brand-primary/30 hover:shadow-lg px-3 py-1.5 rounded ring-1 ring-brand-primary/20 hover:ring-brand-primary/40 font-semibold text-white text-sm transition-all duration-300"
              >
                Get Quote
              </Link>
            </nav>
          </div>

          {/* Column 3: Resources & Programs */}
          <div className="space-y-3">
            <h3 className="bg-clip-text bg-gradient-to-r from-brand-primary to-brand-secondary font-bold text-transparent text-white text-lg">
              Resources
            </h3>
            <nav className="gap-1 grid grid-cols-1">
              <Link
                href="/wounded-warrior"
                className="inline-block bg-gradient-to-r from-veteran-red hover:from-red-500 to-red-700 hover:to-red-600 hover:shadow-lg hover:shadow-red-500/30 px-3 py-1.5 rounded ring-1 ring-red-600/20 hover:ring-red-500/40 font-semibold text-white text-sm transition-all duration-300"
              >
                🇺🇸 Veteran Program
              </Link>
              <Link
                href="/blog"
                className="inline-block hover:bg-gradient-to-r hover:from-brand-primary/10 hover:to-brand-secondary/10 px-3 py-1.5 rounded hover:ring-1 hover:ring-brand-primary/30 text-gray-300 hover:text-brand-primary text-sm transition-all duration-300"
              >
                Blog
              </Link>
              <Link
                href="/testimonials"
                className="inline-block hover:bg-gradient-to-r hover:from-brand-primary/10 hover:to-brand-secondary/10 px-3 py-1.5 rounded hover:ring-1 hover:ring-brand-primary/30 text-gray-300 hover:text-brand-primary text-sm transition-all duration-300"
              >
                Testimonials
              </Link>
              <Link
                href="/booking"
                className="inline-block hover:bg-gradient-to-r hover:from-brand-primary/10 hover:to-brand-secondary/10 px-3 py-1.5 rounded hover:ring-1 hover:ring-brand-primary/30 text-gray-300 hover:text-brand-primary text-sm transition-all duration-300"
              >
                Book Consultation
              </Link>
              <Link
                href="/dashboard"
                className="inline-block bg-gradient-to-r from-veteran-blue hover:from-blue-500 to-blue-700 hover:to-blue-600 hover:shadow-blue-500/30 hover:shadow-sm px-3 py-1.5 rounded ring-1 ring-blue-600/20 hover:ring-blue-500/40 font-semibold text-white text-sm transition-all duration-300"
              >
                Team Portal
              </Link>
            </nav>
          </div>

          {/* Column 4: Stay Connected */}
          <div className="space-y-4">
            <h3 className="bg-clip-text bg-gradient-to-r from-brand-primary to-brand-secondary font-bold text-transparent text-white text-lg">
              Connect
            </h3>

            {/* Social Media Icons - Single Row */}
            <div className="space-y-3">
              <h4 className="pb-1 border-b border-brand-primary/30 font-medium text-brand-primary dark:text-brand-primary-light text-xs uppercase tracking-wide">
                Follow Us
              </h4>
              <div className="flex justify-between items-center gap-2">
                <a
                  href="https://facebook.com/mhconstruction"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex flex-1 justify-center items-center bg-gray-700 hover:bg-blue-600 hover:shadow-blue-500/30 hover:shadow-sm p-2 border border-gray-600 hover:border-blue-500 rounded-lg transition-all duration-300"
                  aria-label="Follow us on Facebook"
                >
                  <FacebookIcon
                    size="md"
                    className="text-gray-400 group-hover:text-white transition-colors duration-300"
                  />
                </a>
                <a
                  href="https://instagram.com/mhconstruction"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex flex-1 justify-center items-center bg-gray-700 hover:bg-gradient-to-r hover:from-pink-600 hover:to-purple-700 hover:shadow-pink-500/30 hover:shadow-sm p-2 border border-gray-600 hover:border-pink-500 rounded-lg transition-all duration-300"
                  aria-label="Follow us on Instagram"
                >
                  <InstagramIcon
                    size="md"
                    className="text-gray-400 group-hover:text-white transition-colors duration-300"
                  />
                </a>
                <a
                  href="https://linkedin.com/company/mhconstruction"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex flex-1 justify-center items-center bg-gray-700 hover:bg-blue-600 hover:shadow-blue-500/30 hover:shadow-sm p-2 border border-gray-600 hover:border-blue-500 rounded-lg transition-all duration-300"
                  aria-label="Connect with us on LinkedIn"
                >
                  <LinkedInIcon
                    size="md"
                    className="text-gray-400 group-hover:text-white transition-colors duration-300"
                  />
                </a>
                <a
                  href="https://x.com/mhconstruction"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex flex-1 justify-center items-center bg-gray-700 hover:bg-black hover:shadow-gray-500/30 hover:shadow-sm p-2 border border-gray-600 hover:border-gray-400 rounded-lg transition-all duration-300"
                  aria-label="Follow us on X"
                >
                  <XIcon
                    size="md"
                    className="text-gray-400 group-hover:text-white transition-colors duration-300"
                  />
                </a>
                <a
                  href="https://youtube.com/@mhconstruction"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex flex-1 justify-center items-center bg-gray-700 hover:bg-red-600 hover:shadow-red-500/30 hover:shadow-sm p-2 border border-gray-600 hover:border-red-500 rounded-lg transition-all duration-300"
                  aria-label="Subscribe to our YouTube channel"
                >
                  <YouTubeIcon
                    size="md"
                    className="text-gray-400 group-hover:text-white transition-colors duration-300"
                  />
                </a>
              </div>
            </div>

            {/* Newsletter Signup - Enhanced MH Branding */}
            <div className="space-y-3">
              <h4 className="pb-1 border-b border-brand-primary/30 font-medium text-brand-primary dark:text-brand-primary-light text-xs uppercase tracking-wide">
                Updates
              </h4>
              <p className="text-gray-300 text-xs leading-relaxed">
                Latest project updates & veteran news
              </p>
              <form className="space-y-2">
                <input
                  type="email"
                  placeholder="Email address"
                  className="bg-gray-700 hover:bg-gray-600 px-3 py-2 border border-gray-600 hover:border-brand-primary/50 focus:border-brand-primary rounded focus:outline-none focus:ring-1 focus:ring-brand-primary/30 w-full text-white text-sm transition-all duration-300 placeholder-gray-400"
                />
                <button
                  type="submit"
                  className="group bg-gradient-to-r from-brand-primary hover:from-brand-primary-dark to-brand-secondary hover:to-brand-secondary-dark shadow-sm hover:shadow-md px-4 py-2 border-none rounded ring-1 ring-brand-primary/20 hover:ring-brand-primary/40 w-full font-semibold text-white text-sm transition-all duration-300 cursor-pointer"
                >
                  <span className="z-10 relative">Subscribe</span>
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* Enhanced Footer Bottom Bar with MH Branding */}
        <div className="pt-4 pb-3 border-t border-brand-primary/30">
          <div className="flex sm:flex-row flex-col justify-between items-center space-y-2 sm:space-y-0">
            {/* Copyright and Legal */}
            <div className="flex items-center space-x-2 sm:space-x-4">
              <p className="font-medium text-gray-400 text-xs">
                © 2025 MH Construction LLC
              </p>
              <span className="text-gray-600 text-xs">•</span>
              <div className="flex items-center bg-gradient-to-r from-veteran-red to-red-700 px-2 py-1 rounded-full">
                <span className="font-bold text-white text-xs">
                  🇺🇸 Veteran Owned
                </span>
              </div>
            </div>

            {/* Location Info */}
            <div className="text-right">
              <p className="font-semibold text-brand-primary dark:text-brand-primary-light text-xs">
                Pacific Northwest Licensed & Bonded
              </p>
            </div>
          </div>

          {/* Core Philosophy Tagline */}
          <div className="mt-3 pt-2 border-gray-700/50 border-t text-center">
            <p className="font-medium text-gray-300 text-xs italic">
              "Building for the Owner,{' '}
              <span className="font-bold text-veteran-red">NOT</span> the
              Dollar"
            </p>
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
          <h2 className="mb-4 font-bold text-gray-900 text-2xl">Team Access</h2>
          <p className="mb-6 text-gray-600">
            Access the team portal to view project updates, schedules, and
            internal resources.
          </p>
          <div className="space-y-4">
            <div>
              <label
                htmlFor="username"
                className="block mb-1 font-medium text-gray-700 text-sm"
              >
                Username
              </label>
              <input
                type="text"
                id="username"
                className="modal-input"
                placeholder="Enter your username"
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="block mb-1 font-medium text-gray-700 text-sm"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                className="modal-input"
                placeholder="Enter your password"
              />
            </div>
            <div className="flex justify-end space-x-3 pt-4">
              <Button
                variant="outline"
                onClick={() => setIsTeamModalOpen(false)}
                className="rounded-full"
              >
                Cancel
              </Button>
              <Button variant="primary" className="rounded-full">
                Sign In
              </Button>
            </div>
          </div>
        </div>
      </Modal>
    </footer>
  )
}
