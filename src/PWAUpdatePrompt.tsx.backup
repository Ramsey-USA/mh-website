'use client'

import { useState, useEffect } from 'react'
import { MaterialIcon } from '@/components/icons/MaterialIcon'

interface PWAUpdatePromptProps {
  className?: string
}

export default function PWAUpdatePrompt({
  className = '',
}: PWAUpdatePromptProps) {
  const [updateAvailable, setUpdateAvailable] = useState(false)
  const [isUpdating, setIsUpdating] = useState(false)
  const [registration, setRegistration] =
    useState<ServiceWorkerRegistration | null>(null)

  useEffect(() => {
    if ('serviceWorker' in navigator) {
      // Register service worker
      navigator.serviceWorker
        .register('/sw.js')
        .then(reg => {
          console.log('[PWA] Service worker registered:', reg)
          setRegistration(reg)

          // Check for updates periodically
          setInterval(() => {
            reg.update()
          }, 60000) // Check every minute

          // Listen for updates
          reg.addEventListener('updatefound', () => {
            console.log('[PWA] Update found')
            const newWorker = reg.installing

            if (newWorker) {
              newWorker.addEventListener('statechange', () => {
                if (
                  newWorker.state === 'installed' &&
                  navigator.serviceWorker.controller
                ) {
                  console.log('[PWA] New content available')
                  setUpdateAvailable(true)
                }
              })
            }
          })
        })
        .catch(error => {
          console.error('[PWA] Service worker registration failed:', error)
        })

      // Listen for service worker messages
      navigator.serviceWorker.addEventListener('message', event => {
        if (event.data && event.data.type === 'UPDATE_AVAILABLE') {
          setUpdateAvailable(true)
        }
      })

      // Listen for service worker controller change
      navigator.serviceWorker.addEventListener('controllerchange', () => {
        console.log('[PWA] New service worker activated')
        window.location.reload()
      })
    }
  }, [])

  const handleUpdate = async () => {
    if (!registration || !registration.waiting) {
      return
    }

    setIsUpdating(true)

    try {
      // Tell the waiting service worker to skip waiting
      registration.waiting.postMessage({ type: 'SKIP_WAITING' })

      // The page will reload automatically when the new SW takes control
    } catch (error) {
      console.error('[PWA] Update failed:', error)
      setIsUpdating(false)
    }
  }

  const handleDismiss = () => {
    setUpdateAvailable(false)
    // Store dismissal to avoid showing again for this session
    sessionStorage.setItem('pwa-update-dismissed', 'true')
  }

  // Don't show if dismissed in this session
  if (sessionStorage.getItem('pwa-update-dismissed')) {
    return null
  }

  if (!updateAvailable) {
    return null
  }

  return (
    <div
      className={`fixed top-4 right-4 z-50 bg-white border border-gray-200 rounded-lg shadow-lg p-4 max-w-sm ${className}`}
    >
      <div className="flex items-start gap-3">
        <div className="flex-shrink-0 bg-green-100 p-2 rounded-lg">
          <MaterialIcon icon="download" className="w-5 h-5 text-green-600" />
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex justify-between items-center mb-2">
            <h3 className="font-semibold text-gray-900 text-sm">
              Update Available
            </h3>
            <button
              onClick={() => setUpdateAvailable(false)}
              className="text-gray-400 hover:text-gray-600"
              aria-label="Dismiss"
            >
              <MaterialIcon icon="close" className="w-4 h-4" />
            </button>
          </div>

          <p className="mb-3 text-gray-600 text-sm">
            A new version of MH Construction is available with improvements and
            bug fixes.
          </p>

          <div className="flex gap-2">
            <button
              onClick={handleUpdate}
              disabled={isUpdating}
              className="flex items-center gap-1 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 px-3 py-1.5 rounded font-semibold text-white text-sm transition-colors disabled:cursor-not-allowed"
            >
              {isUpdating ? (
                <>
                  <MaterialIcon
                    icon="refresh"
                    className="w-3 h-3 animate-spin"
                  />
                  Updating...
                </>
              ) : (
                <>
                  <MaterialIcon icon="refresh" className="w-3 h-3" />
                  Update
                </>
              )}
            </button>

            <button
              onClick={handleDismiss}
              className="bg-gray-200 hover:bg-gray-300 px-3 py-1.5 rounded font-semibold text-gray-800 text-sm transition-colors"
            >
              Later
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

// Hook for managing PWA features
export function usePWA() {
  const [isInstalled, setIsInstalled] = useState(false)
  const [isOnline, setIsOnline] = useState(true)
  const [installPrompt, setInstallPrompt] = useState<any>(null)

  useEffect(() => {
    // Check if PWA is installed
    const checkInstalled = () => {
      return (
        window.matchMedia('(display-mode: standalone)').matches ||
        (window.navigator as any).standalone
      )
    }

    // Check online status
    const updateOnlineStatus = () => {
      setIsOnline(navigator.onLine)
    }

    // Listen for install prompt
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault()
      setInstallPrompt(e)
    }

    // Listen for app installed
    const handleAppInstalled = () => {
      setIsInstalled(true)
      setInstallPrompt(null)
    }

    // Initial checks
    setIsInstalled(checkInstalled())
    updateOnlineStatus()

    // Event listeners
    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt)
    window.addEventListener('appinstalled', handleAppInstalled)
    window.addEventListener('online', updateOnlineStatus)
    window.addEventListener('offline', updateOnlineStatus)

    return () => {
      window.removeEventListener(
        'beforeinstallprompt',
        handleBeforeInstallPrompt
      )
      window.removeEventListener('appinstalled', handleAppInstalled)
      window.removeEventListener('online', updateOnlineStatus)
      window.removeEventListener('offline', updateOnlineStatus)
    }
  }, [])

  const installApp = async () => {
    if (!installPrompt) return false

    try {
      installPrompt.prompt()
      const { outcome } = await installPrompt.userChoice

      if (outcome === 'accepted') {
        setInstallPrompt(null)
        return true
      }
    } catch (error) {
      console.error('[PWA] Install error:', error)
    }

    return false
  }

  return {
    isInstalled,
    isOnline,
    canInstall: !!installPrompt,
    installApp,
  }
}

// Component for offline indicator
export function OfflineIndicator() {
  const { isOnline } = usePWA()

  if (isOnline) return null

  return (
    <div className="top-0 right-0 left-0 z-50 fixed bg-yellow-500 p-2 font-medium text-white text-sm text-center">
      <div className="flex justify-center items-center gap-2">
        <MaterialIcon icon="warning" className="w-4 h-4" />
        You are currently offline. Some features may be limited.
      </div>
    </div>
  )
}
