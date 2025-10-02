'use client'

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { MaterialIcon } from '@/components/icons/MaterialIcon'

export default function Footer() {
  return (
    <footer className="bg-gradient-to-br from-gray-800 dark:from-black via-gray-900 dark:via-gray-900 to-black dark:to-black pt-10 pb-4 border-t border-brand-primary/20 text-gray-300">
      <div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        {/* Main Footer Content */}
        <div className="gap-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 pb-6">
          {/* Column 1: Company Info */}
          <div className="space-y-4">
            <div className="lg:text-left text-center">
              <Image
                src="/images/logo/mh-logo.png"
                alt="MH Construction Logo"
                width={120}
                height={60}
                className="mx-auto lg:mx-0 mb-4"
              />
              <p className="mb-4 text-gray-400 text-sm">
                Building for the Owner, NOT the Dollar
              </p>

              {/* Contact Info */}
              <div className="space-y-3 text-gray-300 text-sm">
                <div className="group hover:bg-gray-800/50 p-2 rounded-lg transition-all duration-300">
                  <div className="flex items-center">
                    <div className="flex justify-center items-center bg-brand-primary/20 mr-3 p-2 rounded-lg">
                      <MaterialIcon
                        icon="call"
                        size="sm"
                        className="text-brand-primary"
                      />
                    </div>
                    <div>
                      <div className="mb-1 text-gray-400 text-xs">Phone</div>
                      <a
                        href="tel:+15093086489"
                        className="font-medium hover:text-brand-primary transition-colors"
                      >
                        (509) 308-6489
                      </a>
                    </div>
                  </div>
                </div>

                <div className="group hover:bg-gray-800/50 p-2 rounded-lg transition-all duration-300">
                  <div className="flex items-start">
                    <div className="flex justify-center items-center bg-brand-primary/20 mt-0.5 mr-3 p-2 rounded-lg">
                      <MaterialIcon
                        icon="place"
                        size="sm"
                        className="text-brand-primary"
                      />
                    </div>
                    <div>
                      <div className="mb-1 text-gray-400 text-xs">Address</div>
                      <span className="text-xs leading-tight">
                        3111 N. Capital Ave.
                        <br />
                        Pasco, WA 99301
                      </span>
                    </div>
                  </div>
                </div>

                <div className="group hover:bg-gray-800/50 p-2 rounded-lg transition-all duration-300">
                  <div className="flex items-center">
                    <div className="flex justify-center items-center bg-brand-primary/20 mr-3 p-2 rounded-lg">
                      <MaterialIcon
                        icon="mail"
                        size="sm"
                        className="text-brand-primary"
                      />
                    </div>
                    <div>
                      <div className="mb-1 text-gray-400 text-xs">Email</div>
                      <a
                        href="mailto:info@mhconstruction.com"
                        className="font-medium hover:text-brand-primary text-xs transition-colors"
                      >
                        info@mhconstruction.com
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2 pb-2 border-b border-brand-primary/30">
              <MaterialIcon
                icon="link"
                size="sm"
                className="text-brand-primary"
              />
              <h4 className="font-medium text-brand-primary text-xs uppercase tracking-wide">
                Quick Links
              </h4>
            </div>
            <nav className="space-y-2">
              <Link
                href="/"
                className="group flex items-center space-x-2 text-gray-300 hover:text-brand-primary text-sm transition-all hover:translate-x-1 duration-300"
              >
                <MaterialIcon
                  icon="home"
                  size="sm"
                  className="text-gray-500 group-hover:text-brand-primary transition-colors"
                />
                <span>Home</span>
                <MaterialIcon
                  icon="arrow_forward"
                  size="sm"
                  className="opacity-0 group-hover:opacity-100 text-brand-primary transition-opacity"
                />
              </Link>

              <div className="flex items-center space-x-2 opacity-60 text-gray-500 text-sm cursor-not-allowed">
                <MaterialIcon
                  icon="business"
                  size="sm"
                  className="text-gray-600"
                />
                <span>About Us</span>
                <MaterialIcon
                  icon="schedule"
                  size="sm"
                  className="text-gray-600 text-xs"
                />
              </div>

              <div className="flex items-center space-x-2 opacity-60 text-gray-500 text-sm cursor-not-allowed">
                <MaterialIcon
                  icon="construction"
                  size="sm"
                  className="text-gray-600"
                />
                <span>Services</span>
                <MaterialIcon
                  icon="schedule"
                  size="sm"
                  className="text-gray-600 text-xs"
                />
              </div>

              <div className="flex items-center space-x-2 opacity-60 text-gray-500 text-sm cursor-not-allowed">
                <MaterialIcon
                  icon="photo_library"
                  size="sm"
                  className="text-gray-600"
                />
                <span>Portfolio</span>
                <MaterialIcon
                  icon="schedule"
                  size="sm"
                  className="text-gray-600 text-xs"
                />
              </div>

              <div className="flex items-center space-x-2 opacity-60 text-gray-500 text-sm cursor-not-allowed">
                <MaterialIcon
                  icon="contact_phone"
                  size="sm"
                  className="text-gray-600"
                />
                <span>Contact</span>
                <MaterialIcon
                  icon="schedule"
                  size="sm"
                  className="text-gray-600 text-xs"
                />
              </div>
            </nav>
          </div>

          {/* Column 3: Social Media & Resources */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2 pb-2 border-b border-brand-primary/30">
              <MaterialIcon
                icon="share"
                size="sm"
                className="text-brand-primary"
              />
              <h4 className="font-medium text-brand-primary text-xs uppercase tracking-wide">
                Connect & Resources
              </h4>
            </div>

            {/* Social Media Links */}
            <div className="space-y-3">
              <div className="mb-2 text-gray-400 text-xs">Follow Us</div>
              <div className="flex flex-wrap gap-3">
                <a
                  href="https://facebook.com/mhconstruction"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex justify-center items-center bg-gray-700 hover:bg-blue-600 hover:shadow-lg p-3 border border-gray-600 hover:border-blue-500 rounded-xl hover:scale-105 transition-all duration-300"
                  title="Follow us on Facebook"
                >
                  <MaterialIcon
                    icon="thumb_up"
                    size="md"
                    className="text-gray-400 group-hover:text-white transition-colors"
                  />
                </a>
                <a
                  href="https://instagram.com/mhconstruction"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex justify-center items-center bg-gray-700 hover:bg-gradient-to-r hover:from-purple-500 hover:to-pink-500 hover:shadow-lg p-3 border border-gray-600 hover:border-pink-500 rounded-xl hover:scale-105 transition-all duration-300"
                  title="Follow us on Instagram"
                >
                  <MaterialIcon
                    icon="photo_camera"
                    size="md"
                    className="text-gray-400 group-hover:text-white transition-colors"
                  />
                </a>
                <a
                  href="https://linkedin.com/company/mhconstruction"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex justify-center items-center bg-gray-700 hover:bg-blue-700 hover:shadow-lg p-3 border border-gray-600 hover:border-blue-400 rounded-xl hover:scale-105 transition-all duration-300"
                  title="Connect on LinkedIn"
                >
                  <MaterialIcon
                    icon="work"
                    size="md"
                    className="text-gray-400 group-hover:text-white transition-colors"
                  />
                </a>
              </div>
            </div>

            {/* Additional Resources */}
            <div className="space-y-2 pt-2 border-gray-700 border-t">
              <div className="mb-2 text-gray-400 text-xs">Resources</div>
              <div className="flex items-center space-x-2 opacity-60 text-gray-500 text-xs cursor-not-allowed">
                <MaterialIcon
                  icon="description"
                  size="sm"
                  className="text-gray-600"
                />
                <span>Brochures (Coming Soon)</span>
              </div>
              <div className="flex items-center space-x-2 opacity-60 text-gray-500 text-xs cursor-not-allowed">
                <MaterialIcon
                  icon="military_tech"
                  size="sm"
                  className="text-gray-600"
                />
                <span>Veteran Programs (Coming Soon)</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 border-gray-700 border-t">
          <div className="flex md:flex-row flex-col justify-between items-center space-y-3 md:space-y-0 text-gray-400 text-sm">
            <div className="flex items-center space-x-2">
              <MaterialIcon
                icon="copyright"
                size="sm"
                className="text-gray-500"
              />
              <span>&copy; 2025 MH Construction LLC. All rights reserved.</span>
            </div>
            <div className="flex items-center space-x-2">
              <MaterialIcon
                icon="military_tech"
                size="sm"
                className="text-brand-primary"
              />
              <span className="flex items-center space-x-1">
                <span className="font-medium text-brand-primary">
                  Veteran-owned
                </span>
                <span>excellence serving the Pacific Northwest</span>
              </span>
            </div>
          </div>

          {/* Additional Footer Info */}
          <div className="flex md:flex-row flex-col justify-center items-center md:space-x-6 space-y-2 md:space-y-0 mt-4 pt-3 border-gray-700/50 border-t text-gray-500 text-xs">
            <div className="flex items-center space-x-1">
              <MaterialIcon
                icon="verified"
                size="sm"
                className="text-brand-primary"
              />
              <span>Licensed & Insured</span>
            </div>
            <div className="flex items-center space-x-1">
              <MaterialIcon
                icon="schedule"
                size="sm"
                className="text-gray-500"
              />
              <span>Website updates coming soon</span>
            </div>
            <div className="flex items-center space-x-1">
              <MaterialIcon
                icon="build"
                size="sm"
                className="text-brand-primary"
              />
              <span>Building for the Owner, NOT the Dollar</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
