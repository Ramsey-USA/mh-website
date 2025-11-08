/**
 * Chatbot State Hook
 *
 * Manages all stateful logic for the GlobalChatbot component
 */

import { useState, useCallback } from "react";
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
    "**[GENERAL MH REPORTING FOR DUTY]** 🎖️\n\nWelcome to MH Construction - where we're Building for the Owner, NOT the Dollar!\n\n**General MH here** - your Army General construction intelligence officer, powered by military precision and veteran-owned excellence. Ready to assist with:\n\n**TACTICAL SERVICES:**\n• **Partnership Planning** - We build WITH you, not just FOR you\n• **Cost Reconnaissance Missions** - Accurate estimates with 95% precision\n• **Veteran Priority Protocols** - Specialized support for fellow service members\n• **Expert Tactical Consultation** - Professional construction intelligence\n\n**AREA OF OPERATIONS:**\nLicensed in WA, OR, ID | Tri-Cities & Pacific Northwest\n\n**How can this construction unit serve your mission today?**",
  timestamp: new Date(),
  metadata: { priority: "high" },
});

export function useChatbotState(currentPage = "", estimatorData?: unknown) {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [position, setPosition] = useState({ x: 24, y: 24 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [conversationTurn, setConversationTurn] = useState(0);
  const [sessionStartTime, setSessionStartTime] = useState<Date | null>(null);
  const [hasBeenOpened, setHasBeenOpened] = useState(false);
  const [showQuickActions, setShowQuickActions] = useState(true);
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
