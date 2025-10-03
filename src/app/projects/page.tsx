'use client'

import React, { useState, useMemo } from 'react'
import Link from 'next/link'
import {
  Button,
  Card,
  CardHeader,
  CardTitle,
  CardContent,
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
    description: 'Churches and community centers with thoughtful design',
  },
  {
    icon: 'business',
    title: 'Commercial Buildings',
    description: 'Office buildings, retail centers, and government facilities',
  },
  {
    icon: 'local_hospital',
    title: 'Medical Facilities',
    description: 'Medical centers and clinics with specialized compliance',
  },
  {
    icon: 'wine_bar',
    title: 'Wineries & Vineyards',
    description: 'Processing facilities and tasting rooms',
  },
  {
    icon: 'factory',
    title: 'Light Industrial',
    description: 'Warehouses and processing plants',
  },
  {
    icon: 'store',
    title: 'Tenant Improvements',
    description: 'Commercial space transformations',
  },
]

export default function ProjectsPage() {
  const [selectedCategory, setSelectedCategory] = useState('all')

  // Get projects based on selected category
  const projects = useMemo(() => {
    return PortfolioService.getProjectsByCategory(selectedCategory)
  }, [selectedCategory])

  const stats = PortfolioService.getPortfolioStats()

  return (
    <div className="bg-gradient-to-b from-white dark:from-gray-900 to-gray-50 dark:to-gray-800 min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-brand-primary-dark via-brand-primary to-brand-primary-light py-20 lg:py-32 overflow-hidden text-white">
        <div className="mx-auto px-4 container">
          <FadeInWhenVisible>
            <div className="mx-auto max-w-4xl text-center">
              {/* Veteran Badge */}
              <div className="inline-flex items-center bg-white/10 backdrop-blur-sm mb-6 px-4 py-2 rounded-full">
                <MaterialIcon
                  icon="military_tech"
                  className="mr-2 text-green-200 text-xl"
                />
                <span className="font-semibold text-green-100 text-sm">
                  Veteran-Owned Construction Company
                </span>
              </div>

              <h1 className="mb-6 font-bold text-5xl md:text-6xl lg:text-7xl">
                Our Projects
              </h1>
              <p className="mb-8 text-green-100 text-xl md:text-2xl">
                Building Excellence Across the Pacific Northwest
              </p>

              {/* Enhanced Description */}
              <div className="bg-white/10 backdrop-blur-sm mb-8 p-6 border border-white/20 rounded-xl">
                <p className="text-green-50 text-lg leading-relaxed">
                  Explore our comprehensive portfolio showcasing decades of
                  quality craftsmanship, innovative construction solutions, and
                  unwavering commitment to client satisfaction throughout the
                  Tri-Cities area.
                </p>
              </div>

              {/* CTA Buttons */}
              <div className="flex sm:flex-row flex-col justify-center gap-4">
                <Link href="/contact">
                  <Button
                    size="xl"
                    className="bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/30 text-white"
                  >
                    <MaterialIcon icon="phone" className="mr-2" />
                    Start Your Project
                  </Button>
                </Link>
                <Button
                  size="xl"
                  variant="outline"
                  className="bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/30 text-white"
                  onClick={() =>
                    document
                      .getElementById('project-stats')
                      ?.scrollIntoView({ behavior: 'smooth' })
                  }
                >
                  <MaterialIcon icon="arrow_downward" className="mr-2" />
                  View Our Results
                </Button>
              </div>
            </div>
          </FadeInWhenVisible>
        </div>
      </section>

      {/* Project Stats */}
      <section
        id="project-stats"
        className="bg-white dark:bg-gray-900 py-16 lg:py-24"
      >
        <div className="mx-auto px-4 container">
          <FadeInWhenVisible>
            {/* Section Header */}
            <div className="mb-16 text-center">
              <h2 className="mb-4 font-bold text-gray-900 dark:text-white text-4xl lg:text-5xl">
                Proven Track Record
              </h2>
              <p className="mx-auto max-w-3xl text-gray-600 dark:text-gray-300 text-xl">
                Numbers that reflect our commitment to excellence and client
                satisfaction
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

      {/* Category Filter */}
      <section className="bg-gray-50 dark:bg-gray-800 py-12 border-gray-200 border-y dark:border-gray-700">
        <div className="mx-auto px-4 container">
          <FadeInWhenVisible>
            <div className="mb-8 text-center">
              <h3 className="mb-4 font-bold text-gray-900 dark:text-white text-2xl">
                Filter by Project Type
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Browse our diverse portfolio by construction category
              </p>
            </div>
            <div className="flex flex-wrap justify-center gap-4">
              {categories.map(category => (
                <Button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  variant={
                    selectedCategory === category.id ? 'primary' : 'outline'
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
              <h2 className="mb-4 font-bold text-gray-900 dark:text-white text-4xl lg:text-5xl">
                {selectedCategory === 'all'
                  ? 'All Projects'
                  : `${
                      categories.find(c => c.id === selectedCategory)?.label
                    } Projects`}
              </h2>
              <p className="text-gray-600 dark:text-gray-300 text-xl">
                {projects.length}{' '}
                {projects.length === 1 ? 'project' : 'projects'} found
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
                        <span className="inline-flex items-center bg-brand-secondary shadow-lg backdrop-blur-sm px-3 py-1 rounded-full font-semibold text-white text-xs">
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
                      <span className="inline-flex items-center bg-white/90 dark:bg-gray-800/90 shadow-md backdrop-blur-sm px-3 py-1 rounded-full font-semibold text-gray-900 dark:text-white text-xs">
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
                    <p className="mb-4 text-gray-700 line-clamp-3">
                      {project.description}
                    </p>

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
              <h3 className="mb-2 font-bold text-gray-900 text-2xl">
                No projects found
              </h3>
              <p className="mb-6 text-gray-600">
                Try selecting a different category
              </p>
              <Button
                onClick={() => setSelectedCategory('all')}
                className="bg-[#386851] text-white"
              >
                View All Projects
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* Project Capabilities Section */}
      <section className="bg-gray-50 dark:bg-gray-800 py-16 lg:py-24">
        <div className="mx-auto px-4 container">
          <FadeInWhenVisible>
            <div className="mb-12 text-center">
              <h2 className="mb-4 font-bold text-gray-900 dark:text-white text-4xl lg:text-5xl">
                Our Capabilities
              </h2>
              <p className="mx-auto max-w-3xl text-gray-600 dark:text-gray-300 text-xl">
                Diverse expertise across multiple construction markets
              </p>
            </div>
          </FadeInWhenVisible>

          <StaggeredFadeIn className="gap-6 grid md:grid-cols-2 lg:grid-cols-3 mx-auto max-w-7xl">
            {capabilities.map((capability, index) => (
              <Card
                key={index}
                className="bg-white dark:bg-gray-900 hover:shadow-lg dark:hover:shadow-gray-600/50 border border-gray-200 dark:border-gray-700 transition-all hover:-translate-y-1"
              >
                <CardHeader>
                  <MaterialIcon
                    icon={capability.icon}
                    size="2xl"
                    className="mb-3 text-brand-primary"
                  />
                  <CardTitle className="text-gray-900 dark:text-white text-lg">
                    {capability.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 dark:text-gray-300 text-sm">
                    {capability.description}
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
                <h2 className="mb-4 font-bold text-gray-900 dark:text-white text-4xl lg:text-5xl">
                  What Our Clients Say
                </h2>
                <p className="text-gray-600 dark:text-gray-300 text-xl">
                  Real feedback from real projects
                </p>
              </div>

              <div className="gap-8 grid md:grid-cols-2">
                {projects
                  .filter(p => p.clientTestimonial)
                  .slice(0, 4)
                  .map((project, index) => (
                    <Card
                      key={index}
                      className="bg-white dark:bg-gray-800 hover:shadow-lg dark:hover:shadow-gray-600/50 border border-gray-200 dark:border-gray-700 transition-shadow"
                    >
                      <CardContent className="p-6">
                        <div className="flex items-center mb-4">
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
                        <p className="mb-4 text-gray-700 dark:text-gray-300 italic">
                          "{project.clientTestimonial!.quote}"
                        </p>
                        <div className="pt-4 border-gray-200 dark:border-gray-600 border-t">
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

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-[#386851] to-[#2d5240] py-16 text-white">
        <div className="mx-auto px-4 container">
          <FadeInWhenVisible>
            <div className="mx-auto max-w-3xl text-center">
              <MaterialIcon
                icon="construction"
                size="4xl"
                className="mb-6 text-green-200"
              />
              <h2 className="mb-6 font-bold text-4xl">
                Ready to Start Your Project?
              </h2>
              <p className="mb-8 text-green-100 text-xl">
                Let's bring your vision to life with the same quality and
                dedication you see in our portfolio
              </p>
              <div className="flex sm:flex-row flex-col justify-center gap-4">
                <Link href="/contact">
                  <Button
                    size="lg"
                    className="bg-white hover:bg-green-50 text-[#1f3d2f]"
                  >
                    <MaterialIcon icon="phone" className="mr-2" size="md" />
                    Get Started Today
                  </Button>
                </Link>
                <Link href="/services">
                  <Button
                    size="lg"
                    variant="outline"
                    className="hover:bg-[#2d5240] border-white text-white"
                  >
                    <MaterialIcon icon="build" className="mr-2" size="md" />
                    View Our Services
                  </Button>
                </Link>
              </div>
              <p className="mt-6 text-green-200">
                <MaterialIcon icon="phone" className="inline mr-2" size="md" />
                (509) 308-6489 | 3111 N. Capital Ave., Pasco, WA 99301
              </p>
            </div>
          </FadeInWhenVisible>
        </div>
      </section>
    </div>
  )
}
