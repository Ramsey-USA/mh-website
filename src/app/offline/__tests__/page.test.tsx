/** @jest-environment jsdom */
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

jest.mock("next/image", () => ({
  __esModule: true,
  default: ({ alt, src }: { alt: string; src: string }) => (
    <img alt={alt} src={src} />
  ),
}));

jest.mock("next/link", () => ({
  __esModule: true,
  default: ({
    children,
    href,
  }: {
    children: React.ReactNode;
    href: string;
  }) => <a href={href}>{children}</a>,
}));

jest.mock("@/components/analytics", () => ({
  PageTrackingClient: () => null,
}));

jest.mock("../RetryConnectionButton", () => ({
  RetryConnectionButton: () => <button type="button">Retry Connection</button>,
}));

import OfflinePage from "../page";

describe("OfflinePage", () => {
  it("renders the offline heading", () => {
    render(<OfflinePage />);
    expect(screen.getByText(/Offline Hub/i)).toBeInTheDocument();
  });

  it("renders the Go Home link", () => {
    render(<OfflinePage />);
    expect(screen.getByRole("link", { name: /Go Home/i })).toHaveAttribute(
      "href",
      "/",
    );
  });

  it("renders the Retry Connection button", () => {
    render(<OfflinePage />);
    expect(
      screen.getByRole("button", { name: /Retry Connection/i }),
    ).toBeInTheDocument();
  });

  it("Retry Connection button click executes without error", async () => {
    const user = userEvent.setup();
    render(<OfflinePage />);
    await expect(
      user.click(screen.getByRole("button", { name: /Retry Connection/i })),
    ).resolves.toBeUndefined();
  });
});
