// Note: Metadata export removed due to "use client" directive
// SEO handled via next-seo or alternative client-side SEO solution
import Head from "next/head";
import { getTradePartnersSEO } from "@/lib/seo/page-seo-utils";
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
} from "@/components/animations/FramerMotionComponents";
import { PageNavigation } from "@/components/navigation/PageNavigation";
import { Breadcrumb } from "@/components/navigation/Breadcrumb";
import { navigationConfigs } from "@/components/navigation/navigationConfigs";
import { getCardClassName } from "@/lib/styles/card-variants";
import { gridPresets } from "@/lib/styles/layout-variants";
import { UnderConstruction } from "@/components/layout/UnderConstruction";

// Feature flag - set to false to show full page content
const SHOW_UNDER_CONSTRUCTION = false;

// Get SEO metadata
const tradePartnersSEOData = getTradePartnersSEO();

// Trade Partner Categories
const partnerCategories = [
  {
    category: "Electrical Contractors",
    icon: "electrical_services",
    description:
      "Licensed electrical professionals providing safe, code-compliant installations",
    partners: [
      {
        name: "Pacific Northwest Electric",
        specialty: "Commercial & Industrial Electrical",
        yearsWorking: "8+ years",
        location: "Tri-Cities, WA",
        description:
          "Specializing in high-voltage commercial installations and industrial electrical systems.",
      },
      {
        name: "Columbia Basin Electrical",
        specialty: "Residential & Light Commercial",
        yearsWorking: "5+ years",
        location: "Pasco, WA",
        description:
          "Expert residential electrical work and light commercial electrical installations.",
      },
    ],
  },
  {
    category: "Plumbing Contractors",
    icon: "plumbing",
    description:
      "Expert plumbing professionals for all water, sewer, and gas line needs",
    partners: [
      {
        name: "Tri-Cities Plumbing Solutions",
        specialty: "Commercial Plumbing Systems",
        yearsWorking: "6+ years",
        location: "Richland, WA",
        description:
          "Commercial plumbing specialists with expertise in large-scale water and sewer systems.",
      },
      {
        name: "Desert Plumbing & Heating",
        specialty: "HVAC & Plumbing Integration",
        yearsWorking: "4+ years",
        location: "Kennewick, WA",
        description:
          "Combined plumbing and HVAC services for comprehensive building system solutions.",
      },
    ],
  },
  {
    category: "HVAC Specialists",
    icon: "hvac",
    description:
      "Climate control experts ensuring comfortable, efficient building environments",
    partners: [
      {
        name: "Columbia River HVAC",
        specialty: "Commercial Climate Systems",
        yearsWorking: "7+ years",
        location: "Tri-Cities, WA",
        description:
          "Large-scale commercial HVAC installations and energy-efficient climate solutions.",
      },
      {
        name: "Valley Air Systems",
        specialty: "Industrial HVAC Solutions",
        yearsWorking: "5+ years",
        location: "Pasco, WA",
        description:
          "Industrial-grade heating, ventilation, and air conditioning for specialized facilities.",
      },
    ],
  },
  {
    category: "Concrete & Masonry",
    icon: "foundation",
    description:
      "Foundation and structural concrete experts building solid foundations",
    partners: [
      {
        name: "Northwest Concrete Works",
        specialty: "Foundation & Structural Concrete",
        yearsWorking: "10+ years",
        location: "Tri-Cities, WA",
        description:
          "Premier concrete contractors specializing in foundations, slabs, and structural elements.",
      },
      {
        name: "Columbia Masonry",
        specialty: "Decorative & Structural Masonry",
        yearsWorking: "6+ years",
        location: "Richland, WA",
        description:
          "Expert masonry work including brick, block, and stone for both aesthetic and structural applications.",
      },
    ],
  },
  {
    category: "Roofing Specialists",
    icon: "roofing",
    description:
      "Professional roofing contractors protecting every project from the elements",
    partners: [
      {
        name: "Pacific Roofing Solutions",
        specialty: "Commercial & Industrial Roofing",
        yearsWorking: "9+ years",
        location: "Tri-Cities, WA",
        description:
          "Commercial roofing specialists with expertise in flat, metal, and specialty roofing systems.",
      },
      {
        name: "Desert Shield Roofing",
        specialty: "Weather-Resistant Systems",
        yearsWorking: "4+ years",
        location: "Pasco, WA",
        description:
          "Specialized in durable roofing solutions designed for the Pacific Northwest climate.",
      },
    ],
  },
  {
    category: "Material Suppliers",
    icon: "local_shipping",
    description:
      "Reliable suppliers providing quality materials for every construction need",
    partners: [
      {
        name: "Columbia Building Supply",
        specialty: "Lumber & Building Materials",
        yearsWorking: "12+ years",
        location: "Tri-Cities, WA",
        description:
          "Full-service building supply with lumber, hardware, and construction materials.",
      },
      {
        name: "Northwest Steel & Supply",
        specialty: "Structural Steel & Metal",
        yearsWorking: "8+ years",
        location: "Richland, WA",
        description:
          "Industrial steel supplier providing structural steel, metal fabrication, and welding materials.",
      },
    ],
  },
];

