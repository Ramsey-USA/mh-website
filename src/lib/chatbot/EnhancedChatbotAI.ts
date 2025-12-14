/**
 * Enhanced Chatbot Context and Utilities
 * Provides advanced features for the MH Construction chatbot including
 * search integration, conversation memory, and intelligent responses
 */

import { matchFAQ } from "./faq-responses";

export interface ChatbotSearchIntegration {
  searchQuery?: string;
  searchResults?: unknown[];
  searchLocation?: string;
  hasSearchContext?: boolean;
}

export interface ResponseFeedback {
  responseId: string;
  rating: "positive" | "negative";
  timestamp: Date;
  userMessage: string;
  botResponse: string;
  responseType?: string;
  confidence?: number;
  comment?: string;
}

export interface ConversationMemory {
  userProfile?: {
    isVeteran?: boolean;
    veteranBranch?: string;
    previousProjects?: string[];
    interests?: string[];
    budget?: string;
    location?: string;
    preferredContactMethod?: "phone" | "email" | "form";
    hasRequestedEstimate?: boolean;
    hasScheduledConsultation?: boolean;
  };
  sessionMetrics?: {
    messageCount: number;
    sessionDuration: number;
    leadsGenerated: number;
    topicsDiscussed: string[];
    satisfactionRating?: number; // 1-5 scale
    feedbackProvided?: boolean;
    responseFeedback?: ResponseFeedback[];
  };
  conversationFlow?: {
    currentTopic?: string;
    previousTopics: string[];
    nextSuggestedTopics: string[];
    lastResponseType?: string;
    lastResponseConfidence?: number;
  };
  sessionInfo?: {
    sessionId: string;
    startTime: Date;
    lastActivity: Date;
    totalInteractions: number;
  };
}

export interface EnhancedChatbotContext {
  currentPage: string;
  searchContext?: ChatbotSearchIntegration;
  conversationMemory?: ConversationMemory;
  formData?: unknown;
  estimatorData?: unknown;
  pageContent?: {
    availableServices?: string[];
    featuredProjects?: unknown[];
    teamMembers?: unknown[];
    testimonials?: unknown[];
  };
}

/**
 * Enhanced AI Response Generator
 * Integrates with search functionality and maintains conversation context
 */
export class EnhancedChatbotAI {
  private static instance: EnhancedChatbotAI;

  public static getInstance(): EnhancedChatbotAI {
    if (!EnhancedChatbotAI.instance) {
      EnhancedChatbotAI.instance = new EnhancedChatbotAI();
    }
    return EnhancedChatbotAI.instance;
  }

  /**
   * Generate contextually aware responses with search integration
   * Phase 3: Now includes conversation memory, confidence scoring, and personalization
   */
  generateEnhancedResponse(
    userMessage: string,
    context: EnhancedChatbotContext,
    conversationHistory: unknown[] = [],
  ): string {
    // Normalize the query to handle synonyms and variations
    const normalizedMessage = this.normalizeQuery(userMessage);

    let responseType = "general";
    let baseResponse = "";
    let confidence = 0.5;

    // Add personalized greeting if available
    const greeting = this.getPersonalizedGreeting(context);
    const personalizedPrefix = greeting || "";

    // PRIORITY 1: Check FAQ database first - handles most common questions
    const faqMatch = matchFAQ(normalizedMessage);
    if (faqMatch) {
      responseType = "faq";
      baseResponse = faqMatch.answer + this.formatFollowups(faqMatch.category);
      confidence = this.calculateConfidence(responseType, userMessage);

      this.updateConversationMemory(context, { topic: faqMatch.category });
      this.logAnalytics({
        question: userMessage,
        responseType,
        wasAnswered: true,
      });

      return (
        personalizedPrefix +
        this.addConfidenceEscalation(baseResponse, confidence)
      );
    }

    // PRIORITY 2: Check for specific contact queries (detailed responses)
    if (this.isContactQuery(normalizedMessage)) {
      responseType = "contact";
      baseResponse =
        this.generateContactResponse() + this.formatFollowups("contact");
      confidence = this.calculateConfidence(responseType, userMessage);

      this.updateConversationMemory(context, { topic: "contact" });
      this.logAnalytics({
        question: userMessage,
        responseType,
        wasAnswered: true,
      });

      return (
        personalizedPrefix +
        this.addConfidenceEscalation(baseResponse, confidence)
      );
    }

    // PRIORITY 3: Check for pricing queries (budget and cost questions)
    if (this.isPricingQuery(normalizedMessage)) {
      responseType = "pricing";
      baseResponse =
        this.generatePricingResponse(normalizedMessage) +
        this.formatFollowups("pricing");
      confidence = this.calculateConfidence(responseType, userMessage);

      this.updateConversationMemory(context, {
        topic: "pricing",
        interest: "pricing",
      });
      this.logAnalytics({
        question: userMessage,
        responseType,
        wasAnswered: true,
      });

      return (
        personalizedPrefix +
        this.addConfidenceEscalation(baseResponse, confidence)
      );
    }

    // PRIORITY 4: Check for timeline/schedule queries
    if (this.isTimelineQuery(normalizedMessage)) {
      responseType = "timeline";
      baseResponse =
        this.generateTimelineResponse(normalizedMessage) +
        this.formatFollowups("timeline");
      confidence = this.calculateConfidence(responseType, userMessage);

      this.updateConversationMemory(context, { topic: "timeline" });
      this.logAnalytics({
        question: userMessage,
        responseType,
        wasAnswered: true,
      });

      return (
        personalizedPrefix +
        this.addConfidenceEscalation(baseResponse, confidence)
      );
    }

    // PRIORITY 5: Check for SEO/technical queries
    if (this.isSEOQuery(normalizedMessage)) {
      responseType = "seo";
      baseResponse =
        this.generateSEOResponse(normalizedMessage) +
        this.formatFollowups("technical");
      confidence = this.calculateConfidence(responseType, userMessage);

      this.updateConversationMemory(context, {
        topic: "seo",
        interest: "technical website optimization",
      });
      this.logAnalytics({
        question: userMessage,
        responseType,
        wasAnswered: true,
      });

      return (
        personalizedPrefix +
        this.addConfidenceEscalation(baseResponse, confidence)
      );
    }

    // PRIORITY 6: Check for company information queries (leadership, ownership, etc.)
    if (this.isCompanyInfoQuery(normalizedMessage)) {
      responseType = "company";
      baseResponse =
        this.generateCompanyInfoResponse(normalizedMessage, context) +
        this.formatFollowups("company");
      confidence = this.calculateConfidence(responseType, userMessage);

      this.updateConversationMemory(context, { topic: "company" });
      this.logAnalytics({
        question: userMessage,
        responseType,
        wasAnswered: true,
      });

      return (
        personalizedPrefix +
        this.addConfidenceEscalation(baseResponse, confidence)
      );
    }

    // PRIORITY 6: Check if user is asking about search or wants to find something
    if (this.isSearchRelatedQuery(normalizedMessage)) {
      responseType = "search";
      baseResponse = this.generateSearchResponse(normalizedMessage, context);
      confidence = this.calculateConfidence(responseType, userMessage);

      this.logAnalytics({
        question: userMessage,
        responseType,
        wasAnswered: true,
      });

      return (
        personalizedPrefix +
        this.addConfidenceEscalation(baseResponse, confidence)
      );
    }

    // PRIORITY 7: Check if user needs help with current page content
    if (this.isPageSpecificQuery(normalizedMessage, context)) {
      responseType = "page-specific";
      baseResponse = this.generatePageSpecificResponse(
        normalizedMessage,
        context,
        conversationHistory,
      );
      confidence = this.calculateConfidence(responseType, userMessage);

      this.logAnalytics({
        question: userMessage,
        responseType,
        wasAnswered: true,
      });

      return (
        personalizedPrefix +
        this.addConfidenceEscalation(baseResponse, confidence)
      );
    }

    // PRIORITY 8: Check for veteran-specific queries
    if (this.isVeteranQuery(normalizedMessage, context)) {
      responseType = "veteran";
      baseResponse =
        this.generateVeteranResponse(normalizedMessage, context) +
        this.formatFollowups("veteran");
      confidence = this.calculateConfidence(responseType, userMessage);

      // Detect veteran status and branch
      const branch = this.detectVeteranBranch(normalizedMessage);
      this.updateConversationMemory(context, {
        isVeteran: true,
        ...(branch && { veteranBranch: branch }),
        topic: "veteran",
      });
      this.logAnalytics({
        question: userMessage,
        responseType,
        wasAnswered: true,
      });

      return (
        personalizedPrefix +
        this.addConfidenceEscalation(baseResponse, confidence)
      );
    }

    // PRIORITY 9: Check for project/estimate queries
    if (this.isProjectQuery(normalizedMessage)) {
      responseType = "project";
      baseResponse =
        this.generateProjectResponse(normalizedMessage, context) +
        this.formatFollowups("project");
      confidence = this.calculateConfidence(responseType, userMessage);

      this.updateConversationMemory(context, {
        topic: "project",
        action: "estimate",
      });
      this.logAnalytics({
        question: userMessage,
        responseType,
        wasAnswered: true,
      });

      return (
        personalizedPrefix +
        this.addConfidenceEscalation(baseResponse, confidence)
      );
    }

    // PRIORITY 10: Generate general response with enhanced context
    responseType = "general";
    baseResponse = this.generateGeneralResponse(
      normalizedMessage,
      context,
      conversationHistory,
    );
    confidence = this.calculateConfidence(responseType, userMessage);

    this.logAnalytics({
      question: userMessage,
      responseType,
      wasAnswered: false,
    });

    return (
      personalizedPrefix +
      this.addConfidenceEscalation(baseResponse, confidence)
    );
  }

