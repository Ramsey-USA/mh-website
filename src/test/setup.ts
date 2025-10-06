import '@testing-library/jest-dom'

// Mock global test environment
beforeAll(() => {
  // Mock window.matchMedia for tests
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: jest.fn().mockImplementation((query: string) => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: jest.fn(), // Deprecated
      removeListener: jest.fn(), // Deprecated
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      dispatchEvent: jest.fn(),
    })),
  })

  // Mock IntersectionObserver
  global.IntersectionObserver = jest
    .fn()
    .mockImplementation((callback: any) => ({
      observe: jest.fn(),
      unobserve: jest.fn(),
      disconnect: jest.fn(),
      trigger: (entries: any[]) => callback(entries, this),
    }))

  // Mock ResizeObserver
  global.ResizeObserver = jest.fn().mockImplementation(() => ({
    observe: jest.fn(),
    unobserve: jest.fn(),
    disconnect: jest.fn(),
  }))

  // Mock localStorage
  const localStorageMock = {
    getItem: jest.fn(),
    setItem: jest.fn(),
    removeItem: jest.fn(),
    clear: jest.fn(),
  }
  Object.defineProperty(window, 'localStorage', {
    value: localStorageMock,
  })

  // Mock sessionStorage
  Object.defineProperty(window, 'sessionStorage', {
    value: localStorageMock,
  })

  // Mock URL.createObjectURL and URL.revokeObjectURL
  Object.defineProperty(global.URL, 'createObjectURL', {
    value: jest.fn(() => 'mock-object-url'),
    writable: true,
  })
  Object.defineProperty(global.URL, 'revokeObjectURL', {
    value: jest.fn(),
    writable: true,
  })

  // Mock Web Vitals API
  jest.mock('web-vitals', () => ({
    onFCP: jest.fn(),
    onFID: jest.fn(),
    onLCP: jest.fn(),
    onCLS: jest.fn(),
    onTTFB: jest.fn(),
  }))

  // Mock Performance Observer
  const MockPerformanceObserver = jest.fn().mockImplementation(() => ({
    observe: jest.fn(),
    disconnect: jest.fn(),
  }))
  ;(MockPerformanceObserver as any).supportedEntryTypes = ['measure', 'navigation', 'paint']
  global.PerformanceObserver = MockPerformanceObserver as any

  // Mock scroll functions
  Element.prototype.scrollIntoView = jest.fn()
  window.scrollTo = jest.fn()

  // Mock fetch if not available
  if (!global.fetch) {
    global.fetch = jest.fn()
  }
})

// Clean up after each test
afterEach(() => {
  jest.clearAllMocks()
})
