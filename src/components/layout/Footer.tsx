"use client";

import Image from "next/image";
import Link from "next/link";
import { MaterialIcon } from "@/components/icons/MaterialIcon";

export default function Footer() {
  return (
    <footer className="bg-gradient-to-br from-gray-800 dark:from-black via-gray-900 dark:via-gray-900 to-black dark:to-black pt-6 xs:pt-8 sm:pt-10 pb-4 border-t border-brand-primary/20 text-gray-300 touch-manipulation">
      <div className="mx-auto px-3 xs:px-4 sm:px-6 lg:px-8 max-w-7xl">
        {/* Main Footer Content */}
        <div className="gap-4 xs:gap-5 sm:gap-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 pb-4 xs:pb-5 sm:pb-6">
          {/* Column 1: Company Info */}
          <div className="space-y-3 xs:space-y-4 sm:col-span-2 lg:col-span-1">
            <div className="text-center sm:text-left lg:text-left">
              <div className="mb-4">
                <Link href="/" className="inline-block">
                  <Image
                    src="/images/logo/mh-logo.png"
                    alt="MH Construction Logo"
                    width={264}
                    height={132}
                    className="mx-auto sm:mx-0 lg:mx-0 w-[240px] xs:w-[270px] sm:w-[300px] h-auto drop-shadow-lg hover:drop-shadow-xl transition-all duration-300 cursor-pointer"
                  />
                </Link>
              </div>

              {/* Contact Info */}
              <div className="space-y-2 xs:space-y-3 text-gray-300 dark:text-gray-200 text-xs xs:text-sm">
                <div className="group hover:bg-gray-800/50 dark:hover:bg-gray-700/50 p-2 rounded-lg transition-all duration-300 touch-manipulation">
                  <div className="flex items-center">
                    <div className="flex justify-center items-center bg-brand-primary/20 mr-3 p-1.5 xs:p-2 rounded-lg">
                      <MaterialIcon
                        icon="call"
                        size="sm"
                        className="text-brand-primary"
                      />
                    </div>
                    <div>
                      <div className="mb-1 text-gray-400 dark:text-gray-300 text-xs">
                        MHC Phone
                      </div>
                      <a
                        href="tel:+15093086489"
                        className="font-medium hover:text-brand-primary transition-colors text-xs xs:text-sm"
                      >
                        (509) 308-6489
                      </a>
                    </div>
                  </div>
                </div>

                <div className="group hover:bg-gray-800/50 dark:hover:bg-gray-700/50 p-2 rounded-lg transition-all duration-300 touch-manipulation">
                  <div className="flex items-start">
                    <div className="flex justify-center items-center bg-brand-primary/20 mt-0.5 mr-3 p-1.5 xs:p-2 rounded-lg">
                      <MaterialIcon
                        icon="place"
                        size="sm"
                        className="text-brand-primary"
                      />
                    </div>
                    <div>
                      <div className="mb-1 text-gray-400 dark:text-gray-300 text-xs">
                        MHC Office
                      </div>
                      <a
                        href="https://maps.google.com/?q=3111+N+Capital+Ave+Pasco+WA+99301"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs leading-tight hover:text-brand-primary transition-colors duration-300 cursor-pointer block"
                        title="Get directions to our office"
                      >
                        3111 N. Capital Ave.
                        <br />
                        Pasco, WA 99301
                      </a>
                    </div>
                  </div>
                </div>

                <div className="group hover:bg-gray-800/50 dark:hover:bg-gray-700/50 p-2 rounded-lg transition-all duration-300 touch-manipulation">
                  <div className="flex items-center">
                    <div className="flex justify-center items-center bg-brand-primary/20 mr-3 p-1.5 xs:p-2 rounded-lg">
                      <MaterialIcon
                        icon="mail"
                        size="sm"
                        className="text-brand-primary"
                      />
                    </div>
                    <div>
                      <div className="mb-1 text-gray-400 dark:text-gray-300 text-xs">
                        MHC Email
                      </div>
                      <a
                        href="mailto:office@mhc-gc.com"
                        className="font-medium hover:text-brand-primary text-xs transition-colors break-all"
                      >
                        office@mhc-gc.com
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Column 2: Core Navigation */}
          <div className="space-y-3 xs:space-y-4">
            <div className="flex items-center space-x-2 pb-2 border-b border-brand-primary/30">
              <MaterialIcon
                icon="explore"
                size="sm"
                className="text-brand-primary"
              />
              <h4 className="font-medium text-brand-primary text-xs uppercase tracking-wide">
                Core Services
              </h4>
            </div>
            <nav className="space-y-1.5 xs:space-y-2">
              <Link
                href="/booking"
                className="group flex items-center space-x-2 text-gray-300 hover:text-brand-primary dark:text-gray-200 text-xs xs:text-sm transition-all hover:translate-x-1 duration-300 touch-manipulation"
              >
                <MaterialIcon
                  icon="handshake"
                  size="sm"
                  className="text-gray-500 dark:text-gray-400 group-hover:text-brand-primary transition-colors"
                />
                <span>Start Partnership</span>
                <MaterialIcon
                  icon="arrow_forward"
                  size="sm"
                  className="opacity-0 group-hover:opacity-100 text-brand-primary transition-opacity"
                />
              </Link>

              <Link
                href="/services"
                className="group flex items-center space-x-2 text-gray-300 hover:text-brand-primary dark:text-gray-200 text-xs xs:text-sm transition-all hover:translate-x-1 duration-300 touch-manipulation"
              >
                <MaterialIcon
                  icon="build"
                  size="sm"
                  className="text-gray-500 dark:text-gray-400 group-hover:text-brand-primary transition-colors"
                />
                <span>Construction Management</span>
                <MaterialIcon
                  icon="arrow_forward"
                  size="sm"
                  className="opacity-0 group-hover:opacity-100 text-brand-primary transition-opacity"
                />
              </Link>

              <Link
                href="/projects"
                className="group flex items-center space-x-2 text-gray-300 hover:text-brand-primary dark:text-gray-200 text-xs xs:text-sm transition-all hover:translate-x-1 duration-300 touch-manipulation"
              >
                <MaterialIcon
                  icon="photo_library"
                  size="sm"
                  className="text-gray-500 dark:text-gray-400 group-hover:text-brand-primary transition-colors"
                />
                <span>Portfolio & Projects</span>
                <MaterialIcon
                  icon="arrow_forward"
                  size="sm"
                  className="opacity-0 group-hover:opacity-100 text-brand-primary transition-opacity"
                />
              </Link>

              <Link
                href="/estimator"
                className="group flex items-center space-x-2 text-gray-300 hover:text-brand-primary dark:text-gray-200 text-xs xs:text-sm transition-all hover:translate-x-1 duration-300 touch-manipulation"
              >
                <MaterialIcon
                  icon="smart_toy"
                  size="sm"
                  className="text-gray-500 dark:text-gray-400 group-hover:text-brand-primary transition-colors"
                />
                <span>AI Cost Estimator</span>
                <MaterialIcon
                  icon="arrow_forward"
                  size="sm"
                  className="opacity-0 group-hover:opacity-100 text-brand-primary transition-opacity"
                />
              </Link>

              <Link
                href="/3d-explorer"
                className="group flex items-center space-x-2 text-gray-300 hover:text-brand-primary dark:text-gray-200 text-xs xs:text-sm transition-all hover:translate-x-1 duration-300 touch-manipulation"
              >
                <MaterialIcon
                  icon="view_in_ar"
                  size="sm"
                  className="text-gray-500 dark:text-gray-400 group-hover:text-brand-primary transition-colors"
                />
                <span>3D Project Explorer</span>
                <MaterialIcon
                  icon="arrow_forward"
                  size="sm"
                  className="opacity-0 group-hover:opacity-100 text-brand-primary transition-opacity"
                />
              </Link>

              <Link
                href="/contact"
                className="group flex items-center space-x-2 text-gray-300 hover:text-brand-primary dark:text-gray-200 text-xs xs:text-sm transition-all hover:translate-x-1 duration-300 touch-manipulation"
              >
                <MaterialIcon
                  icon="contact_phone"
                  size="sm"
                  className="text-gray-500 dark:text-gray-400 group-hover:text-brand-primary transition-colors"
                />
                <span>Connect With Us</span>
                <MaterialIcon
                  icon="arrow_forward"
                  size="sm"
                  className="opacity-0 group-hover:opacity-100 text-brand-primary transition-opacity"
                />
              </Link>

              <Link
                href="/services#inspections"
                className="group flex items-center space-x-2 text-gray-300 hover:text-brand-primary dark:text-gray-200 text-xs xs:text-sm transition-all hover:translate-x-1 duration-300 touch-manipulation"
              >
                <MaterialIcon
                  icon="fact_check"
                  size="sm"
                  className="text-gray-500 dark:text-gray-400 group-hover:text-brand-primary transition-colors"
                />
                <span>Quality Inspections</span>
                <MaterialIcon
                  icon="arrow_forward"
                  size="sm"
                  className="opacity-0 group-hover:opacity-100 text-brand-primary transition-opacity"
                />
              </Link>

              <Link
                href="/urgent"
                className="group flex items-center space-x-2 text-gray-300 hover:text-brand-primary dark:text-gray-200 text-xs xs:text-sm transition-all hover:translate-x-1 duration-300 touch-manipulation"
              >
                <MaterialIcon
                  icon="engineering"
                  size="sm"
                  className="text-gray-500 dark:text-gray-400 group-hover:text-brand-primary transition-colors"
                />
                <span>Urgent Construction Support</span>
                <MaterialIcon
                  icon="arrow_forward"
                  size="sm"
                  className="opacity-0 group-hover:opacity-100 text-brand-primary transition-opacity"
                />
              </Link>

              <Link
                href="/services#maintenance"
                className="group flex items-center space-x-2 text-gray-300 hover:text-brand-primary dark:text-gray-200 text-xs xs:text-sm transition-all hover:translate-x-1 duration-300 touch-manipulation"
              >
                <MaterialIcon
                  icon="home_repair_service"
                  size="sm"
                  className="text-gray-500 dark:text-gray-400 group-hover:text-brand-primary transition-colors"
                />
                <span>Maintenance & Repairs</span>
                <MaterialIcon
                  icon="arrow_forward"
                  size="sm"
                  className="opacity-0 group-hover:opacity-100 text-brand-primary transition-opacity"
                />
              </Link>
            </nav>
          </div>

          {/* Column 3: Company & Partnerships */}
          <div className="space-y-3 xs:space-y-4">
            <div className="flex items-center space-x-2 pb-2 border-b border-brand-primary/30">
              <MaterialIcon
                icon="people"
                size="sm"
                className="text-brand-primary"
              />
              <h4 className="font-medium text-brand-primary text-xs uppercase tracking-wide">
                Company & Partners
              </h4>
            </div>
            <nav className="space-y-1.5 xs:space-y-2">
              <Link
                href="/"
                className="group flex items-center space-x-2 text-gray-300 hover:text-brand-primary dark:text-gray-200 text-xs xs:text-sm transition-all hover:translate-x-1 duration-300 touch-manipulation"
              >
                <MaterialIcon
                  icon="home"
                  size="sm"
                  className="text-gray-500 dark:text-gray-400 group-hover:text-brand-primary transition-colors"
                />
                <span>Home</span>
                <MaterialIcon
                  icon="arrow_forward"
                  size="sm"
                  className="opacity-0 group-hover:opacity-100 text-brand-primary transition-opacity"
                />
              </Link>

              <Link
                href="/about"
                className="group flex items-center space-x-2 text-gray-300 hover:text-brand-primary dark:text-gray-200 text-xs xs:text-sm transition-all hover:translate-x-1 duration-300 touch-manipulation"
              >
                <MaterialIcon
                  icon="info"
                  size="sm"
                  className="text-gray-500 dark:text-gray-400 group-hover:text-brand-primary transition-colors"
                />
                <span>Our Story</span>
                <MaterialIcon
                  icon="arrow_forward"
                  size="sm"
                  className="opacity-0 group-hover:opacity-100 text-brand-primary transition-opacity"
                />
              </Link>

              <Link
                href="/team"
                className="group flex items-center space-x-2 text-gray-300 hover:text-brand-primary dark:text-gray-200 text-xs xs:text-sm transition-all hover:translate-x-1 duration-300 touch-manipulation"
              >
                <MaterialIcon
                  icon="people"
                  size="sm"
                  className="text-gray-500 dark:text-gray-400 group-hover:text-brand-primary transition-colors"
                />
                <span>Our Team</span>
                <MaterialIcon
                  icon="arrow_forward"
                  size="sm"
                  className="opacity-0 group-hover:opacity-100 text-brand-primary transition-opacity"
                />
              </Link>

              <Link
                href="/trade-partners"
                className="group flex items-center space-x-2 text-gray-300 hover:text-brand-primary dark:text-gray-200 text-xs xs:text-sm transition-all hover:translate-x-1 duration-300 touch-manipulation"
              >
                <MaterialIcon
                  icon="business"
                  size="sm"
                  className="text-gray-500 dark:text-gray-400 group-hover:text-brand-primary transition-colors"
                />
                <span>Trade Partners</span>
                <MaterialIcon
                  icon="arrow_forward"
                  size="sm"
                  className="opacity-0 group-hover:opacity-100 text-brand-primary transition-opacity"
                />
              </Link>

              <Link
                href="/government"
                className="group flex items-center space-x-2 text-gray-300 hover:text-brand-primary dark:text-gray-200 text-xs xs:text-sm transition-all hover:translate-x-1 duration-300 touch-manipulation"
              >
                <MaterialIcon
                  icon="account_balance"
                  size="sm"
                  className="text-gray-500 dark:text-gray-400 group-hover:text-brand-primary transition-colors"
                />
                <span>Government & Grants</span>
                <MaterialIcon
                  icon="arrow_forward"
                  size="sm"
                  className="opacity-0 group-hover:opacity-100 text-brand-primary transition-opacity"
                />
              </Link>

              <Link
                href="/veterans"
                className="group flex items-center space-x-2 text-gray-300 hover:text-brand-primary dark:text-gray-200 text-xs xs:text-sm transition-all hover:translate-x-1 duration-300 touch-manipulation"
              >
                <MaterialIcon
                  icon="military_tech"
                  size="sm"
                  className="text-gray-500 dark:text-gray-400 group-hover:text-brand-primary transition-colors"
                />
                <span>Veterans Initiative</span>
                <MaterialIcon
                  icon="arrow_forward"
                  size="sm"
                  className="opacity-0 group-hover:opacity-100 text-brand-primary transition-opacity"
                />
              </Link>

              <Link
                href="/careers"
                className="group flex items-center space-x-2 text-gray-300 hover:text-brand-primary dark:text-gray-200 text-xs xs:text-sm transition-all hover:translate-x-1 duration-300 touch-manipulation"
              >
                <MaterialIcon
                  icon="badge"
                  size="sm"
                  className="text-gray-500 dark:text-gray-400 group-hover:text-brand-primary transition-colors"
                />
                <span>Join Our Team</span>
                <MaterialIcon
                  icon="arrow_forward"
                  size="sm"
                  className="opacity-0 group-hover:opacity-100 text-brand-primary transition-opacity"
                />
              </Link>

              <Link
                href="/about#testimonials"
                className="group flex items-center space-x-2 text-gray-300 hover:text-brand-primary dark:text-gray-200 text-xs xs:text-sm transition-all hover:translate-x-1 duration-300 touch-manipulation"
              >
                <MaterialIcon
                  icon="star"
                  size="sm"
                  className="text-gray-500 dark:text-gray-400 group-hover:text-brand-primary transition-colors"
                />
                <span>Client Reviews</span>
                <MaterialIcon
                  icon="arrow_forward"
                  size="sm"
                  className="opacity-0 group-hover:opacity-100 text-brand-primary transition-opacity"
                />
              </Link>

              <Link
                href="/about#safety"
                className="group flex items-center space-x-2 text-gray-300 hover:text-brand-primary dark:text-gray-200 text-xs xs:text-sm transition-all hover:translate-x-1 duration-300 touch-manipulation"
              >
                <MaterialIcon
                  icon="verified_user"
                  size="sm"
                  className="text-gray-500 dark:text-gray-400 group-hover:text-brand-primary transition-colors"
                />
                <span>Safety & Compliance</span>
                <MaterialIcon
                  icon="arrow_forward"
                  size="sm"
                  className="opacity-0 group-hover:opacity-100 text-brand-primary transition-opacity"
                />
              </Link>

              <Link
                href="/about#awards"
                className="group flex items-center space-x-2 text-gray-300 hover:text-brand-primary dark:text-gray-200 text-xs xs:text-sm transition-all hover:translate-x-1 duration-300 touch-manipulation"
              >
                <MaterialIcon
                  icon="emoji_events"
                  size="sm"
                  className="text-gray-500 dark:text-gray-400 group-hover:text-brand-primary transition-colors"
                />
                <span>Awards & Recognition</span>
                <MaterialIcon
                  icon="arrow_forward"
                  size="sm"
                  className="opacity-0 group-hover:opacity-100 text-brand-primary transition-opacity"
                />
              </Link>
            </nav>
          </div>

          {/* Column 3: Social Media & Resources */}
          <div className="space-y-3 xs:space-y-4">
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
            <div className="space-y-2 xs:space-y-3">
              <div className="mb-2 text-gray-400 dark:text-gray-300 text-xs">
                Follow Our Partnership Journey
              </div>
              <div className="flex items-center justify-start gap-1.5 xs:gap-2 sm:gap-3 overflow-x-auto pb-1">
                <a
                  href="https://www.facebook.com/profile.php?id=61575511773974"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex justify-center items-center bg-gray-700 dark:bg-gray-600 hover:bg-gradient-to-r hover:from-[#1877F2] hover:via-[#42A5F5] hover:to-[#1565C0] hover:shadow-lg hover:shadow-[#1877F2]/30 p-1.5 xs:p-2 sm:p-2.5 border border-gray-600 dark:border-gray-500 hover:border-[#1877F2] rounded-lg xs:rounded-xl hover:scale-105 transition-all duration-300 touch-manipulation flex-shrink-0 min-w-[36px] min-h-[36px] xs:min-w-[40px] xs:min-h-[40px]"
                  title="Follow our partnership stories on Facebook"
                >
                  <MaterialIcon
                    icon="thumb_up"
                    size="sm"
                    className="text-gray-400 group-hover:text-white transition-colors drop-shadow-lg group-hover:drop-shadow-[0_0_8px_rgba(24,119,242,0.6)]"
                  />
                </a>
                <a
                  href="https://www.instagram.com/mh_construction_inc/reels/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex justify-center items-center bg-gray-700 dark:bg-gray-600 hover:bg-gradient-to-r hover:from-[#833AB4] hover:via-[#FD1D1D] hover:to-[#F77737] hover:shadow-lg hover:shadow-[#E4405F]/30 p-1.5 xs:p-2 sm:p-2.5 border border-gray-600 hover:border-[#E4405F] dark:border-gray-500 rounded-lg xs:rounded-xl hover:scale-105 transition-all duration-300 touch-manipulation flex-shrink-0 min-w-[36px] min-h-[36px] xs:min-w-[40px] xs:min-h-[40px]"
                  title="See partnership projects on Instagram"
                >
                  <MaterialIcon
                    icon="photo_camera"
                    size="sm"
                    className="text-gray-400 group-hover:text-white transition-colors drop-shadow-lg group-hover:drop-shadow-[0_0_8px_rgba(228,64,95,0.6)]"
                  />
                </a>
                <a
                  href="https://x.com/mhc_gc"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex justify-center items-center bg-gray-700 dark:bg-gray-600 hover:bg-gradient-to-r hover:from-[#000000] hover:via-[#1D9BF0] hover:to-[#000000] hover:shadow-lg hover:shadow-black/30 p-1.5 xs:p-2 sm:p-2.5 border border-gray-600 hover:border-[#1D9BF0] dark:border-gray-500 rounded-lg xs:rounded-xl hover:scale-105 transition-all duration-300 touch-manipulation flex-shrink-0 min-w-[36px] min-h-[36px] xs:min-w-[40px] xs:min-h-[40px]"
                  title="Follow partnership updates on X (Twitter)"
                >
                  <MaterialIcon
                    icon="close"
                    size="sm"
                    className="text-gray-400 group-hover:text-white transition-colors drop-shadow-lg group-hover:drop-shadow-[0_0_8px_rgba(29,155,240,0.6)]"
                  />
                </a>
                <a
                  href="https://youtube.com/@mhc-gc?si=RGnloxP4NgV4Dm_j"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex justify-center items-center bg-gray-700 dark:bg-gray-600 hover:bg-gradient-to-r hover:from-[#FF0000] hover:via-[#FF4444] hover:to-[#CC0000] hover:shadow-lg hover:shadow-[#FF0000]/30 p-1.5 xs:p-2 sm:p-2.5 border border-gray-600 dark:border-gray-500 hover:border-[#FF0000] rounded-lg xs:rounded-xl hover:scale-105 transition-all duration-300 touch-manipulation flex-shrink-0 min-w-[36px] min-h-[36px] xs:min-w-[40px] xs:min-h-[40px]"
                  title="Watch partnership success stories on YouTube"
                >
                  <MaterialIcon
                    icon="play_circle"
                    size="sm"
                    className="text-gray-400 group-hover:text-white transition-colors drop-shadow-lg group-hover:drop-shadow-[0_0_8px_rgba(255,0,0,0.6)]"
                  />
                </a>
                <a
                  href="https://www.linkedin.com/company/mh-construction-general-contractor/posts/?feedView=all"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex justify-center items-center bg-gray-700 dark:bg-gray-600 hover:bg-gradient-to-r hover:from-[#0A66C2] hover:via-[#0E76A8] hover:to-[#004182] hover:shadow-lg hover:shadow-[#0A66C2]/30 p-1.5 xs:p-2 sm:p-2.5 border border-gray-600 dark:border-gray-500 hover:border-[#0A66C2] rounded-lg xs:rounded-xl hover:scale-105 transition-all duration-300 touch-manipulation flex-shrink-0 min-w-[36px] min-h-[36px] xs:min-w-[40px] xs:min-h-[40px]"
                  title="Connect with our partnership team on LinkedIn"
                >
                  <MaterialIcon
                    icon="work"
                    size="sm"
                    className="text-gray-400 group-hover:text-white transition-colors drop-shadow-lg group-hover:drop-shadow-[0_0_8px_rgba(10,102,194,0.6)]"
                  />
                </a>
              </div>
            </div>

            {/* Enhanced Search Bar */}
            <div className="space-y-2 xs:space-y-3 pt-2 border-gray-700 dark:border-gray-600 border-t">
              <div className="mb-2 text-gray-400 dark:text-gray-300 text-xs">
                Quick Partnership Search
              </div>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  const searchInput = e.currentTarget.querySelector(
                    "input",
                  ) as HTMLInputElement;
                  if (searchInput?.value.trim()) {
                    window.location.href = `/projects?search=${encodeURIComponent(searchInput.value)}`;
                  }
                }}
                className="relative"
              >
                <input
                  type="text"
                  name="search"
                  placeholder="Search partnership resources..."
                  className="bg-gray-700/50 hover:bg-gray-700 focus:bg-gray-700 dark:bg-gray-600/50 dark:hover:bg-gray-600 dark:focus:bg-gray-600 px-3 xs:px-4 py-2.5 xs:py-3 pr-12 xs:pr-14 border border-gray-600 dark:border-gray-500 focus:border-brand-primary dark:focus:border-brand-primary rounded-lg xs:rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-primary/20 w-full text-gray-300 dark:text-gray-200 text-xs xs:text-sm transition-all duration-300 placeholder-gray-500 dark:placeholder-gray-400 touch-manipulation"
                  aria-label="Search partnership resources"
                />
                <button
                  type="submit"
                  className="top-1/2 right-1 absolute bg-brand-primary hover:bg-brand-accent p-1.5 rounded-lg text-white hover:scale-105 transition-all -translate-y-1/2 duration-300 transform touch-manipulation group"
                  aria-label="Search"
                >
                  <MaterialIcon
                    icon="search"
                    size="sm"
                    className="text-white group-hover:scale-110 transition-transform"
                  />
                </button>
              </form>
              <div className="text-gray-500 dark:text-gray-400 text-xs">
                Search partnership services, team members, success stories, and
                more
              </div>
            </div>
          </div>
        </div>

        {/* Clean Bottom Bar - Streamlined Design */}
        <div className="pt-8 pb-6 border-gray-700 dark:border-gray-600 border-t relative">
          {/* Back to Top Button */}
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="absolute -top-6 left-4 bg-brand-primary hover:bg-brand-primary-dark text-white p-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 group touch-manipulation"
            aria-label="Back to top"
          >
            <MaterialIcon
              icon="keyboard_arrow_up"
              size="md"
              className="group-hover:animate-bounce"
            />
          </button>

          <div className="flex lg:flex-row flex-col justify-between items-center space-y-4 lg:space-y-0 text-gray-400 dark:text-gray-300">
            <div className="flex items-center space-x-2 text-sm">
              <MaterialIcon
                icon="copyright"
                size="sm"
                className="text-gray-500 dark:text-gray-400"
              />
              <span>&copy; 2025 MH Construction LLC. All rights reserved.</span>
            </div>

            <div className="flex flex-wrap items-center justify-center lg:justify-end gap-4 text-xs">
              <button className="group flex items-center space-x-1 hover:bg-brand-primary/10 px-2 py-1 rounded-lg transition-all duration-300 hover:scale-105 touch-manipulation">
                <MaterialIcon
                  icon="verified"
                  size="sm"
                  className="text-brand-primary group-hover:scale-110 transition-transform duration-300"
                />
                <span className="group-hover:text-brand-primary transition-colors duration-300">
                  Licensed & Insured
                </span>
              </button>
              <div className="flex items-center gap-1">
                <MaterialIcon
                  icon="location_on"
                  size="sm"
                  className="text-brand-primary"
                />
                <div className="flex gap-1">
                  <span
                    className="relative group cursor-help hover:text-brand-primary transition-colors duration-300 px-1 py-0.5 rounded hover:bg-brand-primary/10"
                    title="Washington License: MHCONCI907R7"
                  >
                    WA
                    <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-gray-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap z-10 pointer-events-none">
                      License: MHCONCI907R7
                    </div>
                  </span>
                  <span className="text-gray-400">•</span>
                  <span
                    className="relative group cursor-help hover:text-brand-primary transition-colors duration-300 px-1 py-0.5 rounded hover:bg-brand-primary/10"
                    title="Oregon License: 765043-99"
                  >
                    OR
                    <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-gray-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap z-10 pointer-events-none">
                      License: 765043-99
                    </div>
                  </span>
                  <span className="text-gray-400">•</span>
                  <span
                    className="relative group cursor-help hover:text-brand-primary transition-colors duration-300 px-1 py-0.5 rounded hover:bg-brand-primary/10"
                    title="Idaho License: RCE-49250"
                  >
                    ID
                    <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-gray-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap z-10 pointer-events-none">
                      License: RCE-49250
                    </div>
                  </span>
                </div>
              </div>
              <button className="group flex items-center space-x-1 hover:bg-brand-primary/10 px-2 py-1 rounded-lg transition-all duration-300 hover:scale-105 touch-manipulation">
                <MaterialIcon
                  icon="military_tech"
                  size="sm"
                  className="text-brand-primary group-hover:scale-110 transition-transform duration-300"
                />
                <span className="font-medium text-brand-primary group-hover:text-brand-primary-dark transition-colors duration-300">
                  Veteran-Owned
                </span>
              </button>
            </div>
          </div>

          {/* Interactive Brand Tagline */}
          <div className="text-center mt-6 pt-4 border-t border-gray-700/50 dark:border-gray-600/50">
            <p className="group cursor-default text-brand-primary dark:text-brand-primary text-sm font-semibold italic hover:text-brand-primary-dark transition-all duration-300 hover:scale-105 select-none">
              "Building for the Client, NOT the Dollar"
              <MaterialIcon
                icon="favorite"
                size="sm"
                className="ml-2 opacity-0 group-hover:opacity-100 text-red-500 transition-all duration-300 inline-block group-hover:animate-pulse"
              />
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