  private isCompanyInfoQuery(message: string): boolean {
    const companyInfoKeywords = [
      "who is the boss",
      "who's the boss",
      "who is the owner",
      "who's the owner",
      "who owns",
      "who is the president",
      "who's the president",
      "who runs",
      "who is in charge",
      "who's in charge",
      "company owner",
      "company president",
      "who founded",
      "who started",
      "leadership team",
      "management team",
      "who are the leaders",
      "jeremy thamert",
      "mike holstein",
      "arnold garcia",
    ];
    const messageLower = message.toLowerCase();
    return companyInfoKeywords.some((keyword) =>
      messageLower.includes(keyword.toLowerCase()),
    );
  }

  private generateCompanyInfoResponse(
    message: string,
    _context: EnhancedChatbotContext,
  ): string {
    const messageLower = message.toLowerCase();

    // Check for specific person queries
    if (
      messageLower.includes("jeremy") ||
      messageLower.includes("thamert") ||
      messageLower.includes("boss") ||
      messageLower.includes("president") ||
      messageLower.includes("in charge") ||
      messageLower.includes("runs")
    ) {
      return `**[COMMAND LEADERSHIP BRIEF]** 🎖️\n\n**Jeremy Thamert** is the Owner & President of MH Construction!\n\n**LEADERSHIP OVERVIEW:**\n• **Position:** Owner & President\n• **Focus Areas:** Safety, Marketing, Workforce Development & HR\n• **Leadership Style:** People-first management with strategic operational oversight\n• **Philosophy:** "Building projects for the client, NOT the dollar"\n\n**KEY RESPONSIBILITIES:**\n✓ Presidential oversight of strategic operations\n✓ Safety management & organizational standards\n✓ Workforce development & team building initiatives\n✓ Human Resources & people-first leadership\n\n**COMPANY FOUNDATION:**\nMH Construction was originally **founded by Mike Holstein** (now retired) in 2010, establishing the company's reputation for integrity and quality. Under Jeremy's current leadership, the company maintains these core values while focusing on operational excellence through strategic emphasis on people and safety.\n\n**LEADERSHIP TEAM:**\n• **Jeremy Thamert** - Owner & President\n• **Arnold Garcia** - Vice President (Client Relations & Strategic Operations)\n• **Mike Holstein** - Founder (Retired, Advisory Role)\n\n**Want to meet the entire team?** [View Team Cards →](/team)\n\n**Ready to work with veteran-owned leadership?** [Contact Us →](/contact)`;
    }

    if (
      messageLower.includes("mike") ||
      messageLower.includes("holstein") ||
      messageLower.includes("founder") ||
      messageLower.includes("founded") ||
      messageLower.includes("started")
    ) {
      return `**[COMPANY HISTORY BRIEF]** 📋\n\n**Mike Holstein** is the founder of MH Construction!\n\n**FOUNDER PROFILE:**\n• **Position:** Founder (Now Retired)\n• **Founded:** 2010\n• **Legacy:** 30+ years construction experience, 650+ projects completed\n• **Philosophy:** Established "We Work With You" partnership approach\n\n**FOUNDING STORY:**\nMike started MH Construction in 2010 with just a pickup truck and a toolbox, building it into a regional construction leader known for integrity, quality, and precision. His vision established the core values that still define MH Construction today.\n\n**CURRENT LEADERSHIP:**\nThe company is now led by **Jeremy Thamert** (Owner & President) who continues Mike's legacy while bringing strategic focus on safety, workforce development, and operational excellence.\n\n**Meet the full team:** [View Team Cards →](/team)\n**Learn about our history:** [About Us →](/about)`;
    }

    if (
      messageLower.includes("arnold") ||
      messageLower.includes("garcia") ||
      messageLower.includes("vice president")
    ) {
      return `**[VICE PRESIDENT BRIEF]** 🤝\n\n**Arnold Garcia** serves as Vice President of MH Construction!\n\n**VP PROFILE:**\n• **Position:** Vice President\n• **Years with Company:** 15 years\n• **Focus Areas:** Client Relations & Strategic Operations\n• **Experience:** 425+ projects, $50M+ in project oversight\n\n**KEY RESPONSIBILITIES:**\n✓ Primary client liaison for major commercial/industrial projects\n✓ Strategic operations & business growth\n✓ Service excellence & quality assurance\n✓ Project oversight & risk management\n\n**PHILOSOPHY:**\nArnold embodies the "We Work With You" philosophy that defines MH Construction's approach to partnership-driven construction.\n\n**LEADERSHIP TEAM:**\n• **Jeremy Thamert** - Owner & President\n• **Arnold Garcia** - Vice President\n• **Mike Holstein** - Founder (Retired)\n\n**Meet the entire team:** [View Team Cards →](/team)`;
    }

    // General leadership/management query
    return `**[LEADERSHIP COMMAND STRUCTURE]** 🎖️\n\n**EXECUTIVE LEADERSHIP:**\n\n**Jeremy Thamert - Owner & President**\n• Strategic oversight & operational leadership\n• Focus: Safety, Marketing, Workforce Development & HR\n• Leadership philosophy: People-first management\n\n**Arnold Garcia - Vice President**\n• Client relations & strategic operations\n• 15 years experience, $50M+ project oversight\n• Primary liaison for major commercial/industrial projects\n\n**Mike Holstein - Founder (Retired)**\n• Founded MH Construction in 2010\n• Established company core values & "We Work With You" philosophy\n• 30+ years construction experience, 650+ projects\n\n**COMPANY FOUNDATION:**\n• **Veteran-Owned** under Army veteran leadership (January 2025)\n• **150+ Years Combined Team Experience**\n• **Licensed in WA, OR, ID**\n• **Award-Winning 0.64 EMR Safety Record**\n• **"Building projects for the client, NOT the dollar"** - Our Core Philosophy\n\n**Want to meet the full team?** [View Team Cards →](/team)\n\n**Ready to partner with veteran-owned leadership?** [Contact Us →](/contact)`;
  }

  private isSearchRelatedQuery(message: string): boolean {
    const searchKeywords = [
      "search",
      "find",
      "look for",
      "show me",
      "where is",
      "locate",
      "browse",
      "explore",
      "see examples",
      "view projects",
    ];
    return searchKeywords.some((keyword) =>
      message.toLowerCase().includes(keyword.toLowerCase()),
    );
  }

