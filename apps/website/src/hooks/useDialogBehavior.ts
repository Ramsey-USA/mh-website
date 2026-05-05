import { useEffect, type RefObject } from "react";

const FOCUSABLE_SELECTOR =
  'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])';

interface UseDialogBehaviorOptions {
  isOpen: boolean;
  onClose: () => void;
  dialogRef: RefObject<HTMLElement | null>;
}

export function useDialogBehavior({
  isOpen,
  onClose,
  dialogRef,
}: UseDialogBehaviorOptions) {
  useEffect(() => {
    if (!isOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const dialog = dialogRef.current;

    let frameId: number | null = null;

    if (dialog) {
      frameId = window.requestAnimationFrame(() => {
        if (dialog.contains(document.activeElement)) {
          return;
        }

        const firstFocusableElement =
          dialog.querySelector<HTMLElement>(FOCUSABLE_SELECTOR);

        firstFocusableElement?.focus();
      });
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
        return;
      }

      if (event.key !== "Tab") return;

      const dialog = dialogRef.current;
      if (!dialog) return;

      const focusableElements = Array.from(
        dialog.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR),
      ).filter((element) => !element.hasAttribute("disabled"));

      if (focusableElements.length === 0) return;

      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];

      if (!firstElement || !lastElement) return;

      if (event.shiftKey && document.activeElement === firstElement) {
        event.preventDefault();
        lastElement.focus();
      } else if (!event.shiftKey && document.activeElement === lastElement) {
        event.preventDefault();
        firstElement.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      if (frameId !== null) {
        window.cancelAnimationFrame(frameId);
      }

      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [dialogRef, isOpen, onClose]);
}
