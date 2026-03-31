/**
 * FAQ Data Configuration
 * Centralized FAQ content for the FAQ page, SEO schema, and reuse across the site.
 *
 * To add/edit questions: update the relevant category below.
 * Changes automatically propagate to the FAQ page, FAQPage schema, and HowTo schema.
 */

export interface FAQQuestion {
  question: string;
  answer: string;
}

export interface FAQCategory {
  id: string;
  title: string;
  icon: string;
  questions: FAQQuestion[];
}

export const faqCategories: FAQCategory[] = [
  {
    id: "general",
    title: "General Information",
    icon: "info",
    questions: [
      {
        question:
          "What makes MH Construction different from other construction companies?",
        answer:
          "We're built on a four-value professional foundation system: Honesty, Integrity, Professionalism, and Thoroughness-all culminating in Trust as our ultimate goal. Founded in 2010, we became veteran-owned in January 2025 when Army veteran Jeremy Thamert purchased the company, combining our 15-year heritage with disciplined execution and partnership-driven construction management. Our philosophy is simple: Building projects for the client, NOT the dollar. We work WITH you, not FOR you, ensuring your vision guides every decision.",
      },
      {
        question: "Where are you licensed and what areas do you serve?",
        answer:
          "MH Construction is licensed in Washington, Oregon, and Idaho. We're headquartered in Pasco, WA (3111 N. Capitol Ave., Pasco, WA 99301) and serve the broader Pacific Northwest. Our primary service area is the Tri-Cities (Pasco, Kennewick, Richland, and West Richland), with active operations in Yakima, Spokane, Walla Walla, Hermiston, Pendleton, Coeur d'Alene, and Omak.",
      },
      {
        question: "What types of projects do you specialize in?",
        answer:
          "With 650+ completed projects, we specialize in commercial, industrial, healthcare, public safety, education, and civic/nonprofit construction management. Our core services include Master Planning & Pre-Construction, Procurement & Ally Management, Constructability & Budget Control, and Project Modularization. We also deliver tenant improvements, religious facility construction, government projects, and Pre-Engineered Metal Buildings (PEMB).",
      },
      {
        question: "Are you really veteran-owned?",
        answer:
          "Yes! MH Construction was founded in 2010 and became veteran-owned in January 2025 when Army veteran Jeremy Thamert purchased the company. Our military background brings discipline, attention to detail, and a commitment to follow-through to every project. We understand the value of keeping promises and meeting commitments-values that directly translate to construction excellence.",
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
          "Project timelines vary based on scope, complexity, and your specific needs. During our initial consultation, we provide realistic timelines based on thorough planning and our 150+ years of combined team expertise. We're committed to meeting deadlines through reliable, military-honed discipline. We'll work WITH you to establish a timeline that balances quality, efficiency, and your business needs.",
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
          "Quality is central to our core values of Professionalism and Thoroughness. We implement multiple quality control checkpoints throughout every project, use proven methods refined over 150+ years of combined team expertise, and build as if constructing for our own families. Our systematic approach includes detailed inspections, comprehensive documentation, and taking the time to do it right—never compromising standards.",
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
    id: "communication",
    title: "Communication & Support",
    icon: "campaign",
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
          "Yes. We have extensive experience with government contracts and understand federal compliance requirements. Our disciplined planning, careful documentation, and regulatory expertise make us well-suited for government facility projects. We're compliance-driven and familiar with all necessary protocols.",
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
          "We are headquartered in Pasco, WA (3111 N. Capitol Ave) and serve the entire Tri-Cities region—Kennewick, Richland, West Richland, Burbank, and Connell—plus extended areas including Yakima, Spokane, Walla Walla, Hermiston (OR), Pendleton (OR), Coeur d'Alene (ID), and Omak. We are also equipped to handle government and industrial projects near the Hanford Site.",
      },
      {
        question: "Is MH Construction a certified Veteran-Owned business?",
        answer:
          "Yes, MH Construction is a Veteran-Owned business. Founded in 2010 by Mike Holstein, the company was purchased in January 2025 by U.S. Army Veteran Jeremy Thamert. We operate with an 'Old School' mentality where your word is your bond, living by the slogan: 'Building projects for the client, NOT the dollar.'",
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
