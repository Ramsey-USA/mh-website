/**
 * PWA Provider - Centralized PWA functionality for MH Construction
 * Integrates installation, notifications, offline storage, and mobile optimizations
 */

'use client'

import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
  useCallback,
} from 'react'
import { toast } from 'sonner'
import { getPWAStatus, AppBadge } from '@/lib/pwa/manifest'
import {
  pushNotifications,
  usePushNotifications,
} from '@/lib/pwa/notifications'
import { offlineDataManager } from '@/lib/pwa/offline-manager'
import { useViewport, HapticFeedback } from '@/lib/pwa/mobile-utils'

export interface PWAContextType {
  // Installation
  isInstalled: boolean
  isInstallable: boolean
  installApp: () => Promise<boolean>

  // Notifications
  notificationsEnabled: boolean
  enableNotifications: () => Promise<boolean>
  disableNotifications: () => Promise<boolean>

  // Offline
  isOnline: boolean
  pendingSync: {
    estimates: number
    contactForms: number
    analytics: number
    total: number
  }
  syncNow: () => Promise<boolean>

  // Mobile
  viewport: ReturnType<typeof useViewport>
  haptic: typeof HapticFeedback

  // Analytics
  trackEvent: (event: string, data?: any) => Promise<void>

  // Utilities
  showAppBadge: (count: number) => Promise<void>
  clearAppBadge: () => Promise<void>
  shareContent: (content: {
    title: string
    text: string
    url: string
  }) => Promise<boolean>
}

const PWAContext = createContext<PWAContextType | null>(null)

interface PWAProviderProps {
  children: ReactNode
  enableAutoSync?: boolean
  enableNotifications?: boolean
  enableAnalytics?: boolean
}

