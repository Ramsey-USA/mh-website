/**
 * Conversation History Panel
 * Shows past conversations with export and management features
 */

import React, { memo, useState } from "react";
import { Button } from "../ui";
import { MaterialIcon } from "../icons/MaterialIcon";
import { type ConversationHistory } from "../../lib/chatbot/advanced-features";

interface ConversationHistoryPanelProps {
  history: ConversationHistory[];
  onExportConversation: (conversation: ConversationHistory) => void;
  onClearHistory: () => void;
  onRestoreConversation?: (conversation: ConversationHistory) => void;
  isVisible: boolean;
  onClose: () => void;
}

const ConversationHistoryPanel = memo(
  ({
    history,
    onExportConversation,
    onClearHistory,
    onRestoreConversation,
    isVisible,
    onClose,
  }: ConversationHistoryPanelProps) => {
    const [selectedConversation, setSelectedConversation] =
      useState<ConversationHistory | null>(null);

    if (!isVisible) return null;

    const formatDuration = (seconds: number): string => {
      const minutes = Math.floor(seconds / 60);
      const remainingSeconds = seconds % 60;
      return minutes > 0
        ? `${minutes}m ${remainingSeconds}s`
        : `${remainingSeconds}s`;
    };

    const getConversationPreview = (messages: any[]): string => {
      const userMessages = messages.filter((m) => m.type === "user");
      if (userMessages.length === 0) return "No messages";

      const firstMessage = userMessages[0].content;
      return firstMessage.length > 50
        ? `${firstMessage.substring(0, 50)}...`
        : firstMessage;
    };

    return (
      <div className="absolute inset-0 bg-white dark:bg-gray-800 z-10 flex flex-col">
        {/* Header */}
        <div className="bg-gradient-to-r from-brand-primary to-brand-accent dark:from-brand-primary dark:to-brand-accent p-3 text-white">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <MaterialIcon
                icon="history"
                size="md"
                className="text-brand-light"
              />
              <h3 className="font-bold text-lg">Conversation History</h3>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="hover:bg-white/20 p-0 w-8 h-8 text-white"
              aria-label="Close history panel"
            >
              <MaterialIcon icon="close" size="sm" />
            </Button>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-hidden flex">
          {/* History List */}
          <div className="w-1/2 border-r border-gray-200 dark:border-gray-700 flex flex-col">
            <div className="p-3 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  {history.length} conversation{history.length !== 1 ? "s" : ""}
                </span>
                {history.length > 0 && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={onClearHistory}
                    className="text-red-600 dark:text-red-400 border-red-200 dark:border-red-700 hover:bg-red-50 dark:hover:bg-red-900/20"
                    aria-label="Clear all history"
                  >
                    <MaterialIcon icon="delete_forever" size="sm" />
                    Clear All
                  </Button>
                )}
              </div>
            </div>

            <div className="flex-1 overflow-y-auto">
              {history.length === 0 ? (
                <div className="p-6 text-center text-gray-500 dark:text-gray-400">
                  <MaterialIcon
                    icon="chat_bubble_outline"
                    size="xl"
                    className="mx-auto mb-3 opacity-50"
                  />
                  <p className="text-sm">No conversation history yet</p>
                  <p className="text-xs mt-1">
                    Your completed conversations will appear here
                  </p>
                </div>
              ) : (
                <div className="space-y-1 p-2">
                  {history.map((conversation) => (
                    <div
                      key={conversation.id}
                      className={`p-3 rounded-lg cursor-pointer transition-colors ${
                        selectedConversation?.id === conversation.id
                          ? "bg-blue-100 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-700"
                          : "hover:bg-gray-50 dark:hover:bg-gray-700/50"
                      }`}
                      onClick={() => setSelectedConversation(conversation)}
                    >
                      <div className="flex justify-between items-start mb-1">
                        <span className="text-xs text-gray-500 dark:text-gray-400">
                          {conversation.timestamp.toLocaleDateString()}{" "}
                          {conversation.timestamp.toLocaleTimeString()}
                        </span>
                        <div className="flex items-center space-x-1">
                          {conversation.userMetadata.isVeteran && (
                            <span className="bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 px-1 py-0.5 rounded text-xs">
                              Veteran
                            </span>
                          )}
                          {conversation.userMetadata.leadGenerated && (
                            <span className="bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400 px-1 py-0.5 rounded text-xs">
                              Lead
                            </span>
                          )}
                        </div>
                      </div>

                      <p className="text-sm text-gray-700 dark:text-gray-300 mb-1">
                        {getConversationPreview(conversation.messages)}
                      </p>

                      <div className="flex justify-between items-center text-xs text-gray-500 dark:text-gray-400">
                        <span>{conversation.messages.length} messages</span>
                        <span>
                          {formatDuration(conversation.sessionDuration)}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Conversation Details */}
          <div className="w-1/2 flex flex-col">
            {selectedConversation ? (
              <>
                <div className="p-3 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h4 className="font-medium text-gray-800 dark:text-gray-200">
                        {selectedConversation.timestamp.toLocaleDateString()}{" "}
                        Conversation
                      </h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Duration:{" "}
                        {formatDuration(selectedConversation.sessionDuration)} •
                        Page: {selectedConversation.userMetadata.page}
                      </p>
                    </div>
                    <div className="flex space-x-1">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() =>
                          onExportConversation(selectedConversation)
                        }
                        className="text-green-600 dark:text-green-400"
                        title="Export conversation"
                      >
                        <MaterialIcon icon="download" size="sm" />
                      </Button>
                      {onRestoreConversation && (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() =>
                            onRestoreConversation(selectedConversation)
                          }
                          className="text-blue-600 dark:text-blue-400"
                          title="Restore conversation"
                        >
                          <MaterialIcon icon="restore" size="sm" />
                        </Button>
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex-1 overflow-y-auto p-3 space-y-3">
                  {selectedConversation.messages.map((message, index) => (
                    <div
                      key={index}
                      className={`flex ${message.type === "user" ? "justify-end" : "justify-start"}`}
                    >
                      <div
                        className={`max-w-[85%] p-2 rounded-lg text-sm ${
                          message.type === "user"
                            ? "bg-green-600 text-white"
                            : "bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200"
                        }`}
                      >
                        <div className="mb-1">{message.content}</div>
                        <div
                          className={`text-xs ${
                            message.type === "user"
                              ? "text-white/70"
                              : "text-gray-500 dark:text-gray-400"
                          }`}
                        >
                          {new Date(message.timestamp).toLocaleTimeString()}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            ) : (
              <div className="flex-1 flex items-center justify-center text-gray-500 dark:text-gray-400">
                <div className="text-center">
                  <MaterialIcon
                    icon="touch_app"
                    size="xl"
                    className="mx-auto mb-3 opacity-50"
                  />
                  <p className="text-sm">
                    Select a conversation to view details
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  },
);

ConversationHistoryPanel.displayName = "ConversationHistoryPanel";

export default ConversationHistoryPanel;
