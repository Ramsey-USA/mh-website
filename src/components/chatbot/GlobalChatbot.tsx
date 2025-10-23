"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import { Button, Card, CardHeader, CardContent, Input } from "../ui";
import { MaterialIcon } from "../icons/MaterialIcon";
import { militaryConstructionAI } from "@/lib/militaryConstructionAI";

interface ChatMessage {
  id: string;
  type: "user" | "bot";
  content: string;
  timestamp: Date;
  metadata?: {
    estimateData?: any;
    actionRequired?: boolean;
    priority?: "low" | "medium" | "high" | "critical";
  };
}

interface GlobalChatbotProps {
  estimatorData?: any;
  onEstimateRequest?: (data: any) => void;
  currentPage?: string;
}

export function GlobalChatbot({
  estimatorData,
  onEstimateRequest,
  currentPage = "",
}: GlobalChatbotProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [position, setPosition] = useState({ x: 24, y: 24 }); // Bottom right default
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "1",
      type: "bot",
      content:
        "**General MH** reporting for duty! [MILITARY_TECH]\n\nI'm your **AI construction intelligence officer**, ready to provide **tactical guidance** on your building missions. Whether you need **reconnaissance** on materials, **strategic planning** for timelines, or **intel** on costs - I've got your six.\n\n**What's your mission objective today, soldier?**",
      timestamp: new Date(),
      metadata: { priority: "high" },
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatbotRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    // Set initial position to bottom right
    const updatePosition = () => {
      if (!isDragging) {
        setPosition({
          x: window.innerWidth - 400 - 24, // Account for chatbot width + padding
          y: window.innerHeight - (isOpen ? 600 : 80) - 24, // Account for height + padding
        });
      }
    };

    updatePosition();
    window.addEventListener("resize", updatePosition);
    return () => window.removeEventListener("resize", updatePosition);
  }, [isOpen, isDragging]);

  // Enhanced AI Response System with advanced lead qualification
  const generateArmyResponse = async (userMessage: string): Promise<string> => {
    // Add comprehensive context for advanced intelligence
    const pageContext = {
      ...estimatorData,
      currentPage,
      isEstimatorPage: currentPage?.includes("/estimator"),
      isHomePage: currentPage === "/",
      isServicesPage: currentPage?.includes("/services"),
      isProjectsPage: currentPage?.includes("/projects"),
      isAboutPage: currentPage?.includes("/about"),
      isContactPage: currentPage?.includes("/contact"),
      isBookingPage: currentPage?.includes("/booking"),
    };

    // Advanced lead qualification triggers
    const businessKeywords = [
      "project",
      "estimate",
      "cost",
      "budget",
      "build",
      "construction",
      "remodel",
      "renovation",
      "addition",
      "kitchen",
      "bathroom",
      "commercial",
      "consultation",
      "quote",
      "price",
      "timeline",
      "contractor",
      "hire",
      "service",
      "work",
      "job",
    ];

    const hasBusinessKeyword = businessKeywords.some((keyword) =>
      userMessage.toLowerCase().includes(keyword)
    );

    // Deploy advanced lead qualification for business inquiries
    if (hasBusinessKeyword) {
      const leadQualification =
        militaryConstructionAI.getLeadQualificationGuidance(
          userMessage,
          pageContext
        );

      // Check for veteran status and apply priority processing
      const veteranAnalysis =
        militaryConstructionAI.analyzeVeteranStatus(userMessage);

      if (veteranAnalysis.isVeteran) {
        const veteranPriority = militaryConstructionAI.processVeteranPriority(
          veteranAnalysis,
          { message: userMessage, context: pageContext }
        );

        // Combine lead qualification with veteran priority information
        return `${leadQualification}

---

${veteranPriority.processingProtocol}

${veteranPriority.specialAssignment}

**[MILITARY_TECH] VETERAN SUPPORT SERVICES:**
${veteranPriority.supportServices.map((service) => `• ${service}`).join("\n")}

${veteranPriority.expeditedTimeline}

---
**Thank you for your service! [FLAG]**
*MH Construction is honored to serve those who served.*`;
      }

      return leadQualification;
    }

    // Specialized form assistance based on current page
    if (pageContext.isContactPage) {
      const formAssistance = militaryConstructionAI.getContactFormAssistance(
        userMessage,
        pageContext
      );
      return formAssistance;
    }

    if (pageContext.isBookingPage) {
      const bookingAssistance = militaryConstructionAI.getBookingFormAssistance(
        userMessage,
        pageContext
      );
      return bookingAssistance;
    }

    // Standard military AI response for general inquiries
    return militaryConstructionAI.generateResponse(userMessage, pageContext);
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      type: "user",
      content: inputValue,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setIsTyping(true);

    // Enhanced AI processing with lead intelligence
    setTimeout(async () => {
      const botResponse = await generateArmyResponse(inputValue);

      // Analyze message for lead qualification metadata
      const isBusinessInquiry = [
        "project",
        "estimate",
        "cost",
        "budget",
        "build",
        "construction",
        "remodel",
        "renovation",
        "consultation",
        "quote",
        "price",
      ].some((keyword) => inputValue.toLowerCase().includes(keyword));

      const isVeteranLead = [
        "veteran",
        "military",
        "service",
        "army",
        "navy",
        "marines",
        "air force",
        "coast guard",
      ].some((keyword) => inputValue.toLowerCase().includes(keyword));

      const isUrgent = [
        "urgent",
        "urgent support",
        "critical",
        "asap",
        "immediately",
        "soon",
        "quickly",
      ].some((keyword) => inputValue.toLowerCase().includes(keyword));

      // Determine message priority based on lead qualification
      let priority: "low" | "medium" | "high" | "critical" = "medium";
      if (isUrgent && isBusinessInquiry) priority = "critical";
      else if (isVeteranLead && isBusinessInquiry) priority = "critical";
      else if (isBusinessInquiry) priority = "high";
      else if (isVeteranLead) priority = "high";

      const botMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        type: "bot",
        content: botResponse,
        timestamp: new Date(),
        metadata: {
          priority,
          actionRequired: isBusinessInquiry || isVeteranLead,
          estimateData: isBusinessInquiry
            ? {
                userInput: inputValue,
                leadType: isVeteranLead ? "veteran" : "civilian",
                urgency: isUrgent ? "high" : "normal",
              }
            : undefined,
        },
      };

      setMessages((prev) => [...prev, botMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  // Dragging handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    if ((e.target as HTMLElement).closest(".chat-content")) return; // Don't drag when clicking content

    setIsDragging(true);
    const rect = chatbotRef.current?.getBoundingClientRect();
    if (rect) {
      setDragOffset({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
    }
  };

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (!isDragging) return;

      const newX = Math.max(
        0,
        Math.min(window.innerWidth - 400, e.clientX - dragOffset.x)
      );
      const newY = Math.max(
        0,
        Math.min(
          window.innerHeight - (isOpen ? 600 : 80),
          e.clientY - dragOffset.y
        )
      );

      setPosition({ x: newX, y: newY });
    },
    [isDragging, dragOffset.x, dragOffset.y, isOpen]
  );

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  useEffect(() => {
    if (isDragging) {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
      return () => {
        document.removeEventListener("mousemove", handleMouseMove);
        document.removeEventListener("mouseup", handleMouseUp);
      };
    }
  }, [isDragging, dragOffset, handleMouseMove, handleMouseUp]);

  // Floating AI Icon (when closed)
  if (!isOpen) {
    return (
      <div
        ref={chatbotRef}
        className="z-50 fixed cursor-move"
        style={{
          right: `${24}px`,
          bottom: `${24}px`,
        }}
        onMouseDown={handleMouseDown}
      >
        <Button
          onClick={(e) => {
            e.stopPropagation();
            setIsOpen(true);
          }}
          className="group flex justify-center items-center bg-gradient-to-r from-green-600 hover:from-green-700 to-green-800 hover:to-green-900 shadow-2xl rounded-full w-16 h-16 hover:scale-110 transition-all duration-300"
          aria-label="Open General MH - AI Construction Assistant"
        >
          <MaterialIcon
            icon="smart_toy"
            size="xl"
            className="text-white group-hover:animate-pulse"
          />
          <div className="-top-2 -right-2 absolute bg-green-400 rounded-full w-4 h-4 animate-pulse"></div>
        </Button>
        {/* Tooltip */}
        <div className="right-0 bottom-full absolute bg-gray-900 opacity-0 group-hover:opacity-100 mb-2 px-3 py-1 rounded-lg text-white text-sm whitespace-nowrap transition-opacity">
          General MH - AI Assistant
        </div>
      </div>
    );
  }

  // Full Chatbot Interface
  return (
    <div
      ref={chatbotRef}
      className="z-50 fixed"
      style={{
        right: `${24}px`,
        bottom: `${24}px`,
        width: "400px",
        height: isMinimized ? "60px" : "600px",
      }}
      onMouseDown={handleMouseDown}
    >
      <Card className="flex flex-col bg-white shadow-2xl border-2 border-green-700/20 h-full overflow-hidden">
        {/* Header - Always visible */}
        <CardHeader className="bg-gradient-to-r from-green-800 to-green-900 p-3 text-white cursor-move">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-3">
              <div className="relative">
                <MaterialIcon
                  icon="smart_toy"
                  size="xl"
                  className="text-green-300"
                />
                <div className="-top-1 -right-1 absolute bg-green-400 rounded-full w-3 h-3 animate-pulse"></div>
              </div>
              <div>
                <h3 className="font-bold text-lg">General MH</h3>
                <p className="opacity-90 text-sm">AI Construction Officer</p>
              </div>
            </div>
            <div className="flex items-center space-x-1">
              <Button
                variant="ghost"
                size="sm"
                onClick={(e) => {
                  e.stopPropagation();
                  setIsMinimized(!isMinimized);
                }}
                className="hover:bg-white/20 p-0 w-8 h-8 text-white"
              >
                {isMinimized ? (
                  <MaterialIcon icon="open_in_full" size="sm" />
                ) : (
                  <MaterialIcon icon="close_fullscreen" size="sm" />
                )}
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={(e) => {
                  e.stopPropagation();
                  setIsOpen(false);
                }}
                className="hover:bg-white/20 p-0 w-8 h-8 text-white"
              >
                <MaterialIcon icon="close" size="sm" />
              </Button>
            </div>
          </div>
        </CardHeader>

        {/* Chat Content - Hidden when minimized */}
        {!isMinimized && (
          <>
            {/* Messages */}
            <div className="flex-1 space-y-4 bg-gray-50 p-4 overflow-y-auto chat-content">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${
                    message.type === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`max-w-[80%] p-3 rounded-lg ${
                      message.type === "user"
                        ? "bg-green-600 text-white"
                        : "bg-white border shadow-sm"
                    }`}
                  >
                    {message.type === "bot" ? (
                      <div className="prose prose-sm">
                        {message.content.split("\n").map((line, index) => {
                          if (line.startsWith("**") && line.endsWith("**")) {
                            return (
                              <div
                                key={index}
                                className="mb-1 font-bold text-green-800"
                              >
                                {line.replace(/\*\*/g, "")}
                              </div>
                            );
                          }
                          if (line.startsWith("•")) {
                            return (
                              <div
                                key={index}
                                className="ml-2 text-gray-700 text-sm"
                              >
                                {line}
                              </div>
                            );
                          }
                          if (line.trim()) {
                            return (
                              <div
                                key={index}
                                className="mb-1 text-gray-800 text-sm"
                              >
                                {line}
                              </div>
                            );
                          }
                          return <div key={index} className="h-2"></div>;
                        })}
                      </div>
                    ) : (
                      <p className="text-sm">{message.content}</p>
                    )}
                    <div
                      className={`text-xs mt-2 ${
                        message.type === "user"
                          ? "text-white/70"
                          : "text-gray-500"
                      }`}
                    >
                      {message.timestamp.toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </div>
                  </div>
                </div>
              ))}

              {/* Typing Indicator */}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-white shadow-sm p-3 border rounded-lg">
                    <div className="flex space-x-1">
                      <div className="bg-gray-400 rounded-full w-2 h-2 animate-bounce"></div>
                      <div
                        className="bg-gray-400 rounded-full w-2 h-2 animate-bounce"
                        style={{ animationDelay: "0.1s" }}
                      ></div>
                      <div
                        className="bg-gray-400 rounded-full w-2 h-2 animate-bounce"
                        style={{ animationDelay: "0.2s" }}
                      ></div>
                    </div>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="bg-white p-4 border-t chat-content">
              <div className="flex space-x-2">
                <Input
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Enter your construction mission details..."
                  className="flex-1 border-gray-300 focus:border-green-600"
                />
                <Button
                  onClick={handleSendMessage}
                  disabled={!inputValue.trim() || isTyping}
                  className="bg-green-600 hover:bg-green-700 px-3"
                >
                  <MaterialIcon icon="send" size="sm" />
                </Button>
              </div>
              <div className="mt-2 text-gray-500 text-xs text-center">
                [MILITARY_TECH] **Tactical AI** - Powered by military precision
                • Drag to move
              </div>
            </div>
          </>
        )}
      </Card>
    </div>
  );
}
