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
      aria-label={`${message.type === "user" ? "Your message" : "MH Assistant's response"} at ${message.timestamp.toLocaleTimeString()}`}
    >
      <div
        className={`max-w-[90%] sm:max-w-[85%] p-3 sm:p-4 rounded-xl transition-all duration-300 overflow-hidden ${
          message.type === "user"
            ? "bg-brand-primary border-2 border-brand-primary text-white shadow-lg"
            : "bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 shadow-lg hover:shadow-xl"
        }`}
      >
        <div className="w-full">
          {message.type === "bot" ? (
            <div className="prose prose-sm dark:prose-invert max-w-none text-sm break-words">
              {formattedContent.map((item: any) => {
                switch (item.type) {
                  case "header":
                    return (
                      <div
                        key={item.key}
                        className="mb-2 font-bold text-brand-primary dark:text-brand-light text-sm break-words"
                      >
                        {item.content}
                      </div>
                    );
                  case "list-item":
                    return (
                      <div
                        key={item.key}
                        className="ml-2 text-gray-700 dark:text-gray-300 text-xs sm:text-sm break-words"
                      >
                        • {item.content}
                      </div>
                    );
                  case "subheader":
                    return (
                      <div
                        key={item.key}
                        className="mt-2 mb-1 font-semibold text-gray-800 dark:text-gray-200 text-sm break-words"
                      >
                        {item.content}
                      </div>
                    );
                  default:
                    return (
                      <div
                        key={item.key}
                        className="text-gray-700 dark:text-gray-300 text-xs sm:text-sm leading-relaxed break-words"
                      >
                        {item.content}
                      </div>
                    );
                }
              })}
            </div>
          ) : (
            <span className="text-xs sm:text-sm leading-relaxed font-medium break-words">
              {message.content}
            </span>
          )}

          {/* Enhanced message metadata */}
          <div className="flex flex-wrap gap-1 mt-2 w-full">
            <span className="bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 px-2 py-1 rounded-lg text-xs font-medium">
              {message.timestamp.toLocaleTimeString()}
            </span>

            {message.metadata?.priority &&
              message.metadata.priority !== "low" && (
                <span
                  className={`px-2 py-1 rounded-lg text-xs font-medium ${
                    message.metadata.priority === "critical"
                      ? "bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 border border-red-200 dark:border-red-700"
                      : message.metadata.priority === "high"
                        ? "bg-yellow-100 dark:bg-yellow-900/30 text-yellow-600 dark:text-yellow-400 border border-yellow-200 dark:border-yellow-700"
                        : "bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-700"
                  }`}
                >
                  {message.metadata.priority}
                </span>
              )}

            {message.metadata?.responseTime && (
              <span className="bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400 px-2 py-1 rounded-lg text-xs font-medium">
                {message.metadata.responseTime}ms
              </span>
            )}

            {message.metadata?.isLead && (
              <span className="bg-brand-primary/20 dark:bg-brand-primary/30 text-brand-primary dark:text-brand-light px-2 py-1 rounded-lg text-xs font-medium border border-brand-primary/30">
                Partnership Lead
              </span>
            )}

            {message.metadata?.isVeteran && (
              <span className="bg-brand-secondary/20 dark:bg-brand-secondary/30 text-brand-secondary dark:text-brand-secondary px-2 py-1 rounded-lg text-xs font-medium border border-brand-secondary/30">
                Veteran
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
});

ChatMessage.displayName = "ChatMessage";

export default ChatMessage;
