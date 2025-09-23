'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { useParams, useRouter } from 'next/navigation'
import { Button, Card, CardContent } from '../../../components/ui'
import { ProjectImage } from '../../../components/portfolio/ProjectImage'
import { ProjectPortfolio } from '../../../lib/types'
import { PortfolioService } from '../../../lib/services/portfolioService'
import {
  generateProjectStructuredData,
  generateBreadcrumbStructuredData,
  StructuredData,
} from '../../../components/seo/seo-meta'

export default function ProjectDetailPage() {
  const params = useParams()
  const router = useRouter()
  const [activeImageIndex, setActiveImageIndex] = useState(0)

  // Find project by slug using the service
  const project = PortfolioService.getProjectBySlug(params.slug as string)

  if (!project) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">🔍</div>
          <h1 className="text-2xl font-semibold text-gray-700 mb-2">
            Project Not Found
          </h1>
          <p className="text-gray-500 mb-6">
            The project you&apos;re looking for doesn&apos;t exist or has been
            moved.
          </p>
          <Link href="/portfolio">
            <Button variant="primary">Back to Portfolio</Button>
          </Link>
        </div>
      </div>
    )
  }

  const activeImage = project.images[activeImageIndex]

  // Generate breadcrumb data
  const breadcrumbData = generateBreadcrumbStructuredData([
    { name: 'Home', url: '/' },
    { name: 'Portfolio', url: '/portfolio' },
    { name: project.title, url: `/portfolio/${project.seoMetadata.slug}` },
  ])

  // Convert project data for structured data (dates need to be strings)
  const projectForStructuredData = {
    title: project.title,
    description: project.description,
    details: {
      startDate: undefined, // Not available in current ProjectDetails type
      completionDate: project.details.completionDate?.toISOString(),
    },
    location: {
      city: project.location.city,
      state: project.location.state,
    },
    tags: project.tags,
    category: project.category,
    images: project.images.map(img => ({
      url: img.url,
      caption: img.caption,
    })),
  }

  return (
    <>
      {/* SEO Structured Data */}
      <StructuredData
        data={generateProjectStructuredData(projectForStructuredData)}
      />
      <StructuredData data={breadcrumbData} />

      <div className="min-h-screen bg-gray-50">
        {/* Breadcrumb */}
        <div className="bg-white border-b">
          <div className="container mx-auto px-6 py-4">
            <nav className="flex items-center space-x-2 text-sm">
              <Link href="/" className="text-gray-500 hover:text-brand-primary">
                Home
              </Link>
              <span className="text-gray-400">/</span>
              <Link
                href="/portfolio"
                className="text-gray-500 hover:text-brand-primary"
              >
                Portfolio
              </Link>
              <span className="text-gray-400">/</span>
              <span className="text-brand-primary font-medium">
                {project.title}
              </span>
            </nav>
          </div>
        </div>

        <div className="container mx-auto px-6 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Image Gallery */}
            <div className="space-y-4">
              {/* Main Image */}
              <div className="relative h-96 lg:h-[600px] rounded-lg overflow-hidden bg-gray-200">
                {activeImage ? (
                  <ProjectImage
                    src={activeImage.url}
                    alt={activeImage.alt}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    priority
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <div className="text-6xl text-gray-400">🏗️</div>
                  </div>
                )}
              </div>

              {/* Image Thumbnails */}
              {project.images.length > 1 && (
                <div className="grid grid-cols-4 gap-2">
                  {project.images.map((image, index) => (
                    <button
                      key={image.id}
                      onClick={() => setActiveImageIndex(index)}
                      className={`relative h-20 rounded-md overflow-hidden border-2 transition-colors ${
                        index === activeImageIndex
                          ? 'border-brand-primary'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <ProjectImage
                        src={image.url}
                        alt={image.alt}
                        fill
                        className="object-cover"
                        sizes="120px"
                      />
                    </button>
                  ))}
                </div>
              )}

              {/* Image Caption */}
              {activeImage?.caption && (
                <p className="text-sm text-gray-600 italic">
                  {activeImage.caption}
                </p>
              )}
            </div>

            {/* Project Information */}
            <div className="space-y-8">
              {/* Header */}
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <span className="bg-brand-primary text-white text-sm font-semibold px-3 py-1 rounded-full capitalize">
                    {project.category}
                  </span>
                  {project.subcategory && (
                    <span className="bg-gray-100 text-gray-600 text-sm px-3 py-1 rounded-full">
                      {project.subcategory}
                    </span>
                  )}
                  {project.isFeatured && (
                    <span className="bg-yellow-500 text-white text-sm font-semibold px-3 py-1 rounded-full">
                      Featured
                    </span>
                  )}
                </div>

                <h1 className="text-4xl font-tactic-bold text-gray-900 mb-4">
                  {project.title}
                </h1>

                <p className="text-lg text-gray-600 leading-relaxed">
                  {project.description}
                </p>
              </div>

              {/* Project Stats */}
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-2">
                    Location
                  </h3>
                  <p className="text-lg">
                    📍 {project.location.city}, {project.location.state}
                  </p>
                </div>

                <div>
                  <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-2">
                    Completion
                  </h3>
                  <p className="text-lg">
                    📅{' '}
                    {project.details.completionDate.toLocaleDateString(
                      'en-US',
                      {
                        year: 'numeric',
                        month: 'long',
                      }
                    )}
                  </p>
                </div>

                <div>
                  <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-2">
                    Duration
                  </h3>
                  <p className="text-lg">⏱️ {project.details.duration}</p>
                </div>

                {project.details.squareFootage && (
                  <div>
                    <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-2">
                      Size
                    </h3>
                    <p className="text-lg">
                      📏 {project.details.squareFootage.toLocaleString()} sq ft
                    </p>
                  </div>
                )}

                {project.details.budget.isPublic && (
                  <div>
                    <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-2">
                      Investment
                    </h3>
                    <p className="text-lg">💰 {project.details.budget.range}</p>
                  </div>
                )}
              </div>

              {/* Features */}
              <div>
                <h3 className="text-xl font-semibold mb-4">Key Features</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {project.details.features.map((feature, index) => (
                    <div key={index} className="flex items-center">
                      <span className="text-green-500 mr-2">✓</span>
                      <span className="text-gray-700">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Materials */}
              <div>
                <h3 className="text-xl font-semibold mb-4">Materials Used</h3>
                <div className="flex flex-wrap gap-2">
                  {project.details.materials.map((material, index) => (
                    <span
                      key={index}
                      className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm"
                    >
                      {material}
                    </span>
                  ))}
                </div>
              </div>

              {/* Challenges (if any) */}
              {project.details.challenges &&
                project.details.challenges.length > 0 && (
                  <div>
                    <h3 className="text-xl font-semibold mb-4">
                      Project Challenges
                    </h3>
                    <ul className="space-y-2">
                      {project.details.challenges.map((challenge, index) => (
                        <li key={index} className="flex items-start">
                          <span className="text-orange-500 mr-2 mt-1">⚡</span>
                          <span className="text-gray-700">{challenge}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

              {/* Tags */}
              <div>
                <h3 className="text-xl font-semibold mb-4">Project Tags</h3>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="bg-brand-primary/10 text-brand-primary px-3 py-1 rounded-full text-sm font-medium capitalize"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Call to Action */}
              <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t">
                <Link href="/estimator" className="flex-1">
                  <Button variant="primary" className="w-full">
                    Get Similar Estimate
                  </Button>
                </Link>
                <Link href="/booking" className="flex-1">
                  <Button variant="secondary" className="w-full">
                    Schedule Consultation
                  </Button>
                </Link>
              </div>
            </div>
          </div>

          {/* Client Testimonial */}
          {project.clientTestimonial && (
            <div className="mt-16">
              <Card className="bg-gradient-to-r from-brand-primary to-blue-600 text-white">
                <CardContent className="p-8">
                  <div className="max-w-4xl mx-auto text-center">
                    <div className="flex justify-center mb-4">
                      {[...Array(project.clientTestimonial.rating)].map(
                        (_, i) => (
                          <span key={i} className="text-yellow-400 text-xl">
                            ⭐
                          </span>
                        )
                      )}
                    </div>

                    <blockquote className="text-xl italic mb-6 leading-relaxed">
                      &ldquo;{project.clientTestimonial.quote}&rdquo;
                    </blockquote>

                    <div>
                      <p className="font-semibold text-lg">
                        {project.clientTestimonial.clientName}
                      </p>
                      {project.clientTestimonial.clientTitle && (
                        <p className="text-blue-100">
                          {project.clientTestimonial.clientTitle}
                        </p>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Related Projects / Back to Portfolio */}
          <div className="mt-16 text-center">
            <h3 className="text-2xl font-semibold mb-6">
              Explore More Projects
            </h3>
            <Link href="/portfolio">
              <Button variant="secondary" size="lg">
                ← Back to Portfolio
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}
