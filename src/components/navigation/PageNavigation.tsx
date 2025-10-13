"use client";

import React from "react";
import Link from "next/link";
import { MaterialIcon } from "../icons/MaterialIcon";

interface NavigationItem {
  href: string;
  label: string;
  icon: string;
}

interface PageNavigationProps {
  items: NavigationItem[];
  className?: string;
}

export function PageNavigation({ items, className = "" }: PageNavigationProps) {
  return (
    <nav
      className={`bg-white/95 dark:bg-gray-900/95 backdrop-blur-md border-t-4 border-brand-primary ${className}`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-center py-4">
          <div className="flex space-x-1 overflow-x-auto">
            {items.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="group flex flex-col items-center hover:bg-brand-primary/10 dark:hover:bg-brand-primary/20 px-4 py-4 min-w-[80px] transition-colors duration-200 rounded-lg"
              >
                <MaterialIcon
                  icon={item.icon}
                  size="md"
                  className="mb-1 text-gray-600 dark:text-gray-400 group-hover:text-brand-primary transition-colors duration-200"
                />
                <span className="text-xs text-gray-700 dark:text-gray-300 group-hover:text-brand-primary font-medium transition-colors duration-200">
                  {item.label}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
}
