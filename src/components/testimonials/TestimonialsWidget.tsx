'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import {
  Star,
  Quote,
  ChevronLeft,
  ChevronRight,
  Award,
  MapPin,
  Calendar,
  ExternalLink,
} from 'lucide-react'
import {
  mockTestimonials,
  type ClientTestimonial,
} from '@/lib/types/testimonials'
import { formatDate } from '@/lib/utils/dateUtils'

interface TestimonialsWidgetProps {
  title?: string
  subtitle?: string
  showViewAll?: boolean
  autoSlide?: boolean
  slideDuration?: number
  maxTestimonials?: number
  variant?: 'default' | 'compact' | 'cards'
}

export default function TestimonialsWidget({
  title = 'What Our Clients Say',
  subtitle = 'Read testimonials from satisfied customers across the Pacific Northwest',
  showViewAll = true,
  autoSlide = true,
  slideDuration = 5000,
  maxTestimonials = 6,
  variant = 'default',
}: TestimonialsWidgetProps) {
  // Get featured and approved testimonials
  const featuredTestimonials = mockTestimonials
    .filter(
      testimonial =>
        (testimonial.status === 'featured' ||
          testimonial.status === 'approved') &&
        testimonial.featured
    )
    .slice(0, maxTestimonials)

  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(autoSlide)

  // Auto-slide functionality
  useEffect(() => {
    if (!isAutoPlaying || featuredTestimonials.length <= 1) return

    const interval = setInterval(() => {
      setCurrentIndex(prev => (prev + 1) % featuredTestimonials.length)
    }, slideDuration)

    return () => clearInterval(interval)
  }, [isAutoPlaying, featuredTestimonials.length, slideDuration])

  const goToSlide = (index: number) => {
    setCurrentIndex(index)
    setIsAutoPlaying(false)
    setTimeout(() => setIsAutoPlaying(autoSlide), 3000) // Resume auto-play after 3 seconds
  }

  const goToPrevious = () => {
    setCurrentIndex(
      prev =>
        (prev - 1 + featuredTestimonials.length) % featuredTestimonials.length
    )
    setIsAutoPlaying(false)
    setTimeout(() => setIsAutoPlaying(autoSlide), 3000)
  }

  const goToNext = () => {
    setCurrentIndex(prev => (prev + 1) % featuredTestimonials.length)
    setIsAutoPlaying(false)
    setTimeout(() => setIsAutoPlaying(autoSlide), 3000)
  }

  if (featuredTestimonials.length === 0) {
    return null
  }

  if (variant === 'compact') {
    return <CompactTestimonialsWidget testimonials={featuredTestimonials} />
  }

  if (variant === 'cards') {
    return (
      <CardsTestimonialsWidget
        testimonials={featuredTestimonials}
        title={title}
        subtitle={subtitle}
        showViewAll={showViewAll}
      />
    )
  }

  return (
    <section className="bg-gradient-to-br from-blue-50 to-indigo-100 py-16">
      <div className="mx-auto px-4 container">
        {/* Header */}
        <div className="mb-12 text-center">
          <h2 className="mb-4 font-bold text-gray-900 text-4xl">{title}</h2>
          <p className="mx-auto max-w-3xl text-gray-600 text-xl">{subtitle}</p>
        </div>

        {/* Testimonial Slider */}
        <div className="relative mx-auto max-w-6xl">
          <div className="bg-white shadow-xl rounded-2xl overflow-hidden">
            <div className="relative min-h-[400px]">
              {featuredTestimonials.map((testimonial, index) => (
                <div
                  key={testimonial.id}
                  className={`absolute inset-0 transition-opacity duration-500 ${
                    index === currentIndex ? 'opacity-100' : 'opacity-0'
                  }`}
                >
                  <TestimonialSlide testimonial={testimonial} />
                </div>
              ))}
            </div>

            {/* Navigation Arrows */}
            {featuredTestimonials.length > 1 && (
              <>
                <button
                  onClick={goToPrevious}
                  className="top-1/2 left-4 absolute bg-white/90 hover:bg-white shadow-lg p-3 rounded-full text-gray-800 transition-all -translate-y-1/2 duration-200 transform"
                  aria-label="Previous testimonial"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
                <button
                  onClick={goToNext}
                  className="top-1/2 right-4 absolute bg-white/90 hover:bg-white shadow-lg p-3 rounded-full text-gray-800 transition-all -translate-y-1/2 duration-200 transform"
                  aria-label="Next testimonial"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              </>
            )}
          </div>

          {/* Dots Navigation */}
          {featuredTestimonials.length > 1 && (
            <div className="flex justify-center gap-2 mt-8">
              {featuredTestimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-200 ${
                    index === currentIndex
                      ? 'bg-blue-600 scale-125'
                      : 'bg-gray-300 hover:bg-gray-400'
                  }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>
          )}
        </div>

        {/* View All Button */}
        {showViewAll && (
          <div className="mt-12 text-center">
            <Link
              href="/testimonials"
              className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 px-8 py-3 rounded-lg font-bold text-white transition-colors duration-200"
            >
              View All Testimonials
              <ExternalLink className="w-5 h-5" />
            </Link>
          </div>
        )}
      </div>
    </section>
  )
}

function TestimonialSlide({ testimonial }: { testimonial: ClientTestimonial }) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[400px]">
      {/* Image Section */}
      <div className="relative overflow-hidden">
        {testimonial.images?.after && testimonial.images.after[0] ? (
          <Image
            src={testimonial.images.after[0]}
            alt={`${testimonial.projectTitle} - Completed Project`}
            fill
            className="object-cover"
          />
        ) : (
          <div className="absolute inset-0 flex justify-center items-center bg-gradient-to-br from-blue-500 to-blue-700">
            <Quote className="w-24 h-24 text-white/30" />
          </div>
        )}

        {/* Project Type Badge */}
        <div className="top-4 left-4 absolute bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full font-medium text-gray-800 text-sm capitalize">
          {testimonial.projectType}
        </div>

        {/* Featured Badge */}
        {testimonial.featured && (
          <div className="top-4 right-4 absolute flex items-center gap-1 bg-yellow-500 px-3 py-1 rounded-full font-medium text-white text-sm">
            <Award className="w-4 h-4" />
            Featured
          </div>
        )}
      </div>

      {/* Content Section */}
      <div className="flex flex-col justify-center p-8 lg:p-12">
        {/* Rating */}
        <div className="flex items-center gap-1 mb-6">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className={`h-6 w-6 ${
                i < testimonial.rating
                  ? 'fill-yellow-400 text-yellow-400'
                  : 'text-gray-300'
              }`}
            />
          ))}
          <span className="ml-2 font-semibold text-gray-700 text-lg">
            {testimonial.rating}/5
          </span>
        </div>

        {/* Project Title */}
        <h3 className="mb-4 font-bold text-gray-900 text-2xl">
          {testimonial.projectTitle}
        </h3>

        {/* Testimonial Text */}
        <blockquote className="relative mb-6 text-gray-700 text-lg leading-relaxed">
          <Quote className="-top-2 -left-2 absolute w-8 h-8 text-blue-200" />
          <span className="pl-6 italic">
            &quot;{testimonial.testimonialText}&quot;
          </span>
        </blockquote>

        {/* Client Info */}
        <div className="flex items-center gap-4">
          {testimonial.images?.client && (
            <div className="relative rounded-full w-16 h-16 overflow-hidden">
              <Image
                src={testimonial.images.client}
                alt={testimonial.clientName}
                fill
                className="object-cover"
              />
            </div>
          )}
          <div>
            <div className="font-semibold text-gray-900 text-xl">
              {testimonial.clientName}
            </div>
            <div className="flex items-center gap-4 text-gray-600">
              <div className="flex items-center gap-1">
                <MapPin className="w-4 h-4" />
                <span>{testimonial.clientLocation}</span>
              </div>
              <div className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                <span>{formatDate(testimonial.completionDate)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function CompactTestimonialsWidget({
  testimonials,
}: {
  testimonials: ClientTestimonial[]
}) {
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex(prev => (prev + 1) % testimonials.length)
    }, 4000)

    return () => clearInterval(interval)
  }, [testimonials.length])

  const currentTestimonial = testimonials[currentIndex]

  return (
    <div className="bg-white shadow-sm p-6 border rounded-lg">
      <div className="flex items-center gap-2 mb-4">
        <Quote className="w-5 h-5 text-blue-600" />
        <h3 className="font-semibold text-gray-900">Client Testimonial</h3>
      </div>

      <div className="mb-4">
        <div className="flex items-center gap-1 mb-2">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className={`h-4 w-4 ${
                i < currentTestimonial.rating
                  ? 'fill-yellow-400 text-yellow-400'
                  : 'text-gray-300'
              }`}
            />
          ))}
        </div>
        <blockquote className="text-gray-700 text-sm italic line-clamp-3">
          &quot;{currentTestimonial.testimonialText}&quot;
        </blockquote>
      </div>

      <div className="flex justify-between items-center">
        <div>
          <div className="font-medium text-gray-900 text-sm">
            {currentTestimonial.clientName}
          </div>
          <div className="text-gray-600 text-xs">
            {currentTestimonial.projectTitle}
          </div>
        </div>

        <Link
          href="/testimonials"
          className="font-medium text-blue-600 hover:text-blue-700 text-sm"
        >
          View More
        </Link>
      </div>

      {/* Progress Dots */}
      {testimonials.length > 1 && (
        <div className="flex justify-center gap-1 mt-4">
          {testimonials.map((_, index) => (
            <div
              key={index}
              className={`w-2 h-2 rounded-full transition-colors ${
                index === currentIndex ? 'bg-blue-600' : 'bg-gray-300'
              }`}
            />
          ))}
        </div>
      )}
    </div>
  )
}

