/**
 * Advanced Chatbot Features
 * Conversation history, export functionality, and persistence
 */

import { useCallback, useEffect, useState } from "react";

export interface ConversationHistory {
  id: string;
  timestamp: Date;
  messages: any[];
  sessionDuration: number;
  userMetadata: {
    page: string;
    isVeteran?: boolean;
    projectType?: string;
    leadGenerated?: boolean;
  };
}

// Local storage keys
const STORAGE_KEYS = {
  CONVERSATION_HISTORY: "mh_chatbot_history",
  CURRENT_SESSION: "mh_chatbot_current_session",
  USER_PREFERENCES: "mh_chatbot_preferences",
};

// Conversation persistence utilities
export class ConversationPersistence {
  static saveCurrentSession(messages: any[], sessionData: any): void {
    try {
      const sessionInfo = {
        messages,
        sessionData,
        timestamp: new Date().toISOString(),
        lastActivity: new Date().toISOString(),
      };
      localStorage.setItem(
        STORAGE_KEYS.CURRENT_SESSION,
        JSON.stringify(sessionInfo),
      );
    } catch (error) {
      console.error("Failed to save current session:", error);
    }
  }

  static loadCurrentSession(): { messages: any[]; sessionData: any } | null {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.CURRENT_SESSION);
      if (saved) {
        const sessionInfo = JSON.parse(saved);
        const lastActivity = new Date(sessionInfo.lastActivity);
        const now = new Date();

        // Only restore if session is less than 1 hour old
        if (now.getTime() - lastActivity.getTime() < 60 * 60 * 1000) {
          return {
            messages: sessionInfo.messages || [],
            sessionData: sessionInfo.sessionData || {},
          };
        }
      }
    } catch (error) {
      console.error("Failed to load current session:", error);
    }
    return null;
  }

  static clearCurrentSession(): void {
    try {
      localStorage.removeItem(STORAGE_KEYS.CURRENT_SESSION);
    } catch (error) {
      console.error("Failed to clear current session:", error);
    }
  }

  static saveConversationHistory(conversation: ConversationHistory): void {
    try {
      const history = this.getConversationHistory();
      history.unshift(conversation); // Add to beginning

      // Keep only last 10 conversations
      const trimmedHistory = history.slice(0, 10);

      localStorage.setItem(
        STORAGE_KEYS.CONVERSATION_HISTORY,
        JSON.stringify(trimmedHistory),
      );
    } catch (error) {
      console.error("Failed to save conversation history:", error);
    }
  }

  static getConversationHistory(): ConversationHistory[] {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.CONVERSATION_HISTORY);
      return saved ? JSON.parse(saved) : [];
    } catch (error) {
      console.error("Failed to load conversation history:", error);
      return [];
    }
  }

  static exportConversation(conversation: ConversationHistory): string {
    const header = `# MH Construction - Conversation Export
**Date:** ${conversation.timestamp.toLocaleString()}
**Duration:** ${Math.round(conversation.sessionDuration / 60)} minutes
**Page:** ${conversation.userMetadata.page}
${conversation.userMetadata.isVeteran ? "**Veteran Priority Service**\n" : ""}
${conversation.userMetadata.projectType ? `**Project Type:** ${conversation.userMetadata.projectType}\n` : ""}
${conversation.userMetadata.leadGenerated ? "**Lead Generated:** Yes\n" : ""}

---

`;

    const messages = conversation.messages
      .map((message) => {
        const timestamp = new Date(message.timestamp).toLocaleTimeString();
        const sender = message.type === "user" ? "You" : "General MH";
        return `**[${timestamp}] ${sender}:**\n${message.content}\n`;
      })
      .join("\n");

    const footer = `\n---

*This conversation was exported from MH Construction's AI Assistant.*
*For immediate assistance, contact us at (509) 308-6489*
*Visit us at: https://mhconstruction.com*`;

    return header + messages + footer;
  }

  static downloadConversation(conversation: ConversationHistory): void {
    const content = this.exportConversation(conversation);
    const blob = new Blob([content], { type: "text/markdown" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = `mh-conversation-${conversation.timestamp.toISOString().split("T")[0]}.md`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }
}

// Hook for conversation history management
export function useConversationHistory() {
  const [history, setHistory] = useState<ConversationHistory[]>([]);
  const [currentSession, setCurrentSession] = useState<any>(null);

  // Load history on mount
  useEffect(() => {
    const savedHistory = ConversationPersistence.getConversationHistory();
    setHistory(savedHistory);

    const savedSession = ConversationPersistence.loadCurrentSession();
    if (savedSession) {
      setCurrentSession(savedSession);
    }
  }, []);

  // Save conversation to history
  const saveConversation = useCallback(
    (messages: any[], sessionDuration: number, userMetadata: any) => {
      const conversation: ConversationHistory = {
        id: `conv_${Date.now()}`,
        timestamp: new Date(),
        messages: messages.filter((m) => m.type !== "system"), // Exclude system messages
        sessionDuration,
        userMetadata,
      };

      ConversationPersistence.saveConversationHistory(conversation);
      setHistory((prev) => [conversation, ...prev.slice(0, 9)]); // Keep only 10
      ConversationPersistence.clearCurrentSession();
    },
    [],
  );

  // Export conversation
  const exportConversation = useCallback(
    (conversation: ConversationHistory) => {
      ConversationPersistence.downloadConversation(conversation);
    },
    [],
  );

  // Clear all history
  const clearHistory = useCallback(() => {
    try {
      localStorage.removeItem(STORAGE_KEYS.CONVERSATION_HISTORY);
      setHistory([]);
    } catch (error) {
      console.error("Failed to clear history:", error);
    }
  }, []);

  // Save current session (called periodically)
  const saveCurrentSession = useCallback(
    (messages: any[], sessionData: any) => {
      ConversationPersistence.saveCurrentSession(messages, sessionData);
      setCurrentSession({ messages, sessionData });
    },
    [],
  );

  return {
    history,
    currentSession,
    saveConversation,
    exportConversation,
    clearHistory,
    saveCurrentSession,
  };
}

// User preferences management
export class UserPreferences {
  static save(preferences: any): void {
    try {
      localStorage.setItem(
        STORAGE_KEYS.USER_PREFERENCES,
        JSON.stringify(preferences),
      );
    } catch (error) {
      console.error("Failed to save user preferences:", error);
    }
  }

  static load(): any {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.USER_PREFERENCES);
      return saved ? JSON.parse(saved) : {};
    } catch (error) {
      console.error("Failed to load user preferences:", error);
      return {};
    }
  }

  static clear(): void {
    try {
      localStorage.removeItem(STORAGE_KEYS.USER_PREFERENCES);
    } catch (error) {
      console.error("Failed to clear user preferences:", error);
    }
  }
}

