// Background Sync functionality for PWA
// Handles offline form submissions and data synchronization

// Queue for storing background sync requests
class BackgroundSyncQueue {
  private dbName = 'mh-construction-sync'
  private dbVersion = 1
  private storeName = 'sync-queue'
  private db: IDBDatabase | null = null

  async init() {
    return new Promise<void>((resolve, reject) => {
      const request = indexedDB.open(this.dbName, this.dbVersion)

      request.onerror = () => reject(request.error)
      request.onsuccess = () => {
        this.db = request.result
        resolve()
      }

      request.onupgradeneeded = event => {
        const db = (event.target as IDBOpenDBRequest).result
        if (!db.objectStoreNames.contains(this.storeName)) {
          const store = db.createObjectStore(this.storeName, { keyPath: 'id' })
          store.createIndex('timestamp', 'timestamp', { unique: false })
          store.createIndex('type', 'type', { unique: false })
        }
      }
    })
  }

  async addRequest(type: string, data: any, endpoint: string) {
    if (!this.db) await this.init()

    const request = {
      id: Date.now().toString(),
      type,
      data,
      endpoint,
      timestamp: Date.now(),
      retries: 0,
      maxRetries: 3,
    }

    return new Promise<void>((resolve, reject) => {
      const transaction = this.db!.transaction([this.storeName], 'readwrite')
      const store = transaction.objectStore(this.storeName)
      const addRequest = store.add(request)

      addRequest.onsuccess = () => resolve()
      addRequest.onerror = () => reject(addRequest.error)
    })
  }

  async getRequests() {
    if (!this.db) await this.init()

    return new Promise<any[]>((resolve, reject) => {
      const transaction = this.db!.transaction([this.storeName], 'readonly')
      const store = transaction.objectStore(this.storeName)
      const getAllRequest = store.getAll()

      getAllRequest.onsuccess = () => resolve(getAllRequest.result)
      getAllRequest.onerror = () => reject(getAllRequest.error)
    })
  }

  async removeRequest(id: string) {
    if (!this.db) await this.init()

    return new Promise<void>((resolve, reject) => {
      const transaction = this.db!.transaction([this.storeName], 'readwrite')
      const store = transaction.objectStore(this.storeName)
      const deleteRequest = store.delete(id)

      deleteRequest.onsuccess = () => resolve()
      deleteRequest.onerror = () => reject(deleteRequest.error)
    })
  }

  async updateRequest(id: string, updates: any) {
    if (!this.db) await this.init()

    return new Promise<void>((resolve, reject) => {
      const transaction = this.db!.transaction([this.storeName], 'readwrite')
      const store = transaction.objectStore(this.storeName)
      const getRequest = store.get(id)

      getRequest.onsuccess = () => {
        const request = getRequest.result
        if (request) {
          Object.assign(request, updates)
          const putRequest = store.put(request)
          putRequest.onsuccess = () => resolve()
          putRequest.onerror = () => reject(putRequest.error)
        } else {
          reject(new Error('Request not found'))
        }
      }
      getRequest.onerror = () => reject(getRequest.error)
    })
  }
}

// Background sync manager
class BackgroundSyncManager {
  private queue = new BackgroundSyncQueue()
  private isProcessing = false

  async init() {
    await this.queue.init()

    // Listen for online events
    window.addEventListener('online', () => {
      this.processPendingRequests()
    })

    // Process any existing requests
    if (navigator.onLine) {
      this.processPendingRequests()
    }
  }

  async addRequest(type: string, data: any, endpoint: string) {
    try {
      await this.queue.addRequest(type, data, endpoint)
      console.log('[BackgroundSync] Request queued:', type, endpoint)

      // Try to process immediately if online
      if (navigator.onLine) {
        this.processPendingRequests()
      }

      return true
    } catch (error) {
      console.error('[BackgroundSync] Failed to queue request:', error)
      return false
    }
  }

