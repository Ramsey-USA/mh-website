"use client";

import Link from "next/link";
import {
  Button,
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui";
import { MaterialIcon } from "@/components/icons/MaterialIcon";
import {
  FadeInWhenVisible,
  StaggeredFadeIn,
  HoverScale,
} from "@/components/animations/FramerMotionComponents";
import { OptimizedImage } from "@/components/ui/media/OptimizedImage";
import {
  AboutHero,
  AboutValues,
  coreValues,
  PartnershipPhilosophy,
  CompanyStats,
  LeadershipTeam,
} from "@/components/about";

export default function AboutPage() {
  return (
    <div className="bg-gradient-to-b from-white dark:from-gray-900 to-gray-50 dark:to-gray-800 min-h-screen">
      {/* Hero Section */}
      <AboutHero />

      {/* Partnership Philosophy Section */}
      <PartnershipPhilosophy />

      {/* Company Stats */}
      <CompanyStats />

      {/* Core Values Section */}
      <AboutValues coreValues={coreValues} />

      {/* Leadership Team Section */}
      <LeadershipTeam />

      {/* Why Values Matter Section */}
      <section className="bg-white dark:bg-gray-900 py-16 lg:py-24">
        <div className="mx-auto px-4 container">
          <FadeInWhenVisible>
            <div className="mx-auto max-w-6xl">
              <h2 className="mb-16 font-black text-gray-900 dark:text-gray-100 text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-center leading-tight tracking-tighter">
                <span className="block mb-3 font-semibold text-gray-700 dark:text-gray-300 text-3xl sm:text-4xl md:text-5xl lg:text-6xl tracking-tight">
                  Why Our Values
                </span>
                <span className="block text-brand-primary dark:text-brand-primary font-black">
                  Matter
                </span>
              </h2>

              <div className="gap-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
                <Card className="bg-white dark:bg-gray-800 hover:shadow-xl dark:hover:shadow-gray-600/50 border border-gray-200 dark:border-gray-700 border-l-4 border-l-brand-primary transition-all hover:-translate-y-2 duration-300">
                  <CardHeader className="text-center">
                    <MaterialIcon
                      icon="people"
                      className="mb-4 text-brand-primary text-5xl"
                    />
                    <CardTitle className="text-gray-900 dark:text-white text-xl sm:text-2xl md:text-3xl">
                      For Our Partners
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3 text-gray-700 dark:text-gray-300">
                      <li className="flex items-start">
                        <MaterialIcon
                          icon="check_circle"
                          className="flex-shrink-0 mt-1 mr-3 text-brand-accent text-sm sm:text-base"
                        />
                        <span className="leading-relaxed text-sm sm:text-base md:text-lg">
                          Predictable, consistent experience
                        </span>
                      </li>
                      <li className="flex items-start">
                        <MaterialIcon
                          icon="check_circle"
                          className="flex-shrink-0 mt-1 mr-3 text-brand-accent text-sm sm:text-base"
                        />
                        <span className="leading-relaxed text-sm sm:text-base md:text-lg">
                          Peace of mind and confidence
                        </span>
                      </li>
                      <li className="flex items-start">
                        <MaterialIcon
                          icon="check_circle"
                          className="flex-shrink-0 mt-1 mr-3 text-brand-accent text-sm sm:text-base"
                        />
                        <span className="leading-relaxed text-sm sm:text-base md:text-lg">
                          Long-term partnership
                        </span>
                      </li>
                      <li className="flex items-start">
                        <MaterialIcon
                          icon="check_circle"
                          className="flex-shrink-0 mt-1 mr-3 text-brand-accent text-sm sm:text-base"
                        />
                        <span className="leading-relaxed text-sm sm:text-base md:text-lg">
                          Community impact
                        </span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>

                <Card className="bg-white dark:bg-gray-800 hover:shadow-xl dark:hover:shadow-gray-600/50 border border-gray-200 dark:border-gray-700 border-l-4 border-l-brand-secondary transition-all hover:-translate-y-2 duration-300">
                  <CardHeader className="text-center">
                    <MaterialIcon
                      icon="location_city"
                      className="mb-4 text-brand-secondary text-5xl"
                    />
                    <CardTitle className="text-gray-900 dark:text-white text-xl sm:text-2xl md:text-3xl">
                      For Our Community
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3 text-gray-700 dark:text-gray-300">
                      <li className="flex items-start">
                        <MaterialIcon
                          icon="check_circle"
                          className="flex-shrink-0 mt-1 mr-3 text-brand-accent text-sm sm:text-base"
                        />
                        <span className="leading-relaxed text-sm sm:text-base md:text-lg">
                          Economic development
                        </span>
                      </li>
                      <li className="flex items-start">
                        <MaterialIcon
                          icon="check_circle"
                          className="flex-shrink-0 mt-1 mr-3 text-brand-accent text-sm sm:text-base"
                        />
                        <span className="leading-relaxed text-sm sm:text-base md:text-lg">
                          Quality standards
                        </span>
                      </li>
                      <li className="flex items-start">
                        <MaterialIcon
                          icon="check_circle"
                          className="flex-shrink-0 mt-1 mr-3 text-brand-accent text-sm sm:text-base"
                        />
                        <span className="leading-relaxed text-sm sm:text-base md:text-lg">
                          Veteran support
                        </span>
                      </li>
                      <li className="flex items-start">
                        <MaterialIcon
                          icon="check_circle"
                          className="flex-shrink-0 mt-1 mr-3 text-brand-accent text-sm sm:text-base"
                        />
                        <span className="leading-relaxed text-sm sm:text-base md:text-lg">
                          Sustainable growth
                        </span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>

                <Card className="bg-white dark:bg-gray-800 hover:shadow-xl dark:hover:shadow-gray-600/50 border border-gray-200 dark:border-gray-700 border-l-4 border-l-brand-accent transition-all hover:-translate-y-2 duration-300">
                  <CardHeader className="text-center">
                    <MaterialIcon
                      icon="engineering"
                      className="mb-4 text-brand-accent text-5xl"
                    />
                    <CardTitle className="text-gray-900 dark:text-white text-xl sm:text-2xl md:text-3xl">
                      For Our Team
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3 text-gray-700 dark:text-gray-300">
                      <li className="flex items-start">
                        <MaterialIcon
                          icon="check_circle"
                          className="flex-shrink-0 mt-1 mr-3 text-brand-accent text-sm sm:text-base"
                        />
                        <span className="leading-relaxed text-sm sm:text-base md:text-lg">
                          Professional pride
                        </span>
                      </li>
                      <li className="flex items-start">
                        <MaterialIcon
                          icon="check_circle"
                          className="flex-shrink-0 mt-1 mr-3 text-brand-accent text-sm sm:text-base"
                        />
                        <span className="leading-relaxed text-sm sm:text-base md:text-lg">
                          Clear standards
                        </span>
                      </li>
                      <li className="flex items-start">
                        <MaterialIcon
                          icon="check_circle"
                          className="flex-shrink-0 mt-1 mr-3 text-brand-accent text-sm sm:text-base"
                        />
                        <span className="leading-relaxed text-sm sm:text-base md:text-lg">
                          Personal growth
                        </span>
                      </li>
                      <li className="flex items-start">
                        <MaterialIcon
                          icon="check_circle"
                          className="flex-shrink-0 mt-1 mr-3 text-brand-accent text-sm sm:text-base"
                        />
                        <span className="leading-relaxed text-sm sm:text-base md:text-lg">
                          Community connection
                        </span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </div>
          </FadeInWhenVisible>
        </div>
      </section>

      {/* Client Reviews Section */}
      <section
        id="testimonials"
        className="bg-gray-50 dark:bg-gray-800 py-16 lg:py-24"
      >
        <div className="mx-auto px-4 container">
          <FadeInWhenVisible>
            <div className="mx-auto max-w-4xl text-center mb-12">
              <h2 className="mb-6 font-black text-gray-900 dark:text-white text-5xl sm:text-6xl md:text-7xl lg:text-8xl leading-tight tracking-tighter">
                <span className="block mb-3 font-semibold text-gray-700 dark:text-gray-300 text-3xl sm:text-4xl md:text-5xl lg:text-6xl tracking-tight">
                  Partnership
                </span>
                <span className="block text-brand-primary dark:text-brand-primary font-black">
                  Reviews
                </span>
              </h2>
              <p className="mx-auto max-w-3xl font-light text-gray-600 dark:text-gray-300 text-xl md:text-2xl lg:text-3xl leading-relaxed tracking-wide">
                Hear directly from our partners about their experience working
                with MH Construction on their most important projects.
              </p>
            </div>
          </FadeInWhenVisible>

          <StaggeredFadeIn className="gap-8 grid grid-cols-1 lg:grid-cols-3 mx-auto max-w-7xl">
            <Card className="bg-white dark:bg-gray-900 hover:shadow-lg border border-gray-200 dark:border-gray-700 transition-all duration-300 h-full">
              <CardHeader>
                <div className="flex items-center space-x-3 mb-4">
                  <div className="flex space-x-1">
                    {[...Array(5)].map((_, i) => (
                      <MaterialIcon
                        key={i}
                        icon="star"
                        size="sm"
                        className="text-brand-secondary"
                      />
                    ))}
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 dark:text-gray-300 mb-4 italic leading-relaxed text-sm sm:text-base md:text-lg">
                  "Working with Todd and the MH Construction team on our Baskin
                  Robbins build was exceptional. Todd's communication throughout
                  the entire project kept us informed every step of the way, and
                  the quality of workmanship exceeded our expectations. From
                  start to finish, they demonstrated professionalism and
                  attention to detail that made this build a success."
                </p>
                <div className="flex items-center space-x-3">
                  <div className="bg-brand-primary/20 w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0">
                    <MaterialIcon
                      icon="store"
                      size="sm"
                      className="text-brand-primary"
                    />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white text-xs sm:text-sm md:text-base">
                      John Smith
                    </p>
                    <p className="text-gray-500 dark:text-gray-400 text-xs sm:text-sm">
                      Baskin Robbins Store Build - $250K Project
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white dark:bg-gray-900 hover:shadow-lg border border-gray-200 dark:border-gray-700 transition-all duration-300 h-full">
              <CardHeader>
                <div className="flex items-center space-x-3 mb-4">
                  <div className="flex space-x-1">
                    {[...Array(5)].map((_, i) => (
                      <MaterialIcon
                        key={i}
                        icon="star"
                        size="sm"
                        className="text-brand-secondary"
                      />
                    ))}
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 dark:text-gray-300 mb-4 italic leading-relaxed text-sm sm:text-base md:text-lg">
                  "The tenant improvement process with MH Construction was
                  outstanding from design through construction. Their ability to
                  facilitate the entire process while managing multiple
                  stakeholders, coordinating various processes, overseeing
                  employees and subcontractors, and maintaining transparency and
                  fairness throughout was truly impressive."
                </p>
                <div className="flex items-center space-x-3">
                  <div className="bg-brand-primary/20 w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0">
                    <MaterialIcon
                      icon="business"
                      size="sm"
                      className="text-brand-primary"
                    />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white text-xs sm:text-sm md:text-base">
                      Keith Bjella
                    </p>
                    <p className="text-gray-500 dark:text-gray-400 text-xs sm:text-sm">
                      Commercial Tenant Improvement - $320K Project
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white dark:bg-gray-900 hover:shadow-lg border border-gray-200 dark:border-gray-700 transition-all duration-300 h-full">
              <CardHeader>
                <div className="flex items-center space-x-3 mb-4">
                  <div className="flex space-x-1">
                    {[...Array(5)].map((_, i) => (
                      <MaterialIcon
                        key={i}
                        icon="star"
                        size="sm"
                        className="text-brand-secondary"
                      />
                    ))}
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 dark:text-gray-300 mb-4 italic leading-relaxed text-sm sm:text-base md:text-lg">
                  "MH Construction exceeded our expectations in every way. Their
                  military precision and attention to detail resulted in our
                  dream home being completed ahead of schedule and within
                  budget. The veteran-owned values really showed in their
                  commitment to excellence."
                </p>
                <div className="flex items-center space-x-3">
                  <div className="bg-brand-primary/20 w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0">
                    <MaterialIcon
                      icon="home"
                      size="sm"
                      className="text-brand-primary"
                    />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white text-xs sm:text-sm md:text-base">
                      Jennifer & Mike Thompson
                    </p>
                    <p className="text-gray-500 dark:text-gray-400 text-xs sm:text-sm">
                      Custom Family Home - $475K Project
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </StaggeredFadeIn>
        </div>
      </section>

      {/* Safety & Compliance Section */}
      <section id="safety" className="bg-white dark:bg-gray-900 py-16 lg:py-24">
        <div className="mx-auto px-4 container">
          <FadeInWhenVisible>
            <div className="mx-auto max-w-4xl text-center mb-12">
              <h2 className="mb-6 font-black text-gray-900 dark:text-white text-5xl sm:text-6xl md:text-7xl lg:text-8xl leading-tight tracking-tighter">
                <span className="block mb-3 font-semibold text-gray-700 dark:text-gray-300 text-3xl sm:text-4xl md:text-5xl lg:text-6xl tracking-tight">
                  Safety &
                </span>
                <span className="block text-brand-primary dark:text-brand-primary font-black">
                  Compliance
                </span>
              </h2>
              <p className="mx-auto max-w-3xl font-light text-gray-600 dark:text-gray-300 text-xl md:text-2xl lg:text-3xl leading-relaxed tracking-wide">
                Safety is never compromised at MH Construction. Our
                comprehensive safety programs and regulatory compliance ensure
                every project meets the highest standards.
              </p>
            </div>
          </FadeInWhenVisible>

          <StaggeredFadeIn className="gap-8 grid grid-cols-1 lg:grid-cols-3 mx-auto max-w-7xl">
            <Card className="bg-white dark:bg-gray-800 hover:shadow-lg dark:hover:shadow-gray-600/50 border border-brand-primary dark:border-brand-primary/50 transition-all duration-300 h-full">
              <CardHeader>
                <div className="flex items-center space-x-3 mb-4">
                  <MaterialIcon
                    icon="security"
                    size="lg"
                    className="text-brand-primary"
                  />
                  <CardTitle className="text-gray-900 dark:text-white text-lg sm:text-xl md:text-2xl">
                    Safety First Culture
                  </CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <MaterialIcon
                      icon="check_circle"
                      className="flex-shrink-0 mt-0.5 mr-2 text-brand-accent text-xs sm:text-sm"
                    />
                    <span className="text-gray-600 dark:text-gray-300 text-xs sm:text-sm md:text-base">
                      Daily safety meetings and protocols
                    </span>
                  </li>
                  <li className="flex items-start">
                    <MaterialIcon
                      icon="check_circle"
                      className="flex-shrink-0 mt-0.5 mr-2 text-brand-accent text-xs sm:text-sm"
                    />
                    <span className="text-gray-600 dark:text-gray-300 text-xs sm:text-sm md:text-base">
                      OSHA-compliant safety training for all team members
                    </span>
                  </li>
                  <li className="flex items-start">
                    <MaterialIcon
                      icon="check_circle"
                      className="flex-shrink-0 mt-0.5 mr-2 text-brand-accent text-xs sm:text-sm"
                    />
                    <span className="text-gray-600 dark:text-gray-300 text-xs sm:text-sm md:text-base">
                      Comprehensive safety equipment and monitoring
                    </span>
                  </li>
                  <li className="flex items-start">
                    <MaterialIcon
                      icon="check_circle"
                      className="flex-shrink-0 mt-0.5 mr-2 text-brand-accent text-xs sm:text-sm"
                    />
                    <span className="text-gray-600 dark:text-gray-300 text-xs sm:text-sm md:text-base">
                      Zero-tolerance policy for safety violations
                    </span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="bg-white dark:bg-gray-800 hover:shadow-lg dark:hover:shadow-gray-600/50 border border-brand-secondary dark:border-brand-secondary/50 transition-all duration-300 h-full">
              <CardHeader>
                <div className="flex items-center space-x-3 mb-4">
                  <MaterialIcon
                    icon="gavel"
                    size="lg"
                    className="text-brand-secondary"
                  />
                  <CardTitle className="text-gray-900 dark:text-white text-lg sm:text-xl md:text-2xl">
                    Regulatory Compliance
                  </CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <MaterialIcon
                      icon="check_circle"
                      className="flex-shrink-0 mt-0.5 mr-2 text-brand-accent text-xs sm:text-sm"
                    />
                    <span className="text-gray-600 dark:text-gray-300 text-xs sm:text-sm md:text-base">
                      Licensed and insured in Washington, Oregon, and Idaho
                    </span>
                  </li>
                  <li className="flex items-start">
                    <MaterialIcon
                      icon="check_circle"
                      className="flex-shrink-0 mt-0.5 mr-2 text-brand-accent text-xs sm:text-sm"
                    />
                    <span className="text-gray-600 dark:text-gray-300 text-xs sm:text-sm md:text-base">
                      Current with all local and federal building codes
                    </span>
                  </li>
                  <li className="flex items-start">
                    <MaterialIcon
                      icon="check_circle"
                      className="flex-shrink-0 mt-0.5 mr-2 text-brand-accent text-xs sm:text-sm"
                    />
                    <span className="text-gray-600 dark:text-gray-300 text-xs sm:text-sm md:text-base">
                      Environmental compliance and sustainability practices
                    </span>
                  </li>
                  <li className="flex items-start">
                    <MaterialIcon
                      icon="check_circle"
                      className="flex-shrink-0 mt-0.5 mr-2 text-brand-accent text-xs sm:text-sm"
                    />
                    <span className="text-gray-600 dark:text-gray-300 text-xs sm:text-sm md:text-base">
                      Regular audits and certification maintenance
                    </span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="bg-white dark:bg-gray-800 hover:shadow-lg dark:hover:shadow-gray-600/50 border border-brand-accent dark:border-brand-accent/50 transition-all duration-300 h-full">
              <CardHeader>
                <div className="flex items-center space-x-3 mb-4">
                  <MaterialIcon
                    icon="health_and_safety"
                    size="lg"
                    className="text-brand-accent"
                  />
                  <CardTitle className="text-gray-900 dark:text-white text-lg sm:text-xl md:text-2xl">
                    Quality Assurance
                  </CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <MaterialIcon
                      icon="check_circle"
                      className="flex-shrink-0 mt-0.5 mr-2 text-brand-accent text-xs sm:text-sm"
                    />
                    <span className="text-gray-600 dark:text-gray-300 text-xs sm:text-sm md:text-base">
                      Multi-point quality inspections at every phase
                    </span>
                  </li>
                  <li className="flex items-start">
                    <MaterialIcon
                      icon="check_circle"
                      className="flex-shrink-0 mt-0.5 mr-2 text-brand-accent text-xs sm:text-sm"
                    />
                    <span className="text-gray-600 dark:text-gray-300 text-xs sm:text-sm md:text-base">
                      Documented quality control processes and checklists
                    </span>
                  </li>
                  <li className="flex items-start">
                    <MaterialIcon
                      icon="check_circle"
                      className="flex-shrink-0 mt-0.5 mr-2 text-brand-accent text-xs sm:text-sm"
                    />
                    <span className="text-gray-600 dark:text-gray-300 text-xs sm:text-sm md:text-base">
                      Third-party verification for critical installations
                    </span>
                  </li>
                  <li className="flex items-start">
                    <MaterialIcon
                      icon="check_circle"
                      className="flex-shrink-0 mt-0.5 mr-2 text-brand-accent text-xs sm:text-sm"
                    />
                    <span className="text-gray-600 dark:text-gray-300 text-xs sm:text-sm md:text-base">
                      Comprehensive warranty and post-project support
                    </span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </StaggeredFadeIn>
        </div>
      </section>

      {/* Awards & Recognition Section */}
      <section
        id="awards"
        className="bg-gray-50 dark:bg-gray-800 py-16 lg:py-24"
      >
        <div className="mx-auto px-4 container">
          <FadeInWhenVisible>
            <div className="mx-auto max-w-4xl text-center mb-12">
              <h2 className="mb-6 font-black text-gray-900 dark:text-white text-5xl sm:text-6xl md:text-7xl lg:text-8xl leading-tight tracking-tighter">
                <span className="block mb-3 font-semibold text-gray-700 dark:text-gray-300 text-3xl sm:text-4xl md:text-5xl lg:text-6xl tracking-tight">
                  Awards &
                </span>
                <span className="block text-brand-primary dark:text-brand-primary font-black">
                  Recognition
                </span>
              </h2>
              <p className="mx-auto max-w-3xl font-light text-gray-600 dark:text-gray-300 text-xl md:text-2xl lg:text-3xl leading-relaxed tracking-wide">
                Our commitment to excellence has been recognized by industry
                leaders and the communities we serve throughout the Pacific
                Northwest.
              </p>
            </div>
          </FadeInWhenVisible>

          <StaggeredFadeIn className="gap-8 grid grid-cols-1 lg:grid-cols-3 mx-auto max-w-7xl">
            <Card className="bg-white dark:bg-gray-800 hover:shadow-lg dark:hover:shadow-gray-600/50 border border-brand-secondary dark:border-brand-secondary/50 transition-all duration-300 h-full">
              <CardHeader>
                <div className="flex items-center space-x-3 mb-4">
                  <MaterialIcon
                    icon="workspace_premium"
                    size="lg"
                    className="text-brand-secondary"
                  />
                  <CardTitle className="text-gray-900 dark:text-white text-base sm:text-lg md:text-xl">
                    Excellence in Construction
                  </CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 dark:text-gray-300 mb-2 text-xs sm:text-sm md:text-base">
                  Associated General Contractors (AGC) - Washington Chapter
                </p>
                <p className="text-gray-500 dark:text-gray-400 text-xs sm:text-sm">
                  Outstanding Commercial Project Award for innovation and
                  quality craftsmanship
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white dark:bg-gray-800 hover:shadow-lg dark:hover:shadow-gray-600/50 border border-brand-primary dark:border-brand-primary/50 transition-all duration-300 h-full">
              <CardHeader>
                <div className="flex items-center space-x-3 mb-4">
                  <MaterialIcon
                    icon="military_tech"
                    size="lg"
                    className="text-brand-primary"
                  />
                  <CardTitle className="text-gray-900 dark:text-white text-base sm:text-lg md:text-xl">
                    Veteran Business Enterprise
                  </CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 dark:text-gray-300 mb-2 text-xs sm:text-sm md:text-base">
                  Certified Veteran-Owned Small Business (VOSB)
                </p>
                <p className="text-gray-500 dark:text-gray-400 text-xs sm:text-sm">
                  Veteran-owned since January 2025 under Army veteran
                  leadership. Department of Veterans Affairs certification
                  recognizing veteran entrepreneurship excellence.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white dark:bg-gray-800 hover:shadow-lg dark:hover:shadow-gray-600/50 border border-brand-accent dark:border-brand-accent/50 transition-all duration-300 h-full">
              <CardHeader>
                <div className="flex items-center space-x-3 mb-4">
                  <MaterialIcon
                    icon="eco"
                    size="lg"
                    className="text-brand-accent"
                  />
                  <CardTitle className="text-gray-900 dark:text-white text-base sm:text-lg md:text-xl">
                    Sustainable Building Leader
                  </CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 dark:text-gray-300 mb-2 text-xs sm:text-sm md:text-base">
                  Washington State Green Building Council
                </p>
                <p className="text-gray-500 dark:text-gray-400 text-xs sm:text-sm">
                  Recognition for commitment to sustainable construction
                  practices and LEED compliance
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white dark:bg-gray-800 hover:shadow-lg dark:hover:shadow-gray-600/50 border border-brand-primary dark:border-brand-primary/50 transition-all duration-300 h-full">
              <CardHeader>
                <div className="flex items-center space-x-3 mb-4">
                  <MaterialIcon
                    icon="verified_user"
                    size="lg"
                    className="text-brand-primary"
                  />
                  <CardTitle className="text-gray-900 dark:text-white text-base sm:text-lg md:text-xl">
                    Safety Excellence
                  </CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 dark:text-gray-300 mb-2 text-xs sm:text-sm md:text-base">
                  OSHA Voluntary Protection Program (VPP)
                </p>
                <p className="text-gray-500 dark:text-gray-400 text-xs sm:text-sm">
                  Star designation for exemplary workplace safety and health
                  programs
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white dark:bg-gray-800 hover:shadow-lg dark:hover:shadow-gray-600/50 border border-brand-accent dark:border-brand-accent/50 transition-all duration-300 h-full">
              <CardHeader>
                <div className="flex items-center space-x-3 mb-4">
                  <MaterialIcon
                    icon="groups"
                    size="lg"
                    className="text-brand-accent"
                  />
                  <CardTitle className="text-gray-900 dark:text-white text-base sm:text-lg md:text-xl">
                    Community Partner
                  </CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 dark:text-gray-300 mb-2 text-xs sm:text-sm md:text-base">
                  Tri-Cities Chamber of Commerce
                </p>
                <p className="text-gray-500 dark:text-gray-400 text-xs sm:text-sm">
                  Business Excellence Award for community involvement and
                  economic development support
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white dark:bg-gray-800 hover:shadow-lg dark:hover:shadow-gray-600/50 border border-brand-secondary dark:border-brand-secondary/50 transition-all duration-300 h-full">
              <CardHeader>
                <div className="flex items-center space-x-3 mb-4">
                  <MaterialIcon
                    icon="trending_up"
                    size="lg"
                    className="text-brand-secondary"
                  />
                  <CardTitle className="text-gray-900 dark:text-white text-base sm:text-lg md:text-xl">
                    Industry Innovation
                  </CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 dark:text-gray-300 mb-2 text-xs sm:text-sm md:text-base">
                  Construction Technology Advancement
                </p>
                <p className="text-gray-500 dark:text-gray-400 text-xs sm:text-sm">
                  Recognition for innovative use of technology in project
                  management and execution
                </p>
              </CardContent>
            </Card>
          </StaggeredFadeIn>
        </div>
      </section>

      {/* Company News & Blog Section */}
      <section
        id="blog"
        className="relative bg-gray-50 dark:bg-gray-800 py-16 lg:py-24"
      >
        <div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <FadeInWhenVisible className="mb-16 text-center">
            <h2 className="mb-6 font-black text-gray-900 dark:text-gray-100 text-5xl sm:text-6xl md:text-7xl lg:text-8xl leading-tight tracking-tighter">
              <span className="block mb-3 font-semibold text-gray-700 dark:text-gray-300 text-3xl sm:text-4xl md:text-5xl lg:text-6xl tracking-tight">
                Construction Insights &
              </span>
              <span className="block text-brand-primary dark:text-brand-primary font-black">
                Company Blog
              </span>
            </h2>
            <p className="mx-auto max-w-3xl font-light text-gray-600 dark:text-gray-300 text-xl md:text-2xl lg:text-3xl leading-relaxed tracking-wide">
              Expert construction advice, industry insights, and stories from
              our veteran-owned team
            </p>
          </FadeInWhenVisible>

          <div className="gap-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 mx-auto max-w-7xl">
            <FadeInWhenVisible>
              <Card className="bg-white dark:bg-gray-800 hover:shadow-xl dark:hover:shadow-gray-600/50 border border-gray-200 dark:border-gray-700 h-full transition-all hover:-translate-y-2 duration-300">
                <CardHeader>
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <MaterialIcon
                        icon="tips_and_updates"
                        size="md"
                        className="text-brand-primary"
                      />
                      <span className="font-semibold text-brand-primary text-sm uppercase tracking-wide">
                        Construction Tips
                      </span>
                    </div>
                    <span className="text-gray-500 dark:text-gray-400 text-sm">
                      Oct 2025
                    </span>
                  </div>
                  <CardTitle className="text-gray-900 dark:text-white text-lg sm:text-xl md:text-2xl">
                    Pre-Construction Planning Essentials
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="mb-6 text-gray-600 dark:text-gray-300 leading-relaxed text-sm sm:text-base md:text-lg">
                    Learn the critical steps to plan your construction project
                    for success, from budgeting to timeline management.
                  </p>
                  <div className="flex items-center text-brand-primary hover:text-brand-accent transition-colors cursor-pointer">
                    <span className="font-medium text-xs sm:text-sm">
                      Read More
                    </span>
                    <MaterialIcon
                      icon="arrow_forward"
                      size="sm"
                      className="ml-1"
                    />
                  </div>
                </CardContent>
              </Card>
            </FadeInWhenVisible>

            <FadeInWhenVisible>
              <Card className="bg-white dark:bg-gray-800 hover:shadow-xl dark:hover:shadow-gray-600/50 border border-gray-200 dark:border-gray-700 h-full transition-all hover:-translate-y-2 duration-300">
                <CardHeader>
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <MaterialIcon
                        icon="military_tech"
                        size="md"
                        className="text-brand-secondary"
                      />
                      <span className="font-semibold text-brand-secondary text-sm uppercase tracking-wide">
                        Veteran Spotlight
                      </span>
                    </div>
                    <span className="text-gray-500 dark:text-gray-400 text-sm">
                      Sep 2025
                    </span>
                  </div>
                  <CardTitle className="text-gray-900 dark:text-white text-lg sm:text-xl md:text-2xl">
                    Military Values in Construction
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="mb-6 text-gray-600 dark:text-gray-300 leading-relaxed text-sm sm:text-base md:text-lg">
                    How military precision and integrity translate to superior
                    construction project management and execution.
                  </p>
                  <div className="flex items-center text-brand-primary hover:text-brand-accent transition-colors cursor-pointer">
                    <span className="font-medium text-xs sm:text-sm">
                      Read More
                    </span>
                    <MaterialIcon
                      icon="arrow_forward"
                      size="sm"
                      className="ml-1"
                    />
                  </div>
                </CardContent>
              </Card>
            </FadeInWhenVisible>

            <FadeInWhenVisible>
              <Card className="bg-white dark:bg-gray-800 hover:shadow-xl dark:hover:shadow-gray-600/50 border border-gray-200 dark:border-gray-700 h-full transition-all hover:-translate-y-2 duration-300">
                <CardHeader>
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <MaterialIcon
                        icon="eco"
                        size="md"
                        className="text-brand-accent"
                      />
                      <span className="font-semibold text-brand-accent text-sm uppercase tracking-wide">
                        Sustainability
                      </span>
                    </div>
                    <span className="text-gray-500 dark:text-gray-400 text-sm">
                      Aug 2025
                    </span>
                  </div>
                  <CardTitle className="text-gray-900 dark:text-white text-lg sm:text-xl md:text-2xl">
                    Sustainable Building Practices
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="mb-6 text-gray-600 dark:text-gray-300 leading-relaxed text-sm sm:text-base md:text-lg">
                    Exploring eco-friendly construction methods that reduce
                    environmental impact while maintaining quality.
                  </p>
                  <div className="flex items-center text-brand-primary hover:text-brand-accent transition-colors cursor-pointer">
                    <span className="font-medium text-xs sm:text-sm">
                      Read More
                    </span>
                    <MaterialIcon
                      icon="arrow_forward"
                      size="sm"
                      className="ml-1"
                    />
                  </div>
                </CardContent>
              </Card>
            </FadeInWhenVisible>
          </div>

          <FadeInWhenVisible className="mt-12 text-center">
            <div className="bg-brand-light dark:bg-gray-800 p-6 border-brand-primary border-l-4 rounded-xl inline-block">
              <div className="flex items-center gap-3">
                <MaterialIcon
                  icon="info"
                  size="md"
                  className="text-brand-primary"
                />
                <p className="font-medium text-gray-700 dark:text-gray-300">
                  Full blog with integrated High-Level CRM coming soon
                </p>
              </div>
            </div>
          </FadeInWhenVisible>
        </div>
      </section>

      {/* Latest News & Updates Section */}
      <section
        id="news"
        className="relative bg-white dark:bg-gray-900 py-16 sm:py-20 lg:py-24"
      >
        <div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <FadeInWhenVisible className="mb-12 text-center">
            <h2 className="mb-6 font-black text-gray-900 dark:text-gray-100 text-5xl sm:text-6xl md:text-7xl lg:text-8xl leading-tight tracking-tighter">
              <span className="block mb-2 font-semibold text-gray-700 dark:text-gray-300 text-3xl sm:text-4xl md:text-5xl lg:text-6xl tracking-tight">
                Latest News &
              </span>
              <span className="block text-brand-primary dark:text-brand-primary font-black">
                Company Announcements
              </span>
            </h2>
            <p className="mx-auto max-w-3xl font-light text-gray-600 dark:text-gray-300 text-xl md:text-2xl lg:text-3xl leading-relaxed tracking-wide">
              Stay updated with our latest projects, partnerships, and company
              milestones
            </p>
          </FadeInWhenVisible>

          <div className="gap-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 mx-auto max-w-7xl">
            <FadeInWhenVisible>
              <Card className="border-l-4 border-l-brand-primary h-full flex flex-col">
                <CardContent className="pt-6 flex flex-col flex-grow">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <MaterialIcon
                        icon="celebration"
                        className="text-brand-primary"
                        size="md"
                      />
                      <span className="font-semibold text-brand-primary text-xs sm:text-sm">
                        Company Milestone
                      </span>
                    </div>
                    <span className="text-gray-500 dark:text-gray-400 text-xs sm:text-sm flex-shrink-0">
                      Nov 2025
                    </span>
                  </div>
                  <h3 className="mb-3 font-bold text-gray-900 dark:text-gray-100 text-lg sm:text-xl md:text-2xl">
                    50+ Successful Partnerships in Pacific Northwest
                  </h3>
                  <p className="mb-4 text-gray-600 dark:text-gray-300 flex-grow text-sm sm:text-base md:text-lg">
                    We're proud to announce reaching a major milestone: over 50
                    completed construction partnerships across Washington and
                    Oregon. Thank you to all our clients and trade partners who
                    made this possible.
                  </p>
                  <Link
                    href="/projects"
                    className="inline-flex items-center text-brand-primary hover:text-brand-accent transition-colors mt-auto"
                  >
                    <span className="font-medium text-xs sm:text-sm">
                      View Our Work
                    </span>
                    <MaterialIcon
                      icon="arrow_forward"
                      size="sm"
                      className="ml-1"
                    />
                  </Link>
                </CardContent>
              </Card>
            </FadeInWhenVisible>

            <FadeInWhenVisible>
              <Card className="border-l-4 border-l-brand-secondary h-full flex flex-col">
                <CardContent className="pt-6 flex flex-col flex-grow">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <MaterialIcon
                        icon="rocket_launch"
                        className="text-brand-secondary"
                        size="md"
                      />
                      <span className="font-semibold text-brand-secondary text-xs sm:text-sm">
                        New Technology
                      </span>
                    </div>
                    <span className="text-gray-500 dark:text-gray-400 text-xs sm:text-sm flex-shrink-0">
                      Coming Soon
                    </span>
                  </div>
                  <h3 className="mb-3 font-bold text-gray-900 dark:text-gray-100 text-lg sm:text-xl md:text-2xl">
                    Integrated CRM & Project Management Platform
                  </h3>
                  <p className="mb-4 text-gray-600 dark:text-gray-300 flex-grow text-sm sm:text-base md:text-lg">
                    We're implementing High-Level CRM to provide seamless
                    communication, real-time project updates, and enhanced
                    client experience throughout your construction journey.
                  </p>
                  <Link
                    href="/contact"
                    className="inline-flex items-center text-brand-secondary hover:text-brand-primary transition-colors mt-auto"
                  >
                    <span className="font-medium text-xs sm:text-sm">
                      Learn More
                    </span>
                    <MaterialIcon
                      icon="arrow_forward"
                      size="sm"
                      className="ml-1"
                    />
                  </Link>
                </CardContent>
              </Card>
            </FadeInWhenVisible>

            <FadeInWhenVisible>
              <Card className="border-l-4 border-l-brand-accent h-full flex flex-col">
                <CardContent className="pt-6 flex flex-col flex-grow">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <MaterialIcon
                        icon="handshake"
                        className="text-brand-accent"
                        size="md"
                      />
                      <span className="font-semibold text-brand-accent text-xs sm:text-sm">
                        Partnership
                      </span>
                    </div>
                    <span className="text-gray-500 dark:text-gray-400 text-xs sm:text-sm flex-shrink-0">
                      Oct 2025
                    </span>
                  </div>
                  <h3 className="mb-3 font-bold text-gray-900 dark:text-gray-100 text-lg sm:text-xl md:text-2xl">
                    Expanding Trade Partner Network
                  </h3>
                  <p className="mb-4 text-gray-600 dark:text-gray-300 flex-grow text-sm sm:text-base md:text-lg">
                    We're actively growing our network of skilled trade partners
                    to better serve our clients across the Pacific Northwest.
                    Join our veteran-owned partnership program.
                  </p>
                  <Link
                    href="/trade-partners"
                    className="inline-flex items-center text-brand-accent hover:text-brand-primary transition-colors mt-auto"
                  >
                    <span className="font-medium text-xs sm:text-sm">
                      Become a Partner
                    </span>
                    <MaterialIcon
                      icon="arrow_forward"
                      size="sm"
                      className="ml-1"
                    />
                  </Link>
                </CardContent>
              </Card>
            </FadeInWhenVisible>

            <FadeInWhenVisible>
              <Card className="border-l-4 border-l-brand-secondary h-full flex flex-col">
                <CardContent className="pt-6 flex flex-col flex-grow">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <MaterialIcon
                        icon="workspace_premium"
                        className="text-brand-secondary"
                        size="md"
                      />
                      <span className="font-semibold text-brand-secondary text-xs sm:text-sm">
                        Recognition
                      </span>
                    </div>
                    <span className="text-gray-500 dark:text-gray-400 text-xs sm:text-sm flex-shrink-0">
                      Sep 2025
                    </span>
                  </div>
                  <h3 className="mb-3 font-bold text-gray-900 dark:text-gray-100 text-lg sm:text-xl md:text-2xl">
                    Award-Winning Safety Record
                  </h3>
                  <p className="mb-4 text-gray-600 dark:text-gray-300 flex-grow text-sm sm:text-base md:text-lg">
                    Our commitment to safety excellence has been recognized by
                    industry organizations. Zero accidents, 100% compliance -
                    that's the veteran-owned difference.
                  </p>
                  <Link
                    href="/about#safety"
                    className="inline-flex items-center text-brand-secondary hover:text-brand-primary transition-colors mt-auto"
                  >
                    <span className="font-medium text-xs sm:text-sm">
                      Safety Standards
                    </span>
                    <MaterialIcon
                      icon="arrow_forward"
                      size="sm"
                      className="ml-1"
                    />
                  </Link>
                </CardContent>
              </Card>
            </FadeInWhenVisible>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative bg-gradient-to-r from-brand-primary dark:from-brand-primary-dark via-brand-primary-dark dark:via-gray-900 to-brand-primary dark:to-gray-800 py-16 lg:py-24 overflow-hidden text-white">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="z-10 relative mx-auto px-4 container">
          <FadeInWhenVisible>
            <div className="mx-auto max-w-5xl text-center">
              <h2 className="mb-6 font-black text-white text-5xl sm:text-6xl md:text-7xl lg:text-8xl leading-tight tracking-tighter">
                <span className="block mb-3 font-semibold text-white/90 text-3xl sm:text-4xl md:text-5xl lg:text-6xl tracking-tight">
                  Ready to Start Our
                </span>
                <span className="block text-white font-black drop-shadow-lg">
                  Partnership?
                </span>
              </h2>

              <div className="bg-white/10 backdrop-blur-sm mb-10 p-6 border border-white/20 rounded-xl">
                <p className="mb-2 font-bold text-brand-secondary text-xl md:text-2xl">
                  "Building for the Owner, NOT the Dollar"
                </p>
                <p className="font-light text-white/90 text-lg md:text-xl leading-relaxed">
                  Partner with a team that works WITH you, not FOR you. Let's
                  discuss your vision and build something remarkable together.
                </p>
              </div>

              <div className="flex sm:flex-row flex-col justify-center gap-4 mb-10">
                <Link href="/booking">
                  <Button
                    variant="primary"
                    size="lg"
                    className="shadow-xl hover:shadow-2xl transition-all duration-300 w-full sm:w-auto"
                  >
                    <MaterialIcon icon="event" size="lg" className="mr-3" />
                    Schedule Free Consultation
                  </Button>
                </Link>
                <Link href="/services">
                  <Button
                    size="lg"
                    variant="outline"
                    className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-brand-primary shadow-xl hover:shadow-2xl transition-all duration-300 w-full sm:w-auto"
                  >
                    <MaterialIcon icon="build" size="lg" className="mr-3" />
                    Explore Our Solutions
                  </Button>
                </Link>
              </div>

              <div className="flex sm:flex-row flex-col justify-center gap-4">
                <a href="tel:+15093086489" className="w-full sm:w-auto">
                  <Button
                    size="lg"
                    variant="outline"
                    className="bg-white/10 backdrop-blur-sm border-2 border-brand-secondary text-white hover:bg-brand-secondary hover:border-brand-secondary-dark shadow-lg hover:shadow-xl transition-all duration-300 w-full"
                  >
                    <MaterialIcon icon="phone" size="lg" className="mr-3" />
                    <div className="flex flex-col items-start">
                      <span className="text-xs text-white/70 uppercase tracking-wide">
                        Call Now
                      </span>
                      <span className="font-bold">(509) 308-6489</span>
                    </div>
                  </Button>
                </a>
                <a
                  href="https://www.google.com/maps/search/?api=1&query=3111+N.+Capital+Ave.+Pasco+WA+99301"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto"
                >
                  <Button
                    size="lg"
                    variant="outline"
                    className="bg-white/10 backdrop-blur-sm border-2 border-brand-secondary text-white hover:bg-brand-secondary hover:border-brand-secondary-dark shadow-lg hover:shadow-xl transition-all duration-300 w-full"
                  >
                    <MaterialIcon
                      icon="location_on"
                      size="lg"
                      className="mr-3"
                    />
                    <div className="flex flex-col items-start">
                      <span className="text-xs text-white/70 uppercase tracking-wide">
                        Visit Us
                      </span>
                      <span className="font-bold">
                        3111 N. Capital Ave., Pasco, WA
                      </span>
                    </div>
                  </Button>
                </a>
              </div>
            </div>
          </FadeInWhenVisible>
        </div>
      </section>
    </div>
  );
}
