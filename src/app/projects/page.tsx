'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Calendar, MapPin, DollarSign, Clock, Star, Users, Hammer, Filter, Award } from 'lucide-react'

// Mock data for project showcases
const mockProjects = [
  {
    id: 'modern-family-home-pasco',
    title: 'Modern Family Home - Pasco Heights',
    description: 'A stunning 2,400 sq ft family home featuring open-concept living, energy-efficient design, and veteran-inspired craftsmanship. This project showcases our commitment to quality construction and attention to detail.',
    category: 'residential' as const,
    location: 'Pasco, WA',
    completionDate: '2024-11-30',
    budget: {
      range: '$400,000 - $500,000',
      actual: 475000
    },
    duration: {
      estimated: '4 months',
      actual: '3.5 months'
    },
    images: {
      before: ['/images/projects/pasco-home-before-1.jpg'],
      during: ['/images/projects/pasco-home-during-1.jpg', '/images/projects/pasco-home-during-2.jpg'],
      after: ['/images/projects/pasco-home-after-1.jpg', '/images/projects/pasco-home-after-2.jpg', '/images/projects/pasco-home-after-3.jpg'],
      featured: '/images/projects/pasco-home-featured.jpg'
    },
    testimonial: {
      quote: 'MH Construction exceeded our expectations in every way. Their military precision and attention to detail resulted in our dream home being completed ahead of schedule and within budget.',
      client: 'Jennifer & Mike Thompson',
      rating: 5
    },
    features: [
      'Open-concept kitchen and living area',
      'Energy-efficient windows and insulation',
      'Custom hardwood flooring',
      'Modern lighting throughout',
      'Landscaped front and backyard',
      'Two-car garage with storage'
    ],
    challenges: [
      'Challenging soil conditions requiring special foundation work',
      'Weather delays during Pacific Northwest winter',
      'Custom millwork requiring precise measurements'
    ],
    solutions: [
      'Engineered foundation system with proper drainage',
      'Flexible scheduling with weather protection systems',
      'On-site custom millwork shop for precision crafting'
    ],
    materials: ['Sustainable lumber', 'Energy-efficient windows', 'Composite decking', 'LED lighting'],
    team: ['Mark Harris - Project Manager', 'Jim Rodriguez - Lead Carpenter', 'Sarah Harris - Design Coordinator'],
    tags: ['new construction', 'residential', 'energy efficient', 'custom home'],
    seo: {
      metaTitle: 'Modern Family Home Construction - Pasco Heights | MH Construction',
      metaDescription: 'See our completed modern family home project in Pasco Heights. Quality construction, energy efficiency, and veteran craftsmanship.'
    }
  },
  {
    id: 'commercial-office-renovation',
    title: 'Commercial Office Renovation - Downtown Kennewick',
    description: 'Complete renovation of a 5,000 sq ft office space, transforming outdated facilities into a modern, functional workspace for a growing tech company.',
    category: 'commercial' as const,
    location: 'Kennewick, WA',
    completionDate: '2024-10-15',
    budget: {
      range: '$150,000 - $200,000',
      actual: 185000
    },
    duration: {
      estimated: '6 weeks',
      actual: '5 weeks'
    },
    images: {
      before: ['/images/projects/office-before-1.jpg', '/images/projects/office-before-2.jpg'],
      during: ['/images/projects/office-during-1.jpg'],
      after: ['/images/projects/office-after-1.jpg', '/images/projects/office-after-2.jpg'],
      featured: '/images/projects/office-featured.jpg'
    },
    testimonial: {
      quote: 'The team at MH Construction transformed our outdated office into a modern workspace that our employees love. The project was completed on time and the quality exceeded our expectations.',
      client: 'TechFlow Solutions',
      rating: 5
    },
    features: [
      'Open office layout with collaborative spaces',
      'Modern lighting and electrical systems',
      'Updated HVAC for improved efficiency',
      'Glass conference rooms',
      'Break room and kitchen facilities',
      'Accessible restroom upgrades'
    ],
    challenges: [
      'Working around occupied business operations',
      'Outdated electrical systems requiring full upgrade',
      'Tight timeline constraints'
    ],
    solutions: [
      'Phased construction to minimize business disruption',
      'Complete electrical system modernization',
      'Dedicated project management for timeline adherence'
    ],
    materials: ['Commercial-grade flooring', 'LED lighting systems', 'Glass partitions', 'Modern fixtures'],
    team: ['Mark Harris - Project Manager', 'Sarah Harris - Interior Coordination', 'Jim Rodriguez - Systems Installation'],
    tags: ['commercial', 'renovation', 'office space', 'modern design'],
    seo: {
      metaTitle: 'Commercial Office Renovation - Kennewick | MH Construction',
      metaDescription: 'Professional commercial office renovation in downtown Kennewick. Modern workspace design with minimal business disruption.'
    }
  },
  {
    id: 'kitchen-bathroom-remodel',
    title: 'Kitchen & Bathroom Remodel - Richland Home',
    description: 'Complete kitchen and master bathroom renovation featuring custom cabinetry, modern fixtures, and efficient space utilization in this 1980s home.',
    category: 'renovation' as const,
    location: 'Richland, WA',
    completionDate: '2024-09-20',
    budget: {
      range: '$80,000 - $100,000',
      actual: 92000
    },
    duration: {
      estimated: '8 weeks',
      actual: '7 weeks'
    },
    images: {
      before: ['/images/projects/remodel-before-1.jpg', '/images/projects/remodel-before-2.jpg'],
      during: ['/images/projects/remodel-during-1.jpg'],
      after: ['/images/projects/remodel-after-1.jpg', '/images/projects/remodel-after-2.jpg', '/images/projects/remodel-after-3.jpg'],
      featured: '/images/projects/remodel-featured.jpg'
    },
    testimonial: {
      quote: 'Our kitchen and bathroom look absolutely amazing! The MH Construction team was professional, clean, and delivered exactly what they promised. We love our new spaces.',
      client: 'Robert & Lisa Chen',
      rating: 5
    },
    features: [
      'Custom kitchen cabinetry with soft-close drawers',
      'Quartz countertops throughout',
      'Modern tile backsplash',
      'Updated plumbing and electrical',
      'Master bathroom with walk-in shower',
      'Energy-efficient fixtures and appliances'
    ],
    challenges: [
      'Limited space requiring creative design solutions',
      'Aging plumbing systems needing updates',
      'Matching existing home architecture'
    ],
    solutions: [
      'Custom cabinet design maximizing storage',
      'Complete plumbing system modernization',
      'Seamless integration with existing home style'
    ],
    materials: ['Custom cabinetry', 'Quartz countertops', 'Ceramic tile', 'Modern fixtures'],
    team: ['Sarah Harris - Design Lead', 'Jim Rodriguez - Cabinet Installation', 'Mark Harris - Project Coordination'],
    tags: ['renovation', 'kitchen remodel', 'bathroom remodel', 'custom cabinetry'],
    seo: {
      metaTitle: 'Kitchen & Bathroom Remodel - Richland WA | MH Construction',
      metaDescription: 'Beautiful kitchen and bathroom renovation in Richland. Custom cabinetry, modern fixtures, and expert craftsmanship.'
    }
  }
]

