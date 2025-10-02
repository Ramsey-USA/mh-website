'use client'

import React, { Suspense, lazy } from 'react'
import {
  PortfolioCardSkeleton,
  LoadingPlaceholder,
} from '@/components/ui/loading-placeholder'

// Lazy load heavy components
// PortfolioImage and ProjectGalleryImage lazy imports removed for clean slate migration

// Optimized portfolio card with lazy loading
interface PortfolioCardProps {
  project: {
    title: string
    description: string
    category: string
    location: { city: string; state: string }
    details: { completionDate?: string }
    images: Array<{ url: string }>
  }
  priority?: boolean
}

export function OptimizedPortfolioCard({
  project,
  priority = false,
}: PortfolioCardProps) {
  return (
    <div className="group cursor-pointer">
      <div className="relative mb-4 rounded-lg h-64 overflow-hidden">
        <img
          src={project.images[0]?.url || '/placeholder-construction.jpg'}
          alt={project.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          loading="lazy"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        <div className="bottom-4 left-4 absolute opacity-0 group-hover:opacity-100 text-white transition-opacity duration-300">
          <span className="bg-brand-primary px-3 py-1 rounded-full font-semibold text-sm">
            {project.category.charAt(0).toUpperCase() +
              project.category.slice(1)}
          </span>
        </div>
      </div>

      <h3 className="mb-2 font-semibold group-hover:text-brand-primary text-xl transition-colors">
        {project.title}
      </h3>
      <p className="text-gray-600 text-sm">
        {project.description.substring(0, 120)}...
      </p>
      <div className="mt-3 font-medium text-brand-primary text-sm">
        {project.location.city}, {project.location.state}
        {project.details.completionDate &&
          ` • ${new Date(project.details.completionDate).getFullYear()}`}
      </div>
    </div>
  )
}

// Optimized gallery for project detail pages
interface OptimizedGalleryProps {
  images: Array<{ url: string; caption?: string }>
  activeIndex: number
  onImageClick: (index: number) => void
}

export function OptimizedGallery({
  images,
  activeIndex,
  onImageClick,
}: OptimizedGalleryProps) {
  return (
    <div className="gap-8 grid grid-cols-1 lg:grid-cols-2">
      {/* Main Image */}
      <div className="relative rounded-lg h-96 lg:h-[500px] overflow-hidden">
        <img
          src={images[activeIndex]?.url || '/placeholder-construction.jpg'}
          alt={images[activeIndex]?.caption || 'Project image'}
          className="w-full h-full object-cover"
          loading="lazy"
        />
      </div>

      {/* Thumbnail Grid */}
      <div className="space-y-4">
        <h3 className="font-semibold text-lg">Project Gallery</h3>
        <div className="gap-2 grid grid-cols-4 max-h-[460px] overflow-y-auto">
          {images.map((image, index) => (
            <div
              key={index}
              className={`relative h-20 rounded cursor-pointer transition-opacity ${
                index === activeIndex
                  ? 'ring-2 ring-primary-500'
                  : 'hover:opacity-80'
              }`}
              onClick={() => onImageClick(index)}
            >
              <img
                src={image.url}
                alt={image.caption || `Project image ${index + 1}`}
                className="rounded w-full h-full object-cover"
                loading="lazy"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

// Performance monitoring component
export function WebVitalsReporter() {
  React.useEffect(() => {
    // Only load web vitals in production
    if (process.env.NODE_ENV === 'production') {
      import('web-vitals').then(({ onCLS, onINP, onFCP, onLCP, onTTFB }) => {
        onCLS(console.log)
        onINP(console.log)
        onFCP(console.log)
        onLCP(console.log)
        onTTFB(console.log)
      })
    }
  }, [])

  return null
}
