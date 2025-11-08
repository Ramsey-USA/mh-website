"use client";

import { MaterialIcon } from "@/components/icons/MaterialIcon";
import { Button } from "@/components/ui";
import { FadeInWhenVisible } from "@/components/animations/FramerMotionComponents";
import { useGlobalChatbot } from "@/providers/GlobalChatbotProvider";

interface ChatbotCTASectionProps {
  /**
   * Title for the section
   * @default "Have Questions?"
   */
  title?: string;
  /**
   * Subtitle/description
   * @default "Chat with General MH for instant answers"
   */
  subtitle?: string;
  /**
   * List of example questions to show
   */
  exampleQuestions?: string[];
  /**
   * Context/category for the chatbot (helps pre-filter responses)
   */
  context?: "services" | "careers" | "booking" | "general";
  /**
   * Additional CSS classes
   */
  className?: string;
}

/**
 * ChatbotCTASection Component
 *
 * Replaces static FAQ sections with an interactive chatbot CTA.
 * Shows example questions and opens the chatbot with context.
 *
 * @example
 * ```tsx
 * <ChatbotCTASection
 *   context="services"
 *   exampleQuestions={[
 *     "What are your payment terms?",
 *     "Do you offer warranties?",
 *     "What is your safety record?"
 *   ]}
 * />
 * ```
 */
export function ChatbotCTASection({
  title = "Have Questions?",
  subtitle = "Chat with General MH for instant, personalized answers",
  exampleQuestions = [],
  context = "general",
  className = "",
}: ChatbotCTASectionProps) {
  const { setIsVisible, setFormData } = useGlobalChatbot();

  const handleAskQuestion = (question?: string) => {
    // Set context if provided
    if (question) {
      setFormData({ initialMessage: question, context });
    }
    // Ensure chatbot is visible
    setIsVisible(true);
    // Scroll to chatbot (it's at bottom right)
    setTimeout(() => {
      const chatbot = document.querySelector("[data-chatbot]");
      if (chatbot) {
        chatbot.scrollIntoView({ behavior: "smooth", block: "nearest" });
      }
    }, 100);
  };

  return (
    <section
      className={`py-16 sm:py-20 lg:py-24 bg-gradient-to-br from-primary-50 via-secondary-50 to-accent-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 ${className}`}
    >
      <div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
        <FadeInWhenVisible>
          {/* Header */}
          <div className="mb-12 text-center">
            <div className="flex justify-center items-center mb-6">
              <div className="flex justify-center items-center bg-gradient-to-br from-primary-500 to-secondary-500 rounded-full w-20 h-20 animate-pulse">
                <MaterialIcon
                  icon="smart_toy"
                  size="2xl"
                  className="text-white"
                />
              </div>
            </div>
            <h2 className="mb-4 font-black text-gray-900 dark:text-white text-3xl sm:text-4xl md:text-5xl">
              {title}
            </h2>
            <p className="mx-auto max-w-2xl text-gray-600 dark:text-gray-300 text-lg sm:text-xl leading-relaxed">
              {subtitle}
            </p>
          </div>

          {/* Main CTA Card */}
          <div className="relative bg-white dark:bg-gray-800 shadow-2xl mb-8 p-8 sm:p-12 rounded-2xl border border-gray-200 dark:border-gray-700 overflow-hidden">
            {/* Decorative Elements */}
            <div className="top-0 right-0 absolute bg-gradient-to-bl from-primary-100/50 to-transparent dark:from-primary-900/20 rounded-bl-full w-32 h-32"></div>
            <div className="bottom-0 left-0 absolute bg-gradient-to-tr from-secondary-100/50 to-transparent dark:from-secondary-900/20 rounded-tr-full w-24 h-24"></div>

            <div className="relative text-center">
              <h3 className="mb-4 font-bold text-gray-900 dark:text-white text-2xl sm:text-3xl">
                Ask General MH Anything
              </h3>
              <p className="mb-8 text-gray-600 dark:text-gray-300 text-lg leading-relaxed">
                Our AI assistant has instant answers about services, pricing,
                timelines, safety records, veteran benefits, careers, and more.
                Get personalized responses in seconds.
              </p>

              {/* Primary CTA Button */}
              <Button
                onClick={() => handleAskQuestion()}
                variant="primary"
                size="lg"
                className="shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
              >
                <MaterialIcon icon="chat" size="lg" className="mr-3" />
                <span className="font-bold text-lg">Start Chatting</span>
              </Button>

              {/* Trust Indicators */}
              <div className="flex sm:flex-row flex-col justify-center items-center gap-4 sm:gap-6 mt-8 text-gray-600 text-sm dark:text-gray-400">
                <div className="flex items-center gap-2">
                  <MaterialIcon
                    icon="bolt"
                    size="sm"
                    className="text-primary-600"
                  />
                  <span>Instant Responses</span>
                </div>
                <div className="flex items-center gap-2">
                  <MaterialIcon
                    icon="lock"
                    size="sm"
                    className="text-secondary-600"
                  />
                  <span>Secure & Private</span>
                </div>
                <div className="flex items-center gap-2">
                  <MaterialIcon
                    icon="support_agent"
                    size="sm"
                    className="text-accent-600"
                  />
                  <span>24/7 Available</span>
                </div>
              </div>
            </div>
          </div>

          {/* Example Questions */}
          {exampleQuestions.length > 0 && (
            <div className="text-center">
              <p className="mb-4 font-semibold text-gray-700 dark:text-gray-300 text-sm uppercase tracking-wide">
                Popular Questions
              </p>
              <div className="flex flex-wrap justify-center gap-3">
                {exampleQuestions.map((question, index) => (
                  <button
                    key={index}
                    onClick={() => handleAskQuestion(question)}
                    className="inline-flex items-center gap-2 bg-white dark:bg-gray-800 hover:bg-primary-50 dark:hover:bg-gray-700 shadow-md hover:shadow-lg px-4 py-2 border border-gray-200 dark:border-gray-700 rounded-full transition-all duration-200 text-gray-700 text-sm dark:text-gray-300 hover:text-primary-700 dark:hover:text-primary-400"
                  >
                    <MaterialIcon icon="chat_bubble_outline" size="sm" />
                    <span>{question}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Alternative Contact */}
          <div className="mt-12 text-center">
            <p className="mb-4 text-gray-600 text-sm dark:text-gray-400">
              Prefer to speak with a human?
            </p>
            <div className="flex sm:flex-row flex-col justify-center items-center gap-4">
              <a
                href="tel:+15093086489"
                className="inline-flex items-center gap-2 text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300 transition-colors"
              >
                <MaterialIcon icon="phone" size="sm" />
                <span className="font-semibold">(509) 308-6489</span>
              </a>
              <span className="text-gray-400">|</span>
              <a
                href="/contact"
                className="inline-flex items-center gap-2 text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300 transition-colors"
              >
                <MaterialIcon icon="mail" size="sm" />
                <span className="font-semibold">Contact Form</span>
              </a>
            </div>
          </div>
        </FadeInWhenVisible>
      </div>
    </section>
  );
}
