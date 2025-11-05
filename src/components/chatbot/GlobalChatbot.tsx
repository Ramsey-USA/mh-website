"use client";

import React, {
  useState,
  useRef,
  useEffect,
  useCallback,
  useMemo,
} from "react";
import { Button, Card, CardHeader, CardContent, Input } from "../ui";
import { MaterialIcon } from "../icons/MaterialIcon";
import { militaryConstructionAI } from "@/lib/ai";
import { logger } from "@/lib/utils/logger";
import { useAnalytics } from "../analytics/enhanced-analytics";
import {
  enhancedChatbotAI,
  type EnhancedChatbotContext,
  type ConversationMemory,
} from "../../lib/chatbot/EnhancedChatbotAI";
import {
  usePerformanceMonitor,
  useOptimizedDebounce,
  useMessageFormatter,
  messageCache,
} from "../../lib/chatbot/performance";
import { useConversationHistory } from "../../lib/chatbot/advanced-features";
import QuickActionMenu from "./QuickActionMenu";
import ChatMessage from "./ChatMessage";
import ConversationHistoryPanel from "./ConversationHistoryPanel";

interface ChatMessage {
  id: string;
  type: "user" | "bot";
  content: string;
  timestamp: Date;
  metadata?: {
    estimateData?: any;
    actionRequired?: boolean;
    priority?: "low" | "medium" | "high" | "critical";
    responseTime?: number;
    isLead?: boolean;
    isVeteran?: boolean;
  };
}

interface GlobalChatbotProps {
  estimatorData?: any;
  onEstimateRequest?: (data: any) => void;
  currentPage?: string;
}

// Debounce hook for better performance
const useDebounce = (value: string, delay: number) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
};

