/**
 * Chatbot Handlers Hook
 *
 * Contains all event handlers and user interactions for the GlobalChatbot
 */

import {
  useCallback,
  useEffect,
  type KeyboardEvent,
  type MouseEvent,
} from "react";
import { type ChatMessage } from "./useChatbotState";
import {
  enhancedChatbotAI,
  type EnhancedChatbotContext,
  type ConversationMemory,
} from "@/lib/chatbot/EnhancedChatbotAI";

interface ChatbotHandlersProps {
  // State
  isOpen: boolean;
  isMinimized: boolean;
  isDragging: boolean;
  dragOffset: { x: number; y: number };
  inputValue: string;
  conversationTurn: number;
  sessionStartTime: Date | null;
  hasBeenOpened: boolean;
  showQuickActions: boolean;
  showHistory: boolean;
  messages: ChatMessage[];
  enhancedContext: EnhancedChatbotContext;
  conversationMemory: ConversationMemory;

  // Setters
  setIsOpen: (value: boolean) => void;
  setIsMinimized: (value: boolean) => void;
  setIsDragging: (value: boolean) => void;
  setDragOffset: (value: { x: number; y: number }) => void;
  setPosition: (value: { x: number; y: number }) => void;
  setInputValue: (value: string) => void;
  setIsTyping: (value: boolean) => void;
  setSessionStartTime: (value: Date | null) => void;
  setHasBeenOpened: (value: boolean) => void;
  setShowQuickActions: (value: boolean) => void;
  setShowHistory: (value: boolean) => void;

  // Helper functions
  incrementTurn: () => void;
  addMessage: (message: ChatMessage) => void;
  updateEnhancedContext: (updates: Partial<EnhancedChatbotContext>) => void;
  updateConversationMemory: (updates: Partial<ConversationMemory>) => void;
}

