'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Button } from '../ui'
import { PortfolioImage } from '../portfolio/ProjectImage'

interface ProjectFiltersProps {
  featuredProjects: any[]
}

export default function FeaturedProjectsSection({ featuredProjects }: ProjectFiltersProps) {
  const [activeFilter, setActiveFilter] = useState('All')
  
  const categories = ['All', 'Residential', 'Commercial', 'Renovation']
  
  const filteredProjects = activeFilter === 'All' 
    ? featuredProjects 
    : featuredProjects.filter(project => 
        project.category.toLowerCase() === activeFilter.toLowerCase()
      )

  return (
    <section className="section-features py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 scroll-reveal">
          <h2 className="text-responsive-3xl font-tactic-bold text-mh-primary mb-6">
            Featured Projects
          </h2>
          <p className="text-responsive-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-8">
            Discover our exceptional work and see why clients trust MH Construction with their most important projects. Each project represents our commitment to quality, innovation, and client satisfaction.
          </p>
          
          {/* Project Category Filters */}
          <div className="project-filters scroll-reveal">
            {categories.map((filter) => (
              <button 
                key={filter}
                className={`project-filter ${filter === activeFilter ? 'active' : ''}`}
                onClick={() => setActiveFilter(filter)}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>

        <div className="projects-grid">
          {filteredProjects.map((project, index) => (
            <div 
              key={project.seoMetadata.slug} 
              className="project-card project-card-animate scroll-reveal" 
              style={{ animationDelay: `${index * 0.15}s` }}
            >
              <Link href={`/portfolio/${project.seoMetadata.slug}`}>
                {/* Project Image */}
                <div className="project-card-image">
                  <PortfolioImage
                    src={project.images[0]?.url || '/placeholder-construction.jpg'}
                    alt={project.title}
                    className="object-cover w-full h-full"
                  />
                  
                  {/* Category Badge */}
                  <div className="project-badge">
                    {project.category.charAt(0).toUpperCase() + project.category.slice(1)}
                  </div>
                  
                  {/* Hover Overlay with Stats */}
                  <div className="project-card-overlay">
                    <h3 className="text-2xl font-bold text-white mb-3">
                      {project.title}
                    </h3>
                    <p className="text-white/90 mb-4 text-center">
                      {project.description}
                    </p>
                    
                    <div className="project-card-stats">
                      <div className="project-stat">
                        <span className="project-stat-number">
                          {project.details.duration || '8'}
                        </span>
                        <span className="project-stat-label">Weeks</span>
                      </div>
                      <div className="project-stat">
                        <span className="project-stat-number">
                          {project.details.squareFootage || '2,500'}
                        </span>
                        <span className="project-stat-label">Sq Ft</span>
                      </div>
                      <div className="project-stat">
                        <span className="project-stat-number">
                          {new Date(project.details.completionDate || '2024-01-01').getFullYear()}
                        </span>
                        <span className="project-stat-label">Year</span>
                      </div>
                    </div>
                    
                    <div className="mt-6">
                      <span className="inline-flex items-center px-6 py-3 bg-white/25 backdrop-blur-md rounded-full text-white font-semibold border border-white/40 shadow-lg transition-all duration-300 hover:bg-white/35 hover:scale-105">
                        View Project Details →
                      </span>
                    </div>
                  </div>
                </div>
                
                {/* Project Content */}
                <div className="project-card-content">
                  <h3 className="project-title">
                    {project.title}
                  </h3>
                  <p className="project-description">
                    {project.description.substring(0, 120)}...
                  </p>
                  <div className="project-meta">
                    <span className="project-location">
                      📍 {project.location.city}, {project.location.state}
                    </span>
                    {project.details.completionDate && (
                      <span className="text-gray-500">
                        Completed {new Date(project.details.completionDate).getFullYear()}
                      </span>
                    )}
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>

        {/* Enhanced Portfolio CTA */}
        <div className="text-center scroll-reveal">
          <div className="bg-gradient-to-r from-mh-primary/10 to-mh-secondary/10 rounded-2xl p-8 mb-8">
            <h3 className="text-2xl font-bold text-mh-primary mb-4">
              Explore Our Complete Portfolio
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-6 max-w-2xl mx-auto">
              Browse through our extensive collection of residential, commercial, and specialty projects. Each project showcases our dedication to craftsmanship and client satisfaction.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/portfolio">
                <Button className="btn-primary transition-all duration-300 hover:scale-105" size="lg" withRing>
                  View All Projects
                </Button>
              </Link>
              <Link href="/contact">
                <Button className="btn-outline transition-all duration-300 hover:scale-105" size="lg" withRing>
                  Start Your Project
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}