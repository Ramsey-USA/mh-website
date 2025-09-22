'use client'

import { useState, useEffect } from 'react'
import { RefreshCw, Download, X, AlertCircle, CheckCircle } from 'lucide-react'

interface PWAUpdateProps {
  onUpdate?: () => void
  onDismiss?: () => void
  className?: string
}

export default function PWAUpdate({ onUpdate, onDismiss, className = '' }: PWAUpdateProps) {
  const [updateAvailable, setUpdateAvailable] = useState(false)
  const [isUpdating, setIsUpdating] = useState(false)
  const [updateSuccess, setUpdateSuccess] = useState(false)
  const [registration, setRegistration] = useState<ServiceWorkerRegistration | null>(null)
  const [showUpdatePrompt, setShowUpdatePrompt] = useState(false)

  useEffect(() => {
    if ('serviceWorker' in navigator) {
      // Check for existing service worker registration
      navigator.serviceWorker.ready.then((reg) => {
        setRegistration(reg)
        
        // Check for waiting service worker (update available)
        if (reg.waiting) {
          setUpdateAvailable(true)
          setShowUpdatePrompt(true)
        }

        // Listen for new service worker installation
        reg.addEventListener('updatefound', () => {
          const newWorker = reg.installing
          if (newWorker) {
            newWorker.addEventListener('statechange', () => {
              if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                // New service worker installed and ready
                setUpdateAvailable(true)
                setShowUpdatePrompt(true)
              }
            })
          }
        })
      })

      // Listen for messages from service worker
      navigator.serviceWorker.addEventListener('message', (event) => {
        if (event.data && event.data.type === 'SW_UPDATED') {
          setUpdateAvailable(true)
          setShowUpdatePrompt(true)
        }
      })

      // Listen for controlling service worker changes
      navigator.serviceWorker.addEventListener('controllerchange', () => {
        // Service worker has been updated and is now controlling the page
        setIsUpdating(false)
        setUpdateSuccess(true)
        setUpdateAvailable(false)
        setShowUpdatePrompt(false)
        
        // Auto-hide success message after 3 seconds
        setTimeout(() => {
          setUpdateSuccess(false)
        }, 3000)

        if (onUpdate) onUpdate()
      })
    }
  }, [onUpdate])

  const handleUpdate = async () => {
    if (!registration || !registration.waiting) return

    setIsUpdating(true)

    try {
      // Tell the waiting service worker to skip waiting and become active
      registration.waiting.postMessage({ type: 'SKIP_WAITING' })
      
      // The controllerchange event will handle the rest
    } catch (error) {
      console.error('Error updating service worker:', error)
      setIsUpdating(false)
    }
  }

  const handleDismiss = () => {
    setShowUpdatePrompt(false)
    setUpdateAvailable(false)
    if (onDismiss) onDismiss()
  }

  const handleRefreshPage = () => {
    window.location.reload()
  }

  // Success notification
  if (updateSuccess) {
    return (
      <div className={`fixed top-4 right-4 bg-green-600 text-white rounded-lg shadow-lg p-4 z-50 max-w-sm ${className}`}>
        <div className="flex items-center gap-3">
          <CheckCircle className="h-5 w-5 flex-shrink-0" />
          <div>
            <p className="font-medium">App Updated!</p>
            <p className="text-sm text-green-100">
              You&apos;re now using the latest version
            </p>
          </div>
        </div>
      </div>
    )
  }

  // Update prompt
  if (showUpdatePrompt && updateAvailable) {
    return (
      <div className={`fixed top-4 right-4 bg-white border border-gray-200 rounded-lg shadow-lg p-4 z-50 max-w-sm ${className}`}>
        <div className="flex items-start gap-3">
          <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
            <Download className="h-4 w-4 text-blue-600" />
          </div>
          <div className="flex-1">
            <h3 className="font-medium text-gray-900 mb-1">
              App Update Available
            </h3>
            <p className="text-sm text-gray-600 mb-3">
              A new version of MH Construction is ready with improvements and new features.
            </p>
            <div className="flex gap-2">
              <button
                onClick={handleUpdate}
                disabled={isUpdating}
                className="bg-blue-600 text-white px-3 py-2 rounded text-sm font-medium hover:bg-blue-700 transition-colors disabled:opacity-50 flex items-center gap-2"
              >
                {isUpdating ? (
                  <>
                    <RefreshCw className="h-3 w-3 animate-spin" />
                    Updating...
                  </>
                ) : (
                  <>
                    <Download className="h-3 w-3" />
                    Update
                  </>
                )}
              </button>
              <button
                onClick={handleDismiss}
                className="text-gray-500 px-3 py-2 rounded text-sm hover:text-gray-700 transition-colors"
              >
                Later
              </button>
            </div>
          </div>
          <button
            onClick={handleDismiss}
            className="text-gray-400 hover:text-gray-600 flex-shrink-0"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      </div>
    )
  }

  return null
}

