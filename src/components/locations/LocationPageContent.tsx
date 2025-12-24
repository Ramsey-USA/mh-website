import Link from "next/link";
import { Button } from "@/components/ui";
import { MaterialIcon } from "@/components/icons/MaterialIcon";
import { StructuredData } from "@/components/seo/seo-meta";
import { enhancedSEO } from "@/components/seo/enhanced-seo";
import {
  generateBreadcrumbSchema,
  breadcrumbPatterns,
} from "@/lib/seo/breadcrumb-schema";
import { type LocationData } from "@/lib/data/locations";

interface LocationPageProps {
  location: LocationData;
}

export function LocationPageContent({ location }: LocationPageProps) {
  // Generate location-specific structured data
  const locationSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `${enhancedSEO.siteUrl}/locations/${location.slug}#localbusiness`,
    name: `MH Construction - ${location.city}`,
    description: `Veteran-owned general contractor serving ${location.city}, ${location.state} with commercial, industrial, and government construction services.`,
    url: `${enhancedSEO.siteUrl}/locations/${location.slug}`,
    telephone: location.telephone,
    email: location.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: location.address.street,
      addressLocality: location.address.city,
      addressRegion: location.address.state,
      postalCode: location.address.zip,
      addressCountry: "US",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: location.coordinates.latitude,
      longitude: location.coordinates.longitude,
    },
    areaServed: {
      "@type": "City",
      name: location.city,
      addressRegion: location.state,
      addressCountry: "US",
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "07:00",
        closes: "16:00",
      },
    ],
    priceRange: "$$$$",
    paymentAccepted: [
      "Cash",
      "Credit Card",
      "Check",
      "ACH",
      "Financing Available",
    ],
    currenciesAccepted: "USD",
    slogan: "Building projects for the client, NOT the dollar",
    veteranOwned: true,
    serviceType: [
      "General Contractor",
      "Commercial Construction",
      "Industrial Construction",
      "Government Construction Projects",
      "Construction Management",
    ],
  };

  return (
    <>
      <StructuredData data={locationSchema} />
      <StructuredData
        data={generateBreadcrumbSchema(
          breadcrumbPatterns[
            location.breadcrumbKey as keyof typeof breadcrumbPatterns
          ],
        )}
      />

      <main className="min-h-screen">
        {/* Hero Section - Location Specific */}
        <section className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white py-20 sm:py-28 md:py-36 lg:py-44">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto text-center space-y-6 sm:space-y-8">
              {/* Location Badge */}
              <div className="flex items-center justify-center gap-2 text-brand-secondary">
                <MaterialIcon icon="place" size="lg" />
                <span className="text-lg sm:text-xl font-semibold">
                  Serving {location.city}, {location.state}
                </span>
              </div>

              {/* Main Heading */}
              <h1 className="font-black text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-tight tracking-tighter">
                <span className="block text-white mb-3">
                  General Contractor in
                </span>
                <span className="block text-brand-secondary drop-shadow-lg">
                  {location.city}, {location.state}
                </span>
              </h1>

              {/* Tagline */}
              <p className="max-w-3xl mx-auto text-base sm:text-lg md:text-xl lg:text-2xl text-white/90 leading-relaxed font-light">
                {location.description}
              </p>

              {/* Core Slogan */}
              <p className="text-sm sm:text-base md:text-lg text-white/80 font-medium">
                "Building projects for the client, NOT the dollar"
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-6">
                <Button
                  asChild
                  variant="primary"
                  size="lg"
                  className="group w-full sm:w-auto"
                >
                  <Link href="/contact">
                    <MaterialIcon
                      icon="event"
                      size="md"
                      className="group-hover:scale-110 transition-transform"
                    />
                    Schedule Free Consultation
                  </Link>
                </Button>
                <Button
                  asChild
                  variant="secondary"
                  size="lg"
                  className="group w-full sm:w-auto"
                >
                  <Link href={`tel:${location.telephone.replace(/\D/g, "")}`}>
                    <MaterialIcon
                      icon="phone"
                      size="md"
                      className="group-hover:scale-110 transition-transform"
                    />
                    Call {location.telephone}
                  </Link>
                </Button>
              </div>

              {/* Trust Indicators */}
              <div className="flex flex-wrap justify-center items-center gap-4 sm:gap-6 pt-8 text-xs sm:text-sm text-white/70">
                <div className="flex items-center gap-2">
                  <MaterialIcon icon="verified" size="sm" />
                  <span>Licensed in WA, OR, ID</span>
                </div>
                <div className="flex items-center gap-2">
                  <MaterialIcon icon="military_tech" size="sm" />
                  <span>Veteran-Owned</span>
                </div>
                <div className="flex items-center gap-2">
                  <MaterialIcon icon="workspace_premium" size="sm" />
                  <span>650+ Projects Completed</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section className="py-16 sm:py-20 md:py-24 bg-white dark:bg-gray-900">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              {/* Section Header */}
              <div className="text-center mb-12 sm:mb-16">
                <h2 className="font-black text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-gray-900 dark:text-gray-100 leading-tight tracking-tighter mb-4">
                  <span className="block text-brand-primary">
                    Construction Services
                  </span>
                  <span className="block text-gray-700 dark:text-gray-300 font-semibold text-xl xs:text-2xl sm:text-3xl md:text-4xl mt-3">
                    in {location.city}, {location.state}
                  </span>
                </h2>
                <p className="max-w-3xl mx-auto text-base sm:text-lg md:text-xl text-gray-600 dark:text-gray-300 leading-relaxed font-light mt-6">
                  Comprehensive construction management services for commercial,
                  industrial, and government projects throughout {location.city}{" "}
                  and the {location.county} area.
                </p>
              </div>

              {/* Services Grid */}
              <div className="grid md:grid-cols-2 gap-6 sm:gap-8">
                {/* Commercial Construction */}
                <div className="bg-gray-50 dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 p-6 sm:p-8 rounded-lg hover:border-brand-primary dark:hover:border-brand-primary transition-all hover:shadow-xl">
                  <div className="flex items-center gap-3 mb-4">
                    <MaterialIcon
                      icon="business"
                      size="xl"
                      className="text-brand-primary"
                    />
                    <h3 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-gray-100">
                      Commercial Construction
                    </h3>
                  </div>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                    Office buildings, retail spaces, restaurants, medical
                    facilities, and religious facilities. Professional
                    construction management from concept to completion.
                  </p>
                </div>

                {/* Industrial Construction */}
                <div className="bg-gray-50 dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 p-6 sm:p-8 rounded-lg hover:border-brand-primary dark:hover:border-brand-primary transition-all hover:shadow-xl">
                  <div className="flex items-center gap-3 mb-4">
                    <MaterialIcon
                      icon="factory"
                      size="xl"
                      className="text-brand-primary"
                    />
                    <h3 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-gray-100">
                      Industrial Construction
                    </h3>
                  </div>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                    Manufacturing facilities, warehouses, and pre-engineered
                    metal buildings (PEMB). Engineered for durability and
                    operational efficiency.
                  </p>
                </div>

                {/* Government Projects */}
                <div className="bg-gray-50 dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 p-6 sm:p-8 rounded-lg hover:border-brand-primary dark:hover:border-brand-primary transition-all hover:shadow-xl">
                  <div className="flex items-center gap-3 mb-4">
                    <MaterialIcon
                      icon="account_balance"
                      size="xl"
                      className="text-brand-primary"
                    />
                    <h3 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-gray-100">
                      Government Projects
                    </h3>
                  </div>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                    Public sector construction with veteran-owned business
                    advantages. Experienced with government compliance and
                    procurement processes.
                  </p>
                </div>

                {/* Tenant Improvements */}
                <div className="bg-gray-50 dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 p-6 sm:p-8 rounded-lg hover:border-brand-primary dark:hover:border-brand-primary transition-all hover:shadow-xl">
                  <div className="flex items-center gap-3 mb-4">
                    <MaterialIcon
                      icon="home_repair_service"
                      size="xl"
                      className="text-brand-primary"
                    />
                    <h3 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-gray-100">
                      Tenant Improvements
                    </h3>
                  </div>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                    Interior renovations, office build-outs, and space
                    modifications. Transform existing spaces to meet your
                    specific business needs.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Why Choose MH Construction */}
        <section className="py-16 sm:py-20 md:py-24 bg-gray-50 dark:bg-gray-800">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              {/* Section Header */}
              <div className="text-center mb-12 sm:mb-16">
                <h2 className="font-black text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-gray-900 dark:text-gray-100 leading-tight tracking-tighter mb-4">
                  <span className="block text-brand-primary">
                    Why {location.city} Chooses
                  </span>
                  <span className="block text-gray-700 dark:text-gray-300 font-semibold text-xl xs:text-2xl sm:text-3xl md:text-4xl mt-3">
                    MH Construction
                  </span>
                </h2>
              </div>

              {/* Features Grid */}
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
                <div className="text-center">
                  <div className="flex justify-center mb-4">
                    <MaterialIcon
                      icon="handshake"
                      size="2xl"
                      className="text-brand-secondary"
                    />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-2">
                    Honesty
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    Transparent communication and pricing
                  </p>
                </div>

                <div className="text-center">
                  <div className="flex justify-center mb-4">
                    <MaterialIcon
                      icon="verified_user"
                      size="2xl"
                      className="text-brand-secondary"
                    />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-2">
                    Integrity
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    Your word is your bond - so is ours
                  </p>
                </div>

                <div className="text-center">
                  <div className="flex justify-center mb-4">
                    <MaterialIcon
                      icon="engineering"
                      size="2xl"
                      className="text-brand-secondary"
                    />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-2">
                    Professionalism
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    Military precision in every project
                  </p>
                </div>

                <div className="text-center">
                  <div className="flex justify-center mb-4">
                    <MaterialIcon
                      icon="task_alt"
                      size="2xl"
                      className="text-brand-secondary"
                    />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-2">
                    Thoroughness
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    Attention to detail in every phase
                  </p>
                </div>
              </div>

              {/* Local Expertise Callout */}
              <div className="mt-12 sm:mt-16 bg-white dark:bg-gray-900 border-2 border-brand-primary p-6 sm:p-8 rounded-lg">
                <div className="flex items-start gap-4">
                  <MaterialIcon
                    icon="location_city"
                    size="xl"
                    className="text-brand-primary flex-shrink-0 mt-1"
                  />
                  <div>
                    <h3 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-gray-100 mb-3">
                      {location.localExpertise.title}
                    </h3>
                    {location.localExpertise.description.map((paragraph, i) => (
                      <p
                        key={i}
                        className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4 last:mb-0"
                      >
                        {paragraph}
                      </p>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Contact CTA Section */}
        <section className="py-16 sm:py-20 md:py-24 bg-gradient-to-br from-brand-primary via-brand-primary to-brand-primary-dark text-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center space-y-6 sm:space-y-8">
              <h2 className="font-black text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl leading-tight tracking-tighter">
                Ready to Start Your
                <span className="block text-brand-secondary mt-2">
                  {location.city} Construction Project?
                </span>
              </h2>

              <p className="max-w-2xl mx-auto text-base sm:text-lg md:text-xl text-white/90 leading-relaxed font-light">
                Let's discuss how MH Construction can bring your vision to life
                with veteran-owned excellence and partnership-driven service.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-6">
                <Button
                  asChild
                  variant="secondary"
                  size="lg"
                  className="group w-full sm:w-auto"
                >
                  <Link href="/contact">
                    <MaterialIcon
                      icon="event"
                      size="md"
                      className="group-hover:scale-110 transition-transform"
                    />
                    Schedule Free Consultation
                  </Link>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="group w-full sm:w-auto bg-white/10 hover:bg-white/20 text-white border-white/30"
                >
                  <Link href="/services">
                    <MaterialIcon
                      icon="construction"
                      size="md"
                      className="group-hover:scale-110 transition-transform"
                    />
                    View All Services
                  </Link>
                </Button>
              </div>

              {/* Contact Info */}
              <div className="pt-8 flex flex-col sm:flex-row justify-center items-center gap-6 text-sm text-white/80">
                <a
                  href={`tel:${location.telephone.replace(/\D/g, "")}`}
                  className="flex items-center gap-2 hover:text-white transition-colors"
                >
                  <MaterialIcon icon="phone" size="sm" />
                  <span>{location.telephone}</span>
                </a>
                <a
                  href={`mailto:${location.email}`}
                  className="flex items-center gap-2 hover:text-white transition-colors"
                >
                  <MaterialIcon icon="email" size="sm" />
                  <span>{location.email}</span>
                </a>
                <div className="flex items-center gap-2">
                  <MaterialIcon icon="schedule" size="sm" />
                  <span>Mon-Fri: 7am - 4pm</span>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
