import { Button, Card, CardHeader, CardTitle, CardContent } from '../../components/ui'

export default function AboutPage() {
  const teamMembers = [
    {
      name: "Michael Henderson",
      role: "Founder & CEO",
      experience: "25 years",
      military: "U.S. Army Veteran",
      specialties: ["Project Management", "Commercial Construction", "Team Leadership"]
    },
    {
      name: "Sarah Mitchell",
      role: "Lead Project Manager",
      experience: "15 years",
      military: "U.S. Navy Veteran", 
      specialties: ["Residential Construction", "Quality Assurance", "Client Relations"]
    },
    {
      name: "David Rodriguez",
      role: "Senior Foreman",
      experience: "20 years",
      military: "U.S. Marines Veteran",
      specialties: ["Site Management", "Safety Protocols", "Crew Coordination"]
    },
    {
      name: "Jennifer Adams",
      role: "Design Coordinator",
      experience: "12 years",
      military: "U.S. Air Force Veteran",
      specialties: ["Architectural Design", "3D Modeling", "Client Consultation"]
    }
  ]

  const companyStats = [
    { number: "150+", label: "Years Combined Experience" },
    { number: "500+", label: "Projects Completed" },
    { number: "98%", label: "Client Satisfaction" },
    { number: "24/7", label: "Emergency Support" }
  ]

  return (
    <>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-brand-primary to-brand-secondary text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-tactic-bold mb-6">
              About MH Construction
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-gray-100 max-w-3xl mx-auto">
              Veteran-owned excellence serving the Pacific Northwest with military precision, 
              integrity, and cutting-edge technology since our founding.
            </p>
          </div>
        </div>
      </section>

      {/* Company Story */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-tactic-bold text-brand-primary mb-6">
                Our Story
              </h2>
              <div className="space-y-4 text-gray-700">
                <p>
                  MH Construction was founded on the principles learned through military service: 
                  unwavering commitment to excellence, attention to detail, and the understanding 
                  that every mission—whether in service to country or community—deserves nothing less than our best.
                </p>
                <p>
                  Located in Pasco, Washington, we proudly serve the Pacific Northwest region with 
                  comprehensive construction services. Our team brings together 150+ years of combined 
                  experience, military-trained discipline, and innovative technology to deliver 
                  exceptional results on every project.
                </p>
                <p>
                  As a veteran-owned company, we understand the values that matter: ethics, integrity, 
                  honesty, trust, professionalism, and experience. These aren&apos;t just words to us—they&apos;re 
                  the foundation of every relationship we build and every structure we create.
                </p>
              </div>
            </div>
            
            <div className="space-y-6">
              <Card>
                <CardContent>
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-brand-primary text-white rounded-full flex items-center justify-center mr-4">
                      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <h3 className="text-xl font-bold text-brand-primary">Our Mission</h3>
                  </div>
                  <p className="text-gray-700">
                    To revolutionize construction through military precision, cutting-edge AI technology, 
                    and unwavering commitment to client satisfaction.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent>
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-brand-secondary text-white rounded-full flex items-center justify-center mr-4">
                      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                        <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <h3 className="text-xl font-bold text-brand-primary">Our Vision</h3>
                  </div>
                  <p className="text-gray-700">
                    To be the Pacific Northwest&apos;s leading construction company, known for innovation, 
                    integrity, and supporting our veteran community.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Company Stats */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-tactic-bold text-brand-primary mb-4">
              Proven Excellence
            </h2>
            <p className="text-lg text-gray-600">
              Numbers that showcase our commitment to quality and service
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {companyStats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl font-tactic-bold text-brand-primary mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-600 font-medium">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-tactic-bold text-brand-primary mb-4">
              Meet Our Veteran Team
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Our leadership team brings military discipline, extensive experience, 
              and unwavering commitment to every project we undertake.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <Card key={index} hover={true}>
                <CardHeader>
                  <div className="w-20 h-20 bg-gradient-to-br from-brand-primary to-brand-secondary rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-white font-tactic-bold text-2xl">
                      {member.name.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                  <CardTitle className="text-center">{member.name}</CardTitle>
                  <p className="text-center text-brand-secondary font-semibold">
                    {member.role}
                  </p>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center">
                      <span className="font-semibold text-gray-700 mr-2">Experience:</span>
                      <span className="text-gray-600">{member.experience}</span>
                    </div>
                    <div className="flex items-center">
                      <span className="font-semibold text-gray-700 mr-2">Service:</span>
                      <span className="text-gray-600">{member.military}</span>
                    </div>
                    <div className="mt-3">
                      <span className="font-semibold text-gray-700">Specialties:</span>
                      <ul className="mt-1 space-y-1">
                        {member.specialties.map((specialty, idx) => (
                          <li key={idx} className="text-gray-600 text-xs">
                            • {specialty}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Military Values */}
      <section className="py-16 bg-brand-primary text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-tactic-bold mb-6">
              Our Core Values
            </h2>
            <p className="text-xl text-gray-100 max-w-3xl mx-auto">
              These military values guide every decision, every project, and every interaction we have
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { 
                title: "Ethics", 
                description: "Transparent pricing, honest timelines, and moral integrity in all our operations" 
              },
              { 
                title: "Experience", 
                description: "150+ years combined expertise delivering exceptional construction solutions" 
              },
              { 
                title: "Integrity", 
                description: "Consistent performance and reliable delivery, standing behind our word" 
              },
              { 
                title: "Honesty", 
                description: "Open communication with no hidden costs or surprise changes" 
              },
              { 
                title: "Trust", 
                description: "Building lasting relationships through proven track record and reliability" 
              },
              { 
                title: "Professionalism", 
                description: "Military-grade precision and quality assurance in every aspect of our work" 
              }
            ].map((value, index) => (
              <Card key={index} className="bg-white bg-opacity-10 backdrop-blur border-white border-opacity-20">
                <CardHeader>
                  <CardTitle className="text-white text-center">{value.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-100 text-center">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Wounded Warrior Initiative */}
      <section className="py-16 bg-gray-900 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-tactic-bold mb-6 text-yellow-400">
            Wounded Warrior Initiative
          </h2>
          <p className="text-xl mb-8 text-gray-100">
            Supporting our veteran community through comprehensive construction services, 
            accessibility improvements, and emergency repairs.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-gray-800 p-6 rounded-lg">
              <h3 className="font-bold text-yellow-400 mb-2">Free Modifications</h3>
              <p className="text-gray-300 text-sm">
                Accessibility improvements for wounded veterans and their families
              </p>
            </div>
            <div className="bg-gray-800 p-6 rounded-lg">
              <h3 className="font-bold text-yellow-400 mb-2">Priority Support</h3>
              <p className="text-gray-300 text-sm">
                24/7 emergency response and priority scheduling for veterans
              </p>
            </div>
            <div className="bg-gray-800 p-6 rounded-lg">
              <h3 className="font-bold text-yellow-400 mb-2">Technology Access</h3>
              <p className="text-gray-300 text-sm">
                Enhanced AI assistance and veteran-specific support features
              </p>
            </div>
          </div>
          <Button variant="secondary" size="lg">
            Learn About Veteran Services
          </Button>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-brand-secondary text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-tactic-bold mb-6">
            Ready to Work with Veterans?
          </h2>
          <p className="text-xl mb-8">
            Experience the difference that military precision and construction expertise makes
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="primary" size="lg" className="bg-white text-brand-secondary hover:bg-gray-100">
              Schedule Consultation
            </Button>
            <Button variant="primary" size="lg" className="bg-brand-primary hover:bg-brand-primary/80">
              View Our Portfolio
            </Button>
          </div>
        </div>
      </section>
    </>
  )
}