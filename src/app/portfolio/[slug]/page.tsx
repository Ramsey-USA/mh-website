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
      <div className="flex justify-center items-center bg-gray-50 min-h-screen">
        <div className="text-center">
          <div className="mb-4 text-6xl">🔍</div>
          <h1 className="mb-2 font-semibold text-gray-700 text-2xl">
            Project Not Found
          </h1>
          <p className="mb-6 text-gray-500">
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

      <div className="bg-gray-50 min-h-screen">
        {/* Breadcrumb */}
        <div className="bg-white border-b">
          <div className="mx-auto px-6 py-4 container">
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
              <span className="font-medium text-brand-primary">
                {project.title}
              </span>
            </nav>
          </div>
        </div>

        <div className="mx-auto px-6 py-12 container">
          <div className="gap-12 grid grid-cols-1 lg:grid-cols-2">
            {/* Image Gallery */}
            <div className="space-y-4">
              {/* Main Image */}
              <div className="relative bg-gray-200 rounded-lg h-96 lg:h-[600px] overflow-hidden">
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
                  <div className="flex justify-center items-center w-full h-full">
                    <div className="text-gray-400 text-6xl">🏗️</div>
                  </div>
                )}
              </div>

              {/* Image Thumbnails */}
              {project.images.length > 1 && (
                <div className="gap-2 grid grid-cols-4">
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
                <p className="text-gray-600 text-sm italic">
                  {activeImage.caption}
                </p>
              )}
            </div>

            {/* Project Information */}
            <div className="space-y-8">
              {/* Header */}
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <span className="bg-brand-primary px-3 py-1 rounded-full font-semibold text-white text-sm capitalize">
                    {project.category}
                  </span>
                  {project.subcategory && (
                    <span className="bg-gray-100 px-3 py-1 rounded-full text-gray-600 text-sm">
                      {project.subcategory}
                    </span>
                  )}
                  {project.isFeatured && (
                    <span className="bg-yellow-500 px-3 py-1 rounded-full font-semibold text-white text-sm">
                      Featured
                    </span>
                  )}
                </div>

                <h1 className="mb-4 font-tactic-bold text-gray-900 text-4xl">
                  {project.title}
                </h1>

                <p className="text-gray-600 text-lg leading-relaxed">
                  {project.description}
                </p>
              </div>

              {/* Project Stats */}
              <div className="gap-6 grid grid-cols-2">
                <div>
                  <h3 className="mb-2 font-semibold text-gray-500 text-sm uppercase tracking-wide">
                    Location
                  </h3>
                  <p className="text-lg">
                    📍 {project.location.city}, {project.location.state}
                  </p>
                </div>

                <div>
                  <h3 className="mb-2 font-semibold text-gray-500 text-sm uppercase tracking-wide">
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
                  <h3 className="mb-2 font-semibold text-gray-500 text-sm uppercase tracking-wide">
                    Duration
                  </h3>
                  <p className="text-lg">⏱️ {project.details.duration}</p>
                </div>

                {project.details.squareFootage && (
                  <div>
                    <h3 className="mb-2 font-semibold text-gray-500 text-sm uppercase tracking-wide">
                      Size
                    </h3>
                    <p className="text-lg">
                      📏 {project.details.squareFootage.toLocaleString()} sq ft
                    </p>
                  </div>
                )}

                {project.details.budget.isPublic && (
                  <div>
                    <h3 className="mb-2 font-semibold text-gray-500 text-sm uppercase tracking-wide">
                      Investment
                    </h3>
                    <p className="text-lg">💰 {project.details.budget.range}</p>
                  </div>
                )}
              </div>

              {/* Features */}
              <div>
                <h3 className="mb-4 font-semibold text-xl">Key Features</h3>
                <div className="gap-2 grid grid-cols-1 sm:grid-cols-2">
                  {project.details.features.map((feature, index) => (
                    <div key={index} className="flex items-center">
                      <span className="mr-2 text-green-500">✓</span>
                      <span className="text-gray-700">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Materials */}
              <div>
                <h3 className="mb-4 font-semibold text-xl">Materials Used</h3>
                <div className="flex flex-wrap gap-2">
                  {project.details.materials.map((material, index) => (
                    <span
                      key={index}
                      className="bg-gray-100 px-3 py-1 rounded-full text-gray-700 text-sm"
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
                    <h3 className="mb-4 font-semibold text-xl">
                      Project Challenges
                    </h3>
                    <ul className="space-y-2">
                      {project.details.challenges.map((challenge, index) => (
                        <li key={index} className="flex items-start">
                          <span className="mt-1 mr-2 text-orange-500">⚡</span>
                          <span className="text-gray-700">{challenge}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

              {/* Tags */}
              <div>
                <h3 className="mb-4 font-semibold text-xl">Project Tags</h3>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="bg-brand-primary/10 px-3 py-1 rounded-full font-medium text-brand-primary text-sm capitalize"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Call to Action */}
              <div className="flex sm:flex-row flex-col gap-4 pt-6 border-t">
                <Link href="/estimator" className="flex-1">
                  <Button variant="primary" className="w-full">
                    Get Similar Estimate
                  </Button>
                </Link>
                <Link href="/booking" className="flex-1">
                  <Button variant="primary" className="w-full">
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
                  <div className="mx-auto max-w-4xl text-center">
                    <div className="flex justify-center mb-4">
                      {[...Array(project.clientTestimonial.rating)].map(
                        (_, i) => (
                          <span key={i} className="text-yellow-400 text-xl">
                            ⭐
                          </span>
                        )
                      )}
                    </div>

                    <blockquote className="mb-6 text-xl italic leading-relaxed">
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
            <h3 className="mb-6 font-semibold text-2xl">
              Explore More Projects
            </h3>
            <Link href="/portfolio">
              <Button variant="outline" size="lg">
                ← Back to Portfolio
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}
