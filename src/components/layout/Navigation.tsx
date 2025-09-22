'use client'
import React, { useState } from 'react'
import Link from 'next/link'
import { Button } from '../ui/Button'
import { useTheme } from '../../contexts/ThemeContext'

export function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { theme, setTheme, isDarkMode } = useTheme()

  const toggleTheme = () => {
    // Toggle between light and dark (not system)
    setTheme(isDarkMode ? 'light' : 'dark')
    console.log('Theme toggled to:', isDarkMode ? 'light' : 'dark')
  }

  return (
    <nav className="fixed top-0 left-0 right-0 bg-white dark:bg-gray-900 shadow-md border-b border-mh-primary dark:border-mh-secondary z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          
          {/* LOGO */}
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-center nav-logo">
              <img 
                src="/images/logo/mh-logo.png" 
                alt="MH Construction" 
                className="h-10 w-auto hover:opacity-80 transition-opacity"
              />
            </Link>
          </div>

          {/* Desktop: Theme Toggle + 2 CTA Buttons */}
          <div className="flex items-center space-x-4">
            <button 
              onClick={toggleTheme}
              className="px-3 py-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-mh-primary dark:text-mh-secondary border border-mh-primary dark:border-mh-secondary hover:bg-mh-primary hover:text-white dark:hover:bg-mh-secondary transition-all duration-300"
              title="Toggle dark/light mode"
            >
              🌙☀️
            </button>
            
            <Link href="/quote">
              <Button variant="outline" size="sm">
                Get Quote
              </Button>
            </Link>
            
            <Link href="/contact">
              <Button variant="primary" size="sm">
                Contact Us
              </Button>
            </Link>
          </div>

          {/* Mobile: Hamburger Menu */}
          <div className="block">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-3 rounded-lg text-mh-primary dark:text-mh-secondary hover:bg-mh-primary hover:text-white dark:hover:bg-mh-secondary border-2 border-mh-primary dark:border-mh-secondary transition-colors text-xl font-bold"
              aria-label="Toggle navigation menu"
            >
              {isMenuOpen ? '✕' : '☰'}
            </button>
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        {isMenuOpen && (
          <div className="border-t border-mh-primary dark:border-mh-secondary bg-white dark:bg-gray-900">
            <div className="px-4 py-4 space-y-4">
              
              {/* CTA Buttons */}
              <div className="space-y-2">
                <Link href="/quote" onClick={() => setIsMenuOpen(false)} className="block">
                  <Button variant="outline" size="sm" className="w-full">
                    Get Quote
                  </Button>
                </Link>
                
                <Link href="/contact" onClick={() => setIsMenuOpen(false)} className="block">
                  <Button variant="primary" size="sm" className="w-full">
                    Contact Us
                  </Button>
                </Link>
              </div>

              {/* Navigation Links */}
              <div className="pt-4 border-t border-mh-primary dark:border-mh-secondary space-y-2">
                <Link href="/" className="block py-2 text-gray-700 dark:text-gray-200 hover:text-mh-primary dark:hover:text-mh-secondary link-primary" onClick={() => setIsMenuOpen(false)}>
                  Home
                </Link>
                <Link href="/about" className="block py-2 text-gray-700 dark:text-gray-200 hover:text-mh-primary dark:hover:text-mh-secondary link-primary" onClick={() => setIsMenuOpen(false)}>
                  About
                </Link>
                <Link href="/services" className="block py-2 text-gray-700 dark:text-gray-200 hover:text-mh-primary dark:hover:text-mh-secondary link-primary" onClick={() => setIsMenuOpen(false)}>
                  Services
                </Link>
                <Link href="/portfolio" className="block py-2 text-gray-700 dark:text-gray-200 hover:text-mh-primary dark:hover:text-mh-secondary link-primary" onClick={() => setIsMenuOpen(false)}>
                  Portfolio
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
