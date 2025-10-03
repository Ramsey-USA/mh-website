'use client'

import React from 'react'
import { MaterialIcon } from '../icons/MaterialIcon'
import { FadeInWhenVisible } from '../animations/FramerMotionComponents'

interface PageHeroProps {
  title: string
  subtitle: string
  description: string
}

interface HeroNavItem {
  href: string
  label: string
  icon: string
}

const heroNavItems: HeroNavItem[] = [
  { href: '/', label: 'Home', icon: 'home' },
  { href: '/about', label: 'About', icon: 'info' },
  { href: '/services', label: 'Services', icon: 'construction' },
  { href: '/projects', label: 'Projects', icon: 'work' },
  { href: '/team', label: 'Team', icon: 'group' },
  { href: '/government', label: 'Government', icon: 'account_balance' },
  { href: '/contact', label: 'Contact', icon: 'contact_mail' },
]

export function PageHero({ title, subtitle, description }: PageHeroProps) {
  return (
    <>
      {/* Consistent Hero Section */}
      <section className="relative h-screen overflow-hidden hero-section">
        {/* Video/Image Background Container */}
        <div className="absolute inset-0 bg-gradient-to-r from-gray-900/80 via-gray-900/60 to-gray-900/80">
          {/* Future video element will go here */}
          {/* <video className="absolute inset-0 w-full h-full object-cover" autoPlay muted loop playsInline>
            <source src="/videos/hero-video.mp4" type="video/mp4" />
          </video> */}

          {/* Temporary background for now */}
          <div className="absolute inset-0 bg-gradient-to-br from-brand-primary/20 via-gray-900 to-brand-secondary/20"></div>
        </div>

        {/* Content Overlay */}
        <div className="z-10 relative flex justify-center items-center mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl h-full text-white">
          <FadeInWhenVisible className="w-full text-center">
            {/* Title */}
            <h1 className="mb-6 font-black text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-tight tracking-tight">
              <span className="block bg-clip-text bg-gradient-to-r from-white via-blue-100 to-white drop-shadow-lg">
                {title}
              </span>
            </h1>

            {/* Subtitle */}
            <p className="mx-auto mb-8 max-w-3xl text-white/90 text-xl sm:text-2xl md:text-3xl leading-relaxed">
              {subtitle}
            </p>

            {/* Description */}
            <p className="mx-auto max-w-4xl text-white/80 text-lg md:text-xl leading-relaxed">
              {description}
            </p>
          </FadeInWhenVisible>
        </div>

        {/* Comprehensive Navigation Bar - Overlaid at bottom of hero */}
        <nav className="right-0 bottom-0 left-0 z-20 absolute bg-white/95 dark:bg-gray-900/95 shadow-lg backdrop-blur-md border-t-4 border-brand-primary">
          <div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
            <div className="flex justify-center">
              <div className="flex space-x-1 overflow-x-auto">
                {heroNavItems.map(item => (
                  <a
                    key={item.href}
                    href={item.href}
                    className="group flex flex-col items-center hover:bg-brand-primary/10 px-4 py-4 min-w-[80px] transition-colors duration-200"
                  >
                    <MaterialIcon
                      icon={item.icon}
                      size="md"
                      className="mb-1 text-gray-600 dark:text-gray-400 group-hover:text-brand-primary transition-colors duration-200"
                    />
                    <span className="font-medium text-gray-700 dark:text-gray-300 group-hover:text-brand-primary text-xs transition-colors duration-200">
                      {item.label}
                    </span>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </nav>
      </section>
    </>
  )
}