  private generateSearchResponse(
    message: string,
    context: EnhancedChatbotContext,
  ): string {
    const searchTerms = this.extractSearchTerms(message);

    let response = `**[RECONNAISSANCE MISSION ACTIVATED]** 🔍\n\n`;

    if (searchTerms.length > 0) {
      response += `**SEARCH OBJECTIVES:** ${searchTerms.join(", ")}\n\n`;
      response += `**TACTICAL SEARCH OPTIONS:**\n`;
      response += `• Press **Ctrl+K** for instant intelligence gathering\n`;
      response += `• Deploy to [Mission Portfolio](/projects) for project reconnaissance\n`;
      response += `• Brief on [Service Capabilities](/services) for operational intel\n`;
      response += `• Review [Command Structure](/team) for personnel directory\n`;
      response += `• Check [Career Opportunities](/careers) to join our elite force\n\n`;

      // Add page-specific search suggestions
      if (context.currentPage.includes("/projects")) {
        response += `💡 **TACTICAL TIP:** Use search bar above to filter missions by location, type, or operational features!`;
      } else {
        response += `💡 **TACTICAL TIP:** I'll redirect you to optimal intelligence source for your mission objectives!`;
      }
    } else {
      response += `**Intelligence gathering ready!** You can:\n\n`;
      response += `• Request "locate kitchen operations" or "show veteran services"\n`;
      response += `• Deploy **Ctrl+K** for rapid intel anywhere on site\n`;
      response += `• Command me to guide you to target intelligence\n\n`;
      response += `**What intelligence do you require?**`;
    }

    return response;
  }

  private extractSearchTerms(message: string): string[] {
    const cleanMessage = message
      .toLowerCase()
      .replace(/search for|find|show me|look for|where is/g, "")
      .trim();

    const constructionTerms = [
      "kitchen",
      "bathroom",
      "deck",
      "addition",
      "renovation",
      "commercial",
      "residential",
      "remodel",
      "construction",
      "contractor",
      "estimate",
    ];

    return constructionTerms.filter((term) => cleanMessage.includes(term));
  }

  private isPageSpecificQuery(
    message: string,
    context: EnhancedChatbotContext,
  ): boolean {
    const pageKeywords = {
      "/services": ["service", "what do you do", "offerings", "capabilities"],
      "/projects": ["portfolio", "examples", "previous work", "gallery"],
      "/team": ["team", "staff", "employees", "who works"],
      "/about": ["about", "company", "history", "story"],
      "/contact": [
        "contact",
        "phone",
        "email",
        "address",
        "location",
        "schedule",
        "appointment",
        "consultation",
        "meeting",
      ],
      "/government": ["government", "grants", "public", "municipal", "federal"],
      "/trade-partners": ["trade", "partners", "subcontractor", "partnership"],
      "/urgent": ["urgent", "emergency", "immediate", "rapid", "support"],
      "/careers": ["careers", "jobs", "employment", "hiring", "join team"],
    };

    const currentPageKeywords =
      pageKeywords[context.currentPage as keyof typeof pageKeywords] || [];
    return currentPageKeywords.some((keyword) =>
      message.toLowerCase().includes(keyword),
    );
  }

  private generatePageSpecificResponse(
    message: string,
    context: EnhancedChatbotContext,
    conversationHistory: unknown[],
  ): string {
    switch (context.currentPage) {
      case "/services":
        return this.generateServicesPageResponse(message, context);
      case "/projects":
        return this.generateProjectsPageResponse(message, context);
      case "/team":
        return this.generateTeamPageResponse(message, context);
      case "/contact":
        return this.generateContactPageResponse(message, context);
      case "/government":
        return this.generateGovernmentPageResponse(message, context);
      case "/trade-partners":
        return this.generateTradePartnersPageResponse(message, context);
      case "/urgent":
        return this.generateUrgentPageResponse(message, context);
      case "/careers":
        return this.generateCareersPageResponse(message, context);
      case "/about":
        return this.generateAboutPageResponse(message, context);
      default:
        return this.generateGeneralResponse(
          message,
          context,
          conversationHistory,
        );
    }
  }

  private generateServicesPageResponse(
    _message: string,
    _context: EnhancedChatbotContext,
  ): string {
    return `**[SERVICE CAPABILITIES BRIEF]** 🔧\n\nReporting operational capabilities! Here's what this construction unit offers:\n\n**RESIDENTIAL OPERATIONS:**\n• Custom home construction missions\n• Kitchen & bathroom tactical remodels\n• Home additions & strategic renovations\n• Deck & outdoor living space deployments\n\n**COMMERCIAL MISSIONS:**\n• Office building construction operations\n• Retail space development campaigns\n• Industrial facility builds\n• Tenant improvement missions\n\n**SPECIALIZED OPERATIONS:**\n• Veteran-owned business priority protocols\n• Energy-efficient construction missions\n• Sustainable building tactical approaches\n• Emergency repair rapid response\n\n**INTELLIGENCE GATHERING OPTIONS:**\n• [Contact Us →](/contact) - Expert consultation and detailed mission analysis\n\n**Ready to begin your project?**`;
  }

  private generateProjectsPageResponse(
    _message: string,
    context: EnhancedChatbotContext,
  ): string {
    let response = `**[MISSION PORTFOLIO RECONNAISSANCE]** 📸\n\n`;

    if (context.searchContext?.hasSearchContext) {
      response += `**Intelligence station operational!** Use search command above to filter by:\n\n`;
    } else {
      response += `**Welcome to mission archives!** Explore completed operations:\n\n`;
    }

    response += `**RECONNAISSANCE FILTERS:**\n`;
    response += `• **Mission type** (kitchen, bathroom, commercial operations)\n`;
    response += `• **Area of Operations** (city or regional deployment)\n`;
    response += `• **Tactical features** (energy efficient, accessible, etc.)\n`;
    response += `• **Budget allocation** (various investment levels)\n\n`;
    response += `**FEATURED OPERATION CATEGORIES:**\n`;
    response += `• Residential renovation campaigns\n`;
    response += `• Commercial construction missions\n`;
    response += `• Veteran-priority operations\n`;
    response += `• Award-winning tactical builds\n\n`;
    response += `**Need specific mission intelligence or operation examples?**`;

    return response;
  }

  private generateTeamPageResponse(
    _message: string,
    _context: EnhancedChatbotContext,
  ): string {
    return `**[COMMAND PERSONNEL DIRECTORY]** 👥\n\n**Meet the elite construction force behind MH Construction!**\n\n**COMMAND STRUCTURE:**\n• **General Staff** - Strategic planning & mission operations\n• **Project Officers** - Mission coordination & tactical execution\n• **Skilled Combat Engineers** - Precision construction operations\n• **Support Battalion** - Administrative & Client Partner intelligence\n\n**VETERAN REPRESENTATION:**\nMany command personnel are fellow veterans who understand:\n• Military precision and attention to detail\n• Mission-critical deadlines and budgets\n• Superior communication protocols\n• Honor, integrity, and service excellence\n\n**Request specific personnel briefings or command structure intel?**`;
  }

  private generateContactPageResponse(
    _message: string,
    _context: EnhancedChatbotContext,
  ): string {
    return `**[COMMUNICATION PROTOCOLS]** 📞\n\n**Ready to establish command contact!** Here are communication channels:\n\n**IMMEDIATE TACTICAL CONTACT:**\n• **Primary Line:** (509) 308-6489\n• **Intel Email:** info@mhconstruction.com\n• **Operations Hours:** Mon-Fri, 0700-1600 PST\n\n**RESPONSE PROTOCOL TIMELINES:**\n• **Standard intel requests:** Within 24 hours\n• **Veteran priority comms:** Within 12 hours\n• **Emergency operations:** Same day deployment\n\n**CONSULTATION MISSION OPTIONS:**\n• Free on-site tactical assessments\n• Virtual operation planning sessions\n• Phone-based mission briefings\n• Command post office meetings\n\n**Ready to deploy contact form or need communication assistance?**`;
  }

  // Removed: generateBookingPageResponse (feature deprecated Dec 2025)
  // Removed: generateEstimatorPageResponse (feature deprecated Dec 2025)
  // Removed: generate3DExplorerPageResponse (feature deprecated Dec 2025)

  private generateGovernmentPageResponse(
    _message: string,
    _context: EnhancedChatbotContext,
  ): string {
    return `**[GOVERNMENT OPERATIONS DIVISION]** 🏛️\n\n**Specialized government and public sector construction intelligence!**\n\n**OUR CAPABILITIES:**\n• Federal construction projects and contracting\n• Municipal and state building operations\n• Public works and infrastructure missions\n• Grant-funded construction coordination\n• Veteran-owned business certifications (SDVOSB/VOSB)\n• Compliance with government procurement protocols\n\n**VETERAN ADVANTAGE:**\nAs a veteran-owned business, we have priority access to:\n• VA construction projects\n• Federal set-aside contracts\n• State veteran preference programs\n• Military installation work opportunities\n\n**GRANT ASSISTANCE:**\n• Help identifying eligible funding sources\n• Grant application support and coordination\n• Budget compliance and documentation\n\n**Ready to discuss government project opportunities?** [Contact Our Team →](/contact)`;
  }

