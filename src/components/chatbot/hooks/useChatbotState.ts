/**
 * Chatbot State Hook
 *
 * Manages all stateful logic for the GlobalChatbot component
 */

import { useState, useCallback, useEffect } from "react";
import type {
  EnhancedChatbotContext,
  ConversationMemory,
} from "@/lib/chatbot/EnhancedChatbotAI";

export interface ChatMessage {
  id: string;
  type: "user" | "bot";
  content: string;
  timestamp: Date;
  metadata?: {
    estimateData?: unknown;
    actionRequired?: boolean;
    priority?: "low" | "medium" | "high" | "critical";
    responseTime?: number;
    isLead?: boolean;
    isVeteran?: boolean;
  };
}

export interface ChatbotState {
  isOpen: boolean;
  isMinimized: boolean;
  position: { x: number; y: number };
  isDragging: boolean;
  dragOffset: { x: number; y: number };
  inputValue: string;
  isTyping: boolean;
  conversationTurn: number;
  sessionStartTime: Date | null;
  hasBeenOpened: boolean;
  showQuickActions: boolean;
  showHistory: boolean;
  messages: ChatMessage[];
  enhancedContext: EnhancedChatbotContext;
  conversationMemory: ConversationMemory;
}

const getInitialMessage = (): ChatMessage => ({
  id: "welcome",
  type: "bot",
  content:
    "**Welcome to MH Construction!**\n\n**OUR FOUR CORE VALUES:**\n\n• **Honesty** - SITREP-level transparency in every communication\n• **Integrity** - Keeping commitments, doing what's right\n• **Professionalism** - Military bearing, expert execution\n• **Thoroughness** - Mission-complete approach, no shortcuts\n\n*These values culminate in **TRUST** — the foundation of every partnership.*\n\n---\n\n**I can help answer basic questions**, but for the most current information, project details, or personalized guidance, I **strongly encourage you to speak with our team:**\n\n**CONTACT OUR TEAM:**\n• **Phone:** (509) 308-6489\n• **Email:** office@mhc-gc.com\n• **[Contact Form](/contact)** - Submit your inquiry\n\n---\n\n**HOW TO USE THIS ASSISTANT:**\n• Type your question in the box below\n• Click the microphone icon to speak your question\n\n**Common Topics:** Contact info, services, veteran benefits, project timelines, pricing, credentials\n\n**Serving the Tri-Cities area** (Pasco, Kennewick, Richland) and the Pacific Northwest since 2010.\n\n*Building projects for the client, NOT the dollar.*",
  timestamp: new Date(),
  metadata: { priority: "high" },
});

export function useChatbotState(currentPage = "", estimatorData?: unknown) {
  // Initialize position based on viewport size
  const getInitialPosition = () => {
    if (typeof window !== "undefined") {
      const isMobile = window.innerWidth < 640;
      if (isMobile) {
        // Center on mobile
        return { x: 10, y: 10 };
      } else {
        // Bottom right on desktop
        return { x: window.innerWidth - 424, y: 24 };
      }
    }
    return { x: 24, y: 24 };
  };

  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [position, setPosition] = useState(getInitialPosition);
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [conversationTurn, setConversationTurn] = useState(0);
  const [sessionStartTime, setSessionStartTime] = useState<Date | null>(null);
  const [hasBeenOpened, setHasBeenOpened] = useState(false);
  const [showQuickActions, setShowQuickActions] = useState(false); // Disabled Quick Actions
  const [showHistory, setShowHistory] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    getInitialMessage(),
  ]);

  const [enhancedContext, setEnhancedContext] =
    useState<EnhancedChatbotContext>({
      currentPage: currentPage,
      searchContext: {
        hasSearchContext: false,
      },
      conversationMemory: {
        userProfile: {},
        sessionMetrics: {
          messageCount: 0,
          sessionDuration: 0,
          leadsGenerated: 0,
          topicsDiscussed: [],
        },
        conversationFlow: {
          previousTopics: [],
          nextSuggestedTopics: [],
        },
      },
      estimatorData: estimatorData,
    });

  const [conversationMemory, setConversationMemory] =
    useState<ConversationMemory>({
      userProfile: {},
      sessionMetrics: {
        messageCount: 0,
        sessionDuration: 0,
        leadsGenerated: 0,
        topicsDiscussed: [],
      },
      conversationFlow: {
        previousTopics: [],
        nextSuggestedTopics: [],
      },
    });

  // Increment conversation turn
  const incrementTurn = useCallback(() => {
    setConversationTurn((prev) => prev + 1);
  }, []);

  // Add message
  const addMessage = useCallback((message: ChatMessage) => {
    setMessages((prev) => [...prev, message]);
  }, []);

  // Update context
  const updateEnhancedContext = useCallback(
    (updates: Partial<EnhancedChatbotContext>) => {
      setEnhancedContext((prev) => ({ ...prev, ...updates }));
    },
    [],
  );

  // Update conversation memory
  const updateConversationMemory = useCallback(
    (updates: Partial<ConversationMemory>) => {
      setConversationMemory((prev) => ({ ...prev, ...updates }));
    },
    [],
  );

  // Handle window resize to keep chatbot in viewport
  useEffect(() => {
    const handleResize = () => {
      const chatbotWidth =
        window.innerWidth < 640 ? window.innerWidth - 20 : 400;
      const chatbotHeight = 600;

      setPosition((prev) => ({
        x: Math.max(
          10,
          Math.min(prev.x, window.innerWidth - chatbotWidth - 10),
        ),
        y: Math.max(
          10,
          Math.min(prev.y, window.innerHeight - chatbotHeight - 10),
        ),
      }));
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return {
    // State
    isOpen,
    isMinimized,
    position,
    isDragging,
    dragOffset,
    inputValue,
    isTyping,
    conversationTurn,
    sessionStartTime,
    hasBeenOpened,
    showQuickActions,
    showHistory,
    messages,
    enhancedContext,
    conversationMemory,

    // Setters
    setIsOpen,
    setIsMinimized,
    setPosition,
    setIsDragging,
    setDragOffset,
    setInputValue,
    setIsTyping,
    setConversationTurn,
    setSessionStartTime,
    setHasBeenOpened,
    setShowQuickActions,
    setShowHistory,
    setMessages,
    setEnhancedContext,
    setConversationMemory,

    // Helper functions
    incrementTurn,
    addMessage,
    updateEnhancedContext,
    updateConversationMemory,
  };
}
