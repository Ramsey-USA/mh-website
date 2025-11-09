"use client";

import { useState, useEffect } from "react";
import { MaterialIcon } from "@/components/icons/MaterialIcon";
import { useGlobalChatbot } from "@/providers/GlobalChatbotProvider";

// Activity types for the feed
type ActivityType = "booking" | "estimate" | "consultation" | "project_start";

interface Activity {
  id: string;
  type: ActivityType;
  message: string;
  location: string;
  timeAgo: string;
  timestamp: Date;
  projectType?: string;
  estimatedValue?: string;
}

interface ActivityFeedProps {
  /** Maximum number of activities to display */
  maxActivities?: number;
  /** Enable chatbot integration for activity clicks */
  enableChatbotIntegration?: boolean;
  /** Auto-dismiss activities after N seconds (0 = no auto-dismiss) */
  autoDismissSeconds?: number;
  /** Show only on desktop (hidden on mobile) */
  desktopOnly?: boolean;
}

/**
 * Real-Time Activity Feed Component
 *
 * Displays floating notifications of recent business activity to create
 * social proof and urgency. Integrates with chatbot for user engagement.
 *
 * Features:
 * - Bottom-left floating position with slide-in animations
 * - Real-time activity updates (simulated for demo)
 * - Clickable notifications that open chatbot with context
 * - Dismiss functionality with smooth animations
 * - Mobile-responsive (optional hide on mobile)
 * - Auto-dismiss timer option
 *
 * @example
 * ```tsx
 * <ActivityFeed
 *   maxActivities={3}
 *   enableChatbotIntegration={true}
 *   autoDismissSeconds={10}
 *   desktopOnly={true}
 * />
 * ```
 */
