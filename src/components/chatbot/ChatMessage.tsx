/**
 * Optimized Message Component
 * Memoized message rendering for better performance
 */

import React, { memo } from "react";
import { MaterialIcon } from "../icons/MaterialIcon";

interface MessageProps {
  message: {
    id: string;
    type: "user" | "bot";
    content: string;
    timestamp: Date;
    metadata?: {
      estimateData?: any;
      actionRequired?: boolean;
      priority?: "low" | "medium" | "high" | "critical";
      responseTime?: number;
      isLead?: boolean;
      isVeteran?: boolean;
    };
  };
  formattedContent: any[];
}

// Memoized message component to prevent unnecessary re-renders
const ChatMessage = memo(({ message, formattedContent }: MessageProps) => {
  return (
    <div
      className={`flex ${
        message.type === "user" ? "justify-end" : "justify-start"
      }`}
      role="region"
      aria-label={`${message.type === "user" ? "Your message" : "General MH's response"} at ${message.timestamp.toLocaleTimeString()}`}
    >
      <div
        className={`max-w-[85%] p-3 rounded-lg transition-all duration-300 ${
          message.type === "user"
            ? "bg-green-600 text-white rounded-br-sm"
            : "bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-sm rounded-bl-sm"
        }`}
      >
        {message.type === "bot" ? (
          <div className="prose prose-sm dark:prose-invert max-w-none">
            {formattedContent.map((item: any) => {
              switch (item.type) {
                case "header":
                  return (
                    <div
                      key={item.key}
                      className="mb-1 font-bold text-green-800 dark:text-green-400"
                    >
                      {item.content}
                    </div>
                  );
                case "list-item":
                  return (
                    <div
                      key={item.key}
                      className="ml-2 text-gray-700 dark:text-gray-300 text-sm"
                    >
                      • {item.content}
                    </div>
                  );
                case "subheader":
                  return (
                    <div
                      key={item.key}
                      className="mt-2 mb-1 font-semibold text-gray-800 dark:text-gray-200"
                    >
                      {item.content}
                    </div>
                  );
                default:
                  return (
                    <div
                      key={item.key}
                      className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed"
                    >
                      {item.content}
                    </div>
                  );
              }
            })}
          </div>
        ) : (
          <span className="text-sm leading-relaxed">{message.content}</span>
        )}

        {/* Message metadata */}
        <div className="flex flex-wrap gap-1 mt-2">
          <span className="bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 px-1 py-0.5 rounded text-xs">
            {message.timestamp.toLocaleTimeString()}
          </span>

          {message.metadata?.priority &&
            message.metadata.priority !== "low" && (
              <span
                className={`px-1 py-0.5 rounded text-xs ${
                  message.metadata.priority === "critical"
                    ? "bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400"
                    : message.metadata.priority === "high"
                      ? "bg-yellow-100 dark:bg-yellow-900/30 text-yellow-600 dark:text-yellow-400"
                      : "bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400"
                }`}
              >
                {message.metadata.priority}
              </span>
            )}

          {message.metadata?.responseTime && (
            <span className="bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400 px-1 py-0.5 rounded text-xs">
              {message.metadata.responseTime}ms
            </span>
          )}

          {message.metadata?.isLead && (
            <span className="bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400 px-1 py-0.5 rounded text-xs">
              Lead
            </span>
          )}

          {message.metadata?.isVeteran && (
            <span className="bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 px-1 py-0.5 rounded text-xs">
              Veteran
            </span>
          )}
        </div>
      </div>
    </div>
  );
});

ChatMessage.displayName = "ChatMessage";

export default ChatMessage;
