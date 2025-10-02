'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Button } from '../../components/ui/Button'
import { PortfolioImage } from '../../components/portfolio/ProjectImage'
import { ProjectPortfolio } from '../../lib/types'
import { PortfolioService } from '../../lib/services/portfolioService'
import {
  WPZoomHomeIcon as HomeIcon,
  WPZoomToolsIcon as ToolsIcon,
  WPZoomStarIcon as StarIcon,
  WPZoomShieldIcon as ShieldIcon,
  WPZoomHammerIcon as HammerIcon,
  WPZoomCheckIcon as CheckIcon,
  WPZoomArrowRightIcon as ArrowRightIcon,
  WPZoomBoltIcon as BoltIcon,
} from '../../components/icons/WPZoomIcons'
import {
  FadeInWhenVisible,
  StaggeredFadeIn,
  HoverScale,
} from '../../components/animations/FramerMotionComponents'

export default function PortfolioPage() {
  const [projects, setProjects] = useState<ProjectPortfolio[]>([])
  const [filteredProjects, setFilteredProjects] = useState<ProjectPortfolio[]>(
    []
  )
  const [activeFilter, setActiveFilter] = useState<string>('all')
  const [loading, setLoading] = useState(false)

  // Load projects on component mount
  useEffect(() => {
    const allProjects = PortfolioService.getAllProjects()
    setProjects(allProjects)
    setFilteredProjects(allProjects)
  }, [])

  const categories = [
    { id: 'all', label: 'All Projects' },
    { id: 'residential', label: 'Residential' },
    { id: 'commercial', label: 'Commercial' },
    { id: 'renovation', label: 'Renovations' },
    { id: 'custom', label: 'Custom Builds' },
  ]

  useEffect(() => {
    filterProjects(activeFilter)
  }, [activeFilter, projects])

  const filterProjects = (category: string) => {
    const filtered = PortfolioService.getProjectsByCategory(category)
    setFilteredProjects(filtered)
  }

  const handleFilterChange = (category: string) => {
    setActiveFilter(category)
    setLoading(true)
    // Simulate loading delay for better UX
    setTimeout(() => setLoading(false), 300)
  }

  return (
    <>
      {/* Hero Section */}
      <section className="relative bg-white dark:bg-gray-900 h-screen hero-section">
        {/* Background Elements */}
        <div className="absolute inset-0 opacity-10">
          <div
            className="absolute inset-0 bg-repeat"
            style={{
              backgroundImage:
                'url(\'data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="0.1"%3E%3Ccircle cx="7" cy="7" r="2"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\')',
            }}
          />
        </div>
        <div className="top-20 right-20 absolute bg-brand-primary/5 blur-3xl rounded-full w-32 h-32"></div>
        <div className="bottom-20 left-20 absolute bg-brand-secondary/5 blur-3xl rounded-full w-40 h-40"></div>

        {/* Main Content Container */}
        <div className="z-10 relative flex justify-center items-center mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-8 max-w-7xl h-full">
          <FadeInWhenVisible className="w-full text-center">
            {/* Hero Title */}
            <h1 className="mb-6 pb-2 font-black text-gray-900 dark:text-white text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl leading-relaxed tracking-tighter hero-title">
              <span className="block mb-3 font-semibold text-gray-700 dark:text-gray-300 text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl tracking-tight">
                Excellence in Every
              </span>
              <span className="block bg-clip-text bg-gradient-to-r from-brand-primary via-brand-secondary to-brand-primary drop-shadow-sm font-black text-transparent">
                Construction Project
              </span>
            </h1>

            {/* Hero Description */}
            <p className="mx-auto mb-8 max-w-4xl font-light text-gray-600 dark:text-gray-300 text-xl sm:text-2xl md:text-3xl lg:text-4xl leading-relaxed tracking-wide">
              Discover exceptional projects crafted by our{' '}
              <span className="font-medium text-gray-800 dark:text-gray-200">
                veteran construction team
              </span>
              . From luxury homes to commercial complexes, each project
              represents our commitment to{' '}
              <span className="bg-clip-text bg-gradient-to-r from-brand-primary to-brand-secondary font-semibold text-transparent">
                quality, precision, and veteran excellence
              </span>
              .
            </p>

            {/* CTA Buttons */}
            <div className="flex sm:flex-row flex-col justify-center items-center gap-8 mb-8">
              <Button variant="primary" size="xl" className="shadow-xl">
                <BoltIcon size="sm" color="currentColor" className="mr-3" />
                <span className="z-10 relative tracking-wide">
                  Start Your Project
                </span>
              </Button>
              <Button variant="outline" size="xl" className="shadow-xl">
                <HomeIcon size="sm" color="currentColor" className="mr-3" />
                <span className="z-10 relative tracking-wide">
                  View All Projects
                </span>
              </Button>
            </div>

            {/* Trust Indicators */}
            <StaggeredFadeIn className="flex flex-wrap justify-center items-center gap-10 font-medium text-gray-700 dark:text-gray-300 text-base">
              {[
                { icon: HammerIcon, text: '500+ Projects Completed' },
                { icon: ShieldIcon, text: 'Veteran-Owned & Operated' },
                { icon: StarIcon, text: '4.9/5 Client Satisfaction' },
                { icon: CheckIcon, text: 'Licensed & Insured' },
              ].map((indicator, index) => {
                const IconComponent = indicator.icon
                return (
                  <div
                    key={index}
                    className="flex items-center bg-white/10 dark:bg-gray-800/30 backdrop-blur-sm px-4 py-2 border border-gray-200/20 dark:border-gray-700/30 rounded-full"
                  >
                    <IconComponent
                      size="sm"
                      color="currentColor"
                      className="mr-3 text-brand-primary dark:text-brand-primary-light"
                    />
                    <span className="tracking-wide">{indicator.text}</span>
                  </div>
                )
              })}
            </StaggeredFadeIn>
          </FadeInWhenVisible>
        </div>

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
      </section>

      {/* Featured Projects Section */}
      <section className="relative bg-white dark:bg-gray-900 py-20 lg:py-32 xl:py-40 featured-projects-section">
        <div className="relative mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <FadeInWhenVisible className="mb-20 text-center">
            <h2 className="mb-8 font-black text-gray-900 dark:text-gray-100 text-5xl sm:text-6xl md:text-7xl leading-tight tracking-tighter">
              <span className="block mb-4 font-semibold text-gray-700 dark:text-gray-300 text-3xl sm:text-4xl md:text-5xl tracking-tight">
                Featured Projects
              </span>
              <span className="block bg-clip-text bg-gradient-to-r from-brand-primary via-brand-secondary to-brand-primary drop-shadow-sm font-black text-transparent">
                Construction Excellence Across the PNW
              </span>
            </h2>
            <p className="mx-auto max-w-4xl font-light text-gray-600 dark:text-gray-300 text-xl md:text-2xl leading-relaxed">
              Showcasing our construction excellence across the Pacific
              Northwest. Each project reflects our commitment to quality,
              precision, and veteran-owned leadership.
            </p>
          </FadeInWhenVisible>
        </div>
      </section>

      {/* Enhanced Filter Section */}
      <section className="relative bg-gray-50 dark:bg-gray-800 filter-section py-20 lg:py-32">
        <div className="relative mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <FadeInWhenVisible className="mb-16 text-center">
            <h2 className="mb-6 font-black text-gray-900 dark:text-gray-100 text-3xl sm:text-4xl md:text-5xl lg:text-6xl leading-tight tracking-tighter">
              <span className="bg-clip-text bg-gradient-to-r from-brand-primary to-brand-secondary drop-shadow-sm font-black text-transparent">
                Explore Our Work
              </span>
            </h2>
            <p className="mx-auto mb-12 max-w-3xl font-light text-gray-600 dark:text-gray-300 text-xl leading-relaxed">
              Filter our portfolio by project type to see the full range of our
              construction expertise.
            </p>

            {/* Enhanced Filter Buttons */}
            <div className="flex flex-wrap justify-center gap-4">
              {categories.map(category => (
                <HoverScale key={category.id}>
                  <Button
                    variant={
                      activeFilter === category.id ? 'primary' : 'outline'
                    }
                    size="lg"
                    onClick={() => handleFilterChange(category.id)}
                    className="shadow-lg min-w-[140px]"
                  >
                    {category.label}
                  </Button>
                </HoverScale>
              ))}
            </div>
          </FadeInWhenVisible>
        </div>
      </section>

      {/* Enhanced Projects Grid */}
      <section className="relative bg-white dark:bg-gray-900 py-20 lg:py-32 xl:py-40 projects-section">
        <div className="relative mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          {loading ? (
            <FadeInWhenVisible className="flex justify-center py-20">
              <div className="border-4 border-t-brand-primary border-brand-primary/20 rounded-full w-16 h-16 animate-spin"></div>
            </FadeInWhenVisible>
          ) : (
            <StaggeredFadeIn className="gap-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
              {filteredProjects.map(project => (
                <HoverScale key={project.id}>
                  <div className="group bg-white dark:bg-gray-800 shadow-lg hover:shadow-2xl border border-gray-200/20 dark:border-gray-700/30 rounded-2xl overflow-hidden transition-all duration-300">
                    {/* Project Image */}
                    <div className="relative h-64 overflow-hidden">
                      {project.images && project.images.length > 0 ? (
                        <PortfolioImage
                          src={project.images[0].url}
                          alt={project.images[0].alt || project.title}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                      ) : (
                        <div className="flex justify-center items-center bg-gray-200 dark:bg-gray-700 w-full h-full">
                          <HammerIcon
                            size="lg"
                            className="w-16 h-16 text-gray-400"
                          />
                        </div>
                      )}

                      <div className="top-4 left-4 absolute">
                        <span className="bg-brand-primary px-3 py-1 rounded-full font-semibold text-white text-sm">
                          {project.category}
                        </span>
                      </div>
                    </div>

                    {/* Project Content */}
                    <div className="p-8">
                      <div className="mb-4">
                        <h3 className="mb-2 font-black text-brand-primary dark:text-brand-primary-light text-xl line-clamp-2 leading-tight">
                          {project.title}
                        </h3>
                        <p className="mb-3 text-gray-600 dark:text-gray-300 text-sm line-clamp-3 leading-relaxed">
                          {project.description}
                        </p>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex justify-between items-center">
                        <div className="flex items-center space-x-3">
                          <div className="flex items-center">
                            {[...Array(5)].map((_, i) => (
                              <StarIcon
                                key={i}
                                size="sm"
                                className="fill-current w-4 h-4 text-yellow-400"
                              />
                            ))}
                          </div>
                          <span className="font-medium text-gray-700 dark:text-gray-300 text-sm">
                            5.0
                          </span>
                        </div>
                        <Link href={`/portfolio/${project.seoMetadata.slug}`}>
                          <Button variant="outline" size="sm" className="group">
                            View Details
                            <ArrowRightIcon className="ml-1 w-4 h-4 transition-transform group-hover:translate-x-1 duration-200" />
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </div>
                </HoverScale>
              ))}
            </StaggeredFadeIn>
          )}

          {/* No Results State */}
          {!loading && filteredProjects.length === 0 && (
            <FadeInWhenVisible className="py-20 text-center">
              <HammerIcon
                size="lg"
                className="mx-auto mb-6 w-16 h-16 text-gray-400 dark:text-gray-600"
              />
              <h3 className="mb-4 font-semibold text-gray-700 dark:text-gray-300 text-xl">
                No projects found
              </h3>
              <p className="mx-auto mb-6 max-w-md text-gray-500 dark:text-gray-400">
                We don't have any projects in this category yet. Please try a
                different filter or check back later.
              </p>
              <Button
                variant="outline"
                className="mt-6"
                onClick={() => handleFilterChange('all')}
              >
                View All Projects
              </Button>
            </FadeInWhenVisible>
          )}
        </div>
      </section>

      {/* Call to Action */}
      {/* Enhanced Call to Action Section */}
      <section className="relative bg-gradient-to-br from-brand-primary via-brand-primary-dark to-brand-secondary py-20 lg:py-32 cta-section">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.1)_0%,transparent_50%)]"></div>

        <div className="relative mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl text-center">
          <FadeInWhenVisible>
            <h2 className="mb-6 font-black text-white text-3xl sm:text-4xl md:text-5xl lg:text-6xl leading-tight tracking-tighter">
              Ready to Start Your Project?
            </h2>
            <p className="mb-8 font-light text-gray-200 text-xl md:text-2xl leading-relaxed">
              Join hundreds of satisfied clients who trust our veteran-owned
              team with their construction needs.
            </p>
            <div className="flex sm:flex-row flex-col justify-center gap-6">
              <HoverScale>
                <Button
                  variant="outline"
                  size="xl"
                  className="bg-transparent hover:bg-white shadow-xl border-white text-white hover:text-brand-primary"
                >
                  <BoltIcon size="md" color="currentColor" className="mr-3" />
                  <span className="z-10 relative tracking-wide">
                    Get Free Estimate
                  </span>
                </Button>
              </HoverScale>
              <Link href="/contact">
                <HoverScale>
                  <Button variant="primary" size="xl" className="shadow-xl">
                    <HomeIcon size="md" color="currentColor" className="mr-3" />
                    <span className="z-10 relative tracking-wide">
                      Schedule Consultation
                    </span>
                  </Button>
                </HoverScale>
              </Link>
            </div>
          </FadeInWhenVisible>
        </div>
      </section>
    </>
  )
}
