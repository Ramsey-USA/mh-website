/**
 * Chatbot Input Component
 *
 * Message input field with send button
 */

"use client";

import { Input, Button } from "../ui";
import { MaterialIcon } from "../icons/MaterialIcon";
import type { KeyboardEvent } from "react";

interface ChatbotInputProps {
  value: string;
  onChange: (value: string) => void;
  onSend: () => void;
  onKeyPress: (e: KeyboardEvent<HTMLInputElement>) => void;
  isTyping: boolean;
}

export function ChatbotInput({
  value,
  onChange,
  onSend,
  onKeyPress,
  isTyping,
}: ChatbotInputProps) {
  return (
    <div className="border-t p-4 bg-gray-50 dark:bg-gray-900">
      <div className="flex gap-2">
        <Input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyPress={onKeyPress}
          placeholder="Ask about construction, projects, or veterans services..."
          className="flex-1"
          disabled={isTyping}
          aria-label="Message input"
        />
        <Button
          onClick={onSend}
          disabled={!value.trim() || isTyping}
          className="bg-blue-600 hover:bg-blue-700 text-white"
          aria-label="Send message"
        >
          <MaterialIcon icon="send" size="sm" />
        </Button>
      </div>
      <p className="text-xs text-gray-500 mt-2 text-center">
        Press Enter to send • Ctrl+K to toggle
      </p>
    </div>
  );
}
