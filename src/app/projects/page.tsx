'use client'

import React, { useState, useMemo } from 'react'
import Link from 'next/link'
import {
  Button,
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  PageHero,
} from '../../components/ui'
import { MaterialIcon } from '../../components/icons/MaterialIcon'
import {
  FadeInWhenVisible,
  StaggeredFadeIn,
  HoverScale,
} from '../../components/animations/FramerMotionComponents'
import { PortfolioService } from '../../lib/services/portfolioService'
import { OptimizedImage } from '../../components/ui/OptimizedImage'

// Category definitions
const categories = [
  { id: 'all', label: 'All Projects', icon: 'grid_view' },
  { id: 'residential', label: 'Residential', icon: 'home' },
  { id: 'commercial', label: 'Commercial', icon: 'business' },
  { id: 'industrial', label: 'Industrial', icon: 'factory' },
  { id: 'renovation', label: 'Renovations', icon: 'construction' },
]

// Project stats
const projectStats = [
  { icon: 'check_circle', value: '100+', label: 'Projects Completed' },
  { icon: 'star', value: '98%', label: 'Client Satisfaction' },
  { icon: 'schedule', value: '30+', label: 'Years Experience' },
  { icon: 'handshake', value: '70%', label: 'Referral Rate' },
]

// Service capabilities
const capabilities = [
  {
    icon: 'church',
    title: 'Religious Facilities',
    description:
      'Partnering with congregations to create churches and community centers with thoughtful design that serves your mission',
  },
  {
    icon: 'business',
    title: 'Commercial Buildings',
    description:
      'Collaborating on office buildings, retail centers, and government facilities that strengthen community infrastructure',
  },
  {
    icon: 'local_hospital',
    title: 'Medical Facilities',
    description:
      'Working with healthcare providers to build medical centers and clinics with specialized compliance and community focus',
  },
  {
    icon: 'wine_bar',
    title: 'Wineries & Vineyards',
    description:
      'Partnering with vintners to create processing facilities and tasting rooms that celebrate Pacific Northwest heritage',
  },
  {
    icon: 'factory',
    title: 'Light Industrial',
    description:
      'Collaborating on warehouses and processing plants that support regional economic growth',
  },
  {
    icon: 'store',
    title: 'Tenant Improvements',
    description:
      'Working with businesses to transform commercial spaces that serve community needs',
  },
]

