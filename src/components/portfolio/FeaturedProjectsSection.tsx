'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Button } from '../ui'
import { PortfolioImage } from '../portfolio/ProjectImage'
import {
  HammerIcon,
  CheckIcon,
  StarIcon,
  BoltIcon,
  CalendarIcon,
} from '../icons/SharpDuotoneIcons'
import ScrollReveal from '../animations/ScrollReveal'

interface ProjectFiltersProps {
  featuredProjects: any[]
}

export default function FeaturedProjectsSection({
  featuredProjects,
}: ProjectFiltersProps) {
  const [activeFilter, setActiveFilter] = useState('All')

  const categories = ['All', 'Residential', 'Commercial', 'Renovation']

  const filteredProjects =
    activeFilter === 'All'
      ? featuredProjects
      : featuredProjects.filter(
          project =>
            project.category.toLowerCase() === activeFilter.toLowerCase()
        )

  return (
    <section className="featured-projects-section py-32 bg-white dark:bg-gray-900 relative overflow-hidden">
      <ScrollReveal />

      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-gray-50/50 to-transparent dark:from-gray-800/30"></div>
      <div className="absolute top-20 right-20 w-32 h-32 bg-brand-primary/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-40 left-20 w-40 h-40 bg-brand-secondary/5 rounded-full blur-3xl"></div>
      <div className="absolute inset-0 bg-[url('/images/patterns/grid.svg')] opacity-5 dark:opacity-10"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center mb-24 scroll-reveal">
          {/* Enhanced Section Badge */}
          <div className="inline-flex items-center px-6 py-3 mb-8 bg-brand-primary/10 dark:bg-brand-primary/20 rounded-full">
            <HammerIcon size="md" primaryColor="var(--brand-primary)" />
            <span className="ml-3 text-sm font-bold text-brand-primary uppercase tracking-wide">
              Featured Excellence
            </span>
          </div>

          <h2
            className="text-5xl md:text-6xl font-bold mb-8"
            style={{ color: 'var(--color-text-accent)' }}
          >
            Showcase of
            <span className="block bg-gradient-to-r from-brand-primary to-brand-secondary bg-clip-text text-transparent">
              Craftsmanship
            </span>
          </h2>
          <p
            className="text-xl md:text-2xl max-w-4xl mx-auto leading-relaxed mb-12"
            style={{ color: 'var(--color-text-secondary)' }}
          >
            Discover our exceptional work and see why clients trust MH
            Construction with their most important projects. Each project
            represents our commitment to{' '}
            <span className="text-brand-primary font-semibold">
              military precision
            </span>{' '}
            and
            <span className="text-brand-secondary font-semibold">
              {' '}
              veteran excellence
            </span>
            .
          </p>

          {/* Enhanced Project Category Filters */}
          <div className="project-filters-enhanced scroll-reveal">
            {categories.map(filter => (
              <button
                key={filter}
                className={`project-filter-btn ${filter === activeFilter ? 'active' : ''}`}
                onClick={() => setActiveFilter(filter)}
              >
                <span className="relative z-10">{filter}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="projects-grid-enhanced">
          {filteredProjects.map((project, index) => (
            <div
              key={project.seoMetadata.slug}
              className="project-card-enhanced group scroll-reveal"
              style={{ animationDelay: `${index * 0.15}s` }}
            >
              <Link
                href={`/portfolio/${project.seoMetadata.slug}`}
                className="block h-full"
              >
                <div className="project-card-inner">
                  {/* Enhanced Project Image Container */}
                  <div className="project-image-container">
                    <PortfolioImage
                      src={
                        project.images[0]?.url ||
                        '/images/placeholder-project.jpg'
                      }
                      alt={project.title}
                      className="project-image"
                    />

                    {/* Enhanced Category Badge */}
                    <div className="project-category-badge">
                      <HammerIcon size="xs" primaryColor="white" />
                      <span className="ml-1">
                        {project.category.charAt(0).toUpperCase() +
                          project.category.slice(1)}
                      </span>
                    </div>

                    {/* Enhanced Hover Overlay */}
                    <div className="project-overlay">
                      <div className="project-overlay-content">
                        <h3 className="project-overlay-title">
                          {project.title}
                        </h3>
                        <p className="project-overlay-description">
                          {project.description}
                        </p>

                        {/* Project Stats Grid */}
                        <div className="project-stats-grid">
                          <div className="project-stat-item">
                            <CalendarIcon size="sm" primaryColor="white" />
                            <div className="project-stat-content">
                              <span className="project-stat-number">
                                {project.details.duration || '8'}
                              </span>
                              <span className="project-stat-label">Weeks</span>
                            </div>
                          </div>
                          <div className="project-stat-item">
                            <CheckIcon size="sm" primaryColor="white" />
                            <div className="project-stat-content">
                              <span className="project-stat-number">
                                {project.details.squareFootage || '2,500'}
                              </span>
                              <span className="project-stat-label">Sq Ft</span>
                            </div>
                          </div>
                          <div className="project-stat-item">
                            <StarIcon size="sm" primaryColor="white" />
                            <div className="project-stat-content">
                              <span className="project-stat-number">
                                {new Date(
                                  project.details.completionDate || '2024-01-01'
                                ).getFullYear()}
                              </span>
                              <span className="project-stat-label">Year</span>
                            </div>
                          </div>
                        </div>

                        {/* Enhanced CTA Button */}
                        <div className="project-cta-container">
                          <div className="project-cta-button">
                            <BoltIcon size="sm" primaryColor="currentColor" />
                            <span className="ml-2">View Project Details</span>
                            <svg
                              className="w-4 h-4 ml-2 transition-transform duration-300 group-hover:translate-x-1"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M9 5l7 7-7 7"
                              />
                            </svg>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Enhanced Project Content */}
                  <div className="project-content-enhanced">
                    <h3 className="project-title-enhanced">{project.title}</h3>
                    <p className="project-description-enhanced">
                      {project.description.substring(0, 120)}...
                    </p>
                    <div className="project-meta-enhanced">
                      <div className="project-location-enhanced">
                        <svg
                          className="w-4 h-4 text-brand-primary"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
                        </svg>
                        <span>
                          {project.location.city}, {project.location.state}
                        </span>
                      </div>
                      {project.details.completionDate && (
                        <div className="project-completion-enhanced">
                          <CheckIcon
                            size="xs"
                            primaryColor="var(--brand-secondary)"
                          />
                          <span>
                            Completed{' '}
                            {new Date(
                              project.details.completionDate
                            ).getFullYear()}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>

        {/* Enhanced Portfolio CTA Section */}
        <div className="portfolio-cta-enhanced scroll-reveal">
          <div className="portfolio-cta-container">
            <div className="portfolio-cta-content">
              {/* Background Decoration */}
              <div className="absolute inset-0 bg-gradient-to-br from-brand-primary/10 via-brand-secondary/5 to-brand-primary/10 rounded-3xl"></div>
              <div className="absolute top-6 right-6 w-16 h-16 bg-brand-secondary/10 rounded-full blur-2xl"></div>
              <div className="absolute bottom-6 left-6 w-20 h-20 bg-brand-primary/10 rounded-full blur-2xl"></div>

              <div className="relative z-10">
                {/* CTA Badge */}
                <div className="inline-flex items-center px-4 py-2 mb-6 bg-brand-primary/15 rounded-full">
                  <StarIcon size="sm" primaryColor="var(--brand-primary)" />
                  <span className="ml-2 text-sm font-bold text-brand-primary uppercase tracking-wide">
                    Complete Portfolio
                  </span>
                </div>

                <h3 className="portfolio-cta-title">
                  Explore Our Complete
                  <span className="text-brand-secondary"> Portfolio</span>
                </h3>
                <p className="portfolio-cta-description">
                  Browse through our extensive collection of residential,
                  commercial, and specialty projects. Each project showcases our
                  dedication to{' '}
                  <span className="text-brand-primary font-semibold">
                    military precision
                  </span>{' '}
                  and
                  <span className="text-brand-secondary font-semibold">
                    veteran craftsmanship
                  </span>{' '}
                  with cutting-edge technology.
                </p>

                <div className="portfolio-cta-buttons">
                  <Link href="/portfolio" className="portfolio-cta-btn primary">
                    <HammerIcon size="sm" primaryColor="currentColor" />
                    <span className="relative z-10 ml-2">
                      View All Projects
                    </span>
                  </Link>
                  <Link href="/contact" className="portfolio-cta-btn secondary">
                    <BoltIcon size="sm" primaryColor="currentColor" />
                    <span className="relative z-10 ml-2">
                      Start Your Project
                    </span>
                  </Link>
                </div>

                {/* Trust Indicators */}
                <div className="portfolio-trust-indicators">
                  {[
                    { icon: CheckIcon, text: '500+ Projects Completed' },
                    { icon: StarIcon, text: '150+ Years Experience' },
                    { icon: HammerIcon, text: 'Veteran-Owned Excellence' },
                  ].map((item, index) => (
                    <div key={index} className="trust-indicator">
                      <item.icon
                        size="sm"
                        primaryColor="var(--brand-primary)"
                      />
                      <span>{item.text}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
