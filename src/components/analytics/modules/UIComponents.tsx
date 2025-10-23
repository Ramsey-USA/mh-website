/**
 * Analytics Dashboard UI Components
 * Shared UI components for the analytics dashboard
 */

import React from "react";

// Simple UI Components
export function Card({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`bg-white rounded-lg border shadow-sm ${className}`}>
      {children}
    </div>
  );
}

export function CardHeader({ children }: { children: React.ReactNode }) {
  return <div className="flex flex-col space-y-1.5 p-6">{children}</div>;
}

export function CardTitle({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <h3
      className={`text-lg font-semibold leading-none tracking-tight ${className}`}
    >
      {children}
    </h3>
  );
}

export function CardDescription({ children }: { children: React.ReactNode }) {
  return <p className="text-muted-foreground text-sm">{children}</p>;
}

export function CardContent({ children }: { children: React.ReactNode }) {
  return <div className="p-6 pt-0">{children}</div>;
}

export function Progress({
  value,
  className = "",
}: {
  value: number;
  className?: string;
}) {
  return (
    <div className={`w-full bg-gray-200 rounded-full h-2.5 ${className}`}>
      <div
        className="bg-blue-600 rounded-full h-2.5 transition-all duration-300"
        style={{ width: `${Math.min(100, Math.max(0, value))}%` }}
      />
    </div>
  );
}

export function Badge({
  children,
  variant = "default",
  className = "",
}: {
  children: React.ReactNode;
  variant?: "default" | "secondary" | "destructive" | "outline";
  className?: string;
}) {
  const variants = {
    default: "bg-primary text-primary-foreground",
    secondary: "bg-secondary text-secondary-foreground",
    destructive: "bg-destructive text-destructive-foreground",
    outline: "text-foreground border border-input",
  };
  return (
    <div
      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${variants[variant]} ${className}`}
    >
      {children}
    </div>
  );
}

export function Button({
  children,
  variant = "default",
  size = "default",
  onClick,
  disabled = false,
  className = "",
}: {
  children: React.ReactNode;
  variant?: "default" | "outline" | "secondary";
  size?: "default" | "sm" | "lg";
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
}) {
  const variants = {
    default: "bg-primary text-primary-foreground hover:bg-primary/90",
    outline: "border border-input hover:bg-accent hover:text-accent-foreground",
    secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
  };

  const sizes = {
    default: "h-10 px-4 py-2",
    sm: "h-9 rounded-md px-3",
    lg: "h-11 rounded-md px-8",
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background ${variants[variant]} ${sizes[size]} ${className}`}
    >
      {children}
    </button>
  );
}

export function Tabs({
  value,
  onValueChange,
  children,
  className = "",
}: {
  value: string;
  onValueChange: (value: string) => void;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={className}
      data-value={value}
      data-onValueChange={onValueChange}
    >
      {children}
    </div>
  );
}

export function TabsList({ children }: { children: React.ReactNode }) {
  return (
    <div className="inline-flex h-10 items-center justify-center rounded-md bg-muted p-1 text-muted-foreground">
      {children}
    </div>
  );
}

export function TabsTrigger({
  value,
  children,
  onClick,
  isActive = false,
}: {
  value: string;
  children: React.ReactNode;
  onClick: () => void;
  isActive?: boolean;
}) {
  return (
    <button
      onClick={onClick}
      className={`inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 ${
        isActive
          ? "bg-background text-foreground shadow-sm"
          : "hover:bg-background/50"
      }`}
    >
      {children}
    </button>
  );
}

export function TabsContent({
  value,
  activeValue,
  children,
}: {
  value: string;
  activeValue: string;
  children: React.ReactNode;
}) {
  if (value !== activeValue) return null;

  return (
    <div className="mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
      {children}
    </div>
  );
}
