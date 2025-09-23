'use client'

import { useState, useEffect } from 'react'
import { Download, X, Smartphone, Monitor, Zap, Wifi } from 'lucide-react'

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
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-lg shadow-xl max-w-sm w-full p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-gray-900">
              Install MH Construction
            </h3>
            <button
              onClick={handleDismiss}
              className="text-gray-400 hover:text-gray-600"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <div className="space-y-4">
            <p className="text-gray-600 text-sm">
              Install our app for quick access and offline capabilities:
            </p>

            <div className="space-y-3">
              <div className="flex items-start gap-3 p-3 bg-blue-50 rounded-lg">
                <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">
                  1
                </div>
                <p className="text-sm text-gray-700">
                  Tap the <strong>Share</strong> button in Safari
                </p>
              </div>

              <div className="flex items-start gap-3 p-3 bg-blue-50 rounded-lg">
                <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">
                  2
                </div>
                <p className="text-sm text-gray-700">
                  Scroll down and tap <strong>"Add to Home Screen"</strong>
                </p>
              </div>

              <div className="flex items-start gap-3 p-3 bg-blue-50 rounded-lg">
                <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">
                  3
                </div>
                <p className="text-sm text-gray-700">
                  Tap <strong>"Add"</strong> to install the app
                </p>
              </div>
            </div>

            <div className="text-center">
              <button
                onClick={handleDismiss}
                className="text-gray-500 text-sm hover:text-gray-700"
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
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center flex-shrink-0">
                <Smartphone className="h-6 w-6" />
              </div>
              <div>
                <h3 className="font-semibold text-white mb-1">
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
                className="bg-white text-blue-600 px-4 py-2 rounded-lg font-medium hover:bg-gray-100 transition-colors flex items-center gap-2"
              >
                <Download className="h-4 w-4" />
                Install
              </button>
              <button
                onClick={handleDismiss}
                className="text-white hover:text-blue-200 p-2"
              >
                <X className="h-5 w-5" />
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
        <Download className="h-4 w-4" />
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
        <Download className="h-4 w-4" />
        Install App
      </button>
    )
  }

  return null
}

// PWA Features Showcase Component
export function PWAFeatures() {
  return (
    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-6">
      <h3 className="text-xl font-semibold text-gray-900 mb-4 text-center">
        Why Install Our App?
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="text-center">
          <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-3">
            <Zap className="h-6 w-6 text-blue-600" />
          </div>
          <h4 className="font-medium text-gray-900 mb-2">Instant Access</h4>
          <p className="text-sm text-gray-600">
            Quick access from your home screen without opening a browser
          </p>
        </div>

        <div className="text-center">
          <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-3">
            <Wifi className="h-6 w-6 text-green-600" />
          </div>
          <h4 className="font-medium text-gray-900 mb-2">Offline Access</h4>
          <p className="text-sm text-gray-600">
            Browse services and access tools even without an internet connection
          </p>
        </div>

        <div className="text-center">
          <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-3">
            <Monitor className="h-6 w-6 text-purple-600" />
          </div>
          <h4 className="font-medium text-gray-900 mb-2">Native Experience</h4>
          <p className="text-sm text-gray-600">
            App-like experience with smooth animations and native device
            features
          </p>
        </div>
      </div>
    </div>
  )
}
