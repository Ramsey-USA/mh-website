"use client";

import Link from "next/link";
import { Button } from "@/components/ui";
import { MaterialIcon } from "@/components/icons/MaterialIcon";
import {
  FadeInWhenVisible,
  StaggeredFadeIn,
} from "@/components/animations/FramerMotionComponents";
import { Breadcrumb } from "@/components/navigation/Breadcrumb";
import { PageNavigation } from "@/components/navigation/PageNavigation";
import { navigationConfigs } from "@/components/navigation/navigationConfigs";
import { NextStepsSection } from "@/components/shared-sections";
import {
  generateBreadcrumbSchema,
  breadcrumbPatterns,
} from "@/lib/seo/breadcrumb-schema";
import { generateHowToSchema } from "@/lib/seo/howto-schema";
import { StructuredData } from "@/components/seo/seo-meta";
import { getFAQSEO } from "@/lib/seo/page-seo-utils";
import {
  DiagonalStripePattern,
  BrandColorBlobs,
} from "@/components/ui/backgrounds";

// SEO data moved to component for client-side rendering

// FAQ categories and data
const faqCategories = [
  {
    id: "general",
    title: "General Information",
    icon: "info",
    questions: [
      {
        question:
          "What makes MH Construction different from other construction companies?",
        answer:
          "We're built on a four-value professional foundation system: Honesty, Integrity, Professionalism, and Thoroughness—all culminating in Trust as our ultimate goal. As a veteran-owned company since January 2025, we combine military precision with partnership-driven construction management. Our philosophy is simple: Building projects for the client, NOT the dollar. We work WITH you, not FOR you, ensuring your vision guides every decision.",
      },
      {
        question: "Where are you licensed and what areas do you serve?",
        answer:
          "MH Construction is licensed in Washington, Oregon, and Idaho. We're headquartered in Pasco, WA (3111 N. Capitol Ave., Pasco, WA 99301) and serve the entire Pacific Northwest region, with particular expertise in the Tri-Cities area (Pasco, Kennewick, and Richland).",
      },
      {
        question: "What types of projects do you specialize in?",
        answer:
          "We specialize in commercial, industrial, and medical facility construction management. Our core services include Master Planning & Pre-Construction, Procurement & Ally Management, Constructability & Budget Control, and Project Modularization. We also offer specialized services for tenant improvements, religious facility construction, and government projects.",
      },
      {
        question: "Are you really veteran-owned?",
        answer:
          "Yes! MH Construction has been veteran-owned since January 2025, led by Army veteran leadership. Our military background brings discipline, attention to detail, and a commitment to excellence to every project. We understand the value of keeping promises and completing missions—values that directly translate to construction excellence.",
      },
    ],
  },
  {
    id: "process",
    title: "Process & Partnership",
    icon: "diversity_3",
    questions: [
      {
        question: "How does your consultation process work?",
        answer:
          "We believe in face-to-face consultation where trust begins. Our process starts with a personal, on-site assessment where we meet you, understand your vision, and provide honest, transparent guidance. We offer priority scheduling for veterans and ensure you're never left wondering what's happening with your project. You control it, we manage it—with full visibility into every decision.",
      },
      {
        question: "What is 'open-book pricing'?",
        answer:
          "Open-book pricing means complete transparency—no hidden costs, no surprises. You see exactly where your investment goes with detailed cost breakdowns for materials, labor, and every aspect of your project. This honest approach is part of our core value of Honesty and ensures you can make informed decisions throughout the project.",
      },
      {
        question: "How long does a typical project take?",
        answer:
          "Project timelines vary based on scope, complexity, and your specific needs. During our initial consultation, we provide realistic timelines based on thorough planning and our 150+ years of combined experience. We're committed to meeting deadlines through reliable, military-honed discipline. We'll work WITH you to establish a timeline that balances quality, efficiency, and your business needs.",
      },
      {
        question: "Can I make changes during the project?",
        answer:
          "Absolutely. Your vision guides our precision, and we understand that needs can evolve. Any changes are handled through transparent communication with immediate notification of cost and timeline impacts. Our thoroughness ensures that modifications are properly evaluated, documented, and executed without compromising quality or safety.",
      },
      {
        question: "How do you communicate project updates?",
        answer:
          "Regular communication is part of our Partnership value. You'll receive consistent progress updates, access to our team for questions, and systematic reporting at key project milestones. We believe you should never be left wondering what's happening with your project—transparency and accessibility are non-negotiable.",
      },
    ],
  },
  {
    id: "safety",
    title: "Safety & Quality",
    icon: "verified_user",
    questions: [
      {
        question: "What is your safety record?",
        answer:
          "We maintain an industry-leading 0.64 EMR (Experience Modification Rate)—40% better than the industry average of 1.0. We've earned multiple AGC-WA Top EMR Awards, hold OSHA VPP Star designation, and have maintained 3+ consecutive years without time-loss injuries. Our team is OSHA 30-Hour Certified, and safety excellence is a core part of our Professionalism value.",
      },
      {
        question: "What quality standards do you follow?",
        answer:
          "Quality is central to our core values of Professionalism and Thoroughness. We implement multiple quality control checkpoints throughout every project, use proven methods refined over 150+ years of combined experience, and build as if constructing for our own families. Our systematic approach includes detailed inspections, comprehensive documentation, and taking the time to do it right—never compromising standards.",
      },
      {
        question: "Do you have insurance and bonding?",
        answer:
          "Yes, absolutely. As part of our Professionalism value, we maintain comprehensive insurance coverage and bonding as required for all project types. We meet or exceed all federal, state, and local requirements for commercial construction. Full details are provided during the consultation process.",
      },
      {
        question: "What happens if something goes wrong?",
        answer:
          "Our Integrity value means taking responsibility. If issues arise, we address them immediately with honest communication and ethical solutions. We stand behind our work with comprehensive warranties and systematic problem-solving. Our partnership approach means you can count on us to make things right, even when challenges occur.",
      },
    ],
  },
  {
    id: "technology",
    title: "Communication & Support",
    icon: "campaign",
    questions: [
      {
        question: "Can I speak with a real person?",
        answer:
          "Always! You can call us at (509) 308-6489 or email office@mhc-gc.com anytime. Our General MH chatbot assistant is available 24/7 to help answer quick questions, but we prioritize personal communication. Face-to-face consultation is where real partnerships begin, and we're always ready to meet with you in person.",
      },
      {
        question: "How do I schedule a consultation?",
        answer:
          "Getting started is easy! You can call us at (509) 308-6489, email office@mhc-gc.com, or visit our Contact page to submit a request. We offer free consultations where we meet face-to-face to discuss your project, review your needs, and develop a custom plan together. This personal approach is how we build lasting partnerships.",
      },
    ],
  },
  {
    id: "veterans",
    title: "Veteran Benefits & Services",
    icon: "military_tech",
    questions: [
      {
        question: "What veteran benefits do you offer?",
        answer:
          "We offer a Combat Veteran Discount at the Ready on qualifying projects, priority scheduling for all veterans, and service branch recognition throughout our process. As a veteran-owned company, we understand military values and honor those who served through tangible benefits and respectful service.",
      },
      {
        question: "How do I qualify for veteran discounts?",
        answer:
          "Simply provide proof of military service (DD-214 or VA card) during our initial consultation. Combat veterans receive our discount at the ready, and all veterans receive priority scheduling. We're honored to serve those who served our nation.",
      },
      {
        question: "Do you work on government projects?",
        answer:
          "Yes. We have extensive experience with government contracts and understand federal compliance requirements. Our mission-focused approach, military precision, and regulatory expertise make us well-suited for government facility projects. We're compliance-driven and familiar with all necessary protocols.",
      },
      {
        question: "Can you coordinate with VA benefits?",
        answer:
          "While we don't directly process VA benefits, we have experience working with veterans using VA programs and can coordinate documentation and timing to support your benefit applications. Our veteran ownership means we understand the process and can help navigate requirements.",
      },
    ],
  },
  {
    id: "technical",
    title: "Technical & Project Management",
    icon: "gps_fixed",
    questions: [
      {
        question:
          "What is the typical timeline for getting a commercial building permit in Pasco, WA?",
        answer:
          "While timelines vary by project complexity, the City of Pasco Development Services typically targets a 20-business day plan review process for initial commercial submittals. At MH Construction, we handle the permitting logistics to ensure all documentation is accurate to minimize delays.",
      },
      {
        question:
          "Do you handle Pre-Engineered Metal Buildings (PEMB) for industrial projects?",
        answer:
          "Yes, MH Construction specializes in Pre-Engineered Metal Buildings (PEMB). These are ideal for industrial facilities and warehouses in the Tri-Cities area as they are often 30-50% faster to erect and more cost-effective than traditional steel structures.",
      },
      {
        question:
          "What is the difference between Design-Build and Design-Bid-Build?",
        answer:
          "In a Design-Build contract, MH Construction manages both the design (architects/engineers) and construction under a single contract, which streamlines communication and reduces change orders. In Design-Bid-Build, the client hires an architect first to create plans, and then contractors bid on those specific plans.",
      },
      {
        question: "What is MH Construction's service area?",
        answer:
          "We are based in Pasco, WA (3111 N. Capitol Ave) and serve the entire Tri-Cities region, including Kennewick, Richland, West Richland, Burbank, and Connell. We are also equipped to handle government and industrial projects near the Hanford Site.",
      },
      {
        question: "Is MH Construction a certified Veteran-Owned business?",
        answer:
          "Yes, MH Construction is a Veteran-Owned business founded by U.S. Army Veteran Jeremy Thamert. We operate with an 'Old School' mentality where your word is your bond, living by the slogan: 'Building projects for the client, NOT the dollar.'",
      },
      {
        question:
          "Do you bid on government or public works projects in Washington State?",
        answer:
          "Yes. We are experienced in government contracting and are fully capable of managing prevailing wage requirements, certified payroll, and the strict safety compliance (OSHA/WISHA) required for public works and federal projects.",
      },
      {
        question: "Who supervises the job site daily?",
        answer:
          "Every project is assigned a dedicated Superintendent to oversee daily operations, safety, and quality control. Our leadership team, including Vice President Arnold Garcia, ensures that all projects utilize professional management tools like Procore for real-time oversight.",
      },
      {
        question:
          "How do you handle Change Orders during a commercial project?",
        answer:
          "We prioritize transparency. Utilizing Procore construction management software, we document every RFI and potential cost impact immediately. This ensures clients are never surprised by costs and have full visibility into the budget at all times.",
      },
      {
        question:
          "Can you help with site selection and feasibility studies in the Tri-Cities?",
        answer:
          "Yes. We assist clients in the pre-construction phase by evaluating land for utility access, zoning suitability (Industrial vs. Commercial), and soil conditions before you make a purchase, ensuring the site is viable for your vision.",
      },
    ],
  },
  {
    id: "partnership",
    title: "Working Together",
    icon: "diversity_3",
    questions: [
      {
        question: "What does 'Client Partner' mean?",
        answer:
          "We use 'Client Partner' instead of just 'client' because we believe in true partnership—working WITH you, not FOR you. Your success is our success. This isn't just terminology; it's our operating philosophy reflected in collaborative decision-making, transparent communication, and shared commitment to your project's success.",
      },
      {
        question: "How do you select Allies and vendors?",
        answer:
          "We work with an approved network of Allies who share our values and quality standards. Our Thoroughness means carefully vetting every Ally for quality, reliability, and safety. We maintain these relationships through fair treatment, timely payment, and mutual respect—the same Integrity we extend to our clients.",
      },
      {
        question: "Can I use my own subcontractors?",
        answer:
          "We're open to discussing this during consultation. Your vision guides our approach, and we want to work WITH you in ways that serve your project best. We'll evaluate how your preferred subcontractors fit with our quality, safety, and coordination requirements while maintaining the project's integrity.",
      },
      {
        question: "What if we don't see eye-to-eye on something?",
        answer:
          "Honest communication is one of our core values. If disagreements arise, we address them through transparent dialogue, present options clearly, and work collaboratively toward solutions. Our Integrity means making decisions that benefit you, not just our bottom line. The partnership succeeds when both parties are heard and respected.",
      },
    ],
  },
  {
    id: "financial",
    title: "Pricing & Payment",
    icon: "description",
    questions: [
      {
        question: "How does your pricing work?",
        answer:
          "We provide transparent, open-book pricing with detailed breakdowns showing exactly where your investment goes. You'll see costs for materials, labor, equipment, and all project elements. Our Honesty value means no hidden fees—just straightforward pricing you can trust. Final costs are determined during consultation after thoroughly understanding your project scope.",
      },
      {
        question: "Do you require a deposit?",
        answer:
          "Yes, typically we require a deposit to begin work, with the amount depending on project scope and type. Payment terms and schedules are discussed transparently during consultation and formalized in our contract. All financial terms are clear before work begins—no surprises.",
      },
      {
        question: "What payment methods do you accept?",
        answer:
          "We accept various payment methods including checks, ACH transfers, and credit cards for certain payment types. Specific payment terms and methods are detailed in your project contract. We're flexible and work to accommodate your business processes while maintaining professional financial practices.",
      },
      {
        question: "Are there any hidden costs I should know about?",
        answer:
          "No. Our commitment to Honesty means complete transparency—what you see is what you pay. Any potential additional costs (like unforeseen conditions discovered during work) are communicated immediately with detailed explanations and your approval required before proceeding. Open-book pricing means exactly that: open books.",
      },
    ],
  },
];

