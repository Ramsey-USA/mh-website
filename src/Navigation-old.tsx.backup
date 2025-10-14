"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { ThemeToggle } from "../ui/ThemeToggle";
import { MaterialIcon } from "../icons/MaterialIcon";

export function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => {
      const isScrolled = window.scrollY > 50;
      setScrolled(isScrolled);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleMenuClose = () => {
    setIsMenuOpen(false);
  };

  // Prevent hydration issues
  if (!mounted) {
    return (
      <header className="top-0 right-0 left-0 z-40 absolute bg-transparent">
        <div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <div className="flex justify-center items-center py-2 h-20 sm:h-24">
            <div className="flex-shrink-0 py-2 sm:py-3">
              <div className="w-[70.4px] sm:w-[88px] h-[70.4px] sm:h-[88px] bg-gray-200 rounded animate-pulse" />
            </div>
          </div>
        </div>
      </header>
    );
  }

  return (
    <>
      {/* Backdrop overlay when menu is open */}
      {isMenuOpen && (
        <div
          className="z-40 fixed inset-0 bg-black/20 backdrop-blur-sm transition-all duration-300"
          onClick={handleMenuClose}
        />
      )}

      {/* Main Header - Fully Transparent and Absolute Positioned per MD docs */}
      <header className="top-0 right-0 left-0 z-40 absolute bg-transparent pointer-events-none">
        <div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <div className="flex justify-center items-center py-2 h-20 sm:h-24">
            {/* Logo - Centered on all screens */}
            <div className="flex-shrink-0 py-2 sm:py-3 pointer-events-auto">
              <Link
                href="/"
                className="group relative flex items-center hover:scale-105 transition-all duration-300"
              >
                <Image
                  src="/images/logo/mh-logo.png"
                  alt="MH Construction"
                  width={88}
                  height={88}
                  priority
                  className="relative drop-shadow-lg w-auto h-[70.4px] sm:h-[88px] filter"
                />
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Floating Theme Toggle - Left edge per MD specs */}
      <div className="top-4 left-4 sm:left-6 z-50 fixed pointer-events-auto">
        <ThemeToggle />
      </div>

      {/* Floating Hamburger Menu - Right edge */}
      <div className="top-4 right-4 sm:right-6 z-50 fixed pointer-events-auto">
        <button
          onClick={handleMenuToggle}
          className={`relative bg-gradient-to-r from-brand-primary hover:from-brand-accent to-brand-primary hover:to-brand-accent shadow-lg hover:shadow-xl p-2.5 sm:p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-primary/50 focus:ring-offset-2 transition-all duration-300 ${
            scrolled ? "scale-90" : "scale-100"
          }`}
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          aria-expanded={isMenuOpen}
          type="button"
        >
          <div className="flex flex-col justify-center space-y-1 w-5 sm:w-6 h-5 sm:h-6">
            <span
              className={`w-full h-0.5 bg-white transition-all duration-300 ease-in-out transform origin-center ${
                isMenuOpen ? "rotate-45 translate-y-2" : ""
              }`}
            />
            <span
              className={`w-full h-0.5 bg-white transition-all duration-300 ${
                isMenuOpen ? "opacity-0 scale-x-0" : "opacity-100 scale-x-100"
              }`}
            />
            <span
              className={`w-full h-0.5 bg-white transition-all duration-300 ease-in-out transform origin-center ${
                isMenuOpen ? "-rotate-45 -translate-y-2" : ""
              }`}
            />
          </div>
        </button>
      </div>

      {/* Enhanced Mobile Menu with Animation */}
      <div
        className={`fixed top-0 left-0 right-0 bottom-0 z-40 overflow-hidden transition-all duration-500 ease-in-out ${
          isMenuOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      >
        <div className="relative bg-gradient-to-br from-white dark:from-gray-900 via-gray-50 dark:via-gray-800 to-white dark:to-gray-900 shadow-inner backdrop-blur-lg border-gray-200 dark:border-gray-700 border-b h-full">
          {/* Logo Background Watermark */}
          <div className="absolute inset-0 flex justify-center items-center pointer-events-none">
            <Image
              src="/images/logo/mh-logo.png"
              alt=""
              fill
              className="opacity-5 dark:opacity-10 grayscale object-contain filter"
            />
          </div>

          {/* Menu Content */}
          <div className="z-10 relative flex flex-col justify-center px-4 sm:px-6 py-2 sm:py-4 h-full">
            {/* Navigation Links - Adaptive Grid System */}
            <div className="flex flex-1 justify-center items-center">
              <div className="w-full max-w-sm sm:max-w-md">
                <div className="gap-1.5 sm:gap-3 grid grid-cols-3 sm:grid-cols-2">
                  {[
                    { href: "/", label: "Home", icon: "home" },
                    { href: "/about", label: "Our Story", icon: "info" },
                    { href: "/services", label: "Partnership Approach", icon: "build" },
                    { href: "/team", label: "Our Team", icon: "people" },
                    { href: "/projects", label: "Success Stories", icon: "photo_library" },
                    { href: "/government", label: "Government", icon: "account_balance" },
                    { href: "/trade-partners", label: "Trade Partners", icon: "business" },
                    { href: "/careers", label: "Join Our Team", icon: "badge" },
                    { href: "/contact", label: "Connect With Us", icon: "contact_phone" },
                    { href: "/estimator", label: "AI Estimator", icon: "calculate" },
                    { href: "/booking", label: "Start Partnership", icon: "handshake" },
                  ].map((item, index) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="group flex flex-col items-center hover:bg-gray-100 dark:hover:bg-gray-800 hover:shadow-sm px-1.5 sm:px-4 py-3 sm:py-6 rounded-lg sm:rounded-xl font-medium text-gray-900 hover:text-brand-primary dark:hover:text-brand-secondary dark:text-gray-100 text-center transition-all duration-300"
                      onClick={handleMenuClose}
                    >
                      <MaterialIcon
                        icon={item.icon}
                        size="sm"
                        className="opacity-70 group-hover:opacity-100 mb-1.5 sm:mb-3 group-hover:text-brand-primary dark:group-hover:text-brand-secondary transition-all duration-300"
                      />
                      <div className="text-center">
                        <div className="font-medium text-xs sm:text-sm leading-tight">
                          {item.label}
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