function CardsTestimonialsWidget({
  testimonials,
  title,
  subtitle,
  showViewAll,
}: {
  testimonials: ClientTestimonial[]
  title: string
  subtitle: string
  showViewAll: boolean
}) {
  return (
    <section className="bg-white py-16">
      <div className="mx-auto px-4 container">
        {/* Header */}
        <div className="mb-12 text-center">
          <h2 className="mb-4 font-bold text-gray-900 text-4xl">{title}</h2>
          <p className="mx-auto max-w-3xl text-gray-600 text-xl">{subtitle}</p>
        </div>

        {/* Cards Grid */}
        <div className="gap-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mx-auto max-w-7xl">
          {testimonials.slice(0, 3).map(testimonial => (
            <div
              key={testimonial.id}
              className="bg-white shadow-lg hover:shadow-xl border rounded-lg overflow-hidden transition-shadow duration-300"
            >
              {/* Image */}
              {testimonial.images?.after && testimonial.images.after[0] && (
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={testimonial.images.after[0]}
                    alt={testimonial.projectTitle}
                    fill
                    className="object-cover"
                  />
                </div>
              )}

              <div className="p-6">
                {/* Rating */}
                <div className="flex items-center gap-1 mb-3">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-4 w-4 ${
                        i < testimonial.rating
                          ? 'fill-yellow-400 text-yellow-400'
                          : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>

                {/* Project Title */}
                <h3 className="mb-2 font-bold text-gray-900">
                  {testimonial.projectTitle}
                </h3>

                {/* Testimonial Text */}
                <blockquote className="mb-4 text-gray-700 text-sm italic line-clamp-3">
                  &quot;{testimonial.testimonialText}&quot;
                </blockquote>

                {/* Client Info */}
                <div className="flex items-center gap-3">
                  {testimonial.images?.client && (
                    <div className="relative rounded-full w-10 h-10 overflow-hidden">
                      <Image
                        src={testimonial.images.client}
                        alt={testimonial.clientName}
                        fill
                        className="object-cover"
                      />
                    </div>
                  )}
                  <div>
                    <div className="font-medium text-gray-900 text-sm">
                      {testimonial.clientName}
                    </div>
                    <div className="text-gray-600 text-xs">
                      {testimonial.clientLocation}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View All Button */}
        {showViewAll && (
          <div className="mt-12 text-center">
            <Link
              href="/testimonials"
              className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 px-8 py-3 rounded-lg font-bold text-white transition-colors duration-200"
            >
              View All Testimonials
              <ExternalLink className="w-5 h-5" />
            </Link>
          </div>
        )}
      </div>
    </section>
  )
}
