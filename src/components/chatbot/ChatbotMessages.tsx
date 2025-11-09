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
    <div className="flex-1 overflow-y-auto p-4 space-y-4 max-h-[400px]">
      {messages.map((message: any) => (
        <ChatMessage
          key={message.id}
          message={message}
          formattedContent={formatBotMessage(message.content)}
        />
      ))}

      {isTyping && (
        <div className="flex items-center gap-2 text-gray-500">
          <div className="flex gap-1">
            <span className="w-2 h-2 bg-brand-primary rounded-full animate-bounce [animation-delay:-0.3s]" />
            <span className="w-2 h-2 bg-brand-primary rounded-full animate-bounce [animation-delay:-0.15s]" />
            <span className="w-2 h-2 bg-brand-primary rounded-full animate-bounce" />
          </div>
          <span className="text-sm">
            General MH is analyzing tactical options...
          </span>
        </div>
      )}

      <div ref={messagesEndRef} />
    </div>
  );
}
