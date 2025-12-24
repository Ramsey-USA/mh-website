"use client";

import { MaterialIcon } from "@/components/icons/MaterialIcon";
import { useChatbot } from "@/providers/GlobalChatbotProvider";

export function FloatingChatbotButton() {
  const { isOpen, toggleChatbot } = useChatbot();

  // Don't show button when chatbot is open
  if (isOpen) return null;

  return (
    <button
      onClick={() => toggleChatbot()}
      className="fixed bottom-6 right-6 z-[997] w-14 h-14 md:w-16 md:h-16 bg-brand-primary hover:bg-brand-primary/90 text-white rounded-full shadow-2xl hover:shadow-3xl transition-all duration-300 flex items-center justify-center group hover:scale-110 active:scale-95"
      aria-label="Open chatbot"
    >
      <MaterialIcon
        icon="chat"
        size="lg"
        className="text-white group-hover:scale-110 transition-transform"
      />

      {/* Pulse animation ring */}
      <span className="absolute inset-0 rounded-full bg-brand-primary animate-ping opacity-20" />

      {/* Tooltip */}
      <span className="absolute right-full mr-3 px-3 py-2 bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900 text-sm font-medium rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
        Questions? Chat with us
      </span>
    </button>
  );
}
