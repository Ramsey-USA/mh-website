'use client'

import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import {
  CalendarIcon,
  ArrowRightIcon,
} from '@/components/icons/SharpDuotoneIcons'

interface BlogNewsItem {
  id: string
  title: string
  excerpt: string
  date: string
  category: 'blog' | 'news'
  image: string
  slug: string
  author?: string
  readTime?: string
}

interface BlogNewsCarouselProps {
  items?: BlogNewsItem[]
  autoPlay?: boolean
  autoPlayInterval?: number
  className?: string
}

// Sample data - in a real app, this would come from a CMS or API
const defaultItems: BlogNewsItem[] = [
  {
    id: '1',
    title: 'AI-Powered Estimating: The Future of Construction Planning',
    excerpt:
      'Discover how our revolutionary AI estimator is changing the way we plan and price construction projects, delivering unprecedented accuracy.',
    date: '2025-09-28',
    category: 'blog',
    image: '/images/blog/blog-default.png',
    slug: 'ai-powered-estimating-future-construction',
    author: 'Mike Henderson',
    readTime: '5 min read',
  },
  {
    id: '2',
    title: 'MH Construction Wins Pacific Northwest Excellence Award',
    excerpt:
      'We are honored to receive recognition for our commitment to veteran values and community-focused construction partnerships.',
    date: '2025-09-25',
    category: 'news',
    image: '/images/news/news-default.png',
    slug: 'pacific-northwest-excellence-award',
    author: 'MH Team',
    readTime: '3 min read',
  },
  {
    id: '3',
    title: 'Sustainable Building Practices: Our Environmental Commitment',
    excerpt:
      'Learn about our eco-friendly construction methods and how we are building a greener future for the Pacific Northwest.',
    date: '2025-09-22',
    category: 'blog',
    image: '/images/blog/blog-default.png',
    slug: 'sustainable-building-practices',
    author: 'Sarah Johnson',
    readTime: '7 min read',
  },
  {
    id: '4',
    title: 'New Partnership with Local Veterans Organizations',
    excerpt:
      'MH Construction announces expanded partnerships with regional veteran support groups, strengthening our community ties.',
    date: '2025-09-20',
    category: 'news',
    image: '/images/news/news-default.png',
    slug: 'veteran-organizations-partnership',
    author: 'MH Team',
    readTime: '4 min read',
  },
  {
    id: '5',
    title: 'Smart Home Technology Integration in Modern Construction',
    excerpt:
      'Explore how we are incorporating cutting-edge smart home technology into our residential construction projects.',
    date: '2025-09-18',
    category: 'blog',
    image: '/images/blog/blog-default.png',
    slug: 'smart-home-technology-integration',
    author: 'Tech Team',
    readTime: '6 min read',
  },
]

