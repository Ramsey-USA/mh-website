'use client'

import { useState, useEffect, useCallback } from 'react'
import Image from 'next/image'
import { Button } from '@/components/ui/Button'
import { OptimizedImage } from '@/components/ui/OptimizedImage'
import { FadeInWhenVisible } from '@/components/animations/FramerMotionComponents'
import { useAnalytics } from '@/components/analytics/enhanced-analytics'
import {
  X,
  ChevronLeft,
  ChevronRight,
  Download,
  Share2,
  ZoomIn,
  ZoomOut,
  RotateCw,
  Heart,
  Grid3x3,
  Maximize,
} from 'lucide-react'

interface GalleryImage {
  id: string
  src: string
  alt: string
  title?: string
  description?: string
  category?: string
  tags?: string[]
  photographer?: string
  location?: string
  date?: Date
  featured?: boolean
}

interface InteractiveGalleryProps {
  images: GalleryImage[]
  title?: string
  showThumbnails?: boolean
  showCategories?: boolean
  enableDownload?: boolean
  enableSharing?: boolean
  autoPlay?: boolean
  autoPlayInterval?: number
  className?: string
}

const InteractiveGallery = ({
  images = [],
  title,
  showThumbnails = true,
  showCategories = true,
  enableDownload = false,
  enableSharing = true,
  autoPlay = false,
  autoPlayInterval = 5000,
  className = '',
}: InteractiveGalleryProps) => {
  const { trackEvent } = useAnalytics()

  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState('')
  const [zoom, setZoom] = useState(1)
  const [rotation, setRotation] = useState(0)
  const [favorites, setFavorites] = useState<Set<string>>(new Set())
  const [viewMode, setViewMode] = useState<'grid' | 'masonry'>('grid')

  // Filter images by category
  const categories = Array.from(
    new Set(images.map(img => img.category).filter(Boolean))
  ) as string[]
  const filteredImages = selectedCategory
    ? images.filter(img => img.category === selectedCategory)
    : images

  // Navigation function wrapped in useCallback to prevent useEffect recreation
  const navigateImage = useCallback(
    (direction: 'prev' | 'next') => {
      const newIndex =
        direction === 'next'
          ? (currentIndex + 1) % filteredImages.length
          : (currentIndex - 1 + filteredImages.length) % filteredImages.length

      setCurrentIndex(newIndex)
      setSelectedImage(filteredImages[newIndex])
      setZoom(1)
      setRotation(0)
    },
    [currentIndex, filteredImages]
  )

  // Auto-play functionality
  useEffect(() => {
    if (autoPlay && selectedImage && !isFullscreen) {
      const interval = setInterval(() => {
        setCurrentIndex(prev => (prev + 1) % filteredImages.length)
      }, autoPlayInterval)

      return () => clearInterval(interval)
    }
  }, [
    autoPlay,
    selectedImage,
    isFullscreen,
    autoPlayInterval,
    filteredImages.length,
  ])

  // Keyboard navigation
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (!selectedImage) return

      switch (e.key) {
        case 'ArrowLeft':
          navigateImage('prev')
          break
        case 'ArrowRight':
          navigateImage('next')
          break
        case 'Escape':
          closeModal()
          break
        case '+':
        case '=':
          setZoom(prev => Math.min(prev + 0.25, 3))
          break
        case '-':
          setZoom(prev => Math.max(prev - 0.25, 0.5))
          break
        case 'r':
          setRotation(prev => prev + 90)
          break
      }
    }

    window.addEventListener('keydown', handleKeyPress)
    return () => window.removeEventListener('keydown', handleKeyPress)
  }, [selectedImage, navigateImage])

  const openImage = (image: GalleryImage, index: number) => {
    setSelectedImage(image)
    setCurrentIndex(index)
    setZoom(1)
    setRotation(0)

    trackEvent('gallery_image_view', {
      event_category: 'user_engagement',
      image_id: image.id,
      image_title: image.title || image.alt,
    })
  }

  const closeModal = () => {
    setSelectedImage(null)
    setIsFullscreen(false)
    setZoom(1)
    setRotation(0)
  }

  const toggleFavorite = (imageId: string) => {
    setFavorites(prev => {
      const newFavorites = new Set(prev)
      if (newFavorites.has(imageId)) {
        newFavorites.delete(imageId)
      } else {
        newFavorites.add(imageId)
      }
      return newFavorites
    })

    trackEvent('gallery_favorite_toggle', {
      event_category: 'user_engagement',
      image_id: imageId,
      action: favorites.has(imageId) ? 'remove' : 'add',
    })
  }

  const downloadImage = async (image: GalleryImage) => {
    try {
      const response = await fetch(image.src)
      const blob = await response.blob()
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = image.title || image.alt || 'image'
      a.click()
      URL.revokeObjectURL(url)

      trackEvent('gallery_image_download', {
        event_category: 'user_engagement',
        image_id: image.id,
      })
    } catch (error) {
      console.error('Download failed:', error)
    }
  }

  const shareImage = async (image: GalleryImage) => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: image.title || image.alt,
          text: image.description,
          url: window.location.href,
        })

        trackEvent('gallery_image_share', {
          event_category: 'user_engagement',
          image_id: image.id,
          share_method: 'native',
        })
      } catch (error) {
        console.error('Share failed:', error)
      }
    } else {
      // Fallback to clipboard
      await navigator.clipboard.writeText(window.location.href)
      // You could show a toast notification here
      trackEvent('gallery_image_share', {
        event_category: 'user_engagement',
        image_id: image.id,
        share_method: 'clipboard',
      })
    }
  }

  const renderGridView = () => (
    <div
      className={`grid gap-6 ${
        viewMode === 'grid'
          ? 'grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
          : 'grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3'
      }`}
    >
      {filteredImages.map((image, index) => (
        <div
          key={image.id}
          className={`group relative overflow-hidden rounded-lg cursor-pointer transform transition-all duration-300 ${
            viewMode === 'masonry' ? 'break-inside-avoid mb-4' : 'aspect-square'
          }`}
          onClick={() => openImage(image, index)}
        >
          <OptimizedImage
            src={image.src}
            alt={image.alt}
            className="w-full h-full object-cover"
            width={300}
            height={300}
          />

          {/* Overlay */}
          <div className="absolute inset-0 flex justify-center items-center bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-all duration-300">
            <div className="opacity-0 group-hover:opacity-100 p-4 text-white text-center transition-opacity duration-300">
              <Maximize className="mx-auto mb-2 w-8 h-8" />
              {image.title && (
                <h3 className="font-semibold text-sm">{image.title}</h3>
              )}
            </div>
          </div>

          {/* Favorite Button */}
          <button
            onClick={e => {
              e.stopPropagation()
              toggleFavorite(image.id)
            }}
            className="top-2 right-2 absolute bg-white bg-opacity-80 opacity-0 group-hover:opacity-100 p-1.5 rounded-full transition-opacity duration-300"
          >
            <Heart
              className={`h-4 w-4 ${
                favorites.has(image.id)
                  ? 'fill-red-500 text-red-500'
                  : 'text-gray-600'
              }`}
            />
          </button>

          {/* Category Badge */}
          {image.category && (
            <span className="bottom-2 left-2 absolute bg-black bg-opacity-70 px-2 py-1 rounded-full text-white text-xs">
              {image.category}
            </span>
          )}
        </div>
      ))}
    </div>
  )

  return (
    <FadeInWhenVisible className={`w-full ${className}`}>
      {/* Header */}
      <div className="mb-6">
        {title && <h2 className="mb-4 font-bold text-2xl">{title}</h2>}

        <div className="flex sm:flex-row flex-col justify-between items-start sm:items-center gap-4">
          {/* Category Filter */}
          {showCategories && categories.length > 0 && (
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setSelectedCategory('')}
                className={`px-3 py-1 text-sm rounded-full transition-colors ${
                  selectedCategory === ''
                    ? 'bg-primary-600 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                All
              </button>
              {categories.map(category => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-3 py-1 text-sm rounded-full transition-colors ${
                    selectedCategory === category
                      ? 'bg-primary-600 text-white'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          )}

          {/* View Toggle */}
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setViewMode('grid')}
              aria-label="Switch to grid view"
              className={`p-2 rounded ${
                viewMode === 'grid'
                  ? 'bg-primary-100 text-primary-700'
                  : 'text-gray-600'
              }`}
            >
              <Grid3x3 className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('masonry')}
              aria-label="Switch to masonry view"
              className={`p-2 rounded ${
                viewMode === 'masonry'
                  ? 'bg-primary-100 text-primary-700'
                  : 'text-gray-600'
              }`}
            >
              <div className="gap-0.5 grid grid-cols-2 w-4 h-4">
                <div className="bg-current rounded-sm w-1.5 h-1.5"></div>
                <div className="bg-current rounded-sm w-1.5 h-2"></div>
                <div className="bg-current rounded-sm w-1.5 h-2"></div>
                <div className="bg-current rounded-sm w-1.5 h-1.5"></div>
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Gallery Grid */}
      {filteredImages.length > 0 ? (
        renderGridView()
      ) : (
        <div className="py-12 text-center">
          <p className="text-gray-500">
            No images found for the selected category.
          </p>
        </div>
      )}

      {/* Modal */}
      {selectedImage && (
        <div className="z-50 fixed inset-0 flex justify-center items-center bg-black bg-opacity-90">
          <div className="relative flex justify-center items-center p-4 w-full h-full">
            {/* Close Button */}
            <button
              onClick={closeModal}
              className="top-4 right-4 z-10 absolute bg-black bg-opacity-50 hover:bg-opacity-70 p-2 rounded-full text-white transition-all"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Navigation Buttons */}
            <button
              onClick={() => navigateImage('prev')}
              className="top-1/2 left-4 z-10 absolute bg-black bg-opacity-50 hover:bg-opacity-70 p-2 rounded-full text-white transition-all -translate-y-1/2 transform"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            <button
              onClick={() => navigateImage('next')}
              className="top-1/2 right-4 z-10 absolute bg-black bg-opacity-50 hover:bg-opacity-70 p-2 rounded-full text-white transition-all -translate-y-1/2 transform"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            {/* Controls */}
            <div className="top-4 left-4 z-10 absolute flex items-center space-x-2">
              <button
                onClick={() => setZoom(prev => Math.max(prev - 0.25, 0.5))}
                className="bg-black bg-opacity-50 hover:bg-opacity-70 p-2 rounded-full text-white transition-all"
              >
                <ZoomOut className="w-4 h-4" />
              </button>
              <button
                onClick={() => setZoom(prev => Math.min(prev + 0.25, 3))}
                className="bg-black bg-opacity-50 hover:bg-opacity-70 p-2 rounded-full text-white transition-all"
              >
                <ZoomIn className="w-4 h-4" />
              </button>
              <button
                onClick={() => setRotation(prev => prev + 90)}
                className="bg-black bg-opacity-50 hover:bg-opacity-70 p-2 rounded-full text-white transition-all"
              >
                <RotateCw className="w-4 h-4" />
              </button>
              {enableDownload && (
                <button
                  onClick={() => downloadImage(selectedImage)}
                  className="bg-black bg-opacity-50 hover:bg-opacity-70 p-2 rounded-full text-white transition-all"
                >
                  <Download className="w-4 h-4" />
                </button>
              )}
              {enableSharing && (
                <button
                  onClick={() => shareImage(selectedImage)}
                  className="bg-black bg-opacity-50 hover:bg-opacity-70 p-2 rounded-full text-white transition-all"
                >
                  <Share2 className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Main Image */}
            <div
              className="relative max-w-full max-h-full overflow-hidden transition-transform duration-300"
              style={{
                transform: `scale(${zoom}) rotate(${rotation}deg)`,
              }}
            >
              <Image
                src={selectedImage.src}
                alt={selectedImage.alt}
                fill
                className="object-contain"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 80vw"
              />
            </div>

            {/* Image Info */}
            {(selectedImage.title || selectedImage.description) && (
              <div className="right-4 bottom-4 left-4 z-10 absolute bg-black bg-opacity-70 p-4 rounded-lg text-white">
                {selectedImage.title && (
                  <h3 className="mb-1 font-semibold text-lg">
                    {selectedImage.title}
                  </h3>
                )}
                {selectedImage.description && (
                  <p className="opacity-90 text-sm">
                    {selectedImage.description}
                  </p>
                )}
                <div className="flex justify-between items-center opacity-70 mt-2 text-xs">
                  <span>
                    {currentIndex + 1} of {filteredImages.length}
                  </span>
                  {selectedImage.date && (
                    <span>{selectedImage.date.toLocaleDateString()}</span>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </FadeInWhenVisible>
  )
}

export default InteractiveGallery
export type { GalleryImage }
