import type { Metadata } from "next";
import Image from "next/image";
import { MaterialIcon } from "@/components/icons/MaterialIcon";
import { Breadcrumb } from "@/components/navigation/Breadcrumb";
import { PageNavigation } from "@/components/navigation/PageNavigation";
import { navigationConfigs } from "@/components/navigation/navigationConfigs";
import { StructuredData } from "@/components/seo/SeoMeta";
import { generateBreadcrumbSchema } from "@/lib/seo/breadcrumb-schema";
import { PageTrackingClient } from "@/components/analytics";
import { withGeoMetadata } from "@/lib/seo/geo-metadata";
import { PWAInstallCTA } from "@/components/pwa";

const SITE_URL = "https://www.mhc-gc.com";

export const metadata: Metadata = withGeoMetadata({
  title: "Safety Program | 0.64 EMR | AGC-WA Award | MH Construction Tri-State",
  description:
    "MH Construction's safety program — 0.64 EMR (40% better than industry average), OSHA VPP Star designation, AGC-WA Top EMR Award, and 50-section written safety program. Veteran-Owned Since January 2025. Tri-State licensed in WA, OR, and ID with Tri-Cities headquarters in Pasco, Richland, and Kennewick.",
  keywords: [
    "MH Construction safety culture",
    "zero incident culture construction",
    "construction safety Tri-State WA OR ID",
    "veteran-owned contractor safety",
    "0.64 EMR construction contractor",
    "AGC-WA Top EMR Award",
    "OSHA VPP Star contractor Washington",
    "construction safety Pasco WA",
    "construction safety Kennewick Richland",
    "written safety program construction",
    "OSHA 30 hour certified contractor",
    "safety record construction contractor",
    "Experience Modification Rate EMR",
    "construction accident prevention program",
    "safety accountability construction team",
    "job hazard analysis construction",
    "toolbox talks safety program",
    "WISHA compliant contractor Washington",
    "construction safety Yakima Spokane WA",
    "veteran-owned construction safety program",
  ],
  alternates: {
    canonical: `${SITE_URL}/safety`,
  },
  openGraph: {
    title: "Safety Program | 0.64 EMR, AGC-WA Award | MH Construction",
    description:
      "Safety is a value, not a rule. 0.64 EMR (40% below industry avg), OSHA VPP Star designation, AGC-WA Top EMR Award, and a 50-section written safety program. Veteran-Owned Since January 2025.",
    url: `${SITE_URL}/safety`,
    siteName: "MH Construction",
    type: "website",
    images: [
      {
        url: `${SITE_URL}/images/safety/safety-culture.webp`,
        width: 1200,
        height: 630,
        alt: "MH Construction — Safety Briefing on the Job Site",
      },
    ],
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    site: "@mhc_gc",
    creator: "@mhc_gc",
    title: "Safety Program | 0.64 EMR | MH Construction",
    description:
      "0.64 EMR — 40% better than industry average. OSHA VPP Star designation. AGC-WA Top EMR Award. Veteran-Owned Since January 2025.",
    images: [`${SITE_URL}/images/safety/safety-culture.webp`],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
});

const breadcrumbSchema = generateBreadcrumbSchema([
  { name: "Home", url: "https://www.mhc-gc.com" },
  { name: "Safety Program", url: "https://www.mhc-gc.com/safety" },
]);

const safetySchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "MH Construction Safety Program",
  description:
    "Safety program with 0.64 EMR (40% better than industry average), OSHA VPP Star designation, AGC-WA Top EMR Award, and a 50-section written safety program aligned with OSHA, AGC, WISHA, Oregon OSHA, and Idaho requirements.",
  provider: {
    "@type": "Organization",
    name: "MH Construction, Inc.",
    url: SITE_URL,
    address: {
      "@type": "PostalAddress",
      streetAddress: "3111 N Capitol Ave",
      addressLocality: "Pasco",
      addressRegion: "WA",
      postalCode: "99301",
      addressCountry: "US",
    },
    telephone: "+15093086489",
  },
  serviceType: "Construction Safety Management",
  areaServed: [
    "Tri-State (WA, OR, ID)",
    "Pasco WA",
    "Kennewick WA",
    "Richland WA",
    "Yakima WA",
    "Spokane WA",
    "Walla Walla WA",
  ],
  award: [
    "AGC-WA Top EMR Award — Multiple Consecutive Years",
    "0.64 Experience Modification Rate — 40% Below Industry Average",
    "OSHA VPP Star Designation",
  ],
  hasCredential: [
    {
      "@type": "EducationalOccupationalCredential",
      credentialCategory: "certification",
      name: "OSHA VPP Star Designation",
    },
    {
      "@type": "EducationalOccupationalCredential",
      credentialCategory: "certification",
      name: "OSHA 30-Hour Construction Certification",
    },
    {
      "@type": "EducationalOccupationalCredential",
      credentialCategory: "award",
      name: "AGC-WA Top EMR Award",
    },
  ],
};

const safetyFaqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What is MH Construction's EMR rating?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "MH Construction's Experience Modification Rate (EMR) is 0.64 — 40% better than the industry average of 1.0. This award-winning safety record has earned multiple consecutive AGC-WA Top EMR Awards and directly reflects our daily safety discipline.",
      },
    },
    {
      "@type": "Question",
      name: "Is MH Construction OSHA certified?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. MH Construction holds OSHA VPP Star designation — the highest level of workplace safety achievement in OSHA's Voluntary Protection Program. Our team is OSHA 30-Hour Construction certified and we maintain a comprehensive 50-section written safety program aligned with federal and state requirements.",
      },
    },
    {
      "@type": "Question",
      name: "What is MH Construction's written safety program?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "MH Construction maintains a 50-section written safety program (Revision 3, effective April 7, 2026) covering all OSHA-required construction safety standards. The program is aligned with OSHA 29 CFR 1926, AGC CSEA, WISHA (Washington), Oregon OSHA, and Idaho requirements. It is available for review by bonding agents, insurers, and Client Partners at mhc-gc.com/safety.",
      },
    },
    {
      "@type": "Question",
      name: "How does MH Construction maintain site safety daily?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "MH Construction's daily safety practices include toolbox talks before every shift, Job Hazard Analysis on every new scope, equipment inspections before every use, incident reporting for every event, weekly superintendent safety reviews, and peer recognition for safe behavior. Every team member holds stop-work authority.",
      },
    },
    {
      "@type": "Question",
      name: "Does MH Construction comply with Washington L&I requirements?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. MH Construction is fully compliant with OSHA, Washington L&I (WISHA), EPA, and all applicable federal and state regulatory requirements. We maintain comprehensive documentation, conduct regular audits, and verify compliance systematically on all job sites in Washington, Oregon, and Idaho.",
      },
    },
    {
      "@type": "Question",
      name: "What does veteran-owned mean for MH Construction's safety culture?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "MH Construction became Veteran-Owned in January 2025 under Army veteran Jeremy Thamert. Veteran leadership applies the military principle that consistent daily habits — not sporadic rules — are what keep people safe. This service-earned discipline is embedded in every toolbox talk, JHA, and site inspection we conduct.",
      },
    },
  ],
};

// ─── Data ─────────────────────────────────────────────────────────────────────

const CREDENTIALS = [
  {
    icon: "verified_user",
    title: "OSHA VPP Star Designation",
    body: "The highest level of workplace safety achievement in OSHA's Voluntary Protection Program — earned through demonstrated excellence in hazard prevention, management leadership, and worker involvement.",
    tag: "Elite Federal Recognition",
  },
  {
    icon: "workspace_premium",
    title: "AGC-WA Top EMR Award",
    body: "Multiple consecutive AGC-WA Top EMR Awards from the Associated General Contractors of Washington. This peer-recognized honor reflects sustained, verifiable safety performance across all job sites.",
    tag: "Industry-Recognized",
  },
  {
    icon: "school",
    title: "OSHA 30-Hour Certified Team",
    body: "Our leadership and field supervisors hold OSHA 30-Hour Construction certification — above the basic 10-hour standard. Comprehensive training in hazard recognition, fall protection, electrical safety, and more.",
    tag: "Team Certified",
  },
  {
    icon: "menu_book",
    title: "50-Section Written Safety Program",
    body: "MH Construction maintains a comprehensive written safety program (Revision 3, eff. April 7, 2026) covering all OSHA-required topics. Aligned with 29 CFR 1926, AGC CSEA, WISHA, Oregon OSHA, and Idaho requirements.",
    tag: "Rev 3 · April 2026",
  },
] as const;