export function PWAProvider({
  children,
  enableAutoSync = true,
  enableNotifications = true,
  enableAnalytics = true,
}: PWAProviderProps) {
  // Installation state
  const [isInstalled, setIsInstalled] = useState(false)
  const [isInstallable, setIsInstallable] = useState(false)
  const [installPrompt, setInstallPrompt] = useState<any>(null)

  // Notifications
  const {
    isSupported: notificationsSupported,
    permission: notificationPermission,
    isSubscribed: notificationsSubscribed,
    subscribe: subscribeToNotifications,
    unsubscribe: unsubscribeFromNotifications,
  } = usePushNotifications()

  // Network state
  const [isOnline, setIsOnline] = useState(true)
  const [pendingSync, setPendingSync] = useState({
    estimates: 0,
    contactForms: 0,
    analytics: 0,
    total: 0,
  })

  // Mobile utilities
  const viewport = useViewport()

  // Define callbacks first
  const syncNow = useCallback(async (): Promise<boolean> => {
    if (!isOnline) {
      toast.warning('Cannot sync while offline')
      return false
    }

    try {
      const result = await offlineDataManager.syncAll()

      if (result.success) {
        toast.success(`Synced ${result.synced.length} items`, {
          description: 'All your data is up to date.',
        })
        HapticFeedback.success()

        // Update pending sync count
        const pending = await offlineDataManager.getPendingSync()
        setPendingSync(pending)

        if (pending.total === 0) {
          await AppBadge.clear()
        }

        return true
      } else {
        toast.warning(`Sync completed with issues`, {
          description: `${result.synced.length} synced, ${result.failed.length} failed, ${result.conflicts.length} conflicts`,
        })
        return false
      }
    } catch (error) {
      console.error('Sync failed:', error)
      toast.error('Sync failed', {
        description: 'Please check your connection and try again.',
      })
      HapticFeedback.error()
      return false
    }
  }, [isOnline])

  const trackEvent = useCallback(
    async (event: string, data?: any): Promise<void> => {
      if (!enableAnalytics) return

      try {
        await offlineDataManager.trackAnalytics({
          eventType: event,
          timestamp: Date.now(),
          url: window.location.href,
          userAgent: navigator.userAgent,
          viewport: {
            width: viewport.width,
            height: viewport.height,
            isMobile: viewport.isMobile,
          },
          ...data,
        })
      } catch (error) {
        console.error('Failed to track event:', error)
      }
    },
    [enableAnalytics, viewport.width, viewport.height, viewport.isMobile]
  )

  // Initialize PWA functionality
  useEffect(() => {
    const initializePWA = async () => {
      try {
        // Initialize offline storage
        await offlineDataManager.initialize()

        // Check PWA status
        const status = getPWAStatus()
        setIsInstalled(status.isInstalled)
        setIsInstallable(status.isInstallable)

        // Initialize push notifications if enabled
        if (enableNotifications) {
          await pushNotifications.initialize()
        }

        console.log('PWA initialized successfully')
      } catch (error) {
        console.error('Failed to initialize PWA:', error)
      }
    }

    initializePWA()
  }, [enableNotifications])

  // Network status monitoring
  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true)
      toast.success('Back online! Syncing data...', {
        id: 'network-status',
      })
      if (enableAutoSync) {
        syncNow()
      }
    }

    const handleOffline = () => {
      setIsOnline(false)
      toast.warning("You're offline. Data will sync when reconnected.", {
        id: 'network-status',
        duration: 5000,
      })
    }

    setIsOnline(navigator.onLine)
    window.addEventListener('online', handleOnline)
    window.addEventListener('offline', handleOffline)

    return () => {
      window.removeEventListener('online', handleOnline)
      window.removeEventListener('offline', handleOffline)
    }
  }, [enableAutoSync, syncNow])

  // Install prompt handling
  useEffect(() => {
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault()
      setInstallPrompt(e)
      setIsInstallable(true)
    }

    const handleAppInstalled = () => {
      setIsInstalled(true)
      setIsInstallable(false)
      setInstallPrompt(null)

      toast.success('MH Construction app installed!', {
        description: 'You can now access the app from your home screen.',
        duration: 5000,
      })

      if (enableAnalytics) {
        trackEvent('pwa_installed', {
          timestamp: Date.now(),
          userAgent: navigator.userAgent,
        })
      }
    }

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt)
    window.addEventListener('appinstalled', handleAppInstalled)

    return () => {
      window.removeEventListener(
        'beforeinstallprompt',
        handleBeforeInstallPrompt
      )
      window.removeEventListener('appinstalled', handleAppInstalled)
    }
  }, [enableAnalytics, trackEvent])

  // Update pending sync count
  useEffect(() => {
    const updatePendingSync = async () => {
      try {
        const pending = await offlineDataManager.getPendingSync()
        setPendingSync(pending)

        // Update app badge
        if (pending.total > 0) {
          await AppBadge.set(pending.total)
        } else {
          await AppBadge.clear()
        }
      } catch (error) {
        console.error('Failed to update pending sync:', error)
      }
    }

    updatePendingSync()

    // Update every 30 seconds
    const interval = setInterval(updatePendingSync, 30000)

    return () => clearInterval(interval)
  }, [])

  const initializePWA = async () => {
    try {
      // Initialize offline storage
      await offlineDataManager.initialize()

      // Check PWA status
      const status = getPWAStatus()
      setIsInstalled(status.isInstalled)
      setIsInstallable(status.isInstallable)

      // Initialize push notifications if enabled
      if (enableNotifications) {
        await pushNotifications.initialize()
      }

      console.log('PWA initialized successfully')
    } catch (error) {
      console.error('Failed to initialize PWA:', error)
    }
  }

  const installApp = async (): Promise<boolean> => {
    if (!installPrompt) return false

    try {
      await installPrompt.prompt()
      const { outcome } = await installPrompt.userChoice

      if (outcome === 'accepted') {
        HapticFeedback.success()
        return true
      } else {
        HapticFeedback.light()
        return false
      }
    } catch (error) {
      console.error('App installation failed:', error)
      HapticFeedback.error()
      return false
    }
  }

  const enablePushNotifications = async (): Promise<boolean> => {
    if (!notificationsSupported) {
      toast.error('Notifications not supported on this device')
      return false
    }

    try {
      const success = await subscribeToNotifications()

      if (success) {
        toast.success('Notifications enabled!', {
          description:
            "You'll receive updates about your estimates and appointments.",
        })
        HapticFeedback.success()

        if (enableAnalytics) {
          trackEvent('notifications_enabled')
        }
      } else {
        toast.error('Failed to enable notifications')
        HapticFeedback.error()
      }

      return success
    } catch (error) {
      console.error('Failed to enable notifications:', error)
      toast.error('Failed to enable notifications')
      HapticFeedback.error()
      return false
    }
  }

  const disableNotifications = async (): Promise<boolean> => {
    try {
      const success = await unsubscribeFromNotifications()

      if (success) {
        toast.success('Notifications disabled')
        HapticFeedback.light()

        if (enableAnalytics) {
          trackEvent('notifications_disabled')
        }
      }

      return success
    } catch (error) {
      console.error('Failed to disable notifications:', error)
      return false
    }
  }

  const showAppBadge = async (count: number): Promise<void> => {
    await AppBadge.set(count)
  }

  const clearAppBadge = async (): Promise<void> => {
    await AppBadge.clear()
  }

  const shareContent = async (content: {
    title: string
    text: string
    url: string
  }): Promise<boolean> => {
    if ('share' in navigator) {
      try {
        await navigator.share(content)
        HapticFeedback.success()

        if (enableAnalytics) {
          trackEvent('content_shared', {
            title: content.title,
            url: content.url,
          })
        }

        return true
      } catch (error) {
        if ((error as Error).name !== 'AbortError') {
          console.error('Web share failed:', error)
        }
        return false
      }
    } else {
      // Fallback to clipboard
      try {
        if ('clipboard' in navigator) {
          await (navigator as any).clipboard.writeText(content.url)
          toast.success('Link copied to clipboard!')
          HapticFeedback.success()
          return true
        } else {
          return false
        }
      } catch (error) {
        console.error('Clipboard write failed:', error)
        return false
      }
    }
  }

  const contextValue: PWAContextType = {
    // Installation
    isInstalled,
    isInstallable,
    installApp,

    // Notifications
    notificationsEnabled: notificationsSubscribed,
    enableNotifications: enablePushNotifications,
    disableNotifications,

    // Offline
    isOnline,
    pendingSync,
    syncNow,

    // Mobile
    viewport,
    haptic: HapticFeedback,

    // Analytics
    trackEvent,

    // Utilities
    showAppBadge,
    clearAppBadge,
    shareContent,
  }

  return (
    <PWAContext.Provider value={contextValue}>{children}</PWAContext.Provider>
  )
}

