/**
 * @jest-environment jsdom
 */
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";

jest.mock("next/image", () => ({
  __esModule: true,
  default: ({ alt, src, ...props }: any) => (
    <img alt={alt} src={src} {...props} />
  ),
}));

jest.mock("next/link", () => ({
  __esModule: true,
  default: ({ children, href }: any) => <a href={href}>{children}</a>,
}));

jest.mock("@/components/ui", () => ({
  Button: ({ children, onClick }: any) => (
    <button type="button" onClick={onClick}>
      {children}
    </button>
  ),
}));

jest.mock("@/components/icons/MaterialIcon", () => ({
  MaterialIcon: ({ icon }: { icon: string }) => <span>{icon}</span>,
}));

import NotFound from "../not-found";

describe("NotFound page", () => {
  it("renders the 404 heading", () => {
    render(<NotFound />);
    expect(screen.getByText(/404/i)).toBeInTheDocument();
  });

  it("renders a link to go home", () => {
    render(<NotFound />);
    const homeLink = screen.getByRole("link", { name: /back to home/i });
    expect(homeLink).toHaveAttribute("href", "/");
  });

  it("renders a contact link", () => {
    render(<NotFound />);
    const contactLinks = screen.getAllByRole("link");
    const hasContact = contactLinks.some((l) =>
      l.getAttribute("href")?.includes("/contact"),
    );
    expect(hasContact).toBe(true);
  });

  it("renders the logo images", () => {
    render(<NotFound />);
    const logos = screen.getAllByAltText("MH Construction");
    expect(logos.length).toBeGreaterThan(0);
  });
});
