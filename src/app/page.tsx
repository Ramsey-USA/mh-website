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
      
      {/* Enhanced Hero Section */}
      <section className="hero-section relative py-32 lg:py-40 overflow-hidden">
        {/* Dynamic Background */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-brand-primary/20 via-brand-secondary/15 to-brand-primary/20"></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(56,104,81,0.1)_0%,transparent_50%)]"></div>
          <div className="absolute inset-0 opacity-30">
            <div className="absolute top-20 left-20 w-2 h-2 bg-brand-secondary rounded-full animate-pulse"></div>
            <div className="absolute top-40 right-32 w-1 h-1 bg-brand-primary rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
            <div className="absolute bottom-32 left-1/3 w-1.5 h-1.5 bg-brand-secondary rounded-full animate-pulse" style={{ animationDelay: '2s' }}></div>
            <div className="absolute bottom-20 right-20 w-1 h-1 bg-brand-primary rounded-full animate-pulse" style={{ animationDelay: '0.5s' }}></div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center scroll-reveal">
            {/* Veteran Badge */}
            <div className="inline-flex items-center px-6 py-3 mb-8 bg-white/10 backdrop-blur-sm rounded-full border border-white/20 shadow-lg">
              <ShieldIcon size="sm" primaryColor="white" secondaryColor="rgba(255,255,255,0.7)" />
              <span className="ml-3 text-sm font-semibold text-white tracking-wide">VETERAN-OWNED EXCELLENCE</span>
            </div>

            <h1 className="hero-title text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold mb-8 text-white leading-tight">
              Building Tomorrow with
              <span className="block mt-4 bg-gradient-to-r from-brand-secondary via-brand-secondary-light to-brand-secondary bg-clip-text text-transparent">
                Today's Technology
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl lg:text-3xl mb-12 text-gray-100 max-w-5xl mx-auto leading-relaxed">
              Veteran-owned construction excellence powered by cutting-edge AI technology. 
              Serving the Pacific Northwest with <span className="text-brand-secondary font-semibold">military precision</span>.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16">
              <Link href="/booking">
                <Button variant="primary" size="xl" className="group">
                  <CalendarIcon size="sm" primaryColor="currentColor" className="mr-3" />
                  <span className="relative z-10">Schedule Free Consultation</span>
                </Button>
              </Link>
              <Link href="/estimator">
                <Button variant="outline" size="xl" className="group border-white text-white hover:bg-white hover:text-brand-primary">
                  <BoltIcon size="sm" primaryColor="currentColor" className="mr-3" />
                  <span className="relative z-10">Get AI Estimate</span>
                </Button>
              </Link>
            </div>

            {/* Trust Indicators */}
            <div className="flex flex-wrap justify-center items-center gap-8 text-white/80 text-sm">
              <div className="flex items-center">
                <CheckIcon size="xs" primaryColor="currentColor" className="mr-2" />
                <span>Free Consultation</span>
              </div>
              <div className="flex items-center">
                <CheckIcon size="xs" primaryColor="currentColor" className="mr-2" />
                <span>±15% Estimate Accuracy</span>
              </div>
              <div className="flex items-center">
                <CheckIcon size="xs" primaryColor="currentColor" className="mr-2" />
                <span>24/7 Emergency Support</span>
              </div>
              <div className="flex items-center">
                <CheckIcon size="xs" primaryColor="currentColor" className="mr-2" />
                <span>Licensed & Insured</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Company Stats Section */}
      <section className="stats-section py-24 bg-white dark:bg-gray-900 relative">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-brand-primary/30 to-transparent"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-gray-50/50 to-transparent dark:from-gray-800/30"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center mb-20 scroll-reveal">
            <div className="inline-flex items-center px-4 py-2 mb-6 bg-brand-primary/10 rounded-full">
              <StarIcon size="sm" primaryColor="var(--brand-primary)" />
              <span className="ml-2 text-sm font-semibold text-brand-primary uppercase tracking-wide">Proven Excellence</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6" style={{ color: 'var(--color-text-accent)' }}>
              Excellence in Numbers
            </h2>
            <p className="text-xl max-w-3xl mx-auto" style={{ color: 'var(--color-text-secondary)' }}>
              Our track record speaks for itself - delivering outstanding results with military precision for over 150 combined years of experience
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 lg:gap-12">
            {[
              { 
                number: "150+", 
                label: "Years Combined Experience", 
                icon: StarIcon, 
                color: "from-yellow-400 to-yellow-600",
                description: "Decades of expertise in construction excellence"
              },
              { 
                number: "500+", 
                label: "Projects Completed", 
                icon: HammerIcon, 
                color: "from-brand-primary to-brand-primary-light",
                description: "Successful projects across the Pacific Northwest"
              },
              { 
                number: "24/7", 
                label: "Emergency Support", 
                icon: ShieldIcon, 
                color: "from-red-500 to-red-600",
                description: "Round-the-clock support when you need it most"
              },
              { 
                number: "100%", 
                label: "Veteran Owned", 
                icon: CheckIcon, 
                color: "from-blue-500 to-blue-600",
                description: "Proudly veteran-owned and operated"
              }
            ].map((stat, index) => (
              <div key={index} className="stats-card group text-center scroll-reveal" style={{ animationDelay: `${index * 0.1}s` }}>
                <div className={`w-20 h-20 bg-gradient-to-br ${stat.color} rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:shadow-2xl transition-all duration-500 group-hover:scale-110 group-hover:rotate-3`}>
                  <stat.icon size="xl" primaryColor="white" secondaryColor="rgba(255,255,255,0.8)" />
                </div>
                <div className="text-4xl md:text-5xl lg:text-6xl font-bold mb-3 bg-gradient-to-r from-brand-primary to-brand-secondary bg-clip-text text-transparent">
                  {stat.number}
                </div>
                <div className="text-lg md:text-xl font-semibold mb-2" style={{ color: 'var(--color-text-primary)' }}>
                  {stat.label}
                </div>
                <p className="text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{ color: 'var(--color-text-muted)' }}>
                  {stat.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Revolutionary Features Section */}
      <section className="features-section py-32 bg-gradient-to-b from-gray-50 to-white dark:from-gray-800 dark:to-gray-900 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/images/patterns/grid.svg')] opacity-5 dark:opacity-10"></div>
        <div className="absolute top-20 right-20 w-32 h-32 bg-brand-primary/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-20 w-40 h-40 bg-brand-secondary/5 rounded-full blur-3xl"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center mb-24 scroll-reveal">
            <div className="inline-flex items-center px-6 py-3 mb-8 bg-brand-primary/10 dark:bg-brand-primary/20 rounded-full">
              <BoltIcon size="md" primaryColor="var(--brand-primary)" />
              <span className="ml-3 text-sm font-bold text-brand-primary uppercase tracking-wide">Revolutionary Solutions</span>
            </div>
            
            <h2 className="text-5xl md:text-6xl font-bold mb-8" style={{ color: 'var(--color-text-accent)' }}>
              The Future of
              <span className="block bg-gradient-to-r from-brand-primary to-brand-secondary bg-clip-text text-transparent">
                Construction
              </span>
            </h2>
            <p className="text-xl md:text-2xl max-w-4xl mx-auto leading-relaxed" style={{ color: 'var(--color-text-secondary)' }}>
              Experience cutting-edge technology combined with decades of expertise. 
              Our AI-powered tools and veteran precision deliver results that exceed expectations.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: BoltIcon,
                title: "AI Project Estimator",
                description: "Revolutionary AI-powered cost calculator with ±15% precision guarantee for accurate project planning and budgeting.",
                color: "from-blue-500 to-blue-600",
                delay: "0s"
              },
              {
                icon: CalendarIcon,
                title: "Smart Scheduling",
                description: "Visual calendar system with real-time availability and instant confirmations for seamless booking experience.",
                color: "from-green-500 to-green-600",
                delay: "0.1s"
              },
              {
                icon: HammerIcon,
                title: "3D Project Explorer",
                description: "Immersive HD visualization with real-time builder insights to bring your vision to life before construction begins.",
                color: "from-purple-500 to-purple-600",
                delay: "0.2s"
              },
              {
                icon: UserIcon,
                title: "24/7 AI Assistant",
                description: "Military-grade support with enhanced chatbot providing context-aware veteran assistance and instant responses.",
                color: "from-orange-500 to-orange-600",
                delay: "0.3s"
              }
            ].map((feature, index) => (
              <div key={index} className="feature-card group scroll-reveal" style={{ animationDelay: feature.delay }}>
                <div className="relative p-8 h-full bg-white dark:bg-gray-800 rounded-3xl shadow-lg group-hover:shadow-2xl transition-all duration-500 group-hover:-translate-y-2">
                  {/* Gradient Background */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-5 rounded-3xl transition-opacity duration-500`}></div>
                  
                  {/* Icon Container */}
                  <div className={`w-16 h-16 bg-gradient-to-br ${feature.color} rounded-2xl flex items-center justify-center mb-6 shadow-lg group-hover:shadow-xl group-hover:scale-110 group-hover:rotate-12 transition-all duration-500`}>
                    <feature.icon size="xl" primaryColor="white" secondaryColor="rgba(255,255,255,0.8)" />
                  </div>
                  
                  <h3 className="text-2xl font-bold mb-4 group-hover:text-brand-primary transition-colors duration-300" style={{ color: 'var(--color-text-primary)' }}>
                    {feature.title}
                  </h3>
                  
                  <p className="text-base leading-relaxed mb-6" style={{ color: 'var(--color-text-secondary)' }}>
                    {feature.description}
                  </p>
                  
                  {/* Hover Arrow */}
                  <div className="absolute bottom-6 right-6 opacity-0 group-hover:opacity-100 transform translate-x-2 group-hover:translate-x-0 transition-all duration-300">
                    <div className="w-10 h-10 bg-brand-primary rounded-full flex items-center justify-center shadow-lg">
                      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Military Values Section */}
      <section className="values-section py-32 bg-white dark:bg-gray-900 relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(56,104,81,0.05)_0%,transparent_50%)]"></div>
        <div className="absolute top-40 left-10 w-24 h-24 bg-brand-secondary/10 rounded-full blur-2xl"></div>
        <div className="absolute bottom-20 right-10 w-32 h-32 bg-brand-primary/10 rounded-full blur-2xl"></div>
        
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center mb-24 scroll-reveal">
            <div className="inline-flex items-center px-6 py-3 mb-8 bg-red-50 dark:bg-red-900/20 rounded-full">
              <ShieldIcon size="md" primaryColor="var(--veteran-red)" />
              <span className="ml-3 text-sm font-bold text-red-600 dark:text-red-400 uppercase tracking-wide">Military Values</span>
            </div>
            
            <h2 className="text-5xl md:text-6xl font-bold mb-8" style={{ color: 'var(--color-text-accent)' }}>
              Built on
              <span className="block bg-gradient-to-r from-brand-primary to-brand-secondary bg-clip-text text-transparent">
                Unwavering Principles
              </span>
            </h2>
            <p className="text-xl md:text-2xl max-w-4xl mx-auto leading-relaxed" style={{ color: 'var(--color-text-secondary)' }}>
              Our foundation rests on military values that guide every project, every decision, 
              and every client relationship we build with honor and dedication.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { 
                value: 'Integrity', 
                icon: ShieldIcon, 
                description: 'We conduct business with unwavering honesty and moral principles, ensuring every project reflects our commitment to doing what is right.',
                color: 'from-blue-500 to-blue-600'
              },
              { 
                value: 'Excellence', 
                icon: StarIcon, 
                description: 'We pursue perfection in every detail, delivering superior craftsmanship that exceeds expectations and stands the test of time.',
                color: 'from-yellow-400 to-yellow-600'
              },
              { 
                value: 'Service', 
                icon: ToolsIcon, 
                description: 'We serve our clients and community with dedication, putting their needs first and treating every project as our mission.',
                color: 'from-green-500 to-green-600'
              },
              { 
                value: 'Leadership', 
                icon: CheckIcon, 
                description: 'We lead by example in the construction industry, setting standards for innovation, safety, and professional excellence.',
                color: 'from-purple-500 to-purple-600'
              },
              { 
                value: 'Accountability', 
                icon: CogIcon, 
                description: 'We take full responsibility for our work and commitments, ensuring transparency and reliability in every interaction.',
                color: 'from-orange-500 to-orange-600'
              },
              { 
                value: 'Teamwork', 
                icon: HammerIcon, 
                description: 'We build success through collaboration, leveraging diverse skills and perspectives to achieve exceptional results together.',
                color: 'from-red-500 to-red-600'
              }
            ].map((item, index) => {
              const IconComponent = item.icon;
              return (
                <div key={item.value} className="value-card group scroll-reveal" style={{ animationDelay: `${index * 0.1}s` }}>
                  <div className="relative p-8 h-full bg-white dark:bg-gray-800 rounded-3xl shadow-lg group-hover:shadow-2xl transition-all duration-500 group-hover:-translate-y-3 overflow-hidden">
                    {/* Gradient Overlay */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${item.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}></div>
                    
                    <div className="text-center relative z-10">
                      <div className={`w-24 h-24 bg-gradient-to-br ${item.color} rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-lg group-hover:shadow-2xl group-hover:scale-110 group-hover:rotate-6 transition-all duration-500`}>
                        <IconComponent 
                          size="2xl" 
                          primaryColor="white" 
                          secondaryColor="rgba(255,255,255,0.8)"
                        />
                      </div>
                      
                      <h3 className="text-2xl md:text-3xl font-bold mb-6 group-hover:text-brand-primary transition-colors duration-300" style={{ color: 'var(--color-text-accent)' }}>
                        {item.value}
                      </h3>
                      
                      <p className="leading-relaxed text-lg" style={{ color: 'var(--color-text-secondary)' }}>
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

      {/* Enhanced Client Testimonials */}
      <section className="testimonials-section py-32 bg-gradient-to-b from-gray-50 to-white dark:from-gray-800 dark:to-gray-900 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/images/patterns/testimonials.svg')] opacity-5"></div>
        <div className="absolute top-20 left-20 w-40 h-40 bg-brand-primary/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-32 h-32 bg-brand-secondary/5 rounded-full blur-3xl"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center mb-24 scroll-reveal">
            <div className="inline-flex items-center px-6 py-3 mb-8 bg-yellow-50 dark:bg-yellow-900/20 rounded-full">
              <StarIcon size="md" primaryColor="var(--brand-secondary)" />
              <span className="ml-3 text-sm font-bold text-yellow-600 dark:text-yellow-400 uppercase tracking-wide">Client Success Stories</span>
            </div>
            
            <h2 className="text-5xl md:text-6xl font-bold mb-8" style={{ color: 'var(--color-text-accent)' }}>
              What Our
              <span className="block bg-gradient-to-r from-brand-primary to-brand-secondary bg-clip-text text-transparent">
                Clients Say
              </span>
            </h2>
            <p className="text-xl md:text-2xl max-w-4xl mx-auto leading-relaxed" style={{ color: 'var(--color-text-secondary)' }}>
              Read testimonials from satisfied customers across the Pacific Northwest who have experienced our veteran excellence firsthand.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
            {[
              {
                name: "Sarah Thompson",
                location: "Spokane, WA",
                project: "Historic Home Renovation",
                rating: 5,
                review: "MH Construction transformed our 1920s home with incredible attention to detail. Their military precision and professionalism made the entire process seamless. The AI estimate was spot-on, and they finished ahead of schedule!",
                image: "/images/testimonials/sarah-t.jpg"
              },
              {
                name: "Mike Chen",
                location: "Yakima, WA",
                project: "Modern Kitchen Remodel",
                rating: 5,
                review: "The AI cost estimator was revolutionary - accurate to the dollar! The quality of work exceeded our expectations. Their veteran-owned approach brings a level of discipline and excellence you won't find elsewhere.",
                image: "/images/testimonials/mike-c.jpg"
              },
              {
                name: "Jessica Rodriguez",
                location: "Spokane, WA",
                project: "Luxury Bathroom Addition",
                rating: 5,
                review: "As a fellow veteran, I appreciated their understanding of our needs. The team went above and beyond to deliver exceptional results. Their 24/7 support gave us peace of mind throughout the entire project.",
                image: "/images/testimonials/jessica-r.jpg"
              }
            ].map((testimonial, index) => (
              <div key={index} className="testimonial-card group scroll-reveal" style={{ animationDelay: `${index * 0.2}s` }}>
                <div className="relative p-8 h-full bg-white dark:bg-gray-800 rounded-3xl shadow-lg group-hover:shadow-2xl transition-all duration-500 group-hover:-translate-y-2">
                  {/* Quote Icon */}
                  <div className="absolute top-6 right-6 w-12 h-12 bg-brand-secondary/10 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <svg className="w-6 h-6 text-brand-secondary" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M4.583 17.321C3.553 16.227 3 15 3 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 01-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179zm10 0C13.553 16.227 13 15 13 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 01-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179z"/>
                    </svg>
                  </div>
                  
                  <div className="flex items-start space-x-4 mb-6">
                    <div className="w-16 h-16 bg-gradient-to-br from-brand-primary to-brand-secondary rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg group-hover:scale-110 transition-transform duration-300">
                      <span className="text-white font-bold text-2xl">{testimonial.name.charAt(0)}</span>
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-xl mb-1" style={{ color: 'var(--color-text-accent)' }}>
                        {testimonial.name}
                      </h3>
                      <p className="text-sm mb-2" style={{ color: 'var(--color-text-muted)' }}>
                        {testimonial.location} • {testimonial.project}
                      </p>
                      <div className="flex space-x-1">
                        {Array.from({ length: testimonial.rating }).map((_, i) => (
                          <StarIcon key={i} size="sm" primaryColor="#fbbf24" secondaryColor="rgba(251, 191, 36, 0.3)" />
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  <blockquote className="text-lg leading-relaxed" style={{ color: 'var(--color-text-primary)' }}>
                    "{testimonial.review}"
                  </blockquote>
                </div>
              </div>
            ))}
          </div>
          
          <div className="text-center scroll-reveal">
            <Link href="/testimonials">
              <Button variant="outline" size="xl" className="group">
                <span className="relative z-10">View All Testimonials</span>
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Enhanced CTA Section */}
      <section className="cta-section relative py-32 overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-brand-primary via-brand-primary-dark to-brand-secondary">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.1)_0%,transparent_70%)]"></div>
          <div className="absolute inset-0 bg-[url('/images/patterns/construction.svg')] opacity-5"></div>
          <div className="absolute inset-0">
            <div className="absolute top-20 left-20 w-3 h-3 bg-white/20 rounded-full animate-pulse"></div>
            <div className="absolute top-40 right-32 w-2 h-2 bg-white/30 rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
            <div className="absolute bottom-32 left-1/3 w-2.5 h-2.5 bg-white/25 rounded-full animate-pulse" style={{ animationDelay: '2s' }}></div>
            <div className="absolute bottom-20 right-20 w-2 h-2 bg-white/20 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }}></div>
          </div>
        </div>
        
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div className="scroll-reveal">
            {/* Badge */}
            <div className="inline-flex items-center px-8 py-4 mb-12 bg-white/10 backdrop-blur-sm rounded-full border border-white/20 shadow-lg">
              <CheckIcon size="md" primaryColor="white" />
              <span className="ml-3 text-lg font-bold text-white tracking-wide">FREE CONSULTATION & ESTIMATE</span>
            </div>
            
            <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-12 text-white leading-tight">
              Ready to Build Your 
              <span className="block text-brand-secondary-light mt-4">Dream Project?</span>
            </h2>
            
            <p className="text-xl md:text-2xl lg:text-3xl mb-16 text-gray-100 max-w-4xl mx-auto leading-relaxed">
              Get started with a free consultation and AI-powered estimate today. 
              Experience the difference of working with veteran-owned excellence and cutting-edge technology.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-8 justify-center items-center mb-16">
              <Link href="/booking">
                <Button variant="secondary" size="xl" className="group">
                  <CalendarIcon size="md" primaryColor="currentColor" className="mr-3" />
                  <span className="relative z-10">Schedule Consultation</span>
                </Button>
              </Link>
              <Link href="/estimator">
                <Button variant="outline" size="xl" className="group border-white text-white hover:bg-white hover:text-brand-primary">
                  <BoltIcon size="md" primaryColor="currentColor" className="mr-3" />
                  <span className="relative z-10">Get Free Estimate</span>
                </Button>
              </Link>
            </div>
            
            {/* Enhanced Trust Indicators */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 pt-12 border-t border-white/20">
              {[
                { icon: CheckIcon, text: "Free Consultation" },
                { icon: ShieldIcon, text: "24/7 Emergency Support" },
                { icon: StarIcon, text: "Licensed & Insured" },
                { icon: HammerIcon, text: "Veteran Owned" }
              ].map((item, index) => (
                <div key={index} className="flex flex-col items-center text-white/90 group">
                  <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center mb-3 group-hover:bg-white/20 transition-colors duration-300">
                    <item.icon size="md" primaryColor="currentColor" />
                  </div>
                  <span className="text-sm font-medium text-center">{item.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  )
}