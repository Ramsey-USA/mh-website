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
    <div className="chatbot-header bg-gradient-to-br from-brand-primary via-brand-primary to-brand-primary-dark text-white p-4 rounded-t-lg flex items-center justify-between cursor-move border-b-2 border-brand-secondary/30 select-none">
      ",
      <div className="flex items-center gap-3">
        <div className="w-11 h-11 bg-white/10 backdrop-blur-sm rounded-xl flex items-center justify-center border border-white/20 shadow-lg">
          <MaterialIcon icon="construction" size="md" className="text-white" />
        </div>
        <div>
          <h3 className="font-bold text-base tracking-tight">
            MH Construction
          </h3>
          <p className="text-xs opacity-90 font-light">
            {isTyping ? "Preparing response..." : "Veteran-Owned Excellence"}
          </p>
        </div>
      </div>
      <div className="flex items-center gap-1">
        <button
          onClick={onHistoryToggle}
          className="p-2 hover:bg-white/10 rounded-lg transition-all duration-300"
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
          className="p-2 hover:bg-white/10 rounded-lg transition-all duration-300"
          aria-label="Minimize chatbot"
        >
          <MaterialIcon icon="minimize" size="sm" />
        </button>
        <button
          onClick={onClose}
          className="p-2 hover:bg-white/10 rounded-lg transition-all duration-300"
          aria-label="Close chatbot"
        >
          <MaterialIcon icon="close" size="sm" />
        </button>
      </div>
    </div>
  );
}
