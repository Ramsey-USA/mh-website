/**
 * Auth context — unit tests
 *
 * Imports from @/contexts/auth-context (the barrel re-export) so that both
 * src/contexts/auth-context.tsx and src/lib/auth/auth-context.tsx are covered.
 */
import React from "react";
import { render, screen, act } from "@testing-library/react";
import { renderHook } from "@testing-library/react";
import { AuthProvider, useAuth } from "@/contexts/auth-context";

// A tiny consumer component that renders the auth state
function AuthConsumer() {
  const auth = useAuth();
  return (
    <div>
      <span data-testid="loading">{String(auth.loading)}</span>
      <span data-testid="user">{auth.user ? "logged-in" : "logged-out"}</span>
      <button onClick={() => auth.logout()} data-testid="logout-btn">
        Logout
      </button>
    </div>
  );
}

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <AuthProvider>{children}</AuthProvider>
);

describe("AuthProvider", () => {
  it("renders children", () => {
    render(
      <AuthProvider>
        <span data-testid="child">hello</span>
      </AuthProvider>,
    );
    expect(screen.getByTestId("child")).toBeInTheDocument();
  });

  it("provides loading=false and user=null by default", () => {
    render(
      <AuthProvider>
        <AuthConsumer />
      </AuthProvider>,
    );
    expect(screen.getByTestId("loading").textContent).toBe("false");
    expect(screen.getByTestId("user").textContent).toBe("logged-out");
  });

  it("logout resolves and keeps user null", async () => {
    render(
      <AuthProvider>
        <AuthConsumer />
      </AuthProvider>,
    );

    await act(async () => {
      screen.getByTestId("logout-btn").click();
    });

    expect(screen.getByTestId("user").textContent).toBe("logged-out");
  });

  it("signIn rejects with 'Authentication not configured'", async () => {
    const { result } = renderHook(() => useAuth(), { wrapper });
    await expect(result.current.signIn("a@b.com", "pw")).rejects.toThrow(
      "Authentication not configured",
    );
  });

  it("signUp rejects with 'Authentication not configured'", async () => {
    const { result } = renderHook(() => useAuth(), { wrapper });
    await expect(
      result.current.signUp("a@b.com", "pw", "Name"),
    ).rejects.toThrow("Authentication not configured");
  });

  it("signInWithGoogle rejects with 'Authentication not configured'", async () => {
    const { result } = renderHook(() => useAuth(), { wrapper });
    await expect(result.current.signInWithGoogle()).rejects.toThrow(
      "Authentication not configured",
    );
  });

  it("resetPassword rejects with 'Authentication not configured'", async () => {
    const { result } = renderHook(() => useAuth(), { wrapper });
    await expect(result.current.resetPassword("a@b.com")).rejects.toThrow(
      "Authentication not configured",
    );
  });

  it("updateUserProfileById rejects with 'Authentication not configured'", async () => {
    const { result } = renderHook(() => useAuth(), { wrapper });
    await expect(
      result.current.updateUserProfileById("uid-1", {}),
    ).rejects.toThrow("Authentication not configured");
  });

  it("updateUserProfile throws 'No user profile' when userProfile is null", async () => {
    const { result } = renderHook(() => useAuth(), { wrapper });
    expect(() =>
      result.current.updateUserProfile({ displayName: "Test" }),
    ).toThrow("No user profile");
  });

  it("updateUserProfile merges updates when userProfile is set", async () => {
    const mockProfile: import("@/lib/auth/auth-context").UserProfile = {
      uid: "u1",
      email: "a@b.com",
      displayName: "Old Name",
      role: "client",
      createdAt: new Date(),
      lastLoginAt: new Date(),
      isActive: true,
    };
    const wrapperWithProfile = ({
      children,
    }: {
      children: React.ReactNode;
    }) => <AuthProvider initialProfile={mockProfile}>{children}</AuthProvider>;
    const { result } = renderHook(() => useAuth(), {
      wrapper: wrapperWithProfile,
    });
    await act(async () => {
      await result.current.updateUserProfile({ displayName: "New Name" });
    });
    expect(result.current.userProfile?.displayName).toBe("New Name");
  });
});

describe("useAuth outside AuthProvider", () => {
  it("throws when called outside a provider", () => {
    function BadConsumer() {
      useAuth();
      return null;
    }

    expect(() => render(<BadConsumer />)).toThrow(
      "useAuth must be used within an AuthProvider",
    );
  });
});
