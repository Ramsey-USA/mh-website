import { type Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui";
import { MaterialIcon } from "@/components/icons/MaterialIcon";
import { FadeInWhenVisible } from "@/components/animations/FramerMotionComponents";
import { Breadcrumb } from "@/components/navigation/Breadcrumb";
import { NextStepsSection } from "@/components/shared-sections";

export const metadata: Metadata = {
  title:
    "Frequently Asked Questions | MH Construction - Veteran-Owned Excellence",
  description:
    "Find answers to common questions about MH Construction's services, process, safety record, veteran benefits, and partnership approach. Learn about our 0.6 EMR safety record, open-book pricing, Design-Build vs Design-Bid-Build, PEMB buildings, Procore project management, and face-to-face consultation process.",
  keywords: [
    "construction FAQ",
    "construction management questions",
    "veteran-owned construction",
    "MH Construction questions",
    "construction process explained",
    "open-book pricing",
    "construction safety record",
    "0.6 EMR safety",
    "Pacific Northwest construction",
    "construction consultation",
    "licensed WA OR ID",
    "commercial construction FAQ",
    "construction project timeline",
    "Design-Build vs Design-Bid-Build",
    "Pre-Engineered Metal Buildings PEMB",
    "Pasco WA building permits",
    "Tri-Cities construction",
    "Procore construction management",
    "change orders construction",
    "site feasibility studies",
    "government construction projects",
  ],
  openGraph: {
    title: "FAQ - Your Construction Questions Answered | MH Construction",
    description:
      "Get answers about our veteran-owned construction services, partnership approach, safety excellence, and consultation process. Building for the Client, NOT the Dollar.",
    type: "website",
    locale: "en_US",
  },
};

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
          "We're built on a six-value professional foundation system: Professionalism, Thoroughness, Honesty, Integrity, Reliability, and Quality Craftsmanship—all culminating in Trust as our ultimate goal. As a veteran-owned company since January 2025, we combine military precision with partnership-driven construction management. Our philosophy is simple: Building for the Client, NOT the Dollar. We work WITH you, not FOR you, ensuring your vision guides every decision.",
      },
      {
        question: "Where are you licensed and what areas do you serve?",
        answer:
          "MH Construction is licensed in Washington, Oregon, and Idaho. We're headquartered in Pasco, WA (3111 N. Capital Ave., Pasco, WA 99301) and serve the entire Pacific Northwest region, with particular expertise in the Tri-Cities area (Pasco, Kennewick, and Richland).",
      },
      {
        question: "What types of projects do you specialize in?",
        answer:
          "We specialize in commercial, industrial, and medical facility construction management. Our core services include Master Planning & Pre-Construction, Procurement & Trade Partnership Management, Constructability & Budget Control, and Project Modularization. We also offer specialized services for tenant improvements, religious facility construction, and government projects.",
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
    icon: "handshake",
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
          "Regular communication is part of our Reliability value. You'll receive consistent progress updates, access to our team for questions, and systematic reporting at key project milestones. We believe you should never be left wondering what's happening with your project—transparency and accessibility are non-negotiable.",
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
          "We maintain an industry-leading 0.6 EMR (Experience Modification Rate)—40% better than the industry average of 1.0. We've earned multiple AGC-WA Top EMR Awards, hold OSHA VPP Star designation, and have maintained 3+ consecutive years without time-loss injuries. Our team is OSHA 30-Hour Certified, and safety excellence is a core part of our Quality Craftsmanship value.",
      },
      {
        question: "What quality standards do you follow?",
        answer:
          "Quality Craftsmanship is one of our six core values. We implement multiple quality control checkpoints throughout every project, use proven methods refined over 150+ years of combined experience, and build as if constructing for our own families. Our systematic approach includes detailed inspections, comprehensive documentation, and taking the time to do it right—never compromising standards.",
      },
      {
        question: "Do you have insurance and bonding?",
        answer:
          "Yes, absolutely. As part of our Professionalism value, we maintain comprehensive insurance coverage and bonding as required for all project types. We meet or exceed all federal, state, and local requirements for commercial construction. Full details are provided during the consultation process.",
      },
      {
        question: "What happens if something goes wrong?",
        answer:
          "Our Integrity value means taking responsibility. If issues arise, we address them immediately with honest communication and ethical solutions. We stand behind our work with comprehensive warranties and systematic problem-solving. Our reliability means you can count on us to make things right, even when challenges occur.",
      },
    ],
  },
  {
    id: "technology",
    title: "Technology & Innovation",
    icon: "computer",
    questions: [
      {
        question: "What is your AI-powered estimator?",
        answer:
          "Our Automated Estimator is a convenient planning tool available 24/7 for preliminary budget estimates. It uses data from 500+ completed regional projects to provide instant estimates. However, it's important to know this is an optional tool that enhances—not replaces—our face-to-face consultation process. Technology serves our relationships; it never replaces the personal touch.",
      },
      {
        question: "Do I have to use your automated tools?",
        answer:
          "Not at all! Our AI tools and 3D visualization are optional enhancements designed to help you prepare for our consultation, but they're never required. We believe the best projects start with personal, face-to-face conversations where we shake hands and build trust. The tools are there to serve you when convenient, but relationships always come first.",
      },
      {
        question: "Can I speak with a real person?",
        answer:
          "Always! You can call us at (509) 308-6489 or email office@mhc-gc.com anytime. Our General MH chatbot assistant is available 24/7 to help answer quick questions, but we prioritize personal communication. Face-to-face consultation is where real partnerships begin, and we're always ready to meet with you in person.",
      },
      {
        question: "What is the 3D Explorer?",
        answer:
          "Our 3D Explorer is an interactive visualization tool that helps you explore design possibilities and see your project in three dimensions before construction begins. Like our estimator, it's an optional tool that supports—but doesn't replace—the collaborative planning process we do together during consultation.",
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
          "We offer a 12% Combat Veteran Discount on qualifying projects, priority scheduling for all veterans, and service branch recognition throughout our process. As a veteran-owned company, we understand military values and honor those who served through tangible benefits and respectful service.",
      },
      {
        question: "How do I qualify for veteran discounts?",
        answer:
          "Simply provide proof of military service (DD-214 or VA card) during our initial consultation. Combat veterans receive our 12% discount, and all veterans receive priority scheduling. We're honored to serve those who served our nation.",
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
    icon: "engineering",
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
          "We are based in Pasco, WA (3111 N. Capital Ave) and serve the entire Tri-Cities region, including Kennewick, Richland, West Richland, Burbank, and Connell. We are also equipped to handle government and industrial projects near the Hanford Site.",
      },
      {
        question: "Is MH Construction a certified Veteran-Owned business?",
        answer:
          "Yes, MH Construction is a Veteran-Owned business founded by U.S. Army Veteran Jeremy Thamert. We operate with an 'Old School' mentality where your word is your bond, living by the slogan: 'Building for the Client, NOT the Dollar.'",
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
    icon: "groups",
    questions: [
      {
        question: "What does 'Client Partner' mean?",
        answer:
          "We use 'Client Partner' instead of just 'client' because we believe in true partnership—working WITH you, not FOR you. Your success is our success. This isn't just terminology; it's our operating philosophy reflected in collaborative decision-making, transparent communication, and shared commitment to your project's success.",
      },
      {
        question: "How do you select subcontractors and vendors?",
        answer:
          "We work with an approved network of Trade Partners who share our values and quality standards. Our Thoroughness means carefully vetting every subcontractor for quality, reliability, and safety. We maintain these relationships through fair treatment, timely payment, and mutual respect—the same Integrity we extend to our Client Partners.",
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
    icon: "payments",
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
 * FAQ Accordion Component
 */
function FAQItem({ question, answer }: { question: string; answer: string }) {
  return (
    <details className="group border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden hover:border-brand-primary/50 dark:hover:border-brand-primary-light/50 transition-colors duration-300">
      <summary className="flex items-center justify-between p-6 cursor-pointer bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors duration-200">
        <h3 className="text-lg font-bold text-gray-900 dark:text-white pr-4">
          {question}
        </h3>
        <MaterialIcon
          icon="expand_more"
          className="text-brand-primary dark:text-brand-primary-light flex-shrink-0 transform group-open:rotate-180 transition-transform duration-300"
        />
      </summary>
      <div className="p-6 pt-2 bg-gray-50 dark:bg-gray-800/50 border-t border-gray-200 dark:border-gray-700">
        <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
          {answer}
        </p>
      </div>
    </details>
  );
}

/**
 * FAQ Page Component
 */
export default function FAQPage() {
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
    <div className="bg-gradient-to-b from-white dark:from-gray-900 to-gray-50 dark:to-gray-800 min-h-screen">
      {/* JSON-LD Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-gray-900 via-brand-primary to-gray-900 pt-24 sm:pt-32 md:pt-40 lg:pt-48 pb-16 sm:pb-20 md:pb-24 lg:pb-32 text-white overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(189,146,100,0.2)_0%,transparent_50%)] dark:bg-[radial-gradient(circle_at_top_right,rgba(189,146,100,0.3)_0%,transparent_50%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(205,127,50,0.15)_0%,transparent_50%)] dark:bg-[radial-gradient(circle_at_bottom_left,rgba(205,127,50,0.25)_0%,transparent_50%)]"></div>
        <div className="top-20 right-10 absolute bg-brand-secondary/10 dark:bg-brand-secondary/20 blur-3xl rounded-full w-32 h-32 animate-pulse"></div>
        <div
          className="left-10 bottom-20 absolute bg-brand-primary/10 dark:bg-brand-primary/20 blur-3xl rounded-full w-40 h-40 animate-pulse"
          style={{ animationDelay: "1s" }}
        ></div>
        <div
          className="top-1/2 left-1/4 absolute bg-brand-secondary/5 dark:bg-brand-secondary/10 blur-3xl rounded-full w-24 h-24 animate-pulse"
          style={{ animationDelay: "0.5s" }}
        ></div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeInWhenVisible>
            <div className="text-center max-w-4xl mx-auto">
              {/* Icon */}
              <div className="mb-6 sm:mb-8 flex justify-center">
                <div className="relative">
                  <div className="absolute inset-0 bg-brand-secondary/30 dark:bg-brand-secondary/40 blur-xl rounded-full"></div>
                  <div className="relative rounded-2xl bg-gradient-to-br from-brand-secondary to-bronze-600 p-4 shadow-lg">
                    <MaterialIcon
                      icon="help"
                      size="2xl"
                      className="text-white"
                    />
                  </div>
                </div>
              </div>

              {/* Title */}
              <h1 className="mb-6 sm:mb-8 font-black text-white text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-tight tracking-tighter">
                <span className="block mb-3 sm:mb-4 font-semibold text-brand-secondary text-xl xs:text-2xl sm:text-3xl md:text-4xl lg:text-5xl tracking-tight">
                  Frequently Asked
                </span>
                <span className="block drop-shadow-lg">Questions</span>
              </h1>

              {/* Subtitle */}
              <p className="mb-8 sm:mb-10 md:mb-12 text-white/90 text-base sm:text-lg md:text-xl lg:text-2xl leading-relaxed max-w-3xl mx-auto">
                Your Questions, Honest Answers • Building for the Client, NOT
                the Dollar
              </p>

              {/* Quick CTA */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Link href="/booking">
                  <Button
                    size="lg"
                    className="bg-brand-secondary hover:bg-brand-secondary-dark text-white font-bold shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    <MaterialIcon icon="calendar_today" className="mr-2" />
                    Schedule Consultation
                  </Button>
                </Link>
                <Link href="/contact">
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-2 border-white text-white hover:bg-white/10 font-bold transition-all duration-300"
                  >
                    <MaterialIcon icon="phone" className="mr-2" />
                    Call (509) 308-6489
                  </Button>
                </Link>
              </div>
            </div>
          </FadeInWhenVisible>
        </div>
      </section>

      {/* Breadcrumb Navigation */}
      <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "FAQ" }]} />

      {/* Introduction Section */}
      <section className="py-12 sm:py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <FadeInWhenVisible>
              <p className="text-lg sm:text-xl text-gray-700 dark:text-gray-300 leading-relaxed mb-8">
                Welcome to our FAQ page. We believe in transparency, honesty,
                and clear communication—core values that guide everything we do.
                Below you'll find answers to common questions about our
                services, process, and partnership approach. Can't find what
                you're looking for? We're always available for a conversation.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                  <MaterialIcon
                    icon="verified"
                    className="text-brand-primary"
                  />
                  <span>Veteran-Owned Since Jan 2025</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                  <MaterialIcon icon="shield" className="text-brand-primary" />
                  <span>0.6 EMR Safety Record</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                  <MaterialIcon
                    icon="location_on"
                    className="text-brand-primary"
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
          className="relative bg-gradient-to-b from-white via-gray-50 to-white dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 py-12 sm:py-16 lg:py-24 overflow-hidden"
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
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-5xl mx-auto">
              <div className="mb-8 sm:mb-12">
                <FadeInWhenVisible delay={categoryIndex * 0.1}>
                  <div className="flex items-center gap-4 mb-6">
                    <div className="relative">
                      <div className="absolute inset-0 bg-brand-primary/20 dark:bg-brand-primary/30 blur-xl rounded-full"></div>
                      <div className="relative rounded-xl bg-gradient-to-br from-brand-primary to-brand-primary-dark p-3 shadow-md">
                        <MaterialIcon
                          icon={category.icon}
                          size="xl"
                          className="text-white"
                        />
                      </div>
                    </div>
                    <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-gray-100">
                      {category.title}
                    </h2>
                  </div>
                </FadeInWhenVisible>

                <div className="space-y-4">
                  {category.questions.map((q, qIndex) => (
                    <FadeInWhenVisible key={qIndex} delay={qIndex * 0.05}>
                      <FAQItem question={q.question} answer={q.answer} />
                    </FadeInWhenVisible>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      ))}

      {/* Still Have Questions CTA */}
      <section className="relative bg-gradient-to-b from-white via-gray-50 to-white dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 py-12 sm:py-16 lg:py-24 overflow-hidden">
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
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeInWhenVisible>
            <div className="max-w-4xl mx-auto text-center">
              <div className="mb-6 flex justify-center">
                <div className="relative">
                  <div className="absolute inset-0 bg-brand-primary/20 dark:bg-brand-primary/30 blur-xl rounded-full"></div>
                  <div className="relative rounded-2xl bg-gradient-to-br from-brand-primary to-brand-primary-dark p-4 shadow-lg">
                    <MaterialIcon
                      icon="support_agent"
                      size="2xl"
                      className="text-white"
                    />
                  </div>
                </div>
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-gray-900 dark:text-gray-100 mb-6">
                <span className="block drop-shadow-sm">
                  Still Have Questions?
                </span>
              </h2>
              <p className="text-lg sm:text-xl text-gray-700 dark:text-gray-300 leading-relaxed mb-8">
                We're here to help. Our team is available for face-to-face
                consultation where we can discuss your specific needs, answer
                any questions, and start building a partnership based on trust
                and transparency.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Link href="/booking">
                  <Button
                    size="lg"
                    className="bg-brand-primary hover:bg-brand-primary-dark text-white font-bold shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    <MaterialIcon icon="handshake" className="mr-2" />
                    Schedule Face-to-Face Consultation
                  </Button>
                </Link>
                <Link href="/contact">
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-2 border-brand-primary text-brand-primary hover:bg-brand-primary/10 dark:border-brand-primary-light dark:text-brand-primary-light dark:hover:bg-brand-primary-light/10 font-bold transition-all duration-300"
                  >
                    <MaterialIcon icon="chat" className="mr-2" />
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
  );
}
