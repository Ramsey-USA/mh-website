// MH Construction Service Worker
// Provides offline capabilities, caching, and PWA functionality

const CACHE_NAME = 'mh-construction-v2.2.0'
const STATIC_CACHE_NAME = 'mh-construction-static-v2.2.0'
const DYNAMIC_CACHE_NAME = 'mh-construction-dynamic-v2.2.0'
const IMAGE_CACHE_NAME = 'mh-construction-images-v2.2.0'
const API_CACHE_NAME = 'mh-construction-api-v2.2.0'

// Cache duration settings (in milliseconds)
const CACHE_DURATION = {
  STATIC: 7 * 24 * 60 * 60 * 1000, // 7 days
  DYNAMIC: 24 * 60 * 60 * 1000, // 1 day
  IMAGES: 30 * 24 * 60 * 60 * 1000, // 30 days
  API: 5 * 60 * 1000, // 5 minutes
}

// Enhanced static assets to precache - critical paths first
const CRITICAL_ASSETS = [
  '/',
  '/offline',
  '/manifest.json',
  '/icons/icon-192x192.png',
  '/icons/icon-512x512.png'
]

const STATIC_ASSETS = [
  ...CRITICAL_ASSETS,
  '/about',
  '/services',
  '/portfolio',
  '/projects',
  '/testimonials',
  '/blog',
  '/contact',
  '/estimator',
  '/booking',
  '/_next/static/css/app/layout.css',
  '/_next/static/css/app/page.css'
]

// API endpoints to cache with different strategies
const CRITICAL_API_ENDPOINTS = [
  '/api/estimator',
  '/api/contact'
]

const API_ENDPOINTS = [
  ...CRITICAL_API_ENDPOINTS,
  '/api/booking',
  '/api/testimonials',
  '/api/projects',
  '/api/notifications/subscribe',
  '/api/notifications/send'
]

// Enhanced caching strategies
const CACHE_STRATEGIES = {
  CACHE_FIRST: 'cache-first',
  NETWORK_FIRST: 'network-first',
  STALE_WHILE_REVALIDATE: 'stale-while-revalidate',
  NETWORK_ONLY: 'network-only',
  CACHE_ONLY: 'cache-only'
}

// Skip waiting and claim clients immediately
self.addEventListener('install', event => {
  console.log('[SW] Installing service worker...')
  
  event.waitUntil(
    Promise.all([
      // Cache critical assets first for faster offline experience
      caches.open(STATIC_CACHE_NAME).then(cache => {
        console.log('[SW] Precaching critical assets')
        return cache.addAll(CRITICAL_ASSETS)
      }).then(() => {
        // Then cache remaining static assets
        return caches.open(STATIC_CACHE_NAME).then(cache => {
          console.log('[SW] Precaching remaining static assets')
          return cache.addAll(STATIC_ASSETS.filter(asset => !CRITICAL_ASSETS.includes(asset)))
        })
      }),
      // Skip waiting to activate immediately
      self.skipWaiting()
    ])
  )
})

self.addEventListener('activate', event => {
  console.log('[SW] Activating service worker...')
  
  event.waitUntil(
    Promise.all([
      // Clean up old caches
      caches.keys().then(cacheNames => {
        return Promise.all(
          cacheNames
            .filter(cacheName => {
              return cacheName.startsWith('mh-construction-') && 
                     !cacheName.includes('v2.2.0')
            })
            .map(cacheName => {
              console.log('[SW] Deleting old cache:', cacheName)
              return caches.delete(cacheName)
            })
        )
      }),
      // Claim all clients immediately
      self.clients.claim(),
      // Pre-warm critical API endpoints
      warmupCriticalEndpoints()
    ])
  )
})

// Warm up critical API endpoints by making background requests
async function warmupCriticalEndpoints() {
  console.log('[SW] Warming up critical API endpoints')
  
  for (const endpoint of CRITICAL_API_ENDPOINTS) {
    try {
      const response = await fetch(endpoint)
      if (response.ok) {
        const cache = await caches.open(API_CACHE_NAME)
        await cache.put(endpoint, response.clone())
        console.log('[SW] Warmed up:', endpoint)
      }
    } catch (error) {
      console.log('[SW] Could not warm up:', endpoint, error)
    }
  }
}

