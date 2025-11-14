/**
 * GlobalChatbot - Refactored
 *
 * Main chatbot component with modular structure
 */

"use client";

// React import not required for modern JSX runtime; removed
import { useEffect } from "react";
import { Card } from "../ui";
import { MaterialIcon } from "../icons/MaterialIcon";
import { useChatbot } from "@/contexts/ChatbotContext";
import { useChatbotState } from "./hooks/useChatbotState";
import { useChatbotHandlers } from "./hooks/useChatbotHandlers";
import { ChatbotHeader } from "./ChatbotHeader";
import { ChatbotMessages } from "./ChatbotMessages";
import { ChatbotInput } from "./ChatbotInput";
import QuickActionMenu from "./QuickActionMenu";

interface GlobalChatbotProps {
  estimatorData?: unknown;
  onEstimateRequest?: (data: unknown) => void;
  currentPage?: string;
}

export default function GlobalChatbot({
  estimatorData,
  currentPage = "",
}: GlobalChatbotProps) {
  // Use ChatbotContext for shared state
  const { isOpen: contextIsOpen, toggleChatbot } = useChatbot();

  // Initialize state
  const state = useChatbotState(currentPage, estimatorData);

  // Initialize handlers
  const handlers = useChatbotHandlers(state);

  // Sync internal state with context
  useEffect(() => {
    if (contextIsOpen !== state.isOpen) {
      handlers.handleChatbotToggle();
    }
  }, [contextIsOpen]); // Only sync when context changes

  // Override the toggle handler to use context
  const handleToggle = () => {
    toggleChatbot();
  };

  // Quick actions placeholder removed (reserved for future feature)

  // Render closed state (floating button)
  if (!state.isOpen) {
    return (
      <div className="fixed bottom-6 right-6 z-50">
        <button
          onClick={handleToggle}
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
      role="region"
      aria-label="Draggable chatbot window"
    >
      <Card className="chatbot-window w-[400px] max-h-[600px] shadow-2xl flex flex-col">
        <ChatbotHeader
          isTyping={state.isTyping}
          onMinimize={handlers.handleMinimizeToggle}
          onClose={handleToggle}
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
                onActionSelect={(actionId, message) =>
                  handlers.handleQuickActionSelect(actionId, message)
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