export function GlobalChatbot({
  estimatorData,
  onEstimateRequest,
  currentPage = "",
}: GlobalChatbotProps) {
  // Analytics hooks
  const {
    trackChatbotOpen,
    trackChatbotClose,
    trackChatbotMessage,
    trackChatbotLeadGenerated,
    trackChatbotError,
    trackChatbotDrag,
    trackChatbotMinimize,
  } = useAnalytics();

  // State management
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

  // Advanced features
  const {
    history: conversationHistory,
    saveConversation,
    exportConversation,
    clearHistory,
    saveCurrentSession,
  } = useConversationHistory();

  // Message state with improved initial message
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "welcome",
      type: "bot",
      content:
        "Welcome to MH Construction - where we're Building for the Owner, NOT the Dollar!\n\nI'm your AI Construction Intelligence system, powered by military precision and veteran-owned excellence. Here to assist with:\n\n• Partnership Planning - Let's build together\n• Project Intelligence - Cost, timeline, and scope guidance\n• Veteran Services - Specialized support for our fellow veterans\n• Expert Consultation - Professional construction guidance\n\nLicensed in WA, OR, ID | Tri-Cities & Pacific Northwest\n\nHow can we serve your construction mission today?",
      timestamp: new Date(),
      metadata: { priority: "high" },
    },
  ]);

  // Enhanced context state
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

  // Conversation memory state
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

  // Refs
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatbotRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Performance monitoring
  const { renderCount, performanceData } =
    usePerformanceMonitor("GlobalChatbot");

  // Optimized debounced input for better performance
  const debouncedInputValue = useOptimizedDebounce(inputValue, 150);

  // Memoized message formatter
  const messageFormatter = useMessageFormatter();

  // Memoized message list to prevent unnecessary re-renders
  const memoizedMessages = useMemo(() => {
    return messages.map((message) => ({
      message,
      formattedContent:
        message.type === "bot"
          ? messageFormatter.formatBotMessage(message.content)
          : null,
    }));
  }, [messages, messageFormatter]);

  // Session management
  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, scrollToBottom]);

  // Update enhanced context when page or estimator data changes
  useEffect(() => {
    setEnhancedContext((prev) => ({
      ...prev,
      currentPage,
      estimatorData,
    }));
  }, [currentPage, estimatorData]);

  // Handle quick action selection
  const handleQuickActionSelect = useCallback(
    (actionId: string, message: string) => {
      setInputValue(message);
      setShowQuickActions(false);

      // Automatically send the message after a brief delay to show user input
      setTimeout(() => {
        if (message.trim()) {
          setInputValue(message);
          setTimeout(() => {
            // Trigger the send message manually here since we can't call handleSendMessage
            const userMessage: ChatMessage = {
              id: `user_${Date.now()}`,
              type: "user",
              content: message.trim(),
              timestamp: new Date(),
            };

            setMessages((prev) => [...prev, userMessage]);
            setInputValue("");
            setIsTyping(true);
            setConversationTurn((prev) => prev + 1);

            // Analytics tracking
            trackChatbotMessage(
              "user",
              message.length,
              conversationTurn + 1,
              message,
            );

            try {
              // Update conversation memory
              setConversationMemory((prev) => ({
                ...prev,
                sessionMetrics: {
                  ...prev.sessionMetrics!,
                  messageCount: prev.sessionMetrics!.messageCount + 1,
                },
              }));

              // Update enhanced context
              const updatedContext: EnhancedChatbotContext = {
                ...enhancedContext,
                currentPage,
                estimatorData,
                conversationMemory,
              };

              const thinkingTime = Math.min(
                Math.max(message.length * 50, 800),
                2500,
              );

              // Use enhanced AI for response generation
              const botResponse = enhancedChatbotAI.generateEnhancedResponse(
                message.trim(),
                updatedContext,
                messages,
              );

              setTimeout(() => {
                const botMessage: ChatMessage = {
                  id: `bot_${Date.now()}`,
                  type: "bot",
                  content: botResponse,
                  timestamp: new Date(),
                  metadata: {
                    responseTime: thinkingTime,
                    isLead:
                      /project|estimate|cost|budget|contact|consultation/.test(
                        message.toLowerCase(),
                      ),
                    isVeteran: /veteran|military|service/.test(
                      message.toLowerCase(),
                    ),
                    priority: /urgent|emergency|asap/.test(
                      message.toLowerCase(),
                    )
                      ? "critical"
                      : "medium",
                  },
                };

                setMessages((prev) => [...prev, botMessage]);
                setIsTyping(false);

                // Track bot response
                trackChatbotMessage(
                  "bot",
                  botResponse.length,
                  conversationTurn + 1,
                );

                // Check for lead generation
                if (botMessage.metadata?.isLead) {
                  trackChatbotLeadGenerated(
                    botMessage.metadata.isVeteran ? "veteran" : "standard",
                    "medium",
                  );
                }
              }, thinkingTime);
            } catch (error) {
              logger.error("Quick action message error:", error);
              setIsTyping(false);
              trackChatbotError(
                "connection",
                error instanceof Error ? error.message : "Unknown error",
              );
            }
          }, 100);
        }
      }, 200);
    },
    [
      conversationTurn,
      trackChatbotMessage,
      trackChatbotError,
      trackChatbotLeadGenerated,
      conversationMemory,
      currentPage,
      enhancedContext,
      estimatorData,
      messages,
    ],
  );

  // Helper function to extract project type from message
  const extractProjectType = useCallback((message: string): string => {
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
  }, []);

  // Handle chatbot open/close with analytics
  const handleChatbotToggle = useCallback(
    (open: boolean) => {
      if (open && !hasBeenOpened) {
        setHasBeenOpened(true);
        setSessionStartTime(new Date());
        trackChatbotOpen("floating_button", currentPage);

        // Focus input when opened
        setTimeout(() => {
          inputRef.current?.focus();
        }, 100);
      } else if (!open && sessionStartTime) {
        const sessionDuration =
          (Date.now() - sessionStartTime.getTime()) / 1000;
        trackChatbotClose(sessionDuration, messages.length - 1); // Exclude welcome message

        // Save conversation to history if there were meaningful interactions
        if (messages.length > 1) {
          const userMetadata = {
            page: currentPage,
            isVeteran: messages.some((m) => m.metadata?.isVeteran),
            projectType: extractProjectType(
              messages.find((m) => m.type === "user")?.content || "",
            ),
            leadGenerated: messages.some((m) => m.metadata?.isLead),
          };

          saveConversation(messages, sessionDuration, userMetadata);
        }

        setSessionStartTime(null);
      }

      setIsOpen(open);
      setIsMinimized(false);
    },
    [
      hasBeenOpened,
      sessionStartTime,
      trackChatbotOpen,
      trackChatbotClose,
      currentPage,
      messages,
      extractProjectType,
      saveConversation,
    ],
  );

  // Handle minimize toggle with analytics
  const handleMinimizeToggle = useCallback(() => {
    const newMinimized = !isMinimized;
    setIsMinimized(newMinimized);
    trackChatbotMinimize(newMinimized);
  }, [isMinimized, trackChatbotMinimize]);

  // Keyboard navigation and accessibility
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      // Close chatbot with Escape key
      if (event.key === "Escape" && isOpen) {
        handleChatbotToggle(false);
        return;
      }

      // Toggle chatbot with Ctrl+Shift+C
      if (event.ctrlKey && event.shiftKey && event.key === "C") {
        event.preventDefault();
        handleChatbotToggle(!isOpen);

        // Focus input when opening
        if (!isOpen) {
          setTimeout(() => {
            inputRef.current?.focus();
          }, 100);
        }
        return;
      }

      // Focus input field when chatbot is open and user starts typing (letters/numbers only)
      if (isOpen && !isMinimized && event.target !== inputRef.current) {
        const isAlphaNumeric = /^[a-zA-Z0-9]$/.test(event.key);
        if (
          isAlphaNumeric &&
          !event.ctrlKey &&
          !event.altKey &&
          !event.metaKey
        ) {
          inputRef.current?.focus();
        }
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, isMinimized, handleChatbotToggle]);

  // Periodic session saving
  useEffect(() => {
    if (isOpen && messages.length > 1) {
      const interval = setInterval(() => {
        saveCurrentSession(messages, {
          currentPage,
          sessionStartTime,
          conversationTurn,
        });
      }, 30000); // Save every 30 seconds

      return () => clearInterval(interval);
    }
  }, [
    isOpen,
    messages,
    currentPage,
    sessionStartTime,
    conversationTurn,
    saveCurrentSession,
  ]);

  // Handle history panel toggle
  const handleHistoryToggle = useCallback(() => {
    setShowHistory(!showHistory);
  }, [showHistory]);

  // Enhanced AI response generation with better error handling
  const generateArmyResponse = useCallback(
    async (userMessage: string): Promise<string> => {
      const startTime = Date.now();

      try {
        // Enhanced context including search integration
        const pageContext = {
          ...estimatorData,
          currentPage,
          isEstimatorPage: currentPage?.includes("/estimator"),
          isHomePage: currentPage === "/",
          isServicesPage: currentPage?.includes("/services"),
          isProjectsPage: currentPage?.includes("/projects"),
          isAboutPage: currentPage?.includes("/about"),
          isContactPage: currentPage?.includes("/contact"),
          isBookingPage: currentPage?.includes("/booking"),
          conversationHistory: messages.slice(-3), // Last 3 messages for context
          sessionData: {
            messageCount: messages.length,
            sessionDuration: sessionStartTime
              ? (Date.now() - sessionStartTime.getTime()) / 1000
              : 0,
          },
        };

        // Advanced lead qualification analysis
        const businessKeywords = [
          "project",
          "estimate",
          "cost",
          "budget",
          "build",
          "construction",
          "remodel",
          "renovation",
          "addition",
          "kitchen",
          "bathroom",
          "commercial",
          "consultation",
          "quote",
          "price",
          "timeline",
          "contractor",
          "hire",
          "service",
          "work",
          "job",
          "planning",
          "design",
          "materials",
        ];

        const veteranKeywords = [
          "veteran",
          "military",
          "service",
          "army",
          "navy",
          "marines",
          "air force",
          "coast guard",
          "va",
          "disability",
          "ptsd",
        ];

        const urgentKeywords = [
          "urgent",
          "emergency",
          "asap",
          "immediately",
          "soon",
          "quickly",
          "critical",
        ];

        const hasBusinessKeyword = businessKeywords.some((keyword) =>
          userMessage.toLowerCase().includes(keyword),
        );

        const isVeteranLead = veteranKeywords.some((keyword) =>
          userMessage.toLowerCase().includes(keyword),
        );

        const isUrgent = urgentKeywords.some((keyword) =>
          userMessage.toLowerCase().includes(keyword),
        );

        // Generate AI response using the enhanced system
        let response: string;

        if (isVeteranLead && hasBusinessKeyword) {
          const veteranAnalysis =
            militaryConstructionAI.analyzeVeteranStatus(userMessage);
          const veteranPriority = militaryConstructionAI.processVeteranPriority(
            veteranAnalysis,
            { message: userMessage },
          );

          response = `[VETERAN PRIORITY PROTOCOL ACTIVATED]\n\n${militaryConstructionAI.getLeadQualificationGuidance(userMessage, pageContext)}\n\nVETERAN SUPPORT SERVICES:\n• ${veteranPriority.supportServices.join("\n• ")}\n\nEXPEDITED PROCESSING: ${veteranPriority.expeditedTimeline ? "ACTIVE" : "STANDARD"}\n\n---\nThank you for your service! Your project has been prioritized.`;

          // Track veteran lead
          trackChatbotLeadGenerated(
            "veteran",
            "critical",
            extractProjectType(userMessage),
          );
        } else if (hasBusinessKeyword) {
          response = militaryConstructionAI.getLeadQualificationGuidance(
            userMessage,
            pageContext,
          );
          trackChatbotLeadGenerated(
            "standard",
            "high",
            extractProjectType(userMessage),
          );
        } else if (pageContext.isContactPage) {
          response = militaryConstructionAI.getContactFormAssistance(
            userMessage,
            pageContext,
          );
        } else if (pageContext.isBookingPage) {
          response = militaryConstructionAI.getBookingFormAssistance(
            userMessage,
            pageContext,
          );
        } else {
          response = militaryConstructionAI.generateResponse(
            userMessage,
            pageContext,
          );
        }

        // Add response time metadata
        const responseTime = Date.now() - startTime;

        // Enhanced response with search integration if relevant
        if (
          userMessage.toLowerCase().includes("search") ||
          userMessage.toLowerCase().includes("find")
        ) {
          response += `\n\nPro Tip: Use our advanced search on the projects page to find specific examples of our work!`;
        }

        return response;
      } catch (error) {
        logger.error("AI Response Error:", error);
        trackChatbotError(
          "ai_response",
          error instanceof Error ? error.message : "Unknown error",
        );

        return "[SYSTEM UPDATE] My tactical systems are temporarily offline. Please stand by while I reconnect to base command, or contact our team directly at (509) 308-6489 for immediate assistance.";
      }
    },
    [
      currentPage,
      estimatorData,
      messages,
      sessionStartTime,
      trackChatbotLeadGenerated,
      trackChatbotError,
      extractProjectType,
    ],
  );

  // Enhanced message sending with analytics and better UX
  const handleSendMessage = useCallback(async () => {
    if (!inputValue.trim() || isTyping) return;

    const userMessage: ChatMessage = {
      id: `user_${Date.now()}`,
      type: "user",
      content: inputValue.trim(),
      timestamp: new Date(),
    };

    // Analytics tracking
    trackChatbotMessage(
      "user",
      inputValue.length,
      conversationTurn + 1,
      inputValue,
    );

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setIsTyping(true);
    setConversationTurn((prev) => prev + 1);

    try {
      // Update conversation memory with new message
      setConversationMemory((prev) => ({
        ...prev,
        sessionMetrics: {
          ...prev.sessionMetrics!,
          messageCount: prev.sessionMetrics!.messageCount + 1,
        },
      }));

      // Update enhanced context
      const updatedContext: EnhancedChatbotContext = {
        ...enhancedContext,
        currentPage,
        estimatorData,
        conversationMemory,
      };

      // Simulate realistic AI thinking time based on message complexity
      const thinkingTime = Math.min(
        Math.max(inputValue.length * 50, 800),
        2500,
      );

      // Use enhanced AI for response generation
      const botResponse = enhancedChatbotAI.generateEnhancedResponse(
        inputValue.trim(),
        updatedContext,
        messages,
      );

      setTimeout(() => {
        const botMessage: ChatMessage = {
          id: `bot_${Date.now()}`,
          type: "bot",
          content: botResponse,
          timestamp: new Date(),
          metadata: {
            responseTime: thinkingTime,
            isLead: /project|estimate|cost|budget|contact|consultation/.test(
              inputValue.toLowerCase(),
            ),
            isVeteran: /veteran|military|service/.test(
              inputValue.toLowerCase(),
            ),
            priority: /urgent|emergency|asap/.test(inputValue.toLowerCase())
              ? "critical"
              : "medium",
          },
        };

        setMessages((prev) => [...prev, botMessage]);
        setIsTyping(false);

        // Track bot response
        trackChatbotMessage("bot", botResponse.length, conversationTurn + 1);

        // Update enhanced context with response data
        setEnhancedContext((prev) => ({
          ...prev,
          conversationMemory: {
            ...prev.conversationMemory,
            sessionMetrics: {
              messageCount:
                (prev.conversationMemory?.sessionMetrics?.messageCount || 0) +
                1,
              sessionDuration:
                prev.conversationMemory?.sessionMetrics?.sessionDuration || 0,
              leadsGenerated:
                prev.conversationMemory?.sessionMetrics?.leadsGenerated || 0,
              topicsDiscussed:
                prev.conversationMemory?.sessionMetrics?.topicsDiscussed || [],
            },
          },
        }));

        // Check for lead generation
        if (botMessage.metadata?.isLead) {
          trackChatbotLeadGenerated(
            botMessage.metadata.isVeteran ? "veteran" : "standard",
            "medium",
          );
        }
      }, thinkingTime);
    } catch (error) {
      logger.error("Message sending error:", error);
      setIsTyping(false);
      trackChatbotError(
        "connection",
        error instanceof Error ? error.message : "Unknown error",
      );
    }
  }, [
    inputValue,
    isTyping,
    conversationTurn,
    trackChatbotMessage,
    trackChatbotError,
    trackChatbotLeadGenerated,
    conversationMemory,
    currentPage,
    enhancedContext,
    estimatorData,
    messages,
  ]);

  // Keyboard handling with accessibility improvements
  const handleKeyPress = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        handleSendMessage();
      } else if (e.key === "Escape") {
        setIsOpen(false);
      }
    },
    [handleSendMessage],
  );

  // Enhanced dragging with position tracking
  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    if (
      e.target !== e.currentTarget &&
      !(e.target as Element).closest(".drag-handle")
    )
      return;

    const rect = chatbotRef.current?.getBoundingClientRect();
    if (rect) {
      setIsDragging(true);
      setDragOffset({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
    }
  }, []);

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (!isDragging || !chatbotRef.current) return;

      const newX = e.clientX - dragOffset.x;
      const newY = e.clientY - dragOffset.y;

      // Constrain to viewport
      const maxX = window.innerWidth - chatbotRef.current.offsetWidth;
      const maxY = window.innerHeight - chatbotRef.current.offsetHeight;

      const constrainedX = Math.max(0, Math.min(newX, maxX));
      const constrainedY = Math.max(0, Math.min(newY, maxY));

      setPosition({ x: constrainedX, y: constrainedY });
    },
    [isDragging, dragOffset],
  );

  const handleMouseUp = useCallback(() => {
    if (isDragging) {
      setIsDragging(false);

      // Track drag analytics
      const positionString = `${Math.round(position.x)},${Math.round(position.y)}`;
      trackChatbotDrag("previous", positionString);
    }
  }, [isDragging, position, trackChatbotDrag]);

  // Mouse event listeners
  useEffect(() => {
    if (isDragging) {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
      return () => {
        document.removeEventListener("mousemove", handleMouseMove);
        document.removeEventListener("mouseup", handleMouseUp);
      };
    }
  }, [isDragging, handleMouseMove, handleMouseUp]);

  // Position management with mobile responsiveness
  useEffect(() => {
    const updatePosition = () => {
      if (!isDragging) {
        const isMobile = window.innerWidth <= 640; // Tailwind's sm breakpoint
        const chatbotWidth = isMobile
          ? Math.min(window.innerWidth - 32, 360)
          : 400; // Responsive width
        const padding = isMobile ? 16 : 24; // Smaller padding on mobile

        setPosition({
          x: isMobile ? padding : window.innerWidth - chatbotWidth - padding,
          y:
            window.innerHeight -
            (isOpen
              ? (isMobile ? Math.min(window.innerHeight - 100, 500) : 624) +
                padding
              : 104), // Responsive height
        });
      }
    };

    updatePosition();
    window.addEventListener("resize", updatePosition);
    return () => window.removeEventListener("resize", updatePosition);
  }, [isOpen, isDragging]);

  // Memoized quick actions for better performance
  const quickActions = useMemo(
    () => [
      {
        label: "Get Partnership Estimate",
        icon: "handshake",
        action: () =>
          setInputValue(
            "I'd like to explore a construction partnership and get an estimate",
          ),
      },
      {
        label: "Our Services",
        icon: "construction",
        action: () =>
          setInputValue("What construction services does MH offer?"),
      },
      {
        label: "Veteran Benefits",
        icon: "military_tech",
        action: () =>
          setInputValue("What special services do you offer for veterans?"),
      },
      {
        label: "Schedule Consultation",
        icon: "event",
        action: () =>
          setInputValue(
            "I'd like to schedule a free consultation with MH Construction",
          ),
      },
    ],
    [],
  );

  // Floating AI Icon (when closed)
  if (!isOpen) {
    return (
      <div
        className="z-40 fixed bottom-24 right-6 sm:bottom-28 sm:right-8"
        onMouseDown={handleMouseDown}
      >
        <div
          className="cursor-pointer group transform hover:scale-110 transition-all duration-500 ease-out relative"
          onClick={(e) => {
            e.stopPropagation();
            handleChatbotToggle(true);
          }}
          aria-label="Open MH Construction AI Assistant"
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              handleChatbotToggle(true);
            }
          }}
        >
          {/* Tan glow effect background */}
          <div className="absolute inset-0 bg-brand-secondary rounded-full blur-xl opacity-0 group-hover:opacity-60 transition-all duration-500 scale-150 animate-pulse-slow" />

          {/* Large icon without container */}
          <MaterialIcon
            icon="smart_toy"
            size="3xl"
            className="relative text-brand-primary group-hover:text-brand-secondary transition-all duration-500 drop-shadow-2xl group-hover:drop-shadow-[0_0_25px_rgba(189,146,100,0.6)] filter group-hover:brightness-110"
          />
        </div>

        {/* Enhanced Tooltip with brand colors */}
        <div className="bottom-full right-0 absolute bg-gradient-to-r from-brand-primary to-brand-accent mb-4 px-5 py-3 rounded-xl text-white text-sm font-semibold whitespace-nowrap opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none hidden sm:block shadow-2xl border border-brand-secondary/30 backdrop-blur-sm">
          MH Construction - AI Assistant
          <div className="top-full right-6 absolute border-l-transparent border-r-transparent border-t-brand-primary border-4"></div>
        </div>
      </div>
    );
  }

  // Full Chatbot Interface
  return (
    <div
      ref={chatbotRef}
      className="z-50 fixed bottom-16 right-4 sm:bottom-20 sm:right-6 w-[380px] sm:w-[450px] max-w-[calc(100vw-2rem)] h-[550px] sm:h-[650px] max-h-[calc(100vh-8rem)] animate-scale-in"
      role="dialog"
      aria-labelledby="chatbot-title"
      aria-describedby="chatbot-description"
      aria-modal="true"
      aria-live="polite"
    >
      <Card className="flex flex-col bg-gradient-to-br from-white via-white to-brand-light/10 dark:from-gray-800 dark:via-gray-800 dark:to-brand-dark/10 shadow-2xl border-3 border-brand-secondary/40 dark:border-brand-secondary/50 h-full transition-all duration-300 relative rounded-2xl overflow-hidden backdrop-blur-sm">
        {/* Decorative corner accent */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-brand-secondary/20 to-transparent rounded-bl-full pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-brand-primary/10 to-transparent rounded-tr-full pointer-events-none" />

        {/* Conversation History Panel */}
        <ConversationHistoryPanel
          history={conversationHistory}
          onExportConversation={exportConversation}
          onClearHistory={clearHistory}
          isVisible={showHistory}
          onClose={() => setShowHistory(false)}
        />

        {/* Skip link for accessibility */}
        <a
          href="#chatbot-input"
          className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 bg-brand-primary text-white px-3 py-1 rounded z-10"
        >
          Skip to chat input
        </a>

        {/* Header - Always visible with enhanced design */}
        <CardHeader className="bg-gradient-to-r from-brand-primary via-brand-accent to-brand-primary dark:from-brand-primary dark:via-brand-accent dark:to-brand-primary px-5 py-4 text-white shadow-xl flex-shrink-0 relative overflow-hidden rounded-t-2xl">
          {/* Animated background pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1),transparent_50%)]" />
          </div>

          <div className="flex justify-between items-center relative z-10">
            <div className="flex items-center space-x-3 min-w-0 flex-1">
              <div className="relative">
                <MaterialIcon
                  icon="smart_toy"
                  size="md"
                  className="text-white w-8 h-8 flex-shrink-0 drop-shadow-lg"
                />
                {/* Status indicator */}
                <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-400 rounded-full border-2 border-white animate-pulse" />
              </div>
              <div className="min-w-0 flex-1">
                <h3
                  id="chatbot-title"
                  className="font-bold text-xl truncate text-shadow-lg"
                >
                  MH Assistant
                </h3>
                <p
                  id="chatbot-description"
                  className="opacity-95 text-sm truncate font-semibold"
                >
                  AI Construction Intelligence
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-2 flex-shrink-0">
              <Button
                variant="ghost"
                size="sm"
                onClick={(e) => {
                  e.stopPropagation();
                  handleHistoryToggle();
                }}
                className="hover:bg-white/30 p-2.5 w-10 h-10 text-white transition-all duration-300 touch-manipulation rounded-xl backdrop-blur-sm shadow-lg hover:shadow-xl hover:scale-110"
                aria-label="View conversation history"
                title="Conversation History"
              >
                <MaterialIcon icon="history" size="sm" className="w-5 h-5" />
              </Button>

              <Button
                variant="ghost"
                size="sm"
                onClick={(e) => {
                  e.stopPropagation();
                  handleMinimizeToggle();
                }}
                className="hover:bg-white/30 p-2.5 w-10 h-10 text-white transition-all duration-300 touch-manipulation rounded-xl backdrop-blur-sm shadow-lg hover:shadow-xl hover:scale-110"
                aria-label={isMinimized ? "Expand chat" : "Minimize chat"}
              >
                {isMinimized ? (
                  <MaterialIcon
                    icon="open_in_full"
                    size="sm"
                    className="w-5 h-5"
                  />
                ) : (
                  <MaterialIcon
                    icon="close_fullscreen"
                    size="sm"
                    className="w-5 h-5"
                  />
                )}
              </Button>

              <Button
                variant="ghost"
                size="sm"
                onClick={(e) => {
                  e.stopPropagation();
                  handleChatbotToggle(false);
                }}
                className="hover:bg-red-500/30 p-2.5 w-10 h-10 text-white transition-all duration-300 touch-manipulation rounded-xl backdrop-blur-sm shadow-lg hover:shadow-xl hover:scale-110"
                aria-label="Close chat"
              >
                <MaterialIcon icon="close" size="sm" className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </CardHeader>

        {/* Chat Content - Hidden when minimized */}
        {!isMinimized && (
          <div className="flex flex-col flex-1 overflow-hidden relative z-10">
            {/* Messages with enhanced background */}
            <div
              className="flex-1 space-y-4 bg-gradient-to-b from-white via-brand-light/5 to-white dark:from-gray-900 dark:via-brand-dark/5 dark:to-gray-900 p-4 overflow-y-scroll chat-content border-t-2 border-brand-secondary/20 dark:border-brand-secondary/30 h-0"
              role="log"
              aria-live="polite"
              aria-label="Chat conversation"
              aria-describedby="chatbot-description"
            >
              {/* Screen reader announcement for new messages */}
              <div
                className="sr-only"
                aria-live="assertive"
                aria-atomic="true"
                id="message-announcements"
              >
                {messages.length > 1 &&
                  messages[messages.length - 1].type === "bot" &&
                  `New message from General MH: ${messages[messages.length - 1].content.substring(0, 100)}...`}
              </div>
              {/* Optimized message rendering */}
              {memoizedMessages.map(({ message, formattedContent }, index) => (
                <div key={message.id}>
                  <ChatMessage
                    message={message}
                    formattedContent={formattedContent || []}
                  />
                  {/* Quick Action Buttons for bot messages */}
                  {message.type === "bot" && index === 0 && (
                    <div className="flex flex-wrap gap-2 justify-start mt-2 ml-2">
                      <button
                        onClick={() =>
                          setInputValue("Tell me about your services")
                        }
                        className="bg-brand-primary/10 hover:bg-brand-primary/20 dark:bg-brand-primary/20 dark:hover:bg-brand-primary/30 px-3 py-1.5 rounded-lg text-brand-primary dark:text-brand-light text-xs font-medium transition-all duration-200 border border-brand-primary/30"
                      >
                        Services
                      </button>
                      <button
                        onClick={() =>
                          setInputValue("Show me your past projects")
                        }
                        className="bg-brand-primary/10 hover:bg-brand-primary/20 dark:bg-brand-primary/20 dark:hover:bg-brand-primary/30 px-3 py-1.5 rounded-lg text-brand-primary dark:text-brand-light text-xs font-medium transition-all duration-200 border border-brand-primary/30"
                      >
                        Projects
                      </button>
                      <button
                        onClick={() => setInputValue("I need a cost estimate")}
                        className="bg-brand-primary/10 hover:bg-brand-primary/20 dark:bg-brand-primary/20 dark:hover:bg-brand-primary/30 px-3 py-1.5 rounded-lg text-brand-primary dark:text-brand-light text-xs font-medium transition-all duration-200 border border-brand-primary/30"
                      >
                        Get Estimate
                      </button>
                      <button
                        onClick={() =>
                          setInputValue(
                            "I'm a veteran, what benefits are available?",
                          )
                        }
                        className="bg-brand-secondary/10 hover:bg-brand-secondary/20 dark:bg-brand-secondary/20 dark:hover:bg-brand-secondary/30 px-3 py-1.5 rounded-lg text-brand-secondary dark:text-brand-secondary text-xs font-medium transition-all duration-200 border border-brand-secondary/30"
                      >
                        Veteran Services
                      </button>
                      <button
                        onClick={() =>
                          setInputValue("How do I contact your team?")
                        }
                        className="bg-brand-primary/10 hover:bg-brand-primary/20 dark:bg-brand-primary/20 dark:hover:bg-brand-primary/30 px-3 py-1.5 rounded-lg text-brand-primary dark:text-brand-light text-xs font-medium transition-all duration-200 border border-brand-primary/30"
                      >
                        Contact
                      </button>
                    </div>
                  )}
                </div>
              ))}

              {/* Enhanced Typing Indicator with bronze accent */}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-gradient-to-br from-white to-brand-light/30 dark:from-gray-800 dark:to-brand-dark/30 shadow-lg p-3 sm:p-4 border-2 border-brand-secondary/30 dark:border-brand-secondary/40 rounded-xl backdrop-blur-sm">
                    <div className="flex items-center space-x-3">
                      <div className="relative">
                        <MaterialIcon
                          icon="smart_toy"
                          size="sm"
                          className="text-brand-secondary w-5 h-5"
                        />
                        <div className="absolute inset-0 bg-brand-secondary/20 rounded-full blur-sm animate-pulse" />
                      </div>
                      <span className="text-gray-700 dark:text-gray-300 text-sm sm:text-base font-semibold">
                        MH Assistant is analyzing...
                      </span>
                      <div className="flex space-x-1">
                        <div className="bg-brand-secondary rounded-full w-2 h-2 sm:w-2.5 sm:h-2.5 animate-bounce shadow-lg"></div>
                        <div
                          className="bg-brand-primary rounded-full w-2 h-2 sm:w-2.5 sm:h-2.5 animate-bounce shadow-lg"
                          style={{ animationDelay: "0.1s" }}
                        ></div>
                        <div
                          className="bg-brand-secondary rounded-full w-2 h-2 sm:w-2.5 sm:h-2.5 animate-bounce shadow-lg"
                          style={{ animationDelay: "0.2s" }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Enhanced Input Area with gradient and improved styling */}
            <div className="bg-gradient-to-r from-gray-50 via-brand-light/10 to-gray-50 dark:from-gray-800 dark:via-brand-dark/10 dark:to-gray-800 p-4 border-t-2 border-brand-secondary/30 dark:border-brand-secondary/40 flex-shrink-0 relative backdrop-blur-sm">
              {/* Subtle top highlight */}
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-brand-secondary/50 to-transparent" />

              <div className="flex space-x-3">
                <input
                  id="chatbot-input"
                  ref={inputRef}
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Tell us about your construction partnership needs..."
                  className="flex-1 px-5 py-3.5 border-2 border-brand-secondary/40 dark:border-brand-secondary/50 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:border-brand-secondary dark:focus:border-brand-secondary focus:ring-3 focus:ring-brand-secondary/30 focus:outline-none rounded-xl transition-all duration-300 text-sm font-medium shadow-lg hover:shadow-xl placeholder:text-gray-500 dark:placeholder:text-gray-400"
                  disabled={isTyping}
                  aria-label="Type your message to MH Assistant"
                  aria-describedby="input-help"
                />
                <Button
                  onClick={handleSendMessage}
                  disabled={!inputValue.trim() || isTyping}
                  className="bg-gradient-to-r from-brand-primary to-brand-accent hover:from-brand-accent hover:to-brand-primary border-2 border-brand-secondary/50 dark:border-brand-secondary/60 px-5 py-3.5 transition-all duration-300 touch-manipulation rounded-xl shadow-xl hover:shadow-2xl disabled:opacity-50 disabled:cursor-not-allowed hover:scale-105 active:scale-95"
                  aria-label="Send message"
                >
                  <MaterialIcon
                    icon="send"
                    size="sm"
                    className="w-5 h-5 text-white"
                  />
                </Button>
              </div>
            </div>
          </div>
        )}
      </Card>
    </div>
  );
}