/**
 * FAQ Accordion Component - Modern Card Design
 */
function FAQItem({ question, answer }: { question: string; answer: string }) {
  return (
    <details className="group relative">
      {/* Animated Border Glow */}
      <div className="absolute -inset-2 bg-gradient-to-br from-brand-primary/40 to-brand-primary-dark/40 rounded-2xl opacity-0 group-hover:opacity-100 blur-xl transition-all duration-500"></div>

      <div className="relative border-2 border-gray-200 dark:border-gray-700 group-hover:border-transparent rounded-xl overflow-hidden shadow-lg group-hover:shadow-2xl transition-all duration-300">
        {/* Top Accent Bar */}
        <div className="h-1 bg-gradient-to-r from-brand-primary via-brand-primary-dark to-brand-primary-darker group-open:h-2 transition-all duration-300"></div>

        <summary className="flex items-center justify-between p-6 cursor-pointer bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors duration-200">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white pr-4">
            {question}
          </h3>
          <div className="relative inline-block flex-shrink-0">
            <div className="absolute -inset-1 bg-brand-primary/20 dark:bg-brand-primary/30 blur-md rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="relative rounded-lg bg-gradient-to-br from-brand-primary to-brand-primary-dark p-2 group-hover:scale-110 transition-transform duration-300">
              <MaterialIcon
                icon="expand_more"
                className="text-white transform group-open:rotate-180 transition-transform duration-300"
                size="md"
                ariaLabel="Expand answer"
              />
            </div>
          </div>
        </summary>
        <div className="p-6 pt-2 bg-gray-50 dark:bg-gray-800/50 border-t border-gray-200 dark:border-gray-700">
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-base">
            {answer}
          </p>
        </div>
      </div>
    </details>
  );
}

