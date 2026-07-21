/**
 * @jest-environment jsdom
 */
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";

jest.mock("next-intl/server", () => ({
  getTranslations: async () =>
    ((key: string) => {
      const map: Record<string, string> = {
        title: "Page Not Found",
        description: "The page you requested is unavailable.",
        helpText: "Need a direct route?",
        navigationLabel: "Not found page navigation",
        servicesCta: "View Services",
        projectsCta: "View Projects",
        contactCta: "Contact",
        homeCta: "Back to Home",
        quickLinksTitle: "Need a direct route?",
        "quickLinks.about": "About Us",
        "quickLinks.projects": "Projects",
        "quickLinks.team": "Team",
        "quickLinks.contact": "Contact",
      };

      return map[key] ?? key;
    }) as unknown as {
      (key: string): string;
    },
}));

jest.mock("@/lib/i18n/locale.server", () => ({
  getServerLocale: async () => "en",
}));

jest.mock("next/image", () => ({
  __esModule: true,
  default: ({ alt, src, ...props }: any) => {
    const { fill, priority, ...imgProps } = props;
    return <img alt={alt} src={src} {...imgProps} />;
  },
}));

jest.mock("next/link", () => ({
  __esModule: true,
  default: ({ children, href }: any) => <a href={href}>{children}</a>,
}));

jest.mock("@/components/ui", () => ({
  Button: ({ children }: any) => <>{children}</>,
}));

jest.mock("@/components/icons/MaterialIcon", () => ({
  MaterialIcon: ({ icon }: { icon: string }) => <span>{icon}</span>,
}));

import NotFound from "../not-found";

describe("NotFound page", () => {
  it("renders the 404 heading", async () => {
    render(await NotFound());
    expect(screen.getByText(/404/i)).toBeInTheDocument();
  });

  it("renders direct construction navigation links", async () => {
    render(await NotFound());
    expect(
      screen.getByRole("link", { name: /view services/i }),
    ).toHaveAttribute("href", "/services");
    expect(
      screen.getByRole("link", { name: /view projects/i }),
    ).toHaveAttribute("href", "/projects");
    expect(screen.getByRole("link", { name: /^contact$/i })).toHaveAttribute(
      "href",
      "/contact",
    );
    expect(screen.getByRole("link", { name: /back to home/i })).toHaveAttribute(
      "href",
      "/",
    );
  });

  it("renders the logo images", async () => {
    render(await NotFound());
    const logos = screen.getAllByAltText("MH Construction");
    expect(logos.length).toBeGreaterThan(0);
  });

  it("renders an accessible main landmark with title", async () => {
    render(await NotFound());
    expect(screen.getByRole("main")).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: /page not found/i }),
    ).toBeInTheDocument();
  });
});
