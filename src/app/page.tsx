import Link from 'next/link'
import { Button, Card, CardHeader, CardTitle, CardContent } from '../components/ui'
import { PortfolioImage } from '../components/portfolio/ProjectImage'
import { PortfolioService } from '../lib/services/portfolioService'
import { generateSEOMetadata, generateOrganizationStructuredData, StructuredData } from '../components/seo/seo-meta'
import TestimonialsWidget from '../components/TestimonialsWidget'
import { BoltIcon, CalendarIcon, UserIcon, ShieldIcon, CogIcon, StarIcon, HammerIcon, CheckIcon } from '../components/icons/SharpDuotoneIcons'
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
      
      {/* Hero Section */}
      <section className="section-hero text-white py-20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center scroll-reveal">
            <h1 className="text-responsive-4xl font-tactic-bold mb-6 text-white">
              Building Tomorrow with Today&apos;s Technology
            </h1>
            <p className="text-responsive-xl mb-8 text-gray-100 max-w-3xl mx-auto">
              Veteran-owned construction excellence powered by cutting-edge AI technology. 
              Serving the Pacific Northwest with military precision.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/booking">
                <Button className="btn-secondary transition-all duration-300 hover:scale-105" size="lg" withRing>
                  Schedule Free Consultation
                </Button>
              </Link>
              <Link href="/estimator">
                <Button className="btn-outline bg-white text-mh-primary hover:bg-gray-100 border-white transition-all duration-300 hover:scale-105" size="lg" withRing>
                  Get AI Estimate
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Company Stats Section */}
      <section className="stats-section py-12 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { number: "150+", label: "Years Combined Experience", icon: StarIcon },
              { number: "500+", label: "Projects Completed", icon: HammerIcon },
              { number: "24/7", label: "Emergency Support", icon: ShieldIcon },
              { number: "100%", label: "Veteran Owned", icon: CheckIcon }
            ].map((stat, index) => (
              <div key={index} className="text-center scroll-reveal" style={{ animationDelay: `${index * 0.1}s` }}>
                <div className="w-12 h-12 bg-gradient-to-br from-mh-primary to-mh-secondary rounded-lg flex items-center justify-center mx-auto mb-3 shadow-lg">
                  <stat.icon size="md" primaryColor="white" secondaryColor="rgba(255,255,255,0.7)" />
                </div>
                <div className="text-responsive-2xl font-bold text-mh-primary dark:text-mh-secondary mb-1">
                  {stat.number}
                </div>
                <div className="text-responsive-sm text-gray-600 dark:text-gray-400">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="section-features py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 scroll-reveal">
            <h2 className="text-responsive-3xl font-tactic-bold text-mh-primary mb-4 gradient-text">
              Revolutionary Construction Solutions
            </h2>
            <p className="text-responsive-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Experience the future of construction with our AI-powered tools and veteran expertise
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card hover={true} className="card border-mh-primary/20 hover:border-mh-primary/50 scroll-reveal">
              <CardHeader>
                <div className="w-12 h-12 bg-mh-primary text-white rounded-lg flex items-center justify-center mb-4 shadow-lg icon-hover-scale">
                  <BoltIcon size="lg" primaryColor="currentColor" secondaryColor="rgba(255,255,255,0.6)" />
                </div>
                <CardTitle className="text-mh-primary text-responsive-lg">AI Project Estimator</CardTitle>
              </CardHeader>
              <CardContent className="text-responsive-base">
                Get accurate project estimates with our revolutionary AI-powered cost calculator. 
                ±15% precision guaranteed.
              </CardContent>
            </Card>

            <Card hover={true} className="card border-mh-secondary/20 hover:border-mh-secondary/50 scroll-reveal">
              <CardHeader>
                <div className="w-12 h-12 bg-mh-secondary text-white rounded-lg flex items-center justify-center mb-4 shadow-lg icon-hover-scale">
                  <CalendarIcon size="lg" primaryColor="currentColor" secondaryColor="rgba(255,255,255,0.6)" />
                </div>
                <CardTitle className="text-mh-secondary text-responsive-lg">Smart Scheduling</CardTitle>
              </CardHeader>
              <CardContent className="text-responsive-base">
                Book your free consultation with our visual calendar system. 
                Real-time availability and instant confirmations.
              </CardContent>
            </Card>

            <Card hover={true} className="card border-mh-primary/20 hover:border-mh-primary/50 scroll-reveal">
              <CardHeader>
                <div className="w-12 h-12 bg-mh-primary text-white rounded-lg flex items-center justify-center mb-4 shadow-lg icon-hover-scale">
                  <HammerIcon size="lg" primaryColor="currentColor" secondaryColor="rgba(255,255,255,0.6)" />
                </div>
                <CardTitle className="text-mh-primary text-responsive-lg">3D Project Explorer</CardTitle>
              </CardHeader>
              <CardContent className="text-responsive-base">
                Immersive project tours with HD visualization and real-time builder insights. 
                See your vision come to life.
              </CardContent>
            </Card>

            <Card hover={true} className="card border-mh-secondary/20 hover:border-mh-secondary/50 scroll-reveal">
              <CardHeader>
                <div className="w-12 h-12 bg-mh-secondary text-white rounded-lg flex items-center justify-center mb-4 shadow-lg icon-hover-scale">
                  <UserIcon size="lg" primaryColor="currentColor" secondaryColor="rgba(255,255,255,0.6)" />
                </div>
                <CardTitle className="text-mh-secondary text-responsive-lg">24/7 AI Assistant</CardTitle>
              </CardHeader>
              <CardContent className="text-responsive-base">
                Military-grade support with our enhanced chatbot. 
                Context-aware responses and veteran-specific assistance.
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Military Values Section */}
      <section className="section-values py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 scroll-reveal">
            <h2 className="text-responsive-3xl font-tactic-bold text-mh-primary mb-4">
              Built on Military Values
            </h2>
            <p className="text-responsive-lg text-gray-600 dark:text-gray-300">
              150+ years of combined expertise guided by unwavering principles
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
            {[
              { value: 'Ethics', icon: ShieldIcon, color: 'from-mh-primary to-mh-secondary' },
              { value: 'Experience', icon: StarIcon, color: 'from-mh-secondary to-mh-primary' },
              { value: 'Integrity', icon: CheckIcon, color: 'from-mh-primary to-mh-secondary' },
              { value: 'Honesty', icon: ShieldIcon, color: 'from-mh-secondary to-mh-primary' },
              { value: 'Trust', icon: StarIcon, color: 'from-mh-primary to-mh-secondary' },
              { value: 'Professionalism', icon: CogIcon, color: 'from-mh-secondary to-mh-primary' }
            ].map((item, index) => {
              const IconComponent = item.icon;
              return (
                <div key={item.value} className="text-center group scroll-reveal" style={{ animationDelay: `${index * 0.1}s` }}>
                  <div className={`w-16 h-16 bg-gradient-to-br ${item.color} rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg transform transition-all duration-500 group-hover:scale-110 group-hover:shadow-xl group-hover:rotate-12`}>
                    <IconComponent 
                      size="md" 
                      primaryColor="white" 
                      secondaryColor="rgba(255,255,255,0.7)"
                    />
                  </div>
                  <h3 className="font-semibold text-responsive-base text-mh-primary dark:text-mh-secondary transition-all duration-300 group-hover:text-mh-secondary dark:group-hover:text-mh-primary">
                    {item.value}
                  </h3>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Portfolio Showcase */}
      <section className="section-features py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 scroll-reveal">
            <h2 className="text-responsive-3xl font-tactic-bold text-mh-primary mb-4">
              Featured Projects
            </h2>
            <p className="text-responsive-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Discover our exceptional work and see why clients trust MH Construction with their most important projects
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {featuredProjects.map((project, index) => (
              <div key={project.seoMetadata.slug} className="group cursor-pointer scroll-reveal" style={{ animationDelay: `${index * 0.2}s` }}>
                <Link href={`/portfolio/${project.seoMetadata.slug}`}>
                  <div className="card relative h-80 rounded-xl overflow-hidden mb-4 shadow-lg">
                    <PortfolioImage
                      src={project.images[0]?.url || '/placeholder-construction.jpg'}
                      alt={project.title}
                      className="object-cover w-full h-full group-hover:scale-110 transition-all duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
                    <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-x-4 group-hover:translate-x-0">
                      <span className="bg-mh-primary px-3 py-1 rounded-full text-sm font-semibold text-white shadow-lg">
                        {project.category.charAt(0).toUpperCase() + project.category.slice(1)}
                      </span>
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 p-6 text-white opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-4 group-hover:translate-y-0">
                      <h3 className="text-xl font-semibold mb-2">
                        {project.title}
                      </h3>
                      <p className="text-sm text-gray-200 mb-3">
                        {project.description.substring(0, 100)}...
                      </p>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-mh-secondary font-medium">
                          {project.location.city}, {project.location.state}
                        </span>
                        {project.details.completionDate && (
                          <span className="text-sm text-gray-300">
                            {new Date(project.details.completionDate).getFullYear()}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>

          {/* Portfolio CTA */}
          <div className="text-center scroll-reveal">
            <Link href="/portfolio">
              <Button className="btn-outline transition-all duration-300 hover:scale-105" size="lg" withRing>
                View All Projects
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Client Testimonials */}
      <section className="section-values py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 scroll-reveal">
            <h2 className="text-responsive-3xl font-tactic-bold text-mh-primary mb-4">
              What Our Clients Say
            </h2>
            <p className="text-responsive-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Read testimonials from satisfied customers across the Pacific Northwest
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {[
              {
                name: "Sarah Thompson",
                location: "Seattle, WA",
                project: "Home Renovation",
                rating: 5,
                review: "MH Construction transformed our 1920s home with incredible attention to detail. Their military precision and professionalism made the entire process seamless.",
                image: "/images/testimonials/sarah-t.jpg"
              },
              {
                name: "Mike Chen",
                location: "Portland, OR",
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
              <div key={index} className="card scroll-reveal" style={{ animationDelay: `${index * 0.2}s` }}>
                <div className="flex items-start space-x-4 mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-mh-primary to-mh-secondary rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-white font-bold text-lg">{testimonial.name.charAt(0)}</span>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-responsive-base text-mh-primary dark:text-mh-secondary">
                      {testimonial.name}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {testimonial.location} • {testimonial.project}
                    </p>
                  </div>
                  <div className="flex space-x-1">
                    {Array.from({ length: testimonial.rating }).map((_, i) => (
                      <StarIcon key={i} size="sm" primaryColor="var(--brand-secondary)" secondaryColor="var(--brand-secondary-light)" />
                    ))}
                  </div>
                </div>
                <blockquote className="text-gray-700 dark:text-gray-300 text-responsive-base italic leading-relaxed">
                  "{testimonial.review}"
                </blockquote>
              </div>
            ))}
          </div>
          
          <div className="text-center scroll-reveal">
            <Link href="/testimonials">
              <Button className="btn-outline transition-all duration-300 hover:scale-105" size="lg" withRing>
                View All Testimonials
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-mh-primary text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-mh-primary via-mh-primary-dark to-mh-secondary opacity-90"></div>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div className="scroll-reveal">
            <h2 className="text-responsive-3xl font-tactic-bold mb-6">
              Ready to Build Your Dream Project?
            </h2>
            <p className="text-responsive-xl mb-8 text-gray-100">
              Get started with a free consultation and AI-powered estimate today
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/booking">
                <Button className="bg-white text-mh-primary hover:bg-gray-100 border-white font-semibold transition-all duration-300 hover:scale-105 hover:shadow-xl" size="lg" withRing>
                  Schedule Consultation
                </Button>
              </Link>
              <Link href="/estimator">
                <Button className="btn-secondary transition-all duration-300 hover:scale-105" size="lg" withRing>
                  Get Free Estimate
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}