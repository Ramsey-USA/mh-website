import Link from 'next/link'
import { Button, Card, CardHeader, CardTitle, CardContent } from '../components/ui'
import { PortfolioImage } from '../components/portfolio/ProjectImage'
import { PortfolioService } from '../lib/services/portfolioService'
import { generateSEOMetadata, generateOrganizationStructuredData, StructuredData } from '../components/seo/seo-meta'

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
      
      {/* Hero Section */}
      <section className="hero-gradient text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-tactic-bold mb-6">
              Building Tomorrow with Today&apos;s Technology
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-gray-100 max-w-3xl mx-auto">
              Veteran-owned construction excellence powered by cutting-edge AI technology. 
              Serving the Pacific Northwest with military precision.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/booking">
                <Button variant="secondary" size="lg">
                  Schedule Free Consultation
                </Button>
              </Link>
              <Link href="/estimator">
                <Button variant="primary" size="lg">
                  Get AI Estimate
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-tactic-bold text-brand-primary mb-4">
              Revolutionary Construction Solutions
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Experience the future of construction with our AI-powered tools and veteran expertise
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card hover={true}>
              <CardHeader>
                <div className="w-12 h-12 bg-brand-primary text-white rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <CardTitle>AI Project Estimator</CardTitle>
              </CardHeader>
              <CardContent>
                Get accurate project estimates with our revolutionary AI-powered cost calculator. 
                ±15% precision guaranteed.
              </CardContent>
            </Card>

            <Card hover={true}>
              <CardHeader>
                <div className="w-12 h-12 bg-brand-secondary text-white rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                  </svg>
                </div>
                <CardTitle>Smart Scheduling</CardTitle>
              </CardHeader>
              <CardContent>
                Book your free consultation with our visual calendar system. 
                Real-time availability and instant confirmations.
              </CardContent>
            </Card>

            <Card hover={true}>
              <CardHeader>
                <div className="w-12 h-12 bg-brand-primary text-white rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" />
                  </svg>
                </div>
                <CardTitle>3D Project Explorer</CardTitle>
              </CardHeader>
              <CardContent>
                Immersive project tours with HD visualization and real-time builder insights. 
                See your vision come to life.
              </CardContent>
            </Card>

            <Card hover={true}>
              <CardHeader>
                <div className="w-12 h-12 bg-brand-secondary text-white rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
                  </svg>
                </div>
                <CardTitle>24/7 AI Assistant</CardTitle>
              </CardHeader>
              <CardContent>
                Military-grade support with our enhanced chatbot. 
                Context-aware responses and veteran-specific assistance.
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Military Values Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-tactic-bold text-brand-primary mb-4">
              Built on Military Values
            </h2>
            <p className="text-lg text-gray-600">
              150+ years of combined expertise guided by unwavering principles
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
            {['Ethics', 'Experience', 'Integrity', 'Honesty', 'Trust', 'Professionalism'].map((value) => (
              <div key={value} className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-brand-primary to-brand-secondary rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white font-bold text-sm">{value.charAt(0)}</span>
                </div>
                <h3 className="font-semibold text-gray-900">{value}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Portfolio Showcase */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-tactic-bold text-brand-primary mb-4">
              Featured Projects
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Discover our exceptional work and see why clients trust MH Construction with their most important projects
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {featuredProjects.map((project, index) => (
              <div key={project.seoMetadata.slug} className="group cursor-pointer">
                <Link href={`/portfolio/${project.seoMetadata.slug}`}>
                  <div className="relative h-64 rounded-lg overflow-hidden mb-4">
                    <PortfolioImage
                      src={project.images[0]?.url || '/placeholder-construction.jpg'}
                      alt={project.title}
                      className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <div className="absolute bottom-4 left-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <span className="bg-brand-primary px-3 py-1 rounded-full text-sm font-semibold">
                        {project.category.charAt(0).toUpperCase() + project.category.slice(1)}
                      </span>
                    </div>
                  </div>
                  <h3 className="text-xl font-semibold mb-2 group-hover:text-brand-primary transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-gray-600 text-sm">
                    {project.description.substring(0, 120)}...
                  </p>
                  <div className="mt-3 text-sm text-brand-primary font-medium">
                    {project.location.city}, {project.location.state}
                    {project.details.completionDate && ` • ${new Date(project.details.completionDate).getFullYear()}`}
                  </div>
                </Link>
              </div>
            ))}
          </div>

          {/* Portfolio CTA */}
          <div className="text-center">
            <Link href="/portfolio">
              <Button variant="secondary" size="lg">
                View All Projects
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-brand-primary text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-tactic-bold mb-6">
            Ready to Build Your Dream Project?
          </h2>
          <p className="text-xl mb-8">
            Get started with a free consultation and AI-powered estimate today
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/booking">
              <Button variant="secondary" size="lg">
                Schedule Consultation
              </Button>
            </Link>
            <Link href="/estimator">
              <Button variant="primary" size="lg" className="bg-white text-brand-primary hover:bg-gray-100">
                Get Free Estimate
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}