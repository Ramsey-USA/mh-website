import {
  Button,
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from '../../components/ui'
import { ContactForm } from '../../components/contact/ContactForm'
import {
  InteractiveMap,
  ServiceAreaOverview,
} from '../../components/map/InteractiveMap'
import { LeadCapture } from '../../components/lead/LeadCapture'

export default function ContactPage() {
  const contactInfo = {
    phone: '(509) 308-6489',
    email: 'info@mhconstruction.com',
    address: {
      street: '3111 N. Capital Ave.',
      city: 'Pasco',
      state: 'WA',
      zip: '99301',
    },
    businessHours: {
      consultations: 'Monday-Friday 8:00 AM - 3:00 PM (Pacific Time)',
      general: 'Monday-Friday 7:00 AM - 6:00 PM, Saturday 8:00 AM - 4:00 PM',
      emergency: 'Available 24/7',
    },
  }

  const contactMethods = [
    {
      icon: '📞',
      title: 'Phone',
      primary: contactInfo.phone,
      secondary: 'Direct line to our team',
      action: 'Call Now',
    },
    {
      icon: '📧',
      title: 'Email',
      primary: contactInfo.email,
      secondary: 'We respond within 2 hours',
      action: 'Send Email',
    },
    {
      icon: '📍',
      title: 'Visit Us',
      primary: `${contactInfo.address.street}, ${contactInfo.address.city}`,
      secondary: `${contactInfo.address.state} ${contactInfo.address.zip}`,
      action: 'Get Directions',
    },
    {
      icon: '💬',
      title: 'Live Chat',
      primary: '24/7 AI Assistant',
      secondary: 'Instant responses to your questions',
      action: 'Start Chat',
    },
  ]

  return (
    <>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-brand-primary to-brand-secondary text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-tactic-bold mb-6">
              Contact MH Construction
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-gray-100 max-w-3xl mx-auto">
              Ready to start your project? Our veteran team is standing by to
              provide expert consultation and military-precision service.
            </p>
            <Button variant="secondary" size="lg">
              Schedule Free Consultation
            </Button>
          </div>
        </div>
      </section>

      {/* Contact Methods */}
      <section className="py-16 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-tactic-bold text-brand-primary mb-4">
              Get In Touch
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Multiple ways to connect with our team. Choose the method that
              works best for you.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {contactMethods.map((method, index) => (
              <Card key={index} hover={true} className="text-center">
                <CardHeader>
                  <div className="text-4xl mb-4">{method.icon}</div>
                  <CardTitle>{method.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="font-semibold text-brand-primary mb-1">
                    {method.primary}
                  </p>
                  <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
                    {method.secondary}
                  </p>
                  <Button variant="primary" size="sm" className="w-full">
                    {method.action}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form & Info */}
      <section className="py-16 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div>
              <ContactForm formType="general" title="Send Us a Message" />
            </div>

            {/* Contact Information */}
            <div className="space-y-8">
              {/* Business Hours */}
              <Card>
                <CardHeader>
                  <CardTitle>Business Hours</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold text-brand-primary">
                        Consultations
                      </h4>
                      <p className="text-gray-600">
                        {contactInfo.businessHours.consultations}
                      </p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-brand-primary">
                        General Business
                      </h4>
                      <p className="text-gray-600">
                        {contactInfo.businessHours.general}
                      </p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-yellow-600">
                        Emergency Services
                      </h4>
                      <p className="text-gray-600">
                        {contactInfo.businessHours.emergency}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Location */}
              <Card>
                <CardHeader>
                  <CardTitle>Our Location</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-start">
                      <svg
                        className="w-5 h-5 text-brand-primary mr-3 mt-0.5 flex-shrink-0"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <div>
                        <p className="font-semibold">
                          {contactInfo.address.street}
                        </p>
                        <p className="text-gray-600">
                          {contactInfo.address.city},{' '}
                          {contactInfo.address.state} {contactInfo.address.zip}
                        </p>
                      </div>
                    </div>

                    <Button variant="secondary" size="sm" className="w-full">
                      Get Directions
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Quick Response */}
              <Card className="bg-brand-primary text-white">
                <CardHeader>
                  <CardTitle className="text-white">
                    Quick Response Guarantee
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center">
                      <svg
                        className="w-5 h-5 mr-3 flex-shrink-0"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span>2-hour response during business hours</span>
                    </div>
                    <div className="flex items-center">
                      <svg
                        className="w-5 h-5 mr-3 flex-shrink-0"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span>24/7 emergency response available</span>
                    </div>
                    <div className="flex items-center">
                      <svg
                        className="w-5 h-5 mr-3 flex-shrink-0"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span>Free consultation within 48 hours</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Service Areas */}
              <Card>
                <CardHeader>
                  <CardTitle>Service Areas</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-3">
                    We proudly serve the Pacific Northwest region:
                  </p>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    {[
                      'Pasco, WA',
                      'Kennewick, WA',
                      'Richland, WA',
                      'Walla Walla, WA',
                      'Yakima, WA',
                      'Spokane, WA',
                    ].map((area, index) => (
                      <div key={index} className="flex items-center">
                        <span className="text-brand-secondary mr-2">•</span>
                        <span>{area}</span>
                      </div>
                    ))}
                  </div>
                  <p className="text-xs text-gray-500 mt-3">
                    Additional areas may be available for larger projects
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Map & Service Areas */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-tactic-bold text-gray-900 mb-4">
              Our Location & Service Areas
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Based in Pasco, WA, we proudly serve the entire Pacific Northwest
              region. Find us on the map and explore our comprehensive service
              areas.
            </p>
          </div>

          <div className="mb-16">
            <InteractiveMap
              showServiceAreas={true}
              showProjects={true}
              height="500px"
              className="mb-8"
            />
          </div>

          <div>
            <h3 className="text-2xl font-semibold text-center mb-8">
              Detailed Service Area Information
            </h3>
            <ServiceAreaOverview />
          </div>
        </div>
      </section>

      {/* Lead Capture Section */}
      <section className="py-16 bg-gradient-to-br from-brand-primary to-brand-secondary">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="text-white">
              <h2 className="text-3xl font-tactic-bold mb-6">
                Ready to Start Your Dream Project?
              </h2>
              <div className="space-y-4 text-lg">
                <div className="flex items-center">
                  <span className="text-2xl mr-3">🏗️</span>
                  <span>20+ years of construction excellence</span>
                </div>
                <div className="flex items-center">
                  <span className="text-2xl mr-3">🇺🇸</span>
                  <span>Veteran-owned and operated</span>
                </div>
                <div className="flex items-center">
                  <span className="text-2xl mr-3">🛡️</span>
                  <span>Licensed, bonded & fully insured</span>
                </div>
                <div className="flex items-center">
                  <span className="text-2xl mr-3">⚡</span>
                  <span>24-hour response guarantee</span>
                </div>
              </div>
            </div>
            <div>
              <LeadCapture
                source="contact_page_cta"
                title="Get Your Free Consultation"
                subtitle="No obligation • Free estimates • Expert guidance"
                className="bg-white"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Emergency Contact */}
      <section className="py-16 bg-red-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-tactic-bold mb-6">
            Emergency Construction Services
          </h2>
          <p className="text-xl mb-8">
            Storm damage, structural emergencies, or urgent repairs? Our veteran
            team responds 24/7 to keep you safe.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              variant="secondary"
              size="lg"
              className="bg-white text-red-600 hover:bg-gray-100"
            >
              Call Emergency Line: {contactInfo.phone}
            </Button>
            <Button
              variant="primary"
              size="lg"
              className="bg-red-700 hover:bg-red-800"
            >
              Emergency Contact Form
            </Button>
          </div>
        </div>
      </section>
    </>
  )
}