const CREDENTIAL_BADGES = [
  {
    icon: "verified_user",
    title: "OSHA VPP Star",
    subtitle: "Voluntary Protection Program",
    color: "bg-brand-primary",
  },
  {
    icon: "workspace_premium",
    title: "AGC-WA Top EMR",
    subtitle: "Multiple Consecutive Years",
    color: "bg-brand-secondary",
  },
  {
    icon: "school",
    title: "OSHA 30-Hour",
    subtitle: "Team Certified",
    color: "bg-brand-primary-dark",
  },
  {
    icon: "gpp_good",
    title: "WISHA Compliant",
    subtitle: "Washington L&I",
    color: "bg-slate-700",
  },
  {
    icon: "shield",
    title: "0.64 EMR Rating",
    subtitle: "40% Below Industry Avg",
    color: "bg-brand-primary",
  },
  {
    icon: "fact_check",
    title: "AGC CSEA Aligned",
    subtitle: "Prequalification Ready",
    color: "bg-brand-secondary",
  },
] as const;

const COMMITMENTS = [
  {
    icon: "shield",
    title: "Every Worker Goes Home Safe",
    body: "No project, deadline, or dollar amount is worth a preventable injury. Every decision on every job site is made with that standard first.",
  },
  {
    icon: "groups",
    title: "Personal Accountability",
    body: "Safety isn't enforced top-down. Every team member — superintendent to laborer — owns their environment and looks out for the person next to them.",
  },
  {
    icon: "military_tech",
    title: "Service-Earned Discipline",
    body: "Our veteran leadership brought a simple truth from the military: consistent habits, not sporadic rules, are what keep people alive. That discipline lives on every job site.",
  },
  {
    icon: "visibility",
    title: "Speak Up, Every Time",
    body: "A culture where unsafe conditions are reported — not ignored — is a culture that improves. We have zero tolerance for silence on safety concerns.",
  },
] as const;

const HABITS = [
  { icon: "checklist", label: "Daily toolbox talks before every shift" },
  { icon: "search", label: "Job Hazard Analysis on every new scope" },
  { icon: "healing", label: "Incident reporting — every event, every time" },
  { icon: "build", label: "Equipment inspections before every use" },
  { icon: "record_voice_over", label: "Weekly superintendent safety reviews" },
  { icon: "emoji_events", label: "Peer recognition for safe behavior" },
] as const;

const STATS = [
  {
    value: "0.64",
    label: "EMR Rating",
    sub: "40% below industry average of 1.0",
    icon: "trending_down",
  },
  {
    value: "AGC-WA",
    label: "Top EMR Award",
    sub: "Multiple consecutive years",
    icon: "workspace_premium",
  },
  {
    value: "15+",
    label: "Years",
    sub: "Building a safety-first culture since 2010",
    icon: "history",
  },
  {
    value: "50",
    label: "Program Sections",
    sub: "Comprehensive written safety program",
    icon: "menu_book",
  },
] as const;

