/**
 * Chatbot Types and Interfaces
 * Core type definitions for the chatbot system
 */

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
    satisfactionRating?: number;
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