  private generateTradePartnersPageResponse(
    _message: string,
    _context: EnhancedChatbotContext,
  ): string {
    return `**[STRATEGIC PARTNERSHIPS DIVISION]** 🤝\n\n**Building construction excellence through partnership!**\n\n**PARTNER OPPORTUNITIES:**\n• Become part of our trusted subcontractor network\n• Access to consistent project pipeline\n• Fair payment terms and professional respect\n• Collaborative project management approach\n• Long-term partnership development\n\n**WHAT WE SEEK:**\n• **Quality craftsmen** committed to excellence\n• **Licensed professionals** in their trade\n• **Reliable partners** who value communication\n• **Safety-conscious** teams (we maintain 0.64 EMR)\n• **Veteran-owned businesses** (priority consideration)\n\n**PARTNERSHIP BENEFITS:**\n• Steady work opportunities across WA, OR, ID\n• Direct communication with project management\n• Fair bidding and negotiation processes\n• Payment reliability and transparency\n\n**Interested in partnering?** [Join Our Network →](/contact)`;
  }

  private generateUrgentPageResponse(
    _message: string,
    _context: EnhancedChatbotContext,
  ): string {
    return `**[URGENT SUPPORT OPERATIONS]** 🚨\n\n**Rapid response construction support for General Contractors!**\n\n**EMERGENCY CAPABILITIES:**\n• **Expert consultation** for critical structural challenges\n• **Heavy equipment & operators** available for immediate hire\n• **Experienced construction crews** ready for deployment\n• **Specialized tools and equipment** rental\n• **Foundation and structural repairs** - fix the source!\n• **Emergency roof and wall system restoration**\n\n**RESPONSE PROTOCOL:**\n• **Contact:** (509) 308-6489\n• **Email:** office@mhc-gc.com\n• **Hours:** Monday-Friday, 7:00 AM - 4:00 PM PST\n\n**WHAT WE PROVIDE:**\n✓ Urgent structural assessments\n✓ Heavy machinery with certified operators\n✓ Skilled construction professionals\n✓ Material handling and logistics support\n✓ On-site project management\n\n**NOT first responder services** - We solve structural construction problems!\n\n**Need immediate construction support?** [Contact Now →](/contact)`;
  }

  private generateCareersPageResponse(
    _message: string,
    _context: EnhancedChatbotContext,
  ): string {
    return `**[RECRUITMENT OPERATIONS]** 💼\n\n**Join the MH Construction elite construction force!**\n\n**WHY JOIN OUR RANKS:**\n• **Veteran-owned values** - Military precision meets construction excellence\n• **Award-winning safety** - Industry-leading 0.64 EMR safety record\n• **Career growth** - 150+ years combined team experience to learn from\n• **Competitive benefits** - Health, dental, vision, 401(k)\n• **Work-life balance** - Respect for family and personal time\n• **Tri-Cities based** - Serving WA, OR, ID communities\n\n**CURRENT OPPORTUNITIES:**\n• Project Managers & Superintendents\n• Skilled Carpenters & Craftsmen\n• Heavy Equipment Operators\n• Construction Laborers\n• Administrative Support\n\n**VETERAN PRIORITY:** We actively recruit and prioritize veteran hiring!\n\n**WHAT WE VALUE:**\n• Commitment to quality and excellence\n• Strong work ethic and reliability\n• Team collaboration and communication\n• Safety-first mindset\n• Professional growth mindset\n\n**Ready to join our team?** [View Openings →](/careers) or [Apply Now →](/contact)`;
  }

  private generateAboutPageResponse(
    _message: string,
    _context: EnhancedChatbotContext,
  ): string {
    return `**[COMMAND INTELLIGENCE BRIEF]** 📋\n\n**Learn about MH Construction's mission and values!**\n\n**OUR FOUNDATION:**\n• **Veteran-Owned** - Military precision applied to construction\n• **150+ Years Combined Experience** - Elite construction expertise\n• **Licensed WA, OR, ID** - Serving the Pacific Northwest\n• **Award-Winning Safety** - Industry-leading 0.64 EMR\n• **"Building projects for the client, NOT the dollar"** - Our core philosophy\n\n**CORE VALUES:**\n• **Honesty** - Transparent communication always\n• **Integrity** - Doing what's right, every time\n• **Professionalism** - Excellence in every interaction\n• **Thoroughness** - Meticulous attention to detail\n\n**OUR STORY:**\nFounded in 2010 by Mike Holstein, MH Construction became veteran-owned in January 2025 under Army veteran Jeremy Thamert's leadership. We bring military-grade excellence and partnership-driven values to every construction project.\n\n**EXPLORE MORE:**\n• [Meet Our Team →](/team)\n• [View Our Work →](/projects)\n• [Client Testimonials →](/about#testimonials)\n• [Awards & Recognition →](/about#awards)\n\n**Want to partner with us?** [Get Started →](/contact)`;
  }

  private isVeteranQuery(
    message: string,
    context: EnhancedChatbotContext,
  ): boolean {
    const veteranKeywords = [
      "veteran",
      "military",
      "va",
      "service",
      "army",
      "navy",
      "marines",
      "marine",
      "air force",
      "coast guard",
      "disabled veteran",
      "ptsd",
      "accessibility",
      "wounded warrior",
      "combat veteran",
    ];
    return (
      veteranKeywords.some((keyword) =>
        message.toLowerCase().includes(keyword),
      ) || Boolean(context.conversationMemory?.userProfile?.isVeteran)
    );
  }

  private detectServiceBranch(message: string): string | null {
    const messageLower = message.toLowerCase();
    if (messageLower.includes("army") || messageLower.includes("soldier")) {
      return "army";
    }
    if (
      messageLower.includes("navy") ||
      messageLower.includes("sailor") ||
      messageLower.includes("seaman")
    ) {
      return "navy";
    }
    if (
      messageLower.includes("marine") ||
      messageLower.includes("usmc") ||
      messageLower.includes("leatherneck")
    ) {
      return "marines";
    }
    if (
      messageLower.includes("air force") ||
      messageLower.includes("airman") ||
      messageLower.includes("usaf")
    ) {
      return "airforce";
    }
    if (messageLower.includes("coast guard") || messageLower.includes("uscg")) {
      return "coastguard";
    }
    return null;
  }

  /**
   * Alias for detectServiceBranch for conversation memory
   */
  private detectVeteranBranch(message: string): string | undefined {
    return this.detectServiceBranch(message) || undefined;
  }

