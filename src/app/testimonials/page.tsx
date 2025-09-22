'use client'

import { useState, useMemo } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Star, Quote, MapPin, Calendar, Search, Filter, ChevronLeft, ChevronRight, Trophy, Award, Briefcase, Users, TrendingUp, MessageCircle, ChevronUp, ChevronDown } from 'lucide-react'
import { formatDate } from '@/lib/utils/dateUtils'
import { mockTestimonials, getReviewStats, type ClientTestimonial, type TestimonialFilter } from '@/lib/types/testimonials'

const projectTypeOptions = [
  { value: 'all', label: 'All Projects', icon: Award },
  { value: 'residential', label: 'Residential', icon: Users },
  { value: 'commercial', label: 'Commercial', icon: TrendingUp },
  { value: 'renovation', label: 'Renovation', icon: Award },
  { value: 'emergency', label: 'Emergency', icon: MessageCircle }
]

const ratingOptions = [
  { value: 'all', label: 'All Ratings' },
  { value: '5', label: '5 Stars' },
  { value: '4', label: '4+ Stars' },
  { value: '3', label: '3+ Stars' }
]

export default function TestimonialsPage() {
  const [filters, setFilters] = useState<TestimonialFilter>({})
  const [sortBy, setSortBy] = useState<'newest' | 'oldest' | 'rating'>('newest')
  const [showFilters, setShowFilters] = useState(false)

  // Get review statistics
  const reviewStats = getReviewStats(mockTestimonials)

  // Filter testimonials
  const filteredTestimonials = useMemo(() => {
    let filtered = mockTestimonials.filter(testimonial => {
      // Only show approved and featured testimonials
      if (testimonial.status !== 'approved' && testimonial.status !== 'featured') {
        return false
      }

      // Project type filter
      if (filters.projectType && filters.projectType.length > 0 && !filters.projectType.includes('all')) {
        if (!filters.projectType.includes(testimonial.projectType)) {
          return false
        }
      }

      // Rating filter
      if (filters.rating && filters.rating.length > 0) {
        const minRating = Math.min(...filters.rating)
        if (testimonial.rating < minRating) {
          return false
        }
      }

      // Search term filter
      if (filters.searchTerm) {
        const searchLower = filters.searchTerm.toLowerCase()
        if (!testimonial.clientName.toLowerCase().includes(searchLower) &&
            !testimonial.projectTitle.toLowerCase().includes(searchLower) &&
            !testimonial.testimonialText.toLowerCase().includes(searchLower) &&
            !testimonial.tags.some(tag => tag.toLowerCase().includes(searchLower))) {
          return false
        }
      }

      // Featured filter
      if (filters.featured !== undefined) {
        if (testimonial.featured !== filters.featured) {
          return false
        }
      }

      return true
    })

    // Sort testimonials
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'newest':
          return new Date(b.submissionDate).getTime() - new Date(a.submissionDate).getTime()
        case 'oldest':
          return new Date(a.submissionDate).getTime() - new Date(b.submissionDate).getTime()
        case 'rating':
          return b.rating - a.rating
        default:
          return 0
      }
    })

    return filtered
  }, [filters, sortBy])

  const featuredTestimonials = filteredTestimonials.filter(t => t.featured)
  const regularTestimonials = filteredTestimonials.filter(t => !t.featured)

  const updateFilter = (key: keyof TestimonialFilter, value: any) => {
    setFilters(prev => ({ ...prev, [key]: value }))
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-900 to-blue-700 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl font-bold mb-6">
              Client Testimonials & Reviews
            </h1>
            <p className="text-xl text-blue-100 mb-8">
              See what our clients say about working with MH Construction. 
              Read real testimonials from satisfied customers across the Pacific Northwest.
            </p>
            
            {/* Review Statistics */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-8">
              <div className="bg-white/10 rounded-lg p-4 backdrop-blur-sm">
                <div className="text-3xl font-bold text-white">{reviewStats.totalReviews}</div>
                <div className="text-blue-100 text-sm">Total Reviews</div>
              </div>
              <div className="bg-white/10 rounded-lg p-4 backdrop-blur-sm">
                <div className="flex items-center justify-center gap-1 mb-1">
                  <span className="text-3xl font-bold text-white">{reviewStats.averageRating}</span>
                  <Star className="h-6 w-6 fill-yellow-400 text-yellow-400" />
                </div>
                <div className="text-blue-100 text-sm">Average Rating</div>
              </div>
              <div className="bg-white/10 rounded-lg p-4 backdrop-blur-sm">
                <div className="text-3xl font-bold text-white">{reviewStats.featuredReviews}</div>
                <div className="text-blue-100 text-sm">Featured Reviews</div>
              </div>
              <div className="bg-white/10 rounded-lg p-4 backdrop-blur-sm">
                <div className="text-3xl font-bold text-white">{reviewStats.recentReviews}</div>
                <div className="text-blue-100 text-sm">Recent (30 days)</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12">
        {/* Search and Filters */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-4">
              <Filter className="h-5 w-5 text-blue-600" />
              <h3 className="text-lg font-semibold text-gray-900">Filter Testimonials</h3>
            </div>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 text-blue-600 hover:text-blue-700 transition-colors"
            >
              {showFilters ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
              {showFilters ? 'Hide Filters' : 'Show Filters'}
            </button>
          </div>

          {/* Search Bar */}
          <div className="mb-4">
            <input
              type="text"
              placeholder="Search testimonials by client name, project, or keywords..."
              value={filters.searchTerm || ''}
              onChange={(e) => updateFilter('searchTerm', e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {showFilters && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Project Type Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Project Type
                </label>
                <select
                  value={filters.projectType?.[0] || 'all'}
                  onChange={(e) => updateFilter('projectType', e.target.value === 'all' ? [] : [e.target.value])}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  {projectTypeOptions.map(option => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Rating Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Minimum Rating
                </label>
                <select
                  value={filters.rating?.[0] || 'all'}
                  onChange={(e) => updateFilter('rating', e.target.value === 'all' ? [] : [parseInt(e.target.value)])}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  {ratingOptions.map(option => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Sort By */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Sort By
                </label>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as 'newest' | 'oldest' | 'rating')}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="newest">Newest First</option>
                  <option value="oldest">Oldest First</option>
                  <option value="rating">Highest Rating</option>
                </select>
              </div>
            </div>
          )}

          {/* Quick Filters */}
          <div className="flex flex-wrap gap-2 mt-4">
            <button
              onClick={() => updateFilter('featured', true)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                filters.featured === true
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Featured Only
            </button>
            <button
              onClick={() => updateFilter('rating', [5])}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                filters.rating?.includes(5)
                  ? 'bg-yellow-500 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              5 Star Reviews
            </button>
            <button
              onClick={() => setFilters({})}
              className="px-4 py-2 rounded-lg text-sm font-medium bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors"
            >
              Clear All Filters
            </button>
          </div>
        </div>

        {/* Results Summary */}
        <div className="mb-6">
          <p className="text-gray-600">
            Showing {filteredTestimonials.length} testimonial{filteredTestimonials.length !== 1 ? 's' : ''}
            {filters.searchTerm && ` for &quot;${filters.searchTerm}&quot;`}
          </p>
        </div>

        {/* Featured Testimonials */}
        {featuredTestimonials.length > 0 && (
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <Award className="h-6 w-6 text-yellow-500" />
              Featured Testimonials
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {featuredTestimonials.map(testimonial => (
                <FeaturedTestimonialCard key={testimonial.id} testimonial={testimonial} />
              ))}
            </div>
          </div>
        )}

        {/* Regular Testimonials */}
        {regularTestimonials.length > 0 && (
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              {featuredTestimonials.length > 0 ? 'All Testimonials' : 'Client Testimonials'}
            </h2>
            <div className="space-y-8">
              {regularTestimonials.map(testimonial => (
                <RegularTestimonialCard key={testimonial.id} testimonial={testimonial} />
              ))}
            </div>
          </div>
        )}

        {/* No Results */}
        {filteredTestimonials.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <MessageCircle className="h-16 w-16 mx-auto" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No testimonials found</h3>
            <p className="text-gray-600 mb-4">
              Try adjusting your filters or search terms to find testimonials.
            </p>
            <button
              onClick={() => setFilters({})}
              className="text-blue-600 hover:text-blue-700 font-medium"
            >
              Clear all filters
            </button>
          </div>
        )}

        {/* Call to Action */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg shadow-lg p-8 mt-12 text-white text-center">
          <h3 className="text-2xl font-bold mb-4">Ready to Join Our Satisfied Clients?</h3>
          <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
            Experience the same quality construction and exceptional service that our clients rave about. 
            Get your free consultation today and see why MH Construction is the Pacific Northwest&apos;s trusted choice.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="bg-white text-blue-600 font-bold py-3 px-8 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Get Free Consultation
            </Link>
            <Link
              href="/projects"
              className="border-2 border-white text-white font-bold py-3 px-8 rounded-lg hover:bg-white hover:text-blue-600 transition-colors"
            >
              View Our Projects
            </Link>
          </div>
        </div>

        {/* Submit Testimonial CTA */}
        <div className="bg-gradient-to-r from-green-600 to-green-700 rounded-lg shadow-lg p-8 mt-8 text-white text-center">
          <h3 className="text-2xl font-bold mb-4">Worked with MH Construction?</h3>
          <p className="text-green-100 mb-6 max-w-2xl mx-auto">
            Share your experience and help others discover the quality and professionalism of our construction services. 
            Your testimonial makes a difference!
          </p>
          <Link
            href="/testimonials/submit"
            className="bg-white text-green-600 font-bold py-3 px-8 rounded-lg hover:bg-gray-50 transition-colors inline-flex items-center gap-2"
          >
            <MessageCircle className="h-5 w-5" />
            Submit Your Testimonial
          </Link>
        </div>
      </div>
    </div>
  )
}

function FeaturedTestimonialCard({ testimonial }: { testimonial: ClientTestimonial }) {
  const [showDetails, setShowDetails] = useState(false)

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden border-2 border-yellow-200">
      <div className="p-6">
        {/* Featured Badge */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2 px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm font-medium">
            <Award className="h-4 w-4" />
            Featured Review
          </div>
          <div className="flex items-center gap-1">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`h-5 w-5 ${
                  i < testimonial.rating
                    ? 'fill-yellow-400 text-yellow-400'
                    : 'text-gray-300'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Project Info */}
        <div className="mb-4">
          <h3 className="text-xl font-bold text-gray-900 mb-2">{testimonial.projectTitle}</h3>
          <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
            <div className="flex items-center gap-1">
              <Users className="h-4 w-4" />
              <span className="capitalize">{testimonial.projectType}</span>
            </div>
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

        {/* Testimonial Text */}
        <div className="relative mb-4">
          <Quote className="absolute -top-2 -left-2 h-8 w-8 text-blue-200" />
          <blockquote className="pl-6 text-gray-700 italic leading-relaxed">
            &quot;{testimonial.testimonialText}&quot;
          </blockquote>
        </div>

        {/* Client Info */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            {testimonial.images?.client && (
              <div className="relative w-12 h-12 rounded-full overflow-hidden">
                <Image
                  src={testimonial.images.client}
                  alt={testimonial.clientName}
                  fill
                  className="object-cover"
                />
              </div>
            )}
            <div>
              <div className="font-semibold text-gray-900">{testimonial.clientName}</div>
              <div className="text-sm text-gray-600">{testimonial.clientLocation}</div>
            </div>
          </div>
          
          <button
            onClick={() => setShowDetails(!showDetails)}
            className="text-blue-600 hover:text-blue-700 text-sm font-medium"
          >
            {showDetails ? 'Hide Details' : 'View Details'}
          </button>
        </div>

        {/* Expandable Details */}
        {showDetails && (
          <div className="mt-6 pt-6 border-t border-gray-200">
            {testimonial.projectDetails && (
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Project Highlights</h4>
                  <ul className="space-y-1">
                    {testimonial.projectDetails.highlights.map((highlight, index) => (
                      <li key={index} className="flex items-start gap-2 text-sm text-gray-700">
                        <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                        {highlight}
                      </li>
                    ))}
                  </ul>
                </div>
                
                {testimonial.projectValue && (
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Project Value:</span>
                    <span className="font-semibold text-gray-900">{testimonial.projectValue}</span>
                  </div>
                )}
                
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Duration:</span>
                  <span className="font-semibold text-gray-900">{testimonial.projectDetails.duration}</span>
                </div>

                {testimonial.responseFromCompany && (
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <div className="text-sm font-semibold text-blue-900 mb-1">Response from MH Construction:</div>
                    <div className="text-sm text-blue-800 italic">{testimonial.responseFromCompany}</div>
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

function RegularTestimonialCard({ testimonial }: { testimonial: ClientTestimonial }) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <div className="md:flex">
        {/* Image Section */}
        {testimonial.images?.after && testimonial.images.after[0] && (
          <div className="md:w-1/3">
            <div className="relative h-48 md:h-full overflow-hidden">
              <Image
                src={testimonial.images.after[0]}
                alt={`${testimonial.projectTitle} - After`}
                fill
                className="object-cover"
              />
            </div>
          </div>
        )}
        
        {/* Content Section */}
        <div className="md:w-2/3 p-6">
          {/* Rating and Project Type */}
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-1">
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
            <span className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full capitalize">
              {testimonial.projectType}
            </span>
          </div>

          {/* Project Title */}
          <h3 className="text-lg font-bold text-gray-900 mb-2">{testimonial.projectTitle}</h3>
          
          {/* Testimonial Text */}
          <blockquote className="text-gray-700 mb-4 line-clamp-3">
            &quot;{testimonial.testimonialText}&quot;
          </blockquote>
          
          {/* Client and Project Info */}
          <div className="flex items-center justify-between text-sm text-gray-600">
            <div>
              <div className="font-semibold text-gray-900">{testimonial.clientName}</div>
              <div className="flex items-center gap-1">
                <MapPin className="h-3 w-3" />
                <span>{testimonial.clientLocation}</span>
              </div>
            </div>
            <div className="text-right">
              <div className="flex items-center gap-1">
                <Calendar className="h-3 w-3" />
                <span>{formatDate(testimonial.completionDate)}</span>
              </div>
              {testimonial.projectValue && (
                <div className="font-semibold text-gray-900">{testimonial.projectValue}</div>
              )}
            </div>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mt-4">
            {testimonial.tags.slice(0, 3).map(tag => (
              <span 
                key={tag}
                className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}