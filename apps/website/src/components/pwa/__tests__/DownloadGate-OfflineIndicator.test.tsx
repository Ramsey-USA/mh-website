/**
 * @jest-environment jsdom
 *
 * Tests for:
 *   components/pwa/DownloadGate.tsx
 *   components/pwa/OfflineIndicator.tsx
 */

import { render, screen, act } from "@testing-library/react";
import { clearLocalStorage, seedLocalStorage } from "@/test-utils/storage";

// ── Shared mocks ──────────────────────────────────────────────────────────────

jest.mock("@/components/icons/MaterialIcon", () => ({
  MaterialIcon: ({ icon }: { icon: string }) => (
    <span data-testid={`icon-${icon}`}>{icon}</span>
  ),
}));

// ── DownloadGate ──────────────────────────────────────────────────────────────

import { DownloadGate } from "../DownloadGate";
import { OfflineIndicator } from "../OfflineIndicator";

// ── useOfflineStatus mock (for OfflineIndicator) ──────────────────────────────

const mockUseOfflineStatus = jest.fn().mockReturnValue({
  isOnline: true,
  pendingCount: 0,
});

jest.mock("@/hooks/useOfflineStatus", () => ({
  useOfflineStatus: () => mockUseOfflineStatus(),
}));

// =============================================================================
// DownloadGate
// =============================================================================

describe("DownloadGate", () => {
  beforeEach(() => {
    clearLocalStorage();
    jest.clearAllMocks();
  });

  it("shows app access guidance on initial render when no auth is stored", async () => {
    clearLocalStorage();
    await act(async () => {
      render(
        <DownloadGate>
          <button>Download</button>
        </DownloadGate>,
      );
    });
    // No admin/superintendent token → gate shows guidance
    expect(
      screen.getByText(/use the install app button in the site footer/i),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: /already installed\? open the app/i }),
    ).toHaveAttribute("href", "/hub");
  });

  it("renders children when user has admin role in localStorage", async () => {
    seedLocalStorage({
      admin_token: "admin-token-xyz",
      admin_user: JSON.stringify({ role: "admin" }),
    });
    await act(async () => {
      render(
        <DownloadGate>
          <button>Download</button>
        </DownloadGate>,
      );
    });
    expect(
      screen.getByRole("button", { name: "Download" }),
    ).toBeInTheDocument();
  });

  it("renders children when user has superintendent role in localStorage", async () => {
    seedLocalStorage({
      field_auth_token: "field-token",
      field_user: JSON.stringify({ role: "superintendent" }),
    });
    await act(async () => {
      render(
        <DownloadGate>
          <button>Download</button>
        </DownloadGate>,
      );
    });
    expect(
      screen.getByRole("button", { name: "Download" }),
    ).toBeInTheDocument();
  });

  it("renders app access guidance when user is not authenticated", async () => {
    clearLocalStorage();
    await act(async () => {
      render(
        <DownloadGate>
          <button>Download</button>
        </DownloadGate>,
      );
    });
    expect(screen.queryByRole("button", { name: "Download" })).toBeNull();
    expect(
      screen.getByText(/available in the mh construction app/i),
    ).toBeInTheDocument();
  });

  it("always renders children when exempt prop is true", async () => {
    clearLocalStorage();
    await act(async () => {
      render(
        <DownloadGate exempt>
          <button>Apply</button>
        </DownloadGate>,
      );
    });
    expect(screen.getByRole("button", { name: "Apply" })).toBeInTheDocument();
  });

  it("renders app prompt when worker role is present (not admin/superintendent)", async () => {
    seedLocalStorage({
      field_auth_token: "field-token",
      field_user: JSON.stringify({ role: "worker" }),
    });
    await act(async () => {
      render(
        <DownloadGate>
          <button>Download</button>
        </DownloadGate>,
      );
    });
    // worker cannot access downloads
    expect(screen.queryByRole("button", { name: "Download" })).toBeNull();
  });

  it("handles malformed JSON in localStorage without throwing", async () => {
    seedLocalStorage({ admin_token: "tok", admin_user: "INVALID_JSON" });
    await expect(
      act(async () => {
        render(
          <DownloadGate>
            <button>Download</button>
          </DownloadGate>,
        );
      }),
    ).resolves.not.toThrow();
  });
});

// =============================================================================
// OfflineIndicator
// =============================================================================

describe("OfflineIndicator", () => {
  beforeEach(() => jest.clearAllMocks());

  it("renders nothing when online with no pending submissions", () => {
    mockUseOfflineStatus.mockReturnValue({ isOnline: true, pendingCount: 0 });
    const { container } = render(<OfflineIndicator />);
    expect(container.firstChild).toBeNull();
  });

  it("renders the offline banner when user is offline", () => {
    mockUseOfflineStatus.mockReturnValue({ isOnline: false, pendingCount: 0 });
    render(<OfflineIndicator />);
    expect(screen.getByRole("status")).toBeInTheDocument();
    expect(screen.getByText(/offline/i)).toBeInTheDocument();
  });

  it("renders the sync banner when online with pending submissions", () => {
    mockUseOfflineStatus.mockReturnValue({ isOnline: true, pendingCount: 3 });
    render(<OfflineIndicator />);
    expect(screen.getByRole("status")).toBeInTheDocument();
    expect(screen.getByText(/3 pending/i)).toBeInTheDocument();
  });

  it("uses singular 'submission' when pendingCount is 1", () => {
    mockUseOfflineStatus.mockReturnValue({ isOnline: true, pendingCount: 1 });
    render(<OfflineIndicator />);
    expect(screen.getByText(/1 pending submission/i)).toBeInTheDocument();
  });
});
