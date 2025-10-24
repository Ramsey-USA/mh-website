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
    id: "get-partnership-estimate",
    label: "Partnership Estimate",
    icon: "handshake",
    message:
      "I'd like to explore a construction partnership and get an estimate",
    description: "Start your building partnership with MH Construction",
    priority: "high",
  },
  {
    id: "veteran-services",
    label: "Veteran Benefits",
    icon: "military_tech",
    message: "What special services and benefits do you offer for veterans?",
    description: "Learn about veteran-owned excellence and priority services",
    priority: "high",
  },
  {
    id: "construction-services",
    label: "Our Services",
    icon: "construction",
    message: "What construction services does MH Construction offer?",
    description: "Explore our comprehensive construction capabilities",
    priority: "medium",
  },
  {
    id: "schedule-consultation",
    label: "Free Consultation",
    icon: "event",
    message: "I'd like to schedule a free consultation with MH Construction",
    description: "Book your complimentary project consultation",
    priority: "high",
  },
  {
    id: "emergency-support",
    label: "Emergency Help",
    icon: "emergency",
    message: "I need emergency construction support",
    description: "Get immediate assistance for urgent construction needs",
    priority: "high",
  },
  {
    id: "project-portfolio",
    label: "View Projects",
    icon: "business",
    message: "Show me examples of MH Construction projects",
    description: "Explore our construction portfolio and success stories",
    priority: "medium",
    pages: ["/"],
  },
  {
    id: "contact-team",
    label: "Contact Team",
    icon: "people",
    message: "How can I contact the MH Construction team?",
    description: "Get direct contact information for our team",
    priority: "medium",
  },
  {
    id: "financing-options",
    label: "Financing Info",
    icon: "account_balance",
    message:
      "Tell me about financing and payment options for construction projects",
    description: "Explore project financing solutions and payment plans",
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
    <div className="quick-action-menu mb-3 sm:mb-4 mx-2 sm:mx-3">
      <div className="bg-white dark:bg-gray-800 border-2 border-brand-primary/20 dark:border-brand-primary/30 rounded-xl p-3 sm:p-4 shadow-lg">
        <div className="flex items-center gap-2 mb-3">
          <MaterialIcon
            icon="bolt"
            className="text-brand-primary dark:text-brand-light w-4 h-4 sm:w-5 sm:h-5"
            size="sm"
          />
          <h4 className="text-sm sm:text-base font-bold text-brand-primary dark:text-brand-light">
            Quick Actions
          </h4>
        </div>

        <div className="grid grid-cols-2 gap-2 sm:gap-3">
          {sortedActions.slice(0, 6).map((action) => (
            <button
              key={action.id}
              onClick={() => handleActionClick(action)}
              className="flex flex-col items-center gap-1 sm:gap-2 p-2 sm:p-3 bg-white dark:bg-gray-700 border-2 border-brand-primary/30 dark:border-brand-primary/40 rounded-xl text-xs hover:bg-brand-primary/5 dark:hover:bg-brand-primary/10 hover:border-brand-primary transition-all duration-300 touch-manipulation overflow-hidden"
              title={action.description}
            >
              <MaterialIcon
                icon={action.icon}
                className={`transition-all duration-300 w-4 h-4 sm:w-5 sm:h-5 ${
                  action.priority === "high"
                    ? "text-brand-primary dark:text-brand-light"
                    : "text-gray-600 dark:text-gray-400"
                }`}
                size="sm"
              />
              <span className="text-center leading-tight font-medium text-gray-700 dark:text-gray-300 text-xs break-words">
                {action.label}
              </span>
            </button>
          ))}
        </div>

        {sortedActions.length > 6 && (
          <div className="mt-3 text-center">
            <button
              onClick={() =>
                onActionSelect("more-options", "Show me more options")
              }
              className="text-xs text-brand-primary dark:text-brand-light hover:underline font-medium transition-all duration-300"
            >
              +{sortedActions.length - 6} more options
            </button>
          </div>
        )}

        <div className="mt-3 pt-3 border-t border-brand-primary/20 dark:border-brand-primary/30">
          <p className="text-xs text-gray-600 dark:text-gray-400 text-center flex items-center justify-center gap-1 flex-wrap">
            <MaterialIcon
              icon="construction"
              size="sm"
              className="w-3 h-3 text-brand-primary dark:text-brand-light"
            />
            <span className="font-bold">MH Construction:</span>
            <span>Use</span>
            <kbd className="px-1 py-0.5 bg-gray-100 dark:bg-gray-800 rounded text-xs border">
              Ctrl+K
            </kbd>
            <span className="hidden sm:inline">for instant search</span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default QuickActionMenu;
