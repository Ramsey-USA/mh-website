/** @jest-environment jsdom */
import { render, screen } from "@testing-library/react";

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

  it("renders the Retry Connection link", () => {
    render(<OfflinePage />);
    expect(
      screen.getByRole("link", { name: /Retry Connection/i }),
    ).toHaveAttribute("href", "/hub");
  });
});
