"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

// ChatWidget is a heavy chatbot bundle — lazy-load so it never blocks initial
// page paint. It has no SSR content so ssr: false is correct.
const ChatWidget = dynamic(
  () => import("@/components/chatbot").then((m) => ({ default: m.ChatWidget })),
  { ssr: false },
);

export default function ChatWidgetLazy() {
  const [shouldRender, setShouldRender] = useState(false);

  useEffect(() => {
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
  }, []);

  if (!shouldRender) {
    return null;
  }

  return <ChatWidget />;
}
