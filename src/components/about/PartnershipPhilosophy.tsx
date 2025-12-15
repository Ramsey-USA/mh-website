/**
 * Partnership Philosophy Section for About Page
 * Displays MH Construction's partnership approach and community-centered culture
 */

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui";
import { MaterialIcon } from "@/components/icons/MaterialIcon";
import { FadeInWhenVisible } from "@/components/animations/FramerMotionComponents";
import { getCardClassName } from "@/lib/styles/card-variants";
import { SectionHeader } from "@/components/ui/SectionHeader";

export function PartnershipPhilosophy() {
  return (
    <section
      id="partnership-philosophy"
      className="relative bg-white dark:bg-gray-900 py-12 sm:py-16 lg:py-20 xl:py-24 overflow-hidden"
    >
      {/* Diagonal Stripe Background Pattern */}
      <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05]">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `repeating-linear-gradient(
              45deg,
              #386851 0px,
              #386851 2px,
              transparent 2px,
              transparent 60px
            )`,
          }}
        ></div>
      </div>

      {/* Large Brand Color Blobs */}
      <div className="absolute top-20 right-[15%] w-96 h-96 bg-gradient-to-br from-brand-primary/10 to-transparent dark:from-brand-primary/20 blur-3xl rounded-full"></div>
      <div className="absolute bottom-20 left-[15%] w-96 h-96 bg-gradient-to-tr from-brand-secondary/10 to-transparent dark:from-brand-secondary/20 blur-3xl rounded-full"></div>

      <div className="relative z-10 mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <SectionHeader
          icon="diversity_3"
          iconVariant="primary"
          subtitle="Our Partnership"
          title="Philosophy"
          description="At MH Construction, we believe in service-earned business values: where handshakes still matter, your word is your bond, and trust is earned through character and proven in the field. Since our founding in 2010, we've built our reputation on lasting partnerships that outlast the buildings themselves. Under veteran-owned leadership since January 2025, we continue the mission tradition of excellence through operational experience."
        />

        <FadeInWhenVisible>
          <div className="mx-auto max-w-4xl">
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
                    "We deliver high-quality construction rooted in integrity,
                    transparent communication, and lasting partnerships."
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-brand-secondary/5 to-brand-secondary/5 dark:from-brand-secondary/10 dark:to-brand-secondary/10 border-2 border-brand-secondary dark:border-brand-secondary/50 transition-shadow">
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
                    "To be the Pacific Northwest's most trusted veteran-owned
                    construction partner - renowned for proven craftsmanship and
                    service-earned integrity."
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
                        className="flex-shrink-0 mt-1 mr-2 text-brand-primary text-sm sm:text-base"
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
                        className="flex-shrink-0 mt-1 mr-2 text-brand-primary text-sm sm:text-base"
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
                        className="flex-shrink-0 mt-1 mr-2 text-brand-primary text-sm sm:text-base"
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
                        className="flex-shrink-0 mt-1 mr-2 text-brand-primary text-sm sm:text-base"
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
                        className="flex-shrink-0 mt-1 mr-2 text-brand-primary text-sm sm:text-base"
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
