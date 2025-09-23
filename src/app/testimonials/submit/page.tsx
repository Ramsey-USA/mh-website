import { generateSEOMetadata } from '@/components/seo/seo-meta'
import TestimonialSubmissionForm from '@/components/testimonials/TestimonialSubmissionForm'
import Link from 'next/link'
import { Star, Users, Award, TrendingUp } from 'lucide-react'

// Generate metadata for the testimonial submission page
export const metadata = generateSEOMetadata({
  title: 'Submit a Testimonial',
  description:
    'Share your experience with MH Construction. Submit a testimonial about your construction project and help others learn about our quality services.',
  keywords: [
    'testimonial submission',
    'client review',
    'construction feedback',
    'MH Construction review',
    'customer experience',
    'project testimonial',
  ],
})

export default function SubmitTestimonialPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-900 to-blue-700 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl font-bold mb-6">Share Your Experience</h1>
            <p className="text-xl text-blue-100 mb-8">
              Help others discover the quality and professionalism of MH
              Construction by sharing your project experience with us.
            </p>

            {/* Why Share Section */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
              <div className="bg-white/10 rounded-lg p-6 backdrop-blur-sm">
                <Users className="h-8 w-8 text-white mx-auto mb-3" />
                <h3 className="font-semibold text-white mb-2">Help Others</h3>
                <p className="text-blue-100 text-sm">
                  Your experience helps future clients make informed decisions
                  about their construction projects.
                </p>
              </div>

              <div className="bg-white/10 rounded-lg p-6 backdrop-blur-sm">
                <Award className="h-8 w-8 text-white mx-auto mb-3" />
                <h3 className="font-semibold text-white mb-2">
                  Showcase Quality
                </h3>
                <p className="text-blue-100 text-sm">
                  Your testimonial showcases the quality craftsmanship and
                  professional service we provide.
                </p>
              </div>

              <div className="bg-white/10 rounded-lg p-6 backdrop-blur-sm">
                <TrendingUp className="h-8 w-8 text-white mx-auto mb-3" />
                <h3 className="font-semibold text-white mb-2">Build Trust</h3>
                <p className="text-blue-100 text-sm">
                  Authentic reviews build trust and confidence in our
                  construction services and expertise.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          {/* Instructions */}
          <div className="max-w-4xl mx-auto mb-12">
            <div className="bg-white rounded-lg shadow-md p-8 mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                How to Submit Your Testimonial
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="text-center">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <span className="text-blue-600 font-bold">1</span>
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">
                    Contact Info
                  </h3>
                  <p className="text-sm text-gray-600">
                    Provide your contact details and project location.
                  </p>
                </div>

                <div className="text-center">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <span className="text-blue-600 font-bold">2</span>
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">
                    Project Details
                  </h3>
                  <p className="text-sm text-gray-600">
                    Tell us about your construction project and timeline.
                  </p>
                </div>

                <div className="text-center">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <span className="text-blue-600 font-bold">3</span>
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">
                    Your Review
                  </h3>
                  <p className="text-sm text-gray-600">
                    Rate your experience and write your testimonial.
                  </p>
                </div>

                <div className="text-center">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <span className="text-blue-600 font-bold">4</span>
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">
                    Photos & Submit
                  </h3>
                  <p className="text-sm text-gray-600">
                    Upload project photos and submit your testimonial.
                  </p>
                </div>
              </div>
            </div>

            {/* Tips for Writing a Good Testimonial */}
            <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-lg p-6 mb-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Tips for Writing a Great Testimonial
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-700">
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <Star className="h-4 w-4 text-yellow-500 mt-0.5 flex-shrink-0" />
                    <span>Be specific about what impressed you most</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Star className="h-4 w-4 text-yellow-500 mt-0.5 flex-shrink-0" />
                    <span>Mention the quality of work and professionalism</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Star className="h-4 w-4 text-yellow-500 mt-0.5 flex-shrink-0" />
                    <span>
                      Describe the communication and project management
                    </span>
                  </li>
                </ul>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <Star className="h-4 w-4 text-yellow-500 mt-0.5 flex-shrink-0" />
                    <span>
                      Share how the project met or exceeded expectations
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Star className="h-4 w-4 text-yellow-500 mt-0.5 flex-shrink-0" />
                    <span>
                      Include details about timeline and budget adherence
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Star className="h-4 w-4 text-yellow-500 mt-0.5 flex-shrink-0" />
                    <span>Mention if you would recommend our services</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Testimonial Form */}
          <TestimonialSubmissionForm />
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-gray-900 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">
            Ready to Start Your Construction Project?
          </h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            See why our clients consistently rate us 5 stars. Get started with a
            free consultation and experience the MH Construction difference for
            yourself.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="bg-blue-600 text-white font-bold py-3 px-8 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Get Free Consultation
            </Link>
            <Link
              href="/testimonials"
              className="border-2 border-white text-white font-bold py-3 px-8 rounded-lg hover:bg-white hover:text-gray-900 transition-colors"
            >
              Read More Testimonials
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
