'use client'

import { useState, useEffect } from 'react'
import { MaterialIcon } from '@/components/icons/MaterialIcon'

interface PWAInstallPromptProps {
  className?: string
  variant?: 'banner' | 'card' | 'modal'
  showOnMobile?: boolean
  showOnDesktop?: boolean
}

export default function PWAInstallPrompt({
  className = '',
  variant = 'banner',
  showOnMobile = true,
  showOnDesktop = true,
}: PWAInstallPromptProps) {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null)
  const [isVisible, setIsVisible] = useState(false)
  const [isInstalled, setIsInstalled] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const [isIOS, setIsIOS] = useState(false)

  useEffect(() => {
    // Check if PWA is already installed
    const checkIfInstalled = () => {
      if (
        window.matchMedia('(display-mode: standalone)').matches ||
        (window.navigator as any).standalone
      ) {
        setIsInstalled(true)
        return
      }
    }

    // Detect mobile and iOS
    const checkDevice = () => {
      const userAgent = window.navigator.userAgent.toLowerCase()
      const mobile =
        /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(
          userAgent
        )
      const ios = /iphone|ipad|ipod/i.test(userAgent)

      setIsMobile(mobile)
      setIsIOS(ios)
    }

    // Check if user has dismissed the prompt recently
    const checkDismissed = () => {
      const dismissed = localStorage.getItem('pwa-install-dismissed')
      const dismissedTime = dismissed ? parseInt(dismissed) : 0
      const dayInMs = 24 * 60 * 60 * 1000

      // Show again after 7 days
      return Date.now() - dismissedTime < 7 * dayInMs
    }

    checkIfInstalled()
    checkDevice()

    if (isInstalled || checkDismissed()) {
      return
    }

    // Listen for the beforeinstallprompt event
    const handleBeforeInstallPrompt = (e: Event) => {
      console.log('[PWA] Install prompt event triggered')
      e.preventDefault()
      setDeferredPrompt(e)

      // Show install prompt based on device preferences
      if ((isMobile && showOnMobile) || (!isMobile && showOnDesktop)) {
        setIsVisible(true)
      }
    }

    // Listen for app installed event
    const handleAppInstalled = () => {
      console.log('[PWA] App was installed')
      setIsInstalled(true)
      setIsVisible(false)
      setDeferredPrompt(null)
    }

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt)
    window.addEventListener('appinstalled', handleAppInstalled)

    // For iOS, show manual install instructions
    if (isIOS && !isInstalled && !checkDismissed()) {
      setTimeout(() => {
        if (showOnMobile) {
          setIsVisible(true)
        }
      }, 3000) // Show after 3 seconds on iOS
    }

    return () => {
      window.removeEventListener(
        'beforeinstallprompt',
        handleBeforeInstallPrompt
      )
      window.removeEventListener('appinstalled', handleAppInstalled)
    }
  }, [showOnMobile, showOnDesktop, isMobile, isInstalled, isIOS])

  const handleInstallClick = async () => {
    if (!deferredPrompt) {
      if (isIOS) {
        // Show iOS install instructions
        setIsVisible(true)
        return
      }
      return
    }

    try {
      // Show the install prompt
      deferredPrompt.prompt()

      // Wait for the user to respond to the prompt
      const { outcome } = await deferredPrompt.userChoice

      console.log('[PWA] User choice:', outcome)

      if (outcome === 'accepted') {
        console.log('[PWA] User accepted the install prompt')
      } else {
        console.log('[PWA] User dismissed the install prompt')
      }

      // Clear the prompt
      setDeferredPrompt(null)
      setIsVisible(false)
    } catch (error) {
      console.error('[PWA] Install prompt error:', error)
    }
  }

  const handleDismiss = () => {
    setIsVisible(false)
    localStorage.setItem('pwa-install-dismissed', Date.now().toString())
  }

  if (!isVisible || isInstalled) {
    return null
  }

  const features = [
    { icon: 'bolt', text: 'Faster loading and performance' },
    { icon: 'wifi', text: 'Works offline with cached content' },
    { icon: 'phone_android', text: 'Full-screen mobile experience' },
    { icon: 'computer', text: 'Desktop shortcut access' },
  ]

  if (variant === 'banner') {
    return (
      <div
        className={`fixed bottom-0 left-0 right-0 z-50 bg-gradient-to-r from-blue-600 to-blue-700 text-white p-4 shadow-lg ${className}`}
      >
        <div className="flex justify-between items-center mx-auto container">
          <div className="flex items-center gap-4">
            <MaterialIcon icon="download" className="w-6 h-6" />
            <div>
              <div className="font-semibold">Install MH Construction App</div>
              <div className="text-blue-100 text-sm">
                Get faster access and offline capabilities
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {isIOS ? (
              <div className="text-blue-100 text-sm">
                Tap the share button and select &quot;Add to Home Screen&quot;
              </div>
            ) : (
              <button
                onClick={handleInstallClick}
                className="bg-white hover:bg-gray-100 px-4 py-2 rounded-lg font-semibold text-blue-600 transition-colors"
              >
                Install
              </button>
            )}

            <button
              onClick={handleDismiss}
              className="p-1 text-blue-100 hover:text-white"
              aria-label="Dismiss install prompt"
            >
              <MaterialIcon icon="close" className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    )
  }

  if (variant === 'card') {
    return (
      <div
        className={`bg-white rounded-lg shadow-lg border border-gray-200 p-6 ${className}`}
      >
        <div className="flex justify-between items-start mb-4">
          <div className="flex items-center gap-3">
            <div className="bg-blue-100 p-2 rounded-lg">
              <MaterialIcon icon="download" className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">Install Our App</h3>
              <p className="text-gray-600 text-sm">
                Enhanced mobile experience
              </p>
            </div>
          </div>

          <button
            onClick={handleDismiss}
            className="text-gray-400 hover:text-gray-600"
            aria-label="Dismiss"
          >
            <MaterialIcon icon="close" className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-3 mb-4">
          {features.slice(0, 2).map((feature, index) => (
            <div
              key={index}
              className="flex items-center gap-2 text-gray-700 text-sm"
            >
              <MaterialIcon
                icon={feature.icon}
                className="w-4 h-4 text-blue-600"
              />
              <span>{feature.text}</span>
            </div>
          ))}
        </div>

        {isIOS ? (
          <div className="bg-blue-50 p-3 rounded-lg">
            <p className="text-blue-800 text-sm">
              <strong>To install on iOS:</strong>
              <br />
              1. Tap the share button in Safari
              <br />
              2. Select &quot;Add to Home Screen&quot;
              <br />
              3. Tap &quot;Add&quot; to install
            </p>
          </div>
        ) : (
          <button
            onClick={handleInstallClick}
            className="flex justify-center items-center gap-2 bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg w-full font-semibold text-white transition-colors"
          >
            <MaterialIcon icon="download" className="w-4 h-4" />
            Install App
          </button>
        )}
      </div>
    )
  }

  if (variant === 'modal') {
    return (
      <div className="z-50 fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 p-4">
        <div
          className={`bg-white rounded-lg shadow-xl max-w-md w-full p-6 ${className}`}
        >
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center gap-3">
              <div className="bg-blue-100 p-2 rounded-lg">
                <MaterialIcon
                  icon="download"
                  className="w-6 h-6 text-blue-600"
                />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 text-xl">
                  Install MH Construction
                </h3>
                <p className="text-gray-600">Get the best mobile experience</p>
              </div>
            </div>

            <button
              onClick={handleDismiss}
              className="text-gray-400 hover:text-gray-600"
              aria-label="Close"
            >
              <MaterialIcon icon="close" className="w-6 h-6" />
            </button>
          </div>

          <div className="space-y-4 mb-6">
            {features.map((feature, index) => (
              <div
                key={index}
                className="flex items-center gap-3 text-gray-700"
              >
                <MaterialIcon
                  icon={feature.icon}
                  className="w-5 h-5 text-blue-600"
                />
                <span>{feature.text}</span>
              </div>
            ))}
          </div>

          {isIOS ? (
            <div className="bg-blue-50 mb-4 p-4 rounded-lg">
              <h4 className="mb-2 font-semibold text-blue-900">
                Installation Instructions for iOS:
              </h4>
              <ol className="space-y-1 text-blue-800 text-sm">
                <li>1. Open this site in Safari</li>
                <li>2. Tap the share button (square with arrow)</li>
                <li>3. Scroll down and tap &quot;Add to Home Screen&quot;</li>
                <li>4. Tap &quot;Add&quot; to install the app</li>
              </ol>
            </div>
          ) : (
            <button
              onClick={handleInstallClick}
              className="flex justify-center items-center gap-2 bg-blue-600 hover:bg-blue-700 mb-4 px-4 py-3 rounded-lg w-full font-semibold text-white transition-colors"
            >
              <MaterialIcon icon="download" className="w-5 h-5" />
              Install Now
            </button>
          )}

          <button
            onClick={handleDismiss}
            className="bg-gray-200 hover:bg-gray-300 px-4 py-2 rounded-lg w-full font-semibold text-gray-800 transition-colors"
          >
            Maybe Later
          </button>
        </div>
      </div>
    )
  }

  return null
}