  private generateVeteranResponse(
    message: string,
    _context: EnhancedChatbotContext,
  ): string {
    const branch = this.detectServiceBranch(message);
    let greeting = "";

    // Service-specific greetings
    switch (branch) {
      case "army":
        greeting = "**HOOAH!** 🎖️\n\n";
        break;
      case "navy":
        greeting = "**ANCHORS AWEIGH!** ⚓\n\n";
        break;
      case "marines":
        greeting = "**SEMPER FI!** 🦅\n\n";
        break;
      case "airforce":
        greeting = "**AIM HIGH!** ✈️\n\n";
        break;
      case "coastguard":
        greeting = "**SEMPER PARATUS!** 🛡️\n\n";
        break;
      default:
        greeting = "**SALUTE TO YOUR SERVICE!** 🇺🇸\n\n";
    }

    let response = greeting;
    response += `**[VETERAN PRIORITY PROTOCOL ACTIVATED]**\n\n`;
    response += `**Thank you for your service, ${branch ? `${branch.toUpperCase()} veteran` : "service member"}!** General MH reporting for duty.\n\n`;

    // Check for specific veteran needs
    if (
      message.toLowerCase().includes("wounded warrior") ||
      message.toLowerCase().includes("accessibility") ||
      message.toLowerCase().includes("disability")
    ) {
      response += `**ACCESSIBILITY & ADAPTIVE HOME SERVICES:**\n`;
      response += `• Priority scheduling for accessibility consultations\n`;
      response += `• VA grant coordination and assistance\n`;
      response += `• ADA-compliant modification expertise\n`;
      response += `• Wheelchair accessibility planning\n`;
      response += `• Adaptive home technology integration\n`;
      response += `• Zero-barrier construction solutions\n\n`;
      response += `**VETERAN PARTNERSHIP DEVELOPMENT:**\n`;
      response += `We're actively establishing partnerships with veteran organizations including the Wounded Warrior Project and other veteran support groups to expand our service offerings. Stay tuned for enhanced benefits as these partnerships develop!\n\n`;
    } else if (
      message.toLowerCase().includes("energy") ||
      message.toLowerCase().includes("efficiency") ||
      message.toLowerCase().includes("savings")
    ) {
      response += `**ENERGY EFFICIENCY MISSIONS:**\n`;
      response += `• Military-grade energy audits\n`;
      response += `• Solar panel installation coordination\n`;
      response += `• High-efficiency HVAC systems\n`;
      response += `• Insulation and weatherization upgrades\n`;
      response += `• Smart home energy management\n`;
      response += `• Veteran energy assistance programs\n\n`;
    } else if (
      message.toLowerCase().includes("security") ||
      message.toLowerCase().includes("ptsd") ||
      message.toLowerCase().includes("safe")
    ) {
      response += `**SECURITY OPERATIONS (PTSD-AWARE):**\n`;
      response += `• Tactical home security assessments\n`;
      response += `• Safe room design and construction\n`;
      response += `• Advanced surveillance systems\n`;
      response += `• Secure entry point modifications\n`;
      response += `• Privacy-enhanced window treatments\n`;
      response += `• Sound-dampening construction for peaceful environments\n\n`;
    } else {
      response += `**CURRENT VETERAN BENEFITS:**\n`;
      response += `• **Combat Veteran Discount at the Ready** on all projects\n`;
      response += `• **Priority Scheduling** for consultations\n`;
      response += `• **Expedited Project Timelines** when possible\n`;
      response += `• **VA Loan Coordination** and assistance\n`;
      response += `• **Fellow Veteran Team Members** who understand your needs\n\n`;
      response += `**EXPANDING PARTNERSHIPS:**\n`;
      response += `As a newly veteran-owned company (January 2025), we're establishing strategic partnerships with veteran organizations to enhance our service offerings. More benefits coming as partnerships develop!\n\n`;
    }

    response += `**IMMEDIATE TACTICAL SUPPORT:**\n`;
    response += `Call **(509) 308-6489** and identify as a veteran for priority assistance.\n\n`;
    response += `**How can this construction unit support your mission, ${branch ? `${branch.toUpperCase()} veteran` : "service member"}?**`;

    return response;
  }

  private isProjectQuery(message: string): boolean {
    const projectKeywords = [
      "project",
      "estimate",
      "estimator",
      "cost",
      "budget",
      "build",
      "construction",
      "remodel",
      "renovation",
      "addition",
      "quote",
      "price",
      "pricing",
      "timeline",
      "ai estimate",
      "ai estimator",
      "calculator",
    ];
    return projectKeywords.some((keyword) =>
      message.toLowerCase().includes(keyword),
    );
  }

  private isContactQuery(message: string): boolean {
    const contactKeywords = [
      "phone",
      "call",
      "number",
      "email",
      "address",
      "location",
      "hours",
      "open",
      "contact",
      "reach you",
      "get in touch",
      "where are you",
      "how do i contact",
      "talk to someone",
    ];
    return contactKeywords.some((keyword) =>
      message.toLowerCase().includes(keyword),
    );
  }

  private generateContactResponse(): string {
    return (
      `**[CONTACT COMMAND CENTER]** 📞\n\n` +
      `**PHONE:** (509) 308-6489\n` +
      `• Veterans: Ask for priority service\n\n` +
      `**EMAIL:** office@mhc-gc.com\n\n` +
      `**HOURS:** Monday-Friday, 7:00 AM - 4:00 PM PST\n` +
      `• Saturday consultations available by appointment\n\n` +
      `**OFFICE:** 3111 N. Capitol Ave., Pasco, WA 99301\n` +
      `[**Get Directions →**](https://maps.google.com/?q=3111+N+Capitol+Ave+Pasco+WA+99301)\n\n` +
      `**RESPONSE TIMES:**\n` +
      `• Standard inquiries: Within 24 hours\n` +
      `• Veterans: Within 12 hours\n` +
      `• Emergency support: Same day\n\n` +
      `**QUICK ACTIONS:**\n` +
      `• **[Contact Us →](/contact)**\n` +
      `• **[Contact Form →](/contact)**\n` +
      `• **[Get Project Intel →](/projects)**\n\n` +
      `**How can we support your construction mission today?**`
    );
  }

  private isPricingQuery(message: string): boolean {
    const pricingKeywords = [
      "how much",
      "cost",
      "price",
      "pricing",
      "expensive",
      "cheap",
      "rate",
      "fee",
      "charge",
      "payment",
      "financing",
      "afford",
      "budget",
      "dollar",
      "money",
    ];
    return pricingKeywords.some((keyword) =>
      message.toLowerCase().includes(keyword),
    );
  }

  private generatePricingResponse(message: string): string {
    const projectType = this.extractProjectType(message);

    let response = `**[PRICING INTELLIGENCE BRIEFING]** 💰\n\n`;

    if (projectType === "kitchen") {
      response += `**KITCHEN REMODEL RANGE:**\n`;
      response += `• Minor refresh: $15,000 - $30,000\n`;
      response += `• Mid-range upgrade: $30,000 - $60,000\n`;
      response += `• High-end transformation: $60,000 - $100,000+\n\n`;
    } else if (projectType === "bathroom") {
      response += `**BATHROOM RENOVATION RANGE:**\n`;
      response += `• Basic update: $8,000 - $15,000\n`;
      response += `• Standard remodel: $15,000 - $30,000\n`;
      response += `• Luxury upgrade: $30,000 - $50,000+\n\n`;
    } else if (projectType === "addition") {
      response += `**HOME ADDITION RANGE:**\n`;
      response += `• Basic addition: $100 - $200 per sq ft\n`;
      response += `• Standard quality: $200 - $300 per sq ft\n`;
      response += `• Premium finish: $300 - $400+ per sq ft\n\n`;
    } else {
      response += `**GENERAL PRICING INFO:**\n`;
      response += `Every project is unique! Costs depend on:\n`;
      response += `• Scope and complexity\n`;
      response += `• Materials and finishes\n`;
      response += `• Structural requirements\n`;
      response += `• Permits and inspections\n`;
      response += `• Timeline and scheduling\n\n`;
    }

    response += `**FREE ESTIMATE OPTIONS:**\n`;
    response += `• **[Contact Us →](/contact)** - Schedule consultation for detailed on-site assessment\n`;
    response += `• **[Contact Us to Schedule →](/contact)** - Detailed on-site assessment\n`;
    response += `• **[Call (509) 308-6489](tel:5093086489)** - Speak with our team\n\n`;
    response += `**VETERAN DISCOUNT:** Combat Veteran Discount at the Ready!\n\n`;
    response += `**PAYMENT OPTIONS:**\n`;
    response += `• Competitive financing available\n`;
    response += `• Flexible payment schedules\n`;
    response += `• Progress-based billing\n\n`;
    response += `**Ready to get your precise estimate?**`;

    return response;
  }

  private isTimelineQuery(message: string): boolean {
    const timelineKeywords = [
      "how long",
      "timeline",
      "duration",
      "time",
      "takes",
      "schedule",
      "when",
      "fast",
      "quick",
      "weeks",
      "months",
      "days",
      "finish",
      "complete",
    ];
    return timelineKeywords.some((keyword) =>
      message.toLowerCase().includes(keyword),
    );
  }

  private isSEOQuery(message: string): boolean {
    const seoKeywords = [
      "seo",
      "search engine",
      "google",
      "ranking",
      "optimize",
      "visibility",
      "meta",
      "metadata",
      "sitemap",
      "robots.txt",
      "lighthouse",
      "performance score",
      "page speed",
      "search result",
      "crawl",
      "index",
      "keywords",
    ];
    return seoKeywords.some((keyword) =>
      message.toLowerCase().includes(keyword),
    );
  }

