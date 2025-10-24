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
import { militaryConstructionAI } from "@/lib/militaryConstructionAI";
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
        "**General MH** reporting for duty! 🎖️\n\nI'm your **AI construction intelligence officer**, ready to provide **tactical guidance** on your building missions. Whether you need:\n\n• **Reconnaissance** on materials and costs\n• **Strategic planning** for timelines\n• **Intel** on veteran benefits\n• **Mission briefing** on project scope\n\n**What's your construction objective today, soldier?**",
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
              message
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
                2500
              );

              // Use enhanced AI for response generation
              const botResponse = enhancedChatbotAI.generateEnhancedResponse(
                message.trim(),
                updatedContext,
                messages
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
                        message.toLowerCase()
                      ),
                    isVeteran: /veteran|military|service/.test(
                      message.toLowerCase()
                    ),
                    priority: /urgent|emergency|asap/.test(
                      message.toLowerCase()
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
                  conversationTurn + 1
                );

                // Check for lead generation
                if (botMessage.metadata?.isLead) {
                  trackChatbotLeadGenerated(
                    botMessage.metadata.isVeteran ? "veteran" : "standard",
                    "medium"
                  );
                }
              }, thinkingTime);
            } catch (error) {
              console.error("Quick action message error:", error);
              setIsTyping(false);
              trackChatbotError(
                "connection",
                error instanceof Error ? error.message : "Unknown error"
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
    ]
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
              messages.find((m) => m.type === "user")?.content || ""
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
    ]
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
          userMessage.toLowerCase().includes(keyword)
        );

        const isVeteranLead = veteranKeywords.some((keyword) =>
          userMessage.toLowerCase().includes(keyword)
        );

        const isUrgent = urgentKeywords.some((keyword) =>
          userMessage.toLowerCase().includes(keyword)
        );

        // Generate AI response using the enhanced system
        let response: string;

        if (isVeteranLead && hasBusinessKeyword) {
          const veteranAnalysis =
            militaryConstructionAI.analyzeVeteranStatus(userMessage);
          const veteranPriority = militaryConstructionAI.processVeteranPriority(
            veteranAnalysis,
            { message: userMessage }
          );

          response = `**[VETERAN PRIORITY PROTOCOL ACTIVATED]** 🇺🇸\n\n${militaryConstructionAI.getLeadQualificationGuidance(userMessage, pageContext)}\n\n**VETERAN SUPPORT SERVICES:**\n• ${veteranPriority.supportServices.join("\n• ")}\n\n**EXPEDITED PROCESSING:** ${veteranPriority.expeditedTimeline ? "ACTIVE" : "STANDARD"}\n\n---\n**Thank you for your service! Your project has been prioritized.**`;

          // Track veteran lead
          trackChatbotLeadGenerated(
            "veteran",
            "critical",
            extractProjectType(userMessage)
          );
        } else if (hasBusinessKeyword) {
          response = militaryConstructionAI.getLeadQualificationGuidance(
            userMessage,
            pageContext
          );
          trackChatbotLeadGenerated(
            "standard",
            "high",
            extractProjectType(userMessage)
          );
        } else if (pageContext.isContactPage) {
          response = militaryConstructionAI.getContactFormAssistance(
            userMessage,
            pageContext
          );
        } else if (pageContext.isBookingPage) {
          response = militaryConstructionAI.getBookingFormAssistance(
            userMessage,
            pageContext
          );
        } else {
          response = militaryConstructionAI.generateResponse(
            userMessage,
            pageContext
          );
        }

        // Add response time metadata
        const responseTime = Date.now() - startTime;

        // Enhanced response with search integration if relevant
        if (
          userMessage.toLowerCase().includes("search") ||
          userMessage.toLowerCase().includes("find")
        ) {
          response += `\n\n💡 **Pro Tip:** Use our advanced search on the projects page to find specific examples of our work. Just press Ctrl+K to quick-search anywhere on the site!`;
        }

        return response;
      } catch (error) {
        console.error("AI Response Error:", error);
        trackChatbotError(
          "ai_response",
          error instanceof Error ? error.message : "Unknown error"
        );

        return "**[SYSTEM UPDATE]** My tactical systems are temporarily offline. Please stand by while I reconnect to base command, or contact our team directly at (509) 308-6489 for immediate assistance.";
      }
    },
    [
      estimatorData,
      currentPage,
      messages,
      sessionStartTime,
      trackChatbotLeadGenerated,
      trackChatbotError,
      extractProjectType,
    ]
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
      inputValue
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
        2500
      );

      // Use enhanced AI for response generation
      const botResponse = enhancedChatbotAI.generateEnhancedResponse(
        inputValue.trim(),
        updatedContext,
        messages
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
              inputValue.toLowerCase()
            ),
            isVeteran: /veteran|military|service/.test(
              inputValue.toLowerCase()
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
            "medium"
          );
        }
      }, thinkingTime);
    } catch (error) {
      console.error("Message sending error:", error);
      setIsTyping(false);
      trackChatbotError(
        "connection",
        error instanceof Error ? error.message : "Unknown error"
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
    [handleSendMessage]
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
    [isDragging, dragOffset]
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

  // Position management
  useEffect(() => {
    const updatePosition = () => {
      if (!isDragging) {
        setPosition({
          x: window.innerWidth - 424, // 400px width + 24px padding
          y: window.innerHeight - (isOpen ? 624 : 104), // height + padding
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
        label: "Get Estimate",
        icon: "calculate",
        action: () => setInputValue("I need a project estimate"),
      },
      {
        label: "View Services",
        icon: "build",
        action: () => setInputValue("What services do you offer?"),
      },
      {
        label: "Veteran Benefits",
        icon: "military_tech",
        action: () => setInputValue("What veteran benefits are available?"),
      },
      {
        label: "Schedule Consultation",
        icon: "calendar_today",
        action: () => setInputValue("I'd like to schedule a consultation"),
      },
    ],
    []
  );

  // Floating AI Icon (when closed)
  if (!isOpen) {
    return (
      <div
        ref={chatbotRef}
        className="z-50 fixed cursor-move"
        style={{
          right: `${24}px`,
          bottom: `${24}px`,
        }}
        onMouseDown={handleMouseDown}
      >
        <Button
          onClick={(e) => {
            e.stopPropagation();
            handleChatbotToggle(true);
          }}
          className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 shadow-2xl p-4 rounded-full text-white hover:scale-110 transition-all duration-300 transform touch-manipulation group"
          aria-label="Open MH Construction AI Assistant"
          size="lg"
        >
          <div className="relative">
            <MaterialIcon
              icon="smart_toy"
              size="xl"
              className="text-white group-hover:animate-pulse"
            />
            <div className="top-0 right-0 absolute bg-green-400 rounded-full w-3 h-3 animate-ping"></div>
            <div className="top-0 right-0 absolute bg-green-500 rounded-full w-3 h-3"></div>
          </div>
        </Button>

        {/* Tooltip */}
        <div className="bottom-full right-0 absolute bg-gray-900 mb-2 px-3 py-2 rounded-lg text-white text-sm whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
          General MH - AI Assistant
          <div className="top-full right-4 absolute border-l-transparent border-r-transparent border-t-gray-900 border-4"></div>
        </div>
      </div>
    );
  }

  // Full Chatbot Interface
  return (
    <div
      ref={chatbotRef}
      className="z-50 fixed"
      style={{
        right: `${24}px`,
        bottom: `${24}px`,
        width: "400px",
        height: isMinimized ? "60px" : "600px",
      }}
      onMouseDown={handleMouseDown}
      role="dialog"
      aria-labelledby="chatbot-title"
      aria-describedby="chatbot-description"
      aria-modal="true"
      aria-live="polite"
    >
      <Card className="flex flex-col bg-white dark:bg-gray-800 shadow-2xl border-2 border-green-700/20 dark:border-green-500/20 h-full overflow-hidden transition-all duration-300 relative">
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
          className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 bg-green-600 text-white px-3 py-1 rounded z-10"
        >
          Skip to chat input
        </a>

        {/* Header - Always visible */}
        <CardHeader className="bg-gradient-to-r from-green-800 to-green-900 dark:from-green-700 dark:to-green-800 p-3 text-white cursor-move drag-handle">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-3">
              <div className="relative">
                <MaterialIcon
                  icon="smart_toy"
                  size="lg"
                  className="text-green-300"
                />
                <div
                  className="-top-1 -right-1 absolute bg-green-400 rounded-full w-3 h-3 animate-pulse"
                  aria-hidden="true"
                ></div>
              </div>
              <div>
                <h3 id="chatbot-title" className="font-bold text-lg">
                  General MH
                </h3>
                <p id="chatbot-description" className="opacity-90 text-sm">
                  AI Construction Officer
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-1">
              <Button
                variant="ghost"
                size="sm"
                onClick={(e) => {
                  e.stopPropagation();
                  handleHistoryToggle();
                }}
                className="hover:bg-white/20 p-0 w-8 h-8 text-white transition-colors"
                aria-label="View conversation history"
                title="Conversation History"
              >
                <MaterialIcon icon="history" size="sm" />
              </Button>

              <Button
                variant="ghost"
                size="sm"
                onClick={(e) => {
                  e.stopPropagation();
                  handleMinimizeToggle();
                }}
                className="hover:bg-white/20 p-0 w-8 h-8 text-white transition-colors"
                aria-label={isMinimized ? "Expand chat" : "Minimize chat"}
              >
                {isMinimized ? (
                  <MaterialIcon icon="open_in_full" size="sm" />
                ) : (
                  <MaterialIcon icon="close_fullscreen" size="sm" />
                )}
              </Button>

              <Button
                variant="ghost"
                size="sm"
                onClick={(e) => {
                  e.stopPropagation();
                  handleChatbotToggle(false);
                }}
                className="hover:bg-white/20 p-0 w-8 h-8 text-white transition-colors"
                aria-label="Close chat"
              >
                <MaterialIcon icon="close" size="sm" />
              </Button>
            </div>
          </div>
        </CardHeader>

        {/* Chat Content - Hidden when minimized */}
        {!isMinimized && (
          <>
            {/* Quick Actions */}
            {messages.length === 1 && (
              <div className="bg-green-50 dark:bg-green-900/20 p-3 border-b border-green-200 dark:border-green-700">
                <p className="mb-2 text-green-800 dark:text-green-300 text-sm font-medium">
                  Quick Actions:
                </p>
                <div className="gap-2 grid grid-cols-2">
                  {quickActions.map((action, index) => (
                    <button
                      key={index}
                      onClick={action.action}
                      className="flex items-center justify-center space-x-1 bg-white dark:bg-gray-700 hover:bg-green-100 dark:hover:bg-green-800 p-2 border border-green-200 dark:border-green-600 rounded-lg text-green-700 dark:text-green-300 text-xs transition-colors"
                    >
                      <MaterialIcon icon={action.icon} size="sm" />
                      <span>{action.label}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Messages */}
            <div
              className="flex-1 space-y-4 bg-gray-50 dark:bg-gray-900 p-4 overflow-y-auto chat-content"
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
              {memoizedMessages.map(({ message, formattedContent }) => (
                <ChatMessage
                  key={message.id}
                  message={message}
                  formattedContent={formattedContent || []}
                />
              ))}

              {/* Enhanced Typing Indicator */}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-white dark:bg-gray-800 shadow-sm p-3 border border-gray-200 dark:border-gray-700 rounded-lg">
                    <div className="flex items-center space-x-2">
                      <MaterialIcon
                        icon="smart_toy"
                        size="sm"
                        className="text-green-600"
                      />
                      <span className="text-gray-600 dark:text-gray-400 text-sm">
                        General MH is analyzing...
                      </span>
                      <div className="flex space-x-1">
                        <div className="bg-green-400 rounded-full w-2 h-2 animate-bounce"></div>
                        <div
                          className="bg-green-400 rounded-full w-2 h-2 animate-bounce"
                          style={{ animationDelay: "0.1s" }}
                        ></div>
                        <div
                          className="bg-green-400 rounded-full w-2 h-2 animate-bounce"
                          style={{ animationDelay: "0.2s" }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Quick Action Menu */}
            {showQuickActions &&
              messages.length === 1 &&
              !isTyping &&
              !inputValue.trim() && (
                <div className="px-4">
                  <QuickActionMenu
                    onActionSelect={handleQuickActionSelect}
                    isVisible={true}
                    currentPage={currentPage}
                  />
                </div>
              )}

            {/* Enhanced Input Area */}
            <div className="bg-white dark:bg-gray-800 p-4 border-t border-gray-200 dark:border-gray-700">
              <div className="flex space-x-2">
                <input
                  id="chatbot-input"
                  ref={inputRef}
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Enter your construction mission details..."
                  className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:border-green-600 dark:focus:border-green-500 focus:ring-2 focus:ring-green-600/20 focus:outline-none rounded-md transition-colors"
                  disabled={isTyping}
                  aria-label="Type your message to General MH"
                  aria-describedby="input-help"
                />
                <Button
                  onClick={handleSendMessage}
                  disabled={!inputValue.trim() || isTyping}
                  className="bg-green-600 hover:bg-green-700 dark:bg-green-700 dark:hover:bg-green-800 px-3 transition-colors"
                  aria-label="Send message"
                >
                  <MaterialIcon icon="send" size="sm" />
                </Button>
              </div>

              <div
                id="input-help"
                className="flex justify-between items-center mt-2 text-gray-500 dark:text-gray-400 text-xs"
                role="note"
                aria-label="Chatbot keyboard shortcuts and information"
              >
                <span>🎖️ **Tactical AI** - Military precision</span>
                <span>
                  Drag to move • ESC to close • Ctrl+Shift+C to toggle
                </span>
              </div>
            </div>
          </>
        )}
      </Card>
    </div>
  );
}
