'use client'

import React, { Suspense, lazy } from 'react'
import { PortfolioCardSkeleton, LoadingPlaceholder } from '@/components/ui/loading-placeholder'

// Lazy load heavy components
const PortfolioImage = lazy(() => 
  import('@/components/portfolio/ProjectImage').then(module => ({ 
    default: module.PortfolioImage 
  }))
)

const ProjectGalleryImage = lazy(() => 
  import('@/components/portfolio/ProjectImage').then(module => ({ 
    default: module.ProjectGalleryImage 
  }))
)

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

export function OptimizedPortfolioCard({ project, priority = false }: PortfolioCardProps) {
  return (
    <div className="group cursor-pointer">
      <div className="relative h-64 rounded-lg overflow-hidden mb-4">
        <Suspense fallback={<LoadingPlaceholder variant="image" />}>
          <PortfolioImage
            src={project.images[0]?.url || '/placeholder-construction.jpg'}
            alt={project.title}
            className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
          />
        </Suspense>
        
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        <div className="absolute bottom-4 left-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <span className="bg-brand-primary px-3 py-1 rounded-full text-sm font-semibold">
            {project.category.charAt(0).toUpperCase() + project.category.slice(1)}
          </span>
        </div>
      </div>
      
      <h3 className="text-xl font-semibold mb-2 group-hover:text-brand-primary transition-colors">
        {project.title}
      </h3>
      <p className="text-gray-600 text-sm">
        {project.description.substring(0, 120)}...
      </p>
      <div className="mt-3 text-sm text-brand-primary font-medium">
        {project.location.city}, {project.location.state}
        {project.details.completionDate && ` • ${new Date(project.details.completionDate).getFullYear()}`}
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

export function OptimizedGallery({ images, activeIndex, onImageClick }: OptimizedGalleryProps) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* Main Image */}
      <div className="relative h-96 lg:h-[500px] rounded-lg overflow-hidden">
        <Suspense fallback={<LoadingPlaceholder variant="image" className="h-full" />}>
          <PortfolioImage
            src={images[activeIndex]?.url || '/placeholder-construction.jpg'}
            alt={images[activeIndex]?.caption || 'Project image'}
            className="object-cover w-full h-full"
          />
        </Suspense>
      </div>

      {/* Thumbnail Grid */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Project Gallery</h3>
        <div className="grid grid-cols-4 gap-2 max-h-[460px] overflow-y-auto">
          {images.map((image, index) => (
            <div
              key={index}
              className={`relative h-20 rounded cursor-pointer transition-opacity ${
                index === activeIndex ? 'ring-2 ring-primary-500' : 'hover:opacity-80'
              }`}
              onClick={() => onImageClick(index)}
            >
              <Suspense fallback={<LoadingPlaceholder variant="image" className="h-20" />}>
                <ProjectGalleryImage
                  src={image.url}
                  alt={image.caption || `Project image ${index + 1}`}
                  className="object-cover w-full h-full rounded"
                />
              </Suspense>
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