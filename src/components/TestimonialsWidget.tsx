'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Star, Quote, ChevronLeft, ChevronRight, Award, MapPin, Calendar, ExternalLink } from 'lucide-react'
import { mockTestimonials, type ClientTestimonial } from '@/lib/types/testimonials'
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
  title = "What Our Clients Say",
  subtitle = "Read testimonials from satisfied customers across the Pacific Northwest",
  showViewAll = true,
  autoSlide = true,
  slideDuration = 5000,
  maxTestimonials = 6,
  variant = 'default'
}: TestimonialsWidgetProps) {
  // Get featured and approved testimonials
  const featuredTestimonials = mockTestimonials
    .filter(testimonial => 
      (testimonial.status === 'featured' || testimonial.status === 'approved') &&
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
    setCurrentIndex(prev => (prev - 1 + featuredTestimonials.length) % featuredTestimonials.length)
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
    <section className="py-16 bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">{title}</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">{subtitle}</p>
        </div>

        {/* Testimonial Slider */}
        <div className="relative max-w-6xl mx-auto">
          <div className="overflow-hidden rounded-2xl bg-white shadow-xl">
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
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white text-gray-800 p-3 rounded-full shadow-lg transition-all duration-200 hover:scale-110"
                  aria-label="Previous testimonial"
                >
                  <ChevronLeft className="h-6 w-6" />
                </button>
                <button
                  onClick={goToNext}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white text-gray-800 p-3 rounded-full shadow-lg transition-all duration-200 hover:scale-110"
                  aria-label="Next testimonial"
                >
                  <ChevronRight className="h-6 w-6" />
                </button>
              </>
            )}
          </div>

          {/* Dots Navigation */}
          {featuredTestimonials.length > 1 && (
            <div className="flex justify-center mt-8 gap-2">
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
          <div className="text-center mt-12">
            <Link
              href="/testimonials"
              className="inline-flex items-center gap-2 bg-blue-600 text-white font-bold py-3 px-8 rounded-lg hover:bg-blue-700 transition-colors duration-200"
            >
              View All Testimonials
              <ExternalLink className="h-5 w-5" />
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
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center">
            <Quote className="h-24 w-24 text-white/30" />
          </div>
        )}
        
        {/* Project Type Badge */}
        <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm text-gray-800 px-3 py-1 rounded-full text-sm font-medium capitalize">
          {testimonial.projectType}
        </div>

        {/* Featured Badge */}
        {testimonial.featured && (
          <div className="absolute top-4 right-4 bg-yellow-500 text-white px-3 py-1 rounded-full text-sm font-medium flex items-center gap-1">
            <Award className="h-4 w-4" />
            Featured
          </div>
        )}
      </div>

      {/* Content Section */}
      <div className="p-8 lg:p-12 flex flex-col justify-center">
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
          <span className="ml-2 text-lg font-semibold text-gray-700">
            {testimonial.rating}/5
          </span>
        </div>

        {/* Project Title */}
        <h3 className="text-2xl font-bold text-gray-900 mb-4">
          {testimonial.projectTitle}
        </h3>

        {/* Testimonial Text */}
        <blockquote className="text-lg text-gray-700 leading-relaxed mb-6 relative">
          <Quote className="absolute -top-2 -left-2 h-8 w-8 text-blue-200" />
          <span className="pl-6 italic">
            &quot;{testimonial.testimonialText}&quot;
          </span>
        </blockquote>

        {/* Client Info */}
        <div className="flex items-center gap-4">
          {testimonial.images?.client && (
            <div className="relative w-16 h-16 rounded-full overflow-hidden">
              <Image
                src={testimonial.images.client}
                alt={testimonial.clientName}
                fill
                className="object-cover"
              />
            </div>
          )}
          <div>
            <div className="text-xl font-semibold text-gray-900">
              {testimonial.clientName}
            </div>
            <div className="flex items-center gap-4 text-gray-600">
              <div className="flex items-center gap-1">
                <MapPin className="h-4 w-4" />
                <span>{testimonial.clientLocation}</span>
              </div>
              <div className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                <span>{formatDate(testimonial.completionDate)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function CompactTestimonialsWidget({ testimonials }: { testimonials: ClientTestimonial[] }) {
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex(prev => (prev + 1) % testimonials.length)
    }, 4000)

    return () => clearInterval(interval)
  }, [testimonials.length])

  const currentTestimonial = testimonials[currentIndex]

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border">
      <div className="flex items-center gap-2 mb-4">
        <Quote className="h-5 w-5 text-blue-600" />
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
        <blockquote className="text-gray-700 italic text-sm line-clamp-3">
          &quot;{currentTestimonial.testimonialText}&quot;
        </blockquote>
      </div>

      <div className="flex items-center justify-between">
        <div>
          <div className="font-medium text-gray-900 text-sm">
            {currentTestimonial.clientName}
          </div>
          <div className="text-xs text-gray-600">
            {currentTestimonial.projectTitle}
          </div>
        </div>
        
        <Link
          href="/testimonials"
          className="text-blue-600 hover:text-blue-700 text-sm font-medium"
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
  showViewAll 
}: { 
  testimonials: ClientTestimonial[]
  title: string
  subtitle: string
  showViewAll: boolean
}) {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">{title}</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">{subtitle}</p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {testimonials.slice(0, 3).map(testimonial => (
            <div key={testimonial.id} className="bg-white rounded-lg shadow-lg overflow-hidden border hover:shadow-xl transition-shadow duration-300">
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
                <h3 className="font-bold text-gray-900 mb-2">
                  {testimonial.projectTitle}
                </h3>

                {/* Testimonial Text */}
                <blockquote className="text-gray-700 text-sm mb-4 line-clamp-3 italic">
                  &quot;{testimonial.testimonialText}&quot;
                </blockquote>

                {/* Client Info */}
                <div className="flex items-center gap-3">
                  {testimonial.images?.client && (
                    <div className="relative w-10 h-10 rounded-full overflow-hidden">
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
                    <div className="text-xs text-gray-600">
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
          <div className="text-center mt-12">
            <Link
              href="/testimonials"
              className="inline-flex items-center gap-2 bg-blue-600 text-white font-bold py-3 px-8 rounded-lg hover:bg-blue-700 transition-colors duration-200"
            >
              View All Testimonials
              <ExternalLink className="h-5 w-5" />
            </Link>
          </div>
        )}
      </div>
    </section>
  )
}