// Enhanced service worker with background sync support
self.addEventListener('sync', event => {
  console.log('[SW] Background sync event:', event.tag)
  
  if (event.tag === 'background-sync') {
    event.waitUntil(handleBackgroundSync())
  }
})

// Handle background sync
async function handleBackgroundSync() {
  console.log('[SW] Performing background sync...')
  
  try {
    // Notify clients that sync is starting
    const clients = await self.clients.matchAll()
    clients.forEach(client => {
      client.postMessage({
        type: 'BACKGROUND_SYNC_START'
      })
    })

    // In a real implementation, you would:
    // 1. Read queued requests from IndexedDB
    // 2. Attempt to send them to the server
    // 3. Remove successful requests from the queue
    // 4. Notify clients of the results

    // For demo, we'll just simulate success
    setTimeout(() => {
      clients.forEach(client => {
        client.postMessage({
          type: 'BACKGROUND_SYNC_SUCCESS',
          data: { processed: 1 }
        })
      })
    }, 1000)

  } catch (error) {
    console.error('[SW] Background sync failed:', error)
    
    // Notify clients of failure
    const clients = await self.clients.matchAll()
    clients.forEach(client => {
      client.postMessage({
        type: 'BACKGROUND_SYNC_FAILED',
        error: error.message
      })
    })
  }
}

// Handle push notification events
self.addEventListener('push', event => {
  console.log('[SW] Push notification received:', event)
  
  if (event.data) {
    const data = event.data.json()
    
    event.waitUntil(
      self.registration.showNotification(data.title, {
        body: data.body,
        icon: data.icon || '/icons/icon-192x192.png',
        badge: data.badge || '/icons/icon-96x96.png',
        data: data.data,
        tag: data.tag,
        requireInteraction: data.requireInteraction || false,
        vibrate: [100, 50, 100]
      })
    )
  }
})

// Handle notification click events
self.addEventListener('notificationclick', event => {
  console.log('[SW] Notification clicked:', event)
  
  event.notification.close()
  
  // Handle different notification types
  const data = event.notification.data || {}
  let url = '/'
  
  if (data.url) {
    url = data.url
  } else if (data.type === 'project') {
    url = '/projects'
  } else if (data.type === 'appointment') {
    url = '/booking'
  } else if (data.type === 'message') {
    url = '/contact'
  }
  
  event.waitUntil(
    clients.matchAll({ type: 'window' }).then(clientList => {
      // Check if there's already a window/tab open with the target URL
      for (const client of clientList) {
        if (client.url === url && 'focus' in client) {
          return client.focus()
        }
      }
      
      // If not, open a new window/tab
      if (clients.openWindow) {
        return clients.openWindow(url)
      }
    })
  )
})

// Message handling for communication with clients
self.addEventListener('message', event => {
  console.log('[SW] Message received:', event.data)
  
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting()
  }
  
  if (event.data && event.data.type === 'REQUEST_SYNC') {
    // Register background sync
    self.registration.sync.register('background-sync').catch(err => {
      console.error('[SW] Background sync registration failed:', err)
    })
  }
})

self.addEventListener('fetch', event => {
  const { request } = event
  const url = new URL(request.url)
  
  // Only handle GET requests
  if (request.method !== 'GET') {
    return
  }
  
  // Skip Chrome extension requests
  if (url.protocol === 'chrome-extension:') {
    return
  }
  
  // Handle different types of requests with optimized strategies
  if (url.origin === location.origin) {
    // Same origin requests
    if (url.pathname.startsWith('/api/')) {
      // API requests - use intelligent caching based on endpoint
      event.respondWith(handleApiRequest(request))
    } else if (isImageRequest(request)) {
      // Image requests - aggressive caching for performance
      event.respondWith(handleImageRequest(request))
    } else if (isStaticAsset(request)) {
      // Static assets - cache first for speed
      event.respondWith(handleStaticRequest(request))
    } else {
      // Page requests - network first with fallback
      event.respondWith(handlePageRequest(request))
    }
  } else {
    // External requests (CDN, APIs, etc.) - network first
    event.respondWith(handleExternalRequest(request))
  }
})