  private generateSEOResponse(message: string): string {
    const messageLower = message.toLowerCase();
    let response = `**[SEO COMMAND CENTER]** 🔍\n\n`;

    // Specific SEO topic detection
    if (
      messageLower.includes("sitemap") ||
      messageLower.includes("robots") ||
      messageLower.includes("crawl")
    ) {
      response += `**SITEMAP & CRAWLING OPERATIONS:**\n\n`;
      response += `✅ **Automatic sitemap generation active!**\n\n`;
      response += `**Add pages to sitemap:**\n`;
      response += `\`\`\`typescript\n`;
      response += `// src/app/sitemap.ts - ACTIVE_PAGES\n`;
      response += `{ path: "/new-page", priority: 0.8, changeFreq: "monthly" }\n`;
      response += `\`\`\`\n\n`;
      response += `**Auto-generated:**\n`;
      response += `• XML sitemap at \`/sitemap.xml\`\n`;
      response += `• Sitemap index at \`/sitemap-index.xml\`\n`;
      response += `• Robots.txt with proper directives\n`;
      response += `• Canonical URLs for all pages\n\n`;
    } else if (
      messageLower.includes("meta") ||
      messageLower.includes("title") ||
      messageLower.includes("description")
    ) {
      response += `**METADATA CONFIGURATION:**\n\n`;
      response += `**Page metadata template:**\n`;
      response += `\`\`\`typescript\n`;
      response += `export const metadata: Metadata = {\n`;
      response += `  title: "Page Name | MH Construction",\n`;
      response += `  description: "150-char with keywords + CTA",\n`;
      response += `  keywords: ["construction", "Tri-Cities", "veteran-owned"]\n`;
      response += `};\n`;
      response += `\`\`\`\n\n`;
      response += `**Auto-validation checks:**\n`;
      response += `• Title: 30-60 characters (50 optimal)\n`;
      response += `• Description: 120-160 characters (150 optimal)\n`;
      response += `• Keywords: 3-15 terms (7 optimal)\n\n`;
    } else if (
      messageLower.includes("lighthouse") ||
      messageLower.includes("score") ||
      messageLower.includes("performance")
    ) {
      response += `**PERFORMANCE MONITORING:**\n\n`;
      response += `**Quick audit commands:**\n`;
      response += `\`\`\`bash\n`;
      response += `npm run seo:audit     # Full SEO check\n`;
      response += `npm run seo:report    # Detailed report\n`;
      response += `\`\`\`\n\n`;
      response += `**Target scores (all 90-100):**\n`;
      response += `🟢 SEO: 100/100 (Current)\n`;
      response += `🟢 Performance: 90+\n`;
      response += `🟢 Accessibility: 90+\n`;
      response += `🟢 Best Practices: 90+\n\n`;
      response += `**Current status:** Ultimate SEO system active!\n\n`;
    } else {
      // General SEO overview
      response += `**SITE SEO STATUS: EXCELLENT** 🎯\n\n`;
      response += `This website has **100/100 SEO score** with auto-optimization!\n\n`;
      response += `**Quick SEO Commands:**\n`;
      response += `\`\`\`bash\n`;
      response += `npm run seo:audit     # Quick SEO check\n`;
      response += `npm run seo:report    # Detailed report\n`;
      response += `npm run build && npm run seo:audit  # Pre-deploy\n`;
      response += `\`\`\`\n\n`;
      response += `**Auto-Enforced Best Practices:**\n`;
      response += `✅ Optimized titles (50 chars)\n`;
      response += `✅ Meta descriptions (150 chars)\n`;
      response += `✅ Strategic keywords (7 per page)\n`;
      response += `✅ Mobile-first responsive design\n`;
      response += `✅ Automatic sitemap generation\n`;
      response += `✅ Lighthouse CI monitoring\n\n`;
    }

    response += `**SEO RESOURCES:**\n`;
    response += `• [SEO Quick Reference](/seo-quick-reference.md)\n`;
    response += `• [Ultimate SEO Guide](./docs/technical/seo/ultimate-seo-guide.md)\n`;
    response += `• [SEO Index](./docs/technical/seo/seo-index.md)\n\n`;
    response += `**Need specific SEO help?** Ask about metadata, sitemaps, performance, or rankings!`;

    return response;
  }

  private generateTimelineResponse(message: string): string {
    const projectType = this.extractProjectType(message);

    let response = `**[TIMELINE RECONNAISSANCE]** ⏱️\n\n`;

    if (projectType === "kitchen") {
      response += `**KITCHEN REMODEL TIMELINE:**\n`;
      response += `• Design & permits: 2-4 weeks\n`;
      response += `• Construction: 4-8 weeks\n`;
      response += `• **Total:** 6-12 weeks typically\n\n`;
    } else if (projectType === "bathroom") {
      response += `**BATHROOM RENOVATION TIMELINE:**\n`;
      response += `• Design & permits: 1-3 weeks\n`;
      response += `• Construction: 2-4 weeks\n`;
      response += `• **Total:** 3-7 weeks typically\n\n`;
    } else if (projectType === "addition") {
      response += `**HOME ADDITION TIMELINE:**\n`;
      response += `• Design & permits: 4-8 weeks\n`;
      response += `• Foundation & framing: 4-8 weeks\n`;
      response += `• Finishing work: 4-8 weeks\n`;
      response += `• **Total:** 3-6 months typically\n\n`;
    } else if (projectType === "deck") {
      response += `**DECK CONSTRUCTION TIMELINE:**\n`;
      response += `• Permits: 1-2 weeks\n`;
      response += `• Construction: 1-3 weeks\n`;
      response += `• **Total:** 2-5 weeks typically\n\n`;
    } else {
      response += `**GENERAL PROJECT TIMELINES:**\n`;
      response += `Timeline varies based on:\n`;
      response += `• Project scope and complexity\n`;
      response += `• Permit approval process\n`;
      response += `• Material availability\n`;
      response += `• Weather conditions\n`;
      response += `• Inspection schedules\n\n`;
    }

    response += `**OUR PROCESS:**\n`;
    response += `1. **Consultation:** 1-2 days to schedule\n`;
    response += `2. **Design & Estimate:** 1-2 weeks\n`;
    response += `3. **Permits:** 2-6 weeks (varies by jurisdiction)\n`;
    response += `4. **Construction:** Project-specific\n`;
    response += `5. **Final Inspection:** 1 week\n\n`;
    response += `**FAST-TRACK OPTIONS:**\n`;
    response += `• Expedited permits available for urgent projects\n`;
    response += `• Veterans receive priority scheduling\n`;
    response += `• Emergency repair services within 24-48 hours\n\n`;
    response += `**Want a specific timeline for your project?**\n`;
    response += `• **[Contact Us →](/contact)**\n`;
    response += `• **[Call (509) 308-6489)](tel:5093086489)**`;

    return response;
  }

  private generateProjectResponse(
    message: string,
    context: EnhancedChatbotContext,
  ): string {
    const projectType = this.extractProjectType(message);

    let response = `**[COST RECONNAISSANCE MISSION]** 🎯\n\n`;

    if (projectType !== "general") {
      response += `**Mission Type Identified:** ${projectType} operations\n\n`;
    }

    response += `**CHOOSE YOUR MISSION PATH:**\n\n`;

    response += `**🤖 AI ESTIMATOR (Instant):**\n`;
    response += `• Get preliminary cost intel in under 5 minutes\n`;
    response += `• Available 24/7 for immediate budget planning\n`;
    response += `• Based on 500+ completed missions\n`;
    response += `• [Contact Us to Schedule →](/contact)\n\n`;

    response += `**👤 EXPERT CONSULTATION (Detailed):**\n`;
    response += `• Schedule in-person tactical assessment\n`;
    response += `• Customized mission planning with human experts\n`;
    response += `• Detailed open-book pricing & timeline intel\n`;
    response += `• [Contact Us to Schedule →](/contact)\n\n`;

    response += `**RECOMMENDED:** Start with AI Estimator for instant preliminary pricing, then schedule consultation for detailed analysis.\n\n`;

    if (context.conversationMemory?.userProfile?.isVeteran) {
      response += `**VETERAN PRIORITY:** Your mission receives expedited processing and Combat Veteran Discount at the Ready on both paths.\n\n`;
    }

    response += `**Which tactical path suits your mission objectives?**`;

    return response;
  }

