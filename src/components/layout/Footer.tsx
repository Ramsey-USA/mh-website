"use client";

import Image from "next/image";
import Link from "next/link";
import { MaterialIcon } from "@/components/icons/MaterialIcon";

export default function Footer() {
  return (
    <footer className="bg-gradient-to-br from-gray-800 dark:from-black via-gray-900 dark:via-gray-900 to-black dark:to-black pt-6 xs:pt-8 sm:pt-10 pb-4 border-t border-brand-primary/20 text-gray-300 touch-manipulation">
      <div className="mx-auto px-3 xs:px-4 sm:px-6 lg:px-8 max-w-7xl">
        {/* Main Footer Content */}
        <div className="gap-4 xs:gap-5 sm:gap-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 pb-3">
          {/* Column 1: Company Info */}
          <div className="space-y-3 xs:space-y-4 sm:col-span-2 lg:col-span-1">
            <div className="text-center sm:text-left lg:text-left">
              <div className="mb-4">
                <Link href="/" className="inline-block">
                  <Image
                    src="/images/logo/mh-logo-dark-bg.png"
                    alt="MH Construction Logo"
                    width={264}
                    height={132}
                    loading="lazy"
                    className="mx-auto sm:mx-0 lg:mx-0 w-[240px] xs:w-[270px] sm:w-[300px] h-auto drop-shadow-lg hover:drop-shadow-xl transition-all duration-300 cursor-pointer"
                  />
                </Link>
              </div>

              {/* Social Media Links */}
              <div className="flex items-center justify-center sm:justify-start gap-2 xs:gap-2.5 flex-wrap">
                <a
                  href="https://www.facebook.com/profile.php?id=61575511773974"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex justify-center items-center bg-gradient-to-br from-gray-700 to-gray-800 dark:from-gray-600 dark:to-gray-700 hover:from-[#1877F2] hover:via-[#42A5F5] hover:to-[#1565C0] p-2.5 border border-gray-600 dark:border-gray-500 hover:border-[#1877F2] rounded-lg hover:scale-105 transition-all duration-300 touch-manipulation shadow-md hover:shadow-[#1877F2]/40"
                  title="Follow our partnership stories on Facebook"
                >
                  <MaterialIcon
                    icon="thumb_up"
                    size="md"
                    className="text-gray-400 dark:text-gray-300 group-hover:text-white transition-colors drop-shadow-lg group-hover:drop-shadow-[0_0_8px_rgba(24,119,242,0.8)]"
                  />
                </a>
                <a
                  href="https://www.instagram.com/mh_construction_inc/reels/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex justify-center items-center bg-gradient-to-br from-gray-700 to-gray-800 dark:from-gray-600 dark:to-gray-700 hover:from-[#833AB4] hover:via-[#FD1D1D] hover:to-[#F77737] p-2.5 border border-gray-600 dark:border-gray-500 hover:border-[#E4405F] rounded-lg hover:scale-105 transition-all duration-300 touch-manipulation shadow-md hover:shadow-[#E4405F]/40"
                  title="See partnership projects on Instagram"
                >
                  <MaterialIcon
                    icon="photo_camera"
                    size="md"
                    className="text-gray-400 dark:text-gray-300 group-hover:text-white transition-colors drop-shadow-lg group-hover:drop-shadow-[0_0_8px_rgba(228,64,95,0.8)]"
                  />
                </a>
                <a
                  href="https://x.com/mhc_gc"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex justify-center items-center bg-gradient-to-br from-gray-700 to-gray-800 dark:from-gray-600 dark:to-gray-700 hover:from-[#000000] hover:via-[#1D9BF0] hover:to-[#000000] p-2.5 border border-gray-600 dark:border-gray-500 hover:border-[#1D9BF0] rounded-lg hover:scale-105 transition-all duration-300 touch-manipulation shadow-md hover:shadow-black/40"
                  title="Follow partnership updates on X (Twitter)"
                >
                  <MaterialIcon
                    icon="close"
                    size="md"
                    className="text-gray-400 dark:text-gray-300 group-hover:text-white transition-colors drop-shadow-lg group-hover:drop-shadow-[0_0_8px_rgba(29,155,240,0.8)]"
                  />
                </a>
                <a
                  href="https://youtube.com/@mhc-gc?si=RGnloxP4NgV4Dm_j"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex justify-center items-center bg-gradient-to-br from-gray-700 to-gray-800 dark:from-gray-600 dark:to-gray-700 hover:from-[#FF0000] hover:via-[#FF4444] hover:to-[#CC0000] p-2.5 border border-gray-600 dark:border-gray-500 hover:border-[#FF0000] rounded-lg hover:scale-105 transition-all duration-300 touch-manipulation shadow-md hover:shadow-[#FF0000]/40"
                  title="Watch partnership success stories on YouTube"
                >
                  <MaterialIcon
                    icon="play_circle"
                    size="md"
                    className="text-gray-400 dark:text-gray-300 group-hover:text-white transition-colors drop-shadow-lg group-hover:drop-shadow-[0_0_8px_rgba(255,0,0,0.8)]"
                  />
                </a>
                <a
                  href="https://www.linkedin.com/company/mh-construction-general-contractor/posts/?feedView=all"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex justify-center items-center bg-gradient-to-br from-gray-700 to-gray-800 dark:from-gray-600 dark:to-gray-700 hover:from-[#0A66C2] hover:via-[#0E76A8] hover:to-[#004182] p-2.5 border border-gray-600 dark:border-gray-500 hover:border-[#0A66C2] rounded-lg hover:scale-105 transition-all duration-300 touch-manipulation shadow-md hover:shadow-[#0A66C2]/40"
                  title="Connect with our partnership team on LinkedIn"
                >
                  <MaterialIcon
                    icon="work"
                    size="md"
                    className="text-gray-400 dark:text-gray-300 group-hover:text-white transition-colors drop-shadow-lg group-hover:drop-shadow-[0_0_8px_rgba(10,102,194,0.8)]"
                  />
                </a>
              </div>

              {/* Google Review Card */}
              <a
                href="https://g.page/r/CVdv3YZLzJvdEBM/review"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-3 bg-gradient-to-r from-brand-primary/10 to-brand-secondary/10 hover:from-brand-primary/20 hover:to-brand-secondary/20 p-3 rounded-lg border border-brand-primary/30 hover:border-brand-primary transition-all duration-300 hover:scale-105 touch-manipulation mt-4"
              >
                <div className="flex-shrink-0 flex justify-center items-center bg-brand-primary p-2 rounded-lg group-hover:scale-110 transition-transform">
                  <MaterialIcon
                    icon="rate_review"
                    size="md"
                    className="text-white"
                  />
                </div>
                <div className="flex-grow min-w-0">
                  <div className="text-brand-secondary text-xs font-bold uppercase tracking-wide mb-0.5">
                    Rate Us
                  </div>
                  <div className="text-gray-300 font-bold text-sm xs:text-base group-hover:text-brand-primary transition-colors mb-1">
                    Leave a Google Review
                  </div>
                  <div className="flex items-center gap-1 text-yellow-500">
                    <MaterialIcon icon="star" size="sm" />
                    <MaterialIcon icon="star" size="sm" />
                    <MaterialIcon icon="star" size="sm" />
                    <MaterialIcon icon="star" size="sm" />
                    <MaterialIcon icon="star" size="sm" />
                  </div>
                </div>
                <MaterialIcon
                  icon="arrow_forward"
                  size="sm"
                  className="text-brand-primary opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0"
                />
              </a>
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
                Mission Execution
              </h4>
            </div>
            <nav className="space-y-1.5 xs:space-y-2">
              <Link
                href="/"
                className="group flex items-center space-x-2 text-gray-300 hover:text-brand-primary dark:text-gray-200 text-sm xs:text-base transition-all hover:translate-x-1 duration-300 touch-manipulation"
              >
                <MaterialIcon
                  icon="home"
                  size="sm"
                  className="text-gray-500 dark:text-gray-400 group-hover:text-brand-primary transition-colors"
                />
                <span className="flex flex-col">
                  <span>Home</span>
                  <span className="text-[9px] text-brand-secondary opacity-75">
                    Base HQ
                  </span>
                </span>
                <MaterialIcon
                  icon="arrow_forward"
                  size="sm"
                  className="opacity-0 group-hover:opacity-100 text-brand-primary transition-opacity"
                />
              </Link>

              <Link
                href="/contact"
                className="group flex items-center space-x-2 text-gray-300 hover:text-brand-primary dark:text-gray-200 text-sm xs:text-base transition-all hover:translate-x-1 duration-300 touch-manipulation"
              >
                <MaterialIcon
                  icon="handshake"
                  size="sm"
                  className="text-gray-500 dark:text-gray-400 group-hover:text-brand-primary transition-colors"
                />
                <span className="flex flex-col">
                  <span>Contact</span>
                  <span className="text-[9px] text-brand-secondary opacity-75">
                    Rally Point
                  </span>
                </span>
                <MaterialIcon
                  icon="arrow_forward"
                  size="sm"
                  className="opacity-0 group-hover:opacity-100 text-brand-primary transition-opacity"
                />
              </Link>

              <Link
                href="/services"
                className="group flex items-center space-x-2 text-gray-300 hover:text-brand-primary dark:text-gray-200 text-sm xs:text-base transition-all hover:translate-x-1 duration-300 touch-manipulation"
              >
                <MaterialIcon
                  icon="construction"
                  size="sm"
                  className="text-gray-500 dark:text-gray-400 group-hover:text-brand-primary transition-colors"
                />
                <span className="flex flex-col">
                  <span>Services</span>
                  <span className="text-[9px] text-brand-secondary opacity-75">
                    Operations
                  </span>
                </span>
                <MaterialIcon
                  icon="arrow_forward"
                  size="sm"
                  className="opacity-0 group-hover:opacity-100 text-brand-primary transition-opacity"
                />
              </Link>

              <Link
                href="/projects"
                className="group flex items-center space-x-2 text-gray-300 hover:text-brand-primary dark:text-gray-200 text-sm xs:text-base transition-all hover:translate-x-1 duration-300 touch-manipulation"
              >
                <MaterialIcon
                  icon="photo_library"
                  size="sm"
                  className="text-gray-500 dark:text-gray-400 group-hover:text-brand-primary transition-colors"
                />
                <span className="flex flex-col">
                  <span>Projects</span>
                  <span className="text-[9px] text-brand-secondary opacity-75">
                    Missions
                  </span>
                </span>
                <MaterialIcon
                  icon="arrow_forward"
                  size="sm"
                  className="opacity-0 group-hover:opacity-100 text-brand-primary transition-opacity"
                />
              </Link>

              <Link
                href="/services#inspections"
                className="group flex items-center space-x-2 text-gray-300 hover:text-brand-primary dark:text-gray-200 text-sm xs:text-base transition-all hover:translate-x-1 duration-300 touch-manipulation"
              >
                <MaterialIcon
                  icon="fact_check"
                  size="sm"
                  className="text-gray-500 dark:text-gray-400 group-hover:text-brand-primary transition-colors"
                />
                <span className="flex flex-col">
                  <span>Inspections</span>
                  <span className="text-[9px] text-brand-secondary opacity-75">
                    Quality Assurance
                  </span>
                </span>
                <MaterialIcon
                  icon="arrow_forward"
                  size="sm"
                  className="opacity-0 group-hover:opacity-100 text-brand-primary transition-opacity"
                />
              </Link>

              <Link
                href="/urgent"
                className="group flex items-center space-x-2 text-gray-300 hover:text-brand-primary dark:text-gray-200 text-sm xs:text-base transition-all hover:translate-x-1 duration-300 touch-manipulation"
              >
                <MaterialIcon
                  icon="engineering"
                  size="sm"
                  className="text-gray-500 dark:text-gray-400 group-hover:text-brand-primary transition-colors"
                />
                <span className="flex flex-col">
                  <span>Emergency</span>
                  <span className="text-[9px] text-brand-secondary opacity-75">
                    Rapid Response
                  </span>
                </span>
                <MaterialIcon
                  icon="arrow_forward"
                  size="sm"
                  className="opacity-0 group-hover:opacity-100 text-brand-primary transition-opacity"
                />
              </Link>

              <Link
                href="/faq"
                className="group flex items-center space-x-2 text-gray-300 hover:text-brand-primary dark:text-gray-200 text-sm xs:text-base transition-all hover:translate-x-1 duration-300 touch-manipulation"
              >
                <MaterialIcon
                  icon="help"
                  size="sm"
                  className="text-gray-500 dark:text-gray-400 group-hover:text-brand-primary transition-colors"
                />
                <span className="flex flex-col">
                  <span>Help/FAQ</span>
                  <span className="text-[9px] text-brand-secondary opacity-75">
                    Intel Brief
                  </span>
                </span>
                <MaterialIcon
                  icon="arrow_forward"
                  size="sm"
                  className="opacity-0 group-hover:opacity-100 text-brand-primary transition-opacity"
                />
              </Link>

              <Link
                href="/services#maintenance"
                className="group flex items-center space-x-2 text-gray-300 hover:text-brand-primary dark:text-gray-200 text-sm xs:text-base transition-all hover:translate-x-1 duration-300 touch-manipulation"
              >
                <MaterialIcon
                  icon="home_repair_service"
                  size="sm"
                  className="text-gray-500 dark:text-gray-400 group-hover:text-brand-primary transition-colors"
                />
                <span className="flex flex-col">
                  <span>Maintenance</span>
                  <span className="text-[9px] text-brand-secondary opacity-75">
                    Field Service
                  </span>
                </span>
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
                Our Forces
              </h4>
            </div>
            <nav className="space-y-1.5 xs:space-y-2">
              <Link
                href="/about"
                className="group flex items-center space-x-2 text-gray-300 hover:text-brand-primary dark:text-gray-200 text-sm xs:text-base transition-all hover:translate-x-1 duration-300 touch-manipulation"
              >
                <MaterialIcon
                  icon="foundation"
                  size="sm"
                  className="text-gray-500 dark:text-gray-400 group-hover:text-brand-primary transition-colors"
                />
                <span className="flex flex-col">
                  <span>About Us</span>
                  <span className="text-[9px] text-brand-secondary opacity-75">
                    Our Oath
                  </span>
                </span>
                <MaterialIcon
                  icon="arrow_forward"
                  size="sm"
                  className="opacity-0 group-hover:opacity-100 text-brand-primary transition-opacity"
                />
              </Link>

              <Link
                href="/team"
                className="group flex items-center space-x-2 text-gray-300 hover:text-brand-primary dark:text-gray-200 text-sm xs:text-base transition-all hover:translate-x-1 duration-300 touch-manipulation"
              >
                <MaterialIcon
                  icon="people"
                  size="sm"
                  className="text-gray-500 dark:text-gray-400 group-hover:text-brand-primary transition-colors"
                />
                <span className="flex flex-col">
                  <span>Our Team</span>
                  <span className="text-[9px] text-brand-secondary opacity-75">
                    Team Six
                  </span>
                </span>
                <MaterialIcon
                  icon="arrow_forward"
                  size="sm"
                  className="opacity-0 group-hover:opacity-100 text-brand-primary transition-opacity"
                />
              </Link>

              <Link
                href="/allies"
                className="group flex items-center space-x-2 text-gray-300 hover:text-brand-primary dark:text-gray-200 text-sm xs:text-base transition-all hover:translate-x-1 duration-300 touch-manipulation"
              >
                <MaterialIcon
                  icon="group"
                  size="sm"
                  className="text-gray-500 dark:text-gray-400 group-hover:text-brand-primary transition-colors"
                />
                <span className="flex flex-col">
                  <span>Partners</span>
                  <span className="text-[9px] text-brand-secondary opacity-75">
                    Allies
                  </span>
                </span>
                <MaterialIcon
                  icon="arrow_forward"
                  size="sm"
                  className="opacity-0 group-hover:opacity-100 text-brand-primary transition-opacity"
                />
              </Link>

              <Link
                href="/public-sector"
                className="group flex items-center space-x-2 text-gray-300 hover:text-brand-primary dark:text-gray-200 text-sm xs:text-base transition-all hover:translate-x-1 duration-300 touch-manipulation"
              >
                <MaterialIcon
                  icon="account_balance"
                  size="sm"
                  className="text-gray-500 dark:text-gray-400 group-hover:text-brand-primary transition-colors"
                />
                <span className="flex flex-col">
                  <span>Government</span>
                  <span className="text-[9px] text-brand-secondary opacity-75">
                    Public Sector
                  </span>
                </span>
                <MaterialIcon
                  icon="arrow_forward"
                  size="sm"
                  className="opacity-0 group-hover:opacity-100 text-brand-primary transition-opacity"
                />
              </Link>

              <Link
                href="/veterans"
                className="group flex items-center space-x-2 text-gray-300 hover:text-brand-primary dark:text-gray-200 text-sm xs:text-base transition-all hover:translate-x-1 duration-300 touch-manipulation"
              >
                <MaterialIcon
                  icon="military_tech"
                  size="sm"
                  className="text-gray-500 dark:text-gray-400 group-hover:text-brand-primary transition-colors"
                />
                <span className="flex flex-col">
                  <span>Veterans</span>
                  <span className="text-[9px] text-brand-secondary opacity-75">
                    Service First
                  </span>
                </span>
                <MaterialIcon
                  icon="arrow_forward"
                  size="sm"
                  className="opacity-0 group-hover:opacity-100 text-brand-primary transition-opacity"
                />
              </Link>

              <Link
                href="/careers"
                className="group flex items-center space-x-2 text-gray-300 hover:text-brand-primary dark:text-gray-200 text-sm xs:text-base transition-all hover:translate-x-1 duration-300 touch-manipulation"
              >
                <MaterialIcon
                  icon="handshake"
                  size="sm"
                  className="text-gray-500 dark:text-gray-400 group-hover:text-brand-primary transition-colors"
                />
                <span className="flex flex-col">
                  <span>Careers</span>
                  <span className="text-[9px] text-brand-secondary opacity-75">
                    Enlist
                  </span>
                </span>
                <MaterialIcon
                  icon="arrow_forward"
                  size="sm"
                  className="opacity-0 group-hover:opacity-100 text-brand-primary transition-opacity"
                />
              </Link>

              <Link
                href="/testimonials"
                className="group flex items-center space-x-2 text-gray-300 hover:text-brand-primary dark:text-gray-200 text-sm xs:text-base transition-all hover:translate-x-1 duration-300 touch-manipulation"
              >
                <MaterialIcon
                  icon="verified"
                  size="sm"
                  className="text-gray-500 dark:text-gray-400 group-hover:text-brand-primary transition-colors"
                />
                <span className="flex flex-col">
                  <span>Reviews</span>
                  <span className="text-[9px] text-brand-secondary opacity-75">
                    Commendations
                  </span>
                </span>
                <MaterialIcon
                  icon="arrow_forward"
                  size="sm"
                  className="opacity-0 group-hover:opacity-100 text-brand-primary transition-opacity"
                />
              </Link>

              <Link
                href="/about#safety"
                className="group flex items-center space-x-2 text-gray-300 hover:text-brand-primary dark:text-gray-200 text-sm xs:text-base transition-all hover:translate-x-1 duration-300 touch-manipulation"
              >
                <MaterialIcon
                  icon="verified_user"
                  size="sm"
                  className="text-gray-500 dark:text-gray-400 group-hover:text-brand-primary transition-colors"
                />
                <span className="flex flex-col">
                  <span>Safety</span>
                  <span className="text-[9px] text-brand-secondary opacity-75">
                    Force Protection
                  </span>
                </span>
                <MaterialIcon
                  icon="arrow_forward"
                  size="sm"
                  className="opacity-0 group-hover:opacity-100 text-brand-primary transition-opacity"
                />
              </Link>
            </nav>
          </div>

          {/* Column 4: Social Media & Resources */}
          <div className="space-y-3 xs:space-y-4">
            <div className="flex items-center space-x-2 pb-2 border-b border-brand-primary/30">
              <MaterialIcon
                icon="share"
                size="sm"
                className="text-brand-primary"
              />
              <h4 className="font-medium text-brand-primary text-xs uppercase tracking-wide">
                Command Center
              </h4>
            </div>

            {/* Contact Info */}
            <div className="space-y-2 xs:space-y-3">
              <a
                href="tel:+15093086489"
                className="group flex items-center gap-3 bg-gradient-to-r from-brand-primary/10 to-brand-secondary/10 hover:from-brand-primary/20 hover:to-brand-secondary/20 p-3 rounded-lg border border-brand-primary/30 hover:border-brand-primary transition-all duration-300 hover:scale-105 touch-manipulation"
              >
                <div className="flex-shrink-0 flex justify-center items-center bg-brand-primary p-2 rounded-lg group-hover:scale-110 transition-transform">
                  <MaterialIcon icon="call" size="md" className="text-white" />
                </div>
                <div className="flex-grow">
                  <div className="text-brand-secondary text-xs font-bold uppercase tracking-wide mb-0.5">
                    Call Us
                  </div>
                  <div className="text-gray-300 font-bold text-sm xs:text-base group-hover:text-brand-primary transition-colors">
                    (509) 308-6489
                  </div>
                </div>
                <MaterialIcon
                  icon="arrow_forward"
                  size="sm"
                  className="text-brand-primary opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0"
                />
              </a>

              <a
                href="mailto:office@mhc-gc.com"
                className="group flex items-center gap-3 bg-gradient-to-r from-brand-primary/10 to-brand-secondary/10 hover:from-brand-primary/20 hover:to-brand-secondary/20 p-3 rounded-lg border border-brand-primary/30 hover:border-brand-primary transition-all duration-300 hover:scale-105 touch-manipulation"
              >
                <div className="flex-shrink-0 flex justify-center items-center bg-brand-primary p-2 rounded-lg group-hover:scale-110 transition-transform">
                  <MaterialIcon icon="mail" size="md" className="text-white" />
                </div>
                <div className="flex-grow min-w-0">
                  <div className="text-brand-secondary text-xs font-bold uppercase tracking-wide mb-0.5">
                    Email Us
                  </div>
                  <div className="text-gray-300 font-bold text-xs xs:text-sm group-hover:text-brand-primary transition-colors truncate">
                    office@mhc-gc.com
                  </div>
                </div>
                <MaterialIcon
                  icon="arrow_forward"
                  size="sm"
                  className="text-brand-primary opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0"
                />
              </a>

              <a
                href="https://maps.google.com/?q=3111+N+Capitol+Ave+Pasco+WA+99301"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-3 bg-gradient-to-r from-brand-primary/10 to-brand-secondary/10 hover:from-brand-primary/20 hover:to-brand-secondary/20 p-3 rounded-lg border border-brand-primary/30 hover:border-brand-primary transition-all duration-300 hover:scale-105 touch-manipulation"
              >
                <div className="flex-shrink-0 flex justify-center items-center bg-brand-primary p-2 rounded-lg group-hover:scale-110 transition-transform">
                  <MaterialIcon icon="place" size="md" className="text-white" />
                </div>
                <div className="flex-grow min-w-0">
                  <div className="text-brand-secondary text-xs font-bold uppercase tracking-wide mb-0.5">
                    Visit Us
                  </div>
                  <div className="text-gray-300 font-bold text-xs xs:text-sm group-hover:text-brand-primary transition-colors">
                    3111 N. Capitol Ave.
                    <br />
                    Pasco, WA 99301
                  </div>
                </div>
                <MaterialIcon
                  icon="arrow_forward"
                  size="sm"
                  className="text-brand-primary opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0"
                />
              </a>
            </div>

            {/* Newsletter Signup */}
            <div className="group bg-gradient-to-r from-brand-primary/10 to-brand-secondary/10 hover:from-brand-primary/20 hover:to-brand-secondary/20 p-3 rounded-lg border border-brand-primary/30 hover:border-brand-primary transition-all duration-300 hover:scale-105 touch-manipulation">
              <div className="flex items-center gap-3 mb-3">
                <div className="flex-shrink-0 flex justify-center items-center bg-brand-primary p-2 rounded-lg group-hover:scale-110 transition-transform">
                  <MaterialIcon
                    icon="notifications_active"
                    size="md"
                    className="text-white"
                  />
                </div>
                <div className="flex-grow">
                  <div className="text-brand-secondary text-xs font-bold uppercase tracking-wide mb-0.5">
                    Stay Updated
                  </div>
                  <div className="text-gray-300 font-bold text-sm xs:text-base group-hover:text-brand-primary transition-colors">
                    Join Our Newsletter
                  </div>
                </div>
              </div>
              <form
                onSubmit={async (e) => {
                  e.preventDefault();
                  const form = e.currentTarget;
                  const emailInput = form.querySelector(
                    'input[name="email"]',
                  ) as HTMLInputElement;
                  const button = form.querySelector(
                    'button[type="submit"]',
                  ) as HTMLButtonElement;
                  const feedbackEl = form.querySelector(
                    ".newsletter-feedback",
                  ) as HTMLElement;

                  if (!emailInput?.value.trim()) return;

                  button.disabled = true;
                  const originalText = button.textContent;
                  button.textContent = "...";

                  try {
                    const response = await fetch("/api/newsletter", {
                      method: "POST",
                      headers: { "Content-Type": "application/json" },
                      body: JSON.stringify({ email: emailInput.value }),
                    });

                    if (response.ok) {
                      emailInput.value = "";
                      if (feedbackEl) {
                        feedbackEl.textContent = "✅ Subscribed!";
                        feedbackEl.className =
                          "newsletter-feedback text-green-400 text-xs mt-2";
                      }
                    } else {
                      if (feedbackEl) {
                        feedbackEl.textContent = "❌ Try again";
                        feedbackEl.className =
                          "newsletter-feedback text-red-400 text-xs mt-2";
                      }
                    }
                  } catch (_error) {
                    if (feedbackEl) {
                      feedbackEl.textContent = "❌ Error";
                      feedbackEl.className =
                        "newsletter-feedback text-red-400 text-xs mt-2";
                    }
                  } finally {
                    button.disabled = false;
                    button.textContent = originalText;
                    setTimeout(() => {
                      if (feedbackEl) feedbackEl.textContent = "";
                    }, 5000);
                  }
                }}
                className="space-y-2"
              >
                <input
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  required
                  className="w-full px-3 py-2 bg-gray-900/50 border border-gray-700 rounded text-sm text-white placeholder-gray-500 focus:outline-none focus:border-brand-primary transition-colors"
                />
                <button
                  type="submit"
                  className="w-full px-4 py-2 bg-brand-primary hover:bg-brand-primary-dark text-brand-secondary hover:text-white text-sm font-bold rounded-lg transition-all duration-300 border-2 border-brand-secondary/50 hover:border-brand-secondary shadow-md hover:shadow-lg flex items-center justify-center gap-2"
                >
                  Subscribe
                  <MaterialIcon icon="arrow_forward" size="sm" />
                </button>
                <div className="newsletter-feedback text-xs"></div>
              </form>
            </div>
          </div>
        </div>

        {/* Service Areas - Full Width Row */}
        <div className="py-3">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <MaterialIcon icon="map" size="md" className="text-brand-primary" />
            <h3 className="text-brand-primary font-semibold text-sm xs:text-base uppercase tracking-wide">
              Proudly Serving the Pacific Northwest
            </h3>
          </div>
          <div className="flex flex-wrap justify-center gap-2 xs:gap-3">
            {/* Cities with location pages - linked */}
            <span className="bg-gray-700/50 dark:bg-gray-600/50 hover:bg-brand-primary/20 dark:hover:bg-brand-primary/20 px-3 xs:px-4 py-2 rounded-lg text-gray-300 dark:text-gray-200 text-xs xs:text-sm transition-all duration-300 hover:scale-105 cursor-default border border-gray-600/50 dark:border-gray-500/50 font-medium">
              Pasco
            </span>
            <span className="bg-gray-700/50 dark:bg-gray-600/50 hover:bg-brand-primary/20 dark:hover:bg-brand-primary/20 px-3 xs:px-4 py-2 rounded-lg text-gray-300 dark:text-gray-200 text-xs xs:text-sm transition-all duration-300 hover:scale-105 cursor-default border border-gray-600/50 dark:border-gray-500/50 font-medium">
              Kennewick
            </span>
            <span className="bg-gray-700/50 dark:bg-gray-600/50 hover:bg-brand-primary/20 dark:hover:bg-brand-primary/20 px-3 xs:px-4 py-2 rounded-lg text-gray-300 dark:text-gray-200 text-xs xs:text-sm transition-all duration-300 hover:scale-105 cursor-default border border-gray-600/50 dark:border-gray-500/50 font-medium">
              Richland
            </span>
            <span className="bg-gray-700/50 dark:bg-gray-600/50 hover:bg-brand-primary/20 dark:hover:bg-brand-primary/20 px-3 xs:px-4 py-2 rounded-lg text-gray-300 dark:text-gray-200 text-xs xs:text-sm transition-all duration-300 hover:scale-105 cursor-default border border-gray-600/50 dark:border-gray-500/50 font-medium">
              West Richland
            </span>
            <span className="bg-gray-700/50 dark:bg-gray-600/50 hover:bg-brand-primary/20 dark:hover:bg-brand-primary/20 px-3 xs:px-4 py-2 rounded-lg text-gray-300 dark:text-gray-200 text-xs xs:text-sm transition-all duration-300 hover:scale-105 cursor-default border border-gray-600/50 dark:border-gray-500/50 font-medium">
              Spokane
            </span>
            <span className="bg-gray-700/50 dark:bg-gray-600/50 hover:bg-brand-primary/20 dark:hover:bg-brand-primary/20 px-3 xs:px-4 py-2 rounded-lg text-gray-300 dark:text-gray-200 text-xs xs:text-sm transition-all duration-300 hover:scale-105 cursor-default border border-gray-600/50 dark:border-gray-500/50 font-medium">
              Yakima
            </span>
            {/* Cities without location pages - remain as badges */}
            <span className="bg-gray-700/50 dark:bg-gray-600/50 hover:bg-brand-primary/20 dark:hover:bg-brand-primary/20 px-3 xs:px-4 py-2 rounded-lg text-gray-300 dark:text-gray-200 text-xs xs:text-sm transition-all duration-300 hover:scale-105 cursor-default border border-gray-600/50 dark:border-gray-500/50 font-medium">
              Walla Walla
            </span>
            <span className="bg-gray-700/50 dark:bg-gray-600/50 hover:bg-brand-primary/20 dark:hover:bg-brand-primary/20 px-3 xs:px-4 py-2 rounded-lg text-gray-300 dark:text-gray-200 text-xs xs:text-sm transition-all duration-300 hover:scale-105 cursor-default border border-gray-600/50 dark:border-gray-500/50 font-medium">
              Eastern Washington
            </span>
            <span className="bg-gray-700/50 dark:bg-gray-600/50 hover:bg-brand-primary/20 dark:hover:bg-brand-primary/20 px-3 xs:px-4 py-2 rounded-lg text-gray-300 dark:text-gray-200 text-xs xs:text-sm transition-all duration-300 hover:scale-105 cursor-default border border-gray-600/50 dark:border-gray-500/50 font-medium">
              Eastern Oregon
            </span>
            <span className="bg-gray-700/50 dark:bg-gray-600/50 hover:bg-brand-primary/20 dark:hover:bg-brand-primary/20 px-3 xs:px-4 py-2 rounded-lg text-gray-300 dark:text-gray-200 text-xs xs:text-sm transition-all duration-300 hover:scale-105 cursor-default border border-gray-600/50 dark:border-gray-500/50 font-medium">
              Southern Idaho
            </span>
          </div>
        </div>

        {/* Clean Bottom Bar - Streamlined Design */}
        <div className="pt-6 pb-6 border-gray-700 dark:border-gray-600 border-t">
          <div className="flex lg:flex-row flex-col justify-between items-center gap-4 lg:gap-6">
            {/* Copyright */}
            <div className="flex items-center gap-2 bg-brand-primary/5 dark:bg-brand-primary/10 px-4 py-2 rounded-lg border border-brand-primary/20 dark:border-brand-primary/30">
              <MaterialIcon
                icon="copyright"
                size="sm"
                className="text-brand-secondary dark:text-brand-secondary-light"
              />
              <span className="text-sm text-gray-300 dark:text-gray-200 font-semibold">
                2025 MH Construction, Inc.
              </span>
            </div>

            {/* Badges & Credentials */}
            <div className="flex flex-wrap items-center justify-center lg:justify-end gap-2 xs:gap-3">
              {/* Years in Business Badge */}
              <div className="group flex items-center gap-1.5 bg-gradient-to-r from-brand-primary/15 to-brand-secondary/15 dark:from-brand-primary/20 dark:to-brand-secondary/20 hover:from-brand-primary/25 hover:to-brand-secondary/25 dark:hover:from-brand-primary/30 dark:hover:to-brand-secondary/30 px-3 py-2 rounded-lg transition-all duration-300 hover:scale-105 touch-manipulation border-2 border-brand-primary/40 dark:border-brand-primary/50 hover:border-brand-secondary/60 dark:hover:border-brand-secondary/70">
                <MaterialIcon
                  icon="celebration"
                  size="sm"
                  className="text-brand-secondary dark:text-brand-secondary-light group-hover:scale-110 transition-transform duration-300"
                />
                <span className="font-bold text-brand-secondary dark:text-brand-secondary-light group-hover:text-brand-secondary-light transition-colors duration-300 whitespace-nowrap text-sm">
                  {new Date().getFullYear() - 2010}+ Years
                </span>
              </div>

              <div className="flex items-center gap-1.5 bg-brand-primary/5 dark:bg-brand-primary/10 hover:bg-brand-primary/15 dark:hover:bg-brand-primary/20 px-3 py-2 rounded-lg transition-all duration-300 hover:scale-105 touch-manipulation border border-brand-primary/20 dark:border-brand-primary/30 hover:border-brand-primary/40 dark:hover:border-brand-primary/50">
                <MaterialIcon
                  icon="verified"
                  size="sm"
                  className="text-brand-secondary dark:text-brand-secondary-light"
                />
                <span className="text-gray-300 dark:text-gray-200 hover:text-brand-secondary dark:hover:text-brand-secondary-light transition-colors duration-300 text-sm font-semibold">
                  Licensed
                </span>
              </div>

              <div className="flex items-center gap-1.5 bg-brand-primary/5 dark:bg-brand-primary/10 hover:bg-brand-primary/15 dark:hover:bg-brand-primary/20 px-3 py-2 rounded-lg transition-all duration-300 hover:scale-105 touch-manipulation border border-brand-primary/20 dark:border-brand-primary/30 hover:border-brand-primary/40 dark:hover:border-brand-primary/50">
                <MaterialIcon
                  icon="location_on"
                  size="sm"
                  className="text-brand-secondary dark:text-brand-secondary-light"
                />
                <div className="flex items-center gap-1">
                  <span
                    className="relative group cursor-help text-gray-300 dark:text-gray-200 hover:text-brand-secondary dark:hover:text-brand-secondary-light transition-colors duration-300 text-sm font-bold"
                    title="Washington License: MHCONCI907R7"
                  >
                    WA
                    <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-1.5 bg-gradient-to-r from-brand-primary to-brand-primary-dark dark:from-brand-primary-dark dark:to-black text-white text-xs font-semibold rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap z-10 pointer-events-none shadow-xl border-2 border-brand-secondary/30 dark:border-brand-secondary/50">
                      MHCONCI907R7
                    </div>
                  </span>
                  <span className="text-brand-primary/40 dark:text-brand-primary/50">
                    •
                  </span>
                  <span
                    className="relative group cursor-help text-gray-300 dark:text-gray-200 hover:text-brand-secondary dark:hover:text-brand-secondary-light transition-colors duration-300 text-sm font-bold"
                    title="Oregon License: 765043-99"
                  >
                    OR
                    <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-1.5 bg-gradient-to-r from-brand-primary to-brand-primary-dark dark:from-brand-primary-dark dark:to-black text-white text-xs font-semibold rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap z-10 pointer-events-none shadow-xl border-2 border-brand-secondary/30 dark:border-brand-secondary/50">
                      765043-99
                    </div>
                  </span>
                  <span className="text-brand-primary/40 dark:text-brand-primary/50">
                    •
                  </span>
                  <span
                    className="relative group cursor-help text-gray-300 dark:text-gray-200 hover:text-brand-secondary dark:hover:text-brand-secondary-light transition-colors duration-300 text-sm font-bold"
                    title="Idaho License: RCE-49250"
                  >
                    ID
                    <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-1.5 bg-gradient-to-r from-brand-primary to-brand-primary-dark dark:from-brand-primary-dark dark:to-black text-white text-xs font-semibold rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap z-10 pointer-events-none shadow-xl border-2 border-brand-secondary/30 dark:border-brand-secondary/50">
                      RCE-49250
                    </div>
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-1.5 bg-brand-primary/5 dark:bg-brand-primary/10 hover:bg-brand-primary/15 dark:hover:bg-brand-primary/20 px-3 py-2 rounded-lg transition-all duration-300 hover:scale-105 touch-manipulation border border-brand-primary/20 dark:border-brand-primary/30 hover:border-brand-primary/40 dark:hover:border-brand-primary/50">
                <MaterialIcon
                  icon="military_tech"
                  size="sm"
                  className="text-brand-secondary dark:text-brand-secondary-light"
                />
                <span className="font-bold text-brand-secondary dark:text-brand-secondary-light hover:text-brand-secondary-light transition-colors duration-300 text-sm">
                  Veteran-Owned
                </span>
              </div>
            </div>

            {/* Back to Top Button */}
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="group relative flex items-center gap-2 bg-brand-primary hover:bg-brand-primary-dark text-brand-secondary px-5 py-2.5 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 touch-manipulation border-2 border-brand-secondary hover:border-brand-secondary-light outline outline-2 outline-offset-2 outline-brand-secondary/50 hover:outline-brand-secondary"
              aria-label="Back to top"
            >
              <MaterialIcon
                icon="arrow_upward"
                size="md"
                className="text-brand-secondary group-hover:text-brand-secondary-light group-hover:-translate-y-1 transition-all duration-300"
              />
              <span className="font-bold text-sm text-brand-secondary group-hover:text-brand-secondary-light transition-colors duration-300 hidden sm:inline">
                Back to Top
              </span>
            </button>
          </div>

          {/* Legal Links Row */}
          <div className="flex flex-wrap justify-center items-center gap-3 mt-6 pt-6 border-t-2 border-brand-primary/20 dark:border-brand-primary/30">
            <Link
              href="/privacy"
              className="text-xs text-gray-300 dark:text-gray-200 hover:text-brand-secondary dark:hover:text-brand-secondary-light transition-colors duration-300 font-semibold hover:underline decoration-brand-secondary dark:decoration-brand-secondary-light"
            >
              Privacy
            </Link>
            <span className="text-brand-primary/40 dark:text-brand-primary/50 text-xs">
              •
            </span>
            <Link
              href="/terms"
              className="text-xs text-gray-300 dark:text-gray-200 hover:text-brand-secondary dark:hover:text-brand-secondary-light transition-colors duration-300 font-semibold hover:underline decoration-brand-secondary dark:decoration-brand-secondary-light"
            >
              Terms
            </Link>
            <span className="text-brand-primary/40 dark:text-brand-primary/50 text-xs">
              •
            </span>
            <Link
              href="/accessibility"
              className="text-xs text-gray-300 dark:text-gray-200 hover:text-brand-secondary dark:hover:text-brand-secondary-light transition-colors duration-300 font-semibold hover:underline decoration-brand-secondary dark:decoration-brand-secondary-light"
            >
              Accessibility
            </Link>
            <span className="text-brand-primary/40 dark:text-brand-primary/50 text-xs">
              •
            </span>
            <Link
              href="/sitemap.xml"
              className="text-xs text-gray-300 dark:text-gray-200 hover:text-brand-secondary dark:hover:text-brand-secondary-light transition-colors duration-300 font-semibold hover:underline decoration-brand-secondary dark:decoration-brand-secondary-light"
            >
              Sitemap
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