// Trade Partnership values - Focused on vendor relationships
const partnershipValues = [
  {
    icon: "handshake",
    title: "Where Handshakes Still Matter",
    description:
      "Your word is your bond. We treat our Trade Partners with the same integrity and respect we give our Client Partners—building relationships through face-to-face trust, mutual respect, and shared commitment to doing what's right. Veteran-owned leadership brings honor, accountability, and unwavering integrity to every partnership.",
    color: "from-brand-primary to-brand-primary-dark",
  },
  {
    icon: "campaign",
    title: "Reliable Scheduling & Clear Communication",
    description:
      "Transparent open-book communication and dependable project timelines help our trade partners plan effectively and manage their resources with confidence. You control it, we manage it—together with award-winning execution (.64 EMR safety record).",
    color: "from-brand-secondary to-brand-secondary-dark",
  },
  {
    icon: "account_balance",
    title: "Fair & Prompt Payment Terms",
    description:
      "Competitive compensation and reliable payment schedules support the financial health and business growth of our Trade Partners. Building projects for the client, NOT the dollar means treating partners with the same transparency and fairness we give Client Partners.",
    color: "from-brand-secondary to-bronze-700",
  },
  {
    icon: "health_and_safety",
    title: "Collaborative Excellence & Safety First",
    description:
      "Working together to solve challenges, share expertise, and deliver exceptional results with award-winning safety standards (.64 EMR—40% better than industry). Everyone goes home safe, every single day, strengthening our network through mutual success.",
    color: "from-brand-primary-light to-brand-primary",
  },
];

// Trade Partnership benefits - Business growth focused
const partnershipBenefits = [
  {
    icon: "trending_up",
    title: "Consistent Project Pipeline",
    description:
      "Access to a steady flow of quality construction projects throughout the Pacific Northwest, providing reliable business opportunities year-round backed by 150+ years combined team experience and veteran-owned reliability.",
  },
  {
    icon: "diversity_3",
    title: "Professional Network & Veteran Support",
    description:
      "Join a network of trusted trade professionals and industry leaders, opening doors to collaboration and business development opportunities. Veteran-owned businesses receive priority consideration in our partnership network.",
  },
  {
    icon: "verified",
    title: "Clear Quality Standards & Safety Excellence",
    description:
      "Well-defined quality expectations and project specifications help trade partners deliver their best work with confidence and consistency. Award-winning safety protocols (.64 EMR) ensure everyone goes home safe while maintaining the highest standards.",
  },
  {
    icon: "military_tech",
    title: "Industry Collaboration & Continuous Improvement",
    description:
      "Share best practices, proven solutions, and industry insights in a professional environment that values continuous improvement. 150+ years combined experience means learning from reliable methods while embracing excellence.",
  },
  {
    icon: "verified_user",
    title: "Insurance & Compliance Support",
    description:
      "Guidance on insurance requirements, safety protocols, and compliance standards to help meet project specifications and industry regulations.",
  },
  {
    icon: "workspace_premium",
    title: "Business Growth Opportunities",
    description:
      "Work on diverse, high-quality projects that enhance capabilities, build reputation, and create opportunities for sustainable business expansion.",
  },
];

