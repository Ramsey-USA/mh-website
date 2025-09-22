import { Button, Card, CardHeader, CardTitle, CardContent } from '../../components/ui'

export default function ServicesPage() {
  const services = [
    {
      category: "Residential Construction",
      icon: "🏠",
      description: "Custom homes and residential projects built with military precision",
      services: [
        "Custom Home Construction",
        "Home Additions & Extensions", 
        "Kitchen & Bathroom Remodeling",
        "Basement Finishing",
        "Garage Construction",
        "Deck & Patio Installation"
      ],
      priceRange: "$50,000 - $500,000+",
      timeline: "3-12 months"
    },
    {
      category: "Commercial Construction", 
      icon: "🏢",
      description: "Professional commercial spaces designed for business success",
      services: [
        "Office Building Construction",
        "Retail Space Development",
        "Warehouse & Industrial Buildings", 
        "Restaurant & Hospitality",
        "Medical Facilities",
        "Multi-tenant Properties"
      ],
      priceRange: "$100,000 - $2M+",
      timeline: "6-18 months"
    },
    {
      category: "Renovation & Remodeling",
      icon: "🔨", 
      description: "Transform existing spaces with expert renovation services",
      services: [
        "Whole House Renovations",
        "Kitchen Modernization",
        "Bathroom Upgrades",
        "Flooring Installation",
        "Interior Design Integration",
        "Historic Restoration"
      ],
      priceRange: "$25,000 - $300,000+",
      timeline: "2-8 months"
    },
    {
      category: "Specialty Construction",
      icon: "⚡",
      description: "Unique projects requiring specialized expertise and innovation",
      services: [
        "Accessible Living Modifications",
        "Smart Home Integration",
        "Energy Efficient Upgrades",
        "Veteran Housing Adaptations", 
        "Emergency Repairs",
        "Green Building Solutions"
      ],
      priceRange: "$10,000 - $150,000+",
      timeline: "1-6 months"
    }
  ]

  const processSteps = [
    {
      step: "01",
      title: "Consultation & Planning",
      description: "Free consultation with AI-powered estimation and detailed project planning"
    },
    {
      step: "02", 
      title: "Design & Permits",
      description: "3D visualization, architectural planning, and permit acquisition"
    },
    {
      step: "03",
      title: "Construction",
      description: "Military-precision execution with regular progress updates"
    },
    {
      step: "04",
      title: "Quality Assurance",
      description: "Thorough inspection and client walkthrough before completion"
    }
  ]

  const certifications = [
    "Licensed General Contractor",
    "OSHA Safety Certified",
    "Green Building Certified",
    "ADA Compliance Specialist",
    "Emergency Response Certified",
    "Veteran Business Enterprise"
  ]

  return (
    <>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-brand-primary to-brand-secondary text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-tactic-bold mb-6">
              Our Construction Services
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-gray-100 max-w-3xl mx-auto">
              Comprehensive construction solutions delivered with military precision, 
              cutting-edge technology, and unwavering commitment to excellence.
            </p>
            <Button variant="secondary" size="lg">
              Get Free AI Estimate
            </Button>
          </div>
        </div>
      </section>

      {/* Main Services */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-tactic-bold text-brand-primary mb-4">
              Complete Construction Solutions
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              From residential dreams to commercial success, we deliver exceptional results 
              across all construction categories.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {services.map((service, index) => (
              <Card key={index} hover={true} className="h-full">
                <CardHeader>
                  <div className="flex items-center mb-4">
                    <div className="text-4xl mr-4">{service.icon}</div>
                    <div>
                      <CardTitle className="text-xl">{service.category}</CardTitle>
                      <p className="text-gray-600 text-sm mt-1">{service.description}</p>
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold text-brand-primary mb-2">Services Include:</h4>
                      <ul className="grid grid-cols-1 md:grid-cols-2 gap-1 text-sm text-gray-600">
                        {service.services.map((item, idx) => (
                          <li key={idx} className="flex items-center">
                            <span className="text-brand-secondary mr-2">•</span>
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div className="flex justify-between items-center pt-4 border-t border-gray-200">
                      <div>
                        <p className="text-sm text-gray-500">Price Range</p>
                        <p className="font-semibold text-brand-primary">{service.priceRange}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Timeline</p>
                        <p className="font-semibold text-brand-secondary">{service.timeline}</p>
                      </div>
                    </div>
                    
                    <Button variant="primary" size="sm" className="w-full mt-4">
                      Get Quote for {service.category}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-tactic-bold text-brand-primary mb-4">
              Our Military-Precision Process
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Every project follows our proven 4-step process, ensuring exceptional results 
              and complete client satisfaction.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {processSteps.map((step, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-brand-primary to-brand-secondary rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white font-tactic-bold text-lg">{step.step}</span>
                </div>
                <h3 className="text-xl font-bold text-brand-primary mb-3">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Technology & Innovation */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-tactic-bold text-brand-primary mb-6">
                Revolutionary Technology Integration
              </h2>
              <div className="space-y-4 text-gray-700">
                <p>
                  MH Construction leads the industry with cutting-edge AI technology and innovative 
                  construction methods that deliver superior results and exceptional value.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-center">
                    <span className="text-brand-secondary mr-3">✓</span>
                    AI-powered project estimation with ±15% accuracy
                  </li>
                  <li className="flex items-center">
                    <span className="text-brand-secondary mr-3">✓</span>
                    3D visualization and immersive project tours
                  </li>
                  <li className="flex items-center">
                    <span className="text-brand-secondary mr-3">✓</span>
                    Real-time project tracking and progress updates
                  </li>
                  <li className="flex items-center">
                    <span className="text-brand-secondary mr-3">✓</span>
                    Smart home integration and IoT solutions
                  </li>
                  <li className="flex items-center">
                    <span className="text-brand-secondary mr-3">✓</span>
                    Energy-efficient and sustainable building practices
                  </li>
                </ul>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-6">
              <Card>
                <CardContent className="text-center">
                  <div className="text-3xl font-tactic-bold text-brand-primary mb-2">±15%</div>
                  <p className="text-sm text-gray-600">AI Estimate Accuracy</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="text-center">
                  <div className="text-3xl font-tactic-bold text-brand-primary mb-2">3D</div>
                  <p className="text-sm text-gray-600">Project Visualization</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="text-center">
                  <div className="text-3xl font-tactic-bold text-brand-primary mb-2">24/7</div>
                  <p className="text-sm text-gray-600">AI Support</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="text-center">
                  <div className="text-3xl font-tactic-bold text-brand-primary mb-2">100%</div>
                  <p className="text-sm text-gray-600">Digital Tracking</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Certifications & Qualifications */}
      <section className="py-16 bg-brand-primary text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-tactic-bold mb-6">
              Licensed, Certified & Qualified
            </h2>
            <p className="text-xl text-gray-100 max-w-3xl mx-auto">
              Our certifications and qualifications ensure every project meets the highest 
              standards of safety, quality, and compliance.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {certifications.map((cert, index) => (
              <div key={index} className="bg-white bg-opacity-10 backdrop-blur rounded-lg p-6 text-center">
                <div className="w-12 h-12 bg-brand-secondary rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>
                <h3 className="font-semibold text-white">{cert}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Service Areas */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-tactic-bold text-brand-primary mb-6">
            Service Areas
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            Proudly serving the Pacific Northwest region with comprehensive construction services
          </p>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
            {[
              "Pasco, WA", "Kennewick, WA", "Richland, WA", "Walla Walla, WA",
              "Yakima, WA", "Spokane, WA", "Portland, OR", "Boise, ID"
            ].map((area, index) => (
              <div key={index} className="bg-white p-4 rounded-lg shadow">
                <p className="font-semibold text-brand-primary">{area}</p>
              </div>
            ))}
          </div>
          
          <p className="text-gray-600">
            Don&apos;t see your area? Contact us - we may be able to accommodate special projects 
            throughout the Pacific Northwest region.
          </p>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-brand-secondary text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-tactic-bold mb-6">
            Ready to Start Your Project?
          </h2>
          <p className="text-xl mb-8">
            Get an instant AI-powered estimate or schedule a free consultation with our veteran team
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="primary" size="lg" className="bg-white text-brand-secondary hover:bg-gray-100">
              Get AI Estimate Now
            </Button>
            <Button variant="primary" size="lg" className="bg-brand-primary hover:bg-brand-primary/80">
              Schedule Consultation
            </Button>
          </div>
        </div>
      </section>
    </>
  )
}