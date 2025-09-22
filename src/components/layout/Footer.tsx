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
    <footer className="bg-gray-800 dark:bg-black text-gray-300 pt-12 pb-4">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 pb-8">
          
          {/* Column 1: Company Info with Large Logo */}
          <div className="lg:col-span-1 space-y-6">
            <div className="mh-logo-enhanced footer-logo-enhanced">
              <Image
                src="/images/logo/mh-logo.png"
                alt="MH Construction LLC - Veteran-Owned Excellence"
                width={315}
                height={158}
                className="footer-logo rounded-xl cursor-pointer"
                priority
              />
            </div>
            
            <div className="space-y-3">
              <h3 className="text-lg font-semibold text-white mb-4">Contact Information</h3>
              <div className="space-y-2 text-gray-300">
                <p className="flex items-center">
                  <span className="font-medium">Phone:</span>
                  <a href="tel:+15093086489" className="ml-2 hover:text-red-400 transition-colors duration-300 rounded-md px-1 py-0.5">
                    (509) 308-6489
                  </a>
                </p>
                <p className="flex items-start">
                  <span className="font-medium">Address:</span>
                  <span className="ml-2">3111 N. Capital Ave.<br />Pasco, WA 99301</span>
                </p>
                <p className="flex items-center">
                  <span className="font-medium">Email:</span>
                  <a href="mailto:info@mhconstruction.com" className="ml-2 hover:text-red-400 transition-colors duration-300 rounded-md px-1 py-0.5">
                    info@mhconstruction.com
                  </a>
                </p>
                <div className="mt-4 p-3 bg-gray-800/50 dark:bg-gray-900/50 rounded-lg border border-red-500/20">
                  <p className="text-sm text-gray-400">
                    <strong className="text-red-400">Emergency 24/7:</strong> (509) 308-6489
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">Quick Links</h3>
            <nav className="grid grid-cols-1 gap-2">
              <Link href="/" className="inline-block py-3 px-4 rounded-lg text-gray-300 transition-all duration-300 relative overflow-hidden hover:text-white hover:bg-gray-800/50 hover:-translate-y-0.5 hover:ring-2 hover:ring-brand-primary/30 before:content-[''] before:absolute before:top-0 before:-left-full before:w-full before:h-full before:bg-gradient-to-r before:from-transparent before:via-white/10 before:to-transparent before:transition-all before:duration-500 hover:before:left-full dark:text-slate-300 dark:hover:text-slate-50 dark:hover:bg-slate-700/50 dark:hover:ring-brand-primary-light/40">
                Home
              </Link>
              <Link href="/about" className="inline-block py-3 px-4 rounded-lg text-gray-300 transition-all duration-300 relative overflow-hidden hover:text-white hover:bg-gray-800/50 hover:-translate-y-0.5 hover:ring-2 hover:ring-brand-primary/30 before:content-[''] before:absolute before:top-0 before:-left-full before:w-full before:h-full before:bg-gradient-to-r before:from-transparent before:via-white/10 before:to-transparent before:transition-all before:duration-500 hover:before:left-full dark:text-slate-300 dark:hover:text-slate-50 dark:hover:bg-slate-700/50 dark:hover:ring-brand-primary-light/40">
                About Us
              </Link>
              <Link href="/services" className="inline-block py-3 px-4 rounded-lg text-gray-300 transition-all duration-300 relative overflow-hidden hover:text-white hover:bg-gray-800/50 hover:-translate-y-0.5 hover:ring-2 hover:ring-brand-primary/30 before:content-[''] before:absolute before:top-0 before:-left-full before:w-full before:h-full before:bg-gradient-to-r before:from-transparent before:via-white/10 before:to-transparent before:transition-all before:duration-500 hover:before:left-full dark:text-slate-300 dark:hover:text-slate-50 dark:hover:bg-slate-700/50 dark:hover:ring-brand-primary-light/40">
                Services
              </Link>
              <Link href="/portfolio" className="inline-block py-3 px-4 rounded-lg text-gray-300 transition-all duration-300 relative overflow-hidden hover:text-white hover:bg-gray-800/50 hover:-translate-y-0.5 hover:ring-2 hover:ring-brand-primary/30 before:content-[''] before:absolute before:top-0 before:-left-full before:w-full before:h-full before:bg-gradient-to-r before:from-transparent before:via-white/10 before:to-transparent before:transition-all before:duration-500 hover:before:left-full dark:text-slate-300 dark:hover:text-slate-50 dark:hover:bg-slate-700/50 dark:hover:ring-brand-primary-light/40">
                Portfolio
              </Link>
              <Link href="/contact" className="inline-block py-3 px-4 rounded-lg text-gray-300 transition-all duration-300 relative overflow-hidden hover:text-white hover:bg-gray-800/50 hover:-translate-y-0.5 hover:ring-2 hover:ring-brand-primary/30 before:content-[''] before:absolute before:top-0 before:-left-full before:w-full before:h-full before:bg-gradient-to-r before:from-transparent before:via-white/10 before:to-transparent before:transition-all before:duration-500 hover:before:left-full dark:text-slate-300 dark:hover:text-slate-50 dark:hover:bg-slate-700/50 dark:hover:ring-brand-primary-light/40">
                Contact
              </Link>
              <Link href="/estimator" className="inline-block py-3 px-4 rounded-lg text-white bg-gradient-to-r from-green-600 to-green-700 ring-2 ring-brand-primary/20 transition-all duration-300 relative overflow-hidden hover:from-green-500 hover:to-green-600 hover:-translate-y-0.5 hover:ring-brand-primary/40 hover:shadow-lg hover:shadow-brand-primary/30 before:content-[''] before:absolute before:top-0 before:-left-full before:w-full before:h-full before:bg-gradient-to-r before:from-transparent before:via-white/30 before:to-transparent before:transition-all before:duration-500 hover:before:left-full">
                Get Quote
              </Link>
            </nav>
          </div>

          {/* Column 3: Resources */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">Resources</h3>
            <nav className="grid grid-cols-1 gap-2">
              <Link href="/wounded-warrior" className="inline-block py-3 px-4 rounded-lg text-white bg-gradient-to-r from-red-600 to-red-700 ring-2 ring-red-600/20 transition-all duration-300 relative overflow-hidden hover:from-red-500 hover:to-red-600 hover:-translate-y-0.5 hover:ring-red-500/40 hover:shadow-lg hover:shadow-red-500/30 before:content-[''] before:absolute before:top-0 before:-left-full before:w-full before:h-full before:bg-gradient-to-r before:from-transparent before:via-white/40 before:to-transparent before:transition-all before:duration-500 hover:before:left-full">
                Wounded Warrior Program
              </Link>
              <Link href="/careers" className="inline-block py-3 px-4 rounded-lg text-gray-300 transition-all duration-300 relative overflow-hidden hover:text-white hover:bg-gray-800/50 hover:-translate-y-0.5 hover:ring-2 hover:ring-brand-primary/30 before:content-[''] before:absolute before:top-0 before:-left-full before:w-full before:h-full before:bg-gradient-to-r before:from-transparent before:via-white/10 before:to-transparent before:transition-all before:duration-500 hover:before:left-full dark:text-slate-300 dark:hover:text-slate-50 dark:hover:bg-slate-700/50 dark:hover:ring-brand-primary-light/40">
                Careers
              </Link>
              <Link href="/blog" className="inline-block py-3 px-4 rounded-lg text-gray-300 transition-all duration-300 relative overflow-hidden hover:text-white hover:bg-gray-800/50 hover:-translate-y-0.5 hover:ring-2 hover:ring-brand-primary/30 before:content-[''] before:absolute before:top-0 before:-left-full before:w-full before:h-full before:bg-gradient-to-r before:from-transparent before:via-white/10 before:to-transparent before:transition-all before:duration-500 hover:before:left-full dark:text-slate-300 dark:hover:text-slate-50 dark:hover:bg-slate-700/50 dark:hover:ring-brand-primary-light/40">
                Blog
              </Link>
              <Link href="/testimonials" className="inline-block py-3 px-4 rounded-lg text-gray-300 transition-all duration-300 relative overflow-hidden hover:text-white hover:bg-gray-800/50 hover:-translate-y-0.5 hover:ring-2 hover:ring-brand-primary/30 before:content-[''] before:absolute before:top-0 before:-left-full before:w-full before:h-full before:bg-gradient-to-r before:from-transparent before:via-white/10 before:to-transparent before:transition-all before:duration-500 hover:before:left-full dark:text-slate-300 dark:hover:text-slate-50 dark:hover:bg-slate-700/50 dark:hover:ring-brand-primary-light/40">
                Testimonials
              </Link>
              <Link href="/portfolio" className="inline-block py-3 px-4 rounded-lg text-gray-300 transition-all duration-300 relative overflow-hidden hover:text-white hover:bg-gray-800/50 hover:-translate-y-0.5 hover:ring-2 hover:ring-brand-primary/30 before:content-[''] before:absolute before:top-0 before:-left-full before:w-full before:h-full before:bg-gradient-to-r before:from-transparent before:via-white/10 before:to-transparent before:transition-all before:duration-500 hover:before:left-full dark:text-slate-300 dark:hover:text-slate-50 dark:hover:bg-slate-700/50 dark:hover:ring-brand-primary-light/40">
                Gallery
              </Link>
              <Link href="/dashboard" className="inline-block py-3 px-4 rounded-lg text-white bg-gradient-to-r from-blue-600 to-blue-700 ring-2 ring-blue-600/20 transition-all duration-300 relative overflow-hidden hover:from-blue-500 hover:to-blue-600 hover:-translate-y-0.5 hover:ring-blue-500/40 hover:shadow-lg hover:shadow-blue-500/30 before:content-[''] before:absolute before:top-0 before:-left-full before:w-full before:h-full before:bg-gradient-to-r before:from-transparent before:via-white/30 before:to-transparent before:transition-all before:duration-500 hover:before:left-full">
                Team Access
              </Link>
            </nav>
          </div>

          {/* Column 4: Stay Connected */}
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-white">Stay Connected</h3>
            
            {/* Social Media Icons - Top Priority */}
            <div className="space-y-4">
              <h4 className="text-sm font-medium text-gray-400 uppercase tracking-wide">Follow Us</h4>
              <div className="flex space-x-3">
                <a
                  href="https://facebook.com/mhconstruction"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="footer-social-icon group"
                  aria-label="Follow us on Facebook"
                >
                  <FacebookIcon size="lg" className="text-gray-400 group-hover:text-white transition-colors duration-300" />
                </a>
                <a
                  href="https://instagram.com/mhconstruction"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="footer-social-icon group"
                  aria-label="Follow us on Instagram"
                >
                  <InstagramIcon size="lg" className="text-gray-400 group-hover:text-white transition-colors duration-300" />
                </a>
                <a
                  href="https://linkedin.com/company/mhconstruction"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="footer-social-icon group"
                  aria-label="Connect with us on LinkedIn"
                >
                  <LinkedInIcon size="lg" className="text-gray-400 group-hover:text-white transition-colors duration-300" />
                </a>
                <a
                  href="https://twitter.com/mhconstruction"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="footer-social-icon group"
                  aria-label="Follow us on Twitter"
                >
                  <TwitterIcon size="lg" className="text-gray-400 group-hover:text-white transition-colors duration-300" />
                </a>
              </div>
            </div>

            {/* Newsletter Signup */}
            <div className="space-y-3">
              <h4 className="text-sm font-medium text-gray-400 uppercase tracking-wide">Newsletter</h4>
              <p className="text-sm text-gray-300">
                Stay updated on our latest projects and construction insights.
              </p>
              <form className="space-y-3">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="newsletter-input"
                />
                <button
                  type="submit"
                  className="w-full py-3 px-6 bg-gradient-to-r from-green-600 to-green-700 text-white font-semibold rounded-full transition-all duration-300 relative overflow-hidden ring-2 ring-brand-primary/20 shadow-[0_4px_12px_rgba(56,104,81,0.2)] hover:from-green-500 hover:to-green-600 hover:-translate-y-0.5 hover:ring-brand-primary/40 hover:shadow-[0_8px_25px_rgba(56,104,81,0.3)] before:content-[''] before:absolute before:top-0 before:-left-full before:w-full before:h-full before:bg-gradient-to-r before:from-transparent before:via-white/30 before:to-transparent before:transition-all before:duration-500 hover:before:left-full cursor-pointer border-none group"
                >
                  <span className="relative z-10">Subscribe</span>
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* Footer Bottom Bar */}
        <div className="border-t border-gray-800 pt-6 pb-4">
          <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
            
            {/* Copyright and Legal */}
            <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-6">
              <p className="text-gray-400 text-sm">
                © 2025 MH Construction LLC. All rights reserved.
              </p>
              <div className="flex items-center space-x-4 text-sm">
                <Link href="/privacy" className="footer-legal-link">
                  Privacy Policy
                </Link>
                <Link href="/terms" className="footer-legal-link">
                  Terms of Service
                </Link>
                <Link href="/dashboard" className="footer-legal-link footer-legal-link-dashboard">
                  Team Dashboard
                </Link>
              </div>
            </div>

            {/* Veteran Badge */}
            <div className="flex items-center space-x-2">
              <div className="veteran-badge">
                <span className="text-white text-xs font-semibold">VETERAN OWNED</span>
              </div>
              <p className="text-gray-400 text-xs">
                Serving the Pacific Northwest
              </p>
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
                className="modal-input"
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
                className="modal-input"
                placeholder="Enter your password"
              />
            </div>
            <div className="flex justify-end space-x-3 pt-4">
              <Button variant="outline" onClick={() => setIsTeamModalOpen(false)} className="rounded-full">
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
