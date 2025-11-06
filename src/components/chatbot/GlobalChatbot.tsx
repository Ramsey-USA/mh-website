/**
 * GlobalChatbot - Refactored
 *
 * Main chatbot component with modular structure
 */

"use client";

import React, { useMemo } from "react";
import { Card } from "../ui";
import { MaterialIcon } from "../icons/MaterialIcon";
import { useChatbotState } from "./hooks/useChatbotState";
import { useChatbotHandlers } from "./hooks/useChatbotHandlers";
import { ChatbotHeader } from "./ChatbotHeader";
import { ChatbotMessages } from "./ChatbotMessages";
import { ChatbotInput } from "./ChatbotInput";
import QuickActionMenu from "./QuickActionMenu";
import ConversationHistoryPanel from "./ConversationHistoryPanel";

interface GlobalChatbotProps {
  estimatorData?: any;
  onEstimateRequest?: (data: any) => void;
  currentPage?: string;
}

export default function GlobalChatbot({
  estimatorData,
  currentPage = "",
}: GlobalChatbotProps) {
  // Initialize state
  const state = useChatbotState(currentPage, estimatorData);

  // Initialize handlers
  const handlers = useChatbotHandlers(state);

  // Quick actions
  const quickActions = useMemo(
    () => [
      {
        id: "services",
        label: "Services",
        icon: "build",
        message: "Brief me on your service capabilities",
        description: "Learn about construction operations",
      },
      {
        id: "projects",
        label: "Projects",
        icon: "construction",
        message: "Show me your mission portfolio",
        description: "View completed operations",
      },
      {
        id: "estimate",
        label: "Get Estimate",
        icon: "calculate",
        message: "I need a cost reconnaissance mission",
        description: "Request project estimate",
      },
      {
        id: "veteran",
        label: "Veteran Services",
        icon: "military_tech",
        message: "I'm a veteran, what priority protocols are available?",
        description: "Service member benefits",
      },
      {
        id: "contact",
        label: "Contact",
        icon: "phone",
        message: "How do I establish contact with command?",
        description: "Communication protocols",
      },
    ],
    [],
  );

  // Render closed state (floating button)
  if (!state.isOpen) {
    return (
      <div className="fixed bottom-6 right-6 z-50">
        <button
          onClick={handlers.handleChatbotToggle}
          className="bg-gradient-to-r from-brand-primary to-brand-primary-dark hover:from-brand-primary-dark hover:to-brand-primary text-white p-4 rounded-full shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:scale-110 flex items-center justify-center group"
          aria-label="Open General MH - MH Construction AI Assistant"
        >
          <MaterialIcon
            icon="military_tech"
            size="lg"
            className="group-hover:rotate-12 transition-transform duration-300"
          />
          <span className="sr-only">Open General MH Assistant</span>
        </button>
      </div>
    );
  }

  // Render minimized state
  if (state.isMinimized) {
    return (
      <div
        className="fixed z-50"
        style={{
          left: `${state.position.x}px`,
          bottom: `${state.position.y}px`,
        }}
      >
        <button
          onClick={handlers.handleMinimizeToggle}
          className="bg-gradient-to-r from-brand-primary to-brand-primary-dark text-white px-6 py-3 rounded-full shadow-lg hover:shadow-xl transition-all flex items-center gap-2"
          aria-label="Restore General MH assistant"
        >
          <MaterialIcon icon="military_tech" size="sm" />
          <span className="font-semibold">General MH</span>
        </button>
      </div>
    );
  }

  // Render full chatbot
  return (
    <div
      className="fixed z-50"
      style={{
        left: `${state.position.x}px`,
        bottom: `${state.position.y}px`,
      }}
      onMouseDown={handlers.handleMouseDown}
      onMouseMove={handlers.handleMouseMove}
      onMouseUp={handlers.handleMouseUp}
    >
      <Card className="chatbot-window w-[400px] max-h-[600px] shadow-2xl flex flex-col">
        <ChatbotHeader
          isTyping={state.isTyping}
          onMinimize={handlers.handleMinimizeToggle}
          onClose={handlers.handleChatbotToggle}
          onHistoryToggle={handlers.handleHistoryToggle}
          showHistory={state.showHistory}
        />

        {state.showHistory ? (
          <div className="p-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-semibold text-lg">Conversation History</h3>
              <button
                onClick={handlers.handleHistoryToggle}
                className="text-gray-500 hover:text-gray-700"
                aria-label="Close history"
              >
                <MaterialIcon icon="close" size="sm" />
              </button>
            </div>
            <p className="text-sm text-gray-600">
              {state.messages.length} messages in this session
            </p>
          </div>
        ) : (
          <>
            {state.showQuickActions && (
              <QuickActionMenu
                onActionSelect={(_, message) =>
                  handlers.handleQuickActionSelect(message)
                }
                isVisible={state.showQuickActions}
                currentPage={currentPage}
              />
            )}

            <ChatbotMessages
              messages={state.messages}
              isTyping={state.isTyping}
            />

            <ChatbotInput
              value={state.inputValue}
              onChange={state.setInputValue}
              onSend={handlers.handleSendMessage}
              onKeyPress={handlers.handleKeyPress}
              isTyping={state.isTyping}
            />
          </>
        )}
      </Card>
    </div>
  );
}
