/**
 * Partnership Philosophy Section for About Page
 * Displays MH Construction's partnership approach and community-centered culture
 */

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui";
import { MaterialIcon } from "@/components/icons/MaterialIcon";
import { FadeInWhenVisible } from "@/components/animations/FramerMotionComponents";
import { BrandedContentSection } from "@/components/templates";
import type { ReactNode } from "react";

interface PhilosophyCardProps {
  icon: string;
  ariaLabel?: string;
  title: string;
  glowFrom: string;
  glowTo: string;
  barFrom: string;
  barVia: string;
  barTo: string;
  children: ReactNode;
}

function PhilosophyCard({
  icon,
  ariaLabel,
  title,
  glowFrom,
  glowTo,
  barFrom,
  barVia,
  barTo,
  children,
}: PhilosophyCardProps) {
  return (
    <div className="group relative flex h-full">
      <div
        className={`absolute -inset-2 bg-gradient-to-br ${glowFrom} ${glowTo} rounded-2xl opacity-20 group-hover:opacity-100 blur-xl transition-all duration-500 group-hover:animate-pulse`}
      ></div>
      <div className="relative bg-white dark:bg-gray-800 rounded-xl border-2 border-gray-200 dark:border-gray-700 group-hover:border-transparent shadow-lg group-hover:shadow-2xl transition-all duration-300 overflow-hidden flex flex-col w-full">
        <div
          className={`h-2 bg-gradient-to-r ${barFrom} ${barVia} ${barTo}`}
        ></div>
        <div className="p-6 sm:p-8 flex flex-col flex-1">
          <div className="relative inline-block mb-4">
            <div
              className={`absolute -inset-2 bg-gradient-to-br ${glowFrom} ${glowTo} opacity-30 blur-lg rounded-xl`}
            ></div>
            <div
              className={`relative rounded-xl bg-gradient-to-br ${barFrom} ${barVia} ${barTo} p-3 shadow-xl group-hover:scale-110 transition-all duration-300`}
            >
              <MaterialIcon
                icon={icon}
                size="xl"
                {...(ariaLabel !== undefined && { ariaLabel })}
                className="text-white drop-shadow-lg"
              />
            </div>
          </div>
          <h3 className="text-gray-900 dark:text-white text-lg sm:text-xl md:text-2xl font-bold mb-4">
            {title}
          </h3>
          {children}
        </div>
      </div>
    </div>
  );
}

export function PartnershipPhilosophy() {
  return (
    <BrandedContentSection
      id="partnership-philosophy"
      header={{
        icon: "diversity_3",
        iconVariant: "primary",
        subtitle: "Service-Earned Partnership",
        title: "Philosophy",
        description: (
          <>
            At MH Construction, we believe in{" "}
            <span className="font-bold text-brand-secondary dark:text-brand-secondary-light">
              service-earned business values
            </span>
            : where handshakes still matter, your word is your bond, and trust
            is earned through character and proven in the field. Since our
            founding in 2010, we've built our reputation on{" "}
            <span className="font-bold text-brand-primary dark:text-brand-primary-light">
              lasting partnerships that outlast the buildings themselves
            </span>
            . Under{" "}
            <span className="font-bold text-brand-primary dark:text-brand-primary-light">
              Veteran-Owned leadership
            </span>{" "}
            since January 2025, we continue the mission tradition of excellence
            through operational experience.
          </>
        ),
      }}
    >
      <FadeInWhenVisible>
        <div className="mx-auto max-w-4xl">
          {/* Mission & Vision Cards */}
          <div className="gap-8 grid sm:grid-cols-1 md:grid-cols-2 mb-12">
            <Card className="bg-gradient-to-br from-brand-primary/5 to-brand-secondary/5 dark:from-brand-primary/10 dark:to-brand-secondary/10 border-2 border-brand-primary dark:border-brand-primary/50 transition-shadow">
              <CardHeader>
                <div className="relative inline-block mb-3">
                  <div className="absolute -inset-2 bg-gradient-to-br from-brand-primary/20 to-brand-primary-dark/20 blur-xl rounded-full"></div>
                  <div className="relative w-16 h-16 bg-gradient-to-br from-brand-primary via-brand-primary-dark to-brand-primary-darker rounded-xl flex items-center justify-center shadow-lg">
                    <MaterialIcon
                      icon="map"
                      size="xl"
                      ariaLabel="Our mission"
                      className="text-white drop-shadow-lg"
                    />
                  </div>
                </div>
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

            <PhilosophyCard
              icon="explore"
              ariaLabel="Our vision"
              title="Our Vision"
              glowFrom="from-brand-secondary/40"
              glowTo="to-bronze-600/40"
              barFrom="from-brand-secondary"
              barVia="via-bronze-700"
              barTo="to-bronze-800"
            >
              <p className="text-gray-800 dark:text-gray-200 text-base sm:text-lg md:text-xl leading-relaxed font-medium italic">
                "To be the Pacific Northwest's most trusted Veteran-Owned
                construction partner - renowned for proven craftsmanship and
                service-earned integrity."
              </p>
            </PhilosophyCard>
          </div>

          <div className="gap-8 grid sm:grid-cols-1 md:grid-cols-2 mb-12">
            <PhilosophyCard
              icon="groups"
              ariaLabel="Client partnership"
              title="Client Partnership Approach"
              glowFrom="from-brand-secondary/40"
              glowTo="to-brand-secondary-dark/40"
              barFrom="from-brand-secondary"
              barVia="via-brand-secondary-dark"
              barTo="to-bronze-700"
            >
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
            </PhilosophyCard>

            <PhilosophyCard
              icon="public"
              title="Community-Centered Culture"
              glowFrom="from-brand-primary/40"
              glowTo="to-brand-primary-dark/40"
              barFrom="from-brand-primary"
              barVia="via-brand-primary-dark"
              barTo="to-brand-primary-darker"
            >
              <p className="text-gray-700 dark:text-gray-300 text-sm sm:text-base md:text-lg mb-4">
                <strong className="text-gray-900 dark:text-white">
                  MH Construction exists to strengthen Pacific Northwest
                  communities.
                </strong>{" "}
                Every project contributes to a stronger, more connected region.
                We work WITH communities to build lasting value.
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
            </PhilosophyCard>
          </div>

          <div className="bg-brand-light dark:bg-gray-800 p-8 border-brand-primary border-l-4 rounded-lg">
            <MaterialIcon
              icon="format_quote"
              className="mb-4 text-brand-primary text-4xl"
            />
            <p className="mb-4 text-gray-800 dark:text-gray-200 text-base sm:text-lg md:text-xl italic leading-relaxed">
              "When you choose MH Construction, you're not hiring a contractor -
              you're gaining a partner who believes in face-to-face
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
    </BrandedContentSection>
  );
}
