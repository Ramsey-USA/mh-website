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
  }, [contextIsOpen, handlers, state.isOpen]); // Include all dependencies

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
          className="bg-gradient-to-br from-brand-primary via-brand-primary to-brand-primary-dark hover:from-brand-primary-dark hover:to-brand-primary text-white p-5 rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 flex items-center justify-center group border-2 border-white/20"
          aria-label="Open MH Construction Assistant"
        >
          <MaterialIcon
            icon="chat"
            size="lg"
            className="group-hover:scale-110 transition-transform duration-300"
          />
          <span className="sr-only">Open MH Construction Assistant</span>
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
          className="bg-gradient-to-r from-brand-primary to-brand-primary-dark text-white px-5 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-3 border border-white/20"
          aria-label="Restore MH Construction assistant"
        >
          <MaterialIcon icon="chat" size="sm" />
          <span className="font-semibold text-sm">MH Construction</span>
        </button>
      </div>
    );
  }

  // Render full chatbot
  return (
    <>
      {/* Backdrop for mobile close */}
      <div
        className="fixed inset-0 z-40 bg-black/20 backdrop-blur-sm md:hidden"
        onClick={handleToggle}
        aria-hidden="true"
      />

      <div
        className={`fixed z-50 touch-none transition-opacity ${state.isDragging ? "opacity-90" : "opacity-100"}`}
        style={{
          left: `${state.position.x}px`,
          bottom: `${state.position.y}px`,
        }}
        onMouseDown={handlers.handleMouseDown}
        onMouseMove={handlers.handleMouseMove}
        onMouseUp={handlers.handleMouseUp}
        onTouchStart={handlers.handleTouchStart}
        onTouchMove={handlers.handleTouchMove}
        onTouchEnd={handlers.handleTouchEnd}
        role="region"
        aria-label="Draggable chatbot window"
      >
        <Card className="chatbot-window w-[calc(100vw-20px)] sm:w-[400px] max-h-[calc(100vh-100px)] sm:max-h-[600px] shadow-2xl border-2 border-brand-primary/20 dark:border-brand-primary/30 flex flex-col overflow-hidden">
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
    </>
  );
}
