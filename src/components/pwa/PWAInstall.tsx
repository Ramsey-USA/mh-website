'use client'

import { useState, useEffect } from 'react'
import { MaterialIcon } from '@/components/icons/MaterialIcon'

interface BeforeInstallPromptEvent extends Event {
  readonly platforms: string[]
  readonly userChoice: Promise<{
    outcome: 'accepted' | 'dismissed'
    platform: string
  }>
  prompt(): Promise<void>
}

interface PWAInstallProps {
  onInstall?: () => void
  onDismiss?: () => void
  className?: string
}

export default function PWAInstall({
  onInstall,
  onDismiss,
  className = '',
}: PWAInstallProps) {
  const [deferredPrompt, setDeferredPrompt] =
    useState<BeforeInstallPromptEvent | null>(null)
  const [isInstallable, setIsInstallable] = useState(false)
  const [isInstalled, setIsInstalled] = useState(false)
  const [showPrompt, setShowPrompt] = useState(false)
  const [isIOS, setIsIOS] = useState(false)
  const [isStandalone, setIsStandalone] = useState(false)

  useEffect(() => {
    // Check if running on iOS
    const iOS = /iPad|iPhone|iPod/.test(navigator.userAgent)
    setIsIOS(iOS)

    // Check if app is already installed (running in standalone mode)
    const standalone =
      window.matchMedia('(display-mode: standalone)').matches ||
      (window.navigator as any).standalone ||
      document.referrer.includes('android-app://')
    setIsStandalone(standalone)

    // Listen for the beforeinstallprompt event
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault()
      const beforeInstallPromptEvent = e as BeforeInstallPromptEvent
      setDeferredPrompt(beforeInstallPromptEvent)
      setIsInstallable(true)

      // Show prompt after a delay if not dismissed
      setTimeout(() => {
        const dismissed = localStorage.getItem('pwa-install-dismissed')
        if (
          !dismissed ||
          Date.now() - parseInt(dismissed) > 7 * 24 * 60 * 60 * 1000
        ) {
          // 7 days
          setShowPrompt(true)
        }
      }, 5000) // Show after 5 seconds
    }

    // Listen for successful installation
    const handleAppInstalled = () => {
      console.log('PWA was installed')
      setIsInstalled(true)
      setShowPrompt(false)
      setIsInstallable(false)
      if (onInstall) onInstall()
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
  }, [onInstall])

  const handleInstallClick = async () => {
    if (!deferredPrompt) return

    try {
      await deferredPrompt.prompt()
      const { outcome } = await deferredPrompt.userChoice

      if (outcome === 'accepted') {
        console.log('User accepted the install prompt')
        setIsInstalled(true)
      } else {
        console.log('User dismissed the install prompt')
        localStorage.setItem('pwa-install-dismissed', Date.now().toString())
      }

      setDeferredPrompt(null)
      setShowPrompt(false)
      setIsInstallable(false)
    } catch (error) {
      console.error('Error during PWA installation:', error)
    }
  }

  const handleDismiss = () => {
    setShowPrompt(false)
    localStorage.setItem('pwa-install-dismissed', Date.now().toString())
    if (onDismiss) onDismiss()
  }

  const handleIOSInstallInstructions = () => {
    setShowPrompt(true)
  }

  // Don't show if already installed or in standalone mode
  if (isInstalled || isStandalone) {
    return null
  }

  // iOS Install Instructions Modal
  if (isIOS && showPrompt) {
    return (
      <div className="z-50 fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 p-4">
        <div className="bg-white shadow-xl p-6 rounded-lg w-full max-w-sm">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-semibold text-gray-900 text-lg">
              Install MH Construction
            </h3>
            <button
              onClick={handleDismiss}
              className="text-gray-400 hover:text-gray-600"
            >
              <MaterialIcon icon="close" className="w-5 h-5" />
            </button>
          </div>

          <div className="space-y-4">
            <p className="text-gray-600 text-sm">
              Install our app for quick access and offline capabilities:
            </p>

            <div className="space-y-3">
              <div className="flex items-start gap-3 bg-blue-50 p-3 rounded-lg">
                <div className="flex flex-shrink-0 justify-center items-center bg-blue-600 mt-0.5 rounded-full w-6 h-6 font-bold text-white text-xs">
                  1
                </div>
                <p className="text-gray-700 text-sm">
                  Tap the <strong>Share</strong> button in Safari
                </p>
              </div>

              <div className="flex items-start gap-3 bg-blue-50 p-3 rounded-lg">
                <div className="flex flex-shrink-0 justify-center items-center bg-blue-600 mt-0.5 rounded-full w-6 h-6 font-bold text-white text-xs">
                  2
                </div>
                <p className="text-gray-700 text-sm">
                  Scroll down and tap <strong>"Add to Home Screen"</strong>
                </p>
              </div>

              <div className="flex items-start gap-3 bg-blue-50 p-3 rounded-lg">
                <div className="flex flex-shrink-0 justify-center items-center bg-blue-600 mt-0.5 rounded-full w-6 h-6 font-bold text-white text-xs">
                  3
                </div>
                <p className="text-gray-700 text-sm">
                  Tap <strong>"Add"</strong> to install the app
                </p>
              </div>
            </div>

            <div className="text-center">
              <button
                onClick={handleDismiss}
                className="text-gray-500 hover:text-gray-700 text-sm"
              >
                Maybe later
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // Install Prompt Banner
  if (showPrompt && (isInstallable || isIOS)) {
    return (
      <div
        className={`fixed bottom-0 left-0 right-0 bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg z-40 ${className}`}
      >
        <div className="mx-auto px-4 py-4 container">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-4">
              <div className="flex flex-shrink-0 justify-center items-center bg-white/20 rounded-lg w-12 h-12">
                <MaterialIcon icon="phone_android" className="w-6 h-6" />
              </div>
              <div>
                <h3 className="mb-1 font-semibold text-white">
                  Install MH Construction App
                </h3>
                <p className="text-blue-100 text-sm">
                  Get quick access and offline capabilities
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={
                  isIOS ? handleIOSInstallInstructions : handleInstallClick
                }
                className="flex items-center gap-2 bg-white hover:bg-gray-100 px-4 py-2 rounded-lg font-medium text-blue-600 transition-colors"
              >
                <MaterialIcon icon="download" className="w-4 h-4" />
                Install
              </button>
              <button
                onClick={handleDismiss}
                className="p-2 text-white hover:text-blue-200"
              >
                <MaterialIcon icon="close" className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // Install Button Component (can be used anywhere)
  if (isInstallable && !showPrompt) {
    return (
      <button
        onClick={handleInstallClick}
        className={`inline-flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium ${className}`}
      >
        <MaterialIcon icon="download" className="w-4 h-4" />
        Install App
      </button>
    )
  }

  // iOS Install Button
  if (isIOS && !showPrompt) {
    return (
      <button
        onClick={handleIOSInstallInstructions}
        className={`inline-flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium ${className}`}
      >
        <MaterialIcon icon="download" className="w-4 h-4" />
        Install App
      </button>
    )
  }

  return null
}

// PWA Features Showcase Component
export function PWAFeatures() {
  return (
    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-lg">
      <h3 className="mb-4 font-semibold text-gray-900 text-xl text-center">
        Why Install Our App?
      </h3>

      <div className="gap-6 grid grid-cols-1 md:grid-cols-3">
        <div className="text-center">
          <div className="flex justify-center items-center bg-blue-100 mx-auto mb-3 rounded-lg w-12 h-12">
            <MaterialIcon icon="bolt" className="w-6 h-6 text-blue-600" />
          </div>
          <h4 className="mb-2 font-medium text-gray-900">Instant Access</h4>
          <p className="text-gray-600 text-sm">
            Quick access from your home screen without opening a browser
          </p>
        </div>

        <div className="text-center">
          <div className="flex justify-center items-center bg-green-100 mx-auto mb-3 rounded-lg w-12 h-12">
            <MaterialIcon icon="wifi" className="w-6 h-6 text-green-600" />
          </div>
          <h4 className="mb-2 font-medium text-gray-900">Offline Access</h4>
          <p className="text-gray-600 text-sm">
            Browse services and access tools even without an internet connection
          </p>
        </div>

        <div className="text-center">
          <div className="flex justify-center items-center bg-purple-100 mx-auto mb-3 rounded-lg w-12 h-12">
            <MaterialIcon icon="computer" className="w-6 h-6 text-purple-600" />
          </div>
          <h4 className="mb-2 font-medium text-gray-900">Native Experience</h4>
          <p className="text-gray-600 text-sm">
            App-like experience with smooth animations and native device
            features
          </p>
        </div>
      </div>
    </div>
  )
}