export default function AlliesPage() {
  // Show under construction notice while preserving all content below
  if (SHOW_UNDER_CONSTRUCTION) {
    return (
      <UnderConstruction
        pageName="Allies"
        description="We're refining our ally information to accurately represent partnership opportunities and requirements for subcontractors and suppliers."
        estimatedCompletion="December 2025"
      />
    );
  }

  // Original page content preserved below - will be shown when flag is set to false

  return (
    <div className="bg-white dark:bg-gray-900 min-h-screen">
      {/* Enhanced SEO Meta Tags */}
      <Head>
        <title>{tradePartnersSEOData.title as string}</title>
        <meta
          name="description"
          content={(tradePartnersSEOData.description as string) || ""}
        />
        <meta
          name="keywords"
          content={
            Array.isArray(tradePartnersSEOData.keywords)
              ? tradePartnersSEOData.keywords.join(", ")
              : (tradePartnersSEOData.keywords as string) || ""
          }
        />
      </Head>

      {/* Hero Section - Group 7: Partnership & ROI Focus */}
      <section className="relative bg-gradient-to-br from-gray-900 via-brand-primary to-gray-900 h-screen flex items-end justify-end text-white overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 bg-gradient-to-br from-brand-primary/30 via-gray-900/80 to-brand-secondary/20"></div>

        {/* Content - Bottom Right */}
        <div className="relative z-30 mb-32 sm:mb-36 md:mb-40 lg:mb-44 mr-4 sm:mr-6 lg:mr-8 xl:mr-12 ml-auto max-w-2xl pointer-events-none pb-2">
          <h1 className="text-right text-base xs:text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-bold text-white drop-shadow-2xl leading-relaxed">
            <span className="block text-brand-secondary">
              THE ROI IS THE RELATIONSHIP
            </span>
            <span className="block text-brand-primary">Allies in Force</span>
            <span className="block text-white/90">
              Building projects for the client,{" "}
              <span className="font-black italic text-bronze-300">NOT</span> the
              dollar
            </span>
          </h1>
        </div>

        {/* Page-Specific Navigation Bar */}
        <PageNavigation
          items={navigationConfigs.allies}
          className="absolute bottom-0 left-0 right-0"
        />
      </section>

      {/* Breadcrumb Navigation */}
      <Breadcrumb
        items={[{ label: "Home", href: "/" }, { label: "Allies in Force" }]}
      />

      <div className="mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32 xl:py-40 max-w-7xl">
        {/* Important Distinction Notice */}
        <section className="mb-20 lg:mb-32">
          <FadeInWhenVisible>
            <div className="bg-gradient-to-r from-brand-primary/10 to-brand-secondary/10 dark:from-brand-primary/20 dark:to-brand-secondary/20 border-l-4 border-brand-primary p-6 md:p-8 rounded-r-xl">
              <div className="flex items-start gap-4">
                <MaterialIcon
                  icon="info"
                  size="xl"
                  theme="military"
                  ariaLabel="Important Partnership Information"
                  className="text-brand-primary flex-shrink-0 mt-1"
                />
                <div>
                  <h3 className="font-bold text-gray-900 dark:text-white text-xl mb-3">
                    Allies vs. Client Partnerships
                  </h3>
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-2">
                    <strong>
                      This page is for subcontractors, suppliers, and vendors
                    </strong>{" "}
                    interested in joining our trade partnership network to work
                    on MH Construction projects.
                  </p>
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                    If you're a{" "}
                    <strong>
                      property owner or business seeking construction services
                    </strong>
                    , please visit our{" "}
                    <Link
                      href="/contact"
                      className="text-brand-primary hover:text-brand-primary-dark font-semibold underline"
                    >
                      Contact Page
                    </Link>{" "}
                    to schedule a free consultation or explore our{" "}
                    <Link
                      href="/services"
                      className="text-brand-primary hover:text-brand-primary-dark font-semibold underline"
                    >
                      Services
                    </Link>{" "}
                    to learn about Client Partner relationships. Visit our
                    Services page for detailed information about project
                    collaboration.
                  </p>
                </div>
              </div>
            </div>
          </FadeInWhenVisible>
        </section>

        {/* Trade Partnership Philosophy */}
        <section className="mb-20 lg:mb-32">
          <FadeInWhenVisible>
            {/* Section Header - Military Construction Standard */}
            <div className="mb-16 sm:mb-20 text-center">
              {/* Icon with decorative lines */}
              <div className="flex items-center justify-center mb-8 gap-4">
                <div className="h-1 w-16 bg-gradient-to-r from-transparent to-gray-300 dark:to-gray-600 rounded-full"></div>
                <div className="relative">
                  <div className="absolute -inset-4 bg-gradient-to-br from-brand-secondary/30 to-bronze-600/30 blur-2xl rounded-full"></div>
                  <div className="relative bg-gradient-to-br from-brand-secondary via-bronze-700 to-bronze-800 p-5 rounded-2xl shadow-2xl border-2 border-white/50 dark:border-gray-600">
                    <MaterialIcon
                      icon="handshake"
                      size="2xl"
                      className="text-white drop-shadow-lg"
                    />
                  </div>
                </div>
                <div className="h-1 w-16 bg-gradient-to-l from-transparent to-gray-300 dark:to-gray-600 rounded-full"></div>
              </div>

              {/* Two-line gradient heading */}
              <h2 className="mb-6 sm:mb-8 font-black text-gray-900 dark:text-white text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-relaxed tracking-tighter overflow-visible">
                <span className="block mb-3 sm:mb-4 font-semibold text-gray-700 dark:text-gray-200 text-xl xs:text-2xl sm:text-3xl md:text-4xl lg:text-5xl tracking-tight overflow-visible py-1">
                  Where Handshakes Matter
                </span>
                <span className="block bg-gradient-to-r from-brand-primary via-brand-secondary to-brand-primary bg-clip-text text-transparent font-black drop-shadow-sm overflow-visible py-2 pb-3 leading-normal">
                  In Every Partnership
                </span>
              </h2>

              {/* Description with colored keyword highlighting */}
              <p className="mx-auto max-w-5xl font-light text-gray-700 dark:text-gray-300 text-base sm:text-lg md:text-xl lg:text-2xl leading-relaxed tracking-wide px-2">
                <span className="font-bold text-brand-primary dark:text-brand-primary-light">
                  "THE ROI IS THE RELATIONSHIP—and we prove it."
                </span>{" "}
                Building for the Client,{" "}
                <span className="font-black text-bronze-600 dark:text-bronze-400">
                  NOT
                </span>{" "}
                the Dollar means treating our trade partners with the same
                integrity we give our Client Partners.{" "}
                <span className="font-bold text-gray-900 dark:text-white">
                  Quality construction is built through trusted relationships
                </span>
                —where your word is your bond, handshakes matter, and mutual
                respect defines every partnership. Fair payment, clear
                communication, mutual success. Backed by veteran-owned
                leadership, award-winning safety (.64 EMR), and 150+ years
                combined experience.
              </p>
              <cite className="block mt-4 font-semibold text-brand-secondary text-lg">
                — MH Construction Leadership Team
              </cite>
            </div>
          </FadeInWhenVisible>

          <StaggeredFadeIn className={gridPresets.compactCards("lg")}>
            {partnershipValues.map((value, _index) => (
              <Card key={_index} className={getCardClassName("default")}>
                <CardContent className="flex flex-col p-6 h-full text-center">
                  <div
                    className={`flex justify-center items-center bg-gradient-to-r ${value.color} mx-auto mb-4 rounded-full w-16 h-16`}
                  >
                    <MaterialIcon
                      icon={value.icon}
                      size="lg"
                      className="text-white"
                    />
                  </div>
                  <h3 className="mb-3 font-bold text-gray-900 dark:text-white text-lg">
                    {value.title}
                  </h3>
                  <p className="flex-grow text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
                    {value.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </StaggeredFadeIn>
        </section>

        {/* Trade Partner Categories - Join Our Network */}
        <section className="mb-20 lg:mb-32">
          <FadeInWhenVisible>
            {/* Section Header - Military Construction Standard */}
            <div className="mb-16 sm:mb-20 text-center">
              {/* Icon with decorative lines */}
              <div className="flex items-center justify-center mb-8 gap-4">
                <div className="h-1 w-16 bg-gradient-to-r from-transparent to-gray-300 dark:to-gray-600 rounded-full"></div>
                <div className="relative">
                  <div className="absolute -inset-4 bg-gradient-to-br from-brand-primary/20 to-brand-secondary/20 blur-2xl rounded-full"></div>
                  <div className="relative bg-gradient-to-br from-brand-primary via-brand-secondary to-bronze-700 p-5 rounded-2xl shadow-2xl border-2 border-white/50 dark:border-gray-600">
                    <MaterialIcon
                      icon="groups"
                      size="2xl"
                      className="text-white drop-shadow-lg"
                    />
                  </div>
                </div>
                <div className="h-1 w-16 bg-gradient-to-l from-transparent to-gray-300 dark:to-gray-600 rounded-full"></div>
              </div>

              {/* Two-line gradient heading */}
              <h2 className="mb-6 sm:mb-8 font-black text-gray-900 dark:text-white text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-relaxed tracking-tighter overflow-visible">
                <span className="block mb-3 sm:mb-4 font-semibold text-gray-700 dark:text-gray-200 text-xl xs:text-2xl sm:text-3xl md:text-4xl lg:text-5xl tracking-tight overflow-visible py-1">
                  Join Our Ally
                </span>
                <span className="block bg-gradient-to-r from-brand-primary via-brand-secondary to-brand-primary bg-clip-text text-transparent font-black drop-shadow-sm overflow-visible py-2 pb-3 leading-normal">
                  Network
                </span>
              </h2>

              {/* Description with colored keyword highlighting */}
              <p className="mx-auto max-w-5xl font-light text-gray-700 dark:text-gray-300 text-base sm:text-lg md:text-xl lg:text-2xl leading-relaxed tracking-wide px-2">
                We're actively building our{" "}
                <span className="font-bold text-brand-primary dark:text-brand-primary-light">
                  approved ally network
                </span>{" "}
                with qualified professionals across all construction trades.
                Your company could be{" "}
                <span className="font-bold text-gray-900 dark:text-white">
                  featured here as a trusted partner
                </span>
                —bringing expertise, reliability, and quality workmanship to MH
                Construction projects.
              </p>
            </div>
          </FadeInWhenVisible>

          <div className="space-y-8">
            {partnerCategories.map((category, categoryIndex) => (
              <FadeInWhenVisible key={categoryIndex}>
                <Card className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
                  <CardHeader className="pb-4">
                    <div className="flex items-center">
                      <div className="flex justify-center items-center bg-brand-primary mr-4 rounded-full w-12 h-12">
                        <MaterialIcon
                          icon={category.icon}
                          size="lg"
                          className="text-white"
                        />
                      </div>
                      <div>
                        <CardTitle className="text-gray-900 dark:text-white text-2xl">
                          {category.category}
                        </CardTitle>
                        <p className="text-gray-600 dark:text-gray-300">
                          {category.description}
                        </p>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className={gridPresets.twoColumn("md")}>
                      {category.partners.map((partner, partnerIndex) => (
                        <div
                          key={partnerIndex}
                          className="bg-gradient-to-br from-brand-primary/5 to-brand-secondary/5 dark:from-brand-primary/10 dark:to-brand-secondary/10 border-2 border-dashed border-brand-primary/30 dark:border-brand-primary/40 p-6 rounded-lg transition-all hover:border-brand-primary hover:shadow-lg text-center"
                        >
                          <MaterialIcon
                            icon="add_business"
                            className="mx-auto mb-4 text-brand-primary text-5xl"
                          />
                          <h4 className="font-bold text-gray-900 dark:text-white text-xl mb-3">
                            Your Company Here
                          </h4>
                          <p className="text-gray-700 dark:text-gray-300 text-base leading-relaxed mb-4">
                            {partner.specialty}
                          </p>
                          <Link
                            href="/contact"
                            className="inline-flex items-center gap-2 px-6 py-3 bg-brand-primary hover:bg-brand-secondary text-white transition-all duration-300 rounded-lg font-semibold shadow-md hover:shadow-lg"
                          >
                            <MaterialIcon
                              icon="handshake"
                              size="sm"
                              theme="veteran"
                              ariaLabel="Apply"
                            />
                            <span>Apply Now</span>
                          </Link>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </FadeInWhenVisible>
            ))}
          </div>
        </section>

        {/* Partnership Benefits */}
        <section className="mb-20 lg:mb-32">
          <FadeInWhenVisible>
            {/* Section Header - Military Construction Standard */}
            <div className="mb-16 sm:mb-20 text-center">
              {/* Icon with decorative lines */}
              <div className="flex items-center justify-center mb-8 gap-4">
                <div className="h-1 w-16 bg-gradient-to-r from-transparent to-gray-300 dark:to-gray-600 rounded-full"></div>
                <div className="relative">
                  <div className="absolute -inset-4 bg-gradient-to-br from-brand-secondary/30 to-bronze-700/30 blur-2xl rounded-full"></div>
                  <div className="relative bg-gradient-to-br from-brand-secondary via-bronze-700 to-bronze-800 p-5 rounded-2xl shadow-2xl border-2 border-white/50 dark:border-gray-600">
                    <MaterialIcon
                      icon="workspace_premium"
                      size="2xl"
                      className="text-white drop-shadow-lg"
                    />
                  </div>
                </div>
                <div className="h-1 w-16 bg-gradient-to-l from-transparent to-gray-300 dark:to-gray-600 rounded-full"></div>
              </div>

              {/* Two-line gradient heading */}
              <h2 className="mb-6 sm:mb-8 font-black text-gray-900 dark:text-white text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-relaxed tracking-tighter overflow-visible">
                <span className="block mb-3 sm:mb-4 font-semibold text-gray-700 dark:text-gray-200 text-xl xs:text-2xl sm:text-3xl md:text-4xl lg:text-5xl tracking-tight overflow-visible py-1">
                  Trade Partnership
                </span>
                <span className="block bg-gradient-to-r from-brand-primary via-brand-secondary to-brand-primary bg-clip-text text-transparent font-black drop-shadow-sm overflow-visible py-2 pb-3 leading-normal">
                  Benefits
                </span>
              </h2>

              {/* Description with colored keyword highlighting */}
              <p className="mx-auto max-w-5xl font-light text-gray-700 dark:text-gray-300 text-base sm:text-lg md:text-xl lg:text-2xl leading-relaxed tracking-wide px-2">
                We're committed to creating{" "}
                <span className="font-bold text-brand-primary dark:text-brand-primary-light">
                  mutually beneficial business relationships
                </span>{" "}
                that support the growth and success of our approved vendors and
                trade professionals with{" "}
                <span className="font-bold text-gray-900 dark:text-white">
                  transparent communication, award-winning safety culture, and
                  veteran-owned integrity
                </span>{" "}
                in every partnership.
              </p>
            </div>
          </FadeInWhenVisible>

          <StaggeredFadeIn className={gridPresets.cards3("md", "mb-12")}>
            {partnershipBenefits.map((benefit, _index) => (
              <Card
                key={_index}
                className="flex flex-col bg-white dark:bg-gray-900 hover:shadow-lg dark:hover:shadow-gray-600/50 transition-all hover:-translate-y-1 h-full"
              >
                <CardContent className="flex flex-col p-6 h-full">
                  <div className="flex items-center mb-4">
                    <div className="flex justify-center items-center bg-brand-primary mr-4 rounded-full w-12 h-12">
                      <MaterialIcon
                        icon={benefit.icon}
                        size="lg"
                        className="text-white"
                      />
                    </div>
                    <h3 className="font-bold text-gray-900 dark:text-white text-lg">
                      {benefit.title}
                    </h3>
                  </div>
                  <p className="flex-grow text-gray-600 dark:text-gray-300 leading-relaxed">
                    {benefit.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </StaggeredFadeIn>
        </section>

        {/* Vendor Requirements & Application Process */}
        <section className="mb-20 lg:mb-32">
          <FadeInWhenVisible>
            {/* Section Header - Military Construction Standard */}
            <div className="mb-16 sm:mb-20 text-center">
              {/* Icon with decorative lines */}
              <div className="flex items-center justify-center mb-8 gap-4">
                <div className="h-1 w-16 bg-gradient-to-r from-transparent to-gray-300 dark:to-gray-600 rounded-full"></div>
                <div className="relative">
                  <div className="absolute -inset-4 bg-gradient-to-br from-brand-primary/30 to-brand-primary-dark/30 blur-2xl rounded-full"></div>
                  <div className="relative bg-gradient-to-br from-brand-primary via-brand-primary-dark to-brand-primary-darker p-5 rounded-2xl shadow-2xl border-2 border-white/50 dark:border-gray-600">
                    <MaterialIcon
                      icon="verified"
                      size="2xl"
                      className="text-white drop-shadow-lg"
                    />
                  </div>
                </div>
                <div className="h-1 w-16 bg-gradient-to-l from-transparent to-gray-300 dark:to-gray-600 rounded-full"></div>
              </div>

              {/* Two-line gradient heading */}
              <h2 className="mb-6 sm:mb-8 font-black text-gray-900 dark:text-white text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-relaxed tracking-tighter overflow-visible">
                <span className="block mb-3 sm:mb-4 font-semibold text-gray-700 dark:text-gray-200 text-xl xs:text-2xl sm:text-3xl md:text-4xl lg:text-5xl tracking-tight overflow-visible py-1">
                  Approved Vendor
                </span>
                <span className="block bg-gradient-to-r from-brand-primary via-brand-secondary to-brand-primary bg-clip-text text-transparent font-black drop-shadow-sm overflow-visible py-2 pb-3 leading-normal">
                  Requirements
                </span>
              </h2>

              {/* Description with colored keyword highlighting */}
              <p className="mx-auto max-w-5xl font-light text-gray-700 dark:text-gray-300 text-base sm:text-lg md:text-xl lg:text-2xl leading-relaxed tracking-wide px-2">
                We seek{" "}
                <span className="font-bold text-brand-primary dark:text-brand-primary-light">
                  qualified trade professionals
                </span>{" "}
                who share our commitment to{" "}
                <span className="font-bold text-gray-900 dark:text-white">
                  quality, safety excellence (.64 EMR award-winning record), and
                  professional integrity
                </span>
                . Here's what we look for in approved vendors seeking
                partnership with our veteran-owned company.
              </p>
            </div>
          </FadeInWhenVisible>

          {/* Veteran Trade Partner Priority Callout */}
          <FadeInWhenVisible>
            <div className="bg-gradient-to-r from-brand-primary/10 via-brand-secondary/10 to-brand-primary/10 dark:from-brand-primary/20 dark:via-brand-secondary/20 dark:to-brand-primary/20 p-8 lg:p-10 border-2 border-brand-primary/30 rounded-xl shadow-lg mb-12">
              <div className="flex flex-col lg:flex-row items-center gap-6 text-center lg:text-left">
                <div className="flex-shrink-0 flex items-center justify-center w-20 h-20 bg-gradient-to-br from-brand-primary to-brand-secondary rounded-full shadow-lg">
                  <MaterialIcon
                    icon="military_tech"
                    size="4xl"
                    theme="veteran"
                    ariaLabel="Veteran-Owned Priority"
                    className="text-white"
                  />
                </div>
                <div className="flex-1">
                  <h3 className="mb-3 font-black text-gray-900 dark:text-white text-2xl lg:text-3xl">
                    Veteran-Owned Trade Partners: Priority Consideration
                  </h3>
                  <p className="text-gray-700 dark:text-gray-300 text-lg leading-relaxed mb-4">
                    As a veteran-owned company led by military veterans, we
                    prioritize partnerships with fellow veteran-owned businesses
                    across all service branches. Veteran trade partners receive
                    expedited application review, preferential bidding
                    opportunities, and dedicated support for business growth.
                  </p>
                  <Link
                    href="/veterans"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-brand-primary hover:bg-brand-secondary text-white transition-all duration-300 rounded-lg font-bold shadow-md hover:shadow-lg"
                  >
                    <MaterialIcon
                      icon="military_tech"
                      size="md"
                      theme="veteran"
                      ariaLabel="Veterans Initiative"
                    />
                    <span>Learn About Our Veterans Initiative</span>
                  </Link>
                </div>
              </div>
            </div>
          </FadeInWhenVisible>

          <div className={gridPresets.twoColumn("lg")}>
            <FadeInWhenVisible>
              <Card className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 h-full">
                <CardHeader>
                  <div className="flex items-center mb-4">
                    <div className="flex justify-center items-center bg-brand-primary mr-4 rounded-full w-12 h-12">
                      <MaterialIcon
                        icon="verified"
                        size="lg"
                        theme="military"
                        ariaLabel="Essential Qualifications"
                        className="text-white"
                      />
                    </div>
                    <CardTitle className="text-gray-900 dark:text-white text-2xl">
                      Essential Qualifications
                    </CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {[
                      "Valid trade licensing for Washington, Oregon, and/or Idaho",
                      "Current liability and worker's compensation insurance",
                      "Proven track record of quality workmanship",
                      "Professional references from recent projects",
                      "Commitment to safety standards and protocols",
                      "Alignment with MH Construction values and standards",
                    ].map((item, _index) => (
                      <li key={_index} className="flex items-start">
                        <MaterialIcon
                          icon="check_circle"
                          size="sm"
                          theme="military"
                          ariaLabel="Required"
                          className="text-brand-primary mr-3 flex-shrink-0 mt-1"
                        />
                        <span className="text-gray-700 dark:text-gray-300">
                          {item}
                        </span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </FadeInWhenVisible>

            <FadeInWhenVisible>
              <Card className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 h-full">
                <CardHeader>
                  <div className="flex items-center mb-4">
                    <div className="flex justify-center items-center bg-brand-secondary mr-4 rounded-full w-12 h-12">
                      <MaterialIcon
                        icon="workspace_premium"
                        size="lg"
                        theme="veteran"
                        ariaLabel="Preferred Qualifications"
                        className="text-white"
                      />
                    </div>
                    <CardTitle className="text-gray-900 dark:text-white text-2xl">
                      Preferred Qualifications
                    </CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {[
                      "Veteran-owned or veteran-employed businesses (priority)",
                      "Local Pacific Northwest presence and familiarity",
                      "Experience with diverse project types and scales",
                      "Strong safety record and industry certifications",
                      "Technology-capable for project communication",
                      "Sustainable and community-minded business practices",
                    ].map((item, _index) => (
                      <li key={_index} className="flex items-start">
                        <MaterialIcon
                          icon="star"
                          size="sm"
                          theme="veteran"
                          ariaLabel="Preferred"
                          className="text-brand-secondary mr-3 flex-shrink-0 mt-1"
                        />
                        <span className="text-gray-700 dark:text-gray-300">
                          {item}
                        </span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </FadeInWhenVisible>
          </div>

          {/* Application Process */}
          <div className="mt-12">
            <FadeInWhenVisible>
              <div className="mb-8 text-center">
                <h3 className="mb-4 font-bold text-gray-900 dark:text-white text-xl md:text-2xl">
                  Trade Partnership Application Process
                </h3>
                <p className="mx-auto max-w-2xl text-gray-600 dark:text-gray-300">
                  Our straightforward application process ensures we build
                  strong, qualified partnerships with the right trade
                  professionals.
                </p>
              </div>
            </FadeInWhenVisible>

            <div className={gridPresets.compactCards("md")}>
              {[
                {
                  step: "1",
                  icon: "description",
                  title: "Submit Application",
                  description:
                    "Complete our vendor application with company information, specializations, and licensing details.",
                },
                {
                  step: "2",
                  icon: "verified_user",
                  title: "Documentation Review",
                  description:
                    "Provide required documents including licenses, insurance certificates, and safety certifications.",
                },
                {
                  step: "3",
                  icon: "emoji_events",
                  title: "Portfolio & References",
                  description:
                    "Share recent project examples, quality samples, and professional references for verification.",
                },
                {
                  step: "4",
                  icon: "badge",
                  title: "Approval & Onboarding",
                  description:
                    "Upon approval, receive vendor credentials and access to our trade partnership portal.",
                },
              ].map((step, _index) => (
                <FadeInWhenVisible key={_index}>
                  <Card className="bg-gradient-to-br from-gray-50 to-white dark:from-gray-800 dark:to-gray-700 border border-gray-200 dark:border-gray-600 h-full text-center transition-all hover:shadow-lg">
                    <CardContent className="p-6">
                      <div className="flex justify-center items-center bg-brand-primary mb-4 mx-auto rounded-full w-16 h-16">
                        <MaterialIcon
                          icon={step.icon}
                          size="xl"
                          theme="military"
                          ariaLabel={`Step ${step.step}`}
                          className="text-white"
                        />
                      </div>
                      <div className="inline-block bg-brand-secondary/20 dark:bg-brand-secondary/30 mb-3 px-3 py-1 rounded-full">
                        <span className="font-bold text-brand-secondary dark:text-brand-secondary-light text-sm">
                          Step {step.step}
                        </span>
                      </div>
                      <h4 className="mb-3 font-bold text-gray-900 dark:text-white text-lg">
                        {step.title}
                      </h4>
                      <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
                        {step.description}
                      </p>
                    </CardContent>
                  </Card>
                </FadeInWhenVisible>
              ))}
            </div>
          </div>
        </section>

        {/* Call to Action - Join Our Trade Network */}
        <section className="bg-gradient-to-br from-brand-primary/5 dark:from-brand-primary/10 via-brand-primary/10 dark:via-brand-primary/20 to-brand-secondary/5 dark:to-brand-secondary/10 p-12 lg:p-16 xl:p-20 rounded-2xl">
          <FadeInWhenVisible>
            <div className="text-center">
              {/* Section Header - Military Construction Standard */}
              <div className="mb-16 sm:mb-20">
                {/* Icon with decorative lines */}
                <div className="flex items-center justify-center mb-8 gap-4">
                  <div className="h-1 w-16 bg-gradient-to-r from-transparent to-gray-300 dark:to-gray-600 rounded-full"></div>
                  <div className="relative">
                    <div className="absolute -inset-4 bg-gradient-to-br from-brand-primary/30 to-brand-primary-dark/30 blur-2xl rounded-full"></div>
                    <div className="relative bg-gradient-to-br from-brand-primary via-brand-primary-dark to-brand-primary-darker p-5 rounded-2xl shadow-2xl border-2 border-white/50 dark:border-gray-600">
                      <MaterialIcon
                        icon="diversity_3"
                        size="2xl"
                        className="text-white drop-shadow-lg"
                      />
                    </div>
                  </div>
                  <div className="h-1 w-16 bg-gradient-to-l from-transparent to-gray-300 dark:to-gray-600 rounded-full"></div>
                </div>

                {/* Two-line gradient heading */}
                <h2 className="mb-6 sm:mb-8 font-black text-gray-900 dark:text-white text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-relaxed tracking-tighter overflow-visible">
                  <span className="block mb-3 sm:mb-4 font-semibold text-gray-700 dark:text-gray-200 text-xl xs:text-2xl sm:text-3xl md:text-4xl lg:text-5xl tracking-tight overflow-visible py-1">
                    Join Our Trade
                  </span>
                  <span className="block bg-gradient-to-r from-brand-primary via-brand-secondary to-brand-primary bg-clip-text text-transparent font-black drop-shadow-sm overflow-visible py-2 pb-3 leading-normal">
                    Partnership Network
                  </span>
                </h2>

                {/* Description with colored keyword highlighting */}
                <p className="mx-auto mb-8 max-w-5xl font-light text-gray-700 dark:text-gray-300 text-base sm:text-lg md:text-xl lg:text-2xl leading-relaxed tracking-wide px-2">
                  Ready to{" "}
                  <span className="font-bold text-brand-primary dark:text-brand-primary-light">
                    grow your business
                  </span>{" "}
                  with a veteran-owned construction leader? We're actively
                  seeking{" "}
                  <span className="font-bold text-gray-900 dark:text-white">
                    reliable, skilled trade partners who value quality
                    workmanship, professional collaboration, and sustainable
                    business relationships
                  </span>
                  . Apply to become an approved vendor and access consistent
                  project opportunities.
                </p>
              </div>
              <div className="flex sm:flex-row flex-col justify-center gap-4">
                <Link href="/contact">
                  <Button
                    size="lg"
                    className="bg-brand-primary hover:bg-brand-primary-dark dark:bg-brand-primary dark:hover:bg-brand-primary-dark shadow-xl text-white"
                  >
                    <MaterialIcon icon="handshake" className="mr-2" />
                    Begin Partnership Application
                  </Button>
                </Link>
                <Link href="/projects">
                  <Button
                    size="lg"
                    className="bg-brand-secondary hover:bg-brand-secondary-dark dark:bg-brand-secondary dark:hover:bg-brand-secondary-dark shadow-xl text-black dark:text-black"
                  >
                    <MaterialIcon
                      icon="emoji_events"
                      size="sm"
                      theme="veteran"
                      ariaLabel="Portfolio"
                    />
                    View Our Portfolio
                  </Button>
                </Link>
              </div>
              <p className="mt-6 text-gray-500 dark:text-gray-400">
                <MaterialIcon
                  icon="call"
                  size="sm"
                  theme="military"
                  ariaLabel="Phone"
                  className="inline mr-2"
                />
                Trade Partnership Inquiries: (509) 308-6489 | 7:00 AM - 4:00 PM
                PST
              </p>
              <p className="text-gray-500 dark:text-gray-400">
                <MaterialIcon
                  icon="mark_email_read"
                  size="sm"
                  theme="military"
                  ariaLabel="Email"
                  className="inline mr-2"
                />
                office@mhc-gc.com
              </p>
            </div>
          </FadeInWhenVisible>
        </section>
      </div>
    </div>
  );
}