export function ActivityFeed({
  maxActivities = 3,
  enableChatbotIntegration = true,
  autoDismissSeconds = 0,
  desktopOnly = false,
}: ActivityFeedProps) {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [dismissedIds, setDismissedIds] = useState<Set<string>>(new Set());
  const { setIsVisible, setCurrentPageData } = useGlobalChatbot();

  // Mock activity data - in production, this would come from real-time API
  // Using useMemo to prevent dependency issues in useEffect
  const mockActivities = useState<Omit<Activity, "timestamp">[]>(() => [
    {
      id: "act-1",
      type: "booking",
      message: "John D. scheduled a consultation",
      location: "Kennewick, WA",
      timeAgo: "2 minutes ago",
      projectType: "Commercial Building",
    },
    {
      id: "act-2",
      type: "estimate",
      message: "Sarah M. requested an estimate",
      location: "Pasco, WA",
      timeAgo: "8 minutes ago",
      projectType: "Medical Facility",
      estimatedValue: "$850K - $1.2M",
    },
    {
      id: "act-3",
      type: "project_start",
      message: "New project started",
      location: "Richland, WA",
      timeAgo: "15 minutes ago",
      projectType: "Office Renovation",
      estimatedValue: "$320K",
    },
    {
      id: "act-4",
      type: "consultation",
      message: "Mike R. completed consultation",
      location: "Tri-Cities, WA",
      timeAgo: "23 minutes ago",
      projectType: "Retail Space",
    },
    {
      id: "act-5",
      type: "booking",
      message: "Emily L. scheduled a consultation",
      location: "Walla Walla, WA",
      timeAgo: "31 minutes ago",
      projectType: "Restaurant Remodel",
    },
    {
      id: "act-6",
      type: "estimate",
      message: "David K. requested an estimate",
      location: "Yakima, WA",
      timeAgo: "42 minutes ago",
      projectType: "Warehouse Expansion",
      estimatedValue: "$1.5M - $2.1M",
    },
  ])[0];

  // Initialize activities with random selection
  useEffect(() => {
    // Shuffle and select random activities
    const shuffled = [...mockActivities]
      .sort(() => Math.random() - 0.5)
      .slice(0, maxActivities)
      .map((act) => ({
        ...act,
        timestamp: new Date(Date.now() - Math.random() * 60 * 60 * 1000), // Random time in last hour
      }));

    setActivities(shuffled);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [maxActivities]);

  // Simulate new activities appearing periodically
  useEffect(() => {
    const interval = setInterval(() => {
      // Randomly add a new activity
      if (Math.random() > 0.7 && activities.length < maxActivities) {
        const idx = Math.floor(Math.random() * mockActivities.length);
        const newActivity = mockActivities[idx];
        if (!newActivity) return;
        const activity: Activity = {
          id: `act-${Date.now()}`,
          type: newActivity.type,
          message: newActivity.message,
          location: newActivity.location,
          timeAgo: "Just now",
          timestamp: new Date(),
        };
        if (newActivity.projectType) {
          activity.projectType = newActivity.projectType;
        }
        if (newActivity.estimatedValue) {
          activity.estimatedValue = newActivity.estimatedValue;
        }

        setActivities((prev) => [activity, ...prev].slice(0, maxActivities));
      }
    }, 30000); // Check every 30 seconds

    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activities.length, maxActivities]);

  // Auto-dismiss timer
  useEffect(() => {
    const timers: number[] = [];
    if (autoDismissSeconds > 0) {
      activities.forEach((activity) => {
        const t = window.setTimeout(() => {
          handleDismiss(activity.id);
        }, autoDismissSeconds * 1000);
        timers.push(t);
      });
    }
    return () => {
      timers.forEach((t) => clearTimeout(t));
    };
  }, [activities, autoDismissSeconds]);

  // Handle activity click - open chatbot with context
  const handleActivityClick = (activity: Activity) => {
    if (!enableChatbotIntegration) return;

    // Track click event
    if (typeof window !== "undefined" && window.gtag) {
      window.gtag("event", "activity_feed_click", {
        activity_type: activity.type,
        project_type: activity.projectType,
        location: activity.location,
        event_category: "engagement",
        event_label: "activity_feed",
      });
    }

    // Prepare context for chatbot with specific follow-up prompts
    const getSpecificPrompt = () => {
      switch (activity.type) {
        case "booking":
          return "What should I prepare for my consultation? I'd like to book one too.";
        case "estimate":
          return "How accurate are your estimates? Can I get one for my project?";
        case "consultation":
          return "What happens during a consultation? Is there any cost involved?";
        case "project_start":
          return "What's your typical project timeline? Tell me about similar projects.";
        default:
          return `Tell me more about ${activity.projectType || "similar projects"} in the ${activity.location} area`;
      }
    };

    const chatbotContext = {
      source: "activity_feed",
      activityType: activity.type,
      projectType: activity.projectType,
      location: activity.location,
      estimatedValue: activity.estimatedValue,
      message: activity.message,
      timestamp: activity.timestamp.toISOString(),
      userIntent: getSpecificPrompt(),
    };

    // Pass context to chatbot and open
    setCurrentPageData(chatbotContext);
    setIsVisible(true);

    // Optionally dismiss after clicking
    handleDismiss(activity.id);
  };

  // Handle dismiss
  const handleDismiss = (id: string) => {
    setDismissedIds((prev) => {
      const newSet = new Set(prev);
      newSet.add(id);
      return newSet;
    });

    // Remove from activities after animation
    setTimeout(() => {
      setActivities((prev) => prev.filter((act) => act.id !== id));
    }, 300);
  };

  // Get icon for activity type
  const getActivityIcon = (type: ActivityType): string => {
    switch (type) {
      case "booking":
        return "event";
      case "estimate":
        return "description";
      case "consultation":
        return "handshake";
      case "project_start":
        return "construction";
      default:
        return "notifications";
    }
  };

  // Get color classes for activity type
  const getActivityColors = (type: ActivityType) => {
    switch (type) {
      case "booking":
        return {
          bg: "bg-blue-50 dark:bg-blue-900/20",
          border: "border-blue-200 dark:border-blue-800",
          icon: "text-blue-600 dark:text-blue-400",
          iconBg: "bg-blue-100 dark:bg-blue-900/40",
        };
      case "estimate":
        return {
          bg: "bg-green-50 dark:bg-green-900/20",
          border: "border-green-200 dark:border-green-800",
          icon: "text-green-600 dark:text-green-400",
          iconBg: "bg-green-100 dark:bg-green-900/40",
        };
      case "consultation":
        return {
          bg: "bg-purple-50 dark:bg-purple-900/20",
          border: "border-purple-200 dark:border-purple-800",
          icon: "text-purple-600 dark:text-purple-400",
          iconBg: "bg-purple-100 dark:bg-purple-900/40",
        };
      case "project_start":
        return {
          bg: "bg-brand-primary/10 dark:bg-brand-primary/20",
          border: "border-brand-primary/30 dark:border-brand-primary/40",
          icon: "text-brand-primary dark:text-brand-primary-light",
          iconBg: "bg-brand-primary/20 dark:bg-brand-primary/30",
        };
      default:
        return {
          bg: "bg-gray-50 dark:bg-gray-800",
          border: "border-gray-200 dark:border-gray-700",
          icon: "text-gray-600 dark:text-gray-400",
          iconBg: "bg-gray-100 dark:bg-gray-700",
        };
    }
  };

  // Filter out dismissed activities
  const visibleActivities = activities.filter(
    (act) => !dismissedIds.has(act.id),
  );

  if (visibleActivities.length === 0) return null;

  return (
    <div
      className={`fixed bottom-4 left-4 z-40 space-y-3 max-w-sm ${
        desktopOnly ? "hidden lg:block" : ""
      }`}
      role="complementary"
      aria-label="Recent activity feed"
    >
      {visibleActivities.map((activity, _index) => {
        const colors = getActivityColors(activity.type);
        const isDismissed = dismissedIds.has(activity.id);

        return (
          // eslint-disable-next-line jsx-a11y/no-static-element-interactions -- Conditional interactivity with proper keyboard support
          <div
            key={activity.id}
            className={`
              ${colors.bg} ${colors.border}
              border rounded-lg shadow-lg backdrop-blur-sm
              transform transition-all duration-300 ease-out
              ${isDismissed ? "translate-x-[-120%] opacity-0" : "translate-x-0 opacity-100"}
              ${enableChatbotIntegration ? "cursor-pointer hover:shadow-xl hover:scale-[1.02]" : ""}
              animate-slide-in-left
            `}
            style={{
              animationDelay: `${_index * 100}ms`,
            }}
            onClick={() =>
              enableChatbotIntegration && handleActivityClick(activity)
            }
            role={enableChatbotIntegration ? "button" : "status"}
            tabIndex={enableChatbotIntegration ? 0 : undefined}
            aria-label={
              enableChatbotIntegration
                ? `${activity.type} activity: ${activity.message}`
                : undefined
            }
            onKeyDown={(e) => {
              if (
                enableChatbotIntegration &&
                (e.key === "Enter" || e.key === " ")
              ) {
                e.preventDefault();
                handleActivityClick(activity);
              }
            }}
          >
            <div className="flex items-start gap-3 p-4">
              {/* Activity Icon */}
              <div
                className={`flex-shrink-0 w-10 h-10 rounded-full ${colors.iconBg} flex items-center justify-center`}
              >
                <MaterialIcon
                  icon={getActivityIcon(activity.type)}
                  size="md"
                  className={colors.icon}
                />
              </div>

              {/* Activity Content */}
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-gray-900 dark:text-white mb-1">
                  {activity.message}
                </p>
                <div className="flex items-center gap-2 text-xs text-gray-600 dark:text-gray-400">
                  <MaterialIcon icon="location_on" size="sm" />
                  <span>{activity.location}</span>
                  <span>•</span>
                  <span>{activity.timeAgo}</span>
                </div>
                {activity.projectType && (
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    {activity.projectType}
                    {activity.estimatedValue && (
                      <span className="ml-1 font-medium text-gray-700 dark:text-gray-300">
                        • {activity.estimatedValue}
                      </span>
                    )}
                  </p>
                )}
                {enableChatbotIntegration && (
                  <p className="text-xs text-blue-600 dark:text-blue-400 mt-2 flex items-center gap-1">
                    <MaterialIcon icon="chat" size="sm" />
                    Click to learn more
                  </p>
                )}
              </div>

              {/* Dismiss Button */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleDismiss(activity.id);
                }}
                className="flex-shrink-0 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                aria-label="Dismiss notification"
              >
                <MaterialIcon icon="close" size="sm" />
              </button>
            </div>
          </div>
        );
      })}

      {/* Attribution footer */}
      <div className="text-center">
        <p className="text-xs text-gray-500 dark:text-gray-400 px-2">
          Live activity from our community
        </p>
      </div>
    </div>
  );
}
