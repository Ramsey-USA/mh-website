const originalFetch = globalThis.fetch;

export function mockFetch(): jest.MockedFunction<typeof fetch> {
  const fn = jest.fn() as jest.MockedFunction<typeof fetch>;
  globalThis.fetch = fn;
  return fn;
}

export function restoreFetch() {
  globalThis.fetch = originalFetch;
}
