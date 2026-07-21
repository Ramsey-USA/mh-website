/**
 * @jest-environment jsdom
 */
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

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
  Button: ({ children, onClick }: any) => (
    <button type="button" onClick={onClick}>
      {children}
    </button>
  ),
  Card: ({ children }: any) => <div>{children}</div>,
  CardContent: ({ children }: any) => <div>{children}</div>,
}));

jest.mock("@/lib/i18n/locale", () => ({
  getClientLocale: () => "en",
}));

jest.mock("@/lib/utils/logger", () => ({
  logger: { error: jest.fn() },
}));

jest.mock("@/lib/monitoring/sentry", () => ({
  captureException: jest.fn(),
}));

import GlobalError from "../global-error";

const testError = new Error("Critical failure") as Error & { digest?: string };
const mockReset = jest.fn();

describe("GlobalError page", () => {
  // GlobalError is a Next.js root error boundary that renders <html><body>.
  // jsdom wraps renders in a <div>, so React always warns about this nesting.
  // Suppress the specific expected warning — it is not a bug in our code.
  let errorSpy: jest.SpyInstance;
  beforeEach(() => {
    mockReset.mockClear();
    (require("@/lib/utils/logger").logger.error as jest.Mock).mockClear();
    errorSpy = jest
      .spyOn(console, "error")
      .mockImplementation((...args: unknown[]) => {
        const msg = typeof args[0] === "string" ? args[0] : "";
        if (
          msg.includes("cannot be a child of") ||
          msg.includes("hydration error")
        )
          return;
        // eslint-disable-next-line no-console
        console.warn(...args);
      });
  });
  afterEach(() => {
    errorSpy.mockRestore();
  });

  it("renders the Application Error heading", () => {
    render(<GlobalError error={testError} reset={mockReset} />);
    expect(screen.getByText(/application error/i)).toBeInTheDocument();
  });

  it("logs the error on mount", () => {
    render(<GlobalError error={testError} reset={mockReset} />);
    const { logger } = require("@/lib/utils/logger");
    expect(logger.error).toHaveBeenCalledWith(
      "Global error boundary triggered",
      {
        boundary: "global-error",
        errorName: "Error",
        digest: null,
      },
    );
  });

  it("forwards exception to sentry with safe context", () => {
    render(<GlobalError error={testError} reset={mockReset} />);
    const { captureException } = require("@/lib/monitoring/sentry");
    expect(captureException).toHaveBeenCalledWith(testError, {
      boundary: "global-error",
      errorName: "Error",
      digest: null,
    });
  });

  it("calls reset when Try Again button is clicked", async () => {
    const user = userEvent.setup();
    render(<GlobalError error={testError} reset={mockReset} />);
    await user.click(screen.getByRole("button", { name: /try again/i }));
    expect(mockReset).toHaveBeenCalledTimes(1);
  });

  it("renders a Contact Support link", () => {
    render(<GlobalError error={testError} reset={mockReset} />);
    const link = screen.getByRole("link", { name: /contact support/i });
    expect(link).toHaveAttribute("href", "/contact");
  });

  it("tracks exception in gtag with fatal=true when available", () => {
    const mockGtag = jest.fn();
    window.gtag = mockGtag;
    render(<GlobalError error={testError} reset={mockReset} />);
    expect(mockGtag).toHaveBeenCalledWith("event", "exception", {
      description: "global-error:none",
      fatal: true,
    });
    delete (window as any).gtag;
  });

  it("does not throw when window.gtag is undefined", () => {
    delete (window as any).gtag;
    expect(() =>
      render(<GlobalError error={testError} reset={mockReset} />),
    ).not.toThrow();
  });

  it("renders a home navigation link", () => {
    render(<GlobalError error={testError} reset={mockReset} />);
    expect(screen.getByRole("link", { name: /go home/i })).toHaveAttribute(
      "href",
      "/",
    );
  });

  it("keeps an accessible landmark and heading structure", () => {
    render(<GlobalError error={testError} reset={mockReset} />);
    expect(screen.getByRole("main")).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: /application error/i }),
    ).toBeInTheDocument();
  });

  it("does not expose raw error text in the rendered fallback", () => {
    render(<GlobalError error={testError} reset={mockReset} />);
    expect(screen.queryByText("Critical failure")).not.toBeInTheDocument();
  });

  it("supports Try Again interaction", async () => {
    const user = userEvent.setup();
    render(<GlobalError error={testError} reset={mockReset} />);
    await user.click(screen.getByRole("button", { name: /try again/i }));
    expect(mockReset).toHaveBeenCalledTimes(1);
  });
});
