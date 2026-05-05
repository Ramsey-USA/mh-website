/**
 * useFormSubmit Hook
 *
 * Provides common form submission state management with:
 * - Loading/submitting state
 * - Error handling
 * - Success callbacks
 * - Preventing double submissions
 */

import { useState, useCallback } from "react";

export interface UseFormSubmitOptions<TResponse = unknown> {
  /** Called on successful submission */
  onSuccess?: (response: TResponse) => void;
  /** Called on error */
  onError?: (error: Error) => void;
  /** Default error message when API doesn't provide one */
  defaultErrorMessage?: string;
}

export interface UseFormSubmitReturn<TData, TResponse = unknown> {
  /** Current error message, if any */
  error: string | null;
  /** Whether form is currently being submitted */
  isSubmitting: boolean;
  /** Set a custom error message */
  setError: (error: string | null) => void;
  /** Clear current error */
  clearError: () => void;
  /**
   * Submit the form data to an API endpoint
   * @param url API endpoint URL
   * @param data Form data to submit
   * @param options Optional fetch options (method defaults to POST)
   */
  submit: (
    url: string,
    data: TData,
    options?: {
      method?: "POST" | "PUT" | "PATCH" | "DELETE";
      headers?: Record<string, string>;
    },
  ) => Promise<TResponse | null>;
}

/**
 * Hook for managing form submission state
 *
 * @example
 * ```tsx
 * function MyForm({ token, onSaved }) {
 *   const [fields, setFields] = useState({ name: '', email: '' });
 *
 *   const { isSubmitting, error, submit, setError } = useFormSubmit({
 *     onSuccess: onSaved,
 *     defaultErrorMessage: 'Failed to save',
 *   });
 *
 *   const handleSubmit = async (e: FormEvent) => {
 *     e.preventDefault();
 *     if (!fields.name.trim()) {
 *       setError('Name is required');
 *       return;
 *     }
 *     await submit('/api/items', fields, {
 *       headers: { Authorization: `Bearer ${token}` },
 *     });
 *   };
 *
 *   return (
 *     <form onSubmit={handleSubmit}>
 *       {error && <p className="text-red-500">{error}</p>}
 *       ...
 *       <button disabled={isSubmitting}>
 *         {isSubmitting ? 'Saving...' : 'Save'}
 *       </button>
 *     </form>
 *   );
 * }
 * ```
 */
export function useFormSubmit<TData = unknown, TResponse = unknown>(
  options: UseFormSubmitOptions<TResponse> = {},
): UseFormSubmitReturn<TData, TResponse> {
  const {
    onSuccess,
    onError,
    defaultErrorMessage = "Operation failed",
  } = options;

  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const clearError = useCallback(() => setError(null), []);

  const submit = useCallback(
    async (
      url: string,
      data: TData,
      fetchOptions?: {
        method?: "POST" | "PUT" | "PATCH" | "DELETE";
        headers?: Record<string, string>;
      },
    ): Promise<TResponse | null> => {
      // Prevent double submissions
      if (isSubmitting) return null;

      setError(null);
      setIsSubmitting(true);

      try {
        const res = await fetch(url, {
          method: fetchOptions?.method ?? "POST",
          headers: {
            "Content-Type": "application/json",
            ...fetchOptions?.headers,
          },
          body: JSON.stringify(data),
        });

        const json = await res.json();

        if (!res.ok) {
          throw new Error(json.error ?? json.message ?? defaultErrorMessage);
        }

        onSuccess?.(json as TResponse);
        return json as TResponse;
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : defaultErrorMessage;
        setError(errorMessage);
        onError?.(err instanceof Error ? err : new Error(errorMessage));
        return null;
      } finally {
        setIsSubmitting(false);
      }
    },
    [isSubmitting, onSuccess, onError, defaultErrorMessage],
  );

  return {
    error,
    isSubmitting,
    setError,
    clearError,
    submit,
  };
}

/**
 * Variant that includes authentication token in headers
 *
 * @example
 * ```tsx
 * const { isSubmitting, error, submit } = useAuthenticatedFormSubmit(token, {
 *   onSuccess: () => router.push('/dashboard'),
 * });
 *
 * await submit('/api/protected/items', { name: 'Item 1' });
 * ```
 */
export function useAuthenticatedFormSubmit<
  TData = unknown,
  TResponse = unknown,
>(
  token: string,
  options: UseFormSubmitOptions<TResponse> = {},
): UseFormSubmitReturn<TData, TResponse> {
  const formSubmit = useFormSubmit<TData, TResponse>(options);

  const authenticatedSubmit = useCallback(
    (
      url: string,
      data: TData,
      fetchOptions?: {
        method?: "POST" | "PUT" | "PATCH" | "DELETE";
        headers?: Record<string, string>;
      },
    ): Promise<TResponse | null> => {
      return formSubmit.submit(url, data, {
        ...fetchOptions,
        headers: {
          Authorization: `Bearer ${token}`,
          ...fetchOptions?.headers,
        },
      });
    },
    [formSubmit, token],
  );

  return {
    ...formSubmit,
    submit: authenticatedSubmit,
  };
}
