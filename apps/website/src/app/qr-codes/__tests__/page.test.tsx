/** @jest-environment jsdom */

import { render, screen } from "@testing-library/react";
import QrCodesPage from "../page";

jest.mock("next-intl/server", () => ({
  getTranslations: jest.fn(async () => ({
    unavailable: {
      title: "Unavailable",
      body: "No QR codes available.",
      resourcesCta: "Resources",
      contactCta: "Contact",
    },
  })),
}));

jest.mock("@/lib/i18n/locale.server", () => ({
  getServerLocale: jest.fn(async () => "en"),
}));

jest.mock("node:fs/promises", () => ({
  readFile: jest.fn(async () =>
    JSON.stringify({
      qrCodes: [
        {
          name: "homepage",
          filename: "qr-homepage-color.png",
          relativePath: "core/qr-homepage-color.png",
          folder: "core",
          variant: "color",
          url: "https://www.mhc-gc.com",
          description: "Homepage",
        },
      ],
    }),
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

jest.mock("next/image", () => ({
  __esModule: true,
  default: ({ alt, src }: { alt: string; src: string }) => (
    <img alt={alt} src={src} />
  ),
}));

jest.mock("@/components/analytics", () => ({
  PageTrackingClient: () => null,
}));

jest.mock("@/components/ui", () => ({
  Button: ({
    children,
    asChild,
  }: {
    children: React.ReactNode;
    asChild?: boolean;
  }) => (asChild ? <>{children}</> : <button type="button">{children}</button>),
  Card: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
}));

jest.mock("@/components/icons/MaterialIcon", () => ({
  MaterialIcon: ({ icon }: { icon: string }) => <span>{icon}</span>,
}));

jest.mock("@/components/navigation/Breadcrumb", () => ({
  Breadcrumb: () => null,
}));

jest.mock("@/components/seo/SeoMeta", () => ({
  StructuredData: () => null,
}));

jest.mock("@/components/ui/backgrounds", () => ({
  DiagonalStripePattern: () => null,
  BrandColorBlobs: () => null,
}));

jest.mock("@/lib/branding/page-names", () => ({
  formatDualPageName: (value: string) => value,
  PAGE_TERMINOLOGY: {
    qrCodes: {
      seoName: "QR Codes",
      mhBrandName: "QR Library",
    },
  },
}));

jest.mock("@/lib/seo/breadcrumb-schema", () => ({
  generateBreadcrumbSchema: () => ({}),
}));

describe("QrCodesPage", () => {
  it("renders a destination link for each QR code entry", async () => {
    const page = await QrCodesPage();
    render(page);

    const destinationLink = screen.getByRole("link", {
      name: /visit destination for homepage/i,
    });

    expect(destinationLink).toHaveAttribute("href", "https://www.mhc-gc.com");
  });
});