  async processPendingRequests() {
    if (this.isProcessing || !navigator.onLine) {
      return
    }

    this.isProcessing = true
    console.log('[BackgroundSync] Processing pending requests...')

    try {
      const requests = await this.queue.getRequests()

      for (const request of requests) {
        try {
          await this.processRequest(request)
          await this.queue.removeRequest(request.id)
          console.log('[BackgroundSync] Successfully processed:', request.type)
        } catch (error) {
          console.error('[BackgroundSync] Failed to process request:', error)

          // Increment retry count
          request.retries += 1

          if (request.retries >= request.maxRetries) {
            // Remove failed request after max retries
            await this.queue.removeRequest(request.id)
            console.log(
              '[BackgroundSync] Removed failed request after max retries:',
              request.type
            )
          } else {
            // Update retry count
            await this.queue.updateRequest(request.id, {
              retries: request.retries,
            })
          }
        }
      }
    } catch (error) {
      console.error('[BackgroundSync] Error processing queue:', error)
    } finally {
      this.isProcessing = false
    }
  }

  private async processRequest(request: any) {
    const { endpoint, data, type } = request

    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    // Handle successful response
    this.notifySuccess(type, data)

    return response.json()
  }

  private notifySuccess(type: string, data: any) {
    // Show success notification
    if ('serviceWorker' in navigator && 'Notification' in window) {
      navigator.serviceWorker.ready.then(registration => {
        registration.showNotification('MH Construction', {
          body: this.getSuccessMessage(type),
          icon: '/icons/icon-96x96.png',
          badge: '/icons/icon-96x96.png',
          tag: `sync-success-${type}`,
          data: { type: 'sync-success', originalType: type },
        })
      })
    }
  }

  private getSuccessMessage(type: string): string {
    switch (type) {
      case 'contact':
        return 'Your contact form has been submitted successfully!'
      case 'booking':
        return 'Your appointment request has been submitted!'
      case 'estimator':
        return 'Your project estimate request has been saved!'
      default:
        return 'Your request has been processed successfully!'
    }
  }

  async getPendingCount(): Promise<number> {
    try {
      const requests = await this.queue.getRequests()
      return requests.length
    } catch (error) {
      console.error('[BackgroundSync] Error getting pending count:', error)
      return 0
    }
  }

  async clearQueue() {
    try {
      const requests = await this.queue.getRequests()
      for (const request of requests) {
        await this.queue.removeRequest(request.id)
      }
      console.log('[BackgroundSync] Queue cleared')
    } catch (error) {
      console.error('[BackgroundSync] Error clearing queue:', error)
    }
  }
}

// Global instance
let backgroundSyncManager: BackgroundSyncManager | null = null

export const getBackgroundSyncManager =
  async (): Promise<BackgroundSyncManager> => {
    if (!backgroundSyncManager) {
      backgroundSyncManager = new BackgroundSyncManager()
      await backgroundSyncManager.init()
    }
    return backgroundSyncManager
  }

// Helper functions for specific form types
export const syncContactForm = async (formData: any) => {
  const manager = await getBackgroundSyncManager()
  return manager.addRequest('contact', formData, '/api/contact')
}

export const syncBookingForm = async (bookingData: any) => {
  const manager = await getBackgroundSyncManager()
  return manager.addRequest('booking', bookingData, '/api/booking')
}

export const syncEstimatorForm = async (estimateData: any) => {
  const manager = await getBackgroundSyncManager()
  return manager.addRequest('estimator', estimateData, '/api/estimator')
}

export const getPendingSyncCount = async (): Promise<number> => {
  try {
    const manager = await getBackgroundSyncManager()
    return manager.getPendingCount()
  } catch (error) {
    console.error('Error getting pending sync count:', error)
    return 0
  }
}

// Initialize background sync when module loads
if (typeof window !== 'undefined') {
  // Wait for page load to initialize
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      getBackgroundSyncManager()
    })
  } else {
    getBackgroundSyncManager()
  }
}
