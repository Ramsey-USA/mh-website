"use client";

import React from "react";
import { MaterialIcon } from "@/components/icons/MaterialIcon";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  size?: "sm" | "md" | "lg" | "xl";
}

const sizeClasses = {
  sm: "max-w-md",
  md: "max-w-lg",
  lg: "max-w-2xl",
  xl: "max-w-4xl",
};

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
  size = "md",
}) => {
  if (!isOpen) return null;

  return (
    <div className="z-50 fixed inset-0 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black bg-opacity-75 transition-opacity"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="flex justify-center items-center p-4 min-h-full">
        <div
          className={`relative w-full ${sizeClasses[size]} bg-gray-900 rounded-xl shadow-2xl border border-gray-700`}
        >
          {/* Header */}
          <div className="flex justify-between items-center p-6 border-gray-700 border-b">
            <h2 className="font-tactic-bold text-white text-xl">{title}</h2>
            <button
              onClick={onClose}
              className="hover:bg-gray-800 p-2 rounded-lg text-gray-400 hover:text-white transition-colors"
            >
              <MaterialIcon icon="close" size="sm" />
            </button>
          </div>

          {/* Content */}
          <div className="p-6">{children}</div>
        </div>
      </div>
    </div>
  );
};
