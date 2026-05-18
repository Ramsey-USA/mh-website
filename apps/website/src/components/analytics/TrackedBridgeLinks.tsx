"use client";

import Link from "next/link";
import { Button } from "@/components/ui";
import { type ReactNode } from "react";

function trackBridgeClick(element: string) {
  if (typeof window === "undefined") return;

  if (window.gtag) {
    window.gtag("event", "click", {
      element,
      page_path: window.location.pathname,
      event_category: "navigation",
    });
  }
}

interface TrackedBridgeLinkProps {
  href: string;
  children: ReactNode;
  className?: string;
  trackId: string;
}

export function TrackedBridgeLink({
  href,
  children,
  className,
  trackId,
}: TrackedBridgeLinkProps) {
  return (
    <Link
      href={href}
      className={className}
      onClick={() => {
        trackBridgeClick(trackId);
      }}
    >
      {children}
    </Link>
  );
}

interface TrackedBridgeButtonProps {
  href: string;
  children: ReactNode;
  variant?: "default" | "outline";
  trackId: string;
}

export function TrackedBridgeButton({
  href,
  children,
  variant = "default",
  trackId,
}: TrackedBridgeButtonProps) {
  return (
    <Button asChild variant={variant}>
      <Link
        href={href}
        onClick={() => {
          trackBridgeClick(trackId);
        }}
      >
        {children}
      </Link>
    </Button>
  );
}