export function useChatbotHandlers(props: ChatbotHandlersProps) {
  const {
    isOpen,
    isMinimized,
    isDragging,
    inputValue,
    conversationTurn: _conversationTurn,
    sessionStartTime,
    hasBeenOpened,
    showQuickActions: _showQuickActions,
    showHistory,
    messages,
    enhancedContext,
    conversationMemory,
    setIsOpen,
    setIsMinimized,
    setIsDragging,
    setDragOffset,
    setPosition,
    setInputValue,
    setIsTyping,
    setSessionStartTime,
    setHasBeenOpened,
    setShowQuickActions,
    setShowHistory,
    incrementTurn,
    addMessage,
    updateEnhancedContext,
    updateConversationMemory,
  } = props;

  // Toggle chatbot
  const handleChatbotToggle = useCallback(() => {
    const newIsOpen = !isOpen;
    setIsOpen(newIsOpen);

    if (newIsOpen) {
      setIsMinimized(false);
      if (!hasBeenOpened) {
        setSessionStartTime(new Date());
        setHasBeenOpened(true);
      }
    }
  }, [
    isOpen,
    hasBeenOpened,
    setIsOpen,
    setIsMinimized,
    setSessionStartTime,
    setHasBeenOpened,
  ]);

  // Toggle minimize
  const handleMinimizeToggle = useCallback(() => {
    setIsMinimized(!isMinimized);
  }, [isMinimized, setIsMinimized]);

  // Toggle history
  const handleHistoryToggle = useCallback(() => {
    setShowHistory(!showHistory);
  }, [showHistory, setShowHistory]);

  // Send message
  const handleSendMessage = useCallback(() => {
    if (!inputValue.trim()) return;

    const userMessage: ChatMessage = {
      id: `user-${Date.now()}`,
      type: "user",
      content: inputValue,
      timestamp: new Date(),
    };

    addMessage(userMessage);
    setInputValue("");
    setIsTyping(true);
    setShowQuickActions(false);
    incrementTurn();

    try {
      const startTime = performance.now();

      // Use enhancedChatbotAI's generateEnhancedResponse
      const responseMessage = enhancedChatbotAI.generateEnhancedResponse(
        inputValue,
        {
          ...enhancedContext,
          conversationMemory,
        },
        messages.slice(-5), // Last 5 messages for context
      );

      const responseTime = performance.now() - startTime;

      // Simple intent detection from message content
      const intent = inputValue.toLowerCase().includes("veteran")
        ? "veteran_services"
        : inputValue.toLowerCase().includes("estimate") ||
            inputValue.toLowerCase().includes("cost")
          ? "project_estimate"
          : inputValue.toLowerCase().includes("service")
            ? "services"
            : inputValue.toLowerCase().includes("project")
              ? "projects"
              : "general";

      const isLead =
        inputValue.toLowerCase().includes("estimate") ||
        inputValue.toLowerCase().includes("project") ||
        inputValue.toLowerCase().includes("partnership");
      const isVeteran = inputValue.toLowerCase().includes("veteran");

      const botMessage: ChatMessage = {
        id: `bot-${Date.now()}`,
        type: "bot",
        content: responseMessage,
        timestamp: new Date(),
        metadata: {
          responseTime,
          isLead,
          isVeteran,
          priority: isLead ? "high" : "medium",
        },
      };

      addMessage(botMessage);

      // Update conversation memory
      const sessionMetrics = conversationMemory.sessionMetrics || {
        messageCount: 0,
        sessionDuration: 0,
        leadsGenerated: 0,
        topicsDiscussed: [],
      };

      const conversationFlow = conversationMemory.conversationFlow || {
        previousTopics: [],
        nextSuggestedTopics: [],
      };

      const topicsSet = new Set([...sessionMetrics.topicsDiscussed, intent]);

      const updatedMemory: ConversationMemory = {
        ...conversationMemory,
        userProfile: conversationMemory.userProfile || {},
        sessionMetrics: {
          ...sessionMetrics,
          messageCount: sessionMetrics.messageCount + 1,
          sessionDuration: sessionStartTime
            ? Math.round(
                (new Date().getTime() - sessionStartTime.getTime()) / 1000,
              )
            : 0,
          leadsGenerated: sessionMetrics.leadsGenerated + (isLead ? 1 : 0),
          topicsDiscussed: Array.from(topicsSet),
        },
        conversationFlow: {
          previousTopics: [...conversationFlow.previousTopics, intent].slice(
            -5,
          ),
          nextSuggestedTopics: [],
        },
      };

      if (isVeteran && updatedMemory.userProfile) {
        updatedMemory.userProfile.isVeteran = true;
      }

      updateConversationMemory(updatedMemory);
      updateEnhancedContext({ conversationMemory: updatedMemory });
    } catch (_error) {
      console.error("Chatbot _error:", _error);

      const errorMessage: ChatMessage = {
        id: `bot-_error-${Date.now()}`,
        type: "bot",
        content:
          "I apologize, but I'm experiencing technical difficulties. Please try refreshing the page or contact us directly at (509) 783-8100.",
        timestamp: new Date(),
        metadata: { priority: "critical" },
      };

      addMessage(errorMessage);
    } finally {
      setIsTyping(false);
    }
  }, [
    inputValue,
    enhancedContext,
    conversationMemory,
    sessionStartTime,
    messages,
    addMessage,
    setInputValue,
    setIsTyping,
    setShowQuickActions,
    incrementTurn,
    updateConversationMemory,
    updateEnhancedContext,
  ]);

  // Quick action select
  const handleQuickActionSelect = useCallback(
    (actionId: string, message: string) => {
      // Handle contact action - direct navigation
      if (
        actionId === "ai-estimator" ||
        actionId === "get-partnership-estimate" ||
        actionId === "schedule-consultation"
      ) {
        if (typeof window !== "undefined") {
          window.location.href = "/contact";
        }
        return;
      }

      // For other actions, use the message in chat
      setInputValue(message);
      setShowQuickActions(false);
    },
    [setInputValue, setShowQuickActions],
  );

  // Key press handler
  const handleKeyPress = useCallback(
    (e: KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        handleSendMessage();
      }
    },
    [handleSendMessage],
  );

  // Mouse down for dragging
  const handleMouseDown = useCallback(
    (e: MouseEvent<HTMLDivElement>) => {
      const target = e.target as HTMLElement;
      if (target.closest(".chatbot-header") && !target.closest("button")) {
        setIsDragging(true);
        const chatbot = (e.currentTarget as HTMLElement).closest(
          ".chatbot-window",
        ) as HTMLElement;
        const rect = chatbot.getBoundingClientRect();
        setDragOffset({
          x: e.clientX - rect.left,
          y: e.clientY - rect.top,
        });
      }
    },
    [setIsDragging, setDragOffset],
  );

  // Mouse move for dragging
  const handleMouseMove = useCallback(
    (e: MouseEvent<HTMLDivElement>) => {
      if (isDragging) {
        e.preventDefault();
        const chatbotWidth = 400;
        const chatbotHeight = 600;
        const newX = e.clientX - props.dragOffset.x;
        const newY =
          window.innerHeight -
          (e.clientY + (chatbotHeight - props.dragOffset.y));

        // Keep within viewport bounds with padding
        const boundedX = Math.max(
          10,
          Math.min(newX, window.innerWidth - chatbotWidth - 10),
        );
        const boundedY = Math.max(
          10,
          Math.min(newY, window.innerHeight - chatbotHeight - 10),
        );

        setPosition({
          x: boundedX,
          y: boundedY,
        });
      }
    },
    [isDragging, props.dragOffset, setPosition],
  );

  // Mouse up to stop dragging
  const handleMouseUp = useCallback(() => {
    if (isDragging) {
      setIsDragging(false);
    }
  }, [isDragging, setIsDragging]);

  // Touch handlers for mobile dragging
  const handleTouchStart = useCallback(
    (e: React.TouchEvent<HTMLDivElement>) => {
      const target = e.target as HTMLElement;
      if (target.closest(".chatbot-header") && !target.closest("button")) {
        const touch = e.touches[0];
        if (!touch) return;

        setIsDragging(true);
        const chatbot = (e.currentTarget as HTMLElement).closest(
          ".chatbot-window",
        ) as HTMLElement;
        const rect = chatbot.getBoundingClientRect();
        setDragOffset({
          x: touch.clientX - rect.left,
          y: touch.clientY - rect.top,
        });
      }
    },
    [setIsDragging, setDragOffset],
  );

  const handleTouchMove = useCallback(
    (e: React.TouchEvent<HTMLDivElement>) => {
      if (isDragging) {
        e.preventDefault();
        const touch = e.touches[0];
        if (!touch) return;

        const chatbotWidth =
          window.innerWidth > 640 ? 400 : window.innerWidth - 20;
        const chatbotHeight = 600;
        const newX = touch.clientX - props.dragOffset.x;
        const newY =
          window.innerHeight -
          (touch.clientY + (chatbotHeight - props.dragOffset.y));

        // Keep within viewport bounds
        const boundedX = Math.max(
          10,
          Math.min(newX, window.innerWidth - chatbotWidth - 10),
        );
        const boundedY = Math.max(
          10,
          Math.min(newY, window.innerHeight - chatbotHeight - 10),
        );

        setPosition({
          x: boundedX,
          y: boundedY,
        });
      }
    },
    [isDragging, props.dragOffset, setPosition],
  );

  const handleTouchEnd = useCallback(() => {
    if (isDragging) {
      setIsDragging(false);
    }
  }, [isDragging, setIsDragging]);

  // Keyboard shortcuts
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      // Ctrl/Cmd + K to toggle chatbot
      if ((e.ctrlKey || e.metaKey) && e.key === "k") {
        e.preventDefault();
        handleChatbotToggle();
      }
      // Escape to close
      if (e.key === "Escape" && isOpen) {
        e.preventDefault();
        setIsOpen(false);
      }
    },
    [isOpen, handleChatbotToggle, setIsOpen],
  );

  // Set up keyboard shortcuts
  useEffect(() => {
    const listener = (e: globalThis.KeyboardEvent) => {
      handleKeyDown(e as unknown as KeyboardEvent);
    };
    window.addEventListener("keydown", listener);
    return () => window.removeEventListener("keydown", listener);
  }, [handleKeyDown]);

  return {
    handleChatbotToggle,
    handleMinimizeToggle,
    handleHistoryToggle,
    handleSendMessage,
    handleQuickActionSelect,
    handleKeyPress,
    handleMouseDown,
    handleMouseMove,
    handleMouseUp,
    handleTouchStart,
    handleTouchMove,
    handleTouchEnd,
  };
}
