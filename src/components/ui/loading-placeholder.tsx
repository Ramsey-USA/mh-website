'use client'

import React from 'react'

interface LoadingPlaceholderProps {
  className?: string
  variant?: 'card' | 'image' | 'text' | 'button'
  count?: number
}

export function LoadingPlaceholder({ 
  className = '', 
  variant = 'card',
  count = 1 
}: LoadingPlaceholderProps) {
  const baseClasses = 'animate-pulse bg-gray-200 rounded'
  
  const variants = {
    card: 'h-64 w-full',
    image: 'h-48 w-full',
    text: 'h-4 w-3/4 mb-2',
    button: 'h-10 w-32'
  }
  
  const placeholderClass = `${baseClasses} ${variants[variant]} ${className}`
  
  if (count === 1) {
    return <div className={placeholderClass} />
  }
  
  return (
    <>
      {Array.from({ length: count }, (_, i) => (
        <div key={i} className={placeholderClass} />
      ))}
    </>
  )
}

export function PortfolioCardSkeleton({ className = '' }: { className?: string }) {
  return (
    <div className={`border rounded-lg overflow-hidden ${className}`}>
      <LoadingPlaceholder variant="image" className="rounded-none" />
      <div className="p-6">
        <LoadingPlaceholder variant="text" className="w-3/4 h-6 mb-3" />
        <LoadingPlaceholder variant="text" className="w-full h-4 mb-2" />
        <LoadingPlaceholder variant="text" className="w-2/3 h-4 mb-4" />
        <div className="flex justify-between">
          <LoadingPlaceholder variant="text" className="w-1/3 h-3" />
          <LoadingPlaceholder variant="text" className="w-1/4 h-3" />
        </div>
      </div>
    </div>
  )
}

export function ProjectDetailSkeleton() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <div className="mb-8">
        <LoadingPlaceholder variant="text" className="w-2/3 h-8 mb-4" />
        <LoadingPlaceholder variant="text" className="w-full h-5 mb-2" />
        <LoadingPlaceholder variant="text" className="w-3/4 h-5" />
      </div>
      
      {/* Image Gallery */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
        <LoadingPlaceholder variant="image" className="h-96" />
        <div className="space-y-4">
          <LoadingPlaceholder variant="image" className="h-44" />
          <LoadingPlaceholder variant="image" className="h-44" />
        </div>
      </div>
      
      {/* Project Details */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <LoadingPlaceholder variant="text" className="w-1/2 h-6 mb-4" />
          <LoadingPlaceholder variant="text" className="w-full h-4 mb-2" count={4} />
        </div>
        <div>
          <LoadingPlaceholder variant="text" className="w-1/2 h-6 mb-4" />
          <LoadingPlaceholder variant="text" className="w-full h-4 mb-2" count={3} />
        </div>
      </div>
    </div>
  )
}