/**
 * Enhanced Chatbot Context and Utilities
 * Provides advanced features for the MH Construction chatbot including
 * search integration, conversation memory, and intelligent responses
 */

export interface ChatbotSearchIntegration {
  searchQuery?: string;
  searchResults?: any[];
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
  formData?: any;
  estimatorData?: any;
  pageContent?: {
    availableServices?: string[];
    featuredProjects?: any[];
    teamMembers?: any[];
    testimonials?: any[];
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
    conversationHistory: any[] = []
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
      conversationHistory
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
      message.toLowerCase().includes(keyword.toLowerCase())
    );
  }

  private generateSearchResponse(
    message: string,
    context: EnhancedChatbotContext
  ): string {
    const searchTerms = this.extractSearchTerms(message);

    let response = `**[SEARCH ASSISTANCE ACTIVATED]** 🔍\n\n`;

    if (searchTerms.length > 0) {
      response += `I can help you search for: **${searchTerms.join(", ")}**\n\n`;
      response += `**Quick Search Options:**\n`;
      response += `• Press **Ctrl+K** anywhere on the site for instant search\n`;
      response += `• Visit our [Projects page](/projects) to search our portfolio\n`;
      response += `• Check [Services](/services) for specific construction services\n`;
      response += `• Browse [Team](/team) to find specific team members\n\n`;

      // Add page-specific search suggestions
      if (context.currentPage.includes("/projects")) {
        response += `💡 **Pro Tip:** Use the search bar above to filter projects by location, type, or features!`;
      } else {
        response += `💡 **Pro Tip:** I can redirect you to the best page for finding what you need!`;
      }
    } else {
      response += `I'm ready to help you find information! You can:\n\n`;
      response += `• Ask me to "find kitchen projects" or "show me veteran services"\n`;
      response += `• Use **Ctrl+K** for quick search anywhere on the site\n`;
      response += `• Let me guide you to the right page for your needs\n\n`;
      response += `**What would you like to search for?**`;
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
    context: EnhancedChatbotContext
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
      message.toLowerCase().includes(keyword)
    );
  }

  private generatePageSpecificResponse(
    message: string,
    context: EnhancedChatbotContext
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
    message: string,
    context: EnhancedChatbotContext
  ): string {
    return `**[SERVICES INTEL]** 🔧\n\nI see you're exploring our construction capabilities! Here's what MH Construction offers:\n\n**RESIDENTIAL OPERATIONS:**\n• Custom home construction\n• Kitchen & bathroom remodels\n• Home additions & renovations\n• Deck & outdoor living spaces\n\n**COMMERCIAL MISSIONS:**\n• Office building construction\n• Retail space development\n• Industrial facility builds\n• Tenant improvements\n\n**SPECIALIZED SERVICES:**\n• Veteran-owned business priority\n• Energy-efficient construction\n• Sustainable building practices\n• Emergency repair services\n\n**Need a specific service briefing or ready for an estimate?**`;
  }

  private generateProjectsPageResponse(
    message: string,
    context: EnhancedChatbotContext
  ): string {
    let response = `**[PORTFOLIO RECONNAISSANCE]** 📸\n\n`;

    if (context.searchContext?.hasSearchContext) {
      response += `Perfect! You're in our project gallery. Use the search bar above to filter by:\n\n`;
    } else {
      response += `Welcome to our mission portfolio! Here you can explore:\n\n`;
    }

    response += `**SEARCH OPTIONS:**\n`;
    response += `• **Project type** (kitchen, bathroom, commercial)\n`;
    response += `• **Location** (city or region)\n`;
    response += `• **Features** (energy efficient, accessible, etc.)\n`;
    response += `• **Budget range** (various investment levels)\n\n`;
    response += `**FEATURED CATEGORIES:**\n`;
    response += `• Residential renovations\n`;
    response += `• Commercial construction\n`;
    response += `• Veteran-priority projects\n`;
    response += `• Award-winning builds\n\n`;
    response += `**Want me to help you find specific project examples?**`;

    return response;
  }

  private generateTeamPageResponse(
    message: string,
    context: EnhancedChatbotContext
  ): string {
    return `**[PERSONNEL DIRECTORY]** 👥\n\nMeet the elite construction force behind MH Construction!\n\n**COMMAND STRUCTURE:**\n• **Leadership Team** - Strategic planning & operations\n• **Project Managers** - Mission coordination & execution\n• **Skilled Craftspeople** - Precision construction work\n• **Support Staff** - Administrative & customer service\n\n**VETERAN REPRESENTATION:**\nMany of our team members are fellow veterans who understand the importance of:\n• Precision and attention to detail\n• Meeting deadlines and budgets\n• Superior communication\n• Honor and integrity\n\n**Want to know about specific team members or roles?**`;
  }

  private generateContactPageResponse(
    message: string,
    context: EnhancedChatbotContext
  ): string {
    return `**[CONTACT PROTOCOLS]** 📞\n\nReady to establish communication! Here are your contact options:\n\n**IMMEDIATE CONTACT:**\n• **Phone:** (509) 308-6489\n• **Email:** info@mhconstruction.com\n• **Hours:** Mon-Fri, 8:00 AM - 5:00 PM PST\n\n**RESPONSE TIMES:**\n• **Standard inquiries:** Within 24 hours\n• **Veteran inquiries:** Priority response within 12 hours\n• **Emergency support:** Same day response\n\n**CONSULTATION OPTIONS:**\n• Free on-site consultations\n• Virtual project discussions\n• Phone consultations\n• In-office meetings\n\n**Ready to submit a contact form or need help with your message?**`;
  }

  private generateBookingPageResponse(
    message: string,
    context: EnhancedChatbotContext
  ): string {
    return `**[MISSION SCHEDULING]** 📅\n\nI'm here to help optimize your consultation booking!\n\n**CONSULTATION PROCESS:**\n1. **Select your preferred date & time**\n2. **Provide project details**\n3. **Confirm your appointment**\n\n**AVAILABLE SLOTS:**\n• Morning missions: 8 AM - 12 PM\n• Afternoon operations: 1 PM - 5 PM\n• Flexible scheduling available\n\n**WHAT TO EXPECT:**\n• 60-minute comprehensive review\n• On-site evaluation (if applicable)\n• Preliminary timeline & budget discussion\n• Next steps planning\n\n**VETERAN PRIORITY:** Expedited scheduling available for veterans\n\n**Need help with any part of the booking process?**`;
  }

  private generateGeneralPageResponse(
    message: string,
    context: EnhancedChatbotContext
  ): string {
    return `**[GENERAL ASSISTANCE]** 🏗️\n\nI'm here to help you navigate MH Construction! Based on your question, I can:\n\n• **Guide you** to the right page for your needs\n• **Provide information** about our services and capabilities\n• **Help you search** for specific projects or team members\n• **Assist with forms** and booking consultations\n• **Answer questions** about veteran benefits and priority services\n\n**What specific information can I help you find today?**`;
  }

  private isVeteranQuery(
    message: string,
    context: EnhancedChatbotContext
  ): boolean {
    const veteranKeywords = [
      "veteran",
      "military",
      "va",
      "service",
      "army",
      "navy",
      "marines",
      "air force",
      "coast guard",
      "disabled veteran",
      "ptsd",
      "accessibility",
    ];
    return (
      veteranKeywords.some((keyword) =>
        message.toLowerCase().includes(keyword)
      ) || Boolean(context.conversationMemory?.userProfile?.isVeteran)
    );
  }

  private generateVeteranResponse(
    message: string,
    context: EnhancedChatbotContext
  ): string {
    return `**[VETERAN PRIORITY PROTOCOL]** 🇺🇸\n\n**Thank you for your service!** MH Construction is proud to offer enhanced support for our veteran community.\n\n**VETERAN BENEFITS:**\n• **Priority scheduling** for consultations and projects\n• **Military discount** on all construction services\n• **VA loan assistance** and coordination\n• **Accessibility modifications** expertise\n• **Expedited project timelines** when possible\n\n**SPECIALIZED SERVICES:**\n• PTSD-friendly consultation environments\n• Wheelchair accessibility modifications\n• Veteran-owned business partnerships\n• Support for disabled veteran housing needs\n\n**IMMEDIATE SUPPORT:**\nCall (509) 308-6489 and mention your veteran status for priority assistance.\n\n**How can we specifically support your construction mission?**`;
  }

  private isProjectQuery(message: string): boolean {
    const projectKeywords = [
      "project",
      "estimate",
      "cost",
      "budget",
      "build",
      "construction",
      "remodel",
      "renovation",
      "addition",
      "quote",
      "price",
      "timeline",
    ];
    return projectKeywords.some((keyword) =>
      message.toLowerCase().includes(keyword)
    );
  }

  private generateProjectResponse(
    message: string,
    context: EnhancedChatbotContext
  ): string {
    const projectType = this.extractProjectType(message);

    let response = `**[PROJECT INTELLIGENCE]** 🎯\n\n`;

    if (projectType !== "general") {
      response += `Excellent! I see you're interested in **${projectType}** projects.\n\n`;
    }

    response += `**PROJECT DEVELOPMENT PROCESS:**\n`;
    response += `1. **Initial consultation** (free on-site evaluation)\n`;
    response += `2. **Design & planning** phase\n`;
    response += `3. **Detailed estimate** with timeline\n`;
    response += `4. **Project execution** with regular updates\n`;
    response += `5. **Final walkthrough** & warranty\n\n`;

    response += `**NEXT STEPS:**\n`;
    response += `• [Schedule a consultation](/booking) for detailed planning\n`;
    response += `• [View similar projects](/projects) in our portfolio\n`;
    response += `• [Contact us directly](/contact) for immediate assistance\n\n`;

    if (context.conversationMemory?.userProfile?.isVeteran) {
      response += `**VETERAN PRIORITY:** Your project will receive expedited processing and military discount pricing.\n\n`;
    }

    response += `**Ready to start your construction mission?**`;

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
    context: EnhancedChatbotContext,
    conversationHistory: any[]
  ): string {
    // Analyze conversation history for better context
    const previousTopics = this.extractPreviousTopics(conversationHistory);

    let response = `**[TACTICAL ASSISTANCE]** 🎖️\n\n`;

    // Personalize based on conversation history
    if (previousTopics.length > 0) {
      response += `Building on our previous discussion about **${previousTopics[previousTopics.length - 1]}**...\n\n`;
    }

    response += `I'm General MH, your AI construction intelligence officer. I can assist you with:\n\n`;
    response += `**INTELLIGENCE SERVICES:**\n`;
    response += `• Project planning & estimates\n`;
    response += `• Service capability briefings\n`;
    response += `• Portfolio reconnaissance\n`;
    response += `• Veteran benefit programs\n`;
    response += `• Consultation scheduling\n\n`;

    response += `**QUICK ACTIONS:**\n`;
    response += `• Say "search projects" to explore our work\n`;
    response += `• Ask "veteran benefits" for military advantages\n`;
    response += `• Type "get estimate" to start project planning\n`;
    response += `• Request "schedule consultation" for immediate action\n\n`;

    response += `**What's your construction objective today?**`;

    return response;
  }

  private extractPreviousTopics(conversationHistory: any[]): string[] {
    const topics: string[] = [];
    const topicKeywords = {
      estimates: ["estimate", "cost", "budget", "price"],
      projects: ["project", "build", "construction"],
      services: ["service", "offering", "capability"],
      team: ["team", "staff", "employee"],
      veterans: ["veteran", "military", "service"],
    };

    conversationHistory.forEach((message) => {
      if (message.type === "user") {
        Object.entries(topicKeywords).forEach(([topic, keywords]) => {
          if (
            keywords.some((keyword) =>
              message.content.toLowerCase().includes(keyword)
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
}

export const enhancedChatbotAI = EnhancedChatbotAI.getInstance();
