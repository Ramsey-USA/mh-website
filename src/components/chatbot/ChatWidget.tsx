"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import { MaterialIcon } from "@/components/icons/MaterialIcon";
import { useLocale } from "@/hooks/useLocale";

// ── Types ────────────────────────────────────────────────────────────────────

interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
}

// ── Constants ────────────────────────────────────────────────────────────────

/** Time in ms before showing proactive prompt (default: 60 seconds) */
const PROACTIVE_PROMPT_DELAY = 60_000;

/** Session storage key to track if prompt was already shown */
const PROACTIVE_PROMPT_KEY = "mhc-chat-prompted";

function createChatMessage(
  role: ChatMessage["role"],
  content: string,
): ChatMessage {
  return {
    id: crypto.randomUUID(),
    role,
    content,
  };
}

function getApiFallbackReply(isEs: boolean): string {
  if (isEs) {
    return "No pude procesar eso. Llame al (509) 308-6489 para ayuda inmediata.";
  }

  return "I wasn't able to process that. Please call (509) 308-6489 for immediate help.";
}

function getConnectionErrorReply(isEs: boolean): string {
  if (isEs) {
    return "Estoy teniendo problemas para conectar en este momento. Llame al (509) 308-6489 o escriba a office@mhc-gc.com para asistencia inmediata.";
  }

  return "I'm having trouble connecting right now. Please call (509) 308-6489 or email office@mhc-gc.com for immediate assistance.";
}

function getMobileScrollUnlock(isOpen: boolean): (() => void) | undefined {
  if (!isOpen) return;

  const isMobile = globalThis.matchMedia("(max-width: 639px)").matches;
  if (!isMobile) return;

  const prev = document.body.style.overflow;
  document.body.style.overflow = "hidden";
  return () => {
    document.body.style.overflow = prev;
  };
}

// ── Quick-action suggestions ─────────────────────────────────────────────────

const QUICK_ACTIONS = [
  {
    label: "Your services",
    message: "What services does MH Construction provide?",
  },
  {
    label: "Meet our Allies",
    message: "Tell me about your Trade Partner network.",
  },
  { label: "Veteran benefits", message: "What veteran benefits do you offer?" },
  { label: "Get in touch", message: "How do I contact MH Construction?" },
];

const QUICK_ACTIONS_ES = [
  {
    label: "Sus servicios",
    message: "¿Qué servicios ofrece MH Construction?",
  },
  {
    label: "Conocer aliados",
    message: "Cuéntame sobre su red de Aliados (socios comerciales).",
  },
  {
    label: "Beneficios veteranos",
    message: "¿Qué beneficios para veteranos ofrecen?",
  },
  {
    label: "Contacto",
    message: "¿Cómo me comunico con MH Construction?",
  },
];

// ── Component ────────────────────────────────────────────────────────────────

