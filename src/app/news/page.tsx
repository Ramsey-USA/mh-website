'use client'

import { useState } from 'react'
import Image from 'next/image'
import {
  Calendar,
  AlertCircle,
  Users,
  Building,
  TrendingUp,
  Filter,
} from 'lucide-react'

// Mock data for company news
const mockNews = [
  {
    id: 'veteran-hiring-initiative-2024',
    title: 'MH Construction Launches Veteran Hiring Initiative',
    content:
      'We are proud to announce our new veteran hiring initiative, aimed at providing employment opportunities for transitioning service members and veteran families in the Pacific Northwest. This program includes skills training, mentorship, and career development pathways.',
    date: '2024-12-15',
    type: 'company' as const,
    priority: 'high' as const,
    author: 'Mark Harris',
    images: ['/images/news/veteran-hiring.jpg'],
    featured: true,
  },
  {
    id: 'winter-construction-safety-program',
    title: 'Enhanced Winter Safety Protocols Implemented',
    content:
      'As we enter the Pacific Northwest winter season, MH Construction has implemented enhanced safety protocols to protect our team and ensure project continuity. These measures include advanced weather monitoring, improved site preparation, and additional safety equipment.',
    date: '2024-12-10',
    type: 'company' as const,
    priority: 'medium' as const,
    author: 'Sarah Harris',
    images: ['/images/news/winter-safety.jpg'],
    featured: false,
  },
  {
    id: 'sustainable-building-certification',
    title: 'MH Construction Achieves Green Building Certification',
    content:
      'We are excited to announce that MH Construction has achieved certification in sustainable building practices. This certification demonstrates our commitment to environmentally responsible construction and energy-efficient building solutions for our clients.',
    date: '2024-12-05',
    type: 'company' as const,
    priority: 'high' as const,
    author: 'Jim Rodriguez',
    images: ['/images/news/green-certification.jpg'],
    featured: true,
  },
  {
    id: 'community-habitat-partnership',
    title: 'Partnership with Habitat for Humanity Announced',
    content:
      'MH Construction is proud to partner with Habitat for Humanity Tri-Cities to build homes for deserving families in our community. Our veteran team will contribute construction expertise and volunteer hours to support this important cause.',
    date: '2024-11-28',
    type: 'community' as const,
    priority: 'medium' as const,
    author: 'Mark Harris',
    images: ['/images/news/habitat-partnership.jpg'],
    featured: false,
  },
  {
    id: 'team-expansion-announcement',
    title: 'MH Construction Team Grows with New Hires',
    content:
      'We welcome three new team members to the MH Construction family: two veteran carpenters and one project coordinator. Our growing team allows us to take on more projects while maintaining our high standards of quality and service.',
    date: '2024-11-20',
    type: 'team' as const,
    priority: 'low' as const,
    author: 'Sarah Harris',
    images: ['/images/news/team-expansion.jpg'],
    featured: false,
  },
  {
    id: 'industry-safety-award',
    title: 'MH Construction Receives Safety Excellence Award',
    content:
      'The Construction Industry Safety Association has recognized MH Construction with their Safety Excellence Award for outstanding safety performance and zero workplace incidents over the past 12 months.',
    date: '2024-11-15',
    type: 'industry' as const,
    priority: 'high' as const,
    author: 'Mark Harris',
    images: ['/images/news/safety-award.jpg'],
    featured: true,
  },
]

const newsTypes = [
  {
    id: 'all',
    name: 'All Updates',
    icon: TrendingUp,
    color: 'bg-gray-100 text-gray-800',
  },
  {
    id: 'company',
    name: 'Company News',
    icon: Building,
    color: 'bg-blue-100 text-blue-800',
  },
  {
    id: 'project',
    name: 'Project Updates',
    icon: AlertCircle,
    color: 'bg-green-100 text-green-800',
  },
  {
    id: 'team',
    name: 'Team News',
    icon: Users,
    color: 'bg-purple-100 text-purple-800',
  },
  {
    id: 'industry',
    name: 'Industry News',
    icon: TrendingUp,
    color: 'bg-orange-100 text-orange-800',
  },
  {
    id: 'community',
    name: 'Community',
    icon: Users,
    color: 'bg-pink-100 text-pink-800',
  },
]

const priorityColors = {
  low: 'bg-gray-100 text-gray-800',
  medium: 'bg-yellow-100 text-yellow-800',
  high: 'bg-red-100 text-red-800',
}

