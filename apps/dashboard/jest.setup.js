// Learn more: https://github.com/testing-library/jest-dom
import "@testing-library/jest-dom";
import { TextDecoder, TextEncoder } from "node:util";

if (typeof globalThis.TextEncoder === "undefined") {
  Object.defineProperty(globalThis, "TextEncoder", {
    writable: true,
    value: TextEncoder,
  });
}

if (typeof globalThis.TextDecoder === "undefined") {
  Object.defineProperty(globalThis, "TextDecoder", {
    writable: true,
    value: TextDecoder,
  });
}

if (typeof globalThis.Request === "undefined") {
  class TestRequest {
    constructor(input, init = {}) {
      this.url = String(input);
      this.method = init.method || "GET";
      this.headers = init.headers || {};
      this.body = init.body;
    }
  }
  Object.defineProperty(globalThis, "Request", {
    writable: true,
    value: TestRequest,
  });
}

if (typeof globalThis.Response === "undefined") {
  class TestResponse {
    constructor(body = null, init = {}) {
      this.body = body;
      this.status = init.status || 200;
      this.headers = init.headers || {};
    }
  }
  Object.defineProperty(globalThis, "Response", {
    writable: true,
    value: TestResponse,
  });
}

if (typeof globalThis.Headers === "undefined") {
  class TestHeaders {
    constructor(init = {}) {
      this.map = new Map(Object.entries(init));
    }

    set(key, value) {
      this.map.set(String(key).toLowerCase(), String(value));
    }

    get(key) {
      return this.map.get(String(key).toLowerCase()) ?? null;
    }

    has(key) {
      return this.map.has(String(key).toLowerCase());
    }
  }
  Object.defineProperty(globalThis, "Headers", {
    writable: true,
    value: TestHeaders,
  });
}

// Mock Next.js router
jest.mock("next/navigation", () => ({
  useRouter() {
    return {
      push: jest.fn(),
      replace: jest.fn(),
      prefetch: jest.fn(),
      back: jest.fn(),
      pathname: "/",
      query: {},
      asPath: "/",
    };
  },
  usePathname() {
    return "/";
  },
  useSearchParams() {
    return new URLSearchParams();
  },
}));

// Mock Next.js Image component
jest.mock("next/image", () => ({
  __esModule: true,
  default: ({ fill: _fill, priority: _priority, ...props }) => {
    // eslint-disable-next-line jsx-a11y/alt-text
    return <img {...props} />;
  },
}));

// Mock OpenNext Cloudflare runtime helpers for Jest (avoids ESM-only package parsing)
jest.mock("@opennextjs/cloudflare", () => ({
  getCloudflareContext: jest.fn(() => ({ env: {} })),
}));

// Mock environment variables
process.env.NEXT_PUBLIC_SITE_URL = "http://localhost:3000";

if (typeof globalThis.matchMedia !== "function") {
  Object.defineProperty(globalThis, "matchMedia", {
    writable: true,
    value: jest.fn().mockImplementation((query) => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: jest.fn(),
      removeListener: jest.fn(),
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      dispatchEvent: jest.fn(),
    })),
  });
}