// Enhanced API request handler with intelligent caching strategies
async function handleApiRequest(request) {
  const url = new URL(request.url)
  const cacheName = API_CACHE_NAME
  
  // Determine cache strategy based on endpoint
  const isCriticalEndpoint = CRITICAL_API_ENDPOINTS.some(endpoint => url.pathname.includes(endpoint))
  
  if (isCriticalEndpoint) {
    // Stale-while-revalidate for critical endpoints
    const cachedResponse = await caches.match(request)
    
    // Update cache in background
    fetch(request).then(networkResponse => {
      if (networkResponse.ok) {
        caches.open(cacheName).then(cache => {
          cache.put(request, networkResponse.clone())
        })
      }
    }).catch(error => {
      console.log('[SW] Background update failed:', error)
    })
    
    if (cachedResponse) {
      return cachedResponse
    }
  }
  
  // Network first strategy (default)
  try {
    // Try network first with timeout
    const networkResponse = await Promise.race([
      fetch(request),
      new Promise((_, reject) => 
        setTimeout(() => reject(new Error('API timeout')), 8000)
      )
    ])
    
    // Cache successful responses
    if (networkResponse.ok) {
      const cache = await caches.open(cacheName)
      cache.put(request, networkResponse.clone())
    }
    
    return networkResponse
  } catch (error) {
    console.log('[SW] Network failed for API request, trying cache:', request.url)
    
    // Fallback to cache
    const cachedResponse = await caches.match(request)
    if (cachedResponse) {
      return cachedResponse
    }
    
    // Return offline response for specific endpoints
    return createOfflineApiResponse(request)
  }
}

// Handle image requests with cache-first strategy
async function handleImageRequest(request) {
  const cacheName = IMAGE_CACHE_NAME
  
  // Try cache first
  const cachedResponse = await caches.match(request)
  if (cachedResponse && !isExpired(cachedResponse, CACHE_DURATION.IMAGES)) {
    return cachedResponse
  }
  
  try {
    // Fetch from network
    const networkResponse = await fetch(request)
    
    if (networkResponse.ok) {
      const cache = await caches.open(cacheName)
      cache.put(request, networkResponse.clone())
    }
    
    return networkResponse
  } catch (error) {
    console.log('[SW] Network failed for image, using cached version:', request.url)
    
    // Return cached version even if expired
    if (cachedResponse) {
      return cachedResponse
    }
    
    // Return placeholder image
    return createPlaceholderImage()
  }
}

// Handle static assets with cache-first strategy
async function handleStaticRequest(request) {
  const cacheName = STATIC_CACHE_NAME
  
  // Try cache first
  const cachedResponse = await caches.match(request)
  if (cachedResponse && !isExpired(cachedResponse, CACHE_DURATION.STATIC)) {
    return cachedResponse
  }
  
  try {
    // Fetch from network
    const networkResponse = await fetch(request)
    
    if (networkResponse.ok) {
      const cache = await caches.open(cacheName)
      cache.put(request, networkResponse.clone())
    }
    
    return networkResponse
  } catch (error) {
    console.log('[SW] Network failed for static asset, using cached version:', request.url)
    
    // Return cached version even if expired
    if (cachedResponse) {
      return cachedResponse
    }
    
    throw error
  }
}

// Handle page requests with network-first strategy and offline fallback
async function handlePageRequest(request) {
  const cacheName = DYNAMIC_CACHE_NAME
  
  try {
    // Try network first
    const networkResponse = await fetch(request)
    
    if (networkResponse.ok) {
      const cache = await caches.open(cacheName)
      cache.put(request, networkResponse.clone())
    }
    
    return networkResponse
  } catch (error) {
    console.log('[SW] Network failed for page request, trying cache:', request.url)
    
    // Try cache
    const cachedResponse = await caches.match(request)
    if (cachedResponse) {
      return cachedResponse
    }
    
    // Try to match root path for SPA routing
    const rootResponse = await caches.match('/')
    if (rootResponse) {
      return rootResponse
    }
    
    // Return offline page
    return caches.match('/offline')
  }
}

// Handle external requests
async function handleExternalRequest(request) {
  try {
    const networkResponse = await fetch(request)
    return networkResponse
  } catch (error) {
    console.log('[SW] External request failed:', request.url)
    throw error
  }
}

// Utility functions
function isImageRequest(request) {
  return request.destination === 'image' || 
         /\.(jpg|jpeg|png|gif|webp|svg|ico)$/i.test(request.url)
}

