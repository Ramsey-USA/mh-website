import Link from 'next/link'
import { Button, Card, CardHeader, CardTitle, CardContent } from '../components/ui'
import { PortfolioImage } from '../components/portfolio/ProjectImage'
import FeaturedProjectsSection from '../components/portfolio/FeaturedProjectsSection'
import { PortfolioService } from '../lib/services/portfolioService'
import { generateSEOMetadata, generateOrganizationStructuredData, StructuredData } from '../components/seo/seo-meta'
import TestimonialsWidget from '../components/TestimonialsWidget'
import { BoltIcon, CalendarIcon, UserIcon, ShieldIcon, CogIcon, StarIcon, HammerIcon, CheckIcon, ToolsIcon } from '../components/icons/SharpDuotoneIcons'
import ScrollReveal from '../components/animations/ScrollReveal'

// Generate metadata for the homepage
export const metadata = generateSEOMetadata({
  title: 'Home',
  description: 'MH Construction delivers exceptional residential, commercial, and industrial construction services throughout the Pacific Northwest. Get your free AI-powered estimate today.',
  keywords: [
    'construction services',
    'home builder',
    'commercial contractor',
    'renovation experts',
    'AI construction estimate',
    'Pacific Northwest construction'
  ]
})

export default function Home() {
  // Get featured projects for the homepage
  const featuredProjects = PortfolioService.getFeaturedProjects().slice(0, 3)

  return (
    <>
      {/* Add structured data for SEO */}
      <StructuredData data={generateOrganizationStructuredData()} />
      
      {/* Initialize scroll reveal animations */}
      <ScrollReveal />
      
      {/* Hero Section with Enhanced Theme Support */}
      <section className="relative py-20 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950 text-white overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-brand-primary/20 via-brand-secondary/10 to-brand-primary/20"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center scroll-reveal">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-white">
              Building Tomorrow with Today&apos;s Technology
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-gray-100 max-w-3xl mx-auto">
              Veteran-owned construction excellence powered by cutting-edge AI technology. 
              Serving the Pacific Northwest with military precision.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/booking" className="btn-primary btn-lg">
                Schedule Free Consultation
              </Link>
              <Link href="/estimator" className="btn-outline btn-lg" style={{ borderColor: 'white', color: 'white' }}>
                Get AI Estimate
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Company Stats Section with Enhanced Theme */}
      <section style={{ background: 'var(--color-background)', borderColor: 'var(--color-border)' }} className="py-12 border-t">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { number: "150+", label: "Years Combined Experience", icon: StarIcon },
              { number: "500+", label: "Projects Completed", icon: HammerIcon },
              { number: "24/7", label: "Emergency Support", icon: ShieldIcon },
              { number: "100%", label: "Veteran Owned", icon: CheckIcon }
            ].map((stat, index) => (
              <div key={index} className="text-center scroll-reveal" style={{ animationDelay: `${index * 0.1}s` }}>
                <div className="w-12 h-12 bg-gradient-to-br from-brand-primary to-brand-secondary rounded-lg flex items-center justify-center mx-auto mb-3 shadow-lg">
                  <stat.icon size="md" primaryColor="white" secondaryColor="rgba(255,255,255,0.7)" />
                </div>
                <div className="text-3xl md:text-4xl font-bold mb-1" style={{ color: 'var(--color-text-accent)' }}>
                  {stat.number}
                </div>
                <div className="text-sm md:text-base" style={{ color: 'var(--color-text-secondary)' }}>
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section with Theme Support */}
      <section style={{ background: 'var(--color-surface)' }} className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 scroll-reveal">
            <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ color: 'var(--color-text-accent)' }}>
              Revolutionary Construction Solutions
            </h2>
            <p className="text-lg md:text-xl max-w-2xl mx-auto" style={{ color: 'var(--color-text-secondary)' }}>
              Experience the future of construction with our AI-powered tools and veteran expertise
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="card-primary scroll-reveal">
              <div className="p-6">
                <div className="w-12 h-12 bg-brand-primary text-white rounded-lg flex items-center justify-center mb-4 shadow-lg">
                  <BoltIcon size="lg" primaryColor="currentColor" secondaryColor="rgba(255,255,255,0.6)" />
                </div>
                <h3 className="text-lg font-semibold mb-3" style={{ color: 'var(--color-text-accent)' }}>AI Project Estimator</h3>
                <p style={{ color: 'var(--color-text-secondary)' }}>
                  Get accurate project estimates with our revolutionary AI-powered cost calculator. 
                  ±15% precision guaranteed.
                </p>
              </div>
            </div>

            <div className="card-primary scroll-reveal">
              <div className="p-6">
                <div className="w-12 h-12 bg-brand-secondary text-white rounded-lg flex items-center justify-center mb-4 shadow-lg">
                  <CalendarIcon size="lg" primaryColor="currentColor" secondaryColor="rgba(255,255,255,0.6)" />
                </div>
                <h3 className="text-lg font-semibold mb-3" style={{ color: 'var(--brand-secondary)' }}>Smart Scheduling</h3>
                <p style={{ color: 'var(--color-text-secondary)' }}>
                  Book your free consultation with our visual calendar system. 
                  Real-time availability and instant confirmations.
                </p>
              </div>
            </div>

            <div className="card-primary scroll-reveal">
              <div className="p-6">
                <div className="w-12 h-12 bg-brand-primary text-white rounded-lg flex items-center justify-center mb-4 shadow-lg">
                  <HammerIcon size="lg" primaryColor="currentColor" secondaryColor="rgba(255,255,255,0.6)" />
                </div>
                <h3 className="text-lg font-semibold mb-3" style={{ color: 'var(--color-text-accent)' }}>3D Project Explorer</h3>
                <p style={{ color: 'var(--color-text-secondary)' }}>
                  Immersive project tours with HD visualization and real-time builder insights. 
                  See your vision come to life.
                </p>
              </div>
            </div>

            <div className="card-primary scroll-reveal">
              <div className="p-6">
                <div className="w-12 h-12 bg-brand-secondary text-white rounded-lg flex items-center justify-center mb-4 shadow-lg">
                  <UserIcon size="lg" primaryColor="currentColor" secondaryColor="rgba(255,255,255,0.6)" />
                </div>
                <h3 className="text-lg font-semibold mb-3" style={{ color: 'var(--brand-secondary)' }}>24/7 AI Assistant</h3>
                <p style={{ color: 'var(--color-text-secondary)' }}>
                  Military-grade support with our enhanced chatbot. 
                  Context-aware responses and veteran-specific assistance.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Military Values Section with Theme Support */}
      <section style={{ background: 'var(--color-background)' }} className="py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 scroll-reveal">
            <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ color: 'var(--color-text-accent)' }}>
              Built on Military Values
            </h2>
            <p className="text-lg md:text-xl" style={{ color: 'var(--color-text-secondary)' }}>
              150+ years of combined expertise guided by unwavering principles
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { 
                value: 'Integrity', 
                icon: ShieldIcon, 
                description: 'We conduct business with unwavering honesty and moral principles, ensuring every project reflects our commitment to doing what is right.'
              },
              { 
                value: 'Excellence', 
                icon: StarIcon, 
                description: 'We pursue perfection in every detail, delivering superior craftsmanship that exceeds expectations and stands the test of time.'
              },
              { 
                value: 'Service', 
                icon: ToolsIcon, 
                description: 'We serve our clients and community with dedication, putting their needs first and treating every project as our mission.'
              },
              { 
                value: 'Leadership', 
                icon: CheckIcon, 
                description: 'We lead by example in the construction industry, setting standards for innovation, safety, and professional excellence.'
              },
              { 
                value: 'Accountability', 
                icon: CogIcon, 
                description: 'We take full responsibility for our work and commitments, ensuring transparency and reliability in every interaction.'
              },
              { 
                value: 'Teamwork', 
                icon: HammerIcon, 
                description: 'We build success through collaboration, leveraging diverse skills and perspectives to achieve exceptional results together.'
              }
            ].map((item, index) => {
              const IconComponent = item.icon;
              return (
                <div key={item.value} className="group scroll-reveal" style={{ animationDelay: `${index * 0.1}s` }}>
                  <div className="card-primary h-full p-6 cursor-pointer transition-all duration-300 hover:transform hover:scale-105">
                    <div className="text-center">
                      <div className="w-16 h-16 bg-gradient-to-br from-brand-primary to-brand-secondary rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg group-hover:shadow-xl transition-shadow duration-300">
                        <IconComponent 
                          size="lg" 
                          primaryColor="white" 
                          secondaryColor="rgba(255,255,255,0.7)"
                        />
                      </div>
                      <h3 className="text-xl font-bold mb-3" style={{ color: 'var(--color-text-accent)' }}>
                        {item.value}
                      </h3>
                      <p className="leading-relaxed" style={{ color: 'var(--color-text-secondary)' }}>
                        {item.description}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Featured Projects Section */}
      <FeaturedProjectsSection featuredProjects={featuredProjects} />

      {/* Client Testimonials with Theme Support */}
      <section style={{ background: 'var(--color-surface)' }} className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 scroll-reveal">
            <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ color: 'var(--color-text-accent)' }}>
              What Our Clients Say
            </h2>
            <p className="text-lg md:text-xl max-w-2xl mx-auto" style={{ color: 'var(--color-text-secondary)' }}>
              Read testimonials from satisfied customers across the Pacific Northwest
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {[
              {
                name: "Sarah Thompson",
                location: "Spokane, WA",
                project: "Home Renovation",
                rating: 5,
                review: "MH Construction transformed our 1920s home with incredible attention to detail. Their military precision and professionalism made the entire process seamless.",
                image: "/images/testimonials/sarah-t.jpg"
              },
              {
                name: "Mike Chen",
                location: "Yakima, WA",
                project: "Kitchen Remodel",
                rating: 5,
                review: "The AI cost estimator was spot-on, and the quality of work exceeded our expectations. Highly recommend for any construction project.",
                image: "/images/testimonials/mike-c.jpg"
              },
              {
                name: "Jessica Rodriguez",
                location: "Spokane, WA",
                project: "Bathroom Addition",
                rating: 5,
                review: "As a fellow veteran, I appreciated their understanding of our needs. The team went above and beyond to deliver exceptional results.",
                image: "/images/testimonials/jessica-r.jpg"
              }
            ].map((testimonial, index) => (
              <div key={index} className="card-primary scroll-reveal" style={{ animationDelay: `${index * 0.2}s` }}>
                <div className="p-6">
                  <div className="flex items-start space-x-4 mb-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-brand-primary to-brand-secondary rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-white font-bold text-lg">{testimonial.name.charAt(0)}</span>
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-base" style={{ color: 'var(--color-text-accent)' }}>
                        {testimonial.name}
                      </h3>
                      <p className="text-sm" style={{ color: 'var(--color-text-muted)' }}>
                        {testimonial.location} • {testimonial.project}
                      </p>
                    </div>
                    <div className="flex space-x-1">
                      {Array.from({ length: testimonial.rating }).map((_, i) => (
                        <StarIcon key={i} size="sm" primaryColor="#BD9264" secondaryColor="rgba(189, 146, 100, 0.4)" />
                      ))}
                    </div>
                  </div>
                  <blockquote className="text-base italic leading-relaxed" style={{ color: 'var(--color-text-primary)' }}>
                    "{testimonial.review}"
                  </blockquote>
                </div>
              </div>
            ))}
          </div>
          
          <div className="text-center scroll-reveal">
            <Link href="/testimonials" className="btn-outline btn-lg">
              View All Testimonials
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section with Enhanced Theme Gradient */}
      <section className="py-16 bg-gradient-to-r from-brand-primary via-brand-primary-dark to-brand-secondary text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div className="scroll-reveal">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Build Your Dream Project?
            </h2>
            <p className="text-xl md:text-2xl mb-8 text-gray-100">
              Get started with a free consultation and AI-powered estimate today
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/booking" className="btn-secondary btn-xl">
                Schedule Consultation
              </Link>
              <Link href="/estimator" className="btn-outline btn-xl" style={{ borderColor: 'white', color: 'white' }}>
                Get Free Estimate
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}