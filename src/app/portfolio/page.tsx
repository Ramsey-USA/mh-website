'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { Button, Card, CardContent } from '../../components/ui'
import { PortfolioImage } from '../../components/portfolio/ProjectImage'
import { ProjectPortfolio } from '../../lib/types'
import { PortfolioService } from '../../lib/services/portfolioService'

export default function PortfolioPage() {
  const [projects, setProjects] = useState<ProjectPortfolio[]>([])
  const [filteredProjects, setFilteredProjects] = useState<ProjectPortfolio[]>([])
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
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-brand-primary text-white py-20">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl font-tactic-bold mb-6">
              Our Portfolio
            </h1>
            <p className="text-xl text-blue-100 mb-8">
              Discover the exceptional projects we&apos;ve crafted for our clients. 
              From luxury homes to commercial complexes, each project represents 
              our commitment to quality, precision, and veteran excellence.
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-sm">
              <span className="bg-blue-800/50 px-4 py-2 rounded-full">
                🏗️ 500+ Projects Completed
              </span>
              <span className="bg-blue-800/50 px-4 py-2 rounded-full">
                🇺🇸 Veteran-Owned & Operated
              </span>
              <span className="bg-blue-800/50 px-4 py-2 rounded-full">
                ⭐ 4.9/5 Client Satisfaction
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Filter Section */}
      <section className="py-12 bg-white border-b">
        <div className="container mx-auto px-6">
          <div className="flex flex-wrap justify-center gap-4">
            {categories.map((category) => (
              <Button
                key={category.id}
                variant={activeFilter === category.id ? 'primary' : 'secondary'}
                onClick={() => handleFilterChange(category.id)}
                className="min-w-[120px]"
              >
                {category.label}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          {loading ? (
            <div className="flex justify-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-primary"></div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProjects.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
          )}

          {filteredProjects.length === 0 && !loading && (
            <div className="text-center py-20">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-xl font-semibold text-gray-700 mb-2">
                No projects found
              </h3>
              <p className="text-gray-500">
                Try selecting a different category or check back soon for new projects.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-gray-900 text-white">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-tactic-bold mb-4">
            Ready to Start Your Project?
          </h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Let our experienced team bring your vision to life with the same 
            quality and attention to detail shown in our portfolio.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/estimator">
              <Button size="lg" variant="primary">
                Get Free Estimate
              </Button>
            </Link>
            <Link href="/booking">
              <Button size="lg" variant="secondary">
                Schedule Consultation
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

function ProjectCard({ project }: { project: ProjectPortfolio }) {
  const featuredImage = project.images.find(img => img.isFeatured) || project.images[0]
  
  return (
    <Card className="group hover:shadow-lg transition-shadow duration-300 overflow-hidden">
      <div className="relative h-64 overflow-hidden">
        {featuredImage ? (
          <PortfolioImage
            src={featuredImage.url}
            alt={featuredImage.alt}
            className="group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-full bg-gray-200 flex items-center justify-center">
            <div className="text-4xl text-gray-400">🏗️</div>
          </div>
        )}
        
        {/* Category Badge */}
        <div className="absolute top-4 left-4">
          <span className="bg-brand-primary text-white text-xs font-semibold px-3 py-1 rounded-full capitalize">
            {project.category}
          </span>
        </div>

        {/* Featured Badge */}
        {project.isFeatured && (
          <div className="absolute top-4 right-4">
            <span className="bg-yellow-500 text-white text-xs font-semibold px-3 py-1 rounded-full">
              Featured
            </span>
          </div>
        )}
      </div>

      <CardContent className="p-6">
        <div className="mb-4">
          <h3 className="text-xl font-semibold mb-2 group-hover:text-brand-primary transition-colors">
            {project.title}
          </h3>
          <p className="text-gray-600 text-sm line-clamp-3">
            {project.description}
          </p>
        </div>

        <div className="space-y-3 text-sm text-gray-500">
          <div className="flex items-center justify-between">
            <span>📍 {project.location.city}, {project.location.state}</span>
            {project.details.squareFootage && (
              <span>📏 {project.details.squareFootage.toLocaleString()} sq ft</span>
            )}
          </div>
          
          <div className="flex items-center justify-between">
            <span>⏱️ {project.details.duration}</span>
            <span className="font-medium text-brand-primary">
              {project.details.budget.isPublic ? project.details.budget.range : 'Budget Available'}
            </span>
          </div>

          {project.clientTestimonial && (
            <div className="flex items-center">
              <span>⭐ {project.clientTestimonial.rating}/5</span>
              <span className="ml-2 text-gray-400">- {project.clientTestimonial.clientName}</span>
            </div>
          )}
        </div>

        <div className="mt-4 pt-4 border-t">
          <div className="flex flex-wrap gap-2 mb-4">
            {project.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded capitalize"
              >
                {tag}
              </span>
            ))}
            {project.tags.length > 3 && (
              <span className="text-gray-400 text-xs">
                +{project.tags.length - 3} more
              </span>
            )}
          </div>

          <Link href={`/portfolio/${project.seoMetadata.slug}`}>
            <Button variant="secondary" className="w-full group-hover:bg-brand-primary group-hover:text-white transition-colors">
              View Project Details
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  )
}