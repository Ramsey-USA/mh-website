/**
 * Government & Grant-Funded Projects Section
 * Specialized section for government and grant-funded construction projects
 */

import Link from "next/link";
import { FadeInWhenVisible } from "@/components/animations/FramerMotionComponents";
import { MaterialIcon } from "@/components/icons/MaterialIcon";
import { SectionHeader, Card, CardContent, Button } from "@/components/ui";

export function GovernmentProjectsSection() {
  return (
    <section className="relative bg-gradient-to-b from-white via-gray-50 to-white dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 py-12 sm:py-16 lg:py-24 xl:py-32 overflow-hidden">
      {/* Enhanced Background Effects */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(189,146,100,0.08)_0%,transparent_50%)] dark:bg-[radial-gradient(circle_at_top_right,rgba(189,146,100,0.15)_0%,transparent_50%)]"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(56,104,81,0.06)_0%,transparent_50%)] dark:bg-[radial-gradient(circle_at_bottom_left,rgba(56,104,81,0.12)_0%,transparent_50%)]"></div>

      {/* Animated Blur Orbs */}
      <div className="top-20 right-10 absolute bg-brand-accent/10 dark:bg-brand-accent/20 blur-3xl rounded-full w-32 h-32 animate-pulse"></div>
      <div
        className="left-10 bottom-20 absolute bg-brand-secondary/10 dark:bg-brand-secondary/20 blur-3xl rounded-full w-40 h-40 animate-pulse"
        style={{ animationDelay: "1s" }}
      ></div>
      <div
        className="top-1/2 right-1/4 absolute bg-brand-accent/5 dark:bg-brand-accent/10 blur-3xl rounded-full w-24 h-24 animate-pulse"
        style={{ animationDelay: "0.5s" }}
      ></div>

      <div className="relative mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <SectionHeader
          icon="account_balance"
          iconVariant="bronze"
          subtitle="Public Sector Expertise"
          title="Government & Grant-Funded Projects"
          description="MH Construction brings specialized expertise in government and grant-funded construction projects. We understand the unique requirements, documentation standards, and compliance needs of public sector work throughout the Pacific Northwest."
        />

        <FadeInWhenVisible>
          <div className="mx-auto max-w-5xl">
            {/* Main Government Services Card */}
            <Card className="relative bg-gradient-to-br from-white via-white to-brand-primary/5 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800 border-2 border-brand-primary shadow-xl hover:shadow-2xl dark:hover:shadow-brand-primary/20 transition-all duration-500 mb-8 overflow-hidden group">
              {/* Decorative background pattern */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-brand-primary/5 dark:bg-brand-primary/10 rounded-full blur-3xl transform translate-x-32 -translate-y-32 group-hover:scale-150 transition-transform duration-1000"></div>

              <CardContent className="relative p-8 lg:p-12">
                <div className="flex items-center gap-4 mb-6">
                  <div className="flex-shrink-0 w-16 h-16 lg:w-20 lg:h-20 bg-gradient-to-br from-brand-primary to-brand-accent rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
                    <MaterialIcon
                      icon="account_balance"
                      size="2xl"
                      className="text-white"
                    />
                  </div>
                  <h3 className="font-black text-gray-900 dark:text-white text-xl sm:text-2xl lg:text-3xl leading-tight break-words">
                    Comprehensive Government Project Management
                  </h3>
                </div>

                <p className="mb-8 text-gray-700 dark:text-gray-300 text-lg leading-relaxed">
                  From federal buildings to state facilities and local municipal
                  projects, our team navigates complex government requirements
                  with{" "}
                  <span className="text-brand-primary dark:text-brand-primary-light font-semibold">
                    precision and efficiency
                  </span>
                  . We specialize in grant documentation, compliance management,
                  and public sector communication standards.
                </p>

                {/* Government Project Types Grid */}
                <div className="grid md:grid-cols-2 gap-6 mb-8">
                  <div className="relative bg-gradient-to-br from-brand-primary/5 to-brand-primary/10 dark:from-gray-800 dark:to-gray-800/80 p-6 rounded-2xl border border-brand-primary/20 dark:border-gray-700 hover:shadow-lg hover:scale-[1.02] transition-all duration-300 group/card">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 bg-brand-primary/10 dark:bg-brand-primary/20 rounded-xl flex items-center justify-center group-hover/card:scale-110 transition-transform duration-300">
                        <MaterialIcon
                          icon="gavel"
                          size="lg"
                          className="text-brand-primary"
                        />
                      </div>
                      <h4 className="font-bold text-gray-900 dark:text-white text-xl">
                        Federal Projects
                      </h4>
                    </div>
                    <ul className="space-y-3 text-gray-700 dark:text-gray-300">
                      <li className="flex items-start gap-2 hover:translate-x-1 transition-transform duration-200">
                        <MaterialIcon
                          icon="check_circle"
                          size="sm"
                          className="text-brand-secondary mt-1 flex-shrink-0"
                        />
                        <span>GSA Facilities & Federal Buildings</span>
                      </li>
                      <li className="flex items-start gap-2 hover:translate-x-1 transition-transform duration-200">
                        <MaterialIcon
                          icon="check_circle"
                          size="sm"
                          className="text-brand-secondary mt-1 flex-shrink-0"
                        />
                        <span>Military Base Construction & Renovations</span>
                      </li>
                      <li className="flex items-start gap-2 hover:translate-x-1 transition-transform duration-200">
                        <MaterialIcon
                          icon="check_circle"
                          size="sm"
                          className="text-brand-secondary mt-1 flex-shrink-0"
                        />
                        <span>Federal Grant-Funded Projects</span>
                      </li>
                      <li className="flex items-start gap-2 hover:translate-x-1 transition-transform duration-200">
                        <MaterialIcon
                          icon="check_circle"
                          size="sm"
                          className="text-brand-secondary mt-1 flex-shrink-0"
                        />
                        <span>Veterans Affairs Facilities</span>
                      </li>
                    </ul>
                  </div>

                  <div className="relative bg-gradient-to-br from-brand-primary/5 to-brand-primary/10 dark:from-gray-800 dark:to-gray-800/80 p-6 rounded-2xl border border-brand-primary/20 dark:border-gray-700 hover:shadow-lg hover:scale-[1.02] transition-all duration-300 group/card">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 bg-brand-primary/10 dark:bg-brand-primary/20 rounded-xl flex items-center justify-center group-hover/card:scale-110 transition-transform duration-300">
                        <MaterialIcon
                          icon="location_city"
                          size="lg"
                          className="text-brand-primary"
                        />
                      </div>
                      <h4 className="font-bold text-gray-900 dark:text-white text-xl">
                        State & Local Projects
                      </h4>
                    </div>
                    <ul className="space-y-3 text-gray-700 dark:text-gray-300">
                      <li className="flex items-start gap-2 hover:translate-x-1 transition-transform duration-200">
                        <MaterialIcon
                          icon="check_circle"
                          size="sm"
                          className="text-brand-secondary mt-1 flex-shrink-0"
                        />
                        <span>Municipal Buildings & City Halls</span>
                      </li>
                      <li className="flex items-start gap-2 hover:translate-x-1 transition-transform duration-200">
                        <MaterialIcon
                          icon="check_circle"
                          size="sm"
                          className="text-brand-secondary mt-1 flex-shrink-0"
                        />
                        <span>Educational Facilities & Schools</span>
                      </li>
                      <li className="flex items-start gap-2 hover:translate-x-1 transition-transform duration-200">
                        <MaterialIcon
                          icon="check_circle"
                          size="sm"
                          className="text-brand-secondary mt-1 flex-shrink-0"
                        />
                        <span>Public Safety & Emergency Services</span>
                      </li>
                      <li className="flex items-start gap-2 hover:translate-x-1 transition-transform duration-200">
                        <MaterialIcon
                          icon="check_circle"
                          size="sm"
                          className="text-brand-secondary mt-1 flex-shrink-0"
                        />
                        <span>State Grant-Funded Infrastructure</span>
                      </li>
                    </ul>
                  </div>
                </div>

                {/* Grant Documentation Expertise */}
                <div className="relative bg-gradient-to-r from-brand-secondary/10 via-brand-secondary/15 to-brand-secondary/10 dark:from-gray-800 dark:via-gray-800/90 dark:to-gray-800 p-6 lg:p-8 rounded-2xl mb-6 border border-brand-secondary/20 dark:border-gray-700 hover:shadow-lg transition-all duration-300 overflow-hidden group/grant">
                  {/* Decorative accent */}
                  <div className="absolute top-0 right-0 w-32 h-32 bg-brand-secondary/10 rounded-full blur-2xl transform translate-x-16 -translate-y-16 group-hover/grant:scale-150 transition-transform duration-700"></div>

                  <div className="relative flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 bg-brand-secondary/20 dark:bg-brand-secondary/30 rounded-xl flex items-center justify-center group-hover/grant:scale-110 transition-transform duration-300">
                      <MaterialIcon
                        icon="description"
                        size="lg"
                        className="text-brand-secondary"
                      />
                    </div>
                    <h4 className="font-bold text-gray-900 dark:text-white text-xl">
                      Grant Documentation & Compliance
                    </h4>
                  </div>
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                    Our team excels at navigating complex grant requirements,
                    ensuring your project meets all documentation standards and
                    compliance mandates. We manage:
                  </p>
                  <div className="grid sm:grid-cols-2 gap-3">
                    <div className="flex items-center gap-2">
                      <MaterialIcon
                        icon="verified"
                        size="sm"
                        className="text-brand-secondary"
                      />
                      <span className="text-gray-700 dark:text-gray-300">
                        Complete documentation services
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MaterialIcon
                        icon="verified"
                        size="sm"
                        className="text-brand-secondary"
                      />
                      <span className="text-gray-700 dark:text-gray-300">
                        Regulatory compliance management
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MaterialIcon
                        icon="verified"
                        size="sm"
                        className="text-brand-secondary"
                      />
                      <span className="text-gray-700 dark:text-gray-300">
                        Audit preparation & support
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MaterialIcon
                        icon="verified"
                        size="sm"
                        className="text-brand-secondary"
                      />
                      <span className="text-gray-700 dark:text-gray-300">
                        Progress reporting systems
                      </span>
                    </div>
                  </div>
                </div>

                {/* CTA */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link href="/contact" className="w-full sm:w-auto">
                    <Button
                      variant="primary"
                      size="lg"
                      className="w-full sm:w-auto hover:scale-105 transition-transform duration-300 group"
                    >
                      <MaterialIcon
                        icon="event"
                        size="md"
                        className="mr-2 group-hover:scale-110 transition-transform duration-300"
                      />
                      Discuss Government Project
                    </Button>
                  </Link>
                  <Link href="/contact" className="w-full sm:w-auto">
                    <Button
                      variant="outline"
                      size="lg"
                      className="w-full sm:w-auto hover:scale-105 transition-transform duration-300 group"
                    >
                      <MaterialIcon
                        icon="mail"
                        size="md"
                        className="mr-2 group-hover:scale-110 transition-transform duration-300"
                      />
                      Request Project Information
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>

            {/* Why Choose Us for Government Work */}
            <div className="grid md:grid-cols-3 gap-6">
              <Card className="bg-gradient-to-br from-white to-brand-primary/5 dark:from-gray-900 dark:to-gray-800 border border-gray-200 dark:border-gray-700 hover:shadow-xl dark:hover:shadow-brand-primary/10 hover:-translate-y-2 transition-all duration-300 group">
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-brand-primary to-brand-accent rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
                    <MaterialIcon
                      icon="military_tech"
                      size="xl"
                      className="text-white"
                    />
                  </div>
                  <h4 className="font-bold text-gray-900 dark:text-white text-lg mb-2">
                    Veteran-Owned Advantage
                  </h4>
                  <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
                    Military background provides unique understanding of
                    government standards and protocols
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-white to-brand-primary/5 dark:from-gray-900 dark:to-gray-800 border border-gray-200 dark:border-gray-700 hover:shadow-xl dark:hover:shadow-brand-primary/10 hover:-translate-y-2 transition-all duration-300 group">
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-brand-primary to-brand-accent rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
                    <MaterialIcon
                      icon="workspace_premium"
                      size="xl"
                      className="text-white"
                    />
                  </div>
                  <h4 className="font-bold text-gray-900 dark:text-white text-lg mb-2">
                    Licensed in 3 States
                  </h4>
                  <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
                    Qualified for government projects across Washington, Oregon,
                    and Idaho
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-white to-brand-primary/5 dark:from-gray-900 dark:to-gray-800 border border-gray-200 dark:border-gray-700 hover:shadow-xl dark:hover:shadow-brand-primary/10 hover:-translate-y-2 transition-all duration-300 group">
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-brand-primary to-brand-accent rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
                    <MaterialIcon
                      icon="verified"
                      size="xl"
                      className="text-white"
                    />
                  </div>
                  <h4 className="font-bold text-gray-900 dark:text-white text-lg mb-2">
                    Compliance Expertise
                  </h4>
                  <p className="text-gray-700 dark:text-gray-300 text-sm">
                    Deep experience with federal, state, and local compliance
                    requirements
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </FadeInWhenVisible>
      </div>
    </section>
  );
}
