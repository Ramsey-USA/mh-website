/** @jest-environment jsdom */
import { render, screen } from "@testing-library/react";

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

jest.mock("@/components/icons/MaterialIcon", () => ({
  MaterialIcon: ({ icon }: { icon: string }) => <span>{icon}</span>,
}));

jest.mock("@/components/analytics", () => ({
  PageTrackingClient: () => null,
}));

jest.mock("@/components/seo/SeoMeta", () => ({
  StructuredData: () => null,
}));

jest.mock("@/lib/seo/breadcrumb-schema", () => ({
  generateBreadcrumbSchema: jest.fn(() => ({})),
  breadcrumbPatterns: { terms: {} },
}));

jest.mock("@/lib/constants/company", () => ({
  COMPANY_INFO: {
    address: {
      street: "3111 N. Capitol Ave.",
      cityStateZip: "Pasco, WA 99301",
    },
    phone: { tel: "+15093086489", display: "(509) 308-6489" },
    email: { main: "office@mhc-gc.com" },
  },
}));

import TermsOfServicePage from "../page";

describe("TermsOfServicePage", () => {
  it("renders the Terms of Service heading", () => {
    render(<TermsOfServicePage />);
    expect(
      screen.getByRole("heading", { name: /Terms of Service/i }),
    ).toBeInTheDocument();
  });

  it("renders contact email", () => {
    render(<TermsOfServicePage />);
    expect(screen.getAllByText("office@mhc-gc.com").length).toBeGreaterThan(0);
  });

  it("renders back-to-home link", () => {
    render(<TermsOfServicePage />);
    const link = screen.getByRole("link", { name: /back to home/i });
    expect(link).toHaveAttribute("href", "/");
  });
});
