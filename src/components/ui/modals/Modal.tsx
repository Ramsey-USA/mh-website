"use client";

import { useEffect, useId, type ReactNode } from "react";
import { MaterialIcon } from "@/components/icons/MaterialIcon";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
  size?: "sm" | "md" | "lg" | "xl";
  showVeteranBadge?: boolean;
}

const sizeClasses = {
  sm: "max-w-md",
  md: "max-w-lg",
  lg: "max-w-2xl",
  xl: "max-w-4xl",
};

export function Modal({
  isOpen,
  onClose,
  title,
  children,
  size = "md",
  showVeteranBadge = true,
}: ModalProps) {
  const titleId = useId();

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="z-50 fixed inset-0 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/75 backdrop-blur-sm transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal */}
      <div className="flex justify-center items-center p-4 min-h-full">
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby={titleId}
          className={`relative w-full ${sizeClasses[size]} bg-white dark:bg-gray-900 rounded-2xl shadow-2xl border-2 border-brand-primary/20 dark:border-brand-primary/30 overflow-hidden`}
        >
          {/* Enhanced Header with gradient background */}
          <div className="relative bg-gradient-to-r from-brand-primary via-brand-secondary to-brand-primary p-6 text-white overflow-hidden">
            <div
              className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-black/10"
              aria-hidden="true"
            />
            <div
              className="top-0 right-0 absolute bg-white/5 rounded-full w-32 h-32 -translate-y-16 translate-x-16"
              aria-hidden="true"
            />

            <div className="relative z-10">
              {showVeteranBadge && (
                <div className="flex justify-center items-center gap-2 mb-4">
                  <MaterialIcon
                    icon="military_tech"
                    size="md"
                    className="text-bronze-300"
                  />
                  <span className="font-semibold text-bronze-300 text-sm tracking-wide uppercase">
                    Veteran-Owned Excellence
                  </span>
                </div>
              )}

              <div className="flex justify-between items-start">
                <h2
                  id={titleId}
                  className="flex-1 font-black text-2xl sm:text-3xl leading-tight"
                >
                  {title}
                </h2>
                <button
                  onClick={onClose}
                  className="hover:bg-white/20 p-2 rounded-lg text-white hover:scale-110 transition-all duration-200"
                  aria-label="Close modal"
                >
                  <MaterialIcon icon="close" size="md" />
                </button>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="p-6 bg-white dark:bg-gray-900 text-gray-900 dark:text-white">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
