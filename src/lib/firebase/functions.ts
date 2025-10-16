import { getFirebaseAuth } from "./config";

/**
 * Client-side Firebase Functions caller
 * This replaces direct Firebase Functions calls with API route calls
 */

export interface FunctionCallOptions {
  requireAuth?: boolean;
  timeout?: number;
}

export class FirebaseFunctionsClient {
  private baseUrl = "/api/functions";

  /**
   * Call a Firebase function via API route
   */
  async call<T = any>(
    functionName: string,
    data: any = {},
    options: FunctionCallOptions = {},
  ): Promise<T> {
    const { requireAuth = false, timeout = 30000 } = options;

    const headers: HeadersInit = {
      "Content-Type": "application/json",
    };

    // Add authentication token if required
    if (requireAuth) {
      try {
        const auth = getFirebaseAuth();
        const user = auth.currentUser;

        if (!user) {
          throw new Error("Authentication required but no user is logged in");
        }

        const token = await user.getIdToken();
        headers["Authorization"] = `Bearer ${token}`;
      } catch (error) {
        throw new Error(
          `Authentication failed: ${error instanceof Error ? error.message : "Unknown error"}`,
        );
      }
    }

    // Create abort controller for timeout
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeout);

    try {
      const response = await fetch(`${this.baseUrl}/${functionName}`, {
        method: "POST",
        headers,
        body: JSON.stringify(data),
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        const errorData = await response
          .json()
          .catch(() => ({ error: "Unknown error" }));
        throw new Error(
          `HTTP ${response.status}: ${errorData.error || response.statusText}`,
        );
      }

      return await response.json();
    } catch (error) {
      clearTimeout(timeoutId);

      if (error instanceof Error && error.name === "AbortError") {
        throw new Error(`Function call timed out after ${timeout}ms`);
      }

      throw error;
    }
  }

  /**
   * Send a notification (requires authentication)
   */
  async sendNotification(data: {
    title: string;
    body: string;
    userId?: string;
    topic?: string;
  }) {
    return this.call("sendNotification", data, { requireAuth: true });
  }

  /**
   * Get user data (requires authentication)
   */
  async getUserData() {
    return this.call("getUserData", {}, { requireAuth: true });
  }
}

// Export singleton instance
export const firebaseFunctions = new FirebaseFunctionsClient();

// Legacy compatibility function
export function httpsCallable(functionName: string) {
  return (data: any) => firebaseFunctions.call(functionName, data);
}
