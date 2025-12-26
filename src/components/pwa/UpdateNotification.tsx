"use client";

import { useState } from "react";

interface UpdateNotificationProps {
  onUpdate: () => void;
}

export function UpdateNotification({ onUpdate }: UpdateNotificationProps) {
  const [show, setShow] = useState(true);

  const handleUpdate = () => {
    onUpdate();
    setShow(false);
  };

  const handleDismiss = () => {
    setShow(false);
  };

  if (!show) {
    return null;
  }

  return (
    <div className="fixed top-4 left-4 right-4 md:left-auto md:right-4 md:max-w-md z-50 animate-slide-down">
      <div className="bg-blue-50 dark:bg-blue-900/30 border-l-4 border-blue-500 rounded-lg shadow-lg overflow-hidden">
        <div className="p-4">
          <div className="flex items-start gap-3">
            {/* Icon */}
            <div className="flex-shrink-0">
              <svg
                className="w-6 h-6 text-blue-600 dark:text-blue-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                />
              </svg>
            </div>

            {/* Content */}
            <div className="flex-1">
              <h3 className="text-sm font-semibold text-blue-900 dark:text-blue-100 mb-1">
                Update Available
              </h3>
              <p className="text-sm text-blue-800 dark:text-blue-200 mb-3">
                A new version of MH Construction is available. Update now for
                the latest features and improvements.
              </p>

              {/* Actions */}
              <div className="flex gap-2">
                <button
                  onClick={handleUpdate}
                  className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded transition-colors duration-200"
                >
                  Update Now
                </button>
                <button
                  onClick={handleDismiss}
                  className="px-3 py-1.5 bg-white hover:bg-gray-50 dark:bg-slate-800 dark:hover:bg-slate-700 text-blue-900 dark:text-blue-100 text-sm font-medium rounded border border-blue-200 dark:border-blue-700 transition-colors duration-200"
                >
                  Later
                </button>
              </div>
            </div>

            {/* Close button */}
            <button
              onClick={handleDismiss}
              className="flex-shrink-0 text-blue-400 hover:text-blue-600 dark:hover:text-blue-300 transition-colors"
              aria-label="Dismiss"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
