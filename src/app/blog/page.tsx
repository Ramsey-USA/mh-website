'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import {
  CalendarDays,
  Clock,
  User2,
  Tags,
  Search,
  Filter,
  ArrowRight,
  Wrench,
  Home,
  Megaphone,
  Flag,
  BookOpen,
} from 'lucide-react'
import {
  mockBlogPosts,
  mockBlogCategories,
  type BlogPost,
  type BlogCategory,
} from '@/lib/types/blog'
import { Button } from '@/components/ui/Button'
import {
  FadeInWhenVisible,
  StaggeredFadeIn,
  HoverScale,
} from '@/components/animations/FramerMotionComponents'

// Enhanced Featured Post Card with MH Branding
const MHFeaturedPostCard = ({ post }: { post: BlogPost }) => (
  <HoverScale>
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="group relative bg-white dark:bg-gray-800 shadow-xl rounded-2xl overflow-hidden"
    >
      <div className="relative h-80 md:h-96">
        <Image
          src={post.featuredImage.url}
          alt={post.featuredImage.alt}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
        <div className="top-6 left-6 absolute">
          <span className="bg-primary-600 px-4 py-2 rounded-full font-semibold text-white text-sm">
            {post.category.name}
          </span>
        </div>
        <div className="right-6 bottom-6 left-6 absolute text-white">
          <div className="flex items-center space-x-6 mb-4 text-sm">
            <span className="flex items-center">
              <CalendarDays className="mr-2 w-4 h-4" />
              {new Date(post.publishedAt).toLocaleDateString()}
            </span>
            <span className="flex items-center">
              <Clock className="mr-2 w-4 h-4" />
              {post.readTime} min read
            </span>
          </div>
          <h2 className="mb-4 font-black text-2xl md:text-3xl leading-tight">
            {post.title}
          </h2>
          <p className="text-gray-200 text-base line-clamp-3 leading-relaxed">
            {post.excerpt}
          </p>
        </div>
      </div>
      <div className="p-8">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <div className="flex justify-center items-center bg-gradient-to-r from-primary-600 to-secondary-600 rounded-full w-12 h-12 font-bold text-white text-lg">
              {post.author.name.charAt(0)}
            </div>
            <div>
              <p className="font-bold text-gray-900 dark:text-gray-100">
                {post.author.name}
              </p>
              <p className="font-medium text-gray-600 dark:text-gray-400 text-sm">
                {post.author.role}
              </p>
            </div>
          </div>
          <Button
            variant="primary"
            size="lg"
            className="group"
            onClick={() => (window.location.href = `/blog/${post.slug}`)}
          >
            Read Full Article
            <ArrowRight className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1 duration-200" />
          </Button>
        </div>
      </div>
    </motion.article>
  </HoverScale>
)

// Enhanced Regular Post Card with MH Branding
const MHRegularPostCard = ({ post }: { post: BlogPost }) => (
  <HoverScale>
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="group bg-white dark:bg-gray-800 shadow-lg hover:shadow-2xl rounded-xl overflow-hidden transition-all duration-300"
    >
      <div className="relative h-48 overflow-hidden">
        <Image
          src={post.featuredImage.url}
          alt={post.featuredImage.alt}
          fill
          className="object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="top-3 left-3 absolute">
          <span className="bg-primary-600 px-3 py-1 rounded-full font-semibold text-white text-xs">
            {post.category.name}
          </span>
        </div>
      </div>

      <div className="p-6">
        <Link href={`/blog/${post.slug}`}>
          <h3 className="mb-3 font-bold text-gray-900 hover:text-primary-600 dark:text-gray-100 text-xl line-clamp-2 leading-tight transition-colors">
            {post.title}
          </h3>
        </Link>

        <p className="mb-4 text-gray-600 dark:text-gray-300 line-clamp-3 leading-relaxed">
          {post.excerpt}
        </p>

        <div className="flex justify-between items-center mb-4 text-gray-500 dark:text-gray-400 text-sm">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1">
              <User2 className="w-4 h-4" />
              <span className="font-medium">{post.author.name}</span>
            </div>
            <div className="flex items-center gap-1">
              <CalendarDays className="w-4 h-4" />
              <span>{new Date(post.publishedAt).toLocaleDateString()}</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              <span>{post.readTime} min read</span>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mb-4">
          {post.tags.slice(0, 3).map(tag => (
            <span
              key={tag}
              className="inline-flex items-center bg-gray-100 dark:bg-gray-700 px-3 py-1 rounded-full font-medium text-gray-700 dark:text-gray-300 text-xs"
            >
              <Tags className="mr-1 w-3 h-3" />
              {tag}
            </span>
          ))}
          {post.tags.length > 3 && (
            <span className="px-3 py-1 text-gray-500 text-xs">
              +{post.tags.length - 3} more
            </span>
          )}
        </div>

        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <div className="flex justify-center items-center bg-gradient-to-r from-primary-600 to-secondary-600 rounded-full w-8 h-8 font-bold text-white text-sm">
              {post.author.name.charAt(0)}
            </div>
            <span className="font-medium text-gray-700 dark:text-gray-300 text-sm">
              {post.author.role}
            </span>
          </div>
          <Button
            variant="outline"
            size="sm"
            className="group"
            onClick={() => (window.location.href = `/blog/${post.slug}`)}
          >
            Read More
            <ArrowRight className="ml-1 w-4 h-4 transition-transform group-hover:translate-x-1 duration-200" />
          </Button>
        </div>
      </div>
    </motion.article>
  </HoverScale>
)