// Service Worker Status Component
export function ServiceWorkerStatus() {
  const [isSupported, setIsSupported] = useState(false)
  const [isRegistered, setIsRegistered] = useState(false)
  const [isControlling, setIsControlling] = useState(false)
  const [cacheSize, setCacheSize] = useState<number | null>(null)

  useEffect(() => {
    if ('serviceWorker' in navigator) {
      setIsSupported(true)
      
      navigator.serviceWorker.ready.then((registration) => {
        setIsRegistered(!!registration)
        setIsControlling(!!navigator.serviceWorker.controller)
      })

      // Estimate cache size
      if ('storage' in navigator && 'estimate' in navigator.storage) {
        navigator.storage.estimate().then((estimate) => {
          if (estimate.usage) {
            setCacheSize(Math.round(estimate.usage / 1024 / 1024 * 100) / 100) // MB
          }
        })
      }
    }
  }, [])

  const clearCache = async () => {
    if ('serviceWorker' in navigator && 'caches' in window) {
      try {
        const cacheNames = await caches.keys()
        await Promise.all(
          cacheNames.map(cacheName => caches.delete(cacheName))
        )
        
        // Reload the page to re-register service worker
        window.location.reload()
      } catch (error) {
        console.error('Error clearing cache:', error)
      }
    }
  }

  return (
    <div className="bg-gray-50 rounded-lg p-4">
      <h4 className="font-medium text-gray-900 mb-3">App Status</h4>
      
      <div className="space-y-2 text-sm">
        <div className="flex items-center justify-between">
          <span className="text-gray-600">Service Worker:</span>
          <span className={`flex items-center gap-1 ${isSupported && isRegistered ? 'text-green-600' : 'text-gray-500'}`}>
            <div className={`w-2 h-2 rounded-full ${isSupported && isRegistered ? 'bg-green-500' : 'bg-gray-400'}`}></div>
            {isSupported && isRegistered ? 'Active' : 'Inactive'}
          </span>
        </div>
        
        <div className="flex items-center justify-between">
          <span className="text-gray-600">Offline Ready:</span>
          <span className={`flex items-center gap-1 ${isControlling ? 'text-green-600' : 'text-gray-500'}`}>
            <div className={`w-2 h-2 rounded-full ${isControlling ? 'bg-green-500' : 'bg-gray-400'}`}></div>
            {isControlling ? 'Yes' : 'No'}
          </span>
        </div>
        
        {cacheSize !== null && (
          <div className="flex items-center justify-between">
            <span className="text-gray-600">Cache Size:</span>
            <span className="text-gray-900">{cacheSize} MB</span>
          </div>
        )}
      </div>
      
      <div className="mt-4 pt-4 border-t border-gray-200">
        <button
          onClick={clearCache}
          className="text-red-600 text-sm hover:text-red-700 transition-colors flex items-center gap-1"
        >
          <RefreshCw className="h-3 w-3" />
          Clear Cache & Reload
        </button>
      </div>
    </div>
  )
}

// Network Status Component
export function NetworkStatus() {
  const [isOnline, setIsOnline] = useState(true)
  const [connectionType, setConnectionType] = useState<string>('unknown')

  useEffect(() => {
    setIsOnline(navigator.onLine)

    // Get connection info if available
    const connection = (navigator as any).connection || (navigator as any).mozConnection || (navigator as any).webkitConnection
    if (connection) {
      setConnectionType(connection.effectiveType || connection.type || 'unknown')
      
      connection.addEventListener('change', () => {
        setConnectionType(connection.effectiveType || connection.type || 'unknown')
      })
    }

    const handleOnline = () => setIsOnline(true)
    const handleOffline = () => setIsOnline(false)

    window.addEventListener('online', handleOnline)
    window.addEventListener('offline', handleOffline)

    return () => {
      window.removeEventListener('online', handleOnline)
      window.removeEventListener('offline', handleOffline)
    }
  }, [])

  return (
    <div className="bg-gray-50 rounded-lg p-4">
      <h4 className="font-medium text-gray-900 mb-3">Connection Status</h4>
      
      <div className="space-y-2 text-sm">
        <div className="flex items-center justify-between">
          <span className="text-gray-600">Status:</span>
          <span className={`flex items-center gap-1 ${isOnline ? 'text-green-600' : 'text-red-600'}`}>
            <div className={`w-2 h-2 rounded-full ${isOnline ? 'bg-green-500' : 'bg-red-500'}`}></div>
            {isOnline ? 'Online' : 'Offline'}
          </span>
        </div>
        
        {connectionType !== 'unknown' && (
          <div className="flex items-center justify-between">
            <span className="text-gray-600">Connection:</span>
            <span className="text-gray-900 capitalize">{connectionType}</span>
          </div>
        )}
      </div>
      
      {!isOnline && (
        <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
          <div className="flex items-start gap-2">
            <AlertCircle className="h-4 w-4 text-yellow-600 mt-0.5 flex-shrink-0" />
            <p className="text-xs text-yellow-800">
              You&apos;re offline. Some features may be limited, but cached content is still available.
            </p>
          </div>
        </div>
      )}
    </div>
  )
}