/**
 * Quick Action Menu for Enhanced Chatbot
 * Provides quick access to frequently asked questions
 */

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
  category: string;
}

// Simplified FAQ-focused quick actions
const FAQ_QUICK_ACTIONS: QuickAction[] = [
  {
    id: "phone-number",
    label: "What's your phone number?",
    icon: "phone",
    message: "What is your phone number?",
    category: "contact",
  },
  {
    id: "business-hours",
    label: "Business hours?",
    icon: "schedule",
    message: "What are your business hours?",
    category: "contact",
  },
  {
    id: "services",
    label: "What services do you offer?",
    icon: "construction",
    message: "What services do you offer?",
    category: "services",
  },
  {
    id: "estimate",
    label: "How to get an estimate?",
    icon: "request_quote",
    message: "How do I get an estimate?",
    category: "pricing",
  },
  {
    id: "veteran-discount",
    label: "Veteran discounts?",
    icon: "military_tech",
    message: "Do you offer veteran discounts?",
    category: "veterans",
  },
  {
    id: "service-areas",
    label: "What areas do you serve?",
    icon: "location_on",
    message: "What areas do you serve?",
    category: "service-area",
  },
  {
    id: "project-timeline",
    label: "How long do projects take?",
    icon: "timer",
    message: "How long do projects take?",
    category: "process",
  },
  {
    id: "licensed-insured",
    label: "Are you licensed & insured?",
    icon: "verified",
    message: "Are you licensed and insured?",
    category: "credentials",
  },
];

export function QuickActionMenu({
  onActionSelect,
  isVisible,
}: QuickActionMenuProps) {
  if (!isVisible) return null;

  const handleActionClick = (action: QuickAction) => {
    onActionSelect(action.id, action.message);
  };

  return (
    <div className="quick-action-menu mb-3 sm:mb-4 mx-2 sm:mx-3">
      <div className="bg-gradient-to-br from-primary-50 to-secondary-50 dark:from-gray-800 dark:to-gray-900 border border-brand-primary/20 dark:border-brand-primary/30 rounded-xl p-3 sm:p-4 shadow-md">
        <div className="flex items-center gap-2 mb-3">
          <MaterialIcon
            icon="quiz"
            size="sm"
            className="text-brand-primary dark:text-brand-primary-light"
          />
          <h3 className="font-bold text-gray-800 dark:text-gray-100 text-sm">
            Frequently Asked Questions
          </h3>
        </div>

        <p className="text-xs text-gray-600 dark:text-gray-400 mb-3">
          Click a question below or type/speak your own:
        </p>

        {/* FAQ Grid */}
        <div className="grid grid-cols-1 gap-2">
          {FAQ_QUICK_ACTIONS.map((action) => (
            <button
              key={action.id}
              onClick={() => handleActionClick(action)}
              className="flex items-center gap-2 p-2 rounded-lg bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 hover:border-brand-primary dark:hover:border-brand-primary-light hover:shadow-md transition-all duration-200 text-left group"
              aria-label={action.label}
            >
              <div className="flex-shrink-0">
                <MaterialIcon
                  icon={action.icon}
                  size="sm"
                  className="text-brand-primary dark:text-brand-primary-light group-hover:scale-110 transition-transform"
                />
              </div>
              <span className="text-xs sm:text-sm text-gray-700 dark:text-gray-200 group-hover:text-brand-primary dark:group-hover:text-brand-primary-light font-medium">
                {action.label}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default QuickActionMenu;