  private extractProjectType(message: string): string {
    const projectTypes = [
      "kitchen",
      "bathroom",
      "deck",
      "addition",
      "renovation",
      "commercial",
    ];
    return (
      projectTypes.find((type) => message.toLowerCase().includes(type)) ||
      "general"
    );
  }

  private generateGeneralResponse(
    message: string,
    _context: EnhancedChatbotContext,
    conversationHistory: unknown[],
  ): string {
    // Analyze conversation history for better context
    const previousTopics = this.extractPreviousTopics(conversationHistory);

    // If this is the first message and we couldn't match anything specific, provide fallback
    if (previousTopics.length === 0 && message.length > 5) {
      return this.generateFallbackResponse(message);
    }

    let response = `**[GENERAL MH - REPORTING FOR DUTY]** 🎖️\n\n`;

    // Personalize based on conversation history
    if (previousTopics.length > 0) {
      response += `Continuing our tactical discussion on **${previousTopics[previousTopics.length - 1]}**...\n\n`;
    }

    response += `**General MH here - your Army General construction intelligence officer.** Ready to assist with:\n\n`;
    response += `**TACTICAL SERVICES:**\n`;
    response += `• Cost Reconnaissance Missions (project estimates)\n`;
    response += `• Service Capability Briefings\n`;
    response += `• Mission Portfolio Reconnaissance\n`;
    response += `• Veteran Priority Protocols\n`;
    response += `• Consultation Deployment Coordination\n\n`;

    response += `**QUICK COMMANDS:**\n`;
    response += `• "reconnaissance projects" to explore completed operations\n`;
    response += `• "veteran protocols" for service member advantages\n`;
    response += `• "cost reconnaissance" to initiate project planning\n`;
    response += `• "deploy consultation" for immediate mission coordination\n\n`;

    response += `**What's your construction objective today, soldier?**`;

    return response;
  }

  private extractPreviousTopics(conversationHistory: unknown[]): string[] {
    const topics: string[] = [];
    const topicKeywords = {
      estimates: ["estimate", "cost", "budget", "price"],
      projects: ["project", "build", "construction"],
      services: ["service", "offering", "capability"],
      team: ["team", "staff", "employee"],
      veterans: ["veteran", "military", "service"],
    };

    conversationHistory.forEach((msg) => {
      if (this.isChatMessage(msg) && msg.type === "user") {
        Object.entries(topicKeywords).forEach(([topic, keywords]) => {
          if (
            keywords.some((keyword) =>
              msg.content.toLowerCase().includes(keyword),
            ) &&
            !topics.includes(topic)
          ) {
            topics.push(topic);
          }
        });
      }
    });

    return topics;
  }

  private isChatMessage(
    value: unknown,
  ): value is { type: string; content: string } {
    return (
      typeof value === "object" &&
      value !== null &&
      "type" in value &&
      "content" in value &&
      typeof (value as { content: unknown }).content === "string"
    );
  }

  /**
   * Generate helpful fallback when chatbot doesn't understand the query
   */
  private generateFallbackResponse(message: string): string {
    return (
      `**[ASSISTANCE NEEDED]** 🤔\n\n` +
      `I want to help, but I'm not quite understanding your question: "${message.substring(0, 50)}${message.length > 50 ? "..." : ""}"\n\n` +
      `**Here's what I can help with:**\n` +
      `• Project estimates and pricing\n` +
      `• Service information and capabilities\n` +
      `• Contact details and business hours\n` +
      `• Scheduling consultations\n` +
      `• Veteran benefits and discounts\n` +
      `• Company information and leadership\n` +
      `• Safety record and certifications\n\n` +
      `**Try asking:**\n` +
      `• "What are your business hours?"\n` +
      `• "How do I get an estimate?"\n` +
      `• "What services do you offer?"\n` +
      `• "Do you offer veteran discounts?"\n` +
      `• "Who's the boss?"\n` +
      `• "What's your phone number?"\n\n` +
      `**Or contact us directly:**\n` +
      `• **Phone:** (509) 308-6489\n` +
      `• **Email:** office@mhc-gc.com\n` +
      `• **[Contact Form →](/contact)**\n` +
      `• **[Contact Us →](/contact)**`
    );
  }

  /**
   * Normalize query to handle synonyms and variations
   * Improves keyword matching by converting common variations to standard terms
   */
  private normalizeQuery(message: string): string {
    const synonymMap: Record<string, string> = {
      // Leadership synonyms
      boss: "president",
      owner: "president",
      "in charge": "president",
      runs: "president",
      ceo: "president",
      manager: "president",

      // Pricing synonyms
      costs: "pricing",
      rates: "pricing",
      fees: "pricing",
      charges: "pricing",
      "how much": "pricing",
      expensive: "pricing",
      cheap: "pricing",
      afford: "pricing",

      // Contact synonyms
      reach: "contact",
      "get in touch": "contact",
      "talk to": "contact",
      "speak with": "contact",

      // Timeline synonyms
      "how long": "timeline",
      duration: "timeline",
      "time frame": "timeline",
      takes: "timeline",

      // Service synonyms
      offerings: "services",
      capabilities: "services",
      "what do you do": "services",
      "can you": "services",

      // Project synonyms
      build: "project",
      construct: "project",
      remodel: "project",
      renovate: "project",
      "work on": "project",
    };

    let normalized = message.toLowerCase();

    // Replace synonyms with standard terms
    Object.entries(synonymMap).forEach(([synonym, standard]) => {
      const regex = new RegExp(`\\b${synonym}\\b`, "gi");
      normalized = normalized.replace(regex, standard);
    });

    return normalized;
  }

  /**
   * Get suggested follow-up questions based on response type
   * Helps guide users to related information
   */
  private getSuggestedFollowups(responseType: string): string[] {
    const followupMap: Record<string, string[]> = {
      contact: [
        "What are your business hours?",
        "How do I schedule a consultation?",
        "Do you offer free estimates?",
      ],
      pricing: [
        "What's included in your estimates?",
        "Do you offer financing?",
        "What payment methods do you accept?",
      ],
      timeline: [
        "How do I get started?",
        "What's your construction process?",
        "Can you expedite my project?",
      ],
      services: [
        "Can you show me examples of your work?",
        "What areas do you serve?",
        "Do you offer warranties?",
      ],
      veteran: [
        "What services qualify for the veteran discount?",
        "How do I schedule a consultation?",
        "Can you help with VA home loans?",
      ],
      company: [
        "What's your safety record?",
        "Are you licensed and insured?",
        "How many projects have you completed?",
      ],
      project: [
        "How long will my project take?",
        "What's your payment schedule?",
        "Do you handle permits?",
      ],
      technical: [
        "How do I check SEO scores?",
        "How do I add pages to the sitemap?",
        "What are the performance targets?",
      ],
    };

    return (
      followupMap[responseType] || [
        "What services do you offer?",
        "How do I get an estimate?",
        "What are your business hours?",
      ]
    );
  }

  /**
   * Format follow-up suggestions for response
   */
  private formatFollowups(responseType: string): string {
    const followups = this.getSuggestedFollowups(responseType);
    const followupList = followups.map((q) => `• ${q}`).join("\n");
    return `\n\n**You might also want to know:**\n${followupList}`;
  }

  /**
   * Log analytics for chatbot interactions
   * Tracks question types, response types, and unanswered queries
   */
  private logAnalytics(data: {
    question: string;
    responseType: string;
    wasAnswered: boolean;
    timestamp?: Date;
  }): void {
    // In production, this would send to analytics service
    // For now, we'll use console logging (can be disabled in production)
    if (process.env.NODE_ENV === "development") {
      console.info("[Chatbot Analytics]", {
        ...data,
        timestamp: data.timestamp || new Date(),
      });
    }

    // Log unanswered questions for improvement
    if (!data.wasAnswered) {
      this.logUnansweredQuestion(data.question);
    }
  }

  /**
   * Track unanswered questions for continuous improvement
   */
  private logUnansweredQuestion(question: string): void {
    // In production, this would store to database for analysis
    if (process.env.NODE_ENV === "development") {
      console.warn("[Unanswered Question]", {
        question,
        timestamp: new Date().toISOString(),
        needsReview: true,
      });
    }

    // TODO: Implement database storage for production
    // Example: await db.unansweredQuestions.create({ question, timestamp: new Date() });
  }

