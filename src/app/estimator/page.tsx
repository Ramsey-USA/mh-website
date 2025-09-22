import { Button, Card, CardHeader, CardTitle, CardContent, Input } from '../../components/ui'
import { EstimatorForm, EstimateResults } from '../../components/estimator'

export default function EstimatorPage() {
  const features = [
    {
      icon: "🎯",
      title: "Precision Accuracy",
      description: "Military-grade precision using advanced AI algorithms and real-time market data"
    },
    {
      icon: "⚡",
      title: "Instant Results",
      description: "Get detailed estimates in under 60 seconds with breakdown by materials and labor"
    },
    {
      icon: "📊",
      title: "Market Intelligence",
      description: "Real-time pricing based on current material costs and regional labor rates"
    },
    {
      icon: "🔄",
      title: "Dynamic Updates",
      description: "Estimates automatically adjust for seasonal pricing and material availability"
    },
    {
      icon: "📋",
      title: "Detailed Breakdown",
      description: "Complete cost analysis including permits, materials, labor, and contingencies"
    },
    {
      icon: "🎖️",
      title: "Veteran Discount",
      description: "Automatic military discount calculation for qualifying service members"
    }
  ]

  const projectTypes = [
    {
      type: "Custom Home",
      range: "$150,000 - $500,000+",
      timeline: "6-12 months",
      complexity: "High"
    },
    {
      type: "Home Addition", 
      range: "$25,000 - $150,000",
      timeline: "2-6 months",
      complexity: "Medium"
    },
    {
      type: "Kitchen Remodel",
      range: "$15,000 - $75,000", 
      timeline: "4-8 weeks",
      complexity: "Medium"
    },
    {
      type: "Bathroom Remodel",
      range: "$8,000 - $35,000",
      timeline: "2-4 weeks", 
      complexity: "Low-Medium"
    },
    {
      type: "Deck/Patio",
      range: "$5,000 - $25,000",
      timeline: "1-3 weeks",
      complexity: "Low"
    },
    {
      type: "Commercial Build",
      range: "$200,000 - $2M+",
      timeline: "6-18 months",
      complexity: "High"
    }
  ]

  return (
    <>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-brand-primary to-brand-secondary text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-tactic-bold mb-6">
              AI-Powered Cost Estimator
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-gray-100 max-w-4xl mx-auto">
              Get instant, accurate construction estimates powered by military-precision AI technology. 
              No more waiting weeks for quotes - get reliable pricing in under 60 seconds.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="secondary" size="lg">
                Start Your Estimate
              </Button>
              <Button variant="primary" size="lg" className="bg-transparent border-2 border-white hover:bg-white hover:text-brand-primary">
                Watch Demo
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-tactic-bold text-brand-primary mb-4">
              Advanced Estimation Technology
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Our AI estimator combines decades of construction experience with cutting-edge technology 
              to deliver the most accurate estimates in the industry.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} hover={true}>
                <CardHeader>
                  <div className="text-3xl mb-4">{feature.icon}</div>
                  <CardTitle>{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Interactive Estimator */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-tactic-bold text-brand-primary mb-4">
              Get Your Instant Estimate
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Answer a few questions about your project and receive a detailed, accurate estimate 
              with full cost breakdown and timeline.
            </p>
          </div>

          <EstimatorForm />
        </div>
      </section>

      {/* Project Type Examples */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-tactic-bold text-brand-primary mb-4">
              Project Types & Typical Ranges
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Our AI estimator covers all types of construction projects. Here are typical ranges 
              for common project types in the Pacific Northwest.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projectTypes.map((project, index) => (
              <Card key={index} hover={true}>
                <CardHeader>
                  <CardTitle className="text-xl">{project.type}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Price Range:</span>
                      <span className="font-semibold text-brand-primary">{project.range}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Timeline:</span>
                      <span className="font-semibold">{project.timeline}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Complexity:</span>
                      <span className={`font-semibold ${
                        project.complexity === 'High' ? 'text-red-600' : 
                        project.complexity === 'Medium' ? 'text-yellow-600' : 
                        'text-green-600'
                      }`}>
                        {project.complexity}
                      </span>
                    </div>
                  </div>
                  <Button variant="primary" size="sm" className="w-full mt-4">
                    Get Estimate for {project.type}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Accuracy Guarantee */}
      <section className="py-16 bg-brand-primary text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-tactic-bold mb-6">
            95% Accuracy Guarantee
          </h2>
          <p className="text-xl mb-8">
            Our AI estimator has been trained on thousands of projects and maintains a 95% accuracy rate. 
            If your final project cost varies by more than 10% from our estimate, we&apos;ll provide 
            a credit toward your next project.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            <div>
              <div className="text-4xl font-tactic-bold mb-2">10,000+</div>
              <div className="text-gray-200">Projects Analyzed</div>
            </div>
            <div>
              <div className="text-4xl font-tactic-bold mb-2">95%</div>
              <div className="text-gray-200">Accuracy Rate</div>
            </div>
            <div>
              <div className="text-4xl font-tactic-bold mb-2">&lt;60s</div>
              <div className="text-gray-200">Estimate Time</div>
            </div>
          </div>
          <Button variant="secondary" size="lg">
            Try the Estimator Now
          </Button>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-tactic-bold text-brand-primary mb-4">
              How Our AI Estimator Works
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Built by veterans with decades of construction experience and powered by 
              machine learning algorithms trained on thousands of completed projects.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                step: "1",
                title: "Project Details",
                description: "Tell us about your project: type, size, location, and key requirements"
              },
              {
                step: "2", 
                title: "AI Analysis",
                description: "Our AI analyzes your project against our database of 10,000+ completed projects"
              },
              {
                step: "3",
                title: "Market Data",
                description: "Real-time material costs and regional labor rates are factored into the estimate"
              },
              {
                step: "4",
                title: "Detailed Report",
                description: "Receive comprehensive breakdown with timeline, materials, labor, and total cost"
              }
            ].map((step, index) => (
              <div key={index} className="text-center">
                <div className="bg-brand-primary text-white w-12 h-12 rounded-full flex items-center justify-center text-xl font-tactic-bold mx-auto mb-4">
                  {step.step}
                </div>
                <h3 className="text-xl font-tactic-bold text-brand-primary mb-3">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}