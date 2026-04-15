"use client";

import { useId, useRef, type ReactNode } from "react";
import { MaterialIcon } from "@/components/icons/MaterialIcon";
import { useDialogBehavior } from "@/hooks/useDialogBehavior";

interface ModalHeaderRenderOptions {
  titleId: string;
  onClose: () => void;
}

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
  size?: "sm" | "md" | "lg" | "xl";
  showVeteranBadge?: boolean;
  backdropAriaLabel?: string;
  panelClassName?: string;
  contentClassName?: string;
  renderHeader?: (options: ModalHeaderRenderOptions) => ReactNode;
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
  backdropAriaLabel = "Close modal",
  panelClassName = "",
  contentClassName = "",
  renderHeader,
}: ModalProps) {
  const titleId = useId();
  const modalRef = useRef<HTMLDivElement>(null);

  useDialogBehavior({ isOpen, onClose, dialogRef: modalRef });

  if (!isOpen) return null;

  return (
    <div className="z-50 fixed inset-0 overflow-y-auto">
      <button
        type="button"
        className="fixed inset-0 bg-black/75 backdrop-blur-sm transition-opacity"
        onClick={onClose}
        aria-label={backdropAriaLabel}
      />

      <div className="flex justify-center items-center p-4 min-h-full">
        <div
          ref={modalRef}
          role="dialog"
          aria-modal="true"
          aria-labelledby={titleId}
          className={`relative w-full ${sizeClasses[size]} bg-white dark:bg-gray-900 rounded-2xl shadow-2xl border-2 border-brand-primary/20 dark:border-brand-primary/30 overflow-hidden ${panelClassName}`}
        >
          {renderHeader ? (
            renderHeader({ titleId, onClose })
          ) : (
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
                      Veteran-Owned. Relationship-first.
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
          )}

          <div
            className={`p-6 bg-white dark:bg-gray-900 text-gray-900 dark:text-white ${contentClassName}`}
          >
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
