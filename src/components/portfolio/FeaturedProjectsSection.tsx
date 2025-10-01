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
    <section className="relative bg-white dark:bg-gray-900 py-20 lg:py-32 xl:py-40 featured-projects-section">
      <ScrollReveal />

      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-gray-50/50 dark:from-gray-800/30 to-transparent"></div>
      <div className="top-20 right-20 absolute bg-brand-primary/5 blur-3xl rounded-full w-32 h-32"></div>
      <div className="bottom-40 left-20 absolute bg-brand-secondary/5 blur-3xl rounded-full w-40 h-40"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_75%,rgba(56,104,81,0.05)_0%,transparent_50%)] opacity-60"></div>

      <div className="relative mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <div className="mb-24 text-center scroll-reveal">
          {/* Enhanced Section Badge */}
          <div className="inline-flex items-center bg-brand-primary/10 dark:bg-brand-primary/20 shadow-lg mb-10 px-8 py-4 border border-brand-primary/20 rounded-full">
            <HammerIcon size="md" primaryColor="var(--brand-primary)" />
            <span className="ml-4 font-black text-brand-primary text-sm uppercase tracking-wider letterspacing-widest">
              Featured Excellence
            </span>
          </div>

          <h2 className="mb-10 font-black text-gray-900 dark:text-gray-100 text-5xl sm:text-6xl md:text-7xl lg:text-8xl leading-tight tracking-tighter">
            <span className="block mb-4 font-semibold text-gray-700 dark:text-gray-300 text-3xl sm:text-4xl md:text-5xl lg:text-6xl tracking-tight">
              Showcase of
            </span>
            <span className="block bg-clip-text bg-gradient-to-r from-brand-primary to-brand-secondary drop-shadow-sm text-transparent">
              Craftsmanship
            </span>
          </h2>
          <p className="mx-auto mb-16 max-w-5xl font-light text-gray-600 dark:text-gray-300 text-xl md:text-2xl lg:text-3xl leading-relaxed tracking-wide">
            Discover our exceptional work and see why clients trust MH
            Construction with their most important projects. Each project
            represents our commitment to{' '}
            <span className="font-medium text-gray-800 dark:text-gray-200">
              military precision
            </span>{' '}
            and{' '}
            <span className="bg-clip-text bg-gradient-to-r from-brand-primary to-brand-secondary font-semibold text-transparent">
              veteran excellence
            </span>
            .
          </p>

          {/* Enhanced Project Category Filters */}
          <div className="flex flex-wrap justify-center items-center gap-4 mb-16 scroll-reveal">
            {categories.map(filter => (
              <button
                key={filter}
                className={`group relative px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 ${
                  filter === activeFilter
                    ? 'bg-gradient-to-r from-brand-primary to-brand-secondary text-white shadow-xl transform scale-105'
                    : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-2 border-gray-200 dark:border-gray-700 hover:border-brand-primary dark:hover:border-brand-primary hover:text-brand-primary dark:hover:text-brand-primary hover:shadow-lg'
                }`}
                onClick={() => setActiveFilter(filter)}
              >
                <span className="z-10 relative tracking-wide">{filter}</span>
                {filter === activeFilter && (
                  <div className="absolute inset-0 bg-gradient-to-r from-brand-primary/20 to-brand-secondary/20 blur-lg rounded-xl"></div>
                )}
              </button>
            ))}
          </div>
        </div>

        <div className="gap-8 lg:gap-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mb-20">
          {filteredProjects.map((project, index) => (
            <div
              key={project.seoMetadata.slug}
              className="group scroll-reveal"
              style={{ animationDelay: `${index * 0.15}s` }}
            >
              <Link
                href={`/portfolio/${project.seoMetadata.slug}`}
                className="block h-full"
              >
                <div className="bg-white dark:bg-gray-800 shadow-lg hover:shadow-2xl rounded-2xl h-full overflow-hidden transition-all duration-500">
                  {/* Enhanced Project Image Container */}
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <PortfolioImage
                      src={
                        project.images[0]?.url ||
                        '/images/placeholder-project.jpg'
                      }
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />

                    {/* Enhanced Category Badge */}
                    <div className="top-4 left-4 absolute flex items-center bg-brand-primary/90 shadow-lg backdrop-blur-sm px-4 py-2 rounded-full text-white">
                      <HammerIcon
                        size="xs"
                        primaryColor="white"
                        className="mr-2"
                      />
                      <span className="font-bold text-sm uppercase tracking-wide">
                        {project.category.charAt(0).toUpperCase() +
                          project.category.slice(1)}
                      </span>
                    </div>

                    {/* Enhanced Hover Overlay */}
                    <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 p-8 transition-opacity duration-500">
                      <div className="transition-transform translate-y-8 group-hover:translate-y-0 duration-500 transform">
                        <h3 className="drop-shadow-lg mb-4 font-black text-white text-2xl md:text-3xl lg:text-4xl leading-tight tracking-tight">
                          {project.title}
                        </h3>
                        <p className="drop-shadow-md mb-6 font-light text-gray-100 text-lg md:text-xl leading-relaxed tracking-wide">
                          {project.description}
                        </p>

                        {/* Project Stats Grid */}
                        <div className="gap-4 grid grid-cols-3 mb-6">
                          <div className="text-center">
                            <CalendarIcon
                              size="sm"
                              primaryColor="white"
                              className="mx-auto mb-2"
                            />
                            <div className="font-black text-white text-lg md:text-xl">
                              {project.details.duration || '8'}
                            </div>
                            <div className="font-medium text-gray-200 text-xs uppercase tracking-wider">
                              Weeks
                            </div>
                          </div>
                          <div className="text-center">
                            <CheckIcon
                              size="sm"
                              primaryColor="white"
                              className="mx-auto mb-2"
                            />
                            <div className="font-black text-white text-lg md:text-xl">
                              {project.details.squareFootage || '2,500'}
                            </div>
                            <div className="font-medium text-gray-200 text-xs uppercase tracking-wider">
                              Sq Ft
                            </div>
                          </div>
                          <div className="text-center">
                            <StarIcon
                              size="sm"
                              primaryColor="white"
                              className="mx-auto mb-2"
                            />
                            <div className="font-black text-white text-lg md:text-xl">
                              {new Date(
                                project.details.completionDate || '2024-01-01'
                              ).getFullYear()}
                            </div>
                            <div className="font-medium text-gray-200 text-xs uppercase tracking-wider">
                              Year
                            </div>
                          </div>
                        </div>

                        {/* Enhanced CTA Button */}
                        <div className="text-center">
                          <div className="inline-flex items-center bg-white/10 hover:bg-white backdrop-blur-sm px-6 py-3 border border-white/20 rounded-xl font-bold text-white hover:text-brand-primary text-lg transition-all duration-300">
                            <BoltIcon
                              size="sm"
                              primaryColor="currentColor"
                              className="mr-2"
                            />
                            <span>View Project Details</span>
                            <svg
                              className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1 duration-300"
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
                  <div className="bg-white dark:bg-gray-800 p-8 border-gray-100 dark:border-gray-700 border-t">
                    <h3 className="mb-4 font-black text-gray-900 dark:text-gray-100 group-hover:text-brand-primary text-xl md:text-2xl lg:text-3xl leading-tight tracking-tight transition-colors duration-300">
                      {project.title}
                    </h3>
                    <p className="mb-6 font-light text-gray-600 dark:text-gray-400 text-base md:text-lg leading-relaxed tracking-wide">
                      {project.description.substring(0, 120)}...
                    </p>
                    <div className="flex flex-wrap justify-between items-center gap-4">
                      <div className="flex items-center text-gray-500 dark:text-gray-400">
                        <svg
                          className="mr-2 w-5 h-5 text-brand-primary"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
                        </svg>
                        <span className="font-medium text-sm md:text-base tracking-wide">
                          {project.location.city}, {project.location.state}
                        </span>
                      </div>
                      {project.details.completionDate && (
                        <div className="flex items-center text-gray-500 dark:text-gray-400">
                          <CheckIcon
                            size="sm"
                            primaryColor="var(--brand-secondary)"
                            className="mr-2"
                          />
                          <span className="font-medium text-sm md:text-base tracking-wide">
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
        <div className="mt-20 scroll-reveal">
          <div className="relative bg-gradient-to-br from-brand-primary via-brand-primary-dark to-brand-secondary p-12 lg:p-16 rounded-3xl overflow-hidden">
            {/* Background Decoration */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.1)_0%,transparent_70%)]"></div>
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(56,104,81,0.1)_0%,transparent_70%)] opacity-60"></div>
            <div className="top-8 right-8 absolute bg-white/10 blur-2xl rounded-full w-20 h-20"></div>
            <div className="bottom-8 left-8 absolute bg-white/5 blur-2xl rounded-full w-24 h-24"></div>

            <div className="z-10 relative text-center">
              {/* CTA Badge */}
              <div className="inline-flex items-center bg-white/10 backdrop-blur-sm mb-8 px-6 py-3 border border-white/20 rounded-full">
                <StarIcon size="md" primaryColor="white" />
                <span className="ml-3 font-black text-white text-sm uppercase tracking-wider letterspacing-widest">
                  Complete Portfolio
                </span>
              </div>

              <h3 className="mb-8 font-black text-white text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-tight tracking-tighter">
                <span className="block mb-3 font-semibold text-gray-100 text-2xl sm:text-3xl md:text-4xl lg:text-5xl tracking-tight">
                  Explore Our Complete
                </span>
                <span className="block drop-shadow-lg text-brand-secondary-light">
                  Portfolio
                </span>
              </h3>
              <p className="mx-auto mb-12 max-w-4xl font-light text-gray-100 text-xl md:text-2xl lg:text-3xl leading-relaxed tracking-wide">
                Browse through our extensive collection of{' '}
                <span className="font-medium text-white">
                  residential, commercial, and specialty projects
                </span>
                . Each project showcases our dedication to{' '}
                <span className="font-semibold text-brand-secondary-light">
                  military precision
                </span>{' '}
                and{' '}
                <span className="font-semibold text-brand-secondary-light">
                  veteran craftsmanship
                </span>{' '}
                with cutting-edge technology.
              </p>

              <div className="flex sm:flex-row flex-col justify-center items-center gap-6 mb-12">
                <Link href="/portfolio">
                  <Button variant="secondary" size="xl" className="shadow-xl">
                    <HammerIcon
                      size="md"
                      primaryColor="currentColor"
                      className="mr-3"
                    />
                    <span className="z-10 relative tracking-wide">
                      View All Projects
                    </span>
                  </Button>
                </Link>
                <Link href="/contact">
                  <Button
                    variant="outline"
                    size="xl"
                    className="bg-transparent hover:bg-white shadow-xl border-white text-white hover:text-brand-primary"
                  >
                    <BoltIcon
                      size="md"
                      primaryColor="currentColor"
                      className="mr-3"
                    />
                    <span className="z-10 relative tracking-wide">
                      Start Your Project
                    </span>
                  </Button>
                </Link>
              </div>

              {/* Trust Indicators */}
              <div className="gap-8 grid grid-cols-1 md:grid-cols-3 pt-8 border-white/20 border-t">
                {[
                  { icon: CheckIcon, text: '500+ Projects Completed' },
                  { icon: StarIcon, text: '150+ Years Experience' },
                  { icon: HammerIcon, text: 'Veteran-Owned Excellence' },
                ].map((item, index) => (
                  <div
                    key={index}
                    className="flex flex-col items-center text-white/90"
                  >
                    <div className="flex justify-center items-center bg-white/10 backdrop-blur-sm mb-3 border border-white/20 rounded-full w-16 h-16">
                      <item.icon size="lg" primaryColor="white" />
                    </div>
                    <span className="font-bold text-lg text-center tracking-wide">
                      {item.text}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