export default function ProjectsPage() {
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')

  // Get projects based on selected category and search query
  const projects = useMemo(() => {
    let filteredProjects =
      PortfolioService.getProjectsByCategory(selectedCategory)

    if (searchQuery.trim()) {
      filteredProjects = filteredProjects.filter(
        project =>
          project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          project.description
            .toLowerCase()
            .includes(searchQuery.toLowerCase()) ||
          (project.subcategory &&
            project.subcategory
              .toLowerCase()
              .includes(searchQuery.toLowerCase())) ||
          project.location.city
            .toLowerCase()
            .includes(searchQuery.toLowerCase()) ||
          (project.tags &&
            project.tags.some(tag =>
              tag.toLowerCase().includes(searchQuery.toLowerCase())
            ))
      )
    }

    return filteredProjects
  }, [selectedCategory, searchQuery])

  const stats = PortfolioService.getPortfolioStats()

  return (
    <div className="bg-gradient-to-b from-white dark:from-gray-900 to-gray-50 dark:to-gray-800 min-h-screen">
      <PageHero
        title="Our Projects"
        subtitle="Building Excellence Across the Pacific Northwest"
        description="Explore our comprehensive portfolio showcasing decades of quality craftsmanship, innovative construction solutions, and unwavering commitment to client satisfaction throughout the Tri-Cities area."
      />

      {/* Project Stats */}
      <section
        id="project-stats"
        className="bg-white dark:bg-gray-900 py-16 lg:py-24"
      >
        <div className="mx-auto px-4 container">
          <FadeInWhenVisible>
            {/* Section Header */}
            <div className="mb-16 text-center">
              <h2 className="mb-6 font-black text-gray-900 dark:text-gray-100 text-2xl sm:text-3xl md:text-4xl lg:text-5xl leading-tight tracking-tighter">
                <span className="block mb-3 font-semibold text-gray-700 dark:text-gray-300 text-xl sm:text-2xl md:text-3xl lg:text-4xl tracking-tight">
                  Proven Track
                </span>
                <span className="block bg-clip-text bg-gradient-to-r from-brand-primary to-brand-secondary drop-shadow-sm text-transparent">
                  Record
                </span>
              </h2>
              <p className="mx-auto max-w-3xl font-light text-gray-600 dark:text-gray-300 text-lg md:text-xl lg:text-2xl leading-relaxed tracking-wide">
                Building for the Owner, NOT the Dollar - Numbers that reflect
                our veteran-owned commitment to excellence and client
                partnerships
              </p>
            </div>

            <div className="gap-8 grid grid-cols-2 md:grid-cols-4 mx-auto max-w-6xl">
              {projectStats.map((stat, index) => (
                <HoverScale key={index}>
                  <div className="bg-gradient-to-br from-brand-primary/5 dark:from-brand-primary/10 to-brand-secondary/5 dark:to-brand-secondary/10 hover:shadow-xl dark:hover:shadow-gray-600/50 p-6 border border-brand-primary/20 dark:border-brand-primary/30 rounded-xl text-center transition-all duration-300">
                    <MaterialIcon
                      icon={stat.icon}
                      size="3xl"
                      className="mb-4 text-brand-primary"
                    />
                    <div className="mb-2 font-bold text-gray-900 dark:text-white text-4xl lg:text-5xl">
                      {stat.value}
                    </div>
                    <div className="font-medium text-gray-600 dark:text-gray-300 text-lg">
                      {stat.label}
                    </div>
                  </div>
                </HoverScale>
              ))}
            </div>
          </FadeInWhenVisible>
        </div>
      </section>

      {/* Veteran-Owned Benefits */}
      <section className="bg-gradient-to-r from-brand-primary/10 dark:from-brand-primary/20 to-brand-primary/5 dark:to-brand-primary/10 py-12">
        <div className="mx-auto px-4 container">
          <FadeInWhenVisible>
            <div className="flex md:flex-row flex-col justify-center items-center gap-8 mx-auto max-w-4xl">
              <div className="flex items-center">
                <MaterialIcon
                  icon="military_tech"
                  size="3xl"
                  className="mr-4 text-brand-primary"
                />
                <div>
                  <h3 className="mb-2 font-bold text-gray-900 dark:text-white text-xl">
                    Veteran-Owned Excellence
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    Military precision meets construction expertise
                  </p>
                </div>
              </div>
              <div className="flex items-center">
                <MaterialIcon
                  icon="verified"
                  size="3xl"
                  className="mr-4 text-brand-secondary"
                />
                <div>
                  <h3 className="mb-2 font-bold text-gray-900 dark:text-white text-xl">
                    Certified & Trusted
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    Licensed, bonded, and committed to quality
                  </p>
                </div>
              </div>
            </div>
          </FadeInWhenVisible>
        </div>
      </section>

      {/* Category Filter & Search */}
      <section className="bg-gray-50 dark:bg-gray-800 py-12 border-gray-200 border-y dark:border-gray-700">
        <div className="mx-auto px-4 container">
          <FadeInWhenVisible>
            <div className="mb-8 text-center">
              <h3 className="mb-6 font-black text-gray-900 dark:text-gray-100 text-xl sm:text-2xl md:text-3xl lg:text-4xl leading-tight tracking-tighter">
                <span className="block mb-2 font-semibold text-gray-700 dark:text-gray-300 text-lg sm:text-xl md:text-2xl lg:text-3xl tracking-tight">
                  Find Your Perfect
                </span>
                <span className="block bg-clip-text bg-gradient-to-r from-brand-primary to-brand-secondary drop-shadow-sm text-transparent">
                  Partnership
                </span>
              </h3>
              <p className="font-light text-gray-600 dark:text-gray-300 text-lg md:text-xl leading-relaxed tracking-wide">
                Search our portfolio and filter by project type
              </p>
            </div>

            {/* Search Bar */}
            <div className="mx-auto mb-8 max-w-2xl">
              <div className="relative">
                <MaterialIcon
                  icon="search"
                  size="md"
                  className="top-1/2 left-4 absolute text-gray-400 -translate-y-1/2 transform"
                />
                <input
                  type="text"
                  placeholder="Search projects by name, location, type, or features..."
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  className="bg-white dark:bg-gray-700 py-4 pr-4 pl-12 border border-gray-300 dark:border-gray-600 focus:border-brand-primary dark:focus:border-brand-primary rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-primary/20 w-full text-gray-900 dark:text-white"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="top-1/2 right-4 absolute hover:bg-gray-200 dark:hover:bg-gray-600 p-1 rounded-full text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors -translate-y-1/2 transform"
                  >
                    <MaterialIcon icon="close" size="sm" />
                  </button>
                )}
              </div>
            </div>

            {/* Category Filters */}
            <div className="flex flex-wrap justify-center gap-4">
              {categories.map(category => (
                <Button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  variant={
                    selectedCategory === category.id ? 'default' : 'outline'
                  }
                  className={`
                    ${
                      selectedCategory === category.id
                        ? 'bg-brand-primary hover:bg-brand-primary-dark text-white'
                        : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600 border-gray-300 dark:border-gray-600'
                    }
                  `}
                >
                  <MaterialIcon
                    icon={category.icon}
                    className="mr-2"
                    size="md"
                  />
                  {category.label}
                </Button>
              ))}
            </div>
          </FadeInWhenVisible>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="bg-white dark:bg-gray-900 py-16 lg:py-24">
        <div className="mx-auto px-4 container">
          <FadeInWhenVisible>
            <div className="mb-12 text-center">
              <h2 className="mb-6 font-black text-gray-900 dark:text-gray-100 text-2xl sm:text-3xl md:text-4xl lg:text-5xl leading-tight tracking-tighter">
                <span className="block mb-3 font-semibold text-gray-700 dark:text-gray-300 text-xl sm:text-2xl md:text-3xl lg:text-4xl tracking-tight">
                  {selectedCategory === 'all'
                    ? 'Partnership Success'
                    : `${
                        categories.find(c => c.id === selectedCategory)?.label
                      } Partnership`}
                </span>
                <span className="block bg-clip-text bg-gradient-to-r from-brand-primary to-brand-secondary drop-shadow-sm text-transparent">
                  Stories
                </span>
              </h2>
              <p className="font-light text-gray-600 dark:text-gray-300 text-lg md:text-xl lg:text-2xl leading-relaxed tracking-wide">
                {projects.length}{' '}
                {projects.length === 1 ? 'collaboration' : 'collaborations'}{' '}
                showcasing our commitment to working with clients
              </p>
            </div>
          </FadeInWhenVisible>

          {projects.length > 0 ? (
            <StaggeredFadeIn className="gap-8 grid md:grid-cols-2 lg:grid-cols-3 mx-auto max-w-7xl">
              {projects.map(project => (
                <Card
                  key={project.id}
                  className="bg-white dark:bg-gray-800 hover:shadow-xl dark:hover:shadow-gray-600/50 border border-gray-200 dark:border-gray-700 overflow-hidden transition-all hover:-translate-y-1"
                >
                  <div className="relative bg-gray-200 dark:bg-gray-700 h-64">
                    {project.images[0] ? (
                      <OptimizedImage
                        src={project.images[0].url}
                        alt={project.images[0].alt}
                        fill
                        className="object-cover"
                        priority={project.isFeatured}
                      />
                    ) : (
                      <div className="flex justify-center items-center bg-gradient-to-br from-brand-primary/20 dark:from-brand-primary/30 to-brand-secondary/20 dark:to-brand-secondary/30 w-full h-full">
                        <MaterialIcon
                          icon="image"
                          size="4xl"
                          className="text-brand-accent"
                        />
                      </div>
                    )}
                    {project.isFeatured && (
                      <div className="top-4 right-4 absolute">
                        <span className="inline-flex items-center bg-brand-secondary shadow-lg backdrop-blur-sm px-2 py-1 border-yellow-300 border-l-4 font-semibold text-white text-xs">
                          <MaterialIcon
                            icon="star"
                            size="sm"
                            className="mr-1"
                          />
                          Featured
                        </span>
                      </div>
                    )}
                    <div className="bottom-4 left-4 absolute">
                      <span className="inline-flex items-center bg-white/90 dark:bg-gray-800/90 shadow-md backdrop-blur-sm px-2 py-1 border-brand-primary border-l-4 font-semibold text-gray-900 dark:text-white text-xs">
                        <MaterialIcon
                          icon="location_on"
                          size="sm"
                          className="mr-1 text-brand-primary"
                        />
                        {project.location.city}, {project.location.state}
                      </span>
                    </div>
                  </div>

                  <CardHeader>
                    <div className="flex justify-between items-start mb-2">
                      <CardTitle className="text-gray-900 dark:text-white text-xl">
                        {project.title}
                      </CardTitle>
                      <span
                        className={`
                        inline-flex items-center px-2 py-1 rounded-md text-xs font-semibold
                        ${
                          project.status === 'completed'
                            ? 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300'
                            : 'bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300'
                        }
                      `}
                      >
                        {project.status === 'completed'
                          ? 'Completed'
                          : 'In Progress'}
                      </span>
                    </div>
                    <p className="font-semibold text-gray-600 text-sm">
                      {project.subcategory}
                    </p>
                  </CardHeader>

                  <CardContent>
                    <p className="mb-4 text-gray-700 dark:text-gray-300 line-clamp-3">
                      {project.description}
                    </p>

                    {/* Community Impact Badge */}
                    <div className="mb-4">
                      <span className="inline-flex items-center bg-brand-secondary/10 dark:bg-brand-secondary/20 px-2 py-1 border-brand-secondary border-l-4 font-medium text-brand-secondary text-xs">
                        <MaterialIcon
                          icon="groups"
                          size="sm"
                          className="mr-1"
                        />
                        Community Partnership
                      </span>
                    </div>

                    {project.details && (
                      <div className="space-y-2 mb-4 text-gray-600 text-sm">
                        {project.details.squareFootage && (
                          <div className="flex items-center">
                            <MaterialIcon
                              icon="square_foot"
                              size="sm"
                              className="mr-2 text-gray-400"
                            />
                            <span>
                              {project.details.squareFootage.toLocaleString()}{' '}
                              sq ft
                            </span>
                          </div>
                        )}
                        {project.details.duration && (
                          <div className="flex items-center">
                            <MaterialIcon
                              icon="schedule"
                              size="sm"
                              className="mr-2 text-gray-400"
                            />
                            <span>{project.details.duration}</span>
                          </div>
                        )}
                        {project.details.completionDate && (
                          <div className="flex items-center">
                            <MaterialIcon
                              icon="event"
                              size="sm"
                              className="mr-2 text-gray-400"
                            />
                            <span>
                              {project.details.completionDate.toLocaleDateString(
                                'en-US',
                                { year: 'numeric', month: 'long' }
                              )}
                            </span>
                          </div>
                        )}
                      </div>
                    )}

                    {project.tags && project.tags.length > 0 && (
                      <div className="flex flex-wrap gap-2 mb-4">
                        {project.tags.slice(0, 3).map((tag, index) => (
                          <span
                            key={index}
                            className="inline-flex items-center bg-gray-100 px-2 py-1 rounded-md text-gray-700 text-xs"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}

                    {project.clientTestimonial && (
                      <div className="mt-4 pt-4 border-t">
                        <div className="flex items-center mb-2">
                          {[...Array(project.clientTestimonial.rating)].map(
                            (_, i) => (
                              <MaterialIcon
                                key={i}
                                icon="star"
                                size="sm"
                                className="text-yellow-500"
                              />
                            )
                          )}
                        </div>
                        <p className="text-gray-600 text-sm italic line-clamp-2">
                          "{project.clientTestimonial.quote}"
                        </p>
                        <p className="mt-2 text-gray-500 text-xs">
                          - {project.clientTestimonial.clientName}
                        </p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </StaggeredFadeIn>
          ) : (
            <div className="py-12 text-center">
              <MaterialIcon
                icon="search_off"
                size="4xl"
                className="mb-4 text-gray-400"
              />
              <h3 className="mb-2 font-bold text-gray-900 dark:text-white text-2xl">
                No partnerships found
              </h3>
              <p className="mb-6 text-gray-600 dark:text-gray-300">
                {searchQuery
                  ? `No projects match "${searchQuery}". Try adjusting your search or selecting a different category.`
                  : 'Try selecting a different category'}
              </p>
              <div className="flex sm:flex-row flex-col justify-center gap-4">
                {searchQuery && (
                  <Button
                    onClick={() => setSearchQuery('')}
                    className="bg-brand-secondary hover:bg-brand-secondary-dark text-white"
                  >
                    <MaterialIcon icon="clear" className="mr-2" size="md" />
                    Clear Search
                  </Button>
                )}
                <Button
                  onClick={() => {
                    setSelectedCategory('all')
                    setSearchQuery('')
                  }}
                  className="bg-brand-primary hover:bg-brand-primary-dark text-white"
                >
                  <MaterialIcon icon="view_list" className="mr-2" size="md" />
                  View All Partnerships
                </Button>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Project Capabilities Section */}
      <section className="bg-gray-50 dark:bg-gray-800 py-16 lg:py-24">
        <div className="mx-auto px-4 container">
          <FadeInWhenVisible>
            <div className="mb-12 text-center">
              <h2 className="mb-6 font-black text-gray-900 dark:text-gray-100 text-2xl sm:text-3xl md:text-4xl lg:text-5xl leading-tight tracking-tighter">
                <span className="block mb-3 font-semibold text-gray-700 dark:text-gray-300 text-xl sm:text-2xl md:text-3xl lg:text-4xl tracking-tight">
                  Partnership
                </span>
                <span className="block bg-clip-text bg-gradient-to-r from-brand-primary to-brand-secondary drop-shadow-sm text-transparent">
                  Capabilities
                </span>
              </h2>
              <p className="mx-auto max-w-3xl font-light text-gray-600 dark:text-gray-300 text-lg md:text-xl lg:text-2xl leading-relaxed tracking-wide">
                Veteran-owned collaborative expertise across multiple
                construction markets, working with you to strengthen Pacific
                Northwest communities
              </p>
            </div>
          </FadeInWhenVisible>

          <StaggeredFadeIn className="gap-6 grid md:grid-cols-2 lg:grid-cols-3 mx-auto max-w-7xl">
            {capabilities.map((capability, index) => (
              <Card
                key={index}
                className="flex flex-col bg-white dark:bg-gray-900 hover:shadow-lg dark:hover:shadow-gray-600/50 border border-gray-200 dark:border-gray-700 h-full transition-all hover:-translate-y-1"
              >
                <CardHeader className="flex-shrink-0">
                  <MaterialIcon
                    icon={capability.icon}
                    size="2xl"
                    className="mb-3 text-brand-primary"
                  />
                  <CardTitle className="flex items-center min-h-[3rem] text-gray-900 dark:text-white text-lg">
                    {capability.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="flex flex-grow items-start">
                  <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
                    {capability.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </StaggeredFadeIn>
        </div>
      </section>

      {/* Why Choose MH Construction Section - Matching Services Page */}
      <section className="bg-gray-50 dark:bg-gray-800 py-16">
        <div className="mx-auto px-4 container">
          <FadeInWhenVisible>
            <div className="mb-12 text-center">
              <h2 className="mb-6 font-black text-gray-900 dark:text-gray-100 text-2xl sm:text-3xl md:text-4xl lg:text-5xl leading-tight tracking-tighter">
                <span className="block mb-3 font-semibold text-gray-700 dark:text-gray-300 text-xl sm:text-2xl md:text-3xl lg:text-4xl tracking-tight">
                  Why Choose
                </span>
                <span className="block bg-clip-text bg-gradient-to-r from-brand-primary to-brand-secondary drop-shadow-sm text-transparent">
                  MH Construction
                </span>
              </h2>
              <p className="mx-auto max-w-3xl font-light text-gray-600 dark:text-gray-300 text-lg md:text-xl lg:text-2xl leading-relaxed tracking-wide">
                Your trusted partner for commercial construction in the Pacific
                Northwest
              </p>
            </div>
          </FadeInWhenVisible>

          <StaggeredFadeIn className="gap-6 grid md:grid-cols-2 lg:grid-cols-3 mx-auto max-w-7xl">
            {[
              {
                iconName: 'workspace_premium',
                title: '150+ Years Combined Experience',
                description:
                  'Deep expertise across all construction disciplines, refined through decades of successful partnership projects.',
              },
              {
                iconName: 'military_tech',
                title: 'Veteran-Owned Excellence',
                description:
                  'Military precision and discipline applied to construction, ensuring attention to detail and reliable execution.',
              },
              {
                iconName: 'handshake',
                title: 'Community Partnership',
                description:
                  "We're community partners invested in Pacific Northwest success, not just contractors.",
              },
              {
                iconName: 'verified',
                title: 'Licensed & Insured',
                description:
                  'Fully licensed across WA, OR, and ID with comprehensive insurance coverage for your protection.',
              },
              {
                iconName: 'high_quality',
                title: 'Quality Assurance',
                description:
                  'Meticulous quality control at every project phase, ensuring work meets our high standards.',
              },
              {
                iconName: 'support_agent',
                title: '24/7 Emergency Support',
                description:
                  'Round-the-clock emergency support for urgent construction needs and project issues.',
              },
            ].map((reason, index) => (
              <Card
                key={index}
                className="flex flex-col bg-white dark:bg-gray-900 hover:shadow-lg dark:hover:shadow-gray-600/50 border border-gray-200 dark:border-gray-700 h-full transition-all hover:-translate-y-1"
              >
                <CardHeader className="flex-shrink-0">
                  <MaterialIcon
                    icon={reason.iconName}
                    size="2xl"
                    className="mb-3 text-brand-primary"
                  />
                  <CardTitle className="flex items-center min-h-[3rem] text-gray-900 dark:text-white text-lg">
                    {reason.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="flex flex-grow items-start">
                  <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
                    {reason.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </StaggeredFadeIn>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="bg-white dark:bg-gray-900 py-16 lg:py-24">
        <div className="mx-auto px-4 container">
          <FadeInWhenVisible>
            <div className="mx-auto max-w-4xl">
              <div className="mb-12 text-center">
                <MaterialIcon
                  icon="format_quote"
                  size="3xl"
                  className="mb-4 text-brand-primary"
                />
                <h2 className="mb-6 font-black text-gray-900 dark:text-gray-100 text-2xl sm:text-3xl md:text-4xl lg:text-5xl leading-tight tracking-tighter">
                  <span className="block mb-3 font-semibold text-gray-700 dark:text-gray-300 text-xl sm:text-2xl md:text-3xl lg:text-4xl tracking-tight">
                    Partnership
                  </span>
                  <span className="block bg-clip-text bg-gradient-to-r from-brand-primary to-brand-secondary drop-shadow-sm text-transparent">
                    Experiences
                  </span>
                </h2>
                <p className="font-light text-gray-600 dark:text-gray-300 text-lg md:text-xl lg:text-2xl leading-relaxed tracking-wide">
                  Hear how we work WITH our clients, not just for them
                </p>
              </div>

              <div className="gap-8 grid md:grid-cols-2">
                {projects
                  .filter(p => p.clientTestimonial)
                  .slice(0, 4)
                  .map((project, index) => (
                    <Card
                      key={index}
                      className="flex flex-col bg-white dark:bg-gray-800 hover:shadow-lg dark:hover:shadow-gray-600/50 border border-gray-200 dark:border-gray-700 h-full transition-shadow"
                    >
                      <CardContent className="flex flex-col p-6 h-full">
                        <div className="flex flex-shrink-0 items-center mb-4">
                          {[...Array(project.clientTestimonial!.rating)].map(
                            (_, i) => (
                              <MaterialIcon
                                key={i}
                                icon="star"
                                size="md"
                                className="text-brand-secondary"
                              />
                            )
                          )}
                        </div>
                        <p className="flex-grow mb-4 text-gray-700 dark:text-gray-300 italic leading-relaxed">
                          "{project.clientTestimonial!.quote}"
                        </p>
                        <div className="flex-shrink-0 pt-4 border-gray-200 dark:border-gray-600 border-t">
                          <p className="font-semibold text-gray-900 dark:text-white">
                            {project.clientTestimonial!.clientName}
                          </p>
                          <p className="text-gray-600 dark:text-gray-400 text-sm">
                            {project.title}
                          </p>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
              </div>
            </div>
          </FadeInWhenVisible>
        </div>
      </section>

      {/* Partnership Process Section - Matching Services Page */}
      <section className="bg-white dark:bg-gray-900 py-16">
        <div className="mx-auto px-4 container">
          <FadeInWhenVisible>
            <div className="mx-auto max-w-4xl">
              <div className="mb-12 text-center">
                <MaterialIcon
                  icon="trending_up"
                  size="3xl"
                  className="mb-4 text-brand-primary"
                />
                <h2 className="mb-6 font-black text-gray-900 dark:text-gray-100 text-2xl sm:text-3xl md:text-4xl lg:text-5xl leading-tight tracking-tighter">
                  <span className="block mb-3 font-semibold text-gray-700 dark:text-gray-300 text-xl sm:text-2xl md:text-3xl lg:text-4xl tracking-tight">
                    Our Partnership
                  </span>
                  <span className="block bg-clip-text bg-gradient-to-r from-brand-primary to-brand-secondary drop-shadow-sm text-transparent">
                    Process
                  </span>
                </h2>
                <p className="font-light text-gray-600 dark:text-gray-300 text-lg md:text-xl lg:text-2xl leading-relaxed tracking-wide">
                  From initial consultation to project completion, we work with
                  you every step of the way
                </p>
              </div>

              <div className="space-y-6">
                {[
                  {
                    step: 1,
                    title: 'Initial Consultation',
                    description:
                      'Understanding your vision and requirements together',
                    icon: 'chat',
                  },
                  {
                    step: 2,
                    title: 'Site Assessment',
                    description:
                      'Collaborative evaluation of location and project feasibility',
                    icon: 'explore',
                  },
                  {
                    step: 3,
                    title: 'Master Planning',
                    description:
                      'Working together on detailed planning and timeline development',
                    icon: 'event',
                  },
                  {
                    step: 4,
                    title: 'Partnership Proposal',
                    description:
                      'Comprehensive project proposal with transparent pricing and collaboration framework',
                    icon: 'description',
                  },
                  {
                    step: 5,
                    title: 'Build Together',
                    description:
                      'Collaborative execution with regular communication and partnership approach',
                    icon: 'handshake',
                  },
                ].map((process, index) => (
                  <Card
                    key={index}
                    className="bg-white dark:bg-gray-800 hover:shadow-lg dark:hover:shadow-gray-600/50 border border-gray-200 dark:border-gray-700 transition-shadow"
                  >
                    <CardContent className="p-6">
                      <div className="flex items-start min-h-[5rem]">
                        <div className="flex-shrink-0 mr-4">
                          <div className="flex justify-center items-center bg-brand-primary rounded-full w-12 h-12 font-bold text-white text-xl">
                            {process.step}
                          </div>
                        </div>
                        <div className="flex-grow">
                          <div className="flex justify-between items-start">
                            <div className="flex-grow pr-4">
                              <h3 className="mb-2 font-bold text-gray-900 dark:text-white text-xl leading-tight">
                                {process.title}
                              </h3>
                              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                                {process.description}
                              </p>
                            </div>
                            <MaterialIcon
                              icon={process.icon}
                              size="lg"
                              className="flex-shrink-0 ml-4 text-brand-primary"
                            />
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </FadeInWhenVisible>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-brand-primary dark:from-brand-primary-dark to-brand-primary-dark dark:to-brand-primary py-16 text-white">
        <div className="mx-auto px-4 container">
          <FadeInWhenVisible>
            <div className="mx-auto max-w-3xl text-center">
              <MaterialIcon
                icon="handshake"
                size="4xl"
                className="mb-6 text-brand-secondary dark:text-brand-secondary"
              />
              <h2 className="mb-6 font-black text-white text-2xl sm:text-3xl md:text-4xl lg:text-5xl leading-tight tracking-tighter">
                <span className="block mb-3 font-semibold text-white/80 text-xl sm:text-2xl md:text-3xl lg:text-4xl tracking-tight">
                  Ready to Build
                </span>
                <span className="block bg-clip-text bg-gradient-to-r from-white to-brand-secondary drop-shadow-sm text-transparent">
                  Together?
                </span>
              </h2>
              <p className="mb-8 text-green-100 dark:text-green-200 text-xl">
                Let's start our partnership and bring your vision to life with
                the same veteran-owned dedication and quality you see in our
                portfolio
              </p>
              <div className="flex sm:flex-row flex-col justify-center gap-4">
                <Link href="/contact">
                  <Button
                    size="lg"
                    className="bg-brand-primary hover:bg-brand-primary-dark dark:bg-brand-primary dark:hover:bg-brand-primary-dark text-white"
                  >
                    <MaterialIcon icon="phone" className="mr-2" size="md" />
                    Start Our Partnership
                  </Button>
                </Link>
                <Link href="/services">
                  <Button
                    size="lg"
                    className="bg-brand-secondary hover:bg-brand-secondary-dark dark:bg-brand-secondary dark:hover:bg-brand-secondary-dark text-black dark:text-black"
                  >
                    <MaterialIcon icon="build" className="mr-2" size="md" />
                    Explore Capabilities
                  </Button>
                </Link>
              </div>
              <p className="mt-6 text-green-200 dark:text-green-300">
                <MaterialIcon icon="phone" className="inline mr-2" size="md" />
                Partnership Hotline: (509) 308-6489 | 3111 N. Capital Ave.,
                Pasco, WA 99301
              </p>
            </div>
          </FadeInWhenVisible>
        </div>
      </section>
    </div>
  )
}
