"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

// ChatWidget is a heavy chatbot bundle — lazy-load so it never blocks initial
// page paint. It has no SSR content so ssr: false is correct.
const ChatWidget = dynamic(
  () => import("@/components/chatbot").then((m) => ({ default: m.ChatWidget })),
  { ssr: false },
);

const CHAT_WIDGET_EXCLUDED_PREFIXES = [
  "/dashboard",
  "/offline",
  "/file-handler",
  "/protocol-handler",
] as const;

export default function ChatWidgetLazy() {
  const pathname = usePathname();
  const [shouldRender, setShouldRender] = useState(false);

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

  if (isExcludedRoute) {
    return null;
  }

  if (!shouldRender) {
    return null;
  }

  return <ChatWidget />;
}
