/**
 * Enhanced Chatbot Context and Utilities
 * Provides advanced features for the MH Construction chatbot including
 * search integration, conversation memory, and intelligent responses
 */

export interface ChatbotSearchIntegration {
  searchQuery?: string;
  searchResults?: unknown[];
  searchLocation?: string;
  hasSearchContext?: boolean;
}

export interface ConversationMemory {
  userProfile?: {
    isVeteran?: boolean;
    previousProjects?: string[];
    interests?: string[];
    budget?: string;
    location?: string;
  };
  sessionMetrics?: {
    messageCount: number;
    sessionDuration: number;
    leadsGenerated: number;
    topicsDiscussed: string[];
  };
  conversationFlow?: {
    currentTopic?: string;
    previousTopics: string[];
    nextSuggestedTopics: string[];
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
   */
  generateEnhancedResponse(
    userMessage: string,
    context: EnhancedChatbotContext,
    conversationHistory: unknown[] = [],
  ): string {
    // Check if user is asking about search or wants to find something
    if (this.isSearchRelatedQuery(userMessage)) {
      return this.generateSearchResponse(userMessage, context);
    }

    // Check if user needs help with current page content
    if (this.isPageSpecificQuery(userMessage, context)) {
      return this.generatePageSpecificResponse(userMessage, context);
    }

    // Check for veteran-specific queries
    if (this.isVeteranQuery(userMessage, context)) {
      return this.generateVeteranResponse(userMessage, context);
    }

    // Check for project/estimate queries
    if (this.isProjectQuery(userMessage)) {
      return this.generateProjectResponse(userMessage, context);
    }

    // Generate general response with enhanced context
    return this.generateGeneralResponse(
      userMessage,
      context,
      conversationHistory,
    );
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
      response += `• Review [Command Structure](/team) for personnel directory\n\n`;

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
      "/contact": ["contact", "phone", "email", "address", "location"],
      "/booking": ["schedule", "appointment", "consultation", "meeting"],
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
      case "/booking":
        return this.generateBookingPageResponse(message, context);
      default:
        return this.generateGeneralPageResponse(message, context);
    }
  }

  private generateServicesPageResponse(
    _message: string,
    _context: EnhancedChatbotContext,
  ): string {
    return `**[SERVICE CAPABILITIES BRIEF]** 🔧\n\nReporting operational capabilities! Here's what this construction unit offers:\n\n**RESIDENTIAL OPERATIONS:**\n• Custom home construction missions\n• Kitchen & bathroom tactical remodels\n• Home additions & strategic renovations\n• Deck & outdoor living space deployments\n\n**COMMERCIAL MISSIONS:**\n• Office building construction operations\n• Retail space development campaigns\n• Industrial facility builds\n• Tenant improvement missions\n\n**SPECIALIZED OPERATIONS:**\n• Veteran-owned business priority protocols\n• Energy-efficient construction missions\n• Sustainable building tactical approaches\n• Emergency repair rapid response\n\n**INTELLIGENCE GATHERING OPTIONS:**\n• [AI Estimator →](/estimator) - Instant preliminary intel (24/7)\n• [Expert Consultation →](/booking) - Detailed mission analysis\n\n**Ready for instant cost intel or expert briefing?**`;
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
    return `**[COMMAND PERSONNEL DIRECTORY]** 👥\n\n**Meet the elite construction force behind MH Construction!**\n\n**COMMAND STRUCTURE:**\n• **General Staff** - Strategic planning & mission operations\n• **Project Officers** - Mission coordination & tactical execution\n• **Skilled Combat Engineers** - Precision construction operations\n• **Support Battalion** - Administrative & customer intelligence\n\n**VETERAN REPRESENTATION:**\nMany command personnel are fellow veterans who understand:\n• Military precision and attention to detail\n• Mission-critical deadlines and budgets\n• Superior communication protocols\n• Honor, integrity, and service excellence\n\n**Request specific personnel briefings or command structure intel?**`;
  }

  private generateContactPageResponse(
    _message: string,
    _context: EnhancedChatbotContext,
  ): string {
    return `**[COMMUNICATION PROTOCOLS]** 📞\n\n**Ready to establish command contact!** Here are communication channels:\n\n**IMMEDIATE TACTICAL CONTACT:**\n• **Primary Line:** (509) 308-6489\n• **Intel Email:** info@mhconstruction.com\n• **Operations Hours:** Mon-Fri, 0800-1700 PST\n\n**RESPONSE PROTOCOL TIMELINES:**\n• **Standard intel requests:** Within 24 hours\n• **Veteran priority comms:** Within 12 hours\n• **Emergency operations:** Same day deployment\n\n**CONSULTATION MISSION OPTIONS:**\n• Free on-site tactical assessments\n• Virtual operation planning sessions\n• Phone-based mission briefings\n• Command post office meetings\n\n**Ready to deploy contact form or need communication assistance?**`;
  }

  private generateBookingPageResponse(
    _message: string,
    _context: EnhancedChatbotContext,
  ): string {
    return `**[MISSION SCHEDULING OPERATIONS]** 📅\n\n**I'm here to coordinate your tactical consultation deployment!**\n\n**CONSULTATION MISSION PROTOCOL:**\n1. **Select operational date & time coordinates**\n2. **Brief mission objectives and intel requirements**\n3. **Confirm deployment schedule**\n\n**AVAILABLE OPERATION WINDOWS:**\n• Morning missions: 0800-1200 hours\n• Afternoon operations: 1300-1700 hours\n• Flexible scheduling for priority missions\n\n**MISSION BRIEFING EXPECTATIONS:**\n• 60-minute comprehensive tactical review\n• On-site reconnaissance (if applicable)\n• Preliminary timeline & budget intelligence\n• Next phase mission planning\n\n**VETERAN PRIORITY:** Expedited scheduling for service members\n\n**Need assistance with deployment coordination?**`;
  }

  private generateGeneralPageResponse(
    _message: string,
    _context: EnhancedChatbotContext,
  ): string {
    return `**[GENERAL TACTICAL ASSISTANCE]** 🏗️\n\n**General MH reporting!** I can provide intelligence on:\n\n• **Navigate** you to optimal mission objectives\n• **Brief** on service capabilities and operations\n• **Reconnaissance** for specific projects or personnel\n• **Assist** with forms and consultation deployment\n• **Intel** on veteran benefits and priority protocols\n\n**What specific intelligence can I provide for your construction mission?**`;
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
      response += `• **12% Combat Veteran Discount** on all projects\n`;
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
    response += `• [Launch AI Estimator →](/estimator)\n\n`;

    response += `**👤 EXPERT CONSULTATION (Detailed):**\n`;
    response += `• Schedule in-person tactical assessment\n`;
    response += `• Customized mission planning with human experts\n`;
    response += `• Detailed open-book pricing & timeline intel\n`;
    response += `• [Schedule Consultation →](/booking)\n\n`;

    response += `**RECOMMENDED:** Start with AI Estimator for instant preliminary pricing, then schedule consultation for detailed analysis.\n\n`;

    if (context.conversationMemory?.userProfile?.isVeteran) {
      response += `**VETERAN PRIORITY:** Your mission receives expedited processing and 12% combat veteran discount on both paths.\n\n`;
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
    _message: string,
    _context: EnhancedChatbotContext,
    conversationHistory: unknown[],
  ): string {
    // Analyze conversation history for better context
    const previousTopics = this.extractPreviousTopics(conversationHistory);

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
}

export const enhancedChatbotAI = EnhancedChatbotAI.getInstance();
