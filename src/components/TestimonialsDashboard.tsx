'use client'

import { useState, useMemo } from 'react'
import Image from 'next/image'
import { Star, Eye, Edit3, Trash2, Check, X, Filter, Search, Calendar, MapPin, Users, Award, MessageCircle, TrendingUp, AlertCircle, ChevronDown, ChevronUp } from 'lucide-react'
import { ClientTestimonial, TestimonialStatus, mockTestimonials, getReviewStats } from '@/lib/types/testimonials'
import { formatDate } from '@/lib/utils/dateUtils'

type SortOption = 'newest' | 'oldest' | 'rating' | 'status'

const statusColors = {
  pending: 'bg-yellow-100 text-yellow-800 border-yellow-200',
  approved: 'bg-green-100 text-green-800 border-green-200',
  rejected: 'bg-red-100 text-red-800 border-red-200',
  featured: 'bg-blue-100 text-blue-800 border-blue-200'
}

const statusIcons = {
  pending: AlertCircle,
  approved: Check,
  rejected: X,
  featured: Award
}

export default function TestimonialsDashboard() {
  const [selectedTestimonials, setSelectedTestimonials] = useState<string[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState<TestimonialStatus | 'all'>('all')
  const [sortBy, setSortBy] = useState<SortOption>('newest')
  const [showFilters, setShowFilters] = useState(false)
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('list')

  // Get review statistics
  const reviewStats = getReviewStats(mockTestimonials)

  // Status statistics
  const statusStats = {
    pending: mockTestimonials.filter(t => t.status === 'pending').length,
    approved: mockTestimonials.filter(t => t.status === 'approved').length,
    rejected: mockTestimonials.filter(t => t.status === 'rejected').length,
    featured: mockTestimonials.filter(t => t.status === 'featured').length
  }

  // Filter and sort testimonials
  const filteredTestimonials = useMemo(() => {
    let filtered = mockTestimonials.filter(testimonial => {
      // Search filter
      if (searchTerm) {
        const search = searchTerm.toLowerCase()
        if (!testimonial.clientName.toLowerCase().includes(search) &&
            !testimonial.projectTitle.toLowerCase().includes(search) &&
            !testimonial.testimonialText.toLowerCase().includes(search) &&
            !testimonial.clientLocation.toLowerCase().includes(search) &&
            !testimonial.tags.some(tag => tag.toLowerCase().includes(search))) {
          return false
        }
      }

      // Status filter
      if (statusFilter !== 'all' && testimonial.status !== statusFilter) {
        return false
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
        case 'status':
          const statusOrder = { pending: 0, featured: 1, approved: 2, rejected: 3 }
          return statusOrder[a.status] - statusOrder[b.status]
        default:
          return 0
      }
    })

    return filtered
  }, [searchTerm, statusFilter, sortBy])

  const handleSelectAll = () => {
    if (selectedTestimonials.length === filteredTestimonials.length) {
      setSelectedTestimonials([])
    } else {
      setSelectedTestimonials(filteredTestimonials.map(t => t.id))
    }
  }

  const handleSelectTestimonial = (id: string) => {
    setSelectedTestimonials(prev => 
      prev.includes(id) 
        ? prev.filter(tid => tid !== id)
        : [...prev, id]
    )
  }

  const handleBulkAction = (action: 'approve' | 'reject' | 'feature' | 'delete') => {
    // In a real app, this would make API calls
    console.log(`Bulk ${action} action for testimonials:`, selectedTestimonials)
    setSelectedTestimonials([])
  }

  const handleStatusChange = (testimonialId: string, newStatus: TestimonialStatus) => {
    // In a real app, this would make an API call
    console.log(`Changing testimonial ${testimonialId} status to ${newStatus}`)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Testimonials Dashboard</h1>
              <p className="text-gray-600 mt-1">Manage client testimonials and reviews</p>
            </div>
            <div className="flex items-center gap-4">
              <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium">
                Add Testimonial
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Reviews</p>
                <p className="text-3xl font-bold text-gray-900">{reviewStats.totalReviews}</p>
              </div>
              <MessageCircle className="h-8 w-8 text-blue-500" />
            </div>
            <div className="mt-4 flex items-center text-sm text-green-600">
              <TrendingUp className="h-4 w-4 mr-1" />
              <span>+{reviewStats.recentReviews} this month</span>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Average Rating</p>
                <div className="flex items-center gap-2">
                  <p className="text-3xl font-bold text-gray-900">{reviewStats.averageRating}</p>
                  <Star className="h-6 w-6 fill-yellow-400 text-yellow-400" />
                </div>
              </div>
              <Award className="h-8 w-8 text-yellow-500" />
            </div>
            <div className="mt-4 text-sm text-gray-600">
              Based on {reviewStats.totalReviews} reviews
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Pending Review</p>
                <p className="text-3xl font-bold text-yellow-600">{statusStats.pending}</p>
              </div>
              <AlertCircle className="h-8 w-8 text-yellow-500" />
            </div>
            <div className="mt-4 text-sm text-yellow-600">
              Need approval
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Featured</p>
                <p className="text-3xl font-bold text-blue-600">{statusStats.featured}</p>
              </div>
              <Award className="h-8 w-8 text-blue-500" />
            </div>
            <div className="mt-4 text-sm text-blue-600">
              Highlighted reviews
            </div>
          </div>
        </div>

        {/* Filters and Search */}
        <div className="bg-white rounded-lg shadow-sm border p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Filter & Search</h3>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 text-blue-600 hover:text-blue-700 transition-colors"
            >
              <Filter className="h-4 w-4" />
              {showFilters ? 'Hide Filters' : 'Show Filters'}
              {showFilters ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
            </button>
          </div>

          {/* Search */}
          <div className="relative mb-4">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search testimonials by client, project, content..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {showFilters && (
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {/* Status Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value as TestimonialStatus | 'all')}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="all">All Status</option>
                  <option value="pending">Pending</option>
                  <option value="approved">Approved</option>
                  <option value="featured">Featured</option>
                  <option value="rejected">Rejected</option>
                </select>
              </div>

              {/* Sort By */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Sort By</label>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as SortOption)}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="newest">Newest First</option>
                  <option value="oldest">Oldest First</option>
                  <option value="rating">Highest Rating</option>
                  <option value="status">By Status</option>
                </select>
              </div>

              {/* View Mode */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">View Mode</label>
                <div className="flex gap-2">
                  <button
                    onClick={() => setViewMode('list')}
                    className={`flex-1 py-2 px-3 rounded-lg text-sm font-medium transition-colors ${
                      viewMode === 'list'
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    List
                  </button>
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`flex-1 py-2 px-3 rounded-lg text-sm font-medium transition-colors ${
                      viewMode === 'grid'
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    Grid
                  </button>
                </div>
              </div>

              {/* Clear Filters */}
              <div className="flex items-end">
                <button
                  onClick={() => {
                    setSearchTerm('')
                    setStatusFilter('all')
                    setSortBy('newest')
                  }}
                  className="w-full py-2 px-4 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors text-sm font-medium"
                >
                  Clear Filters
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Bulk Actions */}
        {selectedTestimonials.length > 0 && (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <span className="text-sm text-blue-900 font-medium">
                  {selectedTestimonials.length} testimonial{selectedTestimonials.length > 1 ? 's' : ''} selected
                </span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleBulkAction('approve')}
                  className="bg-green-600 text-white px-3 py-1 rounded text-sm hover:bg-green-700 transition-colors"
                >
                  Approve
                </button>
                <button
                  onClick={() => handleBulkAction('feature')}
                  className="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700 transition-colors"
                >
                  Feature
                </button>
                <button
                  onClick={() => handleBulkAction('reject')}
                  className="bg-red-600 text-white px-3 py-1 rounded text-sm hover:bg-red-700 transition-colors"
                >
                  Reject
                </button>
                <button
                  onClick={() => handleBulkAction('delete')}
                  className="bg-gray-600 text-white px-3 py-1 rounded text-sm hover:bg-gray-700 transition-colors"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Results Summary */}
        <div className="flex items-center justify-between mb-6">
          <p className="text-gray-600">
            Showing {filteredTestimonials.length} of {mockTestimonials.length} testimonials
          </p>
          <div className="flex items-center gap-4">
            <label className="flex items-center gap-2 text-sm text-gray-600">
              <input
                type="checkbox"
                checked={selectedTestimonials.length === filteredTestimonials.length && filteredTestimonials.length > 0}
                onChange={handleSelectAll}
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              Select All
            </label>
          </div>
        </div>

        {/* Testimonials List/Grid */}
        {viewMode === 'list' ? (
          <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      <input
                        type="checkbox"
                        checked={selectedTestimonials.length === filteredTestimonials.length && filteredTestimonials.length > 0}
                        onChange={handleSelectAll}
                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Client & Project
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Rating
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Submitted
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredTestimonials.map(testimonial => (
                    <TestimonialRow
                      key={testimonial.id}
                      testimonial={testimonial}
                      selected={selectedTestimonials.includes(testimonial.id)}
                      onSelect={() => handleSelectTestimonial(testimonial.id)}
                      onStatusChange={(status) => handleStatusChange(testimonial.id, status)}
                    />
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTestimonials.map(testimonial => (
              <TestimonialCard
                key={testimonial.id}
                testimonial={testimonial}
                selected={selectedTestimonials.includes(testimonial.id)}
                onSelect={() => handleSelectTestimonial(testimonial.id)}
                onStatusChange={(status) => handleStatusChange(testimonial.id, status)}
              />
            ))}
          </div>
        )}

        {/* No Results */}
        {filteredTestimonials.length === 0 && (
          <div className="text-center py-12">
            <MessageCircle className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No testimonials found</h3>
            <p className="text-gray-600">
              {searchTerm || statusFilter !== 'all' 
                ? 'Try adjusting your filters or search terms.'
                : 'No testimonials have been submitted yet.'
              }
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

function TestimonialRow({ 
  testimonial, 
  selected, 
  onSelect, 
  onStatusChange 
}: { 
  testimonial: ClientTestimonial
  selected: boolean
  onSelect: () => void
  onStatusChange: (status: TestimonialStatus) => void
}) {
  const StatusIcon = statusIcons[testimonial.status]

  return (
    <tr className={`hover:bg-gray-50 ${selected ? 'bg-blue-50' : ''}`}>
      <td className="px-6 py-4 whitespace-nowrap">
        <input
          type="checkbox"
          checked={selected}
          onChange={onSelect}
          className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
        />
      </td>
      <td className="px-6 py-4">
        <div className="flex items-start gap-3">
          {testimonial.images?.client && (
            <div className="relative w-10 h-10 rounded-full overflow-hidden flex-shrink-0">
              <Image
                src={testimonial.images.client}
                alt={testimonial.clientName}
                fill
                className="object-cover"
              />
            </div>
          )}
          <div className="min-w-0 flex-1">
            <div className="font-medium text-gray-900">{testimonial.clientName}</div>
            <div className="text-sm text-gray-600 truncate">{testimonial.projectTitle}</div>
            <div className="flex items-center gap-2 text-xs text-gray-500 mt-1">
              <MapPin className="h-3 w-3" />
              <span>{testimonial.clientLocation}</span>
              <span>•</span>
              <span className="capitalize">{testimonial.projectType}</span>
            </div>
          </div>
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
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
          <span className="ml-1 text-sm text-gray-600">({testimonial.rating})</span>
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium border ${statusColors[testimonial.status]}`}>
          <StatusIcon className="h-3 w-3" />
          <span className="capitalize">{testimonial.status}</span>
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
        <div className="flex items-center gap-1">
          <Calendar className="h-3 w-3" />
          <span>{formatDate(testimonial.submissionDate)}</span>
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="flex items-center gap-2">
          <button className="text-blue-600 hover:text-blue-700 p-1" title="View Details">
            <Eye className="h-4 w-4" />
          </button>
          <button className="text-gray-600 hover:text-gray-700 p-1" title="Edit">
            <Edit3 className="h-4 w-4" />
          </button>
          <select
            value={testimonial.status}
            onChange={(e) => onStatusChange(e.target.value as TestimonialStatus)}
            className="text-xs border border-gray-300 rounded px-2 py-1 focus:ring-1 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="pending">Pending</option>
            <option value="approved">Approved</option>
            <option value="featured">Featured</option>
            <option value="rejected">Rejected</option>
          </select>
        </div>
      </td>
    </tr>
  )
}

function TestimonialCard({ 
  testimonial, 
  selected, 
  onSelect, 
  onStatusChange 
}: { 
  testimonial: ClientTestimonial
  selected: boolean
  onSelect: () => void
  onStatusChange: (status: TestimonialStatus) => void
}) {
  const StatusIcon = statusIcons[testimonial.status]

  return (
    <div className={`bg-white rounded-lg shadow-sm border p-6 ${selected ? 'ring-2 ring-blue-500' : ''}`}>
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <input
            type="checkbox"
            checked={selected}
            onChange={onSelect}
            className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
          />
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
            <div className="font-medium text-gray-900">{testimonial.clientName}</div>
            <div className="text-sm text-gray-600">{testimonial.clientLocation}</div>
          </div>
        </div>
        <div className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium border ${statusColors[testimonial.status]}`}>
          <StatusIcon className="h-3 w-3" />
          <span className="capitalize">{testimonial.status}</span>
        </div>
      </div>

      {/* Project Info */}
      <div className="mb-4">
        <h3 className="font-semibold text-gray-900 mb-2">{testimonial.projectTitle}</h3>
        <div className="flex items-center gap-4 text-sm text-gray-600 mb-2">
          <span className="capitalize">{testimonial.projectType}</span>
          <span>•</span>
          <span>{formatDate(testimonial.completionDate)}</span>
        </div>
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
          <span className="ml-1 text-sm text-gray-600">({testimonial.rating})</span>
        </div>
      </div>

      {/* Testimonial Text */}
      <blockquote className="text-sm text-gray-700 mb-4 line-clamp-3 italic">
        &quot;{testimonial.testimonialText}&quot;
      </blockquote>

      {/* Actions */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <button className="text-blue-600 hover:text-blue-700 p-1" title="View Details">
            <Eye className="h-4 w-4" />
          </button>
          <button className="text-gray-600 hover:text-gray-700 p-1" title="Edit">
            <Edit3 className="h-4 w-4" />
          </button>
          <button className="text-red-600 hover:text-red-700 p-1" title="Delete">
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
        <select
          value={testimonial.status}
          onChange={(e) => onStatusChange(e.target.value as TestimonialStatus)}
          className="text-xs border border-gray-300 rounded px-2 py-1 focus:ring-1 focus:ring-blue-500 focus:border-transparent"
        >
          <option value="pending">Pending</option>
          <option value="approved">Approved</option>
          <option value="featured">Featured</option>
          <option value="rejected">Rejected</option>
        </select>
      </div>
    </div>
  )
}