/**
 * Chatbot Messages Component
 *
 * Displays conversation messages with typing indicator
 */

"use client";

import { useRef, useEffect } from "react";
import ChatMessage from "./ChatMessage";
import { useMessageFormatter } from "@/lib/chatbot/performance";
import type { ChatMessage as ChatMessageType } from "./hooks/useChatbotState";

interface ChatbotMessagesProps {
  messages: ChatMessageType[];
  isTyping: boolean;
}

export function ChatbotMessages({ messages, isTyping }: ChatbotMessagesProps) {
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { formatBotMessage } = useMessageFormatter();

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-4 max-h-[400px] sm:max-h-[400px]">
      ",
      {messages.map((message: ChatMessageType) => (
        <ChatMessage
          key={message.id}
          message={message}
          formattedContent={formatBotMessage(message.content)}
        />
      ))}
      {isTyping && (
        <div className="flex items-start gap-3 p-3 bg-gray-50 dark:bg-gray-800/50 rounded-xl border border-gray-200 dark:border-gray-700">
          <div className="flex gap-1 mt-1">
            <span className="w-2 h-2 bg-brand-primary rounded-full animate-bounce [animation-delay:-0.3s]" />
            <span className="w-2 h-2 bg-brand-primary rounded-full animate-bounce [animation-delay:-0.15s]" />
            <span className="w-2 h-2 bg-brand-primary rounded-full animate-bounce" />
          </div>
          <span className="text-sm text-gray-600 dark:text-gray-400 font-light">
            Preparing your response...
          </span>
        </div>
      )}
      <div ref={messagesEndRef} />
    </div>
  );
}