export function usePWA(): PWAContextType {
  const context = useContext(PWAContext)
  if (!context) {
    throw new Error('usePWA must be used within a PWAProvider')
  }
  return context
}

/**
 * PWA Status Component - Shows current PWA status
 */
export function PWAStatus() {
  const {
    isInstalled,
    isInstallable,
    notificationsEnabled,
    isOnline,
    pendingSync,
  } = usePWA()

  return (
    <div className="flex items-center space-x-4 text-muted-foreground text-sm">
      {/* Installation Status */}
      <div className="flex items-center space-x-1">
        <div
          className={`w-2 h-2 rounded-full ${
            isInstalled
              ? 'bg-green-500'
              : isInstallable
                ? 'bg-yellow-500'
                : 'bg-gray-500'
          }`}
        />
        <span>
          {isInstalled
            ? 'Installed'
            : isInstallable
              ? 'Installable'
              : 'Web App'}
        </span>
      </div>

      {/* Notification Status */}
      <div className="flex items-center space-x-1">
        <div
          className={`w-2 h-2 rounded-full ${
            notificationsEnabled ? 'bg-blue-500' : 'bg-gray-500'
          }`}
        />
        <span>
          {notificationsEnabled ? 'Notifications On' : 'Notifications Off'}
        </span>
      </div>

      {/* Network Status */}
      <div className="flex items-center space-x-1">
        <div
          className={`w-2 h-2 rounded-full ${
            isOnline ? 'bg-green-500' : 'bg-red-500'
          }`}
        />
        <span>{isOnline ? 'Online' : 'Offline'}</span>
      </div>

      {/* Sync Status */}
      {pendingSync.total > 0 && (
        <div className="flex items-center space-x-1">
          <div className="bg-orange-500 rounded-full w-2 h-2 animate-pulse" />
          <span>{pendingSync.total} pending sync</span>
        </div>
      )}
    </div>
  )
}

/**
 * PWA Install Button Component
 */
export function PWAInstallButton({ className = '' }: { className?: string }) {
  const { isInstallable, installApp, trackEvent } = usePWA()

  if (!isInstallable) return null

  const handleInstall = async () => {
    await trackEvent('pwa_install_clicked')
    await installApp()
  }

  return (
    <button
      onClick={handleInstall}
      className={`inline-flex items-center px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors ${className}`}
    >
      <svg
        className="mr-2 w-4 h-4"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
        />
      </svg>
      Install App
    </button>
  )
}

/**
 * PWA Sync Button Component
 */
export function PWASyncButton({ className = '' }: { className?: string }) {
  const { isOnline, pendingSync, syncNow } = usePWA()
  const [isSyncing, setIsSyncing] = useState(false)

  const handleSync = async () => {
    setIsSyncing(true)
    await syncNow()
    setIsSyncing(false)
  }

  if (!isOnline || pendingSync.total === 0) return null

  return (
    <button
      onClick={handleSync}
      disabled={isSyncing}
      className={`inline-flex items-center px-3 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600 transition-colors disabled:opacity-50 ${className}`}
    >
      <svg
        className={`w-4 h-4 mr-2 ${isSyncing ? 'animate-spin' : ''}`}
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
        />
      </svg>
      {isSyncing ? 'Syncing...' : `Sync ${pendingSync.total}`}
    </button>
  )
}
