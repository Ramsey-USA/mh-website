"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

type ChatWidgetComponentType =
  (typeof import("@/components/chatbot/ChatWidget"))["ChatWidget"];

const CHAT_WIDGET_EXCLUDED_PREFIXES = [
  "/dashboard",
  "/offline",
  "/file-handler",
  "/protocol-handler",
] as const;

export default function ChatWidgetLazy() {
  const pathname = usePathname();
  const [shouldRender, setShouldRender] = useState(false);
  const [ChatWidgetComponent, setChatWidgetComponent] =
    useState<ChatWidgetComponentType | null>(null);

  const isExcludedRoute = CHAT_WIDGET_EXCLUDED_PREFIXES.some((prefix) =>
    pathname?.startsWith(prefix),
  );

  useEffect(() => {
    if (isExcludedRoute) {
      setShouldRender(false);
      return;
    }

    let cancelled = false;

    const enable = () => {
      if (!cancelled) {
        setShouldRender(true);
      }
    };

    const onFirstInteraction = () => {
      enable();
      window.removeEventListener("pointerdown", onFirstInteraction);
      window.removeEventListener("keydown", onFirstInteraction);
    };

    window.addEventListener("pointerdown", onFirstInteraction, {
      once: true,
      passive: true,
    });
    window.addEventListener("keydown", onFirstInteraction, { once: true });

    if ("requestIdleCallback" in window) {
      const idleId = window.requestIdleCallback(enable, { timeout: 4000 });
      return () => {
        cancelled = true;
        window.cancelIdleCallback(idleId);
        window.removeEventListener("pointerdown", onFirstInteraction);
        window.removeEventListener("keydown", onFirstInteraction);
      };
    }

    const timeoutId = globalThis.setTimeout(enable, 4000);
    return () => {
      cancelled = true;
      globalThis.clearTimeout(timeoutId);
      window.removeEventListener("pointerdown", onFirstInteraction);
      window.removeEventListener("keydown", onFirstInteraction);
    };
  }, [isExcludedRoute]);

  useEffect(() => {
    if (!shouldRender || isExcludedRoute || ChatWidgetComponent) {
      return;
    }

    let cancelled = false;

    // Import only when we actually decide to render. This avoids creating a
    // preload hint for a chunk that may not be consumed quickly on light pages.
    import("@/components/chatbot/ChatWidget")
      .then((mod) => {
        if (!cancelled) {
          setChatWidgetComponent(() => mod.ChatWidget);
        }
      })
      .catch(() => {
        // Keep the shell stable if the widget bundle fails to load.
        setShouldRender(false);
      });

    return () => {
      cancelled = true;
    };
  }, [ChatWidgetComponent, isExcludedRoute, shouldRender]);

  if (isExcludedRoute) {
    return null;
  }

  if (!shouldRender) {
    return null;
  }

  if (!ChatWidgetComponent) {
    return null;
  }

  return <ChatWidgetComponent />;
}
