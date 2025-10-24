/**
 * Quick Action Menu for Enhanced Chatbot
 * Provides immediate access to common construction tasks and information
 */

import React from "react";
import { Button } from "../ui";
import { MaterialIcon } from "../icons/MaterialIcon";

interface QuickActionMenuProps {
  onActionSelect: (action: string, message: string) => void;
  isVisible: boolean;
  currentPage?: string;
}

interface QuickAction {
  id: string;
  label: string;
  icon: string;
  message: string;
  description: string;
  priority?: "high" | "medium" | "low";
  pages?: string[]; // Show only on specific pages
}

const QUICK_ACTIONS: QuickAction[] = [
  {
    id: "get-estimate",
    label: "Get Estimate",
    icon: "calculate",
    message: "I need a project estimate",
    description: "Start project planning with a free estimate",
    priority: "high",
  },
  {
    id: "veteran-services",
    label: "Veteran Benefits",
    icon: "military_tech",
    message: "Tell me about veteran benefits and priority services",
    description: "Learn about special veteran advantages",
    priority: "high",
  },
  {
    id: "search-projects",
    label: "Browse Projects",
    icon: "search",
    message: "Show me project examples",
    description: "Explore our construction portfolio",
    priority: "medium",
    pages: ["/"],
  },
  {
    id: "schedule-consultation",
    label: "Schedule Meeting",
    icon: "event",
    message: "I want to schedule a consultation",
    description: "Book a free consultation appointment",
    priority: "high",
  },
  {
    id: "emergency-support",
    label: "Emergency Help",
    icon: "emergency",
    message: "I need emergency construction support",
    description: "Get immediate assistance for urgent needs",
    priority: "high",
  },
  {
    id: "view-services",
    label: "Our Services",
    icon: "construction",
    message: "What construction services do you offer?",
    description: "Learn about our capabilities",
    priority: "medium",
  },
  {
    id: "contact-team",
    label: "Contact Team",
    icon: "people",
    message: "How can I contact your team?",
    description: "Get direct contact information",
    priority: "medium",
  },
  {
    id: "financing-options",
    label: "Financing Info",
    icon: "account_balance",
    message: "Tell me about financing and payment options",
    description: "Explore project financing solutions",
    priority: "medium",
  },
];

export function QuickActionMenu({
  onActionSelect,
  isVisible,
  currentPage = "",
}: QuickActionMenuProps) {
  if (!isVisible) return null;

  // Filter actions based on current page
  const filteredActions = QUICK_ACTIONS.filter((action) => {
    if (!action.pages) return true;
    return action.pages.some((page) => currentPage.includes(page));
  });

  // Sort by priority
  const sortedActions = filteredActions.sort((a, b) => {
    const priorityOrder = { high: 3, medium: 2, low: 1 };
    return (
      (priorityOrder[b.priority || "low"] || 1) -
      (priorityOrder[a.priority || "low"] || 1)
    );
  });

  const handleActionClick = (action: QuickAction) => {
    onActionSelect(action.id, action.message);
  };

  return (
    <div className="quick-action-menu mb-4 p-3 bg-gradient-to-r from-blue-50 to-green-50 dark:from-blue-900/20 dark:to-green-900/20 rounded-lg border border-blue-200 dark:border-blue-700">
      <div className="flex items-center gap-2 mb-3">
        <MaterialIcon
          icon="flash_on"
          className="text-amber-600 dark:text-amber-400"
          size="md"
        />
        <h4 className="text-sm font-semibold text-gray-800 dark:text-gray-200">
          Quick Actions
        </h4>
      </div>

      <div className="grid grid-cols-2 gap-2">
        {sortedActions.slice(0, 6).map((action) => (
          <Button
            key={action.id}
            variant="outline"
            size="sm"
            onClick={() => handleActionClick(action)}
            className="quick-action-button flex flex-col items-center gap-1 p-3 h-auto text-xs hover:bg-blue-50 dark:hover:bg-blue-900/30 border-blue-200 dark:border-blue-700 transition-all duration-200 group"
            title={action.description}
          >
            <MaterialIcon
              icon={action.icon}
              className={`transition-transform duration-200 group-hover:scale-110 ${
                action.priority === "high"
                  ? "text-blue-600 dark:text-blue-400"
                  : "text-gray-600 dark:text-gray-400"
              }`}
              size="sm"
            />
            <span className="text-center leading-tight font-medium text-gray-700 dark:text-gray-300">
              {action.label}
            </span>
          </Button>
        ))}
      </div>

      {sortedActions.length > 6 && (
        <div className="mt-2 text-center">
          <button
            onClick={() =>
              onActionSelect("more-options", "Show me more options")
            }
            className="text-xs text-blue-600 dark:text-blue-400 hover:underline font-medium"
          >
            +{sortedActions.length - 6} more options
          </button>
        </div>
      )}

      <div className="mt-3 pt-2 border-t border-blue-200 dark:border-blue-700">
        <p className="text-xs text-gray-600 dark:text-gray-400 text-center">
          💡 <strong>Pro Tip:</strong> Use{" "}
          <kbd className="px-1 py-0.5 bg-gray-100 dark:bg-gray-800 rounded text-xs">
            Ctrl+K
          </kbd>{" "}
          for instant search
        </p>
      </div>
    </div>
  );
}

export default QuickActionMenu;
