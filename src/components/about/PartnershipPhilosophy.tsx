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
      className="bg-white dark:bg-gray-900 py-16 lg:py-24"
    >
      <div className="relative mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <FadeInWhenVisible>
          <div className="mx-auto max-w-4xl">
            <div className="mb-12 text-center">
              <MaterialIcon
                icon="handshake"
                className="mb-4 text-brand-primary text-6xl"
              />
              <h2 className="mb-8 pb-2 font-black text-gray-900 dark:text-gray-100 text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl leading-tight tracking-tighter">
                <span className="block mb-4 font-semibold text-gray-700 dark:text-gray-300 text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl tracking-tight">
                  Our Partnership
                </span>
                <span className="block text-brand-primary dark:text-brand-primary font-black">
                  Philosophy
                </span>
              </h2>
              <p className="mx-auto max-w-5xl font-light text-gray-600 dark:text-gray-300 text-lg sm:text-xl md:text-2xl lg:text-3xl leading-relaxed tracking-wide px-2">
                At MH Construction, we don't just build structures - we build
                lasting relationships. We work WITH you, not FOR you.
              </p>
            </div>

            {/* Mission & Vision Cards */}
            <div className="gap-8 grid sm:grid-cols-1 md:grid-cols-2 mb-12">
              <Card className="bg-gradient-to-br from-brand-primary/5 to-brand-secondary/5 dark:from-brand-primary/10 dark:to-brand-secondary/10 border-2 border-brand-primary dark:border-brand-primary/50 transition-shadow">
                <CardHeader>
                  <MaterialIcon
                    icon="flag"
                    className="mb-3 text-brand-primary text-4xl"
                  />
                  <CardTitle className="text-gray-900 dark:text-white text-lg sm:text-xl md:text-2xl">
                    Our Mission
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-800 dark:text-gray-200 text-base sm:text-lg md:text-xl leading-relaxed font-medium italic">
                    "We deliver high-quality construction rooted in integrity,
                    clear communication, and long-term relationships."
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-brand-secondary/5 to-brand-accent/5 dark:from-brand-secondary/10 dark:to-brand-accent/10 border-2 border-brand-secondary dark:border-brand-secondary/50 transition-shadow">
                <CardHeader>
                  <MaterialIcon
                    icon="visibility"
                    className="mb-3 text-brand-secondary text-4xl"
                  />
                  <CardTitle className="text-gray-900 dark:text-white text-lg sm:text-xl md:text-2xl">
                    Our Vision
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-800 dark:text-gray-200 text-base sm:text-lg md:text-xl leading-relaxed font-medium italic">
                    "To be the Pacific Northwest's most trusted veteran-led
                    construction partner - renowned for craftsmanship and
                    character."
                  </p>
                </CardContent>
              </Card>
            </div>

            <div className="gap-8 grid sm:grid-cols-1 md:grid-cols-2 mb-12">
              <Card className={getCardClassName("static")}>
                <CardHeader>
                  <MaterialIcon
                    icon="favorite"
                    className="mb-3 text-brand-secondary text-4xl"
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
                - you're gaining a partner who works WITH you at every step. We
                bring veteran values of discipline, integrity, and excellence to
                every project—building for the owner, not the dollar."
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
                    Owner & General Manager | U.S. Army Veteran
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