const COMPLIANCE_ITEMS = [
  {
    icon: "gpp_good",
    title: "OSHA 29 CFR 1926",
    body: "Full compliance with federal construction safety standards — fall protection, scaffolding, excavation, electrical, personal protective equipment, and all applicable subparts.",
  },
  {
    icon: "account_balance",
    title: "Washington L&I (WISHA)",
    body: "Complete alignment with Washington Industrial Safety & Health Act requirements. Regular L&I audits, certified payroll processes, and prevailing wage compliance on all public sector projects.",
  },
  {
    icon: "eco",
    title: "EPA & Environmental",
    body: "Adherence to EPA regulations governing construction site stormwater, hazardous materials handling, and environmental protection requirements in Washington, Oregon, and Idaho.",
  },
  {
    icon: "payments",
    title: "Prevailing Wage & Certified Payroll",
    body: "Systematic certified payroll processes and prevailing wage compliance protect public projects from violations, fines, and work stoppages — documented and auditable at every phase.",
  },
] as const;

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function SafetyPage() {
  return (
    <>
      <PageTrackingClient pageName="Safety Program" />
      <StructuredData
        data={[breadcrumbSchema, safetySchema, safetyFaqSchema]}
      />

      {/* Breadcrumb */}
      <div className="bg-slate-900 border-b border-slate-700">
        <div className="max-w-6xl mx-auto px-4 py-3">
          <Breadcrumb
            items={[{ label: "Home", href: "/" }, { label: "Safety Program" }]}
          />
        </div>
      </div>

      {/* ── Hero ── */}
      <section className="relative h-screen flex items-end justify-end text-white overflow-hidden">
        {/* Background image */}
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-brand-primary to-gray-900">
          <Image
            src="/images/safety/safety-culture.webp"
            alt="MH Construction safety briefing on the job site"
            fill
            className="object-cover opacity-30"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-br from-brand-primary/30 via-gray-900/60 to-gray-900/80" />
        </div>

        {/* Header Text — Bottom Right */}
        <div className="relative z-30 mb-32 sm:mb-36 md:mb-40 lg:mb-44 mr-4 sm:mr-6 lg:mr-8 xl:mr-12 ml-auto max-w-2xl pointer-events-none pb-2">
          <h1 className="text-right text-lg xs:text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-black text-white drop-shadow-2xl leading-tight tracking-tight">
            {/* Page Identity */}
            <span className="block text-brand-secondary text-sm xs:text-base sm:text-lg md:text-xl lg:text-2xl mb-1">
              Safety Program
            </span>
            {/* Page Mantra */}
            <span className="block text-brand-secondary text-xl sm:text-2xl md:text-3xl lg:text-4xl mb-4">
              0.64 EMR Safety Record, Verified
            </span>
            {/* Tagline */}
            <span className="block text-brand-secondary">
              40% Better Than Industry Average
            </span>
            <span className="block">|</span>
            <span className="block text-white/90">
              Verified credentials and documented compliance
            </span>
            <span className="block">|</span>
            <span className="block text-white/90">
              Building projects for the Client, NOT the Dollar
            </span>
          </h1>
        </div>

        {/* Page Navigation Bar */}
        <PageNavigation
          items={navigationConfigs.safety}
          className="absolute bottom-0 left-0 right-0"
        />
      </section>

      {/* ── Credentials ── */}
      <section id="credentials" className="bg-white dark:bg-gray-900 py-20">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-14">
            <h2 className="mb-4 sm:mb-6 font-black text-gray-900 dark:text-gray-100 text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-relaxed tracking-tighter overflow-visible">
              <span className="block mb-2 sm:mb-3 font-semibold text-gray-700 dark:text-gray-200 text-xl xs:text-2xl sm:text-3xl md:text-4xl lg:text-5xl tracking-tight overflow-visible py-1">
                Industry-Recognized
              </span>
              <span className="block bg-gradient-to-r from-brand-primary via-brand-secondary to-brand-primary bg-clip-text text-transparent font-black drop-shadow-sm overflow-visible py-1 leading-normal">
                Safety Credentials
              </span>
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              OSHA VPP Star designation, AGC-WA Top EMR Awards, and a 50-section
              written safety program — verifiable proof our standards exceed
              requirements.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 gap-8">
            {CREDENTIALS.map((item) => (
              <div
                key={item.title}
                className="flex gap-5 p-6 rounded-2xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700"
              >
                <div className="shrink-0 w-12 h-12 rounded-xl bg-brand-primary/10 flex items-center justify-center">
                  <MaterialIcon
                    icon={item.icon}
                    size="md"
                    className="text-brand-primary"
                  />
                </div>
                <div>
                  <span className="inline-block text-xs font-bold uppercase tracking-widest text-brand-secondary mb-1">
                    {item.tag}
                  </span>
                  <h3 className="font-black text-gray-900 dark:text-white mb-2">
                    {item.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                    {item.body}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Credential Badges ── */}
      <section id="credential-badges" className="bg-slate-900 py-20">
        <div className="max-w-5xl mx-auto px-4">
          <div className="text-center mb-14">
            <h2 className="mb-4 sm:mb-6 font-black text-white text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-relaxed tracking-tighter overflow-visible">
              <span className="block mb-2 sm:mb-3 font-semibold text-white/70 text-xl xs:text-2xl sm:text-3xl md:text-4xl lg:text-5xl tracking-tight overflow-visible py-1">
                Verified &amp; Trusted
              </span>
              <span className="block bg-gradient-to-r from-brand-secondary via-white to-brand-secondary bg-clip-text text-transparent font-black drop-shadow-sm overflow-visible py-1 leading-normal">
                Safety Badges
              </span>
            </h2>
            <p className="text-lg text-white/70 max-w-xl mx-auto">
              Third-party verified credentials available to bonding agents,
              insurers, and Client Partners on request.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-6">
            {CREDENTIAL_BADGES.map((badge) => (
              <div
                key={badge.title}
                className="flex flex-col items-center gap-3 p-6 rounded-2xl bg-white/5 border border-white/10 text-center"
              >
                <div
                  className={`w-14 h-14 ${badge.color} rounded-2xl flex items-center justify-center`}
                >
                  <MaterialIcon
                    icon={badge.icon}
                    size="xl"
                    className="text-white"
                  />
                </div>
                <div>
                  <p className="font-black text-white text-sm">{badge.title}</p>
                  <p className="text-xs text-white/60 mt-0.5">
                    {badge.subtitle}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── MISH Program ── */}
      <section id="program" className="bg-white dark:bg-gray-900 py-20">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="inline-block text-xs font-bold uppercase tracking-widest text-brand-secondary mb-4">
                Rev 3 · Effective April 7, 2026
              </span>
              <h2 className="mb-4 sm:mb-6 font-black text-gray-900 dark:text-gray-100 text-3xl xs:text-4xl sm:text-5xl md:text-6xl leading-tight tracking-tighter overflow-visible">
                <span className="block mb-2 font-semibold text-gray-700 dark:text-gray-200 text-xl xs:text-2xl sm:text-3xl md:text-4xl tracking-tight py-1">
                  MH Construction
                </span>
                <span className="block bg-gradient-to-r from-brand-primary via-brand-secondary to-brand-primary bg-clip-text text-transparent font-black drop-shadow-sm py-1 leading-normal">
                  Written Safety Program
                </span>
              </h2>
              <p className="text-gray-600 dark:text-gray-400 text-lg leading-relaxed mb-6">
                Our 50-section written safety program covers every OSHA-required
                construction safety topic — from fall protection and excavation
                to electrical safety and hazardous materials. It is the
                operational foundation for every site we run.
              </p>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-8">
                Aligned with federal OSHA 29 CFR 1926, AGC CSEA prequalification
                standards, WISHA, Oregon OSHA, and Idaho requirements. Available
                in full to bonding agents, insurers, and Client Partners through
                our secure staff portal.
              </p>

              <div className="grid grid-cols-2 gap-4">
                {COMMITMENTS.map((item) => (
                  <div
                    key={item.title}
                    className="flex gap-3 p-4 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700"
                  >
                    <div className="shrink-0 w-9 h-9 rounded-lg bg-brand-primary/10 flex items-center justify-center">
                      <MaterialIcon
                        icon={item.icon}
                        size="sm"
                        className="text-brand-primary"
                      />
                    </div>
                    <div>
                      <p className="font-bold text-gray-900 dark:text-white text-sm">
                        {item.title}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5 leading-relaxed">
                        {item.body}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative rounded-3xl overflow-hidden aspect-square lg:aspect-auto lg:h-96 bg-slate-100 dark:bg-slate-800">
              <Image
                src="/images/safety/safety-culture.webp"
                alt="MH Construction safety program in action — job site briefing"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-primary/60 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                <p className="font-black text-xl">50 Sections</p>
                <p className="text-white/80 text-sm">
                  ~350 pages · All OSHA topics covered
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Safety Record ── */}
      <section id="performance" className="bg-brand-primary text-white py-20">
        <div className="max-w-5xl mx-auto px-4 text-center">
          <MaterialIcon
            icon="military_tech"
            size="xl"
            className="mx-auto mb-6 text-brand-accent"
          />
          <h2 className="mb-4 sm:mb-6 font-black text-white text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-relaxed tracking-tighter overflow-visible">
            <span className="block mb-2 sm:mb-3 font-semibold text-white/80 text-xl xs:text-2xl sm:text-3xl md:text-4xl lg:text-5xl tracking-tight overflow-visible py-1">
              The Numbers Speak
            </span>
            <span className="block bg-gradient-to-r from-brand-secondary via-white to-brand-secondary bg-clip-text text-transparent font-black drop-shadow-sm overflow-visible py-1 leading-normal">
              Safety Record
            </span>
          </h2>
          <p className="text-white/80 text-lg max-w-2xl mx-auto mb-14 leading-relaxed">
            Third-party verified. Peer-recognized. Our safety record is
            measurable, auditable, and consistently better than industry
            standard.
          </p>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {STATS.map((stat) => (
              <div
                key={stat.label}
                className="bg-white/10 rounded-2xl p-6 border border-white/20"
              >
                <MaterialIcon
                  icon={stat.icon}
                  size="lg"
                  className="mx-auto mb-3 text-brand-accent"
                />
                <div className="text-3xl sm:text-4xl font-black text-white mb-1">
                  {stat.value}
                </div>
                <div className="text-sm font-bold text-brand-accent mb-1">
                  {stat.label}
                </div>
                <div className="text-xs text-white/60 leading-snug">
                  {stat.sub}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Active Use (Evidence) ── */}
      <section id="evidence" className="bg-slate-50 dark:bg-gray-950 py-20">
        <div className="max-w-5xl mx-auto px-4">
          <div className="text-center mb-14">
            <h2 className="mb-4 sm:mb-6 font-black text-gray-900 dark:text-gray-100 text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-relaxed tracking-tighter overflow-visible">
              <span className="block mb-2 sm:mb-3 font-semibold text-gray-700 dark:text-gray-200 text-xl xs:text-2xl sm:text-3xl md:text-4xl lg:text-5xl tracking-tight overflow-visible py-1">
                Culture Is Built
              </span>
              <span className="block bg-gradient-to-r from-brand-primary via-brand-secondary to-brand-primary bg-clip-text text-transparent font-black drop-shadow-sm overflow-visible py-1 leading-normal">
                In Daily Habits
              </span>
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-xl mx-auto">
              Not in posters. Not in policy manuals. In what we actually do,
              every single shift.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {HABITS.map((h) => (
              <div
                key={h.label}
                className="flex items-center gap-3 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl px-5 py-4"
              >
                <MaterialIcon
                  icon={h.icon}
                  size="sm"
                  className="text-brand-primary shrink-0"
                />
                <span className="text-sm font-semibold text-gray-800 dark:text-gray-200">
                  {h.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Compliance ── */}
      <section id="compliance" className="bg-white dark:bg-gray-900 py-20">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-14">
            <h2 className="mb-4 sm:mb-6 font-black text-gray-900 dark:text-gray-100 text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-relaxed tracking-tighter overflow-visible">
              <span className="block mb-2 sm:mb-3 font-semibold text-gray-700 dark:text-gray-200 text-xl xs:text-2xl sm:text-3xl md:text-4xl lg:text-5xl tracking-tight overflow-visible py-1">
                Full Regulatory
              </span>
              <span className="block bg-gradient-to-r from-brand-primary via-brand-secondary to-brand-primary bg-clip-text text-transparent font-black drop-shadow-sm overflow-visible py-1 leading-normal">
                Compliance
              </span>
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Complete compliance with OSHA, L&I, EPA, and all applicable state
              regulations. Protects your project from violations, fines, and
              work stoppages.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 gap-8 mb-14">
            {COMPLIANCE_ITEMS.map((item) => (
              <div
                key={item.title}
                className="flex gap-5 p-6 rounded-2xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700"
              >
                <div className="shrink-0 w-12 h-12 rounded-xl bg-brand-primary/10 flex items-center justify-center">
                  <MaterialIcon
                    icon={item.icon}
                    size="md"
                    className="text-brand-primary"
                  />
                </div>
                <div>
                  <h3 className="font-black text-gray-900 dark:text-white mb-2">
                    {item.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                    {item.body}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Accountability callout */}
          <div className="rounded-2xl bg-brand-primary/5 dark:bg-brand-primary/10 border border-brand-primary/20 p-8 text-center">
            <MaterialIcon
              icon="military_tech"
              size="xl"
              className="mx-auto mb-4 text-brand-primary"
            />
            <h3 className="font-black text-gray-900 dark:text-white text-xl mb-3">
              Accountability Runs Both Ways
            </h3>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed">
              Our leadership holds itself to the same standard we hold the team.
              When something goes wrong, we fix the system — not just the
              person. That&apos;s the chain-of-command principle applied to
              safety: clear ownership, honest communication, and no one left
              behind.
            </p>
          </div>
        </div>
      </section>

      {/* ── Snapshots ── */}
      <section id="snapshots" className="bg-slate-900 py-20">
        <div className="max-w-4xl mx-auto px-4">
          <div className="rounded-3xl bg-white/5 border border-white/10 text-white p-10 md:p-14 text-center relative overflow-hidden">
            <div
              className="absolute inset-0 bg-gradient-to-br from-brand-primary/20 via-transparent to-brand-accent/10 pointer-events-none"
              aria-hidden="true"
            />

            <div className="relative z-10">
              <div className="w-16 h-16 bg-brand-primary/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <MaterialIcon
                  icon="smartphone"
                  size="xl"
                  className="text-brand-accent"
                />
              </div>

              <h2 className="mb-4 sm:mb-6 font-black text-white text-3xl xs:text-4xl sm:text-5xl md:text-6xl leading-relaxed tracking-tighter overflow-visible">
                <span className="block mb-2 sm:mb-3 font-semibold text-white/80 text-xl xs:text-2xl sm:text-3xl md:text-4xl tracking-tight overflow-visible py-1">
                  Safety Documentation
                </span>
                <span className="block bg-gradient-to-r from-brand-secondary via-white to-brand-secondary bg-clip-text text-transparent font-black drop-shadow-sm overflow-visible py-1 leading-normal">
                  Lives in the App
                </span>
              </h2>

              <p className="text-slate-300 text-lg max-w-xl mx-auto mb-4 leading-relaxed">
                The MH Construction app is our staff portal — safety manual,
                field forms, toolbox talks, incident reports, and employee
                handbook. Real-time snapshots of job-site safety compliance.
                Free to install. Role-gated for team members.
              </p>
              <p className="text-slate-400 text-sm max-w-md mx-auto mb-8">
                Bonding agents and insurers may request documentation access
                through our office at{" "}
                <a
                  href="mailto:office@mhc-gc.com"
                  className="text-brand-secondary hover:underline"
                >
                  office@mhc-gc.com
                </a>{" "}
                or{" "}
                <a
                  href="tel:+15093086489"
                  className="text-brand-secondary hover:underline"
                >
                  (509) 308-6489
                </a>
                .
              </p>

              <div className="flex flex-col items-center gap-4">
                <PWAInstallCTA className="w-full max-w-sm" variant="button" />
                <p className="text-sm text-slate-400">
                  Safety documentation and workflows available for authorized
                  team members.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Contact CTA ── */}
      <section className="bg-white dark:bg-gray-900 py-20">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <MaterialIcon
            icon="handshake"
            size="xl"
            className="mx-auto mb-6 text-brand-primary"
          />
          <h2 className="font-black text-gray-900 dark:text-white text-3xl sm:text-4xl mb-4 tracking-tight">
            Ready to Talk?
          </h2>
          <p className="text-gray-600 dark:text-gray-400 text-lg max-w-xl mx-auto mb-8 leading-relaxed">
            Our safety record is open for review. Call us directly or send an
            email — we&apos;ll walk you through our credentials and answer any
            questions about compliance, EMR, or our written safety program.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="tel:+15093086489"
              className="inline-flex items-center gap-2 bg-brand-primary hover:bg-brand-primary-dark text-white font-bold px-8 py-4 rounded-xl transition-colors text-lg"
            >
              <MaterialIcon icon="phone" size="md" className="text-white" />
              (509) 308-6489
            </a>
            <a
              href="/contact"
              className="inline-flex items-center gap-2 border-2 border-brand-primary text-brand-primary hover:bg-brand-primary hover:text-white font-bold px-8 py-4 rounded-xl transition-colors text-lg"
            >
              <MaterialIcon icon="mail" size="md" />
              Send a Message
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