function isStaticAsset(request) {
  return request.url.includes('/_next/static/') ||
         request.url.includes('/icons/') ||
         request.url.includes('/manifest.json') ||
         /\.(js|css|woff|woff2|ttf|eot)$/i.test(request.url)
}

function isExpired(response, maxAge) {
  const dateHeader = response.headers.get('date')
  if (!dateHeader) return false
  
  const cacheTime = new Date(dateHeader).getTime()
  const now = Date.now()
  
  return (now - cacheTime) > maxAge
}

function createOfflineApiResponse(request) {
  const url = new URL(request.url)
  
  // Return appropriate offline responses for different API endpoints
  if (url.pathname.includes('/estimator')) {
    return new Response(JSON.stringify({
      error: 'Offline',
      message: 'Estimator service is unavailable offline. Please try again when connected.'
    }), {
      status: 503,
      headers: { 'Content-Type': 'application/json' }
    })
  }
  
  if (url.pathname.includes('/booking')) {
    return new Response(JSON.stringify({
      error: 'Offline',
      message: 'Booking service requires internet connection. Your request will be processed when online.'
    }), {
      status: 503,
      headers: { 'Content-Type': 'application/json' }
    })
  }
  
  return new Response(JSON.stringify({
    error: 'Offline',
    message: 'This service is unavailable while offline.'
  }), {
    status: 503,
    headers: { 'Content-Type': 'application/json' }
  })
}

function createPlaceholderImage() {
  // Create a simple placeholder SVG
  const svg = `
    <svg width="400" height="300" xmlns="http://www.w3.org/2000/svg">
      <rect width="100%" height="100%" fill="#f3f4f6"/>
      <text x="50%" y="50%" text-anchor="middle" dy=".3em" fill="#6b7280" font-family="Arial, sans-serif" font-size="16">
        Image unavailable offline
      </text>
    </svg>
  `
  
  return new Response(svg, {
    headers: {
      'Content-Type': 'image/svg+xml',
      'Cache-Control': 'no-cache'
    }
  })
}

// Background sync for form submissions
self.addEventListener('sync', event => {
  console.log('[SW] Background sync triggered:', event.tag)
  
  if (event.tag === 'contact-form-sync') {
    event.waitUntil(syncContactForms())
  } else if (event.tag === 'booking-sync') {
    event.waitUntil(syncBookings())
  } else if (event.tag === 'testimonial-sync') {
    event.waitUntil(syncTestimonials())
  }
})

// Sync pending contact forms
async function syncContactForms() {
  try {
    const db = await openIndexedDB()
    const pendingForms = await getAllPendingForms(db, 'contact-forms')
    
    for (const form of pendingForms) {
      try {
        const response = await fetch('/api/contact', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(form.data)
        })
        
        if (response.ok) {
          await deletePendingForm(db, 'contact-forms', form.id)
          console.log('[SW] Synced contact form:', form.id)
        }
      } catch (error) {
        console.log('[SW] Failed to sync contact form:', form.id, error)
      }
    }
  } catch (error) {
    console.log('[SW] Contact form sync failed:', error)
  }
}

// Sync pending bookings
async function syncBookings() {
  try {
    const db = await openIndexedDB()
    const pendingBookings = await getAllPendingForms(db, 'bookings')
    
    for (const booking of pendingBookings) {
      try {
        const response = await fetch('/api/booking', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(booking.data)
        })
        
        if (response.ok) {
          await deletePendingForm(db, 'bookings', booking.id)
          console.log('[SW] Synced booking:', booking.id)
        }
      } catch (error) {
        console.log('[SW] Failed to sync booking:', booking.id, error)
      }
    }
  } catch (error) {
    console.log('[SW] Booking sync failed:', error)
  }
}

// Sync pending testimonials
async function syncTestimonials() {
  try {
    const db = await openIndexedDB()
    const pendingTestimonials = await getAllPendingForms(db, 'testimonials')
    
    for (const testimonial of pendingTestimonials) {
      try {
        const response = await fetch('/api/testimonials', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(testimonial.data)
        })
        
        if (response.ok) {
          await deletePendingForm(db, 'testimonials', testimonial.id)
          console.log('[SW] Synced testimonial:', testimonial.id)
        }
      } catch (error) {
        console.log('[SW] Failed to sync testimonial:', testimonial.id, error)
      }
    }
  } catch (error) {
    console.log('[SW] Testimonial sync failed:', error)
  }
}

