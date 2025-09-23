'use client'

import React from 'react'
import Image from 'next/image'

interface ProjectImageProps {
  src: string
  alt: string
  fill?: boolean
  className?: string
  sizes?: string
  priority?: boolean
  width?: number
  height?: number
}

export function ProjectImage({
  src,
  alt,
  fill = false,
  className = '',
  sizes,
  priority = false,
  width,
  height,
}: ProjectImageProps) {
  const [imageError, setImageError] = React.useState(false)

  // Generate a placeholder based on the project type or category
  const getPlaceholderContent = (alt: string) => {
    const altLower = alt.toLowerCase()

    if (altLower.includes('kitchen'))
      return { emoji: '🍳', bg: 'bg-orange-100', text: 'Kitchen Project' }
    if (altLower.includes('bathroom'))
      return { emoji: '🛁', bg: 'bg-blue-100', text: 'Bathroom Project' }
    if (altLower.includes('office') || altLower.includes('commercial'))
      return { emoji: '🏢', bg: 'bg-gray-100', text: 'Commercial Project' }
    if (altLower.includes('home') || altLower.includes('residential'))
      return { emoji: '🏠', bg: 'bg-green-100', text: 'Residential Project' }
    if (altLower.includes('renovation'))
      return { emoji: '🔨', bg: 'bg-yellow-100', text: 'Renovation Project' }

    return { emoji: '🏗️', bg: 'bg-blue-100', text: 'Construction Project' }
  }

  const placeholder = getPlaceholderContent(alt)

  if (imageError || src.includes('/images/portfolio/')) {
    // Show placeholder for missing portfolio images
    return (
      <div
        className={`${placeholder.bg} flex flex-col items-center justify-center text-gray-600 ${className}`}
      >
        <div className="text-4xl mb-2">{placeholder.emoji}</div>
        <div className="text-sm font-medium text-center px-4">
          {placeholder.text}
        </div>
        <div className="text-xs text-gray-500 mt-1">Image Coming Soon</div>
      </div>
    )
  }

  const imageProps = {
    src,
    alt,
    className: className + (imageError ? ' hidden' : ''),
    onError: () => setImageError(true),
    sizes,
    priority,
    ...(fill ? { fill: true } : { width, height }),
  }

  return <Image {...imageProps} />
}

// Optimized image component specifically for portfolio galleries
export function PortfolioImage({
  src,
  alt,
  className = '',
  sizes = '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw',
}: {
  src: string
  alt: string
  className?: string
  sizes?: string
}) {
  return (
    <ProjectImage
      src={src}
      alt={alt}
      fill
      className={`object-cover ${className}`}
      sizes={sizes}
    />
  )
}

// Component for project detail page image galleries
export function ProjectGalleryImage({
  src,
  alt,
  width = 800,
  height = 600,
  className = '',
  priority = false,
}: {
  src: string
  alt: string
  width?: number
  height?: number
  className?: string
  priority?: boolean
}) {
  return (
    <ProjectImage
      src={src}
      alt={alt}
      width={width}
      height={height}
      className={`rounded-lg ${className}`}
      priority={priority}
    />
  )
}
