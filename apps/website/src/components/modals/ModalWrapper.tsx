"use client";

import React, { type ReactNode, useRef, useEffect } from "react";
import { MaterialIcon } from "@/components/icons/MaterialIcon";

/**
 * ModalWrapper Component
 *
 * Reusable modal container with consistent MH brand styling,
 * accessibility features, and animation support.
 *
 * @component
 * @example
 * <ModalWrapper
 *   isOpen={isOpen}
 *   onClose={handleClose}
 *   title="Job Application"
 *   description="Submit your application to join our team"
 *   maxWidth="max-w-2xl"
 * >
 *   <form>
 *     <div>Form content</div>
 *   </form>
 * </ModalWrapper>
 *
 * @param {ModalWrapperProps} props
 * @returns {React.ReactElement}
 */

export interface ModalWrapperProps {
  /** Whether the modal is open */
  isOpen: boolean;
  /** Callback when close button is clicked or backdrop clicked */
  onClose: () => void;
  /** Modal title */
  title: string;
  /** Optional description text */
  description?: string;
  /** Modal content */
  children: ReactNode;
  /** Max width class (default: max-w-md) */
  maxWidth?: string;
  /** Show close button in header (default: true) */
  showCloseButton?: boolean;
  /** Show backdrop/overlay (default: true) */
  showBackdrop?: boolean;
  /** Close modal on backdrop click (default: true) */
  closeOnBackdropClick?: boolean;
  /** Accessibility label for the modal dialog */
  ariaLabel?: string;
  /** Additional CSS classes for modal container */
  className?: string;
  /** Success state styling */
  isSuccess?: boolean;
  /** Loading state */
  isLoading?: boolean;
}

/**
 * Modal Wrapper with accessibility and animation support
 */
export function ModalWrapper({
  isOpen,
  onClose,
  title,
  description,
  children,
  maxWidth = "max-w-md",
  showCloseButton = true,
  showBackdrop = true,
  closeOnBackdropClick = true,
  ariaLabel,
  className = "",
  isSuccess = false,
  isLoading = false,
}: ModalWrapperProps) {
  const modalRef = useRef<HTMLDivElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);

  // Handle keyboard events (ESC to close)
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    // Prevent body scroll when modal is open
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  // Handle backdrop click
  const handleBackdropClick = (e: React.MouseEvent) => {
    if (closeOnBackdropClick && e.target === modalRef.current) {
      onClose();
    }
  };

  if (!isOpen && !isSuccess) return null;

  return (
    <>
      {/* Backdrop */}
      {showBackdrop && (
        <div
          ref={modalRef}
          className={`fixed inset-0 z-50 bg-black/50 backdrop-blur-sm transition-opacity duration-300 ${
            isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
          onClick={handleBackdropClick}
          role="presentation"
          aria-hidden={!isOpen}
        />
      )}

      {/* Modal Dialog */}
      <div
        ref={dialogRef}
        className={`fixed inset-0 z-50 flex items-center justify-center p-4 transition-all duration-300 ${
          isOpen
            ? "opacity-100 scale-100"
            : "opacity-0 scale-95 pointer-events-none"
        }`}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        aria-label={ariaLabel || title}
      >
        <div
          className={`relative w-full ${maxWidth} bg-white dark:bg-gray-900 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 overflow-hidden ${className}`}
        >
          {/* Header */}
          <div
            className={`flex items-center justify-between p-6 border-b ${
              isSuccess
                ? "bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800"
                : "bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-700"
            }`}
          >
            <div className="flex items-center gap-3 flex-1">
              {isSuccess && (
                <div className="flex-shrink-0">
                  <MaterialIcon
                    icon="check_circle"
                    size="lg"
                    className="text-green-600 dark:text-green-400"
                  />
                </div>
              )}
              <div>
                <h2
                  id="modal-title"
                  className={`text-xl font-bold ${
                    isSuccess
                      ? "text-green-900 dark:text-green-200"
                      : "text-gray-900 dark:text-white"
                  }`}
                >
                  {title}
                </h2>
                {description && (
                  <p
                    className={`text-sm mt-1 ${
                      isSuccess
                        ? "text-green-700 dark:text-green-300"
                        : "text-gray-600 dark:text-gray-400"
                    }`}
                  >
                    {description}
                  </p>
                )}
              </div>
            </div>

            {/* Close Button */}
            {showCloseButton && (
              <button
                onClick={onClose}
                className="flex-shrink-0 ml-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                aria-label="Close modal"
                disabled={isLoading}
              >
                <MaterialIcon icon="close" size="lg" />
              </button>
            )}
          </div>

          {/* Content */}
          <div
            className={`p-6 ${
              isSuccess
                ? "bg-green-50 dark:bg-green-900/10 text-center"
                : "bg-white dark:bg-gray-900"
            } max-h-[calc(100vh-200px)] overflow-y-auto`}
          >
            {isLoading ? (
              <div className="flex items-center justify-center py-12">
                <div className="flex flex-col items-center gap-4">
                  <div className="w-8 h-8 border-4 border-gray-200 dark:border-gray-700 border-t-brand-primary rounded-full animate-spin" />
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Loading...
                  </p>
                </div>
              </div>
            ) : (
              children
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default ModalWrapper;