// IndexedDB utilities for offline form storage
function openIndexedDB() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open('MHConstructionDB', 1)
    
    request.onerror = () => reject(request.error)
    request.onsuccess = () => resolve(request.result)
    
    request.onupgradeneeded = (event) => {
      const db = event.target.result
      
      // Create object stores for offline form data
      if (!db.objectStoreNames.contains('contact-forms')) {
        db.createObjectStore('contact-forms', { keyPath: 'id', autoIncrement: true })
      }
      
      if (!db.objectStoreNames.contains('bookings')) {
        db.createObjectStore('bookings', { keyPath: 'id', autoIncrement: true })
      }
      
      if (!db.objectStoreNames.contains('testimonials')) {
        db.createObjectStore('testimonials', { keyPath: 'id', autoIncrement: true })
      }
    }
  })
}

function getAllPendingForms(db, storeName) {
  return new Promise((resolve, reject) => {
    const transaction = db.transaction([storeName], 'readonly')
    const store = transaction.objectStore(storeName)
    const request = store.getAll()
    
    request.onerror = () => reject(request.error)
    request.onsuccess = () => resolve(request.result)
  })
}

function deletePendingForm(db, storeName, id) {
  return new Promise((resolve, reject) => {
    const transaction = db.transaction([storeName], 'readwrite')
    const store = transaction.objectStore(storeName)
    const request = store.delete(id)
    
    request.onerror = () => reject(request.error)
    request.onsuccess = () => resolve()
  })
}

// Push notification handling
self.addEventListener('push', event => {
  console.log('[SW] Push message received')
  
  let options = {
    body: 'You have a new update from MH Construction',
    icon: '/icons/icon-192x192.png',
    badge: '/icons/badge-72x72.png',
    vibrate: [200, 100, 200],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: 1
    },
    actions: [
      {
        action: 'explore',
        title: 'View Details',
        icon: '/icons/action-explore.png'
      },
      {
        action: 'close',
        title: 'Close',
        icon: '/icons/action-close.png'
      }
    ],
    requireInteraction: false,
    silent: false
  }
  
  if (event.data) {
    try {
      const data = event.data.json()
      options = { ...options, ...data }
    } catch (error) {
      console.log('[SW] Invalid push data format')
    }
  }
  
  event.waitUntil(
    self.registration.showNotification('MH Construction', options)
  )
})

// Notification click handling
self.addEventListener('notificationclick', event => {
  console.log('[SW] Notification clicked:', event.notification.tag)
  
  event.notification.close()
  
  if (event.action === 'close') {
    return
  }
  
  const urlToOpen = event.action === 'explore' 
    ? '/dashboard' 
    : '/'
  
  event.waitUntil(
    clients.matchAll({ type: 'window' }).then(clientList => {
      // Check if there's already a window/tab open with the target URL
      for (const client of clientList) {
        if (client.url.includes(urlToOpen) && 'focus' in client) {
          return client.focus()
        }
      }
      
      // Open new window/tab if none found
      if (clients.openWindow) {
        return clients.openWindow(urlToOpen)
      }
    })
  )
})

// Periodic background sync for cache cleanup
self.addEventListener('periodicsync', event => {
  if (event.tag === 'cache-cleanup') {
    event.waitUntil(cleanupExpiredCaches())
  }
})

async function cleanupExpiredCaches() {
  const cacheNames = await caches.keys()
  
  for (const cacheName of cacheNames) {
    if (cacheName.startsWith('mh-construction-')) {
      const cache = await caches.open(cacheName)
      const requests = await cache.keys()
      
      for (const request of requests) {
        const response = await cache.match(request)
        if (response && isExpiredResponse(response, cacheName)) {
          await cache.delete(request)
          console.log('[SW] Cleaned up expired cache entry:', request.url)
        }
      }
    }
  }
}

function isExpiredResponse(response, cacheName) {
  let maxAge = CACHE_DURATION.DYNAMIC // default
  
  if (cacheName.includes('static')) maxAge = CACHE_DURATION.STATIC
  else if (cacheName.includes('images')) maxAge = CACHE_DURATION.IMAGES
  else if (cacheName.includes('api')) maxAge = CACHE_DURATION.API
  
  return isExpired(response, maxAge)
}

console.log('[SW] Service worker script loaded successfully')