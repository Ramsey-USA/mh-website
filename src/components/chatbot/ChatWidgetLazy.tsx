"use client";

import dynamic from "next/dynamic";

// ChatWidget is a heavy chatbot bundle — lazy-load so it never blocks initial
// page paint. It has no SSR content so ssr: false is correct.
const ChatWidget = dynamic(
  () => import("@/components/chatbot").then((m) => ({ default: m.ChatWidget })),
  { ssr: false },
);

export default function ChatWidgetLazy() {
  return <ChatWidget />;
}
