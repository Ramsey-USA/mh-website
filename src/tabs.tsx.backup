/**
 * Tabs Component
 * Based on Radix UI Tabs
 */

"use client";

import * as React from "react";
import * as TabsPrimitive from "@radix-ui/react-tabs";
import { cn } from "@/lib/utils";

const Tabs = TabsPrimitive.Root;

const TabsList = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.List>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.List
    ref={ref}
    className={cn(
      "inline-flex justify-center items-center bg-gray-100 dark:bg-gray-800 p-1 rounded-md h-10 text-gray-600 dark:text-gray-300",
      className
    )}
    {...props}
  />
));
TabsList.displayName = TabsPrimitive.List.displayName;

const TabsTrigger = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Trigger
    ref={ref}
    className={cn(
      "inline-flex justify-center items-center data-[state=active]:bg-white dark:data-[state=active]:bg-gray-700 disabled:opacity-50 data-[state=active]:shadow-sm px-3 py-1.5 rounded-sm focus-visible:outline-none focus-visible:ring-[#386851] focus-visible:ring-2 ring-offset-white focus-visible:ring-offset-2 dark:ring-offset-gray-800 font-medium data-[state=active]:text-gray-900 dark:data-[state=active]:text-white text-sm whitespace-nowrap transition-all disabled:pointer-events-none",
      className
    )}
    {...props}
  />
));
TabsTrigger.displayName = TabsPrimitive.Trigger.displayName;

const TabsContent = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Content
    ref={ref}
    className={cn(
      "mt-2 focus-visible:outline-none focus-visible:ring-[#386851] focus-visible:ring-2 ring-offset-white focus-visible:ring-offset-2 dark:ring-offset-gray-800",
      className
    )}
    {...props}
  />
));
TabsContent.displayName = TabsPrimitive.Content.displayName;

export { Tabs, TabsList, TabsTrigger, TabsContent };
