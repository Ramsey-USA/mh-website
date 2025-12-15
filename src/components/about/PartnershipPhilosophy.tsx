/**
 * Partnership Philosophy Section for About Page
 * Displays MH Construction's partnership approach and community-centered culture
 */

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui";
import { MaterialIcon } from "@/components/icons/MaterialIcon";
import { FadeInWhenVisible } from "@/components/animations/FramerMotionComponents";
import { getCardClassName } from "@/lib/styles/card-variants";

export function PartnershipPhilosophy() {
  return (
    <section
      id="partnership-philosophy"
      className="relative bg-gradient-to-b from-white via-gray-50 to-white dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 py-12 sm:py-16 lg:py-24 xl:py-32 overflow-hidden"
    >
      {/* Enhanced Background Effects */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(56,104,81,0.08)_0%,transparent_50%)] dark:bg-[radial-gradient(circle_at_top_right,rgba(56,104,81,0.15)_0%,transparent_50%)]"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(189,146,100,0.06)_0%,transparent_50%)] dark:bg-[radial-gradient(circle_at_bottom_left,rgba(189,146,100,0.12)_0%,transparent_50%)]"></div>
      <div className="top-20 right-10 absolute bg-brand-primary/10 dark:bg-brand-primary/20 blur-3xl rounded-full w-32 h-32 animate-pulse"></div>
      <div
        className="left-10 bottom-20 absolute bg-brand-secondary/10 dark:bg-brand-secondary/20 blur-3xl rounded-full w-40 h-40 animate-pulse"
        style={{ animationDelay: "1s" }}
      ></div>
      <div
        className="top-1/2 left-1/4 absolute bg-brand-secondary/5 dark:bg-brand-secondary/10 blur-3xl rounded-full w-24 h-24 animate-pulse"
        style={{ animationDelay: "0.5s" }}
      ></div>

      <div className="relative mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <FadeInWhenVisible>
          <div className="mx-auto max-w-4xl">
            <div className="mb-12 sm:mb-16 lg:mb-20 text-center">
              {/* Icon Header with Glow Effect */}
              <div className="flex justify-center items-center mb-6 sm:mb-8">
                <div className="relative">
                  <div className="absolute inset-0 bg-brand-primary/20 dark:bg-brand-primary/30 blur-xl rounded-full"></div>
                  <div className="relative bg-gradient-to-br from-brand-primary to-brand-primary-dark p-4 rounded-2xl shadow-lg">
                    <MaterialIcon
                      icon="diversity_3"
                      size="2xl"
                      theme="military"
                      ariaLabel="Partnership philosophy"
                      className="text-white"
                    />
                  </div>
                </div>
              </div>
              <h2 className="mb-6 sm:mb-8 font-black text-gray-900 dark:text-gray-100 text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-tight tracking-tighter">
                <span className="block mb-3 sm:mb-4 font-semibold text-gray-700 dark:text-gray-300 text-xl xs:text-2xl sm:text-3xl md:text-4xl lg:text-5xl tracking-tight">
                  Our Partnership
                </span>
                <span className="block text-brand-primary dark:text-brand-primary-light font-black drop-shadow-sm">
                  Philosophy
                </span>
              </h2>
              <p className="mx-auto max-w-5xl font-light text-gray-600 dark:text-gray-300 text-base sm:text-lg md:text-xl lg:text-2xl leading-relaxed tracking-wide px-4 break-words">
                At MH Construction, we believe in service-earned business
                values: where handshakes still matter, your word is your bond,
                and trust is earned through character and proven in the field.
                Since our founding in 2010, we've built our reputation on
                lasting partnerships that outlast the buildings themselves.
                Under veteran-owned leadership since January 2025, we continue
                the mission tradition of excellence through operational
                experience.
              </p>
            </div>

            {/* Mission & Vision Cards */}
            <div className="gap-8 grid sm:grid-cols-1 md:grid-cols-2 mb-12">
              <Card className="bg-gradient-to-br from-brand-primary/5 to-brand-secondary/5 dark:from-brand-primary/10 dark:to-brand-secondary/10 border-2 border-brand-primary dark:border-brand-primary/50 transition-shadow">
                <CardHeader>
                  <MaterialIcon
                    icon="map"
                    size="xl"
                    theme="military"
                    ariaLabel="Our mission"
                    className="mb-3 text-brand-primary"
                  />
                  <CardTitle className="text-gray-900 dark:text-white text-lg sm:text-xl md:text-2xl">
                    Our Mission
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-800 dark:text-gray-200 text-base sm:text-lg md:text-xl leading-relaxed font-medium italic">
                    "We execute high-quality construction operations rooted in
                    integrity, clear mission comms, and long-term partnerships."
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-brand-secondary/5 to-brand-accent/5 dark:from-brand-secondary/10 dark:to-brand-accent/10 border-2 border-brand-secondary dark:border-brand-secondary/50 transition-shadow">
                <CardHeader>
                  <MaterialIcon
                    icon="explore"
                    size="xl"
                    theme="tactical"
                    ariaLabel="Our vision"
                    className="mb-3 text-brand-secondary"
                  />
                  <CardTitle className="text-gray-900 dark:text-white text-lg sm:text-xl md:text-2xl">
                    Our Vision
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-800 dark:text-gray-200 text-base sm:text-lg md:text-xl leading-relaxed font-medium italic">
                    "To be the Pacific Northwest's most trusted veteran-led
                    construction partner - renowned for battle-tested
                    craftsmanship and service-earned character."
                  </p>
                </CardContent>
              </Card>
            </div>

            <div className="gap-8 grid sm:grid-cols-1 md:grid-cols-2 mb-12">
              <Card className={getCardClassName("static")}>
                <CardHeader>
                  <MaterialIcon
                    icon="groups"
                    size="xl"
                    theme="military"
                    ariaLabel="Client partnership"
                    className="mb-3 text-brand-secondary"
                  />
                  <CardTitle className="text-gray-900 dark:text-white text-lg sm:text-xl md:text-2xl">
                    Client Partnership Approach
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <MaterialIcon
                        icon="check_circle"
                        className="flex-shrink-0 mt-1 mr-2 text-brand-accent text-sm sm:text-base"
                      />
                      <span className="text-gray-700 dark:text-gray-300 text-sm sm:text-base md:text-lg">
                        <strong className="text-gray-900 dark:text-white">
                          Transparent Communication:
                        </strong>{" "}
                        Open dialogue from day one
                      </span>
                    </li>
                    <li className="flex items-start">
                      <MaterialIcon
                        icon="check_circle"
                        className="flex-shrink-0 mt-1 mr-2 text-brand-accent text-sm sm:text-base"
                      />
                      <span className="text-gray-700 dark:text-gray-300 text-sm sm:text-base md:text-lg">
                        <strong className="text-gray-900 dark:text-white">
                          Collaborative Planning:
                        </strong>{" "}
                        Your vision + our expertise
                      </span>
                    </li>
                    <li className="flex items-start">
                      <MaterialIcon
                        icon="check_circle"
                        className="flex-shrink-0 mt-1 mr-2 text-brand-accent text-sm sm:text-base"
                      />
                      <span className="text-gray-700 dark:text-gray-300 text-sm sm:text-base md:text-lg">
                        <strong className="text-gray-900 dark:text-white">
                          Honest Pricing:
                        </strong>{" "}
                        No surprises, no hidden costs
                      </span>
                    </li>
                    <li className="flex items-start">
                      <MaterialIcon
                        icon="check_circle"
                        className="flex-shrink-0 mt-1 mr-2 text-brand-accent text-sm sm:text-base"
                      />
                      <span className="text-gray-700 dark:text-gray-300 text-sm sm:text-base md:text-lg">
                        <strong className="text-gray-900 dark:text-white">
                          Shared Success:
                        </strong>{" "}
                        Your satisfaction is our success
                      </span>
                    </li>
                    <li className="flex items-start">
                      <MaterialIcon
                        icon="check_circle"
                        className="flex-shrink-0 mt-1 mr-2 text-brand-accent text-sm sm:text-base"
                      />
                      <span className="text-gray-700 dark:text-gray-300 text-sm sm:text-base md:text-lg">
                        <strong className="text-gray-900 dark:text-white">
                          Long-term Relationship:
                        </strong>{" "}
                        Partners beyond project completion
                      </span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card className={getCardClassName("static")}>
                <CardHeader>
                  <MaterialIcon
                    icon="public"
                    className="mb-3 text-brand-secondary text-4xl"
                  />
                  <CardTitle className="text-gray-900 dark:text-white text-lg sm:text-xl md:text-2xl">
                    Community-Centered Culture
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 dark:text-gray-300 text-sm sm:text-base md:text-lg mb-4">
                    <strong className="text-gray-900 dark:text-white">
                      MH Construction exists to strengthen Pacific Northwest
                      communities.
                    </strong>{" "}
                    Every project contributes to a stronger, more connected
                    region. We work WITH communities to build lasting value.
                  </p>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <MaterialIcon
                        icon="location_city"
                        className="flex-shrink-0 mt-1 mr-2 text-brand-primary text-sm sm:text-base"
                      />
                      <span className="text-gray-700 dark:text-gray-300 text-sm sm:text-base md:text-lg">
                        <strong className="text-gray-900 dark:text-white">
                          Local Investment:
                        </strong>{" "}
                        Hiring locally, supporting regional suppliers
                      </span>
                    </li>
                    <li className="flex items-start">
                      <MaterialIcon
                        icon="military_tech"
                        className="flex-shrink-0 mt-1 mr-2 text-brand-primary text-sm sm:text-base"
                      />
                      <span className="text-gray-700 dark:text-gray-300 text-sm sm:text-base md:text-lg">
                        <strong className="text-gray-900 dark:text-white">
                          Veteran Support:
                        </strong>{" "}
                        Creating opportunities for military families
                      </span>
                    </li>
                    <li className="flex items-start">
                      <MaterialIcon
                        icon="eco"
                        className="flex-shrink-0 mt-1 mr-2 text-brand-primary text-sm sm:text-base"
                      />
                      <span className="text-gray-700 dark:text-gray-300 text-sm sm:text-base md:text-lg">
                        <strong className="text-gray-900 dark:text-white">
                          Environmental Stewardship:
                        </strong>{" "}
                        Sustainable practices for future communities
                      </span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>

            <div className="bg-brand-light dark:bg-gray-800 p-8 border-brand-primary border-l-4 rounded-lg">
              <MaterialIcon
                icon="format_quote"
                className="mb-4 text-brand-primary text-4xl"
              />
              <p className="mb-4 text-gray-800 dark:text-gray-200 text-base sm:text-lg md:text-xl italic leading-relaxed">
                "When you choose MH Construction, you're not hiring a contractor
                - you're gaining a partner who believes in face-to-face
                conversations, firm handshakes, and keeping promises. We bring
                veteran values of discipline, integrity, and honor to every
                project. In an age of automation, we still believe relationships
                are built person-to-person, trust is earned through action, and
                your word is your bond."
              </p>
              <div className="flex items-center">
                <MaterialIcon
                  icon="military_tech"
                  className="mr-3 text-brand-primary text-xl sm:text-2xl"
                />
                <div>
                  <p className="font-semibold text-gray-900 dark:text-white text-sm sm:text-base md:text-lg">
                    Jeremy Thamert
                  </p>
                  <p className="text-gray-600 dark:text-gray-300 text-xs sm:text-sm md:text-base">
                    Owner & President | U.S. Army Veteran
                  </p>
                </div>
              </div>
            </div>
          </div>
        </FadeInWhenVisible>
      </div>
    </section>
  );
}
