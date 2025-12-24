"use client";

import {
  createContext,
  useContext,
  useState,
  useCallback,
  type ReactNode,
} from "react";
import dynamic from "next/dynamic";
import type { ChatbotContext } from "@/lib/chatbot/chatbot-config";

// Dynamically import chatbot components to reduce initial bundle size
const GlobalChatbot = dynamic(
  () =>
    import("@/components/chatbot/GlobalChatbot").then((mod) => ({
      default: mod.GlobalChatbot,
    })),
  { ssr: false },
);

const FloatingChatbotButton = dynamic(
  () =>
    import("@/components/chatbot/FloatingChatbotButton").then((mod) => ({
      default: mod.FloatingChatbotButton,
    })),
  { ssr: false },
);

interface ChatbotContextValue {
  isOpen: boolean;
  context: ChatbotContext;
  openChatbot: (context?: ChatbotContext) => void;
  closeChatbot: () => void;
  toggleChatbot: () => void;
}

const ChatbotContextInternal = createContext<ChatbotContextValue | undefined>(
  undefined,
);

export function GlobalChatbotProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [context, setContext] = useState<ChatbotContext>("general");

  const openChatbot = useCallback((newContext: ChatbotContext = "general") => {
    setContext(newContext);
    setIsOpen(true);
  }, []);

  const closeChatbot = useCallback(() => {
    setIsOpen(false);
  }, []);

  const toggleChatbot = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);

  return (
    <ChatbotContextInternal.Provider
      value={{ isOpen, context, openChatbot, closeChatbot, toggleChatbot }}
    >
      {children}
      <FloatingChatbotButton />
      <GlobalChatbot isOpen={isOpen} onClose={closeChatbot} context={context} />
    </ChatbotContextInternal.Provider>
  );
}

export function useChatbot() {
  const context = useContext(ChatbotContextInternal);
  if (!context) {
    throw new Error("useChatbot must be used within GlobalChatbotProvider");
  }
  return context;
}

// Legacy export for compatibility
export const useGlobalChatbot = useChatbot;
