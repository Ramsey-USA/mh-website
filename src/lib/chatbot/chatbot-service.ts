/**
 * Chatbot Service - Context-Aware Response System
 *
 * Provides helpful, honest responses based on user questions
 * and current page context. Guides users to human consultation.
 */

import {
  CHATBOT_CONFIG,
  type ChatbotContext,
  type ChatbotMessage,
} from "./chatbot-config";

interface ResponseMatch {
  keywords: string[];
  response: string;
  priority: number;
}

const CONTEXT_RESPONSES: Record<ChatbotContext, ResponseMatch[]> = {
  services: [
    {
      keywords: ["price", "cost", "estimate", "quote", "budget", "how much"],
      response: CHATBOT_CONFIG.responses.estimateRequest,
      priority: 10,
    },
    {
      keywords: ["services", "what do you do", "capabilities", "types"],
      response:
        "We handle residential, commercial, and government construction projects. From custom homes to large-scale commercial builds. What type of project interests you?",
      priority: 8,
    },
    {
      keywords: ["warranty", "guarantee", "quality"],
      response:
        "Quality is our commitment. We stand behind our work with comprehensive warranties and ongoing support. Want to discuss specific project guarantees?",
      priority: 7,
    },
  ],

  booking: [
    {
      keywords: ["schedule", "appointment", "consultation", "meet", "visit"],
      response:
        "I can help you schedule a free consultation! You can book online right on this page, or call (509) 308-6489 to speak with someone directly.",
      priority: 10,
    },
    {
      keywords: ["available", "availability", "when", "timeline", "start"],
      response:
        "Project timelines depend on scope and current workload. The best way to get accurate timing is through a consultation where we can assess your specific needs.",
      priority: 8,
    },
  ],

  careers: [
    {
      keywords: [
        "apply",
        "application",
        "job",
        "position",
        "hiring",
        "openings",
      ],
      response:
        "We're always looking for skilled craftsmen who share our values. Check out our open positions on this page, or call (509) 308-6489 to discuss opportunities.",
      priority: 10,
    },
    {
      keywords: ["veteran", "military", "benefits"],
      response:
        "As a veteran-owned company, we highly value military experience and actively recruit veterans. We understand the unique skills and discipline military service provides.",
      priority: 9,
    },
    {
      keywords: ["culture", "values", "work environment"],
      response:
        "Our culture is built on Honest Communication and Proven Craftsmanship. We're a veteran-owned team that values integrity, precision, and quality work.",
      priority: 8,
    },
  ],

  contact: [
    {
      keywords: ["phone", "call", "email", "address", "location", "reach"],
      response: CHATBOT_CONFIG.responses.contactInfo,
      priority: 10,
    },
    {
      keywords: ["hours", "when open", "availability"],
      response:
        "We're available during business hours Monday-Friday. For urgent matters, call (509) 308-6489. We'll get back to you promptly.",
      priority: 8,
    },
  ],

  about: [
    {
      keywords: ["veteran", "military", "owned", "history"],
      response: CHATBOT_CONFIG.responses.veteranValues,
      priority: 10,
    },
    {
      keywords: ["team", "who", "people", "staff"],
      response:
        "Our team includes experienced craftsmen, project managers, and support staff - many with military backgrounds. Check out our Team page to meet everyone!",
      priority: 8,
    },
    {
      keywords: ["values", "mission", "philosophy"],
      response:
        "We're guided by two core principles: Honest Communication and Proven Craftsmanship. No sales pressure, no gimmicks - just quality work and transparent partnerships.",
      priority: 9,
    },
  ],

  projects: [
    {
      keywords: ["portfolio", "examples", "work", "projects", "see"],
      response:
        "Browse our completed projects on this page to see the quality and range of our work. Each project reflects our commitment to craftsmanship.",
      priority: 10,
    },
    {
      keywords: ["similar", "like mine", "type"],
      response:
        "Every project is unique! The best way to discuss how we can help with your specific needs is through a consultation. Want to schedule one?",
      priority: 8,
    },
  ],

  homepage: [
    {
      keywords: ["what", "about", "who", "company"],
      response:
        "We're MH Construction - a veteran-owned construction company serving the Pacific Northwest. We specialize in residential, commercial, and government projects with a focus on honest communication and proven craftsmanship.",
      priority: 10,
    },
  ],

  general: [],
};

