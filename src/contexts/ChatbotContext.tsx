"use client";

import React, {
  createContext,
  useContext,
  useState,
  type ReactNode,
} from "react";

interface ChatbotContextType {
  isOpen: boolean;
  toggleChatbot: () => void;
  currentEstimatorData: unknown;
  setCurrentEstimatorData: (data: unknown) => void;
  chatMode: "general" | "estimator" | "veteran-support";
  setChatMode: (mode: "general" | "estimator" | "veteran-support") => void;
}

const ChatbotContext = createContext<ChatbotContextType | undefined>(undefined);

export function ChatbotProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [currentEstimatorData, setCurrentEstimatorData] = useState(null);
  const [chatMode, setChatMode] = useState<
    "general" | "estimator" | "veteran-support"
  >("general");

  const toggleChatbot = () => {
    setIsOpen(!isOpen);
  };

  const value = {
    isOpen,
    toggleChatbot,
    currentEstimatorData,
    setCurrentEstimatorData,
    chatMode,
    setChatMode,
  };

  return (
    <ChatbotContext.Provider value={value}>{children}</ChatbotContext.Provider>
  );
}

export function useChatbot() {
  const context = useContext(ChatbotContext);
  if (context === undefined) {
    throw new Error("useChatbot must be used within a ChatbotProvider");
  }
  return context;
}
