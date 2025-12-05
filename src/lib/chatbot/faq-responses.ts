/**
 * FAQ Response System for Chatbot
 * Common questions and their answers
 */

export interface FAQItem {
  keywords: string[];
  question: string;
  answer: string;
  category: string;
}

export const faqDatabase: FAQItem[] = [
  // Contact & Hours
  {
    keywords: ["phone", "call", "number", "telephone", "contact"],
    question: "What is your phone number?",
    answer: `**[CONTACT INFORMATION]** 📞\n\n**Main Line:** (509) 308-6489\n\n**Email:** office@mhc-gc.com\n\n**Hours:** Monday-Friday, 7:00 AM - 4:00 PM PST\n\n**[Schedule Consultation →](/booking)** or **[Contact Form →](/contact)**`,
    category: "contact",
  },
  {
    keywords: ["hours", "open", "when", "schedule", "available"],
    question: "What are your business hours?",
    answer: `**[OPERATIONAL HOURS]** ⏰\n\n**Standard Operations:**\nMonday-Friday: 7:00 AM - 4:00 PM PST\n\n**Response Times:**\n• Standard inquiries: Within 24 hours\n• Veteran priority: Within 12 hours\n• Emergency support: Same day\n\n**24/7 Available:**\n• **[AI Estimator →](/estimator)** - Instant project estimates\n• Emergency contact for urgent construction support\n\n**Ready to connect?** [Schedule Consultation →](/booking)`,
    category: "contact",
  },
  {
    keywords: ["address", "location", "where", "office", "visit"],
    question: "Where are you located?",
    answer: `**[OFFICE LOCATION]** 📍\n\n**Headquarters:**\n3111 N. Capitol Ave.\nPasco, WA 99301\n\n**Service Areas:**\n• Washington State\n• Oregon\n• Idaho\n• Tri-Cities Region (Pasco, Kennewick, Richland)\n\n**[Get Directions →](https://maps.google.com/?q=3111+N+Capitol+Ave+Pasco+WA+99301)**\n\n**Want to visit?** Schedule an appointment: **[Book Consultation →](/booking)**`,
    category: "contact",
  },
  {
    keywords: ["email", "e-mail", "mail"],
    question: "What is your email?",
    answer: `**[EMAIL CONTACT]** ✉️\n\n**Primary:** office@mhc-gc.com\n\n**Response Time:**\n• Standard: Within 24 hours\n• Veteran priority: Within 12 hours\n\n**Alternative Contact:**\n• **Phone:** (509) 308-6489\n• **[Contact Form →](/contact)** - Web submission\n• **[Schedule Meeting →](/booking)** - Direct consultation\n\nPrefer instant communication? Try our AI chatbot!`,
    category: "contact",
  },

  // Pricing & Estimates
  {
    keywords: ["cost", "price", "pricing", "expensive", "charge", "rates"],
    question: "How much do projects cost?",
    answer: `**[PRICING INFORMATION]** 💰\n\n**Project pricing varies based on:**\n• Scope and complexity\n• Materials and specifications\n• Timeline requirements\n• Location and site conditions\n\n**GET YOUR ESTIMATE:**\n\n**Option 1: AI Estimator (Instant)**\n• Free preliminary estimate in under 5 minutes\n• Available 24/7\n• **[Try AI Estimator →](/estimator)**\n\n**Option 2: Expert Consultation (Detailed)**\n• Comprehensive on-site assessment\n• Detailed open-book pricing\n• Timeline and budget planning\n• **[Schedule Free Consultation →](/booking)**\n\n**VETERAN DISCOUNT:** 12% for combat veterans!\n\n**Transparent Pricing Promise:**\n"Building projects for the client, NOT the dollar" - No hidden fees, open-book pricing`,
    category: "pricing",
  },
  {
    keywords: ["estimate", "quote", "assessment", "evaluation"],
    question: "How do I get an estimate?",
    answer: `**[ESTIMATE OPTIONS]** 🎯\n\n**Two Pathways Available:**\n\n**🤖 AI ESTIMATOR (Instant)**\n• Get preliminary cost intel in under 5 minutes\n• Available 24/7 - no waiting\n• Based on 500+ completed projects\n• Free - no commitment required\n• **[Launch AI Estimator →](/estimator)**\n\n**👤 EXPERT CONSULTATION (Comprehensive)**\n• Free on-site assessment\n• Detailed open-book pricing\n• Timeline and planning discussion\n• Personalized recommendations\n• **[Schedule Consultation →](/booking)**\n\n**RECOMMENDED:** Start with AI Estimator for instant ballpark, then schedule consultation for detailed planning.\n\n**VETERAN PRIORITY:** Expedited processing + 12% discount!`,
    category: "pricing",
  },
  {
    keywords: ["free", "consultation", "assessment"],
    question: "Do you offer free consultations?",
    answer: `**[FREE CONSULTATIONS]** ✅\n\n**YES! We offer completely free consultations!**\n\n**What's Included:**\n• 60-minute comprehensive review\n• On-site assessment (if applicable)\n• Preliminary timeline estimate\n• Budget discussion\n• Expert recommendations\n• No obligation - no pressure\n\n**Schedule Options:**\n• Morning: 7:00 AM - 12:00 PM\n• Afternoon: 1:00 PM - 4:00 PM\n• Flexible for priority projects\n\n**[Schedule Free Consultation →](/booking)**\n\n**Also Available 24/7:**\n• **[AI Estimator →](/estimator)** - Instant preliminary pricing\n• Chatbot support (that's me!)\n\n**VETERAN PRIORITY:** Expedited scheduling available!`,
    category: "pricing",
  },

  // Services
  {
    keywords: ["services", "do you do", "offer", "provide", "capabilities"],
    question: "What services do you offer?",
    answer: `**[SERVICE CAPABILITIES]** 🔧\n\n**RESIDENTIAL:**\n• Custom home construction\n• Kitchen & bathroom remodels\n• Home additions & renovations\n• Decks & outdoor spaces\n\n**COMMERCIAL:**\n• Office buildings\n• Retail spaces\n• Industrial facilities\n• Tenant improvements\n• Medical facilities\n\n**SPECIALTY:**\n• Government & grant-funded projects\n• Veteran-focused services\n• Energy-efficient construction\n• Emergency repair support\n\n**TRADE SUPPORT:**\n• General contractor assistance\n• Equipment & operator rental\n• Crew deployment\n\n**Explore Details:**\n• **[View All Services →](/services)**\n• **[See Our Work →](/projects)**\n• **[Get Estimate →](/estimator)**`,
    category: "services",
  },
  {
    keywords: ["do you build", "construct", "remodel", "renovate"],
    question: "What types of projects do you build?",
    answer: `**[PROJECT CAPABILITIES]** 🏗️\n\n**We handle diverse construction projects:**\n\n**RESIDENTIAL:**\n✓ New home construction\n✓ Kitchen remodeling\n✓ Bathroom renovations\n✓ Home additions\n✓ Deck construction\n✓ Garage builds\n\n**COMMERCIAL:**\n✓ Office buildings\n✓ Retail spaces\n✓ Restaurants\n✓ Medical facilities\n✓ Industrial warehouses\n✓ Multi-tenant buildings\n\n**SPECIALTY:**\n✓ Government facilities\n✓ Grant-funded projects\n✓ Veteran-accessible homes\n✓ Energy-efficient builds\n\n**Project Size:** From small remodels to multi-million dollar commercial builds\n\n**[View Portfolio →](/projects)** to see completed work!\n**[Get Your Estimate →](/estimator)**`,
    category: "services",
  },
  {
    keywords: ["licensed", "insured", "bonded", "certified"],
    question: "Are you licensed and insured?",
    answer: `**[CREDENTIALS & COMPLIANCE]** ✅\n\n**YES! Fully licensed, bonded, and insured.**\n\n**LICENSES:**\n• Licensed in Washington State\n• Licensed in Oregon\n• Licensed in Idaho\n• All required municipal permits\n\n**INSURANCE & BONDING:**\n• General liability insurance\n• Workers' compensation\n• Bonded for client protection\n• Equipment insurance\n\n**SAFETY RECORD:**\n• **0.64 EMR** - Industry-leading (40% better than average)\n• Multiple AGC-WA Top EMR Awards\n• OSHA VPP Star designation\n• 3+ years without time-loss injuries\n\n**CERTIFICATIONS:**\n• Veteran-Owned Business (SDVOSB/VOSB)\n• OSHA 30-Hour Certified\n• AGC Member\n• NAIOP Member\n\n**[Learn More →](/about#awards)**`,
    category: "credentials",
  },

  // Timeline & Process
  {
    keywords: ["how long", "timeline", "duration", "time", "takes"],
    question: "How long do projects take?",
    answer: `**[PROJECT TIMELINES]** ⏱️\n\n**Timelines vary by project scope:**\n\n**RESIDENTIAL PROJECTS:**\n• Kitchen remodel: 3-6 weeks\n• Bathroom remodel: 2-4 weeks\n• Home addition: 3-6 months\n• Deck construction: 1-3 weeks\n• Full home build: 6-12 months\n\n**COMMERCIAL PROJECTS:**\n• Tenant improvement: 4-8 weeks\n• Small commercial build: 3-6 months\n• Large commercial: 6-18 months\n• Restaurant buildout: 6-12 weeks\n\n**FACTORS AFFECTING TIMELINE:**\n• Project size and complexity\n• Material availability\n• Permit approval process\n• Weather conditions\n• Design changes\n\n**PROCESS:**\n1. Consultation & Planning: 1-2 weeks\n2. Permits & Approvals: 2-6 weeks\n3. Construction: Project-specific\n4. Final Inspection: 1 week\n\n**Get accurate timeline:** **[Schedule Consultation →](/booking)**`,
    category: "process",
  },
  {
    keywords: ["process", "steps", "how does it work", "procedure"],
    question: "What is your construction process?",
    answer: `**[CONSTRUCTION PROCESS]** 📋\n\n**OUR PARTNERSHIP APPROACH:**\n\n**PHASE 1: DISCOVERY**\n• Initial consultation (free)\n• Site assessment\n• Needs analysis\n• Budget discussion\n\n**PHASE 2: PLANNING**\n• Detailed proposal\n• Open-book pricing\n• Timeline development\n• Contract signing\n\n**PHASE 3: PERMITTING**\n• Permit applications\n• Code compliance review\n• Approval coordination\n\n**PHASE 4: CONSTRUCTION**\n• Regular progress updates\n• Photo documentation\n• Quality inspections\n• Client walkthroughs\n\n**PHASE 5: COMPLETION**\n• Final inspection\n• Punch list completion\n• Warranty documentation\n• Ongoing support\n\n**TRANSPARENCY PROMISE:**\nRegular communication, no surprises, open-book pricing\n\n**"We Work With You" - Every Step**\n\n**Ready to start?** **[Schedule Consultation →](/booking)**`,
    category: "process",
  },

  // Veteran Services
  {
    keywords: ["veteran", "discount", "military", "service member"],
    question: "Do you offer veteran discounts?",
    answer: `**[VETERAN PRIORITY PROTOCOL]** 🎖️\n\n**YES! We're veteran-owned and support fellow veterans!**\n\n**COMBAT VETERAN BENEFITS:**\n• **12% Discount** on all projects\n• **Priority Scheduling** for consultations\n• **Expedited Timelines** when possible\n• **Fellow Veteran Team Members** who understand your needs\n\n**ADDITIONAL SERVICES:**\n• VA loan coordination assistance\n• Accessibility modifications (ADA-compliant)\n• Grant application support\n• PTSD-aware design (security, soundproofing)\n• Energy efficiency programs\n\n**VETERAN-OWNED SINCE 2025:**\n• Army veteran leadership\n• Military precision applied to construction\n• Honor, integrity, service values\n\n**TO RECEIVE BENEFITS:**\nIdentify as veteran when calling: **(509) 308-6489**\n\n**[Learn More About Veteran Services →](/about#veterans)**\n\n**THANK YOU FOR YOUR SERVICE!** 🇺🇸`,
    category: "veterans",
  },

  // Areas Served
  {
    keywords: ["area", "serve", "region", "coverage", "travel"],
    question: "What areas do you serve?",
    answer: `**[SERVICE COVERAGE]** 🗺️\n\n**PRIMARY SERVICE AREAS:**\n\n**WASHINGTON:**\n• Tri-Cities (Pasco, Kennewick, Richland)\n• Walla Walla\n• Yakima\n• Eastern Washington region\n\n**OREGON:**\n• Eastern Oregon\n• Surrounding areas\n\n**IDAHO:**\n• Western Idaho\n• Border regions\n\n**HEADQUARTERS:**\n3111 N. Capitol Ave., Pasco, WA 99301\n\n**PROJECT RANGE:**\nTypically within 150-mile radius of Tri-Cities, but we evaluate all project opportunities.\n\n**TRAVEL FEES:**\nDepend on distance and project scope - discussed during consultation\n\n**Outside our area?** Contact us anyway - we may still be able to help!\n\n**[Schedule Consultation →](/booking)**`,
    category: "service-area",
  },

  // Safety
  {
    keywords: ["safety", "safe", "record", "injuries"],
    question: "What is your safety record?",
    answer: `**[SAFETY EXCELLENCE]** 🛡️\n\n**INDUSTRY-LEADING SAFETY RECORD:**\n\n**EMR RATING: 0.6**\n• 40% better than industry average (1.0)\n• Presidential leadership focused on safety\n• Multiple AGC-WA Top EMR Awards\n\n**ACHIEVEMENTS:**\n✅ OSHA VPP Star designation\n✅ 3+ consecutive years without time-loss injuries\n✅ Zero recordable incidents in 2024\n✅ Comprehensive safety training for all crew\n\n**SAFETY PROTOCOLS:**\n• Daily safety briefings\n• OSHA 30-Hour certified team\n• Regular safety audits\n• Advanced PPE equipment\n• Continuous training programs\n\n**COMMITMENT:**\n"Every team member goes home safe, every day" - That's our promise.\n\n**Safety drives everything we do** - from planning to completion.\n\n**[Learn More About Our Standards →](/about#safety)**`,
    category: "safety",
  },

  // Payment & Warranty
  {
    keywords: ["payment", "pay", "financing", "terms"],
    question: "What are your payment terms?",
    answer: `**[PAYMENT INFORMATION]** 💳\n\n**PAYMENT STRUCTURE:**\nTypically milestone-based:\n• Deposit at contract signing\n• Progress payments at key phases\n• Final payment upon completion\n\n**PAYMENT METHODS ACCEPTED:**\n• Check\n• Bank transfer\n• Credit card (fees may apply)\n• Financing options available\n\n**FINANCING:**\nWe work with multiple financing partners to help make your project affordable.\n\n**VETERAN BENEFITS:**\n• VA loan coordination assistance\n• Additional financing options for veterans\n\n**TRANSPARENT PRICING:**\n• Open-book pricing model\n• No hidden fees\n• Detailed cost breakdowns\n• Change order documentation\n\n**"Building projects for the client, NOT the dollar"**\n\nPayment details discussed during consultation.\n\n**[Schedule Consultation →](/booking)**`,
    category: "payment",
  },
  {
    keywords: ["warranty", "guarantee", "covered"],
    question: "Do you offer warranties?",
    answer: `**[WARRANTY & GUARANTEES]** 🛡️\n\n**YES! We stand behind our work.**\n\n**WARRANTY COVERAGE:**\n• Workmanship guarantee\n• Material warranties (manufacturer-specific)\n• Structural warranties where applicable\n• Detailed warranty documentation\n\n**TYPICAL COVERAGE:**\n• 1-year workmanship warranty (standard)\n• Extended warranties available\n• Manufacturer warranties transferred to owner\n\n**POST-PROJECT SUPPORT:**\n• Ongoing communication\n• Maintenance recommendations\n• Quick response to concerns\n• Long-term partnership approach\n\n**QUALITY COMMITMENT:**\nWe build lasting partnerships that extend well beyond project completion.\n\n**EXCELLENCE GUARANTEED:**\n150+ years combined team experience ensures superior craftsmanship\n\nSpecific warranty details provided in project contract.\n\n**Questions?** **[Contact Us →](/contact)**`,
    category: "warranty",
  },

  // SEO & Website
  {
    keywords: [
      "seo",
      "search engine",
      "google",
      "ranking",
      "visibility",
      "optimize",
    ],
    question: "How can I improve my website's SEO?",
    answer: `**[SEO OPTIMIZATION GUIDE]** 🔍\n\n**GOOD NEWS!** This website has ULTIMATE SEO optimization (100/100 score)!\n\n**KEY SEO COMMANDS:**\n\`\`\`bash\n# Quick SEO audit of all pages\nnpm run seo:audit\n\n# Generate detailed SEO report\nnpm run seo:report\n\n# Pre-deployment check\nnpm run build && npm run seo:audit\n\`\`\`\n\n**SEO BEST PRACTICES (Auto-Enforced):**\n\n✅ **Titles:** 50 characters optimal (30-60 range)\n✅ **Meta Descriptions:** 150 characters optimal (120-160 range)\n✅ **Keywords:** 7 keywords optimal (3-15 range)\n✅ **Mobile-First:** Responsive design auto-detected\n✅ **Performance:** Lighthouse 90+ scores\n\n**ADDING A NEW PAGE?**\n1. Create page file in \`src/app/\`\n2. Add ONE line to \`src/app/sitemap.ts\`\n3. Done! Auto-optimization handles the rest\n\n**SEO DOCUMENTATION:**\n• [SEO Quick Reference](/seo-quick-reference.md)\n• [SEO Index](./docs/technical/seo/seo-index.md)\n• [Ultimate SEO Guide](./docs/technical/seo/ultimate-seo-guide.md)\n\n**Questions?** Contact our dev team or check the docs!`,
    category: "seo",
  },
  {
    keywords: ["meta", "metadata", "title tag", "description"],
    question: "How do I set up page metadata?",
    answer: `**[METADATA SETUP]** 🏷️\n\n**AUTO-ADAPTIVE SYSTEM IN PLACE!**\n\n**For any page, add to \`src/app/[page]/page.tsx\`:**\n\n\`\`\`typescript\nexport const metadata: Metadata = {\n  title: "Page Name | MH Construction",\n  description: "150-char description with keywords, location, CTA",\n  keywords: ["construction", "Tri-Cities", "veteran-owned", "specific", "terms"],\n  // System auto-fills: openGraph, twitter, robots, canonical\n};\n\`\`\`\n\n**VALIDATION:**\nSystem auto-checks and warns if:\n• Title not 30-60 characters\n• Description not 120-160 characters\n• Missing critical keywords\n• Incorrect format\n\n**PAGE CATEGORIES (Auto-Priority):**\n• Homepage: Priority 1.0\n• Core Services: Priority 0.9\n• Showcase: Priority 0.8\n• Support: Priority 0.7\n• Legal: Priority 0.5\n\n**VERIFICATION:**\n\`\`\`bash\nnpm run seo:audit  # Check all metadata\n\`\`\`\n\n**[Full SEO Guide →](./docs/technical/seo/ultimate-seo-guide.md)**`,
    category: "seo",
  },
  {
    keywords: ["sitemap", "robots.txt", "crawl", "index"],
    question: "How do I manage sitemaps and robots.txt?",
    answer: `**[SITEMAP & CRAWLING]** 🗺️\n\n**AUTOMATIC SITEMAP GENERATION!**\n\n**Adding Pages to Sitemap:**\n\`\`\`typescript\n// src/app/sitemap.ts - ACTIVE_PAGES array\n{ \n  path: "/new-page",\n  priority: 0.8,\n  changeFreq: "monthly" as const \n},\n\`\`\`\n\n**That's it!** System auto-generates:\n✅ XML sitemap (\`/sitemap.xml\`)\n✅ Sitemap index (\`/sitemap-index.xml\`)\n✅ Robots.txt with proper directives\n✅ Canonical URLs\n✅ Change frequencies\n\n**ROBOTS.TXT AUTO-CONFIG:**\n• Allows all major search engines\n• Blocks AI scrapers (optional)\n• References sitemap location\n• Optimized crawl directives\n\n**VERIFY SETUP:**\n\`\`\`bash\n# Check sitemap generation\nnpm run build\n# View: http://localhost:3000/sitemap.xml\n\`\`\`\n\n**GOOGLE SEARCH CONSOLE:**\nSubmit sitemap: \`https://mhc-gc.com/sitemap.xml\`\n\n**[Technical Details →](./docs/technical/seo/seo-index.md)**`,
    category: "seo",
  },
  {
    keywords: ["lighthouse", "performance", "score", "speed"],
    question: "How do I check page performance and SEO scores?",
    answer: `**[PERFORMANCE MONITORING]** 📊\n\n**AUTOMATED LIGHTHOUSE CI IN PLACE!**\n\n**Quick Performance Check:**\n\`\`\`bash\n# Full site audit (SEO + Performance)\nnpm run seo:audit\n\n# Lighthouse CI (detailed metrics)\nnpx lighthouse http://localhost:3000 --view\n\n# Pre-deployment verification\nnpm run build && npm run seo:audit\n\`\`\`\n\n**TARGET SCORES:**\n🟢 **SEO:** 90-100 (Excellent)\n🟢 **Performance:** 90-100 (Fast)\n🟢 **Accessibility:** 90-100 (Inclusive)\n🟢 **Best Practices:** 90-100 (Modern)\n\n**CURRENT STATUS:**\n✅ Homepage: 100/100 SEO\n✅ Auto-optimization enabled\n✅ Mobile-first responsive\n✅ Core Web Vitals optimized\n\n**MONITORING:**\n• Lighthouse CI config: \`monitoring/lighthouserc.json\`\n• Auto-audit on build\n• Performance budgets enforced\n• Real User Monitoring (RUM) ready\n\n**IMPROVEMENT TOOLS:**\n\`\`\`bash\nnpm run optimize  # Run optimization suite\n\`\`\`\n\n**[Performance Docs →](./docs/technical/performance/performance-index.md)**`,
    category: "seo",
  },
];

/**
 * Match user question to FAQ
 */
export function matchFAQ(userMessage: string): FAQItem | null {
  const messageLower = userMessage.toLowerCase();

  // Find best matching FAQ
  const matches = faqDatabase.filter((faq) =>
    faq.keywords.some((keyword) => messageLower.includes(keyword)),
  );

  if (matches.length === 0) return null;

  // Return first match (could be enhanced with scoring)
  return matches[0] || null;
}