// Helper functions
const formatDate = (dateString: string) => {
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

const getCategoryColor = (category: 'blog' | 'news') => {
  return category === 'blog'
    ? 'bg-brand-primary text-white'
    : 'bg-brand-secondary text-white'
}

// Simple left arrow SVG component
const ArrowLeftIcon = ({ className = '' }: { className?: string }) => (
  <svg
    className={`w-4 h-4 ${className}`}
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M15 19l-7-7 7-7"
    />
  </svg>
)

export default function BlogNewsCarousel({
  items = defaultItems,
  autoPlay = true,
  autoPlayInterval = 5000,
  className = '',
}: BlogNewsCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isHovered, setIsHovered] = useState(false)

  // Auto-play functionality
  useEffect(() => {
    if (!autoPlay || isHovered) return

    const interval = setInterval(() => {
      setCurrentIndex(prev => (prev + 1) % items.length)
    }, autoPlayInterval)

    return () => clearInterval(interval)
  }, [autoPlay, autoPlayInterval, isHovered, items.length])

  const goToSlide = (index: number) => {
    setCurrentIndex(index)
  }

  const goToPrevious = () => {
    setCurrentIndex(prev => (prev - 1 + items.length) % items.length)
  }

  const goToNext = () => {
    setCurrentIndex(prev => (prev + 1) % items.length)
  }

  const getCurrentItems = () => {
    // Show 3 items on desktop, 1 on mobile
    const itemsToShow = 3
    const result = []

    for (let i = 0; i < itemsToShow; i++) {
      const index = (currentIndex + i) % items.length
      result.push({ ...items[index], displayIndex: i })
    }

    return result
  }

  return (
    <div
      className={`relative ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Carousel Container */}
      <div className="relative overflow-hidden">
        <div className="relative h-[500px] md:h-[400px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.5, ease: 'easeInOut' }}
              className="absolute inset-0"
            >
              {/* Mobile: Single item */}
              <div className="md:hidden block">
                <BlogNewsCard item={items[currentIndex]} />
              </div>

              {/* Desktop: Three items */}
              <div className="hidden gap-6 md:grid md:grid-cols-3 h-full">
                {getCurrentItems().map(item => (
                  <BlogNewsCard
                    key={`${item.id}-${item.displayIndex}`}
                    item={item}
                    isCenter={item.displayIndex === 1}
                  />
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={goToPrevious}
        className="group top-1/2 left-4 z-10 absolute flex justify-center items-center bg-white/90 hover:bg-white dark:bg-gray-800/90 dark:hover:bg-gray-800 shadow-lg hover:shadow-xl rounded-full w-12 h-12 transition-all -translate-y-1/2 duration-300"
        aria-label="Previous item"
      >
        <ArrowLeftIcon className="text-gray-700 dark:text-gray-300 group-hover:text-brand-primary transition-colors" />
      </button>

      <button
        onClick={goToNext}
        className="group top-1/2 right-4 z-10 absolute flex justify-center items-center bg-white/90 hover:bg-white dark:bg-gray-800/90 dark:hover:bg-gray-800 shadow-lg hover:shadow-xl rounded-full w-12 h-12 transition-all -translate-y-1/2 duration-300"
        aria-label="Next item"
      >
        <ArrowRightIcon
          size="sm"
          className="text-gray-700 dark:text-gray-300 group-hover:text-brand-primary transition-colors"
        />
      </button>

      {/* Dots Indicator */}
      <div className="flex justify-center items-center space-x-2 mt-6">
        {items.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentIndex
                ? 'bg-brand-primary scale-125'
                : 'bg-gray-300 dark:bg-gray-600 hover:bg-brand-primary/60'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  )
}

function BlogNewsCard({
  item,
  isCenter = false,
}: {
  item: BlogNewsItem
  isCenter?: boolean
}) {
  return (
    <motion.div
      className={`group relative bg-white dark:bg-gray-800 shadow-lg hover:shadow-2xl rounded-3xl overflow-hidden h-full transition-all duration-300 ${
        isCenter ? 'scale-105 z-10' : 'scale-100'
      }`}
      whileHover={{ scale: isCenter ? 1.08 : 1.03 }}
    >
      {/* Image Container */}
      <div className="relative h-48 overflow-hidden">
        <Image
          src={item.image}
          alt={item.title}
          fill
          className="object-cover group-hover:scale-110 transition-transform duration-500"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />

        {/* Category Badge */}
        <div className="top-4 left-4 absolute">
          <span
            className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider ${getCategoryColor(
              item.category
            )}`}
          >
            {item.category}
          </span>
        </div>

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>

      {/* Content */}
      <div className="flex flex-col flex-grow p-6">
        {/* Date and Read Time */}
        <div className="flex items-center mb-3 text-gray-500 dark:text-gray-400 text-sm">
          <CalendarIcon size="sm" className="mr-2" />
          <span>{formatDate(item.date)}</span>
          {item.readTime && (
            <>
              <span className="mx-2">•</span>
              <span>{item.readTime}</span>
            </>
          )}
        </div>

        {/* Title */}
        <h3 className="mb-3 font-bold text-gray-900 dark:text-gray-100 group-hover:text-brand-primary text-lg line-clamp-2 leading-tight transition-colors">
          {item.title}
        </h3>

        {/* Excerpt */}
        <p className="flex-grow mb-4 text-gray-600 dark:text-gray-300 text-sm line-clamp-3 leading-relaxed">
          {item.excerpt}
        </p>

        {/* Author and Read More */}
        <div className="flex justify-between items-center mt-auto">
          {item.author && (
            <span className="text-gray-500 dark:text-gray-400 text-xs">
              By {item.author}
            </span>
          )}

          <Link
            href={`/${item.category}/${item.slug}`}
            className="group/link flex items-center font-semibold text-brand-primary hover:text-brand-secondary text-sm transition-colors"
          >
            <span className="mr-2">Read More</span>
            <ArrowRightIcon
              size="sm"
              className="transition-transform group-hover/link:translate-x-1"
            />
          </Link>
        </div>
      </div>
    </motion.div>
  )
}