const GENERAL_RESPONSES: ResponseMatch[] = [
  {
    keywords: ["price", "cost", "estimate", "quote", "budget", "how much"],
    response: CHATBOT_CONFIG.responses.pricingQuestion,
    priority: 10,
  },
  {
    keywords: ["contact", "phone", "email", "call", "reach"],
    response: CHATBOT_CONFIG.responses.contactInfo,
    priority: 9,
  },
  {
    keywords: ["veteran", "military", "service"],
    response: CHATBOT_CONFIG.responses.veteranValues,
    priority: 9,
  },
  {
    keywords: ["services", "what do you do", "capabilities"],
    response: CHATBOT_CONFIG.responses.servicesQuestion,
    priority: 8,
  },
  {
    keywords: ["next steps", "get started", "begin", "start"],
    response: CHATBOT_CONFIG.responses.nextSteps,
    priority: 8,
  },
  {
    keywords: ["location", "area", "where", "serve"],
    response:
      "We serve the Pacific Northwest - primarily Washington, Oregon, and Idaho. Based in the Tri-Cities area with project reach throughout the region.",
    priority: 7,
  },
  {
    keywords: ["experience", "years", "history", "established"],
    response:
      "MH Construction has been serving the Pacific Northwest since 2010, bringing decades of combined experience from our veteran-led team.",
    priority: 7,
  },
  {
    keywords: ["safety", "insurance", "licensed", "bonded"],
    response:
      "Safety is paramount. We're fully licensed, bonded, and insured with comprehensive safety protocols on every job site.",
    priority: 7,
  },
];

/**
 * Generate a response based on user message and context
 */
export function generateResponse(
  userMessage: string,
  context: ChatbotContext,
): string {
  const normalizedMessage = userMessage.toLowerCase();

  // Check context-specific responses first
  const contextMatches = CONTEXT_RESPONSES[context] || [];
  const allMatches = [...contextMatches, ...GENERAL_RESPONSES];

  // Find best match
  let bestMatch: ResponseMatch | null = null;
  let bestScore = 0;

  for (const match of allMatches) {
    const matchCount = match.keywords.filter((keyword) =>
      normalizedMessage.includes(keyword.toLowerCase()),
    ).length;

    if (matchCount > 0) {
      const score = matchCount * match.priority;
      if (score > bestScore) {
        bestScore = score;
        bestMatch = match;
      }
    }
  }

  // Return matched response or default
  if (bestMatch) {
    return bestMatch.response;
  }

  // Default response when no match found
  return "I want to give you an accurate answer. Could you rephrase your question, or would you like to speak with our team directly? Call (509) 308-6489 or schedule a consultation.";
}

/**
 * Get example questions for a given context
 */
export function getExampleQuestions(context: ChatbotContext): string[] {
  const examples: Record<ChatbotContext, string[]> = {
    services: [
      "What types of construction do you specialize in?",
      "Do you offer warranties on your work?",
      "How do I schedule a consultation?",
      "What areas do you serve?",
    ],
    booking: [
      "How long does a typical consultation take?",
      "What should I prepare for our meeting?",
      "Can you visit my project site?",
      "When are you available?",
    ],
    careers: [
      "What positions are currently open?",
      "Do you hire veterans?",
      "What's the work culture like?",
      "How do I apply?",
    ],
    contact: [
      "What's the best way to reach you?",
      "What are your business hours?",
      "Do you offer emergency services?",
      "Where are you located?",
    ],
    about: [
      "What makes MH Construction different?",
      "Who owns the company?",
      "How long have you been in business?",
      "What are your core values?",
    ],
    projects: [
      "Can I see examples of your work?",
      "What's your largest completed project?",
      "Do you have experience with [project type]?",
      "Can you provide references?",
    ],
    homepage: [
      "What services do you offer?",
      "How do I get started?",
      "Are you a veteran-owned business?",
      "How can I contact you?",
    ],
    general: [
      "What services do you offer?",
      "How do I schedule a consultation?",
      "What makes you different?",
      "How can I contact you?",
    ],
  };

  return examples[context] || examples.general;
}

/**
 * Create a new chatbot message
 */
export function createMessage(
  role: "user" | "assistant",
  content: string,
  context: ChatbotContext = "general",
): ChatbotMessage {
  return {
    id: `msg_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    role,
    content,
    timestamp: new Date(),
    context,
  };
}