export function ChatWidget() {
  const locale = useLocale();
  const isEs = locale === "es";
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPrompt, setShowPrompt] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const panelRef = useRef<HTMLDialogElement>(null);

  // Scroll to bottom on new messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Focus input when opening
  useEffect(() => {
    if (!isOpen) return;
    // Small delay to let the panel animate in
    const timer = setTimeout(() => inputRef.current?.focus(), 150);
    return () => clearTimeout(timer);
  }, [isOpen]);

  // Escape to close
  useEffect(() => {
    if (!isOpen) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        setIsOpen(false);
      }
    };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [isOpen]);

  // Scroll lock on mobile (full-screen layout: inset-0 at < sm breakpoint)
  useEffect(() => {
    return getMobileScrollUnlock(isOpen);
  }, [isOpen]);

  // Proactive prompt: show after delay if user hasn't interacted
  useEffect(() => {
    // Don't show if chat is already open or was already prompted this session
    if (isOpen) {
      setShowPrompt(false);
      return;
    }

    try {
      if (sessionStorage.getItem(PROACTIVE_PROMPT_KEY)) return;
    } catch {
      // sessionStorage not available (e.g., private browsing)
    }

    const timer = setTimeout(() => {
      setShowPrompt(true);
      try {
        sessionStorage.setItem(PROACTIVE_PROMPT_KEY, "1");
      } catch {
        // Ignore storage errors
      }
    }, PROACTIVE_PROMPT_DELAY);

    return () => clearTimeout(timer);
  }, [isOpen]);

  // Dismiss prompt when user opens chat
  const handleOpenChat = useCallback(() => {
    setShowPrompt(false);
    setIsOpen(true);
  }, []);

  // Dismiss prompt without opening chat
  const dismissPrompt = useCallback(() => {
    setShowPrompt(false);
  }, []);

  const sendMessage = useCallback(
    async (text: string) => {
      const trimmed = text.trim();
      if (!trimmed || isLoading) return;

      const userMessage = createChatMessage("user", trimmed);
      setMessages((prev) => [...prev, userMessage]);
      setInput("");
      setIsLoading(true);

      try {
        const res = await fetch("/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            message: trimmed,
            history: messages.slice(-8),
          }),
        });

        if (!res.ok) {
          throw new Error(`HTTP ${res.status}`);
        }

        const data = (await res.json()) as {
          response?: string;
          error?: string;
        };
        const reply = data.response ?? getApiFallbackReply(isEs);

        setMessages((prev) => [...prev, createChatMessage("assistant", reply)]);
      } catch {
        setMessages((prev) => [
          ...prev,
          createChatMessage("assistant", getConnectionErrorReply(isEs)),
        ]);
      } finally {
        setIsLoading(false);
      }
    },
    [isEs, isLoading, messages],
  );

  const handleSubmit = (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    sendMessage(input);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage(input);
    }
  };

  return (
    <>
      {/* ── Floating trigger button ─────────────────────────────────────── */}
      {!isOpen && (
        <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-2">
          {/* Proactive prompt bubble */}
          {showPrompt && (
            <div
              role="status"
              aria-live="polite"
              className="relative bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-3 max-w-[260px] animate-fadeSlideIn"
            >
              <button
                onClick={dismissPrompt}
                className="absolute -top-2 -right-2 flex items-center justify-center w-6 h-6 rounded-full bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 border border-gray-200 dark:border-gray-600 transition-colors focus:outline-none focus:ring-2 focus:ring-brand-primary/50"
                aria-label={isEs ? "Descartar aviso" : "Dismiss prompt"}
              >
                <MaterialIcon
                  icon="close"
                  size="xs"
                  className="text-gray-500 dark:text-gray-400"
                />
              </button>
              <p className="text-sm text-gray-700 dark:text-gray-200 leading-snug mb-2">
                {isEs
                  ? "👋 ¿Necesita ayuda para encontrar lo que busca?"
                  : "👋 Need help finding what you&apos;re looking for?"}
              </p>
              <button
                onClick={handleOpenChat}
                className="text-xs font-medium text-brand-primary dark:text-brand-primary-light hover:underline focus:outline-none focus:ring-2 focus:ring-brand-primary/50 rounded"
              >
                {isEs ? "Chatee con nosotros →" : "Chat with us →"}
              </button>
              {/* Tail pointing to button */}
              <div className="absolute -bottom-2 right-6 w-4 h-4 bg-white dark:bg-gray-800 border-r border-b border-gray-200 dark:border-gray-700 rotate-45" />
            </div>
          )}

          <button
            onClick={handleOpenChat}
            className="flex items-center justify-center w-14 h-14 rounded-full bg-gradient-to-br from-brand-primary to-brand-primary-dark text-white shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-brand-primary focus:ring-offset-2 dark:focus:ring-offset-gray-900"
            aria-label={
              isEs
                ? "Abrir chat de guía de alianzas"
                : "Open partnership guide chat"
            }
            title={isEs ? "Guía de alianzas" : "Partnership Guide"}
          >
            <MaterialIcon icon="chat" size="lg" className="text-white" />
          </button>
        </div>
      )}

      {/* ── Chat panel ──────────────────────────────────────────────────── */}
      {isOpen && (
        <dialog
          open
          ref={panelRef}
          aria-label={
            isEs
              ? "Guía de alianzas de MH Construction"
              : "MH Construction Partnership Guide"
          }
          className="fixed z-50 flex flex-col bg-white dark:bg-gray-900 shadow-2xl border border-gray-200 dark:border-gray-700 overflow-hidden inset-0 sm:inset-auto sm:bottom-6 sm:right-6 sm:w-[calc(100vw-3rem)] sm:max-w-md sm:h-[min(32rem,calc(100vh-6rem))] sm:rounded-2xl"
          style={{
            animation: "chatSlideIn 200ms ease-out",
            paddingTop: "env(safe-area-inset-top, 0px)",
          }}
        >
          {/* Header */}
          <div className="flex items-center gap-3 px-4 py-3 bg-gradient-to-r from-brand-primary to-brand-primary-dark text-white shrink-0">
            <button
              onClick={() => setIsOpen(false)}
              className="flex sm:hidden items-center justify-center w-8 h-8 rounded-full hover:bg-white/20 transition-colors focus:outline-none focus:ring-2 focus:ring-white/50"
              aria-label={isEs ? "Cerrar chat" : "Close chat"}
            >
              <MaterialIcon
                icon="arrow_back"
                size="sm"
                className="text-white"
              />
            </button>
            <div className="flex items-center justify-center w-9 h-9 rounded-full bg-white/20">
              <MaterialIcon icon="handshake" size="sm" className="text-white" />
            </div>
            <div className="flex-1 min-w-0">
              <h2 className="text-sm font-bold leading-tight">
                {isEs ? "Guía de alianzas" : "Partnership Guide"}
              </h2>
              <p className="text-xs text-white/80 leading-tight">
                {isEs
                  ? "MH Construction · De propiedad de veteranos"
                  : "MH Construction · Veteran-Owned"}
              </p>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="hidden sm:flex items-center justify-center w-8 h-8 rounded-full hover:bg-white/20 transition-colors focus:outline-none focus:ring-2 focus:ring-white/50"
              aria-label={isEs ? "Cerrar chat" : "Close chat"}
            >
              <MaterialIcon icon="close" size="sm" className="text-white" />
            </button>
          </div>

          {/* Messages area */}
          <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3">
            {/* Welcome message */}
            {messages.length === 0 && (
              <div className="space-y-4">
                <div className="flex gap-2">
                  <div className="flex items-start">
                    <div className="flex items-center justify-center w-7 h-7 rounded-full bg-brand-primary/10 dark:bg-brand-primary/20 shrink-0 mt-0.5">
                      <MaterialIcon
                        icon="handshake"
                        size="xs"
                        className="text-brand-primary dark:text-brand-primary-light"
                      />
                    </div>
                  </div>
                  <div className="bg-gray-100 dark:bg-gray-800 rounded-2xl rounded-tl-sm px-3 py-2 max-w-[85%]">
                    <p className="text-sm text-gray-800 dark:text-gray-200 leading-relaxed">
                      {isEs
                        ? "¡Bienvenido! Soy la Guía de Alianzas de MH Construction. Puedo ayudarle a conocer nuestros servicios, conectarlo con nuestros Aliados (socios comerciales) o responder preguntas sobre trabajar con nosotros. ¿En qué puedo ayudarle?"
                        : "Welcome! I&apos;m the MH Construction Partnership Guide. I can help you learn about our services, connect you with our Allies (Trade Partners), or answer questions about working with us. How can I help?"}
                    </p>
                  </div>
                </div>

                {/* Quick actions */}
                <div className="flex flex-wrap gap-2 pl-9">
                  {(isEs ? QUICK_ACTIONS_ES : QUICK_ACTIONS).map((action) => (
                    <button
                      key={action.label}
                      onClick={() => sendMessage(action.message)}
                      disabled={isLoading}
                      className="text-xs px-3 py-1.5 rounded-full border border-brand-primary/30 dark:border-brand-primary/40 text-brand-primary dark:text-brand-primary-light hover:bg-brand-primary/10 dark:hover:bg-brand-primary/20 transition-colors disabled:opacity-50 focus:outline-none focus:ring-2 focus:ring-brand-primary/50"
                    >
                      {action.label}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Chat messages */}
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex gap-2 ${msg.role === "user" ? "justify-end" : ""}`}
              >
                {msg.role === "assistant" && (
                  <div className="flex items-start">
                    <div className="flex items-center justify-center w-7 h-7 rounded-full bg-brand-primary/10 dark:bg-brand-primary/20 shrink-0 mt-0.5">
                      <MaterialIcon
                        icon="handshake"
                        size="xs"
                        className="text-brand-primary dark:text-brand-primary-light"
                      />
                    </div>
                  </div>
                )}
                <div
                  className={`rounded-2xl px-3 py-2 max-w-[85%] text-sm leading-relaxed ${
                    msg.role === "user"
                      ? "bg-brand-primary text-white rounded-tr-sm"
                      : "bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 rounded-tl-sm"
                  }`}
                >
                  {msg.content}
                </div>
              </div>
            ))}

            {/* Loading indicator */}
            {isLoading && (
              <div className="flex gap-2">
                <div className="flex items-start">
                  <div className="flex items-center justify-center w-7 h-7 rounded-full bg-brand-primary/10 dark:bg-brand-primary/20 shrink-0 mt-0.5">
                    <MaterialIcon
                      icon="handshake"
                      size="xs"
                      className="text-brand-primary dark:text-brand-primary-light"
                    />
                  </div>
                </div>
                <div className="bg-gray-100 dark:bg-gray-800 rounded-2xl rounded-tl-sm px-4 py-3">
                  <div className="flex gap-1">
                    <span className="w-2 h-2 rounded-full bg-gray-400 dark:bg-gray-500 animate-bounce [animation-delay:0ms]" />
                    <span className="w-2 h-2 rounded-full bg-gray-400 dark:bg-gray-500 animate-bounce [animation-delay:150ms]" />
                    <span className="w-2 h-2 rounded-full bg-gray-400 dark:bg-gray-500 animate-bounce [animation-delay:300ms]" />
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input area */}
          <form
            onSubmit={handleSubmit}
            className="shrink-0 border-t border-gray-200 dark:border-gray-700 px-3 py-2 flex items-end gap-2"
            style={{
              paddingBottom: "max(0.5rem, env(safe-area-inset-bottom, 0px))",
            }}
          >
            <textarea
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={
                isEs
                  ? "Pregunte sobre servicios, aliados o cualquier otra cosa..."
                  : "Ask about services, Allies, or anything else..."
              }
              rows={1}
              maxLength={500}
              disabled={isLoading}
              className="flex-1 resize-none rounded-xl border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-800 px-3 py-2.5 text-base sm:text-sm text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-primary/50 focus:border-brand-primary disabled:opacity-50"
              aria-label={isEs ? "Escriba su mensaje" : "Type your message"}
            />
            <button
              type="submit"
              disabled={!input.trim() || isLoading}
              className="flex items-center justify-center w-10 h-10 sm:w-9 sm:h-9 rounded-full bg-brand-primary text-white hover:bg-brand-primary-dark disabled:opacity-40 disabled:hover:bg-brand-primary transition-colors focus:outline-none focus:ring-2 focus:ring-brand-primary focus:ring-offset-2 dark:focus:ring-offset-gray-900 shrink-0"
              aria-label={isEs ? "Enviar mensaje" : "Send message"}
            >
              <MaterialIcon icon="send" size="sm" className="text-white" />
            </button>
          </form>

          {/* Disclaimer */}
          <div className="shrink-0 px-4 py-1.5 text-center border-t border-gray-100 dark:border-gray-800">
            <p className="text-[10px] text-gray-400 dark:text-gray-500">
              {isEs
                ? "Para preguntas específicas del proyecto, llame al"
                : "For project-specific questions, call"}{" "}
              <a
                href="tel:+15093086489"
                className="text-brand-primary dark:text-brand-primary-light hover:underline"
              >
                (509) 308-6489
              </a>
            </p>
          </div>
        </dialog>
      )}

      {/* ── Inline animation keyframes ──────────────────────────────────── */}
      <style jsx>{`
        @keyframes chatSlideIn {
          from {
            opacity: 0;
            transform: translateY(1rem) scale(0.95);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
        @keyframes fadeSlideIn {
          from {
            opacity: 0;
            transform: translateY(0.5rem);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeSlideIn {
          animation: fadeSlideIn 300ms ease-out;
        }
      `}</style>
    </>
  );
}
