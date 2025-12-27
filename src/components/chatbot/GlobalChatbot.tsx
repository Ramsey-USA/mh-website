"use client";

import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui";
import { MaterialIcon } from "@/components/icons/MaterialIcon";
import { COMPANY_INFO } from "@/lib/constants/company";
import { TIMING } from "@/lib/constants/timing";
import {
  CHATBOT_CONFIG,
  type ChatbotContext,
  type ChatbotMessage,
} from "@/lib/chatbot/chatbot-config";
import {
  generateResponse,
  createMessage,
  getExampleQuestions,
} from "@/lib/chatbot/chatbot-service";

interface GlobalChatbotProps {
  isOpen: boolean;
  onClose: () => void;
  context?: ChatbotContext;
}

export function GlobalChatbot({
  isOpen,
  onClose,
  context = "general",
}: GlobalChatbotProps) {
  const [messages, setMessages] = useState<ChatbotMessage[]>([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Initialize with greeting
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      const greeting = createMessage(
        "assistant",
        CHATBOT_CONFIG.responses.greeting,
        context,
      );
      setMessages([greeting]);
    }
  }, [isOpen, context, messages.length]);

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Focus input when opened
  useEffect(() => {
    if (isOpen) {
      setTimeout(
        () => inputRef.current?.focus(),
        TIMING.PERFORMANCE.FOCUS_DELAY,
      );
    }
  }, [isOpen]);

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage = createMessage("user", input.trim(), context);
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsTyping(true);

    // Simulate brief typing delay for natural feel
    setTimeout(() => {
      const response = generateResponse(input, context);
      const assistantMessage = createMessage("assistant", response, context);
      setMessages((prev) => [...prev, assistantMessage]);
      setIsTyping(false);
    }, 800);
  };

  const handleExampleClick = (question: string) => {
    setInput(question);
    inputRef.current?.focus();
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  if (!isOpen) return null;

  const exampleQuestions = getExampleQuestions(context);

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 z-[998] md:hidden"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Chatbot Window */}
      <div className="fixed bottom-0 right-0 md:bottom-6 md:right-6 w-full md:w-[400px] h-[100dvh] md:h-[600px] bg-white dark:bg-stone-900 md:rounded-2xl shadow-2xl z-[999] flex flex-col">
        {/* Header */}
        <div className="bg-gradient-to-r from-brand-primary to-brand-primary/90 text-white p-4 md:rounded-t-2xl flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
              <MaterialIcon icon="chat" size="md" className="text-white" />
            </div>
            <div>
              <h3 className="font-semibold">{CHATBOT_CONFIG.name}</h3>
              <p className="text-xs text-white/80">{CHATBOT_CONFIG.tagline}</p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="text-white hover:bg-white/20 -mr-2"
            aria-label="Close chatbot"
          >
            <MaterialIcon icon="close" size="md" />
          </Button>
        </div>

        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                  message.role === "user"
                    ? "bg-brand-primary text-white rounded-br-sm"
                    : "bg-stone-100 dark:bg-stone-800 text-stone-900 dark:text-stone-100 rounded-bl-sm"
                }`}
              >
                <p className="text-sm whitespace-pre-line leading-relaxed">
                  {message.content}
                </p>
                <span className="text-xs opacity-70 mt-1 block">
                  {message.timestamp.toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </span>
              </div>
            </div>
          ))}

          {isTyping && (
            <div className="flex justify-start">
              <div className="bg-stone-100 dark:bg-stone-800 rounded-2xl rounded-bl-sm px-4 py-3">
                <div className="flex gap-1">
                  <span
                    className="w-2 h-2 bg-stone-400 rounded-full animate-bounce"
                    style={{ animationDelay: "0ms" }}
                  />
                  <span
                    className="w-2 h-2 bg-stone-400 rounded-full animate-bounce"
                    style={{ animationDelay: "150ms" }}
                  />
                  <span
                    className="w-2 h-2 bg-stone-400 rounded-full animate-bounce"
                    style={{ animationDelay: "300ms" }}
                  />
                </div>
              </div>
            </div>
          )}

          {/* Example Questions (show only if no messages yet besides greeting) */}
          {messages.length <= 1 && (
            <div className="space-y-2 pt-2">
              <p className="text-xs text-stone-500 dark:text-stone-400 font-medium">
                Quick questions:
              </p>
              {exampleQuestions.map((question, idx) => (
                <button
                  key={idx}
                  onClick={() => handleExampleClick(question)}
                  className="block w-full text-left text-sm p-3 rounded-lg bg-stone-50 dark:bg-stone-800 hover:bg-stone-100 dark:hover:bg-stone-700 text-stone-700 dark:text-stone-300 transition-colors"
                >
                  {question}
                </button>
              ))}
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Quick Action - Call */}
        <div className="px-4 py-2 bg-stone-50 dark:bg-stone-800 border-t border-stone-200 dark:border-stone-700">
          <a
            href={`tel:${COMPANY_INFO.phone.tel}`}
            className="flex items-center justify-center gap-2 text-sm text-brand-primary hover:text-brand-primary/80 transition-colors font-medium"
          >
            <MaterialIcon icon="phone" size="sm" />
            <span>Prefer to talk? Call (509) 308-6489</span>
          </a>
        </div>

        {/* Input Area */}
        <div className="p-4 border-t border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-900">
          <div className="flex gap-2">
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ask a question..."
              className="flex-1 px-4 py-3 rounded-lg border border-stone-300 dark:border-stone-600 bg-white dark:bg-stone-800 text-stone-900 dark:text-stone-100 placeholder-stone-400 dark:placeholder-stone-500 focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-transparent"
              aria-label="Message input"
            />
            <Button
              onClick={handleSend}
              disabled={!input.trim()}
              className="bg-brand-primary hover:bg-brand-primary/90 text-white px-4 py-3 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
              aria-label="Send message"
            >
              <MaterialIcon icon="send" size="md" />
            </Button>
          </div>
          <p className="text-xs text-stone-500 dark:text-stone-400 mt-2 text-center">
            Helpful info • Real conversations • No automated quotes
          </p>
        </div>
      </div>
    </>
  );
}