export default function NewsPage() {
  const [selectedType, setSelectedType] = useState('all')
  const [selectedPriority, setSelectedPriority] = useState('all')

  const filteredNews = mockNews.filter(item => {
    const matchesType = selectedType === 'all' || item.type === selectedType
    const matchesPriority =
      selectedPriority === 'all' || item.priority === selectedPriority
    return matchesType && matchesPriority
  })

  const featuredNews = filteredNews.filter(item => item.featured)
  const regularNews = filteredNews.filter(item => !item.featured)

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-900 to-blue-700 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl font-bold mb-6">Company News & Updates</h1>
            <p className="text-xl text-blue-100 mb-8">
              Stay informed about the latest news, updates, and developments
              from MH Construction and our veteran team.
            </p>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12">
        {/* Filter Controls */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="flex items-center gap-4 mb-4">
            <Filter className="h-5 w-5 text-blue-600" />
            <h3 className="text-lg font-semibold text-gray-900">
              Filter Updates
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Type Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Update Type
              </label>
              <div className="flex flex-wrap gap-2">
                {newsTypes.map(type => {
                  const Icon = type.icon
                  return (
                    <button
                      key={type.id}
                      onClick={() => setSelectedType(type.id)}
                      className={`inline-flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                        selectedType === type.id
                          ? 'bg-blue-600 text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      <Icon className="h-4 w-4 mr-2" />
                      {type.name}
                    </button>
                  )
                })}
              </div>
            </div>

            {/* Priority Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Priority Level
              </label>
              <div className="flex gap-2">
                {['all', 'high', 'medium', 'low'].map(priority => (
                  <button
                    key={priority}
                    onClick={() => setSelectedPriority(priority)}
                    className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                      selectedPriority === priority
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {priority === 'all'
                      ? 'All Priorities'
                      : `${priority.charAt(0).toUpperCase() + priority.slice(1)} Priority`}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Results Summary */}
        <div className="mb-6">
          <p className="text-gray-600">
            Showing {filteredNews.length} update
            {filteredNews.length !== 1 ? 's' : ''}
          </p>
        </div>

        {/* Featured News */}
        {featuredNews.length > 0 && (
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Featured Updates
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {featuredNews.map(item => (
                <FeaturedNewsCard key={item.id} news={item} />
              ))}
            </div>
          </div>
        )}

        {/* Regular News */}
        {regularNews.length > 0 && (
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              {featuredNews.length > 0 ? 'Recent Updates' : 'All Updates'}
            </h2>
            <div className="space-y-6">
              {regularNews.map(item => (
                <RegularNewsCard key={item.id} news={item} />
              ))}
            </div>
          </div>
        )}

        {/* No Results */}
        {filteredNews.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <TrendingUp className="h-16 w-16 mx-auto" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              No updates found
            </h3>
            <p className="text-gray-600 mb-4">
              Try adjusting your filters to find what you&apos;re looking for.
            </p>
            <button
              onClick={() => {
                setSelectedType('all')
                setSelectedPriority('all')
              }}
              className="text-blue-600 hover:text-blue-700 font-medium"
            >
              Clear all filters
            </button>
          </div>
        )}

        {/* Newsletter Signup */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg shadow-lg p-8 mt-12 text-white text-center">
          <h3 className="text-2xl font-bold mb-4">Stay Updated</h3>
          <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
            Subscribe to our newsletter to receive the latest company news,
            project updates, and construction insights directly to your inbox.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Your email address"
              className="flex-1 px-4 py-3 text-gray-900 rounded-lg border-0 focus:ring-2 focus:ring-blue-300"
            />
            <button className="bg-white text-blue-600 font-bold py-3 px-6 rounded-lg hover:bg-gray-50 transition-colors whitespace-nowrap">
              Subscribe
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

function FeaturedNewsCard({ news }: { news: (typeof mockNews)[0] }) {
  const typeInfo = newsTypes.find(t => t.id === news.type) || newsTypes[1]
  const Icon = typeInfo.icon

  return (
    <article className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
      {news.images && news.images[0] && (
        <div className="relative h-48 overflow-hidden">
          <Image
            src={news.images[0]}
            alt={news.title}
            fill
            className="object-cover"
          />
          <div className="absolute top-4 left-4 flex gap-2">
            <span
              className={`px-3 py-1 rounded-full text-sm font-medium ${typeInfo.color}`}
            >
              <Icon className="h-4 w-4 inline mr-1" />
              {typeInfo.name}
            </span>
            <span
              className={`px-3 py-1 rounded-full text-sm font-medium ${priorityColors[news.priority]}`}
            >
              {news.priority.charAt(0).toUpperCase() + news.priority.slice(1)}{' '}
              Priority
            </span>
          </div>
        </div>
      )}

      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-3">{news.title}</h3>

        <p className="text-gray-600 mb-4 line-clamp-3">{news.content}</p>

        <div className="flex items-center justify-between text-sm text-gray-500">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1">
              <Calendar className="h-4 w-4" />
              <span>{new Date(news.date).toLocaleDateString()}</span>
            </div>
            <span>By {news.author}</span>
          </div>
        </div>
      </div>
    </article>
  )
}

function RegularNewsCard({ news }: { news: (typeof mockNews)[0] }) {
  const typeInfo = newsTypes.find(t => t.id === news.type) || newsTypes[1]
  const Icon = typeInfo.icon

  return (
    <article className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <div className="md:flex">
        {news.images && news.images[0] && (
          <div className="md:w-1/4">
            <div className="relative h-48 md:h-full overflow-hidden">
              <Image
                src={news.images[0]}
                alt={news.title}
                fill
                className="object-cover"
              />
            </div>
          </div>
        )}

        <div className="md:w-3/4 p-6">
          <div className="flex items-center gap-2 mb-3">
            <span
              className={`px-2 py-1 rounded-full text-xs font-medium ${typeInfo.color}`}
            >
              <Icon className="h-3 w-3 inline mr-1" />
              {typeInfo.name}
            </span>
            <span
              className={`px-2 py-1 rounded-full text-xs font-medium ${priorityColors[news.priority]}`}
            >
              {news.priority.charAt(0).toUpperCase() + news.priority.slice(1)}
            </span>
          </div>

          <h3 className="text-xl font-bold text-gray-900 mb-3">{news.title}</h3>

          <p className="text-gray-600 mb-4">{news.content}</p>

          <div className="flex items-center justify-between text-sm text-gray-500">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                <span>{new Date(news.date).toLocaleDateString()}</span>
              </div>
              <span>By {news.author}</span>
            </div>
          </div>
        </div>
      </div>
    </article>
  )
}
