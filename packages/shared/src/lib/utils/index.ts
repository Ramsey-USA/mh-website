import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Combines class names with proper handling of Tailwind CSS conflicts
 * This utility ensures that when multiple Tailwind classes of the same type are provided,
 * the last one takes precedence (e.g., 'bg-red-500 bg-blue-500' -> 'bg-blue-500')
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
