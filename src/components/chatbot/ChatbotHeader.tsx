/**
 * Chatbot Header Component
 *
 * Header section with title, status, and action buttons
 */

"use client";

import { MaterialIcon } from "../icons/MaterialIcon";

interface ChatbotHeaderProps {
  isTyping: boolean;
  onMinimize: () => void;
  onClose: () => void;
  onHistoryToggle: () => void;
  showHistory: boolean;
}

export function ChatbotHeader({
  isTyping,
  onMinimize,
  onClose,
  onHistoryToggle,
  showHistory,
}: ChatbotHeaderProps) {
  return (
    <div className="chatbot-header bg-gradient-to-r from-brand-primary to-brand-primary-dark text-white p-4 rounded-t-lg flex items-center justify-between cursor-move">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
          <MaterialIcon icon="military_tech" size="md" />
        </div>
        <div>
          <h3 className="font-bold text-lg">General MH</h3>
          <p className="text-xs opacity-90">
            {isTyping
              ? "Tactical Planning..."
              : "Active Duty • Army General Construction Intelligence"}
          </p>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <button
          onClick={onHistoryToggle}
          className="p-2 hover:bg-white/20 rounded-full transition-colors"
          aria-label={
            showHistory
              ? "Hide conversation history"
              : "Show conversation history"
          }
          title={showHistory ? "Hide history" : "Show history"}
        >
          <MaterialIcon icon="history" size="sm" />
        </button>
        <button
          onClick={onMinimize}
          className="p-2 hover:bg-white/20 rounded-full transition-colors"
          aria-label="Minimize chatbot"
        >
          <MaterialIcon icon="minimize" size="sm" />
        </button>
        <button
          onClick={onClose}
          className="p-2 hover:bg-white/20 rounded-full transition-colors"
          aria-label="Close chatbot"
        >
          <MaterialIcon icon="close" size="sm" />
        </button>
      </div>
    </div>
  );
}
