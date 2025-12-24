import Link from "next/link";
import { Button } from "@/components/ui";
import { MaterialIcon } from "@/components/icons/MaterialIcon";
import { StructuredData } from "@/components/seo/seo-meta";
import { enhancedSEO } from "@/components/seo/enhanced-seo";
import { type Metadata } from "next";
import {
  generateBreadcrumbSchema,
  breadcrumbPatterns,
} from "@/lib/seo/breadcrumb-schema";

// SEO Metadata for Pasco location page
export const metadata: Metadata = {
  title: "Base HQ → Pasco | General Contractor Pasco WA | MH Construction",
  description:
    "Base HQ → Pasco: Your Construction Command Center in Franklin County. MH Construction provides professional veteran-owned general contractor services in Pasco, Washington with service-earned values and military precision. Dual-label approach: Operations → Services. Commercial, industrial, and government projects. Chain of Command excellence. Licensed in WA, OR, ID. Call (509) 308-6489.",
  keywords: [
    "Base HQ Pasco construction command center",
    "dual-label military construction Pasco",
    "service-earned construction values Pasco",
    "general contractor Pasco WA",
    "general contractor Pasco",
    "construction company Pasco",
    "commercial contractor Pasco Washington",
    "Pasco construction services",
    "veteran-owned contractor Pasco",
    "Franklin County general contractor",
    "Pasco WA builder",
    "construction management Pasco",
    "military precision construction Pasco",
    "Chain of Command construction Pasco",
  ],
  alternates: {
    canonical: "https://www.mhc-gc.com/locations/pasco",
  },
  openGraph: {
    title: "Base HQ → Pasco | General Contractor Pasco WA | MH Construction",
    description:
      "Base HQ → Pasco: Your Construction Command Center. Professional veteran-owned construction services with service-earned values and military precision. Dual-label approach. Commercial, industrial & government projects.",
    url: "https://www.mhc-gc.com/locations/pasco",
    siteName: "MH Construction",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "General Contractor Pasco WA | MH Construction",
    description:
      "Professional construction services in Pasco, WA. Veteran-owned, partnership-driven approach.",
    creator: "@mhc_gc",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function PascoLocationPage() {
  // Generate location-specific structured data
  const pascoSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `${enhancedSEO.siteUrl}/locations/pasco#localbusiness`,
    name: "MH Construction - Pasco",
    description:
      "Veteran-owned general contractor serving Pasco, Washington with commercial, industrial, and government construction services.",
    url: `${enhancedSEO.siteUrl}/locations/pasco`,
    telephone: enhancedSEO.companyInfo.telephone,
    email: enhancedSEO.companyInfo.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: "3111 N. Capitol Ave.",
      addressLocality: "Pasco",
      addressRegion: "WA",
      postalCode: "99301",
      addressCountry: "US",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 46.2396,
      longitude: -119.1006,
    },
    areaServed: {
      "@type": "City",
      name: "Pasco",
      addressRegion: "WA",
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
      <StructuredData data={pascoSchema} />
      <StructuredData
        data={generateBreadcrumbSchema(breadcrumbPatterns.locationPasco)}
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
                  Serving Pasco, Washington
                </span>
              </div>

              {/* Main Heading */}
              <h1 className="font-black text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-tight tracking-tighter">
                <span className="block text-white mb-3">
                  General Contractor in
                </span>
                <span className="block text-brand-secondary drop-shadow-lg">
                  Pasco, WA
                </span>
              </h1>

              {/* Tagline */}
              <p className="max-w-3xl mx-auto text-base sm:text-lg md:text-xl lg:text-2xl text-white/90 leading-relaxed font-light">
                Veteran-owned construction excellence serving Pasco with
                honesty, integrity, professionalism, and thoroughness since
                2010.
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
                  <Link href="tel:+15093086489">
                    <MaterialIcon
                      icon="phone"
                      size="md"
                      className="group-hover:scale-110 transition-transform"
                    />
                    Call (509) 308-6489
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
                    in Pasco, Washington
                  </span>
                </h2>
                <p className="max-w-3xl mx-auto text-base sm:text-lg md:text-xl text-gray-600 dark:text-gray-300 leading-relaxed font-light mt-6">
                  Comprehensive construction management services for commercial,
                  industrial, and government projects throughout Pasco and the
                  Tri-Cities area.
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

        {/* Why Choose MH Construction in Pasco */}
        <section className="py-16 sm:py-20 md:py-24 bg-gray-50 dark:bg-gray-800">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              {/* Section Header */}
              <div className="text-center mb-12 sm:mb-16">
                <h2 className="font-black text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-gray-900 dark:text-gray-100 leading-tight tracking-tighter mb-4">
                  <span className="block text-brand-primary">
                    Why Pasco Chooses
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
                      Local Pasco Expertise
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
                      Based in nearby Pasco, we've been serving Pasco and the
                      Tri-Cities area since 2010. We understand local building
                      codes, permitting processes, and the unique construction
                      challenges of Eastern Washington.
                    </p>
                    <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                      With over 650 completed projects throughout Benton and
                      Franklin Counties, we're your trusted local partner for
                      construction excellence in Pasco.
                    </p>
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
                  Pasco Construction Project?
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
                  href="tel:+15093086489"
                  className="flex items-center gap-2 hover:text-white transition-colors"
                >
                  <MaterialIcon icon="phone" size="sm" />
                  <span>(509) 308-6489</span>
                </a>
                <a
                  href="mailto:office@mhc-gc.com"
                  className="flex items-center gap-2 hover:text-white transition-colors"
                >
                  <MaterialIcon icon="email" size="sm" />
                  <span>office@mhc-gc.com</span>
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