const projectCategories = [
  { id: 'all', name: 'All Projects', icon: Hammer, color: 'bg-gray-100 text-gray-800' },
  { id: 'residential', name: 'Residential', icon: Users, color: 'bg-blue-100 text-blue-800' },
  { id: 'commercial', name: 'Commercial', icon: Award, color: 'bg-green-100 text-green-800' },
  { id: 'renovation', name: 'Renovation', icon: Hammer, color: 'bg-purple-100 text-purple-800' },
  { id: 'emergency', name: 'Emergency', icon: Clock, color: 'bg-red-100 text-red-800' }
]

export default function ProjectShowcasePage() {
  const [selectedCategory, setSelectedCategory] = useState('all')

  const filteredProjects = mockProjects.filter(project => 
    selectedCategory === 'all' || project.category === selectedCategory
  )

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-900 to-blue-700 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl font-bold mb-6">
              Project Showcase
            </h1>
            <p className="text-xl text-blue-100 mb-8">
              Explore our completed construction projects and see the quality craftsmanship 
              and attention to detail that sets MH Construction apart.
            </p>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12">
        {/* Filter Controls */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="flex items-center gap-4 mb-4">
            <Filter className="h-5 w-5 text-blue-600" />
            <h3 className="text-lg font-semibold text-gray-900">Filter Projects</h3>
          </div>
          
          <div className="flex flex-wrap gap-3">
            {projectCategories.map(category => {
              const Icon = category.icon
              return (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`inline-flex items-center px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    selectedCategory === category.id
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  <Icon className="h-4 w-4 mr-2" />
                  {category.name}
                </button>
              )
            })}
          </div>
        </div>

        {/* Results Summary */}
        <div className="mb-8">
          <p className="text-gray-600">
            Showing {filteredProjects.length} project{filteredProjects.length !== 1 ? 's' : ''}
          </p>
        </div>

        {/* Projects Grid */}
        <div className="space-y-12">
          {filteredProjects.map(project => (
            <ProjectShowcaseCard key={project.id} project={project} />
          ))}
        </div>

        {/* No Results */}
        {filteredProjects.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <Hammer className="h-16 w-16 mx-auto" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No projects found</h3>
            <p className="text-gray-600 mb-4">
              Try selecting a different category to see our completed work.
            </p>
            <button
              onClick={() => setSelectedCategory('all')}
              className="text-blue-600 hover:text-blue-700 font-medium"
            >
              View all projects
            </button>
          </div>
        )}

        {/* Call to Action */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg shadow-lg p-8 mt-12 text-white text-center">
          <h3 className="text-2xl font-bold mb-4">Ready to Start Your Project?</h3>
          <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
            See how our veteran team can bring the same quality and attention to detail 
            to your construction project. Get your free consultation today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="bg-white text-blue-600 font-bold py-3 px-8 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Get Free Estimate
            </Link>
            <Link
              href="/services"
              className="border-2 border-white text-white font-bold py-3 px-8 rounded-lg hover:bg-white hover:text-blue-600 transition-colors"
            >
              View Services
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

function ProjectShowcaseCard({ project }: { project: typeof mockProjects[0] }) {
  const [selectedImageCategory, setSelectedImageCategory] = useState<'before' | 'during' | 'after'>('after')
  
  const categoryInfo = projectCategories.find(c => c.id === project.category) || projectCategories[1]
  const Icon = categoryInfo.icon
  
  const currentImages = project.images[selectedImageCategory] || []
  const [selectedImageIndex, setSelectedImageIndex] = useState(0)

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
      {/* Project Header */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-2">
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${categoryInfo.color}`}>
                <Icon className="h-4 w-4 inline mr-1" />
                {categoryInfo.name}
              </span>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              {project.title}
            </h2>
            <p className="text-gray-600 mb-4">
              {project.description}
            </p>
          </div>
          
          <div className="text-right">
            <div className="flex items-center text-yellow-500 mb-2">
              {[...Array(project.testimonial?.rating || 5)].map((_, i) => (
                <Star key={i} className="h-5 w-5 fill-current" />
              ))}
            </div>
            <p className="text-sm text-gray-600">Client Rating</p>
          </div>
        </div>
        
        {/* Project Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
          <div className="text-center p-3 bg-gray-50 rounded-lg">
            <MapPin className="h-5 w-5 text-blue-600 mx-auto mb-1" />
            <p className="text-sm font-medium text-gray-900">{project.location}</p>
            <p className="text-xs text-gray-600">Location</p>
          </div>
          <div className="text-center p-3 bg-gray-50 rounded-lg">
            <Calendar className="h-5 w-5 text-green-600 mx-auto mb-1" />
            <p className="text-sm font-medium text-gray-900">
              {new Date(project.completionDate).toLocaleDateString()}
            </p>
            <p className="text-xs text-gray-600">Completed</p>
          </div>
          <div className="text-center p-3 bg-gray-50 rounded-lg">
            <Clock className="h-5 w-5 text-purple-600 mx-auto mb-1" />
            <p className="text-sm font-medium text-gray-900">{project.duration.actual}</p>
            <p className="text-xs text-gray-600">Duration</p>
          </div>
          <div className="text-center p-3 bg-gray-50 rounded-lg">
            <DollarSign className="h-5 w-5 text-yellow-600 mx-auto mb-1" />
            <p className="text-sm font-medium text-gray-900">{project.budget.range}</p>
            <p className="text-xs text-gray-600">Budget</p>
          </div>
        </div>
      </div>

      {/* Image Gallery */}
      <div className="p-6">
        <div className="mb-4">
          <div className="flex gap-2 mb-4">
            {(['before', 'during', 'after'] as const).map(category => (
              <button
                key={category}
                onClick={() => {
                  setSelectedImageCategory(category)
                  setSelectedImageIndex(0)
                }}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  selectedImageCategory === category
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                } ${!project.images[category]?.length ? 'opacity-50 cursor-not-allowed' : ''}`}
                disabled={!project.images[category]?.length}
              >
                {category.charAt(0).toUpperCase() + category.slice(1)} ({project.images[category]?.length || 0})
              </button>
            ))}
          </div>
          
          {currentImages.length > 0 && (
            <div className="relative">
              <div className="relative aspect-video rounded-lg overflow-hidden mb-4">
                <Image
                  src={currentImages[selectedImageIndex]}
                  alt={`${project.title} - ${selectedImageCategory} ${selectedImageIndex + 1}`}
                  fill
                  className="object-cover"
                />
              </div>
              
              {currentImages.length > 1 && (
                <div className="flex gap-2 overflow-x-auto pb-2">
                  {currentImages.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImageIndex(index)}
                      className={`relative w-20 h-20 rounded-lg overflow-hidden flex-shrink-0 ${
                        selectedImageIndex === index ? 'ring-2 ring-blue-600' : ''
                      }`}
                    >
                      <Image
                        src={image}
                        alt={`Thumbnail ${index + 1}`}
                        fill
                        className="object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Project Details */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 p-6 bg-gray-50">
        {/* Features & Details */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-3">Project Features</h3>
          <ul className="space-y-2 mb-6">
            {project.features.map((feature, index) => (
              <li key={index} className="flex items-start gap-2 text-sm text-gray-700">
                <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                {feature}
              </li>
            ))}
          </ul>
          
          <h3 className="text-lg font-semibold text-gray-900 mb-3">Materials Used</h3>
          <div className="flex flex-wrap gap-2 mb-6">
            {project.materials.map((material, index) => (
              <span key={index} className="px-3 py-1 bg-white text-gray-700 text-sm rounded-full border">
                {material}
              </span>
            ))}
          </div>
        </div>

        {/* Testimonial & Team */}
        <div>
          {project.testimonial && (
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Client Testimonial</h3>
              <blockquote className="bg-white p-4 rounded-lg border-l-4 border-blue-600">
                <p className="text-gray-700 italic mb-2">&quot;{project.testimonial.quote}&quot;</p>
                <footer className="text-sm text-gray-600">
                  — {project.testimonial.client}
                </footer>
              </blockquote>
            </div>
          )}
          
          <h3 className="text-lg font-semibold text-gray-900 mb-3">Project Team</h3>
          <ul className="space-y-2">
            {project.team.map((member, index) => (
              <li key={index} className="flex items-center gap-2 text-sm text-gray-700">
                <Users className="h-4 w-4 text-blue-600" />
                {member}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}