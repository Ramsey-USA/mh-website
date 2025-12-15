/**
 * Chatbot Input Component
 *
 * Message input field with voice input and send button
 */

"use client";

import { useEffect, type KeyboardEvent } from "react";
import { Input, Button } from "../ui";
import { MaterialIcon } from "../icons/MaterialIcon";
import { useVoiceInput } from "./hooks/useVoiceInput";

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
  const {
    isListening,
    isSupported,
    transcript,
    error,
    startListening,
    stopListening,
    resetTranscript,
  } = useVoiceInput();

  // Update input value when transcript changes
  useEffect(() => {
    if (transcript) {
      onChange(transcript);
    }
  }, [transcript, onChange]);

  // Handle voice input toggle
  const handleVoiceToggle = () => {
    if (isListening) {
      stopListening();
    } else {
      resetTranscript();
      startListening();
    }
  };

  return (
    <div className="border-t border-gray-200 dark:border-gray-700 p-4 bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      {error && (
        <div className="mb-2 p-2.5 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg text-red-700 dark:text-red-300 text-xs leading-relaxed">
          {error}
        </div>
      )}
      <div className="flex gap-2">
        <Input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyPress={onKeyPress}
          placeholder={
            isListening ? "Listening..." : "Type or speak your question..."
          }
          className="flex-1 border-gray-300 dark:border-gray-600 focus:border-brand-primary dark:focus:border-brand-primary focus:ring-brand-primary/20"
          disabled={isTyping || isListening}
          aria-label="Message input"
        />
        {isSupported && (
          <Button
            onClick={handleVoiceToggle}
            disabled={isTyping}
            className={`${
              isListening
                ? "bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 animate-pulse shadow-lg"
                : "bg-gradient-to-r from-brand-secondary to-brand-secondary-dark hover:from-brand-secondary-dark hover:to-brand-secondary shadow-md hover:shadow-lg"
            } text-white transition-all duration-300`}
            aria-label={isListening ? "Stop recording" : "Start voice input"}
            title={
              isListening
                ? "Click to stop recording"
                : "Click to use voice input"
            }
          >
            <MaterialIcon icon={isListening ? "mic" : "mic_none"} size="sm" />
          </Button>
        )}
        <Button
          onClick={onSend}
          disabled={!value.trim() || isTyping}
          className="bg-gradient-to-r from-brand-primary to-brand-primary-dark hover:from-brand-primary-dark hover:to-brand-primary text-white shadow-md hover:shadow-lg transition-all duration-300"
          aria-label="Send message"
        >
          <MaterialIcon icon="send" size="sm" />
        </Button>
      </div>
      <p className="text-xs text-gray-500 dark:text-gray-400 mt-2.5 text-center font-light">
        {isSupported
          ? "Type, speak, or press Enter • Ctrl+K to toggle"
          : "Press Enter to send • Ctrl+K to toggle"}
      </p>
    </div>
  );
}
