'use client'
import React, { useState } from 'react'
import Link from 'next/link'
import { Button } from '../ui/Button'
import { useTheme } from '../../contexts/ThemeContext'

export function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { theme, setTheme } = useTheme()

  const toggleTheme = () => {
    // Cycle through light -> dark -> system
    if (theme === 'light') {
      setTheme('dark')
    } else if (theme === 'dark') {
      setTheme('system')
    } else {
      setTheme('light')
    }
  }

  // Get the actual theme being displayed (resolve system to light/dark)
  const getDisplayTheme = () => {
    if (theme === 'system') {
      return window?.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
    }
    return theme
  }

  const displayTheme = typeof window !== 'undefined' ? getDisplayTheme() : theme

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-surface dark:bg-surface-dark border-b border-border dark:border-border-dark backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-24 py-2">
          
          {/* LOGO */}
          <div className="flex-shrink-0 py-3">
            <Link 
              href="/" 
              className="flex items-center transition-all duration-300 hover:scale-105 relative overflow-hidden group"
            >
              <img 
                src="/images/logo/mh-logo.png" 
                alt="MH Construction" 
                className="h-20 w-auto filter drop-shadow-lg relative z-10"
              />
              {/* Brand-colored shine effect */}
              <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-brand-primary/30 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
            </Link>
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center space-x-8">
            <Link 
              href="/about" 
              className="text-text-primary dark:text-text-primary-dark hover:text-brand-primary transition-colors font-medium"
            >
              About
            </Link>
            <Link 
              href="/services" 
              className="text-text-primary dark:text-text-primary-dark hover:text-brand-primary transition-colors font-medium"
            >
              Services
            </Link>
            <Link 
              href="/portfolio" 
              className="text-text-primary dark:text-text-primary-dark hover:text-brand-primary transition-colors font-medium"
            >
              Portfolio
            </Link>
          </div>

          {/* Desktop Controls */}
          <div className="flex items-center space-x-4">
            <button 
              onClick={toggleTheme}
              className="p-2 rounded-lg border border-border dark:border-border-dark bg-surface hover:bg-surface-secondary dark:bg-surface-dark dark:hover:bg-surface-dark-secondary transition-colors"
              title={`Current: ${theme} | Click to toggle theme`}
              aria-label={`Current theme: ${theme}. Click to toggle theme.`}
            >
              {theme === 'dark' ? '☀️' : theme === 'light' ? '🌙' : '💻'}
            </button>
            
            <Link href="/estimator">
              <Button variant="outline" size="md">
                Get Quote
              </Button>
            </Link>
            
            <Link href="/contact">
              <Button variant="primary" size="md">
                Contact Us
              </Button>
            </Link>
          </div>

          {/* Menu Button - Visible on all screens */}
          <div className="block">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 rounded-lg border border-border dark:border-border-dark bg-surface hover:bg-surface-secondary dark:bg-surface-dark dark:hover:bg-surface-dark-secondary transition-colors"
              aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={isMenuOpen}
            >
              {isMenuOpen ? '✕' : '☰'}
            </button>
          </div>
        </div>

        {/* Menu - Visible on all screens when open */}
        {isMenuOpen && (
          <div className="bg-surface dark:bg-surface-dark border-t border-border dark:border-border-dark">
            <div className="px-4 py-4 space-y-4">
              <div className="space-y-2">
                <Link href="/estimator" onClick={() => setIsMenuOpen(false)}>
                  <Button variant="outline" size="md" className="w-full">
                    Get Quote
                  </Button>
                </Link>
                <Link href="/contact" onClick={() => setIsMenuOpen(false)}>
                  <Button variant="primary" size="md" className="w-full">
                    Contact Us
                  </Button>
                </Link>
              </div>
              
              <div className="space-y-2 border-t border-border dark:border-border-dark pt-4">
                <Link href="/" className="block py-2 text-text-primary dark:text-text-primary-dark hover:text-brand-primary transition-colors font-medium" onClick={() => setIsMenuOpen(false)}>Home</Link>
                <Link href="/about" className="block py-2 text-text-primary dark:text-text-primary-dark hover:text-brand-primary transition-colors font-medium" onClick={() => setIsMenuOpen(false)}>About</Link>
                <Link href="/services" className="block py-2 text-text-primary dark:text-text-primary-dark hover:text-brand-primary transition-colors font-medium" onClick={() => setIsMenuOpen(false)}>Services</Link>
                <Link href="/portfolio" className="block py-2 text-text-primary dark:text-text-primary-dark hover:text-brand-primary transition-colors font-medium" onClick={() => setIsMenuOpen(false)}>Portfolio</Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}