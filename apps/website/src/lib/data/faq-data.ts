/**
 * FAQ Data Configuration
 * Centralized FAQ content for the FAQ page, SEO schema, and reuse across the site.
 *
 * To add/edit questions: update the relevant category below.
 * Changes automatically propagate to the FAQ page, FAQPage schema, and HowTo schema.
 */

import { CONTENT_ICONS } from "@/lib/constants/navigation-icons";

export interface FAQQuestion {
  question: string;
  answer: string;
  /** Optional CTA link rendered below the answer text */
  link?: { text: string; href: string };
}

export interface FAQCategory {
  id: string;
  title: string;
  icon: string;
  metaDescription: string;
  ogImage: string;
  questions: FAQQuestion[];
}

export const faqCategories: FAQCategory[] = [
  {
    id: "general",
    title: "General Information",
    icon: CONTENT_ICONS.info,
    metaDescription:
      "Review MH Construction background, licensing, service footprint, and veteran-owned company basics in one FAQ hub.",
    ogImage: "/images/og/faq/general-information.webp",
    questions: [
      {
        question:
          "What makes MH Construction different from other construction companies?",
        answer:
          "We operate on four values: Honesty, Integrity, Professionalism, and Thoroughness. Founded in 2010 and Veteran-Owned, we deliver AG and winery projects, commercial tenant improvements, and municipal builds with Procore-led controls, plus specialty scope in pole buildings and door/hardware installation.",
      },
      {
        question: "Where are you licensed and what areas do you serve?",
        answer:
          "MH Construction is licensed in Washington, Oregon, and Idaho. We are headquartered in Pasco, WA and actively serve Tri-Cities, Yakima, Spokane, Walla Walla, Hermiston, Pendleton, Coeur d'Alene, and Omak.",
      },
      {
        question: "What types of projects do you specialize in?",
        answer:
          "We specialize in AG and winery facilities, commercial tenant improvements, and municipal builds. Core services include Procore project management, front-end scope planning, procurement coordination, and constructability controls. Specialty scopes include pole buildings, PEMB/post-frame applications, and door/hardware installation.",
      },
      {
        question: "Are you really Veteran-Owned?",
        answer:
          "Yes. MH Construction was founded in 2010 and became veteran-owned in January 2025. Veteran leadership brings structured planning, clear communication, and consistent follow-through.",
      },
      {
        question: "Are you BBB accredited?",
        answer:
          "Yes. MH Construction is Better Business Bureau accredited with an A+ rating (accredited April 7, 2026). That accreditation reflects our commitment to trust, transparency, and ethical business practices in every project stakeholder relationship.",
        link: {
          text: "View BBB Business Profile →",
          href: "https://www.bbb.org/us/wa/pasco/profile/construction/mh-construction-inc-1296-1000191036",
        },
      },
    ],
  },
  {
    id: "process",
    title: "Process & Partnership",
    icon: CONTENT_ICONS.diversity_3,
    metaDescription:
      "Understand how MH Construction handles consultations, open-book pricing, scheduling, changes, and project communication.",
    ogImage: "/images/og/faq/process-partnership.webp",
    questions: [
      {
        question: "How does your consultation process work?",
        answer:
          "We start with a direct consultation to review scope, site conditions, schedule targets, and budget constraints. You receive clear guidance, next steps, and visibility into key decisions.",
      },
      {
        question: "What is 'open-book pricing'?",
        answer:
          "Open-book pricing means visible cost breakdowns for labor, materials, and scope changes. There are no hidden fees, and you approve major cost-impact decisions before execution.",
      },
      {
        question: "How long does a typical project take?",
        answer:
          "Timelines vary by scope, complexity, permitting, and procurement conditions. During consultation, we provide a realistic schedule with milestone checkpoints and update it as conditions change.",
      },
      {
        question: "Can I make changes during the project?",
        answer:
          "Yes. Change requests are documented with cost and schedule impacts before approval, then tracked through execution and closeout.",
      },
      {
        question: "How do you communicate project updates?",
        answer:
          "We provide regular progress updates at milestone points, direct team communication, and documented decisions for scope, schedule, and risk controls.",
      },
    ],
  },
  {
    id: "safety",
    title: "Safety & Quality",
    icon: CONTENT_ICONS.verified_user,
    metaDescription:
      "Review MH Construction safety performance, quality standards, insurance coverage, and issue-resolution process.",
    ogImage: "/images/og/faq/safety-quality.webp",
    questions: [
      {
        question: "What is your safety record?",
        answer:
          "We maintain a 0.64 EMR, about 40% better than a 1.0 baseline, with AGC-WA safety recognition and OSHA VPP Star designation. Safety controls are enforced through pre-task planning and field accountability.",
      },
      {
        question: "What quality standards do you follow?",
        answer:
          "Quality is managed through phase-based checkpoints, documented inspections, and scope verification before turnover. We prioritize durable methods and disciplined closeout standards.",
      },
      {
        question: "Do you have insurance and bonding?",
        answer:
          "Yes, absolutely. As part of our Professionalism value, we maintain comprehensive insurance coverage and bonding as required for all project types. We meet or exceed all federal, state, and local requirements for commercial construction. Full details are provided during the consultation process.",
      },
      {
        question: "What happens if something goes wrong?",
        answer:
          "If issues arise, we escalate quickly, communicate clearly, and implement corrective action with documented follow-through. Warranty and closeout support remain active after handoff.",
      },
    ],
  },
  {
    id: "communication",
    title: "Communication & Support",
    icon: CONTENT_ICONS.campaign,
    metaDescription:
      "Find direct contact options, consultation steps, and support expectations for working with MH Construction.",
    ogImage: "/images/og/faq/communication-support.webp",
    questions: [
      {
        question: "Can I speak with a real person?",
        answer:
          "Always! You can call us at (509) 308-6489 or email office@mhc-gc.com anytime. We prioritize personal communication above all else. Face-to-face consultation is where real partnerships begin, and we're always ready to meet with you in person.",
      },
      {
        question: "How do I schedule a consultation?",
        answer:
          "Getting started is easy! You can call us at (509) 308-6489, email office@mhc-gc.com, or visit our Contact page to submit a request. We offer free consultations where we meet face-to-face to discuss your project, review your needs, and develop a custom plan together. This personal approach is how we build lasting partnerships.",
      },
      {
        question: "What is the Partnership Guide on your website?",
        answer:
          "Our Partnership Guide is a helpful assistant available 24/7 on every page of our site. It can help you learn about our services, connect with our Allies (Trade Partners), understand veteran benefits, and find the right contact information—all without waiting for business hours. It complements our face-to-face approach; for project-specific questions, estimates, or consultations, it will always direct you to call (509) 308-6489 or visit our Contact page.",
      },
    ],
  },
  {
    id: "veterans",
    title: "Veteran Benefits & Services",
    icon: CONTENT_ICONS.military_tech,
    metaDescription:
      "Learn how MH Construction supports veterans with priority scheduling, service-aware communication, and qualifying project discounts.",
    ogImage: "/images/og/faq/veteran-benefits-services.webp",
    questions: [
      {
        question: "What veteran benefits do you offer?",
        answer:
          "We offer a Combat Veteran Discount at the Ready on qualifying projects, priority scheduling for all veterans, and service branch recognition throughout our process. As a Veteran-Owned company, we understand military values and honor those who served through tangible benefits and respectful service.",
      },
      {
        question: "How do I qualify for veteran discounts?",
        answer:
          "Simply provide proof of military service (DD-214 or VA card) during our initial consultation. Combat veterans receive our discount at the ready, and all veterans receive priority scheduling. We're honored to serve those who served our nation.",
      },
      {
        question: "Are you certified as a Veteran-Owned business?",
        answer:
          "Yes. MH Construction is a certified Washington State Veteran Owned Business (WA DVA, certified in 2026). We are also actively pursuing additional federal and private-sector veteran certifications, including SBA VetCert, to expand procurement pathways for public and corporate projects.",
        link: {
          text: "Verify WA Veteran Owned Business status →",
          href: "https://pr-webs-vendor.des.wa.gov/VendorSearch.aspx",
        },
      },
      {
        question: "Do you work on government projects?",
        answer:
          "Yes. We have extensive experience with government contracts and municipal builds, and we understand federal compliance requirements. We are a dedicated supporter of the Build America, Buy America Act (BABAA), which is a federal domestic-content requirement for certain federally funded infrastructure projects. Our disciplined planning, Procore-based documentation, and regulatory expertise make us well-suited for public facility projects.",
        link: {
          text: "AGC BABAA Resource Hub →",
          href: "https://www.agc.org/babaa-resource-hub",
        },
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
    icon: CONTENT_ICONS.gps_fixed,
    metaDescription:
      "Review permitting, PEMB delivery, project management controls, and commercial construction logistics across the Tri-State footprint.",
    ogImage: "/images/og/faq/technical-project-management.webp",
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
          "Yes. MH Construction delivers pole buildings, including Pre-Engineered Metal Buildings (PEMB), for industrial and agricultural applications. These systems are often 30-50% faster to erect and more cost-effective than traditional steel structures across our Tri-State licensed footprint.",
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
          "We are headquartered in Pasco, WA (3111 N Capitol Ave) in the heart of the Tri-Cities — Pasco, Richland, and Kennewick — and are Tri-State licensed across Washington, Oregon, and Idaho. We serve communities throughout the Pacific Northwest including Yakima, Spokane, Walla Walla, Hermiston (OR), Pendleton (OR), Coeur d'Alene (ID), and Omak. Across this footprint, our focus is AG and winery communities, commercial tenant improvements, and municipal builds.",
      },
      {
        question: "Is MH Construction a certified Veteran-Owned business?",
        answer:
          "Yes. MH Construction has been Veteran-Owned since January 2025 and is certified as a Washington State Veteran Owned Business (WA DVA, 2026). Founded in 2010 by Mike Holstein, the company was purchased by U.S. Army veteran Jeremy Thamert. We operate with clear planning, direct communication, and accountable project follow-through.",
      },
      {
        question:
          "Do you bid on government or public works projects in Washington State?",
        answer:
          "Yes. We are experienced in government contracting and are fully capable of managing prevailing wage requirements, certified payroll, and the strict safety compliance (OSHA/WISHA) required for public works and federal projects. We support the Build America, Buy America Act (BABAA), a federal domestic-content requirement for certain federally funded infrastructure projects, and stay current through AGC guidance.",
        link: {
          text: "AGC BABAA Resource Hub →",
          href: "https://www.agc.org/babaa-resource-hub",
        },
      },
      {
        question: "Who supervises the job site daily?",
        answer:
          "Every project is assigned a dedicated Superintendent to oversee daily operations, safety, and quality control. Our leadership team, including Vice President Arnold Garcia, ensures each job is managed in Procore for real-time oversight, including tenant improvement coordination, municipal documentation, and door/hardware scope tracking.",
      },
      {
        question:
          "How do you handle Change Orders during a commercial project?",
        answer:
          "We prioritize transparency. Utilizing Procore construction management software, we document every RFI and potential cost impact immediately. This ensures clients are never surprised by costs and have full visibility into the budget at all times.",
      },
      {
        question:
          "Can you help with site selection and feasibility studies in the Tri-Cities and across your Tri-State footprint?",
        answer:
          "Yes. We assist clients in the pre-construction phase by evaluating land for utility access, zoning suitability (Industrial vs. Commercial), and soil conditions before you make a purchase, ensuring the site is viable for your vision.",
      },
    ],
  },
  {
    id: "partnership",
    title: "Working Together",
    icon: CONTENT_ICONS.diversity_3,
    metaDescription:
      "See how MH Construction approaches trade partners, client collaboration, subcontractor coordination, and post-closeout support.",
    ogImage: "/images/og/faq/working-together.webp",
    questions: [
      {
        question: "What does 'project stakeholder' mean?",
        answer:
          "We use 'project stakeholder' to reflect true partnership—owners, architects, consultants, and teams working together. Your success is our success. This isn't just terminology; it's our operating philosophy reflected in collaborative decision-making, transparent communication, and shared commitment to project outcomes.",
      },
      {
        question: "How do you select Allies and vendors?",
        answer:
          "We work with an approved network of Allies who share our values and quality standards. Our Thoroughness means carefully vetting every Ally for quality, reliability, and safety. We maintain these relationships through fair treatment, timely payment, and mutual respect—the same Integrity we extend to our clients.",
        link: { text: "Meet Our Ally Network →", href: "/allies" },
      },
      {
        question:
          "How do I join MH Construction's trade partner network as an Ally?",
        answer:
          "We're actively recruiting skilled trade professionals and specialty contractors across the Pacific Northwest. If you share our values—quality workmanship, honest communication, and safety-first execution—we'd like to hear from you. Visit our Allies page to learn about current openings and begin a partnership discussion with our team.",
        link: {
          text: "View Trade Partner Opportunities →",
          href: "/allies#apply",
        },
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
      {
        question: "How do you handle warranty and post-construction support?",
        answer:
          "Our partnership doesn't end at project completion. We provide comprehensive warranty documentation, conduct a thorough final walkthrough, and remain available for any post-construction needs. Our Thoroughness value means we stand behind every project with responsive follow-up and ongoing support—because trust is built on long-term commitment, not just project delivery.",
      },
    ],
  },
  {
    id: "financial",
    title: "Pricing & Payment",
    icon: "description",
    metaDescription:
      "Get clear answers on open-book pricing, deposits, payment expectations, and change-cost transparency.",
    ogImage: "/images/og/faq/pricing-payment.webp",
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

/** Total count of all FAQ questions across all categories */
export const totalFAQCount = faqCategories.reduce(
  (sum, cat) => sum + cat.questions.length,
  0,
);

export function getFAQCategoryBySlug(slug: string): FAQCategory | undefined {
  return faqCategories.find((category) => category.id === slug);
}

export function getFAQCategorySlugs(): string[] {
  return faqCategories.map((category) => category.id);
}
