/**
 * @jest-environment jsdom
 *
 * Tests for:
 *   components/pwa/DownloadGate.tsx
 *   components/pwa/OfflineIndicator.tsx
 */

import { render, screen, act } from "@testing-library/react";

// ── Shared mocks ──────────────────────────────────────────────────────────────

jest.mock("@/components/icons/MaterialIcon", () => ({
  MaterialIcon: ({ icon }: { icon: string }) => (
    <span data-testid={`icon-${icon}`}>{icon}</span>
  ),
}));

// ── DownloadGate ──────────────────────────────────────────────────────────────

jest.mock("../PWAInstallCTA", () => ({
  PWAInstallCTA: () => <div data-testid="pwa-install-cta" />,
}));

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

// ── localStorage helpers ──────────────────────────────────────────────────────

function setLocalStorage(
  adminToken?: string,
  adminUser?: string,
  fieldToken?: string,
  fieldUser?: string,
) {
  localStorage.clear();
  if (adminToken) localStorage.setItem("admin_token", adminToken);
  if (adminUser) localStorage.setItem("admin_user", adminUser);
  if (fieldToken) localStorage.setItem("field_auth_token", fieldToken);
  if (fieldUser) localStorage.setItem("field_user", fieldUser);
}

// =============================================================================
// DownloadGate
// =============================================================================

describe("DownloadGate", () => {
  beforeEach(() => {
    localStorage.clear();
    jest.clearAllMocks();
  });

  it("shows the app-install prompt on initial render when no auth is stored", async () => {
    localStorage.clear();
    await act(async () => {
      render(
        <DownloadGate>
          <button>Download</button>
        </DownloadGate>,
      );
    });
    // No admin/superintendent token → gate shows the install prompt
    expect(screen.getByTestId("pwa-install-cta")).toBeInTheDocument();
  });

  it("renders children when user has admin role in localStorage", async () => {
    setLocalStorage("admin-token-xyz", JSON.stringify({ role: "admin" }));
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
    setLocalStorage(
      undefined,
      undefined,
      "field-token",
      JSON.stringify({ role: "superintendent" }),
    );
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

  it("renders the app-install prompt when user is not authenticated", async () => {
    localStorage.clear(); // no tokens
    await act(async () => {
      render(
        <DownloadGate>
          <button>Download</button>
        </DownloadGate>,
      );
    });
    expect(screen.queryByRole("button", { name: "Download" })).toBeNull();
    expect(screen.getByTestId("pwa-install-cta")).toBeInTheDocument();
  });

  it("always renders children when exempt prop is true", async () => {
    localStorage.clear(); // no auth
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
    setLocalStorage(
      undefined,
      undefined,
      "field-token",
      JSON.stringify({ role: "worker" }),
    );
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
    localStorage.setItem("admin_token", "tok");
    localStorage.setItem("admin_user", "INVALID_JSON");
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