// Quick actions and templates
export const QUICK_TEMPLATES = {
  "estimate-request": {
    title: "Request Project Estimate",
    template: `I'd like to get an estimate for a {PROJECT_TYPE} project. Here are the details:

**Project Location:** {LOCATION}
**Project Size:** {SIZE}
**Timeline:** {TIMELINE}
**Budget Range:** {BUDGET}

Additional details: {DETAILS}`,
    fields: [
      "PROJECT_TYPE",
      "LOCATION",
      "SIZE",
      "TIMELINE",
      "BUDGET",
      "DETAILS",
    ],
  },
  "veteran-inquiry": {
    title: "Veteran Service Inquiry",
    template: `I'm a veteran interested in your construction services. I'd like to know more about:

• Veteran discounts and priority scheduling
• Services available for {SERVICE_TYPE}
• Timeline and availability
• VA loan coordination if applicable

Thank you for your service to veterans!`,
    fields: ["SERVICE_TYPE"],
  },
  "emergency-support": {
    title: "Emergency Construction Support",
    template: `I have an urgent construction issue that needs immediate attention:

**Type of Emergency:** {EMERGENCY_TYPE}
**Location:** {LOCATION}
**Urgency Level:** {URGENCY}
**Description:** {DESCRIPTION}

Please contact me as soon as possible.`,
    fields: ["EMERGENCY_TYPE", "LOCATION", "URGENCY", "DESCRIPTION"],
  },
  "consultation-booking": {
    title: "Schedule Consultation",
    template: `I'd like to schedule a consultation for a {PROJECT_TYPE} project:

**Preferred Date Range:** {DATE_RANGE}
**Preferred Time:** {TIME_PREFERENCE}
**Project Location:** {LOCATION}
**Brief Description:** {DESCRIPTION}

Is a site visit needed? {SITE_VISIT}`,
    fields: [
      "PROJECT_TYPE",
      "DATE_RANGE",
      "TIME_PREFERENCE",
      "LOCATION",
      "DESCRIPTION",
      "SITE_VISIT",
    ],
  },
};

const advancedFeatures = {
  ConversationPersistence,
  useConversationHistory,
  UserPreferences,
  QUICK_TEMPLATES,
};

export default advancedFeatures;