export default function BlogPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [selectedTag, setSelectedTag] = useState<string>('all')

  // Get all unique tags
  const allTags = useMemo(() => {
    const tags = new Set<string>()
    mockBlogPosts.forEach(post => {
      post.tags.forEach(tag => tags.add(tag))
    })
    return Array.from(tags).sort()
  }, [])

  // Filter posts based on search and filters
  const filteredPosts = useMemo(() => {
    return mockBlogPosts.filter(post => {
      const matchesSearch =
        post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.tags.some(tag =>
          tag.toLowerCase().includes(searchTerm.toLowerCase())
        )

      const matchesCategory =
        selectedCategory === 'all' || post.category.id === selectedCategory
      const matchesTag =
        selectedTag === 'all' || post.tags.includes(selectedTag)

      return matchesSearch && matchesCategory && matchesTag
    })
  }, [searchTerm, selectedCategory, selectedTag])

  const featuredPosts = filteredPosts.filter(post => post.featured)
  const regularPosts = filteredPosts.filter(post => !post.featured)

  return (
    <div className="bg-gray-50 dark:bg-gray-900 min-h-screen">
      {/* Hero Section */}
      <section className="relative flex justify-center items-center bg-gradient-to-br from-primary-900 via-primary-800 to-secondary-800 h-screen overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div
            className="absolute inset-0 bg-repeat"
            style={{
              backgroundImage:
                'url(\'data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="0.1"%3E%3Ccircle cx="7" cy="7" r="2"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\')',
            }}
          />
        </div>

        <div className="z-10 relative mx-auto px-4 text-center container">
          <FadeInWhenVisible>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
              className="mx-auto max-w-5xl"
            >
              <div className="flex justify-center items-center mb-8">
                <Wrench className="mr-4 w-16 h-16 text-accent-400" />
                <BookOpen className="w-16 h-16 text-accent-400" />
              </div>

              <h1 className="mb-8 font-black text-white text-4xl md:text-6xl lg:text-8xl leading-tight">
                MH Construction
                <span className="block mt-2 text-accent-400">Insights</span>
              </h1>

              <p className="mx-auto mb-12 max-w-4xl font-light text-gray-200 text-xl md:text-2xl leading-relaxed">
                Professional construction insights, veteran expertise, and
                industry knowledge from the Pacific Northwest&apos;s most
                trusted construction team.
              </p>

              {/* Enhanced Search Bar */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.6 }}
                className="relative mx-auto mb-12 max-w-3xl"
              >
                <Search className="top-1/2 left-6 absolute w-6 h-6 text-gray-400 -translate-y-1/2 transform" />
                <input
                  type="text"
                  placeholder="Search articles, tips, and insights..."
                  value={searchTerm}
                  onChange={e => setSearchTerm(e.target.value)}
                  className="bg-white/95 shadow-2xl backdrop-blur-sm py-6 pr-6 pl-16 border-0 rounded-2xl focus:ring-4 w-full font-medium text-gray-900 text-lg focus:ring-accent-400/50"
                />
              </motion.div>

              {/* Scroll Indicator */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1, duration: 0.6 }}
                className="flex justify-center"
              >
                <motion.div
                  animate={{ y: [0, 10, 0] }}
                  transition={{ repeat: Infinity, duration: 2 }}
                  className="flex flex-col items-center text-white/70"
                >
                  <span className="mb-2 font-medium text-sm">
                    Scroll for Insights
                  </span>
                  <ArrowRight className="w-6 h-6 rotate-90" />
                </motion.div>
              </motion.div>
            </motion.div>
          </FadeInWhenVisible>
        </div>

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
      </section>

      <div className="mx-auto px-4 py-12 container">
        <div className="flex lg:flex-row flex-col gap-12">
          {/* Main Content */}
          <div className="lg:w-2/3">
            {/* Filter Controls */}
            <div className="bg-white dark:bg-gray-800 shadow-md mb-8 p-6 rounded-lg">
              <div className="flex items-center gap-4 mb-4">
                <Filter className="w-5 h-5 text-blue-600" />
                <h3 className="font-semibold text-gray-900 text-lg">
                  Filter Articles
                </h3>
              </div>

              <div className="gap-4 grid grid-cols-1 md:grid-cols-2">
                {/* Category Filter */}
                <div>
                  <label className="block mb-2 font-medium text-gray-700 text-sm">
                    Category
                  </label>
                  <select
                    value={selectedCategory}
                    onChange={e => setSelectedCategory(e.target.value)}
                    className="px-3 py-2 border border-gray-300 focus:border-transparent rounded-lg focus:ring-2 focus:ring-blue-500 w-full"
                  >
                    <option value="all">All Categories</option>
                    {mockBlogCategories.map(category => (
                      <option key={category.id} value={category.id}>
                        {category.icon} {category.name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Tag Filter */}
                <div>
                  <label className="block mb-2 font-medium text-gray-700 text-sm">
                    Tag
                  </label>
                  <select
                    value={selectedTag}
                    onChange={e => setSelectedTag(e.target.value)}
                    className="px-3 py-2 border border-gray-300 focus:border-transparent rounded-lg focus:ring-2 focus:ring-blue-500 w-full"
                  >
                    <option value="all">All Tags</option>
                    {allTags.map(tag => (
                      <option key={tag} value={tag}>
                        {tag}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Active Filters Display */}
              {(selectedCategory !== 'all' ||
                selectedTag !== 'all' ||
                searchTerm) && (
                <div className="mt-4 pt-4 border-gray-200 border-t">
                  <div className="flex flex-wrap gap-2">
                    {searchTerm && (
                      <span className="inline-flex items-center bg-blue-100 px-3 py-1 rounded-full text-blue-800 text-sm">
                        Search: &quot;{searchTerm}&quot;
                        <button
                          onClick={() => setSearchTerm('')}
                          className="ml-2 text-blue-600 hover:text-blue-800"
                        >
                          ×
                        </button>
                      </span>
                    )}
                    {selectedCategory !== 'all' && (
                      <span className="inline-flex items-center bg-green-100 px-3 py-1 rounded-full text-green-800 text-sm">
                        Category:{' '}
                        {
                          mockBlogCategories.find(
                            c => c.id === selectedCategory
                          )?.name
                        }
                        <button
                          onClick={() => setSelectedCategory('all')}
                          className="ml-2 text-green-600 hover:text-green-800"
                        >
                          ×
                        </button>
                      </span>
                    )}
                    {selectedTag !== 'all' && (
                      <span className="inline-flex items-center bg-purple-100 px-3 py-1 rounded-full text-purple-800 text-sm">
                        Tag: {selectedTag}
                        <button
                          onClick={() => setSelectedTag('all')}
                          className="ml-2 text-purple-600 hover:text-purple-800"
                        >
                          ×
                        </button>
                      </span>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Results Summary */}
            <div className="mb-6">
              <p className="text-gray-600">
                Showing {filteredPosts.length} article
                {filteredPosts.length !== 1 ? 's' : ''}
                {searchTerm && ` for &quot;${searchTerm}&quot;`}
              </p>
            </div>

            {/* Featured Posts */}
            {featuredPosts.length > 0 && (
              <div className="mb-12">
                <h2 className="mb-6 font-bold text-gray-900 text-2xl">
                  Featured Articles
                </h2>
                <div className="gap-8 grid grid-cols-1 md:grid-cols-2">
                  {featuredPosts.map(post => (
                    <MHFeaturedPostCard key={post.id} post={post} />
                  ))}
                </div>
              </div>
            )}

            {/* Regular Posts */}
            {regularPosts.length > 0 && (
              <div>
                <h2 className="mb-6 font-bold text-gray-900 text-2xl">
                  {featuredPosts.length > 0
                    ? 'Latest Articles'
                    : 'All Articles'}
                </h2>
                <div className="space-y-8">
                  {regularPosts.map(post => (
                    <RegularPostCard key={post.id} post={post} />
                  ))}
                </div>
              </div>
            )}

            {/* No Results */}
            {filteredPosts.length === 0 && (
              <div className="py-12 text-center">
                <div className="mb-4 text-gray-400">
                  <Search className="mx-auto w-16 h-16" />
                </div>
                <h3 className="mb-2 font-semibold text-gray-900 text-xl">
                  No articles found
                </h3>
                <p className="mb-4 text-gray-600">
                  Try adjusting your search terms or filters to find what
                  you&apos;re looking for.
                </p>
                <button
                  onClick={() => {
                    setSearchTerm('')
                    setSelectedCategory('all')
                    setSelectedTag('all')
                  }}
                  className="font-medium text-blue-600 hover:text-blue-700"
                >
                  Clear all filters
                </button>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:w-1/3">
            {/* Enhanced Blog Sidebar */}
            <div className="space-y-8">
              {/* Categories */}
              <div className="bg-white dark:bg-gray-800 shadow-lg p-6 rounded-xl">
                <h3 className="mb-6 font-bold text-gray-900 dark:text-gray-100 text-xl">
                  Categories
                </h3>
                <div className="space-y-3">
                  {mockBlogCategories.map(category => (
                    <Link
                      key={category.id}
                      href={`/blog?category=${category.id}`}
                      className="group flex items-center bg-gray-50 hover:bg-primary-50 dark:bg-gray-700 dark:hover:bg-primary-900/20 p-3 rounded-lg transition-colors"
                    >
                      <span className="mr-3 text-2xl">{category.icon}</span>
                      <div className="flex-1">
                        <span className="font-semibold text-gray-900 dark:text-gray-100 group-hover:text-primary-600">
                          {category.name}
                        </span>
                        <span className="block text-gray-500 dark:text-gray-400 text-sm">
                          {category.postCount} articles
                        </span>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>

              {/* Popular Tags */}
              <div className="bg-white dark:bg-gray-800 shadow-lg p-6 rounded-xl">
                <h3 className="mb-6 font-bold text-gray-900 dark:text-gray-100 text-xl">
                  Popular Tags
                </h3>
                <div className="flex flex-wrap gap-2">
                  {allTags.slice(0, 15).map(tag => (
                    <Link
                      key={tag}
                      href={`/blog?tag=${tag}`}
                      className="inline-flex items-center bg-gray-100 hover:bg-primary-100 dark:bg-gray-700 dark:hover:bg-primary-900/20 px-4 py-2 rounded-full font-medium text-gray-700 hover:text-primary-600 dark:text-gray-300 text-sm transition-colors"
                    >
                      <Tags className="mr-2 w-3 h-3" />
                      {tag}
                    </Link>
                  ))}
                </div>
              </div>

              {/* Recent Posts */}
              <div className="bg-white dark:bg-gray-800 shadow-lg p-6 rounded-xl">
                <h3 className="mb-6 font-bold text-gray-900 dark:text-gray-100 text-xl">
                  Recent Posts
                </h3>
                <div className="space-y-4">
                  {mockBlogPosts.slice(0, 5).map(post => (
                    <Link
                      key={post.id}
                      href={`/blog/${post.slug}`}
                      className="group block"
                    >
                      <h4 className="mb-2 font-semibold text-gray-900 dark:text-gray-100 group-hover:text-primary-600 line-clamp-2 leading-tight transition-colors">
                        {post.title}
                      </h4>
                      <div className="flex items-center text-gray-500 dark:text-gray-400 text-sm">
                        <CalendarDays className="mr-2 w-3 h-3" />
                        <span>
                          {new Date(post.publishedAt).toLocaleDateString()}
                        </span>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>

              {/* Newsletter Signup */}
              <div className="bg-gradient-to-br from-primary-600 to-secondary-600 shadow-lg p-6 rounded-xl text-white">
                <div className="flex items-center mb-4">
                  <Megaphone className="mr-3 w-8 h-8 text-accent-400" />
                  <h3 className="font-bold text-xl">Stay Updated</h3>
                </div>
                <p className="mb-6 text-gray-200 leading-relaxed">
                  Get the latest construction insights, veteran expertise, and
                  company updates delivered to your inbox.
                </p>
                <div className="space-y-3">
                  <input
                    type="email"
                    placeholder="Your email address"
                    className="px-4 py-3 border-0 rounded-lg focus:ring-4 w-full font-medium text-gray-900 focus:ring-accent-400/50"
                  />
                  <Button
                    variant="secondary"
                    size="lg"
                    className="justify-center w-full font-bold"
                  >
                    Subscribe Now
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function FeaturedPostCard({ post }: { post: BlogPost }) {
  return (
    <article className="bg-white shadow-lg hover:shadow-xl rounded-lg overflow-hidden transition-shadow duration-300">
      <Link href={`/blog/${post.slug}`}>
        <div className="relative h-48 overflow-hidden">
          <Image
            src={post.featuredImage.url}
            alt={post.featuredImage.alt}
            fill
            className="object-cover hover:scale-105 transition-transform duration-300"
          />
          <div className="top-4 left-4 absolute">
            <span
              className="px-3 py-1 rounded-full font-medium text-white text-sm"
              style={{ backgroundColor: post.category.color }}
            >
              {post.category.icon} {post.category.name}
            </span>
          </div>
        </div>
      </Link>

      <div className="p-6">
        <Link href={`/blog/${post.slug}`}>
          <h3 className="mb-3 font-bold text-gray-900 hover:text-blue-600 text-xl line-clamp-2 transition-colors">
            {post.title}
          </h3>
        </Link>

        <p className="mb-4 text-gray-600 line-clamp-3">{post.excerpt}</p>

        <div className="flex justify-between items-center mb-4 text-gray-500 text-sm">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1">
              <User2 className="w-4 h-4" />
              <span>{post.author.name}</span>
            </div>
            <div className="flex items-center gap-1">
              <CalendarDays className="w-4 h-4" />
              <span>{new Date(post.publishedAt).toLocaleDateString()}</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              <span>{post.readTime} min read</span>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          {post.tags.slice(0, 3).map(tag => (
            <span
              key={tag}
              className="inline-flex items-center bg-gray-100 px-2 py-1 rounded-md text-gray-700 text-xs"
            >
              <Tags className="mr-1 w-3 h-3" />
              {tag}
            </span>
          ))}
          {post.tags.length > 3 && (
            <span className="text-gray-500 text-xs">
              +{post.tags.length - 3} more
            </span>
          )}
        </div>
      </div>
    </article>
  )
}

function RegularPostCard({ post }: { post: BlogPost }) {
  return (
    <article className="bg-white shadow-md hover:shadow-lg rounded-lg overflow-hidden transition-shadow duration-300">
      <div className="md:flex">
        <Link href={`/blog/${post.slug}`} className="md:w-1/3">
          <div className="relative h-48 md:h-full overflow-hidden">
            <Image
              src={post.featuredImage.url}
              alt={post.featuredImage.alt}
              fill
              className="object-cover hover:scale-105 transition-transform duration-300"
            />
          </div>
        </Link>

        <div className="p-6 md:w-2/3">
          <div className="flex items-center gap-2 mb-3">
            <span
              className="px-2 py-1 rounded-full font-medium text-white text-xs"
              style={{ backgroundColor: post.category.color }}
            >
              {post.category.icon} {post.category.name}
            </span>
          </div>

          <Link href={`/blog/${post.slug}`}>
            <h3 className="mb-3 font-bold text-gray-900 hover:text-blue-600 text-xl line-clamp-2 transition-colors">
              {post.title}
            </h3>
          </Link>

          <p className="mb-4 text-gray-600 line-clamp-2">{post.excerpt}</p>

          <div className="flex justify-between items-center mb-4 text-gray-500 text-sm">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1">
                <User2 className="w-4 h-4" />
                <span>{post.author.name}</span>
              </div>
              <div className="flex items-center gap-1">
                <CalendarDays className="w-4 h-4" />
                <span>{new Date(post.publishedAt).toLocaleDateString()}</span>
              </div>
              <div className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                <span>{post.readTime} min read</span>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            {post.tags.slice(0, 4).map(tag => (
              <span
                key={tag}
                className="inline-flex items-center bg-gray-100 px-2 py-1 rounded-md text-gray-700 text-xs"
              >
                <Tags className="mr-1 w-3 h-3" />
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </article>
  )
}

function BlogSidebar({
  categories,
  tags,
}: {
  categories: BlogCategory[]
  tags: string[]
}) {
  return (
    <div className="space-y-8">
      {/* Categories */}
      <div className="bg-white shadow-md p-6 rounded-lg">
        <h3 className="mb-4 font-semibold text-gray-900 text-lg">Categories</h3>
        <div className="space-y-3">
          {categories.map(category => (
            <Link
              key={category.id}
              href={`/blog?category=${category.id}`}
              className="group flex justify-between items-center hover:bg-gray-50 p-3 rounded-lg transition-colors"
            >
              <div className="flex items-center gap-3">
                <span className="text-lg">{category.icon}</span>
                <span className="font-medium text-gray-700 group-hover:text-blue-600">
                  {category.name}
                </span>
              </div>
              <span className="bg-gray-100 px-2 py-1 rounded-full text-gray-500 text-sm">
                {category.postCount}
              </span>
            </Link>
          ))}
        </div>
      </div>

      {/* Popular Tags */}
      <div className="bg-white shadow-md p-6 rounded-lg">
        <h3 className="mb-4 font-semibold text-gray-900 text-lg">
          Popular Tags
        </h3>
        <div className="flex flex-wrap gap-2">
          {tags.slice(0, 15).map(tag => (
            <Link
              key={tag}
              href={`/blog?tag=${tag}`}
              className="inline-flex items-center bg-gray-100 hover:bg-blue-100 px-3 py-1 rounded-full text-gray-700 hover:text-blue-800 text-sm transition-colors"
            >
              <Tags className="mr-1 w-3 h-3" />
              {tag}
            </Link>
          ))}
        </div>
      </div>

      {/* Recent Posts */}
      <div className="bg-white shadow-md p-6 rounded-lg">
        <h3 className="mb-4 font-semibold text-gray-900 text-lg">
          Recent Posts
        </h3>
        <div className="space-y-4">
          {mockBlogPosts.slice(0, 3).map(post => (
            <Link
              key={post.id}
              href={`/blog/${post.slug}`}
              className="group block"
            >
              <h4 className="mb-1 font-medium text-gray-900 group-hover:text-blue-600 line-clamp-2 transition-colors">
                {post.title}
              </h4>
              <div className="flex items-center text-gray-500 text-sm">
                <CalendarDays className="mr-1 w-3 h-3" />
                <span>{new Date(post.publishedAt).toLocaleDateString()}</span>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Newsletter Signup */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 shadow-md p-6 rounded-lg text-white">
        <h3 className="mb-2 font-semibold text-lg">Stay Updated</h3>
        <p className="mb-4 text-blue-100 text-sm">
          Get the latest construction tips and company updates delivered to your
          inbox.
        </p>
        <div className="space-y-3">
          <input
            type="email"
            placeholder="Your email address"
            className="px-3 py-2 border-0 rounded-md focus:ring-2 focus:ring-blue-300 w-full text-gray-900"
          />
          <button className="bg-white hover:bg-gray-50 px-4 py-2 rounded-md w-full font-medium text-blue-600 transition-colors">
            Subscribe
          </button>
        </div>
      </div>
    </div>
  )
}