/**
 * FAQ Page Component
 */
export default function FAQPage() {
  // Get enhanced SEO data for FAQ page
  const faqSEO = getFAQSEO();

  // Structured data for SEO (FAQ Schema)
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqCategories.flatMap((category) =>
      category.questions.map((q) => ({
        "@type": "Question",
        name: q.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: q.answer,
        },
      })),
    ),
  };

  return (
    <>
      {/* SEO Meta Tags */}

      {/* Structured Data */}
      {faqSEO.schemas && faqSEO.schemas.length > 0 && (
        <StructuredData data={faqSEO.schemas} />
      )}

      <div className="bg-white dark:bg-gray-900 min-h-screen">
        {/* Breadcrumb Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(
              generateBreadcrumbSchema([
                ...breadcrumbPatterns.services,
                { name: "FAQ", url: "https://www.mhc-gc.com/faq" },
              ]),
            ),
          }}
        />

        {/* HowTo Schema - Construction Process */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(
              generateHowToSchema({
                name: "How to Work with MH Construction",
                description:
                  "Step-by-step guide to our partnership-driven construction process from consultation to project completion",
                totalTime: "P30D",
                steps: [
                  {
                    name: "Discovery Phase",
                    text: "Initial free consultation, site assessment, needs analysis, and budget discussion",
                  },
                  {
                    name: "Planning Phase",
                    text: "Detailed proposal with open-book pricing, timeline development, and contract signing",
                  },
                  {
                    name: "Permitting Phase",
                    text: "Permit applications, code compliance review, and approval coordination",
                  },
                  {
                    name: "Construction Phase",
                    text: "Regular progress updates, photo documentation, quality inspections, and client walkthroughs",
                  },
                  {
                    name: "Completion Phase",
                    text: "Final inspection, punch list completion, warranty documentation, and ongoing support",
                  },
                ],
              }),
            ),
          }}
        />

        {/* FAQ Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />

        {/* Hero Section */}
        <section className="relative h-screen flex items-end justify-end text-white overflow-hidden">
          {/* Background - Dark gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-brand-primary to-gray-900">
            {/* Overlay for text readability */}
            <div className="absolute inset-0 bg-gradient-to-br from-brand-primary/30 via-gray-900/60 to-gray-900/80"></div>
          </div>

          {/* Header Text - Bottom Right */}
          <div className="relative z-30 mb-32 sm:mb-36 md:mb-40 lg:mb-44 mr-4 sm:mr-6 lg:mr-8 xl:mr-12 ml-auto max-w-2xl pointer-events-none pb-2">
            {/* Mission Icon */}
            <div className="flex justify-end mb-4">
              <div className="relative p-4 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm rounded-2xl border-2 border-white/30 shadow-2xl">
                <MaterialIcon
                  icon="help"
                  size="4xl"
                  className="text-white drop-shadow-lg"
                  ariaLabel="Frequently Asked Questions"
                />
              </div>
            </div>
            <h1 className="text-right text-base xs:text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-bold text-white drop-shadow-2xl leading-relaxed">
              <span className="block text-brand-secondary text-sm xs:text-base sm:text-lg md:text-xl lg:text-2xl mb-1">
                Intel Brief
              </span>
              <span className="block text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black mb-2">
                FAQ
              </span>
              <span className="block text-white/90 text-xs xs:text-sm sm:text-base md:text-lg lg:text-xl mb-3">
                Your Questions,
              </span>
              <span className="block text-xl xs:text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-black text-white mb-3">
                Our Honest Answers
              </span>
              <span className="block text-white/80 text-xs xs:text-sm sm:text-base md:text-lg">
                Building projects for the client,{" "}
                <span className="font-black italic text-brand-secondary">
                  NOT
                </span>{" "}
                the dollar
              </span>
            </h1>
          </div>

          {/* Page-Specific Navigation Bar */}
          <PageNavigation
            items={navigationConfigs.faq}
            className="absolute bottom-0 left-0 right-0"
          />
        </section>

        {/* Breadcrumb Navigation */}
        <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "FAQ" }]} />

        {/* Introduction Section */}
        <section className="relative bg-white dark:bg-gray-900 py-12 sm:py-16 lg:py-20 xl:py-24 overflow-hidden">
          <DiagonalStripePattern />
          <BrandColorBlobs />

          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center mb-16">
              <FadeInWhenVisible>
                <p className="text-lg sm:text-xl text-gray-700 dark:text-gray-300 leading-relaxed mb-8">
                  Welcome to our FAQ page. We believe in transparency, honesty,
                  and clear communication—core values that guide everything we
                  do. Below you'll find answers to common questions about our
                  services, process, and partnership approach. Can't find what
                  you're looking for? We're always available for a conversation.
                </p>
                <div className="flex flex-wrap justify-center gap-4">
                  <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                    <MaterialIcon
                      icon="verified"
                      className="text-brand-primary"
                      theme="veteran"
                      ariaLabel="Veteran-Owned"
                    />
                    <span>Veteran-Owned Since Jan 2025</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                    <MaterialIcon
                      icon="health_and_safety"
                      className="text-brand-primary"
                      theme="military"
                      ariaLabel="Safety Record"
                    />
                    <span>0.64 EMR Safety Record</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                    <MaterialIcon
                      icon="location_on"
                      className="text-brand-primary"
                      theme="military"
                      ariaLabel="Licensed States"
                    />
                    <span>Licensed: WA, OR, ID</span>
                  </div>
                </div>
              </FadeInWhenVisible>
            </div>
          </div>
        </section>

        {/* FAQ Categories */}
        {faqCategories.map((category, categoryIndex) => (
          <section
            key={category.id}
            id={category.id}
            className="relative bg-gray-50 dark:bg-gray-800 py-12 sm:py-16 lg:py-20 xl:py-24 overflow-hidden"
          >
            <DiagonalStripePattern />
            <BrandColorBlobs />
            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="max-w-5xl mx-auto">
                {/* Section Header - Military Construction Standard */}
                <div className="mb-12 sm:mb-16 text-center">
                  <FadeInWhenVisible delay={categoryIndex * 0.1}>
                    {/* Icon with decorative lines */}
                    <div className="flex items-center justify-center mb-6 gap-4">
                      <div className="h-1 w-12 bg-gradient-to-r from-transparent to-gray-300 dark:to-gray-600 rounded-full"></div>
                      <div className="relative">
                        <div className="absolute -inset-3 bg-gradient-to-br from-brand-primary/30 to-brand-primary-dark/30 blur-2xl rounded-full"></div>
                        <div className="relative bg-gradient-to-br from-brand-primary via-brand-primary-dark to-brand-primary-darker p-4 rounded-xl shadow-2xl border-2 border-white/50 dark:border-gray-600">
                          <MaterialIcon
                            icon={category.icon}
                            size="xl"
                            className="text-white drop-shadow-lg"
                          />
                        </div>
                      </div>
                      <div className="h-1 w-12 bg-gradient-to-l from-transparent to-gray-300 dark:to-gray-600 rounded-full"></div>
                    </div>

                    {/* Two-line gradient heading */}
                    <h2 className="mb-4 font-black text-gray-900 dark:text-white text-2xl xs:text-3xl sm:text-4xl md:text-5xl leading-relaxed tracking-tighter overflow-visible">
                      <span className="block bg-gradient-to-r from-brand-primary via-brand-secondary to-brand-primary bg-clip-text text-transparent font-black drop-shadow-sm overflow-visible py-2 leading-normal">
                        {category.title}
                      </span>
                    </h2>
                  </FadeInWhenVisible>

                  <StaggeredFadeIn className="space-y-4">
                    {category.questions.map((q, qIndex) => (
                      <FAQItem
                        key={qIndex}
                        question={q.question}
                        answer={q.answer}
                      />
                    ))}
                  </StaggeredFadeIn>
                </div>
              </div>
            </div>
          </section>
        ))}

        {/* Still Have Questions CTA */}
        <section className="relative bg-white dark:bg-gray-900 py-12 sm:py-16 lg:py-20 xl:py-24 overflow-hidden">
          <DiagonalStripePattern />
          <BrandColorBlobs />

          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <FadeInWhenVisible>
              <div className="max-w-4xl mx-auto text-center">
                {/* Icon with decorative lines */}
                <div className="flex items-center justify-center mb-6 gap-4">
                  <div className="h-1 w-16 bg-gradient-to-r from-transparent to-gray-300 dark:to-gray-600 rounded-full"></div>
                  <div className="relative">
                    <div className="absolute -inset-4 bg-gradient-to-br from-brand-secondary/30 to-bronze-600/30 blur-2xl rounded-full"></div>
                    <div className="relative bg-gradient-to-br from-brand-secondary via-bronze-700 to-bronze-800 p-5 rounded-2xl shadow-2xl border-2 border-white/50 dark:border-gray-600">
                      <MaterialIcon
                        icon="support_agent"
                        size="2xl"
                        className="text-white drop-shadow-lg"
                      />
                    </div>
                  </div>
                  <div className="h-1 w-16 bg-gradient-to-l from-transparent to-gray-300 dark:to-gray-600 rounded-full"></div>
                </div>

                {/* Two-line gradient heading */}
                <h2 className="mb-6 font-black text-gray-900 dark:text-white text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-relaxed tracking-tighter overflow-visible">
                  <span className="block mb-3 sm:mb-4 font-semibold text-gray-700 dark:text-gray-200 text-xl xs:text-2xl sm:text-3xl md:text-4xl lg:text-5xl tracking-tight overflow-visible py-1">
                    Still Have
                  </span>
                  <span className="block bg-gradient-to-r from-brand-primary via-brand-secondary to-brand-primary bg-clip-text text-transparent font-black drop-shadow-sm overflow-visible py-2 pb-3 leading-normal">
                    Questions?
                  </span>
                </h2>
                <p className="text-lg sm:text-xl text-gray-700 dark:text-gray-300 leading-relaxed mb-8">
                  We're here to help. Our team is available for face-to-face
                  consultation where we can discuss your specific needs, answer
                  any questions, and start building a partnership based on trust
                  and transparency.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                  <Link href="/contact">
                    <Button
                      size="lg"
                      className="bg-brand-primary hover:bg-brand-primary-dark text-white font-bold shadow-lg hover:shadow-xl transition-all duration-300"
                    >
                      <MaterialIcon
                        icon="diversity_3"
                        className="mr-2"
                        theme="military"
                        ariaLabel="Schedule Face-to-Face Consultation"
                      />
                      Schedule Face-to-Face Consultation
                    </Button>
                  </Link>
                  <Link href="/contact">
                    <Button
                      size="lg"
                      variant="outline"
                      className="border-2 border-brand-primary text-brand-primary hover:bg-brand-primary/10 dark:border-brand-primary-light dark:text-brand-primary-light dark:hover:bg-brand-primary-light/10 font-bold transition-all duration-300"
                    >
                      <MaterialIcon
                        icon="campaign"
                        className="mr-2"
                        theme="military"
                        ariaLabel="Contact Us"
                      />
                      Contact Us
                    </Button>
                  </Link>
                </div>
              </div>
            </FadeInWhenVisible>
          </div>
        </section>

        {/* Next Steps Section */}
        <NextStepsSection
          title="Ready to Start Your Project?"
          subtitle="Let's build something exceptional together"
        />
      </div>
    </>
  );
}
