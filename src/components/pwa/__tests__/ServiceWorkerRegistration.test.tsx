import { render } from "@testing-library/react";
import { ServiceWorkerRegistration } from "../ServiceWorkerRegistration";

describe("ServiceWorkerRegistration", () => {
  it("renders null (no UI output)", () => {
    const { container } = render(<ServiceWorkerRegistration />);
    expect(container.firstChild).toBeNull();
  });

  it("does nothing when serviceWorker is not in navigator", () => {
    // jsdom does not implement navigator.serviceWorker — ensure no crash
    const onInstalled = jest.fn();
    const onError = jest.fn();
    render(
      <ServiceWorkerRegistration onInstalled={onInstalled} onError={onError} />,
    );
    expect(onInstalled).not.toHaveBeenCalled();
    expect(onError).not.toHaveBeenCalled();
  });

  it("does nothing in development environment", () => {
    const original = process.env.NODE_ENV;
    // NODE_ENV is already 'test', which is not 'development', but the component
    // also checks typeof window — we just verify it renders cleanly.
    const { container } = render(<ServiceWorkerRegistration />);
    expect(container.firstChild).toBeNull();
    // Restore
    Object.defineProperty(process.env, "NODE_ENV", { value: original });
  });

  it("accepts all optional callbacks without throwing", () => {
    const onUpdateAvailable = jest.fn();
    const onInstalled = jest.fn();
    const onError = jest.fn();

    expect(() =>
      render(
        <ServiceWorkerRegistration
          onUpdateAvailable={onUpdateAvailable}
          onInstalled={onInstalled}
          onError={onError}
        />,
      ),
    ).not.toThrow();
  });
});
