import { Button, Card, CardHeader, CardTitle, CardContent } from '../../components/ui'
import { BookingFlow } from '../../components/booking/BookingFlow'

export default function BookingPage() {
  const consultationTypes = [
    {
      id: 'initial',
      title: 'Initial Consultation',
      duration: '60 minutes',
      price: 'Free',
      description: 'Comprehensive project discussion, site evaluation planning, and initial budget assessment',
      features: [
        'Project scope discussion',
        'Preliminary timeline planning',
        'Budget range assessment',
        'Site visit scheduling',
        'Material recommendations'
      ]
    },
    {
      id: 'design',
      title: 'Design Consultation',
      duration: '90 minutes',
      price: '$150',
      description: 'In-depth design planning with 3D visualization and detailed material selection',
      features: [
        '3D design visualization',
        'Material selection guidance',
        'Space optimization planning',
        'Color and finish recommendations',
        'Detailed design documentation'
      ]
    },
    {
      id: 'technical',
      title: 'Technical Consultation',
      duration: '45 minutes',
      price: '$75',
      description: 'Engineering assessment, permit requirements, and technical feasibility review',
      features: [
        'Structural engineering review',
        'Permit requirements analysis',
        'Code compliance assessment',
        'Technical feasibility study',
        'Construction methodology planning'
      ]
    },
    {
      id: 'estimate',
      title: 'Detailed Estimate Review',
      duration: '30 minutes',
      price: 'Free',
      description: 'Comprehensive review of AI-generated estimate with detailed cost breakdown',
      features: [
        'Line-by-line cost review',
        'Alternative material options',
        'Timeline optimization',
        'Payment schedule planning',
        'Warranty and guarantee details'
      ]
    }
  ]

  const teamMembers = [
    {
      id: 'mark-harris',
      name: 'Mark Harris',
      title: 'Founder & Lead Contractor',
      specialty: 'Custom Homes & Commercial',
      experience: '15+ years',
      military: 'Army Veteran',
      avatar: '👨‍💼',
      availability: 'Monday-Friday 8:00 AM - 3:00 PM'
    },
    {
      id: 'sarah-harris',
      name: 'Sarah Harris',
      title: 'Design Director',
      specialty: 'Interior Design & Space Planning',
      experience: '12+ years',
      military: 'Military Spouse',
      avatar: '👩‍💼',
      availability: 'Tuesday-Thursday 9:00 AM - 4:00 PM'
    },
    {
      id: 'jim-rodriguez',
      name: 'Jim Rodriguez',
      title: 'Project Manager',
      specialty: 'Renovations & Additions',
      experience: '10+ years',
      military: 'Navy Veteran',
      avatar: '👨‍🔧',
      availability: 'Monday-Friday 7:00 AM - 5:00 PM'
    }
  ]

  return (
    <>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-brand-primary to-brand-secondary text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-tactic-bold mb-6">
              Schedule Your Consultation
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-gray-100 max-w-4xl mx-auto">
              Meet with our veteran team to discuss your construction project. 
              Choose from free initial consultations to detailed design sessions.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="secondary" size="lg">
                Book Free Consultation
              </Button>
              <Button variant="primary" size="lg" className="bg-transparent border-2 border-white hover:bg-white hover:text-brand-primary">
                View Our Team
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Consultation Types */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-tactic-bold text-brand-primary mb-4">
              Choose Your Consultation Type
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              We offer various consultation types to meet your specific needs, 
              from initial project discussions to detailed technical reviews.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {consultationTypes.map((consultation, index) => (
              <Card key={index} hover={true} className={consultation.price === 'Free' ? 'border-green-200 bg-green-50' : ''}>
                <CardHeader>
                  <div className="flex justify-between items-start mb-2">
                    <CardTitle className="text-xl">{consultation.title}</CardTitle>
                    <div className="text-right">
                      <div className={`text-lg font-tactic-bold ${consultation.price === 'Free' ? 'text-green-600' : 'text-brand-primary'}`}>
                        {consultation.price}
                      </div>
                      <div className="text-sm text-gray-600">{consultation.duration}</div>
                    </div>
                  </div>
                  <p className="text-gray-600">{consultation.description}</p>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <h4 className="font-semibold text-gray-800">What's Included:</h4>
                    <ul className="space-y-1">
                      {consultation.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-center text-sm">
                          <span className="text-green-500 mr-2">✓</span>
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <Button 
                      variant={consultation.price === 'Free' ? 'primary' : 'secondary'} 
                      className="w-full mt-4"
                    >
                      Book {consultation.title}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Interactive Booking Calendar */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-tactic-bold text-brand-primary mb-4">
              Choose Your Preferred Time
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Select a date and time that works for you. Our calendar shows real-time availability 
              and automatically adjusts for your timezone.
            </p>
          </div>

          <BookingFlow />
        </div>
      </section>

      {/* Team Members */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-tactic-bold text-brand-primary mb-4">
              Meet Our Veteran Team
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Our experienced team brings military precision and decades of construction expertise 
              to every consultation and project.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <Card key={index} hover={true}>
                <CardHeader className="text-center">
                  <div className="text-6xl mb-4">{member.avatar}</div>
                  <CardTitle className="text-xl">{member.name}</CardTitle>
                  <div className="text-brand-secondary font-semibold">{member.title}</div>
                  <div className="text-sm text-gray-600">{member.military}</div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div>
                      <span className="text-gray-600">Specialty:</span>
                      <span className="ml-2 font-semibold">{member.specialty}</span>
                    </div>
                    <div>
                      <span className="text-gray-600">Experience:</span>
                      <span className="ml-2 font-semibold">{member.experience}</span>
                    </div>
                    <div>
                      <span className="text-gray-600">Availability:</span>
                      <span className="ml-2 text-sm">{member.availability}</span>
                    </div>
                    <Button variant="primary" size="sm" className="w-full">
                      Book with {member.name.split(' ')[0]}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 bg-brand-primary text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-tactic-bold mb-6">
              Why Choose MH Construction Consultations?
            </h2>
            <p className="text-xl text-gray-100 max-w-3xl mx-auto">
              Our military-precision approach ensures every consultation delivers maximum value 
              and actionable insights for your construction project.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: '🎖️',
                title: 'Veteran Expertise',
                description: 'Military-trained professionals with decades of construction experience'
              },
              {
                icon: '📋',
                title: 'Detailed Planning',
                description: 'Comprehensive project assessment with actionable next steps'
              },
              {
                icon: '💰',
                title: 'Cost Transparency',
                description: 'Honest pricing with no hidden fees or surprise costs'
              },
              {
                icon: '⚡',
                title: 'Quick Response',
                description: 'Same-day confirmation and 24-hour follow-up guaranteed'
              }
            ].map((benefit, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl mb-4">{benefit.icon}</div>
                <h3 className="text-xl font-tactic-bold mb-3">{benefit.title}</h3>
                <p className="text-gray-200">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Emergency Consultation */}
      <section className="py-16 bg-red-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-tactic-bold mb-6">
            Need Emergency Consultation?
          </h2>
          <p className="text-xl mb-8">
            Structural damage, permit issues, or construction emergencies? 
            Our veteran team provides 24/7 emergency consultation services.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="secondary" size="lg" className="bg-white text-red-600 hover:bg-gray-100">
              Call Emergency Line: (509) 308-6489
            </Button>
            <Button variant="primary" size="lg" className="bg-red-700 hover:bg-red-800">
              Request Emergency Consultation
            </Button>
          </div>
        </div>
      </section>
    </>
  )
}