  /**
   * Update conversation memory with user information
   * Tracks preferences, actions, and conversation context
   */
  private updateConversationMemory(
    context: EnhancedChatbotContext,
    updates: {
      isVeteran?: boolean;
      veteranBranch?: string;
      interest?: string;
      topic?: string;
      action?: string;
    },
  ): void {
    if (!context.conversationMemory) {
      return;
    }

    const { conversationMemory } = context;

    // Update user profile
    if (updates.isVeteran !== undefined) {
      if (!conversationMemory.userProfile) {
        conversationMemory.userProfile = {};
      }
      conversationMemory.userProfile.isVeteran = updates.isVeteran;
    }

    if (updates.veteranBranch) {
      if (!conversationMemory.userProfile) {
        conversationMemory.userProfile = {};
      }
      conversationMemory.userProfile.veteranBranch = updates.veteranBranch;
    }

    // Track interests
    if (updates.interest) {
      if (!conversationMemory.userProfile) {
        conversationMemory.userProfile = {};
      }
      if (!conversationMemory.userProfile.interests) {
        conversationMemory.userProfile.interests = [];
      }
      if (
        !conversationMemory.userProfile.interests.includes(updates.interest)
      ) {
        conversationMemory.userProfile.interests.push(updates.interest);
      }
    }

    // Track topics discussed
    if (updates.topic) {
      if (!conversationMemory.sessionMetrics) {
        conversationMemory.sessionMetrics = {
          messageCount: 0,
          sessionDuration: 0,
          leadsGenerated: 0,
          topicsDiscussed: [],
        };
      }
      if (
        !conversationMemory.sessionMetrics.topicsDiscussed.includes(
          updates.topic,
        )
      ) {
        conversationMemory.sessionMetrics.topicsDiscussed.push(updates.topic);
      }
    }

    // Track actions (estimate requested, consultation scheduled, etc.)
    if (updates.action) {
      if (!conversationMemory.userProfile) {
        conversationMemory.userProfile = {};
      }
      if (updates.action === "estimate") {
        conversationMemory.userProfile.hasRequestedEstimate = true;
      }
      if (updates.action === "consultation") {
        conversationMemory.userProfile.hasScheduledConsultation = true;
      }
    }

    // Update session info
    if (conversationMemory.sessionInfo) {
      conversationMemory.sessionInfo.lastActivity = new Date();
      conversationMemory.sessionInfo.totalInteractions++;
    }
  }

  /**
   * Get personalized greeting based on conversation memory
   */
  private getPersonalizedGreeting(
    context: EnhancedChatbotContext,
  ): string | null {
    const memory = context.conversationMemory;
    if (!memory?.userProfile) {
      return null;
    }

    const { userProfile } = memory;

    // Personalized veteran greeting
    if (userProfile.isVeteran && userProfile.veteranBranch) {
      return `Welcome back, ${userProfile.veteranBranch} veteran! `;
    }

    // Return visitor greeting
    if (memory.sessionInfo && memory.sessionInfo.totalInteractions > 3) {
      return `Welcome back! `;
    }

    return null;
  }

  /**
   * Calculate confidence score for a response
   * Returns a score from 0 (no confidence) to 1 (high confidence)
   */
  private calculateConfidence(
    responseType: string,
    userMessage: string,
  ): number {
    // High confidence responses (exact matches)
    const highConfidenceTypes = [
      "faq",
      "contact",
      "pricing",
      "timeline",
      "seo",
    ];
    if (highConfidenceTypes.includes(responseType)) {
      return 0.95;
    }

    // Medium-high confidence (specialized handlers)
    const mediumHighTypes = ["company", "veteran", "project"];
    if (mediumHighTypes.includes(responseType)) {
      return 0.85;
    }

    // Medium confidence (page-specific)
    if (responseType === "page-specific") {
      return 0.75;
    }

    // Lower confidence (search or general)
    if (responseType === "search") {
      return 0.65;
    }

    // Low confidence (fallback)
    if (responseType === "general") {
      // Check message length and complexity
      const wordCount = userMessage.split(/\s+/).length;
      if (wordCount < 3) {
        return 0.3; // Very short, unclear query
      }
      if (wordCount > 20) {
        return 0.4; // Very long, complex query
      }
      return 0.5; // Standard fallback confidence
    }

    return 0.5; // Default medium-low confidence
  }

  /**
   * Add confidence-based escalation offer
   */
  private addConfidenceEscalation(
    response: string,
    confidence: number,
  ): string {
    // Only add escalation for low confidence responses
    if (confidence >= 0.7) {
      return response;
    }

    const escalation =
      `\n\n**🤝 Need More Help?**\n` +
      `I might not have all the details you need. For the most accurate information:\n` +
      `• **Call:** (509) 308-6489 (speak with our team)\n` +
      `• **Schedule:** [Contact Us →](/contact)\n` +
      `• **Email:** office@mhc-gc.com\n\n` +
      `Our team can provide detailed answers and personalized guidance.`;

    return response + escalation;
  }

  /**
   * Record user feedback for a response
   */
  public recordFeedback(
    context: EnhancedChatbotContext,
    feedback: Omit<ResponseFeedback, "timestamp">,
  ): void {
    const memory = context.conversationMemory;
    if (!memory) {
      return;
    }

    // Initialize session metrics if needed
    if (!memory.sessionMetrics) {
      memory.sessionMetrics = {
        messageCount: 0,
        sessionDuration: 0,
        leadsGenerated: 0,
        topicsDiscussed: [],
      };
    }

    // Initialize feedback array if needed
    if (!memory.sessionMetrics.responseFeedback) {
      memory.sessionMetrics.responseFeedback = [];
    }

    // Add feedback with timestamp
    const fullFeedback: ResponseFeedback = {
      ...feedback,
      timestamp: new Date(),
    };

    memory.sessionMetrics.responseFeedback.push(fullFeedback);
    memory.sessionMetrics.feedbackProvided = true;

    // Calculate satisfaction rating based on feedback
    this.updateSatisfactionRating(memory);

    // Log feedback analytics
    if (process.env.NODE_ENV === "development") {
      console.info("[Chatbot Feedback]", {
        event: "feedback_received",
        rating: feedback.rating,
        responseType: feedback.responseType,
        confidence: feedback.confidence,
        sessionId: memory.sessionInfo?.sessionId,
        timestamp: new Date(),
      });
    }
  }

  /**
   * Update satisfaction rating based on feedback history
   */
  private updateSatisfactionRating(memory: ConversationMemory): void {
    const feedback = memory.sessionMetrics?.responseFeedback;
    if (!feedback || feedback.length === 0) {
      return;
    }

    // Calculate rating: positive = 5, negative = 1
    const totalRating = feedback.reduce((sum, fb) => {
      return sum + (fb.rating === "positive" ? 5 : 1);
    }, 0);

    const averageRating = totalRating / feedback.length;

    if (memory.sessionMetrics) {
      memory.sessionMetrics.satisfactionRating = Math.round(averageRating);
    }
  }

  /**
   * Get feedback statistics for analytics
   */
  public getFeedbackStats(context: EnhancedChatbotContext): {
    totalFeedback: number;
    positiveCount: number;
    negativeCount: number;
    satisfactionRate: number;
    averageConfidence: number;
  } {
    const feedback =
      context.conversationMemory?.sessionMetrics?.responseFeedback || [];

    if (feedback.length === 0) {
      return {
        totalFeedback: 0,
        positiveCount: 0,
        negativeCount: 0,
        satisfactionRate: 0,
        averageConfidence: 0,
      };
    }

    const positiveCount = feedback.filter(
      (fb) => fb.rating === "positive",
    ).length;
    const negativeCount = feedback.length - positiveCount;
    const satisfactionRate = (positiveCount / feedback.length) * 100;

    const totalConfidence = feedback.reduce((sum, fb) => {
      return sum + (fb.confidence || 0);
    }, 0);
    const averageConfidence = totalConfidence / feedback.length;

    return {
      totalFeedback: feedback.length,
      positiveCount,
      negativeCount,
      satisfactionRate: Math.round(satisfactionRate),
      averageConfidence: Math.round(averageConfidence * 100) / 100,
    };
  }
}

export const enhancedChatbotAI = EnhancedChatbotAI.getInstance();
