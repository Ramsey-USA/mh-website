import { Button, Card, CardHeader, CardTitle, CardContent } from '../components/ui'

export default function Home() {
  return (
    <>
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
              <Button variant="secondary" size="lg">
                Schedule Free Consultation
              </Button>
              <Button variant="primary" size="lg">
                Get AI Estimate
              </Button>
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
            <Button variant="secondary" size="lg">
              Schedule Consultation
            </Button>
            <Button variant="primary" size="lg" className="bg-white text-brand-primary hover:bg-gray-100">
              Get Free Estimate
            </Button>
          </div>
        </div>
      </section>
    </>
  )
}